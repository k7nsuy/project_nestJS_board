import { IsNotEmpty, IsString } from 'class-validator';

export class JoinSpaceDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
