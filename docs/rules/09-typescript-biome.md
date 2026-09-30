# TYPESCRIPT & BIOME RULES

## Rules
1. **Strict TypeScript**:
   - The `any` type is strictly forbidden. Use `unknown` with Zod type guards or type predicates if data shapes are dynamic.
   - All internal imports MUST use the `@/` path alias (`@/components`, `@/actions`, `@/lib`, etc.).
2. **Biome Formatting Rules**:
   - Code must adhere strictly to **Biome** standards:
     - 2-space indentation.
     - Single quotes (`'`) for string literals.
     - Mandatory semicolons (`;`).
     - Auto-organize imports on file save.