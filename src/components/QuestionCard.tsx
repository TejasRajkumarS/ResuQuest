import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Flame,
  XCircle,
} from 'lucide-react';
import { Question, Team } from '../types';

interface QuestionCardProps {
  question: Question;
  currentTeam: Team;
  roundNumber: number;
  totalRounds: number;
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
  roundNumber,
  totalRounds,
  timerDuration,
  onAnswerSubmit,
  onNextQuestion,
  isRoundComplete,
  lastAnswerResult,
}) => {
  const isUntimed = timerDuration === 0;
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setTimeLeft(timerDuration);
    setElapsedSeconds(0);
    setSelectedOption(null);
    setHasSubmitted(false);
  }, [question.id, currentTeam.id, timerDuration]);

  useEffect(() => {
    if (hasSubmitted || isRoundComplete) return;

    if (isUntimed) {
      const interval = window.setInterval(() => {
        setElapsedSeconds((previous) => previous + 1);
      }, 1000);
      return () => window.clearInterval(interval);
    }

    if (timeLeft <= 0) {
      setHasSubmitted(true);
      onAnswerSubmit(-1, timerDuration);
      return;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timeLeft, hasSubmitted, isRoundComplete, onAnswerSubmit, timerDuration, isUntimed]);

  const handleSelectOption = (index: number) => {
    if (hasSubmitted || isRoundComplete) return;
    setSelectedOption(index);
    setHasSubmitted(true);
    const timeSpent = isUntimed ? elapsedSeconds : timerDuration - timeLeft;
    onAnswerSubmit(index, timeSpent);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (hasSubmitted) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onNextQuestion();
        }
        return;
      }

      let optionIndex: number | null = null;
      if (event.key === '1' || event.key.toLowerCase() === 'a') optionIndex = 0;
      if (event.key === '2' || event.key.toLowerCase() === 'b') optionIndex = 1;
      if (event.key === '3' || event.key.toLowerCase() === 'c') optionIndex = 2;
      if (event.key === '4' || event.key.toLowerCase() === 'd') optionIndex = 3;

      if (optionIndex !== null && optionIndex < question.options.length) {
        event.preventDefault();
        handleSelectOption(optionIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasSubmitted, isRoundComplete, question.options, onNextQuestion]);

  const isTimerCritical = !isUntimed && timeLeft <= 5;
  const roundProgress = Math.min(100, Math.max(0, (roundNumber / Math.max(totalRounds, 1)) * 100));
  const timedOut = lastAnswerResult?.selectedOption === -1;
  const earnedPoints = question.resumeImpact.points + (currentTeam.streak > 1 ? currentTeam.streak * 25 : 0);

  return (
    <div className="w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-brand-700 text-sm font-black text-white">
              {currentTeam.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-brand-900">{currentTeam.name}</p>
              <p className="mt-0.5 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-ink-soft">
                {question.category}
              </p>
            </div>
          </div>

          <div
            className={`inline-flex min-h-10 items-center gap-2 self-start rounded-[9px] border px-3 text-xs font-extrabold tabular-nums sm:self-auto ${
              isTimerCritical
                ? 'border-[#d9a097] bg-[#f9ebe7] text-[#8e3528]'
                : 'border-line bg-white text-brand-800'
            }`}
            role="timer"
            aria-live="polite"
          >
            <Clock3 className="h-4 w-4" aria-hidden="true" />
            <span>{isUntimed ? 'No time limit' : `${timeLeft} seconds left`}</span>
          </div>
        </div>

        <div className="mb-5 h-1 overflow-hidden rounded-full bg-brand-100" aria-hidden="true">
          <div className="h-full bg-brand-600 transition-[width] duration-300" style={{ width: `${roundProgress}%` }} />
        </div>

        <section className="overflow-hidden rounded-[16px] border border-line bg-paper-raised shadow-[0_18px_45px_rgba(4,51,47,0.08)]">
          <div className="border-b border-line px-5 py-6 sm:px-8 sm:py-8">
            <p className="rq-eyebrow">Round {roundNumber} of {totalRounds}</p>
            <h1 className="mt-3 max-w-3xl text-xl font-extrabold leading-[1.35] tracking-[-0.02em] text-brand-900 sm:text-2xl lg:text-[1.75rem]">
              {question.question}
            </h1>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <fieldset disabled={hasSubmitted}>
              <legend className="sr-only">Answer choices</legend>
              <div className="space-y-2.5">
                {question.options.map((optionText, index) => {
                  const isCorrect = index === question.correctAnswer;
                  const isSelected = index === selectedOption;
                  let optionClass = 'border-line bg-white text-ink hover:border-brand-200 hover:bg-brand-50';

                  if (hasSubmitted) {
                    if (isCorrect) {
                      optionClass = 'border-brand-500 bg-brand-50 text-brand-900';
                    } else if (isSelected) {
                      optionClass = 'border-[#c98578] bg-[#f9ebe7] text-[#6f2f26]';
                    } else {
                      optionClass = 'border-line bg-[#f7f6f1] text-ink-soft/65';
                    }
                  }

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={hasSubmitted}
                      onClick={() => handleSelectOption(index)}
                      className={`flex min-h-[64px] w-full items-center gap-3 rounded-[10px] border px-3.5 py-3 text-left transition-colors sm:gap-4 sm:px-4 ${optionClass}`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border text-xs font-black ${
                          hasSubmitted && isCorrect
                            ? 'border-brand-700 bg-brand-700 text-white'
                            : hasSubmitted && isSelected
                            ? 'border-[#a94436] bg-[#a94436] text-white'
                            : 'border-line bg-paper-deep text-brand-800'
                        }`}
                        aria-hidden="true"
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-sm font-semibold leading-6">{optionText}</span>
                      <span className="hidden text-[0.65rem] font-bold text-ink-soft/65 sm:inline">{index + 1}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {hasSubmitted && lastAnswerResult && (
              <div className="mt-7 border-t border-line pt-7" aria-live="polite">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    {lastAnswerResult.isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
                    ) : timedOut ? (
                      <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#a94436]" aria-hidden="true" />
                    ) : (
                      <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#a94436]" aria-hidden="true" />
                    )}
                    <div>
                      <h2 className="text-lg font-extrabold text-brand-900">
                        {lastAnswerResult.isCorrect ? 'Correct answer' : timedOut ? 'Time expired' : 'Not quite'}
                      </h2>
                      <p className="mt-1 text-xs leading-5 text-ink-soft">
                        {lastAnswerResult.isCorrect
                          ? `That earns ${earnedPoints} points for ${currentTeam.name}.`
                          : timedOut
                          ? 'No points were added. Review the correct answer before continuing.'
                          : 'No points were added. Review the rationale before continuing.'}
                      </p>
                    </div>
                  </div>
                  <span className="tabular-nums self-start rounded-[7px] border border-line bg-paper px-2.5 py-1 text-xs font-black text-brand-800">
                    +{lastAnswerResult.isCorrect ? earnedPoints : 0} pts
                  </span>
                </div>

                {!lastAnswerResult.isCorrect && (
                  <div className="mt-5 rounded-[10px] border border-brand-200 bg-brand-50 p-4">
                    <p className="rq-eyebrow !text-brand-700">Correct answer</p>
                    <div className="mt-2 flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-brand-700 text-[0.68rem] font-black text-white">
                        {String.fromCharCode(65 + question.correctAnswer)}
                      </span>
                      <p className="text-sm font-bold leading-6 text-brand-900">{question.options[question.correctAnswer]}</p>
                    </div>
                  </div>
                )}

                <div className="mt-5 rounded-[10px] border border-line bg-white p-4 sm:p-5">
                  <p className="rq-eyebrow">Why this matters</p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{question.explanation}</p>
                </div>

                {lastAnswerResult.isCorrect && (
                  <div className="mt-4 flex items-start gap-3 rounded-[10px] border border-[#d9c895] bg-[#fbf6e5] p-4">
                    <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8b6b1f]" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#795b18]">Resume unlock</p>
                      <p className="mt-1 text-sm font-extrabold text-brand-900">{question.resumeImpact.unlockedTitle}</p>
                      <p className="mt-1 text-xs leading-5 text-ink-soft">{question.resumeImpact.unlockedDescription}</p>
                    </div>
                  </div>
                )}

                {lastAnswerResult.isCorrect && currentTeam.streak >= 3 && (
                  <div className="mt-4 flex items-center gap-3 rounded-[10px] border border-[#e2c88f] bg-[#fff8e8] px-4 py-3">
                    <Flame className="h-4 w-4 shrink-0 text-[#a56d0c]" aria-hidden="true" />
                    <p className="text-xs font-bold text-[#704f13]">
                      {currentTeam.streak}-answer streak · +{currentTeam.streak * 25} bonus points
                    </p>
                  </div>
                )}

                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.7rem] font-semibold text-ink-soft">
                    Press <kbd className="rounded-[4px] border border-line bg-paper px-1.5 py-0.5 font-bold text-brand-800">Enter</kbd> to continue
                  </p>
                  <button type="button" onClick={onNextQuestion} className="rq-button-primary">
                    Continue
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {!hasSubmitted && (
            <div className="flex items-center justify-between border-t border-line bg-paper px-5 py-3.5 text-[0.7rem] font-semibold text-ink-soft sm:px-8">
              <span>Use number keys or A–D to answer.</span>
              <span className="hidden sm:inline">Choose the strongest answer.</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
