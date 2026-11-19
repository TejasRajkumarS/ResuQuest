import { TierInfo, TierLevel } from '../types';

export const TIERS: Record<TierLevel, TierInfo> = {
  S: {
    tier: 'S',
    title: 'Executive Masterpiece',
    subtitle: 'ATS-Optimized Champion Resume',
    badgeBg: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600',
    badgeTextColor: 'text-amber-950 font-black',
    borderColor: 'border-amber-400',
    minPercentage: 85,
    description: 'Flawless action-driven bullet points, quantified impact metrics, sharp formatting, and perfect keyword alignment. Ready for Fortune 500 leadership roles!',
    verdict: 'Interview Callback Probability: 98% (S-Tier Elite)'
  },
  A: {
    tier: 'A',
    title: 'Senior Professional',
    subtitle: 'High-Impact Competitive Resume',
    badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    badgeTextColor: 'text-white font-bold',
    borderColor: 'border-emerald-400',
    minPercentage: 70,
    description: 'Strong usage of STAR framework, clean section hierarchy, and compelling career narrative with minimal fluff.',
    verdict: 'Interview Callback Probability: 85% (A-Tier Standout)'
  },
  B: {
    tier: 'B',
    title: 'Mid-Level Specialist',
    subtitle: 'Solid & Effective Resume',
    badgeBg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    badgeTextColor: 'text-white font-bold',
    borderColor: 'border-blue-400',
    minPercentage: 55,
    description: 'Good fundamentals and relevant skills listed, though could benefit from more specific metrics and punchier action verbs.',
    verdict: 'Interview Callback Probability: 65% (B-Tier Competitive)'
  },
  C: {
    tier: 'C',
    title: 'Entry-Level Applicant',
    subtitle: 'Basic Draft Needing Refinement',
    badgeBg: 'bg-gradient-to-r from-orange-500 to-amber-600',
    badgeTextColor: 'text-white font-bold',
    borderColor: 'border-orange-400',
    minPercentage: 40,
    description: 'Contains standard work history but relies on generic job duty descriptions rather than measurable achievements.',
    verdict: 'Interview Callback Probability: 40% (C-Tier Needs Polish)'
  },
  D: {
    tier: 'D',
    title: 'Needs Major Overhaul',
    subtitle: 'ATS Risk & Formatting Errors',
    badgeBg: 'bg-gradient-to-r from-rose-600 to-red-700',
    badgeTextColor: 'text-white font-bold',
    borderColor: 'border-rose-400',
    minPercentage: 0,
    description: 'Frequent passive language, missing quantifiable outcomes, potential formatting red flags, or missing key professional sections.',
    verdict: 'Interview Callback Probability: 15% (D-Tier Major Revision Required)'
  }
};

export function calculateTier(scorePercentage: number): TierInfo {
  if (scorePercentage >= TIERS.S.minPercentage) return TIERS.S;
  if (scorePercentage >= TIERS.A.minPercentage) return TIERS.A;
  if (scorePercentage >= TIERS.B.minPercentage) return TIERS.B;
  if (scorePercentage >= TIERS.C.minPercentage) return TIERS.C;
  return TIERS.D;
}
