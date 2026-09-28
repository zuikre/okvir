export type DrillFormat = 'flashcard' | 'mcq' | 'boolean' | 'formula_fill';

export interface DrillOption {
  text: string;
  textAr?: string;
  formula?: string;
  correct: boolean;
  explanation: string;
  explanationAr: string;
}

export interface CalibrationDrillItem {
  id: string;
  moduleId: string;
  format: DrillFormat;
  trackId: 'math' | 'data' | 'econometrics' | 'deep-learning';
  concept: string;
  conceptAr: string;
  prompt: string;
  promptAr: string;

  // Flashcard specific
  solutionFormula?: string;
  solution?: string;
  solutionAr?: string;

  // MCQ & Formula Fill specific
  options?: DrillOption[];
  blankDisplayFormula?: string;
  filledDisplayFormula?: string;

  // Boolean specific (True/False or Yes/No)
  booleanAnswer?: boolean;
  booleanLabels?: {
    trueText: { en: string; ar: string };
    falseText: { en: string; ar: string };
  };
  booleanFormula?: string;
  booleanExplanation?: {
    en: string;
    ar: string;
  };
}

export const ALL_CALIBRATION_DRILLS: CalibrationDrillItem[] = [
  // =========================================================================
  // MODULE 1: linear-algebra-vectors (Math)
  // =========================================================================
  {
    id: 'drill-vec-triangle-inequality',
    moduleId: 'linear-algebra-vectors',
    format: 'boolean',
    trackId: 'math',
    concept: 'Triangle Inequality Collinearity Bound',
    conceptAr: 'متباينة المثلث وشرط الاستقامة في المتجهات',
    prompt: 'Under what condition does the net distance of two vector displacements equal the sum of their individual magnitudes: ||u + v|| = ||u|| + ||v||?',
    promptAr: 'تحت أي شرط هندسي تكون المسافة الصافية لإزاحتين مساوية تماماً للمجموع القياسي لطوليهما: ||u + v|| = ||u|| + ||v||؟',
    booleanAnswer: true,
    booleanLabels: {
      trueText: { en: 'Collinear along the exact same ray (θ = 0°)', ar: 'على نفس خط الاستقامة والشعاع تماماً (θ = 0°)' },
      falseText: { en: 'Any angle provided magnitudes are equal', ar: 'أي زاوية بشرط تساوي المقدارين' },
    },
    booleanFormula: '\\|\\mathbf{u} + \\mathbf{v}\\|_2 \\le \\|\\mathbf{u}\\|_2 + \\|\\mathbf{v}\\|_2',
    booleanExplanation: {
      en: 'By the Triangle Inequality, equality holds strictly when vectors point in the identical direction along the same ray (θ = 0°). Any angular deviation creates a direct hypotenuse shortcut strictly shorter than the sum.',
      ar: 'وفقاً لمتباينة المثلث، تتحقق المساواة الصارمة فقط وفقط عندما يشير المتجهان في نفس الاتجاه تماماً (θ = 0°). أي انحراف زاوي يصنع وتراً أقصر من المجموع.',
    },
  },
  {
    id: 'drill-vec-norm-flashcard',
    moduleId: 'linear-algebra-vectors',
    format: 'flashcard',
    trackId: 'math',
    concept: 'Euclidean L2 Norm Definition',
    conceptAr: 'تعريف المعيار الإقليدي L2',
    prompt: 'How is the Euclidean L2 norm of vector v expressed in terms of vector inner products?',
    promptAr: 'كيف يُعبَّر عن المعيار الإقليدي L2 للمتجه v بدلالة الجداء الداخلي للمتجه مع نفسه؟',
    solutionFormula: '\\|\\mathbf{v}\\|_2 = \\sqrt{\\mathbf{v}^T \\mathbf{v}} = \\sqrt{\\sum_{i=1}^n v_i^2}',
    solution: 'The L2 norm is the square root of the inner product of vector v with itself, representing geometric Euclidean distance from origin.',
    solutionAr: 'المعيار الإقليدي L2 هو الجذر التربيعي للجداء الداخلي للمتجه مع نفسه، ويمثل المسافة الإقليدية الهندسية عن نقطة الأصل.',
  },

  // =========================================================================
  // MODULE 2: dot-product-geometry (Math)
  // =========================================================================
  {
    id: 'drill-dot-projection-fill',
    moduleId: 'dot-product-geometry',
    format: 'formula_fill',
    trackId: 'math',
    concept: 'Scalar Vector Projection Token',
    conceptAr: 'رمز الإسقاط القياسي للمتجهات',
    prompt: 'Complete the scalar projection formula for the length of shadow cast by u onto v:',
    promptAr: 'أكمل صيغة الإسقاط القياسي لطول الظل المسقط من المتجه u على المتجه v:',
    blankDisplayFormula: '\\text{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\; [\\;?\\;] \\;}',
    filledDisplayFormula: '\\text{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|_2}',
    options: [
      {
        text: '||v||',
        formula: '\\|\\mathbf{v}\\|',
        correct: true,
        explanation: 'Scalar projection requires normalizing by the norm of target vector v to yield ||u|| cos θ.',
        explanationAr: 'الإسقاط القياسي يتطلب القسمة على طول المتجه الهدف v ليعطي ||u|| cos θ.',
      },
      {
        text: '||u||',
        formula: '\\|\\mathbf{u}\\|',
        correct: false,
        explanation: 'Dividing by ||u|| yields projection of v onto u, not u onto v.',
        explanationAr: 'القسمة على ||u|| تعطي إسقاط v على u وليس العكس.',
      },
      {
        text: '||v||²',
        formula: '\\|\\mathbf{v}\\|^2',
        correct: false,
        explanation: 'Dividing by ||v||² yields the vector projection scalar multiplier, not scalar length.',
        explanationAr: 'القسمة على مربع المعيار تعطي المعامل القياسي لمتجه الإسقاط وليس طول الإسقاط.',
      },
      {
        text: '1.0',
        formula: '1.0',
        correct: false,
        explanation: 'Omitting normalization produces raw dot product, which scales with ||v||.',
        explanationAr: 'إغفال التوحيد يعطي الجداء القياسي الخام المتأثر بطول v.',
      },
    ],
  },
  {
    id: 'drill-dot-orthogonality-boolean',
    moduleId: 'dot-product-geometry',
    format: 'boolean',
    trackId: 'math',
    concept: 'Vector Orthogonality Invariant',
    conceptAr: 'ثابت تعامد المتجهات',
    prompt: 'If two non-zero Euclidean vectors have a dot product of zero (u · v = 0), are they strictly perpendicular (θ = 90°)?',
    promptAr: 'إذا كان الجداء القياسي لمتجهين إقليديين غير صفريين يساوي صفراً (u · v = 0)، فهل هما متعامدان تماماً (θ = 90°)؟',
    booleanAnswer: true,
    booleanLabels: {
      trueText: { en: 'Yes — Cosine of 90° is strictly zero', ar: 'نعم — جيب تمام زاوية 90° يساوي صفراً' },
      falseText: { en: 'No — Only if coordinates are integers', ar: 'لا — فقط إذا كانت الإحداثيات أعداداً صحيحة' },
    },
    booleanFormula: '\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta = 0 \\iff \\cos\\theta = 0 \\iff \\theta = 90^\\circ',
    booleanExplanation: {
      en: 'Since ||u|| != 0 and ||v|| != 0, u · v = 0 guarantees cos θ = 0, proving the geometric angle is strictly 90° (orthogonal).',
      ar: 'بما أن أطوال المتجهات غير صفرية، فإن انعدام الجداء يضمن أن cos θ = 0، مما يثبت تعامدهما التام عند 90° هندسياً.',
    },
  },

  // =========================================================================
  // MODULE 3: gradient-vector (Math)
  // =========================================================================
  {
    id: 'drill-grad-steepest-flashcard',
    moduleId: 'gradient-vector',
    format: 'flashcard',
    trackId: 'math',
    concept: 'Gradient Direction of Maximal Ascent',
    conceptAr: 'اتجاه التدرج لأقصى صعود',
    prompt: 'In multivariable calculus, what does the gradient vector ∇f(x) represent physically and geometrically?',
    promptAr: 'في التفاضل متعدد المتغيرات، ماذا يمثل متجه التدرج ∇f(x) فيزيائياً وهندسياً؟',
    solutionFormula: '\\nabla f(\\mathbf{x}) = \\left[ \\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_d} \\right]^T, \\quad \\max_{\\|\\mathbf{u}\\|=1} D_{\\mathbf{u}}f = \\|\\nabla f\\|',
    solution: 'The gradient points in the exact direction of greatest instantaneous rate of increase of the scalar field; its Euclidean magnitude equals that maximum rate of increase.',
    solutionAr: 'يشير التدرج إلى الاتجاه الدقيق لأقصى معدل تزايد لحظي للحقل القياسي؛ وطوله الإقليدي يساوي بالضبط ذلك المعدل الأقصى.',
  },

  // =========================================================================
  // MODULE 7: numpy-vectorization (Programming)
  // =========================================================================
  {
    id: 'drill-numpy-stride-flashcard',
    moduleId: 'numpy-vectorization',
    format: 'flashcard',
    trackId: 'data',
    concept: 'NumPy Strided Array Memory Map',
    conceptAr: 'خريطة خطوات الذاكرة في مصفوفات NumPy',
    prompt: 'How does NumPy slice a multi-dimensional array in O(1) time without copying memory bytes?',
    promptAr: 'كيف تقتطع NumPy شريحة من مصفوفة متعددة الأبعاد في زمن O(1) دون نسخ بايتات الذاكرة؟',
    solutionFormula: '\\text{ByteOffset}(\\vec{i}) = \\sum_{k=0}^{d-1} i_k \\times \\text{stride}_k',
    solution: 'NumPy creates a lightweight view ndarray header with updated strides and data pointer offset pointing to the original contiguous buffer.',
    solutionAr: 'تنشئ NumPy ترويسة عرض خفيفة مع تحديث أطوال خطوات القفز (strides) ومؤشر البداية مشيرة لنفس المخزن المؤقت دون تكرار البيانات.',
  },

  // =========================================================================
  // MODULE 11: ols-residual-geometry (Econometrics)
  // =========================================================================
  {
    id: 'drill-gauss-markov',
    moduleId: 'ols-residual-geometry',
    format: 'flashcard',
    trackId: 'econometrics',
    concept: 'Gauss-Markov Theorem (BLUE)',
    conceptAr: 'مبرهنة غاوس-ماركوف (BLUE)',
    prompt: 'Under what conditions is the OLS estimator the Best Linear Unbiased Estimator (BLUE)?',
    promptAr: 'تحت أي شروط يكون مقدر المربعات الصغرى (OLS) هو أفضل مقدر خطي غير متحيّز (BLUE)؟',
    solutionFormula: 'E[\\epsilon|X] = 0, \\quad \\text{Var}(\\epsilon|X) = \\sigma^2 I',
    solution: 'Strict exogeneity (zero conditional mean of errors), spherical error covariance (homoscedasticity + no autocorrelation), and full column rank of regressor matrix X.',
    solutionAr: 'التجانس الخارجي التام (المتوسط الشرطي الصفري للبواقي)، مصفوفة تباين كروية (ثبات تباين الأخطاء وغياب الارتباط الذاتي)، ورتبة عمودية كاملة لمصفوفة المتغيرات المستقلة X.',
  },
  {
    id: 'drill-multicollinearity-bias',
    moduleId: 'ols-residual-geometry',
    format: 'boolean',
    trackId: 'econometrics',
    concept: 'Multicollinearity & Estimator Bias',
    conceptAr: 'التعدد الخطي وانحياز المقدر',
    prompt: 'Does severe multicollinearity between predictors cause the OLS coefficient estimator β̂ to become biased?',
    promptAr: 'هل يتسبب التعدد الخطي الشديد بين المتغيرات في جعل مقدر معاملات OLS (β̂) غير متحيّز (Biased)؟',
    booleanAnswer: false,
    booleanLabels: {
      trueText: { en: 'Yes — It introduces systematic bias', ar: 'نعم — يسبب انحيازاً منتظماً' },
      falseText: { en: 'No — OLS remains unbiased, but variance inflates', ar: 'لا — يبقى المقدر غير متحيّز ولكن تباينه يتضخم' },
    },
    booleanFormula: 'E[\\hat{\\beta}] = \\beta, \\quad \\text{Var}(\\hat{\\beta}_j) = \\frac{\\sigma^2}{\\sum(x_{ij}-\\bar{x}_j)^2 (1 - R_j^2)}',
    booleanExplanation: {
      en: 'Multicollinearity does NOT violate E[ε|X]=0, so OLS remains strictly unbiased. However, (1 - Rⱼ²) approaches zero, causing the variance (and standard errors) to explode.',
      ar: 'التعدد الخطي لا ينتهك فرضية E[ε|X]=0، وبالتالي يظل مقدر OLS غير متحيّز تماماً. لكن المشكلة تكمن في اقتراب (1 - Rⱼ²) من الصفر، مما يؤدي إلى تضخم التباين والأخطاء المعيارية بشدة.',
    },
  },
  {
    id: 'drill-normal-equations-fill',
    moduleId: 'ols-residual-geometry',
    format: 'formula_fill',
    trackId: 'econometrics',
    concept: 'Normal Equations Projection Token',
    conceptAr: 'معادلات الإسقاط الطبيعية',
    prompt: 'Complete the analytical closed-form OLS estimator for vector β̂:',
    promptAr: 'أكمل الصيغة التحليلية المغلقة لمقدر المربعات الصغرى OLS لمتجه المعاملات β̂:',
    blankDisplayFormula: '\\hat{\\beta} = \\; [\\;?\\;] \\; X^T y',
    filledDisplayFormula: '\\hat{\\beta} = (X^T X)^{-1} X^T y',
    options: [
      {
        text: '(XᵀX)⁻¹',
        formula: '(X^T X)^{-1}',
        correct: true,
        explanation: 'Setting the gradient ∂SSR/∂β = -2Xᵀ(y - Xβ) = 0 yields (XᵀX)β̂ = Xᵀy. Inverting gives β̂ = (XᵀX)⁻¹Xᵀy.',
        explanationAr: 'بمساواة التدرج بالصفر نحصل على (XᵀX)β̂ = Xᵀy، وبضرب الطرفين بالمعكوس نحصل على (XᵀX)⁻¹Xᵀy.',
      },
      {
        text: '(XXᵀ)⁻¹',
        formula: '(X X^T)^{-1}',
        correct: false,
        explanation: 'XXᵀ is an N×N matrix which is singular whenever features p < observations N.',
        explanationAr: 'المصفوفة XXᵀ بأبعاد N×N تكون شاذة وغير قابلة للعكس عندما يكون عدد المتغيرات p أقل من عدد العينات N.',
      },
      {
        text: 'XᵀX',
        formula: 'X^T X',
        correct: false,
        explanation: 'Omitting the matrix inversion inverts the dimensional transformation.',
        explanationAr: 'نسيان المعكوس يقلب أبعاد التحويل المصفوفي بالكامل.',
      },
      {
        text: 'I',
        formula: 'I',
        correct: false,
        explanation: 'Identity assumes orthonormal design matrix, which does not hold generally.',
        explanationAr: 'مصفوفة الوحدة تفترض مصفوفة تصميم متعامدة معيارياً، وهو ما لا يتحقق عموماً.',
      },
    ],
  },

  // =========================================================================
  // MODULE 13: kmeans-clustering (Econometrics/ML)
  // =========================================================================
  {
    id: 'drill-kmeans-local-min',
    moduleId: 'kmeans-clustering',
    format: 'boolean',
    trackId: 'data',
    concept: 'K-Means Convergence Optimality',
    conceptAr: 'طبيعة تقارب خوارزمية K-Means',
    prompt: 'Does standard Lloyd’s K-Means algorithm mathematically guarantee convergence to the global minimum of the inertia objective?',
    promptAr: 'هل تضمن خوارزمية K-Means التقليدية (Lloyd) التقارب حتماً إلى الحل الأمثل العالمي لدالة القصور الذاتي؟',
    booleanAnswer: false,
    booleanLabels: {
      trueText: { en: 'Yes — It always reaches the global optimum', ar: 'نعم — تصل دائماً إلى الحل الأمثل العالمي' },
      falseText: { en: 'No — It converges to a local minimum or saddle point', ar: 'لا — تتقارب إلى حد أدنى محلي أو نقطة سرج' },
    },
    booleanFormula: '\\min_{C, \\mu} \\sum_{k=1}^K \\sum_{x_i \\in C_k} ||x_i - \\mu_k||^2 \\quad \\text{(NP-hard non-convex)}',
    booleanExplanation: {
      en: 'K-Means solves an NP-hard non-convex optimization via block coordinate descent. It is guaranteed to converge in a finite number of steps, but frequently gets trapped in poor local minima, which is why K-Means++ initialization is used.',
      ar: 'تحل خوارزمية K-Means مسألة غير محدبة عبر النزول الإحداثي المجزأ. تضمن الخوارزمية التوقف في عدد منتهٍ من الخطوات، لكنها غالباً ما تعلق في قيعان محلية رديئة، ولهذا تستخدم تقنية K-Means++ للتهيئة الذكية.',
    },
  },

  // =========================================================================
  // MODULE 21: transformer-attention (Deep Learning)
  // =========================================================================
  {
    id: 'drill-attention-scaling-mcq',
    moduleId: 'transformer-attention',
    format: 'mcq',
    trackId: 'deep-learning',
    concept: 'Transformer Softmax Variance Scaling',
    conceptAr: 'تدريج تباين سوفت ماكس في المحولات',
    prompt: 'Why must Query-Key dot products be divided by sqrt(d_k) before applying Softmax in Scaled Dot-Product Attention?',
    promptAr: 'لماذا يجب قسمة الجداء القياسي للاستعلام والمفتاح على sqrt(d_k) قبل تطبيق دالة Softmax؟',
    options: [
      {
        text: 'For independent zero-mean unit-variance coordinates, Var(q^T k) = d_k; dividing by sqrt(d_k) normalizes variance to 1.0, preventing softmax saturation and vanishing gradients.',
        textAr: 'لمركبات مستقلة بتباين 1، يكون Var(q^T k) = d_k؛ وتؤدي القسمة على sqrt(d_k) لإعادة التباين إلى 1.0 لمنع تشبع Softmax وتلاشي التدرجات.',
        correct: true,
        explanation: 'Large dot products push softmax into extreme saturation regions where the local gradient s_i(δ_ij - s_j) vanishes to zero.',
        explanationAr: 'القيم الكبيرة تدفع دالة سوفت ماكس نحو التشبع، مما يجعل مشتقتها تنعدم ويتلاشى تدفق التدرجات الخلفية.',
      },
      {
        text: 'To ensure the resulting attention matrix is symmetric.',
        textAr: 'لضمان أن تكون مصفوفة الانتباه الناتجة متناظرة.',
        correct: false,
        explanation: 'Attention matrices are intrinsically asymmetric (Q @ K^T != K @ Q^T).',
        explanationAr: 'مصفوفة الانتباه غير متناظرة بطبيعتها ولا علاقة للتدريج بالتناظر.',
      },
      {
        text: 'Because negative values cannot be processed by GPU Tensor Cores.',
        textAr: 'لأن القيم السالبة لا يمكن معالجتها في وحدات Tensor Cores بالمعالج.',
        correct: false,
        explanation: 'Modern GPUs handle signed IEEE floating-point numbers seamlessly.',
        explanationAr: 'معالجات الرسومات الحديثة تتعامل مع الأرقام السالبة ذات الفاصلة العائمة بسلاسة تامة.',
      },
    ],
  },
];
