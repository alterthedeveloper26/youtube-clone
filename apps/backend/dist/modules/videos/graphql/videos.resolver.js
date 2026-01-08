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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const videos_service_1 = require("../videos.service");
const video_object_1 = require("./video.object");
const get_videos_input_1 = require("./get-videos.input");
const video_mapper_1 = require("../domain/mappers/video.mapper");
const cursor_util_1 = require("../../../shared/utils/cursor.util");
let VideosResolver = class VideosResolver {
    videosService;
    constructor(videosService) {
        this.videosService = videosService;
    }
    async getVideos(input) {
        const result = await this.videosService.findAllWithCursor({
            first: input?.first,
            after: input?.after,
            last: input?.last,
            before: input?.before,
            search: input?.search,
            channelId: input?.channelId,
        });
        const edges = result.entities.map((entity) => {
            const videoDomain = video_mapper_1.VideoMapper.toDomain(entity);
            const video = videoDomain.toGraphQL();
            const cursor = cursor_util_1.CursorUtil.encode(entity.id, entity.createdAt);
            return {
                node: video,
                cursor,
            };
        });
        const pageInfo = {
            hasNextPage: result.hasNextPage,
            hasPreviousPage: result.hasPreviousPage,
            startCursor: edges.length > 0 ? edges[0].cursor : null,
            endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        };
        return {
            edges,
            pageInfo,
        };
    }
};
exports.VideosResolver = VideosResolver;
__decorate([
    (0, graphql_1.Query)(() => video_object_1.VideoConnection, { name: 'videos' }),
    __param(0, (0, graphql_1.Args)('input', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_videos_input_1.GetVideosInput]),
    __metadata("design:returntype", Promise)
], VideosResolver.prototype, "getVideos", null);
exports.VideosResolver = VideosResolver = __decorate([
    (0, graphql_1.Resolver)(() => video_object_1.Video),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosResolver);
//# sourceMappingURL=videos.resolver.js.map