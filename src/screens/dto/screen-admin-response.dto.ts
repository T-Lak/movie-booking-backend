import { ApiProperty } from '@nestjs/swagger';

export class ScreenAdminResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}