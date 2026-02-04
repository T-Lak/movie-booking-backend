import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}