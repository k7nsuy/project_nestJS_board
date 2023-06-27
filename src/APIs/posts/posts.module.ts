import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserSpace } from '../users_spaces/entities/user-space.entity';
import { Space } from '../spaces/entities/space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, UserSpace, Space])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
