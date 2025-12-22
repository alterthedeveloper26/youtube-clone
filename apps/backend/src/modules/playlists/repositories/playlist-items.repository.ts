import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistItem } from '../entities/playlist-item.entity';

@Injectable()
export class PlaylistItemsRepository {
  constructor(
    @InjectRepository(PlaylistItem)
    private readonly repository: Repository<PlaylistItem>,
  ) {}

  async create(data: Partial<PlaylistItem>): Promise<PlaylistItem> {
    return this.repository.save(data);
  }

  async findByPlaylistId(playlistId: string): Promise<PlaylistItem[]> {
    return this.repository.find({
      where: { playlistId, deletedAt: null },
      relations: ['video', 'video.channel'],
      order: { position: 'ASC' },
    });
  }

  async findOne(
    playlistId: string,
    videoId: string,
  ): Promise<PlaylistItem | null> {
    return this.repository.findOne({
      where: { playlistId, videoId, deletedAt: null },
    });
  }

  async delete(playlistId: string, videoId: string): Promise<void> {
    await this.repository.softDelete({ playlistId, videoId });
  }

  async getMaxPosition(playlistId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('item')
      .select('MAX(item.position)', 'max')
      .where('item.playlistId = :playlistId', { playlistId })
      .getRawOne();
    return result?.max || 0;
  }
}
