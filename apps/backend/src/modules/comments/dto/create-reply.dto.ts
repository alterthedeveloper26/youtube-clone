import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  commentId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content: string;
}

