import React, { useState } from 'react';
import { Product } from './ProductCard';

interface IntentCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: Product[];
  onSubmit: (intentData: any) => void;
  isLoading: boolean;
}

const occasionOptions = [
  'Everyday',
  'Office & Editorial',
  'Vacation & Resort',
  'Cocktail Party',
  'Destination Wedding',
  'Art Gala & Opening',
];

export default function IntentCaptureModal({ isOpen, onClose, selectedProducts, onSubmit, isLoading }: IntentCaptureModalProps) {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [customIntent, setCustomIntent] = useState<string>('');
  const [preferences, setPreferences] = useState({
    easeOverStructure: false,
    naturalFibers: false,
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({
      occasion: selectedOccasion,
      customText: customIntent,
      preferences,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-[3px] flex items-end sm:items-center justify-center p-0 sm:p-space-md">
      {/* Intent Capture Modal Sheet */}
      <div className="w-full sm:max-w-lg bg-surface-container-lowest rounded-t-xl sm:rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh] transition-transform animate-in fade-in duration-300 border border-outline-variant/20">
        
        {/* Drag handle indicator for mobile sheet */}
        <div className="sm:hidden w-full pt-space-xs pb-space-2xs flex justify-center items-center">
          <div className="w-10 h-1 rounded-full bg-outline-variant"></div>
        </div>
        
        {/* Sheet Header */}
        <div className="px-space-lg pt-space-md pb-space-sm flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-container font-label-caps text-[11px] uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              <span>Atelier Copilot</span>
            </div>
            <span className="font-body-sm text-[12px] text-outline hidden sm:inline">• Step 1 of 2</span>
          </div>
          <button 
            onClick={onClose}
            aria-label="Dismiss assistance" 
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" 
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        {/* Scrollable Inner Content */}
        <div className="px-space-lg py-space-xs overflow-y-auto flex-1 flex flex-col gap-space-lg">
          
          {/* Curated Context Preview Strip */}
          <div className="p-space-sm bg-surface-container-low border border-outline-variant/30 rounded-lg flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-xs">
              <div className="flex -space-x-2 overflow-hidden py-0.5">
                {selectedProducts.map((p, i) => (
                  <div key={p.id} className="inline-block h-11 w-8 rounded overflow-hidden bg-surface-container shadow-sm border border-outline-variant/20 relative z-[1]">
                    <img className="h-full w-full object-cover" src={p.image_url} alt="product thumb" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-[11px] font-bold text-on-surface tracking-wide uppercase">Comparing {selectedProducts.length} Silhouettes</span>
                <span className="font-body-sm text-[12px] text-outline truncate max-w-[150px]">
                  {selectedProducts.map(p => p.brand).join(' • ')}
                </span>
              </div>
            </div>
            <span onClick={onClose} className="font-label-sm text-[11px] text-secondary uppercase font-semibold cursor-pointer hover:underline">Change</span>
          </div>
          
          {/* Typography Block */}
          <div className="space-y-space-3xs">
            <h2 className="font-headline-lg text-[24px] text-on-surface tracking-tight font-semibold">What are you shopping for?</h2>
            <p className="font-body-md text-[14px] text-on-surface-variant">Help our bespoke styling intelligence understand your occasion, atmosphere, and packing needs.</p>
          </div>
          
          {/* Occasion Tag Pills */}
          <div className="space-y-space-2xs">
            <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider font-semibold">Select Occasion Theme</span>
            <div className="flex flex-wrap gap-space-xs pt-space-3xs">
              {occasionOptions.map(opt => {
                const isActive = selectedOccasion === opt;
                return (
                  <button 
                    key={opt}
                    onClick={() => setSelectedOccasion(isActive ? '' : opt)}
                    className={`px-space-md py-space-xs rounded-full font-label-md text-[13px] transition-colors border ${
                      isActive 
                        ? 'bg-secondary-fixed text-on-secondary-container font-semibold flex items-center gap-1.5 shadow-sm border-secondary/20'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-outline-variant/30'
                    }`} 
                    type="button"
                  >
                    {isActive && <span className="material-symbols-outlined text-[16px] text-secondary">check</span>}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Elegant Middle Divider */}
          <div className="relative flex py-space-3xs items-center">
            <div className="flex-grow h-[1px] bg-outline-variant/60"></div>
            <span className="flex-shrink mx-space-md font-label-caps text-[11px] uppercase tracking-widest text-outline">Or specify in your own words</span>
            <div className="flex-grow h-[1px] bg-outline-variant/60"></div>
          </div>
          
          {/* Text Input Container */}
          <div className="space-y-space-2xs">
            <div className="relative bg-surface-container-low border border-outline-variant/40 rounded-lg p-space-sm transition-all focus-within:bg-surface-container-lowest focus-within:shadow-md focus-within:border-secondary/40">
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5 shrink-0">edit_note</span>
                <textarea 
                  value={customIntent}
                  onChange={(e) => setCustomIntent(e.target.value)}
                  className="w-full bg-transparent font-body-md text-[14px] text-on-surface placeholder:text-outline focus:outline-none resize-none leading-relaxed" 
                  placeholder="Describe climate, travel luggage limits, or style goals..." 
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          {/* Nuance Quick Filters / Toggles */}
          <div className="space-y-space-2xs">
            <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider font-semibold">Specific Preferences</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs pt-space-3xs">
              <label className="flex items-center justify-between p-space-sm border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container rounded-lg cursor-pointer transition-colors">
                <div className="flex flex-col pr-2">
                  <span className="font-label-md text-[13px] font-semibold text-on-surface">Ease over Structure</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">Relaxed silhouette priority</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.easeOverStructure}
                  onChange={(e) => setPreferences(p => ({ ...p, easeOverStructure: e.target.checked }))}
                  className="w-4 h-4 accent-primary rounded cursor-pointer" 
                />
              </label>
              <label className="flex items-center justify-between p-space-sm border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container rounded-lg cursor-pointer transition-colors">
                <div className="flex flex-col pr-2">
                  <span className="font-label-md text-[13px] font-semibold text-on-surface">Natural Fibers</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">Silk, raw linen & cotton only</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.naturalFibers}
                  onChange={(e) => setPreferences(p => ({ ...p, naturalFibers: e.target.checked }))}
                  className="w-4 h-4 accent-primary rounded cursor-pointer" 
                />
              </label>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Sheet Fixed Footer Action Bar */}
        <div className="px-space-lg py-space-md bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between gap-space-md">
          <button 
            onClick={() => { setSelectedOccasion(''); setCustomIntent(''); setPreferences({ easeOverStructure: false, naturalFibers: false }); }}
            className="font-label-md text-[13px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface px-space-xs py-space-xs transition-colors" 
            type="button"
          >
            Reset
          </button>
          <button 
            disabled={isLoading}
            onClick={handleSubmit}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-space-xs bg-primary text-on-primary px-space-lg py-space-sm rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-all shadow-sm group disabled:opacity-50 border border-outline-variant/20"
          >
            <span className="font-label-md text-[13px] uppercase tracking-widest font-semibold">
              {isLoading ? 'Analyzing...' : 'Continue to Recommendation'}
            </span>
            {!isLoading && <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>}
          </button>
        </div>
        
      </div>
    </div>
  );
}
