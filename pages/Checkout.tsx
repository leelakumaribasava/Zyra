
import React, { useState } from 'react';
import { Page, CartItem } from '../types';
import { ShieldCheck, CreditCard, Truck, Check, ChevronRight } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  onNavigate: (page: Page) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onNavigate }) => {
  const [step, setStep] = useState(1);
  const total = items.reduce((acc, item) => acc + (item.customization?.price || item.product.price) * item.quantity, 0);

  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Main Checkout Flow */}
        <div className="flex-grow space-y-12">
          <div className="flex items-center justify-between mb-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${step >= i ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold' : 'border-white/10 text-white/40'}`}>
                  {step > i ? <Check size={18} /> : i}
                </div>
                {i < 3 && <div className={`flex-grow h-[1px] mx-4 transition-all ${step > i ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h2 className="text-4xl font-serif">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-6">
                <input placeholder="First Name" className="bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none transition-all" />
                <input placeholder="Last Name" className="bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none transition-all" />
                <input placeholder="Address Line 1" className="col-span-2 bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none transition-all" />
                <input placeholder="City" className="bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none transition-all" />
                <input placeholder="Zip Code" className="bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none transition-all" />
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-[#D4AF37] text-black py-6 text-xs font-bold tracking-widest uppercase flex items-center justify-center group"
              >
                Continue to Shipping <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h2 className="text-4xl font-serif">Shipping Method</h2>
              <div className="space-y-4">
                <div className="p-6 border border-[#D4AF37] bg-[#D4AF37]/5 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <Truck className="text-[#D4AF37]" size={24} />
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase">Atelier Express</p>
                      <p className="text-[10px] text-white/40 mt-1">3-5 Business Days</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#D4AF37]">FREE</span>
                </div>
                <div className="p-6 border border-white/5 hover:border-white/20 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <Truck className="opacity-20" size={24} />
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase opacity-40">White Glove Priority</p>
                      <p className="text-[10px] text-white/40 mt-1">Next Day Delivery</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold">$45.00</span>
                </div>
              </div>
              <button 
                onClick={() => setStep(3)}
                className="w-full bg-[#D4AF37] text-black py-6 text-xs font-bold tracking-widest uppercase flex items-center justify-center group"
              >
                Continue to Payment <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h2 className="text-4xl font-serif">Payment Method</h2>
              <div className="space-y-6">
                <div className="p-6 border border-[#D4AF37] bg-[#D4AF37]/5 flex items-center space-x-4">
                  <CreditCard className="text-[#D4AF37]" size={24} />
                  <span className="text-xs font-bold tracking-widest uppercase">Credit / Debit Card</span>
                </div>
                <div className="space-y-4 pt-4">
                   <input placeholder="Card Number" className="w-full bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none transition-all" />
                   <div className="grid grid-cols-2 gap-4">
                      <input placeholder="MM/YY" className="bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none transition-all" />
                      <input placeholder="CVV" className="bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none transition-all" />
                   </div>
                </div>
              </div>
              
              <div className="p-6 bg-white/[0.02] border border-white/5 flex items-center space-x-4">
                 <ShieldCheck className="text-green-500" size={24} />
                 <p className="text-[10px] text-white/40 leading-relaxed">
                   Your payment is secured by military-grade 256-bit encryption. No data is stored on our servers.
                 </p>
              </div>

              <button 
                onClick={() => onNavigate(Page.Success)}
                className="w-full bg-[#D4AF37] text-black py-6 text-xs font-bold tracking-[0.4em] uppercase shadow-2xl shadow-[#D4AF37]/20 transform hover:scale-[1.02] transition-all"
              >
                Place Order — ${total.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:w-96 space-y-8">
           <div className="bg-[#141414] border border-white/5 p-8 space-y-8">
              <h3 className="text-sm font-bold tracking-widest uppercase text-[#D4AF37]">Cart Summary</h3>
              <div className="space-y-6">
                 {items.map(item => (
                   <div key={item.id} className="flex space-x-4">
                      <div className="w-16 h-20 bg-[#1A1A1A] shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="text-xs font-serif">{item.product.name}</h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                        <p className="text-xs font-light tracking-widest">${(item.customization?.price || item.product.price).toFixed(2)}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="pt-8 border-t border-white/5 space-y-4">
                 <div className="flex justify-between text-xs opacity-40">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-sm font-bold tracking-widest uppercase items-end pt-4">
                    <span>Final Amount</span>
                    <span className="text-2xl font-serif text-[#D4AF37]">${total.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
