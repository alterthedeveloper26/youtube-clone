# Video Upload & Streaming Implementation Notes

## What's Implemented

✅ **AWS S3 Service** - Handles file uploads and storage
✅ **Video Storage Service** - Manages video file operations
✅ **Video Transcoding Service** - Creates 720p HLS version (simplified for learning)
✅ **Videos Controller** - API endpoints for upload and retrieval
✅ **Videos Service** - Business logic for video operations
✅ **DTOs** - Request validation

## Setup Instructions

### 1. Install Dependencies

```bash
cd apps/backend
yarn install
```

### 2. Configure Environment Variables

Create a `.env` file in `apps/backend/`:

```env
PORT=3000
FRONTEND_URL=http://localhost:3001

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_BUCKET=your-bucket-name
AWS_CLOUDFRONT_DOMAIN=d1234567890.cloudfront.net
AWS_MEDIACONVERT_ROLE=arn:aws:iam::123456789012:role/MediaConvert_Default_Role
```

### 3. AWS Setup Required

1. **Create S3 Bucket**
   - Name: `your-bucket-name`
   - Region: `us-east-1` (or your preferred)
   - Block public access: Yes (we use CloudFront)

2. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Viewer protocol: HTTPS only
   - Get the CloudFront domain (e.g., `d1234567890.cloudfront.net`)

3. **Create IAM User/Role**
   - Permissions needed:
     - `s3:PutObject`
     - `s3:GetObject`
     - `s3:DeleteObject`
     - `mediaconvert:*`

4. **Setup MediaConvert Role**
   - Create IAM role for MediaConvert
   - Allow MediaConvert to access S3 bucket

### 4. Run the Server

```bash
yarn start:dev
```

## API Endpoints

### 1. Request Upload URL

```http
POST /videos/upload/request
Content-Type: application/json

{
  "filename": "my-video.mp4",
  "contentType": "video/mp4"
}
```

**Response:**
```json
{
  "uploadUrl": "https://s3.amazonaws.com/...",
  "videoKey": "videos/user123/video456/original.mp4",
  "videoId": "uuid-here"
}
```

### 2. Complete Upload

```http
POST /videos/upload/complete
Content-Type: application/json

{
  "videoKey": "videos/user123/video456/original.mp4",
  "title": "My Awesome Video",
  "description": "Video description"
}
```

**Response:**
```json
{
  "id": "video-id",
  "title": "My Awesome Video",
  "description": "Video description",
  "videoKey": "videos/user123/video456/original.mp4",
  "streamingUrls": {
    "original": "https://cdn.example.com/videos/.../original.mp4",
    "720p": "https://cdn.example.com/videos/.../hls/720p/playlist.m3u8"
  },
  "processingStatus": "processing",
  "message": "Upload complete! Video is being processed..."
}
```

### 3. Get Video

```http
GET /videos/:id
```

**Note:** This endpoint requires database integration (currently returns error).

## What's Next (TODO)

1. **Database Integration**
   - Set up Prisma/TypeORM
   - Create Video model
   - Implement VideosRepository
   - Update VideosService to use repository

2. **Authentication**
   - Set up Clerk integration
   - Uncomment AuthGuard in controller
   - Get actual userId from auth

3. **Error Handling**
   - Add proper error handling
   - Handle transcoding failures
   - Update video status in database

4. **Testing**
   - Test upload flow
   - Test transcoding
   - Test streaming URLs

## Architecture

```
VideosController
    ↓
VideosService
    ↓
    ├── VideoStorageService → S3Service
    └── VideoTranscodingService → MediaConvert
```

## Storage Structure

```
S3 Bucket:
videos/
├── {userId}/
│   ├── {videoId}/
│   │   ├── original.mp4          ← Original uploaded video
│   │   └── hls/
│   │       └── 720p/
│   │           ├── playlist.m3u8
│   │           └── segment_*.ts
```

## Notes

- Only 2 quality versions: Original + 720p HLS
- Transcoding happens asynchronously
- Video status should be tracked in database (pending implementation)
- Auth is commented out (add when ready)

