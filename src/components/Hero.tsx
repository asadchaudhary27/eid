"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, Send } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const moonY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-emerald-950 z-[-2]"></div>
      
      {/* Stars Particle System (Interactive) */}
      <div 
        className="absolute inset-0 z-[-1] opacity-60"
        onMouseMove={(e) => {
          const stars = document.querySelectorAll('.star-particle');
          const x = (e.clientX / window.innerWidth) - 0.5;
          const y = (e.clientY / window.innerHeight) - 0.5;
          
          stars.forEach((star) => {
            const speed = parseFloat((star as HTMLElement).dataset.speed || '1');
            (star as HTMLElement).style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
          });
        }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white star-particle transition-transform duration-75 ease-out"
            data-speed={Math.random() * 2 + 0.5}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255,255,255,0.8)`,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glowing Crescent Moon */}
      <motion.div 
        style={{ y: moonY, opacity }}
        className="absolute top-10 md:top-20 right-10 md:right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full border-r-[10px] md:border-r-[20px] border-b-[10px] md:border-b-[20px] border-gold-400 rotate-45 blur-[2px] z-0"
        animate={{
          boxShadow: [
            "10px 10px 50px rgba(251, 191, 36, 0.2)",
            "10px 10px 80px rgba(251, 191, 36, 0.4)",
            "10px 10px 50px rgba(251, 191, 36, 0.2)",
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fog/Light overlay */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-emerald-950 to-transparent z-[1]"></div>

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-gold-400 text-5xl md:text-8xl font-arabic mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        >
          عيد مبارك
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-7xl font-serif font-bold text-foreground mb-6"
        >
          Eid ul Adha Mubarak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-2xl text-moon-silver max-w-2xl font-sans mb-10 leading-relaxed"
        >
          May this blessed Eid bring peace, happiness, success, and endless blessings to you and your family.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="glass-gold px-8 py-4 rounded-full font-semibold text-gold-400 flex items-center justify-center gap-2 hover:bg-gold-500/20 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300">
            <Send className="w-5 h-5" />
            Send Wishes
          </button>
          <button className="glass px-8 py-4 rounded-full font-semibold text-foreground flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
            <Heart className="w-5 h-5 text-rose-400" />
            View Family Message
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
