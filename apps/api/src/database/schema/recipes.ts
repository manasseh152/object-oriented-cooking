import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-valibot';
import * as v from 'valibot';

import { commonTimestamps } from '../config';
import { measurementUnitTable } from './measurements';
import { tagTable } from './tags';

export const RECIPE_DIFFICULTY = ['easy', 'medium', 'hard', 'expert'] as const;
export const recipeDifficulty = t.pgEnum('recipe_difficulty', RECIPE_DIFFICULTY);
export const recipeDifficultyPicklist = v.picklist(RECIPE_DIFFICULTY, 'Recipe Difficulty');
export type RecipeDifficulty = (typeof RECIPE_DIFFICULTY)[number];

// Ingredients table
export const ingredientTable = t.pgTable(
  'ingredients',
  {
    id: t.serial('id').primaryKey(),
    ingredientId: t
      .uuid('ingredient_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    description: t.text('description'),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_ingredients_ingredient_id').on(table.ingredientId),
    t.index('idx_ingredients_name').on(table.name),
  ],
);

// Recipes table
export const recipeTable = t.pgTable(
  'recipes',
  {
    id: t.serial('id').primaryKey(),
    recipeId: t
      .uuid('recipe_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    parentRecipeId: t
      .integer('parent_recipe_id')
      .references((): t.AnyPgColumn => recipeTable.id),
    tagId: t
      .integer('tag_id')
      .references(() => tagTable.id),
    title: t.varchar('title', { length: 255 }).notNull(),
    description: t.text('description'),
    instructions: t.text('instructions').notNull(),
    prepTime: t.integer('prep_time').notNull(), // in minutes
    cookTime: t.integer('cook_time').notNull(), // in minutes
    servings: t.integer('servings').notNull(),
    difficulty: recipeDifficulty('difficulty').default('medium'),
    notes: t.text('notes'),
    isPublished: t.boolean('is_published').default(false),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_recipes_recipe_id').on(table.recipeId),
    t.index('idx_recipes_tag_id').on(table.tagId),
    t.index('idx_recipes_title').on(table.title),
    t.index('idx_recipes_difficulty').on(table.difficulty),
    t.index('idx_recipes_is_published').on(table.isPublished),
  ],
);

// Recipe ingredients junction table with quantities
export const recipeIngredientTable = t.pgTable(
  'recipe_ingredients',
  {
    id: t.serial('id').primaryKey(),
    recipeId: t
      .integer('recipe_id')
      .notNull()
      .references(() => recipeTable.id, { onDelete: 'cascade' }),
    ingredientId: t
      .integer('ingredient_id')
      .notNull()
      .references(() => ingredientTable.id, { onDelete: 'cascade' }),
    unitId: t
      .integer('unit_id')
      .references(() => measurementUnitTable.id),
    quantity: t.doublePrecision('quantity').notNull(),
    isOptional: t.boolean('is_optional').default(false),
    notes: t.text('notes'),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_recipe_ingredients_recipe_id').on(table.recipeId),
    t.index('idx_recipe_ingredients_ingredient_id').on(table.ingredientId),
  ],
);

// Cooking steps for a recipe
export const stepTable = t.pgTable(
  'steps',
  {
    id: t.serial('id').primaryKey(),
    stepId: t
      .uuid('step_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    recipeId: t
      .integer('recipe_id')
      .notNull()
      .references(() => recipeTable.id, { onDelete: 'cascade' }),
    order: t.integer('order').notNull(),
    instruction: t.text('instruction').notNull(),
    imageUrl: t.varchar('image_url', { length: 512 }),
    duration: t.integer('duration'), // Optional duration in minutes
    ...commonTimestamps,
  },
  table => [
    t.index('idx_steps_step_id').on(table.stepId),
    t.index('idx_steps_recipe_id').on(table.recipeId),
    t.index('idx_steps_order').on(table.order),
  ],
);

// Set up relations
export const recipeRelations = relations(recipeTable, ({ one, many }) => ({
  tag: one(tagTable, {
    fields: [recipeTable.tagId],
    references: [tagTable.id],
    relationName: 'recipe:tag',
  }),
  ingredients: many(recipeIngredientTable),
  steps: many(stepTable),
}));

export const ingredientRelations = relations(ingredientTable, ({ many }) => ({
  recipeIngredients: many(recipeIngredientTable, { relationName: 'ingredient:recipeIngredients' }),
}));

export const recipeIngredientRelations = relations(recipeIngredientTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [recipeIngredientTable.recipeId],
    references: [recipeTable.id],
    relationName: 'recipe:ingredients',
  }),
  ingredient: one(ingredientTable, {
    fields: [recipeIngredientTable.ingredientId],
    references: [ingredientTable.id],
    relationName: 'ingredient:recipeIngredients',
  }),
  unit: one(measurementUnitTable, {
    fields: [recipeIngredientTable.unitId],
    references: [measurementUnitTable.id],
    relationName: 'recipe:ingredients',
  }),
}));

export const stepRelations = relations(stepTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [stepTable.recipeId],
    references: [recipeTable.id],
    relationName: 'step:recipe',
  }),
}));

// Schemas
export const ingredientSelectSchema = createSelectSchema(ingredientTable);
export const ingredientInsertSchema = createInsertSchema(ingredientTable);
export const ingredientUpdateSchema = createUpdateSchema(ingredientTable);
export type Ingredient = typeof ingredientTable.$inferSelect;
export type IngredientInsert = typeof ingredientTable.$inferInsert;

export const recipeSelectSchema = createSelectSchema(recipeTable);
export const recipeInsertSchema = createInsertSchema(recipeTable);
export const recipeUpdateSchema = createUpdateSchema(recipeTable);
export type Recipe = typeof recipeTable.$inferSelect;
export type RecipeInsert = typeof recipeTable.$inferInsert;

export const recipeIngredientSelectSchema = createSelectSchema(recipeIngredientTable);
export const recipeIngredientInsertSchema = createInsertSchema(recipeIngredientTable);
export const recipeIngredientUpdateSchema = createUpdateSchema(recipeIngredientTable);
export type RecipeIngredient = typeof recipeIngredientTable.$inferSelect;
export type RecipeIngredientInsert = typeof recipeIngredientTable.$inferInsert;

export const stepSelectSchema = createSelectSchema(stepTable);
export const stepInsertSchema = createInsertSchema(stepTable);
export const stepUpdateSchema = createUpdateSchema(stepTable);
export type Step = typeof stepTable.$inferSelect;
export type StepInsert = typeof stepTable.$inferInsert;
