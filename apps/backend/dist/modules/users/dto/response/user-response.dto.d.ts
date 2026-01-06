import { UserDomain } from '../../domain/user.domain';
export declare class UserResponseDto {
    id: string;
    clerkId: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    avatarUrl: string | null;
    bio: string | null;
    static fromDomain(user: UserDomain): UserResponseDto;
}
