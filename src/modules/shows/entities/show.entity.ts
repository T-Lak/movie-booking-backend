import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { Screen } from '../../screens/entities/screen.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { Reservation } from '../../bookings/entity/reservation.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Entity()
export class Show {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  startTime: Date;

  @Expose()
  @Column()
  endTime: Date;

  @ManyToOne(() => Screen, screen => screen.shows)
  screen: Screen;

  @ManyToOne(() => Movie, movie => movie.shows)
  movie: Movie;

  @OneToMany(() => Reservation, r => r.show)
  reservations: Reservation[];
}
