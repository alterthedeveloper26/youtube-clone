import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CompleteUploadDto {
  @IsString()
  @IsNotEmpty()
  videoKey: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;
}

