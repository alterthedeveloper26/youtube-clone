"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const videos_controller_1 = require("./videos.controller");
const videos_service_1 = require("./videos.service");
const videos_repository_1 = require("./repositories/videos.repository");
const video_storage_service_1 = require("./services/video-storage.service");
const video_transcoding_service_1 = require("./services/video-transcoding.service");
const videos_resolver_1 = require("./graphql/videos.resolver");
const video_entity_1 = require("./entities/video.entity");
const aws_module_1 = require("../../shared/aws/aws.module");
const channels_module_1 = require("../channels/channels.module");
let VideosModule = class VideosModule {
};
exports.VideosModule = VideosModule;
exports.VideosModule = VideosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([video_entity_1.Video]),
            aws_module_1.AwsModule,
            channels_module_1.ChannelsModule,
        ],
        controllers: [videos_controller_1.VideosController],
        providers: [
            videos_service_1.VideosService,
            videos_repository_1.VideosRepository,
            video_storage_service_1.VideoStorageService,
            video_transcoding_service_1.VideoTranscodingService,
            videos_resolver_1.VideosResolver,
        ],
        exports: [videos_service_1.VideosService, videos_repository_1.VideosRepository],
    })
], VideosModule);
//# sourceMappingURL=videos.module.js.map