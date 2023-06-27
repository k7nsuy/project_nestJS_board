import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/APIs/posts/entities/post.entity';
import { User } from 'src/APIs/users/entities/user.entity';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserSpace } from '../users_spaces/entities/user-space.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Post)
    private readonly userSpaceRepository: Repository<UserSpace>,
  ) {}

  async createChat(postId: number, createChatDto: CreateChatDto, user: User): Promise<Chat> {
    const post = await this.postRepository.findOne({where: {id: postId}});
    console.log(post);
    
    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    const chat = new Chat();
    chat.content = createChatDto.content;
    chat.isAnonymous = createChatDto.isAnonymous;
    chat.author = user;
    chat.post = post;

    return this.chatRepository.save(chat);
  }

  async getChat(chatId: number): Promise<Chat> {
     const chat = await this.chatRepository.findOne({where: {id :chatId}});
     if (!chat) {
       throw new NotFoundException('채팅을 찾을 수 없습니다.');
     }
     return chat;
   }


async createReply(parentChatId: number, createChatDto: CreateChatDto, user: User): Promise<Chat> {
     const parentChat = await this.chatRepository.findOne({where: {id: parentChatId}});
     if (!parentChat) {
     throw new NotFoundException('부모 채팅을 찾을 수 없습니다.');
     }

     const reply = new Chat();
     reply.content = createChatDto.content;
     reply.isAnonymous = createChatDto.isAnonymous;
     reply.author = user;
     reply.post = parentChat.post;
     reply.parentComment = parentChat;

     return this.chatRepository.save(reply);
}

async deleteChat(chatId: number, user: User): Promise<void> {
     const chat = await this.chatRepository.findOne({
          where: {id: chatId}, 
       relations: ['author', 'post'],
     });
   
     if (!chat) {
       throw new NotFoundException('채팅을 찾을 수 없습니다.');
     }
   
     await this.chatRepository.softDelete(chatId);
   }
   
   
}