import { PlaylistsRepository } from './repositories/playlists.repository';
import { PlaylistItemsRepository } from './repositories/playlist-items.repository';
import { Playlist } from './entities/playlist.entity';
export declare class PlaylistsService {
    private readonly playlistsRepository;
    private readonly playlistItemsRepository;
    constructor(playlistsRepository: PlaylistsRepository, playlistItemsRepository: PlaylistItemsRepository);
    create(data: {
        userId: string;
        name: string;
        description?: string;
        isPublic?: boolean;
    }): Promise<Playlist>;
    findById(id: string): Promise<Playlist>;
    findByUserId(userId: string): Promise<Playlist[]>;
    addVideo(playlistId: string, videoId: string): Promise<void>;
    removeVideo(playlistId: string, videoId: string): Promise<void>;
}
