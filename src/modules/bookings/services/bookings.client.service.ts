import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, MoreThan, Repository } from 'typeorm';

import { toResponse } from '../helpers/to-respone.helper';
import { Booking } from '../entity/bookings.entity';
import { Reservation } from '../entity/reservation.entity';
import { Show } from '../../shows/entities/show.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingResponseDto } from '../dto/booking-response.dto';
import { BookingStatus } from '../enums/bookings-status.enum';

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
        const seats: Seat[] = await this.getSeatsOrThrow(
          dto.seatIds,
          show.screen.id,
          manager
        );

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
        lock: { mode: 'pessimistic_write' }
      });

      if (!booking || booking.status !== BookingStatus.PENDING) {
        throw new BadRequestException(
          'Booking not found or not in pending state.'
        );
      }

      const reservations: Reservation[] = await manager.find(Reservation, {
        where: { booking: { id: id } }
      });

      booking.status = BookingStatus.CONFIRMED;
      const saved: Booking = await manager.save(booking);
      saved.reservations = reservations;
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
    const show: Show | null = await manager.findOne(Show, {
      where: { id: showId },
      relations: ['screen'],
    })

    if (!show) {
      throw new NotFoundException(`Show ${showId} not found`);
    }

    const buffer = 15 * 60 * 1000;
    if (new Date(show.startTime).getTime() - Date.now() < buffer) {
      throw new BadRequestException(
        'Online booking is closed for this show.'
      );
    }

    return show;
  }

  private async getSeatsOrThrow(
    seatIds: number[],
    screenId: number,
    manager: EntityManager
  ): Promise<Seat[]> {
    const seats: Seat[] = await manager.find(Seat, {
      where: {
        id: In(seatIds),
        screen: { id: screenId },
      },
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
      relations: ['booking', 'seat'],
      lock: { mode: 'pessimistic_write' }
    });

    if (activeReservations.length > 0) {
      const takenIds: number[] = activeReservations.map(r => r.seat.id);
      throw new ConflictException(
        `Seat(s) already reserved: ${takenIds.join(', ')}`
      );
    }
  }
}