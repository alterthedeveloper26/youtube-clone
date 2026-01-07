"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDomain = void 0;
class BaseDomain {
    id;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(id, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
        this.deletedAt = deletedAt ?? null;
    }
    getId() {
        return this.id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getDeletedAt() {
        return this.deletedAt;
    }
    isDeleted() {
        return this.deletedAt !== null;
    }
}
exports.BaseDomain = BaseDomain;
//# sourceMappingURL=base.domain.js.map