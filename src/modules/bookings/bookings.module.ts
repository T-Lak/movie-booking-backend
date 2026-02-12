import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Booking } from './entity/bookings.entity';
import { Reservation } from './entity/reservation.entity';
import { BookingsClientController } from './controllers/bookings.client.controller';
import { BookingsClientService } from './services/bookings.client.service';
import { BookingsCleanupService } from './services/bookings.cleanup.service';
import { BookingsAdminController } from './controllers/bookings.admin.controller';
import { BookingsAdminService } from './services/bookings.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Booking,
    Reservation,
    ],
  )],
  controllers: [
    BookingsClientController,
    BookingsAdminController,
  ],
  providers: [
    BookingsClientService,
    BookingsAdminService,
    BookingsCleanupService
  ],
})
export class BookingsModule {}