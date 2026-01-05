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
exports.VideoStorageService = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("../../../shared/aws/s3.service");
const uuid_1 = require("uuid");
let VideoStorageService = class VideoStorageService {
    s3Service;
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async generateUploadUrl(userId, filename, contentType) {
        const videoId = (0, uuid_1.v4)();
        const extension = filename.split('.').pop();
        const key = `videos/${userId}/${videoId}/original.${extension}`;
        const uploadUrl = await this.s3Service.generatePresignedUploadUrl(key, contentType, 3600);
        return {
            uploadUrl,
            videoKey: key,
            videoId,
        };
    }
    getStreamingUrls(videoKey) {
        const originalUrl = this.s3Service.getObjectUrl(videoKey);
        const hlsKey = videoKey.replace('/original.', '/hls/720p/playlist.m3u8');
        const hls720pUrl = this.s3Service.getObjectUrl(hlsKey);
        return {
            original: originalUrl,
            '720p': hls720pUrl,
        };
    }
    async deleteVideo(videoKey) {
        await this.s3Service.deleteObject(videoKey);
        const hlsKey = videoKey.replace('/original.', '/hls/720p/playlist.m3u8');
        try {
            await this.s3Service.deleteObject(hlsKey);
        }
        catch (error) {
        }
    }
};
exports.VideoStorageService = VideoStorageService;
exports.VideoStorageService = VideoStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [s3_service_1.S3Service])
], VideoStorageService);
//# sourceMappingURL=video-storage.service.js.map