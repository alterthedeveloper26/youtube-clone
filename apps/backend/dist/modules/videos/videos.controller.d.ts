import { VideosService } from './videos.service';
import { RequestUploadUrlDto } from './dto/request-upload-url.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';
import { GetVideosQueryDto } from './dto/get-videos-query.dto';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    requestUploadUrl(dto: RequestUploadUrlDto): Promise<{
        uploadUrl: string;
        videoKey: string;
        videoId: string;
    }>;
    completeUpload(dto: CompleteUploadDto): Promise<import("./domain/video.domain").VideoDomain>;
    findAll(query: GetVideosQueryDto): Promise<{
        data: import("./domain/video.domain").VideoDomain[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("./domain/video.domain").VideoDomain>;
}
