"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string; // ISO format string like "2026-12-18T10:00:00"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="flex justify-center gap-3 py-6">
        {["Days", "Hours", "Mins", "Secs"].map((label) => (
          <div key={label} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gold-500/20 bg-cream-light flex flex-col items-center justify-center">
            <span className="text-xl font-display-wedding text-gold-600 font-semibold">--</span>
            <span className="text-[9px] uppercase tracking-wider text-charcoal-wedding/60 font-medium">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex justify-center gap-3 sm:gap-4 py-8"
    >
      {items.map((item, index) => (
        <div key={item.label} className="relative group">
          {/* Decorative outer gold ring */}
          <div className="absolute inset-0 rounded-full border border-gold-400/30 scale-105 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
          
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-cream-light to-[#f5ebd8]/30 border border-gold-500/40 flex flex-col items-center justify-center shadow-[0_4px_10px_rgba(45,37,34,0.03)]">
            <span className="text-xl sm:text-2xl font-display-wedding text-maroon-800 font-bold leading-none">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-saffron-600 font-bold mt-1">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
