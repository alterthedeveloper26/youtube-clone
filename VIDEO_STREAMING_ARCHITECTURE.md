# Video Upload & Streaming Architecture

## Overview

This architecture enables fast video streaming similar to YouTube using:

- **S3** for storage
- **CloudFront/CDN** for fast delivery
- **HLS (HTTP Live Streaming)** for adaptive bitrate streaming
- **Video transcoding** for multiple quality levels
- **Progressive loading** for instant playback

## Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    VIDEO UPLOAD FLOW                             │
└─────────────────────────────────────────────────────────────────┘

1. Frontend → Upload Video
   ↓
2. Backend → Generate Presigned URL (S3)
   ↓
3. Frontend → Upload directly to S3
   ↓
4. S3 → Trigger Lambda/Webhook
   ↓
5. Backend → Start Transcoding Job
   ↓
6. Transcoding Service → Generate multiple qualities
   ↓
7. Transcoding Service → Upload to S3
   ↓
8. Backend → Update video metadata
   ↓
9. Video ready for streaming
```

```
┌─────────────────────────────────────────────────────────────────┐
│                    VIDEO STREAMING FLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. Frontend → Request video
   ↓
2. Backend → Return video URL (CloudFront)
   ↓
3. Frontend → Video Player loads HLS manifest
   ↓
4. CloudFront → Serves video chunks (CDN)
   ↓
5. Player → Adapts quality based on bandwidth
   ↓
6. User → Sees smooth playback
```

## Technology Stack

### Storage & CDN

- **AWS S3** - Video storage
- **CloudFront** - CDN for fast delivery
- **S3 Transfer Acceleration** - Faster uploads

### Video Processing

- **AWS MediaConvert** - Transcoding (recommended)
- **FFmpeg** - Alternative (self-hosted)
- **Mux** - Managed service (alternative)

### Streaming Protocol

- **HLS (HTTP Live Streaming)** - Best for web
- **DASH** - Alternative
- **Progressive Download** - Fallback

### Frontend Player

- **Video.js** - Popular, feature-rich
- **Plyr** - Lightweight, modern
- **HLS.js** - HLS support

## Implementation Plan

### Phase 1: Basic Upload & Storage

### Phase 2: Transcoding & Multiple Qualities

### Phase 3: CDN & Fast Streaming

### Phase 4: Advanced Features (Thumbnails, Subtitles)

## Folder Structure

```
apps/backend/src/
├── modules/
│   ├── videos/
│   │   ├── videos.module.ts
│   │   ├── videos.controller.ts
│   │   ├── videos.service.ts
│   │   ├── dto/
│   │   │   ├── create-video.dto.ts
│   │   │   ├── upload-video.dto.ts
│   │   │   └── video-upload-response.dto.ts
│   │   ├── services/                  # Sub-services
│   │   │   ├── video-storage.service.ts
│   │   │   ├── video-transcoding.service.ts
│   │   │   └── video-url.service.ts
│   │   └── repositories/
│   │
│   └── uploads/                       # Upload module
│       ├── uploads.module.ts
│       ├── uploads.controller.ts
│       ├── uploads.service.ts
│       └── dto/
│           └── presigned-url.dto.ts
│
├── shared/
│   ├── aws/                           # AWS services
│   │   ├── s3.service.ts
│   │   ├── cloudfront.service.ts
│   │   └── mediaconvert.service.ts
│   └── config/
│       └── aws.config.ts
```

## Step-by-Step Implementation

### 1. AWS Setup

#### Create S3 Bucket

```bash
# Bucket name: youtube-clone-videos
# Region: us-east-1 (or your preferred)
# Enable versioning: No
# Block public access: Yes (we'll use CloudFront)
```

#### Create CloudFront Distribution

- Origin: S3 bucket
- Viewer protocol: HTTPS only
- Caching: Optimize for video delivery
- Price class: Use all edge locations (or reduce for cost)

#### Setup IAM User/Role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::youtube-clone-videos/*"
    },
    {
      "Effect": "Allow",
      "Action": ["mediaconvert:*"],
      "Resource": "*"
    }
  ]
}
```

### 2. Backend Implementation

#### Install Dependencies

```bash
cd apps/backend
yarn add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner @aws-sdk/client-cloudfront @aws-sdk/client-mediaconvert
yarn add -D @types/multer
```

#### AWS Configuration

```typescript
// shared/config/aws.config.ts
import { S3Client } from "@aws-sdk/client-s3";
import { CloudFrontClient } from "@aws-sdk/client-cloudfront";
import { MediaConvertClient } from "@aws-sdk/client-mediaconvert";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const cloudFrontClient = new CloudFrontClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const mediaConvertClient = new MediaConvertClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const AWS_CONFIG = {
  S3_BUCKET: process.env.AWS_S3_BUCKET!,
  CLOUDFRONT_DOMAIN: process.env.AWS_CLOUDFRONT_DOMAIN!,
  MEDIACONVERT_ROLE: process.env.AWS_MEDIACONVERT_ROLE!,
  REGION: process.env.AWS_REGION || "us-east-1",
};
```

#### S3 Service

```typescript
// shared/aws/s3.service.ts
import { Injectable } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client, AWS_CONFIG } from "../config/aws.config";

@Injectable()
export class S3Service {
  private readonly bucket = AWS_CONFIG.S3_BUCKET;

  /**
   * Generate presigned URL for direct upload
   */
  async generatePresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn: number = 3600
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    return getSignedUrl(s3Client, command, { expiresIn });
  }

  /**
   * Generate presigned URL for viewing (if needed)
   */
  async generatePresignedViewUrl(
    key: string,
    expiresIn: number = 3600
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(s3Client, command, { expiresIn });
  }

  /**
   * Delete object from S3
   */
  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await s3Client.send(command);
  }

  /**
   * Get object URL (CloudFront)
   */
  getObjectUrl(key: string): string {
    return `https://${AWS_CONFIG.CLOUDFRONT_DOMAIN}/${key}`;
  }
}
```

#### Video Storage Service

```typescript
// modules/videos/services/video-storage.service.ts
import { Injectable } from "@nestjs/common";
import { S3Service } from "../../../shared/aws/s3.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class VideoStorageService {
  constructor(private readonly s3Service: S3Service) {}

  /**
   * Generate presigned URL for video upload
   */
  async generateUploadUrl(
    userId: string,
    filename: string,
    contentType: string
  ): Promise<{ uploadUrl: string; videoKey: string }> {
    // Generate unique key: videos/{userId}/{uuid}/{filename}
    const videoId = uuidv4();
    const extension = filename.split(".").pop();
    const key = `videos/${userId}/${videoId}/original.${extension}`;

    const uploadUrl = await this.s3Service.generatePresignedUploadUrl(
      key,
      contentType,
      3600 // 1 hour
    );

    return {
      uploadUrl,
      videoKey: key,
    };
  }

  /**
   * Get streaming URL (CloudFront)
   */
  getStreamingUrl(videoKey: string, quality?: string): string {
    // For HLS: videos/{userId}/{videoId}/hls/{quality}/playlist.m3u8
    if (quality) {
      const hlsKey = videoKey.replace(
        "/original.",
        `/hls/${quality}/playlist.m3u8`
      );
      return this.s3Service.getObjectUrl(hlsKey);
    }

    // Fallback to original
    return this.s3Service.getObjectUrl(videoKey);
  }

  /**
   * Delete video and all its variants
   */
  async deleteVideo(videoKey: string): Promise<void> {
    // Delete original
    await this.s3Service.deleteObject(videoKey);

    // Delete all HLS variants
    const qualities = ["360p", "480p", "720p", "1080p"];
    for (const quality of qualities) {
      const hlsKey = videoKey.replace(
        "/original.",
        `/hls/${quality}/playlist.m3u8`
      );
      try {
        await this.s3Service.deleteObject(hlsKey);
      } catch (error) {
        // Ignore if doesn't exist
      }
    }
  }
}
```

#### Video Transcoding Service

```typescript
// modules/videos/services/video-transcoding.service.ts
import { Injectable, Logger } from "@nestjs/common";
import {
  MediaConvertClient,
  CreateJobCommand,
} from "@aws-sdk/client-mediaconvert";
import {
  mediaConvertClient,
  AWS_CONFIG,
} from "../../../shared/config/aws.config";
import { S3Service } from "../../../shared/aws/s3.service";

@Injectable()
export class VideoTranscodingService {
  private readonly logger = new Logger(VideoTranscodingService.name);

  /**
   * Start transcoding job to create HLS variants
   */
  async startTranscodingJob(
    inputKey: string,
    outputKey: string,
    videoId: string
  ): Promise<string> {
    const inputPath = `s3://${AWS_CONFIG.S3_BUCKET}/${inputKey}`;
    const outputPath = `s3://${AWS_CONFIG.S3_BUCKET}/${outputKey}`;

    // HLS job settings
    const jobSettings = {
      Role: AWS_CONFIG.MEDIACONVERT_ROLE,
      Settings: {
        Inputs: [
          {
            FileInput: inputPath,
          },
        ],
        OutputGroups: [
          {
            Name: "HLS",
            OutputGroupSettings: {
              Type: "HLS_GROUP_SETTINGS",
              HlsGroupSettings: {
                Destination: `${outputPath}/hls/`,
                SegmentLength: 10,
                MinSegmentLength: 0,
              },
            },
            Outputs: [
              // 360p
              {
                NameModifier: "_360p",
                VideoDescription: {
                  CodecSettings: {
                    Codec: "H_264",
                    H264Settings: {
                      Bitrate: 400000,
                      MaxBitrate: 500000,
                      RateControlMode: "VBR",
                      Width: 640,
                      Height: 360,
                    },
                  },
                },
                AudioDescriptions: [
                  {
                    CodecSettings: {
                      Codec: "AAC",
                      AacSettings: {
                        Bitrate: 96000,
                        SampleRate: 48000,
                      },
                    },
                  },
                ],
              },
              // 480p
              {
                NameModifier: "_480p",
                VideoDescription: {
                  CodecSettings: {
                    Codec: "H_264",
                    H264Settings: {
                      Bitrate: 1000000,
                      MaxBitrate: 1200000,
                      RateControlMode: "VBR",
                      Width: 854,
                      Height: 480,
                    },
                  },
                },
                AudioDescriptions: [
                  {
                    CodecSettings: {
                      Codec: "AAC",
                      AacSettings: {
                        Bitrate: 128000,
                        SampleRate: 48000,
                      },
                    },
                  },
                ],
              },
              // 720p
              {
                NameModifier: "_720p",
                VideoDescription: {
                  CodecSettings: {
                    Codec: "H_264",
                    H264Settings: {
                      Bitrate: 2500000,
                      MaxBitrate: 3000000,
                      RateControlMode: "VBR",
                      Width: 1280,
                      Height: 720,
                    },
                  },
                },
                AudioDescriptions: [
                  {
                    CodecSettings: {
                      Codec: "AAC",
                      AacSettings: {
                        Bitrate: 192000,
                        SampleRate: 48000,
                      },
                    },
                  },
                ],
              },
              // 1080p
              {
                NameModifier: "_1080p",
                VideoDescription: {
                  CodecSettings: {
                    Codec: "H_264",
                    H264Settings: {
                      Bitrate: 5000000,
                      MaxBitrate: 6000000,
                      RateControlMode: "VBR",
                      Width: 1920,
                      Height: 1080,
                    },
                  },
                },
                AudioDescriptions: [
                  {
                    CodecSettings: {
                      Codec: "AAC",
                      AacSettings: {
                        Bitrate: 192000,
                        SampleRate: 48000,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    try {
      const command = new CreateJobCommand(jobSettings);
      const response = await mediaConvertClient.send(command);

      this.logger.log(
        `Transcoding job started: ${response.Job?.Id} for video ${videoId}`
      );
      return response.Job?.Id || "";
    } catch (error) {
      this.logger.error(`Failed to start transcoding job: ${error}`);
      throw error;
    }
  }
}
```

#### Updated Videos Controller

```typescript
// modules/videos/videos.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { VideosService } from "./videos.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { CreateVideoDto } from "./dto/create-video.dto";
import { RequestUploadUrlDto } from "./dto/request-upload-url.dto";

@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  /**
   * Step 1: Request presigned URL for upload
   */
  @Post("upload/request")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async requestUploadUrl(
    @Body() dto: RequestUploadUrlDto,
    @CurrentUser() userId: string
  ) {
    return this.videosService.requestUploadUrl(dto, userId);
  }

  /**
   * Step 2: Confirm upload and create video record
   */
  @Post("upload/complete")
  @UseGuards(AuthGuard)
  async completeUpload(
    @Body() dto: { videoKey: string; title: string; description?: string },
    @CurrentUser() userId: string
  ) {
    return this.videosService.completeUpload(dto, userId);
  }

  /**
   * Get video with streaming URL
   */
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.videosService.findOne(id);
  }
}
```

#### Updated Videos Service

```typescript
// modules/videos/videos.service.ts
import { Injectable } from "@nestjs/common";
import { VideosRepository } from "./repositories/videos.repository";
import { VideoStorageService } from "./services/video-storage.service";
import { VideoTranscodingService } from "./services/video-transcoding.service";
import { ChannelsService } from "../channels/channels.service";
import { RequestUploadUrlDto } from "./dto/request-upload-url.dto";

@Injectable()
export class VideosService {
  constructor(
    private readonly videosRepository: VideosRepository,
    private readonly videoStorageService: VideoStorageService,
    private readonly videoTranscodingService: VideoTranscodingService,
    private readonly channelsService: ChannelsService
  ) {}

  /**
   * Step 1: Generate presigned URL for direct S3 upload
   */
  async requestUploadUrl(
    dto: RequestUploadUrlDto,
    userId: string
  ): Promise<{ uploadUrl: string; videoKey: string }> {
    const { filename, contentType } = dto;

    return this.videoStorageService.generateUploadUrl(
      userId,
      filename,
      contentType
    );
  }

  /**
   * Step 2: Create video record and start transcoding
   */
  async completeUpload(
    dto: { videoKey: string; title: string; description?: string },
    userId: string
  ) {
    // Get user's channel
    const channel = await this.channelsService.findByUserId(userId);

    // Extract video ID from key: videos/{userId}/{videoId}/original.mp4
    const videoId = dto.videoKey.split("/")[2];

    // Create video record
    const video = await this.videosRepository.create({
      id: videoId,
      title: dto.title,
      description: dto.description,
      videoKey: dto.videoKey,
      videoUrl: this.videoStorageService.getStreamingUrl(dto.videoKey),
      channelId: channel.id,
      isPublished: false, // Not published until transcoding completes
      processingStatus: "processing",
    });

    // Start transcoding job (async)
    const outputKey = dto.videoKey.replace("/original.", "/");
    this.videoTranscodingService
      .startTranscodingJob(dto.videoKey, outputKey, videoId)
      .catch((error) => {
        // Handle error, update video status
        console.error("Transcoding failed:", error);
      });

    return video;
  }

  /**
   * Get video with streaming URLs
   */
  async findOne(id: string) {
    const video = await this.videosRepository.findById(id);

    if (!video) {
      throw new NotFoundException("Video not found");
    }

    // Return video with HLS streaming URLs
    return {
      ...video,
      streamingUrls: {
        hls: this.videoStorageService.getStreamingUrl(video.videoKey, "hls"),
        qualities: {
          "360p": this.videoStorageService.getStreamingUrl(
            video.videoKey,
            "360p"
          ),
          "480p": this.videoStorageService.getStreamingUrl(
            video.videoKey,
            "480p"
          ),
          "720p": this.videoStorageService.getStreamingUrl(
            video.videoKey,
            "720p"
          ),
          "1080p": this.videoStorageService.getStreamingUrl(
            video.videoKey,
            "1080p"
          ),
        },
      },
    };
  }
}
```

#### DTOs

```typescript
// modules/videos/dto/request-upload-url.dto.ts
import { IsString, IsNotEmpty, IsMimeType } from "class-validator";

export class RequestUploadUrlDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  @IsMimeType()
  contentType: string; // e.g., 'video/mp4'
}
```

### 3. Frontend Implementation

#### Install Dependencies

```bash
cd apps/frontend
yarn add video.js hls.js
# or
yarn add plyr
```

#### Video Upload Component

```typescript
// apps/frontend/src/components/video-upload.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { getToken } = useAuth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      // Step 1: Request presigned URL
      const token = await getToken();
      const response = await fetch('/api/videos/upload/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      const { uploadUrl, videoKey } = await response.json();

      // Step 2: Upload directly to S3
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(percentComplete);
        }
      });

      await new Promise((resolve, reject) => {
        xhr.addEventListener('load', resolve);
        xhr.addEventListener('error', reject);
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });

      // Step 3: Complete upload
      await fetch('/api/videos/upload/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoKey,
          title: file.name,
        }),
      });

      alert('Upload complete! Video is processing...');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileSelect} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? `Uploading... ${Math.round(progress)}%` : 'Upload'}
      </button>
    </div>
  );
}
```

#### Video Player Component (HLS)

```typescript
// apps/frontend/src/components/video-player.tsx
'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  videoId: string;
  hlsUrl: string;
}

export function VideoPlayer({ videoId, hlsUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      // Use HLS.js for HLS support
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hlsRef.current = hls;

      // Handle errors
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = hlsUrl;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [hlsUrl]);

  return (
    <video
      ref={videoRef}
      controls
      width="100%"
      style={{ maxWidth: '100%' }}
    />
  );
}
```

#### Alternative: Using Video.js

```typescript
// apps/frontend/src/components/video-player-videojs.tsx
'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  videoId: string;
  hlsUrl: string;
}

export function VideoPlayer({ videoId, hlsUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize Video.js
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: hlsUrl,
          type: 'application/x-mpegURL',
        },
      ],
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [hlsUrl]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}
```

## Performance Optimizations

### 1. **Progressive Loading**

- Load thumbnail first
- Start playing low quality immediately
- Upgrade quality as bandwidth allows

### 2. **CDN Caching**

- CloudFront caches video chunks
- Reduces origin requests
- Faster delivery globally

### 3. **HLS Adaptive Bitrate**

- Automatically adjusts quality
- Smooth playback on any connection
- Multiple quality levels

### 4. **Lazy Loading**

```typescript
// Only load player when video is in viewport
import { useInView } from 'react-intersection-observer';

export function VideoPlayerLazy({ videoId, hlsUrl }: VideoPlayerProps) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref}>
      {inView ? <VideoPlayer videoId={videoId} hlsUrl={hlsUrl} /> : <VideoThumbnail />}
    </div>
  );
}
```

### 5. **Preload Strategy**

```html
<!-- Preload metadata only -->
<video preload="metadata" />

<!-- Or preload first chunk -->
<video preload="auto" />
```

### 6. **Thumbnail Generation**

- Generate thumbnails during transcoding
- Show thumbnail before video loads
- Improves perceived performance

## Cost Optimization

### 1. **S3 Storage Classes**

- Use **S3 Standard** for active videos
- Use **S3 Intelligent-Tiering** for older videos
- Use **S3 Glacier** for archived videos

### 2. **CloudFront Caching**

- Cache video chunks aggressively
- Reduce origin requests
- Lower S3 costs

### 3. **Transcoding Optimization**

- Only transcode when needed
- Use appropriate quality levels
- Consider batch processing

## Alternative: Simpler Approach (No Transcoding)

If MediaConvert is too complex/costly for learning:

### Option 1: Direct MP4 Streaming

```typescript
// Just serve MP4 files directly
getStreamingUrl(videoKey: string): string {
  return this.s3Service.getObjectUrl(videoKey);
}
```

### Option 2: Use Mux (Managed Service)

- Handles transcoding automatically
- Simple API
- Pay-as-you-go pricing

### Option 3: FFmpeg Self-Hosted

- Run FFmpeg on your server
- More control, less cost
- Requires more setup

## Environment Variables

```env
# .env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=youtube-clone-videos
AWS_CLOUDFRONT_DOMAIN=d1234567890.cloudfront.net
AWS_MEDIACONVERT_ROLE=arn:aws:iam::123456789:role/MediaConvert_Default_Role
```

## Next Steps

1. **Setup AWS** - Create S3 bucket and CloudFront
2. **Implement Upload** - Presigned URL flow
3. **Add Transcoding** - MediaConvert or alternative
4. **Frontend Player** - HLS.js or Video.js
5. **Optimize** - CDN, caching, lazy loading
6. **Monitor** - Track costs and performance

This architecture provides YouTube-like performance with scalable, cost-effective video streaming!
