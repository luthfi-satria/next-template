# SERVER ACTIONS RULES

## Overview
Server Actions serve as the primary method for data mutations (POST, PUT, DELETE) from the client to the server without needing manual REST API endpoints.

## Rules
1. **Location & Directives**:
   - All Server Actions must be stored in `src/actions/<feature>.ts`.
   - Mandatory `'use server'` directive at the top of the file.
2. **Standardized Response Format**:
   - All Server Actions MUST return a predictable, typed object (`ActionResult<T>`):
     ```typescript
     export type ActionResult<T> =
       | { success: true; data: T }
       | { success: false; error: string };
     ```
3. **Zod Validation Integration**:
   - Never execute database queries before verifying inputs using a Zod Schema.
4. **Error Handling**:
   - Catch all internal exceptions using `try-catch` blocks and return `{ success: false, error: 'User-friendly error message' }`. Never expose raw database error messages to the client.