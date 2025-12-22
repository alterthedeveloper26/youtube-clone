import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsRepository } from './repositories/subscriptions.repository';
import { Subscription } from './entities/subscription.entity';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), ChannelsModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsRepository],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
