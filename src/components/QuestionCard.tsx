import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, Team } from '../types';
import { Clock, CheckCircle2, XCircle, Sparkles, ArrowRight, HelpCircle, Award, AlertCircle, Flame, Zap } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface QuestionCardProps {
  question: Question;
  currentTeam: Team;
  allTeams: Team[];
  gameMode: 'turn_based' | 'all_teams';
  timerDuration: number;
  onAnswerSubmit: (selectedOption: number, timeSpent: number) => void;
  onNextQuestion: () => void;
  isRoundComplete: boolean;
  lastAnswerResult?: {
    isCorrect: boolean;
    selectedOption: number;
    unlockedImpact?: Question['resumeImpact'];
  };
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentTeam,
  allTeams,
  gameMode,
  timerDuration,
  onAnswerSubmit,
  onNextQuestion,
  isRoundComplete,
  lastAnswerResult,
}) => {
  const isUntimed = timerDuration === 0;
  const [timeLeft, setTimeLeft] = useState<number>(timerDuration);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Reset local state when question changes
  useEffect(() => {
    setTimeLeft(timerDuration);
    setElapsedSeconds(0);
    setSelectedOption(null);
    setHasSubmitted(false);
  }, [question.id, currentTeam.id, timerDuration]);

  // Automated Round Timer / Elapsed Counter
  useEffect(() => {
    if (hasSubmitted || isRoundComplete) return;

    if (isUntimed) {
      const interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (timeLeft <= 0) {
      // Auto-submit timeout (incorrect)
      setHasSubmitted(true);
      onAnswerSubmit(-1, timerDuration);
      soundFx.playIncorrect();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        if (next <= 5 && next > 0) {
          soundFx.playTimerTick();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, hasSubmitted, isRoundComplete, onAnswerSubmit, timerDuration, isUntimed]);

  const handleSelectOption = (index: number) => {
    if (hasSubmitted || isRoundComplete) return;
    setSelectedOption(index);
    setHasSubmitted(true);
    const timeSpent = isUntimed ? elapsedSeconds : (timerDuration - timeLeft);
    onAnswerSubmit(index, timeSpent);
  };

  // Keyboard shortcut listener for options (1-4, A-D) and Next Question (Enter / Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if user is inside an input field
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (hasSubmitted) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNextQuestion();
        }
        return;
      }

      let optionIndex: number | null = null;

      if (e.key === '1' || e.key.toLowerCase() === 'a') {
        optionIndex = 0;
      } else if (e.key === '2' || e.key.toLowerCase() === 'b') {
        optionIndex = 1;
      } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
        optionIndex = 2;
      } else if (e.key === '4' || e.key.toLowerCase() === 'd') {
        optionIndex = 3;
      }

      if (optionIndex !== null && optionIndex < question.options.length) {
        e.preventDefault();
        handleSelectOption(optionIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasSubmitted, isRoundComplete, timeLeft, timerDuration, question.options, onAnswerSubmit, onNextQuestion]);

  const timerPercentage = (timeLeft / timerDuration) * 100;
  const isTimerCritical = timeLeft <= 5;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-6">
      
      {/* Clean Header: Active Team & Timer */}
      <div className="flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-gray text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {currentTeam.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {question.category}
            </div>
            <h2 className="text-sm font-bold text-slate-900">{currentTeam.name}</h2>
          </div>
        </div>

        {/* Minimal Countdown Timer / Untimed Indicator */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
          !isUntimed && isTimerCritical 
            ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse' 
            : 'bg-cream-card text-slate-700 border-slate-gray/20'
        }`}>
          <Clock className="w-3.5 h-3.5 text-slate-gray" />
          <span>{isUntimed ? 'No Limit' : `${timeLeft}s`}</span>
        </div>
      </div>

      {/* Main Question Box */}
      <motion.div
        key={question.id}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        className="bg-cream-card rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-gray/20 space-y-6 relative overflow-hidden min-h-[400px] flex flex-col justify-between"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-gray-dark">
              Question #{question.id}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {question.question}
            </h3>
          </div>

          {/* MCQ Options Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((optionText, idx) => {
              let optionStyle = 'bg-white border-slate-gray/20 text-slate-800 hover:bg-cream-dark/30 hover:border-slate-gray/40';
              
              if (hasSubmitted) {
                if (idx === question.correctAnswer) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                } else if (idx === selectedOption && idx !== question.correctAnswer) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 opacity-80';
                } else {
                  optionStyle = 'bg-white/50 border-slate-200 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        hasSubmitted && idx === question.correctAnswer
                          ? 'bg-emerald-600 text-white'
                          : hasSubmitted && idx === selectedOption
                          ? 'bg-rose-600 text-white'
                          : 'bg-cream-dark text-slate-700 border border-slate-gray/20'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm font-medium leading-relaxed">
                      {optionText}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyboard Hint Footer Bar */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium border-t border-slate-gray/10">
          <span className="flex items-center gap-1">
            <span className="font-mono bg-cream-dark px-1.5 py-0.5 rounded border border-slate-gray/20">1-4</span>
            <span>or</span>
            <span className="font-mono bg-cream-dark px-1.5 py-0.5 rounded border border-slate-gray/20">A-D</span>
            <span className="ml-0.5">to select</span>
          </span>

          {hasSubmitted && (
            <span className="flex items-center gap-1 text-slate-gray-dark font-bold">
              <span className="font-mono bg-slate-gray/15 px-1.5 py-0.5 rounded text-slate-gray-dark">Enter</span>
              <span>Next</span>
            </span>
          )}
        </div>

        {/* Overlapping Feedback & Animated Answer Comparison Card */}
        <AnimatePresence>
          {hasSubmitted && lastAnswerResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className={`absolute inset-0 z-20 p-5 sm:p-6 rounded-2xl backdrop-blur-md shadow-2xl border-2 flex flex-col justify-between overflow-y-auto space-y-4 ${
                lastAnswerResult.isCorrect
                  ? 'bg-emerald-50/95 border-emerald-400 text-emerald-950'
                  : 'bg-cream-card/95 border-slate-gray/40 text-slate-900'
              }`}
            >
              <div className="space-y-4">
                {/* Overall Header Badge */}
                <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-3">
                  <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base">
                    {lastAnswerResult.isCorrect ? (
                      <>
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-emerald-900">Spot On! Correct Choice</span>
                          <span className="ml-2 text-xs font-bold text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded-full border border-emerald-300">
                            +{question.resumeImpact.points} pts
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <XCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-rose-900">
                            {selectedOption === null || selectedOption === -1 ? 'Time Expired!' : 'Incorrect Answer'}
                          </span>
                          <span className="ml-2 text-xs font-bold text-rose-700 bg-rose-200/80 px-2 py-0.5 rounded-full border border-rose-300">
                            0 pts
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Animated Selected Answer vs Correct Answer Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Your Selected Answer Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.08 }}
                    className={`p-3.5 rounded-xl border shadow-xs space-y-1.5 ${
                      lastAnswerResult.isCorrect
                        ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950'
                        : selectedOption === null || selectedOption === -1
                        ? 'bg-amber-50 border-amber-300 text-amber-950'
                        : 'bg-rose-50 border-rose-300/80 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider">
                      <span className={lastAnswerResult.isCorrect ? 'text-emerald-800' : 'text-slate-600'}>
                        Your Choice
                      </span>
                      {lastAnswerResult.isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-800 font-bold text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> Correct
                        </span>
                      ) : selectedOption === null || selectedOption === -1 ? (
                        <span className="flex items-center gap-1 text-amber-800 font-bold text-[10px] bg-amber-200 px-1.5 py-0.5 rounded">
                          <AlertCircle className="w-3 h-3" /> Timeout
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-800 font-bold text-[10px] bg-rose-200 px-1.5 py-0.5 rounded">
                          <XCircle className="w-3 h-3" /> Wrong
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-2.5 pt-0.5">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          lastAnswerResult.isCorrect
                            ? 'bg-emerald-700 text-white'
                            : selectedOption === null || selectedOption === -1
                            ? 'bg-amber-600 text-white'
                            : 'bg-rose-600 text-white'
                        }`}
                      >
                        {selectedOption !== null && selectedOption >= 0
                          ? String.fromCharCode(65 + selectedOption)
                          : '?'}
                      </div>
                      <p className="text-xs font-semibold leading-snug">
                        {selectedOption !== null && selectedOption >= 0
                          ? question.options[selectedOption]
                          : 'No option selected before timeout'}
                      </p>
                    </div>
                  </motion.div>

                  {/* Correct Answer Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.15 }}
                    className="p-3.5 rounded-xl border border-emerald-400 bg-emerald-100/90 text-emerald-950 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-emerald-800">
                      <span>Correct Answer</span>
                      <span className="flex items-center gap-1 text-emerald-800 font-bold text-[10px] bg-emerald-300/70 px-1.5 py-0.5 rounded border border-emerald-400/50">
                        <Sparkles className="w-3 h-3 text-emerald-700" /> Reference
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5 pt-0.5">
                      <div className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                        {String.fromCharCode(65 + question.correctAnswer)}
                      </div>
                      <p className="text-xs font-semibold leading-snug text-emerald-950">
                        {question.options[question.correctAnswer]}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Explanation Text */}
                <div className="bg-white/95 p-3.5 rounded-xl border border-slate-gray/20 space-y-1 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Career Rationale & Context
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {question.explanation}
                  </p>
                </div>

                {/* Floating Streak Notification (Triggered on 3+ Streak with CSS Keyframe Pop, Bounce & Glow) */}
                {lastAnswerResult.isCorrect && currentTeam.streak >= 3 && (
                  <div
                    className="p-3 bg-slate-gray-dark text-white rounded-xl shadow-lg border border-amber-400/60 flex items-center justify-between gap-3 my-2 animate-streak-pop-glow"
                  >
                    <div className="flex items-center gap-2.5">
                      <motion.div
                        animate={{ scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                        className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner"
                      >
                        <Flame className="w-5 h-5 fill-amber-400 text-amber-300" />
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                            🔥 {currentTeam.streak}x HOT STREAK!
                          </span>
                          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-400/25 text-amber-200 border border-amber-400/40">
                            +{currentTeam.streak * 25} Bonus Pts
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                          <strong className="text-white">{currentTeam.name}</strong> is on fire!
                        </p>
                      </div>
                    </div>
                    <Zap className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                  </div>
                )}

                {/* Unlocked Resume Component Card */}
                {lastAnswerResult.isCorrect && (
                  <div className="bg-white/95 p-3 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-600">
                        Unlocked Component
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{question.resumeImpact.unlockedTitle}</h4>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-black/10 flex justify-end">
                <button
                  onClick={onNextQuestion}
                  className="py-2.5 px-6 rounded-xl bg-slate-gray hover:bg-slate-gray-hover text-white font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02]"
                >
                  <span>Continue to Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
