import { Controller, Body, UseGuards, Post, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { CurrentUser } from '../spaces/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Post as PostEntity } from './entities/post.entity';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto, user);
  }

  @Get(':spaceId')
  async getPostsBySpace(@Param('spaceId') spaceId: number): Promise<PostEntity[]> {
    return this.postsService.getPostsBySpace(spaceId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async softDeletePost(
    @Param('id', ParseIntPipe) postId: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.postsService.deletePost(postId, user);
}

}
