import { BookingStatus } from '../enums/bookings-status.enum';
import { Reservation } from '../entity/reservation.entity';

export class BookingResponseDto {
  id: number;
  customerEmail: string;
  status: BookingStatus;
  expiresAt: Date | null;
  reservations: Reservation[]
}