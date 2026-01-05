import { PlaylistsService } from './playlists.service';
export declare class PlaylistsController {
    private readonly playlistsService;
    constructor(playlistsService: PlaylistsService);
    findByUser(userId: string): Promise<import("./entities/playlist.entity").Playlist[]>;
    findOne(id: string): Promise<import("./entities/playlist.entity").Playlist>;
    create(data: any): Promise<import("./entities/playlist.entity").Playlist>;
    addVideo(id: string, data: {
        videoId: string;
    }): Promise<{
        success: boolean;
    }>;
    removeVideo(id: string, videoId: string): Promise<{
        success: boolean;
    }>;
}
