"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { templates, allCategories, type CardCategory } from "@/data/templates";
import type { CardTemplate } from "@/data/templates";

function CardPreviewThumbnail({ t }: { t: CardTemplate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative group rounded-2xl overflow-hidden cursor-pointer aspect-square shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card background */}
      <div className={`absolute inset-0 ${t.bgClass} transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`} />
      <div className={`absolute inset-0 ${t.borderClass}`} />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')" }}
      />

      {/* Card content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 gap-2">
        <div className="text-3xl">{t.decorIcon}</div>
        <p className={`text-lg font-bold ${t.textClass} ${t.headingFont}`}>{t.headingEn}</p>
        <p className={`text-xs ${t.subTextClass} opacity-80`}>Wishing you peace</p>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[10px] text-white font-medium uppercase tracking-wide">
        {t.category}
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3"
          >
            <p className="text-white font-semibold text-sm">{t.name}</p>
            <Link
              href={`/customize?template=${t.id}`}
              id={`use-template-${t.id}`}
              className="px-5 py-2 bg-[#C9A84C] hover:bg-[#A07830] text-[#1A1A2E] text-sm font-bold rounded-full transition-all hover:scale-105"
            >
              Use This Template
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState<string>("All");

  const filtered = active === "All"
    ? templates
    : templates.filter(t => t.category === (active as CardCategory));

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: "var(--text)" }}>
            Card Gallery
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Browse {templates.length} beautiful Eid card designs. Hover any card and click "Use This Template" to customize it.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allCategories.map(cat => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? "bg-[#C9A84C] text-[#1A1A2E] shadow-md"
                  : "glass text-[var(--text)] hover:bg-[#C9A84C]/20 hover:text-[#C9A84C]"
              }`}
            >
              {cat} {cat !== "All" ? `(${templates.filter(t => t.category === cat).length})` : `(${templates.length})`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filtered.map(t => (
              <CardPreviewThumbnail key={t.id} t={t} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/customize"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#A07830] text-[#1A1A2E] font-bold rounded-full text-base transition-all hover:scale-105 shadow-lg"
          >
            ✨ Start Customizing
          </Link>
        </div>
      </div>
    </div>
  );
}
