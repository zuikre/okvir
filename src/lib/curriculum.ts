import type { CurriculumModule, Track, LessonProgress, BeatNumber } from './types';
import { mathModules } from './curriculum/track1-math';
import { programmingModules } from './curriculum/track2-programming';
import { econometricsModules } from './curriculum/track3-econometrics';
import { deeplearningModules } from './curriculum/track4-deeplearning';

export const tracks: Track[] = [
  {
    id: 'math',
    title: 'Mathematical Foundations',
    titleAr: 'الأسس الرياضية',
    color: '#38bdf8',
    colorAr: '#38bdf8',
    icon: 'Sigma',
    modules: ["t1-01","t1-02","t1-03","t1-04","t1-05","t1-06","t1-07","t1-08","t1-09","t1-10","t1-11","t1-12","t1-13","t1-14","t1-15","t1-16","t1-17","t1-18","t1-19","t1-20","t1-21","t1-22","t1-23","t1-24","t1-25","t1-26","t1-27","t1-28","t1-29"],
  },
  {
    id: 'programming',
    title: 'Programming & Data',
    titleAr: 'البرمجة والبيانات',
    color: '#10b981',
    colorAr: '#10b981',
    icon: 'Code2',
    modules: ["cs-01","cs-02","cs-03","cs-04","cs-05","cs-06","cs-07","cs-08","cs-09","cs-10","cs-11","cs-12","cs-13","cs-14","cs-15","cs-16","cs-17","cs-18","cs-19","cs-20","cs-21","cs-22","cs-23","cs-24","cs-25","cs-26","cs-27","cs-28","cs-29","cs-30"],
  },
  {
    id: 'econometrics',
    title: 'Econometrics & ML',
    titleAr: 'الاقتصاد القياسي والتعلم الآلي',
    color: '#f59e0b',
    colorAr: '#f59e0b',
    icon: 'TrendingUp',
    modules: ["ols-residual-geometry", "goodness-of-fit-r-squared", "gauss-markov-blue-theorem", "heteroskedasticity-white-robust", "multiple-regression-matrix-calculus", "frisch-waugh-lovell-theorem", "omitted-variable-bias-formula", "bad-controls-mediators-overcontrolling", "rubin-causal-model-potential-outcomes", "selection-bias-randomized-trials", "causal-inference-confounding", "collider-conditioning-berksons", "instrumental-variables-2sls", "two-stage-least-squares-late", "panel-data-fixed-effects", "random-effects-hausman-test", "difference-in-differences-2x2", "staggered-did-callaway-santanna", "regression-discontinuity-sharp", "fuzzy-rdd-mccrary-sorting", "synthetic-control-method", "synthetic-control-placebo-tests", "ridge-lasso", "elastic-net-coordinate-descent", "logistic-regression-sigmoid", "roc-auc-confusion-matrix", "knn-classification", "curse-of-dimensionality-metric-trees", "decision-trees", "random-forests-bagging", "gradient-boosted-trees-xgboost", "kmeans-clustering", "pca-dimensionality-reduction"],
  },
  {
    id: 'deeplearning',
    title: 'Deep Learning & AI',
    titleAr: 'التعلم العميق والذكاء الاصطناعي',
    color: '#a855f7',
    colorAr: '#a855f7',
    icon: 'Brain',
    modules: ["autograd-computational-graph", "reverse-mode-derivative-closures", "topological-sort-dag-backprop", "perceptron-activation", "numerically-stable-softmax-cross-entropy", "two-layer-mlp-xor-boundary", "gradient-descent", "momentum-rmsprop-adaptive", "adamw-weight-decay-schedules", "batch-normalization-internal-covariate", "layer-normalization-invariance", "rmsnorm-residual-highways", "cnn-convolution", "stride-padding-receptive-fields", "resnet-residual-skip-connections", "recurrent-neural-networks-bptt", "lstm-gru-gated-recurrent", "bpe-tokenization", "vocabulary-engineering-special-tokens", "transformer-attention", "multi-head-attention-projection", "causal-masking-scaled-dot-product", "positional-encoding-sinusoidal-rope", "decoder-only-gpt-transformer", "kv-caching-autoregressive-generation", "grouped-query-attention-gqa", "flashattention-tiling-online-softmax", "swiglu-feedforward-activation", "lora-low-rank-adaptation", "qlora-quantized-fine-tuning", "dpo-direct-preference-optimization", "diffusion-models-score-sde", "autonomous-react-agent-loop"],
  },
];

export const curriculum: CurriculumModule[] = [
  ...mathModules,
  ...programmingModules,
  ...econometricsModules,
  ...deeplearningModules,
];

export const initialLessons: Record<string, LessonProgress> = Object.fromEntries(
  curriculum.map((m) => [
    m.id,
    {
      id: m.id,
      title: m.title,
      titleAr: m.titleAr,
      trackId: m.trackId,
      status: m.prerequisites.length === 0 ? 'available' : 'locked',
      currentBeat: 1 as BeatNumber,
      stability: 0,
      difficulty: 0,
      lastReviewed: null,
      completedBeats: [],
    } as LessonProgress,
  ])
);
