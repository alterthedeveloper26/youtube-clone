"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const video_storage_service_1 = require("./services/video-storage.service");
const video_transcoding_service_1 = require("./services/video-transcoding.service");
const videos_repository_1 = require("./repositories/videos.repository");
const channels_service_1 = require("../channels/channels.service");
const video_domain_1 = require("./domain/video.domain");
let VideosService = class VideosService {
    videosRepository;
    videoStorageService;
    videoTranscodingService;
    channelsService;
    constructor(videosRepository, videoStorageService, videoTranscodingService, channelsService) {
        this.videosRepository = videosRepository;
        this.videoStorageService = videoStorageService;
        this.videoTranscodingService = videoTranscodingService;
        this.channelsService = channelsService;
    }
    async requestUploadUrl(dto, userId) {
        const { filename, contentType } = dto;
        return this.videoStorageService.generateUploadUrl(userId, filename, contentType);
    }
    async completeUpload(dto, userId) {
        const { videoKey, title, description } = dto;
        const channel = await this.channelsService.findByUserId(userId);
        const videoId = videoKey.split('/')[2];
        const streamingUrls = this.videoStorageService.getStreamingUrls(videoKey);
        const videoDomain = new video_domain_1.VideoDomain(videoId, channel.getId(), title, streamingUrls.original, description, videoKey, streamingUrls['720p'], null, 0, 0, 0, 0, 0, false, video_domain_1.VideoVisibility.PUBLIC, video_domain_1.ProcessingStatus.PROCESSING);
        videoDomain.validate();
        const savedVideo = await this.videosRepository.create(videoDomain);
        const outputKey = videoKey.replace('/original.', '/');
        this.videoTranscodingService
            .startTranscodingJob(videoKey, outputKey, videoId)
            .then(async () => {
            const video = await this.videosRepository.findById(videoId);
            if (video) {
                video.setProcessingStatus(video_domain_1.ProcessingStatus.COMPLETED);
                video.setHls720pUrl(streamingUrls['720p']);
                if (video.canBePublished()) {
                    video.publish();
                }
                await this.videosRepository.update(video);
            }
        })
            .catch(async (error) => {
            console.error('Transcoding failed:', error);
            const video = await this.videosRepository.findById(videoId);
            if (video) {
                video.setProcessingStatus(video_domain_1.ProcessingStatus.FAILED);
                await this.videosRepository.update(video);
            }
        });
        return savedVideo;
    }
    async findOne(id) {
        const video = await this.videosRepository.findById(id);
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        const videoKey = video.getVideoKey();
        if (videoKey) {
            const streamingUrls = this.videoStorageService.getStreamingUrls(videoKey);
            video.setVideoUrl(streamingUrls.original);
            if (streamingUrls['720p']) {
                video.setHls720pUrl(streamingUrls['720p']);
            }
        }
        return video;
    }
    async findAll(options) {
        const { page = 1, limit = 10, search, channelId } = options;
        const skip = (page - 1) * limit;
        const where = {
            isPublished: true,
            visibility: 'public',
        };
        if (search) {
            where.title = (0, typeorm_1.Like)(`%${search}%`);
        }
        if (channelId) {
            where.channelId = channelId;
        }
        const [videos, total] = await Promise.all([
            this.videosRepository.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'DESC' },
            }),
            this.videosRepository.count(where),
        ]);
        return {
            data: videos,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findAllWithCursor(options) {
        const { first, after, last, before, search, channelId } = options;
        const where = {
            isPublished: true,
            visibility: 'public',
        };
        if (search) {
            where.title = (0, typeorm_1.Like)(`%${search}%`);
        }
        if (channelId) {
            where.channelId = channelId;
        }
        const result = await this.videosRepository.findWithCursor({
            where,
            first,
            after,
            last,
            before,
            orderBy: { createdAt: 'DESC' },
        });
        return result;
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [videos_repository_1.VideosRepository,
        video_storage_service_1.VideoStorageService,
        video_transcoding_service_1.VideoTranscodingService,
        channels_service_1.ChannelsService])
], VideosService);
//# sourceMappingURL=videos.service.js.map