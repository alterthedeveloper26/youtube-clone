import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { VideoLike, LikeType } from '../entities/video-like.entity';

@Injectable()
export class LikesRepository {
  constructor(
    @InjectRepository(VideoLike)
    private readonly repository: Repository<VideoLike>,
  ) {}

  async create(data: {
    videoId: string;
    userId: string;
    type: LikeType;
  }): Promise<VideoLike> {
    // Check if like already exists
    const existing = await this.repository.findOne({
      where: {
        videoId: data.videoId,
        userId: data.userId,
        deletedAt: IsNull(),
      },
    });

    if (existing) {
      // Update existing like
      existing.type = data.type;
      return this.repository.save(existing);
    }

    return this.repository.save(data);
  }

  async findByVideoAndUser(
    videoId: string,
    userId: string,
  ): Promise<VideoLike | null> {
    return this.repository.findOne({
      where: { videoId, userId, deletedAt: IsNull() },
    });
  }

  async delete(videoId: string, userId: string): Promise<void> {
    await this.repository.softDelete({ videoId, userId });
  }
}
