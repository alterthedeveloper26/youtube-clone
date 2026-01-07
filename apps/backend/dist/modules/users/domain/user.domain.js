"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDomain = void 0;
const base_domain_1 = require("../../../shared/domain/base.domain");
class UserDomain extends base_domain_1.BaseDomain {
    clerkId;
    username;
    firstName;
    lastName;
    email;
    avatarUrl;
    bio;
    constructor(id, clerkId, username, email, avatarUrl, bio, firstName, lastName, createdAt = new Date(), updatedAt = new Date(), deletedAt = null) {
        super(id, createdAt, updatedAt, deletedAt);
        this.setClerkId(clerkId);
        this.setUsername(username);
        this.setEmail(email);
        this.avatarUrl = avatarUrl || null;
        this.setBio(bio);
        this.setFirstName(firstName);
        this.setLastName(lastName);
    }
    setClerkId(clerkId) {
        if (!clerkId || clerkId.trim().length === 0) {
            throw new Error('Clerk ID is required');
        }
        this.clerkId = clerkId.trim();
    }
    setUsername(username) {
        if (username === null ||
            username === undefined ||
            username.trim().length === 0) {
            this.username = null;
            return;
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
    setFirstName(firstName) {
        if (firstName === null ||
            firstName === undefined ||
            firstName.trim().length === 0) {
            this.firstName = null;
            return;
        }
        if (firstName.length > 100) {
            throw new Error('First name cannot exceed 100 characters');
        }
        this.firstName = firstName.trim();
    }
    setLastName(lastName) {
        if (lastName === null ||
            lastName === undefined ||
            lastName.trim().length === 0) {
            this.lastName = null;
            return;
        }
        if (lastName.length > 100) {
            throw new Error('Last name cannot exceed 100 characters');
        }
        this.lastName = lastName.trim();
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
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    validate() {
        if (!this.clerkId) {
            throw new Error('Clerk ID is required');
        }
        if (this.username !== null && this.username.length < 3) {
            throw new Error('Username must be at least 3 characters if provided');
        }
        if (!this.email) {
            throw new Error('Email is required');
        }
    }
}
exports.UserDomain = UserDomain;
//# sourceMappingURL=user.domain.js.map