"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function DuaSection() {
  return (
    <section className="py-24 px-4 bg-emerald-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <BookOpen className="w-10 h-10 text-gold-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Sacred Duas
          </h2>
          <p className="text-moon-silver max-w-xl mx-auto text-lg">
            Beautiful supplications to reflect upon during these blessed days.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Dua Card 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-gold p-8 md:p-12 rounded-3xl text-center space-y-6 relative group"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
            
            <p className="text-3xl md:text-5xl font-arabic text-gold-400 leading-[2] drop-shadow-sm">
              تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ
            </p>
            <div className="w-16 h-px bg-gold-500/30 mx-auto" />
            <p className="text-lg md:text-xl text-foreground font-sans">
              "May Allah accept [good deeds] from us and from you."
            </p>
          </motion.div>

          {/* Dua Card 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 md:p-12 rounded-3xl text-center space-y-6"
          >
            <p className="text-2xl md:text-4xl font-arabic text-emerald-400 leading-[2]">
              رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
            </p>
            <div className="w-16 h-px bg-emerald-500/30 mx-auto" />
            <p className="text-lg md:text-xl text-moon-silver font-sans">
              "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing."
            </p>
            <p className="text-sm text-emerald-500/80 font-serif italic">
              - Surah Al-Baqarah (2:127)
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
