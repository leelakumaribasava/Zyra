
import React from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Page, Product } from '../../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, product?: Product | null) => void;
  cartCount: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, cartCount, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-white/5 h-20 px-6 lg:px-12 flex items-center justify-between">
      {/* Left Navigation */}
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hover:text-[#D4AF37] transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest uppercase">
          <button 
            onClick={() => onNavigate(Page.Shop)}
            className={`hover:text-[#D4AF37] transition-colors ${currentPage === Page.Shop ? 'text-[#D4AF37]' : 'text-white/70'}`}
          >
            Collections
          </button>
          <button 
            onClick={() => onNavigate(Page.Shop)}
            className="text-[#D4AF37] hover:brightness-125 transition-all font-semibold"
          >
            Customize
          </button>
          <button 
            onClick={() => onNavigate(Page.Corporate)}
            className={`hover:text-[#D4AF37] transition-colors ${currentPage === Page.Corporate ? 'text-[#D4AF37]' : 'text-white/70'}`}
          >
            Corporate
          </button>
        </nav>
      </div>

      {/* Center Logo */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => onNavigate(Page.Home)}
      >
        <h1 className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase font-light">
          Zuno Zyra
        </h1>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6">
        <button className="hover:text-[#D4AF37] transition-colors hidden sm:block">
          <Search size={22} />
        </button>
        <button 
          onClick={() => onNavigate(Page.Cart)}
          className="hover:text-[#D4AF37] transition-colors relative"
        >
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => onNavigate(Page.Account)}
          className={`hover:text-[#D4AF37] transition-colors ${currentPage === Page.Account ? 'text-[#D4AF37]' : ''}`}
        >
          <User size={22} />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-[#0F0F0F] z-50 flex flex-col p-8 space-y-8 animate-in fade-in slide-in-from-left duration-300">
          <button onClick={() => onNavigate(Page.Shop)} className="text-4xl font-serif text-left">Collections</button>
          <button onClick={() => onNavigate(Page.Shop)} className="text-4xl font-serif text-left gold-text">Customize Now</button>
          <button onClick={() => onNavigate(Page.Corporate)} className="text-4xl font-serif text-left">Corporate Gifting</button>
          <button onClick={() => onNavigate(Page.Account)} className="text-4xl font-serif text-left text-white/50">My Profile</button>
          <div className="mt-auto border-t border-white/10 pt-8 flex space-x-6">
            <span className="text-xs tracking-widest uppercase opacity-50">Support</span>
            <span className="text-xs tracking-widest uppercase opacity-50">Legal</span>
            <span className="text-xs tracking-widest uppercase opacity-50">Craftsmanship</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
