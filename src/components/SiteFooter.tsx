import Link from "next/link";
import { Star } from "lucide-react";

// Instagram icon as inline SVG (not in this version of lucide-react)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t" style={{ borderColor: "var(--surface-border)", background: "var(--bg-secondary)" }}>
      {/* Gold divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left — branding */}
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <Star className="w-4 h-4 text-[#C9A84C]" />
          <span className="font-serif font-semibold text-[#C9A84C]">EidMubarak</span>
          <span className="opacity-40">·</span>
          <span>Eid ul Adha 2026</span>
        </div>

        {/* Center — developer credit */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
            Developed by
          </p>
          <p className="font-serif font-bold text-[#C9A84C] text-base tracking-wide">
            Asad Qaisar
          </p>
        </div>

        {/* Right — Instagram */}
        <Link
          href="https://www.instagram.com/idgaf.alpha"
          target="_blank"
          rel="noopener noreferrer"
          id="instagram-link"
          className="flex items-center gap-2 px-4 py-2 glass-gold rounded-full text-sm font-semibold text-[#C9A84C] hover:bg-[#C9A84C]/20 hover:scale-105 transition-all duration-200 group"
        >
          <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          @idgaf.alpha
        </Link>
      </div>
    </footer>
  );
}
