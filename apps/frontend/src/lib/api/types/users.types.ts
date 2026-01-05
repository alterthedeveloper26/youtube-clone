/**
 * User API Types
 * Type definitions for user-related API requests and responses
 */

export interface CreateUserRequest {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  avatarUrl?: string | null;
  bio?: string;
}

export interface UserResponse {
  id: string;
  clerkId: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
}
