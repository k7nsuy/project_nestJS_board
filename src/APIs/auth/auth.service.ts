// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/APIs/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);
    console.log(password);
    console.log(user.password);
    console.log(isPasswordValid);
    
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async validateUserById(userId: number): Promise<User | null> {
    const user = await this.userService.findOne(userId);
    return user || null;
  }

  async login(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  
}
