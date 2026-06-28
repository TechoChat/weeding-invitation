"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("/background-sound.mp3");

  // Traditional Indian flute/sitar fallback URL if local mp3 doesn't exist
  const fallbackUrl = "https://archive.org/download/classic-indian-flute-melody/classic-indian-flute-melody.mp3";

  useEffect(() => {
    // Create audio element dynamically to ensure it runs only in browser
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Handle potential errors (e.g. if background-sound.mp3 is missing, try fallback)
    const handleError = () => {
      if (audioUrl !== fallbackUrl) {
        console.log("Local audio not found, falling back to online Indian flute instrumental...");
        setAudioUrl(fallbackUrl);
        audio.src = fallbackUrl;
        if (isPlaying) {
          audio.play().catch(e => console.log("Play failed: ", e));
        }
      }
    };

    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl]);

  // Attempt play function
  const attemptPlay = () => {
    if (!audioRef.current) return;

    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        // Remove global listeners once playing succeeds
        removeInteractionListeners();
      })
      .catch((error) => {
        console.log("Audio play attempt deferred until user interaction:", error);
      });
  };

  const handleInteraction = () => {
    attemptPlay();
  };

  const addInteractionListeners = () => {
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("mousedown", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
  };

  const removeInteractionListeners = () => {
    window.removeEventListener("click", handleInteraction);
    window.removeEventListener("touchstart", handleInteraction);
    window.removeEventListener("mousedown", handleInteraction);
    window.removeEventListener("keydown", handleInteraction);
  };

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      // 1. Try immediate autoplay when curtain opens
      attemptPlay();

      // 2. Set up global interaction listeners as fallback in case autoplay was blocked
      addInteractionListeners();
    }

    return () => {
      removeInteractionListeners();
    };
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      // If user manually pauses, don't auto-resume on interactions
      removeInteractionListeners();
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Audio playback failed:", error);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center justify-center">
      {/* Visual Ripple Waves when music is playing */}
      {isPlaying && (
        <>
          <div className="absolute w-12 h-12 bg-gold-500/20 rounded-full animate-ping pointer-events-none" />
          <div className="absolute w-16 h-16 bg-gold-500/10 rounded-full animate-ring-pulse pointer-events-none" />
        </>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-charcoal-wedding border border-gold-300 shadow-[0_4px_12px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_18px_rgba(212,175,55,0.6)] active:scale-95 transition-all duration-300 relative group"
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-charcoal-wedding group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <VolumeX className="w-5 h-5 text-charcoal-wedding/80 group-hover:scale-110 transition-transform duration-300" />
        )}

        {/* Small floating note decorations when playing */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 bg-maroon-700 text-white rounded-full p-1 text-[9px] w-4 h-4 flex items-center justify-center animate-bounce">
            <Music className="w-2.5 h-2.5" />
          </span>
        )}
      </button>
    </div>
  );
}
