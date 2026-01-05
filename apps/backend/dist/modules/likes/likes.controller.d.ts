import { LikesService } from './likes.service';
import { LikeType } from './entities/video-like.entity';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    toggleLike(data: {
        videoId: string;
        userId: string;
        type: LikeType;
    }): Promise<{
        success: boolean;
    }>;
}
