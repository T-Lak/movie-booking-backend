import { Injectable, NotFoundException } from '@nestjs/common';

import { MovieStatus } from '../enums/movie-status.enum';
import { MovieResponseDto } from '../dto/movie-response.dto';
import { MoviesApiService } from './movies.api.service';

@Injectable()
export class MoviesClientService {

  constructor(
    private readonly movieApiService: MoviesApiService
  ) {}

  async findAll(status?: MovieStatus): Promise<MovieResponseDto[]> {
    if (status) {
      return this.movieApiService.getMoviesByStatus(status);
    }
    return this.movieApiService.getAllMovies();
  }

  async findOne(tmdbId: number, status: MovieStatus): Promise<MovieResponseDto> {
    const movie: MovieResponseDto | undefined = this.movieApiService
      .getMovie(status, tmdbId);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${tmdbId} not found`);
    }
    return movie;
  }
}