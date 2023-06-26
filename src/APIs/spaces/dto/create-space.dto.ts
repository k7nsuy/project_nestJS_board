import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateSpaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean = true;
}
