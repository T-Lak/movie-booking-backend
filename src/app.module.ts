import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowsModule } from './shows/shows.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Reservation } from './reservations/entity/reservation.entity';
import { Seat } from './seats/entities/seat.entity';
import { Screen } from './screens/entities/screen.entity';
import { Show } from './shows/entities/show.entity';
import { Movie } from './movies/entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev',
      password: 'dev',
      database: 'movie_app',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Show, Screen, Seat, Reservation, Movie],
    }),
  ShowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
