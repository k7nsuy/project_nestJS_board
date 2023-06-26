import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
     constructor(
          @InjectRepository(User)
          private readonly userRepository: Repository<User>,
     ) {}

     // 유저 생성
     async create(createUserDTO: CreateUserDTO): Promise<User> {
          const { password, ...userData } = createUserDTO;

          // 비밀번호 해싱
          const hashedPassword = bcrypt.hashSync(password, 10);
      
          // 해싱된 비밀번호로 유저 생성
          const result = await this.userRepository.save({
            ...userData,
            password: hashedPassword,
          });
      
          return result;
     }

     // 모든 유저 조회
     findAll(): Promise<User[]> {
          const result = this.userRepository.find()
          return result
     }

     // 하나의 유저 id로 조회
     async findOne(userId: number): Promise<User> {
          const user = await this.userRepository.findOne({where: {id: userId}})
          
          if(!user) {
               throw new NotFoundException('해당 User를 찾을 수 없습니다.')
          }
          return user;
     }

     // 하나의 유저 이메일로 조회
     async findByEmail(email: string): Promise<User> {
          const findEmail = await this.userRepository.findOne({ where: {email: email} });
          if(!findEmail) {
               throw new NotFoundException('Email을 찾을 수 없습니다.')
          }
          return findEmail;
     }

     // 유저 업데이트
     async updateUser(userId: number, updateUserDTO: UpdateUserDTO): Promise<User> {
          const user = await this.userRepository.findOne({where: {id: userId}})
          
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
