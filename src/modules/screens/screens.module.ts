import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensAdminService } from './services/screens.admin.service';
import { ScreensAdminController } from './controllers/screens.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Screen])],
  controllers: [ScreensAdminController],
  providers: [ScreensAdminService],
})
export class ScreenModule {}