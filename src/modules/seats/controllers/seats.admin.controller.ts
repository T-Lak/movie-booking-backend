import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AdminController } from '../../../common/decorators/admin-controller.decorator';

import { SeatsAdminService } from '../services/seats.admin.service';
import { Seat } from '../entities/seat.entity';
import { CreateSeatDto } from '../dto/create-seat.dto';
import { UpdateSeatDto } from '../dto/update-seat.dto';

@AdminController('seats')
export class SeatsAdminController {
  constructor(private readonly seatsService: SeatsAdminService) {}

  @Get()
  findAll(): Promise<Seat[]> {
    return this.seatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Seat> {
    return this.seatsService.findOne(id);
  }

  @Post()
  createSeat(@Body() createSeatDto: CreateSeatDto): Promise<Seat> {
    return this.seatsService.create(createSeatDto);
  }

  @Patch(':id')
  async updateSeat(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSeatDto,
  ): Promise<Seat> {
    return this.seatsService.update(id, dto);
  }

  @Delete(':id')
  deleteSeat(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.seatsService.delete(id);
  }
}