import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';

@Injectable()
export class PlaylistsRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly repository: Repository<Playlist>,
  ) {}

  async create(data: Partial<Playlist>): Promise<Playlist> {
    return this.repository.save(data);
  }

  async findById(id: string): Promise<Playlist | null> {
    return this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['user', 'items', 'items.video', 'items.video.channel'],
    });
  }

  async findByUserId(userId: string): Promise<Playlist[]> {
    return this.repository.find({
      where: { userId, deletedAt: IsNull() },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, data: Partial<Playlist>): Promise<Playlist | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async incrementVideoCount(id: string): Promise<void> {
    await this.repository.increment({ id }, 'videoCount', 1);
  }

  async decrementVideoCount(id: string): Promise<void> {
    await this.repository.decrement({ id }, 'videoCount', 1);
  }
}
