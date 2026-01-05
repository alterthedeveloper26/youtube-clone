import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './repositories/comments.repository';
import { CommentRepliesRepository } from './repositories/comment-replies.repository';
import { VideosRepository } from '../videos/repositories/videos.repository';
import { Comment } from './entities/comment.entity';
import { CommentReply } from './entities/comment-reply.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly commentRepliesRepository: CommentRepliesRepository,
    private readonly videosRepository: VideosRepository,
  ) {}

  async create(data: {
    videoId: string;
    userId: string;
    content: string;
  }): Promise<Comment> {
    const comment = await this.commentsRepository.create(data);
    await this.videosRepository.incrementCommentCount(data.videoId);
    return comment;
  }

  async findByVideoId(videoId: string): Promise<Comment[]> {
    return this.commentsRepository.findByVideoId(videoId);
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(
    id: string,
    content: string,
    userId: string,
  ): Promise<Comment | null> {
    const comment = await this.findById(id);
    if (comment.userId !== userId) {
      throw new NotFoundException('Comment not found');
    }
    return this.commentsRepository.update(id, { content });
  }

  async delete(id: string, userId: string): Promise<void> {
    const comment = await this.findById(id);
    if (comment.userId !== userId) {
      throw new NotFoundException('Comment not found');
    }
    await this.commentsRepository.delete(id);
  }

  async createReply(data: {
    commentId: string;
    userId: string;
    content: string;
  }): Promise<CommentReply> {
    return this.commentRepliesRepository.create(data);
  }

  async getReplies(commentId: string): Promise<CommentReply[]> {
    return this.commentRepliesRepository.findByCommentId(commentId);
  }
}
