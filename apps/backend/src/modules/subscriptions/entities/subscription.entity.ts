import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Channel } from '../../channels/entities/channel.entity';
import { User } from '../../users/entities/user.entity';

@Entity('subscriptions')
@Unique(['subscriberId', 'channelId'])
export class Subscription extends BaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  subscriberId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'subscriberId' })
  subscriber: User;

  @Column({ type: 'uuid' })
  @Index()
  channelId: string;

  @ManyToOne(() => Channel, (channel) => channel.subscriptions)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;
}

