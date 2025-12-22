import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { PlaylistItem } from './playlist-item.entity';

@Entity('playlists')
export class Playlist extends BaseEntity {
  @Column()
  @Index()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ nullable: true, length: 500 })
  thumbnailUrl: string | null;

  @Column({ type: 'boolean', default: true })
  isPublic: boolean;

  @Column({ type: 'int', default: 0 })
  videoCount: number;

  @OneToMany(() => PlaylistItem, (item) => item.playlist, { cascade: true })
  items: PlaylistItem[];
}

