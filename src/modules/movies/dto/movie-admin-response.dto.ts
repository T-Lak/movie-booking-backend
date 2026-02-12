import { MovieStatus } from '../enums/movie-status.enum';

export class MovieAdminResponseDto {
  id: number;
  tmdbId: number;
  title: string;
  status: MovieStatus;
  createdAt: Date;
  updatedAt: Date;
}