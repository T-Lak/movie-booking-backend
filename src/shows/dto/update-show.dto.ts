import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateShowDto {
  @IsString()
  @IsOptional()
  movie_title: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  start_time: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  end_time: Date;
}