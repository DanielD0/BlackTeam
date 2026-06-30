import React from 'react';
import { Sun, Moon, ShoppingCart } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isDarkMode, toggleTheme, cartCount, onOpenCart }) {
  return (
    <header className="h-[70px] bg-white/90 dark:bg-black/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 md:px-10 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      {/* Brand logo */}
      <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setActiveTab('home')}>
        <img 
          src={isDarkMode ? 'assets/logo_white.png' : 'assets/logo_black.png'} 
          alt="Black Team Logo" 
          className="h-7 sm:h-10 w-auto object-contain"
          style={{ mixBlendMode: isDarkMode ? 'screen' : 'multiply' }}
        />
      </div>



      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded-full border border-slate-350 dark:border-slate-700/60 hover:border-slate-500 bg-slate-100 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all cursor-pointer"
          title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Cart Count Indicator */}
        <button 
          onClick={onOpenCart}
          className="flex items-center gap-1.5 sm:gap-2 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-700 rounded-lg p-1 sm:p-1.5 px-2 bg-slate-50 dark:bg-slate-900/40"
        >
          <ShoppingCart size={16} className="text-slate-500 dark:text-slate-400" />
          <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Carrito:
          </span>
          <strong className="text-black dark:text-white bg-slate-150 dark:bg-slate-850 px-1.5 sm:px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-xs sm:text-sm">
            {cartCount}
          </strong>
        </button>
      </div>
    </header>
  );
}
