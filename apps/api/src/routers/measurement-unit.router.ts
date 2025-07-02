import * as o from 'drizzle-orm';
import * as v from 'valibot';

import { measurementUnitInsertSchema, measurementUnitTable, measurementUnitUpdateSchema } from '@/database/schema';
import { procedure, router } from '@/trpc';

export const measurementUnitRouter = router({
  /**
   * Get all measurement units
   */
  getAll: procedure.query(async ({ ctx }) => {
    const measurementUnits = await ctx.db.query.measurementUnitTable.findMany({
      orderBy: o.asc(measurementUnitTable.id),
      with: {
        baseUnit: {
          columns: {
            measurementUnitId: true,
          },
        },
      },
    });

    return measurementUnits || [];
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
      measurementUnitId: v.string(),
      data: measurementUnitUpdateSchema,
    }))
    .mutation(async ({ ctx, input }) => {
      const measurementUnit = await ctx.db
        .update(measurementUnitTable)
        .set(input.data)
        .where(o.eq(measurementUnitTable.measurementUnitId, input.measurementUnitId))
        .returning()
        .then(measurementUnits => measurementUnits[0]);

      return measurementUnit;
    },
    ),
  /**
   * Delete a measurement unit
   */
  delete: procedure
    .input(v.object({ measurementUnitId: v.string() }))
    .mutation(async ({ ctx, input }) => {
      const measurementUnit = await ctx.db
        .delete(measurementUnitTable)
        .where(o.eq(measurementUnitTable.measurementUnitId, input.measurementUnitId))
        .returning()
        .then(measurementUnits => measurementUnits[0]);

      return measurementUnit;
    },
    ),
});
