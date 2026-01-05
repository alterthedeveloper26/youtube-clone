import { Entity, Column, OneToOne, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Channel } from '../../channels/entities/channel.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  @Index()
  clerkId: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @OneToOne(() => Channel, (channel) => channel.user)
  channel: Channel;
}

