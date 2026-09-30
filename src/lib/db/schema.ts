import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Role Enum
export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
