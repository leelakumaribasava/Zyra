
import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User, X, ChevronDown } from 'lucide-react';
import { Page, Product } from '../../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, product?: Product | null) => void;
  cartCount: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, cartCount, isMenuOpen, setIsMenuOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { label: 'Shop', id: Page.Shop, items: ['Men', 'Women', 'Kids', 'Accessories'] },
    { label: 'Collections', id: Page.Shop, items: ['Minimal Embroidery', 'Luxury Streetwear', 'Zuno Signature', 'Winter 2025'] },
    { label: 'Customize', id: Page.Shop, items: ['Oversized Tees', 'Hoodies', 'Polo Tshirts', 'Cargos', 'Caps', 'Totes'] },
    { label: 'Corporate', id: Page.Corporate, items: [] },
    { label: 'Gifts', id: Page.Gift, items: ['Couples', 'Anniversaries', 'Fitness', 'Travel'] },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-white/5 h-20 px-6 lg:px-12 flex items-center justify-between">
      {/* Left Navigation */}
      <div className="flex items-center space-x-10">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hover:text-[#D4AF37] transition-colors lg:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <nav className="hidden lg:flex items-center space-x-10 text-[10px] font-bold tracking-[0.2em] uppercase">
          {navLinks.map((link) => (
            <div 
              key={link.label} 
              className="relative group py-8"
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => onNavigate(link.id as any)}
                className={`flex items-center space-x-1 hover:text-[#D4AF37] transition-colors ${currentPage === link.id && link.label !== 'Customize' ? 'text-[#D4AF37]' : 'text-white/70'} ${link.label === 'Customize' ? 'text-white border-b border-[#D4AF37]' : ''}`}
              >
                <span>{link.label}</span>
                {link.items.length > 0 && <ChevronDown size={10} className="opacity-40 group-hover:rotate-180 transition-transform" />}
              </button>

              {/* Mega Menu Dropdown */}
              {link.items.length > 0 && (
                <div className="absolute top-full left-0 w-64 bg-[#141414] border border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-6 space-y-4 shadow-2xl">
                  {link.items.map(sub => (
                    <button 
                      key={sub}
                      onClick={() => onNavigate(link.id as any)}
                      className="block text-left text-[9px] tracking-widest text-white/50 hover:text-[#D4AF37] transition-colors"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Center Logo */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        onClick={() => onNavigate(Page.Home)}
      >
        <h1 className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase font-light group-hover:scale-105 transition-transform duration-500">
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
            <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center">
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

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-[#0F0F0F] z-50 flex flex-col p-8 space-y-6 animate-in fade-in slide-in-from-left duration-300 overflow-y-auto">
          {navLinks.map(link => (
            <div key={link.label} className="space-y-4">
              <button 
                onClick={() => onNavigate(link.id as any)}
                className="text-3xl font-serif text-left block w-full"
              >
                {link.label}
              </button>
              {link.items.length > 0 && (
                <div className="flex flex-wrap gap-4 pl-4 border-l border-white/5">
                  {link.items.map(sub => (
                    <button key={sub} className="text-[10px] tracking-widest uppercase opacity-40">{sub}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
