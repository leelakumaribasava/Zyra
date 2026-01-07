
import React, { useState, useEffect } from 'react';
import { Page, Product, CustomizationState } from '../types';
import { THREAD_COLORS, FONTS } from '../constants';
import { Save, ShoppingCart, Undo, Redo, Upload, Trash2, Check, Layout, Palette, Type as TypeIcon } from 'lucide-react';

interface StudioProps {
  product: Product;
  onNavigate: (page: Page, product?: Product | null) => void;
  onAddToCart: (item: any) => void;
  onSaveDesign: (design: CustomizationState) => void;
}

const Studio: React.FC<StudioProps> = ({ product, onNavigate, onAddToCart, onSaveDesign }) => {
  const [design, setDesign] = useState<CustomizationState>({
    productId: product.id,
    baseColor: product.colors[0],
    size: product.sizes[1],
    text: 'ZYRA',
    font: FONTS[0],
    threadColor: THREAD_COLORS[0].hex,
    placement: 'chest',
    price: product.price + 25 // Base price + embroidery fee
  });

  const [activeTool, setActiveTool] = useState<'text' | 'color' | 'placement' | 'upload'>('text');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSaveDesign(design);
      setIsSaving(false);
      alert('Design saved to your atelier collection.');
    }, 800);
  };

  const handleAddToCart = () => {
    onAddToCart({
      id: Math.random().toString(36).substr(2, 9),
      product,
      customization: design,
      quantity: 1
    });
  };

  return (
    <div className="pt-20 h-screen flex flex-col bg-[#0F0F0F] overflow-hidden">
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Left: Tools Panel */}
        <aside className="w-full lg:w-96 bg-[#141414] border-r border-white/5 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="p-8 border-b border-white/5">
            <h2 className="text-xl font-serif">Personalization Studio</h2>
            <p className="text-[10px] tracking-widest uppercase opacity-40 mt-1">Refine your masterpiece</p>
          </div>

          <div className="flex-grow">
            {/* Toolbar Tabs */}
            <div className="flex border-b border-white/5">
              {[
                { id: 'text', icon: <TypeIcon size={18} />, label: 'Text' },
                { id: 'color', icon: <Palette size={18} />, label: 'Colors' },
                { id: 'placement', icon: <Layout size={18} />, label: 'Layout' },
                { id: 'upload', icon: <Upload size={18} />, label: 'Logo' }
              ].map(tool => (
                <button 
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id as any)}
                  className={`flex-1 py-6 flex flex-col items-center space-y-2 transition-colors ${activeTool === tool.id ? 'text-[#D4AF37] bg-white/[0.02]' : 'text-white/40 hover:text-white'}`}
                >
                  {tool.icon}
                  <span className="text-[10px] font-bold tracking-widest uppercase">{tool.label}</span>
                </button>
              ))}
            </div>

            <div className="p-8 space-y-10">
              {activeTool === 'text' && (
                <div className="space-y-8 animate-in slide-in-from-left duration-300">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">Embroidery Text</label>
                    <input 
                      type="text" 
                      maxLength={12}
                      value={design.text}
                      onChange={(e) => setDesign({ ...design, text: e.target.value.toUpperCase() })}
                      className="w-full bg-[#1A1A1A] border border-white/10 px-4 py-4 focus:outline-none focus:border-[#D4AF37] font-serif uppercase tracking-widest"
                    />
                    <p className="text-[10px] opacity-30 text-right">{design.text.length}/12 characters</p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">Typography</label>
                    <div className="grid grid-cols-1 gap-2">
                      {FONTS.map(f => (
                        <button 
                          key={f}
                          onClick={() => setDesign({ ...design, font: f })}
                          className={`w-full text-left px-4 py-3 border transition-all ${design.font === f ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/5 hover:border-white/20'}`}
                          style={{ fontFamily: f }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTool === 'color' && (
                <div className="space-y-8 animate-in slide-in-from-left duration-300">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">Thread Palette</label>
                    <div className="grid grid-cols-4 gap-4">
                      {THREAD_COLORS.map(color => (
                        <button 
                          key={color.hex}
                          onClick={() => setDesign({ ...design, threadColor: color.hex })}
                          className={`aspect-square rounded-full border-2 p-0.5 transition-all ${design.threadColor === color.hex ? 'border-[#D4AF37]' : 'border-transparent'}`}
                        >
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-center text-white/40 tracking-wide mt-2">Selected: {THREAD_COLORS.find(c => c.hex === design.threadColor)?.name}</p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">Base Fabric</label>
                    <div className="flex space-x-3">
                      {product.colors.map(color => (
                        <button 
                          key={color}
                          onClick={() => setDesign({ ...design, baseColor: color })}
                          className={`w-10 h-10 rounded-sm border transition-all ${design.baseColor === color ? 'border-[#D4AF37]' : 'border-white/10'}`}
                          style={{ backgroundColor: color }}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTool === 'placement' && (
                <div className="space-y-6 animate-in slide-in-from-left duration-300">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">Stitch Placement</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['chest', 'back', 'sleeve-left', 'sleeve-right'].map(pos => (
                      <button 
                        key={pos}
                        onClick={() => setDesign({ ...design, placement: pos as any })}
                        className={`py-6 px-4 border text-[10px] tracking-widest uppercase font-bold transition-all ${design.placement === pos ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/10 hover:border-white/20'}`}
                      >
                        {pos.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTool === 'upload' && (
                <div className="space-y-8 animate-in slide-in-from-left duration-300">
                   <div className="border-2 border-dashed border-white/10 p-12 text-center rounded-sm bg-white/[0.02]">
                      <Upload className="mx-auto text-white/20 mb-4" size={32} />
                      <h4 className="text-xs font-bold tracking-widest uppercase mb-2">Upload Custom Logo</h4>
                      <p className="text-[10px] text-white/30 leading-relaxed mb-6">Supports SVG, PNG, PDF. High-resolution required for embroidery digitizing.</p>
                      <button className="text-[10px] tracking-widest uppercase text-[#D4AF37] border-b border-[#D4AF37] pb-0.5">Browse Files</button>
                   </div>
                   <div className="p-4 bg-white/[0.05] rounded flex items-center space-x-4">
                     <div className="w-10 h-10 bg-black/40 rounded flex items-center justify-center text-[#D4AF37] text-xs">
                       <Check size={16} />
                     </div>
                     <p className="text-[10px] tracking-wider uppercase opacity-60">Design service included (+ $45)</p>
                   </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Center: Live Product Preview */}
        <main className="flex-grow bg-[#0A0A0A] relative flex items-center justify-center p-12 overflow-hidden">
          {/* Top Preview Controls */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
            <div className="flex space-x-4">
              <button className="p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-full" title="Undo"><Undo size={18} /></button>
              <button className="p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-full" title="Redo"><Redo size={18} /></button>
            </div>
            <div className="flex space-x-4 text-[10px] tracking-widest uppercase font-bold bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/5">
              <span className="text-white">Previewing:</span>
              <span className="text-[#D4AF37]">{design.placement.replace('-', ' ')}</span>
            </div>
            <button className="p-3 bg-white/5 hover:bg-white/10 text-red-400 transition-colors rounded-full" title="Reset Design"><Trash2 size={18} /></button>
          </div>

          {/* Large Preview Image */}
          <div className="relative w-full max-w-2xl transition-all duration-700">
             <img 
               src={product.image} 
               alt="Product Preview" 
               className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]" 
               style={{ filter: `drop-shadow(0 0 50px ${design.baseColor}33)` }}
             />
             
             {/* Live Embroidery Render Overlay */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className={`transition-all duration-500 transform ${
                 design.placement === 'chest' ? 'translate-y-[-10%] translate-x-[5%]' : 
                 design.placement === 'back' ? 'translate-y-[-5%] scale-150 opacity-40' :
                 design.placement === 'sleeve-left' ? 'translate-x-[-30%] rotate-[-20deg] scale-75' :
                 'translate-x-[30%] rotate-[20deg] scale-75'
               }`}>
                 <span 
                   className="text-2xl md:text-3xl tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                   style={{ 
                     fontFamily: design.font, 
                     color: design.threadColor,
                     textShadow: `0 0 1px rgba(0,0,0,0.3), 0.5px 0.5px 0 ${design.threadColor}88` 
                   }}
                 >
                   {design.text || 'YOUR DESIGN'}
                 </span>
               </div>
             </div>
          </div>

          <div className="absolute bottom-8 right-8 space-y-2 text-right">
            <p className="text-[10px] tracking-widest uppercase opacity-40">Current View</p>
            <h3 className="text-xl font-serif">Front Isometric</h3>
          </div>
        </main>

        {/* Right: Summary Panel */}
        <aside className="w-full lg:w-96 bg-[#141414] border-l border-white/5 flex flex-col">
          <div className="p-8 border-b border-white/5 bg-[#1A1A1A]">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-[#D4AF37]">Design Summary</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-40">Master Piece</span>
                <span>{product.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-40">Personalization</span>
                <span className="gold-text">Premium Embroidery</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-40">Digitizing Fee</span>
                <span>$25.00</span>
              </div>
              <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                <span className="text-[10px] tracking-widest uppercase opacity-40">Total Atelier Price</span>
                <span className="text-3xl font-serif">${design.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8 flex-grow">
            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest uppercase">Select Size</label>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(s => (
                  <button 
                    key={s}
                    onClick={() => setDesign({...design, size: s})}
                    className={`h-10 flex items-center justify-center text-[10px] border transition-all ${design.size === s ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold' : 'border-white/10 hover:border-white'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest uppercase flex items-center space-x-2">
                <ShoppingCart size={14} className="text-[#D4AF37]" />
                <span>Delivery Estimation</span>
              </h4>
              <p className="text-xs text-white/40 leading-relaxed">
                Handcrafted & shipped within 5-7 business days. Fully tracked express delivery.
              </p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-2 gap-4 bg-[#0F0F0F] border-t border-white/5">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center justify-center space-x-2 border border-white/10 hover:border-white py-4 text-[10px] font-bold tracking-widest uppercase transition-all"
            >
              <Save size={16} />
              <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex items-center justify-center space-x-2 bg-[#D4AF37] hover:bg-white text-black py-4 text-[10px] font-bold tracking-widest uppercase transition-all"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Studio;
