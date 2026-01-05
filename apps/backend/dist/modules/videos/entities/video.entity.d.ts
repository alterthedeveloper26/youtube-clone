import { BaseEntity } from '../../../shared/entities/base.entity';
import { Channel } from '../../channels/entities/channel.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { VideoLike } from '../../likes/entities/video-like.entity';
import { VideoView } from '../../views/entities/video-view.entity';
import { PlaylistItem } from '../../playlists/entities/playlist-item.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
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
export declare class Video extends BaseEntity {
    channelId: string;
    channel: Channel;
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
    comments: Comment[];
    likes: VideoLike[];
    views: VideoView[];
    playlistItems: PlaylistItem[];
    categories: Category[];
    tags: Tag[];
}
