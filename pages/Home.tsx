
import React from 'react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';
import { ArrowRight, Star, PenTool, ShieldCheck, Truck } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: Page, product?: Product | null) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-designer-working-with-fabric-and-sewing-machine-34440-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 text-center space-y-8 px-6">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight leading-tight">
            Crafting Your <br />
            <span className="gold-text italic">Bespoke Narrative</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 tracking-widest font-light max-w-2xl mx-auto uppercase">
            Luxury high-GSM apparel meets infinite creative potential.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => onNavigate(Page.Studio, PRODUCTS[0])}
              className="bg-[#D4AF37] hover:bg-[#B8962D] text-black px-12 py-5 text-sm font-bold tracking-[0.3em] uppercase transition-all transform hover:scale-105 active:scale-95 flex items-center group"
            >
              Start Customizing <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button 
              onClick={() => onNavigate(Page.Shop)}
              className="border border-white/20 hover:border-[#D4AF37] backdrop-blur-sm px-12 py-5 text-sm font-bold tracking-[0.3em] uppercase transition-all"
            >
              Explore Collection
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-white/30"></div>
        </div>
      </section>

      {/* Quick Access Icons */}
      <section className="py-24 px-6 lg:px-24 bg-[#141414]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            { label: 'Hoodies', icon: '🧥', page: Page.Shop },
            { label: 'Tees', icon: '👕', page: Page.Shop },
            { label: 'Best Sellers', icon: '🏆', page: Page.Shop },
            { label: 'Gift Ideas', icon: '🎁', page: Page.Shop },
            { label: 'Corporate', icon: '🏢', page: Page.Corporate },
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className="flex flex-col items-center justify-center p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-all group bg-white/[0.02]"
            >
              <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110">{item.icon}</span>
              <span className="text-xs font-bold tracking-widest uppercase opacity-60 group-hover:opacity-100 group-hover:text-[#D4AF37]">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 px-6 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4">
          <div className="space-y-4">
            <span className="text-[#D4AF37] text-sm font-bold tracking-[0.4em] uppercase">Selected Works</span>
            <h2 className="text-5xl font-serif">Signature Silhouettes</h2>
          </div>
          <button 
            onClick={() => onNavigate(Page.Shop)}
            className="text-sm font-bold tracking-widest uppercase border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors"
          >
            View Full Atelier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="group cursor-pointer"
              onClick={() => onNavigate(Page.PDP, product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#1A1A1A]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <img 
                  src={product.hoverImage} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                {product.customizable && (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                    Customizable
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(Page.Studio, product);
                    }}
                    className="w-full bg-[#D4AF37] text-black py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-white"
                  >
                    Customize Now
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-serif mb-1 group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                  <p className="text-xs text-white/40 tracking-widest uppercase">{product.category}</p>
                </div>
                <span className="text-sm font-light tracking-widest">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 blur-[120px]"></div>
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1000&q=80" 
              alt="Craftsmanship" 
              className="w-full h-[600px] object-cover grayscale brightness-75 border border-white/5"
            />
            <div className="absolute -bottom-10 -right-10 bg-[#0F0F0F] p-12 border border-[#D4AF37]/20 hidden lg:block">
              <h4 className="text-4xl font-serif mb-4 italic">500,000+</h4>
              <p className="text-xs tracking-widest uppercase text-white/40">Stitches of Precision</p>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <span className="text-[#D4AF37] text-sm font-bold tracking-[0.4em] uppercase">The Process</span>
              <h2 className="text-5xl font-serif leading-tight">Digital Soul, <br />Manual Perfection</h2>
              <p className="text-white/60 leading-relaxed text-lg font-light">
                Our embroidery process combines industry-leading Tajima machinery with the watchful eye of master artisans. Every design is manually digitized to ensure thread density, tension, and flow are optimized for our high-GSM fabrics.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <PenTool className="text-[#D4AF37]" size={32} />
                <h5 className="font-bold tracking-widest uppercase text-xs">Manual Digitizing</h5>
                <p className="text-white/40 text-sm">We don't use auto-converters. Every logo is redrawn by hand for thread optimization.</p>
              </div>
              <div className="space-y-4">
                <ShieldCheck className="text-[#D4AF37]" size={32} />
                <h5 className="font-bold tracking-widest uppercase text-xs">Triple QC Check</h5>
                <p className="text-white/40 text-sm">Each piece undergoes three stages of quality inspection before being boxed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="py-24 border-y border-white/5 bg-[#0F0F0F]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <Truck className="text-white/20" size={48} />
            <h4 className="font-bold tracking-widest uppercase text-sm">Global Express</h4>
            <p className="text-white/40 text-xs">Premium tracked delivery to over 45 countries.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <Star className="text-white/20" size={48} />
            <h4 className="font-bold tracking-widest uppercase text-sm">4.9/5 Rating</h4>
            <p className="text-white/40 text-xs">Voted #1 bespoke luxury platform by GQ Digital.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <ShieldCheck className="text-white/20" size={48} />
            <h4 className="font-bold tracking-widest uppercase text-sm">Lifetime Guarantee</h4>
            <p className="text-white/40 text-xs">On embroidery quality and fabric structural integrity.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
