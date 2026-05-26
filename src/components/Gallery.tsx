"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const images = [
  {
    title: "Family Gatherings",
    url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=100&w=3840",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Qurbani Moments",
    url: "https://images.unsplash.com/photo-1511553677255-ba939e5537e0?auto=format&fit=crop&q=100&w=1920",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Beautiful Mosques",
    url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=100&w=1920",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Eid Feasts",
    url: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=100&w=1920",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Gifts & Joy",
    url: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=100&w=1920",
    span: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  return (
    <section className="py-24 px-4 bg-[#0a1a14]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Camera className="w-10 h-10 text-gold-400 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Cherished Memories
          </h2>
          <p className="text-moon-silver max-w-2xl mx-auto text-lg">
            Capturing the essence of Eid, from the spiritual sacrifices to the joyous family moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              className={`relative overflow-hidden rounded-3xl group shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${img.span} cursor-pointer`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${img.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white drop-shadow-xl transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {img.title}
                </h3>
                <div className="h-1 w-0 bg-gold-400 mt-4 group-hover:w-16 transition-all duration-500 delay-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
