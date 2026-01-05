import { Repository } from 'typeorm';
import { VideoView } from '../entities/video-view.entity';
export declare class ViewsRepository {
    private readonly repository;
    constructor(repository: Repository<VideoView>);
    create(data: Partial<VideoView>): Promise<VideoView>;
    findByVideoId(videoId: string): Promise<VideoView[]>;
    findByUserId(userId: string): Promise<VideoView[]>;
}
