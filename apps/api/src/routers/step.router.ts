import * as o from 'drizzle-orm';
import * as v from 'valibot';

import { stepInsertSchema, stepTable, stepUpdateSchema } from '@/database/schema';
import { procedure, router } from '@/trpc';

export const stepRouter = router({
  /**
   * Get all steps
   */
  getAll: procedure
    .query(async ({ ctx }) => {
      const steps = await ctx.db.query.stepTable.findMany({
        orderBy: [o.asc(stepTable.id)],
      });

      return steps || [];
    }),

  /**
   * Create a new step
   */
  create: procedure.input(stepInsertSchema).mutation(async ({ ctx, input }) => {
    const step = await ctx.db
      .insert(stepTable)
      .values(input)
      .returning()
      .then(steps => steps[0]);

    return step;
  }),

  /**
   * Update a step
   */
  update: procedure.input(v.object({
    stepId: v.string(),
    data: stepUpdateSchema,
  })).mutation(async ({ ctx, input }) => {
    const step = await ctx.db
      .update(stepTable)
      .set(input.data)
      .where(o.eq(stepTable.stepId, input.stepId!))
      .returning()
      .then(steps => steps[0]);

    return step;
  }),

  /**
   * Delete a step
   */
  delete: procedure.input(v.object({ stepId: v.string() })).mutation(async ({ ctx, input }) => {
    const step = await ctx.db
      .delete(stepTable)
      .where(o.eq(stepTable.stepId, input.stepId!))
      .returning()
      .then(steps => steps[0]);

    return step;
  }),

  /**
   * Reorder steps for a recipe
   */
  reorder: procedure
    .input(
      v.object({
        recipeId: v.string(),
        steps: v.array(
          v.object({
            stepId: v.string(),
            order: v.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updates = input.steps.map(step => ({
        stepId: step.stepId,
        order: step.order,
      }));

      const updatedSteps = await Promise.all(
        updates.map(update =>
          ctx.db
            .update(stepTable)
            .set({ order: update.order })
            .where(o.eq(stepTable.stepId, update.stepId!))
            .returning()
            .then(steps => steps[0]),
        ),
      );

      return updatedSteps;
    }),
});
