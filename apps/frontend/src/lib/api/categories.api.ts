/**
 * Categories API Service
 * All category-related API calls are organized here
 */

import { apiRequest } from "./config";
import type { CategoryResponse } from "./types/categories.types";

/**
 * Get all categories
 * @returns Array of categories
 */
export async function getCategories(): Promise<CategoryResponse[]> {
  return apiRequest<CategoryResponse[]>("/categories", {
    method: "GET",
  });
}
