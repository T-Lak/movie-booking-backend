import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ShowsModule } from './modules/shows/shows.module';
import { Reservation } from './modules/bookings/entity/reservation.entity';
import { Seat } from './modules/seats/entities/seat.entity';
import { Screen } from './modules/screens/entities/screen.entity';
import { Show } from './modules/shows/entities/show.entity';
import { Movie } from './modules/movies/entities/movie.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { ScreenModule } from './modules/screens/screens.module';
import { MoviesModule } from './modules/movies/movies.module';
import { SeatsModule } from './modules/seats/seats.module';
import { BookingsModule } from './modules/bookings/bookings.module'
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';

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
    BookingsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
