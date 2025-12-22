import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('video/:videoId')
  async findByVideo(@Param('videoId') videoId: string) {
    return this.commentsService.findByVideoId(videoId);
  }

  @Post()
  async create(@Body() data: any) {
    return this.commentsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.commentsService.update(id, data.content, data.userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Body() data: any) {
    await this.commentsService.delete(id, data.userId);
  }

  @Post(':id/replies')
  async createReply(@Param('id') id: string, @Body() data: any) {
    return this.commentsService.createReply({
      commentId: id,
      userId: data.userId,
      content: data.content,
    });
  }

  @Get(':id/replies')
  async getReplies(@Param('id') id: string) {
    return this.commentsService.getReplies(id);
  }
}
