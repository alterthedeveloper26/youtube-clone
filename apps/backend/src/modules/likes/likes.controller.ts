import { Controller, Post, Body } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeType } from './entities/video-like.entity';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('toggle')
  async toggleLike(@Body() data: { videoId: string; userId: string; type: LikeType }) {
    await this.likesService.toggleLike(data.videoId, data.userId, data.type);
    return { success: true };
  }
}

