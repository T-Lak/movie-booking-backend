import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ScreenSize } from '../enums/screen-size.enum';

export class UpdateScreenAdminDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(ScreenSize)
  @IsNotEmpty()
  size: ScreenSize;
}