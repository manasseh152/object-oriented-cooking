import { createTRPCClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

import type { AppRouter } from '@/routers/_app.router';

/**
 * Create a tRPC client for testing
 */
export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      transformer: superjson,
    }),
  ],
});
