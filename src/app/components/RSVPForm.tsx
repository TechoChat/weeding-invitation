"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, UserCheck, Heart, Info } from "lucide-react";

// Form validation schema
const rsvpSchema = z.object({
  name: z.string().min(2, { message: "Please enter your full name." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
  attendance: z.enum(["attending", "declined"], {
    message: "Please select your attendance status.",
  }),
  events: z.object({
    mehndi: z.boolean().default(false),
    wedding: z.boolean().default(false),
  }).optional(),
  guestsCount: z.coerce.number().min(1, { message: "Must be at least 1 guest." }).max(20, { message: "Maximum 20 guests." }).default(1),
  wishes: z.string().optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

export default function RSVPForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attendance: "attending",
      guestsCount: 1,
      events: {
        mehndi: true,
        wedding: true,
      },
    },
  });

  const attendance = watch("attendance");

  const onSubmit = async (data: RSVPFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Save to local storage for demo
    const existingRsvps = JSON.parse(localStorage.getItem("rsvps") || "[]");
    localStorage.setItem("rsvps", JSON.stringify([...existingRsvps, data]));
    
    setGuestName(data.name);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="rsvp-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="relative bg-white border-2 border-gold-400/40 p-6 sm:p-8 rounded-3xl shadow-[0_12px_24px_rgba(45,37,34,0.06)] flex flex-col gap-5 overflow-hidden"
          >
            {/* Double border background design */}
            <div className="absolute inset-1.5 border border-gold-500/20 rounded-[22px] pointer-events-none" />

            <div className="text-center mb-2 z-10">
              <h2 className="text-3xl font-display-wedding text-maroon-800 font-bold leading-tight">
                RSVP
              </h2>
              <p className="text-xs uppercase tracking-widest text-saffron-600 font-bold mt-1">
                Kindly Respond By January 15, 2027
              </p>
              <div className="w-12 h-[1px] bg-gold-500/30 mx-auto mt-2" />
            </div>

            {/* Guest Name */}
            <div className="flex flex-col gap-1.5 z-10">
              <label htmlFor="name" className="text-xs uppercase tracking-wider font-bold text-charcoal-wedding/75">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-300 focus:outline-none focus:border-saffron-500 bg-cream-wedding/20 text-sm font-serif-wedding transition-colors"
                placeholder="Guest Full Name"
              />
              {errors.name && (
                <span className="text-xs text-red-600 font-serif-wedding">{errors.name.message}</span>
              )}
            </div>

            {/* Guest Email with Info Icon and Tooltip */}
            <div className="flex flex-col gap-1.5 z-10">
              <div className="flex items-center gap-1.5">
                <label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-charcoal-wedding/75">
                  Email Address (Optional)
                </label>
                <div className="relative group flex items-center">
                  <Info className="w-3.5 h-3.5 text-gold-600 cursor-pointer" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-charcoal-wedding text-white text-[10px] rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-30 font-serif-wedding leading-normal text-center">
                    Will be used to provide updates and location navigation.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal-wedding" />
                  </div>
                </div>
              </div>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-300 focus:outline-none focus:border-saffron-500 bg-cream-wedding/20 text-sm font-serif-wedding transition-colors"
                placeholder="email@example.com"
              />
              {errors.email && (
                <span className="text-xs text-red-600 font-serif-wedding">{errors.email.message}</span>
              )}
            </div>

            {/* Attendance Toggle */}
            <div className="flex flex-col gap-1.5 z-10">
              <label className="text-xs uppercase tracking-wider font-bold text-charcoal-wedding/75 mb-1">
                Will you attend? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setValue("attendance", "attending")}
                  className={`py-2.5 px-4 rounded-xl border text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
                    attendance === "attending"
                      ? "bg-maroon-700 text-white border-maroon-700 shadow-md"
                      : "bg-white border-gold-300 text-charcoal-wedding hover:bg-gold-50"
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  Joyfully Attend
                </button>
                <button
                  type="button"
                  onClick={() => setValue("attendance", "declined")}
                  className={`py-2.5 px-4 rounded-xl border text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
                    attendance === "declined"
                      ? "bg-maroon-700 text-white border-maroon-700 shadow-md"
                      : "bg-white border-gold-300 text-charcoal-wedding hover:bg-gold-50"
                  }`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {attendance === "attending" && (
              <>
                {/* Events Checkbox List */}
                <div className="flex flex-col gap-2 z-10">
                  <label className="text-xs uppercase tracking-wider font-bold text-charcoal-wedding/75">
                    Which events will you attend?
                  </label>
                  <div className="flex flex-col gap-2 bg-cream-wedding/20 p-3 rounded-xl border border-gold-500/20">
                    {[
                      { key: "mehndi", label: "Mehndi Ceremony (Feb 13)" },
                      { key: "wedding", label: "Wedding Day Ceremonies (Feb 15)" },
                    ].map((ev) => (
                      <label key={ev.key} className="flex items-center gap-3 cursor-pointer select-none py-1">
                        <input
                          type="checkbox"
                          {...register(`events.${ev.key}` as any)}
                          className="w-4.5 h-4.5 rounded text-maroon-700 focus:ring-maroon-500 accent-maroon-700 cursor-pointer border-gold-400"
                        />
                        <span className="text-sm font-serif-wedding text-charcoal-wedding">{ev.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Number of Guests Input */}
                <div className="flex flex-col gap-1.5 z-10">
                  <label htmlFor="guestsCount" className="text-xs uppercase tracking-wider font-bold text-charcoal-wedding/75">
                    Total Attending Guests (Including You)
                  </label>
                  <input
                    id="guestsCount"
                    type="number"
                    min="1"
                    max="20"
                    {...register("guestsCount")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-300 focus:outline-none focus:border-saffron-500 bg-cream-wedding/20 text-sm font-serif-wedding transition-colors"
                    placeholder="1"
                  />
                  {errors.guestsCount && (
                    <span className="text-xs text-red-600 font-serif-wedding">{errors.guestsCount.message}</span>
                  )}
                </div>
              </>
            )}

            {/* Warm Wishes */}
            <div className="flex flex-col gap-1.5 z-10">
              <label htmlFor="wishes" className="text-xs uppercase tracking-wider font-bold text-charcoal-wedding/75">
                Send a Blessing / Message (Optional)
              </label>
              <textarea
                id="wishes"
                rows={3}
                {...register("wishes")}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-300 focus:outline-none focus:border-saffron-500 bg-cream-wedding/20 text-sm font-serif-wedding transition-colors resize-none"
                placeholder="Blessings or warm messages for Utsav & Devanshi..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3 bg-gradient-to-r from-maroon-700 via-maroon-800 to-maroon-900 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_4px_16px_rgba(112,33,51,0.3)] shadow-md disabled:opacity-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer z-10"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white" />
                  Confirm RSVP
                </>
              )}
            </button>
          </motion.form>
        ) : (
          /* RSVP SUCCESS SCREEN WITH WAX SEAL */
          <motion.div
            key="rsvp-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative bg-[#FCF8F2] border-2 border-gold-400 p-8 rounded-3xl shadow-[0_12px_32px_rgba(45,37,34,0.08)] flex flex-col items-center text-center overflow-hidden"
          >
            {/* Ornate Inner Double Border */}
            <div className="absolute inset-1.5 border border-gold-500/20 rounded-[22px] pointer-events-none" />
            <div className="absolute inset-3 border border-gold-500/10 rounded-[20px] pointer-events-none" />

            <div className="absolute top-4 left-4 text-gold-500/10"><Sparkles className="w-8 h-8" /></div>
            <div className="absolute bottom-4 right-4 text-gold-500/10"><Sparkles className="w-8 h-8" /></div>

            {/* Glowing success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-14 h-14 bg-gradient-to-tr from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(212,175,55,0.3)] mb-4"
            >
              <Check className="w-7 h-7 text-charcoal-wedding stroke-[3]" />
            </motion.div>

            {/* Gujarati Greeting */}
            <h3 className="text-saffron-600 font-display-wedding text-base tracking-[0.2em] font-bold uppercase mb-1">
              Aabhari Chhie
            </h3>
            <p className="text-xs font-serif-wedding italic text-charcoal-wedding/60 mb-4">
              (We are grateful)
            </p>

            <h4 className="text-2xl font-serif-wedding text-maroon-800 font-bold leading-tight px-4 mb-2">
              Thank You, {guestName}!
            </h4>
            
            <p className="text-sm font-serif-wedding text-charcoal-wedding/80 max-w-xs leading-relaxed mb-6">
              Your RSVP response has been sealed. We look forward to celebrating these auspicious ceremonies with you.
            </p>

            {/* Gold Heart Medallion as Sealing Stamp of Confirmation */}
            <div className="relative w-24 h-24 my-2 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 border border-gold-400 flex items-center justify-center shadow-lg"
              >
                <Heart className="w-8 h-8 text-maroon-900 fill-maroon-900" />
              </motion.div>
              {/* Gold light burst around seal */}
              <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-md scale-110 pointer-events-none" />
            </div>

            <p className="text-[10px] uppercase tracking-widest text-gold-600 font-bold mt-4">
              Sealed Confirmation
            </p>

            {/* Go Back button */}
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-xs text-maroon-700 hover:text-maroon-900 underline font-semibold cursor-pointer z-10"
            >
              Update RSVP response
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
