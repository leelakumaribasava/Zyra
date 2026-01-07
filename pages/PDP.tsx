
import React, { useState } from 'react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';
import { ArrowLeft, Minus, Plus, Share2, Heart, Ruler, Droplets, Scissors } from 'lucide-react';

interface PDPProps {
  product: Product;
  onNavigate: (page: Page, product?: Product | null) => void;
}

const PDP: React.FC<PDPProps> = ({ product, onNavigate }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="pt-24 min-h-screen animate-in fade-in duration-500">
      <div className="container mx-auto px-6 py-12">
        <button 
          onClick={() => onNavigate(Page.Shop)}
          className="flex items-center space-x-2 text-xs tracking-widest uppercase text-white/40 hover:text-[#D4AF37] transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          <span>Back to Collection</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Image Gallery */}
          <div className="lg:w-3/5 space-y-6">
            <div className="aspect-[4/5] bg-[#1A1A1A] overflow-hidden border border-white/5">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square bg-[#1A1A1A] border border-white/5">
                <img src={product.hoverImage} alt={product.name} className="w-full h-full object-cover brightness-75" />
              </div>
              <div className="aspect-square bg-[#1A1A1A] border border-white/5 relative flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover blur-sm opacity-30" />
                <span className="absolute text-xs tracking-[0.3em] uppercase font-bold text-[#D4AF37]">View Lookbook</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-2/5 space-y-12">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">{product.category}</span>
                <div className="flex space-x-4">
                  <Heart size={20} className="text-white/30 hover:text-red-500 cursor-pointer transition-colors" />
                  <Share2 size={20} className="text-white/30 hover:text-[#D4AF37] cursor-pointer transition-colors" />
                </div>
              </div>
              <h1 className="text-5xl font-serif">{product.name}</h1>
              <p className="text-2xl font-light font-serif tracking-widest">${product.price}</p>
            </div>

            <p className="text-white/60 leading-relaxed font-light text-lg">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">Select Size</h4>
                <button className="flex items-center space-x-2 text-[10px] tracking-widest uppercase text-white/40 hover:text-[#D4AF37]">
                  <Ruler size={14} />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-xs border transition-all ${selectedSize === size ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold' : 'border-white/10 hover:border-white'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">Quantity</h4>
              <div className="inline-flex items-center border border-white/10">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:text-[#D4AF37] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:text-[#D4AF37] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-4 pt-8">
              <button 
                onClick={() => onNavigate(Page.Studio, product)}
                className="w-full bg-[#D4AF37] hover:bg-[#B8962D] text-black py-6 text-xs font-bold tracking-[0.3em] uppercase transition-all shadow-xl shadow-[#D4AF37]/10"
              >
                Customize This Piece
              </button>
              <button 
                className="w-full border border-white/20 hover:border-white py-6 text-xs font-bold tracking-[0.3em] uppercase transition-all"
                onClick={() => onNavigate(Page.Cart)}
              >
                Add to Atelier Cart
              </button>
            </div>

            {/* Info Tabs */}
            <div className="border-t border-white/10 pt-12">
              <div className="flex space-x-12 mb-8">
                {['Details', 'Composition', 'Care'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${activeTab === tab.toLowerCase() ? 'text-[#D4AF37] border-b border-[#D4AF37] pb-1' : 'text-white/40 hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-white/50 text-sm leading-relaxed min-h-[100px]">
                {activeTab === 'details' && (
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <Scissors size={14} />
                      <span>Signature relaxed boxy silhouette</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Droplets size={14} />
                      <span>Pre-shrunk for consistent fit over time</span>
                    </li>
                  </ul>
                )}
                {activeTab === 'composition' && (
                  <p>100% GOTS Certified Organic Cotton. 450 GSM Weight. Knitted and dyed in our signature carbon mill.</p>
                )}
                {activeTab === 'care' && (
                  <p>Hand wash cold or dry clean recommended. Do not tumble dry. Steam iron on low heat for best results.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDP;
