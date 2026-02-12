import { ArrayNotEmpty, IsArray, IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty()
  showId: number

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  seatIds: number[];

  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsNotEmpty()
  customerEmail: string;
}