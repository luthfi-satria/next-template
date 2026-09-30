# STYLING & SCSS MODULES RULES

## Rules
1. **SCSS Modules Only**:
   - All component-specific styling MUST use **SCSS Modules** with the `*.module.scss` extension.
2. **Token & Mixin Usage**:
   - Hardcoded values (hex colors, pixel font sizes, breakpoint values) are strictly prohibited.
   - Always use variables from `src/styles/_variables.scss` or `src/styles/_mixins.scss`.
   - Import via path aliases:
     ```scss
     @use '@/styles/variables' as *;
     @use '@/styles/mixins' as *;
     ```
3. **Conditional Classes**:
   - Use the `clsx` utility for conditionally joining SCSS module classes.