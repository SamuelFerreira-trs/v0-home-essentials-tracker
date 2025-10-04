-- Create the enxoval_items table for home essentials tracking
CREATE TABLE IF NOT EXISTS public.enxoval_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL,
  room_category TEXT NOT NULL CHECK (room_category IN ('Kitchen', 'Living Room', 'Bedroom', 'Bathroom', 'Laundry', 'Dining Room', 'Home Office', 'Outdoor', 'General')),
  purchase_status TEXT NOT NULL DEFAULT 'Not Purchased' CHECK (purchase_status IN ('Not Purchased', 'Purchased', 'In Progress')),
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  estimated_cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
  actual_cost NUMERIC(10, 2),
  quantity INTEGER NOT NULL DEFAULT 1,
  notes TEXT DEFAULT '',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.enxoval_items ENABLE ROW LEVEL SECURITY;

-- Create policy: authenticated users can read all items (collaborative)
CREATE POLICY "Anyone authenticated can view items"
  ON public.enxoval_items
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy: authenticated users can insert items
CREATE POLICY "Anyone authenticated can insert items"
  ON public.enxoval_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy: authenticated users can update all items (collaborative)
CREATE POLICY "Anyone authenticated can update items"
  ON public.enxoval_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy: authenticated users can delete all items (collaborative)
CREATE POLICY "Anyone authenticated can delete items"
  ON public.enxoval_items
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_enxoval_items_room_category ON public.enxoval_items(room_category);
CREATE INDEX IF NOT EXISTS idx_enxoval_items_purchase_status ON public.enxoval_items(purchase_status);
CREATE INDEX IF NOT EXISTS idx_enxoval_items_priority ON public.enxoval_items(priority);
CREATE INDEX IF NOT EXISTS idx_enxoval_items_user_id ON public.enxoval_items(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_enxoval_items_updated_at
  BEFORE UPDATE ON public.enxoval_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
