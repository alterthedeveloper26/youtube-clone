/**
 * Domain Entity - Video
 * Pure business logic, no database concerns
 */
import { BaseDomain } from '../../../shared/domain/base.domain';

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

export class VideoDomain extends BaseDomain {
  private channelId: string;
  private title: string;
  private description: string | null;
  private videoUrl: string;
  private videoKey: string | null;
  private hls720pUrl: string | null;
  private thumbnailUrl: string | null;
  private duration: number;
  private viewCount: number;
  private likeCount: number;
  private dislikeCount: number;
  private commentCount: number;
  private isPublished: boolean;
  private visibility: VideoVisibility;
  private processingStatus: ProcessingStatus;

  constructor(
    id: string,
    channelId: string,
    title: string,
    videoUrl: string,
    description?: string | null,
    videoKey?: string | null,
    hls720pUrl?: string | null,
    thumbnailUrl?: string | null,
    duration: number = 0,
    viewCount: number = 0,
    likeCount: number = 0,
    dislikeCount: number = 0,
    commentCount: number = 0,
    isPublished: boolean = false,
    visibility: VideoVisibility = VideoVisibility.PUBLIC,
    processingStatus: ProcessingStatus = ProcessingStatus.PENDING,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    deletedAt: Date | null = null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.channelId = channelId;
    this.setTitle(title);
    this.setDescription(description);
    this.videoUrl = videoUrl;
    this.videoKey = videoKey || null;
    this.hls720pUrl = hls720pUrl || null;
    this.thumbnailUrl = thumbnailUrl || null;
    this.duration = duration;
    this.viewCount = viewCount;
    this.likeCount = likeCount;
    this.dislikeCount = dislikeCount;
    this.commentCount = commentCount;
    this.isPublished = isPublished;
    this.visibility = visibility;
    this.processingStatus = processingStatus;
  }

  // Domain method: Set title with validation
  setTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Video title is required');
    }
    if (title.trim().length < 3) {
      throw new Error('Video title must be at least 3 characters');
    }
    if (title.length > 100) {
      throw new Error('Video title cannot exceed 100 characters');
    }
    this.title = title.trim();
    // Note: updatedAt is managed by database
  }

  // Domain method: Set description with validation
  setDescription(description: string | null | undefined): void {
    if (description && description.length > 5000) {
      throw new Error('Video description cannot exceed 5000 characters');
    }
    this.description = description || null;
    // Note: updatedAt is managed by database
  }

  // Domain method: Publish video
  publish(): void {
    if (this.processingStatus !== ProcessingStatus.COMPLETED) {
      throw new Error('Video must be processed before publishing');
    }
    if (this.title.length < 3) {
      throw new Error('Video title is too short to publish');
    }
    this.isPublished = true;
    // Note: updatedAt is managed by database
  }

  // Domain method: Unpublish video
  unpublish(): void {
    this.isPublished = false;
    // Note: updatedAt is managed by database
  }

  // Domain method: Can video be published?
  canBePublished(): boolean {
    return (
      this.processingStatus === ProcessingStatus.COMPLETED &&
      this.title.length >= 3 &&
      this.videoUrl !== null
    );
  }

  // Domain method: Can video be liked?
  canBeLiked(): boolean {
    return this.isPublished;
  }

  // Domain method: Increment view count
  incrementView(): void {
    this.viewCount += 1;
  }

  // Domain method: Increment like count
  incrementLike(): void {
    if (!this.canBeLiked()) {
      throw new Error('Video cannot be liked');
    }
    this.likeCount += 1;
  }

  // Domain method: Decrement like count
  decrementLike(): void {
    if (this.likeCount > 0) {
      this.likeCount -= 1;
    }
  }

  // Domain method: Increment dislike count
  incrementDislike(): void {
    if (!this.canBeLiked()) {
      throw new Error('Video cannot be disliked');
    }
    this.dislikeCount += 1;
  }

  // Domain method: Decrement dislike count
  decrementDislike(): void {
    if (this.dislikeCount > 0) {
      this.dislikeCount -= 1;
    }
  }

  // Domain method: Increment comment count
  incrementComment(): void {
    this.commentCount += 1;
  }

  // Domain method: Update processing status
  setProcessingStatus(status: ProcessingStatus): void {
    this.processingStatus = status;
    if (status === ProcessingStatus.COMPLETED && this.canBePublished()) {
      this.isPublished = true;
    }
    // Note: updatedAt is managed by database
  }

  // Domain method: Set HLS URL
  setHls720pUrl(url: string): void {
    this.hls720pUrl = url;
    if (this.processingStatus === ProcessingStatus.PROCESSING) {
      this.setProcessingStatus(ProcessingStatus.COMPLETED);
    }
    // Note: updatedAt is managed by database
  }

  // Domain method: Set video URL
  setVideoUrl(url: string): void {
    if (!url || url.trim().length === 0) {
      throw new Error('Video URL is required');
    }
    if (url.length > 500) {
      throw new Error('Video URL cannot exceed 500 characters');
    }
    this.videoUrl = url;
    // Note: updatedAt is managed by database
  }

  // Domain method: Set thumbnail URL
  setThumbnailUrl(url: string | null): void {
    if (url && url.length > 500) {
      throw new Error('Thumbnail URL cannot exceed 500 characters');
    }
    this.thumbnailUrl = url;
    // Note: updatedAt is managed by database
  }

  // Getters

  getChannelId(): string {
    return this.channelId;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string | null {
    return this.description;
  }

  getVideoUrl(): string {
    return this.videoUrl;
  }

  getVideoKey(): string | null {
    return this.videoKey;
  }

  getHls720pUrl(): string | null {
    return this.hls720pUrl;
  }

  getThumbnailUrl(): string | null {
    return this.thumbnailUrl;
  }

  getDuration(): number {
    return this.duration;
  }

  getViewCount(): number {
    return this.viewCount;
  }

  getLikeCount(): number {
    return this.likeCount;
  }

  getDislikeCount(): number {
    return this.dislikeCount;
  }

  getCommentCount(): number {
    return this.commentCount;
  }

  getIsPublished(): boolean {
    return this.isPublished;
  }

  getVisibility(): VideoVisibility {
    return this.visibility;
  }

  getProcessingStatus(): ProcessingStatus {
    return this.processingStatus;
  }

  /**
   * Convert domain entity to GraphQL representation
   * Returns a plain object matching the GraphQL Video type structure
   */
  toGraphQL(): {
    id: string;
    channelId: string;
    title: string;
    description: string | null;
    videoUrl: string;
    videoKey: string | null;
    hls720pUrl: string | null;
    thumbnailUrl: string | null;
    duration: number;
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    isPublished: boolean;
    visibility: VideoVisibility;
    processingStatus: ProcessingStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  } {
    return {
      id: this.getId(),
      channelId: this.getChannelId(),
      title: this.getTitle(),
      description: this.getDescription(),
      videoUrl: this.getVideoUrl(),
      videoKey: this.getVideoKey(),
      hls720pUrl: this.getHls720pUrl(),
      thumbnailUrl: this.getThumbnailUrl(),
      duration: this.getDuration(),
      viewCount: this.getViewCount(),
      likeCount: this.getLikeCount(),
      dislikeCount: this.getDislikeCount(),
      commentCount: this.getCommentCount(),
      isPublished: this.getIsPublished(),
      visibility: this.getVisibility(),
      processingStatus: this.getProcessingStatus(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      deletedAt: this.getDeletedAt(),
    };
  }

  // Domain method: Validate entire entity
  validate(): void {
    if (!this.title || this.title.length < 3) {
      throw new Error('Video title is invalid');
    }
    if (!this.videoUrl) {
      throw new Error('Video URL is required');
    }
    if (this.viewCount < 0 || this.likeCount < 0 || this.dislikeCount < 0) {
      throw new Error('Counts cannot be negative');
    }
  }
}
