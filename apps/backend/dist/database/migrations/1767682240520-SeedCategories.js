"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedCategories1767682240520 = void 0;
const categories = [
    {
        name: 'Movie',
        slug: 'movie',
        description: 'Movie liked animation',
    },
    {
        name: 'Short',
        slug: 'short',
        description: 'Short loop animation',
    },
    {
        name: '3D',
        slug: '3d',
        description: '3D animation',
    },
];
class SeedCategories1767682240520 {
    async up(queryRunner) {
        for (const category of categories) {
            await queryRunner.query(`INSERT INTO categories (id, name, slug, description, "createdAt", "updatedAt", "deletedAt")
         VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW(), NULL)
         ON CONFLICT (slug) DO NOTHING`, [category.name, category.slug, category.description]);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM categories WHERE slug IN (${categories.map((_, i) => `$${i + 1}`).join(', ')})`, categories.map((category) => category.slug));
    }
}
exports.SeedCategories1767682240520 = SeedCategories1767682240520;
//# sourceMappingURL=1767682240520-SeedCategories.js.map