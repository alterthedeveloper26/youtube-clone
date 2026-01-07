import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { RequestUploadUrlDto } from './dto/request-upload-url.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';
import { GetVideosQueryDto } from './dto/get-videos-query.dto';
// TODO: Uncomment when auth is set up
// import { AuthGuard } from '../../common/guards/auth.guard';
// import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  /**
   * Step 1: Request presigned URL for upload
   * TODO: Add @UseGuards(AuthGuard) when auth is ready
   */
  @Post('upload/request')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  async requestUploadUrl(
    @Body() dto: RequestUploadUrlDto,
    // @CurrentUser() userId: string, // TODO: Uncomment when auth is ready
  ) {
    // TODO: Replace with actual userId from auth
    const userId = 'temp-user-id';
    return this.videosService.requestUploadUrl(dto, userId);
  }

  /**
   * Step 2: Confirm upload and create video record
   * TODO: Add @UseGuards(AuthGuard) when auth is ready
   */
  @Post('upload/complete')
  // @UseGuards(AuthGuard)
  async completeUpload(
    @Body() dto: CompleteUploadDto,
    // @CurrentUser() userId: string, // TODO: Uncomment when auth is ready
  ) {
    // TODO: Replace with actual userId from auth
    const userId = 'temp-user-id';
    return this.videosService.completeUpload(dto, userId);
  }

  /**
   * Get all videos with pagination
   */
  @Get()
  async findAll(@Query() query: GetVideosQueryDto) {
    return this.videosService.findAll(query);
  }

  /**
   * Get video with streaming URL
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }
}
