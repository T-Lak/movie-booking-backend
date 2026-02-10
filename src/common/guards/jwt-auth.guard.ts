import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// 'jwt' matches the name of the strategy we will define next
export class JwtAuthGuard extends AuthGuard('jwt') {}