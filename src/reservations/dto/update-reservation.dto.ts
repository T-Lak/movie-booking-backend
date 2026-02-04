import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateReservationDto {
  @IsString()
  @IsOptional()
  customerEmail: string;

  @IsString()
  @IsOptional()
  status: string;
}