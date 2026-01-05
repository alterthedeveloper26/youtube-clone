import { BaseEntity } from '../../../shared/entities/base.entity';
import { Channel } from '../../channels/entities/channel.entity';
import { User } from '../../users/entities/user.entity';
export declare class Subscription extends BaseEntity {
    subscriberId: string;
    subscriber: User;
    channelId: string;
    channel: Channel;
}
