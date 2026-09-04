import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          <Link href="/" className="flex items-center gap-space-xs shrink-0">
            <span className="font-label-caps text-[11px] uppercase text-on-surface tracking-[0.2em] font-bold">ATELIER LUXE</span>
          </Link>
        </div>
        <div className="hidden md:flex flex-1 max-w-md mx-space-md">
          <div className="relative w-full flex items-center bg-surface-container-lowest rounded-lg border border-outline-variant/30">
            <span className="material-symbols-outlined absolute left-space-sm text-outline text-[18px]">search</span>
            <input 
              type="text" 
              className="w-full pl-10 pr-space-md py-space-xs text-[12px] bg-transparent placeholder:text-outline text-on-surface focus:outline-none" 
              placeholder="Search haute couture, designers, collections..." 
            />
          </div>
        </div>
        <div className="flex items-center gap-space-md shrink-0">
          <Link href="/" className="relative flex items-center justify-center p-space-xs text-on-surface hover:text-secondary transition-colors" title="Curated Wishlist">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 bg-secondary text-on-secondary rounded-full font-label-caps text-[9px] flex items-center justify-center leading-none">4</span>
          </Link>
          <Link href="#" className="relative flex items-center justify-center p-space-xs text-on-surface hover:text-on-surface-variant transition-colors" title="Shopping Bag">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 bg-primary text-on-primary rounded-full font-label-caps text-[9px] flex items-center justify-center leading-none">2</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-low border-t border-outline-variant/20">
        <div className="h-10 max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between font-label-sm text-[11px]">
          <nav className="flex items-center gap-space-xs overflow-x-auto py-1">
            <Link href="/" className="uppercase whitespace-nowrap text-secondary font-semibold">Wishlist</Link>
            <span className="text-outline-variant font-light text-[10px]">/</span>
            <Link href="#" className="text-on-surface-variant hover:text-on-surface uppercase whitespace-nowrap">Copilot Assist</Link>
          </nav>
          <div className="hidden sm:flex items-center gap-space-2xs text-secondary font-label-caps text-[11px] uppercase tracking-wider font-bold">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>Luxe Personal Styling Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
