import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ShowsModule } from './shows/shows.module';
import { Reservation } from './reservations/entity/reservation.entity';
import { Seat } from './seats/entities/seat.entity';
import { Screen } from './screens/entities/screen.entity';
import { Show } from './shows/entities/show.entity';
import { Movie } from './movies/entities/movie.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { ScreenModule } from './screens/screens.module';
import { MoviesModule } from './movies/movies.module';
import { SeatsModule } from './seats/seats.module';
import { ReservationsModule } from './reservations/reservations.module'
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ShowsModule,
    ScreenModule,
    MoviesModule,
    SeatsModule,
    ReservationsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
