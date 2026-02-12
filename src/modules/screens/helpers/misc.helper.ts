import { ScreenSize } from '../enums/screen-size.enum';

export interface IScreenLayout {
  rows: number;
  seatsPerRow: number;
}

export const SCREEN_LAYOUTS: Record<ScreenSize, IScreenLayout> = {
  [ScreenSize.SMALL]:  { rows: 5,  seatsPerRow: 10 },
  [ScreenSize.MEDIUM]: { rows: 5,  seatsPerRow: 15 },
  [ScreenSize.BIG]:    { rows: 10, seatsPerRow: 10 },
};