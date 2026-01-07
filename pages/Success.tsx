
import React from 'react';
import { Page } from '../types';
import { CheckCircle2, Package, Truck, Clock, ArrowRight } from 'lucide-react';

interface SuccessProps {
  onNavigate: (page: Page) => void;
}

const Success: React.FC<SuccessProps> = ({ onNavigate }) => {
  return (
    <div className="pt-48 pb-24 px-6 text-center animate-in zoom-in duration-500">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4AF37] blur-3xl opacity-20 animate-pulse"></div>
            <CheckCircle2 size={80} className="text-[#D4AF37] relative z-10" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-serif">Order Confirmed</h1>
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase">Order #ZZ-98231-A</p>
          <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed">
            Your journey into bespoke luxury has begun. Our artisans have been notified of your design request.
          </p>
        </div>

        {/* Status Stepper */}
        <div className="bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden">
           <div className="grid grid-cols-4 gap-4 relative z-10">
              {[
                { icon: <Clock size={20} />, label: 'Order Received', active: true },
                { icon: <Package size={20} />, label: 'Digitizing', active: false },
                { icon: <CheckCircle2 size={20} />, label: 'Production', active: false },
                { icon: <Truck size={20} />, label: 'Delivery', active: false },
              ].map((step, i) => (
                <div key={i} className={`flex flex-col items-center space-y-4 ${step.active ? 'text-[#D4AF37]' : 'text-white/20'}`}>
                  <div className={`p-4 rounded-full border ${step.active ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10'}`}>
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">{step.label}</span>
                </div>
              ))}
           </div>
           {/* Progress line */}
           <div className="absolute top-[68px] left-[15%] right-[15%] h-[1px] bg-white/5">
             <div className="h-full bg-[#D4AF37] w-[12%] shadow-[0_0_10px_#D4AF37]"></div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => onNavigate(Page.Account)}
            className="w-full sm:w-auto bg-white text-black px-12 py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all hover:bg-[#D4AF37]"
          >
            Track in My Atelier
          </button>
          <button 
            onClick={() => onNavigate(Page.Shop)}
            className="w-full sm:w-auto border border-white/10 hover:border-white px-12 py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all flex items-center justify-center group"
          >
            Continue Exploring <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
