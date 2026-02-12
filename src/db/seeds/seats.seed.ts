import { Repository } from 'typeorm';
import { Seat } from '../../modules/seats/entities/seat.entity';
import { Screen } from '../../modules/screens/entities/screen.entity';
import { SeatType } from '../../modules/seats/enums/seat-type.enum';

export async function seedSeats(
  seatRepository: Repository<Seat>,
  screens: Screen[],
): Promise<Seat[]> {
  const seats: Seat[] = [];
  screens.forEach((screen: Screen): void => {
    for (let row = 0; row < screen.rows; row++) {
      for (let number = 0; number < screen.seatsPerRow; number++) {
        seats.push(seatRepository.create({
          row: row,
          number: number,
          screen: screen,
          type: SeatType.STANDARD,
        }))
      }
    }
  })
  await seatRepository.save(seats, { chunk: 500 });
  return seats;
}