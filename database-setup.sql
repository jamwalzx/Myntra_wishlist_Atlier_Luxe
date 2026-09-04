-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    rating NUMERIC NOT NULL,
    review_count INT NOT NULL,
    available_sizes TEXT[] NOT NULL,
    material TEXT,
    colour TEXT,
    occasion_tags TEXT[] NOT NULL,
    product_description TEXT,
    review_highlights TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Wishlists Table
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- using UUID to simulate real users
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, product_id)
);

-- 3. Create Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    event_type TEXT NOT NULL,
    event_data JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Set up Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to products for MVP
CREATE POLICY "Allow public read access on products"
ON public.products FOR SELECT
TO public
USING (true);

-- Allow anonymous read/write access to wishlists for MVP testing
CREATE POLICY "Allow public all access on wishlists"
ON public.wishlists FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Allow anonymous insert access to analytics
CREATE POLICY "Allow public insert to analytics"
ON public.analytics_events FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public select to analytics"
ON public.analytics_events FOR SELECT
TO public
USING (true);


-- 5. Insert Mock Data for Products
INSERT INTO public.products (id, product_name, brand, category, price, rating, review_count, available_sizes, material, colour, occasion_tags, product_description, review_highlights, image_url) VALUES
('b301c238-5182-411a-8c34-eb17c6031231', 'Floral A-Line Midi Dress', 'Anouk', 'Dresses', 1499, 4.4, 1200, ARRAY['S', 'M', 'L', 'XL'], 'Cotton', 'Blue', ARRAY['Vacation', 'Everyday'], 'A comfortable and breezy floral midi dress perfect for summer getaways.', 'Great fit for vacation, breathable fabric, true to size.', 'https://picsum.photos/seed/dress1/400/600'),
('b301c238-5182-411a-8c34-eb17c6031232', 'Embellished Maxi Party Dress', 'Berrylush', 'Dresses', 1799, 4.2, 780, ARRAY['XS', 'S', 'M'], 'Polyester', 'Black', ARRAY['Party', 'Wedding'], 'Stunning embellished black maxi dress designed for evening parties.', 'Looks very premium, slightly tight around the waist.', 'https://picsum.photos/seed/dress2/400/600'),
('b301c238-5182-411a-8c34-eb17c6031233', 'Solid Wrap Dress', 'Tokyo Talkies', 'Dresses', 1299, 4.1, 540, ARRAY['M', 'L', 'XL'], 'Viscose Rayon', 'Maroon', ARRAY['Office', 'Everyday'], 'Elegant wrap dress suitable for work or casual outings.', 'Good for office wear, fabric is soft but slightly thin.', 'https://picsum.photos/seed/dress3/400/600'),
('b301c238-5182-411a-8c34-eb17c6031234', 'Classic White Sneakers', 'Puma', 'Shoes', 2499, 4.6, 3400, ARRAY['6', '7', '8', '9', '10'], 'Synthetic Leather', 'White', ARRAY['Everyday', 'Vacation'], 'Classic white sneakers that go with any casual outfit.', 'Very comfortable, easy to clean, highly recommended.', 'https://picsum.photos/seed/shoe1/400/400'),
('b301c238-5182-411a-8c34-eb17c6031235', 'Running Training Shoes', 'Nike', 'Shoes', 3999, 4.5, 2100, ARRAY['7', '8', '9', '11'], 'Mesh', 'Grey', ARRAY['Fitness', 'Everyday'], 'Lightweight training shoes offering excellent grip and cushioning.', 'Great for running and gym, perfect fit.', 'https://picsum.photos/seed/shoe2/400/400'),
('b301c238-5182-411a-8c34-eb17c6031236', 'Men Slim Fit Checked Shirt', 'Roadster', 'Shirts', 899, 4.0, 1500, ARRAY['S', 'M', 'L', 'XXL'], 'Cotton', 'Navy Blue', ARRAY['Office', 'Everyday'], 'Casual checked shirt with a slim fit.', 'Good for daily wear, colours fade slightly after 10 washes.', 'https://picsum.photos/seed/shirt1/400/600'),
('b301c238-5182-411a-8c34-eb17c6031237', 'Women Silk Blend Saree', 'Mitera', 'Ethnic Wear', 3499, 4.7, 850, ARRAY['Free Size'], 'Silk Blend', 'Green', ARRAY['Wedding', 'Party'], 'Traditional silk blend saree with intricate zari borders.', 'Beautiful saree, looks exactly like the picture, perfect for weddings.', 'https://picsum.photos/seed/saree1/400/600'),
('b301c238-5182-411a-8c34-eb17c6031238', 'Men Tailored Formal Suit', 'Louis Philippe', 'Suits', 7999, 4.3, 420, ARRAY['38', '40', '42'], 'Wool Blend', 'Charcoal', ARRAY['Wedding', 'Office'], 'Premium charcoal two-piece formal suit.', 'Excellent tailoring, very sharp look for office meetings.', 'https://picsum.photos/seed/suit1/400/600'),
('b301c238-5182-411a-8c34-eb17c6031239', 'Active Yoga Leggings', 'H&M', 'Bottoms', 1499, 4.4, 2300, ARRAY['XS', 'S', 'M', 'L'], 'Spandex', 'Black', ARRAY['Fitness', 'Everyday'], 'High-waisted stretchable yoga leggings.', 'Squat proof and very comfortable for workouts.', 'https://picsum.photos/seed/pants1/400/600'),
('b301c238-5182-411a-8c34-eb17c6031240', 'Denim Trucker Jacket', 'Levi''s', 'Outerwear', 2999, 4.6, 1800, ARRAY['S', 'M', 'L', 'XL'], 'Denim', 'Light Blue', ARRAY['Vacation', 'Party'], 'Classic light blue denim jacket for a rugged look.', 'Timeless style, durable fabric, fits perfectly.', 'https://picsum.photos/seed/jacket1/400/600'),
('b301c238-5182-411a-8c34-eb17c6031241', 'Oversized Graphic T-Shirt', 'The Souled Store', 'T-Shirts', 799, 4.5, 3100, ARRAY['M', 'L', 'XL', 'XXL'], 'Cotton', 'White', ARRAY['Everyday', 'Vacation'], 'Comfortable oversized t-shirt with a vintage graphic print.', 'Super comfy, print quality is awesome.', 'https://picsum.photos/seed/tshirt1/400/600'),
('b301c238-5182-411a-8c34-eb17c6031242', 'Leather Crossbody Bag', 'Hidesign', 'Accessories', 4599, 4.8, 620, ARRAY['One Size'], 'Genuine Leather', 'Brown', ARRAY['Office', 'Vacation'], 'Premium brown leather crossbody bag with multiple compartments.', 'High quality leather, spacious enough for daily essentials.', 'https://picsum.photos/seed/bag1/400/400');

-- 6. Insert Mock Data for Wishlists
-- Using a mock user_id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0'
INSERT INTO public.wishlists (user_id, product_id) VALUES
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b301c238-5182-411a-8c34-eb17c6031231'), -- Dress A
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b301c238-5182-411a-8c34-eb17c6031232'), -- Dress B
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b301c238-5182-411a-8c34-eb17c6031233'), -- Dress C
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b301c238-5182-411a-8c34-eb17c6031234'), -- Sneakers
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b301c238-5182-411a-8c34-eb17c6031240'); -- Denim Jacket
