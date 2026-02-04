import { Controller } from '@nestjs/common';

import { MoviesService } from './movies.service';

@Controller('movie')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
}