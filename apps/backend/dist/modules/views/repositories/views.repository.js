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
exports.ViewsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_view_entity_1 = require("../entities/video-view.entity");
let ViewsRepository = class ViewsRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        return this.repository.save(data);
    }
    async findByVideoId(videoId) {
        return this.repository.find({
            where: { videoId, deletedAt: undefined },
            order: { createdAt: 'DESC' },
        });
    }
    async findByUserId(userId) {
        return this.repository.find({
            where: { userId, deletedAt: undefined },
            relations: ['video', 'video.channel'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.ViewsRepository = ViewsRepository;
exports.ViewsRepository = ViewsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_view_entity_1.VideoView)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ViewsRepository);
//# sourceMappingURL=views.repository.js.map