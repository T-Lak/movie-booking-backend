import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Screen } from './entities/screen.entity';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { CreateScreenDto } from './dto/create-screen.dto';

@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(Screen)
    private readonly  screenRepository: Repository<Screen>,
  ) {}

  findAll(): Promise<Screen[]> {
    return this.screenRepository.find();
  }

  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Screen> {
    const screen: Screen | null = await this.screenRepository.findOneBy({ id });
    if (!screen) {
      throw new NotFoundException(`Screen ${id} not found`);
    }
    return screen;
  }

  create(createScreenDto: CreateScreenDto): Promise<Screen> {
    const screen: Screen = this.screenRepository.create(createScreenDto);
    return this.screenRepository.save(screen);
  }

  async update(id: number, dto: UpdateScreenDto): Promise<Screen> {
    const screen: Screen | null = await this.screenRepository.findOne({ where: { id } });
    if (!screen) {
      throw new NotFoundException(`Screen with id ${id} not found`);
    }
    Object.assign(screen, dto);
    return this.screenRepository.save(screen);
  }

  async delete(id: number): Promise<void> {
    const result: DeleteResult = await this.screenRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Screen with id ${id} not found`);
    }
  }
}