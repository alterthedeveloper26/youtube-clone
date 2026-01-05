import { Injectable, BadRequestException } from '@nestjs/common';
import { SubscriptionsRepository } from './repositories/subscriptions.repository';
import { ChannelsRepository } from '../channels/repositories/channels.repository';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
    private readonly channelsRepository: ChannelsRepository,
  ) {}

  async subscribe(subscriberId: string, channelId: string): Promise<void> {
    // Check if already subscribed
    const existing = await this.subscriptionsRepository.findOne(
      subscriberId,
      channelId,
    );
    if (existing) {
      throw new BadRequestException('Already subscribed to this channel');
    }

    // Check if trying to subscribe to own channel
    const channel = await this.channelsRepository.findById(channelId);
    if (channel?.getUserId() === subscriberId) {
      throw new BadRequestException('Cannot subscribe to your own channel');
    }

    await this.subscriptionsRepository.create({ subscriberId, channelId });
    await this.channelsRepository.incrementSubscriberCount(channelId);
  }

  async unsubscribe(subscriberId: string, channelId: string): Promise<void> {
    await this.subscriptionsRepository.delete(subscriberId, channelId);
    await this.channelsRepository.decrementSubscriberCount(channelId);
  }

  async getSubscriptions(subscriberId: string) {
    return this.subscriptionsRepository.findBySubscriber(subscriberId);
  }
}
