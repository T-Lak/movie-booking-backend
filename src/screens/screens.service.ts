import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(Screen)
    private readonly  screenRepository: Repository<Screen>,
  ) {}
}