import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty()
  movie_title: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;
}
