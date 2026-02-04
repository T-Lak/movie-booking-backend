import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Seat } from '../seats/entities/seat.entity';
import { Reservation } from './entity/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Seat)
    private readonly reservationsRepository: Repository<Reservation>,
  ) {}

  findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    const reservation: Reservation | null = await this.reservationsRepository.findOneBy({ id });
    if (!reservation) {
      throw new NotFoundException(`Reservation ${id} not found`);
    }
    return reservation;
  }

  create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation: Reservation = this.reservationsRepository.create(createReservationDto);
    return this.reservationsRepository.save(reservation);
  }

  async update(id: number, dto: UpdateReservationDto): Promise<Reservation> {
    const reservation: Reservation | null = await this.reservationsRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
    Object.assign(reservation, dto);
    return this.reservationsRepository.save(reservation);
  }

  async delete(id: number): Promise<void> {
    const result: DeleteResult = await this.reservationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
  }
}