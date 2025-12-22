import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';
import { User } from '../../users/entities/user.entity';
import { CommentReply } from './comment-reply.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column()
  @Index()
  videoId: string;

  @ManyToOne(() => Video, (video) => video.comments)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @Column()
  @Index()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @OneToMany(() => CommentReply, (reply) => reply.comment)
  replies: CommentReply[];
}

