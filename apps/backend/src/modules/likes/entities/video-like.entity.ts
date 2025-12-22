import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';
import { User } from '../../users/entities/user.entity';

export enum LikeType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

@Entity('video_likes')
@Unique(['videoId', 'userId'])
export class VideoLike extends BaseEntity {
  @Column()
  @Index()
  videoId: string;

  @ManyToOne(() => Video, (video) => video.likes)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @Column()
  @Index()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: LikeType,
  })
  type: LikeType;
}

