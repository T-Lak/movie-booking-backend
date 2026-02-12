import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { ShowsClientController } from './controllers/shows.client.controller';
import { ShowsAdminController } from './controllers/shows.admin.controller';
import { ShowsClientService } from './services/shows.client.service';
import { ShowsAdminService } from './services/shows.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [
    ShowsClientController,
    ShowsAdminController,
  ],
  providers: [
    ShowsClientService,
    ShowsAdminService,
  ],
})
export class ShowsModule {}
