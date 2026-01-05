/**
 * API Configuration
 * Centralized configuration for backend API calls
 */

export const API_CONFIG = {
  baseURL: process.env.BACKEND_URL || "http://localhost:3001",
  apiPrefix: "/api",
  timeout: 30000, // 30 seconds
} as const;

/**
 * Default headers for API requests
 */
export const getDefaultHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
});

/**
 * API Error class for better error handling
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string,
  ) {
    super(message || statusText);
    this.name = "ApiError";
  }
}

/**
 * Base fetch wrapper with error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_CONFIG.baseURL}${API_CONFIG.apiPrefix}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getDefaultHeaders(),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new ApiError(
      response.status,
      response.statusText,
      errorText || `API request failed: ${response.status}`,
    );
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text() as unknown as T;
}

