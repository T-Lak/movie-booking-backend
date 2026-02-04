import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Show } from '../../shows/entities/show.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  duration: number;

  @Column()
  description: string;

  @OneToMany(() => Show, show => show.movie, { cascade: true })
  shows: Show[];
}