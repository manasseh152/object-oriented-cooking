import { procedure, router } from '@/trpc';

import { ingredientRouter } from './ingredient.router';
import { measurementUnitRouter } from './measurement-unit.router';
import { recipeRouter } from './recipe.router';
import { stepRouter } from './step.router';
import { tagRouter } from './tag.router';

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
   * Recipe router
   */
  recipe: recipeRouter,
  /**
   * Tag router
   */
  tag: tagRouter,
  /**
   * Ingredient router
   */
  ingredient: ingredientRouter,
  /**
   * Step router
   */
  step: stepRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
