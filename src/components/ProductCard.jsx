import React from 'react';
import { Eye } from 'lucide-react';

export default function ProductCard({ product, onSelect }) {
  // Default preview image
  const defaultImage = product.id === 'playera_asimetrica_m'
    ? '/assets/black_asym_front.png'
    : product.id === 'playera_asimetrica_corta_m'
    ? '/assets/black_asym_short_front.png'
    : product.id === 'playera_manga_corta_m'
    ? '/assets/black_short_front.png'
    : product.id === 'playera_sin_manga_m'
    ? '/assets/black_tank_front.png'
    : product.id === 'licra_compresion_m'
    ? '/assets/black_tights_front.png'
    : product.id === 'licra_asimetrica_m'
    ? '/assets/black_asym_tights_front.png'
    : product.id === 'shorts_compresion_m'
    ? '/assets/black_shorts_front.png'
    : product.id === 'playera_manga_larga_f'
    ? '/assets/white_female_shirt_front.png'
    : product.id === 'playera_asimetrica_f'
    ? '/assets/white_female_asym_front.png'
    : product.id === 'playera_manga_corta_f'
    ? '/assets/white_female_short_front.png'
    : product.id === 'playera_asimetrica_corta_f'
    ? '/assets/white_female_asym_short_front.png'
    : product.id === 'licra_compresion_f'
    ? '/assets/white_female_tights_front.png'
    : product.id === 'licra_asimetrica_f'
    ? '/assets/white_female_asym_tights_front.png'
    : product.id === 'shorts_compresion_f'
    ? '/assets/white_female_shorts_front.png'
    : (product.gender === 'Hombre' 
        ? '/assets/black_shirt_front.png' 
        : '/assets/white_shirt_front.png');

  return (
    <div 
      onClick={() => onSelect(product)}
      className="group bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/85 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/60 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image area */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4">
        <img 
          src={defaultImage} 
          alt={product.name} 
          className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover overlay badge */}
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-slate-950 px-4 py-2 rounded-lg font-bold text-xs tracking-wider shadow-lg">
            <Eye size={14} />
            VISUALIZADOR
          </span>
        </div>

        {/* Gender Badge */}
        <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold tracking-widest text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded">
          {product.gender.toUpperCase()}
        </span>
      </div>

      {/* Info area */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white transition-colors text-sm md:text-base leading-tight">
            {product.name}
          </h3>
          <span className="font-heading font-extrabold text-slate-900 dark:text-white text-sm md:text-base">
            ${product.price}
          </span>
        </div>

        <p className="text-slate-650 dark:text-slate-400 text-xs line-clamp-2">
          {product.description}
        </p>

        {/* Sizes & Action */}
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/60">
          <div className="flex gap-1">
            {['S', 'M', 'L', 'XL'].map(size => (
              <span 
                key={size} 
                className="w-5 h-5 flex items-center justify-center text-[9px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded bg-slate-100 dark:bg-slate-950/50"
              >
                {size}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-slate-900 dark:text-white font-bold hover:underline flex items-center gap-1 cursor-pointer">
            Personalizar &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
