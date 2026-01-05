import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
export declare class TagsService {
    private readonly repository;
    constructor(repository: Repository<Tag>);
    findAll(): Promise<Tag[]>;
    create(data: {
        name: string;
        slug: string;
    }): Promise<{
        name: string;
        slug: string;
    } & Tag>;
}
