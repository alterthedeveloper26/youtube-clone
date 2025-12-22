import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentReply } from '../entities/comment-reply.entity';

@Injectable()
export class CommentRepliesRepository {
  constructor(
    @InjectRepository(CommentReply)
    private readonly repository: Repository<CommentReply>,
  ) {}

  async create(data: Partial<CommentReply>): Promise<CommentReply> {
    return this.repository.save(data);
  }

  async findByCommentId(commentId: string): Promise<CommentReply[]> {
    return this.repository.find({
      where: { commentId, deletedAt: null },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
  }
}
