
import React, { useState, useMemo } from 'react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';
import { Filter, ChevronDown, SlidersHorizontal, Search, ShoppingBag } from 'lucide-react';

interface ShopProps {
  onNavigate: (page: Page, product?: Product | null) => void;
}

const Shop: React.FC<ShopProps> = ({ onNavigate }) => {
  const [activeGender, setActiveGender] = useState<string>('All');
  const [activeCollection, setActiveCollection] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(500);

  const collections = [
    'All', 'Minimal Embroidery', 'Luxury Streetwear', 'Zuno Signature Series', 
    'Everyday Essentials', 'Winter 2025', 'Best for Gifting', 'Trending on Instagram'
  ];

  const categories = [
    'All', 'Oversized Tees', 'Hoodies', 'Sweatshirts', 'Zip Hoodies', 
    'Polo Tshirts', 'Cargos/Joggers', 'Custom Caps', 'Baby Wear', 'Tote Bags'
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => 
      (activeGender === 'All' || p.gender === activeGender || p.gender === 'Unisex') &&
      (activeCollection === 'All' || p.collection === activeCollection || p.tags?.includes(activeCollection)) &&
      (activeCategory === 'All' || p.category === activeCategory) &&
      p.price <= priceRange
    );
  }, [activeGender, activeCollection, activeCategory, priceRange]);

  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Header */}
      <div className="mb-20 space-y-4">
        <h1 className="text-6xl font-serif">The Atelier</h1>
        <p className="text-white/40 text-sm tracking-widest uppercase max-w-xl">
          Discover a curation of high-GSM masterpieces designed to be your signature canvas.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Advanced Filters */}
        <aside className="lg:w-72 space-y-12 shrink-0">
          <div className="sticky top-32 space-y-12">
            {/* Gender Switch */}
            <div className="flex bg-white/5 p-1">
              {['All', 'Men', 'Women', 'Kids'].map(g => (
                <button 
                  key={g}
                  onClick={() => setActiveGender(g)}
                  className={`flex-1 py-3 text-[9px] font-bold tracking-widest uppercase transition-all ${activeGender === g ? 'bg-[#D4AF37] text-black' : 'hover:bg-white/5'}`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Collections */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Collections</h4>
              <div className="flex flex-col space-y-4">
                {collections.map(col => (
                  <button 
                    key={col}
                    onClick={() => setActiveCollection(col)}
                    className={`text-[10px] tracking-widest uppercase text-left transition-colors ${activeCollection === col ? 'text-white font-bold' : 'text-white/30 hover:text-white'}`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Silhouettes</h4>
              <div className="flex flex-col space-y-4">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] tracking-widest uppercase text-left transition-colors ${activeCategory === cat ? 'text-white font-bold' : 'text-white/30 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Budget — Max ${priceRange}</h4>
              <input 
                type="range" min="40" max="500" value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-[#D4AF37]" 
              />
            </div>
          </div>
        </aside>

        {/* Product Display */}
        <div className="flex-grow space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="group cursor-pointer"
                onClick={() => onNavigate(Page.PDP, product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#1A1A1A] border border-white/5">
                  <img src={product.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <img src={product.hoverImage} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.collection && (
                      <span className="bg-black/60 backdrop-blur-md px-3 py-1 text-[8px] tracking-widest uppercase font-bold border border-white/10">{product.collection}</span>
                    )}
                    {product.tags?.includes('Trending on Instagram') && (
                      <span className="bg-[#D4AF37]/90 text-black px-3 py-1 text-[8px] tracking-widest uppercase font-black">🔥 Trending</span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onNavigate(Page.Studio, product); }}
                      className="flex-grow bg-white text-black py-4 text-[9px] font-bold tracking-[0.3em] uppercase transition-all hover:bg-[#D4AF37]"
                    >
                      Bespoke Tool
                    </button>
                    <button className="bg-black/60 backdrop-blur-md border border-white/10 p-4 hover:bg-[#D4AF37] hover:text-black transition-all">
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-serif mb-1 group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                    <p className="text-[9px] text-white/30 tracking-widest uppercase">
                      {product.gender} • {product.gsm > 0 ? `${product.gsm} GSM` : ''} {product.fabric}
                    </p>
                  </div>
                  <span className="text-sm font-light font-serif">${product.price}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center border border-white/5 border-dashed rounded-lg">
               <h3 className="text-2xl font-serif text-white/20">No matching pieces in the Atelier</h3>
               <button onClick={() => {setActiveGender('All'); setActiveCollection('All'); setActiveCategory('All');}} className="mt-4 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase border-b border-[#D4AF37]">Clear All Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
