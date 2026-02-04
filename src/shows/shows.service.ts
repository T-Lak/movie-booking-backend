import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Show } from './entities/show.entity';
import { CreateShowDto } from './dto/create-show.dto';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  // List all shows
  findAll(): Promise<Show[]> {
    return this.showRepository.find();
  }

  // Get a show by ID
  async findOne(id: number): Promise<Show> {
    const show = await this.showRepository.findOneBy({ id });
    if (!show) throw new NotFoundException(`Show ${id} not found`);
    return show;
  }

  // Create a new show
  create(createShowDto: CreateShowDto): Promise<Show> {
    const show = this.showRepository.create(createShowDto);
    return this.showRepository.save(show);
  }
}
