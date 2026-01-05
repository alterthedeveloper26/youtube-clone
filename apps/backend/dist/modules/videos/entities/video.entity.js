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
exports.Video = exports.ProcessingStatus = exports.VideoVisibility = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/entities/base.entity");
const channel_entity_1 = require("../../channels/entities/channel.entity");
const comment_entity_1 = require("../../comments/entities/comment.entity");
const video_like_entity_1 = require("../../likes/entities/video-like.entity");
const video_view_entity_1 = require("../../views/entities/video-view.entity");
const playlist_item_entity_1 = require("../../playlists/entities/playlist-item.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
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
let Video = class Video extends base_entity_1.BaseEntity {
    channelId;
    channel;
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
    comments;
    likes;
    views;
    playlistItems;
    categories;
    tags;
};
exports.Video = Video;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Video.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channel_entity_1.Channel, (channel) => channel.videos),
    (0, typeorm_1.JoinColumn)({ name: 'channelId' }),
    __metadata("design:type", channel_entity_1.Channel)
], Video.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Video.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Video.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "videoKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "hls720pUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "likeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "dislikeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "commentCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Video.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: VideoVisibility,
        default: VideoVisibility.PUBLIC,
    }),
    __metadata("design:type", String)
], Video.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProcessingStatus,
        default: ProcessingStatus.PENDING,
    }),
    __metadata("design:type", String)
], Video.prototype, "processingStatus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.video),
    __metadata("design:type", Array)
], Video.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => video_like_entity_1.VideoLike, (like) => like.video),
    __metadata("design:type", Array)
], Video.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => video_view_entity_1.VideoView, (view) => view.video),
    __metadata("design:type", Array)
], Video.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => playlist_item_entity_1.PlaylistItem, (item) => item.video),
    __metadata("design:type", Array)
], Video.prototype, "playlistItems", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category, (category) => category.videos),
    (0, typeorm_1.JoinTable)({
        name: 'video_categories',
        joinColumn: { name: 'videoId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Video.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, (tag) => tag.videos),
    (0, typeorm_1.JoinTable)({
        name: 'video_tags',
        joinColumn: { name: 'videoId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Video.prototype, "tags", void 0);
exports.Video = Video = __decorate([
    (0, typeorm_1.Entity)('videos')
], Video);
//# sourceMappingURL=video.entity.js.map