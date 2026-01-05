import { S3Client } from '@aws-sdk/client-s3';
import { MediaConvertClient } from '@aws-sdk/client-mediaconvert';
export declare const s3Client: S3Client;
export declare const mediaConvertClient: MediaConvertClient;
export declare const AWS_CONFIG: {
    S3_BUCKET: string;
    CLOUDFRONT_DOMAIN: string;
    MEDIACONVERT_ROLE: string;
    REGION: string;
};
