import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { X, CheckCircle2, HelpCircle, Sparkles, BookOpen } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(questions.map(q => q.category)))];

  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-slate-50 rounded-2xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="bg-slate-gray-dark text-white p-5 flex items-center justify-between border-b border-slate-gray/40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-gray rounded-xl text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Resume Building Knowledge Bank</h2>
                <p className="text-xs text-slate-300">Review MCQ questions, correct answers, and expert resume tips</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-gray transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-cream-card border-b border-slate-gray/20 px-5 py-3 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-gray text-white shadow-xs'
                    : 'bg-cream-dark text-slate-700 hover:bg-cream-dark/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Question List Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            {filteredQuestions.map((q, index) => (
              <div
                key={q.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-slate-gray-dark uppercase tracking-wider bg-slate-gray/10 px-2 py-0.5 rounded border border-slate-gray/20">
                    {q.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Question #{index + 1}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{q.question}</h3>

                {/* Options list */}
                <div className="space-y-1.5 pl-1">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctAnswer;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2 rounded-lg text-xs font-medium flex items-center gap-2 border ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3 bg-cream-card rounded-lg border border-slate-gray/20 text-xs text-slate-700 space-y-0.5">
                  <strong className="text-slate-900 font-bold block text-[11px]">Career Explanation:</strong>
                  <p>{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-cream-card p-4 border-t border-slate-gray/20 flex justify-end">
            <button
              onClick={onClose}
              className="py-2 px-5 bg-slate-gray hover:bg-slate-gray-hover text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Close Review
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
