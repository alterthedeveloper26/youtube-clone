import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';
import { VideoDomain } from '../domain/video.domain';
export declare class VideosRepository {
    private readonly repository;
    constructor(repository: Repository<Video>);
    create(domain: VideoDomain): Promise<VideoDomain>;
    findById(id: string): Promise<VideoDomain | null>;
    findMany(options: {
        where?: any;
        skip?: number;
        take?: number;
        orderBy?: any;
    }): Promise<VideoDomain[]>;
    count(where: any): Promise<number>;
    update(domain: VideoDomain): Promise<VideoDomain>;
    delete(id: string): Promise<void>;
    incrementViewCount(id: string): Promise<void>;
    incrementLikeCount(id: string): Promise<void>;
    decrementLikeCount(id: string): Promise<void>;
    incrementDislikeCount(id: string): Promise<void>;
    decrementDislikeCount(id: string): Promise<void>;
    incrementCommentCount(id: string): Promise<void>;
    findEntities(options: {
        where?: any;
        skip?: number;
        take?: number;
        orderBy?: any;
    }): Promise<Video[]>;
}
