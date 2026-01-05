import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    findAll(): Promise<import("./entities/tag.entity").Tag[]>;
    create(data: any): Promise<{
        name: string;
        slug: string;
    } & import("./entities/tag.entity").Tag>;
}
