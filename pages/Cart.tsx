
import React from 'react';
import { Page, CartItem } from '../types';
import { Trash2, Edit3, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onNavigate: (page: Page) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onNavigate, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.customization?.price || item.product.price) * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="pt-48 pb-24 px-6 text-center space-y-8 animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={40} className="text-white/20" />
        </div>
        <h2 className="text-4xl font-serif">Your Atelier is Empty</h2>
        <p className="text-white/40 max-w-sm mx-auto">Discover our collection and start crafting your bespoke signature pieces today.</p>
        <button 
          onClick={() => onNavigate(Page.Shop)}
          className="bg-[#D4AF37] text-black px-12 py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all transform hover:scale-105"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 lg:px-24 animate-in fade-in duration-500">
      <h1 className="text-5xl font-serif mb-16">Your Atelier Cart</h1>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Items List */}
        <div className="flex-grow space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-8 p-8 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
              <div className="w-32 h-40 bg-[#1A1A1A] shrink-0 relative overflow-hidden">
                <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                {item.customization && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-[10px] drop-shadow-lg opacity-80"
                      style={{ fontFamily: item.customization.font, color: item.customization.threadColor }}
                    >
                      {item.customization.text}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-grow flex flex-col justify-between py-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-serif">{item.product.name}</h3>
                    <span className="text-lg font-light">${(item.customization?.price || item.product.price).toFixed(2)}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-widest uppercase text-white/40">
                    <span>Size: {item.customization?.size || 'M'}</span>
                    <span>Fabric: {item.product.gsm} GSM {item.product.fabric}</span>
                    {item.customization && (
                      <span className="text-[#D4AF37]">Personalized Embroidery</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-8 pt-6">
                  <button 
                    onClick={() => onNavigate(Page.Studio)}
                    className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] hover:text-white transition-colors"
                  >
                    <Edit3 size={14} />
                    <span>Edit Design</span>
                  </button>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Remove Item</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-96 space-y-8">
          <div className="p-8 bg-white/[0.05] border border-white/10 space-y-8">
            <h3 className="text-sm font-bold tracking-widest uppercase text-[#D4AF37]">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="opacity-40">Atelier Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-40">Express Shipping</span>
                <span className="text-green-400">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-40">VAT / Duties</span>
                <span>Calculated at next step</span>
              </div>
              <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                <span className="text-xs tracking-widest uppercase font-bold">Total</span>
                <span className="text-3xl font-serif">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate(Page.Checkout)}
              className="w-full bg-[#D4AF37] hover:bg-white text-black py-6 text-xs font-bold tracking-[0.3em] uppercase transition-all flex items-center justify-center group"
            >
              Secure Checkout <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>

          <div className="p-6 border border-white/5 space-y-4">
             <div className="flex items-center space-x-3 text-white/40">
               <ShoppingBag size={18} />
               <span className="text-[10px] tracking-widest uppercase">Zuno Zyra Guarantee</span>
             </div>
             <p className="text-[10px] text-white/30 leading-relaxed">
               Each piece is individually inspected by our lead artisan before being hand-packed and dispatched.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
