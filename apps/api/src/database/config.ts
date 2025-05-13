import * as t from 'drizzle-orm/pg-core';

export const commonTimestamps = {
  createdAt: t.timestamp('created_at').notNull().defaultNow(),
  updatedAt: t.timestamp('updated_at').notNull().defaultNow(),
  deletedAt: t.timestamp('deleted_at'),
};
