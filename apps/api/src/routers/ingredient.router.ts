import * as o from 'drizzle-orm';
import * as v from 'valibot';

import { ingredientInsertSchema, ingredientTable, ingredientUpdateSchema } from '@/database/schema';
import { procedure, router } from '@/trpc';

export const ingredientRouter = router({
  /**
   * Get all ingredients
   */
  getAll: procedure.query(async ({ ctx }) => {
    const ingredients = await ctx.db.query.ingredientTable.findMany({
      orderBy: o.asc(ingredientTable.id),
    });

    return ingredients || [];
  }),

  /**
   * Create a new ingredient
   */
  create: procedure.input(ingredientInsertSchema).mutation(async ({ ctx, input }) => {
    const ingredient = await ctx.db
      .insert(ingredientTable)
      .values(input)
      .returning()
      .then(ingredients => ingredients[0]);

    return ingredient;
  }),

  /**
   * Update an ingredient
   */
  update: procedure.input(ingredientUpdateSchema).mutation(async ({ ctx, input }) => {
    const ingredient = await ctx.db
      .update(ingredientTable)
      .set(input)
      .where(o.eq(ingredientTable.id, Number(input.ingredientId)))
      .returning()
      .then(ingredients => ingredients[0]);

    return ingredient;
  }),

  /**
   * Delete an ingredient
   */
  delete: procedure.input(v.object({ ingredientId: v.string() })).mutation(async ({ ctx, input }) => {
    const ingredient = await ctx.db
      .delete(ingredientTable)
      .where(o.eq(ingredientTable.id, Number(input.ingredientId)))
      .returning()
      .then(ingredients => ingredients[0]);

    return ingredient;
  }),
});
