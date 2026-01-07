"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const users_module_1 = require("./modules/users/users.module");
const channels_module_1 = require("./modules/channels/channels.module");
const videos_module_1 = require("./modules/videos/videos.module");
const comments_module_1 = require("./modules/comments/comments.module");
const likes_module_1 = require("./modules/likes/likes.module");
const subscriptions_module_1 = require("./modules/subscriptions/subscriptions.module");
const playlists_module_1 = require("./modules/playlists/playlists.module");
const views_module_1 = require("./modules/views/views.module");
const categories_module_1 = require("./modules/categories/categories.module");
const tags_module_1 = require("./modules/tags/tags.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
                playground: true,
            }),
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            channels_module_1.ChannelsModule,
            videos_module_1.VideosModule,
            comments_module_1.CommentsModule,
            likes_module_1.LikesModule,
            subscriptions_module_1.SubscriptionsModule,
            playlists_module_1.PlaylistsModule,
            views_module_1.ViewsModule,
            categories_module_1.CategoriesModule,
            tags_module_1.TagsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map