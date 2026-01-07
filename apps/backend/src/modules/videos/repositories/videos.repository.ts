import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, IsNull, In } from 'typeorm';
import { Video } from '../entities/video.entity';
import { VideoDomain } from '../domain/video.domain';
import { VideoMapper } from '../domain/mappers/video.mapper';

@Injectable()
export class VideosRepository {
  constructor(
    @InjectRepository(Video)
    private readonly repository: Repository<Video>,
  ) {}

  /**
   * Create video from domain entity
   */
  async create(domain: VideoDomain): Promise<VideoDomain> {
    // Convert domain entity to persistence data
    const data = VideoMapper.toPersistence(domain);

    // Create TypeORM entity instance
    const entity = this.repository.create(data);

    // Save to database
    const saved = await this.repository.save(entity);

    // Convert back to domain entity
    return VideoMapper.toDomain(saved);
  }

  async findById(id: string): Promise<VideoDomain | null> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['channel', 'channel.user', 'categories', 'tags'],
    });

    return entity ? VideoMapper.toDomain(entity) : null;
  }

  async findMany(options: {
    where?: any;
    skip?: number;
    take?: number;
    orderBy?: any;
  }): Promise<VideoDomain[]> {
    const { where = {}, skip, take, orderBy } = options;
    const entities = await this.repository.find({
      where: { ...where, deletedAt: IsNull() },
      relations: ['channel', 'channel.user'],
      skip,
      take,
      order: orderBy || { createdAt: 'DESC' },
    });

    return VideoMapper.toDomainList(entities);
  }

  async count(where: any): Promise<number> {
    return this.repository.count({
      where: { ...where, deletedAt: IsNull() },
    });
  }

  /**
   * Update video from domain entity
   */
  async update(domain: VideoDomain): Promise<VideoDomain> {
    // Convert domain to persistence data
    const data = VideoMapper.toPersistence(domain);

    // Update in database
    await this.repository.update(domain.getId(), data);

    // Fetch updated entity
    const updated = await this.findById(domain.getId());
    if (!updated) {
      throw new Error('Video not found after update');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  /**
   * Increment view count (using domain entity)
   */
  async incrementViewCount(id: string): Promise<void> {
    const domain = await this.findById(id);
    if (!domain) {
      throw new Error('Video not found');
    }

    // Use domain method
    domain.incrementView();

    // Save updated domain
    await this.update(domain);
  }

  /**
   * Increment like count (using domain entity)
   */
  async incrementLikeCount(id: string): Promise<void> {
    const domain = await this.findById(id);
    if (!domain) {
      throw new Error('Video not found');
    }

    // Use domain method (includes business rule check)
    domain.incrementLike();

    // Save updated domain
    await this.update(domain);
  }

  /**
   * Decrement like count (using domain entity)
   */
  async decrementLikeCount(id: string): Promise<void> {
    const domain = await this.findById(id);
    if (!domain) {
      throw new Error('Video not found');
    }

    // Use domain method
    domain.decrementLike();

    // Save updated domain
    await this.update(domain);
  }

  /**
   * Increment dislike count (using domain entity)
   */
  async incrementDislikeCount(id: string): Promise<void> {
    const domain = await this.findById(id);
    if (!domain) {
      throw new Error('Video not found');
    }

    // Use domain method (includes business rule check)
    domain.incrementDislike();

    // Save updated domain
    await this.update(domain);
  }

  /**
   * Decrement dislike count (using domain entity)
   */
  async decrementDislikeCount(id: string): Promise<void> {
    const domain = await this.findById(id);
    if (!domain) {
      throw new Error('Video not found');
    }

    // Use domain method
    domain.decrementDislike();

    // Save updated domain
    await this.update(domain);
  }

  /**
   * Increment comment count (using domain entity)
   */
  async incrementCommentCount(id: string): Promise<void> {
    const domain = await this.findById(id);
    if (!domain) {
      throw new Error('Video not found');
    }

    // Use domain method
    domain.incrementComment();

    // Save updated domain
    await this.update(domain);
  }

  /**
   * Find entities directly (for GraphQL resolver to access timestamps)
   * Returns entities instead of domain objects
   */
  async findEntities(options: {
    where?: any;
    skip?: number;
    take?: number;
    orderBy?: any;
  }): Promise<Video[]> {
    const { where = {}, skip, take, orderBy } = options;
    return this.repository.find({
      where: { ...where, deletedAt: IsNull() },
      relations: ['channel', 'channel.user'],
      skip,
      take,
      order: orderBy || { createdAt: 'DESC' },
    });
  }
}
