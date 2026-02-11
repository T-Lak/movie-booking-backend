import { Movie } from '../entities/movie.entity';
import { MovieAdminResponseDto } from '../dto/movie-admin-response.dto';

export function toAdminResponse(movie: Movie): MovieAdminResponseDto {
  return {
    id: movie.id,
    tmdbId: movie.tmdbId,
    title: movie.title,
    status: movie.status,
    createdAt: movie.createdAt,
    updatedAt: movie.updatedAt
  }
}