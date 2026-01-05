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
exports.ChannelsService = void 0;
const common_1 = require("@nestjs/common");
const channels_repository_1 = require("./repositories/channels.repository");
const channel_domain_1 = require("./domain/channel.domain");
const uuid_1 = require("uuid");
let ChannelsService = class ChannelsService {
    channelsRepository;
    constructor(channelsRepository) {
        this.channelsRepository = channelsRepository;
    }
    async create(data) {
        const channelDomain = new channel_domain_1.ChannelDomain((0, uuid_1.v4)(), data.userId, data.name, data.handle, data.description, data.bannerUrl, data.avatarUrl);
        const normalizedHandle = channelDomain.getHandle();
        const existing = await this.channelsRepository.findByHandle(normalizedHandle);
        if (existing) {
            throw new common_1.BadRequestException('Channel handle already exists');
        }
        channelDomain.validate();
        return this.channelsRepository.create(channelDomain);
    }
    async findById(id) {
        const channel = await this.channelsRepository.findById(id);
        if (!channel) {
            throw new common_1.NotFoundException('Channel not found');
        }
        return channel;
    }
    async findByUserId(userId) {
        const channel = await this.channelsRepository.findByUserId(userId);
        if (!channel) {
            throw new common_1.NotFoundException('Channel not found for user');
        }
        return channel;
    }
    async update(id, data) {
        const channel = await this.findById(id);
        if (!channel.canBeUpdated()) {
            throw new common_1.BadRequestException('Channel cannot be updated');
        }
        if (data.name) {
            channel.setName(data.name);
        }
        if (data.handle) {
            const normalizedHandle = channel_domain_1.ChannelDomain.normalizeHandle(data.handle);
            if (normalizedHandle !== channel.getHandle()) {
                const existing = await this.channelsRepository.findByHandle(normalizedHandle);
                if (existing) {
                    throw new common_1.BadRequestException('Channel handle already exists');
                }
                channel.setHandle(data.handle);
            }
        }
        if (data.description !== undefined) {
            channel.setDescription(data.description);
        }
        if (data.bannerUrl !== undefined) {
            channel.setBannerUrl(data.bannerUrl);
        }
        if (data.avatarUrl !== undefined) {
            channel.setAvatarUrl(data.avatarUrl);
        }
        channel.validate();
        return this.channelsRepository.update(channel);
    }
    async subscribe(channelId) {
        const channel = await this.findById(channelId);
        channel.incrementSubscriberCount();
        await this.channelsRepository.update(channel);
    }
    async unsubscribe(channelId) {
        const channel = await this.findById(channelId);
        channel.decrementSubscriberCount();
        await this.channelsRepository.update(channel);
    }
};
exports.ChannelsService = ChannelsService;
exports.ChannelsService = ChannelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [channels_repository_1.ChannelsRepository])
], ChannelsService);
//# sourceMappingURL=channels.service.js.map