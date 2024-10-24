import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';  // Assuming User is defined

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);  // Now this works
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: User) {
    const userFromDB = await this.usersService.findByUsername(user.username);
    if (!userFromDB) {
      throw new NotFoundException("Invalid email or password.");
    }

    const isPasswordMatched = await this.isPasswordMatched(user.password, userFromDB.password);
    if (!isPasswordMatched) {
      throw new NotFoundException("Invalid password.");
    }
    const payload = { sub: user.username, _id: userFromDB._id }; // Include the user ID in the payload
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  private async isPasswordMatched(attemptPass: string, password: string) {
    return await bcrypt.compare(attemptPass, password);
  }

  // Modify register to pass an object with both username and password
  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ username, password: hashedPassword });  // Pass a single object
  }
}
