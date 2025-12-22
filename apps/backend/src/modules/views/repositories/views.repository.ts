import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoView } from '../entities/video-view.entity';

@Injectable()
export class ViewsRepository {
  constructor(
    @InjectRepository(VideoView)
    private readonly repository: Repository<VideoView>,
  ) {}

  async create(data: Partial<VideoView>): Promise<VideoView> {
    return this.repository.save(data);
  }

  async findByVideoId(videoId: string): Promise<VideoView[]> {
    return this.repository.find({
      where: { videoId, deletedAt: null },
      order: { createdAt: 'DESC' },
    });
  }

  async findByUserId(userId: string): Promise<VideoView[]> {
    return this.repository.find({
      where: { userId, deletedAt: null },
      relations: ['video', 'video.channel'],
      order: { createdAt: 'DESC' },
    });
  }
}

