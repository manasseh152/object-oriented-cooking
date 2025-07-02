import * as t from 'drizzle-orm/pg-core';

export function commonTimestamps() {
  return {
    createdAt: t.timestamp('created_at').notNull().defaultNow(),
    updatedAt: t.timestamp('updated_at').notNull().defaultNow(),
    deletedAt: t.timestamp('deleted_at'),
  };
};
