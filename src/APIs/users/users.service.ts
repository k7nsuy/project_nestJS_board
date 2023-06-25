import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { log } from 'console';

@Injectable()
export class UsersService {
     constructor(
          @InjectRepository(User)
          private readonly userRepository: Repository<User>
     ) {}

     // 유저 생성
     create(createUserDTO: CreateUserDTO): Promise<User> {
          const result = this.userRepository.save({
               ...createUserDTO
          })
          return result
     }

     // 모든 유저 조회
     findAll(): Promise<User[]> {
          const result = this.userRepository.find()
          return result
     }

     // 하나의 유저 조회
     async findOne(userId: number): Promise<User> {
          const user = await this.userRepository.findOne({where: {userId}})
          
          if(!user) {
               throw new NotFoundException('User not found')
          }
          return user;
     }

     // 유저 업데이트
     async updateUser(userId: number, updateUserDTO: UpdateUserDTO): Promise<User> {
          const user = await this.userRepository.findOne({where: {userId}})
          
          if (!user) {
               throw new NotFoundException('유저를 찾을 수 없습니다.');
          }
          
          const result = this.userRepository.save({
               ...user,
               ...updateUserDTO,
          })
          return result
     }

     // 유저 삭제
     async deleteUser(userId: number): Promise<Boolean> {
          const result = await this.userRepository.softDelete(userId)
          return result.affected ? true : false
     }
}
