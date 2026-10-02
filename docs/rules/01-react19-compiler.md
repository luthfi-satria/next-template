# REACT 19 & REACT COMPILER RULES

## Overview
This project utilizes React 19 and the React Compiler (Next.js 15). The React Compiler automatically handles memoization optimizations at build-time.

## Rules
1. **No Manual Optimization Hooks**:
   - DO NOT use `useMemo`, `useCallback`, or `React.memo` manually. 
   - Write standard React component code without worrying about memoization overhead.
2. **Server Components First**:
   - By default, all components inside `src/app/` and `src/components/` are **Server Components**.
   - Use the `'use client'` directive at the very top of the file ONLY when a component strictly requires:
     - Local state (`useState`, `useReducer`).
     - Event listeners (`onClick`, `onChange`, `onSubmit`).
     - Client-side custom hooks (`useStore`, `useQuery`, `useParams`).
     - Browser APIs (`window`, `localStorage`).
3. **Isolate Interactive Components**:
   - Keep Server Components as the primary wrapper. Isolate parts requiring `'use client'` into the smallest component scope possible.