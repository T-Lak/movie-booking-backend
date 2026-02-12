import { IsInt, IsNotEmpty, IsString } from 'class-validator';

import { SeatType } from '../enums/seat-type.enum';

export class CreateSeatDto {
  @IsInt()
  @IsNotEmpty()
  row: number;

  @IsInt()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  type: SeatType;
}