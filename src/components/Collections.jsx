import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Dummy dataset of products inside BlackSkin
const blackSkinProducts = [
  {
    id: "licra_compresion_m",
    name: "Licra Compresión BlackSkin Elite (H)",
    price: 49.99,
    gender: "Hombre",
    description: "Fibra de compresión de alta elasticidad con absorción de humedad optimizada y costuras flatlock anti-roce.",
    specs: ["Compresión: 25 mmHg", "Fibra: 85% Poliéster, 15% Elastano", "Corte: Ergonómico deportivo"]
  },
  {
    id: "playera_manga_larga_m",
    name: "Playera Manga Larga BlackSkin (H)",
    price: 39.99,
    gender: "Hombre",
    description: "Playera de compresión de manga larga ultra-ajustada diseñada para potenciar la oxigenación muscular y el rendimiento deportivo.",
    specs: ["Diseño: Manga larga ergonómico", "Fibra: 85% Poliamida, 15% Elastano", "Compresión: 22 mmHg"]
  },
  {
    id: "shorts_compresion_m",
    name: "Shorts Compresión BlackSkin (H)",
    price: 29.99,
    gender: "Hombre",
    description: "Shorts de compresión (half tights) para entrenamientos de alto rendimiento. Soporte muscular focalizado que reduce la fatiga en cuádriceps y femorales.",
    specs: ["Compresión: 20 mmHg", "Fibra: 85% Poliéster, 15% Elastano", "Largo: Medio muslo (Half Tights)"]
  },
  {
    id: "licra_asimetrica_m",
    name: "Licra Asimétrica BlackSkin Elite (H)",
    price: 49.99,
    gender: "Hombre",
    description: "Licra de compresión de alto rendimiento con diseño asimétrico: una pierna larga hasta el tobillo y la otra corta hasta el muslo. Soporte muscular localizado para atletas de alto nivel.",
    specs: ["Diseño: Asimétrico (Pierna larga y corta)", "Fibra: 85% Poliamida, 15% Elastano", "Compresión: 25 mmHg"]
  },
  {
    id: "playera_asimetrica_m",
    name: "Playera Asimétrica BlackSkin (H)",
    price: 44.99,
    gender: "Hombre",
    description: "Playera de compresión con diseño asimétrico de manga larga en un brazo y sin manga en el otro. Soporte muscular focalizado y máxima movilidad.",
    specs: ["Diseño: Asimétrico de alto rendimiento", "Fibra: 88% Poliamida, 12% Elastano", "Compresión: 22 mmHg"]
  },
  {
    id: "playera_asimetrica_corta_m",
    name: "Playera Asimétrica Manga Corta BlackSkin (H)",
    price: 39.99,
    gender: "Hombre",
    description: "Playera de compresión con diseño asimétrico: manga corta en el brazo izquierdo y sin manga en el derecho. Soporte muscular ergonómico y movilidad optimizada.",
    specs: ["Diseño: Asimétrico (Manga corta y sin manga)", "Fibra: 87% Poliamida, 13% Elastano", "Compresión: 22 mmHg"]
  }, {
    id: "playera_manga_corta_m",
    name: "Playera Manga Corta BlackSkin (H)",
    price: 34.99,
    gender: "Hombre",
    description: "Playera de compresión manga corta de alto rendimiento. Fibras elásticas ultra transpirables para entrenamientos de alta intensidad.",
    specs: ["Diseño: Manga corta ergonómico", "Fibra: 85% Poliamida, 15% Elastano", "Compresión: 20 mmHg"]
  },
  {
    id: "playera_sin_manga_m",
    name: "Playera Sin Manga BlackSkin (H)",
    price: 29.99,
    gender: "Hombre",
    description: "Playera de compresión sin mangas de alto rendimiento. Diseñada para ofrecer máxima libertad de movimiento y óptima regulación de temperatura.",
    specs: ["Diseño: Sin mangas ergonómico", "Fibra: 85% Poliamida, 15% Elastano", "Compresión: 18 mmHg"]
  },
  {
    id: "playera_manga_larga_f",
    name: "Playera Manga Larga BlackSkin (M)",
    price: 39.99,
    gender: "Mujer",
    description: "Playera de compresión de manga larga para mujer. Diseñada con un ajuste ergonómico que moldea y brinda soporte muscular óptimo durante entrenamientos intensos.",
    specs: ["Diseño: Manga larga ergonómico", "Fibra: 85% Poliamida, 15% Elastano", "Compresión: 20 mmHg"]
  },
  {
    id: "playera_asimetrica_f",
    name: "Playera Asimétrica BlackSkin (M)",
    price: 44.99,
    gender: "Mujer",
    description: "Playera de compresión para mujer con diseño asimétrico: manga larga en un brazo y sin manga en el otro. Ofrece un soporte muscular diferencial y una estética innovadora y dinámica.",
    specs: ["Diseño: Asimétrico de alto rendimiento", "Fibra: 85% Poliamida, 15% Elastano", "Compresión: 20 mmHg"]
  },
  {
    id: "playera_manga_corta_f",
    name: "Playera Manga Corta BlackSkin (M)",
    price: 34.99,
    gender: "Mujer",
    description: "Playera de compresión de manga corta para mujer. Estructura ligera y transpirable que brinda máxima libertad y un ajuste estilizado segunda piel.",
    specs: ["Diseño: Manga corta ergonómico", "Fibra: 85% Poliamida, 15% Elastano", "Compresión: 18 mmHg"]
  },
  {
    id: "playera_asimetrica_corta_f",
    name: "Playera Asimétrica Manga Corta BlackSkin (M)",
    price: 39.99,
    gender: "Mujer",
    description: "Playera de compresión para mujer con diseño asimétrico: manga corta en el brazo izquierdo y sin manga en el derecho. Estilo vanguardista con soporte muscular óptimo.",
    specs: ["Diseño: Asimétrico (Manga corta y sin manga)", "Fibra: 85% Poliamida, 15% Elastano", "Compresión: 20 mmHg"]
  },
  {
    id: "licra_compresion_f",
    name: "Licra Compresión BlackSkin Elite (M)",
    price: 49.99,
    gender: "Mujer",
    description: "Licra de compresión de alta elasticidad para mujer. Diseñada con un corte ergonómico que ofrece refuerzo abdominal y soporte lumbar activo durante tus rutinas.",
    specs: ["Compresión: 25 mmHg", "Fibra: 80% Poliamida, 20% Elastano", "Corte: Ergonómico con soporte lumbar"]
  },
  {
    id: "licra_asimetrica_f",
    name: "Licra Asimétrica BlackSkin Elite (M)",
    price: 49.99,
    gender: "Mujer",
    description: "Licra de compresión para mujer con diseño asimétrico: una pierna larga y la otra corta. Proporciona soporte muscular focalizado y máxima comodidad en cada entrenamiento.",
    specs: ["Diseño: Asimétrico (Pierna larga y corta)", "Fibra: 80% Poliamida, 20% Elastano", "Compresión: 25 mmHg"]
  },
  {
    id: "shorts_compresion_f",
    name: "Shorts Compresión BlackSkin (M)",
    price: 29.99,
    gender: "Mujer",
    description: "Shorts de compresión para mujer diseñados para entrenamientos de alto rendimiento. Ofrecen soporte en cuádriceps y un ajuste moldeador cómodo.",
    specs: ["Compresión: 20 mmHg", "Fibra: 85% Poliéster, 15% Elastano", "Largo: Corto deportivo (Half Tights)"]
  }
];

export default function Collections({ initialCollection = null, onSelectProduct }) {
  const [activeCollection, setActiveCollection] = useState(initialCollection);
  const [genderFilter, setGenderFilter] = useState('Hombre');

  useEffect(() => {
    if (initialCollection) {
      setActiveCollection(initialCollection);
    }
  }, [initialCollection]);

  const filteredProducts = blackSkinProducts.filter(p => p.gender === genderFilter);

  // If no active collection is selected, render the catalog list
  if (!activeCollection) {
    return (
      <div className="py-12 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-slate-100 text-left border-l-4 border-black dark:border-white pl-4 mb-8">
          NUESTRAS COLECCIONES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BlackSkin Collection Card */}
          <div
            onClick={() => setActiveCollection('blackskin')}
            className="group relative h-[350px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-black hover:border-black/50 dark:hover:border-white/50 cursor-pointer shadow-lg hover:shadow-white/5 transition-all duration-500"
          >
            {/* Dark mesh background overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-100/90 via-slate-50/40 to-transparent dark:from-black dark:via-black/60 dark:to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent)] z-0" />

            {/* Decorative holographic line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-black to-neutral-400 dark:from-white dark:to-neutral-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              <span className="text-[10px] font-extrabold text-slate-500 dark:text-white tracking-widest uppercase mb-2">
                INSIGNIA // TECNOLOGÍA
              </span>
              <h3 className="font-heading font-extrabold text-4xl text-slate-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                BlackSkin
              </h3>
              <p className="text-slate-650 dark:text-slate-400 text-sm mt-3 max-w-md font-light leading-relaxed">
                Licras de compresión de alto nivel. La combinación perfecta de microfibra elástica and soporte técnico que actúan como una segunda piel.
              </p>
              <div className="mt-6 flex items-center gap-2 text-black dark:text-white font-bold text-xs tracking-wider">
                EXPLORAR COLECCIÓN &rarr;
              </div>
            </div>
          </div>

          {/* CoreFit Collection Card */}
          <div className="relative h-[350px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-900 bg-slate-100 dark:bg-black p-8 flex flex-col justify-end opacity-70">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-100/90 via-slate-50/40 to-transparent dark:from-black dark:via-black/60 dark:to-transparent z-10" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              <span className="text-[10px] font-extrabold text-slate-500 tracking-widest uppercase mb-2">
                PRÓXIMAMENTE
              </span>
              <h3 className="font-heading font-extrabold text-4xl text-slate-900 dark:text-slate-400">
                CoreFit Tech
              </h3>
              <p className="text-slate-650 dark:text-slate-500 text-sm mt-3 max-w-md font-light leading-relaxed">
                Prendas holgadas con tecnología repelente al sudor y costuras ergonómicas para entrenamiento diario de alta intensidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render "BlackSkin" Collection Detail Section
  return (
    <div className="py-12 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => setActiveCollection(null)}
        className="text-xs text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white mb-6 flex items-center gap-2 cursor-pointer transition-colors"
      >
        &larr; VOLVER A COLECCIONES
      </button>

      {/* Concept Header */}
      <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-2xl text-left">
          <span className="px-2.5 py-0.5 text-[9px] font-extrabold tracking-widest text-black dark:text-white bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded">
            COLECCIÓN ACTIVA
          </span>
          <h2 className="font-heading font-extrabold text-4xl text-slate-900 dark:text-white mt-3">
            Colección BlackSkin
          </h2>
          <p className="text-slate-650 dark:text-slate-400 text-sm mt-3 font-light leading-relaxed">
            BlackSkin es nuestra línea insignia de licras de alto rendimiento. Tejidos ultra elásticos y transpirables que se sienten como una segunda piel (Second Skin). Diseñados para proteger y potenciar cada movimiento muscular.
          </p>
        </div>
        <div className="px-5 py-4 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 min-w-[200px] text-left">
          <div className="text-[10px] text-slate-500 font-bold uppercase">TECNOLOGÍA</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">BIO-STRETCH COMPRESSION</div>
          <div className="text-xs text-black dark:text-white font-semibold mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-ping" />
            MATERIAL PREMIUM
          </div>
        </div>
      </div>

      {/* Secondary Navbar: Hombre vs Mujer */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8">
        <button
          onClick={() => setGenderFilter('Hombre')}
          className={`px-8 py-3 font-heading font-bold text-xs tracking-wider cursor-pointer border-b-2 transition-all ${genderFilter === 'Hombre'
            ? 'border-black dark:border-white text-black dark:text-white'
            : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
        >
          HOMBRE
        </button>
        <button
          onClick={() => setGenderFilter('Mujer')}
          className={`px-8 py-3 font-heading font-bold text-xs tracking-wider cursor-pointer border-b-2 transition-all ${genderFilter === 'Mujer'
            ? 'border-black dark:border-white text-black dark:text-white'
            : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
        >
          MUJER
        </button>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
}
