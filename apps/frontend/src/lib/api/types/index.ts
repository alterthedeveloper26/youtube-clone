/**
 * API Types
 * Centralized export for all API types organized by resource
 */

// User types
export type {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "./users.types";

// Category types
export type { CategoryResponse } from "./categories.types";

// Video types
export type {
  VideoVisibility,
  ProcessingStatus,
  RequestUploadUrlRequest,
  RequestUploadUrlResponse,
  CompleteUploadRequest,
  VideoResponse,
  GetVideosQuery,
  VideosListResponse,
} from "./videos.types";

// Add more type exports here as you create new API resources:
// export type { ChannelRequest, ChannelResponse } from "./channels.types";
