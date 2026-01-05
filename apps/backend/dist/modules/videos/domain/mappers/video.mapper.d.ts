import { Video as VideoEntity } from '../../entities/video.entity';
import { VideoDomain } from '../video.domain';
export declare class VideoMapper {
    static toDomain(entity: VideoEntity): VideoDomain;
    static toPersistence(domain: VideoDomain): Partial<VideoEntity>;
    static toDomainList(entities: VideoEntity[]): VideoDomain[];
    private static mapVisibilityToDomain;
    private static mapVisibilityToEntity;
    private static mapProcessingStatusToDomain;
    private static mapProcessingStatusToEntity;
}
