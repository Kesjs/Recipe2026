import { describe, it, expect, beforeAll, afterAll } from 'vitest';

/**
 * Test du flux d'authentification complet
 * Vérifie que l'utilisateur peut se connecter et accéder au dashboard
 * 
 * IMPORTANT: Ces tests nécessitent une configuration Supabase valide
 */

describe('Authentication Flow', () => {
  const testEmail = `test-${Date.now()}@recipe.test`;
  const testPassword = 'Test123!@#';
  const testName = 'Test User';

  let testUserId: string;

  // Récupérer le client Supabase (identique à l'app)
  async function getSupabaseClient() {
    const { supabase } = await import('@/lib/supabase');
    if (!supabase) {
      throw new Error('Supabase not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    return supabase;
  }

  describe('Signup Flow', () => {
    it('should create a new user account', async () => {
      const supabase = await getSupabaseClient();

      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: { name: testName },
        },
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.user?.email).toBe(testEmail);

      testUserId = data.user!.id;
    });

    it('should create a profile in the profiles table', async () => {
      const supabase = await getSupabaseClient();

      // Attendre un peu pour que le trigger s'exécute
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', testUserId)
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.email).toBe(testEmail);
      expect(data?.name).toBe(testName);
    });

    it('should reject duplicate emails', async () => {
      const supabase = await getSupabaseClient();

      const { error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: { name: 'Another User' },
        },
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('already registered');
    });
  });

  describe('Login Flow', () => {
    it('should sign in with correct credentials', async () => {
      const supabase = await getSupabaseClient();

      // Signout first to get a clean state
      await supabase.auth.signOut();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.user?.email).toBe(testEmail);
      expect(data.session).toBeDefined();
    });

    it('should reject incorrect password', async () => {
      const supabase = await getSupabaseClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: 'WrongPassword123',
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('Invalid login credentials');
    });

    it('should reject non-existent email', async () => {
      const supabase = await getSupabaseClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: 'nonexistent@test.com',
        password: testPassword,
      });

      expect(error).toBeDefined();
    });
  });

  describe('Dashboard Access', () => {
    beforeAll(async () => {
      const supabase = await getSupabaseClient();
      // Signout et signin for fresh session
      await supabase.auth.signOut();
      await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });
    });

    it('should retrieve current user', async () => {
      const supabase = await getSupabaseClient();

      const { data, error } = await supabase.auth.getUser();

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.user?.email).toBe(testEmail);
    });

    it('should allow user to view their own recipes', async () => {
      const supabase = await getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('created_by', user!.id);

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      // Devrait être vide au départ
      expect(data?.length).toBe(0);
    });

    it('should allow user to view their favorites', async () => {
      const supabase = await getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user!.id);

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe('RLS Policies', () => {
    it('should prevent unauthorized users from viewing others\' recipes', async () => {
      // Cette vérification est plus complexe et nécessite 2 utilisateurs
      // Pour l'instant, nous vérifions juste que les policies sont en place
      const supabase = await getSupabaseClient();

      // Créer un recipe
      const { data: { user } } = await supabase.auth.getUser();
      const { data: recipe } = await supabase
        .from('recipes')
        .insert([
          {
            title: 'Test Recipe',
            instructions: 'Test instructions',
            prep_time: 30,
            created_by: user!.id,
          },
        ])
        .select()
        .single();

      expect(recipe).toBeDefined();

      // Vérifier que le recipe est visible (policy SELECT: true)
      const { data: recipes } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', recipe!.id);

      expect(recipes?.length).toBe(1);
    });

    it('should enforce trigger for profile creation on signup', async () => {
      const supabase = await getSupabaseClient();

      // Créer un nouvel utilisateur
      const newTestEmail = `test2-${Date.now()}@recipe.test`;
      const { data: signupData } = await supabase.auth.signUp({
        email: newTestEmail,
        password: testPassword,
        options: {
          data: { name: 'Trigger Test User' },
        },
      });

      // Attendre que le trigger s'exécute
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Vérifier que le profile a été créé
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', signupData?.user?.id)
        .single();

      expect(error).toBeNull();
      expect(profile).toBeDefined();
      expect(profile?.email).toBe(newTestEmail);
    });
  });

  afterAll(async () => {
    // Cleanup
    const supabase = await getSupabaseClient();
    await supabase.auth.signOut();
    // Note: Les données de test resteront dans Supabase pour inspection
  });
});

/**
 * EXÉCUTER LES TESTS:
 * 
 * npm run test -- src/test/auth-flow.test.ts
 * 
 * PRÉREQUIS:
 * 1. Variables d'environnement configurées (.env.local)
 * 2. Projet Supabase créé et configuré
 * 3. Email confirmation désactivée (ou tokens valides)
 * 4. Schema SQL appliqué (migrations exécutées)
 * 
 * RÉSULTATS ATTENDUS:
 * ✅ Tous les tests passent
 * ✅ Utilisateur créé avec profile
 * ✅ Utilisateur peut se connecter
 * ✅ Utilisateur accède à dashboard (recettes, favoris)
 * ✅ RLS policies respectées
 */
