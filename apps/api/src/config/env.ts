import 'dotenv/config';
import * as v from 'valibot';

export const NODE_ENV_PICKLIST = ['development', 'production', 'test'] as const;

export const envSchema = v.object({
  NODE_ENV: v.pipe(v.string(), v.picklist(NODE_ENV_PICKLIST)),
  PORT: v.pipe(v.string(), v.transform(Number)),
  CORS_ORIGIN: v.pipe(v.string(), v.nonEmpty()),
  DATABASE_URL: v.pipe(v.string(), v.url()),
  SECRET: v.pipe(v.string(), v.nonEmpty()),
  MINIO_URL: v.pipe(v.string(), v.url()),
  MINIO_ACCESS_KEY: v.pipe(v.string(), v.nonEmpty()),
  MINIO_SECRET_KEY: v.pipe(v.string(), v.nonEmpty()),
  MINIO_BUCKET: v.pipe(v.string(), v.nonEmpty()),
});

export type Env = v.InferOutput<typeof envSchema>;

// eslint-disable-next-line node/no-process-env
export const env = v.parse(envSchema, process.env);
