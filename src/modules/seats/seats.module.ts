import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Seat } from './entities/seat.entity';
import { SeatsAdminController } from './controllers/seats.admin.controller';
import { SeatsAdminService } from './services/seats.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [SeatsAdminController],
  providers: [SeatsAdminService],
})
export class SeatsModule {}