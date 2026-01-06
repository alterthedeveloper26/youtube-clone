import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * Typically called from webhook when user is created in Clerk
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create({
      clerkId: createUserDto.clerkId,
      username: createUserDto.username || null,
      email: createUserDto.email || '',
      avatarUrl: createUserDto.avatarUrl,
      firstName: createUserDto.firstName || null,
      lastName: createUserDto.lastName || null,
    });

    return UserResponseDto.fromDomain(user);
  }

  @Get('clerk/:clerkId')
  async findByClerkId(
    @Param('clerkId') clerkId: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findByClerkId(clerkId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserResponseDto.fromDomain(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    return UserResponseDto.fromDomain(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return UserResponseDto.fromDomain(user);
  }

  /**
   * Delete user by Clerk ID
   */
  @Delete('clerk/:clerkId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByClerkId(@Param('clerkId') clerkId: string): Promise<void> {
    await this.usersService.deleteByClerkId(clerkId);
  }
}
