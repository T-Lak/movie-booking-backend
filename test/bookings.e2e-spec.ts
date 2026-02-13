import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { SeatType } from '../src/modules/seats/enums/seat-type.enum';
import { BookingStatus } from '../src/modules/bookings/enums/bookings-status.enum';
import { MovieStatus } from '../src/modules/movies/enums/movie-status.enum';
import { MoviesApiService } from '../src/modules/movies/services/movies.api.service';

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
  })

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

  // sanity check
  it('should be healthy', async () => {
    return request(app.getHttpServer())
      .get('/shows')
      .expect(200);
  })

  it('POST /bookings/checkout - Success', async () => {
    const movie = await dataSource.getRepository('Movie')
      .save({ title: 'Batman', tmdbId: 50, status: MovieStatus.NOW_PLAYING });
    const screen = await dataSource.getRepository('Screen')
      .save({ name: "Screen 1", rows: 1, seatsPerRow: 6 })
    const seats = await dataSource.getRepository('Seat')
      .save([
        { screen, row: 1, number: 1, type: SeatType.STANDARD },
        { screen, row: 1, number: 2, type: SeatType.STANDARD },
        { screen, row: 1, number: 3, type: SeatType.STANDARD },
        { screen, row: 1, number: 4, type: SeatType.STANDARD },
        { screen, row: 1, number: 5, type: SeatType.STANDARD },
        { screen, row: 1, number: 6, type: SeatType.STANDARD },
      ]);
    const show = await dataSource.getRepository('Show')
      .save({
        movie: { id: movie.id },
        screen: { id: screen.id },
        startTime: new Date(Date.now() + 1000000),
        endTime: new Date(Date.now() + 2000000),
      })

    const response = await request(app.getHttpServer())
      .post('/bookings/checkout')
      .send({
        showId: show.id,
        seatIds: [seats[0].id, seats[1].id, seats[2].id],
        customerEmail: 'tester@test.com'
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(BookingStatus.PENDING);
  })
})