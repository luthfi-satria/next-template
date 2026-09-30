# Project Architecture, Development Goals & Engineering Standards

Welcome to the Next.js template development guide. This document defines the engineering principles, architectural patterns, and quality standards for building a scalable, maintainable, and type-safe application.

---

## Executive Summary & Core Objectives

1. **Clean Code & Neat Folder Structure**: Modular design with strict separation of concerns.
2. **Explicit Type Systems & Zustand Stores**: Strictly typed contracts and lightweight global state management.
3. **Robust Database Layer (Drizzle ORM)**: Type-safe database schemas, migrations, and seed management.
4. **Guided TanStack Query Integration**: Structured data-fetching pipelines with cached, reactive asynchronous state.
5. **Atomic Component Hierarchy**: Reusable, unstyled-primitive and feature-driven UI components.
6. **Structured SCSS Architecture**: Modular CSS/SCSS with central variable and mixin tokens (no global CSS pollution).
7. **Isolated API & Query Layer**: Clean separation between raw fetch calls, custom query hooks, and UI components.
8. **Model Context Protocol (MCP) Integration**: Leveraged AI tools for browser context and direct database inspection.
9. **Strict Git & GitHub Workflow**: Branch strategies, commit conventions, and minimal PR friction.
10. **Automated Quality Enforcement**: Pre-commit linting, typechecking, and static analysis to prevent repetitive code reviews.

---

## 1. Directory Structure & Organization

The codebase follows a modular `src/` directory layout where every responsibility resides in its dedicated, predictable folder.

```text
.
├── .husky/                   # Git pre-commit & pre-push hooks
├── .mcp/                     # Central Model Context Protocol server settings
├── docs/                     # Development guidelines and setup guides
│   ├── setup/
│   └── guidelines/
│       └── 01_development_goals.md
├── drizzle/                  # Auto-generated database SQL migration files
├── public/                   # Static assets (images, fonts, favicons)
├── src/
│   ├── app/                  # Next.js App Router (Routes, Layouts, API endpoints)
│   ├── components/
│   │   ├── common/           # Generic, highly reusable UI components (Button, Modal, Input)
│   │   ├── features/         # Domain-specific feature modules (UserTable, DashboardCard)
│   │   └── providers/        # Context & Query Providers (TanStack Query, Theme)
│   ├── constants/            # App routes, global constants, static options
│   ├── hooks/                # Custom utility hooks (useDebounce, useMediaQuery)
│   ├── lib/
│   │   ├── api/              # Low-level API client and HTTP helper logic
│   │   ├── db/               # Drizzle connection client and schema definitions
│   │   │   ├── schema/       # Domain-split Drizzle database schemas
│   │   │   └── index.ts
│   │   └── zod/              # Reusable Zod validation schemas
│   ├── queries/              # TanStack Query custom hooks & data-fetching functions
│   │   ├── users/            # Feature-specific queries (useGetUsers, useCreateUser)
│   │   └── index.ts
│   ├── stores/               # Zustand state store slices
│   ├── styles/               # Centralized SCSS variables, mixins, and globals
│   └── types/                # Domain entities, API request/response contracts
├── .env.example              # Environment variables template
├── .env.local                # Local environment secrets (un-tracked)
├── biome.json                # Biome linter, formatter, and import sorter config
├── drizzle.config.ts         # Drizzle ORM configuration
├── next.config.mjs           # Next.js framework configuration
├── package.json              # Dependencies and CLI scripts
└── tsconfig.json             # Strict TypeScript configuration
```

---

## 2. TypeScript Types & Interfaces

All types must be centralized in `src/types/` and categorized by domain entity or functionality.

### Rules & Conventions
- **Explicit Definitions**: Never use `any` or loose `object` types. Use explicit generics, interfaces, or type aliases.
- **Drizzle Schema Inference**: Infer database entities directly from Drizzle schemas using `InferSelectModel` and `InferInsertModel`.
- **Zod Schema Inference**: Infer runtime validation schemas using `z.infer<typeof schema>`.

### File Conventions inside `src/types/`
- `src/types/common.ts`: Generic utility types (e.g., `ApiResponse<T>`, `PaginatedResponse<T>`).
- `src/types/user.ts`: User domain types, Drizzle inferred models, and request DTOs.

```typescript
// Example: src/types/common.ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}
```

---

## 3. Database Architecture (Drizzle ORM)

Drizzle ORM provides complete SQL type safety and predictable migrations.

### Schema Organization (`src/lib/db/schema/`)
- Break database schemas into domain-specific files inside `src/lib/db/schema/` (e.g., `users.ts`, `posts.ts`) and export them together through `src/lib/db/schema/index.ts`.

```typescript
// src/lib/db/schema/users.ts
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### Migration Lifecycle
1. **Edit Schemas**: Make changes in `src/lib/db/schema/`.
2. **Generate SQL**: Run `pnpm db:generate` to produce formatted, version-controlled SQL files in `/drizzle`.
3. **Apply Migrations**: Run `pnpm db:migrate` to update the local database.
4. **Inspect Database**: Run `pnpm db:studio` to view and manage database records visually.

---

## 4. State Management (Zustand & TanStack Query Guide)

Understanding the separation between **Server/Asynchronous State** and **Client/UI State** is crucial.

| State Type | Category | Recommended Tool | Example |
| --- | --- | --- | --- |
| **Server State** | Asynchronous / Cached | **TanStack Query (v5)** | User profiles, database rows, API responses |
| **Client UI State** | Synchronous / Ephemeral | **Zustand** | Dark mode toggle, sidebar open/closed, modal state |

### A. Zustand (Client UI State)
Zustand stores handle client-only states. Keep stores small, focused, and strongly typed.

```typescript
// src/stores/use-ui-store.ts
import { create } from 'zustand';

interface UiState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
```

### B. TanStack Query v5 Guide (Server Data Fetching)
TanStack Query manages data fetching, caching, background synchronization, and automatic re-validation.

#### The Three Core Concepts:
1. **Query Keys (`queryKey`)**: Unique array identifying the cached dataset (e.g., `['users', { page: 1 }]`).
2. **Query Functions (`queryFn`)**: An asynchronous function that returns the fetched data.
3. **Mutations**: Functions used to create, update, or delete data on the server (`useMutation`), triggering `queryClient.invalidateQueries()` to automatically refresh stale UI data.

---

## 5. Separated Query Logic & API Layer

Do **not** perform raw `fetch` calls or inline `useQuery` definitions inside React components. Organize data logic into three isolated layers:

```text
[ React UI Component ] 
       │ 
       ▼ calls
[ Custom Query Hook (src/queries/users/use-get-users.ts) ] 
       │ 
       ▼ executes
[ Fetcher Function (src/lib/api/users.ts) ] 
       │ 
       ▼ fetches
[ REST API / Server Action Endpoint ]
```

### Step 1: Low-Level Fetcher Function (`src/lib/api/users.ts`)
```typescript
import type { ApiResponse } from '@/types/common';
import type { User } from '@/types/user';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const result: ApiResponse<User[]> = await response.json();
  return result.data;
}
```

### Step 2: Custom Query Hook (`src/queries/users/use-users-query.ts`)
```typescript
import { fetchUsers } from '@/lib/api/users';
import { useQuery } from '@tanstack/react-query';

export const userQueryKeys = {
  all: ['users'] as const,
  lists: () => [...userQueryKeys.all, 'list'] as const,
};

export function useUsersQuery() {
  return useQuery({
    queryKey: userQueryKeys.lists(),
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
  });
}
```

### Step 3: Clean Usage in Component (`src/components/features/user-list.tsx`)
```tsx
'use client';

import { useUsersQuery } from '@/queries/users/use-users-query';

export function UserList() {
  const { data: users, isLoading, isError, error } = useUsersQuery();

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 6. Reusable Components

Maintain a modular UI component hierarchy:
- **`src/components/common/`**: Low-level, domain-agnostic UI primitives (Buttons, Modals, Inputs, Cards).
- **`src/components/features/`**: Domain-aware components tied to business logic (UserCard, OrderTable).
- **`src/components/providers/`**: Context providers wrapping top-level layouts.

### Principles:
1. Single Responsibility Principle (SRP).
2. Prop-driven composition rather than monolithic conditional rendering.
3. Strict prop typing using TypeScript interfaces.

---

## 7. SCSS Architecture & Styling Guidelines

We use **SCSS Modules** to guarantee scoped styling without global class collisions.

### File Structure (`src/styles/`)
- `_variables.scss`: Color palettes, typography, spacing tokens, breakpoints.
- `_mixins.scss`: Flexbox layouts, grid utilities, responsive media query breakpoints.
- `globals.scss`: Global css resets and body styling.

### Component Styling Pattern
Pair each component file with a co-located `.module.scss` file:

```text
src/components/common/button/
├── button.tsx
└── button.module.scss
```

```scss
// button.module.scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.btn {
  @include flex-center;
  padding: 0.5rem 1rem;
  border-radius: $border-radius-md;
  font-weight: 600;
  
  &Primary {
    background-color: $color-primary;
    color: $color-white;
  }
}
```

---

## 8. Model Context Protocol (MCP) Integration

Model Context Protocol (MCP) connects AI development assistants (Cursor, Windsurf, VS Code + Cline/Roo Code) with your environment tools:

1. **Database MCP (`@modelcontextprotocol/server-postgres`)**:
   Allows AI assistants to inspect database schemas, verify column definitions, and run raw dev-only diagnostic queries.
2. **Browser Context Tools**:
   Allows AI assistants to review live UI output and inspect layout structure directly during development.

> **Security Mandate**: Never link production connection strings or live user databases to MCP configuration files.

---

## 9. GitHub Pull/Push Workflow

To minimize review cycles and merge conflicts, adhere to the following workflow:

```text
main (protected)
  └── feature/user-authentication
  └── fix/navbar-mobile-padding
```

### Workflow Rules:
1. **Feature Branches**: Create focused branches using standard prefixes (`feature/`, `fix/`, `refactor/`, `docs/`).
2. **Atomic Commits**: Keep commits concise and intent-driven.
3. **Frequent Pulls**: Rebase or pull from `main` frequently to resolve conflicts early.
4. **Self-Review Checklist**: Review diffs locally using `git diff` before opening a Pull Request (PR).

---

## 10. Automated Code Quality Enforcement

To eliminate repetitive human code reviews for formatting, typing, and syntax errors, code quality checks are fully automated via **Biome**, **TypeScript**, and **Husky**.

```text
[ Developer runs git commit ]
           │
           ▼
[ Husky triggers pre-commit hook ]
           │
           ▼
[ lint-staged runs Biome check & auto-formatter ]
           │
           ▼
[ Typescript strict validation (pnpm typecheck) ]
           │
           ├── PASS ──> Commit succeeds
           └── FAIL ──> Aborts commit & highlights exact errors
```

### Pre-commit Verification Sequence
- **Formatting & Import Sorting**: Enforced by Biome automatically.
- **Linting Rules**: Biome flags unused variables, improper hooks usage, and dead code.
- **Type Safety**: `pnpm typecheck` validates types across the entire project.

By maintaining these checks locally on pre-commit, every pull request pushed to GitHub is guaranteed to be clean, pre-formatted, and free of type errors.