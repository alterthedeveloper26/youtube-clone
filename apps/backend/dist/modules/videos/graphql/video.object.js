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
exports.VideosListResponse = exports.VideosMeta = exports.Video = exports.ProcessingStatus = exports.VideoVisibility = void 0;
const graphql_1 = require("@nestjs/graphql");
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
let Video = class Video {
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
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Video = Video;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Video.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Video.prototype, "channelId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Video.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Video.prototype, "videoUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "videoKey", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "hls720pUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Video.prototype, "duration", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Video.prototype, "viewCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Video.prototype, "likeCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Video.prototype, "dislikeCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Video.prototype, "commentCount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Video.prototype, "isPublished", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Video.prototype, "visibility", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Video.prototype, "processingStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Video.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Video.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Video.prototype, "deletedAt", void 0);
exports.Video = Video = __decorate([
    (0, graphql_1.ObjectType)()
], Video);
let VideosMeta = class VideosMeta {
    page;
    limit;
    total;
    totalPages;
};
exports.VideosMeta = VideosMeta;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], VideosMeta.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], VideosMeta.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], VideosMeta.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], VideosMeta.prototype, "totalPages", void 0);
exports.VideosMeta = VideosMeta = __decorate([
    (0, graphql_1.ObjectType)()
], VideosMeta);
let VideosListResponse = class VideosListResponse {
    data;
    meta;
};
exports.VideosListResponse = VideosListResponse;
__decorate([
    (0, graphql_1.Field)(() => [Video]),
    __metadata("design:type", Array)
], VideosListResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => VideosMeta),
    __metadata("design:type", VideosMeta)
], VideosListResponse.prototype, "meta", void 0);
exports.VideosListResponse = VideosListResponse = __decorate([
    (0, graphql_1.ObjectType)()
], VideosListResponse);
//# sourceMappingURL=video.object.js.map