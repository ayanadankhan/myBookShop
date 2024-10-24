import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './user.interface';  // Adjust the path as needed
import { UsersService } from 'src/users/users.service'; // Adjust the path as needed

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService, // Inject UsersService
    private readonly configService: ConfigService, // Inject ConfigService for better management
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:"hsadhasdhjsahjas", // Use secret from environment or fallback
    });
  }

  // Return the user payload
  async validate(payload: { sub: string }){
    console.log('Payload:', payload); // Log the payload
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException();
    }
    return user; // Return the user object if found
  }
}
