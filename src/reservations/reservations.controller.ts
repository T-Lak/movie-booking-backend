import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationResponseDto } from './dto/reservation-response.dto';

@Controller('reservation')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll(): Promise<ReservationResponseDto[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.findOne(id);
  }

  @Post()
  createReservation(
    @Body() createReservationDto: CreateReservationDto
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.create(createReservationDto);
  }

  @Patch(':id')
  async updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.update(id, dto);
  }

  @Delete(':id')
  deleteReservation(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.reservationsService.delete(id);
  }
}