import { IsNumber, IsOptional, IsString } from 'class-validator';

import { SeatType } from '../enums/seat-type.enum';

export class UpdateSeatDto {
  @IsNumber()
  @IsOptional()
  row: number;

  @IsNumber()
  @IsOptional()
  number: number;

  @IsString()
  @IsOptional()
  type: SeatType;
}