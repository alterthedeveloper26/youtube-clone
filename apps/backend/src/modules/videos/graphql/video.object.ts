import { ObjectType, Field, Int } from '@nestjs/graphql';

export enum VideoVisibility {
  PUBLIC = 'public',
  UNLISTED = 'unlisted',
  PRIVATE = 'private',
}

export enum ProcessingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@ObjectType()
export class Video {
  @Field()
  id: string;

  @Field()
  channelId: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  videoUrl: string;

  @Field(() => String, { nullable: true })
  videoKey: string | null;

  @Field(() => String, { nullable: true })
  hls720pUrl: string | null;

  @Field(() => String, { nullable: true })
  thumbnailUrl: string | null;

  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  viewCount: number;

  @Field(() => Int)
  likeCount: number;

  @Field(() => Int)
  dislikeCount: number;

  @Field(() => Int)
  commentCount: number;

  @Field()
  isPublished: boolean;

  @Field(() => String)
  visibility: VideoVisibility;

  @Field(() => String)
  processingStatus: ProcessingStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;
}

@ObjectType()
export class VideosMeta {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  totalPages: number;
}

@ObjectType()
export class VideosListResponse {
  @Field(() => [Video])
  data: Video[];

  @Field(() => VideosMeta)
  meta: VideosMeta;
}
