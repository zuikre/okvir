"""
OKVIR Master DAG Topology & Prerequisite Engine
Defines the true multi-parent, non-linear Directed Acyclic Graph across all 125 lessons.
Eliminates isolated 1D streams by establishing intra-track branching trees
and cross-track bridges (Math -> Econometrics, Math -> Deep Learning, CS -> Autograd, etc.).
"""

MATH_PREREQS = {
    'cartesian-coordinate-metric': [],
    'linear-rate-of-change-slopes': ['cartesian-coordinate-metric'],
    'linear-algebra-vectors': ['cartesian-coordinate-metric'],
    'linear-combinations-span': ['linear-algebra-vectors'],
    'dot-product-geometry': ['linear-algebra-vectors'],
    'cross-product-orthogonality': ['dot-product-geometry'],
    'linear-maps-transformations': ['linear-combinations-span'],
    'matrix-multiplication-composition': ['linear-maps-transformations'],
    'determinant-scaling-factor': ['matrix-multiplication-composition'],
    'gaussian-elimination-systems': ['matrix-multiplication-composition'],
    'four-fundamental-subspaces': ['gaussian-elimination-systems'],
    'orthogonal-projections': ['dot-product-geometry'],
    'gram-schmidt-orthogonalization': ['orthogonal-projections'],
    'least-squares-approximation': ['orthogonal-projections', 'four-fundamental-subspaces'],
    'eigenvalues-eigenvectors': ['least-squares-approximation', 'determinant-scaling-factor'],
    'diagonalization-powers': ['eigenvalues-eigenvectors'],
    'symmetric-matrices-spectral': ['eigenvalues-eigenvectors'],
    'singular-value-decomposition': ['symmetric-matrices-spectral', 'gram-schmidt-orthogonalization'],
    'limits-continuity-foundations': ['linear-rate-of-change-slopes'],
    'derivative-tangent-slope': ['limits-continuity-foundations'],
    'differentiation-rules-chain': ['derivative-tangent-slope'],
    'higher-order-derivatives-concavity': ['differentiation-rules-chain'],
    'taylor-series-polynomial': ['differentiation-rules-chain', 'higher-order-derivatives-concavity'],
    'multivariable-scalar-fields': ['derivative-tangent-slope', 'cartesian-coordinate-metric'],
    'partial-derivatives-tangents': ['multivariable-scalar-fields'],
    'gradient-vector': ['partial-derivatives-tangents', 'linear-algebra-vectors'],
    'hessian-matrix-extrema': ['gradient-vector', 'higher-order-derivatives-concavity'],
    'bayes-theorem': ['cartesian-coordinate-metric'],
    'central-limit-theorem': ['bayes-theorem', 'differentiation-rules-chain'],
}

PROG_PREREQS = {
    'name-binding-lifetime': [],
    'control-flow-branching': ['name-binding-lifetime'],
    'iteration-state-accumulation': ['control-flow-branching'],
    'pure-functions-recursion': ['iteration-state-accumulation'],
    'first-class-closures': ['pure-functions-recursion'],
    'scope-resolution-legb': ['first-class-closures'],
    'python-lists-memory-growth': ['name-binding-lifetime'],
    'hash-tables-dict-internals': ['python-lists-memory-growth'],
    'tuples-immutability-sets': ['hash-tables-dict-internals'],
    'object-oriented-dunder': ['tuples-immutability-sets'],
    'iterators-generators-streams': ['object-oriented-dunder'],
    'context-managers-resources': ['iterators-generators-streams'],
    'algorithmic-complexity-big-o': ['python-lists-memory-growth'],
    'sorting-divide-and-conquer': ['algorithmic-complexity-big-o', 'pure-functions-recursion'],
    'memory-profiling-cpython': ['python-lists-memory-growth'],
    'numpy-vectorization': ['memory-profiling-cpython', 'linear-algebra-vectors'],
    'numpy-broadcasting-rules': ['numpy-vectorization'],
    'numpy-strides-indexing': ['numpy-vectorization'],
    'pandas-dataframe': ['numpy-strides-indexing'],
    'pandas-split-apply-combine': ['pandas-dataframe'],
    'eda-anscombe': ['pandas-split-apply-combine'],
    'relational-algebra-select-filter': ['pandas-dataframe'],
    'sql-joins-relational-merges': ['relational-algebra-select-filter'],
    'sql-aggregations-group-by': ['sql-joins-relational-merges'],
    'sql-window-functions': ['sql-aggregations-group-by'],
    'sql-ctes-recursive-queries': ['sql-window-functions'],
    'sql-indexing-query-plans': ['sql-ctes-recursive-queries'],
    'columnar-storage-parquet': ['numpy-strides-indexing', 'sql-indexing-query-plans'],
    'arrow-ipc-zero-copy': ['columnar-storage-parquet'],
    'polars-lazy-dataframe-dag': ['arrow-ipc-zero-copy', 'sql-ctes-recursive-queries'],
}

ECON_PREREQS = {
    'ols-residual-geometry': ['least-squares-approximation', 'numpy-vectorization'],
    'goodness-of-fit-r-squared': ['ols-residual-geometry'],
    'gauss-markov-blue-theorem': ['ols-residual-geometry', 'central-limit-theorem'],
    'heteroskedasticity-white-robust': ['gauss-markov-blue-theorem'],
    'multiple-regression-matrix-calculus': ['ols-residual-geometry', 'matrix-multiplication-composition'],
    'frisch-waugh-lovell-theorem': ['multiple-regression-matrix-calculus', 'four-fundamental-subspaces'],
    'omitted-variable-bias-formula': ['multiple-regression-matrix-calculus'],
    'bad-controls-mediators-overcontrolling': ['omitted-variable-bias-formula'],
    'rubin-causal-model-potential-outcomes': ['bayes-theorem'],
    'selection-bias-randomized-trials': ['rubin-causal-model-potential-outcomes'],
    'causal-inference-confounding': ['selection-bias-randomized-trials', 'bad-controls-mediators-overcontrolling'],
    'collider-conditioning-berksons': ['causal-inference-confounding'],
    'instrumental-variables-2sls': ['causal-inference-confounding', 'frisch-waugh-lovell-theorem'],
    'two-stage-least-squares-late': ['instrumental-variables-2sls'],
    'panel-data-fixed-effects': ['multiple-regression-matrix-calculus'],
    'random-effects-hausman-test': ['panel-data-fixed-effects'],
    'difference-in-differences-2x2': ['causal-inference-confounding', 'panel-data-fixed-effects'],
    'staggered-did-callaway-santanna': ['difference-in-differences-2x2'],
    'regression-discontinuity-sharp': ['causal-inference-confounding'],
    'fuzzy-rdd-mccrary-sorting': ['regression-discontinuity-sharp'],
    'synthetic-control-method': ['difference-in-differences-2x2', 'multiple-regression-matrix-calculus'],
    'synthetic-control-placebo-tests': ['synthetic-control-method'],
    'ridge-lasso': ['multiple-regression-matrix-calculus', 'singular-value-decomposition'],
    'elastic-net-coordinate-descent': ['ridge-lasso'],
    'logistic-regression-sigmoid': ['multiple-regression-matrix-calculus', 'gradient-vector'],
    'roc-auc-confusion-matrix': ['logistic-regression-sigmoid'],
    'knn-classification': ['roc-auc-confusion-matrix', 'dot-product-geometry'],
    'curse-of-dimensionality-metric-trees': ['knn-classification'],
    'decision-trees': ['curse-of-dimensionality-metric-trees', 'sorting-divide-and-conquer'],
    'random-forests-bagging': ['decision-trees'],
    'gradient-boosted-trees-xgboost': ['random-forests-bagging', 'taylor-series-polynomial'],
    'kmeans-clustering': ['dot-product-geometry'],
    'pca-dimensionality-reduction': ['kmeans-clustering', 'symmetric-matrices-spectral'],
}

DL_PREREQS = {
    'autograd-computational-graph': ['differentiation-rules-chain', 'first-class-closures'],
    'reverse-mode-derivative-closures': ['autograd-computational-graph'],
    'topological-sort-dag-backprop': ['reverse-mode-derivative-closures', 'pure-functions-recursion'],
    'perceptron-activation': ['topological-sort-dag-backprop'],
    'numerically-stable-softmax-cross-entropy': ['perceptron-activation', 'logistic-regression-sigmoid'],
    'two-layer-mlp-xor-boundary': ['numerically-stable-softmax-cross-entropy'],
    'gradient-descent': ['two-layer-mlp-xor-boundary', 'gradient-vector'],
    'momentum-rmsprop-adaptive': ['gradient-descent'],
    'adamw-weight-decay-schedules': ['momentum-rmsprop-adaptive'],
    'batch-normalization-internal-covariate': ['two-layer-mlp-xor-boundary'],
    'layer-normalization-invariance': ['batch-normalization-internal-covariate'],
    'rmsnorm-residual-highways': ['layer-normalization-invariance'],
    'cnn-convolution': ['numpy-strides-indexing', 'adamw-weight-decay-schedules'],
    'stride-padding-receptive-fields': ['cnn-convolution'],
    'resnet-residual-skip-connections': ['stride-padding-receptive-fields', 'rmsnorm-residual-highways'],
    'recurrent-neural-networks-bptt': ['two-layer-mlp-xor-boundary'],
    'lstm-gru-gated-recurrent': ['recurrent-neural-networks-bptt'],
    'bpe-tokenization': ['hash-tables-dict-internals'],
    'vocabulary-engineering-special-tokens': ['bpe-tokenization'],
    'transformer-attention': ['dot-product-geometry', 'numerically-stable-softmax-cross-entropy'],
    'multi-head-attention-projection': ['transformer-attention', 'matrix-multiplication-composition'],
    'causal-masking-scaled-dot-product': ['transformer-attention'],
    'positional-encoding-sinusoidal-rope': ['causal-masking-scaled-dot-product'],
    'decoder-only-gpt-transformer': ['multi-head-attention-projection', 'positional-encoding-sinusoidal-rope', 'rmsnorm-residual-highways'],
    'kv-caching-autoregressive-generation': ['decoder-only-gpt-transformer', 'arrow-ipc-zero-copy'],
    'grouped-query-attention-gqa': ['kv-caching-autoregressive-generation'],
    'flashattention-tiling-online-softmax': ['grouped-query-attention-gqa'],
    'swiglu-feedforward-activation': ['decoder-only-gpt-transformer'],
    'lora-low-rank-adaptation': ['decoder-only-gpt-transformer', 'singular-value-decomposition'],
    'qlora-quantized-fine-tuning': ['lora-low-rank-adaptation'],
    'dpo-direct-preference-optimization': ['decoder-only-gpt-transformer', 'rubin-causal-model-potential-outcomes'],
    'diffusion-models-score-sde': ['dpo-direct-preference-optimization', 'central-limit-theorem'],
    'autonomous-react-agent-loop': ['decoder-only-gpt-transformer', 'causal-inference-confounding', 'context-managers-resources'],
}

MASTER_DAG = {**MATH_PREREQS, **PROG_PREREQS, **ECON_PREREQS, **DL_PREREQS}

def get_prerequisites(lesson_id: str) -> list[str]:
    """Retrieve explicit multi-parent prerequisites for a lesson."""
    return MASTER_DAG.get(lesson_id, [])

# Disciplinary Column Centerlines (Total Canvas Width: 1260px)
TRACK_X = {
    'math': 175,
    'programming': 470,
    'econometrics': 790,
    'deeplearning': 1110,
}

def get_node_coordinates(lesson_id: str, track_key: str, lesson_idx: int) -> tuple[int, int]:
    """
    Computes an organic, branching 2D coordinate for the DAG Star-Map.
    Branch offsets create distinct sub-trees rather than rigid 1D rails.
    """
    base_x = TRACK_X.get(track_key, 500)
    
    # Sub-tree branch offsets based on disciplinary themes
    branch_offset = 0
    if track_key == 'math':
        if 4 <= lesson_idx <= 18:
            # Linear Algebra branch (sways left)
            branch_offset = -35 if lesson_idx % 2 == 0 else -15
        elif 19 <= lesson_idx <= 27:
            # Calculus branch (sways right towards optimization)
            branch_offset = 35 if lesson_idx % 2 == 1 else 20
        elif lesson_idx >= 28:
            # Probability bridge (sways towards Econometrics & ML)
            branch_offset = 45
    elif track_key == 'programming':
        if 1 <= lesson_idx <= 15:
            # Core CPython & CS theory (sways left)
            branch_offset = -25 if lesson_idx % 2 == 0 else -10
        elif 16 <= lesson_idx <= 21:
            # NumPy / Pandas vectorization (centered)
            branch_offset = 15 if lesson_idx % 2 == 1 else -15
        elif lesson_idx >= 22:
            # Analytical SQL & Arrow/Polars data engineering (sways right)
            branch_offset = 30 if lesson_idx % 2 == 1 else 10
    elif track_key == 'econometrics':
        if 1 <= lesson_idx <= 8:
            # OLS foundations (sways left towards Math bridge)
            branch_offset = -30 if lesson_idx % 2 == 0 else -10
        elif 9 <= lesson_idx <= 22:
            # Causal DAGs & identification strategies (sways center-left)
            branch_offset = -20 if lesson_idx % 2 == 1 else 0
        elif lesson_idx >= 23:
            # Classical ML & Trees (sways right towards Deep Learning)
            branch_offset = 35 if lesson_idx % 2 == 1 else 15
    elif track_key == 'deeplearning':
        if 1 <= lesson_idx <= 6:
            # Autograd engine & MLPs (sways left towards calculus/closures bridge)
            branch_offset = -35 if lesson_idx % 2 == 0 else -15
        elif 7 <= lesson_idx <= 15:
            # Optimizers & Vision backbones (centered)
            branch_offset = -10 if lesson_idx % 2 == 1 else 15
        elif 16 <= lesson_idx <= 24:
            # Transformers & Self-Attention (sways center-right)
            branch_offset = 20 if lesson_idx % 2 == 0 else 5
        elif lesson_idx >= 25:
            # Frontier LLM scaling, LoRA, Alignment & Agents (sways right)
            branch_offset = 35 if lesson_idx % 2 == 1 else 15

    node_x = base_x + branch_offset
    node_y = 80 + (lesson_idx - 1) * 95
    return node_x, node_y
