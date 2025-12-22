import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ViewsService } from './views.service';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  async recordView(@Body() data: any) {
    await this.viewsService.recordView(data);
    return { success: true };
  }

  @Get('user/:userId')
  async getHistory(@Param('userId') userId: string) {
    return this.viewsService.getHistory(userId);
  }
}

