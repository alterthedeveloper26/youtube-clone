import { BaseEntity } from '../../../shared/entities/base.entity';
import { Channel } from '../../channels/entities/channel.entity';
export declare class User extends BaseEntity {
    clerkId: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    avatarUrl: string | null;
    bio: string | null;
    channel: Channel;
}
