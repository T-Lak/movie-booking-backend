import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { SeatType } from '../enums/seat-type.enum';

export class CreateSeatDto {
  @IsNumber()
  @IsNotEmpty()
  row: number;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  type: SeatType;
}