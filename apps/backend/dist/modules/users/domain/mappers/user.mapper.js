"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_domain_1 = require("../user.domain");
class UserMapper {
    static toDomain(entity) {
        return new user_domain_1.UserDomain(entity.id, entity.clerkId, entity.username, entity.email, entity.avatarUrl, entity.bio, entity.firstName, entity.lastName);
    }
    static toPersistence(domain) {
        return {
            id: domain.getId(),
            clerkId: domain.getClerkId(),
            username: domain.getUsername(),
            firstName: domain.getFirstName(),
            lastName: domain.getLastName(),
            email: domain.getEmail(),
            avatarUrl: domain.getAvatarUrl(),
            bio: domain.getBio(),
        };
    }
    static toDomainList(entities) {
        return entities.map((entity) => this.toDomain(entity));
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map