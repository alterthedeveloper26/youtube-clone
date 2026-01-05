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
exports.PlaylistItemsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const playlist_item_entity_1 = require("../entities/playlist-item.entity");
let PlaylistItemsRepository = class PlaylistItemsRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        return this.repository.save(data);
    }
    async findByPlaylistId(playlistId) {
        return this.repository.find({
            where: { playlistId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['video', 'video.channel'],
            order: { position: 'ASC' },
        });
    }
    async findOne(playlistId, videoId) {
        return this.repository.findOne({
            where: { playlistId, videoId, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async delete(playlistId, videoId) {
        await this.repository.softDelete({ playlistId, videoId });
    }
    async getMaxPosition(playlistId) {
        const result = await this.repository
            .createQueryBuilder('item')
            .select('MAX(item.position)', 'max')
            .where('item.playlistId = :playlistId', { playlistId })
            .getRawOne();
        return result?.max || 0;
    }
};
exports.PlaylistItemsRepository = PlaylistItemsRepository;
exports.PlaylistItemsRepository = PlaylistItemsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(playlist_item_entity_1.PlaylistItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlaylistItemsRepository);
//# sourceMappingURL=playlist-items.repository.js.map