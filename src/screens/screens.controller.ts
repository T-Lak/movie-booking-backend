import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { Screen } from './entities/screen.entity';
import { ScreensService } from './screens.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';

@Controller('screen')
export class ScreensController {
  constructor(private readonly screenService: ScreensService) {}

  @Get()
  findAll(): Promise<Screen[]> {
    return this.screenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Screen> {
    return this.screenService.findOne(id);
  }

  @Post()
  createScreen(@Body() createScreenDto: CreateScreenDto): Promise<Screen> {
    return this.screenService.create(createScreenDto);
  }

  @Patch(':id')
  async updateScreen(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateScreenDto,
  ): Promise<Screen> {
    return this.screenService.update(id, dto);
  }

  @Delete(':id')
  deleteScreen(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.screenService.delete(id);
  }
}
