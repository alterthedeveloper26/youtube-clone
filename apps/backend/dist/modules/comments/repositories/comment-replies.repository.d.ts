import { Repository } from 'typeorm';
import { CommentReply } from '../entities/comment-reply.entity';
export declare class CommentRepliesRepository {
    private readonly repository;
    constructor(repository: Repository<CommentReply>);
    create(data: Partial<CommentReply>): Promise<CommentReply>;
    findByCommentId(commentId: string): Promise<CommentReply[]>;
}
