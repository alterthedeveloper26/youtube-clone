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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_repository_1 = require("./repositories/subscriptions.repository");
const channels_repository_1 = require("../channels/repositories/channels.repository");
let SubscriptionsService = class SubscriptionsService {
    subscriptionsRepository;
    channelsRepository;
    constructor(subscriptionsRepository, channelsRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.channelsRepository = channelsRepository;
    }
    async subscribe(subscriberId, channelId) {
        const existing = await this.subscriptionsRepository.findOne(subscriberId, channelId);
        if (existing) {
            throw new common_1.BadRequestException('Already subscribed to this channel');
        }
        const channel = await this.channelsRepository.findById(channelId);
        if (channel?.getUserId() === subscriberId) {
            throw new common_1.BadRequestException('Cannot subscribe to your own channel');
        }
        await this.subscriptionsRepository.create({ subscriberId, channelId });
        await this.channelsRepository.incrementSubscriberCount(channelId);
    }
    async unsubscribe(subscriberId, channelId) {
        await this.subscriptionsRepository.delete(subscriberId, channelId);
        await this.channelsRepository.decrementSubscriberCount(channelId);
    }
    async getSubscriptions(subscriberId) {
        return this.subscriptionsRepository.findBySubscriber(subscriberId);
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscriptions_repository_1.SubscriptionsRepository,
        channels_repository_1.ChannelsRepository])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map