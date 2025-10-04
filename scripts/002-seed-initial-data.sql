-- Seed initial data for enxoval_items table
-- Only insert if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.enxoval_items LIMIT 1) THEN
    -- Kitchen items
    INSERT INTO public.enxoval_items (item_name, room_category, priority, estimated_cost, quantity, notes) VALUES
    ('Refrigerator', 'Kitchen', 'High', 2500.00, 1, 'Energy efficient model'),
    ('Stove/Oven', 'Kitchen', 'High', 1800.00, 1, '4-burner gas or electric'),
    ('Microwave', 'Kitchen', 'Medium', 400.00, 1, ''),
    ('Dishwasher', 'Kitchen', 'Medium', 1200.00, 1, 'Optional but convenient'),
    ('Cookware Set', 'Kitchen', 'High', 300.00, 1, 'Pots and pans'),
    ('Dinnerware Set', 'Kitchen', 'High', 200.00, 1, 'Plates, bowls, cups for 8'),
    ('Cutlery Set', 'Kitchen', 'High', 150.00, 1, 'Knives, forks, spoons'),
    ('Glassware Set', 'Kitchen', 'Medium', 100.00, 1, 'Drinking glasses'),
    ('Kitchen Knives', 'Kitchen', 'High', 120.00, 1, 'Chef knife, paring knife, etc.'),
    ('Cutting Boards', 'Kitchen', 'High', 40.00, 2, 'Plastic and wood'),
    ('Mixing Bowls', 'Kitchen', 'Medium', 50.00, 1, 'Set of various sizes'),
    ('Baking Sheets', 'Kitchen', 'Medium', 60.00, 2, ''),
    ('Coffee Maker', 'Kitchen', 'Medium', 150.00, 1, ''),
    ('Toaster', 'Kitchen', 'Low', 80.00, 1, ''),
    ('Blender', 'Kitchen', 'Medium', 120.00, 1, ''),
    ('Kitchen Utensils', 'Kitchen', 'High', 80.00, 1, 'Spatulas, ladles, etc.'),
    ('Food Storage Containers', 'Kitchen', 'Medium', 60.00, 1, 'Various sizes'),
    ('Trash Can', 'Kitchen', 'High', 50.00, 1, 'With lid'),
    
    -- Living Room items
    ('Sofa', 'Living Room', 'High', 1500.00, 1, '3-seater'),
    ('Coffee Table', 'Living Room', 'Medium', 300.00, 1, ''),
    ('TV Stand', 'Living Room', 'Medium', 250.00, 1, ''),
    ('Television', 'Living Room', 'Medium', 800.00, 1, 'Smart TV'),
    ('Armchair', 'Living Room', 'Low', 400.00, 2, ''),
    ('Side Table', 'Living Room', 'Low', 150.00, 2, ''),
    ('Floor Lamp', 'Living Room', 'Medium', 100.00, 1, ''),
    ('Table Lamp', 'Living Room', 'Low', 60.00, 2, ''),
    ('Curtains', 'Living Room', 'Medium', 200.00, 1, 'Blackout or sheer'),
    ('Area Rug', 'Living Room', 'Medium', 300.00, 1, ''),
    ('Bookshelf', 'Living Room', 'Low', 200.00, 1, ''),
    ('Decorative Pillows', 'Living Room', 'Low', 80.00, 4, ''),
    ('Throw Blanket', 'Living Room', 'Low', 50.00, 2, ''),
    
    -- Bedroom items
    ('Bed Frame', 'Bedroom', 'High', 600.00, 1, 'Queen or King size'),
    ('Mattress', 'Bedroom', 'High', 1000.00, 1, 'Memory foam or spring'),
    ('Bedding Set', 'Bedroom', 'High', 150.00, 2, 'Sheets, pillowcases, duvet'),
    ('Pillows', 'Bedroom', 'High', 100.00, 4, ''),
    ('Dresser', 'Bedroom', 'High', 500.00, 1, '6-drawer'),
    ('Nightstands', 'Bedroom', 'Medium', 200.00, 2, ''),
    ('Bedside Lamps', 'Bedroom', 'Medium', 80.00, 2, ''),
    ('Wardrobe/Closet', 'Bedroom', 'High', 700.00, 1, 'If no built-in closet'),
    ('Hangers', 'Bedroom', 'High', 30.00, 30, ''),
    ('Alarm Clock', 'Bedroom', 'Low', 25.00, 1, ''),
    ('Bedroom Curtains', 'Bedroom', 'Medium', 150.00, 1, 'Blackout recommended'),
    ('Full-Length Mirror', 'Bedroom', 'Medium', 80.00, 1, ''),
    
    -- Bathroom items
    ('Shower Curtain', 'Bathroom', 'High', 30.00, 1, 'With liner'),
    ('Bath Mat', 'Bathroom', 'High', 25.00, 1, 'Non-slip'),
    ('Towel Set', 'Bathroom', 'High', 100.00, 1, 'Bath, hand, face towels'),
    ('Toilet Brush', 'Bathroom', 'High', 15.00, 1, 'With holder'),
    ('Bathroom Scale', 'Bathroom', 'Low', 40.00, 1, ''),
    ('Trash Can', 'Bathroom', 'High', 20.00, 1, 'Small'),
    ('Soap Dispenser', 'Bathroom', 'Medium', 20.00, 1, ''),
    ('Toothbrush Holder', 'Bathroom', 'Medium', 15.00, 1, ''),
    ('Medicine Cabinet', 'Bathroom', 'Medium', 80.00, 1, 'Wall-mounted'),
    ('Bathroom Mirror', 'Bathroom', 'High', 60.00, 1, ''),
    
    -- Laundry items
    ('Washing Machine', 'Laundry', 'High', 1500.00, 1, 'Front or top load'),
    ('Dryer', 'Laundry', 'Medium', 1200.00, 1, 'Optional'),
    ('Laundry Basket', 'Laundry', 'High', 30.00, 1, ''),
    ('Drying Rack', 'Laundry', 'Medium', 40.00, 1, 'Foldable'),
    ('Iron', 'Laundry', 'Medium', 60.00, 1, 'Steam iron'),
    ('Ironing Board', 'Laundry', 'Medium', 50.00, 1, ''),
    
    -- Dining Room items
    ('Dining Table', 'Dining Room', 'High', 800.00, 1, 'Seats 6-8'),
    ('Dining Chairs', 'Dining Room', 'High', 600.00, 6, ''),
    ('Buffet/Sideboard', 'Dining Room', 'Low', 500.00, 1, 'For storage'),
    ('Chandelier/Light Fixture', 'Dining Room', 'Medium', 200.00, 1, ''),
    
    -- Home Office items
    ('Desk', 'Home Office', 'High', 400.00, 1, ''),
    ('Office Chair', 'Home Office', 'High', 300.00, 1, 'Ergonomic'),
    ('Desk Lamp', 'Home Office', 'Medium', 50.00, 1, ''),
    ('Filing Cabinet', 'Home Office', 'Low', 150.00, 1, ''),
    ('Bookshelf', 'Home Office', 'Medium', 200.00, 1, ''),
    
    -- General/Outdoor items
    ('Vacuum Cleaner', 'General', 'High', 250.00, 1, ''),
    ('Broom and Dustpan', 'General', 'High', 25.00, 1, ''),
    ('Mop and Bucket', 'General', 'High', 40.00, 1, ''),
    ('Cleaning Supplies', 'General', 'High', 80.00, 1, 'All-purpose cleaner, etc.'),
    ('Tool Kit', 'General', 'High', 100.00, 1, 'Basic tools'),
    ('Step Ladder', 'General', 'Medium', 80.00, 1, ''),
    ('Fire Extinguisher', 'General', 'High', 50.00, 1, 'Safety essential'),
    ('First Aid Kit', 'General', 'High', 40.00, 1, '');
  END IF;
END $$;
