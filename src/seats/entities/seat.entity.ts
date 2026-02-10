import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Screen } from '../../screens/entities/screen.entity';
import { SeatType } from '../enums/seat-type.enum';
import { Reservation } from '../../reservations/entity/reservation.entity';

@Exclude()
@Entity()
export class Seat {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  row: number;

  @Expose()
  @Column()
  number: number;

  @Expose()
  @Column({
    type: 'enum',
    enum: SeatType,
    default: SeatType.STANDARD,
  })
  type: SeatType;

  @ManyToOne(() => Screen,
      screen => screen.seats, { onDelete: 'CASCADE' }
  )
  screen: Screen;

  @OneToMany(() => Reservation, r => r.seat)
  reservations: Reservation[];
}