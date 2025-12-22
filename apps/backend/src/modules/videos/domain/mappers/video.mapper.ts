/**
 * Mapper: Converts between Video Domain Entity and TypeORM Entity
 */
import { Video as VideoEntity, VideoVisibility, ProcessingStatus } from '../../entities/video.entity';
import { VideoDomain, VideoVisibility as DomainVisibility, ProcessingStatus as DomainProcessingStatus } from '../video.domain';

export class VideoMapper {
  /**
   * Convert TypeORM entity to Domain entity
   */
  static toDomain(entity: VideoEntity): VideoDomain {
    return new VideoDomain(
      entity.id,
      entity.channelId,
      entity.title,
      entity.videoUrl,
      entity.description,
      entity.videoKey,
      entity.hls720pUrl,
      entity.thumbnailUrl,
      entity.duration,
      entity.viewCount,
      entity.likeCount,
      entity.dislikeCount,
      entity.commentCount,
      entity.isPublished,
      this.mapVisibilityToDomain(entity.visibility),
      this.mapProcessingStatusToDomain(entity.processingStatus),
    );
  }

  /**
   * Convert Domain entity to TypeORM entity data
   */
  static toPersistence(domain: VideoDomain): Partial<VideoEntity> {
    return {
      id: domain.getId(),
      channelId: domain.getChannelId(),
      title: domain.getTitle(),
      description: domain.getDescription(),
      videoUrl: domain.getVideoUrl(),
      videoKey: domain.getVideoKey(),
      hls720pUrl: domain.getHls720pUrl(),
      thumbnailUrl: domain.getThumbnailUrl(),
      duration: domain.getDuration(),
      viewCount: domain.getViewCount(),
      likeCount: domain.getLikeCount(),
      dislikeCount: domain.getDislikeCount(),
      commentCount: domain.getCommentCount(),
      isPublished: domain.getIsPublished(),
      visibility: this.mapVisibilityToEntity(domain.getVisibility()),
      processingStatus: this.mapProcessingStatusToEntity(domain.getProcessingStatus()),
    };
  }

  /**
   * Convert multiple TypeORM entities to Domain entities
   */
  static toDomainList(entities: VideoEntity[]): VideoDomain[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  private static mapVisibilityToDomain(
    visibility: VideoVisibility,
  ): DomainVisibility {
    return visibility as DomainVisibility;
  }

  private static mapVisibilityToEntity(
    visibility: DomainVisibility,
  ): VideoVisibility {
    return visibility as VideoVisibility;
  }

  private static mapProcessingStatusToDomain(
    status: ProcessingStatus,
  ): DomainProcessingStatus {
    return status as DomainProcessingStatus;
  }

  private static mapProcessingStatusToEntity(
    status: DomainProcessingStatus,
  ): ProcessingStatus {
    return status as ProcessingStatus;
  }
}

