import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Screen } from '../../screens/entity/screen.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @ManyToOne(() => Screen, screen => screen.shows)
  screen: Screen;

  @ManyToOne(() => Movie, movie => movie.shows)
  movie: Movie;
}
