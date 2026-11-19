import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Team } from '../types';
import { Flame, Trophy, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface TurnTransitionOverlayProps {
  activeTeam: Team;
  roundNumber: number;
  totalRounds: number;
  teamTurnIndex: number;
  totalTeams: number;
  isVisible: boolean;
  onDismiss: () => void;
}

export const TurnTransitionOverlay: React.FC<TurnTransitionOverlayProps> = ({
  activeTeam,
  roundNumber,
  totalRounds,
  teamTurnIndex,
  totalTeams,
  isVisible,
  onDismiss,
}) => {
  useEffect(() => {
    if (isVisible) {
      soundFx.playTurnSwitch();

      // Auto dismiss after 1.8 seconds
      const timer = setTimeout(() => {
        onDismiss();
      }, 1900);

      // Keyboard space/enter listener to skip immediately
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          e.preventDefault();
          onDismiss();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  const teamColor = activeTeam.color || '#6366f1';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onDismiss}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002724]/85 backdrop-blur-md cursor-pointer select-none"
      >
        {/* Dynamic Background Ambient Glow in Team Color */}
        <div
          className="absolute w-[360px] h-[360px] rounded-full blur-[110px] opacity-40 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: teamColor }}
        />

        {/* Central Cinematic Turn Announcement Card */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 35, rotateX: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: -25 }}
          transition={{ type: 'spring', damping: 20, stiffness: 280 }}
          className="relative w-full max-w-md bg-[#003833] border-2 rounded-3xl p-6 sm:p-8 text-[#F0EDE4] shadow-2xl overflow-hidden text-center space-y-6"
          style={{ borderColor: `${teamColor}88` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Progress Bar for Timer Countdown */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#002B27] overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 1.8, ease: 'linear' }}
              className="h-full"
              style={{ backgroundColor: teamColor }}
            />
          </div>

          {/* Turn Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#002B27] border border-[#005e57] text-[#F0EDE4] shadow-xs">
            <Zap className="w-3.5 h-3.5" style={{ color: teamColor }} />
            <span>
              Question #{roundNumber} of {totalRounds} • Team {teamTurnIndex + 1} of {totalTeams}
            </span>
          </div>

          {/* Glowing Avatar Emblem */}
          <div className="relative my-2 flex items-center justify-center">
            {/* Pulsing Backlight Halo */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="absolute w-24 h-24 rounded-full blur-xl pointer-events-none"
              style={{ backgroundColor: teamColor }}
            />

            {/* Avatar Pill */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1, stiffness: 300, damping: 18 }}
              className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-2xl border-2 border-white/30"
              style={{ backgroundColor: teamColor }}
            >
              {activeTeam.name.charAt(0).toUpperCase()}
            </motion.div>
          </div>

          {/* Active Team Name & Announcement */}
          <div className="space-y-1">
            <span className="text-xs font-black tracking-widest uppercase text-amber-300 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> UP NEXT TO PLAY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F0EDE4] drop-shadow-md">
              {activeTeam.name}
            </h2>
          </div>

          {/* Team Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#005e57]">
            <div className="p-2.5 rounded-xl bg-[#002B27]/80 border border-[#005e57]/60 flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#F0EDE4]/70 uppercase tracking-wider">Score</span>
              <span className="text-sm sm:text-base font-extrabold text-[#F0EDE4] flex items-center gap-1 mt-0.5">
                <Trophy className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                {activeTeam.score}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#002B27]/80 border border-[#005e57]/60 flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#F0EDE4]/70 uppercase tracking-wider">Streak</span>
              <span className="text-sm sm:text-base font-extrabold text-[#F0EDE4] flex items-center gap-1 mt-0.5">
                <Flame className="w-3.5 h-3.5 text-orange-300 shrink-0" />
                {activeTeam.streak}x
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#002B27]/80 border border-[#005e57]/60 flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#F0EDE4]/70 uppercase tracking-wider">Unlocked</span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-300 mt-0.5">
                {activeTeam.unlockedResumeItems.length}
              </span>
            </div>
          </div>

          {/* Continue Action Button */}
          <div className="pt-2">
            <button
              onClick={onDismiss}
              className="w-full py-3 px-5 rounded-xl font-black text-xs uppercase tracking-wider text-[#004741] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] hover:bg-[#FAF8F3] active:scale-[0.98]"
              style={{ backgroundColor: '#F0EDE4' }}
            >
              <span>Start Turn Now</span>
              <ArrowRight className="w-4 h-4 text-[#004741]" />
            </button>
            <p className="text-[10px] text-[#F0EDE4]/70 font-medium mt-2">
              Press <kbd className="px-1.5 py-0.5 bg-[#002B27] text-[#F0EDE4] rounded border border-[#005e57]">Space</kbd> or click anywhere to jump in
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
