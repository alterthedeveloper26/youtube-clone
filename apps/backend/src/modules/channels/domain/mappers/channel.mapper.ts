/**
 * Mapper: Converts between Domain Entity and TypeORM Entity
 * Separates domain layer from infrastructure layer
 */
import { Channel as ChannelEntity } from '../../entities/channel.entity';
import { ChannelDomain } from '../channel.domain';
import { BannerUrl, AvatarUrl } from '../types/url.types';

export class ChannelMapper {
  /**
   * Convert TypeORM entity to Domain entity
   */
  static toDomain(entity: ChannelEntity): ChannelDomain {
    return new ChannelDomain(
      entity.id,
      entity.userId,
      entity.name,
      entity.handle,
      entity.description,
      entity.bannerUrl,
      entity.avatarUrl,
      entity.subscriberCount,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  /**
   * Convert Domain entity to TypeORM entity data
   * Note: id, createdAt, updatedAt, deletedAt are managed by database
   */
  static toPersistence(domain: ChannelDomain): Partial<ChannelEntity> {
    // Convert branded types back to strings for persistence
    const bannerUrl = domain.getBannerUrl();
    const avatarUrl = domain.getAvatarUrl();

    return {
      // id is included for updates, but createdAt/updatedAt/deletedAt are managed by DB
      id: domain.getId(),
      userId: domain.getUserId(),
      name: domain.getName(),
      handle: domain.getHandle(),
      description: domain.getDescription(),
      bannerUrl: bannerUrl as string | null,
      avatarUrl: avatarUrl as string | null,
      subscriberCount: domain.getSubscriberCount(),
      // createdAt, updatedAt, deletedAt are NOT included - managed by database
    };
  }

  /**
   * Convert multiple TypeORM entities to Domain entities
   */
  static toDomainList(entities: ChannelEntity[]): ChannelDomain[] {
    return entities.map((entity) => this.toDomain(entity));
  }
}
