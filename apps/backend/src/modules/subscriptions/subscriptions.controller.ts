import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('user/:userId')
  async getSubscriptions(@Param('userId') userId: string) {
    return this.subscriptionsService.getSubscriptions(userId);
  }

  @Post()
  async subscribe(@Body() data: { subscriberId: string; channelId: string }) {
    await this.subscriptionsService.subscribe(data.subscriberId, data.channelId);
    return { success: true };
  }

  @Delete()
  async unsubscribe(@Body() data: { subscriberId: string; channelId: string }) {
    await this.subscriptionsService.unsubscribe(data.subscriberId, data.channelId);
    return { success: true };
  }
}
