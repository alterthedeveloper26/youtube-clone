import { LikesRepository } from './repositories/likes.repository';
import { VideosRepository } from '../videos/repositories/videos.repository';
import { LikeType } from './entities/video-like.entity';
export declare class LikesService {
    private readonly likesRepository;
    private readonly videosRepository;
    constructor(likesRepository: LikesRepository, videosRepository: VideosRepository);
    toggleLike(videoId: string, userId: string, type: LikeType): Promise<void>;
}
