import { MovieStatus } from '../enums/movie-status.enum';

export class MovieResponseDto {
  id: number;
  tmdbId: number;
  status: MovieStatus;
  title: string;
  releaseDate: string;
  duration: number;
  description: string;
  genres: string[];
  originalLanguage: string;
  posterPath: string;
  backdropPath: string | null;
  trailerKey: string | null;
}