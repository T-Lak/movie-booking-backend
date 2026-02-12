import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ScreenSize } from '../enums/screen-size.enum';

export class CreateScreenAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ScreenSize)
  @IsNotEmpty()
  size: ScreenSize;
}