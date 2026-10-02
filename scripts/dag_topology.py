"""
OKVIR Master DAG Topology & Prerequisite Engine
Defines the true multi-parent, non-linear Directed Acyclic Graph across all 125 lessons.
Eliminates isolated 1D streams by establishing intra-track branching trees
and cross-track bridges (Math -> Econometrics, Math -> Deep Learning, CS -> Autograd, etc.).
"""

MATH_PREREQS = {
    't1-01': [],
    't1-02': ['t1-01'],
    't1-03': ['t1-01'],
    't1-04': ['t1-03'],
    't1-05': ['t1-03'],
    't1-06': ['t1-05'],
    't1-07': ['t1-04'],
    't1-08': ['t1-07'],
    't1-09': ['t1-08'],
    't1-10': ['t1-08'],
    't1-11': ['t1-10'],
    't1-12': ['t1-05', 't1-11'],
    't1-13': ['t1-12', 't1-09'],
    't1-14': ['t1-13'],
    't1-15': ['t1-14', 't1-12'],
    't1-16': ['t1-02'],
    't1-17': ['t1-16'],
    't1-18': ['t1-17'],
    't1-19': ['t1-18'],
    't1-20': ['t1-18', 't1-19'],
    't1-21': ['t1-17', 't1-01'],
    't1-22': ['t1-21'],
    't1-23': ['t1-22', 't1-03'],
    't1-24': ['t1-23', 't1-19'],
    't1-25': ['t1-24'],
    't1-26': ['t1-24'],
    't1-27': ['t1-26', 't1-23'],
    't1-28': ['t1-27'],
    'bayes-theorem': ['t1-01'],
    't1-29': ['bayes-theorem', 't1-18'],
}

PROG_PREREQS = {
    'cs-01': [],
    'cs-02': ['cs-01'],
    'cs-03': ['cs-02'],
    'cs-04': ['cs-03'],
    'cs-05': ['cs-04'],
    'cs-06': ['cs-05'],
    'cs-07': ['cs-01'],
    'cs-08': ['cs-07'],
    'cs-09': ['cs-08'],
    'cs-10': ['cs-09'],
    'cs-11': ['cs-10'],
    'cs-12': ['cs-11'],
    'cs-13': ['cs-07'],
    'cs-14': ['cs-13', 'cs-04'],
    'cs-15': ['cs-07'],
    'cs-16': ['cs-15', 't1-03'],
    'cs-17': ['cs-16'],
    'cs-18': ['cs-16'],
    'cs-19': ['cs-17'],
    'cs-20': ['cs-19'],
    'cs-21': ['cs-19'],
    'cs-22': ['cs-21'],
    'cs-23': ['cs-19'],
    'cs-24': ['cs-23'],
    'cs-25': ['cs-24'],
    'cs-26': ['cs-25'],
    'cs-27': ['cs-26'],
    'cs-28': ['cs-26'],
    'cs-29': ['cs-17', 'cs-28'],
    'cs-30': ['cs-29', 'cs-28'],
}

ECON_PREREQS = {
    'ols-residual-geometry': ['t1-12', 'cs-16'],
    'goodness-of-fit-r-squared': ['ols-residual-geometry'],
    'gauss-markov-blue-theorem': ['ols-residual-geometry', 't1-29'],
    'heteroskedasticity-white-robust': ['gauss-markov-blue-theorem'],
    'multiple-regression-matrix-calculus': ['ols-residual-geometry', 't1-08'],
    'frisch-waugh-lovell-theorem': ['multiple-regression-matrix-calculus', 't1-11'],
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
    'ridge-lasso': ['multiple-regression-matrix-calculus', 't1-15'],
    'elastic-net-coordinate-descent': ['ridge-lasso'],
    'logistic-regression-sigmoid': ['multiple-regression-matrix-calculus', 't1-23'],
    'roc-auc-confusion-matrix': ['logistic-regression-sigmoid'],
    'knn-classification': ['roc-auc-confusion-matrix', 't1-05'],
    'curse-of-dimensionality-metric-trees': ['knn-classification'],
    'decision-trees': ['curse-of-dimensionality-metric-trees', 'cs-14'],
    'random-forests-bagging': ['decision-trees'],
    'gradient-boosted-trees-xgboost': ['random-forests-bagging', 't1-20'],
    'kmeans-clustering': ['t1-05'],
    'pca-dimensionality-reduction': ['kmeans-clustering', 't1-14'],
}

DL_PREREQS = {
    'autograd-computational-graph': ['t1-18', 'cs-05'],
    'reverse-mode-derivative-closures': ['autograd-computational-graph'],
    'topological-sort-dag-backprop': ['reverse-mode-derivative-closures', 'cs-04'],
    'perceptron-activation': ['topological-sort-dag-backprop'],
    'numerically-stable-softmax-cross-entropy': ['perceptron-activation', 'logistic-regression-sigmoid'],
    'two-layer-mlp-xor-boundary': ['numerically-stable-softmax-cross-entropy'],
    'gradient-descent': ['two-layer-mlp-xor-boundary', 't1-23'],
    'momentum-rmsprop-adaptive': ['gradient-descent'],
    'adamw-weight-decay-schedules': ['momentum-rmsprop-adaptive'],
    'batch-normalization-internal-covariate': ['two-layer-mlp-xor-boundary'],
    'layer-normalization-invariance': ['batch-normalization-internal-covariate'],
    'rmsnorm-residual-highways': ['layer-normalization-invariance'],
    'cnn-convolution': ['cs-17', 'adamw-weight-decay-schedules'],
    'stride-padding-receptive-fields': ['cnn-convolution'],
    'resnet-residual-skip-connections': ['stride-padding-receptive-fields', 'rmsnorm-residual-highways'],
    'recurrent-neural-networks-bptt': ['two-layer-mlp-xor-boundary'],
    'lstm-gru-gated-recurrent': ['recurrent-neural-networks-bptt'],
    'bpe-tokenization': ['cs-08'],
    'vocabulary-engineering-special-tokens': ['bpe-tokenization'],
    'transformer-attention': ['t1-05', 'numerically-stable-softmax-cross-entropy'],
    'multi-head-attention-projection': ['transformer-attention', 't1-08'],
    'causal-masking-scaled-dot-product': ['transformer-attention'],
    'positional-encoding-sinusoidal-rope': ['causal-masking-scaled-dot-product'],
    'decoder-only-gpt-transformer': ['multi-head-attention-projection', 'positional-encoding-sinusoidal-rope', 'rmsnorm-residual-highways'],
    'kv-caching-autoregressive-generation': ['decoder-only-gpt-transformer', 'cs-30'],
    'grouped-query-attention-gqa': ['kv-caching-autoregressive-generation'],
    'flashattention-tiling-online-softmax': ['grouped-query-attention-gqa'],
    'swiglu-feedforward-activation': ['decoder-only-gpt-transformer'],
    'lora-low-rank-adaptation': ['decoder-only-gpt-transformer', 't1-15'],
    'qlora-quantized-fine-tuning': ['lora-low-rank-adaptation'],
    'dpo-direct-preference-optimization': ['decoder-only-gpt-transformer', 'rubin-causal-model-potential-outcomes'],
    'diffusion-models-score-sde': ['dpo-direct-preference-optimization', 't1-29'],
    'autonomous-react-agent-loop': ['decoder-only-gpt-transformer', 'causal-inference-confounding', 'cs-12'],
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
