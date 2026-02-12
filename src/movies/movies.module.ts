import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { Movie } from './entities/movie.entity';
import { MoviesClientController } from './controllers/movies.client.controller';
import { MoviesAdminController } from './controllers/movies.admin.controller';
import { MoviesClientService } from './services/movies.client.service';
import { MoviesAdminService } from './services/movies.admin.service';
import { MoviesApiService } from './services/movies.api.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    HttpModule
  ],
  controllers: [
    MoviesClientController,
    MoviesAdminController,
  ],
  providers: [
    MoviesClientService,
    MoviesAdminService,
    MoviesApiService,
  ],
})
export class MoviesModule {}