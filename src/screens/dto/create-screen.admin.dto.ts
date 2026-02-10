import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScreenAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}