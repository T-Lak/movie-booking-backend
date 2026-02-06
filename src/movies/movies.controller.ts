import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe
} from '@nestjs/common';

import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieStatus } from './enums/movie-status.enum';

@Controller('movie')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query('status') status?: MovieStatus): Promise<Movie[]> {
    return this.moviesService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moviesService.delete(id);
  }
}