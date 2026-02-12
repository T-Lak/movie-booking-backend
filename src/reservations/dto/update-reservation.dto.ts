import { IsOptional, IsString } from 'class-validator';
import { ReservationStatus } from '../enums/reservation-status.enum';

export class UpdateReservationDto {
  @IsString()
  @IsOptional()
  status: ReservationStatus;
}