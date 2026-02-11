import {
  Body, Delete, Param, Patch, Post, ParseIntPipe,
} from '@nestjs/common';

import { AdminController } from '../../common/decorators/admin-controller.decorator';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { MovieAdminResponseDto } from '../dto/movie-admin-response.dto';
import { MoviesAdminService } from '../services/movies.admin.service';

@AdminController('movie')
export class MoviesAdminController {
  constructor(private readonly moviesService: MoviesAdminService) {}

  @Post()
  createMovie(
    @Body() createMovieDto: CreateMovieDto
  ): Promise<MovieAdminResponseDto> {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieDto,
  ): Promise<MovieAdminResponseDto> {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  deleteMovie(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.moviesService.delete(id);
  }
}