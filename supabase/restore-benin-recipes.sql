-- Script simple pour restaurer les recettes béninoises dans leur catégorie
-- Exécutez ce script dans l'éditeur SQL Supabase

UPDATE recipes SET category_id = 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b' 
WHERE id IN (
  'b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', -- Wagassi
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', -- Abobo
  'b3c4d5e6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', -- Akassa
  'b4c5d6e7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', -- Déguê
  'b5c6d7e8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', -- Ignames Frites
  'b6c7d8e9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', -- Fritures de Poissons
  'b7c8d9e0-e1f2-4a3b-5c6d-7e8f9a0b1c2d', -- Sauce Crincrin
  'b8c9d0e1-f2a3-4b5c-6d7e-8f9a0b1c2d3e', -- Dakouin
  'b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e'  -- Atassi
);
