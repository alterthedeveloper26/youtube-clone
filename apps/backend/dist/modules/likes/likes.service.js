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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const likes_repository_1 = require("./repositories/likes.repository");
const videos_repository_1 = require("../videos/repositories/videos.repository");
const video_like_entity_1 = require("./entities/video-like.entity");
let LikesService = class LikesService {
    likesRepository;
    videosRepository;
    constructor(likesRepository, videosRepository) {
        this.likesRepository = likesRepository;
        this.videosRepository = videosRepository;
    }
    async toggleLike(videoId, userId, type) {
        const existing = await this.likesRepository.findByVideoAndUser(videoId, userId);
        if (existing) {
            if (existing.type === type) {
                await this.likesRepository.delete(videoId, userId);
                if (type === video_like_entity_1.LikeType.LIKE) {
                    await this.videosRepository.decrementLikeCount(videoId);
                }
                else {
                    await this.videosRepository.decrementDislikeCount(videoId);
                }
            }
            else {
                await this.likesRepository.create({ videoId, userId, type });
                if (type === video_like_entity_1.LikeType.LIKE) {
                    await this.videosRepository.incrementLikeCount(videoId);
                    await this.videosRepository.decrementDislikeCount(videoId);
                }
                else {
                    await this.videosRepository.incrementDislikeCount(videoId);
                    await this.videosRepository.decrementLikeCount(videoId);
                }
            }
        }
        else {
            await this.likesRepository.create({ videoId, userId, type });
            if (type === video_like_entity_1.LikeType.LIKE) {
                await this.videosRepository.incrementLikeCount(videoId);
            }
            else {
                await this.videosRepository.incrementDislikeCount(videoId);
            }
        }
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [likes_repository_1.LikesRepository,
        videos_repository_1.VideosRepository])
], LikesService);
//# sourceMappingURL=likes.service.js.map