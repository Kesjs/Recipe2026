-- ============================================================
-- NAYA CUISINE — seed.sql v2
-- 18 recettes · 4 catégories · 38 ingrédients
-- ============================================================

DELETE FROM recipe_ingredients;
DELETE FROM favorites;
DELETE FROM recipes;
DELETE FROM categories;
DELETE FROM ingredients;

-- ============================================================
-- CATÉGORIES
-- ============================================================
INSERT INTO categories (id, name, title) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Tout',          'Toutes les Recettes'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Afrique',       'Patrimoine Culinaire Africain'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Rapide',        'Recettes Rapides'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'International', 'Cuisine du Monde')
ON CONFLICT (name) DO UPDATE SET title = EXCLUDED.title;

-- ============================================================
-- INGRÉDIENTS
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
  ('cc4cd5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 'Farine de mais',     365,  6.9, 77.0,  3.9),
  ('dd5de6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 'Arachide',           567, 26.0, 16.0, 49.0),
  ('ee6ef7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 'Igname',             118,  1.5, 28.0,  0.2),
  ('ff7fa8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 'Epinard',             23,  2.9,  3.6,  0.4),
  ('aa8ab9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 'Lait de coco',       230,  2.3,  6.0, 24.0),
  ('bb9bc0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d', 'Concombre',           15,  0.7,  3.6,  0.1)
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- AFRIQUE — 6 recettes, 6 pays différents
-- ============================================================

-- 1. Thiéboudienne — Sénégal
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Thiéboudienne',
  'Le plat national sénégalais classé au patrimoine immatériel de l''UNESCO : riz au poisson cuit dans une sauce tomate parfumée aux légumes et épices.',
  '1. Nettoyer et couper le poisson en tranches, assaisonner de sel et citron.' || chr(10) ||
  '2. Faire dorer le poisson dans l''huile de palme, réserver.' || chr(10) ||
  '3. Faire revenir l''oignon, l''ail et la tomate concassée 10 minutes.' || chr(10) ||
  '4. Ajouter les carottes et le chou, couvrir d''eau et porter à ébullition.' || chr(10) ||
  '5. Remettre le poisson, mijoter 20 minutes à feu moyen.' || chr(10) ||
  '6. Retirer poisson et légumes, ajouter le riz lavé dans le bouillon.' || chr(10) ||
  '7. Couvrir et cuire à feu doux jusqu''à absorption complète, 20 minutes.' || chr(10) ||
  '8. Dresser : riz en base, poisson et légumes par-dessus. Servir chaud.',
  60, 'Difficile', 'Sénégal',
  'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80', NULL
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

-- 2. Jollof Rice — Nigeria
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Jollof Rice au Poulet',
  'Le riz iconique d''Afrique de l''Ouest, cuit dans une sauce tomate épicée avec du poulet doré. Le plat qui fait débat entre Nigérians et Ghanéens.',
  '1. Mariner le poulet avec sel, gingembre et ail 15 minutes.' || chr(10) ||
  '2. Faire dorer le poulet dans l''huile de palme, 5 minutes par côté. Réserver.' || chr(10) ||
  '3. Faire revenir l''oignon dans la même marmite jusqu''à transparence.' || chr(10) ||
  '4. Ajouter tomate concassée et piment, réduire 10 minutes.' || chr(10) ||
  '5. Verser 700 ml d''eau, porter à ébullition puis ajouter le riz lavé.' || chr(10) ||
  '6. Déposer le poulet sur le riz, couvrir hermétiquement.' || chr(10) ||
  '7. Cuire à feu très doux 25 minutes sans ouvrir.' || chr(10) ||
  '8. Mélanger délicatement avant de servir avec des plantains.',
  45, 'Moyen', 'Nigeria',
  'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80', NULL
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

-- 3. Aloco — Côte d'Ivoire
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Aloco',
  'Bananes plantains bien mûres frites dans l''huile de palme, croustillantes dehors et fondantes dedans. Street food iconique de Côte d''Ivoire.',
  '1. Choisir des plantains très mûres (peau noire ou tachetée).' || chr(10) ||
  '2. Peler et couper en tranches diagonales de 1,5 cm.' || chr(10) ||
  '3. Chauffer l''huile de palme dans une poêle profonde à feu moyen-vif.' || chr(10) ||
  '4. Frire les tranches par petites quantités, 2-3 minutes par côté.' || chr(10) ||
  '5. Égoutter sur papier absorbant, saler légèrement.' || chr(10) ||
  '6. Mixer piment, oignon et huile pour la sauce.' || chr(10) ||
  '7. Servir chaud avec la sauce pimentée.' || chr(10) ||
  '8. Accompagner d''un poisson grillé pour un repas complet.',
  25, 'Facile', 'Côte d''Ivoire',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('7c9e6679-7425-40de-944b-e07fc1f90ae7', 'ffc6d7e8-f9a0-4b1c-2d3e-4f5a6b7c8d9e', 600),
  ('7c9e6679-7425-40de-944b-e07fc1f90ae7', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 100),
  ('7c9e6679-7425-40de-944b-e07fc1f90ae7', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5),
  ('7c9e6679-7425-40de-944b-e07fc1f90ae7', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

-- 4. Ndolé — Cameroun
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Ndolé aux Crevettes',
  'Plat national camerounais aux feuilles de ndolé (épinards amers), crevettes et pâte d''arachide. Un goût profond et unique.',
  '1. Blanchir les épinards dans l''eau bouillante salée 5 minutes, égoutter et hacher.' || chr(10) ||
  '2. Faire revenir l''oignon et l''ail dans l''huile de palme.' || chr(10) ||
  '3. Ajouter les crevettes, cuire 3 minutes.' || chr(10) ||
  '4. Incorporer la pâte d''arachide diluée dans 200 ml d''eau chaude.' || chr(10) ||
  '5. Ajouter les épinards hachés, mélanger bien.' || chr(10) ||
  '6. Assaisonner de sel, gingembre et piment.' || chr(10) ||
  '7. Mijoter à feu doux 15 minutes en remuant régulièrement.' || chr(10) ||
  '8. Servir avec du riz blanc ou des bâtons de manioc.',
  50, 'Moyen', 'Cameroun',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', 'ff7fa8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 400),
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', 'eeb5c6d7-e8f9-4a0b-1c2d-3e4f5a6b7c8d', 300),
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', 'dd5de6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 150),
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15),
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  60),
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5),
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   6);

-- 5. Tilapia braisé — Ghana
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Tilapia Braisé',
  'Tilapia entier mariné aux épices et citron, grillé sur braises avec tomates et oignons. La recette de bord de plage du Ghana.',
  '1. Inciser le tilapia en croisillons des deux côtés.' || chr(10) ||
  '2. Mélanger sel, ail écrasé, gingembre et jus de citron, frotter le poisson.' || chr(10) ||
  '3. Laisser mariner 30 minutes au réfrigérateur.' || chr(10) ||
  '4. Préchauffer le gril ou la poêle grill à feu vif.' || chr(10) ||
  '5. Griller le tilapia 7 minutes par côté jusqu''à peau croustillante.' || chr(10) ||
  '6. Pendant ce temps, faire revenir tomates et oignons en rondelles.' || chr(10) ||
  '7. Dresser le poisson sur les légumes sautés.' || chr(10) ||
  '8. Arroser d''un filet de citron et servir avec du riz ou de l''igname.',
  45, 'Facile', 'Ghana',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9', 'aad1e2f3-a4b5-4c6d-7e8f-9a0b1c2d3e4f', 700),
  ('f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9', '33c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 200),
  ('f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15),
  ('f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c',  10),
  ('f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9', 'dda4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c',  40),
  ('f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  30),
  ('f5a6b7c8-d9e0-4f1a-b2c3-d4e5f6a7b8c9', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   5);

-- 6. Mafé — Mali
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Mafé de Boeuf',
  'Ragoût onctueux à la pâte d''arachide, emblème de la cuisine malienne. Le boeuf mijoté dans cette sauce crémeuse fond littéralement en bouche.',
  '1. Couper le boeuf en gros cubes, assaisonner de sel et poivre.' || chr(10) ||
  '2. Faire dorer les morceaux dans l''huile de palme à feu vif, réserver.' || chr(10) ||
  '3. Faire revenir l''oignon haché 5 minutes.' || chr(10) ||
  '4. Ajouter la tomate concassée, cuire 5 minutes.' || chr(10) ||
  '5. Diluer la pâte d''arachide dans 500 ml d''eau chaude, verser dans la marmite.' || chr(10) ||
  '6. Remettre le boeuf, ajouter carottes et piment.' || chr(10) ||
  '7. Mijoter à feu doux 45 minutes en remuant régulièrement.' || chr(10) ||
  '8. Rectifier l''assaisonnement et servir avec du riz blanc.',
  70, 'Moyen', 'Mali',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 500),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', 'dd5de6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 200),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 200),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 150),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', 'bbe2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 150),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  50),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8);

-- ============================================================
-- RAPIDE — 6 recettes ≤ 25 min
-- ============================================================

-- 7. Omelette aux Poivrons — France
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Omelette aux Poivrons',
  'Omelette moelleuse aux poivrons colorés et fromage fondu. Protéinée, végétarienne, prête en 15 minutes.',
  '1. Casser les oeufs dans un bol, saler et battre vigoureusement.' || chr(10) ||
  '2. Couper les poivrons en lamelles, émincer l''oignon.' || chr(10) ||
  '3. Faire revenir poivrons et oignon dans l''huile d''olive, 4 minutes.' || chr(10) ||
  '4. Verser les oeufs battus sur les légumes sans mélanger.' || chr(10) ||
  '5. Parsemer de fromage râpé sur la moitié de l''omelette.' || chr(10) ||
  '6. Quand les bords prennent, replier l''omelette en deux.' || chr(10) ||
  '7. Laisser 1 minute pour que le fromage fonde.' || chr(10) ||
  '8. Servir immédiatement avec une salade verte.',
  15, 'Facile', 'France',
  'https://images.unsplash.com/photo-1525351484163-7529414394d8?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 180),
  ('550e8400-e29b-41d4-a716-446655440000', 'bb7bc8d9-e0f1-4a2b-3c4d-5e6f7a8b9c0d',  80),
  ('550e8400-e29b-41d4-a716-446655440000', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f',  40),
  ('550e8400-e29b-41d4-a716-446655440000', '551bc2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d',  40),
  ('550e8400-e29b-41d4-a716-446655440000', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  15),
  ('550e8400-e29b-41d4-a716-446655440000', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

-- 8. Pancakes — États-Unis
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Pancakes Moelleux',
  'Pancakes épais et moelleux à l''américaine, dorés en 20 minutes. Parfaits nappés de miel ou de sirop d''érable.',
  '1. Mélanger farine, sucre et sel dans un grand bol.' || chr(10) ||
  '2. Creuser un puits, ajouter oeufs battus et lait.' || chr(10) ||
  '3. Incorporer progressivement depuis les bords pour éviter les grumeaux.' || chr(10) ||
  '4. Ajouter le beurre fondu, mélanger jusqu''à pâte lisse.' || chr(10) ||
  '5. Laisser reposer 5 minutes.' || chr(10) ||
  '6. Verser une louche dans une poêle beurrée à feu moyen.' || chr(10) ||
  '7. Retourner quand des bulles apparaissent en surface.' || chr(10) ||
  '8. Servir en pile avec miel ou fruits frais.',
  20, 'Facile', 'États-Unis',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '884ef5a6-b7c8-4d9e-0f1a-2b3c4d5e6f7a', 200),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 100),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '662cd3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 250),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '773de4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f',  30),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '995fa6b7-c8d9-4e0f-1a2b-3c4d5e6f7a8b',  30),
  ('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

-- 9. Salade César — États-Unis
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'f0e4c2e8-5dc7-4cd7-a8ab-16d6b6cf3b3e',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Salade César au Poulet',
  'Salade croquante au poulet grillé, croûtons dorés et parmesan, nappée d''une sauce crémeuse à l''ail. Lunch express et équilibré.',
  '1. Couper le pain en cubes, dorer à la poêle avec huile et sel.' || chr(10) ||
  '2. Assaisonner le poulet avec sel, poivre et ail écrasé.' || chr(10) ||
  '3. Cuire le poulet à la poêle, 4 minutes par côté. Laisser reposer.' || chr(10) ||
  '4. Préparer la sauce : yaourt, citron, ail râpé, sel, poivre.' || chr(10) ||
  '5. Couper le poulet en lamelles.' || chr(10) ||
  '6. Disposer la laitue (ou chou finement émincé) dans un saladier.' || chr(10) ||
  '7. Ajouter poulet, croûtons et fromage râpé.' || chr(10) ||
  '8. Napper de sauce, mélanger et servir immédiatement.',
  20, 'Facile', 'États-Unis',
  'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80', NULL
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

-- 10. Bruschetta — Italie
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Bruschetta Tomates-Basilic',
  'Tartines grillées à l''huile d''olive, frottées à l''ail, garnies de tomates fraîches et basilic. L''apéritif toscan parfait en 15 minutes.',
  '1. Couper le pain en tranches épaisses.' || chr(10) ||
  '2. Faire griller les tranches au gril ou à la poêle sans matière grasse.' || chr(10) ||
  '3. Frotter immédiatement avec la gousse d''ail coupée en deux.' || chr(10) ||
  '4. Arroser d''un filet généreux d''huile d''olive.' || chr(10) ||
  '5. Couper les tomates en dés, assaisonner de sel.' || chr(10) ||
  '6. Ciseler le basilic frais.' || chr(10) ||
  '7. Déposer les tomates sur le pain, garnir de basilic.' || chr(10) ||
  '8. Servir immédiatement pour conserver le croquant.',
  15, 'Facile', 'Italie',
  'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', 'ff1fa2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b', 150),
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', '33c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 200),
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  10),
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', 'bb3bc4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d',  10),
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  30),
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

-- 11. Soupe de Tomates — France
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Soupe Tomates-Basilic',
  'Velouté de tomates fraîches au basilic, onctueux et réconfortant. Parfait chaud l''hiver ou froid en gaspacho l''été.',
  '1. Couper les tomates en quartiers, émincer l''oignon.' || chr(10) ||
  '2. Faire revenir l''oignon et l''ail dans l''huile d''olive 3 minutes.' || chr(10) ||
  '3. Ajouter les tomates, saler et couvrir.' || chr(10) ||
  '4. Cuire à feu moyen 15 minutes jusqu''à ce que les tomates soient fondantes.' || chr(10) ||
  '5. Ajouter le basilic frais, mixer le tout finement.' || chr(10) ||
  '6. Passer au tamis pour une texture veloutée si souhaité.' || chr(10) ||
  '7. Rectifier l''assaisonnement, ajouter sel et poivre.' || chr(10) ||
  '8. Servir chaud avec un filet d''huile et quelques feuilles de basilic.',
  25, 'Facile', 'France',
  'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', '33c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 600),
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f',  80),
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  10),
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', 'bb3bc4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d',  10),
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  20),
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   5);

-- 12. Wrap au Poulet — International
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Wrap au Poulet Grillé',
  'Tortilla garnie de poulet grillé, crudités croquantes, fromage et sauce yaourt à l''ail. Lunch express prêt en 15 minutes.',
  '1. Assaisonner et griller le poulet à la poêle, 3 minutes par côté.' || chr(10) ||
  '2. Laisser reposer 2 minutes puis trancher en lamelles.' || chr(10) ||
  '3. Mélanger yaourt, ail râpé, sel et citron pour la sauce.' || chr(10) ||
  '4. Chauffer légèrement la tortilla à la poêle 30 secondes.' || chr(10) ||
  '5. Étaler la sauce sur toute la surface.' || chr(10) ||
  '6. Déposer le poulet, le concombre et la tomate.' || chr(10) ||
  '7. Ajouter le fromage râpé.' || chr(10) ||
  '8. Rouler fermement, couper en deux et servir.',
  15, 'Facile', 'International',
  'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 180),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '884ef5a6-b7c8-4d9e-0f1a-2b3c4d5e6f7a', 120),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '551bc2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d',  40),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', 'dd9de0f1-a2b3-4c4d-5e6f-7a8b9c0d1e2f',  60),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', 'bb9bc0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',  50),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '33c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e',  60),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',   5),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   3);

-- ============================================================
-- INTERNATIONAL — 6 recettes, 6 pays différents
-- ============================================================

-- 13. Pasta Carbonara — Italie
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'a987fbc9-4bed-3078-cf07-9141ba07c9f3',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Pasta Carbonara',
  'Les pâtes romaines crémeuses liées par les oeufs et le pecorino — sans crème. La vraie recette authentique en 25 minutes.',
  '1. Cuire les pâtes al dente dans une grande casserole d''eau très salée.' || chr(10) ||
  '2. Faire revenir le boeuf en dés à sec jusqu''à dorure croustillante.' || chr(10) ||
  '3. Battre oeufs et fromage râpé avec du poivre noir généreusement.' || chr(10) ||
  '4. Faire revenir l''ail 30 secondes avec le boeuf.' || chr(10) ||
  '5. Réserver une tasse d''eau de cuisson avant d''égoutter les pâtes.' || chr(10) ||
  '6. Hors du feu, mélanger pâtes et boeuf.' || chr(10) ||
  '7. Ajouter le mélange oeuf-fromage en remuant rapidement.' || chr(10) ||
  '8. Ajouter l''eau de cuisson pour fluidifier. Servir immédiatement.',
  25, 'Moyen', 'Italie',
  'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '440ab1c2-d3e4-4f5a-6b7c-8d9e0f1a2b3c', 320),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 120),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '22e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 100),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '551bc2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d',  60),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',   5),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  15),
  ('a987fbc9-4bed-3078-cf07-9141ba07c9f3', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   5);

-- 14. Moussaka — Grèce
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'b5c9e6b7-d0a1-4c2e-8f3b-1a2c3d4e5f6a',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Moussaka',
  'Gratin grec en couches d''aubergines dorées, viande hachée épicée et béchamel crémeuse. Un plat familial généreux.',
  '1. Trancher les aubergines, saler, laisser dégorger 20 min. Rincer et sécher.' || chr(10) ||
  '2. Faire dorer les rondelles d''aubergine dans l''huile d''olive. Réserver.' || chr(10) ||
  '3. Faire revenir l''oignon, ajouter le boeuf haché jusqu''à coloration.' || chr(10) ||
  '4. Ajouter tomate concassée et épices, mijoter 15 minutes.' || chr(10) ||
  '5. Béchamel : fondre le beurre, ajouter farine puis lait chaud en fouettant.' || chr(10) ||
  '6. Cuire à feu doux jusqu''à épaississement. Saler.' || chr(10) ||
  '7. Alterner couches d''aubergines et viande dans un plat huilé. Couvrir de béchamel.' || chr(10) ||
  '8. Parsemer de fromage, enfourner à 180°C, 35-40 minutes.',
  70, 'Difficile', 'Grèce',
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80', NULL
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

-- 15. Pad Thai — Thaïlande
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'c4a8e2f1-3b7d-4e5a-9c6f-2d1e3f4a5b7c',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Pad Thai aux Crevettes',
  'Nouilles de riz sautées au wok avec crevettes, oeufs et sauce umami au tamarin. Le plat thaïlandais incontournable.',
  '1. Tremper les pâtes de riz dans l''eau froide 30 minutes. Égoutter.' || chr(10) ||
  '2. Préparer la sauce : sauce soja, sucre et citron.' || chr(10) ||
  '3. Chauffer le wok à feu très vif avec l''huile.' || chr(10) ||
  '4. Sauter les crevettes 2 minutes, ajouter l''ail.' || chr(10) ||
  '5. Pousser les crevettes sur le côté, brouiller les oeufs dans le wok.' || chr(10) ||
  '6. Ajouter les pâtes et la sauce, mélanger vigoureusement 3 minutes.' || chr(10) ||
  '7. Rectifier avec sauce soja si besoin.' || chr(10) ||
  '8. Dresser avec un quartier de citron et servir aussitôt.',
  30, 'Moyen', 'Thaïlande',
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80', NULL
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

-- 16. Chicken Tikka Masala — Inde
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'd5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Chicken Tikka Masala',
  'Poulet tendre grillé dans une sauce tomate crémeuse aux épices indiennes — garam masala, curcuma, cumin. Un classique mondial.',
  '1. Mariner le poulet dans le yaourt, gingembre, ail et épices 30 minutes.' || chr(10) ||
  '2. Griller le poulet à la poêle à feu vif jusqu''à légères traces de grill.' || chr(10) ||
  '3. Faire revenir l''oignon haché dans l''huile jusqu''à coloration.' || chr(10) ||
  '4. Ajouter ail, gingembre râpé et épices, cuire 2 minutes.' || chr(10) ||
  '5. Ajouter la tomate concassée, mijoter 10 minutes.' || chr(10) ||
  '6. Ajouter le lait de coco, laisser réduire 5 minutes.' || chr(10) ||
  '7. Incorporer le poulet grillé dans la sauce.' || chr(10) ||
  '8. Servir avec du riz basmati et du pain naan.',
  45, 'Moyen', 'Inde',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 500),
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', 'dd9de0f1-a2b3-4c4d-5e6f-7a8b9c0d1e2f', 150),
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 300),
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15),
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c',  10),
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', 'aa8ab9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 200),
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  30),
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   6);

-- 17. Boeuf Bourguignon — France
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Boeuf Bourguignon',
  'Ragoût de boeuf mijoté au vin de Bourgogne avec champignons et carottes. La quintessence de la cuisine paysanne française.',
  '1. Couper le boeuf en gros cubes, saler et poivrer.' || chr(10) ||
  '2. Faire dorer les cubes dans le beurre à feu vif, réserver.' || chr(10) ||
  '3. Faire revenir l''oignon et l''ail dans la même cocotte.' || chr(10) ||
  '4. Saupoudrer de farine, remuer 2 minutes.' || chr(10) ||
  '5. Remettre le boeuf, ajouter carottes et couvrir de vin rouge.' || chr(10) ||
  '6. Porter à ébullition, couvrir et cuire à feu doux 2 heures.' || chr(10) ||
  '7. Rectifier l''assaisonnement en fin de cuisson.' || chr(10) ||
  '8. Servir avec des pommes de terre vapeur ou des pâtes.',
  130, 'Difficile', 'France',
  'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 700),
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', 'bbe2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 250),
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 150),
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15),
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '773de4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f',  60),
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '884ef5a6-b7c8-4d9e-0f1a-2b3c4d5e6f7a',  30),
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8);

-- 18. Paella Valenciana — Espagne
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by) VALUES (
  'f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Paella aux Fruits de Mer',
  'Riz valencien cuit dans un bouillon safrané avec crevettes, tomates et poivrons. La fête méditerranéenne en une seule poêle.',
  '1. Chauffer l''huile dans une grande poêle à paella à feu moyen.' || chr(10) ||
  '2. Faire revenir l''oignon et l''ail jusqu''à transparence.' || chr(10) ||
  '3. Ajouter les poivrons en lanières, cuire 5 minutes.' || chr(10) ||
  '4. Incorporer la tomate concassée, cuire 5 minutes.' || chr(10) ||
  '5. Ajouter le riz, nacrer 2 minutes en remuant.' || chr(10) ||
  '6. Verser 800 ml de bouillon chaud avec quelques pistils de safran.' || chr(10) ||
  '7. Disposer les crevettes sur le riz, ne plus mélanger.' || chr(10) ||
  '8. Cuire à feu moyen 18 minutes jusqu''à absorption. Laisser reposer 5 min.',
  50, 'Moyen', 'Espagne',
  'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80', NULL
);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '11a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 400),
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', 'eeb5c6d7-e8f9-4a0b-1c2d-3e4f5a6b7c8d', 350),
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 200),
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', 'bb7bc8d9-e0f1-4a2b-3c4d-5e6f7a8b9c0d', 150),
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100),
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15),
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  50),
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8);

-- ============================================================
-- FIN — 18 recettes · 38 ingrédients · 4 catégories
-- Afrique : 6 recettes (Sénégal, Nigeria, Côte d'Ivoire, Cameroun, Ghana, Mali)
-- Rapide  : 6 recettes ≤ 25 min (France×2, USA×2, Italie, International)
-- International : 6 recettes (Italie, Grèce, Thaïlande, Inde, France, Espagne)
-- ============================================================
