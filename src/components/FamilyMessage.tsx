"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function FamilyMessage() {
  return (
    <section className="relative py-32 px-4 bg-emerald-950 overflow-hidden flex items-center justify-center min-h-screen">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="glass-gold p-8 md:p-16 rounded-3xl relative overflow-hidden group">
          {/* Animated border glow */}
          <div className="absolute inset-0 border-2 border-transparent bg-[linear-gradient(45deg,transparent,rgba(251,191,36,0.3),transparent)] bg-[length:200%_200%] animate-[bg-pan_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 text-rose-400 fill-rose-400/20" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gold-400">
              Eid Mubarak to our beloved family ❤️
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-moon-silver font-sans leading-relaxed">
              <p>
                May Allah fill our home with happiness, barakah, peace, and togetherness.<br/>
                May every sacrifice bring us closer to Allah and strengthen the bond of our family.
              </p>
              
              <p>
                On this beautiful Eid ul Adha, may your hearts be filled with gratitude, your lives with success, and your home with endless smiles.
              </p>
              
              <p>
                May Allah accept our prayers, sacrifices, and duas.
              </p>
              
              <p className="font-semibold text-white">
                Wishing love, joy, health, and prosperity to every member of our family.
              </p>
            </div>

            <div className="pt-8 flex items-center justify-center gap-4 text-gold-400 text-2xl font-serif italic">
              <Sparkles className="w-6 h-6" />
              <span>Eid Mubarak 🌙✨</span>
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          
          {/* Floating hearts */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Heart className="w-6 h-6" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
