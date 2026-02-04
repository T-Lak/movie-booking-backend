import { Controller, Get, Post, Param, Body, ParseIntPipe, Patch, Delete } from '@nestjs/common';

import { ShowsService } from './shows.service';
import { Show } from './entities/show.entity';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get()
  findAll(): Promise<Show[]> {
    return this.showsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Show> {
    return this.showsService.findOne(id);
  }

  @Post()
  createShow(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.showsService.create(createShowDto);
  }

  @Patch(':id')
  async updateShow(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateShowDto,
  ): Promise<Show> {
    return this.showsService.update(id, dto);
  }

  @Delete(':id')
  deleteShow(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.showsService.delete(id);
  }
}
