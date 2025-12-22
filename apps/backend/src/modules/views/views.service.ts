import { Injectable } from '@nestjs/common';
import { ViewsRepository } from './repositories/views.repository';
import { VideosRepository } from '../videos/repositories/videos.repository';

@Injectable()
export class ViewsService {
  constructor(
    private readonly viewsRepository: ViewsRepository,
    private readonly videosRepository: VideosRepository,
  ) {}

  async recordView(data: {
    videoId: string;
    userId?: string;
    ipAddress?: string;
    watchTime?: number;
    completed?: boolean;
  }): Promise<void> {
    await this.viewsRepository.create(data);
    await this.videosRepository.incrementViewCount(data.videoId);
  }

  async getHistory(userId: string) {
    return this.viewsRepository.findByUserId(userId);
  }
}

