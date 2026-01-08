/**
 * Video API Types
 * Type definitions for video-related API requests and responses
 */

export enum VideoVisibility {
  PUBLIC = "public",
  UNLISTED = "unlisted",
  PRIVATE = "private",
}

export enum ProcessingStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface RequestUploadUrlRequest {
  filename: string;
  contentType: string; // e.g., 'video/mp4'
}

export interface RequestUploadUrlResponse {
  uploadUrl: string;
  videoKey: string;
  videoId: string;
}

export interface CompleteUploadRequest {
  videoKey: string;
  title: string;
  description?: string;
}

export interface VideoResponse {
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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// REST API query (offset-based pagination)
export interface GetVideosQuery {
  page?: number;
  limit?: number;
  search?: string;
  channelId?: string;
}

// REST API response (offset-based pagination)
export interface VideosListResponse {
  data: VideoResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// GraphQL query (cursor-based pagination)
export interface GetVideosGraphQLQuery {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  search?: string;
  channelId?: string;
}

// GraphQL response (cursor-based pagination - Relay Connection format)
export interface VideoEdge {
  node: VideoResponse;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface VideoConnection {
  edges: VideoEdge[];
  pageInfo: PageInfo;
}

