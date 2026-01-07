"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelMapper = void 0;
const channel_domain_1 = require("../channel.domain");
class ChannelMapper {
    static toDomain(entity) {
        return new channel_domain_1.ChannelDomain(entity.id, entity.userId, entity.name, entity.handle, entity.description, entity.bannerUrl, entity.avatarUrl, entity.subscriberCount, entity.createdAt, entity.updatedAt, entity.deletedAt);
    }
    static toPersistence(domain) {
        const bannerUrl = domain.getBannerUrl();
        const avatarUrl = domain.getAvatarUrl();
        return {
            id: domain.getId(),
            userId: domain.getUserId(),
            name: domain.getName(),
            handle: domain.getHandle(),
            description: domain.getDescription(),
            bannerUrl: bannerUrl,
            avatarUrl: avatarUrl,
            subscriberCount: domain.getSubscriberCount(),
        };
    }
    static toDomainList(entities) {
        return entities.map((entity) => this.toDomain(entity));
    }
}
exports.ChannelMapper = ChannelMapper;
//# sourceMappingURL=channel.mapper.js.map