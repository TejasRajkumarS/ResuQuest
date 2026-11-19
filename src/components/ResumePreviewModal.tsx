import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BriefcaseBusiness,
  CheckCircle2,
  Copy,
  Download,
  FileCheck2,
  FileText,
  Printer,
  UserRound,
  X,
} from 'lucide-react';
import { Team } from '../types';
import { calculateTier } from '../data/tiers';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  initialTeamId: string;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  isOpen,
  onClose,
  teams,
  initialTeamId,
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState(initialTeamId || teams[0]?.id || '');
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (initialTeamId) setSelectedTeamId(initialTeamId);
  }, [initialTeamId, isOpen]);

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

  const currentTeam = teams.find((team) => team.id === selectedTeamId) || teams[0];
  if (!currentTeam) return null;

  const percentage = currentTeam.totalAnswersCount > 0
    ? Math.round((currentTeam.correctAnswersCount / currentTeam.totalAnswersCount) * 100)
    : 0;
  const tier = calculateTier(percentage);

  const unlockedCategories = {
    summary: currentTeam.unlockedResumeItems.filter((item) => item.category === 'summary'),
    experience: currentTeam.unlockedResumeItems.filter((item) => item.category === 'experience'),
    skills: currentTeam.unlockedResumeItems.filter((item) => item.category === 'skills'),
    metrics: currentTeam.unlockedResumeItems.filter((item) => item.category === 'metrics'),
    formatting: currentTeam.unlockedResumeItems.filter((item) => item.category === 'formatting'),
  };

  const generateMarkdownResume = () => {
    let markdown = `# ${currentTeam.name.toUpperCase()} — CANDIDATE PROFILE\n\n`;
    markdown += `Email: email@career.org | Phone: +1 (555) 019-2831 | LinkedIn: linkedin.com/in/${currentTeam.name.toLowerCase().replace(/\s+/g, '')}\n\n`;
    markdown += `## EXECUTIVE SUMMARY\n`;
    if (unlockedCategories.summary.length > 0) {
      unlockedCategories.summary.forEach((item) => {
        markdown += `- **${item.title}**: ${item.description}\n`;
      });
    } else {
      markdown += `- Standard candidate summary draft.\n`;
    }
    markdown += `\n## PROFESSIONAL ACHIEVEMENTS & EXPERIENCE\n`;
    const experienceItems = [...unlockedCategories.experience, ...unlockedCategories.metrics];
    if (experienceItems.length > 0) {
      experienceItems.forEach((item) => {
        markdown += `- **${item.title}**: ${item.description}\n`;
      });
    } else {
      markdown += `- Responsible for general administrative and technical support tasks.\n`;
    }
    markdown += `\n## TECHNICAL & INDUSTRY SKILLS\n`;
    if (unlockedCategories.skills.length > 0) {
      unlockedCategories.skills.forEach((item) => {
        markdown += `- **${item.title}**: ${item.description}\n`;
      });
    } else {
      markdown += `- Core domain knowledge and collaborative tools.\n`;
    }
    markdown += `\n## ATS & FORMATTING GRADE\n`;
    markdown += `Tier ${tier.tier} (${tier.title}) • Score: ${currentTeam.score} points (${percentage}% accuracy)\n`;
    return markdown;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdownResume());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generateMarkdownResume()], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentTeam.name.replace(/\s+/g, '_')}_Resume.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const experienceItems = [...unlockedCategories.experience, ...unlockedCategories.metrics];

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
        aria-labelledby="resume-dialog-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[16px] border border-line bg-paper-raised shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="rq-no-print flex flex-col gap-4 border-b border-line bg-paper-raised px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-brand-700 text-white">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="resume-dialog-title" className="truncate text-base font-extrabold text-brand-900">
                  {currentTeam.name} · Resume draft
                </h2>
                <p className="mt-0.5 text-xs text-ink-soft">Built from the team&apos;s correct answers</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={handleCopyText} className="rq-button-secondary !min-h-10 !px-3" title="Copy resume as Markdown">
                {copied ? <CheckCircle2 className="h-4 w-4 text-brand-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button type="button" onClick={handleDownloadMarkdown} className="rq-button-secondary !min-h-10 !px-3" title="Download as Markdown">
                <Download className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Export .md</span>
              </button>
              <button type="button" onClick={() => window.print()} className="rq-button-secondary !min-h-10 !px-3" title="Print or save as PDF">
                <Printer className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button ref={closeButtonRef} type="button" onClick={onClose} className="rq-icon-button !h-10 !w-10" aria-label="Close resume draft">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="rq-no-print no-scrollbar flex shrink-0 gap-2 overflow-x-auto border-b border-line bg-white px-4 py-3 sm:px-6">
            {teams.map((team) => {
              const isSelected = team.id === selectedTeamId;
              return (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => setSelectedTeamId(team.id)}
                  aria-pressed={isSelected}
                  className={`flex min-h-10 shrink-0 items-center gap-2 rounded-[8px] border px-3 text-xs font-bold transition-colors ${
                    isSelected
                      ? 'border-brand-700 bg-brand-700 text-white'
                      : 'border-line bg-paper-raised text-ink-soft hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800'
                  }`}
                >
                  <span>{team.name}</span>
                  <span className={`tabular-nums ${isSelected ? 'text-brand-100' : 'text-ink-soft'}`}>{team.score} pts</span>
                </button>
              );
            })}
          </div>

          <div className="rq-print-surface flex-1 overflow-y-auto bg-paper-deep px-3 py-4 sm:px-6 sm:py-6">
            <div className="rq-print-document mx-auto w-full max-w-3xl rounded-[12px] border border-line bg-white px-6 py-8 shadow-[0_12px_30px_rgba(4,51,47,0.08)] sm:px-10 sm:py-10">
              <div className="border-b-2 border-brand-900 pb-6">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-brand-600">Candidate profile</p>
                <h1 className="mt-2 text-2xl font-black uppercase tracking-[-0.025em] text-brand-900 sm:text-3xl">
                  {currentTeam.name}
                </h1>
                <p className="mt-2 text-xs font-semibold text-ink-soft">
                  {unlockedCategories.summary[0]?.title || 'Professional profile draft'}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.68rem] text-ink-soft">
                  <span>email@career.org</span>
                  <span>+1 (555) 019-2831</span>
                  <span>linkedin.com/in/{currentTeam.name.toLowerCase().replace(/\s+/g, '')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 border-b border-line py-4 text-xs sm:grid-cols-4">
                <div>
                  <p className="font-bold uppercase tracking-[0.08em] text-ink-soft">Tier</p>
                  <p className="mt-1 font-extrabold text-brand-900">{tier.tier} · {tier.title}</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-[0.08em] text-ink-soft">Accuracy</p>
                  <p className="tabular-nums mt-1 font-extrabold text-brand-900">{percentage}%</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-[0.08em] text-ink-soft">Score</p>
                  <p className="tabular-nums mt-1 font-extrabold text-brand-900">{currentTeam.score} points</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-[0.08em] text-ink-soft">Unlocked</p>
                  <p className="tabular-nums mt-1 font-extrabold text-brand-900">{currentTeam.unlockedResumeItems.length} items</p>
                </div>
              </div>

              <section className="border-b border-line py-7">
                <h2 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-brand-900">
                  <UserRound className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  Executive summary
                </h2>
                {unlockedCategories.summary.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {unlockedCategories.summary.map((item) => (
                      <div key={item.id}>
                        <p className="text-sm font-extrabold text-brand-900">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-ink-soft">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 border-l-2 border-line pl-4 text-xs leading-5 text-ink-soft">
                    Answer the professional summary questions to replace this placeholder with a targeted candidate summary.
                  </p>
                )}
              </section>

              <section className="border-b border-line py-7">
                <h2 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-brand-900">
                  <BriefcaseBusiness className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  Professional achievements
                </h2>
                {experienceItems.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {experienceItems.map((item) => (
                      <li key={item.id} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-extrabold text-brand-900">{item.title}</p>
                          <p className="mt-1 text-xs leading-5 text-ink-soft">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 border-l-2 border-line pl-4 text-xs leading-5 text-ink-soft">
                    Answer action-verb and results questions to add specific achievements here.
                  </p>
                )}
              </section>

              <section className="border-b border-line py-7">
                <h2 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-brand-900">
                  <FileCheck2 className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  Skills and competencies
                </h2>
                {unlockedCategories.skills.length > 0 ? (
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                    {unlockedCategories.skills.map((item) => (
                      <li key={item.id}>
                        <p className="text-sm font-extrabold text-brand-900">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-ink-soft">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 border-l-2 border-line pl-4 text-xs leading-5 text-ink-soft">
                    Answer the skills and tailoring questions to add a role-focused competency set.
                  </p>
                )}
              </section>

              <section className="py-7">
                <h2 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-brand-900">
                  <FileText className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  ATS and formatting status
                </h2>
                {unlockedCategories.formatting.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {unlockedCategories.formatting.map((item) => (
                      <li key={item.id} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-extrabold text-brand-900">{item.title}</p>
                          <p className="mt-1 text-xs leading-5 text-ink-soft">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 border-l-2 border-line pl-4 text-xs leading-5 text-ink-soft">
                    Answer the ATS and formatting questions to record document-level improvements.
                  </p>
                )}
              </section>
            </div>
          </div>

          <footer className="rq-no-print flex items-center justify-between gap-4 border-t border-line bg-paper-raised px-4 py-3 sm:px-6">
            <p className="hidden text-xs text-ink-soft sm:block">Use Export .md for an editable draft or Print for a PDF.</p>
            <button type="button" onClick={onClose} className="rq-button-secondary ml-auto !min-h-10">
              Close draft
            </button>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
