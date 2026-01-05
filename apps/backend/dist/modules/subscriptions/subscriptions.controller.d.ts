import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    getSubscriptions(userId: string): Promise<import("./entities/subscription.entity").Subscription[]>;
    subscribe(data: {
        subscriberId: string;
        channelId: string;
    }): Promise<{
        success: boolean;
    }>;
    unsubscribe(data: {
        subscriberId: string;
        channelId: string;
    }): Promise<{
        success: boolean;
    }>;
}
