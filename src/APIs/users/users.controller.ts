import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
     constructor(private readonly usersService: UsersService) {}

     // 유저 생성
     @Post()
     createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
          return this.usersService.create(createUserDTO)
     }

     // 모든 유저 조회
     @Get()
     findAllUsers(): Promise<User[]> {
          return this.usersService.findAll();
     }

     // 하나의 유저 조회
     @Get(':userId')
     findOneUser(@Param('userId') userId: number): Promise<User> {
          return this.usersService.findOne(userId)
     }

     // 유저 업데이트
     @Put(':userId')
     updateUser(
          @Param('userId') userId: number, 
          @Body() updateUserDTO: UpdateUserDTO): Promise<User> {
          return this.usersService.updateUser(userId, updateUserDTO)
     }

     // 유저 삭제
     @Delete(':userId')
     deleteUser(@Param('userId') userId: number): Promise<Boolean> {
          return this.usersService.deleteUser(userId)
     }
}
