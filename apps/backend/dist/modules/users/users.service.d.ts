import { UsersRepository } from './repositories/users.repository';
import { UserDomain } from './domain/user.domain';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    create(data: {
        clerkId: string;
        username: string;
        email: string;
        avatarUrl?: string;
    }): Promise<UserDomain>;
    findById(id: string): Promise<UserDomain>;
    findByClerkId(clerkId: string): Promise<UserDomain | null>;
    update(id: string, data: {
        username?: string;
        email?: string;
        avatarUrl?: string;
        bio?: string;
    }): Promise<UserDomain>;
}
