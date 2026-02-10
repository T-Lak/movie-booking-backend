import { IsOptional, IsString } from 'class-validator';

export class UpdateScreenAdminDto {
  @IsString()
  @IsOptional()
  name: string;
}