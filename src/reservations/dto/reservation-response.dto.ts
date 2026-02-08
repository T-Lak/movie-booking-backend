import { ReservationStatus } from '../enums/reservation-status.enum';

export class ReservationResponseDto {
  id: number;
  showId: number;
  seatId: number;
  status: ReservationStatus;
  expiresAt: Date | null;
}