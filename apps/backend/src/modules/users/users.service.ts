import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UserDomain } from './domain/user.domain';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Create user using domain entity
   */
  async create(data: {
    clerkId: string;
    username: string | null;
    email: string;
    avatarUrl?: string;
    firstName?: string | null;
    lastName?: string | null;
  }): Promise<UserDomain> {
    // Create domain entity (business rules applied in constructor)
    const userDomain = new UserDomain(
      uuidv4(), // Generate ID
      data.clerkId,
      data.username || null,
      data.email,
      data.avatarUrl,
      undefined, // bio
      data.firstName || null,
      data.lastName || null,
    );

    // Validate domain entity
    userDomain.validate();

    // Save through repository
    return this.usersRepository.create(userDomain);
  }

  async findById(id: string): Promise<UserDomain> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByClerkId(clerkId: string): Promise<UserDomain | null> {
    return this.usersRepository.findByClerkId(clerkId);
  }

  /**
   * Delete user by Clerk ID
   */
  async deleteByClerkId(clerkId: string): Promise<void> {
    const user = await this.findByClerkId(clerkId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.deleteByClerkId(clerkId);
  }

  /**
   * Update user using domain entity
   */
  async update(
    id: string,
    data: {
      username?: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string;
      avatarUrl?: string;
      bio?: string;
    },
  ): Promise<UserDomain> {
    // Get existing domain entity
    const user = await this.findById(id);

    // Update using domain methods (applies business rules)
    if (data.username !== undefined) {
      user.setUsername(data.username);
    }
    if (data.firstName !== undefined) {
      user.setFirstName(data.firstName);
    }
    if (data.lastName !== undefined) {
      user.setLastName(data.lastName);
    }
    if (data.email) {
      user.setEmail(data.email);
    }
    if (data.avatarUrl !== undefined) {
      user.setAvatarUrl(data.avatarUrl);
    }
    if (data.bio !== undefined) {
      user.setBio(data.bio);
    }

    // Validate domain entity
    user.validate();

    // Save through repository
    return this.usersRepository.update(user);
  }
}
