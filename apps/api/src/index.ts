import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { env } from '@/config/env';
import { appRouter } from '@/routers/_app.router';
import { createContext } from '@/trpc/context';

// Create Hono app
const app = new Hono();

// Apply global middleware
app.use('*', logger());
app.use('*', cors({
  origin: env.CORS_ORIGIN.split(','),
  credentials: true,
}));

// Health check endpoint
app.get('/health', c => c.json({ status: 'ok' }));

// Mount tRPC API
app.use('/trpc/*', trpcServer({
  router: appRouter,
  createContext,
}));

// Export for Bun
export default {
  port: env.PORT,
  fetch: app.fetch,
} satisfies Bun.Serve;
