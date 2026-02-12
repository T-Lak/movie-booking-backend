import { Reservation } from '../entity/reservation.entity';
import { ReservationResponseDto } from '../dto/reservation-response.dto';

export function toResponse(reservation: Reservation): ReservationResponseDto {
  return {
    id:        reservation.id,
    showId:    reservation.show.id,
    seatId:    reservation.seat.id,
    status:    reservation.status,
    expiresAt: reservation.expiresAt,
  }
}