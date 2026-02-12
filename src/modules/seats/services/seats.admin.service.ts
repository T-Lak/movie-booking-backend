import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Seat } from '../entities/seat.entity';
import { UpdateSeatDto } from '../dto/update-seat.dto';

@Injectable()
export class SeatsAdminService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatsRepository: Repository<Seat>,
  ) {}

  findAll(): Promise<Seat[]> {
    return this.seatsRepository.find();
  }

  async findOne(id: number): Promise<Seat> {
    const seat: Seat | null = await this.seatsRepository.findOneBy({ id });
    if (!seat) {
      throw new NotFoundException(`Seat ${id} not found`);
    }
    return seat;
  }

  async update(id: number, dto: UpdateSeatDto): Promise<Seat> {
    const seat: Seat | null = await this.seatsRepository.findOne({ where: { id } });
    if (!seat) {
      throw new NotFoundException(`Seat with id ${id} not found`);
    }
    Object.assign(seat, dto);
    return this.seatsRepository.save(seat);
  }
}