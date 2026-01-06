"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./repositories/users.repository");
const user_domain_1 = require("./domain/user.domain");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(data) {
        const userDomain = new user_domain_1.UserDomain((0, uuid_1.v4)(), data.clerkId, data.username || null, data.email, data.avatarUrl, undefined, data.firstName || null, data.lastName || null);
        userDomain.validate();
        return this.usersRepository.create(userDomain);
    }
    async findById(id) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByClerkId(clerkId) {
        return this.usersRepository.findByClerkId(clerkId);
    }
    async deleteByClerkId(clerkId) {
        const user = await this.findByClerkId(clerkId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.usersRepository.deleteByClerkId(clerkId);
    }
    async update(id, data) {
        const user = await this.findById(id);
        if (data.username !== undefined) {
            user.setUsername(data.username);
        }
        if (data.firstName !== undefined) {
            user.setFirstName(data.firstName);
        }
        if (data.lastName !== undefined) {
            user.setLastName(data.lastName);
        }
        if (data.email) {
            user.setEmail(data.email);
        }
        if (data.avatarUrl !== undefined) {
            user.setAvatarUrl(data.avatarUrl);
        }
        if (data.bio !== undefined) {
            user.setBio(data.bio);
        }
        user.validate();
        return this.usersRepository.update(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map