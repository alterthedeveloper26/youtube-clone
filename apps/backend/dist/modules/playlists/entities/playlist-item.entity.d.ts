import { BaseEntity } from '../../../shared/entities/base.entity';
import { Playlist } from './playlist.entity';
import { Video } from '../../videos/entities/video.entity';
export declare class PlaylistItem extends BaseEntity {
    playlistId: string;
    playlist: Playlist;
    videoId: string;
    video: Video;
    position: number;
}
