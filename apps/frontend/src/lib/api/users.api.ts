/**
 * Users API Service
 * All user-related API calls are organized here
 */

import { apiRequest } from "./config";
import type {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "./types/users.types";

/**
 * Create a new user in the backend
 * @param userData - User data from Clerk webhook
 * @returns Created user data
 */
export async function createUser(
  userData: CreateUserRequest
): Promise<UserResponse> {
  return apiRequest<UserResponse>("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

/**
 * Get user by ID
 * @param id - User ID
 * @returns User data
 */
export async function getUserById(id: string): Promise<UserResponse> {
  return apiRequest<UserResponse>(`/users/${id}`, {
    method: "GET",
  });
}

/**
 * Update user
 * @param id - User ID
 * @param data - User data to update
 * @returns Updated user data
 */
export async function updateUser(
  id: string,
  data: UpdateUserRequest
): Promise<UserResponse> {
  return apiRequest<UserResponse>(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
