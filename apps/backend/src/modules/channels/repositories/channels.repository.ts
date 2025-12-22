import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Channel } from '../entities/channel.entity';
import { ChannelDomain } from '../domain/channel.domain';
import { ChannelMapper } from '../domain/mappers/channel.mapper';

@Injectable()
export class ChannelsRepository {
  constructor(
    @InjectRepository(Channel)
    private readonly repository: Repository<Channel>,
  ) {}

  /**
   * Create channel from domain entity
   * Domain entity is converted to TypeORM entity, then saved
   */
  async create(domain: ChannelDomain): Promise<ChannelDomain> {
    // Convert domain entity to persistence data
    const data = ChannelMapper.toPersistence(domain);

    // Create TypeORM entity instance
    const entity = this.repository.create(data);

    // Save to database
    const saved = await this.repository.save(entity);

    // Convert back to domain entity
    return ChannelMapper.toDomain(saved);
  }

  async findById(id: string): Promise<ChannelDomain | null> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['user', 'videos'],
    });

    return entity ? ChannelMapper.toDomain(entity) : null;
  }

  async findByUserId(userId: string): Promise<ChannelDomain | null> {
    const entity = await this.repository.findOne({
      where: { userId, deletedAt: IsNull() },
      relations: ['user'],
    });

    return entity ? ChannelMapper.toDomain(entity) : null;
  }

  async findByHandle(handle: string): Promise<ChannelDomain | null> {
    const entity = await this.repository.findOne({
      where: { handle, deletedAt: IsNull() },
      relations: ['user'],
    });

    return entity ? ChannelMapper.toDomain(entity) : null;
  }

  /**
   * Update channel from domain entity
   */
  async update(domain: ChannelDomain): Promise<ChannelDomain> {
    // Convert domain to persistence data
    const data = ChannelMapper.toPersistence(domain);

    // Update in database
    await this.repository.update(domain.getId(), data);

    // Fetch updated entity
    const updated = await this.findById(domain.getId());
    if (!updated) {
      throw new Error('Channel not found after update');
    }
    return updated;
  }

  /**
   * Increment subscriber count (using domain entity)
   */
  async incrementSubscriberCount(id: string): Promise<void> {
    const domain = await this.findById(id);
    if (!domain) {
      throw new Error('Channel not found');
    }

    // Use domain method
    domain.incrementSubscriberCount();

    // Save updated domain
    await this.update(domain);
  }

  /**
   * Decrement subscriber count (using domain entity)
   */
  async decrementSubscriberCount(id: string): Promise<void> {
    const domain = await this.findById(id);
    if (!domain) {
      throw new Error('Channel not found');
    }

    // Use domain method
    domain.decrementSubscriberCount();

    // Save updated domain
    await this.update(domain);
  }
}
