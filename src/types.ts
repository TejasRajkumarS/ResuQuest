export type GameStage = 'intro' | 'setup' | 'playing' | 'round_recap' | 'results' | 'review';

export type GameMode = 'turn_based' | 'all_teams';

export interface ResumeItem {
  id: string;
  category: 'summary' | 'experience' | 'skills' | 'metrics' | 'formatting';
  title: string;
  description: string;
  isUnlocked: boolean;
  tierBonus: number;
}

export interface Question {
  id: number;
  question: string;
  category: 'Action Verbs' | 'Metrics & STAR' | 'Formatting & ATS' | 'Tailoring' | 'Structure & Summary' | 'Mistakes to Avoid';
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  resumeImpact: {
    unlockedTitle: string;
    unlockedDescription: string;
    points: number;
    category: 'summary' | 'experience' | 'skills' | 'metrics' | 'formatting';
  };
}

export interface Team {
  id: string;
  name: string;
  color: string;
  avatar: string;
  score: number;
  streak: number;
  maxStreak: number;
  correctAnswersCount: number;
  totalAnswersCount: number;
  totalResponseTimeSeconds: number;
  unlockedResumeItems: ResumeItem[];
}

export type TierLevel = 'S' | 'A' | 'B' | 'C' | 'D';

export interface TierInfo {
  tier: TierLevel;
  title: string;
  subtitle: string;
  badgeBg: string;
  badgeTextColor: string;
  borderColor: string;
  minPercentage: number;
  description: string;
  verdict: string;
}

export interface GameSettings {
  timerSeconds: number;
  totalQuestions: number;
  gameMode: GameMode;
  soundEnabled: boolean;
}

export interface AnswerRecord {
  questionId: number;
  teamId: string;
  selectedOption: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  timestamp: number;
}
