import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { ScreensAdminService } from '../services/screens.admin.service';
import { CreateScreenAdminDto } from '../dto/create-screen.admin.dto';
import { UpdateScreenAdminDto } from '../dto/update-screen.admin.dto';
import { AdminController } from '../../common/decorators/admin-controller.decorator';
import { ScreenAdminResponseDto } from '../dto/screen-admin-response.dto';

@AdminController('screens')
export class ScreensAdminController {
  constructor(private readonly screenService: ScreensAdminService) {}

  @Get()
  findAll(): Promise<ScreenAdminResponseDto[]> {
    return this.screenService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ScreenAdminResponseDto> {
    return this.screenService.findOne(id);
  }

  @Post()
  create(
    @Body() createScreenDto: CreateScreenAdminDto
  ): Promise<ScreenAdminResponseDto> {
    return this.screenService.create(createScreenDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateScreenAdminDto,
  ): Promise<ScreenAdminResponseDto> {
    return this.screenService.update(id, dto);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.screenService.delete(id);
  }
}
