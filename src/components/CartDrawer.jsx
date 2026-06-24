import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ArrowLeft, User, Phone, MapPin } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onRemoveItem, onCheckout, isLoading }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    else if (name.trim().length < 3) newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    
    // Clean and validate phone (must be 10 digits)
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
    else if (cleanPhone.length !== 10) newErrors.phone = "Ingresa un número de 10 dígitos válido.";
    
    if (!address.trim()) newErrors.address = "La dirección de envío es obligatoria.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckoutStep = () => {
    if (!showForm) {
      setShowForm(true);
    } else {
      if (validateForm()) {
        const cleanPhone = phone.trim().replace(/\D/g, '');
        onCheckout({ name: name.trim(), phone: cleanPhone, address: address.trim() });
      }
    }
  };

  const getThumbnail = (id, color, gender) => {
    const isWhite = color === 'Pure White';
    if (id === 'playera_asimetrica_m') {
      return isWhite ? 'assets/white_asym_front.png' : 'assets/black_asym_front.png';
    }
    if (id === 'playera_asimetrica_corta_m') {
      return isWhite ? 'assets/white_asym_short_front.png' : 'assets/black_asym_short_front.png';
    }
    if (id === 'playera_manga_corta_m') {
      return isWhite ? 'assets/white_short_front.png' : 'assets/black_short_front.png';
    }
    if (id === 'playera_sin_manga_m') {
      return isWhite ? 'assets/white_tank_front.png' : 'assets/black_tank_front.png';
    }
    if (id === 'licra_compresion_m') {
      return isWhite ? 'assets/white_tights_front.png' : 'assets/black_tights_front.png';
    }
    if (id === 'licra_asimetrica_m') {
      return isWhite ? 'assets/white_asym_tights_front.png' : 'assets/black_asym_tights_front.png';
    }
    if (id === 'shorts_compresion_m') {
      return isWhite ? 'assets/white_shorts_front.png' : 'assets/black_shorts_front.png';
    }
    if (id === 'playera_manga_larga_f') {
      return isWhite ? 'assets/white_female_shirt_front.png' : 'assets/black_female_shirt_front.png';
    }
    if (id === 'playera_asimetrica_f') {
      return isWhite ? 'assets/white_female_asym_front.png' : 'assets/black_female_asym_front.png';
    }
    if (id === 'playera_manga_corta_f') {
      return isWhite ? 'assets/white_female_short_front.png' : 'assets/black_female_short_front.png';
    }
    if (id === 'playera_asimetrica_corta_f') {
      return isWhite ? 'assets/white_female_asym_short_front.png' : 'assets/black_female_asym_short_front.png';
    }
    if (id === 'licra_compresion_f') {
      return isWhite ? 'assets/white_female_tights_front.png' : 'assets/black_female_tights_front.png';
    }
    if (id === 'licra_asimetrica_f') {
      return isWhite ? 'assets/white_female_asym_tights_front.png' : 'assets/black_female_asym_tights_front.png';
    }
    if (id === 'shorts_compresion_f') {
      return isWhite ? 'assets/white_female_shorts_front.png' : 'assets/black_female_shorts_front.png';
    }
    return gender === 'Hombre'
      ? (isWhite ? 'assets/white_shirt_front.png' : 'assets/black_shirt_front.png')
      : (isWhite ? 'assets/white_shirt_front.png' : 'assets/black_shirt_front.png');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 text-left flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-850 flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              {showForm ? <ArrowLeft className="cursor-pointer" size={20} onClick={() => setShowForm(false)} /> : <ShoppingBag size={20} />}
              {showForm ? 'DATOS DE ENVÍO' : 'TU CARRITO'}
            </h2>
            <button 
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                } else {
                  onClose();
                }
              }}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-450 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          {showForm ? (
            /* Customer Contact Form */
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200 dark:border-slate-850 mb-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Confirmación del pedido</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Estás solicitando {cart.length} {cart.length === 1 ? 'prenda' : 'prendas'} por un subtotal de <strong>${subtotal.toFixed(2)}</strong>. Por favor llena tus datos de entrega.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-heading font-extrabold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                  Nombre Completo
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="Ej. Juan Pérez"
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-slate-50 dark:bg-slate-950/30 border rounded-xl outline-none transition-all ${
                      errors.name 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-slate-200 dark:border-slate-800 focus:border-black dark:focus:border-white text-slate-800 dark:text-slate-200'
                    }`}
                  />
                </div>
                {errors.name && <span className="text-[10px] text-red-500 font-medium">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-heading font-extrabold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                  Teléfono / WhatsApp (10 dígitos)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="Ej. 5512345678"
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-slate-50 dark:bg-slate-950/30 border rounded-xl outline-none transition-all ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-slate-200 dark:border-slate-800 focus:border-black dark:focus:border-white text-slate-800 dark:text-slate-200'
                    }`}
                  />
                </div>
                {errors.phone && <span className="text-[10px] text-red-500 font-medium">{errors.phone}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-heading font-extrabold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                  Dirección de Entrega Completa
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3 flex items-start text-slate-400 pointer-events-none">
                    <MapPin size={16} />
                  </span>
                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                    }}
                    placeholder="Calle, número, colonia, código postal y referencias de entrega"
                    rows={3}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-slate-50 dark:bg-slate-950/30 border rounded-xl outline-none transition-all resize-none ${
                      errors.address 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-slate-200 dark:border-slate-800 focus:border-black dark:focus:border-white text-slate-800 dark:text-slate-200'
                    }`}
                  />
                </div>
                {errors.address && <span className="text-[10px] text-red-500 font-medium">{errors.address}</span>}
              </div>
            </div>
          ) : (
            /* Items List */
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20 text-slate-500">
                  <ShoppingBag size={48} className="stroke-[1.5] text-slate-400" />
                  <p className="font-medium text-sm">Tu carrito está vacío</p>
                  <button 
                    onClick={onClose}
                    className="mt-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold text-xs tracking-wider rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer"
                  >
                    CONTINUAR COMPRANDO
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div 
                    key={`${item.id}-${item.color}-${item.size}-${index}`}
                    className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-1 border border-slate-200/50 dark:border-slate-850">
                      <img 
                        src={getThumbnail(item.id, item.color, item.gender)}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-bold tracking-wider mt-1 uppercase">
                          TALLA: {item.size} | COLOR: {item.color}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-slate-500 font-medium">
                          Cant: {item.quantity} x ${item.price}
                        </span>
                        <strong className="text-sm font-extrabold text-slate-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button 
                      onClick={() => onRemoveItem(index)}
                      className="p-1.5 self-start text-slate-400 hover:text-red-500 transition-colors cursor-pointer rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                      title="Eliminar artículo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Footer & Totals */}
          {cart.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-850 p-6 bg-slate-50/50 dark:bg-slate-950/30 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Subtotal</span>
                <strong className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </strong>
              </div>
              <p className="text-[10px] text-slate-450 dark:text-slate-500">
                El pago se realiza contra entrega (efectivo o transferencia).
              </p>

              <button
                onClick={handleCheckoutStep}
                disabled={isLoading}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-heading font-extrabold text-xs tracking-widest rounded-xl hover:bg-neutral-850 dark:hover:bg-neutral-150 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-450 border-t-transparent dark:border-slate-650 dark:border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {showForm ? 'ENVIAR SOLICITUD DE PEDIDO' : 'CONTINUAR CON EL PEDIDO'}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
