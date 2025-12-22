/**
 * Mapper: Converts between User Domain Entity and TypeORM Entity
 */
import { User as UserEntity } from '../../entities/user.entity';
import { UserDomain } from '../user.domain';

export class UserMapper {
  /**
   * Convert TypeORM entity to Domain entity
   */
  static toDomain(entity: UserEntity): UserDomain {
    return new UserDomain(
      entity.id,
      entity.clerkId,
      entity.username,
      entity.email,
      entity.avatarUrl,
      entity.bio,
    );
  }

  /**
   * Convert Domain entity to TypeORM entity data
   */
  static toPersistence(domain: UserDomain): Partial<UserEntity> {
    return {
      id: domain.getId(),
      clerkId: domain.getClerkId(),
      username: domain.getUsername(),
      email: domain.getEmail(),
      avatarUrl: domain.getAvatarUrl(),
      bio: domain.getBio(),
    };
  }

  /**
   * Convert multiple TypeORM entities to Domain entities
   */
  static toDomainList(entities: UserEntity[]): UserDomain[] {
    return entities.map((entity) => this.toDomain(entity));
  }
}

