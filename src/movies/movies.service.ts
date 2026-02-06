import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { DeleteResult, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieStatus } from './enums/movie-status.enum';

@Injectable()
export class MoviesService {

  private cache = new Map<MovieStatus, Map<number, any>>();

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    for (const status of Object.values(MovieStatus)) {
      this.cache.set(status, new Map());
    }
  }

  private get apiKey(): string {
    return this.configService.getOrThrow<string>('TMDB_API_KEY');
  }

  async onModuleInit() {
    await this.preloadCache()
  }

  private async preloadCache() {
    const movies: Movie[] = await this.movieRepository.find()

    await Promise.all(
      movies.map(async (movie: Movie) => {
        const cache: Map<number, any> | undefined = this.cache.get(movie.status)
        if (!cache) {
          throw new NotFoundException(
            `Cache does not contain status '${movie.status}'`
          )
        }
        const data: any = await this.fetchFromTmdbApi(movie.tmdbId)
        cache.set(movie.tmdbId, data)
      })
    )
  }

  private async fetchFromTmdbApi(tmdbId: number): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://api.themoviedb.org/3/movie/${tmdbId}`,
        { params: { api_key: this.apiKey } },
      ),
    );
    return response.data;
  }

  async findAll(status?: MovieStatus): Promise<any[]> {
    if (status) {
      const cache = this.cache.get(status);
      if (!cache) return [];
      return Array.from(cache.values());
    }

    const allMovies: any[] = [];
    for (const cache of this.cache.values()) {
      allMovies.push(...Array.from(cache.values()));
    }
    return allMovies;
  }

  async findOne(id: number): Promise<Movie> {
    const movie: Movie | null = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie ${id} not found`);
    }
    return movie;
  }

  create(dto: CreateMovieDto): Promise<Movie> {
    const movie: Movie = this.movieRepository.create(dto);
    return this.movieRepository.save(movie);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    const movie: Movie | null = await this.movieRepository.findOne({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    Object.assign(movie, dto);
    return this.movieRepository.save(movie);
  }

  async delete(id: number): Promise<void> {
    const result: DeleteResult = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }
}