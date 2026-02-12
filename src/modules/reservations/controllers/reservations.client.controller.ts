import { Body, Controller, Post } from '@nestjs/common';

import { ReservationsClientService } from '../services/reservations.client.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationResponseDto } from '../dto/reservation-response.dto';

@Controller('reservation')
export class ReservationsClientController {
  constructor(private readonly reservationsService: ReservationsClientService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto
  ): Promise<ReservationResponseDto[]> {
    return this.reservationsService.create(createReservationDto);
  }
}