import * as o from 'drizzle-orm';
import * as v from 'valibot';

import { tagInsertSchema, tagTable, tagUpdateSchema } from '@/database/schema';
import { procedure, router } from '@/trpc';

export const tagRouter = router({
  /**
   * Get all tags
   */
  getAll: procedure.query(async ({ ctx }) => {
    const tags = await ctx.db.query.tagTable.findMany({
      orderBy: o.asc(tagTable.id),
      with: {
        parent: {
          columns: {
            tagId: true,
          },
        },
        children: {
          columns: {
            tagId: true,
          },
        },
      },
    });

    return tags || [];
  }),
  /**
   * Create a new tag
   */
  create: procedure
    .input(tagInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const tag = await ctx.db
        .insert(tagTable)
        .values(input)
        .returning()
        .then(tags => tags[0]);

      return tag;
    }),
  /**
   * Update a tag
   */
  update: procedure.input(tagUpdateSchema).mutation(async ({ ctx, input }) => {
    const tag = await ctx.db
      .update(tagTable)
      .set(input)
      .where(o.eq(tagTable.id, Number(input.tagId)))
      .returning()
      .then(tags => tags[0]);

    return tag;
  }),
  /**
   * Delete a tag
   */
  delete: procedure.input(v.object({ tagId: v.string() })).mutation(async ({ ctx, input }) => {
    const tag = await ctx.db
      .delete(tagTable)
      .where(o.eq(tagTable.id, Number(input.tagId)))
      .returning()
      .then(tags => tags[0]);

    return tag;
  },
  ),
});
