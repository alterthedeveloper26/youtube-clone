import { ViewsRepository } from './repositories/views.repository';
import { VideosRepository } from '../videos/repositories/videos.repository';
export declare class ViewsService {
    private readonly viewsRepository;
    private readonly videosRepository;
    constructor(viewsRepository: ViewsRepository, videosRepository: VideosRepository);
    recordView(data: {
        videoId: string;
        userId?: string;
        ipAddress?: string;
        watchTime?: number;
        completed?: boolean;
    }): Promise<void>;
    getHistory(userId: string): Promise<import("./entities/video-view.entity").VideoView[]>;
}
