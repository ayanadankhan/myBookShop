import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Use Passport's 'local' strategy
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
