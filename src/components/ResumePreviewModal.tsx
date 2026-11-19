import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Team } from '../types';
import { calculateTier } from '../data/tiers';
import { X, FileText, CheckCircle2, User, Briefcase, Code, Sparkles, Copy, Check, Download, Printer } from 'lucide-react';

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
  const [selectedTeamId, setSelectedTeamId] = useState<string>(initialTeamId || teams[0]?.id || '');
  const [copied, setCopied] = useState<boolean>(false);

  // Sync initialTeamId on modal open
  useEffect(() => {
    if (initialTeamId) {
      setSelectedTeamId(initialTeamId);
    }
  }, [initialTeamId, isOpen]);

  // Handle Escape Key listener
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

  const currentTeam = teams.find(t => t.id === selectedTeamId) || teams[0];
  if (!currentTeam) return null;

  const percentage = currentTeam.totalAnswersCount > 0
    ? Math.round((currentTeam.correctAnswersCount / currentTeam.totalAnswersCount) * 100)
    : 0;
  const tier = calculateTier(percentage);

  // Group unlocked resume components by category
  const unlockedCategories = {
    summary: currentTeam.unlockedResumeItems.filter(i => i.category === 'summary'),
    experience: currentTeam.unlockedResumeItems.filter(i => i.category === 'experience'),
    skills: currentTeam.unlockedResumeItems.filter(i => i.category === 'skills'),
    metrics: currentTeam.unlockedResumeItems.filter(i => i.category === 'metrics'),
    formatting: currentTeam.unlockedResumeItems.filter(i => i.category === 'formatting'),
  };

  const generateMarkdownResume = () => {
    let md = `# ${currentTeam.name.toUpperCase()} - CANDIDATE PROFILE\n\n`;
    md += `Email: email@career.org | Phone: +1 (555) 019-2831 | LinkedIn: linkedin.com/in/${currentTeam.name.toLowerCase().replace(/\s+/g, '')}\n\n`;
    
    md += `## EXECUTIVE SUMMARY\n`;
    if (unlockedCategories.summary.length > 0) {
      unlockedCategories.summary.forEach(i => {
        md += `- **${i.title}**: ${i.description}\n`;
      });
    } else {
      md += `- Standard candidate summary draft.\n`;
    }
    md += `\n`;

    md += `## PROFESSIONAL ACHIEVEMENTS & EXPERIENCE\n`;
    const expItems = [...unlockedCategories.experience, ...unlockedCategories.metrics];
    if (expItems.length > 0) {
      expItems.forEach(i => {
        md += `- **${i.title}**: ${i.description}\n`;
      });
    } else {
      md += `- Responsible for general administrative & technical support tasks.\n`;
    }
    md += `\n`;

    md += `## TECHNICAL & INDUSTRY SKILLS\n`;
    if (unlockedCategories.skills.length > 0) {
      unlockedCategories.skills.forEach(i => {
        md += `- **${i.title}**: ${i.description}\n`;
      });
    } else {
      md += `- Core domain knowledge & collaborative tools.\n`;
    }
    md += `\n`;

    md += `## ATS & FORMATTING GRADE\n`;
    md += `Tier ${tier.tier} (${tier.title}) • MCQ Score: ${currentTeam.score} pts (${percentage}% Accuracy)\n`;

    return md;
  };

  const handleCopyText = async () => {
    const md = generateMarkdownResume();
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadMd = () => {
    const md = generateMarkdownResume();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentTeam.name.replace(/\s+/g, '_')}_Resume.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002724]/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-slate-100 rounded-2xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="bg-slate-gray-dark text-white p-4 sm:p-5 flex items-center justify-between gap-4 border-b border-slate-gray/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-gray text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  Live Virtual Resume Document
                </h2>
                <p className="text-xs text-slate-300">
                  Inspecting live constructed resume based on quiz answers
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-gray transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Team Switcher Tabs & Export Actions */}
          <div className="bg-cream-card border-b border-slate-gray/20 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto py-0.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 shrink-0">
                Team:
              </span>
              {teams.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTeamId(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    t.id === selectedTeamId
                      ? 'bg-slate-gray text-white shadow-sm'
                      : 'bg-cream-dark text-slate-700 hover:bg-cream-dark/80'
                  }`}
                >
                  <span>{t.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/20 text-[10px]">
                    {t.score} pts
                  </span>
                </button>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyText}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-gray/20 text-slate-700 hover:bg-cream-dark text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy Resume Markdown text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadMd}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-gray/20 text-slate-700 hover:bg-cream-dark text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download as Markdown file (.md)"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Export .MD</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-2.5 py-1.5 rounded-lg bg-slate-gray text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-gray-hover transition-colors cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Main Document Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Status & Tier Header Banner */}
            <div className="bg-white p-4 rounded-xl border border-slate-gray/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-lg text-xs font-bold ${tier.badgeBg} ${tier.badgeTextColor}`}>
                  Tier {tier.tier}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{tier.title}</h3>
                  <p className="text-xs text-slate-500">{tier.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Accuracy</span>
                  <span className="text-xs font-extrabold text-slate-gray-dark">{percentage}%</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Unlocked</span>
                  <span className="text-xs font-extrabold text-emerald-700">
                    {currentTeam.unlockedResumeItems.length} Items
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Paper Document */}
            <div id="printable-resume" className="bg-white rounded-xl shadow-lg border border-slate-300 p-8 space-y-6 font-sans text-slate-800">
              
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 space-y-1">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                  {currentTeam.name} - CANDIDATE PROFILE
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  {unlockedCategories.summary.length > 0
                    ? unlockedCategories.summary[0].title
                    : 'Standard Applicant Profile (Draft State)'}
                </p>
                <div className="text-[11px] text-slate-500 flex flex-wrap gap-3 pt-1">
                  <span>email@career.org</span> • <span>+1 (555) 019-2831</span> • <span>linkedin.com/in/{currentTeam.name.toLowerCase().replace(/\s+/g, '')}</span>
                </div>
              </div>

              {/* Section 1: Professional Summary */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-gray" />
                  <span>Executive Summary</span>
                </h2>
                {unlockedCategories.summary.length > 0 ? (
                  unlockedCategories.summary.map(item => (
                    <div key={item.id} className="p-3 bg-cream-card rounded-lg border border-slate-gray/20 text-xs text-slate-800 font-medium leading-relaxed">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{item.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded border border-dashed border-slate-300">
                    Generic objective statement (Unlock summary questions to upgrade to active executive elevator pitch).
                  </p>
                )}
              </div>

              {/* Section 2: Work Experience & Bullet Points */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-gray" />
                  <span>Professional Achievements & Work History</span>
                </h2>
                {unlockedCategories.experience.length > 0 || unlockedCategories.metrics.length > 0 ? (
                  <div className="space-y-2.5">
                    {[...unlockedCategories.experience, ...unlockedCategories.metrics].map(item => (
                      <div key={item.id} className="flex items-start gap-2.5 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 block">{item.title}</span>
                          <span className="text-slate-600 text-[11px]">{item.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded border border-dashed border-slate-300 text-xs text-slate-400 space-y-1">
                    <p>• Responsible for day-to-day office duties and basic project support.</p>
                    <p className="italic text-[11px] text-amber-600 font-medium">Answer action verb & STAR questions to turn these into high-impact metrics!</p>
                  </div>
                )}
              </div>

              {/* Section 3: Skills & Competencies Matrix */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Technical & Industry Skill Matrix</span>
                </h2>
                {unlockedCategories.skills.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {unlockedCategories.skills.map(item => (
                      <div key={item.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <span className="font-bold text-indigo-900 block">{item.title}</span>
                        <span className="text-slate-600 text-[11px]">{item.description}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded border border-dashed border-slate-300">
                    Standard skill list (Answer skills & tailoring questions to unlock role-targeted competency matrix).
                  </p>
                )}
              </div>

              {/* Section 4: Document Formatting Status */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>ATS Optimization & Layout Grade</span>
                </h2>
                {unlockedCategories.formatting.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {unlockedCategories.formatting.map(item => (
                      <span key={item.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                        {item.title}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">No formatting boosts unlocked yet.</span>
                )}
              </div>

            </div>
          </div>

          {/* Footer Close */}
          <div className="bg-white p-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Close Resume View
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

