'use client';

import React, { useState, useEffect } from 'react';
import ProductCard, { Product } from './ProductCard';
import IntentCaptureModal from './IntentCaptureModal';
import DecisionSummary from './DecisionSummary';
import { logEvent } from '@/lib/analytics';

interface WishlistGridProps {
  initialProducts: Product[];
}

export default function WishlistGrid({ initialProducts }: WishlistGridProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [userIntent, setUserIntent] = useState<any>(null);

  useEffect(() => {
    logEvent('wishlist_viewed', { total_items: initialProducts.length });
  }, [initialProducts.length]);

  const handleSelectToggle = (id: string) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pId) => pId !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const clearSelection = () => {
    setSelectedProductIds([]);
  };

  const handleHelpMeChoose = () => {
    logEvent('help_me_choose_clicked', { selected_count: selectedProductIds.length });
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (intentData: any) => {
    setIsAnalyzing(true);
    setUserIntent(intentData);
    logEvent('use_case_selected', intentData);
    
    // Get full product objects for the selected IDs
    const selectedProducts = initialProducts.filter(p => selectedProductIds.includes(p.id));

    try {
      const response = await fetch('/api/copilot/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: selectedProducts,
          intent: intentData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze');
      }

      const result = await response.json();
      console.log('Groq Analysis Result:', result);
      setAnalysisResult(result);
      setIsModalOpen(false);
      logEvent('comparison_viewed', { best_match: result.best_match, product_count: selectedProducts.length });
      
    } catch (error) {
      console.error(error);
      alert('Error connecting to Copilot API.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResetAnalysis = () => {
    setAnalysisResult(null);
    setUserIntent(null);
  };

  const selectedProductsForModal = initialProducts.filter(p => selectedProductIds.includes(p.id));

  if (analysisResult) {
    return (
      <DecisionSummary 
        analysisResult={analysisResult} 
        selectedProducts={selectedProductsForModal} 
        intent={userIntent} 
        onReset={handleResetAnalysis}
      />
    );
  }

  return (
    <div className="flex flex-col w-full relative animate-in fade-in">
      {/* Subtle Ambient Glow Element */}
      <div className="relative w-full max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter-desktop pt-space-xl pb-space-4xl">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-surface-container-high/60 rounded-full blur-2xl pointer-events-none -z-10"></div>
        
        {/* Editorial Curation Header Area */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg pb-space-xl">
          <div className="space-y-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs font-label-caps text-[11px] uppercase text-secondary tracking-widest font-bold">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
              Curated Private Suite
            </div>
            <div className="flex flex-wrap items-baseline gap-space-md">
              <h1 className="font-headline-xl text-[36px] text-on-surface tracking-tight font-semibold">My Wishlist</h1>
              <span className="font-body-md text-[14px] text-on-surface-variant font-light">
                ({initialProducts.length} items saved <span className="mx-space-2xs text-outline-variant">•</span> <span className="text-secondary font-headline-sm text-[16px] font-bold">{selectedProductIds.length}</span> selected for comparison)
              </span>
            </div>
            <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed pt-space-3xs">
              Select up to 3 silhouettes to run an automated comparative appraisal on drape, occasion versatility, and fabric density with Atelier Copilot.
            </p>
          </div>
          
          {/* Quick Action Controls */}
          <div className="flex items-center gap-space-xs shrink-0 self-start md:self-end">
            <button 
              onClick={clearSelection}
              type="button" 
              className="px-space-md py-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-[11px] uppercase font-bold rounded-lg transition-all flex items-center gap-space-2xs border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[16px] text-outline">deselect</span>
              Reset Selection
            </button>
            <button type="button" className="px-space-md py-space-xs bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-[11px] uppercase font-bold rounded-lg transition-all flex items-center gap-space-2xs shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Sort & Filter
            </button>
          </div>
        </header>

        {/* Curated Filter Chips Navigation */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-lg no-scrollbar">
          <button type="button" className="px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-md text-[13px] font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm">
            All Pieces ({initialProducts.length})
          </button>
        </div>

        {/* Notification Bar */}
        {selectedProductIds.length > 0 && (
          <div className="mb-space-xl p-space-md bg-surface-container-low border border-outline-variant/20 rounded-xl flex items-center justify-between gap-space-md animate-in slide-in-from-top-4">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="font-body-sm text-[12px] text-on-surface">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface mr-1">Atelier Copilot Active:</span> 
                You have chosen {selectedProductIds.length} styles ready for parallel silhouette appraisal.
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-space-3xs font-label-caps text-[11px] uppercase font-bold text-secondary">
              <span>Slot Capacity: {selectedProductIds.length}/3 filled</span>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg lg:gap-space-xl">
          {initialProducts.map((product) => {
            const isSelected = selectedProductIds.includes(product.id);
            const selectionIndex = selectedProductIds.indexOf(product.id) + 1;
            
            return (
              <ProductCard 
                key={product.id}
                product={product}
                isSelected={isSelected}
                onSelectToggle={handleSelectToggle}
                selectionIndex={selectionIndex}
              />
            );
          })}
        </section>

        {/* Help Me Choose CTA */}
        {selectedProductIds.length >= 2 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8">
            <button 
              onClick={handleHelpMeChoose}
              className="bg-primary text-on-primary hover:bg-surface-container-high hover:text-on-surface px-6 py-4 rounded-full shadow-xl flex items-center gap-3 transition-all transform hover:scale-105 border border-outline/20"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="uppercase font-label-md tracking-wider font-bold">Help me choose</span>
              <span className="bg-secondary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2 font-bold">
                {selectedProductIds.length}
              </span>
            </button>
          </div>
        )}
      </div>

      <IntentCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedProducts={selectedProductsForModal}
        onSubmit={handleModalSubmit}
        isLoading={isAnalyzing}
      />
    </div>
  );
}
