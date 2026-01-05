export declare class S3Service {
    private readonly bucket;
    generatePresignedUploadUrl(key: string, contentType: string, expiresIn?: number): Promise<string>;
    generatePresignedViewUrl(key: string, expiresIn?: number): Promise<string>;
    deleteObject(key: string): Promise<void>;
    getObjectUrl(key: string): string;
}
