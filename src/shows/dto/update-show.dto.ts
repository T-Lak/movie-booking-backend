import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateShowDto {
  @IsString()
  @IsOptional()
  movie_title: string;

  @IsDateString()
  @IsOptional()
  start_time: string;

  @IsDateString()
  @IsOptional()
  end_time: string;
}