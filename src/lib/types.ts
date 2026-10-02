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
  | 'simpson'
  | 'anscombe'
  | 'eigen'
  | 'clt'
  | 'iv'
  | 'autograd'
  | 'bpe'
  | (string & {});

export type LessonStatus = 'locked' | 'available' | 'in_progress' | 'mastered' | 'decaying';

export type BeatNumber = 1 | 2 | 3 | 4;

export interface SocraticHints {
  tier1: { en: string; ar: string };
  tier2: { en: string; ar: string };
  tier3: { en: string; ar: string };
}

export type ArabicFontFamily = 'ibm' | 'readex' | 'cairo' | 'alexandria' | 'noto' | 'kufi' | 'sans';

export interface LocalConfig {
  username: string;
  dailyXpGoal: number;
  streakFreezes: number;
  lastActiveDate: string | null;
  longestStreak: number;
  powerGovernorEnabled: boolean;
  pythonTimeoutMs: number;
  soundEnabled: boolean;
  arabicFont?: ArabicFontFamily;
  notificationsEnabled: boolean;
  dailyReminderHour: number; // e.g. 19 for 19:30
  streakRemindersEnabled: boolean;
  fsrsRemindersEnabled: boolean;
  lastNotificationDate?: string | null;
  releaseChannel?: 'stable' | 'beta';
  autoCheckUpdates?: boolean;
}

export interface AppNotificationRecord {
  id: string;
  title: string;
  body: string;
  category: 'daily_streak' | 'fsrs_reviews' | 'milestone' | 'updater';
  actionView?: 'lesson' | 'review' | 'settings' | 'constellation';
  timestamp: number;
  read: boolean;
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
  masteryScore?: number;
  attemptCount?: number;
  certifiedAt?: string;
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
  narrative?: { en: string; ar: string };
}

export type SupportedCodeLanguage = 'python' | 'javascript' | 'c' | 'rust' | 'java' | 'r';

export interface CodeLanguageVariant {
  starterCode: string;
  expectedOutput?: string;
  testCases?: TestCase[];
  solution?: string;
  languageName?: string;
}

export interface CodeChallenge {
  id: string;
  starterCode: string;
  testCases: TestCase[];
  expectedOutput: string;
  solution?: string;
  variants?: Partial<Record<SupportedCodeLanguage | 'sql', CodeLanguageVariant>>;
}

export interface TestCase {
  input: string;
  expected: string;
}

export interface ToolchainInfo {
  id: string;
  language: SupportedCodeLanguage | 'sql';
  name: string;
  binary: string;
  path?: string;
  version?: string;
  isAvailable: boolean;
  tier: 'native' | 'embedded';
  status: 'ready' | 'running' | 'warning' | 'missing';
}

export interface DiagnosticLocation {
  line: number;
  column?: number;
  snippet?: string;
}

export interface DiagnosticError {
  title: string;
  what: string;
  where: DiagnosticLocation;
  why: string;
  how: string;
  suggestedFix?: string;
  rawTraceback?: string;
}

export interface ExecutionResult {
  success: boolean;
  stdout: string[];
  stderr: string[];
  executionTimeMs: number;
  memoryUsedBytes?: number;
  diagnostics?: DiagnosticError | null;
  runtimeUsed?: string;
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

// ============================================================================
// OKVIR 7-STAGE MASTERCLASS EXPANDED TYPES
// ============================================================================

export type StagePhase =
  | 'hook'          // Stage 1: Cognitive Hook & Hypothesis Commitment (Controls locked)
  | 'experiment'    // Stage 2: Targeted Goal-Directed Micro-Experiments
  | 'geometry'      // Stage 3: Spatial & Physical Invariant Grounding (60 FPS)
  | 'formal'        // Stage 4: Reactive Mathematical De-formalization (Scrubbers & Anchors)
  | 'scaffold_code' // Stage 5: Faded Worked-Example & Vectorized Kernel (Skeleton ➔ Lab)
  | 'stress_test'   // Stage 6: Adversarial Boundary Exploration (Breaking the Model)
  | 'transfer';     // Stage 7: Diagnostic Misconception Transfer Ladder (Playable Proofs)

export type MisconceptionId =
  | 'ols_zero_sum_implies_perfect_fit'
  | 'ols_l2_ignores_outliers'
  | 'gradient_magnitude_is_distance'
  | 'learning_rate_too_high_always_converges'
  | 'knn_k1_has_zero_test_error'
  | 'kmeans_guarantees_global_optimum'
  | 'tree_depth_infinite_is_optimal'
  | 'r2_implies_causality'
  | 'collinearity_biases_coefficients'
  | 'l1_sparsity_due_to_truncation'
  | 'attention_weights_are_causal_importance'
  | 'bayes_prior_overwhelms_likelihood'
  | 'broadcasting_silent_expansion'
  | 'autograd_inplace_graph_corruption';

export interface MisconceptionProfile {
  id: MisconceptionId;
  label: { en: string; ar: string };
  description: { en: string; ar: string };
  refutationText: { en: string; ar: string };
  suggestedAction: { en: string; ar: string };
}

export interface PredictiveHookPrompt {
  id: string;
  scenario: { en: string; ar: string };
  prompt: { en: string; ar: string };
  predictionChoices: {
    id: string;
    text: { en: string; ar: string };
    misconceptionId?: MisconceptionId;
  }[];
  revealExplanation: { en: string; ar: string };
}

export interface TargetedMicroGoal {
  id: string;
  title: { en: string; ar: string };
  instructions: { en: string; ar: string };
  targetMetric: string;
  targetValue: number;
  tolerance: number;
  hintLadder: SocraticHints;
  successCelebration: { en: string; ar: string };
}

export interface ReactiveFormulaToken {
  symbol: string;
  role: 'parameter' | 'observation' | 'loss' | 'hyperparameter';
  boundStateKey: string;
  min?: number;
  max?: number;
  step?: number;
  tooltip: { en: string; ar: string };
  geometricMeaning: { en: string; ar: string };
}

export interface FadedCodeStep {
  tier: 'skeleton_fill' | 'autonomous';
  instructions: { en: string; ar: string };
  skeletonTemplate?: string;
  solutionHoles?: Record<string, string>;
  autonomousStarter: string;
  testCases: TestCase[];
}

export interface AdversarialStressScenario {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  toolAction: 'inject_high_leverage_outlier' | 'induce_perfect_collinearity' | 'add_extreme_noise' | 'non_convex_trap';
  expectedObservation: { en: string; ar: string };
  reflectionQuestion: DiagnosticQuestion;
}

export interface DiagnosticOption {
  text: { en: string; ar: string };
  correct: boolean;
  misconceptionId?: MisconceptionId;
  diagnosticFeedback: { en: string; ar: string };
}

export interface DiagnosticQuestion {
  id: string;
  depthTier: 1 | 2 | 3;
  prompt: { en: string; ar: string };
  latexAnchor?: string;
  options: DiagnosticOption[];
}

export interface MasterclassStage {
  stageNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  phase: StagePhase;
  title: { en: string; ar: string };
  estimatedMinutes: number;
  narrative: { en: string; ar: string };
  hookPrompt?: PredictiveHookPrompt;
  microGoal?: TargetedMicroGoal;
  reactiveTokens?: ReactiveFormulaToken[];
  fadedCode?: FadedCodeStep;
  stressTest?: AdversarialStressScenario;
  diagnosticLadder?: DiagnosticQuestion[];
  simulationType?: SimulationType;
  simulationPreset?: string;
  requiredStateInvariant?: {
    storeKey: string;
    targetValue: number;
    tolerance: number;
  };
}

export interface MasterclassModule extends CurriculumModule {
  pedagogicalVersion: '2.0.0-masterclass';
  totalEstimatedMinutes: number;
  stages: MasterclassStage[];
  misconceptionCatalog: MisconceptionProfile[];
}

