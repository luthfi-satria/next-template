# ZOD VALIDATION RULES

## Overview
Zod acts as the *single source of truth* for runtime validation across form inputs, Server Action parameters, and Environment Variables.

## Rules
1. **Schema Location**:
   - Store reusable validation schemas in `src/lib/zod/<feature>.ts`.
2. **TypeScript Type Inference**:
   - Leverage `z.infer<typeof schema>` to generate TypeScript types automatically without creating duplicate manual interfaces.
3. **Error Messaging**:
   - Always include explicit, user-friendly error messages for every validation rule:
     ```typescript
     export const createUserSchema = z.object({
       email: z.string().email('Invalid email address format'),
       name: z.string().min(2, 'Name must be at least 2 characters'),
     });
     export type CreateUserInput = z.infer<typeof createUserSchema>;
     ```