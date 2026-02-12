import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Seat } from '../../seats/entities/seat.entity';
import { Show } from '../../shows/entities/show.entity';
import { Booking } from './bookings.entity';

@Entity()
@Unique(['show', 'seat'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (): typeof Booking => Booking, (booking: Booking): Reservation[] =>
      booking.reservations, { onDelete: 'CASCADE' }
  )
  booking: Booking;

  @ManyToOne(
    (): typeof Show => Show, (show: Show): Reservation[] =>
      show.reservations
  )
  show: Show;

  @ManyToOne((): typeof Seat => Seat)
  seat: Seat;
}