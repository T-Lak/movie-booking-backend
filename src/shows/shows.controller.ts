import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { Show } from './entities/show.entity';

import { CreateShowDto } from './dto/create-show.dto';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  // GET /shows
  @Get()
  findAll(): Promise<Show[]> {
    return this.showsService.findAll();
  }

  // GET /shows/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Show> {
    return this.showsService.findOne(id);
  }

  // POST /shows
  @Post()
  create(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.showsService.create(createShowDto);
  }
}
