import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { ViewsRepository } from './repositories/views.repository';
import { VideoView } from './entities/video-view.entity';
import { VideosModule } from '../videos/videos.module';

@Module({
  imports: [TypeOrmModule.forFeature([VideoView]), VideosModule],
  controllers: [ViewsController],
  providers: [ViewsService, ViewsRepository],
  exports: [ViewsService],
})
export class ViewsModule {}

