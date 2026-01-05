# API Services

This folder contains all backend API service functions organized by resource.

## Structure

```
src/lib/api/
├── config.ts          # API configuration and base request handler
├── types/             # TypeScript types organized by resource
│   ├── index.ts       # Centralized type exports
│   ├── users.types.ts # User-related types
│   └── ...            # Add more type files as needed
├── users.api.ts       # User-related API calls
└── index.ts           # Centralized exports
```

## Usage

### Import API services

```typescript
import { createUser, getUserById } from "@/lib/api/users.api";
// or
import { createUser } from "@/lib/api";
```

### Example: Creating a user

```typescript
import { createUser } from "@/lib/api/users.api";

const user = await createUser({
  clerkId: "user_123",
  username: "johndoe",
  email: "john@example.com",
  avatarUrl: "https://example.com/avatar.jpg",
});
```

### Example: Getting a user

```typescript
import { getUserById } from "@/lib/api/users.api";

const user = await getUserById("user-id-123");
```

### Error Handling

```typescript
import { createUser, ApiError } from "@/lib/api";

try {
  const user = await createUser(userData);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error: ${error.status} - ${error.message}`);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## Adding New API Endpoints

1. **Create types file**: `types/[resource].types.ts` (e.g., `types/videos.types.ts`)
   ```typescript
   // types/videos.types.ts
   export interface VideoResponse {
     id: string;
     title: string;
     // ... other fields
   }
   ```

2. **Export types**: Add exports to `types/index.ts`
   ```typescript
   export type { VideoResponse } from "./videos.types";
   ```

3. **Create API file**: `[resource].api.ts` (e.g., `videos.api.ts`)
   ```typescript
   // videos.api.ts
   import { apiRequest } from "./config";
   import type { VideoResponse } from "./types/videos.types";

   export async function getVideo(id: string): Promise<VideoResponse> {
     return apiRequest<VideoResponse>(`/videos/${id}`, {
       method: "GET",
     });
   }
   ```

4. **Export API functions**: Add exports to `index.ts`
   ```typescript
   export * from "./videos.api";
   ```

## Configuration

The API base URL is configured in `config.ts` and can be set via the `BACKEND_URL` environment variable.

Default: `http://localhost:3001`

