import React from 'react';

export interface Product {
  id: string;
  product_name: string;
  brand: string;
  price: number;
  rating: number;
  review_count: number;
  image_url: string;
  occasion_tags: string[];
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelectToggle: (id: string) => void;
  selectionIndex?: number; // 1, 2, or 3 if selected
}

export default function ProductCard({ product, isSelected, onSelectToggle, selectionIndex }: ProductCardProps) {
  // Format price as Indian Rupees
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="group relative flex flex-col bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-outline-variant/30">
      {/* Visual & Badges */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-surface-container-high">
        <img 
          src={product.image_url || 'https://picsum.photos/seed/placeholder/400/600'} 
          alt={product.product_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Editorial Label (using first occasion tag or category) */}
        {product.occasion_tags && product.occasion_tags.length > 0 && (
          <div className="absolute top-space-sm left-space-sm bg-primary/90 backdrop-blur-md px-space-xs py-space-3xs rounded text-on-primary font-label-caps text-[10px] uppercase font-semibold">
            {product.occasion_tags[0]}
          </div>
        )}
        
        {/* Wishlist Heart Action (Filled) */}
        <button 
          type="button" 
          aria-label="Remove from wishlist" 
          className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-secondary shadow-sm hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </button>
        
        {/* Selection Checkbox Badge Floating Bottom-Left */}
        <div className="absolute bottom-space-sm left-space-sm">
          <label className="flex items-center gap-space-2xs cursor-pointer select-none bg-surface-container-lowest/95 backdrop-blur-md py-space-2xs px-space-xs rounded-lg shadow-sm">
            <input 
              type="checkbox" 
              className="item-checkbox w-4 h-4 accent-primary rounded cursor-pointer"
              checked={isSelected}
              onChange={() => onSelectToggle(product.id)}
            />
            <span className={`font-label-sm text-[11px] uppercase ${isSelected ? 'font-semibold text-on-surface' : 'font-normal text-on-surface-variant'}`}>
              {isSelected ? `Compare (${selectionIndex} of 3)` : 'Select to Compare'}
            </span>
          </label>
        </div>
      </div>
      
      {/* Meta Content */}
      <div className="pt-space-md pb-space-2xs flex flex-col flex-1 justify-between gap-space-xs">
        <div>
          <div className="flex items-center justify-between text-outline font-label-caps text-[11px] uppercase tracking-wider font-semibold">
            <span>{product.brand}</span>
            <div className="flex items-center gap-space-3xs text-on-surface">
              <span className="material-symbols-outlined text-[15px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label-sm text-[12px] font-semibold">{product.rating}</span>
              <span className="text-on-surface-variant text-[11px]">({product.review_count})</span>
            </div>
          </div>
          <h3 className="font-headline-sm text-[15px] leading-tight text-on-surface mt-space-3xs group-hover:text-secondary transition-colors font-medium">
            {product.product_name}
          </h3>
        </div>
        
        <div className="flex items-baseline justify-between pt-space-2xs">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-md text-[18px] text-on-surface font-semibold">{formattedPrice}</span>
          </div>
        </div>
        
        <div className="pt-space-xs flex items-center gap-space-xs">
          <button type="button" className="flex-1 py-space-xs px-space-sm bg-primary text-on-primary font-label-caps text-[11px] uppercase font-semibold rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-all text-center">
            Add To Bag
          </button>
          <button type="button" aria-label="Quick overview" className="p-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg transition-all border border-outline-variant/30">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </button>
        </div>
      </div>
    </article>
  );
}
