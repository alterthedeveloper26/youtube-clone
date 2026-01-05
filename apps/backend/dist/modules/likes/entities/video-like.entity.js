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
exports.VideoLike = exports.LikeType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/entities/base.entity");
const video_entity_1 = require("../../videos/entities/video.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var LikeType;
(function (LikeType) {
    LikeType["LIKE"] = "like";
    LikeType["DISLIKE"] = "dislike";
})(LikeType || (exports.LikeType = LikeType = {}));
let VideoLike = class VideoLike extends base_entity_1.BaseEntity {
    videoId;
    video;
    userId;
    user;
    type;
};
exports.VideoLike = VideoLike;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], VideoLike.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => video_entity_1.Video, (video) => video.likes),
    (0, typeorm_1.JoinColumn)({ name: 'videoId' }),
    __metadata("design:type", video_entity_1.Video)
], VideoLike.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], VideoLike.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], VideoLike.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LikeType,
    }),
    __metadata("design:type", String)
], VideoLike.prototype, "type", void 0);
exports.VideoLike = VideoLike = __decorate([
    (0, typeorm_1.Entity)('video_likes'),
    (0, typeorm_1.Unique)(['videoId', 'userId'])
], VideoLike);
//# sourceMappingURL=video-like.entity.js.map