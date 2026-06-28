"use client";

import { motion } from "framer-motion";

export default function GaneshaHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center pt-10 pb-6 text-center"
    >
      {/* Golden Ganesha Minimal SVG Line Art */}
      <svg
        className="w-16 h-16 sm:w-20 sm:h-20 text-gold-500 mb-3"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Crown/Trishul (Top) */}
        <path d="M47 15 L50 7 L53 15 Z" fill="currentColor" opacity="0.2" />
        <path d="M50 7 L50 20" />
        
        {/* Head Curve & Ears */}
        <path d="M43 25 C43 20, 57 20, 57 25" />
        <path d="M40 28 C30 25, 33 42, 42 40" /> {/* Left ear */}
        <path d="M60 28 C70 25, 67 42, 58 40" /> {/* Right ear */}
        
        {/* Forehead Tilak */}
        <path d="M48 24 L52 24" strokeWidth="1.5" />
        <path d="M47 27 L53 27" strokeWidth="1.5" />
        <path d="M49 30 L51 30" strokeWidth="1.5" />
        <circle cx="50" cy="20" r="1.5" fill="currentColor" />

        {/* Face and Trunk */}
        <path d="M45 35 C45 35, 48 40, 50 40 C52 40, 55 35, 55 35" />
        <path d="M50 40 C50 48, 55 52, 55 58 C55 64, 48 64, 46 60 C45 58, 47 56, 49 56 C51 56, 52 58, 51 60" /> {/* Trunk curve turning right (traditional) */}
        
        {/* Tusk */}
        <path d="M44 38 L41 39" strokeWidth="1.5" /> {/* Left short tusk */}
        
        {/* Modak in trunk hand / decorative swirl */}
        <circle cx="44" cy="58" r="2.5" fill="currentColor" className="animate-pulse" />
      </svg>

      {/* Sanskrit Invocation */}
      <span className="text-xs sm:text-sm tracking-[0.25em] text-saffron-600 font-medium uppercase">
        || Shree Ganeshay Namah ||
      </span>
      
      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-2" />
    </motion.div>
  );
}
