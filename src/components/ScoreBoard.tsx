import React from 'react';
import { motion } from 'motion/react';
import { Team } from '../types';
import { Trophy, FileText, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface ScoreBoardProps {
  teams: Team[];
  activeTeamId: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  onOpenResumePreview: (teamId: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRestart: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  teams,
  activeTeamId,
  currentQuestionIndex,
  totalQuestions,
  onOpenResumePreview,
  soundEnabled,
  onToggleSound,
  onRestart,
}) => {
  const rankedTeamIds = [...teams]
    .sort((a, b) => b.score - a.score)
    .map(t => t.id);

  return (
    <div className="w-full bg-cream-card/90 backdrop-blur-md border-b border-slate-gray/15 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Round Counter */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs font-semibold tracking-wider text-slate-gray-dark uppercase">
            Question <span className="font-black text-slate-900">{currentQuestionIndex + 1}</span> of {totalQuestions}
          </div>

          <div className="h-4 w-px bg-slate-gray/20" />

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute' : 'Sound On'}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-cream-dark/50 transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-slate-gray-dark" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            <button
              onClick={onRestart}
              title="Restart Game"
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-cream-dark/50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Right: Minimal Team Score Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          {teams.map((team) => {
            const isActive = team.id === activeTeamId;
            const rank = rankedTeamIds.indexOf(team.id) + 1;
            const isLeader = rank === 1 && team.score > 0;
            const unlockedCount = team.unlockedResumeItems.length;
            const progressPercent = Math.min(
              100,
              Math.round((unlockedCount / totalQuestions) * 100)
            );

            return (
              <motion.div
                key={team.id}
                layout
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-gray text-white border-slate-gray-dark shadow-xs'
                    : 'bg-white text-slate-800 border-slate-gray/20 hover:border-slate-gray/40'
                }`}
                onClick={() => onOpenResumePreview(team.id)}
                title={`Click to inspect ${team.name}'s Resume (${progressPercent}% unlocked)`}
              >
                {/* Initial */}
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-cream-dark text-slate-700'
                  }`}
                >
                  {team.name.charAt(0).toUpperCase()}
                </div>

                {/* Team Name & Score */}
                <span className="font-medium truncate max-w-[90px]">
                  {team.name}
                </span>

                {isLeader && (
                  <Trophy className="w-3 h-3 text-amber-300 fill-amber-300 shrink-0" />
                )}

                <span className={`font-black ${isActive ? 'text-amber-200' : 'text-slate-gray-dark'}`}>
                  {team.score}
                </span>

                {/* Mini Progress Dot Bar */}
                <div className={`w-8 h-1 rounded-full overflow-hidden shrink-0 ${
                  isActive ? 'bg-white/20' : 'bg-cream-dark'
                }`}>
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <FileText className={`w-3 h-3 shrink-0 opacity-60 hover:opacity-100 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

