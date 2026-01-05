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
exports.Tag = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/entities/base.entity");
const video_entity_1 = require("../../videos/entities/video.entity");
let Tag = class Tag extends base_entity_1.BaseEntity {
    name;
    slug;
    videos;
};
exports.Tag = Tag;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Tag.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => video_entity_1.Video, (video) => video.tags),
    __metadata("design:type", Array)
], Tag.prototype, "videos", void 0);
exports.Tag = Tag = __decorate([
    (0, typeorm_1.Entity)('tags')
], Tag);
//# sourceMappingURL=tag.entity.js.map