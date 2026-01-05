import { CommentsRepository } from './repositories/comments.repository';
import { CommentRepliesRepository } from './repositories/comment-replies.repository';
import { VideosRepository } from '../videos/repositories/videos.repository';
import { Comment } from './entities/comment.entity';
import { CommentReply } from './entities/comment-reply.entity';
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly commentRepliesRepository;
    private readonly videosRepository;
    constructor(commentsRepository: CommentsRepository, commentRepliesRepository: CommentRepliesRepository, videosRepository: VideosRepository);
    create(data: {
        videoId: string;
        userId: string;
        content: string;
    }): Promise<Comment>;
    findByVideoId(videoId: string): Promise<Comment[]>;
    findById(id: string): Promise<Comment>;
    update(id: string, content: string, userId: string): Promise<Comment | null>;
    delete(id: string, userId: string): Promise<void>;
    createReply(data: {
        commentId: string;
        userId: string;
        content: string;
    }): Promise<CommentReply>;
    getReplies(commentId: string): Promise<CommentReply[]>;
}
