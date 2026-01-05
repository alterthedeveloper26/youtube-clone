import { ChannelsRepository } from './repositories/channels.repository';
import { ChannelDomain } from './domain/channel.domain';
export declare class ChannelsService {
    private readonly channelsRepository;
    constructor(channelsRepository: ChannelsRepository);
    create(data: {
        userId: string;
        name: string;
        handle: string;
        description?: string;
        bannerUrl?: string;
        avatarUrl?: string;
    }): Promise<ChannelDomain>;
    findById(id: string): Promise<ChannelDomain>;
    findByUserId(userId: string): Promise<ChannelDomain>;
    update(id: string, data: {
        name?: string;
        handle?: string;
        description?: string;
        bannerUrl?: string;
        avatarUrl?: string;
    }): Promise<ChannelDomain>;
    subscribe(channelId: string): Promise<void>;
    unsubscribe(channelId: string): Promise<void>;
}
