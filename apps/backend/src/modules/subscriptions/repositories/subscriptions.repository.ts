import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';

@Injectable()
export class SubscriptionsRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: Repository<Subscription>,
  ) {}

  async create(data: {
    subscriberId: string;
    channelId: string;
  }): Promise<Subscription> {
    return this.repository.save(data);
  }

  async findBySubscriber(subscriberId: string): Promise<Subscription[]> {
    return this.repository.find({
      where: { subscriberId, deletedAt: IsNull() },
      relations: ['channel', 'channel.user'],
    });
  }

  async findByChannel(channelId: string): Promise<Subscription[]> {
    return this.repository.find({
      where: { channelId, deletedAt: IsNull() },
      relations: ['subscriber'],
    });
  }

  async findOne(
    subscriberId: string,
    channelId: string,
  ): Promise<Subscription | null> {
    return this.repository.findOne({
      where: { subscriberId, channelId, deletedAt: IsNull() },
    });
  }

  async delete(subscriberId: string, channelId: string): Promise<void> {
    await this.repository.softDelete({ subscriberId, channelId });
  }
}
