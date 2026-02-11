import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { MoviesClientService } from './services/movies.client.service';
import { MoviesClientController } from './controllers/movies.client.controller';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    HttpModule
  ],
  controllers: [MoviesClientController],
  providers: [MoviesClientService],
})
export class MoviesModule {}