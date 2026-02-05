import { BadRequestException, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Show } from './entities/show.entity';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  findAll(): Promise<Show[]> {
    return this.showRepository.find();
  }

  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Show> {
    const show = await this.showRepository.findOneBy({ id });
    if (!show) {
      throw new NotFoundException(`Show ${id} not found`);
    }
    return show;
  }

  create(dto: CreateShowDto): Promise<Show> {
    const start = new Date(dto.start_time);
    const end = new Date(dto.end_time);
    const now = new Date();

    if (start <= now) {
      throw new BadRequestException('Start time must be in the future');
    }
    if (end <= now) {
      throw new BadRequestException('End time must be in the future');
    }
    if (start >= end) {
      throw new BadRequestException('Start time must be before end time');
    }

    const show = this.showRepository.create(dto);
    return this.showRepository.save(show);
  }

  async update(id: number, dto: UpdateShowDto): Promise<Show> {
    const show = await this.showRepository.findOne({ where: { id } });
    if (!show) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
    Object.assign(show, dto);
    return this.showRepository.save(show);
  }

  async delete(id: number): Promise<void> {
    const result = await this.showRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }
  }
}
