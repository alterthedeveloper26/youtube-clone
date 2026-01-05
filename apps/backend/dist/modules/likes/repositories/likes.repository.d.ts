import { Repository } from 'typeorm';
import { VideoLike, LikeType } from '../entities/video-like.entity';
export declare class LikesRepository {
    private readonly repository;
    constructor(repository: Repository<VideoLike>);
    create(data: {
        videoId: string;
        userId: string;
        type: LikeType;
    }): Promise<VideoLike>;
    findByVideoAndUser(videoId: string, userId: string): Promise<VideoLike | null>;
    delete(videoId: string, userId: string): Promise<void>;
}
