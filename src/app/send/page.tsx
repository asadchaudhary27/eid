"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { templates } from "@/data/templates";
import { toast } from "@/components/Toast";
import Toast from "@/components/Toast";
import { Send, Mail, Copy } from "lucide-react";

const GREETING_OPTIONS = [
  "Eid ul Adha Mubarak",
  "Eid ul Fitr Mubarak",
  "Taqabbal Allahu Minna wa Minkum",
  "Eid Mubarak wa Kull 'Am wa Antum Bikhair",
];

const DEFAULT_MESSAGE =
  "On this sacred day of Eid ul Adha, may Allah accept your sacrifices and fill your home with happiness, barakah, and endless peace. May every dua you make be answered, every sadness lifted, and every dream you carry come true. We are so grateful to have you in our lives.\n\nEid Mubarak from our family to yours. 🌙✨";

export default function SendPage() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [personalMessage, setPersonalMessage] = useState(DEFAULT_MESSAGE);
  const [greeting, setGreeting] = useState(GREETING_OPTIONS[0]);
  const [contact, setContact] = useState("");

  const buildMessage = () => {
    const t = templates.find(x => x.id === selectedTemplate);
    const divider = "─────────────────────────";
    const senderLine = sender || "A Friend";
    const receiverLine = receiver || "Friend";

    return [
      `🌙✨ ${greeting} ✨🌙`,
      ``,
      `Assalamu Alaikum, dear ${receiverLine},`,
      ``,
      personalMessage,
      ``,
      divider,
      ``,
      `🤲 تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ`,
      `   (May Allah accept from us and from you)`,
      ``,
      divider,
      ``,
      `With warm Eid wishes & love,`,
      `${senderLine} 💛`,
      ``,
      t ? `🎨 Card Design: ${t.name} (${t.category})` : "",
      `🔗 Create your own card: ${typeof window !== "undefined" ? window.location.origin : ""}/customize`,
    ].join("\n");
  };

  const sendWhatsApp = () => {
    const msg = buildMessage();
    const num = contact.replace(/\D/g, "");
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank");
    toast("Opening WhatsApp… 🎉", "success");
  };

  const sendEmail = () => {
    const msg = buildMessage();
    const subject = encodeURIComponent(`${greeting} 🌙`);
    const body = encodeURIComponent(msg);
    window.open(`mailto:${contact}?subject=${subject}&body=${body}`, "_blank");
    toast("Opening email client…", "success");
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(buildMessage()).then(() =>
      toast("Message copied to clipboard! ✓", "success")
    );
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "var(--bg)" }}>
      <Toast />
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="text-5xl mb-4">🤲</div>
          <h1 className="text-4xl font-serif font-bold mb-3" style={{ color: "var(--text)" }}>
            Send Eid Wishes
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Spread the joy of Eid — send a heartfelt, personalized wish via WhatsApp or Email in one click.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 space-y-6"
        >
          {/* Name row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-[#C9A84C] font-semibold">Your Name</label>
              <input
                value={sender}
                onChange={e => setSender(e.target.value)}
                placeholder="e.g. Ahmed"
                className="w-full bg-transparent border border-[#C9A84C]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm transition-colors"
                style={{ color: "var(--text)", minHeight: 44 }}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-[#C9A84C] font-semibold">Receiver's Name</label>
              <input
                value={receiver}
                onChange={e => setReceiver(e.target.value)}
                placeholder="e.g. Ali, Family, Team"
                className="w-full bg-transparent border border-[#C9A84C]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm transition-colors"
                style={{ color: "var(--text)", minHeight: 44 }}
              />
            </div>
          </div>

          {/* Greeting + Template */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-[#C9A84C] font-semibold">Greeting</label>
              <select
                value={greeting}
                onChange={e => setGreeting(e.target.value)}
                className="w-full bg-[var(--bg)] border border-[#C9A84C]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm"
                style={{ color: "var(--text)" }}
              >
                {GREETING_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-[#C9A84C] font-semibold">Card Template</label>
              <select
                value={selectedTemplate}
                onChange={e => setSelectedTemplate(e.target.value)}
                className="w-full bg-[var(--bg)] border border-[#C9A84C]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm"
                style={{ color: "var(--text)" }}
              >
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal message */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-[#C9A84C] font-semibold">Personal Message</label>
            <textarea
              value={personalMessage}
              onChange={e => setPersonalMessage(e.target.value)}
              rows={5}
              className="w-full bg-transparent border border-[#C9A84C]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm resize-none"
              style={{ color: "var(--text)" }}
            />
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-[#C9A84C] font-semibold">
              WhatsApp Number or Email <span className="normal-case text-[#C9A84C]/50">(optional)</span>
            </label>
            <input
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="+92300... or name@email.com — leave blank to open general WhatsApp"
              className="w-full bg-transparent border border-[#C9A84C]/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-sm"
              style={{ color: "var(--text)", minHeight: 44 }}
            />
          </div>

          {/* ── Message Preview ─────────────────────────────── */}
          <div className="rounded-2xl overflow-hidden border border-[#C9A84C]/25">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#C9A84C]/20" style={{ background: "rgba(201,168,76,0.08)" }}>
              <p className="text-xs text-[#C9A84C] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                📋 Message Preview
              </p>
              <button
                onClick={copyMessage}
                className="flex items-center gap-1.5 text-xs text-[#C9A84C] hover:text-[#A07830] transition-colors font-semibold px-3 py-1 rounded-full hover:bg-[#C9A84C]/15"
              >
                <Copy className="w-3 h-3" /> Copy All
              </button>
            </div>
            <div
              className="p-5 text-sm whitespace-pre-wrap leading-loose font-mono"
              style={{ color: "var(--text-secondary)", background: "var(--bg-secondary)" }}
            >
              {buildMessage()}
            </div>
          </div>

          {/* Send buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              id="send-whatsapp-btn"
              onClick={sendWhatsApp}
              className="flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-2xl transition-all hover:scale-[1.02] text-sm shadow-lg"
            >
              <Send className="w-4 h-4" /> Send via WhatsApp
            </button>
            <button
              id="send-email-btn"
              onClick={sendEmail}
              className="flex items-center justify-center gap-2 py-4 bg-[#C9A84C] hover:bg-[#A07830] text-[#1A1A2E] font-bold rounded-2xl transition-all hover:scale-[1.02] text-sm shadow-lg"
            >
              <Mail className="w-4 h-4" /> Send via Email
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
