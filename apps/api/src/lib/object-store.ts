import { S3Client } from 'bun';

import { env } from '@/config/env';

export const s3 = new S3Client({
  endpoint: env.MINIO_URL,
  accessKeyId: env.MINIO_ACCESS_KEY,
  secretAccessKey: env.MINIO_SECRET_KEY,
  bucket: env.MINIO_BUCKET,
});

export type S3 = typeof s3;
