/**
 * Domain Entity - User
 * Pure business logic, no database concerns
 */
export class UserDomain {
  private id: string;
  private clerkId: string;
  private username: string | null;
  private firstName: string | null;
  private lastName: string | null;
  private email: string;
  private avatarUrl: string | null;
  private bio: string | null;

  constructor(
    id: string,
    clerkId: string,
    username: string | null,
    email: string,
    avatarUrl?: string | null,
    bio?: string | null,
    firstName?: string | null,
    lastName?: string | null,
  ) {
    this.id = id;
    this.setClerkId(clerkId);
    this.setUsername(username);
    this.setEmail(email);
    this.avatarUrl = avatarUrl || null;
    this.setBio(bio);
    this.setFirstName(firstName);
    this.setLastName(lastName);
  }

  // Domain method: Set Clerk ID with validation
  setClerkId(clerkId: string): void {
    if (!clerkId || clerkId.trim().length === 0) {
      throw new Error('Clerk ID is required');
    }
    this.clerkId = clerkId.trim();
  }

  // Domain method: Set username with validation
  setUsername(username: string | null | undefined): void {
    if (
      username === null ||
      username === undefined ||
      username.trim().length === 0
    ) {
      this.username = null;
      return;
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

  // Domain method: Set first name with validation
  setFirstName(firstName: string | null | undefined): void {
    if (
      firstName === null ||
      firstName === undefined ||
      firstName.trim().length === 0
    ) {
      this.firstName = null;
      return;
    }
    if (firstName.length > 100) {
      throw new Error('First name cannot exceed 100 characters');
    }
    this.firstName = firstName.trim();
  }

  // Domain method: Set last name with validation
  setLastName(lastName: string | null | undefined): void {
    if (
      lastName === null ||
      lastName === undefined ||
      lastName.trim().length === 0
    ) {
      this.lastName = null;
      return;
    }
    if (lastName.length > 100) {
      throw new Error('Last name cannot exceed 100 characters');
    }
    this.lastName = lastName.trim();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getClerkId(): string {
    return this.clerkId;
  }

  getUsername(): string | null {
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

  getFirstName(): string | null {
    return this.firstName;
  }

  getLastName(): string | null {
    return this.lastName;
  }

  // Domain method: Validate entire entity
  validate(): void {
    if (!this.clerkId) {
      throw new Error('Clerk ID is required');
    }
    // Username is optional, but if provided, must be valid
    if (this.username !== null && this.username.length < 3) {
      throw new Error('Username must be at least 3 characters if provided');
    }
    if (!this.email) {
      throw new Error('Email is required');
    }
  }
}
