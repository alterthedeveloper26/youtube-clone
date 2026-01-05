import { SubscriptionsRepository } from './repositories/subscriptions.repository';
import { ChannelsRepository } from '../channels/repositories/channels.repository';
export declare class SubscriptionsService {
    private readonly subscriptionsRepository;
    private readonly channelsRepository;
    constructor(subscriptionsRepository: SubscriptionsRepository, channelsRepository: ChannelsRepository);
    subscribe(subscriberId: string, channelId: string): Promise<void>;
    unsubscribe(subscriberId: string, channelId: string): Promise<void>;
    getSubscriptions(subscriberId: string): Promise<import("./entities/subscription.entity").Subscription[]>;
}
