# DATABASE & DRIZZLE ORM RULES

## Overview
The application uses PostgreSQL accessed via Drizzle ORM for lightweight, *100% type-safe* database transactions.

## Rules
1. **Single Source of Truth Schema**:
   - All table schemas MUST be declared in `src/lib/db/schema.ts` using primitives from `drizzle-orm/pg-core`.
2. **Type Exports**:
   - Always export *Select* and *Insert* types inferred from Drizzle table schemas:
     ```typescript
     export type User = typeof users.$inferSelect;
     export type NewUser = typeof users.$inferInsert;
     ```
3. **Migration Workflow**:
   - DO NOT alter the database schema directly using database GUIs (DBeaver/pgAdmin).
   - Always run `pnpm db:generate` to generate new SQL migration files in `/drizzle`, then execute with `pnpm db:migrate`.