import { Repository } from 'typeorm';
import { Screen } from '../modules/screens/entities/screen.entity';

export async function seedScreens(
  screenRepo: Repository<Screen>
): Promise<Screen[]> {
  const screens: Screen[] = screenRepo.create([
    { name: "Screen 1" },
    { name: "Screen 2" },
  ])

  await screenRepo.save(screens)
  return screens
}


// function createSeats(numRows: number, numRowSeats: number) {
//   const seats: Seat[] = [];
//
//   for (let row = 0; row < numRows; row++) {
//     for (let seat = 0; seat < numRowSeats; seat++) {
//       seats.push({
//         row: row,
//         number: seat,
//       })
//     }
//   }
// }