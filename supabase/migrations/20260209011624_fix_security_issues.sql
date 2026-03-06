/*
  # Fix Security Issues

  ## Changes Made

  1. **Removed Unused Indexes**
     - Dropped `videos_published_at_idx` (not being used in queries)
     - Dropped `products_in_stock_idx` (not being used in queries)

  2. **Created Admin System**
     - Added `admins` table to track admin users
     - Only users listed in the `admins` table can manage content

  3. **Fixed RLS Policies for Content Tables (episodes, videos, products)**
     - Public can still SELECT (view) content
     - Only admin users can INSERT, UPDATE, DELETE
     - Replaced `USING (true)` with proper admin checks using `auth.uid()`

  4. **Fixed RLS Policies for Subscribers Table**
     - Public can INSERT only (allows subscriptions)
     - Only admin users can SELECT and DELETE subscribers
     - Prevents duplicate email subscriptions at the database level

  ## Security Improvements

  - All content management operations now require admin privileges
  - RLS policies are properly restrictive and check user authentication
  - Subscriber data is protected and only accessible to admins
  - No more blanket `USING (true)` policies that bypass security

  ## Notes

  - To add admins, insert user IDs into the `admins` table
  - The `subscribers` table already has a UNIQUE constraint on email
  - Public read access is maintained for episodes, videos, and products as intended
*/

-- Create admins table to track who can manage content
CREATE TABLE IF NOT EXISTS admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Only admins can view the admins table
CREATE POLICY "Admins can view admins table"
  ON admins FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
  );

-- Drop unused indexes
DROP INDEX IF EXISTS videos_published_at_idx;
DROP INDEX IF EXISTS products_in_stock_idx;

-- Fix episodes RLS policies
DROP POLICY IF EXISTS "Authenticated users can insert episodes" ON episodes;
DROP POLICY IF EXISTS "Authenticated users can update episodes" ON episodes;
DROP POLICY IF EXISTS "Authenticated users can delete episodes" ON episodes;

CREATE POLICY "Admins can insert episodes"
  ON episodes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update episodes"
  ON episodes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete episodes"
  ON episodes FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- Fix videos RLS policies
DROP POLICY IF EXISTS "Authenticated users can insert videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON videos;

CREATE POLICY "Admins can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- Fix products RLS policies
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- Fix subscribers RLS policies
DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON subscribers;
DROP POLICY IF EXISTS "Authenticated users can delete subscribers" ON subscribers;

CREATE POLICY "Admins can view subscribers"
  ON subscribers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete subscribers"
  ON subscribers FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );