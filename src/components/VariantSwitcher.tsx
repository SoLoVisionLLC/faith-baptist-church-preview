import React from 'react';
import { Layers, Palette } from 'lucide-react';
import { PaletteType } from '../App';

export type VariantType = 'a' | 'b' | 'c' | 'd' | 'e';

interface VariantSwitcherProps {
  activeVariant: VariantType;
  onSelectVariant: (variant: VariantType) => void;
  colorPalette: PaletteType;
  onTogglePalette: (palette: PaletteType) => void;
}

export const VariantSwitcher: React.FC<VariantSwitcherProps> = ({
  activeVariant,
  onSelectVariant,
  colorPalette,
  onTogglePalette
}) => {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 md:right-6 z-40 animate-slideUp">
      <div className="bg-slate-950/95 backdrop-blur-md text-white border border-slate-700/80 rounded-full shadow-2xl p-1.5 flex items-center gap-1 ring-1 ring-white/10">
        {/* Variant Controls */}
        <div className="hidden sm:flex items-center gap-1 pl-2.5 pr-1 text-xs font-semibold text-slate-300">
          <Layers className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Variant:</span>
        </div>

        <button
          onClick={() => onSelectVariant('a')}
          className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${
            activeVariant === 'a'
              ? 'bg-brand-crimson text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Variant A: Classic Authority / Heritage & Warmth"
        >
          A <span className="hidden xl:inline font-normal opacity-80">(Heritage)</span>
        </button>

        <button
          onClick={() => onSelectVariant('b')}
          className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${
            activeVariant === 'b'
              ? 'bg-brand-crimson text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Variant B: Modern Conversion-First / Interactive Visitor Guide"
        >
          B <span className="hidden xl:inline font-normal opacity-80">(Guide)</span>
        </button>

        <button
          onClick={() => onSelectVariant('c')}
          className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${
            activeVariant === 'c'
              ? 'bg-brand-crimson text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Variant C: Rooted & Rising (Bold Editorial & High-Craft)"
        >
          C <span className="hidden xl:inline font-normal opacity-80">(Editorial)</span>
        </button>

        <button
          onClick={() => onSelectVariant('d')}
          className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${
            activeVariant === 'd'
              ? 'bg-brand-crimson text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Variant D: The Welcoming Family & Ministry Compass"
        >
          D <span className="hidden xl:inline font-normal opacity-80">(Family)</span>
        </button>

        <button
          onClick={() => onSelectVariant('e')}
          className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${
            activeVariant === 'e'
              ? 'bg-brand-crimson text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Variant E: Warm Community Journal & Photojournalistic Scrapbook"
        >
          E <span className="hidden xl:inline font-normal opacity-80">(Journal)</span>
        </button>

        {/* Subtle Divider */}
        <div className="w-px h-5 bg-slate-700 mx-0.5" />

        {/* Palette Controls */}
        <div className="hidden sm:flex items-center gap-1 pl-1 pr-1 text-xs font-semibold text-slate-300">
          <Palette className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Palette:</span>
        </div>

        {/* Americana Option */}
        <button
          onClick={() => onTogglePalette('americana')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
            colorPalette === 'americana'
              ? 'bg-[#B31942] text-white shadow-md ring-1 ring-white/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title="Switch to Classic Americana Crimson & Navy Palette"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#B31942] border border-white/60 inline-block shrink-0" />
          <span className="text-[11px]">Americana</span>
        </button>

        {/* Royal Gold Option */}
        <button
          onClick={() => onTogglePalette('royal-gold')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
            colorPalette === 'royal-gold'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5922C] text-[#021C5E] font-extrabold shadow-md ring-1 ring-white/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title="Switch to Circular Emblem Royal Blue & Imperial Gold Palette"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#F3BE50] border border-[#021C5E] inline-block shrink-0" />
          <span className="text-[11px]">Royal & Gold</span>
        </button>
      </div>
    </div>
  );
};
