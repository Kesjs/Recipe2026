-- ============================================================
-- NAYA CUISINE — seed-complete-update.sql
-- Script sécurisé avec transactions pour mise à jour complète
-- Plan: 12 Bénin + 11 Afrique + 5 International = 28 recettes
-- ============================================================

-- DÉBUT TRANSACTION — Sécurité: rollback en cas d'erreur
BEGIN;

-- ============================================================
-- 1. SUPPRESSION DES INGRÉDIENTS EXISTANTS (pour éviter les conflits)
-- ============================================================
DELETE FROM recipe_ingredients WHERE ingredient_id IN (
  SELECT id FROM ingredients WHERE name IN (
    'Igname', 'Farine de maïs', 'Huile de palme', 'Oignon', 'Ail', 'Piment', 'Sel',
    'Lait de chèvre', 'Petits poissons', 'Citron', 'Feuilles de courge',
    'Poisson ou viande', 'Sucre', 'Haricots rouges', 'Tomate concassée',
    'Pâte de tomate', 'Gingembre', 'Oeufs', 'Olives', 'Boeuf haché',
    'Lait', 'Pâte d''arachide', 'Lait de coco', 'Brèdes'
  )
);

DELETE FROM ingredients WHERE name IN (
  'Igname', 'Farine de maïs', 'Huile de palme', 'Oignon', 'Ail', 'Piment', 'Sel',
  'Lait de chèvre', 'Petits poissons', 'Citron', 'Feuilles de courge',
  'Poisson ou viande', 'Sucre', 'Haricots rouges', 'Tomate concassée',
  'Pâte de tomate', 'Gingembre', 'Oeufs', 'Olives', 'Boeuf haché',
  'Lait', 'Pâte d''arachide', 'Lait de coco', 'Brèdes'
);

-- ============================================================
-- 2. NOUVEAUX INGRÉDIENTS NÉCESSAIRES
-- ============================================================
INSERT INTO ingredients (id, name, calories_per_100g, proteins, carbs, lipids) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Fromage de chèvre', 300, 22.0, 0.0, 25.0),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Lait caillé',  60,  3.5,  4.5,  3.0),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Feuilles de manioc', 40,  2.0,  8.0, 0.3),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', 'Poisson séché', 280, 45.0,  0.0,  8.0),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'Graines de courge', 559, 30.0, 10.0, 49.0),
  ('f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'Champignons',  22,  3.0,  3.5,  0.3),
  ('a7b8c9d0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', 'Poulet entier', 165, 31.0,  0.0,  3.6),
  ('b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e', 'Agneau',  250, 25.0,  0.0, 17.0),
  ('c9d0e1f2-a3b4-4c5d-7e8f-9a0b1c2d3e4f', 'Raisins secs', 299,  3.0, 79.0,  0.5),
  ('d0e1f2a3-b4c5-4d6e-8f9a-0b1c2d3e4f5a', 'Amandes', 579, 21.0, 22.0, 50.0),
  ('e1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', 'Cannelle',  247,  4.0,  8.0,  0.0),
  ('f2a3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', 'Cardamome', 311, 11.0, 68.0,  7.0),
  ('a3b4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 'Clou de girofle', 274,  6.0, 66.0,  8.0),
  ('b4c5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', 'Curcuma', 354,  8.0, 65.0, 10.0),
  ('c5d6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', 'Paprika',  282, 14.0, 50.0, 13.0),
  ('ee6ef7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 'Igname', 118, 1.5, 27.9, 0.2),
  ('cc4cd5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 'Farine de maïs', 365, 8.0, 76.0, 4.5),
  ('55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 'Huile de palme', 884, 0.0, 0.0, 100.0),
  ('44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 'Oignon', 40, 1.1, 9.3, 0.1),
  ('66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 'Ail', 149, 6.4, 33.1, 0.5),
  ('88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d', 'Piment', 40, 2.0, 9.0, 0.4),
  ('99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 'Sel', 0, 0.0, 0.0, 0.0),
  ('662cd3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 'Lait de chèvre', 69, 3.6, 4.7, 3.5),
  ('aad1e2f3-a4b5-4c6d-7e8f-9a0b1c2d3e4f', 'Petits poissons', 130, 20.0, 0.0, 4.5),
  ('dda4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c', 'Citron', 29, 1.1, 9.3, 0.3),
  ('ff7fa8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 'Feuilles de courge', 45, 3.0, 8.0, 0.5),
  ('22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 'Poisson ou viande', 150, 20.0, 0.0, 5.0),
  ('995fa6b7-c8d9-4e0f-1a2b-3c4d5e6f7a8b', 'Sucre', 387, 0.0, 100.0, 0.0),
  ('11a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 'Haricots rouges', 127, 8.7, 22.8, 0.5),
  ('aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 'Tomate concassée', 32, 1.1, 7.0, 0.2),
  ('d6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a', 'Pâte de tomate', 82, 4.3, 13.3, 0.5),
  ('77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 'Gingembre', 80, 1.8, 17.8, 0.8),
  ('773de4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f', 'Oeufs', 155, 13.0, 1.1, 11.0),
  ('33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b', 'Olives', 115, 0.8, 6.0, 10.7),
  ('22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 'Boeuf haché', 250, 26.0, 0.0, 15.0),
  ('11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 'Lait', 42, 3.4, 4.8, 1.0),
  ('ee5e6f7a-b9c0-4d1e-2f3a-4b5c6d7e8f9b', 'Pâte d''arachide', 588, 25.0, 20.0, 50.0),
  ('bb7b8c9d-e0f1-4b2c-3d4e-5f6a7b8c9d0e', 'Lait de coco', 230, 2.3, 5.0, 24.0),
  ('cc8c9d0e-f1a2-4c3d-4e5f-6a7b8c9d0e1f', 'Brèdes', 35, 3.0, 6.0, 0.5)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, calories_per_100g=EXCLUDED.calories_per_100g, proteins=EXCLUDED.proteins, carbs=EXCLUDED.carbs, lipids=EXCLUDED.lipids;

-- ============================================================
-- 2. NOUVELLE CATÉGORIE BÉNIN
-- ============================================================
INSERT INTO categories (id, name, title, description) VALUES
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'Bénin', 'Cuisine Béninoise', 
   'Trésors culinaires du Bénin : du sud au nord, des saveurs authentiques et héritage culturel.')
ON CONFLICT (name) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

-- ============================================================
-- 3. BASE BÉNINOISE (12 recettes) — 3 existantes + 9 nouvelles
-- ============================================================

-- 3.1 Wagassi (fromage de chèvre frais) — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Wagassi',
  'Fromage de chèvre frais béninois, onctueux et légèrement acidulé. Se déguste nature, grillé ou en sauce.',
  '1. Chauffer le lait de chèvre à 38°C, ajouter le présure.' || chr(10) ||
  '2. Laisser cailler 1 heure à température ambiante.' || chr(10) ||
  '3. Égoutter le caillé dans un moule perforé 12 heures.' || chr(10) ||
  '4. Démouler le fromage, laisser affiner 24 heures au réfrigérateur.' || chr(10) ||
  '5. Pour servir : couper en tranches et griller à la poêle 2 min par côté.' || chr(10) ||
  '6. Accompagner de sauce tomate ou d''ignames pilés.',
  15, 'Facile', 'Bénin',
  'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 300),
  ('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', '662cd3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 1000),
  ('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 8)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3.2 Abobo (igname pilée au lait caillé) — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Abobo',
  'Igname pilée mélangée au lait caillé, spécialité du nord du Bénin. Texture crémeuse unique et goût subtil.',
  '1. Éplucher l''igname, couper en morceaux, cuire à l''eau bouillante 25 min.' || chr(10) ||
  '2. Égoutter et piler dans un mortier jusqu''à pâte lisse.' || chr(10) ||
  '3. Incorporer progressivement le lait caillé en pilant.' || chr(10) ||
  '4. Ajouter le sel et continuer de piler 5 minutes.' || chr(10) ||
  '5. Former des boules avec les mains mouillées.' || chr(10) ||
  '6. Servir avec une sauce tomate ou arachide.',
  20, 'Moyen', 'Bénin',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'ee6ef7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 800),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 400),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 6)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3.3 Akassa (galettes de maïs) — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b3c4d5e6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Akassa',
  'Petites galettes de farine de maïs fermentée, croustillantes dehors et moelleuses dedans. Street food béninois.',
  '1. Mélanger la farine de maïs avec de l''eau tiède.' || chr(10) ||
  '2. Laisser fermenter 12 heures à température ambiante.' || chr(10) ||
  '3. Saler la pâte et ajouter un peu d''eau si trop épaisse.' || chr(10) ||
  '4. Chauffer l''huile de palme à feu moyen-vif.' || chr(10) ||
  '5. Verser des cuillères de pâte pour former des galettes.' || chr(10) ||
  '6. Frire 2-3 minutes par côté jusqu''à dorure.' || chr(10) ||
  '7. Égoutter sur papier absorbant. Servir chaud.',
  18, 'Facile', 'Bénin',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b3c4d5e6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'cc4cd5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 300),
  ('b3c4d5e6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 80),
  ('b3c4d5e6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 5)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3.4 Déguê (sauce aux feuilles de manioc) — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Déguê',
  'Sauce onctueuse aux feuilles de manioc et poisson séché, spécialité du sud Bénin. Goût profond et authentique.',
  '1. Laver et hacher les feuilles de manioc.' || chr(10) ||
  '2. Faire tremper le poisson séché 30 minutes, puis couper.' || chr(10) ||
  '3. Faire revenir oignon et ail dans l''huile de palme.' || chr(10) ||
  '4. Ajouter le poisson séché, cuire 5 minutes.' || chr(10) ||
  '5. Incorporer les feuilles de manioc hachées.' || chr(10) ||
  '6. Verser 400 ml d''eau, ajouter piment et sel.' || chr(10) ||
  '7. Mijoter 20 minutes à feu moyen.' || chr(10) ||
  '8. Servir avec du riz ou de l''igname pilée.',
  25, 'Moyen', 'Bénin',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 500),
  ('b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', 'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', 150),
  ('b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 80),
  ('b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 10),
  ('b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 50),
  ('b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d', 5),
  ('b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 6)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3.5 Ignames Frites — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b5c6d7e8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Ignames Frites',
  'Bâtonnets d''igname frits croustillants, accompagnés de sauce pimentée. Alternative délicieuse aux frites classiques.',
  '1. Éplucher l''igname et couper en bâtonnets réguliers.' || chr(10) ||
  '2. Rincer à l''eau froide pour éliminer l''excès d''amidon.' || chr(10) ||
  '3. Sécher soigneusement avec un torchon.' || chr(10) ||
  '4. Chauffer l''huile de palme à 180°C.' || chr(10) ||
  '5. Frire par petites quantités 4-5 minutes jusqu''à dorure.' || chr(10) ||
  '6. Égoutter sur papier absorbant, saler immédiatement.' || chr(10) ||
  '7. Préparer la sauce : mélanger piment, oignon et huile.' || chr(10) ||
  '8. Servir chaud avec la sauce pimentée.',
  20, 'Facile', 'Bénin',
  'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b5c6d7e8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'ee6ef7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 800),
  ('b5c6d7e8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 150),
  ('b5c6d7e8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d', 8),
  ('b5c6d7e8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 30),
  ('b5c6d7e8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 5)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3.6 Fritures de Poissons — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Fritures de Poissons',
  'Petits poissons frits croustillants, assaisonnés aux épices locales. Street food incontournable des marchés béninois.',
  '1. Nettoyer les petits poissons, vider et rincer.' || chr(10) ||
  '2. Préparer la marinade : ail, gingembre, piment, sel, citron.' || chr(10) ||
  '3. Mariner les poissons 30 minutes au réfrigérateur.' || chr(10) ||
  '4. Chauffer l''huile de palme à feu moyen-vif.' || chr(10) ||
  '5. Frire les poissons 3-4 minutes par côté jusqu''à croustillant.' || chr(10) ||
  '6. Égoutter sur papier absorbant.' || chr(10) ||
  '7. Servir avec de l''aloco ou du riz.' || chr(10) ||
  '8. Accompagner de sauce pimentée si désiré.',
  25, 'Facile', 'Bénin',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'aad1e2f3-a4b5-4c6d-7e8f-9a0b1c2d3e4f', 600),
  ('b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 15),
  ('b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 10),
  ('b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d', 6),
  ('b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'dda4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c', 40),
  ('b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 100),
  ('b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 8)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3.7 Sauce Crincrin (feuilles de courge) — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Sauce Crincrin',
  'Sauce verte aux feuilles de courge et graines de courge, riche en protéines. Spécialité nutritive du Bénin.',
  '1. Laver et hacher finement les feuilles de courge.' || chr(10) ||
  '2. Torréfier les graines de courge à sec, puis moudre.' || chr(10) ||
  '3. Faire revenir oignon et ail dans l''huile de palme.' || chr(10) ||
  '4. Ajouter le poisson ou la viande, cuire 5 minutes.' || chr(10) ||
  '5. Incorporer les feuilles de courge hachées.' || chr(10) ||
  '6. Ajouter la poudre de graines de courge et 300 ml d''eau.' || chr(10) ||
  '7. Mijoter 15 minutes à feu doux.' || chr(10) ||
  '8. Assaisonner et servir avec du riz ou de l''igname.',
  22, 'Moyen', 'Bénin',
  'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', 'ff7fa8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 400),
  ('b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 80),
  ('b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 300),
  ('b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 80),
  ('b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 12),
  ('b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 45),
  ('b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 6)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3.8 Dakouin (bouillie de maïs) — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Dakouin',
  'Bouillie onctueuse de farine de maïs, souvent servie au petit-déjeuner. Réconfortante et nourrissante.',
  '1. Diluer la farine de maïs dans 500 ml d''eau froide.' || chr(10) ||
  '2. Porter 1 litre d''eau à ébullition dans une casserole.' || chr(10) ||
  '3. Verser le mélange de farine dans l''eau bouillante en remuant.' || chr(10) ||
  '4. Remuer constamment à feu moyen 10 minutes.' || chr(10) ||
  '5. Ajouter le sucre et une pincée de sel.' || chr(10) ||
  '6. Continuer de remouter 5 minutes jusqu''à consistance désirée.' || chr(10) ||
  '7. Retirer du feu, laisser reposer 2 minutes.' || chr(10) ||
  '8. Servir chaud, éventuellement avec du lait.',
  15, 'Facile', 'Bénin',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e', 'cc4cd5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 150),
  ('b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e', '995fa6b7-c8d9-4e0f-1a2b-3c4d5e6f7a8b', 30),
  ('b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 3),
  ('b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e', '662cd3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 100)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3.9 Atassi (ragoût de haricots) — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'Atassi',
  'Ragoût onctueux de haricots rouges à la sauce tomate et huile de palme. Plat familial économique et savoureux.',
  '1. Faire tremper les haricots rouges toute la nuit.' || chr(10) ||
  '2. Cuire les haricots à l''eau bouillante 45 minutes jusqu''à tendreté.' || chr(10) ||
  '3. Faire revenir oignon et ail dans l''huile de palme.' || chr(10) ||
  '4. Ajouter la tomate concassée et la pâte de tomate.' || chr(10) ||
  '5. Incorporer les haricots cuits dans la sauce.' || chr(10) ||
  '6. Ajouter 300 ml d''eau, piment et sel.' || chr(10) ||
  '7. Mijoter 20 minutes à feu doux.' || chr(10) ||
  '8. Servir avec du riz ou du pain.',
  50, 'Facile', 'Bénin',
  'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', '11a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 300),
  ('b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 200),
  ('b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a', 40),
  ('b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 80),
  ('b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 12),
  ('b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 50),
  ('b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d', 5),
  ('b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 6)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- ============================================================
-- 4. BASE AFRIQUE (11 recettes) — 6 existantes + 5 nouvelles
-- ============================================================

-- 4.1 Tajine Marocain — Maroc
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Tajine de Poulet aux Amandes',
  'Tajine marocain traditionnel au poulet, citron confit et amandes torréfiées. Slow cooking parfumé aux épices.',
  '1. Mélanger poulet, ail, gingembre, curcuma, cannelle et sel. Laisser mariner 1h.' || chr(10) ||
  '2. Faire dorer le poulet dans l''huile d''olive à feu moyen.' || chr(10) ||
  '3. Ajouter oignon, continuer 5 minutes.' || chr(10) ||
  '4. Incorporer les citrons confits coupés en quartiers.' || chr(10) ||
  '5. Verser 300 ml d''eau, couvrir et mijoter 45 minutes.' || chr(10) ||
  '6. Ajouter les amandes torréfiées et les olives.' || chr(10) ||
  '7. Continuer la cuisson 15 minutes.' || chr(10) ||
  '8. Saupoudrer de coriandre fraîche et servir.',
  60, 'Moyen', 'Maroc',
  'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', 'a7b8c9d0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', 600),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 15),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 10),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', 'b4c5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', 5),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', 'e1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', 3),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', 'd0e1f2a3-b4c5-4d6e-8f9a-0b1c2d3e4f5a', 80),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', 'dda4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c', 60),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b', 40),
  ('a1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 6)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 4.2 Doro Wat (poulet éthiopien) — Éthiopie
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Doro Wat',
  'Poulet mijoté dans une sauce épicée au berbéré et beurre niter kibbeh. Le plat national éthiopien.',
  '1. Mélanger poulet avec sel et jus de citron, laisser 30 min.' || chr(10) ||
  '2. Préparer le niter kibbeh : faire fondre le beurre avec épices.' || chr(10) ||
  '3. Faire revenir oignon dans le niter kibbeh 15 min jusqu''à caramélisation.' || chr(10) ||
  '4. Ajouter ail, gingembre, berbéré et cardamome.' || chr(10) ||
  '5. Incorporer le poulet et 400 ml d''eau.' || chr(10) ||
  '6. Couvrir et mijoter 45 minutes à feu doux.' || chr(10) ||
  '7. Ajouter les oeufs durs pochés dans la sauce 5 min avant la fin.' || chr(10) ||
  '8. Servir sur injera (pain plat éthiopien).',
  55, 'Difficile', 'Éthiopie',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', 'a7b8c9d0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', 700),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 120),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 150),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 20),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 15),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', 'c5d6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', 15),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', 'f2a3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', 8),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', 'a3b4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 5),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', '773de4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f', 60),
  ('a2f3b4c5-d6e7-4f8a-0b1c-2d3e4f5a6b7c', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 8)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 4.3 Bobotie (bœuf épicé) — Afrique du Sud
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Bobotie',
  'Gratin de boeuf épicé aux fruits secs et curry, surmonté d''une couche dorée d''oeufs. Le plat national sud-africain.',
  '1. Faire revenir oignon et ail dans l''huile.' || chr(10) ||
  '2. Ajouter le boeuf haché, cuire jusqu''à coloration.' || chr(10) ||
  '3. Incorporer curry, curcuma, cannelle et clou de girofle.' || chr(10) ||
  '4. Ajouter tomate concassée, raisins secs et amandes.' || chr(10) ||
  '5. Mijoter 10 minutes, transférer dans un plat à gratin.' || chr(10) ||
  '6. Mélanger oeufs et lait, verser sur le boeuf.' || chr(10) ||
  '7. Enfourner à 180°C 30-35 minutes jusqu''à dorure.' || chr(10) ||
  '8. Servir avec du riz jaune et chutney.',
  45, 'Moyen', 'Afrique du Sud',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 500),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 15),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 200),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 'c9d0e1f2-a3b4-4c5d-7e8f-9a0b1c2d3e4f', 60),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 'd0e1f2a3-b4c5-4d6e-8f9a-0b1c2d3e4f5a', 50),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 'b4c5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', 5),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 'e1f2a3b4-c5d6-4e7f-9a0b-1c2d3e4f5a6b', 4),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 'a3b4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', 3),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 100),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', '662cd3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 200),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b', 30),
  ('a3f4c5d6-e7f8-4a9b-1c2d-3e4f5a6b7c8d', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 6)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 4.4 Poulet Moambe (sauce arachide) — Congo
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Poulet Moambe',
  'Poulet mijoté dans une sauce onctueuse à la pâte d''arachide et lait de coco. Trésor culinaire congolais.',
  '1. Couper le poulet en morceaux, assaisonner de sel et poivre.' || chr(10) ||
  '2. Faire dorer le poulet dans l''huile de palme à feu vif.' || chr(10) ||
  '3. Faire revenir oignon et ail dans la même huile.' || chr(10) ||
  '4. Ajouter tomate concassée, cuire 5 minutes.' || chr(10) ||
  '5. Diluer la pâte d''arachide dans 400 ml d''eau chaude.' || chr(10) ||
  '6. Verser sur le poulet, ajouter le lait de coco.' || chr(10) ||
  '7. Mijoter 35 minutes à feu doux.' || chr(10) ||
  '8. Servir avec du riz blanc ou du saka saka (feuilles de manioc).',
  45, 'Moyen', 'Congo',
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 600),
  ('a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', 'ee5e6f7a-b9c0-4d1e-2f3a-4b5c6d7e8f9b', 200),
  ('a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 15),
  ('a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 200),
  ('a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', 'bb7b8c9d-e0f1-4b2c-3d4e-5f6a7b8c9d0e', 150),
  ('a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 50),
  ('a4f5d6e7-f8a9-4b0c-2d3e-4f5a6b7c8d9e', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 6)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 4.5 Romazava (ragoût malgache) — Madagascar
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Romazava',
  'Ragoût malgache aux brèdes (feuilles vertes) et boeuf, parfumé au gingembre. Le plat national de Madagascar.',
  '1. Couper le boeuf en morceaux, assaisonner de sel et poivre.' || chr(10) ||
  '2. Faire dorer le boeuf dans l''huile à feu vif, réserver.' || chr(10) ||
  '3. Faire revenir oignon, ail et gingembre dans la même huile.' || chr(10) ||
  '4. Ajouter tomate concassée, cuire 5 minutes.' || chr(10) ||
  '5. Remettre le boeuf, verser 500 ml d''eau.' || chr(10) ||
  '6. Mijoter 20 minutes à feu moyen.' || chr(10) ||
  '7. Ajouter les brèdes hachées, cuire encore 10 minutes.' || chr(10) ||
  '8. Servir avec du riz malgache.',
  40, 'Moyen', 'Madagascar',
  'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 500),
  ('a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', 'cc8c9d0e-f1a2-4c3d-4e5f-6a7b8c9d0e1f', 400),
  ('a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 15),
  ('a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 15),
  ('a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 150),
  ('a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b', 40),
  ('a5f6e7f8-a9b0-4c1d-3e4f-5a6b7c8d9e0f', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 6)
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- ============================================================
-- 5. NETTOYAGE — Suppression des 7 recettes internationales inutiles
-- On garde: Pasta Carbonara, Moussaka, Pad Thai, Chicken Tikka Masala, Paella
-- On supprime: Omelette, Pancakes, Salade César, Bruschetta, Soupe, Wrap, Boeuf Bourguignon
-- ============================================================

-- Suppression des recettes Rapide qui seront remplacées par les recettes béninoises/africaines
DELETE FROM recipe_ingredients WHERE recipe_id IN (
  '550e8400-e29b-41d4-a716-446655440000', -- Omelette
  '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', -- Pancakes
  'f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', -- Salade César
  'b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', -- Bruschetta
  'c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', -- Soupe
  'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a'  -- Wrap
);

DELETE FROM recipes WHERE id IN (
  '550e8400-e29b-41d4-a716-446655440000', -- Omelette
  '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', -- Pancakes
  'f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', -- Salade César
  'b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', -- Bruschetta
  'c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', -- Soupe
  'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a'  -- Wrap
);

-- Suppression du Boeuf Bourguignon (trop long, pas assez représentatif)
DELETE FROM recipe_ingredients WHERE recipe_id = 'e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b';
DELETE FROM recipes WHERE id = 'e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b';

-- ============================================================
-- 6. MISE À JOUR DES CATÉGORIES — Réassignation pour section Rapide
-- Les recettes béninoises (15-25 min) et certaines africaines iront dans Rapide
-- ============================================================

-- NE PAS réassigner les recettes béninoises à Rapide - elles doivent rester dans Bénin
-- UPDATE recipes SET category_id = 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f'
-- WHERE id IN (
--   'b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', -- Wagassi (15 min)
--   'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', -- Abobo (20 min)
--   'b3c4d5e6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', -- Akassa (18 min)
--   'b5c6d7e8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', -- Ignames Frites (20 min)
--   'b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', -- Fritures de Poissons (25 min)
--   'b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', -- Sauce Crincrin (22 min)
--   'b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e'  -- Dakouin (15 min)
-- );

-- Réassigner quelques recettes africaines rapides à Rapide
UPDATE recipes SET category_id = 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f'
WHERE id = '7c9e6679-7425-40de-944b-e07fc1f90ae7'; -- Aloco (25 min)

-- ============================================================
-- VALIDATION FINALE
-- ============================================================

-- Vérification du nombre de recettes par catégorie
-- SELECT category_id, COUNT(*) FROM recipes GROUP BY category_id;

-- COMMIT TRANSACTION — Tout s'est bien passé
COMMIT;

-- ============================================================
-- RÉSUMÉ
-- ============================================================
-- Base Bénin: 9 recettes (Wagassi, Abobo, Akassa, Déguê, Ignames Frites, Fritures de Poissons, Sauce Crincrin, Dakouin, Atassi)
-- Base Afrique: 11 recettes (6 existantes + 5 nouvelles)
-- Base International: 5 recettes (Pasta Carbonara, Moussaka, Pad Thai, Chicken Tikka Masala, Paella)
-- Base Rapide: 1 recette (Aloco)
-- Total: 26 recettes
-- ============================================================
