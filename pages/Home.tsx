
import React from 'react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';
import { ArrowRight, Star, PenTool, ShieldCheck, Truck, Sparkles, Heart } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: Page, product?: Product | null) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const signatureItems = PRODUCTS.filter(p => p.collection === 'Zuno Signature Series').slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-designer-working-with-fabric-and-sewing-machine-34440-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center space-y-8 px-6">
          <div className="flex justify-center mb-4">
            <span className="px-4 py-1 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] tracking-[0.5em] uppercase rounded-full bg-black/40 backdrop-blur-md">Collection Winter 2025</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-serif tracking-tight leading-none">
            Digital <span className="italic font-light">Soul,</span><br />
            <span className="gold-text">Manual Stitches.</span>
          </h1>
          <p className="text-lg text-white/60 tracking-widest font-light max-w-2xl mx-auto uppercase">
            Luxury high-GSM apparel meets infinite creative potential.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button onClick={() => onNavigate(Page.Shop)} className="bg-[#D4AF37] hover:bg-white text-black px-14 py-6 text-[10px] font-black tracking-[0.4em] uppercase transition-all transform hover:scale-105">
              Enter the Studio
            </button>
            <button onClick={() => onNavigate(Page.Shop)} className="border border-white/20 hover:border-white px-14 py-6 text-[10px] font-black tracking-[0.4em] uppercase transition-all backdrop-blur-sm">
              Discover All
            </button>
          </div>
        </div>
      </section>

      {/* Gift Category Showcase */}
      <section className="py-32 px-6 lg:px-24 bg-[#0A0A0A]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { label: 'Couples', icon: <Heart size={20} /> },
            { label: 'Birthdays', icon: <Sparkles size={20} /> },
            { label: 'Anniversaries', icon: <Star size={20} /> },
            { label: 'Pets', icon: '🐕' },
            { label: 'Kids', icon: '👶' },
            { label: 'Fitness', icon: '💪' },
            { label: 'Travel', icon: '✈️' }
          ].map((cat, i) => (
            <button key={i} onClick={() => onNavigate(Page.Shop)} className="aspect-square flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/50 transition-all space-y-4 group">
              <div className="text-white/30 group-hover:text-[#D4AF37] group-hover:scale-125 transition-all text-xl">{cat.icon}</div>
              <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Signature Highlight */}
      <section className="py-32 px-6 lg:px-24">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif">Signature Series</h2>
            <p className="text-white/40 text-[10px] tracking-widest uppercase">The bedrock of Zuno Zyra luxury.</p>
          </div>
          <button onClick={() => onNavigate(Page.Shop)} className="text-[10px] font-black tracking-widest uppercase border-b border-[#D4AF37] pb-1">See All Mastery</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {signatureItems.map(p => (
            <div key={p.id} className="group cursor-pointer" onClick={() => onNavigate(Page.PDP, p)}>
              <div className="aspect-[3/4] overflow-hidden bg-[#141414] border border-white/5 mb-6 relative">
                 <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute top-4 left-4 bg-[#D4AF37] text-black text-[8px] font-black px-3 py-1 tracking-widest uppercase">Signature</div>
              </div>
              <h3 className="text-xl font-serif mb-2 group-hover:text-[#D4AF37] transition-colors">{p.name}</h3>
              <p className="text-xs font-light text-white/40">${p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
