import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
