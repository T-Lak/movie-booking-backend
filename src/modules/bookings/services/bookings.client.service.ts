import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, MoreThan, Repository } from 'typeorm';

import { Reservation } from '../entity/reservation.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingResponseDto } from '../dto/booking-response.dto';
import { toResponse } from '../helpers/to-respone.helper';
import { Show } from '../../shows/entities/show.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { BookingStatus } from '../enums/bookings-status.enum';
import { Booking } from '../entity/bookings.entity';

@Injectable()
export class BookingsClientService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async checkout(dto: CreateBookingDto): Promise<BookingResponseDto> {
    return await this.bookingRepo.manager.transaction(
      async (manager: EntityManager): Promise<BookingResponseDto> => {
        const show: Show = await this.getShowOrThrow(dto.showId, manager);
        const seats: Seat[] = await this.getSeatsOrThrow(dto.seatIds, manager);

        await this.ensureSeatsAreAvailable(dto.showId, dto.seatIds, manager);

        const savedBooking: Booking = await this.saveBooking(dto, manager);
        const reservations: Reservation[] = [];

        for (const seat of seats) {
          await this.saveReservations(
            manager, seat, show, savedBooking, reservations
          );
        }

        savedBooking.reservations = reservations;
        return toResponse(savedBooking);
      }
    );
  }

  async confirm(id: number): Promise<BookingResponseDto> {
    return await this.bookingRepo.manager.transaction(
      async (manager: EntityManager
    ): Promise<BookingResponseDto> => {
      const booking: Booking | null = await manager.findOne(Booking, {
        where: { id },
        relations: ['reservations'],
        lock: { mode: 'pessimistic_write' }
      });

      if (!booking || booking.status !== BookingStatus.PENDING) {
        throw new BadRequestException(
          'Booking not found or not in pending state.'
        );
      }

      booking.status = BookingStatus.CONFIRMED;
      const saved: Booking = await manager.save(booking);
      return toResponse(saved);
    });
  }

  private async saveBooking(
    dto: CreateBookingDto,
    manager: EntityManager,
  ): Promise<Booking> {
    const booking: Booking = manager.create(Booking, {
      customerEmail: dto.customerEmail,
      status: BookingStatus.PENDING,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    return manager.save(booking);
  }

  private async saveReservations(
    manager: EntityManager,
    seat: Seat,
    show: Show,
    savedBooking: Booking,
    reservations: Reservation[],
  ): Promise<void> {
    const savedReservation: Reservation = await manager.save(Reservation, {
      booking: savedBooking,
      show: show,
      seat: seat,
    });
    reservations.push(savedReservation);
  }

  private async getShowOrThrow(
    showId: number,
    manager: EntityManager
  ): Promise<Show> {
    const show: Show | null = await manager.findOneBy(Show, { id: showId })

    if (!show) {
      throw new NotFoundException(`Show ${showId} not found`);
    }

    return show;
  }

  private async getSeatsOrThrow(
    seatIds: number[],
    manager: EntityManager
  ): Promise<Seat[]> {
    const seats: Seat[] = await manager.find(Seat, {
      where: { id: In(seatIds)}
    })

    if (seats.length !== seatIds.length) {
      const foundIds: number[] = seats.map(s => s.id);
      const missing: number[] = seatIds
        .filter(id => !foundIds.includes(id));
      throw new NotFoundException(
        `Seats not found: ${missing.join(', ')}`
      );
    }

    return seats;
  }

  private async ensureSeatsAreAvailable(
    showId: number,
    seatIds: number[],
    manager: EntityManager,
  ): Promise<void> {
    const activeReservations: Reservation[] = await manager.find(Reservation, {
      where: [
        {
          show: { id: showId },
          seat: { id: In(seatIds) },
          booking: { status: BookingStatus.CONFIRMED }
        },
        {
          show: { id: showId },
          seat: { id: In(seatIds) },
          booking: {
            status: BookingStatus.PENDING,
            expiresAt: MoreThan(new Date())
          }
        }
      ],
      relations: ['booking'],
      lock: { mode: 'pessimistic_write' }
    });

    if (activeReservations.length > 0) {
      const takenIds: number[] = activeReservations.map(r => r.seat.id);
      throw new ConflictException(
        `Seats already reserved: ${takenIds.join(', ')}`
      );
    }
  }
}