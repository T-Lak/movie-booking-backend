import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Screen } from '../../screens/entity/screen.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movie_title: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @ManyToOne(() => Screen, cinema => cinema.shows)
  cinema: Screen;
}
