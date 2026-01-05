"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDomain = void 0;
class UserDomain {
    id;
    clerkId;
    username;
    email;
    avatarUrl;
    bio;
    constructor(id, clerkId, username, email, avatarUrl, bio) {
        this.id = id;
        this.setClerkId(clerkId);
        this.setUsername(username);
        this.setEmail(email);
        this.avatarUrl = avatarUrl || null;
        this.setBio(bio);
    }
    setClerkId(clerkId) {
        if (!clerkId || clerkId.trim().length === 0) {
            throw new Error('Clerk ID is required');
        }
        this.clerkId = clerkId.trim();
    }
    setUsername(username) {
        if (!username || username.trim().length === 0) {
            throw new Error('Username is required');
        }
        if (username.trim().length < 3) {
            throw new Error('Username must be at least 3 characters');
        }
        if (username.length > 100) {
            throw new Error('Username cannot exceed 100 characters');
        }
        this.username = username.trim();
    }
    setEmail(email) {
        if (!email || email.trim().length === 0) {
            throw new Error('Email is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        this.email = email.toLowerCase().trim();
    }
    setBio(bio) {
        if (bio && bio.length > 500) {
            throw new Error('Bio cannot exceed 500 characters');
        }
        this.bio = bio || null;
    }
    setAvatarUrl(url) {
        if (url && url.length > 500) {
            throw new Error('Avatar URL cannot exceed 500 characters');
        }
        this.avatarUrl = url;
    }
    getId() {
        return this.id;
    }
    getClerkId() {
        return this.clerkId;
    }
    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getAvatarUrl() {
        return this.avatarUrl;
    }
    getBio() {
        return this.bio;
    }
    validate() {
        if (!this.clerkId) {
            throw new Error('Clerk ID is required');
        }
        if (!this.username || this.username.length < 3) {
            throw new Error('Username is invalid');
        }
        if (!this.email) {
            throw new Error('Email is required');
        }
    }
}
exports.UserDomain = UserDomain;
//# sourceMappingURL=user.domain.js.map