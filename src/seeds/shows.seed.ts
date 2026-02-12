import { Show } from '../modules/shows/entities/show.entity';
import { Repository } from 'typeorm';
import { Movie } from '../modules/movies/entities/movie.entity';

export async function seedShows(showRepo: Repository<Show>, movies: Movie[]): Promise<Show[]> {
  const shows: Show[] = showRepo.create([
    {
      start_time: new Date(),
      end_time: new Date(),
      screen: undefined,
      movie: movies[0]
    },
    {
      start_time: new Date(),
      end_time: new Date(),
      screen: undefined,
      movie: movies[0]
    },
    {
      start_time: new Date(),
      end_time: new Date(),
      screen: undefined,
      movie: movies[0]
    },
    {
      start_time: new Date(),
      end_time: new Date(),
      screen: undefined,
      movie: movies[0]
    },
  ])

  await showRepo.save(shows)
  return shows
}