import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Screen } from './entities/screen.entity';
import { Seat } from '../seats/entities/seat.entity';
import { ScreensAdminController } from './controllers/screens.admin.controller';
import { ScreensAdminService } from './services/screens.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Screen, Seat])],
  controllers: [ScreensAdminController],
  providers: [ScreensAdminService],
})
export class ScreenModule {}