# API Gateway Authentication Flow

## Overview

When using an API Gateway, you have **two main approaches**:

1. **Direct Clerk JWT** (Simpler) - Gateway validates Clerk's JWT directly
2. **Custom JWT via Auth Service** (More control) - Auth service issues custom JWT after Clerk validation

---

## Option 1: Direct Clerk JWT (Recommended for Simplicity)

### Flow

```
┌─────────────┐
│   Client    │
│  (Frontend) │
└──────┬──────┘
       │
       │ 1. User logs in via Clerk
       │    Clerk issues JWT token
       ▼
┌─────────────┐
│   Clerk     │ ← Generates JWT
│  (Auth)     │   { sub: "clerk_user_id", ... }
└─────────────┘
       │
       │ 2. Client sends Clerk JWT
       ▼
┌─────────────────┐
│  API Gateway    │ ← Validates Clerk JWT
│  (Kong/Nginx)   │   Fetches user from DB
│                 │   Adds headers to request
└────────┬────────┘
         │
         │ 3. Request with user headers
         ▼
┌─────────────┐
│   Services  │ ← Trusts gateway headers
│  (Videos,   │   No JWT validation
│   Channels) │
└─────────────┘
```

### Steps

1. **User Authentication (Clerk)**
   ```typescript
   // Frontend - Clerk handles login
   const { getToken } = useAuth();
   const clerkToken = await getToken();
   // Clerk JWT: { sub: "user_2abc123xyz", ... }
   ```

2. **Client Sends Request**
   ```typescript
   // Frontend sends Clerk JWT
   fetch('/api/videos', {
     headers: {
       'Authorization': `Bearer ${clerkToken}`
     }
   });
   ```

3. **API Gateway Validates**
   ```typescript
   // Gateway validates Clerk JWT
   const clerkPayload = await clerk.verifyToken(token);
   // Returns: { sub: "user_2abc123xyz", ... }
   
   // Fetch user from your DB
   const user = await usersService.findByClerkId(clerkPayload.sub);
   
   // Add user context to headers
   request.headers['X-User-Id'] = user.id;
   request.headers['X-User-Role'] = user.role;
   ```

4. **Service Uses Headers**
   ```typescript
   // Service trusts gateway
   const userId = request.headers['X-User-Id'];
   // No JWT validation needed
   ```

### Pros
- ✅ **Simple** - No auth service needed
- ✅ **Fast** - Direct validation
- ✅ **Less infrastructure** - One less service
- ✅ **Clerk handles everything** - Login, sessions, tokens

### Cons
- ❌ **Tied to Clerk** - Harder to switch auth providers
- ❌ **Limited customization** - Can't add custom claims easily

---

## Option 2: Auth Service + Custom JWT (More Control)

### Flow

```
┌─────────────┐
│   Client    │
│  (Frontend) │
└──────┬──────┘
       │
       │ 1. User logs in via Clerk
       │    Clerk issues JWT token
       ▼
┌─────────────┐
│   Clerk     │ ← Generates Clerk JWT
│  (Auth)     │   { sub: "clerk_user_id", ... }
└─────────────┘
       │
       │ 2. Client sends Clerk JWT to Auth Service
       ▼
┌─────────────────┐
│  Auth Service   │ ← Validates Clerk JWT
│  (Your Backend) │   Fetches user from DB
│                 │   Issues custom JWT
└────────┬────────┘
         │
         │ 3. Returns custom JWT
         │    { sub: "user-id", role: "USER", ... }
         ▼
┌─────────────┐
│   Client    │ ← Stores custom JWT
└──────┬──────┘
       │
       │ 4. Client sends custom JWT
       ▼
┌─────────────────┐
│  API Gateway    │ ← Validates custom JWT
│  (Kong/Nginx)   │   Adds headers to request
└────────┬────────┘
         │
         │ 5. Request with user headers
         ▼
┌─────────────┐
│   Services  │ ← Trusts gateway headers
└─────────────┘
```

### Steps

1. **User Authentication (Clerk)**
   ```typescript
   // Frontend - Clerk handles login
   const { getToken } = useAuth();
   const clerkToken = await getToken();
   ```

2. **Client Exchanges Clerk JWT for Custom JWT**
   ```typescript
   // Frontend calls Auth Service
   const response = await fetch('/api/auth/exchange', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${clerkToken}`
     }
   });
   
   const { accessToken } = await response.json();
   // Custom JWT: { sub: "user-id", role: "USER", ... }
   ```

3. **Auth Service Issues Custom JWT**
   ```typescript
   // Auth Service endpoint
   @Post('exchange')
   async exchangeToken(@Headers('authorization') auth: string) {
     // 1. Validate Clerk JWT
     const clerkToken = extractToken(auth);
     const clerkPayload = await clerk.verifyToken(clerkToken);
     
     // 2. Fetch user from DB
     const user = await usersService.findByClerkId(clerkPayload.sub);
     
     // 3. Issue custom JWT
     const customJWT = jwt.sign({
       sub: user.getId(),
       clerkId: user.getClerkId(),
       role: user.getRole(),
       channelId: user.getChannelId(),
     }, JWT_SECRET, { expiresIn: '1h' });
     
     return { accessToken: customJWT };
   }
   ```

4. **Client Uses Custom JWT**
   ```typescript
   // Frontend uses custom JWT
   fetch('/api/videos', {
     headers: {
       'Authorization': `Bearer ${customJWT}`
     }
   });
   ```

5. **API Gateway Validates Custom JWT**
   ```typescript
   // Gateway validates your custom JWT
   const payload = jwt.verify(token, JWT_SECRET);
   // Returns: { sub: "user-id", role: "USER", ... }
   
   // Add to headers (no DB lookup needed if role in token)
   request.headers['X-User-Id'] = payload.sub;
   request.headers['X-User-Role'] = payload.role;
   ```

### Pros
- ✅ **Full control** - Custom claims, structure
- ✅ **Decoupled from Clerk** - Easier to switch providers
- ✅ **Can include role** - No DB lookup at gateway
- ✅ **Standard JWT** - Works with any JWT library

### Cons
- ❌ **More complex** - Additional service
- ❌ **Extra step** - Token exchange required
- ❌ **More infrastructure** - Auth service to maintain

---

## Comparison

| Aspect | Direct Clerk JWT | Auth Service + Custom JWT |
|--------|------------------|---------------------------|
| **Complexity** | Simple | More complex |
| **Infrastructure** | Gateway only | Gateway + Auth Service |
| **Performance** | Fast (direct) | Slightly slower (exchange step) |
| **Flexibility** | Limited | High |
| **Custom Claims** | No | Yes |
| **Provider Lock-in** | Yes (Clerk) | No (can switch) |
| **DB Lookups** | At gateway | At auth service (or in token) |

---

## Recommended Approach

### For Your YouTube Clone: **Direct Clerk JWT**

**Why?**
1. **You're already using Clerk** - No need to add complexity
2. **Clerk handles everything** - Login, sessions, token management
3. **Simpler architecture** - One less service to maintain
4. **Good enough** - Gateway can fetch user from DB (cache it)

### Implementation

```typescript
// API Gateway (Kong/Nginx plugin or NestJS middleware)
async function validateRequest(request) {
  // 1. Extract Clerk JWT
  const token = extractToken(request);
  
  // 2. Verify with Clerk
  const clerkPayload = await clerk.verifyToken(token);
  
  // 3. Fetch user from DB (with caching)
  const cacheKey = `user:${clerkPayload.sub}`;
  let user = await redis.get(cacheKey);
  
  if (!user) {
    user = await usersService.findByClerkId(clerkPayload.sub);
    await redis.setex(cacheKey, 300, JSON.stringify(user)); // 5 min cache
  }
  
  // 4. Add headers
  request.headers['X-User-Id'] = user.id;
  request.headers['X-User-Role'] = user.role;
  request.headers['X-User-Channel-Id'] = user.channelId;
  
  return true;
}
```

---

## When to Use Auth Service

Use an **Auth Service** if you need:

1. **Multiple Auth Providers**
   - Clerk + Google OAuth + Custom login
   - Auth service normalizes to one JWT format

2. **Complex Custom Claims**
   - Need permissions, channel IDs, subscription status in token
   - Want to avoid DB lookups at gateway

3. **Token Customization**
   - Different token formats for different clients
   - Token versioning, rotation strategies

4. **Provider Independence**
   - Want to switch from Clerk later
   - Don't want to be locked into Clerk's JWT structure

---

## Hybrid Approach (Best of Both)

You can also use a **hybrid** approach:

### Flow

```
1. Client authenticates with Clerk → Gets Clerk JWT
2. Client calls Auth Service → Exchanges for custom JWT (optional)
3. Client uses custom JWT (or Clerk JWT) → Sends to Gateway
4. Gateway validates → Adds headers → Routes to services
```

### When to Exchange

- **First time** or **token expired**: Exchange Clerk JWT for custom JWT
- **Subsequent requests**: Use cached custom JWT
- **Gateway**: Validates either Clerk JWT or custom JWT

### Benefits

- ✅ **Flexibility** - Can use either token
- ✅ **Performance** - Cache custom JWT on client
- ✅ **Fallback** - Can always use Clerk JWT if auth service down

---

## Summary

### Do You Need an Auth Service?

**No, if:**
- ✅ Using Clerk for authentication
- ✅ Simple requirements
- ✅ Want minimal infrastructure
- ✅ Gateway can handle validation

**Yes, if:**
- ✅ Need custom JWT claims
- ✅ Multiple auth providers
- ✅ Want provider independence
- ✅ Complex token requirements

### Recommended for Your Case

**Start with Direct Clerk JWT** (no auth service):
- Simpler
- Faster to implement
- Less infrastructure
- Can add auth service later if needed

The gateway validates Clerk JWT and adds user context to headers. Services trust the gateway. This is sufficient for most use cases.

