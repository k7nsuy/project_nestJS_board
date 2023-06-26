import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSpace } from './entities/user-space.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSpace])
  ],
})
export class UserSpaceModule {}
