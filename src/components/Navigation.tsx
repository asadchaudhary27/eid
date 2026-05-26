"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Star } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/customize", label: "Create Card" },
    { href: "/send", label: "Send Wishes" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-[--surface-border] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Star className="w-5 h-5 text-[#C9A84C] group-hover:rotate-12 transition-transform" />
          <span className="font-serif text-xl font-bold text-[#C9A84C]">EidMubarak</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === href
                  ? "bg-[#C9A84C] text-[#1A1A2E] shadow-md"
                  : "text-[var(--text)] hover:bg-[#C9A84C]/15 hover:text-[#C9A84C]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-[#C9A84C]/20 text-[var(--text)] transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-[#C9A84C]" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <Link href="/customize" className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#C9A84C] hover:bg-[#A07830] text-[#1A1A2E] text-sm font-bold rounded-full transition-all hover:scale-105">
            ✨ Create Card
          </Link>
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 rounded-full hover:bg-[#C9A84C]/20 text-[var(--text)]">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-[--surface-border] bg-[var(--bg)] px-4 py-4 flex flex-col gap-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === href
                  ? "bg-[#C9A84C] text-[#1A1A2E]"
                  : "text-[var(--text)] hover:bg-[#C9A84C]/15"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
