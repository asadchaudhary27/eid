"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { templates, allCategories, type CardCategory } from "@/data/templates";
import type { CardTemplate } from "@/data/templates";

function CardPreviewThumbnail({ t }: { t: CardTemplate }) {
  const [tapped, setTapped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative rounded-2xl overflow-hidden aspect-square shadow-lg"
    >
      {/* Card background */}
      <div className={`absolute inset-0 ${t.bgClass}`} />
      <div className={`absolute inset-0 ${t.borderClass}`} />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')" }}
      />

      {/* Card content — always visible */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 gap-1.5">
        <div className="text-3xl">{t.decorIcon}</div>
        <p className={`text-sm font-bold leading-tight ${t.textClass} ${t.headingFont}`}>{t.headingEn}</p>
        <p className={`text-[10px] ${t.subTextClass} opacity-70`}>Wishing you peace</p>
      </div>

      {/* Category badge */}
      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[9px] text-white font-medium uppercase tracking-wide">
        {t.category}
      </div>

      {/* ── Desktop: show overlay on hover ───────── */}
      <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-200 flex-col items-center justify-center gap-3">
        <p className="text-white font-semibold text-sm">{t.name}</p>
        <Link
          href={`/customize?template=${t.id}`}
          id={`use-template-${t.id}`}
          className="px-5 py-2.5 bg-[#C9A84C] hover:bg-[#A07830] text-[#1A1A2E] text-sm font-bold rounded-full transition-all hover:scale-105 min-h-[44px] flex items-center"
        >
          Use This Template
        </Link>
      </div>

      {/* ── Mobile: always-visible button at bottom ── */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 p-2">
        <Link
          href={`/customize?template=${t.id}`}
          id={`use-template-mobile-${t.id}`}
          className="block w-full py-2.5 bg-[#C9A84C] text-[#1A1A2E] text-xs font-bold rounded-xl text-center active:scale-95 transition-all min-h-[44px] flex items-center justify-center"
        >
          Use Template
        </Link>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState<string>("All");

  const filtered = active === "All"
    ? templates
    : templates.filter(t => t.category === (active as CardCategory));

  return (
    <div className="min-h-screen px-4 py-10 pb-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3" style={{ color: "var(--text)" }}>
            Card Gallery
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Browse {templates.length} beautiful Eid card designs. Tap any card to customize it.
          </p>
        </motion.div>

        {/* Filter buttons — horizontally scrollable on mobile */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-1 -mx-4 px-4 md:flex-wrap md:justify-center md:overflow-visible md:mx-0 md:px-0">
          {allCategories.map(cat => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                active === cat
                  ? "bg-[#C9A84C] text-[#1A1A2E] shadow-md"
                  : "glass text-[var(--text)] hover:bg-[#C9A84C]/20"
              }`}
            >
              {cat}{cat !== "All" ? ` (${templates.filter(t => t.category === cat).length})` : ` (${templates.length})`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
        >
          <AnimatePresence>
            {filtered.map(t => (
              <CardPreviewThumbnail key={t.id} t={t} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/customize"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#A07830] text-[#1A1A2E] font-bold rounded-full text-base transition-all hover:scale-105 shadow-lg min-h-[52px]"
          >
            ✨ Start Customizing
          </Link>
        </div>
      </div>
    </div>
  );
}
