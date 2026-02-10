import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Screen } from '../entities/screen.entity';
import { toResponse } from '../helpers/to-response.helper'
import { UpdateScreenAdminDto } from '../dto/update-screen.admin.dto';
import { CreateScreenAdminDto } from '../dto/create-screen.admin.dto';
import { ScreenAdminResponseDto } from '../dto/screen-admin-response.dto';

@Injectable()
export class ScreensAdminService {
  constructor(
    @InjectRepository(Screen)
    private readonly  screenRepository: Repository<Screen>,
  ) {}

  async findAll(): Promise<ScreenAdminResponseDto[]> {
    const screens: Screen[] = await this.screenRepository.find();
    return screens.map(toResponse)
  }

  async findOne(
    id: number
  ): Promise<ScreenAdminResponseDto> {
    const screen: Screen | null = await this.screenRepository.findOneBy({ id });
    if (!screen) {
      throw new NotFoundException(`Screen ${id} not found`);
    }
    return toResponse(screen);
  }

  async create(
    createScreenDto: CreateScreenAdminDto
  ): Promise<ScreenAdminResponseDto> {
    const screen: Screen = this.screenRepository.create(createScreenDto);
    const result: Screen = await this.screenRepository.save(screen);
    return toResponse(result);
  }

  async update(
    id: number,
    dto: UpdateScreenAdminDto
  ): Promise<ScreenAdminResponseDto> {
    const screen: Screen | null = await this.screenRepository
      .findOne({ where: { id } });
    if (!screen) {
      throw new NotFoundException(`Screen with id ${id} not found`);
    }
    Object.assign(screen, dto);
    const result: Screen = await this.screenRepository.save(screen);
    return toResponse(result);
  }

  async delete(
    id: number
  ): Promise<void> {
    const result: DeleteResult = await this.screenRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Screen with id ${id} not found`);
    }
  }
}