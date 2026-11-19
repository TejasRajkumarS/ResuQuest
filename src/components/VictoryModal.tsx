import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Team } from '../types';
import { calculateTier } from '../data/tiers';
import { soundFx } from '../utils/sound';
import { Trophy, Sparkles, Award, Flame, CheckCircle2, Crown, ArrowRight, Zap, PartyPopper } from 'lucide-react';

interface VictoryModalProps {
  winner: Team;
  totalTeams: number;
  isOpen: boolean;
  onClose: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  winner,
  totalTeams,
  isOpen,
  onClose,
}) => {
  const percentage = Math.round(
    (winner.correctAnswersCount / (winner.totalAnswersCount || 1)) * 100
  );
  const tierInfo = calculateTier(percentage);
  const winnerColor = winner.color || '#004741';

  const fireVictoryConfetti = () => {
    // Multi-stage celebratory confetti explosion matching #004741 & #F0EDE4 theme
    const count = 250;
    const defaults = { origin: { y: 0.6 } };

    const themeColors = ['#004741', '#F0EDE4', '#00635B', '#E5C158', '#FAF8F3', '#002B27'];

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, {
      spread: 35,
      startVelocity: 60,
      colors: ['#004741', '#F0EDE4', '#E5C158'],
    });
    fire(0.2, {
      spread: 75,
      colors: ['#00635B', '#FAF8F3', '#004741', '#F0EDE4'],
    });
    fire(0.35, {
      spread: 110,
      decay: 0.9,
      scalar: 1.15,
      colors: themeColors,
    });
    fire(0.1, {
      spread: 130,
      startVelocity: 35,
      decay: 0.92,
      colors: ['#F0EDE4', '#004741', '#E5C158'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 50,
      colors: themeColors,
    });
  };

  useEffect(() => {
    if (isOpen) {
      soundFx.playVictory();
      fireVictoryConfetti();

      // Continuous secondary confetti bursts in theme colors
      const timer1 = setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#004741', '#F0EDE4', '#E5C158', '#00635B'],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#004741', '#F0EDE4', '#E5C158', '#00635B'],
        });
      }, 700);

      const timer2 = setTimeout(() => {
        fireVictoryConfetti();
      }, 1800);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002724]/90 backdrop-blur-lg overflow-y-auto"
        onClick={onClose}
      >
        {/* Dynamic Glowing Radial Background */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 pointer-events-none"
          style={{ backgroundColor: '#004741' }}
        />

        {/* Central Victory Card */}
        <motion.div
          initial={{ scale: 0.65, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-[#003833] border-2 border-[#00635B] rounded-3xl p-6 sm:p-9 text-[#F0EDE4] shadow-2xl overflow-hidden text-center space-y-6 my-auto"
        >
          {/* Top Decorative Banner Light Pattern */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#00635B]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Crown & Victory Badge Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002B27] border border-[#00635B] text-amber-300 text-xs font-black uppercase tracking-widest shadow-inner">
            <Crown className="w-4 h-4 fill-amber-400 text-amber-300" />
            <span>TOURNAMENT CHAMPION</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          {/* Bouncing Golden Trophy & Rotating Halo Animation */}
          <div className="relative my-4 flex items-center justify-center">
            {/* Pulsing Light Halo */}
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.4, 0.8, 0.4],
                rotate: [0, 180, 360],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute w-36 h-36 rounded-full border-2 border-dashed border-amber-400/50 pointer-events-none"
            />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-2xl flex items-center justify-center"
            >
              <div className="w-full h-full bg-[#002B27] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-amber-400 fill-amber-400/30 drop-shadow-lg" />
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-amber-300/10 pointer-events-none"
                />
              </div>
            </motion.div>
          </div>

          {/* Winner Title & Team Name */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F0EDE4] drop-shadow-md">
              {winner.name}
            </h1>
            
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${tierInfo.badgeBg} ${tierInfo.badgeTextColor} border border-white/20`}>
                TIER {tierInfo.tier} • {tierInfo.title}
              </span>
            </div>
          </div>

          {/* Winner Achievement Highlights Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#005e57]">
            <div className="p-3 rounded-xl bg-[#002B27]/90 border border-[#005e57]/80 flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#F0EDE4]/70 uppercase tracking-wider">Final Score</span>
              <span className="text-lg sm:text-xl font-black text-amber-300 flex items-center gap-1 mt-0.5">
                <Trophy className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
                {winner.score}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#002B27]/90 border border-[#005e57]/80 flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#F0EDE4]/70 uppercase tracking-wider">Accuracy</span>
              <span className="text-lg sm:text-xl font-black text-emerald-300 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                {percentage}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#002B27]/90 border border-[#005e57]/80 flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#F0EDE4]/70 uppercase tracking-wider">Max Streak</span>
              <span className="text-lg sm:text-xl font-black text-orange-300 flex items-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 text-orange-300 fill-orange-300 shrink-0" />
                {winner.maxStreak}x
              </span>
            </div>
          </div>

          {/* Verdict Quote */}
          <div className="p-3 bg-[#002B27]/60 rounded-xl border border-[#005e57]/60 text-xs text-[#F0EDE4]/90 italic">
            "{tierInfo.verdict}"
          </div>

          {/* Actions Bar */}
          <div className="pt-2 space-y-2">
            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider text-[#004741] hover:bg-[#FAF8F3] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: '#F0EDE4' }}
            >
              <span>View Leaderboard & Full Resumes</span>
              <ArrowRight className="w-4 h-4 text-[#004741]" />
            </button>

            <button
              onClick={fireVictoryConfetti}
              type="button"
              className="w-full py-2 px-4 rounded-lg bg-transparent hover:bg-[#002B27] text-[#F0EDE4]/80 hover:text-amber-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
              <span>Fire Theme Confetti Cannon</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
