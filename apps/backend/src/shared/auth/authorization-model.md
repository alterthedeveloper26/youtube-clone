# Authorization Model for YouTube Clone

## Overview

Hybrid model combining:

1. **Role-Based Access Control (RBAC)** - System-level roles
2. **Resource-Based Authorization** - Ownership-based permissions
3. **Permission-Based System** - Fine-grained actions

## System Roles

### 1. **USER** (Default)

- Can create channels
- Can upload videos to own channels
- Can comment, like, subscribe
- Can create playlists
- Can view public/unlisted videos

### 2. **MODERATOR**

- All USER permissions
- Can moderate content (flag, review)
- Can hide/remove comments
- Can view private videos for moderation

### 3. **ADMIN**

- All MODERATOR permissions
- Can delete any video/channel
- Can ban users
- Can manage system settings
- Can view all videos (including private)

## Resource Ownership

### Video Ownership

- **Owner**: Channel owner (user who owns the channel)
- **Permissions**: Edit, delete, update visibility, view analytics

### Channel Ownership

- **Owner**: User who created the channel
- **Permissions**: Edit channel, upload videos, manage videos, view analytics

## Permission Matrix

| Action           | Public | Unlisted       | Private | Owner | Moderator | Admin |
| ---------------- | ------ | -------------- | ------- | ----- | --------- | ----- |
| View Video       | ✅     | ✅ (with link) | ❌      | ✅    | ✅        | ✅    |
| Upload Video     | ❌     | ❌             | ❌      | ✅    | ✅        | ✅    |
| Edit Video       | ❌     | ❌             | ❌      | ✅    | ❌        | ✅    |
| Delete Video     | ❌     | ❌             | ❌      | ✅    | ❌        | ✅    |
| Comment          | ✅     | ✅             | ❌      | ✅    | ✅        | ✅    |
| Like/Dislike     | ✅     | ✅             | ❌      | ✅    | ✅        | ✅    |
| Moderate Content | ❌     | ❌             | ❌      | ❌    | ✅        | ✅    |

## Implementation Structure

### 1. Permissions Enum

```typescript
enum Permission {
  // Video permissions
  VIDEO_VIEW = 'video:view',
  VIDEO_CREATE = 'video:create',
  VIDEO_EDIT = 'video:edit',
  VIDEO_DELETE = 'video:delete',
  VIDEO_PUBLISH = 'video:publish',

  // Channel permissions
  CHANNEL_VIEW = 'channel:view',
  CHANNEL_EDIT = 'channel:edit',
  CHANNEL_DELETE = 'channel:delete',

  // Comment permissions
  COMMENT_CREATE = 'comment:create',
  COMMENT_EDIT = 'comment:edit',
  COMMENT_DELETE = 'comment:delete',
  COMMENT_MODERATE = 'comment:moderate',

  // Admin permissions
  USER_BAN = 'user:ban',
  CONTENT_MODERATE = 'content:moderate',
  SYSTEM_MANAGE = 'system:manage',
}
```

### 2. Roles Configuration

```typescript
const ROLE_PERMISSIONS = {
  USER: [
    Permission.VIDEO_VIEW,
    Permission.VIDEO_CREATE,
    Permission.CHANNEL_VIEW,
    Permission.CHANNEL_EDIT,
    Permission.COMMENT_CREATE,
    Permission.COMMENT_EDIT,
  ],
  MODERATOR: [
    ...ROLE_PERMISSIONS.USER,
    Permission.COMMENT_MODERATE,
    Permission.CONTENT_MODERATE,
  ],
  ADMIN: [
    ...ROLE_PERMISSIONS.MODERATOR,
    Permission.VIDEO_DELETE,
    Permission.CHANNEL_DELETE,
    Permission.USER_BAN,
    Permission.SYSTEM_MANAGE,
  ],
};
```

## Authorization Checks

### 1. Video Visibility Check

```typescript
// Can user view this video?
- If PUBLIC: Anyone can view
- If UNLISTED: Anyone with link can view
- If PRIVATE: Only owner can view
- Moderator/Admin: Can view all
```

### 2. Ownership Check

```typescript
// Can user edit/delete this video?
- Check if user owns the channel that owns the video
- OR user is ADMIN
```

### 3. Permission Check

```typescript
// Does user have permission to perform action?
- Check user's role
- Check role's permissions
- Check resource ownership (if applicable)
```

## Guards & Decorators

### Guards

1. `@Roles('USER', 'MODERATOR', 'ADMIN')` - Check user role
2. `@RequirePermission(Permission.VIDEO_CREATE)` - Check specific permission
3. `@OwnsResource('video')` - Check resource ownership
4. `@CanViewVideo()` - Check video visibility + permissions

### Decorators

1. `@CurrentUser()` - Get current authenticated user
2. `@CurrentUserRole()` - Get current user's role
3. `@ResourceOwner()` - Get resource owner for ownership checks

## Example Usage

```typescript
// Upload video - requires authentication + video:create permission
@Post('upload/request')
@UseGuards(AuthGuard, RequirePermissionGuard(Permission.VIDEO_CREATE))
async requestUploadUrl(@CurrentUser() userId: string) { }

// Edit video - requires ownership OR admin
@Patch(':id')
@UseGuards(AuthGuard, OwnsResourceGuard('video'))
async updateVideo(@Param('id') id: string) { }

// View video - check visibility
@Get(':id')
@UseGuards(CanViewVideoGuard)
async findOne(@Param('id') id: string) { }

// Delete video - requires ownership OR admin
@Delete(':id')
@UseGuards(
  AuthGuard,
  RequirePermissionGuard(Permission.VIDEO_DELETE),
  OwnsResourceGuard('video')
)
async deleteVideo(@Param('id') id: string) { }
```

## Database Schema

### User Role

```sql
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'USER';
-- Values: 'USER', 'MODERATOR', 'ADMIN'
```

### Channel Ownership

```sql
-- Already exists: channels.userId
-- This defines channel ownership
```

### Video Ownership

```sql
-- Videos belong to channels (videos.channelId)
-- Channel owner = Video owner
```

## Security Considerations

1. **Always verify ownership** - Don't trust client-provided IDs
2. **Check visibility** - Enforce video visibility rules
3. **Rate limiting** - Prevent abuse (upload limits, comment spam)
4. **Audit logging** - Log all sensitive actions
5. **Input validation** - Validate all inputs
6. **CORS** - Properly configure CORS
7. **Token validation** - Verify Clerk tokens on every request
