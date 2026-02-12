import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { BookingsClientService } from '../services/bookings.client.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { BookingResponseDto } from '../dto/booking-response.dto';

@Controller('booking')
export class BookingsClientController {
  constructor(private readonly bookingsClientService: BookingsClientService) {}

  @Post('checkout')
  async checkout(@Body() dto: CreateBookingDto): Promise<BookingResponseDto> {
    return await this.bookingsClientService.checkout(dto);
  }

  @Patch(':id/confirm')
  async confirm(
    @Param('id', ParseIntPipe) id: number
  ): Promise<BookingResponseDto> {
    return await this.bookingsClientService.confirm(id);
  }
}