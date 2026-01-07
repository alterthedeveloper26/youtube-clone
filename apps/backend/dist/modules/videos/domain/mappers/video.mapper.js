"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoMapper = void 0;
const video_domain_1 = require("../video.domain");
class VideoMapper {
    static toDomain(entity) {
        return new video_domain_1.VideoDomain(entity.id, entity.channelId, entity.title, entity.videoUrl, entity.description, entity.videoKey, entity.hls720pUrl, entity.thumbnailUrl, entity.duration, entity.viewCount, entity.likeCount, entity.dislikeCount, entity.commentCount, entity.isPublished, this.mapVisibilityToDomain(entity.visibility), this.mapProcessingStatusToDomain(entity.processingStatus), entity.createdAt, entity.updatedAt, entity.deletedAt);
    }
    static toPersistence(domain) {
        return {
            id: domain.getId(),
            channelId: domain.getChannelId(),
            title: domain.getTitle(),
            description: domain.getDescription(),
            videoUrl: domain.getVideoUrl(),
            videoKey: domain.getVideoKey(),
            hls720pUrl: domain.getHls720pUrl(),
            thumbnailUrl: domain.getThumbnailUrl(),
            duration: domain.getDuration(),
            viewCount: domain.getViewCount(),
            likeCount: domain.getLikeCount(),
            dislikeCount: domain.getDislikeCount(),
            commentCount: domain.getCommentCount(),
            isPublished: domain.getIsPublished(),
            visibility: this.mapVisibilityToEntity(domain.getVisibility()),
            processingStatus: this.mapProcessingStatusToEntity(domain.getProcessingStatus()),
        };
    }
    static toDomainList(entities) {
        return entities.map((entity) => this.toDomain(entity));
    }
    static mapVisibilityToDomain(visibility) {
        return visibility;
    }
    static mapVisibilityToEntity(visibility) {
        return visibility;
    }
    static mapProcessingStatusToDomain(status) {
        return status;
    }
    static mapProcessingStatusToEntity(status) {
        return status;
    }
}
exports.VideoMapper = VideoMapper;
//# sourceMappingURL=video.mapper.js.map