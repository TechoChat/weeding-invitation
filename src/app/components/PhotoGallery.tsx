"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, Heart } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  gridClass: string;
}

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      src: "/couple-hero.png",
      alt: "Aarav and Pooja Portrait",
      caption: "Love in their eyes, promises in their hearts.",
      gridClass: "col-span-2 aspect-[4/3] sm:aspect-[16/10]",
    },
    {
      src: "/couple-ritual.png",
      alt: "Hast Melap Ritual",
      caption: "Hast Melap — Joining hands for a lifetime of togetherness.",
      gridClass: "col-span-2 aspect-[4/3] sm:aspect-[16/10]",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            onClick={() => setSelectedImage(img)}
            className={`${img.gridClass} relative group overflow-hidden rounded-2xl border-2 border-gold-500/20 cursor-pointer shadow-md`}
          >
            {/* Image */}
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
              <div className="pr-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 font-display-wedding">
                  Moments
                </span>
                <p className="text-xs font-serif-wedding line-clamp-1 italic text-gray-100">
                  {img.alt}
                </p>
              </div>
              <div className="p-1.5 rounded-full bg-gold-500/80 text-charcoal-wedding backdrop-blur-sm">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-cream-wedding rounded-3xl border border-gold-400 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Double border inside modal */}
              <div className="absolute inset-1.5 border border-gold-500/20 rounded-[22px] pointer-events-none z-10" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 active:scale-95 transition-all"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Caption details */}
              <div className="p-5 text-center flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 text-gold-600">
                  <Heart className="w-3.5 h-3.5 fill-gold-600" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">
                    Utsav & Devanshi
                  </span>
                  <Heart className="w-3.5 h-3.5 fill-gold-600" />
                </div>
                <h4 className="text-xl font-display-wedding text-maroon-800 font-bold">
                  {selectedImage.alt}
                </h4>
                <p className="text-sm font-serif-wedding italic text-charcoal-wedding/80 leading-relaxed px-4">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
