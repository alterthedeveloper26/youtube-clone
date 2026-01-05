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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const comments_repository_1 = require("./repositories/comments.repository");
const comment_replies_repository_1 = require("./repositories/comment-replies.repository");
const videos_repository_1 = require("../videos/repositories/videos.repository");
let CommentsService = class CommentsService {
    commentsRepository;
    commentRepliesRepository;
    videosRepository;
    constructor(commentsRepository, commentRepliesRepository, videosRepository) {
        this.commentsRepository = commentsRepository;
        this.commentRepliesRepository = commentRepliesRepository;
        this.videosRepository = videosRepository;
    }
    async create(data) {
        const comment = await this.commentsRepository.create(data);
        await this.videosRepository.incrementCommentCount(data.videoId);
        return comment;
    }
    async findByVideoId(videoId) {
        return this.commentsRepository.findByVideoId(videoId);
    }
    async findById(id) {
        const comment = await this.commentsRepository.findById(id);
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        return comment;
    }
    async update(id, content, userId) {
        const comment = await this.findById(id);
        if (comment.userId !== userId) {
            throw new common_1.NotFoundException('Comment not found');
        }
        return this.commentsRepository.update(id, { content });
    }
    async delete(id, userId) {
        const comment = await this.findById(id);
        if (comment.userId !== userId) {
            throw new common_1.NotFoundException('Comment not found');
        }
        await this.commentsRepository.delete(id);
    }
    async createReply(data) {
        return this.commentRepliesRepository.create(data);
    }
    async getReplies(commentId) {
        return this.commentRepliesRepository.findByCommentId(commentId);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository,
        comment_replies_repository_1.CommentRepliesRepository,
        videos_repository_1.VideosRepository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map