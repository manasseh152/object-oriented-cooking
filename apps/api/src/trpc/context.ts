import type { DB } from '@/database';
import type { S3 } from '@/lib/object-store';

/**
 * Context interface for tRPC procedures
 */
export type Context = {
  db: DB;
  s3: S3;
};

type CreateContextOptions = {
  db: DB;
  s3: S3;
};

/**
 * Creates the tRPC context for each request
 */
export function createContext({ db, s3 }: CreateContextOptions): Context {
  return {
    db,
    s3,
  };
}
