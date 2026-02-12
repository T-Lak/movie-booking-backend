import { Repository } from 'typeorm';

import { Show } from '../../modules/shows/entities/show.entity';
import { Movie } from '../../modules/movies/entities/movie.entity';
import { Screen } from '../../modules/screens/entities/screen.entity';

export async function seedShows(
  showRepo: Repository<Show>,
  movies: Movie[],
  screens: Screen[],
): Promise<Show[]> {
  const showsData: any[] = [];

  const now = new Date();

  const relativeDate = (
    days: number,
    hours: number
  ): Date => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    d.setHours(hours, 0, 0, 0);
    return d;
  };

  movies.forEach((movie: Movie, index) => {
    const primaryScreen: Screen = screens[index % 3];
    const secondaryScreen: Screen = screens[(index + 1) % 3];

    showsData.push(
      {
        start_time: relativeDate(index, 14 + index),
        end_time: relativeDate(index, 16 + index),
        screen: primaryScreen,
        movie: movie,
      },
      {
        start_time: relativeDate(index + 7, 18),
        end_time: relativeDate(index + 7, 20),
        screen: secondaryScreen,
        movie: movie,
      },
      {
        start_time: relativeDate(index + 14, 21),
        end_time: relativeDate(index + 14, 23),
        screen: screens[2],
        movie: movie,
      }
    );
  });

  const shows: Show[] = showRepo.create(showsData);
  await showRepo.save(shows);
  return shows
}