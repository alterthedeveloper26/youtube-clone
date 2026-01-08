import { VideoStorageService } from './services/video-storage.service';
import { VideoTranscodingService } from './services/video-transcoding.service';
import { VideosRepository } from './repositories/videos.repository';
import { ChannelsService } from '../channels/channels.service';
import { RequestUploadUrlDto } from './dto/request-upload-url.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';
import { VideoDomain } from './domain/video.domain';
export declare class VideosService {
    private readonly videosRepository;
    private readonly videoStorageService;
    private readonly videoTranscodingService;
    private readonly channelsService;
    constructor(videosRepository: VideosRepository, videoStorageService: VideoStorageService, videoTranscodingService: VideoTranscodingService, channelsService: ChannelsService);
    requestUploadUrl(dto: RequestUploadUrlDto, userId: string): Promise<{
        uploadUrl: string;
        videoKey: string;
        videoId: string;
    }>;
    completeUpload(dto: CompleteUploadDto, userId: string): Promise<VideoDomain>;
    findOne(id: string): Promise<VideoDomain>;
    findAll(options: {
        page?: number;
        limit?: number;
        search?: string;
        channelId?: string;
    }): Promise<{
        data: VideoDomain[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findAllWithCursor(options: {
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        search?: string;
        channelId?: string;
    }): Promise<{
        entities: import("./entities/video.entity").Video[];
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
}
