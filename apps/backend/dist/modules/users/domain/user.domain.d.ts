export declare class UserDomain {
    private id;
    private clerkId;
    private username;
    private email;
    private avatarUrl;
    private bio;
    constructor(id: string, clerkId: string, username: string, email: string, avatarUrl?: string | null, bio?: string | null);
    setClerkId(clerkId: string): void;
    setUsername(username: string): void;
    setEmail(email: string): void;
    setBio(bio: string | null | undefined): void;
    setAvatarUrl(url: string | null): void;
    getId(): string;
    getClerkId(): string;
    getUsername(): string;
    getEmail(): string;
    getAvatarUrl(): string | null;
    getBio(): string | null;
    validate(): void;
}
