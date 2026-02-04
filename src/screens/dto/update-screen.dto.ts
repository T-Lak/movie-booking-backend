import { IsOptional, IsString } from 'class-validator';

export class UpdateScreenDto {
  @IsString()
  @IsOptional()
  name: string;
}