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
      "least-squares-approximation",
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
          "en": "Ordinary Least Squares (OLS) is almost universally introduced as a curve-fitting optimization: drawing a line across a 2D scatterplot to minimize the sum of squared vertical gaps. But this two-dimensional view obscures the deepest, most foundational insight of modern econometrics: **OLS is an orthogonal projection in sample space $\\mathbb{R}^N$**.\n\nImagine collecting data on $N$ people. The observed outcome $\\mathbf{y}$ is not a cloud of points—it is a single high-dimensional vector in an $N$-dimensional universe. Your regressors (like education, experience, and the constant intercept) span a much smaller $K$-dimensional flat subspace $\\text{col}(\\mathbf{X})$. Because $N \\gg K$, the outcome vector $\\mathbf{y}$ almost never lies inside this subspace.\n\nThink of a flagpole standing at an angle on a flat lawn. If the midday sun shines directly from straight above, the shadow cast upon the grass is the fitted value $\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$. The plumb line dropping straight down from the flagpole's tip to its shadow is the residual vector $\\mathbf{e}$. Just as that vertical plumb line is strictly perpendicular ($90^\\circ$) to every blade of grass on the lawn, the OLS residual vector $\\mathbf{e}$ is mathematically perpendicular to every single regressor in $\\mathbf{X}$. Least squares is simply finding the best \"line of sight\" to project high-dimensional reality onto the subspace we can observe.",
          "ar": "يُقدَّم الانحدار الخطي العادي (OLS) في الغالب كمسألة حسابية لرسم خط يقلل المسافات الرأسية في رسم بياني ثنائي الأبعاد. لكن هذا التبسيط يحجب الرؤية الهندسية الأكثر عمقًا وأصالة في القياس الاقتصادي: **OLS هو إسقاط متعامد في فضاء العينة ذي الأبعاد الـ $N$**.\n\nعندما نجمع بيانات عن $N$ شخص، فإن المتغير التابع $\\mathbf{y}$ ليس سحابة نقاط، بل هو متجه واحد في فضاء هائل ذي $N$ بعدًا. وتشكل المتغيرات المستقلة (كالتعليم والخبرة والثابت) فضاءً فرعيًا مسطحًا ذا بعد $K$ (حيث $N \\gg K$). ولأن $\\mathbf{y}$ لا يقع عمومًا داخل هذا الفضاء، فإن أفضل تقدير له هو إسقاط ظله العمودي تمامًا.\n\nتخيل سارية علم تميل بزاوية فوق أرضية عشبية مسطحة. عندما تسطع شمس الظهيرة عموديًا من كبد السماء، يكون الظل المنعكس على العشب هو القيم المقدرة $\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$. أما خيط الشاقول المتدلي من قمة السارية إلى قمة الظل فهو متجه البواقي $\\mathbf{e}$. تمامًا كما يشكل خيط الشاقول زاوية قائمة ($90^\\circ$) مع كل عشبة على الأرضية، يتعامد متجه البواقي $\\mathbf{e}$ رياضيًا مع كل متغير مفسر في المصفوفة $\\mathbf{X}$. إن الانحدار الخطي في جوهره هو البحث عن أفضل زاوية رؤية لإسقاط الواقع على الفضاء الذي نستطيع قياسه."
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
          "en": "The empirical sum of squared residuals objective function minimizes the squared Euclidean length of the error vector:\n\n$$\nS(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{y} + \\boldsymbol{\\beta}^T \\mathbf{X}^T \\mathbf{X} \\boldsymbol{\\beta}\n$$\n\nSetting the gradient to zero yields the celebrated **Normal Equations**:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) = -2\\mathbf{X}^T \\mathbf{y} + 2\\mathbf{X}^T \\mathbf{X}\\boldsymbol{\\beta} = \\mathbf{0} \\implies \\mathbf{X}^T (\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}) = \\mathbf{X}^T \\mathbf{e} = \\mathbf{0}\n$$\n\nUnder the assumption of full column rank ($\\text{rank}(\\mathbf{X}) = K < N$), $\\mathbf{X}^T \\mathbf{X}$ is strictly positive definite and invertible:\n\n$$\n\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}\n$$\n\nThe fitted values and residuals are generated via the symmetric, idempotent **Hat Matrix** ($\\mathbf{P}_X$) and **Annihilator Matrix** ($\\mathbf{M}_X$):\n\n$$\n\\hat{\\mathbf{y}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}} = \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y} \\equiv \\mathbf{P}_X \\mathbf{y}, \\quad \\mathbf{e} = \\mathbf{y} - \\hat{\\mathbf{y}} = (\\mathbf{I}_N - \\mathbf{P}_X)\\mathbf{y} \\equiv \\mathbf{M}_X \\mathbf{y}\n$$\n\n* $\\mathbf{y} \\in \\mathbb{R}^{N \\times 1}$: Observed response vector containing the outcome variable for all $N$ economic agents.\n* $\\mathbf{X} \\in \\mathbb{R}^{N \\times K}$: Design matrix containing $K$ regressor columns (including an intercept vector of ones $\\boldsymbol{\\iota}_N$).\n* $\\boldsymbol{\\beta} \\in \\mathbb{R}^{K \\times 1}$: True, unobservable population parameter vector.\n* $\\hat{\\boldsymbol{\\beta}} \\in \\mathbb{R}^{K \\times 1}$: OLS coefficient vector that minimizes the sum of squared residuals.\n* $\\hat{\\mathbf{y}} \\in \\text{col}(\\mathbf{X})$: Orthogonal projection of $\\mathbf{y}$ onto the subspace spanned by the columns of $\\mathbf{X}$.\n* $\\mathbf{e} \\in \\mathbb{R}^{N \\times 1}$: Sample residual vector satisfying $\\mathbf{X}^T \\mathbf{e} = \\mathbf{0}$ by first-order construction.\n* $\\mathbf{P}_X \\in \\mathbb{R}^{N \\times N}$: The projection (hat) matrix with $\\text{rank}(\\mathbf{P}_X) = \\text{tr}(\\mathbf{P}_X) = K$.\n* $\\mathbf{M}_X \\in \\mathbb{R}^{N \\times N}$: The residual maker (annihilator) matrix with $\\text{rank}(\\mathbf{M}_X) = \\text{tr}(\\mathbf{M}_X) = N - K$, satisfying $\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$.\n\nImplement the closed-form Ordinary Least Squares estimator using NumPy. Rather than directly computing `np.linalg.inv`, solve the linear system $(\\mathbf{X}^T \\mathbf{X})\\boldsymbol{\\beta} = \\mathbf{X}^T \\mathbf{y}$ using `np.linalg.solve` to preserve numerical stability and avoid condition-number blowups.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
          "en": "Once the regression hyperplane is locked into place, researchers ask: *How much of the outcome's real-world variation have we actually explained?* The Analysis of Variance (ANOVA) decomposition provides the answer by splitting total variation into two strictly perpendicular components using the **Pythagorean theorem in $N$ dimensions**.\n\nThink of the total variation in the outcome as the acoustic energy of an audio recording. The recording consists of a clear musical melody (the signal explained by the regressors, ESS) and unavoidable static hiss (the residual noise, SSR). Because the fitted prediction vector $\\hat{\\mathbf{y}}$ and the residual vector $\\mathbf{e}$ are mutually orthogonal ($90^\\circ$), the squared length of the total signal equals the sum of the squared lengths of the melody plus the hiss! The coefficient of determination, $R^2$, is simply the percentage of total energy accounted for by the melody. Geometrically, $R^2 = \\cos^2(\\theta)$, where $\\theta$ is the angle between the centered outcome vector and its projection.\n\nHowever, $R^2$ is one of the most dangerously misinterpreted metrics in all of empirical science. **A high $R^2$ does not imply causality, and a low $R^2$ does not mean your research is useless!** Adding random noise variables (such as astrological signs or coin flips) will mechanically drive $R^2$ upward because the projection space expands with every additional column. This is why **Adjusted $R^2$ ($\\bar{R}^2$)** enforces a mathematical penalty: it only rises if a newly added variable explains more variation than what would occur purely by random chance.",
          "ar": "بمجرد استقرار المستوى الفائق للانحدار، يتبادر للباحث السؤال الأهم: *ما هي النسبة الحقيقية التي استطاع النموذج تفسيرها من تباين الظاهرة المدروسة؟* يقدم تفكيك تحليل التباين (ANOVA) الإجابة عبر تقسيم التباين الإجمالي إلى مركبتين متعامدتين تمامًا بالاعتماد على **مبرهنة فيثاغورس في فضاء الأبعاد الـ $N$**.\n\nتخيل التباين الإجمالي في المتغير التابع كطاقة صوتية في تسجيل إذاعي. يتكون هذا التسجيل من لحن موسيقي واضح ومفهوم (التباين الذي فسره النموذج ESS) وتشويش إلكتروني مصاحب (بواقي الخطأ SSR). ونظرًا لأن متجه القيم المقدرة $\\hat{\\mathbf{y}}$ ومتجه البواقي $\\mathbf{e}$ متعامدان هندسيًا بزاوية قائمة ($90^\\circ$)، فإن مربع طول الإشارة الكلية يساوي تمامًا مجموع مربعي طولي اللحن والتشويش! معامل التحديد $R^2$ هو ببساطة النسبة المئوية للطاقة التي فسرها اللحن، وهندسيًا يمثل $R^2 = \\cos^2(\\theta)$، حيث $\\theta$ هي الزاوية بين المتجه الممركز للنتيجة ومسقطه.\n\nومع ذلك، يُعد $R^2$ من أكثر المقاييس إساءةً للفهم في البحث التطبيقي؛ **فالقيمة المرتفعة لـ $R^2$ لا تعني أبدًا وجود علاقة سببية، والقيمة المنخفضة لا تعني فشل الدراسة!** إن إضافة متغيرات عشوائية تافهة (كأبراج الحظ أو تقلبات الطقس العشوائية) ترفع $R^2$ ميكانيكيًا لأن فضاء الإسقاط يتسع مع كل عمود جديد. لهذا السبب وُضع **معامل التحديد المعدل ($\\bar{R}^2$)**؛ لفرض غرامة رياضية على درجات الحرية المفقودة، فلا يرتفع إلا إذا قدم المتغير الجديد إضافة حقيقية تتجاوز الصدفة المحضة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\sum_{i=1}^N (y_i - \\bar{y})^2 = \\sum_{i=1}^N (\\hat{y}_i - \\bar{y})^2 + \\sum_{i=1}^N e_i^2 \\iff \\text{TSS} = \\text{ESS} + \\text{SSR}",
        "formulaNote": {
          "en": "Core invariant for Goodness-of-Fit, R-squared, and the ANOVA Decomposition.",
          "ar": "الخاصية الرياضية الجوهرية لـ جودة التوفيق ومعامل التحديد والتفكيك التبايني."
        },
        "narrative": {
          "en": "The coefficient of determination $R^2$ is defined as the explained ratio:\n\n$$\nR^2 \\equiv \\frac{\\text{ESS}}{\\text{TSS}} = 1 - \\frac{\\text{SSR}}{\\text{TSS}} \\in [0, 1]\n$$\n\nTo penalize the artificial inflation caused by adding extra regressors, the degrees-of-freedom **Adjusted $R^2$** ($\\bar{R}^2$) scales by degrees of freedom:\n\n$$\n\\bar{R}^2 \\equiv 1 - \\frac{\\text{SSR} / (N - p - 1)}{\\text{TSS} / (N - 1)} = 1 - (1 - R^2)\\left(\\frac{N - 1}{N - p - 1}\\right)\n$$\n\n* $\\text{TSS}$ (Total Sum of Squares): Total sample variation of the outcome $y_i$ around the grand mean $\\bar{y}$, possessing $N - 1$ degrees of freedom.\n* $\\text{ESS}$ (Explained Sum of Squares): Variation captured by the fitted model predictions $\\hat{y}_i$ around the grand mean $\\bar{y}$, possessing $p$ degrees of freedom.\n* $\\text{SSR}$ (Sum of Squared Residuals): Unexplained variance of the residuals $e_i = y_i - \\hat{y}_i$, possessing $N - p - 1$ degrees of freedom.\n* $N$: Total number of observations in the sample.\n* $p$: Number of explanatory regressor slopes (excluding the constant intercept).\n* $R^2$: Fraction of sample variance explained by the regression plane ($0 \\le R^2 \\le 1$ when an intercept is included).\n* $\\bar{R}^2$: Adjusted coefficient of determination, which can be strictly less than $R^2$ and can even become negative if regressors add pure noise.\n\nImplement the full ANOVA variance decomposition and compute both $R^2$ and Adjusted $R^2$ in NumPy. Ensure your degrees of freedom correctly separate the total sample size $N$ from the slope count $p$.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
          "en": "Why do empirical researchers and econometricians almost universally start their investigations with Ordinary Least Squares rather than some alternative estimator? Is OLS somehow magical?\n\nThe **Gauss-Markov Theorem** gives the definitive mathematical answer: under five structural conditions (Linearity, Full Rank, Strict Exogeneity, Homoskedasticity, and No Serial Correlation), the OLS estimator is **BLUE: Best Linear Unbiased Estimator**.\n\nThink of a competitive archery tournament where the archers are trying to hit the true population parameter bullseye $\\boldsymbol{\\beta}$.\n* **Unbiased** means that across repeated random samples from the population, an archer's arrows don't systematically drift to the left, right, high, or low—the center of gravity of all their shots lands squarely on the center of the bullseye ($\\mathbb{E}[\\hat{\\boldsymbol{\\beta}}] = \\boldsymbol{\\beta}$).\n* **Best** means minimum variance. Among all conceivable estimators that are linear in $\\mathbf{y}$ and unbiased, OLS has the tightest possible grouping of arrows. Any other linear unbiased estimator (such as throwing away half the data or taking simple endpoint slopes) will have a larger spread.\n\nCrucially, **the Gauss-Markov Theorem does not assume or require that errors follow a normal distribution!** The error terms can be skewed, multimodal, or uniform; as long as the five Gauss-Markov moments hold, OLS reigns supreme as the most efficient linear unbiased estimator possible.",
          "ar": "لماذا يبدأ علماء الاقتصاد القياسي والباحثون التطبيقيون دراساتهم دائمًا بمقدر المربعات الصغرى OLS بدلاً من أي مقدر آخر؟ هل يمتلك OLS قدرات خارقة؟\n\nتجيب **مبرهنة غاوس-ماركوف (Gauss-Markov Theorem)** عن هذا التساؤل إجابة رياضية حاسمة: في ظل خمسة شروط هيكلية (الخطية، الرتبة الكاملة، الاستقلال الخارجي الصارم، تجانس التباين، وغياب الارتباط الذاتي للأخطاء)، يكون مقدر OLS هو **BLUE: Best Linear Unbiased Estimator** (أفضل مقدر خطي غير متحيّز).\n\nتخيل بطولة رماية بالسهام حيث يحاول الرماة إصابة نقطة الهدف الحقيقية للمجتمع $\\boldsymbol{\\beta}$:\n* **غير متحيّز (Unbiased)** تعني أنه عبر العينات العشوائية المتكررة، لا تنحرف سهام الرامي بانتظام نحو اليمين أو اليسار أو الأعلى أو الأسفل؛ مركز ثقل جميع تسديداته يقع تمامًا في قلب الهدف ($\\mathbb{E}[\\hat{\\boldsymbol{\\beta}}] = \\boldsymbol{\\beta}$).\n* **الأفضل (Best)** تعني أصغر تباين إحصائي ممكن (Minimum Variance). من بين جميع المقدرات الخطية غير المتحيزة التي يمكن ابتكارها، يمتلك OLS التجمع الأكثر إحكامًا وتماسكًا للسهام. وأي مقدر خطي بديل غير متحيّز سيكون أكثر تشتتًا وتذبذبًا.\n\nوالأمر الأكثر إثارة للإعجاب أن **مبرهنة غاوس-ماركوف لا تفترض إطلاقًا أن الأخطاء تتبع التوزيع الطبيعي!** يمكن للأخطاء أن تكون ملتوية أو ثنائية المنوال؛ فما دامت شروط غاوس-ماركوف الخمسة متحققة، يظل OLS المقدر الخطي الأكثر كفاءة ودقة بلا منازع."
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
          "en": "Taking expectations conditional on $\\mathbf{X}$ establishes **unbiasedness**:\n\n$$\n\\mathbb{E}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = \\boldsymbol{\\beta} + (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}] = \\boldsymbol{\\beta}\n$$\n\nThe exact parameter variance-covariance matrix is given by:\n\n$$\n\\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T (\\sigma^2 \\mathbf{I}_N) \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1} = \\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\nSince the population variance $\\sigma^2$ is unknown, we estimate it with the sample residual variance $s^2$:\n\n$$\ns^2 = \\frac{\\mathbf{e}^T \\mathbf{e}}{N - K}, \\quad \\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}) = s^2 (\\mathbf{X}^T \\mathbf{X})^{-1}, \\quad \\text{SE}(\\hat{\\beta}_j) = \\sqrt{\\big[\\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}})\\big]_{jj}}\n$$\n\n* $\\boldsymbol{\\varepsilon} \\in \\mathbb{R}^N$: Unobservable population error term vector.\n* $\\sigma^2$: Constant population error variance ($\\sigma^2 = \\mathbb{E}[\\varepsilon_i^2 \\mid \\mathbf{X}]$).\n* $\\mathbf{I}_N$: $N \\times N$ identity matrix representing spherical disturbance covariance.\n* $s^2$: Unbiased sample estimator of $\\sigma^2$ with $N - K$ degrees of freedom in the denominator.\n* $\\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}]$: $K \\times K$ variance-covariance matrix of the estimated regression parameters.\n* $\\text{SE}(\\hat{\\beta}_j)$: Estimated standard error of the $j$-th coefficient, measuring sampling volatility.\n* $t_j = \\hat{\\beta}_j / \\text{SE}(\\hat{\\beta}_j)$: Empirical $t$-statistic for testing the null hypothesis $H_0: \\beta_j = 0$.\n\nImplement the calculation of the homoskedastic OLS parameter variance-covariance matrix, standard errors, and test statistics using vectorized NumPy operations.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
          "en": "In textbook econometrics, every observation's error term is assumed to share the exact same variance $\\sigma^2$ (homoskedasticity). But in the living, breathing economy, **dispersion is almost never uniform**.\n\nConsider household spending on restaurant dining across income levels. Low-income households spend between $\\$10$ and $\\$50$ a week; their behavior is tightly constrained by a tight budget, producing small error variance. But billionaire households spend anywhere from $\\$50$ to $\\$50,000$ a week—some eat at local diners, while others order vintage champagne every night. As income increases, the dispersion of the error term fans out like an open trumpet. This unequal variance is **Heteroskedasticity**.\n\nWhen heteroskedasticity is present, what breaks down?\n* The good news: OLS point estimates $\\hat{\\boldsymbol{\\beta}}$ remain **unbiased and consistent**. The line still passes through the center of gravity of the data.\n* The catastrophic news: The textbook standard errors $\\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$ are **completely invalid**. They typically underestimate sampling variance, leading to artificially narrow confidence intervals, inflated $t$-statistics, and false discoveries.\n\nIn 1980, Halbert White revolutionized empirical economics with the **Sandwich Estimator**. Think of a culinary sandwich:\n* The **Outer Bread**: The classical projection matrix $(\\mathbf{X}^T \\mathbf{X})^{-1}$.\n* The **Inner Meat**: An empirical core filled with each observation's squared residual $e_i^2$.\nBy wrapping the outer bread around the empirical meat, White's estimator provides standard errors that remain asymptotically valid *without requiring you to know or model the true underlying variance structure*.",
          "ar": "في كتب الاقتصاد القياسي المدرسية، يُفترض أن لجميع أخطاء المشاهدات التباين نفسه $\\sigma^2$ (تجانس التباين). لكن في الواقع الاقتصادي الحي، **لا يكون التشتت متساويًا على الإطلاق**.\n\nتأمل مثلاً إنفاق الأسر على ارتياد المطاعم بحسب مستوى الدخل. الأسر محدودة الدخل تنفق بين 10 و 50 دولارًا أسبوعيًا؛ ميزانيتها المقيدة تجعل تباين أخطائها ضئيلاً ومحكومًا. أما الأسر فاحشة الثراء فيتراوح إنفاقها بين 50 و 50,000 دولار أسبوعيًا؛ فبعضهم يفضل وجبات متواضعة وبعضهم ينفق ببذخ يومي. مع زيادة الدخل، يتسع انتشار الأخطاء وتشتتها كالمروحة المفتوحة. هذا التشتت غير المتساوي هو **عدم تجانس التباين (Heteroskedasticity)**.\n\nعند وجود عدم تجانس التباين، ما الذي يتأثر وما الذي ينجو؟\n* النبأ السار: تظل معاملات الانحدار $\\hat{\\boldsymbol{\\beta}}$ **غير متحيّزة ومتسقة**. فالخط ما زال يمر عبر مركز الثقل الحقيقي للبيانات.\n* النبأ الكارثي: تنهار الأخطاء المعيارية التقليدية $\\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$ **وتفقد مصداقيتها تمامًا**. فهي تقلل التباين الحقيقي بصورة مضللة، مما ينتج فترات ثقة ضيقة وقيم $t$ متضخمة تمنح دلالة إحصائية زائفة لمتغيرات لا أثر لها.\n\nفي عام 1980، أحدث هالبرت هوايت ثورة بابتكار **مقدر الساندويتش المتين (Sandwich Estimator)**:\n* **شريحتا الخبز الخارجيتان**: مصفوفة الإسقاط الكلاسيكية $(\\mathbf{X}^T \\mathbf{X})^{-1}$.\n* **حشوة اللحم الداخلية**: قلب تجريبي مبني من مربعات البواقي الفعلية لكل مشاهدة $e_i^2$.\nبإحاطة الحشوة الداخلية بشريحتي الخبز، يوفر مقدر هوايت أخطاء معيارية متسقة وموثوقة تقارب الحقيقة، *دون الحاجة إلى معرفة الصيغة الرياضية الحقيقية لتباين الأخطاء*."
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
          "en": "Propagating this variance into the OLS sampling expression yields the true covariance structure:\n\n$$\n\\mathbb{V}[\\hat{\\boldsymbol{\\beta}} \\mid \\mathbf{X}] = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\boldsymbol{\\Omega} \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\nWhite (1980) proved that we do not need to estimate all $N$ distinct $\\sigma_i^2$ values individually. Instead, replacing $\\boldsymbol{\\Omega}$ with the diagonal matrix of squared OLS residuals $\\text{diag}(e_1^2, \\dots, e_N^2)$ yields the consistent **HC0 Sandwich Estimator**:\n\n$$\n\\mathbf{V}_{\\text{HC0}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\left( \\sum_{i=1}^N e_i^2 \\mathbf{x}_i \\mathbf{x}_i^T \\right) (\\mathbf{X}^T \\mathbf{X})^{-1}\n$$\n\nIn finite samples, HC0 is downward-biased. MacKinnon & White (1985) introduced **HC1**, which applies a degrees-of-freedom correction factor:\n\n$$\n\\mathbf{V}_{\\text{HC1}} = \\frac{N}{N - K} \\mathbf{V}_{\\text{HC0}}\n$$\n\n* $\\boldsymbol{\\Omega} \\in \\mathbb{R}^{N \\times N}$: True diagonal population error variance matrix with diagonal entries $\\sigma_i^2 = \\mathbb{E}[\\varepsilon_i^2 \\mid \\mathbf{x}_i]$.\n* $\\mathbf{x}_i \\in \\mathbb{R}^{K \\times 1}$: Column vector of regressors for observation $i$ (transposed row from $\\mathbf{X}$).\n* $e_i = y_i - \\mathbf{x}_i^T \\hat{\\boldsymbol{\\beta}}$: Sample OLS residual for unit $i$.\n* $\\sum_{i=1}^N e_i^2 \\mathbf{x}_i \\mathbf{x}_i^T$: The empirical middle \"meat\" matrix of the sandwich.\n* $(\\mathbf{X}^T \\mathbf{X})^{-1}$: The outer \"bread\" matrices that project the variance into parameter space.\n* $\\text{HC0}$: Halbert White's asymptotic heteroskedasticity-consistent variance estimator.\n* $\\text{HC1}$: Degrees-of-freedom adjusted robust covariance matrix ($N / (N - K)$), widely adopted as the default robust estimator in modern statistical packages.\n\nImplement the White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent robust covariance matrix estimator using vectorized matrix products in NumPy.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
          "en": "Moving from simple bivariate regression to multiple regression transforms econometrics from basic line-drawing into a multidimensional **ceteris paribus machine** (evaluating the effect of one factor while holding everything else constant). In real economies, variables never change in a vacuum: schooling is deeply intertwined with natural talent, family wealth, geographical location, and work history.\n\nMatrix calculus allows us to optimize across all $K$ dimensions simultaneously in a single stroke. Instead of writing out pages of tedious summations and $K$ separate partial derivatives, matrix algebra collapses the problem into an elegant quadratic loss surface:\n\n$$\nS(\\boldsymbol{\\beta}) = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})\n$$\n\nTwo geometric operators govern the entire algebraic structure:\n1. **The Hat / Projection Matrix ($\\mathbf{P}_X$):** The \"synthesizer\" that takes any vector in the universe and snaps it onto the closest point within the regressor hyperplane: $\\hat{\\mathbf{y}} = \\mathbf{P}_X \\mathbf{y}$.\n2. **The Annihilator Matrix ($\\mathbf{M}_X = \\mathbf{I}_N - \\mathbf{P}_X$):** The \"residual maker\" that completely wipes out and obliterates any vector lying in the subspace of $\\mathbf{X}$ ($\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$). When applied to the outcome, it purges every trace of the regressors to isolate the pure residual vector: $\\mathbf{e} = \\mathbf{M}_X \\mathbf{y}$.\n\n$$\nS(\\boldsymbol{\\beta}) = (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})^T (\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})\n$$",
          "ar": "إن الانتقال من الانحدار البسيط إلى الانحدار المتعدد ينقل القياس الاقتصادي من مجرد مطابقة منحنيات إلى **آلة جبارة لتطبيق مبدأ ثبات العوامل الأخرى (Ceteris Paribus)**. في الواقع الاقتصادي الحي، لا تتحرك المتغيرات بمعزل عن بعضها: فالتعليم مرتبط ارتباطًا وثيقًا بالذكاء الفطري، وثروة الوالدين، والبيئة الجغرافية، والخبرة العملية.\n\nيتيح حسبان المصفوفات صياغة الاستمثال عبر جميع الأبعاد الـ $K$ بضربة واحدة أنيقة. فبدلاً من كتابة صفحات لا تنتهي من علامات الجمع والاشتقاقات الجزئية المنفصلة، يختزل جبر المصفوفات المسألة في سطح خسارة تربيعي متناسق:\n\nويحكم هذا البناء الرياضي عاملان هندسيان جوهريان:\n1. **مصفوفة الإسقاط ($\\mathbf{P}_X$):** \"المُجمِّع\" الذي يلتقط أي متجه في الفضاء ويُسقطه عموديًا على أقرب نقطة داخل المستوي الفائق للمتغيرات: $\\hat{\\mathbf{y}} = \\mathbf{P}_X \\mathbf{y}$.\n2. **مصفوفة الإبادة والتلاشي ($\\mathbf{M}_X = \\mathbf{I}_N - \\mathbf{P}_X$):** \"صانع البواقي\" الذي يمحو ويسحق تمامًا أي متجه يقع ضمن الفضاء الفرعي لـ $\\mathbf{X}$ ($\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$). وعند تطبيقها على متجه النتائج، فإنها تطهره من كل أثر للمتغيرات المستقلة لتعزل البواقي النقية: $\\mathbf{e} = \\mathbf{M}_X \\mathbf{y}$."
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
          "en": "Using matrix calculus derivative rules ($\\nabla_{\\mathbf{b}} (\\mathbf{a}^T \\mathbf{b}) = \\mathbf{a}$ and $\\nabla_{\\mathbf{b}} (\\mathbf{b}^T \\mathbf{A} \\mathbf{b}) = 2\\mathbf{A}\\mathbf{b}$ for symmetric $\\mathbf{A}$):\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) = -2\\mathbf{X}^T \\mathbf{y} + 2(\\mathbf{X}^T \\mathbf{X})\\boldsymbol{\\beta} = \\mathbf{0}\n$$\n\nWhen $\\text{rank}(\\mathbf{X}) = K < N$, $\\mathbf{X}^T \\mathbf{X}$ is strictly invertible:\n\n$$\n\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}\n$$\n\nThe Hessian matrix verifies global convexity:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}}^2 S(\\boldsymbol{\\beta}) = 2\\mathbf{X}^T \\mathbf{X} \\succ \\mathbf{0} \\quad (\\text{strictly positive definite})\n$$\n\nThe fundamental projection properties of $\\mathbf{P}_X$ and $\\mathbf{M}_X$:\n\n$$\n\\mathbf{P}_X \\equiv \\mathbf{X}(\\mathbf{X}^T \\mathbf{X})^{-1}\\mathbf{X}^T, \\quad \\mathbf{M}_X \\equiv \\mathbf{I}_N - \\mathbf{P}_X\n$$\n\n$$\n\\mathbf{P}_X = \\mathbf{P}_X^T = \\mathbf{P}_X^2, \\quad \\mathbf{M}_X = \\mathbf{M}_X^T = \\mathbf{M}_X^2, \\quad \\mathbf{P}_X \\mathbf{M}_X = \\mathbf{0}\n$$\n\n$$\n\\text{tr}(\\mathbf{P}_X) = \\text{rank}(\\mathbf{X}) = K, \\quad \\text{tr}(\\mathbf{M}_X) = N - K\n$$\n\n* $S(\\boldsymbol{\\beta})$: Scalar sum of squared residuals quadratic loss function.\n* $\\nabla_{\\boldsymbol{\\beta}} S(\\boldsymbol{\\beta}) \\in \\mathbb{R}^{K \\times 1}$: Gradient vector of partial derivatives with respect to each $\\beta_j$.\n* $\\nabla_{\\boldsymbol{\\beta}}^2 S(\\boldsymbol{\\beta}) \\in \\mathbb{R}^{K \\times K}$: Hessian matrix of second-order partial derivatives.\n* $\\mathbf{P}_X \\in \\mathbb{R}^{N \\times N}$: Symmetric idempotent projection matrix with trace equal to column dimension $K$.\n* $\\mathbf{M}_X \\in \\mathbb{R}^{N \\times N}$: Symmetric idempotent annihilator matrix satisfying $\\mathbf{M}_X \\mathbf{X} = \\mathbf{0}$ with trace equal to degrees of freedom $N - K$.\n\nImplement a function that computes the hat matrix $\\mathbf{P}_X$ and the residual annihilator matrix $\\mathbf{M}_X$, and numerically confirms their idempotent and orthogonality properties.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
          "en": "In empirical research, you will constantly hear researchers state: *\"We estimate the causal effect of schooling on wages, controlling for experience, industry, and location.\"* But what does \"controlling for\" actually mean under the hood? Does the statistical software magically pause time or create cloned human beings with identical industries?\n\nThe **Frisch-Waugh-Lovell (FWL) Theorem** reveals the elegant algebraic mechanics of \"partialling out\":\n1. **Purge the Outcome:** Regress the outcome $Y$ on the control variables $X_2$, and save the residuals $\\tilde{\\mathbf{y}}$. This strips away every shred of variation in $Y$ that can be predicted by $X_2$.\n2. **Purge the Regressor:** Regress the key variable of interest $X_1$ on the controls $X_2$, and save the residuals $\\tilde{\\mathbf{X}}_1$. This wipes out any correlation or overlap between $X_1$ and $X_2$.\n3. **Run a Simple Bivariate Regression:** Regress the purified outcome residuals $\\tilde{\\mathbf{y}}$ on the purified regressor residuals $\\tilde{\\mathbf{X}}_1$.\n\nThe slope of this simple bivariate regression is **mathematically identical down to the last decimal place** to the coefficient $\\hat{\\boldsymbol{\\beta}}_1$ from the giant multiple regression!\n\nThink of active noise-cancelling headphones: to hear a subtle violin solo ($X_1$) inside a noisy airplane cabin ($X_2$), the headphones generate an inverse acoustic wave to cancel the engine drone from the microphone ($Y$) and from the audio stream ($X_1$). Controlling for variables simply means washing the fingerprints of the controls off both the treatment and the outcome before comparing what remains.",
          "ar": "في أبحاث الاقتصاد القياسي، ستسمع الباحثين يكررون دائمًا: *\"نقيس الأثر السببي للتعليم على الأجور، مع التحكم في سنوات الخبرة والقطاع الاقتصادي والمنطقة الجغرافية.\"* ولكن ما الذي يعنيه \"التحكم في المتغيرات\" بدقة رياضية؟ هل يمتلك الحاسوب آلة زمنية تجمد الواقع أو تصنع نسخًا بشرية متطابقة في كافة الظروف؟\n\nتكشف **مبرهنة فريش-وو-لوفيل (FWL Theorem)** عن الآلية الحسابية المذهلة لمفهوم \"التجريد الجزئي\" (Partialling Out):\n1. **تطهير المتغير التابع:** أجرِ انحدارًا لـ $Y$ على متغيرات التحكم $X_2$، واحتفظ بالبواقي $\\tilde{\\mathbf{y}}$. هذا الإجراء يمسح من $Y$ كل أثر يمكن تفسيره بواسطة $X_2$.\n2. **تطهير المتغير المستقل:** أجرِ انحدارًا لمتغير المعالجة $X_1$ على متغيرات التحكم $X_2$، واحتفظ بالبواقي $\\tilde{\\mathbf{X}}_1$. هذا الإجراء يزيل أي تداخل أو تشابك بين $X_1$ و $X_2$.\n3. **إجراء انحدار خطي بسيط:** قم بانحدار بواقي النتيجة المطهرة $\\tilde{\\mathbf{y}}$ على بواقي المعالجة المطهرة $\\tilde{\\mathbf{X}}_1$.\n\nإن ميل هذا الانحدار البسيط **يتطابق رياضيًا وبالفاصلة العشرية** مع معامل الانحدار المتعدد الضخم $\\hat{\\boldsymbol{\\beta}}_1$!\n\nتخيل سماعات إلغاء الضجيج الذكية: لسماع عزف كمان رقيق ($X_1$) داخل مقصورة طائرة صاخبة ($X_2$)، تولد السماعات موجة صوتية معاكسة تلغي هدير المحرك تمامًا من أذنيك ($Y$) ومن جهاز التسجيل ($X_1$). التحكم في المتغيرات يعني ببساطة مسح بصمات عوامل التشويش من كل من المعالجة والنتيجة قبل فحص الرابط السببي المتبقي بينهما."
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
          "en": "Define the orthogonal annihilator matrix for the control subspace:\n\n$$\n\\mathbf{M}_2 \\equiv \\mathbf{I}_N - \\mathbf{X}_2 (\\mathbf{X}_2^T \\mathbf{X}_2)^{-1} \\mathbf{X}_2^T\n$$\n\nPremultiplying the entire structural equation by $\\mathbf{M}_2$:\n\n$$\n\\mathbf{M}_2 \\mathbf{y} = \\mathbf{M}_2 \\mathbf{X}_1 \\boldsymbol{\\beta}_1 + \\mathbf{M}_2 \\mathbf{X}_2 \\boldsymbol{\\beta}_2 + \\mathbf{M}_2 \\boldsymbol{\\varepsilon}\n$$\n\nBecause $\\mathbf{M}_2 \\mathbf{X}_2 = \\mathbf{0}$, the control block vanishes entirely:\n\n$$\n\\tilde{\\mathbf{y}} = \\tilde{\\mathbf{X}}_1 \\boldsymbol{\\beta}_1 + \\tilde{\\boldsymbol{\\varepsilon}}\n$$\n\nApplying Ordinary Least Squares to this transformed single-variable equation yields:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_1 = (\\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{X}}_1)^{-1} \\tilde{\\mathbf{X}}_1^T \\tilde{\\mathbf{y}} = (\\mathbf{X}_1^T \\mathbf{M}_2 \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{M}_2 \\mathbf{y}\n$$\n\nFurthermore, the residuals from this partial regression are identical to the multiple regression residuals:\n\n$$\n\\mathbf{e} = \\tilde{\\mathbf{y}} - \\tilde{\\mathbf{X}}_1 \\hat{\\boldsymbol{\\beta}}_1 = \\mathbf{y} - \\mathbf{X}_1 \\hat{\\boldsymbol{\\beta}}_1 - \\mathbf{X}_2 \\hat{\\boldsymbol{\\beta}}_2\n$$\n\n* $\\mathbf{X}_1 \\in \\mathbb{R}^{N \\times K_1}$: Submatrix containing the regressor(s) whose causal impact is of primary interest.\n* $\\mathbf{X}_2 \\in \\mathbb{R}^{N \\times K_2}$: Submatrix of control covariates (e.g., demographic indicators, fixed effects, trends).\n* $\\mathbf{M}_2 \\in \\mathbb{R}^{N \\times N}$: Annihilator matrix for $\\mathbf{X}_2$ with $\\text{rank}(\\mathbf{M}_2) = N - K_2$.\n* $\\tilde{\\mathbf{X}}_1 = \\mathbf{M}_2 \\mathbf{X}_1$: Regressor residuals purged of all linear associations with $\\mathbf{X}_2$.\n* $\\tilde{\\mathbf{y}} = \\mathbf{M}_2 \\mathbf{y}$: Outcome residuals purged of all linear associations with $\\mathbf{X}_2$.\n* $\\hat{\\boldsymbol{\\beta}}_1$: The exact partial regression coefficient on $\\mathbf{X}_1$ in the full joint model.\n\nImplement the three-step Frisch-Waugh-Lovell partialling out algorithm and verify that it produces coefficients identical to the full multiple regression.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
          "en": "Confusing correlation with causation is the original sin of empirical data analysis.\n\nImagine a peaceful countryside village where, every morning at 5:00 AM sharp, the village rooster crows loudly. At 5:05 AM, the sun rises over the horizon. If an algorithm runs a regression of *Sunrise* on *Rooster Crowing*, it will find a stunningly strong, statistically significant positive relationship with $R^2 \\approx 1$. But does the rooster summon the dawn? If you silence the rooster, will eternal darkness engulf the village?\n\nOf course not. The planetary rotation of the Earth is the true common cause that brings the sunrise while simultaneously triggering the rooster's biological circadian rhythm. Omitting the Earth's rotation forces the statistical model to attribute the solar event to the bird's vocal cords! This is **Omitted Variable Bias (OVB)**.\n\nThe OVB formula is celebrated because it dissects this error with surgical precision. The bias of a naive \"short\" regression is the exact product of two distinct mechanisms:\n\n$$\n\\text{Bias} = (\\text{Direct Impact of the Omitted Variable on } Y) \\times (\\text{Statistical Correlation between Omitted Variable and } X)\n$$\n\nIf either of these two bridges is zero, the bias collapses to zero:\n1. If the omitted factor has no true effect on the outcome ($\\beta_2 = 0$), omitting it causes no bias.\n2. If the omitted factor is completely uncorrelated with the treatment ($\\delta_{21} = 0$, as in a randomized experiment), omitting it causes no bias!",
          "ar": "الخلط بين الارتباط والسببية هو الخطيئة الكبرى في تحليل البيانات التجريبية.\n\nتخيل قرية ريفية هادئة يصيح فيها ديك المزرعة كل صباح عند الساعة 5:00 تمامًا، وعند الساعة 5:05 تشرق الشمس في الأفق. إذا أجرى نموذج إحصائي انحدارًا لـ *شروق الشمس* على *صياح الديك*، فسيخرج بمعامل ارتباط موجب هائل ودلالة إحصائية قاطعة بـ $R^2 \\approx 1$. ولكن هل صياح الديك هو الذي يستدعي خيوط الفجر؟ وهل سيعم الظلام الأبدي لو أسكتنا الديك؟\n\nبالتأكيد لا. إن دوران كوكب الأرض حول محوره هو السبب الحقيقي المشترك الذي يأتي بالشروق ويحفز في الوقت ذاته الساعة البيولوجية للديك. إن إغفال دوران الأرض يجبر النموذج الإحصائي على نسبة شروق الشمس إلى حبال الديك الصوتية! هذا هو **انحياز المتغير المغفَل (Omitted Variable Bias - OVB)**.\n\nتكتسب صيغة OVB مكانتها التاريخية لأنها تفكك هذا الخطأ بدقة جراحية متناهية. فالانحياز في الانحدار \"القصير\" هو حاصل ضرب مسارين محددين:\n\n$$\n\\text{الانحياز} = (\\text{الأثر المباشر للمتغير المغفل على النتيجة } Y) \\times (\\text{الارتباط الإحصائي بين المتغير المغفل والمعالجة } X)\n$$\n\nفإذا انقطع أي من هذين الجسرين، يتلاشى الانحياز تمامًا ليصبح صفرًا:\n1. إذا لم يكن للمتغير المغفل أثر حقيقي على النتيجة ($\\beta_2 = 0$)، فلا انحياز في إغفاله.\n2. إذا كان المتغير المغفل مستقلاً تمامًا عن المعالجة ($\\delta_{21} = 0$، كما في التجارب العشوائية)، فلا انحياز إطلاقًا!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{y} = \\mathbf{X}_1 \\beta_1 + \\mathbf{X}_2 \\beta_2 + \\boldsymbol{\\varepsilon}, \\quad \\text{with } \\mathbb{E}[\\boldsymbol{\\varepsilon} \\mid \\mathbf{X}_1, \\mathbf{X}_2] = \\mathbf{0}",
        "formulaNote": {
          "en": "Core invariant for The Omitted Variable Bias (OVB) Formula & The Directional Bias Matrix.",
          "ar": "الخاصية الرياضية الجوهرية لـ صيغة انحياز المتغير المغفَل ومصفوفة تحديد اتجاه الانحياز."
        },
        "narrative": {
          "en": "where $\\beta_1$ is the true causal effect of primary interest. A researcher fails to observe $\\mathbf{X}_2$ and fits the **Short Model**:\n\n$$\n\\mathbf{y} = \\mathbf{X}_1 \\beta_{\\text{short}} + \\mathbf{u}\n$$\n\nThe OLS estimator of the short regression is:\n\n$$\n\\hat{\\beta}_{\\text{short}} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{y} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T (\\mathbf{X}_1 \\beta_1 + \\mathbf{X}_2 \\beta_2 + \\boldsymbol{\\varepsilon})\n$$\n\n$$\n\\hat{\\beta}_{\\text{short}} = \\beta_1 + \\beta_2 \\underbrace{(\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_2}_{\\hat{\\delta}_{21}} + (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\boldsymbol{\\varepsilon}\n$$\n\nTaking expectations conditional on the regressors yields the celebrated **Omitted Variable Bias Formula**:\n\n$$\n\\mathbb{E}[\\hat{\\beta}_{\\text{short}} \\mid \\mathbf{X}_1, \\mathbf{X}_2] = \\beta_1 + \\beta_2 \\cdot \\delta_{21} \\iff \\text{Bias} \\equiv \\beta_2 \\cdot \\delta_{21}\n$$\n\n| Correlation of Omitted with Treatment ($\\delta_{21}$) | Impact of Omitted on Outcome ($\\beta_2 > 0$) | Impact of Omitted on Outcome ($\\beta_2 < 0$) |\n| :--- | :--- | :--- |\n| **Positive Correlation** ($\\delta_{21} > 0$) | **Positive Bias** (Overestimation: $\\hat{\\beta} > \\beta$) | **Negative Bias** (Underestimation: $\\hat{\\beta} < \\beta$) |\n| **Negative Correlation** ($\\delta_{21} < 0$) | **Negative Bias** (Underestimation: $\\hat{\\beta} < \\beta$) | **Positive Bias** (Overestimation: $\\hat{\\beta} > \\beta$) |\n\n* $\\beta_1$: True structural parameter representing the causal effect of treatment $\\mathbf{X}_1$ on $\\mathbf{y}$.\n* $\\beta_2$: True partial effect of the unobserved omitted confounder $\\mathbf{X}_2$ on $\\mathbf{y}$ holding $\\mathbf{X}_1$ fixed.\n* $\\beta_{\\text{short}}$: Population parameter recovered by naive short regression omitting $\\mathbf{X}_2$.\n* $\\hat{\\delta}_{21} = (\\mathbf{X}_1^T \\mathbf{X}_1)^{-1} \\mathbf{X}_1^T \\mathbf{X}_2$: Auxiliary regression coefficient from projecting the omitted confounder onto the treatment.\n* $\\text{Bias} = \\beta_2 \\cdot \\delta_{21}$: The exact magnitude and sign of causal distortion.\n\nImplement the full OVB algebraic decomposition. Fit the long regression, the short regression, and the auxiliary regression to numerically verify that $\\hat{\\beta}_{\\text{short}} = \\hat{\\beta}_{\\text{long}, 1} + \\hat{\\beta}_{\\text{long}, 2} \\cdot \\hat{\\delta}_{21}$ holds identically.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
          "en": "In introductory statistics courses, students often acquire the dangerous dogma of the **\"Kitchen Sink Regression\"**: pack every available covariate in your spreadsheet into the regression model, operating under the naive illusion that adding more control variables can never hurt and always reduces bias.\n\nIn causal econometrics, this instinct is disastrous. Joshua Angrist and Jörn-Steffen Pischke famously coined the term **Bad Controls** to identify variables that should never be included in a regression.\n\nBad controls primarily come in two destructive varieties:\n1. **The Mediator Trap ($D \\to M \\to Y$):** Suppose you want to measure the total causal return of a college degree ($D$) on earnings ($Y$). Should you control for whether the individual holds a managerial role ($M$)? **Absolutely not!** Getting hired into managerial roles is one of the primary pathways through which college education boosts earnings. If you control for management status, you block the transmission pipe. You are now comparing a college graduate manager to a non-college manager, asking: *\"Does college help you earn more if it didn't help you get a better job?\"* You have engineered away the very effect you set out to measure!\n2. **The Collider Trap:** Controlling for variables determined *after* treatment can inadvertently condition on a collider, creating phantom correlations between treatment and unobserved errors that were previously independent.\n\n**Good controls are predetermined variables established before treatment occurs** (such as birth year or parental education). Bad controls are variables that treatment itself influences.",
          "ar": "في دروس الإحصاء الأولية، يتشرب الطلاب غالبًا عادة شائعة وخطيرة تُعرف بـ **\"انحدار حوض المطبخ\" (Kitchen Sink Regression)**: حشر كل متغير متاح في قاعدة البيانات داخل النموذج، تحت الوهم الساذج بأن إضافة ضوابط إضافية لا تضر أبدًا وتقلل التحيز حتمًا.\n\nفي الاقتصاد القياسي السببي، يعد هذا التفكير كارثيًا. صاغ الباحثان جوشوا أنغريست ويورن-ستيفن بيشكي مصطلح **ضوابط التحكم السيئة (Bad Controls)** للإشارة إلى المتغيرات التي يدمر إدراجها التعريف السببي.\n\nتأتي الضوابط السيئة في صورتين رئيسيتين:\n1. **فخ المتغير الوسيط ($D \\to M \\to Y$):** لنفترض أنك تريد قياس الأثر السببي الإجمالي للشهادة الجامعية ($D$) على الدخل ($Y$). هل يجوز أن تتحكم في متغير \"شغل منصب إداري\" ($M$)؟ **كلا على الإطلاق!** فالوصول إلى المناصب الإدارية هو إحدى القنوات الأساسية التي ترفع الشهادة الجامعية الدخل من خلالها. إذا تحكمت في المنصب الإداري، فإنك تسد أنبوب التدفق السببي؛ وتصبح مقارنتك بين مدير جامعي ومدير غير جامعي متسائلاً: *\"هل تفيد الشهادة إذا لم تساعدك في الحصول على وظيفة أفضل؟\"* لقد قتلت بيدك الأثر ذاته الذي تبحث عنه!\n2. **فخ المصادم (Collider):** التحكم في متغيرات تتحدد *بعد* حدوث المعالجة قد يحولها إلى مصادمات تربط المعالجة بعوامل تشويش خفية كانت مستقلة عنها تمامًا في الأصل.\n\n**الضوابط الصالحة هي متغيرات سابقة على المعالجة زمنيًا وهيكليًا** (كسنة الميلاد أو تعليم الوالدين)، بينما الضوابط السيئة هي متغيرات تتأثر بالمعالجة ذاتها."
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
          "en": "Suppose treatment directly influences an intermediate mediator $M_i$:\n\n$$\nM_i = \\gamma_0 + \\gamma_1 D_i + u_i\n$$\n\nWhen a researcher includes the mediator $M_i$ in the regression:\n\n$$\nY_i = \\pi_0 + \\tau_{\\text{direct}} D_i + \\theta M_i + \\nu_i\n$$\n\nSubstituting the mediator equation into the mediated outcome equation reveals the **Mediation Decomposition**:\n\n$$\nY_i = (\\pi_0 + \\theta \\gamma_0) + (\\tau_{\\text{direct}} + \\gamma_1 \\theta) D_i + (\\theta u_i + \\nu_i)\n$$\n\nThe total causal effect decomposes into direct and indirect channels:\n\n$$\n\\tau = \\underbrace{\\tau_{\\text{direct}}}_{\\text{Direct Effect}} + \\underbrace{\\gamma_1 \\cdot \\theta}_{\\text{Indirect (Mediated) Effect}}\n$$\n\nControlling for $M_i$ strictly isolates $\\tau_{\\text{direct}}$, completely erasing the indirect transmission channel $\\gamma_1 \\theta$.\n\nTo detect numerical overcontrolling and multicollinearity across regressor columns, the **Variance Inflation Factor (VIF)** of column $j$ is calculated via auxiliary regressions:\n\n$$\n\\text{VIF}_j = \\frac{1}{1 - R_j^2}\n$$\n\nwhere $R_j^2$ is the coefficient of determination from regressing regressor $\\mathbf{x}_j$ onto all remaining $K-1$ regressors.\n\n* $\\tau$: Total causal effect of policy treatment $D_i$ on final outcome $Y_i$.\n* $M_i$: Post-treatment mediator situated on the causal pathway from treatment to outcome.\n* $\\gamma_1$: First-stage effect of treatment on the mediator ($D \\to M$).\n* $\\theta$: Partial effect of the mediator on the outcome holding treatment constant ($M \\to Y$).\n* $\\tau_{\\text{direct}}$: Direct effect of treatment bypassing the mediator.\n* $\\text{VIF}_j$: Variance Inflation Factor; $\\text{VIF}_j > 10$ indicates severe multicollinearity where regressor $j$ is largely redundant.\n\nImplement the Variance Inflation Factor (VIF) diagnostic tool for each column in a design matrix using auxiliary regressions to diagnose severe overcontrolling and collinearity.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-bad-controls-mediators-overcontrolling",
          "starterCode": "def compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Matrix of explanatory covariates (K >= 2).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,)\n        VIF values for each column.\n    \"\"\"\n    # Target column to predict\n    # All remaining columns as regressors\n    # Add intercept to the auxiliary regression\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Matrix of explanatory covariates (K >= 2).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,)\n        VIF values for each column.\n    \"\"\"\n    # Target column to predict\n    # All remaining columns as regressors\n    # Add intercept to the auxiliary regression\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in X.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Matrix of explanatory covariates (K >= 2).\n        \n    Returns\n    -------\n    np.ndarray of shape (K,)\n        VIF values for each column.\n    \"\"\"\n    N, K = X.shape\n    vifs = np.zeros(K)\n    \n    for j in range(K):\n        # Target column to predict\n        y_j = X[:, j]\n        \n        # All remaining columns as regressors\n        other_indices = [idx for idx in range(K) if idx != j]\n        X_others = X[:, other_indices]\n        \n        # Add intercept to the auxiliary regression\n        X_aux = np.column_stack([np.ones(N), X_others])\n        \n        # Fit auxiliary regression y_j on X_aux\n        XtX = X_aux.T @ X_aux\n        Xty = X_aux.T @ y_j\n        beta_aux = np.linalg.solve(XtX, Xty)\n        \n        y_hat_j = X_aux @ beta_aux\n        \n        # Compute R_j^2\n        y_bar = np.mean(y_j)\n        tss = np.sum((y_j - y_bar) ** 2)\n        ssr = np.sum((y_j - y_hat_j) ** 2)\n        \n        r2_j = 1.0 - (ssr / tss) if tss > 1e-12 else 0.0\n        \n        # VIF_j = 1 / (1 - R_j^2)\n        if r2_j >= 0.999999:\n            vifs[j] = 1e6\n        else:\n            vifs[j] = 1.0 / (1.0 - r2_j)\n            \n    return vifs"
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
      "bayes-theorem"
    ],
    "x": 770,
    "y": 840,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PotentialOutcomesSplitLab",
        "narrative": {
          "en": "Before Jerzy Neyman and Donald Rubin formalized the **Potential Outcomes Framework**, causal claims in science were trapped in vague philosophical debates. Rubin demystified causality by anchoring it to a single, concrete question: **\"What if?\"**\n\nFor every individual person $i$, imagine two parallel universes:\n* Universe 1: You take an experimental headache pill ($D_i = 1$). Your headache severity is $Y_i(1)$.\n* Universe 0: You do not take the pill ($D_i = 0$). Your headache severity is $Y_i(0)$.\n\nThe true causal effect of the pill for *you specifically* is the difference between these two parallel realities:\n\n$$\n\\tau_i = Y_i(1) - Y_i(0)\n$$\n\nHere lies **The Fundamental Problem of Causal Inference**: in the real physical universe, time moves in only one direction! You either swallow the pill or you don't. You can never observe both potential outcomes for the same person at the same moment. One outcome is factual (realized and recorded); the other is a **missing counterfactual**.\n\nTherefore, causal inference is fundamentally a **missing data problem**. We can never know an individual's personal causal effect $\\tau_i$ with certainty. The entire enterprise of empirical science is designing clever ways to replace the missing counterfactual with a credible group-level substitute.\n\n$$\n\\tau_i = Y_i(1) - Y_i(0)\n$$",
          "ar": "قبل أن يصوغ جيرزي نيمان ودونالد روبين **إطار النتائج المحتملة (Potential Outcomes Framework)**، كانت مناقشات السببية حبيسة جدالات فلسفية ولغوية غامضة. أزال روبين الغموض عن السببية بربطها بسؤال واحد دقيق ومحدد: **\"ماذا لو حدث العكس؟\"**\n\nلكل شخص $i$ في المجتمع، تخيل وجود عالمين متوازيين:\n* العالم 1: تتناول قرص دواء تجريبي للصداع ($D_i = 1$). وتكون شدة الصداع الناتجة $Y_i(1)$.\n* العالم 0: لا تتناول الدواء إطلاقًا ($D_i = 0$). وتكون شدة الصداع $Y_i(0)$.\n\nالأثر السببي الحقيقي للدواء *بالنسبة لك أنت تحديدًا* هو الفارق بين هذين المسارين المتوازيين:\n\nوهنا تصطدم بالحقيقة التي لا مفر منها: **المشكلة الجوهرية للاستدلال السببي (The Fundamental Problem of Causal Inference)**: في الكون الفيزيائي الواقعي، يسير الوقت في اتجاه واحد! إما أن تبتلع القرص أو تتركه. يستحيل رصد كلتا النتيجتين المحتملتين للشخص نفسه في اللحظة الزمنية ذاتها. إحدى النتيجتين تتحقق وتصبح واقعًا مرصودًا، بينما تظل النتيجة الأخرى **بديلاً مقابلاً للواقع مفقودًا إلى الأبد (Missing Counterfactual)**.\n\nلهذا السبب، فإن الاستدلال السببي هو في جوهره **مسألة بيانات مفقودة**. لا يمكننا أبدًا معرفة الأثر الفردي $\\tau_i$ بدقة مطلقة لأي شخص بمفرده. وغاية العلم التجريبي برمته هي ابتكار طرق منهجية ذكية لاستبدال المسار المفقود ببديل جماعي موثوق ومكافئ للواقع."
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
          "en": "Two foundational population causal benchmarks exist:\n1. **Average Treatment Effect (ATE):**\n   $$\\text{ATE} \\equiv \\mathbb{E}\\big[Y_i(1) - Y_i(0)\\big]$$\n2. **Average Treatment Effect on the Treated (ATT):**\n   $$\\text{ATT} \\equiv \\mathbb{E}\\big[Y_i(1) - Y_i(0) \\mid D_i = 1\\big]$$\n\nWhen an analyst naively compares observed group means:\n\n$$\n\\Delta_{\\text{naive}} \\equiv \\mathbb{E}[Y_i \\mid D_i = 1] - \\mathbb{E}[Y_i \\mid D_i = 0]\n$$\n\nSubstituting the potential outcome definitions reveals the **Selection Bias Decomposition**:\n\n$$\n\\Delta_{\\text{naive}} = \\mathbb{E}[Y_i(1) \\mid D_i = 1] - \\mathbb{E}[Y_i(0) \\mid D_i = 0]\n$$\n\nAdding and subtracting $\\mathbb{E}[Y_i(0) \\mid D_i = 1]$:\n\n$$\n\\Delta_{\\text{naive}} = \\underbrace{\\mathbb{E}[Y_i(1) - Y_i(0) \\mid D_i = 1]}_{\\text{ATT}} + \\underbrace{\\Big\\{ \\mathbb{E}[Y_i(0) \\mid D_i = 1] - \\mathbb{E}[Y_i(0) \\mid D_i = 0] \\Big\\}}_{\\text{Baseline Selection Bias}}\n$$\n\n* $D_i \\in \\{0, 1\\}$: Binary treatment assignment indicator ($1$ for treated group, $0$ for control).\n* $Y_i(1)$: Potential outcome of unit $i$ if assigned to treatment.\n* $Y_i(0)$: Potential outcome of unit $i$ if assigned to control (counterfactual state).\n* $Y_i$: Observed scalar outcome actually realized in the dataset.\n* $\\text{ATE}$: The expected average causal impact across the entire population.\n* $\\text{ATT}$: The expected average causal impact on individuals who actively received treatment.\n* $\\text{Selection Bias}$: Difference in baseline potential outcomes in the absence of treatment between those who received treatment and those who did not.\n\nImplement the potential outcomes decomposition. Given known potential outcome vectors $Y(0)$, $Y(1)$, and treatment assignments $D$, synthesize the realized outcome $Y$ and calculate ATE, ATT, naive difference in means, and exact selection bias.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
          "en": "Why was the simple act of tossing a coin or drawing lottery numbers celebrated as a Nobel-prize-winning breakthrough in economics and social science?\n\nBecause in human societies, **nobody chooses actions at random**. Sick people visit doctors; ambitious and wealthy students enroll in prestigious universities; struggling, low-margin businesses apply for government relief subsidies. Whenever individuals select themselves into treatment, observed comparisons are poisoned by **Selection Bias**.\n\nA randomized lottery operates as a **causal scalpel**:\nBy assigning treatment strictly through a random coin toss ($D_i \\perp\\!\\!\\perp (Y_i(0), Y_i(1))$), the lottery severs every pre-existing link between a participant's background health, wealth, drive, or genetic makeup and their receipt of treatment.\n\nBefore the medicine is administered, the treated cohort and the control cohort are **statistical twins** across every observable and unobservable characteristic on Earth. In mathematical expectation, their baseline untreated outcomes are perfectly equal:\n\n$$\n\\mathbb{E}[Y_i(0) \\mid D_i = 1] = \\mathbb{E}[Y_i(0) \\mid D_i = 0]\n$$\n\nThe selection bias term evaporates to exactly zero! Any difference in post-treatment outcomes can now be attributed solely and unambiguously to the causal potency of the treatment itself.\n\n$$\n\\mathbb{E}[Y_i(0) \\mid D_i = 1] = \\mathbb{E}[Y_i(0) \\mid D_i = 0]\n$$",
          "ar": "لماذا اعتُبر الفعل البسيط المتمثل في رمي قطعة نقود أو السحب بالقرعة فتحًا علميًا استحق أرفع جوائز نوبل في الاقتصاد والعلوم الاجتماعية؟\n\nلأنه في المجتمعات البشرية، **لا يتخذ أحد قراراته بصورة عشوائية**. فالمرضى هم من يقصدون الأطباء، والطلاب الأوسع طموحًا وثراءً هم من يلتحقون بالجامعات المرموقة، والشركات الأشد تعثرًا هي من تتقدم بطلبات الدعم الحكومي. وعندما يختار الأفراد مسارهم بأنفسهم، تتلوث المقارنات المباشرة بـ **انحياز الاختيار (Selection Bias)**.\n\nتعمل القرعة العشوائية كـ **مشرط جراحي سببي**:\nبتوزيع المعالجة عبر يانصيب عشوائي بحت ($D_i \\perp\\!\\!\\perp (Y_i(0), Y_i(1))$)، تقطع القرعة أي صلة مسبقة بين صفات المشارك الذاتية (كالصحة أو الثروة أو الدافع الفطري) وقرار تلقيه العلاج.\n\nوقبل إعطاء العلاج، تصبح المجموعة المعالجة والمجموعة الضابطة **توأمين إحصائيين متطابقين** في كافة الخصائص المرصودة وغير المرصودة. وفي التوقع الرياضي، تتطابق نتائجهما الأساسية تمامًا في غياب المعالجة:\n\nيتلاشى انحياز الاختيار ليصبح صفرًا رياضيًا تامًا! وأي فارق يُرصد لاحقًا في النتائج يُنسب يقينًا إلى الأثر السببي الصافي للمعالجة وحدها دون أي تشويش."
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
          "en": "This independence immediately guarantees balance in untreated counterfactuals:\n\n$$\n\\mathbb{E}[Y_i(0) \\mid D_i = 1] = \\mathbb{E}[Y_i(0) \\mid D_i = 0] = \\mathbb{E}[Y_i(0)]\n$$\n\n$$\n\\mathbb{E}[Y_i(1) \\mid D_i = 1] = \\mathbb{E}[Y_i(1) \\mid D_i = 0] = \\mathbb{E}[Y_i(1)]\n$$\n\nSubstituting this into the selection bias decomposition eliminates the bias term:\n\n$$\n\\Delta_{\\text{naive}} = \\mathbb{E}[Y_i \\mid D_i = 1] - \\mathbb{E}[Y_i \\mid D_i = 0] = \\mathbb{E}[Y_i(1)] - \\mathbb{E}[Y_i(0)] \\equiv \\text{ATE} = \\text{ATT}\n$$\n\nWhen working with observational data where random assignment is impossible, the **Conditional Independence Assumption (CIA)** ($D_i \\perp\\!\\!\\perp (Y_i(0), Y_i(1)) \\mid \\mathbf{X}_i$) allows recovery of the causal ATE via the **Inverse Probability Weighting (IPW)** estimator:\n\n$$\ne(\\mathbf{X}_i) \\equiv P(D_i = 1 \\mid \\mathbf{X}_i) \\quad (\\text{Propensity Score})\n$$\n\n$$\n\\hat{\\tau}_{\\text{IPW}} = \\frac{1}{N} \\sum_{i=1}^N \\left( \\frac{D_i Y_i}{e(\\mathbf{X}_i)} - \\frac{(1 - D_i) Y_i}{1 - e(\\mathbf{X}_i)} \\right)\n$$\n\n* $\\perp\\!\\!\\perp$: Orthogonal statistical independence relation between random variables.\n* $D_i \\perp\\!\\!\\perp (Y_i(0), Y_i(1))$: Random assignment invariant ensuring absence of unobserved confounding.\n* $e(\\mathbf{X}_i) \\in (0, 1)$: Propensity score representing the conditional probability of assignment to treatment given observable covariates $\\mathbf{X}_i$.\n* $\\hat{\\tau}_{\\text{IPW}}$: Horvitz-Thompson / Inverse Probability Weighting estimator which reconstructs an artificial randomized trial by weighting observational units by the inverse probability of their assigned status.\n\nImplement the normalized Inverse Probability Weighting (IPW) estimator for the Average Treatment Effect (ATE). Ensure numerical stability by clipping extreme propensity scores away from $0$ and $1$.",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
      "en": "Judea Pearl revolutionized causal inference by replacing complex probabilistic equations with transparent, intuitive visual network graphs:...",
      "ar": "أحدث جوديا بيرل ثورة في الاستدلال السببي باستبدال المعادلات الاحتمالية المعقدة بشبكات بيانية بصرية واضحة وبديهية: المخططات الموجهة غير..."
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
          "en": "Judea Pearl revolutionized causal inference by replacing complex probabilistic equations with transparent, intuitive visual network graphs: **Directed Acyclic Graphs (DAGs)**.\n\nThink of statistical information flowing through a causal graph like water through a plumbing network or electrical current through a circuit:\n1. **The Chain ($X \\to M \\to Y$):** Water flows directly from $X$ through the mediator $M$ to $Y$. Treatment causes the mediator, which in turn causes the outcome. If you close the valve at $M$ (condition on $M$), the pipe is blocked and information stops flowing.\n2. **The Fork ($X \\leftarrow Z \\to Y$):** Here, $Z$ is a **confounder**—a common cause that feeds into both $X$ and $Y$. Because water flows downhill out of $Z$ in both directions, a non-causal **\"Backdoor Path\"** connects $X$ and $Y$!\n\nConsider the classic real-world paradox: municipal ice cream sales ($X$) and public pool drowning accidents ($Y$) are strongly positively correlated. Does eating strawberry ice cream cause swimmers to cramp and drown? Obviously not. Summer heatwaves ($Z$) are the common cause: high temperatures cause people to buy ice cream ($Z \\to X$) while simultaneously driving thousands of people to swim in pools ($Z \\to Y$).\n\nIf you fail to condition on the temperature $Z$, the backdoor pipe remains wide open, creating a phantom statistical association between ice cream and drownings! Pearl's **Backdoor Criterion** is the master blueprint that tells you exactly which valves to shut (which variables to adjust for) to seal off all confounding backdoor leaks while leaving the authentic causal pipeline wide open.",
          "ar": "أحدث جوديا بيرل ثورة في الاستدلال السببي باستبدال المعادلات الاحتمالية المعقدة بشبكات بيانية بصرية واضحة وبديهية: **المخططات الموجهة غير الدائرية (Causal DAGs)**.\n\nتخيل تدفق المعلومات الإحصائية عبر الرسم البياني السببي كتدفق المياه عبر شبكة أنابيب أو التيار في دائرة كهربائية:\n1. **السلسلة ($X \\to M \\to Y$):** تتدفق المياه مباشرة من المعالجة $X$ عبر المتغير الوسيط $M$ إلى النتيجة $Y$. المعالجة تسبب الوسيط، والوسيط يسبب النتيجة. إذا أغلقت الصمام عند $M$ (التحكم في $M$)، ينسد الأنبوب ويتوقف التدفق تمامًا.\n2. **الشوكة المربكة ($X \\leftarrow Z \\to Y$):** هنا يمثل $Z$ **متغيرًا مربكًا (Confounder)**—سببًا مشتركًا يغذي كلاً من $X$ و $Y$. ولأن المياه تتدفق من $Z$ في كلا الاتجاهين، ينفتح **\"مسار باب خلفي\" (Backdoor Path)** غير سببي يربط بين $X$ و $Y$!\n\nتأمل المفارقة الواقعية الشهيرة: مبيعات الآيس كريم ($X$) وحالات الغرق في المسابح ($Y$) ترتبطان بعلاقة طردية قوية جدًا. فهل يؤدي تناول الآيس كريم إلى غرق السباحين؟ قطعًا لا. إن حرارة فصل الصيف المرتفعة ($Z$) هي السبب المشترك الحقيقي: فالحر الشديد يدفع الناس لشراء الآيس كريم ($Z \\to X$) ويدفعهم في الوقت ذاته للنزول إلى المسابح ($Z \\to Y$).\n\nإذا لم تتحكم في درجة الحرارة $Z$، يظل أنبوب الباب الخلفي مفتوحًا على مصراعيه، مما يوهم بوجود علاقة سببية بين الآيس كريم والغرق! ويُعد **معيار الباب الخلفي لجوديا بيرل** هو الدليل الهندسي الذي يحدد الصمامات الدقيقة الواجب إغلاقها (المتغيرات المطلوب ضبطها) لسد كافة تسريبات الباب الخلفي، مع الحفاظ على أنبوب التأثير السببي الحقيقي نقيًا وصريحًا."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "P(Y \\mid \\text{do}(X = x)) = \\sum_{\\mathbf{z}} P(Y \\mid X = x, \\mathbf{Z} = \\mathbf{z}) P(\\mathbf{Z} = \\mathbf{z})",
        "formulaNote": {
          "en": "Core invariant for Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation.",
          "ar": "الخاصية الرياضية الجوهرية لـ المخططات السببية الموجهة غير الدائرية ومسارات الفصل d."
        },
        "narrative": {
          "en": "For a discrete confounder $Z$ with strata $z \\in \\{1, \\dots, S\\}$, the Average Treatment Effect (ATE) is:\n\n$$\n\\text{ATE} = \\sum_{s=1}^S \\Big( \\mathbb{E}[Y \\mid X = 1, Z = s] - \\mathbb{E}[Y \\mid X = 0, Z = s] \\Big) \\cdot P(Z = s)\n$$\n\n* $\\text{do}(X = x)$: Pearl's mathematical operator denoting an active physical intervention that severs all incoming arrows to $X$, transforming the natural graph $\\mathcal{G}$ into the manipulated graph $\\mathcal{G}_{\\bar{X}}$.\n* $X \\leftarrow Z \\to Y$: Confounding fork structure inducing spurious covariance $\\text{Cov}(X, Y) \\ne 0$ even when $X$ has zero causal impact on $Y$.\n* $\\mathbf{Z}$: Conditioning set that satisfies the Backdoor Criterion by closing all non-causal associative channels.\n* $P(Z = s)$: Marginal population prevalence weight of stratum $s$.\n\nImplement the Backdoor Criterion adjustment formula via subclassification over discrete confounder strata. For each stratum of $Z$, compute the difference in treatment means, and compute the population-weighted ATE.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-causal-inference-confounding",
          "starterCode": "def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    \"\"\"\n    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 or 0).\n    z_strata : np.ndarray of shape (N,)\n        Discrete confounder strata indicators.\n        \n    Returns\n    -------\n    float: Causal Average Treatment Effect\n    \"\"\"\n    # Mask for units in stratum s\n    # Treatment and control masks within stratum\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    \"\"\"\n    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 or 0).\n    z_strata : np.ndarray of shape (N,)\n        Discrete confounder strata indicators.\n        \n    Returns\n    -------\n    float: Causal Average Treatment Effect\n    \"\"\"\n    # Mask for units in stratum s\n    # Treatment and control masks within stratum\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.5"
            }
          },
          "solution": "import numpy as np\n\ndef backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    \"\"\"\n    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Observed continuous outcome.\n    d : np.ndarray of shape (N,)\n        Binary treatment assignment (1 or 0).\n    z_strata : np.ndarray of shape (N,)\n        Discrete confounder strata indicators.\n        \n    Returns\n    -------\n    float: Causal Average Treatment Effect\n    \"\"\"\n    N = len(y)\n    unique_strata = np.unique(z_strata)\n    weighted_ate = 0.0\n    \n    for s in unique_strata:\n        # Mask for units in stratum s\n        stratum_mask = (z_strata == s)\n        n_s = np.sum(stratum_mask)\n        p_s = n_s / N\n        \n        # Treatment and control masks within stratum\n        treated_in_s = stratum_mask & (d == 1)\n        control_in_s = stratum_mask & (d == 0)\n        \n        if np.sum(treated_in_s) > 0 and np.sum(control_in_s) > 0:\n            mean_treated = np.mean(y[treated_in_s])\n            mean_control = np.mean(y[control_in_s])\n            stratum_diff = mean_treated - mean_control\n            weighted_ate += stratum_diff * p_s\n            \n    return float(weighted_ate)"
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
      "en": "Most people easily understand that failing to control for a common cause creates confounding bias.",
      "ar": "يدرك معظم الناس بسهولة أن إهمال التحكم في سبب مشترك يولد تحيزًا مربكًا. ولكن ماذا لو كان التحكم في متغير إضافي يخلق ارتباطًا وهميًا قويًا..."
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
          "en": "Most people easily understand that *failing* to control for a common cause creates confounding bias. But what if controlling for a variable **creates a strong, phantom correlation where zero correlation existed before?**\n\nThis is the mind-bending trap of the **Collider ($A \\to C \\leftarrow B$)**. A collider occurs whenever two independent phenomena $A$ and $B$ both exert an influence on a shared third outcome $C$.\n\nImagine you are evaluating Hollywood movie stars on two completely independent traits:\n* Genuine Acting Talent ($A$)\n* Breathtaking Physical Attractiveness ($B$)\n\nIn the general global population, acting talent and physical attractiveness are completely uncorrelated ($r = 0$): having a great voice or dramatic range has nothing to do with cheekbone symmetry.\n\nHowever, to become a famous Hollywood celebrity ($C = 1$), a person must possess at least one of these two gifts: you must be either a transcendentally talented actor, or drop-dead gorgeous!\nIf you restrict your study sample strictly to Hollywood stars (by conditioning on the collider $C = 1$), **talent and attractiveness become strongly NEGATIVELY correlated ($r < 0$)!**\n\nWhy? Because if you meet a famous Hollywood star who is a clumsy, mediocre actor, you can immediately deduce that they must be exceptionally attractive to have achieved fame. Conversely, an average-looking actor who achieved stardom must possess world-class acting genius.\n\nIn 1946, Joseph Berkson discovered this exact phenomenon in medical records: two completely unrelated diseases appeared strongly negatively associated among hospitalized patients simply because having either disease was sufficient to admit you to the hospital ($C = 1$). **Conditioning on a collider manufactures spurious correlations out of thin air.**",
          "ar": "يدرك معظم الناس بسهولة أن *إهمال* التحكم في سبب مشترك يولد تحيزًا مربكًا. ولكن ماذا لو كان التحكم في متغير إضافي **يخلق ارتباطًا وهميًا قويًا لم يكن له وجود في الأصل؟**\n\nهذا هو الفخ الذهني الخادع لـ **المصادم (Collider: $A \\to C \\leftarrow B$)**. يحدث المصادم عندما يؤثر سببان مستقلان $A$ و $B$ في نتيجة ثالثة مشتركة $C$.\n\nتخيل أنك تقيم ممثلي السينما العالمية بناءً على سمتين مستقلتين تمامًا:\n* موهبة التمثيل الفذة ($A$)\n* الوسامة والجاذبية الجسدية الباهرة ($B$)\n\nفي المجتمع الإنساني العام، لا ترتبط موهبة التمثيل بالوسامة إطلاقًا ($r = 0$)؛ فالقدرة على الأداء الدرامي لا علاقة لها بتناسق ملامح الوجه.\n\nولكن للوصول إلى النجومية والشهرة في هوليوود ($C = 1$)، يجب أن يمتلك الشخص إحدى هاتين الميزتين على الأقل: إما موهبة تمثيلية استثنائية، أو وسامة خارقة للعادة!\nفإذا حصرت دراستك على مشاهير هوليوود فقط (أي قمت بالتكييف والتحكم في المصادم $C = 1$)، **ستجد فجأة ارتباطًا سالبًا قويًا بين الموهبة والوسامة ($r < 0$)!**\n\nلماذا؟ لأنه إذا قابلت ممثلاً مشهورًا وأداؤه التمثيلي متواضع ورديء، ستستنتج تلقائيًا أنه شديد الوسامة لدرجة مكنته من بلوغ الشهرة. وعلى العكس، فالممثل المشهور ذو المظهر العادي لا بد وأنه يمتلك عبقرية تمثيلية نادرة.\n\nفي عام 1946، اكتشف جوزيف بيركسون هذه الظاهرة بدقة في السجلات الطبية: مرضان لا صلة بينهما إطلاقًا ظهرا بارتباط سالب قوي بين المرضى المقيمين في المستشفى لمجرد أن الإصابة بأي منهما كافية لإدخالك المستشفى ($C = 1$). **التكييف على المصادم يصنع أوهامًا إحصائية من العدم.**"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "A \\perp\\!\\!\\perp B \\implies P(A = 1, B = 1) = P(A = 1) \\cdot P(B = 1)",
        "formulaNote": {
          "en": "Core invariant for Collider Conditioning & Berkson's Paradox.",
          "ar": "الخاصية الرياضية الجوهرية لـ تكييف المصادم ومفارقة بيركسون."
        },
        "narrative": {
          "en": "Define the collider $C \\in \\{0, 1\\}$ as the logical union (or thresholded linear combination):\n\n$$\nC = A \\lor B \\iff C = \\mathbb{I}(A + B \\ge 1)\n$$\n\nConditioning on the collider event $C = 1$ induces conditional dependence:\n\n$$\nP(A = 1 \\mid C = 1, B = 1) = \\frac{P(A = 1, B = 1, C = 1)}{P(B = 1, C = 1)} = \\frac{P(A = 1) P(B = 1)}{P(B = 1)} = P(A = 1) = p_A\n$$\n\n$$\nP(A = 1 \\mid C = 1, B = 0) = \\frac{P(A = 1, B = 0, C = 1)}{P(B = 0, C = 1)} = \\frac{P(A = 1) P(B = 0)}{P(A = 1, B = 0)} = 1.0 \\ne p_A\n$$\n\nBecause $P(A = 1 \\mid C = 1, B = 0) > P(A = 1 \\mid C = 1, B = 1)$, knowing that $B$ is absent guarantees that $A$ is present. The conditional covariance is strictly negative:\n\n$$\n\\text{Cov}(A, B \\mid C = 1) < 0\n$$\n\nIn Judea Pearl's **d-separation calculus**, a path containing a collider node $A \\to C \\leftarrow B$ is naturally **blocked** when $C$ is unobserved. Conditioning on $C$ (or any descendant of $C$) **unblocks the path**, allowing spurious statistical flow between $A$ and $B$.\n\n* $A, B$: Truly independent causal forces in the general population ($\\text{Cov}(A, B) = 0$).\n* $C$: Collider node where two incoming directed arrows collide ($A \\to C \\leftarrow B$).\n* $C = 1$: The conditioning / filtering / selection event that truncates the sample to a non-representative subgroup.\n* $\\text{Cov}(A, B \\mid C = 1) < 0$: Negative Berkson bias induced purely by sample stratification.\n\nImplement a simulation of Berkson's paradox. Generate independent variables $X$ and $Y$, construct an admission collider $C = \\mathbb{I}(X + Y > \\tau)$, and demonstrate that unconditioned correlation is zero while conditioned correlation is strongly negative.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-collider-conditioning-berksons",
          "starterCode": "def simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.\n    \n    Parameters\n    ----------\n    n : int, default 1000\n        Number of simulated individuals.\n    seed : int, default 42\n        Random seed for reproducibility.\n        \n    Returns\n    -------\n    dict with keys:\n        'unconditioned_corr': float, correlation in full population\n        'conditioned_corr': float, correlation among selected collider subgroup\n        'sample_size_conditioned': int, count of individuals admitted\n    \"\"\"\n    # Step 1: Generate two strictly independent standard normal variables\n    # Step 2: Unconditioned population correlation\n    # Step 3: Define a collider selection threshold (e.g., top 30% combined score)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.\n    \n    Parameters\n    ----------\n    n : int, default 1000\n        Number of simulated individuals.\n    seed : int, default 42\n        Random seed for reproducibility.\n        \n    Returns\n    -------\n    dict with keys:\n        'unconditioned_corr': float, correlation in full population\n        'conditioned_corr': float, correlation among selected collider subgroup\n        'sample_size_conditioned': int, count of individuals admitted\n    \"\"\"\n    # Step 1: Generate two strictly independent standard normal variables\n    # Step 2: Unconditioned population correlation\n    # Step 3: Define a collider selection threshold (e.g., top 30% combined score)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.\n    \n    Parameters\n    ----------\n    n : int, default 1000\n        Number of simulated individuals.\n    seed : int, default 42\n        Random seed for reproducibility.\n        \n    Returns\n    -------\n    dict with keys:\n        'unconditioned_corr': float, correlation in full population\n        'conditioned_corr': float, correlation among selected collider subgroup\n        'sample_size_conditioned': int, count of individuals admitted\n    \"\"\"\n    rng = np.random.default_rng(seed)\n    \n    # Step 1: Generate two strictly independent standard normal variables\n    x = rng.standard_normal(n)\n    y = rng.standard_normal(n)\n    \n    # Step 2: Unconditioned population correlation\n    unconditioned_corr = float(np.corrcoef(x, y)[0, 1])\n    \n    # Step 3: Define a collider selection threshold (e.g., top 30% combined score)\n    collider = (x + y > 0.5)\n    \n    # Step 4: Subsample data conditioned on collider == True\n    x_cond = x[collider]\n    y_cond = y[collider]\n    \n    # Step 5: Conditioned correlation\n    conditioned_corr = float(np.corrcoef(x_cond, y_cond)[0, 1])\n    \n    return {\n        \"unconditioned_corr\": unconditioned_corr,\n        \"conditioned_corr\": conditioned_corr,\n        \"sample_size_conditioned\": int(np.sum(collider)),\n    }"
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
            "en": "A medical researcher analyzes clinical records exclusively from hospitalized patients and discovers that among patients with hypertension ($A$), the incidence of type-2 diabetes ($B$) is significantly lower than among hospitalized patients without hypertension. A health news blog publishes: *\"Surprising medical discovery: Hypertension protects against diabetes!\"* How should an epidemiologist trained in causal DAGs diagnose this study?",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
      "en": "What can an empirical economist do when a treatment $D$ is inextricably tangled with unobserved confounders (endogeneity), such that OLS is...",
      "ar": "ماذا يفعل الباحث الاقتصادي عندما يكون متغير المعالجة $D$ متشابكًا بصورة ميؤوس منها مع متغيرات خفية ومربكة (Endogeneity)، بحيث يصبح انحدار..."
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
          "en": "What can an empirical economist do when a treatment $D$ is inextricably tangled with unobserved confounders (endogeneity), such that OLS is hopelessly biased, and running an actual Randomized Controlled Trial is physically impossible or strictly unethical?\n\nFor example, consider estimating the economic return to schooling on lifetime earnings. People who complete more years of schooling often possess higher innate drive, family connections, and cognitive ability. Because we cannot randomly force children to drop out of school, OLS will always confuse schooling with unobserved innate talent.\n\nEconometricians solve this puzzle using an **Instrumental Variable ($Z$)**. Think of an instrument as a **natural gust of wind** or a coin toss engineered by nature that nudges people into treatment from the outside:\n* It pushes some people into taking treatment $D$.\n* It has no connection whatsoever to the unobserved confounders ($\\varepsilon$).\n* It has **no direct path to the outcome $Y$** except through its effect on treatment!\n\nFor an instrument $Z$ to be valid, it must strictly satisfy two golden commandments:\n1. **Instrument Relevance:** The instrument must actually shift treatment ($\\text{Cov}(Z, D) \\ne 0$). If the wind doesn't blow, the sailboat doesn't move!\n2. **The Exclusion Restriction:** The instrument must affect the outcome $Y$ *exclusively* through the treatment channel $D$ ($\\text{Cov}(Z, \\varepsilon) = 0$).\n\nThe **Wald Estimator** is the elegant ratio of two simple numbers:\n$$\\hat{\\beta}_{\\text{IV}} = \\frac{\\text{Effect of Instrument on Outcome (Reduced Form)}}{\\text{Effect of Instrument on Treatment (First Stage Compliance)}}$$\nBy dividing the total nudge on outcome by the take-up rate, IV scales up the variation to recover the untainted causal effect!",
          "ar": "ماذا يفعل الباحث الاقتصادي عندما يكون متغير المعالجة $D$ متشابكًا بصورة ميؤوس منها مع متغيرات خفية ومربكة (Endogeneity)، بحيث يصبح انحدار OLS متحيزًا حتمًا، ويكون إجراء تجربة عشوائية منضبطة مستحيلاً عمليًا أو محظورًا أخلاقيًا؟\n\nتأمل مثلاً قياس العائد المالي للتعليم على الأجور طوال العمر. الأفراد الذين يكملون سنوات دراسية أطول يمتلكون في الغالب ذكاءً فطريًا أعلى، وعلاقات أسرية أوسع، وإصرارًا ذاتيًا أقوى. ونظرًا لأنه لا يمكننا إجبار عينة عشوائية من الأطفال على ترك التعليم المدرسي قسرًا، سيظل OLS يخلط أثر التعليم بذكاء الفرد الفطري غير المرصود.\n\nيحل الاقتصاديون هذا اللغز باستخدام **المتغير الآداتي (Instrumental Variable - $Z$)**. تخيل الأداة كـ **هبة ريح طبيعية خارجية** أو قرعة عشوائية تجريها الطبيعة تدفع الناس نحو المعالجة من الخارج:\n* تحفز بعض الناس على تلقي المعالجة $D$.\n* لا ترتبط إطلاقًا بالعوامل الخفية والمربكة ($\\varepsilon$).\n* **لا تؤثر على النتيجة $Y$ بأي طريق مباشر** إلا من خلال قناة المعالجة $D$ فقط!\n\nلتكون الأداة صالحة قانونيًا ورياضيًا، يجب أن تستوفي شرطين مقدسين:\n1. **ملاءمة الأداة (Relevance):** أن تحرك الأداة متغير المعالجة فعليًا ($\\text{Cov}(Z, D) \\ne 0$). فإذا لم تهب الرياح، فلن يتحرك الشراع!\n2. **قيد الاستبعاد (Exclusion Restriction):** ألا تؤثر الأداة على النتيجة $Y$ إلا *حصرًا* عبر المعالجة $D$ دون أي قناة خلفية ($\\text{Cov}(Z, \\varepsilon) = 0$).\n\n**مقدر فالد (Wald Estimator)** هو حاصل قسمة رقمين بسيطين:\n$$\\hat{\\beta}_{\\text{IV}} = \\frac{\\text{أثر الأداة على النتيجة (النموذج المختزل)}}{\\text{أثر الأداة على المعالجة (امتثال المرحلة الأولى)}}$$\nبقسمة الأثر الإجمالي على نسبة الامتثال، يعيد مقدر IV تضخيم النسبة لعزل الأثر السببي الصافي وتطهيره من أي شوائب خفية!"
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
          "en": "Because of endogeneity, $\\text{plim} \\, \\hat{\\beta}_{1, \\text{OLS}} = \\beta_1 + \\frac{\\text{Cov}(D_i, \\varepsilon_i)}{\\mathbb{V}(D_i)} \\ne \\beta_1$.\n\nLet $Z_i$ be a binary instrumental variable satisfying the two identification conditions:\n1. **First-Stage Relevance:** $\\text{Cov}(Z_i, D_i) \\ne 0 \\iff \\mathbb{E}[D_i \\mid Z_i = 1] \\ne \\mathbb{E}[D_i \\mid Z_i = 0]$\n2. **Exclusion Restriction:** $\\text{Cov}(Z_i, \\varepsilon_i) = 0 \\iff \\mathbb{E}[\\varepsilon_i \\mid Z_i = 1] = \\mathbb{E}[\\varepsilon_i \\mid Z_i = 0] = 0$\n\nTaking the covariance of both sides of the structural equation with $Z_i$:\n\n$$\n\\text{Cov}(Z_i, y_i) = \\beta_1 \\text{Cov}(Z_i, D_i) + \\underbrace{\\text{Cov}(Z_i, \\varepsilon_i)}_{= 0}\n$$\n\nSolving for $\\beta_1$ yields the population **Instrumental Variables Estimator**:\n\n$$\n\\beta_1 = \\frac{\\text{Cov}(Z_i, y_i)}{\\text{Cov}(Z_i, D_i)}\n$$\n\nFor a binary instrument $Z_i \\in \\{0, 1\\}$, substituting sample differences in expectations yields the **Wald Estimator**:\n\n$$\n\\hat{\\beta}_{\\text{Wald}} = \\frac{\\mathbb{E}[y_i \\mid Z_i = 1] - \\mathbb{E}[y_i \\mid Z_i = 0]}{\\mathbb{E}[D_i \\mid Z_i = 1] - \\mathbb{E}[D_i \\mid Z_i = 0]} \\equiv \\frac{\\text{Reduced Form Intent-to-Treat}}{\\text{First Stage Compliance Rate}}\n$$\n\n* $D_i$: Endogenous treatment variable correlated with unobserved disturbance term $\\varepsilon_i$.\n* $Z_i$: Instrumental variable serving as an exogenous shock to treatment probability.\n* $\\text{Cov}(Z_i, D_i) \\ne 0$: Relevance condition ensuring the first stage has explanatory power.\n* $\\text{Cov}(Z_i, \\varepsilon_i) = 0$: Exclusion restriction stating that the instrument is uncorrelated with unobserved determinants of $y_i$.\n* $\\mathbb{E}[y_i \\mid Z_i = 1] - \\mathbb{E}[y_i \\mid Z_i = 0]$: Reduced form estimate measuring the total effect of the instrument assignment on the final outcome.\n* $\\mathbb{E}[D_i \\mid Z_i = 1] - \\mathbb{E}[D_i \\mid Z_i = 0]$: First-stage compliance differential measuring the change in treatment uptake induced by the instrument.\n\nImplement the empirical Wald estimator for a binary instrumental variable setting. Calculate the first-stage compliance rate, the reduced-form effect, and the resulting causal Wald estimate.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-instrumental-variables-2sls",
          "starterCode": "def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Continuous outcome vector.\n    d : np.ndarray of shape (N,)\n        Binary endogenous treatment (0 or 1).\n    z : np.ndarray of shape (N,)\n        Binary instrument (0 or 1).\n        \n    Returns\n    -------\n    dict with keys:\n        'first_stage_compliance': float, E[D|Z=1] - E[D|Z=0]\n        'reduced_form_intent': float, E[Y|Z=1] - E[Y|Z=0]\n        'wald_estimate': float, reduced_form / first_stage\n    \"\"\"\n    # Step 1: First-stage compliance effect: E[D|Z=1] - E[D|Z=0]\n    # Step 2: Reduced-form intent-to-treat effect: E[Y|Z=1] - E[Y|Z=0]\n    # Step 3: Wald Estimator = Reduced Form / First Stage\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Continuous outcome vector.\n    d : np.ndarray of shape (N,)\n        Binary endogenous treatment (0 or 1).\n    z : np.ndarray of shape (N,)\n        Binary instrument (0 or 1).\n        \n    Returns\n    -------\n    dict with keys:\n        'first_stage_compliance': float, E[D|Z=1] - E[D|Z=0]\n        'reduced_form_intent': float, E[Y|Z=1] - E[Y|Z=0]\n        'wald_estimate': float, reduced_form / first_stage\n    \"\"\"\n    # Step 1: First-stage compliance effect: E[D|Z=1] - E[D|Z=0]\n    # Step 2: Reduced-form intent-to-treat effect: E[Y|Z=1] - E[Y|Z=0]\n    # Step 3: Wald Estimator = Reduced Form / First Stage\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Continuous outcome vector.\n    d : np.ndarray of shape (N,)\n        Binary endogenous treatment (0 or 1).\n    z : np.ndarray of shape (N,)\n        Binary instrument (0 or 1).\n        \n    Returns\n    -------\n    dict with keys:\n        'first_stage_compliance': float, E[D|Z=1] - E[D|Z=0]\n        'reduced_form_intent': float, E[Y|Z=1] - E[Y|Z=0]\n        'wald_estimate': float, reduced_form / first_stage\n    \"\"\"\n    z1_mask = (z == 1)\n    z0_mask = (z == 0)\n    \n    # Step 1: First-stage compliance effect: E[D|Z=1] - E[D|Z=0]\n    mean_d_z1 = float(np.mean(d[z1_mask]))\n    mean_d_z0 = float(np.mean(d[z0_mask]))\n    first_stage = mean_d_z1 - mean_d_z0\n    \n    # Step 2: Reduced-form intent-to-treat effect: E[Y|Z=1] - E[Y|Z=0]\n    mean_y_z1 = float(np.mean(y[z1_mask]))\n    mean_y_z0 = float(np.mean(y[z0_mask]))\n    reduced_form = mean_y_z1 - mean_y_z0\n    \n    # Step 3: Wald Estimator = Reduced Form / First Stage\n    if abs(first_stage) > 1e-12:\n        wald = float(reduced_form / first_stage)\n    else:\n        wald = 0.0\n        \n    return {\n        \"first_stage_compliance\": first_stage,\n        \"reduced_form_intent\": reduced_form,\n        \"wald_estimate\": wald,\n    }"
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
            "en": "In his landmark study, Joshua Angrist (1990) utilized the **Vietnam Draft Lottery** ($Z = 1$ if low lottery number assigned draft eligibility, $0$ otherwise) to estimate the causal effect of military service ($D$) on civilian earnings ($Y$). Why was the draft lottery number an exceptionally credible instrument satisfying both relevance and the exclusion restriction?",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
      "ar": "ماذا يحدث عندما يحتوي النموذج القياسي على أدوات متعددة، ومتغيرات داخلية متعددة، وضوابط تحكم خارجية؟ في هذه الحالة، تعجز نسبة فالد البسيطة..."
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
          "en": "What happens when an econometric model contains multiple instruments, multiple endogenous regressors, and exogenous control covariates? The simple Wald ratio can no longer be computed directly.\n\n**Two-Stage Least Squares (2SLS)** is the general matrix machine that extends instrumental variables to any number of dimensions:\n1. **Stage 1 (Purification):** Regress the endogenous variable $\\mathbf{X}$ onto all instruments and controls $\\mathbf{Z}$. The fitted values $\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}$ represent the *exogenous variation* in treatment driven strictly by the instruments.\n2. **Stage 2 (Estimation):** Regress the outcome $\\mathbf{y}$ on the purified predictions $\\hat{\\mathbf{X}}$.\n\n> **CRITICAL SOFTWARE PITFALL:** You must **NEVER** run two separate manual OLS regressions and trust the second-stage software standard errors! The manual second stage calculates residuals as $\\mathbf{y} - \\hat{\\mathbf{X}}\\hat{\\boldsymbol{\\beta}}$, which artificially shrinks standard errors and inflates $t$-statistics. Proper 2SLS must evaluate variance using the **true structural residuals** $\\mathbf{e}_{\\text{structural}} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$.\n\nFurthermore, what if people respond differently to treatment? In their 2021 Nobel-prize-winning breakthrough, Joshua Angrist and Guido Imbens proved the **LATE Theorem (Local Average Treatment Effect)**:\nWhen treatment effects vary across individuals, IV does not measure the average effect across everyone (ATE). Instead, it identifies the causal effect **exclusively for the Compliers**: individuals who comply with the nudge of the instrument (taking treatment if assigned $Z=1$, but refusing if $Z=0$). It tells us nothing about *Always-Takers* or *Never-Takers*, and assumes that *Defiers* (contrarians who do the exact opposite of the instrument) do not exist (the Monotonicity Assumption).",
          "ar": "ماذا يحدث عندما يحتوي النموذج القياسي على أدوات متعددة، ومتغيرات داخلية متعددة، وضوابط تحكم خارجية؟ في هذه الحالة، تعجز نسبة فالد البسيطة عن حل المسألة بمفردها.\n\nتُعد **المربعات الصغرى ذات المرحلتين (2SLS)** هي الآلة المصفوفية الشاملة التي تعمم المتغيرات الآداتية عبر أبعاد متعددة:\n1. **المرحلة الأولى (التطهير والفلترة):** نجري انحدارًا للمتغير الداخلي $\\mathbf{X}$ على كافة الأدوات والضوابط $\\mathbf{Z}$. تمثل القيم المقدرة $\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}$ *التباين الخارجي النقي* الذي تحركه الأدوات دون سواها.\n2. **المرحلة الثانية (التقدير الهيكلي):** نجري انحدارًا لمتغير النتيجة $\\mathbf{y}$ على القيم المطهرة المقدرة $\\hat{\\mathbf{X}}$.\n\n> **فخ برمجي خطير:** إياك أن تجري انحدارين منفصلين يدويًا وتعتمد الأخطاء المعيارية للمرحلة الثانية! فالانحدار اليدوي يحسب البواقي استنادًا إلى $\\mathbf{y} - \\hat{\\mathbf{X}}\\hat{\\boldsymbol{\\beta}}$، مما يقلص التباين زائفًا ويضخم الدلالة الإحصائية. يجب على برنامج 2SLS السليم حساب التباين دائمًا باستخدام **البواقي الهيكلية الحقيقية** $\\mathbf{e}_{\\text{structural}} = \\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$.\n\nوالأهم من ذلك: ماذا لو كان أثر المعالجة متفاوتًا بين الأفراد؟ في دراستهما التاريخية الحائزة على جائزة نوبل 2021، أثبت جوشوا أنغريست وغيدو إمبنز **مبرهنة LATE (متوسط الأثر الموضعي للمعالجة)**:\nعندما تكون الآثار غير متجانسة، لا يقيس IV متوسط الأثر للمجتمع بأسره (ATE)، بل يقيس الأثر السببي **حصرًا لفئة \"الممتثلين\" (Compliers)**: وهم أولئك الذين يستجيبون لدفعة الأداة (يتلقون العلاج إذا شجعتهم الأداة بـ $Z=1$، ويتركونه إذا كانت $Z=0$). ولا يخبرنا بشيء عن \"المتلقين دائمًا\" أو \"الرافضين دائمًا\"، ويشترط غياب \"المتحدين\" المعاكسين للأداة (فرضية الرتابة Monotonicity)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X} = \\mathbf{Z}(\\mathbf{Z}^T \\mathbf{Z})^{-1} \\mathbf{Z}^T \\mathbf{X}",
        "formulaNote": {
          "en": "Core invariant for Two-Stage Least Squares (2SLS), Weak Instruments & LATE.",
          "ar": "الخاصية الرياضية الجوهرية لـ المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي."
        },
        "narrative": {
          "en": "The second-stage regression of $\\mathbf{y}$ on $\\hat{\\mathbf{X}}$ yields the **2SLS Estimator**:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}} = (\\hat{\\mathbf{X}}^T \\hat{\\mathbf{X}})^{-1} \\hat{\\mathbf{X}}^T \\mathbf{y} = (\\mathbf{X}^T \\mathbf{P}_Z \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{P}_Z \\mathbf{y}\n$$\n\nThe correct structural error variance and asymptotic covariance matrix are:\n\n$$\n\\mathbf{e}_{\\text{structural}} = \\mathbf{y} - \\mathbf{X} \\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}}, \\quad s_{\\text{2SLS}}^2 = \\frac{\\mathbf{e}_{\\text{structural}}^T \\mathbf{e}_{\\text{structural}}}{N - K}\n$$\n\n$$\n\\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}}) = s_{\\text{2SLS}}^2 (\\mathbf{X}^T \\mathbf{P}_Z \\mathbf{X})^{-1}\n$$\n\nUnder instrument monotonicity ($D_i(1) \\ge D_i(0)$ for all $i$), the 2SLS estimate identifies the **Local Average Treatment Effect (LATE)**:\n\n$$\n\\text{LATE} = \\mathbb{E}\\big[Y_i(1) - Y_i(0) \\mid D_i(1) - D_i(0) = 1\\big]\n$$\n\n* $\\mathbf{Z} \\in \\mathbb{R}^{N \\times L}$: Full instrumental design matrix with $L \\ge K$.\n* $\\mathbf{P}_Z = \\mathbf{Z}(\\mathbf{Z}^T \\mathbf{Z})^{-1} \\mathbf{Z}^T$: Symmetric idempotent projection matrix spanned by instruments.\n* $\\hat{\\mathbf{X}} = \\mathbf{P}_Z \\mathbf{X}$: First-stage fitted values representing exogenous variation.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{2SLS}}$: Closed-form Two-Stage Least Squares structural parameter estimate.\n* $\\mathbf{e}_{\\text{structural}}$: True structural residuals evaluated using actual $\\mathbf{X}$ rather than fitted $\\hat{\\mathbf{X}}$.\n* $\\text{LATE}$: Causal effect identified exclusively for the subgroup of compliers who change their treatment status in response to the instrument.\n\nImplement a Two-Stage Least Squares (2SLS) estimation engine from first principles in NumPy. Verify that standard errors are constructed using the correct structural residuals rather than the second-stage fitted residuals.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-two-stage-least-squares-late",
          "starterCode": "def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X : np.ndarray of shape (N, K)\n        Matrix of endogenous/exogenous regressors.\n    Z : np.ndarray of shape (N, L)\n        Matrix of instrumental variables (L >= K).\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_2sls': np.ndarray of shape (K,)\n        'structural_residuals': np.ndarray of shape (N,)\n        's2': float, unbiased structural error variance\n        'se': np.ndarray of shape (K,), standard errors\n    \"\"\"\n    # Step 1: Compute projection matrix P_Z = Z (Z^T Z)^(-1) Z^T\n    # Step 2: Generate first-stage predictions X_hat = P_Z X\n    # Step 3: Solve second-stage equation (X_hat^T X_hat) beta = X_hat^T y\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X : np.ndarray of shape (N, K)\n        Matrix of endogenous/exogenous regressors.\n    Z : np.ndarray of shape (N, L)\n        Matrix of instrumental variables (L >= K).\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_2sls': np.ndarray of shape (K,)\n        'structural_residuals': np.ndarray of shape (N,)\n        's2': float, unbiased structural error variance\n        'se': np.ndarray of shape (K,), standard errors\n    \"\"\"\n    # Step 1: Compute projection matrix P_Z = Z (Z^T Z)^(-1) Z^T\n    # Step 2: Generate first-stage predictions X_hat = P_Z X\n    # Step 3: Solve second-stage equation (X_hat^T X_hat) beta = X_hat^T y\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        Outcome vector.\n    X : np.ndarray of shape (N, K)\n        Matrix of endogenous/exogenous regressors.\n    Z : np.ndarray of shape (N, L)\n        Matrix of instrumental variables (L >= K).\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_2sls': np.ndarray of shape (K,)\n        'structural_residuals': np.ndarray of shape (N,)\n        's2': float, unbiased structural error variance\n        'se': np.ndarray of shape (K,), standard errors\n    \"\"\"\n    N, K = X.shape\n    \n    # Step 1: Compute projection matrix P_Z = Z (Z^T Z)^(-1) Z^T\n    ZtZ = Z.T @ Z\n    ZtZ_inv = np.linalg.inv(ZtZ)\n    P_Z = Z @ ZtZ_inv @ Z.T\n    \n    # Step 2: Generate first-stage predictions X_hat = P_Z X\n    X_hat = P_Z @ X\n    \n    # Step 3: Solve second-stage equation (X_hat^T X_hat) beta = X_hat^T y\n    XtPZ_X = X.T @ P_Z @ X\n    XtPZ_y = X.T @ P_Z @ y\n    beta_2sls = np.linalg.solve(XtPZ_X, XtPZ_y)\n    \n    # Step 4: CRITICAL - Compute true structural residuals using original X, NOT X_hat\n    structural_residuals = y - X @ beta_2sls\n    \n    # Step 5: Compute degrees-of-freedom corrected residual variance\n    df = N - K\n    s2 = float(np.sum(structural_residuals ** 2)) / df if df > 0 else 0.0\n    \n    # Step 6: Parameter covariance matrix and standard errors\n    vcov = s2 * np.linalg.inv(XtPZ_X)\n    se = np.sqrt(np.maximum(np.diag(vcov), 0.0))\n    \n    return {\n        \"beta_2sls\": beta_2sls,\n        \"structural_residuals\": structural_residuals,\n        \"s2\": s2,\n        \"se\": se,\n    }"
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
            "en": "A municipal workforce development board evaluates an intensive job retraining program by randomly mailing training vouchers ($Z = 1$) to $5,000$ unemployed workers. Some workers who receive vouchers do not attend ($Z=1, D=0$), while some motivated control workers find free alternative training ($Z=0, D=1$). Under the Angrist-Imbens LATE framework, who does the resulting 2SLS estimate represent, and what does the **Monotonicity Assumption** guarantee?",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
      "en": "In pure cross-sectional data, we observe each person, firm, or country only once. If an unobserved permanent trait—such as an individual's...",
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
          "en": "In pure cross-sectional data, we observe each person, firm, or country only once. If an unobserved permanent trait—such as an individual's innate tenacity, a startup's founding culture, or a nation's geographical climate—correlates with our regressors, OLS is hopelessly confounded by omitted variable bias.\n\n**Panel (longitudinal) datasets** track the exact same $N$ economic entities across multiple time periods ($t = 1, \\dots, T$). This temporal repetition grants econometrics one of its most potent superpowers: the **Within Estimator (Fixed Effects)**.\n\nHow does it work? Rather than comparing person $A$ with person $B$, Fixed Effects compares **person $A$ at time $t$ against person $A$'s own historical average**:\n1. Calculate each entity's personal time-mean for the outcome ($\\bar{y}_i$) and for all regressors ($\\bar{\\mathbf{x}}_i$).\n2. Subtract the entity's personal average from every single observation:\n   $$\\ddot{y}_{it} = y_{it} - \\bar{y}_i, \\quad \\ddot{\\mathbf{x}}_{it} = \\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i$$\n\nWhat happens to the unobserved permanent confounder $\\alpha_i$ during this \"within-transformation\"?\nBecause $\\alpha_i$ is constant over time, its personal average is simply $\\alpha_i$. Therefore:\n$$\\alpha_i - \\bar{\\alpha}_i = \\alpha_i - \\alpha_i = 0$$\n**The unobserved confounder subtracts from itself and completely vanishes into thin air!**\nYou successfully control for every time-invariant unobserved factor in the universe without ever measuring, naming, or modeling it.\n\nHowever, this superpower carries an inescapable cost: **any observed variable that does not change over time (such as birthplace or race) is also subtracted from itself and wiped out!**",
          "ar": "في البيانات المقطعية العادية، نرصد كل فرد أو شركة أو دولة مرة واحدة فقط. وإذا ارتبطت سمة دائمة غير مرصودة—كالذكاء الفطري للشخص، أو الثقافة التأسيسية للشركة، أو جغرافية الدولة—بالمتغيرات المستقلة، يسقط OLS حتمًا في فخ انحياز المتغير المغفَل.\n\nتتتبع **بيانات السلاسل المقطعية (بيانات البانل Panel Data)** الوحدات الاقتصادية الـ $N$ ذاتها عبر فترات زمنية متتالية ($t = 1, \\dots, T$). يمنح هذا التكرار الزمني القياس الاقتصادي إحدى أقوى أدواته على الإطلاق: **مقدر التحويل الداخلي (Fixed Effects)**.\n\nكيف تعمل هذه المعجزة؟ بدلاً من مقارنة الشخص $A$ بالشخص $B$، يقارن نموذج الآثار الثابتة **الشخص $A$ في اللحظة $t$ بمتوسط تاريخ الشخص $A$ نفسه**:\n1. نحسب المتوسط الزمني الخاص بكل فرد للمتغير التابع ($\\bar{y}_i$) ولجميع المتغيرات المستقلة ($\\bar{\\mathbf{x}}_i$).\n2. نطرح المتوسط الزمني للفرد من كل مشاهدة من مشاهداته:\n   $$\\ddot{y}_{it} = y_{it} - \\bar{y}_i, \\quad \\ddot{\\mathbf{x}}_{it} = \\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i$$\n\nما الذي يحدث للمتغير الخفي الثابت $\\alpha_i$ أثناء هذا التحويل الداخلي (Within-Transformation)؟\nنظرًا لأن $\\alpha_i$ ثابت لا يتغير مع مرور الزمن، فإن متوسطه الزمني هو $\\alpha_i$ نفسه. وبناءً عليه:\n$$\\alpha_i - \\bar{\\alpha}_i = \\alpha_i - \\alpha_i = 0$$\n**يُطرح المتغير المشوش من نفسه ليتلاشى تمامًا كأنه لم يكن!**\nأنت بذلك تتحكم في كل عامل خفي وثابت في الكون دون الحاجة إلى قياسه أو حتى معرفة اسمه.\n\nولكن لهذه القوة ثمن لا مفر منه: **أي متغير مرصود لا يتغير عبر الزمن (كمكان الميلاد أو الأصل العرقي) يُطرح هو الآخر من نفسه ويُمحى تمامًا من المعادلة!**"
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
          "en": "Averaging across all $T$ time periods for entity $i$:\n\n$$\n\\bar{y}_i = \\bar{\\mathbf{x}}_i^T \\boldsymbol{\\beta} + \\alpha_i + \\bar{\\varepsilon}_i, \\quad \\text{where } \\bar{y}_i \\equiv \\frac{1}{T}\\sum_{t=1}^T y_{it}\n$$\n\nSubtracting the entity mean from the original equation yields the **Within-Transformation**:\n\n$$\n(y_{it} - \\bar{y}_i) = (\\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i)^T \\boldsymbol{\\beta} + (\\alpha_i - \\alpha_i) + (\\varepsilon_{it} - \\bar{\\varepsilon}_i)\n$$\n\n$$\n\\ddot{y}_{it} = \\ddot{\\mathbf{x}}_{it}^T \\boldsymbol{\\beta} + \\ddot{\\varepsilon}_{it}\n$$\n\nThe pooled OLS estimator on these demeaned variables is the **Within Fixed Effects Estimator**:\n\n$$\n\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} = \\left( \\sum_{i=1}^N \\sum_{t=1}^T \\ddot{\\mathbf{x}}_{it} \\ddot{\\mathbf{x}}_{it}^T \\right)^{-1} \\sum_{i=1}^N \\sum_{t=1}^T \\ddot{\\mathbf{x}}_{it} \\ddot{y}_{it}\n$$\n\nAfter obtaining $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$, the individual entity intercepts can be recovered as:\n\n$$\n\\hat{\\alpha}_i = \\bar{y}_i - \\bar{\\mathbf{x}}_i^T \\hat{\\boldsymbol{\\beta}}_{\\text{FE}}\n$$\n\n* $y_{it}$: Observed outcome of entity $i$ at time period $t$.\n* $\\mathbf{x}_{it} \\in \\mathbb{R}^{K \\times 1}$: Vector of strictly time-varying explanatory variables.\n* $\\alpha_i$: Entity fixed effect capturing all time-invariant unobserved heterogeneity (allowed to correlate arbitrarily with $\\mathbf{x}_{it}$).\n* $\\varepsilon_{it}$: Idiosyncratic time-varying shock satisfying strict exogeneity $\\mathbb{E}[\\varepsilon_{it} \\mid \\mathbf{x}_{i1}, \\dots, \\mathbf{x}_{iT}, \\alpha_i] = 0$.\n* $\\ddot{y}_{it} = y_{it} - \\bar{y}_i$: Demeaned outcome variable purged of entity time-averages.\n* $\\ddot{\\mathbf{x}}_{it} = \\mathbf{x}_{it} - \\bar{\\mathbf{x}}_i$: Demeaned regressor vector; if regressor $k$ is time-invariant ($x_{it, k} = x_{i, k}$ for all $t$), then $\\ddot{x}_{it, k} = 0$, rendering the matrix non-invertible.\n\nImplement the panel fixed effects within-estimator in NumPy. Demean both $y$ and $X$ by entity group, solve for $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$, and back out the estimated entity intercepts $\\hat{\\alpha}_i$.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-panel-data-fixed-effects",
          "starterCode": "def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits a panel fixed-effects regression via the Within-Transformation.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N_total,)\n        Stacked outcome vector.\n    X : np.ndarray of shape (N_total, K)\n        Stacked time-varying regressor matrix.\n    entity_ids : np.ndarray of shape (N_total,)\n        Integer identifiers for each entity.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_fe': np.ndarray of shape (K,), within-estimator coefficients\n        'entity_alphas': dict mapping entity_id to float estimated alpha_i\n    \"\"\"\n    # Step 1: Compute entity-specific temporal averages and demean\n    # Step 2: Fit OLS on demeaned data: (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    # Step 3: Back out entity-specific alphas: alpha_i = y_bar_i - X_bar_i @ beta_fe\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits a panel fixed-effects regression via the Within-Transformation.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N_total,)\n        Stacked outcome vector.\n    X : np.ndarray of shape (N_total, K)\n        Stacked time-varying regressor matrix.\n    entity_ids : np.ndarray of shape (N_total,)\n        Integer identifiers for each entity.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_fe': np.ndarray of shape (K,), within-estimator coefficients\n        'entity_alphas': dict mapping entity_id to float estimated alpha_i\n    \"\"\"\n    # Step 1: Compute entity-specific temporal averages and demean\n    # Step 2: Fit OLS on demeaned data: (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    # Step 3: Back out entity-specific alphas: alpha_i = y_bar_i - X_bar_i @ beta_fe\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits a panel fixed-effects regression via the Within-Transformation.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N_total,)\n        Stacked outcome vector.\n    X : np.ndarray of shape (N_total, K)\n        Stacked time-varying regressor matrix.\n    entity_ids : np.ndarray of shape (N_total,)\n        Integer identifiers for each entity.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta_fe': np.ndarray of shape (K,), within-estimator coefficients\n        'entity_alphas': dict mapping entity_id to float estimated alpha_i\n    \"\"\"\n    unique_entities = np.unique(entity_ids)\n    \n    y_ddot = np.zeros_like(y, dtype=float)\n    X_ddot = np.zeros_like(X, dtype=float)\n    entity_means_y = {}\n    entity_means_X = {}\n    \n    # Step 1: Compute entity-specific temporal averages and demean\n    for eid in unique_entities:\n        mask = (entity_ids == eid)\n        y_bar = np.mean(y[mask])\n        X_bar = np.mean(X[mask], axis=0)\n        \n        entity_means_y[eid] = y_bar\n        entity_means_X[eid] = X_bar\n        \n        y_ddot[mask] = y[mask] - y_bar\n        X_ddot[mask] = X[mask] - X_bar\n        \n    # Step 2: Fit OLS on demeaned data: (X_ddot^T X_ddot)^(-1) X_ddot^T y_ddot\n    XtX = X_ddot.T @ X_ddot\n    Xty = X_ddot.T @ y_ddot\n    beta_fe = np.linalg.solve(XtX, Xty)\n    \n    # Step 3: Back out entity-specific alphas: alpha_i = y_bar_i - X_bar_i @ beta_fe\n    entity_alphas = {}\n    for eid in unique_entities:\n        entity_alphas[eid] = float(entity_means_y[eid] - entity_means_X[eid] @ beta_fe)\n        \n    return {\n        \"beta_fe\": beta_fe,\n        \"entity_alphas\": entity_alphas,\n    }"
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
      "en": "In panel data econometrics, researchers face a high-stakes fork in the road: Fixed Effects (FE) versus Random Effects (RE).",
      "ar": "في تحليل بيانات البانل، يقف الباحث أمام مفترق طرق حاسم: مفاضلة الآثار الثابتة (FE) مقابل الآثار العشوائية (RE)."
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
          "en": "In panel data econometrics, researchers face a high-stakes fork in the road: **Fixed Effects (FE) versus Random Effects (RE)**.\n\n* **Fixed Effects is the ultra-cautious skeptic:** It allows unobserved individual personality, grit, or corporate culture ($\\alpha_i$) to correlate arbitrarily with your explanatory variables. But to buy that safety, it throws away all between-entity differences and completely destroys any variable that does not change over time.\n* **Random Effects is the optimistic pragmatist:** It asks: *\"What if unobserved individuality $\\alpha_i$ is completely uncorrelated with our regressors?\"* If that assumption is true, throwing away between-person comparisons is wasteful! Instead of full de-meaning, RE applies **quasi-demeaning** via Generalized Least Squares (GLS): it subtracts only a fraction $\\theta \\in [0, 1]$ of the entity mean. This keeps time-invariant variables alive and yields much tighter, more efficient standard errors.\n\nHow do empirical scientists decide which road to take? **The Hausman Specification Test** stages a formal showdown between the two estimators:\n* **Under the Null Hypothesis ($H_0$: Exogeneity):** Both FE and RE are consistent and converge to the true parameter, but RE is more efficient. Their estimates should be virtually identical, differing only by random sampling noise.\n* **Under the Alternative Hypothesis ($H_1$: Endogeneity):** RE is biased, corrupted, and invalid because $\\alpha_i$ confounds the regressors. FE remains completely consistent and immune to this bias!\n\nIf the difference between $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$ and $\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}$ is too large to be explained by chance, the Hausman test sounds the alarm: **reject Random Effects and trust Fixed Effects!**",
          "ar": "في تحليل بيانات البانل، يقف الباحث أمام مفترق طرق حاسم: **مفاضلة الآثار الثابتة (FE) مقابل الآثار العشوائية (RE)**.\n\n* **الآثار الثابتة (FE) هو المتشكك شديد الحذر:** يسمح للخصائص الفردية غير المرصودة ($\\alpha_i$) بالارتباط كيفما تشاء بالمتغيرات المستقلة. ولكنه في سبيل هذا الأمان، يهدر كافة الفروق بين الأفراد ويمحو أي متغير لا يتغير مع الزمن.\n* **الآثار العشوائية (RE) هو البراغماتي المتفائل:** يتساءل: *\"ماذا لو كانت الخصائص الفردية $\\alpha_i$ مستقلة تمامًا وغير مرتبطة بمتغيراتنا؟\"* إذا صح هذا الفرض، فإن إهدار المقارنات بين الأفراد يعد خسارة فادحة في الدقة! بدلاً من طرح المتوسط كاملاً، يطبق RE **طرحًا جزئيًا (Quasi-Demeaning)** عبر المربعات الصغرى المعممة (GLS): فهو يطرح نسبة معينة $\\theta \\in [0, 1]$ فقط من المتوسط. يحافظ هذا على المتغيرات الثابتة ويحقق أخطاء معيارية أصغر بكثير وأكثر كفاءة.\n\nكيف يحسم العلم هذا النزاع؟ يضع **اختبار هاوسمان (Hausman Test)** كلا المقدرين في مواجهة حاسمة:\n* **في ظل فرضية العدم ($H_0$: الاستقلال الخارجي):** كلا المقدرين متسقان ويقتربان من الحقيقة، لكن RE أكثر كفاءة ودقة. ويجب أن تكون تقديراتهما متطابقة تقريبًا باستثناء فروق عشوائية طفيفة.\n* **في ظل الفرضية البديلة ($H_1$: وجود ارتباط داخلي):** ينحاز مقدر RE ويسقط في الخطأ بسبب ارتباط $\\alpha_i$ بالمتغيرات، بينما يظل مقدر FE صامدًا ومتسقًا لا يتأثر!\n\nإذا كان التباعد بين تقدير FE وتقدير RE أكبر مما يمكن للصدفة تفسيره، يطلق اختبار هاوسمان صافرة الإنذار: **ارفض الآثار العشوائية واعتمد الآثار الثابتة!**"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "y_{it} = \\mathbf{x}_{it}^T \\boldsymbol{\\beta} + v_{it}, \\quad \\text{where } v_{it} = \\alpha_i + \\varepsilon_{it}, \\quad \\text{with } \\mathbb{E}[\\alpha_i \\mid \\mathbf{X}_i] = 0",
        "formulaNote": {
          "en": "Core invariant for Random Effects, First-Differencing, and the Hausman Test.",
          "ar": "الخاصية الرياضية الجوهرية لـ الآثار العشوائية والفروق الأولى واختبار هاوسمان."
        },
        "narrative": {
          "en": "The composite error covariance matrix for entity $i$ across $T$ periods is equicorrelated:\n\n$$\n\\boldsymbol{\\Sigma}_i \\equiv \\mathbb{E}[\\mathbf{v}_i \\mathbf{v}_i^T \\mid \\mathbf{X}_i] = \\sigma_{\\varepsilon}^2 \\mathbf{I}_T + \\sigma_{\\alpha}^2 \\boldsymbol{\\iota}_T \\boldsymbol{\\iota}_T^T\n$$\n\nThe Feasible Generalized Least Squares (FGLS) transformation subtracts a fraction $\\theta$ of the individual temporal mean:\n\n$$\n(y_{it} - \\theta \\bar{y}_i) = (\\mathbf{x}_{it} - \\theta \\bar{\\mathbf{x}}_i)^T \\boldsymbol{\\beta} + (v_{it} - \\theta \\bar{v}_i)\n$$\n\nThe quasi-demeaning weight parameter is governed by the variance ratio:\n\n$$\n\\theta \\equiv 1 - \\sqrt{\\frac{\\sigma_{\\varepsilon}^2}{\\sigma_{\\varepsilon}^2 + T \\sigma_{\\alpha}^2}} \\in [0, 1]\n$$\n* If $\\sigma_{\\alpha}^2 \\to 0$, then $\\theta \\to 0$ (yielding Pooled OLS).\n* If $\\sigma_{\\alpha}^2 \\to \\infty$ or $T \\to \\infty$, then $\\theta \\to 1$ (yielding Fixed Effects).\n\nThe **Hausman Test Statistic** evaluates the quadratic distance between the two parameter estimates:\n\n$$\nH = (\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}})^T \\Big[ \\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}) - \\widehat{\\mathbb{V}}(\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) \\Big]^{-1} (\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}}) \\xrightarrow{d} \\chi^2(K)\n$$\n\nUnder $H_0: \\text{Cov}(\\alpha_i, \\mathbf{x}_{it}) = \\mathbf{0}$, the statistic follows an asymptotic chi-square distribution with $K$ degrees of freedom. A significant $p$-value ($p < 0.05$) indicates that RE is inconsistent, mandating the use of Fixed Effects.\n\n* $v_{it} = \\alpha_i + \\varepsilon_{it}$: Composite error composed of random entity effect $\\alpha_i$ and idiosyncratic disturbance $\\varepsilon_{it}$.\n* $\\sigma_{\\alpha}^2$: Variance of the individual random effect across the population.\n* $\\sigma_{\\varepsilon}^2$: Variance of the idiosyncratic time-varying disturbance.\n* $\\theta$: Quasi-demeaning shrinkage parameter determining the weight given to within-entity versus between-entity variation.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}}$: Consistent within-estimator under both $H_0$ and $H_1$.\n* $\\hat{\\boldsymbol{\\beta}}_{\\text{RE}}$: Efficient GLS estimator under $H_0$, but biased and inconsistent under $H_1$.\n* $H \\sim \\chi^2(K)$: Wald-type test statistic testing whether the difference $\\hat{\\boldsymbol{\\beta}}_{\\text{FE}} - \\hat{\\boldsymbol{\\beta}}_{\\text{RE}}$ is statistically distinguishable from zero.\n\nImplement the Hausman specification test statistic comparing parameter estimates and asymptotic covariance matrices from Fixed Effects and Random Effects models.",
          "ar": "### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي\n\n## Beat 3: Interactive Python Challenge | التحدي البرمجي"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-random-effects-hausman-test",
          "starterCode": "def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman quadratic test statistic comparing FE and RE estimates.\n    \n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n        Fixed Effects coefficient vector.\n    vcov_fe : np.ndarray of shape (K, K)\n        Fixed Effects covariance matrix.\n    beta_re : np.ndarray of shape (K,)\n        Random Effects coefficient vector.\n    vcov_re : np.ndarray of shape (K, K)\n        Random Effects covariance matrix.\n        \n    Returns\n    -------\n    dict with keys:\n        'stat': float, Hausman chi-square test statistic\n        'df': int, degrees of freedom (rank of variance difference)\n    \"\"\"\n    # Step 1: Parameter difference vector\n    # Step 2: Variance difference matrix: V_diff = V_fe - V_re\n    # Step 3: Compute pseudo-inverse to handle potential singularity\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman quadratic test statistic comparing FE and RE estimates.\n    \n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n        Fixed Effects coefficient vector.\n    vcov_fe : np.ndarray of shape (K, K)\n        Fixed Effects covariance matrix.\n    beta_re : np.ndarray of shape (K,)\n        Random Effects coefficient vector.\n    vcov_re : np.ndarray of shape (K, K)\n        Random Effects covariance matrix.\n        \n    Returns\n    -------\n    dict with keys:\n        'stat': float, Hausman chi-square test statistic\n        'df': int, degrees of freedom (rank of variance difference)\n    \"\"\"\n    # Step 1: Parameter difference vector\n    # Step 2: Variance difference matrix: V_diff = V_fe - V_re\n    # Step 3: Compute pseudo-inverse to handle potential singularity\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman quadratic test statistic comparing FE and RE estimates.\n    \n    Parameters\n    ----------\n    beta_fe : np.ndarray of shape (K,)\n        Fixed Effects coefficient vector.\n    vcov_fe : np.ndarray of shape (K, K)\n        Fixed Effects covariance matrix.\n    beta_re : np.ndarray of shape (K,)\n        Random Effects coefficient vector.\n    vcov_re : np.ndarray of shape (K, K)\n        Random Effects covariance matrix.\n        \n    Returns\n    -------\n    dict with keys:\n        'stat': float, Hausman chi-square test statistic\n        'df': int, degrees of freedom (rank of variance difference)\n    \"\"\"\n    # Step 1: Parameter difference vector\n    diff = beta_fe - beta_re\n    \n    # Step 2: Variance difference matrix: V_diff = V_fe - V_re\n    vcov_diff = vcov_fe - vcov_re\n    \n    # Step 3: Compute pseudo-inverse to handle potential singularity\n    vcov_diff_inv = np.linalg.pinv(vcov_diff)\n    \n    # Step 4: Compute quadratic form H = diff^T (V_diff)^(-1) diff\n    stat = float(diff.T @ vcov_diff_inv @ diff)\n    \n    # Ensure non-negative test statistic\n    stat = max(0.0, stat)\n    \n    df = int(np.linalg.matrix_rank(vcov_diff))\n    \n    return {\n        \"stat\": stat,\n        \"df\": df,\n    }"
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
            "en": "An empirical labor economist investigates the wage return to joining a trade union using a 20-year panel of manufacturing workers. She fits both models: * Fixed Effects: $\\hat{\\beta}_{\\text{union}} = 0.06$ ($\\text{SE} = 0.02$, $p = 0.003$) * Random Effects: $\\hat{\\beta}_{\\text{union}} = 0.19$ ($\\text{SE} = 0.01$, $p < 0.0001$) The Hausman test statistic yields $H = 42.8$ ($p < 0.00001$), decisively rejecting the null hypothesis $H_0$. What is the substantive economic conclusion, and which coefficient should the policymaker rely upon?",
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
                "ar": "يتعارض هذا الفرض مع الشروط الرياضية الحاكمة للمفهوم."
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
      "en": "Difference-in-Differences (DiD) is the workhorse quasi-experimental design of modern empirical economics.",
      "ar": "يُعد أسلوب \"الفرق في الفروق\" (Difference-in-Differences - DiD) الأداة شبه التجريبية الأكثر استخداماً في الاقتصاد القياسي التطبيقي."
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
          "en": "Difference-in-Differences (DiD) is the workhorse quasi-experimental design of modern empirical economics. Card and Krueger (1994) famously demonstrated the method by studying New Jersey's minimum wage increase compared to neighboring Pennsylvania fast-food restaurants. Evaluating policy interventions purely before-and-after confounds the policy with macroeconomic trends (inflation, seasonal growth, recession). Conversely, simply comparing treated states to control states at a single point in time confounds the policy with persistent baseline differences (tax structures, demographics).\n\nDiD solves this by comparing trajectories rather than static snapshots. Think of evaluating whether a special fertilizer helped a growing tree: if you only measure the tree before and after fertilizing, you mistake natural rainfall and sunshine for the fertilizer's effect. If you compare it to a wild untreated tree in another forest, you confound soil quality. But if you observe both trees over time and subtract the wild tree's natural growth from the fertilized tree's growth, common weather shocks cancel out, isolating the pure causal effect of the fertilizer.",
          "ar": "يُعد أسلوب \"الفرق في الفروق\" (Difference-in-Differences - DiD) الأداة شبه التجريبية الأكثر استخداماً في الاقتصاد القياسي التطبيقي. اشتهرت الطريقة في دراسة كارد وكروغر (Card & Krueger, 1994) للأثر التوظيفي لرفع الحد الأدنى للأجور في نيوجيرسي مقارنة بمطاعم بنسلفانيا المجاورة. إن تقييم أي سياسة عبر مقارنة المستفيدين قبل تطبيقها وبعده فقط يخلط بين أثر السياسة والمسار الزمني العام (التضخم، المواسم، التقلبات الاقتصادية). وفي المقابل، فإن مقارنة المجموعة المعالجة بمجموعة ضابطة في لحظة زمنية واحدة يخلط بين أثر السياسة والفروق الهيكلية الأصلية بين المجموعتين.\n\nيعالج DiD هذه المعضلة بمقارنة \"المسارات\" بدلاً من اللقطات الثابتة. تخيل أنك تقيس أثر سماد زراعي على شجرة: إذا قست طول الشجرة قبل وبعد التسميد فقط، ستخلط بين نمو الشجرة بفعل المطر ونموها بفعل السماد. وإذا قارنتها بشجرة برية أخرى، ستخلط بين خصوبة التربة في الموقعين. لكن بمراقبة الشجرتين معاً وطرح مقدار النمو الطبيعي للشجرة البرية من نمو الشجرة المعالجة، تلغي العوامل المناخية المشتركة، لتعزل الأثر السببي الصافي للسماد."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\bar{Y}_{g, t} \\equiv \\mathbb{E}[Y_{it} \\mid G_i = g, T_t = t]",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Canonical 2x2 Difference-in-Differences & Parallel Trends.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي."
        },
        "narrative": {
          "en": "The sample Difference-in-Differences estimator computes the difference between the two within-group changes:\n\n$$\n\\hat{\\delta}_{\\text{DiD}} = (\\bar{Y}_{1, 1} - \\bar{Y}_{1, 0}) - (\\bar{Y}_{0, 1} - \\bar{Y}_{0, 0})\n$$\n\nEquivalently, this estimator is recovered via Ordinary Least Squares (OLS) from the interaction regression:\n\n$$\nY_{it} = \\beta_0 + \\beta_1 \\text{Treat}_i + \\beta_2 \\text{Post}_t + \\delta (\\text{Treat}_i \\times \\text{Post}_t) + \\varepsilon_{it}\n$$\n\nwhere:\n- $\\beta_0 = \\bar{Y}_{0,0}$: Baseline mean of the control group.\n- $\\beta_1 = \\bar{Y}_{1,0} - \\bar{Y}_{0,0}$: Pre-treatment baseline gap between treated and control units.\n- $\\beta_2 = \\bar{Y}_{0,1} - \\bar{Y}_{0,0}$: Common secular time trend experienced by the control group.\n- $\\delta = \\hat{\\delta}_{\\text{DiD}}$: The interaction coefficient isolating the causal treatment effect.\n\nThe unobservable counterfactual for the treated group in the post-treatment period is:\n\n$$\n\\mathbb{E}[Y_{i1}(0) \\mid G_i = 1] = \\bar{Y}_{1, 0} + (\\bar{Y}_{0, 1} - \\bar{Y}_{0, 0})\n$$\n\nThe foundational causal identification rests on the **Parallel Trends Assumption**: in the absence of treatment, the average outcome of the treated group would have followed the exact same trajectory as the control group:\n\n$$\n\\mathbb{E}[Y_{i1}(0) - Y_{i0}(0) \\mid G_i = 1] = \\mathbb{E}[Y_{i1}(0) - Y_{i0}(0) \\mid G_i = 0]\n$$",
          "ar": "يرتكز التعريف السببي بالكامل على **فرضية مسار التوازي (Parallel Trends Assumption)**: لولا تطبيق المعالجة، لكان معدل تغير المجموعة المعالجة بين الفترتين مساوياً تماماً لمعدل تغير المجموعة الضابطة. وعندما تتحقق هذه الفرضية، يطرح المقدر الأثر الزمني الطبيعي كـ \"مسار مقابل للواقع\" (Counterfactual)، ويكون معامل التفاعل $\\delta$ تقديراً غير منحاز للأثر السببي الصافي."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-difference-in-differences-2x2",
          "starterCode": "def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Observed outcomes.\n    treat : np.ndarray\n        Binary treatment group indicator (1 = Treated, 0 = Control).\n    post : np.ndarray\n        Binary post-period indicator (1 = Post-treatment, 0 = Pre-treatment).\n        \n    Returns\n    -------\n    dict with keys:\n        'delta_did': Sample 2x2 difference-in-differences estimate.\n        'beta_interaction': Interaction coefficient from OLS regression [1, treat, post, treat*post].\n        'counterfactual': Unobserved counterfactual level for treated group in post period.\n    \"\"\"\n    # 1. Compute 4 group-period cell means: y11, y10, y01, y00\n    # 2. Compute DiD and counterfactual\n    # 3. OLS regression: Y = beta_0 + beta_1*treat + beta_2*post + delta*(treat*post)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Observed outcomes.\n    treat : np.ndarray\n        Binary treatment group indicator (1 = Treated, 0 = Control).\n    post : np.ndarray\n        Binary post-period indicator (1 = Post-treatment, 0 = Pre-treatment).\n        \n    Returns\n    -------\n    dict with keys:\n        'delta_did': Sample 2x2 difference-in-differences estimate.\n        'beta_interaction': Interaction coefficient from OLS regression [1, treat, post, treat*post].\n        'counterfactual': Unobserved counterfactual level for treated group in post period.\n    \"\"\"\n    # 1. Compute 4 group-period cell means: y11, y10, y01, y00\n    # 2. Compute DiD and counterfactual\n    # 3. OLS regression: Y = beta_0 + beta_1*treat + beta_2*post + delta*(treat*post)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "4.0, 12.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Observed outcomes.\n    treat : np.ndarray\n        Binary treatment group indicator (1 = Treated, 0 = Control).\n    post : np.ndarray\n        Binary post-period indicator (1 = Post-treatment, 0 = Pre-treatment).\n        \n    Returns\n    -------\n    dict with keys:\n        'delta_did': Sample 2x2 difference-in-differences estimate.\n        'beta_interaction': Interaction coefficient from OLS regression [1, treat, post, treat*post].\n        'counterfactual': Unobserved counterfactual level for treated group in post period.\n    \"\"\"\n    # 1. Compute 4 group-period cell means: y11, y10, y01, y00\n    y11 = float(np.mean(y[(treat == 1) & (post == 1)]))\n    y10 = float(np.mean(y[(treat == 1) & (post == 0)]))\n    y01 = float(np.mean(y[(treat == 0) & (post == 1)]))\n    y00 = float(np.mean(y[(treat == 0) & (post == 0)]))\n    \n    # 2. Compute DiD and counterfactual\n    delta_did = (y11 - y10) - (y01 - y00)\n    counterfactual = y10 + (y01 - y00)\n    \n    # 3. OLS regression: Y = beta_0 + beta_1*treat + beta_2*post + delta*(treat*post)\n    X = np.column_stack([np.ones_like(y), treat, post, treat * post])\n    beta_reg = np.linalg.solve(X.T @ X, X.T @ y)\n    \n    return {\n        \"delta_did\": delta_did,\n        \"beta_interaction\": float(beta_reg[3]),\n        \"counterfactual\": counterfactual,\n    }"
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
            "en": "What is the true causal Difference-in",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The DiD estimate is $+2.0\\%$ (since Germany grew by $3.5\\%$ while France grew by $1.5\\%$ secularly, so $3.5\\% - 1.5\\% = 2.0\\%$). The key threat is a violation of parallel trends, such as an unannounced Easter marketing discount run exclusively in Germany during Q2.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The DiD estimate is $+3.5\\%$ because the pre-treatment baseline differences are already fixed constants that do not affect the rate of post-treatment change.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The DiD estimate is $-0.5\\%$ because France was already converting at a lower rate, introducing mean-reversion bias.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The DiD estimate cannot be computed without individual customer clickstream logs, because aggregate group means violate the Gauss-Markov theorem.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "staggered-did-callaway-santanna",
    "title": "Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna",
    "titleAr": "الفرق في الفروق التدريجي وانهيار نموذج الآثار الثابتة ثنائي الاتجاه",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In real-world policy rollouts, reforms rarely happen in all jurisdictions at the same time.",
      "ar": "في التطبيقات الواقعية، نادراً ما تُطبق السياسات الاقتصادية والاجتماعية في جميع المناطق في وقت واحد."
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
          "en": "In real-world policy rollouts, reforms rarely happen in all jurisdictions at the same time. Different states or cities adopt policies in staggered waves (e.g., minimum wage laws, healthcare expansions, or paid sick leave across different years). For decades, applied researchers evaluated these rollouts using a Two-Way Fixed Effects (TWFE) regression with individual and time fixed effects.\n\nRecent econometric breakthroughs (Goodman-Bacon 2021; Callaway & Sant'Anna 2021; Sun & Abraham 2021) revealed a fatal mathematical flaw: TWFE performs \"forbidden comparisons.\" Naively running TWFE with staggered timing is like evaluating a patient who began chemotherapy today by comparing their blood counts not to untreated healthy patients, but to a patient who completed chemotherapy last year and whose counts have already stabilized. Because the early-treated patient's treatment effect has already plateaued, subtracting their trajectory from the newly treated patient subtracts the true treatment effect itself—acting like an inverted photographic negative that can make a genuinely beneficial policy appear harmful!",
          "ar": "في التطبيقات الواقعية، نادراً ما تُطبق السياسات الاقتصادية والاجتماعية في جميع المناطق في وقت واحد. بل تعتمد معظم الولايات والمدن الإصلاحات عبر موجات تدريجية متفرقة (Staggered Adoption) تمتد لسنوات مختلفة. ولعقود طويلة، اعتمد الباحثون على انحدار الآثار الثابتة ثنائي الاتجاه (TWFE) بمتغيرات وهمية للوحدات والزمن لتقدير الأثر الموحد.\n\nكشفت الثورة القياسية الحديثة (Goodman-Bacon 2021؛ Callaway & Sant'Anna 2021) عن خلل رياضي جوهري أطلق عليه \"المقارنات المحظورة\". إن تشغيل TWFE في ظل تباين توقيت المعالجة يشبه تقييم مريض بدأ علاجه الكيميائي اليوم بمقارنة تحاليله ليس بأشخاص أصحاء، بل بمريض أنهى علاجه العام الماضي واستقرت حالته! وإذا كانت استجابة المريض القديم قد تباطأت أو استقرت، فإن طرح مساره من مسار المريض الجديد يطرح أثر المعالجة الفعلي، مما قد يقلب معامل الأثر الإيجابي الحقيقي إلى رقم سالب وهمي في الانحدار!"
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
          "en": "Goodman-Bacon (2021) showed that $\\hat{\\beta}_{\\text{TWFE}}$ is a weighted average of all possible $2 \\times 2$ DiD sub-comparisons:\n\n$$\n\\hat{\\beta}_{\\text{TWFE}} = \\sum_{k} w_k \\hat{\\beta}_{k}^{\\text{Clean}} + \\sum_{\\ell} w_\\ell \\hat{\\beta}_{\\ell}^{\\text{Forbidden}}\n$$\n\nWhenever treatment effects vary over time (dynamic treatment heterogeneity), the weights on earlier-treated units serving as controls for later-treated units can become strictly negative, inducing sign reversal.\n\nCallaway and Sant'Anna (2021) resolve this by defining the clean **Group-Time Average Treatment Effect**, $ATT(g, t)$, for the cohort first treated in period $g$ observed at time $t$:\n\n$$\nATT(g, t) \\equiv \\mathbb{E}\\left[Y_{it}(g) - Y_{it}(0) \\mid G_i = g\\right]\n$$\n\nUsing a clean control group $C$ (either units that are never treated, or units not yet treated by time $t$ such that $D_{is} = 0$ for all $s \\le t$), the estimator computes:\n\n$$\n\\widehat{ATT}(g, t) = \\mathbb{E}\\left[Y_{it} - Y_{i, g-1} \\mid G_i = g\\right] - \\mathbb{E}\\left[Y_{it} - Y_{i, g-1} \\mid C_i = 1\\right]\n$$\n\nNotice that the baseline is always anchored at the pre-treatment period $g - 1$ right before cohort $g$ received the policy. The event-study aggregation across event time $e = t - g$ is then given by:\n\n$$\n\\widehat{ATT}(e) = \\sum_{g} w(g, e) \\widehat{ATT}(g, g + e), \\quad \\text{where } \\sum_g w(g, e) = 1\n$$",
          "ar": "يعتمد مقدر كالاواي-سانت آنا (Callaway-Sant'Anna) على حظر المقارنات الملوثة؛ حيث يُقاس أثر كل فوج معالجة $g$ عند كل فترة زمنية $t$ بالرجوع دائماً إلى فترة الأساس السابقة للمعالجة $g - 1$، وبمقارنته حصراً بوحدات نظيفة (لم تُعالج قط، أو لم تكن قد عولجت بحلول الفترة $t$). ومن ثم تُجمع هذه الآثار في دراسة حدث (Event-Study) خالية تماماً من الانحياز الحسابي لـ TWFE."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-staggered-did-callaway-santanna",
          "starterCode": "def compute_group_time_att(\n    y: np.ndarray,\n    group: np.ndarray,\n    time: np.ndarray,\n    target_g: int,\n    target_t: int,\n    never_treated_val: int = 0\n) -> float:\n    \"\"\"\n    Computes Callaway-Sant'Anna cohort-time average treatment effect ATT(g, t)\n    using the never-treated comparison group and pre-treatment base period g - 1.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Outcome values.\n    group : np.ndarray\n        Treatment cohort adoption period (0 or never_treated_val indicates never treated).\n    time : np.ndarray\n        Calendar time period of observation.\n    target_g : int\n        The cohort adoption year to evaluate.\n    target_t : int\n        The calendar period of observation.\n    never_treated_val : int\n        Identifier for the never-treated comparison group.\n        \n    Returns\n    -------\n    float\n        The estimated ATT(target_g, target_t).\n    \"\"\"\n    # 1. Treated cohort outcomes at post time target_t and base_period g-1\n    # 2. Never-treated comparison group outcomes at target_t and base_period g-1\n    # 3. Clean difference-in-differences\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_group_time_att(\n    y: np.ndarray,\n    group: np.ndarray,\n    time: np.ndarray,\n    target_g: int,\n    target_t: int,\n    never_treated_val: int = 0\n) -> float:\n    \"\"\"\n    Computes Callaway-Sant'Anna cohort-time average treatment effect ATT(g, t)\n    using the never-treated comparison group and pre-treatment base period g - 1.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Outcome values.\n    group : np.ndarray\n        Treatment cohort adoption period (0 or never_treated_val indicates never treated).\n    time : np.ndarray\n        Calendar time period of observation.\n    target_g : int\n        The cohort adoption year to evaluate.\n    target_t : int\n        The calendar period of observation.\n    never_treated_val : int\n        Identifier for the never-treated comparison group.\n        \n    Returns\n    -------\n    float\n        The estimated ATT(target_g, target_t).\n    \"\"\"\n    # 1. Treated cohort outcomes at post time target_t and base_period g-1\n    # 2. Never-treated comparison group outcomes at target_t and base_period g-1\n    # 3. Clean difference-in-differences\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_group_time_att(\n    y: np.ndarray,\n    group: np.ndarray,\n    time: np.ndarray,\n    target_g: int,\n    target_t: int,\n    never_treated_val: int = 0\n) -> float:\n    \"\"\"\n    Computes Callaway-Sant'Anna cohort-time average treatment effect ATT(g, t)\n    using the never-treated comparison group and pre-treatment base period g - 1.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Outcome values.\n    group : np.ndarray\n        Treatment cohort adoption period (0 or never_treated_val indicates never treated).\n    time : np.ndarray\n        Calendar time period of observation.\n    target_g : int\n        The cohort adoption year to evaluate.\n    target_t : int\n        The calendar period of observation.\n    never_treated_val : int\n        Identifier for the never-treated comparison group.\n        \n    Returns\n    -------\n    float\n        The estimated ATT(target_g, target_t).\n    \"\"\"\n    base_period = target_g - 1\n    \n    # 1. Treated cohort outcomes at post time target_t and base_period g-1\n    treated_post = y[(group == target_g) & (time == target_t)]\n    treated_pre = y[(group == target_g) & (time == base_period)]\n    delta_treated = float(np.mean(treated_post) - np.mean(treated_pre))\n    \n    # 2. Never-treated comparison group outcomes at target_t and base_period g-1\n    control_post = y[(group == never_treated_val) & (time == target_t)]\n    control_pre = y[(group == never_treated_val) & (time == base_period)]\n    delta_control = float(np.mean(control_post) - np.mean(control_pre))\n    \n    # 3. Clean difference-in-differences\n    return float(delta_treated - delta_control)"
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
            "en": "Why did the classical TWFE regression return a negative estimate despite the policy having strictly positive effects in every state?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الفرق في الفروق التدريجي وانهيار نموذج الآثار الثابتة ثنائي الاتجاه تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Due to Goodman-Bacon decomposition artifacts, states that adopted early (whose effects had grown to +8%) served as \"controls\" for later-adopting states (whose initial effect was only +2%). Subtracting an +8% trajectory from a +2% trajectory creates a negative implicit 2x2 comparison $(-6\\%)$, contaminating the pooled TWFE estimate.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because maternal employment exhibits high seasonal variance, which strictly violates the Gauss-Markov exogeneity assumption.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because the standard errors were clustered at the state level rather than at the individual mother level.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because 30 states is fewer than the 40 required by asymptotic Central Limit Theorem convergence.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "regression-discontinuity-sharp",
    "title": "Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression",
    "titleAr": "تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In observational data, subjects rarely receive treatments at random; high earners buy better healthcare, motivated students study longer,...",
      "ar": "في الدراسات التطبيقية، نادراً ما تُوزع البرامج أو السياسات بشكل عشوائي؛ فالأثرياء يحصلون على رعاية صحية أفضل، والطلاب الأكثر حماساً يلتحقون..."
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
          "en": "In observational data, subjects rarely receive treatments at random; high earners buy better healthcare, motivated students study longer, and creditworthy borrowers seek larger loans. Sharp Regression Discontinuity Design (SRDD) is one of the most credible causal inference tools because it exploits institutional rules that assign treatment deterministically based on whether a continuous score (the \"running\" or \"forcing\" variable) crosses a strict administrative cutoff $c$.\n\nThink of an elite university fellowship awarded strictly to applicants scoring 1200 or higher on an entrance exam. A student scoring 1201 is virtually indistinguishable in innate talent, grit, and socio-economic background from a student scoring 1199—the two-point difference is essentially random test-day noise (a noisy room, a broken pencil). Nature has effectively run a localized randomized controlled trial right at the cutoff. Any sudden vertical jump in downstream outcomes (e.g., lifetime earnings) at score 1200 can be cleanly attributed to the fellowship itself, rather than pre-existing student ability.",
          "ar": "في الدراسات التطبيقية، نادراً ما تُوزع البرامج أو السياسات بشكل عشوائي؛ فالأثرياء يحصلون على رعاية صحية أفضل، والطلاب الأكثر حماساً يلتحقون بالبرامج النخبوية. يُعد تصميم انقطاع الانحدار الحاد (Sharp RDD) من أصدق أدوات الاستدلال السببي، لأنه يستغل القواعد المؤسسية الصارمة التي تفصل بين المستفيدين بناءً على تجاوز متغير محدد ومستمر (Forcing Variable) لعتبة رقمية حاسمة $c$.\n\nتخيل منحة دراسية مرموقة تُمنح حصراً للطلاب الحاصلين على 1200 درجة فما فوق في اختبار موحد. إن طالباً حصل على 1201 يتطابق تقريباً في القدرات الفطرية والخلفية الاجتماعية مع طالب حصل على 1199؛ فالفارق بينهما (نقطتان) ليس سوى ضجيج عشوائي بحت في يوم الامتحان (إرهاق عابر أو تشتت لحظي). لقد أقامت الطبيعة تجربة عشوائية مثالية عند العتبة تماماً، وأي قفزة رأسية مفاجئة في معدلات التخرج عند الدرجة 1200 تُعزى بالكامل إلى أثر المنحة وليس إلى ذكاء الطلاب المسبق."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "D_i = \\mathbb{I}(X_i \\ge c)",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي."
        },
        "narrative": {
          "en": "Under the identifying assumption that potential outcome conditional expectations $\\mathbb{E}[Y_i(1) \\mid X_i = x]$ and $\\mathbb{E}[Y_i(0) \\mid X_i = x]$ are continuous at the cutoff $c$, the average treatment effect at the cutoff is non-parametrically identified by the boundary limits:\n\n$$\n\\tau_{\\text{SRD}} = \\lim_{x \\downarrow c} \\mathbb{E}[Y_i \\mid X_i = x] - \\lim_{x \\uparrow c} \\mathbb{E}[Y_i \\mid X_i = x]\n$$\n\nModern econometric practice (Hahn, Todd, & van der Klaauw 2001; Calonico, Cattaneo, & Titiunik 2014) estimates $\\tau_{\\text{SRD}}$ via **Local Linear Regression** within a narrow bandwidth $h$ around the centered running variable $\\tilde{X}_i = X_i - c$, minimizing the kernel-weighted sum of squared residuals:\n\n$$\n\\min_{\\alpha, \\tau, \\beta_0, \\beta_1} \\sum_{i: |X_i - c| \\le h} \\left[ Y_i - \\alpha - \\tau D_i - \\beta_0 (X_i - c) - \\beta_1 D_i(X_i - c) \\right]^2 K\\left(\\frac{X_i - c}{h}\\right)\n$$\n\nwhere:\n- $\\alpha$: Intercept of the control regression function at the cutoff ($x \\to c^-$).\n- $\\tau$: The sharp causal treatment jump at the cutoff.\n- $\\beta_0, \\beta_1$: The slopes of the running variable on the left and right sides of the cutoff.\n- $K(u) = (1 - |u|) \\mathbb{I}(|u| \\le 1)$: The triangular kernel, which puts maximum weight at the cutoff and tapers linearly to zero at $|X_i - c| = h$.",
          "ar": "ينص شرط الصلاحية الهيكلي على استمرارية دوال التوقع الشرطي للنتائج المحتملة عند العتبة $c$. وتعتمد الممارسة الإحصائية الحديثة على الانحدار الخطي الموضعي (Local Linear Regression) داخل نطاق ترددي ضيق $h$ مع ترجيح العينات بنواة مثلثة $K(u)$ لمنع انحياز الحواف وتجنب التذبذب الكاذب للحدوديات ذات الرتب العالية."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-regression-discontinuity-sharp",
          "starterCode": "def fit_sharp_rdd_local_linear(\n    x: np.ndarray,\n    y: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD with a triangular kernel.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Continuous running variable.\n    y : np.ndarray\n        Observed outcome variable.\n    cutoff : float\n        Institutional threshold c.\n    bandwidth : float\n        Half-width of the local estimation window h.\n        \n    Returns\n    -------\n    dict with keys:\n        'tau': Treatment effect jump at the cutoff.\n        'alpha_left': Estimated limit from the left (control counterfactual at cutoff).\n        'alpha_right': Estimated limit from the right (treated outcome at cutoff).\n    \"\"\"\n    # 1. Filter to observations within local window [cutoff - h, cutoff + h]\n    # 2. Centered running variable and treatment dummy\n    # 3. Triangular kernel weights: K(u) = 1 - |u| for |u| <= 1\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_sharp_rdd_local_linear(\n    x: np.ndarray,\n    y: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD with a triangular kernel.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Continuous running variable.\n    y : np.ndarray\n        Observed outcome variable.\n    cutoff : float\n        Institutional threshold c.\n    bandwidth : float\n        Half-width of the local estimation window h.\n        \n    Returns\n    -------\n    dict with keys:\n        'tau': Treatment effect jump at the cutoff.\n        'alpha_left': Estimated limit from the left (control counterfactual at cutoff).\n        'alpha_right': Estimated limit from the right (treated outcome at cutoff).\n    \"\"\"\n    # 1. Filter to observations within local window [cutoff - h, cutoff + h]\n    # 2. Centered running variable and treatment dummy\n    # 3. Triangular kernel weights: K(u) = 1 - |u| for |u| <= 1\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "10.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_sharp_rdd_local_linear(\n    x: np.ndarray,\n    y: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Fits a local linear regression for Sharp RDD with a triangular kernel.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Continuous running variable.\n    y : np.ndarray\n        Observed outcome variable.\n    cutoff : float\n        Institutional threshold c.\n    bandwidth : float\n        Half-width of the local estimation window h.\n        \n    Returns\n    -------\n    dict with keys:\n        'tau': Treatment effect jump at the cutoff.\n        'alpha_left': Estimated limit from the left (control counterfactual at cutoff).\n        'alpha_right': Estimated limit from the right (treated outcome at cutoff).\n    \"\"\"\n    # 1. Filter to observations within local window [cutoff - h, cutoff + h]\n    mask = (x >= cutoff - bandwidth) & (x <= cutoff + bandwidth)\n    x_sub = x[mask]\n    y_sub = y[mask]\n    \n    # 2. Centered running variable and treatment dummy\n    x_centered = x_sub - cutoff\n    d = (x_sub >= cutoff).astype(float)\n    \n    # 3. Triangular kernel weights: K(u) = 1 - |u| for |u| <= 1\n    u = np.abs(x_centered) / bandwidth\n    weights = 1.0 - u\n    W = np.diag(weights)\n    \n    # 4. Design matrix: [1, D, (X - c), D*(X - c)]\n    X_mat = np.column_stack([\n        np.ones_like(x_centered),\n        d,\n        x_centered,\n        d * x_centered\n    ])\n    \n    # 5. Weighted Least Squares: beta = (X^T W X)^(-1) X^T W y\n    XtWX = X_mat.T @ W @ X_mat\n    XtWy = X_mat.T @ W @ y_sub\n    beta = np.linalg.solve(XtWX, XtWy)\n    \n    alpha_left = float(beta[0])\n    tau = float(beta[1])\n    alpha_right = alpha_left + tau\n    \n    return {\n        \"tau\": tau,\n        \"alpha_left\": alpha_left,\n        \"alpha_right\": alpha_right,\n    }"
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
            "en": "What critical econometric flaw produces this discrepancy (Gelman & Imbens 2019)?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تصميم انقطاع الانحدار الحاد والانحدار الخطي الموضعي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "High-order global polynomials suffer from Runge's boundary oscillation phenomenon: distant points at scores 350 and 800 exert high leverage on the curve, artificially warping the polynomial near the boundary and creating a spurious discontinuity. The analyst should replace the global polynomial with local linear regression within an optimal data-driven bandwidth.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The credit score is a continuous variable, which violates the discrete rank condition of linear models.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The running variable must be exponentially transformed before computing polynomial degrees.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The sample size must be downsampled until the left and right sample counts are mathematically identical.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "fuzzy-rdd-mccrary-sorting",
    "title": "Fuzzy RDD & McCrary Density Sorting Diagnostic",
    "titleAr": "تصميم انقطاع الانحدار الضبابي واختبار مككراري لتشخيص التلاعب بالعتبة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Sharp RDD assumes deterministic compliance, real-world institutions frequently exhibit partial compliance: crossing an administrative...",
      "ar": "في التطبيقات الميدانية، نادراً ما يكون الامتثال حتمياً بنسبة 100%؛ بل يؤدي تجاوز العتبة الإدارية إلى توليد حافز أو أهلية قانونية، مع احتفاظ..."
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
          "en": "While Sharp RDD assumes deterministic compliance, real-world institutions frequently exhibit partial compliance: crossing an administrative threshold creates an entitlement or incentive, but agents retain autonomy. Scoring above a cutoff increases the probability of receiving treatment without guaranteeing it, and individuals below the cutoff may occasionally secure treatment through appeals or exceptions.\n\nThink of receiving an invitation to an elite STEM summer academy: students scoring 90 or higher on a math test are invited ($Z_i = 1$). However, some invited students decline to attend family vacations, while a few students scoring 88 lobby their school principals for hardship waivers ($D_i = 1$). Crossing the score threshold causes a discontinuous *jump in the probability* of attendance rather than an absolute switch. Econometrically, the cutoff serves as an **Instrumental Variable (IV)**, and the Local Average Treatment Effect (LATE) is recovered by scaling the jump in outcomes by the jump in compliance.\n\nCrucially, this identification collapses if agents manipulate their score. If teachers know the scholarship cutoff is 90 and artificially bump scores of 89 up to 90, the subjects right above the cutoff are no longer comparable to those below. The **McCrary Density Test** acts as a forensic audit: plotting a fine-grained histogram of running variable densities reveals whether an unnatural cliff or bunching spike occurs at the cutoff.",
          "ar": "في التطبيقات الميدانية، نادراً ما يكون الامتثال حتمياً بنسبة 100%؛ بل يؤدي تجاوز العتبة الإدارية إلى توليد حافز أو أهلية قانونية، مع احتفاظ الأفراد بحرية الاختيار. فالدرجة المرتفعة تزيد من احتمالية تلقي المعالجة دون أن تفرضها فرضاً مطلقاً، وقد يحصل بعض الراسبين على استثناءات خاصة.\n\nتخيل بطاقة دعوة لمعسكر صيفي تدريبي: يحصل الطلاب الذين نالوا 90 درجة فما فوق في اختبار الرياضيات على دعوة ($Z_i = 1$). لكن بعض المدعوين يعتذرون عن الحضور بسبب السفر، بينما ينجح قلة ممن نالوا 88 في الحصول على إعفاءات خاصة بالحضور ($D_i = 1$). هنا تُحدث العتبة قفزة مفاجئة في \"احتمالية\" الحضور، وتتحول العتبة إلى **متغير أداة (Instrumental Variable)** يُقاس به الأثر السببي الموضعي للممتثلين (LATE).\n\nلكن هذا النموذج ينهار بالكامل إذا تم التلاعب بالدرجات (Sorting / Manipulation). إذا كان المعلمون يعلمون أن عتبة المنحة هي 90، وقاموا بدافع التعاطف برفع درجات 89 إلى 90، فإن الطلاب الواقعين فوق العتبة مباشرة لم يعودوا متطابقين مع زملائهم تحتها. يعمل **اختبار مككراري للكثافة (McCrary Density Test)** كمدقق جنائي: حيث يرسم منحنى الكثافة الاحتمالية للمتغير؛ وإذا ظهر تكدس مريب أو قفزة فجائية عند 90، فإن هذا التكدس يفضح التلاعب ويبطل الصلاحية السببية."
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
          "en": "The Fuzzy RDD estimand is the ratio of two discontinuities (the Wald ratio / Local Average Treatment Effect at the cutoff):\n\n$$\n\\tau_{\\text{FRD}} = \\frac{\\lim_{x \\downarrow c} \\mathbb{E}[Y_i \\mid X_i = x] - \\lim_{x \\uparrow c} \\mathbb{E}[Y_i \\mid X_i = x]}{\\lim_{x \\downarrow c} \\mathbb{E}[D_i \\mid X_i = x] - \\lim_{x \\uparrow c} \\mathbb{E}[D_i \\mid X_i = x]} = \\frac{\\text{Jump in Outcome (Reduced Form)}}{\\text{Jump in Treatment (First Stage)}}\n$$\n\n#### The McCrary Sorting Test\nTo verify the fundamental identifying assumption of **local random assignment**, McCrary (2008) tests for a discontinuity in the marginal density of the running variable $X_i$ at $c$. Let $f(x)$ denote the probability density function of $X$:\n\n$$\n\\theta \\equiv \\ln \\left( \\lim_{x \\downarrow c} f(x) \\right) - \\ln \\left( \\lim_{x \\uparrow c} f(x) \\right)\n$$\n\nUnder the null hypothesis of no sorting or strategic manipulation:\n\n$$\nH_0: \\theta = 0 \\quad (\\text{The density of the running variable is continuous at } c)\n$$\n\nA statistically significant log-density gap $\\hat{\\theta} \\ne 0$ indicates active sorting, self-selection, or administrative tampering around the cutoff, invalidating the continuity assumption.",
          "ar": "تُحسب قيمة $\\tau_{\\text{FRD}}$ عبر قسمة القفزة في المتغير التابع على القفزة في احتمالية تلقي المعالجة في المرحلة الأولى (نسبة فالد Wald Ratio). ويضمن اختبار مككراري سلامة النموذج عبر فحص الفارق اللوغاريثمي لكثافة المتغير المستقل $\\theta$ على طرفي العتبة؛ فإذا رُفضت فرضية العدم $H_0: \\theta = 0$، دل ذلك على وجود تلاعب استراتيجي يدمر التجربة شبه الطبيعية."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-fuzzy-rdd-mccrary-sorting",
          "starterCode": "def compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD Wald ratio via local linear regression for reduced form and first stage.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Outcome values.\n    d : np.ndarray\n        Observed treatment indicator or uptake fraction.\n    x : np.ndarray\n        Running variable.\n    cutoff : float\n        Discontinuity cutoff c.\n    bandwidth : float\n        Local estimation window half-width h.\n        \n    Returns\n    -------\n    dict with keys:\n        'jump_y': Numerator discontinuity in outcome.\n        'jump_d': Denominator discontinuity in treatment uptake (first-stage).\n        'tau_frd': Fuzzy RDD Wald estimate (jump_y / jump_d).\n    \"\"\"\n    # 1. Select window within bandwidth\n    # 2. Local variables and kernel weights\n    # 3. Reduced-form outcome jump\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD Wald ratio via local linear regression for reduced form and first stage.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Outcome values.\n    d : np.ndarray\n        Observed treatment indicator or uptake fraction.\n    x : np.ndarray\n        Running variable.\n    cutoff : float\n        Discontinuity cutoff c.\n    bandwidth : float\n        Local estimation window half-width h.\n        \n    Returns\n    -------\n    dict with keys:\n        'jump_y': Numerator discontinuity in outcome.\n        'jump_d': Denominator discontinuity in treatment uptake (first-stage).\n        'tau_frd': Fuzzy RDD Wald estimate (jump_y / jump_d).\n    \"\"\"\n    # 1. Select window within bandwidth\n    # 2. Local variables and kernel weights\n    # 3. Reduced-form outcome jump\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "8.33"
            }
          },
          "solution": "import numpy as np\n\ndef compute_fuzzy_rdd(\n    y: np.ndarray,\n    d: np.ndarray,\n    x: np.ndarray,\n    cutoff: float,\n    bandwidth: float\n) -> dict[str, float]:\n    \"\"\"\n    Computes Fuzzy RDD Wald ratio via local linear regression for reduced form and first stage.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Outcome values.\n    d : np.ndarray\n        Observed treatment indicator or uptake fraction.\n    x : np.ndarray\n        Running variable.\n    cutoff : float\n        Discontinuity cutoff c.\n    bandwidth : float\n        Local estimation window half-width h.\n        \n    Returns\n    -------\n    dict with keys:\n        'jump_y': Numerator discontinuity in outcome.\n        'jump_d': Denominator discontinuity in treatment uptake (first-stage).\n        'tau_frd': Fuzzy RDD Wald estimate (jump_y / jump_d).\n    \"\"\"\n    # 1. Select window within bandwidth\n    mask = (x >= cutoff - bandwidth) & (x <= cutoff + bandwidth)\n    x_sub = x[mask]\n    y_sub = y[mask]\n    d_sub = d[mask]\n    \n    # 2. Local variables and kernel weights\n    x_c = x_sub - cutoff\n    z = (x_sub >= cutoff).astype(float)\n    u = np.abs(x_c) / bandwidth\n    w = 1.0 - u\n    W = np.diag(w)\n    \n    X_mat = np.column_stack([np.ones_like(x_c), z, x_c, z * x_c])\n    XtWX = X_mat.T @ W @ X_mat\n    \n    # 3. Reduced-form outcome jump\n    beta_y = np.linalg.solve(XtWX, X_mat.T @ W @ y_sub)\n    jump_y = float(beta_y[1])\n    \n    # 4. First-stage treatment uptake jump\n    beta_d = np.linalg.solve(XtWX, X_mat.T @ W @ d_sub)\n    jump_d = float(beta_d[1])\n    \n    # 5. Fuzzy RDD Wald ratio\n    tau_frd = jump_y / jump_d if abs(jump_d) > 1e-8 else float('nan')\n    \n    return {\n        \"jump_y\": jump_y,\n        \"jump_d\": jump_d,\n        \"tau_frd\": tau_frd,\n    }"
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
            "en": "How does this McCrary density histogram shape affect the validity of using RDD for this policy?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تصميم انقطاع الانحدار الضبابي واختبار مككراري لتشخيص التلاعب بالعتبة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The bunching spike at 49 demonstrates active manipulation and strategic sorting: business owners deliberately restrain hiring or use subcontractors to avoid crossing the 50-employee threshold. Because firms at 49 are systematically and strategically different from firms that cross to 50, the local continuity assumption is violated, completely invalidating the RDD design.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The bunching spike increases the statistical sample size near the cutoff, improving the statistical power of the local linear regression.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because firms at 49 have higher compliance, the First Stage jump is strengthened, making the Wald estimator unbiased.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The bunching is normal Poisson firm growth noise and can be resolved simply by increasing the bandwidth parameter $h$ to 100.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "synthetic-control-method",
    "title": "The Synthetic Control Method (Abadie et al.)",
    "titleAr": "طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "When major policies, geopolitical crises, or economic reforms occur, they typically affect an entire aggregate unit—a single country,...",
      "ar": "عندما تُطبق سياسات كبرى أو تقع أحداث جيوسياسية فارقة، فإنها تؤثر غالباً على وحدة واحدة متكاملة—دولة، ولاية، أو مدينة بأكملها ($N=1$)."
    },
    "prerequisites": [
      "panel-data-fixed-effects",
      "least-squares-approximation"
    ],
    "x": 770,
    "y": 1980,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SyntheticControlDonorLab",
        "narrative": {
          "en": "When major policies, geopolitical crises, or economic reforms occur, they typically affect an entire aggregate unit—a single country, state, or metropolitan area ($N=1$). In 1988, California passed Proposition 99, a groundbreaking tobacco control initiative funded by an unprecedented 25-cent cigarette excise tax. How can an empirical economist evaluate its causal impact on cigarette sales?\n\nYou cannot compare California to Texas alone (vastly different social attitudes and climates), nor can you compare it to a simple unweighted average of all 49 other states (which dilutes California's unique demographic trajectory). The **Synthetic Control Method (SCM)**, pioneered by Alberto Abadie and co-authors, solves this by acting like a master perfumer blending a custom replica: it constructs a convex combination—a weighted cocktail—of unaffected \"donor\" states (e.g., 25% Utah, 35% Montana, 40% Colorado) whose pre-1988 consumption trajectory and economic predictors track California almost perfectly. Once treatment begins in 1988, any divergence between the actual California and its synthetic twin isolates the pure causal effect of Proposition 99.",
          "ar": "عندما تُطبق سياسات كبرى أو تقع أحداث جيوسياسية فارقة، فإنها تؤثر غالباً على وحدة واحدة متكاملة—دولة، ولاية، أو مدينة بأكملها ($N=1$). في عام 1988، أقرت ولاية كاليفورنيا \"المقترح 99\"، وهو برنامج رائد لمكافحة التدخين موّلته ضريبة مبيعات بقيمة 25 سنتاً على علب السجائر. كيف يمكن لاقتصادي قياسي تقييم الأثر السببي الحقيقي لهذا القانون على استهلاك السجائر؟\n\nلا يمكن مقارنة كاليفورنيا بولاية تكساس وحدها لاختلاف العوامل الثقافية والمناخية، ولا بالمتوسط العام لجميع الولايات الـ 49 الأخرى. تقدم **طريقة الشبيه الاصطناعي (Synthetic Control Method - SCM)** التي ابتكرها ألبرتو أباديا (Abadie et al.) الحل المثالي: حيث تعمل كصانع عطور ماهر يركب نسخة مخصصة مطابقة لكاليفورنيا. تبحث الخوارزمية عن مزيج محدب وموزون من الولايات المانحة غير المعالجة (مثل: 25% من يوتا، 35% من مونتانا، 40% من كولورادو) بحيث يتطابق هذا المزيج الاصطناعي بدقة تامة مع مسار كاليفورنيا التاريخي قبل عام 1988. وبعد تطبيق القانون، يمثل أي انفصال أو تباعد بين كاليفورنيا وتوأمها الاصطناعي الأثر السببي الصافي للقانون."
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
          "en": "subject to the fundamental **Simplex Constraints**:\n\n$$\nw_j \\ge 0 \\quad \\text{for all } j \\in \\{2, \\dots, J+1\\}, \\quad \\text{and} \\quad \\sum_{j=2}^{J+1} w_j = 1\n$$\n\nwhere $\\mathbf{V}$ is a positive semi-definite diagonal matrix reflecting the relative predictive importance of the $K$ variables.\n\nThe simplex constraints are mathematically profound:\n1. **Non-negativity ($w_j \\ge 0$):** Prevents extrapolation and ensures donor weights are interpretable as fractions.\n2. **Sum-to-one ($\\sum w_j = 1$):** Guarantees the synthetic twin lies strictly inside the convex hull of the donor pool, eliminating dangerous regression extrapolation into regions without data.\n\nFor each post-intervention period $t \\in \\{T_0 + 1, \\dots, T\\}$, the estimated causal treatment effect $\\hat{\\tau}_{1t}$ is:\n\n$$\n\\hat{\\tau}_{1t} = Y_{1t} - \\hat{Y}_{1t}^{\\text{synthetic}} = Y_{1t} - \\sum_{j=2}^{J+1} w_j^* Y_{jt}\n$$",
          "ar": "يفرض القيد المحدب (Simplex Constraint) عدم سلبية الأوزان ومجموعها الذي يساوي واحداً تماماً، مما يمنع الانحدار الخطي التقليدي من الاستقراء الوهمي خارج حدود البيانات المتاحة (Convex Hull). وبذلك يكون التوأم الاصطناعي تركيبة حقيقية ملموسة من الوحدات المانحة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-synthetic-control-method",
          "starterCode": "def fit_synthetic_control_simplex(\n    X1: np.ndarray,\n    X0: np.ndarray,\n    lr: float = 0.05,\n    max_iter: int = 500\n) -> dict[str, object]:\n    \"\"\"\n    Computes optimal Synthetic Control weights via Projected Gradient Descent on the probability simplex.\n    \n    Parameters\n    ----------\n    X1 : np.ndarray of shape (K,)\n        Predictor characteristics of the treated unit.\n    X0 : np.ndarray of shape (K, J)\n        Predictor characteristics of the J donor units.\n    lr : float\n        Learning rate for gradient steps.\n    max_iter : int\n        Maximum iterations.\n        \n    Returns\n    -------\n    dict with keys:\n        'w': Optimal non-negative weight vector summing to 1.\n        'loss': Final weighted Euclidean distance ||X1 - X0 w||^2.\n    \"\"\"\n    # Initialize uniform weights\n    # Loss: f(w) = 0.5 * ||X1 - X0 @ w||^2\n    # Gradient step + projection onto simplex\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_synthetic_control_simplex(\n    X1: np.ndarray,\n    X0: np.ndarray,\n    lr: float = 0.05,\n    max_iter: int = 500\n) -> dict[str, object]:\n    \"\"\"\n    Computes optimal Synthetic Control weights via Projected Gradient Descent on the probability simplex.\n    \n    Parameters\n    ----------\n    X1 : np.ndarray of shape (K,)\n        Predictor characteristics of the treated unit.\n    X0 : np.ndarray of shape (K, J)\n        Predictor characteristics of the J donor units.\n    lr : float\n        Learning rate for gradient steps.\n    max_iter : int\n        Maximum iterations.\n        \n    Returns\n    -------\n    dict with keys:\n        'w': Optimal non-negative weight vector summing to 1.\n        'loss': Final weighted Euclidean distance ||X1 - X0 w||^2.\n    \"\"\"\n    # Initialize uniform weights\n    # Loss: f(w) = 0.5 * ||X1 - X0 @ w||^2\n    # Gradient step + projection onto simplex\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0, 0.00"
            }
          },
          "solution": "import numpy as np\n\ndef fit_synthetic_control_simplex(\n    X1: np.ndarray,\n    X0: np.ndarray,\n    lr: float = 0.05,\n    max_iter: int = 500\n) -> dict[str, object]:\n    \"\"\"\n    Computes optimal Synthetic Control weights via Projected Gradient Descent on the probability simplex.\n    \n    Parameters\n    ----------\n    X1 : np.ndarray of shape (K,)\n        Predictor characteristics of the treated unit.\n    X0 : np.ndarray of shape (K, J)\n        Predictor characteristics of the J donor units.\n    lr : float\n        Learning rate for gradient steps.\n    max_iter : int\n        Maximum iterations.\n        \n    Returns\n    -------\n    dict with keys:\n        'w': Optimal non-negative weight vector summing to 1.\n        'loss': Final weighted Euclidean distance ||X1 - X0 w||^2.\n    \"\"\"\n    K, J = X0.shape\n    # Initialize uniform weights\n    w = np.full(J, 1.0 / J)\n    \n    def project_simplex(v: np.ndarray) -> np.ndarray:\n        \"\"\"Projects a vector v onto the probability simplex: sum(w) = 1, w >= 0.\"\"\"\n        u = np.sort(v)[::-1]\n        cssv = np.cumsum(u)\n        rho = np.nonzero(u * np.arange(1, J + 1) > (cssv - 1))[0][-1]\n        theta = (cssv[rho] - 1.0) / (rho + 1.0)\n        return np.maximum(v - theta, 0.0)\n\n    for _ in range(max_iter):\n        # Loss: f(w) = 0.5 * ||X1 - X0 @ w||^2\n        diff = X1 - X0 @ w\n        grad = -X0.T @ diff\n        # Gradient step + projection onto simplex\n        w = project_simplex(w - lr * grad)\n        \n    loss = float(np.sum((X1 - X0 @ w) ** 2))\n    return {\n        \"w\": w,\n        \"loss\": loss\n    }"
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
            "en": "Why does including East Germany in the donor pool severely violate the core identifying assumptions of the Synthetic Control Method?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ طريقة الشبيه الاصطناعي لمقارنة الحالات الفردية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "East Germany was directly and intensely affected by the reunification treatment itself. Including directly affected units in the donor pool causes severe spillover contamination, violating the Stable Unit Treatment Value Assumption (SUTVA) for donors and biasing the counterfactual.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "East Germany has a smaller land area than West Germany, violating the linear scaling axiom of matrix decomposition.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "SCM requires all donor units to have strictly higher GDP than the treated unit.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Including former Soviet bloc nations makes the $\\mathbf{X}_0^T \\mathbf{X}_0$ matrix singular by definition.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "synthetic-control-placebo-tests",
    "title": "Synthetic Controls Inference & In-Space / In-Time Permutation Tests",
    "titleAr": "الاستدلال الإحصائي للشبيه الاصطناعي واختبارات المهدئ الوهمي المكانية والزمانية",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Because the Synthetic Control Method is designed for case studies with a single treated unit ($N=1$, such as California, Germany, or the...",
      "ar": "نظراً لأن طريقة الشبيه الاصطناعي موجهة لدراسات الحالة التي تشمل وحدة معالجة واحدة فقط ($N=1$، مثل ولاية كاليفورنيا أو إقليم الباسك أو دولة..."
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
          "en": "Because the Synthetic Control Method is designed for case studies with a single treated unit ($N=1$, such as California, Germany, or the Basque Country), traditional large-sample inferential statistics (t-statistics, standard errors, and asymptotic $p$-values) cannot be computed. How can an econometrician prove that California's post-1988 decline in cigarette consumption was a genuine causal effect rather than random economic noise?\n\nThe answer lies in **exact permutation and placebo (falsification) tests**. Imagine a magician who claims to possess telekinetic powers that make a coin land on heads. To test their claim, you ask everyone in an audience of 50 people to flip the same coin under identical rules. In an **in-space placebo test**, the researcher applies the exact same synthetic control algorithm to every single untreated donor state as if it had passed Proposition 99 in 1988. If the post-treatment gap for California dwarfs the placebo gaps of all 38 control states, the probability of observing this effect by pure chance is at most $1/39 \\approx 0.025$.\n\nBy computing the ratio of post-treatment to pre-treatment Root Mean Squared Prediction Error (RMSPE), we standardize each unit's divergence and obtain an exact, non-parametric permutation $p$-value.",
          "ar": "نظراً لأن طريقة الشبيه الاصطناعي موجهة لدراسات الحالة التي تشمل وحدة معالجة واحدة فقط ($N=1$، مثل ولاية كاليفورنيا أو إقليم الباسك أو دولة بأكملها)، فإن مقاييس الاستدلال الكلاسيكية المعتمدة على العينات اللانهائية (إحصاءات $t$، الخطأ المعياري، والقيم الاحتمالية التقاربية) لا يمكن حسابها. كيف يمكن للباحث إثبات أن انخفاض استهلاك السجائر في كاليفورنيا أثر سببي حقيقي وليس مجرد تقلبات عشوائية؟\n\nيكمن الحل في **اختبارات التباديل والمهدئ الوهمي (Placebo Tests)**. تخيل ساحراً يدعي أنه يستطيع تحريك قطعة نقود بقوة ذهنية لتسقط على الوجه دائماً؛ للتحقق من ادعائه، تطلب من جميع الحاضرين في القاعة (50 شخصاً) رمي القطعة بنفس الطريقة. في **اختبار المهدئ الوهمي المكاني (In-Space Placebo)**، يطبق الباحث خوارزمية الشبيه الاصطناعي على كل ولاية مانحة غير معالجة كما لو أنها طبقت القانون في نفس العام. وإذا كان الفارق المسجل في كاليفورنيا يتفوق على فجوات جميع الولايات الـ 38 الأخرى، فإن احتمال حدوث ذلك بالصدفة البحتة هو $1/39 \\approx 0.025$.\n\nومن خلال قسمة خطأ التنبؤ بعد المعالجة على خطأ التنبؤ قبلها (RMSPE Ratio)، نحصل على معيار موحد ومحايد يمنحنا قيمة احتمالية دقيقة وغير معلمية (Non-parametric Permutation p-value)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{RMSPE}_{\\text{pre}}(j) = \\sqrt{\\frac{1}{T_0} \\sum_{t=1}^{T_0} (Y_{jt} - \\hat{Y}_{jt}^{\\text{syn}})^2}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Synthetic Controls Inference & In-Space / In-Time Permutation Tests.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الاستدلال الإحصائي للشبيه الاصطناعي واختبارات المهدئ الوهمي المكانية والزمانية."
        },
        "narrative": {
          "en": "$$\n\\text{RMSPE}_{\\text{post}}(j) = \\sqrt{\\frac{1}{T - T_0} \\sum_{t=T_0 + 1}^{T} (Y_{jt} - \\hat{Y}_{jt}^{\\text{syn}})^2}\n$$\n\nTo prevent units with poor pre-treatment fit from artificially dominating the placebo distribution, Abadie et al. (2010) introduced the **RMSPE Ratio**:\n\n$$\nr_j \\equiv \\frac{\\text{RMSPE}_{\\text{post}}(j)}{\\text{RMSPE}_{\\text{pre}}(j)}\n$$\n\nThe exact permutation $p$-value for the treated unit ($j=1$) is the proportion of units with an RMSPE ratio greater than or equal to $r_1$:\n\n$$\np = \\frac{1}{J + 1} \\sum_{j=1}^{J+1} \\mathbb{I}(r_j \\ge r_1)\n$$\n\nIf $r_1$ is strictly the largest among all $J+1$ units, the empirical $p$-value achieves the minimum possible value $p = \\frac{1}{J+1}$.\n\n#### In-Time Falsification (Placebo in Time)\nA complementary diagnostic reassings the intervention date to a fictional year $T_0^{\\text{fake}} < T_0$ strictly before the true policy occurred. If the synthetic control diverges significantly prior to the true policy date, the pre-treatment identification is deemed spurious.",
          "ar": "تضمن نسبة RMSPE معاقبة وموازنة الوحدات التي كان تمثيلها الاصطناعي ضعيفاً قبل المعالجة، مما يضمن أن القيمة الاحتمالية $p$ تعكس تفوقاً حقيقياً لظهور الأثر السببي بعد المعالجة دون تضخيم من رداءة التطابق المسبق."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-synthetic-control-placebo-tests",
          "starterCode": "def compute_rmspe_ratio_pvalue(gaps_matrix: np.ndarray, t0_idx: int) -> dict[str, object]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and permutation p-value for Synthetic Control.\n    \n    Parameters\n    ----------\n    gaps_matrix : np.ndarray of shape (T, J + 1)\n        Matrix of estimated gap series (actual - synthetic) across T periods.\n        Column 0 corresponds to the treated unit; columns 1..J are placebos.\n    t0_idx : int\n        Number of pre-treatment periods (index where treatment starts).\n        \n    Returns\n    -------\n    dict with keys:\n        'ratios': Array of RMSPE ratios for all units.\n        'treated_ratio': Ratio for treated unit (column 0).\n        'p_value': Exact empirical permutation p-value.\n        'rank': 1-based rank of the treated unit (1 = largest ratio).\n    \"\"\"\n    # 1. Pre-treatment RMSPE: periods 0 to t0_idx\n    # Avoid zero division with small epsilon\n    # 2. Post-treatment RMSPE: periods t0_idx to T\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_rmspe_ratio_pvalue(gaps_matrix: np.ndarray, t0_idx: int) -> dict[str, object]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and permutation p-value for Synthetic Control.\n    \n    Parameters\n    ----------\n    gaps_matrix : np.ndarray of shape (T, J + 1)\n        Matrix of estimated gap series (actual - synthetic) across T periods.\n        Column 0 corresponds to the treated unit; columns 1..J are placebos.\n    t0_idx : int\n        Number of pre-treatment periods (index where treatment starts).\n        \n    Returns\n    -------\n    dict with keys:\n        'ratios': Array of RMSPE ratios for all units.\n        'treated_ratio': Ratio for treated unit (column 0).\n        'p_value': Exact empirical permutation p-value.\n        'rank': 1-based rank of the treated unit (1 = largest ratio).\n    \"\"\"\n    # 1. Pre-treatment RMSPE: periods 0 to t0_idx\n    # Avoid zero division with small epsilon\n    # 2. Post-treatment RMSPE: periods t0_idx to T\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.3333, 1"
            }
          },
          "solution": "import numpy as np\n\ndef compute_rmspe_ratio_pvalue(gaps_matrix: np.ndarray, t0_idx: int) -> dict[str, object]:\n    \"\"\"\n    Computes post/pre RMSPE ratios and permutation p-value for Synthetic Control.\n    \n    Parameters\n    ----------\n    gaps_matrix : np.ndarray of shape (T, J + 1)\n        Matrix of estimated gap series (actual - synthetic) across T periods.\n        Column 0 corresponds to the treated unit; columns 1..J are placebos.\n    t0_idx : int\n        Number of pre-treatment periods (index where treatment starts).\n        \n    Returns\n    -------\n    dict with keys:\n        'ratios': Array of RMSPE ratios for all units.\n        'treated_ratio': Ratio for treated unit (column 0).\n        'p_value': Exact empirical permutation p-value.\n        'rank': 1-based rank of the treated unit (1 = largest ratio).\n    \"\"\"\n    T, num_units = gaps_matrix.shape\n    \n    # 1. Pre-treatment RMSPE: periods 0 to t0_idx\n    pre_gaps = gaps_matrix[:t0_idx, :]\n    rmspe_pre = np.sqrt(np.mean(pre_gaps ** 2, axis=0))\n    # Avoid zero division with small epsilon\n    rmspe_pre = np.maximum(rmspe_pre, 1e-8)\n    \n    # 2. Post-treatment RMSPE: periods t0_idx to T\n    post_gaps = gaps_matrix[t0_idx:, :]\n    rmspe_post = np.sqrt(np.mean(post_gaps ** 2, axis=0))\n    \n    # 3. RMSPE Ratios\n    ratios = rmspe_post / rmspe_pre\n    treated_ratio = float(ratios[0])\n    \n    # 4. Exact Permutation p-value and Rank\n    p_value = float(np.mean(ratios >= treated_ratio))\n    rank = int(np.sum(ratios > treated_ratio) + 1)\n    \n    return {\n        \"ratios\": ratios,\n        \"treated_ratio\": treated_ratio,\n        \"p_value\": p_value,\n        \"rank\": rank\n    }"
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
            "en": "How does the RMSPE ratio ($r_j = \\text{RMSPE}_{\\text{post}} / \\text{RMSPE}_{\\text{pre}}$) correctly evaluate this phenomenon compared to looking only at raw post-treatment gaps?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الاستدلال الإحصائي للشبيه الاصطناعي واختبارات المهدئ الوهمي المكانية والزمانية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The ratio penalizes regions with poor pre-treatment fit: although Extremadura has a large raw post-treatment gap, dividing by its massive pre-treatment error yields a modest RMSPE ratio,ly preventing volatile, poorly-matched placebos from artificially distorting the statistical significance of the treated unit.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The ratio forces Extremadura's weights to become negative, automatically removing it from the donor pool.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The ratio transforms the non-parametric permutation distribution into an asymptotic Gaussian Student's t-distribution.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Raw gaps are always superior to ratios because pre-treatment errors represent structural fixed effects that cancel out over time.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "ridge-lasso",
    "title": "Ridge Regression (L2) & SVD Spectral Shrinkage",
    "titleAr": "انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "When explanatory features are highly collinear or when the number of features $p$ approaches or exceeds sample size $n$, Ordinary Least...",
      "ar": "عندما تتداخل المتغيرات التفسيرية بشدة (Multicollinearity) أو عندما يقترب عدد المتغيرات $p$ من حجم العينة $n$، ينهار انحدار المربعات الصغرى..."
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
          "en": "When explanatory features are highly collinear or when the number of features $p$ approaches or exceeds sample size $n$, Ordinary Least Squares (OLS) breaks down. In matrix algebra terms, $\\mathbf{X}^T \\mathbf{X}$ becomes near-singular (ill-conditioned), and its inverse $(\\mathbf{X}^T \\mathbf{X})^{-1}$ explodes. The OLS estimator becomes like a loose, vibrating lever arm: the slightest whisper of noise in the training set causes estimated coefficients to swing wildly into enormous opposing positive and negative magnitudes ($+1,500$ and $-1,498$).\n\nHoerl and Kennard (1970) introduced **Ridge Regression ($L_2$ regularization)** to stabilize the system. Think of Ridge regression as attaching **an elastic rubber cord between each coefficient and the zero origin**. When OLS tries to sling coefficients to massive values to overfit collinear noise, the elastic cord stretches and exerts a restorative pull, yanking all coefficients back toward zero.\n\nBecause the $L_2$ penalty is quadratic ($\\lambda \\|\\boldsymbol{\\beta}\\|_2^2$), the cord pulls hardest on massive coefficients and eases its tension as coefficients approach zero. Consequently, Ridge smoothly shrinks all coefficients together, conditioning the singular values of the data matrix without ever snapping any coefficient to exactly zero.",
          "ar": "عندما تتداخل المتغيرات التفسيرية بشدة (Multicollinearity) أو عندما يقترب عدد المتغيرات $p$ من حجم العينة $n$، ينهار انحدار المربعات الصغرى العادي (OLS). جبرياً، تصبح المصفوفة $\\mathbf{X}^T \\mathbf{X}$ شبه شاذة (Ill-conditioned)، وتنفجر قيم مقلوبها نحو اللانهاية. يعمل مقدر OLS كذراع رافعة رخوة تتأرجح بجنون؛ فأي اهتزاز طفيف في البيانات يدفع المعاملات إلى قيم موجبة وسالبة فلكية متعارضة ($+1,500$ و $-1,498$).\n\nقدم هورل وكينارد (1970) **انحدار ريدج (Ridge Regression - تنظيم $L_2$)** لإعادة الاستقرار للنظام. تخيل انحدار ريدج كـ **حبل مطاطي مرن يربط كل معامل بنقطة الصفر**. كلما حاول المعامل التضخم لفرط تخصيص الضجيج، تمدد الحبل المطاطي ومارس قوة جذب مرنة تشد المعامل بقوة نحو الصفر.\n\nونظراً لأن جزاء $L_2$ تربيعي ($\\lambda \\|\\boldsymbol{\\beta}\\|_2^2$)، فإن الحبل يمارس أقصى قوة شد على المعاملات الضخمة، بينما تتلاشى قوة جذبه مع اقتراب المعامل من الصفر. والنتيجة هي انكماش ناعم وسلس لجميع المعاملات بالتوازي، مما يضبط القيم المنفردة للمصفوفة دون أن يصفر أي معامل تماماً."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\boldsymbol{\\beta}} \\mathcal{L}_{\\text{Ridge}}(\\boldsymbol{\\beta}) = \\frac{1}{2n}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\|\\boldsymbol{\\beta}\\|_2^2",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Ridge Regression (L2) & SVD Spectral Shrinkage.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة."
        },
        "narrative": {
          "en": "#### Breakdown of Objective Terms:\n- $\\frac{1}{2n}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2$: Empirical Mean Squared Error (loss measuring fidelity to the training data).\n- $\\lambda \\ge 0$: Regularization hyperparameter governing the bias-variance tradeoff (as $\\lambda \\to 0$, Ridge recovers OLS; as $\\lambda \\to \\infty$, all $\\boldsymbol{\\beta} \\to \\mathbf{0}$).\n- $\\|\\boldsymbol{\\beta}\\|_2^2 = \\sum_{j=1}^p \\beta_j^2$: Squared Euclidean $L_2$ norm penalty penalizing coefficient magnitudes.\n\nSetting the gradient to zero yields the unique, closed-form analytical solution:\n\n$$\n\\nabla_{\\boldsymbol{\\beta}} \\mathcal{L} = -\\frac{1}{n}\\mathbf{X}^T(\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) + 2\\lambda \\boldsymbol{\\beta} = \\mathbf{0} \\implies \\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}} = \\left(\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I}_p\\right)^{-1} \\mathbf{X}^T \\mathbf{y}\n$$\n\nBecause $2n\\lambda \\mathbf{I}_p$ adds a strictly positive constant along the diagonal, the matrix $(\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I})$ is guaranteed to be strictly positive-definite and invertible, even if $\\mathbf{X}^T \\mathbf{X}$ is rank-deficient ($p > n$).\n\n#### SVD Spectral Shrinkage\nLet $\\mathbf{X} = \\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^T$ be the Singular Value Decomposition (SVD) of the centered design matrix, with singular values $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_p > 0$. The Ridge predictions satisfy:\n\n$$\n\\hat{\\mathbf{y}}_{\\text{Ridge}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}} = \\sum_{j=1}^p \\mathbf{u}_j \\left( \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda} \\right) \\mathbf{u}_j^T \\mathbf{y}\n$$\n\nThe factor $f_j = \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda} \\in (0, 1]$ represents the **spectral shrinkage factor**. Directions with large singular values (principal components with vast variance) suffer minimal shrinkage, whereas collinear directions with tiny singular values ($\\sigma_j \\approx 0$) are squashed toward zero.\n\nThe **effective degrees of freedom** of the model is:\n\n$$\n\\text{df}(\\lambda) = \\text{tr}\\left( \\mathbf{X}(\\mathbf{X}^T \\mathbf{X} + 2n\\lambda \\mathbf{I})^{-1}\\mathbf{X}^T \\right) = \\sum_{j=1}^p \\frac{\\sigma_j^2}{\\sigma_j^2 + 2n\\lambda}\n$$",
          "ar": "يُضيف تنظيم ريدج حداً موجباً قطعياً إلى قطر مصفوفة التغاير، مما يضمن قابليتها للعكس دائماً. ومن خلال تفكيك القيم المنفردة (SVD)، يكبح النموذج الاتجاهات الخطية الضعيفة التي تسبب تضخم التباين، ويمنحنا درجة حرية فعالة $\\text{df}(\\lambda)$ تعكس التعقيد الحقيقي للنموذج بدقة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-ridge-lasso",
          "starterCode": "def fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> dict[str, object]:\n    \"\"\"\n    Fits Ridge regression using closed-form Normal Equations and computes SVD spectral shrinkage.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix.\n    y : np.ndarray of shape (N,)\n        Target response vector.\n    lmbda : float\n        Regularization strength lambda >= 0.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': Estimated Ridge coefficient vector.\n        'singular_values': Singular values of X.\n        'shrinkage_factors': SVD spectral shrinkage factors per component.\n        'df_effective': Effective degrees of freedom df(lambda).\n    \"\"\"\n    # 1. Closed-form Ridge: (X^T X + 2*N*lambda * I)^(-1) X^T y\n    # 2. SVD of X to obtain singular values\n    # 3. Spectral shrinkage factors: s_j^2 / (s_j^2 + 2*N*lambda)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> dict[str, object]:\n    \"\"\"\n    Fits Ridge regression using closed-form Normal Equations and computes SVD spectral shrinkage.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix.\n    y : np.ndarray of shape (N,)\n        Target response vector.\n    lmbda : float\n        Regularization strength lambda >= 0.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': Estimated Ridge coefficient vector.\n        'singular_values': Singular values of X.\n        'shrinkage_factors': SVD spectral shrinkage factors per component.\n        'df_effective': Effective degrees of freedom df(lambda).\n    \"\"\"\n    # 1. Closed-form Ridge: (X^T X + 2*N*lambda * I)^(-1) X^T y\n    # 2. SVD of X to obtain singular values\n    # 3. Spectral shrinkage factors: s_j^2 / (s_j^2 + 2*N*lambda)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.96, 1.94"
            }
          },
          "solution": "import numpy as np\n\ndef fit_ridge_svd(X: np.ndarray, y: np.ndarray, lmbda: float) -> dict[str, object]:\n    \"\"\"\n    Fits Ridge regression using closed-form Normal Equations and computes SVD spectral shrinkage.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix.\n    y : np.ndarray of shape (N,)\n        Target response vector.\n    lmbda : float\n        Regularization strength lambda >= 0.\n        \n    Returns\n    -------\n    dict with keys:\n        'beta': Estimated Ridge coefficient vector.\n        'singular_values': Singular values of X.\n        'shrinkage_factors': SVD spectral shrinkage factors per component.\n        'df_effective': Effective degrees of freedom df(lambda).\n    \"\"\"\n    N, P = X.shape\n    \n    # 1. Closed-form Ridge: (X^T X + 2*N*lambda * I)^(-1) X^T y\n    XtX = X.T @ X\n    penalty_diag = 2.0 * N * lmbda * np.eye(P)\n    beta = np.linalg.solve(XtX + penalty_diag, X.T @ y)\n    \n    # 2. SVD of X to obtain singular values\n    U, s, Vt = np.linalg.svd(X, full_matrices=False)\n    \n    # 3. Spectral shrinkage factors: s_j^2 / (s_j^2 + 2*N*lambda)\n    s_squared = s ** 2\n    shrinkage = s_squared / (s_squared + 2.0 * N * lmbda)\n    df_effective = float(np.sum(shrinkage))\n    \n    return {\n        \"beta\": beta,\n        \"singular_values\": s,\n        \"shrinkage_factors\": shrinkage,\n        \"df_effective\": df_effective\n    }"
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
            "en": "How does fitting Ridge regression resolve this modeling pathology?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Ridge regression conditions the near-singular covariance matrix by adding a positive constant to the eigenvalues. The $L_2$ penalty pulls the opposing collinear coefficients toward stable, moderate values, drastically slashing the variance of the predictions and improving generalization on unseen test patients.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Ridge regression sets two of the four collinear blood pressure features to exactly zero.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Ridge transforms the linear model into an ensemble of orthogonal decision trees.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Ridge eliminates the need for test sets by proving zero generalization error via the Gauss-Markov theorem.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "elastic-net-coordinate-descent",
    "title": "Lasso Regression (L1), Polyhedral Geometry & Elastic Net",
    "titleAr": "انحدار لاسو وهندسة متعدد السطوح وشبكة المرونة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Ridge regression ($L2$) shrinks coefficients smoothly toward zero, it retains every single variable in the model—an undesirable trait...",
      "ar": "بينما يقلص انحدار ريدج ($L2$) المعاملات بسلاسة نحو الصفر، فإنه يبقي على جميع المتغيرات داخل النموذج—وهو أمر غير عملي عند التعامل مع آلاف..."
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
          "en": "While Ridge regression ($L_2$) shrinks coefficients smoothly toward zero, it retains every single variable in the model—an undesirable trait when managing thousands of genomic markers, sensor streams, or text tokens where most features are pure noise.\n\nRobert Tibshirani (1996) introduced the **Lasso ($L_1$ regularization)** to achieve simultaneous regularization and feature selection. If Ridge is an elastic rubber cord that pulls coefficients toward zero without ever touching it, **Lasso is a guillotine that snaps unimportant features to exactly zero**.\n\nThe secret lies in polyhedral geometry: the $L_1$ constraint ball $\\{\\boldsymbol{\\beta} : \\sum |\\beta_j| \\le t\\}$ is a diamond (cross-polytope) with sharp, pointed vertices positioned squarely on the coordinate axes. When the smooth elliptical loss contours of the least-squares error expand outward from the unconstrained OLS solution, they almost always make their first point of contact with one of these sharp diamond corners. At any corner on a coordinate axis, the orthogonal coefficients are mathematically pinned to exactly zero, yielding a sparse model.\n\nZou and Hastie (2005) introduced the **Elastic Net** to overcome Lasso's limitations on correlated features: combining the diamond corners of $L_1$ with the rounded quadratic shoulders of $L_2$.",
          "ar": "بينما يقلص انحدار ريدج ($L_2$) المعاملات بسلاسة نحو الصفر، فإنه يبقي على جميع المتغيرات داخل النموذج—وهو أمر غير عملي عند التعامل مع آلاف المتغيرات الجينية أو مؤشرات النصوص حيث تكون أغلب المتغيرات مجرد ضجيج لا قيمة له.\n\nقدم روبرت تيبشيراني (1996) **انحدار لاسو (Lasso - تنظيم $L_1$)** لتحقيق الانتقاء التلقائي للمتغيرات (Feature Selection). إذا كان انحدار ريدج كحبل مطاطي يشد المعاملات نحو الصفر دون أن يلامسه أبداً، فإن **انحدار لاسو هو مقصلة حاسمة تصفر المعاملات غير المهمة لتصبح صفراً تماماً**.\n\nيكمن السر في هندسة متعدد السطوح (Polyhedral Geometry): منطقة قيد $L_1$ هي معين ماسي ذو رؤوس وزوايا حادة مدببة تقع تماماً على محاور الإحداثيات. وعندما تتوسع قطوع خطأ المربعات الصغرى البيضاوية انطلاقاً من حل OLS الحر، فإنها تصطدم حتماً بإحدى هذه الزوايا الحادة أولاً. وعند أي رأس يقع على المحور، تصبح المعاملات المتعامدة صفراً جبرياً تاماً. وتجمع **شبكة المرونة (Elastic Net)** بين زوايا لاسو الحادة وانحناءات ريدج الملساء لمعالجة المتغيرات المترابطة كمجموعات متكاملة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\boldsymbol{\\beta}} \\mathcal{L}_{\\text{EN}}(\\boldsymbol{\\beta}) = \\frac{1}{2n}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\left[ \\alpha \\|\\boldsymbol{\\beta}\\|_1 + \\frac{1 - \\alpha}{2} \\|\\boldsymbol{\\beta}\\|_2^2 \\right]",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Lasso Regression (L1), Polyhedral Geometry & Elastic Net.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ انحدار لاسو وهندسة متعدد السطوح وشبكة المرونة."
        },
        "narrative": {
          "en": "#### Breakdown of Penalty Terms:\n- $\\lambda \\ge 0$: Overall regularization intensity.\n- $\\alpha = 1$: Pure Lasso ($L_1$ norm $\\|\\boldsymbol{\\beta}\\|_1 = \\sum_{j=1}^p |\\beta_j|$, inducing exact sparsity).\n- $\\alpha = 0$: Pure Ridge ($L_2$ squared norm $\\|\\boldsymbol{\\beta}\\|_2^2 = \\sum_{j=1}^p \\beta_j^2$, stabilizing collinearity).\n- $0 < \\alpha < 1$: Elastic Net compromise providing both feature selection and grouped selection.\n\n#### Coordinate Descent & Soft-Thresholding\nBecause the $L_1$ norm is non-differentiable at $\\beta_j = 0$, we cannot compute a traditional gradient. Instead, we use subgradient calculus and **cyclical coordinate descent**.\n\nDefine the **Soft-Thresholding Operator**:\n\n$$\n\\mathcal{S}(z, \\gamma) \\equiv \\text{sign}(z) \\max(|z| - \\gamma, 0) = \\begin{cases} z - \\gamma & \\text{if } z > \\gamma \\\\ 0 & \\text{if } |z| \\le \\gamma \\\\ z + \\gamma & \\text{if } z < -\\gamma \\end{cases}\n$$\n\nFor standardized predictors ($\\frac{1}{n}\\mathbf{x}_j^T \\mathbf{x}_j = 1$), isolate variable $j$ by computing the partial residual $\\mathbf{r}^{(-j)} = \\mathbf{y} - \\sum_{k \\ne j} \\mathbf{x}_k \\beta_k$ and the unconstrained projection $z_j = \\frac{1}{n}\\mathbf{x}_j^T \\mathbf{r}^{(-j)}$. The coordinate-wise update is given by the exact scalar closed form:\n\n$$\n\\beta_j \\leftarrow \\frac{\\mathcal{S}\\left(z_j, \\lambda \\alpha\\right)}{1 + \\lambda (1 - \\alpha)}\n$$\n\nBy cycling through features $j = 1, \\dots, p$ until convergence, coordinate descent finds the global optimum with remarkable computational speed.",
          "ar": "تعتمد خوارزمية الهبوط الإحداثي (Coordinate Descent) على مشغل العتبة المرنة (Soft-Thresholding)؛ حيث تفحص كل متغير بمعزل عن البقية، فإذا كان إسهامه التنبؤي أقل من قيمة العتبة $\\lambda \\alpha$، تُصفر معامل هذا المتغير فوراً دون أي استهلاك حسابي إضافي."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-elastic-net-coordinate-descent",
          "starterCode": "def fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float,\n    max_iter: int = 100,\n    tol: float = 1e-5\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net regression via cyclical coordinate descent with soft-thresholding.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix (assumed normalized/standardized).\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization parameter lambda >= 0.\n    alpha : float\n        Mixing parameter in [0, 1] (1 = Lasso, 0 = Ridge).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance on coefficient changes.\n        \n    Returns\n    -------\n    np.ndarray of shape (P,)\n        Sparse estimated coefficient vector.\n    \"\"\"\n    # Precompute column norms (assumes columns have unit variance: x_j^T x_j / N = 1)\n    # Compute partial residual: r_j = y - X @ beta + X[:, j] * beta[j]\n    # Apply soft thresholding and Elastic Net denominator\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float,\n    max_iter: int = 100,\n    tol: float = 1e-5\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net regression via cyclical coordinate descent with soft-thresholding.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix (assumed normalized/standardized).\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization parameter lambda >= 0.\n    alpha : float\n        Mixing parameter in [0, 1] (1 = Lasso, 0 = Ridge).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance on coefficient changes.\n        \n    Returns\n    -------\n    np.ndarray of shape (P,)\n        Sparse estimated coefficient vector.\n    \"\"\"\n    # Precompute column norms (assumes columns have unit variance: x_j^T x_j / N = 1)\n    # Compute partial residual: r_j = y - X @ beta + X[:, j] * beta[j]\n    # Apply soft thresholding and Elastic Net denominator\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0.80, 0.00"
            }
          },
          "solution": "import numpy as np\n\ndef fit_elastic_net(\n    X: np.ndarray,\n    y: np.ndarray,\n    lmbda: float,\n    alpha: float,\n    max_iter: int = 100,\n    tol: float = 1e-5\n) -> np.ndarray:\n    \"\"\"\n    Fits Elastic Net regression via cyclical coordinate descent with soft-thresholding.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Design matrix (assumed normalized/standardized).\n    y : np.ndarray of shape (N,)\n        Response vector.\n    lmbda : float\n        Regularization parameter lambda >= 0.\n    alpha : float\n        Mixing parameter in [0, 1] (1 = Lasso, 0 = Ridge).\n    max_iter : int\n        Maximum coordinate descent cycles.\n    tol : float\n        Convergence tolerance on coefficient changes.\n        \n    Returns\n    -------\n    np.ndarray of shape (P,)\n        Sparse estimated coefficient vector.\n    \"\"\"\n    N, P = X.shape\n    beta = np.zeros(P)\n    \n    # Precompute column norms (assumes columns have unit variance: x_j^T x_j / N = 1)\n    norm_sq = np.sum(X ** 2, axis=0) / N\n    \n    def soft_threshold(z: float, gamma: float) -> float:\n        if z > gamma:\n            return z - gamma\n        elif z < -gamma:\n            return z + gamma\n        else:\n            return 0.0\n\n    for iteration in range(max_iter):\n        beta_old = beta.copy()\n        \n        for j in range(P):\n            # Compute partial residual: r_j = y - X @ beta + X[:, j] * beta[j]\n            y_pred = X @ beta\n            residual = y - y_pred + X[:, j] * beta[j]\n            z_j = float(X[:, j] @ residual) / N\n            \n            # Apply soft thresholding and Elastic Net denominator\n            gamma = lmbda * alpha\n            numerator = soft_threshold(z_j, gamma)\n            denominator = norm_sq[j] + lmbda * (1.0 - alpha)\n            \n            beta[j] = numerator / denominator if denominator > 1e-8 else 0.0\n            \n        if np.max(np.abs(beta - beta_old)) < tol:\n            break\n            \n    return beta"
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
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Elastic Net guarantees that the training loss equals zero on high-dimensional data.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Lasso cannot handle cases where $p > n$, whereas Elastic Net mathematically transforms $p$ to be strictly less than $n$.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Elastic Net removes the requirement for test set validation by proving Bayesian asymptotic convergence.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "logistic-regression-sigmoid",
    "title": "Logistic Regression, Sigmoid Probability & Maximum Likelihood",
    "titleAr": "الانحدار اللوجستي ودالة السجمويد والتعظيم الأرجحي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "When predicting binary outcomes (loan default vs. repayment, disease presence vs. absence, customer churn vs.",
      "ar": "عندما نحاول التنبؤ بنتائج ثنائية (التعثر المالي مقابل السداد، تشخيص المرض مقابل السلامة، إلغاء الاشتراك مقابل البقاء)، فإن استخدام الانحدار..."
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
          "en": "When predicting binary outcomes (loan default vs. repayment, disease presence vs. absence, customer churn vs. retention), fitting Ordinary Least Squares (the Linear Probability Model) is hazardous. A straight line is rigid: as regressors take extreme values, predicted probabilities inevitably crash below $0\\%$ into negative numbers or soar above $100\\%$, violating the fundamental Kolmogorov axioms of probability.\n\nLogistic regression solves this by using the **Sigmoid S-curve as an elastic damper**. Think of the Sigmoid function as a shock absorber that intercepts any unbounded linear score $z = \\mathbf{x}^T \\mathbf{w} \\in (-\\infty, +\\infty)$ and compresses it smoothly into the open probability interval $(0, 1)$.\n\nInstead of modeling probability as a linear function, Logistic regression models the **log-odds (logit)** as a linear function. This means that each unit increase in a feature does not add a fixed percentage to the probability; instead, it multiplies the *odds ratio* by a constant factor $e^{\\beta_j}$, ensuring probabilities naturally saturate as they approach certainty (0 or 1).",
          "ar": "عندما نحاول التنبؤ بنتائج ثنائية (التعثر المالي مقابل السداد، تشخيص المرض مقابل السلامة، إلغاء الاشتراك مقابل البقاء)، فإن استخدام الانحدار الخطي العادي (Linear Probability Model) محفوف بالمخاطر. الخط المستقيم صلب وغير مرن: فمع القيم القصوى للمتغيرات، تخترق التنبؤات الحدود المنطقية لتهوي دون $0\\%$ إلى احتمالات سالبة أو تتجاوز $100\\%$، مما ينتهك بديهيات نظرية الاحتمالات.\n\nيعالج الانحدار اللوجستي هذه المعضلة باستخدام **منحنى السجمويد (Sigmoid) كمخمد مرن للصدمات**. تخيل دالة السجمويد كممتص صدمات يستقبل أي قيمة خطية غير محدودة $z = \\mathbf{x}^T \\mathbf{w} \\in (-\\infty, +\\infty)$ ويضغطها بسلاسة وانسيابية داخل مجال الاحتمالات المقيد $(0, 1)$.\n\nوبدلاً من افتراض علاقة خطية مع الاحتمال مباشرة، يفترض النموذج علاقة خطية مع **لوغاريتم الأرجحية (Log-Odds)**. هذا يعني أن كل زيادة بوحدة واحدة في المتغير التفسيري لا تضيف نسبة مئوية ثابتة للاحتمال، بل تضاعف نسبة الأرجحية (Odds Ratio) بالمعامل $e^{\\beta_j}$، مما يجعل التغير في الاحتمال يتشبع تدريجياً عند الاقتراب من اليقين التام (0 أو 1)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\sigma(z) \\equiv \\frac{1}{1 + e^{-z}} = \\frac{e^z}{1 + e^z}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Logistic Regression, Sigmoid Probability & Maximum Likelihood.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الانحدار اللوجستي ودالة السجمويد والتعظيم الأرجحي."
        },
        "narrative": {
          "en": "The first derivative satisfies the elegant algebraic identity:\n\n$$\n\\sigma'(z) = \\sigma(z) \\left( 1 - \\sigma(z) \\right)\n$$\n\nThe modeled posterior probability of the positive class $Y_i = 1$ is:\n\n$$\np_i \\equiv \\mathbb{P}(Y_i = 1 \\mid \\mathbf{x}_i) = \\sigma(\\mathbf{x}_i^T \\mathbf{w}) \\iff \\ln \\left( \\frac{p_i}{1 - p_i} \\right) = \\mathbf{x}_i^T \\mathbf{w}\n$$\n\n#### Maximum Likelihood Estimation & Binary Cross-Entropy\nAssuming independent Bernoulli trials, the likelihood of observing data $\\{(\\mathbf{x}_i, y_i)\\}_{i=1}^N$ is:\n\n$$\n\\mathcal{L}(\\mathbf{w}) = \\prod_{i=1}^N p_i^{y_i} (1 - p_i)^{1 - y_i}\n$$\n\nMinimizing the Negative Log-Likelihood (Binary Cross-Entropy Loss) yields the objective function:\n\n$$\nJ(\\mathbf{w}) = -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\ln p_i + (1 - y_i) \\ln(1 - p_i) \\right]\n$$\n\n#### Gradient & Hessian\nUsing the chain rule, the gradient vector takes a remarkably compact form identical in structure to OLS residuals:\n\n$$\n\\nabla_{\\mathbf{w}} J = \\frac{1}{N} \\mathbf{X}^T (\\mathbf{p} - \\mathbf{y})\n$$\n\nThe Hessian matrix is strictly positive semi-definite:\n\n$$\n\\mathbf{H} = \\nabla_{\\mathbf{w}}^2 J = \\frac{1}{N} \\mathbf{X}^T \\mathbf{S} \\mathbf{X}, \\quad \\text{where } \\mathbf{S} = \\text{diag}\\left( p_i (1 - p_i) \\right)\n$$\n\nBecause the Hessian is positive semi-definite everywhere, the binary cross-entropy loss is strictly convex, guaranteeing a unique global minimum reachable via Gradient Descent or Newton-Raphson (Iteratively Reweighted Least Squares).",
          "ar": "تتميز دالة خسارة الإنتروبيا المتقاطعة (Cross-Entropy) بأنها دالة محدبة تماماً (Convex)، مما يعني عدم وجود قيعان محلية تضلل الخوارزمية. ويشبه متجه التدرج $\\mathbf{X}^T(\\mathbf{p} - \\mathbf{y})$ بواقي الانحدار الخطي، حيث يمثل الفرق بين الاحتمال المتوقع والنتيجة الحقيقية محرك التحديث في كل خطوة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-logistic-regression-sigmoid",
          "starterCode": "def fit_logistic_regression(\n    X: np.ndarray,\n    y: np.ndarray,\n    lr: float = 0.1,\n    n_iters: int = 200\n) -> np.ndarray:\n    \"\"\"\n    Fits binary logistic regression via vectorized gradient descent.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Feature matrix (can include constant column for bias).\n    y : np.ndarray of shape (N,)\n        Binary response labels in {0, 1}.\n    lr : float\n        Learning rate.\n    n_iters : int\n        Number of gradient descent iterations.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Estimated parameter weights w.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def fit_logistic_regression(\n    X: np.ndarray,\n    y: np.ndarray,\n    lr: float = 0.1,\n    n_iters: int = 200\n) -> np.ndarray:\n    \"\"\"\n    Fits binary logistic regression via vectorized gradient descent.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Feature matrix (can include constant column for bias).\n    y : np.ndarray of shape (N,)\n        Binary response labels in {0, 1}.\n    lr : float\n        Learning rate.\n    n_iters : int\n        Number of gradient descent iterations.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Estimated parameter weights w.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
            "en": "What is the correct statistical interpretation of this estimated coefficient?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الانحدار اللوجستي ودالة السجمويد والتعظيم الأرجحي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The announcement is in: in logistic regression, coefficients represent changes in log-odds. Because $e^{0.693} \\approx 2.0$, each additional inquiry multiplies the borrower's *odds of default* by 2 (the odds double). The actual percentage point change in probability is non-linear and depends heavily on baseline risk: $\\Delta p \\approx p(1-p)\\beta_j$.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The announcement is: the derivative of the Sigmoid function is everywhere equal to 1, maintaining strict linear additivity.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The true probability increases by $0.693^2 = 0.48$ because probability is the square root of the likelihood.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The coefficient is uninterpretable because logistic regression parameters are scale-invariant scale factors.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "roc-auc-confusion-matrix",
    "title": "Classification Metrics, ROC Curves & The Mann-Whitney Equivalence",
    "titleAr": "مقاييس التصنيف ومنحنى ROC ومكافئ مان-ويتني",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In applied machine learning, relying on raw classification accuracy is often catastrophic.",
      "ar": "في تعلم الآلة التطبيقي، يُعد الاعتماد على مقياس الدقة البسيطة (Accuracy) فخاً خطيراً. تخيل نظاماً لرصد الاحتيال المالي أو تشخيص الأورام..."
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
          "en": "In applied machine learning, relying on raw classification accuracy is often catastrophic. Consider detecting fraudulent credit card transactions, rare metastatic tumors, or system failures where the positive class comprises only $0.1\\%$ of the dataset. A trivial, useless model that predicts \"Not Fraud\" for every single transaction achieves $99.9\\%$ accuracy while failing to detect a single criminal!\n\nTo truly evaluate a probabilistic classifier, we must uncouple the model's ranking ability from any arbitrary decision threshold $\\tau \\in [0, 1]$. The **Receiver Operating Characteristic (ROC)** curve sweeps the decision threshold across its entire continuum from $1.0$ down to $0.0$, plotting the True Positive Rate (Sensitivity / Recall) on the y-axis against the False Positive Rate ($1 - \\text{Specificity}$) on the x-axis.\n\nThe **Area Under the ROC Curve (ROC-AUC)** possesses a profound, beautiful probabilistic identity: it is mathematically identical to the non-parametric **Wilcoxon-Mann-Whitney U statistic**. The AUC represents the exact probability that if you randomly draw one positive observation and one negative observation, your model assigns a strictly higher risk score to the positive instance!",
          "ar": "في تعلم الآلة التطبيقي، يُعد الاعتماد على مقياس الدقة البسيطة (Accuracy) فخاً خطيراً. تخيل نظاماً لرصد الاحتيال المالي أو تشخيص الأورام الخبيثة النادرة حيث لا تتجاوز الحالات الإيجابية $0.1\\%$ من إجمالي العينة. يستطيع نموذج غبي تماماً أن يتنبأ بـ \"عدم وجود احتيال\" لجميع العمليات ليحقق دقة زائفة تبلغ $99.9\\%$، رغم أنه فشل في رصد محتال واحد!\n\nلتقييم النموذج تقييماً حقيقياً، يجب فصل قدرته التمييزية عن أي عتبة تصنيف ثابتة $\\tau \\in [0, 1]$. يقوم **منحنى خصائص تشغيل المستقبل (ROC Curve)** بفحص جميع العتبات الممكنة من $1.0$ إلى $0.0$، راسماً المعدل الإيجابي الحقيقي (الحساسية / الاستدعاء) مقابل المعدل الإيجابي الزائف.\n\nوتتميز **المساحة تحت منحنى ROC (المعروفة بـ ROC-AUC)** بمدلول احتمالي عميق: فهي تتطابق رياضياً مع **إحصاء مان-ويتني اللامعلمي (Wilcoxon-Mann-Whitney U)**. إن الـ AUC يمثل بالضبط احتمال أن يعطي النموذج درجة تقييم للحالة الإيجابية العشوائية أعلى من الحالة السلبية العشوائية!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{TPR} = \\frac{TP}{TP + FN}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Classification Metrics, ROC Curves & The Mann-Whitney Equivalence.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ مقاييس التصنيف ومنحنى ROC ومكافئ مان-ويتني."
        },
        "narrative": {
          "en": "- **False Positive Rate ($1 - \\text{Specificity}$):** Fraction of actual negatives falsely flagged:\n  $$\\text{FPR} = \\frac{FP}{FP + TN}$$\n\n- **Precision (Positive Predictive Value):** Fraction of flagged instances that are truly positive:\n  $$\\text{Precision} = \\frac{TP}{TP + FP}$$\n\n- **$F_1$-Score:** Harmonic mean balancing Precision and Recall:\n  $$F_1 = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2TP}{2TP + FP + FN}$$\n\n#### The Wilcoxon-Mann-Whitney Theorem for ROC-AUC\nLet $n_+$ be the number of positive instances ($y_i = 1$) and $n_-$ be the number of negative instances ($y_j = 0$). Let $\\hat{s}_i \\in [0, 1]$ denote the model's predicted risk score for instance $i$.\n\nThe area under the parametric curve $\\text{AUC} = \\int_0^1 \\text{TPR}(\\text{FPR}) d\\text{FPR}$ is mathematically equivalent to the normalized Mann-Whitney rank sum:\n\n$$\n\\text{AUC} = \\mathbb{P}\\left(\\hat{s}_i > \\hat{s}_j \\mid y_i = 1, y_j = 0\\right) = \\frac{1}{n_+ n_-} \\sum_{i: y_i = 1} \\sum_{j: y_j = 0} \\left[ \\mathbb{I}(\\hat{s}_i > \\hat{s}_j) + \\frac{1}{2} \\mathbb{I}(\\hat{s}_i = \\hat{s}_j) \\right]\n$$\n\n#### Key Invariants:\n- $\\text{AUC} = 0.5$: Baseline performance of pure random guessing (the diagonal line).\n- $\\text{AUC} = 1.0$: Perfect discrimination; the minimum positive score strictly exceeds the maximum negative score.\n- $\\text{AUC} < 0.5$: Systematic inversion; flipping the predicted labels yields an AUC of $1 - \\text{AUC}$.",
          "ar": "يمنحنا هذا التطابق الرياضي القدرة على حساب AUC عبر مقارنة أزواج العينات ورتبها الترتيبية (Rank-Sum) دون الحاجة إلى تكاملات عددية معقدة. فإذا اختير مريض ومريض سليم عشوائياً، يعبر AUC عن فرصة تفوق درجة خطورة المريض الحقيقي على السليم."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-roc-auc-confusion-matrix",
          "starterCode": "def compute_roc_auc_score(y_true: np.ndarray, y_score: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes exact ROC-AUC via Wilcoxon-Mann-Whitney rank pairs and confusion metrics at tau=0.5.\n    \n    Parameters\n    ----------\n    y_true : np.ndarray of shape (N,)\n        Binary ground truth labels in {0, 1}.\n    y_score : np.ndarray of shape (N,)\n        Continuous predicted probability/risk scores in [0, 1].\n        \n    Returns\n    -------\n    dict with keys:\n        'auc': Area Under the ROC Curve via Wilcoxon-Mann-Whitney formulation.\n        'precision': Precision at threshold 0.5.\n        'recall': Recall at threshold 0.5.\n        'f1': F1-score at threshold 0.5.\n    \"\"\"\n    # 1. Wilcoxon-Mann-Whitney AUC via pairwise comparisons\n    # Broadcasting: compare each positive score against each negative score\n    # 2. Confusion matrix at tau = 0.5\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_roc_auc_score(y_true: np.ndarray, y_score: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes exact ROC-AUC via Wilcoxon-Mann-Whitney rank pairs and confusion metrics at tau=0.5.\n    \n    Parameters\n    ----------\n    y_true : np.ndarray of shape (N,)\n        Binary ground truth labels in {0, 1}.\n    y_score : np.ndarray of shape (N,)\n        Continuous predicted probability/risk scores in [0, 1].\n        \n    Returns\n    -------\n    dict with keys:\n        'auc': Area Under the ROC Curve via Wilcoxon-Mann-Whitney formulation.\n        'precision': Precision at threshold 0.5.\n        'recall': Recall at threshold 0.5.\n        'f1': F1-score at threshold 0.5.\n    \"\"\"\n    # 1. Wilcoxon-Mann-Whitney AUC via pairwise comparisons\n    # Broadcasting: compare each positive score against each negative score\n    # 2. Confusion matrix at tau = 0.5\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.00, 1.00"
            }
          },
          "solution": "import numpy as np\n\ndef compute_roc_auc_score(y_true: np.ndarray, y_score: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes exact ROC-AUC via Wilcoxon-Mann-Whitney rank pairs and confusion metrics at tau=0.5.\n    \n    Parameters\n    ----------\n    y_true : np.ndarray of shape (N,)\n        Binary ground truth labels in {0, 1}.\n    y_score : np.ndarray of shape (N,)\n        Continuous predicted probability/risk scores in [0, 1].\n        \n    Returns\n    -------\n    dict with keys:\n        'auc': Area Under the ROC Curve via Wilcoxon-Mann-Whitney formulation.\n        'precision': Precision at threshold 0.5.\n        'recall': Recall at threshold 0.5.\n        'f1': F1-score at threshold 0.5.\n    \"\"\"\n    pos_scores = y_score[y_true == 1]\n    neg_scores = y_score[y_true == 0]\n    n_pos = len(pos_scores)\n    n_neg = len(neg_scores)\n    \n    # 1. Wilcoxon-Mann-Whitney AUC via pairwise comparisons\n    # Broadcasting: compare each positive score against each negative score\n    concordant = np.sum(pos_scores[:, None] > neg_scores[None, :])\n    ties = np.sum(pos_scores[:, None] == neg_scores[None, :])\n    auc = float((concordant + 0.5 * ties) / (n_pos * n_neg))\n    \n    # 2. Confusion matrix at tau = 0.5\n    y_pred = (y_score >= 0.5).astype(int)\n    tp = float(np.sum((y_true == 1) & (y_pred == 1)))\n    fp = float(np.sum((y_true == 0) & (y_pred == 1)))\n    fn = float(np.sum((y_true == 1) & (y_pred == 0)))\n    \n    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0\n    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0\n    f1 = (2.0 * precision * recall / (precision + recall)) if (precision + recall) > 0 else 0.0\n    \n    return {\n        \"auc\": auc,\n        \"precision\": precision,\n        \"recall\": recall,\n        \"f1\": f1\n    }"
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
                "en": "The ROC curve plots FPR on the x-axis, whose denominator is the massive pool of True Negatives ($9,999,000$). Even a tiny FPR of $0.5\\%$ generates $\\approx 50,000$ False Positives. Because Precision evaluates False Positives against the tiny pool of True Positives, the Precision drops below $2\\%$. The engineering team should evaluate the model using the Precision-Recall Curve (PR-AUC) rather than ROC-AUC.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because the Wilcoxon-Mann-Whitney test is only mathematically valid when sample sizes are smaller than 100.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The ROC-AUC was computed using natural logarithms rather than base-2 binary logarithms.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because True Positives and False Positives cancel each other out in the Sigmoid derivative.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "knn-classification",
    "title": "K-Nearest Neighbors (KNN), Metric Spaces & Non-Parametric Boundaries",
    "titleAr": "الجيران الأقرب (KNN) وفضاءات المسافة والحدود غير المعلمية",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Parametric models like OLS and Logistic Regression begin by imposing a rigid functional form: they decree that the relationship between...",
      "ar": "تبدأ النماذج المعلمية (Parametric Models) كالانحدار الخطي واللوجستي بفرض قيود وظيفية صارمة على طبيعة العلاقات: حيث تفترض أن العلاقة عبارة..."
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
          "en": "Parametric models like OLS and Logistic Regression begin by imposing a rigid functional form: they decree that the relationship between inputs and outputs must be a straight line or an S-curve. If the true data-generating boundary is a complex winding maze or concentric spirals, parametric models suffer from incurable specification bias.\n\nThe **K-Nearest Neighbors (KNN)** algorithm embodies pure non-parametric simplicity: it assumes nothing about functional forms, probability densities, or coefficients. It operates on the intuitive folk adage: *\"Birds of a feather flock together.\"* To predict the class of an unknown query point, the algorithm measures distances across feature space, identifies the $k$ closest training points, and takes a democratic majority vote among those neighbors.\n\nThe hyperparameter $k$ acts as an exact physical dial controlling the **Bias-Variance tradeoff**:\n- When $k=1$, the model has zero bias on the training data. It partitions space into a **Voronoi tessellation**, where each training point rules its own kingdom. However, variance is extreme: a single mislabeled outlier creates an isolated island of error that distorts nearby test queries.\n- As $k \\to N$, the neighborhood expands to include the entire dataset. Local nuances dissolve, variance drops to zero, and the model simply predicts the global majority class everywhere (extreme bias).",
          "ar": "تبدأ النماذج المعلمية (Parametric Models) كالانحدار الخطي واللوجستي بفرض قيود وظيفية صارمة على طبيعة العلاقات: حيث تفترض أن العلاقة عبارة عن خط مستقيم أو منحنى لوجستي. وإذا كانت الحدود الحقيقية بين الفئات معقدة أو ملتفة أو ذات أشكال دائرية متداخلة، تفشل هذه النماذج بسبب انحياز التوصيف.\n\nتجسد خوارزمية **الجيران الأقرب (K-Nearest Neighbors - KNN)** البساطة اللامعلمية المطلقة؛ فهي لا تفترض أي معادلة رياضية مسبقة ولا تحسب أي معاملات. بل تعتمد على الفطرة الإنسانية البديهية: \"المرء على دين خليله\". لتصنيف أي نقطة مجهولة، تقيس الخوارزمية المسافات في فضاء المتغيرات، وتبحث عن أقرب $k$ جيران لها في فضاء التدريب، ثم تجري تصويتاً ديمقراطياً بالأغلبية لتحديد الفئة الفائزة.\n\nيعمل المعامل الفائق $k$ كـ **مفتاح تحكم مباشر في معضلة الانحياز والتباين (Bias-Variance Tradeoff)**:\n- عندما يكون $k=1$، ينعدم الانحياز على بيانات التدريب تماماً، وينقسم الفضاء إلى خلايا فورونوي (Voronoi Cells) تحكم فيها كل نقطة نطاقها الجغرافي. لكن التباين ينفجر لأن نقطة واحدة شاذة تصنع جزيرة معزولة من الخطأ.\n- ومع زيادة $k$ ليقترب من حجم العينة الإجمالي $N$، تتلاشى الحساسية المحلية تماماً، ويهبط التباين إلى الصفر، ويتنبأ النموذج بالأغلبية العامة للبيانات في كل مكان (انحياز هائل)."
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
          "en": "Special cases include the Manhattan metric ($p=1$) and the Euclidean metric ($p=2$).\n\n#### Decision Rule & Majority Voting\nLet $\\mathcal{N}_k(\\mathbf{x}) \\subset \\{1, \\dots, N\\}$ denote the index set of the $k$ training points minimizing $d(\\mathbf{x}, \\mathbf{x}_i)$.\n\nThe posterior probability for class $c \\in \\{1, \\dots, C\\}$ is computed as the local sample proportion:\n\n$$\n\\hat{\\mathbb{P}}(Y = c \\mid \\mathbf{x}) = \\frac{1}{k} \\sum_{i \\in \\mathcal{N}_k(\\mathbf{x})} \\mathbb{I}(y_i = c)\n$$\n\nThe query is assigned to the class maximizing this probability:\n\n$$\n\\hat{y}(\\mathbf{x}) = \\arg\\max_{c} \\hat{\\mathbb{P}}(Y = c \\mid \\mathbf{x})\n$$\n\n#### Complexity & Effective Degrees of Freedom\nUnlike parametric models with $P$ fixed parameters, KNN has an effective number of parameters approximately equal to:\n\n$$\n\\text{df} \\approx \\frac{N}{k}\n$$\n\n#### The Cover-Hart Theorem (1967)\nAs sample size $N \\to \\infty$, the asymptotic test error rate of the 1-Nearest Neighbor classifier $R_{1\\text{-NN}}$ is bounded by at most twice the optimal Bayes error rate $R^*$:\n\n$$\nR^* \\le R_{1\\text{-NN}} \\le 2 R^* (1 - R^*) \\le 2 R^*\n$$\n\nThis remarkable theoretical result guarantees that even without estimating parameters, an infinite-sample 1-NN classifier captures at least half of the total predictive information available in the universe!",
          "ar": "يؤكد برهان كوفر وهارت (Cover-Hart 1967) أنه مع كبر حجم العينة إلى ما لا نهاية، فإن خطأ مصنف الجار الأقرب الفردي لا يتجاوز ضعف خطأ بايز النظري الأمثل. وبذلك يضمن النموذج قوة تمييزية هائلة دون الحاجة لأي افتراضات شكلية مسبقة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-knn-classification",
          "starterCode": "def knn_predict(\n    X_train: np.ndarray,\n    y_train: np.ndarray,\n    X_test: np.ndarray,\n    k: int = 3\n) -> np.ndarray:\n    \"\"\"\n    Predicts class labels for query points using vectorized K-Nearest Neighbors.\n    \n    Parameters\n    ----------\n    X_train : np.ndarray of shape (N_train, D)\n        Training feature coordinates.\n    y_train : np.ndarray of shape (N_train,)\n        Integer class labels for training points.\n    X_test : np.ndarray of shape (N_test, D)\n        Query feature coordinates.\n    k : int\n        Number of nearest neighbors to query.\n        \n    Returns\n    -------\n    np.ndarray of shape (N_test,)\n        Predicted discrete class labels.\n    \"\"\"\n    # 1. Vectorized pairwise squared Euclidean distances:\n    # ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z\n    # 2. Identify indices of k smallest distances per query row\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def knn_predict(\n    X_train: np.ndarray,\n    y_train: np.ndarray,\n    X_test: np.ndarray,\n    k: int = 3\n) -> np.ndarray:\n    \"\"\"\n    Predicts class labels for query points using vectorized K-Nearest Neighbors.\n    \n    Parameters\n    ----------\n    X_train : np.ndarray of shape (N_train, D)\n        Training feature coordinates.\n    y_train : np.ndarray of shape (N_train,)\n        Integer class labels for training points.\n    X_test : np.ndarray of shape (N_test, D)\n        Query feature coordinates.\n    k : int\n        Number of nearest neighbors to query.\n        \n    Returns\n    -------\n    np.ndarray of shape (N_test,)\n        Predicted discrete class labels.\n    \"\"\"\n    # 1. Vectorized pairwise squared Euclidean distances:\n    # ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z\n    # 2. Identify indices of k smallest distances per query row\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0, 1"
            }
          },
          "solution": "import numpy as np\n\ndef knn_predict(\n    X_train: np.ndarray,\n    y_train: np.ndarray,\n    X_test: np.ndarray,\n    k: int = 3\n) -> np.ndarray:\n    \"\"\"\n    Predicts class labels for query points using vectorized K-Nearest Neighbors.\n    \n    Parameters\n    ----------\n    X_train : np.ndarray of shape (N_train, D)\n        Training feature coordinates.\n    y_train : np.ndarray of shape (N_train,)\n        Integer class labels for training points.\n    X_test : np.ndarray of shape (N_test, D)\n        Query feature coordinates.\n    k : int\n        Number of nearest neighbors to query.\n        \n    Returns\n    -------\n    np.ndarray of shape (N_test,)\n        Predicted discrete class labels.\n    \"\"\"\n    # 1. Vectorized pairwise squared Euclidean distances:\n    # ||x - z||^2 = ||x||^2 + ||z||^2 - 2 * x^T z\n    test_sq = np.sum(X_test ** 2, axis=1, keepdims=True)     # (N_test, 1)\n    train_sq = np.sum(X_train ** 2, axis=1, keepdims=True).T  # (1, N_train)\n    cross_term = 2.0 * (X_test @ X_train.T)                   # (N_test, N_train)\n    dist_matrix = test_sq + train_sq - cross_term\n    \n    # 2. Identify indices of k smallest distances per query row\n    k_nearest_indices = np.argpartition(dist_matrix, kth=k - 1, axis=1)[:, :k]\n    \n    # 3. Retrieve labels of nearest neighbors and perform majority vote\n    neighbor_labels = y_train[k_nearest_indices] # shape (N_test, k)\n    \n    predictions = []\n    for row in neighbor_labels:\n        # Compute mode (most frequent label)\n        values, counts = np.unique(row, return_counts=True)\n        majority_label = values[np.argmax(counts)]\n        predictions.append(majority_label)\n        \n    return np.array(predictions, dtype=int)"
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
            "en": "What fundamental geometric flaw explains this breakdown, and how should it be corrected?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الجيران الأقرب (KNN) وفضاءات المسافة والحدود غير المعلمية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Distance metrics in KNN are scale-dependent. Because square footage numbers are in the thousands while bathroom counts are in single digits, distance differences along the square footage axis ($\\Delta \\approx 100^2 = 10,000$) completely dwarf bathroom differences ($\\Delta \\approx 3^2 = 9$), rendering the bathroom feature geometrically invisible. All features must be standardized (e.g., via z-score normalization or MinMax scaling) prior to computing neighbors.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Increasing $k$ from 5 to 50 will naturally rescale the bathrooms to match square feet.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Euclidean distance is only defined for integer variables; bathrooms should be rounded to the nearest integer.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "KNN cannot handle more than one feature without violating the Gauss-Markov theorem.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "curse-of-dimensionality-metric-trees",
    "title": "The Curse of Dimensionality & Metric Trees (KD-Trees)",
    "titleAr": "لعنة الأبعاد وأشجار المسافات المكانية (KD-Trees)",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Human intuition is forged in three physical dimensions. When machine learning practitioners venture into hundreds or thousands of...",
      "ar": "تشكلت الحواس البشرية للتعامل مع ثلاثة أبعاد مكانية فقط. وعندما يتعامل مهندسو تعلم الآلة مع مئات أو آلاف الأبعاد (تضمينات النصوص، بكسلات..."
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
          "en": "Human intuition is forged in three physical dimensions. When machine learning practitioners venture into hundreds or thousands of dimensions (images, audio spectrograms, transformer embeddings, genomics), geometric reality mutates in astonishing ways. Richard Bellman coined the term **The Curse of Dimensionality** to describe the exponential sparsity that poisons high-dimensional space.\n\nConsider trying to capture just $10\\%$ of the volume of a unit hypercube:\n- In $1\\text{D}$, your neighborhood interval needs a length of $0.10$ ($10\\%$ of the axis).\n- In $2\\text{D}$, your neighborhood square needs a side length of $\\sqrt{0.10} \\approx 0.32$.\n- In $100\\text{D}$, to capture just $10\\%$ of the hypercube's volume, your sub-cube must span $(0.10)^{1/100} \\approx 0.977$ along **every single coordinate axis**!\n\nIn high dimensions, **local neighborhoods cease to exist**. All data points retreat to the outermost crust and corners of the space. Furthermore, all pairwise distances concentrate: the distance to a query point's nearest neighbor becomes virtually indistinguishable from the distance to its farthest neighbor. Spatial data structures like **KD-Trees** partition space with axis-aligned hyperplanes to achieve $O(\\log N)$ nearest-neighbor queries in low dimensions, but they inexorably degrade to brute-force $O(N)$ scans as dimensions explode.",
          "ar": "تشكلت الحواس البشرية للتعامل مع ثلاثة أبعاد مكانية فقط. وعندما يتعامل مهندسو تعلم الآلة مع مئات أو آلاف الأبعاد (تضمينات النصوص، بكسلات الصور، المؤشرات الجينية)، تتغير الخصائص الهندسية للفضاء بشكل صادم. صاغ عالم الرياضيات ريتشارد بيلمان مصطلح **\"لعنة الأبعاد\" (Curse of Dimensionality)** لوصف الفراغ الهائل الذي يصيب الفضاءات الشاهقة.\n\nتأمل محاولة احتواء $10\\%$ فقط من حجم مكعب فائق ذي حجم واحد:\n- في بعد واحد ($1\\text{D}$)، تحتاج نافذتك إلى طول $0.10$ ($10\\%$ من طول الخط).\n- في بعدين ($2\\text{D}$)، يحتاج مربعك إلى ضلع بطول $\\sqrt{0.10} \\approx 0.32$.\n- في مئة بعد ($100\\text{D}$)، لاحتواء $10\\%$ فقط من الحجم، يجب أن يمتد مكعبك بطول $(0.10)^{1/100} \\approx 0.977$ عبر **كل محور إحداثي بمفرده**!\n\nفي الأبعاد العالية، **تتلاشى فكرة \"الجوار الموضعي\" تماماً**؛ حيث تهاجر جميع النقاط نحو القشرة الخارجية وأطراف الفضاء. وتتطابق المسافة بين أقرب جار وأبعد جار تقريباً. تنجح هياكل البيانات مثل **أشجار KD-Trees** في تقسيم الفضاء بمستويات متعامدة للبحث في زمن $O(\\log N)$ في الأبعاد الدنيا، لكنها تنهار حتماً إلى فحص بطيء $O(N)$ مع تضخم الأبعاد."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "V_d(r) = \\frac{\\pi^{d/2}}{\\Gamma\\left(\\frac{d}{2} + 1\\right)} r^d, \\quad C_d(2r) = (2r)^d",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for The Curse of Dimensionality & Metric Trees (KD-Trees).",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ لعنة الأبعاد وأشجار المسافات المكانية (KD-Trees)."
        },
        "narrative": {
          "en": "The ratio of the inscribed sphere's volume to the enclosing cube's volume vanishes exponentially to zero:\n\n$$\n\\lim_{d \\to \\infty} \\frac{V_d(r)}{C_d(2r)} = \\lim_{d \\to \\infty} \\frac{\\pi^{d/2}}{2^d \\Gamma\\left(\\frac{d}{2} + 1\\right)} = 0\n$$\n\nAlmost $100\\%$ of the hypercube's volume resides in its spiky outer corners.\n\n#### Distance Concentration Phenomenon (Beyer et al. 1999)\nUnder broad i.i.d. distributional assumptions, as dimension $d \\to \\infty$, the relative contrast between the maximum distance $D_{\\max}$ and minimum distance $D_{\\min}$ from any query point to the rest of the dataset converges to zero in probability:\n\n$$\n\\lim_{d \\to \\infty} \\frac{D_{\\max} - D_{\\min}}{D_{\\min}} = 0\n$$\n\nWhen all points are equidistant, nearest-neighbor discrimination becomes ill-defined and sensitive to arbitrary noise.\n\n#### KD-Tree Mechanics & Dimensional Collapse\nA KD-Tree recursively partitions $D$-dimensional space:\n1. Select splitting axis: $j = \\text{depth} \\pmod D$.\n2. Choose splitting threshold: $s = \\text{median}(\\{x_{i, j}\\})$.\n3. Partition points into left child ($x_{i, j} \\le s$) and right child ($x_{i, j} > s$).\n\nIn low dimensions ($D \\le 15$), pruning branches whose bounding boxes do not intersect the query ball achieves $O(D \\log N)$ search time. However, when $D \\gg \\log N$, the query sphere intersects virtually every bounding hyperplane, forcing the algorithm to backtrack through all $2^D$ sub-trees and collapsing complexity back to brute-force $O(D \\cdot N)$.",
          "ar": "ينهار البحث الشجري في الأبعاد الشاهقة لأن كرة البحث تتقاطع مع جميع مستويات التقسيم المكانية، مما يجبر الخوارزمية على فحص جميع الفروع وتراجع أدائها إلى البحث الشامل التقليدي مع تكلفة إضافية لتصفح الشجرة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-curse-of-dimensionality-metric-trees",
          "starterCode": "def compute_distance_contrast(X: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes pairwise Euclidean distance metrics demonstrating the curse of dimensionality.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Dataset matrix with N samples in D dimensions.\n        \n    Returns\n    -------\n    dict with keys:\n        'd_min': Minimum non-zero pairwise Euclidean distance.\n        'd_max': Maximum pairwise Euclidean distance.\n        'relative_contrast': Relative distance contrast (d_max - d_min) / d_min.\n    \"\"\"\n    # 1. Vectorized pairwise squared Euclidean distances: ||x - z||^2\n    # Correct small negative numerical values\n    # 2. Mask the diagonal (distance from a point to itself is 0)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_distance_contrast(X: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes pairwise Euclidean distance metrics demonstrating the curse of dimensionality.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Dataset matrix with N samples in D dimensions.\n        \n    Returns\n    -------\n    dict with keys:\n        'd_min': Minimum non-zero pairwise Euclidean distance.\n        'd_max': Maximum pairwise Euclidean distance.\n        'relative_contrast': Relative distance contrast (d_max - d_min) / d_min.\n    \"\"\"\n    # 1. Vectorized pairwise squared Euclidean distances: ||x - z||^2\n    # Correct small negative numerical values\n    # 2. Mask the diagonal (distance from a point to itself is 0)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef compute_distance_contrast(X: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes pairwise Euclidean distance metrics demonstrating the curse of dimensionality.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Dataset matrix with N samples in D dimensions.\n        \n    Returns\n    -------\n    dict with keys:\n        'd_min': Minimum non-zero pairwise Euclidean distance.\n        'd_max': Maximum pairwise Euclidean distance.\n        'relative_contrast': Relative distance contrast (d_max - d_min) / d_min.\n    \"\"\"\n    N, D = X.shape\n    \n    # 1. Vectorized pairwise squared Euclidean distances: ||x - z||^2\n    dots = X @ X.T\n    sq_norms = np.diag(dots)\n    dist_matrix_sq = sq_norms[:, None] + sq_norms[None, :] - 2.0 * dots\n    # Correct small negative numerical values\n    dist_matrix_sq = np.maximum(dist_matrix_sq, 0.0)\n    dist_matrix = np.sqrt(dist_matrix_sq)\n    \n    # 2. Mask the diagonal (distance from a point to itself is 0)\n    np.fill_diagonal(dist_matrix, np.nan)\n    \n    # 3. Extract min and max distances\n    d_min = float(np.nanmin(dist_matrix))\n    d_max = float(np.nanmax(dist_matrix))\n    relative_contrast = (d_max - d_min) / d_min if d_min > 0 else 0.0\n    \n    return {\n        \"d_min\": d_min,\n        \"d_max\": d_max,\n        \"relative_contrast\": float(relative_contrast)\n    }"
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
            "en": "Why does the KD-Tree fail so dramatically on high-dimensional text embeddings?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ لعنة الأبعاد وأشجار المسافات المكانية (KD-Trees) تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "In $D = 1536$ dimensions, the query hypersphere intersects almost all axis-aligned bounding hyperplanes simultaneously. The KD-Tree is forced to backtrack through virtually every branch in the tree, visiting nearly all $N$ leaves while adding the computational overhead of recursive pointer chasing. Exact metric trees are mathematically ineffective for $D \\gg 20$; the team should switch to Approximate Nearest Neighbor (ANN) graphs such as HNSW or inverted file indexes (IVF-PQ).",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Text embeddings have negative values, which are prohibited by the Pythagorean metric.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The KD-Tree algorithm only works when $N$ is a strict prime number.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because GPU memory cannot perform Euclidean vector addition.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "decision-trees",
    "title": "Decision Trees (CART), Impurity Measures & Cost-Complexity Pruning",
    "titleAr": "أشجار القرار (CART) ومقاييس اللايقين والتقليم بتكلفة التعقيد",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Linear models force the real world into an artificial straightjacket of additive relationships: they assume each feature adds or subtracts...",
      "ar": "تفرض النماذج الخطية قيوداً قسرية على العالم الحقيقي؛ بافتراضها أن كل متغير يسهم بشكل منفصل ومستقل في النتيجة."
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
          "en": "Linear models force the real world into an artificial straightjacket of additive relationships: they assume each feature adds or subtracts independently from the target. In reality, human decisions, biological pathways, and economic markets are profoundly non-linear and interaction-driven: a symptom might be dangerous *only if* the patient is elderly *and* diabetic.\n\nA **Decision Tree** (Classification and Regression Tree - CART) approaches the problem like an expert player of **\"20 Questions\"**. At each stage, the algorithm scans across every available feature and every candidate numerical threshold, searching for the single binary question (e.g., *\"Is systolic blood pressure > 140?\"*) that partitions the mixed pool of data into two child groups that are as pure and unmixed as possible.\n\nLeft unrestrained, a decision tree will continue splitting until every single training sample occupies its own private leaf node—achieving $100\\%$ training accuracy by memorizing sample noise. To prevent catastrophic overfitting, **Cost-Complexity Pruning** introduces an $L_1$-style complexity penalty $\\alpha |\\tilde{\\mathcal{T}}|$ on the number of leaves, mathematically snipping away weak branches whose impurity reduction fails to justify their structural complexity.",
          "ar": "تفرض النماذج الخطية قيوداً قسرية على العالم الحقيقي؛ بافتراضها أن كل متغير يسهم بشكل منفصل ومستقل في النتيجة. لكن في الواقع الملموس، تتسم الأنظمة البيولوجية والاقتصادية بالتفاعلات الشرطية المعقدة: فقد يكون العَرَض المرضي خطيراً *فقط إذا* كان المريض متقدماً في السن *و* مصاباً بالسكري معاً.\n\nتتعامل **شجرة القرار (CART)** مع البيانات كلعبة **\"20 سؤالاً\"** ذكية. في كل مرحلة، تفحص الخوارزمية جميع المتغيرات وكل العتبات الرقمية الممكنة، باحثة عن السؤال الثنائي الحاسم (مثل: *\"هل ضغط الدم > 140؟\"*) الذي يقسم العينة المختلطة إلى مجموعتين فرعيتين بأعلى درجة ممكنة من الصفاء والنقاء (Impurity Reduction).\n\nوإذا تُركت الشجرة تنمو دون قيود، ستستمر في التفرع حتى تصبح كل نقطة تدريب معزولة في ورقة نهائية خاصة بها—لتحقق دقة تدريب $100\\%$ عبر حفظ الضجيج العشوائي. ولمنع فرط التخصيص (Overfitting)، يطبق **تقليم التكلفة والتعقيد (Cost-Complexity Pruning)** جزاءً تنظيمياً $\\alpha |\\tilde{\\mathcal{T}}|$ على عدد الأوراق، ليقص الفروع الهشة التي لا يقدم نقاؤها إضافة حقيقية تبرر تعقيدها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "I_G(m) = 1 - \\sum_{k=1}^K p_{mk}^2 = \\sum_{k=1}^K p_{mk}(1 - p_{mk})",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Decision Trees (CART), Impurity Measures & Cost-Complexity Pruning.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ أشجار القرار (CART) ومقاييس اللايقين والتقليم بتكلفة التعقيد."
        },
        "narrative": {
          "en": "2. **Cross-Entropy (Information Entropy in Bits):**\n   $$H(m) = -\\sum_{k=1}^K p_{mk} \\log_2 p_{mk}$$\n\nFor binary classification ($p, 1-p$), both functions peak at maximum uncertainty ($p = 0.5$) and reach zero at pure consensus ($p \\in \\{0, 1\\}$).\n\n#### Best Split Criterion\nCART searches greedily over feature index $j$ and split threshold $s$ to maximize the **Impurity Reduction (Information Gain)**:\n\n$$\n\\Delta I(m, j, s) = I(m) - \\left( \\frac{N_L}{N_m} I(L) + \\frac{N_R}{N_m} I(R) \\right)\n$$\n\nwhere $S_L = \\{i \\in S_m : x_{ij} \\le s\\}$ and $S_R = \\{i \\in S_m : x_{ij} > s\\}$.\n\n#### Cost-Complexity Pruning (Breiman et al. 1984)\nLet $\\mathcal{T} \\subset \\mathcal{T}_{\\max}$ denote a pruned sub-tree with terminal leaf set $\\tilde{\\mathcal{T}}$. The cost-complexity criterion balances total training impurity against tree size:\n\n$$\n\\mathcal{R}_\\alpha(\\mathcal{T}) = \\sum_{m \\in \\tilde{\\mathcal{T}}} N_m I(m) + \\alpha |\\tilde{\\mathcal{T}}|\n$$\n\nwhere $\\alpha \\ge 0$ is the regularization parameter governing the penalty per additional leaf. For each internal node, the effective threshold $\\alpha_{\\text{eff}} = \\frac{R(t) - R(\\mathcal{T}_t)}{|\\tilde{\\mathcal{T}}_t| - 1}$ dictates the exact order in which weak subtrees are pruned.",
          "ar": "يُعد معيار تقليم التكلفة والتعقيد $\\mathcal{R}_\\alpha(\\mathcal{T})$ المعادل الشجري لتنظيم لاسو؛ حيث يفرض تكلفة عددية $\\alpha$ على كل ورقة إضافية، مما يجبر الشجرة على التخلص من التفرعات الهامشية التي تحفظ ضجيج العينة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-decision-trees",
          "starterCode": "def find_best_split_gini(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Finds the optimal feature and threshold maximizing Gini impurity reduction.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Feature matrix.\n    y : np.ndarray of shape (N,)\n        Discrete integer class labels.\n        \n    Returns\n    -------\n    dict with keys:\n        'best_feature': Index of feature giving best split.\n        'best_threshold': Numerical threshold giving best split.\n        'best_gain': Maximum Gini impurity reduction achieved.\n    \"\"\"\n    # Unique sorted values as potential split points\n    # Candidate thresholds are midpoints between adjacent sorted values\n    # Weighted child impurity\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def find_best_split_gini(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Finds the optimal feature and threshold maximizing Gini impurity reduction.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Feature matrix.\n    y : np.ndarray of shape (N,)\n        Discrete integer class labels.\n        \n    Returns\n    -------\n    dict with keys:\n        'best_feature': Index of feature giving best split.\n        'best_threshold': Numerical threshold giving best split.\n        'best_gain': Maximum Gini impurity reduction achieved.\n    \"\"\"\n    # Unique sorted values as potential split points\n    # Candidate thresholds are midpoints between adjacent sorted values\n    # Weighted child impurity\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "0, 3.5, 0.50"
            }
          },
          "solution": "import numpy as np\n\ndef find_best_split_gini(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Finds the optimal feature and threshold maximizing Gini impurity reduction.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Feature matrix.\n    y : np.ndarray of shape (N,)\n        Discrete integer class labels.\n        \n    Returns\n    -------\n    dict with keys:\n        'best_feature': Index of feature giving best split.\n        'best_threshold': Numerical threshold giving best split.\n        'best_gain': Maximum Gini impurity reduction achieved.\n    \"\"\"\n    N, P = X.shape\n    \n    def gini(labels: np.ndarray) -> float:\n        if len(labels) == 0:\n            return 0.0\n        _, counts = np.unique(labels, return_counts=True)\n        probs = counts / len(labels)\n        return float(1.0 - np.sum(probs ** 2))\n\n    parent_gini = gini(y)\n    best_gain = -1.0\n    best_feature = -1\n    best_threshold = 0.0\n    \n    for j in range(P):\n        # Unique sorted values as potential split points\n        vals = np.unique(X[:, j])\n        if len(vals) <= 1:\n            continue\n        # Candidate thresholds are midpoints between adjacent sorted values\n        thresholds = (vals[:-1] + vals[1:]) / 2.0\n        \n        for thresh in thresholds:\n            left_mask = X[:, j] <= thresh\n            right_mask = ~left_mask\n            \n            y_left = y[left_mask]\n            y_right = y[right_mask]\n            \n            if len(y_left) == 0 or len(y_right) == 0:\n                continue\n                \n            left_gini = gini(y_left)\n            right_gini = gini(y_right)\n            \n            # Weighted child impurity\n            weighted_impurity = (len(y_left) / N) * left_gini + (len(y_right) / N) * right_gini\n            gain = parent_gini - weighted_impurity\n            \n            if gain > best_gain:\n                best_gain = gain\n                best_feature = j\n                best_threshold = float(thresh)\n                \n    return {\n        \"best_feature\": best_feature,\n        \"best_threshold\": best_threshold,\n        \"best_gain\": float(best_gain)\n    }"
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
            "en": "Which combination of hyperparameter adjustments will most directly impose mathematical regularization to curb this variance explosion?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ أشجار القرار (CART) ومقاييس اللايقين والتقليم بتكلفة التعقيد تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Enforcing a strict `max_depth` (e.g., 5–8), increasing `min_samples_leaf` (e.g., to $\\ge 50$), and tuning cost-complexity pruning `ccp_alpha` via cross-validation to snip off leaves that do not provide statistically significant impurity reduction.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Switching from the Gini impurity metric to Cross-Entropy, because logarithms automatically eliminate variance.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Increasing the number of features by generating all pairwise polynomial interactions.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Standardizing all categorical variables with standard z-score normalization.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "random-forests-bagging",
    "title": "Random Forests, Bagging & Feature Subspace Sampling",
    "titleAr": "الغابات العشوائية وتقنية التجميع وتعيين الفضاء الجزئي للمتغيرات",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "While a single decision tree provides beautiful interpretability, it suffers from notorious instability: trees have notoriously high...",
      "ar": "رغم وضوح وسهولة تفسير شجرة القرار الفردية، إلا أنها تعاني من عيب هيكلي قاتل: وهو التباين المفرط (High Variance)."
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
          "en": "While a single decision tree provides beautiful interpretability, it suffers from notorious instability: trees have notoriously high variance. A microscopic perturbation in the training dataset can alter the root split, cascading completely different decisions down every subsequent branch.\n\nLeo Breiman (2001) revolutionized ensemble learning with the **Random Forest**. If an individual decision tree is like consulting a single eccentric, hyper-sensitive doctor who might overreact to every minor symptom, a Random Forest is like convening **a council of 500 independent physicians who cast a majority vote on the diagnosis**.\n\nRandom Forests achieve this through two layers of stochastic randomization:\n1. **Bagging (Bootstrap Aggregating):** Each tree is trained on a distinct bootstrap sample (drawn with replacement from the training set).\n2. **Random Subspace Sampling:** Breiman's profound mathematical insight: if one dominant feature (e.g., tumor diameter) is overwhelmingly predictive, every single tree in the forest will greedily choose it for the root split, making all 500 trees heavily correlated! By forcing each node to choose its split from a random subset of $m \\approx \\sqrt{p}$ features, Random Forests break this correlation. Because the trees are decorrelated, their individual idiosyncratic errors cancel out when averaged!",
          "ar": "رغم وضوح وسهولة تفسير شجرة القرار الفردية، إلا أنها تعاني من عيب هيكلي قاتل: وهو التباين المفرط (High Variance). فأي تغير مجهري في عينة التدريب قد يقلب التفرع الجذري رأساً على عقب، مما يغير هندسة الشجرة بأكملها ويؤدي إلى تنبؤات متناقضة.\n\nأحدث ليو بريمان (2001) ثورة في تعلم الآلة بابتكار **الغابات العشوائية (Random Forests)**. إذا كانت شجرة القرار الفردية تشبه استشارة طبيب واحد غريب الأطوار قد يبالغ في تفسير كل عَرَض جانبي طفيف، فإن الغابة العشوائية تشبه **مجلس استشاري يضم 500 طبيب مستقل يصوتون معاً على التشخيص الطبي**.\n\nتحقق الغابات العشوائية هذه الحصانة عبر مستويين من العشوائية الرياضية:\n1. **التجميع بالعينات التمهيدية (Bagging):** تُدرب كل شجرة على عينة سحب مع الإرجاع (Bootstrap Sample).\n2. **التعيين العشوائي للفضاء الجزئي للمتغيرات (Random Subspace Sampling):** إنجاز بريمان العبقري؛ فإذا كان هناك متغير مهيمن واحد (مثل حجم الورم)، ستختاره كل الأشجار لجذرها وتصبح الأشجار الـ 500 متطابقة ومترابطة بشدة. ولمنع هذا، تُجبر الخوارزمية كل عقدة على المفاضلة بين عينة فرعية عشوائية فقط من المتغيرات ($m \\approx \\sqrt{p}$). يؤدي هذا إلى كسر الارتباط بين الأشجار، مما يجعل أخطاءها الفردية تلغي بعضها البعض عند حساب المتوسط!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Var}(\\bar{T}(\\mathbf{x})) = \\rho \\sigma^2 + \\frac{1 - \\rho}{B} \\sigma^2",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Random Forests, Bagging & Feature Subspace Sampling.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ الغابات العشوائية وتقنية التجميع وتعيين الفضاء الجزئي للمتغيرات."
        },
        "narrative": {
          "en": "#### The Asymptotic Variance Floor:\n- As the number of trees $B \\to \\infty$, the second term $\\frac{1 - \\rho}{B}\\sigma^2 \\to 0$.\n- The ensemble variance hits an irreducible floor: $\\lim_{B \\to \\infty} \\text{Var}(\\bar{T}) = \\rho \\sigma^2$.\n\nStandard Bagging reduces variance solely by increasing $B$, but leaves $\\rho$ high. Random Forests use random feature subsampling ($m = \\sqrt{p}$) to drive the correlation parameter $\\rho$ downward toward zero, slashing the asymptotic variance floor!\n\n#### Out-of-Bag (OOB) Generalization Guarantee\nFor a dataset of size $N$, the probability that a specific observation is omitted from a bootstrap sample of size $N$ is:\n\n$$\n\\lim_{N \\to \\infty} \\left( 1 - \\frac{1}{N} \\right)^N = e^{-1} \\approx 0.3679 \\approx 36.8\\%\n$$\n\nEach tree leaves out approximately $36.8\\%$ of the dataset. For each observation $i$, we compute an **Out-of-Bag (OOB) Prediction** by aggregating only the subset of trees that never saw sample $i$ during training:\n\n$$\n\\hat{y}_i^{\\text{OOB}} = \\arg\\max_c \\sum_{b: i \\notin \\mathcal{B}_b} \\mathbb{I}(T_b(\\mathbf{x}_i) = c)\n$$\n\nThe OOB error provides an unbiased estimate of the true generalization test error without needing an explicit cross-validation split!",
          "ar": "تثبت متباينة بريمان أن زيادة عدد الأشجار في الغابة العشوائية لا يمكن أن تؤدي إلى فرط التخصيص (Overfitting)؛ فمع اقتراب $B \\to \\infty$ يستقر الخطأ عند حد ثابت تحكمه درجة الارتباط $\\rho$ وقوة الأشجار الفردية وفق قانون الأعداد الكبيرة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-random-forests-bagging",
          "starterCode": "def simulate_bagging_variance(\n    n_estimators: int,\n    base_variance: float,\n    correlation: float\n) -> float:\n    \"\"\"\n    Computes theoretical ensemble prediction variance according to Breiman's formula:\n    Var(ensemble) = rho * sigma^2 + ((1 - rho) / B) * sigma^2\n    \n    Parameters\n    ----------\n    n_estimators : int\n        Number of trees in ensemble (B).\n    base_variance : float\n        Variance of an individual unpruned tree (sigma^2).\n    correlation : float\n        Pairwise correlation between tree predictions (rho in [0, 1]).\n        \n    Returns\n    -------\n    float\n        Ensemble prediction variance.\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
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
              "starterCode": "def simulate_bagging_variance(\n    n_estimators: int,\n    base_variance: float,\n    correlation: float\n) -> float:\n    \"\"\"\n    Computes theoretical ensemble prediction variance according to Breiman's formula:\n    Var(ensemble) = rho * sigma^2 + ((1 - rho) / B) * sigma^2\n    \n    Parameters\n    ----------\n    n_estimators : int\n        Number of trees in ensemble (B).\n    base_variance : float\n        Variance of an individual unpruned tree (sigma^2).\n    correlation : float\n        Pairwise correlation between tree predictions (rho in [0, 1]).\n        \n    Returns\n    -------\n    float\n        Ensemble prediction variance.\n    \"\"\"\n    # TODO: Implement kernel to pass test cases\n    pass",
              "expectedOutput": "0.208"
            }
          },
          "solution": "import numpy as np\n\ndef simulate_bagging_variance(\n    n_estimators: int,\n    base_variance: float,\n    correlation: float\n) -> float:\n    \"\"\"\n    Computes theoretical ensemble prediction variance according to Breiman's formula:\n    Var(ensemble) = rho * sigma^2 + ((1 - rho) / B) * sigma^2\n    \n    Parameters\n    ----------\n    n_estimators : int\n        Number of trees in ensemble (B).\n    base_variance : float\n        Variance of an individual unpruned tree (sigma^2).\n    correlation : float\n        Pairwise correlation between tree predictions (rho in [0, 1]).\n        \n    Returns\n    -------\n    float\n        Ensemble prediction variance.\n    \"\"\"\n    B = float(n_estimators)\n    rho = float(correlation)\n    sig2 = float(base_variance)\n    \n    ens_variance = rho * sig2 + ((1.0 - rho) / B) * sig2\n    return float(ens_variance)"
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
            "en": "How should the ML engineer respond based on the mathematical principles of Random Forests?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الغابات العشوائية وتقنية التجميع وتعيين الفضاء الجزئي للمتغيرات تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The architect's concern is mathematically unfounded. Unlike individual trees or neural networks, Random Forests cannot overfit by simply adding more trees. By the Strong Law of Large Numbers, as $B \\to \\infty$, the ensemble predictions converge almost surely to an asymptotic limit $\\rho \\sigma^2$. Adding trees strictly reduces variance without increasing model bias.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The concern is valid because each tree adds more degrees of freedom, which inflates the AIC penalty.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Adding trees causes the bootstrap sample to run out of distinct random permutations.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Overfitting only happens if the random seed is an even integer.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "gradient-boosted-trees-xgboost",
    "title": "Gradient Boosted Decision Trees & XGBoost 2nd-Order Expansion",
    "titleAr": "أشجار التدرج المعززة والتقريب من الرتبة الثانية في XGBoost",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Random Forests build an army of deep, independent trees that vote in parallel, Gradient Boosted Decision Trees (GBDT) construct an...",
      "ar": "بينما تبني الغابات العشوائية جيشاً من الأشجار العميقة المستقلة التي تصوت بالتوازي، تعتمد أشجار التدرج المعززة (GBDT) على البناء التتابعي..."
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
          "en": "While Random Forests build an army of deep, independent trees that vote in parallel, **Gradient Boosted Decision Trees (GBDT)** construct an ensemble sequentially through iterative correction.\n\nThink of an apprentice golfer taking shots under the watchful eye of a master instructor:\n- On Shot 1, the apprentice swings and misses the pin, landing 30 yards to the right (the initial error or residual).\n- On Shot 2, the apprentice does not try to hit the ball from the beginning again; instead, they focus strictly on correcting the 30-yard error.\n- On Shot 3, only a 4-yard error remains, which the next tiny corrective tap adjusts.\n\nJerome Friedman (2001) formulated this as Gradient Descent in function space: each subsequent shallow tree fits the negative gradient (the pseudo-residuals) of the loss function.\n\nTianqi Chen and Carlos Guestrin (2016) elevated this into **XGBoost (Extreme Gradient Boosting)**. Instead of using a simple 1st-order gradient step, XGBoost uses a **2nd-order Taylor approximation** that incorporates both the slope ($g_i$, the gradient) and the curvature ($h_i$, the Hessian) of the loss function. Combined with analytical $L_2$ regularization on leaf weights, XGBoost calculates the exact optimal leaf score and split gain in a single closed-form arithmetic step!",
          "ar": "بينما تبني الغابات العشوائية جيشاً من الأشجار العميقة المستقلة التي تصوت بالتوازي، تعتمد **أشجار التدرج المعززة (GBDT)** على البناء التتابعي التراكمي وتصحيح الأخطاء خطوة بخطوة.\n\nتخيل لاعب جولف مبتدئاً يتدرب تحت إشراف مدرب محترف:\n- في الضربة الأولى، يسدد اللاعب الكرة فتخطئ الحفرة بـ 30 متراً إلى اليمين (الخطأ الأولي أو البواقي).\n- في الضربة الثانية، لا يعيد اللاعب التسديد من البداية، بل يركز حصراً على تصحيح خطأ الـ 30 متراً السابق.\n- في الضربة الثالثة، يتبقى خطأ طفيف بمسافة 4 أمتار فقط، فتأتي الشجرة التالية بلمسة دقيقة لتصحيحه.\n\nصاغ جيروم فريدمان (2001) هذه الفكرة كـ \"هبوط تدرجي في فضاء الدوال\"، حيث تُدرب كل شجرة جديدة على بواقي التدرج السالب لدالة الخسارة.\n\nثم أحدث نظام **XGBoost** قفزة نوعية عبر استخدام **تقريب تايلور من الدرجة الثانية**؛ حيث لا يكتفي بميل الخطأ ($g_i$ - التدرج)، بل يستفيد أيضاً من انحناء دالة الخسارة ($h_i$ - الهيسيان) مع تطبيق تنظيم $L_2$ صريح على أوزان الأوراق، مما يتيح حساب الوزن الأمثل لكل ورقة ومكسب التفرع بصيغة مغلقة ومباشرة."
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
          "en": "where the tree complexity penalty is $\\Omega(f) = \\gamma T + \\frac{1}{2}\\lambda \\sum_{j=1}^T w_j^2$, with $T$ being the number of leaves and $w_j$ the leaf weights.\n\n#### The 2nd-Order Taylor Series Approximation\nExpanding the loss function around the previous prediction $\\hat{y}_i^{(t-1)}$:\n\n$$\n\\tilde{\\mathcal{L}}^{(t)} \\approx \\sum_{i=1}^N \\left[ \\ell(y_i, \\hat{y}_i^{(t-1)}) + g_i f_t(\\mathbf{x}_i) + \\frac{1}{2} h_i f_t^2(\\mathbf{x}_i) \\right] + \\gamma T + \\frac{1}{2}\\lambda \\sum_{j=1}^T w_j^2\n$$\n\nwhere the 1st and 2nd derivatives are:\n\n$$\ng_i = \\left. \\frac{\\partial \\ell(y_i, \\hat{y})}{\\partial \\hat{y}} \\right|_{\\hat{y} = \\hat{y}_i^{(t-1)}}, \\quad h_i = \\left. \\frac{\\partial^2 \\ell(y_i, \\hat{y})}{\\partial \\hat{y}^2} \\right|_{\\hat{y} = \\hat{y}_i^{(t-1)}}\n$$\n\n#### Optimal Leaf Weight & Objective Form\nLet $I_j = \\{i : q(\\mathbf{x}_i) = j\\}$ be the instance set mapped to leaf $j$. Define $G_j = \\sum_{i \\in I_j} g_i$ and $H_j = \\sum_{i \\in I_j} h_i$. Setting the derivative with respect to $w_j$ to zero yields the **Optimal Leaf Weight**:\n\n$$\nw_j^* = -\\frac{G_j}{H_j + \\lambda} = -\\frac{\\sum_{i \\in I_j} g_i}{\\sum_{i \\in I_j} h_i + \\lambda}\n$$\n\nSubstituting $w_j^*$ back into the objective yields the minimal achievable loss for a given tree structure:\n\n$$\n\\tilde{\\mathcal{L}}^* = -\\frac{1}{2} \\sum_{j=1}^T \\frac{G_j^2}{H_j + \\lambda} + \\gamma T\n$$\n\n#### The Exact Split Gain Formula\nWhen considering splitting a leaf into Left ($L$) and Right ($R$) children, the exact reduction in loss is:\n\n$$\n\\text{Gain} = \\frac{1}{2} \\left[ \\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{(G_L + G_R)^2}{H_L + H_R + \\lambda} \\right] - \\gamma\n$$\n\nIf $\\text{Gain} \\le 0$, the candidate split is rejected, providing automatic regularization.",
          "ar": "تعمل معلمة التنظيم $\\lambda$ كمخمد للأوزان يمنع الأوراق التي تحتوي على عينات قليلة من اكتساب أوزان مفرطة، بينما تعمل معلمة $\\gamma$ كعتبة قبول حاسمة تقص أي تفرع لا يقدم مكسباً حقيقياً يفوق تكلفتها."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gradient-boosted-trees-xgboost",
          "starterCode": "def compute_xgboost_split_gain(\n    g: np.ndarray,\n    h: np.ndarray,\n    split_idx: int,\n    lmbda: float = 1.0,\n    gamma: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Computes XGBoost 2nd-order split gain and optimal child weights.\n    \n    Parameters\n    ----------\n    g : np.ndarray\n        Array of 1st-order gradients for instances sorted along feature axis.\n    h : np.ndarray\n        Array of 2nd-order Hessians for instances sorted along feature axis.\n    split_idx : int\n        Candidate split boundary index (left child contains instances [:split_idx]).\n    lmbda : float\n        L2 regularization parameter lambda on leaf weights.\n    gamma : float\n        Minimum split loss reduction parameter gamma.\n        \n    Returns\n    -------\n    dict with keys:\n        'gain': The net split gain.\n        'w_left': Optimal weight for left leaf.\n        'w_right': Optimal weight for right leaf.\n    \"\"\"\n    # 1. Left child sums\n    # 2. Right child sums\n    # 3. Combined parent sums\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_xgboost_split_gain(\n    g: np.ndarray,\n    h: np.ndarray,\n    split_idx: int,\n    lmbda: float = 1.0,\n    gamma: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Computes XGBoost 2nd-order split gain and optimal child weights.\n    \n    Parameters\n    ----------\n    g : np.ndarray\n        Array of 1st-order gradients for instances sorted along feature axis.\n    h : np.ndarray\n        Array of 2nd-order Hessians for instances sorted along feature axis.\n    split_idx : int\n        Candidate split boundary index (left child contains instances [:split_idx]).\n    lmbda : float\n        L2 regularization parameter lambda on leaf weights.\n    gamma : float\n        Minimum split loss reduction parameter gamma.\n        \n    Returns\n    -------\n    dict with keys:\n        'gain': The net split gain.\n        'w_left': Optimal weight for left leaf.\n        'w_right': Optimal weight for right leaf.\n    \"\"\"\n    # 1. Left child sums\n    # 2. Right child sums\n    # 3. Combined parent sums\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.23, 0.67"
            }
          },
          "solution": "import numpy as np\n\ndef compute_xgboost_split_gain(\n    g: np.ndarray,\n    h: np.ndarray,\n    split_idx: int,\n    lmbda: float = 1.0,\n    gamma: float = 0.0\n) -> dict[str, float]:\n    \"\"\"\n    Computes XGBoost 2nd-order split gain and optimal child weights.\n    \n    Parameters\n    ----------\n    g : np.ndarray\n        Array of 1st-order gradients for instances sorted along feature axis.\n    h : np.ndarray\n        Array of 2nd-order Hessians for instances sorted along feature axis.\n    split_idx : int\n        Candidate split boundary index (left child contains instances [:split_idx]).\n    lmbda : float\n        L2 regularization parameter lambda on leaf weights.\n    gamma : float\n        Minimum split loss reduction parameter gamma.\n        \n    Returns\n    -------\n    dict with keys:\n        'gain': The net split gain.\n        'w_left': Optimal weight for left leaf.\n        'w_right': Optimal weight for right leaf.\n    \"\"\"\n    # 1. Left child sums\n    G_L = float(np.sum(g[:split_idx]))\n    H_L = float(np.sum(h[:split_idx]))\n    \n    # 2. Right child sums\n    G_R = float(np.sum(g[split_idx:]))\n    H_R = float(np.sum(h[split_idx:]))\n    \n    # 3. Combined parent sums\n    G_total = G_L + G_R\n    H_total = H_L + H_R\n    \n    # 4. Optimal leaf weights: w = -G / (H + lambda)\n    w_left = -G_L / (H_L + lmbda)\n    w_right = -G_R / (H_R + lmbda)\n    \n    # 5. Split gain calculation\n    score_L = (G_L ** 2) / (H_L + lmbda)\n    score_R = (G_R ** 2) / (H_R + lmbda)\n    score_parent = (G_total ** 2) / (H_total + lmbda)\n    \n    gain = 0.5 * (score_L + score_R - score_parent) - gamma\n    \n    return {\n        \"gain\": float(gain),\n        \"w_left\": float(w_left),\n        \"w_right\": float(w_right)\n    }"
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
            "en": "How does setting $\\lambda = 5.0$ and $\\gamma = 1.0$ mathematically neutralize this instability?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ أشجار التدرج المعززة والتقريب من الرتبة الثانية في XGBoost تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Adding $\\lambda = 5.0$ acts as a Bayesian ridge prior on the denominator: the leaf weight shrinks from $+18.0$ to $-\\frac{-1.8}{0.10 + 5.0} = +0.35$. Furthermore, the split gain will fail to overcome the $\\gamma = 1.0$ pruning threshold, causing the tree to automatically prune this low-evidence split and preserve generalization.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "$\\lambda$ converts the Hessian values into negative numbers to invert the gradient.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "$\\gamma$ forces the tree to replace binary trees with a neural perceptron layer.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Regularization parameters only apply during test inference and have no effect during tree construction.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "kmeans-clustering",
    "title": "K-Means++ Clustering & Voronoi Tessellations",
    "titleAr": "تجميع K-Means++ وتفسيف فورونوي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Supervised learning requires ground truth labels curated by humans. In many real-world domains—customer market segmentation, genomic...",
      "ar": "يتطلب التعلم الموجه تصنيفات مسبقة ومؤكدة يديرها خبراء بشريون. لكن في تطبيقات عملية شاسعة—مثل تقسيم شرائح العملاء التسويقية، واكتشاف الأنماط..."
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
          "en": "Supervised learning requires ground truth labels curated by humans. In many real-world domains—customer market segmentation, genomic haplotype discovery, image color quantization—labels do not exist. We must discover natural groupings purely from the geometric topology of the data itself.\n\nThe classic **K-Means** algorithm approaches this like **deciding where to build $K$ fire stations across a sprawling metropolitan city**:\n1. You place $K$ fire stations at preliminary locations across the map.\n2. Every household is assigned to its nearest fire station (forming a **Voronoi tessellation** of municipal response zones).\n3. Each fire station is then physically relocated to the exact geographic center (mean coordinates) of all the households it was assigned to serve.\n4. You repeat this assignment-relocation cycle until no station moves.\n\nHowever, naive uniform random initialization frequently causes catastrophic failure: two stations may be randomly dropped in the exact same suburban neighborhood while leaving huge industrial districts completely uncovered.\n\nDavid Arthur and Sergei Vassilvitskii (2007) introduced **K-Means++**, which solves this via probabilistic spacing: the first centroid is chosen randomly, but every subsequent centroid is sampled with probability proportional to its squared Euclidean distance from the nearest already-chosen centroid ($D(\\mathbf{x})^2$). This guarantees that initial centroids are widely dispersed across the data manifold, delivering an $O(\\log K)$ competitive bound against the globally optimal clustering!",
          "ar": "يتطلب التعلم الموجه تصنيفات مسبقة ومؤكدة يديرها خبراء بشريون. لكن في تطبيقات عملية شاسعة—مثل تقسيم شرائح العملاء التسويقية، واكتشاف الأنماط الجينية، وضغط ألوان الصور الرقمية—تكون البيانات غير مصنفة مسبقاً. هنا يجب استكشاف المجموعات الطبيعية استناداً إلى البنية الهندسية البحتة للبيانات.\n\nتتعامل خوارزمية **K-Means** الكلاسيكية مع المسألة كـ **تحديد مواقع بناء $K$ من مراكز الإطفاء في مدينة مترامية الأطراف**:\n1. نحدد $K$ من المواقع المبدئية لمراكز الإطفاء على الخريطة.\n2. يُسند كل منزل إلى المركز الأقرب إليه جغرافياً (مما يشكل **تفسيف فورونوي Voronoi Tessellation** لمناطق الخدمة).\n3. يُعاد نقل كل مركز إطفاء إلى المركز الجغرافي الحسابي الدقيق (المتوسط) لجميع المنازل التي تولى خدمتها.\n4. تتكرر هذه الدورة حتى تستقر المراكز تماماً وتتوقف عن الحركة.\n\nلكن البدء بمواقع عشوائية بسيطة يؤدي غالباً إلى نتائج كارثية؛ كأن يسقط مركزان في نفس الحي بينما يُترك نصف المدينة دون تغطية. قدم ديفيد آرثر وسيرجي فاسيليفتسكي (2007) خوارزمية **K-Means++** الذكية: حيث يُختار المركز الأول عشوائياً، ثم يُختار كل مركز لاحق باحتمالية تتناسب طردياً مع مربع المسافة عن أقرب مركز قائم ($D(\\mathbf{x})^2$). يضمن هذا التوزيع المتباعد استكشاف الفضاء بالكامل، ويحقق حداً تنافسياً رياضياً $O(\\log K)$ مقارنة بالحل الأمثل العالمي!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "J(C, \\boldsymbol{\\mu}) = \\sum_{k=1}^K \\sum_{\\mathbf{x}_i \\in C_k} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_k\\|_2^2",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for K-Means++ Clustering & Voronoi Tessellations.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تجميع K-Means++ وتفسيف فورونوي."
        },
        "narrative": {
          "en": "#### Lloyd's Alternating Minimization Algorithm\nBecause finding the global minimum of $J$ is NP-hard, Lloyd's algorithm executes block coordinate descent:\n\n1. **Assignment Step (Minimizing $J$ with respect to $C$ while holding $\\boldsymbol{\\mu}$ fixed):**\n   $$C_k^{(t)} = \\left\\{ \\mathbf{x}_i : \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_k^{(t)}\\|_2 \\le \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_j^{(t)}\\|_2 \\quad \\forall j \\in \\{1, \\dots, K\\} \\right\\}$$\n\n2. **Centroid Update Step (Minimizing $J$ with respect to $\\boldsymbol{\\mu}$ while holding $C$ fixed):**\n   $$\\boldsymbol{\\mu}_k^{(t+1)} = \\arg\\min_{\\boldsymbol{\\mu}} \\sum_{\\mathbf{x}_i \\in C_k^{(t)}} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}\\|_2^2 = \\frac{1}{|C_k^{(t)}|} \\sum_{\\mathbf{x}_i \\in C_k^{(t)}} \\mathbf{x}_i$$\n\nBecause both steps strictly decrease or maintain $J(C, \\boldsymbol{\\mu})$ and the number of partitions is finite, Lloyd's algorithm is guaranteed to converge to a local minimum in a finite number of steps.\n\n#### K-Means++ Seeding Probability Distribution\nLet $D(\\mathbf{x}) = \\min_{j} \\|\\mathbf{x} - \\boldsymbol{\\mu}_j\\|_2$ denote the Euclidean distance from sample $\\mathbf{x}$ to the closest already-selected centroid. The next centroid is sampled according to the discrete probability distribution:\n\n$$\n\\mathbb{P}(\\mathbf{x}_i \\text{ is chosen}) = \\frac{D(\\mathbf{x}_i)^2}{\\sum_{j=1}^N D(\\mathbf{x}_j)^2}\n$$\n\nArthur and Vassilvitskii (2007) proved that this randomized seeding guarantees:\n\n$$\n\\mathbb{E}[J_{\\text{K-Means++}}] \\le 8(\\ln K + 2) J_{\\text{Optimal}}\n$$",
          "ar": "يضمن توزيع احتمالات K-Means++ الموزون بمربع المسافات تجنب الوقوع في القيعان المحلية الرديئة؛ حيث يعاقب النقاط القريبة من المراكز القائمة ويكافئ استكشاف المناطق النائية غير الممثلة في البيانات."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-kmeans-clustering",
          "starterCode": "def kmeans_step(\n    X: np.ndarray,\n    centroids: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, float]:\n    \"\"\"\n    Executes a single step of Lloyd's K-Means algorithm:\n    1. Assign samples to nearest centroid via vectorized Euclidean distance.\n    2. Recompute centroids as cluster sample means.\n    3. Compute total inertia (WCSS).\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Input data points.\n    centroids : np.ndarray of shape (K, D)\n        Current centroid positions.\n        \n    Returns\n    -------\n    tuple of (labels, updated_centroids, inertia):\n        labels : np.ndarray of shape (N,) cluster indices in {0, ..., K-1}\n        updated_centroids : np.ndarray of shape (K, D)\n        inertia : float total within-cluster sum of squared distances\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def kmeans_step(\n    X: np.ndarray,\n    centroids: np.ndarray\n) -> tuple[np.ndarray, np.ndarray, float]:\n    \"\"\"\n    Executes a single step of Lloyd's K-Means algorithm:\n    1. Assign samples to nearest centroid via vectorized Euclidean distance.\n    2. Recompute centroids as cluster sample means.\n    3. Compute total inertia (WCSS).\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, D)\n        Input data points.\n    centroids : np.ndarray of shape (K, D)\n        Current centroid positions.\n        \n    Returns\n    -------\n    tuple of (labels, updated_centroids, inertia):\n        labels : np.ndarray of shape (N,) cluster indices in {0, ..., K-1}\n        updated_centroids : np.ndarray of shape (K, D)\n        inertia : float total within-cluster sum of squared distances\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
            "en": "What fundamental modeling requirement was violated, and what is the remediation?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تجميع K-Means++ وتفسيف فورونوي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "K-Means relies on isotropic Euclidean distance. Because the numerical variance of raw dollar incomes is 8 orders of magnitude larger than recency days, distances along the income axis completely dominate the objective function, rendering recency geometrically invisible. The data must be standardized (e.g., via z-score normalization) before clustering so that all features exert equal geometric leverage.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "The team should increase $K$ to 100 to force smaller clusters to capture recency.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "K-Means requires features to be non-zero integers; dollar incomes should be converted to binary indicators.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "K-Means++ initialization mathematically fixes feature scaling issues automatically.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
    "id": "pca-dimensionality-reduction",
    "title": "Principal Component Analysis (PCA) & Variance Maximization",
    "titleAr": "تحليل المكونات الرئيسية (PCA) وتعظيم التباين الهندسي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Modern datasets routinely contain dozens or hundreds of interrelated variables (financial ratios, sensor telemetry, image pixels, genomic...",
      "ar": "تحتوي مجموعات البيانات الحديثة على العشرات أو المئات من المتغيرات المترابطة (المؤشرات المالية، قراءات الحساسات، بكسلات الصور، مصفوفات..."
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
          "en": "Modern datasets routinely contain dozens or hundreds of interrelated variables (financial ratios, sensor telemetry, image pixels, genomic assays). Attempting to visualize or model high-dimensional data directly leads to severe collinearity, computational waste, and the curse of dimensionality.\n\n**Principal Component Analysis (PCA)** is the foundational linear dimensionality reduction technique. Think of holding a complex, intricate three-dimensional wire sculpture in your hands and trying to project its shadow onto a flat, two-dimensional wall using a flashlight. If you shine the flashlight from an arbitrary, clumsy angle, the shadow collapses into an unrecognizable, tangled clump that conceals the sculpture's structure.\n\nPCA is the mathematical art of **rotating the flashlight to find the exact camera angle that casts the widest, sharpest, most informative shadow possible**. The shadow's width corresponds to **variance**: the direction along which the data points are most spread out preserves the maximum amount of original information. \n- The **First Principal Component ($\\mathbf{v}_1$)** is the axis of maximum variance.\n- The **Second Principal Component ($\\mathbf{v}_2$)** is the axis of maximum *remaining* variance that is strictly orthogonal (perpendicular) to the first.",
          "ar": "تحتوي مجموعات البيانات الحديثة على العشرات أو المئات من المتغيرات المترابطة (المؤشرات المالية، قراءات الحساسات، بكسلات الصور، مصفوفات التعبير الجيني). وتؤدي محاولة نمذجة هذه الفضاءات الشاهقة مباشرة إلى تضخم التباين ولعنة الأبعاد.\n\nيمثل **تحليل المكونات الرئيسية (Principal Component Analysis - PCA)** الأساس الهندسي الأهم لتقليص الأبعاد الخطي. تخيل أنك تحمل في يدك تمثالاً سلكياً ثلاثي الأبعاد معقداً، وتحاول إسقاط ظله على جدار مستوٍ ثنائي الأبعاد باستخدام مصباح يدوي. إذا سلطت الضوء من زاوية عشوائية خرقاء، سينهار الظل إلى كتلة متشابكة ومبهمة تخفي المعالم الحقيقية للمجسم.\n\nPCA هو الفن الرياضي لـ **تدوير زاوية الإضاءة للبحث عن الزاوية الدقيقة التي تصنع أوسع ظل وأكثره وضوحاً وتفصيلاً على الجدار**. يقابل اتساع الظل مفهوم **التباين (Variance)**: فالاتجاه الذي تتشتت فيه البيانات بأكبر قدر ممكن هو الذي يحتفظ بأقصى كمية من المعلومات الأصلية.\n- **المكون الرئيسي الأول ($\\mathbf{v}_1$)** هو محور التباين الأقصى المطلق.\n- **المكون الرئيسي الثاني ($\\mathbf{v}_2$)** هو محور التباين الأقصى المتبقي، بشرط أن يكون متعامداً تماماً وبزاوية $90^\\circ$ على المحور الأول."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{\\Sigma} = \\frac{1}{N - 1} \\mathbf{X}^T \\mathbf{X} \\in \\mathbb{R}^{P \\times P}",
        "formulaNote": {
          "en": "Core mathematical formulation and objective for Principal Component Analysis (PCA) & Variance Maximization.",
          "ar": "الصياغة الرياضية الجوهرية ودالة الهدف لـ تحليل المكونات الرئيسية (PCA) وتعظيم التباين الهندسي."
        },
        "narrative": {
          "en": "$\\mathbf{\\Sigma}$ is symmetric and positive semi-definite.\n\n#### The Rayleigh Quotient & Eigenvalue Formulation\nWe seek a unit projection vector $\\mathbf{u}_1 \\in \\mathbb{R}^P$ ($\\|\\mathbf{u}_1\\|_2^2 = \\mathbf{u}_1^T \\mathbf{u}_1 = 1$) that maximizes the variance of the projected data $\\mathbf{z}_1 = \\mathbf{X} \\mathbf{u}_1$:\n\n$$\n\\max_{\\mathbf{u}_1} \\text{Var}(\\mathbf{X} \\mathbf{u}_1) = \\max_{\\mathbf{u}_1} \\frac{1}{N - 1} \\mathbf{u}_1^T \\mathbf{X}^T \\mathbf{X} \\mathbf{u}_1 = \\max_{\\mathbf{u}_1} \\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1 \\quad \\text{subject to } \\mathbf{u}_1^T \\mathbf{u}_1 = 1\n$$\n\nFormulating the Lagrangian:\n\n$$\n\\mathcal{L}(\\mathbf{u}_1, \\lambda_1) = \\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1 - \\lambda_1 (\\mathbf{u}_1^T \\mathbf{u}_1 - 1)\n$$\n\nSetting the gradient to zero:\n\n$$\n\\nabla_{\\mathbf{u}_1} \\mathcal{L} = 2\\mathbf{\\Sigma} \\mathbf{u}_1 - 2\\lambda_1 \\mathbf{u}_1 = \\mathbf{0} \\iff \\mathbf{\\Sigma} \\mathbf{u}_1 = \\lambda_1 \\mathbf{u}_1\n$$\n\nThis is the canonical **Eigenvalue Problem**! The direction of maximum variance is the eigenvector corresponding to the largest eigenvalue $\\lambda_1 = \\mathbf{u}_1^T \\mathbf{\\Sigma} \\mathbf{u}_1$.\n\n#### Spectral Decomposition & Low-Rank Projection\nBy the Spectral Theorem, $\\mathbf{\\Sigma} = \\mathbf{V} \\mathbf{\\Lambda} \\mathbf{V}^T$, where $\\mathbf{V} = [\\mathbf{v}_1, \\dots, \\mathbf{v}_P]$ is the orthonormal matrix of eigenvectors and $\\mathbf{\\Lambda} = \\text{diag}(\\lambda_1, \\dots, \\lambda_P)$ with ordered eigenvalues $\\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_P \\ge 0$.\n\nTo reduce dimension from $P$ to $K < P$, select the first $K$ eigenvectors $\\mathbf{V}_K \\in \\mathbb{R}^{P \\times K}$ and project:\n\n$$\n\\mathbf{Z} = \\mathbf{X} \\mathbf{V}_K \\in \\mathbb{R}^{N \\times K}\n$$\n\nThe **Explained Variance Ratio (EVR)** for component $j$ is:\n\n$$\n\\text{EVR}_j = \\frac{\\lambda_j}{\\sum_{m=1}^P \\lambda_m} = \\frac{\\lambda_j}{\\text{tr}(\\mathbf{\\Sigma})}\n$$",
          "ar": "يُعد تحليل المكونات الرئيسية حلاً دقيقاً لمسألة القيم الذاتية (Eigenvalue Problem)؛ حيث تكشف القيم الذاتية $\\lambda_j$ عن مقدار الطاقة التباينية المحفوظة على طول كل متجه ذاتي متعامد، مما يتيح التخلص من الأبعاد الزائدة بأقل قدر ممكن من فقدان المعلومات."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-pca-dimensionality-reduction",
          "starterCode": "def compute_pca(X: np.ndarray, n_components: int = 2) -> dict[str, object]:\n    \"\"\"\n    Computes Principal Component Analysis via sample covariance eigendecomposition.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Input data matrix.\n    n_components : int\n        Number of top principal components K to retain.\n        \n    Returns\n    -------\n    dict with keys:\n        'Z': Low-dimensional projected coordinates of shape (N, K).\n        'components': Top K orthonormal eigenvectors of shape (K, P).\n        'evr': Explained variance ratios for retained components of shape (K,).\n        'singular_values': Associated singular values.\n    \"\"\"\n    # 1. Zero-mean centering of columns\n    # 2. Sample covariance matrix: (1 / (N - 1)) * X_c^T X_c\n    # 3. Eigendecomposition (np.linalg.eigh is numerically stable for symmetric matrices)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def compute_pca(X: np.ndarray, n_components: int = 2) -> dict[str, object]:\n    \"\"\"\n    Computes Principal Component Analysis via sample covariance eigendecomposition.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Input data matrix.\n    n_components : int\n        Number of top principal components K to retain.\n        \n    Returns\n    -------\n    dict with keys:\n        'Z': Low-dimensional projected coordinates of shape (N, K).\n        'components': Top K orthonormal eigenvectors of shape (K, P).\n        'evr': Explained variance ratios for retained components of shape (K,).\n        'singular_values': Associated singular values.\n    \"\"\"\n    # 1. Zero-mean centering of columns\n    # 2. Sample covariance matrix: (1 / (N - 1)) * X_c^T X_c\n    # 3. Eigendecomposition (np.linalg.eigh is numerically stable for symmetric matrices)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.00, (4, 1)"
            }
          },
          "solution": "import numpy as np\n\ndef compute_pca(X: np.ndarray, n_components: int = 2) -> dict[str, object]:\n    \"\"\"\n    Computes Principal Component Analysis via sample covariance eigendecomposition.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, P)\n        Input data matrix.\n    n_components : int\n        Number of top principal components K to retain.\n        \n    Returns\n    -------\n    dict with keys:\n        'Z': Low-dimensional projected coordinates of shape (N, K).\n        'components': Top K orthonormal eigenvectors of shape (K, P).\n        'evr': Explained variance ratios for retained components of shape (K,).\n        'singular_values': Associated singular values.\n    \"\"\"\n    N, P = X.shape\n    \n    # 1. Zero-mean centering of columns\n    mean = np.mean(X, axis=0)\n    X_centered = X - mean\n    \n    # 2. Sample covariance matrix: (1 / (N - 1)) * X_c^T X_c\n    cov_matrix = (X_centered.T @ X_centered) / (N - 1.0)\n    \n    # 3. Eigendecomposition (np.linalg.eigh is numerically stable for symmetric matrices)\n    eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)\n    \n    # 4. Sort eigenvalues and eigenvectors in descending order\n    idx = np.argsort(eigenvalues)[::-1]\n    eigenvalues = eigenvalues[idx]\n    eigenvectors = eigenvectors[:, idx]\n    \n    # 5. Extract top K components\n    components = eigenvectors[:, :n_components].T # (K, P)\n    top_eigenvalues = eigenvalues[:n_components]\n    \n    # 6. Low-dimensional projection: Z = X_c @ V_K\n    Z = X_centered @ eigenvectors[:, :n_components]\n    \n    # 7. Explained variance ratio: lambda_j / sum(lambda)\n    total_var = float(np.sum(eigenvalues))\n    evr = top_eigenvalues / total_var if total_var > 0 else np.zeros(n_components)\n    \n    return {\n        \"Z\": Z,\n        \"components\": components,\n        \"evr\": evr,\n        \"singular_values\": np.sqrt(np.maximum(top_eigenvalues * (N - 1), 0.0))\n    }"
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
            "en": "How does the mathematical principle of PCA justify reducing the data strictly to the first 3 components?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ تحليل المكونات الرئيسية (PCA) وتعظيم التباين الهندسي تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "omponents 4 through 4,096 each contribute less than $0.05\\%$ of total variance, forming a flat, horizontal scree floor.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "The dramatic \"elbow\" at component 3 separates the structural low-rank signal from isotropic measurement noise. The trailing 4,093 components have tiny, uniform eigenvalues that capture sensor noise and ambient lighting fluctuations rather than facial geometry. Retaining only 3 components compresses the data by over $99.9\\%$ while preserving $86.5\\%$ of the genuine anatomical signal.",
                "ar": "يحقق الاستقرار الرياضي والاتساق النظري للمفهوم."
              },
              "correct": true,
              "explanation": {
                "en": "Verified by analytical foundations and empirical invariance.",
                "ar": "مؤكد بالبراهين التحليلية والخصائص الهندسية الثابتة."
              }
            },
            {
              "text": {
                "en": "Because computing more than 3 components violates the matrix rank theorem when $N > 100$.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Because eigenvalues smaller than 1.0 are mathematically undefined in Euclidean space.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
              },
              "correct": false,
              "explanation": {
                "en": "Violates fundamental constraints established in preceding beats.",
                "ar": "يتناقض مع المبادئ الرياضية التي أثبتناها في النبضات السابقة."
              }
            },
            {
              "text": {
                "en": "Retaining 2,000 components would cause the eigenvectors to lose mutual orthogonality.",
                "ar": "يتعارض مع الفروض الرياضية للمفهوم."
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
  }
];
