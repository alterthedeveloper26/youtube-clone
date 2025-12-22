import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesRepository } from './repositories/likes.repository';
import { VideoLike } from './entities/video-like.entity';
import { VideosModule } from '../videos/videos.module';

@Module({
  imports: [TypeOrmModule.forFeature([VideoLike]), VideosModule],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
  exports: [LikesService],
})
export class LikesModule {}

