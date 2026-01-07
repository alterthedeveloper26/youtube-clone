export declare enum VideoVisibility {
    PUBLIC = "public",
    UNLISTED = "unlisted",
    PRIVATE = "private"
}
export declare enum ProcessingStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed"
}
export declare class Video {
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
}
export declare class VideosMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export declare class VideosListResponse {
    data: Video[];
    meta: VideosMeta;
}
