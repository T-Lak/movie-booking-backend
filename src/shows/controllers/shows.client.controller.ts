import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ShowsClientService } from '../services/shows.client.service';
import { Show } from '../entities/show.entity';

@Controller('shows')
export class ShowsClientController {
  constructor(private readonly showsService: ShowsClientService) {}

  @Get()
  findAll(): Promise<Show[]> {
    return this.showsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Show> {
    return this.showsService.findOne(id);
  }
}
