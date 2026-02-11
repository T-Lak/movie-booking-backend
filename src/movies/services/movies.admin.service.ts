import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { toAdminResponse } from '../helpers/to-admin-response.helper';
import { MovieAdminResponseDto } from '../dto/movie-admin-response.dto';
import { MoviesApiService } from './movies.api.service';

@Injectable()
export class MoviesAdminService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly movieApiService: MoviesApiService,
  ) {}

  async create(dto: CreateMovieDto): Promise<MovieAdminResponseDto> {
    const movie: Movie = this.movieRepository.create(dto);
    const saved: Movie = await this.movieRepository.save(movie);
    await this.movieApiService.cacheMovie(saved);
    return toAdminResponse(saved)
  }

  async update(id: number, dto: UpdateMovieDto): Promise<MovieAdminResponseDto> {
    const movie: Movie | null = await this.movieRepository
      .findOne({ where: { id }, });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    Object.assign(movie, dto);
    const saved: Movie = await this.movieRepository.save(movie);
    await this.movieApiService.cacheMovie(movie)
    return toAdminResponse(saved)
  }

  async delete(id: number): Promise<void> {
    const movie: Movie | null = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    await this.movieRepository.delete(id);
    this.movieApiService.deleteMovie(movie.status, movie.tmdbId)
  }
}