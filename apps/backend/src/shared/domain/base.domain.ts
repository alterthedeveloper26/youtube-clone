/**
 * Base Domain Entity
 * Contains common fields: id and timestamps
 * All domain entities should extend this class
 *
 * Note: id, createdAt, updatedAt, and deletedAt are read-only.
 * These fields are controlled by the database/ORM layer.
 */
export abstract class BaseDomain {
  protected readonly id: string;
  protected readonly createdAt: Date;
  protected readonly updatedAt: Date;
  protected readonly deletedAt: Date | null;

  constructor(
    id: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null,
  ) {
    this.id = id;
    // Timestamps are read-only - set by database
    // For new entities, these will be undefined and set by DB
    // For existing entities, these are read from DB
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.deletedAt = deletedAt ?? null;
  }

  /**
   * Get the entity ID (read-only, set by database)
   */
  getId(): string {
    return this.id;
  }

  /**
   * Get creation timestamp (read-only, set by database)
   */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Get last update timestamp (read-only, set by database)
   */
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Get deletion timestamp (read-only, set by database)
   */
  getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  /**
   * Check if entity is deleted
   */
  isDeleted(): boolean {
    return this.deletedAt !== null;
  }
}
