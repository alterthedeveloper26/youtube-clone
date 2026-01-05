import { Repository } from 'typeorm';
import { Channel } from '../entities/channel.entity';
import { ChannelDomain } from '../domain/channel.domain';
export declare class ChannelsRepository {
    private readonly repository;
    constructor(repository: Repository<Channel>);
    create(domain: ChannelDomain): Promise<ChannelDomain>;
    findById(id: string): Promise<ChannelDomain | null>;
    findByUserId(userId: string): Promise<ChannelDomain | null>;
    findByHandle(handle: string): Promise<ChannelDomain | null>;
    update(domain: ChannelDomain): Promise<ChannelDomain>;
    incrementSubscriberCount(id: string): Promise<void>;
    decrementSubscriberCount(id: string): Promise<void>;
}
