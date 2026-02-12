import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entity/reservation.entity';
import { ReservationsClientController } from './controllers/reservations.client.controller';
import { ReservationsClientService } from './services/reservations.client.service';
import { ReservationsCleanupService } from './services/reservations.cleanup.service';
import { ReservationsAdminController } from './controllers/reservations.admin.controller';
import { ReservationsAdminService } from './services/reservations.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [
    ReservationsClientController,
    ReservationsAdminController,
  ],
  providers: [
    ReservationsClientService,
    ReservationsAdminService,
    ReservationsCleanupService
  ],
})
export class ReservationsModule {}