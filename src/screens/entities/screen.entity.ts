import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from '../../seats/entities/seat.entity';
import { Show } from '../../shows/entities/show.entity';

@Entity()
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Seat, seat => seat.screen)
  seats: Seat[];

  @OneToMany(() => Show, show => show.screen)
  shows: Show[];
}