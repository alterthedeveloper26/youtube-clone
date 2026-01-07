import { Resolver, Query, Args } from '@nestjs/graphql';
import { VideosService } from '../videos.service';
import { Video, VideosListResponse } from './video.object';
import { GetVideosInput } from './get-videos.input';
import { VideoDomain } from '../domain/video.domain';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}

  @Query(() => VideosListResponse, { name: 'videos' })
  async getVideos(
    @Args('input', { nullable: true }) input?: GetVideosInput,
  ): Promise<VideosListResponse> {
    const result = await this.videosService.findAll({
      page: input?.page,
      limit: input?.limit,
      search: input?.search,
      channelId: input?.channelId,
    });

    return {
      data: result.data.map(
        (videoDomain: VideoDomain) => videoDomain.toGraphQL() as Video,
      ),
      meta: result.meta,
    };
  }
}
