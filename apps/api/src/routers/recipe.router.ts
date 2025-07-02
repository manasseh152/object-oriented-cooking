import * as o from 'drizzle-orm';
import * as v from 'valibot';

import { recipeInsertSchema, recipeTable, recipeUpdateSchema } from '@/database/schema';
import { procedure, router } from '@/trpc';

export const recipeRouter = router({
  /**
   * Get all recipes
   */
  getAll: procedure.query(async ({ ctx }) => {
    const recipes = await ctx.db.query.recipeTable.findMany({
      orderBy: o.asc(recipeTable.id),
      with: {
        tag: {
          columns: {
            tagId: true,
          },
        },
        ingredients: {
          with: {
            ingredient: {
              columns: {
                ingredientId: true,
              },
            },
            unit: {
              columns: {
                measurementUnitId: true,
              },
            },
          },
        },
        steps: {

        },
      },
    });

    return recipes || [];
  }),
  /**
   * Create a new recipe
   */
  create: procedure.input(recipeInsertSchema).mutation(async ({ ctx, input }) => {
    const recipe = await ctx.db
      .insert(recipeTable)
      .values(input)
      .returning()
      .then(recipes => recipes[0]);

    return recipe;
  }),
  /**
   * Update a recipe
   */
  update: procedure.input(recipeUpdateSchema).mutation(async ({ ctx, input }) => {
    const recipe = await ctx.db
      .update(recipeTable)
      .set(input)
      .where(o.eq(recipeTable.id, Number(input.recipeId)))
      .returning()
      .then(recipes => recipes[0]);

    return recipe;
  }),
  /**
   * Delete a recipe
   */
  delete: procedure.input(v.object({ recipeId: v.string() })).mutation(async ({ ctx, input }) => {
    const recipe = await ctx.db
      .delete(recipeTable)
      .where(o.eq(recipeTable.id, Number(input.recipeId)))
      .returning()
      .then(recipes => recipes[0]);

    return recipe;
  },
  ),
});
