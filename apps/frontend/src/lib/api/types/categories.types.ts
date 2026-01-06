/**
 * Category API Types
 * Type definitions for category-related API requests and responses
 */

export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

