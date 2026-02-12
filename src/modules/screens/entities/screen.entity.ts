import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Seat } from '../../seats/entities/seat.entity';
import { Show } from '../../shows/entities/show.entity';

@Exclude()
@Entity()
export class Screen {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column()
  rows: number;

  @Expose()
  @Column()
  seatsPerRow: number;

  get totalSeats(): number {
    return this.rows * this.seatsPerRow;
  }

  @OneToMany(() => Seat, seat => seat.screen)
  seats: Seat[];

  @OneToMany(() => Show, show => show.screen)
  shows: Show[];
}