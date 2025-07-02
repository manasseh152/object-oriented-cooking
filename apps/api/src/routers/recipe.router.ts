import * as o from 'drizzle-orm';
import * as v from 'valibot';

import { recipeIngredientInsertSchema, recipeIngredientTable, recipeIngredientUpdateSchema, recipeInsertSchema, recipeTable, recipeUpdateSchema } from '@/database/schema';
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
          columns: {
            recipeIngredientId: true,
          },
        },
        steps: {
          columns: {
            stepId: true,
          },
        },
        children: {
          columns: {
            id: true,
          },
        },
        parentRecipe: {
          columns: {
            id: true,
          },
        },
        recipeTags: {
          columns: {
            tagId: true,
          },
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
  update: procedure.input(v.object({
    recipeId: v.string(),
    data: recipeUpdateSchema,
  })).mutation(async ({ ctx, input }) => {
    const recipe = await ctx.db
      .update(recipeTable)
      .set(input.data)
      .where(o.eq(recipeTable.recipeId, input.recipeId!))
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
      .where(o.eq(recipeTable.recipeId, input.recipeId!))
      .returning()
      .then(recipes => recipes[0]);

    return recipe;
  },
  ),
  /**
   * Recipe ingredients router
   */
  ingredients: router({
    getAll: procedure.query(async ({ ctx }) => {
      const ingredients = await ctx.db.query.recipeIngredientTable.findMany({
        with: {
          ingredient: {
            columns: {
              ingredientId: true,
            },
          },
          recipe: {
            columns: {
              id: true,
            },
          },
          unit: {
            columns: {
              measurementUnitId: true,
            },
          },
        },
      });

      return ingredients;
    }),
    create: procedure.input(recipeIngredientInsertSchema).mutation(async ({ ctx, input }) => {
      const ingredient = await ctx.db.insert(recipeIngredientTable).values(input).returning();
      return ingredient;
    }),
    update: procedure.input(recipeIngredientUpdateSchema).mutation(async ({ ctx, input }) => {
      const ingredient = await ctx.db.update(recipeIngredientTable).set(input).where(o.eq(recipeIngredientTable.recipeIngredientId, input.recipeIngredientId!)).returning();
      return ingredient;
    }),
    delete: procedure.input(v.object({ recipeIngredientId: v.string() })).mutation(async ({ ctx, input }) => {
      const ingredient = await ctx.db.delete(recipeIngredientTable).where(o.eq(recipeIngredientTable.recipeIngredientId, input.recipeIngredientId!)).returning();
      return ingredient;
    }),
  }),
});
