import React, { useState } from 'react';
import { Product } from './ProductCard';
import { logEvent } from '@/lib/analytics';

interface DecisionSummaryProps {
  analysisResult: any;
  selectedProducts: Product[];
  intent: any;
  onReset: () => void;
}

export default function DecisionSummary({ analysisResult, selectedProducts, intent, onReset }: DecisionSummaryProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');

  // Find the best match product
  const bestMatchProduct = selectedProducts.find(p => p.id === analysisResult.best_match) || selectedProducts[0];

  // Helper to format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };
  
  const handleAddToBag = () => {
    logEvent('product_view_clicked', { product_id: bestMatchProduct.id, size: selectedSize, action: 'add_to_bag' });
    alert(`Added ${bestMatchProduct.product_name} (Size: ${selectedSize}) to bag!`);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-120px)] animate-in fade-in duration-500">
      {/* Top Progress & Context Navigation Bar */}
      <div className="w-full bg-surface-container-low py-space-md">
        <div className="max-w-[1320px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <button onClick={onReset} className="inline-flex items-center gap-space-2xs text-on-surface-variant hover:text-primary transition-colors font-label-md text-[13px]">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Curated Wishlist</span>
            </button>
            <span className="text-outline-variant font-light text-[12px]">|</span>
            <div className="inline-flex items-center gap-space-2xs bg-secondary-fixed text-on-secondary-fixed px-space-sm py-space-3xs rounded-full font-label-caps text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span>Evaluated for {intent.occasion || 'Your Occasion'}</span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-[11px]">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            <span>Synthesised across Atelier Copilot Intelligence</span>
          </div>
        </div>
      </div>

      {/* Editorial Head Section */}
      <section className="max-w-[1320px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop pt-space-2xl pb-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="max-w-3xl space-y-space-xs">
            <div className="font-label-caps text-[11px] uppercase tracking-[0.16em] text-secondary flex items-center gap-space-2xs font-bold">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>Haute Concierge Intelligence</span>
            </div>
            <h1 className="font-headline-xl text-[36px] text-on-surface tracking-tight font-semibold">
              Copilot Decision Summary
            </h1>
            <p className="font-body-lg text-[16px] text-on-surface-variant">
              Comprehensive synthesis of {selectedProducts.length} shortlisted silhouettes cross-referenced against your {intent.occasion ? intent.occasion.toLowerCase() : 'specific'} profile parameters.
            </p>
          </div>
          {/* Metrics Pill Matrix */}
          <div className="flex items-center gap-space-md p-space-sm bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30">
            <div className="text-right px-space-xs">
              <div className="font-headline-md text-[20px] font-bold text-on-surface">{analysisResult.confidence}</div>
              <div className="font-label-caps text-[11px] font-bold uppercase text-outline">Confidence Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Curated Best Match Card */}
      <section className="max-w-[1320px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop mb-space-3xl">
        <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden relative border border-outline-variant/30">
          
          <div className="bg-surface-container-low border-b border-outline-variant/30 px-space-lg py-space-xs flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="px-space-sm py-space-3xs bg-secondary-fixed text-on-secondary-fixed rounded font-label-caps text-[11px] font-bold flex items-center gap-space-3xs uppercase">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                HIGHEST AFFINITY MATCH
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant hidden sm:inline">Ranked #1 by Copilot Matrix</span>
            </div>
            <div className="font-label-caps text-[11px] text-outline uppercase tracking-wider font-bold">SKU: {bestMatchProduct.id.split('-')[0].toUpperCase()}</div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl p-space-lg lg:p-space-2xl items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative group">
              <div className="relative w-full aspect-[3/4] bg-surface-container rounded-lg overflow-hidden shadow-sm border border-outline-variant/20">
                <img src={bestMatchProduct.image_url} alt={bestMatchProduct.product_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-space-xs py-space-3xs rounded font-label-caps text-[11px] font-bold text-on-surface uppercase">
                  SILHOUETTE 01
                </div>
              </div>
            </div>
            
            {/* Analytical Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[11px] font-bold uppercase text-outline tracking-wider">{bestMatchProduct.brand}</span>
                  <div className="flex items-center gap-space-3xs text-secondary font-label-sm text-[11px]">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-headline-sm text-[16px] font-bold text-on-surface">{bestMatchProduct.rating}</span>
                    <span className="text-outline">({bestMatchProduct.review_count} verified)</span>
                  </div>
                </div>
                <h2 className="font-headline-lg text-[24px] font-semibold text-on-surface">
                  {bestMatchProduct.product_name}
                </h2>
                <div className="flex items-baseline gap-space-sm pt-space-3xs">
                  <span className="font-headline-lg text-[24px] text-on-surface font-semibold">{formatPrice(bestMatchProduct.price)}</span>
                </div>
              </div>

              {/* Structured Intelligence Signals */}
              <div className="space-y-space-xs py-space-xs">
                {analysisResult.reasons?.map((reason: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-space-xs p-space-xs rounded-lg bg-surface-container-low transition-colors hover:bg-surface-container border border-outline-variant/20">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">verified_user</span>
                    <div className="space-y-space-3xs">
                      <div className="font-body-md text-[14px] font-medium text-on-surface">{reason}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Matrix & Quick Selector */}
              <div className="space-y-space-sm pt-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-caps text-[11px] font-bold uppercase text-outline">Select Size:</span>
                  <div className="flex items-center gap-space-xs">
                    {['S', 'M', 'L'].map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded text-center font-label-md text-[13px] font-bold shadow-sm transition-colors border ${
                          selectedSize === size 
                            ? 'bg-primary text-on-primary border-primary' 
                            : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border-outline-variant/30'
                        }`}
                        type="button"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-space-xs">
                  <button 
                    onClick={handleAddToBag}
                    className="w-full sm:flex-1 h-12 bg-primary text-on-primary rounded font-label-md text-[13px] font-bold uppercase tracking-wider hover:bg-on-surface-variant transition-all flex items-center justify-center gap-space-xs shadow-sm border border-outline-variant/20" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>Add Selected Size to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Structured Comparison Matrix */}
      <section className="max-w-[1320px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop mb-space-3xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-xs">
          <div>
            <div className="font-label-caps text-[11px] font-bold uppercase tracking-wider text-outline">Comprehensive Tri-Item Audit</div>
            <h3 className="font-headline-lg text-[24px] font-semibold text-on-surface">Shortlist Feature Breakdown</h3>
          </div>
        </div>
        
        {/* Comparative Table Container with Horizontal Scroll */}
        <div className="w-full overflow-x-auto bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30">
          <table className="w-full text-left min-w-[760px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="p-space-md w-1/4 font-label-caps text-[11px] font-bold uppercase text-outline align-bottom">Evaluation Factor</th>
                {selectedProducts.map(p => (
                  <th key={p.id} className={`p-space-md w-1/4 align-top ${p.id === bestMatchProduct.id ? 'bg-surface-container-lowest relative' : ''}`}>
                    {p.id === bestMatchProduct.id && (
                      <div className="inline-flex items-center gap-space-3xs bg-secondary text-on-secondary px-space-xs py-space-3xs rounded-full font-label-caps text-[9px] font-bold uppercase tracking-wider mb-space-xs">
                        <span className="material-symbols-outlined text-[12px]">verified</span> Copilot Pick
                      </div>
                    )}
                    <div className="w-16 h-20 bg-surface-container rounded mb-space-xs overflow-hidden border border-outline-variant/20">
                      <img src={p.image_url} alt={p.product_name} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-label-caps text-[11px] font-bold text-outline uppercase">{p.brand}</div>
                    <div className="font-headline-sm text-[16px] font-medium text-on-surface truncate pr-2" title={p.product_name}>{p.product_name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-md text-[14px] text-on-surface">
              {/* Row: Price */}
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-space-md font-label-caps text-[11px] font-bold uppercase text-outline">Retail Price</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className={`p-space-md font-headline-sm text-[16px] text-on-surface ${p.id === bestMatchProduct.id ? 'bg-surface-container-low/30 font-semibold' : ''}`}>
                    {formatPrice(p.price)}
                  </td>
                ))}
              </tr>
              {/* Row: Occasion Fit (from AI Matrix) */}
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-space-md font-label-caps text-[11px] font-bold uppercase text-outline">Occasion Match</td>
                {selectedProducts.map(p => {
                  const fit = analysisResult.comparison_matrix?.[p.id]?.occasion_fit || 'Medium';
                  return (
                    <td key={p.id} className={`p-space-md ${p.id === bestMatchProduct.id ? 'bg-surface-container-low/30' : ''}`}>
                      <span className={`px-space-xs py-space-3xs rounded-full font-label-caps text-[11px] font-bold inline-block uppercase ${fit.toLowerCase().includes('high') ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        {fit} MATCH
                      </span>
                    </td>
                  );
                })}
              </tr>
              {/* Row: Sizing Confidence (from AI Matrix) */}
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-space-md font-label-caps text-[11px] font-bold uppercase text-outline">Size Confidence</td>
                {selectedProducts.map(p => {
                  const sizeConf = analysisResult.comparison_matrix?.[p.id]?.size_confidence || 'Medium';
                  return (
                    <td key={p.id} className={`p-space-md ${p.id === bestMatchProduct.id ? 'bg-surface-container-low/30' : ''}`}>
                      <div className="font-label-md text-[13px] font-semibold text-on-surface uppercase">{sizeConf}</div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: AI Uncertainty Alert Callout */}
      {analysisResult.uncertainties && analysisResult.uncertainties.length > 0 && (
        <section className="max-w-[1320px] mx-auto w-full px-gutter-mobile lg:px-gutter-desktop mb-space-4xl">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-space-lg shadow-sm">
            <div className="flex flex-col md:flex-row items-start justify-between gap-space-md">
              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">info</span>
                </div>
                <div className="space-y-space-2xs">
                  <div className="font-headline-sm text-[16px] font-bold text-on-surface flex items-center gap-space-xs">
                    <span>One critical consideration before finalizing</span>
                    <span className="px-space-2xs py-space-3xs bg-secondary-fixed text-on-secondary-fixed rounded font-label-caps text-[9px] uppercase tracking-wider">
                      Variance Alert
                    </span>
                  </div>
                  <p className="font-body-md text-[14px] text-on-surface-variant max-w-2xl mt-2">
                    {analysisResult.uncertainties[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
