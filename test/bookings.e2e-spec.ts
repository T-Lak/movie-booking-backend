import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { SeatType } from '../src/modules/seats/enums/seat-type.enum';
import { BookingStatus } from '../src/modules/bookings/enums/bookings-status.enum';
import { MovieStatus } from '../src/modules/movies/enums/movie-status.enum';
import { MoviesApiService } from '../src/modules/movies/services/movies.api.service';
import { Reservation } from '../src/modules/bookings/entity/reservation.entity';
import { Booking } from '../src/modules/bookings/entity/bookings.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../src/common/enums/role.enum';

describe('Bookings (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MoviesApiService)
      .useValue({
        getMovieDetails: jest.fn().mockResolvedValue({ id: 123, title: 'Mock Movie' }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  // runs before every 'it' block and drops all tables
  beforeEach(async () => {
    const entities = dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  })

  async function createDbTestContent() {
    const movieRepo = dataSource.getRepository('Movie');
    const screenRepo = dataSource.getRepository('Screen');
    const seatRepo = dataSource.getRepository('Seat');
    const showRepo = dataSource.getRepository('Show');

    const movie = await movieRepo.save({
      title: 'Batman', tmdbId: Math.floor(Math.random() * 1000), status: MovieStatus.NOW_PLAYING
    });

    const screen = await screenRepo.save({ name: "Screen 1", rows: 1, seatsPerRow: 6 });

    const seats = await seatRepo.save([
      { screen, row: 1, number: 1, type: SeatType.STANDARD },
      { screen, row: 1, number: 2, type: SeatType.STANDARD },
      { screen, row: 1, number: 3, type: SeatType.STANDARD },
    ]);

    const show = await showRepo.save({
      movie,
      screen,
      startTime: new Date(Date.now() + 1000000),
      endTime: new Date(Date.now() + 2000000),
    });

    return { movie, screen, seats, show };
  }

  describe('Booking Lifecycle (Journeys)', () => {
    it('Journey: Prevent double booking of the same seats', async () => {
      const { seats, show } = await createDbTestContent();

      const checkoutResponse1 = await request(app.getHttpServer())
        .post('/bookings/checkout')
        .send({
          showId: show.id,
          seatIds: [seats[0].id, seats[1].id],
          customerEmail: 'a@test.com'
        })
        .expect(201);

      const checkoutResponse2 = await request(app.getHttpServer())
        .post('/bookings/checkout')
        .send({
          showId: show.id,
          seatIds: [seats[0].id, seats[1].id],
          customerEmail: 'a@test.com'
        })

      expect(checkoutResponse2.status).toBe(409);
      expect(checkoutResponse2.body.message).toMatch(
        `Seat(s) already reserved: ${seats[0].id}, ${seats[1].id}`
      );

      const confirmResponse = await request(app.getHttpServer())
        .patch(`/bookings/${checkoutResponse1.body.id}/confirm`)

      expect(confirmResponse.status).toBe(200)
      expect(confirmResponse.body.status).toBe(BookingStatus.CONFIRMED);
    })

    it('Journey: Expired bookings should not block new checkouts', async () => {
      const { seats, show } = await createDbTestContent();

      const bookingRepo = dataSource.getRepository(Booking);
      const expiredBooking = await bookingRepo.save({
        show,
        customerEmail: 'zombie@test.com',
        status: BookingStatus.EXPIRED,
        expiresAt: new Date(Date.now() - 60000),
      });

      await dataSource.getRepository(Reservation).save(
        seats.map(seat => ({
          booking: expiredBooking,
          seatId: seat.id,
          showId: show.id
        }))
      );

      await request(app.getHttpServer())
        .post('/bookings/checkout')
        .send({
          showId: show.id,
          seatIds: [seats[0].id],
          customerEmail: 'hero@test.com'
        })
        .expect(201);
    });

    it('Admin cancellation should free up seat', async () => {
      const { seats, show } = await createDbTestContent();

      const userRepo = dataSource.getRepository(User);
      const adminResponse = await userRepo.save({
        email: "admin@movie_app.com",
        passwordHash: await bcrypt.hash("admin1", 10),
        role: Role.ADMIN,
      })

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: adminResponse.email, password: 'admin1' })
        .expect(200);

      const token = loginResponse.body.accessToken;

      const bookingResponse = await request(app.getHttpServer())
        .post('/bookings/checkout')
        .send({
          showId: show.id,
          seatIds: [seats[0].id],
          customerEmail: 'user@test.com'
        })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/admin/bookings/${bookingResponse.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      await request(app.getHttpServer())
        .post('/bookings/checkout')
        .send({
          showId: show.id,
          seatIds: [seats[0].id],
          customerEmail: 'new-user@test.com'
        })
        .expect(201);
    })

    it('Concurrency: Should handle simultaneous booking attempts for the same seat', async () => {
      const { seats, show } = await createDbTestContent();

      const raceResponse = await Promise.allSettled([
        request(app.getHttpServer())
          .post('/bookings/checkout')
          .send({
            showId: show.id,
            seatIds: [seats[0].id],
            customerEmail: 'user-a@test.com'
          }),
        request(app.getHttpServer())
          .post('/bookings/checkout')
          .send({
            showId: show.id,
            seatIds: [seats[0].id],
            customerEmail: 'user-b@test.com'
          }),
      ]);

      const statuses = raceResponse.map((res: any) => res.value.status);

      expect(statuses).toContain(201);
      expect(statuses).toContain(409);

      const bookingCount: number = await dataSource.getRepository(Booking).count();
      expect(bookingCount).toBe(1);

      const reservationCount = await dataSource.getRepository(Reservation).count();
      expect(reservationCount).toBe(1);
    });
  })
})