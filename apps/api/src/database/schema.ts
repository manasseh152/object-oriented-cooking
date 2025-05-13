/* eslint-disable ts/no-use-before-define */

import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-valibot';
import * as v from 'valibot';

import { commonTimestamps } from './config';

export const RECIPE_DIFFICULTY = ['easy', 'medium', 'hard', 'expert'] as const;
export const recipeDifficulty = t.pgEnum('recipe_difficulty', RECIPE_DIFFICULTY);
export const recipeDifficultyPicklist = v.picklist(RECIPE_DIFFICULTY, 'Recipe Difficulty');
export type RecipeDifficulty = (typeof RECIPE_DIFFICULTY)[number];

const MEASUREMENT_UNIT_TYPES = ['count', 'weight', 'volume'] as const;
export const measurementUnitType = t.pgEnum('measurement_unit_type', MEASUREMENT_UNIT_TYPES);
export const measurementUnitTypePicklist = v.picklist(MEASUREMENT_UNIT_TYPES, 'Measurement Unit Type');
export type MeasurementUnitType = (typeof MEASUREMENT_UNIT_TYPES)[number];
const MEASUREMENT_UNIT_SYSTEMS = ['metric', 'imperial'] as const;
export const measurementUnitSystem = t.pgEnum('measurement_unit_system', MEASUREMENT_UNIT_SYSTEMS);
export const measurementUnitSystemPicklist = v.picklist(MEASUREMENT_UNIT_SYSTEMS, 'Measurement Unit System');
export type MeasurementUnitSystem = (typeof MEASUREMENT_UNIT_SYSTEMS)[number];

// Measurement units for ingredients
export const measurementUnitTable = t.pgTable(
  'measurement_units',
  {
    id: t.serial('id').primaryKey(),
    unitId: t
      .uuid('unit_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    abbreviation: t.varchar('abbreviation', { length: 50 }).notNull().unique(),
    description: t.text('description'),
    type: measurementUnitType('type').notNull(),
    system: measurementUnitSystem('system').notNull(),
    conversionFactor: t.doublePrecision('conversion_factor').notNull(),
    baseUnitId: t
      .integer('base_unit_id')
      .references((): t.AnyPgColumn => measurementUnitTable.id),
    isBaseUnit: t.boolean('is_base_unit').default(false),
    isActive: t.boolean('is_active').default(true),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_measurement_units_unit_id').on(table.unitId),
    t.index('idx_measurement_units_name').on(table.name),
    t.index('idx_measurement_units_abbreviation').on(table.abbreviation),
    t.index('idx_measurement_units_type').on(table.type),
    t.index('idx_measurement_units_system').on(table.system),
    t.index('idx_measurement_units_conversion_factor').on(table.conversionFactor),
    t.index('idx_measurement_units_base_unit_id').on(table.baseUnitId),
    t.index('idx_measurement_units_is_base_unit').on(table.isBaseUnit),
    t.index('idx_measurement_units_is_active').on(table.isActive),
  ],
);
export const measurementUnitSelectSchema = createSelectSchema(measurementUnitTable);
export const measurementUnitInsertSchema = createInsertSchema(measurementUnitTable);
export const measurementUnitUpdateSchema = createUpdateSchema(measurementUnitTable);
export type MeasurementUnit = typeof measurementUnitTable.$inferSelect;
export type MeasurementUnitInsert = typeof measurementUnitTable.$inferInsert;

export const measurementUnitRelations = relations(measurementUnitTable, ({ one }) => ({
  baseUnit: one(measurementUnitTable, {
    fields: [measurementUnitTable.baseUnitId],
    references: [measurementUnitTable.id],
  }),
}));

// Categories for recipes (e.g., Breakfast, Dinner, Dessert, etc.)
export const categoryTable = t.pgTable(
  'categories',
  {
    id: t.serial('id').primaryKey(),
    categoryId: t
      .uuid('category_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    description: t.text('description'),
    color: t.varchar('color', { length: 7 }).notNull(),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_categories_category_id').on(table.categoryId),
    t.index('idx_categories_name').on(table.name),
  ],
);
export const categorySelectSchema = createSelectSchema(categoryTable);
export const categoryInsertSchema = createInsertSchema(categoryTable);
export const categoryUpdateSchema = createUpdateSchema(categoryTable);
export type Category = typeof categoryTable.$inferSelect;
export type CategoryInsert = typeof categoryTable.$inferInsert;

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  recipes: many(recipeTable),
}));

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
export const ingredientSelectSchema = createSelectSchema(ingredientTable);
export const ingredientInsertSchema = createInsertSchema(ingredientTable);
export const ingredientUpdateSchema = createUpdateSchema(ingredientTable);
export type Ingredient = typeof ingredientTable.$inferSelect;
export type IngredientInsert = typeof ingredientTable.$inferInsert;

export const ingredientRelations = relations(ingredientTable, ({ many }) => ({
  recipeIngredients: many(recipeIngredientTable),
}));

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
    categoryId: t
      .integer('category_id')
      .references(() => categoryTable.id),
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
    t.index('idx_recipes_category_id').on(table.categoryId),
    t.index('idx_recipes_title').on(table.title),
    t.index('idx_recipes_difficulty').on(table.difficulty),
    t.index('idx_recipes_is_published').on(table.isPublished),
  ],
);
export const recipeSelectSchema = createSelectSchema(recipeTable);
export const recipeInsertSchema = createInsertSchema(recipeTable);
export const recipeUpdateSchema = createUpdateSchema(recipeTable);
export type Recipe = typeof recipeTable.$inferSelect;
export type RecipeInsert = typeof recipeTable.$inferInsert;

export const recipeRelations = relations(recipeTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [recipeTable.categoryId],
    references: [categoryTable.id],
  }),
  ingredients: many(recipeIngredientTable),
  steps: many(stepTable),
  tags: many(recipeTagTable),
}));

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
export const recipeIngredientSelectSchema = createSelectSchema(recipeIngredientTable);
export const recipeIngredientInsertSchema = createInsertSchema(recipeIngredientTable);
export const recipeIngredientUpdateSchema = createUpdateSchema(recipeIngredientTable);
export type RecipeIngredient = typeof recipeIngredientTable.$inferSelect;
export type RecipeIngredientInsert = typeof recipeIngredientTable.$inferInsert;

export const recipeIngredientRelations = relations(recipeIngredientTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [recipeIngredientTable.recipeId],
    references: [recipeTable.id],
  }),
  ingredient: one(ingredientTable, {
    fields: [recipeIngredientTable.ingredientId],
    references: [ingredientTable.id],
  }),
}));

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
export const stepSelectSchema = createSelectSchema(stepTable);
export const stepInsertSchema = createInsertSchema(stepTable);
export const stepUpdateSchema = createUpdateSchema(stepTable);
export type Step = typeof stepTable.$inferSelect;
export type StepInsert = typeof stepTable.$inferInsert;

export const stepRelations = relations(stepTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [stepTable.recipeId],
    references: [recipeTable.id],
  }),
}));

// Tags for recipes
export const tagTable = t.pgTable(
  'tags',
  {
    id: t.serial('id').primaryKey(),
    tagId: t
      .uuid('tag_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    color: t.varchar('color', { length: 7 }).notNull(),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_tags_tag_id').on(table.tagId),
    t.index('idx_tags_name').on(table.name),
  ],
);
export const tagSelectSchema = createSelectSchema(tagTable);
export const tagInsertSchema = createInsertSchema(tagTable);
export const tagUpdateSchema = createUpdateSchema(tagTable);
export type Tag = typeof tagTable.$inferSelect;
export type TagInsert = typeof tagTable.$inferInsert;

export const tagRelations = relations(tagTable, ({ many }) => ({
  recipes: many(recipeTagTable),
}));

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
export const recipeTagSelectSchema = createSelectSchema(recipeTagTable);
export const recipeTagInsertSchema = createInsertSchema(recipeTagTable);
export const recipeTagUpdateSchema = createUpdateSchema(recipeTagTable);
export type RecipeTag = typeof recipeTagTable.$inferSelect;
export type RecipeTagInsert = typeof recipeTagTable.$inferInsert;

export const recipeTagRelations = relations(recipeTagTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [recipeTagTable.recipeId],
    references: [recipeTable.id],
  }),
  tag: one(tagTable, {
    fields: [recipeTagTable.tagId],
    references: [tagTable.id],
  }),
}));

// Meal plans
export const mealPlanTable = t.pgTable(
  'meal_plans',
  {
    id: t.serial('id').primaryKey(),
    mealPlanId: t
      .uuid('meal_plan_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    name: t.varchar('name', { length: 255 }).notNull(),
    description: t.text('description'),
    startDate: t.date('start_date'),
    endDate: t.date('end_date'),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_meal_plans_meal_plan_id').on(table.mealPlanId),
    t.index('idx_meal_plans_name').on(table.name),
    t.index('idx_meal_plans_start_date').on(table.startDate),
    t.index('idx_meal_plans_end_date').on(table.endDate),
  ],
);
export const mealPlanSelectSchema = createSelectSchema(mealPlanTable);
export const mealPlanInsertSchema = createInsertSchema(mealPlanTable);
export const mealPlanUpdateSchema = createUpdateSchema(mealPlanTable);
export type MealPlan = typeof mealPlanTable.$inferSelect;
export type MealPlanInsert = typeof mealPlanTable.$inferInsert;

// Meal slots in a meal plan
export const mealSlotTable = t.pgTable(
  'meal_slots',
  {
    id: t.serial('id').primaryKey(),
    mealPlanId: t
      .integer('meal_plan_id')
      .notNull()
      .references(() => mealPlanTable.id, { onDelete: 'cascade' }),
    recipeId: t
      .integer('recipe_id')
      .references(() => recipeTable.id),
    date: t.date('date').notNull(),
    mealType: t.varchar('meal_type', { length: 50 }).notNull(), // breakfast, lunch, dinner, snack
    notes: t.text('notes'),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_meal_slots_meal_plan_id').on(table.mealPlanId),
    t.index('idx_meal_slots_recipe_id').on(table.recipeId),
    t.index('idx_meal_slots_date').on(table.date),
    t.index('idx_meal_slots_meal_type').on(table.mealType),
  ],
);
export const mealSlotSelectSchema = createSelectSchema(mealSlotTable);
export const mealSlotInsertSchema = createInsertSchema(mealSlotTable);
export const mealSlotUpdateSchema = createUpdateSchema(mealSlotTable);
export type MealSlot = typeof mealSlotTable.$inferSelect;
export type MealSlotInsert = typeof mealSlotTable.$inferInsert;

export const mealSlotRelations = relations(mealSlotTable, ({ one }) => ({
  mealPlan: one(mealPlanTable, {
    fields: [mealSlotTable.mealPlanId],
    references: [mealPlanTable.id],
  }),
  recipe: one(recipeTable, {
    fields: [mealSlotTable.recipeId],
    references: [recipeTable.id],
  }),
}));

// User roles enum
export const USER_ROLES = ['USER', 'ADMIN'] as const;
export const userRole = t.pgEnum('user_role', USER_ROLES);
export type UserRoleType = (typeof USER_ROLES)[number];

// Users table
export const userTable = t.pgTable(
  'users',
  {
    id: t.serial('id').primaryKey(),
    userId: t
      .uuid('user_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    email: t.varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: t.varchar('password_hash', { length: 255 }).notNull(),
    firstName: t.varchar('first_name', { length: 100 }),
    lastName: t.varchar('last_name', { length: 100 }),
    role: userRole('role').notNull().default('USER'),
    emailVerified: t.boolean('email_verified').default(false),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_users_user_id').on(table.userId),
    t.index('idx_users_email').on(table.email),
    t.index('idx_users_role').on(table.role),
  ],
);

export const userSelectSchema = createSelectSchema(userTable);
export const userInsertSchema = createInsertSchema(userTable);
export const userUpdateSchema = createUpdateSchema(userTable);
export type User = typeof userTable.$inferSelect;
export type UserInsert = typeof userTable.$inferInsert;

// Sessions table for authentication
export const sessionTable = t.pgTable(
  'sessions',
  {
    id: t.serial('id').primaryKey(),
    sessionId: t
      .uuid('session_id')
      .notNull()
      .default(sql`uuid_generate_v4()`),
    userId: t
      .integer('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    expiresAt: t.timestamp('expires_at').notNull(),
    userAgent: t.varchar('user_agent', { length: 255 }),
    ipAddress: t.varchar('ip_address', { length: 45 }),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_sessions_session_id').on(table.sessionId),
    t.index('idx_sessions_user_id').on(table.userId),
    t.index('idx_sessions_expires_at').on(table.expiresAt),
  ],
);

export const sessionSelectSchema = createSelectSchema(sessionTable);
export const sessionInsertSchema = createInsertSchema(sessionTable);
export type Session = typeof sessionTable.$inferSelect;
export type SessionInsert = typeof sessionTable.$inferInsert;

// Password reset tokens
export const passwordResetTable = t.pgTable(
  'password_resets',
  {
    id: t.serial('id').primaryKey(),
    userId: t
      .integer('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    token: t.varchar('token', { length: 255 }).notNull().unique(),
    expiresAt: t.timestamp('expires_at').notNull(),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_password_resets_user_id').on(table.userId),
    t.index('idx_password_resets_token').on(table.token),
    t.index('idx_password_resets_expires_at').on(table.expiresAt),
  ],
);

// Set up relations
export const userRelations = relations(userTable, ({ many }) => ({
  sessions: many(sessionTable),
  passwordResets: many(passwordResetTable),
  recipes: many(recipeTable), // Add this later when connecting recipes to users
}));

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

export const passwordResetRelations = relations(passwordResetTable, ({ one }) => ({
  user: one(userTable, {
    fields: [passwordResetTable.userId],
    references: [userTable.id],
  }),
}));
