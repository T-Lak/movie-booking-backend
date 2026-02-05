import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ReservationStatus } from '../enums/reservation-status.enum';

export class CreateReservationDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsNotEmpty()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  status: ReservationStatus;
}