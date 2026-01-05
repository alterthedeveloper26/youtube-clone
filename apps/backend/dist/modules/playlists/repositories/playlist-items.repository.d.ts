import { Repository } from 'typeorm';
import { PlaylistItem } from '../entities/playlist-item.entity';
export declare class PlaylistItemsRepository {
    private readonly repository;
    constructor(repository: Repository<PlaylistItem>);
    create(data: Partial<PlaylistItem>): Promise<PlaylistItem>;
    findByPlaylistId(playlistId: string): Promise<PlaylistItem[]>;
    findOne(playlistId: string, videoId: string): Promise<PlaylistItem | null>;
    delete(playlistId: string, videoId: string): Promise<void>;
    getMaxPosition(playlistId: string): Promise<number>;
}
