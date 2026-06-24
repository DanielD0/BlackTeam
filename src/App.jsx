import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import { CheckCircle, MessageSquare, Calendar, ShieldCheck, X } from 'lucide-react';

// Configura aquí tu URL de Google Apps Script Web App (ejemplo: https://script.google.com/macros/s/.../exec)
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxMDiTIb5dbRgWjmR8wgzOWpvzDvkLMMHdKiMF60dnwhWh9cd-UMEFLBGJ58DIDX4_2/exec";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null); // null, 'loading', 'success', 'error'
  const [orderInfo, setOrderInfo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Sync dark mode class on html/body element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#000000';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#ffffff';
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddToCart = (color, size, quantity) => {
    if (!selectedProduct) return;
    const newItems = [];
    for (let i = 0; i < quantity; i++) {
      newItems.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        gender: selectedProduct.gender,
        color,
        size,
        quantity: 1
      });
    }
    setCart(prev => [...prev, ...newItems]);
    setShowToast(true);
  };

  const handleRemoveItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async (customerData) => {
    setCheckoutStatus('loading');

    // Si la URL es por defecto, hacemos simulación exitosa de pedido
    if (!GOOGLE_SHEETS_WEBHOOK_URL || GOOGLE_SHEETS_WEBHOOK_URL.includes("YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE")) {
      setTimeout(() => {
        setOrderInfo({ status: "success", orderId: "PED-" + new Date().getTime() });
        setCheckoutStatus('success');
        setCart([]);
        setIsCartOpen(false); // Cerrar el carrito
      }, 1500);
      return;
    }

    try {
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({ items: cart, customer: customerData })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderInfo(data);
        setCheckoutStatus('success');
        setCart([]);
        setIsCartOpen(false); // Cerrar el carrito
      } else {
        setCheckoutStatus('error');
      }
    } catch (error) {
      console.error(error);
      setCheckoutStatus('error');
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black text-slate-100' : 'bg-white text-slate-900'
      }`}>
      {/* HUD Scanlines overlay */}
      <div className="absolute inset-0 scanlines opacity-5 pointer-events-none z-45" />

      {/* Main Header / Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Primary Page Layouts */}
      <main className="relative z-10">
        {activeTab === 'home' && (
          <Hero setActiveTab={setActiveTab} />
        )}

        {activeTab === 'collections' && (
          <Collections
            initialCollection={null}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activeTab === 'blackskin' && (
          <Collections
            initialCollection="blackskin"
            onSelectProduct={setSelectedProduct}
          />
        )}
      </main>

      {/* Drawer del Carrito */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isLoading={checkoutStatus === 'loading'}
      />

      {/* Modal de Confirmación de Compra (Éxito) */}
      {checkoutStatus === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-2xl text-center flex flex-col gap-6">

            {/* Close button */}
            <button
              onClick={() => setCheckoutStatus(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Success Header */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-450 flex items-center justify-center animate-bounce">
                <CheckCircle size={36} className="stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mt-2">
                ¡PEDIDO SOLICITADO!
              </h3>
              {orderInfo && (
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-950 px-3 py-1 rounded border border-slate-200 dark:border-slate-850">
                  ID: {orderInfo.orderId}
                </span>
              )}
            </div>

            {/* Process Flow */}
            <div className="space-y-4 my-2 text-left">
              {/* Step 1 */}
              <div className="flex gap-4 items-start p-3 rounded-xl border border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[10px] text-slate-900 dark:text-white uppercase tracking-wider">Paso 1</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tu pedido ha sido registrado con éxito en nuestro sistema.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start p-3 rounded-xl border border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[10px] text-slate-900 dark:text-white uppercase tracking-wider">Paso 2</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">En breve te llegará un mensaje de WhatsApp con la información y desglose de tu pedido.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start p-3 rounded-xl border border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[10px] text-slate-900 dark:text-white uppercase tracking-wider">Paso 3</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Te confirmaremos de inmediato la fecha estimada de entrega.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start p-3 rounded-xl border border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-[10px] text-slate-900 dark:text-white uppercase tracking-wider">Paso 4</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">¡Compra segura! Pagas en efectivo o transferencia hasta que tengas el producto en tus manos.</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setCheckoutStatus(null)}
              className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-heading font-extrabold text-xs tracking-widest rounded-xl hover:bg-neutral-850 dark:hover:bg-neutral-150 transition-all cursor-pointer shadow-lg"
            >
              ENTENDIDO Y CERRAR
            </button>

          </div>
        </div>
      )}

      {/* Detailed Product Customizer Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Success Notification Toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white text-slate-950 font-bold tracking-wider rounded-lg shadow-lg transition-all duration-300 border border-slate-200 flex items-center gap-2 ${showToast
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}>
        <span>PRODUCTO AÑADIDO AL CARRITO</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
      </div>

      {/* Standard Footer */}
      <footer className="py-8 border-t border-slate-200/10 dark:border-slate-800/40 text-center text-xs text-slate-400 mt-20 relative z-10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <strong className="font-heading font-extrabold text-black dark:text-white">Black</strong>
            <span className="font-heading font-light text-slate-600 dark:text-slate-300 tracking-wider ml-1">Team</span>
          </div>
          <p className="font-light text-slate-500 dark:text-slate-400">
            &copy; 2026 Black Team. Todos los derechos reservados. Diseñado para rendimiento extremo.
          </p>
        </div>
      </footer>
    </div>
  );
}
