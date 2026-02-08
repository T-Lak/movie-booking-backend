import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReservationDto {
  @IsInt()
  showId: number

  @IsInt()
  seatId: number;

  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsNotEmpty()
  customerEmail: string;
}