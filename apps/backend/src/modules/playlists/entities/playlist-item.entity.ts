import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Playlist } from './playlist.entity';
import { Video } from '../../videos/entities/video.entity';

@Entity('playlist_items')
@Unique(['playlistId', 'videoId'])
export class PlaylistItem extends BaseEntity {
  @Column()
  @Index()
  playlistId: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.items)
  @JoinColumn({ name: 'playlistId' })
  playlist: Playlist;

  @Column()
  @Index()
  videoId: string;

  @ManyToOne(() => Video, (video) => video.playlistItems)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @Column({ type: 'int', default: 0 })
  position: number; // Order in playlist
}

