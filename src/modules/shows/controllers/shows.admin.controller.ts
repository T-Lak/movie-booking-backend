import { Post, Param, Body, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { AdminController } from '../../../common/decorators/admin-controller.decorator';

import { Show } from '../entities/show.entity';
import { CreateShowDto } from '../dto/create-show.dto';
import { UpdateShowDto } from '../dto/update-show.dto';
import { ShowsAdminService } from '../services/shows.admin.service';

@AdminController('shows')
export class ShowsAdminController {
  constructor(private readonly showsService: ShowsAdminService) {}

  @Post()
  create(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.showsService.create(createShowDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateShowDto,
  ): Promise<Show> {
    return this.showsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.showsService.delete(id);
  }
}