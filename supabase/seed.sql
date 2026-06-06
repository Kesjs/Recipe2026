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
('Citron', 29, 1.1, 9.0, 0.3),
('Pâtes', 131, 5.0, 25.0, 1.1),
('Bœuf', 250, 26.0, 0.0, 15.0),
('Pain', 265, 9.0, 49.0, 3.2),
('Fromage', 402, 25.0, 1.3, 33.0),
('Lait', 42, 3.4, 4.8, 1.0),
('Beurre', 717, 0.9, 0.1, 81.0),
('Sucre', 387, 0.0, 100.0, 0.0),
('Farine', 364, 10.0, 76.0, 1.0),
('Œuf', 155, 13.0, 1.1, 11.0),
('Huile d''olive', 884, 0.0, 0.0, 100.0),
('Basilic', 23, 3.2, 2.7, 0.6),
('Persil', 36, 3.0, 6.0, 0.8),
('Crevettes', 99, 24.0, 0.2, 0.3),
('Sauce soja', 53, 8.0, 4.9, 0.0),
('Miel', 304, 0.3, 82.0, 0.0),
('Yaourt', 59, 10.0, 3.6, 0.4),
('Fraises', 32, 0.7, 7.7, 0.3),
('Chocolat', 546, 4.5, 61.0, 31.0),
('Vanille', 288, 0.1, 12.7, 0.1),
('Concombre', 16, 0.7, 3.6, 0.1)
ON CONFLICT (name) DO NOTHING;

-- Insert sample recipes (African dishes)
-- Amiwo au Poulet
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
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
 NULL,
 'Bénin')
ON CONFLICT DO NOTHING;

-- Thiéboudienne
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
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
 NULL,
 'Sénégal')
ON CONFLICT DO NOTHING;

-- Aloco
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
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
 NULL,
 'Côte d''Ivoire')
ON CONFLICT DO NOTHING;

-- Tilapia au Four
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
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
 NULL,
 'Ghana')
ON CONFLICT DO NOTHING;

-- Garba
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
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
 NULL,
 'Côte d''Ivoire')
ON CONFLICT DO NOTHING;

-- Jollof Rice (Nigeria)
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
('66666666-6666-6666-6666-666666666666', 
 'Jollof Rice', 
 '1. Laver le riz et le faire tremper pendant 30 minutes.
2. Dans une grande marmite, faire chauffer l''huile et faire revenir les oignons.
3. Ajouter l''ail, le gingembre et le piment, bien mélanger.
4. Incorporer la tomate concassée et laisser mijoter 15 minutes.
5. Ajouter le riz égoutté et mélanger avec la sauce tomate.
6. Verser de l''eau ou du bouillon de poulet.
7. Ajouter du sel, du poivre et du curry.
8. Couvrir et laisser cuire à feu doux pendant 25-30 minutes.
9. Remuer de temps en temps pour éviter que le riz n''attache.
10. Servir chaud avec du poulet grillé ou des légumes.', 
 45, 
 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
 NULL,
 'Nigeria')
ON CONFLICT DO NOTHING;

-- Bobotie (South Africa)
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
('77777777-7777-7777-7777-777777777777', 
 'Bobotie', 
 '1. Préchauffer le four à 180°C.
2. Faire tremper le pain dans le lait pendant 10 minutes.
3. Dans une poêle, faire revenir les oignons dans l''huile.
4. Ajouter le bœuf haché et faire cuire jusqu''à coloration.
5. Incorporer le curry, le curcuma, le gingembre et l''ail.
6. Ajouter les raisins secs, les amandes et la confiture d''abricot.
7. Égoutter le pain et l''ajouter à la viande.
8. Verser le mélange dans un plat à gratin.
9. Battre les œufs avec le lait restant et verser sur le bobotie.
10. Cuire au four pendant 30-35 minutes jusqu''à ce que le dessus soit doré.', 
 50, 
 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
 NULL,
 'Afrique du Sud')
ON CONFLICT DO NOTHING;

-- Ndolé (Cameroon)
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
('88888888-8888-8888-8888-888888888888', 
 'Ndolé', 
 '1. Faire bouillir les feuilles de ndolé avec du bicarbonate pendant 20 minutes.
2. Rincer abondamment à l''eau froide pour enlever l''amertume.
3. Dans une marmite, faire chauffer l''huile de palme.
4. Faire revenir les oignons, l''ail et le gingembre.
5. Ajouter les crevettes séchées et le poisson fumé.
6. Incorporer les feuilles de ndolé et bien mélanger.
7. Ajouter le piment, le sel et le cube de bouillon.
8. Laisser mijoter à feu doux pendant 30 minutes.
9. Ajouter de l''eau si nécessaire pour obtenir la consistance désirée.
10. Servir avec du plantain bouilli ou du manioc.', 
 55, 
 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
 NULL,
 'Cameroun')
ON CONFLICT DO NOTHING;

-- Omelette aux légumes (Quick)
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
('99999999-9999-9999-9999-999999999999', 
 'Omelette aux légumes', 
 '1. Laver et couper les légumes (poivron, tomate, oignon) en petits dés.
2. Dans une poêle, faire chauffer un peu d''huile d''olive.
3. Faire revenir les légumes pendant 3-4 minutes.
4. Battre les œufs dans un bol avec du sel et du poivre.
5. Verser les œufs sur les légumes dans la poêle.
6. Cuire à feu moyen pendant 2-3 minutes.
7. Ajouter du fromage râpé si désiré.
8. Replier l''omelette en deux et servir chaud.', 
 15, 
 'https://images.unsplash.com/photo-1525351484163-7529414394d8?w=800&q=80',
 'cccccccc-cccc-cccc-cccc-cccccccccccc',
 NULL,
 'France')
ON CONFLICT DO NOTHING;

-- Salade César (Quick)
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb', 
 'Salade César', 
 '1. Laver et sécher la laitue, la couper en morceaux.
2. Couper le poulet grillé en lanières.
3. Préparer la sauce : mélanger mayonnaise, jus de citron, ail, parmesan.
4. Faire griller les croûtons de pain dans une poêle avec un peu d''huile.
5. Dans un grand bol, disposer la laitue.
6. Ajouter le poulet, les croûtons et le parmesan.
7. Verser la sauce César sur la salade.
8. Mélanger délicatement et servir immédiatement.', 
 20, 
 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80',
 'cccccccc-cccc-cccc-cccc-cccccccccccc',
 NULL,
 'États-Unis')
ON CONFLICT DO NOTHING;

-- Pasta Carbonara (International)
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', 
 'Pasta Carbonara', 
 '1. Faire cuire les pâtes dans une grande casserole d''eau salée.
2. Dans une poêle, faire revenir le guanciale ou bacon jusqu''à ce qu''il soit croustillant.
3. Dans un bol, battre les œufs avec le parmesan râpé.
4. Ajouter du poivre noir fraîchement moulu au mélange d''œufs.
5. Égoutter les pâtes en réservant un peu d''eau de cuisson.
6. Verser les pâtes dans la poêle avec le bacon.
7. Retirer du feu et ajouter le mélange d''œufs rapidement.
8. Mélanger vigoureusement pour créer une sauce crémeuse.
9. Ajouter un peu d''eau de cuisson si nécessaire.
10. Servir immédiatement avec du parmesan supplémentaire.', 
 25, 
 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
 'dddddddd-dddd-dddd-dddd-dddddddddddd',
 NULL,
 'Italie')
ON CONFLICT DO NOTHING;

-- Sushi Rolls (International)
INSERT INTO recipes (id, title, instructions, prep_time, image_url, category_id, created_by, country) VALUES
('cccccccc-cccc-cccc-cccc-bbbbbbbbbbbb', 
 'Sushi Rolls (Maki)', 
 '1. Rincer le riz à sushi jusqu''à ce que l''eau soit claire.
2. Cuire le riz avec de l''eau dans une casserole.
3. Mélanger le vinaigre de riz, le sucre et le sel pour la sauce.
4. Incorporer la sauce au riz cuit et laisser refroidir.
5. Placer une feuille de nori sur un tapis à sushi.
6. Étaler une couche fine de riz sur le nori.
7. Disposer le poisson, le concombre et l''avocat au centre.
8. Rouler fermement à l''aide du tapis à sushi.
9. Couper les rouleaux en morceaux avec un couteau humide.
10. Servir avec de la sauce soja, du wasabi et du gingembre mariné.', 
 40, 
 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
 'dddddddd-dddd-dddd-dddd-dddddddddddd',
 NULL,
 'Japon')
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

-- Insert recipe ingredients for Jollof Rice
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Riz'), 400),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Tomate'), 300),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Oignon'), 150),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Ail'), 15),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Gingembre'), 10),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Piment'), 5),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Huile de palme'), 50),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Sel'), 8),
('66666666-6666-6666-6666-666666666666', (SELECT id FROM ingredients WHERE name = 'Eau'), 500)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Bobotie
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Bœuf'), 500),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Pain'), 100),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Lait'), 200),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Oignon'), 100),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Ail'), 15),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Œuf'), 100),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Huile d''olive'), 30),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Sel'), 5),
('77777777-7777-7777-7777-777777777777', (SELECT id FROM ingredients WHERE name = 'Miel'), 30)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Ndolé
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('88888888-8888-8888-8888-888888888888', (SELECT id FROM ingredients WHERE name = 'Crevettes'), 200),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM ingredients WHERE name = 'Oignon'), 100),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM ingredients WHERE name = 'Ail'), 15),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM ingredients WHERE name = 'Gingembre'), 10),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM ingredients WHERE name = 'Huile de palme'), 80),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM ingredients WHERE name = 'Piment'), 5),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM ingredients WHERE name = 'Sel'), 5),
('88888888-8888-8888-8888-888888888888', (SELECT id FROM ingredients WHERE name = 'Eau'), 300)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Omelette aux légumes
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('99999999-9999-9999-9999-999999999999', (SELECT id FROM ingredients WHERE name = 'Œuf'), 150),
('99999999-9999-9999-9999-999999999999', (SELECT id FROM ingredients WHERE name = 'Poivron'), 50),
('99999999-9999-9999-9999-999999999999', (SELECT id FROM ingredients WHERE name = 'Tomate'), 50),
('99999999-9999-9999-9999-999999999999', (SELECT id FROM ingredients WHERE name = 'Oignon'), 30),
('99999999-9999-9999-9999-999999999999', (SELECT id FROM ingredients WHERE name = 'Huile d''olive'), 15),
('99999999-9999-9999-9999-999999999999', (SELECT id FROM ingredients WHERE name = 'Fromage'), 30),
('99999999-9999-9999-9999-999999999999', (SELECT id FROM ingredients WHERE name = 'Sel'), 3)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Salade César
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Poulet'), 200),
('aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Pain'), 50),
('aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Fromage'), 40),
('aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Ail'), 5),
('aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Citron'), 20),
('aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Huile d''olive'), 30),
('aaaaaaaa-aaaa-aaaa-aaaa-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Sel'), 3)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Pasta Carbonara
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', (SELECT id FROM ingredients WHERE name = 'Pâtes'), 300),
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', (SELECT id FROM ingredients WHERE name = 'Bœuf'), 100),
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', (SELECT id FROM ingredients WHERE name = 'Œuf'), 100),
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', (SELECT id FROM ingredients WHERE name = 'Fromage'), 50),
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', (SELECT id FROM ingredients WHERE name = 'Ail'), 5),
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', (SELECT id FROM ingredients WHERE name = 'Huile d''olive'), 20),
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', (SELECT id FROM ingredients WHERE name = 'Sel'), 5),
('bbbbbbbb-bbbb-bbbb-bbbb-aaaaaaaaaaaa', (SELECT id FROM ingredients WHERE name = 'Eau'), 500)
ON CONFLICT DO NOTHING;

-- Insert recipe ingredients for Sushi Rolls
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount_grams) VALUES
('cccccccc-cccc-cccc-cccc-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Riz'), 300),
('cccccccc-cccc-cccc-cccc-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Crevettes'), 200),
('cccccccc-cccc-cccc-cccc-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Concombre'), 100),
('cccccccc-cccc-cccc-cccc-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Sauce soja'), 30),
('cccccccc-cccc-cccc-cccc-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Sucre'), 15),
('cccccccc-cccc-cccc-cccc-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Sel'), 5),
('cccccccc-cccc-cccc-cccc-bbbbbbbbbbbb', (SELECT id FROM ingredients WHERE name = 'Eau'), 400)
ON CONFLICT DO NOTHING;
