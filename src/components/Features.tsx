"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Volume2 } from "lucide-react";

export default function Features() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set to next Eid ul Adha (approximate for demonstration)
    const targetDate = new Date("2026-06-16T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 bg-emerald-950 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Countdown Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-gold p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-8"
        >
          <div className="flex items-center gap-3 text-gold-400">
            <Timer className="w-8 h-8" />
            <h3 className="text-2xl font-serif font-semibold">Time Until Eid Prayer</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-4 w-full">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 glass rounded-2xl flex items-center justify-center text-2xl sm:text-4xl font-bold text-foreground mb-2 shadow-inner">
                  {value.toString().padStart(2, '0')}
                </div>
                <span className="text-sm text-moon-silver uppercase tracking-wider">{unit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Takbeer Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
          
          <div className="relative z-10 flex items-center gap-3 text-emerald-400">
            <Volume2 className="w-8 h-8" />
            <h3 className="text-2xl font-serif font-semibold text-emerald-400">Takbeer</h3>
          </div>

          <div className="relative z-10 space-y-4">
            <p className="text-3xl md:text-4xl font-arabic text-gold-400 leading-relaxed">
              الله أكبر، الله أكبر، لا إله إلا الله، والله أكبر، الله أكبر، ولله الحمد
            </p>
            <p className="text-moon-silver font-sans text-sm md:text-base leading-relaxed max-w-md mx-auto">
              Allahu Akbar, Allahu Akbar, La ilaha illallah, Allahu Akbar, Allahu Akbar, wa lillahil hamd
            </p>
          </div>
          
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 mt-4 px-6 py-2 glass-gold rounded-full text-gold-400 text-sm font-semibold cursor-pointer hover:bg-gold-500/20 transition-colors"
          >
            Play Audio
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
