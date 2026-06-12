-- ============================================================
-- NAYA CUISINE — seed.sql
-- Exécuter dans Supabase SQL Editor
-- ============================================================

-- 1. Nettoyage (ordre FK)
DELETE FROM recipe_ingredients;
DELETE FROM favorites;
DELETE FROM recipes;
DELETE FROM categories;
DELETE FROM ingredients;

-- ============================================================
-- 2. CATÉGORIES (UUIDs v4 fixes)
-- ============================================================
INSERT INTO categories (id, name, title) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Tout',          'Toutes les Recettes'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Afrique',       'Patrimoine Culinaire Africain'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Rapide',        'Recettes Rapides'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'International', 'Cuisine du Monde')
ON CONFLICT (name) DO UPDATE SET title = EXCLUDED.title;

-- ============================================================
-- 3. INGRÉDIENTS (UUIDs v4)
-- ============================================================
INSERT INTO ingredients (id, name, calories_per_100g, proteins, carbs, lipids) VALUES
  ('11a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 'Riz',                130,  2.7, 28.0,  0.3),
  ('22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 'Poulet',             165, 31.0,  0.0,  3.6),
  ('33c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 'Tomate',              18,  0.9,  3.9,  0.2),
  ('44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 'Oignon',              40,  1.1,  9.0,  0.1),
  ('55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 'Huile de palme',     884,  0.0,  0.0,100.0),
  ('66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 'Ail',                149,  6.4, 33.0,  0.5),
  ('77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 'Gingembre',           80,  1.8, 18.0,  0.8),
  ('88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d', 'Piment',              40,  1.9,  9.0,  0.4),
  ('99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 'Sel',                  0,  0.0,  0.0,  0.0),
  ('aad1e2f3-a4b5-4c6d-7e8f-9a0b1c2d3e4f', 'Poisson Tilapia',     96, 20.0,  0.0,  1.7),
  ('bbe2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 'Carotte',             41,  0.9, 10.0,  0.2),
  ('ccf3a4b5-c6d7-4e8f-9a0b-1c2d3e4f5a6b', 'Chou',                25,  1.3,  6.0,  0.1),
  ('dda4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c', 'Citron',              29,  1.1,  9.0,  0.3),
  ('eeb5c6d7-e8f9-4a0b-1c2d-3e4f5a6b7c8d', 'Crevettes',           99, 24.0,  0.2,  0.3),
  ('ffc6d7e8-f9a0-4b1c-2d3e-4f5a6b7c8d9e', 'Banane plantain',    122,  1.3, 32.0,  0.4),
  ('11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 'Boeuf',              250, 26.0,  0.0, 17.0),
  ('22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 'Oeuf',               155, 13.0,  1.1, 11.0),
  ('33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b', 'Huile d''olive',     884,  0.0,  0.0,100.0),
  ('440ab1c2-d3e4-4f5a-6b7c-8d9e0f1a2b3c', 'Pates',              350, 12.0, 70.0,  1.5),
  ('551bc2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d', 'Fromage',            400, 25.0,  1.3, 33.0),
  ('662cd3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 'Lait',                42,  3.4,  5.0,  1.0),
  ('773de4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f', 'Beurre',             717,  0.9,  0.1, 81.0),
  ('884ef5a6-b7c8-4d9e-0f1a-2b3c4d5e6f7a', 'Farine',             364, 10.0, 76.0,  1.0),
  ('995fa6b7-c8d9-4e0f-1a2b-3c4d5e6f7a8b', 'Sucre',              387,  0.0,100.0,  0.0),
  ('aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 'Tomate concassee',    32,  1.6,  6.5,  0.3),
  ('bb7bc8d9-e0f1-4a2b-3c4d-5e6f7a8b9c0d', 'Poivron',             31,  1.0,  6.0,  0.3),
  ('cc8cd9e0-f1a2-4b3c-4d5e-6f7a8b9c0d1e', 'Sauce soja',          53,  8.0,  4.9,  0.6),
  ('dd9de0f1-a2b3-4c4d-5e6f-7a8b9c0d1e2f', 'Yaourt',              61,  3.5,  4.7,  3.3),
  ('ee0ef1a2-b3c4-4d5e-6f7a-8b9c0d1e2f3a', 'Aubergine',           25,  1.0,  6.0,  0.2),
  ('ff1fa2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b', 'Pain',               265,  9.0, 49.0,  3.2),
  ('aa2ab3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 'Miel',               304,  0.3, 82.0,  0.0),
  ('bb3bc4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 'Basilic',             23,  3.2,  2.7,  0.6),
  ('cc4cd5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 'Farine de mais',     365,  6.9, 77.0,  3.9)
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- 4. RECETTES — 3 par catégorie (12 au total)
-- ============================================================

-- ── AFRIQUE ─────────────────────────────────────────────────

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Thiéboudienne',
  'Le plat national sénégalais : riz au poisson cuit dans une sauce tomate parfumée aux légumes et épices.',
  '1. Nettoyer et couper le poisson en tranches épaisses, assaisonner de sel et citron.' || chr(10) ||
  '2. Faire chauffer l''huile dans une grande marmite et faire dorer le poisson de chaque côté, puis réserver.' || chr(10) ||
  '3. Dans la même huile, faire revenir l''oignon, l''ail et la tomate concassée pendant 10 minutes.' || chr(10) ||
  '4. Ajouter les carottes et le chou, verser de l''eau pour couvrir. Porter à ébullition.' || chr(10) ||
  '5. Remettre le poisson dans la marmite et laisser mijoter 20 minutes à feu moyen.' || chr(10) ||
  '6. Retirer le poisson et les légumes, ajouter le riz lavé dans le bouillon restant.' || chr(10) ||
  '7. Couvrir et cuire le riz à feu doux jusqu''à absorption complète, environ 20 minutes.' || chr(10) ||
  '8. Dresser dans un grand plat : riz en base, poisson et légumes par-dessus. Servir chaud.',
  60, 'Difficile', 'Sénégal',
  'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'aad1e2f3-a4b5-4c6d-7e8f-9a0b1c2d3e4f', 600),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '11a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 400),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 300),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 150),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'bbe2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 200),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'ccf3a4b5-c6d7-4e8f-9a0b-1c2d3e4f5a6b', 150),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'dda4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c',  30),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  60),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8);

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Jollof Rice au Poulet',
  'Le riz emblématique d''Afrique de l''Ouest, cuit dans une sauce tomate épicée avec du poulet doré.',
  '1. Assaisonner les morceaux de poulet avec sel, gingembre et ail. Mariner 15 minutes.' || chr(10) ||
  '2. Faire dorer le poulet dans l''huile de palme à feu vif, 5 minutes par côté. Réserver.' || chr(10) ||
  '3. Dans la même marmite, faire revenir l''oignon haché jusqu''à transparence.' || chr(10) ||
  '4. Ajouter la tomate concassée et le piment, laisser réduire 10 minutes en remuant.' || chr(10) ||
  '5. Verser 700 ml d''eau, porter à ébullition puis ajouter le riz lavé.' || chr(10) ||
  '6. Déposer les morceaux de poulet sur le riz, couvrir hermétiquement.' || chr(10) ||
  '7. Cuire à feu très doux 25 minutes sans ouvrir, pour un effet légèrement fumé.' || chr(10) ||
  '8. Mélanger délicatement avant de servir. Accompagner de plantains frits.',
  45, 'Moyen', 'Nigeria',
  'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 500),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '11a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 400),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 300),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 150),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c',  10),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  50),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8);

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Aloco',
  'Bananes plantains bien mûres frites dans l''huile de palme, croustillantes dehors et fondantes dedans. Le street food iconique ivoirien.',
  '1. Choisir des bananes plantains très mûres (peau noire ou tachetée) pour une douceur maximale.' || chr(10) ||
  '2. Peler et couper en tranches diagonales d''environ 1,5 cm d''épaisseur.' || chr(10) ||
  '3. Chauffer généreusement l''huile de palme dans une poêle profonde à feu moyen-vif.' || chr(10) ||
  '4. Frire les tranches par petites quantités, 2 à 3 minutes par côté, jusqu''à dorure.' || chr(10) ||
  '5. Égoutter sur du papier absorbant et saupoudrer légèrement de sel.' || chr(10) ||
  '6. Préparer une sauce pimentée en mixant piment, oignon et un filet d''huile.' || chr(10) ||
  '7. Servir les alocos chauds avec la sauce pimentée.' || chr(10) ||
  '8. Idéal en accompagnement d''un poisson grillé ou seul en encas.',
  25, 'Facile', 'Côte d''Ivoire',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('7c9e6679-7425-40de-944b-e07fc1f90ae7', 'ffc6d7e8-f9a0-4b1c-2d3e-4f5a6b7c8d9e', 600),
  ('7c9e6679-7425-40de-944b-e07fc1f90ae7', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 100),
  ('7c9e6679-7425-40de-944b-e07fc1f90ae7', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5),
  ('7c9e6679-7425-40de-944b-e07fc1f90ae7', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

-- ── RAPIDE ──────────────────────────────────────────────────

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Omelette aux Poivrons',
  'Omelette moelleuse aux poivrons colorés et fromage fondu. Protéinée, végétarienne et prête en 15 minutes.',
  '1. Casser les oeufs dans un bol, ajouter une pincée de sel et battre vigoureusement.' || chr(10) ||
  '2. Laver et couper les poivrons en fines lamelles, émincer l''oignon.' || chr(10) ||
  '3. Faire revenir poivrons et oignon dans l''huile d''olive à feu moyen, 3 à 4 minutes.' || chr(10) ||
  '4. Verser les oeufs battus sur les légumes sans mélanger.' || chr(10) ||
  '5. Parsemer de fromage râpé sur la moitié de l''omelette.' || chr(10) ||
  '6. Quand les bords commencent à prendre, replier l''omelette en deux.' || chr(10) ||
  '7. Laisser 1 minute pour que le fromage fonde.' || chr(10) ||
  '8. Glisser sur une assiette et servir immédiatement.',
  15, 'Facile', 'France',
  'https://images.unsplash.com/photo-1525351484163-7529414394d8?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 180),
  ('550e8400-e29b-41d4-a716-446655440000', 'bb7bc8d9-e0f1-4a2b-3c4d-5e6f7a8b9c0d',  80),
  ('550e8400-e29b-41d4-a716-446655440000', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f',  40),
  ('550e8400-e29b-41d4-a716-446655440000', '551bc2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d',  40),
  ('550e8400-e29b-41d4-a716-446655440000', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  15),
  ('550e8400-e29b-41d4-a716-446655440000', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Pancakes Moelleux',
  'Pancakes épais et moelleux à la façon américaine, dorés en 20 minutes. Parfaits nappés de miel.',
  '1. Mélanger la farine, le sucre et une pincée de sel dans un grand bol.' || chr(10) ||
  '2. Creuser un puits et y ajouter les oeufs battus et le lait.' || chr(10) ||
  '3. Incorporer progressivement la farine depuis les bords pour éviter les grumeaux.' || chr(10) ||
  '4. Ajouter le beurre fondu tiède et mélanger jusqu''à pâte lisse.' || chr(10) ||
  '5. Laisser reposer 5 minutes pendant que la poêle chauffe à feu moyen.' || chr(10) ||
  '6. Verser une louche de pâte dans la poêle légèrement beurrée.' || chr(10) ||
  '7. Quand des bulles apparaissent en surface, retourner le pancake.' || chr(10) ||
  '8. Cuire 1 minute de l''autre côté. Servir en pile avec du miel ou des fruits.',
  20, 'Facile', 'États-Unis',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '884ef5a6-b7c8-4d9e-0f1a-2b3c4d5e6f7a', 200),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 100),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '662cd3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 250),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '773de4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f',  30),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '995fa6b7-c8d9-4e0f-1a2b-3c4d5e6f7a8b',  30),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Salade César au Poulet',
  'Salade croquante au poulet grillé, croûtons dorés et parmesan, nappée d''une sauce crémeuse à l''ail.',
  '1. Couper le pain en petits cubes, dorer à la poêle avec l''huile d''olive et sel.' || chr(10) ||
  '2. Assaisonner les escalopes de poulet avec sel, poivre et ail écrasé.' || chr(10) ||
  '3. Cuire le poulet à la poêle, 4 minutes par côté. Laisser reposer 2 minutes.' || chr(10) ||
  '4. Préparer la sauce : mélanger yaourt, jus de citron, ail râpé, sel et poivre.' || chr(10) ||
  '5. Couper le poulet en lamelles.' || chr(10) ||
  '6. Dans un grand saladier, disposer la laitue ou chou finement émincé.' || chr(10) ||
  '7. Ajouter les lamelles de poulet, les croûtons et le fromage râpé.' || chr(10) ||
  '8. Napper de sauce, mélanger délicatement et servir immédiatement.',
  20, 'Facile', 'États-Unis',
  'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 200),
  ('f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', 'ff1fa2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b',  50),
  ('f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', '551bc2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d',  40),
  ('f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', 'dd9de0f1-a2b3-4c4d-5e6f-7a8b9c0d1e2f',  60),
  ('f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',   5),
  ('f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', 'dda4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c',  20),
  ('f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  30),
  ('f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

-- ── INTERNATIONAL ────────────────────────────────────────────

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'a987fbc9-4bed-3078-cf07-9141ba07c9f3',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Pasta Carbonara',
  'Les pâtes romaines crémeuses liées par les oeufs et le fromage — sans crème. Un classique authentique.',
  '1. Porter une grande casserole d''eau salée à ébullition et cuire les pâtes al dente.' || chr(10) ||
  '2. Couper le boeuf en petits dés et faire revenir à sec dans une poêle jusqu''à dorure.' || chr(10) ||
  '3. Dans un bol, battre les oeufs avec le fromage râpé et du poivre noir généreusement.' || chr(10) ||
  '4. Écraser l''ail et le faire revenir 30 secondes dans la poêle avec le boeuf.' || chr(10) ||
  '5. Égoutter les pâtes en réservant une tasse d''eau de cuisson.' || chr(10) ||
  '6. Hors du feu, verser les pâtes dans la poêle avec le boeuf et mélanger.' || chr(10) ||
  '7. Ajouter le mélange oeuf-fromage en remuant rapidement pour crémer sans coaguler.' || chr(10) ||
  '8. Ajouter un peu d''eau de cuisson pour fluidifier si besoin. Servir immédiatement.',
  25, 'Moyen', 'Italie',
  'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '440ab1c2-d3e4-4f5a-6b7c-8d9e0f1a2b3c', 320),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 120),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 100),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '551bc2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d',  60),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',   5),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  15),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   5);

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Moussaka',
  'Gratin grec en couches d''aubergines dorées, viande hachée épicée et béchamel crémeuse. Un plat généreux.',
  '1. Couper les aubergines en rondelles de 1 cm, saler et laisser dégorger 20 minutes. Rincer et sécher.' || chr(10) ||
  '2. Faire dorer les rondelles d''aubergine dans l''huile d''olive à la poêle. Réserver.' || chr(10) ||
  '3. Faire revenir l''oignon haché, puis ajouter le boeuf haché jusqu''à coloration.' || chr(10) ||
  '4. Ajouter la tomate concassée, sel et épices. Laisser mijoter 15 minutes.' || chr(10) ||
  '5. Préparer la béchamel : faire fondre le beurre, ajouter la farine, puis le lait chaud en fouettant.' || chr(10) ||
  '6. Cuire la béchamel à feu doux jusqu''à épaississement. Saler et poivrer.' || chr(10) ||
  '7. Dans un plat à gratin, alterner couches d''aubergines et de viande. Terminer par la béchamel.' || chr(10) ||
  '8. Parsemer de fromage et enfourner à 180°C pendant 35 à 40 minutes jusqu''à dorure.',
  70, 'Difficile', 'Grèce',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', 'ee0ef1a2-b3c4-4d5e-6f7a-8b9c0d1e2f3a', 500),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 400),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 200),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', '773de4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f',  50),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', '884ef5a6-b7c8-4d9e-0f1a-2b3c4d5e6f7a',  40),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', '662cd3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 400),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', '551bc2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d',  80),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  40),
  ('b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   6);

INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Pad Thai aux Crevettes',
  'Nouilles de riz sautées au wok avec crevettes, oeufs et une sauce umami. Le plat thaïlandais incontournable.',
  '1. Faire tremper les pâtes de riz dans l''eau froide 30 minutes, puis égoutter.' || chr(10) ||
  '2. Décortiquer et nettoyer les crevettes.' || chr(10) ||
  '3. Mélanger dans un bol : sauce soja, sucre et un filet de citron.' || chr(10) ||
  '4. Chauffer le wok à feu très vif avec l''huile d''olive.' || chr(10) ||
  '5. Faire sauter les crevettes 2 minutes. Ajouter l''ail émincé, cuire 30 secondes.' || chr(10) ||
  '6. Pousser les crevettes sur le côté, casser les oeufs dans le wok et brouiller.' || chr(10) ||
  '7. Ajouter les pâtes égouttées et la sauce. Mélanger vigoureusement 3 minutes.' || chr(10) ||
  '8. Dresser dans des bols avec un quartier de citron et servir aussitôt.',
  30, 'Moyen', 'Thaïlande',
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
  NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c', '440ab1c2-d3e4-4f5a-6b7c-8d9e0f1a2b3c', 200),
  ('c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c', 'eeb5c6d7-e8f9-4a0b-1c2d-3e4f5a6b7c8d', 200),
  ('c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 100),
  ('c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  10),
  ('c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c', 'cc8cd9e0-f1a2-4b3c-4d5e-6f7a8b9c0d1e',  40),
  ('c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c', '995fa6b7-c8d9-4e0f-1a2b-3c4d5e6f7a8b',  10),
  ('c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c', 'dda4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c',  20),
  ('c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  20);

-- ============================================================
-- FIN DU SEED — 12 recettes, 33 ingrédients, 4 catégories
-- ============================================================
