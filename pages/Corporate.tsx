
import React, { useState } from 'react';
import { Page } from '../types';
import { Building2, Gift, Send, Users, Globe, Briefcase } from 'lucide-react';

interface CorporateProps {
  onNavigate: (page: Page) => void;
}

const Corporate: React.FC<CorporateProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-24 px-6 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/30">
          <Send size={40} className="text-[#D4AF37]" />
        </div>
        <h2 className="text-4xl font-serif">Inquiry Received</h2>
        <p className="text-white/40 max-w-sm mx-auto uppercase text-[10px] tracking-widest">Ref: CORP-9921</p>
        <p className="text-white/60 max-w-md mx-auto leading-relaxed">
          Our specialized corporate concierge will reach out to you within 4 business hours to discuss your bespoke requirements.
        </p>
        <button 
          onClick={() => onNavigate(Page.Home)}
          className="bg-white text-black px-12 py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
        {/* Content */}
        <div className="lg:w-1/2 space-y-16">
          <div className="space-y-6">
            <span className="text-[#D4AF37] text-sm font-bold tracking-[0.4em] uppercase">B2B & Gifting</span>
            <h1 className="text-6xl font-serif leading-tight">Elevate Your <br />Brand Identity</h1>
            <p className="text-white/60 text-lg leading-relaxed font-light">
              Zuno Zyra provides high-performance, luxury apparel for world-class organizations. From executive gifting to bespoke uniforms, we define your culture through craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { icon: <Briefcase />, title: 'Executive Gifting', desc: 'Premium gift boxing and personalization for key stakeholders.' },
              { icon: <Users />, title: 'Team Identity', desc: 'High-GSM uniform solutions that teams actually want to wear.' },
              { icon: <Globe />, title: 'Global Logistics', desc: 'Door-to-door delivery across continents for remote teams.' },
              { icon: <Gift />, title: 'Gift Concierge', desc: 'Curated selection of bespoke items with tailored branding.' }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="text-[#D4AF37]">{item.icon}</div>
                <h4 className="text-xs font-bold tracking-widest uppercase">{item.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:w-1/2">
          <div className="bg-[#141414] border border-white/5 p-12 space-y-10 shadow-2xl">
            <h2 className="text-3xl font-serif">Request Concierge Access</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase opacity-40">Company Name</label>
                  <input required className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase opacity-40">Industry</label>
                  <input required className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase opacity-40">Contact Name</label>
                <input required className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase opacity-40">Corporate Email</label>
                <input type="email" required className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase opacity-40">Estimated Quantity</label>
                <select className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                  <option className="bg-[#141414]">25 - 100 Pieces</option>
                  <option className="bg-[#141414]">101 - 500 Pieces</option>
                  <option className="bg-[#141414]">500+ Pieces (Enterprise)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase opacity-40">Message / Requirements</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#D4AF37] text-black py-6 text-xs font-bold tracking-[0.4em] uppercase transition-all flex items-center justify-center"
              >
                Send Inquiry <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
