import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
export declare class SubscriptionsRepository {
    private readonly repository;
    constructor(repository: Repository<Subscription>);
    create(data: {
        subscriberId: string;
        channelId: string;
    }): Promise<Subscription>;
    findBySubscriber(subscriberId: string): Promise<Subscription[]>;
    findByChannel(channelId: string): Promise<Subscription[]>;
    findOne(subscriberId: string, channelId: string): Promise<Subscription | null>;
    delete(subscriberId: string, channelId: string): Promise<void>;
}
