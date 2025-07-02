import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-valibot';

import { commonTimestamps } from '../config';
import { recipeTable } from './recipes';

// Tags for recipes
export const tagTable = t.pgTable(
  'tags',
  {
    id: t.serial('id').primaryKey(),
    tagId: t
      .uuid('tag_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    parentId: t
      .integer('parent_id')
      .references((): t.AnyPgColumn => tagTable.id, { onDelete: 'cascade' }),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    color: t.varchar('color', { length: 7 }).notNull(),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_tags_tag_id').on(table.tagId),
    t.index('idx_tags_name').on(table.name),
  ],
);

// Recipe-tag junction table
export const recipeTagTable = t.pgTable(
  'recipe_tags',
  {
    id: t.serial('id').primaryKey(),
    recipeId: t
      .integer('recipe_id')
      .notNull()
      .references(() => recipeTable.id, { onDelete: 'cascade' }),
    tagId: t
      .integer('tag_id')
      .notNull()
      .references(() => tagTable.id, { onDelete: 'cascade' }),
  },
  table => [
    t.index('idx_recipe_tags_recipe_id').on(table.recipeId),
    t.index('idx_recipe_tags_tag_id').on(table.tagId),
  ],
);

// Relations
export const tagRelations = relations(tagTable, ({ many, one }) => ({
  parent: one(tagTable, {
    fields: [tagTable.parentId],
    references: [tagTable.id],
    relationName: 'tag:parent',
  }),
  children: many(tagTable, {
    relationName: 'tag:parent',
  }),
  recipes: many(recipeTagTable, { relationName: 'tag:recipes' }),
}));

export const recipeTagRelations = relations(recipeTagTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [recipeTagTable.recipeId],
    references: [recipeTable.id],
    relationName: 'recipe:tag',
  }),
  tag: one(tagTable, {
    fields: [recipeTagTable.tagId],
    references: [tagTable.id],
    relationName: 'tag:recipe',
  }),
}));

// Schemas
export const tagSelectSchema = createSelectSchema(tagTable);
export const tagInsertSchema = createInsertSchema(tagTable);
export const tagUpdateSchema = createUpdateSchema(tagTable);
export type Tag = typeof tagTable.$inferSelect;
export type TagInsert = typeof tagTable.$inferInsert;

export const recipeTagSelectSchema = createSelectSchema(recipeTagTable);
export const recipeTagInsertSchema = createInsertSchema(recipeTagTable);
export const recipeTagUpdateSchema = createUpdateSchema(recipeTagTable);
export type RecipeTag = typeof recipeTagTable.$inferSelect;
export type RecipeTagInsert = typeof recipeTagTable.$inferInsert;
