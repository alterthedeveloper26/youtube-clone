import { Injectable, Logger } from '@nestjs/common';
import {
  MediaConvertClient,
  CreateJobCommand,
  CreateJobCommandInput,
} from '@aws-sdk/client-mediaconvert';
import {
  mediaConvertClient,
  AWS_CONFIG,
} from '../../../shared/config/aws.config';

@Injectable()
export class VideoTranscodingService {
  private readonly logger = new Logger(VideoTranscodingService.name);

  /**
   * Start transcoding job to create 720p HLS version
   * Only creates 720p version (for learning project)
   */
  async startTranscodingJob(
    inputKey: string,
    outputKey: string,
    videoId: string,
  ): Promise<string> {
    const inputPath = `s3://${AWS_CONFIG.S3_BUCKET}/${inputKey}`;
    const outputPath = `s3://${AWS_CONFIG.S3_BUCKET}/${outputKey}`;

    // HLS job settings - Only 720p quality
    const jobSettings: CreateJobCommandInput = {
      Role: AWS_CONFIG.MEDIACONVERT_ROLE,
      Settings: {
        Inputs: [
          {
            FileInput: inputPath,
          },
        ],
        OutputGroups: [
          {
            Name: 'HLS_720p',
            OutputGroupSettings: {
              Type: 'HLS_GROUP_SETTINGS',
              HlsGroupSettings: {
                Destination: `${outputPath}/hls/720p/`,
                SegmentLength: 10,
                MinSegmentLength: 0,
              },
            },
            Outputs: [
              // Only 720p quality
              {
                NameModifier: '_720p',
                VideoDescription: {
                  Width: 1280,
                  Height: 720,
                  CodecSettings: {
                    Codec: 'H_264',
                    H264Settings: {
                      Bitrate: 2500000, // 2.5 Mbps
                      MaxBitrate: 3000000, // 3 Mbps max
                      RateControlMode: 'VBR',
                    },
                  },
                },
                AudioDescriptions: [
                  {
                    CodecSettings: {
                      Codec: 'AAC',
                      AacSettings: {
                        Bitrate: 192000, // 192 kbps
                        SampleRate: 48000,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    try {
      const command = new CreateJobCommand(jobSettings);
      const response = await mediaConvertClient.send(command);

      this.logger.log(
        `Transcoding job started: ${response.Job?.Id} for video ${videoId}`,
      );
      return response.Job?.Id || '';
    } catch (error) {
      this.logger.error(`Failed to start transcoding job: ${error}`);
      throw error;
    }
  }
}
