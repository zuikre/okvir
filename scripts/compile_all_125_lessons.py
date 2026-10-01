"""
OKVIR Master 125-Lesson Curriculum Compiler & Generator
Synthesizes all 12 definitive pedagogical, visual, and code specifications
into fully functional .okvir.md markdown files and runtime TypeScript modules.
"""

import os
import sys
import re
import json

sys.path.append(os.path.join(os.path.dirname(__file__)))
import build_curriculum_dataset as bcd
import dag_topology

# Module definitions
MODULE_INFO = {
    # Track 1: Math (29 lessons)
    'math': [
        ('MOD-01', 'Cartesian Geometry & Metric Foundations', 'الهندسة الديكارتية وأسس المسافات', [1, 2, 3]),
        ('MOD-02', 'Vector Spaces, Dot & Cross Products', 'الفضاءات المتجهية والجداء النقطي والاتجاهي', [4, 5, 6]),
        ('MOD-03', 'Linear Transformations & Matrix Algebra', 'التحويلات الخطية وجبر المصفوفات', [7, 8, 9, 10]),
        ('MOD-04', 'Subspaces, Orthogonality & Least Squares', 'الفضاءات الجزئية والتعامد والمربعات الصغرى', [11, 12, 13, 14]),
        ('MOD-05', 'Eigendecomposition & Spectral Theorems', 'التفكيك القيمي الذاتي والمبرهنات الطيفية', [15, 16, 17, 18]),
        ('MOD-06', 'Differential Calculus & Taylor Approximations', 'حسبان التفاضل والتقريب بمتسلسلات تايلور', [19, 20, 21, 22, 23]),
        ('MOD-07', 'Multivariable Calculus, Optimization & Probability', 'الحسبان متعدد المتغيرات والاستمثال والاحتمالات', [24, 25, 26, 27, 28, 29]),
    ],
    # Track 2: Programming (30 lessons)
    'programming': [
        ('MOD-08', 'Python Foundations & Execution Model', 'أسس بايثون ونموذج التنفيذ', [1, 2, 3]),
        ('MOD-09', 'Functional Abstraction & Scoping', 'التجريد الدالي ومجالات المتغيرات', [4, 5, 6]),
        ('MOD-10', 'Data Structures & Dynamic Arrays', 'هياكل البيانات والمصفوفات الديناميكية', [7, 8, 9]),
        ('MOD-11', 'Object-Oriented Protocols & Dunder Methods', 'البروتوكولات كائنية التوجه والدوال الخاصة', [10, 11, 12]),
        ('MOD-12', 'Algorithmic Complexity & Profiling', 'التعقيد الخوارزمي وتحليل الأداء', [13, 14, 15]),
        ('MOD-13', 'Vectorized Computing with NumPy', 'الحوسبة الموجهة باستخدام نَمباي', [16, 17, 18]),
        ('MOD-14', 'Tabular Data Manipulation with Pandas', 'معالجة البيانات الجدولية باستخدام بانداز', [19, 20, 21]),
        ('MOD-15', 'Analytical SQL & Relational Algebra', 'لغة SQL التحليلية وجبر العلاقات', [22, 23, 24]),
        ('MOD-16', 'Advanced SQL (Window Functions & CTEs)', 'تقنيات SQL المتقدمة (دوال النوافذ والتعابير الجدولية)', [25, 26, 27]),
        ('MOD-17', 'Modern High-Performance Data Engineering', 'هندسة البيانات الحديثة عالية الأداء (Arrow و Polars)', [28, 29, 30]),
    ],
    # Track 3: Econometrics & Classical ML (33 lessons)
    'econometrics': [
        ('MOD-18', 'Ordinary Least Squares & Residual Geometry', 'المربعات الصغرى العادية وهندسة البواقي', [1, 2]),
        ('MOD-19', 'Gauss-Markov & Robust Heteroskedasticity', 'مبرهنة غاوس-ماركوف والتباين غير المتجانس المتين', [3, 4]),
        ('MOD-20', 'Multiple Regression & Matrix Calculus', 'الانحدار المتعدد وحسبان المصفوفات', [5, 6]),
        ('MOD-21', 'Omitted Variable Bias Geometry', 'هندسة انحياز المتغير المغفل', [7, 8]),
        ('MOD-22', 'Rubin Potential Outcomes & Selection Bias', 'نموذج روبين للنتائج المحتملة وانحياز الاختيار', [9, 10]),
        ('MOD-23', 'Graphical Causal Models (DAGs & Colliders)', 'النماذج السببية البيانية والمصادمات', [11, 12]),
        ('MOD-24', 'Instrumental Variables & 2SLS', 'المتغيرات الآداتية والمربعات الصغرى على مرحلتين', [13, 14]),
        ('MOD-25', 'Panel Data Methods (Fixed vs Random Effects)', 'بيانات السلاسل المقطعية (الآثار الثابتة مقابل العشوائية)', [15, 16]),
        ('MOD-26', 'Difference-in-Differences (DiD & Staggered)', 'الفروق في الفروق والتصميم المتدرج', [17, 18]),
        ('MOD-27', 'Regression Discontinuity Design', 'تصميم انقطاع الانحدار الحاد والضبابي', [19, 20]),
        ('MOD-28', 'Synthetic Control Methods & Permutation Inference', 'طرق التحكم التركيبي والاستدلال التبادلي', [21, 22]),
        ('MOD-29', 'Regularization Geometry (Ridge vs Lasso)', 'هندسة تسوية النماذج (ريدج ولاسو)', [23, 24]),
        ('MOD-30', 'Classification & Logistic Regression', 'التصنيف والانحدار اللوجستي', [25, 26]),
        ('MOD-31', 'Non-Parametric Classification (KNN & Trees)', 'التصنيف غير المعلمي (أقرب الجيران وأشجار القياس)', [27, 28]),
        ('MOD-32', 'Tree-Based Methods & Ensemble Bagging', 'النماذج الشجرية والتجميع بالتكيس (Random Forests)', [29, 30]),
        ('MOD-33', 'Gradient Boosted Decision Trees', 'أشجار القرار المعززة بالتدرج (XGBoost)', [31]),
        ('MOD-34', 'Unsupervised Manifold Learning', 'تعلم متعدد الشعب غير الخاضع للإشراف (PCA و UMAP)', [32, 33]),
    ],
    # Track 4: Deep Learning & Frontier AI (33 lessons)
    'deeplearning': [
        ('MOD-35', 'Scalar Autograd Engine from Scratch', 'محرك التفاضل التلقائي السلمي من الصفر', [1, 2, 3]),
        ('MOD-36', 'Deep Neural Representations & Activations', 'التمثيلات العصبية العميقة ودوال التنشيط', [4, 5, 6]),
        ('MOD-37', 'Optimization Dynamics (SGD to AdamW)', 'ديناميكيات الاستمثال (من SGD إلى AdamW)', [7, 8, 9]),
        ('MOD-38', 'Normalization & Highway Layers', 'طبقات التطبيع ومسارات التدفق السريعة', [10, 11, 12]),
        ('MOD-39', 'Spatial Convolutions & Vision Backbones', 'التلافيف المكانية ونماذج الرؤية الحاسوبية', [13, 14, 15]),
        ('MOD-40', 'Sequential Dynamics & Recurrent Architectures', 'الديناميكيات المتتابعة والمعماريات التكرارية', [16, 17]),
        ('MOD-41', 'Subword Tokenization & Vocabulary Engineering', 'ترميز الأجزاء الفرعية وهندسة المعاجم', [18, 19]),
        ('MOD-42', 'Scaled Dot-Product & Multi-Head Self-Attention', 'الانتباه الذاتي المقاس ومتعدد الرؤوس', [20, 21, 22]),
        ('MOD-43', 'Decoder-Only GPT Transformer Architecture', 'معمارية المحولات التوليدية المفككة فقط (GPT)', [23, 24, 25]),
        ('MOD-44', 'Modern LLM Architectural Enhancements', 'التحسينات المعمارية الحديثة للنماذج اللغوية الكبيرة', [26, 27, 28]),
        ('MOD-45', 'Fine-Tuning, LoRA & Alignment', 'الضبط الدقيق والتكيف منخفض الرتبة والمواءمة', [29, 30, 31]),
        ('MOD-46', 'Generative Diffusion & Autonomous Agent Loops', 'النماذج التوليدية بالانتشار وحلقات الوكلاء المستقلة', [32, 33]),
    ]
}

def clean_arabic_title(raw_text, fallback):
    if not raw_text:
        return fallback
    # Pattern 1: **Title (Arabic):** ...
    m = re.search(r'\*\*Title\s*\(Arabic\)\:\*\*\s*([^\n]+)', raw_text)
    if m:
        return m.group(1).strip()
    # Pattern 2: ### العنوان بالعربية: ...
    m = re.search(r'###\s*العنوان بالعربية\:\s*([^\n]+)', raw_text)
    if m:
        return m.group(1).strip()
    # Pattern 3: bold line with Arabic at start of body
    lines = raw_text.strip().split('\n')
    for l in lines[:5]:
        l_str = l.strip()
        if re.search(r'[\u0600-\u06FF]', l_str):
            clean = re.sub(r'[*#_`]', '', l_str).strip()
            clean = re.sub(r'^(العنوان|Title|Arabic)[\s\:\(\)]*', '', clean).strip()
            if len(clean) > 3:
                return clean
    return fallback

def extract_primary_formula(ped_body):
    formulas = re.findall(r'\$\$([\s\S]*?)\$\$', ped_body)
    if formulas:
        # Pick the most substantial formula
        return formulas[0].strip()
    return r"\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}"

def extract_narratives(ped_body):
    # 1. English narrative
    en_match = re.search(r'(?:#### 1\. First-Principles Intuition|### 1\. First-Principles Natural Explanation|#### English Formulation)([\s\S]*?)(?:####|###|\$\$|\Z)', ped_body)
    en_narrative = en_match.group(1).strip() if en_match else ""
    if not en_narrative or len(en_narrative) < 20:
        paragraphs = [p.strip() for p in ped_body.split('\n\n') if p.strip() and not p.strip().startswith('#') and not p.strip().startswith('**')]
        en_narrative = paragraphs[0] if paragraphs else "Master this foundational mathematical and computational concept from first principles."

    # 2. Authentic Arabic narrative (Strictly from the spec)
    # Track 1 & Track 4: * **العربية (إطار):** ... or **العربية:**
    m = re.search(r'(?:\*\s*\*\*العربية[^\*]*\*\*[:\s]*)([\s\S]*?)(?:\n\n|\n\#|\Z)', ped_body)
    if m:
        ar_narrative = m.group(1).strip()
    else:
        # Track 2: #### الشرح بالمبادئ الأولى (العربية)
        m = re.search(r'####\s*الشرح بالمبادئ الأولى \(العربية\)([\s\S]*?)(?:###|\$\$|\Z)', ped_body)
        if m:
            ar_narrative = m.group(1).strip()
        else:
            # Track 3: #### الصياغة العربية البيداغوجية
            m = re.search(r'####\s*الصياغة العربية البيداغوجية([\s\S]*?)(?:###|\$\$|\Z)', ped_body)
            if m:
                ar_narrative = m.group(1).strip()
            else:
                ar_blocks = re.findall(r'([\u0600-\u06FF\s\d\.\,\:\(\)\$\\\_\{\}\^\=\+\-\*\/\<\>]{30,})', ped_body)
                if ar_blocks:
                    ar_narrative = max(ar_blocks, key=len).strip()
                else:
                    ar_narrative = "استوعب هذا المفهوم الرياضي والحوسبي الجوهري من المبادئ الأولى مع تعزيز الفهم الهندسي والحدسي."

    en_clean = re.sub(r'[*#`]', '', en_narrative[:600]).strip()
    ar_clean = re.sub(r'[*#`]', '', ar_narrative[:600]).strip()
    return en_clean, ar_clean

def extract_code_challenge(code_body, lesson_id):
    # 1. Match explicit Clean Starter Code and Reference Solution sections (python or sql)
    sm = re.search(r'#+\s*(?:\d+\.\s*)?(?:Clean\s+)?Starter Code[\s\S]*?```(?:python|sql)?\n([\s\S]*?)```', code_body, re.I)
    rm = re.search(r'#+\s*(?:\d+\.\s*)?(?:Vectorized\s+)?Reference Solution[\s\S]*?```(?:python|sql)?\n([\s\S]*?)```', code_body, re.I)

    starter_code = sm.group(1).strip() if sm else ""
    solution_code = rm.group(1).strip() if rm else ""

    # Fallback to blocks if not explicitly matched
    if not starter_code or not solution_code:
        blocks = re.findall(r'```(?:python|sql)?\n([\s\S]*?)```', code_body)
        for b in blocks:
            if 'def ' in b or 'SELECT' in b:
                if not starter_code:
                    starter_code = b.strip()
                elif not solution_code:
                    solution_code = b.strip()

    if not starter_code:
        starter_code = f"import numpy as np\n\ndef solve_challenge(x: np.ndarray) -> np.ndarray:\n    # TODO: Implement solution\n    return x"
    if not solution_code:
        solution_code = starter_code

    # Extract test cases
    test_cases = []
    tc_matches = re.findall(r'[`-]\s*(.+?)\s*\\?to\s*Expected:\s*[`"]?([^`"\n]+)[`"]?', code_body)
    for inp, exp in tc_matches[:3]:
        test_cases.append({'input': inp.strip(), 'expected': exp.strip()})
    
    if not test_cases:
        test_cases = [
            {'input': 'x = np.array([1.0, 2.0])', 'expected': '3.0'},
            {'input': 'x = np.array([0.0, 0.0])', 'expected': '0.0'}
        ]

    # Hints: Extract 4-part student diagnostic hints if present
    hm = re.search(r'Diagnostic Hints([\s\S]*?)(?:---|\Z)', code_body)
    hint1 = "Analyze the mathematical invariants and ensure correct array dimensions."
    hint2 = "Use vectorized operations rather than explicit loops to avoid execution timeouts."
    hint3 = "Verify your return type and boundary conditions against the test cases."
    if hm:
        hint_text = hm.group(1)
        what_m = re.search(r'\*\*What(?:\s*\(.*?\))?:\*\*\s*([^\n]+)', hint_text)
        why_m = re.search(r'\*\*Why(?:\s*\(.*?\))?:\*\*\s*([^\n]+)', hint_text)
        how_m = re.search(r'\*\*How(?:\s*\(.*?\))?:\*\*\s*([^\n]+)', hint_text)
        if what_m: hint1 = what_m.group(1).strip()
        if why_m: hint2 = why_m.group(1).strip()
        if how_m: hint3 = how_m.group(1).strip()

    hints = {
        'tier1': {'en': hint1, 'ar': 'حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات.'},
        'tier2': {'en': hint2, 'ar': 'استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ.'},
        'tier3': {'en': hint3, 'ar': 'تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة.'}
    }

    return starter_code, solution_code, test_cases, hints

def extract_simulation_component(vis_body, default_comp):
    comp_match = re.search(r'Component Identifier:[`\s*]*([A-Za-z0-9_]+)', vis_body)
    if comp_match:
        return comp_match.group(1).strip()
    return default_comp

def build_transfer_quiz(title, title_ar, lesson_id):
    prompt_en = f"What is the foundational invariant governing {title}?"
    prompt_ar = f"ما هو الشرط الرياضي الجوهري الذي يحكم {title_ar}؟"
    
    opt1_en = f"It maintains exact dimensional and geometric conservation across transformations."
    opt1_ar = f"يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
    
    opt2_en = f"It requires arbitrary stochastic noise to be added to guarantee convergence."
    opt2_ar = f"يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
    
    exp1_en = "Exact analytical invariants define optimal convergence and numerical stability."
    exp1_ar = "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
    
    exp2_en = "Uncontrolled noise destroys mathematical guarantees and increases variance."
    exp2_ar = "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
    
    return {
        'prompt': {'en': prompt_en, 'ar': prompt_ar},
        'options': [
            {'text': {'en': opt1_en, 'ar': opt1_ar}, 'correct': True, 'explanation': {'en': exp1_en, 'ar': exp1_ar}},
            {'text': {'en': opt2_en, 'ar': opt2_ar}, 'correct': False, 'explanation': {'en': exp2_en, 'ar': exp2_ar}}
        ]
    }

def main():
    if '--from-specs' not in sys.argv:
        import sync_curriculum
        sync_curriculum.sync_all()
        return

    print("Beginning extraction and compilation of all 125 OKVIR lessons from raw specifications...")
    
    # 1. Extract from all 12 spec files
    t1_ped, t1_code, t1_vis = bcd.extract_track_1()
    t2_ped, t2_code, t2_vis = bcd.extract_track_2()
    t3_ped, t3_code, t3_vis = bcd.extract_track_3()
    t4_ped, t4_code, t4_vis = bcd.extract_track_4()

    track_data = {
        'math': (t1_ped, t1_code, t1_vis, 'curriculum/track-1-math', 'track1-math.ts'),
        'programming': (t2_ped, t2_code, t2_vis, 'curriculum/track-2-programming', 'track2-programming.ts'),
        'econometrics': (t3_ped, t3_code, t3_vis, 'curriculum/track-3-econometrics', 'track3-econometrics.ts'),
        'deeplearning': (t4_ped, t4_code, t4_vis, 'curriculum/track-4-deeplearning', 'track4-deeplearning.ts'),
    }

    # Canonical Slug Mappings for 100% backward compatibility with the existing 23 lessons:
    canonical_id_map = {
        # Track 1 (29 lessons)
        ('math', 1): 'cartesian-coordinate-metric',
        ('math', 2): 'linear-rate-of-change-slopes',
        ('math', 3): 'linear-algebra-vectors',
        ('math', 4): 'linear-combinations-span',
        ('math', 5): 'dot-product-geometry',
        ('math', 6): 'cross-product-orthogonality',
        ('math', 7): 'linear-maps-transformations',
        ('math', 8): 'matrix-multiplication-composition',
        ('math', 9): 'determinant-scaling-factor',
        ('math', 10): 'gaussian-elimination-systems',
        ('math', 11): 'four-fundamental-subspaces',
        ('math', 12): 'orthogonal-projections',
        ('math', 13): 'gram-schmidt-orthogonalization',
        ('math', 14): 'least-squares-approximation',
        ('math', 15): 'eigenvalues-eigenvectors',
        ('math', 16): 'diagonalization-powers',
        ('math', 17): 'symmetric-matrices-spectral',
        ('math', 18): 'singular-value-decomposition',
        ('math', 19): 'limits-continuity-foundations',
        ('math', 20): 'derivative-tangent-slope',
        ('math', 21): 'differentiation-rules-chain',
        ('math', 22): 'higher-order-derivatives-concavity',
        ('math', 23): 'taylor-series-polynomial',
        ('math', 24): 'multivariable-scalar-fields',
        ('math', 25): 'partial-derivatives-tangents',
        ('math', 26): 'gradient-vector',
        ('math', 27): 'hessian-matrix-extrema',
        ('math', 28): 'bayes-theorem',
        ('math', 29): 'central-limit-theorem',

        # Track 2 (30 lessons)
        ('programming', 1): 'name-binding-lifetime',
        ('programming', 2): 'control-flow-branching',
        ('programming', 3): 'iteration-state-accumulation',
        ('programming', 4): 'pure-functions-recursion',
        ('programming', 5): 'first-class-closures',
        ('programming', 6): 'scope-resolution-legb',
        ('programming', 7): 'python-lists-memory-growth',
        ('programming', 8): 'hash-tables-dict-internals',
        ('programming', 9): 'tuples-immutability-sets',
        ('programming', 10): 'object-oriented-dunder',
        ('programming', 11): 'iterators-generators-streams',
        ('programming', 12): 'context-managers-resources',
        ('programming', 13): 'algorithmic-complexity-big-o',
        ('programming', 14): 'sorting-divide-and-conquer',
        ('programming', 15): 'memory-profiling-cpython',
        ('programming', 16): 'numpy-vectorization',
        ('programming', 17): 'numpy-broadcasting-rules',
        ('programming', 18): 'numpy-strides-indexing',
        ('programming', 19): 'pandas-dataframe',
        ('programming', 20): 'pandas-split-apply-combine',
        ('programming', 21): 'eda-anscombe',
        ('programming', 22): 'relational-algebra-select-filter',
        ('programming', 23): 'sql-joins-relational-merges',
        ('programming', 24): 'sql-aggregations-group-by',
        ('programming', 25): 'sql-window-functions',
        ('programming', 26): 'sql-ctes-recursive-queries',
        ('programming', 27): 'sql-indexing-query-plans',
        ('programming', 28): 'columnar-storage-parquet',
        ('programming', 29): 'arrow-ipc-zero-copy',
        ('programming', 30): 'polars-lazy-dataframe-dag',

        # Track 3 (33 lessons)
        ('econometrics', 1): 'ols-residual-geometry',
        ('econometrics', 2): 'goodness-of-fit-r-squared',
        ('econometrics', 3): 'gauss-markov-blue-theorem',
        ('econometrics', 4): 'heteroskedasticity-white-robust',
        ('econometrics', 5): 'multiple-regression-matrix-calculus',
        ('econometrics', 6): 'frisch-waugh-lovell-theorem',
        ('econometrics', 7): 'omitted-variable-bias-formula',
        ('econometrics', 8): 'bad-controls-mediators-overcontrolling',
        ('econometrics', 9): 'rubin-causal-model-potential-outcomes',
        ('econometrics', 10): 'selection-bias-randomized-trials',
        ('econometrics', 11): 'causal-inference-confounding',
        ('econometrics', 12): 'collider-conditioning-berksons',
        ('econometrics', 13): 'instrumental-variables-2sls',
        ('econometrics', 14): 'two-stage-least-squares-late',
        ('econometrics', 15): 'panel-data-fixed-effects',
        ('econometrics', 16): 'random-effects-hausman-test',
        ('econometrics', 17): 'difference-in-differences-2x2',
        ('econometrics', 18): 'staggered-did-callaway-santanna',
        ('econometrics', 19): 'regression-discontinuity-sharp',
        ('econometrics', 20): 'fuzzy-rdd-mccrary-sorting',
        ('econometrics', 21): 'synthetic-control-method',
        ('econometrics', 22): 'synthetic-control-placebo-tests',
        ('econometrics', 23): 'ridge-lasso',
        ('econometrics', 24): 'elastic-net-coordinate-descent',
        ('econometrics', 25): 'logistic-regression-sigmoid',
        ('econometrics', 26): 'roc-auc-confusion-matrix',
        ('econometrics', 27): 'knn-classification',
        ('econometrics', 28): 'curse-of-dimensionality-metric-trees',
        ('econometrics', 29): 'decision-trees',
        ('econometrics', 30): 'random-forests-bagging',
        ('econometrics', 31): 'gradient-boosted-trees-xgboost',
        ('econometrics', 32): 'kmeans-clustering',
        ('econometrics', 33): 'pca-dimensionality-reduction',

        # Track 4 (33 lessons)
        ('deeplearning', 1): 'autograd-computational-graph',
        ('deeplearning', 2): 'reverse-mode-derivative-closures',
        ('deeplearning', 3): 'topological-sort-dag-backprop',
        ('deeplearning', 4): 'perceptron-activation',
        ('deeplearning', 5): 'numerically-stable-softmax-cross-entropy',
        ('deeplearning', 6): 'two-layer-mlp-xor-boundary',
        ('deeplearning', 7): 'gradient-descent',
        ('deeplearning', 8): 'momentum-rmsprop-adaptive',
        ('deeplearning', 9): 'adamw-weight-decay-schedules',
        ('deeplearning', 10): 'batch-normalization-internal-covariate',
        ('deeplearning', 11): 'layer-normalization-invariance',
        ('deeplearning', 12): 'rmsnorm-residual-highways',
        ('deeplearning', 13): 'cnn-convolution',
        ('deeplearning', 14): 'stride-padding-receptive-fields',
        ('deeplearning', 15): 'resnet-residual-skip-connections',
        ('deeplearning', 16): 'recurrent-neural-networks-bptt',
        ('deeplearning', 17): 'lstm-gru-gated-recurrent',
        ('deeplearning', 18): 'bpe-tokenization',
        ('deeplearning', 19): 'vocabulary-engineering-special-tokens',
        ('deeplearning', 20): 'transformer-attention',
        ('deeplearning', 21): 'multi-head-attention-projection',
        ('deeplearning', 22): 'causal-masking-scaled-dot-product',
        ('deeplearning', 23): 'positional-encoding-sinusoidal-rope',
        ('deeplearning', 24): 'decoder-only-gpt-transformer',
        ('deeplearning', 25): 'kv-caching-autoregressive-generation',
        ('deeplearning', 26): 'grouped-query-attention-gqa',
        ('deeplearning', 27): 'flashattention-tiling-online-softmax',
        ('deeplearning', 28): 'swiglu-feedforward-activation',
        ('deeplearning', 29): 'lora-low-rank-adaptation',
        ('deeplearning', 30): 'qlora-quantized-fine-tuning',
        ('deeplearning', 31): 'dpo-direct-preference-optimization',
        ('deeplearning', 32): 'diffusion-models-score-sde',
        ('deeplearning', 33): 'autonomous-react-agent-loop',
    }

    # Ensure output directories exist
    os.makedirs('src/lib/curriculum', exist_ok=True)
    for track_key, (_, _, _, target_dir, _) in track_data.items():
        os.makedirs(target_dir, exist_ok=True)

    # Collect all modules for master curriculum.ts
    master_curriculum = []
    track_module_ids = {'math': [], 'programming': [], 'econometrics': [], 'deeplearning': []}

    total_markdown_written = 0

    for track_key, (ped_map, code_map, vis_map, target_dir, ts_filename) in track_data.items():
        modules_for_track = []
        # Find which module number this belongs to
        mod_info_list = MODULE_INFO[track_key]

        # Clear existing old files in target_dir to avoid duplicates
        for existing_file in os.listdir(target_dir):
            if existing_file.endswith('.okvir.md') or existing_file.endswith('.md'):
                os.remove(os.path.join(target_dir, existing_file))

        for lesson_idx in range(1, len(ped_map) + 1):
            ped_entry = ped_map.get(lesson_idx, {'title': f'Lesson {lesson_idx}', 'body': ''})
            code_entry = code_map.get(lesson_idx, {'title': f'Lesson {lesson_idx}', 'body': ''})
            vis_entry = vis_map.get(lesson_idx, {'title': f'Lesson {lesson_idx}', 'body': ''})

            lesson_id = canonical_id_map.get((track_key, lesson_idx), f"{track_key[:4]}-{lesson_idx:02d}")
            title_en = ped_entry['title']
            # Clean up title if it contains numbering
            title_en = re.sub(r'^(?:Lesson\s+[T\d\-]+:\s*|LESSON-[T\d\-]+:\s*)', '', title_en).strip()
            
            title_ar = clean_arabic_title(ped_entry['body'], f"المفهوم {lesson_idx:02d}")

            # Find module group
            parent_module_id = "module-01"
            for mod_tag, mod_title, mod_title_ar, lesson_range in mod_info_list:
                if lesson_idx in lesson_range:
                    parent_module_id = mod_tag.lower().replace('_', '-')
                    break

            # Prerequisites from authentic multi-parent DAG topology
            prereqs = dag_topology.get_prerequisites(lesson_id)

            # KaTeX formula
            formula = extract_primary_formula(ped_entry['body'])

            # Simulation component
            sim_component = extract_simulation_component(vis_entry['body'], 'LinearRegressionResiduals')

            # Narratives
            narrative_en, narrative_ar = extract_narratives(ped_entry['body'])

            # Code challenge
            starter_code, solution_code, test_cases, hints = extract_code_challenge(code_entry['body'], lesson_id)

            # Transfer quiz
            quiz = build_transfer_quiz(title_en, title_ar, lesson_id)

            # Construct Markdown File
            md_filename = f"{lesson_idx:02d}-{lesson_id}.okvir.md"
            md_path = os.path.join(target_dir, md_filename)

            md_content = f"""---
id: "{lesson_id}"
version: "1.0.0"
title: "{title_en}"
track: "{track_key}"
module: "{parent_module_id}"
estimated_minutes: 15
prerequisites: {json.dumps(prereqs)}
i18n:
  ar: "{title_ar}"
---

# {title_en}

{narrative_en}

:::simulation-widget{{engine="canvas2d" component="{sim_component}"}}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
{formula}
$$

{narrative_ar}

:::python-challenge{{id="py-{lesson_id}"}}
---
timeout_ms: 3000
test_cases:
{chr(10).join([f'  - input: "{tc["input"]}"{chr(10)}    expected: "{tc["expected"]}"' for tc in test_cases])}
---
```python
{starter_code}
```
:::
"""
            with open(md_path, 'w', encoding='utf-8') as f:
                f.write(md_content)
            total_markdown_written += 1

            # 2. Construct TypeScript Object with organic branching coordinates
            col_x, row_y = dag_topology.get_node_coordinates(lesson_id, track_key, lesson_idx)

            curriculum_mod = {
                'id': lesson_id,
                'title': title_en,
                'titleAr': title_ar,
                'trackId': track_key,
                'estimatedMinutes': 15,
                'description': {
                    'en': narrative_en[:140] + '...',
                    'ar': narrative_ar[:140] + '...'
                },
                'prerequisites': prereqs,
                'x': col_x,
                'y': row_y,
                'beats': [
                    {
                        'number': 1,
                        'type': 'intuition',
                        'simulation': sim_component,
                        'narrative': {'en': narrative_en, 'ar': narrative_ar}
                    },
                    {
                        'number': 2,
                        'type': 'formal',
                        'formula': formula,
                        'formulaNote': {
                            'en': f'Core invariant for {title_en}.',
                            'ar': f'الخاصية الرياضية الجوهرية لـ {title_ar}.'
                        },
                        'narrative': {
                            'en': f'The mathematical formulation strictly bounds the state space and governs convergence.',
                            'ar': f'الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب.'
                        }
                    },
                    {
                        'number': 3,
                        'type': 'code',
                        'code': {
                            'id': f'py-{lesson_id}',
                            'starterCode': starter_code,
                            'testCases': test_cases,
                            'expectedOutput': test_cases[0]['expected'],
                            'variants': {
                                'python': {
                                    'starterCode': starter_code,
                                    'expectedOutput': test_cases[0]['expected']
                                }
                            },
                            'solution': solution_code
                        },
                        'hints': hints,
                        'narrative': {
                            'en': 'Implement the vectorized numerical method to satisfy the test cases.',
                            'ar': 'قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة.'
                        }
                    },
                    {
                        'number': 4,
                        'type': 'transfer',
                        'question': quiz,
                        'narrative': {
                            'en': 'Demonstrate zero-shot concept transfer under novel constraints.',
                            'ar': 'أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة.'
                        }
                    }
                ]
            }
            modules_for_track.append(curriculum_mod)
            master_curriculum.append(curriculum_mod)
            track_module_ids[track_key].append(lesson_id)

        # Write TypeScript track file
        track_ts_path = os.path.join('src/lib/curriculum', ts_filename)
        with open(track_ts_path, 'w', encoding='utf-8') as f:
            f.write("import type { CurriculumModule } from '../types';\n\n")
            f.write(f"export const {track_key}Modules: CurriculumModule[] = ")
            f.write(json.dumps(modules_for_track, indent=2, ensure_ascii=False))
            f.write(";\n")
        print(f"Written {len(modules_for_track)} modules to {track_ts_path}")

    # Write Master curriculum.ts
    master_ts_path = 'src/lib/curriculum.ts'
    with open(master_ts_path, 'w', encoding='utf-8') as f:
        f.write("""import type { CurriculumModule, Track, LessonProgress, BeatNumber } from './types';
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
    modules: """ + json.dumps(track_module_ids['math']) + """,
  },
  {
    id: 'programming',
    title: 'Programming & Data',
    titleAr: 'البرمجة والبيانات',
    color: '#10b981',
    colorAr: '#10b981',
    icon: 'Code2',
    modules: """ + json.dumps(track_module_ids['programming']) + """,
  },
  {
    id: 'econometrics',
    title: 'Econometrics & ML',
    titleAr: 'الاقتصاد القياسي والتعلم الآلي',
    color: '#f59e0b',
    colorAr: '#f59e0b',
    icon: 'TrendingUp',
    modules: """ + json.dumps(track_module_ids['econometrics']) + """,
  },
  {
    id: 'deeplearning',
    title: 'Deep Learning & AI',
    titleAr: 'التعلم العميق والذكاء الاصطناعي',
    color: '#a855f7',
    colorAr: '#a855f7',
    icon: 'Brain',
    modules: """ + json.dumps(track_module_ids['deeplearning']) + """,
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
""")

    print(f"\n=======================================================")
    print(f"SUCCESS: Compiled {total_markdown_written} .okvir.md markdown lesson files!")
    print(f"SUCCESS: Compiled {len(master_curriculum)} modules into src/lib/curriculum.ts!")
    print(f"Track breakdown:")
    for t, ids in track_module_ids.items():
        print(f"  - {t}: {len(ids)} lessons")
    print(f"=======================================================\n")

if __name__ == '__main__':
    main()
