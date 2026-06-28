"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
}

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      title: "First Meeting",
      date: "June 14, 2023",
      description: "Sipping hot ginger chai at a cozy tea shop on a rainy afternoon in Ahmedabad. A chance encounter that blossomed into hours of conversation about dreams, music, and travel.",
    },
    {
      title: "Manek Chowk Street Date",
      date: "August 22, 2023",
      description: "An evening filled with sweet chatter, Gwalior Dosa, and chocolate sandwiches. Sharing the chaotic charm of Ahmedabad's street food, we realized we wanted to share all our future adventures.",
    },
    {
      title: "The Proposal",
      date: "November 08, 2025",
      description: "Against the backdrop of a setting sun and the gentle ocean waves, Aarav went down on one knee. Surrounded by fairy lights, Pooja smiled through happy tears and said 'Yes'!",
    },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto px-4 py-6">
      {/* Central Timeline Path (Offset to left on mobile for optimal text space) */}
      <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300" />

      <div className="flex flex-col gap-10">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative pl-12 flex flex-col"
          >
            {/* Timeline Node Point */}
            <div className="absolute left-[23px] top-1.5 w-6 h-6 rounded-full bg-cream-wedding border-2 border-gold-500 flex items-center justify-center z-10 shadow-[0_2px_6px_rgba(212,175,55,0.3)]">
              <Heart className="w-2.5 h-2.5 text-maroon-700 fill-maroon-700" />
            </div>

            {/* Content Card */}
            <div className="bg-white p-5 rounded-2xl border border-gold-500/20 shadow-[0_4px_12px_rgba(45,37,34,0.02)] relative group hover:border-gold-500/40 transition-colors">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-saffron-600 mb-1">
                {event.date}
              </span>
              <h4 className="text-lg font-display-wedding text-maroon-800 font-bold leading-tight mb-2">
                {event.title}
              </h4>
              <p className="text-sm font-serif-wedding text-charcoal-wedding/80 leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
