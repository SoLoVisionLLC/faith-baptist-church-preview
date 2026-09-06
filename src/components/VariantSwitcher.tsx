import React from 'react';
import { Sparkles, Layers } from 'lucide-react';

export type VariantType = 'a' | 'b' | 'c';

interface VariantSwitcherProps {
  activeVariant: VariantType;
  onSelectVariant: (variant: VariantType) => void;
}

export const VariantSwitcher: React.FC<VariantSwitcherProps> = ({
  activeVariant,
  onSelectVariant
}) => {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 animate-slideUp">
      <div className="bg-slate-900/90 backdrop-blur-md text-white border border-slate-700/80 rounded-full shadow-2xl p-1.5 flex items-center gap-1">
        <div className="hidden sm:flex items-center gap-1.5 pl-3 pr-2 text-xs font-semibold text-slate-300">
          <Layers className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[11px] uppercase tracking-wider text-slate-400">Variant:</span>
        </div>

        <button
          onClick={() => onSelectVariant('a')}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
            activeVariant === 'a'
              ? 'bg-brand-crimson text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Variant A: Classic Authority / Heritage & Warmth"
        >
          A <span className="hidden md:inline font-normal opacity-80">(Heritage)</span>
        </button>

        <button
          onClick={() => onSelectVariant('b')}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
            activeVariant === 'b'
              ? 'bg-brand-crimson text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Variant B: Modern Conversion-First / Interactive Visitor Guide"
        >
          B <span className="hidden md:inline font-normal opacity-80">(Visitor Guide)</span>
        </button>

        <button
          onClick={() => onSelectVariant('c')}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
            activeVariant === 'c'
              ? 'bg-brand-crimson text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Variant C: Rooted & Rising (Bold Editorial & High-Craft)"
        >
          C <span className="hidden md:inline font-normal opacity-80">(Rooted & Rising)</span>
        </button>
      </div>
    </div>
  );
};
