import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.repository.find({
      where: { deletedAt: null },
      order: { name: 'ASC' },
    });
  }

  async create(data: { name: string; slug: string; description?: string }) {
    return this.repository.save(data);
  }
}

