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
    );
  }

  /**
   * Convert Domain entity to TypeORM entity data
   */
  static toPersistence(domain: ChannelDomain): Partial<ChannelEntity> {
    // Convert branded types back to strings for persistence
    const bannerUrl = domain.getBannerUrl();
    const avatarUrl = domain.getAvatarUrl();

    return {
      id: domain.getId(),
      userId: domain.getUserId(),
      name: domain.getName(),
      handle: domain.getHandle(),
      description: domain.getDescription(),
      bannerUrl: bannerUrl as string | null,
      avatarUrl: avatarUrl as string | null,
      subscriberCount: domain.getSubscriberCount(),
    };
  }

  /**
   * Convert multiple TypeORM entities to Domain entities
   */
  static toDomainList(entities: ChannelEntity[]): ChannelDomain[] {
    return entities.map((entity) => this.toDomain(entity));
  }
}
