import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { toResponse } from '../helpers/to-respone.helper';
import { BookingResponseDto } from '../dto/booking-response.dto';
import { Booking } from '../entity/bookings.entity';
import { BookingStatus } from '../enums/bookings-status.enum';

@Injectable()
export class BookingsAdminService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<BookingResponseDto[]> {
    const bookings: Booking[] = await this.bookingRepository
      .find({ relations: ['show', 'seat'], })
    return bookings.map(toResponse)
  }

  async findOne(id: number): Promise<BookingResponseDto> {
    const booking: Booking | null = await this.bookingRepository
      .findOne({ where: { id }, relations: ['show', 'seat'], });
    if (!booking) {
      throw new NotFoundException(`Booking ${id} not found`)
    }
    return toResponse(booking);
  }

  async cancel(id: number): Promise<void> {
    await this.bookingRepository.manager.transaction(
      async (manager: EntityManager
    ): Promise<void> => {
      const booking: Booking | null = await manager.findOne(Booking, {
        where: { id },
        lock: { mode: 'pessimistic_write' }
      });

      if (!booking) {
        throw new NotFoundException(`Booking ${id} not found`);
      }

      if (booking.status === BookingStatus.CANCELLED) {
        return;
      }

      booking.status = BookingStatus.CANCELLED;
      await manager.save(booking);
    });
  }
}