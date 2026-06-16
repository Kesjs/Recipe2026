-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  prep_time INTEGER NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  created_by UUID REFERENCES profiles(id),
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Alter table to make created_by nullable (for existing tables)
ALTER TABLE recipes ALTER COLUMN created_by DROP NOT NULL;

-- Add country column to recipes table (for existing tables)
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS country TEXT;

-- Add missing columns for recipe creation
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS difficulty TEXT;

-- Ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  calories_per_100g NUMERIC NOT NULL,
  proteins NUMERIC NOT NULL,
  carbs NUMERIC NOT NULL,
  lipids NUMERIC NOT NULL
);

-- Recipe ingredients junction table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE NOT NULL,
  amount_grams NUMERIC NOT NULL,
  PRIMARY KEY (recipe_id, ingredient_id)
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (user_id, recipe_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipes_created_by ON recipes(created_by);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_ingredient_id ON recipe_ingredients(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_recipe_id ON favorites(recipe_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Categories policies
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can create categories" ON categories;
CREATE POLICY "Admins can create categories" ON categories FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.email LIKE '%@admin.com'
  )
);

-- Recipes policies
DROP POLICY IF EXISTS "Anyone can view recipes" ON recipes;
CREATE POLICY "Anyone can view recipes" ON recipes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can create recipes" ON recipes;
CREATE POLICY "Authenticated users can create recipes" ON recipes FOR INSERT WITH CHECK (auth.uid() = created_by AND created_by IS NOT NULL);
DROP POLICY IF EXISTS "Users can update their own recipes" ON recipes;
CREATE POLICY "Users can update their own recipes" ON recipes FOR UPDATE USING (auth.uid() = created_by);
DROP POLICY IF EXISTS "Users can delete their own recipes" ON recipes;
CREATE POLICY "Users can delete their own recipes" ON recipes FOR DELETE USING (auth.uid() = created_by);

-- Ingredients policies
DROP POLICY IF EXISTS "Anyone can view ingredients" ON ingredients;
CREATE POLICY "Anyone can view ingredients" ON ingredients FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can create ingredients" ON ingredients;
CREATE POLICY "Authenticated users can create ingredients" ON ingredients FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.email LIKE '%@admin.com'
  ) OR auth.uid() IS NOT NULL
);

-- Recipe ingredients policies
DROP POLICY IF EXISTS "Anyone can view recipe ingredients" ON recipe_ingredients;
CREATE POLICY "Anyone can view recipe ingredients" ON recipe_ingredients FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can create recipe ingredients" ON recipe_ingredients;
CREATE POLICY "Authenticated users can create recipe ingredients" ON recipe_ingredients FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Users can update recipe ingredients for their recipes" ON recipe_ingredients;
CREATE POLICY "Users can update recipe ingredients for their recipes" ON recipe_ingredients FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM recipes WHERE recipes.id = recipe_ingredients.recipe_id AND recipes.created_by = auth.uid()
  )
);
DROP POLICY IF EXISTS "Users can delete recipe ingredients for their recipes" ON recipe_ingredients;
CREATE POLICY "Users can delete recipe ingredients for their recipes" ON recipe_ingredients FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM recipes WHERE recipes.id = recipe_ingredients.recipe_id AND recipes.created_by = auth.uid()
  )
);

-- Favorites policies
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorites;
CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert their own favorites" ON favorites;
CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorites;
CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to call the function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
