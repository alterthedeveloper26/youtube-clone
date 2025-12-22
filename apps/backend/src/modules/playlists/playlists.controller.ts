import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.playlistsService.findByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playlistsService.findById(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.playlistsService.create(data);
  }

  @Post(':id/videos')
  async addVideo(@Param('id') id: string, @Body() data: { videoId: string }) {
    await this.playlistsService.addVideo(id, data.videoId);
    return { success: true };
  }

  @Delete(':id/videos/:videoId')
  async removeVideo(@Param('id') id: string, @Param('videoId') videoId: string) {
    await this.playlistsService.removeVideo(id, videoId);
    return { success: true };
  }
}
