import { BaseDomain } from '../../../shared/domain/base.domain';
export declare class UserDomain extends BaseDomain {
    private clerkId;
    private username;
    private firstName;
    private lastName;
    private email;
    private avatarUrl;
    private bio;
    constructor(id: string, clerkId: string, username: string | null, email: string, avatarUrl?: string | null, bio?: string | null, firstName?: string | null, lastName?: string | null, createdAt?: Date, updatedAt?: Date, deletedAt?: Date | null);
    setClerkId(clerkId: string): void;
    setUsername(username: string | null | undefined): void;
    setEmail(email: string): void;
    setBio(bio: string | null | undefined): void;
    setAvatarUrl(url: string | null): void;
    setFirstName(firstName: string | null | undefined): void;
    setLastName(lastName: string | null | undefined): void;
    getClerkId(): string;
    getUsername(): string | null;
    getEmail(): string;
    getAvatarUrl(): string | null;
    getBio(): string | null;
    getFirstName(): string | null;
    getLastName(): string | null;
    validate(): void;
}
