import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './repositories/comments.repository';
import { CommentRepliesRepository } from './repositories/comment-replies.repository';
import { Comment } from './entities/comment.entity';
import { CommentReply } from './entities/comment-reply.entity';
import { VideosModule } from '../videos/videos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, CommentReply]),
    VideosModule,
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsRepository,
    CommentRepliesRepository,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
