"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_CONFIG = exports.mediaConvertClient = exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const client_mediaconvert_1 = require("@aws-sdk/client-mediaconvert");
exports.s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
exports.mediaConvertClient = new client_mediaconvert_1.MediaConvertClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
exports.AWS_CONFIG = {
    S3_BUCKET: process.env.AWS_S3_BUCKET,
    CLOUDFRONT_DOMAIN: process.env.AWS_CLOUDFRONT_DOMAIN,
    MEDIACONVERT_ROLE: process.env.AWS_MEDIACONVERT_ROLE,
    REGION: process.env.AWS_REGION || 'us-east-1',
};
//# sourceMappingURL=aws.config.js.map