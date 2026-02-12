import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BookingStatus } from '../enums/bookings-status.enum';
import { Reservation } from './reservation.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Entity()
export class Booking {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  customerEmail: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Expose()
  @Column()
  expiresAt: Date;

  @OneToMany(
    (): typeof Reservation => Reservation, (res: Reservation): Booking =>
      res.booking, { cascade: true }
  )
  reservations: Reservation[];
}