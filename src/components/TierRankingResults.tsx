import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Team, AnswerRecord, Question } from '../types';
import { calculateTier } from '../data/tiers';
import { soundFx } from '../utils/sound';
import { Trophy, Award, Medal, Sparkles, FileText, RotateCcw, HelpCircle, CheckCircle2, Zap, ArrowUpRight, Flame, PartyPopper, Download, Crown } from 'lucide-react';
import { VictoryModal } from './VictoryModal';

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
  answerRecords,
  allQuestions,
  onRestart,
  onReviewQuestions,
  onOpenResumePreview,
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'resumes'>('leaderboard');
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>(true);

  // Sort teams by total score descending
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];

  // Check if any team reached S-Tier
  const sTierTeams = sortedTeams.filter(team => {
    const percentage = Math.round((team.correctAnswersCount / (team.totalAnswersCount || 1)) * 100);
    return calculateTier(percentage).tier === 'S';
  });

  const fireSTierConfetti = () => {
    // Grand Fireworks Confetti Burst matching #004741 and #F0EDE4 theme
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    const themeColors = ['#004741', '#F0EDE4', '#00635B', '#E5C158', '#FAF8F3'];

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#004741', '#F0EDE4', '#E5C158']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#00635B', '#FAF8F3', '#004741']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: themeColors
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#E5C158', '#004741', '#F0EDE4']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: themeColors
    });
  };

  useEffect(() => {
    soundFx.playVictory();

    if (sTierTeams.length > 0) {
      fireSTierConfetti();

      // Secondary confetti volley after 1 second
      const timer = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#004741', '#F0EDE4', '#E5C158', '#00635B']
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Celebration Header */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2 relative"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-gray/10 text-slate-gray-dark border border-slate-gray/25 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-slate-gray" />
          <span>Tournament Concluded</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2 flex-wrap">
          <span>{winner.name} Claims {calculateTier(Math.round((winner.correctAnswersCount / (winner.totalAnswersCount || 1)) * 100)).tier}-Tier Victory!</span>
          <span className="text-amber-500">🏆</span>
        </h1>

        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
          Final tier rankings based on MCQ accuracy and unlocked resume components.
        </p>

        <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
          <button
            onClick={() => setIsVictoryModalOpen(true)}
            className="px-3.5 py-1.5 bg-slate-gray hover:bg-slate-gray-hover text-white font-bold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
          >
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>Watch Victory Celebration</span>
          </button>

          {sTierTeams.length > 0 && (
            <button
              onClick={fireSTierConfetti}
              className="px-3.5 py-1.5 bg-slate-gray/80 hover:bg-slate-gray text-white font-bold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
              <span>Fire S-Tier Fireworks</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Navigation Tabs (Leaderboard vs Detailed Resumes) */}
      <div className="flex justify-center border-b border-slate-gray/20">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-3 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'leaderboard'
                ? 'border-slate-gray text-slate-gray-dark font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Tier Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('resumes')}
            className={`py-3 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'resumes'
                ? 'border-slate-gray text-slate-gray-dark font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Team Resume Showcase</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Leaderboard with Podium & Tier Cards */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-8">
          
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            {sortedTeams.slice(0, 3).map((team, rankIndex) => {
              const totalAnswered = team.totalAnswersCount || 1;
              const percentage = Math.round((team.correctAnswersCount / totalAnswered) * 100);
              const tierInfo = calculateTier(percentage);

              const isGold = rankIndex === 0;

              return (
                <motion.div
                  key={team.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: rankIndex * 0.1 }}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all bg-cream-card shadow-xs ${
                    isGold
                      ? 'border-slate-gray ring-1 ring-slate-gray/30'
                      : 'border-slate-gray/20'
                  }`}
                >
                  {/* Rank Ribbon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1 font-bold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-gray-dark text-white">
                      {isGold && <Trophy className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />}
                      RANK #{rankIndex + 1}
                    </span>

                    {/* Tier Badge */}
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${tierInfo.badgeBg} ${tierInfo.badgeTextColor}`}>
                      TIER {tierInfo.tier}
                    </span>
                  </div>

                  {/* Team Title & Score */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">{team.name}</h3>
                    <div className="text-2xl font-black text-slate-gray-dark">
                      {team.score} <span className="text-xs font-semibold text-slate-500">pts</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      {tierInfo.title} • {percentage}% Accuracy
                    </p>
                  </div>

                  {/* Stats & Verdict */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-gray/15 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-gray/15 text-slate-700">
                      <strong className="block text-slate-900 font-bold text-[11px] mb-0.5">Recruiter Verdict:</strong>
                      <span className="text-xs">{tierInfo.verdict}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600">
                      <div className="bg-white p-2 rounded-lg border border-slate-gray/15 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{team.correctAnswersCount}/{team.totalAnswersCount} Correct</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-gray/15 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>Max {team.maxStreak} Streak</span>
                      </div>
                    </div>
                  </div>

                  {/* Inspect Resume Action */}
                  <button
                    onClick={() => onOpenResumePreview(team.id)}
                    className="mt-4 w-full py-2.5 px-4 rounded-lg bg-slate-gray hover:bg-slate-gray-hover text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Unlocked Resume</span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Teams Table (if > 3 teams) */}
          {sortedTeams.length > 3 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Other Participating Teams</h3>
              <div className="space-y-2">
                {sortedTeams.slice(3).map((team, idx) => {
                  const percentage = Math.round((team.correctAnswersCount / (team.totalAnswersCount || 1)) * 100);
                  const tierInfo = calculateTier(percentage);
                  return (
                    <div
                      key={team.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-400 text-xs">#{idx + 4}</span>
                        <span className="font-bold text-slate-900">{team.name}</span>
                        <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${tierInfo.badgeBg} ${tierInfo.badgeTextColor}`}>
                          Tier {tierInfo.tier}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-black text-indigo-600">{team.score} pts</span>
                        <button
                          onClick={() => onOpenResumePreview(team.id)}
                          className="px-3 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
                        >
                          View Resume
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Full Resume Showcase Grid */}
      {activeTab === 'resumes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedTeams.map(team => {
            const percentage = Math.round((team.correctAnswersCount / (team.totalAnswersCount || 1)) * 100);
            const tierInfo = calculateTier(percentage);

            return (
              <div
                key={team.id}
                className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">{team.name}</h3>
                    <span className={`px-3 py-1 rounded-xl text-xs font-black ${tierInfo.badgeBg} ${tierInfo.badgeTextColor}`}>
                      TIER {tierInfo.tier}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{tierInfo.description}</p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Unlocked Resume Components ({team.unlockedResumeItems.length}):
                    </span>
                    {team.unlockedResumeItems.length > 0 ? (
                      <ul className="space-y-1">
                        {team.unlockedResumeItems.map(item => (
                          <li key={item.id} className="text-xs text-slate-700 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{item.title}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No resume upgrades unlocked.</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onOpenResumePreview(team.id)}
                  className="w-full py-3 px-4 bg-slate-gray hover:bg-slate-gray-hover text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inspect Full Document Layout</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-slate-gray/20">
        <button
          onClick={onReviewQuestions}
          className="py-3 px-5 rounded-xl bg-cream-card hover:bg-cream-dark text-slate-800 font-bold text-xs transition-all border border-slate-gray/30 flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <HelpCircle className="w-4 h-4 text-slate-gray-dark" />
          <span>Review All Questions & Career Key</span>
        </button>

        <button
          onClick={() => {
            let csv = "Rank,Team Name,Score,Correct Answers,Total Questions,Accuracy %,Tier,Max Streak\n";
            sortedTeams.forEach((team, index) => {
              const total = team.totalAnswersCount || 1;
              const pct = Math.round((team.correctAnswersCount / total) * 100);
              const tierInfo = calculateTier(pct);
              csv += `${index + 1},"${team.name}",${team.score},${team.correctAnswersCount},${team.totalAnswersCount},${pct}%,${tierInfo.tier},${team.maxStreak}\n`;
            });
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', 'Resume_Battle_Tournament_Results.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
          className="py-3 px-5 rounded-xl bg-white hover:bg-cream-dark text-slate-800 font-bold text-xs transition-all border border-slate-gray/30 flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Download className="w-4 h-4 text-slate-gray" />
          <span>Export Results (CSV)</span>
        </button>

        <button
          onClick={onRestart}
          className="py-3 px-6 rounded-xl bg-slate-gray hover:bg-slate-gray-hover text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>New Tournament</span>
        </button>
      </div>

      {/* Victory Celebration Modal Overlay */}
      {winner && (
        <VictoryModal
          winner={winner}
          totalTeams={teams.length}
          isOpen={isVictoryModalOpen}
          onClose={() => setIsVictoryModalOpen(false)}
        />
      )}

    </div>
  );
};
