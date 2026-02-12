import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Show } from '../entities/show.entity';

@Injectable()
export class ShowsClientService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  findAll(): Promise<Show[]> {
    return this.showRepository.find();
  }

  async findOne(id: number): Promise<Show> {
    const show: Show | null = await this.showRepository.findOneBy({ id });
    if (!show) {
      throw new NotFoundException(`Show ${id} not found`);
    }
    return show;
  }
}
