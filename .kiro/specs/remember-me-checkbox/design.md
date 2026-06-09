# Design Document — remember-me-checkbox

## Overview

La case à cocher « Se souvenir de moi » est déjà rendue dans `src/app/auth/page.tsx` mais n'a aucun état React ni effet sur la session Supabase. Cette fonctionnalité la rend opérationnelle en contrôlant la stratégie de stockage de la session d'authentification :

- **Case cochée** → client Supabase instancié avec `storage: localStorage` et `persistSession: true` → la session survit aux redémarrages du navigateur.
- **Case décochée** → client Supabase instancié avec `storage: sessionStorage` et `persistSession: false` → la session est détruite à la fermeture de l'onglet.

L'approche retenue crée un client Supabase local au moment de la soumission du formulaire, **sans jamais muter le client global** exporté par `src/lib/supabase.ts`. Le middleware (`src/middleware.ts`) continue de fonctionner tel quel via `@supabase/ssr` et les cookies ; aucune modification ne lui est apportée.

Le périmètre est intentionnellement limité : une seule modification de fichier (`src/app/auth/page.tsx`), sans dépendance nouvelle, sans nouvelle route, sans extraction de composant, sans hook personnalisé.

---

## Architecture

### Vue d'ensemble des flux

```mermaid
flowchart TD
    A[Utilisateur remplit le formulaire] --> B{Case_Souvenir cochée ?}
    B -- Oui --> C[createClient\nstorage: localStorage\npersistSession: true]
    B -- Non --> D[createClient\nstorage: sessionStorage\npersistSession: false]
    C --> E[signInWithPassword]
    D --> E
    E -- Succès --> F[router.push /dashboard]
    E -- Erreur --> G[Afficher message d'erreur\nConserver état rememberMe]

    subgraph Middleware (inchangé)
        H[Lecture cookie de session\nvia @supabase/ssr]
        H -- Session valide --> I[Accès autorisé]
        H -- Pas de session --> J[Redirect /auth]
    end
```

### Contraintes architecturales

| Contrainte | Décision |
|---|---|
| Ne pas muter le client global | Instanciation locale dans `handleSubmit` uniquement |
| Pas de changement au middleware | Le cookie de session est géré par Supabase lui-même via `@supabase/ssr` |
| Client Component uniquement | `typeof window` est toujours `'object'` — guard SSR pour sécurité |
| `@supabase/supabase-js` déjà installé (v2.43.4) | Aucune nouvelle dépendance |

---

## Components and Interfaces

### Modifications de `src/app/auth/page.tsx`

Ce fichier est le seul modifié. Les changements sont chirurgicaux :

#### 1. Nouvel état React

```typescript
const [rememberMe, setRememberMe] = useState(false);
```

#### 2. Fonction `createLoginClient`

Fonction utilitaire locale (dans le module, pas exportée) qui encapsule la logique d'instanciation :

```typescript
import { createClient } from '@supabase/supabase-js';

function createLoginClient(rememberMe: boolean) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const storage = rememberMe ? localStorage : sessionStorage;
  return createClient(url, key, {
    auth: {
      storage,
      persistSession: rememberMe,
      autoRefreshToken: rememberMe,
      detectSessionInUrl: false,
    },
  });
}
```

> **Décision de design** : `detectSessionInUrl: false` évite que le client local n'intercepte les tokens OAuth dans l'URL, rôle déjà assumé par `/auth/callback/route.ts`.

#### 3. Mise à jour de `handleSubmit`

Dans la branche `isLogin`, remplacer l'import dynamique du client global par :

```typescript
// Avant
const { supabase } = await import("@/lib/supabase");
const { data, error } = await supabase.auth.signInWithPassword({ email, password });

// Après (login seulement)
const loginClient = createLoginClient(rememberMe);
const { error } = await loginClient.auth.signInWithPassword({ email, password });
```

La branche `signUp` continue d'utiliser le client global — le `rememberMe` n'a de sens que pour la connexion.

#### 4. Mise à jour du JSX de la `Case_Souvenir`

```tsx
<label htmlFor="remember-me" className="flex items-center space-x-2 cursor-pointer">
  <input
    id="remember-me"
    type="checkbox"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
    aria-checked={rememberMe}
    className="w-4 h-4 rounded border-zinc-500 text-emerald-600
               focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0
               focus:outline-none bg-transparent"
  />
  <span className="text-zinc-400">Se souvenir</span>
</label>
```

> **Décision de design** : `htmlFor`/`id` explicites pour l'accessibilité (critère 6.1). `aria-checked` redondant sur un `<input type="checkbox">` natif mais requis par le critère 6.2. Le focus ring Tailwind répond au WCAG 2.1 AA.

#### 5. Réinitialisation de `rememberMe` lors du basculement de mode

```typescript
const handleModeToggle = () => {
  setIsLogin(!isLogin);
  setRememberMe(false); // réinitialise lors du passage signup → login
  setError("");
  setFieldErrors({});
};
```

### Interface de `createLoginClient`

```typescript
function createLoginClient(rememberMe: boolean): SupabaseClient
```

| Paramètre | Type | Description |
|---|---|---|
| `rememberMe` | `boolean` | `true` → localStorage + persistSession ; `false` → sessionStorage + pas de persistance |
| **Retour** | `SupabaseClient` | Instance locale, non partagée, non exportée |

---

## Data Models

### État du composant `AuthPage`

| État | Type | Valeur initiale | Description |
|---|---|---|---|
| `isLogin` | `boolean` | `true` | Mode connexion / inscription |
| `email` | `string` | `""` | Champ email |
| `password` | `string` | `""` | Champ mot de passe |
| `name` | `string` | `""` | Champ nom (inscription uniquement) |
| `loading` | `boolean` | `false` | Soumission en cours |
| `error` | `string` | `""` | Message d'erreur global |
| `success` | `string` | `""` | Message de succès |
| `fieldErrors` | `object` | `{}` | Erreurs par champ |
| **`rememberMe`** *(nouveau)* | `boolean` | `false` | État de la Case_Souvenir |

### Stratégie de stockage de session Supabase

| `rememberMe` | `storage` | `persistSession` | `autoRefreshToken` | Durée de vie de la session |
|---|---|---|---|---|
| `true` | `localStorage` | `true` | `true` | Survit aux redémarrages du navigateur |
| `false` | `sessionStorage` | `false` | `false` | Détruite à la fermeture de l'onglet |

### Relation avec le middleware

Le middleware lit la session via les **cookies** gérés par `@supabase/ssr`. Supabase stocke également un cookie de session lors de `signInWithPassword` (indépendamment de `localStorage`/`sessionStorage`). Le comportement actuel du middleware reste inchangé. Quand `persistSession: false`, Supabase ne renouvelle pas le token, et le cookie expire, ce qui déclenche la redirection vers `/auth` lors de la prochaine visite.

---

## Correctness Properties

*Une propriété est une caractéristique ou un comportement qui doit être vrai pour toutes les exécutions valides d'un système — essentiellement, un énoncé formel de ce que le système doit faire. Les propriétés servent de pont entre les spécifications lisibles par l'humain et les garanties de correction vérifiables automatiquement.*

### Réflexion sur les redondances

Avant d'énoncer les propriétés, voici les consolidations effectuées après le prework :

- **1.4 et 1.5** (checkbox checked reflète l'état) → une seule propriété couvrant les deux valeurs booléennes.
- **2.1 et 3.1** (appel de signInWithPassword sur le bon client) → une propriété générale : pour tout état `rememberMe`, le bon client est instancié.
- **5.1 et 5.2** (instanciation du client selon rememberMe) → fusionnées dans la propriété ci-dessus.
- **2.3 et 3.3** (redirection vers /dashboard) → une seule propriété couvrant les deux branches.
- **2.2 et 3.2** (stockage du token) → une propriété générale sur la correspondance storage/rememberMe.

### Property 1: Visibilité conditionnelle de la Case_Souvenir

*Pour tout* état `isLogin` du formulaire, la Case_Souvenir est rendue si et seulement si `isLogin === true`.

**Validates: Requirements 1.1**

---

### Property 2: Toggle de la Case_Souvenir est une involution

*Pour tout* état initial `rememberMe`, cliquer sur la Case_Souvenir le bascule à `!rememberMe` ; cliquer une deuxième fois restaure l'état initial. Autrement dit : `toggle(toggle(state)) === state`.

**Validates: Requirements 1.3**

---

### Property 3: Rendu visuel cohérent avec l'état

*Pour tout* état `rememberMe` (vrai ou faux), l'attribut `checked` du `<input>` rendu et l'attribut `aria-checked` doivent tous deux être égaux à `rememberMe`.

**Validates: Requirements 1.4, 1.5, 6.2**

---

### Property 4: Instanciation du client selon la stratégie de persistance

*Pour tout* couple `(rememberMe: boolean, email: string, password: string)` soumis via le formulaire de connexion, le client Supabase instancié localement doit avoir :
- `auth.storage === localStorage` et `auth.persistSession === true` si `rememberMe === true`
- `auth.storage === sessionStorage` et `auth.persistSession === false` si `rememberMe === false`

Et `signInWithPassword` doit être appelé sur ce client local, jamais sur le client global de `src/lib/supabase.ts`.

**Validates: Requirements 2.1, 3.1, 5.1, 5.2, 5.3**

---

### Property 5: Redirection vers le Tableau_De_Bord après succès

*Pour tout* appel réussi à `signInWithPassword` (mocked), `router.push` doit être appelé avec `'/dashboard'`, quel que soit l'état de `rememberMe`.

**Validates: Requirements 2.3, 3.3**

---

### Property 6: Conservation de `rememberMe` lors d'une erreur

*Pour tout* état initial `rememberMe` et toute erreur retournée ou levée par `signInWithPassword`, la valeur de `rememberMe` après la soumission doit être identique à sa valeur avant la soumission.

**Validates: Requirements 4.3, 4.4**

---

### Property 7: Invariance du client global

*Pour toute* soumission du formulaire (succès ou erreur, rememberMe vrai ou faux), l'instance exportée par `src/lib/supabase.ts` ne doit pas être mutée — sa référence et son état interne doivent rester identiques avant et après la soumission.

**Validates: Requirements 5.3**

---

### Property 8: Mapping d'erreurs d'authentification

*Pour tout* message d'erreur retourné par Supabase contenant la chaîne `'Invalid login credentials'`, le message affiché dans le formulaire doit être exactement `'Email ou mot de passe incorrect'`.

**Validates: Requirements 4.1**

---

## Error Handling

### Erreurs de connexion

| Condition | Comportement |
|---|---|
| `error.message` contient `"Invalid login credentials"` | Affiche `"Email ou mot de passe incorrect"` |
| Aucun client Supabase (variables d'env absentes) | Affiche `"Service indisponible. Réessayez plus tard."` |
| `typeof window === 'undefined'` au moment de la soumission | Lève une erreur capturée → affiche message générique (ne devrait pas arriver en Client Component) |
| Erreur réseau ou autre erreur Supabase | Affiche `err.message` ou `"Une erreur est survenue. Réessayez."` |
| Toute erreur | `loading` repasse à `false` (via `finally`) ; `rememberMe` est conservé |

### Guard SSR

Bien que `'use client'` empêche l'exécution côté serveur, `createLoginClient` doit être appelé à l'intérieur de `handleSubmit` (exécuté uniquement côté navigateur) pour garantir que `localStorage`/`sessionStorage` sont disponibles. Si un appel venait à se produire côté serveur, le `try/catch` capture l'erreur `ReferenceError: localStorage is not defined`.

---

## Testing Strategy

### Approche duale

Les tests sont organisés en deux couches complémentaires :

1. **Tests unitaires / exemples** : comportements spécifiques et cas nominaux
2. **Tests à base de propriétés** : invariants universels vérifiés sur des entrées générées aléatoirement

### Bibliothèque de tests recommandée

- **Framework** : [Vitest](https://vitest.dev/) (compatible Next.js 14, déjà courant dans l'écosystème Vite/Next)
- **Rendu de composants** : [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Tests à base de propriétés** : [fast-check](https://fast-check.io/) (TypeScript-first, intégration Vitest native)

### Configuration des tests de propriétés

Chaque test de propriété doit tourner au minimum 100 itérations :

```typescript
import fc from 'fast-check';

// Exemple de configuration globale dans vitest.config.ts
// ou directement dans les tests :
fc.configureGlobal({ numRuns: 100 });
```

Chaque test de propriété doit être taggué :

```typescript
// Feature: remember-me-checkbox, Property {N}: {property_text}
```

### Tests unitaires (exemples et cas limites)

| Test | Critère couvert |
|---|---|
| Case_Souvenir initialisée à `false` au montage | 1.2 |
| `htmlFor` du `<label>` correspond à `id` du `<input>` | 6.1 |
| Checkbox activable au clavier (pas de `tabIndex=-1`, type `checkbox` natif) | 6.4 |
| Client Supabase indisponible → message `"Service indisponible..."` | 4.2 |
| Rendu en mode inscription → pas de Case_Souvenir dans le DOM | 1.1 |

### Tests de propriétés (fast-check)

Chaque propriété du design document est implémentée par un unique test `fc.assert(fc.property(...))` :

| Test de propriété | Propriété | Générateurs fast-check |
|---|---|---|
| Visibilité conditionnelle | Property 1 | `fc.boolean()` pour `isLogin` |
| Toggle est une involution | Property 2 | `fc.boolean()` pour l'état initial |
| Rendu cohérent avec état | Property 3 | `fc.boolean()` pour `rememberMe` |
| Instanciation du bon client | Property 4 | `fc.boolean()` × `fc.emailAddress()` × `fc.string()` |
| Redirection sur succès | Property 5 | `fc.boolean()` pour `rememberMe`, mock de `signInWithPassword` |
| Conservation de rememberMe sur erreur | Property 6 | `fc.boolean()` × `fc.string()` (message d'erreur) |
| Invariance du client global | Property 7 | `fc.boolean()` × `fc.emailAddress()` × `fc.string()` |
| Mapping erreurs auth | Property 8 | `fc.string()` contenant `'Invalid login credentials'` |

### Tests d'intégration

| Test | Critère couvert | Approche |
|---|---|---|
| Session persistante survit aux redémarrages | 2.4 | E2E (Playwright) : login avec rememberMe=true, clear sessionStorage, vérifier accès /dashboard |
| Session éphémère expirée après fermeture | 3.5 | E2E : login avec rememberMe=false, clear sessionStorage, vérifier redirect /auth |

### Tests de fumée (manuels)

| Test | Critère couvert |
|---|---|
| Focus ring visible sur la checkbox (WCAG 2.1 AA) | 6.3 |
| sessionStorage vide après fermeture du navigateur | 3.4 |
