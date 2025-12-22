import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  handle: string; // e.g., @username

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

