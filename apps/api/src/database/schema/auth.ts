import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-valibot';

import { commonTimestamps } from '../config';

// User roles enum
export const USER_ROLES = ['USER', 'ADMIN'] as const;
export const userRole = t.pgEnum('user_role', USER_ROLES);
export type UserRoleType = (typeof USER_ROLES)[number];

// Auth method types enum
export const AUTH_METHOD_TYPES = ['EMAIL_PASSWORD'] as const;
export const authMethodType = t.pgEnum('auth_method_type', AUTH_METHOD_TYPES);
export type AuthMethodType = (typeof AUTH_METHOD_TYPES)[number];

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

// Auth methods table
export const authMethodTable = t.pgTable(
  'auth_methods',
  {
    id: t.serial('id').primaryKey(),
    userId: t
      .integer('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    type: authMethodType('type').notNull(),
    // For email/password auth
    passwordHash: t.varchar('password_hash', { length: 255 }),

    // Common fields
    isEnabled: t.boolean('is_enabled').notNull().default(true),
    lastUsedAt: t.timestamp('last_used_at'),
    ...commonTimestamps,
  },
  table => [
    t.index('idx_auth_methods_user_id').on(table.userId),
    t.index('idx_auth_methods_type').on(table.type),
  ],
);

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
  sessions: many(sessionTable, { relationName: 'user:sessions' }),
  passwordResets: many(passwordResetTable, { relationName: 'user:passwordResets' }),
  authMethods: many(authMethodTable, { relationName: 'user:authMethods' }),
}));

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
    relationName: 'session:user',
  }),
}));

export const passwordResetRelations = relations(passwordResetTable, ({ one }) => ({
  user: one(userTable, {
    fields: [passwordResetTable.userId],
    references: [userTable.id],
    relationName: 'passwordReset:user',
  }),
}));

export const authMethodRelations = relations(authMethodTable, ({ one }) => ({
  user: one(userTable, {
    fields: [authMethodTable.userId],
    references: [userTable.id],
    relationName: 'authMethod:user',
  }),
}));

// Schemas
export const userSelectSchema = createSelectSchema(userTable);
export const userInsertSchema = createInsertSchema(userTable);
export const userUpdateSchema = createUpdateSchema(userTable);
export type User = typeof userTable.$inferSelect;
export type UserInsert = typeof userTable.$inferInsert;

export const authMethodSelectSchema = createSelectSchema(authMethodTable);
export const authMethodInsertSchema = createInsertSchema(authMethodTable);
export const authMethodUpdateSchema = createUpdateSchema(authMethodTable);
export type AuthMethod = typeof authMethodTable.$inferSelect;
export type AuthMethodInsert = typeof authMethodTable.$inferInsert;

export const sessionSelectSchema = createSelectSchema(sessionTable);
export const sessionInsertSchema = createInsertSchema(sessionTable);
export type Session = typeof sessionTable.$inferSelect;
export type SessionInsert = typeof sessionTable.$inferInsert;
