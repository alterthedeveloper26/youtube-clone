import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';
import { User } from '../../users/entities/user.entity';
export declare class VideoView extends BaseEntity {
    videoId: string;
    video: Video;
    userId: string | null;
    user: User | null;
    ipAddress: string | null;
    watchTime: number;
    completed: boolean;
}
