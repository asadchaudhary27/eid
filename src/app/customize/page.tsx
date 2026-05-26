"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import { toast } from "@/components/Toast";
import Toast from "@/components/Toast";
import { templates } from "@/data/templates";
import type { CardTemplate } from "@/data/templates";
import {
  Download, Share2, Copy, RotateCcw, Printer,
  ZoomIn, X, ChevronLeft, ChevronRight, Loader2
} from "lucide-react";

const FONTS = [
  { label: "Playfair Display", value: "font-serif" },
  { label: "Great Vibes (Calligraphy)", value: "font-calligraphy" },
  { label: "Cormorant Garamond", value: "font-cormorant" },
  { label: "Arabic (Amiri)", value: "font-arabic" },
  { label: "Urdu (Nastaliq)", value: "font-urdu" },
];

const SIZES = [
  { label: "Instagram (1:1)", value: "1:1", w: 500, h: 500 },
  { label: "Story (9:16)", value: "9:16", w: 422, h: 750 },
  { label: "Facebook (16:9)", value: "16:9", w: 750, h: 422 },
];

const GREETING_OPTIONS = [
  "Eid ul Adha Mubarak",
  "Eid ul Fitr Mubarak",
  "Taqabbal Allahu Minna wa Minkum",
  "Eid Mubarak wa Kull 'Am wa Antum Bikhair",
];

const STICKERS = ["🌙", "⭐", "🕌", "🪔", "✨", "🌸", "🎁", "🤲", "☪️", "🌟"];

// ── Card Render (captured by html2canvas) ───────────────────────
function CardRender({
  cardRef,
  t,
  name,
  message,
  greeting,
  fontClass,
  fontSize,
  textColor,
  useUrdu,
  sticker,
  size,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  t: CardTemplate;
  name: string;
  message: string;
  greeting: string;
  fontClass: string;
  fontSize: number;
  textColor: string;
  useUrdu: boolean;
  sticker: string;
  size: (typeof SIZES)[0];
}) {
  return (
    <div
      ref={cardRef}
      id="card-preview"
      className={`relative overflow-hidden ${t.bgClass} ${t.borderClass} flex-shrink-0`}
      style={{ width: size.w, height: size.h, borderRadius: 20 }}
    >
      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')" }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8">
        <div className="text-5xl select-none">{sticker}</div>

        <div className={`${t.headingFont} drop-shadow-md`} style={{ color: textColor || undefined }}>
          <p className={`font-bold leading-tight ${t.textClass}`} style={{ fontSize: fontSize + 8, fontFamily: "inherit" }}>
            {useUrdu ? t.headingUr : greeting}
          </p>
        </div>

        <div className={`h-px w-24 ${t.accentClass} opacity-60`} />

        <p className={`text-sm leading-relaxed ${t.subTextClass} max-w-[80%]`}>
          {useUrdu ? t.defaultMessageUrdu : "Wishing you joy, peace and blessings"}
        </p>

        {message && (
          <p
            className={`${fontClass} max-w-[80%] leading-relaxed mt-1`}
            style={{ color: textColor || "inherit", fontSize }}
          >
            {message}
          </p>
        )}

        {name && (
          <>
            <div className={`h-px w-16 ${t.accentClass} opacity-40`} />
            <p className={`${t.textClass} font-semibold`} style={{ fontSize: fontSize - 2 }}>
              — {name} —
            </p>
          </>
        )}
      </div>

      {/* Corner decor */}
      <div className="absolute top-3 left-3 text-xl opacity-40 select-none">{sticker}</div>
      <div className="absolute bottom-3 right-3 text-xl opacity-40 select-none">{sticker}</div>
    </div>
  );
}

// ── Main customize page ───────────────────────────────────────
function CustomizePage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || templates[0].id;
  const [t, setT] = useState<CardTemplate>(() => templates.find(x => x.id === templateId) ?? templates[0]);
  const [name, setName] = useState("Your Name");
  const [message, setMessage] = useState("May Allah bless you and your family.");
  const [greeting, setGreeting] = useState(GREETING_OPTIONS[0]);
  const [fontClass, setFontClass] = useState(FONTS[0].value);
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("");
  const [useUrdu, setUseUrdu] = useState(false);
  const [sticker, setSticker] = useState(t.decorIcon);
  const [size, setSize] = useState(SIZES[0]);
  const [downloading, setDownloading] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const templateIdx = templates.findIndex(x => x.id === t.id);

  // Change template → reset sticker to template default
  const switchTemplate = (tpl: CardTemplate) => { setT(tpl); setSticker(tpl.decorIcon); };
  const prevTemplate = () => switchTemplate(templates[(templateIdx - 1 + templates.length) % templates.length]);
  const nextTemplate = () => switchTemplate(templates[(templateIdx + 1) % templates.length]);

  const reset = () => {
    setName("Your Name");
    setMessage("May Allah bless you and your family.");
    setGreeting(GREETING_OPTIONS[0]);
    setFontClass(FONTS[0].value);
    setFontSize(16);
    setTextColor("");
    setUseUrdu(false);
    setSticker(t.decorIcon);
    setSize(SIZES[0]);
    toast("Reset to defaults", "info");
  };

  const download = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement("a");
      const safeName = name.replace(/\s+/g, "_") || "Eid";
      link.download = `EidMubarak_${safeName}_${Date.now()}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();

      // Save to recently downloaded (localStorage)
      const recent = JSON.parse(localStorage.getItem("recentCards") ?? "[]");
      recent.unshift({ templateId: t.id, name, ts: Date.now() });
      localStorage.setItem("recentCards", JSON.stringify(recent.slice(0, 3)));

      toast("Card downloaded successfully ✓", "success");
    } catch {
      toast("Download failed — try again", "error");
    } finally {
      setDownloading(false);
    }
  };

  const shareWhatsApp = () => {
    const text = `${greeting}!\n\n${message}\n\n— ${name}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => toast("Link copied! ✓", "success"));
  };

  const printCard = () => window.print();

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "var(--bg)" }}>
      <Toast />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2" style={{ color: "var(--text)" }}>
            Customize Your Card
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            {t.name} — {t.category}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT: Controls ─────────────────────────────────── */}
          <div className="w-full lg:w-[380px] flex-shrink-0 space-y-5">

            {/* Template picker */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <h2 className="font-serif font-semibold text-[#C9A84C]">Template</h2>
              <div className="flex items-center justify-between gap-3">
                <button onClick={prevTemplate} className="p-2 glass rounded-full hover:bg-[#C9A84C]/20 transition-all" id="prev-template-btn">
                  <ChevronLeft className="w-5 h-5" style={{ color: "var(--text)" }} />
                </button>
                <span className="text-sm font-medium flex-1 text-center" style={{ color: "var(--text)" }}>
                  {t.name}
                </span>
                <button onClick={nextTemplate} className="p-2 glass rounded-full hover:bg-[#C9A84C]/20 transition-all" id="next-template-btn">
                  <ChevronRight className="w-5 h-5" style={{ color: "var(--text)" }} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {templates.map(tpl => (
                  <button
                    key={tpl.id}
                    onClick={() => switchTemplate(tpl)}
                    title={tpl.name}
                    className={`aspect-square rounded-lg ${tpl.bgClass} border-2 transition-all hover:scale-105 ${t.id === tpl.id ? "border-[#C9A84C] scale-105" : "border-transparent"}`}
                  />
                ))}
              </div>
            </div>

            {/* Language toggle */}
            <div className="glass rounded-2xl p-5">
              <h2 className="font-serif font-semibold text-[#C9A84C] mb-3">Language</h2>
              <div className="flex rounded-xl overflow-hidden border border-[#C9A84C]/30">
                <button
                  id="lang-english-btn"
                  onClick={() => setUseUrdu(false)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-all ${!useUrdu ? "bg-[#C9A84C] text-[#1A1A2E]" : "hover:bg-[#C9A84C]/10"}`}
                  style={{ color: useUrdu ? "var(--text)" : undefined }}
                >
                  English
                </button>
                <button
                  id="lang-urdu-btn"
                  onClick={() => setUseUrdu(true)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-all font-urdu ${useUrdu ? "bg-[#C9A84C] text-[#1A1A2E]" : "hover:bg-[#C9A84C]/10"}`}
                  style={{ color: !useUrdu ? "var(--text)" : undefined }}
                >
                  اردو
                </button>
              </div>
            </div>

            {/* Greeting text */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <h2 className="font-serif font-semibold text-[#C9A84C]">Greeting Text</h2>
              <select
                value={greeting}
                onChange={e => setGreeting(e.target.value)}
                className="w-full bg-transparent border border-[#C9A84C]/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
                style={{ color: "var(--text)" }}
              >
                {GREETING_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Name & Message */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <h2 className="font-serif font-semibold text-[#C9A84C]">Your Details</h2>
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "var(--text-secondary)" }}>Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={30}
                  placeholder="Your name here"
                  className="w-full bg-transparent border border-[#C9A84C]/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
                  style={{ color: "var(--text)", minHeight: 44 }}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "var(--text-secondary)" }}>Message</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  maxLength={120}
                  rows={3}
                  className="w-full bg-transparent border border-[#C9A84C]/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] resize-none"
                  style={{ color: "var(--text)" }}
                />
              </div>
            </div>

            {/* Font & Size */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <h2 className="font-serif font-semibold text-[#C9A84C]">Typography</h2>
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "var(--text-secondary)" }}>Font</label>
                <select
                  value={fontClass}
                  onChange={e => setFontClass(e.target.value)}
                  className="w-full bg-transparent border border-[#C9A84C]/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
                  style={{ color: "var(--text)" }}
                >
                  {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 flex justify-between" style={{ color: "var(--text-secondary)" }}>
                  Font Size <span className="text-[#C9A84C]">{fontSize}px</span>
                </label>
                <input
                  type="range" min={12} max={32} value={fontSize}
                  onChange={e => setFontSize(+e.target.value)}
                  className="w-full accent-[#C9A84C]"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider mb-1 block" style={{ color: "var(--text-secondary)" }}>Text Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color" value={textColor || "#ffffff"}
                    onChange={e => setTextColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-[#C9A84C]/30 cursor-pointer bg-transparent"
                  />
                  <button onClick={() => setTextColor("")} className="text-xs px-3 py-1 glass rounded-full hover:bg-[#C9A84C]/20 transition-all" style={{ color: "var(--text-secondary)" }}>
                    Use Default
                  </button>
                </div>
              </div>
            </div>

            {/* Card Size */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <h2 className="font-serif font-semibold text-[#C9A84C]">Card Size</h2>
              <div className="flex flex-col gap-2">
                {SIZES.map(s => (
                  <button
                    key={s.value}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${size.value === s.value ? "bg-[#C9A84C] text-[#1A1A2E]" : "glass hover:bg-[#C9A84C]/15"}`}
                    style={{ color: size.value === s.value ? undefined : "var(--text)" }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stickers */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <h2 className="font-serif font-semibold text-[#C9A84C]">Icon / Sticker</h2>
              <div className="flex flex-wrap gap-2">
                {STICKERS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSticker(s)}
                    className={`text-2xl p-2 rounded-xl transition-all hover:scale-110 ${sticker === s ? "bg-[#C9A84C]/30 border-2 border-[#C9A84C]" : "glass"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview + Actions ───────────────────────── */}
          <div className="flex-1 flex flex-col items-center gap-6">
            {/* Preview container */}
            <div className="w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id + size.value}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                  style={{ maxWidth: "100%", overflow: "auto" }}
                >
                  <CardRender
                    cardRef={cardRef}
                    t={t} name={name} message={message} greeting={greeting}
                    fontClass={fontClass} fontSize={fontSize} textColor={textColor}
                    useUrdu={useUrdu} sticker={sticker} size={size}
                  />

                  {/* Zoom icon */}
                  <button
                    onClick={() => setZoomOpen(true)}
                    id="zoom-preview-btn"
                    className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all"
                    title="Zoom preview"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action buttons */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Download */}
              <button
                id="download-btn"
                onClick={download}
                disabled={downloading}
                className={`col-span-2 sm:col-span-3 flex items-center justify-center gap-2 py-4 bg-[#C9A84C] hover:bg-[#A07830] text-[#1A1A2E] font-bold rounded-2xl transition-all hover:scale-[1.02] text-base ${downloading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {downloading ? "Generating…" : "Download as JPG"}
              </button>

              <button
                id="share-whatsapp-btn"
                onClick={shareWhatsApp}
                className="flex items-center justify-center gap-2 py-3 glass-gold text-[#C9A84C] font-semibold rounded-2xl transition-all hover:bg-[#C9A84C]/20 hover:scale-[1.02] text-sm"
              >
                <Share2 className="w-4 h-4" /> WhatsApp
              </button>

              <button
                id="copy-link-btn"
                onClick={copyLink}
                className="flex items-center justify-center gap-2 py-3 glass font-semibold rounded-2xl transition-all hover:bg-[#C9A84C]/10 hover:scale-[1.02] text-sm"
                style={{ color: "var(--text)" }}
              >
                <Copy className="w-4 h-4" /> Copy Link
              </button>

              <button
                id="print-btn"
                onClick={printCard}
                className="flex items-center justify-center gap-2 py-3 glass font-semibold rounded-2xl transition-all hover:bg-[#C9A84C]/10 hover:scale-[1.02] text-sm"
                style={{ color: "var(--text)" }}
              >
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>

            {/* Reset */}
            <button
              id="reset-btn"
              onClick={reset}
              className="flex items-center gap-2 text-sm hover:text-[#C9A84C] transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <RotateCcw className="w-4 h-4" /> Reset to defaults
            </button>

            {/* Recently downloaded */}
            <RecentlyDownloaded />
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomOpen(false)}
                className="absolute -top-4 -right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <CardRender
                cardRef={{ current: null }}
                t={t} name={name} message={message} greeting={greeting}
                fontClass={fontClass} fontSize={fontSize} textColor={textColor}
                useUrdu={useUrdu} sticker={sticker}
                size={{ label: "", value: "1:1", w: 600, h: 600 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Recently downloaded cards
function RecentlyDownloaded() {
  const [items, setItems] = useState<{ templateId: string; name: string; ts: number }[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("recentCards");
    if (raw) setItems(JSON.parse(raw));
  }, []);
  if (!items.length) return null;
  return (
    <div className="w-full glass rounded-2xl p-4 space-y-3">
      <h3 className="text-sm font-semibold text-[#C9A84C]">Recently Downloaded</h3>
      {items.map((item, i) => {
        const tpl = templates.find(t => t.id === item.templateId);
        return (
          <div key={i} className="flex items-center justify-between text-sm" style={{ color: "var(--text-secondary)" }}>
            <span>{tpl?.name ?? item.templateId} — {item.name}</span>
            <span className="text-xs opacity-50">{new Date(item.ts).toLocaleDateString()}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function CustomizePageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#C9A84C]">Loading…</div>}>
      <CustomizePage />
    </Suspense>
  );
}
