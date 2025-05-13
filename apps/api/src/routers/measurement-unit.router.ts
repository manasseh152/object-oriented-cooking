import { eq, isNotNull } from 'drizzle-orm';
import * as v from 'valibot';

import { measurementUnitInsertSchema, measurementUnitTable, measurementUnitUpdateSchema } from '@/database/schema';
import { procedure, router } from '@/trpc';

export const measurementUnitRouter = router({
  /**
   * Get all measurement units
   */
  getAll: procedure.query(async ({ ctx }) => {
    const measurementUnits = await ctx.db
      .select()
      .from(measurementUnitTable)
      .where(isNotNull(measurementUnitTable.id))
      .orderBy(measurementUnitTable.name);

    return measurementUnits || [];
  }),
  /**
   * Get a measurement unit by client id
   */
  getById: procedure
    .input(v.object({ unitId: v.string() }))
    .query(async ({ ctx, input }) => {
      const measurementUnit = await ctx.db
        .select()
        .from(measurementUnitTable)
        .where(eq(measurementUnitTable.unitId, input.unitId))
        .limit(1)
        .then(measurementUnits => measurementUnits[0]);

      return measurementUnit;
    }),
  /**
   * Create a new measurement unit
   */
  create: procedure
    .input(measurementUnitInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const measurementUnit = await ctx.db
        .insert(measurementUnitTable)
        .values(input)
        .returning()
        .then(measurementUnits => measurementUnits[0]);

      return measurementUnit;
    },
    ),
  /**
   * Update a measurement unit
   */
  update: procedure
    .input(v.object({
      unitId: v.string(),
      data: measurementUnitUpdateSchema,
    }))
    .mutation(async ({ ctx, input }) => {
      const measurementUnit = await ctx.db
        .update(measurementUnitTable)
        .set(input.data)
        .where(eq(measurementUnitTable.unitId, input.unitId))
        .returning()
        .then(measurementUnits => measurementUnits[0]);

      return measurementUnit;
    },
    ),
  /**
   * Delete a measurement unit
   */
  delete: procedure
    .input(v.object({ unitId: v.string() }))
    .mutation(async ({ ctx, input }) => {
      const measurementUnit = await ctx.db
        .delete(measurementUnitTable)
        .where(eq(measurementUnitTable.unitId, input.unitId))
        .returning()
        .then(measurementUnits => measurementUnits[0]);

      return measurementUnit;
    },
    ),
});
