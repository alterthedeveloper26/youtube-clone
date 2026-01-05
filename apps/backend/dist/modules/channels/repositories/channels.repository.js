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
exports.ChannelsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const channel_entity_1 = require("../entities/channel.entity");
const channel_mapper_1 = require("../domain/mappers/channel.mapper");
let ChannelsRepository = class ChannelsRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(domain) {
        const data = channel_mapper_1.ChannelMapper.toPersistence(domain);
        const entity = this.repository.create(data);
        const saved = await this.repository.save(entity);
        return channel_mapper_1.ChannelMapper.toDomain(saved);
    }
    async findById(id) {
        const entity = await this.repository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['user', 'videos'],
        });
        return entity ? channel_mapper_1.ChannelMapper.toDomain(entity) : null;
    }
    async findByUserId(userId) {
        const entity = await this.repository.findOne({
            where: { userId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['user'],
        });
        return entity ? channel_mapper_1.ChannelMapper.toDomain(entity) : null;
    }
    async findByHandle(handle) {
        const entity = await this.repository.findOne({
            where: { handle, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['user'],
        });
        return entity ? channel_mapper_1.ChannelMapper.toDomain(entity) : null;
    }
    async update(domain) {
        const data = channel_mapper_1.ChannelMapper.toPersistence(domain);
        await this.repository.update(domain.getId(), data);
        const updated = await this.findById(domain.getId());
        if (!updated) {
            throw new Error('Channel not found after update');
        }
        return updated;
    }
    async incrementSubscriberCount(id) {
        const domain = await this.findById(id);
        if (!domain) {
            throw new Error('Channel not found');
        }
        domain.incrementSubscriberCount();
        await this.update(domain);
    }
    async decrementSubscriberCount(id) {
        const domain = await this.findById(id);
        if (!domain) {
            throw new Error('Channel not found');
        }
        domain.decrementSubscriberCount();
        await this.update(domain);
    }
};
exports.ChannelsRepository = ChannelsRepository;
exports.ChannelsRepository = ChannelsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channel_entity_1.Channel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChannelsRepository);
//# sourceMappingURL=channels.repository.js.map