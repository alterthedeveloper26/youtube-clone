import { UserDomain } from '../../domain/user.domain';

/**
 * User Response DTO
 * Standard response format for user data returned by API endpoints
 */
export class UserResponseDto {
  id: string;
  clerkId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  avatarUrl: string | null;
  bio: string | null;

  /**
   * Convert domain entity to response DTO
   */
  static fromDomain(user: UserDomain): UserResponseDto {
    return {
      id: user.getId(),
      clerkId: user.getClerkId(),
      username: user.getUsername(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      avatarUrl: user.getAvatarUrl(),
      bio: user.getBio(),
    };
  }
}

