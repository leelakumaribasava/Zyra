
import React, { useState } from 'react';
import { Page } from '../types';
import { Building2, Gift, Send, Users, Globe, Briefcase, Shirt, Star, Calendar } from 'lucide-react';

interface CorporateProps {
  onNavigate: (page: Page) => void;
}

const Corporate: React.FC<CorporateProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const corporateServices = [
    { title: 'Premium T-Shirts', icon: <Shirt size={20} />, items: ['Staff Basics', 'Executive Cotton', 'Marketing Tees'] },
    { title: 'Atelier Hoodies', icon: <Star size={20} />, items: ['Corporate Gifts', 'High-GSM Sweats', 'Zip Hoodies'] },
    { title: 'Event Outfits', icon: <Calendar size={20} />, items: ['Summits', 'Launch Parties', 'Custom Caps'] },
    { title: 'Staff Uniforms', icon: <Building2 size={20} />, items: ['Front Desk Polo', 'Hospitality Wear', 'Accessories'] },
  ];

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div className="pt-48 pb-24 px-6 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/30">
          <Send size={40} className="text-[#D4AF37]" />
        </div>
        <h2 className="text-4xl font-serif">Inquiry Transmitted</h2>
        <p className="text-white/60 max-w-md mx-auto leading-relaxed">Our B2B concierge will prepare a tailored proposal within 4 business hours.</p>
        <button onClick={() => onNavigate(Page.Home)} className="bg-white text-black px-12 py-5 text-xs font-bold tracking-[0.3em] uppercase">Return to Home</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 lg:px-24 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div className="space-y-6">
            <span className="text-[#D4AF37] text-sm font-bold tracking-[0.4em] uppercase">Enterprise Solutions</span>
            <h1 className="text-7xl font-serif leading-tight">Beyond the <br />Standard Uniform</h1>
            <p className="text-white/50 text-xl font-light leading-relaxed">
              Zuno Zyra partners with world-leading brands to provide bespoke apparel that reflects organizational excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {corporateServices.map((service, i) => (
              <div key={i} className="p-8 bg-white/[0.02] border border-white/5 space-y-6 hover:border-[#D4AF37]/30 transition-all group">
                <div className="text-[#D4AF37] group-hover:scale-110 transition-transform">{service.icon}</div>
                <h4 className="text-xs font-black tracking-widest uppercase">{service.title}</h4>
                <ul className="space-y-2">
                  {service.items.map(item => (
                    <li key={item} className="text-[10px] text-white/30 uppercase tracking-widest">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 p-12 space-y-10 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl"></div>
          <h2 className="text-3xl font-serif">Concierge Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input placeholder="Organization" required className="bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
              <input placeholder="Contact Name" required className="bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <input placeholder="Work Email" type="email" required className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
            <select className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors appearance-none">
              <option className="bg-[#141414]">Focus: Executive Gifting</option>
              <option className="bg-[#141414]">Focus: Event Outfits</option>
              <option className="bg-[#141414]">Focus: Staff Uniforms</option>
            </select>
            <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
            <button type="submit" className="w-full bg-[#D4AF37] text-black py-6 text-xs font-bold tracking-[0.4em] uppercase transition-all shadow-xl shadow-[#D4AF37]/10">Launch Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
