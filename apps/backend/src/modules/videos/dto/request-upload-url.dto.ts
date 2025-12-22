import { IsString, IsNotEmpty, IsMimeType } from 'class-validator';

export class RequestUploadUrlDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  @IsMimeType()
  contentType: string; // e.g., 'video/mp4'
}

