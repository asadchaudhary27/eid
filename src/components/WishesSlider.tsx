"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const wishes = [
  {
    text: "May the divine blessings of Allah bring you hope, faith, and joy on Eid ul Adha and forever. Happy Eid ul Adha!",
    author: "Islamic Quote",
  },
  {
    text: "On this blessed occasion of Eid, wishing you and your family joy, happiness, peace and prosperity!",
    author: "Eid Greetings",
  },
  {
    text: "May Allah accept your good deeds, forgive your transgressions and sins and ease the suffering of all peoples around the globe.",
    author: "Traditional Dua",
  },
  {
    text: "He who has no compassion for others will have no compassion shown to him.",
    author: "Prophet Muhammad (PBUH)",
  }
];

export default function WishesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % wishes.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);

  return (
    <section className="py-24 px-4 bg-[#05140f] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Quote className="w-12 h-12 text-gold-400 mx-auto mb-8 opacity-50" />
        
        <div className="relative h-[250px] md:h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full px-12"
            >
              <p className="text-2xl md:text-4xl font-serif text-foreground leading-relaxed mb-6">
                "{wishes[currentIndex].text}"
              </p>
              <p className="text-gold-400 font-sans tracking-widest uppercase text-sm">
                — {wishes[currentIndex].author} —
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-6 mt-12">
          <button 
            onClick={prevSlide}
            className="p-4 glass rounded-full hover:bg-gold-500/20 hover:text-gold-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-4 glass rounded-full hover:bg-gold-500/20 hover:text-gold-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
