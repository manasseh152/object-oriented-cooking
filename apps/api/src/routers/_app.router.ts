import { procedure, router } from '@/trpc';

import { measurementUnitRouter } from './measurement-unit.router';

/**
 * Root router that merges all domain-specific routers
 */
export const appRouter = router({
  /**
   * Health check router
   */
  health: router({
    /**
     * Health check endpoint
     */
    get: procedure.query(() => 'ok'),
  }),
  /**
   * Measurement unit router
   */
  measurementUnit: measurementUnitRouter,
  /**
   * Add more routers here as needed
   */
});

// Export type definition of API
export type AppRouter = typeof appRouter;
