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
      entity.firstName,
      entity.lastName,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  /**
   * Convert Domain entity to TypeORM entity data
   * Note: id, createdAt, updatedAt, deletedAt are managed by database
   */
  static toPersistence(domain: UserDomain): Partial<UserEntity> {
    return {
      // id is included for updates, but createdAt/updatedAt/deletedAt are managed by DB
      id: domain.getId(),
      clerkId: domain.getClerkId(),
      username: domain.getUsername(),
      firstName: domain.getFirstName(),
      lastName: domain.getLastName(),
      email: domain.getEmail(),
      avatarUrl: domain.getAvatarUrl(),
      bio: domain.getBio(),
      // createdAt, updatedAt, deletedAt are NOT included - managed by database
    };
  }

  /**
   * Convert multiple TypeORM entities to Domain entities
   */
  static toDomainList(entities: UserEntity[]): UserDomain[] {
    return entities.map((entity) => this.toDomain(entity));
  }
}
