import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';
import { User } from '../../users/entities/user.entity';
import { CommentReply } from './comment-reply.entity';
export declare class Comment extends BaseEntity {
    videoId: string;
    video: Video;
    userId: string;
    user: User;
    content: string;
    likeCount: number;
    replies: CommentReply[];
}
