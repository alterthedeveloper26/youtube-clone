/**
 * Videos API Service
 * All video-related API calls are organized here
 */

import { apiRequest } from "./config";
import { apolloClient } from "@/providers/apollo.provider";
import { GET_VIDEOS_QUERY } from "./graphql/queries/videos.queries";
import type {
  RequestUploadUrlRequest,
  RequestUploadUrlResponse,
  CompleteUploadRequest,
  VideoResponse,
  GetVideosQuery,
  VideosListResponse,
  GetVideosGraphQLQuery,
  VideoConnection,
} from "./types/videos.types";

/**
 * Request presigned URL for video upload
 * @param data - Upload request data (filename and contentType)
 * @returns Presigned upload URL, video key, and video ID
 */
export async function requestUploadUrl(
  data: RequestUploadUrlRequest
): Promise<RequestUploadUrlResponse> {
  return apiRequest<RequestUploadUrlResponse>("/videos/upload/request", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Complete video upload and create video record
 * @param data - Complete upload data (videoKey, title, description)
 * @returns Created video data
 */
export async function completeUpload(
  data: CompleteUploadRequest
): Promise<VideoResponse> {
  return apiRequest<VideoResponse>("/videos/upload/complete", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get all videos with pagination and filters
 * @param query - Query parameters (page, limit, search, channelId)
 * @returns Paginated list of videos
 */
export async function getVideos(
  query?: GetVideosQuery
): Promise<VideosListResponse> {
  const queryString = query
    ? `?${new URLSearchParams(
        Object.entries(query).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>
        )
      ).toString()}`
    : "";

  return apiRequest<VideosListResponse>(`/videos${queryString}`, {
    method: "GET",
  });
}

/**
 * Get video by ID
 * @param id - Video ID
 * @returns Video data with streaming URLs
 */
export async function getVideoById(id: string): Promise<VideoResponse> {
  return apiRequest<VideoResponse>(`/videos/${id}`, {
    method: "GET",
  });
}

/**
 * Get all videos with cursor-based pagination using GraphQL
 * @param query - Query parameters (first, after, last, before, search, channelId)
 * @returns Video connection with edges and pageInfo
 */
export async function getVideosGraphQL(
  query?: GetVideosGraphQLQuery
): Promise<VideoConnection> {
  const result = await apolloClient.query<{ videos: VideoConnection }>({
    query: GET_VIDEOS_QUERY,
    variables: {
      input: query || undefined,
    },
    errorPolicy: "all",
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  if (!result.data?.videos) {
    throw new Error("No data returned from GraphQL query");
  }

  return result.data.videos;
}
