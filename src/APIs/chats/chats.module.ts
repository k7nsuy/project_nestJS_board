import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatController } from './chats.controller';
import { ChatService } from './chats.service';
import { Post } from '../posts/entities/post.entity';
import { Space } from '../spaces/entities/space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Post, Space])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatsModule {}
