import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Seat } from './entities/seat.entity';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatsRepository: Repository<Seat>,
  ) {}

  findAll(): Promise<Seat[]> {
    return this.seatsRepository.find();
  }

  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Seat> {
    const show: Seat | null = await this.seatsRepository.findOneBy({ id });
    if (!show) {
      throw new NotFoundException(`Show ${id} not found`);
    }
    return show;
  }

  create(createSeatDto: CreateSeatDto): Promise<Seat> {
    const seat: Seat = this.seatsRepository.create(createSeatDto);
    return this.seatsRepository.save(seat);
  }

  async update(id: number, dto: UpdateSeatDto): Promise<Seat> {
    const show: Seat | null = await this.seatsRepository.findOne({ where: { id } });
    if (!show) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
    Object.assign(show, dto);
    return this.seatsRepository.save(show);
  }

  async delete(id: number): Promise<void> {
    const result: DeleteResult = await this.seatsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
  }
}