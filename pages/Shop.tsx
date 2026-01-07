
import React, { useState, useMemo } from 'react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';
import { Filter, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';

interface ShopProps {
  onNavigate: (page: Page, product?: Product | null) => void;
}

const Shop: React.FC<ShopProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(300);
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['All', 'Hoodies', 'Tees', 'Sweatshirts', 'Accessories'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => 
      (activeCategory === 'All' || p.category === activeCategory) &&
      p.price <= priceRange
    );
  }, [activeCategory, priceRange]);

  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 space-y-12 shrink-0">
          <div>
            <h2 className="text-2xl font-serif mb-8">Atelier Filters</h2>
            <div className="space-y-8">
              {/* Categories */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Categories</h4>
                <div className="flex flex-col space-y-3">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm tracking-widest uppercase text-left transition-colors ${activeCategory === cat ? 'text-white' : 'text-white/40 hover:text-white'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Price Range</h4>
                <div className="space-y-2">
                  <input 
                    type="range" 
                    min="50" 
                    max="500" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-[#D4AF37]" 
                  />
                  <div className="flex justify-between text-[10px] tracking-widest opacity-40">
                    <span>$50</span>
                    <span>Up to ${priceRange}</span>
                  </div>
                </div>
              </div>

              {/* GSM / Fabric */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Fabric Quality</h4>
                <div className="space-y-3">
                  {['280 GSM+', '400 GSM+', '500 GSM+'].map(gsm => (
                    <label key={gsm} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-white/20 group-hover:border-[#D4AF37] transition-colors"></div>
                      <span className="text-xs tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">{gsm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow space-y-12">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-8 space-y-4 sm:space-y-0">
            <span className="text-xs tracking-[0.2em] uppercase text-white/40">
              Showing {filteredProducts.length} masterpieces
            </span>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-xs tracking-widest uppercase cursor-pointer hover:text-[#D4AF37]">
                <span>Sort by: {sortBy}</span>
                <ChevronDown size={14} />
              </div>
              <div className="flex items-center space-x-2 text-xs tracking-widest uppercase cursor-pointer lg:hidden">
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
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
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                      Bespoke
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(Page.Studio, product);
                      }}
                      className="flex-grow bg-white text-black py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-[#D4AF37]"
                    >
                      Customize
                    </button>
                    <button className="bg-black/80 backdrop-blur-md border border-white/10 p-4 hover:border-[#D4AF37] transition-all">
                      <Search size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif mb-1 group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                    <div className="flex items-center space-x-3">
                      <p className="text-[10px] text-white/30 tracking-widest uppercase">{product.gsm} GSM</p>
                      <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                      <p className="text-[10px] text-white/30 tracking-widest uppercase">{product.fabric}</p>
                    </div>
                  </div>
                  <span className="text-sm font-light tracking-widest font-serif">${product.price}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center space-y-6">
              <h3 className="text-3xl font-serif">No matches found</h3>
              <p className="text-white/40 max-w-sm mx-auto">Try adjusting your filters to find your perfect bespoke piece.</p>
              <button 
                onClick={() => {setActiveCategory('All'); setPriceRange(500);}}
                className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase border-b border-[#D4AF37]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
