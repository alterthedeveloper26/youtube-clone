import { Injectable } from '@nestjs/common';
import { LikesRepository } from './repositories/likes.repository';
import { VideosRepository } from '../videos/repositories/videos.repository';
import { LikeType } from './entities/video-like.entity';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly videosRepository: VideosRepository,
  ) {}

  async toggleLike(
    videoId: string,
    userId: string,
    type: LikeType,
  ): Promise<void> {
    const existing = await this.likesRepository.findByVideoAndUser(
      videoId,
      userId,
    );

    if (existing) {
      if (existing.type === type) {
        // Remove like/dislike
        await this.likesRepository.delete(videoId, userId);
        if (type === LikeType.LIKE) {
          await this.videosRepository.decrementLikeCount(videoId);
        } else {
          await this.videosRepository.decrementDislikeCount(videoId);
        }
      } else {
        // Change from like to dislike or vice versa
        await this.likesRepository.create({ videoId, userId, type });
        if (type === LikeType.LIKE) {
          await this.videosRepository.incrementLikeCount(videoId);
          await this.videosRepository.decrementDislikeCount(videoId);
        } else {
          await this.videosRepository.incrementDislikeCount(videoId);
          await this.videosRepository.decrementLikeCount(videoId);
        }
      }
    } else {
      // Create new like/dislike
      await this.likesRepository.create({ videoId, userId, type });
      if (type === LikeType.LIKE) {
        await this.videosRepository.incrementLikeCount(videoId);
      } else {
        await this.videosRepository.incrementDislikeCount(videoId);
      }
    }
  }
}

