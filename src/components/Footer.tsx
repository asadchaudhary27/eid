import { Moon, Heart, Globe, Mail, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#05140f] pt-16 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* Crescent Icon */}
        <div className="mb-8 p-4 glass-gold rounded-full inline-block">
          <Moon className="w-8 h-8 text-gold-400" />
        </div>

        {/* Brand/Message */}
        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
          Eid ul Adha Mubarak
        </h2>
        
        <p className="text-moon-silver max-w-md mx-auto mb-10 font-sans">
          May the divine blessings of Allah bring you hope, faith, and joy on Eid ul Adha and forever.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6 mb-12">
          {[Globe, Mail, Share2].map((Icon, i) => (
            <a 
              key={i} 
              href="#" 
              className="p-3 glass rounded-full text-moon-silver hover:text-gold-400 hover:bg-gold-500/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Glowing Divider */}
        <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex items-center gap-2 text-sm text-moon-silver/60">
          Made by <span className="text-gold-400 font-semibold tracking-wider">Alpha</span>
        </div>
      </div>
    </footer>
  );
}
