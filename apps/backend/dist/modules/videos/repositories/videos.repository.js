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
exports.VideosRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("../entities/video.entity");
const video_mapper_1 = require("../domain/mappers/video.mapper");
let VideosRepository = class VideosRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(domain) {
        const data = video_mapper_1.VideoMapper.toPersistence(domain);
        const entity = this.repository.create(data);
        const saved = await this.repository.save(entity);
        return video_mapper_1.VideoMapper.toDomain(saved);
    }
    async findById(id) {
        const entity = await this.repository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['channel', 'channel.user', 'categories', 'tags'],
        });
        return entity ? video_mapper_1.VideoMapper.toDomain(entity) : null;
    }
    async findMany(options) {
        const { where = {}, skip, take, orderBy } = options;
        const entities = await this.repository.find({
            where: { ...where, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['channel', 'channel.user'],
            skip,
            take,
            order: orderBy || { createdAt: 'DESC' },
        });
        return video_mapper_1.VideoMapper.toDomainList(entities);
    }
    async count(where) {
        return this.repository.count({
            where: { ...where, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async update(domain) {
        const data = video_mapper_1.VideoMapper.toPersistence(domain);
        await this.repository.update(domain.getId(), data);
        const updated = await this.findById(domain.getId());
        if (!updated) {
            throw new Error('Video not found after update');
        }
        return updated;
    }
    async delete(id) {
        await this.repository.softDelete(id);
    }
    async incrementViewCount(id) {
        const domain = await this.findById(id);
        if (!domain) {
            throw new Error('Video not found');
        }
        domain.incrementView();
        await this.update(domain);
    }
    async incrementLikeCount(id) {
        const domain = await this.findById(id);
        if (!domain) {
            throw new Error('Video not found');
        }
        domain.incrementLike();
        await this.update(domain);
    }
    async decrementLikeCount(id) {
        const domain = await this.findById(id);
        if (!domain) {
            throw new Error('Video not found');
        }
        domain.decrementLike();
        await this.update(domain);
    }
    async incrementDislikeCount(id) {
        const domain = await this.findById(id);
        if (!domain) {
            throw new Error('Video not found');
        }
        domain.incrementDislike();
        await this.update(domain);
    }
    async decrementDislikeCount(id) {
        const domain = await this.findById(id);
        if (!domain) {
            throw new Error('Video not found');
        }
        domain.decrementDislike();
        await this.update(domain);
    }
    async incrementCommentCount(id) {
        const domain = await this.findById(id);
        if (!domain) {
            throw new Error('Video not found');
        }
        domain.incrementComment();
        await this.update(domain);
    }
    async findEntities(options) {
        const { where = {}, skip, take, orderBy } = options;
        return this.repository.find({
            where: { ...where, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['channel', 'channel.user'],
            skip,
            take,
            order: orderBy || { createdAt: 'DESC' },
        });
    }
};
exports.VideosRepository = VideosRepository;
exports.VideosRepository = VideosRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VideosRepository);
//# sourceMappingURL=videos.repository.js.map