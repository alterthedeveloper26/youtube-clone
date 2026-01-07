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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const videos_service_1 = require("./videos.service");
const request_upload_url_dto_1 = require("./dto/request-upload-url.dto");
const complete_upload_dto_1 = require("./dto/complete-upload.dto");
const get_videos_query_dto_1 = require("./dto/get-videos-query.dto");
let VideosController = class VideosController {
    videosService;
    constructor(videosService) {
        this.videosService = videosService;
    }
    async requestUploadUrl(dto) {
        const userId = 'temp-user-id';
        return this.videosService.requestUploadUrl(dto, userId);
    }
    async completeUpload(dto) {
        const userId = 'temp-user-id';
        return this.videosService.completeUpload(dto, userId);
    }
    async findAll(query) {
        return this.videosService.findAll(query);
    }
    async findOne(id) {
        return this.videosService.findOne(id);
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_1.Post)('upload/request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_upload_url_dto_1.RequestUploadUrlDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "requestUploadUrl", null);
__decorate([
    (0, common_1.Post)('upload/complete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [complete_upload_dto_1.CompleteUploadDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "completeUpload", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_videos_query_dto_1.GetVideosQueryDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findOne", null);
exports.VideosController = VideosController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
//# sourceMappingURL=videos.controller.js.map