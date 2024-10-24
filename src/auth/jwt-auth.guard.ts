import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard using Passport's 'jwt' strategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
