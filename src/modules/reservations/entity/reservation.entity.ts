import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Seat } from '../../seats/entities/seat.entity';
import { Show } from '../../shows/entities/show.entity';
import { ReservationStatus } from '../enums/reservation-status.enum';

@Entity()
@Unique(['show', 'seat'])
@Index(['show', 'status'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Show, { nullable: false, onDelete: 'CASCADE' })
  show: Show;

  @ManyToOne(() => Seat, { nullable: false })
  seat: Seat;

  @Column({ length: 255 })
  customerEmail: string;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date | null;
}