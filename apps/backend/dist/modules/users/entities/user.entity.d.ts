import { BaseEntity } from '../../../shared/entities/base.entity';
import { Channel } from '../../channels/entities/channel.entity';
export declare class User extends BaseEntity {
    clerkId: string;
    username: string;
    email: string;
    avatarUrl: string | null;
    bio: string | null;
    channel: Channel;
}
