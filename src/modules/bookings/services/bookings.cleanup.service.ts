import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

import { Reservation } from '../entity/reservation.entity';
import { BookingStatus } from '../enums/bookings-status.enum';
import { Booking } from '../entity/bookings.entity';

@Injectable()
export class BookingsCleanupService {
  constructor(
    @InjectRepository(Reservation)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  @Cron('*/1 * * * *')
  async cleanupExpiredReservations() {
    const now = new Date()

    const expiredBookings = await this.bookingRepo.find({
      where: {
        status: BookingStatus.PENDING,
        expiresAt: LessThan(now),
      },
    });

    if (expiredBookings.length === 0) return;

    for (const booking of expiredBookings) {
      booking.status = BookingStatus.CANCELLED;
    }

    await this.bookingRepo.save(expiredBookings);
  }
}