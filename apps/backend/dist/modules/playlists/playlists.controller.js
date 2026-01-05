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
exports.PlaylistsController = void 0;
const common_1 = require("@nestjs/common");
const playlists_service_1 = require("./playlists.service");
let PlaylistsController = class PlaylistsController {
    playlistsService;
    constructor(playlistsService) {
        this.playlistsService = playlistsService;
    }
    async findByUser(userId) {
        return this.playlistsService.findByUserId(userId);
    }
    async findOne(id) {
        return this.playlistsService.findById(id);
    }
    async create(data) {
        return this.playlistsService.create(data);
    }
    async addVideo(id, data) {
        await this.playlistsService.addVideo(id, data.videoId);
        return { success: true };
    }
    async removeVideo(id, videoId) {
        await this.playlistsService.removeVideo(id, videoId);
        return { success: true };
    }
};
exports.PlaylistsController = PlaylistsController;
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/videos'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "addVideo", null);
__decorate([
    (0, common_1.Delete)(':id/videos/:videoId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('videoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlaylistsController.prototype, "removeVideo", null);
exports.PlaylistsController = PlaylistsController = __decorate([
    (0, common_1.Controller)('playlists'),
    __metadata("design:paramtypes", [playlists_service_1.PlaylistsService])
], PlaylistsController);
//# sourceMappingURL=playlists.controller.js.map