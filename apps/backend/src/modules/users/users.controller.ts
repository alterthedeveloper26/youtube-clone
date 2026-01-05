import { Controller, Get, Post, Param, Patch, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * Typically called from webhook when user is created in Clerk
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create({
      clerkId: createUserDto.clerkId,
      username: createUserDto.username || '',
      email: createUserDto.email || '',
      avatarUrl: createUserDto.avatarUrl,
    });
    
    // Return domain entity as DTO
    return {
      id: user.getId(),
      clerkId: user.getClerkId(),
      username: user.getUsername(),
      email: user.getEmail(),
      avatarUrl: user.getAvatarUrl(),
      bio: user.getBio(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(id, data);
  }
}
