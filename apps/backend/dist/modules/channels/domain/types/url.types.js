"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBannerUrl = isBannerUrl;
exports.isAvatarUrl = isAvatarUrl;
exports.createBannerUrl = createBannerUrl;
exports.createAvatarUrl = createAvatarUrl;
function isBannerUrl(url) {
    if (!url)
        return false;
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
function isAvatarUrl(url) {
    if (!url)
        return false;
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
function createBannerUrl(url) {
    if (!url)
        return null;
    if (url.length > 500) {
        throw new Error('Banner URL cannot exceed 500 characters');
    }
    if (!isBannerUrl(url)) {
        throw new Error('Invalid banner URL format');
    }
    return url;
}
function createAvatarUrl(url) {
    if (!url)
        return null;
    if (url.length > 500) {
        throw new Error('Avatar URL cannot exceed 500 characters');
    }
    if (!isAvatarUrl(url)) {
        throw new Error('Invalid avatar URL format');
    }
    return url;
}
//# sourceMappingURL=url.types.js.map