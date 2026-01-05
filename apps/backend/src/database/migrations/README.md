# Database Migrations

This folder contains TypeORM migration files.

## Migration Commands

### Generate a new migration (auto-generated from entity changes)
```bash
npm run migration:generate src/database/migrations/MigrationName -d src/database/data-source.ts
```

### Create an empty migration file
```bash
npm run migration:create src/database/migrations/MigrationName
```

### Run pending migrations
```bash
npm run migration:run
```

### Revert the last migration
```bash
npm run migration:revert
```

### Show migration status
```bash
npm run migration:show
```

### Drop entire database schema (⚠️ DANGEROUS - use with caution)
```bash
npm run schema:drop
```

### Sync schema (⚠️ Use migrations instead in production)
```bash
npm run schema:sync
```

## Migration Naming Convention

Use descriptive names with timestamps:
- `1234567890-CreateUsersTable`
- `1234567891-AddEmailToUsers`
- `1234567892-UpdateVideoSchema`

TypeORM will automatically add timestamps when using `migration:generate`.

