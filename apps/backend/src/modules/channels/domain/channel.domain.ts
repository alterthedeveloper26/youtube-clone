/**
 * Domain Entity - Pure business logic
 * No TypeORM decorators, no database concerns
 * Contains business rules and validation
 */
import { BaseDomain } from '../../../shared/domain/base.domain';
import {
  BannerUrl,
  AvatarUrl,
  createBannerUrl,
  createAvatarUrl,
} from './types/url.types';

export class ChannelDomain extends BaseDomain {
  private userId: string;
  private name: string;
  private handle: string;
  private description: string | null;
  private bannerUrl: BannerUrl | null;
  private avatarUrl: AvatarUrl | null;
  private subscriberCount: number;

  constructor(
    id: string,
    userId: string,
    name: string,
    handle: string,
    description?: string | null,
    bannerUrl?: string | null,
    avatarUrl?: string | null,
    subscriberCount: number = 0,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    deletedAt: Date | null = null,
  ) {
    // Validate and set properties
    super(id, createdAt, updatedAt, deletedAt);
    this.userId = userId;
    this.setName(name);
    this.setHandle(handle);
    this.description = description || null;
    this.bannerUrl = createBannerUrl(bannerUrl);
    this.avatarUrl = createAvatarUrl(avatarUrl);
    this.subscriberCount = subscriberCount;
  }

  // Domain method: Set name with validation
  setName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Channel name is required');
    }
    if (name.trim().length < 3) {
      throw new Error('Channel name must be at least 3 characters');
    }
    if (name.length > 100) {
      throw new Error('Channel name cannot exceed 100 characters');
    }
    this.name = name.trim();
    // Note: updatedAt is managed by database
  }

  // Domain method: Set handle with validation and normalization
  setHandle(handle: string): void {
    if (!handle || handle.trim().length === 0) {
      throw new Error('Channel handle is required');
    }

    // Normalize handle
    let normalizedHandle = handle.trim().toLowerCase();

    // Ensure it starts with @
    if (!normalizedHandle.startsWith('@')) {
      normalizedHandle = `@${normalizedHandle}`;
    }

    // Remove @ for validation
    const handleWithoutAt = normalizedHandle.slice(1);

    // Validate handle format
    if (handleWithoutAt.length < 3) {
      throw new Error(
        'Channel handle must be at least 3 characters (excluding @)',
      );
    }
    if (handleWithoutAt.length > 50) {
      throw new Error(
        'Channel handle cannot exceed 50 characters (excluding @)',
      );
    }

    // Validate handle format (alphanumeric and underscores only)
    if (!/^[a-z0-9_]+$/.test(handleWithoutAt)) {
      throw new Error(
        'Channel handle can only contain lowercase letters, numbers, and underscores',
      );
    }

    this.handle = normalizedHandle;
    // Note: updatedAt is managed by database
  }

  // Static helper: Normalize handle for uniqueness checks (without creating entity)
  static normalizeHandle(handle: string): string {
    if (!handle || handle.trim().length === 0) {
      return handle;
    }
    let normalized = handle.trim().toLowerCase();
    if (!normalized.startsWith('@')) {
      normalized = `@${normalized}`;
    }
    return normalized;
  }

  // Domain method: Update description
  setDescription(description: string | null): void {
    if (description && description.length > 5000) {
      throw new Error('Channel description cannot exceed 5000 characters');
    }
    this.description = description;
    // Note: updatedAt is managed by database
  }

  // Domain method: Business rule - Can channel be updated?
  canBeUpdated(): boolean {
    // Business rule: Can only update if no subscribers (or allow updates)
    // This is a business rule that could change
    return true; // For now, always allow updates
  }

  // Domain method: Business rule - Can channel be deleted?
  canBeDeleted(): boolean {
    // Business rule: Can't delete if has subscribers
    return this.subscriberCount === 0;
  }

  // Domain method: Increment subscriber count
  incrementSubscriberCount(): void {
    this.subscriberCount += 1;
    // Note: updatedAt is managed by database
  }

  // Domain method: Decrement subscriber count
  decrementSubscriberCount(): void {
    if (this.subscriberCount > 0) {
      this.subscriberCount -= 1;
      // Note: updatedAt is managed by database
    }
  }

  // Getters

  getUserId(): string {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getHandle(): string {
    return this.handle;
  }

  getDescription(): string | null {
    return this.description;
  }

  getBannerUrl(): BannerUrl | null {
    return this.bannerUrl;
  }

  getAvatarUrl(): AvatarUrl | null {
    return this.avatarUrl;
  }

  getSubscriberCount(): number {
    return this.subscriberCount;
  }

  // Domain method: Set banner URL
  setBannerUrl(url: string | null): void {
    this.bannerUrl = createBannerUrl(url);
    // Note: updatedAt is managed by database
  }

  // Domain method: Set avatar URL
  setAvatarUrl(url: string | null): void {
    this.avatarUrl = createAvatarUrl(url);
    // Note: updatedAt is managed by database
  }

  // Domain method: Validate entire entity
  validate(): void {
    if (!this.name || this.name.length < 3) {
      throw new Error('Channel name is invalid');
    }
    if (!this.handle || !this.handle.startsWith('@')) {
      throw new Error('Channel handle is invalid');
    }
    if (this.subscriberCount < 0) {
      throw new Error('Subscriber count cannot be negative');
    }
  }
}
