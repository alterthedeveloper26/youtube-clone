import { Entity, Column, ManyToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Index()
  slug: string; // URL-friendly identifier

  @ManyToMany(() => Video, (video) => video.tags)
  videos: Video[];
}

