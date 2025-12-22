/**
 * Branded types for URLs to prevent misuse
 * These types are structurally the same as string but are distinct types
 */

/**
 * Branded type for banner URL
 * Prevents accidentally using avatar URL where banner URL is expected
 */
export type BannerUrl = string & { readonly __brand: 'BannerUrl' };

/**
 * Branded type for avatar URL
 * Prevents accidentally using banner URL where avatar URL is expected
 */
export type AvatarUrl = string & { readonly __brand: 'AvatarUrl' };

/**
 * Type guard: Check if string is a valid banner URL
 */
export function isBannerUrl(url: string | null | undefined): url is BannerUrl {
  if (!url) return false;
  // Basic URL validation
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Type guard: Check if string is a valid avatar URL
 */
export function isAvatarUrl(url: string | null | undefined): url is AvatarUrl {
  if (!url) return false;
  // Basic URL validation
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create a BannerUrl from a string (with validation)
 */
export function createBannerUrl(
  url: string | null | undefined,
): BannerUrl | null {
  if (!url) return null;
  if (url.length > 500) {
    throw new Error('Banner URL cannot exceed 500 characters');
  }
  if (!isBannerUrl(url)) {
    throw new Error('Invalid banner URL format');
  }
  return url as BannerUrl;
}

/**
 * Create an AvatarUrl from a string (with validation)
 */
export function createAvatarUrl(
  url: string | null | undefined,
): AvatarUrl | null {
  if (!url) return null;
  if (url.length > 500) {
    throw new Error('Avatar URL cannot exceed 500 characters');
  }
  if (!isAvatarUrl(url)) {
    throw new Error('Invalid avatar URL format');
  }
  return url as AvatarUrl;
}
