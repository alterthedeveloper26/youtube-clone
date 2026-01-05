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
export declare class VideoDomain {
    private id;
    private channelId;
    private title;
    private description;
    private videoUrl;
    private videoKey;
    private hls720pUrl;
    private thumbnailUrl;
    private duration;
    private viewCount;
    private likeCount;
    private dislikeCount;
    private commentCount;
    private isPublished;
    private visibility;
    private processingStatus;
    constructor(id: string, channelId: string, title: string, videoUrl: string, description?: string | null, videoKey?: string | null, hls720pUrl?: string | null, thumbnailUrl?: string | null, duration?: number, viewCount?: number, likeCount?: number, dislikeCount?: number, commentCount?: number, isPublished?: boolean, visibility?: VideoVisibility, processingStatus?: ProcessingStatus);
    setTitle(title: string): void;
    setDescription(description: string | null | undefined): void;
    publish(): void;
    unpublish(): void;
    canBePublished(): boolean;
    canBeLiked(): boolean;
    incrementView(): void;
    incrementLike(): void;
    decrementLike(): void;
    incrementDislike(): void;
    decrementDislike(): void;
    incrementComment(): void;
    setProcessingStatus(status: ProcessingStatus): void;
    setHls720pUrl(url: string): void;
    setVideoUrl(url: string): void;
    setThumbnailUrl(url: string | null): void;
    getId(): string;
    getChannelId(): string;
    getTitle(): string;
    getDescription(): string | null;
    getVideoUrl(): string;
    getVideoKey(): string | null;
    getHls720pUrl(): string | null;
    getThumbnailUrl(): string | null;
    getDuration(): number;
    getViewCount(): number;
    getLikeCount(): number;
    getDislikeCount(): number;
    getCommentCount(): number;
    getIsPublished(): boolean;
    getVisibility(): VideoVisibility;
    getProcessingStatus(): ProcessingStatus;
    validate(): void;
}
