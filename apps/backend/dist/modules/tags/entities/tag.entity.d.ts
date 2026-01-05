import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';
export declare class Tag extends BaseEntity {
    name: string;
    slug: string;
    videos: Video[];
}
