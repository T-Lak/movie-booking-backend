import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShowsClientService } from './services/shows.client.service';
import { ShowsClientController } from './controllers/shows.client.controller';
import { Show } from './entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [ShowsClientController],
  providers: [ShowsClientService],
})
export class ShowsModule {}
