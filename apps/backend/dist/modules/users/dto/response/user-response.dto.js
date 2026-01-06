"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
class UserResponseDto {
    id;
    clerkId;
    username;
    firstName;
    lastName;
    email;
    avatarUrl;
    bio;
    static fromDomain(user) {
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
exports.UserResponseDto = UserResponseDto;
//# sourceMappingURL=user-response.dto.js.map