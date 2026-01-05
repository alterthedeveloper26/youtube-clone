"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelDomain = void 0;
const url_types_1 = require("./types/url.types");
class ChannelDomain {
    id;
    userId;
    name;
    handle;
    description;
    bannerUrl;
    avatarUrl;
    subscriberCount;
    constructor(id, userId, name, handle, description, bannerUrl, avatarUrl, subscriberCount = 0) {
        this.id = id;
        this.userId = userId;
        this.setName(name);
        this.setHandle(handle);
        this.description = description || null;
        this.bannerUrl = (0, url_types_1.createBannerUrl)(bannerUrl);
        this.avatarUrl = (0, url_types_1.createAvatarUrl)(avatarUrl);
        this.subscriberCount = subscriberCount;
    }
    setName(name) {
        if (!name || name.trim().length === 0) {
            throw new Error('Channel name is required');
        }
        if (name.trim().length < 3) {
            throw new Error('Channel name must be at least 3 characters');
        }
        if (name.length > 100) {
            throw new Error('Channel name cannot exceed 100 characters');
        }
        this.name = name.trim();
    }
    setHandle(handle) {
        if (!handle || handle.trim().length === 0) {
            throw new Error('Channel handle is required');
        }
        let normalizedHandle = handle.trim().toLowerCase();
        if (!normalizedHandle.startsWith('@')) {
            normalizedHandle = `@${normalizedHandle}`;
        }
        const handleWithoutAt = normalizedHandle.slice(1);
        if (handleWithoutAt.length < 3) {
            throw new Error('Channel handle must be at least 3 characters (excluding @)');
        }
        if (handleWithoutAt.length > 50) {
            throw new Error('Channel handle cannot exceed 50 characters (excluding @)');
        }
        if (!/^[a-z0-9_]+$/.test(handleWithoutAt)) {
            throw new Error('Channel handle can only contain lowercase letters, numbers, and underscores');
        }
        this.handle = normalizedHandle;
    }
    static normalizeHandle(handle) {
        if (!handle || handle.trim().length === 0) {
            return handle;
        }
        let normalized = handle.trim().toLowerCase();
        if (!normalized.startsWith('@')) {
            normalized = `@${normalized}`;
        }
        return normalized;
    }
    setDescription(description) {
        if (description && description.length > 5000) {
            throw new Error('Channel description cannot exceed 5000 characters');
        }
        this.description = description;
    }
    canBeUpdated() {
        return true;
    }
    canBeDeleted() {
        return this.subscriberCount === 0;
    }
    incrementSubscriberCount() {
        this.subscriberCount += 1;
    }
    decrementSubscriberCount() {
        if (this.subscriberCount > 0) {
            this.subscriberCount -= 1;
        }
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.userId;
    }
    getName() {
        return this.name;
    }
    getHandle() {
        return this.handle;
    }
    getDescription() {
        return this.description;
    }
    getBannerUrl() {
        return this.bannerUrl;
    }
    getAvatarUrl() {
        return this.avatarUrl;
    }
    getSubscriberCount() {
        return this.subscriberCount;
    }
    setBannerUrl(url) {
        this.bannerUrl = (0, url_types_1.createBannerUrl)(url);
    }
    setAvatarUrl(url) {
        this.avatarUrl = (0, url_types_1.createAvatarUrl)(url);
    }
    validate() {
        if (!this.name || this.name.length < 3) {
            throw new Error('Channel name is invalid');
        }
        if (!this.handle || !this.handle.startsWith('@')) {
            throw new Error('Channel handle is invalid');
        }
        if (this.subscriberCount < 0) {
            throw new Error('Subscriber count cannot be negative');
        }
    }
}
exports.ChannelDomain = ChannelDomain;
//# sourceMappingURL=channel.domain.js.map