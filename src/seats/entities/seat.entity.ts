import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Screen } from '../../screens/entities/screen.entity';
import { SeatType } from '../enums/seat-type.enum';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: number;

  @Column()
  number: number;

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
}