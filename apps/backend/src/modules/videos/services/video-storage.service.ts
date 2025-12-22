import { Injectable } from '@nestjs/common';
import { S3Service } from '../../../shared/aws/s3.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VideoStorageService {
  constructor(private readonly s3Service: S3Service) {}

  /**
   * Generate presigned URL for video upload
   */
  async generateUploadUrl(
    userId: string,
    filename: string,
    contentType: string,
  ): Promise<{ uploadUrl: string; videoKey: string; videoId: string }> {
    // Generate unique key: videos/{userId}/{videoId}/original.{extension}
    const videoId = uuidv4();
    const extension = filename.split('.').pop();
    const key = `videos/${userId}/${videoId}/original.${extension}`;

    const uploadUrl = await this.s3Service.generatePresignedUploadUrl(
      key,
      contentType,
      3600, // 1 hour
    );

    return {
      uploadUrl,
      videoKey: key,
      videoId,
    };
  }

  /**
   * Get streaming URL (CloudFront)
   * Returns URLs for both original and 720p versions
   */
  getStreamingUrls(videoKey: string): {
    original: string;
    '720p': string;
  } {
    // Original video URL
    const originalUrl = this.s3Service.getObjectUrl(videoKey);

    // 720p HLS URL
    // videos/{userId}/{videoId}/original.mp4 -> videos/{userId}/{videoId}/hls/720p/playlist.m3u8
    const hlsKey = videoKey.replace('/original.', '/hls/720p/playlist.m3u8');
    const hls720pUrl = this.s3Service.getObjectUrl(hlsKey);

    return {
      original: originalUrl,
      '720p': hls720pUrl,
    };
  }

  /**
   * Delete video and all its variants
   */
  async deleteVideo(videoKey: string): Promise<void> {
    // Delete original
    await this.s3Service.deleteObject(videoKey);

    // Delete 720p HLS version
    const hlsKey = videoKey.replace('/original.', '/hls/720p/playlist.m3u8');
    try {
      await this.s3Service.deleteObject(hlsKey);
    } catch (error) {
      // Ignore if doesn't exist
    }
  }
}

