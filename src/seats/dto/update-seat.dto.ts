import { IsInt, IsOptional, IsString } from 'class-validator';

import { SeatType } from '../enums/seat-type.enum';

export class UpdateSeatDto {
  @IsInt()
  @IsOptional()
  row: number;

  @IsInt()
  @IsOptional()
  number: number;

  @IsString()
  @IsOptional()
  type: SeatType;
}