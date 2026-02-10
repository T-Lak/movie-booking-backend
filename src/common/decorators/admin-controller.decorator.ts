import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Role } from '../enums/role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { toTitleCase } from '../helpers/string.helpers';

export function AdminController(path: string) {
  return applyDecorators(
    Controller(`admin/${path}`),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(Role.ADMIN),
    ApiTags(`Admin - ${toTitleCase(path)}`),
  );
}