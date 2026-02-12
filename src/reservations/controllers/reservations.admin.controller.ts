import { Body, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';

import { AdminController } from '../../common/decorators/admin-controller.decorator';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationsAdminService } from '../services/reservations.admin.service';

@AdminController('reservation')
export class ReservationsAdminController {
  constructor(private readonly reservationsService: ReservationsAdminService) {}

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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.update(id, dto);
  }
}