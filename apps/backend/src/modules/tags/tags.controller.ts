import { Controller, Get, Post, Body } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  async create(@Body() data: any) {
    return this.tagsService.create(data);
  }
}

