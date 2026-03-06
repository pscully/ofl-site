/*
  # Production Hardening

  1. Add index on admins(user_id) for RLS policy performance
     - Every write operation queries admins.user_id via RLS policies
     - Primary key already covers this since user_id IS the PK - no separate index needed

  2. Add price validation on products
     - Prevents negative or zero prices

  3. Add updated_at columns to content tables
     - Tracks when content was last modified
*/

-- Add price check constraint
ALTER TABLE products ADD CONSTRAINT products_price_positive CHECK (price > 0);

-- Add updated_at columns
ALTER TABLE episodes ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE videos ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER episodes_updated_at
  BEFORE UPDATE ON episodes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
