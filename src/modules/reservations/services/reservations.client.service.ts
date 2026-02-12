import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import { Reservation } from '../entity/reservation.entity';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { toResponse } from '../helpers/to-respone.helper';
import { Show } from '../../shows/entities/show.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { ReservationStatus } from '../enums/reservation-status.enum';

@Injectable()
export class ReservationsClientService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
  ) {}

  async create(dto: CreateReservationDto): Promise<ReservationResponseDto[]> {
    return await this.reservationsRepository.manager.transaction(
      async (manager: EntityManager): Promise<ReservationResponseDto[]> => {
        const show: Show = await this.getShowOrThrow(dto.showId, manager);
        const seats: Seat[] = await this.getSeatsOrThrow(dto.seatIds, manager);

        await this.ensureSeatsAreAvailable(dto.showId, dto.seatIds, manager);

        const reservations: Reservation[] = seats.map((seat: Seat): Reservation =>
          manager.create(Reservation, {
            show,
            seat,
            customerEmail: dto.customerEmail,
            status: ReservationStatus.ACTIVE,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
          })
        );

        const saved: Reservation[] = await manager.save(reservations);
        return saved.map(toResponse);
      }
    )
  }

  private async getShowOrThrow(showId: number, manager: EntityManager): Promise<Show> {
    const show: Show | null = await manager.findOneBy(Show, { id: showId })

    if (!show) {
      throw new NotFoundException(`Show ${showId} not found`);
    }

    return show;
  }

  private async getSeatsOrThrow(
    seatIds: number[],
    manager: EntityManager
  ): Promise<Seat[]> {
    const seats: Seat[] = await manager.find(Seat, {
      where: { id: In(seatIds)}
    })

    if (seats.length !== seatIds.length) {
      const foundIds: number[] = seats.map(s => s.id);
      const missing: number[] = seatIds
        .filter(id => !foundIds.includes(id));
      throw new NotFoundException(
        `Seats not found: ${missing.join(', ')}`
      );
    }

    return seats;
  }

  private async ensureSeatsAreAvailable(
    showId: number,
    seatIds: number[],
    manager: EntityManager,
  ): Promise<void> {
    const takenSeats: Reservation[] = await manager.find(Reservation, {
      where: {
        show: { id: showId },
        seat: { id: In(seatIds) },
        status: In([ReservationStatus.PENDING, ReservationStatus.ACTIVE])
      },
      lock: { mode: 'pessimistic_write' }
    });

    if (takenSeats.length > 0) {
      const takenIds: number[] = takenSeats.map(
        (r: Reservation): number => r.seat.id
      );
      throw new ConflictException(
        `Seats already reserved: ${takenIds.join(', ')}`
      );
    }
  }
}