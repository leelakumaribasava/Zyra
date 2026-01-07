
import React, { useState, useEffect, useMemo } from 'react';
import { Page, Product, CustomizationState } from '../types';
import { THREAD_COLORS, FONTS, FABRICS, STYLE_DETAILS } from '../constants';
import { 
  ChevronRight, ChevronDown, ShoppingCart, RotateCcw, 
  ZoomIn, Maximize, Scissors, Palette, Type as TypeIcon, 
  Ruler, Info, Check, Save, ArrowLeft, Layers
} from 'lucide-react';

interface StudioProps {
  product: Product;
  onNavigate: (page: Page, product?: Product | null) => void;
  onAddToCart: (item: any) => void;
  onSaveDesign: (design: CustomizationState) => void;
}

const Studio: React.FC<StudioProps> = ({ product, onNavigate, onAddToCart, onSaveDesign }) => {
  const [activeStep, setActiveStep] = useState(2); // 1: Style, 2: Customize, 3: Review
  const [openCard, setOpenCard] = useState<string | null>('fabric');
  const [view, setView] = useState<'front' | 'back' | 'detail'>('front');
  const [isSaving, setIsSaving] = useState(false);

  const [design, setDesign] = useState<CustomizationState>({
    productId: product.id,
    baseColor: product.colors[0],
    size: product.sizes[1],
    fit: 'Regular',
    fabric: FABRICS[0].name,
    text: 'ZYRA',
    font: FONTS[0],
    threadColor: THREAD_COLORS[0].hex,
    placement: 'chest',
    details: {
      collar: STYLE_DETAILS.collars[0],
      stitching: 'Tone-on-tone',
      sleeves: STYLE_DETAILS.sleeves[0]
    },
    price: product.price
  });

  // Calculate dynamic price
  const totalPrice = useMemo(() => {
    let extra = 0;
    const fabric = FABRICS.find(f => f.name === design.fabric);
    if (fabric) extra += fabric.price;
    if (design.text) extra += 25; // Base embroidery fee
    if (design.details.stitching !== 'Tone-on-tone') extra += 15;
    return product.price + extra;
  }, [design, product.price]);

  const toggleCard = (id: string) => setOpenCard(openCard === id ? null : id);

  const handleAddToCart = () => {
    onAddToCart({
      id: Math.random().toString(36).substr(2, 9),
      product,
      customization: { ...design, price: totalPrice },
      quantity: 1
    });
  };

  const steps = [
    { n: 1, label: 'Silhouette' },
    { n: 2, label: 'Customize' },
    { n: 3, label: 'Review' }
  ];

  return (
    <div className="pt-20 h-screen flex flex-col bg-[#0F0F0F] overflow-hidden text-white">
      {/* Top Progress Navigation */}
      <div className="h-16 bg-[#141414] border-b border-white/5 px-8 flex items-center justify-between">
        <button onClick={() => onNavigate(Page.PDP, product)} className="flex items-center space-x-2 text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors">
          <ArrowLeft size={14} />
          <span>Back to Product</span>
        </button>
        
        <div className="flex items-center space-x-12">
          {steps.map(s => (
            <div key={s.n} className={`flex items-center space-x-3 transition-opacity ${activeStep >= s.n ? 'opacity-100' : 'opacity-20'}`}>
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold ${activeStep === s.n ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white text-white'}`}>
                {s.n}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold">{s.label}</span>
              {s.n < 3 && <div className="w-8 h-[1px] bg-white/10 ml-4"></div>}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-[10px] tracking-widest uppercase text-white/40 hover:text-[#D4AF37]">Save Design</button>
          <ShoppingCart size={18} className="text-white/40" />
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: High-Res Preview */}
        <section className="flex-grow bg-[#0A0A0A] relative flex flex-col items-center justify-center p-12 overflow-hidden border-r border-white/5">
          {/* Preview Controls Overlay */}
          <div className="absolute top-12 left-12 flex flex-col space-y-4">
            <button onClick={() => setView('front')} className={`p-4 border transition-all rounded-full ${view === 'front' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/5 hover:border-white/20'}`}>
              <span className="text-[9px] font-bold uppercase tracking-widest">Front</span>
            </button>
            <button onClick={() => setView('back')} className={`p-4 border transition-all rounded-full ${view === 'back' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/5 hover:border-white/20'}`}>
              <span className="text-[9px] font-bold uppercase tracking-widest">Back</span>
            </button>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-6 bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/5">
            <button className="hover:text-[#D4AF37] transition-colors"><RotateCcw size={18} /></button>
            <button className="hover:text-[#D4AF37] transition-colors"><ZoomIn size={18} /></button>
            <button className="hover:text-[#D4AF37] transition-colors"><Maximize size={18} /></button>
          </div>

          <div className="relative w-full max-w-2xl transform transition-transform duration-1000">
            <img 
              src={view === 'back' ? product.hoverImage : product.image} 
              alt="Live Preview" 
              className="w-full h-auto drop-shadow-[0_45px_45px_rgba(0,0,0,0.8)]" 
              style={{ filter: `drop-shadow(0 0 40px ${design.baseColor}44)` }}
            />
            {/* Live Personalization Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${view === 'front' ? 'opacity-100' : 'opacity-0'}`}>
               <div className={`transition-all duration-700 transform ${
                 design.placement === 'chest' ? 'translate-y-[-12%] translate-x-[8%]' : 
                 design.placement === 'back' ? 'translate-y-[-5%] scale-150' :
                 'translate-x-[-30%] rotate-[-15deg] scale-75'
               }`}>
                 <span 
                   className="text-2xl md:text-3xl tracking-widest uppercase"
                   style={{ 
                     fontFamily: design.font, 
                     color: design.threadColor,
                     textShadow: `0 1px 2px rgba(0,0,0,0.4), 0.5px 0.5px 0 ${design.threadColor}aa` 
                   }}
                 >
                   {design.text}
                 </span>
               </div>
            </div>
          </div>
        </section>

        {/* Right Panel: Advanced Customization Tools */}
        <aside className="w-full lg:w-[450px] bg-[#111111] flex flex-col h-full overflow-hidden">
          <div className="flex-grow overflow-y-auto scrollbar-hide px-8 py-10 space-y-4">
            
            {/* 1. Fabric Selection Card */}
            <div className={`border transition-all duration-500 ${openCard === 'fabric' ? 'border-[#D4AF37]/30 bg-[#161616]' : 'border-white/5 bg-[#141414] hover:bg-white/[0.02]'}`}>
              <button onClick={() => toggleCard('fabric')} className="w-full p-6 flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded bg-white/5 ${openCard === 'fabric' ? 'text-[#D4AF37]' : 'text-white/40'}`}><Layers size={18} /></div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">1. Material Atelier</h4>
                    <p className="text-[9px] text-white/30 uppercase mt-0.5">{design.fabric}</p>
                  </div>
                </div>
                {openCard === 'fabric' ? <ChevronDown size={14} /> : <ChevronRight size={14} className="opacity-40 group-hover:opacity-100" />}
              </button>
              
              {openCard === 'fabric' && (
                <div className="p-6 pt-0 space-y-4 animate-in fade-in slide-in-from-top-4">
                  <div className="grid grid-cols-1 gap-3">
                    {FABRICS.map(f => (
                      <button 
                        key={f.name}
                        onClick={() => setDesign({ ...design, fabric: f.name })}
                        className={`p-4 border text-left transition-all relative overflow-hidden group ${design.fabric === f.name ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 hover:border-white/20'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{f.name}</span>
                          <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full opacity-60 uppercase">{f.tag}</span>
                        </div>
                        <p className="text-[9px] text-white/40 leading-relaxed mb-1">{f.desc}</p>
                        {f.price > 0 && <span className="text-[9px] text-[#D4AF37]">+ ${f.price}</span>}
                        {design.fabric === f.name && <Check size={12} className="absolute bottom-4 right-4 text-[#D4AF37]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Color Selection Card */}
            <div className={`border transition-all duration-500 ${openCard === 'color' ? 'border-[#D4AF37]/30 bg-[#161616]' : 'border-white/5 bg-[#141414] hover:bg-white/[0.02]'}`}>
              <button onClick={() => toggleCard('color')} className="w-full p-6 flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded bg-white/5 ${openCard === 'color' ? 'text-[#D4AF37]' : 'text-white/40'}`}><Palette size={18} /></div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">2. Base Shade</h4>
                    <p className="text-[9px] text-white/30 uppercase mt-0.5">Selected: {design.baseColor}</p>
                  </div>
                </div>
                {openCard === 'color' ? <ChevronDown size={14} /> : <ChevronRight size={14} className="opacity-40" />}
              </button>
              
              {openCard === 'color' && (
                <div className="p-6 pt-0 space-y-6 animate-in fade-in slide-in-from-top-4">
                  <div className="flex flex-wrap gap-4">
                    {product.colors.map(c => (
                      <button 
                        key={c}
                        onClick={() => setDesign({ ...design, baseColor: c })}
                        className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${design.baseColor === c ? 'border-[#D4AF37]' : 'border-transparent'}`}
                      >
                        <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: c }}></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Fit & Size Card */}
            <div className={`border transition-all duration-500 ${openCard === 'fit' ? 'border-[#D4AF37]/30 bg-[#161616]' : 'border-white/5 bg-[#141414]'}`}>
              <button onClick={() => toggleCard('fit')} className="w-full p-6 flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded bg-white/5 ${openCard === 'fit' ? 'text-[#D4AF37]' : 'text-white/40'}`}><Ruler size={18} /></div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">3. Fit & Scale</h4>
                    <p className="text-[9px] text-white/30 uppercase mt-0.5">{design.fit} • {design.size}</p>
                  </div>
                </div>
                {openCard === 'fit' ? <ChevronDown size={14} /> : <ChevronRight size={14} className="opacity-40" />}
              </button>
              
              {openCard === 'fit' && (
                <div className="p-6 pt-0 space-y-8 animate-in fade-in slide-in-from-top-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] font-bold tracking-widest uppercase text-white/40">Select Fit</label>
                      <button className="flex items-center space-x-1 text-[8px] text-[#D4AF37] uppercase font-bold group">
                        <Info size={10} /> <span>AI Size Suggestion</span>
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      {['Slim', 'Regular', 'Relaxed'].map(f => (
                        <button 
                          key={f}
                          onClick={() => setDesign({ ...design, fit: f as any })}
                          className={`flex-1 py-3 text-[9px] font-bold border transition-all ${design.fit === f ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/5 text-white/40'}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold tracking-widest uppercase text-white/40">Technical Size</label>
                    <div className="grid grid-cols-5 gap-2">
                      {product.sizes.map(s => (
                        <button 
                          key={s}
                          onClick={() => setDesign({ ...design, size: s })}
                          className={`py-3 text-[9px] font-bold border transition-all ${design.size === s ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/5 text-white/40 hover:border-white/20'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Style Details Card */}
            <div className={`border transition-all duration-500 ${openCard === 'details' ? 'border-[#D4AF37]/30 bg-[#161616]' : 'border-white/5 bg-[#141414]'}`}>
              <button onClick={() => toggleCard('details')} className="w-full p-6 flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded bg-white/5 ${openCard === 'details' ? 'text-[#D4AF37]' : 'text-white/40'}`}><Scissors size={18} /></div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">4. Artisan Details</h4>
                    <p className="text-[9px] text-white/30 uppercase mt-0.5">Hardware & Finish</p>
                  </div>
                </div>
                {openCard === 'details' ? <ChevronDown size={14} /> : <ChevronRight size={14} className="opacity-40" />}
              </button>
              
              {openCard === 'details' && (
                <div className="p-6 pt-0 space-y-6 animate-in fade-in slide-in-from-top-4">
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold tracking-widest uppercase text-white/40">Collar Structure</label>
                    <select 
                      value={design.details.collar}
                      onChange={(e) => setDesign({ ...design, details: { ...design.details, collar: e.target.value } })}
                      className="w-full bg-[#1A1A1A] border border-white/5 p-4 text-[10px] uppercase tracking-widest outline-none focus:border-[#D4AF37]"
                    >
                      {STYLE_DETAILS.collars.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold tracking-widest uppercase text-white/40">Stitch Signature</label>
                    <div className="grid grid-cols-1 gap-2">
                      {STYLE_DETAILS.stitching.map(s => (
                        <button 
                          key={s}
                          onClick={() => setDesign({ ...design, details: { ...design.details, stitching: s as any } })}
                          className={`p-4 border text-left text-[9px] uppercase tracking-widest font-bold transition-all ${design.details.stitching === s ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-[#D4AF37]' : 'border-white/5 text-white/40'}`}
                        >
                          {s} {s !== 'Tone-on-tone' && '(+ $15)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Personalization Card */}
            <div className={`border transition-all duration-500 ${openCard === 'personalize' ? 'border-[#D4AF37]/30 bg-[#161616]' : 'border-white/5 bg-[#141414]'}`}>
              <button onClick={() => toggleCard('personalize')} className="w-full p-6 flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded bg-white/5 ${openCard === 'personalize' ? 'text-[#D4AF37]' : 'text-white/40'}`}><TypeIcon size={18} /></div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">5. The Signature</h4>
                    <p className="text-[9px] text-white/30 uppercase mt-0.5">{design.text || 'None'}</p>
                  </div>
                </div>
                {openCard === 'personalize' ? <ChevronDown size={14} /> : <ChevronRight size={14} className="opacity-40" />}
              </button>
              
              {openCard === 'personalize' && (
                <div className="p-6 pt-0 space-y-6 animate-in fade-in slide-in-from-top-4">
                   <div className="space-y-4">
                    <label className="text-[9px] font-bold tracking-widest uppercase text-white/40">Embroidery Text</label>
                    <input 
                      type="text" 
                      maxLength={12}
                      value={design.text}
                      onChange={(e) => setDesign({ ...design, text: e.target.value.toUpperCase() })}
                      className="w-full bg-[#1A1A1A] border border-white/5 p-4 text-[10px] uppercase tracking-[0.3em] font-serif outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold tracking-widest uppercase text-white/40">Thread Luxe</label>
                    <div className="flex space-x-4">
                      {THREAD_COLORS.map(tc => (
                        <button 
                          key={tc.hex} 
                          onClick={() => setDesign({ ...design, threadColor: tc.hex })}
                          className={`w-8 h-8 rounded-full border transition-all ${design.threadColor === tc.hex ? 'border-[#D4AF37] scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: tc.hex }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold tracking-widest uppercase text-white/40">Placement</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['chest', 'back', 'sleeve-left', 'nape'].map(p => (
                        <button 
                          key={p} 
                          onClick={() => setDesign({ ...design, placement: p as any })}
                          className={`py-3 text-[8px] uppercase font-bold border transition-all ${design.placement === p ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/5 text-white/40'}`}
                        >
                          {p.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sticky Summary & CTA */}
          <div className="p-8 bg-[#141414] border-t border-white/5 space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] tracking-widest uppercase opacity-40">
                <span>Base Masterpiece</span>
                <span>$ {product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] tracking-widest uppercase opacity-40">
                <span>Customization Premium</span>
                <span>$ {(totalPrice - product.price).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[8px] tracking-[0.3em] uppercase opacity-40 font-black">Estimated Delivery</p>
                  <p className="text-[9px] text-[#D4AF37] font-bold">5-7 Business Days</p>
                </div>
                <span className="text-3xl font-serif text-white">$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => { setIsSaving(true); setTimeout(() => { setIsSaving(false); onSaveDesign(design); }, 800); }}
                className="flex-1 border border-white/10 py-5 text-[9px] font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all"
              >
                {isSaving ? 'Digitizing...' : 'Save Draft'}
              </button>
              <button 
                onClick={handleAddToCart}
                className="flex-[2] bg-[#D4AF37] text-black py-5 text-[9px] font-black tracking-[0.4em] uppercase transition-all shadow-xl shadow-[#D4AF37]/10 hover:brightness-110"
              >
                Assemble & Add
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Studio;
