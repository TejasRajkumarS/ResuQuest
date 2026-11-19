import { TierInfo, TierLevel } from '../types';

export const TIERS: Record<TierLevel, TierInfo> = {
  S: {
    tier: 'S',
    title: 'Executive Masterpiece',
    subtitle: 'ATS-optimized champion resume',
    badgeBg: 'bg-[#f3e5b9]',
    badgeTextColor: 'text-[#4f3d0e]',
    borderColor: 'border-[#d6bd72]',
    minPercentage: 85,
    description: 'Flawless action-driven bullet points, quantified impact metrics, sharp formatting, and precise keyword alignment.',
    verdict: 'Ready for senior and leadership applications.',
  },
  A: {
    tier: 'A',
    title: 'Senior Professional',
    subtitle: 'High-impact competitive resume',
    badgeBg: 'bg-[#dcebe2]',
    badgeTextColor: 'text-[#20523d]',
    borderColor: 'border-[#9ec4aa]',
    minPercentage: 70,
    description: 'Strong use of the STAR framework, clean section hierarchy, and a compelling career narrative with minimal fluff.',
    verdict: 'Ready for competitive professional roles.',
  },
  B: {
    tier: 'B',
    title: 'Mid-Level Specialist',
    subtitle: 'Solid and effective resume',
    badgeBg: 'bg-[#e3e8ef]',
    badgeTextColor: 'text-[#31465f]',
    borderColor: 'border-[#aebdce]',
    minPercentage: 55,
    description: 'Good fundamentals and relevant skills, with room for more specific metrics and stronger action verbs.',
    verdict: 'A solid base that needs targeted sharpening.',
  },
  C: {
    tier: 'C',
    title: 'Entry-Level Applicant',
    subtitle: 'Basic draft needing refinement',
    badgeBg: 'bg-[#f4e4d5]',
    badgeTextColor: 'text-[#72431f]',
    borderColor: 'border-[#d5aa7d]',
    minPercentage: 40,
    description: 'Standard work history, but the resume still relies on generic responsibilities instead of measurable outcomes.',
    verdict: 'The structure works, but the evidence needs to get stronger.',
  },
  D: {
    tier: 'D',
    title: 'Needs Major Overhaul',
    subtitle: 'ATS risk and formatting errors',
    badgeBg: 'bg-[#f4ded9]',
    badgeTextColor: 'text-[#7a3027]',
    borderColor: 'border-[#dda49a]',
    minPercentage: 0,
    description: 'Frequent passive language, missing outcomes, possible formatting red flags, or missing key professional sections.',
    verdict: 'Start with structure, clarity, and measurable evidence.',
  },
};

export function calculateTier(scorePercentage: number): TierInfo {
  if (scorePercentage >= TIERS.S.minPercentage) return TIERS.S;
  if (scorePercentage >= TIERS.A.minPercentage) return TIERS.A;
  if (scorePercentage >= TIERS.B.minPercentage) return TIERS.B;
  if (scorePercentage >= TIERS.C.minPercentage) return TIERS.C;
  return TIERS.D;
}
