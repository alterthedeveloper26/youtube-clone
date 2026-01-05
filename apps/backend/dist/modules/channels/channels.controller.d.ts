import { ChannelsService } from './channels.service';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        name: string;
        handle: string;
        description: string | null;
        bannerUrl: import("./domain/types/url.types").BannerUrl | null;
        avatarUrl: import("./domain/types/url.types").AvatarUrl | null;
        subscriberCount: number;
    }>;
    create(data: any): Promise<{
        id: string;
        userId: string;
        name: string;
        handle: string;
        description: string | null;
        bannerUrl: import("./domain/types/url.types").BannerUrl | null;
        avatarUrl: import("./domain/types/url.types").AvatarUrl | null;
        subscriberCount: number;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        userId: string;
        name: string;
        handle: string;
        description: string | null;
        bannerUrl: import("./domain/types/url.types").BannerUrl | null;
        avatarUrl: import("./domain/types/url.types").AvatarUrl | null;
        subscriberCount: number;
    }>;
    private toDto;
}
