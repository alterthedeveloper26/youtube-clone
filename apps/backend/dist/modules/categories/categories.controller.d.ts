import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    create(data: any): Promise<{
        name: string;
        slug: string;
        description?: string;
    } & import("./entities/category.entity").Category>;
}
