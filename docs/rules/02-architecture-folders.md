# DIRECTORY & FOLDER STRUCTURE RULES

## Folder Constraints
All team members and AI Agents MUST place files according to the following strict layout:

- `src/actions/`: Next.js Server Actions (`'use server'`). Grouped by domain/feature.
- `src/app/`: App Router pages, layouts, loading, and error boundaries only. Keep route handler files thin.
- `src/components/common/`: Generic, domain-agnostic UI primitives (Button, Input, Modal, Table UI).
- `src/components/features/<feature>/`: Feature/domain-specific components (e.g., `auth/LoginForm.tsx`, `dashboard/MetricCard.tsx`).
- `src/components/providers/`: React Context and Query Client Providers.
- `src/constants/`: Global static constants, app routes, env configuration keys, and select dropdown options.
- `src/hooks/`: Reusable client-side custom React hooks.
- `src/lib/db/`: Drizzle ORM client connection, schema (`schema.ts`), and database query helpers.
- `src/lib/zod/`: Shared Zod validation schemas.
- `src/stores/`: Zustand stores for client-side global UI state management.
- `src/styles/`: SCSS architecture (`_variables.scss`, `_mixins.scss`, `globals.scss`, `_theme.scss`).
- `src/types/`: Global interfaces, utility types, and TypeScript type declarations.