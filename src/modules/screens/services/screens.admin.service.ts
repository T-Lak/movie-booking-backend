import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Screen } from '../entities/screen.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { SeatType } from '../../seats/enums/seat-type.enum';
import { IScreenLayout, SCREEN_LAYOUTS } from '../helpers/misc.helper';
import { UpdateScreenAdminDto } from '../dto/update-screen.admin.dto';
import { CreateScreenAdminDto } from '../dto/create-screen.admin.dto';

@Injectable()
export class ScreensAdminService {
  constructor(
    @InjectRepository(Screen)
    private readonly  screenRepository: Repository<Screen>,
    @InjectRepository(Seat)
    private readonly  seatRepository: Repository<Seat>,
  ) {}

  async findAll(): Promise<Screen[]> {
    return this.screenRepository.find();
  }

  async findOne(
    id: number
  ): Promise<Screen> {
    const screen: Screen | null = await this.screenRepository.findOneBy({ id });
    if (!screen) {
      throw new NotFoundException(`Screen ${id} not found`);
    }
    return screen;
  }

  async create(
    dto: CreateScreenAdminDto
  ): Promise<Screen> {
    const layout: IScreenLayout = SCREEN_LAYOUTS[dto.size]

    const screen: Screen = this.screenRepository.create({
      name: dto.name,
      rows: layout.rows,
      seatsPerRow: layout.seatsPerRow,
    });

    const saved = await this.screenRepository.save(screen);
    await this.createSeats(saved);
    return saved;
  }

  private async createSeats(screen: Screen): Promise<void> {
    const seats: Seat[] = [];
    for (let row = 0; row < screen.rows; row++) {
      for (let number = 0; number < screen.totalSeats; number++) {
        seats.push(
          this.seatRepository.create({
            row: row,
            number: number,
            screen: screen,
            type: SeatType.STANDARD,
          })
        )
      }
    }
    await this.seatRepository.save(seats)
  }

  async update(
    id: number,
    dto: UpdateScreenAdminDto
  ): Promise<Screen> {
    const screen: Screen | null = await this.screenRepository
      .findOne({ where: { id } });
    if (!screen) {
      throw new NotFoundException(`Screen with id ${id} not found`);
    }
    Object.assign(screen, dto);
    return this.screenRepository.save(screen);
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