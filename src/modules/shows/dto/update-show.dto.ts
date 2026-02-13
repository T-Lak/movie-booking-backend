import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateShowDto {
  @IsString()
  @IsOptional()
  movieTitle: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endTime: Date;
}