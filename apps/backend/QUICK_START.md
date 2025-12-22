# Quick Start Guide

## ✅ What's Been Created

All backend files for video upload and streaming with 2 quality versions (original + 720p) are now in place!

## 📁 Files Created

```
apps/backend/src/
├── shared/
│   ├── config/
│   │   └── aws.config.ts          ← AWS configuration
│   └── aws/
│       ├── s3.service.ts           ← S3 operations
│       └── aws.module.ts           ← AWS module
│
└── modules/
    └── videos/
        ├── videos.module.ts        ← Videos module
        ├── videos.controller.ts    ← API endpoints
        ├── videos.service.ts       ← Business logic
        ├── services/
        │   ├── video-storage.service.ts      ← Storage operations
        │   └── video-transcoding.service.ts  ← Transcoding (720p only)
        └── dto/
            ├── request-upload-url.dto.ts     ← Upload request validation
            └── complete-upload.dto.ts         ← Complete upload validation
```

## 🚀 Next Steps

### 1. Install Dependencies

```bash
cd apps/backend
yarn install
```

This will install:
- `@aws-sdk/client-s3` - S3 operations
- `@aws-sdk/s3-request-presigner` - Presigned URLs
- `@aws-sdk/client-mediaconvert` - Video transcoding
- `class-validator` & `class-transformer` - DTO validation
- `uuid` - Generate unique IDs

### 2. Set Up AWS

1. **Create S3 Bucket**
   ```bash
   # AWS Console → S3 → Create bucket
   # Name: youtube-clone-videos (or your choice)
   # Region: us-east-1
   ```

2. **Create CloudFront Distribution**
   ```bash
   # AWS Console → CloudFront → Create distribution
   # Origin: Your S3 bucket
   # Get the domain (e.g., d1234567890.cloudfront.net)
   ```

3. **Create IAM User**
   ```bash
   # AWS Console → IAM → Create user
   # Attach policy with S3 and MediaConvert permissions
   # Get Access Key ID and Secret Access Key
   ```

4. **Create MediaConvert Role**
   ```bash
   # AWS Console → IAM → Create role
   # Service: MediaConvert
   # Allow access to S3 bucket
   # Copy the role ARN
   ```

### 3. Create .env File

```bash
cd apps/backend
cp .env.example .env
```

Then edit `.env` with your AWS credentials:

```env
PORT=3000
FRONTEND_URL=http://localhost:3001

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=youtube-clone-videos
AWS_CLOUDFRONT_DOMAIN=d1234567890.cloudfront.net
AWS_MEDIACONVERT_ROLE=arn:aws:iam::123456789012:role/MediaConvert_Default_Role
```

### 4. Start the Server

```bash
yarn start:dev
```

You should see:
```
🚀 Backend server running on port 3000
```

## 🧪 Test the API

### Test Upload Request

```bash
curl -X POST http://localhost:3000/videos/upload/request \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "test-video.mp4",
    "contentType": "video/mp4"
  }'
```

**Expected Response:**
```json
{
  "uploadUrl": "https://s3.amazonaws.com/...",
  "videoKey": "videos/temp-user-id/uuid-here/original.mp4",
  "videoId": "uuid-here"
}
```

### Test Complete Upload

```bash
curl -X POST http://localhost:3000/videos/upload/complete \
  -H "Content-Type: application/json" \
  -d '{
    "videoKey": "videos/temp-user-id/uuid-here/original.mp4",
    "title": "Test Video",
    "description": "This is a test"
  }'
```

## 📝 Important Notes

### What Works Now
- ✅ Generate presigned URLs for upload
- ✅ Complete upload endpoint
- ✅ Start transcoding job (720p only)
- ✅ Get streaming URLs

### What Needs Implementation
- ⏳ Database integration (save video metadata)
- ⏳ Authentication (get real userId)
- ⏳ Error handling for transcoding failures
- ⏳ Video retrieval from database

### Current Limitations
- Uses temporary userId (`temp-user-id`)
- No database storage (videos not saved)
- Auth is commented out
- Get video endpoint returns error (needs database)

## 🎯 Architecture Overview

```
1. Frontend → POST /videos/upload/request
   ↓
2. Backend → Generate presigned URL
   ↓
3. Frontend → Upload directly to S3
   ↓
4. Frontend → POST /videos/upload/complete
   ↓
5. Backend → Start transcoding (720p HLS)
   ↓
6. MediaConvert → Creates 720p segments → S3
   ↓
7. Video ready! (original + 720p available)
```

## 🔧 Next Implementation Steps

1. **Add Database** (Prisma/TypeORM)
   - Create Video model
   - Save video metadata
   - Track processing status

2. **Add Authentication**
   - Integrate Clerk
   - Get real userId
   - Protect routes

3. **Add Error Handling**
   - Handle transcoding failures
   - Update video status
   - Retry logic

4. **Test End-to-End**
   - Upload a real video
   - Wait for transcoding
   - Test streaming

## 💡 Tips

- Check AWS MediaConvert console to see transcoding jobs
- Check S3 bucket to see uploaded files
- Transcoding takes 5-10 minutes for a 10-minute video
- 720p HLS will be available at: `videos/{userId}/{videoId}/hls/720p/playlist.m3u8`

Happy coding! 🚀

