import { defineConfig } from 'drizzle-kit';

import { env } from './src/config/env';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema',
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
