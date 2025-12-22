import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaylistsRepository } from './repositories/playlists.repository';
import { PlaylistItemsRepository } from './repositories/playlist-items.repository';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly playlistsRepository: PlaylistsRepository,
    private readonly playlistItemsRepository: PlaylistItemsRepository,
  ) {}

  async create(data: {
    userId: string;
    name: string;
    description?: string;
    isPublic?: boolean;
  }): Promise<Playlist> {
    return this.playlistsRepository.create(data);
  }

  async findById(id: string): Promise<Playlist> {
    const playlist = await this.playlistsRepository.findById(id);
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }
    return playlist;
  }

  async findByUserId(userId: string): Promise<Playlist[]> {
    return this.playlistsRepository.findByUserId(userId);
  }

  async addVideo(
    playlistId: string,
    videoId: string,
  ): Promise<void> {
    // Check if video already in playlist
    const existing = await this.playlistItemsRepository.findOne(
      playlistId,
      videoId,
    );
    if (existing) {
      return; // Already in playlist
    }

    const maxPosition = await this.playlistItemsRepository.getMaxPosition(
      playlistId,
    );

    await this.playlistItemsRepository.create({
      playlistId,
      videoId,
      position: maxPosition + 1,
    });

    await this.playlistsRepository.incrementVideoCount(playlistId);
  }

  async removeVideo(playlistId: string, videoId: string): Promise<void> {
    await this.playlistItemsRepository.delete(playlistId, videoId);
    await this.playlistsRepository.decrementVideoCount(playlistId);
  }
}
