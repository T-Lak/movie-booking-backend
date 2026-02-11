import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Show, show => show.movie, { cascade: true })
  shows: Show[];
}