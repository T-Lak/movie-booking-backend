import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Seat } from '../../seats/entities/seat.entity';
import { Show } from '../../shows/entities/show.entity';
import { ReservationStatus } from '../enums/reservation-status.enum';

@Entity()
@Unique(['show', 'seat'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Show)
  show: Show;

  @ManyToOne(() => Seat)
  seat: Seat;

  @Column({ length: 255 })
  customerEmail: string;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.NONE,
  })
  status: ReservationStatus;
}