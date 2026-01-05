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
exports.PlaylistsService = void 0;
const common_1 = require("@nestjs/common");
const playlists_repository_1 = require("./repositories/playlists.repository");
const playlist_items_repository_1 = require("./repositories/playlist-items.repository");
let PlaylistsService = class PlaylistsService {
    playlistsRepository;
    playlistItemsRepository;
    constructor(playlistsRepository, playlistItemsRepository) {
        this.playlistsRepository = playlistsRepository;
        this.playlistItemsRepository = playlistItemsRepository;
    }
    async create(data) {
        return this.playlistsRepository.create(data);
    }
    async findById(id) {
        const playlist = await this.playlistsRepository.findById(id);
        if (!playlist) {
            throw new common_1.NotFoundException('Playlist not found');
        }
        return playlist;
    }
    async findByUserId(userId) {
        return this.playlistsRepository.findByUserId(userId);
    }
    async addVideo(playlistId, videoId) {
        const existing = await this.playlistItemsRepository.findOne(playlistId, videoId);
        if (existing) {
            return;
        }
        const maxPosition = await this.playlistItemsRepository.getMaxPosition(playlistId);
        await this.playlistItemsRepository.create({
            playlistId,
            videoId,
            position: maxPosition + 1,
        });
        await this.playlistsRepository.incrementVideoCount(playlistId);
    }
    async removeVideo(playlistId, videoId) {
        await this.playlistItemsRepository.delete(playlistId, videoId);
        await this.playlistsRepository.decrementVideoCount(playlistId);
    }
};
exports.PlaylistsService = PlaylistsService;
exports.PlaylistsService = PlaylistsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [playlists_repository_1.PlaylistsRepository,
        playlist_items_repository_1.PlaylistItemsRepository])
], PlaylistsService);
//# sourceMappingURL=playlists.service.js.map