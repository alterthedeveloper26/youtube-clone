import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
export declare class PlaylistsRepository {
    private readonly repository;
    constructor(repository: Repository<Playlist>);
    create(data: Partial<Playlist>): Promise<Playlist>;
    findById(id: string): Promise<Playlist | null>;
    findByUserId(userId: string): Promise<Playlist[]>;
    update(id: string, data: Partial<Playlist>): Promise<Playlist | null>;
    delete(id: string): Promise<void>;
    incrementVideoCount(id: string): Promise<void>;
    decrementVideoCount(id: string): Promise<void>;
}
