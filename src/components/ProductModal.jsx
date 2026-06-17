import React, { useState, useEffect } from 'react';
import { X, Play, ShieldAlert, Award } from 'lucide-react';

const colors = [
  { name: "Cyber Black", hex: "#121212" },
  { name: "Pure White", hex: "#f8fafc" }
];

const sizes = ["S", "M", "L", "XL"];

// Mockup assets mapping
const mockupAssets = {
  "Cyber Black": {
    front: "assets/black_shirt_front.png",
    back: "assets/black_shirt_back.png",
    right: "assets/black_shirt_right.png",
    filter: "none"
  },
  "Pure White": {
    front: "assets/white_shirt_front.png",
    back: "assets/white_shirt_front.png",
    right: "assets/white_shirt_right.png",
    filter: "none"
  }
};

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(
    product.gender === 'Mujer' ? colors[1] : colors[0]
  );
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeAngle, setActiveAngle] = useState('front'); // 'front', 'back', 'right'
  const [imgOpacity, setImgOpacity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Sync color changes if necessary
  const activeMockup = product.id === 'playera_asimetrica_m'
    ? {
        "Cyber Black": { front: "assets/black_asym_front.png", filter: "none" },
        "Pure White": { front: "assets/white_asym_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'playera_asimetrica_corta_m'
    ? {
        "Cyber Black": { front: "assets/black_asym_short_front.png", filter: "none" },
        "Pure White": { front: "assets/white_asym_short_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'playera_manga_corta_m'
    ? {
        "Cyber Black": { front: "assets/black_short_front.png", filter: "none" },
        "Pure White": { front: "assets/white_short_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'playera_sin_manga_m'
    ? {
        "Cyber Black": { front: "assets/black_tank_front.png", filter: "none" },
        "Pure White": { front: "assets/white_tank_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'licra_compresion_m'
    ? {
        "Cyber Black": { front: "assets/black_tights_front.png", filter: "none" },
        "Pure White": { front: "assets/white_tights_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'licra_asimetrica_m'
    ? {
        "Cyber Black": { front: "assets/black_asym_tights_front.png", filter: "none" },
        "Pure White": { front: "assets/white_asym_tights_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'shorts_compresion_m'
    ? {
        "Cyber Black": { front: "assets/black_shorts_front.png", filter: "none" },
        "Pure White": { front: "assets/white_shorts_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'playera_manga_larga_f'
    ? {
        "Cyber Black": { front: "assets/black_female_shirt_front.png", filter: "none" },
        "Pure White": { front: "assets/white_female_shirt_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'playera_asimetrica_f'
    ? {
        "Cyber Black": { front: "assets/black_female_asym_front.png", filter: "none" },
        "Pure White": { front: "assets/white_female_asym_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'playera_manga_corta_f'
    ? {
        "Cyber Black": { front: "assets/black_female_short_front.png", filter: "none" },
        "Pure White": { front: "assets/white_female_short_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'playera_asimetrica_corta_f'
    ? {
        "Cyber Black": { front: "assets/black_female_asym_short_front.png", filter: "none" },
        "Pure White": { front: "assets/white_female_asym_short_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'licra_compresion_f'
    ? {
        "Cyber Black": { front: "assets/black_female_tights_front.png", filter: "none" },
        "Pure White": { front: "assets/white_female_tights_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'licra_asimetrica_f'
    ? {
        "Cyber Black": { front: "assets/black_female_asym_tights_front.png", filter: "none" },
        "Pure White": { front: "assets/white_female_asym_tights_front.png", filter: "none" }
      }[selectedColor.name]
    : product.id === 'shorts_compresion_f'
    ? {
        "Cyber Black": { front: "assets/black_female_shorts_front.png", filter: "none" },
        "Pure White": { front: "assets/white_female_shorts_front.png", filter: "none" }
      }[selectedColor.name]
    : mockupAssets[selectedColor.name];

  const handleAngleChange = (angle) => {
    setImgOpacity(0);
    setTimeout(() => {
      setActiveAngle(angle);
      setImgOpacity(1);
    }, 150);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start md:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity">
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-columns md:grid-cols-12 min-h-[85vh] md:min-h-0 my-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-slate-200 dark:bg-slate-950/80 border border-slate-350 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white cursor-pointer hover:border-slate-400 dark:hover:border-slate-650 transition-all"
        >
          <X size={18} />
        </button>

        {/* Left Area: Dynamic Visualizer (7 Columns on large screens) */}
        <div className="md:col-span-7 bg-slate-100 dark:bg-slate-950 flex flex-col relative justify-center items-center p-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 h-[350px] sm:h-[420px] md:h-auto md:min-h-[600px] shrink-0 md:shrink">
          <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />

          {/* Technical Corner Elements */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-white pointer-events-none" />
          <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-white pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-white pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-white pointer-events-none" />

          {/* Render Photorealistic Image with Hover Zoom */}
          <div 
            className="w-full h-full flex items-center justify-center relative overflow-hidden md:cursor-zoom-in"
            onMouseEnter={() => {
              if (window.matchMedia('(hover: hover)').matches) {
                setIsZoomed(true);
              }
            }}
            onMouseLeave={() => {
              setIsZoomed(false);
              setZoomPos({ x: 50, y: 50 });
            }}
            onMouseMove={(e) => {
              if (window.matchMedia('(hover: hover)').matches) {
                handleMouseMove(e);
              }
            }}
          >
            <img 
              src={`${activeMockup.front}?v=2`} 
              alt="Mockup"
              style={{ 
                filter: `drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9)) ${activeMockup.filter}`,
                opacity: imgOpacity,
                transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
              }}
              className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-100 ease-out"
            />
          </div>

          {/* HUD Badges overlays */}
          <div className="absolute top-6 left-6 text-[9px] font-heading font-bold text-slate-500 tracking-wider">
            BLACK_TEAM_VISUALIZER // V_0.98
          </div>

          <div className="absolute bottom-6 left-6 flex flex-col gap-1 text-left">
            <span className="px-2 py-0.5 text-[9px] font-heading font-extrabold tracking-widest border rounded w-fit bg-slate-800 border-slate-700 text-white">
              VISTA FOTORREALISTA
            </span>
            <span className="text-[10px] text-slate-500 tracking-wide">
              Costuras y volumen textil real
            </span>
          </div>
        </div>

        {/* Right Area: Catalog Configurator (5 Columns) */}
        <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between text-left gap-6 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-slate-500 dark:text-white uppercase">
              {product.gender} // BLACKSKIN SERIES
            </span>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h2>
            <div className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">
              ${product.price}
            </div>

            <p className="text-slate-650 dark:text-slate-450 text-sm font-light leading-relaxed mt-2">
              {product.description}
            </p>
          </div>

          {/* Configuration Sections */}
          <div className="flex flex-col gap-6">
            {/* Color Picker */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-heading font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Seleccionar Color: <strong className="text-slate-900 dark:text-white ml-1">{selectedColor.name}</strong>
              </span>
              <div className="flex gap-3">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-7 h-7 rounded-full transition-transform cursor-pointer hover:scale-110 border ${
                      selectedColor.name === color.name 
                        ? 'scale-110 border-black dark:border-white ring-2 ring-slate-200 dark:ring-slate-955' 
                        : 'border-slate-300 dark:border-slate-855'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Picker */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-heading font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Seleccionar Talla:
              </span>
              <div className="flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center font-heading font-bold text-xs border rounded-lg transition-all cursor-pointer ${
                      selectedSize === size 
                        ? 'border-black dark:border-white bg-slate-900 dark:bg-slate-800 text-white shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.15)]' 
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Picker */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-heading font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Cantidad:
              </span>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg p-2 w-fit">
                <button 
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center font-bold text-lg text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white rounded border border-transparent hover:border-slate-250 dark:hover:border-slate-850 transition-all cursor-pointer"
                >
                  -
                </button>
                <span className="font-heading font-bold text-slate-900 dark:text-white w-6 text-center select-none">
                  {quantity}
                </span>
                <button 
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-lg text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white rounded border border-transparent hover:border-slate-250 dark:hover:border-slate-850 transition-all cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Product Specs List */}
            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-xl flex flex-col gap-2">
              <span className="text-[10px] font-heading font-bold text-slate-500 dark:text-slate-450 tracking-wider uppercase mb-1">
                Ficha Técnica
              </span>
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center text-xs border-b border-slate-200 dark:border-slate-900/60 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-slate-500 dark:text-slate-400 font-light">{spec.split(':')[0]}</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold">{spec.split(':')[1] || spec}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart button */}
          <button 
            onClick={() => {
              onAddToCart(selectedColor.name, selectedSize, quantity);
              onClose();
            }}
            className="w-full py-4 bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black font-heading font-extrabold text-sm tracking-widest rounded-xl transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
          >
            AÑADIR AL CARRITO
          </button>
        </div>

      </div>
    </div>
  );
}
