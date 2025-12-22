import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { VideoStorageService } from './services/video-storage.service';
import { VideoTranscodingService } from './services/video-transcoding.service';
import { VideosRepository } from './repositories/videos.repository';
import { ChannelsService } from '../channels/channels.service';
import { RequestUploadUrlDto } from './dto/request-upload-url.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';
import {
  VideoDomain,
  ProcessingStatus,
  VideoVisibility,
} from './domain/video.domain';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosRepository: VideosRepository,
    private readonly videoStorageService: VideoStorageService,
    private readonly videoTranscodingService: VideoTranscodingService,
    private readonly channelsService: ChannelsService,
  ) {}

  /**
   * Step 1: Generate presigned URL for direct S3 upload
   */
  async requestUploadUrl(
    dto: RequestUploadUrlDto,
    userId: string,
  ): Promise<{ uploadUrl: string; videoKey: string; videoId: string }> {
    const { filename, contentType } = dto;

    return this.videoStorageService.generateUploadUrl(
      userId,
      filename,
      contentType,
    );
  }

  /**
   * Step 2: Create video record and start transcoding
   */
  async completeUpload(
    dto: CompleteUploadDto,
    userId: string,
  ): Promise<VideoDomain> {
    const { videoKey, title, description } = dto;

    // Get user's channel (returns domain entity)
    const channel = await this.channelsService.findByUserId(userId);

    // Extract video ID from key: videos/{userId}/{videoId}/original.mp4
    const videoId = videoKey.split('/')[2];

    // Get streaming URLs
    const streamingUrls = this.videoStorageService.getStreamingUrls(videoKey);

    // Create domain entity (business rules applied in constructor)
    const videoDomain = new VideoDomain(
      videoId,
      channel.getId(),
      title,
      streamingUrls.original,
      description,
      videoKey,
      streamingUrls['720p'],
      null, // thumbnailUrl
      0, // duration
      0, // viewCount
      0, // likeCount
      0, // dislikeCount
      0, // commentCount
      false, // isPublished
      VideoVisibility.PUBLIC, // visibility (using enum from domain)
      ProcessingStatus.PROCESSING,
    );

    // Validate domain entity
    videoDomain.validate();

    // Save through repository (converts to TypeORM, saves, converts back)
    const savedVideo = await this.videosRepository.create(videoDomain);

    // Start transcoding job (async) - creates 720p HLS version
    const outputKey = videoKey.replace('/original.', '/');
    this.videoTranscodingService
      .startTranscodingJob(videoKey, outputKey, videoId)
      .then(async () => {
        // Update video status when transcoding completes (using domain entity)
        const video = await this.videosRepository.findById(videoId);
        if (video) {
          video.setProcessingStatus(ProcessingStatus.COMPLETED);
          video.setHls720pUrl(streamingUrls['720p']);
          if (video.canBePublished()) {
            video.publish();
          }
          await this.videosRepository.update(video);
        }
      })
      .catch(async (error) => {
        // Handle error, update video status
        console.error('Transcoding failed:', error);
        const video = await this.videosRepository.findById(videoId);
        if (video) {
          video.setProcessingStatus(ProcessingStatus.FAILED);
          await this.videosRepository.update(video);
        }
      });

    return savedVideo;
  }

  /**
   * Get video with streaming URLs
   */
  async findOne(id: string): Promise<VideoDomain> {
    const video = await this.videosRepository.findById(id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }

    // Get current streaming URLs and update domain entity
    const videoKey = video.getVideoKey();
    if (videoKey) {
      const streamingUrls = this.videoStorageService.getStreamingUrls(videoKey);
      // Update domain entity with current URLs using domain methods
      video.setVideoUrl(streamingUrls.original);
      if (streamingUrls['720p']) {
        video.setHls720pUrl(streamingUrls['720p']);
      }
    }

    return video;
  }

  async findAll(options: {
    page?: number;
    limit?: number;
    search?: string;
    channelId?: string;
  }) {
    const { page = 1, limit = 10, search, channelId } = options;
    const skip = (page - 1) * limit;

    const where: any = {
      isPublished: true,
      visibility: 'public',
    };

    if (search) {
      where.title = Like(`%${search}%`);
    }

    if (channelId) {
      where.channelId = channelId;
    }

    const [videos, total] = await Promise.all([
      this.videosRepository.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'DESC' },
      }),
      this.videosRepository.count(where),
    ]);

    return {
      data: videos,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
