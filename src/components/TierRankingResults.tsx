import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileText,
  Flame,
  HelpCircle,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { AnswerRecord, Question, Team } from '../types';
import { calculateTier } from '../data/tiers';

interface TierRankingResultsProps {
  teams: Team[];
  answerRecords: AnswerRecord[];
  allQuestions: Question[];
  onRestart: () => void;
  onReviewQuestions: () => void;
  onOpenResumePreview: (teamId: string) => void;
}

export const TierRankingResults: React.FC<TierRankingResultsProps> = ({
  teams,
  onRestart,
  onReviewQuestions,
  onOpenResumePreview,
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'resumes'>('leaderboard');
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];

  if (!winner) return null;

  const winnerAccuracy = Math.round((winner.correctAnswersCount / (winner.totalAnswersCount || 1)) * 100);
  const winnerTier = calculateTier(winnerAccuracy);

  const exportResults = () => {
    let csv = 'Rank,Team Name,Score,Correct Answers,Total Answers,Accuracy %,Tier,Max Streak\n';
    sortedTeams.forEach((team, index) => {
      const total = team.totalAnswersCount || 1;
      const accuracy = Math.round((team.correctAnswersCount / total) * 100);
      const tierInfo = calculateTier(accuracy);
      const safeName = team.name.replace(/"/g, '""');
      csv += `${index + 1},"${safeName}",${team.score},${team.correctAnswersCount},${team.totalAnswersCount},${accuracy}%,${tierInfo.tier},${team.maxStreak}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ResuQuest_Tournament_Results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="rq-eyebrow">Final results</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-[-0.035em] text-brand-900 sm:text-4xl">
              {winner.name} takes the lead.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
              The final standings combine quiz accuracy, answer streaks, and the resume components each team unlocked.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={onReviewQuestions} className="rq-button-secondary">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              Review question key
            </button>
            <button type="button" onClick={onRestart} className="rq-button-primary">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              New tournament
            </button>
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-[16px] border border-brand-700 bg-brand-800 text-white">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-6 sm:p-8 lg:p-9">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.11em] text-brand-200">
                <Trophy className="h-4 w-4 text-[#d2a84d]" aria-hidden="true" />
                Tournament winner
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{winner.name}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">{winnerTier.verdict}</p>
            </div>

            <dl className="grid grid-cols-3 border-t border-white/12 lg:border-l lg:border-t-0">
              <div className="flex flex-col justify-center border-r border-white/12 px-4 py-6 sm:px-6">
                <dt className="text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-brand-200">Score</dt>
                <dd className="tabular-nums mt-2 text-2xl font-black">{winner.score}</dd>
              </div>
              <div className="flex flex-col justify-center border-r border-white/12 px-4 py-6 sm:px-6">
                <dt className="text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-brand-200">Accuracy</dt>
                <dd className="tabular-nums mt-2 text-2xl font-black">{winnerAccuracy}%</dd>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 sm:px-6">
                <dt className="text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-brand-200">Unlocked</dt>
                <dd className="tabular-nums mt-2 text-2xl font-black">{winner.unlockedResumeItems.length}</dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="mt-9 border-b border-line" role="tablist" aria-label="Result views">
          <div className="flex gap-6">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'leaderboard'}
              aria-controls="leaderboard-panel"
              id="leaderboard-tab"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex min-h-11 items-center gap-2 border-b-2 px-1 text-sm font-extrabold transition-colors ${
                activeTab === 'leaderboard'
                  ? 'border-brand-700 text-brand-900'
                  : 'border-transparent text-ink-soft hover:text-brand-800'
              }`}
            >
              <Trophy className="h-4 w-4" aria-hidden="true" />
              Standings
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'resumes'}
              aria-controls="resumes-panel"
              id="resumes-tab"
              onClick={() => setActiveTab('resumes')}
              className={`flex min-h-11 items-center gap-2 border-b-2 px-1 text-sm font-extrabold transition-colors ${
                activeTab === 'resumes'
                  ? 'border-brand-700 text-brand-900'
                  : 'border-transparent text-ink-soft hover:text-brand-800'
              }`}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Resume drafts
            </button>
          </div>
        </div>

        {activeTab === 'leaderboard' && (
          <section id="leaderboard-panel" role="tabpanel" aria-labelledby="leaderboard-tab" className="mt-7">
            <div className="overflow-hidden rounded-[16px] border border-line bg-paper-raised">
              <div className="hidden grid-cols-[64px_minmax(180px,1fr)_100px_120px_110px] gap-4 border-b border-line bg-paper px-5 py-3 text-[0.65rem] font-extrabold uppercase tracking-[0.09em] text-ink-soft md:grid">
                <span>Rank</span>
                <span>Team</span>
                <span>Tier</span>
                <span className="text-right">Accuracy</span>
                <span className="text-right">Score</span>
              </div>

              {sortedTeams.map((team, index) => {
                const accuracy = Math.round((team.correctAnswersCount / (team.totalAnswersCount || 1)) * 100);
                const tierInfo = calculateTier(accuracy);

                return (
                  <article
                    key={team.id}
                    className={`grid gap-4 px-5 py-5 md:grid-cols-[64px_minmax(180px,1fr)_100px_120px_110px] md:items-center ${
                      index < sortedTeams.length - 1 ? 'border-b border-line' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between md:block">
                      <span className="tabular-nums text-sm font-black text-brand-700">#{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-xs font-bold text-ink-soft md:hidden">{tierInfo.tier}-tier</span>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-paper-deep text-xs font-black text-brand-800">
                        {team.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-extrabold text-brand-900">{team.name}</h3>
                        <p className="mt-0.5 text-[0.68rem] text-ink-soft">
                          {team.correctAnswersCount}/{team.totalAnswersCount} correct · max streak {team.maxStreak}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className={`inline-flex rounded-[7px] px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.06em] ${tierInfo.badgeBg} ${tierInfo.badgeTextColor}`}>
                        {tierInfo.tier}-tier
                      </span>
                    </div>

                    <div className="tabular-nums text-sm font-extrabold text-brand-800 md:text-right">{accuracy}%</div>

                    <div className="flex items-center justify-between md:justify-end md:gap-4">
                      <span className="tabular-nums text-lg font-black text-brand-900">{team.score}</span>
                      <button
                        type="button"
                        onClick={() => onOpenResumePreview(team.id)}
                        className="rq-button-secondary !min-h-10 !px-3"
                        aria-label={`View ${team.name}'s resume draft`}
                      >
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                        Resume
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-[12px] border border-line bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-extrabold text-brand-900">Accuracy drives the tier</p>
                  <p className="mt-1 text-xs leading-5 text-ink-soft">Tier reflects correct answers as a share of questions attempted.</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-[12px] border border-line bg-white p-4">
                <Flame className="mt-0.5 h-5 w-5 shrink-0 text-[#a56d0c]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-extrabold text-brand-900">Streaks add momentum</p>
                  <p className="mt-1 text-xs leading-5 text-ink-soft">Consecutive correct answers add a score bonus after the first.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'resumes' && (
          <section id="resumes-panel" role="tabpanel" aria-labelledby="resumes-tab" className="mt-7 grid gap-5 md:grid-cols-2">
            {sortedTeams.map((team) => {
              const accuracy = Math.round((team.correctAnswersCount / (team.totalAnswersCount || 1)) * 100);
              const tierInfo = calculateTier(accuracy);

              return (
                <article key={team.id} className="rounded-[16px] border border-line bg-paper-raised p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-brand-700 text-sm font-black text-white">
                        {team.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-extrabold text-brand-900">{team.name}</h3>
                        <p className="mt-0.5 text-xs text-ink-soft">{tierInfo.title}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-[7px] px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.06em] ${tierInfo.badgeBg} ${tierInfo.badgeTextColor}`}>
                      {tierInfo.tier}-tier
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 border-y border-line py-4 text-center">
                    <div className="border-r border-line">
                      <p className="tabular-nums text-lg font-black text-brand-900">{accuracy}%</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-ink-soft">Accuracy</p>
                    </div>
                    <div className="border-r border-line">
                      <p className="tabular-nums text-lg font-black text-brand-900">{team.unlockedResumeItems.length}</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-ink-soft">Unlocked</p>
                    </div>
                    <div>
                      <p className="tabular-nums text-lg font-black text-brand-900">{team.maxStreak}</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-ink-soft">Best streak</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="rq-eyebrow">Resume components</p>
                    {team.unlockedResumeItems.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {team.unlockedResumeItems.map((item) => (
                          <li key={item.id} className="flex items-start gap-2 text-xs leading-5 text-ink-soft">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
                            <span>{item.title}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-xs leading-5 text-ink-soft">No resume components were unlocked in this game.</p>
                    )}
                  </div>

                  <button type="button" onClick={() => onOpenResumePreview(team.id)} className="rq-button-secondary mt-6 w-full">
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Open resume draft
                  </button>
                </article>
              );
            })}
          </section>
        )}

        <footer className="mt-9 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-ink-soft">Export the standings for your team recap, training session, or next round.</p>
          <button type="button" onClick={exportResults} className="rq-button-secondary self-start">
            <Download className="h-4 w-4" aria-hidden="true" />
            Export results (CSV)
          </button>
        </footer>
      </div>
    </div>
  );
};
