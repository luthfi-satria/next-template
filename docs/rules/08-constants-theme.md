# CONSTANTS & THEME MANAGEMENT RULES

## Rules
1. **No Hardcoded Values**:
   - Static text strings, route URLs, dropdown options, and config values must not be hardcoded directly into component files.
2. **Constants Directory Layout (`src/constants/`)**:
   - `routes.ts`: Centralized route path definitions.
   - `config.ts`: Environment flags, app metadata, pagination defaults.
   - `<feature>.constants.ts`: Feature-specific static options (e.g., order status list, user roles).
3. **Literal Safety**:
   - Append `as const` assertions to constant arrays/objects so TypeScript enforces strict literal union types.