import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelDomain } from './domain/channel.domain';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const channel = await this.channelsService.findById(id);
    // Convert domain entity to DTO for response
    return this.toDto(channel);
  }

  @Post()
  async create(@Body() data: any) {
    const channel = await this.channelsService.create(data);
    return this.toDto(channel);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const channel = await this.channelsService.update(id, data);
    return this.toDto(channel);
  }

  /**
   * Convert domain entity to DTO for API response
   */
  private toDto(domain: ChannelDomain) {
    return {
      id: domain.getId(),
      userId: domain.getUserId(),
      name: domain.getName(),
      handle: domain.getHandle(),
      description: domain.getDescription(),
      bannerUrl: domain.getBannerUrl(),
      avatarUrl: domain.getAvatarUrl(),
      subscriberCount: domain.getSubscriberCount(),
    };
  }
}
