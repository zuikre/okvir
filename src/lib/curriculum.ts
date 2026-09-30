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
    modules: ["cartesian-coordinate-metric", "linear-rate-of-change-slopes", "linear-algebra-vectors", "linear-combinations-span", "dot-product-geometry", "cross-product-orthogonality", "linear-maps-transformations", "matrix-multiplication-composition", "determinant-scaling-factor", "gaussian-elimination-systems", "four-fundamental-subspaces", "orthogonal-projections", "gram-schmidt-orthogonalization", "least-squares-approximation", "eigenvalues-eigenvectors", "diagonalization-powers", "symmetric-matrices-spectral", "singular-value-decomposition", "limits-continuity-foundations", "derivative-tangent-slope", "differentiation-rules-chain", "higher-order-derivatives-concavity", "taylor-series-polynomial", "multivariable-scalar-fields", "partial-derivatives-tangents", "gradient-vector", "hessian-matrix-extrema", "bayes-theorem", "central-limit-theorem"],
  },
  {
    id: 'programming',
    title: 'Programming & Data',
    titleAr: 'البرمجة والبيانات',
    color: '#10b981',
    colorAr: '#10b981',
    icon: 'Code2',
    modules: ["name-binding-lifetime", "control-flow-branching", "iteration-state-accumulation", "pure-functions-recursion", "first-class-closures", "scope-resolution-legb", "python-lists-memory-growth", "hash-tables-dict-internals", "tuples-immutability-sets", "object-oriented-dunder", "iterators-generators-streams", "context-managers-resources", "algorithmic-complexity-big-o", "sorting-divide-and-conquer", "memory-profiling-cpython", "numpy-vectorization", "numpy-broadcasting-rules", "numpy-strides-indexing", "pandas-dataframe", "pandas-split-apply-combine", "eda-anscombe", "relational-algebra-select-filter", "sql-joins-relational-merges", "sql-aggregations-group-by", "sql-window-functions", "sql-ctes-recursive-queries", "sql-indexing-query-plans", "columnar-storage-parquet", "arrow-ipc-zero-copy", "polars-lazy-dataframe-dag"],
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
