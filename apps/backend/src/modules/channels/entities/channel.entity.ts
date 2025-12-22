import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Video } from '../../videos/entities/video.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('channels')
export class Channel extends BaseEntity {
  @Column()
  @Index()
  userId: string;

  @ManyToOne(() => User, (user) => user.channel)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, unique: true })
  @Index()
  handle: string; // e.g., @username

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ nullable: true, length: 500 })
  bannerUrl: string | null;

  @Column({ nullable: true, length: 500 })
  avatarUrl: string | null;

  @Column({ type: 'int', default: 0 })
  subscriberCount: number;

  @OneToMany(() => Video, (video) => video.channel)
  videos: Video[];

  @OneToMany(() => Subscription, (subscription) => subscription.channel)
  subscriptions: Subscription[];
}

