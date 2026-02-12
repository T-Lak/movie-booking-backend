import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { MovieStatus } from '../enums/movie-status.enum';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  tmdbId?: number;

  @IsOptional()
  @IsEnum(MovieStatus)
  status: MovieStatus;
}
