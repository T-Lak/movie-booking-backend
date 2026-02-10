import { ScreenAdminResponseDto } from '../dto/screen-admin-response.dto';
import { Screen } from '../entities/screen.entity';

export function toResponse(screen: Screen): ScreenAdminResponseDto {
  return {
    id: screen.id,
    name: screen.name,
  }
}