# Requirements Document

## Introduction

Cette fonctionnalité rend opérationnelle la case à cocher « Se souvenir de moi » déjà présente dans le formulaire de connexion de l'application de recettes. Actuellement, la case est affichée mais n'a ni état React ni effet sur la session Supabase. L'objectif est de contrôler la durée de vie de la session : lorsque la case est cochée, la session persiste au-delà des redémarrages du navigateur ; lorsqu'elle est décochée, la session expire à la fermeture de l'onglet ou du navigateur.

## Glossary

- **Formulaire_Connexion** : le formulaire de connexion affiché dans `src/app/auth/page.tsx` en mode `isLogin`.
- **Case_Souvenir** : la case à cocher « Se souvenir de moi » du Formulaire_Connexion.
- **Client_Supabase** : l'instance du client Supabase créée dans `src/lib/supabase.ts` via `createClient` de `@supabase/supabase-js`.
- **Client_Supabase_Session_Courte** : instance du Client_Supabase configurée avec `persistSession: false` et le stockage en `sessionStorage`, utilisée lorsque la Case_Souvenir est décochée.
- **Client_Supabase_Session_Longue** : instance du Client_Supabase configurée avec `persistSession: true` et le stockage en `localStorage`, utilisée lorsque la Case_Souvenir est cochée.
- **Session_Persistante** : session d'authentification stockée dans `localStorage`, survivant aux redémarrages du navigateur.
- **Session_Ephemere** : session d'authentification stockée dans `sessionStorage`, détruite à la fermeture de l'onglet ou du navigateur.
- **Middleware** : le fichier `src/middleware.ts` qui protège les routes côté serveur via les cookies de session.
- **Tableau_De_Bord** : la page `/dashboard`, accessible uniquement aux utilisateurs authentifiés.

## Requirements

### Requirement 1: État et affichage de la Case_Souvenir

**User Story:** En tant qu'utilisateur, je veux que la case « Se souvenir de moi » reflète visuellement mon choix, afin de savoir si ma préférence de session est bien prise en compte.

#### Acceptance Criteria

1. THE Formulaire_Connexion SHALL afficher la Case_Souvenir uniquement en mode connexion (`isLogin === true`).
2. THE Formulaire_Connexion SHALL initialiser la Case_Souvenir à l'état décoché par défaut.
3. WHEN l'utilisateur clique sur la Case_Souvenir, THE Formulaire_Connexion SHALL basculer l'état de la Case_Souvenir entre coché et décoché.
4. WHILE la Case_Souvenir est cochée, THE Formulaire_Connexion SHALL afficher la Case_Souvenir dans un état visuellement distinct (cochée).
5. WHILE la Case_Souvenir est décochée, THE Formulaire_Connexion SHALL afficher la Case_Souvenir dans un état visuellement distinct (décochée).

---

### Requirement 2: Connexion avec session persistante

**User Story:** En tant qu'utilisateur, je veux que ma session survive aux redémarrages du navigateur lorsque je coche « Se souvenir de moi », afin de ne pas avoir à me reconnecter à chaque visite.

#### Acceptance Criteria

1. WHEN l'utilisateur soumet le Formulaire_Connexion avec la Case_Souvenir cochée, THE Client_Supabase_Session_Longue SHALL appeler `signInWithPassword` avec les identifiants fournis.
2. WHEN la connexion réussit via le Client_Supabase_Session_Longue, THE Formulaire_Connexion SHALL stocker le jeton de session dans `localStorage`.
3. WHEN la connexion réussit via le Client_Supabase_Session_Longue, THE Formulaire_Connexion SHALL rediriger l'utilisateur vers le Tableau_De_Bord.
4. WHILE une Session_Persistante est active, THE Middleware SHALL autoriser l'accès aux routes protégées sans nouvelle authentification, même après un redémarrage du navigateur.

---

### Requirement 3: Connexion avec session éphémère

**User Story:** En tant qu'utilisateur soucieux de la confidentialité, je veux que ma session se termine automatiquement à la fermeture du navigateur lorsque je laisse la case décochée, afin de limiter l'accès non autorisé sur un appareil partagé.

#### Acceptance Criteria

1. WHEN l'utilisateur soumet le Formulaire_Connexion avec la Case_Souvenir décochée, THE Client_Supabase_Session_Courte SHALL appeler `signInWithPassword` avec les identifiants fournis.
2. WHEN la connexion réussit via le Client_Supabase_Session_Courte, THE Formulaire_Connexion SHALL stocker le jeton de session dans `sessionStorage`.
3. WHEN la connexion réussit via le Client_Supabase_Session_Courte, THE Formulaire_Connexion SHALL rediriger l'utilisateur vers le Tableau_De_Bord.
4. WHEN l'utilisateur ferme tous les onglets du navigateur, THE Client_Supabase_Session_Courte SHALL détruire la Session_Ephemere.
5. WHEN l'utilisateur rouvre le navigateur après avoir fermé tous les onglets, THE Middleware SHALL refuser l'accès aux routes protégées et rediriger l'utilisateur vers le Formulaire_Connexion.

---

### Requirement 4: Gestion des erreurs de connexion

**User Story:** En tant qu'utilisateur, je veux recevoir un message d'erreur clair en cas d'échec de connexion, quel que soit l'état de la Case_Souvenir, afin de comprendre ce qui s'est passé.

#### Acceptance Criteria

1. IF `signInWithPassword` retourne une erreur d'identifiants invalides, THEN THE Formulaire_Connexion SHALL afficher le message « Email ou mot de passe incorrect » sans effacer les champs email et mot de passe.
2. IF le Client_Supabase est indisponible lors de la soumission, THEN THE Formulaire_Connexion SHALL afficher le message « Service indisponible. Réessayez plus tard. ».
3. IF une erreur réseau survient lors de l'appel à `signInWithPassword`, THEN THE Formulaire_Connexion SHALL afficher un message d'erreur générique et restaurer le bouton de soumission à son état actif.
4. WHEN une erreur est affichée, THE Formulaire_Connexion SHALL conserver l'état courant de la Case_Souvenir.

---

### Requirement 5: Instantiation du client Supabase selon le choix de persistance

**User Story:** En tant que développeur, je veux que la stratégie de stockage de session soit déterminée dynamiquement par l'état de la Case_Souvenir, afin de ne pas modifier le client Supabase global partagé par le reste de l'application.

#### Acceptance Criteria

1. WHEN la Case_Souvenir est cochée au moment de la soumission, THE Formulaire_Connexion SHALL instancier le Client_Supabase_Session_Longue avec `storage: localStorage` et `persistSession: true`.
2. WHEN la Case_Souvenir est décochée au moment de la soumission, THE Formulaire_Connexion SHALL instancier le Client_Supabase_Session_Courte avec `storage: sessionStorage` et `persistSession: false`.
3. THE Formulaire_Connexion SHALL utiliser le client instancié localement pour `signInWithPassword`, sans modifier le Client_Supabase global exporté par `src/lib/supabase.ts`.
4. IF `localStorage` ou `sessionStorage` est indisponible dans l'environnement (ex. : SSR), THEN THE Formulaire_Connexion SHALL différer l'instanciation du client au contexte navigateur uniquement.

---

### Requirement 6: Accessibilité de la Case_Souvenir

**User Story:** En tant qu'utilisateur utilisant un lecteur d'écran ou la navigation au clavier, je veux pouvoir interagir avec la case « Se souvenir de moi » de façon accessible, afin de bénéficier de la même expérience que les autres utilisateurs.

#### Acceptance Criteria

1. THE Case_Souvenir SHALL être associée à une balise `<label>` via l'attribut `htmlFor` correspondant à l'`id` de la case, permettant d'activer la case par clic sur le libellé.
2. THE Case_Souvenir SHALL exposer un attribut `aria-checked` reflétant son état courant (coché ou décoché).
3. WHEN la Case_Souvenir reçoit le focus clavier, THE Formulaire_Connexion SHALL afficher un indicateur de focus visible conforme aux critères WCAG 2.1 niveau AA.
4. THE Case_Souvenir SHALL être atteignable et activable via la touche `Tab` et la barre espace dans l'ordre naturel du formulaire.
