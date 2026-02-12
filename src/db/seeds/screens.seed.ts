import { Repository } from 'typeorm';
import { Screen } from '../../modules/screens/entities/screen.entity';
import { IScreenLayout, SCREEN_LAYOUTS } from '../../modules/screens/helpers/misc.helper';

export async function seedScreens(
  screenRepo: Repository<Screen>,
): Promise<Screen[]> {
  const smallLayout: IScreenLayout = SCREEN_LAYOUTS['SMALL'];
  const mediumLayout: IScreenLayout = SCREEN_LAYOUTS['MEDIUM'];
  const bigLayout: IScreenLayout = SCREEN_LAYOUTS['BIG'];

  const screens: Screen[] = screenRepo.create([
    {
      name: "Screen 1",
      rows: smallLayout.rows,
      seatsPerRow: smallLayout.seatsPerRow,
    },
    {
      name: "Screen 2",
      rows: mediumLayout.rows,
      seatsPerRow: mediumLayout.seatsPerRow,
    },
    {
      name: "Screen 3",
      rows: bigLayout.rows,
      seatsPerRow: bigLayout.seatsPerRow,
    },
  ])

  await screenRepo.save(screens)
  return screens
}