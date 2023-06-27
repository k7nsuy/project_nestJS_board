import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  attachment: string;

  @IsOptional()
  @IsBoolean()
  isAnonymous: boolean;
}
