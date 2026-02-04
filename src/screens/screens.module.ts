import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Screen])],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreenModule {}