import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

import { Reservation } from './entity/reservation.entity';
import { ReservationStatus } from './enums/reservation-status.enum';

@Injectable()
export class ReservationsCleanupService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  @Cron('*/1 * * * *')
  async cleanupExpiredReservations() {
    const now = new Date()

    await this.reservationRepo.update(
      { status: ReservationStatus.PENDING, expiresAt: LessThan(now), },
      { status: ReservationStatus.EXPIRED }
    )
  }
}