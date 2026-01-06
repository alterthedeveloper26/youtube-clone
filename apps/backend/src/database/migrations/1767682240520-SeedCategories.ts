import { MigrationInterface, QueryRunner } from 'typeorm';

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

export class SeedCategories1767682240520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed categories data

    // Insert categories into the database
    for (const category of categories) {
      await queryRunner.query(
        `INSERT INTO categories (id, name, slug, description, "createdAt", "updatedAt", "deletedAt")
         VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW(), NULL)
         ON CONFLICT (slug) DO NOTHING`,
        [category.name, category.slug, category.description],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM categories WHERE slug IN (${categories.map((_, i) => `$${i + 1}`).join(', ')})`,
      categories.map((category) => category.slug),
    );
  }
}
