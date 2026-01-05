import { BaseEntity } from '../../../shared/entities/base.entity';
import { Comment } from './comment.entity';
import { User } from '../../users/entities/user.entity';
export declare class CommentReply extends BaseEntity {
    commentId: string;
    comment: Comment;
    userId: string;
    user: User;
    content: string;
    likeCount: number;
}
