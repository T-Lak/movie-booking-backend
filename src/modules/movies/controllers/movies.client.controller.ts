import {
  Controller, Get, Param, Query, ParseIntPipe, ParseEnumPipe,
} from '@nestjs/common';

import { MoviesClientService } from '../services/movies.client.service';
import { MovieStatus } from '../enums/movie-status.enum';
import { MovieResponseDto } from '../dto/movie-response.dto';

@Controller('movies')
export class MoviesClientController {
  constructor(private readonly moviesService: MoviesClientService) {}

  @Get()
  findAll(
    @Query('status') status?: MovieStatus
  ): Promise<MovieResponseDto[]> {
    return this.moviesService.findAll(status);
  }

  @Get(':status/:tmdbId')
  findOne(
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Param('status', new ParseEnumPipe(MovieStatus)) status: MovieStatus
  ): Promise<MovieResponseDto> {
    return this.moviesService.findOne(tmdbId, status);
  }
}