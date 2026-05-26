"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Sparkles, Palette } from "lucide-react";
import html2canvas from "html2canvas";

const themes = [
  {
    id: "classic",
    name: "Classic Gold",
    bgClass: "bg-gradient-to-br from-[#1a1300] via-[#4d3b00] to-[#1a1300]",
    overlay: "bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-30",
    textClass: "text-gold-400"
  },
  {
    id: "emerald",
    name: "Emerald Night",
    bgClass: "bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22]",
    overlay: "bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-30",
    textClass: "text-emerald-300"
  },
  {
    id: "minimal",
    name: "Royal Purple",
    bgClass: "bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#2e1065]",
    overlay: "bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-30",
    textClass: "text-purple-300"
  }
];

export default function GreetingCardGenerator() {
  const [name, setName] = useState("Your Family Name");
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        useCORS: true, // Allow external images
        backgroundColor: null,
      });
      
      const link = document.createElement("a");
      link.download = `Eid-Mubarak-${name.replace(/\s+/g, '-')}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to download card. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-24 px-4 bg-emerald-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-400 mb-4 flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              Generate Your Card
            </h2>
            <p className="text-moon-silver text-lg leading-relaxed">
              Create a personalized luxury Eid greeting card to share with your loved ones. Download it as a high-quality JPG.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gold-400 uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-4 h-4" /> Choose Design
              </label>
              <div className="flex gap-3 flex-wrap">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeTheme.id === theme.id 
                        ? 'bg-gold-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.4)]' 
                        : 'glass text-moon-silver hover:bg-white/10'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gold-400 uppercase tracking-widest">
                Enter Your Name
              </label>
              <input 
                type="text" 
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. The Khan Family"
                className="w-full bg-black/20 border border-gold-500/30 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all font-sans text-lg shadow-inner"
              />
            </div>
          </div>

          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className={`glass-gold px-8 py-4 rounded-xl font-semibold text-gold-400 flex items-center justify-center gap-3 hover:bg-gold-500/20 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300 w-full sm:w-auto hover:scale-105 ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <Download className={`w-5 h-5 ${isDownloading ? 'animate-bounce' : ''}`} />
            {isDownloading ? 'Generating JPG...' : 'Download Card'}
          </button>
        </motion.div>

        {/* Right Side: Card Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group flex justify-center"
        >
          {/* Card Wrapper (This specific div gets captured by html2canvas) */}
          <div 
            ref={cardRef}
            className={`relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${activeTheme.bgClass} transition-colors duration-700`}
          >
            {/* Pattern Overlay */}
            <div className={`absolute inset-0 ${activeTheme.overlay} transition-all duration-700 mix-blend-overlay`} />
            
            {/* Card Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-center">
              <div className={`${activeTheme.textClass} text-4xl md:text-5xl font-arabic mb-4 drop-shadow-lg transition-colors duration-700`}>
                عيد مبارك
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 drop-shadow-md">
                Eid ul Adha Mubarak
              </h3>
              <div className="w-16 h-px bg-white/50 mb-6" />
              <p className="text-gray-300 text-sm tracking-widest uppercase mb-2">Warm wishes from</p>
              <p className={`${activeTheme.textClass} text-2xl md:text-3xl font-serif italic drop-shadow-md break-words w-full px-4 transition-colors duration-700`}>
                {name || "Your Family Name"}
              </p>
            </div>
            
            {/* Border glow */}
            <div className="absolute inset-0 border-4 border-gold-400/20 rounded-3xl pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
