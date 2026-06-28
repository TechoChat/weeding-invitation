"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CurtainReveal from "./components/CurtainReveal";
import GaneshaHeader from "./components/GaneshaHeader";
import MusicPlayer from "./components/MusicPlayer";
import Countdown from "./components/Countdown";
import EventDetails from "./components/EventDetails";
import RSVPForm from "./components/RSVPForm";
import PhotoGallery from "./components/PhotoGallery";
import Timeline from "./components/Timeline";
import ScratchToReveal from "./components/ScratchToReveal";
import { Heart, Calendar, Sparkles } from "lucide-react";

export default function Home() {
  const [curtainComplete, setCurtainComplete] = useState(false);

  useEffect(() => {
    // Lock body scroll while curtains are closed
    if (!curtainComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [curtainComplete]);

  // Auspicious wedding date
  const weddingDate = "2027-02-13T10:00:00";

  return (
    <div className="min-h-screen w-full bg-[#f4ede4] flex justify-center selection:bg-gold-200 selection:text-maroon-900">
      {/* Curtain reveal overlay on load */}
      <CurtainReveal onComplete={() => setCurtainComplete(true)} />

      {/* Main Page Layout Wrapper - simulates a premium mobile frame on desktop */}
      <div className="w-full max-w-md bg-wedding-paper min-h-screen shadow-2xl relative flex flex-col border-x border-gold-400/20 pb-16 overflow-hidden">
        {/* Floating background audio toggle */}
        <MusicPlayer autoPlayTrigger={true} />

        {/* Decorative Marigold Garlands Hanging from Top Left & Top Right */}
        <div className="absolute top-0 left-6 flex flex-col items-center pointer-events-none z-20">
          {[...Array(9)].map((_, i) => (
            <div
              key={`g-left-${i}`}
              className={`w-4 h-4 rounded-full -mt-1 shadow-sm ${
                i % 2 === 0 ? "bg-saffron-500" : "bg-yellow-400"
              }`}
              style={{
                transform: `rotate(${i * 15}deg)`,
                borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%",
              }}
            />
          ))}
          <div className="w-[1px] h-3 bg-gold-300" />
          <div className="w-2.5 h-2.5 bg-cream-light rounded-full border border-gold-400 shadow-sm" />
        </div>

        <div className="absolute top-0 right-6 flex flex-col items-center pointer-events-none z-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={`g-right-${i}`}
              className={`w-4 h-4 rounded-full -mt-1 shadow-sm ${
                i % 3 === 0 ? "bg-saffron-500" : i % 3 === 1 ? "bg-yellow-400" : "bg-saffron-600"
              }`}
              style={{
                transform: `rotate(${i * -12}deg)`,
                borderRadius: "50% 50% 45% 55% / 45% 55% 50% 50%",
              }}
            />
          ))}
          <div className="w-[1px] h-3 bg-gold-300" />
          <div className="w-2.5 h-2.5 bg-cream-light rounded-full border border-gold-400 shadow-sm" />
        </div>

        {/* 1. Header / Invocation */}
        <GaneshaHeader />

        {/* 2. Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-6 text-center flex flex-col items-center"
        >
          {/* Subheading */}
          <span className="text-xs uppercase tracking-[0.25em] text-saffron-600 font-bold">
            Save the Date for
          </span>

          {/* Couple Names */}
          <h1 className="text-maroon-700 font-script-wedding text-5xl sm:text-6xl mt-3 mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            Utsav & Devanshi
          </h1>
          <p className="text-xs font-display-wedding tracking-[0.15em] text-gold-700 uppercase font-semibold mb-6">
            Are Celebrating their union
          </p>

          {/* Premium Couple Image Frame */}
          <div className="relative w-full aspect-[5/6] rounded-t-[100px] rounded-b-2xl overflow-hidden border-gold-ornate p-1.5 bg-white shadow-lg mb-8">
            <div className="relative w-full h-full rounded-t-[90px] rounded-b-xl overflow-hidden">
              <Image
                src="/couple-hero.png"
                alt="Utsav & Devanshi Wedding Cover"
                fill
                priority
                sizes="(max-width: 450px) 100vw, 450px"
                className="object-cover"
              />
            </div>
            
            {/* Absolute Decorative Corner Frame Elements */}
            <div className="absolute bottom-4 left-4 text-gold-500/30"><Sparkles className="w-5 h-5" /></div>
            <div className="absolute bottom-4 right-4 text-gold-500/30"><Sparkles className="w-5 h-5" /></div>
          </div>

          {/* Invitation Message */}
          <div className="px-3 mb-10">
            <p className="text-sm font-serif-wedding text-charcoal-wedding/90 leading-relaxed italic mb-4">
              &ldquo;Two hearts join, embarking on a path of endless love. As we bind our lives in holy matrimony, your presence and blessings would make our celebrations complete.&rdquo;
            </p>
            <p className="text-xs uppercase tracking-widest text-maroon-800 font-bold mt-4">
              With Love, The Shah & Sutaria Families
            </p>
          </div>
        </motion.section>

        {/* Scratch to Reveal Card Section */}
        <section className="px-6 py-10 bg-gradient-to-b from-white to-[#FDFBF7] text-center border-t border-gold-500/10">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-widest text-saffron-600 font-bold block mb-1">
              Interactive Invitation Card
            </span>
            <h2 className="text-xl font-display-wedding text-maroon-900 font-bold">
              SCRATCH TO REVEAL DATE
            </h2>
            <div className="w-10 h-[1px] bg-gold-500/30 mx-auto mt-2" />
          </div>
          <ScratchToReveal />
        </section>

        {/* 3. Countdown Section */}
        <section className="bg-gradient-to-b from-[#fbf2f3]/40 to-[#ffd8ad]/10 py-8 border-y border-gold-500/10">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-widest text-saffron-600 font-bold">
              The Auspicious Hour Approaches
            </span>
            <h2 className="text-xl font-display-wedding text-maroon-900 font-bold mt-1">
              COUNTDOWN TO VIVAH
            </h2>
          </div>
          <Countdown targetDate={weddingDate} />
        </section>

        {/* 4. Timeline Story Section */}
        <section className="py-12">
          <div className="text-center mb-6">
            <div className="inline-block p-1.5 rounded-full border border-gold-500/30 text-gold-600 mb-2">
              <Heart className="w-4 h-4 fill-gold-600" />
            </div>
            <h2 className="text-2xl font-display-wedding text-maroon-800 font-bold">
              OUR JOURNEY
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-saffron-600 font-bold mt-0.5">
              How Our Love Unfolded
            </p>
            <div className="w-10 h-[1px] bg-gold-500/30 mx-auto mt-2" />
          </div>

          <Timeline />
        </section>

        {/* 5. Event Details Section */}
        <section className="py-12 bg-[#FAF8F5] border-y border-gold-500/10">
          <div className="text-center mb-8">
            <div className="inline-block p-1.5 rounded-full border border-gold-500/30 text-gold-600 mb-2">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 className="text-2xl font-display-wedding text-maroon-800 font-bold">
              THE CEREMONIES
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-saffron-600 font-bold mt-0.5">
              Celebrate the Festive Rituals
            </p>
            <div className="w-10 h-[1px] bg-gold-500/30 mx-auto mt-2" />
          </div>

          <EventDetails />
        </section>

        {/* 6. Photo Gallery */}
        <section className="py-12">
          <div className="text-center mb-8">
            <div className="inline-block p-1.5 rounded-full border border-gold-500/30 text-gold-600 mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <h2 className="text-2xl font-display-wedding text-maroon-800 font-bold">
              MOMENTS
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-saffron-600 font-bold mt-0.5">
              Glimpses of Togetherness
            </p>
            <div className="w-10 h-[1px] bg-gold-500/30 mx-auto mt-2" />
          </div>

          <PhotoGallery />
        </section>

        {/* 7. RSVP Section */}
        <section className="py-12 bg-gradient-to-b from-white to-[#FDFBF7] border-t border-gold-500/10">
          <RSVPForm />
        </section>

        {/* 8. Footer Blessings */}
        <footer className="text-center px-6 pt-8 pb-4 z-10 relative">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-4" />
          <p className="text-xs uppercase tracking-widest text-saffron-600 font-bold">
            Blessings & Regrets
          </p>
          <p className="text-sm font-serif-wedding italic text-charcoal-wedding/70 leading-relaxed mt-2">
            &ldquo;As we commence this sacred journey, your presence and warm wishes are the greatest gifts we could ask for.&rdquo;
          </p>
          <p className="text-xs font-serif-wedding text-charcoal-wedding/60 mt-6 uppercase tracking-wider font-bold">
            Utsav & Devanshi &bull; Ahmedabad, India
          </p>
        </footer>
      </div>
    </div>
  );
}
