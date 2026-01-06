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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const user_mapper_1 = require("../domain/mappers/user.mapper");
let UsersRepository = class UsersRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(domain) {
        const existingUser = await this.repository.findOne({
            where: {
                email: domain.getEmail(),
                deletedAt: (0, typeorm_2.IsNull)(),
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const data = user_mapper_1.UserMapper.toPersistence(domain);
        const entity = this.repository.create(data);
        const saved = await this.repository.save(entity);
        return user_mapper_1.UserMapper.toDomain(saved);
    }
    async findById(id) {
        const entity = await this.repository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['channel'],
        });
        return entity ? user_mapper_1.UserMapper.toDomain(entity) : null;
    }
    async findByClerkId(clerkId) {
        const entity = await this.repository.findOne({
            where: { clerkId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['channel'],
        });
        return entity ? user_mapper_1.UserMapper.toDomain(entity) : null;
    }
    async update(domain) {
        const data = user_mapper_1.UserMapper.toPersistence(domain);
        await this.repository.update(domain.getId(), data);
        const updated = await this.findById(domain.getId());
        if (!updated) {
            throw new Error('User not found after update');
        }
        return updated;
    }
    async delete(id) {
        await this.repository.softDelete(id);
    }
    async deleteByClerkId(clerkId) {
        await this.repository.softDelete({ clerkId });
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map