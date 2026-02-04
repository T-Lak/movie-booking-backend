import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSeatDto {
  @IsNumber()
  @IsOptional()
  row: number;

  @IsNumber()
  @IsOptional()
  number: number;

  @IsString()
  @IsOptional()
  type: string;
}