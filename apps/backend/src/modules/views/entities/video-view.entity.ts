import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';
import { User } from '../../users/entities/user.entity';

@Entity('video_views')
export class VideoView extends BaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  videoId: string;

  @ManyToOne(() => Video, (video) => video.views)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  userId: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null; // For anonymous views

  @Column({ type: 'int', default: 0 })
  watchTime: number; // seconds watched

  @Column({ type: 'boolean', default: false })
  completed: boolean; // Whether video was watched to completion
}
