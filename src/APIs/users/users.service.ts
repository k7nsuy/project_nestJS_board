import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
     constructor(
          @InjectRepository(User)
          private readonly userRepository: UserRepository
      ) {}

      async getUser(id: number): Promise<User> {
          return this.userRepository.getUserById(id)
      }
}
