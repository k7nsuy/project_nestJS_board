import { Body, Controller, Delete, Get, Param, Post, Req, Request } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { CurrentUser } from '../spaces/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ChatService } from './chats.service';
import { Post as PostEntity } from '../posts/entities/post.entity';


@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(":postId")
  async createChat(
    @Param('postId') postId: number,
    @Body() createChatDto: CreateChatDto,
    @CurrentUser() user: User,
  ): Promise<Chat> {
    return this.chatService.createChat(postId,createChatDto, user);
  }

  @Get('search/:id')
  async getChat(@Param('id') chatId: number): Promise<Chat> {
    return this.chatService.getChat(chatId);
  }

  @Post(':parentChatId/reply')
  async createReply(
    @Param('parentChatId') parentChatId: number,
    @Body() createChatDto: CreateChatDto,
    @CurrentUser() user: User,
  ): Promise<Chat> {
    return this.chatService.createReply(parentChatId, createChatDto, user);
  }

  @Delete(':chatId')
  async deleteChat(@Param('chatId') chatId: number, @Request() req: any): Promise<void> {
    const user = req.user;
    return this.chatService.deleteChat(chatId, user);
  }
}
