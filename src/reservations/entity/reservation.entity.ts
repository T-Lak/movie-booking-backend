import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Seat } from '../../seats/entities/seat.entity';
import { Show } from '../../shows/entities/show.entity';

@Entity()
@Unique(['show', 'seat'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Show)
  show: Show;

  @ManyToOne(() => Seat)
  seat: Seat;

  @Column()
  customerEmail: string;

  @Column({ default: 'CONFIRMED' })
  status: string;
}