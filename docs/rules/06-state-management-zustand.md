# STATE MANAGEMENT (ZUSTAND & TANSTACK QUERY) RULES

## Rules
1. **Separation of State Responsibilities**:
   - **Server State / Data Caching**: MUST use **TanStack Query v5** (`useQuery`, `useMutation`).
   - **Client Global UI State**: MUST use **Zustand**.
2. **Zustand Usage Scope**:
   - DO NOT store API/Database response data in Zustand. Use Zustand ONLY for interactive client UI states (e.g., sidebar collapse, modal visibility, active tabs, temporary workspace filters).
3. **Location & Naming Convention**:
   - Store definitions reside in `src/stores/<feature>-store.ts`.
   - Use the naming convention `use<Feature>Store`.