import { Entity, Column, OneToOne, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Channel } from '../../channels/entities/channel.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  @Index()
  clerkId: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column({ nullable: true, length: 500 })
  avatarUrl: string | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @OneToOne(() => Channel, (channel) => channel.user)
  channel: Channel;
}

