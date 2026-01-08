# JWT Token Handling in Microservices Architecture

## Overview

In a microservices architecture, JWT tokens need to be:
1. **Validated** by each service (or a shared auth service)
2. **Propagated** between services
3. **Trusted** across service boundaries
4. **Secured** in transit

---

## Architecture Options

### Option 1: API Gateway Pattern (Recommended)

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ JWT Token
       ▼
┌─────────────────┐
│  API Gateway    │ ← Validates JWT, routes requests
│  (Auth Layer)   │
└──────┬──────────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       ▼              ▼              ▼              ▼
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Videos   │   │ Channels │   │ Comments │   │ Users    │
│ Service  │   │ Service  │   │ Service  │   │ Service  │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
```

**Flow:**
1. Client sends JWT to API Gateway
2. Gateway validates JWT (once)
3. Gateway adds user context to request headers
4. Services trust gateway and use headers (no re-validation)

**Benefits:**
- ✅ Single point of validation (performance)
- ✅ Services don't need JWT validation logic
- ✅ Centralized auth logic
- ✅ Easier to implement rate limiting, logging

**Token Structure:**
```json
{
  "sub": "user-id",
  "clerkId": "clerk-user-id",
  "iat": 1705322000,
  "exp": 1705325600
}
```

**Gateway adds to headers:**
```http
X-User-Id: user-id
X-User-Role: USER
X-User-Channel-Id: channel-id
```

---

### Option 2: Shared Auth Service (Service Mesh)

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ JWT Token
       ▼
┌─────────────┐
│ Videos      │ ← Validates JWT via Auth Service
│ Service     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Auth        │ ← Validates & returns user context
│ Service     │
└─────────────┘
```

**Flow:**
1. Client sends JWT to any service
2. Service calls Auth Service to validate
3. Auth Service returns user context
4. Service uses context for authorization

**Benefits:**
- ✅ Centralized validation logic
- ✅ Services can validate independently
- ✅ Can cache validation results

**Drawbacks:**
- ❌ Extra network call per request
- ❌ Auth Service becomes bottleneck
- ❌ More complex error handling

---

### Option 3: Distributed Validation (Self-Contained)

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ JWT Token
       ▼
┌─────────────┐
│ Videos      │ ← Validates JWT locally
│ Service     │   (has public key)
└─────────────┘
```

**Flow:**
1. Client sends JWT to service
2. Service validates JWT using public key
3. Service extracts user context from token
4. Service performs authorization

**Benefits:**
- ✅ No network calls for validation
- ✅ Services are independent
- ✅ Better performance (no auth service dependency)

**Drawbacks:**
- ❌ Each service needs validation logic
- ❌ Public key distribution/rotation complexity
- ❌ More code duplication

---

## Recommended Approach: Hybrid (API Gateway + Service Validation)

### Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ JWT Token
       ▼
┌─────────────────┐
│  API Gateway    │ ← Validates JWT
│  (Kong/Nginx)   │   Adds user headers
└──────┬──────────┘
       │
       ├──────────────┬──────────────┐
       ▼              ▼              ▼
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Videos   │   │ Channels │   │ Comments │
│ Service  │   │ Service  │   │ Service  │
└──────┬───┘   └────┬─────┘   └────┬─────┘
       │            │              │
       └────────────┴──────────────┘
                    │
                    ▼
            ┌───────────────┐
            │ Internal      │ ← Service-to-service
            │ Communication │   (no JWT needed)
            └───────────────┘
```

### Token Flow

#### 1. Client → API Gateway
```http
GET /api/videos
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 2. API Gateway Validates & Adds Headers
```http
GET /videos
X-User-Id: uuid-123-456
X-User-Clerk-Id: user_2abc123xyz
X-User-Role: USER
X-User-Channel-Id: channel-uuid-123
X-Request-Id: req-abc-123
```

#### 3. Service Uses Headers
```typescript
// In Videos Service
const userId = request.headers['x-user-id'];
const userRole = request.headers['x-user-role'];
// No JWT validation needed - gateway already did it
```

---

## JWT Token Structure for Microservices

### Option A: Minimal Token (Recommended)

```json
{
  "sub": "user-id",
  "clerkId": "clerk-user-id",
  "iat": 1705322000,
  "exp": 1705325600,
  "iss": "youtube-clone-auth",
  "aud": "youtube-clone-api"
}
```

**Why minimal?**
- Small token size (faster transmission)
- Less sensitive data exposed
- User context fetched from DB by gateway
- Real-time role/permission updates

### Option B: Self-Contained Token (If No Gateway)

```json
{
  "sub": "user-id",
  "clerkId": "clerk-user-id",
  "role": "USER",
  "permissions": ["video:view", "video:create"],
  "channelId": "channel-uuid-123",
  "iat": 1705322000,
  "exp": 1705325600,
  "iss": "youtube-clone-auth",
  "aud": ["videos-service", "channels-service", "comments-service"]
}
```

**When to use:**
- No API Gateway
- Services validate independently
- Need to avoid DB lookups

**Trade-offs:**
- ❌ Token size increases
- ❌ Stale permissions (until token refresh)
- ❌ More complex token management

---

## Service-to-Service Communication

### Internal Service Calls (No JWT)

For service-to-service calls, use **service tokens** or **mTLS** instead of user JWT.

#### Option 1: Service Tokens

```typescript
// Videos Service calls Channels Service
const serviceToken = generateServiceToken('videos-service');
fetch('http://channels-service/api/channels/123', {
  headers: {
    'Authorization': `Bearer ${serviceToken}`,
    'X-Service-Name': 'videos-service',
    'X-User-Id': userId,  // Pass user context
  }
});
```

**Service Token Structure:**
```json
{
  "sub": "videos-service",
  "type": "service",
  "iat": 1705322000,
  "exp": 1705325600,
  "permissions": ["internal:read"]
}
```

#### Option 2: Pass User Context

```typescript
// Videos Service → Channels Service
fetch('http://channels-service/api/channels/123', {
  headers: {
    'X-User-Id': userId,
    'X-User-Role': userRole,
    'X-Service-Name': 'videos-service',
    'X-Request-Id': requestId,  // For tracing
  }
});
```

**Benefits:**
- No JWT validation needed
- Faster internal calls
- Clear service identity

---

## Implementation Strategies

### 1. API Gateway Validation (Kong/Nginx)

#### Kong Plugin Configuration
```lua
-- kong-jwt-validator.lua
local jwt = require("resty.jwt")
local clerk = require("clerk-sdk")

function validate_jwt(token)
  -- Verify with Clerk
  local payload = clerk.verify_token(token)
  
  -- Fetch user from DB
  local user = db.get_user_by_clerk_id(payload.sub)
  
  -- Add headers
  ngx.req.set_header("X-User-Id", user.id)
  ngx.req.set_header("X-User-Role", user.role)
  ngx.req.set_header("X-User-Channel-Id", user.channel_id)
  
  return true
end
```

#### Nginx Configuration
```nginx
location /api/ {
  # Validate JWT
  auth_request /auth;
  
  # Pass headers to backend
  proxy_set_header X-User-Id $upstream_http_x_user_id;
  proxy_set_header X-User-Role $upstream_http_x_user_role;
  
  proxy_pass http://backend-service;
}
```

### 2. Service-Level Validation (If No Gateway)

#### NestJS Guard for Each Service
```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private clerkService: ClerkService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    // Verify with Clerk
    const clerkPayload = await this.clerkService.verifyToken(token);
    
    // Fetch user from DB
    const user = await this.usersService.findByClerkId(clerkPayload.sub);
    if (!user) throw new UnauthorizedException();

    // Attach to request
    request.user = {
      id: user.getId(),
      clerkId: user.getClerkId(),
      role: user.getRole(),
      channelId: user.getChannelId(),
    };

    return true;
  }
}
```

### 3. Shared Auth Library

Create a shared package for all services:

```typescript
// @youtube-clone/auth package
export class AuthService {
  async validateToken(token: string): Promise<UserContext> {
    // Verify with Clerk
    const clerkPayload = await clerk.verifyToken(token);
    
    // Fetch from DB (or cache)
    const user = await this.getUserFromCacheOrDB(clerkPayload.sub);
    
    return {
      id: user.id,
      clerkId: user.clerkId,
      role: user.role,
      channelId: user.channelId,
    };
  }
}
```

**Usage in services:**
```typescript
// In Videos Service
import { AuthService } from '@youtube-clone/auth';

const authService = new AuthService();
const userContext = await authService.validateToken(token);
```

---

## Token Propagation Strategies

### 1. Pass-Through (Gateway Pattern)

```
Client → Gateway (validates) → Service (trusts headers)
```

**No token needed in service-to-service calls.**

### 2. Token Forwarding

```
Client → Service A → Service B (both validate)
```

**Service A forwards original JWT to Service B.**

```typescript
// Service A calls Service B
fetch('http://service-b/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${originalJwtToken}`,  // Forward token
  }
});
```

### 3. Context Propagation

```
Client → Service A → Service B (context in headers)
```

**Service A extracts context and passes as headers.**

```typescript
// Service A calls Service B
fetch('http://service-b/api/endpoint', {
  headers: {
    'X-User-Id': request.user.id,
    'X-User-Role': request.user.role,
    'X-Request-Id': request.id,
  }
});
```

---

## Security Considerations

### 1. Token Validation

- **Always verify signature** (Clerk public key)
- **Check expiration** (reject expired tokens)
- **Validate audience** (ensure token is for your services)
- **Validate issuer** (ensure token is from Clerk)

### 2. Service-to-Service Security

- **Use mTLS** for internal communication
- **Service tokens** for service identity
- **Network policies** to restrict service access
- **Never forward user JWT** to untrusted services

### 3. Token Storage

- **Client**: Memory (React state)
- **Gateway**: Cache validation results (Redis)
- **Services**: Don't store tokens (use headers)

### 4. Token Rotation

- **Short-lived access tokens** (15 min - 1 hour)
- **Refresh tokens** for new access tokens
- **Token revocation** (blacklist in Redis)

---

## Caching Strategy

### Gateway-Level Caching

```typescript
// Cache user context after validation
const cacheKey = `user:${clerkId}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

// Validate and cache
const user = await validateAndFetchUser(token);
await redis.setex(cacheKey, 300, JSON.stringify(user)); // 5 min cache
return user;
```

**Benefits:**
- Reduces DB queries
- Faster validation
- Still allows real-time updates (short TTL)

---

## Example: Complete Flow

### 1. Client Request
```typescript
// Frontend
const token = await getToken();
fetch('https://api.youtube-clone.com/api/videos', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### 2. API Gateway
```typescript
// Gateway validates JWT
const clerkPayload = await clerk.verifyToken(token);
const user = await usersService.findByClerkId(clerkPayload.sub);

// Add headers
request.headers['X-User-Id'] = user.id;
request.headers['X-User-Role'] = user.role;
request.headers['X-User-Channel-Id'] = user.channelId;

// Route to Videos Service
proxyPass('http://videos-service/videos', request);
```

### 3. Videos Service
```typescript
// Service receives request with headers
@Get()
@UseGuards(TrustGatewayGuard)  // Trusts gateway headers
async getVideos(@Headers('x-user-id') userId: string) {
  // No JWT validation needed
  // Use userId from header
  return this.videosService.findAll({ userId });
}
```

### 4. Videos Service → Channels Service
```typescript
// Internal service call
const channel = await this.channelsService.getChannel(channelId, {
  headers: {
    'X-User-Id': userId,  // Pass user context
    'X-Service-Name': 'videos-service',
  }
});
```

---

## Summary

### Recommended Architecture

1. **API Gateway** validates JWT once
2. **Gateway adds user context** to headers
3. **Services trust gateway** (no re-validation)
4. **Service-to-service** uses context headers (not JWT)

### Token Structure

```json
{
  "sub": "user-id",
  "clerkId": "clerk-user-id",
  "iat": 1705322000,
  "exp": 1705325600
}
```

### Key Principles

- ✅ **Validate once** (at gateway)
- ✅ **Propagate context** (via headers)
- ✅ **Trust boundaries** (gateway → services)
- ✅ **Cache validation** (reduce DB load)
- ✅ **Secure internal calls** (mTLS or service tokens)

This approach provides:
- **Performance**: Single validation point
- **Security**: Clear trust boundaries
- **Scalability**: Services don't need auth logic
- **Maintainability**: Centralized auth logic

