import { Entity, Column, ManyToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Video } from '../../videos/entities/video.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @Index()
  slug: string; // URL-friendly identifier

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToMany(() => Video, (video) => video.categories)
  videos: Video[];
}

