import type { CurriculumModule } from '../types';

export const econometricsModules: CurriculumModule[] = [
  {
    "id": "ols-residual-geometry",
    "title": "Bivariate OLS & The Geometry of Orthogonal Residuals",
    "titleAr": "الانحدار الخطي البسيط وهندسة البواقي المتعامدة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose you are looking for an apartment in a bustling city. You browse listings and quickly notice a clear pattern: larger apartments tend...",
      "ar": "تخيل أنك تبحث عن شقة للإيجار في مدينة حيوية. تتصفح الإعلانات وتلاحظ نمطًا بديهيًا: الشقق الأكبر مساحة تكون أغلى إيجارًا."
    },
    "prerequisites": [
      "orthogonal-projections",
      "numpy-vectorization"
    ],
    "x": 780,
    "y": 80,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LinearRegressionResiduals",
        "narrative": {
          "en": "Suppose you are looking for an apartment in a bustling city. You browse listings and quickly notice a clear pattern: larger apartments tend to rent for more money. A 400 sq ft studio rents for $1,400, an 800 sq ft one-bedroom rents for $2,200, and a 1,200 sq ft two-bedroom rents for $3,100. You want a fair rule of thumb to estimate what any apartment should cost based on its square footage. So, you plot the apartments on a grid and draw a straight line through the cloud of points.\n\nAlmost no apartment lands perfectly on your line. An 800 sq ft apartment might actually rent for $2,100, while your straight line predicts $2,200. That vertical gap—how much your model missed by (-$100)—is the **residual**.\n\nHow do we pick the 'best' possible line out of infinite options? Ordinary Least Squares (OLS) squares every vertical gap and finds the line that makes their total sum as small as possible. But why does this simple balancing act work so magically? Because OLS forces the leftovers (the residuals) to be strictly independent of apartment size—they share zero linear pattern. Geometrically, your prediction line acts like a shadow cast on the floor, and the residual errors stand straight up at a 90-degree angle, completely perpendicular to the features you observed.\n\nCrucially, we must untangle what this line actually tells us. A predictive machine learning model asks: *'If an apartment has 1,000 sq ft, what is our best forecast of its rent?'* That is passive observation—spotting where the shadow falls on the lawn. Econometrics asks a fundamentally causal question: *'If a landlord knocks down a wall and expands an apartment by 200 sq ft, how much will its rent actually increase?'* While OLS finds the optimal linear forecast inside your sample, it cannot turn correlation into causation if unobserved factors (like proximity to subway stations or luxury finishes) drive both size and price.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Dependent Variable ($y$)** | The outcome you want to explain or predict (e.g., monthly apartment rent). |\n| **Independent Regressor ($X$)** | The input feature used to make the prediction (e.g., square footage). |\n| **Fitted Value ($\\hat{y}$)** | The model's best guess along the regression line (e.g., predicted rent of $2,200). |\n| **Residual ($e = y - \\hat{y}$)** | How much our prediction missed by (the vertical gap between reality and the line). |\n| **Sum of Squared Errors (SSE)** | Total penalty: squaring each gap so positive and negative errors do not cancel out. |\n| **Orthogonality ($90^\\circ$)** | Pure independence: the residual errors have zero linear correlation with the regressors. |\n\n```text\n  Rent ($)\n    ^\n    |                                   * Actual ($3,100)\n    |                                 / |\n    |                     * ($2,100) /  |  Residual e3 (+100)\n    |                     |         /   |\n3000|                     | e2     /----+--- Fitted y_hat\n    |                     v (-100)/\n    |                 *---------/\n2000|               / |\n    |      * ($1,500)/| e1 (+100)\n    |      |        / |\n1000|      +-------/  +------------------------------>\n    |             /                             Square Footage (sq ft)\n    0-----+------+------+------+------+------+\n          400   600    800    1000   1200\n```",
          "ar": "تخيل أنك تبحث عن شقة للإيجار في مدينة حيوية. تتصفح الإعلانات وتلاحظ نمطًا بديهيًا: الشقق الأكبر مساحة تكون أغلى إيجارًا. شقة استوديو بمساحة 400 قدم مربع تؤجر بـ 1,400 دولار، وشقة بمساحة 800 قدم مربع تؤجر بـ 2,200 دولار، وشقة بمساحة 1,200 قدم مربع تؤجر بـ 3,100 دولار. ترغب في قاعدة إرشادية عادلة لتقدير الإيجار المتوقع لأي مساحة، فتضع الشقق على رسم بياني وترسم خطًا مستقيمًا يمر عبر سحابة النقاط.\n\nفي الواقع، قلما تقع شقة على الخط تمامًا. فشقة مساحتها 800 قدم مربع قد تؤجر فعليًا بـ 2,100 دولار بينما يتوقع خطك 2,200 دولار. هذه الفجوة الرأسية—مقدار خطأ التنبؤ (-100 دولار)—تسمى **الباقي (Residual)**.\n\nكيف نختار \"أفضل\" خط ممكن من بين عدد لا نهائي من الخطوط؟ تقوم طريقة المربعات الصغرى العادية (OLS) بتربيع كل خطأ رأسي والبحث عن الخط الذي يجعل مجموع هذه المربعات أصغر ما يمكن. والسر الهندسي البديع هو أن OLS تجبر بواقي الأخطاء على أن تكون متعامدة تمامًا ($90^\\circ$) مع مساحة الشقة، أي خالية من أي ترابط خطي معها.\n\nوالأهم هو التمييز الحاسم بين التنبؤ والسببية: يسأل علم البيانات التنبؤي: *\"إذا كانت مساحة الشقة 1000 قدم مربع، فما هو أفضل تخمين لإيجارها؟\"* هذا مجرد رصد سلبي لموضع الظل. أما القياس الاقتصادي فيسأل سؤالاً سببيًا: *\"لو قام المالك بتوسيع الشقة بمقدار 200 قدم مربع، فكم سيزداد الإيجار فعليًا؟\"* يضمن OLS أدق تنبؤ داخل العينة، لكنه يعجز عن إثبات السببية إذا كانت هناك عوامل خفية غير مقاسة (كموقع الشقة وقربها من المترو) تؤثر على المساحة والسعر معًا.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **المتغير التابع ($y$)** | النتيجة التي نريد تفسيرها أو توقعها (مثل إيجار الشقة الشهري). |\n| **المتغير المستقل ($X$)** | الميزة أو المعلومة المستخدمة للتخمين (مثل المساحة بالقدم المربع). |\n| **القيمة المقدرة ($\\hat{y}$)** | التخمين الأفضل للنموذج الواقع على خط الانحدار مباشرة. |\n| **الباقي / الخطأ ($e = y - \\hat{y}$)** | مقدار خطأ التنبؤ (المسافة الرأسية بين الواقع وخط النموذج). |\n| **مجموع مربعات الأخطاء (SSE)** | إجمالي العقوبة: تربيع الفروق حتى لا تلغي الأخطاء السالبة نظيرتها الموجبة. |\n| **التعامد الهندسـي ($90^\\circ$)** | الاستقلالية التامة: بواقي الأخطاء لا ترتبط خطيًا بأي شكل مع المتغير المستقل. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}",
        "formulaNote": {
          "en": "Core invariant for Bivariate OLS & The Geometry of Orthogonal Residuals.",
          "ar": "الخاصية الرياضية الجوهرية لـ الانحدار الخطي البسيط وهندسة البواقي المتعامدة."
        },
        "narrative": {
          "en": "The empirical sum of squared residuals objective function minimizes the squared Euclidean length of the error vector:\n\n$$\nS(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{y} + \\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{X} \\boldsymbol{\\beta}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why do we square the errors instead of adding raw errors?**\n   If our line overshoots one apartment by +$100 and undershoots another by -$100, simply adding them yields $(+100) + (-100) = 0$. The raw sum would declare a terrible line to be 'perfect'! Squaring eliminates negative signs so every mistake counts positively.\n2. **Why square instead of using absolute values $|e_i|$?**\n   Absolute value graphs have a sharp, non-differentiable 'V' point at zero, making closed-form algebra difficult. Squaring produces a smooth, parabolic bowl with a single global minimum that can be solved directly with simple derivatives (setting the gradient to zero). Furthermore, squaring penalizes massive blunders quadratically (missing by 10 costs 100; missing by 50 costs 2,500).\n3. **Why do the Normal Equations enforce $\\mathbf{X}^T \\mathbf{e} = \\mathbf{0}$?**\n   At the lowest point of the bowl, the slope (derivative) is zero. Differentiating the squared error with respect to $\\boldsymbol{\\beta}$ yields $-2\\mathbf{X}^T(\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) = \\mathbf{0}$, which simplifies directly to $\\mathbf{X}^T \\mathbf{e} = \\mathbf{0}$. This proves that the sample residuals are mathematically orthogonal ($90^\\circ$) to every regressor.\n\n### Mathematical Derivation of the Normal Equations\n\nTo find the minimizer $\\hat{\\boldsymbol{\\beta}}$, we compute the matrix derivative of $S(\\boldsymbol{\\beta})$ with respect to $\\boldsymbol{\\beta}$:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) = -2\\mathbf{X}^T \\mathbf{y} + 2\\mathbf{X}^T \\mathbf{X}\\boldsymbol{\\beta}\n$$\n\nSetting the gradient to zero yields the celebrated **Normal Equations**:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) = \\mathbf{0} \\implies -2\\mathbf{X}^T(\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}) = \\mathbf{0} \\implies \\mathbf{X}^T \\mathbf{e} = \\mathbf{0}\n$$\n\nUnder the assumption of full column rank ($\\text{rank}(\\mathbf{X}) = K < N$), the Gram matrix $\\mathbf{X}^T \\mathbf{X}$ is invertible:\n\n$$\n\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}\n$$\n\nThe fitted values and residuals are generated via the symmetric, idempotent **Hat Matrix** ($\\mathbf{P}_X$) and **Annihilator Matrix** ($\\mathbf{M}_X$):\n\n$$\n\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}} = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y} \\equiv \\mathbf{P}_X \\mathbf{y}, \\quad \\mathbf{e} = \\mathbf{y} - \\hat{\\mathbf{y}} = (\\mathbf{I}_N - \\mathbf{P}_X)\\mathbf{y} \\equiv \\mathbf{M}_X \\mathbf{y}\n$$\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\mathbf{y} \\in \\mathbb{R}^{N \\times 1}$: Observed response vector containing the outcome variable for all $N$ economic agents.\n* $\\mathbf{X} \\in \\mathbb{R}^{N \\times K}$: Design matrix containing $K$ regressor columns (including an intercept vector of ones $\\boldsymbol{\\iota}_N$).\n* $\\boldsymbol{\\beta} \\in \\mathbb{R}^{K \\times 1}$: True, unobservable population parameter vector.\n* $\\hat{\\boldsymbol{\\beta}} \\in \\mathbb{R}^{K \\times 1}$: OLS coefficient vector that minimizes the sum of squared residuals.\n* $\\hat{\\mathbf{y}} \\in \\text{col}(\\mathbf{X})$: Orthogonal projection of $\\mathbf{y}$ onto the subspace spanned by the columns of $\\mathbf{X}$.\n* $\\mathbf{e} \\in \\mathbb{R}^{N \\times 1}$: Sample residual vector satisfying $\\mathbf{X}^T \\mathbf{e} = \\mathbf{0}$ by first-order construction.\n* $\\mathbf{P}_X \\in \\mathbb{R}^{N \\times N}$: The projection (hat) matrix with $\\text{rank}(\\mathbf{P}_X) = \\text{tr}(\\mathbf{P}_X) = K$.\n* $\\mathbf{M}_X \\in \\mathbb{R}^{N \\times N}$: The residual maker (annihilator) matrix with $\\text{rank}(\\mathbf{M}_X) = \\text{tr}(\\mathbf{M}_X) = N - K$, satisfying $\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\mathbf{y}$ | متجه الاستجابة المشاهد | المتغير التابع الفعلي لجميع وحدات العينة $N$ (مثل الإيجار الحقيقي). |\n| $\\mathbf{X}$ | مصفوفة التصميم | المتغيرات المستقلة المفسرة متضمنة عمود الآحاد للحد الثابت. |\n| $\\boldsymbol{\\beta}$ | معالم المجتمع الحقيقية | الأثر السببي الحقيقي غير المشاهد في المجتمع الإحصائي الكلي. |\n| $\\hat{\\boldsymbol{\\beta}}$ | مقدر المربعات الصغرى | معاملات الانحدار المحسوبة من العينة لتقليل مربع المسافات الرأسية. |\n| $\\hat{\\mathbf{y}}$ | القيم المقدرة | الإسقاط الهندسي المتعامد للمتجه $\\mathbf{y}$ داخل فضاء أعمدة $\\mathbf{X}$. |\n| $\\mathbf{e}$ | متجه البواقي | فروق التنبؤ الفعلية التي تتعامد جبريًا بالضرورة مع كل عمود في $\\mathbf{X}$. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the closed-form Ordinary Least Squares estimator using NumPy. Rather than directly computing `np.linalg.inv`, solve the linear system $(\\mathbf{X}^T \\mathbf{X})\\boldsymbol{\\beta} = \\mathbf{X}^T \\mathbf{y}$ using `np.linalg.solve` to preserve numerical stability and avoid condition-number blowups."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-ols-residual-geometry",
          "starterCode": "def fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors (must have full column rank).\n    y : np.ndarray of shape (N,)\n        Observed response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameter vector of shape (K,)\n        'y_hat': fitted values vector of shape (N,)\n        'residuals': residual errors vector of shape (N,)\n    \"\"\"\n    # Step 1: Form the Gram matrix X^T X (features interacting with features)\n    # Step 2: Form the feature-target projection vector X^T y\n    # Step 3: Solve the normal equations (X^T X) beta = X^T y stably\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "fit_ols(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0]]), np.array([3.0, 5.0, 7.0]))['beta'].round(4).tolist()",
              "expected": "[1.0, 2.0]"
            },
            {
              "input": "fit_ols(np.array([[1.0, 0.0], [1.0, 4.0]]), np.array([2.0, 10.0]))['beta'].round(4).tolist()",
              "expected": "[2.0, 2.0]"
            },
            {
              "input": "fit_ols(np.array([[1.0, 2.0], [1.0, 4.0], [1.0, 6.0]]), np.array([4.0, 8.0, 12.0]))['residuals'].round(4).tolist()",
              "expected": "[0.0, 0.0, 0.0]"
            }
          ],
          "expectedOutput": "[1.0, 2.0]",
          "variants": {
            "python": {
              "starterCode": "def fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors (must have full column rank).\n    y : np.ndarray of shape (N,)\n        Observed response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameter vector of shape (K,)\n        'y_hat': fitted values vector of shape (N,)\n        'residuals': residual errors vector of shape (N,)\n    \"\"\"\n    # Step 1: Form the Gram matrix X^T X (features interacting with features)\n    # Step 2: Form the feature-target projection vector X^T y\n    # Step 3: Solve the normal equations (X^T X) beta = X^T y stably\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[1.0, 2.0]"
            }
          },
          "solution": "import numpy as np\n\ndef fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors (must have full column rank).\n    y : np.ndarray of shape (N,)\n        Observed response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameter vector of shape (K,)\n        'y_hat': fitted values vector of shape (N,)\n        'residuals': residual errors vector of shape (N,)\n    \"\"\"\n    # Step 1: Form the Gram matrix X^T X (features interacting with features)\n    gram_matrix = X.T @ X\n    \n    # Step 2: Form the feature-target projection vector X^T y\n    feature_target_proj = X.T @ y\n    \n    # Step 3: Solve the normal equations (X^T X) beta = X^T y stably\n    beta = np.linalg.solve(gram_matrix, feature_target_proj)\n    \n    # Step 4: Compute the fitted values y_hat = X beta (the shadow on the floor)\n    y_hat = X @ beta\n    \n    # Step 5: Compute the residual vector e = y - y_hat (the vertical error)\n    residuals = y - y_hat\n    \n    return {\n        \"beta\": beta,\n        \"y_hat\": y_hat,\n        \"residuals\": residuals,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Residuals are not orthogonal to regressor columns (`X.T @ residuals != 0`).",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Using an unstable manual matrix inverse `np.linalg.inv(X.T @ X)` on ill-conditioned data or transposing vectors incorrectly.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Use `np.linalg.solve(X.T @ X, X.T @ y)` to obtain numerically stable coefficients, then compute `residuals = y - X @ beta`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A data scientist at an economic consulting firm runs an OLS regression of worker wages on years of education and notes with excitement: *\"My computer output shows that the sum of the residuals is $0.00000000$ and the correlation between education and the residuals is exactly $0.00000000$. This proves that education is completely exogenous and my estimate is free from unobserved ability bias!\"* How should a trained econometrician evaluate this statement?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الانحدار الخطي البسيط وهندسة البواقي المتعامدة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The scientist is correct: if residuals are orthogonal to education, there cannot be omitted variable bias.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The scientist is mistaken: residual orthogonality ($\\mathbf{X}^T \\mathbf{e} = \\mathbf{0}$) is an algebraic identity forced by the first-order conditions of least squares; it holds identically even if omitted ability severely confounds the regression.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The scientist is mistaken only because the sample size might be too small for the central limit theorem to apply.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The scientist is correct only if the true error term is normally distributed.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "goodness-of-fit-r-squared",
    "title": "Goodness-of-Fit, R-squared, and the ANOVA Decomposition",
    "titleAr": "جودة التوفيق ومعامل التحديد والتفكيك التبايني",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you manage a real estate agency. You notice that house prices swing wildly: some sell for $200,000, others for $800,000.",
      "ar": "تخيل أنك تدير شركة عقارية. تلاحظ أن أسعار المنازل تتفاوت بشدة: بعضها يباع بـ 200,000 دولار وبعضها بـ 800,000 دولار."
    },
    "prerequisites": [
      "ols-residual-geometry"
    ],
    "x": 760,
    "y": 175,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ColumnSpaceProjection3D",
        "narrative": {
          "en": "Imagine you manage a real estate agency. You notice that house prices swing wildly: some sell for $200,000, others for $800,000. If you have no information about a newly listed home, your best blind guess is simply the average price of all houses in the city (say, $450,000). The total spread of actual house prices around this baseline average is the **Total Variation** in your market.\n\nNow, you build a simple regression model using floor area (square footage). Your model predicts that a 3,000 sq ft home should sell for $720,000. When that home actually sells for $750,000, two things happened:\n1. Floor area explained a massive leap: jumping from the baseline $450,000 up to $720,000. This is the **Explained Variation**.\n2. But your model still missed the final sale price by $30,000. That leftover gap is the **Unexplained Residual Noise**.\n\nThe Analysis of Variance (ANOVA) decomposition proves that because your prediction line balances errors perfectly at right angles ($90^\\circ$), total market spread splits cleanly into two parts: $\\text{Total Spread} = \\text{Explained Signal} + \\text{Residual Noise}$. The coefficient of determination, $R^2$, is simply the percentage of total price variance captured by your features (e.g., $R^2 = 0.80$ means 80% explained, 20% noise).\n\nCrucially, we must untangle predictive accuracy from causal truth. A high $R^2$ does not mean you found the cause! For example, regressing children's reading level on shoe size yields a sky-high $R^2 = 0.85$ purely because older children have larger feet and read better. Buying bigger shoes will not teach a toddler to read. Conversely, an effective medical treatment might explain only 3% of recovery variance ($R^2 = 0.03$) because human genetics vary wildly, yet that 3% represents a life-saving causal impact.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Total Sum of Squares (TSS)** | Total market variation: how wildly actual outcomes spread around the sample average. |\n| **Explained Sum of Squares (ESS)** | Explained signal: how much variance the regression model successfully accounts for. |\n| **Residual Sum of Squares (SSR)** | Leftover noise: the squared errors where the model's predictions missed reality. |\n| **R-squared ($R^2$)** | The scoreboard: the percentage of total variation explained by the model ($0.0$ to $1.0$). |\n| **Adjusted R-squared ($\\bar{R}^2$)** | The honest referee: penalizes adding useless features that only memorize random noise. |\n\n```text\n  House Price ($)\n    ^\n    |                                   * Actual Price ($750k)\n    |                                 / |\n    |                                /  | Residual Noise (SSR): $30k gap\n    |                Fitted Value ->/---+ ($720k)\n    |                             /     |\n    |                           /       | Explained Signal (ESS): $270k gain\n    |                         /         |\n    |  - - - - - - - - - - - / - - - - -+ - - Baseline Average (y_bar = $450k)\n    |                      /\n    |                    /\n    0-------------------+-------------------------> Square Footage\n```",
          "ar": "تخيل أنك تدير شركة عقارية. تلاحظ أن أسعار المنازل تتفاوت بشدة: بعضها يباع بـ 200,000 دولار وبعضها بـ 800,000 دولار. إذا لم تكن تملك أي معلومة عن منزل معروض للبيع، فإن تخمينك الأولي الوحيد هو متوسط سعر السوق (وليكن 450,000 دولار). هذا التشتت الكلي لأسعار المنازل حول المتوسط يسمى **التباين الإجمالي**.\n\nالآن، قمت بإنشاء نموذج انحدار يعتمد على مساحة المنزل بالقدم المربع. توقع نموذجك أن منزلاً مساحته 3000 قدم مربع سيباع بـ 720,000 دولار. وعندما بيع المنزل فعليًا بـ 750,000 دولار، انقسم الفارق إلى جزأين:\n1. قفزة فسرها النموذج: الانتقال من المتوسط العام (450 ألف) إلى توقع النموذج (720 ألف). هذا هو **التباين المفسَّر**.\n2. فجوة متبقية أخطأ فيها النموذج: الفارق البالغ 30,000 دولار بين الواقع والتوقع. هذا هو **باقي الخطأ العشوائي**.\n\nتثبت مبرهنة تفكيك التباين (ANOVA) أن التباين الكلي ينقسم تمامًا إلى: $\\text{التباين الكلي} = \\text{الإشارة المفسرة} + \\text{التشويش العشوائي}$. ويمثل معامل التحديد $R^2$ النسبة المئوية من تباين السوق التي فسرها النموذج.\n\nوالأهم هو إدراك الفرق بين التنبؤ والسببية: ارتفاع $R^2$ لا يعني أبدًا أنك اكتشفت السبب الحقيقي! فانحدار مهارة القراءة عند الأطفال على مقاس أحذيتهم يعطي $R^2 = 0.85$ بسبب عامل العمر المشترك، ولكن شراء أحذية كبيرة لن يعلم الطفل القراءة. وعلى النقيض، قد يعطي دواء منقذ للحياة $R^2 = 0.03$ فقط لتفاوت جينات البشر، ومع ذلك فهو أثر سببي حقيقي ينقذ الأرواح.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **مجموع المربعات الكلي (TSS)** | إجمالي تشتت الظاهرة: مدى ابتعاد القيم الحقيقية عن المتوسط العام للعينة. |\n| **مجموع المربعات المفسر (ESS)** | إشارة النموذج: مقدار التباين الذي نجحت المتغيرات المستقلة في تفسيره. |\n| **مجموع مربعات البواقي (SSR)** | التشويش المتبقي: مجموع أخطاء التنبؤ التي عجز النموذج عن تفسيرها. |\n| **معامل التحديد ($R^2$)** | لوحة النتائج: النسبة المئوية للتباين المفسر بالنموذج (بين 0 و 1). |\n| **معامل التحديد المعدل ($\\bar{R}^2$)** | الحكم النزيه: يفرض غرامة على إضافة متغيرات تافهة تعتمد على الصدفة. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{TSS} = \\text{ESS} + \\text{SSR}",
        "formulaNote": {
          "en": "Core invariant for Goodness-of-Fit, R-squared, and the ANOVA Decomposition.",
          "ar": "الخاصية الرياضية الجوهرية لـ جودة التوفيق ومعامل التحديد والتفكيك التبايني."
        },
        "narrative": {
          "en": "2. **Why does adding random noise always increase unadjusted $R^2$?**\n   Every added variable expands the column space of $\\mathbf{X}$. Even if a variable is pure random noise (like coin flips), it has a tiny accidental alignment with $\\mathbf{y}$, which decreases SSR and mechanically drives $R^2 = 1 - \\frac{\\text{SSR}}{\\text{TSS}}$ upward.\n3. **How does Adjusted $R^2$ solve this?**\n   Adjusted $R^2$ divides SSR and TSS by their respective degrees of freedom:\n   $$\n   \\bar{R}^2 = 1 - \\frac{\\text{SSR} / (N - p - 1)}{\\text{TSS} / (N - 1)}\n   $$\n   Adding a useless variable costs 1 degree of freedom ($N - p - 1$ shrinks), which increases the penalty unless the new variable reduces SSR by more than random chance!\n\n### Algebraic Derivation of the ANOVA Identity\n\nExpress each centered observation $y_i - \\bar{y}$ by adding and subtracting fitted $\\hat{y}_i$:\n\n$$\ny_i - \\bar{y} = (\\hat{y}_i - \\bar{y}) + (y_i - \\hat{y}_i) = (\\hat{y}_i - \\bar{y}) + e_i\n$$\n\nSquaring both sides and summing across all observations $i = 1, \\dots, N$:\n\n$$\n\\sum_{i=1}^N (y_i - \\bar{y})^2 = \\sum_{i=1}^N (\\hat{y}_i - \\bar{y})^2 + \\sum_{i=1}^N e_i^2 + 2 \\sum_{i=1}^N (\\hat{y}_i - \\bar{y})e_i\n$$\n\nBecause $\\sum_{i=1}^N (\\hat{y}_i - \\bar{y})e_i = \\hat{\\boldsymbol{\\beta}}^T \\mathbf{X}^T \\mathbf{e} - \\bar{y} \\sum e_i = 0 - 0 = 0$:\n\n$$\n\\text{TSS} = \\text{ESS} + \\text{SSR} \\implies R^2 = \\frac{\\text{ESS}}{\\text{TSS}} = 1 - \\frac{\\text{SSR}}{\\text{TSS}}\n$$\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\text{TSS} = \\sum_{i=1}^N (y_i - \\bar{y})^2$: Total Sum of Squares with $N - 1$ degrees of freedom.\n* $\\text{ESS} = \\sum_{i=1}^N (\\hat{y}_i - \\bar{y})^2$: Explained Sum of Squares with $p$ degrees of freedom.\n* $\\text{SSR} = \\sum_{i=1}^N e_i^2$: Residual Sum of Squares with $N - p - 1$ degrees of freedom.\n* $R^2 = 1 - \\frac{\\text{SSR}}{\\text{TSS}}$: Unadjusted sample coefficient of determination.\n* $\\bar{R}^2 = 1 - \\frac{\\text{SSR}/(N - p - 1)}{\\text{TSS}/(N - 1)}$: Degrees-of-freedom adjusted $R^2$.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\text{TSS}$ | مجموع المربعات الكلي | قياس تشتت البيانات الأصلية حول متوسطها الحسابي بدرجات حرية $N-1$. |\n| $\\text{ESS}$ | مجموع المربعات المفسر | التباين الإيجابي الذي فسره خط الانحدار بدرجات حرية $p$. |\n| $\\text{SSR}$ | مجموع مربعات الأخطاء | تباين الفروق العشوائية غير المفسرة بدرجات حرية $N-p-1$. |\n| $R^2$ | معامل التحديد | نسبة التباين المفسر الأصلية غير المعاقبة على كثرة المتغيرات. |\n| $\\bar{R}^2$ | معامل التحديد المعدل | المقياس النزيه الذي يعاقب النموذج عند إضافة متغيرات عديمة الفائدة. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the full ANOVA variance decomposition and compute both $R^2$ and Adjusted $R^2$ in NumPy. Ensure your degrees of freedom correctly separate the total sample size $N$ from the slope count $p$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-goodness-of-fit-r-squared",
          "starterCode": "def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    \"\"\"\n    Computes the ANOVA variance decomposition, unadjusted R^2, and adjusted R^2.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target values.\n    y_hat : np.ndarray of shape (N,)\n        Model fitted predictions.\n    p : int\n        Number of explanatory slope features (excluding intercept).\n\n    Returns\n    -------\n    dict with keys 'tss', 'ess', 'ssr', 'r2', 'adj_r2'\n    \"\"\"\n    # Step 1: Calculate Total Sum of Squares (spread around average baseline)\n    # Step 2: Calculate Explained Sum of Squares (signal captured by predictions)\n    # Step 3: Calculate Residual Sum of Squares (unexplained error noise)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "compute_r2_anova(np.array([2.0, 4.0, 6.0]), np.array([2.0, 4.0, 6.0]), 1)['r2']",
              "expected": "1.0"
            },
            {
              "input": "round(compute_r2_anova(np.array([1.0, 2.0, 3.0, 4.0, 5.0]), np.array([1.2, 1.8, 3.1, 3.9, 5.0]), 1)['r2'], 4)",
              "expected": "0.993"
            },
            {
              "input": "compute_r2_anova(np.array([10.0, 20.0, 30.0]), np.array([10.0, 20.0, 30.0]), 1)['ssr']",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    \"\"\"\n    Computes the ANOVA variance decomposition, unadjusted R^2, and adjusted R^2.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target values.\n    y_hat : np.ndarray of shape (N,)\n        Model fitted predictions.\n    p : int\n        Number of explanatory slope features (excluding intercept).\n\n    Returns\n    -------\n    dict with keys 'tss', 'ess', 'ssr', 'r2', 'adj_r2'\n    \"\"\"\n    # Step 1: Calculate Total Sum of Squares (spread around average baseline)\n    # Step 2: Calculate Explained Sum of Squares (signal captured by predictions)\n    # Step 3: Calculate Residual Sum of Squares (unexplained error noise)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    \"\"\"\n    Computes the ANOVA variance decomposition, unadjusted R^2, and adjusted R^2.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target values.\n    y_hat : np.ndarray of shape (N,)\n        Model fitted predictions.\n    p : int\n        Number of explanatory slope features (excluding intercept).\n\n    Returns\n    -------\n    dict with keys 'tss', 'ess', 'ssr', 'r2', 'adj_r2'\n    \"\"\"\n    n = len(y)\n    y_mean = float(np.mean(y))\n\n    # Step 1: Calculate Total Sum of Squares (spread around average baseline)\n    tss = float(np.sum((y - y_mean) ** 2))\n\n    # Step 2: Calculate Explained Sum of Squares (signal captured by predictions)\n    ess = float(np.sum((y_hat - y_mean) ** 2))\n\n    # Step 3: Calculate Residual Sum of Squares (unexplained error noise)\n    ssr = float(np.sum((y - y_hat) ** 2))\n\n    # Step 4: Compute unadjusted R^2\n    r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0\n\n    # Step 5: Compute degrees-of-freedom adjusted R^2\n    df_total = n - 1\n    df_resid = n - p - 1\n    if df_resid > 0 and tss > 0:\n        adj_r2 = 1.0 - ((ssr / df_resid) / (tss / df_total))\n    else:\n        adj_r2 = 0.0\n\n    return {\n        \"tss\": tss,\n        \"ess\": ess,\n        \"ssr\": ssr,\n        \"r2\": float(r2),\n        \"adj_r2\": float(adj_r2),\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Adjusted $R^2$ exceeds unadjusted $R^2$, or returns a value greater than 1.0.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Confusing the total number of columns $K$ (which includes intercept) with the count of explanatory variables $p$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Set residual degrees of freedom strictly to $N - p - 1$, where $p$ is the number of regressors beyond the constant.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A macroeconomist attempts to forecast national GDP growth using a dataset of $N = 50$ quarters. She includes $p = 48$ random stock tickers in her regression and observes an astounding $R^2 = 0.985$. A colleague running a simple two-variable monetary model ($p = 2$) gets $R^2 = 0.320$. Which model is more credible for policy analysis, and what does this illustrate about $R^2$?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ جودة التوفيق ومعامل التحديد والتفكيك التبايني تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The 48-ticker model is superior because $R^2 = 0.985$ proves it captures $98.5\\%$ of true macroeconomic reality.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The two-variable model is far more credible; with $N=50$ and $p=48$, the high $R^2$ is an algebraic illusion of overfitting (since $K \\approx N$ forces the hyperplane through nearly every data point regardless of causal reality).",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Both models are equally valid because OLS is always the Best Linear Unbiased Estimator (BLUE).",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The 48-ticker model proves that stock prices cause macroeconomic GDP growth.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "gauss-markov-blue-theorem",
    "title": "The Gauss-Markov Theorem & BLUE Estimator",
    "titleAr": "مبرهنة غاوس-ماركوف وأفضل مقدر خطي غير متحيّز",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose a company wants to measure the return on employee training: how much does an extra hour of coding bootcamp increase worker...",
      "ar": "تخيل أن شركة تقنية ترغب في قياس العائد من تدريب الموظفين: كم تزيد كل ساعة تدريب إضافية في مهارات البرمجة من إنتاجية الموظف؟ لديك سجلات آلاف..."
    },
    "prerequisites": [
      "ols-residual-geometry",
      "central-limit-theorem"
    ],
    "x": 780,
    "y": 270,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GaussMarkovEfficiencyLab",
        "narrative": {
          "en": "Suppose a company wants to measure the return on employee training: *how much does an extra hour of coding bootcamp increase worker productivity?* You have thousands of employee records. There are infinite ways you could estimate this relationship. You could take the average difference between the top 10% and bottom 10%, you could draw a line through just the endpoints, or you could use Ordinary Least Squares (OLS).\n\nWhich method should you trust with real money and corporate policy?\n\nThe **Gauss-Markov Theorem** gives the definitive answer: under five classical conditions, OLS is the undisputed heavyweight champion among all linear estimators. It is **BLUE**: the **Best Linear Unbiased Estimator**.\n\nThink of an archery tournament where estimators shoot arrows at a target bullseye $\\beta$ (the true effect):\n1. **Unbiased** means accuracy without drift: if you repeat the experiment over 1,000 different samples, the average of your shots lands squarely in the center of the bullseye ($\\mathbb{E}[\\hat{\\beta}] = \\beta$). The bow is not tilted left or right.\n2. **Best (Minimum Variance)** means precision and consistency: among all archers who hit the bullseye on average, the OLS archer has the tightest, most repeatable cluster of arrows. Any alternative linear unbiased method will scatter arrows more widely.\n\nCrucially, Gauss-Markov does **not** assume errors are normally distributed! Errors can be skewed or chunky; as long as the 5 Gauss-Markov assumptions hold, OLS has the lowest possible variance. However, statistical efficiency does not guarantee causal truth: if an unobserved variable (like innate employee motivation) confounds training and productivity, the archer is aiming at the completely wrong target!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Estimator ($\\hat{\beta}$)** | A mathematical recipe or formula applied to sample data to guess a hidden truth. |\n| **Unbiasedness** | Centered on truth: the estimator does not systematically overshoot or undershoot. |\n| **Efficiency (Best)** | Tightest grouping: the lowest possible sampling variance (smallest scatter of guesses). |\n| **BLUE** | **B**est **L**inear **U**nbiased **E**stimator: the gold-standard champion among linear formulas. |\n| **Homoskedasticity** | Equal error spread: every observation has the same noise variance regardless of feature values. |\n\n```text\n    DARTBOARD ACCURACY & PRECISION:\n    \n       Biased (Off-Target)         Unbiased but Inefficient             OLS: BLUE Champion\n        (Systematic Drift)              (High Variance)             (Unbiased + Minimum Variance)\n            +-------+                      +-------+                         +-------+\n            | * *   |                      | *     |                         |       |\n            |  ***  |                      |   *   |                         |  ***  |\n            |   *   |  (Bullseye)          | * O * |  (Bullseye)             |  *O*  |  (Bullseye)\n            |       |                      |     * |                         |  ***  |\n            +-------+                      +-------+                         +-------+\n```",
          "ar": "تخيل أن شركة تقنية ترغب في قياس العائد من تدريب الموظفين: *كم تزيد كل ساعة تدريب إضافية في مهارات البرمجة من إنتاجية الموظف؟* لديك سجلات آلاف الموظفين، وهناك طرق لا حصر لها لحساب هذا الأثر: يمكنك أخذ متوسط الفروق بين أعلى وأدنى 10%، أو توصيل خط بين أول وآخر نقطة، أو استخدام طريقة المربعات الصغرى (OLS).\n\nأي هذه الطرق ينبغي الاعتماد عليها عند اتخاذ قرارات استثمارية حقيقية؟\n\nتقدم **مبرهنة غاوس-ماركوف (Gauss-Markov Theorem)** الإجابة الحاسمة: في ظل خمسة شروط قياسية، يعتبر مقدر OLS هو البطل المتوج بلا منازع بين جميع الطرق الخطية؛ فهو **BLUE** (أفضل مقدر خطي غير متحيّز).\n\nتخيل بطولة رماية بالسهام نحو الهدف المركزي $\\beta$ (الأثر الحقيقي للتدريب):\n1. **غير متحيّز (Unbiased)** تعني دقة التوجيه: إذا كررت التجربة على 1000 عينة مختلفة، فإن متوسط تسديداتك يقع تمامًا في قلب الهدف دون أي انحراف نظامي نحو اليمين أو اليسار.\n2. **الأفضل / الأدنى تباينًا (Best)** تعني إحكام التجمع: من بين جميع الرماة الذين يصيبون الهدف في المتوسط، يمتلك OLS التجمع الأكثر تماسكًا وتقاربًا للسهام.\n\nوالأمر المدهش أن مبرهنة غاوس-ماركوف **لا تشترط التوزيع الطبيعي للأخطاء**! ولكن تذكر دائمًا: الكفاءة الإحصائية لا تعني السببية؛ فلو كان هناك متغير خفي محذوف (مثل الشغف الفطري للموظف) يربط بين التدريب والإنتاجية، فإن الرامي يسدد بدقة متناهية نحو الهدف الخاطئ!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **المُقدِّر (Estimator)** | الوصفة أو القاعدة الحسابية المستخدمة لاستخراج التخمين من عينة البيانات. |\n| **عدم التحيز (Unbiasedness)** | إصابة قلب الهدف: غياب أي ميل نظامي للمبالغة بالزيادة أو النقصان عبر العينات. |\n| **الكفاءة (Efficiency)** | إحكام التسديد: الحصول على أصغر تشتت وتباين ممكن للتخمينات حول الهدف. |\n| **BLUE** | اختصار لـ \"أفضل مقدر خطي غير متحيّز\"، وهو المعيار الذهبي لجودة التقدير. |\n| **تجانس التباين (Homoskedasticity)** | ثبات التشتت: تساوي مقدار التشويش والخطأ العشوائي لجميع المشاهدات. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T (\\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}) = \\boldsymbol{\\beta} + (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\boldsymbol{\\varepsilon}",
        "formulaNote": {
          "en": "Core invariant for The Gauss-Markov Theorem & BLUE Estimator.",
          "ar": "الخاصية الرياضية الجوهرية لـ مبرهنة غاوس-ماركوف وأفضل مقدر خطي غير متحيّز."
        },
        "narrative": {
          "en": "Taking expectations conditional on $\\mathbf{X}$ establishes **unbiasedness**:\n\n$$\n\\mathbb{E}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = \\boldsymbol{\\beta} + (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}] = \\boldsymbol{\\beta}\n$$\n\nThe exact parameter variance-covariance matrix is given by:\n\n$$\n\\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T (\\sigma^2 \\mathbf{I}_N) \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1} = \\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why is OLS guaranteed to beat any alternative linear unbiased estimator?**\n   Consider any other linear estimator $\\tilde{\\boldsymbol{\\beta}} = \\mathbf{C} \\mathbf{y}$. Let $\\mathbf{C} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T + \\mathbf{D}$. For $\\tilde{\\boldsymbol{\\beta}}$ to be unbiased, we must have $\\mathbf{D}\\mathbf{X} = \\mathbf{0}$. Computing its variance yields:\n   $$\n   \\mathbb{V}[\\tilde{\\boldsymbol{\\beta}}] = \\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1} + \\sigma^2 \\mathbf{D} \\mathbf{D}^T = \\mathbb{V}[\\hat{\\boldsymbol{\\beta}}_{OLS}] + \\sigma^2 \\mathbf{D} \\mathbf{D}^T\n   $$\n   Because $\\mathbf{D} \\mathbf{D}^T$ is a positive semi-definite matrix, any non-zero $\\mathbf{D}$ strictly increases variance! OLS (where $\\mathbf{D} = \\mathbf{0}$) achieves the absolute theoretical minimum variance.\n2. **Why does unbiasedness require strict exogeneity?**\n   Notice that $\\mathbb{E}[\\hat{\\boldsymbol{\\beta}}] = \\boldsymbol{\\beta} + (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}]$. If features are correlated with errors (omitted variables or reverse causality), $\\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}] \\ne \\mathbf{0}$, biasing the estimates permanently.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\hat{\\boldsymbol{\\beta}}$: The vector of OLS estimates across $K$ parameters.\n* $s^2 = \\frac{\\mathbf{e}^T \\mathbf{e}}{N - K}$: Unbiased sample estimator of error variance $\\sigma^2$.\n* $\\mathbb{V}[\\hat{\\boldsymbol{\\beta}}] = s^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$: Estimated variance-covariance matrix of coefficients.\n* $\\text{SE}(\\hat{\\beta}_j) = \\sqrt{\\mathbb{V}[\\hat{\\boldsymbol{\\beta}}]_{jj}}$: Standard error of the $j$-th coefficient.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\sigma^2$ | تباين أخطاء المجتمع | التشتت الطبيعي الكامن غير القابل للتفسير في أخطاء الظاهرة المدروسة. |\n| $s^2$ | مقدر تباين الأخطاء العيني | تباين البواقي المحسوب من العينة مقسومًا على درجات الحرية $N-K$. |\n| $\\mathbb{V}[\\hat{\\boldsymbol{\\beta}}]$ | مصفوفة التباين والتباين المشترك | مصفوفة تقيس مدى تذبذب تقديرات المعاملات عبر العينات العشوائية. |\n| $\\text{SE}$ | الخطأ المعياري | الانحراف المعياري لتقدير المعلمة؛ كلما صغر زادت ثقتنا بدقة التقدير. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the calculation of the homoskedastic OLS parameter variance-covariance matrix, standard errors, and test statistics using vectorized NumPy operations."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gauss-markov-blue-theorem",
          "starterCode": "def compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray | float]:\n    \"\"\"\n    Computes OLS estimates, unbiased residual variance s^2, and covariance matrix.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n\n    Returns\n    -------\n    dict with keys 'beta', 's2', 'vcov', 'se', 't_stats'\n    \"\"\"\n    # Step 1: Solve for beta coefficients stably using normal equations\n    # Step 2: Compute sample residuals and unbiased error variance s^2\n    # Step 3: Compute parameter variance-covariance matrix s^2 * (X^T X)^(-1)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "len(compute_ols_vcov(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]), np.array([2.0, 3.0, 5.0, 7.0]))['se'])",
              "expected": "2"
            },
            {
              "input": "round(float(compute_ols_vcov(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]), np.array([2.0, 3.0, 5.0, 7.0]))['s2']), 4)",
              "expected": "0.15"
            },
            {
              "input": "compute_ols_vcov(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0]]), np.array([1.0, 2.0, 3.0]))['s2'] < 1e-10",
              "expected": "True"
            }
          ],
          "expectedOutput": "2",
          "variants": {
            "python": {
              "starterCode": "def compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray | float]:\n    \"\"\"\n    Computes OLS estimates, unbiased residual variance s^2, and covariance matrix.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n\n    Returns\n    -------\n    dict with keys 'beta', 's2', 'vcov', 'se', 't_stats'\n    \"\"\"\n    # Step 1: Solve for beta coefficients stably using normal equations\n    # Step 2: Compute sample residuals and unbiased error variance s^2\n    # Step 3: Compute parameter variance-covariance matrix s^2 * (X^T X)^(-1)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray | float]:\n    \"\"\"\n    Computes OLS estimates, unbiased residual variance s^2, and covariance matrix.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n\n    Returns\n    -------\n    dict with keys 'beta', 's2', 'vcov', 'se', 't_stats'\n    \"\"\"\n    n, k = X.shape\n\n    # Step 1: Solve for beta coefficients stably using normal equations\n    gram_matrix = X.T @ X\n    proj_vector = X.T @ y\n    beta = np.linalg.solve(gram_matrix, proj_vector)\n\n    # Step 2: Compute sample residuals and unbiased error variance s^2\n    residuals = y - X @ beta\n    degrees_of_freedom = n - k\n    s2 = float(np.sum(residuals ** 2) / degrees_of_freedom)\n\n    # Step 3: Compute parameter variance-covariance matrix s^2 * (X^T X)^(-1)\n    gram_inv = np.linalg.inv(gram_matrix)\n    vcov = s2 * gram_inv\n\n    # Step 4: Extract standard errors (square root of diagonal elements)\n    se = np.sqrt(np.maximum(np.diag(vcov), 0.0))\n\n    # Step 5: Compute t-statistics for hypothesis testing (t = beta / se)\n    t_stats = np.where(se > 0, beta / se, 0.0)\n\n    return {\n        \"beta\": beta,\n        \"s2\": s2,\n        \"vcov\": vcov,\n        \"se\": se,\n        \"t_stats\": t_stats,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Standard errors are negative or `NaN`.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Dividing by $N$ instead of degree-of-freedom corrected $N - K$, or non-positive-definite $(X^T X)^{-1}$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Ensure residual sum of squares is divided by `(n - k)` where `k = X.shape[1]`, then take the square root of `np.diag(vcov)`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A financial analyst is evaluating an asset pricing model. After fitting OLS, she observes that the residual errors are strongly non-normal (they exhibit heavy tails and strong positive skewness). Her manager claims: *\"Because the errors are not Gaussian, the Gauss-Markov Theorem no longer holds, and OLS is no longer the Best Linear Unbiased Estimator (BLUE).\"* Is the manager's claim correct?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ مبرهنة غاوس-ماركوف وأفضل مقدر خطي غير متحيّز تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Yes: Gauss-Markov requires identically and independently distributed normal errors to establish minimum variance.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "No: The Gauss-Markov Theorem requires only first and second conditional moments ($\\mathbb{E}[\\boldsymbol{\\varepsilon}|\\mathbf{X}]=\\mathbf{0}$ and $\\mathbb{V}[\\boldsymbol{\\varepsilon}|\\mathbf{X}]=\\sigma^2\\mathbf{I}_N$); it requires zero distributional assumptions on the shape of error distributions.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Yes: Non-normal errors immediately bias the OLS point estimates $\\hat{\\boldsymbol{\\beta}}$.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "No, but only if the sample size $N$ is greater than one million observations.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "heteroskedasticity-white-robust",
    "title": "Heteroskedasticity & The White HC0-HC3 Sandwich Estimator",
    "titleAr": "عدم تجانس التباين ومقدر الساندويتش المتين لهوايت",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose you want to predict how much money families spend eating out at restaurants based on their annual income.",
      "ar": "تخيل أنك تدرس نمط إنفاق الأسر على تناول الطعام في المطاعم بناءً على دخلها السنوي. قارن بين أسرتين مختلفتين تمامًا: أسرة محدودة الدخل تجني..."
    },
    "prerequisites": [
      "gauss-markov-blue-theorem"
    ],
    "x": 760,
    "y": 365,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "HeteroskedasticityRobustLab",
        "narrative": {
          "en": "Suppose you want to predict how much money families spend eating out at restaurants based on their annual income.\n\nConsider two very different families:\n* A low-income family earning $25,000 a year has a tight budget. They might spend between $10 and $40 a week dining out. Their spending variation is tiny and tightly clustered.\n* A high-income family earning $500,000 a year has massive discretion. Some cook simple meals at home and spend $50 a week, while others dine at Michelin-star restaurants and spend $3,000 a week! Their spending variation is enormous.\n\nWhen you plot family dining spend against income, the cloud of data points does not stay in a neat, uniform pipe. Instead, it opens up like a **megaphone** or trumpet! This unequal, fanning-out spread is called **Heteroskedasticity** (unequal variance).\n\nWhen heteroskedasticity strikes:\n1. **The Good News:** OLS regression lines $\\hat{\\beta}$ are still **unbiased**. The line still cuts right through the center of gravity of the data.\n2. **The Catastrophic News:** The textbook standard error formulas assume uniform noise variance everywhere. In a megaphone scenario, classical formulas severely underestimate uncertainty. They report artificially tiny standard errors and giant, fake $t$-statistics, tricking researchers into claiming discoveries that do not exist!\n\nIn 1980, Halbert White solved this with the famous **Sandwich Estimator**. Think of a delicious sandwich:\n* **The Outer Bread:** Two slices of $(X^T X)^{-1}$.\n* **The Inner Meat:** A filling made directly from each individual observation's actual squared error ($e_i^2$).\nBy wrapping the bread around the empirical meat, the sandwich estimator gives honest, robust standard errors without requiring you to guess the shape of the megaphone!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Homoskedasticity** | Uniform noise: every data point has the same error bounce across all feature values. |\n| **Heteroskedasticity** | The megaphone effect: error noise fans out or clusters unevenly as features change. |\n| **Sandwich Estimator** | A robust formula wrapping classical projection 'bread' around empirical error 'meat'. |\n| **HC1 / HC0** | Standard robust error corrections (HC1 adjusts for degrees of freedom $N/(N-K)$). |\n| **Type I Error Inflation** | False discovery: falsely rejecting the null hypothesis because standard errors were too narrow. |\n\n```text\n  Restaurant Spend ($)\n    ^                                                    *\n    |                                                *       *\n    |                                            *       *       *\n    |                                        *       *\n    |                                    *   *   *    (Wide Spread: $50 to $3,000)\n    |                             *  * *\n    |                       * * *\n    |                  * * (Narrow Spread: $10 to $40)\n    0-----------------+-------------------------------------------> Annual Income ($)\n                   Low Income                                 High Income\n```",
          "ar": "تخيل أنك تدرس نمط إنفاق الأسر على تناول الطعام في المطاعم بناءً على دخلها السنوي.\n\nقارن بين أسرتين مختلفتين تمامًا:\n* أسرة محدودة الدخل تجني 25,000 دولار سنويًا وتخضع لميزانية صارمة؛ يتراوح إنفاقها الأسبوعي بين 10 و 40 دولارًا. تباين إنفاقها ضئيل ومحكوم بشدة.\n* أسرة ثرية تجني 500,000 دولار سنويًا ولديها حرية مالية مطلقة؛ بعضها يفضل الطعام المنزلي وينفق 50 دولارًا أسبوعيًا، وبعضها يرتاد المطاعم الفاخرة يوميًا وينفق 3000 دولار! تباين إنفاقها شاسع ومتفجر.\n\nعند رسم البيانات، لا تنتظم النقاط في نطاق متجانس، بل تتسع كـ **المروحة أو مكبر الصوت (Megaphone)**! هذا التفاوت الشديد في تشتت الأخطاء يُعرف بـ **عدم تجانس التباين (Heteroskedasticity)**.\n\nعند حدوث عدم تجانس التباين:\n1. **الجانب المطمئن:** تظل معاملات الانحدار خط OLS **غير متحيّزة**؛ فالخط ما زال يمر عبر مركز الثقل الحقيقي للبيانات.\n2. **الجانب الكارثي:** تصبح الأخطاء المعيارية التقليدية خاطئة تمامًا؛ فهي تفترض تجانس التشتت، مما يجعلها تصغر هوامش الخطأ زيفًا وتنتج قيم $t$ متضخمة تعطي دلالة إحصائية وهمية لا وجود لها على أرض الواقع!\n\nفي عام 1980، ابتكر هالبرت هوايت **مقدر الساندويتش (Sandwich Estimator)**:\n* **شريحتا الخبز الخارجيتان:** مصفوفة الإسقاط الكلاسيكية $(X^T X)^{-1}$.\n* **حشوة اللحم الداخلية:** مبنية مباشرة من مربعات أخطاء كل مشاهدة على حدة ($e_i^2$).\nوبهذا يقدم الساندويتش أخطاء معيارية متينة وواقعية تحمي الباحثين من الانخداع الإحصائي.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **تجانس التباين (Homoskedasticity)** | ثبات التشتت: هدوء متساوٍ في التشويش العشوائي عبر جميع مستويات المتغيرات. |\n| **عدم تجانس التباين (Heteroskedasticity)** | تأثير المروحة: اتساع تشتت الأخطاء وعشوائيتها مع تغير قيم المتغير المستقل. |\n| **مقدر الساندويتش (Sandwich Estimator)** | معادلة ذكية تضع مربعات الأخطاء التجريبية كـ \"لحم\" بين شريحتي \"خبز\" مصفوفي. |\n| **تصحيح HC0 / HC1** | صيغ قياسية لحساب الأخطاء المتينة (حيث يصحح HC1 درجات الحرية $N/(N-K)$). |\n| **التضخم الإحصائي الكاذب** | ادعاء اكتشاف علاقات مؤثرة بالخطأ نتيجة صغر الأخطاء المعيارية الوهمي. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\boldsymbol{\\Omega} \\equiv \\mathbb{V}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}] = \\text{diag}(\\sigma_1^2, \\sigma_2^2, \\dots, \\sigma_N^2)",
        "formulaNote": {
          "en": "Core invariant for Heteroskedasticity & The White HC0-HC3 Sandwich Estimator.",
          "ar": "الخاصية الرياضية الجوهرية لـ عدم تجانس التباين ومقدر الساندويتش المتين لهوايت."
        },
        "narrative": {
          "en": "The true finite-sample variance of the OLS estimator is:\n\n$$\n\\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\boldsymbol{\\Omega} \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\nWhite (1980) proved that we do not need to know the individual $\\sigma_i^2$. We can replace $\\boldsymbol{\\Omega}$ with the empirical residual outer product $\\text{diag}(e_1^2, e_2^2, \\dots, e_N^2)$:\n\n$$\n\\hat{\\mathbb{V}}_{HC0}[\\hat{\\boldsymbol{\\beta}}] = (\\mathbf{X}^T \\mathbf{X})^{-1} \\left( \\sum_{i=1}^N e_i^2 \\mathbf{x}_i \\mathbf{x}_i^T \\right) (\\mathbf{X}^T \\mathbf{X})^{-1} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\text{diag}(\\mathbf{e}^2) \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\nThe finite-sample degrees-of-freedom adjusted **HC1** estimator scales HC0 by $\\frac{N}{N - K}$:\n\n$$\n\\hat{\\mathbb{V}}_{HC1}[\\hat{\\boldsymbol{\\beta}}] = \\frac{N}{N - K} \\hat{\\mathbb{V}}_{HC0}[\\hat{\\boldsymbol{\\beta}}]\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why does the sandwich structure emerge?**\n   Because $\\hat{\\boldsymbol{\\beta}} = \\boldsymbol{\\beta} + (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\boldsymbol{\\varepsilon}$, computing the variance $\\mathbb{E}[(\\hat{\\boldsymbol{\\beta}} - \\boldsymbol{\\beta})(\\hat{\\boldsymbol{\\beta}} - \\boldsymbol{\\beta})^T]$ yields:\n   $$\n   (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbb{E}[\\boldsymbol{\\varepsilon} \\boldsymbol{\\varepsilon}^T \\mid \\mathbf{X}] \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1}\n   $$\n   Under homoskedasticity, $\\mathbb{E}[\\boldsymbol{\\varepsilon} \\boldsymbol{\\varepsilon}^T] = \\sigma^2 \\mathbf{I}_N$, which pulls $\\sigma^2$ out front and cancels $\\mathbf{X}^T \\mathbf{X}$ with $(\\mathbf{X}^T \\mathbf{X})^{-1}$. But under heteroskedasticity, $\\boldsymbol{\\Omega}$ cannot be pulled out, locking the 'meat' inside the 'bread'!\n2. **Why can we substitute sample residuals $e_i^2$ for true unknown variances $\\sigma_i^2$?**\n   White proved by the Law of Large Numbers that while $e_i^2$ is a noisy estimate of an individual $\\sigma_i^2$, the averaged matrix product $\\frac{1}{N} \\sum e_i^2 \\mathbf{x}_i \\mathbf{x}_i^T$ converges in probability to $\\frac{1}{N} \\sum \\sigma_i^2 \\mathbf{x}_i \\mathbf{x}_i^T$ as $N \\to \\infty$.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\boldsymbol{\\Omega}$: Unknown true error covariance diagonal matrix.\n* $\\text{diag}(\\mathbf{e}^2)$: The empirical diagonal matrix of squared sample residuals.\n* $\\mathbf{X}^T \\text{diag}(\\mathbf{e}^2) \\mathbf{X}$: The sandwich meat summing individual error-weighted feature interactions.\n* $\\text{HC1}$: Degrees-of-freedom corrected robust variance-covariance matrix.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $(\\mathbf{X}^T \\mathbf{X})^{-1}$ | شريحتا الخبز الخارجيتان | مصفوفة الإسقاط الكلاسيكية التي تحسب حساسية المعاملات للميزات. |\n| $\\mathbf{X}^T \\text{diag}(\\mathbf{e}^2) \\mathbf{X}$ | حشوة اللحم الداخلية | مصفوفة التفاعل التجريبية الموزونة بمربعات أخطاء كل نقطة عينة. |\n| $\\text{HC0}$ | مقدر هوايت الأساسي | الصيغة التقاربية الأصلية للساندويتش (صالحة للعينات الكبيرة جدًا). |\n| $\\text{HC1}$ | مقدر ماكينون-وايت المعدل | تصحيح درجات الحرية $N/(N-K)$ لتفادي تفاؤل العينات الصغيرة. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent robust covariance matrix estimator using vectorized matrix products in NumPy."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-heteroskedasticity-white-robust",
          "starterCode": "def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes Heteroskedasticity-Consistent (White-Huber) Sandwich Standard Errors.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    hc_type : str, default 'HC1'\n        Type of robust correction ('HC0' or 'HC1').\n\n    Returns\n    -------\n    dict with keys 'beta', 'vcov', 'se'\n    \"\"\"\n    # Step 1: Solve for OLS beta coefficients\n    # Step 2: Compute sample residuals e = y - X beta\n    # Step 3: Compute the 'bread' slice: (X^T X)^(-1)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "len(compute_robust_se(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]), np.array([1.0, 3.0, 2.0, 8.0]), 'HC1')['se_robust'])",
              "expected": "2"
            },
            {
              "input": "round(float(compute_robust_se(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]), np.array([2.0, 4.0, 6.0, 8.0]), 'HC0')['se_robust'][1]), 4)",
              "expected": "0.0"
            },
            {
              "input": "compute_robust_se(np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]), np.array([1.0, 3.0, 2.0, 8.0]), 'HC1')['se_robust'][0] > 0",
              "expected": "True"
            }
          ],
          "expectedOutput": "2",
          "variants": {
            "python": {
              "starterCode": "def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes Heteroskedasticity-Consistent (White-Huber) Sandwich Standard Errors.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    hc_type : str, default 'HC1'\n        Type of robust correction ('HC0' or 'HC1').\n\n    Returns\n    -------\n    dict with keys 'beta', 'vcov', 'se'\n    \"\"\"\n    # Step 1: Solve for OLS beta coefficients\n    # Step 2: Compute sample residuals e = y - X beta\n    # Step 3: Compute the 'bread' slice: (X^T X)^(-1)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2"
            }
          },
          "solution": "import numpy as np\n\ndef compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes Heteroskedasticity-Consistent (White-Huber) Sandwich Standard Errors.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    hc_type : str, default 'HC1'\n        Type of robust correction ('HC0' or 'HC1').\n\n    Returns\n    -------\n    dict with keys 'beta', 'vcov', 'se'\n    \"\"\"\n    n, k = X.shape\n\n    # Step 1: Solve for OLS beta coefficients\n    gram_matrix = X.T @ X\n    beta = np.linalg.solve(gram_matrix, X.T @ y)\n\n    # Step 2: Compute sample residuals e = y - X beta\n    residuals = y - X @ beta\n\n    # Step 3: Compute the 'bread' slice: (X^T X)^(-1)\n    bread = np.linalg.inv(gram_matrix)\n\n    # Step 4: Compute the 'meat' core: X^T diag(e^2) X\n    # Vectorized computation: scale each row of X by squared residual\n    meat = X.T @ (residuals[:, np.newaxis] ** 2 * X)\n\n    # Step 5: Assemble the HC0 sandwich: Bread @ Meat @ Bread\n    vcov_hc0 = bread @ meat @ bread\n\n    # Step 6: Apply degrees-of-freedom correction if HC1 requested\n    if hc_type.upper() == \"HC0\":\n        vcov = vcov_hc0\n    elif hc_type.upper() == \"HC1\":\n        df_correction = n / (n - k)\n        vcov = df_correction * vcov_hc0\n    else:\n        raise ValueError(f\"Unsupported HC type: {hc_type}\")\n\n    # Step 7: Extract robust standard errors from diagonal\n    se = np.sqrt(np.maximum(np.diag(vcov), 0.0))\n\n    return {\n        \"beta\": beta,\n        \"vcov\": vcov,\n        \"se\": se,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Memory allocation error or slow loop when building the meat matrix.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Creating an explicit $N \\times N$ diagonal matrix via `np.diag(e**2)` consumes $O(N^2)$ memory and scales quadratically.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Use memory-efficient vector broadcasting: `X_scaled = X * e[:, None]; meat = X_scaled.T @ X_scaled`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "An empirical researcher estimates the impact of CEO compensation on firm innovation using a cross-section of Fortune 500 corporations. The default textbook OLS standard error yields $t = 3.42$ ($p = 0.0006$, labeled as highly significant with three stars). However, when recalculating with White HC1 robust standard errors, the standard error triples, yielding $t = 1.14$ ($p = 0.254$). What empirical phenomenon explains this collapse in significance, and which result should be published?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ عدم تجانس التباين ومقدر الساندويتش المتين لهوايت تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The default standard errors should be kept because they yield a statistically significant discovery.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The regression suffers from severe heteroskedasticity (likely driven by huge variation among mega-cap firms); the default errors were artificially deflated, and the researcher must publish the HC1 robust standard error showing no statistically significant effect.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The discrepancy proves that the OLS coefficients $\\hat{\\boldsymbol{\\beta}}$ are biased and invalid.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Heteroskedasticity only affects time series models, so this finding is a coding bug.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "multiple-regression-matrix-calculus",
    "title": "Multiple Regression Algebra & Matrix Calculus",
    "titleAr": "جبر الانحدار المتعدد وحسبان المصفوفات",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose an HR department wants to predict employee salary using two features simultaneously: Years of Education ($X1$) and Years of Work...",
      "ar": "تخيل أن قسم الموارد البشرية في شركة يسعى للتنبؤ برواتب الموظفين بالاعتماد على ميزتين معًا: سنوات التعليم ($X1$) وسنوات الخبرة العملية..."
    },
    "prerequisites": [
      "ols-residual-geometry",
      "matrix-multiplication-composition"
    ],
    "x": 780,
    "y": 460,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "MultivariatePlaneVifLab",
        "narrative": {
          "en": "Suppose an HR department wants to predict employee salary using two features simultaneously: **Years of Education** ($X_1$) and **Years of Work Experience** ($X_2$).\n\nIf you look at education alone, you might notice that older workers with 20 years of experience often have master's degrees and earn high salaries. Does the master's degree cause the higher salary, or does the 20 years of experience explain it? To answer this, you cannot simply look at one feature in isolation; you must hold experience constant while adjusting the education dial.\n\nThis is the power of **Multiple Linear Regression**. Instead of fitting a 2D line on a flat sheet of paper, your regression fits a **2D flat plane suspended in 3D space**.\n\nUnder the hood, multiple regression relies on two magical geometric matrices:\n1. **The Hat Matrix ($\\mathbf{P}$)**: Like putting a hat on $\\mathbf{y}$, it projects high-dimensional outcomes onto the flat plane spanned by all your features ($\\hat{\\mathbf{y}} = \\mathbf{P}\\mathbf{y}$). It is the camera that takes a snapshot of reality and flattens it onto your model's plane.\n2. **The Annihilator Matrix ($\\mathbf{M}$)**: The residual maker ($\\mathbf{M} = \\mathbf{I} - \\mathbf{P}$). It completely annihilates and wipes out any feature already in the model ($\\mathbf{M}\\mathbf{X} = \\mathbf{0}$), leaving behind only the pure, orthogonal residual noise ($\\mathbf{e} = \\mathbf{M}\\mathbf{y}$).\n\nGeometrically, the Annihilator Matrix strips away everything your existing features can explain, isolating the clean, uncontaminated variation needed to test new hypotheses.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Multiple Regression** | Fitting a plane or hyperplane to explain an outcome using multiple features at once. |\n| **Hat Matrix ($\\mathbf{P}$)** | The projection lens: transforms raw outcomes $\\mathbf{y}$ into model predictions $\\hat{\\mathbf{y}}$. |\n| **Annihilator Matrix ($\\mathbf{M}$)** | The residual maker: completely erases the influence of existing features ($\\mathbf{M}\\mathbf{X} = \\mathbf{0}$). |\n| **Idempotence** | Repeating the projection changes nothing: $\\mathbf{P}\\mathbf{P} = \\mathbf{P}$ and $\\mathbf{M}\\mathbf{M} = \\mathbf{M}$. |\n| **Ceteris Paribus** | 'All else held equal': interpreting one coefficient while holding all other features fixed. |\n\n```text\n       y (Actual Salary Vector)\n       ^\n       |          |    \\  e = M y (Perpendicular Residual Pole, 90 deg to plane)\n       |            |      v\n       +-------+--------------------------->\n      /       / y_hat = P y (Fitted Shadow on the Plane)\n     /       /\n    / col(X) Plane (Education and Experience Subspace)\n   +--------------------------------------->\n```",
          "ar": "تخيل أن قسم الموارد البشرية في شركة يسعى للتنبؤ برواتب الموظفين بالاعتماد على ميزتين معًا: **سنوات التعليم** ($X_1$) و**سنوات الخبرة العملية** ($X_2$).\n\nإذا نظرت إلى التعليم بمفرده، ستجد أن الموظفين الأكبر سنًا الذين يملكون 20 عامًا من الخبرة يحملون غالبًا شهادات عليا ويتقاضون رواتب مرتفعة. فهل الشهادة العليا هي سبب الراتب المرتفع، أم أن خبرة الـ 20 عامًا هي المحرك الأساسي؟ لعزل الأثر الحقيقي، لا يمكنك فحص كل ميزة بمعزل عن الأخرى، بل يجب تثبيت الخبرة تمامًا عند تحريك مؤشر التعليم.\n\nهذه هي القوة الجوهرية لـ **الانحدار الخطي المتعدد (Multiple Regression)**؛ فبدلاً من رسم خط على ورقة ثنائية الأبعاد، يقوم النموذج بمد **مستوى مائل ثنائي الأبعاد داخل فضاء ثلاثي الأبعاد**.\n\nويعتمد هذا الإسقاط على مصفوفتين هندسيتين أساسيتين:\n1. **مصفوفة القبعة (Hat Matrix - $\\mathbf{P}$):** تسقط المتجه الحقيقي $\\mathbf{y}$ مباشرة على المستوى الذي تشكله الميزات ($\\hat{\\mathbf{y}} = \\mathbf{P}\\mathbf{y}$).\n2. **مصفوفة الإبادة والتصفية (Annihilator Matrix - $\\mathbf{M}$):** صانعة البواقي ($\\mathbf{M} = \\mathbf{I} - \\mathbf{P}$)؛ حيث تقوم بإبادة ومحو أي أثر للميزات القديمة تمامًا ($\\mathbf{M}\\mathbf{X} = \\mathbf{0}$)، عازلةً بواقي الأخطاء النقية المتعامدة.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **الانحدار المتعدد** | تركيب مستوى أو فضاء فائق لتفسير ظاهرة باستخدام عدة متغيرات في آن واحد. |\n| **مصفوفة القبعة ($\\mathbf{P}$)** | عدسة الإسقاط: تحول القيم الفعلية للهدف $\\mathbf{y}$ إلى قيم مقدرة $\\hat{\\mathbf{y}}$. |\n| **مصفوفة الإبادة ($\\mathbf{M}$)** | صانعة البواقي: تمحو تمامًا أثر المتغيرات السابقة من أي متجه ($\\mathbf{M}\\mathbf{X} = \\mathbf{0}$). |\n| **الصمود التكراري (Idempotence)** | خاصية رياضية تعني أن تكرار الإسقاط لا يغير النتيجة: $\\mathbf{P}^2 = \\mathbf{P}$. |\n| **مع بقاء العوامل الأخرى ثابتة** | المبدأ التفسيري لعزل أثر متغير واحد مع تثبيت كافة المتغيرات الأخرى. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}",
        "formulaNote": {
          "en": "Core invariant for Multiple Regression Algebra & Matrix Calculus.",
          "ar": "الخاصية الرياضية الجوهرية لـ جبر الانحدار المتعدد وحسبان المصفوفات."
        },
        "narrative": {
          "en": "The OLS projection (Hat) matrix $\\mathbf{P}_X$ and residual maker (Annihilator) matrix $\\mathbf{M}_X$ are defined as:\n\n$$\n\\mathbf{P}_X = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T, \\quad \\mathbf{M}_X = \\mathbf{I}_N - \\mathbf{P}_X = \\mathbf{I}_N - \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T\n$$\n\nFitted values and residual vectors are pure linear transformations of $\\mathbf{y}$:\n\n$$\n\\hat{\\mathbf{y}} = \\mathbf{P}_X \\mathbf{y}, \\quad \\mathbf{e} = \\mathbf{M}_X \\mathbf{y}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why is $\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$ called the Annihilator?**\n   Expanding the product:\n   $$\n   \\mathbf{M}_X \\mathbf{X} = (\\mathbf{I}_N - \\mathbf{P}_X)\\mathbf{X} = \\mathbf{X} - \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{X} = \\mathbf{X} - \\mathbf{X} \\mathbf{I}_K = \\mathbf{0}\n   $$\n   The Annihilator matrix literally destroys any vector that lives in the column space of $\\mathbf{X}$!\n2. **Why are $\\mathbf{P}_X$ and $\\mathbf{M}_X$ idempotent ($\\mathbf{P}^2 = \\mathbf{P}$)?**\n   Once you drop a plumb line from a point in space onto the floor, the point is already on the floor. Dropping a second plumb line from that floor position does not move it anywhere:\n   $$\n   \\mathbf{P}_X \\mathbf{P}_X = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} (\\mathbf{X}^T \\mathbf{X}) (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T = \\mathbf{P}_X\n   $$\n3. **Trace and Degrees of Freedom:**\n   The rank and trace of $\\mathbf{P}_X$ equal the number of parameters $K$. The rank and trace of $\\mathbf{M}_X$ equal $N - K$, proving that the residual subspace has dimension $N - K$.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\mathbf{P}_X \\in \\mathbb{R}^{N \\times N}$: Symmetric, idempotent projection matrix of rank $K$.\n* $\\mathbf{M}_X \\in \\mathbb{R}^{N \\times N}$: Symmetric, idempotent annihilator matrix of rank $N - K$.\n* $\\hat{\\mathbf{y}} = \\mathbf{P}_X \\mathbf{y} \\in \\text{col}(\\mathbf{X})$: Orthogonal projection of outcome vector onto feature space.\n* $\\mathbf{e} = \\mathbf{M}_X \\mathbf{y} \\in \\text{col}(\\mathbf{X})^\\perp$: Residual vector residing in the orthogonal complement space.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\mathbf{P}_X$ | مصفوفة القبعة | مصفوفة متماثلة وذات صمود تكراري تسقط البيانات على فضاء أعمدة $\\mathbf{X}$. |\n| $\\mathbf{M}_X$ | مصفوفة الإبادة | مصفوفة تحذف كل ما يمكن للميزات تفسيره لتستخرج بواقي الأخطاء النقية. |\n| $\\text{tr}(\\mathbf{P}_X)$ | أثر مصفوفة الإسقاط | يساوي رتبتها الهندسية $K$، وهو عدد المعالم المقدرة في النموذج. |\n| $\\text{tr}(\\mathbf{M}_X)$ | أثر مصفوفة الإبادة | يساوي $N - K$، وهو عدد درجات الحرية المتبقية لتقدير تباين الأخطاء. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement a function that computes the hat matrix $\\mathbf{P}_X$ and the residual annihilator matrix $\\mathbf{M}_X$, and numerically confirms their idempotent and orthogonality properties."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-multiple-regression-matrix-calculus",
          "starterCode": "def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the Hat (Projection) Matrix P and Annihilator Matrix M.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors with full column rank.\n\n    Returns\n    -------\n    tuple of (P, M) where:\n        P : np.ndarray of shape (N, N) is the projection matrix\n        M : np.ndarray of shape (N, N) is the annihilator matrix\n    \"\"\"\n    # Step 1: Compute the Gram matrix X^T X and its inverse\n    # Step 2: Form the Hat (Projection) matrix P = X (X^T X)^(-1) X^T\n    # Step 3: Form the Annihilator matrix M = I_N - P\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "P, M = compute_projection_and_annihilator(np.array([[1.0], [1.0]])); round(float(np.trace(P)), 4)",
              "expected": "1.0"
            },
            {
              "input": "P, M = compute_projection_and_annihilator(np.array([[1.0, 0.0], [1.0, 1.0], [1.0, 2.0]])); round(float(np.trace(M)), 4)",
              "expected": "1.0"
            },
            {
              "input": "P, M = compute_projection_and_annihilator(np.array([[1.0], [2.0], [3.0]])); np.allclose(P @ M, np.zeros((3, 3)), atol=1e-7)",
              "expected": "True"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the Hat (Projection) Matrix P and Annihilator Matrix M.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors with full column rank.\n\n    Returns\n    -------\n    tuple of (P, M) where:\n        P : np.ndarray of shape (N, N) is the projection matrix\n        M : np.ndarray of shape (N, N) is the annihilator matrix\n    \"\"\"\n    # Step 1: Compute the Gram matrix X^T X and its inverse\n    # Step 2: Form the Hat (Projection) matrix P = X (X^T X)^(-1) X^T\n    # Step 3: Form the Annihilator matrix M = I_N - P\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the Hat (Projection) Matrix P and Annihilator Matrix M.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors with full column rank.\n\n    Returns\n    -------\n    tuple of (P, M) where:\n        P : np.ndarray of shape (N, N) is the projection matrix\n        M : np.ndarray of shape (N, N) is the annihilator matrix\n    \"\"\"\n    n, k = X.shape\n\n    # Step 1: Compute the Gram matrix X^T X and its inverse\n    gram_matrix = X.T @ X\n    gram_inv = np.linalg.inv(gram_matrix)\n\n    # Step 2: Form the Hat (Projection) matrix P = X (X^T X)^(-1) X^T\n    P = X @ gram_inv @ X.T\n\n    # Step 3: Form the Annihilator matrix M = I_N - P\n    identity_n = np.eye(n)\n    M = identity_n - P\n\n    return P, M"
        },
        "hints": {
          "tier1": {
            "en": "Matrix multiplication `M @ X` does not evaluate to zero.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Inverting before multiplying by $X$ or transposing $X$ incorrectly in the outer product.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Follow the exact hat matrix formulation: `X @ np.linalg.inv(X.T @ X) @ X.T`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "An empirical economist specifies a wage equation with four mutually exclusive education categories: `No_HighSchool`, `HighSchool`, `College`, `GraduateDegree`. In addition to all four indicators, she includes a constant intercept column of ones ($\\boldsymbol{\\iota}_N$). When running the regression, her Python script crashes with `numpy.linalg.LinAlgError: Singular matrix`. What structural error occurred, and how does matrix calculus resolve it?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ جبر الانحدار المتعدد وحسبان المصفوفات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The sample size was too small, causing the Hessian matrix to become negative definite.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The columns suffer from the \"Dummy Variable Trap\" (perfect multicollinearity): the four indicator columns sum exactly to the intercept ($\\sum_{j=1}^4 \\mathbf{d}_j = \\boldsymbol{\\iota}_N$), violating the full rank assumption and making $\\mathbf{X}^T \\mathbf{X}$ non-invertible. The fix is to omit one baseline category or drop the constant.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The error means education has no causal effect on wages.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The regression must be converted to non-linear neural networks to invert singular matrices.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "frisch-waugh-lovell-theorem",
    "title": "The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out",
    "titleAr": "مبرهنة فريش-وو-لوفيل والتجريد الجزئي للمتغيرات",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose an economist is studying the gender wage gap at a technology firm. The raw data shows male engineers earn $15,000 more on average...",
      "ar": "تخيل باحثًا اقتصاديًا يدرس فجوة الرواتب بين الجنسين في شركة تكنولوجيا. تظهر البيانات الأولية أن المهندسين الذكور يتقاضون في المتوسط 15,000..."
    },
    "prerequisites": [
      "multiple-regression-matrix-calculus",
      "four-fundamental-subspaces"
    ],
    "x": 760,
    "y": 555,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "FWLPartiallingOutLab",
        "narrative": {
          "en": "Suppose an economist is studying the gender wage gap at a technology firm. The raw data shows male engineers earn $15,000 more on average than female engineers. But critics immediately object: *\"Wait! Men in this dataset have an average of 8 years of tenure, while women have an average of 4 years because the company only recently expanded hiring. Is the gap driven by discrimination, or simply by tenure?\"*\n\nTo isolate the pure effect of gender holding tenure constant, you could run a multiple regression with both variables. But the celebrated **Frisch-Waugh-Lovell (FWL) Theorem** reveals an astonishing 3-step 'cleansing' procedure that achieves the exact same answer:\n\n1. **Clean Salary:** Regress salary on tenure alone and take the residuals. This gives the *cleansed salary*—the variation in pay that has nothing to do with tenure.\n2. **Clean Gender:** Regress gender on tenure and take the residuals. This gives *cleansed gender*—the variation in gender that is completely unrelated to tenure.\n3. **The Payoff:** Run a simple bivariate regression of cleansed salary on cleansed gender!\n\nThe slope of this bivariate regression is **mathematically identical to the multiple regression coefficient**!\n\nFWL proves that multiple regression is not a black box: every coefficient in a multiple regression is simply a simple bivariate regression after all other variables have been purged ('partialled out') from both the feature and the outcome!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Partialling Out** | Scrubbing away the influence of confounding variables to isolate clean residual variance. |\n| **FWL Theorem** | The proof that multiple regression coefficients equal bivariate slopes on purged residuals. |\n| **Auxiliary Regression** | A behind-the-scenes regression of one feature on all other features. |\n| **Residualized Feature** | The pure, unique part of a feature that cannot be predicted by other features. |\n| **Net Effect** | The isolated causal or predictive impact after stripping all competing explanations. |\n\n```text\n    THE 3-STEP FWL CLEANSING PIPELINE:\n\n[ Raw Salary (y) ] -------- Regress on Tenure (X2) -------> [ Clean Salary (e_y) ]\n                                                                       |\n                                                               (Simple Bivariate\n                                                                  Regression)\n                                                                       v\n    [ Raw Gender (X1) ] ------- Regress on Tenure (X2) -------> [ Clean Gender (e_X1) ]\n                                                                       |\n                                                             Slope = beta_1 (Exact!)\n```",
          "ar": "تخيل باحثًا اقتصاديًا يدرس فجوة الرواتب بين الجنسين في شركة تكنولوجيا. تظهر البيانات الأولية أن المهندسين الذكور يتقاضون في المتوسط 15,000 دولار سنويًا أكثر من الإناث. ولكن يعترض البعض فورًا: *\"مهلاً! متوسط سنوات أقدمية الذكور في الشركة 8 سنوات، بينما متوسط أقدمية الإناث 4 سنوات بسبب توسع التوظيف حديثًا. فهل الفجوة ناتجة عن التمييز أم عن سنوات الخبرة والأقدمية؟\"*\n\nلعزل الأثر الصافي للجنس مع تثبيت الأقدمية، يمكن تشغيل انحدار متعدد. لكن **مبرهنة فريش-وو-لوفيل (FWL Theorem)** الشهيرة تكشف عن آلية عبقرية من 3 خطوات تنقية تعطي النتيجة ذاتها بالضبط:\n\n1. **تنقية الراتب:** نقوم بانحدار الراتب على سنوات الأقدمية ونستخرج البواقي. هذا هو *الراتب المنقى* من أي أثر للأقدمية.\n2. **تنقية متغير الجنس:** نقوم بانحدار متغير الجنس على سنوات الأقدمية ونستخرج البواقي. هذا هو *الجنس المنقى* الخالي من أي ارتباط بالأقدمية.\n3. **حساب الأثر الصافي:** نجري انحدارًا بسيطًا بين الراتب المنقى والجنس المنقى!\n\nميل هذا الخط البسيط **يتطابق رياضيًا بنسبة 100% مع معامل الانحدار المتعدد المعقد**!\n\nتثبت مبرهنة FWL أن الانحدار المتعدد ليس صندوقًا أسود غامضًا، بل هو في جوهره انحدار بسيط بين متغيرات تم تطهيرها وتنقية شوائبها من أثر بقية المتغيرات المشتركة.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **التنقية والعزل (Partialling Out)** | غسل المتغير وتطهيره من تأثيرات المتغيرات المربكة الأخرى لاستخراج تباينه النقي. |\n| **مبرهنة FWL** | برهان رياضي يثبت أن معاملات الانحدار المتعدد تكافئ ميل انحدار بسيط للبواقي المنقاة. |\n| **الانحدار المساعد (Auxiliary Regression)** | انحدار تحضيري داخلي لمتغير مستقل على بقية المتغيرات المستقلة الأخرى. |\n| **المتغير المتبقي المنقى** | الجزء الصافي الفريد من المتغير الذي لا تستطيع المتغيرات الأخرى التنبؤ به. |\n| **الأثر الصافي (Net Effect)** | القوة التفسيرية الحقيقية للمتغير بعد استبعاد وتجريد كل التفسيرات البديلة. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y} = \\mathbf{X}_1 \\boldsymbol{\\beta}_1 + \\mathbf{X}_2 \\boldsymbol{\\beta}_2 + \\boldsymbol{\\varepsilon}",
        "formulaNote": {
          "en": "Core invariant for The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out.",
          "ar": "الخاصية الرياضية الجوهرية لـ مبرهنة فريش-وو-لوفيل والتجريد الجزئي للمتغيرات."
        },
        "narrative": {
          "en": "Let $\\mathbf{M}_2 = \\mathbf{I}_N - \\mathbf{X}_2(\\mathbf{X}_2^T \\mathbf{X}_2)^{-1}\\mathbf{X}_2^T$ be the annihilator matrix for $\\mathbf{X}_2$. Pre-multiplying the entire equation by $\\mathbf{M}_2$:\n\n$$\n\\mathbf{M}_2 \\mathbf{y} = \\mathbf{M}_2 \\mathbf{X}_1 \\boldsymbol{\\beta}_1 + \\mathbf{M}_2 \\mathbf{X}_2 \\boldsymbol{\\beta}_2 + \\mathbf{M}_2 \\boldsymbol{\\varepsilon}\n$$\n\nBecause $\\mathbf{M}_2 \\mathbf{X}_2 = \\mathbf{0}$, the second term vanishes completely:\n\n$$\n\\tilde{\\mathbf{y}} = \\tilde{\\mathbf{X}}_1 \\boldsymbol{\\beta}_1 + \\tilde{\\boldsymbol{\\varepsilon}} \\implies \\hat{\\boldsymbol{\\beta}}_1 = (\\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{X}}_1)^{-1} \\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{y}}\n$$\n\nwhere $\\tilde{\\mathbf{y}} = \\mathbf{M}_2 \\mathbf{y}$ and $\\tilde{\\mathbf{X}}_1 = \\mathbf{M}_2 \\mathbf{X}_1$ are the residual vectors obtained by regressing $\\mathbf{y}$ and $\\mathbf{X}_1$ on $\\mathbf{X}_2$.\n\n### Why the Math Works Step-by-Step\n\n1. **Why does the Annihilator isolate $\\boldsymbol{\\beta}_1$?**\n   Because $\\mathbf{M}_2$ projects every column of $\\mathbf{X}_2$ onto zero, it strips away any variation in $\\mathbf{y}$ and $\\mathbf{X}_1$ that can be linearly predicted by $\\mathbf{X}_2$. What remains in $\\tilde{\\mathbf{X}}_1$ is the unique, orthogonal variation of $\\mathbf{X}_1$ independent of $\\mathbf{X}_2$.\n2. **Equivalence of residuals:**\n   The residuals from the bivariate regression of $\\tilde{\\mathbf{y}}$ on $\\tilde{\\mathbf{X}}_1$ are mathematically identical to the full multiple regression residuals $\\mathbf{e} = \\mathbf{y} - \\mathbf{X}_1\\hat{\\boldsymbol{\\beta}}_1 - \\mathbf{X}_2\\hat{\\boldsymbol{\\beta}}_2$.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\mathbf{X}_1$: Regressors of interest (e.g., policy treatment or gender).\n* $\\mathbf{X}_2$: Matrix of control covariates (e.g., tenure, age, education).\n* $\\mathbf{M}_2$: Annihilator matrix projecting onto the orthogonal complement of $\\text{col}(\\mathbf{X}_2)$.\n* $\\tilde{\\mathbf{X}}_1 = \\mathbf{M}_2 \\mathbf{X}_1$: Residualized regressors purged of all collinearity with $\\mathbf{X}_2$.\n* $\\tilde{\\mathbf{y}} = \\mathbf{M}_2 \\mathbf{y}$: Residualized outcome purged of all variation explained by $\\mathbf{X}_2$.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\mathbf{X}_1$ | المتغير محل الاهتمام | المتغير الذي نريد دراسة أثره الصافي المعزول (مثل برنامج التدريب أو الجنس). |\n| $\\mathbf{X}_2$ | مصفوفة المتغيرات الضابطة | العوامل المربكة التي نريد تحييدها وتثبيتها (مثل العمر وسنوات الأقدمية). |\n| $\\mathbf{M}_2$ | مصفوفة عزل المتغيرات الضابطة | المشغل الرياضي الذي يبيد تمامًا أثر المتغيرات $\\mathbf{X}_2$ من أي متجه يضربه. |\n| $\\tilde{\\mathbf{X}}_1$ | المتغير المنقى | التباين الفريد النقي لـ $\\mathbf{X}_1$ الذي لا تشترك فيه إطلاقًا مع $\\mathbf{X}_2$. |\n| $\\tilde{\\mathbf{y}}$ | النتيجة المنقاة | تباين الهدف الصافي بعد تجريده من أثر المتغيرات الضابطة $\\mathbf{X}_2$. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the three-step Frisch-Waugh-Lovell partialling out algorithm and verify that it produces coefficients identical to the full multiple regression."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-frisch-waugh-lovell-theorem",
          "starterCode": "def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray | float]:\n    \"\"\"\n    Implements the Frisch-Waugh-Lovell (FWL) partialling-out theorem.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Target outcome vector.\n    X1 : np.ndarray of shape (N, K1)\n        Regressors of primary interest.\n    X2 : np.ndarray of shape (N, K2)\n        Control covariates to partial out.\n\n    Returns\n    -------\n    dict with keys 'beta_1', 'residuals_1', 'y_tilde', 'X1_tilde'\n    \"\"\"\n    # Step 1: Form the Annihilator matrix M2 = I - X2 (X2^T X2)^(-1) X2^T\n    # Step 2: Purge the control covariates from target y: y_tilde = M2 y\n    # Step 3: Purge the control covariates from regressors X1: X1_tilde = M2 X1\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "b_partial, b_full = fwl_partial_regression(np.array([2.0, 3.0, 5.0, 7.0]), np.array([[1.0], [2.0], [3.0], [4.0]]), np.ones((4, 1))); round(float(b_partial[0]), 4) == round(float(b_full[0]), 4)",
              "expected": "True"
            },
            {
              "input": "b_partial, b_full = fwl_partial_regression(np.array([4.0, 6.0, 9.0]), np.array([[1.0], [3.0], [5.0]]), np.array([[2.0], [1.0], [4.0]])); round(float(b_partial[0] - b_full[0]), 6)",
              "expected": "0.0"
            },
            {
              "input": "b_p, b_f = fwl_partial_regression(np.array([10.0, 20.0, 30.0]), np.array([[1.0], [2.0], [3.0]]), np.array([[5.0], [5.0], [5.0]])); round(float(b_p[0]), 4)",
              "expected": "10.0"
            }
          ],
          "expectedOutput": "True",
          "variants": {
            "python": {
              "starterCode": "def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray | float]:\n    \"\"\"\n    Implements the Frisch-Waugh-Lovell (FWL) partialling-out theorem.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Target outcome vector.\n    X1 : np.ndarray of shape (N, K1)\n        Regressors of primary interest.\n    X2 : np.ndarray of shape (N, K2)\n        Control covariates to partial out.\n\n    Returns\n    -------\n    dict with keys 'beta_1', 'residuals_1', 'y_tilde', 'X1_tilde'\n    \"\"\"\n    # Step 1: Form the Annihilator matrix M2 = I - X2 (X2^T X2)^(-1) X2^T\n    # Step 2: Purge the control covariates from target y: y_tilde = M2 y\n    # Step 3: Purge the control covariates from regressors X1: X1_tilde = M2 X1\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray | float]:\n    \"\"\"\n    Implements the Frisch-Waugh-Lovell (FWL) partialling-out theorem.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Target outcome vector.\n    X1 : np.ndarray of shape (N, K1)\n        Regressors of primary interest.\n    X2 : np.ndarray of shape (N, K2)\n        Control covariates to partial out.\n\n    Returns\n    -------\n    dict with keys 'beta_1', 'residuals_1', 'y_tilde', 'X1_tilde'\n    \"\"\"\n    # Step 1: Form the Annihilator matrix M2 = I - X2 (X2^T X2)^(-1) X2^T\n    n = len(y)\n    M2 = np.eye(n) - X2 @ np.linalg.inv(X2.T @ X2) @ X2.T\n\n    # Step 2: Purge the control covariates from target y: y_tilde = M2 y\n    y_tilde = M2 @ y\n\n    # Step 3: Purge the control covariates from regressors X1: X1_tilde = M2 X1\n    X1_tilde = M2 @ X1\n\n    # Step 4: Run simple regression of y_tilde on X1_tilde to get beta_1\n    beta_1 = np.linalg.solve(X1_tilde.T @ X1_tilde, X1_tilde.T @ y_tilde)\n\n    # Step 5: Compute clean residuals\n    residuals_1 = y_tilde - X1_tilde @ beta_1\n\n    return {\n        \"beta_1\": beta_1 if beta_1.ndim > 0 and len(beta_1) > 1 else float(beta_1.squeeze()),\n        \"residuals_1\": residuals_1,\n        \"y_tilde\": y_tilde,\n        \"X1_tilde\": X1_tilde,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Partial slope `beta_1_fwl` does not match the full regression coefficient `beta_1_full`.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Failing to project BOTH the dependent variable $y$ and the primary regressor $X_1$ onto the orthogonal complement of $X_2$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Apply the annihilator matrix $M_{X_2}$ to both $y$ and $X_1$ before running the second-stage regression.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A labor economist estimates the gender wage gap by regressing log wages on a female indicator while controlling for detailed occupation fixed effects and cumulative job experience. A critic argues: *\"Your regression is completely meaningless because women and men do not work in the same occupations, so you cannot compare them.\"* How does the FWL theorem refute or clarify this critique?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ مبرهنة فريش-وو-لوفيل والتجريد الجزئي للمتغيرات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The critic is correct because OLS cannot handle discrete categorical controls.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The FWL theorem proves that the coefficient on the female indicator is estimated strictly using the within-occupation variation that remains after purging occupation and experience differences ($\\tilde{\\mathbf{X}}_1$); it compares men and women who share the same occupation and experience.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "FWL proves that controlling for occupation automatically eliminates all omitted variable bias across the economy.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The critic is correct because partialling out changes the sign of the true causal effect.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "omitted-variable-bias-formula",
    "title": "The Omitted Variable Bias (OVB) Formula & The Directional Bias Matrix",
    "titleAr": "صيغة انحياز المتغير المغفَل ومصفوفة تحديد اتجاه الانحياز",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine an economist measuring the financial return of an MBA degree: how much does earning an MBA increase future salary? You collect...",
      "ar": "تخيل باحثًا اقتصاديًا يقيس العائد المالي للحصول على درجة الماجستير في إدارة الأعمال (MBA): كم تزيد هذه الشهادة من الراتب السنوي؟ تجمع..."
    },
    "prerequisites": [
      "multiple-regression-matrix-calculus"
    ],
    "x": 780,
    "y": 650,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "OmittedVariableBiasCanvas",
        "narrative": {
          "en": "Imagine an economist measuring the financial return of an MBA degree: *how much does earning an MBA increase future salary?*\n\nYou collect survey data on 5,000 corporate professionals, run a simple regression of salary on MBA completion, and discover a massive coefficient: +$45,000 per year! You are tempted to conclude that getting an MBA causes your salary to surge by $45,000.\n\nBut consider **Unobserved Drive & Ambition**. People who spend years studying for exams, applying to elite business schools, and networking late into the night possess exceptional natural drive. Even if they had never set foot in business school, their sheer ambition and work ethic would have propelled them into executive roles and earned them substantial salaries anyway!\n\nWhen you omit ambition from the regression, the MBA variable does not just capture the value of the degree; it acts as a magnet, soaking up the unmeasured credit for the person's innate drive. This distortion is **Omitted Variable Bias (OVB)**.\n\nThe celebrated OVB formula shows that the bias equals two distinct ingredients multiplied together:\n$$\\text{Bias} = (\\text{Impact of Ambition on Salary}) \\times (\\text{Relationship between Ambition and MBA})$$\nIf both are positive, your simple regression produces a massively exaggerated, upward-biased estimate.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Omitted Variable Bias (OVB)** | Credit theft: when an unmeasured factor distorts the coefficient of an included feature. |\n| **Confounder ($Z$)** | A hidden third variable that influences both the treatment and the final outcome. |\n| **Short Regression** | The naive, incomplete model leaving out the crucial confounder. |\n| **Long Regression** | The complete, ideal model containing both the treatment and the confounder. |\n| **Upward / Downward Bias** | Overestimating (upward) or underestimating (downward) the true causal impact. |\n\n```text\n    THE CAUSAL TRIANGLE (OVB):\n\nUnobserved Ambition (Z)\n              /              \\\n             / (+)            \\ (+)\n            v                  v\n     MBA Degree (X) ---------> Salary (y)\n                   True Effect: beta_1\n             (Naive Estimate absorbs Z's effect!)\n```",
          "ar": "تخيل باحثًا اقتصاديًا يقيس العائد المالي للحصول على درجة الماجستير في إدارة الأعمال (MBA): *كم تزيد هذه الشهادة من الراتب السنوي؟*\n\nتجمع بيانات 5,000 موظف، وتجري انحدارًا بسيطًا للراتب على حصول الموظف على الشهادة، فتجد نتيجة مذهلة: زيادة قدرها 45,000 دولار سنويًا! قد تتسرع وتعلن أن الحصول على الشهادة هو السبب المباشر لهذه القفزة في الراتب.\n\nولكن فكر في **الطموح والشغف الفطري**. الأشخاص المستعدون للسهر والدراسة والمثابرة للحصول على الشهادة يملكون بطبيعتهم طاقة وطموحًا استثنائيين. وحتى لو لم يدخلوا كلية الأعمال قط، فإن طموحهم واجتهادهم كان كفيلاً بإيصالهم لمناصب قيادية ورواتب عالية!\n\nعندما تحذف متغير الطموح من النموذج، لا يقتصر معامل الشهادة على قياس قيمتها الذاتية، بل يعمل كمغناطيس يسرق الفضل من الطموح الفطري وينسبه زيفًا إلى الشهادة. هذا التشويه الخطير يسمى **انحياز المتغير المحذوف (Omitted Variable Bias - OVB)**.\n\nتثبت معادلة OVB الشهيرة أن مقدار الانحياز يساوي حاصل ضرب أمرين:\n$$\\text{الانحياز} = (\\text{أثر الطموح على الراتب}) \\times (\\text{ارتباط الطموح بالالتحاق بالشهادة})$$\nولأن كلاهما موجب، فإن الانحدار البسيط يضخم أثر الشهادة تضخيمًا هائلاً يفوق الواقع.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **انحياز المتغير المحذوف** | سرقة الفضل: تشوه تقدير المعلمة لأن عاملاً غير مقاس تسلل وأعطى وزنه للمتغير. |\n| **المتغير المربك (Confounder)** | عامل ثالث خفي يؤثر في سبب الظاهرة وفي نتيجتها معًا في آن واحد. |\n| **الانحدار القصير (Short)** | النموذج الناقص الذي أسقط المتغير المربك عن غير قصد أو لتعذر قياسه. |\n| **الانحدار الطويل (Long)** | النموذج الكامل المثالي الذي يضبط ويقيس المتغير المربك إلى جانب المعالجة. |\n| **الانحياز الصاعد والهابط** | تضخيم الأثر الحقيقي بالزيادة (صاعد) أو التقليل منه بالنقصان (هابط). |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Long Regression:} \\quad \\mathbf{y} = \\mathbf{X}_1 \\beta_1 + \\mathbf{X}_2 \\beta_2 + \\boldsymbol{\\varepsilon}",
        "formulaNote": {
          "en": "Core invariant for The Omitted Variable Bias (OVB) Formula & The Directional Bias Matrix.",
          "ar": "الخاصية الرياضية الجوهرية لـ صيغة انحياز المتغير المغفَل ومصفوفة تحديد اتجاه الانحياز."
        },
        "narrative": {
          "en": "$$\n\\text{Short Regression:} \\quad \\mathbf{y} = \\mathbf{X}_1 \\tilde{\\beta}_1 + \\mathbf{u}\n$$\n\nThe OLS estimator from the short regression is:\n\n$$\n\\tilde{\\beta}_1 = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{y} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T (\\mathbf{X}_1 \\beta_1 + \\mathbf{X}_2 \\beta_2 + \\boldsymbol{\\varepsilon})\n$$\n\nTaking conditional expectations yields the celebrated **Omitted Variable Bias Formula**:\n\n$$\n\\mathbb{E}[\\tilde{\\beta}_1 \\mid \\mathbf{X}_1, \\mathbf{X}_2] = \\beta_1 + \\beta_2 \\cdot (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_2 \\equiv \\beta_1 + \\beta_2 \\cdot \\tilde{\\delta}_1\n$$\n\nwhere $\\tilde{\\delta}_1$ is the slope coefficient from an auxiliary regression of omitted variable $\\mathbf{X}_2$ on included variable $\\mathbf{X}_1$.\n\n### Why the Math Works Step-by-Step\n\n1. **The Anatomy of the Bias:**\n   Notice that the bias term is the exact product of two parameters:\n   $$\\text{Bias} = \\beta_2 \\times \\tilde{\\delta}_1$$\n   * $\\beta_2$: The structural impact of the omitted variable on the outcome in the long regression.\n   * $\\tilde{\\delta}_1$: The regression projection of the omitted variable onto the included variable.\n2. **When is OVB equal to zero?**\n   The short regression is unbiased ($\\mathbb{E}[\\tilde{\\beta}_1] = \\beta_1$) if and only if at least one of two conditions holds:\n   * $\\beta_2 = 0$: The omitted variable has zero effect on the outcome.\n   * $\\tilde{\\delta}_1 = 0$: The omitted variable is completely uncorrelated with the included regressor $\\mathbf{X}_1$.\n3. **The Direction of Bias:**\n   * If $\\beta_2 > 0$ and $\\tilde{\\delta}_1 > 0 \\implies \\text{Bias} > 0$ (Upward bias).\n   * If $\\beta_2 > 0$ and $\\tilde{\\delta}_1 < 0 \\implies \\text{Bias} < 0$ (Downward bias).\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\beta_1$: True causal coefficient in the complete structural long equation.\n* $\\tilde{\\beta}_1$: Naive slope estimate obtained from the short bivariate regression.\n* $\\beta_2$: The omitted variable's structural impact on $\\mathbf{y}$.\n* $\\tilde{\\delta}_1 = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_2$: Auxiliary regression coefficient of $\\mathbf{X}_2$ on $\\mathbf{X}_1$.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\beta_1$ | الأثر السببي الحقيقي | المعامل الحقيقي للمتغير المدروس في النموذج الكامل طويل الأجل. |\n| $\\tilde{\\beta}_1$ | التقدير الساذج للنموذج القصير | التقدير المشوه الذي نحصل عليه عند حذف المتغير المربك. |\n| $\\beta_2$ | وزن المتغير المحذوف | مدى قوة تأثير المتغير المحذوف على النتيجة النهائية $y$. |\n| $\\tilde{\\delta}_1$ | معامل الانحدار المساعد | مدى الارتباط بين المتغير المحذوف والمتغير المستقل المدرج. |\n| $\\beta_2 \\tilde{\\delta}_1$ | حد الانحياز الصافي | المقدار العددي الدقيق للتشويه الذي أصاب التقدير بسبب الحذف. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the full OVB algebraic decomposition. Fit the long regression, the short regression, and the auxiliary regression to numerically verify that $\\hat{\\beta}_{\\text{short}} = \\hat{\\beta}_{\\text{long}, 1} + \\hat{\\beta}_{\\text{long}, 2} \\cdot \\hat{\\delta}_{21}$ holds identically."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-omitted-variable-bias-formula",
          "starterCode": "def compute_ovb(X1: np.ndarray, X2: np.ndarray, y: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Omitted Variable Bias (OVB) decomposition.\n    \n    Verifies that: beta_short = beta_long_1 + beta_long_2 * delta_aux\n    \"\"\"\n    # Step 1: Fit the short regression (y on X1) to get beta_short\n    # Step 2: Fit the long regression (y on [X1, X2]) to get beta_long\n    # Step 3: Fit the auxiliary regression (X2 on X1) to get delta_aux\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X1 = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0]]); X2 = np.array([[2.0], [4.0], [6.0]]); y = X1 @ np.array([1.0, 2.0]) + X2[:, 0] * 3.0; res = compute_ovb(y, X1, X2); np.allclose(res['beta_short'], res['beta_long_1'] + res['ovb_calculated'], atol=1e-5)",
              "expected": "True"
            },
            {
              "input": "X1 = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0]]); X2 = np.array([[1.0], [0.0], [1.0]]); y = X1 @ np.array([0.0, 1.0]); res = compute_ovb(y, X1, X2); round(float(res['beta_long_1'][1]), 4)",
              "expected": "1.0"
            },
            {
              "input": "X1 = np.array([[1.0, 2.0], [1.0, 4.0]]); X2 = np.array([[1.0], [2.0]]); y = np.array([5.0, 9.0]); res = compute_ovb(y, X1, X2); 'ovb_calculated' in res",
              "expected": "True"
            }
          ],
          "expectedOutput": "True",
          "variants": {
            "python": {
              "starterCode": "def compute_ovb(X1: np.ndarray, X2: np.ndarray, y: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Omitted Variable Bias (OVB) decomposition.\n    \n    Verifies that: beta_short = beta_long_1 + beta_long_2 * delta_aux\n    \"\"\"\n    # Step 1: Fit the short regression (y on X1) to get beta_short\n    # Step 2: Fit the long regression (y on [X1, X2]) to get beta_long\n    # Step 3: Fit the auxiliary regression (X2 on X1) to get delta_aux\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ovb(X1: np.ndarray, X2: np.ndarray, y: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Omitted Variable Bias (OVB) decomposition.\n    \n    Verifies that: beta_short = beta_long_1 + beta_long_2 * delta_aux\n    \"\"\"\n    # Step 1: Fit the short regression (y on X1) to get beta_short\n    X1_col = X1 if X1.ndim == 2 else X1[:, np.newaxis]\n    X2_col = X2 if X2.ndim == 2 else X2[:, np.newaxis]\n    \n    beta_short = float(np.linalg.solve(X1_col.T @ X1_col, X1_col.T @ y).squeeze())\n\n    # Step 2: Fit the long regression (y on [X1, X2]) to get beta_long\n    X_long = np.column_stack([X1_col, X2_col])\n    beta_long = np.linalg.solve(X_long.T @ X_long, X_long.T @ y)\n    beta_long_1 = float(beta_long[0])\n    beta_long_2 = float(beta_long[1])\n\n    # Step 3: Fit the auxiliary regression (X2 on X1) to get delta_aux\n    delta_aux = float(np.linalg.solve(X1_col.T @ X1_col, X1_col.T @ X2_col).squeeze())\n\n    # Step 4: Compute theoretical bias and verify exact identity\n    bias = beta_long_2 * delta_aux\n\n    return {\n        \"beta_short\": beta_short,\n        \"beta_long_1\": beta_long_1,\n        \"beta_long_2\": beta_long_2,\n        \"delta_aux\": delta_aux,\n        \"bias\": bias,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Short regression does not equal long regression plus bias.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Reversing the auxiliary regression (e.g. regressing $X_1$ on $X_2$ instead of $X_2$ on $X_1$).",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "The auxiliary regression must project the *omitted* variables $X_2$ onto the *included* variables $X_1$: `np.linalg.solve(X1.T @ X1, X1.T @ X2)`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "An empirical economist studies the return to education by regressing log wages on years of schooling without controlling for unobserved innate cognitive ability. Economic theory and psychology indicate that: 1. Higher innate cognitive ability directly increases wages ($\\beta_{\\text{ability}} > 0$). 2. Individuals with higher innate cognitive ability choose to attain more years of schooling ($\\delta_{\\text{ability, school}} > 0$). According to the OVB formula, what is the direction of the bias in the short regression, and how does the naive OLS estimate compare to the true causal return?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ صيغة انحياز المتغير المغفَل ومصفوفة تحديد اتجاه الانحياز تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The bias is negative; naive OLS underestimates the return to schooling.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The bias is positive ($\\text{Bias} = \\beta_{\\text{ability}} \\cdot \\delta > 0$); naive OLS overestimates the true causal return to schooling because schooling takes credit for unobserved innate talent.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The bias is zero because ability is unobservable.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The bias cannot be signed without running an RCT.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "bad-controls-mediators-overcontrolling",
    "title": "Bad Controls, Mediators, and Overcontrolling",
    "titleAr": "ضوابط التحكم السيئة والمتغيرات الوسيطة وفخ الإفراط في التحكم",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose an e-commerce website redesigns its product page to increase total purchases: does the new, cleaner layout cause higher sales? The...",
      "ar": "تخيل متجرًا إلكترونيًا أعاد تصميم صفحة المنتج لزيادة المبيعات: هل يؤدي التصميم الجديد إلى زيادة المشتريات الفعلية؟ أطلق فريق البيانات..."
    },
    "prerequisites": [
      "omitted-variable-bias-formula"
    ],
    "x": 760,
    "y": 745,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SimpsonsParadoxLab",
        "narrative": {
          "en": "Suppose an e-commerce website redesigns its product page to increase total purchases: *does the new, cleaner layout cause higher sales?*\n\nThe data science team launches an A/B test. The product manager decides to be 'extra careful' and tells the data scientist: *\"Make sure you control for everything! Let's control for whether the customer clicked the 'Proceed to Checkout' button.\"*\n\nWhat happens when you add 'Clicked Checkout' to the regression?\nThe estimated effect of the redesign **instantly drops to zero!** The team falsely concludes that the redesign failed.\n\nWhy did this disaster happen? Because clicking checkout is not an external confounder—it is the direct **mediator** through which the redesign works! The new layout increases sales *precisely by convincing people to click checkout*. When you hold 'Clicked Checkout' constant, you ask: *\"Among people who either both clicked checkout or both didn't, did the redesign help?\"* You have blocked the very pipe that carries the causal effect!\n\nThis fatal mistake is called **Overcontrolling** or adding a **Bad Control**. A good control is determined *before* treatment (like customer age or historical spend). A bad control is determined *after* treatment and sits directly on the causal transmission path.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Good Control** | Pre-treatment confounder: a background trait existing before the experiment started. |\n| **Bad Control** | Post-treatment trap: a variable influenced by the treatment that distorts its effect. |\n| **Mediator** | The transmission pipeline: a middle stepping stone through which treatment creates its impact. |\n| **Overcontrolling** | Stifling the mechanism: holding the transmission pipe fixed, choking off the effect. |\n| **Variance Inflation Factor (VIF)** | Multicollinearity alarm: measures how much coefficient variance is inflated by redundant controls. |\n\n```text\n    THE MEDIATOR PIPELINE:\n\n[ Redesign (Treatment) ] ======> [ Clicked Checkout (Mediator) ] ======> [ Purchase (Outcome) ]\n                 |                                      ^\n                 |                                      |\n                 \\====== (Controlling for this shuts off the pipeline!) =====/\n```",
          "ar": "تخيل متجرًا إلكترونيًا أعاد تصميم صفحة المنتج لزيادة المبيعات: *هل يؤدي التصميم الجديد إلى زيادة المشتريات الفعلية؟*\n\nأطلق فريق البيانات اختبار A/B. وأراد مدير المنتج أن يكون \"شديد الدقة والحرص\"، فقال للباحث: *\"تأكد من ضبط كل المتغيرات الممكنة! دعنا نضبط النموذج بالتحكم في متغير: هل نقر العميل على زر الانتقال إلى الدفع؟\"*\n\nما الذي حدث عند إدخال هذا المتغير في الانحدار؟\n**انهار الأثر المقدر للتصميم الجديد إلى الصفر فورًا!** واستنتج الفريق خطأً أن التصميم الجديد فاشل ولا جدوى منه.\n\nلماذا حدثت هذه الكارثة التحليلية؟ لأن النقر على زر الدفع ليس متغيرًا مربكًا خارجيًا، بل هو **الوسيط (Mediator)** والقناة التي يعمل من خلالها التصميم! فالتصميم الجديد ينجح تحديدًا عبر إقناع الزوار بالنقر على زر الدفع. فعندما تثبت هذا الزر، فأنت تسأل: *\"بين الأشخاص الذين نقروا جميعًا أو لم ينقروا جميعًا، هل أحدث التصميم فرقًا؟\"* لقد خنقت الأنبوب الذي ينقل الأثر السببي بالكامل!\n\nهذا الخطأ الفادح يسمى **التحكم الخاطئ (Bad Controls)** أو **الإفراط في التحكم (Overcontrolling)**؛ فالمتغير الضابط الصالح يُقاس *قبل المعالجة*، أما المتغير الضابط السيئ فهو وليد المعالجة ويقع في مسارها.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **الضابط الصالح (Good Control)** | عامل سابق للمعالجة: صفة أساسية موجودة مسبقًا تفسر الفروق المربكة. |\n| **الضابط السيئ (Bad Control)** | فخ ما بعد المعالجة: متغير ناتج عن المعالجة يؤدي ضبطه لتشويه أثرها الحقيقي. |\n| **المتغير الوسيط (Mediator)** | أنبوب النقل: الخطوة الوسيطة التي تنتقل عبرها طاقة المعالجة نحو النتيجة. |\n| **الإفراط في التحكم (Overcontrolling)** | خنق الآلية: تثبيت المتغير الوسيط مما يؤدي لمحو الأثر السببي الإجمالي. |\n| **معامل تضخم التباين (VIF)** | جرس إنذار التعدد الخطي: يقيس مدى تضخم خطأ التقدير بسبب حشو المتغيرات. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "Y_i = \\alpha_0 + \\tau_{\\text{total}} D_i + \\varepsilon_i",
        "formulaNote": {
          "en": "Core invariant for Bad Controls, Mediators, and Overcontrolling.",
          "ar": "الخاصية الرياضية الجوهرية لـ ضوابط التحكم السيئة والمتغيرات الوسيطة وفخ الإفراط في التحكم."
        },
        "narrative": {
          "en": "When conditioning on mediator $M$, the regression decomposes into the direct effect:\n\n$$\nY_i = \\alpha_1 + \\tau_{\\text{direct}} D_i + \\gamma M_i + u_i\n$$\n\nIf there is no direct path other than through $M$, then $\\tau_{\\text{direct}} = 0$, completely erasing the evidence of treatment efficacy!\n\nFurthermore, when redundant collinear controls are added, the Variance Inflation Factor for regressor $j$ inflates coefficient variance:\n\n$$\n\\text{VIF}_j = \\frac{1}{1 - R_j^2}\n$$\n\nwhere $R_j^2$ is the coefficient of determination from regressing regressor $X_j$ on all other regressors.\n\n### Why the Math Works Step-by-Step\n\n1. **Why does conditioning on a mediator destroy total causal inference?**\n   By the chain rule of differentiation in structural models:\n   $$\\frac{dY}{dD} = \\frac{\\partial Y}{\\partial D} + \\frac{\\partial Y}{\\partial M} \\frac{dM}{dD}$$\n   The total effect includes the indirect channel $\\frac{\\partial Y}{\\partial M} \\frac{dM}{dD}$. Controlling for $M$ forces $dM = 0$, throwing away the indirect channel and measuring only the direct residual impact.\n2. **The Hazard of Collider Stratification:**\n   If there is an unobserved confounder $U$ affecting mediator $M$ and outcome $Y$ ($M \\leftarrow U \\to Y$), controlling for $M$ turns it into a collider along the path $D \\to M \\leftarrow U \\to Y$, opening a spurious backdoor path between $D$ and $Y$!\n3. **Variance Inflation Factor Thresholds:**\n   When $R_j^2 \\to 1$ (near-perfect collinearity), $\\text{VIF}_j \\to \\infty$. A rule of thumb is that $\\text{VIF} > 5$ or $10$ indicates severe multicollinearity that destroys statistical precision.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\tau_{\\text{total}}$: Total causal effect capturing all direct and mediated mechanisms.\n* $\\tau_{\\text{direct}}$: Direct effect holding the mediator artificially fixed.\n* $\\text{VIF}_j$: Factor by which $\\mathbb{V}[\\hat{\\beta}_j]$ is inflated relative to orthogonal regressors.\n* $R_j^2$: Proportion of variance in $X_j$ explained by all other regressors.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\tau_{\\text{total}}$ | الأثر السببي الإجمالي | القوة الإجمالية للمعالجة متضمنة كافة القنوات والمسارات الوسيطة. |\n| $\\tau_{\\text{direct}}$ | الأثر المباشر المنعزل | أثر المعالجة المتبقي بعد تثبيت الوسيط جبريًا وخنق قناته الطبيعية. |\n| $\\text{VIF}_j$ | معامل تضخم التباين | مضاعف يوضح كم تضاعف خطأ التقدير بسبب التكرار والتداخل بين الميزات. |\n| $R_j^2$ | معامل تحديد الانحدار المساعد | نسبة تباين الميزة التي يمكن التنبؤ بها بواسطة بقية الميزات في النموذج. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the Variance Inflation Factor (VIF) diagnostic tool for each column in a design matrix using auxiliary regressions to diagnose severe overcontrolling and collinearity."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-bad-controls-mediators-overcontrolling",
          "starterCode": "def compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in design matrix X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (without intercept, or where each column is checked).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,) with VIF values.\n    \"\"\"\n    # Target column j\n    # Regressors: all columns except j, plus an intercept\n    # Fit OLS of feature j on all other features\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "vifs = compute_vif(np.array([[1.0, 2.0], [2.0, 4.01], [3.0, 5.99]])); vifs[0] > 10.0",
              "expected": "True"
            },
            {
              "input": "vifs = compute_vif(np.array([[1.0, 0.0], [0.0, 1.0], [-1.0, 0.0], [0.0, -1.0]])); np.allclose(vifs, [1.0, 1.0], atol=1e-2)",
              "expected": "True"
            },
            {
              "input": "len(compute_vif(np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 10.0]])))",
              "expected": "3"
            }
          ],
          "expectedOutput": "True",
          "variants": {
            "python": {
              "starterCode": "def compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in design matrix X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (without intercept, or where each column is checked).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,) with VIF values.\n    \"\"\"\n    # Target column j\n    # Regressors: all columns except j, plus an intercept\n    # Fit OLS of feature j on all other features\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in design matrix X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (without intercept, or where each column is checked).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,) with VIF values.\n    \"\"\"\n    n, k = X.shape\n    vifs = np.zeros(k)\n\n    for j in range(k):\n        # Target column j\n        y_j = X[:, j]\n        # Regressors: all columns except j, plus an intercept\n        X_other = np.delete(X, j, axis=1)\n        X_design = np.column_stack([np.ones(n), X_other])\n\n        # Fit OLS of feature j on all other features\n        beta = np.linalg.solve(X_design.T @ X_design, X_design.T @ y_j)\n        y_hat = X_design @ beta\n\n        # Compute R^2 of this auxiliary regression\n        tss = np.sum((y_j - np.mean(y_j)) ** 2)\n        ssr = np.sum((y_j - y_hat) ** 2)\n        r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0\n\n        # VIF = 1 / (1 - R^2)\n        vifs[j] = 1.0 / (1.0 - r2) if r2 < 0.999999 else 1e6\n\n    return vifs"
        },
        "hints": {
          "tier1": {
            "en": "Division by zero warning or infinite VIF on non-singular matrices.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Omitting the constant intercept in the auxiliary regression, causing uncentered $R^2$ to exceed 1.0.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Always append an intercept column `np.ones((n, 1))` to the auxiliary design matrix `X_other`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A national government evaluates a multi-million-dollar agricultural grant program ($D = 1$ if farm received cash grant, $0$ otherwise) intended to boost crop harvest value ($Y$). A junior data analyst specifies the following regression: $$ \\text{Harvest}_i = \\beta_0 + \\beta_1 \\text{Grant}_i + \\beta_2 \\text{FertilizerPurchased}_i + \\varepsilon_i $$ He finds $\\hat{\\beta}_1 \\approx 0$ ($p = 0.85$) and announces to the cabinet that the cash grant had zero impact on farm output. Why is this conclusion fundamentally flawed?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ ضوابط التحكم السيئة والمتغيرات الوسيطة وفخ الإفراط في التحكم تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The analyst should have used a log transform on harvest instead of linear values.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Fertilizer is a textbook mediator (bad control) purchased *using* the grant money; controlling for fertilizer absorbs the primary transmission mechanism through which the cash grant boosted yields, artificially shrinking $\\hat{\\beta}_1$ toward zero.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Controlling for fertilizer creates heteroskedasticity in harvest values.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The sample size must be infinite to evaluate agricultural grants.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "rubin-causal-model-potential-outcomes",
    "title": "The Rubin Causal Model & The Fundamental Problem of Causal Inference",
    "titleAr": "نموذج روبين السببي والمشكلة الجوهرية للاستدلال السببي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "You wake up on a Tuesday morning with a pounding migraine. You open your medicine cabinet, take a newly developed painkiller, and go back...",
      "ar": "تستيقظ صباح يوم الثلاثاء بصداع نصفي حاد. تفتح خزانة الأدوية وتتناول مسكنًا جديدًا وتعود للنوم. بعد ساعتين، يختفي الصداع تمامًا."
    },
    "prerequisites": [
      "constrained-optimization-lagrange"
    ],
    "x": 770,
    "y": 840,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PotentialOutcomesSplitLab",
        "narrative": {
          "en": "You wake up on a Tuesday morning with a pounding migraine. You open your medicine cabinet, take a newly developed painkiller, and go back to bed. Two hours later, your headache is completely gone.\n\nDid the painkiller cure your headache?\n\nIt seems obvious to say 'yes'. But consider what would have happened if you had just drunk a glass of water and taken a nap without the pill: *would your headache have cleared up on its own anyway?*\n\nTo know the **true causal effect** of the pill on you, we need to compare two parallel realities for the exact same person at the exact same moment:\n1. Reality 1: Your health outcome having taken the pill, written as $Y_i(1)$.\n2. Reality 2: Your health outcome without the pill, written as $Y_i(0)$.\n\nThe causal effect is the difference between these two parallel universes: $\\tau_i = Y_i(1) - Y_i(0)$.\n\nHere is the tragedy of science, known as the **Fundamental Problem of Causal Inference**: we can only ever observe one reality for any individual! Once you swallow the pill, the universe where you didn't swallow it becomes a ghost—a **counterfactual** forever hidden from observation.\n\nThe **Rubin Causal Model** formalizes this intuition. Because individual causal effects cannot be seen directly, econometrics shifts its focus to estimating the **Average Treatment Effect (ATE)** across a population: $\\mathbb{E}[Y(1) - Y(0)]$.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Potential Outcomes ($Y(1), Y(0)$)** | The two parallel futures: outcome with treatment vs outcome without treatment. |\n| **Counterfactual** | The unobserved path not taken: what would have happened in the alternate universe. |\n| **Fundamental Problem of Causal Inference** | You can only live one reality; the counterfactual is always missing data. |\n| **Average Treatment Effect (ATE)** | The average payoff across the entire population: $\\mathbb{E}[Y(1) - Y(0)]$. |\n| **SUTVA** | No interference: one person's treatment doesn't spill over to change someone else's outcome. |\n\n```text\n    THE SPLIT PARALLEL UNIVERSES:\n\n+---> [ Universe 1: Took Pill ] ---> Y_i(1) = Headache Gone (Observed!)\n                     |\n    [ Patient Alice ]\n                     |\n                     +---> [ Universe 0: No Pill ]   ---> Y_i(0) = ??? (Counterfactual Ghost!)\n```",
          "ar": "تستيقظ صباح يوم الثلاثاء بصداع نصفي حاد. تفتح خزانة الأدوية وتتناول مسكنًا جديدًا وتعود للنوم. بعد ساعتين، يختفي الصداع تمامًا.\n\nهل كان الدواء هو السبب الحقيقي لشفائك؟\n\nيبدو الجواب البديهي \"نعم\". ولكن فكر فيما كان سيحدث لو شربت كوب ماء وأخذت قسطًا من الراحة دون تناول الحبة: *ألم يكن الصداع ليزول تلقائيًا بمفرده؟*\n\nلمعرفة **الأثر السببي الحقيقي** للدواء عليك، نحتاج إلى مقارنة عالمين متوازيين للشخص نفسه في اللحظة الزمنية ذاتها:\n1. الواقع الأول: حالتك الصحية بعد تناول الدواء، ونرمز لها بـ $Y_i(1)$.\n2. الواقع الثاني: حالتك الصحية دون تناول الدواء، ونرمز لها بـ $Y_i(0)$.\n\nالأثر السببي الفعلي هو الفارق بين هذين العالمين: $\\tau_i = Y_i(1) - Y_i(0)$.\n\nوهنا تصطدم البشرية بـ **المعضلة الأساسية للاستدلال السببي**: لا يمكننا أبدًا مشاهدة سوى واقع واحد فقط لأي إنسان! فبمجرد ابتلاعك للدواء، يتحول المسار الآخر إلى شبح غائب—**واقع مضاد (Counterfactual)** يستحيل رصده.\n\nيضع **نموذج روبين السببي (Rubin Causal Model)** هذا الحدس في إطار رياضي دقيق؛ ولأننا نعجز عن حساب الأثر الفردي لكل شخص، فإننا نوجه بوصلة العلم نحو تقدير **متوسط أثر المعالجة (ATE)** عبر عموم المجتمع.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **النتائج المحتملة ($Y(1), Y(0)$)** | المساران المتوازيان: النتيجة في حال تلقي المعالجة مقابل النتيجة دونها. |\n| **الواقع المضاد (Counterfactual)** | الطريق الذي لم نسلكه: ما كان سيحدث في العالم البديل المفقود. |\n| **المعضلة الأساسية للسببية** | عجزنا الطبيعي عن عيش واقعين معًا؛ فأحد المسارين دائمًا معلومة مفقودة. |\n| **متوسط أثر المعالجة (ATE)** | العائد السببي الإجمالي المتوسط عبر جميع أفراد المجتمع الإحصائي. |\n| **فرضية SUTVA** | استقلالية الوحدات: معالجة شخص لا تؤثر على نتائج شخص آخر ولا تغيرها. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0) = Y_i(0) + D_i [Y_i(1) - Y_i(0)]",
        "formulaNote": {
          "en": "Core invariant for The Rubin Causal Model & The Fundamental Problem of Causal Inference.",
          "ar": "الخاصية الرياضية الجوهرية لـ نموذج روبين السببي والمشكلة الجوهرية للاستدلال السببي."
        },
        "narrative": {
          "en": "The individual treatment effect is $\\tau_i = Y_i(1) - Y_i(0)$.\n\nA naive observational comparison between treated and untreated groups decomposes into:\n\n$$\n\\mathbb{E}[Y \\mid D = 1] - \\mathbb{E}[Y \\mid D = 0] = \\underbrace{\\mathbb{E}[Y(1) - Y(0) \\mid D = 1]}_{\\text{ATT (Average Effect on Treated)}} + \\underbrace{\\{\\mathbb{E}[Y(0) \\mid D = 1] - \\mathbb{E}[Y(0) \\mid D = 0]\\}}_{\\text{Selection Bias}}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why does observational comparison mislead us?**\n   Notice that the raw difference $\\mathbb{E}[Y \\mid D=1] - \\mathbb{E}[Y \\mid D=0]$ contains two distinct terms:\n   * **ATT**: The true causal effect on those who took the treatment.\n   * **Selection Bias**: The baseline difference between the groups even if neither received treatment!\n2. **The Role of Selection Bias:**\n   If people who take the treatment were already healthier (or wealthier) at baseline, $\\mathbb{E}[Y(0) \\mid D=1] > \\mathbb{E}[Y(0) \\mid D=0]$, creating a positive selection bias that makes the treatment look falsely magical!\n3. **How Randomization Solves the Puzzle:**\n   Under random assignment ($D \\perp\\!\\!\\perp (Y(1), Y(0))$), baseline outcomes are identical on average: $\\mathbb{E}[Y(0) \\mid D=1] = \\mathbb{E}[Y(0) \\mid D=0]$. Selection bias vanishes to zero, equating the naive difference directly to ATE!\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $Y_i(1)$: Potential outcome if treated.\n* $Y_i(0)$: Potential outcome if untreated.\n* $D_i \\in \\{0, 1\\}$: Binary treatment indicator.\n* $\\text{ATE} = \\mathbb{E}[Y(1) - Y(0)]$: Average Treatment Effect across whole population.\n* $\\text{ATT} = \\mathbb{E}[Y(1) - Y(0) \\mid D = 1]$: Average Treatment Effect on the Treated.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $Y_i(1)$ | النتيجة المحتملة بالمعالجة | ما سيحدث للمريض إذا أخذ الدواء في واقعه الافتراضي الأول. |\n| $Y_i(0)$ | النتيجة المحتملة دون معالجة | ما سيحدث للمريض إذا لم يأخذ الدواء في واقعه الافتراضي المقابل. |\n| $\\text{ATT}$ | أثر المعالجة على المعالجين | العائد السببي الحقيقي المحقق خصيصًا للفئة التي خضعت للتجربة. |\n| انحياز الاختيار | الفارق الأساسي المسبق | التفاوت الأصلي في نقطة البداية بين المجموعتين قبل تطبيق أي علاج. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the potential outcomes decomposition. Given known potential outcome vectors $Y(0)$, $Y(1)$, and treatment assignments $D$, synthesize the realized outcome $Y$ and calculate ATE, ATT, naive difference in means, and exact selection bias."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-rubin-causal-model-potential-outcomes",
          "starterCode": "def decompose_selection_bias(y: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Decomposes an observational difference in group means.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n        \n    Returns\n    -------\n    dict with keys 'mean_treated', 'mean_control', 'raw_diff'\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
          "testCases": [
            {
              "input": "y0 = np.array([10.0, 12.0, 8.0, 10.0]); y1 = np.array([15.0, 17.0, 13.0, 15.0]); d = np.array([1, 1, 0, 0]); res = decompose_selection_bias(y0, y1, d); round(res['ate'], 4)",
              "expected": "5.0"
            },
            {
              "input": "y0 = np.array([10.0, 12.0, 8.0, 10.0]); y1 = np.array([15.0, 17.0, 13.0, 15.0]); d = np.array([1, 1, 0, 0]); res = decompose_selection_bias(y0, y1, d); round(res['selection_bias'], 4)",
              "expected": "2.0"
            },
            {
              "input": "y0 = np.array([5.0, 5.0]); y1 = np.array([10.0, 10.0]); d = np.array([1, 0]); res = decompose_selection_bias(y0, y1, d); round(res['naive_diff'], 4)",
              "expected": "5.0"
            }
          ],
          "expectedOutput": "5.0",
          "variants": {
            "python": {
              "starterCode": "def decompose_selection_bias(y: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Decomposes an observational difference in group means.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n        \n    Returns\n    -------\n    dict with keys 'mean_treated', 'mean_control', 'raw_diff'\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "import numpy as np\n\ndef decompose_selection_bias(y: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Decomposes an observational difference in group means.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n        \n    Returns\n    -------\n    dict with keys 'mean_treated', 'mean_control', 'raw_diff'\n    \"\"\"\n    treated_mask = (d == 1)\n    control_mask = (d == 0)\n\n    mean_treated = float(np.mean(y[treated_mask]))\n    mean_control = float(np.mean(y[control_mask]))\n    raw_diff = mean_treated - mean_control\n\n    return {\n        \"mean_treated\": mean_treated,\n        \"mean_control\": mean_control,\n        \"raw_diff\": raw_diff,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Identity failure: `naive_diff != att + selection_bias`.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Evaluating selection bias using observed $Y$ rather than potential baseline control outcome $Y_0$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Selection bias measures baseline counterfactual difference under control: compare `y0[d == 1]` against `y0[d == 0]`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A public health dataset shows that patients admitted to hospital Intensive Care Units (ICUs) have a $25\\%$ higher 30-day mortality rate than individuals who rest at home. A sensationalist news anchor proclaims: *\"New study proves hospitals are killing people; going to the ICU increases your risk of death by 25%!\"* How does the Rubin Causal Model selection bias decomposition explain why this claim is completely wrong?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ نموذج روبين السببي والمشكلة الجوهرية للاستدلال السببي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The claim is wrong because mortality is a binary outcome and OLS requires continuous Gaussian metrics.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The naive comparison is heavily contaminated by negative selection bias: patients who enter the ICU were already critically ill at baseline ($\\mathbb{E}[Y_i(0) \\mid D_i=1] \\gg \\mathbb{E}[Y_i(0) \\mid D_i=0]$); the hospital actually saves lives, but severe baseline sickness masks this causal benefit.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The claim is true because ICUs expose patients to hospital-acquired bacterial infections.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The anchor is correct because potential outcomes cannot be defined for medical treatments.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "selection-bias-randomized-trials",
    "title": "Selection Bias Decomposition & Randomized Controlled Trials",
    "titleAr": "تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine an insurance company conducts a simple study: they compare the annual health scores of people who went to the hospital last year...",
      "ar": "تخيل شركة تأمين تجري دراسة صحية: تقارن الحالة الصحية للأشخاص الذين زاروا المستشفيات العام الماضي بالذين لم يزوروها."
    },
    "prerequisites": [
      "rubin-causal-model-potential-outcomes"
    ],
    "x": 790,
    "y": 935,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SelectionBiasPropensityLab",
        "narrative": {
          "en": "Imagine an insurance company conducts a simple study: they compare the annual health scores of people who went to the hospital last year against people who did not.\n\nThe raw data shows an alarming result: people who went to the hospital had significantly worse health outcomes and a higher mortality rate than people who stayed home! A naive analyst exclaims: *\"Hospitals are making people sick! We should ban hospital visits to improve public health!\"*\n\nWhat went wrong? **Selection Bias**.\nPeople who go to the hospital were already sick *before* they ever set foot through the hospital doors. You are not comparing apples to apples; you are comparing people with pneumonia to healthy joggers in the park. The baseline difference between the two groups overwhelms the true curative effect of the hospital.\n\nHow does modern science defeat selection bias? Through a **Randomized Controlled Trial (RCT)**.\nIn an RCT, treatment is decided strictly by a coin flip. Because the coin flip does not care whether a patient is rich or poor, young or old, sick or healthy, both the treatment group and the control group end up with the exact same average characteristics before the experiment begins.\n\nWhen baseline differences are completely neutralized, selection bias vanishes, and the raw difference in group averages becomes the unvarnished causal truth!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Selection Bias** | The baseline gap: differences in starting conditions between who chooses treatment and who doesn't. |\n| **RCT (Randomized Trial)** | The coin-flip shield: assigning treatment randomly so both groups start out as identical twins. |\n| **Propensity Score ($e(X)$)** | The probability of receiving treatment based on observable background traits. |\n| **Inverse Probability Weighting (IPW)** | Reweighting observational data to create a synthetic pseudo-population where treatment is balanced. |\n| **Internal Validity** | The guarantee that the measured effect is truly caused by the treatment, not by confounding. |\n\n```text\n    OBSERVATIONAL VS RANDOMIZED TRIAL:\n\nObservational (Biased):\n      Treated (Sick at baseline)    ---- Hospital ----> Fair Health\n      Control (Healthy at baseline) ---- Stay Home ---> Great Health   => False Conclusion: Hospital hurts!\n\nRandomized Trial (RCT):\n      Treated (50% Sick, 50% Healthy) ---- Treatment ---> Better Health\n      Control (50% Sick, 50% Healthy) ---- Placebo   ---> Normal Baseline => Clean Causal Truth!\n```",
          "ar": "تخيل شركة تأمين تجري دراسة صحية: تقارن الحالة الصحية للأشخاص الذين زاروا المستشفيات العام الماضي بالذين لم يزوروها.\n\nتظهر البيانات نتيجة صادمة: الأشخاص الذين دخلوا المستشفيات لديهم معدلات وفاة وأمراض أعلى بكثير ممن بقوا في منازلهم! يتسرع محلل ساذج قائلاً: *\"المستشفيات تنشر الأمراض وتقتل الناس! يجب إغلاقها فورًا لتعزيز الصحة العامة!\"*\n\nما الخطأ القاتل في هذا التفكير؟ **انحياز الاختيار (Selection Bias)**.\nالمرضى الذين ذهبوا للمستشفى كانوا يعانون من أمراض خطيرة *قبل* أن تطأ أقدامهم عتبة المستشفى. أنت لا تقارن فئتين متماثلتين، بل تقارن مصابين بالالتهاب الرئوي برياضيين يركضون في الحديقة. هذا الفارق الهائل في نقطة البداية يطغى تمامًا على الأثر العلاجي الحقيقي للمستشفى.\n\nكيف يقضي العلم الحديث على انحياز الاختيار؟ عبر **التجارب العشوائية المنضبطة (RCT)**.\nفي التجربة العشوائية، يتم توزيع العلاج عبر رمية عملة نقدية عشوائية. ولأن رمية العملة لا تبالي بكون المريض غنيًا أو فقيرًا، شابًا أو مسنًا، فإن المجموعتين تتطابقان تمامًا في المتوسط قبل بدء العلاج، فيتلاشى انحياز الاختيار ويظهر الأثر السببي الصافي.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **انحياز الاختيار** | فجوة نقطة البداية: الفروق الجوهرية المسبقة بين من اختاروا المعالجة ومن تركوها. |\n| **التجربة العشوائية (RCT)** | درع القرعة: توزيع المعالجة عشوائيًا لضمان تماثل المجموعتين كتوأم حقيقي. |\n| **درجة الميل (Propensity Score)** | احتمالية تلقي الفرد للمعالجة بالنظر إلى صفاته وخصائصه الخلفية. |\n| **الوزن باحتمال الميل العكسي (IPW)** | إعادة وزن البيانات لإنشاء مجتمع افتراضي متوازن يخلو من انحياز الاختيار. |\n| **الصلاحية الداخلية** | الثقة المطلقة بأن النتيجة ناتجة حقًا عن المعالجة وليست تشويشًا خارجيًا. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "(Y(1), Y(0)) \\perp\\!\\!\\perp D \\mid \\mathbf{X}",
        "formulaNote": {
          "en": "Core invariant for Selection Bias Decomposition & Randomized Controlled Trials.",
          "ar": "الخاصية الرياضية الجوهرية لـ تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة."
        },
        "narrative": {
          "en": "Define the propensity score as the conditional probability of treatment:\n\n$$\ne(\\mathbf{X}) \\equiv \\mathbb{P}(D = 1 \\mid \\mathbf{X})\n$$\n\nRosenbaum and Rubin (1983) proved that if CIA holds, then $(Y(1), Y(0)) \\perp\\!\\!\\perp D \\mid e(\\mathbf{X})$.\n\nThe **Inverse Probability Weighting (IPW)** estimator recovers the population ATE by weighting each observation by the inverse of its probability of receiving its observed treatment:\n\n$$\n\\tau_{\\text{IPW}} = \\mathbb{E}\\left[ \\frac{D Y}{e(\\mathbf{X})} - \\frac{(1 - D) Y}{1 - e(\\mathbf{X})} \\right]\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why does dividing by $e(\\mathbf{X})$ eliminate selection bias?**\n   Taking expectations of the treated term:\n   $$\\mathbb{E}\\left[ \\frac{D Y}{e(\\mathbf{X})} \\right] = \\mathbb{E}\\left[ \\mathbb{E}\\left[ \\frac{D Y(1)}{e(\\mathbf{X})} \\;\\middle|\\; \\mathbf{X} \\right] \\right] = \\mathbb{E}\\left[ \\frac{\\mathbb{E}[D \\mid \\mathbf{X}] Y(1)}{e(\\mathbf{X})} \\right] = \\mathbb{E}\\left[ \\frac{e(\\mathbf{X}) Y(1)}{e(\\mathbf{X})} \\right] = \\mathbb{E}[Y(1)]$$\n   Dividing by the propensity score creates a pseudo-population where treatment is completely decoupled from baseline traits!\n2. **The Positivity / Overlap Assumption:**\n   IPW requires that for all $\\mathbf{X}$, $0 < e(\\mathbf{X}) < 1$. If some individuals have $e(\\mathbf{X}) = 0$ (no chance of treatment) or $e(\\mathbf{X}) = 1$, the weights blow up to infinity, breaking the estimator.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $e(\\mathbf{X})$: Propensity score (probability of treatment given covariates).\n* $w_i = \\frac{D_i}{e(\\mathbf{X}_i)} + \\frac{1 - D_i}{1 - e(\\mathbf{X}_i)}$: IPW balancing weight for observation $i$.\n* $\\tau_{\\text{IPW}}$: Horvitz-Thompson / Inverse Probability Weighted Average Treatment Effect.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $e(\\mathbf{X})$ | درجة الميل الاحتمالية | احتمال خضوع الشخص للمعالجة بناءً على سماته الديموغرافية والبيولوجية. |\n| $1/e(\\mathbf{X})$ | وزن المعالجة العكسي | إعطاء وزن أكبر للحالات النادرة التي تلقت العلاج رغم تدني احتماليته. |\n| $\\tau_{\\text{IPW}}$ | مقدر IPW الموزون | المقدر الذي يعيد التوازن الإحصائي ليحاكي نتائج التجربة العشوائية. |\n| شرط التداخل (Overlap) | حتمية التكافؤ الاحتمالي | اشتراط وجود فرصة حقيقية (أكبر من 0 وأقل من 1) لكل فرد لتلقي العلاج. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the normalized Inverse Probability Weighting (IPW) estimator for the Average Treatment Effect (ATE). Ensure numerical stability by clipping extreme propensity scores away from $0$ and $1$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-selection-bias-randomized-trials",
          "starterCode": "def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray) -> float:\n    \"\"\"\n    Computes the Average Treatment Effect using Inverse Probability Weighting (IPW).\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n    ps : np.ndarray of shape (N,)\n        Propensity scores (strictly bounded between 0 and 1).\n\n    Returns\n    -------\n    float : Estimated ATE.\n    \"\"\"\n    # Clip propensity scores defensively to prevent zero division\n    # Step 1: Compute weighted treated term: (D * Y) / ps\n    # Step 2: Compute weighted control term: ((1 - D) * Y) / (1 - ps)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "y = np.array([10.0, 15.0, 6.0, 8.0]); d = np.array([1, 1, 0, 0]); ps = np.array([0.5, 0.5, 0.5, 0.5]); round(compute_ipw_ate(y, d, ps), 4)",
              "expected": "5.5"
            },
            {
              "input": "y = np.array([12.0, 4.0]); d = np.array([1, 0]); ps = np.array([0.8, 0.2]); round(compute_ipw_ate(y, d, ps), 4)",
              "expected": "8.0"
            },
            {
              "input": "y = np.array([20.0, 10.0]); d = np.array([1, 0]); ps = np.array([0.5, 0.5]); compute_ipw_ate(y, d, ps)",
              "expected": "10.0"
            }
          ],
          "expectedOutput": "5.5",
          "variants": {
            "python": {
              "starterCode": "def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray) -> float:\n    \"\"\"\n    Computes the Average Treatment Effect using Inverse Probability Weighting (IPW).\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n    ps : np.ndarray of shape (N,)\n        Propensity scores (strictly bounded between 0 and 1).\n\n    Returns\n    -------\n    float : Estimated ATE.\n    \"\"\"\n    # Clip propensity scores defensively to prevent zero division\n    # Step 1: Compute weighted treated term: (D * Y) / ps\n    # Step 2: Compute weighted control term: ((1 - D) * Y) / (1 - ps)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "5.5"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray) -> float:\n    \"\"\"\n    Computes the Average Treatment Effect using Inverse Probability Weighting (IPW).\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n    ps : np.ndarray of shape (N,)\n        Propensity scores (strictly bounded between 0 and 1).\n\n    Returns\n    -------\n    float : Estimated ATE.\n    \"\"\"\n    # Clip propensity scores defensively to prevent zero division\n    ps_clipped = np.clip(ps, 1e-4, 1.0 - 1e-4)\n\n    # Step 1: Compute weighted treated term: (D * Y) / ps\n    treated_term = (d * y) / ps_clipped\n\n    # Step 2: Compute weighted control term: ((1 - D) * Y) / (1 - ps)\n    control_term = ((1 - d) * y) / (1.0 - ps_clipped)\n\n    # Step 3: ATE is the difference in empirical means\n    ate = float(np.mean(treated_term) - np.mean(control_term))\n\n    return ate"
        },
        "hints": {
          "tier1": {
            "en": "Extreme variance or `NaN` in estimated treatment effect.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Propensity scores near 0 or 1 produce exploding inverse weights that violate positivity/overlap.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Clip propensity scores within a safe numerical interval: `ps = np.clip(ps, 1e-4, 1.0 - 1e-4)`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A mobile fitness app company notes that users who voluntarily complete $30$ workouts a month ($D=1$) have resting heart rates $15$ beats per minute lower than users who do zero workouts ($D=0$). The marketing department drafts an ad claiming: *\"Our app lowers your resting heart rate by 15 bpm!\"* If the company subsequently conducts a strict Randomized Controlled Trial (forcing random cohorts to follow the regimen), why will the estimated causal effect likely be substantially smaller than $15$ bpm?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Because random assignment introduces measurement error into physiological heart rate monitors.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because the observational comparison suffered from massive selection bias: users who voluntarily work out 30 times a month are already younger, more health-conscious, and more biologically fit at baseline ($\\mathbb{E}[Y_i(0) \\mid D_i=1] < \\mathbb{E}[Y_i(0) \\mid D_i=0]$).",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because RCTs are only capable of identifying Local Average Treatment Effects (LATE), not ATE.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because the app's code runs faster on treated users' phones.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "causal-inference-confounding",
    "title": "Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation",
    "titleAr": "المخططات السببية الموجهة غير الدائرية ومسارات الفصل d",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In coastal towns during summer months, two statistics surge in perfect lockstep: 1. Daily ice cream sales skyrocket. 2.",
      "ar": "في المدن الساحلية خلال أشهر الصيف، يرتفع مؤشران إحصائيان بتزامن مذهل: 1. مبيعات المثلجات (الآيس كريم) تسجل أرقامًا قياسية. 2."
    },
    "prerequisites": [
      "selection-bias-randomized-trials",
      "bad-controls-mediators-overcontrolling"
    ],
    "x": 770,
    "y": 1030,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "CausalDagBackdoorLab",
        "narrative": {
          "en": "In coastal towns during summer months, two statistics surge in perfect lockstep:\n1. Daily ice cream sales skyrocket.\n2. Hospital emergency room drowning incidents spike.\n\nA naive regression of drowning deaths on ice cream sales shows a statistically significant, positive correlation with $p < 0.001$. Does eating delicious strawberry ice cream cause swimmers to cramp and drown? Should mayors ban ice cream parlors to save swimmers?\n\nOf course not. Both phenomena share a common cause: **Scorching Summer Heat ($Z$)**. When the thermometer hits 95°F (35°C), more people buy ice cream, and far more people go swimming in the ocean, mechanically increasing drowning accidents.\n\nIn the language of **Directed Acyclic Graphs (DAGs)** pioneered by Judea Pearl, Summer Heat is a **Confounder (Fork)**. It creates a spurious, non-causal statistical leakage known as a **Backdoor Path**:\n$$\\text{Ice Cream} \\leftarrow \\text{Heat} \\to \\text{Drowning}$$\nIf you don't control for heat, correlation flows freely through this backdoor pipe, fooling your regression into seeing causation where none exists.\n\nTo find the true causal effect, we must apply the **Backdoor Criterion**: identify all open backdoor paths and block them by conditioning on the common fork!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **DAG** | Directed Acyclic Graph: a causal map of arrows showing what influences what without circular loops. |\n| **Fork ($X \\leftarrow Z \\to Y$)** | Common cause: a shared parent creating an open backdoor channel between children. |\n| **Backdoor Path** | An open non-causal pathway pointing backward out of treatment and sneaking into the outcome. |\n| **Blocking / Conditioning** | Closing the pipe: holding the common cause constant so spurious correlation cannot leak. |\n| **d-Separation** | Graph rules that prove when two variables are statistically independent given a set of controls. |\n\n```text\n    THE FORK BACKDOOR PATH:\n\nSummer Heat (Z)\n                 /             \\\n       (Arrow In)               (Arrow In)\n               v                 v\n        Ice Cream (X) - - - - > Drowning (Y)\n                   (Spurious Phantom Correlation!)\n```",
          "ar": "في المدن الساحلية خلال أشهر الصيف، يرتفع مؤشران إحصائيان بتزامن مذهل:\n1. مبيعات المثلجات (الآيس كريم) تسجل أرقامًا قياسية.\n2. حالات الغرق في شواطئ البحر تسجل أعلى معدلاتها السنوية.\n\nإذا أجريت انحدارًا إحصائيًا، ستجد ارتباطًا وثيقًا بدلالة إحصائية قاطعة ($p < 0.001$). فهل يسبب تناول الآيس كريم تقلصات عضلية تؤدي للغرق؟ وهل يجب على عمدة المدينة إغلاق محال المثلجات لحماية السباحين؟\n\nبالتأكيد لا! فكلا الظاهرتين تشتركان في سبب أصلي واحد: **حرارة الصيف اللاهبة ($Z$)**. فعندما ترتفع درجات الحرارة، يشتري الناس مزيدًا من المثلجات، وفي الوقت ذاته يهرع الآلاف للسباحة في البحر مما يزيد حوادث الغرق.\n\nفي لغة **المخططات الموجهة غير الدائرية (DAGs)** التي ابتكرها جوديا بيرل، تسمى حرارة الصيف **عامل مربك (Fork)**، وهي تفتح مسارًا خلفيًا زائفًا:\n$$\\text{المثلجات} \\leftarrow \\text{الحرارة} \\to \\text{الغرق}$$\nهذا المسار الخلفي يسرّب ارتباطًا غير سببي يخدع النماذج الإحصائية.\n\nوللوصول إلى الحقيقة السببية، نطبق **معيار الباب الخلفي (Backdoor Criterion)**: نرصد جميع المسارات الخلفية المفتوحة ونغلقها عبر تثبيت العامل المشترك ومقارنة البيانات داخل كل درجة حرارة على حدة!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **مخطط DAG** | خريطة سببية بأسهم واضحة توضح اتجاهات التأثير دون أي حلقات دائرية مغلقة. |\n| **المفترق المشترك (Fork)** | أب مشترك: عامل واحد يفرع سهمين مسببًا علاقة ارتباط وهمية بين طرفيه. |\n| **المسار الخلفي (Backdoor)** | قناة تسريب خلفية غير سببية تنطلق من المعالجة وتتسلل نحو النتيجة. |\n| **سد المسار (Conditioning)** | إغلاق القناة: تثبيت العامل المشترك لمنع تسرب الارتباط الزائف. |\n| **الفصل الاتجاهي (d-separation)** | قواعد هندسية في الرسم تحدد متى يكون متغيران مستقلين إحصائيًا. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbb{P}(Y = y \\mid do(X = x)) = \\sum_{\\mathbf{z}} \\mathbb{P}(Y = y \\mid X = x, \\mathbf{Z} = \\mathbf{z}) \\mathbb{P}(\\mathbf{Z} = \\mathbf{z})",
        "formulaNote": {
          "en": "Core invariant for Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation.",
          "ar": "الخاصية الرياضية الجوهرية لـ المخططات السببية الموجهة غير الدائرية ومسارات الفصل d."
        },
        "narrative": {
          "en": "The corresponding Average Treatment Effect under subclassification across strata $k = 1, \\dots, K$ is:\n\n$$\n\\tau = \\sum_{k=1}^K \\left( \\mathbb{E}[Y \\mid D = 1, Z = k] - \\mathbb{E}[Y \\mid D = 0, Z = k] \\right) \\cdot \\mathbb{P}(Z = k)\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why does summing over $\\mathbb{P}(Z = z)$ simulate an intervention?**\n   In the real world, treatment $X$ depends on confounder $Z$. The do-operator $do(X = x)$ physically severs all arrows pointing into $X$. Weighting the conditional outcomes by the marginal distribution $\\mathbb{P}(Z = z)$ reconstructs what would happen if $X$ were set independently of $Z$!\n2. **Subclassification Intuition:**\n   Inside each stratum of temperature (e.g., only days where temperature is 80°F), temperature is held constant. The backdoor path is blocked, so any remaining difference between high ice cream consumption and low ice cream consumption reflects true direct impact (which is zero!).\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $do(X = x)$: Pearl's intervention operator simulating an active policy mandate.\n* $\\mathbf{Z}$: Conditioning set satisfying the backdoor criterion.\n* $\\mathbb{P}(Z = k)$: Proportion of the population in stratum $k$.\n* $\\tau$: Unconfounded causal Average Treatment Effect.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $do(X=x)$ | مشغل التدخل السببي لبيرل | محاكاة فرض التدخل بالقوة وقطع كافة الأسهم المؤثرة في المعالجة. |\n| $\\mathbf{Z}$ | مجموعة الضبط الخلفي | حزمة المتغيرات الكافية لسد وإغلاق جميع مسارات التسريب الخلفية. |\n| $\\mathbb{P}(Z=k)$ | الوزن النسبي للطبقة | النسبة المئوية التي تمثلها هذه الفئة في المجتمع الإحصائي الكلي. |\n| صيغة التعديل الخلفي | معادلة التعديل السببي | وزن النتائج الشرطية بأوزان المجتمع لعزل العلاقة السببية النقية. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the Backdoor Criterion adjustment formula via subclassification over discrete confounder strata. For each stratum of $Z$, compute the difference in treatment means, and compute the population-weighted ATE."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-causal-inference-confounding",
          "starterCode": "def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> float:\n    \"\"\"\n    Computes the ATE by blocking a discrete backdoor confounder via subclassification.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Target outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n    z : np.ndarray of shape (N,)\n        Discrete confounder strata labels.\n\n    Returns\n    -------\n    float : Unconfounded causal Average Treatment Effect.\n    \"\"\"\n    # Compute within-stratum difference in means\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "y = np.array([5.0, 7.0, 3.0, 4.0]); d = np.array([1, 1, 0, 0]); z = np.array([0, 1, 0, 1]); round(backdoor_subclassification_ate(y, d, z), 4)",
              "expected": "2.5"
            },
            {
              "input": "y = np.array([10.0, 2.0, 8.0, 1.0]); d = np.array([1, 0, 1, 0]); z = np.array([0, 0, 1, 1]); round(backdoor_subclassification_ate(y, d, z), 4)",
              "expected": "7.5"
            },
            {
              "input": "y = np.array([4.0, 2.0]); d = np.array([1, 0]); z = np.array([0, 0]); backdoor_subclassification_ate(y, d, z)",
              "expected": "2.0"
            }
          ],
          "expectedOutput": "2.5",
          "variants": {
            "python": {
              "starterCode": "def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> float:\n    \"\"\"\n    Computes the ATE by blocking a discrete backdoor confounder via subclassification.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Target outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n    z : np.ndarray of shape (N,)\n        Discrete confounder strata labels.\n\n    Returns\n    -------\n    float : Unconfounded causal Average Treatment Effect.\n    \"\"\"\n    # Compute within-stratum difference in means\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.5"
            }
          },
          "solution": "import numpy as np\n\ndef backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> float:\n    \"\"\"\n    Computes the ATE by blocking a discrete backdoor confounder via subclassification.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Target outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (0 or 1).\n    z : np.ndarray of shape (N,)\n        Discrete confounder strata labels.\n\n    Returns\n    -------\n    float : Unconfounded causal Average Treatment Effect.\n    \"\"\"\n    strata = np.unique(z)\n    n_total = len(y)\n    ate = 0.0\n\n    for s in strata:\n        stratum_mask = (z == s)\n        n_stratum = np.sum(stratum_mask)\n        p_stratum = n_stratum / n_total\n\n        # Compute within-stratum difference in means\n        treated_in_s = y[stratum_mask & (d == 1)]\n        control_in_s = y[stratum_mask & (d == 0)]\n\n        if len(treated_in_s) > 0 and len(control_in_s) > 0:\n            diff_s = float(np.mean(treated_in_s) - np.mean(control_in_s))\n            ate += diff_s * p_stratum\n\n    return float(ate)"
        },
        "hints": {
          "tier1": {
            "en": "Stratum weighting yields incorrect overall effect.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Weighting by the number of treated units in stratum $s$ instead of the total stratum population frequency $P(Z = s)$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "The backdoor adjustment formula weights by the marginal probability $P(Z = s) = \\frac{N_s}{N}$.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A public policy think-tank observes that cities with high police deployment ($X$) also experience higher crime rates ($Y$). A naive political pundit claims: *\"Police cause crime; deploying officers makes neighborhoods more dangerous!\"* In Judea Pearl's DAG framework, which node represents the confounding variable $Z$ on the backdoor path $X \\leftarrow Z \\to Y$, and what happens when the econometrician conditions on $Z$?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ المخططات السببية الموجهة غير الدائرية ومسارات الفصل d تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The number of police cars is the confounder; conditioning on it increases the positive bias.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Neighborhood baseline criminal activity / gang density is the confounder ($Z$); high baseline crime triggers both more police deployment ($Z \\to X$) and more recorded crimes ($Z \\to Y$). Conditioning on baseline crime blocks the backdoor path and reveals the true crime-reducing effect of policing.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Crime and police deployment form a collider; conditioning on crime causes Berkson's bias.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The think-tank is correct because DAGs cannot be applied to law enforcement data.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "collider-conditioning-berksons",
    "title": "Collider Conditioning & Berkson's Paradox",
    "titleAr": "تكييف المصادم ومفارقة بيركسون",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Have you ever heard someone complain: \"Why are attractive people on dating apps always so arrogant and rude?\" Or consider Hollywood actors:...",
      "ar": "هل سمعت يومًا من يشتكي قائلاً: \"لماذا يكون الأشخاص الجذابون على تطبيقات التعارف مغرورين وغير لطيفين؟\" أو تأمل ممثلي هوليوود المشهورين:..."
    },
    "prerequisites": [
      "causal-inference-confounding"
    ],
    "x": 790,
    "y": 1125,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ColliderStratificationLab",
        "narrative": {
          "en": "Have you ever heard someone complain: *\"Why are attractive people on dating apps always so arrogant and rude?\"*\n\nOr consider Hollywood actors: *why does it seem that extraordinarily talented actors are often conventionally unattractive, while gorgeous actors can't act?*\n\nAre talent and physical attractiveness naturally negatively correlated in the human population?\nOf course not! In the general population, acting talent and physical attractiveness are completely independent traits with zero correlation.\n\nSo why do they look negatively correlated on screen? **Berkson's Paradox** and **Collider Bias**.\n\nTo become a famous Hollywood actor, you generally need to be **either** exceptionally attractive **or** extraordinarily talented (or both). If someone has neither trait, they never get cast in a movie. The casting pool is a **Collider ($C$)**:\n$$\\text{Talent} \\to [\\text{Famous Actor}] \\leftarrow \\text{Attractiveness}$$\nBoth traits point inward toward fame.\n\nWhen you look only at famous actors, you are **conditioning on a collider**. Now, if you meet a famous actor who has mediocre acting talent, you immediately deduce that they *must* be stunningly attractive to have achieved fame! Conditioning on the collider forces two completely independent virtues into an artificial negative correlation!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Collider ($X \\to C \\leftarrow Y$)** | Inverted fork: a variable caused independently by two different inputs. |\n| **Berkson's Paradox** | Phantom trade-off: two independent traits becoming negatively correlated inside a selected group. |\n| **Conditioning on a Collider** | Filtering on an outcome that opens a spurious path between its causes. |\n| **Selection on the Dependent Variable** | Only analyzing cases that survived or succeeded, distorting causal reality. |\n| **Spurious Negative Correlation** | A fake statistical trade-off created purely by the filter applied to the sample. |\n\n```text\n    THE INVERTED FORK (COLLIDER):\n\nTalent (X) ---------------> [ Fame (Collider C) ] <--------------- Attractiveness (Y)\n                                             |\n                               (Conditioning on this box\n                             forces X and Y to look negatively\n                                     correlated!)\n```",
          "ar": "هل سمعت يومًا من يشتكي قائلاً: *\"لماذا يكون الأشخاص الجذابون على تطبيقات التعارف مغرورين وغير لطيفين؟\"*\n\nأو تأمل ممثلي هوليوود المشهورين: *لماذا يبدو أن الممثلين البارعين في التمثيل غالبًا ما يكونون متواضعي المظهر، بينما الممثلون فائقو الجمال لا يجيدون التمثيل؟*\n\nهل الموهبة والجمال متعارضان بطبيعتهما في البشر؟\nبالتأكيد لا! ففي عموم الناس، الموهبة الفنية والجمال الشكلي صفتان مستقلتان تمامًا لا ترابط بينهما.\n\nإذن لماذا يظهر بينهما ترابط سلبي في السينما؟ هذا هو **تناقض بيركسون (Berkson's Paradox)** الناتج عن **انحياز المصادم (Collider Bias)**.\n\nلتصبح ممثلاً مشهورًا في هوليوود، يجب أن تكون **إما** فائق الجمال **أو** عبقري الموهبة (أو الاثنين معًا). ومن لا يملك أيًا منهما لا ينجح في تجارب الأداء. الشهرة هنا هي **المُصادِم (Collider)**:\n$$\\text{الموهبة} \\to [\\text{الشهرة والممثلون المختارون}] \\leftarrow \\text{الجمال}$$\nالسهمان ينطلقان معًا ويصطدمان في صندوق الشهرة.\n\nعندما تقصر دراستك على المشاهير فقط، فأنت **تتحكم في مصادم**. فإذا شاهدت ممثلاً مشهورًا تمثيله ضعيف، تدرك فورًا أنه *لا بد وأن يكون فائق الجمال* ليحقق هذه الشهرة! هذا الانتقاء يحول الصفتين المستقلتين إلى علاقة عكسية وهمية ومضللة!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **المُصادِم (Collider)** | مفترق عكسي: متغير تصطدم فيه أسهم متعددة قادمة من أسباب مستقلة. |\n| **تناقض بيركسون** | مفارقة الفرز: نشوء ارتباط سلبي وهمي بين ميزتين مستقلتين داخل عينة منتقاة. |\n| **التحكم في مصادم** | حصر العينة في شرط ناتج عن المعالجة مما يفتح قنوات تسريب وهمية. |\n| **الانتقاء على النتيجة** | دراسة الناجين أو الفائزين فقط، مما يقلب قوانين السبب والنتيجة رأسًا على عقب. |\n| **الارتباط العكسي الزائف** | مقايضة إحصائية كاذبة وليدة الفلتر والانتقاء لا وجود لها في الأصل. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "X \\perp\\!\\!\\perp Y \\implies \\text{Cov}(X, Y) = 0",
        "formulaNote": {
          "en": "Core invariant for Collider Conditioning & Berkson's Paradox.",
          "ar": "الخاصية الرياضية الجوهرية لـ تكييف المصادم ومفارقة بيركسون."
        },
        "narrative": {
          "en": "Let collider $C$ be formed by their linear combination plus noise:\n\n$$\nC = X + Y + \\nu\n$$\n\nConditioning on collider stratum $C = c$ induces a non-zero, negative conditional covariance:\n\n$$\n\\text{Cov}(X, Y \\mid C = c) < 0\n$$\n\nIn DAG notation, a path containing a collider $X \\to C \\leftarrow Y$ is naturally **blocked** by default. Conditioning on $C$ (or any descendant of $C$) **activates and opens** the path!\n\n### Why the Math Works Step-by-Step\n\n1. **Intuitive Proof of Negative Covariance:**\n   If $C = X + Y$, then holding $C = 10$ constant means $Y = 10 - X$.\n   As $X$ increases, $Y$ must decrease to keep their sum equal to 10!\n   Thus, $\\frac{dY}{dX} = -1$, creating an artificial negative linear correlation where none existed in the unconditioned population.\n2. **The Danger of Conditioning on Hospitalization (Berkson's Original Case):**\n   If both Diabetes ($X$) and Respiratory Disease ($Y$) independently trigger hospital admission ($C = 1$), looking only at hospitalized patients creates an artificial negative correlation, making Diabetes look like it 'protects' against respiratory illness!\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $X \\to C \\leftarrow Y$: Unconditioned collider structure (path is closed and inactive).\n* $X \\to \\boxed{C} \\leftarrow Y$: Conditioned collider structure (path is opened, inducing bias).\n* $\\text{Cov}(X, Y \\mid C)$: Conditional covariance between independent causes given collider.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $X \\to C \\leftarrow Y$ | المصادم غير المشروط | مسار مسدود طبيعيًا: استقلالية تامة بين $X$ و $Y$ دون أي تسريب إحصائي. |\n| $\\boxed{C}$ | المصادم المشروط المقيد | فتح المسار بالقوة: نشوء علاقة سببية وهمية بين $X$ و $Y$ بسبب الفرز. |\n| $\\text{Cov}(X, Y \\mid C) < 0$ | التباين المشترك السالب المشروط | المقايضة الوهمية الناتجة عن تثبيت المجموع المشترك للقيم. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement a simulation of Berkson's paradox. Generate independent variables $X$ and $Y$, construct an admission collider $C = \\mathbb{I}(X + Y > \\tau)$, and demonstrate that unconditioned correlation is approximately zero while conditioned correlation is strongly negative."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-collider-conditioning-berksons",
          "starterCode": "def simulate_collider_bias(n: int, beta_direct: float = 0.0, selection_threshold: float = 0.0) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Paradox by conditioning on a collider C = X + Y.\n    \n    Parameters\n    ----------\n    n : int\n        Sample size.\n    beta_direct : float, default 0.0\n        True causal effect of X on Y (default 0).\n    selection_threshold : float, default 0.0\n        Threshold for collider selection C >= threshold.\n        \n    Returns\n    -------\n    dict with keys 'unconditioned_corr', 'conditioned_corr'\n    \"\"\"\n    # Generate two truly independent standard normal features\n    # Unconditioned correlation across whole population\n    # Collider C influenced independently by both X and Y\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "res = simulate_collider_bias(5000, 42); abs(res['unconditioned_corr']) < 0.05",
              "expected": "True"
            },
            {
              "input": "res = simulate_collider_bias(5000, 42); res['conditioned_corr'] < -0.2",
              "expected": "True"
            },
            {
              "input": "res = simulate_collider_bias(1000, 1801); 'sample_size_conditioned' in res",
              "expected": "True"
            }
          ],
          "expectedOutput": "True",
          "variants": {
            "python": {
              "starterCode": "def simulate_collider_bias(n: int, beta_direct: float = 0.0, selection_threshold: float = 0.0) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Paradox by conditioning on a collider C = X + Y.\n    \n    Parameters\n    ----------\n    n : int\n        Sample size.\n    beta_direct : float, default 0.0\n        True causal effect of X on Y (default 0).\n    selection_threshold : float, default 0.0\n        Threshold for collider selection C >= threshold.\n        \n    Returns\n    -------\n    dict with keys 'unconditioned_corr', 'conditioned_corr'\n    \"\"\"\n    # Generate two truly independent standard normal features\n    # Unconditioned correlation across whole population\n    # Collider C influenced independently by both X and Y\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef simulate_collider_bias(n: int, beta_direct: float = 0.0, selection_threshold: float = 0.0) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Paradox by conditioning on a collider C = X + Y.\n    \n    Parameters\n    ----------\n    n : int\n        Sample size.\n    beta_direct : float, default 0.0\n        True causal effect of X on Y (default 0).\n    selection_threshold : float, default 0.0\n        Threshold for collider selection C >= threshold.\n        \n    Returns\n    -------\n    dict with keys 'unconditioned_corr', 'conditioned_corr'\n    \"\"\"\n    rng = np.random.default_rng(42)\n    # Generate two truly independent standard normal features\n    X = rng.standard_normal(n)\n    Y = beta_direct * X + rng.standard_normal(n)\n\n    # Unconditioned correlation across whole population\n    unconditioned_corr = float(np.corrcoef(X, Y)[0, 1])\n\n    # Collider C influenced independently by both X and Y\n    C = X + Y + rng.standard_normal(n) * 0.1\n\n    # Condition on being in the selected upper tail (collider conditioning)\n    selected_mask = C >= selection_threshold\n    X_selected = X[selected_mask]\n    Y_selected = Y[selected_mask]\n\n    conditioned_corr = float(np.corrcoef(X_selected, Y_selected)[0, 1])\n\n    return {\n        \"unconditioned_corr\": unconditioned_corr,\n        \"conditioned_corr\": conditioned_corr,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Conditioned slope `b_cond` is zero or positive.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Adding $C$ as an outcome rather than a control regressor, or reversing causal arrows.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "In multiple regression `y = b0 + b1*x + b2*c`, $C$ enters as an explanatory variable alongside $X$.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A medical researcher analyzes clinical records exclusively from hospitalized patients and discovers that among patients with severe hypertension ($A$), the incidence of type-2 diabetes ($B$) is significantly lower than among hospitalized patients without hypertension. A health news blog publishes: *\"Surprising medical discovery: Hypertension protects against diabetes!\"* How should an epidemiologist trained in causal DAGs diagnose this study?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تكييف المصادم ومفارقة بيركسون تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The study is sound because hospital clinical records provide the highest grade of laboratory precision.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The finding is a textbook instance of Berkson's Fallacy: hospitalization ($C$) is a collider influenced by both severe hypertension and severe diabetes ($A \\to C \\leftarrow B$); conditioning on hospitalization creates a spurious negative correlation between two otherwise independent diseases.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The negative correlation proves diabetes and hypertension have opposite genetic origins.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The researcher should have used logistic regression to reverse the sign of the effect.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "instrumental-variables-2sls",
    "title": "Instrumental Variables (IV) Identification & The Wald Estimator",
    "titleAr": "التعريف بالمتغيرات الاداتية ومقدر فالد",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose an economist wants to measure the financial impact of military service: does serving in the army increase or decrease a veteran's...",
      "ar": "تخيل باحثًا يقيس الأثر المالي للخدمة العسكرية: هل تؤدي الخدمة في الجيش إلى زيادة أم خفض الدخل المدني للمحاربين القدامى طوال حياتهم؟ إذا..."
    },
    "prerequisites": [
      "causal-inference-confounding",
      "frisch-waugh-lovell-theorem"
    ],
    "x": 770,
    "y": 1220,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "InstrumentalVariablesLab",
        "narrative": {
          "en": "Suppose an economist wants to measure the financial impact of military service: *does serving in the army increase or decrease a veteran's lifetime civilian earnings?*\n\nIf you simply compare veterans to non-veterans in survey data, your estimate is severely contaminated. Enlisting is voluntary. People who volunteer for military service often come from lower-income rural towns, have fewer civilian job opportunities, or possess unique patriotic motivations. These unobserved background differences create severe confounding.\n\nIn the 1970s during the Vietnam War, the US government held the famous **Vietnam Draft Lottery**. Balls with every day of the year (January 1 through December 31) were placed in a glass drum and drawn on national television. Young men with lottery numbers drawn first were called up for mandatory military service; men with high numbers were spared.\n\nNotice what this draft lottery did:\n* Your birthday lottery number ($Z$) was decided by pure random chance.\n* Having a low lottery number dramatically increased your probability of serving in the military ($D$).\n* But your birthday has zero direct effect on your earnings 20 years later ($Y$), except through whether it pushed you into the military!\n\nThis lottery is the quintessential **Instrumental Variable (IV)**. An instrument acts like an 'exogenous nudge' from the heavens: it moves the treatment without having any direct relationship with the outcome or unobserved confounders!\n\nThe **Wald Estimator** calculates the causal effect with breathtaking simplicity: it takes the lottery's effect on earnings and divides it by the lottery's effect on military enlistment:\n$$\\text{Causal Effect} = \\frac{\\text{Impact of Lottery on Earnings}}{\\text{Impact of Lottery on Military Service}} = \\frac{\\text{Reduced Form}}{\\text{First Stage}}$$\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Instrumental Variable ($Z$)** | The exogenous nudge: a random lever that pushes treatment without affecting the outcome directly. |\n| **First Stage (Relevance)** | The lever works: the instrument actually moves the treatment variable ($Z \\to D$). |\n| **Exclusion Restriction** | The sole channel: the instrument affects the outcome ONLY through the treatment ($Z \\to D \\to Y$). |\n| **Reduced Form** | The raw intention: the direct relationship between the instrument and the outcome ($Z \\to Y$). |\n| **Wald Estimator** | The scaling ratio: dividing the reduced form by the first stage to recover the causal payoff. |\n\n```text\n    THE INSTRUMENTAL VARIABLE PIPELINE:\n\nUnobserved Background Confounders (U)\n                       /                  \\\n                      /                    \\\n                     v                      v\n    Instrument (Z) ====> Treatment (D) ======> Outcome (Y)\n    (Random Lottery)     (Military Service)     (Lifetime Earnings)\n         |                                           ^\n         \\========= No Direct Arrow Allowed! ========/\n```",
          "ar": "تخيل باحثًا يقيس الأثر المالي للخدمة العسكرية: *هل تؤدي الخدمة في الجيش إلى زيادة أم خفض الدخل المدني للمحاربين القدامى طوال حياتهم؟*\n\nإذا قارنت رواتب من خدموا في الجيش بمن لم يخدموا، ستكون النتيجة مشوهة تمامًا؛ فالالتحاق بالجيش قرار طوعي يتأثر بالخلفية الاقتصادية والفرص الوظيفية البديلة ومستوى التعليم. هذه الفروق الخفية تمثل انحيازًا مربكًا شديدًا.\n\nفي سبعينيات القرن الماضي خلال حرب فيتنام، أجرت الحكومة الأمريكية **قرعة التجنيد الشهيرة (Draft Lottery)**؛ حيث وُضعت تواريخ أيام السنة (من 1 يناير إلى 31 ديسمبر) في كرات زجاجية وسُحبت عشوائيًا على الهواء مباشرة. وكان الشباب أصحاب الأرقام الأولى يُستدعون إجباريًا للخدمة، بينما عُفي أصحاب الأرقام المتأخرة.\n\nتأمل ما حققته هذه القرعة العشوائية:\n* تاريخ ميلادك وسحب رقمك ($Z$) كان محض صدفة عشوائية مطلقة.\n* سحب رقم مبكر زاد بشكل كبير من احتمالية التحاق الشاب بالجيش ($D$).\n* لكن تاريخ ميلادك ليس له أي أثر مباشر على راتبك بعد 20 عامًا ($Y$) إلا من خلال كونه السبب في تجنيدك!\n\nهذه القرعة هي المثال الأبرز لـ **المتغير الأداتي (Instrumental Variable - IV)**؛ فهو بمثابة \"دفعة عشوائية خارجية\" تحرك المعالجة دون أن ترتبط بالمتغيرات المربكة.\n\nويحسب **مقدر فالد (Wald Estimator)** الأثر السببي ببساطة عبقرية: يقسم أثر القرعة على الراتب على أثر القرعة على التجنيد!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **المتغير الأداتي ($Z$)** | الرافعة العشوائية: عامل خارجي يحرك المعالجة دون أن يملك مسارًا مباشرًا نحو النتيجة. |\n| **المرحلة الأولى (الملاءمة)** | قوة الرافعة: قدرة المتغير الأداتي على تحريك وتغيير متغير المعالجة فعليًا ($Z \\to D$). |\n| **شرط الاستبعاد (Exclusion)** | المسار الوحيد: حظر وجود أي أثر للمتغير الأداتي على النتيجة إلا عبر المعالجة ($Z \\to D \\to Y$). |\n| **الصيغة المختزلة (Reduced Form)** | الأثر الإجمالي المباشر بين المتغير الأداتي والنتيجة النهائية ($Z \\to Y$). |\n| **مقدر فالد (Wald Estimator)** | نسبة التكبير: قسمة الصيغة المختزلة على المرحلة الأولى لاستخراج الأثر السببي الصافي. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "Y = \\beta_0 + \\beta_1 D + \\varepsilon",
        "formulaNote": {
          "en": "Core invariant for Instrumental Variables (IV) Identification & The Wald Estimator.",
          "ar": "الخاصية الرياضية الجوهرية لـ التعريف بالمتغيرات الاداتية ومقدر فالد."
        },
        "narrative": {
          "en": "A valid instrumental variable $Z$ must satisfy two fundamental identifying conditions:\n1. **Instrument Relevance:** $\\text{Cov}(Z, D) \\ne 0$ (the instrument predicts treatment).\n2. **Instrument Exogeneity (Exclusion Restriction):** $\\text{Cov}(Z, \\varepsilon) = 0$ (the instrument is uncorrelated with the error).\n\nTaking the covariance of both sides with $Z$:\n\n$$\n\\text{Cov}(Z, Y) = \\beta_1 \\text{Cov}(Z, D) + \\text{Cov}(Z, \\varepsilon) = \\beta_1 \\text{Cov}(Z, D) + 0\n$$\n\nSolving for $\\beta_1$ yields the population **Wald Estimator**:\n\n$$\n\\beta_1 = \\frac{\\text{Cov}(Z, Y)}{\\text{Cov}(Z, D)} = \\frac{\\mathbb{E}[Y \\mid Z = 1] - \\mathbb{E}[Y \\mid Z = 0]}{\\mathbb{E}[D \\mid Z = 1] - \\mathbb{E}[D \\mid Z = 0]}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why does dividing by $\\text{Cov}(Z, D)$ scale up the effect?**\n   The instrument $Z$ is often an intention or a nudge (e.g., winning a lottery ticket), not the treatment itself. The numerator measures the 'Intention-to-Treat' (ITT) effect on outcome $Y$. Because only a fraction of people comply with the nudge, the denominator measures the compliance rate. Dividing by compliance inflates the ITT back up to measure the full effect on those who were actually moved!\n2. **What happens if the instrument is weak ($\\text{Cov}(Z, D) \\approx 0$)?**\n   If the denominator is close to zero, the estimator divides by a tiny noisy number. The standard errors explode, and even the tiniest violation of exogeneity ($\\text{Cov}(Z, \\varepsilon) \\ne 0$) gets magnified into massive, catastrophic bias! This is the notorious **Weak Instrument Problem** (checked via First-Stage $F > 10$).\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $Z$: Instrumental variable satisfying relevance and exclusion restriction.\n* $D$: Endogenous treatment variable confounded by unobserved disturbance $\\varepsilon$.\n* $\\beta_1$: Structural causal effect identified by the instrument.\n* $\\hat{\\beta}_{\\text{Wald}}$: Sample Wald ratio of sample differences in means.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\text{Cov}(Z, Y)$ | التباين المشترك بين الأداة والنتيجة | الصيغة المختزلة: كم تحركت النتيجة استجابةً للرافعة الخارجية العشوائية. |\n| $\\text{Cov}(Z, D)$ | التباين المشترك بين الأداة والمعالجة | المرحلة الأولى: مدى استجابة الأفراد للرافعة والتحاقهم بالمعالجة فعليًا. |\n| $\\beta_{\\text{Wald}}$ | مقدر فالد السببي | ناتج قسمة الصيغة المختزلة على المرحلة الأولى لمعرفة الأثر الصافي لكل معالج. |\n| مشكلة الأداة الضعيفة | انهيار دقة الأداة | عندما يكون المقام قريبًا من الصفر فتتضخم الأخطاء المعيارية وتنعدم الثقة بالنتائج. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the empirical Wald estimator for a binary instrumental variable setting. Calculate the first-stage compliance rate, the reduced-form effect, and the resulting causal Wald estimate."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-instrumental-variables-2sls",
          "starterCode": "def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> float:\n    \"\"\"\n    Computes the Wald IV estimator: [E[Y|Z=1] - E[Y|Z=0]] / [E[D|Z=1] - E[D|Z=0]].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Endogenous treatment indicator.\n    z : np.ndarray of shape (N,)\n        Binary instrumental variable (0 or 1).\n\n    Returns\n    -------\n    float : Wald causal estimate.\n    \"\"\"\n    # Step 1: Compute reduced form difference in outcome Y\n    # Step 2: Compute first stage difference in treatment D\n    # Step 3: Wald ratio\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "y = np.array([4.0, 6.0, 1.0, 3.0]); d = np.array([1, 1, 0, 0]); z = np.array([1, 1, 0, 0]); res = compute_wald_estimator(y, d, z); round(res['wald_estimate'], 4)",
              "expected": "3.0"
            },
            {
              "input": "y = np.array([10.0, 6.0, 4.0, 2.0]); d = np.array([1, 0, 1, 0]); z = np.array([1, 1, 0, 0]); res = compute_wald_estimator(y, d, z); round(res['first_stage_compliance'], 4)",
              "expected": "0.0"
            },
            {
              "input": "y = np.array([8.0, 4.0]); d = np.array([1, 0]); z = np.array([1, 0]); res = compute_wald_estimator(y, d, z); 'reduced_form_intent' in res",
              "expected": "True"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> float:\n    \"\"\"\n    Computes the Wald IV estimator: [E[Y|Z=1] - E[Y|Z=0]] / [E[D|Z=1] - E[D|Z=0]].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Endogenous treatment indicator.\n    z : np.ndarray of shape (N,)\n        Binary instrumental variable (0 or 1).\n\n    Returns\n    -------\n    float : Wald causal estimate.\n    \"\"\"\n    # Step 1: Compute reduced form difference in outcome Y\n    # Step 2: Compute first stage difference in treatment D\n    # Step 3: Wald ratio\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> float:\n    \"\"\"\n    Computes the Wald IV estimator: [E[Y|Z=1] - E[Y|Z=0]] / [E[D|Z=1] - E[D|Z=0]].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Endogenous treatment indicator.\n    z : np.ndarray of shape (N,)\n        Binary instrumental variable (0 or 1).\n\n    Returns\n    -------\n    float : Wald causal estimate.\n    \"\"\"\n    z1_mask = (z == 1)\n    z0_mask = (z == 0)\n\n    # Step 1: Compute reduced form difference in outcome Y\n    mean_y_z1 = np.mean(y[z1_mask])\n    mean_y_z0 = np.mean(y[z0_mask])\n    reduced_form = mean_y_z1 - mean_y_z0\n\n    # Step 2: Compute first stage difference in treatment D\n    mean_d_z1 = np.mean(d[z1_mask])\n    mean_d_z0 = np.mean(d[z0_mask])\n    first_stage = mean_d_z1 - mean_d_z0\n\n    if abs(first_stage) < 1e-8:\n        raise ValueError(\"First stage is zero: Instrument has no relevance.\")\n\n    # Step 3: Wald ratio\n    wald_estimate = float(reduced_form / first_stage)\n\n    return wald_estimate"
        },
        "hints": {
          "tier1": {
            "en": "Discrepancy between `wald` and `ratio_cov`.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Using `np.cov` without setting `bias=True`, leading to mismatched sample normalization $N-1$ vs population $N$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Pass `bias=True` to `np.cov` or manually compute centered inner products `np.mean((y - y_bar) * (z - z_bar))`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "In his landmark study, Nobel laureate Joshua Angrist (1990) utilized the **Vietnam Draft Lottery** ($Z = 1$ if low lottery number assigned draft eligibility, $0$ otherwise) to estimate the causal effect of military service ($D$) on civilian earnings ($Y$). Why was the draft lottery number an exceptionally credible instrument satisfying both relevance and the exclusion restriction?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التعريف بالمتغيرات الاداتية ومقدر فالد تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Because having a low draft number directly boosted job skills and high-tech civilian wages.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Draft lottery numbers were assigned via a televised random ball draw (guaranteeing $\\text{Cov}(Z, \\varepsilon) = 0$), strongly influenced veteran status ($\\text{Cov}(Z, D) \\ne 0$), and had no biological or economic mechanism to affect civilian wages twenty years later other than through inducing military service.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because everyone drafted complied with military service ($100\\%$ compliance rate).",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because OLS was already unbiased, so the IV served only to confirm the textbook standard error.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "two-stage-least-squares-late",
    "title": "Two-Stage Least Squares (2SLS), Weak Instruments & LATE",
    "titleAr": "المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose a municipal school district offers an educational voucher via a random lottery to attend a prestigious private academy.",
      "ar": "تخيل إدارة تعليمية تجري قرعة عشوائية لمنح قسائم دراسية تتيح للطلاب الالتحاق بأكاديمية خاصة متميزة."
    },
    "prerequisites": [
      "instrumental-variables-2sls"
    ],
    "x": 790,
    "y": 1315,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "TwoStageLeastSquaresLateLab",
        "narrative": {
          "en": "Suppose a municipal school district offers an educational voucher via a random lottery to attend a prestigious private academy.\n\nIf every family who won the lottery enrolled in the academy, and every family who lost stayed in public school, you would have a perfect randomized experiment. But in the real world, human beings have free will:\n1. **Always-Takers:** Wealthy families who would pay out of pocket to attend the academy even if they lose the lottery.\n2. **Never-Takers:** Families who win the lottery but decline to enroll because the academy is too far from home.\n3. **Compliers:** Families who attend the academy **if and only if** they win the voucher!\n\nWho does our Instrumental Variable estimate actually represent?\n\nIn a breakthrough 1994 paper, Guido Imbens and Joshua Angrist proved that Two-Stage Least Squares (2SLS) does not estimate the effect on everybody. It estimates the **Local Average Treatment Effect (LATE)**: the causal effect specifically on the **Compliers**—the sub-population whose treatment status was actively switched by the instrument!\n\n**Two-Stage Least Squares (2SLS)** executes this mathematically in two clean steps:\n* **Stage 1:** Regress the messy, confounded treatment $D$ on the pure instrument $Z$ and controls. Keep the predicted values $\\hat{D}$ (the clean, cleansed treatment).\n* **Stage 2:** Regress the outcome $Y$ on the cleansed prediction $\\hat{D}$.\n\nBecause $\\hat{D}$ only contains variation originating from the pure instrument $Z$, all endogenous confounding has been scrubbed away!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Two-Stage Least Squares (2SLS)** | The two-step wash: purging endogeneity in Stage 1, estimating clean payoff in Stage 2. |\n| **LATE** | Local Average Treatment Effect: the causal payoff specifically for the Compliers. |\n| **Compliers** | The cooperative switchers: people who take treatment if nudged, but refrain if not nudged. |\n| **Always-Takers / Never-Takers** | The stubborn cases: people who take treatment (or refuse) regardless of the instrument. |\n| **Monotonicity (No Defiers)** | Nobody does the exact opposite of the nudge out of pure spite. |\n\n```text\n    THE FOUR COMPLIANCE SUB-POPULATIONS:\n\n| Wins Voucher (Z = 1) | Loses Voucher (Z = 0) |\n    ------------------+----------------------+-----------------------+\n    Always-Takers     | Attends Academy      | Attends Academy       | (Immune to nudge)\n    Never-Takers      | Public School        | Public School         | (Immune to nudge)\n    Compliers         | Attends Academy      | Public School         | ===> LATE Measures Them!\n    Defiers           | Public School        | Attends Academy       | (Ruled out by Monotonicity)\n```",
          "ar": "تخيل إدارة تعليمية تجري قرعة عشوائية لمنح قسائم دراسية تتيح للطلاب الالتحاق بأكاديمية خاصة متميزة.\n\nلو التزم الجميع بالقرعة، لأصبح لدينا تجربة عشوائية مثالية. ولكن في الواقع المعاش، يتصرف البشر بحرية وإرادة خاصة:\n1. **المشاركون دائمًا (Always-Takers):** أسر ثرية ستسجل أبناءها في الأكاديمية على أي حال حتى لو خسرت القرعة.\n2. **الممتنعون دائمًا (Never-Takers):** أسر تفوز بالقرعة لكنها ترفض الذهاب لبُعد مسافة المدرسة عن منزلها.\n3. **الممتثلون (Compliers):** أسر تسجل أبناءها في الأكاديمية **فقط وحصريًا إذا فازت بالقسيمة**!\n\nعلى من ينطبق التقدير الإحصائي الذي نحصل عليه إذن؟\n\nفي ورقة بحثية نالت جائزة نوبل، برهن غيدو إمبنز وجوشوا أنغريست أن طريقة المربعات الصغرى ذات المرحلتين (2SLS) لا تقيس الأثر على الجميع، بل تقيس **متوسط أثر المعالجة الموضعي (LATE)**: الأثر السببي الخاص بفئة **الممتثلين (Compliers)** الذين غيّرت القرعة سلوكهم الفعلي!\n\nوتنفذ طريقة **2SLS** هذا التطهير عبر مرحلتين:\n* **المرحلة الأولى:** انحدار المعالجة الملوثة $D$ على الأداة النقية $Z$ لاستخراج القيم المتوقعة $\\hat{D}$ (المعالجة النظيفة).\n* **المرحلة الثانية:** انحدار النتيجة $Y$ على المعالجة النظيفة $\\hat{D}$ وحدها.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **المربعات الصغرى بمرحلتين (2SLS)** | الغسيل المزدوج: تنقية المعالجة في المرحلة الأولى، وتقدير أثرها في المرحلة الثانية. |\n| **أثر المعالجة الموضعي (LATE)** | العائد السببي الخاص حصرًا بفئة \"الممتثلين\" الذين استجابوا للرافعة. |\n| **الممتثلون (Compliers)** | المتجاوبون: من يأخذون المعالجة إذا حثتهم الأداة ويمتنعون إذا لم تحثهم. |\n| **المشاركون / الممتنعون دائمًا** | الثابتون: أشخاص يتلقون العلاج (أو يرفضونه) بغض النظر عن نتيجة القرعة. |\n| **الرتابة (Monotonicity)** | فرضية استبعاد المعاندين: افتراض عدم وجود من يتعمد فعل عكس التوجيه عنادًا. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y} = \\mathbf{X}_1 \\boldsymbol{\\beta}_1 + \\mathbf{D} \\alpha + \\boldsymbol{\\varepsilon}",
        "formulaNote": {
          "en": "Core invariant for Two-Stage Least Squares (2SLS), Weak Instruments & LATE.",
          "ar": "الخاصية الرياضية الجوهرية لـ المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي."
        },
        "narrative": {
          "en": "where $\\mathbf{D}$ is endogenous and $\\mathbf{Z}$ is a matrix of valid excluded instruments.\n\n**Stage 1 Regression:** Project endogenous $\\mathbf{D}$ onto all exogenous variables $\\mathbf{W} = [\\mathbf{X}_1 \\quad \\mathbf{Z}]$:\n\n$$\n\\hat{\\mathbf{D}} = \\mathbf{P}_W \\mathbf{D} = \\mathbf{W}(\\mathbf{W}^T \\mathbf{W})^{-1} \\mathbf{W}^T \\mathbf{D}\n$$\n\n**Stage 2 Regression:** Substitute predicted $\\hat{\\mathbf{D}}$ into the outcome equation:\n\n$$\n\\mathbf{y} = \\mathbf{X}_1 \\boldsymbol{\\beta}_1 + \\hat{\\mathbf{D}} \\alpha + \\mathbf{u}\n$$\n\nUnder instrument validity and monotonicity, the Imbens-Angrist theorem proves:\n\n$$\n\\alpha_{\\text{2SLS}} = \\mathbb{E}[Y(1) - Y(0) \\mid \\text{Compliers}] \\equiv \\text{LATE}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why substitute $\\hat{\\mathbf{D}}$ instead of $\\mathbf{D}$?**\n   Because $\\mathbf{D} = \\hat{\\mathbf{D}} + \\mathbf{e}_D$, where $\\hat{\\mathbf{D}} \\in \\text{col}(\\mathbf{W})$ is strictly orthogonal to the structural error $\\boldsymbol{\\varepsilon}$. By replacing $\\mathbf{D}$ with its projection $\\hat{\\mathbf{D}}$, Stage 2 regression faces zero correlation between regressors and error!\n2. **The LATE Interpretation:**\n   Always-takers have $D_i(1) = D_i(0) = 1$ (difference is 0). Never-takers have $D_i(1) = D_i(0) = 0$ (difference is 0). The denominator $\\mathbb{E}[D(1) - D(0)]$ zeroes out everyone except Compliers!\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\mathbf{P}_W$: Projection matrix spanned by all exogenous covariates and instruments.\n* $\\hat{\\mathbf{D}}$: Purged treatment predictions containing zero endogenous variation.\n* $\\alpha_{\\text{2SLS}}$: Two-Stage Least Squares causal coefficient representing LATE.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\mathbf{P}_W$ | مصفوفة الإسقاط الموسعة | مصفوفة تسقط البيانات على فضاء كافة المتغيرات الخارجية والأدوات النقية. |\n| $\\hat{\\mathbf{D}}$ | المعالجة المطهرة | توقعات المعالجة بعد تجريدها من أي شوائب ترتبط بالخطأ العشوائي. |\n| $\\text{LATE}$ | الأثر الموضعي للممتثلين | القيمة السببية الصافية الخاصة بمن حركتهم الأداة دون غيرهم من أفراد العينة. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement a Two-Stage Least Squares (2SLS) estimation engine from first principles in NumPy. Verify that standard errors are constructed using the correct structural residuals rather than the second-stage fitted residuals."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-two-stage-least-squares-late",
          "starterCode": "def fit_2sls(y: np.ndarray, X_exog: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with exogenous covariates and instruments.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X_exog : np.ndarray of shape (N, K)\n        Exogenous covariates (including constant intercept column).\n    d : np.ndarray of shape (N,)\n        Endogenous treatment regressor.\n    z : np.ndarray of shape (N, L)\n        Excluded instrumental variables.\n\n    Returns\n    -------\n    dict with keys 'alpha_late', 'first_stage_f'\n    \"\"\"\n    # Full exogenous instrument matrix W = [X_exog, Z]\n    # Stage 1: Regress D on W to obtain fitted d_hat\n    # Stage 2: Regress Y on [X_exog, d_hat]\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "Z = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]); X = Z[:, 1:2] * 2.0; y = X[:, 0] * 3.0; res = fit_2sls(y, X, Z); round(float(res['beta_2sls'][0]), 4)",
              "expected": "3.0"
            },
            {
              "input": "Z = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0], [1.0, 4.0]]); X = Z[:, 1:2] * 2.0; y = X[:, 0] * 3.0; res = fit_2sls(y, X, Z); round(float(np.sum(res['structural_residuals']**2)), 4)",
              "expected": "0.0"
            },
            {
              "input": "Z = np.array([[1.0, 0.0], [1.0, 1.0], [1.0, 2.0]]); X = np.array([[1.0], [2.0], [3.0]]); y = np.array([2.0, 4.0, 6.0]); res = fit_2sls(y, X, Z); 'se' in res",
              "expected": "True"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def fit_2sls(y: np.ndarray, X_exog: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with exogenous covariates and instruments.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X_exog : np.ndarray of shape (N, K)\n        Exogenous covariates (including constant intercept column).\n    d : np.ndarray of shape (N,)\n        Endogenous treatment regressor.\n    z : np.ndarray of shape (N, L)\n        Excluded instrumental variables.\n\n    Returns\n    -------\n    dict with keys 'alpha_late', 'first_stage_f'\n    \"\"\"\n    # Full exogenous instrument matrix W = [X_exog, Z]\n    # Stage 1: Regress D on W to obtain fitted d_hat\n    # Stage 2: Regress Y on [X_exog, d_hat]\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_2sls(y: np.ndarray, X_exog: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with exogenous covariates and instruments.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X_exog : np.ndarray of shape (N, K)\n        Exogenous covariates (including constant intercept column).\n    d : np.ndarray of shape (N,)\n        Endogenous treatment regressor.\n    z : np.ndarray of shape (N, L)\n        Excluded instrumental variables.\n\n    Returns\n    -------\n    dict with keys 'alpha_late', 'first_stage_f'\n    \"\"\"\n    n = len(y)\n    d_col = d if d.ndim == 2 else d[:, np.newaxis]\n    z_col = z if z.ndim == 2 else z[:, np.newaxis]\n\n    # Full exogenous instrument matrix W = [X_exog, Z]\n    W = np.column_stack([X_exog, z_col])\n\n    # Stage 1: Regress D on W to obtain fitted d_hat\n    gamma = np.linalg.solve(W.T @ W, W.T @ d_col)\n    d_hat = W @ gamma\n\n    # Stage 2: Regress Y on [X_exog, d_hat]\n    X_stage2 = np.column_stack([X_exog, d_hat])\n    beta_stage2 = np.linalg.solve(X_stage2.T @ X_stage2, X_stage2.T @ y)\n\n    # Treatment coefficient is the last element\n    alpha_late = float(beta_stage2[-1])\n\n    # First stage F-statistic (simplified heuristic)\n    d_res = d_col - d_hat\n    f_stat = float(np.var(d_hat) / (np.var(d_res) + 1e-10))\n\n    return {\n        \"alpha_late\": alpha_late,\n        \"first_stage_f\": f_stat,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Standard errors are severely underestimated or fail unit tests.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "The classic \"2SLS Second-Stage Trap\": computing residuals using fitted values $\\hat{X}$ (`y - X_hat @ beta`) rather than observed features $X$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Always evaluate structural residuals using original observed data: `residuals = y - X @ beta_2sls`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A municipal workforce development board evaluates an intensive job retraining program by randomly mailing training vouchers ($Z = 1$) to $5,000$ unemployed workers. Some workers who receive vouchers do not attend ($Z=1, D=0$), while some highly motivated control workers find free alternative training ($Z=0, D=1$). Under the Angrist-Imbens LATE framework, who does the resulting 2SLS estimate represent, and what does the **Monotonicity Assumption** guarantee?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The estimate represents the average impact across every unemployed person in the city; monotonicity guarantees zero variance.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The estimate identifies the causal return exclusively for **Compliers** (workers who attend training *if and only if* they receive the voucher); Monotonicity rules out \"Defiers\" (individuals who would attend training if denied a voucher, but refuse to attend if given one).",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The estimate represents the Always-Takers because their high motivation makes them most productive.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "2SLS is invalid whenever compliance is less than $100\\%$.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "panel-data-fixed-effects",
    "title": "Panel Fixed Effects (Within Estimator) & De-meaning Geometry",
    "titleAr": "الآثار الثابتة لبيانات البانل ومقدر التحويل الداخلي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose a policy researcher wants to answer a critical urban question: does hiring more police officers reduce city crime rates? You...",
      "ar": "تخيل باحثًا في السياسات العامة يريد الإجابة عن سؤال أمني حاسم: هل يؤدي توظيف مزيد من أفراد الشرطة إلى خفض معدلات الجريمة في المدن؟ جمعت..."
    },
    "prerequisites": [
      "multiple-regression-matrix-calculus"
    ],
    "x": 770,
    "y": 1410,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PanelFixedEffectsWithinLab",
        "narrative": {
          "en": "Suppose a policy researcher wants to answer a critical urban question: *does hiring more police officers reduce city crime rates?*\n\nYou collect data across 500 cities in a single year. You run a cross-sectional regression of crime on police officers per capita. To your horror, the regression produces a large, positive coefficient: cities with more police have *higher* crime rates! Does hiring police cause crime?\n\nOf course not. Tourist capitals and bustling port cities (like New York or Miami) naturally have higher baseline crime due to high density, bustling nightlife, and transient tourist crowds. Because these cities have high baseline crime, their mayors hire more police officers. This unobserved, permanent city personality is an omitted confounder.\n\nNow imagine you collect **Panel Data**: you follow the **same 500 cities over 10 consecutive years**.\n\nInstead of comparing Miami to a quiet rural town, you compare **Miami in 2024 to Miami in 2020**! Miami's ocean geography, sunny climate, and cultural identity are permanent—they stay identical year after year.\n\nBy subtracting each city's own 10-year average from its yearly data (the **Within Transformation**), every city acts as its own twin control! All permanent, unmeasured city traits ($\\alpha_i$) vanish completely into thin air, leaving only the clean, year-over-year causal impact of police changes on crime changes.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Panel Data** | Longitudinal tracking: following the same subjects (people, firms, cities) repeatedly over time. |\n| **Entity Fixed Effects ($\\alpha_i$)** | Individual personality: unmeasured traits of an entity that never change over time. |\n| **Within Transformation** | Demeaning: subtracting each entity's personal average over time to erase permanent traits. |\n| **Between Variation** | Differences between different entities (comparing Miami to Des Moines). |\n| **Within Variation** | Fluctuations inside the same entity over time (comparing Miami in 2024 to Miami in 2020). |\n\n```text\n    PANEL DATA WITHIN TRANSFORMATION:\n\nCity Crime\n      ^\n      |      * Miami 2024 (Police hired, crime dropped relative to Miami mean!)\n      |     /\n      |    * Miami 2020 (Baseline Miami average: high crime, high police)\n      |\n      |          * Des Moines 2024\n      |         /\n      |        * Des Moines 2020 (Baseline Des Moines: low crime, low police)\n      0------------------------------------------------------------------> Police Officers\n       (Comparing across cities is confounded; comparing within cities is clean!)\n```",
          "ar": "تخيل باحثًا في السياسات العامة يريد الإجابة عن سؤال أمني حاسم: *هل يؤدي توظيف مزيد من أفراد الشرطة إلى خفض معدلات الجريمة في المدن؟*\n\nجمعت بيانات 500 مدينة في عام واحد، وأجريت انحدارًا لمعدل الجريمة على عدد أفراد الشرطة. وصدمتك النتيجة: المعامل موجب وقوي! أي أن المدن التي تضم عددًا أكبر من الشرطة تشهد جرائم أكثر! فهل زيادة الشرطة تسبب الجريمة؟!\n\nبالتأكيد لا! فالمدن السياحية الكبرى والموانئ المكتظة (مثل نيويورك وميامي) لديها طبيعة جغرافية وسياحية واقتصادية تجعل معدل الجريمة فيها مرتفعًا بطبيعته، ولهذا السبب تحديدًا يعين عمدتها أعدادًا غفيرة من الشرطة. هذه السمات الثابتة الخاصة بكل مدينة تمثل متغيرًا مربكًا خفيًا.\n\nالآن تخيل أنك جمعت **بيانات طولية (Panel Data)**: قمت بتتبع **نفس الـ 500 مدينة سنويًا لمدة 10 سنوات متتالية**.\n\nبدلاً من مقارنة ميامي بقرية ريفية هادئة، ستقارن **ميامي في 2024 بميامي نفسها في 2020**! فجغرافية ميامي ومناخها وطبيعتها السكانية ثابتة لم تتغير.\n\nوعندما تطرح متوسط كل مدينة الخاص عبر السنوات العشر من بياناتها السنوية (**تحويل الخصم الداخلي - Within Transformation**)، تتبخر كل هذه العوامل الدائمة ($\\alpha_i$) في الهواء! وتصبح كل مدينة بمثابة شاهد وضابط لنفسها، مما يكشف الأثر الحقيقي لزيادة الشرطة.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **البيانات الطولية (Panel Data)** | تتبع السجلات لنفس الأفراد أو الشركات أو المدن عبر نقاط زمنية متعددة. |\n| **الآثار الثابتة ($\\alpha_i$)** | البصمة الدائمة: الخصائص الفردية غير المقاسة للكيان التي لا تتغير مع مرور الزمن. |\n| **التحويل الداخلي (Within)** | تصفير المتوسط: طرح متوسط الكيان الشخصي لإبادة ومحو كافة سماته الدائمة. |\n| **التباين بين الكيانات (Between)** | الفروق بين الكيانات المختلفة (مثل مقارنة مدينة ساحلية بمدينة زراعية). |\n| **التباين داخل الكيان (Within)** | التغيرات التي تطرأ على الكيان ذاته من سنة لأخرى عبر الزمن. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "y_{it} = \\mathbf{x}_{it}^T \\boldsymbol{\\beta} + \\alpha_i + \\varepsilon_{it}",
        "formulaNote": {
          "en": "Core invariant for Panel Fixed Effects (Within Estimator) & De-meaning Geometry.",
          "ar": "الخاصية الرياضية الجوهرية لـ الآثار الثابتة لبيانات البانل ومقدر التحويل الداخلي."
        },
        "narrative": {
          "en": "where $\\alpha_i$ is an unobserved time-invariant individual effect that may be arbitrarily correlated with regressors $\\mathbf{x}_{it}$ ($\\mathbb{E}[\\alpha_i \\mid \\mathbf{x}_{it}] \\ne 0$).\n\nCompute the entity-specific time average:\n\n$$\n\\bar{y}_i = \\frac{1}{T} \\sum_{t=1}^T y_{it} = \\bar{\\mathbf{x}}_i^T \\boldsymbol{\\beta} + \\alpha_i + \\bar{\\varepsilon}_i\n$$\n\nSubtracting the entity mean from the original equation yields the **Within Transformation**:\n\n$$\n(y_{it} - \\bar{y}_i) = (\\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i)^T \\boldsymbol{\\beta} + (\\alpha_i - \\alpha_i) + (\\varepsilon_{it} - \\bar{\\varepsilon}_i)\n$$\n\n$$\n\\ddot{y}_{it} = \\ddot{\\mathbf{x}}_{it}^T \\boldsymbol{\\beta} + \\ddot{\\varepsilon}_{it}\n$$\n\nBecause $\\alpha_i - \\alpha_i = 0$, the individual heterogeneity is completely wiped out!\n\n### Why the Math Works Step-by-Step\n\n1. **Why does Fixed Effects solve time-invariant confounding?**\n   Any variable that does not change over time for entity $i$ (such as geography, DNA, or founding charter) has $x_{it} = \\bar{x}_i \\implies \\ddot{x}_{it} = 0$. Because its demeaned value is zero, its confounding effect on $\\boldsymbol{\\beta}$ is destroyed.\n2. **The Trade-Off: Time-Invariant Features Cannot Be Estimated:**\n   Because any strictly time-invariant feature (like biological sex or birth state) becomes identical to zero after demeaning, Fixed Effects cannot estimate their coefficients.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\alpha_i$: Entity fixed effect (unobserved time-invariant heterogeneity).\n* $\\ddot{y}_{it} = y_{it} - \\bar{y}_i$: Demeaned within-transformed outcome.\n* $\\ddot{\\mathbf{x}}_{it} = \\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i$: Demeaned within-transformed regressors.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} = (\\ddot{\\mathbf{X}}^T \\ddot{\\mathbf{X}})^{-1} \\ddot{\\mathbf{X}}^T \\ddot{\\mathbf{y}}$: Within Fixed Effects OLS estimator.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\alpha_i$ | الأثر الثابت للكيان | العوامل الفردية الدائمة التي قد ترتبط بالميزات وتسبب انحيازًا مربكًا. |\n| $\\ddot{y}_{it}$ | النتيجة الممركزة داخليًا | انحراف نتيجة الكيان في سنة معينة عن متوسطه التاريخي عبر السنوات. |\n| $\\ddot{\\mathbf{x}}_{it}$ | الميزات الممركزة داخليًا | تذبذب الميزات من سنة لأخرى بعد إسقاط وحذف متوسطها التاريخي. |\n| $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$ | مقدر الآثار الثابتة | المقدر السببي النقي الذي يعتمد حصريًا على التغيرات الزمنية داخل الكيان. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the panel fixed effects within-estimator in NumPy. Demean both $y$ and $X$ by entity group, solve for $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$, and back out the estimated entity intercepts $\\hat{\\alpha}_i$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-panel-data-fixed-effects",
          "starterCode": "def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Fits Panel Fixed Effects model using the Within (Demeaning) Transformation.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N*T,)\n        Observed panel outcome.\n    X : np.ndarray of shape (N*T, K)\n        Panel regressors.\n    entity_ids : np.ndarray of shape (N*T,)\n        Integer or category identifiers for entities.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Estimated beta vector.\n    \"\"\"\n    # Step 1: Demean within each entity group\n    # Step 2: Fit OLS on demeaned variables: (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "y = np.array([10.0, 12.0, 20.0, 22.0]); X = np.array([[1.0], [2.0], [1.0], [2.0]]); ids = np.array([0, 0, 1, 1]); res = fit_panel_fe(y, X, ids); round(float(res['beta_fe'][0]), 4)",
              "expected": "2.0"
            },
            {
              "input": "y = np.array([5.0, 7.0, 15.0, 17.0]); X = np.array([[2.0], [4.0], [2.0], [4.0]]); ids = np.array([0, 0, 1, 1]); res = fit_panel_fe(y, X, ids); round(float(res['beta_fe'][0]), 4)",
              "expected": "1.0"
            },
            {
              "input": "y = np.array([3.0, 5.0, 7.0, 9.0]); X = np.array([[1.0], [2.0], [1.0], [2.0]]); ids = np.array([0, 0, 1, 1]); res = fit_panel_fe(y, X, ids); len(res['entity_alphas'])",
              "expected": "2"
            }
          ],
          "expectedOutput": "2.0",
          "variants": {
            "python": {
              "starterCode": "def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Fits Panel Fixed Effects model using the Within (Demeaning) Transformation.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N*T,)\n        Observed panel outcome.\n    X : np.ndarray of shape (N*T, K)\n        Panel regressors.\n    entity_ids : np.ndarray of shape (N*T,)\n        Integer or category identifiers for entities.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Estimated beta vector.\n    \"\"\"\n    # Step 1: Demean within each entity group\n    # Step 2: Fit OLS on demeaned variables: (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Fits Panel Fixed Effects model using the Within (Demeaning) Transformation.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N*T,)\n        Observed panel outcome.\n    X : np.ndarray of shape (N*T, K)\n        Panel regressors.\n    entity_ids : np.ndarray of shape (N*T,)\n        Integer or category identifiers for entities.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Estimated beta vector.\n    \"\"\"\n    unique_entities = np.unique(entity_ids)\n    y_demeaned = np.zeros_like(y, dtype=float)\n    X_demeaned = np.zeros_like(X, dtype=float)\n\n    # Step 1: Demean within each entity group\n    for ent in unique_entities:\n        mask = (entity_ids == ent)\n        y_demeaned[mask] = y[mask] - np.mean(y[mask])\n        X_demeaned[mask] = X[mask] - np.mean(X[mask], axis=0)\n\n    # Step 2: Fit OLS on demeaned variables: (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    beta = np.linalg.solve(X_demeaned.T @ X_demeaned, X_demeaned.T @ y_demeaned)\n\n    return beta"
        },
        "hints": {
          "tier1": {
            "en": "Time-invariant regressors cause singular matrix errors in `np.linalg.solve`.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "The Within-Transformation completely wipes out time-invariant variables ($x_{it} - \bar{x}_i = 0$), inducing columns of zeros in `X_tilde`.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Only include time-varying regressors in fixed-effects models; time-invariant traits are absorbed into $\u0007lpha_i$.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A graduate student sets out to estimate the labor market wage penalty of birthplace (being born in a rural county vs a metropolitan city) using a 15-year panel tracking $10,000$ workers. She specifies an individual Fixed Effects (within) model. When she inspects her regression output, the `rural_birthplace` coefficient is missing, displaying `NaN` or `Dropped due to collinearity`. Why did this occur, and what trade-off does Fixed Effects enforce?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الآثار الثابتة لبيانات البانل ومقدر التحويل الداخلي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The statistical package had a memory leak due to the large panel dimension.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Birthplace is strictly time-invariant for each person ($x_{it} = \\bar{x}_i$ for all $t$); the within-transformation demeans it to exact zero ($\\ddot{x}_{it} = 0$), causing perfect multicollinearity. Fixed Effects permanently eliminates all time-invariant variables alongside the unobserved fixed effects.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Rural birthplace has no causal relationship with earnings in any econometric model.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The student should have used first differences to retain the birthplace coefficient.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "random-effects-hausman-test",
    "title": "Random Effects, First-Differencing, and the Hausman Test",
    "titleAr": "الآثار العشوائية والفروق الأولى واختبار هاوسمان",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose an e-commerce platform studies employee performance across 200 regional call centers over 8 quarters.",
      "ar": "تخيل متجرًا إلكترونيًا يدرس أداء 200 مركز خدمة عملاء عبر 8 فصول مالية، بهدف معرفة أثر المكافآت الفصلية على رضا العملاء."
    },
    "prerequisites": [
      "panel-data-fixed-effects"
    ],
    "x": 790,
    "y": 1505,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RandomEffectsHausmanLab",
        "narrative": {
          "en": "Suppose an e-commerce platform studies employee performance across 200 regional call centers over 8 quarters. You want to estimate how quarterly incentive bonuses impact customer satisfaction scores.\n\nYou have panel data. You know that Fixed Effects (FE) is the safest choice because it controls for unmeasured branch traits (like local work ethic or regional dial habits). But Fixed Effects comes with a heavy price tag: by throwing away all cross-branch comparisons, FE burns statistical degrees of freedom, producing wider confidence intervals.\n\nWhat if unmeasured branch traits are completely unrelated to bonus policy?\nIf branch personality is pure random noise uncorrelated with bonuses, you can use **Random Effects (RE)**! Random Effects blends within-branch time variation with between-branch differences, delivering tighter standard errors and maximum statistical efficiency.\n\nHow do you know if you are allowed to use Random Effects without corrupting your findings?\n\nEnter the **Hausman Specification Test**:\n* If branch traits are truly uncorrelated with bonuses, both FE and RE will converge to the exact same numbers.\n* If branch traits ARE confounded, RE will drift away and produce biased numbers, while FE stands firm.\n\nThe Hausman test compares the distance between $\\hat{\\beta}_{\\text{FE}}$ and $\\hat{\\beta}_{\\text{RE}}$. If they diverge significantly, you reject Random Effects and stick with Fixed Effects!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Fixed Effects (FE)** | The bulletproof shield: consistent even if entity traits are heavily confounded with features. |\n| **Random Effects (RE)** | The efficiency champion: optimal when entity traits are pure random noise uncorrelated with features. |\n| **Hausman Test** | The scientific referee: tests whether the difference between FE and RE is statistically significant. |\n| **Quasi-Demeaning ($\\theta$)** | Partial demeaning: subtracting a fraction $\\theta$ of the group average to preserve efficiency. |\n| **GLS (Generalized Least Squares)** | Weighted estimation accounting for correlation in error disturbances over time. |\n\n```text\n    THE PANEL ESTIMATOR DECISION TREE:\n\nAre unmeasured traits (alpha_i) correlated with features (X)?\n                                       /              \\\n                                     (Yes)            (No)\n                                     /                  \\\n                    Use Fixed Effects (FE)        Use Random Effects (RE)\n                    [Consistent & Unbiased]       [More Efficient & Narrower SEs]\n                                      ^                  ^\n                                       \\                /\n                                  Hausman Test Tests This Difference!\n```",
          "ar": "تخيل متجرًا إلكترونيًا يدرس أداء 200 مركز خدمة عملاء عبر 8 فصول مالية، بهدف معرفة أثر المكافآت الفصلية على رضا العملاء.\n\nلديك بيانات طولية (Panel Data). تعلم أن نموذج الآثار الثابتة (FE) هو الخيار الأكثر أمانًا لأنه يحيد أي فروق غير مقاسة بين الفروع. لكن الآثار الثابتة لها ثمن باهظ: فهي تهدر درجات الحرية وتنتج أخطاء معيارية متسعة لأنها تلقي بجميع المقارنات بين الفروع في سلة المهملات.\n\nماذا لو كانت الفروق الفردية بين الفروع مجرد تشويش عشوائي بريء لا يرتبط إطلاقًا بنظام المكافآت؟\nحينها يمكنك استخدام **الآثار العشوائية (Random Effects - RE)**! يمزج هذا النموذج التغيرات الزمنية مع الفروق بين الفروع، مما يعطيك أعلى كفاءة إحصائية وأضيق فترات ثقة.\n\nكيف تحسم القرار بين الأمان والكفاءة بصورة علمية منضبطة؟\n\nعبر **اختبار هوسمان (Hausman Specification Test)**:\n* إذا كانت الفروق بين الفروع بريئة وغير مرتبطة بالمتغيرات، فإن كلا المقدرين (FE و RE) سيعطيان نفس الأرقام تقريبًا.\n* أما إذا كان هناك انحياز مربك، فإن مقدر RE سينحرف ويفشل، بينما يظل مقدر FE صامدًا ودقيقًا.\n\nيقيس اختبار هوسمان المسافة الرياضية بين تقديرات المقدرين؛ فإن تباعدا تباعدًا دالاً، نرفض الآثار العشوائية ونتمسك بالآثار الثابتة!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **الآثار الثابتة (FE)** | الدرع الواقي: نموذج موثوق ومتسق حتى لو ارتبطت سمات الكيان بالميزات ارتباطًا وثيقًا. |\n| **الآثار العشوائية (RE)** | بطل الكفاءة: الخيار الأمثل والأعلى دقة عندما تكون سمات الكيان مجرد صدفة عشوائية. |\n| **اختبار هوسمان** | الحكم العلمي: يختبر ما إذا كان الفارق بين تقديرات FE و RE يتجاوز حدود الصدفة. |\n| **الخصم شبه الداخلي ($\\theta$)** | طرح جزئي للمتوسط: خصم نسبة $\\theta$ من متوسط الكيان للحفاظ على كفاءة التقدير. |\n| **المربعات الصغرى المعممة (GLS)** | طريقة رياضية توزن المشاهدات لمراعاة ترابط الأخطاء عبر الفترات الزمنية. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "y_{it} - \\theta \\bar{y}_i = (\\mathbf{x}_{it} - \\theta \\bar{\\mathbf{x}}_i)^T \\boldsymbol{\\beta} + \\text{error}, \\quad \\theta = 1 - \\sqrt{\\frac{\\sigma_\\varepsilon^2}{\\sigma_\\varepsilon^2 + T \\sigma_\\alpha^2}}",
        "formulaNote": {
          "en": "Core invariant for Random Effects, First-Differencing, and the Hausman Test.",
          "ar": "الخاصية الرياضية الجوهرية لـ الآثار العشوائية والفروق الأولى واختبار هاوسمان."
        },
        "narrative": {
          "en": "**The Hausman Test Statistic:**\nUnder the null hypothesis $H_0: \\text{Cov}(\\alpha_i, \\mathbf{x}_{it}) = 0$, both FE and RE are consistent, but RE is asymptotically efficient:\n\n$$\nH = (\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}})^T \\left[ \\mathbb{V}[\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}] - \\mathbb{V}[\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}] \\right]^{-1} (\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) \\sim \\chi^2(K)\n$$\n\nUnder the alternative $H_1$, FE remains consistent while RE is biased.\n\n### Why the Math Works Step-by-Step\n\n1. **Why does $\\mathbb{V}[\\hat{\\beta}_{\\text{FE}}] - \\mathbb{V}[\\hat{\\beta}_{\\text{RE}}]$ appear in the denominator?**\n   Because RE is the efficient estimator under the null hypothesis, the celebrated lemma of Hausman proves that $\\text{Cov}(\\hat{\\beta}_{\\text{FE}} - \\hat{\\beta}_{\\text{RE}}, \\hat{\\beta}_{\\text{RE}}) = 0$. Consequently:\n   $$\\mathbb{V}[\\hat{\\beta}_{\\text{FE}} - \\hat{\\beta}_{\\text{RE}}] = \\mathbb{V}[\\hat{\\beta}_{\\text{FE}}] - \\mathbb{V}[\\hat{\\beta}_{\\text{RE}}]$$\n2. **Decision Rule:**\n   If $H > \\chi^2_{\\alpha}(K)$ (p-value $< 0.05$), reject $H_0$. The Random Effects assumption fails; you must report Fixed Effects.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$: Consistent within-estimator under both $H_0$ and $H_1$.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}$: Efficient GLS estimator under $H_0$, biased under $H_1$.\n* $H$: Hausman quadratic test statistic distributed asymptotically as chi-squared with $K$ degrees of freedom.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\theta$ | معامل الخصم شبه الداخلي | نسبة الخصم التي تتراوح بين 0 (انحدار تجميعي) و 1 (آثار ثابتة كاملة). |\n| $H$ | إحصائية اختبار هوسمان | المسافة التربيعية الموزونة الفاصلة بين تقديرات النموذجين. |\n| $\\chi^2(K)$ | توزيع كاي-تربيع | التوزيع الاحتمالي النظري لاختبار الدلالة بدرجات حرية مساوية لعدد المعلمات. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the Hausman specification test statistic comparing parameter estimates and asymptotic covariance matrices from Fixed Effects and Random Effects models."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-random-effects-hausman-test",
          "starterCode": "def compute_hausman_test(\n    beta_fe: np.ndarray,\n    vcov_fe: np.ndarray,\n    beta_re: np.ndarray,\n    vcov_re: np.ndarray\n) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman specification test statistic: (b_fe - b_re)' [V_fe - V_re]^(-1) (b_fe - b_re).\n\n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n    vcov_fe : np.ndarray of shape (K, K)\n    beta_re : np.ndarray of shape (K,)\n    vcov_re : np.ndarray of shape (K, K)\n\n    Returns\n    -------\n    dict with keys 'h_stat', 'df'\n    \"\"\"\n    # Solve for quadratic form safely\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "b_fe = np.array([2.0]); v_fe = np.array([[0.04]]); b_re = np.array([2.0]); v_re = np.array([[0.01]]); round(compute_hausman_test(b_fe, v_fe, b_re, v_re)['stat'], 4)",
              "expected": "0.0"
            },
            {
              "input": "b_fe = np.array([3.0]); v_fe = np.array([[0.05]]); b_re = np.array([1.0]); v_re = np.array([[0.01]]); round(compute_hausman_test(b_fe, v_fe, b_re, v_re)['stat'], 4)",
              "expected": "100.0"
            },
            {
              "input": "b_fe = np.array([1.0, 2.0]); v_fe = np.eye(2)*0.1; b_re = np.array([1.0, 2.0]); v_re = np.eye(2)*0.05; compute_hausman_test(b_fe, v_fe, b_re, v_re)['df']",
              "expected": "2"
            }
          ],
          "expectedOutput": "0.0",
          "variants": {
            "python": {
              "starterCode": "def compute_hausman_test(\n    beta_fe: np.ndarray,\n    vcov_fe: np.ndarray,\n    beta_re: np.ndarray,\n    vcov_re: np.ndarray\n) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman specification test statistic: (b_fe - b_re)' [V_fe - V_re]^(-1) (b_fe - b_re).\n\n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n    vcov_fe : np.ndarray of shape (K, K)\n    beta_re : np.ndarray of shape (K,)\n    vcov_re : np.ndarray of shape (K, K)\n\n    Returns\n    -------\n    dict with keys 'h_stat', 'df'\n    \"\"\"\n    # Solve for quadratic form safely\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_hausman_test(\n    beta_fe: np.ndarray,\n    vcov_fe: np.ndarray,\n    beta_re: np.ndarray,\n    vcov_re: np.ndarray\n) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman specification test statistic: (b_fe - b_re)' [V_fe - V_re]^(-1) (b_fe - b_re).\n\n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n    vcov_fe : np.ndarray of shape (K, K)\n    beta_re : np.ndarray of shape (K,)\n    vcov_re : np.ndarray of shape (K, K)\n\n    Returns\n    -------\n    dict with keys 'h_stat', 'df'\n    \"\"\"\n    diff = beta_fe - beta_re\n    diff_vcov = vcov_fe - vcov_re\n\n    # Solve for quadratic form safely\n    h_stat = float(diff.T @ np.linalg.pinv(diff_vcov) @ diff)\n    df = float(len(beta_fe))\n\n    return {\n        \"h_stat\": max(0.0, h_stat),\n        \"df\": df,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Negative Hausman statistic or non-invertible variance matrix.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Inverting in reverse order (`vcov_re - vcov_fe`). Under the null hypothesis, the RE estimator is asymptotically efficient, so $V_{\text{FE}} - V_{\text{RE}}$ must be positive semi-definite.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Subtract $V_{\text{RE}}$ from $V_{\text{FE}}$: `v_diff = vcov_fe - vcov_re`.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "An empirical labor economist investigates the wage return to joining a trade union using a 20-year panel tracking manufacturing workers. She fits both models: * Fixed Effects: $\\hat{\\beta}_{\\text{union}} = 0.06$ ($\\text{SE} = 0.02$, $p = 0.003$) * Random Effects: $\\hat{\\beta}_{\\text{union}} = 0.19$ ($\\text{SE} = 0.01$, $p < 0.0001$) The Hausman test statistic yields $H = 42.8$ ($p < 0.00001$), decisively rejecting the null hypothesis $H_0$. What is the substantive economic conclusion, and which coefficient should the policymaker rely upon?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الآثار العشوائية والفروق الأولى واختبار هاوسمان تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Rely on Random Effects because its standard error is twice as small ($\\text{SE}=0.01$), making it more efficient and reliable.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Rely on Fixed Effects ($\\hat{\\beta} = 0.06$); the statistical rejection proves that unobserved worker characteristics (such as baseline skill or motivation) correlate with union membership, causing Random Effects to suffer from severe upward omitted variable bias.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The rejection means both models are mathematically invalid and union membership has no effect on wages.",
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The researcher should take the arithmetic average of the two estimates $(0.06 + 0.19) / 2 = 0.125$.",
                "ar": "### Pedagogical Explanation & Distractor Analysis | التحليل البيداغوجي وتفكيك البدائل"
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "difference-in-differences-2x2",
    "title": "Canonical 2x2 Difference-in-Differences & Parallel Trends",
    "titleAr": "الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In April 1992, the state of New Jersey raised its minimum wage from $4.25 to $5.05 per hour.",
      "ar": "في أبريل 1992، رفعت ولاية نيوجيرسي الأمريكية الحد الأدنى للأجور من 4.25 إلى 5.05 دولار في الساعة، بينما أبقت ولاية بنسلفانيا المجاورة حدها..."
    },
    "prerequisites": [
      "causal-inference-confounding",
      "panel-data-fixed-effects"
    ],
    "x": 770,
    "y": 1600,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DiDParallelTrendsLab",
        "narrative": {
          "en": "In April 1992, the state of New Jersey raised its minimum wage from $4.25 to $5.05 per hour. Neighboring Pennsylvania kept its minimum wage frozen at $4.25.\n\nStandard economic theory predicted that raising the minimum wage would force fast-food restaurants to lay off workers. To find out, economists David Card and Alan Krueger surveyed 410 fast-food restaurants across New Jersey and eastern Pennsylvania before and after the wage increase.\n\nWhy couldn't they simply look at New Jersey restaurants before and after?\nBecause if employment changed in New Jersey between April and December, that change could be driven by the nationwide economic recovery, changing consumer tastes, or holiday shopping! A simple before-after comparison mixes the policy impact with background economic trends.\n\nThis is the brilliance of **Difference-in-Differences (DiD)**:\n1. **First Difference:** Measure the employment change in New Jersey (Treated Group).\n2. **Second Difference:** Measure the employment change in Pennsylvania (Control Group).\n3. **Difference-in-Differences:** Subtract Pennsylvania's background trend from New Jersey's change!\n\nBy using Pennsylvania to measure what *would have happened* in the region anyway, DiD isolates the pure causal effect of the policy!\n\nThe entire validity of DiD hinges on the **Parallel Trends Assumption**: that in the absence of the law, New Jersey and Pennsylvania would have moved along parallel paths.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Difference-in-Differences (DiD)** | The double subtraction: policy group change minus control group background trend. |\n| **Parallel Trends Assumption** | The bedrock premise: treatment and control groups would have moved in parallel without the policy. |\n| **Counterfactual Trend** | The alternate world: what the treated group would have experienced if policy never happened. |\n| **Interaction Term ($D \\times Post$)** | The regression knob: the single coefficient that measures the DiD treatment effect. |\n| **Macro Shock** | A widespread economic wave (like a recession) that affects both groups simultaneously. |\n\n```text\n    THE CLASSIC 2x2 DiD TRAJECTORY:\n\nOutcome (Employment)\n      ^\n      |                                * New Jersey (Actual Post-Treatment)\n      |                               / |\n      |                              /  | DiD Treatment Effect (tau)\n      |                             /   v\n      |  NJ Pre * - - - - - - - - - - - * Counterfactual NJ (Follows PA's Trend!)\n      |          \\                     /\n      |           \\                   /\n      |            \\                 /\n      |  PA Pre * - \\ - - - - - - - * PA Post (Measures Background Trend)\n      0-------------+---------------+-------------------------------------> Time\n                  Pre-Policy      Post-Policy\n```",
          "ar": "في أبريل 1992، رفعت ولاية نيوجيرسي الأمريكية الحد الأدنى للأجور من 4.25 إلى 5.05 دولار في الساعة، بينما أبقت ولاية بنسلفانيا المجاورة حدها الأدنى ثابتًا عند 4.25 دولار.\n\nتوقعت النظريات الاقتصادية الكلاسيكية أن رفع الأجور سيجبر مطاعم الوجبات السريعة على تسريح العمال. ولاختبار ذلك، أجرى الاقتصاديان ديفيد كارد وآلان كروجر مسحًا لـ 410 مطاعم في نيوجيرسي وبنسلفانيا قبل تطبيق القانون وبعده.\n\nلماذا لم يكتفِ الباحثان بمقارنة نيوجيرسي قبل القرار وبعده فحسب؟\nلأنه لو تغير التوظيف في نيوجيرسي، فقد يكون التغير ناتجًا عن تعافي الاقتصاد العام أو مواسم التسوق! فالمقارنة الزمنية البسيطة تخلط أثر السياسة بالتقلبات الاقتصادية العامة.\n\nهنا تتجلى عبقرية **منهج الفروق في الفروق (Difference-in-Differences - DiD)**:\n1. **الفرق الأول:** قياس التغير الزمني في نيوجيرسي (مجموعة المعالجة).\n2. **الفرق الثاني:** قياس التغير الزمني في بنسلفانيا (المجموعة الضابطة).\n3. **فارق الفارقين:** طرح المسار الاقتصادي العام لبنسلفانيا من التغير الحاصل في نيوجيرسي!\n\nتعتمد مصداقية هذا المنهج بالكامل على **فرضية المسارات المتوازية (Parallel Trends)**: أي افتراض أنه لولا صدور القانون، لكانت الولايتان قد تحركتا في مسارين متوازيين تمامًا.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **الفروق في الفروق (DiD)** | الطرح المزدوج: خصم التغير الطبيعي للمجموعة الضابطة من تغير مجموعة المعالجة. |\n| **فرضية المسارات المتوازية** | الركيزة الأساسية: افتراض سير المجموعتين في خطين متوازيين لولا تطبيق السياسة. |\n| **المسار الافتراضي البديل** | خط الواقع المضاد: مسار مجموعة المعالجة المتوقع لو لم يصدر القرار قط. |\n| **حد التفاعل ($D \\times Post$)** | المعامل المرجو: المتغير التفاعلي في الانحدار الذي يلتقط الأثر السببي الصافي. |\n| **الصدمات الاقتصادية الكلية** | موجات عامة (كالركود الاقتصادي أو المواسم) تؤثر على المجموعتين معًا في آن واحد. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\tau_{\\text{DiD}} = \\left( \\mathbb{E}[Y \\mid T=1, P=1] - \\mathbb{E}[Y \\mid T=1, P=0] \\right) - \\left( \\mathbb{E}[Y \\mid T=0, P=1] - \\mathbb{E}[Y \\mid T=0, P=0] \\right)",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Canonical 2x2 Difference-in-Differences & Parallel Trends.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي."
        },
        "narrative": {
          "en": "This estimator is estimated via OLS using the interaction regression:\n\n$$\ny_{it} = \\beta_0 + \\beta_1 T_i + \\beta_2 P_t + \\tau (T_i \\times P_t) + \\varepsilon_{it}\n$$\n\nwhere:\n* $\\beta_1$: Baseline difference between treated and control groups before policy.\n* $\\beta_2$: Common macroeconomic time trend shared by both groups.\n* $\\tau$: The causal treatment effect of interest.\n\n### Why the Math Works Step-by-Step\n\n1. **Algebraic Proof of Equivalence:**\n   * $\\mathbb{E}[Y \\mid T=0, P=0] = \\beta_0$\n   * $\\mathbb{E}[Y \\mid T=0, P=1] = \\beta_0 + \\beta_2$ (Control change $= \\beta_2$)\n   * $\\mathbb{E}[Y \\mid T=1, P=0] = \\beta_0 + \\beta_1$\n   * $\\mathbb{E}[Y \\mid T=1, P=1] = \\beta_0 + \\beta_1 + \\beta_2 + \\tau$ (Treated change $= \\beta_2 + \\tau$)\n   Subtracting control change from treated change: $(\\beta_2 + \\tau) - \\beta_2 = \\tau$!\n2. **Testing Parallel Trends via Pre-Treatment Event Studies:**\n   If multiple pre-policy periods exist, researchers estimate coefficients on leads: $\\sum_{k < 0} \\tau_k (T_i \\times \\text{Year}_k)$. If pre-treatment coefficients are statistically indistinguishable from zero, the parallel trends assumption is validated.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $T_i \\in \\{0, 1\\}$: Group indicator (1 for treated units, 0 for control units).\n* $P_t \\in \\{0, 1\\}$: Time indicator (1 for post-intervention periods, 0 for pre-intervention).\n* $T_i \\times P_t$: Policy interaction dummy switching to 1 only for treated units after launch.\n* $\\tau$: True Difference-in-Differences treatment effect.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\beta_1$ | الفارق الأساسي المسبق | الفجوة الدائمة الأصلية في المستوى بين المجموعتين قبل تطبيق أي قرار. |\n| $\\beta_2$ | المسار الزمني المشترك | مقدار التغير الطبيعي الذي طرأ عبر الزمن على الجميع بسبب الظروف العامة. |\n| $\\tau$ | أثر المعالجة السببي الصافي | معامل التفاعل الذي يقيس بدقة القفزة الإضافية الخاصة بمجموعة القرار وحدها. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the canonical $2 \\times 2$ Difference-in-Differences estimation engine in NumPy. You will:\n1. Compute the four group-by-period cell means ($\\bar{Y}_{1,1}, \\bar{Y}_{1,0}, \\bar{Y}_{0,1}, \\bar{Y}_{0,0}$).\n2. Calculate the sample double difference $\\hat{\\delta}_{\\text{DiD}}$ and the imputed counterfactual level.\n3. Construct the design matrix $\\mathbf{X} = [\\mathbf{1}, \\mathbf{G}, \\mathbf{T}, \\mathbf{G} \\odot \\mathbf{T}]$ and fit the OLS regression to confirm algebraic equivalence."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-difference-in-differences-2x2",
          "starterCode": "def compute_did_2x2(y: np.ndarray, treated: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences using OLS interaction regression.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome observations.\n    treated : np.ndarray of shape (N,)\n        Binary indicator: 1 if unit is in treated group, 0 if control.\n    post : np.ndarray of shape (N,)\n        Binary indicator: 1 if observation is post-treatment, 0 if pre.\n\n    Returns\n    -------\n    dict with keys 'did_tau', 'pre_diff', 'post_diff'\n    \"\"\"\n    # Construct design matrix: [1, treated, post, treated*post]\n    # Fit OLS\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "res = compute_did_2x2(np.array([10.0, 12.0, 10.0, 16.0]), np.array([0, 0, 1, 1]), np.array([0, 1, 0, 1])); f\"{res['delta_did']:.1f}, {res['counterfactual']:.1f}\"",
              "expected": "4.0, 12.0"
            },
            {
              "input": "res = compute_did_2x2(np.array([5.0, 5.0, 8.0, 15.0]), np.array([0, 0, 1, 1]), np.array([0, 1, 0, 1])); f\"{res['delta_did']:.1f}, {res['beta_interaction']:.1f}\"",
              "expected": "7.0, 7.0"
            }
          ],
          "expectedOutput": "4.0, 12.0",
          "variants": {
            "python": {
              "starterCode": "def compute_did_2x2(y: np.ndarray, treated: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences using OLS interaction regression.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome observations.\n    treated : np.ndarray of shape (N,)\n        Binary indicator: 1 if unit is in treated group, 0 if control.\n    post : np.ndarray of shape (N,)\n        Binary indicator: 1 if observation is post-treatment, 0 if pre.\n\n    Returns\n    -------\n    dict with keys 'did_tau', 'pre_diff', 'post_diff'\n    \"\"\"\n    # Construct design matrix: [1, treated, post, treated*post]\n    # Fit OLS\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "4.0, 12.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_did_2x2(y: np.ndarray, treated: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences using OLS interaction regression.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome observations.\n    treated : np.ndarray of shape (N,)\n        Binary indicator: 1 if unit is in treated group, 0 if control.\n    post : np.ndarray of shape (N,)\n        Binary indicator: 1 if observation is post-treatment, 0 if pre.\n\n    Returns\n    -------\n    dict with keys 'did_tau', 'pre_diff', 'post_diff'\n    \"\"\"\n    n = len(y)\n    interaction = treated * post\n\n    # Construct design matrix: [1, treated, post, treated*post]\n    X = np.column_stack([np.ones(n), treated, post, interaction])\n\n    # Fit OLS\n    beta = np.linalg.solve(X.T @ X, X.T @ y)\n\n    did_tau = float(beta[3])\n    pre_diff = float(np.mean(y[(treated == 1) & (post == 0)]) - np.mean(y[(treated == 0) & (post == 0)]))\n    post_diff = float(np.mean(y[(treated == 1) & (post == 1)]) - np.mean(y[(treated == 0) & (post == 1)]))\n\n    return {\n        \"did_tau\": did_tau,\n        \"pre_diff\": pre_diff,\n        \"post_diff\": post_diff,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Compute the four cell means first: y11, y10, y01, y00.",
            "ar": "احسب متوسطات الخلايا الأربع أولاً: y11، y10، y01، y00."
          },
          "tier2": {
            "en": "The DiD estimate is (y11 - y10) - (y01 - y00). Check that your counterfactual equals y10 + (y01 - y00).",
            "ar": "تقدير DiD هو (y11 - y10) - (y01 - y00). تأكد من أن المسار المقابل للواقع يساوي y10 + (y01 - y00)."
          },
          "tier3": {
            "en": "For OLS, construct the design matrix X = [1, treat, post, treat*post] and solve with np.linalg.solve(X.T @ X, X.T @ y).",
            "ar": "في انحدار OLS، كوّن مصفوفة التصميم X = [1, treat, post, treat*post] وحلها باستخدام np.linalg.solve."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "An international e-commerce platform rolls out an AI-driven one-click checkout system in Germany in Q2, while retaining the legacy multi-step checkout in France. - In Q1 (pre-treatment), conversion rates were $4.0\\%$ in France and $6.0\\%$ in Germany. - In Q2 (post-treatment), conversion rates rose to $5.5\\%$ in France and $9.5\\%$ in Germany. The growth VP claims: *\"The new AI checkout produced a $3.5$ percentage point lift in Germany because conversion jumped from $6.0\\%$ to $9.5\\%$!\"* What is the true causal Difference-in-Differences estimate, and what critical empirical threat must the analytics team investigate?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The DiD estimate is $+3.5\\%$ because baseline differences reflect static user preferences that do not bias rate-of-change metrics.",
                "ar": "تقدير DiD هو 3.5% لأن الفروق الأولية ثابتة ولا تؤثر على معدل التغير."
              },
              "correct": false,
              "explanation": {
                "en": "A simple before-and-after change of $+3.5\\%$ ignores secular growth; France grew by $+1.5\\%$ concurrently without the new checkout feature.",
                "ar": "المقارنة البسيطة قبل وبعد تتجاهل النمو الطبيعي العام؛ فقد ارتفعت فرنسا بنسبة 1.5% دون تطبيق النظام الجديد."
              }
            },
            {
              "text": {
                "en": "The DiD estimate is $+2.0\\%$ ($(9.5\\% - 6.0\\%) - (5.5\\% - 4.0\\%) = 3.5\\% - 1.5\\% = 2.0\\%$); the primary validity threat is a violation of parallel trends, such as an unannounced holiday marketing campaign run exclusively in Germany during Q2.",
                "ar": "تقدير DiD هو +2.0%؛ وأكبر تهديد لصحة التقدير هو خرق مسار التوازي عبر حملات تسويقية خاصة بألمانيا وحدها في الربع الثاني."
              },
              "correct": true,
              "explanation": {
                "en": "Subtracting the control secular trend ($+1.5\\%$) isolates the net $+2.0\\%$ lift. The validity hinges entirely on the assumption that absent the AI feature, Germany would have also grown by $1.5\\%$.",
                "ar": "طرح المسار الطبيعي لفرنسا (+1.5%) يعزل الأثر الصافي (+2.0%). وتعتمد صحة النموذج كلياً على أن ألمانيا كانت ستنمو بنفس معدل 1.5% لولا الميزة الجديدة."
              }
            },
            {
              "text": {
                "en": "The DiD estimate is $-0.5\\%$ because France had a lower initial baseline, inducing regression to the mean.",
                "ar": "تقدير DiD هو -0.5% بسبب ارتداد فرنسا نحو المتوسط."
              },
              "correct": false,
              "explanation": {
                "en": "Different baseline levels do not invalidate DiD; the method explicitly differences out time-invariant baseline level gaps $\\beta_1$.",
                "ar": "اختلاف المستويات الأولية لا يبطل DiD، فالنموذج يطرح الفروق الثابتة في المستويات $\\beta_1$ تلقائياً."
              }
            },
            {
              "text": {
                "en": "The DiD estimate cannot be computed with aggregate country averages because least squares requires individual session clickstreams to satisfy the Gauss-Markov theorem.",
                "ar": "لا يمكن حساب DiD باستخدام المتوسطات الكلية لتعارضها مع مبرهنة غاوس-ماركوف."
              },
              "correct": false,
              "explanation": {
                "en": "By the Frisch-Waugh-Lovell theorem and cell expectation algebra, group-mean double differencing is mathematically identical to micro-level OLS with clustered standard errors.",
                "ar": "حسب مبرهنة فريش-وو-لوفيل، فإن الفروق المزدوجة للمتوسطات تتطابق رياضياً تماماً مع انحدار البيانات الفردية."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "staggered-did-callaway-santanna",
    "title": "Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna",
    "titleAr": "الفرق في الفروق التدريجي وانهيار نموذج الآثار الثابتة ثنائي الاتجاه",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In the real world, major laws and corporate initiatives are rarely adopted by everyone on the exact same Monday morning.",
      "ar": "في عالم السياسات والاقتصاد، نادرًا ما تُطبق القوانين الجديدة في كافة الولايات في التوقيت ذاته."
    },
    "prerequisites": [
      "difference-in-differences-2x2",
      "panel-data-fixed-effects"
    ],
    "x": 790,
    "y": 1695,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "StaggeredDiDEventStudyLab",
        "narrative": {
          "en": "In the real world, major laws and corporate initiatives are rarely adopted by everyone on the exact same Monday morning.\n\nConsider the legalization of ride-sharing platforms (like Uber and Lyft) across the United States:\n* California legalized ride-sharing in 2013.\n* Texas legalized it in 2015.\n* New York legalized it in 2017.\n* Some states never legalized it at all.\n\nFor decades, econometricians analyzed this kind of rollout using traditional **Two-Way Fixed Effects (TWFE)** regressions. But between 2018 and 2021, an econometric revolution proved that traditional TWFE has a fatal flaw: **The Negative Weighting Problem**.\n\nWhy does traditional regression fail with staggered rollouts?\nBecause when evaluating Texas in 2016, TWFE doesn't just compare Texas to never-treated states. It accidentally uses **California (which was treated in 2013) as a control group for Texas!**\n\nIf ride-sharing's effect in California grows dynamically over time (as more drivers buy cars and riders build habits), California is on an upward trajectory. Using an already-treated unit on an upward trend as a control group can cause a genuinely positive policy to show up with a **negative, upside-down coefficient** in your regression!\n\nModern staggered estimators (like Callaway & Sant'Anna) fix this by comparing each adoption cohort strictly against clean, never-yet-treated units.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Staggered Adoption** | Stepped rollout: different entities adopting policy in different calendar years. |\n| **Two-Way Fixed Effects (TWFE)** | Traditional panel regression with entity and time dummies that suffers from bad controls. |\n| **Negative Weighting Problem** | The mathematical glitch where positive treatment effects can turn into negative estimates. |\n| **Dynamic Treatment Effect** | An effect that changes, grows, or fades over time as people adapt to the policy. |\n| **Callaway & Sant'Anna Estimator** | Clean cohort DiD: strictly comparing newly treated cohorts against not-yet-treated peers. |\n\n```text\n    STAGGERED ROLLOUT TIMELINE:\n\nCohort 2013 (CA): [ Treated ===========================================> ]\n    Cohort 2015 (TX): [ Pre-period ------> ] [ Treated ====================> ]\n    Never-Treated:    [ Clean Pre-period ---------------------------------> ]\n                           ^\n                           | (TWFE mistakenly used CA as a control for TX!)\n```",
          "ar": "في عالم السياسات والاقتصاد، نادرًا ما تُطبق القوانين الجديدة في كافة الولايات في التوقيت ذاته.\n\nتأمل مثلاً تقنين خدمات النقل التشاركي (مثل أوبر وليفت) عبر الولايات الأمريكية:\n* قننت كاليفورنيا الخدمة في عام 2013.\n* قننتها تكساس في عام 2015.\n* قننتها نيويورك في عام 2017.\n* بينما امتنعت ولايات أخرى عن التقنين تمامًا.\n\nلعقود طويلة، حلل الباحثون هذا التدرج باستخدام نماذج الانحدار التقليدية ذات الآثار الثابتة ثنائية الاتجاه (TWFE). ولكن بين عامي 2018 و 2021، أثبتت ثورة بحثية أن هذه الطريقة الكلاسيكية تعاني من عيب قاتل: **مشكلة الأوزان السالبة (Negative Weighting)**.\n\nلماذا تفشل النماذج التقليدية في التبني المتدرج؟\nلأنه عند تقييم ولاية تكساس في 2016، لا تكتفي النماذج بمقارنتها بالولايات التي لم تطبق القانون، بل تستخدم خطأً **كاليفورنيا (التي طبقت القانون في 2013) كمجموعة ضابطة لتكساس!**\n\nولو كان أثر القانون في كاليفورنيا يتنامى ويتصاعد سنويًا مع اعتياد الركاب، فإن استخدامها كمجموعة ضابطة يؤدي إلى قلب النتائج رأسًا على عقب، لتظهر سياسة إيجابية ناجحة في صورة معامل **سالب وهمي**!\n\nوتعالج مقدرات التبني المتدرج الحديثة (مثل مقدر كالواي وسانتانا) هذه المعضلة عبر مقارنة كل دفعة زمنية بالولايات غير المعالجة حصرًا.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **التبني المتدرج (Staggered)** | التطبيق المتعاقب: خضوع كيانات مختلفة للمعالجة في سنوات تقويمية متفاوتة. |\n| **الآثار ثنائية الاتجاه (TWFE)** | نموذج الانحدار اللوحي التقليدي الذي يقع في فخ المقارنات الملوثة. |\n| **معضلة الأوزان السالبة** | خلل جبري يؤدي لظهور آثار السياسات الناجحة بمعاملات سالبة مقلوبة. |\n| **الأثر الديناميكي المتغير** | أثر يتغير ويتراكم أو يتلاشى بمرور السنوات مع تكيف الناس مع الواقع الجديد. |\n| **مقدر كالواي وسانتانا** | المقدر النقي: يقارن كل دفعة جديدة بالكيانات التي لم تخضع للمعالجة بعد فقط. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "ATT(g, t) = \\mathbb{E}[Y_t(g) - Y_t(\\infty) \\mid G = g]",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الفرق في الفروق التدريجي وانهيار نموذج الآثار الثابتة ثنائي الاتجاه."
        },
        "narrative": {
          "en": "Callaway and Sant'Anna (2021) showed that $ATT(g, t)$ is identified using clean comparison groups (either never-treated $C = \\infty$ or not-yet-treated $D_s = 0$ for $s \\le t$):\n\n$$\n\\tau_{g,t} = \\left( \\mathbb{E}[Y_t \\mid G = g] - \\mathbb{E}[Y_{g-1} \\mid G = g] \\right) - \\left( \\mathbb{E}[Y_t \\mid C] - \\mathbb{E}[Y_{g-1} \\mid C] \\right)\n$$\n\nThe Goodman-Bacon (2021) decomposition revealed that the traditional TWFE coefficient $\\beta_{\\text{TWFE}}$ is a weighted sum:\n\n$$\n\\beta_{\\text{TWFE}} = \\sum_{k} w_k \\hat{\\tau}_k^{\\text{clean}} + \\sum_{j} w_j \\hat{\\tau}_j^{\\text{already-treated as control}}\n$$\n\nwhere some weights $w_j$ can be strictly negative!\n\n### Why the Math Works Step-by-Step\n\n1. **Why do already-treated units create negative weights?**\n   If an early cohort's treatment effect grows by $\\Delta$ between periods 1 and 2, its trend slope is $(\\text{Trend} + \\Delta)$. Subtracting this slope from a newly treated unit subtracts $\\Delta$, artificially depressing the estimated treatment effect!\n2. **Aggregation by Event Time:**\n   After estimating individual $ATT(g, t)$, researchers aggregate them into dynamic event-study coefficients $ATT(e) = \\sum_g w_g ATT(g, g + e)$ where $e = t - g$ is elapsed time since treatment.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $G \\in \\{g_1, \\dots, g_K, \\infty\\}$: Cohort of initial treatment adoption ($\\infty$ = never treated).\n* $ATT(g, t)$: Causal treatment effect for cohort $g$ evaluated at calendar time $t$.\n* $e = t - g$: Event time (relative time elapsed since initial policy adoption).",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $G=g$ | دفعة التبني الزمنية | المجموعة التي خضعت للقرار لأول مرة في العام $g$. |\n| $ATT(g, t)$ | أثر الدفعة في الزمن $t$ | العائد السببي الخاص بالدفعة $g$ عند قياسه في السنة $t$. |\n| تفكيك بيكون | برهان تفكيك بيكون | برهان رياضي يكشف أن الانحدار التقليدي يمزج مقارنات ملوثة ذات أوزان سالبة. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the core Callaway-Sant'Anna cohort-time average treatment effect estimator $\\widehat{ATT}(g, t)$ in NumPy. You will:\n1. Identify the reference baseline period $g - 1$ for the target adoption cohort.\n2. Compute the pre-to-post change in average outcomes for the target treated cohort: $\\Delta \\bar{Y}_{\\text{treated}} = \\bar{Y}_{g, t} - \\bar{Y}_{g, g-1}$.\n3. Compute the corresponding change over the exact same time window for the clean never-treated comparison group: $\\Delta \\bar{Y}_{\\text{control}} = \\bar{Y}_{C, t} - \\bar{Y}_{C, g-1}$.\n4. Subtract the control change from the treated change to return the clean, unpolluted $\\widehat{ATT}(g, t)$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-staggered-did-callaway-santanna",
          "starterCode": "def compute_group_time_att(\n    y: np.ndarray,\n    g: np.ndarray,\n    t: np.ndarray,\n    target_g: int,\n    target_t: int\n) -> float:\n    \"\"\"\n    Computes a clean cohort-specific group-time ATT(g, t) against never-treated units.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome values.\n    g : np.ndarray of shape (N,)\n        Cohort treatment timing (use 9999 or 0 for never-treated).\n    t : np.ndarray of shape (N,)\n        Calendar time of observation.\n    target_g : int\n        Treated cohort of interest.\n    target_t : int\n        Evaluation calendar period (target_t >= target_g).\n\n    Returns\n    -------\n    float : Estimated ATT(g, t).\n    \"\"\"\n    # Cohort g units\n    # Clean never-treated control units (g == 0 or g >= 9000)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "y = np.array([10.0, 15.0, 10.0, 12.0]); g = np.array([2, 2, 0, 0]); t = np.array([1, 2, 1, 2]); f\"{compute_group_time_att(y, g, t, target_g=2, target_t=2, never_treated_val=0):.1f}\"",
              "expected": "3.0"
            },
            {
              "input": "y = np.array([20.0, 28.0, 20.0, 22.0]); g = np.array([2, 2, 0, 0]); t = np.array([1, 2, 1, 2]); f\"{compute_group_time_att(y, g, t, target_g=2, target_t=2, never_treated_val=0):.1f}\"",
              "expected": "6.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "def compute_group_time_att(\n    y: np.ndarray,\n    g: np.ndarray,\n    t: np.ndarray,\n    target_g: int,\n    target_t: int\n) -> float:\n    \"\"\"\n    Computes a clean cohort-specific group-time ATT(g, t) against never-treated units.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome values.\n    g : np.ndarray of shape (N,)\n        Cohort treatment timing (use 9999 or 0 for never-treated).\n    t : np.ndarray of shape (N,)\n        Calendar time of observation.\n    target_g : int\n        Treated cohort of interest.\n    target_t : int\n        Evaluation calendar period (target_t >= target_g).\n\n    Returns\n    -------\n    float : Estimated ATT(g, t).\n    \"\"\"\n    # Cohort g units\n    # Clean never-treated control units (g == 0 or g >= 9000)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_group_time_att(\n    y: np.ndarray,\n    g: np.ndarray,\n    t: np.ndarray,\n    target_g: int,\n    target_t: int\n) -> float:\n    \"\"\"\n    Computes a clean cohort-specific group-time ATT(g, t) against never-treated units.\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome values.\n    g : np.ndarray of shape (N,)\n        Cohort treatment timing (use 9999 or 0 for never-treated).\n    t : np.ndarray of shape (N,)\n        Calendar time of observation.\n    target_g : int\n        Treated cohort of interest.\n    target_t : int\n        Evaluation calendar period (target_t >= target_g).\n\n    Returns\n    -------\n    float : Estimated ATT(g, t).\n    \"\"\"\n    base_t = target_g - 1  # Pre-treatment baseline period for cohort g\n\n    # Cohort g units\n    treated_post = y[(g == target_g) & (t == target_t)]\n    treated_pre = y[(g == target_g) & (t == base_t)]\n    delta_treated = np.mean(treated_post) - np.mean(treated_pre)\n\n    # Clean never-treated control units (g == 0 or g >= 9000)\n    control_mask = (g == 0) | (g >= 9000)\n    control_post = y[control_mask & (t == target_t)]\n    control_pre = y[control_mask & (t == base_t)]\n    delta_control = np.mean(control_post) - np.mean(control_pre)\n\n    att = float(delta_treated - delta_control)\n\n    return att"
        },
        "hints": {
          "tier1": {
            "en": "Anchor the baseline period at target_g - 1 for both the treated cohort and the control cohort.",
            "ar": "ثبت فترة الأساس عند target_g - 1 لكل من فوج المعالجة والمجموعة الضابطة."
          },
          "tier2": {
            "en": "Compute delta_treated = mean(y_target_t) - mean(y_base) for the treated cohort.",
            "ar": "احسب delta_treated = mean(y_target_t) - mean(y_base) لفوج المعالجة."
          },
          "tier3": {
            "en": "Subtract delta_control from delta_treated using the clean never_treated comparison group.",
            "ar": "اطرح delta_control من delta_treated باستخدام مجموعة المقارنة النظيفة التي لم تُعالج قط."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Thirty US states enacted paid parental leave policies in staggered waves between 2012 and 2022. Longitudinal health data demonstrates that parental leave yields compounding, positive benefits on infant wellness that expand over time: a modest $+2\\%$ gain in year 1 after adoption, rising to $+5\\%$ in year 2, and reaching $+9\\%$ by year 4. An empirical researcher fits a textbook Two-Way Fixed Effects regression $Y_{st} = \\alpha_s + \\lambda_t + \\beta D_{st} + \\varepsilon_{st}$ and is stunned to find $\\hat{\\beta} = -0.024$ ($p < 0.01$)—a statistically significant, negative estimated effect! Why did the classical TWFE regression estimate a negative treatment effect when the policy produced strictly positive benefits in every single state?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الفرق في الفروق التدريجي وانهيار نموذج الآثار الثابتة ثنائي الاتجاه تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The sample of 30 states violates the asymptotic central limit theorem threshold of 50 clusters.",
                "ar": "العينة المكونة من 30 ولاية لا تكفي لتحقيق مبرهنة النهاية المركزية."
              },
              "correct": false,
              "explanation": {
                "en": "Small cluster counts affect standard error calibration, not structural point estimate sign reversals.",
                "ar": "قلة عدد المجموعات تؤثر على دقة الأخطاء المعيارية وليس على انقلاب إشارة معامل الانحدار الإجمالي."
              }
            },
            {
              "text": {
                "en": "Under the Goodman-Bacon decomposition, early-adopting states (whose health gains had matured to $+9\\%$) acted as control groups for later-adopting states (whose gains were only $+2\\%$). Subtracting an earlier $+9\\%$ trajectory from a new $+2\\%$ trajectory generates a $-7\\%$ negative implicit comparison that contaminates the pooled estimate.",
                "ar": "وفق تفكيك غودمان-بيكون، استُخدمت الولايات المبكرة (التي نضج أثرها إلى +9%) كمجموعة ضابطة للولايات اللاحقة (التي كان أثرها +2%)، وطرح 9% من 2% يفرز مقارنة سالبة بنسبة -7% تلوث المعامل الإجمالي."
              },
              "correct": true,
              "explanation": {
                "en": "When treatment effects are dynamic, earlier-treated units cannot serve as valid counterfactual controls because their post-treatment trajectory embodies treatment effect dynamics, violating parallel trends and assigning negative weights.",
                "ar": "عند تغير أثر المعالجة ديناميكياً مع الوقت، تعجز الوحدات المعالجة سابقاً عن تمثيل الواقع المقابل، لأن مسارها يحتوي على استجابة تراكمية تفرز أوزاناً سالبة تقلب إشارة TWFE."
              }
            },
            {
              "text": {
                "en": "Infant wellness is a bounded non-linear index that invalidates OLS orthogonal projection geometry.",
                "ar": "مؤشر صحة الرضع متغير محدود غير خطي يبطل هندسة إسقاط OLS."
              },
              "correct": false,
              "explanation": {
                "en": "OLS provides the best linear approximation regardless of the underlying index scale; the issue is forbidden comparisons, not bounded outcome metrics.",
                "ar": "يقدم OLS أفضل تقريب خطي بغض النظر عن طبيعة المتغير؛ فالمشكلة تكمن في المقارنات المحظورة."
              }
            },
            {
              "text": {
                "en": "The regression suffered from omitted variable bias caused by omitting individual family income.",
                "ar": "يعاني الانحدار من انحياز المتغير المغفَل بسبب عدم تضمين دخل الأسرة الفردي."
              },
              "correct": false,
              "explanation": {
                "en": "State fixed effects $\\alpha_s$ control for all time-invariant differences across states, but cannot fix the mathematical sign reversal caused by dynamic treatment heterogeneity.",
                "ar": "الآثار الثابتة للولايات تضبط الفروق الهيكلية الثابتة، لكنها تعجز عن منع الانقلاب الرياضي للإشارة الناجم عن ديناميكية الأثر."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "regression-discontinuity-sharp",
    "title": "Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression",
    "titleAr": "تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose a prestigious university offers full-tuition merit scholarships to all applicants who score 80.",
      "ar": "تخيل جامعة مرموقة تمنح منحًا دراسية كاملة لجميع المتقدمين الذين يحصلون على 80.0% أو أكثر في اختبار القبول."
    },
    "prerequisites": [
      "frisch-waugh-lovell-theorem",
      "selection-bias-randomized-trials"
    ],
    "x": 770,
    "y": 1790,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SharpRDDCutoffLab",
        "narrative": {
          "en": "Suppose a prestigious university offers full-tuition merit scholarships to all applicants who score 80.0% or higher on an entrance examination. You want to measure: *does winning this scholarship cause higher lifetime career earnings?*\n\nIf you simply compare all scholarship winners (who scored 80% to 100%) against non-winners (who scored 0% to 79%), your study is heavily confounded. Students who score 95% possess extraordinary natural talent, better prior schooling, and wealthier family backgrounds.\n\nNow zoom in on the razor's edge of the cutoff:\n* **Student Alice** scored **80.1%** and won the full scholarship.\n* **Student Bob** scored **79.9%** and received nothing.\n\nIs Alice a genius and Bob unmotivated? Of course not! That tiny 0.2% gap was pure luck—a broken pencil lead, a distracting sneeze in the exam hall, or one lucky guess on a multiple-choice question.\n\nAlice and Bob are virtually identical twins in every conceivable dimension: ability, family background, and work ethic. Yet Alice gets free tuition while Bob pays full price!\n\nThis is the beauty of **Sharp Regression Discontinuity Design (RDD)**. Right at the threshold, nature runs an almost perfect randomized trial. Any sudden vertical jump in future career earnings at the 80.0% mark can be attributed squarely to the causal impact of the scholarship!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Running / Forcing Variable ($X$)** | The continuous score or rating used to assign treatment (e.g., exam score). |\n| **Cutoff / Threshold ($c$)** | The strict boundary line where treatment turns on (e.g., 80.0%). |\n| **Sharp RDD** | The light switch: treatment probability jumps cleanly from 0% to 100% at the cutoff. |\n| **Bandwidth ($h$)** | The zoom lens: the narrow window $[c - h, c + h]$ of data points analyzed around the cutoff. |\n| **Local Average Treatment Effect** | The causal jump isolated specifically for students near the threshold boundary. |\n\n```text\n    THE SHARP RDD DISCONTINUITY JUMP:\n\nFuture Earnings ($)\n      ^\n      |                                              *   *\n      |                                            *   *\n      |                                 *  *  * (Treated Curve)\n      |                                * |\n      |                       Discontinuity Jump (tau)\n      |                                * |\n      |                    *  *  * (Control Curve)\n      |                  *   *\n      0-----------------+--------------+-----------------------------> Exam Score (X)\n                        c - h          c (Cutoff: 80%)    c + h\n```",
          "ar": "تخيل جامعة مرموقة تمنح منحًا دراسية كاملة لجميع المتقدمين الذين يحصلون على 80.0% أو أكثر في اختبار القبول. وتريد الإجابة عن سؤال مهم: *هل تسبب هذه المنحة زيادة الدخل المهني للطلاب مستقبلاً؟*\n\nإذا قارنت جميع الحاصلين على المنحة (أصحاب الدرجات من 80% إلى 100%) بغير الحاصلين عليها (من 0% إلى 79%)، ستكون دراستك ملوثة بانحياز شديد؛ فالطلاب أصحاب درجات 95% يملكون مهارات استثنائية وخلفيات أسرية وتعليمية متميزة بطبيعتهم.\n\nولكن قرّب العدسة وركز على حافة الحد الفاصل تمامًا:\n* **الطالبة مريم** حصلت على **80.1%** وفازت بالمنحة الكاملة.\n* **الطالب عمر** حصل على **79.9%** وحُرم من المنحة.\n\nهل مريم عبقرية وعمر متكاسل؟ بالتأكيد لا! فهذا الفارق الضئيل (0.2%) كان مجرد صدفة عشوائية بحتة: ارتباك لحظي أو عطسة في قاعة الاختبار.\n\nمريم وعمر متطابقان تمامًا في الذكاء والاجتهاد والظروف الاجتماعية؛ ومع ذلك نالت مريم التعليم المجاني بينما اضطر عمر لدفع الرسوم كاملة!\n\nهذه هي روعة **تصميم انقطاع الانحدار الحاد (Sharp RDD)**؛ فعند نقطة الحد الفاصل تمامًا، تقدم الطبيعة تجربة عشوائية مثالية. وأي قفزة رأسية مفاجئة في رواتب الطلاب عند عتبة 80.0% هي أثر سببي خالص للمنحة!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **المتغير الفاصل (Running Variable)** | المقياس المستمر الذي يحدد استحقاق المعالجة (مثل درجة اختبار القبول). |\n| **العتبة / الحد الفاصل ($c$)** | الخط الحاسم الذي ينقلب عنده القرار وتُمنح عنده المعالجة (مثل 80%). |\n| **الانقطاع الحاد (Sharp RDD)** | مفتاح الكهرباء: احتمالية تلقي العلاج تقفز فجأة من 0% إلى 100% عند العتبة. |\n| **عرض النطاق (Bandwidth - $h$)** | عدسة التقريب: النافذة الضيقة حول العتبة لمقارنة الحالات المتشابهة بدقة. |\n| **الأثر السببي الموضعي** | القفزة الرأسية في النتيجة عند حافة العتبة الفاصلة تحديدًا. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "D_i = \\mathbf{1}(X_i \\ge c)",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي."
        },
        "narrative": {
          "en": "The Sharp RDD treatment effect is the jump in expected outcome at cutoff $c$:\n\n$$\n\\tau_{\\text{SRDD}} = \\lim_{x \\downarrow c} \\mathbb{E}[Y \\mid X = x] - \\lim_{x \\uparrow c} \\mathbb{E}[Y \\mid X = x]\n$$\n\nHahn, Todd, and Van der Klaauw (2001) proved that under the continuity assumption ($\\mathbb{E}[Y(0) \\mid X=x]$ and $\\mathbb{E}[Y(1) \\mid X=x]$ are continuous at $c$), $\\tau_{\\text{SRDD}}$ identifies the causal effect at the cutoff:\n\n$$\n\\tau_{\\text{SRDD}} = \\mathbb{E}[Y(1) - Y(0) \\mid X = c]\n$$\n\nIn practice, this is estimated via local linear regression inside bandwidth $h$:\n\n$$\n\\min_{\\alpha, \\beta, \\tau, \\gamma} \\sum_{i: |X_i - c| \\le h} \\left( Y_i - \\alpha - \\beta(X_i - c) - \\tau D_i - \\gamma D_i(X_i - c) \\right)^2\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why subtract $c$ from $X_i$ in $(X_i - c)$?**\n   Centering the running variable at cutoff $c$ ensures that the intercept $\\alpha$ represents the expected control outcome right at the threshold, and $\\tau$ represents the exact vertical discontinuity jump at $X = c$!\n2. **The Role of Bandwidth $h$:**\n   Bandwidth balances a fundamental trade-off:\n   * Tiny $h$: Lower bias (comparing very close twins), but higher variance (fewer data points).\n   * Wide $h$: Lower variance (more data points), but higher bias (curvature errors from points far from cutoff).\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $X_i$: Running variable continuously measured around cutoff $c$.\n* $c$: Policy cutoff threshold.\n* $h$: Selected bandwidth determining the estimation neighborhood $[c - h, c + h]$.\n* $\\tau$: Discontinuity jump parameter measuring treatment effect at cutoff.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\mathbf{1}(X_i \\ge c)$ | دالة التفعيل الثنائية | تحول مؤشر المعالجة إلى 1 بمجرد ملامسة أو تجاوز العتبة $c$. |\n| $\\lim_{x \\downarrow c} - \\lim_{x \\uparrow c}$ | الفارق بين النهايتين | قياس الفجوة الرأسية بين نهاية المنحنى من اليمين ونهايته من اليسار. |\n| $(X_i - c)$ | تمركز المتغير الفاصل | طرح العتبة لجعل المعامل $\\tau$ يمثل القفزة الصافية عند النقطة $c$ مباشرة. |\n| النطاق $h$ | نافذة التوازن البيزية | الموازنة بين دقة التماثل (نطاق ضيق) وحجم العينة الكافي (نطاق واسع). |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement a local linear regression estimator for Sharp RDD with a triangular weighting kernel in NumPy. You will:\n1. Filter the sample to include only observations falling within the local bandwidth window $[c - h, c + h]$.\n2. Compute the centered running variable $\\tilde{X}_i = X_i - c$ and the treatment indicator $D_i = \\mathbb{I}(X_i \\ge c)$.\n3. Construct the triangular kernel weight vector $w_i = 1 - \\frac{|X_i - c|}{h}$ and assemble the diagonal weight matrix $\\mathbf{W}$.\n4. Construct the local design matrix $\\mathbf{M} = [\\mathbf{1}, \\mathbf{D}, \\tilde{\\mathbf{X}}, \\mathbf{D} \\odot \\tilde{\\mathbf{X}}]$.\n5. Solve the weighted least squares normal equations $(\\mathbf{M}^T \\mathbf{W} \\mathbf{M}) \\hat{\\boldsymbol{\\theta}} = \\mathbf{M}^T \\mathbf{W} \\mathbf{y}$ to isolate the treatment discontinuity $\\tau = \\hat{\\theta}_1$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-regression-discontinuity-sharp",
          "starterCode": "def fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, c: float, h: float) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD within bandwidth [c - h, c + h].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    x : np.ndarray of shape (N,)\n        Running variable.\n    c : float\n        Cutoff threshold.\n    h : float\n        Bandwidth window.\n\n    Returns\n    -------\n    dict with keys 'tau_rdd', 'se_rdd'\n    \"\"\"\n    # Step 1: Filter observations within bandwidth window [c - h, c + h]\n    # Step 2: Construct centered regressors and treatment dummy\n    # Step 3: Design matrix: [1, x_centered, D, interaction]\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x = np.array([9.0, 9.5, 9.8, 10.2, 10.5, 11.0]); y = np.array([20.0, 21.0, 21.5, 32.0, 32.5, 33.0]); res = fit_sharp_rdd_local_linear(x, y, cutoff=10.0, bandwidth=1.0); f\"{res['tau']:.1f}\"",
              "expected": "10.0"
            },
            {
              "input": "x = np.array([4.0, 4.5, 4.9, 5.1, 5.5, 6.0]); y = np.array([10.0, 11.0, 11.8, 17.2, 18.0, 19.0]); res = fit_sharp_rdd_local_linear(x, y, cutoff=5.0, bandwidth=1.0); f\"{res['tau']:.1f}\"",
              "expected": "5.0"
            }
          ],
          "expectedOutput": "10.0",
          "variants": {
            "python": {
              "starterCode": "def fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, c: float, h: float) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD within bandwidth [c - h, c + h].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    x : np.ndarray of shape (N,)\n        Running variable.\n    c : float\n        Cutoff threshold.\n    h : float\n        Bandwidth window.\n\n    Returns\n    -------\n    dict with keys 'tau_rdd', 'se_rdd'\n    \"\"\"\n    # Step 1: Filter observations within bandwidth window [c - h, c + h]\n    # Step 2: Construct centered regressors and treatment dummy\n    # Step 3: Design matrix: [1, x_centered, D, interaction]\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "10.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, c: float, h: float) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD within bandwidth [c - h, c + h].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    x : np.ndarray of shape (N,)\n        Running variable.\n    c : float\n        Cutoff threshold.\n    h : float\n        Bandwidth window.\n\n    Returns\n    -------\n    dict with keys 'tau_rdd', 'se_rdd'\n    \"\"\"\n    # Step 1: Filter observations within bandwidth window [c - h, c + h]\n    mask = (x >= c - h) & (x <= c + h)\n    y_sub = y[mask]\n    x_sub = x[mask]\n    n_sub = len(y_sub)\n\n    # Step 2: Construct centered regressors and treatment dummy\n    x_centered = x_sub - c\n    d_sub = (x_sub >= c).astype(float)\n    interaction = d_sub * x_centered\n\n    # Step 3: Design matrix: [1, x_centered, D, interaction]\n    X_mat = np.column_stack([np.ones(n_sub), x_centered, d_sub, interaction])\n\n    # Step 4: Fit OLS\n    beta = np.linalg.solve(X_mat.T @ X_mat, X_mat.T @ y_sub)\n    residuals = y_sub - X_mat @ beta\n\n    tau_rdd = float(beta[2])\n    s2 = np.sum(residuals ** 2) / (n_sub - 4)\n    vcov = s2 * np.linalg.inv(X_mat.T @ X_mat)\n    se_rdd = float(np.sqrt(vcov[2, 2]))\n\n    return {\n        \"tau_rdd\": tau_rdd,\n        \"se_rdd\": se_rdd,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Filter observations within [cutoff - bandwidth, cutoff + bandwidth].",
            "ar": "رشح المشاهدات الواقعة ضمن النطاق [cutoff - bandwidth, cutoff + bandwidth]."
          },
          "tier2": {
            "en": "Center the running variable x_c = x - cutoff, and construct treatment indicator d = (x >= cutoff).",
            "ar": "ركز المتغير المستقل x_c = x - cutoff، وأنشئ متغير المعالجة d = (x >= cutoff)."
          },
          "tier3": {
            "en": "Compute triangular kernel weights w = 1.0 - abs(x_c) / bandwidth, and solve weighted least squares (X^T W X)^(-1) X^T W y.",
            "ar": "احسب أوزان النواة المثلثة w = 1.0 - abs(x_c) / bandwidth، وحل المربعات الصغرى الموزونة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A public development bank grants low-interest capital loans to small businesses with credit risk scores below an administrative cutoff of $c = 600$. An analyst attempts to estimate the causal impact of the loan on firm revenues by fitting a global 6th-order polynomial regression across all firms nationwide (credit scores ranging from 300 to 850). The global polynomial reports a massive positive discontinuity jump of $+\\$48,000$ at score 600 ($p < 0.001$). However, when plotting raw binned scatter plots within 10 points of the cutoff, observations at score 599 and score 601 appear nearly identical, displaying no visible gap. What critical econometric flaw explains this discrepancy (Gelman & Imbens 2019)?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Small business credit scores are discrete integers, which strictly invalidates the rank condition of least squares.",
                "ar": "درجات الائتمان أرقام صحيحة منفصلة مما يبطل شرط الرتبة للانحدار الخطي."
              },
              "correct": false,
              "explanation": {
                "en": "Discrete running variables require clustered standard errors or local randomization inference, but do not produce artificial 50k jumps by themselves.",
                "ar": "المتغيرات المنفصلة تتطلب تعديل الأخطاء المعيارية، لكنها لا تخلق قفزات ضخمة زائفة بمفردها."
              }
            },
            {
              "text": {
                "en": "High-order global polynomials suffer from boundary instability and Runge's oscillation: distant observations (e.g. at scores 350 and 800) exert excessive leverage on the curve, artificially contorting the polynomial near the boundary and manufacturing a spurious discontinuity.",
                "ar": "الحدوديات العامة ذات الرتب العالية تعاني من ظاهرة رونغ وعدم استقرار الحواف؛ فالنقاط البعيدة تفرض عزماً شديداً يشوه المنحنى قرب العتبة ويصنع قفزة وهمية."
              },
              "correct": true,
              "explanation": {
                "en": "Gelman and Imbens (2019) demonstrated that high-order global polynomials yield noisy, misleading point estimates because polynomial weights place bizarre, large negative and positive weights on boundary points. Researchers should always prioritize local linear regression.",
                "ar": "أثبت جيلمان وإمبنز (2019) أن الحدوديات العامة تفرز أوزاناً شاذة على الحدود وتشوه المنحنى؛ والحل القياسي المعتمد هو الانحدار الخطي الموضعي بنطاق ترددي ضيق."
              }
            },
            {
              "text": {
                "en": "The analyst forgot to log-transform credit scores before fitting the polynomial terms.",
                "ar": "نسي المحلل تحويل درجات الائتمان إلى المقياس اللوغاريثمي قبل الانحدار."
              },
              "correct": false,
              "explanation": {
                "en": "Non-linear monotonic transformations do not cure the underlying boundary leverage and oscillation problems of global polynomials.",
                "ar": "التحويل اللوغاريثمي لا يعالج التذبذب الحاد للحدوديات العامة عند الحواف."
              }
            },
            {
              "text": {
                "en": "The model had too few observations on the left of the cutoff relative to the right side.",
                "ar": "احتوى النموذج على عينات قليلة جداً على يسار العتبة مقارنة باليمين."
              },
              "correct": false,
              "explanation": {
                "en": "Sample imbalance between left and right changes standard errors, but does not mechanically manufacture fake $48,000 discontinuities.",
                "ar": "عدم توازن حجم العينة يؤثر على تباين التقدير، ولكنه ليس السبب في اختلاق قفزة كاذبة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "fuzzy-rdd-mccrary-sorting",
    "title": "Fuzzy RDD & McCrary Density Sorting Diagnostic",
    "titleAr": "تصميم انقطاع الانحدار الضبابي واختبار مككراري لتشخيص التلاعب بالعتبة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose a municipal government offers a winter heating subsidy for low-income residents whose annual reported income falls below $30,000.",
      "ar": "تخيل حكومة تقدم إعانة تدفئة شتوية للأسر محدودة الدخل التي يقل دخلها السنوي عن 30,000 دولار. يواجه هذا التحليل تعقيدين واقعيين: 1."
    },
    "prerequisites": [
      "regression-discontinuity-sharp",
      "instrumental-variables-2sls"
    ],
    "x": 790,
    "y": 1885,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "FuzzyRDDBandwidthLab",
        "narrative": {
          "en": "Suppose a municipal government offers a winter heating subsidy for low-income residents whose annual reported income falls below $30,000.\n\nTwo messy real-world complications immediately arise:\n1. **Fuzzy Compliance:** Just because you earn $29,500 doesn't mean you automatically receive the subsidy. You still have to apply, submit paperwork, and follow up. Some eligible people don't apply, and some ineligible people get special exemptions. The probability of receiving treatment jumps at $30,000, but not from 0% to 100%—perhaps it jumps from 15% to 75%. This is **Fuzzy RDD**.\n2. **Cheating & Sorting:** What if people deliberately underreport cash income or ask their employer to delay a paycheck so their reported income lands at $29,950 instead of $30,100?\n\nIf people can manipulate their position around the cutoff, the 'random experiment' is destroyed! The people just below $30,000 are no longer identical twins to those just above—they are people who are clever, desperate, or dishonest enough to manipulate their paperwork!\n\nHow can an econometrician detect whether applicants manipulated their scores?\nThrough the **McCrary Density Sorting Test**!\nIf there is no cheating, people's exam scores or incomes should form a smooth, unbroken histogram. But if people are actively gaming the system, you will see an unnatural, massive spike in applicant density stacked just below $30,000, followed by a barren desert just above!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Fuzzy RDD** | The dimmer switch: treatment probability jumps sharply at the cutoff, but imperfectly (e.g., 20% to 80%). |\n| **McCrary Density Test** | The fraud detector: checks whether people unnaturally clustered just on the winning side of the line. |\n| **Running Variable Manipulation** | Self-sorting: applicants gaming or faking their scores to guarantee receiving benefits. |\n| **Compliance Jump** | The change in treatment uptake rate observed right at the threshold. |\n| **Local Wald Ratio** | Fuzzy RDD estimate: dividing the outcome jump by the treatment probability jump. |\n\n```text\n    McCRARY FRAUD DETECTOR (DENSITY SORTING):\n\nNumber of Applicants (Density)\n      ^\n      |                               [SUSPICIOUS SPIKE!]\n      |                                     |===|\n      |                                     |===|\n      |                         |===|       |===|\n      |                   |===| |===|       |===|\n      |             |===| |===| |===|       |===| :   |===|\n      |       |===| |===| |===| |===|       |===| :   |===| |===|\n      0-------+-----+-----+-----+-----+-----+-----+---+-----+-----+---------> Income\n                                           $29.9k :  $30.1k\n                                           (Cutoff)\n```",
          "ar": "تخيل حكومة تقدم إعانة تدفئة شتوية للأسر محدودة الدخل التي يقل دخلها السنوي عن 30,000 دولار.\n\nيواجه هذا التحليل تعقيدين واقعيين:\n1. **الامتثال الضبابي (Fuzzy Compliance):** كون دخل الأسرة 29,500 دولار لا يعني تلقيها الإعانة تلقائيًا؛ إذ يجب تقديم أوراق ومتابعة الطلب. فبعض المؤهلين يتكاسلون، وبعض غير المؤهلين ينالون استثناءات. ترتفع نسبة تلقي الدعم عند عتبة 30,000 دولار، لكنها لا تقفز من 0% إلى 100%، بل تقفز مثلاً من 15% إلى 75%. هذا هو **انقطاع الانحدار الضبابي (Fuzzy RDD)**.\n2. **التلاعب والتمركز (Cheating & Sorting):** ماذا لو تعمد بعض الأفراد إخفاء جزء من دخلهم النقدي لكي يظهر دخلهم عند 29,950 دولار بدلاً من 30,100 دولار للاستفادة من الإعانة؟\n\nإذا كان الناس قادرين على التلاعب بمواقعهم، تنهار التجربة العشوائية! فالأشخاص أسفل الـ 30 ألف لن يعودوا توائم مطابقة لمن فوقها، بل سيصبحون فئة أكثر دهاءً وتلاعبًا بالأوراق!\n\nكيف يكشف الاقتصادي هذا التلاعب؟\nعبر **اختبار ماكراري لكثافة التوزيع (McCrary Density Test)**!\nفي غياب التلاعب، تتوزع أعداد الناس بسلاسة دون فجوات. أما إذا كان هناك تلاعب، فسترى قمة جبلية مفاجئة وغير طبيعية في أعداد الناس المحتشدين تحت خط الـ 30 ألف مباشرة، يقابلها فراغ فجائي فوقه!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **الانقطاع الضبابي (Fuzzy RDD)** | زر التعتيم: قفزة غير مكتملة في نسبة تلقي العلاج عند الحد الفاصل (مثل القفز من 20% إلى 80%). |\n| **اختبار ماكراري للكثافة** | كاشف التزوير: يفحص ما إذا كان الناس قد احتشدوا بصورة مصطنعة على الجانب الرابح من الخط. |\n| **التلاعب بالمتغير الفاصل** | التحايل والتمركز الذاتي: تزييف الدرجات أو الدخل لضمان السقوط في دائرة الاستحقاق. |\n| **قفزة الامتثال** | مقدار الارتفاع في نسبة الخضوع للمعالجة عند ملامسة العتبة الفاصلة. |\n| **نسبة فالد الموضعية** | حساب أثر Fuzzy RDD بقسمة قفزة النتيجة على قفزة الامتثال. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\lim_{x \\downarrow c} \\mathbb{P}(D = 1 \\mid X = x) \\ne \\lim_{x \\uparrow c} \\mathbb{P}(D = 1 \\mid X = x)",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Fuzzy RDD & McCrary Density Sorting Diagnostic.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تصميم انقطاع الانحدار الضبابي واختبار مككراري لتشخيص التلاعب بالعتبة."
        },
        "narrative": {
          "en": "The Fuzzy RDD estimand is the local Wald ratio of the outcome discontinuity to the treatment probability discontinuity:\n\n$$\n\\tau_{\\text{FRDD}} = \\frac{\\lim_{x \\downarrow c} \\mathbb{E}[Y \\mid X = x] - \\lim_{x \\uparrow c} \\mathbb{E}[Y \\mid X = x]}{\\lim_{x \\downarrow c} \\mathbb{E}[D \\mid X = x] - \\lim_{x \\uparrow c} \\mathbb{E}[D \\mid X = x]} = \\frac{\\Delta \\mathbb{E}[Y \\mid c]}{\\Delta \\mathbb{P}[D \\mid c]}\n$$\n\n**The McCrary (2008) Density Test:**\nTests the continuity of the marginal density $f_X(x)$ of the running variable at cutoff $c$:\n\n$$\nH_0: \\ln f_X(c^+) - \\ln f_X(c^-) = 0 \\quad \\text{vs} \\quad H_1: \\ln f_X(c^+) - \\ln f_X(c^-) \\ne 0\n$$\n\nA rejection of $H_0$ ($p < 0.05$) indicates manipulation of the running variable, invalidating causal identification.\n\n### Why the Math Works Step-by-Step\n\n1. **Why is Fuzzy RDD an Instrumental Variable?**\n   Cutoff crossing $\\mathbf{1}(X_i \\ge c)$ acts as the Instrument $Z$. The denominator is the First Stage (compliance jump). The numerator is the Reduced Form (outcome jump). The ratio is the Wald estimate of treatment on compliers right at the threshold!\n2. **McCrary Test Log Difference:**\n   Under true smoothness, the density ratio should equal 1 (log difference = 0). A discontinuity spike proves that units self-sorted across the boundary.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\Delta \\mathbb{E}[Y \\mid c]$: Discontinuity jump in outcome at cutoff.\n* $\\Delta \\mathbb{P}[D \\mid c]$: Compliance jump in treatment probability at cutoff.\n* $\\ln f_X(c^+) - \\ln f_X(c^-)$: McCrary log-density difference across threshold.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\tau_{\\text{FRDD}}$ | مقدر الانقطاع الضبابي | نسبة فالد الموضعية التي تقيس الأثر السببي على الممتثلين عند العتبة. |\n| $\\Delta \\mathbb{P}[D \\mid c]$ | قفزة احتمالية العلاج | مقام النسبة: التغير في نسبة المستفيدين الفعليين عند تجاوز الخط الفاصل. |\n| اختبار ماكراري | لوغاريتم فارق الكثافة | يقيس الانقطاع المفاجئ في أعداد الناس للتأكد من خلو العينة من الغش والتلاعب. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the Fuzzy RDD Wald ratio estimation engine using local linear regression in NumPy. You will:\n1. Filter the dataset to include observations within the bandwidth window $[c - h, c + h]$.\n2. Compute triangular kernel weights $w_i = 1 - \\frac{|X_i - c|}{h}$ and construct the diagonal weight matrix $\\mathbf{W}$.\n3. Construct the local design matrix $\\mathbf{M} = [\\mathbf{1}, \\mathbf{Z}, \\tilde{\\mathbf{X}}, \\mathbf{Z} \\odot \\tilde{\\mathbf{X}}]$, where $Z_i = \\mathbb{I}(X_i \\ge c)$.\n4. Estimate the reduced-form outcome jump: solve $(\\mathbf{M}^T \\mathbf{W} \\mathbf{M}) \\hat{\\boldsymbol{\\beta}}_y = \\mathbf{M}^T \\mathbf{W} \\mathbf{y}$ and extract $\\Delta Y = \\hat{\\beta}_{y, 1}$.\n5. Estimate the first-stage treatment uptake jump: solve $(\\mathbf{M}^T \\mathbf{W} \\mathbf{M}) \\hat{\\boldsymbol{\\beta}}_d = \\mathbf{M}^T \\mathbf{W} \\mathbf{d}$ and extract $\\Delta D = \\hat{\\beta}_{d, 1}$.\n6. Return the ratio $\\tau_{\\text{FRD}} = \\frac{\\Delta Y}{\\Delta D}$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-fuzzy-rdd-mccrary-sorting",
          "starterCode": "def compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    c: float,\n    h: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD local Wald estimator within bandwidth [c - h, c + h].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome.\n    d : np.ndarray of shape (N,)\n        Treatment indicator (imperfect compliance).\n    x : np.ndarray of shape (N,)\n        Running variable.\n    c : float\n        Cutoff threshold.\n    h : float\n        Bandwidth.\n\n    Returns\n    -------\n    dict with keys 'tau_fuzzy', 'first_stage_jump'\n    \"\"\"\n    # Numerator (Reduced Form): Regress y on [1, x_centered, z, z*x_centered]\n    # Denominator (First Stage): Regress d on X_mat\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x = np.array([9.0, 9.5, 9.8, 10.2, 10.5, 11.0]); d = np.array([0.1, 0.1, 0.2, 0.7, 0.8, 0.8]); y = np.array([10.0, 11.0, 11.5, 16.0, 17.0, 17.5]); res = compute_fuzzy_rdd(y, d, x, cutoff=10.0, bandwidth=1.0); f\"{res['tau_frd']:.2f}\"",
              "expected": "8.33"
            },
            {
              "input": "x = np.array([4.0, 4.5, 4.8, 5.2, 5.5, 6.0]); d = np.array([0.0, 0.1, 0.1, 0.6, 0.6, 0.7]); y = np.array([5.0, 5.5, 5.8, 9.8, 10.5, 11.0]); res = compute_fuzzy_rdd(y, d, x, cutoff=5.0, bandwidth=1.0); f\"{res['tau_frd']:.2f}\"",
              "expected": "7.74"
            }
          ],
          "expectedOutput": "8.33",
          "variants": {
            "python": {
              "starterCode": "def compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    c: float,\n    h: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD local Wald estimator within bandwidth [c - h, c + h].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome.\n    d : np.ndarray of shape (N,)\n        Treatment indicator (imperfect compliance).\n    x : np.ndarray of shape (N,)\n        Running variable.\n    c : float\n        Cutoff threshold.\n    h : float\n        Bandwidth.\n\n    Returns\n    -------\n    dict with keys 'tau_fuzzy', 'first_stage_jump'\n    \"\"\"\n    # Numerator (Reduced Form): Regress y on [1, x_centered, z, z*x_centered]\n    # Denominator (First Stage): Regress d on X_mat\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "8.33"
            }
          },
          "solution": "import numpy as np\n\ndef compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    c: float,\n    h: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD local Wald estimator within bandwidth [c - h, c + h].\n\n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome.\n    d : np.ndarray of shape (N,)\n        Treatment indicator (imperfect compliance).\n    x : np.ndarray of shape (N,)\n        Running variable.\n    c : float\n        Cutoff threshold.\n    h : float\n        Bandwidth.\n\n    Returns\n    -------\n    dict with keys 'tau_fuzzy', 'first_stage_jump'\n    \"\"\"\n    mask = (x >= c - h) & (x <= c + h)\n    y_sub = y[mask]\n    d_sub = d[mask]\n    x_sub = x[mask]\n    n_sub = len(y_sub)\n\n    x_centered = x_sub - c\n    z_instrument = (x_sub >= c).astype(float)\n\n    # Numerator (Reduced Form): Regress y on [1, x_centered, z, z*x_centered]\n    X_mat = np.column_stack([np.ones(n_sub), x_centered, z_instrument, z_instrument * x_centered])\n    beta_y = np.linalg.solve(X_mat.T @ X_mat, X_mat.T @ y_sub)\n    jump_y = float(beta_y[2])\n\n    # Denominator (First Stage): Regress d on X_mat\n    beta_d = np.linalg.solve(X_mat.T @ X_mat, X_mat.T @ d_sub)\n    jump_d = float(beta_d[2])\n\n    if abs(jump_d) < 1e-6:\n        raise ValueError(\"First stage jump is zero: No discontinuity in treatment probability.\")\n\n    tau_fuzzy = jump_y / jump_d\n\n    return {\n        \"tau_fuzzy\": float(tau_fuzzy),\n        \"first_stage_jump\": float(jump_d),\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Fuzzy RDD is a ratio of two jumps: the outcome jump (reduced form) divided by the treatment uptake jump (first stage).",
            "ar": "انقطاع الانحدار الضبابي هو نسبة قفزتين: قفزة النتيجة مقسومة على قفزة تلقي المعالجة."
          },
          "tier2": {
            "en": "Fit local linear regressions separately for y and d using triangular kernel weights on [1, z, x_c, z*x_c].",
            "ar": "قدر انحدارين خطيين موضعيين منفصلين لـ y و d باستخدام أوزان النواة المثلثة على [1, z, x_c, z*x_c]."
          },
          "tier3": {
            "en": "Extract beta_y[1] and beta_d[1]. The Wald estimand is tau_frd = beta_y[1] / beta_d[1].",
            "ar": "استخرج beta_y[1] و beta_d[1]. المقدر هو tau_frd = beta_y[1] / beta_d[1]."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Under French labor regulations, enterprises with 50 or more employees are legally required to establish a formal worker council and provide mandatory supplemental benefits. A labor policy research institute seeks to measure the causal impact of worker councils on firm innovation using a Fuzzy RDD design around the 50-employee threshold ($c = 50$). The research team plots the empirical density histogram of firm sizes across all registered businesses in France. The McCrary density diagnostic reveals an enormous, towering spike at exactly 49 employees, accompanied by a sudden, severe drop at 50, 51, and 52 employees. How does this McCrary density histogram shape impact the causal validity of using RDD for this investigation?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تصميم انقطاع الانحدار الضبابي واختبار مككراري لتشخيص التلاعب بالعتبة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The spike at 49 employees provides extra sample size near the boundary, increasing the statistical power of the local linear estimator.",
                "ar": "التكدس عند 49 عاملاً يزيد من حجم العينة قرب العتبة مما يرفع القوة الإحصائية للنموذج."
              },
              "correct": false,
              "explanation": {
                "en": "More observations do not help if those observations are systematically self-selected rather than quasi-randomly assigned.",
                "ar": "زيادة حجم العينة لا تنفع إذا كانت البيانات ناتجة عن اختيار ذاتي منحاز وليست تجربة شبه عشوائية."
              }
            },
            {
              "text": {
                "en": "The sharp bunching spike at 49 employees proves active manipulation and strategic sorting: business owners intentionally freeze hiring or employ contractors to evade the 50-employee mandate. Because firms at 49 are systematically and strategically different from firms that expand past 50, the continuity assumption fails, entirely invalidating the RDD design.",
                "ar": "التكدس الحاد عند 49 عاملاً يثبت التلاعب الاستراتيجي الصريح؛ حيث يتعمد أصحاب العمل تجميد التوظيف للتهرب من اشتراطات القانون، مما يخرق فرضية الاستمرارية ويبطل صلاحية RDD بالكامل."
              },
              "correct": true,
              "explanation": {
                "en": "When economic agents have precise control over the running variable and strong incentives to stay below the threshold, units just below the cutoff possess unobserved traits (such as regulatory avoidance acumen) that destroy exchangeability with units above the cutoff.",
                "ar": "عندما يتحكم الفاعلون الاقتصاديون في المتغير الجاري بدقة للتهرب من القانون، تصبح الشركات تحت العتبة مختلفة جوهرياً عن التي فوقها، مما يسقط فرضية الاستمرارية المحلية."
              }
            },
            {
              "text": {
                "en": "Because firms at 49 exhibit stronger compliance, the first-stage denominator is strengthened, improving the Wald ratio.",
                "ar": "بما أن شركات 49 تحقق امتثالاً أقوى، فإن قفزة المرحلة الأولى تزداد دقة."
              },
              "correct": false,
              "explanation": {
                "en": "The first stage measures compliance at the cutoff, but sorting invalidates the exclusion restriction and exogeneity of the cutoff itself.",
                "ar": "زيادة قفزة المرحلة الأولى لا تحمي النموذج إذا كانت العتبة نفسها ملوثة بتلاعب سلوكي مقصود."
              }
            },
            {
              "text": {
                "en": "The bunching is standard firm growth noise and can be eliminated simply by expanding the bandwidth $h$ to 100 employees.",
                "ar": "هذا التكدس مجرد ضجيج طبيعي ويمكن حله بتوسيع النطاق الترددي إلى 100."
              },
              "correct": false,
              "explanation": {
                "en": "Expanding the bandwidth includes completely non-comparable massive corporations and introduces severe functional form bias without resolving the sorting at the boundary.",
                "ar": "توسيع النطاق الترددي يدمج شركات عملاقة غير متطابقة ويزيد الانحياز دون معالجة التلاعب عند العتبة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "synthetic-control-method",
    "title": "The Synthetic Control Method (Abadie et al.)",
    "titleAr": "طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In November 1988, California voters passed Proposition 99, an aggressive anti-tobacco initiative that increased cigarette excise taxes by...",
      "ar": "في نوفمبر 1988، أقر الناخبون في ولاية كاليفورنيا الأمريكية المقترح 99 (Proposition 99)؛ وهو قانون صارم لمكافحة التبغ فرض ضريبة باهظة على..."
    },
    "prerequisites": [
      "panel-data-fixed-effects",
      "orthogonal-projections"
    ],
    "x": 770,
    "y": 1980,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SyntheticControlDonorLab",
        "narrative": {
          "en": "In November 1988, California voters passed **Proposition 99**, an aggressive anti-tobacco initiative that increased cigarette excise taxes by 25 cents per pack and funded statewide anti-smoking campaigns.\n\nPublic health researchers immediately wanted to know: *did Proposition 99 cause a drop in cigarette consumption, and by how much?*\n\nStandard comparative methods failed:\n* You cannot use a randomized trial because you cannot randomly assign statewide tax hikes to California.\n* You cannot just compare California before and after 1988 because smoking was already trending downward nationwide.\n* You cannot just pick a single control state like Texas or New York because California has a unique economy, climate, and demographic makeup. No other single state is California's twin!\n\nIn 2003, Alberto Abadie, Alexis Diamond, and Jens Hainmueller created an extraordinary solution: the **Synthetic Control Method (SCM)**.\n\nThey asked: *what if no single state is California's twin, but a carefully weighted RECIPE of states is?*\nBy finding optimal non-negative weights that sum to 100%, SCM cooks up a **Synthetic California**:\n$$\\text{Synthetic California} = 0.25(\\text{Utah}) + 0.35(\\text{Montana}) + 0.15(\\text{Nevada}) + 0.25(\\text{Connecticut})$$\nThroughout the 1970s and 1980s, this synthetic recipe tracked actual California cigarette sales with uncanny, millimeter precision!\n\nThen 1988 arrives. Real California passes Proposition 99, and its cigarette sales plunge downward. Synthetic California (which never had the tax) continues along the old trend. The growing gap between real California and synthetic California is the pure causal effect of the policy!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Synthetic Control (SCM)** | The digital twin: a weighted blend of untreated peers that mimics the treated unit. |\n| **Donor Pool** | The pantry of ingredients: all candidate control states that never implemented the policy. |\n| **Convex Combination** | Honest blending: weights are non-negative and sum to 1.0 (no crazy extrapolation). |\n| **Pre-Treatment Fit** | The mirror test: how tightly the synthetic twin tracked the treated unit before the law passed. |\n| **Treatment Trajectory** | The divergent path: the post-law gap between the real unit and its synthetic twin. |\n\n```text\n    THE SYNTHETIC CONTROL DIVERGENCE:\n\nCigarette Sales (Packs per Capita)\n      ^\n      |    Actual California  :    Synthetic California (The Untreated Twin)\n      |    - - - - - - - - -  :    =========================================\n  120 |      *               :\n      |       \\  *           :       *\n  100 |        \\   \\ *       :      / \\  *               * (Synthetic California Trend)\n      |         \\     \\      :     /   \\   \\  *        *\n   80 |          *     *     :    *     *    *   *   *\n      |                 \\    :                      \\\n   60 |                  \\   :                       * Actual California (Prop 99 Plunge!)\n      |                   \\  :                        \\\n   40 0--------------------+---------------------------*---------------------> Year\n                         1988 (Prop 99 Passed)\n```",
          "ar": "في نوفمبر 1988، أقر الناخبون في ولاية كاليفورنيا الأمريكية **المقترح 99 (Proposition 99)**؛ وهو قانون صارم لمكافحة التبغ فرض ضريبة باهظة على علب السجائر وموّل حملات توعية عامة واسعة النطاق.\n\nأراد مسؤولو الصحة العامة معرفة النتيجة الحتمية: *هل نجح المقترح في خفض استهلاك السجائر فعليًا، وبأي مقدار؟*\n\nفشلت كل المناهج الإحصائية المعتادة:\n* لا يمكنك إجراء تجربة عشوائية على ولاية عملاقة ككاليفورنيا.\n* لا يمكنك الاكتفاء بمقارنة كاليفورنيا قبل وبعد 1988 لأن التدخين كان ينخفض تدريجيًا على مستوى البلاد بأسرها.\n* لا يمكنك اختيار ولاية واحدة كضابط (مثل تكساس أو نيويورك)؛ فلا توجد ولاية واحدة تشبه كاليفورنيا في اقتصادها ومناخها وسكانها.\n\nفي عام 2003، ابتكر ألبرتو أباديا وزملاؤه حلاً عبقريًا مذهلاً: **منهج الضابط الاصطناعي (Synthetic Control Method - SCM)**.\n\nطرح أباديا تساؤلاً ذكيًا: *إذا كانت كاليفورنيا لا تملك توأمًا واحدًا، فماذا لو صنعنا لها توأمًا عبر وصفة موزونة من عدة ولايات؟*\nقام الباحثون بحساب أوزان رياضية موجبة مجموعها 100% لبناء **كاليفورنيا اصطناعية**:\n$$\\text{كاليفورنيا الاصطناعية} = 25\\%(\\text{يوتا}) + 35\\%(\\text{مونتانا}) + 15\\%(\\text{نيفادا}) + 25\\%(\\text{كونيتيكت})$$\nطوال عقدي السبعينيات والثمانينيات، تطابقت مبيعات السجائر في كاليفورنيا الاصطناعية مع كاليفورنيا الحقيقية بدقة مذهلة!\n\nوعندما حل عام 1988 وطُبق القانون، انحدر استهلاك السجائر في كاليفورنيا الحقيقية انحدارًا حادًا، بينما واصلت كاليفورنيا الاصطناعية مسارها الطبيعي. والفجوة المتسعة بين الخطين بعد 1988 هي الأثر السببي الصافي للقانون!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **الضابط الاصطناعي (SCM)** | التوأم الرقمي: مزيج موزون من وحدات لم تخضع للمعالجة يحاكي سلوك الوحدة المعالجة. |\n| **حوض المانحين (Donor Pool)** | سلة الخيارات: مجموعة الولايات التي لم تطبق القانون مطلقًا لتشكيل التوأم منها. |\n| **التركيبة المحدبة (Convex)** | الخلط النزيه: أوزان موجبة مجموعها 1.0 لتفادي التخمين الخارجي غير الواقعي. |\n| **التطابق المسبق** | اختبار المرآة: مدى دقة تطابق التوأم الاصطناعي مع الوحدة الحقيقية قبل صدور القانون. |\n| **فجوة المسار السببي** | التباعد بعد القرار: المسافة الفاصلة بين الواقع الحقيقي وتوأمه الاصطناعي بعد التدخل. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{W} = \\left\\{ \\mathbf{W} \\in \\mathbb{R}^J \\;\\middle|\\; w_j \\ge 0, \\quad \\sum_{j=2}^{J+1} w_j = 1 \\right\\}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for The Synthetic Control Method (Abadie et al.).",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية."
        },
        "narrative": {
          "en": "The optimal weights minimize the pre-intervention predictor distance:\n\n$$\n\\min_{\\mathbf{W} \\in \\mathcal{W}} \\|\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W}\\|_V^2 = (\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W})^T \\mathbf{V} (\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W})\n$$\n\nwhere $\\mathbf{V}$ is a positive semi-definite predictor importance weighting matrix.\n\nThe treatment effect trajectory for any post-intervention period $t > T_0$ is:\n\n$$\n\\hat{\\tau}_{1t} = Y_{1t} - \\sum_{j=2}^{J+1} w_j^* Y_{jt}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why constrain weights to the unit simplex ($w_j \\ge 0, \\sum w_j = 1$)?**\n   Non-negative weights prevent **extrapolation**. In standard linear regression, coefficients can be negative or giant numbers, predicting synthetic outcomes outside the realm of physical possibility. The simplex constraint guarantees pure interpolation within the support of the donor pool!\n2. **Sparsity of the Solution:**\n   Because the objective is optimized over a simplex polytope, the optimal weight vector $\\mathbf{W}^*$ is naturally sparse: only a small handful of donor units receive positive weights, making the synthetic twin fully transparent and interpretable.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\mathbf{X}_1 \\in \\mathbb{R}^{K \\times 1}$: Pre-intervention characteristics vector of treated unit.\n* $\\mathbf{X}_0 \\in \\mathbb{R}^{K \\times J}$: Pre-intervention characteristics matrix of donor pool.\n* $\\mathbf{W}^* \\in \\mathcal{W}$: Optimal simplex weight vector cooking up the synthetic twin.\n* $\\hat{\\tau}_{1t}$: Estimated causal gap at post-intervention time $t$.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\mathcal{W}$ | فضاء البساطة المحدبة (Simplex) | قيد رياضي يفرض أوزانًا موجبة مجموعها 1 لضمان المزج المنطقي الواقعي. |\n| $\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W}$ | فجوة التطابق المسبق | الفارق بين صفات الوحدة الحقيقية وتوأمها الاصطناعي خلال سنوات ما قبل القرار. |\n| $\\mathbf{V}$ | مصفوفة أهمية الميزات | مصفوفة ترجيحية تعطي وزنًا أكبر للخصائص الأكثر قدرة على التنبؤ بالمستقبل. |\n| $\\hat{\\tau}_{1t}$ | الفجوة السببية التراكمية | الأثر السببي الصافي المقاس كفارق بين مسار الواقع ومسار التوأم الاصطناعي. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the Synthetic Control simplex-constrained optimization routine using Projected Gradient Descent in NumPy. You will:\n1. Initialize a uniform weight vector $\\mathbf{w}_0 = [\\frac{1}{J}, \\dots, \\frac{1}{J}]^T$.\n2. In each iteration, evaluate the objective function gradient: $\\nabla_{\\mathbf{w}} f(\\mathbf{w}) = -\\mathbf{X}_0^T (\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{w})$.\n3. Take a gradient descent step: $\\mathbf{w}_{\\text{next}} = \\mathbf{w} - \\eta \\nabla f(\\mathbf{w})$.\n4. Project the updated vector back onto the probability simplex ($\\sum w_j = 1, w_j \\ge 0$) using an efficient sorting projection algorithm.\n5. Return the optimal weights and the final squared Euclidean loss $\\|\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{w}^*\\|_2^2$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-synthetic-control-method",
          "starterCode": "def fit_synthetic_control_simplex(\n    y_treated_pre: np.ndarray,\n    Y_donor_pre: np.ndarray,\n    max_iter: int = 1000,\n    lr: float = 0.01\n) -> np.ndarray:\n    \"\"\"\n    Solves for non-negative Synthetic Control weights summing to 1 (projected gradient descent).\n\n    Parameters\n    ----------\n    y_treated_pre : np.ndarray of shape (T0,)\n        Pre-treatment outcome trajectory of treated unit.\n    Y_donor_pre : np.ndarray of shape (T0, J)\n        Pre-treatment trajectories of J donor control units.\n\n    Returns\n    -------\n    np.ndarray of shape (J,) : Simplex weights w.\n    \"\"\"\n    # Initialize weights uniformly on the simplex\n    # Projected gradient descent to minimize ||y - Y w||^2\n    # Step\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X1 = np.array([10.0, 20.0]); X0 = np.array([[10.0, 0.0], [20.0, 0.0]]); res = fit_synthetic_control_simplex(X1, X0, max_iter=200); f\"{res['w'][0]:.1f}, {res['loss']:.2f}\"",
              "expected": "1.0, 0.00"
            },
            {
              "input": "X1 = np.array([15.0, 15.0]); X0 = np.array([[10.0, 20.0], [10.0, 20.0]]); res = fit_synthetic_control_simplex(X1, X0, max_iter=200); f\"{res['w'][0]:.2f}, {res['w'][1]:.2f}\"",
              "expected": "0.50, 0.50"
            }
          ],
          "expectedOutput": "1.0, 0.00",
          "variants": {
            "python": {
              "starterCode": "def fit_synthetic_control_simplex(\n    y_treated_pre: np.ndarray,\n    Y_donor_pre: np.ndarray,\n    max_iter: int = 1000,\n    lr: float = 0.01\n) -> np.ndarray:\n    \"\"\"\n    Solves for non-negative Synthetic Control weights summing to 1 (projected gradient descent).\n\n    Parameters\n    ----------\n    y_treated_pre : np.ndarray of shape (T0,)\n        Pre-treatment outcome trajectory of treated unit.\n    Y_donor_pre : np.ndarray of shape (T0, J)\n        Pre-treatment trajectories of J donor control units.\n\n    Returns\n    -------\n    np.ndarray of shape (J,) : Simplex weights w.\n    \"\"\"\n    # Initialize weights uniformly on the simplex\n    # Projected gradient descent to minimize ||y - Y w||^2\n    # Step\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0, 0.00"
            }
          },
          "solution": "import numpy as np\n\ndef fit_synthetic_control_simplex(\n    y_treated_pre: np.ndarray,\n    Y_donor_pre: np.ndarray,\n    max_iter: int = 1000,\n    lr: float = 0.01\n) -> np.ndarray:\n    \"\"\"\n    Solves for non-negative Synthetic Control weights summing to 1 (projected gradient descent).\n\n    Parameters\n    ----------\n    y_treated_pre : np.ndarray of shape (T0,)\n        Pre-treatment outcome trajectory of treated unit.\n    Y_donor_pre : np.ndarray of shape (T0, J)\n        Pre-treatment trajectories of J donor control units.\n\n    Returns\n    -------\n    np.ndarray of shape (J,) : Simplex weights w.\n    \"\"\"\n    t0, J = Y_donor_pre.shape\n    # Initialize weights uniformly on the simplex\n    w = np.full(J, 1.0 / J)\n\n    # Projected gradient descent to minimize ||y - Y w||^2\n    for _ in range(max_iter):\n        error = y_treated_pre - Y_donor_pre @ w\n        grad = -2.0 * Y_donor_pre.T @ error\n\n        # Step\n        w = w - lr * grad\n        # Project onto non-negative orthant\n        w = np.maximum(w, 0.0)\n        # Normalize to sum to 1\n        s = np.sum(w)\n        w = w / s if s > 0 else np.full(J, 1.0 / J)\n\n    return w"
        },
        "hints": {
          "tier1": {
            "en": "Synthetic control weights must be non-negative and sum to exactly 1.",
            "ar": "يجب أن تكون أوزان الشبيه الاصطناعي غير سالبة ومجموعها يساوي واحداً تماماً."
          },
          "tier2": {
            "en": "Gradient of 0.5 * ||X1 - X0 @ w||^2 with respect to w is -X0.T @ (X1 - X0 @ w).",
            "ar": "تدرج دالة الخسارة بالنسبة لـ w هو -X0.T @ (X1 - X0 @ w)."
          },
          "tier3": {
            "en": "Project weights onto the probability simplex after each gradient step to enforce the convex hull constraint.",
            "ar": "أسقط الأوزان على مجسم الاحتمالات المحدب بعد كل خطوة تدرج لفرض قيد النطاق المحدب."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "In their landmark 2015 study, Abadie, Diamond, and Hainmueller evaluated the economic consequence of the 1990 German Reunification on West Germany's per capita GDP using the Synthetic Control Method. A junior economic researcher proposes including East Germany, Austria, and Poland in the donor pool to match West Germany's industrial structure and regional proximity. Why does including East Germany in the donor pool fatally violate the foundational causal assumptions of the Synthetic Control Method?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "East Germany's geographical surface area is smaller than West Germany's, violating dimensional proportionality axioms.",
                "ar": "مساحة ألمانيا الشرقية أصغر من الغربية مما يخل بالتناسب البعدي."
              },
              "correct": false,
              "explanation": {
                "en": "Land area is irrelevant unless directly modeled; SCM matches economic predictor matrices.",
                "ar": "المساحة الجغرافية لا تشترط التطابق؛ فالمطابقة تتم على الخصائص الاقتصادية."
              }
            },
            {
              "text": {
                "en": "East Germany was directly, fundamentally transformed by the reunification treatment itself. Including units directly treated or heavily contaminated by policy spillovers in the donor pool violates the Stable Unit Treatment Value Assumption (SUTVA), severely contaminating the counterfactual trajectory.",
                "ar": "ألمانيا الشرقية كانت طرفاً مباشراً وتأثرت كلياً بصدمة إعادة التوحيد نفسها؛ وإدراج وحدات خاضعة للمعالجة في حوض المانحين يخرق فرضية ثبات قيمة المعالجة (SUTVA) ويلوث المسار المقابل للواقع تماماً."
              },
              "correct": true,
              "explanation": {
                "en": "Donors must be strictly unexposed to the treatment and free from spillover contamination. If a donor is affected by the treatment, the synthetic counterfactual moves with the treatment, masking or distorting the true causal effect.",
                "ar": "يشترط في الوحدات المانحة أن تكون محايدة وخالية تماماً من صدمة المعالجة أو آثارها غير المباشرة (Spillover). وإذا تأثر المانح بالسياسة، تشوه المسار المقابل للواقع وفقدت الدراسة مصداقيتها."
              }
            },
            {
              "text": {
                "en": "SCM requires all donor units to possess strictly higher GDP per capita than the treated unit.",
                "ar": "تشترط الخوارزمية أن تمتلك جميع الوحدات المانحة ناتجاً محلياً أعلى من الوحدة المعالجة."
              },
              "correct": false,
              "explanation": {
                "en": "To form a valid convex combination, the treated unit must lie inside the convex hull (some donors higher, some lower).",
                "ar": "لتكوين مزيج محدب، يجب أن يقع المستهدف داخل النطاق (بعض المانحين أعلى وبعضهم أدنى)."
              }
            },
            {
              "text": {
                "en": "Former Eastern Bloc nations cause the donor matrix $\\mathbf{X}_0^T \\mathbf{X}_0$ to become mathematically non-invertible.",
                "ar": "دول الكتلة الشرقية تجعل مصفوفة المانحين غير قابلة للقَلْب الحسابي."
              },
              "correct": false,
              "explanation": {
                "en": "SCM solves a constrained convex optimization over weights, not an unconstrained OLS matrix inversion.",
                "ar": "لا تعتمد SCM على قلب المصفوفات المباشر، بل على الاستمثال المحدب المقيد."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "synthetic-control-placebo-tests",
    "title": "Synthetic Controls Inference & In-Space / In-Time Permutation Tests",
    "titleAr": "الاستدلال الإحصائي للشبيه الاصطناعي واختبارات المهدئ الوهمي المكانية والزمانية",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "You run the Synthetic Control Method on California's Proposition 99 and discover that cigarette sales plunged by 25 packs per capita.",
      "ar": "طبقت منهج الضابط الاصطناعي على قانون كاليفورنيا لمكافحة التبغ ووجدت أن مبيعات السجائر انخفضت بمقدار 25 علبة للفرد."
    },
    "prerequisites": [
      "synthetic-control-method",
      "central-limit-theorem"
    ],
    "x": 790,
    "y": 2075,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SCMPlaceboPermutationLab",
        "narrative": {
          "en": "You run the Synthetic Control Method on California's Proposition 99 and discover that cigarette sales plunged by 25 packs per capita.\n\nA skeptical critic raises their hand: *\"How do you know that 25-pack drop isn't just random luck? In any group of 50 states, some state is always going to have the biggest drop by pure chance. You only have ONE treated state ($N = 1$), so you cannot run a standard t-test!\"*\n\nThe critic has a brilliant point: traditional statistical hypothesis tests fail when you only have a single treated unit.\n\nHow do we prove the critic wrong? Through **In-Space Placebo Permutation Tests**.\n\nWe repeat the exact same synthetic control procedure on every single state in the donor pool, pretending that **they** passed the law in 1988:\n* We construct a 'Synthetic Nevada' and calculate fake Nevada's gap.\n* We construct a 'Synthetic Montana' and calculate fake Montana's gap.\n* We construct a synthetic control for all 38 donor states!\n\nWhen you plot all 38 fake placebo gaps on a single graph, they form a tight, buzzing tangle of lines centered right around zero (the **Spaghetti Plot**). Real California plunges dramatically below the entire bundle of placebo lines!\n\nTo formalize this, we calculate the **RMSPE Ratio** ($\\text{Post-law gap} / \\text{Pre-law fit}$). If California has a higher ratio than all 38 placebo states, the exact permutation $p$-value is $\\frac{1}{39} = 0.025$—statistically significant at the 5% level!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **In-Space Placebo** | The fake experiment: pretending an untreated control unit was treated to measure baseline noise. |\n| **In-Time Placebo** | The fake timeline: pretending the law was passed 5 years before it actually happened. |\n| **RMSPE** | Root Mean Squared Prediction Error: the average distance between a unit and its synthetic twin. |\n| **RMSPE Ratio** | The signal-to-noise ratio: (Post-intervention error) / (Pre-intervention fit error). |\n| **Permutation P-value** | Exact rank probability: California's ranking among all placebo units divided by total units. |\n\n```text\n    THE SCM PLACEBO SPAGHETTI PLOT:\n\nTreatment Gap (Actual - Synthetic)\n      ^\n      |                Pre-1988 (Good Fit)     :    Post-1988 (Treatment Impact)\n   20 |                 \\     /     /          :      /     /   /\n      |                  \\   /     /           :     /     /   /  (Donor Placebo Gaps)\n    0 |  - - - - - - - - - - - - - - - - - - - : - - - - - - - - - - - - - - - - - - - -\n      |                  /   \\     \\           :     \\     \\   \\  (Random Fluctuation Noise)\n  -20 |                 /     \\     \\          :      \\     \\   \\\n      |                                        :       \\\n  -40 |                                        :        * REAL CALIFORNIA (Extreme Outlier!)\n      0----------------------------------------+----------------------------------------> Year\n                                             1988\n```",
          "ar": "طبقت منهج الضابط الاصطناعي على قانون كاليفورنيا لمكافحة التبغ ووجدت أن مبيعات السجائر انخفضت بمقدار 25 علبة للفرد.\n\nيقف ناقد متشكك ويسألك: *\"كيف تثبت أن هذا الانخفاض ليس مجرد صدفة عشوائية؟ ففي أي عينة من 50 ولاية، لا بد وأن تكون إحدى الولايات هي الأكثر انخفاضًا بالصدفة المحضة! وأنت تملك ولاية معالجة واحدة فقط ($N=1$)، مما يعني استحالة إجراء اختبار $t$ التقليدي!\"*\n\nالناقد محق في تحديه؛ فالطرق الإحصائية التقليدية تفشل عند دراسة حالة فريدة واحدة.\n\nكيف نجيب عن هذا التحدي علميًا؟ عبر **اختبارات الغُفْل المكانية (In-Space Placebo Tests)**.\n\nنعيد تطبيق خوارزمية الضابط الاصطناعي ذاتها على كل ولاية في حوض المانحين، متظاهرين بأنها **هي** التي طبقت القانون في 1988:\n* نبني توأمًا اصطناعيًا لنيفادا ونحسب فجوتها الوهمية.\n* نبني توأمًا اصطناعيًا لمونتانا ونحسب فجوتها الوهمية.\n* نكرر ذلك عبر جميع الـ 38 ولاية المتبقية!\n\nعند رسم مسارات هذه التجارب الوهمية معًا، تتشابك خطوطها حول الصفر كخيوط السباغيتي. وتبرز كاليفورنيا الحقيقية كخط وحيد يغوص عميقًا في الأسفل بمفرده خارج سرب كل الولايات الوهمية!\n\nونحسب **نسبة خطأ RMSPE** (فجوة ما بعد القانون مقسومة على جودة تطابق ما قبل القانون). وإذا كانت نسبة كاليفورنيا أعلى من كافة الولايات الـ 38، فإن القيمة الاحتمالية الدقيقة هي $\\frac{1}{39} = 0.025$، مما يثبت نجاح القانون بدلالة إحصائية قاطعة!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **الغُفْل المكاني (In-Space Placebo)** | التجربة الزائفة: التظاهر بمعالجة ولاية ضابطة لقياس حجم الصدفة الطبيعية. |\n| **الغُفْل الزماني (In-Time Placebo)** | التوقيت المزيف: التظاهر بصدور القانون قبل موعده بـ 5 سنوات لاختبار متانة النموذج. |\n| **جذر متوسط مربعات الخطأ (RMSPE)** | مقياس الفجوة: متوسط المسافة الفاصلة بين الولاية وتوأمها الاصطناعي. |\n| **نسبة RMSPE** | نسبة الإشارة إلى التشويش: قسمة فجوة ما بعد القانون على دقة ما قبل القانون. |\n| **القيمة الاحتمالية التباديلية** | الترتيب الدقيق: رتبة كاليفورنيا بين الولايات مقسومة على إجمالي عدد الحالات. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{RMSPE}_j^{\\text{pre}} = \\sqrt{\\frac{1}{T_0} \\sum_{t=1}^{T_0} \\left( Y_{jt} - \\hat{Y}_{jt}^{\\text{synth}} \\right)^2}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Synthetic Controls Inference & In-Space / In-Time Permutation Tests.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الاستدلال الإحصائي للشبيه الاصطناعي واختبارات المهدئ الوهمي المكانية والزمانية."
        },
        "narrative": {
          "en": "$$\n\\text{RMSPE}_j^{\\text{post}} = \\sqrt{\\frac{1}{T - T_0} \\sum_{t=T_0+1}^T \\left( Y_{jt} - \\hat{Y}_{jt}^{\\text{synth}} \\right)^2}\n$$\n\nThe ratio of post-to-pre RMSPE measures treatment signal relative to baseline noise:\n\n$$\nr_j = \\frac{\\text{RMSPE}_j^{\\text{post}}}{\\text{RMSPE}_j^{\\text{pre}}}\n$$\n\nUnder the sharp null hypothesis of no treatment effect for any unit ($H_0: \\tau_{1t} = 0$), Abadie, Diamond, and Hainmueller (2010) formulate the exact permutation $p$-value:\n\n$$\np = \\frac{\\sum_{j=1}^{J+1} \\mathbf{1}(r_j \\ge r_1)}{J + 1}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why divide by $\\text{RMSPE}^{\\text{pre}}$?**\n   Some donor states fit very poorly before treatment (large $\\text{RMSPE}^{\\text{pre}}$). A state with a terrible pre-treatment fit will naturally have a huge post-treatment gap purely due to bad modeling! Dividing by pre-treatment RMSPE penalizes poorly fitted placebos, ensuring a fair, normalized playing field.\n2. **Exact Finite-Sample Permutation Test:**\n   Unlike asymptotic t-tests requiring $N \\to \\infty$, Fisher's permutation test is exact in finite samples regardless of distribution assumptions.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $r_1$: Post/Pre RMSPE ratio for the truly treated unit.\n* $r_j$: Post/Pre RMSPE ratio for placebo donor unit $j$.\n* $p$: Exact permutation $p$-value evaluating the rarity of the treated unit's response.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\text{RMSPE}^{\\text{pre}}$ | خطأ التطابق المسبق | دقة التوأم الاصطناعي في تمثيل الوحدة قبل صدور القرار. |\n| $\\text{RMSPE}^{\\text{post}}$ | فجوة ما بعد التدخل | حجم الانحراف والانفصال بين الوحدة وتوأمها بعد صدور القرار. |\n| $r_j$ | نسبة الإشارة إلى الضوضاء | النسبة المعيارية التي تمنع التوأم الضعيف من إعطاء انطباع مضلل. |\n| القيمة الاحتمالية $p$ | إحصائية فيشر التباديلية | نسبة الحالات الوهمية التي حققت أثرًا يفوق أثر الوحدة المعالجة الحقيقية. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the Synthetic Control permutation inference engine in NumPy. You will:\n1. Extract pre-treatment gaps ($t \\in [0, T_0)$) and post-treatment gaps ($t \\in [T_0, T)$) for all units.\n2. Calculate $\\text{RMSPE}_{\\text{pre}}$ and $\\text{RMSPE}_{\\text{post}}$ for each column in the gaps matrix.\n3. Compute the ratio $r_j = \\frac{\\text{RMSPE}_{\\text{post}}(j)}{\\text{RMSPE}_{\\text{pre}}(j)}$ (adding $\\epsilon = 10^{-8}$ to prevent zero-division).\n4. Compute the exact empirical $p$-value and determine the 1-based rank of the treated unit (column 0)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-synthetic-control-placebo-tests",
          "starterCode": "def compute_rmspe_ratio_pvalue(rmspe_pre: np.ndarray, rmspe_post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and the exact permutation p-value for SCM placebos.\n\n    Parameters\n    ----------\n    rmspe_pre : np.ndarray of shape (J+1,)\n        Index 0 is treated unit, indices 1..J are donor placebos.\n    rmspe_post : np.ndarray of shape (J+1,)\n        Index 0 is treated unit, indices 1..J are donor placebos.\n\n    Returns\n    -------\n    dict with keys 'treated_ratio', 'p_value'\n    \"\"\"\n    # Avoid zero division\n    # Permutation p-value: proportion of units with ratio >= treated_ratio\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "gaps = np.array([[0.1, 0.1, 5.0, 5.0], [0.5, 0.5, 0.5, 0.5], [1.0, 1.0, 1.0, 1.0]]).T; res = compute_rmspe_ratio_pvalue(gaps, t0_idx=2); f\"{res['p_value']:.4f}, {res['rank']}\"",
              "expected": "0.3333, 1"
            },
            {
              "input": "gaps = np.array([[0.2, 0.2, 0.2, 0.2], [0.1, 0.1, 4.0, 4.0], [0.5, 0.5, 0.5, 0.5]]).T; res = compute_rmspe_ratio_pvalue(gaps, t0_idx=2); f\"{res['rank']}\"",
              "expected": "3"
            }
          ],
          "expectedOutput": "0.3333, 1",
          "variants": {
            "python": {
              "starterCode": "def compute_rmspe_ratio_pvalue(rmspe_pre: np.ndarray, rmspe_post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and the exact permutation p-value for SCM placebos.\n\n    Parameters\n    ----------\n    rmspe_pre : np.ndarray of shape (J+1,)\n        Index 0 is treated unit, indices 1..J are donor placebos.\n    rmspe_post : np.ndarray of shape (J+1,)\n        Index 0 is treated unit, indices 1..J are donor placebos.\n\n    Returns\n    -------\n    dict with keys 'treated_ratio', 'p_value'\n    \"\"\"\n    # Avoid zero division\n    # Permutation p-value: proportion of units with ratio >= treated_ratio\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.3333, 1"
            }
          },
          "solution": "import numpy as np\n\ndef compute_rmspe_ratio_pvalue(rmspe_pre: np.ndarray, rmspe_post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and the exact permutation p-value for SCM placebos.\n\n    Parameters\n    ----------\n    rmspe_pre : np.ndarray of shape (J+1,)\n        Index 0 is treated unit, indices 1..J are donor placebos.\n    rmspe_post : np.ndarray of shape (J+1,)\n        Index 0 is treated unit, indices 1..J are donor placebos.\n\n    Returns\n    -------\n    dict with keys 'treated_ratio', 'p_value'\n    \"\"\"\n    # Avoid zero division\n    ratios = rmspe_post / np.maximum(rmspe_pre, 1e-8)\n    treated_ratio = float(ratios[0])\n\n    # Permutation p-value: proportion of units with ratio >= treated_ratio\n    count_extreme = np.sum(ratios >= treated_ratio)\n    p_value = float(count_extreme / len(ratios))\n\n    return {\n        \"treated_ratio\": treated_ratio,\n        \"p_value\": p_value,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Compute pre-RMSPE over periods 0 to t0_idx, and post-RMSPE over periods t0_idx to T.",
            "ar": "احسب pre-RMSPE للفترات من 0 إلى t0_idx، و post-RMSPE للفترات من t0_idx إلى T."
          },
          "tier2": {
            "en": "The ratio is post_rmspe / pre_rmspe for the treated unit (column 0) and all placebo donor units.",
            "ar": "النسبة هي post_rmspe / pre_rmspe للوحدة المعالجة (العمود 0) ولجميع وحدات المقارنة الوهمية."
          },
          "tier3": {
            "en": "Empirical p-value is the fraction of all units whose RMSPE ratio is greater than or equal to the treated unit's ratio.",
            "ar": "القيمة الاحتمالية التجريبية هي نسبة الوحدات التي تفوق نسبة RMSPE الخاصة بها نسبة الوحدة المعالجة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "In Alberto Abadie and Javier Gardeazabal's (2003) classic study on the economic costs of terrorism in the Basque Country, the authors evaluate whether the Basque per capita GDP gap after 1975 was statistically significant by running in-space placebos across 16 other Spanish regions. Suppose region #12 (Extremadura) exhibits a raw post-1975 gap that is twice as large as the Basque Country's gap. However, Extremadura's pre-1975 RMSPE was 14 times larger than the Basque pre-1975 RMSPE because its agrarian economy could not be matched well by the donor pool. How does the standardized RMSPE ratio ($r_j = \\text{RMSPE}_{\\text{post}} / \\text{RMSPE}_{\\text{pre}}$) correctly handle this case compared to evaluating raw post-treatment gaps?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الاستدلال الإحصائي للشبيه الاصطناعي واختبارات المهدئ الوهمي المكانية والزمانية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Raw post-treatment gaps are always preferred because pre-treatment errors are white noise that cancels out over time.",
                "ar": "الفجوات المطلقة بعد المعالجة أفضل دائماً لأن أخطاء ما قبل المعالجة تلغي بعضها تلقائياً."
              },
              "correct": false,
              "explanation": {
                "en": "Pre-treatment errors reflect fundamental mismatch, not mean-zero independent noise; poor pre-treatment fit guarantees large, erratic post-treatment gaps.",
                "ar": "أخطاء ما قبل المعالجة تعكس فشل المطابقة الهيكلية وليست مجرد ضجيج عابر."
              }
            },
            {
              "text": {
                "en": "The RMSPE ratio penalizes regions with poor pre-treatment fit: although Extremadura has a large raw post-treatment gap, dividing by its massive pre-treatment error yields a small RMSPE ratio, preventing volatile, poorly-matched placebos from artificially destroying the statistical significance of the treated unit.",
                "ar": "تعاقب نسبة RMSPE المناطق سيئة المطابقة المسبقة؛ فرغم كبر الفجوة المطلقة لإكستريمادورا بعد 1975، فإن قسمتها على خطأ المطابقة المسبق الضخم ينتج نسبة RMSPE ضئيلة، مما يمنع الوحدات الشاذة من إفساد الدلالة الإحصائية للوحدة المعالجة."
              },
              "correct": true,
              "explanation": {
                "en": "An untreated unit that was never well-matched prior to the policy cannot provide a credible falsification test; scaling by baseline error ensures that only units with genuine post-treatment divergence relative to baseline are ranked highly.",
                "ar": "الوحدة التي فشلت الخوارزمية في تمثيلها قبل المعالجة لا تصلح كاختبار وهمي موثوق؛ وتوحيد المقياس بالنسبة يحمي مصداقية الاستدلال الإحصائي."
              }
            },
            {
              "text": {
                "en": "The ratio forces Extremadura's donor weights to become negative, automatically dropping it from the permutation distribution.",
                "ar": "تجبر النسبة أوزان إكستريمادورا على أن تصبح سالبة مما يستبعدها من التوزيع."
              },
              "correct": false,
              "explanation": {
                "en": "Permutation tests evaluate fitted gaps across all units; weights are fixed non-negative values within each unit's optimization.",
                "ar": "أوزان الشبيه الاصطناعي مقيدة بعدم السلبية دائماً داخل خوارزمية كل وحدة."
              }
            },
            {
              "text": {
                "en": "The ratio mathematically transforms the non-parametric permutation distribution into an asymptotic Gaussian Student's t-distribution.",
                "ar": "تحول النسبة التوزيع غير المعلمي إلى توزيع غاوسي طبيعي كلاسيكي."
              },
              "correct": false,
              "explanation": {
                "en": "The permutation test remains strictly non-parametric; it makes no distributional assumptions whatsoever.",
                "ar": "يظل اختبار التباديل لا معلمياً تماماً ولا يعتمد على افتراض التوزيع الطبيعي."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "ridge-lasso",
    "title": "Ridge Regression (L2) & SVD Spectral Shrinkage",
    "titleAr": "انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are tasked with predicting home sale prices using 120 detailed property features: square footage, number of bedrooms, number of...",
      "ar": "تخيل أنك تبني نموذجًا للتنبؤ بأسعار المنازل باستخدام 120 ميزة دقيقة: المساحة الإجمالية، عدد الغرف، عدد الحمامات، ارتفاع السقف، مساحة..."
    },
    "prerequisites": [
      "multiple-regression-matrix-calculus",
      "singular-value-decomposition"
    ],
    "x": 825,
    "y": 2170,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RegularizationGeometryCanvas",
        "narrative": {
          "en": "Imagine you are tasked with predicting home sale prices using 120 detailed property features: square footage, number of bedrooms, number of bathrooms, ceiling height, distance to highway, square footage of each bedroom, hallway width, and garden area.\n\nMany of these features are heavily correlated with each other. When regressors are collinear, the $(X^T X)$ matrix is on the verge of collapsing into non-invertibility. Standard OLS panics: it tries to balance tiny differences by assigning wild, exploding coefficients—like predicting +$1,500,000 for total square footage and -$1,480,000 for living room square footage! Your model becomes a fragile, overfitted house of cards that collapses on fresh test data.\n\nHow do we tame this wild behavior? Through **Regularization** and **Ridge Regression (L2)**.\n\nThink of Ridge Regression as putting a **flexible dog leash** on your coefficients.\nInstead of minimizing squared errors alone, Ridge adds a penalty proportional to the sum of squared weights: $\\lambda \\sum \\beta_j^2$.\n* When $\\lambda = 0$, the leash is unclipped: you get wild, overfitted OLS.\n* When $\\lambda > 0$, the leash tugs gently inward: it shrinks all coefficients smoothly toward zero.\n\nGeometrically, the L2 constraint forms a **smooth circular ball** centered at zero. As the expanding OLS loss ellipses touch this circular ball, coefficients are shrunk in proportion to how noisy and redundant their feature directions are. By accepting a tiny amount of bias, Ridge dramatically slashes coefficient variance!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Regularization** | The leash: adding a mathematical penalty to stop a model from memorizing noise. |\n| **Ridge Regression (L2)** | Shrinkage penalty: penalizing the sum of squared weights ($\\beta_1^2 + \\beta_2^2$). |\n| **Hyperparameter ($\\lambda$)** | The leash tension: controls how aggressively coefficients are pulled toward zero. |\n| **Bias-Variance Trade-Off** | The grand bargain: accepting a tiny bit of training error to achieve massive test accuracy. |\n| **SVD Shrinkage Factor** | How Ridge shrinks: directions with tiny eigenvalues (high noise) get shrunk the most. |\n\n```text\n    THE RIDGE L2 GEOMETRY:\n\nbeta_2\n         ^                   Contours of OLS Loss Ellipses\n         |                              / \\\n         |                            /  .  \\\n         |       +-----------+       |  (OLS)|\n         |      /             \\       \\     /\n         |     |   L2 Ball     |        \\ /\n         |     |  ||beta|| <= C|=======> * RIDGE SOLUTION (Point of Contact!)\n         |      \\             /\n    -----+-------+-----------+-------------------------> beta_1\n         |\n```",
          "ar": "تخيل أنك تبني نموذجًا للتنبؤ بأسعار المنازل باستخدام 120 ميزة دقيقة: المساحة الإجمالية، عدد الغرف، عدد الحمامات، ارتفاع السقف، مساحة الحديقة، ومساحة كل غرفة نوم على حدة.\n\nترتبط هذه الميزات ببعضها ارتباطًا وثيقًا. وعندما تتشابك المتغيرات وتتعدد خطيًا، تقترب مصفوفة الحساب من الانهيار الرياضي. وحينها تصاب طريقة OLS الكلاسيكية بالجنون: تحاول موازنة الفروق الطفيفة بوضع معاملات عملاقة متناقضة—مثل وضع معامل +1,500,000 لمساحة المنزل، يقابله -1,480,000 لمساحة الصالة! ويتحول نموذجك إلى قصر من ورق ينهار فور اختباره على بيانات جديدة.\n\nكيف نروّض هذا التمرد الإحصائي؟ عبر **التقييد المنتظم (Regularization)** و**انحدار ريدج (Ridge L2)**.\n\nتخيل انحدار ريدج كـ **طوق مطاطي مرن** يُقيد حركة المعاملات.\nفبدلاً من تقليل أخطاء التنبؤ وحدها، يضيف ريدج غرامة رياضية تتناسب مع مجموع مربعات المعاملات: $\\lambda \\sum \\beta_j^2$.\n* عندما يكون $\\lambda = 0$، ينفك القيد ونحصل على انحدار OLS المفرط في التعقيد.\n* وعندما يرتفع $\\lambda > 0$، يشد الطوق المعاملات بلطف نحو الصفر.\n\nهندسيًا، يشكل قيد L2 **كرة دائرية ملساء** مركزها نقطة الأصل. وكلما لامست منحنيات الخطأ هذه الكرة، انكمشت المعاملات وتلاشت عشوائيتها. وعبر التضحية بقدر ضئيل جدًا من عدم التحيز، ينجح ريدج في خفض التشتت والخطأ التنبؤي خفضًا هائلاً!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **التقييد المنتظم (Regularization)** | الطوق الواقي: عقوبة رياضية تمنع النموذج من حفظ التشويش العشوائي للبيانات. |\n| **انحدار ريدج (L2)** | غرامة الانكماش: فرض عقوبة على مجموع مربعات الأوزان ($\\beta_1^2 + \\beta_2^2$). |\n| **معامل التقييد ($\\lambda$)** | شدة الطوق: مقياس يتحكم في قوة سحب المعاملات نحو نقطة الصفر. |\n| **مقايضة الانحياز والتباين** | الصفقة الرابحة: قبول انحياز طفيف في التدريب مقابل تفوق كاسح في بيانات الاختبار. |\n| **انكماش القيم المفردة (SVD)** | آلية عمل ريدج: قمع الاتجاهات الضعيفة المليئة بالتشويش بأقصى قوة. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "S_{\\text{ridge}}(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\|\\boldsymbol{\\beta}\\|_2^2 = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) + \\lambda \\boldsymbol{\\beta}^T \\boldsymbol{\\beta}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Ridge Regression (L2) & SVD Spectral Shrinkage.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة."
        },
        "narrative": {
          "en": "Taking the gradient with respect to $\\boldsymbol{\\beta}$ and setting to zero:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} S_{\\text{ridge}}(\\boldsymbol{\\beta}) = -2\\mathbf{X}^T \\mathbf{y} + 2\\mathbf{X}^T \\mathbf{X}\\boldsymbol{\\beta} + 2\\lambda \\boldsymbol{\\beta} = \\mathbf{0}\n$$\n\n$$\n(\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I}_K)\\hat{\\boldsymbol{\\beta}}_{\\text{ridge}} = \\mathbf{X}^T \\mathbf{y} \\implies \\hat{\\boldsymbol{\\beta}}_{\\text{ridge}} = (\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I}_K)^{-1} \\mathbf{X}^T \\mathbf{y}\n$$\n\nUsing the Singular Value Decomposition (SVD) $\\mathbf{X} = \\mathbf{U} \\boldsymbol{\\Sigma} \\mathbf{V}^T$, the ridge predictions decompose into singular component shrinkage factors:\n\n$$\n\\hat{\\mathbf{y}}_{\\text{ridge}} = \\sum_{j=1}^K \\mathbf{u}_j \\left( \\frac{\\sigma_j^2}{\\sigma_j^2 + \\lambda} \\right) \\mathbf{u}_j^T \\mathbf{y}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why does adding $\\lambda \\mathbf{I}$ guarantee invertibility?**\n   Even if columns of $\\mathbf{X}$ are perfectly collinear and $\\mathbf{X}^T \\mathbf{X}$ is singular (has zero eigenvalues), adding $\\lambda > 0$ shifts every eigenvalue up by $\\lambda$: $\\text{eig}(\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I}) = \\sigma_j^2 + \\lambda > 0$. The matrix becomes strictly positive definite and always invertible!\n2. **SVD Shrinkage Factor:**\n   * When singular value $\\sigma_j$ is large (strong signal): $\\frac{\\sigma_j^2}{\\sigma_j^2 + \\lambda} \\approx 1$ (barely shrunk).\n   * When $\\sigma_j$ is tiny (collinear noise): $\\frac{\\sigma_j^2}{\\sigma_j^2 + \\lambda} \\approx 0$ (heavily suppressed).\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\lambda \\ge 0$: Tuning hyperparameter governing penalty strength.\n* $\\mathbf{I}_K$: $K \\times K$ identity matrix regularizing parameter slopes.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{ridge}}$: Closed-form L2 regularized coefficient vector.\n* $\\frac{\\sigma_j^2}{\\sigma_j^2 + \\lambda}$: Shrinkage multiplier applied to singular component $j$.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\lambda \\|\\boldsymbol{\\beta}\\|_2^2$ | عقوبة L2 التربيعية | الغرامة المضافة لدالة الخسارة لسحب كافة المعاملات سحبًا تدريجيًا نحو الصفر. |\n| $\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I}$ | مصفوفة غرام المعدلة | إضافة $\\lambda$ للقطر الرئيسي لضمان قابلية المصفوفة للعكس دائمًا واستقرارها. |\n| $\\frac{\\sigma_j^2}{\\sigma_j^2 + \\lambda}$ | معامل انكماش المكونات | نسبة الاحتفاظ بكل إشارة؛ حيث تُحفظ الإشارات القوية وتُقمع المتغيرات الهزيلة. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the closed-form Ridge regression solver and compute its SVD spectral shrinkage factors in NumPy. You will:\n1. Construct the regularized Gram matrix $\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I}_p$.\n2. Solve the linear system for the optimal Ridge parameter vector $\\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}}$.\n3. Compute the Singular Value Decomposition of $\\mathbf{X}$ to obtain singular values $\\sigma_j$.\n4. Calculate the component shrinkage factors $f_j = \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda}$ and sum them to obtain the effective degrees of freedom $\\text{df}(\\lambda)$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-ridge-lasso",
          "starterCode": "def fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> np.ndarray:\n    \"\"\"\n    Fits Ridge Regression (L2) using Singular Value Decomposition (SVD).\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    lmbda : float\n        L2 regularization parameter >= 0.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Ridge coefficients beta.\n    \"\"\"\n    # SVD: X = U Sigma V^T\n    # Shrinkage factor: s_j / (s_j^2 + lambda)\n    # beta_ridge = V @ diag(shrinkage) @ U^T y\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X = np.array([[1.0, 1.0], [1.0, 2.0], [2.0, 2.0], [2.0, 3.0]]); y = np.array([2.0, 3.0, 4.0, 5.0]); res = fit_ridge_svd(X, y, lmbda=0.1); f\"{res['beta'][0]:.2f}, {res['df_effective']:.2f}\"",
              "expected": "0.96, 1.94"
            },
            {
              "input": "X = np.array([[1.0, 0.0], [0.0, 1.0]]); y = np.array([3.0, 4.0]); res = fit_ridge_svd(X, y, lmbda=0.5); f\"{res['beta'][0]:.2f}, {res['beta'][1]:.2f}\"",
              "expected": "1.00, 1.33"
            }
          ],
          "expectedOutput": "0.96, 1.94",
          "variants": {
            "python": {
              "starterCode": "def fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> np.ndarray:\n    \"\"\"\n    Fits Ridge Regression (L2) using Singular Value Decomposition (SVD).\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    lmbda : float\n        L2 regularization parameter >= 0.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Ridge coefficients beta.\n    \"\"\"\n    # SVD: X = U Sigma V^T\n    # Shrinkage factor: s_j / (s_j^2 + lambda)\n    # beta_ridge = V @ diag(shrinkage) @ U^T y\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.96, 1.94"
            }
          },
          "solution": "import numpy as np\n\ndef fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> np.ndarray:\n    \"\"\"\n    Fits Ridge Regression (L2) using Singular Value Decomposition (SVD).\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    lmbda : float\n        L2 regularization parameter >= 0.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Ridge coefficients beta.\n    \"\"\"\n    # SVD: X = U Sigma V^T\n    U, s, Vt = np.linalg.svd(X, full_matrices=False)\n\n    # Shrinkage factor: s_j / (s_j^2 + lambda)\n    shrinkage = s / (s ** 2 + lmbda)\n\n    # beta_ridge = V @ diag(shrinkage) @ U^T y\n    beta_ridge = Vt.T @ (shrinkage * (U.T @ y))\n\n    return beta_ridge"
        },
        "hints": {
          "tier1": {
            "en": "Add 2 * N * lambda * I to the design matrix covariance X^T X before solving for beta.",
            "ar": "أضف 2 * N * lambda * I إلى مصفوفة تغاير التصميم X^T X قبل الحل للمعاملات beta."
          },
          "tier2": {
            "en": "Singular values are obtained from SVD of X. Spectral shrinkage factor is s_j^2 / (s_j^2 + 2*N*lambda).",
            "ar": "تُستخرج القيم المنفردة من تفكيك SVD للمصفوفة X. معامل الانكماش الطيفي هو s_j^2 / (s_j^2 + 2*N*lambda)."
          },
          "tier3": {
            "en": "Effective degrees of freedom is the sum of the spectral shrinkage factors across all components.",
            "ar": "درجة الحرية الفعالة هي مجموع معاملات الانكماش الطيفي عبر جميع المكونات."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "A clinical informatics team develops a risk score to predict acute heart failure in ICU patients using 35 physiological markers. Four of the hemodynamic metrics—Systolic Blood Pressure (SBP), Diastolic Blood Pressure (DBP), Mean Arterial Pressure (MAP), and Pulse Pressure (PP)—are mechanically intertwined by definition ($MAP \\approx DBP + \\frac{1}{3}(SBP - DBP)$), producing pairwise Pearson correlations exceeding $0.97$. When fitting standard unregularized OLS, the fitted model yields destabilized parameters: $+84.5$ on SBP and $-81.2$ on MAP, with gigantic standard errors ($SE \\approx 52.0$). On an external validation cohort, the model's Mean Squared Error explodes by $400\\%$. How does estimating a Ridge regression model resolve this empirical breakdown?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Ridge regression eliminates two of the four blood pressure features by setting their coefficients to exactly zero.",
                "ar": "يحذف انحدار ريدج اثنين من متغيرات ضغط الدم عبر تصفير معاملاتها تماماً."
              },
              "correct": false,
              "explanation": {
                "en": "Ridge shrinks coefficients continuously; it lacks the polyhedral diamond corners of $L_1$ and never sets coefficients to absolute zero.",
                "ar": "يقلص انحدار ريدج المعاملات بسلاسة ولا يصفر أي معامل مطلقاً؛ فتصفير المعاملات خاصية حصرية لـ Lasso."
              }
            },
            {
              "text": {
                "en": "Ridge conditions the ill-conditioned Gram matrix by adding a positive constant $2n\\lambda$ to all eigenvalues. The $L_2$ penalty pulls the inflated, opposing collinear coefficients back toward stable, moderate values, drastically reducing prediction variance and preventing test set error explosion.",
                "ar": "يضبط انحدار ريدج المصفوفة شبه الشاذة بإضافة ثابت موجب $2n\\lambda$ لكافة القيم الذاتية؛ فيسحب المعاملات المتضخمة والمتعارضة نحو قيم مستقرة ومعتدلة، مما يقلص تباين التنبؤ ويمنع انفجار الخطأ في العينات الجديدة."
              },
              "correct": true,
              "explanation": {
                "en": "Multicollinearity inflates the variance of coefficients without affecting bias; Ridge stabilizes the inverse $(\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I})^{-1}$ and slashes estimation variance, dramatically improving out-of-sample generalization.",
                "ar": "يتسبب التداخل الخطي في تضخيم تباين المعاملات؛ ويقوم تنظيم ريدج بجعل مقلوب المصفوفة مستقراً ويقلل تباين التنبؤ بشكل حاسم، مما يرفع دقة التعميم على بيانات المرضى الجدد."
              }
            },
            {
              "text": {
                "en": "Ridge converts the linear model into a non-linear ensemble of decision stumps.",
                "ar": "يحول انحدار ريدج النموذج الخطي إلى تجميعة غير خطية من أشجار القرار."
              },
              "correct": false,
              "explanation": {
                "en": "Ridge remains a strictly linear regression model; it only modifies the optimization penalty.",
                "ar": "يظل انحدار ريدج نموذجاً خطياً بحتاً ولا يغير بنية الدالة."
              }
            },
            {
              "text": {
                "en": "Ridge proves that the true causal effect of SBP is zero under the Gauss-Markov theorem.",
                "ar": "يثبت انحدار ريدج أن الأثر السببي الحقيقي لضغط الدم هو صفر وفق مبرهنة غاوس-ماركوف."
              },
              "correct": false,
              "explanation": {
                "en": "Ridge is a biased estimator designed to minimize mean squared error, and makes no claims regarding structural causal identification.",
                "ar": "انحدار ريدج مقدر متحيز يهدف لتقليل خطأ التنبؤ وليس له علاقة بإثبات انعدام الأثر السببي."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "elastic-net-coordinate-descent",
    "title": "Lasso Regression (L1), Polyhedral Geometry & Elastic Net",
    "titleAr": "انحدار لاسو وهندسة متعدد السطوح وشبكة المرونة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose a medical genetics laboratory sequences 20,000 genetic markers from patient blood samples to predict the risk of developing a rare...",
      "ar": "تخيل مختبرًا للجينات يحلل 20,000 علامة وراثية في عينات دم المرضى للتنبؤ بمخاطر الإصابة بمرض مناعي نادر."
    },
    "prerequisites": [
      "ridge-lasso",
      "multivariable-scalar-fields"
    ],
    "x": 805,
    "y": 2265,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RegularizationGeometryCanvas",
        "narrative": {
          "en": "Suppose a medical genetics laboratory sequences 20,000 genetic markers from patient blood samples to predict the risk of developing a rare autoimmune condition.\n\nFrom biological science, we know that out of these 20,000 genes, only **3 or 4 specific mutations** actually trigger the disease; the other 19,996 genes are innocent bystanders.\n\nIf you run Ridge regression (L2) on this dataset, what happens?\nRidge shrinks all 20,000 coefficients down to tiny numbers (like 0.00004 or 0.00012). But it leaves **every single gene inside the model!** A doctor cannot inspect a model with 20,000 tiny decimal numbers and understand which genes cause the disease.\n\nWe need a method that can automatically perform **Feature Selection**: setting irrelevant genes to **EXACTLY ZERO**.\n\nThis is the superpower of **Lasso Regression (L1)**.\nInstead of squaring coefficients, Lasso penalizes the sum of their **absolute values**: $\\lambda \\sum |\\beta_j|$.\n\nWhy does taking absolute values make coefficients become exactly zero?\nBecause the geometric constraint of the L1 penalty is a **diamond with sharp, pointed corners** lying directly on the coordinate axes! When the expanding loss ellipses expand outward, they almost always touch the diamond at one of its sharp corners. At that sharp corner, the other coordinate is identically zero!\n\nLasso acts like an automatic scalpel: it slices away the 19,996 irrelevant features and leaves you with a sparse, interpretable model.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Lasso (L1)** | The scalpel: penalizes absolute values, forcing irrelevant features to become exactly zero. |\n| **Sparsity** | Clean simplicity: a model where most coefficients are zero, leaving only key drivers. |\n| **Soft Thresholding** | The pulling operator: shrinks values toward zero and snaps small values to exact zero. |\n| **Elastic Net** | The hybrid: blends L1 (feature selection) and L2 (group stability) penalties together. |\n| **Coordinate Descent** | Solving one by one: cycling through features and optimizing one knob at a time. |\n\n```text\n    THE LASSO L1 DIAMOND GEOMETRY:\n\nbeta_2\n         ^                   Contours of OLS Loss Ellipses\n         |                              / \\\n         |            /\\              /  .  \\\n         |           /  \\            |  (OLS)|\n         |          /    \\            \\     /\n         |         /  L1  \\             \\ /\n         |        /Diamond \\             |\n    -----+-------+----------*------------+---------------------> beta_1\n         |        \\        /  (Touches exact corner tip! beta_2 = 0)\n         |         \\      /\n         |          \\    /\n         |           \\  /\n         |            \\/\n```",
          "ar": "تخيل مختبرًا للجينات يحلل 20,000 علامة وراثية في عينات دم المرضى للتنبؤ بمخاطر الإصابة بمرض مناعي نادر.\n\nنعلم بيولوجيًا أنه من بين الـ 20,000 جين، هناك **3 أو 4 طفرات جينية محددة فقط** هي المسؤولة فعليًا عن المرض؛ بينما الـ 19,996 جينًا المتبقية بريئة تمامًا.\n\nإذا طبقت انحدار ريدج (L2) على هذه البيانات، فماذا سيحدث؟\nسيقوم ريدج بتقليص جميع الـ 20,000 معامل إلى كسور عشرية دقيقة (مثل 0.00004)، لكنه سيبقي عليها جميعًا في النموذج! يستحيل على الطبيب فحص 20 ألف جين لمعرفة السبب الحقيقي.\n\nنحتاج إلى خوارزمية تملك مهارة **انتقاء الميزات (Feature Selection)**: أي تصفير الجينات غير المؤثرة وجعل معاملاتها **صفرًا صريحًا**!\n\nهذه هي القوة الخارقة لـ **انحدار لاسو (Lasso L1)**.\nفبدلاً من تربيع المعاملات، يفرض لاسو غرامة على **قيمها المطلقة**: $\\lambda \\sum |\\beta_j|$.\n\nلماذا تؤدي القيمة المطلقة إلى تصفير المعاملات تمامًا؟\nلأن القيد الهندسي لمعيار L1 هو **معين ذو زوايا وأطراف حادة** تقع مباشرة على محاور الإحداثيات! وعندما تتسع منحنيات دالة الخطأ، فإن أول نقطة تلامسها تكون غالبًا أحد هذه الأطراف المدببة الحادة. وعند هذا الطرف الحاد، تكون الميزات الأخرى مساوية للصفر الحقيقي تمامًا!\n\nيعمل لاسو كمشرط جراحي ذكي: يستأصل 19,996 متغيرًا غير مفيد، ويترك لك نموذجًا نقيًا وواضحًا يسهل تفسيره طبيًا وعلميًا.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **انحدار لاسو (L1)** | المشرط الجراحي: يعاقب القيم المطلقة ويجبر الميزات غير المجدية على التحول لصفر تام. |\n| **الندرة (Sparsity)** | النقاء والاختصار: نموذج تكون أغلب معاملاته أصفارًا ليبقى الأثر للأسباب الحقيقية. |\n| **العتبة اللينة (Soft Thresholding)** | مشغل السحب: يسحب المعامل نحو الصفر، فإن كان صغيرًا أسقطه على الصفر فورًا. |\n| **الشبكة المرنة (Elastic Net)** | النموذج الهجين: يدمج بين مشرط لاسو لانتقاء الميزات وطوق ريدج لتحقيق الاستقرار. |\n| **هبوط الإحداثيات (Coordinate Descent)** | الحل خطوة بخطوة: تحسين معامل متغير واحد في كل خطوة مع تثبيت بقية المتغيرات. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "S_{\\text{enet}}(\\boldsymbol{\\beta}) = \\frac{1}{2N} \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\left[ \\alpha \\|\\boldsymbol{\\beta}\\|_1 + \\frac{1 - \\alpha}{2} \\|\\boldsymbol{\\beta}\\|_2^2 \\right]",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Lasso Regression (L1), Polyhedral Geometry & Elastic Net.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ انحدار لاسو وهندسة متعدد السطوح وشبكة المرونة."
        },
        "narrative": {
          "en": "where $\\alpha \\in [0, 1]$ balances Lasso ($\\alpha = 1$) and Ridge ($\\alpha = 0$).\n\nFor pure Lasso ($\\alpha = 1$) with standardized orthogonal regressors, the subgradient condition yields the **Soft-Thresholding Operator**:\n\n$$\n\\hat{\\beta}_j = \\mathcal{S}_{\\lambda}(z_j) \\equiv \\text{sign}(z_j) \\cdot \\max(0, |z_j| - \\lambda)\n$$\n\nwhere $z_j = \\mathbf{x}_j^T (\\mathbf{y} - \\sum_{k \\ne j} \\mathbf{x}_k \\beta_k)$ is the partial residual correlation for feature $j$.\n\nIn Coordinate Descent, each coefficient is updated sequentially:\n\n$$\n\\beta_j^{(t+1)} \\leftarrow \\frac{\\mathcal{S}_{\\lambda \\alpha}\\left( \\mathbf{x}_j^T (\\mathbf{y} - \\mathbf{X}_{-j} \\boldsymbol{\\beta}_{-j}) \\right)}{\\mathbf{x}_j^T \\mathbf{x}_j + \\lambda(1 - \\alpha)}\n$$\n\n### Why the Math Works Step-by-Step\n\n1. **Why does Lasso produce exact zeros while Ridge does not?**\n   The derivative of $\\beta^2$ at zero is $2(0) = 0$; the slope flattens out, so the penalty exerts zero pull right at the origin.\n   In contrast, the subgradient of $|\\beta|$ at zero is the set $[-1, 1]$; it maintains a constant, steep cliff of force right up to the boundary, snapping any coefficient whose correlation is less than $\\lambda$ directly onto zero!\n2. **Coordinate Descent Efficiency:**\n   Because the objective is non-differentiable only along the coordinate axes, optimizing each coordinate one by one via soft thresholding is guaranteed to converge to the global minimum.\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n* $\\|\\boldsymbol{\\beta}\\|_1 = \\sum |\\beta_j|$: L1 norm penalty inducing coefficient sparsity.\n* $\\alpha \\in [0, 1]$: Elastic Net mixing parameter ($\\alpha = 1$ is Lasso; $\\alpha = 0$ is Ridge).\n* $\\mathcal{S}_\\lambda(z)$: Soft-thresholding operator snapping small correlations to zero.",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس العملي |\n| :--- | :--- | :--- |\n| $\\|\\boldsymbol{\\beta}\\|_1$ | معيار L1 المطلق | مجموع القيم المطلقة للأوزان؛ يشكل الأطراف المدببة التي تصفر الميزات الزائدة. |\n| $\\mathcal{S}_\\lambda(z)$ | مشغل العتبة اللينة | المشغل الرياضي الذي يقتطع $\\lambda$ من القيمة ويسقط ما دونها على الصفر الصريح. |\n| $\\alpha$ | معامل الموازنة الهجين | نسبة الخلط بين مشرط انتقاء لاسو وقوة استقرار ريدج في الشبكة المرنة. |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي\n\nImplement the Elastic Net coordinate descent solver with soft-thresholding in NumPy. You will:\n1. Define the soft-thresholding operator $\\mathcal{S}(z, \\gamma) = \\text{sign}(z)\\max(|z| - \\gamma, 0)$.\n2. Compute the partial residual $\\mathbf{r}^{(-j)} = \\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta} + \\mathbf{x}_j \\beta_j$ and the unconstrained projection $z_j = \\frac{1}{n}\\mathbf{x}_j^T \\mathbf{r}^{(-j)}$.\n3. Update each coordinate $\\beta_j \\leftarrow \\frac{\\mathcal{S}(z_j, \\lambda\\alpha)}{\\frac{1}{n}\\|\\mathbf{x}_j\\|_2^2 + \\lambda(1 - \\alpha)}$.\n4. Cycle through all $p$ features until the maximum parameter shift between iterations drops below tolerance $\\text{tol}$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-elastic-net-coordinate-descent",
          "starterCode": "def fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float = 0.5,\n    max_iter: int = 500,\n    tol: float = 1e-4\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net / Lasso using Coordinate Descent and Soft Thresholding.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Standardized design matrix.\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization strength.\n    alpha : float, default 0.5\n        1.0 = Pure Lasso (L1), 0.0 = Pure Ridge (L2).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Elastic net coefficients beta.\n    \"\"\"\n    # Partial residual: y - sum_{m != j} X_m beta_m\n    # Soft thresholding of rho_j by l1_penalty\n    # Update with L2 denominator\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X = np.array([[1.0, 0.0], [0.0, 1.0], [-1.0, 0.0], [0.0, -1.0]]); y = np.array([2.0, 0.05, -2.0, -0.05]); beta = fit_elastic_net(X, y, lmbda=0.2, alpha=1.0); f\"{beta[0]:.2f}, {beta[1]:.2f}\"",
              "expected": "0.80, 0.00"
            },
            {
              "input": "X = np.array([[1.0, 0.0], [0.0, 1.0], [-1.0, 0.0], [0.0, -1.0]]); y = np.array([1.0, 1.0, -1.0, -1.0]); beta = fit_elastic_net(X, y, lmbda=0.1, alpha=0.5); f\"{beta[0]:.2f}, {beta[1]:.2f}\"",
              "expected": "0.43, 0.43"
            }
          ],
          "expectedOutput": "0.80, 0.00",
          "variants": {
            "python": {
              "starterCode": "def fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float = 0.5,\n    max_iter: int = 500,\n    tol: float = 1e-4\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net / Lasso using Coordinate Descent and Soft Thresholding.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Standardized design matrix.\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization strength.\n    alpha : float, default 0.5\n        1.0 = Pure Lasso (L1), 0.0 = Pure Ridge (L2).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Elastic net coefficients beta.\n    \"\"\"\n    # Partial residual: y - sum_{m != j} X_m beta_m\n    # Soft thresholding of rho_j by l1_penalty\n    # Update with L2 denominator\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.80, 0.00"
            }
          },
          "solution": "import numpy as np\n\ndef fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float = 0.5,\n    max_iter: int = 500,\n    tol: float = 1e-4\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net / Lasso using Coordinate Descent and Soft Thresholding.\n\n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Standardized design matrix.\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization strength.\n    alpha : float, default 0.5\n        1.0 = Pure Lasso (L1), 0.0 = Pure Ridge (L2).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance.\n\n    Returns\n    -------\n    np.ndarray of shape (K,) : Elastic net coefficients beta.\n    \"\"\"\n    n, k = X.shape\n    beta = np.zeros(k)\n    X_sq = np.sum(X ** 2, axis=0)\n\n    l1_penalty = lmbda * alpha\n    l2_penalty = lmbda * (1.0 - alpha)\n\n    for _ in range(max_iter):\n        beta_prev = beta.copy()\n\n        for j in range(k):\n            # Partial residual: y - sum_{m != j} X_m beta_m\n            r_j = y - (X @ beta - X[:, j] * beta[j])\n            rho_j = float(X[:, j] @ r_j)\n\n            # Soft thresholding of rho_j by l1_penalty\n            if rho_j > l1_penalty:\n                val = rho_j - l1_penalty\n            elif rho_j < -l1_penalty:\n                val = rho_j + l1_penalty\n            else:\n                val = 0.0\n\n            # Update with L2 denominator\n            denom = X_sq[j] + l2_penalty\n            beta[j] = val / denom if denom > 0 else 0.0\n\n        if np.max(np.abs(beta - beta_prev)) < tol:\n            break\n\n    return beta"
        },
        "hints": {
          "tier1": {
            "en": "Coordinate descent cycles through one feature at a time, computing partial residuals without feature j.",
            "ar": "يفحص الهبوط الإحداثي متغيراً واحداً في كل دورة، حاسباً البواقي الجزئية دون المتغير j."
          },
          "tier2": {
            "en": "Apply soft thresholding sign(z) * max(|z| - lambda*alpha, 0) to unconstrained projection z_j.",
            "ar": "طبق العتبة المرنة sign(z) * max(|z| - lambda*alpha, 0) على الإسقاط الحر z_j."
          },
          "tier3": {
            "en": "Divide the soft-thresholded numerator by (norm_sq[j] + lambda*(1 - alpha)) to get the updated beta_j.",
            "ar": "اقسم البسط بعد تطبيق العتبة على (norm_sq[j] + lambda*(1 - alpha)) للحصول على beta_j المحدثة."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why is Elastic Net ($\\alpha = 0.5$) mathematically superior to pure Lasso for this genomic task?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ انحدار لاسو وهندسة متعدد السطوح وشبكة المرونة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Pure Lasso exhibits extreme selection instability under high collinearity: it arbitrarily selects a single representative feature from a correlated cluster and discards the rest. Elastic Net's quadratic $L_2$ component provides the \"grouping effect,\" shrinking the coefficients of correlated genes toward each other and retaining the entire functional biological pathway together.",
                "ar": "يعاني لاسو النقي من عدم استقرار شديد عند وجود تداخل خطي مرتفع، حيث يختار عشوائياً متغيراً واحداً من مجموعة الجينات المترابطة ويهمل البقية. ويوفر مركب $L_2$ في شبكة المرونة \"أثر التجميع\"، مما يقلص معاملات الجينات المترابطة نحو بعضها ويحافظ على المسار الحيوي كاملاً."
              },
              "correct": true,
              "explanation": {
                "en": "The $L_1$ penalty alone cannot distinguish between perfectly collinear predictors, choosing one arbitrarily based on sample noise. The strictly convex $L_2$ penalty forces coefficients of correlated regressors toward equality, preserving biologically linked groups.",
                "ar": "يعجز تنظيم $L_1$ بمفرده عن المفاضلة بين المتغيرات المترابطة تماماً فينتقي أحدها عشوائياً بفعل الضجيج؛ بينما يجبر تنظيم $L_2$ المحدب بشدة معاملات المتغيرات المترابطة على التقارب، محافظاً على المجموعات البيولوجية المترابطة وظيفياً."
              }
            },
            {
              "text": {
                "en": "Elastic Net guarantees that the training loss equals zero on high-dimensional data.",
                "ar": "تضمن شبكة المرونة وصول خطأ التدريب إلى الصفر تماماً في البيانات عالية الأبعاد."
              },
              "correct": false,
              "explanation": {
                "en": "Regularization deliberately increases training error to curb model variance and prevent overfitting; forcing training loss to zero would defeat the purpose.",
                "ar": "يرفع التنظيم خطأ التدريب عمداً للحد من التباين ومنع فرط التخصيص؛ والوصول إلى خطأ تدريب صفري هو نقيض مبدأ التنظيم تماماً."
              }
            },
            {
              "text": {
                "en": "Lasso cannot handle cases where $p > n$, whereas Elastic Net mathematically transforms $p$ to be strictly less than $n$.",
                "ar": "يعجز لاسو عن معالجة الحالات التي يكون فيها $p > n$، بينما تحول شبكة المرونة عدد المتغيرات رياضياً ليصبح أقل تماماً من $n$."
              },
              "correct": false,
              "explanation": {
                "en": "Both models execute when $p > n$; Lasso can select at most $n$ non-zero features before saturating, whereas Elastic Net can select more than $n$ correlated features, but neither transforms the dimension $p$.",
                "ar": "يعمل كلا النموذجين عندما يكون $p > n$؛ لكن لاسو يقف عند حد أقصى $n$ من المتغيرات المختارة، بينما تتجاوز شبكة المرونة هذا القيد دون أن تغير أبعاد الفضاء الأصلي."
              }
            },
            {
              "text": {
                "en": "Elastic Net removes the requirement for test set validation by proving Bayesian asymptotic convergence.",
                "ar": "تلغي شبكة المرونة الحاجة للتحقق من النموذج على عينة اختبار لإثباتها التقارب البايزي المقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Cross-validation on held-out test data is indispensable for tuning the hyperparameters $\\lambda$ and $\\alpha$.",
                "ar": "التحقق المتقاطع واستخدام بيانات الاختبار المستقلة أمر إلزامي لا غنى عنه لضبط المعاملات الفائقة $\\lambda$ و $\\alpha$."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "logistic-regression-sigmoid",
    "title": "Logistic Regression, Sigmoid Probability & Maximum Likelihood",
    "titleAr": "الانحدار اللوجستي ودالة السجمويد والتعظيم الأرجحي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose you are a loan officer at a major regional bank tasked with predicting whether mortgage applicants will default ($y = 1$) or repay...",
      "ar": "تخيل أنك مسؤول ائتمان في بنك تجاري، ومهمتك هي التنبؤ بما إذا كان المقترض سيتعثر في سداد قرضه العقاري ($y = 1$) أم سيسدده بالكامل ($y = 0$)."
    },
    "prerequisites": [
      "multiple-regression-matrix-calculus",
      "differentiation-rules-chain"
    ],
    "x": 825,
    "y": 2360,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LogisticSigmoidSurface",
        "narrative": {
          "en": "Suppose you are a loan officer at a major regional bank tasked with predicting whether mortgage applicants will default ($y = 1$) or repay in full ($y = 0$).\n\nIf you apply Ordinary Least Squares (OLS) regression to this problem—a setup known in economics as the **Linear Probability Model (LPM)**—disaster immediately strikes. Because a straight line has no boundaries, it marches relentlessly toward infinity:\n- For an applicant with low income and huge debts, OLS cheerfully calculates a default probability of **135%**.\n- For an ultra-wealthy surgeon with pristine credit, OLS outputs a default probability of **-18%**!\n\nWhat does a negative 18% chance of default mean in the real world? It is a logical impossibility. Probabilities must obey Kolmogorov's axioms: they must remain strictly bounded between 0.0 (impossible) and 1.0 (certain).\n\nTo cure this pathology, we replace the rigid straight ruler with an **elastic hydraulic shock absorber: the Sigmoid S-curve**. \nImagine taking any unbounded linear score $z = \\mathbf{w}^T \\mathbf{x}$—whether it is $-1,000$, $+42$, or zero—and feeding it into a soft compression chamber. The Sigmoid function smoothly compresses the score:\n- Large positive scores saturate gently toward $1.0$.\n- Large negative scores taper smoothly toward $0.0$.\n- A score of zero sits perfectly balanced at $0.5$ (a 50/50 coin flip).\n\nBehind the scenes, we do not train logistic regression by minimizing squared residuals, because squaring probability gaps creates a warped, bumpy landscape with deceptive local traps. Instead, we use **Maximum Likelihood Estimation (MLE)** guided by **Binary Cross-Entropy Loss**. Like an auditor seeking the truth, MLE rotates the decision boundary until the observed reality becomes the least surprising outcome possible, levying an exponential penalty whenever the model is confidently wrong.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Linear Probability Model** | Fitting a straight ruler to yes/no data: produces absurd probabilities like 140% or -25%. |\n| **Sigmoid Function** | The S-curve squasher: compresses any score from $-\\infty$ to $+\\infty$ into a valid (0, 1) probability. |\n| **Odds** | Ratio of winning to losing: probability of success divided by probability of failure ($p / (1-p)$). |\n| **Log-Odds (Logit)** | The natural logarithm of odds: maps probability onto the entire infinite real number line. |\n| **Binary Cross-Entropy** | The penalty referee: punishes confident wrong guesses with astronomical loss. |\n\n```text\n    THE SIGMOID PROBABILITY S-CURVE:\n\nProbability p\n         1.0 |                                 .------ Certainty (Default = 1)\n             |                              .-'\n             |                            .'\n         0.5 |--------------------------*----------------- Decision Boundary (z = 0)\n             |                        .'\n             |                     .-'\n         0.0 | '------ Impossibility (Repaid = 0)\n             +--------------------------|-----------------> Linear Score z = w^T x\n                                       z=0\n```",
          "ar": "تخيل أنك مسؤول ائتمان في بنك تجاري، ومهمتك هي التنبؤ بما إذا كان المقترض سيتعثر في سداد قرضه العقاري ($y = 1$) أم سيسدده بالكامل ($y = 0$).\n\nإذا حاولت تطبيق انحدار المربعات الصغرى العادي (OLS) على هذه المسألة—وهو ما يُعرف في الاقتصاد بـ **نموذج الاحتمال الخطي (Linear Probability Model)**—فستقع في ورطة حسابية فورية. فالخط المستقيم صلب وممتد بلا حدود:\n- لمقترض يعاني من تراكم الديون وضعف الدخل، قد يتنبأ النموذج باحتمال تعثر قدره **135%**.\n- ولجراح ثري يتمتع بسجل ائتماني ممتاز، قد يخرج النموذج باحتمال تعثر يبلغ **-18%**!\n\nماذا يعني احتمال سالب قدره -18% في الواقع؟ إنه مستحيل منطقيًا ورياضيًا. فالاحتمالات يجب أن تظل دائمًا محصورة بدقة بين 0.0 (استحالة) و 1.0 (يقين تام).\n\nلعلاج هذا الخلل، نستبدل المسطرة الخشبية الصلبة بـ **ممتص صدمات هيدروليكي مرن: منحنى السجمويد (Sigmoid S-curve)**.\nتخيل دالة السجمويد كغرفة ضغط انسيابية؛ تستقبل أي ناتج ترجيح خطي $z = \\mathbf{w}^T \\mathbf{x}$—سواء كان $-1,000$ أو $+42$ أو صفرًا—وتقوم بضغطه بسلاسة:\n- تتقارب القيم الموجبة الكبيرة برقة نحو $1.0$.\n- وتستقر القيم السالبة العميقة مقتربة من $0.0$.\n- أما القيمة صفر، فتستقر تمامًا في المنتصف عند $0.5$ (احتمال 50/50).\n\nلا ندرب الانحدار اللوجستي بتربيع الأخطاء لأن ذلك يصنع تضاريس متموجة مليئة بالقيعان المضللة، بل نستخدم **تقدير الأرجحية القصوى (MLE)** عبر **خسارة الإنتروبيا المتقاطعة الثنائية (Binary Cross-Entropy)**، التي تفرض غرامة فلكية تتصاعد أضعافًا مضاعفة عندما يكون النموذج واثقًا من تنبؤ خاطئ تمامًا.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **نموذج الاحتمال الخطي** | استخدام مسطرة مستقيمة لبيانات نعم/لا: يفرز احتمالات شاذة مثل 140% أو -25%. |\n| **دالة السجمويد** | المكبس المرن: تضغط أي رقم من $-\\infty$ إلى $+\\infty$ ليصبح احتمالاً حقيقياً بين 0 و 1. |\n| **الأرجحية (Odds)** | نسبة الفوز إلى الخسارة: احتمال وقوع الحدث مقسوماً على احتمال عدم وقوعه. |\n| **لوغاريتم الأرجحية (Logit)** | اللوغاريتم الطبيعي للأرجحية: يفك أسر الاحتمال المحدود نحو خط الأعداد المفتوح. |\n| **الإنتروبيا المتقاطعة الثنائية** | الحكم الصارم: يفرض عقوبة تصاعدية قاسية على التخمينات الخاطئة شديدة الثقة. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "z_i \\equiv \\mathbf{x}_i^T \\mathbf{w} = \\sum_{j=1}^D x_{ij} w_j",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Logistic Regression, Sigmoid Probability & Maximum Likelihood.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الانحدار اللوجستي ودالة السجمويد والتعظيم الأرجحي."
        },
        "narrative": {
          "en": "The Sigmoid link function $\\sigma: \\mathbb{R} \\to (0, 1)$ transforms the linear score into a posterior class probability:\n\n$$\np_i \\equiv \\mathbb{P}(Y_i = 1 \\mid \\mathbf{x}_i; \\mathbf{w}) = \\sigma(z_i) = \\frac{1}{1 + e^{-z_i}} = \\frac{e^{z_i}}{1 + e^{z_i}}\n$$\n\n### Fundamental Algebraic Properties of the Sigmoid:\n1. **Symmetry:** $1 - \\sigma(z) = \\sigma(-z)$.\n2. **Derivative Factorization:**\n   $$\n   \\frac{d\\sigma(z)}{dz} = \\frac{e^{-z}}{(1 + e^{-z})^2} = \\sigma(z) \\left(1 - \\sigma(z)\\right)\n   $$\n3. **Logit Transformation:** The inverse link isolates the linear predictor:\n   $$\n   \\text{logit}(p_i) \\equiv \\ln \\left( \\frac{p_i}{1 - p_i} \\right) = \\mathbf{x}_i^T \\mathbf{w}\n   $$\n\n### Maximum Likelihood & Cross-Entropy Optimization\nModeling each observation as an independent Bernoulli trial, the joint likelihood function across $N$ observations is:\n\n$$\n\\mathcal{L}(\\mathbf{w}) = \\prod_{i=1}^N p_i^{y_i} (1 - p_i)^{1 - y_i} = \\prod_{i=1}^N \\sigma(\\mathbf{x}_i^T \\mathbf{w})^{y_i} \\left(1 - \\sigma(\\mathbf{x}_i^T \\mathbf{w})\\right)^{1 - y_i}\n$$\n\nTaking the negative natural logarithm and dividing by $N$ converts the product into the empirical **Binary Cross-Entropy Loss** $J(\\mathbf{w})$:\n\n$$\nJ(\\mathbf{w}) = -\\frac{1}{N} \\ln \\mathcal{L}(\\mathbf{w}) = -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\ln(p_i) + (1 - y_i) \\ln(1 - p_i) \\right]\n$$\n\n### Vectorized Gradient & Hessian\nUsing the chain rule and the derivative identity $\\sigma'(z) = p(1-p)$, the partial derivative with respect to weight vector $\\mathbf{w}$ collapses into a clean error-weighted residual:\n\n$$\n\\nabla_{\\mathbf{w}} J(\\mathbf{w}) = \\frac{1}{N} \\sum_{i=1}^N (p_i - y_i) \\mathbf{x}_i = \\frac{1}{N} \\mathbf{X}^T (\\mathbf{p} - \\mathbf{y})\n$$\n\nThe second-order derivative defines the $D \\times D$ Hessian matrix $\\mathbf{H}$:\n\n$$\n\\mathbf{H}(\\mathbf{w}) = \\nabla_{\\mathbf{w}}^2 J(\\mathbf{w}) = \\frac{1}{N} \\mathbf{X}^T \\mathbf{S} \\mathbf{X}, \\quad \\text{where } \\mathbf{S} = \\text{diag}\\left(p_1(1-p_1), \\dots, p_N(1-p_N)\\right)\n$$\n\nBecause $p_i \\in (0, 1)$, every diagonal element $p_i(1-p_i) > 0$. Consequently, $\\mathbf{S}$ is strictly positive definite, making $\\mathbf{H}$ positive semi-definite for any design matrix $\\mathbf{X}$. This mathematical guarantee proves that $J(\\mathbf{w})$ is strictly convex: it possesses a unique global minimum with zero risk of converging to suboptimal local traps.\n\nImplement the vectorized Binary Logistic Regression optimization engine in NumPy. You will:\n1. Define a numerically robust Sigmoid activation $\\sigma(z) = \\frac{1}{1 + e^{-\\text{clip}(z)}}$ that guards against floating-point overflow.\n2. Compute the predicted posterior probabilities $\\mathbf{p} = \\sigma(\\mathbf{X}\\mathbf{w})$ across all training instances.\n3. Evaluate the analytical gradient vector $\\nabla_{\\mathbf{w}} J = \\frac{1}{N}\\mathbf{X}^T(\\mathbf{p} - \\mathbf{y})$.\n4. Update parameter weights iteratively via gradient descent: $\\mathbf{w} \\leftarrow \\mathbf{w} - \\eta \\nabla_{\\mathbf{w}} J$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}_i \\in \\mathbb{R}^D$ | Feature vector | Regressors for observation $i$ (including bias) | متجه ميزات العينة $i$ بما فيها الحد الثابت |\n| $\\mathbf{w} \\in \\mathbb{R}^D$ | Parameter weights | Orientation and slope of decision boundary | أوزان معاملات النموذج والحد الفاصل |\n| $z_i = \\mathbf{x}_i^T \\mathbf{w}$ | Linear score / logit | Unbounded raw score driving classification | الدرجة الخطية الخام غير المقيدة |\n| $\\sigma(z)$ | $\\frac{1}{1 + e^{-z}}$ | Sigmoid function mapping real score to probability | دالة السجمويد لتحويل الدرجة إلى احتمال |\n| $p_i \\in (0, 1)$ | $\\mathbb{P}(Y_i=1 \\mid \\mathbf{x}_i)$ | Modeled probability of positive class | الاحتمال المتنبأ به للفئة الإيجابية |\n| $\\text{logit}(p)$ | $\\ln(p / (1-p))$ | Natural log of odds mapping $(0, 1) \\to \\mathbb{R}$ | دالة اللوجيت لتحويل الاحتمال لخط الأعداد |\n| $\\mathcal{L}(\\mathbf{w})$ | $\\prod p_i^{y_i}(1-p_i)^{1-y_i}$ | Bernoulli likelihood across $N$ instances | دالة الأرجحية المشتركة لبيانات برنولي |\n| $J(\\mathbf{w})$ | $-\\frac{1}{N}\\sum [y\\ln p + (1-y)\\ln(1-p)]$ | Binary Cross-Entropy loss to be minimized | دالة خسارة الإنتروبيا المتقاطعة الثنائية |\n| $\\nabla_{\\mathbf{w}} J$ | $\\frac{1}{N}\\mathbf{X}^T(\\mathbf{p} - \\mathbf{y})$ | Gradient vector along steepest error ascent | متجه التدرج الرياضي لاتجاه تصاعد الخطأ |\n| $\\mathbf{S}$ | $\\text{diag}(p_i(1-p_i))$ | Diagonal Bernoulli variance matrix | مصفوفة التباينات البرنولية القطرية |\n| $\\mathbf{H}$ | $\\frac{1}{N}\\mathbf{X}^T\\mathbf{S}\\mathbf{X}$ | Hessian matrix ensuring global convexity | مصفوفة الهيسيان الضامنة للتحدب الرياضي |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-logistic-regression-sigmoid",
          "starterCode": "import numpy as np\n\ndef fit_logistic_regression(\n    X: np.ndarray,\n    y: np.ndarray,\n    lr: float = 0.1,\n    n_iters: int = 200\n) -> np.ndarray:\n    \"\"\"\n    Fits binary logistic regression via vectorized gradient descent.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Feature matrix (can include constant column for bias).\n    y : np.ndarray of shape (N,)\n        Binary response labels in {0, 1}.\n    lr : float\n        Learning rate.\n    n_iters : int\n        Number of gradient descent iterations.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Estimated parameter weights w.\n    \"\"\"\n    N, D = X.shape\n    w = np.zeros(D)\n    \n    def sigmoid(z: np.ndarray) -> np.ndarray:\n        # Step 1: Numerically stable sigmoid avoiding overflow via clipping\n        z_clipped = np.clip(z, -30.0, 30.0)\n        return 1.0 / (1.0 + np.exp(-z_clipped))\n\n    for _ in range(n_iters):\n        # Step 2: Forward pass - compute model posterior probabilities\n        p = sigmoid(X @ w)\n        \n        # Step 3: Vectorized gradient computation: (1/N) * X^T (p - y)\n        gradient = (1.0 / N) * (X.T @ (p - y))\n        \n        # Step 4: Parameter update step along steepest descent\n        w -= lr * gradient\n        \n    return w",
          "testCases": [
            {
              "input": "X = np.array([[1.0, 2.0], [1.0, -2.0], [1.0, 3.0], [1.0, -3.0]]); y = np.array([1.0, 0.0, 1.0, 0.0]); w = fit_logistic_regression(X, y, lr=0.5, n_iters=100); f\"{w[1] > 0.5}\"",
              "expected": "True"
            },
            {
              "input": "X = np.array([[1.0, 1.0], [1.0, -1.0]]); y = np.array([1.0, 0.0]); w = fit_logistic_regression(X, y, lr=0.1, n_iters=50); f\"{w[0]:.2f}\"",
              "expected": "0.00"
            }
          ],
          "expectedOutput": "True",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_logistic_regression(\n    X: np.ndarray,\n    y: np.ndarray,\n    lr: float = 0.1,\n    n_iters: int = 200\n) -> np.ndarray:\n    \"\"\"\n    Fits binary logistic regression via vectorized gradient descent.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Feature matrix (can include constant column for bias).\n    y : np.ndarray of shape (N,)\n        Binary response labels in {0, 1}.\n    lr : float\n        Learning rate.\n    n_iters : int\n        Number of gradient descent iterations.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Estimated parameter weights w.\n    \"\"\"\n    N, D = X.shape\n    w = np.zeros(D)\n    \n    def sigmoid(z: np.ndarray) -> np.ndarray:\n        # Step 1: Numerically stable sigmoid avoiding overflow via clipping\n        z_clipped = np.clip(z, -30.0, 30.0)\n        return 1.0 / (1.0 + np.exp(-z_clipped))\n\n    for _ in range(n_iters):\n        # Step 2: Forward pass - compute model posterior probabilities\n        p = sigmoid(X @ w)\n        \n        # Step 3: Vectorized gradient computation: (1/N) * X^T (p - y)\n        gradient = (1.0 / N) * (X.T @ (p - y))\n        \n        # Step 4: Parameter update step along steepest descent\n        w -= lr * gradient\n        \n    return w",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef fit_logistic_regression(\n    X: np.ndarray,\n    y: np.ndarray,\n    lr: float = 0.1,\n    n_iters: int = 200\n) -> np.ndarray:\n    \"\"\"\n    Fits binary logistic regression via vectorized gradient descent.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Feature matrix (can include constant column for bias).\n    y : np.ndarray of shape (N,)\n        Binary response labels in {0, 1}.\n    lr : float\n        Learning rate.\n    n_iters : int\n        Number of gradient descent iterations.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Estimated parameter weights w.\n    \"\"\"\n    N, D = X.shape\n    w = np.zeros(D)\n    \n    def sigmoid(z: np.ndarray) -> np.ndarray:\n        # Numerically stable sigmoid avoiding overflow\n        z_clipped = np.clip(z, -30.0, 30.0)\n        return 1.0 / (1.0 + np.exp(-z_clipped))\n\n    for _ in range(n_iters):\n        # 1. Forward pass: compute probabilities\n        p = sigmoid(X @ w)\n        \n        # 2. Vectorized gradient: (1/N) * X^T (p - y)\n        gradient = (1.0 / N) * (X.T @ (p - y))\n        \n        # 3. Parameter update step\n        w -= lr * gradient\n        \n    return w"
        },
        "hints": {
          "tier1": {
            "en": "Use a numerically stable sigmoid by clipping raw logits to [-30, 30] before exponentiating.",
            "ar": "استخدم دالة سجمويد مستقرة عددياً عبر تقليم القيم إلى [-30, 30] قبل حساب الأس."
          },
          "tier2": {
            "en": "The gradient of binary cross-entropy with respect to weights w is (1/N) * X^T (p - y).",
            "ar": "تدرج خسارة الإنتروبيا المتقاطعة بالنسبة للأوزان w هو (1/N) * X^T (p - y)."
          },
          "tier3": {
            "en": "Update weights via w -= lr * gradient across n_iters iterations.",
            "ar": "حدث الأوزان عبر w -= lr * gradient على مدار n_iters من التكرارات."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the correct statistical interpretation of this estimated coefficient, and why is the junior analyst's statement fundamentally flawed?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الانحدار اللوجستي ودالة السجمويد والتعظيم الأرجحي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The announcement is incorrect: in logistic regression, coefficients represent changes in log-odds, not probabilities. Because $e^{0.693} \\approx 2.0$, each additional inquiry multiplies the borrower's *odds of default* by approximately $2.0$ (the odds double). The actual percentage point change in probability is non-linear and depends heavily on baseline risk: $\\Delta p \\approx p(1-p)\\beta_j$.",
                "ar": "الاستنتاج خاطئ: في الانحدار اللوجستي، تمثل المعاملات التغير في لوغاريتم الأرجحية وليس في الاحتمال مباشرة. وحيث إن $e^{0.693} \\approx 2.0$، فإن كل استفسار ائتماني إضافي يضاعف أرجحية التعثر مرتين ($2.0$). أما التغير في النسبة المئوية للاحتمال فهو غير خطي ويعتمد على مستوى الخطر الأولي للمقترض: $\\Delta p \\approx p(1-p)\\beta_j$."
              },
              "correct": true,
              "explanation": {
                "en": "The logit link models $\\ln(p / (1-p)) = \\mathbf{x}^T \\mathbf{w}$. Exponentiating both sides shows that increasing $x_j$ by $1$ multiplies the odds ratio by $e^{\\beta_j} = e^{0.693} \\approx 2.0$. The marginal effect on probability itself equals $\\frac{\\partial p}{\\partial x_j} = p(1 - p)\\beta_j$, which is maximal at $p = 0.5$ and approaches zero as $p \\to 0$ or $p \\to 1$.",
                "ar": "يربط تابع اللوجيت بين لوغاريتم الأرجحية والمتغيرات المستقلة؛ وبرفع الطرفين للأس الطبيعي نجد أن زيادة المتغير بوحدة واحدة يضاعف نسبة الأرجحية بالمعامل $e^{\\beta_j} = e^{0.693} \\approx 2.0$. والأثر الحدي على الاحتمال ذاته غير خطي $\\frac{\\partial p}{\\partial x_j} = p(1 - p)\\beta_j$، حيث يبلغ أقصاه عند $p=0.5$ ويتلاشى عند الأطراف."
              }
            },
            {
              "text": {
                "en": "The announcement is correct: the derivative of the Sigmoid link function is constant and equal to $1.0$, maintaining linear additivity between features and probability.",
                "ar": "الاستنتاج صحيح: مشتقة دالة السجمويد ثابتة وتساوي 1.0 دائماً، مما يحافظ على التناسب الخطي التام بين المتغيرات والاحتمال."
              },
              "correct": false,
              "explanation": {
                "en": "The Sigmoid derivative $\\sigma'(z) = \\sigma(z)(1 - \\sigma(z))$ is bell-shaped and non-linear, varying continuously between $0$ and $0.25$.",
                "ar": "مشتقة السجمويد ليست ثابتة، بل تأخذ شكلاً جرسياً غير خطي وتتغير قيمتها باستمرار بين $0$ و $0.25$."
              }
            },
            {
              "text": {
                "en": "The true probability increases by $0.693^2 = 0.480$ ($48.0\\%$) because probability is the quadratic integral of the Bernoulli likelihood.",
                "ar": "يزداد الاحتمال الحقيقي بمقدار $0.693^2 = 0.480$ (أي 48%) لأن الاحتمال يمثل التكامل التربيعي لدالة الأرجحية البرنولية."
              },
              "correct": false,
              "explanation": {
                "en": "Squaring the coefficient has no mathematical basis in generalized linear models; probabilities are governed by the Sigmoid transformation, not polynomial squaring.",
                "ar": "لا يوجد أي أساس رياضي لتربيع المعامل في النماذج الخطية المعممة؛ فالاحتمالات تخضع لتحويل السجمويد وليس لدوال قوى تربيعية."
              }
            },
            {
              "text": {
                "en": "The estimated coefficient is completely uninterpretable because logistic regression parameters are scale-invariant constants that carry no empirical meaning.",
                "ar": "المعامل المقدر غير قابل للتفسير تماماً لأن معاملات الانحدار اللوجستي ثوابت لا تحمل أي مدلول إحصائي."
              },
              "correct": false,
              "explanation": {
                "en": "Logistic regression coefficients are directly interpretable as adjusted log-odds ratios, providing a cornerstone of modern biostatistics, credit scoring, and epidemiological risk modeling.",
                "ar": "معاملات الانحدار اللوجستي قابلة للتفسير بدقة بوصفها نسب لوغاريتم الأرجحية المعدلة، وهي الركيزة الأساسية في نماذج المخاطر الائتمانية والوبائيات."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "roc-auc-confusion-matrix",
    "title": "Classification Metrics, ROC Curves & The Mann-Whitney Equivalence",
    "titleAr": "مقاييس التصنيف ومنحنى ROC ومكافئ مان-ويتني",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In applied machine learning, celebrating high raw \"accuracy\" is one of the most perilous traps in data science.",
      "ar": "في تعلم الآلة التطبيقي، يُعد الاحتفال بنسبة \"الدقة البسيطة\" (Accuracy) أحد أخطر الفخاخ الإحصائية التي قد يقع فيها مهندس البيانات."
    },
    "prerequisites": [
      "logistic-regression-sigmoid",
      "central-limit-theorem"
    ],
    "x": 805,
    "y": 2455,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ROCAUCCurveLab",
        "narrative": {
          "en": "In applied machine learning, celebrating high raw \"accuracy\" is one of the most perilous traps in data science.\n\nImagine an automated airport baggage scanner screening 100,000 pieces of luggage every day, where exactly 10 bags contain dangerous contraband. A broken scanner that is unplugged from the wall—mechanically stamping \"CLEAN\" on every single bag without scanning it—will achieve a jaw-dropping **99.99% accuracy!**\nThe airport board might celebrate this stellar metric, while every single weapon and bomb passes completely undetected into the aircraft.\n\nWhen catastrophic events (credit card fraud, cancerous tumors, bridge collapses) are inherently rare, raw accuracy is thoroughly blinded by the overwhelming majority of ordinary events.\n\nTo cut through this illusion, we partition classification decisions into a **four-room grid known as the Confusion Matrix**:\n- **True Positives ($TP$):** The alarm rings, and there is a real fire.\n- **True Negatives ($TN$):** Quiet peace: no alarm, and no fire.\n- **False Positives ($FP$):** False alarms that panic people and waste valuable time.\n- **False Negatives ($FN$):** Silent disasters: the house is burning down, but the alarm never rings!\n\nTwo rival metrics battle for supremacy:\n- **Precision:** *\"When our alarm blares, what is the probability of an actual fire?\"* ($TP / (TP + FP)$)\n- **Recall (Sensitivity):** *\"Out of all the actual fires that started, what fraction did we detect?\"* ($TP / (TP + FN)$)\n\nTo turn a continuous risk score ($0.0$ to $1.0$) into an alarm, you must pick a decision threshold $\\tau$. Think of $\\tau$ as a sensitivity knob. Lowering $\\tau$ catches every fire ($100\\%$ Recall) but floods you with false alarms. Raising $\\tau$ eliminates false alarms but lets buildings burn down. The **Receiver Operating Characteristic (ROC)** curve sweeps $\\tau$ across all values, tracing the True Positive Rate against the False Positive Rate.\n\nThe **Area Under the ROC Curve (ROC-AUC)** has an astonishing, intuitive meaning via the **Mann-Whitney U Test**:\nIf you randomly pick one sick patient and one healthy person, ROC-AUC is the exact probability that your model will assign a higher risk score to the sick patient than to the healthy person! An AUC of $0.5$ is pure coin flipping; an AUC of $1.0$ is a flawless ranking engine.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Accuracy Trap** | The false cheerleader: achieves 99% accuracy on imbalanced data by guessing majority class. |\n| **Precision** | Alarm reliability: out of all alarms raised, how many were genuine fires? |\n| **Recall / Sensitivity** | Net coverage: out of all true fires in the city, how many did our alarm catch? |\n| **ROC Curve** | The diagnostic frontier: plots True Positive Rate vs False Positive Rate across all thresholds. |\n| **ROC-AUC** | The pairwise sorting tournament: probability that a positive case outscores a negative case. |\n\n```text\n    THE FOUR-ROOM CONFUSION MATRIX:\n\nGROUND TRUTH REALITY\n                        Actual Positive (1)    Actual Negative (0)\n                     +----------------------+----------------------+\n      Predicted      |    TRUE POSITIVE     |    FALSE POSITIVE    |\n      Positive (1)   |        (TP)          |         (FP)         |\n  M                  | Real Fire Caught!    | False Alarm Panic    |\n  O                  +----------------------+----------------------+\n  D   Predicted      |    FALSE NEGATIVE    |    TRUE NEGATIVE     |\n  E   Negative (0)   |        (FN)          |         (TN)         |\n  L                  | Silent Catastrophe!  | Peaceful Clearance   |\n                     +----------------------+----------------------+\n```",
          "ar": "في تعلم الآلة التطبيقي، يُعد الاحتفال بنسبة \"الدقة البسيطة\" (Accuracy) أحد أخطر الفخاخ الإحصائية التي قد يقع فيها مهندس البيانات.\n\nتخيل جهاز فحص أمني في مطار دولي يفحص 100,000 حقيبة يومياً، من بينها 10 حقائب فقط تحتوي على مواد محظورة. لو كان هذا الجهاز عاطلاً ومفصولاً عن الكهرباء، ويطبع عبارة \"سليمة\" على كل الحقائب دون فحص، لحقق دقة مذهلة تبلغ **99.99%!**\nقد تفرح إدارة المطار بهذه النسبة الخيالية، بينما تمر كافة الأسلحة والمواد الخطرة دون أدنى اعتراض إلى الطائرات!\n\nعندما تكون الأحداث الكارثية نادرة بطبيعتها (كالاحتيال المالي، أو الأورام السرطانية، أو انهيار الجسور)، تصبح الدقة البسيطة مقياساً أعمى تشوهه الأغلبية الساحقة للحالات العادية.\n\nلكشف هذا الخداع، نقسم قرارات التصنيف إلى **مصفوفة الارتباك (Confusion Matrix)** ذات الحجرات الأربع:\n- **إيجابي حقيقي ($TP$):** انطلق الإنذار، وهناك حريق حقيقي بالفعل!\n- **سلبي حقيقي ($TN$):** هدوء وسلام: لم ينطلق الإنذار، ولا يوجد أي حريق.\n- **إيجابي زائف ($FP$):** إنذار كاذب يثير الهلع ويهدر الوقت والجهد.\n- **سلبي زائف ($FN$):** كارثة صامتة: المبنى يحترق، لكن جهاز الإنذار لم يصدر صوتاً!\n\nويشتعل صراع دائم بين مقياسين متنافسين:\n- **الدقة التنبؤية (Precision):** *\"عندما يصرخ جهاز الإنذار، ما احتمال وجود حريق حقيقي؟\"* ($TP / (TP + FP)$)\n- **الاستدعاء أو الحساسية (Recall):** *\"من بين جميع الحرائق التي اندلعت في المدينة، كم حريقاً نجحنا في رصده؟\"* ($TP / (TP + FN)$)\n\nولتحويل درجة الخطورة المستمرة (من 0 إلى 1) إلى قرار، نختار عتبة تشغيلية $\\tau$. خفض العتبة يضمن اكتشاف كل الحرائق لكنه يغرقك بالإنذارات الكاذبة؛ ورفعها يمحو الإنذارات الكاذبة لكنه يترك المباني تحترق. يرسم **منحنى ROC** هذه المقايضة الكاملة.\n\nأما **المساحة تحت المنحنى (ROC-AUC)** فتحمل معنى حدسياً مبهراً عبر **اختبار مان-ويتني**:\nلو اخترت عشوائياً مريضاً مصاباً وشخصاً سليماً، فإن ROC-AUC هو الاحتمال الدقيق لأن يمنح نموذجك المريض درجة خطورة أعلى من الشخص السليم!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **فخ الدقة البسيطة** | المشجع الكاذب: يحقق 99% دقة في البيانات غير المتوازنة بمجرد التنبؤ بالفئة الأكثر شيوعاً. |\n| **الدقة التنبؤية (Precision)** | موثوقية الإنذار: من بين كل الإنذارات التي أطلقناها، كم منها كان حريقاً حقيقياً؟ |\n| **الاستدعاء (Recall)** | التغطية الشاملة: من بين كل الحرائق الفعلية، كم حريقاً تمكنا من الإمساك به؟ |\n| **منحنى ROC** | الأفق التشغيلي: يرسم نسبة الإيجابيات الحقيقية مقابل الزائفة عند شتى العتبات. |\n| **المساحة تحت المنحنى (AUC)** | بطولة الترتيب الثنائي: احتمال أن يتفوق المريض الفعلي على السليم في درجة التقييم. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\hat{y}_i(\\tau) = \\mathbb{I}(\\hat{s}_i \\ge \\tau)",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Classification Metrics, ROC Curves & The Mann-Whitney Equivalence.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ مقاييس التصنيف ومنحنى ROC ومكافئ مان-ويتني."
        },
        "narrative": {
          "en": "### The Formal Confusion Metrics Suite\nPartitioning the $N$ observations against ground truth labels yields:\n\n$$\n\\begin{aligned}\nTP(\\tau) &= \\sum_{i=1}^N \\mathbb{I}(\\hat{y}_i(\\tau) = 1 \\land y_i = 1), \\quad &FP(\\tau) &= \\sum_{i=1}^N \\mathbb{I}(\\hat{y}_i(\\tau) = 1 \\land y_i = 0) \\\\\nTN(\\tau) &= \\sum_{i=1}^N \\mathbb{I}(\\hat{y}_i(\\tau) = 0 \\land y_i = 0), \\quad &FN(\\tau) &= \\sum_{i=1}^N \\mathbb{I}(\\hat{y}_i(\\tau) = 0 \\land y_i = 1)\n\\end{aligned}\n$$\n\nFrom these cardinalities, we evaluate:\n- **True Positive Rate (Sensitivity / Recall):**\n  $$\n  \\text{TPR}(\\tau) = \\frac{TP(\\tau)}{TP(\\tau) + FN(\\tau)} = \\frac{TP(\\tau)}{N_+}\n  $$\n- **False Positive Rate (Fall-out / $1 - \\text{Specificity}$):**\n  $$\n  \\text{FPR}(\\tau) = \\frac{FP(\\tau)}{FP(\\tau) + TN(\\tau)} = \\frac{FP(\\tau)}{N_-}\n  $$\n- **Precision (Positive Predictive Value):**\n  $$\n  \\text{PPV}(\\tau) = \\frac{TP(\\tau)}{TP(\\tau) + FP(\\tau)}\n  $$\n- **$F_1$-Score (Harmonic Mean of Precision and Recall):**\n  $$\n  F_1(\\tau) = 2 \\cdot \\frac{\\text{PPV}(\\tau) \\cdot \\text{TPR}(\\tau)}{\\text{PPV}(\\tau) + \\text{TPR}(\\tau)} = \\frac{2 TP(\\tau)}{2 TP(\\tau) + FP(\\tau) + FN(\\tau)}\n  $$\n\n### The Mann-Whitney U Equivalence of ROC-AUC\nThe ROC curve traces the parametric locus $(\\text{FPR}(\\tau), \\text{TPR}(\\tau))$ as threshold $\\tau$ traverses $[1, 0]$. The Area Under the Curve (AUC) is formalized as:\n\n$$\n\\text{AUC} = \\int_0^1 \\text{TPR}(\\text{FPR}^{-1}(u)) \\, du\n$$\n\nBy the **Wilcoxon-Mann-Whitney theorem**, the geometric area under the ROC curve is mathematically identical to the normalized Mann-Whitney $U$ statistic:\n\n$$\n\\text{AUC} = \\mathbb{P}(\\hat{s}_i > \\hat{s}_j \\mid y_i = 1, y_j = 0) = \\frac{1}{N_+ N_-} \\sum_{i: y_i=1} \\sum_{j: y_j=0} \\left[ \\mathbb{I}(\\hat{s}_i > \\hat{s}_j) + \\frac{1}{2}\\mathbb{I}(\\hat{s}_i = \\hat{s}_j) \\right]\n$$\n\nImplement the non-parametric Wilcoxon-Mann-Whitney ROC-AUC calculation and confusion matrix evaluation in NumPy. You will:\n1. Split predicted scores into positive $\\mathbf{s}_+$ and negative $\\mathbf{s}_-$ cohorts based on ground truth labels $y_i$.\n2. Compute pairwise concordant pairs ($\\hat{s}_i > \\hat{s}_j$) and tied pairs ($\\hat{s}_i = \\hat{s}_j$) via array broadcasting to evaluate exact ROC-AUC.\n3. Discretize continuous scores at default threshold $\\tau = 0.5$ to compute $TP$, $FP$, and $FN$.\n4. Calculate Precision, Recall, and $F_1$-score with proper division-by-zero safeguards.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $\\hat{s}_i \\in [0, 1]$ | $\\hat{\\mathbb{P}}(Y=1 \\mid \\mathbf{x}_i)$ | Continuous model risk score | درجة الخطورة الاحتمالية المستمرة |\n| $\\tau \\in [0, 1]$ | Decision threshold | Operating knob cutting positive from negative | العتبة التشغيلية الفاصلة بين الفئات |\n| $TP, TN$ | True Positives / Negatives | Correct alarms and peaceful correct clearances | الإنذارات الصادقة والتبرئة السليمة |\n| $FP, FN$ | False Positives / Negatives | False alarms and silent unflagged catastrophes | الإنذارات الكاذبة والتفويت الكارثي |\n| $\\text{TPR}(\\tau)$ | $TP / (TP + FN)$ | Recall / Sensitivity: caught positive fraction | نسبة الاستدعاء والحساسية الشاملة |\n| $\\text{FPR}(\\tau)$ | $FP / (FP + TN)$ | Fall-out: fraction of healthy falsely flagged | نسبة الإنذارات الخاطئة للأصحاء |\n| $\\text{PPV}(\\tau)$ | $TP / (TP + FP)$ | Precision: credibility when alarm triggers | الدقة التنبؤية وموثوقية الإنذار |\n| $F_1(\\tau)$ | Harmonic mean | Balance between Precision and Recall | المقياس التوافقي الموازن للدقة والاستدعاء |\n| $\\text{AUC}$ | Area under ROC curve | Pairwise sorting probability of sick over healthy | المساحة تحت منحنى الفرز التشغيلي |\n| $N_+, N_-$ | $\\sum y_i, \\sum (1-y_i)$ | Total counts of positive and negative classes | إجمالي الحالات الإيجابية والسلبية |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-roc-auc-confusion-matrix",
          "starterCode": "def compute_roc_auc_score(y_true: np.ndarray, y_score: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes exact ROC-AUC via Wilcoxon-Mann-Whitney rank pairs and confusion metrics at tau=0.5.\n    \n    Parameters\n    ----------\n    y_true : np.ndarray of shape (N,)\n        Binary ground truth labels in {0, 1}.\n    y_score : np.ndarray of shape (N,)\n        Continuous predicted probability/risk scores in [0, 1].\n        \n    Returns\n    -------\n    dict with keys:\n        'auc': Area Under the ROC Curve via Wilcoxon-Mann-Whitney formulation.\n        'precision': Precision at threshold 0.5.\n        'recall': Recall at threshold 0.5.\n        'f1': F1-score at threshold 0.5.\n    \"\"\"\n    # Step 1: Separate continuous scores by true class\n    # Step 2: Wilcoxon-Mann-Whitney pairwise comparisons via broadcasting\n    # Compare every positive instance against every negative instance\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "y_true = np.array([1, 1, 0, 0]); y_score = np.array([0.9, 0.8, 0.3, 0.2]); res = compute_roc_auc_score(y_true, y_score); f\"{res['auc']:.2f}, {res['precision']:.2f}\"",
              "expected": "1.00, 1.00"
            },
            {
              "input": "y_true = np.array([1, 0, 1, 0]); y_score = np.array([0.8, 0.7, 0.6, 0.9]); res = compute_roc_auc_score(y_true, y_score); f\"{res['auc']:.2f}\"",
              "expected": "0.50"
            }
          ],
          "expectedOutput": "1.00, 1.00",
          "variants": {
            "python": {
              "starterCode": "def compute_roc_auc_score(y_true: np.ndarray, y_score: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes exact ROC-AUC via Wilcoxon-Mann-Whitney rank pairs and confusion metrics at tau=0.5.\n    \n    Parameters\n    ----------\n    y_true : np.ndarray of shape (N,)\n        Binary ground truth labels in {0, 1}.\n    y_score : np.ndarray of shape (N,)\n        Continuous predicted probability/risk scores in [0, 1].\n        \n    Returns\n    -------\n    dict with keys:\n        'auc': Area Under the ROC Curve via Wilcoxon-Mann-Whitney formulation.\n        'precision': Precision at threshold 0.5.\n        'recall': Recall at threshold 0.5.\n        'f1': F1-score at threshold 0.5.\n    \"\"\"\n    # Step 1: Separate continuous scores by true class\n    # Step 2: Wilcoxon-Mann-Whitney pairwise comparisons via broadcasting\n    # Compare every positive instance against every negative instance\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.00, 1.00"
            }
          },
          "solution": "import numpy as np\n\ndef compute_roc_auc_score(y_true: np.ndarray, y_score: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes exact ROC-AUC via Wilcoxon-Mann-Whitney rank pairs and confusion metrics at tau=0.5.\n    \n    Parameters\n    ----------\n    y_true : np.ndarray of shape (N,)\n        Binary ground truth labels in {0, 1}.\n    y_score : np.ndarray of shape (N,)\n        Continuous predicted probability/risk scores in [0, 1].\n        \n    Returns\n    -------\n    dict with keys:\n        'auc': Area Under the ROC Curve via Wilcoxon-Mann-Whitney formulation.\n        'precision': Precision at threshold 0.5.\n        'recall': Recall at threshold 0.5.\n        'f1': F1-score at threshold 0.5.\n    \"\"\"\n    # Step 1: Separate continuous scores by true class\n    pos_scores = y_score[y_true == 1]\n    neg_scores = y_score[y_true == 0]\n    n_pos = len(pos_scores)\n    n_neg = len(neg_scores)\n    \n    # Step 2: Wilcoxon-Mann-Whitney pairwise comparisons via broadcasting\n    # Compare every positive instance against every negative instance\n    concordant = np.sum(pos_scores[:, None] > neg_scores[None, :])\n    ties = np.sum(pos_scores[:, None] == neg_scores[None, :])\n    auc = float((concordant + 0.5 * ties) / (n_pos * n_neg))\n    \n    # Step 3: Compute confusion matrix at operational threshold tau = 0.5\n    y_pred = (y_score >= 0.5).astype(int)\n    tp = float(np.sum((y_true == 1) & (y_pred == 1)))\n    fp = float(np.sum((y_true == 0) & (y_pred == 1)))\n    fn = float(np.sum((y_true == 1) & (y_pred == 0)))\n    \n    # Step 4: Calculate derived rate metrics with safe zero handling\n    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0\n    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0\n    f1 = (2.0 * precision * recall / (precision + recall)) if (precision + recall) > 0 else 0.0\n    \n    return {\n        \"auc\": auc,\n        \"precision\": precision,\n        \"recall\": recall,\n        \"f1\": f1\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Use the Wilcoxon-Mann-Whitney rank sum identity: compare all positive scores against all negative scores.",
            "ar": "استخدم متطابقة مان-ويتني للرتب: قارن كل درجات العينات الإيجابية بجميع درجات العينات السلبية."
          },
          "tier2": {
            "en": "Broadcasting: sum(pos[:, None] > neg[None, :]) gives concordant pairs. Add 0.5 * ties.",
            "ar": "البث الموجه: sum(pos[:, None] > neg[None, :]) يعطيك الأزواج المتوافقة. أضف 0.5 * التعادل."
          },
          "tier3": {
            "en": "At threshold tau=0.5, compute TP, FP, FN to get precision, recall, and harmonic F1.",
            "ar": "عند العتبة tau=0.5، احسب TP و FP و FN للحصول على الدقة والاستدعاء و F1 التوافقي."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does an exceptional ROC",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ مقاييس التصنيف ومنحنى ROC ومكافئ مان-ويتني تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The ROC curve plots False Positive Rate ($\\text{FPR} = \\frac{FP}{TN + FP}$) on the x-axis, whose denominator contains the massive reservoir of $9,999,000$ True Negatives. Even an exceptionally low FPR of $0.5\\%$ generates nearly $50,000$ False Positives. Because Precision evaluates False Positives against the tiny pool of True Positives ($\\frac{TP}{TP + FP}$), Precision collapses. The team must optimize the Precision-Recall curve (PR-AUC) rather than ROC-AUC.",
                "ar": "يرسم منحنى ROC المعدل الإيجابي الزائف ($\\text{FPR} = \\frac{FP}{TN + FP}$) على المحور الأفقي، ومقامه يحتوي على الأغلبية الساحقة البالغة $9,999,000$ حالة سلبية حقيقية. وبالتالي، فإن نسبة خطأ ضئيلة تبلغ 0.5% تولد ما يقارب 50,000 إنذار كاذب. وحيث إن الدقة التنبؤية تقارن الإنذارات الكاذبة بالحالات الإيجابية النادرة، تنهار الدقة إلى أقل من 2%. يجب على الفريق اعتماد منحنى الدقة والاستدعاء (PR-AUC)."
              },
              "correct": true,
              "explanation": {
                "en": "ROC-AUC is prevalence-invariant: a gigantic negative class shrinks FPR to near zero even with tens of thousands of false alarms. In contrast, Precision explicitly evaluates the operational purity of alerts, making the Precision-Recall AUC (PR-AUC) the gold standard for severe class imbalance.",
                "ar": "لا يتأثر ROC-AUC بنسبة انتشار الفئات؛ فالعدد الهائل للحالات السلبية يجعل FPR ضئيلاً جداً حتى مع وجود عشرات الآلاف من الإنذارات الكاذبة. بينما يقيس مقياس الدقة نقاء الإنذارات الفعلي، مما يجعل منحنى الدقة والاستدعاء (PR-AUC) هو المعيار الأساسي للبيانات غير المتوازنة."
              }
            },
            {
              "text": {
                "en": "The Wilcoxon-Mann-Whitney U theorem is mathematically invalid when total sample sizes exceed $N = 10,000$, causing numerical overflow in the rank sums.",
                "ar": "تعد مبرهنة مان-ويتني باطلة رياضياً عندما يتجاوز حجم العينة $N = 10,000$ حالة، مما يسبب خطأ تجاوز رقمي في حساب الرتب."
              },
              "correct": false,
              "explanation": {
                "en": "The Mann-Whitney rank sum theorem is an exact non-parametric identity that holds for any sample size $N \\in [2, \\infty)$.",
                "ar": "مبرهنة مان-ويتني مطابقة رياضية قطعية وصحيحة لأي حجم عينة من حالتين إلى المليارات دون أي قيود حسابية."
              }
            },
            {
              "text": {
                "en": "The offline ROC-AUC was mistakenly calculated using natural logarithms rather than base-2 information-theoretic logarithms.",
                "ar": "تم حساب ROC-AUC في مرحلة الاختبار باللوغاريتم الطبيعي بدلاً من اللوغاريتم الثنائي لنظرية المعلومات."
              },
              "correct": false,
              "explanation": {
                "en": "ROC-AUC relies purely on ordering and ranking; it does not involve any logarithmic transformation.",
                "ar": "يعتمد ROC-AUC كلياً على ترتيب المقارنات الزوجية ولا يتضمن أي دوال لوغاريتمية."
              }
            },
            {
              "text": {
                "en": "The model's True Positives and False Positives mathematically canceled each other out during gradient descent backpropagation.",
                "ar": "ألغت الحالات الإيجابية الحقيقية والإنذارات الكاذبة بعضها البعض رياضياً أثناء التدرج العكسي."
              },
              "correct": false,
              "explanation": {
                "en": "Confusion matrix quadrants are non-negative counting sets that evaluate predictions post-hoc; they do not cancel out algebraically.",
                "ar": "فئات مصفوفة الارتباك هي أعداد صحيحة موجبة تحسب النتائج بعد التنبؤ، ولا تلغي بعضها جبرياً."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "knn-classification",
    "title": "K-Nearest Neighbors (KNN), Metric Spaces & Non-Parametric Boundaries",
    "titleAr": "الجيران الأقرب (KNN) وفضاءات المسافة والحدود غير المعلمية",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine moving to an unfamiliar neighborhood in a bustling new city where you don't know the local language.",
      "ar": "تخيل أنك انتقلت حديثاً للعيش في حي جديد داخل مدينة لا تعرف لغتها ولا عاداتها. إذا أردت معرفة ما إذا كان المخبز القريب ممتازاً وموثوقاً،..."
    },
    "prerequisites": [
      "cartesian-coordinate-metric",
      "multiple-regression-matrix-calculus"
    ],
    "x": 825,
    "y": 2550,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "KNNRadar",
        "narrative": {
          "en": "Imagine moving to an unfamiliar neighborhood in a bustling new city where you don't know the local language. If you want to know whether a bakery down the street is excellent, what do you do?\n\nYou don't sit down at your kitchen table to solve systems of polynomial equations or compute matrix Hessians. Instead, you do something deeply human: you lean over your fence, ask your **3 or 5 nearest neighbors**, and follow the majority consensus of their advice!\n\nThis instinct is the beating heart of **K-Nearest Neighbors (KNN)**, the quintessential non-parametric classification algorithm.\n\nParametric models—such as Ordinary Least Squares or Logistic Regression—force data into rigid, pre-ordained mathematical molds. They insist that the boundary between categories must be a straight line or an S-curve. If the true boundary is an intricate winding labyrinth, a donut shape, or an interlocking spiral, parametric models fail completely due to specification bias.\n\nKNN makes **zero assumptions** about functional forms or distributions. It is an **instance-based \"lazy learner\"**:\n- **During training:** It does virtually zero math. It simply commits the entire map of training points to memory.\n- **During prediction:** When an unlabelled newcomer arrives, the algorithm measures geometric distances to all stored points, picks the $k$ closest neighbors, and tallies their votes. Whichever class wins the democratic majority claims the newcomer!\n\nThe hyperparameter $k$ acts as a physical knob controlling the **Bias-Variance Tradeoff**:\n- **When $k = 1$:** The model carves space into a **Voronoi tessellation**—a mosaic of sharp polygonal cells where each training sample is king of its tiny backyard. Bias is zero, but variance explodes: a single mislabeled recording creates an isolated island of error that traps nearby test queries.\n- **As $k \\to N$:** The voting district expands to include the entire city. The algorithm simply predicts the global majority everywhere: variance drops to zero, but bias suffocates all local patterns.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Non-Parametric** | Freeform modeling: makes no pre-conceived assumptions about straight lines or shapes. |\n| **Lazy Learning** | Memorize now, compute later: zero work during training; all math happens at query time. |\n| **Minkowski Distance** | The universal ruler: generalizes Manhattan (grid) and Euclidean (straight-line) distance. |\n| **Voronoi Tessellation** | The geometric territory map: mosaic of polygons showing which training point is closest. |\n| **Curse of k Choice** | Balancing the voting booth: $k=1$ overreacts to noise; huge $k$ drowns out local nuance. |\n\n```text\n    THE KNN DEMOCRATIC NEIGHBORHOOD (k = 3):\n\nFeature 2\n             ^\n             |       [Class A]\n             |           *\n             |               * [Class A]\n             |          (   ?   )  <--- Query Point finds k=3 closest:\n             |               *           2 Class A vs 1 Class B\n             |            [Class B]      --> Predicts Class A!\n             |\n             |                         [Class B]\n             |                             *\n             +----------------------------------------> Feature 1\n```",
          "ar": "تخيل أنك انتقلت حديثاً للعيش في حي جديد داخل مدينة لا تعرف لغتها ولا عاداتها. إذا أردت معرفة ما إذا كان المخبز القريب ممتازاً وموثوقاً، فماذا ستفعل؟\n\nلن تجلس إلى طاولتك لحل معادلات جبرية معقدة أو حساب مصفوفات تفاضلية؛ بل ستفعل شيئاً فطرياً وبسيطاً للغاية: ستخرج لتسأل **أقرب 3 أو 5 جيران يقيمون بجوارك**، ثم تتبع رأي الأغلبية الديمقراطية بينهم!\n\nهذا الحدس البشري الفطري هو جوهر خوارزمية **الجيران الأقرب (K-Nearest Neighbors - KNN)**، وهي النموذج اللامعلمي الأبرز في تعلم الآلة.\n\nتفرض النماذج المعلمية—مثل الانحدار الخطي واللوجستي—قوالب شكلية صارمة على البيانات؛ فتصر على أن الحد الفاصل بين الفئات يجب أن يكون خطاً مستقيماً أو منحنى لوجستياً. وإذا كانت الحدود الحقيقية معقدة كالمتاهات أو الحلقات الدائرية المتداخلة، تعجز تلك النماذج تماماً بسبب خطأ التوصيف.\n\nأما خوارزمية KNN، فلا تفترض أي شكل مسبق للبيانات؛ وتعمل كـ **\"متعلم كسول\" (Lazy Learner)**:\n- **في مرحلة التدريب:** لا تبذل أي جهد حسابي، بل تحتفظ بكامل خريطة بيانات التدريب في الذاكرة.\n- **في مرحلة التنبؤ:** عند ظهور عينة جديدة غير مصنفة، تقيس الخوارزمية المسافات الهندسية لجميع النقاط المخزنة، وتختار أقرب $k$ جيران، وتجري تصويتاً ديمقراطياً تفوز فيه فئة الأغلبية!\n\nيعمل المعامل الفائق $k$ كمقبض للتحكم في **معضلة الانحياز والتباين (Bias-Variance Tradeoff)**:\n- **عند $k = 1$:** ينقسم الفضاء إلى خلايا فورونوي (Voronoi Cells) هندسية تحكم فيها كل نقطة نطاقها الخاص. ينعدم الانحياز، لكن التباين ينفجر: فنقطة شاذة واحدة ملوثة بالضجيج ستصنع جيباً معزولاً من الخطأ يشوه أي عينة اختبار تمر بقربها.\n- **وعندما يقترب $k$ من $N$:** تتسع دائرة التصويت لتشمل كامل سكان المدينة، فيتلاشى التباين لكن يسيطر انحياز أعمى يمحو كل الفروق المحلية الدقيقة.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **النماذج اللامعلمية** | النمذجة الحرة: لا تفرض افتراضات مسبقة حول الخطوط المستقيمة أو التوزيعات. |\n| **التعلم الكسول** | احفظ الآن واحسب لاحقاً: لا تدريب مسبقاً، وتحدث كافة الحسابات عند طلب التنبؤ. |\n| **مسافة مينكوفسكي** | المسطرة الشاملة: تعمم مسافة مانهاتن (شبكة الشوارع) والإقليدية (الخط المستقيم). |\n| **تفسيف فورونوي** | خريطة النفوذ الجغرافي: فسيفساء من المضلعات تبين النطاق الأقرب لكل نقطة تدريب. |\n| **مفاضلة اختيار k** | ضبط صندوق الاقتراع: $k=1$ يبالغ في رد الفعل للضجيج، بينما $k$ الضخم يمحو المعالم. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "d_p(\\mathbf{x}, \\mathbf{z}) = \\|\\mathbf{x} - \\mathbf{z}\\|_p = \\left( \\sum_{j=1}^D |x_j - z_j|^p \\right)^{1/p}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for K-Nearest Neighbors (KNN), Metric Spaces & Non-Parametric Boundaries.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الجيران الأقرب (KNN) وفضاءات المسافة والحدود غير المعلمية."
        },
        "narrative": {
          "en": "Prominent specializations include:\n- **Manhattan Distance ($p=1$):** $d_1(\\mathbf{x}, \\mathbf{z}) = \\sum_{j=1}^D |x_j - z_j|$ (grid-like city block motion).\n- **Euclidean Distance ($p=2$):** $d_2(\\mathbf{x}, \\mathbf{z}) = \\sqrt{\\sum_{j=1}^D (x_j - z_j)^2}$ (straight-line isotropic ruler).\n\n### The K-Nearest Neighbors Neighborhood\nGiven a query vector $\\mathbf{x}_{\\text{query}} \\in \\mathbb{R}^D$, let $\\pi$ denote the permutation of indices $\\{1, \\dots, N\\}$ sorting training instances in non-decreasing distance order:\n\n$$\nd(\\mathbf{x}_{\\text{query}}, \\mathbf{x}_{\\pi(1)}) \\le d(\\mathbf{x}_{\\text{query}}, \\mathbf{x}_{\\pi(2)}) \\le \\dots \\le d(\\mathbf{x}_{\\text{query}}, \\mathbf{x}_{\\pi(N)})\n$$\n\nThe $k$-neighborhood set comprises the first $k$ elements:\n\n$$\n\\mathcal{N}_k(\\mathbf{x}_{\\text{query}}) = \\{\\mathbf{x}_{\\pi(1)}, \\dots, \\mathbf{x}_{\\pi(k)}\\}\n$$\n\nThe modeled posterior class probability is the empirical frequency inside the neighborhood:\n\n$$\n\\hat{p}_c(\\mathbf{x}_{\\text{query}}) \\equiv \\hat{\\mathbb{P}}(Y = c \\mid \\mathbf{x}_{\\text{query}}) = \\frac{1}{k} \\sum_{i \\in \\mathcal{N}_k(\\mathbf{x}_{\\text{query}})} \\mathbb{I}(y_i = c)\n$$\n\nThe discrete classification decision is evaluated via majority plurality voting:\n\n$$\n\\hat{y}(\\mathbf{x}_{\\text{query}}) = \\arg\\max_{c \\in \\{1, \\dots, C\\}} \\hat{p}_c(\\mathbf{x}_{\\text{query}})\n$$\n\n### Asymptotic Cover-Hart Bound (1967)\nAs the training sample size grows toward infinity ($N \\to \\infty$), the error rate of the 1-Nearest Neighbor classifier $R_{1\\text{-NN}}$ is bounded relative to the theoretical Bayes optimal error rate $R^*$:\n\n$$\nR^* \\le R_{1\\text{-NN}} \\le 2R^* (1 - R^*) \\le 2R^*\n$$\n\nThis celebrated theorem proves that even the simplest, parameter-free 1-NN algorithm guarantees an asymptotic error rate no worse than twice the optimal error achievable by an omniscient Bayesian oracle!\n\nImplement a fully vectorized K-Nearest Neighbors classifier in NumPy. You will:\n1. Compute the pairwise squared Euclidean distance matrix between query samples and training samples using the expanded quadratic formula: $\\|\\mathbf{x} - \\mathbf{z}\\|_2^2 = \\|\\mathbf{x}\\|_2^2 + \\|\\mathbf{z}\\|_2^2 - 2\\mathbf{x}^T\\mathbf{z}$.\n2. Extract the indices of the $k$ smallest distances for each query point using `np.argpartition`.\n3. Gather the ground-truth training labels corresponding to those nearest neighbors.\n4. Compute the modal class label for each query point to output discrete predictions.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $\\mathcal{D} = \\{(\\mathbf{x}_i, y_i)\\}$ | Labeled training corpus | Stored spatial map of instances in memory | خريطة بيانات التدريب المحفوظة بالذاكرة |\n| $d_p(\\mathbf{x}, \\mathbf{z})$ | Minkowski $L_p$ metric | Geometric distance ruler between feature vectors | مقياس المسافة الهندسية بين نقطتين |\n| $\\mathcal{N}_k(\\mathbf{x})$ | Nearest neighbor indices | Set of $k$ closest historical training instances | مجموعة الجيران الـ $k$ الأقرب للنقطة |\n| $k \\in \\mathbb{Z}^+$ | Neighborhood size | Hyperparameter tuning the Bias-Variance tradeoff | المعامل الفائق لعدد الجيران المصوتين |\n| $\\hat{p}_c(\\mathbf{x})$ | Neighborhood vote share | Modeled class posterior probability | الحصة التصويتية للاحتمال البعدي للفئة |\n| $\\hat{y}(\\mathbf{x})$ | Plurality vote winner | Discrete predicted class label | فئة الأغلبية الفائزة بالتصويت الديمقراطي |\n| $R^*$ | Bayes error rate | Irreducible irreducible theoretical noise floor | الحد الأدنى النظري لخطأ بايز الأصيل |\n| $R_{1\\text{-NN}}$ | 1-NN asymptotic error | Error bounded by at most $2 R^*$ as $N \\to \\infty$ | خطأ الجار الأقرب المقيد بضعف خطأ بايز |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-knn-classification",
          "starterCode": "def knn_predict(\n    X_train: np.ndarray,\n    y_train: np.ndarray,\n    X_test: np.ndarray,\n    k: int = 3\n) -> np.ndarray:\n    \"\"\"\n    Predicts class labels for query points using vectorized K-Nearest Neighbors.\n    \n    Parameters\n    ----------\n    X_train : np.ndarray of shape (N_train, D)\n        Training feature coordinates.\n    y_train : np.ndarray of shape (N_train,)\n        Integer class labels for training points.\n    X_test : np.ndarray of shape (N_test, D)\n        Query feature coordinates.\n    k : int\n        Number of nearest neighbors to query.\n        \n    Returns\n    -------\n    np.ndarray of shape (N_test,)\n        Predicted discrete class labels.\n    \"\"\"\n    # Step 1: Vectorized pairwise squared Euclidean distances:\n    # ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z\n    # Step 2: Identify indices of k smallest distances per query row\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X_tr = np.array([[0.0, 0.0], [0.0, 1.0], [1.0, 0.0], [1.0, 1.0]]); y_tr = np.array([0, 0, 1, 1]); X_te = np.array([[0.1, 0.2], [0.9, 0.8]]); preds = knn_predict(X_tr, y_tr, X_te, k=1); f\"{preds[0]}, {preds[1]}\"",
              "expected": "0, 1"
            },
            {
              "input": "X_tr = np.array([[1.0], [2.0], [3.0], [4.0], [5.0]]); y_tr = np.array([0, 0, 1, 1, 1]); X_te = np.array([[2.8]]); preds = knn_predict(X_tr, y_tr, X_te, k=3); f\"{preds[0]}\"",
              "expected": "1"
            }
          ],
          "expectedOutput": "0, 1",
          "variants": {
            "python": {
              "starterCode": "def knn_predict(\n    X_train: np.ndarray,\n    y_train: np.ndarray,\n    X_test: np.ndarray,\n    k: int = 3\n) -> np.ndarray:\n    \"\"\"\n    Predicts class labels for query points using vectorized K-Nearest Neighbors.\n    \n    Parameters\n    ----------\n    X_train : np.ndarray of shape (N_train, D)\n        Training feature coordinates.\n    y_train : np.ndarray of shape (N_train,)\n        Integer class labels for training points.\n    X_test : np.ndarray of shape (N_test, D)\n        Query feature coordinates.\n    k : int\n        Number of nearest neighbors to query.\n        \n    Returns\n    -------\n    np.ndarray of shape (N_test,)\n        Predicted discrete class labels.\n    \"\"\"\n    # Step 1: Vectorized pairwise squared Euclidean distances:\n    # ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z\n    # Step 2: Identify indices of k smallest distances per query row\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0, 1"
            }
          },
          "solution": "import numpy as np\n\ndef knn_predict(\n    X_train: np.ndarray,\n    y_train: np.ndarray,\n    X_test: np.ndarray,\n    k: int = 3\n) -> np.ndarray:\n    \"\"\"\n    Predicts class labels for query points using vectorized K-Nearest Neighbors.\n    \n    Parameters\n    ----------\n    X_train : np.ndarray of shape (N_train, D)\n        Training feature coordinates.\n    y_train : np.ndarray of shape (N_train,)\n        Integer class labels for training points.\n    X_test : np.ndarray of shape (N_test, D)\n        Query feature coordinates.\n    k : int\n        Number of nearest neighbors to query.\n        \n    Returns\n    -------\n    np.ndarray of shape (N_test,)\n        Predicted discrete class labels.\n    \"\"\"\n    # Step 1: Vectorized pairwise squared Euclidean distances:\n    # ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z\n    test_sq = np.sum(X_test ** 2, axis=1, keepdims=True)     # (N_test, 1)\n    train_sq = np.sum(X_train ** 2, axis=1, keepdims=True).T  # (1, N_train)\n    cross_term = 2.0 * (X_test @ X_train.T)                   # (N_test, N_train)\n    dist_matrix = test_sq + train_sq - cross_term\n    \n    # Step 2: Identify indices of k smallest distances per query row\n    k_nearest_indices = np.argpartition(dist_matrix, kth=k - 1, axis=1)[:, :k]\n    \n    # Step 3: Retrieve labels of nearest neighbors\n    neighbor_labels = y_train[k_nearest_indices] # shape (N_test, k)\n    \n    # Step 4: Perform democratic majority vote (compute mode)\n    predictions = []\n    for row in neighbor_labels:\n        values, counts = np.unique(row, return_counts=True)\n        majority_label = values[np.argmax(counts)]\n        predictions.append(majority_label)\n        \n    return np.array(predictions, dtype=int)"
        },
        "hints": {
          "tier1": {
            "en": "Vectorized Euclidean distance: ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z.",
            "ar": "المسافة الإقليدية الموجهة: ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z."
          },
          "tier2": {
            "en": "Use np.argpartition to find the k smallest distances per query row efficiently.",
            "ar": "استخدم np.argpartition لإيجاد أصغر k مسافات لكل استعلام بكفاءة عالية."
          },
          "tier3": {
            "en": "Retrieve neighbor labels and use mode (np.unique with return_counts=True) for majority voting.",
            "ar": "استخرج تصنيفات الجيران واستخدم المنوال للتصويت بالأغلبية."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What fundamental geometric pathology explains why the bathroom feature is completely ignored by the model, and how must it be resolved?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الجيران الأقرب (KNN) وفضاءات المسافة والحدود غير المعلمية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Distance metrics in KNN are isotropic and scale-dependent. Because square footage numbers span thousands while bathroom counts are single digits, squared differences along the square footage axis ($\\Delta^2 \\approx 100^2 = 10,000$) completely dominate bathroom differences ($\\Delta^2 \\approx 3^2 = 9$), rendering bathrooms geometrically invisible. All features must be standardized (e.g., via z-score normalization or MinMax scaling) prior to neighbor computation.",
                "ar": "تعتمد مقاييس المسافة في KNN على المقاييس العددية للمتغيرات. وحيث إن المساحة تقاس بآلاف الأقدام المربعة بينما عدد الحمامات أرقام مفردة، فإن الفروق التربيعية للمساحة ($\\Delta^2 \\approx 100^2 = 10,000$) تطغى كلياً على فروق الحمامات ($\\Delta^2 \\approx 3^2 = 9$)، مما يجعل متغير الحمامات غير مرئي هندسياً. يجب توحيد مقاييس كافة المتغيرات (عبر المعايرة المعيارية z-score أو MinMax) قبل حساب المسافات."
              },
              "correct": true,
              "explanation": {
                "en": "Euclidean distance treats a unit difference in any dimension identically. When one dimension has a variance 1,000 times larger than another, it effectively constitutes $99.9\\%$ of the calculated distance, ignoring unscaled features.",
                "ar": "تعامل المسافة الإقليدية وحدة التغير في أي محور بنفس المقدار؛ فعندما يكون تباين أحد المتغيرات أكبر بآلاف المرات من الآخر، فإنه يستحوذ على 99.9% من حساب المسافة ويهمش المتغيرات الصغيرة تماماً ما لم تتم معايرتها."
              }
            },
            {
              "text": {
                "en": "Increasing the hyperparameter $k$ from $5$ to $50$ will automatically rescale bathroom counts to match square footage coordinates.",
                "ar": "سيؤدي رفع المعامل الفائق $k$ من 5 إلى 50 إلى إعادة وزن متغير الحمامات تلقائياً ليتناسب مع المساحة."
              },
              "correct": false,
              "explanation": {
                "en": "Increasing $k$ expands the voting neighborhood size, but does not alter the geometric shape of distance spheres or feature scaling.",
                "ar": "توسع زيادة قيمة $k$ دائرة الجيران المصوتين فقط، ولكنها لا تغير مقاييس الفضاء الهندسي أو حساب المسافات."
              }
            },
            {
              "text": {
                "en": "Euclidean distance is strictly invalid for continuous numbers; the bathroom feature must be converted into a one-hot encoded matrix.",
                "ar": "تعد المسافة الإقليدية باطلة رياضياً للأعداد المستمرة، ويجب تحويل متغير الحمامات إلى ترميز أحادي."
              },
              "correct": false,
              "explanation": {
                "en": "Euclidean distance is natively defined on real-valued continuous Cartesian spaces; one-hot encoding is reserved for unordered nominal categories.",
                "ar": "المسافة الإقليدية مصممة خصيصاً للمتغيرات العددية المستمرة، والترميز الأحادي مخصص للفئات الاسمية غير الرقمية."
              }
            },
            {
              "text": {
                "en": "KNN cannot accept more than one feature without violating the orthogonality assumption of the Gauss-Markov theorem.",
                "ar": "تعجز خوارزمية KNN عن استقبال أكثر من متغير واحد لتجنب خرق فرضية التعامد في مبرهنة غاوس-ماركوف."
              },
              "correct": false,
              "explanation": {
                "en": "KNN is a non-parametric model that makes no Gauss-Markov assumptions and readily scales to multi-dimensional spaces.",
                "ar": "خوارزمية KNN نموذج لا معلمي لا يخضع لمبرهنة غاوس-ماركوف ويعمل في أي عدد من الأبعاد الهندسية."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "curse-of-dimensionality-metric-trees",
    "title": "The Curse of Dimensionality & Metric Trees (KD-Trees)",
    "titleAr": "لعنة الأبعاد وأشجار المسافات المكانية (KD-Trees)",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Human beings evolved to navigate an exclusively three-dimensional physical world. When data scientists step beyond three dimensions into...",
      "ar": "تطور الإدراك البشري ليتفاعل حصرياً مع عالم فيزيائي ثلاثي الأبعاد. ولكن عندما يخطو مهندس البيانات نحو فضاءات تضم مئات أو آلاف..."
    },
    "prerequisites": [
      "knn-classification",
      "cartesian-coordinate-metric"
    ],
    "x": 805,
    "y": 2645,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "CurseOfDimensionalitySphereLab",
        "narrative": {
          "en": "Human beings evolved to navigate an exclusively three-dimensional physical world. When data scientists step beyond three dimensions into hundreds or thousands of dimensions—such as 512-dimensional image representations, 1,536-dimensional Large Language Model embeddings, or 20,000-dimensional gene expression arrays—intuition completely collapses. Richard Bellman (1957) coined the term **The Curse of Dimensionality** to describe how space empties out and distances lose meaning as dimensions multiply.\n\nTo see this visually, consider the **Hyper-Orange Peel Paradox**. \nWhen you peel a normal 3D orange, the thin outer rind is just a tiny fraction of the fruit's volume; almost everything is juicy pulp in the center.\nNow, imagine a **100-dimensional hyper-orange**! As dimension $D$ increases, the ratio of a sphere's volume to its bounding cube collapses exponentially to zero:\n$$\n\\lim_{D \\to \\infty} \\frac{V_D(r)}{C_D(2r)} = 0\n$$\nBy dimension 100, more than **99.9999% of the orange's entire volume lives inside the razor-thin outer peel!** The center of high-dimensional space is an empty, desolate vacuum. All data points are exiled to the outer skin, corners, and spiky extremes of the hypercube.\n\nThis leads directly to the **Death of Nearness (Distance Concentration)**:\nIn 2D or 3D, you can easily point to a close friend standing nearby and contrast them with someone far across the street. But in 1,000 dimensions, the distance between your *closest* neighbor ($D_{\\min}$) and your *farthest* neighbor ($D_{\\max}$) shrinks to almost nothing relative to the distance itself:\n$$\n\\frac{D_{\\max} - D_{\\min}}{D_{\\min}} \\to 0\n$$\nIn high dimensions, **every single observation is virtually the exact same distance away from you!** The concept of \"nearness\" evaporates, leaving distance-based algorithms chasing random floating-point noise rather than true semantic similarity.\n\nThis spatial explosion breaks traditional tree indexing like **KD-Trees**. In low dimensions ($D \\le 15$), KD-Trees partition space neatly to enable blazing $O(\\log N)$ search. But in 1,000 dimensions, a query sphere cuts through virtually every dividing wall, forcing the tree to backtrack across all $2^D$ branches—making it slower than a simple brute-force scan!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Curse of Dimensionality** | The emptying universe: high-dimensional space is unimaginably vast and almost completely empty. |\n| **Hyper-Orange Paradox** | Mass migration: in high dimensions, 99.99% of volume concentrates in the outer skin/corners. |\n| **Distance Concentration** | The death of nearness: ratio of farthest to nearest distance converges to 1; all points feel equally far. |\n| **KD-Tree** | Spatial indexing: recursively cuts space along coordinate axes for fast neighbor search. |\n| **Search Degeneration** | Index failure: high dimensions force tree searches to inspect every branch, defeating the index. |\n\n```text\n    THE HYPER-ORANGE VOLUME MIGRATION:\n\n2D Circle / 3D Sphere               100D Hypersphere\n        (Mass in juicy center)         (Mass trapped in razor peel!)\n              .-----.                           .-----.\n            .'  ***  '.                       .' ===== '.   <--- 99.999%\n           /   *****   \\                     / ========= \\       Volume in\n          |   *******   |                   |  (EMPTY!)   |      Outer Peel\n           \\   *****   /                     \\ ========= /\n            '.  ***  .'                       '. ===== .'\n              '-----'                           '-----'\n```",
          "ar": "تطور الإدراك البشري ليتفاعل حصرياً مع عالم فيزيائي ثلاثي الأبعاد. ولكن عندما يخطو مهندس البيانات نحو فضاءات تضم مئات أو آلاف الأبعاد—كالتعامل مع متجهات الصور (512 بعداً)، أو تضمينات النماذج اللغوية الكبيرة (1,536 بعداً)، أو المؤشرات الجينومية (20,000 بعد)—تنهار البديهيات الهندسية المألوفة تماماً. أطلق عالم الرياضيات ريتشارد بيلمان (1957) على هذه المعضلة اسم **\"لعنة الأبعاد\" (The Curse of Dimensionality)** لوصف الانفجار الأسي لحجم الفضاء الذي يفرغ البيانات من محتواها الموضعي.\n\nولاستيعاب هذه الظاهرة حسياً، تأمل **مفارقة قشرة البرتقال الفائقة (Hyper-Orange Paradox)**:\nعندما تقشر برتقالة عادية في عالمنا ثلاثي الأبعاد، فإن القشرة الخارجية تمثل نسبة ضئيلة جداً من الحجم، بينما يتركز معظم الحجم في اللب الداخلي العصيري.\nوالآن تخيل **برتقالة فائقة في فضاء ذي 100 بعد!** مع تزايد الأبعاد $D$، تهوي نسبة حجم الكرة الداخلية المحاطة بمكعب نحو الصفر رياضياً:\n$$\n\\lim_{D \\to \\infty} \\frac{V_D(r)}{C_D(2r)} = 0\n$$\nعند الوصول إلى 100 بعد، يهاجر أكثر من **99.9999% من إجمالي كتلة البرتقالة نحو القشرة الخارجية الدقيقة!** يتحول مركز الفضاء عالي الأبعاد إلى فراغ مهجور، وتُنفى جميع نقاط البيانات نحو الأطراف والزوايا الحادة للمكعب الفائق.\n\nيقود هذا التشوه إلى **تلاشي مفهوم \"الجوار\" (ظاهرة انكماش المسافات - Distance Concentration)**:\nفي البعدين أو الثلاثة أبعاد، يمكنك بسهولة تمييز جارك القريب من شخص آخر يبتعد عنك بأميال. ولكن في فضاء ذي 1,000 بعد، ينكمش التباين النسبي بين المسافة إلى أقرب جار ($D_{\\min}$) والمسافة إلى أبعد جار ($D_{\\max}$) ليقترب من الصفر:\n$$\n\\frac{D_{\\max} - D_{\\min}}{D_{\\min}} \\to 0\n$$\nفي الأبعاد الشاهقة، تصبح جميع النقاط على نفس المسافة منك تقريباً! يتلاشى مفهوم القرب المكاني، وتبدأ خوارزميات المسافة في ملاحقة ضجيج حسابي عشوائي لا قيمة له.\n\nيدمر هذا الانهيار هياكل البيانات المكانية مثل **أشجار KD-Trees**؛ ففي الأبعاد المنخفضة ($D \\le 15$)، تبحث في زمن سريع $O(\\log N)$. لكن في الأبعاد العالية، تتقاطع كرة البحث مع كافة مستويات التقسيم تقريباً، مما يجبر الخوارزمية على التراجع وفحص كافة الفروع البالغ عددها $2^D$ فرعاً، لتتحول إلى فحص شامل بطيء يفوق بطء البحث الخطي المباشر.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **لعنة الأبعاد** | الكون الفارغ: تتسع الفضاءات متعددة الأبعاد بشكل مرعب وتصبح شبه خالية تماماً. |\n| **مفارقة البرتقالة الفائقة** | هجرة الكتلة: في الأبعاد العالية، تتركز 99.99% من الكتلة في القشرة والزوايا الخارجية. |\n| **انكماش المسافات** | موت الجوار: تتساوى المسافات تقريباً بين أقرب وأبعد نقطة، فيفقد القرب معناه. |\n| **شجرة KD-Tree** | الفهرسة المكانية: تقسم الفضاء بمستويات متعامدة للبحث السريع عن الجيران. |\n| **انتكاس البحث** | فشل الفهرسة: تجبر الأبعاد العالية الشجرة على فحص كل الفروع فتصبح أبطأ من البحث المباشر. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "V_D(r) = \\frac{\\pi^{D/2}}{\\Gamma\\left(\\frac{D}{2} + 1\\right)} r^D",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for The Curse of Dimensionality & Metric Trees (KD-Trees).",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ لعنة الأبعاد وأشجار المسافات المكانية (KD-Trees)."
        },
        "narrative": {
          "en": "where $\\Gamma(z) = \\int_0^\\infty t^{z-1} e^{-t} dt$ is Euler's Gamma function ($\\Gamma(k+1) = k!$ for integers). The volume of the enclosing hypercube is:\n\n$$\nC_D(2r) = (2r)^D\n$$\n\nEvaluating the ratio of volumes:\n\n$$\n\\rho_D \\equiv \\frac{V_D(r)}{C_D(2r)} = \\frac{\\pi^{D/2}}{2^D \\Gamma\\left(\\frac{D}{2} + 1\\right)} = \\frac{1}{D!} \\left( \\frac{\\pi}{4} \\right)^{D/2} \\xrightarrow{D \\to \\infty} 0\n$$\n\n### The Distance Concentration Phenomenon (Beyer et al., 1999)\nLet $\\mathbf{X}_1, \\dots, \\mathbf{X}_N$ be independent and identically distributed random vectors in $\\mathbb{R}^D$. Under broad conditions on the data-generating distribution, if:\n\n$$\n\\lim_{D \\to \\infty} \\text{Var}\\left( \\frac{\\|\\mathbf{X}_i\\|_p}{\\mathbb{E}[\\|\\mathbf{X}_i\\|_p]} \\right) = 0\n$$\n\nthen for any query point $\\mathbf{Q}$, the relative difference between the maximum and minimum distance to the query vanishes in probability:\n\n$$\n\\frac{D_{\\max} - D_{\\min}}{D_{\\min}} \\xrightarrow{p} 0 \\quad \\text{as } D \\to \\infty\n$$\n\nImplement the empirical distance contrast computation in NumPy to measure the Curse of Dimensionality. You will:\n1. Compute all pairwise squared Euclidean distances across the dataset: $\\|\\mathbf{x}_i - \\mathbf{x}_j\\|_2^2 = \\|\\mathbf{x}_i\\|_2^2 + \\|\\mathbf{x}_j\\|_2^2 - 2\\mathbf{x}_i^T\\mathbf{x}_j$.\n2. Take the element-wise square root with numerical clamping $\\max(d^2, 0.0)$.\n3. Mask the diagonal elements using `np.fill_diagonal(..., np.nan)` to exclude self-distances ($d(\\mathbf{x}_i, \\mathbf{x}_i) = 0$).\n4. Compute the minimum pairwise distance $d_{\\min}$, maximum distance $d_{\\max}$, and the relative contrast ratio $\\frac{d_{\\max} - d_{\\min}}{d_{\\min}}$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $\\mathcal{B}_D(r)$ | $\\{\\mathbf{x} : \\|\\mathbf{x}\\|_2 \\le r\\}$ | $D$-dimensional ball of radius $r$ | الكرة الإقليدية في فضاء ذي $D$ بعداً |\n| $\\mathcal{C}_D(2r)$ | $[-r, r]^D$ | Enclosing bounding hypercube of side $2r$ | المكعب الفائق المحيط بالكرة ذو الضلع $2r$ |\n| $V_D(r)$ | $\\frac{\\pi^{D/2}}{\\Gamma(D/2 + 1)} r^D$ | Volume of $D$-dimensional sphere | الحجم الرياضي للكرة متعددة الأبعاد |\n| $\\rho_D$ | $V_D(r) / C_D(2r)$ | Volume ratio collapsing to zero as $D \\to \\infty$ | نسبة حجم الكرة إلى المكعب المتلاشية للصفر |\n| $D_{\\min}, D_{\\max}$ | $\\min_i d(\\mathbf{Q}, \\mathbf{X}_i), \\max_i d(\\mathbf{Q}, \\mathbf{X}_i)$ | Distance to nearest and farthest neighbors | المسافة إلى أقرب وأبعد نقطة تدريب |\n| $\\frac{D_{\\max} - D_{\\min}}{D_{\\min}}$ | Relative distance contrast | Contrast ratio converging to 0 in high dimensions | التباين النسبي للمسافات المنكمش نحو الصفر |\n| $\\Gamma(z)$ | Euler Gamma function | Extension of factorial to continuous arguments | دالة غاما المعممة لعاملي الأعداد |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-curse-of-dimensionality-metric-trees",
          "starterCode": "def compute_distance_contrast(X: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes pairwise Euclidean distance metrics demonstrating the curse of dimensionality.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Dataset matrix with N samples in D dimensions.\n        \n    Returns\n    -------\n    dict with keys:\n        'd_min': Minimum non-zero pairwise Euclidean distance.\n        'd_max': Maximum pairwise Euclidean distance.\n        'relative_contrast': Relative distance contrast (d_max - d_min) / d_min.\n    \"\"\"\n    # Step 1: Vectorized pairwise squared Euclidean distances: ||x - z||^2\n    # Correct small negative floating-point artifacts\n    # Step 2: Mask the diagonal to ignore self-distance d(x_i, x_i) = 0\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "np.random.seed(42); X_1d = np.random.uniform(0, 1, size=(50, 1)); res = compute_distance_contrast(X_1d); f\"{res['relative_contrast'] > 1.0}\"",
              "expected": "True"
            },
            {
              "input": "np.random.seed(42); X_hd = np.random.uniform(0, 1, size=(50, 500)); res = compute_distance_contrast(X_hd); f\"{res['relative_contrast'] < 0.3}\"",
              "expected": "True"
            }
          ],
          "expectedOutput": "True",
          "variants": {
            "python": {
              "starterCode": "def compute_distance_contrast(X: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes pairwise Euclidean distance metrics demonstrating the curse of dimensionality.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Dataset matrix with N samples in D dimensions.\n        \n    Returns\n    -------\n    dict with keys:\n        'd_min': Minimum non-zero pairwise Euclidean distance.\n        'd_max': Maximum pairwise Euclidean distance.\n        'relative_contrast': Relative distance contrast (d_max - d_min) / d_min.\n    \"\"\"\n    # Step 1: Vectorized pairwise squared Euclidean distances: ||x - z||^2\n    # Correct small negative floating-point artifacts\n    # Step 2: Mask the diagonal to ignore self-distance d(x_i, x_i) = 0\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef compute_distance_contrast(X: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes pairwise Euclidean distance metrics demonstrating the curse of dimensionality.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Dataset matrix with N samples in D dimensions.\n        \n    Returns\n    -------\n    dict with keys:\n        'd_min': Minimum non-zero pairwise Euclidean distance.\n        'd_max': Maximum pairwise Euclidean distance.\n        'relative_contrast': Relative distance contrast (d_max - d_min) / d_min.\n    \"\"\"\n    N, D = X.shape\n    \n    # Step 1: Vectorized pairwise squared Euclidean distances: ||x - z||^2\n    dots = X @ X.T\n    sq_norms = np.diag(dots)\n    dist_matrix_sq = sq_norms[:, None] + sq_norms[None, :] - 2.0 * dots\n    \n    # Correct small negative floating-point artifacts\n    dist_matrix_sq = np.maximum(dist_matrix_sq, 0.0)\n    dist_matrix = np.sqrt(dist_matrix_sq)\n    \n    # Step 2: Mask the diagonal to ignore self-distance d(x_i, x_i) = 0\n    np.fill_diagonal(dist_matrix, np.nan)\n    \n    # Step 3: Extract empirical extremes\n    d_min = float(np.nanmin(dist_matrix))\n    d_max = float(np.nanmax(dist_matrix))\n    \n    # Step 4: Calculate relative contrast metric\n    relative_contrast = (d_max - d_min) / d_min if d_min > 0 else 0.0\n    \n    return {\n        \"d_min\": d_min,\n        \"d_max\": d_max,\n        \"relative_contrast\": float(relative_contrast)\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Compute the pairwise Euclidean distance matrix for all pairs of samples.",
            "ar": "احسب مصفوفة المسافات الإقليدية الثنائية بين جميع أزواج العينات."
          },
          "tier2": {
            "en": "Mask the diagonal of self-distances with NaN using np.fill_diagonal.",
            "ar": "احجب قطر المسافات الذاتية بقيم NaN باستخدام np.fill_diagonal."
          },
          "tier3": {
            "en": "Extract nanmin and nanmax, and compute relative contrast (d_max - d_min) / d_min.",
            "ar": "استخرج nanmin و nanmax، واحسب التباين النسبي (d_max - d_min) / d_min."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Why does the KD-Tree experience catastrophic algorithmic collapse on high-dimensional text embeddings, and how should modern vector search systems be architected?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ لعنة الأبعاد وأشجار المسافات المكانية (KD-Trees) تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "In $D = 1,536$ dimensions, the query hypersphere intersects almost all axis-aligned bounding hyperplanes simultaneously. The KD-Tree is forced to backtrack through virtually every branch in the tree, visiting nearly all $N$ leaves while adding the CPU cache misses of recursive pointer chasing. Exact metric trees are mathematically ineffective for $D \\gg 20$; production systems must adopt Approximate Nearest Neighbor (ANN) graph algorithms (such as HNSW) or product quantization (IVF-PQ).",
                "ar": "في فضاء ذي 1,536 بعداً، تتقاطع كرة البحث مع جميع المستويات المكانية تقريباً في آن واحد. وتُجبر شجرة KD-Tree على التراجع وفحص كافة الفروع وزيارة جميع الأوراق البالغ عددها $N$ تقريباً، مع إهدار كبير لوقت المعالج في تتبع مؤشرات الذاكرة. تصبح الأشجار المكانية الدقيقة عديمة الفائدة رياضياً عندما يتجاوز البعد $D \\gg 20$؛ والحل الإنتاجي هو التحول لخوارزميات الجوار التقريبي (ANN) مثل الرسوم البيانية الهرمية (HNSW) أو تكميم المتجهات (IVF-PQ)."
              },
              "correct": true,
              "explanation": {
                "en": "The curse of dimensionality forces KD-Trees to explore $O(2^D)$ paths. Because $2^{1536} \\gg 100,000$, pruning fails completely and the search degrades to a full scan plagued with pointer overhead. ANN algorithms trade a tiny sliver of recall for orders-of-magnitude speedups.",
                "ar": "تجبر لعنة الأبعاد شجرة KD-Tree على تتبع $2^D$ مسار محتمل؛ وحيث إن $2^{1536}$ أكبر بمراحل من حجم العينة، يفشل تقليم الفروع تماماً وتتحول الشجرة لفحص شامل مثقل بتكاليف تتبع الذاكرة. وتوفر خوارزميات الجوار التقريبي (ANN) سرعة فائقة عبر التخلي عن نسبة ضئيلة جداً من الدقة المطلقة."
              }
            },
            {
              "text": {
                "en": "Text embeddings contain negative cosine similarity coordinates, which violates the triangle inequality of the metric tensor.",
                "ar": "تحتوي تضمينات النصوص على قيم تشابه جيب تمام سالبة، مما ينتهك متباينة المثلث في موتر المسافة."
              },
              "correct": false,
              "explanation": {
                "en": "Negative coordinates are entirely valid in Cartesian metric spaces; Euclidean distance $\\|\\mathbf{x} - \\mathbf{z}\\|_2$ is strictly non-negative and satisfies the triangle inequality everywhere.",
                "ar": "الإحداثيات السالبة مقبولة وطبيعية تماماً في الفضاءات الديكارتية؛ والمسافة الإقليدية موجبة دائماً وتحقق متباينة المثلث في كافة الظروف."
              }
            },
            {
              "text": {
                "en": "KD-Tree search algorithms are mathematically constrained to datasets where the sample size $N$ is a strictly prime number.",
                "ar": "تقتصر خوارزمية بحث KD-Tree رياضياً على مجموعات البيانات التي يكون فيها حجم العينة $N$ عدداً أولياً حصراً."
              },
              "correct": false,
              "explanation": {
                "en": "KD-Trees can index any arbitrary integer number of samples $N \\in \\mathbb{N}$; there is zero restriction regarding prime numbers.",
                "ar": "تعمل أشجار KD-Tree مع أي عدد صحيح من العينات دون أي ارتباط بالأعداد الأولية."
              }
            },
            {
              "text": {
                "en": "GPU hardware architectures cannot compute Euclidean vector subtractions due to lack of floating-point arithmetic logic units.",
                "ar": "تعجز بنية معالجات الرسومات (GPU) عن إجراء عمليات طرح المتجهات الإقليدية لافتقارها لوحدات الحساب والمنطق."
              },
              "correct": false,
              "explanation": {
                "en": "GPUs are mass-parallel floating-point matrix multiplication engines optimized specifically for high-throughput linear algebra.",
                "ar": "وحدات معالجة الرسومات مصممة خصيصاً لإجراء مليارات العمليات الحسابية المتوازية وتتفوق بشكل هائل في الجبر الخطي."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "decision-trees",
    "title": "Decision Trees (CART), Impurity Measures & Cost-Complexity Pruning",
    "titleAr": "أشجار القرار (CART) ومقاييس اللايقين والتقليم بتكلفة التعقيد",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Remember playing the classic game \"20 Questions\" as a child? You don't guess your friend's secret animal by multiplying arbitrary numbers...",
      "ar": "تذكر لعبة الطفولة الشهيرة \"20 سؤالاً\": عندما تحاول تخمين الحيوان السري الذي يفكر فيه صديقك، فإنك لا تلجأ لمعادلات جبرية معقدة، بل تطرح..."
    },
    "prerequisites": [
      "knn-classification",
      "logistic-regression-sigmoid"
    ],
    "x": 825,
    "y": 2740,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DecisionTreeLaser",
        "narrative": {
          "en": "Remember playing the classic game **\"20 Questions\"** as a child?\n\nYou don't guess your friend's secret animal by multiplying arbitrary numbers or fitting matrix calculus equations. Instead, you ask sharp, hierarchical yes/no questions designed to cut uncertainty in half:\n*\"Is it warm-blooded?\"* $\\to$ Yes $\\to$ *\"Does it live on land?\"* $\\to$ Yes $\\to$ *\"Does it have orange fur with black stripes?\"* $\\to$ Yes $\\to$ *\"It's a tiger!\"*\n\nWith fewer than ten well-crafted binary questions, you can effortlessly identify one creature out of millions.\n\nThis intuitive flowchart logic is the essence of **Decision Trees (CART - Classification and Regression Trees)**, formulated by Leo Breiman and colleagues in 1984.\n\nWhile linear regression forces the world into rigid additive equations—assuming every variable acts independently—reality is packed with conditional interactions. In emergency medicine, a heart rate of 140 bpm is perfectly normal for an athlete finishing a marathon, but terrifying in an elderly patient complaining of chest pressure! A decision tree captures these conditional branches naturally by slicing the feature space into a clean patchwork of rectangular boxes.\n\nAt every step, the tree acts as a greedy purity seeker:\nImagine having a bowl filled with **50 red marbles and 50 blue marbles**. The bowl is thoroughly mixed and **impure**: if you reach in blindfolded and draw two marbles, there is a 50% chance they won't match.\nThe tree tests every single feature and every numerical threshold (e.g., *\"Is Blood Pressure $> 140$?\"*) to find the split that separates the marbles into child bowls that are as pure and monochromatic as possible. Purity is measured using **Gini Impurity** or **Shannon Entropy**.\n\nHowever, an unchecked decision tree behaves like a wild weed. If left unconstrained, it will keep branching until every single training sample lives in its own private leaf node. The tree boasts 100% training accuracy, but it has simply memorized accidental noise—the textbook definition of **overfitting**.\nTo build a resilient tree, **Cost-Complexity Pruning** uses mathematical pruning shears: it penalizes the tree for every extra leaf ($\\alpha |\\mathcal{T}|$), lopping off weak outer twigs that don't earn their keep.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **CART** | Classification and Regression Trees: binary tree algorithm that splits data into pure subsets. |\n| **Gini Impurity** | Disorder score: probability that two randomly drawn samples from a leaf have different labels. |\n| **Shannon Entropy** | Information deficit: measures bit-level chaos and uncertainty in a distribution. |\n| **Greedy Split** | Myopic choice: picks the best immediate split right now, without looking steps ahead. |\n| **Cost-Complexity Pruning** | Gardening shears: chops off brittle outer leaves that add complexity without real predictive value. |\n\n```text\n    THE CART BINARY DECISION TREE:\n\n[Chest Pain > 0?]\n                       /          \\\n                    No/            \\Yes\n                     v              v\n               [Low Risk]    [Age > 60?]\n                               /     \\\n                            No/       \\Yes\n                             v         v\n                      [Moderate]   [High Risk: ECG]\n```",
          "ar": "تذكر لعبة الطفولة الشهيرة **\"20 سؤالاً\"**:\n\nعندما تحاول تخمين الحيوان السري الذي يفكر فيه صديقك، فإنك لا تلجأ لمعادلات جبرية معقدة، بل تطرح أسئلة ثنائية ذكية تقسم دائرة الشك إلى النصف في كل خطوة:\n*\"هل هو ذو دم حار؟\"* $\\to$ نعم $\\to$ *\"هل يعيش على اليابسة؟\"* $\\to$ نعم $\\to$ *\"هل يمتلك فراءً برتقالياً بخطوط سوداء؟\"* $\\to$ نعم $\\to$ *\"إنه النمر!\"*\n\nومن خلال بضعة أسئلة محكمة، تستطيع تمييز كائن واحد من بين ملايين الكائنات الحية بسهولة مدهشة.\n\nهذا المخطط الانسيابي الذكي هو جوهر **أشجار القرار (CART - أشجار التصنيف والانحدار)** التي ابتكرها ليو بريمان وزملاؤه عام 1984.\n\nفي حين تجبر النماذج الخطية البيانات على الخضوع لمعادلات جمعية صلبة تفترض استقلال المتغيرات، فإن الواقع حافل بالتفاعلات الشرطية المتشابكة؛ فارتفاع نبضات القلب إلى 140 نبضة أمر طبيعي لعداء أنهى سباقه، ولكنه مؤشر خطر داهم لمسن يعاني من آلام في الصدر! تلتقط أشجار القرار هذه الشروط المنطقية بصورة فطرية عبر تقسيم فضاء البيانات إلى مكعبات ومربعات متعامدة هندسياً.\n\nعند كل خطوة، تبحث الشجرة بنهم عن النقاء التام:\nتخيل وعاءً يحتوي على **50 كرة حمراء و 50 كرة زرقاء**. هذا الوعاء مفرط في الخلط واللايقين؛ فإذا سحبت كرتين عشوائياً، فهناك احتمال 50% ألا تتطابق ألوانهما.\nتمسح الشجرة كافة المتغيرات وكل العتبات الرقمية الممكنة لاكتشاف السؤال القاطع الذي يقسم الكرات إلى مجموعتين بأعلى درجة ممكنة من النقاء والصفاء، ويتم قياس هذا النقاء رياضياً عبر **لايقين جيني (Gini Impurity)** أو **إنتروبيا شانون (Entropy)**.\n\nلكن الشجرة التي تُترك تنمو بلا قيود تشبه نباتاً برياً طفيلياً؛ حيث ستواصل التفرع حتى تنعزل كل نقطة تدريب واحدة في ورقة مستقلة. ستحقق الشجرة دقة تدريب كاذبة 100%، لكنها حفظت الضجيج العشوائي فقط (Overfitting).\nولتهذيب هذا النمو، يطبق **تقليم التكلفة والتعقيد (Cost-Complexity Pruning)** مقصاً رياضياً حاسماً: يفرض عقوبة على كل ورقة إضافية ($\\alpha |\\mathcal{T}|$)، ليقص الفروع الهشة التي لا تقدم إضافة حقيقية تبرر تعقيد هيكل الشجرة.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **أشجار CART** | أشجار التصنيف والانحدار: خوارزمية هرمية ثنائية تقسم البيانات إلى مجموعات نقية. |\n| **لايقين جيني (Gini)** | مقياس الفوضى: احتمال أن تسحب عينتين عشوائياً من نفس العقدة وتجدهما من فئتين مختلفتين. |\n| **إنتروبيا شانون** | عجز المعلومات: يقيس مستوى الفوضى والغموض في التوزيع الاحتمالي. |\n| **التقسيم الطماع** | الاختيار قصير النظر: يختار أفضل تقسيم متاح حالياً دون النظر للعواقب اللاحقة. |\n| **تقليم التكلفة والتعقيد** | مقص البستاني: يقطع الفروع الرقيقة التي تضيف تعقيداً هيكلياً دون فائدة تنبؤية حقيقية. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "p_{mk} = \\frac{1}{N_m} \\sum_{i \\in \\mathcal{S}_m} \\mathbb{I}(y_i = k), \\quad \\text{for } k \\in \\{1, \\dots, K\\}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Decision Trees (CART), Impurity Measures & Cost-Complexity Pruning.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ أشجار القرار (CART) ومقاييس اللايقين والتقليم بتكلفة التعقيد."
        },
        "narrative": {
          "en": "### Node Impurity Measures\nTo evaluate the heterogeneity of node $m$, CART relies on concave uncertainty metrics:\n\n1. **Gini Impurity (Expected Misclassification under Random Labeling):**\n   $$\n   I_G(m) = 1 - \\sum_{k=1}^K p_{mk}^2 = \\sum_{k=1}^K p_{mk}(1 - p_{mk})\n   $$\n   For binary classification where $p \\equiv p_{m1}$, this simplifies to $I_G(m) = 2p(1 - p)$, with a maximum of $0.5$ at $p = 0.5$ and a minimum of $0.0$ at pure consensus ($p \\in \\{0, 1\\}$).\n\n2. **Cross-Entropy / Shannon Information Entropy:**\n   $$\n   H(m) = -\\sum_{k=1}^K p_{mk} \\log_2(p_{mk})\n   $$\n\n### The Greedy Best-Split Objective\nA candidate split $\\theta = (j, s)$ on feature $j$ at threshold $s$ partitions node $m$ into left and right children:\n\n$$\n\\mathcal{S}_{m, L}(\\theta) = \\{i \\in \\mathcal{S}_m : x_{ij} \\le s\\}, \\quad \\mathcal{S}_{m, R}(\\theta) = \\{i \\in \\mathcal{S}_m : x_{ij} > s\\}\n$$\n\nThe impurity reduction (split gain) is:\n\n$$\n\\Delta I(m, \\theta) = I(m) - \\left[ \\frac{N_{m, L}}{N_m} I(m, L) + \\frac{N_{m, R}}{N_m} I(m, R) \\right]\n$$\n\nCART chooses the optimal split $\\theta^*$ by maximizing impurity reduction:\n\n$$\n\\theta^* = \\arg\\max_\\theta \\Delta I(m, \\theta)\n$$\n\n### Cost-Complexity Pruning (Breiman et al., 1984)\nGiven a fully grown tree $\\mathcal{T}_{\\max}$, we minimize the penalized cost-complexity criterion:\n\n$$\nR_\\alpha(\\mathcal{T}) = R(\\mathcal{T}) + \\alpha |\\tilde{\\mathcal{T}}|\n$$\n\nwhere $R(\\mathcal{T}) = \\sum_{m \\in \\tilde{\\mathcal{T}}} \\frac{N_m}{N} I(m)$ is total misclassification loss, $|\\tilde{\\mathcal{T}}|$ is the number of terminal leaves, and $\\alpha \\ge 0$ is the complexity penalty parameter.\n\nImplement the core CART split evaluation engine using Gini impurity in NumPy. You will:\n1. Define the Gini impurity function $I_G(\\mathbf{y}) = 1 - \\sum p_k^2$ for any array of discrete integer labels.\n2. Evaluate the baseline parent node impurity.\n3. Iterate over all feature dimensions $j$ and candidate thresholds (midpoints between adjacent sorted unique values).\n4. Partition samples into left and right child subsets, compute the weighted child impurity, and record the split $(j^*, s^*)$ yielding maximum impurity reduction.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $\\mathcal{S}_m$ | Data subset at node $m$ | Training observations falling into region $m$ | عينات التدريب الواقعة ضمن نطاق العقدة $m$ |\n| $p_{mk}$ | $\\frac{1}{N_m}\\sum \\mathbb{I}(y_i=k)$ | Empirical class probability in node $m$ | الاحتمال التجريبي للفئة $k$ في العقدة $m$ |\n| $I_G(m)$ | $1 - \\sum p_{mk}^2$ | Gini impurity: variance of class assignments | لايقين جيني: مقياس التشتت وعدم التجانس |\n| $H(m)$ | $-\\sum p_{mk} \\log_2(p_{mk})$ | Shannon entropy: information deficit | إنتروبيا شانون: مقياس الفوضى المعلوماتية |\n| $\\theta = (j, s)$ | Feature $j$, threshold $s$ | Decision rule splitting a node in two | قاعدة القرار الفاصلة للمتغير والعتبة |\n| $\\Delta I(m, \\theta)$ | Impurity gain | Purity improvement achieved by split $\\theta$ | التحسن في نقاء البيانات الناتج عن التقسيم |\n| $|\\tilde{\\mathcal{T}}|$ | Terminal leaf count | Structural complexity of the tree | عدد الأوراق الطرفية ومقياس تعقيد الشجرة |\n| $\\alpha$ | Pruning penalty | Tuning parameter balancing accuracy vs tree size | معامل جزاء التقليم الموازن بين الدقة والحجم |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-decision-trees",
          "starterCode": "def find_best_split_gini(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Finds the optimal feature and threshold maximizing Gini impurity reduction.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Feature matrix.\n    y : np.ndarray of shape (N,)\n        Discrete integer class labels.\n        \n    Returns\n    -------\n    dict with keys:\n        'best_feature': Index of feature giving best split.\n        'best_threshold': Numerical threshold giving best split.\n        'best_gain': Maximum Gini impurity reduction achieved.\n    \"\"\"\n    # Step 1: Define Gini impurity calculation\n    # Step 2: Calculate parent node impurity\n    # Step 3: Iterate through all feature columns\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X = np.array([[1.0], [2.0], [5.0], [6.0]]); y = np.array([0, 0, 1, 1]); res = find_best_split_gini(X, y); f\"{res['best_feature']}, {res['best_threshold']:.1f}, {res['best_gain']:.2f}\"",
              "expected": "0, 3.5, 0.50"
            },
            {
              "input": "X = np.array([[10.0], [20.0], [30.0]]); y = np.array([0, 1, 0]); res = find_best_split_gini(X, y); f\"{res['best_gain'] > 0.0}\"",
              "expected": "True"
            }
          ],
          "expectedOutput": "0, 3.5, 0.50",
          "variants": {
            "python": {
              "starterCode": "def find_best_split_gini(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Finds the optimal feature and threshold maximizing Gini impurity reduction.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Feature matrix.\n    y : np.ndarray of shape (N,)\n        Discrete integer class labels.\n        \n    Returns\n    -------\n    dict with keys:\n        'best_feature': Index of feature giving best split.\n        'best_threshold': Numerical threshold giving best split.\n        'best_gain': Maximum Gini impurity reduction achieved.\n    \"\"\"\n    # Step 1: Define Gini impurity calculation\n    # Step 2: Calculate parent node impurity\n    # Step 3: Iterate through all feature columns\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0, 3.5, 0.50"
            }
          },
          "solution": "import numpy as np\n\ndef find_best_split_gini(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Finds the optimal feature and threshold maximizing Gini impurity reduction.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Feature matrix.\n    y : np.ndarray of shape (N,)\n        Discrete integer class labels.\n        \n    Returns\n    -------\n    dict with keys:\n        'best_feature': Index of feature giving best split.\n        'best_threshold': Numerical threshold giving best split.\n        'best_gain': Maximum Gini impurity reduction achieved.\n    \"\"\"\n    N, P = X.shape\n    \n    # Step 1: Define Gini impurity calculation\n    def gini(labels: np.ndarray) -> float:\n        if len(labels) == 0:\n            return 0.0\n        _, counts = np.unique(labels, return_counts=True)\n        probs = counts / len(labels)\n        return float(1.0 - np.sum(probs ** 2))\n\n    # Step 2: Calculate parent node impurity\n    parent_gini = gini(y)\n    best_gain = -1.0\n    best_feature = -1\n    best_threshold = 0.0\n    \n    # Step 3: Iterate through all feature columns\n    for j in range(P):\n        vals = np.unique(X[:, j])\n        if len(vals) <= 1:\n            continue\n            \n        # Candidate split thresholds are midpoints of adjacent sorted values\n        thresholds = (vals[:-1] + vals[1:]) / 2.0\n        \n        for thresh in thresholds:\n            left_mask = X[:, j] <= thresh\n            right_mask = ~left_mask\n            \n            y_left = y[left_mask]\n            y_right = y[right_mask]\n            \n            if len(y_left) == 0 or len(y_right) == 0:\n                continue\n                \n            left_gini = gini(y_left)\n            right_gini = gini(y_right)\n            \n            # Step 4: Compute weighted child impurity and information gain\n            weighted_impurity = (len(y_left) / N) * left_gini + (len(y_right) / N) * right_gini\n            gain = parent_gini - weighted_impurity\n            \n            if gain > best_gain:\n                best_gain = gain\n                best_feature = j\n                best_threshold = float(thresh)\n                \n    return {\n        \"best_feature\": best_feature,\n        \"best_threshold\": best_threshold,\n        \"best_gain\": float(best_gain)\n    }"
        },
        "hints": {
          "tier1": {
            "en": "For discrete labels, Gini impurity is 1 - sum(p_k^2).",
            "ar": "للتصنيفات المتقطعة، لايقين جيني هو 1 - sum(p_k^2)."
          },
          "tier2": {
            "en": "Candidate split thresholds are the midpoints between sorted unique values of each feature.",
            "ar": "عتبات التفرع المرشحة هي نقاط المنتصف بين القيم الفريدة المرتبة لكل متغير."
          },
          "tier3": {
            "en": "Gain is parent_gini - (N_left/N * gini_left + N_right/N * gini_right). Return the split with maximum gain.",
            "ar": "المكسب هو parent_gini - (N_left/N * gini_left + N_right/N * gini_right). أعد التفرع ذي المكسب الأقصى."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "Which combination of algorithmic interventions will most effectively restrain this explosive variance and restore out-of-sample generalization?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ أشجار القرار (CART) ومقاييس اللايقين والتقليم بتكلفة التعقيد تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Enforce structural pre-pruning constraints—such as capping `max_depth` (e.g., 5 to 7) and raising `min_samples_leaf` (e.g., $\\ge 50$)—and apply post-pruning via minimal cost-complexity parameter `ccp_alpha` tuned via cross-validation to snip off fragile leaves that lack statistical support.",
                "ar": "فرض قيود تقليم مسبقة على هيكل الشجرة—مثل تحديد أقصى عمق `max_depth` (بين 5 و 7) ورفع الحد الأدنى لعينات الورقة `min_samples_leaf` إلى 50 فأكثر—مع تطبيق التقليم البعدي عبر ضبط معامل التكلفة والتعقيد `ccp_alpha` بالتحقق المتقاطع لقص الأوراق الهشة التي تفتقر للموثوقية الإحصائية."
              },
              "correct": true,
              "explanation": {
                "en": "Unconstrained decision trees have immense capacity ($\\text{df} \\approx |\\tilde{\\mathcal{T}}|$), allowing them to memorize random noise in 1-sample leaves. Restricting depth, setting minimum leaf populations, and pruning via cost-complexity $\\alpha |\\tilde{\\mathcal{T}}|$ directly curb model variance and enforce robust generalizability.",
                "ar": "تتمتع أشجار القرار غير المقيدة بقدرة استيعابية هائلة تجعلها تحفظ الضجيج العشوائي في أوراق أحادية العينة. ويؤدي وضع حد أقصى للعمق واشتراط حد أدنى لعينات الأوراق وتقليم التكلفة والتعقيد إلى كبح التباين واستعادة قدرة النموذج على التعميم."
              }
            },
            {
              "text": {
                "en": "Switch the splitting criterion from Gini Impurity to Shannon Cross-Entropy, because logarithmic functions mathematically eliminate model variance.",
                "ar": "تغيير معيار التقسيم من لايقين جيني إلى إنتروبيا شانون لأن الدوال اللوغاريتمية تلغي تباين النموذج رياضياً."
              },
              "correct": false,
              "explanation": {
                "en": "Gini and Entropy are numerically near-identical across almost all real splits; changing the metric does not prevent an unconstrained tree from memorizing individual samples.",
                "ar": "مقياسا جيني والإنتروبيا متقاربان عددياً بنسبة تزيد عن 98% في كافة التفرعات الحقيقية؛ ولن يمنع تغيير المقياس الشجرة غير المقيدة من حفظ البيانات والتفرع المفرط."
              }
            },
            {
              "text": {
                "en": "Expand the feature space by generating all pairwise polynomial interaction products $X_j \\cdot X_k$.",
                "ar": "مضاعفة فضاء المتغيرات عبر توليد حدود تفاعلية كثيرة الحدود بين كافة المتغيرات."
              },
              "correct": false,
              "explanation": {
                "en": "Decision trees natively capture interactions through nested hierarchical splitting; adding collinear polynomial features drastically worsens overfitting and bloats search time.",
                "ar": "تلتقط أشجار القرار التفاعلات المعقدة تلقائياً عبر التفرع الهرمي المتسلسل؛ وإضافة متغيرات تفاعلية يضاعف مشكلة فرط التخصيص ويزيد العبء الحسابي."
              }
            },
            {
              "text": {
                "en": "Standardize all continuous features using z-score normalization ($\\frac{x - \\mu}{\\sigma}$).",
                "ar": "معايرة كافة المتغيرات المستمرة بتحويلها إلى قيم معيارية z-score."
              },
              "correct": false,
              "explanation": {
                "en": "CART splits depend strictly on the rank order of feature values. Any monotonic transformation (such as linear standardization) leaves the relative ordering and resulting split thresholds unchanged.",
                "ar": "تعتمد أشجار القرار على الترتيب الفئوي للقيم؛ وأي تحويل رتيب خطي كالمعايرة يحافظ على الترتيب النسبي ولا يغير قرارات التقسيم نهائياً."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "random-forests-bagging",
    "title": "Random Forests, Bagging & Feature Subspace Sampling",
    "titleAr": "الغابات العشوائية وتقنية التجميع وتعيين الفضاء الجزئي للمتغيرات",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "While a single decision tree is transparent and easy to explain, it suffers from a fatal structural flaw: extreme statistical variance.",
      "ar": "تتميز شجرة القرار الفردية بالوضوح وسهولة التفسير، لكنها تعاني من نقطة ضعف هيكلية قاتلة: التباين الإحصائي المفرط (High Variance)."
    },
    "prerequisites": [
      "decision-trees",
      "central-limit-theorem"
    ],
    "x": 805,
    "y": 2835,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DecisionTreeLaser",
        "narrative": {
          "en": "While a single decision tree is transparent and easy to explain, it suffers from a fatal structural flaw: **extreme statistical variance**.\nA tiny tremor in your training data—such as changing just two or three numbers out of ten thousand—can cause the root split to flip to an entirely different feature. This initial pivot cascades down every subsequent branch, altering the architecture of the entire tree and producing wildly contradictory predictions for the exact same patient.\n\nRelying on a single unpruned decision tree for critical medical or financial decisions is like putting your life in the hands of an eccentric, hyper-sensitive doctor who overreacts to every fleeting sneeze and rushes to perform emergency surgery!\n\nIn 2001, Leo Breiman transformed machine learning by creating the **Random Forest**.\nInstead of trusting a single volatile practitioner, you convene a **jury of 500 independent, highly qualified doctors who cast a democratic majority vote on the diagnosis**.\nIf one doctor is misled by an odd symptom in their specific notes, their individual mistake is effortlessly outvoted and neutralized by the collective wisdom of the remaining 499 physicians!\n\nTo make this committee work, the doctors must not read the exact same medical chart or copy each other's homework. Random Forests enforce independence through two clever layers of randomization:\n1. **Bagging (Bootstrap Aggregating):** Each tree is trained on its own independent resampled dataset, created by drawing $N$ samples *with replacement* from the training pool.\n2. **Random Feature Subspace Sampling:** This was Breiman's stroke of genius. If one dominant symptom (like a huge tumor diameter) is overwhelmingly predictive, every single tree in the forest would greedily pick it for the root split. The resulting trees would become clones of each other, sharing massive positive correlation!\nBy forcing each node to choose its split from a randomly selected subset of only $m \\approx \\sqrt{p}$ candidate features, Random Forests break this herd behavior. Trees are forced to discover subtle secondary and tertiary signals, yielding deeply **decorrelated** models.\n\nThe mathematics of decorrelation is miraculous: averaging $B$ independent, uncorrelated estimates shrinks variance toward zero at a rate of $1/B$. But if the trees share a positive correlation $\\rho$, the variance hits an irreducible brick wall: $\\lim_{B \\to \\infty} \\text{Var} = \\rho \\sigma^2$. By crushing $\\rho$ toward zero via feature subsampling, Random Forests obliterate this variance wall, transforming noisy decision trees into an elite predictive powerhouse.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **High Variance** | The hyper-sensitive expert: tiny changes in data completely alter the model's structure. |\n| **Ensemble** | The committee of minds: combining multiple diverse models to make superior joint decisions. |\n| **Bagging** | Bootstrap Aggregating: training models on random resamples drawn with replacement. |\n| **Feature Subsampling** | Anti-herd rule: forcing each tree to look at a random subset of features to break correlation. |\n| **Out-of-Bag (OOB)** | Free validation: the ~37% of data left out of each bootstrap sample, used for built-in testing. |\n\n```text\n    THE BREIMAN VARIANCE ATTENUATION:\n\nEnsemble Variance\n         ^\n  sigma^2|   * Single Tree (Unstable & High Variance)\n         |\n         |         Uncorrelated Trees (rho = 0): Var -> 0!\n         |         . . . . . . . . . . . . . . . . . . . . . . .\n         |\nrho*sig^2|-----------------------------------* Correlated Forest (rho > 0)\n         |                                     (Hits irreducible floor rho*sigma^2)\n         |\n       0 +----------------------------------------------------> Number of Trees B\n```",
          "ar": "تتميز شجرة القرار الفردية بالوضوح وسهولة التفسير، لكنها تعاني من نقطة ضعف هيكلية قاتلة: **التباين الإحصائي المفرط (High Variance)**.\nفأي تغير طفيف في بيانات التدريب—كتعديل قيمتين أو ثلاث من بين عشرة آلاف عينة—قد يقلب التفرع الجذري للشجرة بالكامل. هذا التغير الأولي يتدحرج ككرة ثلج عبر كافة التفرعات اللاحقة، مما يغير هندسة الشجرة بأكملها ويؤدي إلى تنبؤات متضاربة للحالة نفسها.\n\nإن الاعتماد على شجرة قرار فردية في قرارات طبية أو مالية حاسمة يشبه وضع مصيرك بين يدي طبيب مفرط الحساسية، يبالغ في رد فعله تجاه كل عَرَض عابر ويسارع لاتخاذ قرارات جراحية متسرعة!\n\nفي عام 2001، أحدث ليو بريمان ثورة تاريخية عندما ابتكر **الغابات العشوائية (Random Forests)**.\nفبدلاً من الاعتماد على طبيب واحد متقلب المزاج، تجمع الخوارزمية **مجلساً يضم 500 طبيب مستقل يصوتون ديمقراطياً بالأغلبية على التشخيص النهائي**.\nفإذا انخدع أحد الأطباء بشائبة عشوائية في ملف مريضه، فإن خطأه الفردي يتلاشى وسط الحكمة التراكمية لبقية الأطباء الـ 499!\n\nولضمان نجاح هذا المجلس، يجب التأكد من أن الأطباء لا يقرؤون نفس التقرير الطبي حرفياً. تحقق الغابات العشوائية هذا الاستقلال عبر مستويين من العشوائية:\n1. **التجميع بالعينات التمهيدية (Bagging):** تُبنى كل شجرة على عينة بيانات مستقلة يتم سحبها مع الإرجاع (Bootstrap Sample) من عينة التدريب الأصلية.\n2. **التعيين العشوائي للفضاء الجزئي للمتغيرات (Feature Subsampling):** هذا هو الابتكار الأبرز لبريمان؛ فإذا كان هناك متغير واحد مهيمن وفائق القوة التنبؤية (مثل حجم الورم)، فستختاره كافة الأشجار الـ 500 في جذرها تلقائياً، لتصبح نسخاً مكررة شديدة الارتباط. ولتفادي ذلك، تُجبر الخوارزمية كل عقدة على الاختيار من بين عينة عشوائية محدودة تضم $m \\approx \\sqrt{p}$ من المتغيرات فقط. يجبر هذا القيد الأشجار على استكشاف أبعاد خفية، مما يكسر الارتباط بين الأشجار ويجعلها مستقلة حقاً.\n\nتستند هذه الحصانة إلى قانون الاحتمالات: فحينما تحسب متوسط $B$ من المتغيرات المستقلة، يتلاشى تباينها بمعدل $1/B$. ولكن إذا كانت النماذج مرتبطة فيما بينها بمعامل ارتباط $\\rho$، فإن التباين يتوقف عند حاجز أصم: $\\rho \\sigma^2$. وبفضل تقليص هذا الارتباط $\\rho$ نحو الصفر، تسحق الغابات العشوائية هذا الحاجز، محولة مجموعة من الأشجار الضعيفة إلى منظومة تنبؤية خارقة وشديدة الاستقرار.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **التباين المفرط** | الحساسية المفرطة: أي تعديل طفيف بالبيانات يقلب بنية النموذج وتنبؤاته رأساً على عقب. |\n| **النماذج التجميعية (Ensemble)** | مجلس الحكماء: دمج قرارات عدة نماذج متنوعة للوصول إلى قرار جماعي متفوق. |\n| **التجميع بالعينات (Bagging)** | السحب مع الإرجاع: تدريب نماذج مستقلة على عينات بيانات عشوائية معاد سحبها. |\n| **تعيين الفضاء الجزئي للمتغيرات** | منع سلوك القطيع: إجبار كل شجرة على فحص عينة عشوائية من المتغيرات لكسر الارتباط. |\n| **بيانات خارج الصندوق (OOB)** | التحقق المجاني: نحو 37% من البيانات تُستبعد من كل عينة سحب، وتُستخدم للتقييم التلقائي. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\bar{T}(\\mathbf{x}) = \\frac{1}{B} \\sum_{b=1}^B T_b(\\mathbf{x})",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Random Forests, Bagging & Feature Subspace Sampling.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الغابات العشوائية وتقنية التجميع وتعيين الفضاء الجزئي للمتغيرات."
        },
        "narrative": {
          "en": "### The Breiman Ensemble Variance Decomposition\nAssume each individual unpruned tree has identical marginal variance $\\text{Var}(T_b(\\mathbf{x})) = \\sigma^2$, and any pair of distinct trees shares a positive pairwise Pearson correlation:\n\n$$\n\\rho = \\text{Corr}\\left(T_b(\\mathbf{x}), T_{b'}(\\mathbf{x})\\right) = \\frac{\\text{Cov}(T_b(\\mathbf{x}), T_{b'}(\\mathbf{x}))}{\\sigma^2}, \\quad \\text{for } b \\ne b'\n$$\n\nEvaluating the variance of the ensemble mean prediction:\n\n$$\n\\begin{aligned}\n\\text{Var}(\\bar{T}(\\mathbf{x})) &= \\text{Var}\\left( \\frac{1}{B} \\sum_{b=1}^B T_b(\\mathbf{x}) \\right) = \\frac{1}{B^2} \\sum_{b=1}^B \\text{Var}(T_b(\\mathbf{x})) + \\frac{1}{B^2} \\sum_{b=1}^B \\sum_{b' \\ne b}^B \\text{Cov}(T_b(\\mathbf{x}), T_{b'}(\\mathbf{x})) \\\\\n&= \\frac{1}{B^2} (B \\sigma^2) + \\frac{1}{B^2} B(B - 1) \\rho \\sigma^2 \\\\\n&= \\frac{\\sigma^2}{B} + \\frac{B - 1}{B} \\rho \\sigma^2 = \\rho \\sigma^2 + \\frac{1 - \\rho}{B} \\sigma^2\n\\end{aligned}\n$$\n\nTaking the asymptotic limit as tree count $B \\to \\infty$:\n\n$$\n\\lim_{B \\to \\infty} \\text{Var}(\\bar{T}(\\mathbf{x})) = \\rho \\sigma^2\n$$\n\nThis equation mathematically exposes the core principle of Random Forests:\n- Increasing ensemble size $B$ drives the second term $\\frac{1 - \\rho}{B}\\sigma^2$ to zero.\n- However, the ensemble variance is strictly lower-bounded by $\\rho \\sigma^2$. The only way to lower this asymptotic floor is to **reduce $\\rho$** via random feature subspace sampling!\n\nImplement Breiman's theoretical ensemble variance decomposition formula in Python. You will:\n1. Parse the tree ensemble hyperparameters ($B$, $\\sigma^2$, and $\\rho$).\n2. Evaluate the independent variance attenuation term: $\\frac{1 - \\rho}{B}\\sigma^2$.\n3. Evaluate the asymptotic correlation floor term: $\\rho \\sigma^2$.\n4. Sum both components to return the exact theoretical ensemble prediction variance.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $B$ | Ensemble tree count | Total number of individual decision trees | إجمالي عدد الأشجار المستقلة في الغابة |\n| $T_b(\\mathbf{x})$ | Individual tree model | Base predictor trained on bootstrap sample $b$ | شجرة القرار الأساسية المدربة على العينة $b$ |\n| $\\bar{T}(\\mathbf{x})$ | Ensemble prediction | Consensus aggregate prediction across trees | التنبؤ التجميعي المتوسط لجميع الأشجار |\n| $\\sigma^2$ | Base tree variance | Variance of an individual unpruned decision tree | التباين الإحصائي للشجرة الفردية الواحدة |\n| $\\rho$ | Pairwise correlation | Pearson correlation between distinct trees | معامل الارتباط البيني بين أي شجرتين |\n| $\\rho \\sigma^2$ | Asymptotic variance floor | Irreducible variance limit as $B \\to \\infty$ | الحاجز الأدنى للتباين التجميعي مع زيادة $B$ |\n| $m \\approx \\sqrt{P}$ | Feature subsample size | Number of candidate features tested at each node | عدد الميزات الفرعية المختارة عشوائياً عند كل تفرع |\n| $\\mathcal{B}_b$ | Bootstrap sample | Resample of size $N$ drawn with replacement | عينة التدريب التمهيدية المسحوبة مع الإرجاع |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-random-forests-bagging",
          "starterCode": "def simulate_bagging_variance(\n    n_estimators: int,\n    base_variance: float,\n    correlation: float\n) -> float:\n    \"\"\"\n    Computes theoretical ensemble prediction variance according to Breiman's formula:\n    Var(ensemble) = rho * sigma^2 + ((1 - rho) / B) * sigma^2\n    \n    Parameters\n    ----------\n    n_estimators : int\n        Number of trees in ensemble (B).\n    base_variance : float\n        Variance of an individual unpruned tree (sigma^2).\n    correlation : float\n        Pairwise correlation between tree predictions (rho in [0, 1]).\n        \n    Returns\n    -------\n    float\n        Ensemble prediction variance.\n    \"\"\"\n    # Step 1: Cast inputs to float primitives\n    # Step 2: Compute Breiman's variance decomposition terms\n    # Step 3: Combine both terms\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "v = simulate_bagging_variance(n_estimators=100, base_variance=1.0, correlation=0.2); f\"{v:.3f}\"",
              "expected": "0.208"
            },
            {
              "input": "v = simulate_bagging_variance(n_estimators=1000, base_variance=1.0, correlation=0.0); f\"{v:.3f}\"",
              "expected": "0.001"
            }
          ],
          "expectedOutput": "0.208",
          "variants": {
            "python": {
              "starterCode": "def simulate_bagging_variance(\n    n_estimators: int,\n    base_variance: float,\n    correlation: float\n) -> float:\n    \"\"\"\n    Computes theoretical ensemble prediction variance according to Breiman's formula:\n    Var(ensemble) = rho * sigma^2 + ((1 - rho) / B) * sigma^2\n    \n    Parameters\n    ----------\n    n_estimators : int\n        Number of trees in ensemble (B).\n    base_variance : float\n        Variance of an individual unpruned tree (sigma^2).\n    correlation : float\n        Pairwise correlation between tree predictions (rho in [0, 1]).\n        \n    Returns\n    -------\n    float\n        Ensemble prediction variance.\n    \"\"\"\n    # Step 1: Cast inputs to float primitives\n    # Step 2: Compute Breiman's variance decomposition terms\n    # Step 3: Combine both terms\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.208"
            }
          },
          "solution": "import numpy as np\n\ndef simulate_bagging_variance(\n    n_estimators: int,\n    base_variance: float,\n    correlation: float\n) -> float:\n    \"\"\"\n    Computes theoretical ensemble prediction variance according to Breiman's formula:\n    Var(ensemble) = rho * sigma^2 + ((1 - rho) / B) * sigma^2\n    \n    Parameters\n    ----------\n    n_estimators : int\n        Number of trees in ensemble (B).\n    base_variance : float\n        Variance of an individual unpruned tree (sigma^2).\n    correlation : float\n        Pairwise correlation between tree predictions (rho in [0, 1]).\n        \n    Returns\n    -------\n    float\n        Ensemble prediction variance.\n    \"\"\"\n    # Step 1: Cast inputs to float primitives\n    B = float(n_estimators)\n    rho = float(correlation)\n    sig2 = float(base_variance)\n    \n    # Step 2: Compute Breiman's variance decomposition terms\n    correlation_floor = rho * sig2\n    decaying_variance = ((1.0 - rho) / B) * sig2\n    \n    # Step 3: Combine both terms\n    ens_variance = correlation_floor + decaying_variance\n    return float(ens_variance)"
        },
        "hints": {
          "tier1": {
            "en": "Breiman's theoretical ensemble variance formula is Var = rho * sigma^2 + ((1 - rho) / B) * sigma^2.",
            "ar": "معادلة بريمان النظرية لتباين التجميع هي Var = rho * sigma^2 + ((1 - rho) / B) * sigma^2."
          },
          "tier2": {
            "en": "As B grows large, the second term vanishes, leaving the irreducible floor rho * sigma^2.",
            "ar": "مع كبر B، يتلاشى الحد الثاني ليتبقى الحد الثابت غير القابل للاختزال rho * sigma^2."
          },
          "tier3": {
            "en": "Feature subspace sampling (m = sqrt(p)) slashes the correlation rho between trees.",
            "ar": "يؤدي الاختيار العشوائي للمتغيرات (m = sqrt(p)) إلى خفض الارتباط rho بين الأشجار."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "How should the machine learning engineer respond based on the mathematical principles of Random Forests?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الغابات العشوائية وتقنية التجميع وتعيين الفضاء الجزئي للمتغيرات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The architect's concern is mathematically unfounded: Random Forests cannot overfit merely by increasing the number of trees $B$. By the Strong Law of Large Numbers, as $B \\to \\infty$, the ensemble predictions converge almost surely to an asymptotic limit ($\\rho \\sigma^2$). Adding trees strictly reduces variance without inflating model capacity or bias; the only penalty is linear computational cost and memory footprint.",
                "ar": "مخاوف مهندس النظم غير مبررة رياضياً؛ فالغابات العشوائية يستحيل أن تقع في فرط التخصيص بمجرد زيادة عدد الأشجار $B$. فوفقاً للقانون القوي للأعداد الكبيرة، مع اقتراب $B \\to \\infty$ تتقارب تنبؤات الغابة حتمياً نحو حد ثابت ($\\rho \\sigma^2$). تؤدي إضافة الأشجار إلى تقليص التباين حصراً دون زيادة انحياز النموذج أو تعقيده؛ والضريبة الوحيدة هي زيادة الوقت الحسابي واستهلاك الذاكرة."
              },
              "correct": true,
              "explanation": {
                "en": "Breiman proved that Random Forests do not overfit as more trees are added. The generalization error converges to a fixed limiting value bounded by the correlation between trees and the strength of individual trees.",
                "ar": "أثبت بريمان رياضياً أن الغابات العشوائية لا تفرط في التخصيص مع زيادة عدد الأشجار؛ بل يتقارب خطأ التعميم نحو قيمة ثابتة محكومة بدرجة الارتباط وقوة الأشجار، مما يجعل زيادة الأشجار مفيدة دوماً للاستقرار."
              }
            },
            {
              "text": {
                "en": "The architect's concern is fully justified because each additional tree introduces new splitting parameters, which inflates the Akaike Information Criterion (AIC) beyond repair.",
                "ar": "مخاوف المهندس صحيحة تماماً لأن كل شجرة تضيف معاملات تقسيم جديدة ترفع معيار أكايكي للمعلومات (AIC) إلى مستويات كارثية."
              },
              "correct": false,
              "explanation": {
                "en": "AIC applies to parametric likelihood models; ensemble averaging does not increase structural model capacity in the manner of single parametric functions.",
                "ar": "ينطبق معيار AIC على النماذج المعلمية ذات دالة الأرجحية، بينما التجميع بالمتوسط يقلص التباين ولا يضاعف التعقيد الهيكلي للنموذج."
              }
            },
            {
              "text": {
                "en": "Increasing tree count causes the finite bootstrap sample to exhaust all available random permutations, causing the training loop to crash from duplicate index collision.",
                "ar": "تؤدي زيادة عدد الأشجار إلى نفاد التباديل العشوائية المتاحة في عينة السحب، مما يؤدي إلى انهيار حلقة التدريب بسبب تصادم المؤشرات."
              },
              "correct": false,
              "explanation": {
                "en": "A dataset of size $N$ allows $N^N$ unique bootstrap samples; for $N \\ge 100$, this number exceeds the number of atoms in the observable universe.",
                "ar": "يتيح سحب العينات بالترجيع عدداً فلكياً من الاحتمالات $N^N$ يتجاوز عدد ذرات الكون المنظور، ويستحيل نفاده برمجياً."
              }
            },
            {
              "text": {
                "en": "Overfitting in Random Forests is strictly determined by whether the random seed is chosen as an even or odd integer.",
                "ar": "يتحدد فرط التخصيص في الغابات العشوائية حصرياً بما إذا كانت بذرة العشوائية (Random Seed) عدداً زوجياً أو فردياً."
              },
              "correct": false,
              "explanation": {
                "en": "The random seed merely initializes the pseudo-random generator; it has no mathematical relationship with generalization or model capacity.",
                "ar": "البذرة العشوائية مجرد قيمة أولية لمولد الأرقام الزائفة وليس لها أي تأثير رياضي على سعة النموذج الإحصائية."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "gradient-boosted-trees-xgboost",
    "title": "Gradient Boosted Decision Trees & XGBoost 2nd-Order Expansion",
    "titleAr": "أشجار التدرج المعززة والتقريب من الرتبة الثانية في XGBoost",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In the previous lesson, Random Forests achieved stability through mass democracy: an ensemble of 500 deep, independent trees voting...",
      "ar": "في الدرس السابق، رأينا كيف حققت الغابات العشوائية استقرارها عبر ديمقراطية جماعية تعتمد على تصويت 500 شجرة بالتوازي."
    },
    "prerequisites": [
      "random-forests-bagging",
      "taylor-series-polynomial"
    ],
    "x": 825,
    "y": 2930,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DecisionTreeLaser",
        "narrative": {
          "en": "In the previous lesson, Random Forests achieved stability through mass democracy: an ensemble of 500 deep, independent trees voting simultaneously in parallel.\n**Gradient Boosted Decision Trees (GBDT)** reject parallel voting completely. Instead, they follow a philosophy of **disciplined sequential craftsmanship**.\n\nInstead of training a whole crowd of models at once, boosting trains trees **one by one in a chain**. Every single new tree is manufactured to hunt down, repair, and correct the mistakes left behind by all previous trees!\n\nImagine an Olympic archer training with a legendary master coach:\n- On **Shot 1**, the archer releases an arrow: it strikes the target 30 inches too high and 10 inches to the right of the bullseye.\n- A novice coach might say: *\"Forget that shot, pull another arrow and try again from scratch.\"*\n- But the master coach commands: *\"Hold your stance! Do not start over. We are going to isolate your error. Your next shot will be a micro-correction: aim precisely 30 inches lower and 10 inches left!\"*\n\nThe archer fires Shot 2, leaving an error of only 2 inches. The third shot is a delicate millimeter adjustment.\nEach shot does not wipe the slate clean; it targets the **residual gap** left by all previous attempts!\n\nJerome Friedman (2001) formalized this intuition as **Gradient Descent in Function Space**.\nIn neural networks, gradient descent shifts weight vectors $\\mathbf{w}$ down the slope of loss. In boosting, we take steps in the infinite space of mathematical functions! Each new tree (a shallow \"weak learner\" restricted to just 3 to 6 splits) is fitted directly to the negative gradient of the loss function—a set of customized **pseudo-residuals** pointing toward the cases where the ensemble is currently failing.\n\nIn 2016, Tianqi Chen and Carlos Guestrin sparked a machine learning revolution with **XGBoost (Extreme Gradient Boosting)**.\nFriedman's original boosting used 1st-order linear slopes (gradients). XGBoost added a **2nd-order Taylor series expansion**, calculating both the slope ($g_i$, first derivative) and the curvature ($h_i$, second derivative or Hessian).\nKnowing both slope and curvature allows XGBoost to evaluate not just which direction to step, but the exact optimal step size in a single closed-form calculation!\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Boosting** | The correction chain: training trees sequentially, where each fixes the errors of the last. |\n| **Weak Learner** | The modest apprentice: a shallow tree (depth 3-6) that is slightly better than random guessing. |\n| **Pseudo-Residuals** | The mistake compass: the negative gradient of loss showing where predictions fell short. |\n| **Gradient ($g_i$)** | The directional slope: indicates whether the model underpredicted or overpredicted. |\n| **Hessian ($h_i$)** | The curvature: indicates confidence and curvature of the loss surface for exact step sizing. |\n| **XGBoost Gain** | The profit equation: closed-form metric measuring loss reduction before making a split. |\n\n```text\n    THE BOOSTING SEQUENTIAL CORRECTION CHAIN:\n\nTarget y\n       ^\n       |    Tree 1 (Rough Draft)       Tree 2 (Fixes Resid 1)      Tree 3 (Fine Polish)\n       |          .---.                       .---.                       .---.\n       |         /     \\                     /     \\                     /     \\\n       +--------+-------+-------------------+-------+-------------------+-------+--->\n                Residual 1 = y - f_1        Residual 2 = r_1 - f_2      Final Ensemble\n                (Large Mistakes)            (Minor Deficits)            (Bullseye Accuracy!)\n```",
          "ar": "في الدرس السابق، رأينا كيف حققت الغابات العشوائية استقرارها عبر ديمقراطية جماعية تعتمد على تصويت 500 شجرة بالتوازي.\nعلى النقيض من ذلك تماماً، تتخلى **أشجار التدرج المعززة (Gradient Boosted Trees - GBDT)** عن التصويت المتوازي لتتبنى فلسفة **التعلم التتابعي التراكمي وتصحيح الأخطاء خطوة بخطوة**.\n\nفبدلاً من بناء جيش من النماذج دفعة واحدة، تبني خوارزمية التعزيز الأشجار **شجرة تلو الأخرى في سلسلة متتابعة**؛ بحيث تُصمم كل شجرة جديدة خصيصاً لملاحقة وإصلاح الأخطاء والبواقي التي عجزت الأشجار السابقة عن حلها!\n\nتخيل رامي سهام يتدرب للأولمبياد تحت إشراف مدرب محترف:\n- في **الرمية الأولى**، يطلق الرامي سهمه فيصيب لوحة الهدف بعيداً عن المركز بمقدار 30 سم للأعلى و 10 سم لليمين.\n- المدرب المبتدئ قد يقول: *\"انسَ ما حدث، اسحب سهماً جديداً وابدأ من الصفر\"*.\n- لكن المدرب الخبير يوجهه: *\"اثبت في مكانك! لا تعد للصفر. سنعالج الخطأ تحديداً: اجعل رميتك التالية تصحيحاً حركياً دقيقاً يستهدف التحرك 30 سم للأسفل و 10 سم لليسار!\"*.\n\nيطلق الرامي السهم الثاني، فيتقلص الخطأ إلى 2 سم فقط، لتأتي الرمية الثالثة بلمسة مجهرية تضع السهم في قلب الهدف. لا تلغي كل خطوة سابقتها، بل تبني فوقها وتصقل بواقيها بدقة متناهية!\n\nصاغ جيروم فريدمان (2001) هذا الحدس الرياضي عبر مفهوم: **الهبوط التدرجي في فضاء الدوال (Gradient Descent in Function Space)**.\nففي الشبكات العصبية، نحدث أوزان المعاملات على طول ميل الخطأ. أما في أشجار التدرج المعززة، فإننا نتحرك في فضاء الدوال ذاته؛ حيث تُدرب كل شجرة جديدة بسيطة (تُسمى متعلماً ضعيفاً، بعمق 3 إلى 6 تفرعات فقط) لتتنبأ بالتدرج السالب لدالة الخسارة—وهي مجموعة \"بواقي تقريبية\" تكشف للشجرة بدقة أين أخطأ النموذج التراكمي.\n\nوفي عام 2016، أحدث نظام **XGBoost** ثورة كبرى بنقل التعزيز إلى طريقة نيوتن عبر **تقريب تايلور من الدرجة الثانية**؛ حيث يدمج بين ميل الخطأ ($g_i$ - المشتقة الأولى) وانحناء دالة الخسارة ($h_i$ - المشتقة الثانية أو الهيسيان). تتيح معرفة الميل والانحناء معاً تحديد المسار الأمثل وحجم الخطوة المطلوبة بدقة مطلقة وفي خطوة حسابية مغلقة وفائقة السرعة!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **التعزيز (Boosting)** | سلسلة التصحيح: بناء الأشجار تتابعياً لتقوم كل شجرة بإصلاح أخطاء سابقتها. |\n| **المتعلم الضعيف** | المتدرب المبتدئ: شجرة ضحلة وبسيطة (عمق 3-6) تفوق التخمين العشوائي بقليل. |\n| **البواقي التقريبية** | بوصلة الأخطاء: التدرج السالب لدالة الخسارة الذي يوضح أين قصر النموذج. |\n| **التدرج ($g_i$)** | ميل الخطأ: يبين هل بالغ النموذج في التقدير أم كان أقل من الحقيقة. |\n| **الهيسيان ($h_i$)** | انحناء الخسارة: يحدد درجة انحناء سطح الخطأ لتحديد الحجم الأمثل للخطوة. |\n| **مكسب XGBoost** | معادلة الربح: معادلة جبرية صريحة تقيس مقدار تقليص الخطأ قبل إجراء أي تقسيم. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{L}^{(t)} = \\sum_{i=1}^N \\ell\\left(y_i, \\hat{y}_i^{(t-1)} + f_t(\\mathbf{x}_i)\\right) + \\Omega(f_t)",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Gradient Boosted Decision Trees & XGBoost 2nd-Order Expansion.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ أشجار التدرج المعززة والتقريب من الرتبة الثانية في XGBoost."
        },
        "narrative": {
          "en": "The tree structural regularization term $\\Omega(f_t)$ penalizes leaf count $T$ and the $L_2$ norm of leaf weights $\\mathbf{w}$:\n\n$$\n\\Omega(f_t) = \\gamma T + \\frac{1}{2}\\lambda \\sum_{j=1}^T w_j^2 = \\gamma T + \\frac{1}{2}\\lambda \\|\\mathbf{w}\\|_2^2\n$$\n\n### The 2nd-Order Taylor Series Expansion\nExpanding the differentiable loss function $\\ell(y_i, \\hat{y})$ in a quadratic Taylor series around the previous state $\\hat{y}_i^{(t-1)}$:\n\n$$\n\\ell\\left(y_i, \\hat{y}_i^{(t-1)} + f_t(\\mathbf{x}_i)\\right) \\approx \\ell\\left(y_i, \\hat{y}_i^{(t-1)}\\right) + g_i f_t(\\mathbf{x}_i) + \\frac{1}{2} h_i f_t^2(\\mathbf{x}_i)\n$$\n\nwhere the instance-level gradient and Hessian scalars are:\n\n$$\ng_i = \\left[ \\frac{\\partial \\ell(y_i, \\hat{y})}{\\partial \\hat{y}} \\right]_{\\hat{y} = \\hat{y}_i^{(t-1)}}, \\quad h_i = \\left[ \\frac{\\partial^2 \\ell(y_i, \\hat{y})}{\\partial \\hat{y}^2} \\right]_{\\hat{y} = \\hat{y}_i^{(t-1)}}\n$$\n\n### Optimal Leaf Weight & Split Gain\nRemoving constants independent of $f_t$, the simplified objective for leaf $j$ with instance set $I_j = \\{i : q(\\mathbf{x}_i) = j\\}$ collapses into:\n\n$$\n\\tilde{\\mathcal{L}}^{(t)} = \\sum_{j=1}^T \\left[ \\left(\\sum_{i \\in I_j} g_i\\right) w_j + \\frac{1}{2}\\left(\\sum_{i \\in I_j} h_i + \\lambda\\right) w_j^2 \\right] + \\gamma T\n$$\n\nLetting $G_j = \\sum_{i \\in I_j} g_i$ and $H_j = \\sum_{i \\in I_j} h_i$, the optimal leaf weight $w_j^*$ is obtained by setting the derivative to zero:\n\n$$\nw_j^* = -\\frac{G_j}{H_j + \\lambda}\n$$\n\nSubstituting $w_j^*$ back yields the optimal objective value for a given tree structure:\n\n$$\n\\tilde{\\mathcal{L}}^*(q) = -\\frac{1}{2} \\sum_{j=1}^T \\frac{G_j^2}{H_j + \\lambda} + \\gamma T\n$$\n\nFor a candidate split dividing leaf $j$ into left ($L$) and right ($R$) subsets, the **XGBoost Split Gain** is evaluated in closed form:\n\n$$\n\\text{Gain} = \\frac{1}{2} \\left[ \\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{G_{\\text{total}}^2}{H_{\\text{total}} + \\lambda} \\right] - \\gamma\n$$\n\nImplement the XGBoost second-order split gain and optimal child weight evaluation in NumPy. You will:\n1. Partition 1st-order gradients $g$ and 2nd-order Hessians $h$ into left and right child subsets at candidate `split_idx`.\n2. Compute the cumulative sums $G_L, H_L, G_R, H_R$ and total parent sums $G_{\\text{total}}, H_{\\text{total}}$.\n3. Evaluate the optimal leaf weights $w_L^* = -\\frac{G_L}{H_L + \\lambda}$ and $w_R^* = -\\frac{G_R}{H_R + \\lambda}$.\n4. Compute the 2nd-order split gain: $\\text{Gain} = \\frac{1}{2}\\left[\\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{G_{\\text{total}}^2}{H_{\\text{total}} + \\lambda}\\right] - \\gamma$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $f_t(\\mathbf{x})$ | Round $t$ weak learner | Additive correction tree learned at iteration $t$ | شجرة التصحيح المضافة في الجولة $t$ |\n| $\\hat{y}_i^{(t-1)}$ | Cumulative prediction | Ensemble prediction for instance $i$ prior to round $t$ | التنبؤ التراكمي السابق للعينة $i$ |\n| $g_i \\in \\mathbb{R}$ | First derivative of loss | Gradient showing directional prediction error | المشتقة الأولى (التدرج) وميل الخطأ |\n| $h_i \\in \\mathbb{R}^+$ | Second derivative of loss | Hessian curvature quantifying loss landscape | المشتقة الثانية (الهيسيان) وانحناء الخطأ |\n| $G_j, H_j$ | $\\sum_{i \\in I_j} g_i, \\sum_{i \\in I_j} h_i$ | Summed gradients and Hessians inside leaf $j$ | مجموع التدرجات والهيسيان لعينات الورقة $j$ |\n| $w_j^*$ | $-\\frac{G_j}{H_j + \\lambda}$ | Optimal closed-form output score of leaf $j$ | الوزن التنبؤي الأمثل للورقة $j$ بصيغة مغلقة |\n| $\\lambda \\ge 0$ | $L_2$ leaf penalty | Regularization dampening extreme leaf weights | جزاء L2 لمنع تضخم أوزان الأوراق |\n| $\\gamma \\ge 0$ | Tree complexity penalty | Minimum gain required to allow an additional split | الحد الأدنى للربح المالي للسماح بالتفرع |\n| $\\text{Gain}$ | Split objective improvement | Analytic formula measuring error drop from a split | مكسب التفرع وصافي تقليص دالة الخسارة |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gradient-boosted-trees-xgboost",
          "starterCode": "def compute_xgboost_split_gain(\n    g: np.ndarray,\n    h: np.ndarray,\n    split_idx: int,\n    lmbda: float = 1.0,\n    gamma: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Computes XGBoost 2nd-order split gain and optimal child weights.\n    \n    Parameters\n    ----------\n    g : np.ndarray\n        Array of 1st-order gradients for instances sorted along feature axis.\n    h : np.ndarray\n        Array of 2nd-order Hessians for instances sorted along feature axis.\n    split_idx : int\n        Candidate split boundary index (left child contains instances [:split_idx]).\n    lmbda : float\n        L2 regularization parameter lambda on leaf weights.\n    gamma : float\n        Minimum split loss reduction parameter gamma.\n        \n    Returns\n    -------\n    dict with keys:\n        'gain': The net split gain.\n        'w_left': Optimal weight for left leaf.\n        'w_right': Optimal weight for right leaf.\n    \"\"\"\n    # Step 1: Left child gradient and Hessian sums\n    # Step 2: Right child gradient and Hessian sums\n    # Step 3: Combined parent sums\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "g = np.array([-1.0, -1.0, 1.0, 1.0]); h = np.array([1.0, 1.0, 1.0, 1.0]); res = compute_xgboost_split_gain(g, h, split_idx=2, lmbda=1.0, gamma=0.1); f\"{res['gain']:.2f}, {res['w_left']:.2f}\"",
              "expected": "1.23, 0.67"
            },
            {
              "input": "g = np.array([0.5, 0.5, 0.5, 0.5]); h = np.array([1.0, 1.0, 1.0, 1.0]); res = compute_xgboost_split_gain(g, h, split_idx=2, lmbda=0.0, gamma=1.0); f\"{res['gain'] < 0.0}\"",
              "expected": "True"
            }
          ],
          "expectedOutput": "1.23, 0.67",
          "variants": {
            "python": {
              "starterCode": "def compute_xgboost_split_gain(\n    g: np.ndarray,\n    h: np.ndarray,\n    split_idx: int,\n    lmbda: float = 1.0,\n    gamma: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Computes XGBoost 2nd-order split gain and optimal child weights.\n    \n    Parameters\n    ----------\n    g : np.ndarray\n        Array of 1st-order gradients for instances sorted along feature axis.\n    h : np.ndarray\n        Array of 2nd-order Hessians for instances sorted along feature axis.\n    split_idx : int\n        Candidate split boundary index (left child contains instances [:split_idx]).\n    lmbda : float\n        L2 regularization parameter lambda on leaf weights.\n    gamma : float\n        Minimum split loss reduction parameter gamma.\n        \n    Returns\n    -------\n    dict with keys:\n        'gain': The net split gain.\n        'w_left': Optimal weight for left leaf.\n        'w_right': Optimal weight for right leaf.\n    \"\"\"\n    # Step 1: Left child gradient and Hessian sums\n    # Step 2: Right child gradient and Hessian sums\n    # Step 3: Combined parent sums\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.23, 0.67"
            }
          },
          "solution": "import numpy as np\n\ndef compute_xgboost_split_gain(\n    g: np.ndarray,\n    h: np.ndarray,\n    split_idx: int,\n    lmbda: float = 1.0,\n    gamma: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Computes XGBoost 2nd-order split gain and optimal child weights.\n    \n    Parameters\n    ----------\n    g : np.ndarray\n        Array of 1st-order gradients for instances sorted along feature axis.\n    h : np.ndarray\n        Array of 2nd-order Hessians for instances sorted along feature axis.\n    split_idx : int\n        Candidate split boundary index (left child contains instances [:split_idx]).\n    lmbda : float\n        L2 regularization parameter lambda on leaf weights.\n    gamma : float\n        Minimum split loss reduction parameter gamma.\n        \n    Returns\n    -------\n    dict with keys:\n        'gain': The net split gain.\n        'w_left': Optimal weight for left leaf.\n        'w_right': Optimal weight for right leaf.\n    \"\"\"\n    # Step 1: Left child gradient and Hessian sums\n    G_L = float(np.sum(g[:split_idx]))\n    H_L = float(np.sum(h[:split_idx]))\n    \n    # Step 2: Right child gradient and Hessian sums\n    G_R = float(np.sum(g[split_idx:]))\n    H_R = float(np.sum(h[split_idx:]))\n    \n    # Step 3: Combined parent sums\n    G_total = G_L + G_R\n    H_total = H_L + H_R\n    \n    # Step 4: Closed-form optimal leaf weights: w* = -G / (H + lambda)\n    w_left = -G_L / (H_L + lmbda)\n    w_right = -G_R / (H_R + lmbda)\n    \n    # Step 5: 2nd-order split gain with complexity penalty gamma\n    score_L = (G_L ** 2) / (H_L + lmbda)\n    score_R = (G_R ** 2) / (H_R + lmbda)\n    score_parent = (G_total ** 2) / (H_total + lmbda)\n    \n    gain = 0.5 * (score_L + score_R - score_parent) - gamma\n    \n    return {\n        \"gain\": float(gain),\n        \"w_left\": float(w_left),\n        \"w_right\": float(w_right)\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Compute sum of 1st-order gradients G and sum of 2nd-order Hessians H for left and right children.",
            "ar": "احسب مجموع تدرجات الرتبة الأولى G ومجموع هيسيان الرتبة الثانية H للفرعين الأيمن والأيسر."
          },
          "tier2": {
            "en": "Optimal leaf weight formula is w* = -G / (H + lambda).",
            "ar": "معادلة وزن الورقة الأمثل هي w* = -G / (H + lambda)."
          },
          "tier3": {
            "en": "Gain formula is 0.5 * (G_L^2/(H_L + lambda) + G_R^2/(H_R + lambda) - G_tot^2/(H_tot + lambda)) - gamma.",
            "ar": "معادلة المكسب هي 0.5 * (G_L^2/(H_L + lambda) + G_R^2/(H_R + lambda) - G_tot^2/(H_tot + lambda)) - gamma."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "How does configuring $\\lambda = 5.0$ and $\\gamma = 1.0$ mathematically neutralize this instability?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ أشجار التدرج المعززة والتقريب من الرتبة الثانية في XGBoost تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Adding $\\lambda = 5.0$ acts as a quadratic $L_2$ damper in the denominator, collapsing the explosive leaf weight from $+18.0$ down to $-\\frac{-1.80}{0.10 + 5.0} = +0.35$. Simultaneously, the net gain of this two-sample split drops well below the $\\gamma = 1.0$ hurdle, prompting XGBoost to reject the split automatically and prevent overfitting on low-evidence noise.",
                "ar": "تعمل إضافة $\\lambda = 5.0$ كمخمد تربيعي $L_2$ في المقام، مما يقلص وزن الورقة المنفلت من $+18.0$ إلى $-\\frac{-1.80}{0.10 + 5.0} = +0.35$. وفي الوقت نفسه، يهبط مكسب التفرع الصافي دون عتبة $\\gamma = 1.0$ الإلزامية، مما يجعل XGBoost يرفض هذا التفرع الضعيف تلقائياً ويمنع فرط التخصيص على عينات ضئيلة."
              },
              "correct": true,
              "explanation": {
                "en": "The leaf weight formula $w^* = -\\frac{G}{H + \\lambda}$ guarantees that when sample evidence is scarce ($H \\to 0$), the denominator is dominated by $\\lambda$, keeping weights close to zero. Furthermore, the $\\gamma$ penalty enforces a minimum gain hurdle, automatically pruning insignificant splits.",
                "ar": "تضمن صيغة وزن الورقة $w^* = -\\frac{G}{H + \\lambda}$ أنه عند ندرة العينات ($H \\to 0$)، يسيطر المعامل $\\lambda$ على المقام ويكبح تضخم الأوزان نحو الصفر. كما يفرض المعامل $\\gamma$ حداً أدنى لمكسب التفرع، مما يقص التفرعات الهامشية تلقائياً."
              }
            },
            {
              "text": {
                "en": "Setting $\\lambda = 5.0$ converts the Hessian curvature into negative values, mathematically inverting the direction of the gradient.",
                "ar": "يحول ضبط $\\lambda = 5.0$ انحناء الهيسيان إلى قيم سالبة، مما يعكس اتجاه التدرج رياضياً."
              },
              "correct": false,
              "explanation": {
                "en": "$\\lambda$ is a strictly positive scalar added to $H_j \\ge 0$; it reinforces positive-definiteness and never flips signs.",
                "ar": "المعامل $\\lambda$ قيمة موجبة قطعية تُضاف إلى الهيسيان الموجب $H_j \\ge 0$؛ فهو يعزز الانحناء الموجب ولا يعكس الإشارة أبداً."
              }
            },
            {
              "text": {
                "en": "Setting $\\gamma = 1.0$ instructs the algorithm to replace decision tree splits with dense neural network perceptrons.",
                "ar": "يوجه ضبط $\\gamma = 1.0$ الخوارزمية لاستبدال تفرعات شجرة القرار بطبقات شبكات عصبية كثيفة."
              },
              "correct": false,
              "explanation": {
                "en": "$\\gamma$ is purely a scalar tree complexity penalty within CART structures; it has nothing to do with neural networks.",
                "ar": "المعامل $\\gamma$ مجرد جزاء عددي لتعقيد هيكل الشجرة ولا يحول النموذج إلى شبكة عصبية."
              }
            },
            {
              "text": {
                "en": "Regularization parameters $\\lambda$ and $\\gamma$ apply exclusively during inference on unseen test data and have no effect during tree training.",
                "ar": "تُطبق معاملات التنظيم $\\lambda$ و $\\gamma$ حصرياً أثناء مرحلة التنبؤ بالبيانات الجديدة وليس لها أي دور أثناء تدريب الشجرة."
              },
              "correct": false,
              "explanation": {
                "en": "$\\lambda$ and $\\gamma$ directly govern the training objective function, determining leaf weights and split acceptance during tree construction.",
                "ar": "يتحكم المعاملان $\\lambda$ و $\\gamma$ مباشرة في دالة الهدف أثناء التدريب، ويحددان أوزان الأوراق وقرارات قبول أو رفض التفرعات لحظياً."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "kmeans-clustering",
    "title": "K-Means++ Clustering & Voronoi Tessellations",
    "titleAr": "تجميع K-Means++ وتفسيف فورونوي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In supervised learning, an all-knowing teacher provides clean ground-truth labels $yi$ for every training instance.",
      "ar": "في التعلم الخاضع للإشراف، يقدم معلم خبير تصنيفات مؤكدة $yi$ لكل عينة. لكن في قطاعات صناعية وعلمية شاسعة—كاستكشاف الشرائح التسويقية للعملاء،..."
    },
    "prerequisites": [
      "cartesian-coordinate-metric",
      "multiple-regression-matrix-calculus"
    ],
    "x": 805,
    "y": 3025,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "KMeansVoronoi",
        "narrative": {
          "en": "In supervised learning, an all-knowing teacher provides clean ground-truth labels $y_i$ for every training instance.\nBut across huge frontiers of real-world business and science—discovering customer purchasing personas, identifying novel cell types in single-cell cancer genomics, compressing digital color palettes, or catching zero-day cyberattacks—**labels do not exist**.\nThere is no teacher. The algorithm must explore an uncharted geometric space and discover organic clusters entirely on its own.\n\nThe classic **K-Means algorithm** (Stuart Lloyd, 1957) solves this challenge like **a city planner deciding where to build $K$ emergency fire stations across a sprawling metropolis**:\n1. **Initial Guess:** You drop $K$ tentative pins across the city map as temporary fire station locations.\n2. **Jurisdiction (Voronoi) Assignment:** Every household in the city is assigned to the nearest fire station, carving the map into geometric service zones known as a **Voronoi tessellation**.\n3. **Centroid Relocation:** Each fire station is dismantled and physically rebuilt at the exact geographic center of gravity (the average coordinates) of all the homes it serves.\n4. **Iterative Equilibrium:** Because the stations moved, some families are now closer to a different station! You repeat the assignment and relocation steps until nobody changes stations and the system freezes into a stable equilibrium.\n\nHowever, Lloyd's original algorithm had an Achilles' heel: **bad initialization luck**.\nThe error surface (Within-Cluster Sum of Squares) is covered in deceptive local valleys. If you drop the initial $K$ pins uniformly at random, pure bad luck might place three fire stations in the exact same quiet suburb while leaving an entire industrial district uncovered! The algorithm freezes in a terrible local trap.\n\nDavid Arthur and Sergei Vassilvitskii (2007) fixed this flaw with the famous **K-Means++ algorithm**.\nInstead of blind uniform guessing, K-Means++ uses **probabilistic spatial repulsion**:\n- The first centroid is picked uniformly at random.\n- Every subsequent centroid is chosen with probability proportional to the **square of its distance to the nearest existing centroid**: $\\mathbb{P}(\\mathbf{x}) \\propto D(\\mathbf{x})^2$.\n\nPoints crowded around existing fire stations have virtually zero chance of being picked. Remote, neglected areas get top priority! This smart spacing ensures the initial centroids span the entire dataset, giving a proven $O(\\log K)$ mathematical guarantee against the global optimum.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Unsupervised Learning** | Flying without a map: discovering patterns when no correct labels or answers are provided. |\n| **Centroid** | Center of gravity: the average $(x, y)$ coordinate of all points belonging to a cluster. |\n| **Voronoi Cell** | Service territory: the geometric polygon of space closest to a specific centroid. |\n| **Inertia (WCSS)** | Tightness score: sum of squared distances from every point to its assigned centroid. |\n| **K-Means++** | Smart seeding: spaces out initial centroids by favoring points far from existing ones. |\n\n```text\n    THE VORONOI PARTITIONING METAPHOR:\n\nHousehold           Household\n               *                   *\n                  \\             /\n                   \\           /\n               .----[ CENTROID 1 ]----.  <--- Fire Station 1\n              |                        |      (Mean of assigned homes)\n        ------+--- VORONOI BOUNDARY ---+------\n              |                        |\n               .----[ CENTROID 2 ]----.  <--- Fire Station 2\n                   /           \\\n                  /             \\\n               *                   *\n           Household           Household\n```",
          "ar": "في التعلم الخاضع للإشراف، يقدم معلم خبير تصنيفات مؤكدة $y_i$ لكل عينة.\nلكن في قطاعات صناعية وعلمية شاسعة—كاستكشاف الشرائح التسويقية للعملاء، أو تصنيف الخلايا في أبحاث السرطان، أو ضغط ألوان الصور، أو كشف الهجمات السيبرانية غير المسبوقة—**تكون البيانات غير مصنفة إطلاقاً**.\nلا يوجد معلم يرشدك؛ بل يجب على الخوارزمية استكشاف الفضاء الهندسي بمفردها واكتشاف التجمعات الطبيعية المترابطة استناداً إلى تضاريس البيانات ذاتها.\n\nتتعامل خوارزمية **K-Means الكلاسيكية** (ستيوارت لويد، 1957) مع هذه المسألة كـ **مخطط مدن يسعى لبناء $K$ من مراكز الإطفاء في مدينة مترامية الأطراف**:\n1. **المواقع المبدئية:** تضع الخوارزمية $K$ من الدبابيس المؤقتة على خريطة المدينة كمواقع أولية للمراكز.\n2. **تفسيف فورونوي (Voronoi Assignment):** يُسند كل منزل في المدينة إلى مركز الإطفاء الأقرب إليه جغرافياً، مما يقسم المدينة إلى فسيفساء من المناطق الخدمية المعروفة بـ **خلايا فورونوي**.\n3. **تحديث المركز (Centroid Relocation):** يُعاد نقل كل مركز إطفاء مادياً إلى مركز الثقل الجغرافي الدقيق (المتوسط الحسابي للإحداثيات) لجميع المنازل التي تولى خدمتها.\n4. **الاتزان الحركي المستقر:** نظراً لتحرك المراكز، تتغير الحدود الخدمية تلقائياً؛ فتعيد المنازل الارتباط بالمراكز الأقرب إليها مجدداً. وتتكرر هذه الدورة المتناوبة حتى تستقر المراكز تماماً وتتوقف عن الحركة.\n\nغير أن خوارزمية لويد التقليدية تعاني من نقطة ضعف قاتلة: **عشوائية البداية**.\nفدالة الهدف غير محدبة ومليئة بالقيعان المحلية المضللة. فإذا اخترت المواقع عشوائياً، فقد تسقط ثلاثة مراكز إطفاء في نفس الحي السكني بالصدفة، بينما يُترك قطاع صناعي كامل دون تغطية! فتقع الخوارزمية في فخ قاع محلي رديء.\n\nعالج ديفيد آرثر وسيرجي فاسيليفتسكي (2007) هذه المعضلة بابتكار **K-Means++**.\nبدلاً من التخمين العشوائي الأعمى، تطبق K-Means++ **تباعداً احتمإلياً ذكياً**:\n- يُختار المركز الأول عشوائياً.\n- يُختار كل مركز لاحق باحتمالية تتناسب طردياً مع **مربع المسافة عن أقرب مركز قائم بالفعل**: $\\mathbb{P}(\\mathbf{x}) \\propto D(\\mathbf{x})^2$.\n\nتصبح فرصة اختيار النقاط القريبة من المراكز القائمة شبه معدومة، بينما تحظى المناطق النائية غير الممثلة بأعلى احتمالية للاختيار، مما يضمن استكشاف كافة أرجاء فضاء البيانات بضمان رياضي $O(\\log K)$ مقارنة بالحل الأمثل العالمي!\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **التعلم غير الخاضع للإشراف** | الطيران دون خريطة: اكتشاف الأنماط دون وجود تصنيفات أو إجابات صحيحة مسبقة. |\n| **المركز (Centroid)** | مركز الثقل الهندسي: متوسط إحداثيات كافة النقاط التابعة للمجموعة. |\n| **خلية فورونوي** | النطاق الخدمي: المضلع الهندسي للفضاء الأقرب لمركز تجمع معين. |\n| **القصور الذاتي (WCSS)** | مقياس التماسك: مجموع مربعات مسافات النقاط عن مراكزها المخصصة. |\n| **تهيئة K-Means++** | البذر الذكي: مباعدة المراكز الأولية عبر ترجيح النقاط البعيدة عن المراكز القائمة. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "J(\\mathcal{C}, \\boldsymbol{\\mu}) = \\sum_{k=1}^K \\sum_{i \\in C_k} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_k\\|_2^2",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for K-Means++ Clustering & Voronoi Tessellations.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تجميع K-Means++ وتفسيف فورونوي."
        },
        "narrative": {
          "en": "Because finding the global minimizer of $J$ over all possible partitions is NP-hard, Lloyd's algorithm executes alternating block coordinate descent across two steps:\n\n### 1. The Voronoi Assignment Step\nHolding centroids $\\boldsymbol{\\mu}_k$ fixed, minimize $J$ with respect to the cluster assignment set $\\mathcal{C}$. Because individual point contributions are additive and decoupled, the optimal assignment rule assigns each point $\\mathbf{x}_i$ to its nearest Euclidean centroid:\n\n$$\nC_k^{(t)} = \\left\\{ i : k = \\arg\\min_{j \\in \\{1, \\dots, K\\}} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_j^{(t-1)}\\|_2^2 \\right\\}\n$$\n\n### 2. The Centroid Relocation Step\nHolding the partition $\\mathcal{C}$ fixed, minimize $J$ with respect to centroids $\\boldsymbol{\\mu}_k$. Setting the gradient with respect to $\\boldsymbol{\\mu}_k$ to zero:\n\n$$\n\\nabla_{\\boldsymbol{\\mu}_k} J = -2 \\sum_{i \\in C_k} (\\mathbf{x}_i - \\boldsymbol{\\mu}_k) = \\mathbf{0} \\implies \\boldsymbol{\\mu}_k^{(t)} = \\frac{1}{|C_k^{(t)}|} \\sum_{i \\in C_k^{(t)}} \\mathbf{x}_i\n$$\n\n### K-Means++ Seeding Algorithm (Arthur & Vassilvitskii, 2007)\n1. Choose the first center $\\boldsymbol{\\mu}_1$ uniformly at random from $\\mathcal{D}$.\n2. For each point $\\mathbf{x} \\in \\mathcal{D}$, compute the shortest squared distance to any already-chosen centroid:\n   $$\n   D(\\mathbf{x})^2 = \\min_{j \\in \\{1, \\dots, k-1\\}} \\|\\mathbf{x} - \\boldsymbol{\\mu}_j\\|_2^2\n   $$\n3. Sample the next center $\\boldsymbol{\\mu}_k$ from $\\mathcal{D}$ using the probability distribution:\n   $$\n   \\mathbb{P}(\\mathbf{x}) = \\frac{D(\\mathbf{x})^2}{\\sum_{\\mathbf{z} \\in \\mathcal{D}} D(\\mathbf{z})^2}\n   $$\n4. Repeat Steps 2 and 3 until $K$ centroids have been selected.\n\nThis seeding guarantees:\n$$\n\\mathbb{E}[J_{\\text{K-Means++}}] \\le 8(\\ln K + 2) J_{\\text{Optimal}}\n$$\n\nImplement a single iterative update step of Lloyd's K-Means clustering in NumPy. You will:\n1. Compute the pairwise squared Euclidean distance matrix between all $N$ data points and all $K$ centroids using vectorized expansion: $\\|\\mathbf{x} - \\boldsymbol{\\mu}\\|_2^2 = \\|\\mathbf{x}\\|_2^2 + \\|\\boldsymbol{\\mu}\\|_2^2 - 2\\mathbf{x}^T\\boldsymbol{\\mu}$.\n2. Assign each data point to its nearest centroid index using `np.argmin`.\n3. Recompute each centroid as the arithmetic mean of its assigned cluster points, with fallback handling for empty clusters.\n4. Calculate the total within-cluster sum of squared errors (Inertia).",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $\\mathcal{D}$ | $\\{\\mathbf{x}_1, \\dots, \\mathbf{x}_N\\}$ | Unlabelled dataset of observations | مجموعة البيانات غير المصنفة في الفضاء |\n| $K$ | Cluster count | Number of geometric clusters to discover | عدد المجموعات والتجمعات المطلوب استكشافها |\n| $C_k$ | Point cluster set | Subset of sample indices assigned to cluster $k$ | مجموعة مؤشرات العينات المسندة للمجموعة $k$ |\n| $\\boldsymbol{\\mu}_k \\in \\mathbb{R}^D$ | Cluster centroid | Arithmetic mean coordinate vector of cluster $k$ | متجه إحداثيات مركز الثقل للمجموعة $k$ |\n| $J(\\mathcal{C}, \\boldsymbol{\\mu})$ | Inertia / WCSS | Total within-cluster squared error to minimize | دالة القصور الذاتي ومجموع مربعات الأخطاء |\n| $D(\\mathbf{x})^2$ | Squared min distance | Squared Euclidean distance to nearest chosen center | مربع المسافة الإقليدية إلى أقرب مركز قائم |\n| $\\mathbb{P}(\\mathbf{x})$ | $D(\\mathbf{x})^2 / \\sum D^2$ | K-Means++ seeding probability distribution | التوزيع الاحتمالي لانتقاء المراكز في K-Means++ |\n| $J_{\\text{Optimal}}$ | Global minimum | Theoretical minimum inertia across all partitions | الحد الأدنى النظري للقصور الذاتي للحل الأمثل |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-kmeans-clustering",
          "starterCode": "import numpy as np\n\ndef kmeans_step(\n    X: np.ndarray,\n    centroids: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, float]:\n    \"\"\"\n    Executes a single step of Lloyd's K-Means algorithm:\n    1. Assign samples to nearest centroid via vectorized Euclidean distance.\n    2. Recompute centroids as cluster sample means.\n    3. Compute total inertia (WCSS).\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Input data points.\n    centroids : np.ndarray of shape (K, D)\n        Current centroid positions.\n        \n    Returns\n    -------\n    tuple of (labels, updated_centroids, inertia):\n        labels : np.ndarray of shape (N,) cluster indices in {0, ..., K-1}\n        updated_centroids : np.ndarray of shape (K, D)\n        inertia : float total within-cluster sum of squared distances\n    \"\"\"\n    N, D = X.shape\n    K = centroids.shape[0]\n    \n    # Step 1: Vectorized pairwise squared Euclidean distance matrix (N, K)\n    # ||x - mu||^2 = ||x||^2 + ||mu||^2 - 2 * x^T mu\n    x_sq = np.sum(X ** 2, axis=1, keepdims=True)            # (N, 1)\n    c_sq = np.sum(centroids ** 2, axis=1, keepdims=True).T   # (1, K)\n    cross = 2.0 * (X @ centroids.T)                          # (N, K)\n    dists = x_sq + c_sq - cross\n    dists = np.maximum(dists, 0.0)\n    \n    # Step 2: Voronoi assignment step\n    labels = np.argmin(dists, axis=1)\n    \n    # Step 3: Centroid relocation step (center of mass)\n    updated_centroids = np.zeros_like(centroids)\n    total_inertia = 0.0\n    \n    for k in range(K):\n        cluster_points = X[labels == k]\n        if len(cluster_points) > 0:\n            updated_centroids[k] = np.mean(cluster_points, axis=0)\n            total_inertia += float(np.sum((cluster_points - updated_centroids[k]) ** 2))\n        else:\n            # Handle empty cluster: preserve existing location\n            updated_centroids[k] = centroids[k]\n            \n    return labels, updated_centroids, float(total_inertia)",
          "testCases": [
            {
              "input": "X = np.array([[0.0, 0.0], [0.0, 1.0], [10.0, 10.0], [10.0, 11.0]]); c = np.array([[0.0, 0.0], [10.0, 10.0]]); labels, new_c, inertia = kmeans_step(X, c); f\"{inertia:.2f}, {new_c[0, 1]:.2f}\"",
              "expected": "1.00, 0.50"
            },
            {
              "input": "X = np.array([[1.0, 2.0], [1.0, 4.0]]); c = np.array([[1.0, 0.0]]); labels, new_c, inertia = kmeans_step(X, c); f\"{new_c[0, 1]:.1f}\"",
              "expected": "3.0"
            }
          ],
          "expectedOutput": "1.00, 0.50",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef kmeans_step(\n    X: np.ndarray,\n    centroids: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, float]:\n    \"\"\"\n    Executes a single step of Lloyd's K-Means algorithm:\n    1. Assign samples to nearest centroid via vectorized Euclidean distance.\n    2. Recompute centroids as cluster sample means.\n    3. Compute total inertia (WCSS).\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Input data points.\n    centroids : np.ndarray of shape (K, D)\n        Current centroid positions.\n        \n    Returns\n    -------\n    tuple of (labels, updated_centroids, inertia):\n        labels : np.ndarray of shape (N,) cluster indices in {0, ..., K-1}\n        updated_centroids : np.ndarray of shape (K, D)\n        inertia : float total within-cluster sum of squared distances\n    \"\"\"\n    N, D = X.shape\n    K = centroids.shape[0]\n    \n    # Step 1: Vectorized pairwise squared Euclidean distance matrix (N, K)\n    # ||x - mu||^2 = ||x||^2 + ||mu||^2 - 2 * x^T mu\n    x_sq = np.sum(X ** 2, axis=1, keepdims=True)            # (N, 1)\n    c_sq = np.sum(centroids ** 2, axis=1, keepdims=True).T   # (1, K)\n    cross = 2.0 * (X @ centroids.T)                          # (N, K)\n    dists = x_sq + c_sq - cross\n    dists = np.maximum(dists, 0.0)\n    \n    # Step 2: Voronoi assignment step\n    labels = np.argmin(dists, axis=1)\n    \n    # Step 3: Centroid relocation step (center of mass)\n    updated_centroids = np.zeros_like(centroids)\n    total_inertia = 0.0\n    \n    for k in range(K):\n        cluster_points = X[labels == k]\n        if len(cluster_points) > 0:\n            updated_centroids[k] = np.mean(cluster_points, axis=0)\n            total_inertia += float(np.sum((cluster_points - updated_centroids[k]) ** 2))\n        else:\n            # Handle empty cluster: preserve existing location\n            updated_centroids[k] = centroids[k]\n            \n    return labels, updated_centroids, float(total_inertia)",
              "expectedOutput": "1.00, 0.50"
            }
          },
          "solution": "import numpy as np\n\ndef kmeans_step(\n    X: np.ndarray,\n    centroids: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, float]:\n    \"\"\"\n    Executes a single step of Lloyd's K-Means algorithm:\n    1. Assign samples to nearest centroid via vectorized Euclidean distance.\n    2. Recompute centroids as cluster sample means.\n    3. Compute total inertia (WCSS).\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Input data points.\n    centroids : np.ndarray of shape (K, D)\n        Current centroid positions.\n        \n    Returns\n    -------\n    tuple of (labels, updated_centroids, inertia):\n        labels : np.ndarray of shape (N,) cluster indices in {0, ..., K-1}\n        updated_centroids : np.ndarray of shape (K, D)\n        inertia : float total within-cluster sum of squared distances\n    \"\"\"\n    N, D = X.shape\n    K = centroids.shape[0]\n    \n    # 1. Vectorized pairwise squared Euclidean distance: (N, K)\n    # ||x - mu||^2 = ||x||^2 + ||mu||^2 - 2 * x^T mu\n    x_sq = np.sum(X ** 2, axis=1, keepdims=True)            # (N, 1)\n    c_sq = np.sum(centroids ** 2, axis=1, keepdims=True).T   # (1, K)\n    cross = 2.0 * (X @ centroids.T)                          # (N, K)\n    dists = x_sq + c_sq - cross\n    dists = np.maximum(dists, 0.0)\n    \n    # 2. Assignment Step: argmin across centroids\n    labels = np.argmin(dists, axis=1)\n    \n    # 3. Update Step: compute new means\n    updated_centroids = np.zeros_like(centroids)\n    total_inertia = 0.0\n    \n    for k in range(K):\n        cluster_points = X[labels == k]\n        if len(cluster_points) > 0:\n            updated_centroids[k] = np.mean(cluster_points, axis=0)\n            total_inertia += float(np.sum((cluster_points - updated_centroids[k]) ** 2))\n        else:\n            # Handle empty cluster: preserve previous position\n            updated_centroids[k] = centroids[k]\n            \n    return labels, updated_centroids, float(total_inertia)"
        },
        "hints": {
          "tier1": {
            "en": "Assignment step: assign each sample to the centroid with minimum Euclidean distance.",
            "ar": "خطوة الإسناد: أسند كل عينة إلى المركز ذي المسافة الإقليدية الأقصر."
          },
          "tier2": {
            "en": "Update step: recompute each centroid as the arithmetic mean of its assigned cluster samples.",
            "ar": "خطوة التحديث: أعد حساب كل مركز كمتوسط حسابي للعينات المسندة إليه."
          },
          "tier3": {
            "en": "Inertia is the sum of squared Euclidean distances from all samples to their assigned centroids.",
            "ar": "القصور الذاتي (Inertia) هو مجموع مربعات المسافات الإقليدية لجميع العينات عن مراكزها."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What fundamental geometric principle of K-Means clustering was violated, and how must the analytics pipeline be corrected?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تجميع K-Means++ وتفسيف فورونوي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "K-Means relies on isotropic Euclidean distance, which treats a numerical unit change identically across all dimensions. Because the variance of income in dollars is over 7 orders of magnitude larger than recency in days, squared distance differences along the income axis ($\\Delta^2 \\approx 10,000^2 = 10^8$) completely overwhelm recency differences ($\\Delta^2 \\approx 15^2 = 225$), rendering recency geometrically invisible. The data must be standardized (e.g., via z-score normalization) prior to clustering so that all features share equal geometric scale.",
                "ar": "تعتمد خوارزمية K-Means على المسافة الإقليدية التي تعامل وحدة التغير بالتساوي عبر كافة الأبعاد. وحيث إن تباين الدخل السنوي بالدولار أكبر بـ 7 مراتب أسية من تباين أيام الشراء، فإن الفروق التربيعية على محور الدخل ($\\Delta^2 \\approx 10,000^2 = 10^8$) تطغى كلياً على فروق حداثة الشراء ($\\Delta^2 \\approx 15^2 = 225$)، مما يلغي أثر متغير الحداثة تماماً. يجب معايرة البيانات (عبر تحويل z-score) قبل التجميع لتتشارك كافة المتغيرات في التأثير الهندسي بالتساوي."
              },
              "correct": true,
              "explanation": {
                "en": "Euclidean distance is scale-dependent. Without feature standardization, the feature with the largest numerical variance dictates the centroid locations and Voronoi partitioning, effectively turning a multivariate problem into a single-variable clustering task.",
                "ar": "ترتبط المسافة الإقليدية بمقاييس الأرقام؛ وبدون توحيد المقاييس، يستحوذ المتغير ذو القيم العددية الضخمة على حساب المسافة ومواقع المراكز بالكامل، محولاً التحليل متعدد الأبعاد إلى تقسيم للمتغير الأكبر فقط."
              }
            },
            {
              "text": {
                "en": "The team should increase $K$ from $4$ to $100$ clusters to force the algorithm to capture the recency score in smaller sub-clusters.",
                "ar": "يجب على الفريق زيادة عدد المجموعات $K$ من 4 إلى 100 لإجبار الخوارزمية على التقاط حداثة الشراء في مجموعات فرعية أصغر."
              },
              "correct": false,
              "explanation": {
                "en": "Increasing $K$ would simply create 100 narrower income slices; it does not resolve the massive dimensional scale distortion.",
                "ar": "ستؤدي زيادة عدد المجموعات إلى تقطيع فئات الدخل لشرائح أدق فقط دون أن تحل معضلة التفاوت الهائل في المقاييس."
              }
            },
            {
              "text": {
                "en": "K-Means requires features to be non-zero integers; dollar incomes should be converted into binary indicator variables.",
                "ar": "تشترط خوارزمية K-Means أن تكون المتغيرات أعداداً صحيحة غير صفرية؛ ويجب تحويل الدخل إلى متغيرات ثنائية."
              },
              "correct": false,
              "explanation": {
                "en": "K-Means is natively defined on real-valued continuous Cartesian spaces; binarizing continuous variables destroys geometric distance continuity.",
                "ar": "صُممت K-Means خصيصاً للفضاءات الديكارتية المستمرة، وتحويل المتغيرات إلى قيم ثنائية يفقد المسافات معناها الهندسي."
              }
            },
            {
              "text": {
                "en": "K-Means++ probabilistic initialization automatically adjusts feature scale imbalances during centroid seeding.",
                "ar": "تقوم خوارزمية K-Means++ الذكية بضبط تفاوت المقاييس تلقائياً أثناء تهيئة مواقع المراكز."
              },
              "correct": false,
              "explanation": {
                "en": "K-Means++ uses the exact same unscaled Euclidean distance metric $D(\\mathbf{x})^2$ during seeding; it does not normalize features.",
                "ar": "تعتمد K-Means++ على نفس مقياس المسافة الإقليدية غير المعاير في حساب احتمالات التباعد، ولا تعدل مقاييس المتغيرات تلقائياً."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  },
  {
    "id": "pca-dimensionality-reduction",
    "title": "Principal Component Analysis (PCA) & Variance Maximization",
    "titleAr": "تحليل المكونات الرئيسية (PCA) وتعظيم التباين الهندسي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Modern datasets routinely bombard data scientists with dozens or thousands of interrelated features—corporate balance sheets, multi-sensor...",
      "ar": "تغمر مجموعات البيانات الحديثة مهندسي البيانات بمئات أو آلاف المتغيرات المتشابكة والمترابطة—مثل النسب المالية للشركات، أو قراءات مجسات..."
    },
    "prerequisites": [
      "singular-value-decomposition",
      "symmetric-matrices-spectral"
    ],
    "x": 825,
    "y": 3120,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "KMeansVoronoi",
        "narrative": {
          "en": "Modern datasets routinely bombard data scientists with dozens or thousands of interrelated features—corporate balance sheets, multi-sensor telemetry, facial image pixels, or single-cell gene expression markers.\nAttempting to model these high-dimensional spaces directly leads to computational slowdowns, severe multicollinearity, and the curse of dimensionality.\n\nYet in reality, most features are deeply redundant:\nIf you measure an athlete's **height, arm span, shoe size, and leg length**, you aren't measuring four independent biological traits—you are measuring four reflections of the **exact same underlying body size factor!**\n\n**Principal Component Analysis (PCA)** is the foundational technique for linear dimensionality reduction.\nTo grasp its tactile geometry, imagine holding an intricate **3D wire sculpture** in your hands inside a pitch-black room. Your mission is to project the sculpture's silhouette onto a flat 2D white wall using a single handheld flashlight.\n\nIf you shine the flashlight from an arbitrary, clumsy angle, the wire branches collapse into an unrecognizable, messy tangle that conceals the sculpture's true shape.\nPCA is the mathematical art of **rotating the flashlight around the sculpture to find the exact angle that casts the widest, sharpest, most informative shadow possible!**\n\nThe physical width and spread of this shadow corresponds to **statistical variance**:\n- The direction where data points are most spread out preserves the maximum amount of original information.\n- Flat, squished dimensions represent redundant noise that can be safely discarded without losing the core signal.\n\nThis spatial rotation proceeds through a strict orthogonal hierarchy:\n- The **First Principal Component ($\\mathbf{v}_1$)** is the primary axis of maximum variance—the single widest perspective of your data manifold.\n- The **Second Principal Component ($\\mathbf{v}_2$)** is the axis of maximum *remaining* variance that is strictly orthogonal (at a perfect $90^\\circ$ angle) to the first.\n- Every subsequent component captures diminishing residual variance while remaining perpendicular to all predecessors.\n\nBecause these axes are orthogonal by construction, PCA completely uncorrelates the features, rotating your coordinate system so that the new axes align with the intrinsic geometric structure of the data.\n\n#### Jargon Decoder\n\n| Term | Plain English Translation & Intuition |\n| :--- | :--- |\n| **Dimensionality Reduction** | The compression lens: simplifying 1,000 features down to 2 or 3 essential axes without losing the signal. |\n| **Variance Maximization** | Finding the widest shadow: rotating coordinates so the first axis captures the biggest spread. |\n| **Principal Component** | An essential axis: an eigenvector of the covariance matrix defining a new coordinate direction. |\n| **Orthogonality** | At perfect 90 degrees: ensuring new axes are completely uncorrelated and independent. |\n| **Explained Variance Ratio** | Information retained: the percentage of total dataset variance captured by a given component. |\n\n```text\n    THE PCA ROTATION & SILHOUETTE PROJECTION:\n\nFeature 2\n             ^                  .  *  *  (Original Data Cloud)\n             |               *   *   *\n             |            *   *   *      <--- Axis of Maximum Spread:\n             |         *   *   *              First Principal Component (v_1)\n             |      *   *\n             |   *                 \\\n             |                      \\--- Axis of Minor Spread:\n             |                           Second Component (v_2, 90 deg)\n             +----------------------------------------> Feature 1\n```",
          "ar": "تغمر مجموعات البيانات الحديثة مهندسي البيانات بمئات أو آلاف المتغيرات المتشابكة والمترابطة—مثل النسب المالية للشركات، أو قراءات مجسات الطائرات، أو بكسلات الصور الرقمية، أو مصفوفات التعبير الجيني.\nوتؤدي محاولة نمذجة هذه الفضاءات الشاهقة مباشرة إلى شلل حسابي، وتداخل خطي مدمر (Multicollinearity)، وسقوط في لعنة الأبعاد.\n\nومع ذلك، فإن أغلب هذه المتغيرات مكررة في جوهرها؛\nفإذا قست **طول الرياضي، وطول ذراعه، ومقاس حذائه، وطول ساقه**، فأنت لا تقيس أربعة متغيرات مستقلة، بل تقيس أربعة أوجه لمتغير بيولوجي كامن واحد هو: **الحجم الجسدي العام!**\n\nيمثل **تحليل المكونات الرئيسية (Principal Component Analysis - PCA)** الأساس الهندسي الأهم لتقليص الأبعاد الخطي.\nولاستيعاب هذا المفهوم حسياً، تخيل أنك تمسك بيدك **مجسماً سلكياً ثلاثي الأبعاد** معقداً داخل غرفة مظلمة، ومهمتك هي التقاط صورة ظلية للمجسم على جدار مستوٍ أبيض ثنائي الأبعاد باستخدام مصباح يدوي.\n\nإذا سلطت الضوء من زاوية عشوائية خرقاء، سينهار الظل إلى كتلة متشابكة ومبهمة تخفي المعالم الهندسية الحقيقية للمجسم.\nPCA هو الفن الرياضي لـ **تدوير زاوية إضاءة المصباح بدقة للبحث عن الزاوية المثالية التي تصنع أوسع ظل وأكثره وضوحاً وتفصيلاً على الجدار!**\n\nيقابل اتساع هذا الظل الممتد مفهوم **التباين الإحصائي (Variance)**:\n- فالاتجاه الذي تتشتت فيه نقاط البيانات بأكبر قدر ممكن هو الاتجاه الذي يحتفظ بأقصى طاقة بيانية ومعلوماتية أصلية.\n- بينما تمثل الأبعاد المنكمشة ضجيجاً متكرراً يمكن التخلص منه دون أي خسارة جوهرية.\n\nيسير هذا التدوير الهندسي وفق تسلسل هرمي متعامد وصارم:\n- **المكون الرئيسي الأول ($\\mathbf{v}_1$)** هو محور التباين الأقصى المطلق—وهو أوسع زاوية رؤية ممكنة لبياناتك.\n- **المكون الرئيسي الثاني ($\\mathbf{v}_2$)** هو محور التباين الأقصى المتبقي، بشرط أن يكون متعامداً تماماً وبزاوية $90^\\circ$ على المحور الأول.\n- وهكذا، يلتقط كل مكون لاحق تشتتاً متناقصاً مع الحفاظ على تعامده التام مع كافة المكونات السابقة.\n\nوبفضل هذا التعامد الجبري، يلغي PCA الارتباط الخطي بين المتغيرات تماماً، ويعيد تدوير محاور الإحداثيات لتتطابق تماماً مع البنية الهندسية الحقيقية للبيانات.\n\n#### قاموس فك شفرة المصطلحات\n\n| المصطلح | المعنى المبسط والحدس العملي |\n| :--- | :--- |\n| **تقليص الأبعاد** | عدسة الضغط: تبسيط 1,000 متغير إلى محورين أو ثلاثة دون فقدان الإشارة الجوهرية. |\n| **تعظيم التباين** | البحث عن أوسع ظل: تدوير الإحداثيات بحيث يلتقط المحور الأول أقصى انتشار للبيانات. |\n| **المكون الرئيسي** | المحور الجوهري: متجه ذاتي لمصفوفة التغاير يحدد اتجاه الإحداثيات الجديد. |\n| **التعامد الجبري** | زاوية 90 درجة تامة: ضمان استقلال المحاور الجديدة وانعدام الارتباط الخطي بينها تماماً. |\n| **نسبة التباين المفسر** | الطاقة المحفوظة: النسبة المئوية من إجمالي تباين البيانات التي يلتقطها المكون. |"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{\\Sigma} = \\frac{1}{N - 1} \\mathbf{X}^T \\mathbf{X}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Principal Component Analysis (PCA) & Variance Maximization.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تحليل المكونات الرئيسية (PCA) وتعظيم التباين الهندسي."
        },
        "narrative": {
          "en": "Because $\\mathbf{\\Sigma}$ is real, symmetric ($\\mathbf{\\Sigma} = \\mathbf{\\Sigma}^T$), and positive semi-definite, its eigenvalues are real and non-negative.\n\n### Variance Maximization via Rayleigh Quotient\nWe seek a unit projection vector $\\mathbf{u}_1 \\in \\mathbb{R}^P$ ($\\|\\mathbf{u}_1\\|_2^2 = \\mathbf{u}_1^T \\mathbf{u}_1 = 1$) that maximizes the variance of the projected scalar coordinates $\\mathbf{z}_1 = \\mathbf{X}\\mathbf{u}_1$:\n\n$$\n\\text{Var}(\\mathbf{z}_1) = \\frac{1}{N - 1} \\mathbf{z}_1^T \\mathbf{z}_1 = \\frac{1}{N - 1} (\\mathbf{X}\\mathbf{u}_1)^T (\\mathbf{X}\\mathbf{u}_1) = \\mathbf{u}_1^T \\left( \\frac{1}{N - 1} \\mathbf{X}^T \\mathbf{X} \\right) \\mathbf{u}_1 = \\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1\n$$\n\nFormulating the Lagrangian objective with Lagrange multiplier $\\lambda_1$:\n\n$$\n\\mathcal{L}(\\mathbf{u}_1, \\lambda_1) = \\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1 - \\lambda_1 (\\mathbf{u}_1^T \\mathbf{u}_1 - 1)\n$$\n\nTaking the vector derivative with respect to $\\mathbf{u}_1$ and setting it to zero:\n\n$$\n\\nabla_{\\mathbf{u}_1} \\mathcal{L} = 2\\mathbf{\\Sigma}\\mathbf{u}_1 - 2\\lambda_1 \\mathbf{u}_1 = \\mathbf{0} \\implies \\mathbf{\\Sigma}\\mathbf{u}_1 = \\lambda_1 \\mathbf{u}_1\n$$\n\nThis is the canonical **eigenvalue equation**:\n- The optimal projection direction $\\mathbf{u}_1$ is an **eigenvector** of covariance matrix $\\mathbf{\\Sigma}$.\n- Pre-multiplying by $\\mathbf{u}_1^T$ reveals that the projected variance equals the eigenvalue: $\\text{Var}(\\mathbf{z}_1) = \\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1 = \\lambda_1 \\mathbf{u}_1^T \\mathbf{u}_1 = \\lambda_1$.\n- To maximize variance, we choose the eigenvector $\\mathbf{v}_1$ associated with the **largest eigenvalue** $\\lambda_1 = \\lambda_{\\max}$.\n\n### Spectral Decomposition & Truncation\nBy the Spectral Theorem, the covariance matrix decomposes into orthonormal eigenvectors $\\mathbf{V} = [\\mathbf{v}_1, \\dots, \\mathbf{v}_P]$ and diagonal eigenvalue matrix $\\mathbf{\\Lambda} = \\text{diag}(\\lambda_1, \\dots, \\lambda_P)$:\n\n$$\n\\mathbf{\\Sigma} = \\mathbf{V} \\mathbf{\\Lambda} \\mathbf{V}^T, \\quad \\text{with } \\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_P \\ge 0\n$$\n\nTo reduce dimension from $P$ to $K < P$, we retain the top $K$ eigenvectors $\\mathbf{V}_K \\in \\mathbb{R}^{P \\times K}$. The low-dimensional coordinates $\\mathbf{Z} \\in \\mathbb{R}^{N \\times K}$ are:\n\n$$\n\\mathbf{Z} = \\mathbf{X} \\mathbf{V}_K\n$$\n\nThe fraction of total variance preserved by component $j$ (Explained Variance Ratio) is:\n\n$$\n\\text{EVR}_j = \\frac{\\lambda_j}{\\sum_{k=1}^P \\lambda_k} = \\frac{\\lambda_j}{\\text{tr}(\\mathbf{\\Sigma})}\n$$\n\nImplement the full Principal Component Analysis engine via covariance eigendecomposition in NumPy. You will:\n1. Mean-center the feature columns of $\\mathbf{X}$: $\\mathbf{X}_c = \\mathbf{X} - \\bar{\\mathbf{X}}$.\n2. Compute the sample covariance matrix $\\mathbf{\\Sigma} = \\frac{1}{N - 1}\\mathbf{X}_c^T\\mathbf{X}_c$.\n3. Compute eigenvalues and eigenvectors using `np.linalg.eigh` and sort them in descending order.\n4. Extract the top $K$ eigenvectors to form the transformation matrix $\\mathbf{V}_K$.\n5. Project the centered data into low-dimensional space: $\\mathbf{Z} = \\mathbf{X}_c \\mathbf{V}_K$.\n6. Calculate the Explained Variance Ratios $\\text{EVR}_j = \\frac{\\lambda_j}{\\sum \\lambda}$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n| Symbol / Term | Formal Definition | Intuitive Meaning / Role | المعنى والمدلول بالعربية |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{X} \\in \\mathbb{R}^{N \\times P}$ | Zero-centered data matrix | $N$ observations across $P$ demeaned features | مصفوفة البيانات المتمركزة حول الصفر |\n| $\\mathbf{\\Sigma} \\in \\mathbb{R}^{P \\times P}$ | $\\frac{1}{N-1}\\mathbf{X}^T\\mathbf{X}$ | Sample covariance matrix of features | مصفوفة التغاير الإحصائي للمتغيرات |\n| $\\mathbf{u}_1 \\in \\mathbb{R}^P$ | Unit projection vector | Direction of the first principal component | متجه الوحدة لإسقاط المكون الرئيسي الأول |\n| $\\lambda_j$ | $j$-th eigenvalue of $\\mathbf{\\Sigma}$ | Variance captured along eigenvector $\\mathbf{v}_j$ | القيمة الذاتية ومقدار التباين للمكون $j$ |\n| $\\mathbf{v}_j$ | $j$-th eigenvector of $\\mathbf{\\Sigma}$ | Orthonormal Principal Component loading axis | المتجه الذاتي المتعامد ومحور المكون $j$ |\n| $\\mathbf{V}_K \\in \\mathbb{R}^{P \\times K}$ | Top $K$ eigenvectors | Low-dimensional projection transformation matrix | مصفوفة التحويل للإسقاط المنخفض الأبعاد |\n| $\\mathbf{Z} \\in \\mathbb{R}^{N \\times K}$ | $\\mathbf{X}\\mathbf{V}_K$ | Low-dimensional compressed coordinate scores | درجات وإحداثيات المكونات المضغوطة |\n| $\\text{tr}(\\mathbf{\\Sigma})$ | $\\sum_{j=1}^P \\lambda_j$ | Total multivariate variance in the dataset | أثر المصفوفة ومجموع التباين الكلي للبيانات |\n| $\\text{EVR}_j$ | $\\lambda_j / \\sum \\lambda_k$ | Explained Variance Ratio for component $j$ | نسبة التباين المفسر والمحفوظ بالمكون $j$ |\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-pca-dimensionality-reduction",
          "starterCode": "def compute_pca(X: np.ndarray, n_components: int = 2) -> dict[str, object]:\n    \"\"\"\n    Computes Principal Component Analysis via sample covariance eigendecomposition.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Input data matrix.\n    n_components : int\n        Number of top principal components K to retain.\n        \n    Returns\n    -------\n    dict with keys:\n        'Z': Low-dimensional projected coordinates of shape (N, K).\n        'components': Top K orthonormal eigenvectors of shape (K, P).\n        'evr': Explained variance ratios for retained components of shape (K,).\n        'singular_values': Associated singular values.\n    \"\"\"\n    # Step 1: Zero-mean centering of feature columns\n    # Step 2: Unbiased sample covariance matrix: (1 / (N - 1)) * X_c^T X_c\n    # Step 3: Eigendecomposition (eigh is specialized for symmetric matrices)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X = np.array([[1.0, 2.0], [2.0, 4.0], [3.0, 6.0], [4.0, 8.0]]); res = compute_pca(X, n_components=1); f\"{res['evr'][0]:.2f}, {res['Z'].shape}\"",
              "expected": "1.00, (4, 1)"
            },
            {
              "input": "X = np.array([[1.0, 0.0], [-1.0, 0.0], [0.0, 2.0], [0.0, -2.0]]); res = compute_pca(X, n_components=2); f\"{res['evr'][0]:.2f}\"",
              "expected": "0.80"
            }
          ],
          "expectedOutput": "1.00, (4, 1)",
          "variants": {
            "python": {
              "starterCode": "def compute_pca(X: np.ndarray, n_components: int = 2) -> dict[str, object]:\n    \"\"\"\n    Computes Principal Component Analysis via sample covariance eigendecomposition.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Input data matrix.\n    n_components : int\n        Number of top principal components K to retain.\n        \n    Returns\n    -------\n    dict with keys:\n        'Z': Low-dimensional projected coordinates of shape (N, K).\n        'components': Top K orthonormal eigenvectors of shape (K, P).\n        'evr': Explained variance ratios for retained components of shape (K,).\n        'singular_values': Associated singular values.\n    \"\"\"\n    # Step 1: Zero-mean centering of feature columns\n    # Step 2: Unbiased sample covariance matrix: (1 / (N - 1)) * X_c^T X_c\n    # Step 3: Eigendecomposition (eigh is specialized for symmetric matrices)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.00, (4, 1)"
            }
          },
          "solution": "import numpy as np\n\ndef compute_pca(X: np.ndarray, n_components: int = 2) -> dict[str, object]:\n    \"\"\"\n    Computes Principal Component Analysis via sample covariance eigendecomposition.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Input data matrix.\n    n_components : int\n        Number of top principal components K to retain.\n        \n    Returns\n    -------\n    dict with keys:\n        'Z': Low-dimensional projected coordinates of shape (N, K).\n        'components': Top K orthonormal eigenvectors of shape (K, P).\n        'evr': Explained variance ratios for retained components of shape (K,).\n        'singular_values': Associated singular values.\n    \"\"\"\n    N, P = X.shape\n    \n    # Step 1: Zero-mean centering of feature columns\n    mean = np.mean(X, axis=0)\n    X_centered = X - mean\n    \n    # Step 2: Unbiased sample covariance matrix: (1 / (N - 1)) * X_c^T X_c\n    cov_matrix = (X_centered.T @ X_centered) / (N - 1.0)\n    \n    # Step 3: Eigendecomposition (eigh is specialized for symmetric matrices)\n    eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)\n    \n    # Step 4: Sort eigenvalues and eigenvectors in descending order\n    idx = np.argsort(eigenvalues)[::-1]\n    eigenvalues = eigenvalues[idx]\n    eigenvectors = eigenvectors[:, idx]\n    \n    # Step 5: Extract top K components\n    components = eigenvectors[:, :n_components].T # shape (K, P)\n    top_eigenvalues = eigenvalues[:n_components]\n    \n    # Step 6: Low-dimensional projection: Z = X_c @ V_K\n    Z = X_centered @ eigenvectors[:, :n_components]\n    \n    # Step 7: Explained variance ratio: lambda_j / sum(lambda)\n    total_var = float(np.sum(eigenvalues))\n    evr = top_eigenvalues / total_var if total_var > 0 else np.zeros(n_components)\n    \n    return {\n        \"Z\": Z,\n        \"components\": components,\n        \"evr\": evr,\n        \"singular_values\": np.sqrt(np.maximum(top_eigenvalues * (N - 1), 0.0))\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Center columns to zero mean before computing sample covariance matrix (1 / (N - 1)) * X_c^T X_c.",
            "ar": "ركز الأعمدة عند متوسط صفري قبل حساب مصفوفة التغاير (1 / (N - 1)) * X_c^T X_c."
          },
          "tier2": {
            "en": "Use np.linalg.eigh on the symmetric covariance matrix, and sort eigenvalues in descending order.",
            "ar": "استخدم np.linalg.eigh على مصفوفة التغاير المتناظرة، ورتب القيم الذاتية تنازلياً."
          },
          "tier3": {
            "en": "Project centered data Z = X_c @ V_K, and compute explained variance ratio lambda_j / sum(lambda).",
            "ar": "أسقط البيانات المركزة Z = X_c @ V_K، واحسب نسبة التباين المفسر lambda_j / sum(lambda)."
          }
        },
        "narrative": {
          "en": "Implement the computational kernel to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية الحسابية لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "How does the mathematical principle of PCA justify truncating the projection strictly to the first 3 components?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تحليل المكونات الرئيسية (PCA) وتعظيم التباين الهندسي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The dramatic \"scree plot elbow\" at component 3 marks the boundary between structural low-rank signal and isotropic measurement noise. The trailing 4,093 components possess tiny, flat eigenvalues that represent sensor thermal noise, sub-pixel jitter, and ambient lighting fluctuations rather than facial geometry. Retaining only 3 components compresses the data by over $99.9\\%$ while preserving $86.5\\%$ of the genuine anatomical variance, filtering out high-dimensional noise.",
                "ar": "تحدد \"نقطة الانعطاف أو الكوع\" في المخطط البياني للقيم الذاتية الحد الفاصل بين الإشارة الهيكلية الحقيقية والضوضاء العشوائية المتناحية. وتمتلك المكونات الـ 4,093 المتبقية قيماً ذاتية ضئيلة ومسطحة تعبر عن تشويش مجسات الكاميرا والتغيرات العشوائية في الإضاءة المحيطة وليس عن تضاريس الوجه التشريحية. إن الاحتفاظ بالمكونات الثلاثة الأولى يضغط البيانات بأكثر من 99.9% مع الحفاظ على 86.5% من التباين الحقيقي، مما يصفي الضجيج ويرفع جودة التعميم."
              },
              "correct": true,
              "explanation": {
                "en": "PCA isolates the low-rank subspace where signal dominates. The flat tail of eigenvalues indicates an isotropic noise floor; including these trailing components retains noise and invites the curse of dimensionality without adding meaningful discriminative information.",
                "ar": "يعزل PCA الفضاء الجزئي منخفض الرتبة الذي تتركز فيه الإشارة الحقيقية؛ بينما يدل استواء ذيل القيم الذاتية على أرضية ضوضاء عشوائية، والاحتفاظ بها يزيد من التشتت والتعقيد الحسابي دون تقديم أي فائدة معلوماتية."
              }
            },
            {
              "text": {
                "en": "Retaining more than 3 components violates the Eckart-Young-Mirsky matrix approximation theorem whenever the sample size $N$ exceeds 100 images.",
                "ar": "يؤدي الاحتفاظ بأكثر من 3 مكونات إلى خرق مبرهنة إيكارت-يونغ-ميرسكي لتقريب المصفوفات عندما يتجاوز حجم العينة 100 صورة."
              },
              "correct": false,
              "explanation": {
                "en": "The Eckart-Young-Mirsky theorem proves that truncated SVD provides the optimal rank-$K$ approximation for *any* chosen integer $K \\le \\text{rank}(\\mathbf{X})$.",
                "ar": "تثبت مبرهنة إيكارت-يونغ أن التقريب المقتطع يقدم أفضل تقريب لمصفوفة بأي رتبة $K$ تختارها، ولا توجد أي قيود على اختيار 3 مكونات فقط."
              }
            },
            {
              "text": {
                "en": "Eigenvalues strictly smaller than 1.0 are mathematically undefined in Euclidean metric space and cause division-by-zero errors in the projection.",
                "ar": "تعد القيم الذاتية الأقل من 1.0 غير معرفة رياضياً في الفضاء الإقليدي وتسبب أخطاء القسمة على صفر أثناء الإسقاط."
              },
              "correct": false,
              "explanation": {
                "en": "Eigenvalues of a covariance matrix are non-negative real numbers ($\\lambda \\ge 0$); fractional eigenvalues in $(0, 1)$ are completely standard and well-defined.",
                "ar": "القيم الذاتية لمصفوفة التغاير أعداد حقيقية موجبة ($\\lambda \\ge 0$)، والكسور العشرية شائعة وطبيعية تماماً في مصفوفات التباين."
              }
            },
            {
              "text": {
                "en": "Keeping 2,000 components would mathematically destroy the mutual orthogonality of the eigenvector basis matrix $\\mathbf{V}$.",
                "ar": "يؤدي الاحتفاظ بـ 2,000 مكون إلى تدمير التعامد الرياضي بين متجهات الأساس الذاتية للمصفوفة $\\mathbf{V}$."
              },
              "correct": false,
              "explanation": {
                "en": "By the Spectral Theorem, all $P$ eigenvectors of a real symmetric matrix form a mutually orthogonal basis, regardless of how many subsets are retained.",
                "ar": "وفق مبرهنة الطيف، تكون جميع المتجهات الذاتية للمصفوفة المتماثلة متعامدة تماماً على بعضها البعض بغض النظر عن عدد المكونات المختارة."
              }
            }
          ]
        },
        "narrative": {
          "en": "Demonstrate zero-shot concept transfer under novel constraints.",
          "ar": "أثبت استيعاب المفهوم والقدرة على النقل المعرفي تحت قيود جديدة."
        }
      }
    ]
  }
];
