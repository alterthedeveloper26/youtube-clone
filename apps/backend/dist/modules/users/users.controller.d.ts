import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        clerkId: string;
        username: string;
        email: string;
        avatarUrl: string | null;
        bio: string | null;
    }>;
    findOne(id: string): Promise<import("./domain/user.domain").UserDomain>;
    update(id: string, data: any): Promise<import("./domain/user.domain").UserDomain>;
}
