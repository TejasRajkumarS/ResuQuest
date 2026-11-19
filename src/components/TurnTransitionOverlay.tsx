import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';
import { Team } from '../types';
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
    if (!isVisible) return;

    soundFx.playTurnSwitch();
    const timer = window.setTimeout(onDismiss, 2800);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
        event.preventDefault();
        onDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/80 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="turn-transition-title"
        onClick={onDismiss}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="w-full max-w-[470px] rounded-[16px] border border-white/15 bg-brand-800 p-6 text-white shadow-2xl sm:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-brand-200">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span>Team {teamTurnIndex + 1} of {totalTeams}</span>
          </div>

          <p className="mt-8 text-sm leading-6 text-white/65">Pass the screen to</p>
          <h2 id="turn-transition-title" className="mt-1 text-3xl font-extrabold tracking-[-0.03em]">
            {activeTeam.name}
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/65">
            Round {roundNumber} of {totalRounds} is ready. The timer starts when the next team begins.
          </p>

          <div className="mt-7 flex items-center justify-between border-t border-white/12 pt-5">
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-brand-200">Current score</p>
              <p className="tabular-nums mt-1 text-xl font-black">{activeTeam.score} points</p>
            </div>
            <button type="button" onClick={onDismiss} className="rq-button-primary !border-white !bg-white !text-brand-900 hover:!bg-brand-50">
              Begin turn
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-5 text-center text-[0.68rem] font-semibold text-white/45">
            Press Space or Enter to continue
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
