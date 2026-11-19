import React from 'react';
import { Team } from '../types';
import { FileText, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';

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
  const rankedTeamIds = [...teams].sort((a, b) => b.score - a.score).map((team) => team.id);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper-raised">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-4 lg:justify-start">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-brand-800 text-xs font-black tracking-tight text-white">
              RQ
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold tracking-[-0.01em] text-brand-900">ResuQuest</p>
              <p className="tabular-nums mt-0.5 text-[0.68rem] font-bold uppercase tracking-[0.09em] text-ink-soft">
                Round {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={onToggleSound}
              className="rq-icon-button !h-9 !w-9"
              aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
              title={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="rq-icon-button !h-9 !w-9"
              aria-label="End game and return to setup"
              title="End game"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-1 lg:justify-center lg:overflow-visible lg:pb-0" role="list">
          {teams.map((team) => {
            const isActive = team.id === activeTeamId;
            const rank = rankedTeamIds.indexOf(team.id) + 1;
            const isLeader = rank === 1 && team.score > 0;

            return (
              <button
                key={team.id}
                type="button"
                onClick={() => onOpenResumePreview(team.id)}
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-[9px] border px-3 text-left transition-colors ${
                  isActive
                    ? 'border-brand-700 bg-brand-700 text-white'
                    : 'border-line bg-white text-ink hover:border-brand-200 hover:bg-brand-50'
                }`}
                title={`View ${team.name}'s resume draft`}
                aria-label={`View ${team.name}'s resume draft. Score ${team.score}.`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] text-[0.68rem] font-black ${
                    isActive ? 'bg-white/15 text-white' : 'bg-paper-deep text-brand-800'
                  }`}
                  aria-hidden="true"
                >
                  {team.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[80px] truncate text-xs font-bold hidden sm:inline">{team.name}</span>
                {isLeader && <Trophy className="h-3.5 w-3.5 shrink-0 text-[#d2a84d]" aria-label="Current leader" />}
                <span className={`tabular-nums text-xs font-black ${isActive ? 'text-brand-100' : 'text-brand-700'}`}>
                  {team.score}
                </span>
                <FileText className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-white/65' : 'text-ink-soft/65'}`} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <button
            type="button"
            onClick={onToggleSound}
            className="rq-icon-button"
            aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
            title={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rq-icon-button"
            aria-label="End game and return to setup"
            title="End game"
          >
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};
