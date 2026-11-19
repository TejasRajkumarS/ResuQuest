import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, CheckCircle2, ChevronDown, X } from 'lucide-react';
import { Question } from '../types';

interface QuestionReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
}

export const QuestionReviewModal: React.FC<QuestionReviewModalProps> = ({
  isOpen,
  onClose,
  questions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(questions.map((question) => question.category)))];
  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter((question) => question.category === selectedCategory);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/80 p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-dialog-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-[16px] border border-line bg-paper-raised shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="flex items-center justify-between gap-4 border-b border-line bg-paper-raised px-4 py-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-brand-700 text-white">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="review-dialog-title" className="truncate text-base font-extrabold text-brand-900">Question and answer key</h2>
                <p className="mt-0.5 text-xs text-ink-soft">{questions.length} questions used in this tournament</p>
              </div>
            </div>
            <button ref={closeButtonRef} type="button" onClick={onClose} className="rq-icon-button !h-10 !w-10" aria-label="Close question review">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="no-scrollbar flex shrink-0 items-center gap-2 overflow-x-auto border-b border-line bg-white px-4 py-3 sm:px-6">
            <span className="mr-1 shrink-0 text-[0.65rem] font-extrabold uppercase tracking-[0.09em] text-ink-soft">Filter</span>
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isSelected}
                  className={`min-h-9 shrink-0 rounded-[7px] border px-3 text-xs font-bold transition-colors ${
                    isSelected
                      ? 'border-brand-700 bg-brand-700 text-white'
                      : 'border-line bg-paper-raised text-ink-soft hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto bg-paper px-3 py-4 sm:px-6 sm:py-6">
            <div className="mx-auto max-w-3xl space-y-2.5">
              {filteredQuestions.map((question, index) => (
                <details key={question.id} className="group overflow-hidden rounded-[11px] border border-line bg-paper-raised">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-4 py-3.5 marker:hidden sm:px-5">
                    <span className="tabular-nums w-8 shrink-0 text-xs font-black text-ink-soft">{String(index + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-brand-600">{question.category}</span>
                      <span className="mt-1 block text-sm font-bold leading-5 text-brand-900">{question.question}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>

                  <div className="border-t border-line px-4 pb-5 pt-4 sm:px-5 sm:pl-16">
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isCorrect = optionIndex === question.correctAnswer;
                        return (
                          <div
                            key={optionIndex}
                            className={`flex items-start gap-3 rounded-[8px] border px-3 py-2.5 text-xs leading-5 ${
                              isCorrect
                                ? 'border-brand-500 bg-brand-50 font-bold text-brand-900'
                                : 'border-line bg-white text-ink-soft'
                            }`}
                          >
                            <span className="font-black">{String.fromCharCode(65 + optionIndex)}.</span>
                            <span className="flex-1">{option}</span>
                            {isCorrect && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-label="Correct answer" />}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 border-l-2 border-brand-500 pl-4">
                      <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.09em] text-brand-700">Why it matters</p>
                      <p className="mt-1 text-xs leading-5 text-ink-soft">{question.explanation}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <footer className="flex items-center justify-between gap-4 border-t border-line bg-paper-raised px-4 py-3 sm:px-6">
            <p className="hidden text-xs text-ink-soft sm:block">Open a question to see the answer and career rationale.</p>
            <button type="button" onClick={onClose} className="rq-button-secondary ml-auto !min-h-10">Close review</button>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
