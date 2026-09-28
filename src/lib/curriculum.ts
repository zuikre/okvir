import type { CurriculumModule, Track, LessonProgress, BeatNumber } from './types';

export const tracks: Track[] = [
  {
    id: 'math',
    title: 'Mathematical Foundations',
    titleAr: 'الأسس الرياضية',
    color: '#38bdf8',
    colorAr: '#38bdf8',
    icon: 'Sigma',
    modules: ['linear-algebra-vectors', 'dot-product-geometry', 'gradient-vector', 'bayes-theorem'],
  },
  {
    id: 'programming',
    title: 'Programming & Data',
    titleAr: 'البرمجة والبيانات',
    color: '#10b981',
    colorAr: '#10b981',
    icon: 'Code2',
    modules: ['numpy-vectorization', 'pandas-dataframe', 'sql-window-functions', 'eda-anscombe'],
  },
  {
    id: 'econometrics',
    title: 'Econometrics & ML',
    titleAr: 'الاقتصاد القياسي والتعلم الآلي',
    color: '#f59e0b',
    colorAr: '#f59e0b',
    icon: 'TrendingUp',
    modules: ['ols-residual-geometry', 'knn-classification', 'kmeans-clustering', 'decision-trees', 'ridge-lasso', 'causal-inference-confounding'],
  },
  {
    id: 'deeplearning',
    title: 'Deep Learning & AI',
    titleAr: 'التعلم العميق والذكاء الاصطناعي',
    color: '#a855f7',
    colorAr: '#a855f7',
    icon: 'Brain',
    modules: ['perceptron-activation', 'gradient-descent', 'cnn-convolution', 'transformer-attention'],
  },
];

export const curriculum: CurriculumModule[] = [
  // Track 1: Math
  {
    id: 'linear-algebra-vectors',
    title: 'Vectors as Geometry',
    titleAr: 'المتجهات ك هندسة',
    trackId: 'math',
    estimatedMinutes: 6,
    description: {
      en: 'Understand vectors as directional displacements, not just lists of numbers.',
      ar: 'افهم المتجهات كإزاحات اتجاهية، وليس مجرد قوائم أرقام.',
    },
    prerequisites: [],
    x: 120,
    y: 80,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'vectors',
        narrative: {
          en: 'A vector is an arrow in space — it has direction and magnitude. Drag the endpoint to see how the vector changes.',
          ar: 'المتجه هو سهم في الفضاء — له اتجاه وحجم. اسحب النقطة لترى كيف يتغير المتجه.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'v = [v₁, v₂]ᵀ    ‖v‖ = √(v₁² + v₂²)',
        formulaNote: {
          en: 'The magnitude is the Euclidean length of the vector.',
          ar: 'الحجم هو الطول الإقليدي للمتجه.',
        },
        narrative: {
          en: 'Every vector has components that describe its projection onto each axis. The magnitude is the hypotenuse.',
          ar: 'كل متجه له مكونات تصف إسقاطه على كل محور. الحجم هو الوتر.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'vec-magnitude',
          starterCode: `import numpy as np

def vector_magnitude(v: np.ndarray) -> float:
    # TODO: Compute the Euclidean magnitude
    return float(np.sqrt(np.sum(v ** 2)))`,
          testCases: [
            { input: 'v = [3, 4]', expected: '5.0' },
            { input: 'v = [0, 0]', expected: '0.0' },
            { input: 'v = [1, 1]', expected: '1.414...' },
          ],
          expectedOutput: '5.0',
        },
        narrative: {
          en: 'Implement the magnitude formula using NumPy vectorized operations.',
          ar: 'طبّق صيغة الحجم باستخدام عمليات NumPy المتجهة.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'If you double both components of a vector, what happens to its magnitude?',
            ar: 'إذا ضاعفت كلا مكوني المتجه، ماذا يحدث لحجمه؟',
          },
          options: [
            {
              text: { en: 'It doubles', ar: 'يتضاعف' },
              correct: true,
              explanation: {
                en: 'Magnitude scales linearly: ‖2v‖ = 2‖v‖. This is the scaling property of norms.',
                ar: 'الحجم يتغير خطياً: ‖2v‖ = 2‖v‖. هذه خاصية التحجيم للمعايير.',
              },
            },
            {
              text: { en: 'It quadruples', ar: 'يتضاعف أربعة مرات' },
              correct: false,
              explanation: {
                en: 'Only the squared components quadruple, but the square root brings it back to 2x.',
                ar: 'فقط المكونات المربعة تتضاعف أربعة مرات، لكن الجذر التربيعي يعيدها إلى 2x.',
              },
            },
            {
              text: { en: 'It stays the same', ar: 'يبقى كما هو' },
              correct: false,
              explanation: {
                en: 'The magnitude depends on component values, so it must change.',
                ar: 'الحجم يعتمد على قيم المكونات، لذا يجب أن يتغير.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'dot-product-geometry',
    title: 'Dot Product & Projection',
    titleAr: 'الجداء القياسي والإسقاط',
    trackId: 'math',
    estimatedMinutes: 7,
    description: {
      en: 'The dot product as geometric projection: u·v = ‖u‖‖v‖cos(θ).',
      ar: 'الجداء القياسي كإسقاط هندسي: u·v = ‖u‖‖v‖cos(θ).',
    },
    prerequisites: ['linear-algebra-vectors'],
    x: 120,
    y: 220,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'vectors',
        narrative: {
          en: 'The dot product measures how much two vectors point in the same direction. When they are perpendicular, it is zero.',
          ar: 'الجداء القياسي يقيس مدى تطابق اتجاه متجهين. عندما يكونان متعامدين، يكون صفراً.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'u · v = ‖u‖ ‖v‖ cos(θ) = u₁v₁ + u₂v₂',
        formulaNote: {
          en: 'The algebraic and geometric definitions are equivalent.',
          ar: 'التعريفان الجبري والهندسي متكافئان.',
        },
        narrative: {
          en: 'When θ = 90°, cos(θ) = 0, so orthogonal vectors have zero dot product.',
          ar: 'عندما θ = 90°، cos(θ) = 0، لذا المتجهات المتعامدة لها جداء قياسي صفري.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'dot-product',
          starterCode: `import numpy as np

def dot_product(u: np.ndarray, v: np.ndarray) -> float:
    # TODO: Compute the dot product
    return float(np.dot(u, v))`,
          testCases: [
            { input: 'u=[1,0], v=[1,0]', expected: '1.0' },
            { input: 'u=[1,0], v=[0,1]', expected: '0.0' },
          ],
          expectedOutput: '1.0',
        },
        narrative: {
          en: 'Implement the dot product using np.dot.',
          ar: 'طبّق الجداء القياسي باستخدام np.dot.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'If the dot product of two non-zero vectors is zero, what can we conclude?',
            ar: 'إذا كان الجداء القياسي لمتجهين غير صفريين صفراً، ماذا نستنتج؟',
          },
          options: [
            {
              text: { en: 'They are perpendicular', ar: 'هما متعامدان' },
              correct: true,
              explanation: {
                en: 'u·v = 0 and both ‖u‖, ‖v‖ ≠ 0 implies cos(θ) = 0, so θ = 90°.',
                ar: 'u·v = 0 وكلا ‖u‖، ‖v‖ ≠ 0 يعني cos(θ) = 0، إذن θ = 90°.',
              },
            },
            {
              text: { en: 'They are parallel', ar: 'هما متوازيان' },
              correct: false,
              explanation: {
                en: 'Parallel vectors have dot product equal to ±‖u‖‖v‖, not zero.',
                ar: 'المتجهات المتوازية لها جداء قياسي يساوي ±‖u‖‖v‖، وليس صفراً.',
              },
            },
            {
              text: { en: 'One vector is zero', ar: 'أحد المتجهين صفري' },
              correct: false,
              explanation: {
                en: 'We specified both are non-zero, so this is ruled out.',
                ar: 'حددنا أن كليهما غير صفري، لذا هذا مستبعد.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'gradient-vector',
    title: 'The Gradient Vector',
    titleAr: 'متجه التدرج',
    trackId: 'math',
    estimatedMinutes: 8,
    description: {
      en: 'The gradient points in the direction of steepest ascent on a surface.',
      ar: 'التدرج يشير إلى اتجاه الصعود الأكثر انحداراً على سطح.',
    },
    prerequisites: ['dot-product-geometry'],
    x: 120,
    y: 360,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'gradient',
        narrative: {
          en: 'The gradient ∇f points uphill — the steepest way up. Move against it to descend.',
          ar: 'التدرج ∇f يشير إلى الأعلى — أشد الطرق صعوداً. تحرك عكسه للنزول.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: '∇f = [∂f/∂x, ∂f/∂y]    ‖∇f‖ = rate of steepest ascent',
        formulaNote: {
          en: 'Each component is the partial derivative along that axis.',
          ar: 'كل مكون هو المشتقة الجزئية على طول ذلك المحور.',
        },
        narrative: {
          en: 'The gradient is a vector of partial derivatives. Its magnitude is the slope steepness.',
          ar: 'التدرج هو متجه من المشتقات الجزئية. حجمه هو شدة الانحدار.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'gradient-calc',
          starterCode: `import numpy as np

def gradient(f, x, h=1e-5):
    # TODO: Numerical gradient via central difference
    grad = np.zeros_like(x, dtype=float)
    for i in range(len(x)):
        x_plus = x.copy(); x_plus[i] += h
        x_minus = x.copy(); x_minus[i] -= h
        grad[i] = (f(x_plus) - f(x_minus)) / (2 * h)
    return grad`,
          testCases: [
            { input: 'f(x)=x², x=[3]', expected: '[6]' },
            { input: 'f(x)=x₀²+x₁², x=[1,1]', expected: '[2, 2]' },
          ],
          expectedOutput: '[6]',
        },
        narrative: {
          en: 'Compute the numerical gradient using central differences.',
          ar: 'احسب التدرج العددي باستخدام الفروق المركزية.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'At a local minimum of f, what is the gradient?',
            ar: 'عند الحد الأدنى المحلي لـ f، ما هو التدرج؟',
          },
          options: [
            {
              text: { en: 'Zero vector', ar: 'متجه صفري' },
              correct: true,
              explanation: {
                en: 'At extrema, all partial derivatives are zero, so ∇f = 0.',
                ar: 'عند النقاط القصوى، جميع المشتقات الجزئية صفر، لذا ∇f = 0.',
              },
            },
            {
              text: { en: 'Points upward', ar: 'يشير للأعلى' },
              correct: false,
              explanation: {
                en: 'At a minimum, there is no direction of ascent — the gradient vanishes.',
                ar: 'عند الحد الأدنى، لا يوجد اتجاه صعود — التدرج يتلاشى.',
              },
            },
            {
              text: { en: 'Points downward', ar: 'يشير للأسفل' },
              correct: false,
              explanation: {
                en: 'The gradient always points uphill, never downhill. At a minimum it is zero.',
                ar: 'التدرج يشير دائماً للأعلى، وليس للأسفل. عند الحد الأدنى يكون صفراً.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'bayes-theorem',
    title: "Bayes' Theorem",
    titleAr: 'نظرية بايز',
    trackId: 'math',
    estimatedMinutes: 7,
    description: {
      en: 'Update beliefs with evidence: Prior × Likelihood → Posterior.',
      ar: 'حدّث الاعتقادات بالأدلة: الاحتمال القبلي × الاحتمالية ← الاحتمال البعدي.',
    },
    prerequisites: ['linear-algebra-vectors', 'dot-product-geometry'],
    x: 120,
    y: 500,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'bayes',
        narrative: {
          en: 'Bayes updates your belief after seeing evidence. A positive test does not always mean disease — it depends on the base rate.',
          ar: 'بايز يحدّث اعتقادك بعد رؤية الأدلة. اختبار إيجابي لا يعني دائماً مرضاً — يعتمد على المعدل الأساسي.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'P(H|E) = P(E|H) · P(H) / P(E)',
        formulaNote: {
          en: 'Posterior = Likelihood × Prior / Evidence',
          ar: 'البعدي = الاحتمالية × القبلي / الدليل',
        },
        narrative: {
          en: 'The posterior probability of hypothesis H given evidence E is proportional to the likelihood times the prior.',
          ar: 'الاحتمال البعدي للفرضية H بالنظر إلى الدليل E يتناسب مع الاحتمالية مضروبة في القبلي.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'bayes-calc',
          starterCode: `def bayes(prior, likelihood, evidence):
    # TODO: Compute posterior probability
    return (likelihood * prior) / evidence`,
          testCases: [
            { input: 'prior=0.01, likelihood=0.9, evidence=0.1', expected: '0.09' },
            { input: 'prior=0.5, likelihood=0.8, evidence=0.5', expected: '0.8' },
          ],
          expectedOutput: '0.09',
        },
        narrative: {
          en: 'Implement Bayes theorem: posterior = likelihood × prior / evidence.',
          ar: 'طبّق نظرية بايز: البعدي = الاحتمالية × القبلي / الدليل.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'A disease affects 1% of people. A test is 99% accurate (true positive and true negative). You test positive. What is P(disease|positive)?',
            ar: 'مرض يصيب 1% من الناس. اختبار دقته 99%. اختبارك إيجابي. ما هو P(مرض|إيجابي)؟',
          },
          options: [
            {
              text: { en: '~50%', ar: '~50%' },
              correct: true,
              explanation: {
                en: 'P(D|+) = 0.99×0.01 / (0.99×0.01 + 0.01×0.99) = 0.5. The base rate paradox!',
                ar: 'P(D|+) = 0.99×0.01 / (0.99×0.01 + 0.01×0.99) = 0.5. مفارقة المعدل الأساسي!',
              },
            },
            {
              text: { en: '~99%', ar: '~99%' },
              correct: false,
              explanation: {
                en: 'This ignores the base rate. With a rare disease, false positives dominate.',
                ar: ' هذا يتجاهل المعدل الأساسي. مع مرض نادر، الإيجابيات الكاذبة تهيمن.',
              },
            },
            {
              text: { en: '~1%', ar: '~1%' },
              correct: false,
              explanation: {
                en: 'This is just the prior — the test does update our belief significantly.',
                ar: 'هذا هو القبلي فقط — الاختبار يحدّث اعتقادنا بشكل كبير.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },

  // Track 2: Programming
  {
    id: 'numpy-vectorization',
    title: 'NumPy Vectorization',
    titleAr: 'توجيه NumPy',
    trackId: 'programming',
    estimatedMinutes: 6,
    description: {
      en: 'Why vectorized operations are 100x faster than Python for-loops.',
      ar: 'لماذا العمليات المتجهة أسرع 100 مرة من حلقات Python.',
    },
    prerequisites: [],
    x: 340,
    y: 80,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'ols',
        narrative: {
          en: 'Python loops interpret each iteration. NumPy pushes the loop to C, processing entire arrays in one call.',
          ar: 'حلقات Python تفسر كل تكرار. NumPy يدفع الحلقة إلى C، ويعالج المصفوفات كاملة في استدعاء واحد.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'C_loop ≈ 100 × C_python    (SIMD contiguous memory striding)',
        formulaNote: {
          en: 'NumPy uses SIMD instructions on contiguous memory blocks.',
          ar: 'NumPy يستخدم تعليمات SIMD على كتل ذاكرة متجاورة.',
        },
        narrative: {
          en: 'The performance gap comes from type certainty and contiguous memory layout enabling SIMD vectorization.',
          ar: 'الفجوة في الأداء تأتي من تأكيد النوع وتخطيط الذاكرة المتجاورة الذي يتيح توجيه SIMD.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'numpy-vec',
          starterCode: `import numpy as np

def scale_array(arr: np.ndarray, factor: float) -> np.ndarray:
    # TODO: Scale the array vectorized (no for-loop!)
    return arr * factor`,
          testCases: [
            { input: 'arr=[1,2,3], factor=2', expected: '[2, 4, 6]' },
            { input: 'arr=[0], factor=5', expected: '[0]' },
          ],
          expectedOutput: '[2, 4, 6]',
        },
        narrative: {
          en: 'Scale an array without a Python for-loop using NumPy broadcasting.',
          ar: 'حجّم مصفوفة دون حلقة Python باستخدام بث NumPy.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'Why is np.sum(arr) faster than sum(arr) for large arrays?',
            ar: 'لماذا np.sum(arr) أسرع من sum(arr) للمصفوفات الكبيرة؟',
          },
          options: [
            {
              text: { en: 'NumPy operates on contiguous C memory with SIMD', ar: 'NumPy يعمل على ذاكرة C متجاورة مع SIMD' },
              correct: true,
              explanation: {
                en: 'NumPy avoids Python object overhead and uses vectorized C/SIMD instructions.',
                ar: 'NumPy يتجنب عبء كائنات Python ويستخدم تعليمات C/SIMD المتجهة.',
              },
            },
            {
              text: { en: 'np.sum uses a faster algorithm', ar: 'np.sum يستخدم خوارزمية أسرع' },
              correct: false,
              explanation: {
                en: 'Both compute the same sum. The difference is in the execution path, not the algorithm.',
                ar: 'كلاهما يحسب نفس المجموع. الاختلاف في مسار التنفيذ، وليس في الخوارزمية.',
              },
            },
            {
              text: { en: 'sum() has a bug for large arrays', ar: 'sum() لديه خطأ للمصفوفات الكبيرة' },
              correct: false,
              explanation: {
                en: 'sum() is correct but slow — it iterates through Python objects.',
                ar: 'sum() صحيح لكنه بطيء — يتكرر عبر كائنات Python.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'pandas-dataframe',
    title: 'The DataFrame Anatomy',
    titleAr: 'تشريح إطار البيانات',
    trackId: 'programming',
    estimatedMinutes: 7,
    description: {
      en: 'Series, Index, and column-oriented storage in Pandas.',
      ar: 'السلسلة، الفهرس، والتخزين المعمد بالأعمدة في Pandas.',
    },
    prerequisites: ['numpy-vectorization'],
    x: 340,
    y: 220,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'kmeans',
        narrative: {
          en: 'A DataFrame is a collection of Series (columns) sharing an Index (row labels). Think of it as a spreadsheet with superpowers.',
          ar: 'إطار البيانات هو مجموعة سلاسل (أعمدة) تتشارك فهرس (تسميات الصفوف). فكر فيه كجدول بقدرات خارقة.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'DataFrame = {Index, Series₁, Series₂, ..., Seriesₙ}',
        formulaNote: {
          en: 'Each Series is a typed, indexed 1D array.',
          ar: 'كل سلسلة هي مصفوفة أحادية البعد موثقة ومفهرسة.',
        },
        narrative: {
          en: 'Internally, Pandas stores data in column-oriented blocks for type-specific efficient access.',
          ar: 'داخلياً، Pandas يخزن البيانات في كتل معمدة بالأعمدة لوصول فعّال حسب النوع.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'df-create',
          starterCode: `import pandas as pd

def create_dataframe(data: dict) -> pd.DataFrame:
    # TODO: Create a DataFrame from a dictionary
    return pd.DataFrame(data)`,
          testCases: [
            { input: '{"a": [1,2], "b": [3,4]}', expected: '2x2 DataFrame' },
            { input: '{"x": [10]}', expected: '1x1 DataFrame' },
          ],
          expectedOutput: '2x2 DataFrame',
        },
        narrative: {
          en: 'Create a DataFrame from a dictionary using pd.DataFrame().',
          ar: 'أنشئ إطار بيانات من قاموس باستخدام pd.DataFrame().',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'In a DataFrame, what does the Index represent?',
            ar: 'في إطار البيانات، ماذا يمثل الفهرس؟',
          },
          options: [
            {
              text: { en: 'Row labels for alignment and fast lookup', ar: 'تسميات الصفوف للمحاذاة والبحث السريع' },
              correct: true,
              explanation: {
                en: 'The Index provides label-based alignment, enabling fast joins and lookups.',
                ar: 'الفهرس يوفر محاذاة قائمة على التسميات، مما يتيح وصلات وبحث سريع.',
              },
            },
            {
              text: { en: 'Column names', ar: 'أسماء الأعمدة' },
              correct: false,
              explanation: {
                en: 'Column names are separate — the Index labels rows.',
                ar: 'أسماء الأعمدة منفصلة — الفهرس يسمي الصفوف.',
              },
            },
            {
              text: { en: 'Memory addresses', ar: 'عناوين الذاكرة' },
              correct: false,
              explanation: {
                en: 'The Index is a logical label, not a memory pointer.',
                ar: 'الفهرس هو تسمية منطقية، وليس مؤشر ذاكرة.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'sql-window-functions',
    title: 'SQL Window Functions',
    titleAr: 'دوال النوافذ SQL',
    trackId: 'programming',
    estimatedMinutes: 8,
    description: {
      en: 'ROW_NUMBER, RANK, LAG, LEAD and partitioned aggregates.',
      ar: 'ROW_NUMBER، RANK، LAG، LEAD والتجميعات المقسمة.',
    },
    prerequisites: ['pandas-dataframe'],
    x: 340,
    y: 360,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'tree',
        narrative: {
          en: 'Window functions compute values across rows related to the current row — like a sliding analytical lens over your data.',
          ar: 'دوال النوافذ تحسب قيم عبر الصفوف المرتبطة بالصف الحالي — مثل عدسة تحليلية منزلقة على بياناتك.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'func() OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)',
        formulaNote: {
          en: 'The OVER clause defines the window frame.',
          ar: 'عبارة OVER تحدد إطار النافذة.',
        },
        narrative: {
          en: 'Unlike GROUP BY, window functions keep individual rows while adding computed columns.',
          ar: 'على عكس GROUP BY، دوال النوافذ تحتفظ بالصفوف الفردية بينما تضيف أعمدة محسوبة.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'sql-window',
          starterCode: `-- TODO: Write a query that ranks employees
-- by salary within each department
SELECT
  name,
  department,
  salary,
  RANK() OVER (
    PARTITION BY department
    ORDER BY salary DESC
  ) as dept_rank
FROM employees;`,
          testCases: [
            { input: 'standard employees table', expected: 'ranked output' },
          ],
          expectedOutput: 'ranked output',
        },
        narrative: {
          en: 'Write a SQL query using RANK() with PARTITION BY.',
          ar: 'اكتب استعلام SQL باستخدام RANK() مع PARTITION BY.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'What is the key difference between GROUP BY and window functions?',
            ar: 'ما الفرق الرئيسي بين GROUP BY ودوال النوافذ؟',
          },
          options: [
            {
              text: { en: 'GROUP BY collapses rows; windows keep them', ar: 'GROUP BY يدمج الصفوف؛ النوافذ تحتفظ بها' },
              correct: true,
              explanation: {
                en: 'GROUP BY produces one row per group. Window functions add computed columns without reducing rows.',
                ar: 'GROUP BY ينتج صفاً واحداً لكل مجموعة. دوال النوافذ تضيف أعمدة محسوبة دون تقليل الصفوف.',
              },
            },
            {
              text: { en: 'Window functions are faster', ar: 'دوال النوافذ أسرع' },
              correct: false,
              explanation: {
                en: 'Performance depends on the query. The key difference is row preservation.',
                ar: 'الأداء يعتمد على الاستعلام. الفرق الرئيسي هو الحفاظ على الصفوف.',
              },
            },
            {
              text: { en: 'They are identical', ar: 'هما متطابقتان' },
              correct: false,
              explanation: {
                en: 'They serve different purposes — GROUP BY aggregates, windows analyze.',
                ar: 'تخدمان أغراضاً مختلفة — GROUP BY يجمع، النوافذ تحلل.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'eda-anscombe',
    title: "EDA & Anscombe's Quartet",
    titleAr: 'استكشاف البيانات ورباعية أنسكوم',
    trackId: 'programming',
    estimatedMinutes: 6,
    description: {
      en: 'Why summary statistics lie: identical mean and variance with radically different distributions.',
      ar: 'لماذا تضلل الإحصاءات الموجزة: متوسطات وتباينات متطابقة مع توزيعات متباينة تماماً.',
    },
    prerequisites: ['pandas-dataframe'],
    x: 340,
    y: 500,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'anscombe',
        narrative: {
          en: 'All 4 datasets share the exact same mean (9.0, 7.5) and regression line (y = 3.0 + 0.5x). Drag points to see the statistics react!',
          ar: 'المجموعات الأربع تشترك في نفس المتوسط تماماً (9.0، 7.5) ونفس خط الانحدار (y = 3.0 + 0.5x). اسحب النقاط لترى تفاعل الإحصاءات!',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: '\\bar{x} = 9.0 \\quad \\bar{y} = 7.5 \\quad \\hat{y} = 3.0 + 0.5x \\quad R^2 = 0.67',
        formulaNote: {
          en: 'Numerical summaries compress high-dimensional geometry into scalar projections, hiding non-linear structure.',
          ar: 'الملخصات العددية تضغط الهندسة عالية الأبعاد في مساقط سلمية، وتخفي البنية غير الخطية والقيم الشاذة.',
        },
        narrative: {
          en: 'Summary statistics alone are never sufficient to characterize distributions — visual inspection is mandatory in EDA.',
          ar: 'الإحصاءات الموجزة وحدها لا تكفي أبداً لتوصيف التوزيعات — الفحص البصري إلزامي في تحليل البيانات الاستكشافي.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'py-anscombe-summary',
          starterCode: `import numpy as np

def verify_anscombe_invariants(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:
    # TODO: Compute sample means of X and Y
    mx = float(np.mean(x))
    my = float(np.round(np.mean(y), 2))
    return (mx, my)`,
          testCases: [
            { input: 'x=[10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], y=[8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68]', expected: '(9.0, 7.5)' },
          ],
          expectedOutput: '(9.0, 7.5)',
        },
        narrative: {
          en: 'Implement the invariant mean calculation in NumPy.',
          ar: 'طبّق حساب المتوسطات الثابتة باستخدام NumPy.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'Why do all four Anscombe datasets yield the identical OLS regression line y = 3.0 + 0.5x?',
            ar: 'لماذا تنتج مجموعات أنسكوم الأربع نفس خط انحدار OLS تماماً: y = 3.0 + 0.5x؟',
          },
          options: [
            {
              text: {
                en: 'OLS slope and intercept depend exclusively on first and second moments (means, variances, covariance) which happen to match.',
                ar: 'معاملات OLS تعتمد حصرياً على العزوم الأولى والثانية (المتوسطات، التباينات، التباين المشترك) والتي تتطابق صدفة في هذه المجموعات.',
              },
              correct: true,
              explanation: {
                en: 'Correct! The normal equation beta = (X^T X)^(-1) X^T y compresses data into sample moments, remaining blind to outliers and non-linear curvature.',
                ar: 'صحيح! معادلات OLS تختزل البيانات في عينات التباين والمتوسط فقط، ولا تستشعر الانحناء غير الخطي أو القيم الشاذة بمفردها.',
              },
            },
            {
              text: {
                en: 'Because Anscombe generated the points using a uniform random distribution.',
                ar: 'لأن أنسكوم ولّد النقاط باستخدام توزيع عشوائي منتظم.',
              },
              correct: false,
              explanation: {
                en: 'Anscombe specifically hand-crafted the exact coordinates to deceive summary statistics.',
                ar: 'أنسكوم قام بتصميم الإحداثيات يدوياً وبدقة فائقة لخداع المقاييس الإحصائية.',
              },
            },
            {
              text: {
                en: 'Because R² is equal to 1.0 for all four datasets.',
                ar: 'لأن R² يساوي 1.0 لجميع المجموعات الأربع.',
              },
              correct: false,
              explanation: {
                en: 'R² is 0.67, not 1.0, reflecting moderate variance explanation.',
                ar: 'قيمة R² هي 0.67 وليست 1.0.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },

  // Track 3: Econometrics & ML
  {
    id: 'ols-residual-geometry',
    title: 'The Geometry of Squared Residuals',
    titleAr: 'هندسة البواقي المربعة',
    trackId: 'econometrics',
    estimatedMinutes: 6,
    description: {
      en: 'See how OLS minimizes the sum of squared residuals geometrically.',
      ar: 'شاهد كيف يقلل OLS مجموع البواقي المربعة هندسياً.',
    },
    prerequisites: [],
    x: 560,
    y: 80,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'ols',
        narrative: {
          en: 'Drag the slope slider and watch the residual squares shrink. The OLS line minimizes the total area of these squares.',
          ar: 'اسحب منزلق الميل وشاهد مربعات البواقي تتقلص. خط OLS يقلل المساحة الكلية لهذه المربعات.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'Loss(m, b) = Σᵢ (yᵢ - (m·xᵢ + b))²',
        formulaNote: {
          en: 'The sum of squared residuals — the objective function OLS minimizes.',
          ar: 'مجموع البواقي المربعة — دالة الهدف التي يقللها OLS.',
        },
        narrative: {
          en: 'For each point, the residual is yᵢ - ŷᵢ. We square it to penalize large errors and ensure differentiability.',
          ar: 'لكل نقطة، الباقي هو yᵢ - ŷᵢ. نربعه لمعاقبة الأخطاء الكبيرة ولضمان قابلية الاشتقاق.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'py-loss-computation',
          starterCode: `import numpy as np

def compute_squared_loss(y: np.ndarray, y_hat: np.ndarray) -> float:
    # TODO: Calculate the sum of squared residuals
    residuals = y - y_hat
    return float(np.sum(residuals ** 2))`,
          testCases: [
            { input: 'y=[2,4], y_hat=[1,3]', expected: '2.0' },
            { input: 'y=[5], y_hat=[5]', expected: '0.0' },
          ],
          expectedOutput: '2.0',
        },
        narrative: {
          en: 'Implement the sum of squared errors in one vectorized line.',
          ar: 'طبّق مجموع الأخطاء المربعة في سطر متجه واحد.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'Why do we minimize squared residuals (L2) instead of absolute residuals (L1)?',
            ar: 'لماذا نقلل مربعات البواقي (L2) بدلاً من البواقي المطلقة (L1)؟',
          },
          options: [
            {
              text: { en: 'Squared loss is differentiable and penalizes large errors more', ar: 'الخسارة المربعة قابلة للاشتقاق وتعاقب الأخطاء الكبيرة أكثر' },
              correct: true,
              explanation: {
                en: 'Squaring makes the function smooth (differentiable at 0) and disproportionately penalizes outliers.',
                ar: 'التربيع يجعل الدالة سلسة (قابلة للاشتقاق عند 0) ويعاقب القيم الشاذة بشكل مضاعف.',
              },
            },
            {
              text: { en: 'L1 does not have a closed-form solution', ar: 'L1 ليس له حل مغلق' },
              correct: false,
              explanation: {
                en: 'While true that L1 lacks a closed form, the primary reason is differentiability and gradient-based optimization.',
                ar: 'رغم أن L1 يفتقر لحل مغلق، السبب الرئيسي هو قابلية الاشتقاق والتحسين بالتدرج.',
              },
            },
            {
              text: { en: 'Squared loss is always more accurate', ar: 'الخسارة المربعة دائماً أكثر دقة' },
              correct: false,
              explanation: {
                en: 'Not always — L1 is more robust to outliers. The choice depends on the problem.',
                ar: 'ليس دائماً — L1 أكثر متانة ضد القيم الشاذة. الاختيار يعتمد على المسألة.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'knn-classification',
    title: 'K-Nearest Neighbors',
    titleAr: 'أقرب الجيران',
    trackId: 'econometrics',
    estimatedMinutes: 7,
    description: {
      en: 'Classify points by voting among their k nearest neighbors.',
      ar: 'صنّف النقاط بالتصويت بين أقرب k جيران.',
    },
    prerequisites: ['ols-residual-geometry'],
    x: 560,
    y: 220,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'knn',
        narrative: {
          en: 'Drag the query point and watch the radar pulse outward. It locks onto the k nearest points and votes.',
          ar: 'اسحب نقطة الاستعلام وشاهد الرادار ينبض للخارج. يقفل على أقرب k نقاط ويصوت.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'ŷ = mode({ yᵢ : i ∈ k-nearest(Q) })    d(Q, P) = √Σ(Qⱼ - Pⱼ)²',
        formulaNote: {
          en: 'Classification by majority vote among k nearest Euclidean neighbors.',
          ar: 'تصنيف بأغلبية الأصوات بين أقرب k جيران إقليديين.',
        },
        narrative: {
          en: 'KNN is a lazy learner — it stores training data and classifies at query time by distance voting.',
          ar: 'KNN متعلم كسول — يخزن بيانات التدريب ويصنف وقت الاستعلام بالتصويت بالمسافة.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'knn-impl',
          starterCode: `import numpy as np
from collections import Counter

def knn_predict(X_train, y_train, query, k=3):
    # TODO: Predict the class for query
    dists = np.sqrt(np.sum((X_train - query) ** 2, axis=1))
    k_nearest = np.argsort(dists)[:k]
    votes = y_train[k_nearest]
    return Counter(votes).most_common(1)[0][0]`,
          testCases: [
            { input: 'X=[[0,0],[1,1]], y=[0,1], Q=[0.1,0.1]', expected: '0' },
            { input: 'X=[[0,0],[9,9]], y=[0,1], Q=[8,8]', expected: '1' },
          ],
          expectedOutput: '0',
        },
        narrative: {
          en: 'Implement KNN: compute distances, select k nearest, majority vote.',
          ar: 'طبّق KNN: احسب المسافات، اختر الأقرب k، تصويت الأغلبية.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'What happens to KNN as k → N (total training points)?',
            ar: 'ماذا يحدث لـ KNN عندما k → N (إجمالي نقاط التدريب)؟',
          },
          options: [
            {
              text: { en: 'It always predicts the majority class', ar: 'يتنبأ دائماً بالفئة الأغلبية' },
              correct: true,
              explanation: {
                en: 'If k = N, all points are neighbors, so the vote is always the global majority.',
                ar: 'إذا k = N، جميع النقاط جيران، فالتصويت دائماً للأغلبية العالمية.',
              },
            },
            {
              text: { en: 'It becomes more accurate', ar: 'يصبح أكثر دقة' },
              correct: false,
              explanation: {
                en: 'Large k over-smooths the decision boundary, losing local structure.',
                ar: 'k الكبير يفرط في تنعيم حد القرار، ويفقد البنية المحلية.',
              },
            },
            {
              text: { en: 'It crashes', ar: 'يتعطل' },
              correct: false,
              explanation: {
                en: 'It does not crash — it just degrades to the majority class predictor.',
                ar: 'لا يتعطل — بل يتدهور إلى متنبئ الفئة الأغلبية.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'kmeans-clustering',
    title: 'K-Means Clustering',
    titleAr: 'تجميع K-Means',
    trackId: 'econometrics',
    estimatedMinutes: 7,
    description: {
      en: 'Watch centroids glide to cluster means as Voronoi cells morph.',
      ar: 'شاهد المراكز تنزلق إلى وسائل العناقيد بينما تتشكل خلايا فورونوي.',
    },
    prerequisites: ['knn-classification'],
    x: 560,
    y: 360,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'kmeans',
        narrative: {
          en: 'K-Means assigns points to the nearest centroid, then moves centroids to the mean of their assigned points. Watch the cells morph.',
          ar: 'K-Means يسند النقاط إلى أقرب مركز، ثم يحرك المراكز إلى وسط النقاط المسندة. شاهد الخلايا تتشكل.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'J = Σ Σ ‖xᵢ - μⱼ‖²    μⱼ = (1/|Cⱼ|) Σ xᵢ ∈ Cⱼ',
        formulaNote: {
          en: 'Minimize within-cluster sum of squares; centroids are cluster means.',
          ar: 'قلل مجموع المربعات داخل العنقود؛ المراكز هي وسائل العنقود.',
        },
        narrative: {
          en: 'The objective alternates between assignment (E-step) and update (M-step) until convergence.',
          ar: 'الهدف يتناوب بين الإسناد (خطوة E) والتحديث (خطوة M) حتى التقارب.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'kmeans-step',
          starterCode: `import numpy as np

def kmeans_step(X, centroids):
    # TODO: One step of K-Means
    # Assign points to nearest centroid
    dists = np.array([[np.sum((x - c) ** 2) for c in centroids] for x in X])
    labels = np.argmin(dists, axis=1)
    # Update centroids
    new_centroids = np.array([X[labels == j].mean(axis=0) for j in range(len(centroids))])
    return labels, new_centroids`,
          testCases: [
            { input: 'X=[[0,0],[10,10]], C=[[0,0],[10,10]]', expected: 'labels=[0,1]' },
          ],
          expectedOutput: 'labels=[0,1]',
        },
        narrative: {
          en: 'Implement one K-Means step: assign then update.',
          ar: 'طبّق خطوة K-Means واحدة: إسناد ثم تحديث.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'Does K-Means guarantee finding the global optimum?',
            ar: 'هل يضمن K-Means إيجاد الحل الأمثل العالمي؟',
          },
          options: [
            {
              text: { en: 'No, it converges to a local minimum', ar: 'لا، يتقارب إلى حد أدنى محلي' },
              correct: true,
              explanation: {
                en: 'K-Means uses Lloyd\'s algorithm, which is coordinate descent on a non-convex objective. Multiple restarts help.',
                ar: 'K-Means يستخدم خوارزمية لويد، وهي انحدار تنسيقي على هدف غير محدب. إعادة التشغيل تساعد.',
              },
            },
            {
              text: { en: 'Yes, always', ar: 'نعم، دائماً' },
              correct: false,
              explanation: {
                en: 'The objective is non-convex, so different initializations can yield different solutions.',
                ar: 'الهدف غير محدب، فالتشغيلات المختلفة قد تعطي حلولاً مختلفة.',
              },
            },
            {
              text: { en: 'Only with k=2', ar: 'فقط مع k=2' },
              correct: false,
              explanation: {
                en: 'Even with k=2, the objective remains non-convex.',
                ar: 'حتى مع k=2، الهدف يبقى غير محدب.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'decision-trees',
    title: 'Decision Trees & Impurity',
    titleAr: 'أشجار القرار والشوائب',
    trackId: 'econometrics',
    estimatedMinutes: 8,
    description: {
      en: 'Recursive binary splitting with entropy and Gini impurity.',
      ar: 'الانقسام الثنائي التراكبي مع الإنتروبيا وشوائب جيني.',
    },
    prerequisites: ['kmeans-clustering'],
    x: 560,
    y: 500,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'tree',
        narrative: {
          en: 'A decision tree slices the feature space with axis-aligned cuts. Each cut tries to purify the resulting regions.',
          ar: 'شجرة القرار تقطع فضاء الميزات بقطوع محاذاة للمحاور. كل قطع يحاول تنقية المناطق الناتجة.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'Gini = 1 - Σ pᵢ²    Information Gain = H(parent) - Σ (|Sᵥ|/|S|) H(Sᵥ)',
        formulaNote: {
          en: 'Gini and entropy measure class impurity within a node.',
          ar: 'جيني والإنتروبيا يقيسان شوائب الفئة داخل عقدة.',
        },
        narrative: {
          en: 'At each node, the tree picks the split that maximizes information gain (reduces impurity the most).',
          ar: 'في كل عقدة، الشجرة تختار القطع الذي يزيد كسب المعلومات (يقلل الشوائب أكثر).',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'gini-impurity',
          starterCode: `import numpy as np

def gini_impurity(y: np.ndarray) -> float:
    # TODO: Compute Gini impurity
    _, counts = np.unique(y, return_counts=True)
    probs = counts / len(y)
    return float(1 - np.sum(probs ** 2))`,
          testCases: [
            { input: 'y=[0,0,1,1]', expected: '0.5' },
            { input: 'y=[0,0,0,0]', expected: '0.0' },
          ],
          expectedOutput: '0.5',
        },
        narrative: {
          en: 'Implement Gini impurity: 1 - sum of squared probabilities.',
          ar: 'طبّق شوائب جيني: 1 - مجموع الاحتمالات المربعة.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'Why are single decision trees prone to overfitting?',
            ar: 'لماذا أشجار القرار الفردية عرضة للإفراط في التخصيص؟',
          },
          options: [
            {
              text: { en: 'They can create a leaf for every training point', ar: 'يمكنها إنشاء ورقة لكل نقطة تدريب' },
              correct: true,
              explanation: {
                en: 'Unconstrained trees grow until each leaf is pure, memorizing noise. Pruning and ensembles fix this.',
                ar: 'الأشجار غير المقيدة تنمو حتى تصبح كل ورقة نقية، وتحفظ الضوضاء. التقليم والمجموعات يحل ذلك.',
              },
            },
            {
              text: { en: 'They use too much memory', ar: 'تستخدم ذاكرة كثيرة' },
              correct: false,
              explanation: {
                en: 'Memory is not the issue — it is the model variance and sensitivity to training data.',
                ar: 'الذاكرة ليست المشكلة — بل تباين النموذج وحساسيته لبيانات التدريب.',
              },
            },
            {
              text: { en: 'They cannot handle non-linear data', ar: 'لا تستطيع معالجة البيانات غير الخطية' },
              correct: false,
              explanation: {
                en: 'Trees handle non-linearity well through axis-aligned splits. Overfitting is the real issue.',
                ar: 'الأشجار تعالج اللاخطية جيداً عبر قطوع محاذاة المحاور. الإفراط في التخصيص هو المشكلة الحقيقية.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'ridge-lasso',
    title: 'Ridge & Lasso Regularization',
    titleAr: 'تنظيم ريدج ولاسو',
    trackId: 'econometrics',
    estimatedMinutes: 8,
    description: {
      en: 'L2 shrinks weights smoothly; L1 produces exact sparsity.',
      ar: 'L2 يقلل الأوزان بسلاسة؛ L1 ينتج تناثراً دقيقاً.',
    },
    prerequisites: ['ols-residual-geometry'],
    x: 560,
    y: 640,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'regularization',
        narrative: {
          en: 'Ridge (L2) shrinks all weights toward zero but never exactly zero. Lasso (L1) can zero out weights entirely — feature selection!',
          ar: 'ريدج (L2) يقلل جميع الأوزان نحو الصفر لكن ليس صفراً تماماً. لاسو (L1) يمكنه تصفير الأوزان كلياً — اختيار الميزات!',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'Ridge: Loss + λΣwᵢ²    Lasso: Loss + λΣ|wᵢ|',
        formulaNote: {
          en: 'L2 ball is smooth; L1 ball has corners that hit axes (sparsity).',
          ar: 'كرة L2 سلسة؛ كرة L1 لها زوايا تصطدم بالمحاور (تناثر).',
        },
        narrative: {
          en: 'The L1 diamond geometry forces solutions onto axis corners, yielding exact zero weights.',
          ar: 'هندسة معين L1 تجبر الحلول على زوايا المحاور، مما يعطي أوزاناً صفرية دقيقة.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'ridge-loss',
          starterCode: `import numpy as np

def ridge_loss(y, y_hat, weights, lam):
    # TODO: Compute Ridge regression loss
    mse = np.mean((y - y_hat) ** 2)
    penalty = lam * np.sum(weights ** 2)
    return float(mse + penalty)`,
          testCases: [
            { input: 'y=[1], y_hat=[1], w=[0], lam=1', expected: '0.0' },
            { input: 'y=[0], y_hat=[1], w=[1], lam=1', expected: '2.0' },
          ],
          expectedOutput: '0.0',
        },
        narrative: {
          en: 'Implement Ridge loss: MSE + λ * Σw².',
          ar: 'طبّق خسارة ريدج: MSE + λ * Σw².',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'When should you prefer Lasso over Ridge?',
            ar: 'متى تفضل لاسو على ريدج؟',
          },
          options: [
            {
              text: { en: 'When you suspect only a few features are relevant', ar: 'عندما تشتبه أن بعض الميزات فقط ذات صلة' },
              correct: true,
              explanation: {
                en: 'Lasso\'s sparsity property automatically selects relevant features by zeroing the rest.',
                ar: 'خاصية التناثر في لاسو تختار الميزات ذات الصلة تلقائياً بتصفير الباقي.',
              },
            },
            {
              text: { en: 'When all features are equally important', ar: 'عندما تكون جميع الميزات متساوية الأهمية' },
              correct: false,
              explanation: {
                en: 'Ridge is better when all features contribute — it distributes shrinkage evenly.',
                ar: 'ريدج أفضل عندما تساهم جميع الميزات — يوزع التقليل بالتساوي.',
              },
            },
            {
              text: { en: 'When you have more data than features', ar: 'عندما تكون البيانات أكثر من الميزات' },
              correct: false,
              explanation: {
                en: 'The data/features ratio is not the deciding factor — it is about expected sparsity.',
                ar: 'نسبة البيانات/الميزات ليست العامل الحاسم — بل التوقعات حول التناثر.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'causal-inference-confounding',
    title: 'Causal Inference & Confounding',
    titleAr: 'الاستدلال السببي والخلط',
    trackId: 'econometrics',
    estimatedMinutes: 8,
    description: {
      en: "Simpson's paradox: how omitted confounders reverse regression slopes, and how stratification uncovers truth.",
      ar: 'مفارقة سيمبسون: كيف تقلب المتغيرات المربكة ميل الانحدار، وكيف يكشف التقسيم الطبقي الحقيقة.',
    },
    prerequisites: ['ols-residual-geometry'],
    x: 560,
    y: 780,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'simpson',
        narrative: {
          en: 'Toggle between Pooled and Stratified regression. Notice how older cohorts exercise more but have higher baseline risk, flipping the apparent slope!',
          ar: 'بدّل بين الانحدار المجمّع والانحدار الطبقي. لاحظ كيف تمارس الفئات الأكبر سناً رياضة أكثر ولكن لديها مخاطر أساسية أعلى، مما يقلب الميل الظاهري!',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: '\\hat{\\beta}_{\\text{naive}} = \\beta_{\\text{true}} + \\gamma \\cdot \\frac{\\text{Cov}(X, Z)}{\\text{Var}(X)}',
        formulaNote: {
          en: 'Omitted Variable Bias (OVB): Naive regression absorbs the indirect path through the confounder.',
          ar: 'انحياز المتغير المحذوف (OVB): الانحدار البسيط يمتص المسار غير المباشر عبر المتغير المربك.',
        },
        narrative: {
          en: 'In observational data, correlation can have the exact opposite sign of the true causal effect due to confounder bias.',
          ar: 'في البيانات الرصدية، يمكن أن يحمل الارتباط إشارة معاكسة تماماً للتأثير السببي الحقيقي بسبب انحياز المتغيرات المربكة.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'py-omitted-variable-bias',
          starterCode: `import numpy as np

def compute_naive_beta(beta_true: float, gamma: float, cov_xz: float, var_x: float) -> float:
    # TODO: Compute naive beta under omitted variable bias
    bias = gamma * (cov_xz / var_x)
    return float(beta_true + bias)`,
          testCases: [
            { input: 'beta_true=2.0, gamma=-3.0, cov_xz=2.0, var_x=4.0', expected: '0.5' },
            { input: 'beta_true=1.0, gamma=0.0, cov_xz=5.0, var_x=2.0', expected: '1.0' },
          ],
          expectedOutput: '0.5',
        },
        narrative: {
          en: 'Implement the Omitted Variable Bias equation in Python.',
          ar: 'طبّق معادلة انحياز المتغير المحذوف بلغة بايثون.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'In an observational study where treatment X correlates with confounder Z, when does naive OLS yield an unbiased causal estimate?',
            ar: 'في دراسة رصدية يرتبط فيها العلاج X بالمتغير المربك Z، متى يعطي OLS البسيط تقديراً سببية غير متحيّز؟',
          },
          options: [
            {
              text: {
                en: 'Only when gamma = 0 (confounder Z has no effect on outcome Y) OR Cov(X, Z) = 0.',
                ar: 'فقط عندما يكون gamma = 0 (المربك Z ليس له تأثير على النتيجة Y) أو Cov(X, Z) = 0.',
              },
              correct: true,
              explanation: {
                en: 'Correct! The bias term is gamma * Cov(X, Z) / Var(X). If either gamma=0 or Cov(X,Z)=0, the bias vanishes.',
                ar: 'صحيح! حد الانحياز هو gamma * Cov(X, Z) / Var(X). إذا كان أحدهما صفراً، يتلاشى الانحياز تماماً.',
              },
            },
            {
              text: {
                en: 'Whenever the sample size N exceeds 100,000 observations.',
                ar: 'كلما زاد حجم العينة N عن 100,000 مشاهدة.',
              },
              correct: false,
              explanation: {
                en: 'Omitted Variable Bias is asymptotic — increasing sample size only makes you precisely wrong with narrower confidence intervals!',
                ar: 'انحياز المتغير المحذوف هو انحياز تقاربي — زيادة حجم العينة تجعلك واثقاً بدقة من إجابة خاطئة!',
              },
            },
            {
              text: {
                en: 'When the outcome Y is normalized to zero mean and unit variance.',
                ar: 'عندما يتم تطبيع النتيجة Y ليكون متوسطها صفراً وتباينها واحداً.',
              },
              correct: false,
              explanation: {
                en: 'Standardizing variables rescales coefficients but does not eliminate confounding paths.',
                ar: 'المعايرة تغير مقياس المعاملات فقط لكنها لا تلغي مسارات الخلط السببي.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },

  // Track 4: Deep Learning
  {
    id: 'perceptron-activation',
    title: 'The Perceptron & Activations',
    titleAr: 'الخلايا العصبية ودوال التنشيط',
    trackId: 'deeplearning',
    estimatedMinutes: 7,
    description: {
      en: 'Weighted sums, bias, and non-linear activation functions.',
      ar: 'المجاميع المرجحة، الانحراف، ودوال التنشيط غير الخطية.',
    },
    prerequisites: [],
    x: 780,
    y: 80,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'neural',
        narrative: {
          en: 'A neuron computes a weighted sum, adds bias, and applies a non-linear activation. Without non-linearity, deep networks are just linear regression.',
          ar: 'الخلايا العصبية تحسب مجموعاً مرجحاً، تضيف انحرافاً، وتطبق تنشيطاً غير خطي. بدون اللاخطية، الشبكات العميقة هي مجرد انحدار خطي.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'a = σ(w·x + b)    σ(z) = max(0, z)  [ReLU]',
        formulaNote: {
          en: 'ReLU is the default activation for hidden layers in modern networks.',
          ar: 'ReLU هو التنشيط الافتراضي للطبقات المخفية في الشبكات الحديثة.',
        },
        narrative: {
          en: 'Common activations: Sigmoid (0-1), Tanh (-1 to 1), ReLU (sparse, non-saturating), GELU (smooth).',
          ar: 'التنشيطات الشائعة: سيغمويد (0-1)، تانه (-1 إلى 1)، ReLU (متناثر، غير مشبع)، GELU (سلس).',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'relu-impl',
          starterCode: `import numpy as np

def relu(x: np.ndarray) -> np.ndarray:
    # TODO: Implement ReLU activation
    return np.maximum(0, x)`,
          testCases: [
            { input: 'x=[-1, 0, 2]', expected: '[0, 0, 2]' },
            { input: 'x=[-5, -3]', expected: '[0, 0]' },
          ],
          expectedOutput: '[0, 0, 2]',
        },
        narrative: {
          en: 'Implement ReLU: max(0, x) element-wise.',
          ar: 'طبّق ReLU: max(0, x) عنصراً بعنصر.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'What is the "dying ReLU" problem?',
            ar: 'ما هي مشكلة "ReLU الميتة"؟',
          },
          options: [
            {
              text: { en: 'Neurons with negative inputs always output zero and stop learning', ar: 'الخلايا بمدخلات سلبية تنتج دائماً صفراً وتتوقف عن التعلم' },
              correct: true,
              explanation: {
                en: 'When inputs are consistently negative, gradient is zero, so weights never update. Leaky ReLU fixes this.',
                ar: 'عندما تكون المدخلات سلبية دائماً، التدرج صفر، فلا تتحدث الأوزان. Leaky ReLU يحل ذلك.',
              },
            },
            {
              text: { en: 'ReLU neurons become too active', ar: 'خلايا ReLU تصبح نشيطة جداً' },
              correct: false,
              explanation: {
                en: 'The problem is the opposite — neurons become permanently inactive.',
                ar: 'المشكلة عكسية — الخلايا تصبح غير نشيطة بشكل دائم.',
              },
            },
            {
              text: { en: 'ReLU outputs explode to infinity', ar: 'مخرجات ReLU تنفجر إلى ما لا نهاية' },
              correct: false,
              explanation: {
                en: 'ReLU is unbounded above, but "dying" refers to the zero-gradient problem, not explosion.',
                ar: 'ReLU غير محدود للأعلى، لكن "الموت" يشير لمشكلة التدرج الصفري، وليس الانفجار.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'gradient-descent',
    title: 'Gradient Descent Dynamics',
    titleAr: 'ديناميكية الانحدار التدرجي',
    trackId: 'deeplearning',
    estimatedMinutes: 8,
    description: {
      en: 'Watch a particle roll down a loss surface with momentum and learning rate.',
      ar: 'شاهد جسيماً يتدحرج على سطح خسارة مع الزخم ومعدل التعلم.',
    },
    prerequisites: ['perceptron-activation'],
    x: 780,
    y: 220,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'gradient',
        narrative: {
          en: 'A particle rolls downhill following the negative gradient. Too high a learning rate makes it overshoot; momentum helps it power through ravines.',
          ar: 'جسيم يتدحرج نحو الأسفل متبعاً التدرج السلبي. معدل تعلم عالي يجعله يتجاوز؛ الزخم يساعده على اختراق الأودية.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'vₜ₊₁ = β·vₜ - η·∇f(wₜ)    wₜ₊₁ = wₜ + vₜ₊₁',
        formulaNote: {
          en: 'Heavy-ball momentum: accumulate velocity to dampen oscillations.',
          ar: 'زخم الكرة الثقيلة: تجمع السرعة لتخميد التذبذبات.',
        },
        narrative: {
          en: 'Momentum accumulates gradient history, accelerating in consistent directions and dampening oscillations in ravines.',
          ar: 'الزخم يجمع تاريخ التدرج، ويسرع في الاتجاهات المتسقة ويخمد التذبذبات في الأودية.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'sgd-step',
          starterCode: `import numpy as np

def gradient_step(w, grad, v, lr=0.01, momentum=0.9):
    # TODO: One step of momentum SGD
    v_new = momentum * v - lr * grad
    w_new = w + v_new
    return w_new, v_new`,
          testCases: [
            { input: 'w=1, grad=0.1, v=0, lr=0.1', expected: 'w=0.9' },
          ],
          expectedOutput: 'w=0.9',
        },
        narrative: {
          en: 'Implement one step of gradient descent with momentum.',
          ar: 'طبّق خطوة واحدة من الانحدار التدرجي مع الزخم.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'What happens if the learning rate is too large?',
            ar: 'ماذا يحدث إذا كان معدل التعلم كبيراً جداً؟',
          },
          options: [
            {
              text: { en: 'The optimizer diverges and loss explodes', ar: 'المحسّن يتباعد وتنفجر الخسارة' },
              correct: true,
              explanation: {
                en: 'Overshooting the minimum causes the next gradient to be even larger, leading to divergence.',
                ar: 'تجاوز الحد الأدنى يجعل التدرج التالي أكبر، مما يؤدي للتباعد.',
              },
            },
            {
              text: { en: 'Training becomes slower', ar: 'التدريب يصبح أبطأ' },
              correct: false,
              explanation: {
                en: 'Too-large learning rates do not slow training — they destabilize it.',
                ar: 'معدلات التعلم الكبيرة لا تبطئ التدريب — بل تزعزعه.',
              },
            },
            {
              text: { en: 'Nothing changes', ar: 'لا شيء يتغير' },
              correct: false,
              explanation: {
                en: 'Learning rate directly affects step size. Too large is catastrophic.',
                ar: 'معدل التعلم يؤثر مباشرة على حجم الخطوة. الكبير جداً كارثي.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'cnn-convolution',
    title: 'CNN & Convolution Kernels',
    titleAr: 'الشبكات الالتفافية والمرشحات',
    trackId: 'deeplearning',
    estimatedMinutes: 7,
    description: {
      en: 'Kernels slide over images, detecting edges and patterns.',
      ar: 'المرشحات تنزلق على الصور، وتكشف الحواف والأنماط.',
    },
    prerequisites: ['gradient-descent'],
    x: 780,
    y: 360,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'conv',
        narrative: {
          en: 'A convolution kernel is a small filter that slides across the image. Each position produces one output pixel — detecting local patterns.',
          ar: 'مرشح الالتفاف هو فلتر صغير ينزلق عبر الصورة. كل موقع ينتج بكسلاً — يكشف الأنماط المحلية.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'Output(i,j) = Σ Σ I(i+m, j+n) · K(m, n)',
        formulaNote: {
          en: '2D cross-correlation (convolution without kernel flipping).',
          ar: 'ترابط متبادل ثنائي الأبعاد (التفاف دون قلب المرشح).',
        },
        narrative: {
          en: 'CNNs learn these kernels automatically. Early layers detect edges; deeper layers detect textures and objects.',
          ar: 'الشبكات الالتفافية تتعلم هذه المرشحات تلقائياً. الطبقات المبكرة تكشف الحواف؛ الأعمق تكشف الأنسجة والأشياء.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'conv2d',
          starterCode: `import numpy as np

def conv2d(image, kernel):
    # TODO: 2D convolution (cross-correlation)
    kh, kw = kernel.shape
    ih, iw = image.shape
    out = np.zeros((ih - kh + 1, iw - kw + 1))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            out[i, j] = np.sum(image[i:i+kh, j:j+kw] * kernel)
    return out`,
          testCases: [
            { input: 'image=[[1,1],[1,1]], kernel=[[1,1],[1,1]]', expected: '[[4]]' },
          ],
          expectedOutput: '[[4]]',
        },
        narrative: {
          en: 'Implement 2D convolution: slide kernel, element-wise multiply, sum.',
          ar: 'طبّق الالتفاف ثنائي الأبعاد: انزلق بالمرشح، اضرب عنصراً بعنصر، اجمع.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'Why are CNNs more efficient than fully-connected networks for images?',
            ar: 'لماذا الشبكات الالتفافية أكثر فعالية من الشبكات المتصلة بالكامل للصور؟',
          },
          options: [
            {
              text: { en: 'Shared weights and local connectivity reduce parameters', ar: 'الأوزان المشتركة والاتصال المحلي يقللان المعاملات' },
              correct: true,
              explanation: {
                en: 'One kernel is applied at every position, giving translation equivariance with far fewer parameters.',
                ar: 'مرشح واحد يطبق في كل موقع، مما يعطي تكافؤ إزاحة مع معاملات أقل بكثير.',
              },
            },
            {
              text: { en: 'CNNs use less memory for training data', ar: 'الشبكات الالتفافية تستخدم ذاكرة أقل لبيانات التدريب' },
              correct: false,
              explanation: {
                en: 'The data size is the same — the efficiency is in the model parameter count.',
                ar: 'حجم البيانات نفسه — الفعالية في عدد معاملات النموذج.',
              },
            },
            {
              text: { en: 'CNNs skip layers', ar: 'الشبكات الالتفافية تتخطى الطبقات' },
              correct: false,
              explanation: {
                en: 'Skip connections are a ResNet feature, not inherent to CNNs. The key is weight sharing.',
                ar: 'الاتصالات المتخطية هي خاصية ResNet، وليست جوهرية للشبكات الالتفافية. المفتاح هو مشاركة الأوزان.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
  {
    id: 'transformer-attention',
    title: 'Transformer Attention',
    titleAr: 'انتباه المحوّلات',
    trackId: 'deeplearning',
    estimatedMinutes: 9,
    description: {
      en: 'Scaled dot-product attention: Q, K, V matrices.',
      ar: 'انتباه الجداء القياسي المحدد: مصفوفات Q، K، V.',
    },
    prerequisites: ['cnn-convolution'],
    x: 780,
    y: 500,
    beats: [
      {
        number: 1,
        type: 'intuition',
        simulation: 'attention',
        narrative: {
          en: 'Attention lets each token look at all other tokens and decide which are most relevant. It is a soft, weighted lookup.',
          ar: 'الانتباه يتيح لكل رمز النظر إلى جميع الرموز الأخرى وتحديد الأكثر صلة. هو بحث مرجح ناعم.',
        },
      },
      {
        number: 2,
        type: 'formal',
        formula: 'Attention(Q,K,V) = softmax(QKᵀ / √dₖ) · V',
        formulaNote: {
          en: 'Scaling by 1/√dₖ prevents large dot products from saturating softmax.',
          ar: 'التحجيم بـ 1/√dₖ يمنع الجداءات الكبيرة من إشباع softmax.',
        },
        narrative: {
          en: 'Queries and Keys compute similarity scores. Softmax normalizes them into weights. Values are summed by those weights.',
          ar: 'الاستعلامات والمفاتيح تحسب درجات التشابه. softmax يطبّعها إلى أوزان. القيم تجمع حسب تلك الأوزان.',
        },
      },
      {
        number: 3,
        type: 'code',
        code: {
          id: 'attention',
          starterCode: `import numpy as np

def softmax(x, axis=-1):
    e = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return e / np.sum(e, axis=axis, keepdims=True)

def attention(Q, K, V):
    # TODO: Scaled dot-product attention
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)
    weights = softmax(scores)
    return weights @ V`,
          testCases: [
            { input: 'Q=K=V=I₃', expected: 'I₃' },
          ],
          expectedOutput: 'I₃',
        },
        narrative: {
          en: 'Implement scaled dot-product attention.',
          ar: 'طبّق انتباه الجداء القياسي المحدد.',
        },
      },
      {
        number: 4,
        type: 'transfer',
        question: {
          prompt: {
            en: 'Why do we scale by 1/√dₖ in attention?',
            ar: 'لماذا نحدد بـ 1/√dₖ في الانتباه؟',
          },
          options: [
            {
              text: { en: 'To prevent softmax saturation from large dot products', ar: 'لمنع إشباع softmax من الجداءات الكبيرة' },
              correct: true,
              explanation: {
                en: 'Large dimensionality makes QKᵀ values large, pushing softmax into regions with tiny gradients.',
                ar: 'الأبعاد الكبيرة تجعل قيم QKᵀ كبيرة، وتدفع softmax إلى مناطق ذات تدرجات ضئيلة.',
              },
            },
            {
              text: { en: 'To make the output smaller', ar: 'لجعل المخرج أصغر' },
              correct: false,
              explanation: {
                en: 'Scaling does not shrink output — it stabilizes the gradient flow through softmax.',
                ar: 'التحجيم لا يصغر المخرج — بل يثبت تدفق التدرج عبر softmax.',
              },
            },
            {
              text: { en: 'To normalize the input vectors', ar: 'لتطبيع متجهات الدخل' },
              correct: false,
              explanation: {
                en: 'Normalization is different — scaling specifically addresses the dot-product magnitude.',
                ar: 'التطبيع مختلف — التحجيم يعالج تحديداً حجم الجداء القياسي.',
              },
            },
          ],
        },
        narrative: { en: '', ar: '' },
      },
    ],
  },
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

