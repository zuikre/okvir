import type { CurriculumModule } from '../types';

export const econometricsModules: CurriculumModule[] = [
  {
    "id": "ols-residual-geometry",
    "title": "Bivariate OLS & The Geometry of Orthogonal Residuals",
    "titleAr": "الانحدار الخطي البسيط وهندسة البواقي المتعامدة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Ordinary Least Squares (OLS) is almost universally introduced as a curve-fitting optimization: drawing a line across a 2D scatterplot to...",
      "ar": "يُقدَّم الانحدار الخطي العادي (OLS) في الغالب كمسألة حسابية لرسم خط يقلل المسافات الرأسية في رسم بياني ثنائي الأبعاد."
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
          "en": "Ordinary Least Squares (OLS) is almost universally introduced as a curve-fitting optimization: drawing a line across a 2D scatterplot to minimize the sum of squared vertical gaps. But this two-dimensional view obscures the deepest, most foundational insight of modern econometrics: **OLS is an orthogonal projection in sample space $\\mathbb{R}^N$**.\n\nImagine collecting data on $N$ people. The observed outcome $\\mathbf{y}$ is not a cloud of points—it is a single high-dimensional vector in an $N$-dimensional universe. Your regressors (like education, experience, and the constant intercept) span a much smaller $K$-dimensional flat subspace $\\text{col}(\\mathbf{X})$. Because $N \\gg K$, the outcome vector $\\mathbf{y}$ almost never lies inside this subspace.\n\nThink of a flagpole standing at an angle on a flat lawn. If the midday sun shines directly from straight above, the shadow cast upon the grass is the fitted value $\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$. The plumb line dropping straight down from the flagpole's tip to its shadow is the residual vector $\\mathbf{e}$. Just as that vertical plumb line is strictly perpendicular ($90^\\circ$) to every blade of grass on the lawn, the OLS residual vector $\\mathbf{e}$ is mathematically perpendicular to every single regressor in $\\mathbf{X}$. Least squares is simply finding the best \"line of sight\" to project high-dimensional reality onto the subspace we can observe.\n\nCrucially, we must demystify what this projection actually accomplishes. Machine learning and statistical curve-fitting ask a purely predictive question: *\"Given a person with 16 years of education, what is our best mathematical guess of their wage?\"* This is passive observation—spotting where the shadow falls on the lawn. Econometrics, by contrast, asks a fundamentally causal question: *\"If we intervened and forced a student to stay in school for another year, how much would their future wage change?\"* Orthogonal projection guarantees optimal linear prediction within your dataset, but it cannot turn correlation into causation. If unobserved factors (like family wealth or innate drive) lurk behind both education and earnings, OLS faithfully projects their combined shadow onto the grass, mistaking correlation for policy impact.",
          "ar": "يُقدَّم الانحدار الخطي العادي (OLS) في الغالب كمسألة حسابية لرسم خط يقلل المسافات الرأسية في رسم بياني ثنائي الأبعاد. لكن هذا التبسيط يحجب الرؤية الهندسية الأكثر عمقًا وأصالة في القياس الاقتصادي: **OLS هو إسقاط متعامد في فضاء العينة ذي الأبعاد الـ $N$**.\n\nعندما نجمع بيانات عن $N$ شخص، فإن المتغير التابع $\\mathbf{y}$ ليس سحابة نقاط، بل هو متجه واحد في فضاء هائل ذي $N$ بعدًا. وتشكل المتغيرات المستقلة (كالتعليم والخبرة والثابت) فضاءً فرعيًا مسطحًا ذا بعد $K$ (حيث $N \\gg K$). ولأن $\\mathbf{y}$ لا يقع عمومًا داخل هذا الفضاء، فإن أفضل تقدير له هو إسقاط ظله العمودي تمامًا.\n\nتخيل سارية علم تميل بزاوية فوق أرضية عشبية مسطحة. عندما تسطع شمس الظهيرة عموديًا من كبد السماء، يكون الظل المنعكس على العشب هو القيم المقدرة $\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$. أما خيط الشاقول المتدلي من قمة السارية إلى قمة الظل فهو متجه البواقي $\\mathbf{e}$. تمامًا كما يشكل خيط الشاقول زاوية قائمة ($90^\\circ$) مع كل عشبة على الأرضية، يتعامد متجه البواقي $\\mathbf{e}$ رياضيًا مع كل متغير مفسر في المصفوفة $\\mathbf{X}$. إن الانحدار الخطي في جوهره هو البحث عن أفضل زاوية رؤية لإسقاط الواقع على الفضاء الذي نستطيع قياسه.\n\nوالأهم من ذلك هو إزالة الغموض الذي يحيط بما يحققه هذا الإسقاط فعليًا. إن تعلم الآلة والإحصاء التقليدي يجيبان عن سؤال تنبؤي بحت: *\"إذا رأينا شخصًا أتم 16 عامًا من التعليم، فما هو أفضل تخمين رياضي لأجره؟\"* هذا مجرد رصد سلبي لموضع سقوط الظل. أما القياس الاقتصادي فيطرح سؤالاً سببيًا جوهريًا: *\"ماذا لو تدخلنا وغيرنا الواقع ومنحنا هذا الشخص عامًا إضافيًا من التعليم، كم سيزداد أجره الحقيقي؟\"* يضمن الإسقاط المتعامد أفضل تنبؤ خطي ممكن داخل العينة، لكنه عاجز بمفرده عن تحويل الترابط إلى سببية. إذا كانت هناك عوامل خفية غير مقاسة (كالخلفية الأسرية أو القدرات الفطرية) تؤثر على التعليم والأجر معًا، فإن OLS سيسقط ظلها المشترك بلا تمييز، مغالطًا بين مجرد الاقتران والتأثير السببي الحقيقي للسياسات."
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
          "en": "The empirical sum of squared residuals objective function minimizes the squared Euclidean length of the error vector:\n\n$$\nS(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{y} + \\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{X} \\boldsymbol{\\beta}\n$$\n\n### Mathematical Derivation of the Normal Equations\n\nTo find the minimizer $\\hat{\\boldsymbol{\\beta}}$, we compute the matrix derivative of $S(\\boldsymbol{\\beta})$ with respect to $\\boldsymbol{\\beta}$ using standard vector calculus rules:\n1. $\\frac{\\partial (\\boldsymbol{\\beta}^T \\mathbf{a})}{\\partial \\boldsymbol{\\beta}} = \\mathbf{a}$\n2. $\\frac{\\partial (\\boldsymbol{\\beta}^T \\mathbf{A} \\boldsymbol{\\beta})}{\\partial \\boldsymbol{\\beta}} = 2\\mathbf{A}\\boldsymbol{\\beta}$ for any symmetric matrix $\\mathbf{A} = \\mathbf{X}^T \\mathbf{X}$.\n\nTaking the gradient:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) = -2\\mathbf{X}^T \\mathbf{y} + 2\\mathbf{X}^T \\mathbf{X}\\boldsymbol{\\beta}\n$$\n\nSetting the gradient to zero yields the celebrated **Normal Equations**:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) = \\mathbf{0} \\implies -2\\mathbf{X}^T(\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}) = \\mathbf{0} \\implies \\mathbf{X}^T \\mathbf{e} = \\mathbf{0}\n$$\n\nThis equation states the core geometric truth: the sample residual vector $\\mathbf{e} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$ is strictly orthogonal to every column vector in $\\mathbf{X}$.\n\nUnder the assumption of full column rank ($\\text{rank}(\\mathbf{X}) = K < N$), the Gram matrix $\\mathbf{X}^T \\mathbf{X}$ is symmetric positive definite and invertible:\n\n$$\n\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}\n$$\n\nThe fitted values and residuals are generated via the symmetric, idempotent **Hat Matrix** ($\\mathbf{P}_X$) and **Annihilator Matrix** ($\\mathbf{M}_X$):\n\n$$\n\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}} = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y} \\equiv \\mathbf{P}_X \\mathbf{y}, \\quad \\mathbf{e} = \\mathbf{y} - \\hat{\\mathbf{y}} = (\\mathbf{I}_N - \\mathbf{P}_X)\\mathbf{y} \\equiv \\mathbf{M}_X \\mathbf{y}\n$$\n\nBecause $\\mathbf{P}_X \\mathbf{P}_X = \\mathbf{P}_X$ and $\\mathbf{M}_X \\mathbf{X} = (\\mathbf{I}_N - \\mathbf{P}_X)\\mathbf{X} = \\mathbf{X} - \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T \\mathbf{X} = \\mathbf{0}$, the annihilator matrix literally annihilates any vector lying in the column space of $\\mathbf{X}$.\n\n* $\\mathbf{y} \\in \\mathbb{R}^{N \\times 1}$: Observed response vector containing the outcome variable for all $N$ economic agents.\n* $\\mathbf{X} \\in \\mathbb{R}^{N \\times K}$: Design matrix containing $K$ regressor columns (including an intercept vector of ones $\\boldsymbol{\\iota}_N$).\n* $\\boldsymbol{\\beta} \\in \\mathbb{R}^{K \\times 1}$: True, unobservable population parameter vector.\n* $\\hat{\\boldsymbol{\\beta}} \\in \\mathbb{R}^{K \\times 1}$: OLS coefficient vector that minimizes the sum of squared residuals.\n* $\\hat{\\mathbf{y}} \\in \\text{col}(\\mathbf{X})$: Orthogonal projection of $\\mathbf{y}$ onto the subspace spanned by the columns of $\\mathbf{X}$.\n* $\\mathbf{e} \\in \\mathbb{R}^{N \\times 1}$: Sample residual vector satisfying $\\mathbf{X}^T \\mathbf{e} = \\mathbf{0}$ by first-order construction.\n* $\\mathbf{P}_X \\in \\mathbb{R}^{N \\times N}$: The projection (hat) matrix with $\\text{rank}(\\mathbf{P}_X) = \\text{tr}(\\mathbf{P}_X) = K$.\n* $\\mathbf{M}_X \\in \\mathbb{R}^{N \\times N}$: The residual maker (annihilator) matrix with $\\text{rank}(\\mathbf{M}_X) = \\text{tr}(\\mathbf{M}_X) = N - K$, satisfying $\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$.\n\nImplement the closed-form Ordinary Least Squares estimator using NumPy. Rather than directly computing `np.linalg.inv`, solve the linear system $(\\mathbf{X}^T \\mathbf{X})\\boldsymbol{\\beta} = \\mathbf{X}^T \\mathbf{y}$ using `np.linalg.solve` to preserve numerical stability and avoid condition-number blowups.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-ols-residual-geometry",
          "starterCode": "def fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors (must have full column rank).\n    y : np.ndarray of shape (N,)\n        Observed response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameter vector of shape (K,)\n        'y_hat': fitted values vector of shape (N,)\n        'residuals': residual errors vector of shape (N,)\n    \"\"\"\n    # Step 1: Form the cross-product matrix X^T X\n    # Step 2: Form the regressor-outcome vector X^T y\n    # Step 3: Solve the normal equations (X^T X) beta = X^T y stably\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors (must have full column rank).\n    y : np.ndarray of shape (N,)\n        Observed response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameter vector of shape (K,)\n        'y_hat': fitted values vector of shape (N,)\n        'residuals': residual errors vector of shape (N,)\n    \"\"\"\n    # Step 1: Form the cross-product matrix X^T X\n    # Step 2: Form the regressor-outcome vector X^T y\n    # Step 3: Solve the normal equations (X^T X) beta = X^T y stably\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[1.0, 2.0]"
            }
          },
          "solution": "import numpy as np\n\ndef fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors (must have full column rank).\n    y : np.ndarray of shape (N,)\n        Observed response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameter vector of shape (K,)\n        'y_hat': fitted values vector of shape (N,)\n        'residuals': residual errors vector of shape (N,)\n    \"\"\"\n    # Step 1: Form the cross-product matrix X^T X\n    XtX = X.T @ X\n    \n    # Step 2: Form the regressor-outcome vector X^T y\n    Xty = X.T @ y\n    \n    # Step 3: Solve the normal equations (X^T X) beta = X^T y stably\n    beta = np.linalg.solve(XtX, Xty)\n    \n    # Step 4: Compute the orthogonal projection (fitted values) y_hat = X beta\n    y_hat = X @ beta\n    \n    # Step 5: Compute the residual vector e = y - y_hat\n    residuals = y - y_hat\n    \n    return {\n        \"beta\": beta,\n        \"y_hat\": y_hat,\n        \"residuals\": residuals,\n    }"
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
      "en": "Once the regression hyperplane is locked into place, researchers ask: How much of the outcome's real-world variation have we actually...",
      "ar": "بمجرد استقرار المستوى الفائق للانحدار، يتبادر للباحث السؤال الأهم: ما هي النسبة الحقيقية التي استطاع النموذج تفسيرها من تباين الظاهرة..."
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
          "en": "Once the regression hyperplane is locked into place, researchers ask: *How much of the outcome's real-world variation have we actually explained?* The Analysis of Variance (ANOVA) decomposition provides the answer by splitting total variation into two strictly perpendicular components using the **Pythagorean theorem in $N$ dimensions**.\n\nThink of the total variation in the outcome as the acoustic energy of an audio recording. The recording consists of a clear musical melody (the signal explained by the regressors, ESS) and unavoidable static hiss (the residual noise, SSR). Because the fitted prediction vector $\\hat{\\mathbf{y}}$ and the residual vector $\\mathbf{e}$ are mutually orthogonal ($90^\\circ$), the squared length of the total signal equals the sum of the squared lengths of the melody plus the hiss! The coefficient of determination, $R^2$, is simply the percentage of total energy accounted for by the melody. Geometrically, $R^2 = \\cos^2(\\theta)$, where $\\theta$ is the angle between the centered outcome vector and its projection.\n\nHowever, $R^2$ is one of the most dangerously misinterpreted metrics in all of empirical science. **A high $R^2$ does not imply causality, and a low $R^2$ does not mean your research is useless!** Adding random noise variables (such as astrological signs or coin flips) will mechanically drive $R^2$ upward because the projection space expands with every additional column. This is why **Adjusted $R^2$ ($\\bar{R}^2$)** enforces a mathematical penalty: it only rises if a newly added variable explains more variation than what would occur purely by random chance.\n\nCrucially, we must untangle the sharp boundary between prediction and causal explanation. In pure predictive machine learning, maximizing $R^2$ is often the primary goal—finding any correlations that help forecast $\\hat{y}$. But in econometrics and policy design, $R^2$ is secondary. Consider a randomized controlled trial testing a life-saving cancer immunotherapy: the regression of patient survival on treatment might yield an $R^2$ of only $0.03$ (3%) because human genetics, environmental exposures, and lifestyle choices create massive residual variance. Yet that $3\\%$ variance reflects an unconfounded, life-saving causal effect! Conversely, regressing children's reading level on shoe size yields a sky-high $R^2 = 0.85$ purely driven by age. Buying larger shoes will not teach a toddler to read. Prediction seeks the shadow; causal inference seeks the hand casting it.",
          "ar": "بمجرد استقرار المستوى الفائق للانحدار، يتبادر للباحث السؤال الأهم: *ما هي النسبة الحقيقية التي استطاع النموذج تفسيرها من تباين الظاهرة المدروسة؟* يقدم تفكيك تحليل التباين (ANOVA) الإجابة عبر تقسيم التباين الإجمالي إلى مركبتين متعامدتين تمامًا بالاعتماد على **مبرهنة فيثاغورس في فضاء الأبعاد الـ $N$**.\n\nتخيل التباين الإجمالي في المتغير التابع كطاقة صوتية في تسجيل إذاعي. يتكون هذا التسجيل من لحن موسيقي واضح ومفهوم (التباين الذي فسره النموذج ESS) وتشويش إلكتروني مصاحب (بواقي الخطأ SSR). ونظرًا لأن متجه القيم المقدرة $\\hat{\\mathbf{y}}$ ومتجه البواقي $\\mathbf{e}$ متعامدان هندسيًا بزاوية قائمة ($90^\\circ$)، فإن مربع طول الإشارة الكلية يساوي تمامًا مجموع مربعي طولي اللحن والتشويش! معامل التحديد $R^2$ هو ببساطة النسبة المئوية للطاقة التي فسرها اللحن، وهندسيًا يمثل $R^2 = \\cos^2(\\theta)$، حيث $\\theta$ هي الزاوية بين المتجه الممركز للنتيجة ومسقطه.\n\nومع ذلك، يُعد $R^2$ من أكثر المقاييس إساءةً للفهم في البحث التطبيقي؛ **فالقيمة المرتفعة لـ $R^2$ لا تعني أبدًا وجود علاقة سببية، والقيمة المنخفضة لا تعني فشل الدراسة!** إن إضافة متغيرات عشوائية تافهة (كأبراج الحظ أو تقلبات الطقس العشوائية) ترفع $R^2$ ميكانيكيًا لأن فضاء الإسقاط يتسع مع كل عمود جديد. لهذا السبب وُضع **معامل التحديد المعدل ($\\bar{R}^2$)**؛ لفرض غرامة رياضية على درجات الحرية المفقودة، فلا يرتفع إلا إذا قدم المتغير الجديد إضافة حقيقية تتجاوز الصدفة المحضة.\n\nوهنا تتجلى الهوة العميقة بين التنبؤ والسببية: في تعلم الآلة التنبؤي، يكون تعظيم $R^2$ هدفًا رئيسيًا للتخمين الدقيق. أما في الاقتصاد القياسي وصنع السياسات، فإن $R^2$ ثانوي تمامًا. تخيل تجربة عشوائية منضبطة لعقار مضاد للسرطان؛ قد يكون معامل التحديد $R^2$ مساويًا لـ $0.03$ فقط (3%) لأن الفروق البيولوجية ونمط الحياة بين المرضى شاسعة، ومع ذلك فإن هذا الأثر الصغير سببي خالص وينقذ آلاف الأرواح! في المقابل، لو قمنا بانحدار مهارة القراءة عند الأطفال على مقاس أحذيتهم، سنحصل على $R^2 = 0.85$ بسبب عامل العمر المشترك، ولكن شراء أحذية أكبر لن يجعل الرضيع يقرأ شكسبير! التنبؤ يرصد حركة الظلال، بينما السببية تفحص اليد التي تحركها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "y_i - \\bar{y} = (\\hat{y}_i - \\bar{y}) + (y_i - \\hat{y}_i) = (\\hat{y}_i - \\bar{y}) + e_i",
        "formulaNote": {
          "en": "Core invariant for Goodness-of-Fit, R-squared, and the ANOVA Decomposition.",
          "ar": "الخاصية الرياضية الجوهرية لـ جودة التوفيق ومعامل التحديد والتفكيك التبايني."
        },
        "narrative": {
          "en": "Squaring both sides and summing across all observations $i = 1, \\dots, N$:\n\n$$\n\\sum_{i=1}^N (y_i - \\bar{y})^2 = \\sum_{i=1}^N (\\hat{y}_i - \\bar{y})^2 + \\sum_{i=1}^N e_i^2 + 2 \\sum_{i=1}^N (\\hat{y}_i - \\bar{y})e_i\n$$\n\nWe now prove that the cross-product term is identically zero:\n\n$$\n\\sum_{i=1}^N (\\hat{y}_i - \\bar{y})e_i = \\sum_{i=1}^N \\hat{y}_i e_i - \\bar{y} \\sum_{i=1}^N e_i = \\hat{\\mathbf{y}}^T \\mathbf{e} - \\bar{y} (\\boldsymbol{\\iota}_N^T \\mathbf{e})\n$$\n\n1. By the OLS Normal Equations, $\\mathbf{X}^T \\mathbf{e} = \\mathbf{0}$. Because $\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$, we have $\\hat{\\mathbf{y}}^T \\mathbf{e} = (\\mathbf{X}\\hat{\\boldsymbol{\\beta}})^T \\mathbf{e} = \\hat{\\boldsymbol{\\beta}}^T (\\mathbf{X}^T \\mathbf{e}) = \\hat{\\boldsymbol{\\beta}}^T \\mathbf{0} = 0$.\n2. Because the regression includes an intercept column $\\boldsymbol{\\iota}_N \\in \\text{col}(\\mathbf{X})$, the first normal equation is $\\boldsymbol{\\iota}_N^T \\mathbf{e} = \\sum_{i=1}^N e_i = 0$.\n\nTherefore, the cross-product vanishes completely:\n\n$$\n\\sum_{i=1}^N (y_i - \\bar{y})^2 = \\sum_{i=1}^N (\\hat{y}_i - \\bar{y})^2 + \\sum_{i=1}^N e_i^2 \\iff \\text{TSS} = \\text{ESS} + \\text{SSR}\n$$\n\nThe coefficient of determination $R^2$ is defined as the explained ratio:\n\n$$\nR^2 \\equiv \\frac{\\text{ESS}}{\\text{TSS}} = 1 - \\frac{\\text{SSR}}{\\text{TSS}} \\in [0, 1]\n$$\n\nTo penalize the artificial inflation caused by adding extra regressors, the degrees-of-freedom **Adjusted $R^2$** ($\\bar{R}^2$) scales by degrees of freedom:\n\n$$\n\\bar{R}^2 \\equiv 1 - \\frac{\\text{SSR} / (N - p - 1)}{\\text{TSS} / (N - 1)} = 1 - (1 - R^2)\\left(\\frac{N - 1}{N - p - 1}\\right)\n$$\n\nA celebrated econometric result shows that adding a regressor increases $\\bar{R}^2$ if and only if the absolute value of its $t$-statistic exceeds 1 ($|t| > 1$).\n\n* $\\text{TSS}$ (Total Sum of Squares): Total sample variation of the outcome $y_i$ around the grand mean $\\bar{y}$, possessing $N - 1$ degrees of freedom.\n* $\\text{ESS}$ (Explained Sum of Squares): Variation captured by the fitted model predictions $\\hat{y}_i$ around the grand mean $\\bar{y}$, possessing $p$ degrees of freedom.\n* $\\text{SSR}$ (Sum of Squared Residuals): Unexplained variance of the residuals $e_i = y_i - \\hat{y}_i$, possessing $N - p - 1$ degrees of freedom.\n* $N$: Total number of observations in the sample.\n* $p$: Number of explanatory regressor slopes (excluding the constant intercept).\n* $R^2$: Fraction of sample variance explained by the regression plane ($0 \\le R^2 \\le 1$ when an intercept is included).\n* $\\bar{R}^2$: Adjusted coefficient of determination, which can be strictly less than $R^2$ and can even become negative if regressors add pure noise.\n\nImplement the full ANOVA variance decomposition and compute both $R^2$ and Adjusted $R^2$ in NumPy. Ensure your degrees of freedom correctly separate the total sample size $N$ from the slope count $p$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-goodness-of-fit-r-squared",
          "starterCode": "def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    \"\"\"\n    Computes ANOVA variance components, R^2, and adjusted R^2.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target values.\n    y_hat : np.ndarray of shape (N,)\n        Model fitted values.\n    p : int\n        Number of explanatory slopes (regressors excluding the constant intercept).\n        \n    Returns\n    -------\n    dict with keys:\n        'tss': float, Total Sum of Squares\n        'ess': float, Explained Sum of Squares\n        'ssr': float, Sum of Squared Residuals\n        'r2': float, Coefficient of determination\n        'adj_r2': float, Degrees-of-freedom adjusted R^2\n    \"\"\"\n    # Step 1: Compute Total Sum of Squares (variation about the mean)\n    # Step 2: Compute Explained Sum of Squares\n    # Step 3: Compute Residual Sum of Squares (squared length of error vector)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    \"\"\"\n    Computes ANOVA variance components, R^2, and adjusted R^2.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target values.\n    y_hat : np.ndarray of shape (N,)\n        Model fitted values.\n    p : int\n        Number of explanatory slopes (regressors excluding the constant intercept).\n        \n    Returns\n    -------\n    dict with keys:\n        'tss': float, Total Sum of Squares\n        'ess': float, Explained Sum of Squares\n        'ssr': float, Sum of Squared Residuals\n        'r2': float, Coefficient of determination\n        'adj_r2': float, Degrees-of-freedom adjusted R^2\n    \"\"\"\n    # Step 1: Compute Total Sum of Squares (variation about the mean)\n    # Step 2: Compute Explained Sum of Squares\n    # Step 3: Compute Residual Sum of Squares (squared length of error vector)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    \"\"\"\n    Computes ANOVA variance components, R^2, and adjusted R^2.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target values.\n    y_hat : np.ndarray of shape (N,)\n        Model fitted values.\n    p : int\n        Number of explanatory slopes (regressors excluding the constant intercept).\n        \n    Returns\n    -------\n    dict with keys:\n        'tss': float, Total Sum of Squares\n        'ess': float, Explained Sum of Squares\n        'ssr': float, Sum of Squared Residuals\n        'r2': float, Coefficient of determination\n        'adj_r2': float, Degrees-of-freedom adjusted R^2\n    \"\"\"\n    N = len(y)\n    y_bar = float(np.mean(y))\n    \n    # Step 1: Compute Total Sum of Squares (variation about the mean)\n    tss = float(np.sum((y - y_bar) ** 2))\n    \n    # Step 2: Compute Explained Sum of Squares\n    ess = float(np.sum((y_hat - y_bar) ** 2))\n    \n    # Step 3: Compute Residual Sum of Squares (squared length of error vector)\n    ssr = float(np.sum((y - y_hat) ** 2))\n    \n    # Step 4: Compute unadjusted R^2\n    r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0\n    \n    # Step 5: Compute Adjusted R^2 with degrees of freedom correction\n    df_tot = N - 1\n    df_res = N - p - 1\n    \n    if df_res > 0 and tss > 0:\n        adj_r2 = 1.0 - ((ssr / df_res) / (tss / df_tot))\n    else:\n        adj_r2 = 0.0\n        \n    return {\n        \"tss\": tss,\n        \"ess\": ess,\n        \"ssr\": ssr,\n        \"r2\": r2,\n        \"adj_r2\": adj_r2,\n    }"
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
      "en": "Why do empirical researchers and econometricians almost universally start their investigations with Ordinary Least Squares rather than some...",
      "ar": "لماذا يبدأ علماء الاقتصاد القياسي والباحثون التطبيقيون دراساتهم دائمًا بمقدر المربعات الصغرى OLS بدلاً من أي مقدر آخر؟ هل يمتلك OLS قدرات..."
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
          "en": "Why do empirical researchers and econometricians almost universally start their investigations with Ordinary Least Squares rather than some alternative estimator? Is OLS somehow magical?\n\nThe **Gauss-Markov Theorem** gives the definitive mathematical answer: under five structural conditions (Linearity, Full Rank, Strict Exogeneity, Homoskedasticity, and No Serial Correlation), the OLS estimator is **BLUE: Best Linear Unbiased Estimator**.\n\nThink of a competitive archery tournament where the archers are trying to hit the true population parameter bullseye $\\boldsymbol{\\beta}$.\n* **Unbiased** means that across repeated random samples from the population, an archer's arrows don't systematically drift to the left, right, high, or low—the center of gravity of all their shots lands squarely on the center of the bullseye ($\\mathbb{E}[\\hat{\\boldsymbol{\\beta}}] = \\boldsymbol{\\beta}$).\n* **Best** means minimum variance. Among all conceivable estimators that are linear in $\\mathbf{y}$ and unbiased, OLS has the tightest possible grouping of arrows. Any other linear unbiased estimator (such as throwing away half the data or taking simple endpoint slopes) will have a larger spread.\n\nCrucially, **the Gauss-Markov Theorem does not assume or require that errors follow a normal distribution!** The error terms can be skewed, multimodal, or uniform; as long as the five Gauss-Markov moments hold, OLS reigns supreme as the most efficient linear unbiased estimator possible.\n\nYet we must draw a vital line between statistical optimality and causal validity. In predictive machine learning, unbiasedness is often sacrificed deliberately: techniques like Ridge regression and LASSO intentionally introduce bias to shrink variance and improve out-of-sample predictions. In econometrics, however, unbiasedness is sacred because our primary goal is not merely forecasting $\\hat{y}$, but uncovering the causal mechanism $\\beta = \\frac{\\partial \\mathbb{E}[y \\mid do(x)]}{\\partial x}$. If strict exogeneity $\\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}] = \\mathbf{0}$ fails because of omitted confounders or reverse feedback, OLS loses its unbiasedness entirely. An estimator that is biased is not BLUE—it is simply shooting at the wrong target with false confidence.",
          "ar": "لماذا يبدأ علماء الاقتصاد القياسي والباحثون التطبيقيون دراساتهم دائمًا بمقدر المربعات الصغرى OLS بدلاً من أي مقدر آخر؟ هل يمتلك OLS قدرات خارقة؟\n\nتجيب **مبرهنة غاوس-ماركوف (Gauss-Markov Theorem)** عن هذا التساؤل إجابة رياضية حاسمة: في ظل خمسة شروط هيكلية (الخطية، الرتبة الكاملة، الاستقلال الخارجي الصارم، تجانس التباين، وغياب الارتباط الذاتي للأخطاء)، يكون مقدر OLS هو **BLUE: Best Linear Unbiased Estimator** (أفضل مقدر خطي غير متحيّز).\n\nتخيل بطولة رماية بالسهام حيث يحاول الرماة إصابة نقطة الهدف الحقيقية للمجتمع $\\boldsymbol{\\beta}$:\n* **غير متحيّز (Unbiased)** تعني أنه عبر العينات العشوائية المتكررة، لا تنحرف سهام الرامي بانتظام نحو اليمين أو اليسار أو الأعلى أو الأسفل؛ مركز ثقل جميع تسديداته يقع تمامًا في قلب الهدف ($\\mathbb{E}[\\hat{\\boldsymbol{\\beta}}] = \\boldsymbol{\\beta}$).\n* **الأفضل (Best)** تعني أصغر تباين إحصائي ممكن (Minimum Variance). من بين جميع المقدرات الخطية غير المتحيزة التي يمكن ابتكارها، يمتلك OLS التجمع الأكثر إحكامًا وتماسكًا للسهام. وأي مقدر خطي بديل غير متحيّز سيكون أكثر تشتتًا وتذبذبًا.\n\nوالأمر الأكثر إثارة للإعجاب أن **مبرهنة غاوس-ماركوف لا تفترض إطلاقًا أن الأخطاء تتبع التوزيع الطبيعي!** يمكن للأخطاء أن تكون ملتوية أو ثنائية المنوال؛ فما دامت شروط غاوس-ماركوف الخمسة متحققة، يظل OLS المقدر الخطي الأكثر كفاءة ودقة بلا منازع.\n\nومع ذلك، يجب أن نميز بدقة متناهية بين الكفاءة الإحصائية والصلاحية السببية. في تعلم الآلة التنبؤي، يضحي المهندسون بشرط عدم التحيز عمدًا (كما في انحدار ريدج ولوسو) لتقليل التباين وتحسين دقة التنبؤ خارج العينة. أما في الاقتصاد القياسي، فإن عدم التحيز هو حجر الزاوية؛ لأن غايتنا ليست مجرد توقع المستقبل السلبي، بل قياس أثر التدخل والسياسات ($\\beta$). وإذا اختل شرط الاستقلال الخارجي الصارم $\\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}] = \\mathbf{0}$ بسبب متغيرات محذوفة أو سببية عكسية، يسقط عدم التحيز تمامًا، وحينها لا يكون المقدر \"أفضل\" ولا \"غير متحيّز\"، بل يصبح راميًا يسدد بدقة متناهية نحو الهدف الخاطئ!"
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
          "en": "Taking expectations conditional on $\\mathbf{X}$ establishes **unbiasedness**:\n\n$$\n\\mathbb{E}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = \\boldsymbol{\\beta} + (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}] = \\boldsymbol{\\beta}\n$$\n\nThe exact parameter variance-covariance matrix is given by:\n\n$$\n\\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T (\\sigma^2 \\mathbf{I}_N) \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1} = \\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\n### Mathematical Proof of the Gauss-Markov Optimality (BLUE)\n\nLet $\\tilde{\\boldsymbol{\\beta}} = \\mathbf{C}\\mathbf{y}$ be any alternative linear estimator, where $\\mathbf{C}$ is a $K \\times N$ matrix. Define $\\mathbf{D} \\equiv \\mathbf{C} - (\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T$, so that:\n\n$$\n\\tilde{\\boldsymbol{\\beta}} = \\left( (\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T + \\mathbf{D} \\right) \\mathbf{y}\n$$\n\nTaking conditional expectations:\n\n$$\n\\mathbb{E}[\\tilde{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = \\left( (\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T + \\mathbf{D} \\right)\\mathbf{X}\\boldsymbol{\\beta} = \\boldsymbol{\\beta} + \\mathbf{D}\\mathbf{X}\\boldsymbol{\\beta}\n$$\n\nFor $\\tilde{\\boldsymbol{\\beta}}$ to be unbiased for all possible parameter vectors $\\boldsymbol{\\beta}$, we must have $\\mathbf{D}\\mathbf{X} = \\mathbf{0}_{K \\times K}$.\n\nNow compute the conditional variance-covariance matrix of $\\tilde{\\boldsymbol{\\beta}}$:\n\n$$\n\\mathbb{V}[\\tilde{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = \\mathbf{C} (\\sigma^2 \\mathbf{I}_N) \\mathbf{C}^T = \\sigma^2 \\mathbf{C}\\mathbf{C}^T\n$$\n\nExpanding $\\mathbf{C}\\mathbf{C}^T$:\n\n$$\n\\mathbf{C}\\mathbf{C}^T = \\left( (\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T + \\mathbf{D} \\right)\\left( \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} + \\mathbf{D}^T \\right)\n$$\n\n$$\n= (\\mathbf{X}^T \\mathbf{X})^{-1} + (\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T \\mathbf{D}^T + \\mathbf{D}\\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} + \\mathbf{D}\\mathbf{D}^T\n$$\n\nSince $\\mathbf{D}\\mathbf{X} = \\mathbf{0}$, the cross-terms vanish completely ($\\mathbf{D}\\mathbf{X} = \\mathbf{0} \\implies \\mathbf{X}^T \\mathbf{D}^T = \\mathbf{0}$):\n\n$$\n\\mathbb{V}[\\tilde{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = \\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1} + \\sigma^2 \\mathbf{D}\\mathbf{D}^T = \\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] + \\sigma^2 \\mathbf{D}\\mathbf{D}^T\n$$\n\nBecause $\\mathbf{D}\\mathbf{D}^T$ is a Gram matrix, it is guaranteed to be positive semi-definite ($\\mathbf{z}^T \\mathbf{D}\\mathbf{D}^T \\mathbf{z} = \\|\\mathbf{D}^T \\mathbf{z}\\|_2^2 \\ge 0$ for any vector $\\mathbf{z}$). Thus, $\\mathbb{V}[\\tilde{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] \\ge \\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}]$ in the Loewner ordering, with equality holding if and only if $\\mathbf{D} = \\mathbf{0}$ (i.e. $\\tilde{\\boldsymbol{\\beta}} \\equiv \\hat{\\boldsymbol{\\beta}}$). OLS is uniquely the Best Linear Unbiased Estimator!\n\nSince the population variance $\\sigma^2$ is unknown, we estimate it with the sample residual variance $s^2$:\n\n$$\ns^2 = \\frac{\\mathbf{e}^T \\mathbf{e}}{N - K}, \\quad \\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}) = s^2 (\\mathbf{X}^T \\mathbf{X})^{-1}, \\quad \\text{SE}(\\hat{\\beta}_j) = \\sqrt{\\big[\\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}})\\big]_{jj}}\n$$\n\n* $\\boldsymbol{\\varepsilon} \\in \\mathbb{R}^N$: Unobservable population error term vector.\n* $\\sigma^2$: Constant population error variance ($\\sigma^2 = \\mathbb{E}[\\varepsilon_i^2 \\mid \\mathbf{X}]$).\n* $\\mathbf{I}_N$: $N \\times N$ identity matrix representing spherical disturbance covariance.\n* $s^2$: Unbiased sample estimator of $\\sigma^2$ with $N - K$ degrees of freedom in the denominator.\n* $\\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}]$: $K \\times K$ variance-covariance matrix of the estimated regression parameters.\n* $\\text{SE}(\\hat{\\beta}_j)$: Estimated standard error of the $j$-th coefficient, measuring sampling volatility.\n* $t_j = \\hat{\\beta}_j / \\text{SE}(\\hat{\\beta}_j)$: Empirical $t$-statistic for testing the null hypothesis $H_0: \\beta_j = 0$.\n\nImplement the calculation of the homoskedastic OLS parameter variance-covariance matrix, standard errors, and test statistics using vectorized NumPy operations.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gauss-markov-blue-theorem",
          "starterCode": "def compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Computes homoskedastic OLS parameter variance-covariance, SEs, and t-stats.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (full column rank).\n    y : np.ndarray of shape (N,)\n        Response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': np.ndarray of shape (K,)\n        's2': float, unbiased residual variance estimate\n        'vcov': np.ndarray of shape (K, K), parameter covariance matrix\n        'se': np.ndarray of shape (K,), standard errors of coefficients\n        't_stats': np.ndarray of shape (K,), t-statistics against zero\n    \"\"\"\n    # Step 1: Solve for OLS beta coefficients\n    # Step 2: Compute sample residuals and residual sum of squares\n    # Step 3: Compute unbiased error variance s^2 with N - K degrees of freedom\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Computes homoskedastic OLS parameter variance-covariance, SEs, and t-stats.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (full column rank).\n    y : np.ndarray of shape (N,)\n        Response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': np.ndarray of shape (K,)\n        's2': float, unbiased residual variance estimate\n        'vcov': np.ndarray of shape (K, K), parameter covariance matrix\n        'se': np.ndarray of shape (K,), standard errors of coefficients\n        't_stats': np.ndarray of shape (K,), t-statistics against zero\n    \"\"\"\n    # Step 1: Solve for OLS beta coefficients\n    # Step 2: Compute sample residuals and residual sum of squares\n    # Step 3: Compute unbiased error variance s^2 with N - K degrees of freedom\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Computes homoskedastic OLS parameter variance-covariance, SEs, and t-stats.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (full column rank).\n    y : np.ndarray of shape (N,)\n        Response vector.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': np.ndarray of shape (K,)\n        's2': float, unbiased residual variance estimate\n        'vcov': np.ndarray of shape (K, K), parameter covariance matrix\n        'se': np.ndarray of shape (K,), standard errors of coefficients\n        't_stats': np.ndarray of shape (K,), t-statistics against zero\n    \"\"\"\n    N, K = X.shape\n    \n    # Step 1: Solve for OLS beta coefficients\n    XtX = X.T @ X\n    Xty = X.T @ y\n    beta = np.linalg.solve(XtX, Xty)\n    \n    # Step 2: Compute sample residuals and residual sum of squares\n    residuals = y - X @ beta\n    ssr = float(np.sum(residuals ** 2))\n    \n    # Step 3: Compute unbiased error variance s^2 with N - K degrees of freedom\n    df = N - K\n    s2 = ssr / df if df > 0 else 0.0\n    \n    # Step 4: Compute parameter variance-covariance matrix s^2 * (X^T X)^(-1)\n    XtX_inv = np.linalg.inv(XtX)\n    vcov = s2 * XtX_inv\n    \n    # Step 5: Extract standard errors (square root of diagonal elements)\n    se = np.sqrt(np.maximum(np.diag(vcov), 0.0))\n    \n    # Step 6: Compute t-statistics\n    t_stats = np.where(se > 0, beta / se, 0.0)\n    \n    return {\n        \"beta\": beta,\n        \"s2\": s2,\n        \"vcov\": vcov,\n        \"se\": se,\n        \"t_stats\": t_stats,\n    }"
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
      "en": "In textbook econometrics, every observation's error term is assumed to share the exact same variance $\\sigma^2$ (homoskedasticity).",
      "ar": "في كتب الاقتصاد القياسي المدرسية، يُفترض أن لجميع أخطاء المشاهدات التباين نفسه $\\sigma^2$ (تجانس التباين)."
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
          "en": "In textbook econometrics, every observation's error term is assumed to share the exact same variance $\\sigma^2$ (homoskedasticity). But in the living, breathing economy, **dispersion is almost never uniform**.\n\nConsider household spending on restaurant dining across income levels. Low-income households spend between $\\$10$ and $\\$50$ a week; their behavior is tightly constrained by a tight budget, producing small error variance. But billionaire households spend anywhere from $\\$50$ to $\\$50,000$ a week—some eat at local diners, while others order vintage champagne every night. As income increases, the dispersion of the error term fans out like an open trumpet. This unequal variance is **Heteroskedasticity**.\n\nWhen heteroskedasticity is present, what breaks down?\n* The good news: OLS point estimates $\\hat{\\boldsymbol{\\beta}}$ remain **unbiased and consistent**. The line still passes through the center of gravity of the data.\n* The catastrophic news: The textbook standard errors $\\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$ are **completely invalid**. They typically underestimate sampling variance, leading to artificially narrow confidence intervals, inflated $t$-statistics, and false discoveries.\n\nIn 1980, Halbert White revolutionized empirical economics with the **Sandwich Estimator**. Think of a culinary sandwich:\n* The **Outer Bread**: The classical projection matrix $(\\mathbf{X}^T \\mathbf{X})^{-1}$.\n* The **Inner Meat**: An empirical core filled with each observation's squared residual $e_i^2$.\nBy wrapping the outer bread around the empirical meat, White's estimator provides standard errors that remain asymptotically valid *without requiring you to know or model the true underlying variance structure*.\n\nCrucially, we must dispel one of the most widespread delusions in empirical research: **robust standard errors do NOT make a regression causal!** In predictive machine learning, if errors fan out with income, a model still estimates the conditional expectation $\\mathbb{E}[y \\mid \\mathbf{x}]$ consistently; prediction cares primarily about minimizing mean squared forecast error. But in econometrics and policy analysis, a troubling number of analysts believe that clicking `robust` in their statistical software somehow immunizes them against confounding. It does not. Heteroskedasticity-robust errors address *sampling uncertainty*—answering the predictive question: *\"Given our sample from this population, how noisy is our estimate across different draws?\"* They do not address *causal identification*—answering: *\"What would happen if the government actively intervened?\"* If CEO compensation is endogenous due to unobserved corporate governance quality, your point estimate $\\hat{\\beta}$ remains thoroughly biased and misleading, even if your sandwich standard errors are mathematically flawless.",
          "ar": "في كتب الاقتصاد القياسي المدرسية، يُفترض أن لجميع أخطاء المشاهدات التباين نفسه $\\sigma^2$ (تجانس التباين). لكن في الواقع الاقتصادي الحي، **لا يكون التشتت متساويًا على الإطلاق**.\n\nتأمل مثلاً إنفاق الأسر على ارتياد المطاعم بحسب مستوى الدخل. الأسر محدودة الدخل تنفق بين 10 و 50 دولارًا أسبوعيًا؛ ميزانيتها المقيدة تجعل تباين أخطائها ضئيلاً ومحكومًا. أما الأسر فاحشة الثراء فيتراوح إنفاقها بين 50 و 50,000 دولار أسبوعيًا؛ فبعضهم يفضل وجبات متواضعة وبعضهم ينفق ببذخ يومي. مع زيادة الدخل، يتسع انتشار الأخطاء وتشتتها كالمروحة المفتوحة. هذا التشتت غير المتساوي هو **عدم تجانس التباين (Heteroskedasticity)**.\n\nعند وجود عدم تجانس التباين، ما الذي يتأثر وما الذي ينجو؟\n* النبأ السار: تظل معاملات الانحدار $\\hat{\\boldsymbol{\\beta}}$ **غير متحيّزة ومتسقة**. فالخط ما زال يمر عبر مركز الثقل الحقيقي للبيانات.\n* النبأ الكارثي: تنهار الأخطاء المعيارية التقليدية $\\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$ **وتفقد مصداقيتها تمامًا**. فهي تقلل التباين الحقيقي بصورة مضللة، مما ينتج فترات ثقة ضيقة وقيم $t$ متضخمة تمنح دلالة إحصائية زائفة لمتغيرات لا أثر لها.\n\nفي عام 1980، أحدث هالبرت هوايت ثورة بابتكار **مقدر الساندويتش المتين (Sandwich Estimator)**:\n* **شريحتا الخبز الخارجيتان**: مصفوفة الإسقاط الكلاسيكية $(\\mathbf{X}^T \\mathbf{X})^{-1}$.\n* **حشوة اللحم الداخلية**: قلب تجريبي مبني من مربعات البواقي الفعلية لكل مشاهدة $e_i^2$.\nبإحاطة الحشوة الداخلية بشريحتي الخبز، يوفر مقدر هوايت أخطاء معيارية متسقة وموثوقة تقارب الحقيقة، *دون الحاجة إلى معرفة الصيغة الرياضية الحقيقية لتباين الأخطاء*.\n\nوالأهم من ذلك هو تفنيد وهم شائع يقع فيه كثير من الممارسين: **الأخطاء المعيارية المتينة لا تحل مشكلة السببية إطلاقًا!** في تعلم الآلة التنبؤي، يركز النموذج على جودة التنبؤ وتوقع النتيجة، وتظل نقطة التنبؤ غير متأثرة بتشتت التباين. لكن في الاستدلال السببي وصنع السياسات، يظن البعض خطأً أن تفعيل خيار الأخطاء المتينة (`robust`) في البرمجيات يحمي النموذج من انحياز المتغيرات المحذوفة أو يحوله إلى علاقة سببية. الحقيقة أن مقدر هوايت يجيب عن سؤال إحصائي تنبؤي: *\"ما مدى حساسية تقديراتنا لاختلاف عينات المجتمع؟\"* لكنه يعجز عن الإجابة عن السؤال السببي: *\"ماذا يحدث لو تدخلنا وغيرنا الواقع؟\"* إذا كان النموذج يعاني من متغير محذوف، فإن معامل الانحدار $\\hat{\\beta}$ سيظل منحازًا ومضللاً، حتى لو كانت أخطاؤه المعيارية محسوبة بأدق صيغ الساندويتش الرياضية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\boldsymbol{\\Omega} \\equiv \\mathbb{V}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}] = \\begin{bmatrix} \\sigma_1^2 & 0 & \\dots & 0 \\\\ 0 & \\sigma_2^2 & \\dots & 0 \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ 0 & 0 & \\dots & \\sigma_N^2 \\end{bmatrix}",
        "formulaNote": {
          "en": "Core invariant for Heteroskedasticity & The White HC0-HC3 Sandwich Estimator.",
          "ar": "الخاصية الرياضية الجوهرية لـ عدم تجانس التباين ومقدر الساندويتش المتين لهوايت."
        },
        "narrative": {
          "en": "Propagating this variance into the OLS sampling expression $\\hat{\\boldsymbol{\\beta}} - \\boldsymbol{\\beta} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\boldsymbol{\\varepsilon}$ yields the exact covariance structure:\n\n$$\n\\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\boldsymbol{\\Omega} \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\n### Asymptotic Derivation of the White Sandwich\n\nBy the Central Limit Theorem, scaling by $\\sqrt{N}$ yields:\n\n$$\n\\sqrt{N}(\\hat{\\boldsymbol{\\beta}} - \\boldsymbol{\\beta}) = \\left(\\frac{1}{N}\\mathbf{X}^T \\mathbf{X}\\right)^{-1} \\frac{1}{\\sqrt{N}}\\sum_{i=1}^N \\mathbf{x}_i \\varepsilon_i \\xrightarrow{d} \\mathcal{N}\\left(\\mathbf{0}, \\mathbf{Q}^{-1} \\boldsymbol{\\Sigma} \\mathbf{Q}^{-1}\\right)\n$$\n\nwhere $\\mathbf{Q} \\equiv \\text{plim} \\frac{1}{N}\\mathbf{X}^T \\mathbf{X}$ and $\\boldsymbol{\\Sigma} \\equiv \\text{plim} \\frac{1}{N}\\sum_{i=1}^N \\sigma_i^2 \\mathbf{x}_i \\mathbf{x}_i^T$.\n\nWhite (1980) proved that although estimating all $N$ unknown individual variances $\\sigma_i^2$ is impossible, the sample average middle matrix converges in probability:\n\n$$\n\\frac{1}{N}\\sum_{i=1}^N e_i^2 \\mathbf{x}_i \\mathbf{x}_i^T \\xrightarrow{p} \\boldsymbol{\\Sigma}\n$$\n\nThis gives the consistent **HC0 Sandwich Estimator**:\n\n$$\n\\mathbf{V}_{\\text{HC0}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\left( \\sum_{i=1}^N e_i^2 \\mathbf{x}_i \\mathbf{x}_i^T \\right) (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\nTo adjust for finite-sample leverage and small-sample downward bias:\n* **HC1** (MacKinnon & White 1985): Multiplies HC0 by $\\frac{N}{N - K}$.\n* **HC2**: Scales each residual by its leverage factor $1 - h_{ii}$, where $h_{ii} = [\\mathbf{P}_X]_{ii}$: $e_{i,\\text{HC2}}^2 = \\frac{e_i^2}{1 - h_{ii}}$.\n* **HC3**: Jackknife-inspired approximation dividing by $(1 - h_{ii})^2$, recommended for small samples ($N < 250$).\n\n* $\\boldsymbol{\\Omega} \\in \\mathbb{R}^{N \\times N}$: True diagonal population error variance matrix with diagonal entries $\\sigma_i^2 = \\mathbb{E}[\\varepsilon_i^2 \\mid \\mathbf{x}_i]$.\n* $\\mathbf{x}_i \\in \\mathbb{R}^{K \\times 1}$: Column vector of regressors for observation $i$ (transposed row from $\\mathbf{X}$).\n* $e_i = y_i - \\mathbf{x}_i^T \\hat{\\boldsymbol{\\beta}}$: Sample OLS residual for unit $i$.\n* $h_{ii} = \\mathbf{x}_i^T (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{x}_i$: Leverage score measuring the geometric influence of observation $i$.\n* $\\sum_{i=1}^N e_i^2 \\mathbf{x}_i \\mathbf{x}_i^T$: The empirical middle \"meat\" matrix of the sandwich.\n* $(\\mathbf{X}^T \\mathbf{X})^{-1}$: The outer \"bread\" matrices that project the variance into parameter space.\n* $\\text{HC0}$: Halbert White's asymptotic heteroskedasticity-consistent variance estimator.\n* $\\text{HC1}$: Degrees-of-freedom adjusted robust covariance matrix ($N / (N - K)$), widely adopted as the default robust estimator in modern statistical packages.\n\nImplement the White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent robust covariance matrix estimator using vectorized matrix products in NumPy.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-heteroskedasticity-white-robust",
          "starterCode": "def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent SEs.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    hc_type : str, default 'HC1'\n        Type of robust standard errors ('HC0' or 'HC1').\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameters (K,)\n        'se_default': classical homoskedastic standard errors (K,)\n        'se_robust': heteroskedasticity-robust standard errors (K,)\n    \"\"\"\n    # Step 1: Solve for OLS parameters\n    # Step 2: Calculate residuals\n    # Step 3: Classical homoskedastic standard errors for comparison\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent SEs.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    hc_type : str, default 'HC1'\n        Type of robust standard errors ('HC0' or 'HC1').\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameters (K,)\n        'se_default': classical homoskedastic standard errors (K,)\n        'se_robust': heteroskedasticity-robust standard errors (K,)\n    \"\"\"\n    # Step 1: Solve for OLS parameters\n    # Step 2: Calculate residuals\n    # Step 3: Classical homoskedastic standard errors for comparison\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2"
            }
          },
          "solution": "import numpy as np\n\ndef compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent SEs.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors.\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    hc_type : str, default 'HC1'\n        Type of robust standard errors ('HC0' or 'HC1').\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': estimated parameters (K,)\n        'se_default': classical homoskedastic standard errors (K,)\n        'se_robust': heteroskedasticity-robust standard errors (K,)\n    \"\"\"\n    N, K = X.shape\n    \n    # Step 1: Solve for OLS parameters\n    XtX = X.T @ X\n    Xty = X.T @ y\n    beta = np.linalg.solve(XtX, Xty)\n    \n    # Step 2: Calculate residuals\n    residuals = y - X @ beta\n    \n    # Step 3: Classical homoskedastic standard errors for comparison\n    df = N - K\n    s2 = float(np.sum(residuals ** 2)) / df if df > 0 else 0.0\n    XtX_inv = np.linalg.inv(XtX)\n    se_default = np.sqrt(np.maximum(np.diag(s2 * XtX_inv), 0.0))\n    \n    # Step 4: Construct the empirical meat matrix: X^T * diag(e^2) * X\n    # Vectorized computation: multiply each row of X by residual e_i\n    X_scaled = X * residuals[:, np.newaxis]\n    meat = X_scaled.T @ X_scaled  # Equivalent to sum_i e_i^2 x_i x_i^T\n    \n    # Step 5: Assemble the sandwich: (X^T X)^(-1) * meat * (X^T X)^(-1)\n    vcov_hc0 = XtX_inv @ meat @ XtX_inv\n    \n    if hc_type.upper() == \"HC1\" and df > 0:\n        vcov_robust = (N / df) * vcov_hc0\n    else:\n        vcov_robust = vcov_hc0\n        \n    se_robust = np.sqrt(np.maximum(np.diag(vcov_robust), 0.0))\n    \n    return {\n        \"beta\": beta,\n        \"se_default\": se_default,\n        \"se_robust\": se_robust,\n    }"
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
      "en": "Moving from simple bivariate regression to multiple regression transforms econometrics from basic line-drawing into a multidimensional...",
      "ar": "إن الانتقال من الانحدار البسيط إلى الانحدار المتعدد ينقل القياس الاقتصادي من مجرد مطابقة منحنيات إلى آلة جبارة لتطبيق مبدأ ثبات العوامل..."
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
          "en": "Moving from simple bivariate regression to multiple regression transforms econometrics from basic line-drawing into a multidimensional **ceteris paribus machine** (evaluating the effect of one factor while holding everything else constant). In real economies, variables never change in a vacuum: schooling is deeply intertwined with natural talent, family wealth, geographical location, and work history.\n\nMatrix calculus allows us to optimize across all $K$ dimensions simultaneously in a single stroke. Instead of writing out pages of tedious summations and $K$ separate partial derivatives, matrix algebra collapses the problem into an elegant quadratic loss surface:\n\n$$\nS(\\boldsymbol{\\beta}) = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})\n$$\n\nTwo geometric operators govern the entire algebraic structure:\n1. **The Hat / Projection Matrix ($\\mathbf{P}_X$):** The \"synthesizer\" that takes any vector in the universe and snaps it onto the closest point within the regressor hyperplane: $\\hat{\\mathbf{y}} = \\mathbf{P}_X \\mathbf{y}$.\n2. **The Annihilator Matrix ($\\mathbf{M}_X = \\mathbf{I}_N - \\mathbf{P}_X$):** The \"residual maker\" that completely wipes out and obliterates any vector lying in the subspace of $\\mathbf{X}$ ($\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$). When applied to the outcome, it purges every trace of the regressors to isolate the pure residual vector: $\\mathbf{e} = \\mathbf{M}_X \\mathbf{y}$.\n\nHere we encounter the critical boundary between prediction and causal inference in multiple regression. In machine learning, adding regressors serves solely to improve the predictive conditional expectation function $\\mathbb{E}[y \\mid \\mathbf{x}]$. If two features are correlated, an algorithm like a neural net or tree ensemble gladly blends them together to produce the best prediction. But in econometrics, our goal is structural: we want the partial derivative $\\beta_j = \\frac{\\partial \\mathbb{E}[y \\mid do(x_j), \\mathbf{x}_{-j}]}{\\partial x_j}$—the ceteris paribus causal effect of changing policy $x_j$ while keeping all other variables strictly frozen. Multiple regression mathematically partials out the linear fingerprints of the other included variables, allowing us to approximate this hypothetical policy intervention—provided no unobserved confounders remain in the error term!\n\n$$\nS(\\boldsymbol{\\beta}) = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})\n$$",
          "ar": "إن الانتقال من الانحدار البسيط إلى الانحدار المتعدد ينقل القياس الاقتصادي من مجرد مطابقة منحنيات إلى **آلة جبارة لتطبيق مبدأ ثبات العوامل الأخرى (Ceteris Paribus)**. في الواقع الاقتصادي الحي، لا تتحرك المتغيرات بمعزل عن بعضها: فالتعليم مرتبط ارتباطًا وثيقًا بالذكاء الفطري، وثروة الوالدين، والبيئة الجغرافية، والخبرة العملية.\n\nيتيح حسبان المصفوفات صياغة الاستمثال عبر جميع الأبعاد الـ $K$ بضربة واحدة أنيقة. فبدلاً من كتابة صفحات لا تنتهي من علامات الجمع والاشتقاقات الجزئية المنفصلة، يختزل جبر المصفوفات المسألة في سطح خسارة تربيعي متناسق:\n\nويحكم هذا البناء الرياضي عاملان هندسيان جوهريان:\n1. **مصفوفة الإسقاط ($\\mathbf{P}_X$):** \"المُجمِّع\" الذي يلتقط أي متجه في الفضاء ويُسقطه عموديًا على أقرب نقطة داخل المستوي الفائق للمتغيرات: $\\hat{\\mathbf{y}} = \\mathbf{P}_X \\mathbf{y}$.\n2. **مصفوفة الإبادة والتلاشي ($\\mathbf{M}_X = \\mathbf{I}_N - \\mathbf{P}_X$):** \"صانع البواقي\" الذي يمحو ويسحق تمامًا أي متجه يقع ضمن الفضاء الفرعي لـ $\\mathbf{X}$ ($\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$). وعند تطبيقها على متجه النتائج، فإنها تطهره من كل أثر للمتغيرات المستقلة لتعزل البواقي النقية: $\\mathbf{e} = \\mathbf{M}_X \\mathbf{y}$.\n\nوهنا يتجلى الفارق الجوهري بين التنبؤ والاستدلال السببي: في نماذج تعلم الآلة، تُضاف المتغيرات بهدف تحسين دقة التنبؤ بالنتيجة $\\mathbb{E}[y \\mid \\mathbf{x}]$ فقط، ولا يكترث النموذج بتداخل المتغيرات طالما أن التوقع دقيق. أما في الاقتصاد القياسي، فإن غايتنا هي عزل الأثر السببي الصافي لسياسة معينة مع تثبيت باقي العوامل رياضيًا ($\\beta_j$). تقوم مصفوفات الانحدار المتعدد بتطهير المتغير المستهدف من بصمات المتغيرات الأخرى المدرجة، مما يحاكي تجربة معملية منضبطة—شريطة ألا تكون هناك متغيرات سببية مضللة محذوفة في حد الخطأ."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "S(\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{y} + \\boldsymbol{\\beta}^T (\\mathbf{X}^T \\mathbf{X}) \\boldsymbol{\\beta}",
        "formulaNote": {
          "en": "Core invariant for Multiple Regression Algebra & Matrix Calculus.",
          "ar": "الخاصية الرياضية الجوهرية لـ جبر الانحدار المتعدد وحسبان المصفوفات."
        },
        "narrative": {
          "en": "Using matrix calculus derivative rules ($\\nabla_{\\mathbf{b}} (\\mathbf{a}^T \\mathbf{b}) = \\mathbf{a}$ and $\\nabla_{\\mathbf{b}} (\\mathbf{b}^T \\mathbf{A} \\mathbf{b}) = 2\\mathbf{A}\\mathbf{b}$ for symmetric $\\mathbf{A}$):\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) = -2\\mathbf{X}^T \\mathbf{y} + 2(\\mathbf{X}^T \\mathbf{X})\\boldsymbol{\\beta} = \\mathbf{0}\n$$\n\nWhen $\\text{rank}(\\mathbf{X}) = K < N$, $\\mathbf{X}^T \\mathbf{X}$ is strictly invertible:\n\n$$\n\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}\n$$\n\nThe Hessian matrix verifies global convexity:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}}^2 S(\\boldsymbol{\\beta}) = 2\\mathbf{X}^T \\mathbf{X} \\succ \\mathbf{0} \\quad (\\text{strictly positive definite})\n$$\n\n### Fundamental Algebraic Properties of Projection Matrices\n\nThe projection operators are defined as:\n\n$$\n\\mathbf{P}_X \\equiv \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T, \\quad \\mathbf{M}_X \\equiv \\mathbf{I}_N - \\mathbf{P}_X\n$$\n\n1. **Symmetry:**\n   $$\\mathbf{P}_X^T = (\\mathbf{X}^T)^T ((\\mathbf{X}^T \\mathbf{X})^{-1})^T \\mathbf{X}^T = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T = \\mathbf{P}_X$$\n2. **Idempotency:**\n   $$\\mathbf{P}_X \\mathbf{P}_X = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1}(\\mathbf{X}^T \\mathbf{X})(\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T = \\mathbf{P}_X$$\n3. **Trace and Rank via Cyclic Trace Property:**\n   Using the cyclic property $\\text{tr}(\\mathbf{A}\\mathbf{B}\\mathbf{C}) = \\text{tr}(\\mathbf{C}\\mathbf{A}\\mathbf{B})$:\n   $$\\text{tr}(\\mathbf{P}_X) = \\text{tr}\\left(\\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T\\right) = \\text{tr}\\left((\\mathbf{X}^T \\mathbf{X})^{-1}(\\mathbf{X}^T \\mathbf{X})\\right) = \\text{tr}(\\mathbf{I}_K) = K$$\n   $$\\text{tr}(\\mathbf{M}_X) = \\text{tr}(\\mathbf{I}_N - \\mathbf{P}_X) = \\text{tr}(\\mathbf{I}_N) - \\text{tr}(\\mathbf{P}_X) = N - K$$\n4. **Annihilation of Column Space:**\n   $$\\mathbf{M}_X \\mathbf{X} = (\\mathbf{I}_N - \\mathbf{P}_X)\\mathbf{X} = \\mathbf{X} - \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T \\mathbf{X} = \\mathbf{X} - \\mathbf{X} = \\mathbf{0}_{N \\times K}$$\n\n* $S(\\boldsymbol{\\beta})$: Scalar sum of squared residuals quadratic loss function.\n* $\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) \\in \\mathbb{R}^{K \\times 1}$: Gradient vector of partial derivatives with respect to each $\\beta_j$.\n* $\\nabla_{\\boldsymbol{\\beta}}^2 S(\\boldsymbol{\\beta}) \\in \\mathbb{R}^{K \\times K}$: Hessian matrix of second-order partial derivatives.\n* $\\mathbf{P}_X \\in \\mathbb{R}^{N \\times N}$: Symmetric idempotent projection matrix with trace equal to column dimension $K$.\n* $\\mathbf{M}_X \\in \\mathbb{R}^{N \\times N}$: Symmetric idempotent annihilator matrix satisfying $\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$ with trace equal to degrees of freedom $N - K$.\n\nImplement a function that computes the hat matrix $\\mathbf{P}_X$ and the residual annihilator matrix $\\mathbf{M}_X$, and numerically confirms their idempotent and orthogonality properties.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-multiple-regression-matrix-calculus",
          "starterCode": "def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the hat matrix P_X and residual annihilator matrix M_X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (must have full column rank).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        P: Projection matrix (N, N)\n        M: Annihilator matrix (N, N)\n    \"\"\"\n    # Step 1: Compute (X^T X)^(-1)\n    # Step 2: Form projection matrix P = X (X^T X)^(-1) X^T\n    # Step 3: Form annihilator matrix M = I - P\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the hat matrix P_X and residual annihilator matrix M_X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (must have full column rank).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        P: Projection matrix (N, N)\n        M: Annihilator matrix (N, N)\n    \"\"\"\n    # Step 1: Compute (X^T X)^(-1)\n    # Step 2: Form projection matrix P = X (X^T X)^(-1) X^T\n    # Step 3: Form annihilator matrix M = I - P\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the hat matrix P_X and residual annihilator matrix M_X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix (must have full column rank).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        P: Projection matrix (N, N)\n        M: Annihilator matrix (N, N)\n    \"\"\"\n    N, K = X.shape\n    \n    # Step 1: Compute (X^T X)^(-1)\n    XtX = X.T @ X\n    XtX_inv = np.linalg.inv(XtX)\n    \n    # Step 2: Form projection matrix P = X (X^T X)^(-1) X^T\n    P = X @ XtX_inv @ X.T\n    \n    # Step 3: Form annihilator matrix M = I - P\n    I_N = np.eye(N)\n    M = I_N - P\n    \n    return P, M"
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
      "en": "In empirical research, you will constantly hear researchers state: \"We estimate the causal effect of schooling on wages, controlling for...",
      "ar": "في أبحاث الاقتصاد القياسي، ستسمع الباحثين يكررون دائمًا: \"نقيس الأثر السببي للتعليم على الأجور، مع التحكم في سنوات الخبرة والقطاع الاقتصادي..."
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
          "en": "In empirical research, you will constantly hear researchers state: *\"We estimate the causal effect of schooling on wages, controlling for experience, industry, and location.\"* But what does \"controlling for\" actually mean under the hood? Does the statistical software magically pause time or create cloned human beings with identical industries?\n\nThe **Frisch-Waugh-Lovell (FWL) Theorem** reveals the elegant algebraic mechanics of \"partialling out\":\n1. **Purge the Outcome:** Regress the outcome $Y$ on the control variables $X_2$, and save the residuals $\\tilde{\\mathbf{y}}$. This strips away every shred of variation in $Y$ that can be predicted by $X_2$.\n2. **Purge the Regressor:** Regress the key variable of interest $X_1$ on the controls $X_2$, and save the residuals $\\tilde{\\mathbf{X}}_1$. This wipes out any correlation or overlap between $X_1$ and $X_2$.\n3. **Run a Simple Bivariate Regression:** Regress the purified outcome residuals $\\tilde{\\mathbf{y}}$ on the purified regressor residuals $\\tilde{\\mathbf{X}}_1$.\n\nThe slope of this simple bivariate regression is **mathematically identical down to the last decimal place** to the coefficient $\\hat{\\boldsymbol{\\beta}}_1$ from the giant multiple regression!\n\nThink of active noise-cancelling headphones: to hear a subtle violin solo ($X_1$) inside a noisy airplane cabin ($X_2$), the headphones generate an inverse acoustic wave to cancel the engine drone from the microphone ($Y$) and from the audio stream ($X_1$). Controlling for variables simply means washing the fingerprints of the controls off both the treatment and the outcome before comparing what remains.\n\nHowever, we must strictly demystify causality here: **partialling out is an algebraic wash, not a magical causal purifier!** While FWL proves how multiple regression extracts the net variation between $X_1$ and $Y$, the decision of *which* variables to place into $X_2$ determines whether your estimate is causal or catastrophic. If $X_2$ is a true confounder (like family wealth), partialling it out removes bias. But if $X_2$ is a mediator on the causal pathway (like job title chosen after college) or a collider, partialling it out actually blocks the true causal mechanism or introduces spurious bias. Prediction cares only about variance explained; causal inference demands knowing whether the noise-cancelling headphones are filtering the engine noise or accidentally silencing the violin.",
          "ar": "في أبحاث الاقتصاد القياسي، ستسمع الباحثين يكررون دائمًا: *\"نقيس الأثر السببي للتعليم على الأجور، مع التحكم في سنوات الخبرة والقطاع الاقتصادي والمنطقة الجغرافية.\"* ولكن ما الذي يعنيه \"التحكم في المتغيرات\" بدقة رياضية؟ هل يمتلك الحاسوب آلة زمنية تجمد الواقع أو تصنع نسخًا بشرية متطابقة في كافة الظروف؟\n\nتكشف **مبرهنة فريش-وو-لوفيل (FWL Theorem)** عن الآلية الحسابية المذهلة لمفهوم \"التجريد الجزئي\" (Partialling Out):\n1. **تطهير المتغير التابع:** أجرِ انحدارًا لـ $Y$ على متغيرات التحكم $X_2$، واحتفظ بالبواقي $\\tilde{\\mathbf{y}}$. هذا الإجراء يمسح من $Y$ كل أثر يمكن تفسيره بواسطة $X_2$.\n2. **تطهير المتغير المستقل:** أجرِ انحدارًا لمتغير المعالجة $X_1$ على متغيرات التحكم $X_2$، واحتفظ بالبواقي $\\tilde{\\mathbf{X}}_1$. هذا الإجراء يزيل أي تداخل أو تشابك بين $X_1$ و $X_2$.\n3. **إجراء انحدار خطي بسيط:** قم بانحدار بواقي النتيجة المطهرة $\\tilde{\\mathbf{y}}$ على بواقي المعالجة المطهرة $\\tilde{\\mathbf{X}}_1$.\n\nإن ميل هذا الانحدار البسيط **يتطابق رياضيًا وبالفاصلة العشرية** مع معامل الانحدار المتعدد الضخم $\\hat{\\boldsymbol{\\beta}}_1$!\n\nتخيل سماعات إلغاء الضجيج الذكية: لسماع عزف كمان رقيق ($X_1$) داخل مقصورة طائرة صاخبة ($X_2$)، تولد السماعات موجة صوتية معاكسة تلغي هدير المحرك تمامًا من أذنيك ($Y$) ومن جهاز التسجيل ($X_1$). التحكم في المتغيرات يعني ببساطة مسح بصمات عوامل التشويش من كل من المعالجة والنتيجة قبل فحص الرابط السببي المتبقي بينهما.\n\nلكن الحذر السببي هنا جوهري: **التجريد الجزئي هو عملية غسيل جبري وليس عصا سحرية تنتج السببية تلقائيًا!** تبين مبرهنة FWL كيف يعزل الانحدار التباين الصافي، لكن اختيار المتغيرات التي نضعها في $X_2$ هو الذي يحدد صلاحية النموذج. فإذا كان المتغير عاملاً مربكًا حقيقيًا (كثروة الأسرة)، فإن عزله يزيل التحيز. أما إذا كان المتغير وسيطًا على مسار السببية (كنوع الوظيفة التي حصل عليها الفرد بعد تخرجه)، فإن عزله يحجب الأثر السببي الحقيقي للتعليم. التنبؤ يكتفي بتنقية التباين لخفض الخطأ، بينما الاستدلال السببي يشترط معرفة طبيعة المسارات السببية قبل الضغط على زر التجريد."
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
          "en": "The joint Normal Equations in block partitioned form:\n\n$$\n\\begin{bmatrix} \\mathbf{X}_1^T \\mathbf{X}_1 & \\mathbf{X}_1^T \\mathbf{X}_2 \\\\ \\mathbf{X}_2^T \\mathbf{X}_1 & \\mathbf{X}_2^T \\mathbf{X}_2 \\end{bmatrix} \\begin{bmatrix} \\hat{\\boldsymbol{\\beta}}_1 \\\\ \\hat{\\boldsymbol{\\beta}}_2 \\end{bmatrix} = \\begin{bmatrix} \\mathbf{X}_1^T \\mathbf{y} \\\\ \\mathbf{X}_2^T \\mathbf{y} \\end{bmatrix}\n$$\n\n### Step-by-Step Algebraic Derivation of FWL\n\nFrom the second row of the partitioned system:\n\n$$\n\\mathbf{X}_2^T \\mathbf{X}_1 \\hat{\\boldsymbol{\\beta}}_1 + \\mathbf{X}_2^T \\mathbf{X}_2 \\hat{\\boldsymbol{\\beta}}_2 = \\mathbf{X}_2^T \\mathbf{y}\n$$\n\nAssuming full column rank for $\\mathbf{X}_2$, solve for $\\hat{\\boldsymbol{\\beta}}_2$:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_2 = (\\mathbf{X}_2^T \\mathbf{X}_2)^{-1}\\mathbf{X}_2^T \\mathbf{y} - (\\mathbf{X}_2^T \\mathbf{X}_2)^{-1}\\mathbf{X}_2^T \\mathbf{X}_1 \\hat{\\boldsymbol{\\beta}}_1\n$$\n\nSubstitute this solution into the first row of the partitioned system:\n\n$$\n\\mathbf{X}_1^T \\mathbf{X}_1 \\hat{\\boldsymbol{\\beta}}_1 + \\mathbf{X}_1^T \\mathbf{X}_2 \\left( (\\mathbf{X}_2^T \\mathbf{X}_2)^{-1}\\mathbf{X}_2^T \\mathbf{y} - (\\mathbf{X}_2^T \\mathbf{X}_2)^{-1}\\mathbf{X}_2^T \\mathbf{X}_1 \\hat{\\boldsymbol{\\beta}}_1 \\right) = \\mathbf{X}_1^T \\mathbf{y}\n$$\n\nGroup terms involving $\\hat{\\boldsymbol{\\beta}}_1$ on the left-hand side and $\\mathbf{y}$ on the right-hand side:\n\n$$\n\\mathbf{X}_1^T \\left( \\mathbf{I}_N - \\mathbf{X}_2 (\\mathbf{X}_2^T \\mathbf{X}_2)^{-1}\\mathbf{X}_2^T \\right) \\mathbf{X}_1 \\hat{\\boldsymbol{\\beta}}_1 = \\mathbf{X}_1^T \\left( \\mathbf{I}_N - \\mathbf{X}_2 (\\mathbf{X}_2^T \\mathbf{X}_2)^{-1}\\mathbf{X}_2^T \\right) \\mathbf{y}\n$$\n\nRecognizing the annihilator matrix $\\mathbf{M}_2 \\equiv \\mathbf{I}_N - \\mathbf{X}_2 (\\mathbf{X}_2^T \\mathbf{X}_2)^{-1}\\mathbf{X}_2^T$:\n\n$$\n(\\mathbf{X}_1^T \\mathbf{M}_2 \\mathbf{X}_1) \\hat{\\boldsymbol{\\beta}}_1 = \\mathbf{X}_1^T \\mathbf{M}_2 \\mathbf{y}\n$$\n\nBecause $\\mathbf{M}_2$ is symmetric and idempotent ($\\mathbf{M}_2 = \\mathbf{M}_2^T = \\mathbf{M}_2^2$), we have $\\mathbf{X}_1^T \\mathbf{M}_2 \\mathbf{X}_1 = (\\mathbf{M}_2 \\mathbf{X}_1)^T (\\mathbf{M}_2 \\mathbf{X}_1) = \\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{X}}_1$, and $\\mathbf{X}_1^T \\mathbf{M}_2 \\mathbf{y} = (\\mathbf{M}_2 \\mathbf{X}_1)^T (\\mathbf{M}_2 \\mathbf{y}) = \\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{y}}$.\n\nTherefore, the estimator from bivariate regression of purified residuals matches the multiple regression coefficient exactly:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_1 = (\\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{X}}_1)^{-1} \\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{y}} = (\\mathbf{X}_1^T \\mathbf{M}_2 \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{M}_2 \\mathbf{y}\n$$\n\nFurthermore, the residuals from this partial regression are identical to the multiple regression residuals:\n\n$$\n\\mathbf{e} = \\tilde{\\mathbf{y}} - \\tilde{\\mathbf{X}}_1 \\hat{\\boldsymbol{\\beta}}_1 = \\mathbf{y} - \\mathbf{X}_1 \\hat{\\boldsymbol{\\beta}}_1 - \\mathbf{X}_2 \\hat{\\boldsymbol{\\beta}}_2\n$$\n\n* $\\mathbf{X}_1 \\in \\mathbb{R}^{N \\times K_1}$: Submatrix containing the regressor(s) whose causal impact is of primary interest.\n* $\\mathbf{X}_2 \\in \\mathbb{R}^{N \\times K_2}$: Submatrix of control covariates (e.g., demographic indicators, fixed effects, trends).\n* $\\mathbf{M}_2 \\in \\mathbb{R}^{N \\times N}$: Annihilator matrix for $\\mathbf{X}_2$ with $\\text{rank}(\\mathbf{M}_2) = N - K_2$.\n* $\\tilde{\\mathbf{X}}_1 = \\mathbf{M}_2 \\mathbf{X}_1$: Regressor residuals purged of all linear associations with $\\mathbf{X}_2$.\n* $\\tilde{\\mathbf{y}} = \\mathbf{M}_2 \\mathbf{y}$: Outcome residuals purged of all linear associations with $\\mathbf{X}_2$.\n* $\\hat{\\boldsymbol{\\beta}}_1$: The exact partial regression coefficient on $\\mathbf{X}_1$ in the full joint model.\n\nImplement the three-step Frisch-Waugh-Lovell partialling out algorithm and verify that it produces coefficients identical to the full multiple regression.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-frisch-waugh-lovell-theorem",
          "starterCode": "def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Verifies the Frisch-Waugh-Lovell theorem by comparing partial regression with full OLS.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    X1 : np.ndarray of shape (N, K1)\n        Target regressor block.\n    X2 : np.ndarray of shape (N, K2)\n        Control covariates block to partial out.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        beta_partial: Coefficients from bivariate residual regression (K1,)\n        beta_full_X1: Corresponding coefficients from joint multiple regression (K1,)\n    \"\"\"\n    # Step 1: Compute annihilator matrix for X2: M2 = I - X2 (X2^T X2)^(-1) X2^T\n    # Step 2: Purge X2 out of y and X1\n    # Step 3: Run partial regression of y_tilde on X1_tilde\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Verifies the Frisch-Waugh-Lovell theorem by comparing partial regression with full OLS.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    X1 : np.ndarray of shape (N, K1)\n        Target regressor block.\n    X2 : np.ndarray of shape (N, K2)\n        Control covariates block to partial out.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        beta_partial: Coefficients from bivariate residual regression (K1,)\n        beta_full_X1: Corresponding coefficients from joint multiple regression (K1,)\n    \"\"\"\n    # Step 1: Compute annihilator matrix for X2: M2 = I - X2 (X2^T X2)^(-1) X2^T\n    # Step 2: Purge X2 out of y and X1\n    # Step 3: Run partial regression of y_tilde on X1_tilde\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Verifies the Frisch-Waugh-Lovell theorem by comparing partial regression with full OLS.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed target vector.\n    X1 : np.ndarray of shape (N, K1)\n        Target regressor block.\n    X2 : np.ndarray of shape (N, K2)\n        Control covariates block to partial out.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        beta_partial: Coefficients from bivariate residual regression (K1,)\n        beta_full_X1: Corresponding coefficients from joint multiple regression (K1,)\n    \"\"\"\n    N = len(y)\n    \n    # Step 1: Compute annihilator matrix for X2: M2 = I - X2 (X2^T X2)^(-1) X2^T\n    XtX2 = X2.T @ X2\n    M2 = np.eye(N) - X2 @ np.linalg.inv(XtX2) @ X2.T\n    \n    # Step 2: Purge X2 out of y and X1\n    y_tilde = M2 @ y\n    X1_tilde = M2 @ X1\n    \n    # Step 3: Run partial regression of y_tilde on X1_tilde\n    beta_partial = np.linalg.solve(X1_tilde.T @ X1_tilde, X1_tilde.T @ y_tilde)\n    \n    # Step 4: Run full joint regression of y on [X1, X2] for verification\n    X_full = np.hstack([X1, X2])\n    beta_full = np.linalg.solve(X_full.T @ X_full, X_full.T @ y)\n    beta_full_X1 = beta_full[:X1.shape[1]]\n    \n    return beta_partial, beta_full_X1"
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
      "en": "Confusing correlation with causation is the original sin of empirical data analysis. Imagine a peaceful countryside village where, every...",
      "ar": "الخلط بين الارتباط والسببية هو الخطيئة الكبرى في تحليل البيانات التجريبية. تخيل قرية ريفية هادئة يصيح فيها ديك المزرعة كل صباح عند الساعة..."
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
          "en": "Confusing correlation with causation is the original sin of empirical data analysis.\n\nImagine a peaceful countryside village where, every morning at 5:00 AM sharp, the village rooster crows loudly. At 5:05 AM, the sun rises over the horizon. If an algorithm runs a regression of *Sunrise* on *Rooster Crowing*, it will find a stunningly strong, statistically significant positive relationship with $R^2 \\approx 1$. But does the rooster summon the dawn? If you silence the rooster, will eternal darkness engulf the village?\n\nOf course not. The planetary rotation of the Earth is the true common cause that brings the sunrise while simultaneously triggering the rooster's biological circadian rhythm. Omitting the Earth's rotation forces the statistical model to attribute the solar event to the bird's vocal cords! This is **Omitted Variable Bias (OVB)**.\n\nThe OVB formula is celebrated because it dissects this error with surgical precision. The bias of a naive \"short\" regression is the exact product of two distinct mechanisms:\n\n$$\n\\text{Bias} = (\\text{Direct Impact of the Omitted Variable on } Y) \\times (\\text{Statistical Correlation between Omitted Variable and } X)\n$$\n\nIf either of these two bridges is zero, the bias collapses to zero:\n1. If the omitted factor has no true effect on the outcome ($\\beta_2 = 0$), omitting it causes no bias.\n2. If the omitted factor is completely uncorrelated with the treatment ($\\delta_{21} = 0$, as in a randomized experiment), omitting it causes no bias!\n\nHere lies the quintessential fork between prediction and policymaking. To an automated prediction system—such as a bank scoring credit applicants or a tech firm sorting job resumes—omitted variable bias is completely harmless. If a candidate holds an elite college degree, that degree accurately predicts high productivity, regardless of whether the university imparted valuable skills or simply admitted inherently talented students. But for a government ministry deciding whether to invest billions in subsidized higher education, the difference between prediction and causation is existential: if the wage premium is purely driven by omitted innate talent, expanding college access will not transform low-skilled workers into economic dynamos. Prediction asks: *\"What does schooling signal?\"* Causation asks: *\"What does schooling create?\"*",
          "ar": "الخلط بين الارتباط والسببية هو الخطيئة الكبرى في تحليل البيانات التجريبية.\n\nتخيل قرية ريفية هادئة يصيح فيها ديك المزرعة كل صباح عند الساعة 5:00 تمامًا، وعند الساعة 5:05 تشرق الشمس في الأفق. إذا أجرى نموذج إحصائي انحدارًا لـ *شروق الشمس* على *صياح الديك*، فسيخرج بمعامل ارتباط موجب هائل ودلالة إحصائية قاطعة بـ $R^2 \\approx 1$. ولكن هل صياح الديك هو الذي يستدعي خيوط الفجر؟ وهل سيعم الظلام الأبدي لو أسكتنا الديك؟\n\nبالتأكيد لا. إن دوران كوكب الأرض حول محوره هو السبب الحقيقي المشترك الذي يأتي بالشروق ويحفز في الوقت ذاته الساعة البيولوجية للديك. إن إغفال دوران الأرض يجبر النموذج الإحصائي على نسبة شروق الشمس إلى حبال الديك الصوتية! هذا هو **انحياز المتغير المغفَل (Omitted Variable Bias - OVB)**.\n\nتكتسب صيغة OVB مكانتها التاريخية لأنها تفكك هذا الخطأ بدقة جراحية متناهية. فالانحياز في الانحدار \"القصير\" هو حاصل ضرب مسارين محددين:\n\n$$\n\\text{الانحياز} = (\\text{الأثر المباشر للمتغير المغفل على النتيجة } Y) \\times (\\text{الارتباط الإحصائي بين المتغير المغفل والمعالجة } X)\n$$\n\nفإذا انقطع أي من هذين الجسرين، يتلاشى الانحياز تمامًا ليصبح صفرًا:\n1. إذا لم يكن للمتغير المغفل أثر حقيقي على النتيجة ($\\beta_2 = 0$)، فلا انحياز في إغفاله.\n2. إذا كان المتغير المغفل مستقلاً تمامًا عن المعالجة ($\\delta_{21} = 0$، كما في التجارب العشوائية)، فلا انحياز إطلاقًا!\n\nوهنا يكمن المفترق الحاسم بين نماذج التنبؤ وصنع السياسات العامة. بالنسبة لخوارزمية تنبؤية في بنك أو شركة توظيف، لا يشكل انحياز المتغير المغفل أي مشكلة؛ فالحصول على شهادة من جامعة عريقة يتنبأ بدقة بإنتاجية الموظف، بصرف النظر عما إذا كانت الجامعة هي التي صقلت مهاراته أم أنها مجرد مرشح استقطب العباقرة أصلاً! لكن بالنسبة لوزير تعليم يقرر إنفاق مليارات الدولارات لدعم التعليم العالي، فإن التمييز بين التنبؤ والسببية مسألة حياة أو موت للمال العام: إذا كان عائد التعليم ناتجًا عن انحياز الموهبة الفطرية المغفلة، فإن مضاعفة خريجي الجامعات لن تخلق عباقرة جدد! التنبؤ يسأل: *\"ما الذي تشير إليه الشهادة؟\"* بينما السببية تسأل: *\"ما الذي تصنعه الشهادة فعلاً؟\"*"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y} = \\mathbf{X}_1 \\boldsymbol{\\beta}_1 + \\mathbf{X}_2 \\boldsymbol{\\beta}_2 + \\boldsymbol{\\varepsilon}, \\quad \\text{with } \\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}_1, \\mathbf{X}_2] = \\mathbf{0}",
        "formulaNote": {
          "en": "Core invariant for The Omitted Variable Bias (OVB) Formula & The Directional Bias Matrix.",
          "ar": "الخاصية الرياضية الجوهرية لـ صيغة انحياز المتغير المغفَل ومصفوفة تحديد اتجاه الانحياز."
        },
        "narrative": {
          "en": "where $\\boldsymbol{\\beta}_1$ is the true causal effect vector of primary interest. A researcher fails to observe $\\mathbf{X}_2$ and fits the **Short Model**:\n\n$$\n\\mathbf{y} = \\mathbf{X}_1 \\boldsymbol{\\beta}_{\\text{short}} + \\mathbf{u}\n$$\n\n### Mathematical Derivation of the OVB Formula\n\nThe OLS estimator of the short regression is:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_{\\text{short}} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{y} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T (\\mathbf{X}_1 \\boldsymbol{\\beta}_1 + \\mathbf{X}_2 \\boldsymbol{\\beta}_2 + \\boldsymbol{\\varepsilon})\n$$\n\nExpanding this product:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_{\\text{short}} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_1 \\boldsymbol{\\beta}_1 + (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_2 \\boldsymbol{\\beta}_2 + (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\boldsymbol{\\varepsilon}\n$$\n\n$$\n\\hat{\\boldsymbol{\\beta}}_{\\text{short}} = \\boldsymbol{\\beta}_1 + \\underbrace{(\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_2}_{\\hat{\\boldsymbol{\\delta}}_{21}} \\boldsymbol{\\beta}_2 + (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\boldsymbol{\\varepsilon}\n$$\n\nTaking expectations conditional on the observed regressors $\\mathbf{X}_1$ and unobserved confounders $\\mathbf{X}_2$:\n\n$$\n\\mathbb{E}[\\hat{\\boldsymbol{\\beta}}_{\\text{short}} \\mid \\mathbf{X}_1, \\mathbf{X}_2] = \\boldsymbol{\\beta}_1 + \\hat{\\boldsymbol{\\delta}}_{21} \\boldsymbol{\\beta}_2 + (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}_1, \\mathbf{X}_2]\n$$\n\nSince $\\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}_1, \\mathbf{X}_2] = \\mathbf{0}$, the residual disturbance term vanishes, establishing the matrix **Omitted Variable Bias Formula**:\n\n$$\n\\mathbb{E}[\\hat{\\boldsymbol{\\beta}}_{\\text{short}} \\mid \\mathbf{X}_1, \\mathbf{X}_2] = \\boldsymbol{\\beta}_1 + \\hat{\\boldsymbol{\\delta}}_{21} \\boldsymbol{\\beta}_2 \\iff \\text{Bias} \\equiv \\hat{\\boldsymbol{\\delta}}_{21} \\boldsymbol{\\beta}_2\n$$\n\nIn scalar bivariate notation where $x_1$ is a single treatment and $x_2$ is a single omitted confounder:\n\n$$\n\\text{plim} \\, \\hat{\\beta}_{\\text{short}} = \\beta_1 + \\beta_2 \\cdot \\frac{\\text{Cov}(x_1, x_2)}{\\text{Var}(x_1)}\n$$\n\n| Correlation of Omitted with Treatment ($\\delta_{21}$) | Impact of Omitted on Outcome ($\\beta_2 > 0$) | Impact of Omitted on Outcome ($\\beta_2 < 0$) |\n| :--- | :--- | :--- |\n| **Positive Correlation** ($\\delta_{21} > 0$) | **Positive Bias** (Overestimation: $\\hat{\\beta} > \\beta$) | **Negative Bias** (Underestimation: $\\hat{\\beta} < \\beta$) |\n| **Negative Correlation** ($\\delta_{21} < 0$) | **Negative Bias** (Underestimation: $\\hat{\\beta} < \\beta$) | **Positive Bias** (Overestimation: $\\hat{\\beta} > \\beta$) |\n\n* $\\beta_1$: True structural parameter representing the causal effect of treatment $\\mathbf{X}_1$ on $\\mathbf{y}$.\n* $\\beta_2$: True partial effect of the unobserved omitted confounder $\\mathbf{X}_2$ on $\\mathbf{y}$ holding $\\mathbf{X}_1$ fixed.\n* $\\beta_{\\text{short}}$: Population parameter recovered by naive short regression omitting $\\mathbf{X}_2$.\n* $\\hat{\\delta}_{21} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_2$: Auxiliary regression coefficient from projecting the omitted confounder onto the treatment.\n* $\\text{Bias} = \\beta_2 \\cdot \\delta_{21}$: The exact magnitude and sign of causal distortion.\n\nImplement the full OVB algebraic decomposition. Fit the long regression, the short regression, and the auxiliary regression to numerically verify that $\\hat{\\beta}_{\\text{short}} = \\hat{\\beta}_{\\text{long}, 1} + \\hat{\\beta}_{\\text{long}, 2} \\cdot \\hat{\\delta}_{21}$ holds identically.",
          "ar": "### The Directional Bias Matrix | مصفوفة تحديد اتجاه الانحياز\n\n### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-omitted-variable-bias-formula",
          "starterCode": "def compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes long OLS, short OLS, auxiliary projection, and exact omitted variable bias.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X1 : np.ndarray of shape (N, K1)\n        Included regressor block (treatment + controls).\n    X2 : np.ndarray of shape (N, K2)\n        Omitted confounder block.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_long_1': long regression coefficients for X1 (K1,)\n        'beta_long_2': long regression coefficients for X2 (K2,)\n        'beta_short': short regression coefficients for X1 (K1,)\n        'delta_aux': auxiliary regression coefficients projecting X2 on X1 (K1, K2)\n        'ovb_calculated': product delta_aux @ beta_long_2 (K1,)\n    \"\"\"\n    # Step 1: Fit the long regression y on [X1, X2]\n    # Step 2: Fit the short regression y on X1\n    # Step 3: Fit the auxiliary regression X2 on X1\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes long OLS, short OLS, auxiliary projection, and exact omitted variable bias.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X1 : np.ndarray of shape (N, K1)\n        Included regressor block (treatment + controls).\n    X2 : np.ndarray of shape (N, K2)\n        Omitted confounder block.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_long_1': long regression coefficients for X1 (K1,)\n        'beta_long_2': long regression coefficients for X2 (K2,)\n        'beta_short': short regression coefficients for X1 (K1,)\n        'delta_aux': auxiliary regression coefficients projecting X2 on X1 (K1, K2)\n        'ovb_calculated': product delta_aux @ beta_long_2 (K1,)\n    \"\"\"\n    # Step 1: Fit the long regression y on [X1, X2]\n    # Step 2: Fit the short regression y on X1\n    # Step 3: Fit the auxiliary regression X2 on X1\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes long OLS, short OLS, auxiliary projection, and exact omitted variable bias.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X1 : np.ndarray of shape (N, K1)\n        Included regressor block (treatment + controls).\n    X2 : np.ndarray of shape (N, K2)\n        Omitted confounder block.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_long_1': long regression coefficients for X1 (K1,)\n        'beta_long_2': long regression coefficients for X2 (K2,)\n        'beta_short': short regression coefficients for X1 (K1,)\n        'delta_aux': auxiliary regression coefficients projecting X2 on X1 (K1, K2)\n        'ovb_calculated': product delta_aux @ beta_long_2 (K1,)\n    \"\"\"\n    # Step 1: Fit the long regression y on [X1, X2]\n    X_long = np.hstack([X1, X2])\n    beta_long = np.linalg.solve(X_long.T @ X_long, X_long.T @ y)\n    K1 = X1.shape[1]\n    beta_long_1 = beta_long[:K1]\n    beta_long_2 = beta_long[K1:]\n    \n    # Step 2: Fit the short regression y on X1\n    beta_short = np.linalg.solve(X1.T @ X1, X1.T @ y)\n    \n    # Step 3: Fit the auxiliary regression X2 on X1\n    # Solves (X1^T X1) delta = X1^T X2\n    delta_aux = np.linalg.solve(X1.T @ X1, X1.T @ X2)\n    \n    # Step 4: Compute exact theoretical OVB: delta_aux @ beta_long_2\n    ovb_calculated = delta_aux @ beta_long_2\n    \n    return {\n        \"beta_long_1\": beta_long_1,\n        \"beta_long_2\": beta_long_2,\n        \"beta_short\": beta_short,\n        \"delta_aux\": delta_aux,\n        \"ovb_calculated\": ovb_calculated,\n    }"
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
      "en": "In introductory statistics courses, students often acquire the dangerous dogma of the \"Kitchen Sink Regression\": pack every available...",
      "ar": "في دروس الإحصاء الأولية، يتشرب الطلاب غالبًا عادة شائعة وخطيرة تُعرف بـ \"انحدار حوض المطبخ\" (Kitchen Sink Regression): حشر كل متغير متاح في..."
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
          "en": "In introductory statistics courses, students often acquire the dangerous dogma of the **\"Kitchen Sink Regression\"**: pack every available covariate in your spreadsheet into the regression model, operating under the naive illusion that adding more control variables can never hurt and always reduces bias.\n\nIn causal econometrics, this instinct is disastrous. Joshua Angrist and Jörn-Steffen Pischke famously coined the term **Bad Controls** to identify variables that should never be included in a regression.\n\nBad controls primarily come in two destructive varieties:\n1. **The Mediator Trap ($D \\to M \\to Y$):** Suppose you want to measure the total causal return of a college degree ($D$) on earnings ($Y$). Should you control for whether the individual holds a managerial role ($M$)? **Absolutely not!** Getting hired into managerial roles is one of the primary pathways through which college education boosts earnings. If you control for management status, you block the transmission pipe. You are now comparing a college graduate manager to a non-college manager, asking: *\"Does college help you earn more if it didn't help you get a better job?\"* You have engineered away the very effect you set out to measure!\n2. **The Collider Trap ($D \\to C \\leftarrow U$):** Controlling for variables determined *after* treatment can inadvertently condition on a collider, creating phantom correlations between treatment and unobserved errors that were previously independent.\n\nCrucially, this is where predictive machine learning and causal econometrics violently part ways. In predictive modeling, more features almost always reduce test error. If an algorithm wants to predict tomorrow's wage, knowing the applicant's current job title ($M$) is immensely informative, and any model will eagerly incorporate it. But if a policymaker asks: *\"Should we subsidize college tuition to increase national income?\"*, controlling for occupation answers the wrong question. A policy intervention acts at the start of the causal domino chain; blocking intermediate falling dominoes blinds you to the full power of the intervention. **Good controls are predetermined variables established before treatment occurs** (such as birth year or parental education). Bad controls are variables that treatment itself influences.",
          "ar": "في دروس الإحصاء الأولية، يتشرب الطلاب غالبًا عادة شائعة وخطيرة تُعرف بـ **\"انحدار حوض المطبخ\" (Kitchen Sink Regression)**: حشر كل متغير متاح في قاعدة البيانات داخل النموذج، تحت الوهم الساذج بأن إضافة ضوابط إضافية لا تضر أبدًا وتقلل التحيز حتمًا.\n\nفي الاقتصاد القياسي السببي، يعد هذا التفكير كارثيًا. صاغ الباحثان جوشوا أنغريست ويورن-ستيفن بيشكي مصطلح **ضوابط التحكم السيئة (Bad Controls)** للإشارة إلى المتغيرات التي يدمر إدراجها التعريف السببي.\n\nتأتي الضوابط السيئة في صورتين رئيسيتين:\n1. **فخ المتغير الوسيط ($D \\to M \\to Y$):** لنفترض أنك تريد قياس الأثر السببي الإجمالي للشهادة الجامعية ($D$) على الدخل ($Y$). هل يجوز أن تتحكم في متغير \"شغل منصب إداري\" ($M$)؟ **كلا على الإطلاق!** فالوصول إلى المناصب الإدارية هو إحدى القنوات الأساسية التي ترفع الشهادة الجامعية الدخل من خلالها. إذا تحكمت في المنصب الإداري، فإنك تسد أنبوب التدفق السببي؛ وتصبح مقارنتك بين مدير جامعي ومدير غير جامعي متسائلاً: *\"هل تفيد الشهادة إذا لم تساعدك في الحصول على وظيفة أفضل؟\"* لقد قتلت بيدك الأثر ذاته الذي تبحث عنه!\n2. **فخ المصادم (Collider Trap):** التحكم في متغيرات تتحدد *بعد* حدوث المعالجة قد يحولها إلى مصادمات تربط المعالجة بعوامل تشويش خفية كانت مستقلة عنها تمامًا في الأصل.\n\nوهنا يفترق تعلم الآلة التنبؤي عن الاقتصاد القياسي السببي بأوضح صورة: في التنبؤ البحت، كل متغير إضافي يقلل خطأ التنبؤ مرحب به، ومعرفة نوع وظيفة المتقدم الحالية يساعد الخوارزمية في تخمين راتبه بدقة هائلة. أما إذا سأل صانع القرار: *\"هل نزيد المنح الدراسية لرفع الدخل القومي؟\"*، فإن التحكم في نوع الوظيفة يحجب الأثر الكلي للسياسة، لأن جوهر جدوى التعليم يكمن تحديدًا في تمكين الطلاب من الوصول لتلك الوظائف الرفيعة! حجب أحجار الدومينو الوسيطة يعميك عن قوة الدفعة الأولى. **الضوابط الصالحة هي متغيرات سابقة على المعالجة زمنيًا وهيكليًا** (كسنة الميلاد أو تعليم الوالدين)، بينما الضوابط السيئة هي متغيرات تتأثر بالمعالجة ذاتها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "Y_i = \\alpha + \\tau D_i + \\varepsilon_i",
        "formulaNote": {
          "en": "Core invariant for Bad Controls, Mediators, and Overcontrolling.",
          "ar": "الخاصية الرياضية الجوهرية لـ ضوابط التحكم السيئة والمتغيرات الوسيطة وفخ الإفراط في التحكم."
        },
        "narrative": {
          "en": "Suppose treatment directly influences an intermediate mediator $M_i$:\n\n$$\nM_i = \\gamma_0 + \\gamma_1 D_i + u_i\n$$\n\nWhen a researcher includes the mediator $M_i$ in the regression:\n\n$$\nY_i = \\pi_0 + \\tau_{\\text{direct}} D_i + \\theta M_i + \\nu_i\n$$\n\nSubstituting the mediator equation into the mediated outcome equation reveals the **Mediation Decomposition**:\n\n$$\nY_i = (\\pi_0 + \\theta \\gamma_0) + (\\tau_{\\text{direct}} + \\gamma_1 \\theta) D_i + (\\theta u_i + \\nu_i)\n$$\n\nThe total causal effect decomposes into direct and indirect channels:\n\n$$\n\\tau = \\underbrace{\\tau_{\\text{direct}}}_{\\text{Direct Effect}} + \\underbrace{\\gamma_1 \\cdot \\theta}_{\\text{Indirect (Mediated) Effect}}\n$$\n\nControlling for $M_i$ strictly isolates $\\tau_{\\text{direct}}$, completely erasing the indirect transmission channel $\\gamma_1 \\theta$.\n\n### The Collider Danger of Post-Treatment Controls\n\nEven worse, if an unobserved factor $U_i$ (e.g. ambition) affects both the mediator $M_i$ and the outcome $Y_i$, conditioning on $M_i$ induces a negative correlation between treatment $D_i$ and $U_i$:\n\n$$\n\\text{Cov}(D_i, U_i \\mid M_i) \\neq 0\n$$\n\nThis turns a clean randomized trial where $D_i \\perp\\!\\!\\!\\perp U_i$ into an endogenously confounded regression!\n\nTo detect numerical overcontrolling and multicollinearity across regressor columns, the **Variance Inflation Factor (VIF)** of column $j$ is calculated via auxiliary regressions:\n\n$$\n\\text{VIF}_j = \\frac{1}{1 - R_j^2}\n$$\n\nwhere $R_j^2$ is the coefficient of determination from regressing regressor $\\mathbf{x}_j$ onto all remaining $K-1$ regressors.\n\n* $\\tau$: Total causal effect of policy treatment $D_i$ on final outcome $Y_i$.\n* $M_i$: Post-treatment mediator situated on the causal pathway from treatment to outcome.\n* $\\gamma_1$: First-stage effect of treatment on the mediator ($D \\to M$).\n* $\\theta$: Partial effect of the mediator on the outcome holding treatment constant ($M \\to Y$).\n* $\\tau_{\\text{direct}}$: Direct effect of treatment bypassing the mediator.\n* $\\text{VIF}_j$: Variance Inflation Factor; $\\text{VIF}_j > 10$ indicates severe multicollinearity where regressor $j$ is largely redundant.\n\nImplement the Variance Inflation Factor (VIF) diagnostic tool for each column in a design matrix using auxiliary regressions to diagnose severe overcontrolling and collinearity.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-bad-controls-mediators-overcontrolling",
          "starterCode": "def compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Matrix of explanatory covariates (K >= 2).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,)\n        VIF values for each column.\n    \"\"\"\n    # Step 1: Extract target column j to predict\n    # Step 2: Form matrix of all other K - 1 regressors with an intercept\n    # Step 3: Fit auxiliary regression y_j on X_aux and predict fitted values\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Matrix of explanatory covariates (K >= 2).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,)\n        VIF values for each column.\n    \"\"\"\n    # Step 1: Extract target column j to predict\n    # Step 2: Form matrix of all other K - 1 regressors with an intercept\n    # Step 3: Fit auxiliary regression y_j on X_aux and predict fitted values\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Matrix of explanatory covariates (K >= 2).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,)\n        VIF values for each column.\n    \"\"\"\n    N, K = X.shape\n    vifs = np.zeros(K)\n    \n    for j in range(K):\n        # Step 1: Extract target column j to predict\n        y_j = X[:, j]\n        \n        # Step 2: Form matrix of all other K - 1 regressors with an intercept\n        other_indices = [idx for idx in range(K) if idx != j]\n        X_others = X[:, other_indices]\n        X_aux = np.column_stack([np.ones(N), X_others])\n        \n        # Step 3: Fit auxiliary regression y_j on X_aux and predict fitted values\n        XtX = X_aux.T @ X_aux\n        Xty = X_aux.T @ y_j\n        beta_aux = np.linalg.solve(XtX, Xty)\n        y_hat_j = X_aux @ beta_aux\n        \n        # Step 4: Compute auxiliary R_j^2 and calculate VIF_j = 1 / (1 - R_j^2)\n        y_bar = np.mean(y_j)\n        tss = np.sum((y_j - y_bar) ** 2)\n        ssr = np.sum((y_j - y_hat_j) ** 2)\n        \n        r2_j = 1.0 - (ssr / tss) if tss > 1e-12 else 0.0\n        \n        if r2_j >= 0.999999:\n            vifs[j] = 1e6\n        else:\n            vifs[j] = 1.0 / (1.0 - r2_j)\n            \n    return vifs"
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
      "en": "Before Jerzy Neyman and Donald Rubin formalized the Potential Outcomes Framework, causal claims in science were trapped in vague...",
      "ar": "قبل أن يصوغ جيرزي نيمان ودونالد روبين إطار النتائج المحتملة (Potential Outcomes Framework)، كانت مناقشات السببية حبيسة جدالات فلسفية ولغوية..."
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
          "en": "Before Jerzy Neyman and Donald Rubin formalized the **Potential Outcomes Framework**, causal claims in science were trapped in vague philosophical debates. Rubin demystified causality by anchoring it to a single, concrete question: **\"What if?\"**\n\nFor every individual person $i$, imagine two parallel universes:\n* Universe 1: You take an experimental headache pill ($D_i = 1$). Your headache severity is $Y_i(1)$.\n* Universe 0: You do not take the pill ($D_i = 0$). Your headache severity is $Y_i(0)$.\n\nThe true causal effect of the pill for *you specifically* is the difference between these two parallel realities:\n\n$$\n\\tau_i = Y_i(1) - Y_i(0)\n$$\n\nHere lies **The Fundamental Problem of Causal Inference**: in the real physical universe, time moves in only one direction! You either swallow the pill or you don't. You can never observe both potential outcomes for the same person at the same moment. One outcome is factual (realized and recorded); the other is a **missing counterfactual**.\n\nTherefore, causal inference is fundamentally a **missing data problem**. We can never know an individual's personal causal effect $\\tau_i$ with certainty. The entire enterprise of empirical science is designing clever ways to replace the missing counterfactual with a credible group-level substitute.\n\nThis framework exposes the sharp division between machine learning prediction and causal decision-making. Predictive algorithms predict conditional expectations in the observed world: $\\mathbb{E}[Y \\mid D = 1]$. For an emergency room triage model, predicting that ICU patients have a high mortality rate is mathematically accurate and clinically useful for allocating palliative resources. But mistaking this predictive risk score for a causal effect leads to the horrifying conclusion that ICUs kill patients! Machine learning asks: *\"What is the expected outcome of people who choose treatment?\"* Causal inference asks: *\"What would be the outcome if we actively assigned treatment to someone who otherwise would not have received it?\"* Prediction looks at passive realization; causality evaluates counterfactual intervention.\n\n$$\n\\tau_i = Y_i(1) - Y_i(0)\n$$",
          "ar": "قبل أن يصوغ جيرزي نيمان ودونالد روبين **إطار النتائج المحتملة (Potential Outcomes Framework)**، كانت مناقشات السببية حبيسة جدالات فلسفية ولغوية غامضة. أزال روبين الغموض عن السببية بربطها بسؤال واحد دقيق ومحدد: **\"ماذا لو حدث العكس؟\"**\n\nلكل شخص $i$ في المجتمع، تخيل وجود عالمين متوازيين:\n* العالم 1: تتناول قرص دواء تجريبي للصداع ($D_i = 1$). وتكون شدة الصداع الناتجة $Y_i(1)$.\n* العالم 0: لا تتناول الدواء إطلاقًا ($D_i = 0$). وتكون شدة الصداع $Y_i(0)$.\n\nالأثر السببي الحقيقي للدواء *بالنسبة لك أنت تحديدًا* هو الفارق بين هذين المسارين المتوازيين:\n\nوهنا تصطدم بالحقيقة التي لا مفر منها: **المشكلة الجوهرية للاستدلال السببي (The Fundamental Problem of Causal Inference)**: في الكون الفيزيائي الواقعي، يسير الوقت في اتجاه واحد! إما أن تبتلع القرص أو تتركه. يستحيل رصد كلتا النتيجتين المحتملتين للشخص نفسه في اللحظة الزمنية ذاتها. إحدى النتيجتين تتحقق وتصبح واقعًا مرصودًا، بينما تظل النتيجة الأخرى **بديلاً مقابلاً للواقع مفقودًا إلى الأبد (Missing Counterfactual)**.\n\nلهذا السبب، فإن الاستدلال السببي هو في جوهره **مسألة بيانات مفقودة**. لا يمكننا أبدًا معرفة الأثر الفردي $\\tau_i$ بدقة مطلقة لأي شخص بمفرده. وغاية العلم التجريبي برمته هي ابتكار طرق منهجية ذكية لاستبدال المسار المفقود ببديل جماعي موثوق ومكافئ للواقع.\n\nيوضح هذا الإطار بدقة بالغة الحد الفاصل بين التنبؤ والقرار السببي: نماذج تعلم الآلة التنبؤية تحسب التوقع الشرطي في الواقع المرصود $\\mathbb{E}[Y \\mid D = 1]$. فلو تنبأ نموذج في قسم الطوارئ بأن المرضى الذين يدخلون العناية المركزة ترتفع احتمالية وفاتهم، فهذا تنبؤ إحصائي دقيق ومفيد لفرز الحالات الحرجة. لكن الخلط بين هذا التنبؤ والسببية يقود إلى نتيجة كارثية تدعي أن العناية المركزة تقتل المرضى! تعلم الآلة يسأل: *\"ما هي النتيجة المتوقعة لمن اختاروا العلاج في الواقع؟\"* بينما الاستدلال السببي يسأل: *\"ماذا كان سيحدث لهذا المريض تحديدًا لو تدخلنا ومنحناه العلاج بدلاً من تركه دون علاج؟\"* التنبؤ يرصد الواقع القائم، بينما السببية تفحص التدخل المقابل للواقع."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0) = Y_i(0) + D_i \\big[Y_i(1) - Y_i(0)\\big]",
        "formulaNote": {
          "en": "Core invariant for The Rubin Causal Model & The Fundamental Problem of Causal Inference.",
          "ar": "الخاصية الرياضية الجوهرية لـ نموذج روبين السببي والمشكلة الجوهرية للاستدلال السببي."
        },
        "narrative": {
          "en": "### SUTVA (Stable Unit Treatment Value Assumption)\n\nThe potential outcomes representation implicitly requires two structural pillars known as **SUTVA**:\n1. **No Interference:** The potential outcome of unit $i$ does not depend on the treatment assignment of unit $j$ ($Y_i(d_1, \\dots, d_N) = Y_i(d_i)$).\n2. **No Hidden Variations:** There is only one version of treatment $D_i = 1$ (e.g. all treated patients receive the identical dosage and drug potency).\n\n### Foundational Population Causal Benchmarks\n\n1. **Average Treatment Effect (ATE):**\n   $$\\text{ATE} \\equiv \\mathbb{E}\\big[Y_i(1) - Y_i(0)\\big]$$\n2. **Average Treatment Effect on the Treated (ATT):**\n   $$\\text{ATT} \\equiv \\mathbb{E}\\big[Y_i(1) - Y_i(0) \\mid D_i = 1\\big]$$\n3. **Average Treatment Effect on the Untreated (ATUT):**\n   $$\\text{ATUT} \\equiv \\mathbb{E}\\big[Y_i(1) - Y_i(0) \\mid D_i = 0\\big]$$\n\n### Mathematical Derivation of the Selection Bias Decomposition\n\nWhen an analyst naively compares observed group means:\n\n$$\n\\Delta_{\\text{naive}} \\equiv \\mathbb{E}[Y_i \\mid D_i = 1] - \\mathbb{E}[Y_i \\mid D_i = 0]\n$$\n\nSubstituting the realized outcome equation:\n\n$$\n\\Delta_{\\text{naive}} = \\mathbb{E}[Y_i(1) \\mid D_i = 1] - \\mathbb{E}[Y_i(0) \\mid D_i = 0]\n$$\n\nAdd and subtract $\\mathbb{E}[Y_i(0) \\mid D_i = 1]$:\n\n$$\n\\Delta_{\\text{naive}} = \\Big(\\mathbb{E}[Y_i(1) \\mid D_i = 1] - \\mathbb{E}[Y_i(0) \\mid D_i = 1]\\Big) + \\Big(\\mathbb{E}[Y_i(0) \\mid D_i = 1] - \\mathbb{E}[Y_i(0) \\mid D_i = 0]\\Big)\n$$\n\n$$\n\\Delta_{\\text{naive}} = \\underbrace{\\mathbb{E}[Y_i(1) - Y_i(0) \\mid D_i = 1]}_{\\text{ATT}} + \\underbrace{\\Big\\{ \\mathbb{E}[Y_i(0) \\mid D_i = 1] - \\mathbb{E}[Y_i(0) \\mid D_i = 0] \\Big\\}}_{\\text{Baseline Selection Bias}}\n$$\n\nIf treatment effects are heterogeneous across groups, the decomposition relative to population ATE becomes:\n\n$$\n\\Delta_{\\text{naive}} = \\text{ATE} + \\underbrace{\\Big( \\mathbb{E}[Y(0) \\mid D=1] - \\mathbb{E}[Y(0) \\mid D=0] \\Big)}_{\\text{Baseline Selection Bias}} + \\underbrace{(1 - \\pi)\\Big( \\text{ATT} - \\text{ATUT} \\Big)}_{\\text{Heterogeneous Effect Bias}}\n$$\n\nwhere $\\pi = \\mathbb{P}(D_i = 1)$ is the proportion of treated units.\n\n* $D_i \\in \\{0, 1\\}$: Binary treatment assignment indicator ($1$ for treated group, $0$ for control).\n* $Y_i(1)$: Potential outcome of unit $i$ if assigned to treatment.\n* $Y_i(0)$: Potential outcome of unit $i$ if assigned to control (counterfactual state).\n* $Y_i$: Observed scalar outcome actually realized in the dataset.\n* $\\text{ATE}$: The expected average causal impact across the entire population.\n* $\\text{ATT}$: The expected average causal impact on individuals who actively received treatment.\n* $\\text{Selection Bias}$: Difference in baseline potential outcomes in the absence of treatment between those who received treatment and those who did not.\n\nImplement the potential outcomes decomposition. Given known potential outcome vectors $Y(0)$, $Y(1)$, and treatment assignments $D$, synthesize the realized outcome $Y$ and calculate ATE, ATT, naive difference in means, and exact selection bias.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-rubin-causal-model-potential-outcomes",
          "starterCode": "def decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Decomposes the naive difference in means into ATT and Baseline Selection Bias.\n    \n    Parameters\n    ----------\n    y0 : np.ndarray of shape (N,)\n        Potential untreated outcomes Y(0).\n    y1 : np.ndarray of shape (N,)\n        Potential treated outcomes Y(1).\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (1 = treated, 0 = control).\n        \n    Returns\n    -------\n    dict with keys:\n        'ate': float, Average Treatment Effect E[Y(1) - Y(0)]\n        'att': float, Treatment effect on the treated E[Y(1) - Y(0) | D=1]\n        'naive_diff': float, Difference in realized sample means\n        'selection_bias': float, E[Y(0) | D=1] - E[Y(0) | D=0]\n    \"\"\"\n    # Step 1: Synthesize observable realized outcome Y = D * Y(1) + (1 - D) * Y(0)\n    # Step 2: Calculate true population ATE\n    # Masks for treated and control groups\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Decomposes the naive difference in means into ATT and Baseline Selection Bias.\n    \n    Parameters\n    ----------\n    y0 : np.ndarray of shape (N,)\n        Potential untreated outcomes Y(0).\n    y1 : np.ndarray of shape (N,)\n        Potential treated outcomes Y(1).\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (1 = treated, 0 = control).\n        \n    Returns\n    -------\n    dict with keys:\n        'ate': float, Average Treatment Effect E[Y(1) - Y(0)]\n        'att': float, Treatment effect on the treated E[Y(1) - Y(0) | D=1]\n        'naive_diff': float, Difference in realized sample means\n        'selection_bias': float, E[Y(0) | D=1] - E[Y(0) | D=0]\n    \"\"\"\n    # Step 1: Synthesize observable realized outcome Y = D * Y(1) + (1 - D) * Y(0)\n    # Step 2: Calculate true population ATE\n    # Masks for treated and control groups\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "import numpy as np\n\ndef decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Decomposes the naive difference in means into ATT and Baseline Selection Bias.\n    \n    Parameters\n    ----------\n    y0 : np.ndarray of shape (N,)\n        Potential untreated outcomes Y(0).\n    y1 : np.ndarray of shape (N,)\n        Potential treated outcomes Y(1).\n    d : np.ndarray of shape (N,)\n        Binary treatment indicator (1 = treated, 0 = control).\n        \n    Returns\n    -------\n    dict with keys:\n        'ate': float, Average Treatment Effect E[Y(1) - Y(0)]\n        'att': float, Treatment effect on the treated E[Y(1) - Y(0) | D=1]\n        'naive_diff': float, Difference in realized sample means\n        'selection_bias': float, E[Y(0) | D=1] - E[Y(0) | D=0]\n    \"\"\"\n    # Step 1: Synthesize observable realized outcome Y = D * Y(1) + (1 - D) * Y(0)\n    y_obs = d * y1 + (1 - d) * y0\n    \n    # Step 2: Calculate true population ATE\n    ate = float(np.mean(y1 - y0))\n    \n    # Masks for treated and control groups\n    treated_mask = (d == 1)\n    control_mask = (d == 0)\n    \n    # Step 3: Calculate ATT = E[Y(1) - Y(0) | D=1]\n    att = float(np.mean(y1[treated_mask] - y0[treated_mask]))\n    \n    # Step 4: Calculate naive difference in observed group means\n    mean_y_treated = float(np.mean(y_obs[treated_mask]))\n    mean_y_control = float(np.mean(y_obs[control_mask]))\n    naive_diff = mean_y_treated - mean_y_control\n    \n    # Step 5: Calculate baseline selection bias = E[Y(0) | D=1] - E[Y(0) | D=0]\n    selection_bias = float(np.mean(y0[treated_mask]) - np.mean(y0[control_mask]))\n    \n    return {\n        \"ate\": ate,\n        \"att\": att,\n        \"naive_diff\": naive_diff,\n        \"selection_bias\": selection_bias,\n    }"
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
      "en": "Why was the simple act of tossing a coin or drawing lottery numbers celebrated as a Nobel-prize-winning breakthrough in economics and...",
      "ar": "لماذا اعتُبر الفعل البسيط المتمثل في رمي قطعة نقود أو السحب بالقرعة فتحًا علميًا استحق أرفع جوائز نوبل في الاقتصاد والعلوم الاجتماعية؟ لأنه..."
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
          "en": "Why was the simple act of tossing a coin or drawing lottery numbers celebrated as a Nobel-prize-winning breakthrough in economics and social science?\n\nBecause in human societies, **nobody chooses actions at random**. Sick people visit doctors; ambitious and wealthy students enroll in prestigious universities; struggling, low-margin businesses apply for government relief subsidies. Whenever individuals select themselves into treatment, observed comparisons are poisoned by **Selection Bias**.\n\nA randomized lottery operates as a **causal scalpel**:\nBy assigning treatment strictly through a random coin toss ($D_i \\perp\\!\\!\\perp (Y_i(0), Y_i(1))$), the lottery severs every pre-existing link between a participant's background health, wealth, drive, or genetic makeup and their receipt of treatment.\n\nBefore the medicine is administered, the treated cohort and the control cohort are **statistical twins** across every observable and unobservable characteristic on Earth. In mathematical expectation, their baseline untreated outcomes are perfectly equal:\n\n$$\n\\mathbb{E}[Y_i(0) \\mid D_i = 1] = \\mathbb{E}[Y_i(0) \\mid D_i = 0]\n$$\n\nThe selection bias term evaporates to exactly zero! Any difference in post-treatment outcomes can now be attributed solely and unambiguously to the causal potency of the treatment itself.\n\nThis highlights the profound chasm between passive prediction and active policy intervention. Consider a mobile health app: an AI algorithm predicting user health will observe that users who log 30 workouts a month have resting heart rates 15 beats per minute lower than non-users. For a life insurance company pricing risk, this predictive score is completely valid—it identifies healthy people. But for a user deciding whether to pay for the subscription, the causal question is entirely different: *\"If I, as a sedentary individual, start using this app, will my heart rate drop by 15 bpm?\"* The answer is almost certainly no. A huge fraction of that 15 bpm gap reflects self-selection—the people who voluntarily exercise daily are already younger, leaner, and eat healthier diets. Prediction passively sorts individuals based on existing differences; RCTs actively intervene to measure true biological or economic transformation.\n\n$$\n\\mathbb{E}[Y_i(0) \\mid D_i = 1] = \\mathbb{E}[Y_i(0) \\mid D_i = 0]\n$$",
          "ar": "لماذا اعتُبر الفعل البسيط المتمثل في رمي قطعة نقود أو السحب بالقرعة فتحًا علميًا استحق أرفع جوائز نوبل في الاقتصاد والعلوم الاجتماعية؟\n\nلأنه في المجتمعات البشرية، **لا يتخذ أحد قراراته بصورة عشوائية**. فالمرضى هم من يقصدون الأطباء، والطلاب الأوسع طموحًا وثراءً هم من يلتحقون بالجامعات المرموقة، والشركات الأشد تعثرًا هي من تتقدم بطلبات الدعم الحكومي. وعندما يختار الأفراد مسارهم بأنفسهم، تتلوث المقارنات المباشرة بـ **انحياز الاختيار (Selection Bias)**.\n\nتعمل القرعة العشوائية كـ **مشرط جراحي سببي**:\nبتوزيع المعالجة عبر يانصيب عشوائي بحت ($D_i \\perp\\!\\!\\perp (Y_i(0), Y_i(1))$)، تقطع القرعة أي صلة مسبقة بين صفات المشارك الذاتية (كالصحة أو الثروة أو الدافع الفطري) وقرار تلقيه العلاج.\n\nوقبل إعطاء العلاج، تصبح المجموعة المعالجة والمجموعة الضابطة **توأمين إحصائيين متطابقين** في كافة الخصائص المرصودة وغير المرصودة. وفي التوقع الرياضي، تتطابق نتائجهما الأساسية تمامًا في غياب المعالجة:\n\nيتلاشى انحياز الاختيار ليصبح صفرًا رياضيًا تامًا! وأي فارق يُرصد لاحقًا في النتائج يُنسب يقينًا إلى الأثر السببي الصافي للمعالجة وحدها دون أي تشويش.\n\nوهنا يبرز الصدع العميق بين التنبؤ السلبي والتدخل السببي الفعلي: تأمل تطبيقًا للهواتف الذكية للياقة البدنية؛ يستطيع نموذج تنبؤي أن يرصد بدقة أن مستخدمي التطبيق الذين يمارسون الرياضة 30 يومًا شهريًا ينخفض معدل نبضات قلوبهم بمقدار 15 نبضة/دقيقة مقارنة بغيرهم. لشركة تأمين تسعى لتسعير البوالص، هذا التنبؤ ممتاز لتصنيف الأصحاء. لكن بالنسبة لشخص خامل يفكر في شراء التطبيق، فإن السؤال السببي مختلف تمامًا: *\"إذا بدأتُ أنا في استخدام هذا التطبيق، هل سينخفض نبضي بمقدار 15 نبضة؟\"* الإجابة هي لا؛ لأن جزءًا هائلاً من هذا الفارق يعود لانحياز الاختيار الذاتي؛ فالذين يمارسون الرياضة بانتظام هم في الأصل أصغر سنًا وأفضل تغذية ويمتلكون جينات رياضية مسبقة. التنبؤ يرصد الفروق القائمة، بينما التجارب العشوائية تصنع التغيير الحقيقي وتقيسه."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "D_i \\perp\\!\\!\\perp \\big(Y_i(0), Y_i(1)\\big)",
        "formulaNote": {
          "en": "Core invariant for Selection Bias Decomposition & Randomized Controlled Trials.",
          "ar": "الخاصية الرياضية الجوهرية لـ تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة."
        },
        "narrative": {
          "en": "This independence immediately guarantees balance in untreated counterfactuals:\n\n$$\n\\mathbb{E}[Y_i(0) \\mid D_i = 1] = \\mathbb{E}[Y_i(0) \\mid D_i = 0] = \\mathbb{E}[Y_i(0)]\n$$\n\n$$\n\\mathbb{E}[Y_i(1) \\mid D_i = 1] = \\mathbb{E}[Y_i(1) \\mid D_i = 0] = \\mathbb{E}[Y_i(1)]\n$$\n\nSubstituting this into the selection bias decomposition eliminates the bias term:\n\n$$\n\\Delta_{\\text{naive}} = \\mathbb{E}[Y_i \\mid D_i = 1] - \\mathbb{E}[Y_i \\mid D_i = 0] = \\mathbb{E}[Y_i(1)] - \\mathbb{E}[Y_i(0)] \\equiv \\text{ATE} = \\text{ATT}\n$$\n\n### Observational Identification: The Horvitz-Thompson IPW Proof\n\nWhen working with observational data where random assignment is absent, we invoke the **Conditional Independence Assumption (CIA)**:\n\n$$\nD_i \\perp\\!\\!\\perp \\big(Y_i(0), Y_i(1)\\big) \\mid \\mathbf{X}_i\n$$\n\nalong with the **Overlap / Positivity Assumption**: $0 < e(\\mathbf{X}_i) < 1$, where the **Propensity Score** is:\n\n$$\ne(\\mathbf{X}_i) \\equiv \\mathbb{P}(D_i = 1 \\mid \\mathbf{X}_i)\n$$\n\nWe now rigorously prove that Inverse Probability Weighting (IPW) recovers $\\mathbb{E}[Y_i(1)]$ using the Law of Iterated Expectations:\n\n$$\n\\mathbb{E}\\left[ \\frac{D_i Y_i}{e(\\mathbf{X}_i)} \\right] = \\mathbb{E}\\left[ \\mathbb{E}\\left[ \\frac{D_i Y_i(1)}{e(\\mathbf{X}_i)} \\;\\Bigg|\\; \\mathbf{X}_i \\right] \\right] = \\mathbb{E}\\left[ \\frac{\\mathbb{E}[D_i \\mid \\mathbf{X}_i] \\cdot \\mathbb{E}[Y_i(1) \\mid \\mathbf{X}_i]}{e(\\mathbf{X}_i)} \\right]\n$$\n\nBecause $\\mathbb{E}[D_i \\mid \\mathbf{X}_i] \\equiv e(\\mathbf{X}_i)$, the propensity score in the numerator and denominator cancel out exactly:\n\n$$\n= \\mathbb{E}\\left[ \\frac{e(\\mathbf{X}_i) \\mathbb{E}[Y_i(1) \\mid \\mathbf{X}_i]}{e(\\mathbf{X}_i)} \\right] = \\mathbb{E}\\big[\\mathbb{E}[Y_i(1) \\mid \\mathbf{X}_i]\\big] = \\mathbb{E}[Y_i(1)]\n$$\n\nBy an identical algebraic step, $\\mathbb{E}\\left[ \\frac{(1 - D_i) Y_i}{1 - e(\\mathbf{X}_i)} \\right] = \\mathbb{E}[Y_i(0)]$. Subtracting the two terms yields the consistent **IPW ATE Estimator**:\n\n$$\n\\hat{\\tau}_{\\text{IPW}} = \\frac{1}{N} \\sum_{i=1}^N \\left( \\frac{D_i Y_i}{e(\\mathbf{X}_i)} - \\frac{(1 - D_i) Y_i}{1 - e(\\mathbf{X}_i)} \\right)\n$$\n\n* $\\perp\\!\\!\\perp$: Orthogonal statistical independence relation between random variables.\n* $D_i \\perp\\!\\!\\perp (Y_i(0), Y_i(1))$: Random assignment invariant ensuring absence of unobserved confounding.\n* $e(\\mathbf{X}_i) \\in (0, 1)$: Propensity score representing the conditional probability of assignment to treatment given observable covariates $\\mathbf{X}_i$.\n* $\\hat{\\tau}_{\\text{IPW}}$: Horvitz-Thompson / Inverse Probability Weighting estimator which reconstructs an artificial randomized trial by weighting observational units by the inverse probability of their assigned status.\n\nImplement the normalized Inverse Probability Weighting (IPW) estimator for the Average Treatment Effect (ATE). Ensure numerical stability by clipping extreme propensity scores away from $0$ and $1$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-selection-bias-randomized-trials",
          "starterCode": "def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:\n    \"\"\"\n    Computes the Inverse Probability Weighted (IPW) Average Treatment Effect.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 = treated, 0 = control).\n    ps : np.ndarray of shape (N,)\n        Estimated propensity scores P(D=1|X) in (0, 1).\n    normalized : bool, default True\n        Whether to use Hajek self-normalized weights.\n        \n    Returns\n    -------\n    float: Estimated Average Treatment Effect (ATE)\n    \"\"\"\n    # Step 1: Clip propensity scores to avoid division by zero or explosive weights\n    # Step 2: Construct individual Horvitz-Thompson weights\n    # Hajek normalized estimator: divides by sum of weights\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:\n    \"\"\"\n    Computes the Inverse Probability Weighted (IPW) Average Treatment Effect.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 = treated, 0 = control).\n    ps : np.ndarray of shape (N,)\n        Estimated propensity scores P(D=1|X) in (0, 1).\n    normalized : bool, default True\n        Whether to use Hajek self-normalized weights.\n        \n    Returns\n    -------\n    float: Estimated Average Treatment Effect (ATE)\n    \"\"\"\n    # Step 1: Clip propensity scores to avoid division by zero or explosive weights\n    # Step 2: Construct individual Horvitz-Thompson weights\n    # Hajek normalized estimator: divides by sum of weights\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "5.5"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:\n    \"\"\"\n    Computes the Inverse Probability Weighted (IPW) Average Treatment Effect.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 = treated, 0 = control).\n    ps : np.ndarray of shape (N,)\n        Estimated propensity scores P(D=1|X) in (0, 1).\n    normalized : bool, default True\n        Whether to use Hajek self-normalized weights.\n        \n    Returns\n    -------\n    float: Estimated Average Treatment Effect (ATE)\n    \"\"\"\n    # Step 1: Clip propensity scores to avoid division by zero or explosive weights\n    ps_clipped = np.clip(ps, 0.01, 0.99)\n    \n    # Step 2: Construct individual Horvitz-Thompson weights\n    w_treated = d / ps_clipped\n    w_control = (1.0 - d) / (1.0 - ps_clipped)\n    \n    if normalized:\n        # Hajek normalized estimator: divides by sum of weights\n        sum_w_t = np.sum(w_treated)\n        sum_w_c = np.sum(w_control)\n        \n        mean_y1 = np.sum(w_treated * y) / sum_w_t if sum_w_t > 0 else 0.0\n        mean_y0 = np.sum(w_control * y) / sum_w_c if sum_w_c > 0 else 0.0\n        ate = float(mean_y1 - mean_y0)\n    else:\n        # Standard Horvitz-Thompson sample average\n        N = len(y)\n        ate = float(np.sum(w_treated * y - w_control * y) / N)\n        \n    return ate"
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
      "en": "Judea Pearl revolutionized causal inference and empirical economics by replacing dense, impenetrable probabilistic algebra with...",
      "ar": "أحدث عالم الحاسوب والمنطق جوديا بيرل (Judea Pearl) ثورة كبرى في الاستدلال السببي والقياس الاقتصادي، حين استبدل المعادلات الجبرية الاحتمالية..."
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
          "en": "Judea Pearl revolutionized causal inference and empirical economics by replacing dense, impenetrable probabilistic algebra with transparent, intuitive visual network maps: **Causal Directed Acyclic Graphs (DAGs)**. In standard statistics, correlation is a symmetric, bidirectional street: $\\text{Corr}(X, Y) = \\text{Corr}(Y, X)$. If rooster crowing and sunrise are correlated, a standard regression algorithm cannot tell which one creates the other. A causal DAG breaks this symmetry with directed arrows ($X \\to Y$), providing a rigorous mathematical syntax for *cause and effect*.\n\nThink of statistical information flowing through a causal graph like water running through an interconnected plumbing network or electrical current coursing through a circuit board. How the pipes connect determines whether information flows naturally, gets blocked, or leaks through unintended conduits:\n1. **The Chain ($X \\to M \\to Y$):** Information flows directly from treatment $X$ through the mediator $M$ to outcome $Y$. Smoking ($X$) causes cellular DNA damage ($M$), which causes lung cancer ($Y$). If you install an shutoff valve at $M$ (condition on $M$), the pipe is closed, and the transmission of information halts.\n2. **The Fork ($X \\leftarrow Z \\to Y$):** Variable $Z$ is a **confounder**—a common ancestor feeding into both $X$ and $Y$. Because water flows downhill out of $Z$ in both directions, an unauthorized **\"Backdoor Path\"** connects $X$ and $Y$ even if there is zero direct pipe connecting them!\n\nConsider the classic real-world paradox: municipal ice cream sales ($X$) and coastal drowning deaths ($Y$) display a strong, statistically significant positive correlation. Does eating chocolate chip ice cream cause swimmers to cramp up and drown? Obviously not. Summer heatwaves ($Z$) are the common fork: blistering temperatures induce people to buy ice cream ($Z \\to X$) while simultaneously driving thousands of families to swim in the ocean ($Z \\to Y$). If an empirical researcher regresses drownings on ice cream sales without adjusting for ambient temperature, the backdoor pipe remains wide open, flooding the regression with phantom association.\n\nCrucially, causal DAGs demystify the profound divide between prediction and causation. A predictive machine learning model asks: *\"Given that ice cream sales surged by $40\\%$ today, what will happen to drowning deaths?\"* It will accurately forecast higher drownings because observing ice cream carries information about the summer heat. That is passive surveillance. Econometrics and causal inference ask a fundamentally different, interventional question: *\"What would happen if the city mayor passed an emergency ordinance banning all ice cream sales tomorrow?\"* Under an intervention, drownings would not drop by a single person—because severing the ice cream market leaves the summer heat untouched. Prediction listens to the ambient chatter of the network; causal inference calculates the surgical consequence of turning an actual valve. Pearl's **Backdoor Criterion** is the exact blueprint for which valves to shut to isolate genuine policy impacts.",
          "ar": "أحدث عالم الحاسوب والمنطق جوديا بيرل (Judea Pearl) ثورة كبرى في الاستدلال السببي والقياس الاقتصادي، حين استبدل المعادلات الجبرية الاحتمالية المعقدة بشبكات بصرية بديهية ودقيقة للغاية: **المخططات الموجهة غير الدائرية (Causal DAGs)**. في الإحصاء التقليدي، يمثل الارتباط طريقًا ذا اتجاهين متناظرين تمامًا: $\\text{Corr}(X, Y) = \\text{Corr}(Y, X)$. إذا كان صياح الديك وشروق الشمس مرتبطين إحصائيًا، فإن خوارزمية الانحدار تعجز تمامًا عن معرفة أيهما يصنع الآخر! تكسر مخططات DAG هذا التناظر عبر أسهم موجهة صريحة ($X \\to Y$) تمنحنا لغة رياضية صارمة للسبب والأثر.\n\nتخيل تدفق المعلومات الإحصائية عبر الرسم البياني السببي كتدفق المياه في شبكة سباكة منزلية أو سريان التيار الكهربائي في لوحة مفاتيح؛ إذ تحدد طريقة اتصال الأنابيب مسار التدفق:\n1. **السلسلة ($X \\to M \\to Y$):** تتدفق المياه مباشرة من المعالجة $X$ عبر المتغير الوسيط $M$ إلى النتيجة النهائية $Y$. التدخين ($X$) يسبب تلف الحمض النووي للخلايا ($M$)، والتلف يسبب سرطان الرئة ($Y$). إذا قمت بتركيب صمام إغلاق عند $M$ (أي قمت بضبط أو تثبيت $M$)، يُغلق الأنبوب ويتوقف تدفق المعلومات كليًا.\n2. **الشوكة المربكة ($X \\leftarrow Z \\to Y$):** هنا يمثل المتغير $Z$ **مربكًا أصيلاً (Confounder)**—وهو جذر مشترك يغذي كلاً من $X$ و $Y$. ولأن المياه تتدفق تلقائيًا من القمة $Z$ في كلا الاتجاهين، ينشأ **\"مسار باب خلفي\" (Backdoor Path)** غير سببي يربط بين $X$ و $Y$ حتى لو لم يكن بينهما أي أنبوب مباشر!\n\nتأمل المفارقة الواقعية الشهيرة: مبيعات الآيس كريم في المدن الساحلية ($X$) وحالات الغرق في البحر ($Y$) ترتبطان بعلاقة طردية قوية ذات دلالة إحصائية. فهل يؤدي التهام الآيس كريم إلى تقلص عضلات السباحين وغرقهم؟ بالطبع لا! إن موجات الحر القائظ في الصيف ($Z$) هي الشوكة المشتركة الحقيقية: فارتفاع درجات الحرارة يدفع الناس لشراء المرطبات ($Z \\to X$)، ويدفع في الوقت نفسه مئات الآلاف للنزول إلى شاطئ البحر للسباحة ($Z \\to Y$). فإذا قام باحث سليم النية ببناء نموذج انحدار للغرق على مبيعات الآيس كريم دون عزل درجة الحرارة، يظل أنبوب الباب الخلفي مفتوحًا على مصراعيه، مغرقًا التقديرات بارتباط زائف ومضلل.\n\nوالأهم من ذلك أن مخططات DAG تزيل الغموض الفاصل بين التنبؤ والسببية. يسأل نموذج تعلم الآلة التنبؤي: *\"إذا رصدنا اليوم قفزة بنسبة $40\\%$ في مبيعات الآيس كريم، فماذا سيحدث لمعدل الغرق؟\"* سيتنبأ النموذج بدقة بارتفاع حالات الغرق لأن مراقبة الآيس كريم تحمل معلومة غير مباشرة عن سخونة الطقس؛ وهذا رصد سلبي محض. أما القياس الاقتصادي وصانع السياسات فيطرحان سؤالاً تدخليًا جذريًا: *\"ماذا سيحدث لمعدل الغرق لو أصدر عمدة المدينة قرارًا بحظر بيع الآيس كريم غدًا؟\"* لن تنخفض حالات الغرق بمقدار حالة واحدة، لأن قطع بيع المثلجات يترك حرارة الشمس المشتعلة كما هي دون مساس! التنبؤ ينصت لضجيج الارتباطات المتشابكة، بينما الاستدلال السببي يحسب بدقة نتائج التدخل الفعلي في صمامات الواقع. ويُعد **معيار الباب الخلفي لجوديا بيرل** هو الدليل الهندسي الدقيق الذي يخبرك بالصمامات الواجب إغلاقها بدقة لعزل التأثير السببي الحقيقي للسياسات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "P(Y, M, X) = P(X) P(M \\mid X) P(Y \\mid M)",
        "formulaNote": {
          "en": "Core invariant for Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation.",
          "ar": "الخاصية الرياضية الجوهرية لـ المخططات السببية الموجهة غير الدائرية ومسارات الفصل d."
        },
        "narrative": {
          "en": "*Unconditional state:* Active (information flows; $X \\not\\!\\perp\\!\\!\\!\\perp Y$).\n   *Conditioned on $M$:* Blocked ($X \\perp\\!\\!\\!\\perp Y \\mid M$).\n\n2. **Fork (Confounder):** $X \\leftarrow Z \\to Y$\n   $$P(X, Y, Z) = P(Z) P(X \\mid Z) P(Y \\mid Z)$$\n   *Unconditional state:* Active (spurious association flows; $X \\not\\!\\perp\\!\\!\\!\\perp Y$).\n   *Conditioned on $Z$:* Blocked ($X \\perp\\!\\!\\!\\perp Y \\mid Z$).\n\n3. **Collider (Mutual Effect):** $X \\to C \\leftarrow Y$\n   $$P(X, Y, C) = P(X) P(Y) P(C \\mid X, Y)$$\n   *Unconditional state:* **Blocked** by default ($X \\perp\\!\\!\\!\\perp Y$).\n   *Conditioned on $C$ (or any descendant of $C$):* **Opened** ($X \\not\\!\\perp\\!\\!\\!\\perp Y \\mid C$), inducing artificial correlation (Berkson's bias).\n\nA path $p$ is **d-separated** (blocked) by a conditioning set $\\mathbf{Z}$ if and only if:\n1. $p$ contains a chain $i \\to m \\to j$ or a fork $i \\leftarrow m \\to j$ such that the middle node $m \\in \\mathbf{Z}$, **OR**\n2. $p$ contains a collider $i \\to c \\leftarrow j$ such that neither the collider $c$ nor any of its descendants belong to $\\mathbf{Z}$ ($c \\notin \\mathbf{Z}$ and $\\text{de}(c) \\cap \\mathbf{Z} = \\emptyset$).\n\n### Pearl's Backdoor Criterion & The Adjustment Formula\n\nA path between treatment $X$ and outcome $Y$ is a **Backdoor Path** if it begins with an arrow pointing into $X$ ($X \\leftarrow \\dots \\to Y$). Backdoor paths convey spurious non-causal association.\n\n**Theorem (Backdoor Criterion):** A set of variables $\\mathbf{Z}$ satisfies the Backdoor Criterion relative to the ordered pair $(X, Y)$ if:\n1. No node in $\\mathbf{Z}$ is a descendant of $X$ ($\\mathbf{Z} \\cap \\text{de}(X) = \\emptyset$).\n2. $\\mathbf{Z}$ blocks (d-separates) every backdoor path between $X$ and $Y$.\n\nWhen $\\mathbf{Z}$ satisfies the Backdoor Criterion, Pearl's interventional distribution is non-parametrically identified by the **Backdoor Adjustment Formula**:\n\n$$\nP(Y = y \\mid \\text{do}(X = x)) = \\sum_{\\mathbf{z}} P(Y = y \\mid X = x, \\mathbf{Z} = \\mathbf{z}) P(\\mathbf{Z} = \\mathbf{z})\n$$\n\n### Proof / Derivation via do-Calculus\n\nIn Pearl's framework, the $\\text{do}(X=x)$ operator physically intervenes in the data generating mechanism, replacing the structural equation $X = f_X(pa(X), U_X)$ with the constant assignment $X = x$. This surgically cuts all arrows pointing into $X$, transforming the natural graph $\\mathcal{G}$ into the manipulated graph $\\mathcal{G}_{\\bar{X}}$.\n\nBy law of total probability:\n$$\nP(Y = y \\mid \\text{do}(X = x)) = \\sum_{\\mathbf{z}} P(Y = y \\mid \\text{do}(X = x), \\mathbf{Z} = \\mathbf{z}) P(\\mathbf{Z} = \\mathbf{z} \\mid \\text{do}(X = x))\n$$\n\nBecause $\\mathbf{Z}$ contains no descendants of $X$, an intervention on $X$ cannot affect $\\mathbf{Z}$:\n$$\nP(\\mathbf{Z} = \\mathbf{z} \\mid \\text{do}(X = x)) = P(\\mathbf{Z} = \\mathbf{z})\n$$\n\nBecause $\\mathbf{Z}$ blocks all backdoor paths, conditioning on $\\mathbf{Z}$ renders $Y$ conditionally independent of the incoming mechanism of $X$. In the severed graph $\\mathcal{G}_{\\bar{X}}$, the interventional probability equals the conditional observational probability:\n$$\nP(Y = y \\mid \\text{do}(X = x), \\mathbf{Z} = \\mathbf{z}) = P(Y = y \\mid X = x, \\mathbf{Z} = \\mathbf{z})\n$$\n\nSubstituting these two identities directly yields the Backdoor Adjustment Formula.\n\nFor discrete confounder strata $s \\in \\{1, \\dots, S\\}$, the causal **Average Treatment Effect (ATE)** is:\n\n$$\n\\text{ATE} \\equiv \\mathbb{E}[Y \\mid \\text{do}(X = 1)] - \\mathbb{E}[Y \\mid \\text{do}(X = 0)] = \\sum_{s=1}^S \\Big( \\mathbb{E}[Y \\mid X = 1, Z = s] - \\mathbb{E}[Y \\mid X = 0, Z = s] \\Big) \\cdot P(Z = s)\n$$\n\n* $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$: Causal Directed Acyclic Graph consisting of random variable vertices $\\mathcal{V}$ and directed causal arrows $\\mathcal{E}$.\n* $pa(X)$: The set of immediate parents (direct causes) of node $X$.\n* $de(X)$: The set of descendants (causal consequences) of node $X$.\n* $\\text{do}(X = x)$: The surgical interventional operator that severs all incoming parent arrows to $X$, setting its value exogenously.\n* $X \\leftarrow Z \\to Y$: Confounder fork creating non-causal sample covariance $\\text{Cov}(X, Y) \\ne 0$.\n* $X \\to M \\to Y$: Causal chain where $M$ transmits the causal mechanism from $X$ to $Y$.\n* $X \\to C \\leftarrow Y$: Collider junction that naturally blocks associative flow between $X$ and $Y$ when unconditioned.\n* $\\mathbf{Z}$: Admissible conditioning set satisfying the Backdoor Criterion, ensuring unconfoundedness $(Y(1), Y(0)) \\perp\\!\\!\\!\\perp X \\mid \\mathbf{Z}$.\n* $P(Z = s)$: Marginal population prevalence weight of confounder stratum $s$.\n\nImplement the Backdoor Criterion adjustment formula via subclassification over discrete confounder strata. For each stratum of $Z$, compute the difference in treatment means, and compute the population-weighted ATE.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-causal-inference-confounding",
          "starterCode": "def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    \"\"\"\n    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 or 0).\n    z_strata : np.ndarray of shape (N,)\n        Discrete confounder strata indicators.\n        \n    Returns\n    -------\n    float: Causal Average Treatment Effect\n    \"\"\"\n    # Step 1: Identify sample size and unique confounder strata\n    # Step 2: Iterate through each confounder stratum to compute within-stratum effects\n    # Step 3: Separate treated (d=1) and control (d=0) units within this stratum\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    \"\"\"\n    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 or 0).\n    z_strata : np.ndarray of shape (N,)\n        Discrete confounder strata indicators.\n        \n    Returns\n    -------\n    float: Causal Average Treatment Effect\n    \"\"\"\n    # Step 1: Identify sample size and unique confounder strata\n    # Step 2: Iterate through each confounder stratum to compute within-stratum effects\n    # Step 3: Separate treated (d=1) and control (d=0) units within this stratum\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.5"
            }
          },
          "solution": "import numpy as np\n\ndef backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    \"\"\"\n    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 or 0).\n    z_strata : np.ndarray of shape (N,)\n        Discrete confounder strata indicators.\n        \n    Returns\n    -------\n    float: Causal Average Treatment Effect\n    \"\"\"\n    # Step 1: Identify sample size and unique confounder strata\n    N = len(y)\n    unique_strata = np.unique(z_strata)\n    weighted_ate = 0.0\n    \n    # Step 2: Iterate through each confounder stratum to compute within-stratum effects\n    for s in unique_strata:\n        stratum_mask = (z_strata == s)\n        n_s = np.sum(stratum_mask)\n        p_s = n_s / N\n        \n        # Step 3: Separate treated (d=1) and control (d=0) units within this stratum\n        treated_in_s = stratum_mask & (d == 1)\n        control_in_s = stratum_mask & (d == 0)\n        \n        # Step 4: Compute stratum difference in means if both treatment groups are present\n        if np.sum(treated_in_s) > 0 and np.sum(control_in_s) > 0:\n            mean_treated = np.mean(y[treated_in_s])\n            mean_control = np.mean(y[control_in_s])\n            stratum_diff = mean_treated - mean_control\n            \n            # Step 5: Accumulate population-weighted treatment contrast\n            weighted_ate += stratum_diff * p_s\n            \n    return float(weighted_ate)"
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
      "en": "Most people easily understand that failing to control for a common confounder creates bias.",
      "ar": "يدرك معظم الباحثين بسهولة أن إهمال التحكم في المتغيرات المربكة يولد تحيزًا خطيرًا؛ فإذا كان لمتغيرين سبب مشترك، فإن عدم ضبطه يفتح بابًا..."
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
          "en": "Most people easily understand that *failing* to control for a common confounder creates bias. If two variables share a common parent, failing to hold that parent constant lets spurious correlation leak between them. But what happens if you control for a variable that is a common *effect* of both? This triggers the mind-bending statistical trap of the **Collider ($A \\to C \\leftarrow B$)**: controlling for a shared outcome **manufactures a strong, phantom correlation where zero correlation existed in reality!**\n\nImagine you are evaluating Hollywood movie stars on two completely independent human traits:\n* Genuine Dramatic Acting Talent ($A$)\n* Breathtaking Physical Attractiveness ($B$)\n\nIn the general global population, acting talent and facial symmetry are completely uncorrelated ($r = 0$). Nature does not consult a person's acting ability when distributing facial features. However, to achieve stardom in Hollywood ($C = 1$), an aspiring performer must possess at least one of these two gifts: you must be either a transcendentally gifted actor, or drop-dead gorgeous! If an empirical researcher restricts their study sample strictly to famous Hollywood celebrities (by conditioning on the collider $C = 1$), **acting talent and attractiveness become strongly NEGATIVELY correlated ($r < 0$)!**\n\nWhy does this illusion occur? It is the logic of \"explaining away.\" When you encounter an A-list Hollywood star who is a clumsy, wooden actor, you can immediately deduce that their fame must be explained by extraordinary physical beauty. Conversely, an average-looking actor who reached the pinnacle of celebrity must possess world-class acting genius to have overcome the visual barrier. The moment you step onto the red carpet ($C = 1$), knowing one trait explains away the need for the other.\n\nThis trap profoundly demystifies the gap between prediction and causation. For a Hollywood casting director making a purely predictive forecast, observing a star with dreadful acting skills provides valid statistical evidence to predict they are stunningly attractive. But confusing this predictive association with causality leads to absurd conclusions: hiring a vocal coach to ruin an aspiring actor's talent will not magically reshape their jawline! In 1946, physician Joseph Berkson discovered this exact fallacy in clinical data: two completely independent medical diseases appeared negatively correlated among hospitalized patients simply because suffering from either illness was sufficient to admit you to a hospital bed ($C = 1$). In observational research, conditioning on a collider—whether through sample selection, filtering, or adding bad control variables—creates illusions that mimic the laws of physics while standing them entirely on their head.",
          "ar": "يدرك معظم الباحثين بسهولة أن *إهمال* التحكم في المتغيرات المربكة يولد تحيزًا خطيرًا؛ فإذا كان لمتغيرين سبب مشترك، فإن عدم ضبطه يفتح بابًا خلفيًا لارتباط زائف. ولكن ماذا يحدث لو قمت بالعكس تمامًا، وتحكمت في متغير هو *نتيجة مشتركة* للمتغيرين معًا؟ هنا تقع في الفخ الإحصائي الخادع والمثير للدهشة: **المصادم (Collider: $A \\to C \\leftarrow B$)**؛ حيث يؤدي التحكم في النتيجة المشتركة إلى **خلق ارتباط وهمي قوي بين أمرين لا صلة بينهما على الإطلاق في الواقع!**\n\nتخيل أنك تدرس المجتمع البشري لتقييم صفتين مستقلتين تمامًا:\n* موهبة التمثيل الدرامي الفذة ($A$)\n* الوسامة والجاذبية الجسدية الباهرة ($B$)\n\nفي عموم المجتمع الإنساني، لا توجد أي علاقة ارتباط بين موهبة التمثيل والوسامة ($r = 0$)؛ فالطبيعة لا تفحص مهارات الأداء المسرحي عند توزيع ملامح الوجه. ولكن للوصول إلى مصاف نجوم هوليوود المشاهير ($C = 1$)، تفرض صناعة السينما شرطًا صارمًا: يجب أن يمتلك الشخص إحدى الميزتين على الأقل؛ فإما أن تكون ممثلاً عبقريًا، أو فائق الجمال والوسامة! فإذا حصر باحث دراسته على مشاهير هوليوود فقط (أي قام بالتكييف والتحكم في المصادم $C = 1$)، **ستظهر بين يديه نتيجة مذهلة: ارتباط سالب حاد بين الموهبة والوسامة ($r < 0$)!**\n\nلماذا ينشأ هذا الوهم؟ إنه منطق \"التبرير المتبادل\" (Explaining Away)؛ فإذا قابلت نجمًا سينمائيًا شهيرًا لكن أداءه التمثيلي رديء وباهت، ستستنتج فورًا وتلقائيًا أنه شديد الوسامة لدرجة جعلته نجمًا رغم رداءة تمثيله. وعلى النقيض، فإن الممثل النجم ذو المظهر المتواضع العادي لا بد وأنه يمتلك موهبة تمثيلية جبارة جعلته يخترق معايير الشهرة الصارمة. في اللحظة التي تحصر فيها نظرك داخل فضاء الشهرة ($C = 1$)، فإن معرفة أحد المتغيرين تغنيك عن الآخر وتبرر وجوده.\n\nوهنا يتضح الفرق الجوهري بين التنبؤ والسببية: فبالنسبة لوكالة مواهب تبحث عن التنبؤ المجرد، فإن رؤية نجم هوليوودي فاشل في التمثيل تمثل دليلاً إحصائيًا كافيًا للتنبؤ بأنه شديد الجاذبية؛ وهذا استنتاج تنبؤي صحيح تمامًا داخل تلك العينة المختارة. لكن الخلط بين هذا التنبؤ والسببية يولد حماقات لا حصر لها: فإفساد مهارات ممثل واعد لن يجعله أكثر وسامة بأي حال! في عام 1946، اكتشف الطبيب جوزيف بيركسون (Joseph Berkson) هذه المغالطة في السجلات الطبية؛ حيث ظهر مرضان مستقلان تمامًا بارتباط سالب بين نزلاء المستشفيات لمجرد أن الإصابة بأي منهما كافية لإدخال المريض للمستشفى ($C = 1$). إن التكييف على المصادم—سواء عبر اختيار عينة محصورة أو إقحام متغيرات تحكم خاطئة—يصنع أوهامًا إحصائية متقنة تخدع حتى المتمرسين."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "A \\perp\\!\\!\\perp B \\implies P(A, B) = P(A) P(B), \\quad \\text{Cov}(A, B) = 0",
        "formulaNote": {
          "en": "Core invariant for Collider Conditioning & Berkson's Paradox.",
          "ar": "الخاصية الرياضية الجوهرية لـ تكييف المصادم ومفارقة بيركسون."
        },
        "narrative": {
          "en": "Let $C$ be a collider node generated by a structural equation combining $A$ and $B$:\n\n$$\nC = f(A, B, U_C)\n$$\n\n### Discrete Threshold Formulation (Berkson's Binary Proof)\n\nConsider binary independent indicators $A, B \\in \\{0, 1\\}$ with base probabilities $P(A=1) = p_A$ and $P(B=1) = p_B$. The collider admission criterion is:\n\n$$\nC = A \\lor B \\iff C = \\mathbb{I}(A + B \\ge 1)\n$$\n\nThe conditional probability of $A=1$ given admission $C=1$ and the presence of $B=1$ is:\n\n$$\nP(A = 1 \\mid C = 1, B = 1) = \\frac{P(A = 1, B = 1, C = 1)}{P(B = 1, C = 1)} = \\frac{p_A p_B}{p_B} = p_A\n$$\n\nNow compute the conditional probability of $A=1$ given admission $C=1$ and the *absence* of $B$ ($B = 0$):\n\n$$\nP(A = 1 \\mid C = 1, B = 0) = \\frac{P(A = 1, B = 0, C = 1)}{P(B = 0, C = 1)} = \\frac{p_A (1 - p_B)}{p_A (1 - p_B)} = 1.0 > p_A\n$$\n\nBecause $P(A = 1 \\mid C = 1, B = 0) > P(A = 1 \\mid C = 1, B = 1)$, knowing that $B = 0$ dramatically increases the likelihood that $A = 1$. The conditional covariance is strictly negative:\n\n$$\n\\text{Cov}(A, B \\mid C = 1) = \\mathbb{E}[AB \\mid C = 1] - \\mathbb{E}[A \\mid C = 1]\\mathbb{E}[B \\mid C = 1] < 0\n$$\n\n### Linear Gaussian Derivation of Collider Induced Covariance\n\nConsider continuous independent latent traits $A \\sim \\mathcal{N}(0, \\sigma_A^2)$ and $B \\sim \\mathcal{N}(0, \\sigma_B^2)$ with independent error $\\varepsilon \\sim \\mathcal{N}(0, \\sigma_\\varepsilon^2)$. The collider is linear:\n\n$$\nC = A + B + \\varepsilon\n$$\n\nThe joint vector $(A, B, C)^T$ is multivariate normal with covariance matrix:\n\n$$\n\\boldsymbol{\\Sigma} = \\begin{pmatrix} \n\\sigma_A^2 & 0 & \\sigma_A^2 \\\\\n0 & \\sigma_B^2 & \\sigma_B^2 \\\\\n\\sigma_A^2 & \\sigma_B^2 & \\sigma_A^2 + \\sigma_B^2 + \\sigma_\\varepsilon^2 \n\\end{pmatrix}\n$$\n\nBy the properties of conditional multivariate Gaussians, the conditional covariance matrix of $(A, B)$ given $C = c$ is:\n\n$$\n\\boldsymbol{\\Sigma}_{(A, B) \\mid C} = \\boldsymbol{\\Sigma}_{(A, B)} - \\boldsymbol{\\Sigma}_{(A, B), C} \\boldsymbol{\\Sigma}_{C}^{-1} \\boldsymbol{\\Sigma}_{C, (A, B)}\n$$\n\nComputing the off-diagonal element (the conditional covariance between $A$ and $B$):\n\n$$\n\\text{Cov}(A, B \\mid C) = 0 - \\frac{\\begin{pmatrix} \\sigma_A^2 \\\\ \\sigma_B^2 \\end{pmatrix}_1 \\begin{pmatrix} \\sigma_A^2 \\\\ \\sigma_B^2 \\end{pmatrix}_2}{\\sigma_A^2 + \\sigma_B^2 + \\sigma_\\varepsilon^2} = -\\frac{\\sigma_A^2 \\sigma_B^2}{\\sigma_A^2 + \\sigma_B^2 + \\sigma_\\varepsilon^2} < 0\n$$\n\nThe spurious negative correlation is strictly proportional to the variance transmitted by both causes into the collider! In Pearl's d-separation calculus, an unconditioned collider $A \\to C \\leftarrow B$ is an **inactive barrier** that blocks association. Conditioning on $C$ **activates the junction**, opening an artificial non-causal conduit.\n\n* $A, B$: Truly independent causal forces in the underlying population ($\\text{Cov}(A, B) = 0$).\n* $C$: Collider node characterized by two or more directed arrows colliding head-to-head ($A \\to C \\leftarrow B$).\n* $C = 1$: Conditioning, stratifying, or filtering on the collider state, which restricts the sample to a non-random subpopulation.\n* $\\text{Cov}(A, B \\mid C)$: Conditional covariance induced by selection on $C$, strictly negative when both paths have positive signs.\n* d-separation: The criterion under which an unconditioned collider is closed, but conditioning on $C$ or any descendant $D \\in de(C)$ unblocks the path.\n\nImplement a simulation of Berkson's paradox. Generate independent variables $X$ and $Y$, construct an admission collider $C = \\mathbb{I}(X + Y > \\tau)$, and demonstrate that unconditioned correlation is approximately zero while conditioned correlation is strongly negative.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-collider-conditioning-berksons",
          "starterCode": "def simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.\n    \n    Parameters\n    ----------\n    n : int, default 1000\n        Number of simulated individuals.\n    seed : int, default 42\n        Random seed for reproducibility.\n        \n    Returns\n    -------\n    dict with keys:\n        'unconditioned_corr': float, correlation in full population\n        'conditioned_corr': float, correlation among selected collider subgroup\n        'sample_size_conditioned': int, count of individuals admitted\n    \"\"\"\n    # Step 1: Generate two strictly independent standard normal random variables\n    # Step 2: Compute the unconditioned population Pearson correlation (expected ~ 0.0)\n    # Step 3: Define a collider selection threshold (e.g., top combined score > 0.5)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.\n    \n    Parameters\n    ----------\n    n : int, default 1000\n        Number of simulated individuals.\n    seed : int, default 42\n        Random seed for reproducibility.\n        \n    Returns\n    -------\n    dict with keys:\n        'unconditioned_corr': float, correlation in full population\n        'conditioned_corr': float, correlation among selected collider subgroup\n        'sample_size_conditioned': int, count of individuals admitted\n    \"\"\"\n    # Step 1: Generate two strictly independent standard normal random variables\n    # Step 2: Compute the unconditioned population Pearson correlation (expected ~ 0.0)\n    # Step 3: Define a collider selection threshold (e.g., top combined score > 0.5)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.\n    \n    Parameters\n    ----------\n    n : int, default 1000\n        Number of simulated individuals.\n    seed : int, default 42\n        Random seed for reproducibility.\n        \n    Returns\n    -------\n    dict with keys:\n        'unconditioned_corr': float, correlation in full population\n        'conditioned_corr': float, correlation among selected collider subgroup\n        'sample_size_conditioned': int, count of individuals admitted\n    \"\"\"\n    rng = np.random.default_rng(seed)\n    \n    # Step 1: Generate two strictly independent standard normal random variables\n    x = rng.standard_normal(n)\n    y = rng.standard_normal(n)\n    \n    # Step 2: Compute the unconditioned population Pearson correlation (expected ~ 0.0)\n    unconditioned_corr = float(np.corrcoef(x, y)[0, 1])\n    \n    # Step 3: Define a collider selection threshold (e.g., top combined score > 0.5)\n    collider = (x + y > 0.5)\n    \n    # Step 4: Subsample data conditioned exclusively on the collider criterion (collider == True)\n    x_cond = x[collider]\n    y_cond = y[collider]\n    \n    # Step 5: Compute the conditioned correlation within the selected subgroup (strongly negative)\n    conditioned_corr = float(np.corrcoef(x_cond, y_cond)[0, 1])\n    \n    return {\n        \"unconditioned_corr\": unconditioned_corr,\n        \"conditioned_corr\": conditioned_corr,\n        \"sample_size_conditioned\": int(np.sum(collider)),\n    }"
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
      "en": "What can an empirical economist do when a critical treatment $D$ is inextricably tangled with unobserved confounders—when endogeneity...",
      "ar": "ماذا يفعل الباحث الاقتصادي عندما يكون متغير المعالجة الحاسم $D$ متشابكًا بصورة ميؤوس منها مع متغيرات خفية ومربكة—بحيث يصبح انحدار OLS..."
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
          "en": "What can an empirical economist do when a critical treatment $D$ is inextricably tangled with unobserved confounders—when endogeneity poisons OLS, and running an actual Randomized Controlled Trial is physically impossible or morally prohibited?\n\nConsider estimating the causal wage return to an extra year of university education. People who choose to complete university degrees often possess higher innate motivation, family financial safety nets, and social networks. Because an ethical government cannot randomly forbid thousands of bright young citizens from attending college, an observational OLS regression will hopelessly conflate the genuine causal boost of college lectures with unobserved innate ability.\n\nEconometricians solve this seemingly intractable puzzle using an **Instrumental Variable ($Z$)**. Think of an instrument as a **natural gust of wind** or an exogenous coin toss engineered by nature that nudges people into treatment from the outside. Imagine a fleet of sailboats on a lake: some captains have powerful inboard motors (unobserved ability), while others do not. If you want to measure the true hydrodynamic drag of the hull, watching who moves fastest is useless because motor power confounds the race. But if an sudden, random gust of offshore wind ($Z$) sweeps across only half the lake, tilting the sails of certain boats ($D$) without touching their hidden motors ($\\varepsilon$), you can isolate the pure hydrodynamic speed response ($Y$) generated solely by the wind's nudge!\n\nCrucially, this illuminates the fundamental difference between predictive machine learning and econometric causality. A predictive model observes a college graduate earning $\\$100,000$ and accurately forecasts that they will repay their mortgage. The predictive model does not care whether the high wage came from coursework or from the graduate's wealthy uncle; it only cares about the statistical shadow. But a policymaker designing a $\\$50\\text{ billion}$ student tuition subsidy asks a causal question: *\"If we intervene and induce students who would otherwise have stopped at high school to complete university, by how much will their future earnings rise?\"* If earnings are driven primarily by uncle connections, the subsidy will fail.\n\nThe **Wald Estimator** operationalizes this causal logic through the elegant ratio of two observable quantities:\n$$\\hat{\\beta}_{\\text{IV}} = \\frac{\\text{Effect of Instrument on Outcome (Reduced Form)}}{\\text{Effect of Instrument on Treatment (First Stage Compliance)}}$$\nBy dividing the total nudge in wages by the percentage of people actually pushed into college by the instrument, IV inflates the signal to recover the pristine, unconfounded causal effect.",
          "ar": "ماذا يفعل الباحث الاقتصادي عندما يكون متغير المعالجة الحاسم $D$ متشابكًا بصورة ميؤوس منها مع متغيرات خفية ومربكة—بحيث يصبح انحدار OLS ملوثًا بالانحياز، ويكون إجراء تجربة عشوائية منضبطة مستحيلاً عمليًا أو محظورًا أخلاقيًا؟\n\nتأمل مثلاً محاولة قياس العائد السببي الحقيقي لسنوات التعليم الجامعي الإضافية على أجور العمال. في الواقع العملي، يمتلك الطلاب الذين يلتحقون بالجامعات ميزات فطرية؛ كالشغف الذاتي العالي، وشبكات الأمان المالي العائلية، والعلاقات الاجتماعية النافذة. ولأنه لا يمكن لأي حكومة رشيدة أن تحرم آلاف الشباب الموهوبين عشوائيًا من التعليم لدواعي البحث العلمي، فإن انحدار OLS الكلاسيكي سيخلط حتمًا بين العائد الحقيقي للمناهج الجامعية وبين الذكاء والفرص الفطرية غير المرصودة للمتعلمين.\n\nيحل الاقتصاديون هذا اللغز المستعصي باستخدام **المتغير الآداتي (Instrumental Variable - $Z$)**. تخيل الأداة كـ **هبة ريح طبيعية خارجية** أو قرعة عشوائية تجريها الطبيعة تدفع الناس نحو المعالجة من الخارج دون استئذان. تخيل أسطولاً من المراكب الشراعية في بحيرة هادئة؛ بعض القادة يمتلكون محركات ديزل سرية قوية تحت الماء (القدرات الفطرية الخفية)، بينما يفتقر إليها آخرون. إذا أردت قياس كفاءة الشراع المجردة، فإن مراقبة سرعة المراكب لن تفيدك، لأن المحركات الخفية تشوه المقارنة تمامًا. لكن إذا هبت فجأة عاصفة ريح عشوائية ($Z$) على جزء من البحيرة دون غيره، فحركت أشرعة بعض المراكب ($D$) دون أن تؤثر على محركاتها الخفية ($\\varepsilon$)، فإنك تستطيع عزل سرعة الحركة الإضافية ($Y$) الناتجة فقط عن قوة الرياح!\n\nوهنا يتجلى الفرق الحاسم بين تعلم الآلة التنبؤي والسببية الاقتصادية: يرى النموذج التنبؤي خريجًا جامعيًا يجني $100,000$ دولار، فيتنبأ بنجاح بقدرته على سداد القروض؛ فالنموذج التنبؤي لا يعنيه هل مصدر الثروة هو المحاضرات الجامعية أم علاقات أسرته الثرية، بل يكتفي برصد الظل الإحصائي. أما صانع السياسات الذي يدرس تخصيص ميزانية ضخمة لدعم الرسوم الجامعية فيطرح سؤالاً سببيًا صارمًا: *\"لو تدخلنا ودفعنا طلابًا كانوا سيتوقفون عند الثانوية لدخول الجامعة، فكم ستزيد أجورهم الحقيقية؟\"* إذا كانت الأجور نابعة من علاقات العائلة، فستفشل السياسة بالكامل.\n\nيقيس **مقدر فالد (Wald Estimator)** هذا التأثير السببي عبر حاصل قسمة غاية في البساطة والعبقرية الرياضية:\n$$\\hat{\\beta}_{\\text{IV}} = \\frac{\\text{أثر الأداة على النتيجة النهائية (النموذج المختزل)}}{\\text{أثر الأداة على الامتثال للمعالجة (المرحلة الأولى)}}$$\nبقسمة الأثر الإجمالي للدفعة الخارجية على نسبة الأشخاص الذين استجابوا لها ودخلوا الجامعة فعليًا، يعيد مقدر IV تضخيم النسبة وتطهيرها من شوائب القدرات الخفية لعزل الأثر السببي الصافي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "y_i = \\beta_0 + \\beta_1 D_i + \\varepsilon_i, \\quad \\text{where } \\text{Cov}(D_i, \\varepsilon_i) \\ne 0",
        "formulaNote": {
          "en": "Core invariant for Instrumental Variables (IV) Identification & The Wald Estimator.",
          "ar": "الخاصية الرياضية الجوهرية لـ التعريف بالمتغيرات الاداتية ومقدر فالد."
        },
        "narrative": {
          "en": "Because treatment correlates with the unobserved error term $\\varepsilon_i$, OLS is asymptotically inconsistent:\n\n$$\n\\text{plim} \\, \\hat{\\beta}_{1, \\text{OLS}} = \\beta_1 + \\frac{\\text{Cov}(D_i, \\varepsilon_i)}{\\mathbb{V}(D_i)} \\ne \\beta_1\n$$\n\n### The Core IV Identification Assumptions\n\nLet $Z_i$ be an instrumental variable. Identification of $\\beta_1$ requires two foundational conditions:\n1. **Instrument Relevance (First Stage):** The instrument must predict treatment uptake:\n   $$\n   \\text{Cov}(Z_i, D_i) \\ne 0 \\iff \\mathbb{E}[D_i \\mid Z_i = 1] \\ne \\mathbb{E}[D_i \\mid Z_i = 0]\n   $$\n2. **Exclusion Restriction & Exogeneity:** The instrument is as good as randomly assigned and has no direct causal link to $y_i$ other than through $D_i$:\n   $$\n   \\text{Cov}(Z_i, \\varepsilon_i) = 0 \\iff \\mathbb{E}[\\varepsilon_i \\mid Z_i = 1] = \\mathbb{E}[\\varepsilon_i \\mid Z_i = 0] = 0\n   $$\n\n### Algebraic Derivation of the Wald Estimator\n\nTaking the covariance of both sides of the structural equation with the instrument $Z_i$:\n\n$$\n\\text{Cov}(Z_i, y_i) = \\text{Cov}(Z_i, \\beta_0 + \\beta_1 D_i + \\varepsilon_i) = \\beta_1 \\text{Cov}(Z_i, D_i) + \\underbrace{\\text{Cov}(Z_i, \\varepsilon_i)}_{= 0}\n$$\n\nUnder the exclusion restriction ($\\text{Cov}(Z_i, \\varepsilon_i) = 0$), the error covariance vanishes:\n\n$$\n\\text{Cov}(Z_i, y_i) = \\beta_1 \\text{Cov}(Z_i, D_i) \\implies \\beta_1 = \\frac{\\text{Cov}(Z_i, y_i)}{\\text{Cov}(Z_i, D_i)}\n$$\n\nFor a binary instrument $Z_i \\in \\{0, 1\\}$, recall that for any random variable $W_i$, $\\text{Cov}(Z_i, W_i) = P(Z_i=1)P(Z_i=0) \\big( \\mathbb{E}[W_i \\mid Z_i=1] - \\mathbb{E}[W_i \\mid Z_i=0] \\big)$.\n\nSubstituting this property into the numerator and denominator:\n\n$$\n\\beta_1 = \\frac{P(Z_i=1)P(Z_i=0) \\big( \\mathbb{E}[y_i \\mid Z_i = 1] - \\mathbb{E}[y_i \\mid Z_i = 0] \\big)}{P(Z_i=1)P(Z_i=0) \\big( \\mathbb{E}[D_i \\mid Z_i = 1] - \\mathbb{E}[D_i \\mid Z_i = 0] \\big)}\n$$\n\nCanceling the common marginal probability terms yields the **Wald Estimator**:\n\n$$\n\\hat{\\beta}_{\\text{Wald}} = \\frac{\\mathbb{E}[y_i \\mid Z_i = 1] - \\mathbb{E}[y_i \\mid Z_i = 0]}{\\mathbb{E}[D_i \\mid Z_i = 1] - \\mathbb{E}[D_i \\mid Z_i = 0]} \\equiv \\frac{\\text{Reduced Form Intent-to-Treat (ITT}_Y\\text{)}}{\\text{First Stage Compliance Rate (ITT}_D\\text{)}}\n$$\n\n### Asymptotic Variance & The Weak Instrument Hazard\n\nThe asymptotic variance of the instrumental variables estimator reveals the statistical price paid for exogeneity:\n\n$$\n\\text{AVar}(\\hat{\\beta}_{\\text{IV}}) = \\frac{\\sigma_\\varepsilon^2}{N \\cdot \\mathbb{V}(D_i) \\cdot \\rho_{ZD}^2} = \\frac{\\text{AVar}(\\hat{\\beta}_{\\text{OLS}})}{\\rho_{ZD}^2}\n$$\n\nWhere $\\rho_{ZD} = \\text{Corr}(Z_i, D_i)$. If the instrument is \"weak\" ($\\rho_{ZD} \\to 0$), the first stage collapses, causing the sampling variance of $\\hat{\\beta}_{\\text{IV}}$ to explode to infinity!\n\n* $D_i$: Endogenous treatment variable correlated with unobserved disturbance term $\\varepsilon_i$.\n* $Z_i$: Instrumental variable acting as an exogenous lever on treatment selection.\n* $\\text{Cov}(Z_i, D_i) \\ne 0$: Relevance condition ensuring the first stage has substantive explanatory power.\n* $\\text{Cov}(Z_i, \\varepsilon_i) = 0$: Exclusion restriction stating that the instrument is uncorrelated with unobserved determinants of $y_i$.\n* $\\text{ITT}_Y = \\mathbb{E}[y_i \\mid Z_i = 1] - \\mathbb{E}[y_i \\mid Z_i = 0]$: Reduced form intent-to-treat effect on the primary outcome.\n* $\\text{ITT}_D = \\mathbb{E}[D_i \\mid Z_i = 1] - \\mathbb{E}[D_i \\mid Z_i = 0]$: First-stage compliance differential measuring the shift in treatment uptake.\n* $\\rho_{ZD}$: Correlation between instrument and treatment; small values signal weak instrument danger.\n\nImplement the empirical Wald estimator for a binary instrumental variable setting. Calculate the first-stage compliance rate, the reduced-form effect, and the resulting causal Wald estimate.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-instrumental-variables-2sls",
          "starterCode": "def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Continuous outcome vector.\n    d : np.ndarray of shape (N,)\n        Binary endogenous treatment (0 or 1).\n    z : np.ndarray of shape (N,)\n        Binary instrument (0 or 1).\n        \n    Returns\n    -------\n    dict with keys:\n        'first_stage_compliance': float, E[D|Z=1] - E[D|Z=0]\n        'reduced_form_intent': float, E[Y|Z=1] - E[Y|Z=0]\n        'wald_estimate': float, reduced_form / first_stage\n    \"\"\"\n    # Step 1: Create boolean index masks for instrument assignment groups (z=1 and z=0)\n    # Step 2: Compute first-stage compliance effect: E[D|Z=1] - E[D|Z=0]\n    # Step 3: Compute reduced-form intent-to-treat effect on outcome: E[Y|Z=1] - E[Y|Z=0]\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Continuous outcome vector.\n    d : np.ndarray of shape (N,)\n        Binary endogenous treatment (0 or 1).\n    z : np.ndarray of shape (N,)\n        Binary instrument (0 or 1).\n        \n    Returns\n    -------\n    dict with keys:\n        'first_stage_compliance': float, E[D|Z=1] - E[D|Z=0]\n        'reduced_form_intent': float, E[Y|Z=1] - E[Y|Z=0]\n        'wald_estimate': float, reduced_form / first_stage\n    \"\"\"\n    # Step 1: Create boolean index masks for instrument assignment groups (z=1 and z=0)\n    # Step 2: Compute first-stage compliance effect: E[D|Z=1] - E[D|Z=0]\n    # Step 3: Compute reduced-form intent-to-treat effect on outcome: E[Y|Z=1] - E[Y|Z=0]\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Continuous outcome vector.\n    d : np.ndarray of shape (N,)\n        Binary endogenous treatment (0 or 1).\n    z : np.ndarray of shape (N,)\n        Binary instrument (0 or 1).\n        \n    Returns\n    -------\n    dict with keys:\n        'first_stage_compliance': float, E[D|Z=1] - E[D|Z=0]\n        'reduced_form_intent': float, E[Y|Z=1] - E[Y|Z=0]\n        'wald_estimate': float, reduced_form / first_stage\n    \"\"\"\n    # Step 1: Create boolean index masks for instrument assignment groups (z=1 and z=0)\n    z1_mask = (z == 1)\n    z0_mask = (z == 0)\n    \n    # Step 2: Compute first-stage compliance effect: E[D|Z=1] - E[D|Z=0]\n    mean_d_z1 = float(np.mean(d[z1_mask]))\n    mean_d_z0 = float(np.mean(d[z0_mask]))\n    first_stage = mean_d_z1 - mean_d_z0\n    \n    # Step 3: Compute reduced-form intent-to-treat effect on outcome: E[Y|Z=1] - E[Y|Z=0]\n    mean_y_z1 = float(np.mean(y[z1_mask]))\n    mean_y_z0 = float(np.mean(y[z0_mask]))\n    reduced_form = mean_y_z1 - mean_y_z0\n    \n    # Step 4: Compute the Wald Estimator ratio = Reduced Form / First Stage\n    if abs(first_stage) > 1e-12:\n        wald = float(reduced_form / first_stage)\n    else:\n        wald = 0.0\n        \n    return {\n        \"first_stage_compliance\": first_stage,\n        \"reduced_form_intent\": reduced_form,\n        \"wald_estimate\": wald,\n    }"
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
      "en": "What happens when an econometric model contains multiple instruments, multiple endogenous regressors, and exogenous control covariates? The...",
      "ar": "ماذا يحدث عندما يحتوي النموذج القياسي على أدوات متعددة، ومتغيرات داخلية متعددة، ومجموعة من ضوابط التحكم الخارجية؟ في هذه الحالة، تعجز نسبة..."
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
          "en": "What happens when an econometric model contains multiple instruments, multiple endogenous regressors, and exogenous control covariates? The simple univariate Wald ratio is no longer sufficient. We need a general multidimensional engine: **Two-Stage Least Squares (2SLS)**.\n\nThink of 2SLS as an industrial water purification system designed to remove chemical toxins:\n1. **Stage 1 (Purification):** Your raw treatment variable $\\mathbf{X}$ is contaminated with toxic unobserved confounders (innate ability, motivation, background). In the first stage, you pass $\\mathbf{X}$ through the filtration chamber of your instruments $\\mathbf{Z}$. Because the instruments are strictly exogenous, the fitted values $\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}$ represent exclusively the purified, exogenous variation in treatment driven by the external shocks.\n2. **Stage 2 (Estimation):** You pump the purified liquid $\\hat{\\mathbf{X}}$ into the regression of outcome $\\mathbf{y}$, estimating the structural causal parameter free from omitted variable poisoning.\n\nCrucially, 2SLS starkly highlights the difference between prediction and causation. A predictive machine learning algorithm wants all of $\\mathbf{X}$, including the toxic contaminants, because contaminants correlate with the outcome and improve out-of-sample forecast accuracy ($R^2$). Econometrics deliberately throws away most of the variation in $\\mathbf{X}$, retaining only the narrow sliver explained by $\\mathbf{Z}$. We gladly accept higher variance and wider confidence intervals in exchange for the holy grail of causal consistency!\n\n> **CRITICAL SOFTWARE PITFALL:** You must **NEVER** run two separate manual OLS regressions in Python or R and report the second-stage software standard errors! In the second stage, the computer naively calculates residuals as $\\mathbf{y} - \\hat{\\mathbf{X}}\\hat{\\boldsymbol{\\beta}}$. But the true human beings in the real world experienced the actual treatment $\\mathbf{X}$, not the mathematical phantom $\\hat{\\mathbf{X}}$! The true structural residuals are $\\mathbf{e}_{\\text{structural}} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$. Trusting manual second-stage standard errors severely underestimates variance, leading to artificially deflated $p$-values and false scientific discoveries.\n\nFinally, what happens when treatment effects are heterogeneous—when a job training program helps high-school dropouts tremendously but does nothing for college graduates? In their Nobel-prize-winning breakthrough, Joshua Angrist and Guido Imbens proved the **LATE Theorem (Local Average Treatment Effect)**. When responses vary, IV does not estimate the Average Treatment Effect across the entire population (ATE). Instead, it identifies the causal effect **exclusively for the Compliers**: the specific subpopulation whose treatment uptake was actively nudged by the instrument! It tells us nothing about *Always-Takers* (who get treated no matter what) or *Never-Takers* (who refuse treatment under all conditions), and assumes that perverse *Defiers* (who spitefully do the exact opposite of the instrument) do not exist (the Monotonicity Assumption).",
          "ar": "ماذا يحدث عندما يحتوي النموذج القياسي على أدوات متعددة، ومتغيرات داخلية متعددة، ومجموعة من ضوابط التحكم الخارجية؟ في هذه الحالة، تعجز نسبة فالد البسيطة عن حل المسألة بمفردها، ونحتاج إلى آلة مصفوفية شاملة متعددة الأبعاد: **المربعات الصغرى ذات المرحلتين (Two-Stage Least Squares - 2SLS)**.\n\nتخيل 2SLS كمحطة تنقية صناعية متطورة للمياه الملوثة بالسموم الكيميائية:\n1. **المرحلة الأولى (التطهير والفلترة):** المتغير الخام للمعالجة $\\mathbf{X}$ ملوث بشوائب ومتغيرات خفية ومربكة (كالقدرات الفطرية، والدافع الذاتي، والوسط العائلي). في المرحلة الأولى، نمرر هذا المتغير عبر مرشحات الأدوات الخارجية $\\mathbf{Z}$. ولأن الأدوات نقية وخارجية تمامًا، فإن القيم المقدرة المتوقعة $\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}$ تمثل حصرًا الجزء النقي والمطهر من المعالجة الذي حركته الصدمات الخارجية دون غيرها.\n2. **المرحلة الثانية (التقدير الهيكلي):** نضخ السائل المطهر $\\hat{\\mathbf{X}}$ في معادلة انحدار النتيجة $\\mathbf{y}$، لتقدير المعلمة السببية الهيكلية بعد عزلها تمامًا عن سموم التحيز.\n\nوهنا يتجلى التناقض الصريح بين التنبؤ والسببية: يرغب نموذج تعلم الآلة التنبؤي في الاحتفاظ بكل تباين $\\mathbf{X}$ بما فيه من شوائب وسموم، لأن تلك الشوائب تزيد من دقة التنبؤ بـ $\\mathbf{y}$ وتضخم معامل التحديد $R^2$. أما القياس الاقتصادي فيضحي عن عمد بمعظم تباين $\\mathbf{X}$، ولا يحتفظ إلا بالشريحة الضيقة التي فسرتها الأدوات $\\mathbf{Z}$؛ فنحن نقبل طواعية بزيادة التباين واتساع فترات الثقة في سبيل الفوز بالاتساق السببي الخالص!\n\n> **فخ برمجي وبرمجة إحصائية خطير:** إياك أن تجري انحدارين منفصلين يدويًا وتعتمد الأخطاء المعيارية الافتراضية للمرحلة الثانية! فالانحدار اليدوي يحسب البواقي استنادًا إلى الفروق الافتراضية $\\mathbf{y} - \\hat{\\mathbf{X}}\\hat{\\boldsymbol{\\beta}}$. لكن البشر الحقيقيين في العالم الواقعي خضعوا للمعالجة الفعلية $\\mathbf{X}$، وليس للنسخة الافتراضية $\\hat{\\mathbf{X}}$! إن البواقي الهيكلية الحقيقية هي $\\mathbf{e}_{\\text{structural}} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$. يؤدي الاعتماد على الأخطاء المعيارية للمرحلة الثانية إلى تقليص الأخطاء المعيارية زائفًا وتضخيم الدلالة الإحصائية بشكل مضلل.\n\nوأخيرًا، ماذا يحدث لو كانت استجابة البشر للمعالجة متفاوتة وغير متجانسة؟ في دراستهما التاريخية الحائزة على جائزة نوبل 2021، أثبت جوشوا أنغريست وغيدو إمبنز **مبرهنة LATE (متوسط الأثر الموضعي للمعالجة)**. فعندما تتباين استجابة الناس، لا يقيس IV متوسط الأثر الإجمالي للمجتمع بأسره (ATE)، بل يقيس الأثر السببي **حصرًا لشريحة \"الممتثلين\" (Compliers)**: وهم الأفراد الذين غيّروا سلوكهم وامتثلوا تحديدًا لدفعة الأداة! ولا يخبرنا النموذج بشيء عن \"المتلقين دائمًا\" أو \"الرافضين دائمًا\"، ويشترط انعدام \"المتحدين\" الذين يتصرفون بعناد عكس توجيه الأداة (فرضية الرتابة Monotonicity)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{P}_Z = \\mathbf{Z}(\\mathbf{Z}^T \\mathbf{Z})^{-1} \\mathbf{Z}^T, \\quad \\mathbf{P}_Z^T = \\mathbf{P}_Z, \\quad \\mathbf{P}_Z \\mathbf{P}_Z = \\mathbf{P}_Z",
        "formulaNote": {
          "en": "Core invariant for Two-Stage Least Squares (2SLS), Weak Instruments & LATE.",
          "ar": "الخاصية الرياضية الجوهرية لـ المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي."
        },
        "narrative": {
          "en": "**Stage 1:** Project each column of $\\mathbf{X}$ onto $\\text{col}(\\mathbf{Z})$ to construct the purified regressors:\n\n$$\n\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}\n$$\n\n**Stage 2:** Run OLS of $\\mathbf{y}$ on the purified design matrix $\\hat{\\mathbf{X}}$:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}} = (\\hat{\\mathbf{X}}^T \\hat{\\mathbf{X}})^{-1} \\hat{\\mathbf{X}}^T \\mathbf{y}\n$$\n\nSubstituting $\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}$ and using idempotency ($\\mathbf{P}_Z^T \\mathbf{P}_Z = \\mathbf{P}_Z$):\n\n$$\n\\hat{\\mathbf{X}}^T \\hat{\\mathbf{X}} = (\\mathbf{P}_Z \\mathbf{X})^T (\\mathbf{P}_Z \\mathbf{X}) = \\mathbf{X}^T \\mathbf{P}_Z \\mathbf{P}_Z \\mathbf{X} = \\mathbf{X}^T \\mathbf{P}_Z \\mathbf{X}\n$$\n\n$$\n\\hat{\\mathbf{X}}^T \\mathbf{y} = (\\mathbf{P}_Z \\mathbf{X})^T \\mathbf{y} = \\mathbf{X}^T \\mathbf{P}_Z \\mathbf{y}\n$$\n\nThus, the closed-form **Two-Stage Least Squares Estimator** is:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}} = (\\mathbf{X}^T \\mathbf{P}_Z \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{P}_Z \\mathbf{y}\n$$\n\n### Correct Variance Estimation vs The Manual Pitfall\n\nIf an analyst runs OLS of $\\mathbf{y}$ on $\\hat{\\mathbf{X}}$, the software computes the residual vector:\n\n$$\n\\hat{\\mathbf{e}}_{\\text{manual}} = \\mathbf{y} - \\hat{\\mathbf{X}}\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}} \\ne \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}}\n$$\n\nThe true structural data generating process is $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}$. Therefore, the consistent estimator of the structural error variance $s^2$ must evaluate errors using the actual matrix $\\mathbf{X}$:\n\n$$\n\\mathbf{e}_{\\text{structural}} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}}\n$$\n\n$$\ns_{\\text{2SLS}}^2 = \\frac{\\mathbf{e}_{\\text{structural}}^T \\mathbf{e}_{\\text{structural}}}{N - K}\n$$\n\nThe consistent asymptotic variance-covariance matrix is:\n\n$$\n\\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}}) = s_{\\text{2SLS}}^2 (\\mathbf{X}^T \\mathbf{P}_Z \\mathbf{X})^{-1}\n$$\n\n### The LATE Theorem (Local Average Treatment Effect)\n\nUnder binary treatment $D_i \\in \\{0, 1\\}$ and binary instrument $Z_i \\in \\{0, 1\\}$, every individual belongs to one of four latent compliance strata defined by their potential treatment states $(D_i(1), D_i(0))$:\n1. **Compliers:** $D_i(1) = 1, D_i(0) = 0$ (take treatment if encouraged, avoid if not).\n2. **Always-Takers:** $D_i(1) = 1, D_i(0) = 1$ (take treatment regardless of instrument).\n3. **Never-Takers:** $D_i(1) = 0, D_i(0) = 0$ (refuse treatment regardless of instrument).\n4. **Defiers:** $D_i(1) = 0, D_i(0) = 1$ (do the exact opposite of encouragement).\n\n**Theorem (Imbens & Angrist, 1994):** If the instrument satisfies:\n1. *Independence:* $(Y_i(1), Y_i(0), D_i(1), D_i(0)) \\perp\\!\\!\\perp Z_i$\n2. *Exclusion Restriction:* $Y_i(d, z) = Y_i(d)$\n3. *First Stage Relevance:* $\\mathbb{E}[D_i(1) - D_i(0)] \\ne 0$\n4. *Monotonicity (No Defiers):* $D_i(1) \\ge D_i(0)$ for all $i$\n\nThen the Wald / 2SLS estimator identifies the **Local Average Treatment Effect (LATE)**:\n\n$$\n\\hat{\\beta}_{\\text{IV}} \\xrightarrow{p} \\text{LATE} \\equiv \\mathbb{E}\\big[Y_i(1) - Y_i(0) \\mid D_i(1) - D_i(0) = 1\\big]\n$$\n\n* $\\mathbf{Z} \\in \\mathbb{R}^{N \\times L}$: Matrix of instruments and exogenous covariates ($L \\ge K$).\n* $\\mathbf{P}_Z$: Symmetric idempotent hat matrix projecting vectors into the column space of $\\mathbf{Z}$.\n* $\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}$: Orthogonal projection of regressors containing only exogenous instrumental variation.\n* $\\mathbf{e}_{\\text{structural}} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$: True structural residuals used to compute standard errors.\n* $\\text{LATE}$: The average causal effect evaluated strictly over the subgroup of compliers.\n* Monotonicity: The behavioral assumption ruling out defiers ($D_i(1) \\ge D_i(0)$).\n\nImplement a Two-Stage Least Squares (2SLS) estimation engine from first principles in NumPy. Verify that standard errors are constructed using the correct structural residuals rather than the second-stage fitted residuals.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-two-stage-least-squares-late",
          "starterCode": "def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X : np.ndarray of shape (N, K)\n        Matrix of endogenous/exogenous regressors.\n    Z : np.ndarray of shape (N, L)\n        Matrix of instrumental variables (L >= K).\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_2sls': np.ndarray of shape (K,)\n        'structural_residuals': np.ndarray of shape (N,)\n        's2': float, unbiased structural error variance\n        'se': np.ndarray of shape (K,), standard errors\n    \"\"\"\n    # Step 1: Compute projection matrix P_Z = Z (Z^T Z)^(-1) Z^T\n    # Step 2: Generate first-stage purified predictions X_hat = P_Z X\n    # Step 3: Solve second-stage equation (X_hat^T X_hat) beta = X_hat^T y stably\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X : np.ndarray of shape (N, K)\n        Matrix of endogenous/exogenous regressors.\n    Z : np.ndarray of shape (N, L)\n        Matrix of instrumental variables (L >= K).\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_2sls': np.ndarray of shape (K,)\n        'structural_residuals': np.ndarray of shape (N,)\n        's2': float, unbiased structural error variance\n        'se': np.ndarray of shape (K,), standard errors\n    \"\"\"\n    # Step 1: Compute projection matrix P_Z = Z (Z^T Z)^(-1) Z^T\n    # Step 2: Generate first-stage purified predictions X_hat = P_Z X\n    # Step 3: Solve second-stage equation (X_hat^T X_hat) beta = X_hat^T y stably\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X : np.ndarray of shape (N, K)\n        Matrix of endogenous/exogenous regressors.\n    Z : np.ndarray of shape (N, L)\n        Matrix of instrumental variables (L >= K).\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_2sls': np.ndarray of shape (K,)\n        'structural_residuals': np.ndarray of shape (N,)\n        's2': float, unbiased structural error variance\n        'se': np.ndarray of shape (K,), standard errors\n    \"\"\"\n    N, K = X.shape\n    \n    # Step 1: Compute projection matrix P_Z = Z (Z^T Z)^(-1) Z^T\n    ZtZ = Z.T @ Z\n    ZtZ_inv = np.linalg.inv(ZtZ)\n    P_Z = Z @ ZtZ_inv @ Z.T\n    \n    # Step 2: Generate first-stage purified predictions X_hat = P_Z X\n    X_hat = P_Z @ X\n    \n    # Step 3: Solve second-stage equation (X_hat^T X_hat) beta = X_hat^T y stably\n    XtPZ_X = X.T @ P_Z @ X\n    XtPZ_y = X.T @ P_Z @ y\n    beta_2sls = np.linalg.solve(XtPZ_X, XtPZ_y)\n    \n    # Step 4: CRITICAL - Compute true structural residuals using original X, NOT X_hat\n    structural_residuals = y - X @ beta_2sls\n    \n    # Step 5: Compute degrees-of-freedom corrected structural residual variance s^2\n    df = N - K\n    s2 = float(np.sum(structural_residuals ** 2)) / df if df > 0 else 0.0\n    \n    # Step 6: Parameter covariance matrix and standard errors\n    vcov = s2 * np.linalg.inv(XtPZ_X)\n    se = np.sqrt(np.maximum(np.diag(vcov), 0.0))\n    \n    return {\n        \"beta_2sls\": beta_2sls,\n        \"structural_residuals\": structural_residuals,\n        \"s2\": s2,\n        \"se\": se,\n    }"
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
      "en": "In standard cross-sectional data, we observe each person, firm, or country only once. If an unobserved, permanent characteristic—such as an...",
      "ar": "في البيانات المقطعية العادية، نرصد كل فرد أو شركة أو دولة مرة واحدة فقط. وإذا ارتبطت سمة دائمة غير مرصودة—كالذكاء الفطري للشخص، أو الثقافة..."
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
          "en": "In standard cross-sectional data, we observe each person, firm, or country only once. If an unobserved, permanent characteristic—such as an individual's innate tenacity, a startup's founding culture, or a nation's geographical climate—correlates with our regressors, OLS is hopelessly poisoned by omitted variable bias.\n\n**Panel (longitudinal) datasets** track the exact same $N$ economic entities across multiple time periods ($t = 1, \\dots, T$). This temporal repetition grants econometrics one of its most celebrated superpowers: the **Within Estimator (Fixed Effects)**.\n\nHow does this statistical magic work? Rather than comparing entity $A$ against entity $B$, Fixed Effects acts as a mirror that compares **each entity strictly against its own historical average**:\n1. First, calculate each entity's personal time-mean for the outcome ($\\bar{y}_i$) and for all regressors ($\\bar{\\mathbf{x}}_i$).\n2. Second, subtract the entity's personal average from every single temporal observation:\n   $$\\ddot{y}_{it} = y_{it} - \\bar{y}_i, \\quad \\ddot{\\mathbf{x}}_{it} = \\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i$$\n\nWhat happens to the unobserved permanent confounder $\\alpha_i$ during this \"within-transformation\"? Because $\\alpha_i$ is constant across time, its temporal average is simply $\\alpha_i$. When you subtract the mean from the equation, the math performs a miracle:\n$$\\alpha_i - \\bar{\\alpha}_i = \\alpha_i - \\alpha_i = 0$$\n**The unobserved confounder subtracts from itself and vanishes completely!** You have successfully controlled for every time-invariant unobserved confounder in the universe—intelligence, genetics, geography, culture, historical legacy—without ever measuring, naming, or finding data for it.\n\nThis illuminates the fundamental distinction between prediction and causation. A predictive machine learning model uses cross-sectional variation to forecast: comparing Apple with a struggling local electronics shop, it observes that firms with higher R&D spend make higher profits. But predicting based on between-firm differences confounds R&D spending with Apple's brand prestige, elite management, and patent hoard! Econometrics asks a causal question: *\"If a firm increases its own R&D budget this year, will its own profits rise?\"* Fixed effects sweeps away the cross-sectional comparisons, isolating strictly the *within-entity* changes over time. However, this superpower carries an inescapable price: **any observed variable that does not change over time (such as birthplace, race, or school location) is also subtracted from itself and wiped out!**",
          "ar": "في البيانات المقطعية العادية، نرصد كل فرد أو شركة أو دولة مرة واحدة فقط. وإذا ارتبطت سمة دائمة غير مرصودة—كالذكاء الفطري للشخص، أو الثقافة التأسيسية للشركة، أو جغرافية الدولة—بالمتغيرات المستقلة، يسقط انحدار OLS حتمًا في فخ انحياز المتغير المغفَل.\n\nتتتبع **بيانات السلاسل المقطعية (بيانات البانل Panel Data)** الوحدات الاقتصادية الـ $N$ ذاتها عبر فترات زمنية متتالية ($t = 1, \\dots, T$). يمنح هذا التكرار الزمني القياس الاقتصادي إحدى أقوى أدواته ومنهجياته على الإطلاق: **مقدر التحويل الداخلي للآثار الثابتة (Fixed Effects Within-Estimator)**.\n\nكيف تعمل هذه المعجزة الإحصائية؟ بدلاً من مقارنة الفرد $A$ بالفرد $B$، يعمل نموذج الآثار الثابتة كمرآة تقارن **كل وحدة اقتصادية بمتوسط تاريخها الشخصي حصريًا**:\n1. أولاً، نحسب المتوسط الزمني الخاص بكل فرد للمتغير التابع ($\\bar{y}_i$) ولجميع المتغيرات المستقلة ($\\bar{\\mathbf{x}}_i$).\n2. ثانيًا، نطرح المتوسط الزمني للفرد من كل مشاهدة من مشاهداته الزمنية:\n   $$\\ddot{y}_{it} = y_{it} - \\bar{y}_i, \\quad \\ddot{\\mathbf{x}}_{it} = \\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i$$\n\nما الذي يحدث للمتغير الخفي الثابت $\\alpha_i$ أثناء هذا التحويل الداخلي (Within-Transformation)؟ نظرًا لأن $\\alpha_i$ يمثل سمة ثابتة لا تتغير مع مرور الزمن، فإن متوسطه الزمني هو $\\alpha_i$ نفسه. وعند طرح المتوسط من المعادلة، تحدث المعجزة الرياضية:\n$$\\alpha_i - \\bar{\\alpha}_i = \\alpha_i - \\alpha_i = 0$$\n**يُطرح المتغير المشوش من نفسه ليتلاشى تمامًا كأنه لم يكن!** أنت بذلك تتحكم في كل عامل خفي وثابت في الكون—كالذكاء الفطري، والجينات، والموقع الجغرافي، والثقافة التأسيسية—دون الحاجة إلى قياسه أو حتى معرفة اسمه.\n\nوهنا يتجلى الفرق الحاسم بين التنبؤ والسببية: يستخدم نموذج تعلم الآلة التنبؤي الفروق المقطعية بين الشركات؛ فيقارن شركة Apple بشركة ناشئة متعثرة ليتنبأ بأن الإنفاق على البحث والتطوير يجلب أرباحًا طائلة. لكن هذا التنبؤ يخلط بين ميزانية البحث والتطوير وبين اسم Apple التجاري وبراءات اختراعها وكفاءة إدارتها! أما القياس الاقتصادي فيطرح سؤالاً سببيًا صارمًا: *\"لو زادت الشركة نفسها إنفاقها على البحث والتطوير هذا العام، فهل سترتفع أرباحها هي؟\"* يمحو نموذج الآثار الثابتة الفروق بين الكيانات ويعزل التغيرات الزمنية داخل الكيان نفسه. ومع ذلك، فإن لهذه القوة ثمنًا لا مفر منه: **أي متغير مرصود لا يتغير عبر الزمن (كمكان الميلاد أو الأصل العرقي) يُطرح هو الآخر من نفسه ويُمحى كليًا من المعادلة!**"
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
          "en": "Where $\\alpha_i$ is an individual-specific fixed effect that may be arbitrarily correlated with the regressors ($\\mathbb{E}[\\alpha_i \\mid \\mathbf{x}_{it}] \\ne 0$).\n\n### Algebraic Derivation of the Within-Transformation\n\nAveraging across all $T$ time periods for entity $i$:\n\n$$\n\\frac{1}{T}\\sum_{t=1}^T y_{it} = \\left(\\frac{1}{T}\\sum_{t=1}^T \\mathbf{x}_{it}^T\\right) \\boldsymbol{\\beta} + \\frac{1}{T}\\sum_{t=1}^T \\alpha_i + \\frac{1}{T}\\sum_{t=1}^T \\varepsilon_{it}\n$$\n\nDefining temporal averages $\\bar{y}_i \\equiv \\frac{1}{T}\\sum_{t=1}^T y_{it}$, $\\bar{\\mathbf{x}}_i \\equiv \\frac{1}{T}\\sum_{t=1}^T \\mathbf{x}_{it}$, and $\\bar{\\varepsilon}_i \\equiv \\frac{1}{T}\\sum_{t=1}^T \\varepsilon_{it}$:\n\n$$\n\\bar{y}_i = \\bar{\\mathbf{x}}_i^T \\boldsymbol{\\beta} + \\alpha_i + \\bar{\\varepsilon}_i\n$$\n\nSubtracting the mean equation from the time-varying equation:\n\n$$\n(y_{it} - \\bar{y}_i) = (\\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i)^T \\boldsymbol{\\beta} + (\\alpha_i - \\alpha_i) + (\\varepsilon_{it} - \\bar{\\varepsilon}_i)\n$$\n\n$$\n\\ddot{y}_{it} = \\ddot{\\mathbf{x}}_{it}^T \\boldsymbol{\\beta} + \\ddot{\\varepsilon}_{it}\n$$\n\nThe unobserved entity effect $\\alpha_i$ is algebraically eliminated because $\\alpha_i - \\alpha_i \\equiv 0$.\n\n### Matrix Geometry & The Demeaning Projection Matrix $\\mathbf{Q}$\n\nLet $\\mathbf{D} = \\mathbf{I}_N \\otimes \\boldsymbol{\\iota}_T$ be the $NT \\times N$ matrix of entity dummy variables. The Least Squares Dummy Variable (LSDV) estimator is identical to running OLS with $\\mathbf{D}$.\n\nBy the Frisch-Waugh-Lovell theorem, demeaning is equivalent to pre-multiplying the data by the orthogonal projection matrix:\n\n$$\n\\mathbf{Q} \\equiv \\mathbf{I}_{NT} - \\mathbf{D}(\\mathbf{D}^T \\mathbf{D})^{-1}\\mathbf{D}^T = \\mathbf{I}_N \\otimes \\left( \\mathbf{I}_T - \\frac{1}{T}\\boldsymbol{\\iota}_T \\boldsymbol{\\iota}_T^T \\right)\n$$\n\nThe matrix $\\mathbf{Q}$ is symmetric and idempotent ($\\mathbf{Q}^T \\mathbf{Q} = \\mathbf{Q}$) with rank:\n\n$$\n\\text{rank}(\\mathbf{Q}) = \\text{tr}(\\mathbf{Q}) = NT - N = N(T - 1)\n$$\n\nThe closed-form **Within Fixed Effects Estimator** is:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} = (\\mathbf{X}^T \\mathbf{Q} \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{Q} \\mathbf{y} = \\left( \\sum_{i=1}^N \\sum_{t=1}^T \\ddot{\\mathbf{x}}_{it} \\ddot{\\mathbf{x}}_{it}^T \\right)^{-1} \\sum_{i=1}^N \\sum_{t=1}^T \\ddot{\\mathbf{x}}_{it} \\ddot{y}_{it}\n$$\n\n### Correct Degrees-of-Freedom & Variance Estimation\n\nBecause $N$ individual fixed effects were estimated (or demeaned out), the residual degrees of freedom are $NT - N - K$:\n\n$$\ns_{\\text{FE}}^2 = \\frac{\\sum_{i=1}^N \\sum_{t=1}^T ( \\ddot{y}_{it} - \\ddot{\\mathbf{x}}_{it}^T \\hat{\\boldsymbol{\\beta}}_{\\text{FE}} )^2}{NT - N - K}\n$$\n\n$$\n\\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}) = s_{\\text{FE}}^2 \\left( \\sum_{i=1}^N \\sum_{t=1}^T \\ddot{\\mathbf{x}}_{it} \\ddot{\\mathbf{x}}_{it}^T \\right)^{-1}\n$$\n\nEntity intercepts can be recovered as:\n\n$$\n\\hat{\\alpha}_i = \\bar{y}_i - \\bar{\\mathbf{x}}_i^T \\hat{\\boldsymbol{\\beta}}_{\\text{FE}}\n$$\n\n* $y_{it}$: Observed outcome of entity $i$ at time period $t$.\n* $\\mathbf{x}_{it} \\in \\mathbb{R}^{K}$: Vector of strictly time-varying explanatory variables.\n* $\\alpha_i$: Entity fixed effect capturing all time-invariant unobserved heterogeneity (allowed to correlate arbitrarily with $\\mathbf{x}_{it}$).\n* $\\varepsilon_{it}$: Idiosyncratic time-varying shock satisfying strict exogeneity $\\mathbb{E}[\\varepsilon_{it} \\mid \\mathbf{X}_i, \\alpha_i] = 0$.\n* $\\ddot{y}_{it} = y_{it} - \\bar{y}_i$: Demeaned outcome variable purged of entity time-averages.\n* $\\ddot{\\mathbf{x}}_{it} = \\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i$: Demeaned regressor vector; if regressor $k$ is time-invariant ($x_{it, k} = x_{i, k}$ for all $t$), then $\\ddot{x}_{it, k} = 0$, rendering the matrix non-invertible.\n* $\\mathbf{Q}$: The block-diagonal annihilator projection matrix that demeans panel data across time.\n\nImplement the panel fixed effects within-estimator in NumPy. Demean both $y$ and $X$ by entity group, solve for $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$, and back out the estimated entity intercepts $\\hat{\\alpha}_i$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-panel-data-fixed-effects",
          "starterCode": "def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits a panel fixed-effects regression via the Within-Transformation.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N_total,)\n        Stacked outcome vector.\n    X : np.ndarray of shape (N_total, K)\n        Stacked time-varying regressor matrix.\n    entity_ids : np.ndarray of shape (N_total,)\n        Integer identifiers for each entity.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_fe': np.ndarray of shape (K,), within-estimator coefficients\n        'entity_alphas': dict mapping entity_id to float estimated alpha_i\n    \"\"\"\n    # Initialize arrays for demeaned variables\n    # Step 1: Compute entity-specific temporal averages and demean (within-transformation)\n    # Step 2: Fit OLS on demeaned data: beta_fe = (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits a panel fixed-effects regression via the Within-Transformation.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N_total,)\n        Stacked outcome vector.\n    X : np.ndarray of shape (N_total, K)\n        Stacked time-varying regressor matrix.\n    entity_ids : np.ndarray of shape (N_total,)\n        Integer identifiers for each entity.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_fe': np.ndarray of shape (K,), within-estimator coefficients\n        'entity_alphas': dict mapping entity_id to float estimated alpha_i\n    \"\"\"\n    # Initialize arrays for demeaned variables\n    # Step 1: Compute entity-specific temporal averages and demean (within-transformation)\n    # Step 2: Fit OLS on demeaned data: beta_fe = (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits a panel fixed-effects regression via the Within-Transformation.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N_total,)\n        Stacked outcome vector.\n    X : np.ndarray of shape (N_total, K)\n        Stacked time-varying regressor matrix.\n    entity_ids : np.ndarray of shape (N_total,)\n        Integer identifiers for each entity.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_fe': np.ndarray of shape (K,), within-estimator coefficients\n        'entity_alphas': dict mapping entity_id to float estimated alpha_i\n    \"\"\"\n    unique_entities = np.unique(entity_ids)\n    \n    # Initialize arrays for demeaned variables\n    y_ddot = np.zeros_like(y, dtype=float)\n    X_ddot = np.zeros_like(X, dtype=float)\n    entity_means_y = {}\n    entity_means_X = {}\n    \n    # Step 1: Compute entity-specific temporal averages and demean (within-transformation)\n    for eid in unique_entities:\n        mask = (entity_ids == eid)\n        y_bar = np.mean(y[mask])\n        X_bar = np.mean(X[mask], axis=0)\n        \n        entity_means_y[eid] = y_bar\n        entity_means_X[eid] = X_bar\n        \n        y_ddot[mask] = y[mask] - y_bar\n        X_ddot[mask] = X[mask] - X_bar\n        \n    # Step 2: Fit OLS on demeaned data: beta_fe = (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    XtX = X_ddot.T @ X_ddot\n    Xty = X_ddot.T @ y_ddot\n    beta_fe = np.linalg.solve(XtX, Xty)\n    \n    # Step 3: Back out entity-specific intercepts: alpha_i = y_bar_i - X_bar_i @ beta_fe\n    entity_alphas = {}\n    for eid in unique_entities:\n        entity_alphas[eid] = float(entity_means_y[eid] - entity_means_X[eid] @ beta_fe)\n        \n    return {\n        \"beta_fe\": beta_fe,\n        \"entity_alphas\": entity_alphas,\n    }"
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
      "en": "In panel data econometrics, every empirical researcher eventually arrives at a decisive, high-stakes crossroads: Fixed Effects (FE) versus...",
      "ar": "في تحليل بيانات البانل، يقف الباحث الاقتصادي دائمًا أمام مفترق طرق منهجي حاسم وشديد الحساسية: المفاضلة بين الآثار الثابتة (Fixed Effects -..."
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
          "en": "In panel data econometrics, every empirical researcher eventually arrives at a decisive, high-stakes crossroads: **Fixed Effects (FE) versus Random Effects (RE)**.\n\nThink of these two models as representing two radically different scientific philosophies:\n* **Fixed Effects is the ultra-cautious skeptic:** It assumes that individual human beings, companies, or countries carry unobserved traits—grit, organizational culture, geography, or historical privilege ($\\alpha_i$)—that correlate with their choices. To protect against omitted variable bias, FE demeans the data completely. But this insurance policy is expensive: it throws away all cross-sectional between-entity variation, leaving only noisy within-entity wobbles, and completely annihilates any variable that remains constant over time.\n* **Random Effects is the optimistic pragmatist:** It asks: *\"What if unobserved individuality $\\alpha_i$ is completely uncorrelated with our regressors?\"* If that assumption holds, throwing away between-person comparisons is statistical suicide! Instead of wiping out the means completely, RE applies **quasi-demeaning** via Feasible Generalized Least Squares (FGLS): it subtracts only a partial fraction $\\theta \\in [0, 1]$ of the individual's average. This preserves time-invariant variables (like gender or education) and delivers dramatically smaller, more efficient standard errors.\n\nCrucially, this choice exposes the philosophical chasm between machine learning prediction and econometric causality. In predictive machine learning and Bayesian modeling, Random Effects (often called hierarchical mixed models or shrinkage estimators) is almost always preferred. Why? Because shrinking individual parameters toward the grand population mean minimizes out-of-sample prediction error (Mean Squared Error) through the classic bias-variance tradeoff. If your goal is purely to predict which hospital will have high patient mortality next month, shrinkage is king. But in econometrics, we want to know: *\"Does investing in an expensive surgical robot causally reduce mortality?\"* If elite hospitals with world-class surgeons are the ones buying the robots, the unobserved surgeon talent correlates with the regressor! Shrinking toward the group mean pulls the causal estimate toward a contaminated cross-sectional bias. Econometrics gladly accepts higher variance in order to guarantee causal unbiasedness.\n\nHow does the empirical researcher decide whether they can safely use Random Effects or must retreat to Fixed Effects? **The Hausman Specification Test** stages a formal statistical showdown:\n* **Under the Null Hypothesis ($H_0$: Orthogonal Heterogeneity):** Both FE and RE are consistent, but RE is the Best Linear Unbiased Estimator (BLUE) with smaller variance. Their estimates should be virtually identical, differing only by random sampling noise.\n* **Under the Alternative Hypothesis ($H_1$: Endogenous Heterogeneity):** RE is biased and corrupted by omitted variables. FE remains completely consistent and immune to the confounding!\n\nThe Hausman test acts as a statistical lie-detector test: if the gap between $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$ and $\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}$ is too wide to be explained by chance, the alarm sounds: **reject Random Effects and trust Fixed Effects!**",
          "ar": "في تحليل بيانات البانل، يقف الباحث الاقتصادي دائمًا أمام مفترق طرق منهجي حاسم وشديد الحساسية: **المفاضلة بين الآثار الثابتة (Fixed Effects - FE) والآثار العشوائية (Random Effects - RE)**.\n\nيمثل هذان النموذجان فلسفتين علميتين مختلفتين تمامًا:\n* **نموذج الآثار الثابتة (FE) هو المتشكك شديد الحذر:** يفترض أن الأفراد أو الشركات أو الدول يحملون سمات خفية غير مقاسة—كالذكاء الفطري، أو الثقافة المؤسسية، أو الموروث التاريخي والجغرافي ($\\alpha_i$)—ترتبط ارتباطًا وثيقًا بقراراتهم وسلوكهم. وفي سبيل حماية النموذج من انحياز المتغير المغفَل، يطرح FE المتوسطات بالكامل (Demeaning). لكن بوليصة التأمين هذه مكلفة للغاية؛ فهي تهدر جميع الفروق المقطعية بين الكيانات، ولا تترك سوى التذبذبات الزمنية الهامشية، وتمحو تمامًا أي متغير ثابت عبر الزمن!\n* **نموذج الآثار العشوائية (RE) هو البراغماتي المتفائل:** يتساءل: *\"ماذا لو كانت الخصائص الفردية غير المرصودة $\\alpha_i$ مستقلة تمامًا وغير مرتبطة بمتغيراتنا؟\"* إذا تحقق هذا الفرض، فإن إهدار المقارنات بين الأفراد يعد خسارة فادحة في الكفاءة الإحصائية! بدلاً من محو المتوسطات بالكامل، يطبق RE **طرحًا جزئيًا (Quasi-Demeaning)** عبر المربعات الصغرى المعممة (GLS): فهو يطرح نسبة انكماش معينة $\\theta \\in [0, 1]$ فقط من المتوسط. يحافظ هذا على المتغيرات الثابتة ويمنحنا أخطاء معيارية أصغر بكثير وأعلى دقة.\n\nوهنا يتجلى الخلاف الفلسفي العميق بين تعلم الآلة التنبؤي والسببية في القياس الاقتصادي. في تعلم الآلة والإحصاء البايزي، يُفضل نموذج التأثيرات العشوائية دائمًا (ويسمى النماذج الهرمية المختلطة أو مقدرات الانكماش Shrinkage). لماذا؟ لأن تقليص الفروق الفردية وسحبها نحو المتوسط العام للمجتمع يقلل خطأ التنبؤ المستقبلي (MSE) وفق مقايضة الانحياز والتباين الشهيرة. فإذا كان هدفك التنبؤ بمعدل وفيات مستشفى معين الشهر القادم، فالانكماش ممتاز. لكن في القياس الاقتصادي، نريد إجابة سببية: *\"هل يؤدي شراء جهاز جراحي متطور إلى خفض وفيات المرضى سببيًا؟\"* إذا كانت المستشفيات المرموقة التي تضم أمهر الجراحين هي الوحيدة القادرة على شراء هذه الأجهزة، فإن مهارة الجراح الخفية ترتبط بوجود الجهاز! وسحب التقدير نحو المتوسط العام يلوث المعلمة السببية بانحياز خطير. يرفض القياس الاقتصادي هذا التلوث، ويقبل بتباين أكبر في سبيل ضمان نقاء الأثر السببي.\n\nكيف يحسم الباحث هذا النزاع ويختار النموذج الصحيح؟ يضع **اختبار هاوسمان (Hausman Specification Test)** كلا المقدرين في مواجهة حاسمة:\n* **في ظل فرضية العدم ($H_0$: استقلال الخصائص الفردية):** كلا المقدرين متسقان، لكن مقدر RE أكثر كفاءة ودقة إحصائية. وتكون تقديرات FE و RE متطابقة تقريبًا باستثناء فروق عشوائية طفيفة ناتجة عن المعاينة.\n* **في ظل الفرضية البديلة ($H_1$: ارتباط الخصائص الفردية بالمتغيرات):** يسقط مقدر RE في هاوية الانحياز، بينما يظل مقدر FE صامدًا ومتسقًا لا يتأثر!\n\nيعمل اختبار هاوسمان كجهاز كشف كذب إحصائي: فإذا كان التباعد بين تقدير FE وتقدير RE أكبر مما يمكن للصدفة أن تبرره، يطلق الاختبار صافرة الإنذار: **ارفض فرضية الآثار العشوائية واعتمد الآثار الثابتة!**"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "y_{it} = \\mathbf{x}_{it}^T \\boldsymbol{\\beta} + \\alpha_i + \\varepsilon_{it}",
        "formulaNote": {
          "en": "Core invariant for Random Effects, First-Differencing, and the Hausman Test.",
          "ar": "الخاصية الرياضية الجوهرية لـ الآثار العشوائية والفروق الأولى واختبار هاوسمان."
        },
        "narrative": {
          "en": "Under the Random Effects orthogonality assumption:\n\n$$\n\\mathbb{E}[\\alpha_i \\mid \\mathbf{X}_i] = 0, \\quad \\mathbb{E}[\\varepsilon_{it} \\mid \\mathbf{X}_i, \\alpha_i] = 0, \\quad \\mathbb{V}(\\alpha_i) = \\sigma_\\alpha^2, \\quad \\mathbb{V}(\\varepsilon_{it}) = \\sigma_\\varepsilon^2\n$$\n\n### Composite Error Covariance Matrix & Spectral Decomposition\n\nFor an individual entity $i$, stack the $T$ time periods into vector $\\mathbf{v}_i = (\\alpha_i + \\varepsilon_{i1}, \\dots, \\alpha_i + \\varepsilon_{iT})^T$. The covariance matrix exhibits equicorrelation:\n\n$$\n\\boldsymbol{\\Sigma}_i \\equiv \\mathbb{E}[\\mathbf{v}_i \\mathbf{v}_i^T] = \\sigma_\\varepsilon^2 \\mathbf{I}_T + \\sigma_\\alpha^2 \\boldsymbol{\\iota}_T \\boldsymbol{\\iota}_T^T\n$$\n\nUsing the projection matrices $\\mathbf{P} = \\frac{1}{T}\\boldsymbol{\\iota}_T \\boldsymbol{\\iota}_T^T$ and $\\mathbf{Q} = \\mathbf{I}_T - \\mathbf{P}$:\n\n$$\n\\boldsymbol{\\Sigma}_i = \\sigma_\\varepsilon^2 (\\mathbf{P} + \\mathbf{Q}) + T \\sigma_\\alpha^2 \\mathbf{P} = (\\sigma_\\varepsilon^2 + T \\sigma_\\alpha^2)\\mathbf{P} + \\sigma_\\varepsilon^2 \\mathbf{Q}\n$$\n\nThe inverse square-root matrix $\\boldsymbol{\\Sigma}_i^{-1/2}$ is:\n\n$$\n\\boldsymbol{\\Sigma}_i^{-1/2} = \\frac{1}{\\sqrt{\\sigma_\\varepsilon^2 + T \\sigma_\\alpha^2}} \\mathbf{P} + \\frac{1}{\\sigma_\\varepsilon} \\mathbf{Q} = \\frac{1}{\\sigma_\\varepsilon} \\left[ \\mathbf{I}_T - \\left( 1 - \\sqrt{\\frac{\\sigma_\\varepsilon^2}{\\sigma_\\varepsilon^2 + T \\sigma_\\alpha^2}} \\right) \\mathbf{P} \\right]\n$$\n\n### The Quasi-Demeaning Transformation\n\nMultiplying through by $\\sigma_\\varepsilon \\boldsymbol{\\Sigma}_i^{-1/2}$ yields the quasi-demeaned variables:\n\n$$\ny_{it}^* = y_{it} - \\theta \\bar{y}_i, \\quad \\mathbf{x}_{it}^* = \\mathbf{x}_{it} - \\theta \\bar{\\mathbf{x}}_i\n$$\n\nWhere the shrinkage parameter $\\theta$ is explicitly:\n\n$$\n\\theta \\equiv 1 - \\sqrt{\\frac{\\sigma_\\varepsilon^2}{\\sigma_\\varepsilon^2 + T \\sigma_\\alpha^2}} \\in [0, 1]\n$$\n\n* If individual heterogeneity vanishes ($\\sigma_\\alpha^2 \\to 0$), $\\theta \\to 0$ (yielding Pooled OLS).\n* If individual heterogeneity dominates ($\\sigma_\\alpha^2 \\to \\infty$) or panel length grows ($T \\to \\infty$), $\\theta \\to 1$ (yielding Fixed Effects).\n\n### Derivation of the Hausman Test Statistic\n\nLet $\\hat{\\mathbf{q}} \\equiv \\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}}$. To construct a Wald-type quadratic form, we require $\\mathbb{V}(\\hat{\\mathbf{q}}) = \\mathbb{V}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}) + \\mathbb{V}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) - 2\\text{Cov}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}, \\hat{\\boldsymbol{\\beta}}_{\\text{RE}})$.\n\n**Hausman's Lemma (1978):** Under $H_0$, $\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}$ achieves the Cramér-Rao efficiency bound in the class of all linear unbiased estimators. An efficient estimator has zero covariance with its difference from any other consistent estimator:\n\n$$\n\\text{Cov}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}, \\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) = \\mathbf{0} \\implies \\text{Cov}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}, \\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) = \\mathbb{V}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}})\n$$\n\nSubstituting this identity into the variance of $\\hat{\\mathbf{q}}$:\n\n$$\n\\mathbb{V}(\\hat{\\mathbf{q}}) = \\mathbb{V}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}) + \\mathbb{V}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) - 2\\mathbb{V}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) = \\mathbb{V}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}) - \\mathbb{V}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}})\n$$\n\nThe **Hausman Test Statistic** is:\n\n$$\nH = (\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}})^T \\Big[ \\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}) - \\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) \\Big]^{-1} (\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) \\xrightarrow{d} \\chi^2(K)\n$$\n\n* $v_{it} = \\alpha_i + \\varepsilon_{it}$: Composite error composed of entity unobserved effect $\\alpha_i$ and idiosyncratic shock $\\varepsilon_{it}$.\n* $\\sigma_\\alpha^2$: Variance of the unobserved individual effect across entities.\n* $\\sigma_\\varepsilon^2$: Variance of the idiosyncratic disturbance.\n* $\\theta \\in [0, 1]$: Shrinkage parameter governing the degree of quasi-demeaning.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$: Within-estimator, consistent under both $H_0$ and $H_1$.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}$: FGLS estimator, fully efficient under $H_0$ but inconsistent under $H_1$.\n* $H \\sim \\chi^2(K)$: Hausman test statistic with degrees of freedom equal to the rank of the variance difference matrix.\n\nImplement the Hausman specification test statistic comparing parameter estimates and asymptotic covariance matrices from Fixed Effects and Random Effects models.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-random-effects-hausman-test",
          "starterCode": "def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman quadratic test statistic comparing FE and RE estimates.\n    \n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n        Fixed Effects coefficient vector.\n    vcov_fe : np.ndarray of shape (K, K)\n        Fixed Effects covariance matrix.\n    beta_re : np.ndarray of shape (K,)\n        Random Effects coefficient vector.\n    vcov_re : np.ndarray of shape (K, K)\n        Random Effects covariance matrix.\n        \n    Returns\n    -------\n    dict with keys:\n        'stat': float, Hausman chi-square test statistic\n        'df': int, degrees of freedom (rank of variance difference)\n    \"\"\"\n    # Step 1: Compute parameter difference vector q = beta_fe - beta_re\n    # Step 2: Compute variance difference matrix: V_diff = V_fe - V_re\n    # Step 3: Compute Moore-Penrose pseudo-inverse to handle potential numerical singularity\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman quadratic test statistic comparing FE and RE estimates.\n    \n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n        Fixed Effects coefficient vector.\n    vcov_fe : np.ndarray of shape (K, K)\n        Fixed Effects covariance matrix.\n    beta_re : np.ndarray of shape (K,)\n        Random Effects coefficient vector.\n    vcov_re : np.ndarray of shape (K, K)\n        Random Effects covariance matrix.\n        \n    Returns\n    -------\n    dict with keys:\n        'stat': float, Hausman chi-square test statistic\n        'df': int, degrees of freedom (rank of variance difference)\n    \"\"\"\n    # Step 1: Compute parameter difference vector q = beta_fe - beta_re\n    # Step 2: Compute variance difference matrix: V_diff = V_fe - V_re\n    # Step 3: Compute Moore-Penrose pseudo-inverse to handle potential numerical singularity\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman quadratic test statistic comparing FE and RE estimates.\n    \n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n        Fixed Effects coefficient vector.\n    vcov_fe : np.ndarray of shape (K, K)\n        Fixed Effects covariance matrix.\n    beta_re : np.ndarray of shape (K,)\n        Random Effects coefficient vector.\n    vcov_re : np.ndarray of shape (K, K)\n        Random Effects covariance matrix.\n        \n    Returns\n    -------\n    dict with keys:\n        'stat': float, Hausman chi-square test statistic\n        'df': int, degrees of freedom (rank of variance difference)\n    \"\"\"\n    # Step 1: Compute parameter difference vector q = beta_fe - beta_re\n    diff = beta_fe - beta_re\n    \n    # Step 2: Compute variance difference matrix: V_diff = V_fe - V_re\n    vcov_diff = vcov_fe - vcov_re\n    \n    # Step 3: Compute Moore-Penrose pseudo-inverse to handle potential numerical singularity\n    vcov_diff_inv = np.linalg.pinv(vcov_diff)\n    \n    # Step 4: Evaluate the quadratic form H = q^T (V_diff)^(-1) q\n    stat = float(diff.T @ vcov_diff_inv @ diff)\n    \n    # Step 5: Enforce non-negative test statistic and extract degrees of freedom\n    stat = max(0.0, stat)\n    df = int(np.linalg.matrix_rank(vcov_diff))\n    \n    return {\n        \"stat\": stat,\n        \"df\": df,\n    }"
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
      "en": "Imagine two airplanes—Flight A (our treated flight) and Flight B (our control flight)—cruising side by side at cruising altitude.",
      "ar": "تخيل طائرتين تحلقان جنبًا إلى جنب على ارتفاعين مختلفين: الرحلة (أ) على ارتفاع 30,000 قدم، والرحلة (ب) على ارتفاع 25,000 قدم."
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
          "en": "Imagine two airplanes—Flight A (our treated flight) and Flight B (our control flight)—cruising side by side at cruising altitude. Flight A flies at 30,000 feet, while Flight B flies at 25,000 feet. Suddenly, both planes enter a massive turbulent headwind. At that exact split second, the pilot of Flight A activates an experimental high-efficiency booster engine. After thirty minutes, Flight A is traveling at 520 knots, whereas before the booster it was traveling at 500 knots. Can we conclude that the experimental booster added $+20$ knots?\n\nCertainly not! Without knowing how severely the atmospheric headwind slowed down aircraft in that sector, a simple before-and-after comparison is hopelessly confounded by macroeconomic weather shocks. If Flight B (which never engaged the booster) saw its airspeed plummet by 30 knots (from 480 knots to 450 knots) solely due to the storm, Flight A would have plunged by 30 knots as well in the absence of treatment. The true causal lift provided by the booster is not $+20$ knots, but $+50$ knots: the $+20$ observed change minus the $-30$ counterfactual environmental drag.\n\nThis is the timeless core of **Difference-in-Differences (DiD)**, the premier quasi-experimental design of empirical economics. Popularized in David Card and Alan Krueger's seminal 1994 study of the New Jersey minimum wage hike, DiD circumvents two fatal analytical traps simultaneously. A naive **before-and-after study** confounds policy effects with secular macro trends (inflation, holiday shopping surges, regional recessions). Conversely, a naive **cross-sectional comparison** (comparing New Jersey to neighboring Pennsylvania on a single afternoon) confounds the policy with persistent, historical state-level differences (different tax codes, industrial bases, and local demographics).\n\nDiD achieves causal identification by comparing **trajectories over time** rather than static levels. By subtracting the control group's temporal trajectory from the treated group's trajectory, any common aggregate shock that hits both groups equally is annihilated. The linchpin of this entire architecture is the **Parallel Trends Assumption**: in the hypothetical counterfactual universe where treatment never occurred, the average outcome of the treated group would have moved in parallel with the control group.",
          "ar": "تخيل طائرتين تحلقان جنبًا إلى جنب على ارتفاعين مختلفين: الرحلة (أ) على ارتفاع 30,000 قدم، والرحلة (ب) على ارتفاع 25,000 قدم. وفجأة، تدخل الطائرتان في عاصفة جوية معاكسة عنيفة. في تلك اللحظة بالذات، يشغل قبطان الرحلة (أ) محركًا نفاثًا تجريبيًا لزيادة السرعة. بعد نصف ساعة، سجلت الرحلة (أ) سرعة 520 عقدة مقارنة بـ 500 عقدة قبل تشغيل المحرك. فهل يمكننا الجزم بأن المحرك الجديد أضاف 20 عقدة إلى سرعة الطائرة؟\n\nقطعًا لا! إن المقارنة الساذجة بين حال الطائرة \"قبل\" و\"بعد\" تخلط بين أثر المحرك والرياح المعاكسة الشديدة. فلو نظرنا إلى الرحلة (ب) التي لم تشغل أي محرك إضافي، لوجدنا أن سرعتها انحدرت بمقدار 30 عقدة (من 480 إلى 450 عقدة) بفعل العاصفة وحدها. هذا يعني أنه لولا المحرك الجديد، لكانت سرعة الرحلة (أ) قد انخفضت هي الأخرى بمقدار 30 عقدة. وبالتالي، فإن الأثر السببي الحقيقي للمحرك التجريبي ليس 20 عقدة فقط، بل هو 50 عقدة كاملة: التغير الملاحظ (+20) مطروحًا منه الأثر السلبي للعاصفة (-30).\n\nهذا هو الجوهر البصري لأسلوب **الفرق في الفروق (Difference-in-Differences - DiD)**، وهو الأداة التجريبية الأكثر انتشارًا وتأثيرًا في الاقتصاد القياسي الحديث. اشتهرت هذه المنهجية عالميًا في دراسة ديفيد كارد وآلان كروغر (1994) لتقييم أثر رفع الحد الأدنى للأجور في نيوجيرسي مقارنة بمطاعم الوجبات السريعة في ولاية بنسلفانيا المجاورة. يتفادى أسلوب DiD فخين قاتلين: المقارنة الزمنية البسيطة (قبل وبعد) التي تخلط بين السياسة والتقلبات الاقتصادية العامة، والمقارنة المقطعية البسيطة (بين ولايتين في لحظة واحدة) التي تخلط بين السياسة والفروق الهيكلية التاريخية المتجذرة بين المناطق.\n\nيعتمد مقدر DiD على مقارنة **المسارات الديناميكية عبر الزمن** بدلاً من مقارنة المستويات الثابتة. ومن خلال طرح مسار نمو المجموعة الضابطة من مسار نمو المجموعة المعالجة، تتلاشى جميع الصدمات الخارجية المشتركة التي تؤثر في المجموعتين بالتساوي. ويرتكز هذا البناء بالكامل على **فرضية مسار التوازي (Parallel Trends Assumption)**: وهي أنه في السيناريو الافتراضي المقابل للواقع (Counterfactual)—أي لولا تطبيق السياسة—لكان مسار المجموعة المعالجة قد تطور بمعدل موازٍ تمامًا لمسار المجموعة الضابطة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\bar{Y}_{g, t} \\equiv \\mathbb{E}[Y_{it} \\mid G_i = g, T_t = t], \\quad \\text{for } g \\in \\{0, 1\\}, t \\in \\{0, 1\\}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Canonical 2x2 Difference-in-Differences & Parallel Trends.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي."
        },
        "narrative": {
          "en": "The sample Difference-in-Differences estimator evaluates the double difference of these expectations:\n\n$$\n\\hat{\\delta}_{\\text{DiD}} = \\left(\\bar{Y}_{1, 1} - \\bar{Y}_{1, 0}\\right) - \\left(\\bar{Y}_{0, 1} - \\bar{Y}_{0, 0}\\right)\n$$\n\nThis estimator is recovered identically via Ordinary Least Squares (OLS) from the classic two-way interaction regression:\n\n$$\nY_{it} = \\beta_0 + \\beta_1 G_i + \\beta_2 T_t + \\delta (G_i \\times T_t) + \\varepsilon_{it}\n$$\n\nEvaluating the conditional expectation for each of the four cells:\n- **Control Group Pre-Period ($G=0, T=0$):**\n  $$\\mathbb{E}[Y_{it} \\mid 0, 0] = \\beta_0$$\n- **Control Group Post-Period ($G=0, T=1$):**\n  $$\\mathbb{E}[Y_{it} \\mid 0, 1] = \\beta_0 + \\beta_2$$\n- **Treated Group Pre-Period ($G=1, T=0$):**\n  $$\\mathbb{E}[Y_{it} \\mid 1, 0] = \\beta_0 + \\beta_1$$\n- **Treated Group Post-Period ($G=1, T=1$):**\n  $$\\mathbb{E}[Y_{it} \\mid 1, 1] = \\beta_0 + \\beta_1 + \\beta_2 + \\delta$$\n\nTaking the difference of within-group changes over time:\n\n$$\n\\Delta \\bar{Y}_{\\text{Treated}} = \\mathbb{E}[Y \\mid 1, 1] - \\mathbb{E}[Y \\mid 1, 0] = (\\beta_0 + \\beta_1 + \\beta_2 + \\delta) - (\\beta_0 + \\beta_1) = \\beta_2 + \\delta\n$$\n\n$$\n\\Delta \\bar{Y}_{\\text{Control}} = \\mathbb{E}[Y \\mid 0, 1] - \\mathbb{E}[Y \\mid 0, 0] = (\\beta_0 + \\beta_2) - \\beta_0 = \\beta_2\n$$\n\nSubtracting the control change from the treated change isolates the causal interaction parameter:\n\n$$\n\\Delta \\bar{Y}_{\\text{Treated}} - \\Delta \\bar{Y}_{\\text{Control}} = (\\beta_2 + \\delta) - \\beta_2 = \\delta\n$$\n\nUnder the Rubin Potential Outcomes framework, let $Y_{it}(1)$ and $Y_{it}(0)$ represent potential outcomes with and without treatment. The unobservable post-treatment counterfactual for the treated group is formally identified by:\n\n$$\n\\mathbb{E}[Y_{i1}(0) \\mid G_i = 1] = \\bar{Y}_{1, 0} + (\\bar{Y}_{0, 1} - \\bar{Y}_{0, 0})\n$$\n\nIdentification of the Average Treatment Effect on the Treated ($\\tau_{\\text{ATT}} = \\mathbb{E}[Y_{i1}(1) - Y_{i1}(0) \\mid G_i = 1]$) holds if and only if the **Parallel Trends Assumption** is satisfied:\n\n$$\n\\mathbb{E}[Y_{i1}(0) - Y_{i0}(0) \\mid G_i = 1] = \\mathbb{E}[Y_{i1}(0) - Y_{i0}(0) \\mid G_i = 0]\n$$\n\n* $Y_{it}$: Observed scalar outcome for observation $i$ at time period $t$.\n* $G_i \\in \\{0, 1\\}$: Binary treatment group indicator ($1$ for treated group, $0$ for untreated control group).\n* $T_t \\in \\{0, 1\\}$: Binary time indicator ($1$ for post-treatment observation, $0$ for pre-treatment baseline).\n* $\\bar{Y}_{g, t}$: Conditional population mean of the outcome for group $g$ in period $t$.\n* $\\beta_0$: Expected baseline level of the control group prior to treatment ($\\bar{Y}_{0, 0}$).\n* $\\beta_1$: Permanent baseline divergence between treated and control groups prior to treatment ($\\bar{Y}_{1, 0} - \\bar{Y}_{0, 0}$).\n* $\\beta_2$: Common macroeconomic or secular time trend experienced by the control group ($\\bar{Y}_{0, 1} - \\bar{Y}_{0, 0}$).\n* $\\delta \\equiv \\tau_{\\text{ATT}}$: Difference-in-Differences interaction coefficient quantifying the causal Average Treatment Effect on the Treated.\n* $\\mathbb{E}[Y_{i1}(0) \\mid G_i = 1]$: The unobservable counterfactual path—what would have happened to the treated group in period 1 had the policy never been introduced.\n\nImplement the canonical $2 \\times 2$ Difference-in-Differences estimation engine in NumPy. You will:\n1. Compute the four group-by-period cell means ($\\bar{Y}_{1,1}, \\bar{Y}_{1,0}, \\bar{Y}_{0,1}, \\bar{Y}_{0,0}$).\n2. Calculate the sample double difference $\\hat{\\delta}_{\\text{DiD}}$ and the imputed counterfactual level.\n3. Construct the design matrix $\\mathbf{X} = [\\mathbf{1}, \\mathbf{G}, \\mathbf{T}, \\mathbf{G} \\odot \\mathbf{T}]$ and fit the OLS regression to confirm algebraic equivalence.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-difference-in-differences-2x2",
          "starterCode": "def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    treat : np.ndarray of shape (N,)\n        Binary treatment group indicator (1 = Treated, 0 = Control).\n    post : np.ndarray of shape (N,)\n        Binary post-period indicator (1 = Post-treatment, 0 = Pre-treatment).\n        \n    Returns\n    -------\n    dict with keys:\n        'delta_did': Sample 2x2 difference-in-differences estimate.\n        'beta_interaction': Interaction coefficient from OLS regression [1, treat, post, treat*post].\n        'counterfactual': Unobserved counterfactual level for treated group in post period.\n    \"\"\"\n    # Step 1: Compute 4 group-period cell means: y11, y10, y01, y00\n    # Step 2: Compute double difference and counterfactual trajectory\n    # Step 3: OLS regression: Y = beta_0 + beta_1*treat + beta_2*post + delta*(treat*post)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    treat : np.ndarray of shape (N,)\n        Binary treatment group indicator (1 = Treated, 0 = Control).\n    post : np.ndarray of shape (N,)\n        Binary post-period indicator (1 = Post-treatment, 0 = Pre-treatment).\n        \n    Returns\n    -------\n    dict with keys:\n        'delta_did': Sample 2x2 difference-in-differences estimate.\n        'beta_interaction': Interaction coefficient from OLS regression [1, treat, post, treat*post].\n        'counterfactual': Unobserved counterfactual level for treated group in post period.\n    \"\"\"\n    # Step 1: Compute 4 group-period cell means: y11, y10, y01, y00\n    # Step 2: Compute double difference and counterfactual trajectory\n    # Step 3: OLS regression: Y = beta_0 + beta_1*treat + beta_2*post + delta*(treat*post)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "4.0, 12.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcomes.\n    treat : np.ndarray of shape (N,)\n        Binary treatment group indicator (1 = Treated, 0 = Control).\n    post : np.ndarray of shape (N,)\n        Binary post-period indicator (1 = Post-treatment, 0 = Pre-treatment).\n        \n    Returns\n    -------\n    dict with keys:\n        'delta_did': Sample 2x2 difference-in-differences estimate.\n        'beta_interaction': Interaction coefficient from OLS regression [1, treat, post, treat*post].\n        'counterfactual': Unobserved counterfactual level for treated group in post period.\n    \"\"\"\n    # Step 1: Compute 4 group-period cell means: y11, y10, y01, y00\n    y11 = float(np.mean(y[(treat == 1) & (post == 1)]))\n    y10 = float(np.mean(y[(treat == 1) & (post == 0)]))\n    y01 = float(np.mean(y[(treat == 0) & (post == 1)]))\n    y00 = float(np.mean(y[(treat == 0) & (post == 0)]))\n    \n    # Step 2: Compute double difference and counterfactual trajectory\n    delta_did = (y11 - y10) - (y01 - y00)\n    counterfactual = y10 + (y01 - y00)\n    \n    # Step 3: OLS regression: Y = beta_0 + beta_1*treat + beta_2*post + delta*(treat*post)\n    X = np.column_stack([np.ones_like(y), treat, post, treat * post])\n    beta_reg = np.linalg.solve(X.T @ X, X.T @ y)\n    \n    return {\n        \"delta_did\": delta_did,\n        \"beta_interaction\": float(beta_reg[3]),\n        \"counterfactual\": counterfactual,\n    }"
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
      "en": "In real-world policy rollouts, major reforms virtually never hit all jurisdictions simultaneously.",
      "ar": "في التطبيقات الواقعية للسياسات الاقتصادية والاجتماعية، تكاد تنعدم الإصلاحات التي تُطبق في جميع المناطق في وقت واحد."
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
          "en": "In real-world policy rollouts, major reforms virtually never hit all jurisdictions simultaneously. California passes a paid family leave law in 2004; New Jersey follows in 2009; New York enacts it in 2018. This staggered, multi-cohort rollout has long been the hallmark of applied policy evaluation. For over thirty years, thousands of published papers evaluated such policies by estimating a **Two-Way Fixed Effects (TWFE)** regression with unit fixed effects ($\\alpha_i$) and calendar time fixed effects ($\\lambda_t$). Econometricians believed this was simply generalizing the $2 \\times 2$ DiD estimator to multiple periods.\n\nBetween 2018 and 2021, an econometric earthquake shattered this belief. Groundbreaking work by Goodman-Bacon (2021), Callaway & Sant'Anna (2021), and Sun & Abraham (2021) demonstrated that classical TWFE is fundamentally broken in the presence of dynamic, heterogeneous treatment effects. The regression does not just compare treated units to untreated units—it actively performs **\"forbidden comparisons\"** by using units that were treated *earlier* as the control group for units treated *later*.\n\nConsider a clinical trial analogy: imagine testing an anti-inflammatory drug whose healing benefits grow steadily over time. Patient A began the therapy two years ago; their inflammation has dropped dramatically and is now stabilized at a healthy low level. Patient B begins the therapy today. If you evaluate Patient B's progress by subtracting Patient A's trajectory from Patient B's trajectory, what happens? Because Patient A's inflammation is no longer dropping (their treatment effect has already matured and plateaued), Patient A's flat trajectory acts like a zero baseline. Worse yet, if Patient A experiences any slight regression to the mean, subtracting Patient A's trajectory from Patient B's can flip the mathematical sign of the estimate completely! The math functions like an **inverted photographic negative**: a life-saving drug that helps every single patient can produce a strictly negative regression coefficient in TWFE.\n\nThe modern solution, spearheaded by Brantly Callaway and Pedro Sant'Anna (2021), resolves this catastrophe by decomposing the problem into clean, unpolluted building blocks: **Group-Time Average Treatment Effects ($ATT(g, t)$)**. Instead of pooling everyone into a single contaminated regression, we analyze each treatment cohort $g$ (units first treated in year $g$) separately at calendar time $t$. We strictly forbid using already-treated units as controls, comparing cohort $g$ only against units that are **never treated** or **not-yet-treated**. Furthermore, the baseline is always cleanly anchored at period $g - 1$ (the exact year before that cohort received treatment). Only after computing these clean pairwise comparisons do we aggregate them into an interpretable event-study plot.",
          "ar": "في التطبيقات الواقعية للسياسات الاقتصادية والاجتماعية، تكاد تنعدم الإصلاحات التي تُطبق في جميع المناطق في وقت واحد. فالسياسات الكبرى—كتشريعات إجازات الأمومة مدفوعة الأجر أو برامج التأمين الصحي أو تعديل الحد الأدنى للأجور—تُعتمد عادةً عبر موجات متتابعة زمنياً: ولاية تتبناها في عام 2010، وأخرى في 2014، وثالثة في 2018. ولأكثر من ثلاثة عقود، دأب الباحثون على استخدام انحدار الآثار الثابتة ثنائي الاتجاه (TWFE) لتقدير الأثر الإجمالي للسياسة، ظناً منهم أن هذا النموذج يعمم أسلوب DiD الكلاسيكي بسلاسة وبلا أدنى مشكلة.\n\nبين عامي 2018 و2021، عصفت بعلم القياس الاقتصادي ثورة منهجية كبرى قلبت موازين البحث التجريبي. أثبتت أبحاث غودمان-بيكون (2021) وكالاواي وسانت آنا (2021) وسان وأبراهام (2021) أن نموذج TWFE الكلاسيكي يعاني من خلل حسابي مدمر عند تباين آثار المعالجة عبر الزمن؛ إذ لا يكتفي النموذج بمقارنة المعالجين بغير المعالجين، بل يجري **\"مقارنات محظورة\" (Forbidden Comparisons)** يستخدم فيها الأفواج التي عولجت *مبكراً* كمجموعات ضابطة للأفواج التي عولجت *لاحقاً*!\n\nلتوضيح هذا الخطر، تخيل تجربة طبية لدواء ينمو أثره العلاجي مع الوقت. المريض (أ) تلقى العلاج منذ سنتين؛ وقد تعافى بالفعل واستقرت حالته الصحية عند مستوى ممتاز. والمريض (ب) يبدأ العلاج اليوم. فإذا أردت تقييم تحسن المريض (ب) بمقارنته بمسار المريض (أ)، فإنك تستخدم مريضاً عولج بالفعل كمجموعة ضابطة! وبما أن الأثر العلاجي للمريض (أ) قد تشبع ولم يعد يطرأ عليه تحسن إضافي، فإن طرح مساره قد يلغي أثر المريض (ب)، بل قد يؤدي إلى ظهور أثر سالب وهمي تماماً كـ **نيجاتيف الصورة المقلوبة**. قد يكون الدواء مفيداً لكل المرضى دون استثناء، ومع ذلك يُخرج انحدار TWFE معامل أثر سالب وذي دلالة إحصائية!\n\nيقدم الحل الحديث لكالاواي وسانت آنا (2021) حلاً جذرياً يفكك المسألة إلى لبنات بناء نقية تُعرف باسم **متوسط أثر المعالجة للمجموعة والزمن ($ATT(g, t)$)**. فبدلاً من دمج جميع السنوات والأفواج في انحدار واحد مشوه، نحسب أثر كل فوج معالجة $g$ عند كل لحظة زمنية $t$ بمفرده. ونحظر تماماً استخدام أي فوج خضع للمعالجة مسبقاً كمجموعة ضابطة، حيث نقارن الفوج $g$ حصراً بالوحدات التي **لم تُعالج قط (Never-Treated)** أو التي **لم تُعالج بعد (Not-Yet-Treated)**. وعلاوة على ذلك، يتم تثبيت خط الأساس دائماً عند الفترة $g - 1$ السابقة للمعالجة مباشرة، ثم تُجمع هذه التقديرات النقية في دراسة حدث (Event-Study) دقيقة وموثوقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "Y_{it} = \\alpha_i + \\lambda_t + \\beta_{\\text{TWFE}} D_{it} + \\varepsilon_{it}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الفرق في الفروق التدريجي وانهيار نموذج الآثار الثابتة ثنائي الاتجاه."
        },
        "narrative": {
          "en": "where $\\alpha_i$ is an entity fixed effect, $\\lambda_t$ is a calendar period fixed effect, and $D_{it} \\in \\{0, 1\\}$ indicates active treatment status.\n\nThe celebrated **Goodman-Bacon (2021) Decomposition Theorem** proved that the OLS estimate $\\hat{\\beta}_{\\text{TWFE}}$ is an explicit weighted average of all possible $2 \\times 2$ sub-comparisons in the panel:\n\n$$\n\\hat{\\beta}_{\\text{TWFE}} = \\sum_{k \\in \\mathcal{K}_{\\text{clean}}} w_k \\hat{\\beta}_k^{\\text{clean}} + \\sum_{\\ell \\in \\mathcal{L}_{\\text{forbidden}}} w_\\ell \\hat{\\beta}_\\ell^{\\text{forbidden}}\n$$\n\nwhere clean comparisons match newly treated cohorts to never-treated or not-yet-treated units, but forbidden comparisons match newly treated cohorts against earlier-treated cohorts. In the presence of treatment effect dynamics (where the causal effect $\\tau_{it}$ grows or decays over time), the implicit weights $w_\\ell$ can become negative:\n\n$$\nw_\\ell < 0 \\implies \\hat{\\beta}_{\\text{TWFE}} < 0 \\quad \\text{even when } \\tau_{it} > 0 \\quad \\forall i, t\n$$\n\nTo eliminate this contamination, **Callaway and Sant'Anna (2021)** define the **Group-Time Average Treatment Effect**, $ATT(g, t)$, for units first treated in cohort $g$ observed at calendar time $t$:\n\n$$\nATT(g, t) \\equiv \\mathbb{E}\\left[Y_{it}(g) - Y_{it}(0) \\mid G_i = g\\right]\n$$\n\nLet $C_i \\in \\{0, 1\\}$ denote a clean comparison group (either units that never adopt treatment during the sample window, or units not yet treated by time $t$ such that $D_{is} = 0$ for all $s \\le t$). Anchoring the baseline strictly at the pre-treatment period $g - 1$:\n\n$$\n\\widehat{ATT}(g, t) = \\mathbb{E}\\left[Y_{it} - Y_{i, g-1} \\mid G_i = g\\right] - \\mathbb{E}\\left[Y_{it} - Y_{i, g-1} \\mid C_i = 1\\right]\n$$\n\nTo evaluate dynamic treatment paths across relative event time $e = t - g$ (where $e = 0$ is the implementation period, $e > 0$ represents post-treatment exposure, and $e < 0$ tests for pre-trends), the group-time parameters are aggregated:\n\n$$\n\\widehat{ATT}(e) = \\sum_{g} w(g, e) \\widehat{ATT}(g, g + e), \\quad \\text{subject to } \\sum_{g} w(g, e) = 1\n$$\n\nwhere the weights $w(g, e)$ are proportional to the cohort sample size $N_g$ among cohorts observable at event time $e$.\n\n* $Y_{it}$: Observed outcome of entity $i$ at calendar period $t$.\n* $\\alpha_i, \\lambda_t$: Entity and calendar-time fixed effects controlling for permanent unobserved heterogeneity and universal secular shocks.\n* $D_{it} \\in \\{0, 1\\}$: Binary treatment indicator ($D_{it} = 1$ if unit $i$ is actively treated at time $t$, $0$ otherwise).\n* $G_i \\in \\{1, \\dots, T\\} \\cup \\{\\infty\\}$: Cohort identifier indicating the exact adoption period when unit $i$ first received treatment ($G_i = \\infty$ denotes never-treated units).\n* $\\beta_{\\text{TWFE}}$: The single scalar pooled coefficient estimated by traditional two-way fixed effects regression.\n* $ATT(g, t)$: The causal average treatment effect on the cohort first treated at time $g$, evaluated at calendar time $t$.\n* $g - 1$: The critical pre-treatment reference period immediately preceding treatment adoption, used to anchor all baseline changes.\n* $C_i$: Clean comparison indicator selecting strictly never-treated or not-yet-treated observations.\n* $e = t - g$: Relative event time (lead or lag), measuring elapsed time relative to initial policy implementation.\n\nImplement the core Callaway-Sant'Anna cohort-time average treatment effect estimator $\\widehat{ATT}(g, t)$ in NumPy. You will:\n1. Identify the reference baseline period $g - 1$ for the target adoption cohort.\n2. Compute the pre-to-post change in average outcomes for the target treated cohort: $\\Delta \\bar{Y}_{\\text{treated}} = \\bar{Y}_{g, t} - \\bar{Y}_{g, g-1}$.\n3. Compute the corresponding change over the exact same time window for the clean never-treated comparison group: $\\Delta \\bar{Y}_{\\text{control}} = \\bar{Y}_{C, t} - \\bar{Y}_{C, g-1}$.\n4. Subtract the control change from the treated change to return the clean, unpolluted $\\widehat{ATT}(g, t)$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-staggered-did-callaway-santanna",
          "starterCode": "def compute_group_time_att(\n    y: np.ndarray,\n    group: np.ndarray,\n    time: np.ndarray,\n    target_g: int,\n    target_t: int,\n    never_treated_val: int = 0\n) -> float:\n    \"\"\"\n    Computes Callaway-Sant'Anna cohort-time average treatment effect ATT(g, t)\n    using the never-treated comparison group and pre-treatment base period g - 1.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcome values.\n    group : np.ndarray of shape (N,)\n        Treatment cohort adoption period (never_treated_val indicates never treated).\n    time : np.ndarray of shape (N,)\n        Calendar time period of observation.\n    target_g : int\n        The cohort adoption period to evaluate.\n    target_t : int\n        The calendar period of observation.\n    never_treated_val : int\n        Identifier for the never-treated comparison group.\n        \n    Returns\n    -------\n    float\n        The estimated ATT(target_g, target_t).\n    \"\"\"\n    # Step 1: Establish clean baseline period immediately prior to cohort adoption\n    # Step 2: Compute change for target treated cohort between base_period and target_t\n    # Step 3: Compute change for never-treated control units across identical period\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_group_time_att(\n    y: np.ndarray,\n    group: np.ndarray,\n    time: np.ndarray,\n    target_g: int,\n    target_t: int,\n    never_treated_val: int = 0\n) -> float:\n    \"\"\"\n    Computes Callaway-Sant'Anna cohort-time average treatment effect ATT(g, t)\n    using the never-treated comparison group and pre-treatment base period g - 1.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcome values.\n    group : np.ndarray of shape (N,)\n        Treatment cohort adoption period (never_treated_val indicates never treated).\n    time : np.ndarray of shape (N,)\n        Calendar time period of observation.\n    target_g : int\n        The cohort adoption period to evaluate.\n    target_t : int\n        The calendar period of observation.\n    never_treated_val : int\n        Identifier for the never-treated comparison group.\n        \n    Returns\n    -------\n    float\n        The estimated ATT(target_g, target_t).\n    \"\"\"\n    # Step 1: Establish clean baseline period immediately prior to cohort adoption\n    # Step 2: Compute change for target treated cohort between base_period and target_t\n    # Step 3: Compute change for never-treated control units across identical period\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_group_time_att(\n    y: np.ndarray,\n    group: np.ndarray,\n    time: np.ndarray,\n    target_g: int,\n    target_t: int,\n    never_treated_val: int = 0\n) -> float:\n    \"\"\"\n    Computes Callaway-Sant'Anna cohort-time average treatment effect ATT(g, t)\n    using the never-treated comparison group and pre-treatment base period g - 1.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcome values.\n    group : np.ndarray of shape (N,)\n        Treatment cohort adoption period (never_treated_val indicates never treated).\n    time : np.ndarray of shape (N,)\n        Calendar time period of observation.\n    target_g : int\n        The cohort adoption period to evaluate.\n    target_t : int\n        The calendar period of observation.\n    never_treated_val : int\n        Identifier for the never-treated comparison group.\n        \n    Returns\n    -------\n    float\n        The estimated ATT(target_g, target_t).\n    \"\"\"\n    # Step 1: Establish clean baseline period immediately prior to cohort adoption\n    base_period = target_g - 1\n    \n    # Step 2: Compute change for target treated cohort between base_period and target_t\n    treated_post = y[(group == target_g) & (time == target_t)]\n    treated_pre = y[(group == target_g) & (time == base_period)]\n    delta_treated = float(np.mean(treated_post) - np.mean(treated_pre))\n    \n    # Step 3: Compute change for never-treated control units across identical period\n    control_post = y[(group == never_treated_val) & (time == target_t)]\n    control_pre = y[(group == never_treated_val) & (time == base_period)]\n    delta_control = float(np.mean(control_post) - np.mean(control_pre))\n    \n    # Step 4: Clean difference-in-differences isolating ATT(g, t)\n    return float(delta_treated - delta_control)"
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
      "en": "Imagine a high-stakes mayoral election decided by a microscopic margin: Candidate A wins $50.",
      "ar": "في البيانات الواقعية، نادراً ما يحصل الأفراد أو المناطق على السياسات الحكومية أو المزايا الاقتصادية بشكل عشوائي؛ فالأسر الثرية تشتري..."
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
          "en": "Imagine a high-stakes mayoral election decided by a microscopic margin: Candidate A wins $50.001\\%$ of the vote, while Candidate B finishes with $49.999\\%$. In the grand scheme of politics, the electorate of a city that voted $50.001\\%$ for Candidate A is virtually identical in demographics, economic health, ideological preferences, and voter anger to an electorate that voted $49.999\\%$. A single gust of rain in one precinct could have flipped the outcome. Yet the institutional rules enforce an absolute, non-negotiable cliff: Candidate A gains $100\\%$ of mayoral executive authority, while Candidate B receives $0\\%$.\n\nNature has effectively engineered a localized **Randomized Controlled Trial** right at the threshold! Comparing cities where a party won by a landslide ($80\\%$ vs $20\\%$) would hopelessly confound the political party's governance with deep ideological differences. But in a razor-thin photo-finish, whether a city barely lands above or below the $50\\%$ cutoff is essentially determined by idiosyncratic test-day noise. Any discontinuous, vertical leap in downstream outcomes—such as municipal bond yields or infrastructure spending—observed immediately at the threshold can be decisively attributed to the winner's party rather than baseline municipal characteristics.\n\nThis is the foundational genius of the **Sharp Regression Discontinuity Design (SRDD)**. In observational data, people rarely receive policy interventions at random: affluent families buy tutoring, ambitious entrepreneurs apply for startup accelerators, and vulnerable patients seek clinical treatments. SRDD bypasses confounding by exploiting strict administrative assignment rules: treatment status switches deterministically from $0$ to $1$ the instant an observable, continuous index—known as the **running (or forcing) variable**—crosses a rigid administrative cutoff $c$.\n\nTo estimate this causal jump cleanly, modern econometric practice relies on **Local Linear Regression** within a narrow bandwidth $h$ around the cutoff. Why local linear rather than fitting a curvy high-order global polynomial? Global polynomials suffer from Runge's phenomenon: distant observations (like an election won with $90\\%$ of the vote) exert extreme mathematical leverage, flexing the curve near the boundary and creating illusory, fake discontinuities out of thin air. By fitting separate straight lines weighted by a triangular kernel on either side of the cutoff, we zoom in on the true local causal jump.",
          "ar": "في البيانات الواقعية، نادراً ما يحصل الأفراد أو المناطق على السياسات الحكومية أو المزايا الاقتصادية بشكل عشوائي؛ فالأسر الثرية تشتري تعليماً خاصاً، والشركات الكبرى توظف أمهر المحامين للحصول على الإعفاءات الضريبية. يتجاوز **تصميم انقطاع الانحدار الحاد (Sharp RDD)** معضلة انحياز الاختيار عبر استغلال القواعد المؤسسية الصارمة: حيث يتغير وضع المعالجة بشكل حتمي وقاطع من صفر إلى واحد بمجرد أن يتجاوز متغير مستمر—يسمى **المتغير الحاكم أو الجاري (Running/Forcing Variable)**—عتبة إدارية فاصلة $c$.\n\nتخيل انتخابات بلدية حُسمت بفارق ضئيل جداً: نال المرشح (أ) نسبة 50.001% من الأصوات، بينما نال منافسه 49.999%. من الناحية الديموغرافية والاجتماعية والاقتصادية، فإن الناخبين في هذه المدينة متطابقون تماماً مع ناخبي مدينة مجاورة خسر فيها المرشح بفارق صوتين. كان هطول زخات مطر خفيفة في أحد الأحياء كفيلاً بقلب النتيجة! لقد أقامت الطبيعة تجربة عشوائية محكمة عند العتبة تماماً؛ فالمرشح الفائز يحصل على 100% من صلاحيات المنصب التنفيذي، بينما لا ينال الخاسر شيئاً. وأي قفزة فجائية في الأداء المالي للمدينة بعد الانتخابات تُعزى بالكامل إلى الحزب الفائز، لا إلى الفروق الأولية بين المدن.\n\nلتقدير هذه القفزة السببية بدقة، تعتمد الممارسة الإحصائية الحديثة على **الانحدار الخطي الموضعي (Local Linear Regression)** داخل نافذة ضيقة تُعرف بعرض النطاق الترددي $h$ حول العتبة. ولماذا نفضل الخطوط المستقيمة الموضعية على المعادلات الحدودية العامة ذات الدرجات العالية؟ لأن الحدوديات العامة تعاني من ظاهرة رونغ (Runge's Phenomenon): فالنقاط البعيدة جداً عن العتبة تفرض عزماً رافعاً شديداً على طرفي المنحنى، مما يؤدي إلى تذبذبات كاذبة تخلق قفزات وهمية غير حقيقية عند العتبة. وباستخدام انحدار خطي موضعي مرجح بنواة مثلثة تركز على النقاط القريبة من العتبة، نعزل الأثر السببي الحقيقي بثبات وأمان."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "D_i = \\mathbb{I}(X_i \\ge c) = \\begin{cases} 1 & \\text{if } X_i \\ge c \\\\ 0 & \\text{if } X_i < c \\end{cases}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي."
        },
        "narrative": {
          "en": "Under the fundamental identifying assumption that the potential outcome conditional expectations $\\mathbb{E}[Y_i(0) \\mid X_i = x]$ and $\\mathbb{E}[Y_i(1) \\mid X_i = x]$ are continuous in $x$ at $x = c$, the average causal treatment effect at the cutoff is non-parametrically identified by the difference between two one-sided boundary limits:\n\n$$\n\\tau_{\\text{SRD}} = \\lim_{x \\downarrow c} \\mathbb{E}[Y_i \\mid X_i = x] - \\lim_{x \\uparrow c} \\mathbb{E}[Y_i \\mid X_i = x]\n$$\n\nTo estimate $\\tau_{\\text{SRD}}$ without boundary bias, we estimate a **Local Linear Regression** within an optimal bandwidth $h > 0$ around the centered running variable $\\tilde{X}_i \\equiv X_i - c$, solving the kernel-weighted least squares optimization problem:\n\n$$\n\\min_{\\alpha, \\tau, \\beta_0, \\beta_1} \\sum_{i: |X_i - c| \\le h} \\left[ Y_i - \\alpha - \\tau D_i - \\beta_0 (X_i - c) - \\beta_1 D_i(X_i - c) \\right]^2 K\\left(\\frac{X_i - c}{h}\\right)\n$$\n\nwhere:\n- $\\alpha$: Intercept of the control outcome regression line approaching the cutoff from the left ($\\lim_{x \\uparrow c} \\mathbb{E}[Y(0) \\mid X = x]$).\n- $\\tau$: The sharp causal vertical jump at the cutoff ($\\tau_{\\text{SRD}}$).\n- $\\alpha + \\tau$: Outcome level approaching the cutoff from the treated right ($\\lim_{x \\downarrow c} \\mathbb{E}[Y(1) \\mid X = x]$).\n- $\\beta_0$: Local slope of the regression function to the left of the cutoff.\n- $\\beta_0 + \\beta_1$: Local slope of the regression function to the right of the cutoff.\n- $K(u) = (1 - |u|) \\cdot \\mathbb{I}(|u| \\le 1)$: The standard triangular kernel weighting function, which places maximal weight on observations closest to the cutoff and tapers linearly to zero at the bandwidth frontier $|X_i - c| = h$.\n\n* $X_i$: Observable continuous running (or forcing) variable used to determine institutional eligibility.\n* $c$: The strict administrative threshold or eligibility cutoff point.\n* $D_i \\in \\{0, 1\\}$: Deterministic binary treatment assignment indicator ($D_i = 1$ if $X_i \\ge c$, $0$ otherwise).\n* $Y_i$: Observed continuous or binary outcome of interest.\n* $Y_i(1), Y_i(0)$: Potential outcomes for unit $i$ under treatment and control states.\n* $\\tau_{\\text{SRD}}$: Sharp regression discontinuity causal estimand evaluated locally at $X = c$.\n* $h$: Bandwidth parameter governing the trade-off between bias (narrow $h$, closer to the cutoff) and variance (wide $h$, more sample observations).\n* $K(u)$: Kernel weighting function ensuring boundary stability and non-parametric convergence.\n\nImplement a local linear regression estimator for Sharp RDD with a triangular weighting kernel in NumPy. You will:\n1. Filter the sample to include only observations falling within the local bandwidth window $[c - h, c + h]$.\n2. Compute the centered running variable $\\tilde{X}_i = X_i - c$ and the treatment indicator $D_i = \\mathbb{I}(X_i \\ge c)$.\n3. Construct the triangular kernel weight vector $w_i = 1 - \\frac{|X_i - c|}{h}$ and assemble the diagonal weight matrix $\\mathbf{W}$.\n4. Construct the local design matrix $\\mathbf{M} = [\\mathbf{1}, \\mathbf{D}, \\tilde{\\mathbf{X}}, \\mathbf{D} \\odot \\tilde{\\mathbf{X}}]$.\n5. Solve the weighted least squares normal equations $(\\mathbf{M}^T \\mathbf{W} \\mathbf{M}) \\hat{\\boldsymbol{\\theta}} = \\mathbf{M}^T \\mathbf{W} \\mathbf{y}$ to isolate the treatment discontinuity $\\tau = \\hat{\\theta}_1$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-regression-discontinuity-sharp",
          "starterCode": "def fit_sharp_rdd_local_linear(\n    x: np.ndarray,\n    y: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD with a triangular kernel.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (N,)\n        Continuous running variable.\n    y : np.ndarray of shape (N,)\n        Observed outcome variable.\n    cutoff : float\n        Institutional threshold c.\n    bandwidth : float\n        Half-width of the local estimation window h.\n        \n    Returns\n    -------\n    dict with keys:\n        'tau': Treatment effect jump at the cutoff.\n        'alpha_left': Estimated limit from the left (control counterfactual at cutoff).\n        'alpha_right': Estimated limit from the right (treated outcome at cutoff).\n    \"\"\"\n    # Step 1: Filter to observations within local window [cutoff - h, cutoff + h]\n    # Step 2: Center running variable at cutoff and construct treatment indicator\n    # Step 3: Compute triangular kernel weights: K(u) = 1 - |u| for |u| <= 1\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_sharp_rdd_local_linear(\n    x: np.ndarray,\n    y: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD with a triangular kernel.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (N,)\n        Continuous running variable.\n    y : np.ndarray of shape (N,)\n        Observed outcome variable.\n    cutoff : float\n        Institutional threshold c.\n    bandwidth : float\n        Half-width of the local estimation window h.\n        \n    Returns\n    -------\n    dict with keys:\n        'tau': Treatment effect jump at the cutoff.\n        'alpha_left': Estimated limit from the left (control counterfactual at cutoff).\n        'alpha_right': Estimated limit from the right (treated outcome at cutoff).\n    \"\"\"\n    # Step 1: Filter to observations within local window [cutoff - h, cutoff + h]\n    # Step 2: Center running variable at cutoff and construct treatment indicator\n    # Step 3: Compute triangular kernel weights: K(u) = 1 - |u| for |u| <= 1\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "10.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_sharp_rdd_local_linear(\n    x: np.ndarray,\n    y: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD with a triangular kernel.\n    \n    Parameters\n    ----------\n    x : np.ndarray of shape (N,)\n        Continuous running variable.\n    y : np.ndarray of shape (N,)\n        Observed outcome variable.\n    cutoff : float\n        Institutional threshold c.\n    bandwidth : float\n        Half-width of the local estimation window h.\n        \n    Returns\n    -------\n    dict with keys:\n        'tau': Treatment effect jump at the cutoff.\n        'alpha_left': Estimated limit from the left (control counterfactual at cutoff).\n        'alpha_right': Estimated limit from the right (treated outcome at cutoff).\n    \"\"\"\n    # Step 1: Filter to observations within local window [cutoff - h, cutoff + h]\n    mask = (x >= cutoff - bandwidth) & (x <= cutoff + bandwidth)\n    x_sub = x[mask]\n    y_sub = y[mask]\n    \n    # Step 2: Center running variable at cutoff and construct treatment indicator\n    x_centered = x_sub - cutoff\n    d = (x_sub >= cutoff).astype(float)\n    \n    # Step 3: Compute triangular kernel weights: K(u) = 1 - |u| for |u| <= 1\n    u = np.abs(x_centered) / bandwidth\n    weights = 1.0 - u\n    W = np.diag(weights)\n    \n    # Step 4: Build design matrix: [1, D, (X - c), D*(X - c)]\n    X_mat = np.column_stack([\n        np.ones_like(x_centered),\n        d,\n        x_centered,\n        d * x_centered\n    ])\n    \n    # Step 5: Solve Weighted Least Squares: beta = (X^T W X)^(-1) X^T W y\n    XtWX = X_mat.T @ W @ X_mat\n    XtWy = X_mat.T @ W @ y_sub\n    beta = np.linalg.solve(XtWX, XtWy)\n    \n    alpha_left = float(beta[0])\n    tau = float(beta[1])\n    alpha_right = alpha_left + tau\n    \n    return {\n        \"tau\": tau,\n        \"alpha_left\": alpha_left,\n        \"alpha_right\": alpha_right,\n    }"
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
      "en": "In an ideal institutional laboratory, rules are executed with robotic perfection: cross the cutoff, and you receive treatment with $100\\%$...",
      "ar": "في الأنظمة الإدارية المثالية، تُطبق اللوائح بصرامة تامة: من يتجاوز العتبة يحصل على المعالجة حتماً بنسبة 100%، ومن يقل عنها يُحرم منها بنسبة..."
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
          "en": "In an ideal institutional laboratory, rules are executed with robotic perfection: cross the cutoff, and you receive treatment with $100\\%$ certainty; miss it by a fraction of a millimeter, and you receive $0\\%$. In real human institutions, however, compliance is rarely deterministic. Administrative thresholds frequently generate an **entitlement, voucher, or strong nudge**, but human beings retain free will. Some qualified individuals decline the benefit, while some who fell short successfully lobby administrators for a discretionary exception.\n\nConsider an elite STEM summer fellowship. High school students scoring $90$ or above on a standardized math assessment are mailed an official invitation ($Z_i = 1$). However, several invited students decline because of conflicting family summer travel plans. Meanwhile, a handful of students scoring $88$ or $89$ file hardship appeals through their guidance counselors and secure discretionary admittance ($D_i = 1$). When you plot treatment uptake against the test score, there is no longer a crisp jump from $0$ to $1$. Instead, the probability of attending jumps abruptly from $15\\%$ immediately to the left of 90 up to $75\\%$ immediately to the right.\n\nThis is the domain of the **Fuzzy Regression Discontinuity Design (FRDD)**. Econometrically, crossing the cutoff is no longer treatment itself; rather, crossing the cutoff acts as an **Instrumental Variable (IV)** that exogenous nudges compliance upward! To calculate the true causal effect among students whose attendance was swayed by the cutoff (the **Local Average Treatment Effect, or LATE**), we take the observed vertical jump in downstream outcomes (e.g., college graduation) and divide it by the vertical jump in treatment uptake (the first-stage compliance jump). If college completion jumps by $6$ percentage points at the cutoff, but compliance only jumped by $60$ percentage points ($0.60$), the true causal impact on compliers is $6\\% / 0.60 = +10\\%$.\n\nHowever, this elegant identification rests on a razor's edge: **agents must not possess the ability to manipulate their score around the cutoff**. If math teachers know that 90 is the scholarship cutoff and generously bump students with an 89 up to 90, the students right above the threshold are no longer comparable to those below—they are students with more aggressive parents or sympathetic teachers! The **McCrary Density Test** serves as an indispensable forensic audit: it inspects the histogram density of the running variable. If the distribution displays a smooth, continuous curve, the quasi-experiment is clean. But if a towering spike of bunching appears at 90 followed by a vacant crater at 89, it exposes foul play, completely demolishing causal credibility.",
          "ar": "في الأنظمة الإدارية المثالية، تُطبق اللوائح بصرامة تامة: من يتجاوز العتبة يحصل على المعالجة حتماً بنسبة 100%، ومن يقل عنها يُحرم منها بنسبة 0%. لكن في العالم الحقيقي المعقد، نادراً ما يكون الامتثال حتمياً ومطلقاً؛ فالقواعد الإدارية غالباً ما تمنح **أهلية قانونية أو دعوة رسمية أو حافزاً مشجعاً**، مع بقاء حرية الاختيار للأفراد. يرفض بعض المؤهلين تلقي البرنامج لارتباطات أخرى، بينما ينجح بعض الراسبين في الحصول على استثناءات عبر التظلم والواسطة.\n\nتخيل منحة دراسية في معسكر صيفي للموهوبين: يحصل الطلاب الذين نالوا 90 درجة فما فوق في اختبار الرياضيات على بطاقة دعوة ($Z_i = 1$). لكن بعض هؤلاء يعتذرون عن الحضور بسبب السفر العائلي. وفي المقابل، يتقدم بعض الطلاب الحاصلين على 88 أو 89 بالتماسات خاصة لإدارات مدارسهم ويتم قبولهم استثنائياً ($D_i = 1$). إذا رسمنا نسبة الحضور الفعلي مقابل درجات الاختبار، فلن نرى قفزة حادة من 0 إلى 1، بل سنشهد قفزة مفاجئة في \"احتمالية\" الحضور: حيث ترتفع من 15% مباشرة قبل 90 إلى 75% مباشرة بعدها.\n\nهذا هو جوهر **تصميم انقطاع الانحدار الضبابي (Fuzzy RDD)**. من الناحية القياسية، لم يعد تجاوز العتبة هو المعالجة نفسها، بل أصبح تجاوز العتبة بمثابة **متغير أداة خارجي (Instrumental Variable)** يدفع احتمالية الامتثال للأعلى! ولاستعادة الأثر السببي الصافي للممتثلين (LATE)، نقسم القفزة الملاحظة في النتائج (المرحلة المختزلة) على القفزة الملاحظة في نسبة الامتثال (المرحلة الأولى). فإذا ارتفعت معدلات التخرج الجامعي بمقدار 6% عند العتبة، بينما ارتفعت نسبة الحضور الفعلي بمقدار 60% فقط، فإن الأثر الحقيقي للمعسكر على الممتثلين هو $6\\% / 0.60 = +10\\%$.\n\nغير أن هذا البناء الرياضي ينهار تماماً إذا كان بإمكان الأفراد **التلاعب بدرجاتهم والتسلل فوق العتبة (Strategic Sorting)**. فلو علم المعلمون أن 90 هي عتبة المنحة، وقاموا بتعديل درجات 89 إلى 90 بدافع الشفقة، لم يعد الطلاب فوق العتبة متطابقين مع زملائهم تحتها! هنا يأتي **اختبار مككراري للكثافة (McCrary Density Test)** كمدقق جنائي صارم: يفحص منحنى الكثافة الاحتمالية للمتغير؛ فإن كان المنحنى أملساً ومستمراً ثبتت سلامة التجربة، وإن ظهر تكدس فجائي غير طبيعي عند 90 مع فجوة فارغة عند 89، دل ذلك على تلاعب فاضح يبطل الاستدلال السببي بالكامل."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\lim_{x \\downarrow c} \\mathbb{P}(D_i = 1 \\mid X_i = x) \\ne \\lim_{x \\uparrow c} \\mathbb{P}(D_i = 1 \\mid X_i = x)",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Fuzzy RDD & McCrary Density Sorting Diagnostic.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تصميم انقطاع الانحدار الضبابي واختبار مككراري لتشخيص التلاعب بالعتبة."
        },
        "narrative": {
          "en": "Define the threshold crossing eligibility indicator as the instrument: $Z_i = \\mathbb{I}(X_i \\ge c)$.\n\nThe Fuzzy RDD estimand is the ratio of two local boundary discontinuities, equivalent to the **Local Wald Instrumental Variables Estimator** at the boundary:\n\n$$\n\\tau_{\\text{FRD}} = \\frac{\\lim_{x \\downarrow c} \\mathbb{E}[Y_i \\mid X_i = x] - \\lim_{x \\uparrow c} \\mathbb{E}[Y_i \\mid X_i = x]}{\\lim_{x \\downarrow c} \\mathbb{E}[D_i \\mid X_i = x] - \\lim_{x \\uparrow c} \\mathbb{E}[D_i \\mid X_i = x]} = \\frac{\\Delta \\mathbb{E}[Y \\mid X = c]}{\\Delta \\mathbb{E}[D \\mid X = c]}\n$$\n\nUnder the monotonicity assumption (the cutoff encourages but never discourages treatment take-up, ruling out Defiers), $\\tau_{\\text{FRD}}$ identifies the **Local Average Treatment Effect (LATE)** for Compliers at the cutoff:\n\n$$\n\\tau_{\\text{FRD}} = \\mathbb{E}\\left[Y_i(1) - Y_i(0) \\mid \\text{Unit } i \\text{ is a Complier at } X_i = c\\right]\n$$\n\n### The McCrary (2008) Density Diagnostic\nTo test the core identifying assumption of local random assignment (absence of precise sorting around the threshold), Justin McCrary (2008) introduced an estimator for the log-difference in the marginal probability density function $f(x)$ of the running variable $X$ at cutoff $c$:\n\n$$\n\\theta \\equiv \\ln \\left( \\lim_{x \\downarrow c} f(x) \\right) - \\ln \\left( \\lim_{x \\uparrow c} f(x) \\right)\n$$\n\nWe test the null hypothesis of continuity against the alternative of sorting/manipulation:\n\n$$\nH_0: \\theta = 0 \\quad \\text{vs} \\quad H_1: \\theta \\ne 0\n$$\n\nA statistically significant log-density gap ($\\hat{\\theta} \\ne 0$) rejects $H_0$ and indicates that agents strategically clustered or manipulated their score to land immediately on the desired side of the threshold, violating exchangeability.\n\n* $X_i$: Continuous running variable determining eligibility.\n* $c$: Administrative threshold or eligibility cutoff.\n* $Z_i = \\mathbb{I}(X_i \\ge c)$: Binary eligibility instrument indicating threshold passage.\n* $D_i \\in \\{0, 1\\}$: Actual endogenous treatment uptake or program participation.\n* $Y_i$: Observed outcome variable.\n* $\\Delta \\mathbb{E}[Y \\mid X = c]$: Reduced-form outcome discontinuity at the cutoff (numerator).\n* $\\Delta \\mathbb{E}[D \\mid X = c]$: First-stage compliance discontinuity in treatment uptake at the cutoff (denominator).\n* $\\tau_{\\text{FRD}}$: Fuzzy RDD causal estimand identifying LATE for compliers located at $X = c$.\n* $f(x)$: Marginal probability density function of the running variable.\n* $\\theta$: McCrary log-density discontinuity parameter testing for strategic manipulation or bunching.\n\nImplement the Fuzzy RDD Wald ratio estimation engine using local linear regression in NumPy. You will:\n1. Filter the dataset to include observations within the bandwidth window $[c - h, c + h]$.\n2. Compute triangular kernel weights $w_i = 1 - \\frac{|X_i - c|}{h}$ and construct the diagonal weight matrix $\\mathbf{W}$.\n3. Construct the local design matrix $\\mathbf{M} = [\\mathbf{1}, \\mathbf{Z}, \\tilde{\\mathbf{X}}, \\mathbf{Z} \\odot \\tilde{\\mathbf{X}}]$, where $Z_i = \\mathbb{I}(X_i \\ge c)$.\n4. Estimate the reduced-form outcome jump: solve $(\\mathbf{M}^T \\mathbf{W} \\mathbf{M}) \\hat{\\boldsymbol{\\beta}}_y = \\mathbf{M}^T \\mathbf{W} \\mathbf{y}$ and extract $\\Delta Y = \\hat{\\beta}_{y, 1}$.\n5. Estimate the first-stage treatment uptake jump: solve $(\\mathbf{M}^T \\mathbf{W} \\mathbf{M}) \\hat{\\boldsymbol{\\beta}}_d = \\mathbf{M}^T \\mathbf{W} \\mathbf{d}$ and extract $\\Delta D = \\hat{\\beta}_{d, 1}$.\n6. Return the ratio $\\tau_{\\text{FRD}} = \\frac{\\Delta Y}{\\Delta D}$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-fuzzy-rdd-mccrary-sorting",
          "starterCode": "def compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD Wald ratio via local linear regression for reduced form and first stage.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcome values.\n    d : np.ndarray of shape (N,)\n        Observed treatment indicator or uptake fraction.\n    x : np.ndarray of shape (N,)\n        Running variable.\n    cutoff : float\n        Discontinuity cutoff c.\n    bandwidth : float\n        Local estimation window half-width h.\n        \n    Returns\n    -------\n    dict with keys:\n        'jump_y': Numerator discontinuity in outcome.\n        'jump_d': Denominator discontinuity in treatment uptake (first-stage).\n        'tau_frd': Fuzzy RDD Wald estimate (jump_y / jump_d).\n    \"\"\"\n    # Step 1: Select observations falling within local bandwidth window\n    # Step 2: Center running variable and compute triangular kernel weights\n    # Step 3: Construct local linear design matrix: [1, Z, (X-c), Z*(X-c)]\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD Wald ratio via local linear regression for reduced form and first stage.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcome values.\n    d : np.ndarray of shape (N,)\n        Observed treatment indicator or uptake fraction.\n    x : np.ndarray of shape (N,)\n        Running variable.\n    cutoff : float\n        Discontinuity cutoff c.\n    bandwidth : float\n        Local estimation window half-width h.\n        \n    Returns\n    -------\n    dict with keys:\n        'jump_y': Numerator discontinuity in outcome.\n        'jump_d': Denominator discontinuity in treatment uptake (first-stage).\n        'tau_frd': Fuzzy RDD Wald estimate (jump_y / jump_d).\n    \"\"\"\n    # Step 1: Select observations falling within local bandwidth window\n    # Step 2: Center running variable and compute triangular kernel weights\n    # Step 3: Construct local linear design matrix: [1, Z, (X-c), Z*(X-c)]\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "8.33"
            }
          },
          "solution": "import numpy as np\n\ndef compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD Wald ratio via local linear regression for reduced form and first stage.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed outcome values.\n    d : np.ndarray of shape (N,)\n        Observed treatment indicator or uptake fraction.\n    x : np.ndarray of shape (N,)\n        Running variable.\n    cutoff : float\n        Discontinuity cutoff c.\n    bandwidth : float\n        Local estimation window half-width h.\n        \n    Returns\n    -------\n    dict with keys:\n        'jump_y': Numerator discontinuity in outcome.\n        'jump_d': Denominator discontinuity in treatment uptake (first-stage).\n        'tau_frd': Fuzzy RDD Wald estimate (jump_y / jump_d).\n    \"\"\"\n    # Step 1: Select observations falling within local bandwidth window\n    mask = (x >= cutoff - bandwidth) & (x <= cutoff + bandwidth)\n    x_sub = x[mask]\n    y_sub = y[mask]\n    d_sub = d[mask]\n    \n    # Step 2: Center running variable and compute triangular kernel weights\n    x_c = x_sub - cutoff\n    z = (x_sub >= cutoff).astype(float)\n    u = np.abs(x_c) / bandwidth\n    w = 1.0 - u\n    W = np.diag(w)\n    \n    # Step 3: Construct local linear design matrix: [1, Z, (X-c), Z*(X-c)]\n    X_mat = np.column_stack([np.ones_like(x_c), z, x_c, z * x_c])\n    XtWX = X_mat.T @ W @ X_mat\n    \n    # Step 4: Estimate reduced-form outcome jump at cutoff\n    beta_y = np.linalg.solve(XtWX, X_mat.T @ W @ y_sub)\n    jump_y = float(beta_y[1])\n    \n    # Step 5: Estimate first-stage treatment take-up jump at cutoff\n    beta_d = np.linalg.solve(XtWX, X_mat.T @ W @ d_sub)\n    jump_d = float(beta_d[1])\n    \n    # Step 6: Compute Fuzzy RDD Wald ratio\n    tau_frd = jump_y / jump_d if abs(jump_d) > 1e-8 else float('nan')\n    \n    return {\n        \"jump_y\": jump_y,\n        \"jump_d\": jump_d,\n        \"tau_frd\": tau_frd,\n    }"
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
      "en": "When transformative geopolitical events, historic economic reforms, or major regional policies occur, they almost always affect a single...",
      "ar": "عندما تقع تحولات جيوسياسية كبرى أو تُقر إصلاحات اقتصادية جذرية، فإنها تؤثر في الغالب على وحدة كبرى واحدة—دولة بأكملها، أو ولاية منفردة، أو..."
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
          "en": "When transformative geopolitical events, historic economic reforms, or major regional policies occur, they almost always affect a single aggregate unit—a single nation, an entire state, or a metropolitan economy ($N=1$). In 1988, California passed Proposition 99, a groundbreaking tobacco control measure funded by an unprecedented 25-cent cigarette excise tax. In 1990, West Germany absorbed the former East Germany in a momentous reunification. In 1975, the Basque Country was plunged into decades of regional conflict. How can an empirical economist credibly evaluate the causal impact of such singular events?\n\nTraditional micro-econometric tools immediately run aground. You cannot run a randomized trial on an entire state. You cannot compare California to Texas alone (their demographic compositions, cultural attitudes, and economic climates are worlds apart). Nor can you compare California to a simple, unweighted average of the other 49 US states (such a blunt national average dilutes California's distinct pre-existing trajectory and includes states completely dissimilar to California).\n\nThe **Synthetic Control Method (SCM)**, pioneered by Alberto Abadie and co-authors (2003, 2010, 2015), solves this dilemma like a master perfumer blending an exact replica fragrance. Instead of searching for an elusive single \"twin\" state that does not exist in nature, SCM constructs an optimal **convex combination**—a bespoke, weighted cocktail—of unaffected \"donor\" states (for instance: $25\\%$ Utah, $35\\%$ Montana, and $40\\%$ Colorado). The weights are chosen algorithmically so that the synthetic twin mirrors California's pre-1988 cigarette consumption trends and economic drivers (income per capita, age distribution, retail beer consumption) with uncanny precision.\n\nOnce the policy takes effect in 1988, the synthetic twin continues to simulate what would have happened to California had Proposition 99 never been passed. Any visible post-1988 divergence between the real California and its synthetic twin cleanly isolates the causal treatment effect. Crucially, SCM restricts donor weights to the **probability simplex**: weights must be strictly non-negative ($w_j \\ge 0$) and sum to one ($\\sum w_j = 1$). Unlike standard linear regression—which extrapolates wildly into impossible fictional combinations (such as predicting a counterfactual using $-3 \\times \\text{Texas} + 4 \\times \\text{New York}$)—the simplex constraints guarantee that the synthetic twin lies strictly inside the **convex hull** of real, observable donor units.",
          "ar": "عندما تقع تحولات جيوسياسية كبرى أو تُقر إصلاحات اقتصادية جذرية، فإنها تؤثر في الغالب على وحدة كبرى واحدة—دولة بأكملها، أو ولاية منفردة، أو إقليم اقتصادي مستقل ($N=1$). في عام 1988، أقرت ولاية كاليفورنيا \"المقترح 99\"، وهو تشريع غير مسبوق لمكافحة التدخين موّلته ضريبة مبيعات بقيمة 25 سنتاً على علب السجائر. وفي عام 1990، اندمجت ألمانيا الغربية مع الشرقية في إعادة توحيد تاريخية. كيف يمكن لخبير القياس الاقتصادي تقييم الأثر السببي الصافي لمثل هذه السياسات التاريخية الاستثنائية؟\n\nتعجز أدوات الاقتصاد القياسي الكلاسيكية عن الإجابة أمام هذه الحالات؛ فلا يمكن إجراء تجربة عشوائية على ولاية كاملة، ولا يمكن مقارنة كاليفورنيا بولاية تكساس وحدها لاختلاف العوامل الثقافية والديموغرافية والضريبية، كما لا يصح مقارنتها بمتوسط الولايات الـ 49 الأخرى؛ لأن ذلك المتوسط الساذج يطمس خصوصية كاليفورنيا ومسارها التاريخي الفريد.\n\nتقدم **طريقة الشبيه الاصطناعي (Synthetic Control Method - SCM)** التي ابتكرها ألبيرتو أباديا وزملاؤه (Abadie et al.) حلاً عبقرياً يشبه عمل صانع عطور ماهر يركب عطراً مخصصاً مطابقاً للأصل. فبدلاً من البحث المستحيل عن ولاية \"توأم\" وحيدة في الطبيعة، تصنع الخوارزمية **تركيبة محدبة موزونة**—مزيجاً خاصاً—من مجموعة ولايات مانحة لم تتأثر بالسياسة (مثل: 25% يوتا، و35% مونتانا، و40% كولورادو). تُحدد هذه الأوزان حسابياً بحيث يتطابق هذا الشبيه الاصطناعي بدقة متناهية مع مسار كاليفورنيا التاريخي في استهلاك السجائر ومؤشراتها الاقتصادية والديموغرافية قبل عام 1988.\n\nوعندما يبدأ تطبيق القانون في 1988، يستمر الشبيه الاصطناعي في تمثيل السيناريو المقابل للواقع (Counterfactual)—أي ما كان سيحدث لكاليفورنيا لولا القانون. ويمثل أي انفصال بين مسار كاليفورنيا الحقيقي وتوأمها الاصطناعي الأثر السببي الحقيقي للسياسة. والسر الجوهري لـ SCM هو تقييد الأوزان داخل **فضاء البساطة الاحتمالي (Simplex)**: فالأوزان موجبة دائماً ($w_j \\ge 0$) ومجموعها يساوي واحداً تماماً ($\\sum w_j = 1$). وهذا يمنع الانحدار الخطي العادي من السقوط في فخ الاستقراء الخيالي (كالاستقراء بأوزان سالبة وهمية مثل $-3 \\times \\text{تكساس}$)، مما يضمن بقاء التوأم الاصطناعي داخل الغلاف المحدب (Convex Hull) للبيانات الحقيقية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\mathbf{W}} \\|\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W}\\|_{\\mathbf{V}}^2 = (\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W})^T \\mathbf{V} (\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W})",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for The Synthetic Control Method (Abadie et al.).",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية."
        },
        "narrative": {
          "en": "subject to the canonical **Simplex Constraints**:\n\n$$\nw_j \\ge 0 \\quad \\forall j \\in \\{2, \\dots, J+1\\} \\quad \\text{and} \\quad \\sum_{j=2}^{J+1} w_j = 1\n$$\n\nwhere $\\mathbf{V} \\in \\mathbb{R}^{K \\times K}$ is a symmetric, positive semi-definite diagonal matrix reflecting the relative predictive importance assigned to each of the $K$ covariates.\n\nThe simplex constraints enforce two foundational econometric properties:\n1. **Convex Hull Restriction ($w_j \\ge 0$):** Precludes negative weights, preventing unconstrained OLS extrapolation outside the support of the donor data.\n2. **Affine Invariance ($\\sum w_j = 1$):** Ensures the synthetic unit is a genuine weighted average, safeguarding against scale distortions.\n\nFor each post-intervention period $t \\in \\{T_0 + 1, \\dots, T\\}$, the estimated causal treatment effect on the treated unit is:\n\n$$\n\\hat{\\tau}_{1t} = Y_{1t} - \\hat{Y}_{1t}^{\\text{synthetic}} = Y_{1t} - \\sum_{j=2}^{J+1} w_j^* Y_{jt}\n$$\n\n* $j = 1$: The single aggregate unit receiving policy intervention (e.g., California, West Germany).\n* $j \\in \\{2, \\dots, J+1\\}$: Untreated donor pool of comparable units unexposed to the intervention.\n* $T_0$: Number of pre-intervention time periods observed prior to policy enactment.\n* $\\mathbf{X}_1 \\in \\mathbb{R}^{K \\times 1}$: Vector of pre-treatment characteristics and lagged outcome variables for the treated unit.\n* $\\mathbf{X}_0 \\in \\mathbb{R}^{K \\times J}$: Matrix assembling the same pre-treatment characteristics for all $J$ donor units.\n* $\\mathbf{W}^* \\in \\Delta^J$: Optimal weight vector restricted to the probability simplex ($\\sum w_j = 1$, $w_j \\ge 0$).\n* $\\mathbf{V}$: Positive semi-definite weighting matrix tuning the relative importance of predictor covariates.\n* $\\hat{Y}_{1t}^{\\text{synthetic}} = \\sum_{j=2}^{J+1} w_j^* Y_{jt}$: Synthetically constructed counterfactual outcome path.\n* $\\hat{\\tau}_{1t}$: Time-varying causal treatment effect estimated for period $t > T_0$.\n\nImplement the Synthetic Control simplex-constrained optimization routine using Projected Gradient Descent in NumPy. You will:\n1. Initialize a uniform weight vector $\\mathbf{w}_0 = [\\frac{1}{J}, \\dots, \\frac{1}{J}]^T$.\n2. In each iteration, evaluate the objective function gradient: $\\nabla_{\\mathbf{w}} f(\\mathbf{w}) = -\\mathbf{X}_0^T (\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{w})$.\n3. Take a gradient descent step: $\\mathbf{w}_{\\text{next}} = \\mathbf{w} - \\eta \\nabla f(\\mathbf{w})$.\n4. Project the updated vector back onto the probability simplex ($\\sum w_j = 1, w_j \\ge 0$) using an efficient sorting projection algorithm.\n5. Return the optimal weights and the final squared Euclidean loss $\\|\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{w}^*\\|_2^2$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-synthetic-control-method",
          "starterCode": "def fit_synthetic_control_simplex(\n    X1: np.ndarray,\n    X0: np.ndarray,\n    lr: float = 0.05,\n    max_iter: int = 500\n) -> dict[str, object]:\n    \"\"\"\n    Computes optimal Synthetic Control weights via Projected Gradient Descent on the probability simplex.\n    \n    Parameters\n    ----------\n    X1 : np.ndarray of shape (K,)\n        Predictor characteristics of the treated unit.\n    X0 : np.ndarray of shape (K, J)\n        Predictor characteristics of the J donor units.\n    lr : float\n        Learning rate for gradient steps.\n    max_iter : int\n        Maximum iterations.\n        \n    Returns\n    -------\n    dict with keys:\n        'w': Optimal non-negative weight vector summing to 1.\n        'loss': Final squared Euclidean distance ||X1 - X0 w||^2.\n    \"\"\"\n    # Step 1: Initialize weights uniformly on the simplex\n    # Step 2: Projected gradient descent loop\n    # Gradient step followed by Euclidean projection onto simplex\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_synthetic_control_simplex(\n    X1: np.ndarray,\n    X0: np.ndarray,\n    lr: float = 0.05,\n    max_iter: int = 500\n) -> dict[str, object]:\n    \"\"\"\n    Computes optimal Synthetic Control weights via Projected Gradient Descent on the probability simplex.\n    \n    Parameters\n    ----------\n    X1 : np.ndarray of shape (K,)\n        Predictor characteristics of the treated unit.\n    X0 : np.ndarray of shape (K, J)\n        Predictor characteristics of the J donor units.\n    lr : float\n        Learning rate for gradient steps.\n    max_iter : int\n        Maximum iterations.\n        \n    Returns\n    -------\n    dict with keys:\n        'w': Optimal non-negative weight vector summing to 1.\n        'loss': Final squared Euclidean distance ||X1 - X0 w||^2.\n    \"\"\"\n    # Step 1: Initialize weights uniformly on the simplex\n    # Step 2: Projected gradient descent loop\n    # Gradient step followed by Euclidean projection onto simplex\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0, 0.00"
            }
          },
          "solution": "import numpy as np\n\ndef fit_synthetic_control_simplex(\n    X1: np.ndarray,\n    X0: np.ndarray,\n    lr: float = 0.05,\n    max_iter: int = 500\n) -> dict[str, object]:\n    \"\"\"\n    Computes optimal Synthetic Control weights via Projected Gradient Descent on the probability simplex.\n    \n    Parameters\n    ----------\n    X1 : np.ndarray of shape (K,)\n        Predictor characteristics of the treated unit.\n    X0 : np.ndarray of shape (K, J)\n        Predictor characteristics of the J donor units.\n    lr : float\n        Learning rate for gradient steps.\n    max_iter : int\n        Maximum iterations.\n        \n    Returns\n    -------\n    dict with keys:\n        'w': Optimal non-negative weight vector summing to 1.\n        'loss': Final squared Euclidean distance ||X1 - X0 w||^2.\n    \"\"\"\n    K, J = X0.shape\n    # Step 1: Initialize weights uniformly on the simplex\n    w = np.full(J, 1.0 / J)\n    \n    def project_simplex(v: np.ndarray) -> np.ndarray:\n        \"\"\"Projects a vector v onto the probability simplex: sum(w) = 1, w >= 0.\"\"\"\n        u = np.sort(v)[::-1]\n        cssv = np.cumsum(u)\n        rho = np.nonzero(u * np.arange(1, J + 1) > (cssv - 1))[0][-1]\n        theta = (cssv[rho] - 1.0) / (rho + 1.0)\n        return np.maximum(v - theta, 0.0)\n\n    # Step 2: Projected gradient descent loop\n    for _ in range(max_iter):\n        diff = X1 - X0 @ w\n        grad = -X0.T @ diff\n        # Gradient step followed by Euclidean projection onto simplex\n        w = project_simplex(w - lr * grad)\n        \n    # Step 3: Compute final pre-treatment fit loss\n    loss = float(np.sum((X1 - X0 @ w) ** 2))\n    return {\n        \"w\": w,\n        \"loss\": loss\n    }"
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
      "en": "In classical econometrics, statistical significance is derived from the law of large numbers: you survey thousands of workers, compute an...",
      "ar": "في الاقتصاد القياسي الكلاسيكي، يستند الاستدلال الإحصائي واختبار الفرضيات إلى قانون الأعداد الكبيرة: حيث نجمع بيانات آلاف الأفراد، ونحسب..."
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
          "en": "In classical econometrics, statistical significance is derived from the law of large numbers: you survey thousands of workers, compute an estimated coefficient, divide by its standard error, and check whether your $t$-statistic exceeds $1.96$. But in case studies evaluated by the Synthetic Control Method, you have only **a single treated unit** ($N = 1$—one California, one West Germany, one Basque Country). Standard large-sample asymptotics and traditional $t$-distributions completely evaporate. How can an econometrician prove that California's sharp drop in cigarette sales after 1988 was a genuine causal breakthrough rather than random macroeconomic noise?\n\nThe answer lies in **exact permutation and placebo (falsification) inference**, drawing directly from Ronald Fisher's classic permutation logic. Imagine a stage magician who claims to possess supernatural psychic powers that cause a silver coin to land on heads. To test their claim scientifically, you don't calculate an abstract asymptotic formula; you ask all 50 audience members in the auditorium to flip identical coins under identical conditions. If the magician flips 10 heads in a row, but 12 audience members also flip 10 heads by pure luck, the magician's claim evaporates.\n\nIn an **In-Space Placebo Test**, the econometrician applies the exact same synthetic control algorithm iteratively to every single untreated donor state in the pool, pretending in turn that each donor adopted Proposition 99 in 1988. If the post-1988 gap for California is vastly larger than the placebo gaps generated by all 38 untreated states, the probability of observing an effect of this magnitude by sheer random chance is at most $1 / 39 \\approx 0.025$, establishing statistical significance at the $5\\%$ level!\n\nHowever, a naive comparison of raw post-treatment gaps introduces a major pitfall: what if an unusual donor state (like Wyoming or Alaska) has an economy that was never well-matched by the other states before 1988? Such an outlier state will naturally exhibit wild, erratic post-1988 gaps simply because its pre-treatment fit was poor. To solve this, Abadie, Diamond, and Hainmueller (2010) created the **RMSPE Ratio**: dividing post-intervention error by pre-intervention error ($\\text{RMSPE}_{\\text{post}} / \\text{RMSPE}_{\\text{pre}}$). This standardizes each unit's trajectory, heavily penalizing poorly fitted donor states and providing an unshakeable, non-parametric metric of true causal divergence.",
          "ar": "في الاقتصاد القياسي الكلاسيكي، يستند الاستدلال الإحصائي واختبار الفرضيات إلى قانون الأعداد الكبيرة: حيث نجمع بيانات آلاف الأفراد، ونحسب معامل الانحدار، ونقسمه على الخطأ المعياري، فإذا تجاوزت إحصائية $t$ القيمة 1.96 أعلنا الدلالة الإحصائية. لكن في دراسات الشبيه الاصطناعي، نتعامل مع **وحدة معالجة واحدة فقط** ($N = 1$: ولاية واحدة ككاليفورنيا، أو دولة واحدة كألمانيا). وهنا تتلاشى تماماً مبرهنات العينات الكبيرة وتوزيعات $t$ التقاربية. كيف نثبت إذن أن انخفاض استهلاك السجائر في كاليفورنيا بعد 1988 كان أثراً سببياً حقيقياً وليس مجرد مصادفة اقتصادية عابرة؟\n\nيكمن الحل في **اختبارات التباديل والمهدئ الوهمي (Placebo & Permutation Tests)** المستوحاة من منهجية رونالد فيشر. تخيل ساحراً يدعي امتلاك طاقة خارقة تجعل قطعة النقود تسقط على الوجه دائماً؛ لاختبار ادعائه علمياً، لا نلجأ إلى معادلات نظرية معقدة، بل نطلب من جميع الحاضرين في القاعة (50 شخصاً) رمي قطع نقود مماثلة. فإذا سقطت قطعة الساحر على الوجه 10 مرات متتالية، لكن 10 أشخاص آخرين من الجمهور حققوا نفس النتيجة بالمصادفة، سقط ادعاء الساحر وثبت بطلانه.\n\nفي **اختبار المهدئ الوهمي المكاني (In-Space Placebo)**، يطبق الباحث خوارزمية الشبيه الاصطناعي بالتتابع على كل ولاية مانحة غير معالجة كما لو أنها هي التي طبقت القانون في 1988. وإذا كان الانفصال المسجل في كاليفورنيا أكبر بكثير من فجوات جميع الولايات الـ 38 الأخرى، فإن احتمال حدوث ذلك الأثر بالمصادفة البحتة لا يتعدى $1 / 39 \\approx 0.025$، مما يثبت الأثر إحصائياً بمستوى دلالة 5%!\n\nولكن المقارنة المباشرة للفجوات بعد المعالجة تنطوي على فخ خطير: ماذا لو كانت إحدى الولايات المانحة شاذة في بنيتها الاقتصادية ولم تنجح الخوارزمية في مطابقتها جيداً قبل 1988؟ ستظهر لهذه الولاية تقلبات هائلة بعد 1988 ناتجة عن رداءة المطابقة المسبقة وليس عن أثر حقيقي. ابتكر أباديا وزملاؤه (2010) حلاً رائعاً هو **نسبة RMSPE**: حيث نقسم خطأ التنبؤ بعد المعالجة على خطأ التنبؤ قبلها. تعاقب هذه النسبة الوحدات سيئة المطابقة مسبقاً، وتمنحنا معياراً دقيقاً وصارماً لقياس الدلالة السببية الحقيقية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\hat{\\tau}_{jt} = Y_{jt} - \\hat{Y}_{jt}^{\\text{syn}} = Y_{jt} - \\sum_{k \\ne j} w_k^*(j) Y_{kt}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Synthetic Controls Inference & In-Space / In-Time Permutation Tests.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الاستدلال الإحصائي للشبيه الاصطناعي واختبارات المهدئ الوهمي المكانية والزمانية."
        },
        "narrative": {
          "en": "The Root Mean Squared Prediction Error (RMSPE) measures the quality of fit separately across the pre-intervention and post-intervention horizons:\n\n$$\n\\text{RMSPE}_{\\text{pre}}(j) = \\sqrt{\\frac{1}{T_0} \\sum_{t=1}^{T_0} \\left(Y_{jt} - \\hat{Y}_{jt}^{\\text{syn}}\\right)^2}\n$$\n\n$$\n\\text{RMSPE}_{\\text{post}}(j) = \\sqrt{\\frac{1}{T - T_0} \\sum_{t=T_0 + 1}^{T} \\left(Y_{jt} - \\hat{Y}_{jt}^{\\text{syn}}\\right)^2}\n$$\n\nTo prevent donor units with poor pre-treatment fit from contaminating the inferential distribution, Abadie et al. (2010) define the standardized **RMSPE Ratio**:\n\n$$\nr_j \\equiv \\frac{\\text{RMSPE}_{\\text{post}}(j)}{\\text{RMSPE}_{\\text{pre}}(j)}\n$$\n\nThe exact, non-parametric permutation $p$-value for the treated unit ($j = 1$) is evaluated as the empirical proportion of units in the sample with an RMSPE ratio at least as large as $r_1$:\n\n$$\np = \\frac{1}{J + 1} \\sum_{j=1}^{J+1} \\mathbb{I}(r_j \\ge r_1)\n$$\n\nIf the treated unit achieves the highest ratio among all $J + 1$ units, the empirical $p$-value achieves its sharp lower bound:\n\n$$\np_{\\min} = \\frac{1}{J + 1}\n$$\n\n### In-Time Falsification (Placebo in Time)\nA critical companion diagnostic re-assigns the treatment date to a fictitious date $T_0^{\\text{fake}} < T_0$ strictly within the pre-treatment period. SCM is estimated using only data up to $T_0^{\\text{fake}}$. Under valid identification, the post-fake treatment gap must fluctuate tightly around zero:\n\n$$\n\\hat{\\tau}_{1t}^{\\text{fake}} \\approx 0 \\quad \\forall t \\in \\{T_0^{\\text{fake}} + 1, \\dots, T_0\\}\n$$\n\nA significant divergence prior to the true treatment date $T_0$ exposes anticipatory effects or fundamental model misspecification.\n\n* $j = 1$: The true treated unit under policy evaluation.\n* $j \\in \\{2, \\dots, J+1\\}$: Placebo units belonging to the untreated donor pool.\n* $\\hat{\\tau}_{jt}$: Difference between the actual outcome of unit $j$ and its synthetic control at period $t$.\n* $\\text{RMSPE}_{\\text{pre}}(j)$: Root mean squared prediction error prior to the intervention (measure of baseline fit).\n* $\\text{RMSPE}_{\\text{post}}(j)$: Root mean squared prediction error after the intervention (measure of treatment divergence).\n* $r_j$: Dimensionless RMSPE ratio scaling post-intervention divergence by baseline pre-intervention error.\n* $p$: Exact Fisher permutation $p$-value indicating the probability that an untreated donor unit would produce a ratio as extreme as the treated unit by chance.\n* $T_0^{\\text{fake}}$: Counterfactual fictitious policy date used for temporal falsification tests.\n\nImplement the Synthetic Control permutation inference engine in NumPy. You will:\n1. Extract pre-treatment gaps ($t \\in [0, T_0)$) and post-treatment gaps ($t \\in [T_0, T)$) for all units.\n2. Calculate $\\text{RMSPE}_{\\text{pre}}$ and $\\text{RMSPE}_{\\text{post}}$ for each column in the gaps matrix.\n3. Compute the ratio $r_j = \\frac{\\text{RMSPE}_{\\text{post}}(j)}{\\text{RMSPE}_{\\text{pre}}(j)}$ (adding $\\epsilon = 10^{-8}$ to prevent zero-division).\n4. Compute the exact empirical $p$-value and determine the 1-based rank of the treated unit (column 0).",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-synthetic-control-placebo-tests",
          "starterCode": "def compute_rmspe_ratio_pvalue(gaps_matrix: np.ndarray, t0_idx: int) -> dict[str, object]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and permutation p-value for Synthetic Control.\n    \n    Parameters\n    ----------\n    gaps_matrix : np.ndarray of shape (T, J + 1)\n        Matrix of estimated gap series (actual - synthetic) across T periods.\n        Column 0 corresponds to the treated unit; columns 1..J are placebos.\n    t0_idx : int\n        Number of pre-treatment periods (index where treatment starts).\n        \n    Returns\n    -------\n    dict with keys:\n        'ratios': Array of RMSPE ratios for all units.\n        'treated_ratio': Ratio for treated unit (column 0).\n        'p_value': Exact empirical permutation p-value.\n        'rank': 1-based rank of the treated unit (1 = largest ratio).\n    \"\"\"\n    # Step 1: Pre-treatment RMSPE: periods 0 to t0_idx\n    # Safeguard against division by zero\n    # Step 2: Post-treatment RMSPE: periods t0_idx to T\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_rmspe_ratio_pvalue(gaps_matrix: np.ndarray, t0_idx: int) -> dict[str, object]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and permutation p-value for Synthetic Control.\n    \n    Parameters\n    ----------\n    gaps_matrix : np.ndarray of shape (T, J + 1)\n        Matrix of estimated gap series (actual - synthetic) across T periods.\n        Column 0 corresponds to the treated unit; columns 1..J are placebos.\n    t0_idx : int\n        Number of pre-treatment periods (index where treatment starts).\n        \n    Returns\n    -------\n    dict with keys:\n        'ratios': Array of RMSPE ratios for all units.\n        'treated_ratio': Ratio for treated unit (column 0).\n        'p_value': Exact empirical permutation p-value.\n        'rank': 1-based rank of the treated unit (1 = largest ratio).\n    \"\"\"\n    # Step 1: Pre-treatment RMSPE: periods 0 to t0_idx\n    # Safeguard against division by zero\n    # Step 2: Post-treatment RMSPE: periods t0_idx to T\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.3333, 1"
            }
          },
          "solution": "import numpy as np\n\ndef compute_rmspe_ratio_pvalue(gaps_matrix: np.ndarray, t0_idx: int) -> dict[str, object]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and permutation p-value for Synthetic Control.\n    \n    Parameters\n    ----------\n    gaps_matrix : np.ndarray of shape (T, J + 1)\n        Matrix of estimated gap series (actual - synthetic) across T periods.\n        Column 0 corresponds to the treated unit; columns 1..J are placebos.\n    t0_idx : int\n        Number of pre-treatment periods (index where treatment starts).\n        \n    Returns\n    -------\n    dict with keys:\n        'ratios': Array of RMSPE ratios for all units.\n        'treated_ratio': Ratio for treated unit (column 0).\n        'p_value': Exact empirical permutation p-value.\n        'rank': 1-based rank of the treated unit (1 = largest ratio).\n    \"\"\"\n    T, num_units = gaps_matrix.shape\n    \n    # Step 1: Pre-treatment RMSPE: periods 0 to t0_idx\n    pre_gaps = gaps_matrix[:t0_idx, :]\n    rmspe_pre = np.sqrt(np.mean(pre_gaps ** 2, axis=0))\n    # Safeguard against division by zero\n    rmspe_pre = np.maximum(rmspe_pre, 1e-8)\n    \n    # Step 2: Post-treatment RMSPE: periods t0_idx to T\n    post_gaps = gaps_matrix[t0_idx:, :]\n    rmspe_post = np.sqrt(np.mean(post_gaps ** 2, axis=0))\n    \n    # Step 3: Compute standardized RMSPE Ratios\n    ratios = rmspe_post / rmspe_pre\n    treated_ratio = float(ratios[0])\n    \n    # Step 4: Compute exact permutation p-value and 1-based rank\n    p_value = float(np.mean(ratios >= treated_ratio))\n    rank = int(np.sum(ratios > treated_ratio) + 1)\n    \n    return {\n        \"ratios\": ratios,\n        \"treated_ratio\": treated_ratio,\n        \"p_value\": p_value,\n        \"rank\": rank\n    }"
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
      "en": "Imagine driving a precision mechanical lever. In Ordinary Least Squares (OLS), the lever works flawlessly when each control knob moves an...",
      "ar": "تخيل رافعة ميكانيكية دقيقة: في انحدار المربعات الصغرى العادي (OLS)، تعمل الرافعة بسلاسة عندما يتحرك كل مقبض بشكل مستقل."
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
          "en": "Imagine driving a precision mechanical lever. In Ordinary Least Squares (OLS), the lever works flawlessly when each control knob moves an independent gear. But when two or more explanatory features are heavily collinear (such as measuring both body weight in kilograms and body weight in pounds), the underlying design matrix $\\mathbf{X}^T \\mathbf{X}$ becomes near-singular (ill-conditioned). Its determinant collapses toward zero, and the inverse matrix $(\\mathbf{X}^T \\mathbf{X})^{-1}$ explodes into astronomical numbers. The regression lever turns into an unstable, vibrating pendulum: the tiniest whisper of noise in the training data causes the estimated coefficients to swing wildly into massive, canceling extremes—assigning $+2,400$ to weight-in-kg and $-2,398$ to weight-in-lbs!\n\nTo tame this numerical chaos, Arthur Hoerl and Robert Kennard (1970) introduced **Ridge Regression ($L_2$ regularization)**. The most intuitive way to visualize Ridge is to imagine **attaching an elastic rubber cord or spring between every single parameter $\\beta_j$ and the origin at zero**. When OLS attempts to fling collinear coefficients into outer space to overfit idiosyncratic training noise, the elastic tethers stretch, generating a powerful restoring tension that yanks all parameters back toward zero.\n\nNotice the mathematical subtlety of this elastic spring: because the $L_2$ penalty is quadratic ($\\lambda \\|\\boldsymbol{\\beta}\\|_2^2 = \\lambda \\sum \\beta_j^2$), the restoring force is proportional to the size of the parameter. A massive coefficient experiences an overwhelming pull toward the center, while a small coefficient close to zero feels only a gentle tug. As a result, Ridge smoothly compresses and shrinks all coefficients together, but the quadratic curvature ensures that **no coefficient is ever pulled all the way to absolute zero**. Every feature remains in the model with a shrunken, stabilized weight.\n\nThrough the lens of the **Singular Value Decomposition (SVD)**, Ridge operates as a sophisticated noise filter or audio equalizer. High-variance principal directions in your data (directions with large singular values $\\sigma_j$) pass through the Ridge filter almost untouched. In contrast, collinear directions that capture negligible genuine variation (directions with tiny singular values $\\sigma_j \\approx 0$) are heavily attenuated and squashed. Ridge deliberately accepts a tiny amount of asymptotic bias in exchange for a massive, game-changing reduction in variance—the quintessential manifestation of the **bias-variance tradeoff**.",
          "ar": "تخيل رافعة ميكانيكية دقيقة: في انحدار المربعات الصغرى العادي (OLS)، تعمل الرافعة بسلاسة عندما يتحرك كل مقبض بشكل مستقل. لكن عندما تتداخل المتغيرات التفسيرية بشدة وتتطابق فيما بينها (Multicollinearity—كأن نقيس وزن المريض بالكيلوغرام وبالرطل معاً)، تقترب مصفوفة البيانات $\\mathbf{X}^T \\mathbf{X}$ من الشذوذ الرياضي والانعدام. يقترب محدد المصفوفة من الصفر، وتنفجر قيم مقلوبها نحو أرقام فلكية. تتحول رافعة OLS إلى بندول مهتز بعنف؛ فأي تذبذب طفيف أو ضجيج عابر في العينة يدفع المعاملات إلى قيم موجبة وسالبة متطرفة ومتناقضة تماماً (مثل $+2,400$ للكيلوغرام و $-2,398$ للرطل!).\n\nلترويض هذا التذبذب الكارثي، ابتكر آرثر هورل وروبرت كينارد (1970) **انحدار ريدج (Ridge Regression - تنظيم $L_2$)**. وأفضل طريقة لتخيل هذا الأسلوب هندسياً هي تخيل **حبل مطاطي مرن مربوط بين كل معامل $\\beta_j$ ونقطة الصفر في المركز**. كلما حاولت خوارزمية OLS دفع المعاملات إلى قيم عملاقة لفرط تخصيص الضجيج، تمدد الحبل المطاطي ومارس قوة جذب مرنة تشد كافة المعاملات بقوة نحو المركز.\n\nتأمل البراعة الهندسية لهذا الحبل المرن: نظراً لأن جزاء $L_2$ تربيعي ($\\lambda \\|\\boldsymbol{\\beta}\\|_2^2 = \\lambda \\sum \\beta_j^2$)، فإن قوة الشد تتناسب طردياً مع حجم المعامل؛ فالمعامل الضخم يتعرض لقوة سحب جبارة تدفعه نحو الصفر، بينما المعامل الصغير القريب من الصفر يشعر بلمسة سحب خفيفة. والنتيجة هي انكماش تدريجي سلس لجميع المعاملات بالتوازي دون أن يُحذف أي متغير أو يصل معامل إلى الصفر المطلق.\n\nمن منظور **تفكيك القيم المنفردة (SVD)**، يعمل انحدار ريدج كمعادل صوتي فائق الذكاء: الاتجاهات البيانية القوية ذات التباين العالي (القيم المنفردة الكبيرة $\\sigma_j$) تعبر الفلتر بحرية دون أي انكماش تقريباً، بينما الاتجاهات الضعيفة الملوثة بالارتباط الخطي والضجيج (القيم المنفردة القريبة من الصفر) تُكبح بقوة وتُسحق نحو الصفر. يقبل انحدار ريدج قدراً ضئيلاً جداً من الانحياز الحسابي في مقابل تقليص هائل في تباين التقدير—وهو التجسيد الأسمى لـ **معضلة الانحياز والتباين (Bias-Variance Tradeoff)**."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\boldsymbol{\\beta}} \\mathcal{L}_{\\text{Ridge}}(\\boldsymbol{\\beta}) = \\frac{1}{2n}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\|\\boldsymbol{\\beta}\\|_2^2 = \\frac{1}{2n}(\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) + \\lambda \\boldsymbol{\\beta}^T \\boldsymbol{\\beta}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Ridge Regression (L2) & SVD Spectral Shrinkage.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة."
        },
        "narrative": {
          "en": "where:\n- $\\frac{1}{2n}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2$: The empirical data loss measuring goodness-of-fit on training samples.\n- $\\lambda \\ge 0$: Regularization hyperparameter governing the penalty strength (at $\\lambda = 0$, Ridge simplifies to OLS; as $\\lambda \\to \\infty$, $\\hat{\\boldsymbol{\\beta}} \\to \\mathbf{0}$).\n- $\\|\\boldsymbol{\\beta}\\|_2^2 = \\sum_{j=1}^p \\beta_j^2$: Squared Euclidean $L_2$ norm.\n\nTaking the matrix gradient with respect to $\\boldsymbol{\\beta}$ and setting it to zero:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} \\mathcal{L}_{\\text{Ridge}} = -\\frac{1}{n}\\mathbf{X}^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) + 2\\lambda \\boldsymbol{\\beta} = \\mathbf{0}\n$$\n\nMultiplying by $n$ and grouping terms yields the Ridge normal equations:\n\n$$\n\\left(\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I}_p\\right) \\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}} = \\mathbf{X}^T \\mathbf{y} \\implies \\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}} = \\left(\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I}_p\\right)^{-1} \\mathbf{X}^T \\mathbf{y}\n$$\n\nBecause $2n\\lambda \\mathbf{I}_p$ adds a strictly positive quantity $2n\\lambda > 0$ to every eigenvalue along the diagonal, the regularized Gram matrix $(\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I}_p)$ is guaranteed to be strictly positive-definite and nonsingular, ensuring an invertibility guarantee even when $p > n$.\n\n### SVD Spectral Shrinkage\nLet $\\mathbf{X} = \\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^T$ be the compact Singular Value Decomposition of the centered design matrix, where $\\mathbf{U} \\in \\mathbb{R}^{n \\times p}$, $\\mathbf{\\Sigma} = \\text{diag}(\\sigma_1, \\dots, \\sigma_p)$, and $\\mathbf{V} \\in \\mathbb{R}^{p \\times p}$. Substituting the SVD into the prediction equation:\n\n$$\n\\hat{\\mathbf{y}}_{\\text{Ridge}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}} = \\sum_{j=1}^p \\mathbf{u}_j \\left( \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda} \\right) \\mathbf{u}_j^T \\mathbf{y}\n$$\n\nThe factor $f_j = \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda} \\in (0, 1]$ represents the **spectral shrinkage factor**. Directions in column space corresponding to dominant singular values ($\\sigma_j^2 \\gg 2n\\lambda$) experience almost zero shrinkage ($f_j \\approx 1$), whereas noisy, collinear directions with small singular values ($\\sigma_j^2 \\ll 2n\\lambda$) are shrunk aggressively toward zero ($f_j \\approx 0$).\n\nThe **effective degrees of freedom** of Ridge regression is continuous in $\\lambda$:\n\n$$\n\\text{df}(\\lambda) = \\text{tr}\\left( \\mathbf{X}(\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I}_p)^{-1}\\mathbf{X}^T \\right) = \\sum_{j=1}^p \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda}\n$$\n\n* $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$: Standardized feature matrix with $n$ samples and $p$ regressors.\n* $\\mathbf{y} \\in \\mathbb{R}^n$: Centered target vector.\n* $\\lambda$: Non-negative regularization hyperparameter controlling the degree of shrinkage.\n* $\\mathbf{I}_p$: $p \\times p$ identity matrix serving as the isotropic $L_2$ regularization regularizer.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}}$: Closed-form regularized coefficient estimator.\n* $\\sigma_j$: The $j$-th singular value of matrix $\\mathbf{X}$, quantifying variance along the $j$-th principal axis.\n* $f_j = \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda}$: SVD spectral shrinkage coefficient filtering out collinear directions.\n* $\\text{df}(\\lambda)$: Effective degrees of freedom parameterizing continuous model complexity.\n\nImplement the closed-form Ridge regression solver and compute its SVD spectral shrinkage factors in NumPy. You will:\n1. Construct the regularized Gram matrix $\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I}_p$.\n2. Solve the linear system for the optimal Ridge parameter vector $\\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}}$.\n3. Compute the Singular Value Decomposition of $\\mathbf{X}$ to obtain singular values $\\sigma_j$.\n4. Calculate the component shrinkage factors $f_j = \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda}$ and sum them to obtain the effective degrees of freedom $\\text{df}(\\lambda)$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-ridge-lasso",
          "starterCode": "def fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> dict[str, object]:\n    \"\"\"\n    Fits Ridge regression using closed-form Normal Equations and computes SVD spectral shrinkage.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix.\n    y : np.ndarray of shape (N,)\n        Target response vector.\n    lmbda : float\n        Regularization strength lambda >= 0.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': Estimated Ridge coefficient vector of shape (P,).\n        'singular_values': Singular values of X.\n        'shrinkage_factors': SVD spectral shrinkage factors per component.\n        'df_effective': Effective degrees of freedom df(lambda).\n    \"\"\"\n    # Step 1: Form regularized normal equations: (X^T X + 2*N*lambda * I) beta = X^T y\n    # Step 2: SVD of X to obtain singular values\n    # Step 3: Compute spectral shrinkage factors: s_j^2 / (s_j^2 + 2*N*lambda)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> dict[str, object]:\n    \"\"\"\n    Fits Ridge regression using closed-form Normal Equations and computes SVD spectral shrinkage.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix.\n    y : np.ndarray of shape (N,)\n        Target response vector.\n    lmbda : float\n        Regularization strength lambda >= 0.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': Estimated Ridge coefficient vector of shape (P,).\n        'singular_values': Singular values of X.\n        'shrinkage_factors': SVD spectral shrinkage factors per component.\n        'df_effective': Effective degrees of freedom df(lambda).\n    \"\"\"\n    # Step 1: Form regularized normal equations: (X^T X + 2*N*lambda * I) beta = X^T y\n    # Step 2: SVD of X to obtain singular values\n    # Step 3: Compute spectral shrinkage factors: s_j^2 / (s_j^2 + 2*N*lambda)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.96, 1.94"
            }
          },
          "solution": "import numpy as np\n\ndef fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> dict[str, object]:\n    \"\"\"\n    Fits Ridge regression using closed-form Normal Equations and computes SVD spectral shrinkage.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix.\n    y : np.ndarray of shape (N,)\n        Target response vector.\n    lmbda : float\n        Regularization strength lambda >= 0.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': Estimated Ridge coefficient vector of shape (P,).\n        'singular_values': Singular values of X.\n        'shrinkage_factors': SVD spectral shrinkage factors per component.\n        'df_effective': Effective degrees of freedom df(lambda).\n    \"\"\"\n    N, P = X.shape\n    \n    # Step 1: Form regularized normal equations: (X^T X + 2*N*lambda * I) beta = X^T y\n    XtX = X.T @ X\n    penalty_diag = 2.0 * N * lmbda * np.eye(P)\n    beta = np.linalg.solve(XtX + penalty_diag, X.T @ y)\n    \n    # Step 2: SVD of X to obtain singular values\n    U, s, Vt = np.linalg.svd(X, full_matrices=False)\n    \n    # Step 3: Compute spectral shrinkage factors: s_j^2 / (s_j^2 + 2*N*lambda)\n    s_squared = s ** 2\n    shrinkage = s_squared / (s_squared + 2.0 * N * lmbda)\n    df_effective = float(np.sum(shrinkage))\n    \n    return {\n        \"beta\": beta,\n        \"singular_values\": s,\n        \"shrinkage_factors\": shrinkage,\n        \"df_effective\": df_effective\n    }"
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
      "en": "Imagine standing before an overwhelming control console in a modern power plant with 10,000 indicator needles.",
      "ar": "تخيل أنك تقف أمام لوحة تحكم عملاقة في محطة توليد طاقة تضم 10,000 مؤشر ومقياس. مهمتك هي التنبؤ بذروة استهلاك الكهرباء، ولكن محاولة قراءة..."
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
          "en": "Imagine standing before an overwhelming control console in a modern power plant with 10,000 indicator needles. You need to forecast peak energy load, but reading all 10,000 gauges simultaneously is humanly impossible and statistically disastrous. If you fit Ordinary Least Squares (OLS), the model will eagerly construct an intricate formula that assigns tiny, noisy weights to every twitching needle—memorizing idiosyncratic static rather than true physics. This is **overfitting**: when a model becomes so obsessed with fitting every random ripple in the training sample that it fails completely when deployed on unseen data.\n\nIn the previous lesson, we saw how Ridge regression ($L_2$) attaches an elastic rubber tether to every dial, pulling extreme weights toward zero. Yet Ridge suffers from a stubborn philosophical limitation: because its quadratic rubber band pulls gently as a weight nears zero, it shrinks coefficients smoothly without ever letting them touch absolute zero. Every single needle remains plugged into your prediction equation! When dealing with high-dimensional problems—such as genomics with 30,000 genes or quantitative finance with thousands of noisy market signals—what you truly crave is not mere shrinkage, but ruthless, automated triage.\n\nRobert Tibshirani (1996) revolutionized statistical learning by introducing the **Lasso ($L_1$ regularization)**. If Ridge is an elastic tether that gently restrains runaway weights, **Lasso is an uncompromising guillotine that snaps zero-importance features to absolute mathematical zero**. Instead of penalizing the sum of squared weights ($\\sum \\beta_j^2$), Lasso penalizes the sum of absolute values ($\\sum |\\beta_j|$). This seemingly innocent substitution radically transforms the geometric landscape. In geometric space, the $L_1$ constraint boundary is not a smooth, round ball, but a sharp, diamond-shaped polyhedron (a cross-polytope) whose pointed corners stick out squarely along the coordinate axes.\n\nWhen the expanding elliptical contours of the least-squares error search for the lowest-cost compromise, they almost always crash into one of these sharp diamond corners first. Because a corner on a coordinate axis has coordinates where the orthogonal axes are exactly zero, Lasso effortlessly performs **feature selection**: it silences irrelevant predictors entirely, producing a clean, sparse, interpretable model. To tackle situations where groups of predictors are highly correlated, Hui Zou and Trevor Hastie (2005) forged the **Elastic Net**, blending Lasso's razor-sharp diamond corners with Ridge's smooth quadratic shoulders to select entire cooperative clusters of features at once.",
          "ar": "تخيل أنك تقف أمام لوحة تحكم عملاقة في محطة توليد طاقة تضم 10,000 مؤشر ومقياس. مهمتك هي التنبؤ بذروة استهلاك الكهرباء، ولكن محاولة قراءة وتتبع 10,000 مؤشر في آن واحد هي مهمة مستحيلة بشرياً وكارثية إحصائياً. إذا استخدمت انحدار المربعات الصغرى العادي (OLS)، فسيقوم النموذج بابتكار معادلة معقدة تعطي وزناً طفيفاً ومشوهاً لكل مؤشر يهتز عشوائياً—مما يعني حفظ الضوضاء والتقلبات العابرة بدلاً من فهم القوانين الحقيقية. هذه هي معضلة **فرط التخصيص (Overfitting)**: عندما يغرق النموذج في تفاصيل عينة التدريب لدرجة تجعله يعجز تماماً عن التنبؤ بالبيانات الجديدة.\n\nرأينا في الدرس السابق كيف يربط انحدار ريدج ($L_2$) حبلاً مطاطياً مرناً بكل معامل ليشبه نابضاً يشده نحو المركز. لكن انحدار ريدج يعاني من عيب جوهري: نظراً لأن قوة شد النابض التربيعي تضعف جداً كلما اقترب المعامل من الصفر، فإنه يقلص الأوزان بسلاسة دون أن يجعل أياً منها صفراً مطلقاً. سيبقى كل مؤشر من الـ 10,000 حاضراً في معادلة التنبؤ! وفي التطبيقات الحديثة عالية الأبعاد—مثل تحليل الجينوم البشري الذي يحتوي على عشرات الآلاف من الجينات، أو النماذج المالية التي تراقب آلاف المؤشرات—فإننا نحتاج إلى تصفية صارمة وانتقاء تلقائي لأهم المتغيرات، وليس مجرد تقليص مستمر لجميع الأوزان.\n\nأحدث روبرت تيبشيراني (1996) ثورة في التعلم الإحصائي بابتكار **انحدار لاسو (Lasso - تنظيم $L_1$)**. إذا كان انحدار ريدج حبلاً مطاطياً يمنع انفلات المعاملات، فإن **انحدار لاسو هو مقصلة حاسمة تقطع دابر المتغيرات غير المهمة وتصفر معاملاتها تماماً**. وبدلاً من معاقبة مجموع مربعات المعاملات، يفرض لاسو جزاءً على مجموع القيم المطلقة لها ($\\sum |\\beta_j|$). هذا التغيير الطفيف يبدل الهندسة بالكامل: فمنطقة قيد $L_1$ ليست كرة دائرية ملساء، بل هي متعدد سطوح ماسي ذو زوايا ورؤوس مدببة تقع تماماً فوق محاور الإحداثيات.\n\nوعندما تتمدد قطوع خطأ المربعات الصغرى البيضاوية بحثاً عن نقطة التماس المثلى، فإنها تصطدم حتماً بإحدى هذه الزوايا الحادة المدببة. وحيث إن أي نقطة على زاوية المحور تمتلك إحداثيات متعامدة تساوي صفراً مطلقاً، يحقق لاسو **انتقاء المتغيرات (Feature Selection)** تلقائياً وبكفاءة رياضية مذهلة. ولتجاوز عجز لاسو عند التعامل مع المتغيرات شديدة الترابط، ابتكر زو وهاستي (2005) **شبكة المرونة (Elastic Net)** التي تدمج بين زوايا لاسو الحادة وانحناءات ريدج الملساء لتنتقي مجموعات المتغيرات المترابطة معاً كحزمة وظيفية واحدة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\boldsymbol{\\beta} \\in \\mathbb{R}^p} \\mathcal{L}_{\\text{EN}}(\\boldsymbol{\\beta}) = \\frac{1}{2n}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\left[ \\alpha \\|\\boldsymbol{\\beta}\\|_1 + \\frac{1 - \\alpha}{2} \\|\\boldsymbol{\\beta}\\|_2^2 \\right]",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Lasso Regression (L1), Polyhedral Geometry & Elastic Net.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ انحدار لاسو وهندسة متعدد السطوح وشبكة المرونة."
        },
        "narrative": {
          "en": "Expanding the norms into scalar components:\n\n$$\n\\min_{\\boldsymbol{\\beta}} \\frac{1}{2n} \\sum_{i=1}^n \\left( y_i - \\sum_{j=1}^p X_{ij}\\beta_j \\right)^2 + \\lambda \\alpha \\sum_{j=1}^p |\\beta_j| + \\frac{\\lambda (1 - \\alpha)}{2} \\sum_{j=1}^p \\beta_j^2\n$$\n\n### Parameter Regimes:\n- **$\\alpha = 1$ (Pure Lasso):** Eliminates the $L_2$ term, yielding the $L_1$ objective $\\frac{1}{2n}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\|\\boldsymbol{\\beta}\\|_1$. Produces exact sparsity, setting uninformative parameters to zero.\n- **$\\alpha = 0$ (Pure Ridge):** Eliminates the $L_1$ penalty, reducing to strictly convex $L_2$ shrinkage. Coefficients are smoothed, but none equal zero.\n- **$0 < \\alpha < 1$ (Elastic Net):** The strictly convex $L_2$ penalty enforces unique solutions and groups correlated regressors, while the $L_1$ diamond edges drive unimportant coefficients to zero.\n\n### Subgradient Calculus & Soft-Thresholding\nBecause the $L_1$ norm $|\\beta_j|$ has a sharp \"V\" crease at $\\beta_j = 0$, its derivative does not exist at the origin. Instead, we compute its **subdifferential**:\n\n$$\n\\partial |\\beta_j| = \\begin{cases} \\{1\\} & \\text{if } \\beta_j > 0 \\\\ [-1, 1] & \\text{if } \\beta_j = 0 \\\\ \\{-1\\} & \\text{if } \\beta_j < 0 \\end{cases}\n$$\n\nThe scalar solution to this non-smooth convex subdifferential is the celebrated **Soft-Thresholding Operator** $\\mathcal{S}(z, \\gamma)$:\n\n$$\n\\mathcal{S}(z, \\gamma) \\equiv \\text{sign}(z) \\max(|z| - \\gamma, 0) = \\begin{cases} z - \\gamma & \\text{if } z > \\gamma \\\\ 0 & \\text{if } |z| \\le \\gamma \\\\ z + \\gamma & \\text{if } z < -\\gamma \\end{cases}\n$$\n\n### Cyclical Coordinate Descent\nInstead of trying to update all $p$ coefficients at once, coordinate descent optimizes one scalar coefficient $\\beta_j$ at a time while holding all other $p - 1$ parameters fixed.\n\nAssuming column-standardized predictors ($\\frac{1}{n} \\mathbf{x}_j^T \\mathbf{x}_j = 1$), define the partial residual without feature $j$:\n\n$$\n\\mathbf{r}^{(-j)} = \\mathbf{y} - \\sum_{k \\ne j} \\mathbf{x}_k \\beta_k = \\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta} + \\mathbf{x}_j \\beta_j\n$$\n\nThe unconstrained projection of feature $j$ onto this partial residual is:\n\n$$\nz_j = \\frac{1}{n} \\mathbf{x}_j^T \\mathbf{r}^{(-j)}\n$$\n\nApplying soft-thresholding and the quadratic Elastic Net denominator gives the exact scalar closed-form update:\n\n$$\n\\beta_j \\leftarrow \\frac{\\mathcal{S}\\left(z_j, \\lambda \\alpha\\right)}{1 + \\lambda (1 - \\alpha)}\n$$\n\nRepeatedly sweeping through features $j = 1, \\dots, p$ converges monotonically to the exact global optimum.\n\n* $\\mathbf{X} \\in \\mathbb{R}^{n \\times p}$: Matrix of standardized predictors ($n$ samples, $p$ features).\n* $\\mathbf{y} \\in \\mathbb{R}^n$: Target response vector.\n* $\\boldsymbol{\\beta} \\in \\mathbb{R}^p$: Parameter coefficient vector to be estimated.\n* $\\lambda \\ge 0$: Regularization hyperparameter governing overall penalty magnitude.\n* $\\alpha \\in [0, 1]$: Elastic Net mixing parameter ($\\alpha = 1 \\implies \\text{Lasso}$, $\\alpha = 0 \\implies \\text{Ridge}$).\n* $\\|\\boldsymbol{\\beta}\\|_1 = \\sum_{j=1}^p |\\beta_j|$: $L_1$ tax that forces sparsity via non-differentiable diamond vertices.\n* $\\|\\boldsymbol{\\beta}\\|_2^2 = \\sum_{j=1}^p \\beta_j^2$: $L_2$ squared Euclidean norm ensuring strong convexity and grouped selection.\n* $\\mathcal{S}(z, \\gamma)$: Soft-thresholding operator collapsing values within $[-\\gamma, \\gamma]$ to absolute zero.\n* $\\mathbf{r}^{(-j)}$: Partial residual vector isolating variation unexplained by all features except regressor $j$.\n* $z_j = \\frac{1}{n}\\mathbf{x}_j^T \\mathbf{r}^{(-j)}$: OLS correlation between regressor $j$ and the partial residual.\n\nImplement the Elastic Net coordinate descent solver with soft-thresholding in NumPy. You will:\n1. Define the soft-thresholding operator $\\mathcal{S}(z, \\gamma) = \\text{sign}(z)\\max(|z| - \\gamma, 0)$.\n2. Compute the partial residual $\\mathbf{r}^{(-j)} = \\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta} + \\mathbf{x}_j \\beta_j$ and the unconstrained projection $z_j = \\frac{1}{n}\\mathbf{x}_j^T \\mathbf{r}^{(-j)}$.\n3. Update each coordinate $\\beta_j \\leftarrow \\frac{\\mathcal{S}(z_j, \\lambda\\alpha)}{\\frac{1}{n}\\|\\mathbf{x}_j\\|_2^2 + \\lambda(1 - \\alpha)}$.\n4. Cycle through all $p$ features until the maximum parameter shift between iterations drops below tolerance $\\text{tol}$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-elastic-net-coordinate-descent",
          "starterCode": "def fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float,\n    max_iter: int = 100,\n    tol: float = 1e-5\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net regression via cyclical coordinate descent with soft-thresholding.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix (assumed normalized/standardized).\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization parameter lambda >= 0.\n    alpha : float\n        Mixing parameter in [0, 1] (1 = Lasso, 0 = Ridge).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance on coefficient changes.\n        \n    Returns\n    -------\n    np.ndarray of shape (P,)\n        Sparse estimated coefficient vector.\n    \"\"\"\n    # Precompute column norms (assumes columns have unit variance: x_j^T x_j / N = 1)\n    # Step 1: Compute partial residual: r_j = y - X @ beta + X[:, j] * beta[j]\n    # Step 2: Apply soft thresholding and Elastic Net denominator\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float,\n    max_iter: int = 100,\n    tol: float = 1e-5\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net regression via cyclical coordinate descent with soft-thresholding.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix (assumed normalized/standardized).\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization parameter lambda >= 0.\n    alpha : float\n        Mixing parameter in [0, 1] (1 = Lasso, 0 = Ridge).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance on coefficient changes.\n        \n    Returns\n    -------\n    np.ndarray of shape (P,)\n        Sparse estimated coefficient vector.\n    \"\"\"\n    # Precompute column norms (assumes columns have unit variance: x_j^T x_j / N = 1)\n    # Step 1: Compute partial residual: r_j = y - X @ beta + X[:, j] * beta[j]\n    # Step 2: Apply soft thresholding and Elastic Net denominator\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.80, 0.00"
            }
          },
          "solution": "import numpy as np\n\ndef fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float,\n    max_iter: int = 100,\n    tol: float = 1e-5\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net regression via cyclical coordinate descent with soft-thresholding.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix (assumed normalized/standardized).\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization parameter lambda >= 0.\n    alpha : float\n        Mixing parameter in [0, 1] (1 = Lasso, 0 = Ridge).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance on coefficient changes.\n        \n    Returns\n    -------\n    np.ndarray of shape (P,)\n        Sparse estimated coefficient vector.\n    \"\"\"\n    N, P = X.shape\n    beta = np.zeros(P)\n    \n    # Precompute column norms (assumes columns have unit variance: x_j^T x_j / N = 1)\n    norm_sq = np.sum(X ** 2, axis=0) / N\n    \n    def soft_threshold(z: float, gamma: float) -> float:\n        if z > gamma:\n            return z - gamma\n        elif z < -gamma:\n            return z + gamma\n        else:\n            return 0.0\n\n    for iteration in range(max_iter):\n        beta_old = beta.copy()\n        \n        for j in range(P):\n            # Step 1: Compute partial residual: r_j = y - X @ beta + X[:, j] * beta[j]\n            y_pred = X @ beta\n            residual = y - y_pred + X[:, j] * beta[j]\n            z_j = float(X[:, j] @ residual) / N\n            \n            # Step 2: Apply soft thresholding and Elastic Net denominator\n            gamma = lmbda * alpha\n            numerator = soft_threshold(z_j, gamma)\n            denominator = norm_sq[j] + lmbda * (1.0 - alpha)\n            \n            beta[j] = numerator / denominator if denominator > 1e-8 else 0.0\n            \n        if np.max(np.abs(beta - beta_old)) < tol:\n            break\n            \n    return beta"
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
      "en": "Imagine attempting to measure the curvature of a delicate crystal bowl using a rigid wooden yardstick.",
      "ar": "تخيل أنك تحاول قياس انحناءات إناء بلوري رقيق باستخدام مسطرة خشبية صلبة ومستقيمة. في الإحصاء الكلاسيكي، يؤدي تطبيق انحدار المربعات الصغرى..."
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
          "en": "Imagine attempting to measure the curvature of a delicate crystal bowl using a rigid wooden yardstick. In classical statistics, fitting Ordinary Least Squares (OLS) to a binary classification problem—often termed the **Linear Probability Model (LPM)**—is guilty of the exact same mechanical blunder. When predicting whether a borrower will default on a mortgage, whether a patient has a malignant tumor, or whether an enterprise client will churn, the true target $y \\in \\{0, 1\\}$ is categorical and bounded. But a straight line is relentlessly linear: as an applicant's debt-to-income ratio climbs, a linear equation will unblinkingly output a default probability of $140\\%$, or assign a $-25\\%$ probability of disease to an exceptionally healthy patient. These nonsensical outputs violate the fundamental Kolmogorov axioms of probability.\n\nLogistic regression resolves this pathology by replacing the rigid wooden ruler with an **elastic hydraulic shock absorber: the Sigmoid S-curve**. Think of the Sigmoid activation as a mathematical dampening chamber. You feed it any raw, unbounded linear score $z = \\mathbf{w}^T \\mathbf{x}$—whether it is $-5,000$, $+42$, or zero—and the chamber smoothly compresses and squashes the output into the strictly bounded open interval $(0, 1)$. As the score shoots toward positive infinity, the curve saturates gracefully toward certainty ($1.0$); as the score plummets into deep negative territory, it flattens out toward impossibility ($0.0$), but it can never breach the physical boundaries of probability.\n\nTo understand why this dampening works so naturally, we must demystify the concept of **odds and log-odds (the logit)**. In daily conversation, if a horse has an $80\\%$ chance of winning, its probability is $p = 0.8$. But bookmakers speak in *odds*: the ratio of winning to losing, which is $0.8 / 0.2 = 4 \\text{ to } 1$. Odds live in the asymmetric domain $[0, \\infty)$. By taking the natural logarithm of the odds—computing $\\ln(p / (1 - p))$—we unlock the entire infinite real number line $(-\\infty, +\\infty)$. Logistic regression does not assume that your explanatory variables linearly shift probability itself; rather, it posits that each unit change in a feature linearly increments the *log-odds*, which corresponds to multiplying the *odds ratio* by a constant geometric scale factor $e^{w_j}$.\n\nUnder the hood, we do not train logistic regression by minimizing squared residuals, because squaring probability errors creates a warped, non-convex landscape plagued with deceptive local traps. Instead, we embrace **Maximum Likelihood Estimation (MLE)** guided by **Binary Cross-Entropy Loss**. Imagine you are an auditor inspecting historical data: your objective is to rotate and tilt the decision boundary until the observed historical reality becomes the least surprising outcome possible. Binary cross-entropy acts as an unforgiving referee that levies an exponential penalty when the model is confidently wrong—such as assigning a $99\\%$ probability of repayment to a borrower who subsequently defaults.",
          "ar": "تخيل أنك تحاول قياس انحناءات إناء بلوري رقيق باستخدام مسطرة خشبية صلبة ومستقيمة. في الإحصاء الكلاسيكي، يؤدي تطبيق انحدار المربعات الصغرى العادي (OLS) على مسائل التصنيف الثنائي—وهو ما يُعرف بنموذج الاحتمال الخطي (Linear Probability Model)—إلى نفس الخطأ الميكانيكي الفادح. عندما نحاول التنبؤ بما إذا كان المقترض سيتعثر في سداد قرضه، أو ما إذا كان الورم خبيثاً، أو ما إذا كان العميل سيلغي اشتراكه، فإن النتيجة المستهدفة محصورة تماماً بين الصفر والواحد $\\{0, 1\\}$. لكن الخط المستقيم بطبيعته صلب وممتد بلا حدود: فمع ارتفاع نسبة ديون المقترض، سيتنبأ النموذج الخطي دون أي تردد باحتمال تعثر يبلغ $140\\%$، أو سيعطي احتمالاً سالباً مثل $-25\\%$ لمريض يتمتع بصحة ممتازة! هذه القيم غير المنطقية تنتهك أبسط بديهيات نظرية الاحتمالات الرياضية.\n\nيعالج الانحدار اللوجستي هذا الخلل الجوهري باستبدال المسطرة الخشبية الصلبة بـ **ممتص صدمات هيدروليكي مرن: منحنى السجمويد (Sigmoid S-curve)**. تخيل دالة السجمويد كغرفة تخميد انسيابية؛ تستقبل أي ناتج ترجيح خطي غير مقيد $z = \\mathbf{w}^T \\mathbf{x}$—سواء كان $-5,000$ أو $+42$ أو صفراً—وتقوم بضغطه وتعديله بسلاسة ليستقر دائماً داخل المجال الاحتمالي المفتوح $(0, 1)$. كلما اندفعت النتيجة الخطية نحو اللانهاية الموجبة، تشبع المنحنى تدريجياً مقترباً من اليقين التام ($1.0$)؛ وكلما هوت النتيجة نحو السالب السحيق، استقر المنحنى مقترباً من الاستحالة ($0.0$)، مستحيلاً عليه اختراق الحدود المنطقية للاحتمال.\n\nولفهم السر الكامن وراء هذا التوافق الهندسي، يجب أن نزيل الغموض عن مفهوم **الأرجحية ولوغاريتم الأرجحية (Log-Odds أو Logit)**. في الحياة اليومية، إذا كان احتمال فوز فريق ما هو $80\\%$ ($p = 0.8$)، فإن أرجحية الفوز (Odds) هي نسبة النجاح إلى الفشل، أي $0.8 / 0.2 = 4$ إلى $1$. تمتد الأرجحية في المجال الموجب $[0, \\infty)$. وحينما نأخذ اللوغاريتم الطبيعي لهذه الأرجحية $\\ln(p / (1-p))$، فإننا نحصل على خط الأعداد الحقيقية كاملاً من $-\\infty$ إلى $+\\infty$. لا يفترض الانحدار اللوجستي أن المتغيرات التفسيرية تغير الاحتمال بشكل خطي ومباشر؛ بل يفترض أنها تزيد لوغاريتم الأرجحية زيادة خطية، وهو ما يكافئ ضرب نسبة الأرجحية الحقيقية في معامل هندسي مضاعف $e^{w_j}$.\n\nلا يتم تدريب الانحدار اللوجستي بتقليل مجموع مربعات الأخطاء (MSE)، لأن تربيع أخطاء الاحتمالات يولد سطحاً متعرجاً غير محدب مليئاً بالفخاخ والقيعان المحلية المضللة. وبدلاً من ذلك، نستخدم **تقدير الأرجحية القصوى (Maximum Likelihood Estimation - MLE)** عبر تقليل **خسارة الإنتروبيا المتقاطعة الثنائية (Binary Cross-Entropy)**. تخيل أنك محقق يفحص وقائع تاريخية: هدفك هو تدوير وضبط حد الفصل (Decision Boundary) حتى يصبح الواقع التاريخي المشاهد هو النتيجة الأكثر احتمالاً والأقل مفاجأة رياضياً. وتعمل دالة الإنتروبيا المتقاطعة كحكم صارم يفرض غرامة فلكية تتصاعد أضعافاً مضاعفة عندما يكون النموذج واثقاً من تنبؤ خاطئ تماماً."
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
          "en": "The Sigmoid link function $\\sigma: \\mathbb{R} \\to (0, 1)$ transforms the linear score into a posterior class probability:\n\n$$\np_i \\equiv \\mathbb{P}(Y_i = 1 \\mid \\mathbf{x}_i; \\mathbf{w}) = \\sigma(z_i) = \\frac{1}{1 + e^{-z_i}} = \\frac{e^{z_i}}{1 + e^{z_i}}\n$$\n\n### Fundamental Algebraic Properties of the Sigmoid:\n1. **Symmetry:** $1 - \\sigma(z) = \\sigma(-z)$.\n2. **Derivative Factorization:**\n   $$\n   \\frac{d\\sigma(z)}{dz} = \\frac{e^{-z}}{(1 + e^{-z})^2} = \\sigma(z) \\left(1 - \\sigma(z)\\right)\n   $$\n3. **Logit Transformation:** The inverse link isolates the linear predictor:\n   $$\n   \\text{logit}(p_i) \\equiv \\ln \\left( \\frac{p_i}{1 - p_i} \\right) = \\mathbf{x}_i^T \\mathbf{w}\n   $$\n\n### Maximum Likelihood & Cross-Entropy Optimization\nModeling each observation as an independent Bernoulli trial, the joint likelihood function across $N$ observations is:\n\n$$\n\\mathcal{L}(\\mathbf{w}) = \\prod_{i=1}^N p_i^{y_i} (1 - p_i)^{1 - y_i} = \\prod_{i=1}^N \\sigma(\\mathbf{x}_i^T \\mathbf{w})^{y_i} \\left(1 - \\sigma(\\mathbf{x}_i^T \\mathbf{w})\\right)^{1 - y_i}\n$$\n\nTaking the negative natural logarithm and dividing by $N$ converts the product into the empirical **Binary Cross-Entropy Loss** $J(\\mathbf{w})$:\n\n$$\nJ(\\mathbf{w}) = -\\frac{1}{N} \\ln \\mathcal{L}(\\mathbf{w}) = -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\ln(p_i) + (1 - y_i) \\ln(1 - p_i) \\right]\n$$\n\n### Vectorized Gradient & Hessian\nUsing the chain rule and the derivative identity $\\sigma'(z) = p(1-p)$, the partial derivative with respect to weight vector $\\mathbf{w}$ collapses into a clean error-weighted residual:\n\n$$\n\\nabla_{\\mathbf{w}} J(\\mathbf{w}) = \\frac{1}{N} \\sum_{i=1}^N (p_i - y_i) \\mathbf{x}_i = \\frac{1}{N} \\mathbf{X}^T (\\mathbf{p} - \\mathbf{y})\n$$\n\nThe second-order derivative defines the $D \\times D$ Hessian matrix $\\mathbf{H}$:\n\n$$\n\\mathbf{H}(\\mathbf{w}) = \\nabla_{\\mathbf{w}}^2 J(\\mathbf{w}) = \\frac{1}{N} \\mathbf{X}^T \\mathbf{S} \\mathbf{X}, \\quad \\text{where } \\mathbf{S} = \\text{diag}\\left(p_1(1-p_1), \\dots, p_N(1-p_N)\\right)\n$$\n\nBecause $p_i \\in (0, 1)$, every diagonal element $p_i(1-p_i) > 0$. Consequently, $\\mathbf{S}$ is strictly positive definite, making $\\mathbf{H}$ positive semi-definite for any design matrix $\\mathbf{X}$. This mathematical guarantee proves that $J(\\mathbf{w})$ is strictly convex: it possesses a unique global minimum with zero risk of converging to suboptimal local traps.\n\n* $\\mathbf{x}_i \\in \\mathbb{R}^D$: Feature vector for the $i$-th observation, typically including a leading $1$ for bias.\n* $\\mathbf{w} \\in \\mathbb{R}^D$: Parameter weight vector governing the orientation and scale of the decision boundary.\n* $z_i = \\mathbf{x}_i^T \\mathbf{w}$: Unbounded linear logit score driving classification confidence.\n* $\\sigma(z) = \\frac{1}{1 + e^{-z}}$: Sigmoid activation function mapping real numbers to calibrated probabilities.\n* $p_i \\in (0, 1)$: Modeled posterior probability $\\mathbb{P}(Y_i = 1 \\mid \\mathbf{x}_i)$ of the positive class.\n* $\\text{logit}(p) = \\ln(p / (1-p))$: Natural log of the odds ratio, mapping bounded probability back to the real line.\n* $\\mathcal{L}(\\mathbf{w})$: Bernoulli likelihood function measuring probability of the observed dataset given weights $\\mathbf{w}$.\n* $J(\\mathbf{w})$: Binary Cross-Entropy loss function to be minimized via numerical optimization.\n* $\\nabla_{\\mathbf{w}} J$: Gradient vector dictating the direction of steepest ascent in empirical prediction error.\n* $\\mathbf{S} \\in \\mathbb{R}^{N \\times N}$: Diagonal weighting matrix of Bernoulli variances $p_i(1 - p_i)$ driving the curvature of the loss.\n* $\\mathbf{H} \\in \\mathbb{R}^{D \\times D}$: Hessian matrix ensuring global convexity and enabling Newton-Raphson optimization.\n\nImplement the vectorized Binary Logistic Regression optimization engine in NumPy. You will:\n1. Define a numerically robust Sigmoid activation $\\sigma(z) = \\frac{1}{1 + e^{-\\text{clip}(z)}}$ that guards against floating-point overflow.\n2. Compute the predicted posterior probabilities $\\mathbf{p} = \\sigma(\\mathbf{X}\\mathbf{w})$ across all training instances.\n3. Evaluate the analytical gradient vector $\\nabla_{\\mathbf{w}} J = \\frac{1}{N}\\mathbf{X}^T(\\mathbf{p} - \\mathbf{y})$.\n4. Update parameter weights iteratively via gradient descent: $\\mathbf{w} \\leftarrow \\mathbf{w} - \\eta \\nabla_{\\mathbf{w}} J$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
      "en": "In applied machine learning, celebrating raw classification \"accuracy\" is one of the most dangerous analytical traps in data science.",
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
          "en": "In applied machine learning, celebrating raw classification \"accuracy\" is one of the most dangerous analytical traps in data science. Imagine an automated airport security scanner inspecting 100,000 pieces of luggage each day, where exactly 10 bags contain dangerous contraband. A defective scanner that is completely disconnected from power—and mechanically stamps \"CLEAN\" on every single piece of luggage without examining it—will achieve an astonishing $99.99\\%$ accuracy! It will receive glowing performance reports while letting every single threat pass undetected through the terminal. In the real world, where catastrophic events (credit card fraud, metastatic tumors, structural dam failures) are inherently rare, raw accuracy is thoroughly blinded by the overwhelming majority class.\n\nTo see through this illusion, we partition classification outcomes into a **four-room grid known as the Confusion Matrix**. True Positives ($TP$) are genuine alarms that catch real threats; True Negatives ($TN$) are peaceful, correct clearances. The friction occurs in the error rooms: False Positives ($FP$) are nuisance false alarms that trigger needless panic and wasted labor, while False Negatives ($FN$) are silent, deadly misses. Two rival metrics govern this tension. **Precision** asks: *\"When the alarm blares, what is the probability there is an actual fire?\"* **Recall (Sensitivity)** asks: *\"Out of all the actual fires that broke out in the building, what fraction did our alarm detect?\"* Improving one almost inevitably degrades the other.\n\nA probabilistic classifier does not output rigid binary decisions; it emits continuous risk scores $\\hat{s}_i \\in [0, 1]$. Transforming these continuous scores into hard decisions requires choosing an operational threshold $\\tau$. Think of $\\tau$ as an adjustable volume knob on an alarm system. If you dial $\\tau$ all the way down to $0.0$, the alarm sounds continuously: you achieve $100\\%$ Recall (no danger is missed), but your Precision collapses as False Positives flood the operations center. If you crank $\\tau$ up to $1.0$, the alarm remains dead silent: zero false alarms, but complete blindness to reality. The **Receiver Operating Characteristic (ROC)** curve sweeps this threshold across its full continuum from $1.0$ down to $0.0$, plotting the True Positive Rate against the False Positive Rate to map the model's fundamental diagnostic frontier.\n\nThis brings us to the profound mathematical beauty of the **Area Under the ROC Curve (ROC-AUC)**. The AUC is not merely an abstract geometric area under a graph; it possesses an exact, non-parametric probabilistic meaning known as the **Wilcoxon-Mann-Whitney U equivalence**. Imagine staging a pairwise tournament: you randomly draw one positive observation (a patient confirmed to have the disease) and one negative observation (a healthy individual). The ROC-AUC is the exact mathematical probability that your model will assign a higher risk score to the sick patient than to the healthy individual! An AUC of $0.5$ represents pure coin-flipping randomness, while an AUC of $1.0$ represents a flawless sorting engine that never ranks a healthy instance above an afflicted one.",
          "ar": "في تعلم الآلة التطبيقي، يُعد الاحتفال بنسبة \"الدقة البسيطة\" (Accuracy) أحد أخطر الفخاخ الإحصائية التي قد يقع فيها مهندس البيانات. تخيل جهاز فحص أمني آلي في مطار دولي يفحص 100,000 حقيبة يومياً، من بينها 10 حقائب فقط تحتوي على مواد محظورة. لو أن هذا الجهاز كان عاطلاً ومفصولاً تماماً عن الكهرباء، ويقوم بطباعة عبارة \"سليمة\" على كل الحقائب دون أي فحص، لحقق دقة مذهلة تبلغ $99.99\\%$! سيحصل هذا الجهاز على إشادة شكلية كاذبة بينما تمر كافة الأخطار الحقيقية دون رصد. في الواقع العملي، وحيث تكون الأحداث الحرجة نادرة للغاية (مثل الاحتيال المالي، أو تشخيص الأورام السرطانية، أو انهيار السدود)، تصبح الدقة البسيطة مقياساً أعمى تشوهه الأغلبية الساحقة للحالات العادية.\n\nلكشف هذا التضليل، نقسم نتائج التصنيف إلى **مصفوفة الارتباك (Confusion Matrix)** المكونة من أربع حجرات. الحالات الإيجابية الحقيقية ($TP$) هي إنذارات صادقة رصدت الخطر الفعلي؛ والحالات السلبية الحقيقية ($TN$) هي عمليات فحص صحيحة مرت بسلام. أما الفجوة فتكمن في حجرتي الخطأ: الحالات الإيجابية الزائفة ($FP$) هي إنذارات كاذبة تسبب الذعر وتستنزف الجهد، بينما الحالات السلبية الزائفة ($FN$) هي إخفاق صامت وخطير في رصد الكارثة. وهنا يبرز صراع بين مقياسين: **الدقة التنبؤية (Precision)** التي تسأل: *\"عندما يطلق جهاز الإنذار صوته، ما احتمال وجود حريق حقيقي؟\"*، ومقياس **الاستدعاء أو الحساسية (Recall)** الذي يسأل: *\"من بين جميع الحرائق التي اندلعت بالفعل، كم حريقاً نجح النظام في اكتشافه؟\"*.\n\nلا ينتج النموذج الاحتمالي قرارات قاطعة، بل يولد درجات خطورة مستمرة $\\hat{s}_i \\in [0, 1]$. وتحويل هذه الدرجات إلى قرارات يتطلب اختيار عتبة تشغيلية $\\tau$. تخيل العتبة $\\tau$ كمقبض لضبط حساسية جهاز الإنذار: لو خفضت العتبة إلى $0.0$، فسيطلق الجهاز صفارته باستمرار، وبذلك تضمن استدعاءً بنسبة $100\\%$ دون إفلات أي خطر، ولكنك ستغرق في آلاف الإنذارات الكاذبة وتنهار الدقة التنبؤية. ولو رفعت العتبة إلى $1.0$، فسيصمت الجهاز تماماً ولن تصدر أي إنذارات كاذبة، لكنك ستفوت كل الكوارث الفعلية. يقوم **منحنى خصائص تشغيل المستقبل (ROC Curve)** بمسح هذه العتبة عبر جميع قيمها الممكنة من $1.0$ إلى $0.0$، راسماً الحساسية مقابل معدل الإنذارات الكاذبة ليحدد الأفق التشغيلي الكامل للنموذج.\n\nوهنا يكمن الجمال الرياضي لـ **المساحة تحت منحنى ROC (المعروفة بـ ROC-AUC)**. إن الـ AUC ليس مجرد مساحة هندسية صامتة تحت منحنى بياني، بل يحمل تفسيراً احتمالياً مطابقاً لـ **إحصاء مان-ويتني اللامعلمي (Wilcoxon-Mann-Whitney U)**: تخيل مواجهة فردية؛ حيث تسحب عشوائياً مريضاً مصاباً وشخصاً سليماً تماماً. يمثل ROC-AUC الاحتمال الرياضي الدقيق لأن يمنح نموذجك درجة خطورة للمريض المصاب أعلى من درجة الشخص السليم! تمثل قيمة $0.5$ نموذجاً عشوائياً يعادل رمي قطعة نقدية، بينما تمثل $1.0$ قدرة فرز خارقة لا تخطئ في ترتيب الأولويات أبداً."
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
          "en": "### The Formal Confusion Metrics Suite\nPartitioning the $N$ observations against ground truth labels yields:\n\n$$\n\\begin{aligned}\nTP(\\tau) &= \\sum_{i=1}^N \\mathbb{I}(\\hat{y}_i(\\tau) = 1 \\land y_i = 1), \\quad &FP(\\tau) &= \\sum_{i=1}^N \\mathbb{I}(\\hat{y}_i(\\tau) = 1 \\land y_i = 0) \\\\\nTN(\\tau) &= \\sum_{i=1}^N \\mathbb{I}(\\hat{y}_i(\\tau) = 0 \\land y_i = 0), \\quad &FN(\\tau) &= \\sum_{i=1}^N \\mathbb{I}(\\hat{y}_i(\\tau) = 0 \\land y_i = 1)\n\\end{aligned}\n$$\n\nFrom these cardinalities, we evaluate:\n- **True Positive Rate (Sensitivity / Recall):**\n  $$\n  \\text{TPR}(\\tau) = \\frac{TP(\\tau)}{TP(\\tau) + FN(\\tau)} = \\frac{TP(\\tau)}{n_+} = \\mathbb{P}(\\hat{s}_i \\ge \\tau \\mid Y_i = 1)\n  $$\n- **False Positive Rate ($1 - \\text{Specificity}$):**\n  $$\n  \\text{FPR}(\\tau) = \\frac{FP(\\tau)}{FP(\\tau) + TN(\\tau)} = \\frac{FP(\\tau)}{n_-} = \\mathbb{P}(\\hat{s}_i \\ge \\tau \\mid Y_i = 0)\n  $$\n- **Precision (Positive Predictive Value):**\n  $$\n  \\text{Precision}(\\tau) = \\frac{TP(\\tau)}{TP(\\tau) + FP(\\tau)} = \\mathbb{P}(Y_i = 1 \\mid \\hat{s}_i \\ge \\tau)\n  $$\n- **$F_\\beta$-Score (Harmonic Mean):**\n  $$\n  F_\\beta = (1 + \\beta^2) \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\beta^2 \\text{Precision} + \\text{Recall}} \\implies F_1 = \\frac{2 \\cdot TP}{2 \\cdot TP + FP + FN}\n  $$\n\n### The Wilcoxon-Mann-Whitney ROC-AUC Equivalence\nThe parametric ROC curve is defined by the set of coordinates $\\{(\\text{FPR}(\\tau), \\text{TPR}(\\tau)) : \\tau \\in [0, 1]\\}$. The Area Under the Curve is formally defined as:\n\n$$\n\\text{AUC} = \\int_0^1 \\text{TPR}(\\tau) \\, d\\text{FPR}(\\tau)\n$$\n\nBy integration by parts and Fubini's theorem, this geometric integral is mathematically identical to the normalized Wilcoxon-Mann-Whitney rank-sum test statistic:\n\n$$\n\\text{AUC} = \\mathbb{P}\\left(\\hat{s}_i > \\hat{s}_j \\mid y_i = 1, y_j = 0\\right) = \\frac{1}{n_+ n_-} \\sum_{i: y_i = 1} \\sum_{j: y_j = 0} \\left[ \\mathbb{I}(\\hat{s}_i > \\hat{s}_j) + \\frac{1}{2} \\mathbb{I}(\\hat{s}_i = \\hat{s}_j) \\right]\n$$\n\n### Fundamental Invariance Properties:\n1. **Threshold Independence:** ROC-AUC evaluates the classifier across all possible operating thresholds simultaneously, making it an intrinsic measure of score calibration and separability.\n2. **Monotonic Transformation Invariance:** Any strictly monotonic transformation $g(\\hat{s})$ (such as taking logarithms or scaling by positive constants) preserves the pairwise ordering $\\hat{s}_i > \\hat{s}_j$, leaving the ROC curve and the AUC value strictly unchanged.\n3. **Class Prevalence Invariance:** Because $\\text{TPR}$ is normalized strictly by $n_+$ and $\\text{FPR}$ is normalized strictly by $n_-$, changing the proportion of positive to negative samples in the testing cohort leaves the theoretical ROC curve invariant.\n\n* $y_i \\in \\{0, 1\\}$: Ground truth binary state ($1$ for target condition/positive, $0$ for baseline/negative).\n* $\\hat{s}_i \\in [0, 1]$: Continuous predicted risk score or probability assigned to observation $i$.\n* $\\tau \\in [0, 1]$: Decision threshold separating positive classifications from negative classifications.\n* $n_+, n_-$: Total count of actual positive ($n_+ = \\sum y_i$) and negative ($n_- = N - n_+$) instances.\n* $TP, FP, TN, FN$: Cardinalities of the four confusion matrix quadrants.\n* $\\text{TPR}(\\tau)$: True Positive Rate measuring sensitivity to detecting genuine positive cases.\n* $\\text{FPR}(\\tau)$: False Positive Rate measuring the frequency of erroneous false alarms among healthy cases.\n* $\\text{Precision}(\\tau)$: Probability that a flagged instance is genuinely afflicted.\n* $F_1$: Harmonic mean reconciling the inherent trade-off between Precision and Recall.\n* $\\text{AUC}$: Area Under the Receiver Operating Characteristic curve, measuring pairwise ranking accuracy.\n\nImplement the non-parametric Wilcoxon-Mann-Whitney ROC-AUC calculation and confusion matrix evaluation in NumPy. You will:\n1. Split predicted scores into positive $\\mathbf{s}_+$ and negative $\\mathbf{s}_-$ cohorts based on ground truth labels $y_i$.\n2. Compute pairwise concordant pairs ($\\hat{s}_i > \\hat{s}_j$) and tied pairs ($\\hat{s}_i = \\hat{s}_j$) via array broadcasting to evaluate exact ROC-AUC.\n3. Discretize continuous scores at default threshold $\\tau = 0.5$ to compute $TP$, $FP$, and $FN$.\n4. Calculate Precision, Recall, and $F_1$-score with proper division-by-zero safeguards.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
      "en": "Imagine relocating to an unfamiliar neighborhood in a bustling international city. You do not speak the local dialect, and you have no...",
      "ar": "تخيل أنك انتقلت حديثاً للعيش في حي سكني جديد داخل مدينة عالمية لا تعرف لغتها ولا عاداتها."
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
          "en": "Imagine relocating to an unfamiliar neighborhood in a bustling international city. You do not speak the local dialect, and you have no handbook detailing the community's cultural norms. If you want to know whether a local bakery down the street is reputable, what do you do? You do not formulate an elaborate system of simultaneous polynomial equations or optimize matrix derivatives. Instead, you simply lean over your garden fence, consult your three or five nearest neighbors, and follow the democratic consensus of their recommendations.\n\nThis everyday human instinct is the beating heart of **K-Nearest Neighbors (KNN)**, the quintessential non-parametric classification algorithm. Parametric models—such as Ordinary Least Squares or Logistic Regression—force data into rigid, pre-ordained mathematical straightjackets by decreeing that features must combine linearly or through an S-curve. If the true underlying decision boundary is an intricate labyrinth, a concentric ring, or an interlocking spiral, parametric models will fail catastrophically due to irreversible specification bias. KNN, by contrast, makes zero assumptions about underlying probability distributions or functional equations.\n\nKNN is famously described as a **\"lazy learner\" (instance-based learning)**. During the training phase, it performs virtually zero upfront computation: it does not distill data into weights, gradients, or concise formulas. Instead, it commits the entire training dataset to memory as a multi-dimensional spatial map. When an unlabelled query point arrives, the algorithm measures geometric distances across the metric space, identifies the $k$ closest historical neighbors, and conducts an impromptu democratic election: whichever class holds the majority among those $k$ neighbors claims the query point.\n\nThe hyperparameter $k$ serves as a physical tuning dial governing the fundamental **Bias-Variance tradeoff**:\n- When $k = 1$, the model possesses zero bias on training samples. Space is carved into a **Voronoi tessellation**—a mosaic of sharp polygonal cells where each training observation reigns supreme over its immediate geometric territory. However, variance is sky-high: a single mislabeled recording or noisy outlier creates an isolated island of error that distorts any new test queries wandering nearby.\n- As you dial $k$ upward toward the total sample size $N$, you dilute local geographic identity. At $k = N$, the voting district expands to encompass the entire population: the algorithm simply predicts the global majority class everywhere, driving variance to zero but incurring suffocating bias.",
          "ar": "تخيل أنك انتقلت حديثاً للعيش في حي سكني جديد داخل مدينة عالمية لا تعرف لغتها ولا عاداتها. إذا أردت معرفة ما إذا كان المخبز القريب يقدم طعاماً صحياً وموثوقاً، فماذا ستفعل؟ لن تبدأ بكتابة معادلات جبرية معقدة ولا بحساب مشتقات تفاضلية؛ بل ستخرج إلى شرفة منزلك لتسأل أقرب ثلاثة أو خمسة جيران يقيمون بجوارك، ثم تتبع رأي الأغلبية الديمقراطية بينهم.\n\nهذا الحدس البشري الفطري هو جوهر خوارزمية **الجيران الأقرب (K-Nearest Neighbors - KNN)**، وهي النموذج اللامعلمي الأبرز في تعلم الآلة الكلاسيكي. تفرض النماذج المعلمية—مثل الانحدار الخطي واللوجستي—قيوداً شكلية صارمة على البيانات؛ فتفترض مسبقاً أن العلاقات يجب أن تتخذ شكل خط مستقيم أو منحنى لوجستي. وإذا كانت الحدود الحقيقية الفاصلة بين الفئات معقدة أو متداخلة كالمتاهات والدوائر متحدة المركز، فإن تلك النماذج تعجز عن التقاطها. على النقيض من ذلك، لا تفترض خوارزمية KNN أي دالة مسبقة ولا تبني افتراضات مسبقة حول التوزيع الاحتمالي.\n\nتُصنف خوارزمية KNN بأنها **\"متعلم كسول\" (Lazy Learner)**؛ حيث إنها لا تبذل أي جهد حسابي أثناء مرحلة التدريب، ولا تحسب أوزاناً أو معاملات إحصائية مسبقة، بل تحتفظ بكامل خريطة بيانات التدريب في الذاكرة كما هي. وعندما تظهر نقطة جديدة غير مصنفة، تقيس الخوارزمية المسافات الهندسية في فضاء المتغيرات، وتحدد أقرب $k$ جيران لها، وتجري تصويتاً ديمقراطياً سريعاً تمنح فيه النقطة الجديدة فئة الأغلبية الفائزة بين هؤلاء الجيران.\n\nيعمل المعامل الفائق $k$ كـ **مفتاح ميكانيكي لضبط معضلة الانحياز والتباين (Bias-Variance Tradeoff)**:\n- فعندما يكون $k = 1$، ينعدم الانحياز في عينة التدريب تماماً، وينقسم الفضاء إلى خلايا فورونوي (Voronoi Tessellation)—وهي فسيفساء من المضلعات الهندسية تحكم فيها كل نقطة نطاقها الجغرافي الخاص. غير أن التباين ينفجر إلى أقصاه؛ لأن نقطة شاذة واحدة ملوثة بالضجيج ستصنع جيباً معزولاً من التنبؤ الخاطئ يشوه أي عينة اختبار مارة بقربها.\n- ومع زيادة قيمة $k$ مقتربة من إجمالي حجم العينة $N$، تتسع دائرة التصويت لتشمل كافة سكان المدينة، مما يمحو أي خصوصية محلية؛ لتتنبأ الخوارزمية عندئذ بالفئة العامة السائدة في كل مكان، فينخفض التباين إلى الصفر ويسيطر انحياز فادح يعمي النموذج عن الفروق الدقيقة."
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
          "en": "Prominent specializations include:\n- **Manhattan Distance ($p=1$):** $d_1(\\mathbf{x}, \\mathbf{z}) = \\sum_{j=1}^D |x_j - z_j|$ (grid-like city block motion).\n- **Euclidean Distance ($p=2$):** $d_2(\\mathbf{x}, \\mathbf{z}) = \\sqrt{\\sum_{j=1}^D (x_j - z_j)^2}$ (straight-line isotropic ruler).\n\n### The K-Nearest Neighbors Neighborhood\nGiven a query vector $\\mathbf{x}_{\\text{query}} \\in \\mathbb{R}^D$, let $\\pi$ denote the permutation of indices $\\{1, \\dots, N\\}$ sorting training instances in non-decreasing distance order:\n\n$$\nd(\\mathbf{x}_{\\text{query}}, \\mathbf{x}_{\\pi(1)}) \\le d(\\mathbf{x}_{\\text{query}}, \\mathbf{x}_{\\pi(2)}) \\le \\dots \\le d(\\mathbf{x}_{\\text{query}}, \\mathbf{x}_{\\pi(N)})\n$$\n\nThe $k$-nearest neighborhood set is defined as:\n\n$$\n\\mathcal{N}_k(\\mathbf{x}_{\\text{query}}) = \\{\\pi(1), \\pi(2), \\dots, \\pi(k)\\}\n$$\n\n### Posterior Probability & Decision Rule\nThe modeled posterior probability of belonging to class $c \\in \\{1, \\dots, C\\}$ is the empirical sample proportion within the neighborhood:\n\n$$\n\\hat{\\mathbb{P}}(Y = c \\mid \\mathbf{x}_{\\text{query}}) = \\frac{1}{k} \\sum_{i \\in \\mathcal{N}_k(\\mathbf{x}_{\\text{query}})} \\mathbb{I}(y_i = c)\n$$\n\nThe deterministic Bayes plug-in classification rule selects the mode:\n\n$$\n\\hat{y}(\\mathbf{x}_{\\text{query}}) = \\arg\\max_{c \\in \\{1, \\dots, C\\}} \\hat{\\mathbb{P}}(Y = c \\mid \\mathbf{x}_{\\text{query}})\n$$\n\n### Effective Degrees of Freedom\nUnlike parametric models whose capacity is fixed by parameter count $P$, a KNN classifier's capacity is governed inversely by neighborhood size:\n\n$$\n\\text{df}_{\\text{eff}} \\approx \\frac{N}{k}\n$$\n\nWhen $k=1$, the model possesses $N$ effective parameters (one per data point), maximizing model flexibility. When $k=N$, the model simplifies to a single global constant prediction ($\\text{df} = 1$).\n\n### The Cover-Hart Theorem (1967)\nLet $R^*$ denote the optimal, irreducible Bayes error rate under the true data-generating distribution. Thomas Cover and Peter Hart proved that as sample size $N \\to \\infty$, the asymptotic error rate of the unweighted 1-Nearest Neighbor classifier $R_{1\\text{-NN}}$ satisfies:\n\n$$\nR^* \\le R_{1\\text{-NN}} \\le 2 R^* (1 - R^*) \\le 2 R^*\n$$\n\nThis milestone theorem guarantees that a purely local, memory-based classifier captures at least half of the total predictive information available in the universe without estimating a single regression parameter!\n\n* $\\mathbf{x}_i \\in \\mathbb{R}^D$: $D$-dimensional feature coordinates of training observation $i$.\n* $y_i \\in \\{1, \\dots, C\\}$: Categorical ground-truth class label.\n* $d_p(\\mathbf{x}, \\mathbf{z})$: Minkowski metric measuring geometric separation in $L_p$ space.\n* $\\mathcal{N}_k(\\mathbf{x})$: Set of indices corresponding to the $k$ closest training points to query point $\\mathbf{x}$.\n* $k$: User-specified hyperparameter controlling neighborhood voting size.\n* $\\hat{\\mathbb{P}}(Y = c \\mid \\mathbf{x})$: Local empirical probability of class $c$ within the query neighborhood.\n* $\\hat{y}(\\mathbf{x})$: Final predicted class label assigned via majority mode consensus.\n* $\\text{df}_{\\text{eff}} \\approx N / k$: Effective degrees of freedom measuring model complexity.\n* $R^*$: Theoretical Bayes error rate representing irreducible classification noise.\n* $R_{1\\text{-NN}}$: Asymptotic classification error rate of the 1-Nearest Neighbor algorithm.\n\nImplement a fully vectorized K-Nearest Neighbors classifier in NumPy. You will:\n1. Compute the pairwise squared Euclidean distance matrix between query samples and training samples using the expanded quadratic formula: $\\|\\mathbf{x} - \\mathbf{z}\\|_2^2 = \\|\\mathbf{x}\\|_2^2 + \\|\\mathbf{z}\\|_2^2 - 2\\mathbf{x}^T\\mathbf{z}$.\n2. Extract the indices of the $k$ smallest distances for each query point using `np.argpartition`.\n3. Gather the ground-truth training labels corresponding to those nearest neighbors.\n4. Compute the modal class label for each query point to output discrete predictions.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
      "en": "Human spatial intuition was forged over evolutionary history in an exclusively three-dimensional world.",
      "ar": "تكون الإدراك البشري عبر التاريخ ليتفاعل حصرياً مع عالم فيزيائي ثلاثي الأبعاد. ولكن عندما يخطو مهندس تعلم الآلة نحو فضاءات تضم مئات أو آلاف..."
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
          "en": "Human spatial intuition was forged over evolutionary history in an exclusively three-dimensional world. When machine learning practitioners venture beyond three dimensions into hundreds or thousands of dimensions—processing 512-dimensional computer vision representations, 1,536-dimensional Large Language Model embeddings, or 20,000-dimensional genomic profiles—geometric physics warps into a bizarre, counterintuitive reality. Richard Bellman (1957) christened this phenomenon **The Curse of Dimensionality** to describe the catastrophic exponential explosion of volume that empties out high-dimensional spaces.\n\nTo feel this visually, consider the famous **Hyper-Orange Peel Paradox**. When you peel a standard 3D orange, the thin outer rind accounts for only a modest fraction of the fruit's volume; the vast majority of the orange is juicy, delicious pulp packed tightly inside the interior. Now imagine a 100-dimensional hyper-orange! As dimension $D$ climbs, the ratio of the volume of an inscribed sphere to its enclosing bounding box collapses exponentially to zero: $\\lim_{D \\to \\infty} \\frac{V_D(r)}{C_D(2r)} = 0$. By the time you reach 100 dimensions, more than $99.9999\\%$ of the orange's entire mass has migrated outward into the paper-thin rind! The center of a high-dimensional space is a barren, desolate vacuum: all data points are exiled to the outer skin, corners, and spiky fringes of the hypercube.\n\nThis geometric migration leads directly to the **Death of Nearness (The Distance Concentration Phenomenon)**. What does it mean for two points to be \"neighbors\"? In two or three dimensions, you can easily point to a cluster of nearby friends and contrast them with strangers far across town. But in 1,000 dimensions, as proved by Kevin Beyer and colleagues (1999), the relative contrast between the distance to your *nearest* neighbor ($D_{\\min}$) and the distance to your *farthest* neighbor ($D_{\\max}$) converges to zero in probability: $\\frac{D_{\\max} - D_{\\min}}{D_{\\min}} \\to 0$. In high dimensions, every observation is virtually the exact same distance away from you! The concept of geometric proximity evaporates, leaving distance-based algorithms chasing random floating-point noise rather than genuine semantic relationships.\n\nThis spatial catastrophe completely shatters classical computer science indexing. In low dimensions ($D \\le 15$), spatial data structures like **KD-Trees** work like magic: they recursively slice space along coordinate hyperplanes, enabling lightning-fast $O(\\log N)$ nearest-neighbor lookups. But in 1,536 dimensions, any query sphere of reasonable radius inevitably intersects almost every dividing hyperplane in the tree. The algorithm is forced to backtrack across all $2^D$ branches, transforming what was supposed to be an elegant tree search into a clumsy, pointer-heavy brute-force scan that is actually *slower* than a raw linear array traversal.",
          "ar": "تكون الإدراك البشري عبر التاريخ ليتفاعل حصرياً مع عالم فيزيائي ثلاثي الأبعاد. ولكن عندما يخطو مهندس تعلم الآلة نحو فضاءات تضم مئات أو آلاف الأبعاد—كالتعامل مع متجهات الرؤية الحاسوبية (512 بعداً)، أو تضمينات النماذج اللغوية الكبيرة (1,536 بعداً)، أو المؤشرات الجينومية (20,000 بعد)—تتحول قوانين الهندسة الإقليدية إلى واقع غرائبي صادم. أطلق عالم الرياضيات ريتشارد بيلمان (1957) على هذه المعضلة اسم **\"لعنة الأبعاد\" (The Curse of Dimensionality)** لوصف الانفجار الأسي لحجم الفضاء الذي يفرغ البيانات من محتواها الموضعي.\n\nولاستيعاب هذه الظاهرة حسياً، تأمل **مفارقة قشرة البرتقال الفائقة (Hyper-Orange Paradox)**: عندما تقشر برتقالة عادية في عالمنا ثلاثي الأبعاد، فإن القشرة الخارجية تمثل نسبة ضئيلة جداً من الحجم الكلي، بينما يتركز معظم الحجم في اللب الداخلي العصيري. والآن تخيل برتقالة فائقة في فضاء ذي 100 بعد! مع تزايد الأبعاد $D$، تهوي نسبة حجم الكرة الداخلية المحاطة بمكعب نحو الصفر رياضياً: $\\lim_{D \\to \\infty} \\frac{V_D(r)}{C_D(2r)} = 0$. وعند الوصول إلى 100 بعد، يهاجر أكثر من $99.9999\\%$ من إجمالي كتلة البرتقالة نحو القشرة الخارجية الدقيقة! يتحول مركز الفضاء عالي الأبعاد إلى فراغ كوني مهجور، وتُنفى جميع نقاط البيانات نحو الأطراف والزوايا الحادة للمكعب الفائق.\n\nيقود هذا التشوه الهندسي إلى **تلاشي مفهوم \"الجوار\" (ظاهرة انكماش المسافات - Distance Concentration)**. ماذا يعني أن تكون نقطتان \"متجاورتين\"؟ في البعدين أو الثلاثة أبعاد، يمكنك بسهولة تمييز جارك القريب من شخص آخر يبتعد عنك بأميال. ولكن في فضاء ذي 1,000 بعد، وكما أثبت باير وزملاؤه (1999)، ينكمش التباين النسبي بين المسافة إلى أقرب جار ($D_{\\min}$) والمسافة إلى أبعد جار ($D_{\\max}$) ليقترب من الصفر احتمالياً: $\\frac{D_{\\max} - D_{\\min}}{D_{\\min}} \\to 0$. في الأبعاد الشاهقة، تصبح جميع النقاط على نفس المسافة منك تقريباً! يتلاشى مفهوم القرب المكاني، وتبدأ خوارزميات المسافة في ملاحقة ضجيج حسابي عشوائي لا قيمة له.\n\nيدمر هذا الانهيار هياكل البيانات المكانية الكلاسيكية؛ ففي الأبعاد المنخفضة ($D \\le 15$)، تعمل **أشجار KD-Trees** ببراعة خارقة عبر تقسيم الفضاء بمستويات متعامدة للبحث في زمن سريع $O(\\log N)$. لكن في فضاء ذي 1,536 بعداً، تتقاطع كرة البحث الحتمية مع جميع مستويات التقسيم تقريباً، مما يجبر الخوارزمية على التراجع وفحص كافة الفروع البالغ عددها $2^D$ فرعاً، لتتحول الشجرة الأنيقة إلى فحص شامل بطيء ومكلف يفوق بطء البحث الخطي المباشر."
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
          "en": "where $\\Gamma(z) = \\int_0^\\infty t^{z-1} e^{-t} dt$ is Euler's Gamma function ($\\Gamma(k+1) = k!$ for integers). The volume of the enclosing hypercube is:\n\n$$\nC_D(2r) = (2r)^D\n$$\n\nEvaluating the ratio of volumes:\n\n$$\n\\rho_D \\equiv \\frac{V_D(r)}{C_D(2r)} = \\frac{\\pi^{D/2}}{2^D \\Gamma\\left(\\frac{D}{2} + 1\\right)} = \\frac{1}{D!} \\left( \\frac{\\pi}{4} \\right)^{D/2} \\xrightarrow{D \\to \\infty} 0\n$$\n\nBy Stirling's asymptotic formula ($\\Gamma(\\frac{D}{2} + 1) \\sim \\sqrt{\\pi D} (\\frac{D}{2e})^{D/2}$), the factorial growth in the denominator completely obliterates the exponential numerator, proving that the volume of the sphere relative to the hypercube vanishes asymptotically to zero.\n\n### The Distance Concentration Theorem (Beyer et al. 1999)\nLet $\\mathbf{X}_1, \\dots, \\mathbf{X}_N$ be independent random vectors in $\\mathbb{R}^D$ drawn from a distribution with finite moments. Let $\\mathbf{Q} \\in \\mathbb{R}^D$ be a fixed query point. Define:\n\n$$\nD_{\\min}^{(D)} \\equiv \\min_{1 \\le i \\le N} \\|\\mathbf{X}_i - \\mathbf{Q}\\|_p, \\quad D_{\\max}^{(D)} \\equiv \\max_{1 \\le i \\le N} \\|\\mathbf{X}_i - \\mathbf{Q}\\|_p\n$$\n\nIf the variance condition $\\lim_{D \\to \\infty} \\frac{\\text{Var}(\\|\\mathbf{X}_i - \\mathbf{Q}\\|_p)}{D \\cdot \\mathbb{E}[\\|\\mathbf{X}_i - \\mathbf{Q}\\|_p]^2} = 0$ is satisfied, then:\n\n$$\n\\frac{D_{\\max}^{(D)} - D_{\\min}^{(D)}}{D_{\\min}^{(D)}} \\xrightarrow{p} 0 \\quad \\text{as } D \\to \\infty\n$$\n\nAs dimensionality explodes, the relative contrast $\\mathcal{R}_{\\text{contrast}}$ between the closest point and the farthest point vanishes, rendering nearest-neighbor discrimination mathematically ill-posed.\n\n### KD-Tree Algorithmic Degeneration\nA classical KD-Tree recursively partitions samples along median hyperplanes:\n1. **Axis Selection:** Choose split feature $j = \\text{depth} \\pmod D$.\n2. **Median Split:** Find median threshold $s = \\text{median}(\\{X_{i, j}\\})$.\n3. **Partition:** Divide points into left child $\\mathcal{D}_L = \\{i : X_{i, j} \\le s\\}$ and right child $\\mathcal{D}_R = \\{i : X_{i, j} > s\\}$.\n\nFor a nearest-neighbor query ball with radius $R = D_{\\min}$, the probability that the ball intersects a coordinate bounding plane is:\n\n$$\n\\mathbb{P}(\\text{Intersect}) \\propto \\min\\left(1, \\frac{R}{\\Delta x_j}\\right)\n$$\n\nIn high dimensions, because $R = O(\\sqrt{D})$, the query ball intersects almost all bounding hyperplanes simultaneously. The number of leaf nodes visited by the branch-and-bound pruning search scales as $O(2^D)$, deteriorating the algorithmic search complexity from $O(\\log N)$ to $O(2^D \\log N) \\approx O(N)$.\n\n* $D \\in \\mathbb{N}$: Dimensionality of the metric space ($D \\gg 1$ defines high-dimensional regimes).\n* $N$: Total number of training samples indexed in the dataset.\n* $V_D(r)$: Volume of a $D$-dimensional hypersphere of radius $r$.\n* $C_D(2r)$: Volume of an enclosing $D$-dimensional hypercube of edge length $2r$.\n* $\\Gamma(z)$: Euler's Gamma function extending factorials to continuous real domains.\n* $\\rho_D = \\frac{V_D(r)}{C_D(2r)}$: Volume ratio proving mass concentration in hypercube corners.\n* $D_{\\min}, D_{\\max}$: Minimum and maximum Euclidean distances from a query point to the dataset.\n* $\\mathcal{R}_{\\text{contrast}} = \\frac{D_{\\max} - D_{\\min}}{D_{\\min}}$: Relative distance contrast quantifying discrimination ability.\n* $s$: Spatial median splitting threshold chosen at depth level $j$ during KD-Tree construction.\n\nImplement the empirical distance contrast computation in NumPy to measure the Curse of Dimensionality. You will:\n1. Compute all pairwise squared Euclidean distances across the dataset: $\\|\\mathbf{x}_i - \\mathbf{x}_j\\|_2^2 = \\|\\mathbf{x}_i\\|_2^2 + \\|\\mathbf{x}_j\\|_2^2 - 2\\mathbf{x}_i^T\\mathbf{x}_j$.\n2. Take the element-wise square root with numerical clamping $\\max(d^2, 0.0)$.\n3. Mask the diagonal elements using `np.fill_diagonal(..., np.nan)` to exclude self-distances ($d(\\mathbf{x}_i, \\mathbf{x}_i) = 0$).\n4. Compute the minimum pairwise distance $d_{\\min}$, maximum distance $d_{\\max}$, and the relative contrast ratio $\\frac{d_{\\max} - d_{\\min}}{d_{\\min}}$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
      "en": "Remember playing the classic parlor game \"20 Questions\" as a child? You do not attempt to guess an opponent's secret animal by multiplying...",
      "ar": "تذكر لعبة الطفولة الشهيرة \"20 سؤالاً\": عندما تحاول تخمين حيوان سري يفكر فيه صديقك، فإنك لا تلجأ لمعادلات جبرية معقدة، بل تطرح أسئلة ثنائية..."
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
          "en": "Remember playing the classic parlor game **\"20 Questions\"** as a child? You do not attempt to guess an opponent's secret animal by multiplying arbitrary numbers or solving a system of simultaneous equations. Instead, you pose sharp, hierarchical, binary questions designed to cut ambiguity in half: *\"Is it warm-blooded?\"* If yes: *\"Does it live on land?\"* If yes: *\"Does it have orange fur with black stripes?\"* With fewer than ten well-crafted yes-or-no questions, you can effortlessly isolate a Bengal tiger out of millions of candidate organisms on Earth.\n\nThis hierarchical process mirrors the architecture of **Decision Trees (CART - Classification and Regression Trees)**, pioneered by Leo Breiman, Jerome Friedman, Richard Olshen, and Charles Stone (1984). While linear models force the world into rigid additive formulas—assuming every feature acts independently—real-world phenomena are intensely conditional and interaction-heavy. In emergency medicine, elevated heart rate is benign in a marathon runner, but life-threatening in an elderly patient experiencing chest trauma. A decision tree naturally captures these non-linear logical interactions by partitioning feature space into a patchwork of orthogonal, axis-aligned rectangular boxes.\n\nAt every internal node of the tree, the algorithm acts as an impatient, greedy optimizer. Imagine having a bucket filled with 50 red marbles and 50 blue marbles. The bucket is thoroughly mixed, disordered, and **impure**: if you reach in blindfolded and draw two marbles, there is a $50\\%$ chance they will have different colors. The tree's mission is to search across every available feature $j$ and every possible numerical threshold $s$ (e.g., *\"Is Systolic BP $> 140$?\"*) to find the single dividing cut that splits the bucket into two child groups that are as pure and homogeneous as possible. This degree of purity is quantified mathematically using **Gini Impurity** or **Shannon Entropy**.\n\nHowever, an unconstrained decision tree is like an overgrown, invasive weed. If left to grow unchecked, the tree will continue sprouting bifurcating branches until every single historical training sample rests in its own isolated leaf node. The resulting tree will boast a flawless $100\\%$ training accuracy, but it has simply memorized idiosyncratic noise and measurement artifacts—the textbook definition of **overfitting**. To cultivate an interpretable, generalizable tree, **Cost-Complexity Pruning** introduces mathematical gardening shears: it penalizes the tree by a complexity factor $\\alpha |\\tilde{\\mathcal{T}}|$ for every additional leaf, pruning away brittle outer twigs whose marginal gain in purity fails to justify their structural complexity.",
          "ar": "تذكر لعبة الطفولة الشهيرة **\"20 سؤالاً\"**: عندما تحاول تخمين حيوان سري يفكر فيه صديقك، فإنك لا تلجأ لمعادلات جبرية معقدة، بل تطرح أسئلة ثنائية هرمية ذكية تقسم دائرة الاحتمالات إلى النصف في كل خطوة: *\"هل هو ذو دم حار؟\"* فإذا كانت الإجابة نعم: *\"هل يعيش على اليابسة؟\"* فإذا كانت نعم: *\"هل يمتلك فراءً مخططاً؟\"*. ومن خلال بضعة أسئلة محكمة، تستطيع تمييز النمر البنغالي من بين ملايين الكائنات الحية على وجه الأرض بسهولة مدهشة.\n\nهذه البنية الهرمية الذكية هي جوهر **أشجار القرار (Classification and Regression Trees - CART)** التي ابتكرها ليو بريمان وزملاؤه (1984). في حين تجبر النماذج الخطية العالم الحقيقي على الخضوع لعلاقات جمعية صلبة تفترض استقلال المتغيرات، فإن الواقع الإنساني والبيولوجي حافل بالتفاعلات الشرطية المتشابكة؛ فارتفاع نبضات القلب أمر طبيعي تماماً لدى رياضي يمارس الجري، ولكنه مؤشر خطر داهم لدى مريض مسن يعاني من آلام في الصدر. تلتقط أشجار القرار هذه الشروط المنطقية المعقدة بصورة فطرية عبر تقسيم فضاء المتغيرات إلى مربعات ومكعبات متعامدة هندسياً.\n\nعند كل عقدة داخلية، تعمل الشجرة كمحسن طماع يبحث عن النقاء المطلق. تخيل وعاءً يحتوي على 50 كرة حمراء و 50 كرة زرقاء؛ هذا الوعاء مفرط في الفوضى والخلط واللايقين؛ فإذا سحبت كرتين عشوائياً وأنت معصوب العينين، فهناك احتمال $50\\%$ ألا تتطابق ألوانهما. هدف الشجرة عند كل تفرع هو مسح جميع المتغيرات وكافة العتبات الرقمية الممكنة لاكتشاف السؤال القاطع الذي يقسم الوعاء إلى مجموعتين فرعيتين بأعلى درجة ممكنة من النقاء والصفاء (Impurity Reduction)، ويتم قياس هذا النقاء رياضياً عبر **لايقين جيني (Gini Impurity)** أو **إنتروبيا شانون (Shannon Entropy)**.\n\nلكن الشجرة التي تُترك تنمو بلا قيود تشبه نباتاً برياً طفيلياً؛ حيث ستواصل التفرع بلا نهاية حتى تنعزل كل نقطة تدريب واحدة في ورقة مستقلة خاصة بها. ستحقق الشجرة دقة تدريب كاذبة بنسبة $100\\%$، لكنها لم تتعلم شيئاً سوى حفظ الضجيج العشوائي للعينة (Overfitting). ولتهذيب هذا النمو الجامح، يطبق **تقليم التكلفة والتعقيد (Cost-Complexity Pruning)** مقصاً رياضياً حاسماً: يفرض جزاءً عقابياً $\\alpha |\\tilde{\\mathcal{T}}|$ على كل ورقة شجرية إضافية، ليقص الفروع الهشة والزوائد الهامشية التي لا يقدم نقاؤها إضافة حقيقية تبرر تعقيد هيكل الشجرة."
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
          "en": "### Node Impurity Measures\nTo evaluate the heterogeneity of node $m$, CART relies on concave uncertainty metrics:\n\n1. **Gini Impurity (Expected Misclassification under Random Labeling):**\n   $$\n   I_G(m) = 1 - \\sum_{k=1}^K p_{mk}^2 = \\sum_{k=1}^K p_{mk}(1 - p_{mk})\n   $$\n   For binary classification where $p \\equiv p_{m1}$, this simplifies to $I_G(m) = 2p(1 - p)$, with a maximum of $0.5$ at $p = 0.5$ and a minimum of $0.0$ at pure consensus ($p \\in \\{0, 1\\}$).\n\n2. **Cross-Entropy / Shannon Information Entropy:**\n   $$\n   H(m) = -\\sum_{k=1}^K p_{mk} \\log_2(p_{mk})\n   $$\n   Measured in bits of uncertainty, reaching a maximum of $\\log_2(K)$ under uniform class dispersion.\n\n### Greedy Bipartition Splitting Criterion\nAt node $m$, CART performs an exhaustive search across every feature $j \\in \\{1, \\dots, P\\}$ and every candidate split threshold $s \\in \\mathbb{R}$. A candidate split divides $\\mathcal{S}_m$ into left and right children:\n\n$$\n\\mathcal{S}_L(j, s) = \\{i \\in \\mathcal{S}_m : X_{ij} \\le s\\}, \\quad \\mathcal{S}_R(j, s) = \\{i \\in \\mathcal{S}_m : X_{ij} > s\\}\n$$\n\nThe optimal split $(j^*, s^*)$ maximizes the **Impurity Reduction (Information Gain)**:\n\n$$\n\\Delta I(m, j, s) = I(m) - \\left[ \\frac{N_L}{N_m} I\\left(\\mathcal{S}_L(j, s)\\right) + \\frac{N_R}{N_m} I\\left(\\mathcal{S}_R(j, s)\\right) \\right]\n$$\n\n### Minimal Cost-Complexity Pruning\nLet $\\mathcal{T}_{\\max}$ denote the fully expanded, unconstrained tree. For any sub-tree $\\mathcal{T} \\subseteq \\mathcal{T}_{\\max}$, let $\\tilde{\\mathcal{T}}$ denote its set of terminal leaf nodes. The cost-complexity criterion defines an objective that penalizes tree size:\n\n$$\n\\mathcal{R}_\\alpha(\\mathcal{T}) = \\sum_{m \\in \\tilde{\\mathcal{T}}} N_m I(m) + \\alpha |\\tilde{\\mathcal{T}}|\n$$\n\nwhere:\n- $\\sum_{m \\in \\tilde{\\mathcal{T}}} N_m I(m)$: Total empirical misclassification or impurity across all terminal leaves.\n- $|\\tilde{\\mathcal{T}}|$: Total leaf count parameterizing tree structural complexity.\n- $\\alpha \\ge 0$: Regularization hyperparameter governing the penalty per additional leaf node.\n\nBreiman proved that as $\\alpha$ increases from $0$ to $\\infty$, there exists a unique, nested sequence of subtrees $\\mathcal{T}_{\\max} = \\mathcal{T}_0 \\supset \\mathcal{T}_1 \\supset \\mathcal{T}_2 \\supset \\dots \\supset \\text{root}$. For each internal branch node $t$, the weakest-link collapsing threshold is:\n\n$$\n\\alpha_{\\text{eff}}(t) = \\frac{R(t) - R(\\mathcal{T}_t)}{|\\tilde{\\mathcal{T}}_t| - 1}\n$$\n\nThe branch with the smallest $\\alpha_{\\text{eff}}$ is pruned first, providing a principled path to tune tree size via held-out cross-validation.\n\n* $m$: Current tree node indexing regional feature subset $\\mathcal{S}_m$.\n* $N_m = |\\mathcal{S}_m|$: Number of training samples residing inside node $m$.\n* $p_{mk}$: Proportion of samples in node $m$ that belong to class $k$.\n* $I_G(m)$: Gini impurity quantifying the variance of class indicators.\n* $H(m)$: Shannon entropy quantifying average information content in bits.\n* $j, s$: Candidate feature dimension and numerical threshold defining a coordinate cutting hyperplane.\n* $\\Delta I(m, j, s)$: Impurity reduction (information gain) achieved by splitting node $m$ on $(j, s)$.\n* $\\mathcal{T}$: Any candidate subtree obtained by collapsing internal branches.\n* $\\tilde{\\mathcal{T}}$: Set of terminal leaf nodes representing final prediction partitions.\n* $|\\tilde{\\mathcal{T}}|$: Integer leaf count quantifying structural tree complexity.\n* $\\alpha \\ge 0$: Cost-complexity regularization penalty per terminal leaf.\n* $\\alpha_{\\text{eff}}(t)$: Effective threshold value at which collapsing internal branch $t$ minimizes cost-complexity.\n\nImplement the core CART split evaluation engine using Gini impurity in NumPy. You will:\n1. Define the Gini impurity function $I_G(\\mathbf{y}) = 1 - \\sum p_k^2$ for any array of discrete integer labels.\n2. Evaluate the baseline parent node impurity.\n3. Iterate over all feature dimensions $j$ and candidate thresholds (midpoints between adjacent sorted unique values).\n4. Partition samples into left and right child subsets, compute the weighted child impurity, and record the split $(j^*, s^*)$ yielding maximum impurity reduction.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
      "en": "While a single CART decision tree provides unmatched interpretability, it suffers from a notorious structural vulnerability: trees are...",
      "ar": "تتميز شجرة القرار الفردية بسهولة تفسيرها ووضوح مساراتها، لكنها تعاني من نقطة ضعف هيكلية قاتلة: وهي التباين الإحصائي المفرط (High Variance)."
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
          "en": "While a single CART decision tree provides unmatched interpretability, it suffers from a notorious structural vulnerability: trees are hypersensitive and possess massive statistical variance. A microscopic tremor in the training data—such as tweaking three numbers out of ten thousand—can cause the root split to pivot to a completely different feature. This initial divergence cascades down every subsequent branch, altering the architecture of the entire tree and producing wildly contradictory predictions for the exact same patient. Trusting a single unpruned decision tree with high-stakes decisions is like putting your life in the hands of an eccentric, hyper-sensitive physician who overreacts to every fleeting symptom and rushes to perform radical surgery.\n\nIn 2001, Leo Breiman transformed machine learning by formulating the **Random Forest**. Instead of trusting a single volatile practitioner, you convene a **council of 500 independent, highly qualified doctors who cast a democratic majority vote on the diagnosis**. If one physician is misled by idiosyncratic noise in their specific patient notes, their individual error is effortlessly canceled out and overwhelmed by the collective wisdom of the remaining 499 doctors.\n\nTo make this committee work, you must guarantee that the doctors do not all read the exact same medical chart or copy each other's opinions. Random Forests enforce independence through two clever layers of stochastic randomization:\n1. **Bagging (Bootstrap Aggregation):** Each tree is cultivated on a distinct resampled dataset constructed by drawing $N$ samples *with replacement* from the original training corpus.\n2. **Random Feature Subspace Sampling:** This was Breiman's defining stroke of mathematical genius. If one dominant symptom (such as massive tumor diameter) is overwhelmingly predictive, every single tree in the forest would greedily select it for the root split. The resulting trees would become clones of each other, sharing massive positive correlation! By forcing each node to choose its split from a randomly chosen sub-palette of $m \\approx \\sqrt{p}$ candidate features, Random Forests break this herd behavior. Trees are forced to explore secondary and tertiary signals, resulting in deeply decorrelated individual models.\n\nThe mathematical miracle of decorrelation is grounded in elementary probability: when you average $B$ independent, uncorrelated random variables, their collective variance collapses to zero at a rate of $1/B$. But if the estimators share a positive pairwise correlation $\\rho$, the variance hits an irreducible asymptotic barrier: $\\lim_{B \\to \\infty} \\text{Var} = \\rho \\sigma^2$. By driving $\\rho$ downward toward zero through feature subsampling, Random Forests slash this variance barrier, turning noisy, high-variance decision trees into an elite, robust predictive engine.",
          "ar": "تتميز شجرة القرار الفردية بسهولة تفسيرها ووضوح مساراتها، لكنها تعاني من نقطة ضعف هيكلية قاتلة: وهي التباين الإحصائي المفرط (High Variance). فأي تغير طفيف أو ضجيج عابر في بيانات التدريب—كتعديل ثلاث قيم من بين عشرة آلاف—قد يقلب التفرع الجذري للشجرة بالكامل. هذا التغير الأولي يتدحرج ككرة ثلج عبر كافة التفرعات اللاحقة، مما يغير هندسة الشجرة بأكملها ويؤدي إلى تنبؤات متضاربة للحالة نفسها. إن الاعتماد على شجرة قرار فردية غير مقلمة في قرارات حاسمة يشبه وضع حياتك بين يدي طبيب غريب الأطوار، يبالغ في رد فعله تجاه كل عَرَض طفيف ويسارع إلى اتخاذ قرارات جراحية متسرعة.\n\nفي عام 2001، أحدث ليو بريمان ثورة تاريخية في تعلم الآلة عندما ابتكر **الغابات العشوائية (Random Forests)**. فبدلاً من الاعتماد على طبيب واحد مفرط الحساسية، تجمع الخوارزمية **مجلساً استشارياً يضم 500 طبيب مستقل يصوتون ديمقراطياً بالأغلبية على التشخيص النهائي**. فإذا انخدع أحد الأطباء بشائبة عشوائية في ملف مريضه، فإن خطأه الفردي يتلاشى وسط الحكمة التراكمية لبقية الأطباء الـ 499.\n\nولضمان نجاح هذا المجلس، يجب التأكد من أن الأطباء لا يقرؤون نفس التقرير الطبي حرفياً ولا يكررون نفس القرارات. تحقق الغابات العشوائية هذا التنوع عبر مستويين من العشوائية الرياضية:\n1. **التجميع بالعينات التمهيدية (Bagging):** تُبنى كل شجرة على عينة بيانات مستقلة يتم سحبها مع الإرجاع (Bootstrap Sample) من عينة التدريب الأصلية.\n2. **التعيين العشوائي للفضاء الجزئي للمتغيرات (Random Subspace Sampling):** هذا هو الابتكار الأبرز لبريمان؛ فإذا كان هناك متغير واحد مهيمن وفائق القوة التنبؤية (مثل حجم الورم)، فستختاره كافة الأشجار الـ 500 في جذرها تلقائياً، لتصبح نسخاً مكررة شديدة الارتباط. ولتفادي ذلك، تُجبر الخوارزمية كل عقدة على الاختيار من بين عينة عشوائية محدودة تضم $m \\approx \\sqrt{p}$ من المتغيرات فقط. يجبر هذا القيد الأشجار على استكشاف مؤشرات بديلة وأبعاد خفية، مما يكسر الارتباط بين الأشجار ويجعلها مستقلة حقاً.\n\nتستند هذه الحصانة الرياضية إلى قانون الاحتمالات الكلاسيكي: فحينما تحسب متوسط $B$ من المتغيرات المستقلة تماماً، يتلاشى تباينها الجمعي بمعدل $1/B$. ولكن إذا كانت النماذج مرتبطة فيما بينها بمعامل ارتباط موجب $\\rho$، فإن التباين يتوقف عند حاجز أصم لا يمكن تجاوزه: $\\rho \\sigma^2$. ومن خلال تقليص هذا الارتباط $\\rho$ نحو الصفر بفضل الاختيار العشوائي للمتغيرات، تسحق الغابات العشوائية هذا الحاجز، محولة مجموعة من الأشجار الضعيفة إلى منظومة تنبؤية خارقة وشديدة الاستقرار."
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
          "en": "### The Breiman Ensemble Variance Decomposition\nAssume each individual unpruned tree has identical marginal variance $\\text{Var}(T_b(\\mathbf{x})) = \\sigma^2$, and any pair of distinct trees shares a positive pairwise Pearson correlation:\n\n$$\n\\rho = \\text{Corr}\\left(T_b(\\mathbf{x}), T_{b'}(\\mathbf{x})\\right) = \\frac{\\text{Cov}(T_b(\\mathbf{x}), T_{b'}(\\mathbf{x}))}{\\sigma^2}, \\quad \\text{for } b \\ne b'\n$$\n\nExpanding the variance of the ensemble mean estimator:\n\n$$\n\\begin{aligned}\n\\text{Var}(\\bar{T}(\\mathbf{x})) &= \\text{Var}\\left( \\frac{1}{B} \\sum_{b=1}^B T_b(\\mathbf{x}) \\right) \\\\\n&= \\frac{1}{B^2} \\left[ \\sum_{b=1}^B \\text{Var}(T_b(\\mathbf{x})) + \\sum_{b=1}^B \\sum_{b' \\ne b}^B \\text{Cov}(T_b(\\mathbf{x}), T_{b'}(\\mathbf{x})) \\right] \\\\\n&= \\frac{1}{B^2} \\left[ B \\sigma^2 + B(B - 1)\\rho \\sigma^2 \\right] \\\\\n&= \\rho \\sigma^2 + \\frac{1 - \\rho}{B} \\sigma^2\n\\end{aligned}\n$$\n\n### The Asymptotic Variance Floor:\n- As the number of ensemble trees grows without bound ($B \\to \\infty$):\n  $$\n  \\lim_{B \\to \\infty} \\text{Var}(\\bar{T}(\\mathbf{x})) = \\rho \\sigma^2\n  $$\n- Standard Bagging ($m = P$) reduces variance purely by increasing $B$, but leaves $\\rho$ stubbornly high because all trees share identical dominant root features.\n- Random Forests intentionally weaken individual trees (slightly increasing $\\sigma^2$) to aggressively drive $\\rho \\to 0$, fundamentally lowering the irreducible asymptotic error floor $\\rho \\sigma^2$.\n\n### Out-of-Bag (OOB) Generalization Theory\nConsider drawing a bootstrap sample of size $N$ with replacement from $N$ historical observations. The probability that observation $i$ is never selected in $N$ independent draws is:\n\n$$\n\\mathbb{P}(i \\notin \\mathcal{B}_b) = \\left( 1 - \\frac{1}{N} \\right)^N\n$$\n\nTaking the calculus limit as dataset size $N \\to \\infty$:\n\n$$\n\\lim_{N \\to \\infty} \\left( 1 - \\frac{1}{N} \\right)^N = e^{-1} \\approx 0.367879 \\approx 36.8\\%\n$$\n\nApproximately $36.8\\%$ of the dataset is withheld from each tree as an **Out-of-Bag (OOB)** holdout. For each observation $i \\in \\{1, \\dots, N\\}$, the OOB ensemble prediction aggregates exclusively over the subset of trees that never saw sample $i$ during training:\n\n$$\n\\hat{y}_i^{\\text{OOB}} = \\arg\\max_{c \\in \\{1, \\dots, K\\}} \\sum_{b: i \\notin \\mathcal{B}_b} \\mathbb{I}(T_b(\\mathbf{x}_i) = c)\n$$\n\nThe empirical Out-of-Bag error rate provides an unbiased estimate of true test error that matches $K$-fold cross-validation with zero additional computational expense.\n\n* $B \\in \\mathbb{N}$: Number of trees grown in the random forest ensemble.\n* $T_b(\\mathbf{x})$: Prediction of the $b$-th randomized decision tree for query $\\mathbf{x}$.\n* $\\bar{T}(\\mathbf{x})$: Uniformly weighted ensemble average prediction.\n* $\\sigma^2$: Sampling variance of an individual unpruned decision tree.\n* $\\rho \\in [0, 1]$: Pairwise correlation between individual tree predictions.\n* $m$: Number of features randomly sampled at each split node (default $m = \\lfloor \\sqrt{P} \\rfloor$ for classification, $m = \\lfloor P/3 \\rfloor$ for regression).\n* $P$: Total number of explanatory features in the dataset.\n* $\\mathcal{B}_b$: Bootstrap resample of size $N$ drawn with replacement for tree $b$.\n* $e^{-1} \\approx 36.8\\%$: Asymptotic fraction of observations excluded from each bootstrap sample.\n* $\\hat{y}_i^{\\text{OOB}}$: Out-of-bag ensemble prediction evaluated exclusively on pristine holdout trees.\n\nImplement Breiman's theoretical ensemble variance decomposition formula in Python. You will:\n1. Parse the tree ensemble hyperparameters ($B$, $\\sigma^2$, and $\\rho$).\n2. Evaluate the independent variance attenuation term: $\\frac{1 - \\rho}{B}\\sigma^2$.\n3. Evaluate the asymptotic correlation floor term: $\\rho \\sigma^2$.\n4. Sum both components to return the exact theoretical ensemble prediction variance.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
      "en": "In the previous lesson, Random Forests achieved predictive stability through mass democracy: an ensemble of 500 deep, independent trees...",
      "ar": "في الدرس السابق، رأينا كيف حققت الغابات العشوائية استقرارها التنبؤي عبر ديمقراطية جماعية تعتمد على تصويت 500 شجرة عميقة ومستقلة بالتوازي."
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
          "en": "In the previous lesson, Random Forests achieved predictive stability through mass democracy: an ensemble of 500 deep, independent trees voting simultaneously in parallel. **Gradient Boosted Decision Trees (GBDT)** abandon this parallel democracy entirely, adopting a philosophy of **disciplined sequential craftsmanship**. Instead of training a crowd of trees all at once, boosting constructs trees one by one, where every single new tree is explicitly manufactured to target, repair, and neutralize the residual errors made by its predecessors.\n\nImagine an aspiring archer training for the Olympic games under the watchful eye of a master coach. On Shot 1, the archer releases an arrow: it strikes the target 30 inches too high and 10 inches to the right of the bullseye. A novice might pull out another arrow and try to shoot blindly again from scratch. But the master coach commands: *\"Keep your stance! Do not start over. We are going to isolate your error. Your next shot will be a micro-correction: aim precisely 30 inches lower and 10 inches left.\"* The archer fires Shot 2, leaving an error of only 2 inches. The third shot is a delicate, millimeter adjustment. Each successive shot does not replace the past; it directly targets and chips away at the **residual deficit** left behind by all previous attempts.\n\nJerome Friedman (2001) elevated this physical metaphor into rigorous mathematics by introducing **Gradient Descent in function space**. In classical neural networks, gradient descent updates parameter weights $\\mathbf{w}$ along the slope of the loss function. In gradient boosting, we do not adjust fixed weights; instead, we take steps in the infinite-dimensional space of functions! Each new shallow decision tree (often called a \"weak learner,\" restricted to a depth of only 3 to 6 splits) is trained to predict the negative gradient of the loss function. This negative gradient acts as a set of customized \"pseudo-residuals,\" pointing each new tree toward the exact training instances that were previously misclassified or underpredicted.\n\nIn 2016, Tianqi Chen and Carlos Guestrin sparked an empirical revolution with **XGBoost (Extreme Gradient Boosting)**. Friedman's original algorithm relied on first-order linear Taylor approximations (gradients alone). XGBoost elevated boosting into Newton-Raphson optimization by executing a **second-order Taylor series expansion** that simultaneously evaluates both the slope ($g_i$, the first derivative) and the curvature ($h_i$, the second derivative or Hessian) of the loss function. Knowing both slope and curvature allows the algorithm to determine not only the direction to step, but the exact step size required to hit the minimum. Coupled with analytic $L_2$ regularization on leaf weights ($\\lambda$) and structural complexity penalties ($\\gamma$), XGBoost evaluates the mathematically optimal leaf scores and split gain in a single, lightning-fast closed-form calculation.",
          "ar": "في الدرس السابق، رأينا كيف حققت الغابات العشوائية استقرارها التنبؤي عبر ديمقراطية جماعية تعتمد على تصويت 500 شجرة عميقة ومستقلة بالتوازي. على النقيض من ذلك تماماً، تتخلى **أشجار التدرج المعززة (Gradient Boosted Decision Trees - GBDT)** عن هذا التصويت المتوازي لتتبنى فلسفة **التعلم التتابعي التراكمي وتصحيح الأخطاء خطوة بخطوة**. فبدلاً من بناء جيش من الأشجار دفعة واحدة، تبني خوارزمية التعزيز الأشجار شجرة تلو الأخرى؛ بحيث تُصمم كل شجرة جديدة خصيصاً لملاحقة وإصلاح الأخطاء والبواقي التي عجزت الأشجار السابقة عن حلها.\n\nتخيل رامي سهام مبتدئاً يتدرب للمشاركة في الأولمبياد تحت إشراف مدرب محترف وخبير. في الضربة الأولى، يطلق الرامي سهمه فيصيب لوحة الهدف بعيداً عن المركز بمقدار 30 سنتيمتراً للأعلى و 10 سنتيمترات لليمين. المبتدئ الساذج قد يسحب سهماً جديداً ليرمي عشوائياً من البداية. لكن المدرب الحكيم يوقفه قائلاً: *\"اثبت في مكانك! لا تعد للصفر. سنعالج الخطأ تحديداً: اجعل رميتك التالية تصحيحاً حركياً دقيقاً يستهدف التحرك 30 سنتيمتراً للأسفل و 10 سنتيمترات لليسار\"*. يطلق الرامي السهم الثاني، فيتقلص الخطأ إلى 2 سنتيمتر فقط، لتأتي الرمية الثالثة بلمسة مجهرية تضع السهم في قلب الهدف. لا تلغي كل خطوة سابقتها، بل تبني فوقها وتصقل بواقيها بدقة متناهية.\n\nصاغ جيروم فريدمان (2001) هذا الحدس الرياضي عبر مفهوم عبقري: **الهبوط التدرجي في فضاء الدوال (Gradient Descent in Function Space)**. ففي الشبكات العصبية الكلاسيكية، نحدث أوزان المعاملات $\\mathbf{w}$ على طول ميل دالة الخطأ. أما في أشجار التدرج المعززة، فإننا نتحرك في فضاء الدوال ذاته؛ حيث تُدرب كل شجرة قرار جديدة بسيطة (تُسمى متعلماً ضعيفاً، بعمق 3 إلى 6 تفرعات فقط) لتتنبأ بالتدرج السالب لدالة الخسارة. يعمل هذا التدرج السالب كـ \"بواقي تقريبية\" تكشف للشجرة الجديدة بدقة الحالات التي أخطأ النموذج التراكمي في تقديرها.\n\nوفي عام 2016، أحدث تيانكي تشن وكارلوس غويسترين ثورة كبرى بابتكار **XGBoost (التعزيز التدرجي الأقصى)**. كان نموذج فريدمان الأصلي يكتفي بتقريب تايلور الخطي من الدرجة الأولى (التدرجات فقط). بينما نقل نظام XGBoost التعزيز إلى آفاق طريقة نيوتن-رافسون عبر استخدام **تقريب متسلسلة تايلور من الدرجة الثانية**؛ حيث يدمج بين ميل الخطأ ($g_i$ - المشتقة الأولى) وانحناء دالة الخسارة ($h_i$ - المشتقة الثانية أو الهيسيان). تتيح معرفة الميل والانحناء معاً للنموذج تحديد المسار الأمثل وحجم الخطوة المطلوبة بدقة مطلقة. وبفضل الدمج بين تنظيم $L_2$ لأوزان الأوراق ($\\lambda$) وجزاء تعقيد الشجرة ($\\gamma$)، يحسب XGBoost الوزن الأمثل لكل ورقة ومكسب التفرع الرياضي في خطوة حسابية مغلقة وفائقة السرعة."
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
          "en": "The tree structural regularization term $\\Omega(f_t)$ penalizes leaf count $T$ and the $L_2$ norm of leaf weights $\\mathbf{w}$:\n\n$$\n\\Omega(f_t) = \\gamma T + \\frac{1}{2}\\lambda \\sum_{j=1}^T w_j^2 = \\gamma T + \\frac{1}{2}\\lambda \\|\\mathbf{w}\\|_2^2\n$$\n\n### The 2nd-Order Taylor Series Expansion\nExpanding the differentiable loss function $\\ell(y_i, \\hat{y})$ in a quadratic Taylor series around the previous state $\\hat{y}_i^{(t-1)}$:\n\n$$\n\\ell\\left(y_i, \\hat{y}_i^{(t-1)} + f_t(\\mathbf{x}_i)\\right) \\approx \\ell\\left(y_i, \\hat{y}_i^{(t-1)}\\right) + g_i f_t(\\mathbf{x}_i) + \\frac{1}{2} h_i f_t^2(\\mathbf{x}_i)\n$$\n\nwhere the first-order gradient $g_i$ and second-order Hessian $h_i$ are defined as:\n\n$$\ng_i \\equiv \\left. \\frac{\\partial \\ell(y_i, \\hat{y})}{\\partial \\hat{y}} \\right|_{\\hat{y} = \\hat{y}_i^{(t-1)}}, \\quad h_i \\equiv \\left. \\frac{\\partial^2 \\ell(y_i, \\hat{y})}{\\partial \\hat{y}^2} \\right|_{\\hat{y} = \\hat{y}_i^{(t-1)}}\n$$\n\nDropping the constant term $\\ell(y_i, \\hat{y}_i^{(t-1)})$ simplifies the surrogate objective:\n\n$$\n\\tilde{\\mathcal{L}}^{(t)} = \\sum_{i=1}^N \\left[ g_i f_t(\\mathbf{x}_i) + \\frac{1}{2} h_i f_t^2(\\mathbf{x}_i) \\right] + \\gamma T + \\frac{1}{2}\\lambda \\sum_{j=1}^T w_j^2\n$$\n\n### Closed-Form Optimal Leaf Weights\nLet $I_j = \\{i : q(\\mathbf{x}_i) = j\\}$ represent the subset of training instances mapped to leaf node $j$. Define the aggregated leaf gradient and Hessian:\n\n$$\nG_j \\equiv \\sum_{i \\in I_j} g_i, \\quad H_j \\equiv \\sum_{i \\in I_j} h_i\n$$\n\nRewriting the objective as a sum over independent leaf quadratic forms:\n\n$$\n\\tilde{\\mathcal{L}}^{(t)} = \\sum_{j=1}^T \\left[ G_j w_j + \\frac{1}{2}(H_j + \\lambda) w_j^2 \\right] + \\gamma T\n$$\n\nTaking the partial derivative $\\frac{\\partial \\tilde{\\mathcal{L}}^{(t)}}{\\partial w_j} = G_j + (H_j + \\lambda)w_j = 0$ yields the **Optimal Leaf Weight**:\n\n$$\nw_j^* = -\\frac{G_j}{H_j + \\lambda} = -\\frac{\\sum_{i \\in I_j} g_i}{\\sum_{i \\in I_j} h_i + \\lambda}\n$$\n\nSubstituting $w_j^*$ back into the objective yields the minimum achievable loss for a given tree topology:\n\n$$\n\\tilde{\\mathcal{L}}^*(\\text{Tree}) = -\\frac{1}{2} \\sum_{j=1}^T \\frac{G_j^2}{H_j + \\lambda} + \\gamma T\n$$\n\n### The Exact Greedy Split Gain Formula\nWhen considering splitting a parent leaf into Left ($L$) and Right ($R$) children with gradient sums $G_L, G_R$ and Hessian sums $H_L, H_R$, the exact reduction in the loss function is:\n\n$$\n\\text{Gain} = \\frac{1}{2} \\left[ \\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{(G_L + G_R)^2}{H_L + H_R + \\lambda} \\right] - \\gamma\n$$\n\nIf $\\text{Gain} \\le 0$, the algorithm refuses to split the leaf. The hyperparameter $\\gamma$ acts as an automatic, built-in pre-pruning threshold, while $\\lambda$ smooths leaf predictions in regions with sparse data ($H_j \\approx 0$).\n\n* $t \\in \\{1, \\dots, M\\}$: Current sequential boosting iteration.\n* $f_t(\\mathbf{x})$: New additive decision tree learned at round $t$.\n* $\\hat{y}_i^{(t-1)}$: Cumulative ensemble prediction for instance $i$ up to round $t-1$.\n* $\\ell(y, \\hat{y})$: Differentiable convex loss function (e.g., Squared Error or Binary Logistic Loss).\n* $g_i \\in \\mathbb{R}$: First-order partial derivative of the loss with respect to prediction (Gradient).\n* $h_i \\in \\mathbb{R}^+$: Second-order partial derivative of the loss with respect to prediction (Hessian/Curvature).\n* $G_j, H_j$: Sum of instance gradients and Hessians residing inside leaf node $j$.\n* $T$: Number of terminal leaf nodes in the tree candidate.\n* $w_j \\in \\mathbb{R}$: Continuous prediction score emitted by terminal leaf $j$.\n* $\\lambda \\ge 0$: Analytical $L_2$ regularization parameter preventing extreme leaf scores.\n* $\\gamma \\ge 0$: Minimum split gain required to justify creating an additional leaf (pre-pruning penalty).\n* $\\text{Gain}$: Closed-form arithmetic formula quantifying exact loss reduction for candidate splits.\n\nImplement the XGBoost second-order split gain and optimal child weight evaluation in NumPy. You will:\n1. Partition 1st-order gradients $g$ and 2nd-order Hessians $h$ into left and right child subsets at candidate `split_idx`.\n2. Compute the cumulative sums $G_L, H_L, G_R, H_R$ and total parent sums $G_{\\text{total}}, H_{\\text{total}}$.\n3. Evaluate the optimal leaf weights $w_L^* = -\\frac{G_L}{H_L + \\lambda}$ and $w_R^* = -\\frac{G_R}{H_R + \\lambda}$.\n4. Compute the 2nd-order split gain: $\\text{Gain} = \\frac{1}{2}\\left[\\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{G_{\\text{total}}^2}{H_{\\text{total}} + \\lambda}\\right] - \\gamma$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
      "en": "In supervised learning, our algorithms are guided by an all-knowing teacher who supplies pristine target labels $yi$ for every training...",
      "ar": "في التعلم الخاضع للإشراف (Supervised Learning)، تسير النماذج تحت إرشاد معلم يقدم تصنيفات مؤكدة $yi$ لكل عينة."
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
          "en": "In supervised learning, our algorithms are guided by an all-knowing teacher who supplies pristine target labels $y_i$ for every training instance. But across massive frontiers of real-world industry—discovering customer purchasing personas, identifying novel biological cell types from single-cell RNA sequencing, compressing image palettes into compact color palettes, or detecting zero-day cybersecurity intrusions—labels simply do not exist. There is no teacher. The algorithm must explore an unmapped geometric landscape and discover organic, natural groupings purely from the spatial topology of the data itself.\n\nThe classic **K-Means algorithm** (formalized by Stuart Lloyd in 1957) approaches this challenge like **a municipal urban planner deciding where to construct $K$ emergency fire stations across a sprawling metropolis**:\n1. **Initial Placement:** You drop $K$ tentative pins across the city map as temporary fire station locations.\n2. **Voronoi Assignment:** Every household in the city is assigned to the nearest fire station, carving the urban landscape into a mosaic of geometric service districts known as a **Voronoi tessellation**.\n3. **Centroid Relocation:** Each fire station is dismantled and physically rebuilt at the exact geographic center of gravity (the mathematical mean coordinate) of all the households assigned to its district.\n4. **Iterative Equilibrium:** Because the stations have moved, the jurisdictional boundaries shift: some families are now closer to a different station. You repeat this assignment-and-relocation cycle until the system settles into a stable equilibrium and no station moves an inch.\n\nHowever, Lloyd's original algorithm is crippled by a fatal vulnerability: **initialization luck**. The mathematical objective landscape (Within-Cluster Sum of Squares) is riddled with thousands of deceptive local valleys. If you drop the initial $K$ pins uniformly at random, pure bad luck might plant three fire stations in the exact same quiet residential suburb while leaving a vast, high-density industrial corridor completely uncovered. The algorithm will quickly freeze in a catastrophic local minimum, forever blinding the model to the true underlying structure.\n\nDavid Arthur and Sergei Vassilvitskii (2007) resolved this pathology with the celebrated **K-Means++ algorithm**. Instead of naive uniform guessing, K-Means++ enforces **probabilistic spatial repulsion**. The first centroid is chosen at random. But every subsequent centroid is sampled with a probability strictly proportional to the square of its Euclidean distance from the nearest already-chosen centroid: $\\mathbb{P}(\\mathbf{x}) \\propto D(\\mathbf{x})^2$. Points huddled close to existing stations have virtually zero chance of selection, while remote, neglected frontiers are given overwhelming priority. This ingenious probabilistic spacing guarantees that initial centroids span the entire data manifold, providing a provable $O(\\log K)$ mathematical competitive bound against the globally optimal clustering!",
          "ar": "في التعلم الخاضع للإشراف (Supervised Learning)، تسير النماذج تحت إرشاد معلم يقدم تصنيفات مؤكدة $y_i$ لكل عينة. لكن في قطاعات صناعية وعلمية شاسعة—مثل اكتشاف الشرائح التسويقية للعملاء، أو تصنيف الخلايا الجينومية في أبحاث السرطان، أو ضغط ألوان الصور الرقمية، أو رصد الهجمات السيبرانية غير المسبوقة—تكون البيانات غير مصنفة إطلاقاً. لا يوجد معلم يرشد النموذج؛ بل يجب على الخوارزمية استكشاف الفضاء الهندسي بمفردها واكتشاف التجمعات الطبيعية المترابطة استناداً إلى تضاريس البيانات ذاتها.\n\nتتعامل خوارزمية **K-Means الكلاسيكية** (التي صاغها ستيوارت لويد عام 1957) مع هذه المسألة كـ **مخطط مدن يسعى لبناء $K$ من مراكز الإطفاء في مدينة مترامية الأطراف لتقليل زمن الاستجابة للحالات الطارئة**:\n1. **المواقع الأولية:** تضع الخوارزمية $K$ من الدبابيس المؤقتة على خريطة المدينة كمواقع مبدئية للمراكز.\n2. **تفسيف فورونوي (Voronoi Assignment):** يُسند كل منزل في المدينة إلى مركز الإطفاء الأقرب إليه جغرافياً، مما يقسم المدينة إلى فسيفساء من المناطق الخدمية المتعامدة المعروفة بـ **خلايا فورونوي**.\n3. **تحديث المركز (Centroid Relocation):** يُعاد نقل كل مركز إطفاء مادياً إلى مركز الثقل الجغرافي الدقيق (المتوسط الحسابي للإحداثيات) لجميع المنازل التي تولى خدمتها.\n4. **الاتزان الحركي المستقر:** نظراً لتحرك المراكز، تتغير الحدود الخدمية تلقائياً؛ فتعيد المنازل الارتباط بالمراكز الأقرب إليها مجدداً. وتتكرر هذه الدورة المتناوبة حتى تستقر المراكز تماماً وتتوقف عن الحركة.\n\nغير أن خوارزمية لويد التقليدية تعاني من نقطة ضعف قاتلة: **عشوائية البداية**. فدالة الهدف (مجموع مربعات المسافات داخل التجمعات) غير محدبة ومعقدة جداً. فإذا اخترت المواقع الأولية عشوائياً، فقد تسقط ثلاثة مراكز إطفاء في نفس الحي السكني الهادئ بالصدفة، بينما يُترك قطاع صناعي كامل دون أي تغطية! تقع الخوارزمية عندئذ في فخ قاع محلي رديء، لتخرج بمجموعات مشوهة لا تعكس الواقع.\n\nعالج ديفيد آرثر وسيرجي فاسيليفتسكي (2007) هذه المعضلة بابتكار **K-Means++**. بدلاً من التخمين العشوائي الأعمى، تطبق K-Means++ **تباعداً احتمإلياً ذكياً**: يُختار المركز الأول عشوائياً، ثم يُختار كل مركز لاحق باحتمالية تتناسب طردياً مع مربع المسافة عن أقرب مركز قائم بالفعل: $\\mathbb{P}(\\mathbf{x}) \\propto D(\\mathbf{x})^2$. تصبح فرصة اختيار النقاط القريبة من المراكز القائمة شبه معدومة، بينما تحظى المناطق النائية غير الممثلة بأعلى احتمالية للاختيار. يضمن هذا التوزيع المتباعد استكشاف أرجاء فضاء البيانات بالكامل، ويحقق ضماناً رياضياً بحد تنافسي $O(\\log K)$ مقارنة بالحل الأمثل العالمي!"
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
          "en": "Because finding the global minimizer of $J$ over all possible partitions is NP-hard, Lloyd's algorithm executes alternating block coordinate descent across two steps:\n\n### 1. The Voronoi Assignment Step\nHolding centroids $\\boldsymbol{\\mu}_k$ fixed, minimize $J$ with respect to the cluster assignment set $\\mathcal{C}$. Because individual point contributions are additive and decoupled, the optimal assignment rule assigns each point $\\mathbf{x}_i$ to its nearest Euclidean centroid:\n\n$$\nC_k^{(t)} = \\left\\{ i : \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_k^{(t)}\\|_2 \\le \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_j^{(t)}\\|_2 \\quad \\forall j \\in \\{1, \\dots, K\\} \\right\\}\n$$\n\nTies are broken arbitrarily. This partitions $\\mathbb{R}^D$ into convex Voronoi polyhedra.\n\n### 2. The Centroid Update Step\nHolding the cluster assignments $\\mathcal{C}$ fixed, minimize $J$ with respect to centroid positions $\\boldsymbol{\\mu}_k$:\n\n$$\n\\boldsymbol{\\mu}_k^{(t+1)} = \\arg\\min_{\\boldsymbol{\\mu} \\in \\mathbb{R}^D} \\sum_{i \\in C_k^{(t)}} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}\\|_2^2\n$$\n\nSetting the vector gradient with respect to $\\boldsymbol{\\mu}$ to zero:\n\n$$\n\\nabla_{\\boldsymbol{\\mu}} \\sum_{i \\in C_k^{(t)}} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}\\|_2^2 = -2 \\sum_{i \\in C_k^{(t)}} (\\mathbf{x}_i - \\boldsymbol{\\mu}) = \\mathbf{0} \\implies \\boldsymbol{\\mu}_k^{(t+1)} = \\frac{1}{|C_k^{(t)}|} \\sum_{i \\in C_k^{(t)}} \\mathbf{x}_i\n$$\n\nThe optimal centroid is precisely the empirical center of mass (sample arithmetic mean) of points inside that cluster.\n\n### Convergence Guarantee\nAt each iteration $t$:\n$$\nJ(\\mathcal{C}^{(t+1)}, \\boldsymbol{\\mu}^{(t+1)}) \\le J(\\mathcal{C}^{(t+1)}, \\boldsymbol{\\mu}^{(t)}) \\le J(\\mathcal{C}^{(t)}, \\boldsymbol{\\mu}^{(t)})\n$$\nBecause the objective $J$ decreases monotonically and the number of possible partitions is strictly finite ($K^N$), Lloyd's algorithm is mathematically guaranteed to terminate at a local minimum in a finite number of iterations.\n\n### The K-Means++ Seeding Distribution\nLet $\\mathcal{M} = \\{\\boldsymbol{\\mu}_1, \\dots, \\boldsymbol{\\mu}_m\\}$ denote the current set of already-chosen centroids ($1 \\le m < K$). Define the shortest distance from sample $\\mathbf{x}_i$ to any existing centroid:\n\n$$\nD(\\mathbf{x}_i) \\equiv \\min_{\\boldsymbol{\\mu} \\in \\mathcal{M}} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}\\|_2\n$$\n\nThe next centroid $\\boldsymbol{\\mu}_{m+1}$ is sampled from $\\mathcal{D}$ according to the probability distribution:\n\n$$\n\\mathbb{P}(\\mathbf{x}_i \\text{ is selected}) = \\frac{D(\\mathbf{x}_i)^2}{\\sum_{j=1}^N D(\\mathbf{x}_j)^2}\n$$\n\nArthur and Vassilvitskii proved that this $D^2$-weighting guarantees an expected approximation ratio:\n\n$$\n\\mathbb{E}[J_{\\text{K-Means++}}] \\le 8(\\ln K + 2) J_{\\text{Optimal}}\n$$\n\n* $N$: Total number of unlabelled observations in the dataset.\n* $D$: Dimensionality of the Cartesian feature space.\n* $K$: User-specified number of distinct geometric clusters to discover.\n* $\\mathbf{x}_i \\in \\mathbb{R}^D$: Feature vector of observation $i$.\n* $C_k \\subset \\{1, \\dots, N\\}$: Set of observation indices assigned to cluster $k$.\n* $\\boldsymbol{\\mu}_k \\in \\mathbb{R}^D$: Geometric centroid vector (mean coordinates) of cluster $k$.\n* $J(\\mathcal{C}, \\boldsymbol{\\mu})$: Inertia (Within-Cluster Sum of Squares) objective function.\n* $D(\\mathbf{x}_i)$: Euclidean distance from sample $\\mathbf{x}_i$ to the nearest already-selected centroid.\n* $\\mathbb{P}(\\mathbf{x}_i)$: Probability distribution governing K-Means++ centroid initialization.\n* $J_{\\text{Optimal}}$: Theoretical minimum inertia achieved by the NP-hard global optimum.\n\nImplement a single iterative update step of Lloyd's K-Means clustering in NumPy. You will:\n1. Compute the pairwise squared Euclidean distance matrix between all $N$ data points and all $K$ centroids using vectorized expansion: $\\|\\mathbf{x} - \\boldsymbol{\\mu}\\|_2^2 = \\|\\mathbf{x}\\|_2^2 + \\|\\boldsymbol{\\mu}\\|_2^2 - 2\\mathbf{x}^T\\boldsymbol{\\mu}$.\n2. Assign each data point to its nearest centroid index using `np.argmin`.\n3. Recompute each centroid as the arithmetic mean of its assigned cluster points, with fallback handling for empty clusters.\n4. Calculate the total within-cluster sum of squared errors (Inertia).",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
      "en": "Modern datasets routinely confront data scientists with dozens or thousands of interrelated, collinear features—financial balance sheet...",
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
          "en": "Modern datasets routinely confront data scientists with dozens or thousands of interrelated, collinear features—financial balance sheet metrics, multi-channel sensor telemetry, facial image pixels, or single-cell gene expression markers. Attempting to visualize, explore, or fit machine learning models on high-dimensional data directly leads to computational paralysis, severe multicollinearity, and the curse of dimensionality. Yet in practice, most features are deeply redundant: measuring a runner's stride length, shoe size, and leg length captures three variations of the exact same underlying physical trait.\n\n**Principal Component Analysis (PCA)** is the foundational unsupervised technique for linear dimensionality reduction. To grasp its tactile geometry, imagine holding an intricate three-dimensional metal wire sculpture in your hands inside a pitch-black room. Your objective is to project the sculpture's silhouette onto a flat, two-dimensional white wall using a single handheld flashlight. If you shine the flashlight from an arbitrary, clumsy angle, the wire branches collapse into an unrecognizable, tangled clump that conceals the sculpture's true structure.\n\nPCA is the mathematical art of **rotating the flashlight around the sculpture to discover the exact camera angle that casts the widest, sharpest, most informative shadow possible**. The physical width and spread of this shadow corresponds to **statistical variance**: the direction along which the data points are most spread out preserves the maximum amount of original information, while the flat, squashed dimensions represent redundant noise that can be safely discarded without losing the core signal.\n\nThis spatial rotation proceeds through an orderly, orthogonal hierarchy:\n- The **First Principal Component ($\\mathbf{v}_1$)** is the primary axis of maximum variance—the single widest perspective of your data manifold.\n- The **Second Principal Component ($\\mathbf{v}_2$)** is the axis of maximum *remaining* variance that is strictly orthogonal (at a perfect $90^\\circ$ angle) to the first.\n- Every subsequent component captures diminishing residual variance while remaining mutually perpendicular to all predecessors. Because these axes are orthogonal by construction, PCA completely uncorrelates the features, effectively rotating your coordinate system so that the new axes align with the intrinsic geometric structure of the data.",
          "ar": "تغمر مجموعات البيانات الحديثة مهندسي البيانات بمئات أو آلاف المتغيرات المتشابكة والمترابطة—مثل النسب المالية للشركات، أو قراءات مجسات الطائرات، أو بكسلات الصور الرقمية، أو مصفوفات التعبير الجيني. وتؤدي محاولة نمذجة هذه الفضاءات الشاهقة مباشرة إلى شلل حسابي، وتداخل خطي مدمر (Multicollinearity)، وسقوط في لعنة الأبعاد. ومع ذلك، فإن أغلب هذه المتغيرات مكررة في جوهرها؛ فقياس طول ساق العداء ومقاس حذائه وطول خطوته هي ثلاثة أوجه لمتغير بيولوجي كامن واحد.\n\nيمثل **تحليل المكونات الرئيسية (Principal Component Analysis - PCA)** الأساس الهندسي الأهم لتقليص الأبعاد الخطي دون إشراف. ولاستيعاب هذا المفهوم حسياً، تخيل أنك تمسك بيدك مجسماً سلكياً ثلاثي الأبعاد معقداً داخل غرفة مظلمة، ومهمتك هي التقاط صورة ظلية للمجسم على جدار مستوٍ أبيض ثنائي الأبعاد باستخدام مصباح يدوي. إذا سلطت الضوء من زاوية عشوائية خرقاء، سينهار الظل إلى كتلة متشابكة ومبهمة تخفي المعالم الهندسية الحقيقية للمجسم.\n\nPCA هو الفن الرياضي لـ **تدوير زاوية إضاءة المصباح بدقة للبحث عن الزاوية المثالية التي تصنع أوسع ظل وأكثره وضوحاً وتفصيلاً على الجدار**. يقابل اتساع هذا الظل الممتد مفهوم **التباين الإحصائي (Variance)**: فالاتجاه الذي تتشتت فيه نقاط البيانات بأكبر قدر ممكن هو الاتجاه الذي يحتفظ بأقصى طاقة بيانية ومعلوماتية أصلية، بينما تمثل الأبعاد المنكمشة ضجيجاً متكرراً يمكن التخلص منه دون أي خسارة جوهرية.\n\nيسير هذا التدوير الهندسي وفق تسلسل هرمي متعامد وصارم:\n- **المكون الرئيسي الأول ($\\mathbf{v}_1$)** هو محور التباين الأقصى المطلق—وهو أوسع زاوية رؤية ممكنة لبياناتك.\n- **المكون الرئيسي الثاني ($\\mathbf{v}_2$)** هو محور التباين الأقصى المتبقي، بشرط أن يكون متعامداً تماماً وبزاوية $90^\\circ$ على المحور الأول.\n- وهكذا، يلتقط كل مكون لاحق تشتتاً متناقصاً مع الحفاظ على تعامده مع كافة المكونات السابقة. وبفضل هذا التعامد الجبري، يلغي PCA الارتباط الخطي بين المتغيرات تماماً، ويعيد تدوير محاور الإحداثيات لتتطابق تماماً مع البنية الهندسية الحقيقية للبيانات."
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
          "en": "Because $\\mathbf{\\Sigma}$ is real, symmetric ($\\mathbf{\\Sigma} = \\mathbf{\\Sigma}^T$), and positive semi-definite, its eigenvalues are real and non-negative.\n\n### Variance Maximization via Rayleigh Quotient\nWe seek a unit projection vector $\\mathbf{u}_1 \\in \\mathbb{R}^P$ ($\\|\\mathbf{u}_1\\|_2^2 = \\mathbf{u}_1^T \\mathbf{u}_1 = 1$) that maximizes the variance of the projected scalar coordinates $\\mathbf{z}_1 = \\mathbf{X}\\mathbf{u}_1$:\n\n$$\n\\max_{\\mathbf{u}_1} \\text{Var}(\\mathbf{X}\\mathbf{u}_1) = \\max_{\\mathbf{u}_1} \\frac{1}{N - 1} (\\mathbf{X}\\mathbf{u}_1)^T (\\mathbf{X}\\mathbf{u}_1) = \\max_{\\mathbf{u}_1} \\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1 \\quad \\text{subject to } \\mathbf{u}_1^T \\mathbf{u}_1 = 1\n$$\n\nFormulating the Lagrangian objective with multiplier $\\lambda_1$:\n\n$$\n\\mathcal{L}(\\mathbf{u}_1, \\lambda_1) = \\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1 - \\lambda_1 (\\mathbf{u}_1^T \\mathbf{u}_1 - 1)\n$$\n\nTaking the vector derivative and setting it to zero:\n\n$$\n\\nabla_{\\mathbf{u}_1} \\mathcal{L} = 2\\mathbf{\\Sigma} \\mathbf{u}_1 - 2\\lambda_1 \\mathbf{u}_1 = \\mathbf{0} \\iff \\mathbf{\\Sigma} \\mathbf{u}_1 = \\lambda_1 \\mathbf{u}_1\n$$\n\nThis is the foundational **Matrix Eigenvalue Problem**! Multiplying both sides on the left by $\\mathbf{u}_1^T$ reveals:\n\n$$\n\\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1 = \\lambda_1 \\mathbf{u}_1^T \\mathbf{u}_1 = \\lambda_1\n$$\n\nThe maximal projected variance equals the largest eigenvalue $\\lambda_1$, achieved when the projection vector $\\mathbf{u}_1$ is the principal eigenvector of covariance matrix $\\mathbf{\\Sigma}$.\n\n### Spectral Decomposition & Low-Rank Projection\nBy the Spectral Theorem, the covariance matrix factors into an orthonormal basis of eigenvectors $\\mathbf{V} = [\\mathbf{v}_1, \\dots, \\mathbf{v}_P] \\in \\mathbb{R}^{P \\times P}$ and diagonal eigenvalue matrix $\\mathbf{\\Lambda} = \\text{diag}(\\lambda_1, \\dots, \\lambda_P)$:\n\n$$\n\\mathbf{\\Sigma} = \\mathbf{V} \\mathbf{\\Lambda} \\mathbf{V}^T, \\quad \\text{with } \\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_P \\ge 0\n$$\n\nTo compress the data from $P$ dimensions down to $K < P$, we form the truncated projection matrix $\\mathbf{V}_K = [\\mathbf{v}_1, \\dots, \\mathbf{v}_K] \\in \\mathbb{R}^{P \\times K}$ and compute the low-dimensional representation:\n\n$$\n\\mathbf{Z} = \\mathbf{X} \\mathbf{V}_K \\in \\mathbb{R}^{N \\times K}\n$$\n\nThe **Explained Variance Ratio (EVR)** for the $j$-th principal component is:\n\n$$\n\\text{EVR}_j = \\frac{\\lambda_j}{\\sum_{m=1}^P \\lambda_m} = \\frac{\\lambda_j}{\\text{tr}(\\mathbf{\\Sigma})}\n$$\n\nThe cumulative explained variance $\\sum_{j=1}^K \\text{EVR}_j$ quantifies the exact percentage of total information retained in the low-dimensional projection.\n\n* $\\mathbf{X} \\in \\mathbb{R}^{N \\times P}$: Mean-centered feature matrix containing $N$ samples and $P$ original predictors.\n* $\\mathbf{\\Sigma} \\in \\mathbb{R}^{P \\times P}$: Symmetric, positive semi-definite sample covariance matrix.\n* $\\mathbf{u}_1 \\in \\mathbb{R}^P$: Unit projection vector defining the orientation of the principal axis.\n* $\\lambda_j$: The $j$-th eigenvalue of $\\mathbf{\\Sigma}$, quantifying the variance along eigenvector $\\mathbf{v}_j$.\n* $\\mathbf{v}_j$: The $j$-th orthonormal eigenvector of $\\mathbf{\\Sigma}$ (the $j$-th Principal Component loading vector).\n* $\\mathbf{V}_K \\in \\mathbb{R}^{P \\times K}$: Truncated projection matrix composed of the top $K$ principal eigenvectors.\n* $\\mathbf{Z} \\in \\mathbb{R}^{N \\times K}$: Low-dimensional compressed coordinate matrix (principal component scores).\n* $\\text{tr}(\\mathbf{\\Sigma}) = \\sum_{j=1}^P \\lambda_j$: Trace of the covariance matrix, measuring total multivariate variance.\n* $\\text{EVR}_j$: Explained Variance Ratio quantifying the fraction of total variance captured by component $j$.\n\nImplement the full Principal Component Analysis engine via covariance eigendecomposition in NumPy. You will:\n1. Mean-center the feature columns of $\\mathbf{X}$: $\\mathbf{X}_c = \\mathbf{X} - \\bar{\\mathbf{X}}$.\n2. Compute the sample covariance matrix $\\mathbf{\\Sigma} = \\frac{1}{N - 1}\\mathbf{X}_c^T\\mathbf{X}_c$.\n3. Compute eigenvalues and eigenvectors using `np.linalg.eigh` and sort them in descending order.\n4. Extract the top $K$ eigenvectors to form the transformation matrix $\\mathbf{V}_K$.\n5. Project the centered data into low-dimensional space: $\\mathbf{Z} = \\mathbf{X}_c \\mathbf{V}_K$.\n6. Calculate the Explained Variance Ratios $\\text{EVR}_j = \\frac{\\lambda_j}{\\sum \\lambda}$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
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
