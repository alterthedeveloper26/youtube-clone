import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { PlaylistItem } from './playlist-item.entity';
export declare class Playlist extends BaseEntity {
    userId: string;
    user: User;
    name: string;
    description: string | null;
    thumbnailUrl: string | null;
    isPublic: boolean;
    videoCount: number;
    items: PlaylistItem[];
}
