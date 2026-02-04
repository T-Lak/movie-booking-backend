import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Screen } from '../../screens/entity/screen.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: number;

  @Column()
  number: number;

  @Column()
  type: string;

  @ManyToOne(() =>
    Screen, screen => screen.seats, { onDelete: 'CASCADE' }
  )
  screen: Screen;
}