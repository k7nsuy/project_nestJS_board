import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { SpaceRole } from '../spaces-roles/entities/space-role.entity';
import { UserSpace } from '../users_spaces/entities/user-space.entity';
import { Space } from '../spaces/entities/space.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(UserSpace)
    private readonly userSpaceRepository: Repository<UserSpace>,
    @InjectRepository(Space)
    private readonly spaceRepository: Repository<Space>,
  ) {}

  async getPostsBySpace(spaceId: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { space: { id: spaceId }},
    });

    return posts;
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
     const { title, content, type, attachment, isAnonymous } = createPostDto;

     const userSpace = await this.userSpaceRepository.findOne({
       where: { user },
       relations: ['spaceRole', 'spaceRole.space', 'space'],
     });

     if (!userSpace.spaceRole.isAdmin) {
          // 참여자는 "질문"만 작성 가능
          if (createPostDto.type !== "notice") {
            throw new ForbiddenException("참여자는 질문 게시글만 작성할 수 있습니다.");
          }
        }

     // type이 "notice" 또는 "question"이 아닐 경우 예외 처리
     if (type !== "notice" && type !== "question") {
        throw new BadRequestException("유효한 게시글 유형이 아닙니다.");
     }

     if (isAnonymous && type !== 'question') {
          throw new BadRequestException('익명 상태에서는 question 타입의 게시물만 작성할 수 있습니다.');
     }
      
     if (isAnonymous && !userSpace.spaceRole.isAdmin) {
     throw new ForbiddenException('관리자는 익명 상태에서 게시물을 작성할 수 없습니다.');
     }
   
     const post = new Post();
     post.title = title;
     post.content = content;
     post.type = type;
     post.attachment = attachment;
     post.isAnonymous = isAnonymous;
     post.author = user;
     post.space = userSpace.space

     try {
       return await this.postRepository.save(post);
     } catch (error) {
       throw new Error('게시글 생성에 실패했습니다.');
     }
   }

   async deletePost(postId: number, user: User): Promise<void> {
     const post = await this.postRepository.findOne({
          where: {id: postId},
     });
   
     if (!post) {
       throw new NotFoundException('게시물을 찾을 수 없습니다.');
     }

     const userSpace = await this.userSpaceRepository.findOne({
          where: { user },
          relations: ['spaceRole', 'spaceRole.space', 'space'],
        });
   
     // 사용자가 관리자 또는 작성자인지 확인
     if (!userSpace.spaceRole.isAdmin && post.author.id !== user.id) {
       throw new ForbiddenException('게시물을 삭제할 권한이 없습니다.');
     }
   
     post.deletedAt = new Date();
   
     try {
       await this.postRepository.save(post);
     } catch (error) {
       throw new Error('게시물 삭제에 실패했습니다.');
     }
   }
}
