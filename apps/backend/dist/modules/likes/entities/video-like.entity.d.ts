import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';
import { User } from '../../users/entities/user.entity';
export declare enum LikeType {
    LIKE = "like",
    DISLIKE = "dislike"
}
export declare class VideoLike extends BaseEntity {
    videoId: string;
    video: Video;
    userId: string;
    user: User;
    type: LikeType;
}
