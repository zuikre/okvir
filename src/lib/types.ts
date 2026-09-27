export type Theme = 'dark' | 'light';
export type Language = 'en' | 'ar';

export type ViewName = 'constellation' | 'lesson' | 'review' | 'sandbox' | 'settings';

export type SimulationType =
  | 'ols'
  | 'knn'
  | 'gradient'
  | 'kmeans'
  | 'tree'
  | 'vectors'
  | 'bayes'
  | 'neural'
  | 'attention'
  | 'conv'
  | 'regularization'
  | 'simpson';

export type LessonStatus = 'locked' | 'available' | 'in_progress' | 'mastered' | 'decaying';

export type BeatNumber = 1 | 2 | 3 | 4;

export interface SocraticHints {
  tier1: { en: string; ar: string };
  tier2: { en: string; ar: string };
  tier3: { en: string; ar: string };
}

export interface LocalConfig {
  username: string;
  dailyXpGoal: number;
  streakFreezes: number;
  lastActiveDate: string | null;
  longestStreak: number;
  powerGovernorEnabled: boolean;
  pythonTimeoutMs: number;
  soundEnabled: boolean;
}

export interface LessonProgress {
  id: string;
  title: string;
  titleAr: string;
  trackId: string;
  status: LessonStatus;
  currentBeat: BeatNumber;
  stability: number;
  difficulty: number;
  lastReviewed: string | null;
  completedBeats: BeatNumber[];
}

export interface Beat {
  number: BeatNumber;
  type: 'intuition' | 'formal' | 'code' | 'transfer';
  simulation?: SimulationType;
  formula?: string;
  formulaNote?: { en: string; ar: string };
  code?: CodeChallenge;
  question?: QuizQuestion;
  hints?: SocraticHints;
  narrative: { en: string; ar: string };
}

export interface CodeChallenge {
  id: string;
  starterCode: string;
  testCases: TestCase[];
  expectedOutput: string;
}

export interface TestCase {
  input: string;
  expected: string;
}

export interface QuizQuestion {
  prompt: { en: string; ar: string };
  options: {
    text: { en: string; ar: string };
    correct: boolean;
    explanation: { en: string; ar: string };
  }[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  titleAr: string;
  trackId: string;
  estimatedMinutes: number;
  description: { en: string; ar: string };
  prerequisites: string[];
  beats: Beat[];
  x: number;
  y: number;
}

export interface Track {
  id: string;
  title: string;
  titleAr: string;
  color: string;
  colorAr: string;
  icon: string;
  modules: string[];
}

export interface FSRSState {
  cardId: string;
  conceptId: string;
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  state: 0 | 1 | 2 | 3;
  lastReview: number | null;
  due: number;
}

export interface CommandAction {
  id: string;
  label: { en: string; ar: string };
  icon: string;
  action: () => void;
  category: 'navigation' | 'simulation' | 'settings';
}
