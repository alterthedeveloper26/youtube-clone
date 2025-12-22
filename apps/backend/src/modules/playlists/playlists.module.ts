import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { PlaylistsRepository } from './repositories/playlists.repository';
import { PlaylistItemsRepository } from './repositories/playlist-items.repository';
import { Playlist } from './entities/playlist.entity';
import { PlaylistItem } from './entities/playlist-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, PlaylistItem])],
  controllers: [PlaylistsController],
  providers: [
    PlaylistsService,
    PlaylistsRepository,
    PlaylistItemsRepository,
  ],
  exports: [PlaylistsService],
})
export class PlaylistsModule {}
