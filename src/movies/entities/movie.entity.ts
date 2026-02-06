import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Show } from '../../shows/entities/show.entity';
import { MovieStatus } from '../enums/movie-status.enum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  tmdbId: number;

  @Column({
    type: 'enum',
    enum: MovieStatus,
  })
  status: MovieStatus;

  @OneToMany(() => Show, show => show.movie, { cascade: true })
  shows: Show[];
}