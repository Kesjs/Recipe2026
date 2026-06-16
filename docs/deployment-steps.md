# Steps de Déploiement - Corrections Authentification

## Phase 1: Backup & Préparation ⚠️

### 1.1 Backup de la base de données Supabase
```bash
# Télécharger un dump de votre DB Supabase actuelle
# Aller sur: https://supabase.com/dashboard → Project → Database → Backups → Download
# Ou via CLI:
supabase db pull
```

### 1.2 Vérifier l'état courant
```bash
# Voir les utilisateurs et profiles existants
SELECT COUNT(*) FROM auth.users;
SELECT COUNT(*) FROM profiles;
```

---

## Phase 2: Déployer le Schema SQL 📝

### Option A: Via Supabase Dashboard (Recommandé)

1. Aller à: **https://supabase.com/dashboard**
2. Sélectionner votre projet
3. Aller à: **SQL Editor**
4. Créer une nouvelle query
5. Copier le contenu de `supabase/schema.sql`
6. Exécuter la query complète

**⚠️ Important:** 
- Les `DROP POLICY IF EXISTS` ne causeront pas d'erreurs
- Les triggers seront mis à jour automatiquement
- Les indexes seront créés s'ils n'existent pas

### Option B: Via Supabase CLI

```bash
# Assurez-vous que Supabase CLI est installé
supabase --version

# Appliquer les migrations
supabase db push

# Ou mettre à jour le schema directement
supabase migration up
```

### Option C: Vérifier les changements appliqués

```sql
-- Vérifier que le trigger a été mis à jour
SELECT pg_get_functiondef(oid) 
FROM pg_proc 
WHERE proname = 'handle_new_user';

-- Vérifier les policies sur profiles
SELECT policyname, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- Vérifier les indexes
SELECT indexname FROM pg_indexes 
WHERE tablename = 'profiles';
```

---

## Phase 3: Déployer le Code 💻

### 3.1 Mettre à jour le code local

```bash
# Vérifier les changements (si vous avez clonné le repo)
git status

# Ou si vous gérez manuellement:
# - Éditer src/app/auth/page.tsx (timeout 1200ms)
# - Éditer src/app/dashboard/page.tsx (error logging)
```

### 3.2 Tester localement

```bash
# Installer les dépendances (au cas où)
npm install

# Démarrer le serveur de dev
npm run dev

# La app doit être accessible à http://localhost:3000
```

### 3.3 Tester le flux d'authentification

**Manual Test:**
1. Ouvrir http://localhost:3000/auth
2. Cliquer "Créer un compte"
3. Remplir: Email, Password (6+ chars), Nom complet
4. Cliquer "Créer un compte"
5. **Attendre:** Message vert "Compte créé ! Redirection..."
6. **Vérifier:** Redirection automatique vers `/dashboard` (après ~1200ms)
7. **Vérifier:** Avatar avec initiales, email, et stats (0 recettes, 0 favoris)

**Automated Test:**
```bash
# Exécuter les tests d'authentification
npm run test -- src/test/auth-flow.test.ts

# Résultat attendu: ✓ Tous les tests passent
```

### 3.4 Vérifier les logs d'erreur

Dans les DevTools de votre navigateur (F12 → Console):
- Chercher les messages du dashboard
- Vérifier qu'il n'y a pas d'erreurs rouges
- Si erreur: consulter "Debugging" section

---

## Phase 4: Déployer en Production 🚀

### 4.1 Builder l'app

```bash
# Vérifier qu'il n'y a pas d'erreurs TypeScript
npm run build

# Résultat attendu: ✓ Le build réussit
```

### 4.2 Déployer (selon votre plateforme)

#### **Si vous utilisez Vercel:**
```bash
# Simplement pusher le code vers votre repo Git
git add .
git commit -m "fix: authentication flow - trigger, RLS, timeouts, error logging"
git push origin main

# Vercel déploie automatiquement
# Vérifier: https://vercel.com/dashboard
```

#### **Si vous utilisez une autre plateforme (Heroku, Railway, etc.):**
```bash
# Suivre les étapes de déploiement spécifiques à votre plateforme
# S'assurer que les variables d'environnement sont configurées:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 4.3 Vérifier que Supabase est mise à jour

- Aller à votre dashboard Supabase
- Vérifier que les changements de schema sont appliqués
- S'il n'y a rien: Exécuter le schema SQL manuellement (Phase 2)

---

## Phase 5: Validation Post-Déploiement ✅

### 5.1 Test de Sign Up

```
1. Accéder à https://app.recipe.com/auth (votre URL)
2. Sign up: nouvel email
3. Attendre ~2 secondes
4. VÉRIFIER: Redirection vers /dashboard
5. VÉRIFIER: Avatar + email visible
6. VÉRIFIER: Pas d'erreurs en DevTools
```

### 5.2 Test de Sign In

```
1. Déconnexion (bouton en bas)
2. Retour à /auth
3. Remplir email + password
4. Cliquer "Se connecter"
5. VÉRIFIER: Redirection vers /dashboard
6. VÉRIFIER: Même profil, recettes, favoris
```

### 5.3 Test des RLS Policies

```
1. Dashboard chargé
2. Cliquer "Nouvelle recette"
3. Créer une recette
4. Vérifier qu'elle apparaît dans "Mes recettes"
5. Signout
6. Aller à /recettes
7. VÉRIFIER: Votre recette est visible pour les autres utilisateurs
8. Signout et signin avec un autre compte
9. VÉRIFIER: Vous NE pouvez pas modifier/supprimer les recettes des autres
```

### 5.4 Surveiller les logs

- Vérifier les logs d'erreur Supabase (Database → Query Editor)
- Vérifier les logs d'application (selon votre plateforme)
- Chercher les messages d'erreur concernant le trigger ou RLS

---

## Phase 6: Rollback (Si nécessaire) 🔄

### Si quelque chose ne fonctionne pas:

#### **Option 1: Restaurer depuis backup**
```bash
# Restaurer le backup téléchargé en Phase 1
supabase db restore backup-file-name
# Ou via dashboard: Backups → Restore
```

#### **Option 2: Revert du code**
```bash
# Si vous êtes sur Git:
git revert HEAD

# Puis redéployer
git push origin main
```

#### **Option 3: Exécuter le ancien schema**
```sql
-- Récréer les anciens triggers/policies
-- (À moins que vous aviez gardé un backup)
```

---

## 🆘 Troubleshooting

### Problème: "Boucle infinie auth → dashboard → auth"
**Causes possibles:**
- Cookies Supabase non définis → Vérifier `.env.local`
- Timeout trop court → Augmenter à 1500ms temporairement
- Projet Supabase non actif → Vérifier status du projet

**Solution:**
```typescript
// Augmenter temporairement pour debug
setTimeout(() => window.location.href = redirectTo, 2000);
// Puis vérifier les logs
```

### Problème: "Profile non créé après signup"
**Causes possibles:**
- Trigger pas exécuté → Vérifier le trigger dans Supabase
- RLS policy rejette INSERT → Vérifier que la policy est à `true`
- raw_user_meta_data est NULL → Vérifier signup avec nom

**Vérifier:**
```sql
-- Les profiles créés
SELECT COUNT(*) FROM profiles;

-- Le dernier trigger exécuté
SELECT * FROM profiles WHERE created_at > NOW() - INTERVAL '1 hour';
```

### Problème: "Dashboard charge mais affiche "Chargement...""
**Causes possibles:**
- `getUser()` ne retourne pas l'utilisateur → Vérifier session
- Erreur lors du chargement des recettes → Vérifier RLS
- Cookies perdus entre pages → Vérifier localStorage

**Vérifier:**
- DevTools Console → Chercher "Error getting user"
- DevTools Application → Cookies → Chercher `sb-*-auth-token`
- DevTools Network → Vérifier les requêtes Supabase

---

## 📋 Checklist Finale

- [ ] Schema SQL appliqué à Supabase
- [ ] Code mergé et buildé
- [ ] Tests locaux passent
- [ ] Déploiement en production réussi
- [ ] Sign up fonctionne
- [ ] Sign in fonctionne
- [ ] Dashboard s'affiche
- [ ] RLS policies respectées
- [ ] Pas d'erreurs en DevTools
- [ ] Logs d'erreur visibles si problèmes

---

## 📞 Support

Si vous rencontrez des problèmes:

1. **Vérifier les logs:**
   - Supabase Dashboard → Logs
   - DevTools → Console & Network
   
2. **Vérifier le schema:**
   - Exécuter les vérifications SQL de Phase 2.3

3. **Contacter le support:**
   - Supabase: https://supabase.com/support
   - Votre équipe de déploiement

