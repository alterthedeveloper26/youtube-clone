import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Channel } from '../../channels/entities/channel.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { VideoLike } from '../../likes/entities/video-like.entity';
import { VideoView } from '../../views/entities/video-view.entity';
import { PlaylistItem } from '../../playlists/entities/playlist-item.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';

export enum VideoVisibility {
  PUBLIC = 'public',
  UNLISTED = 'unlisted',
  PRIVATE = 'private',
}

export enum ProcessingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('videos')
export class Video extends BaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  channelId: string;

  @ManyToOne(() => Channel, (channel) => channel.videos)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 500 })
  videoUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  videoKey: string | null; // S3 key

  @Column({ type: 'varchar', length: 500, nullable: true })
  hls720pUrl: string | null; // 720p HLS URL

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnailUrl: string | null;

  @Column({ type: 'int', default: 0 })
  duration: number; // in seconds

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @Column({ type: 'int', default: 0 })
  dislikeCount: number;

  @Column({ type: 'int', default: 0 })
  commentCount: number;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({
    type: 'enum',
    enum: VideoVisibility,
    default: VideoVisibility.PUBLIC,
  })
  visibility: VideoVisibility;

  @Column({
    type: 'enum',
    enum: ProcessingStatus,
    default: ProcessingStatus.PENDING,
  })
  processingStatus: ProcessingStatus;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  @OneToMany(() => VideoLike, (like) => like.video)
  likes: VideoLike[];

  @OneToMany(() => VideoView, (view) => view.video)
  views: VideoView[];

  @OneToMany(() => PlaylistItem, (item) => item.video)
  playlistItems: PlaylistItem[];

  @ManyToMany(() => Category, (category) => category.videos)
  @JoinTable({
    name: 'video_categories',
    joinColumn: { name: 'videoId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ManyToMany(() => Tag, (tag) => tag.videos)
  @JoinTable({
    name: 'video_tags',
    joinColumn: { name: 'videoId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];
}

