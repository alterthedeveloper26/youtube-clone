import { S3Client } from '@aws-sdk/client-s3';
import { MediaConvertClient } from '@aws-sdk/client-mediaconvert';

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const mediaConvertClient = new MediaConvertClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const AWS_CONFIG = {
  S3_BUCKET: process.env.AWS_S3_BUCKET!,
  CLOUDFRONT_DOMAIN: process.env.AWS_CLOUDFRONT_DOMAIN!,
  MEDIACONVERT_ROLE: process.env.AWS_MEDIACONVERT_ROLE!,
  REGION: process.env.AWS_REGION || 'us-east-1',
};

