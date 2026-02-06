import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { MovieStatus } from '../enums/movie-status.enum';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  tmdbId: number;

  @IsString()
  @IsNotEmpty()
  status: MovieStatus;
}