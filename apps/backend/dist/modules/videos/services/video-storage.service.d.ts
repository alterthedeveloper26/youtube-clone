import { S3Service } from '../../../shared/aws/s3.service';
export declare class VideoStorageService {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    generateUploadUrl(userId: string, filename: string, contentType: string): Promise<{
        uploadUrl: string;
        videoKey: string;
        videoId: string;
    }>;
    getStreamingUrls(videoKey: string): {
        original: string;
        '720p': string;
    };
    deleteVideo(videoKey: string): Promise<void>;
}
