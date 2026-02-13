import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

import { BookingStatus } from '../enums/bookings-status.enum';
import { Booking } from '../entity/bookings.entity';
import { Reservation } from '../entity/reservation.entity';

@Injectable()
export class BookingsCleanupService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  @Cron('*/1 * * * *')
  async cleanupExpiredReservations() {
    const now = new Date()

    const expiredBookings = await this.bookingRepo.find({
      where: {
        status: BookingStatus.PENDING,
        expiresAt: LessThan(now),
      },
      select: ['id'],
    });

    if (expiredBookings.length === 0) return;

    const ids: number[] = expiredBookings.map(b => b.id);

    await this.bookingRepo.update(ids, { status: BookingStatus.EXPIRED });

    await this.reservationRepo.delete({
      booking: In(ids)
    });

    await this.bookingRepo.save(expiredBookings);
  }
}