import { UsersRepository } from './repositories/users.repository';
import { UserDomain } from './domain/user.domain';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    create(data: {
        clerkId: string;
        username: string | null;
        email: string;
        avatarUrl?: string;
        firstName?: string | null;
        lastName?: string | null;
    }): Promise<UserDomain>;
    findById(id: string): Promise<UserDomain>;
    findByClerkId(clerkId: string): Promise<UserDomain | null>;
    deleteByClerkId(clerkId: string): Promise<void>;
    update(id: string, data: {
        username?: string;
        firstName?: string | null;
        lastName?: string | null;
        email?: string;
        avatarUrl?: string;
        bio?: string;
    }): Promise<UserDomain>;
}
