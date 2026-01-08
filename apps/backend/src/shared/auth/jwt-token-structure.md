# JWT Token Structure for YouTube Clone

## Overview

Since you're using **Clerk** for authentication, Clerk issues JWT tokens. You have two options:

1. **Use Clerk's default JWT** (simpler, but limited customization)
2. **Issue your own JWT** after Clerk authentication (more control, can add custom claims)

## Recommended Approach: Hybrid

**Use Clerk's JWT for authentication**, then **fetch user data from your database** for authorization.

### Why?

- Clerk handles authentication (login, session management)
- Your database stores authorization data (roles, permissions)
- Keeps tokens small and secure
- Allows real-time role/permission updates without re-authentication

---

## Option 1: Clerk's Default JWT (What Clerk Provides)

### Standard Clerk JWT Structure

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "key-id"
  },
  "payload": {
    // Clerk's standard claims
    "sub": "user_2abc123xyz", // Clerk User ID
    "iss": "https://your-clerk-instance.clerk.accounts.dev",
    "aud": "your-clerk-app-id",
    "iat": 1705322000, // Issued at
    "exp": 1705325600, // Expires at (1 hour default)
    "nbf": 1705322000, // Not before
    "sid": "sess_2abc123xyz", // Session ID

    // Clerk's user metadata (if configured)
    "email": "user@example.com",
    "email_verified": true,
    "phone": "+1234567890",
    "phone_verified": false,
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "image_url": "https://img.clerk.com/...",

    // Clerk's organization metadata (if applicable)
    "org_id": "org_2abc123xyz",
    "org_role": "admin",
    "org_slug": "my-org"
  }
}
```

### Limitations

- **No custom claims** (can't add role/permissions directly)
- **Limited customization** (Clerk controls the structure)
- **Role/permissions must be fetched from DB**

---

## Option 2: Custom JWT After Clerk Auth (Recommended)

### Flow

1. User authenticates with Clerk → Gets Clerk JWT
2. Backend verifies Clerk JWT
3. Backend fetches user from DB (gets role, permissions)
4. Backend issues **custom JWT** with your claims
5. Client uses custom JWT for subsequent requests

### Custom JWT Structure

```json
{
  "header": {
    "alg": "HS256", // or RS256 for better security
    "typ": "JWT"
  },
  "payload": {
    // Standard JWT claims
    "sub": "uuid-123-456", // Your internal user ID (from DB)
    "clerkId": "user_2abc123xyz", // Clerk User ID (for reference)
    "iss": "youtube-clone-api", // Your API issuer
    "aud": "youtube-clone-frontend", // Your frontend audience
    "iat": 1705322000, // Issued at
    "exp": 1705325600, // Expires at (1 hour)
    "nbf": 1705322000, // Not before

    // Custom claims for authorization
    "role": "USER", // USER | MODERATOR | ADMIN
    "permissions": [
      // Array of permissions
      "video:view",
      "video:create",
      "channel:view",
      "channel:edit",
      "comment:create"
    ],

    // Optional: Channel info (if user has channel)
    "channelId": "channel-uuid-123", // User's primary channel ID

    // Optional: Session metadata
    "sessionId": "sess_abc123",
    "deviceId": "device_xyz789"
  }
}
```

---

## Option 3: Minimal Token + Database Lookup (Best for Security)

### Token Structure (Minimal)

```json
{
  "payload": {
    "sub": "uuid-123-456", // Your internal user ID
    "clerkId": "user_2abc123xyz", // Clerk User ID
    "iat": 1705322000,
    "exp": 1705325600,
    "type": "access" // Token type
  }
}
```

### Why Minimal?

- **Smaller token size** (faster transmission)
- **More secure** (less sensitive data in token)
- **Real-time updates** (role/permission changes take effect immediately)
- **No token invalidation needed** (just update DB)

### Authorization Flow

1. Verify JWT token
2. Extract `sub` (user ID)
3. Fetch user from database (includes role)
4. Check permissions based on role
5. Perform authorization checks

---

## Recommended Implementation

### Token Payload Structure

```typescript
interface JWTPayload {
  // Standard claims
  sub: string; // Your internal user ID (from users table)
  clerkId: string; // Clerk User ID (for reference)
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp

  // Optional: Role (can be fetched from DB instead)
  role?: 'USER' | 'MODERATOR' | 'ADMIN';

  // Optional: Channel ID (if user has channel)
  channelId?: string;
}
```

### Why NOT include permissions in token?

- **Permissions can change** (admin updates user role)
- **Token would need refresh** (defeats purpose of JWT)
- **Token size increases** (more data to transmit)
- **Security risk** (more sensitive data in token)

### Better Approach: Fetch from DB

```typescript
// In AuthGuard
async canActivate(context: ExecutionContext) {
  // 1. Verify Clerk JWT
  const clerkToken = extractToken(request);
  const clerkPayload = await clerk.verifyToken(clerkToken);

  // 2. Get user from DB using clerkId
  const user = await usersService.findByClerkId(clerkPayload.sub);
  if (!user) throw new UnauthorizedException();

  // 3. Attach user to request (includes role from DB)
  request.user = {
    id: user.getId(),
    clerkId: user.getClerkId(),
    role: user.getRole(),  // From database
    channelId: user.getChannelId(), // If applicable
  };

  return true;
}
```

---

## Token Types

### 1. Access Token (Short-lived)

```json
{
  "sub": "user-id",
  "clerkId": "clerk-user-id",
  "iat": 1705322000,
  "exp": 1705325600, // 1 hour
  "type": "access"
}
```

- **Lifetime**: 1 hour
- **Purpose**: API requests
- **Storage**: Memory (not localStorage for security)

### 2. Refresh Token (Long-lived)

```json
{
  "sub": "user-id",
  "clerkId": "clerk-user-id",
  "iat": 1705322000,
  "exp": 1705408400, // 24 hours
  "type": "refresh",
  "tokenId": "refresh-token-uuid"
}
```

- **Lifetime**: 24 hours or longer
- **Purpose**: Get new access token
- **Storage**: HttpOnly cookie (more secure)

---

## Security Best Practices

### 1. Token Size

- **Keep it minimal** - Only include essential claims
- **Don't include permissions** - Fetch from DB instead
- **Don't include sensitive data** - No passwords, emails in token

### 2. Token Expiration

- **Access tokens**: 15 minutes - 1 hour
- **Refresh tokens**: 7-30 days
- **Short expiration** = Better security

### 3. Token Storage

- **Access token**: Memory (React state)
- **Refresh token**: HttpOnly cookie (if using cookies)
- **Never localStorage** (vulnerable to XSS)

### 4. Token Validation

- **Always verify signature** (Clerk handles this)
- **Check expiration** (Clerk handles this)
- **Validate audience** (ensure token is for your app)
- **Check user exists** (verify user in your DB)

---

## Example: Complete Token Flow

### 1. User Logs In (Frontend)

```typescript
// Clerk handles login
const { getToken } = useAuth();
const token = await getToken();
```

### 2. Send Token to Backend

```typescript
// Frontend API call
fetch('/api/videos', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### 3. Backend Verifies Token

```typescript
// AuthGuard
const clerkPayload = await clerk.verifyToken(token);
// Returns: { sub: 'clerk_user_id', ... }
```

### 4. Backend Fetches User Data

```typescript
const user = await usersService.findByClerkId(clerkPayload.sub);
// Returns: { id: 'uuid', role: 'USER', channelId: '...' }
```

### 5. Attach to Request

```typescript
request.user = {
  id: user.getId(),
  clerkId: user.getClerkId(),
  role: user.getRole(),
  channelId: user.getChannelId(),
};
```

### 6. Authorization Check

```typescript
// In guard or service
if (user.role === 'ADMIN' || ownsResource(user.id, video.channelId)) {
  // Allow action
}
```

---

## Summary

### Recommended Token Structure

```json
{
  "sub": "internal-user-id",
  "clerkId": "clerk-user-id",
  "iat": 1705322000,
  "exp": 1705325600
}
```

### What to Include

✅ User ID (internal)  
✅ Clerk ID (for reference)  
✅ Standard JWT claims (iat, exp)

### What NOT to Include

❌ Permissions (fetch from DB)  
❌ Role (fetch from DB, or include if you accept stale data)  
❌ Sensitive data (email, password)  
❌ Large objects (channel data, user profile)

### Authorization Flow

1. Verify Clerk JWT
2. Extract clerkId
3. Fetch user from DB (gets role, permissions)
4. Check authorization based on role/permissions
5. Allow/deny request

This approach gives you:

- ✅ Security (minimal token exposure)
- ✅ Flexibility (real-time role updates)
- ✅ Performance (small tokens)
- ✅ Maintainability (clear separation of concerns)
