import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Comment } from './comment.entity';
import { User } from '../../users/entities/user.entity';

@Entity('comment_replies')
export class CommentReply extends BaseEntity {
  @Column()
  @Index()
  commentId: string;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

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
}

