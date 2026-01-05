import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Video } from '../../videos/entities/video.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
export declare class Channel extends BaseEntity {
    userId: string;
    user: User;
    name: string;
    handle: string;
    description: string | null;
    bannerUrl: string | null;
    avatarUrl: string | null;
    subscriberCount: number;
    videos: Video[];
    subscriptions: Subscription[];
}
