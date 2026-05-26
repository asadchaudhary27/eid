"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Images, Timer, Music, Music2 } from "lucide-react";
import Toast from "@/components/Toast";

// ── Countdown ─────────────────────────────────────────────────
function useCountdown(target: Date) {
  const [mounted, setMounted] = useState(false);
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    setMounted(true);
    setDiff(target.getTime() - Date.now());
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const total = Math.max(0, diff);
  return {
    mounted,
    days:    Math.floor(total / 86400000),
    hours:   Math.floor((total % 86400000) / 3600000),
    minutes: Math.floor((total % 3600000) / 60000),
    seconds: Math.floor((total % 60000) / 1000),
  };
}

export default function HomePage() {
  const router = useRouter();
  const eidDate = new Date("2026-05-27T06:00:00+05:00");
  const { mounted, days, hours, minutes, seconds } = useCountdown(eidDate);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
    setPlaying(p => !p);
  };

  return (
    <div style={{ background: "var(--bg)" }}>
      <Toast />
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2023/04/07/audio_4d98d28a3f.mp3" />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pb-20 overflow-hidden">

        {/* Stars — pure CSS, no framer-motion, no pointer-event issues */}
        <style>{`
          @keyframes twinkle-star {
            0%,100%{opacity:0.1;transform:scale(1)}
            50%{opacity:1;transform:scale(1.3)}
          }
          .star {
            position:absolute;
            border-radius:50%;
            background:white;
            pointer-events:none;
            animation:twinkle-star var(--dur,3s) ease-in-out infinite;
            animation-delay:var(--del,0s);
          }
          @keyframes bob {
            0%,100%{transform:translateY(0)}
            50%{transform:translateY(20px)}
          }
          @keyframes lantern-sway {
            0%,100%{transform:translateY(-15px) rotate(-5deg)}
            50%{transform:translateY(15px) rotate(5deg)}
          }
          @keyframes moon-float {
            0%,100%{transform:rotate(45deg) translateY(0)}
            50%{transform:rotate(45deg) translateY(20px)}
          }
        `}</style>

        {/* 30 CSS-only stars (no motion.div, no pointer-event leakage) */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${(i * 37 + 11) % 100}%`,
              left: `${(i * 61 + 7) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              ["--dur" as string]: `${2 + (i % 4)}s`,
              ["--del" as string]: `${(i % 30) * 0.1}s`,
            }}
          />
        ))}

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1B4332]/30 rounded-full blur-[100px] pointer-events-none" />

        {/* Crescent moon — CSS animation only, pointer-events-none */}
        <div
          className="absolute top-16 right-8 md:right-1/4 w-24 h-24 md:w-40 md:h-40 rounded-full border-r-[10px] border-b-[10px] border-[#C9A84C] opacity-80 pointer-events-none"
          style={{ animation: "moon-float 6s ease-in-out infinite", boxShadow: "8px 8px 40px rgba(201,168,76,0.4)" }}
        />

        {/* Floating lanterns — pointer-events-none */}
        {["5%", "92%", "50%"].map((left, i) => (
          <div
            key={i}
            className="absolute top-20 text-3xl select-none pointer-events-none"
            style={{ left, animation: `lantern-sway ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.8}s` }}
          >
            🪔
          </div>
        ))}

        {/* Hero content — guaranteed on top, full clickability */}
        <div className="relative text-center max-w-3xl mx-auto flex flex-col items-center gap-6" style={{ zIndex: 10 }}>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#C9A84C] text-sm uppercase tracking-[0.3em] font-sans pointer-events-none"
          >
            ✦ Eid ul Adha — 27 May 2026 ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-arabic text-[#C9A84C] leading-tight drop-shadow-[0_0_30px_rgba(201,168,76,0.5)] pointer-events-none"
          >
            عید الاضحی مبارک
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl md:text-5xl font-serif font-bold pointer-events-none"
            style={{ color: "var(--text)" }}
          >
            Eid ul Adha Mubarak
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl max-w-2xl leading-relaxed pointer-events-none"
            style={{ color: "var(--text-secondary)" }}
          >
            May this blessed Eid bring peace, happiness, success and endless blessings to you and your family.
            <span className="font-urdu text-[#C9A84C] text-xl block mt-2">
              آپ کو عید مبارک — خوشی، امن اور برکت
            </span>
          </motion.p>

          {/* CTA Buttons — plain <a> tags guaranteed to work on all mobile browsers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
            style={{ position: "relative", zIndex: 20 }}
          >
            <a
              href="/customize"
              id="create-card-btn"
              className="flex items-center justify-center gap-2 px-8 py-5 bg-[#C9A84C] text-[#1A1A2E] font-bold rounded-full shadow-[0_0_25px_rgba(201,168,76,0.4)] text-base active:opacity-80"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent", minHeight: 56 } as React.CSSProperties}
            >
              <Sparkles className="w-5 h-5 flex-shrink-0" /> Create Your Card
            </a>
            <a
              href="/gallery"
              id="browse-cards-btn"
              className="flex items-center justify-center gap-2 px-8 py-5 glass-gold text-[#C9A84C] font-bold rounded-full border border-[#C9A84C]/40 text-base active:opacity-80"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent", minHeight: 56 } as React.CSSProperties}
            >
              <Images className="w-5 h-5 flex-shrink-0" /> Browse Cards
            </a>
          </motion.div>
        </div>

        {/* Music toggle */}
        <button
          id="music-toggle-btn"
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-50 p-4 glass-gold rounded-full shadow-lg active:scale-95 transition-transform"
          aria-label="Toggle Background Music"
          style={{ touchAction: "manipulation" }}
        >
          {playing ? <Music2 className="w-5 h-5 text-[#C9A84C] animate-pulse" /> : <Music className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />}
        </button>
      </section>

      {/* ── COUNTDOWN ─────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex items-center gap-3 text-[#C9A84C]">
              <Timer className="w-7 h-7" />
              <h2 className="text-2xl font-serif font-semibold" style={{ color: "var(--text)" }}>
                Eid ul Adha is Coming
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-2xl">
              {[{ label: "Days", value: days }, { label: "Hours", value: hours }, { label: "Minutes", value: minutes }, { label: "Seconds", value: seconds }].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-square glass rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-bold text-[#C9A84C]">
                    {mounted ? String(value).padStart(2, "0") : "--"}
                  </div>
                  <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EID MESSAGE ─────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: "var(--bg)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="glass rounded-3xl p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/10 via-transparent to-[#1B4332]/20 pointer-events-none rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent pointer-events-none" />

            <div className="relative flex flex-col items-center gap-6" style={{ zIndex: 1 }}>
              <p className="font-arabic text-5xl md:text-7xl text-[#C9A84C] drop-shadow-[0_0_20px_rgba(201,168,76,0.4)] leading-relaxed">
                عيد الأضحى مبارك
              </p>
              <div className="w-20 h-px bg-[#C9A84C]/40" />
              <h2 className="font-serif text-3xl md:text-5xl font-bold" style={{ color: "var(--text)" }}>
                Eid ul Adha Mubarak — to Everyone! 🌙
              </h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                On this blessed occasion of Eid ul Adha, we wish joy, peace, and endless barakah to every family, every home, and every heart. May Allah accept your sacrifices, forgive your sins, and shower His mercy upon all of us.
              </p>
              <p className="font-urdu text-xl md:text-2xl text-[#C9A84C] leading-[2.5] max-w-xl">
                اللہ تعالیٰ آپ کی قربانیاں قبول فرمائے، آپ کو خوشیاں اور برکتیں عطا کرے۔ عید مبارک! 🤲
              </p>
              <div className="w-20 h-px bg-[#C9A84C]/40" />
              <div className="glass-gold rounded-2xl px-8 py-5 max-w-xl">
                <p className="font-arabic text-2xl text-[#C9A84C] mb-2">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ</p>
                <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
                  "May Allah accept [good deeds] from us and from you."
                </p>
              </div>
              <div className="flex gap-6 text-3xl select-none pointer-events-none">
                {["🌙", "✨", "🕌", "✨", "⭐"].map((icon, i) => (
                  <span
                    key={i}
                    style={{ display: "inline-block", animation: `bob 3s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
