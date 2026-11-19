import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Briefcase, Award } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    // Auto complete intro after 3.8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-gray-dark text-cream overflow-hidden"
    >
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-slate-gray/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        
        {/* Animated Icon Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
          className="mb-8 p-5 bg-slate-gray rounded-3xl shadow-2xl shadow-slate-gray/50 flex items-center justify-center border border-cream/20"
        >
          <Briefcase className="w-12 h-12 text-cream" />
        </motion.div>

        {/* Eyebrow Tag */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-300 uppercase bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/30 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Career Quiz Battle</span>
        </motion.div>

        {/* Fading Application Name Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-cream">
            RESUQUEST
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-amber-300/90 tracking-wide">
            The Multi-Team Resume Quiz Championship
          </p>
        </motion.div>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-6 text-sm sm:text-base text-cream/80 font-light max-w-lg leading-relaxed"
        >
          Answer high-impact resume MCQs, unlock executive resume components, and compete to claim the ultimate S-Tier Resume Victory!
        </motion.p>

        {/* Loading / Progress Indicator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 2.2, ease: 'easeInOut' }}
          className="mt-10 w-48 h-1 bg-gradient-to-r from-slate-gray via-amber-300 to-emerald-400 rounded-full origin-left shadow-lg shadow-slate-gray/50"
        />

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={onComplete}
          className="mt-8 text-xs font-medium text-cream/70 hover:text-white underline decoration-cream/40 underline-offset-4 cursor-pointer transition-all"
        >
          Skip Intro →
        </motion.button>

      </div>
    </motion.div>
  );
};
