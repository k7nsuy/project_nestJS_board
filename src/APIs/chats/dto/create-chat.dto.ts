import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isAnonymous: boolean;

  @IsNotEmpty()
  postId: number;

  parentId?: number;
}
