-- Clear existing data
TRUNCATE TABLE public.products CASCADE;

-- Insert New High-Quality Products with more categories
INSERT INTO public.products (id, product_name, brand, category, price, rating, review_count, available_sizes, material, colour, occasion_tags, product_description, review_highlights, image_url) VALUES
-- Dresses
('d1000000-0000-0000-0000-000000000001', 'Floral A-Line Midi Dress', 'Anouk', 'Dresses', 1499, 4.4, 1200, ARRAY['S', 'M', 'L', 'XL'], 'Cotton', 'Blue', ARRAY['Vacation', 'Everyday'], 'A comfortable and breezy floral midi dress perfect for summer getaways.', 'Great fit for vacation, breathable fabric, true to size.', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80'),
('d1000000-0000-0000-0000-000000000002', 'Embellished Maxi Party Dress', 'Berrylush', 'Dresses', 1799, 4.2, 780, ARRAY['XS', 'S', 'M'], 'Polyester', 'Black', ARRAY['Party', 'Wedding'], 'Stunning embellished black maxi dress designed for evening parties.', 'Looks very premium, slightly tight around the waist.', 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=400&q=80'),
('d1000000-0000-0000-0000-000000000003', 'Solid Wrap Dress', 'Tokyo Talkies', 'Dresses', 1299, 4.1, 540, ARRAY['M', 'L', 'XL'], 'Viscose Rayon', 'Maroon', ARRAY['Office', 'Everyday'], 'Elegant wrap dress suitable for work or casual outings.', 'Good for office wear, fabric is soft but slightly thin.', 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=400&q=80'),

-- Footwear
('f1000000-0000-0000-0000-000000000001', 'Classic White Sneakers', 'Puma', 'Footwear', 2499, 4.6, 3400, ARRAY['6', '7', '8', '9', '10'], 'Synthetic Leather', 'White', ARRAY['Everyday', 'Vacation'], 'Classic white sneakers that go with any casual outfit.', 'Very comfortable, easy to clean, highly recommended.', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80'),
('f1000000-0000-0000-0000-000000000002', 'Running Training Shoes', 'Nike', 'Footwear', 3999, 4.5, 2100, ARRAY['7', '8', '9', '11'], 'Mesh', 'Grey', ARRAY['Fitness', 'Everyday'], 'Lightweight training shoes offering excellent grip and cushioning.', 'Great for running and gym, perfect fit.', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80'),
('f1000000-0000-0000-0000-000000000003', 'Leather Formal Oxfords', 'Hush Puppies', 'Footwear', 4500, 4.7, 850, ARRAY['8', '9', '10', '11'], 'Genuine Leather', 'Brown', ARRAY['Office', 'Wedding'], 'Premium leather formal oxfords for sharp tailoring.', 'Excellent build quality, needs break-in time.', 'https://images.unsplash.com/photo-1614252339460-e1d9774640d2?auto=format&fit=crop&w=400&q=80'),

-- Shirts & Tops
('s1000000-0000-0000-0000-000000000001', 'Men Slim Fit Checked Shirt', 'Roadster', 'Shirts', 899, 4.0, 1500, ARRAY['S', 'M', 'L', 'XXL'], 'Cotton', 'Navy Blue', ARRAY['Office', 'Everyday'], 'Casual checked shirt with a slim fit.', 'Good for daily wear, colours fade slightly after 10 washes.', 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&w=400&q=80'),
('s1000000-0000-0000-0000-000000000002', 'Oversized Graphic T-Shirt', 'The Souled Store', 'T-Shirts', 799, 4.5, 3100, ARRAY['M', 'L', 'XL', 'XXL'], 'Cotton', 'White', ARRAY['Everyday', 'Vacation'], 'Comfortable oversized t-shirt with a vintage graphic print.', 'Super comfy, print quality is awesome.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80'),
('s1000000-0000-0000-0000-000000000003', 'Women Satin Silk Blouse', 'Mango', 'Tops', 1899, 4.3, 620, ARRAY['S', 'M', 'L'], 'Satin', 'Emerald Green', ARRAY['Party', 'Office'], 'Luxurious emerald green satin blouse.', 'Very soft against the skin, luxurious feel.', 'https://images.unsplash.com/photo-1604135541604-e5e7df244d34?auto=format&fit=crop&w=400&q=80'),

-- Ethnic Wear
('e1000000-0000-0000-0000-000000000001', 'Women Silk Blend Saree', 'Mitera', 'Ethnic Wear', 3499, 4.7, 850, ARRAY['Free Size'], 'Silk Blend', 'Green', ARRAY['Wedding', 'Party'], 'Traditional silk blend saree with intricate zari borders.', 'Beautiful saree, looks exactly like the picture, perfect for weddings.', 'https://images.unsplash.com/photo-1610189013233-316447cbeaf0?auto=format&fit=crop&w=400&q=80'),
('e1000000-0000-0000-0000-000000000002', 'Men Embroidered Kurta Set', 'Manyavar', 'Ethnic Wear', 4999, 4.6, 920, ARRAY['M', 'L', 'XL'], 'Silk Blend', 'Cream', ARRAY['Wedding', 'Festive'], 'Elegant cream embroidered kurta set for men.', 'Fits perfectly, embroidery is top-notch.', 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=400&q=80'),

-- Suits & Outerwear
('o1000000-0000-0000-0000-000000000001', 'Men Tailored Formal Suit', 'Louis Philippe', 'Suits', 7999, 4.3, 420, ARRAY['38', '40', '42'], 'Wool Blend', 'Charcoal', ARRAY['Wedding', 'Office'], 'Premium charcoal two-piece formal suit.', 'Excellent tailoring, very sharp look for office meetings.', 'https://images.unsplash.com/photo-1594938298596-70f56fb3ce9b?auto=format&fit=crop&w=400&q=80'),
('o1000000-0000-0000-0000-000000000002', 'Denim Trucker Jacket', 'Levi''s', 'Outerwear', 2999, 4.6, 1800, ARRAY['S', 'M', 'L', 'XL'], 'Denim', 'Light Blue', ARRAY['Vacation', 'Party'], 'Classic light blue denim jacket for a rugged look.', 'Timeless style, durable fabric, fits perfectly.', 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=400&q=80'),

-- Bottoms & Activewear
('b1000000-0000-0000-0000-000000000001', 'Active Yoga Leggings', 'H&M', 'Activewear', 1499, 4.4, 2300, ARRAY['XS', 'S', 'M', 'L'], 'Spandex', 'Black', ARRAY['Fitness', 'Everyday'], 'High-waisted stretchable yoga leggings.', 'Squat proof and very comfortable for workouts.', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=400&q=80'),
('b1000000-0000-0000-0000-000000000002', 'Men Slim Fit Chinos', 'Marks & Spencer', 'Bottoms', 2499, 4.5, 950, ARRAY['30', '32', '34', '36'], 'Cotton Stretch', 'Beige', ARRAY['Office', 'Everyday'], 'Versatile beige chinos with a comfortable stretch fit.', 'Great for both office and casual wear.', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80'),

-- Accessories & Watches
('a1000000-0000-0000-0000-000000000001', 'Leather Crossbody Bag', 'Hidesign', 'Handbags', 4599, 4.8, 620, ARRAY['One Size'], 'Genuine Leather', 'Brown', ARRAY['Office', 'Vacation'], 'Premium brown leather crossbody bag with multiple compartments.', 'High quality leather, spacious enough for daily essentials.', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80'),
('a1000000-0000-0000-0000-000000000002', 'Chronograph Men''s Watch', 'Fossil', 'Watches', 8999, 4.7, 1200, ARRAY['One Size'], 'Stainless Steel', 'Silver/Blue', ARRAY['Office', 'Wedding', 'Party'], 'Elegant chronograph watch with a blue dial and silver steel strap.', 'Stunning look, gets lots of compliments.', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80'),
('a1000000-0000-0000-0000-000000000003', 'Aviator Sunglasses', 'Ray-Ban', 'Sunglasses', 5499, 4.9, 3400, ARRAY['Standard'], 'Metal', 'Gold/Green', ARRAY['Vacation', 'Everyday'], 'Classic aviator sunglasses providing 100% UV protection.', 'Iconic style, absolutely love them.', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80');

-- Re-insert mock wishlists for our default test user
INSERT INTO public.wishlists (user_id, product_id) VALUES
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'd1000000-0000-0000-0000-000000000001'), -- Floral Dress
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'f1000000-0000-0000-0000-000000000001'), -- Sneakers
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'f1000000-0000-0000-0000-000000000003'), -- Oxfords
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'a1000000-0000-0000-0000-000000000002'), -- Fossil Watch
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'e1000000-0000-0000-0000-000000000002'), -- Men Kurta
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'a1000000-0000-0000-0000-000000000003'), -- Sunglasses
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 's1000000-0000-0000-0000-000000000003'), -- Satin Blouse
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1000000-0000-0000-0000-000000000001'); -- Yoga Leggings
