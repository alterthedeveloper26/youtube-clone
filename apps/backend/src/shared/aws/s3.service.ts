import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, AWS_CONFIG } from '../config/aws.config';

@Injectable()
export class S3Service {
  private readonly bucket = AWS_CONFIG.S3_BUCKET;

  /**
   * Generate presigned URL for direct upload
   */
  async generatePresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    return getSignedUrl(s3Client, command, { expiresIn });
  }

  /**
   * Generate presigned URL for viewing (if needed)
   */
  async generatePresignedViewUrl(
    key: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(s3Client, command, { expiresIn });
  }

  /**
   * Delete object from S3
   */
  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await s3Client.send(command);
  }

  /**
   * Get object URL (CloudFront)
   */
  getObjectUrl(key: string): string {
    return `https://${AWS_CONFIG.CLOUDFRONT_DOMAIN}/${key}`;
  }
}
