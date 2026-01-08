import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, IsNull, In } from 'typeorm';
import { Video } from '../entities/video.entity';
import { VideoDomain } from '../domain/video.domain';
import { VideoMapper } from '../domain/mappers/video.mapper';
import { CursorUtil } from '../../../shared/utils/cursor.util';

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

  /**
   * Find entities with cursor-based pagination
   * Returns entities with cursor information
   */
  async findWithCursor(options: {
    where?: any;
    first?: number;
    after?: string;
    last?: number;
    before?: string;
    orderBy?: { [key: string]: 'ASC' | 'DESC' };
  }): Promise<{
    entities: Video[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const { where = {}, first, after, last, before, orderBy } = options;
    const order = orderBy || { createdAt: 'DESC' };
    const orderKey = Object.keys(order)[0];
    const orderDirection = order[orderKey];

    let queryBuilder = this.repository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.channel', 'channel')
      .leftJoinAndSelect('channel.user', 'user')
      .where('video.deletedAt IS NULL');

    // Apply additional where conditions
    if (where.isPublished !== undefined) {
      queryBuilder = queryBuilder.andWhere('video.isPublished = :isPublished', {
        isPublished: where.isPublished,
      });
    }
    if (where.visibility) {
      queryBuilder = queryBuilder.andWhere('video.visibility = :visibility', {
        visibility: where.visibility,
      });
    }
    if (where.title) {
      queryBuilder = queryBuilder.andWhere('video.title LIKE :title', {
        title: `%${where.title}%`,
      });
    }
    if (where.channelId) {
      queryBuilder = queryBuilder.andWhere('video.channelId = :channelId', {
        channelId: where.channelId,
      });
    }

    // Handle cursor-based pagination
    if (first && after) {
      // Forward pagination: get items after cursor
      const decoded = CursorUtil.decode(after);
      if (decoded) {
        if (orderDirection === 'DESC') {
          queryBuilder = queryBuilder.andWhere(
            `(video.${orderKey} < :cursorValue OR (video.${orderKey} = :cursorValue AND video.id < :cursorId))`,
            {
              cursorValue: decoded.timestamp,
              cursorId: decoded.id,
            },
          );
        } else {
          queryBuilder = queryBuilder.andWhere(
            `(video.${orderKey} > :cursorValue OR (video.${orderKey} = :cursorValue AND video.id > :cursorId))`,
            {
              cursorValue: decoded.timestamp,
              cursorId: decoded.id,
            },
          );
        }
      }
      queryBuilder = queryBuilder
        .orderBy(`video.${orderKey}`, orderDirection)
        .addOrderBy('video.id', orderDirection)
        .limit(first + 1); // Fetch one extra to check if there's a next page
    } else if (last && before) {
      // Backward pagination: get items before cursor
      const decoded = CursorUtil.decode(before);
      if (decoded) {
        if (orderDirection === 'DESC') {
          queryBuilder = queryBuilder.andWhere(
            `(video.${orderKey} > :cursorValue OR (video.${orderKey} = :cursorValue AND video.id > :cursorId))`,
            {
              cursorValue: decoded.timestamp,
              cursorId: decoded.id,
            },
          );
        } else {
          queryBuilder = queryBuilder.andWhere(
            `(video.${orderKey} < :cursorValue OR (video.${orderKey} = :cursorValue AND video.id < :cursorId))`,
            {
              cursorValue: decoded.timestamp,
              cursorId: decoded.id,
            },
          );
        }
      }
      queryBuilder = queryBuilder
        .orderBy(`video.${orderKey}`, orderDirection === 'DESC' ? 'ASC' : 'DESC')
        .addOrderBy('video.id', orderDirection === 'DESC' ? 'ASC' : 'DESC')
        .limit(last + 1); // Fetch one extra to check if there's a previous page
    } else if (first) {
      // First page: no cursor
      queryBuilder = queryBuilder
        .orderBy(`video.${orderKey}`, orderDirection)
        .addOrderBy('video.id', orderDirection)
        .limit(first + 1);
    } else if (last) {
      // Last page: no cursor (reverse order)
      queryBuilder = queryBuilder
        .orderBy(`video.${orderKey}`, orderDirection === 'DESC' ? 'ASC' : 'DESC')
        .addOrderBy('video.id', orderDirection === 'DESC' ? 'ASC' : 'DESC')
        .limit(last + 1);
    }

    const entities = await queryBuilder.getMany();

    // Reverse if backward pagination
    if (last && before) {
      entities.reverse();
    }

    // Determine pagination info
    let hasNextPage = false;
    let hasPreviousPage = false;

    if (first) {
      hasNextPage = entities.length > first;
      if (hasNextPage) {
        entities.pop(); // Remove the extra item
      }
      hasPreviousPage = !!after;
    } else if (last) {
      hasPreviousPage = entities.length > last;
      if (hasPreviousPage) {
        entities.pop(); // Remove the extra item
      }
      hasNextPage = !!before;
    }

    return {
      entities,
      hasNextPage,
      hasPreviousPage,
    };
  }
}
