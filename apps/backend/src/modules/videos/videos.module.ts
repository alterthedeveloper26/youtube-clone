import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { VideosRepository } from './repositories/videos.repository';
import { VideoStorageService } from './services/video-storage.service';
import { VideoTranscodingService } from './services/video-transcoding.service';
import { VideosResolver } from './graphql/videos.resolver';
import { Video } from './entities/video.entity';
import { AwsModule } from '../../shared/aws/aws.module';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    AwsModule,
    ChannelsModule,
  ],
  controllers: [VideosController],
  providers: [
    VideosService,
    VideosRepository,
    VideoStorageService,
    VideoTranscodingService,
    VideosResolver,
  ],
  exports: [VideosService, VideosRepository],
})
export class VideosModule {}

