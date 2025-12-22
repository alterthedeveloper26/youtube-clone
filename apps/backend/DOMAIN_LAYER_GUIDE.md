# Domain Layer Implementation Guide (Approach A - Pure DDD)

## Architecture Overview

We're implementing **Pure Domain-Driven Design** with separate domain entities:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  Controllers, DTOs                       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         Application Layer                │
│  Services (Use Cases)                   │
│  - Creates Domain Entities              │
│  - Uses Domain Methods                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         Domain Layer                     │
│  Domain Entities (Pure Business Logic)  │
│  - No TypeORM decorators                │
│  - Business rules & validation          │
│  - Domain methods                        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         Infrastructure Layer             │
│  Repositories                           │
│  - Mappers (Domain ↔ TypeORM)           │
│  - TypeORM Entities (Database)          │
└─────────────────────────────────────────┘
```

## Structure

```
modules/
└── channels/
    ├── domain/                    ← Domain Layer
    │   ├── channel.domain.ts      ← Domain Entity (business logic)
    │   └── mappers/
    │       └── channel.mapper.ts  ← Converts Domain ↔ TypeORM
    ├── entities/
    │   └── channel.entity.ts      ← TypeORM Entity (database)
    ├── repositories/
    │   └── channels.repository.ts ← Works with Domain Entities
    ├── channels.service.ts        ← Uses Domain Entities
    └── channels.controller.ts
```

## Key Concepts

### 1. Domain Entity (Pure Business Logic)

```typescript
// domain/channel.domain.ts
export class ChannelDomain {
  private name: string;
  private handle: string;
  
  constructor(name: string, handle: string) {
    // Business rules enforced here
    this.setName(name);  // Validates and sets
    this.setHandle(handle);  // Normalizes and validates
  }
  
  // Domain methods (business logic)
  setName(name: string): void {
    if (name.length < 3) throw new Error('Name too short');
    this.name = name.trim();
  }
  
  normalizeHandle(): void {
    this.handle = this.handle.toLowerCase();
  }
  
  canBeDeleted(): boolean {
    return this.subscriberCount === 0;  // Business rule
  }
}
```

**Characteristics:**
- ✅ No TypeORM decorators
- ✅ Pure TypeScript class
- ✅ Business rules in methods
- ✅ Validation in setters/constructors
- ✅ No database concerns

### 2. TypeORM Entity (Database Structure)

```typescript
// entities/channel.entity.ts
@Entity('channels')
export class Channel extends BaseEntity {
  @Column() name: string;
  @Column() handle: string;
  // Just database structure, no business logic
}
```

**Characteristics:**
- ✅ TypeORM decorators
- ✅ Database structure only
- ✅ No business logic
- ✅ Maps to database table

### 3. Mapper (Domain ↔ TypeORM)

```typescript
// domain/mappers/channel.mapper.ts
export class ChannelMapper {
  // Domain → TypeORM
  static toPersistence(domain: ChannelDomain): Partial<Channel> {
    return {
      name: domain.getName(),
      handle: domain.getHandle(),
    };
  }
  
  // TypeORM → Domain
  static toDomain(entity: Channel): ChannelDomain {
    return new ChannelDomain(
      entity.id,
      entity.name,
      entity.handle,
    );
  }
}
```

### 4. Repository (Works with Domain)

```typescript
// repositories/channels.repository.ts
async create(domain: ChannelDomain): Promise<ChannelDomain> {
  // Convert domain to TypeORM
  const data = ChannelMapper.toPersistence(domain);
  
  // Create TypeORM entity
  const entity = this.repository.create(data);
  
  // Save to database
  const saved = await this.repository.save(entity);
  
  // Convert back to domain
  return ChannelMapper.toDomain(saved);
}
```

### 5. Service (Uses Domain)

```typescript
// channels.service.ts
async create(data: { name: string; handle: string }): Promise<ChannelDomain> {
  // Create domain entity (business rules applied)
  const channel = new ChannelDomain(uuid(), data.name, data.handle);
  
  // Validate
  channel.validate();
  
  // Save through repository
  return this.repository.create(channel);
}
```

## Benefits

### 1. **Business Logic in One Place**
```typescript
// Domain entity has all business rules
channel.setHandle('@test');  // Automatically normalizes
channel.canBeDeleted();      // Business rule check
```

### 2. **Testable Without Database**
```typescript
// Test domain logic without database
const channel = new ChannelDomain('id', 'Test', '@test');
expect(channel.getHandle()).toBe('@test');
expect(channel.canBeDeleted()).toBe(true);
```

### 3. **Reusable**
```typescript
// Same domain entity works everywhere
// - REST API
// - GraphQL
// - CLI
// - Background jobs
```

### 4. **Technology Independent**
```typescript
// Domain doesn't know about TypeORM
// Can switch to Prisma, raw SQL, etc.
// Domain logic stays the same
```

## Implementation Pattern

### Step 1: Create Domain Entity
```typescript
// domain/channel.domain.ts
export class ChannelDomain {
  // Private properties
  // Constructor with validation
  // Domain methods
  // Getters
}
```

### Step 2: Create Mapper
```typescript
// domain/mappers/channel.mapper.ts
export class ChannelMapper {
  static toDomain(entity: TypeORMEntity): DomainEntity
  static toPersistence(domain: DomainEntity): Partial<TypeORMEntity>
}
```

### Step 3: Update Repository
```typescript
// repositories/channels.repository.ts
// All methods work with Domain entities
// Convert to/from TypeORM internally
```

### Step 4: Update Service
```typescript
// channels.service.ts
// Creates Domain entities
// Uses domain methods
// Returns Domain entities
```

## What's Implemented

✅ **Channel Domain** - Complete with business logic
✅ **Video Domain** - Complete with business logic
✅ **User Domain** - Complete with business logic
✅ **Mappers** - For all three
✅ **Repositories Updated** - Work with domain entities
✅ **Services Updated** - Use domain entities

## Next Steps

1. Implement remaining domain entities (Comment, Playlist, etc.)
2. Add more domain methods as needed
3. Add domain services for complex business rules
4. Add domain events if needed

## Example Flow

```typescript
// 1. Service creates domain entity
const channel = new ChannelDomain(id, userId, name, handle);
// Business rules applied in constructor

// 2. Service validates
channel.validate();

// 3. Repository converts and saves
const saved = await repository.create(channel);
// Mapper converts Domain → TypeORM → Database
// Mapper converts Database → TypeORM → Domain

// 4. Service returns domain entity
return saved;  // Domain entity, not TypeORM entity
```

This is **pure DDD** - Domain layer is completely separate from infrastructure!

