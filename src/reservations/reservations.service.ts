import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    const reservation = await this.reservationsRepository.findOneBy({ id });
    if (!reservation) {
      throw new NotFoundException(`Movie ${id} not found`);
    }
    return reservation;
  }

  create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const movie = this.reservationsRepository.create(createReservationDto);
    return this.reservationsRepository.save(movie);
  }

  async update(id: number, dto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    Object.assign(reservation, dto);
    return this.reservationsRepository.save(reservation);
  }

  async delete(id: number): Promise<void> {
    const result = await this.reservationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }
}