import { Controller } from '@nestjs/common';
import { ScreensService } from './screens.service';

@Controller('screen')
export class ScreensController {
  constructor(private readonly screenService: ScreensService) {}
}
