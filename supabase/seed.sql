-- Insert categories
INSERT INTO categories (id, name, title, description) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tout', 'Toutes les Recettes', 'Explorez notre collection complète de recettes saines et nutritives du monde entier.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Afrique', 'Patrimoine Culinaires Africains', 'Découvrez les saveurs authentiques et diététiques du continent : Amiwo, Tilapia au four, Aloco et bien d''autres.'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Rapide', 'Recettes Rapides', 'Des plats prêts en moins de 30 minutes pour les journées chargées.'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'International', 'Cuisine du Monde', 'Voyagez à travers les saveurs internationales avec nos recettes du monde entier.')
ON CONFLICT (name) DO NOTHING;

-- Insert sample ingredients
INSERT INTO ingredients (name, calories_per_100g, proteins, carbs, lipids) VALUES
('Riz', 130, 2.7, 28.0, 0.3),
('Poulet', 165, 31.0, 0.0, 3.6),
('Tomate', 18, 0.9, 3.9, 0.2),
('Oignon', 40, 1.1, 9.3, 0.1),
('Huile de palme', 884, 0.0, 0.0, 100.0),
('Poisson Tilapia', 96, 20.0, 0.0, 1.7),
('Banane plantain', 122, 1.3, 31.0, 0.3),
('Maïs', 86, 3.4, 19.0, 1.5),
('Piment', 31, 1.0, 6.0, 0.3),
('Ail', 149, 6.4, 33.0, 0.5),
('Gingembre', 80, 1.8, 18.0, 0.8),
('Sel', 0, 0.0, 0.0, 0.0),
('Eau', 0, 0.0, 0.0, 0.0),
('Farine de maïs', 361, 8.0, 76.0, 3.9),
('Lait de coco', 230, 2.3, 5.0, 24.0),
('Carotte', 41, 0.9, 10.0, 0.2),
('Chou', 25, 1.3, 6.0, 0.1),
('Aubergine', 25, 1.0, 6.0, 0.2),
('Poivron', 31, 1.0, 6.0, 0.3),
('Citron', 29, 1.1, 9.0, 0.3)
ON CONFLICT (name) DO NOTHING;

-- Insert sample recipes (African dishes)
-- Amiwo au Poulet
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by) VALUES
('11111111-1111-1111-1111-111111111111', 
 'Amiwo au Poulet',
 '1. Faire cuire le riz avec de l''eau salée pendant 20 minutes.
2. Couper le poulet en morceaux et le faire mariner avec l''ail, le gingembre et le piment.
3. Dans une marmite, faire chauffer l''huile de palme et y faire revenir les oignons.
4. Ajouter le poulet mariné et faire cuire à feu moyen pendant 15 minutes.
5. Ajouter les tomates concassées et laisser mijoter 10 minutes.
6. Incorporer le riz cuit et mélanger délicatement.
7. Ajouter de l''eau si nécessaire et laisser cuire 5 minutes supplémentaires.
8. Servir chaud.',
 45,
 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
 NULL)
ON CONFLICT DO NOTHING;

-- Thiéboudienne
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by) VALUES
('22222222-2222-2222-2222-222222222222', 
 'Thiéboudienne', 
 '1. Laver et couper le poisson en morceaux.
2. Préparer la marinade avec l''ail, le piment, le persil et le citron.
3. Faire mariner le poisson pendant 30 minutes.
4. Dans une grande marmite, faire revenir les oignons dans l''huile.
5. Ajouter la tomate et laisser mijoter.
6. Ajouter le poisson et laisser cuire 15 minutes.
7. Retirer le poisson et réserver.
8. Ajouter le riz lavé et l''eau, laisser cuire.
9. Ajouter les légumes (carottes, chou, aubergine) coupés en morceaux.
10. Servir avec le poisson et les légumes.', 
 60, 
 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
 NULL)
ON CONFLICT DO NOTHING;

-- Aloco
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by) VALUES
('33333333-3333-3333-3333-333333333333', 
 'Aloco (Bananes Plantains Frites)', 
 '1. Éplucher les bananes plantains bien mûres.
2. Couper les bananes en rondelles épaisses.
3. Dans une poêle, chauffer l''huile de palme.
4. Plonger les rondelles de banane dans l''huile chaude.
5. Faire frire à feu moyen jusqu''à ce qu''elles soient dorées.
6. Retirer et égoutter sur du papier absorbant.
7. Saupoudrer de sel et servir chaud.
8. Accompagner de piment si désiré.', 
 25, 
 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800&q=80',
 'cccccccc-cccc-cccc-cccc-cccccccccccc',
 NULL)
ON CONFLICT DO NOTHING;

-- Tilapia au Four
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by) VALUES
('44444444-4444-4444-4444-444444444444', 
 'Tilapia au Four', 
 '1. Préchauffer le four à 200°C.
2. Nettoyer le tilapia et le sécher.
3. Préparer une marinade avec l''huile, l''ail, le gingembre, le citron et les herbes.
4. Badigeonner le poisson avec la marinade.
5. Placer sur une plaque de cuisson avec du papier sulfurisé.
6. Ajouter des rondelles de tomate et d''oignon sur le poisson.
7. Cuire au four pendant 25-30 minutes.
8. Arroser régulièrement avec le jus de cuisson.
9. Servir avec du riz ou des légumes.', 
 35, 
 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
 NULL)
ON CONFLICT DO NOTHING;

-- Garba
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by) VALUES
('55555555-5555-5555-5555-555555555555', 
 'Garba (Attieké au Poisson)', 
 '1. Rincer l''attieké à l''eau tiède et l''égrainer.
2. Cuire à la vapeur pendant 10 minutes.
3. Faire frire le poisson tilapia dans l''huile chaude.
4. Dans un bol, mélanger l''attieké avec un peu d''huile.
5. Ajouter les oignons coupés et les tomates.
6. Assaisonner avec le piment et le sel.
7. Servir l''attieké avec le poisson frit.
8. Accompagner de piment si désiré.', 
 30, 
 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
 'cccccccc-cccc-cccc-cccc-cccccccccccc',
 NULL)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Amiwo
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Riz'), 300),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Poulet'), 500),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Tomate'), 200),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Oignon'), 100),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Huile de palme'), 50),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Ail'), 10),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Gingembre'), 10),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Piment'), 5),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Sel'), 5),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM ingredients WHERE name = 'Eau'), 500)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Thiéboudienne
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Riz'), 400),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Poisson Tilapia'), 600),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Tomate'), 300),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Oignon'), 150),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Huile de palme'), 60),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Carotte'), 200),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Chou'), 150),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Ail'), 15),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Citron'), 30),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Sel'), 8),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM ingredients WHERE name = 'Eau'), 600)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Aloco
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('33333333-3333-3333-3333-333333333333', (SELECT id FROM ingredients WHERE name = 'Banane plantain'), 500),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM ingredients WHERE name = 'Huile de palme'), 100),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM ingredients WHERE name = 'Sel'), 5),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM ingredients WHERE name = 'Piment'), 3)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Tilapia au Four
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('44444444-4444-4444-4444-444444444444', (SELECT id FROM ingredients WHERE name = 'Poisson Tilapia'), 600),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM ingredients WHERE name = 'Tomate'), 200),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM ingredients WHERE name = 'Oignon'), 100),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM ingredients WHERE name = 'Ail'), 15),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM ingredients WHERE name = 'Gingembre'), 10),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM ingredients WHERE name = 'Citron'), 40),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM ingredients WHERE name = 'Huile de palme'), 30),
('44444444-4444-4444-4444-444444444444', (SELECT id FROM ingredients WHERE name = 'Sel'), 5)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Garba
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('55555555-5555-5555-5555-555555555555', (SELECT id FROM ingredients WHERE name = 'Farine de maïs'), 300),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM ingredients WHERE name = 'Poisson Tilapia'), 500),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM ingredients WHERE name = 'Tomate'), 150),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM ingredients WHERE name = 'Oignon'), 80),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM ingredients WHERE name = 'Huile de palme'), 80),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM ingredients WHERE name = 'Piment'), 5),
('55555555-5555-5555-5555-555555555555', (SELECT id FROM ingredients WHERE name = 'Sel'), 5)
ON CONFLICT DO NOTHING;
