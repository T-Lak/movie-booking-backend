import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateScreenAdminDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  rows: number;

  @IsInt()
  @IsOptional()
  seatsPerRow: number;
}