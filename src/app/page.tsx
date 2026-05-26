"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
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

// ── Stars ─────────────────────────────────────────────────────
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top:  Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur:  Math.random() * 3 + 2,
  del:  Math.random() * 3,
}));

export default function HomePage() {
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
    <div className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <Toast />
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2023/04/07/audio_4d98d28a3f.mp3" />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pb-24 overflow-hidden">
        {/* Stars background */}
        <div className="absolute inset-0 pointer-events-none">
          {STARS.map(s => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
              animate={{ opacity: [0.1, 1, 0.1] }}
              transition={{ duration: s.dur, repeat: Infinity, delay: s.del, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1B4332]/30 rounded-full blur-[100px] pointer-events-none" />

        {/* Crescent moon */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-8 md:right-1/4 w-24 h-24 md:w-40 md:h-40 rounded-full border-r-[10px] border-b-[10px] border-[#C9A84C] rotate-45 opacity-80"
          style={{ boxShadow: "8px 8px 40px rgba(201,168,76,0.4)" }}
        />

        {/* Floating lanterns */}
        {[{ left: "5%", delay: 0 }, { left: "92%", delay: 1.5 }, { left: "50%", delay: 0.8 }].map((l, i) => (
          <motion.div
            key={i}
            className="absolute top-20 text-3xl pointer-events-none select-none"
            style={{ left: l.left }}
            animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, delay: l.delay, ease: "easeInOut" }}
          >
            🪔
          </motion.div>
        ))}

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#C9A84C] text-sm uppercase tracking-[0.3em] font-sans"
          >
            ✦ Eid ul Adha — 27 May 2026 ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-arabic text-[#C9A84C] leading-tight drop-shadow-[0_0_30px_rgba(201,168,76,0.5)]"
          >
            عید الاضحی مبارک
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl md:text-5xl font-serif font-bold"
            style={{ color: "var(--text)" }}
          >
            Eid ul Adha Mubarak
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            May this blessed Eid bring peace, happiness, success and endless blessings to you and your family.
            <br />
            <span className="font-urdu text-[#C9A84C] text-xl block mt-2">
              آپ کو عید مبارک — خوشی، امن اور برکت
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link
              href="/customize"
              id="create-card-btn"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#A07830] text-[#1A1A2E] font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_25px_rgba(201,168,76,0.4)] text-base"
            >
              <Sparkles className="w-5 h-5" /> Create Your Card
            </Link>
            <Link
              href="/gallery"
              id="browse-cards-btn"
              className="flex items-center justify-center gap-2 px-8 py-4 glass-gold text-[#C9A84C] font-bold rounded-full transition-all hover:scale-105 hover:bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-base"
            >
              <Images className="w-5 h-5" /> Browse Cards
            </Link>
          </motion.div>
        </div>

        {/* Music toggle */}
        <button
          id="music-toggle-btn"
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-50 p-4 glass-gold rounded-full shadow-lg hover:scale-110 transition-all"
          aria-label="Toggle Background Music"
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
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/10 via-transparent to-[#1B4332]/20 pointer-events-none rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Arabic */}
              <motion.p
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-arabic text-5xl md:text-7xl text-[#C9A84C] drop-shadow-[0_0_20px_rgba(201,168,76,0.4)] leading-relaxed"
              >
                عيد الأضحى مبارك
              </motion.p>

              <div className="w-20 h-px bg-[#C9A84C]/40" />

              {/* Main heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="font-serif text-3xl md:text-5xl font-bold"
                style={{ color: "var(--text)" }}
              >
                Eid ul Adha Mubarak — to Everyone! 🌙
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl leading-relaxed max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                On this blessed occasion of Eid ul Adha, we wish joy, peace, and endless barakah to every family, every home, and every heart. May Allah accept your sacrifices, forgive your sins, and shower His mercy upon all of us.
              </motion.p>

              {/* Urdu message */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="font-urdu text-xl md:text-2xl text-[#C9A84C] leading-[2.5] max-w-xl"
              >
                اللہ تعالیٰ آپ کی قربانیاں قبول فرمائے، آپ کو خوشیاں اور برکتیں عطا کرے۔ عید مبارک! 🤲
              </motion.p>

              <div className="w-20 h-px bg-[#C9A84C]/40" />

              {/* Dua */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="glass-gold rounded-2xl px-8 py-5 max-w-xl"
              >
                <p className="font-arabic text-2xl text-[#C9A84C] mb-2">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ</p>
                <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
                  "May Allah accept [good deeds] from us and from you."
                </p>
              </motion.div>

              {/* Decorative icons */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="flex gap-6 text-3xl select-none"
              >
                {["🌙", "✨", "🕌", "✨", "⭐"].map((icon, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                  >
                    {icon}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
