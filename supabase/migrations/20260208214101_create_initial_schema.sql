/*
  # Create Old Fart Media Database Schema

  1. New Tables
    - `episodes` - Podcast episodes for Old Fart Livin'
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `duration` (text)
      - `audio_url` (text, optional)
      - `image_url` (text, optional)
      - `show_notes` (text, optional)
      - `guest` (text, optional)
      - `created_at` (timestamptz)

    - `videos` - Video content for Golfin' and Fishin' verticals
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `youtube_id` (text)
      - `thumbnail_url` (text)
      - `vertical` (text) - either 'golfin' or 'fishin'
      - `view_count` (integer, optional)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)

    - `products` - Merchandise for all three verticals
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `category` (text)
      - `vertical` (text) - 'livin', 'golfin', or 'fishin'
      - `shopify_product_id` (text, optional)
      - `in_stock` (boolean, default true)
      - `created_at` (timestamptz)

    - `subscribers` - Email subscribers
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for episodes, videos, and products (content is public)
    - Authenticated write access for episodes, videos, and products (content management)
    - Public insert access for subscribers (anyone can subscribe)
    - Authenticated read/delete access for subscribers (content management)
*/

-- Create episodes table
CREATE TABLE IF NOT EXISTS episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  duration text NOT NULL,
  audio_url text,
  image_url text,
  show_notes text,
  guest text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view episodes"
  ON episodes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert episodes"
  ON episodes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update episodes"
  ON episodes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete episodes"
  ON episodes FOR DELETE
  TO authenticated
  USING (true);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  youtube_id text NOT NULL,
  thumbnail_url text NOT NULL,
  vertical text NOT NULL CHECK (vertical IN ('golfin', 'fishin')),
  view_count integer DEFAULT 0,
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view videos"
  ON videos FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  vertical text NOT NULL CHECK (vertical IN ('livin', 'golfin', 'fishin')),
  shopify_product_id text,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete subscribers"
  ON subscribers FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS episodes_date_idx ON episodes(date DESC);
CREATE INDEX IF NOT EXISTS videos_vertical_idx ON videos(vertical);
CREATE INDEX IF NOT EXISTS videos_published_at_idx ON videos(published_at DESC);
CREATE INDEX IF NOT EXISTS products_vertical_idx ON products(vertical);
CREATE INDEX IF NOT EXISTS products_in_stock_idx ON products(in_stock);
