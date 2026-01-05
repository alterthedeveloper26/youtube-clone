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
exports.VideoView = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/entities/base.entity");
const video_entity_1 = require("../../videos/entities/video.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let VideoView = class VideoView extends base_entity_1.BaseEntity {
    videoId;
    video;
    userId;
    user;
    ipAddress;
    watchTime;
    completed;
};
exports.VideoView = VideoView;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], VideoView.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => video_entity_1.Video, (video) => video.views),
    (0, typeorm_1.JoinColumn)({ name: 'videoId' }),
    __metadata("design:type", video_entity_1.Video)
], VideoView.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], VideoView.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Object)
], VideoView.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 45, nullable: true }),
    __metadata("design:type", Object)
], VideoView.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VideoView.prototype, "watchTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], VideoView.prototype, "completed", void 0);
exports.VideoView = VideoView = __decorate([
    (0, typeorm_1.Entity)('video_views')
], VideoView);
//# sourceMappingURL=video-view.entity.js.map