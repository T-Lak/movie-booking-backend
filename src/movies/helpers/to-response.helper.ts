import { MovieResponseDto } from '../dto/movie-response.dto';
import { Movie } from '../entities/movie.entity';
import { Genre, VideoMeta } from './misc.helper';

export function toResponse(
  movie: Movie,
  movieMetadata: any,
  videoMetadata: any
): MovieResponseDto {
  const genres: string[] = Array.isArray(movieMetadata.genres)
    ? movieMetadata.genres.map((g: Genre): string => g.name)
    : [];

  const trailer: VideoMeta =
    videoMetadata.results.find(
      (v: VideoMeta): boolean => v.type === 'Trailer' && v.official && v.site === 'YouTube',
    ) ??
    videoMetadata.results.find(
      (v: VideoMeta): boolean => v.type === 'Trailer' && v.site === 'YouTube',
    );

  const trailerKey: string | undefined = trailer?.key;

  return {
    id: movie.id,
    tmdbId: movie.tmdbId,
    status: movie.status,
    title: movie.title,
    releaseDate: movieMetadata.release_date,
    duration: movieMetadata.runtime,
    description: movieMetadata.overview,
    genres: genres,
    originalLanguage: movieMetadata.original_language,
    posterPath: movieMetadata.poster_path,
    backdropPath: movieMetadata.backdrop_path,
    trailerKey: trailerKey,
  }
}