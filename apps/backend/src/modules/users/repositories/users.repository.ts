import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDomain } from '../domain/user.domain';
import { UserMapper } from '../domain/mappers/user.mapper';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  /**
   * Create user from domain entity
   */
  async create(domain: UserDomain): Promise<UserDomain> {
    const data = UserMapper.toPersistence(domain);
    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    return UserMapper.toDomain(saved);
  }

  async findById(id: string): Promise<UserDomain | null> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['channel'],
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByClerkId(clerkId: string): Promise<UserDomain | null> {
    const entity = await this.repository.findOne({
      where: { clerkId, deletedAt: IsNull() },
      relations: ['channel'],
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  /**
   * Update user from domain entity
   */
  async update(domain: UserDomain): Promise<UserDomain> {
    const data = UserMapper.toPersistence(domain);
    await this.repository.update(domain.getId(), data);
    const updated = await this.findById(domain.getId());
    if (!updated) {
      throw new Error('User not found after update');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
