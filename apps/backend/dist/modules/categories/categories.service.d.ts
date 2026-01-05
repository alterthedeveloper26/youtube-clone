import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
export declare class CategoriesService {
    private readonly repository;
    constructor(repository: Repository<Category>);
    findAll(): Promise<Category[]>;
    create(data: {
        name: string;
        slug: string;
        description?: string;
    }): Promise<{
        name: string;
        slug: string;
        description?: string;
    } & Category>;
}
