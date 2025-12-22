import { IsString, IsNotEmpty } from 'class-validator';

export class AddVideoToPlaylistDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;
}

