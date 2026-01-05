import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';
export declare class Category extends BaseEntity {
    name: string;
    slug: string;
    description: string | null;
    videos: Video[];
}
