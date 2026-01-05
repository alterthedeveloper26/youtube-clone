import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { name: 'ASC' },
    });
  }

  async create(data: { name: string; slug: string }) {
    return this.repository.save(data);
  }
}
