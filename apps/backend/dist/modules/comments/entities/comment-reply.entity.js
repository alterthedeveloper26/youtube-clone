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
exports.CommentReply = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/entities/base.entity");
const comment_entity_1 = require("./comment.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let CommentReply = class CommentReply extends base_entity_1.BaseEntity {
    commentId;
    comment;
    userId;
    user;
    content;
    likeCount;
};
exports.CommentReply = CommentReply;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], CommentReply.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comment_entity_1.Comment, (comment) => comment.replies),
    (0, typeorm_1.JoinColumn)({ name: 'commentId' }),
    __metadata("design:type", comment_entity_1.Comment)
], CommentReply.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], CommentReply.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], CommentReply.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CommentReply.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], CommentReply.prototype, "likeCount", void 0);
exports.CommentReply = CommentReply = __decorate([
    (0, typeorm_1.Entity)('comment_replies')
], CommentReply);
//# sourceMappingURL=comment-reply.entity.js.map