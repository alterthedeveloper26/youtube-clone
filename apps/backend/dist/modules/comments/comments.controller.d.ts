import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    findByVideo(videoId: string): Promise<import("./entities/comment.entity").Comment[]>;
    create(data: any): Promise<import("./entities/comment.entity").Comment>;
    update(id: string, data: any): Promise<import("./entities/comment.entity").Comment | null>;
    delete(id: string, data: any): Promise<void>;
    createReply(id: string, data: any): Promise<import("./entities/comment-reply.entity").CommentReply>;
    getReplies(id: string): Promise<import("./entities/comment-reply.entity").CommentReply[]>;
}
