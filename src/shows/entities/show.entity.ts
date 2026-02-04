import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
