import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ChannelsRepository } from './repositories/channels.repository';
import { ChannelDomain } from './domain/channel.domain';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChannelsService {
  constructor(private readonly channelsRepository: ChannelsRepository) {}

  /**
   * Create channel using domain entity
   */
  async create(data: {
    userId: string;
    name: string;
    handle: string;
    description?: string;
    bannerUrl?: string;
    avatarUrl?: string;
  }): Promise<ChannelDomain> {
    // Create domain entity first to get normalized handle
    // This will normalize and validate the handle
    const channelDomain = new ChannelDomain(
      uuidv4(), // Generate ID
      data.userId,
      data.name,
      data.handle, // Domain entity will normalize this
      data.description,
      data.bannerUrl,
      data.avatarUrl,
    );

    // Check if normalized handle is already taken
    const normalizedHandle = channelDomain.getHandle();
    const existing =
      await this.channelsRepository.findByHandle(normalizedHandle);
    if (existing) {
      throw new BadRequestException('Channel handle already exists');
    }

    // Validate domain entity
    channelDomain.validate();

    // Save through repository (converts to TypeORM entity, saves, converts back)
    return this.channelsRepository.create(channelDomain);
  }

  async findById(id: string): Promise<ChannelDomain> {
    const channel = await this.channelsRepository.findById(id);
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
    return channel;
  }

  async findByUserId(userId: string): Promise<ChannelDomain> {
    const channel = await this.channelsRepository.findByUserId(userId);
    if (!channel) {
      throw new NotFoundException('Channel not found for user');
    }
    return channel;
  }

  /**
   * Update channel using domain entity
   */
  async update(
    id: string,
    data: {
      name?: string;
      handle?: string;
      description?: string;
      bannerUrl?: string;
      avatarUrl?: string;
    },
  ): Promise<ChannelDomain> {
    // Get existing domain entity
    const channel = await this.findById(id);

    // Check business rule
    if (!channel.canBeUpdated()) {
      throw new BadRequestException('Channel cannot be updated');
    }

    // Update using domain methods (applies business rules)
    if (data.name) {
      channel.setName(data.name);
    }
    if (data.handle) {
      // Use domain's static method to normalize handle for uniqueness check
      const normalizedHandle = ChannelDomain.normalizeHandle(data.handle);

      // Check if new normalized handle is different and available
      if (normalizedHandle !== channel.getHandle()) {
        const existing =
          await this.channelsRepository.findByHandle(normalizedHandle);
        if (existing) {
          throw new BadRequestException('Channel handle already exists');
        }
        // Domain entity will normalize and validate
        channel.setHandle(data.handle);
      }
    }
    if (data.description !== undefined) {
      channel.setDescription(data.description);
    }
    if (data.bannerUrl !== undefined) {
      channel.setBannerUrl(data.bannerUrl);
    }
    if (data.avatarUrl !== undefined) {
      channel.setAvatarUrl(data.avatarUrl);
    }

    // Validate domain entity
    channel.validate();

    // Save through repository
    return this.channelsRepository.update(channel);
  }

  /**
   * Subscribe to channel (uses domain methods)
   */
  async subscribe(channelId: string): Promise<void> {
    const channel = await this.findById(channelId);
    channel.incrementSubscriberCount();
    await this.channelsRepository.update(channel);
  }

  /**
   * Unsubscribe from channel (uses domain methods)
   */
  async unsubscribe(channelId: string): Promise<void> {
    const channel = await this.findById(channelId);
    channel.decrementSubscriberCount();
    await this.channelsRepository.update(channel);
  }
}
