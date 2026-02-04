import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Seat } from '../seats/entities/seat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Seat)
    private readonly reservationsRepository: Repository<Seat>,
  ) {}
}