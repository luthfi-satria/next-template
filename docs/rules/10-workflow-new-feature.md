# WORKFLOW FOR CREATING A NEW FEATURE

When building a new feature, developers and AI Agents must execute tasks sequentially in the following order:

1. **Type Definitions** (`src/types/<feature>.ts`):
   - Declare global interfaces/types required for the feature.
2. **Static Constants** (`src/constants/<feature>.ts`):
   - Create supporting static options, route paths, or lookup values.
3. **Database Schema** (`src/lib/db/schema.ts`):
   - Update or add database tables if the feature requires new persistent storage.
4. **Zod Schema** (`src/lib/zod/<feature>.ts`):
   - Define validation schemas for form inputs and Server Action arguments.
5. **Server Actions** (`src/actions/<feature>.ts`):
   - Implement data mutation functions integrated with Zod validation and Drizzle ORM.
6. **Zustand Store** (`src/stores/<feature>-store.ts`):
   - Create a UI store if the feature requires global client UI state.
7. **UI Components & SCSS** (`src/components/features/<feature>/`):
   - Build interface components along with their corresponding `.module.scss` files.
8. **App Router Page** (`src/app/<feature>/page.tsx`):
   - Assemble components into the Next.js App Router page route.