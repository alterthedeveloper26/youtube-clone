import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
export declare class CommentsRepository {
    private readonly repository;
    constructor(repository: Repository<Comment>);
    create(data: Partial<Comment>): Promise<Comment>;
    findById(id: string): Promise<Comment | null>;
    findByVideoId(videoId: string): Promise<Comment[]>;
    update(id: string, data: Partial<Comment>): Promise<Comment | null>;
    delete(id: string): Promise<void>;
    incrementLikeCount(id: string): Promise<void>;
}
