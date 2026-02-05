import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ReservationStatus } from '../enums/reservation-status.enum';

export class UpdateReservationDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsOptional()
  customerEmail: string;

  @IsString()
  @IsOptional()
  status: ReservationStatus;
}