import { supabase } from '@/lib/supabase';
import WishlistGrid from '@/components/WishlistGrid';
import { Product } from '@/components/ProductCard';

export const revalidate = 0; // Disable caching for MVP so new products show up immediately

export default async function Home() {
  // Fetch wishlisted products for the mock user
  // (In a real app, you'd get the user_id from auth context)
  const mockUserId = 'a1b2c3d4-e5f6-7890-1234-56789abcdef0';
  
  const { data: wishlistData, error: wishlistError } = await supabase
    .from('wishlists')
    .select(`
      product_id,
      products (
        id,
        product_name,
        brand,
        price,
        rating,
        review_count,
        image_url,
        occasion_tags
      )
    `)
    .eq('user_id', mockUserId);

  if (wishlistError) {
    console.error('Error fetching wishlists:', wishlistError);
  }

  // Extract products from the join
  // Type assertion needed because Supabase returns products as an array or object depending on relation
  // In our schema it's a 1-to-1 join from the perspective of the wishlist item
  const products: Product[] = wishlistData 
    ? wishlistData.map((item: any) => item.products)
    : [];

  return (
    <WishlistGrid initialProducts={products} />
  );
}
