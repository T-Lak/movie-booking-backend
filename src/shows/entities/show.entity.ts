import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { Screen } from '../../screens/entities/screen.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { Reservation } from '../../reservations/entity/reservation.entity';

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

  @OneToMany(() => Reservation, r => r.show)
  reservations: Reservation[];
}
