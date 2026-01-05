"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var VideoTranscodingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoTranscodingService = void 0;
const common_1 = require("@nestjs/common");
const client_mediaconvert_1 = require("@aws-sdk/client-mediaconvert");
const aws_config_1 = require("../../../shared/config/aws.config");
let VideoTranscodingService = VideoTranscodingService_1 = class VideoTranscodingService {
    logger = new common_1.Logger(VideoTranscodingService_1.name);
    async startTranscodingJob(inputKey, outputKey, videoId) {
        const inputPath = `s3://${aws_config_1.AWS_CONFIG.S3_BUCKET}/${inputKey}`;
        const outputPath = `s3://${aws_config_1.AWS_CONFIG.S3_BUCKET}/${outputKey}`;
        const jobSettings = {
            Role: aws_config_1.AWS_CONFIG.MEDIACONVERT_ROLE,
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
                            {
                                NameModifier: '_720p',
                                VideoDescription: {
                                    Width: 1280,
                                    Height: 720,
                                    CodecSettings: {
                                        Codec: 'H_264',
                                        H264Settings: {
                                            Bitrate: 2500000,
                                            MaxBitrate: 3000000,
                                            RateControlMode: 'VBR',
                                        },
                                    },
                                },
                                AudioDescriptions: [
                                    {
                                        CodecSettings: {
                                            Codec: 'AAC',
                                            AacSettings: {
                                                Bitrate: 192000,
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
            const command = new client_mediaconvert_1.CreateJobCommand(jobSettings);
            const response = await aws_config_1.mediaConvertClient.send(command);
            this.logger.log(`Transcoding job started: ${response.Job?.Id} for video ${videoId}`);
            return response.Job?.Id || '';
        }
        catch (error) {
            this.logger.error(`Failed to start transcoding job: ${error}`);
            throw error;
        }
    }
};
exports.VideoTranscodingService = VideoTranscodingService;
exports.VideoTranscodingService = VideoTranscodingService = VideoTranscodingService_1 = __decorate([
    (0, common_1.Injectable)()
], VideoTranscodingService);
//# sourceMappingURL=video-transcoding.service.js.map