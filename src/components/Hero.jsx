import React from 'react';
import { ArrowRight, ShieldCheck, Flame, Zap } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  return (
    <div className="relative min-h-[calc(100vh-70px)] flex flex-col items-center justify-center px-6 py-12 text-center bg-white dark:bg-radial dark:from-neutral-950 dark:via-black dark:to-black overflow-hidden transition-colors duration-300">
      {/* Scanline background effect */}
      <div className="absolute inset-0 scanlines opacity-30 dark:opacity-30 opacity-5 pointer-events-none" />

      {/* Decorative cyber grids/glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-200/20 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-slate-200/20 dark:bg-white/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center gap-6">
        <span className="px-3 py-1 text-[11px] font-extrabold tracking-widest text-black dark:text-white bg-slate-200/60 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full font-heading animate-pulse">
          NUEVA COLECCIÓN DE COMPRESIÓN ACTIVA
        </span>

        <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] transition-all duration-300 dark:invert">
          <img 
            src="assets/rendimiento.svg" 
            alt="BT Athletics Logo" 
            className="w-full h-auto object-contain"
          />
        </div>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base md:text-xl font-light leading-relaxed">
          Diseñado por atletas de alto rendimiento para atletas de alto rendimiento.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('collections')}
            className="px-8 py-4 bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black font-bold tracking-wider rounded-lg shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            VER COLECCIONES
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Tech Features Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-16 w-full max-w-3xl">
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-5 rounded-xl flex items-center gap-4 text-left transition-all hover:border-slate-300 dark:hover:border-slate-700/60">
            <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/40 text-black dark:text-white">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">BIO-ELASTICIDAD</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Estiramiento multidireccional activo.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-5 rounded-xl flex items-center gap-4 text-left transition-all hover:border-slate-300 dark:hover:border-slate-700/60">
            <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/40 text-black dark:text-white">
              <Flame size={20} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">TERMOCONTROL</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Disipación de calor y sudor activa.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-5 rounded-xl flex items-center gap-4 text-left transition-all hover:border-slate-300 dark:hover:border-slate-700/60">
            <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/40 text-black dark:text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">COSTURAS FLATLOCK</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Hilos planos sin fricción ni roce.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
