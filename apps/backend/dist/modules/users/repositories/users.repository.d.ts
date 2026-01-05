import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDomain } from '../domain/user.domain';
export declare class UsersRepository {
    private readonly repository;
    constructor(repository: Repository<User>);
    create(domain: UserDomain): Promise<UserDomain>;
    findById(id: string): Promise<UserDomain | null>;
    findByClerkId(clerkId: string): Promise<UserDomain | null>;
    update(domain: UserDomain): Promise<UserDomain>;
    delete(id: string): Promise<void>;
}
