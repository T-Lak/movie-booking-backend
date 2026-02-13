import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { AppModule } from '../../app.module';
import { User } from '../../modules/auth/entities/user.entity';
import { seedUser } from './user.seed';
import { Movie } from '../../modules/movies/entities/movie.entity';
import { seedMovies } from './movies.seed';
import { Screen } from '../../modules/screens/entities/screen.entity';
import { seedScreens } from './screens.seed';
import { Seat } from '../../modules/seats/entities/seat.entity';
import { seedSeats } from './seats.seed';
import { Show } from '../../modules/shows/entities/show.entity';
import { seedShows } from './shows.seed';

async function bootstrap() {
  const app: INestApplicationContext = await NestFactory
    .createApplicationContext(AppModule);
  const dataSource: DataSource = app.get(DataSource);

  try {
    console.log('--- Seeding Started ---');

    await dataSource.transaction(async (manager) => {
      await seedUser(manager.getRepository(User));
      console.log(`Seeded user(s)`);
      const movies: Movie[] = await seedMovies(manager.getRepository(Movie));
      console.log(`Seeded movies`);
      const screens: Screen[] = await seedScreens(manager.getRepository(Screen));
      console.log(`Seeded screens`);
      await seedSeats(manager.getRepository(Seat), screens);
      console.log(`Seeded seats`);
      await seedShows(manager.getRepository(Show), movies, screens)
      console.log(`Seeded shows`);

      console.log('--- Seeding Finished Successfully ---');
    });
  } catch (error) {
    console.error('Seeding failed: ', error);
  } finally {
    await app.close();
  }
}

bootstrap();