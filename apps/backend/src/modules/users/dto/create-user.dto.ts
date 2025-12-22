import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  clerkId: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

