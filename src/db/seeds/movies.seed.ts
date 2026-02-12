import { Repository } from 'typeorm';

import { Movie } from '../../modules/movies/entities/movie.entity';
import { MovieStatus } from '../../modules/movies/enums/movie-status.enum';

export async function seedMovies(movieRepo: Repository<Movie>) {
  const movies: Movie[] = movieRepo.create([
    {
      title: 'Inception',
      tmdbId: 27205,
      status: MovieStatus.NOW_PLAYING
    },
    {
      title: 'Interstellar',
      tmdbId: 157336,
      status: MovieStatus.NOW_PLAYING
    },
    {
      title: 'Parasite',
      tmdbId: 496243,
      status: MovieStatus.NOW_PLAYING
    },
    {
      title: 'Whiplash',
      tmdbId: 244786,
      status: MovieStatus.NOW_PLAYING
    },
    {
      title: 'Reservoir Dogs',
      tmdbId: 500,
      status: MovieStatus.NOW_PLAYING
    },
    {
      title: 'Taxi Driver',
      tmdbId: 103,
      status: MovieStatus.NOW_PLAYING
    },
  ])

  await movieRepo.save(movies)
  return movies
}