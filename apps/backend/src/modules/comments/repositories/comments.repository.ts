import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  async create(data: Partial<Comment>): Promise<Comment> {
    return this.repository.save(data);
  }

  async findById(id: string): Promise<Comment | null> {
    return this.repository.findOne({
      where: { id, deletedAt: undefined },
      relations: ['user', 'replies', 'replies.user'],
    });
  }

  async findByVideoId(videoId: string): Promise<Comment[]> {
    return this.repository.find({
      where: { videoId, deletedAt: undefined },
      relations: ['user', 'replies', 'replies.user'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, data: Partial<Comment>): Promise<Comment | null> {
    await this.repository.update(id, data);
    return this.findById(id)!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async incrementLikeCount(id: string): Promise<void> {
    await this.repository.increment({ id }, 'likeCount', 1);
  }
}
