import { Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';

import { AdminController } from '../../../common/decorators/admin-controller.decorator';
import { BookingResponseDto } from '../dto/booking-response.dto';
import { BookingsAdminService } from '../services/bookings.admin.service';

@AdminController('bookings')
export class BookingsAdminController {
  constructor(private readonly bookingsAdminService: BookingsAdminService) {}

  @Get()
  findAll(): Promise<BookingResponseDto[]> {
    return this.bookingsAdminService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<BookingResponseDto> {
    return this.bookingsAdminService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bookingsAdminService.cancel(id);
  }
}