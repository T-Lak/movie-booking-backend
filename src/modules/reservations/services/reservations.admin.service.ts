import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reservation } from '../entity/reservation.entity';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { toResponse } from '../helpers/to-respone.helper';

@Injectable()
export class ReservationsAdminService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
  ) {}

  async findAll(): Promise<ReservationResponseDto[]> {
    const reservations: Reservation[] = await this.reservationsRepository
      .find({ relations: ['show', 'seat'], })
    return reservations.map(toResponse)
  }

  async findOne(id: number): Promise<ReservationResponseDto> {
    const reservation: Reservation | null = await this.reservationsRepository
      .findOne({ where: { id }, relations: ['show', 'seat'], });
    if (!reservation) {
      throw new NotFoundException(`Reservation ${id} not found`)
    }
    return toResponse(reservation);
  }

  async update(
    id: number,
    dto: UpdateReservationDto
  ): Promise<ReservationResponseDto> {
    const reservation: Reservation | null = await this.reservationsRepository
      .findOne({ where: { id }, relations: ['show', 'seat'] });

    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`)
    }

    Object.assign(reservation, dto);
    const response = await this.reservationsRepository
      .save(reservation)
    return toResponse(response)
  }
}