"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoDomain = exports.ProcessingStatus = exports.VideoVisibility = void 0;
var VideoVisibility;
(function (VideoVisibility) {
    VideoVisibility["PUBLIC"] = "public";
    VideoVisibility["UNLISTED"] = "unlisted";
    VideoVisibility["PRIVATE"] = "private";
})(VideoVisibility || (exports.VideoVisibility = VideoVisibility = {}));
var ProcessingStatus;
(function (ProcessingStatus) {
    ProcessingStatus["PENDING"] = "pending";
    ProcessingStatus["PROCESSING"] = "processing";
    ProcessingStatus["COMPLETED"] = "completed";
    ProcessingStatus["FAILED"] = "failed";
})(ProcessingStatus || (exports.ProcessingStatus = ProcessingStatus = {}));
class VideoDomain {
    id;
    channelId;
    title;
    description;
    videoUrl;
    videoKey;
    hls720pUrl;
    thumbnailUrl;
    duration;
    viewCount;
    likeCount;
    dislikeCount;
    commentCount;
    isPublished;
    visibility;
    processingStatus;
    constructor(id, channelId, title, videoUrl, description, videoKey, hls720pUrl, thumbnailUrl, duration = 0, viewCount = 0, likeCount = 0, dislikeCount = 0, commentCount = 0, isPublished = false, visibility = VideoVisibility.PUBLIC, processingStatus = ProcessingStatus.PENDING) {
        this.id = id;
        this.channelId = channelId;
        this.setTitle(title);
        this.setDescription(description);
        this.videoUrl = videoUrl;
        this.videoKey = videoKey || null;
        this.hls720pUrl = hls720pUrl || null;
        this.thumbnailUrl = thumbnailUrl || null;
        this.duration = duration;
        this.viewCount = viewCount;
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.commentCount = commentCount;
        this.isPublished = isPublished;
        this.visibility = visibility;
        this.processingStatus = processingStatus;
    }
    setTitle(title) {
        if (!title || title.trim().length === 0) {
            throw new Error('Video title is required');
        }
        if (title.trim().length < 3) {
            throw new Error('Video title must be at least 3 characters');
        }
        if (title.length > 100) {
            throw new Error('Video title cannot exceed 100 characters');
        }
        this.title = title.trim();
    }
    setDescription(description) {
        if (description && description.length > 5000) {
            throw new Error('Video description cannot exceed 5000 characters');
        }
        this.description = description || null;
    }
    publish() {
        if (this.processingStatus !== ProcessingStatus.COMPLETED) {
            throw new Error('Video must be processed before publishing');
        }
        if (this.title.length < 3) {
            throw new Error('Video title is too short to publish');
        }
        this.isPublished = true;
    }
    unpublish() {
        this.isPublished = false;
    }
    canBePublished() {
        return (this.processingStatus === ProcessingStatus.COMPLETED &&
            this.title.length >= 3 &&
            this.videoUrl !== null);
    }
    canBeLiked() {
        return this.isPublished;
    }
    incrementView() {
        this.viewCount += 1;
    }
    incrementLike() {
        if (!this.canBeLiked()) {
            throw new Error('Video cannot be liked');
        }
        this.likeCount += 1;
    }
    decrementLike() {
        if (this.likeCount > 0) {
            this.likeCount -= 1;
        }
    }
    incrementDislike() {
        if (!this.canBeLiked()) {
            throw new Error('Video cannot be disliked');
        }
        this.dislikeCount += 1;
    }
    decrementDislike() {
        if (this.dislikeCount > 0) {
            this.dislikeCount -= 1;
        }
    }
    incrementComment() {
        this.commentCount += 1;
    }
    setProcessingStatus(status) {
        this.processingStatus = status;
        if (status === ProcessingStatus.COMPLETED && this.canBePublished()) {
            this.isPublished = true;
        }
    }
    setHls720pUrl(url) {
        this.hls720pUrl = url;
        if (this.processingStatus === ProcessingStatus.PROCESSING) {
            this.setProcessingStatus(ProcessingStatus.COMPLETED);
        }
    }
    setVideoUrl(url) {
        if (!url || url.trim().length === 0) {
            throw new Error('Video URL is required');
        }
        if (url.length > 500) {
            throw new Error('Video URL cannot exceed 500 characters');
        }
        this.videoUrl = url;
    }
    setThumbnailUrl(url) {
        if (url && url.length > 500) {
            throw new Error('Thumbnail URL cannot exceed 500 characters');
        }
        this.thumbnailUrl = url;
    }
    getId() {
        return this.id;
    }
    getChannelId() {
        return this.channelId;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getVideoUrl() {
        return this.videoUrl;
    }
    getVideoKey() {
        return this.videoKey;
    }
    getHls720pUrl() {
        return this.hls720pUrl;
    }
    getThumbnailUrl() {
        return this.thumbnailUrl;
    }
    getDuration() {
        return this.duration;
    }
    getViewCount() {
        return this.viewCount;
    }
    getLikeCount() {
        return this.likeCount;
    }
    getDislikeCount() {
        return this.dislikeCount;
    }
    getCommentCount() {
        return this.commentCount;
    }
    getIsPublished() {
        return this.isPublished;
    }
    getVisibility() {
        return this.visibility;
    }
    getProcessingStatus() {
        return this.processingStatus;
    }
    validate() {
        if (!this.title || this.title.length < 3) {
            throw new Error('Video title is invalid');
        }
        if (!this.videoUrl) {
            throw new Error('Video URL is required');
        }
        if (this.viewCount < 0 || this.likeCount < 0 || this.dislikeCount < 0) {
            throw new Error('Counts cannot be negative');
        }
    }
}
exports.VideoDomain = VideoDomain;
//# sourceMappingURL=video.domain.js.map