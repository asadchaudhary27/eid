"use client";
import { useEffect, useState } from "react";
import { CheckCircle, X, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

// Global toast state
let addToastFn: ((msg: string, type?: ToastType) => void) | null = null;
export const toast = (message: string, type: ToastType = "success") => {
  addToastFn?.(message, type);
};

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    addToastFn = (message, type = "success") => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    };
    return () => { addToastFn = null; };
  }, []);

  const icons = { success: CheckCircle, error: AlertCircle, info: Info };
  const colors = {
    success: "border-l-4 border-green-500 bg-green-500/10 text-green-300",
    error: "border-l-4 border-red-500 bg-red-500/10 text-red-300",
    info: "border-l-4 border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]",
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => {
          const Icon = icons[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl glass shadow-xl text-sm font-medium pointer-events-auto ${colors[t.type]}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {t.message}
              <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="ml-2 opacity-60 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
