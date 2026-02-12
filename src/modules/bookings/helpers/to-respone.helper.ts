import { BookingResponseDto } from '../dto/booking-response.dto';
import { Booking } from '../entity/bookings.entity';

export function toResponse(booking: Booking): BookingResponseDto {
  return {
    id:            booking.id,
    customerEmail: booking.customerEmail,
    status:        booking.status,
    expiresAt:     booking.expiresAt,
    reservations:  booking.reservations,
  }
}