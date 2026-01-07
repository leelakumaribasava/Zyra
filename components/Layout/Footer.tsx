
import React from 'react';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { Page } from '../../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-24 pb-12 px-6 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif tracking-widest uppercase">Zuno Zyra</h2>
          <p className="text-white/60 leading-relaxed max-w-xs">
            Defining modern luxury through digital craftsmanship and bespoke personalization. Every stitch tells your story.
          </p>
          <div className="flex space-x-4">
            <Instagram size={20} className="text-white/40 hover:text-[#D4AF37] cursor-pointer transition-colors" />
            <Twitter size={20} className="text-white/40 hover:text-[#D4AF37] cursor-pointer transition-colors" />
            <Facebook size={20} className="text-white/40 hover:text-[#D4AF37] cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#D4AF37]">Shop</h3>
          <ul className="space-y-4 text-white/50 text-sm">
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate(Page.Shop)}>All Collections</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate(Page.Shop)}>Bespoke Hoodies</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate(Page.Shop)}>Essential Tees</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate(Page.Corporate)}>Corporate Orders</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#D4AF37]">Inspiration</h3>
          <ul className="space-y-4 text-white/50 text-sm">
            <li className="hover:text-white cursor-pointer">The Craftsmanship</li>
            <li className="hover:text-white cursor-pointer">Bespoke Stories</li>
            <li className="hover:text-white cursor-pointer">Sustainability</li>
            <li className="hover:text-white cursor-pointer">Zuno Club</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#D4AF37]">Newsletter</h3>
          <p className="text-white/50 text-sm">Join our inner circle for exclusive access to bespoke launches.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-white transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] tracking-[0.2em] uppercase text-white/30">
        <div className="flex space-x-8 mb-4 md:mb-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Refund Policy</span>
        </div>
        <p>© 2024 Zuno Zyra. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
