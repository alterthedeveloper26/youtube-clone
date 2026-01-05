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
exports.ViewsService = void 0;
const common_1 = require("@nestjs/common");
const views_repository_1 = require("./repositories/views.repository");
const videos_repository_1 = require("../videos/repositories/videos.repository");
let ViewsService = class ViewsService {
    viewsRepository;
    videosRepository;
    constructor(viewsRepository, videosRepository) {
        this.viewsRepository = viewsRepository;
        this.videosRepository = videosRepository;
    }
    async recordView(data) {
        await this.viewsRepository.create(data);
        await this.videosRepository.incrementViewCount(data.videoId);
    }
    async getHistory(userId) {
        return this.viewsRepository.findByUserId(userId);
    }
};
exports.ViewsService = ViewsService;
exports.ViewsService = ViewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [views_repository_1.ViewsRepository,
        videos_repository_1.VideosRepository])
], ViewsService);
//# sourceMappingURL=views.service.js.map