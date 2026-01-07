
import React, { useState } from 'react';
import { Page, CustomizationState } from '../types';
import { User, Settings, Heart, History, Sparkles, Box, Edit2, LogOut } from 'lucide-react';

interface AccountProps {
  savedDesigns: CustomizationState[];
  onNavigate: (page: Page) => void;
}

const Account: React.FC<AccountProps> = ({ savedDesigns, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<'orders' | 'designs' | 'profile'>('orders');

  return (
    <div className="pt-32 pb-24 px-6 lg:px-24 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Navigation */}
        <aside className="lg:w-72 shrink-0 space-y-12">
          <div className="flex items-center space-x-6 pb-12 border-b border-white/10">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-2xl font-serif">A</div>
            <div>
              <h2 className="text-xl font-serif">Alexander Zyra</h2>
              <p className="text-[10px] tracking-widest uppercase opacity-40">Elite Member Since 2023</p>
            </div>
          </div>

          <nav className="space-y-4">
            {[
              { id: 'orders', icon: <Box size={18} />, label: 'My Orders' },
              { id: 'designs', icon: <Sparkles size={18} />, label: 'Saved Designs' },
              { id: 'profile', icon: <User size={18} />, label: 'Profile Details' },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center space-x-4 px-4 py-4 text-sm tracking-widest uppercase transition-all ${activeSection === item.id ? 'bg-white/[0.05] text-[#D4AF37] border-l-2 border-[#D4AF37]' : 'text-white/40 hover:text-white hover:bg-white/[0.02]'}`}
              >
                {item.icon}
                <span className="font-bold">{item.label}</span>
              </button>
            ))}
            <div className="pt-8 space-y-4">
              <button className="w-full flex items-center space-x-4 px-4 py-4 text-sm tracking-widest uppercase text-white/20 hover:text-white transition-colors">
                <Settings size={18} />
                <span>Account Settings</span>
              </button>
              <button className="w-full flex items-center space-x-4 px-4 py-4 text-sm tracking-widest uppercase text-red-400/40 hover:text-red-400 transition-colors">
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-grow min-h-[600px]">
          {activeSection === 'orders' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <h1 className="text-4xl font-serif">Order History</h1>
              <div className="space-y-8">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 p-8 flex flex-col md:flex-row justify-between gap-8 group hover:border-[#D4AF37]/20 transition-all">
                    <div className="flex gap-8">
                      <div className="w-24 h-28 bg-[#1A1A1A] shrink-0 border border-white/5">
                        <img src={`https://picsum.photos/200/300?random=${i+10}`} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="space-y-3">
                        <p className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-bold">Delivered Jan {12 + i}, 2024</p>
                        <h3 className="text-xl font-serif">Signature Zyra Hoodie</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Order #ZZ-9281-B • $210.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="px-8 py-4 border border-white/10 hover:border-white text-[10px] tracking-widest uppercase font-bold transition-all">Reorder Design</button>
                      <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-[10px] tracking-widest uppercase font-bold transition-all">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'designs' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <h1 className="text-4xl font-serif">Saved Masterpieces</h1>
              {savedDesigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {savedDesigns.map((d, i) => (
                    <div key={i} className="group relative aspect-[3/4] bg-[#1A1A1A] border border-white/5 overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl opacity-60" style={{ fontFamily: d.font, color: d.threadColor }}>{d.text}</span>
                       </div>
                       <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
                          <button 
                            onClick={() => onNavigate(Page.Studio)}
                            className="w-full bg-[#D4AF37] text-black py-4 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center space-x-2"
                          >
                            <Edit2 size={14} />
                            <span>Continue Crafting</span>
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center space-y-6 bg-white/[0.02] border border-white/5 border-dashed">
                  <p className="text-white/30 tracking-widest uppercase text-xs">No designs found</p>
                  <button 
                    onClick={() => onNavigate(Page.Shop)}
                    className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase border-b border-[#D4AF37] pb-1"
                  >
                    Start Your First Design
                  </button>
                </div>
              )}
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="space-y-12 animate-in fade-in duration-500 max-w-2xl">
              <h1 className="text-4xl font-serif">Profile Details</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase opacity-40">First Name</label>
                  <input type="text" value="Alexander" className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase opacity-40">Last Name</label>
                  <input type="text" value="Zyra" className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] tracking-widest uppercase opacity-40">Email Address</label>
                  <input type="email" value="alexander@zyra.luxury" className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
              </div>
              <button className="bg-[#D4AF37] text-black px-12 py-5 text-xs font-bold tracking-widest uppercase transition-all transform hover:scale-105">
                Save Changes
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;
