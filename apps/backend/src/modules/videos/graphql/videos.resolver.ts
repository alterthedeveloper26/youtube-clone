import { Resolver, Query, Args } from '@nestjs/graphql';
import { VideosService } from '../videos.service';
import { Video, VideoConnection, VideoEdge, PageInfo } from './video.object';
import { GetVideosInput } from './get-videos.input';
import { VideoMapper } from '../domain/mappers/video.mapper';
import { CursorUtil } from '../../../shared/utils/cursor.util';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}

  @Query(() => VideoConnection, { name: 'videos' })
  async getVideos(
    @Args('input', { nullable: true }) input?: GetVideosInput,
  ): Promise<VideoConnection> {
    const result = await this.videosService.findAllWithCursor({
      first: input?.first,
      after: input?.after,
      last: input?.last,
      before: input?.before,
      search: input?.search,
      channelId: input?.channelId,
    });

    // Convert entities to domain and then to GraphQL
    const edges: VideoEdge[] = result.entities.map((entity) => {
      const videoDomain = VideoMapper.toDomain(entity);
      const video = videoDomain.toGraphQL() as Video;
      const cursor = CursorUtil.encode(entity.id, entity.createdAt);

      return {
        node: video,
        cursor,
      };
    });

    // Build pageInfo
    const pageInfo: PageInfo = {
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    };

    return {
      edges,
      pageInfo,
    };
  }
}
