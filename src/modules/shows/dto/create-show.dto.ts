import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty()
  movie_title: string;

  @Type(() => Date)
  @IsDate()
  start_time: Date;

  @Type(() => Date)
  @IsDate()
  end_time: Date;
}
