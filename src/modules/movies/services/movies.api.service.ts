import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { Repository } from 'typeorm';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { Movie } from '../entities/movie.entity';
import { getTmdbMoviePath, getTmdbVideoPath } from '../helpers/misc.helper';
import { toResponse } from '../helpers/to-response.helper';
import { MovieStatus } from '../enums/movie-status.enum';
import { MovieResponseDto } from '../dto/movie-response.dto';

@Injectable()
export class MoviesApiService implements OnModuleInit {

  private cache = new Map<MovieStatus, Map<number, MovieResponseDto>>();

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

  async onModuleInit(): Promise<void> {
    await this.preloadCache()
  }

  getAllMovies(): MovieResponseDto[] {
    const all: MovieResponseDto[] = [];
    this.cache.forEach((statusMap: Map<number, MovieResponseDto>) => {
      all.push(...statusMap.values());
    });
    return all;
  }

  getMoviesByStatus(status: MovieStatus): MovieResponseDto[] {
    const statusMap: Map<number, MovieResponseDto> | undefined = this.cache.get(status);
    return statusMap ? Array.from(statusMap.values()) : [];
  }

  getMovie(status: MovieStatus, tmdbId: number): MovieResponseDto | undefined {
    return this.cache.get(status)?.get(tmdbId);
  }

  async cacheMovie(movie: Movie): Promise<void> {
    const responseDto: MovieResponseDto = await this.getMovieResponseDto(movie)
    this.cache.get(movie.status)?.set(movie.tmdbId, responseDto)
  }

  deleteMovie(status: MovieStatus, tmdbId: number): void {
    this.cache.get(status)?.delete(tmdbId);
  }

  private async preloadCache(): Promise<void> {
    const movies: Movie[] = await this.movieRepository.find()

    await Promise.all(
      movies.map(async (movie: Movie): Promise<void> => {
        const cache: Map<number, any> | undefined = this.cache.get(movie.status)
        if (!cache) {
          throw new NotFoundException(
            `Cache does not contain status '${movie.status}'`
          )
        }
        const responseDto: MovieResponseDto = await this.getMovieResponseDto(movie)
        cache.set(movie.tmdbId, responseDto)
      })
    )
  }

  private async getMovieResponseDto(movie: Movie): Promise<MovieResponseDto> {
    const moviePath: string = getTmdbMoviePath(movie.tmdbId)
    const videoPath: string = getTmdbVideoPath(movie.tmdbId)

    const [movieMeta, videoMeta] = await Promise.all([
      this.fetchMetadataFromTmdbApi(moviePath),
      this.fetchMetadataFromTmdbApi(videoPath),
    ]);

    return toResponse(movie, movieMeta, videoMeta)
  }

  private async fetchMetadataFromTmdbApi(path: string): Promise<any> {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.get(
        'https://api.themoviedb.org/3/' + path,
        { params: { api_key: this.apiKey } },
      ),
    );
    return response.data;
  }

  private get apiKey(): string {
    return this.configService.getOrThrow<string>('TMDB_API_KEY');
  }
}