-- ============================================================
-- NAYA CUISINE — seed-addons.sql v3
-- Basé sur les ingrédients RÉELS de la base
-- 100% safe — ON CONFLICT DO NOTHING partout
-- ============================================================

-- ── Ingrédients manquants à ajouter ───────────────────────
-- (ceux qui ne sont pas encore dans ta DB)
INSERT INTO ingredients (id, name, calories_per_100g, proteins, carbs, lipids) VALUES
  ('ac000001-0000-4000-a000-000000000001', 'Arachide',       567, 26.0, 16.0, 49.0),
  ('ac000002-0000-4000-a000-000000000002', 'Igname',         118,  1.5, 28.0,  0.2),
  ('ac000003-0000-4000-a000-000000000003', 'Epinard',         23,  2.9,  3.6,  0.4),
  ('ac000004-0000-4000-a000-000000000004', 'Lait de coco',   230,  2.3,  6.0, 24.0),
  ('ac000005-0000-4000-a000-000000000005', 'Pate de tomate',  82,  4.1, 17.0,  0.5)
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- BÉNIN — 3 recettes (Afrique)
-- ============================================================

-- 1. Amiwo au Poulet — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'be000001-0000-4000-a000-000000000001',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Amiwo au Poulet',
  'Plat traditionnel béninois à base de farine de maïs cuite dans une sauce tomate épicée au poulet. Le repas de fête par excellence au Bénin.',
  '1. Découper le poulet en morceaux, assaisonner de sel et piment.' || chr(10) ||
  '2. Faire dorer le poulet dans l''huile de palme à feu vif, réserver.' || chr(10) ||
  '3. Faire revenir l''oignon et l''ail dans la même huile 3 minutes.' || chr(10) ||
  '4. Ajouter la pâte de tomate et la tomate fraîche, cuire 10 minutes.' || chr(10) ||
  '5. Verser 800 ml d''eau, ajouter le piment. Porter à ébullition.' || chr(10) ||
  '6. Remettre le poulet dans la sauce, mijoter 20 minutes.' || chr(10) ||
  '7. Délayer la farine de maïs dans 200 ml d''eau froide, verser en filet.' || chr(10) ||
  '8. Remuer constamment à feu doux 15 minutes jusqu''à texture épaisse.',
  55, 'Moyen', 'Bénin',
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('be000001-0000-4000-a000-000000000001', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 500), -- Poulet
  ('be000001-0000-4000-a000-000000000001', 'cc4cd5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 300), -- Farine de mais
  ('be000001-0000-4000-a000-000000000001', '33c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 200), -- Tomate
  ('be000001-0000-4000-a000-000000000001', 'ac000005-0000-4000-a000-000000000005',  50), -- Pate de tomate
  ('be000001-0000-4000-a000-000000000001', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100), -- Oignon
  ('be000001-0000-4000-a000-000000000001', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15), -- Ail
  ('be000001-0000-4000-a000-000000000001', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  60), -- Huile de palme
  ('be000001-0000-4000-a000-000000000001', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5), -- Piment
  ('be000001-0000-4000-a000-000000000001', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   6)  -- Sel
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 2. Igname Pilée Sauce Arachide — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'be000002-0000-4000-a000-000000000002',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Igname Pilée Sauce Arachide',
  'L''igname pilée servie avec une sauce arachide onctueuse au poulet. Le plat du dimanche par excellence au Bénin.',
  '1. Éplucher et couper l''igname en morceaux, cuire à l''eau bouillante salée 25 min.' || chr(10) ||
  '2. Égoutter et piler dans un mortier jusqu''à texture lisse et élastique.' || chr(10) ||
  '3. Former des boules avec les mains mouillées. Réserver.' || chr(10) ||
  '4. Faire revenir l''oignon et le poulet en morceaux dans l''huile de palme.' || chr(10) ||
  '5. Diluer la pâte d''arachide dans 400 ml d''eau chaude.' || chr(10) ||
  '6. Verser sur le poulet, ajouter tomate, ail, piment et sel.' || chr(10) ||
  '7. Mijoter à feu doux 25 minutes en remuant régulièrement.' || chr(10) ||
  '8. Servir les boules d''igname avec la sauce arachide.',
  65, 'Moyen', 'Bénin',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('be000002-0000-4000-a000-000000000002', 'ac000002-0000-4000-a000-000000000002', 800), -- Igname
  ('be000002-0000-4000-a000-000000000002', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 400), -- Poulet
  ('be000002-0000-4000-a000-000000000002', 'ac000001-0000-4000-a000-000000000001', 200), -- Arachide
  ('be000002-0000-4000-a000-000000000002', '33c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 150), -- Tomate
  ('be000002-0000-4000-a000-000000000002', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f',  80), -- Oignon
  ('be000002-0000-4000-a000-000000000002', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15), -- Ail
  ('be000002-0000-4000-a000-000000000002', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  50), -- Huile de palme
  ('be000002-0000-4000-a000-000000000002', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5), -- Piment
  ('be000002-0000-4000-a000-000000000002', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8)  -- Sel
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 3. Gboma Dessi (épinards au boeuf) — Bénin
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'be000003-0000-4000-a000-000000000003',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Gboma Dessi',
  'Sauce béninoise aux feuilles d''épinards (gboma) et boeuf, parfumée aux épices locales. Un incontournable de la cuisine fon du Bénin.',
  '1. Laver et hacher grossièrement les épinards.' || chr(10) ||
  '2. Couper le boeuf en morceaux, assaisonner de sel et piment.' || chr(10) ||
  '3. Faire dorer le boeuf dans l''huile de palme à feu vif, réserver.' || chr(10) ||
  '4. Faire revenir l''oignon et l''ail dans la même huile.' || chr(10) ||
  '5. Ajouter la tomate et la pâte de tomate, cuire 8 minutes.' || chr(10) ||
  '6. Verser 300 ml d''eau, remettre le boeuf, ajouter piment et sel.' || chr(10) ||
  '7. Mijoter 20 minutes à feu moyen.' || chr(10) ||
  '8. Ajouter les épinards hachés, cuire encore 10 minutes. Servir avec riz ou igname.',
  50, 'Facile', 'Bénin',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('be000003-0000-4000-a000-000000000003', 'ac000003-0000-4000-a000-000000000003', 400), -- Epinard
  ('be000003-0000-4000-a000-000000000003', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 400), -- Boeuf
  ('be000003-0000-4000-a000-000000000003', '33c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 150), -- Tomate
  ('be000003-0000-4000-a000-000000000003', 'ac000005-0000-4000-a000-000000000005',  40), -- Pate de tomate
  ('be000003-0000-4000-a000-000000000003', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f',  80), -- Oignon
  ('be000003-0000-4000-a000-000000000003', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15), -- Ail
  ('be000003-0000-4000-a000-000000000003', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  50), -- Huile de palme
  ('be000003-0000-4000-a000-000000000003', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5), -- Piment
  ('be000003-0000-4000-a000-000000000003', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   6)  -- Sel
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- ============================================================
-- AFRIQUE — Cameroun + Mali
-- ============================================================

-- 4. Ndolé aux Crevettes — Cameroun
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Ndolé aux Crevettes',
  'Plat national camerounais aux feuilles amères, crevettes et pâte d''arachide. Un goût profond et unique.',
  '1. Blanchir les épinards dans l''eau bouillante salée 5 minutes, égoutter et hacher.' || chr(10) ||
  '2. Faire revenir l''oignon et l''ail dans l''huile de palme.' || chr(10) ||
  '3. Ajouter les crevettes, cuire 3 minutes.' || chr(10) ||
  '4. Incorporer la pâte d''arachide diluée dans 200 ml d''eau chaude.' || chr(10) ||
  '5. Ajouter les épinards hachés, bien mélanger.' || chr(10) ||
  '6. Assaisonner de sel, gingembre et piment.' || chr(10) ||
  '7. Mijoter à feu doux 15 minutes en remuant.' || chr(10) ||
  '8. Servir avec du riz blanc ou des bâtons de manioc.',
  50, 'Moyen', 'Cameroun',
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', 'ac000003-0000-4000-a000-000000000003', 400), -- Epinard
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', 'eeb5c6d7-e8f9-4a0b-1c2d-3e4f5a6b7c8d', 300), -- Crevettes
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', 'ac000001-0000-4000-a000-000000000001', 150), -- Arachide
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100), -- Oignon
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15), -- Ail
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  60), -- Huile de palme
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c',   8), -- Gingembre
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5), -- Piment
  ('e3f4a5b6-c7d8-4e9f-a0b1-c2d3e4f5a6b7', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   6)  -- Sel
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 5. Mafé de Boeuf — Mali
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Mafé de Boeuf',
  'Ragoût onctueux à la pâte d''arachide, emblème de la cuisine malienne. Le boeuf fond dans cette sauce crémeuse.',
  '1. Couper le boeuf en gros cubes, assaisonner de sel et piment.' || chr(10) ||
  '2. Faire dorer les morceaux dans l''huile de palme à feu vif, réserver.' || chr(10) ||
  '3. Faire revenir l''oignon haché 5 minutes.' || chr(10) ||
  '4. Ajouter la tomate concassée et la pâte de tomate, cuire 5 minutes.' || chr(10) ||
  '5. Diluer la pâte d''arachide dans 500 ml d''eau chaude, verser.' || chr(10) ||
  '6. Remettre le boeuf, ajouter carottes et piment.' || chr(10) ||
  '7. Mijoter à feu doux 45 minutes en remuant régulièrement.' || chr(10) ||
  '8. Rectifier l''assaisonnement, servir avec du riz blanc.',
  70, 'Moyen', 'Mali',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 500), -- Boeuf
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', 'ac000001-0000-4000-a000-000000000001', 200), -- Arachide
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 200), -- Tomate concassee
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 150), -- Oignon
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', 'bbe2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 150), -- Carotte
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '55e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',  50), -- Huile de palme
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '88b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',   5), -- Piment
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8)  -- Sel
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- ============================================================
-- INTERNATIONAL — Inde + France + Espagne
-- ============================================================

-- 6. Chicken Tikka Masala — Inde
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'd5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Chicken Tikka Masala',
  'Poulet tendre grillé dans une sauce tomate crémeuse aux épices indiennes. L''un des plats les plus populaires au monde.',
  '1. Mariner le poulet dans le yaourt, gingembre, ail et sel 30 minutes.' || chr(10) ||
  '2. Griller le poulet à la poêle à feu vif jusqu''à légères traces.' || chr(10) ||
  '3. Faire revenir l''oignon haché dans l''huile d''olive jusqu''à coloration.' || chr(10) ||
  '4. Ajouter ail et gingembre râpé, cuire 2 minutes.' || chr(10) ||
  '5. Ajouter la tomate concassée, mijoter 10 minutes.' || chr(10) ||
  '6. Ajouter le lait de coco, laisser réduire 5 minutes.' || chr(10) ||
  '7. Incorporer le poulet grillé dans la sauce.' || chr(10) ||
  '8. Servir avec du riz.',
  45, 'Moyen', 'Inde',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '22b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 500), -- Poulet
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', 'dd9de0f1-a2b3-4c4d-5e6f-7a8b9c0d1e2f', 150), -- Yaourt
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 300), -- Tomate concassee
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100), -- Oignon
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15), -- Ail
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '77a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c',  10), -- Gingembre
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', 'ac000004-0000-4000-a000-000000000004', 200), -- Lait de coco
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  30), -- Huile d'olive
  ('d5e6f7a8-b9c0-4d1e-2f3a-5b6c7d8e9f0a', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   6)  -- Sel
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 7. Boeuf Bourguignon — France
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Boeuf Bourguignon',
  'Ragoût de boeuf mijoté avec carottes et oignons. La quintessence de la cuisine paysanne française.',
  '1. Couper le boeuf en gros cubes, saler et poivrer.' || chr(10) ||
  '2. Faire dorer les cubes dans le beurre à feu vif, réserver.' || chr(10) ||
  '3. Faire revenir l''oignon et l''ail dans la même cocotte.' || chr(10) ||
  '4. Saupoudrer de farine, remuer 2 minutes.' || chr(10) ||
  '5. Remettre le boeuf, ajouter carottes et couvrir de bouillon.' || chr(10) ||
  '6. Porter à ébullition, couvrir et cuire à feu doux 2 heures.' || chr(10) ||
  '7. Rectifier l''assaisonnement en fin de cuisson.' || chr(10) ||
  '8. Servir avec des pommes de terre vapeur ou des pâtes.',
  130, 'Difficile', 'France',
  'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '11d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 700), -- Boeuf
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', 'bbe2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 250), -- Carotte
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 150), -- Oignon
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15), -- Ail
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '773de4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f',  60), -- Beurre
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '884ef5a6-b7c8-4d9e-0f1a-2b3c4d5e6f7a',  30), -- Farine
  ('e6f7a8b9-c0d1-4e2f-3a4b-6c7d8e9f0a1b', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8)  -- Sel
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- 8. Paella aux Fruits de Mer — Espagne
INSERT INTO recipes (id, category_id, title, description, instructions, prep_time, difficulty, country, image_url, created_by)
VALUES (
  'f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'Paella aux Fruits de Mer',
  'Riz valencien cuit dans un bouillon avec crevettes, poivrons et tomates. La fête méditerranéenne en une seule poêle.',
  '1. Chauffer l''huile dans une grande poêle à paella à feu moyen.' || chr(10) ||
  '2. Faire revenir l''oignon et l''ail jusqu''à transparence.' || chr(10) ||
  '3. Ajouter les poivrons en lanières, cuire 5 minutes.' || chr(10) ||
  '4. Incorporer la tomate concassée, cuire 5 minutes.' || chr(10) ||
  '5. Ajouter le riz, nacrer 2 minutes en remuant.' || chr(10) ||
  '6. Verser 800 ml de bouillon chaud.' || chr(10) ||
  '7. Disposer les crevettes sur le riz, ne plus mélanger.' || chr(10) ||
  '8. Cuire 18 minutes à feu moyen jusqu''à absorption. Reposer 5 min.',
  50, 'Moyen', 'Espagne',
  'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80',
  NULL
) ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '11a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 400), -- Riz
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', 'eeb5c6d7-e8f9-4a0b-1c2d-3e4f5a6b7c8d', 350), -- Crevettes
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', 'aa6ab7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 200), -- Tomate concassee
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', 'bb7bc8d9-e0f1-4a2b-3c4d-5e6f7a8b9c0d', 150), -- Poivron
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '44d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 100), -- Oignon
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '66f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',  15), -- Ail
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '33f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b',  50), -- Huile d'olive
  ('f7a8b9c0-d1e2-4f3a-4b5c-7d8e9f0a1b2c', '99c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',   8)  -- Sel
ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;

-- ============================================================
-- FIN seed-addons.sql v3
-- 8 recettes ajoutées, aucune donnée existante modifiée
-- ============================================================
