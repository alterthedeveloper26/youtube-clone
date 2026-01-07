import { VideosService } from '../videos.service';
import { VideosListResponse } from './video.object';
import { GetVideosInput } from './get-videos.input';
export declare class VideosResolver {
    private readonly videosService;
    constructor(videosService: VideosService);
    getVideos(input?: GetVideosInput): Promise<VideosListResponse>;
}
