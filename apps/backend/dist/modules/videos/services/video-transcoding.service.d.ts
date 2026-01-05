export declare class VideoTranscodingService {
    private readonly logger;
    startTranscodingJob(inputKey: string, outputKey: string, videoId: string): Promise<string>;
}
