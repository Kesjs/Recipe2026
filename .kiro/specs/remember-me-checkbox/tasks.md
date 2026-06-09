# Implementation Plan: remember-me-checkbox

## Overview

Implement the "Se souvenir de moi" (Remember Me) checkbox in `src/app/auth/page.tsx`. The change is confined to a single file: add a `rememberMe` boolean state, a `createLoginClient` helper function, wire the checkbox JSX with proper accessibility attributes, reset state on mode toggle, and replace the global Supabase client call in the login branch with a locally instantiated one. Test tooling (Vitest + React Testing Library + fast-check) must be set up first, then unit and property-based tests written.

## Tasks

- [ ] 1. Set up test infrastructure
  - [x] 1.1 Install and configure Vitest with React Testing Library and fast-check
    - Add `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `fast-check`, `jsdom` as dev dependencies (exact versions)
    - Create `vitest.config.ts` at the project root pointing to the `jsdom` environment and importing `@testing-library/jest-dom` setup
    - Add a `"test": "vitest --run"` script in `package.json`
    - Create `src/test/setup.ts` that imports `@testing-library/jest-dom`
    - _Requirements: none (infrastructure task)_

- [ ] 2. Implement `rememberMe` state and `createLoginClient` helper
  - [ ] 2.1 Add `rememberMe` boolean state to `AuthPage`
    - In `src/app/auth/page.tsx`, add `const [rememberMe, setRememberMe] = useState(false);` alongside the existing `useState` declarations
    - _Requirements: 1.2_

  - [ ] 2.2 Add `createLoginClient` module-level helper function
    - Above the `AuthPage` component (but within the same file), add an import of `createClient` from `@supabase/supabase-js` and define `function createLoginClient(rememberMe: boolean)` that returns a `SupabaseClient` configured with `localStorage`/`persistSession: true` when `rememberMe` is `true`, or `sessionStorage`/`persistSession: false` when `false`; include `autoRefreshToken: rememberMe` and `detectSessionInUrl: false`
    - _Requirements: 5.1, 5.2, 5.4_

  - [ ]* 2.3 Write property test for `createLoginClient` storage strategy (Property 4)
    - **Property 4: Instanciation du client selon la stratégie de persistance**
    - Use `fc.boolean()` × `fc.emailAddress()` × `fc.string()` generators
    - Assert that when `rememberMe === true` the client's `auth.storageKey` resolves to localStorage and `persistSession` is `true`; when `false`, sessionStorage and `persistSession: false`
    - **Validates: Requirements 5.1, 5.2, 5.3**

- [ ] 3. Update checkbox JSX and reset on mode toggle
  - [ ] 3.1 Update the checkbox `<input>` and `<label>` JSX
    - In `src/app/auth/page.tsx`, replace the existing static checkbox markup with controlled JSX: add `id="remember-me"` to the `<input>`, change `<label>` to use `htmlFor="remember-me"`, bind `checked={rememberMe}`, `onChange={(e) => setRememberMe(e.target.checked)}`, and `aria-checked={rememberMe}`
    - _Requirements: 1.3, 1.4, 1.5, 6.1, 6.2, 6.3, 6.4_

  - [ ] 3.2 Reset `rememberMe` when toggling between login and signup modes
    - Replace the inline `onClick={() => setIsLogin(!isLogin)}` toggle button handler with a named `handleModeToggle` function (or inline arrow) that calls `setIsLogin(!isLogin)`, `setRememberMe(false)`, `setError("")`, and `setFieldErrors({})`
    - _Requirements: 1.2 (reset on mode switch)_

  - [ ]* 3.3 Write unit tests for checkbox rendering and accessibility
    - Verify Case_Souvenir is absent when `isLogin === false` (Req 1.1)
    - Verify Case_Souvenir is initialised unchecked at mount (Req 1.2)
    - Verify `htmlFor` on `<label>` matches `id` on `<input>` (Req 6.1)
    - Verify `aria-checked` reflects state after user interaction (Req 6.2)
    - Verify checkbox is reachable and operable via native keyboard (type `checkbox`, no `tabIndex=-1`) (Req 6.4)
    - _Requirements: 1.1, 1.2, 6.1, 6.2, 6.4_

  - [ ]* 3.4 Write property test for toggle involution (Property 2)
    - **Property 2: Toggle de la Case_Souvenir est une involution**
    - Use `fc.boolean()` for the initial `rememberMe` state
    - Assert `toggle(toggle(state)) === state`
    - **Validates: Requirements 1.3**

  - [ ]* 3.5 Write property test for visual consistency with state (Property 3)
    - **Property 3: Rendu visuel cohérent avec l'état**
    - Use `fc.boolean()` for `rememberMe`
    - Assert `input.checked === rememberMe` and `input.getAttribute('aria-checked') === String(rememberMe)`
    - **Validates: Requirements 1.4, 1.5, 6.2**

  - [ ]* 3.6 Write property test for conditional visibility (Property 1)
    - **Property 1: Visibilité conditionnelle de la Case_Souvenir**
    - Use `fc.boolean()` for `isLogin`
    - Assert checkbox is in the DOM iff `isLogin === true`
    - **Validates: Requirements 1.1**

- [ ] 4. Checkpoint – tests verts à mi-parcours
  - Ensure all tests pass so far, ask the user if questions arise.

- [ ] 5. Wire `createLoginClient` into `handleSubmit`
  - [ ] 5.1 Replace the global Supabase client with the local login client in the login branch
    - In `handleSubmit`, inside the `isLogin` branch, remove the `const { data, error } = await supabase.auth.signInWithPassword(…)` call that uses the globally imported client; replace with `const loginClient = createLoginClient(rememberMe);` followed by `const { error } = await loginClient.auth.signInWithPassword({ email, password });`
    - The `signUp` branch continues to use the global client unchanged
    - _Requirements: 2.1, 3.1, 5.3_

  - [ ]* 5.2 Write property test for correct client dispatch on login (Property 4 — call site)
    - **Property 4 (call site): signInWithPassword appelé sur le bon client**
    - Mock `createClient` from `@supabase/supabase-js` to return a spy; use `fc.boolean()` × `fc.emailAddress()` × `fc.string()` to generate inputs
    - Assert `signInWithPassword` is called on the locally created client, not on the exported global from `src/lib/supabase.ts`
    - **Validates: Requirements 2.1, 3.1, 5.3**

  - [ ]* 5.3 Write property test for global client invariance (Property 7)
    - **Property 7: Invariance du client global**
    - Capture a reference to the exported `supabase` from `src/lib/supabase.ts` before form submission; after any submission (success or error, any `rememberMe`), assert the reference and its `auth` methods are identical
    - **Validates: Requirements 5.3**

- [ ] 6. Implement and test post-login behaviour
  - [ ] 6.1 Verify redirection and error handling are unaffected
    - Confirm that `router.push('/dashboard')` is still called after a successful `signInWithPassword` (no change needed, but verify the existing `setTimeout` logic is preserved)
    - Confirm that the `finally` block still resets `loading` to `false` in all cases
    - _Requirements: 2.3, 3.3, 4.3_

  - [ ]* 6.2 Write property test for redirection on success (Property 5)
    - **Property 5: Redirection vers le Tableau_De_Bord après succès**
    - Mock `signInWithPassword` to resolve successfully; use `fc.boolean()` for `rememberMe`
    - Assert `router.push` is called with `'/dashboard'` regardless of `rememberMe`
    - **Validates: Requirements 2.3, 3.3**

  - [ ]* 6.3 Write property test for `rememberMe` conservation on error (Property 6)
    - **Property 6: Conservation de rememberMe lors d'une erreur**
    - Mock `signInWithPassword` to reject; use `fc.boolean()` × `fc.string()` (error message)
    - Assert the rendered `rememberMe` state after the failed submission equals the initial state
    - **Validates: Requirements 4.3, 4.4**

  - [ ]* 6.4 Write property test for auth error message mapping (Property 8)
    - **Property 8: Mapping d'erreurs d'authentification**
    - Use a generator that produces strings containing the substring `'Invalid login credentials'` (e.g. `fc.string().map(s => s + 'Invalid login credentials' + s)`)
    - Assert the displayed error message is exactly `'Email ou mot de passe incorrect'`
    - **Validates: Requirements 4.1**

  - [ ]* 6.5 Write unit test for unavailable Supabase client
    - Mock env vars as undefined so `createClient` throws; verify the displayed error is `'Service indisponible. Réessayez plus tard.'`
    - _Requirements: 4.2_

- [ ] 7. Final checkpoint – suite complète verte
  - Run the full test suite (`npm test`). Ensure all tests pass. Ask the user if any questions arise before proceeding.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP delivery.
- The implementation is confined to **one file**: `src/app/auth/page.tsx`. No new runtime dependency is introduced; test tooling is devDependencies only.
- Property tests use `fast-check` with a minimum of 100 runs each (configure via `fc.configureGlobal({ numRuns: 100 })` in the test setup or per-test).
- Each property test should carry a tag comment: `// Feature: remember-me-checkbox, Property {N}: {property_text}`.
- The `signUp` branch is intentionally left unchanged — `rememberMe` only applies to login.
- `detectSessionInUrl: false` in `createLoginClient` prevents the local client from intercepting OAuth tokens already handled by `/auth/callback/route.ts`.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["2.3", "3.1", "3.2"] },
    { "id": 3, "tasks": ["3.3", "3.4", "3.5", "3.6", "5.1"] },
    { "id": 4, "tasks": ["5.2", "5.3", "6.1"] },
    { "id": 5, "tasks": ["6.2", "6.3", "6.4", "6.5"] }
  ]
}
```
