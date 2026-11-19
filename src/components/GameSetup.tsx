import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Clock, HelpCircle, Play, Volume2, VolumeX, Sparkles, RefreshCw, RotateCcw, ArrowRight } from 'lucide-react';
import { GameSettings, GameMode } from '../types';

interface GameSetupProps {
  onStartGame: (teamNames: string[], settings: GameSettings) => void;
  defaultSound: boolean;
  onToggleSound: () => void;
  hasSavedSession?: boolean;
  onRestoreSession?: () => void;
  onClearSession?: () => void;
}

const DEFAULT_TEAM_PRESETS = [
  ['Team Synergy', 'Apex Resumes'],
  ['Career Craft', 'Resume Mavericks', 'Talent Titans'],
  ['Executive Squad', 'ATS Breakers', 'STAR Strikers', 'Velocity CV'],
  ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Epsilon']
];

const PRESET_NAMES_POOL = [
  'Career Craft', 'Resume Mavericks', 'Talent Titans', 'ATS Breakers',
  'STAR Strikers', 'Velocity CV', 'Impact Innovators', 'Headline Heroes',
  'Quantified Leaders', 'Executive Edge'
];

export const GameSetup: React.FC<GameSetupProps> = ({
  onStartGame,
  defaultSound,
  onToggleSound,
  hasSavedSession,
  onRestoreSession,
  onClearSession,
}) => {
  const [teamCount, setTeamCount] = useState<number>(2);
  const [teamNames, setTeamNames] = useState<string[]>(['Team Alpha', 'Team Beta']);
  const [timerSeconds, setTimerSeconds] = useState<number>(20);
  const [totalQuestions, setTotalQuestions] = useState<number>(15);
  const [gameMode, setGameMode] = useState<GameMode>('turn_based');

  const handleTeamCountChange = (count: number) => {
    setTeamCount(count);
    setTeamNames(prev => {
      const next = [...prev];
      if (count > next.length) {
        for (let i = next.length; i < count; i++) {
          next.push(PRESET_NAMES_POOL[i % PRESET_NAMES_POOL.length] || `Team ${i + 1}`);
        }
      } else {
        return next.slice(0, count);
      }
      return next;
    });
  };

  const handleNameChange = (index: number, value: string) => {
    setTeamNames(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const randomizeNames = () => {
    const shuffled = [...PRESET_NAMES_POOL].sort(() => Math.random() - 0.5);
    setTeamNames(shuffled.slice(0, teamCount));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validNames = teamNames.map((n, i) => n.trim() || `Team ${i + 1}`);
    onStartGame(validNames, {
      timerSeconds,
      totalQuestions,
      gameMode,
      soundEnabled: defaultSound
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Saved Session Restore Banner */}
      {hasSavedSession && onRestoreSession && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 p-4 rounded-xl bg-slate-gray-dark text-white shadow-md border border-slate-gray/30 flex flex-wrap items-center justify-between gap-3"
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Active Battle Session Detected
            </span>
            <p className="text-xs text-slate-300">
              You have an unfinished game session saved in browser storage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onClearSession && (
              <button
                type="button"
                onClick={onClearSession}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Discard
              </button>
            )}
            <button
              type="button"
              onClick={onRestoreSession}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Resume Game</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Header Banner */}

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6 space-y-1.5"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ResuQuest
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          Configure participating teams and round settings to begin.
        </p>
      </motion.div>

      {/* Main Setup Card */}
      <motion.form
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-cream-card rounded-2xl shadow-sm border border-slate-gray/20 p-6 sm:p-8 space-y-6"
      >
        {/* Step 1: Group Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-gray" />
              <span>Participating Teams</span>
            </label>
            <button
              type="button"
              onClick={randomizeNames}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Randomize</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {[2, 3, 4, 5].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => handleTeamCountChange(num)}
                className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs border transition-all cursor-pointer ${
                  teamCount === num
                    ? 'bg-slate-gray text-white border-slate-gray'
                    : 'bg-white text-slate-700 border-slate-gray/20 hover:border-slate-gray/40'
                }`}
              >
                {num} Teams
              </button>
            ))}
          </div>

          {/* Team Name Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {teamNames.map((name, idx) => (
              <div key={idx} className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Team {idx + 1}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  placeholder={`Team ${idx + 1}...`}
                  maxLength={24}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-gray/20 text-slate-900 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-slate-gray bg-white"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-gray/15" />

        {/* Step 2: Game Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Round Timer */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-gray" />
              <span>Timer / Question</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[15, 20, 30, 0].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setTimerSeconds(sec)}
                  className={`py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                    timerSeconds === sec
                      ? 'bg-slate-gray text-white border-slate-gray'
                      : 'bg-white text-slate-700 border-slate-gray/20 hover:bg-cream-dark/40'
                  }`}
                >
                  {sec === 0 ? 'No Limit' : `${sec}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-gray" />
              <span>Total Questions</span>
            </label>
            <div className="flex gap-1.5">
              {[10, 15, 20].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTotalQuestions(num)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                    totalQuestions === num
                      ? 'bg-slate-gray text-white border-slate-gray'
                      : 'bg-white text-slate-700 border-slate-gray/20 hover:bg-cream-dark/40'
                  }`}
                >
                  {num} Qs
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Game Mode Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            Interaction Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div
              onClick={() => setGameMode('turn_based')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                gameMode === 'turn_based'
                  ? 'bg-white border-slate-gray ring-1 ring-slate-gray text-slate-900'
                  : 'bg-white border-slate-gray/20 text-slate-600 hover:border-slate-gray/40'
              }`}
            >
              <span className="font-bold text-xs text-slate-gray-dark block">Turn-Based Hotseat</span>
              <span className="text-[11px] text-slate-500">Teams answer in alternating turns.</span>
            </div>

            <div
              onClick={() => setGameMode('all_teams')}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                gameMode === 'all_teams'
                  ? 'bg-white border-slate-gray ring-1 ring-slate-gray text-slate-900'
                  : 'bg-white border-slate-gray/20 text-slate-600 hover:border-slate-gray/40'
              }`}
            >
              <span className="font-bold text-xs text-slate-gray-dark block">All-Teams Lock In</span>
              <span className="text-[11px] text-slate-500">Simultaneous answer lock in per round.</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-slate-gray hover:bg-slate-gray-hover text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Game</span>
          </button>
        </div>
      </motion.form>
    </div>
  );
};
