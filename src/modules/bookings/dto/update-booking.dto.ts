import { IsOptional, IsString } from 'class-validator';
import { BookingStatus } from '../enums/bookings-status.enum';

export class UpdateBookingDto {
  @IsString()
  @IsOptional()
  status: BookingStatus;
}