import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { VideosModule } from './modules/videos/videos.module';
import { CommentsModule } from './modules/comments/comments.module';
import { LikesModule } from './modules/likes/likes.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { ViewsModule } from './modules/views/views.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    ChannelsModule,
    VideosModule,
    CommentsModule,
    LikesModule,
    SubscriptionsModule,
    PlaylistsModule,
    ViewsModule,
    CategoriesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
