/**
 * Domain Entity - User
 * Pure business logic, no database concerns
 */
export class UserDomain {
  private id: string;
  private clerkId: string;
  private username: string;
  private email: string;
  private avatarUrl: string | null;
  private bio: string | null;

  constructor(
    id: string,
    clerkId: string,
    username: string,
    email: string,
    avatarUrl?: string | null,
    bio?: string | null,
  ) {
    this.id = id;
    this.setClerkId(clerkId);
    this.setUsername(username);
    this.setEmail(email);
    this.avatarUrl = avatarUrl || null;
    this.setBio(bio);
  }

  // Domain method: Set Clerk ID with validation
  setClerkId(clerkId: string): void {
    if (!clerkId || clerkId.trim().length === 0) {
      throw new Error('Clerk ID is required');
    }
    this.clerkId = clerkId.trim();
  }

  // Domain method: Set username with validation
  setUsername(username: string): void {
    if (!username || username.trim().length === 0) {
      throw new Error('Username is required');
    }
    if (username.trim().length < 3) {
      throw new Error('Username must be at least 3 characters');
    }
    if (username.length > 100) {
      throw new Error('Username cannot exceed 100 characters');
    }
    this.username = username.trim();
  }

  // Domain method: Set email with validation
  setEmail(email: string): void {
    if (!email || email.trim().length === 0) {
      throw new Error('Email is required');
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    this.email = email.toLowerCase().trim();
  }

  // Domain method: Set bio with validation
  setBio(bio: string | null | undefined): void {
    if (bio && bio.length > 500) {
      throw new Error('Bio cannot exceed 500 characters');
    }
    this.bio = bio || null;
  }

  // Domain method: Set avatar URL
  setAvatarUrl(url: string | null): void {
    if (url && url.length > 500) {
      throw new Error('Avatar URL cannot exceed 500 characters');
    }
    this.avatarUrl = url;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getClerkId(): string {
    return this.clerkId;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getAvatarUrl(): string | null {
    return this.avatarUrl;
  }

  getBio(): string | null {
    return this.bio;
  }

  // Domain method: Validate entire entity
  validate(): void {
    if (!this.clerkId) {
      throw new Error('Clerk ID is required');
    }
    if (!this.username || this.username.length < 3) {
      throw new Error('Username is invalid');
    }
    if (!this.email) {
      throw new Error('Email is required');
    }
  }
}

