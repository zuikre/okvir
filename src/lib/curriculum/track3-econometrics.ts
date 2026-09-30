import type { CurriculumModule } from '../types';

export const econometricsModules: CurriculumModule[] = [
  {
    "id": "ols-residual-geometry",
    "title": "Bivariate OLS & The Geometry of Orthogonal Residuals",
    "titleAr": "الانحدار الخطي البسيط وهندسة البواقي المتعامدة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Ordinary Least Squares (OLS) is frequently introduced as an optimization problem where one calculates the line that minimizes vertical squar...",
      "ar": "يُقدَّم الانحدار الخطي العادي (OLS) غالبًا كمسألة استمثال حسابية لحساب خط يقلل مجموع مربعات المسافات الرأسية. لكن الرؤية الأكثر عمقًا وأصالة..."
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
          "en": "Ordinary Least Squares (OLS) is frequently introduced as an optimization problem where one calculates the line that minimizes vertical squared distances. However, the deepest, most foundational insight of econometrics is geometric: OLS is an orthogonal projection of the observed outcome vector $\\mathbf{y} \\in \\mathbb{R}^N$ onto the linear subspace spanned by the regressors, $\\text{col}(\\mathbf{X})$.\n\nWhen we collect data on $N$ economic agents, the outcome $\\mathbf{y}$ is a single point in an $N$-dimensional sample space. The regressor matrix $\\mathbf{X} \\in \\mathbb{R}^{N \\times K}$ defines a",
          "ar": "يُقدَّم الانحدار الخطي العادي (OLS) غالبًا كمسألة استمثال حسابية لحساب خط يقلل مجموع مربعات المسافات الرأسية. لكن الرؤية الأكثر عمقًا وأصالة في القياس الاقتصادي هي الرؤية الهندسية: OLS هو في حقيقته إسقاط متعامد (Orthogonal Projection) لمتجه المشاهدات $\\mathbf{y} \\in \\mathbb{R}^N$ على الفضاء الفرعي الخطي الذي تولده المتغيرات المستقلة $\\text{col}(\\mathbf{X})$.\n\nفي فضاء العينة ذي الأبعاد الـ $N$، يمثل المتجه $\\mathbf{y}$ نقطة في $\\mathbb{R}^N$، بينما تشكل مصفوفة البيانات $\\mathbf{X}$ فضاءً فرعيًا ذا بعد $K$ (حيث $N \\gg K$). ونظرًا لأن $\\mathbf{y}$ لا يقع عمومًا داخل هذا الفضاء، فإن أفضل تقريب خطي"
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
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-ols-residual-geometry",
          "starterCode": "import numpy as np\n\ndef fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors (must have full column rank).\n    y : np.ndarray of shape (N,)\n        Response vector.\n        \n    Returns\n    -------\n    dict with keys 'beta', 'y_hat', 'residuals'\n    \"\"\"\n    # TODO: Solve (X^T X) beta = X^T y without explicit matrix inversion\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits an Ordinary Least Squares (OLS) regression using the Normal Equations.\n    \n    Parameters\n    ----------\n    X : np.ndarray of shape (N, K)\n        Design matrix of regressors (must have full column rank).\n    y : np.ndarray of shape (N,)\n        Response vector.\n        \n    Returns\n    -------\n    dict with keys 'beta', 'y_hat', 'residuals'\n    \"\"\"\n    # TODO: Solve (X^T X) beta = X^T y without explicit matrix inversion\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_ols(X: np.ndarray, y: np.ndarray) -> dict[str, np.ndarray]:\n    XtX = X.T @ X\n    Xty = X.T @ y\n    beta = np.linalg.solve(XtX, Xty)\n    y_hat = X @ beta\n    residuals = y - y_hat\n    return {\n        \"beta\": beta,\n        \"y_hat\": y_hat,\n        \"residuals\": residuals,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Bivariate OLS & The Geometry of Orthogonal Residuals?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الانحدار الخطي البسيط وهندسة البواقي المتعامدة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Once the regression hyperplane is determined, researchers need to quantify how much of the outcome's variation has been explained by the mod...",
      "ar": "بعد تحديد المستوى الفائق للانحدار، يحتاج الباحث إلى قياس النسبة التي استطاع النموذج تفسيرها من تباين المتغير التابع. يقوم تفكيك تحليل التباي..."
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
          "en": "Once the regression hyperplane is determined, researchers need to quantify how much of the outcome's variation has been explained by the model. The Analysis of Variance (ANOVA) decomposition splits the total sample variance into explained variation and unexplained noise.\n\nBecause $\\hat{\\mathbf{y}}$ and $\\mathbf{e}$ are mutually orthogonal vectors in $\\mathbb{R}^N$, the Pythagorean theorem applies directly to their squared lengths. The coefficient of determination, $R^2$, measures the cosine squared of the angle between the centered outcome vector and its projection. In empirical research, howe",
          "ar": "بعد تحديد المستوى الفائق للانحدار، يحتاج الباحث إلى قياس النسبة التي استطاع النموذج تفسيرها من تباين المتغير التابع. يقوم تفكيك تحليل التباين (ANOVA) بتقسيم التباين الإجمالي إلى تباين مفسَّر بواسطة النموذج وضجيج غير مفسَّر.\n\nونظرًا لتعامد المتجه التقديري $\\hat{\\mathbf{y}}$ ومتجه البواقي $\\mathbf{e}$ في الفضاء الإقليدي $\\mathbb{R}^N$، تنطبق مبرهنة فيثاغورس مباشرة على أطوالهما المربعة. يمثل معامل التحديد $R^2$ مربع جيب تمام الزاوية بين المتغير التابع الممركز ومسقطه. ولكن في الاقتصاد القياسي التجريبي، يُعد $R^2$ من أكثر المقاييس إساءةً للفهم؛ فالقيمة المرتفعة له لا تعني إطلاقًا صلاحية سببية، وإضا"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\boldsymbol{\\iota}^T \\mathbf{e} = \\sum_{i=1}^N e_i = 0 \\implies \\bar{y} = \\bar{\\hat{y}}",
        "formulaNote": {
          "en": "Core invariant for Goodness-of-Fit, R-squared, and the ANOVA Decomposition.",
          "ar": "الخاصية الرياضية الجوهرية لـ جودة التوفيق ومعامل التحديد والتفكيك التبايني."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-goodness-of-fit-r-squared",
          "starterCode": "import numpy as np\n\ndef compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    \"\"\"\n    Computes ANOVA variance components, R^2, and adjusted R^2.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        True target values.\n    y_hat : np.ndarray of shape (N,)\n        Model predictions.\n    p : int\n        Number of slopes (regressors excluding intercept).\n    \"\"\"\n    # TODO: Compute TSS, ESS, SSR, R^2, and adjusted R^2\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    \"\"\"\n    Computes ANOVA variance components, R^2, and adjusted R^2.\n    \n    Parameters\n    ----------\n    y : np.ndarray of shape (N,)\n        True target values.\n    y_hat : np.ndarray of shape (N,)\n        Model predictions.\n    p : int\n        Number of slopes (regressors excluding intercept).\n    \"\"\"\n    # TODO: Compute TSS, ESS, SSR, R^2, and adjusted R^2\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_r2_anova(y: np.ndarray, y_hat: np.ndarray, p: int) -> dict[str, float]:\n    n = len(y)\n    y_bar = np.mean(y)\n    tss = float(np.sum((y - y_bar) ** 2))\n    ess = float(np.sum((y_hat - y_bar) ** 2))\n    ssr = float(np.sum((y - y_hat) ** 2))\n    r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0\n    df_res = n - p - 1\n    df_tot = n - 1\n    adj_r2 = 1.0 - ((ssr / df_res) / (tss / df_tot)) if (df_res > 0 and tss > 0) else 0.0\n    return {\n        \"tss\": tss,\n        \"ess\": ess,\n        \"ssr\": ssr,\n        \"r2\": r2,\n        \"adj_r2\": adj_r2,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Goodness-of-Fit, R-squared, and the ANOVA Decomposition?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم جودة التوفيق ومعامل التحديد والتفكيك التبايني؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Why do econometricians almost universally start with OLS rather than another linear estimator? The Gauss-Markov Theorem provides the foundat...",
      "ar": "لماذا يبدأ علماء القياس الاقتصادي دومًا بمقدر المربعات الصغرى OLS بدلاً من أي مقدر خطي آخر؟ تقدم مبرهنة غاوس-ماركوف (Gauss-Markov Theorem) ا..."
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
          "en": "Why do econometricians almost universally start with OLS rather than another linear estimator? The Gauss-Markov Theorem provides the foundational justification: under five core conditions (linearity, full rank, strict exogeneity, homoskedasticity, and no serial correlation), the OLS estimator is BLUE (Best Linear Unbiased Estimator). That is, among ALL conceivable estimators that are linear in $\\mathbf{y}$ and unbiased, OLS achieves the minimum sampling variance for every linear combination of the parameters.\n\nThis theorem is remarkably powerful because it requires no distributional assumption",
          "ar": "لماذا يبدأ علماء القياس الاقتصادي دومًا بمقدر المربعات الصغرى OLS بدلاً من أي مقدر خطي آخر؟ تقدم مبرهنة غاوس-ماركوف (Gauss-Markov Theorem) الإجابة التأسيسية: في ظل خمس فرضيات جوهرية (الخطية، الرتبة الكاملة، الاستقلال الخارجي التام، تجانس التباين، وغياب الارتباط الذاتي)، فإن مقدر OLS هو الأفضل خطيًا وغير متحيّز (BLUE: Best Linear Unbiased Estimator). أي أنه من بين جميع المقدرات الخطية غير المتحيزة الممكنة، يمتلك OLS أصغر تباين للمعاينة.\n\nتكمن قوة هذه المبرهنة في أنها لا تفترض أي توزيع احتمالي محدد (كالفرضي الطبيعي للخطأ). ومع ذلك، في التطبيقات الاقتصادية الحقيقية، تندر مصادفة فرضية تجانس التباي"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbb{E}[\\boldsymbol{\\varepsilon}\\boldsymbol{\\varepsilon}^T \\mid \\mathbf{X}] = \\sigma^2 \\mathbf{I}_N",
        "formulaNote": {
          "en": "Core invariant for The Gauss-Markov Theorem & BLUE Estimator.",
          "ar": "الخاصية الرياضية الجوهرية لـ مبرهنة غاوس-ماركوف وأفضل مقدر خطي غير متحيّز."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gauss-markov-blue-theorem",
          "starterCode": "import numpy as np\n\ndef compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Computes homoskedastic OLS parameter variance-covariance, SEs, and t-stats.\n    \"\"\"\n    # TODO: Calculate beta, residuals, s^2, vcov, SEs, and t_stats\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Computes homoskedastic OLS parameter variance-covariance, SEs, and t-stats.\n    \"\"\"\n    # TODO: Calculate beta, residuals, s^2, vcov, SEs, and t_stats\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ols_vcov(X: np.ndarray, y: np.ndarray) -> dict[str, object]:\n    n, k = X.shape\n    beta = np.linalg.solve(X.T @ X, X.T @ y)\n    e = y - X @ beta\n    s2 = float(np.sum(e ** 2) / (n - k))\n    vcov = s2 * np.linalg.inv(X.T @ X)\n    se = np.sqrt(np.diag(vcov))\n    t_stats = beta / se\n    return {\n        \"beta\": beta,\n        \"s2\": s2,\n        \"vcov\": vcov,\n        \"se\": se,\n        \"t_stats\": t_stats,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing The Gauss-Markov Theorem & BLUE Estimator?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم مبرهنة غاوس-ماركوف وأفضل مقدر خطي غير متحيّز؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "In real-world data, the dispersion of the error term is rarely constant. Rich households have vastly greater variance in expenditure than po...",
      "ar": "في البيانات الواقعية، نادرًا ما يكون تشتت الأخطاء ثابتًا؛ فالأسر الثرية تظهر تباينًا واسعًا جدًا في الإنفاق مقارنة بالأسر الفقيرة، والشركات ..."
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
          "en": "In real-world data, the dispersion of the error term is rarely constant. Rich households have vastly greater variance in expenditure than poor households; large firms exhibit much higher profit variance than small startups. When heteroskedasticity $\\mathbb{E}[\\varepsilon_i^2 | X_i] = \\sigma_i^2$ is present, the OLS point estimates $\\hat{\\boldsymbol{\beta}}$ remain unbiased and consistent, but the textbook standard errors $\\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$ are completely invalid, typically leading to severely deflated confidence intervals and spuriously high $t$-statistics.\n\nHalbert White",
          "ar": "في البيانات الواقعية، نادرًا ما يكون تشتت الأخطاء ثابتًا؛ فالأسر الثرية تظهر تباينًا واسعًا جدًا في الإنفاق مقارنة بالأسر الفقيرة، والشركات العملاقة يتباين دخلها بشكل أكبر بكثير من الشركات الناشئة. وعند وجود عدم تجانس التباين (Heteroskedasticity) $\\mathbb{E}[\\varepsilon_i^2 | X_i] = \\sigma_i^2$، تظل تقديرات المعلمات $\\hat{\\boldsymbol{\beta}}$ غير متحيّزة ومتسقة، لكن الأخطاء المعيارية التقليدية تفقد صلاحيتها، مما يؤدي إلى فترات ثقة ضيقة وقيم $t$ وهمية تضخم دلالة النتائج.\n\nأحدث هالبرت هوايت (White, 1980) ثورة في الاقتصاد القياسي التجريبي بابتكار مقدر الساندويتش المتين (Robust Sandwich Estimator)"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\boldsymbol{\\Omega} \\equiv \\mathbb{E}[\\boldsymbol{\\varepsilon}\\boldsymbol{\\varepsilon}^T \\mid \\mathbf{X}] = \\text{diag}(\\sigma_1^2, \\sigma_2^2, \\dots, \\sigma_N^2)",
        "formulaNote": {
          "en": "Core invariant for Heteroskedasticity & The White HC0-HC3 Sandwich Estimator.",
          "ar": "الخاصية الرياضية الجوهرية لـ عدم تجانس التباين ومقدر الساندويتش المتين لهوايت."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-heteroskedasticity-white-robust",
          "starterCode": "import numpy as np\n\ndef compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent SEs.\n    \"\"\"\n    # TODO: Implement the sandwich estimator\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes White (HC0) and MacKinnon-White (HC1) heteroskedasticity-consistent SEs.\n    \"\"\"\n    # TODO: Implement the sandwich estimator\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_robust_se(X: np.ndarray, y: np.ndarray, hc_type: str = \"HC1\") -> dict[str, np.ndarray]:\n    n, k = X.shape\n    beta = np.linalg.solve(X.T @ X, X.T @ y)\n    e = y - X @ beta\n    XX_inv = np.linalg.inv(X.T @ X)\n    # Vectorized bread and meat: X^T @ diag(e^2) @ X == (X * e[:, None]).T @ (X * e[:, None])\n    meat = (X * e[:, None]).T @ (X * e[:, None])\n    vcov_hc0 = XX_inv @ meat @ XX_inv\n    if hc_type == \"HC0\":\n        vcov = vcov_hc0\n    elif hc_type == \"HC1\":\n        vcov = (n / (n - k)) * vcov_hc0\n    else:\n        raise ValueError(f\"Unsupported hc_type: {hc_type}\")\n    se = np.sqrt(np.diag(vcov))\n    return {\"beta\": beta, \"vcov\": vcov, \"se\": se}"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Heteroskedasticity & The White HC0-HC3 Sandwich Estimator?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم عدم تجانس التباين ومقدر الساندويتش المتين لهوايت؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Moving from simple bivariate regression to multiple regression transforms econometrics from basic curve fitting into a multidimensional cete...",
      "ar": "إن الانتقال من الانحدار البسيط إلى الانحدار المتعدد ينقل القياس الاقتصادي من مجرد توفيق منحنيات إلى آلة جبارة لتطبيق مبدأ 'مع بقاء العوامل ا..."
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
          "en": "Moving from simple bivariate regression to multiple regression transforms econometrics from basic curve fitting into a multidimensional ceteris paribus machine. In real socioeconomic systems, isolated variables never move in a vacuum; education is correlated with ability, experience, geography, and family background.\n\nMatrix calculus allows us to elegantly optimize across $K$ dimensions simultaneously. By expressing regressors in a design matrix $\\mathbf{X}$, multiple regression isolates the marginal effect of one variable while holding all other included covariates constant. However, this alg",
          "ar": "إن الانتقال من الانحدار البسيط إلى الانحدار المتعدد ينقل القياس الاقتصادي من مجرد توفيق منحنيات إلى آلة جبارة لتطبيق مبدأ 'مع بقاء العوامل الأخرى على حالها' (Ceteris Paribus). في الظواهر الاقتصادية الواقعية، لا تتحرك المتغيرات بمعزل عن بعضها؛ فالتعليم يرتبط بالقدرة الفطرية والخبرة والموقع الجغرافي والبيئة الأسرية.\n\nيتيح حسبان المصفوفات (Matrix Calculus) صياغة الاستمثال عبر أبعاد متعددة بسهولة تامة. من خلال مصفوفة التصميم $\\mathbf{X}$، يقوم الانحدار المتعدد بعزل التأثير الحدي لمتغير معين مع تثبيت المتغيرات الأخرى، مشترطًا عدم وجود علاقة خطية تامة (Perfect Multicollinearity) بين الأعمدة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "S(\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\mathbf{y}^T \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\beta}^T (\\mathbf{X}^T \\mathbf{X}) \\boldsymbol{\\beta}",
        "formulaNote": {
          "en": "Core invariant for Multiple Regression Algebra & Matrix Calculus.",
          "ar": "الخاصية الرياضية الجوهرية لـ جبر الانحدار المتعدد وحسبان المصفوفات."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-multiple-regression-matrix-calculus",
          "starterCode": "import numpy as np\n\ndef compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the hat matrix P_X and residual annihilator matrix M_X.\n    \"\"\"\n    # TODO: Calculate P and M\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Computes the hat matrix P_X and residual annihilator matrix M_X.\n    \"\"\"\n    # TODO: Calculate P and M\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_projection_and_annihilator(X: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    n = X.shape[0]\n    P = X @ np.linalg.inv(X.T @ X) @ X.T\n    M = np.eye(n) - P\n    return P, M"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Multiple Regression Algebra & Matrix Calculus?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم جبر الانحدار المتعدد وحسبان المصفوفات؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "The Frisch-Waugh-Lovell (FWL) theorem is celebrated as one of the most elegant and practically useful theorems in econometrics. It answers a...",
      "ar": "تُعد مبرهنة فريش-وو-لوفيل (FWL) واحدة من أرقى وأهم النظريات في القياس الاقتصادي. فهي تجيب بدقة متناهية عن المعنى الرياضي لعبارة 'التحكم في ا..."
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
          "en": "The Frisch-Waugh-Lovell (FWL) theorem is celebrated as one of the most elegant and practically useful theorems in econometrics. It answers a fundamental question: what does it truly mean to 'control for' a variable $X_2$ when estimating the effect of $X_1$ on $Y$?\n\nFWL proves that the multivariate regression coefficient on $X_1$ can be obtained via a simple three-step procedure: 1. Regress $Y$ on $X_2$ and keep the residuals $\\tilde{\\mathbf{y}}$ (removing all variation in $Y$ explainable by $X_2$). 2. Regress $X_1$ on $X_2$ and keep the residuals $\\tilde{\\mathbf{x}}_1$ (purging $X_1$ of all co",
          "ar": "تُعد مبرهنة فريش-وو-لوفيل (FWL) واحدة من أرقى وأهم النظريات في القياس الاقتصادي. فهي تجيب بدقة متناهية عن المعنى الرياضي لعبارة 'التحكم في المتغير $X_2$' عند دراسة أثر $X_1$ على $Y$.\n\nتثبت النظرية أنه يمكن الحصول على معامل الانحدار المتعدد الخاص بـ $X_1$ عبر ثلاث خطوات بسيطة:\n1. انحدار $Y$ على $X_2$ والاحتفاظ بالبواقي $\\tilde{\\mathbf{y}}$ (تجريد $Y$ من كل ما يفسره $X_2$).\n2. انحدار $X_1$ على $X_2$ والاحتفاظ بالبواقي $\\tilde{\\mathbf{x}}_1$ (تجريد $X_1$ من أي تداخل مع $X_2$).\n3. إجراء انحدار بسيط للباقي $\\tilde{\\mathbf{y}}$ على الباقي $\\tilde{\\mathbf{x}}_1$.\nإن ميل هذا الانحدار البسيط يتطابق تما"
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
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-frisch-waugh-lovell-theorem",
          "starterCode": "import numpy as np\n\ndef fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Verifies the Frisch-Waugh-Lovell theorem by comparing partial regression with full OLS.\n    \"\"\"\n    # TODO: Partial out X2 from y and X1, then compare with full regression\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Verifies the Frisch-Waugh-Lovell theorem by comparing partial regression with full OLS.\n    \"\"\"\n    # TODO: Partial out X2 from y and X1, then compare with full regression\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fwl_partial_regression(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    # Annihilator for X2\n    P2 = X2 @ np.linalg.inv(X2.T @ X2) @ X2.T\n    M2 = np.eye(len(y)) - P2\n    y_tilde = M2 @ y\n    X1_tilde = M2 @ X1\n    beta_1_fwl = np.linalg.solve(X1_tilde.T @ X1_tilde, X1_tilde.T @ y_tilde)\n    \n    # Full regression of y on [X1, X2]\n    X_full = np.column_stack([X1, X2])\n    beta_full = np.linalg.solve(X_full.T @ X_full, X_full.T @ y)\n    beta_1_full = beta_full[:X1.shape[1]]\n    return beta_1_fwl, beta_1_full"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing The Frisch-Waugh-Lovell (FWL) Theorem & Partialling Out?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم مبرهنة فريش-وو-لوفيل والتجريد الجزئي للمتغيرات؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Omitted Variable Bias (OVB) is the central villain in applied econometrics. When an empirical researcher estimates a 'short' regression of o...",
      "ar": "يُعد انحياز المتغير المغفَل (Omitted Variable Bias - OVB) العدو الأول في أبحاث الاقتصاد القياسي التطبيقي. عندما يقوم الباحث بتقدير نموذج انح..."
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
          "en": "Omitted Variable Bias (OVB) is the central villain in applied econometrics. When an empirical researcher estimates a 'short' regression of outcome $Y$ on treatment $X_1$, omitting a relevant confounding variable $X_2$ that correlates with both $X_1$ and $Y$ contaminates the estimated coefficient, causing it to conflate the true causal effect with the omitted confounder's influence.\n\nThe OVB formula is remarkable because it decomposes the bias into an exact product:",
          "ar": "يُعد انحياز المتغير المغفَل (Omitted Variable Bias - OVB) العدو الأول في أبحاث الاقتصاد القياسي التطبيقي. عندما يقوم الباحث بتقدير نموذج انحدار 'قصير' لمتغير النتيجة $Y$ على المعالجة $X_1$ مهملاً متغيرًا مفسِّرًا أصيلاً $X_2$ يرتبط بكل من $X_1$ و $Y$، فإن مقدر OLS يمتص أثر المتغير الغائب، مما يخلط الأثر السببي الحقيقي بأثر المتغير المربك.\n\nتكتسب صيغة OVB أهمية بالغة لأنها تفكك الانحياز بدقة رياضية مذهلة إلى حاصل ضرب أمرين: (أثر المتغير المغفل على النتيجة) $\\times$ (علاقة المتغير المغفل بالمعالجة). يمكّن هذا التفكيك الباحثين من تحديد اتجاه الانحياز (موجب أم سالب) بالاستناد إلى النظرية الاقتصادي"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{Bias} = (\\text{Impact of omitted variable on } Y) \\times (\\text{Relationship between omitted variable and } X_1)",
        "formulaNote": {
          "en": "Core invariant for The Omitted Variable Bias (OVB) Formula & The Directional Bias Matrix.",
          "ar": "الخاصية الرياضية الجوهرية لـ صيغة انحياز المتغير المغفَل ومصفوفة تحديد اتجاه الانحياز."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-omitted-variable-bias-formula",
          "starterCode": "import numpy as np\n\ndef compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes long OLS, short OLS, auxiliary projection, and exact omitted variable bias.\n    \"\"\"\n    # TODO: Implement OVB decomposition\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:\n    \"\"\"\n    Computes long OLS, short OLS, auxiliary projection, and exact omitted variable bias.\n    \"\"\"\n    # TODO: Implement OVB decomposition\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ovb(y: np.ndarray, X1: np.ndarray, X2: np.ndarray) -> dict[str, np.ndarray]:\n    X_full = np.column_stack([X1, X2])\n    b_long = np.linalg.solve(X_full.T @ X_full, X_full.T @ y)\n    k1 = X1.shape[1]\n    b1_long = b_long[:k1]\n    b2_long = b_long[k1:]\n    \n    b1_short = np.linalg.solve(X1.T @ X1, X1.T @ y)\n    Pi = np.linalg.solve(X1.T @ X1, X1.T @ X2)\n    bias = Pi @ b2_long\n    return {\n        \"beta1_long\": b1_long,\n        \"beta1_short\": b1_short,\n        \"bias\": bias,\n        \"Pi\": Pi,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing The Omitted Variable Bias (OVB) Formula & The Directional Bias Matrix?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم صيغة انحياز المتغير المغفَل ومصفوفة تحديد اتجاه الانحياز؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "In applied empirical work, researchers often fall into the trap of 'kitchen sink' regressions: controlling for every conceivable variable in...",
      "ar": "يقع العديد من الباحثين في فخ يُعرف بـ 'انحدار حوض المطبخ' (Kitchen Sink Regression)، حيث يقومون بإقحام كل متغير متاح في النموذج ظنًا منهم أن..."
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
          "en": "In applied empirical work, researchers often fall into the trap of 'kitchen sink' regressions: controlling for every conceivable variable in the dataset under the false assumption that more controls always reduce bias. Angrist and Pischke famously coined the term Bad Controls to describe variables that should never be controlled for.\n\nBad controls typically fall into two categories: 1. Mediators: Variables on the causal pathway from treatment $D$ to outcome $Y$ ($D \\to M \\to Y$). Controlling for $M$ blocks the mechanism and eliminates the total causal effect. 2. Post-Treatment Outcom",
          "ar": "يقع العديد من الباحثين في فخ يُعرف بـ 'انحدار حوض المطبخ' (Kitchen Sink Regression)، حيث يقومون بإقحام كل متغير متاح في النموذج ظنًا منهم أن زيادة ضوابط التحكم تقلل التحيز دائمًا. صاغ أنغريست وبيشكي (Angrist & Pischke) مصطلح الضوابط السيئة (Bad Controls) لوصف المتغيرات التي يُحظر التحكم فيها.\n\nتنقسم الضوابط السيئة في الغالب إلى فئتين رئيسيتين:\n1. المتغيرات الوسيطة (Mediators): وهي المتغيرات الواقعة على المسار السببي بين المعالجة والنتيجة ($D \\to M \\to Y$)؛ إذ يؤدي التحكم فيها إلى خنق المسار وإلغاء الأثر السببي الإجمالي.\n2. المتغيرات اللاحقة للمعالجة: وهي متغيرات تتأثر بالمعالجة نفس"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "M_i = \\gamma_0 + \\gamma_1 D_i + u_i",
        "formulaNote": {
          "en": "Core invariant for Bad Controls, Mediators, and Overcontrolling.",
          "ar": "الخاصية الرياضية الجوهرية لـ ضوابط التحكم السيئة والمتغيرات الوسيطة وفخ الإفراط في التحكم."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-bad-controls-mediators-overcontrolling",
          "starterCode": "import numpy as np\n\ndef compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in X.\n    \"\"\"\n    # TODO: Run auxiliary regressions and calculate 1 / (1 - R_j^2)\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_vif(X: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Computes the Variance Inflation Factor (VIF) for each column in X.\n    \"\"\"\n    # TODO: Run auxiliary regressions and calculate 1 / (1 - R_j^2)\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_vif(X: np.ndarray) -> np.ndarray:\n    n, k = X.shape\n    vifs = np.zeros(k)\n    ones = np.ones((n, 1))\n    for j in range(k):\n        y_j = X[:, j]\n        X_other = np.delete(X, j, axis=1)\n        X_reg = np.column_stack([ones, X_other])\n        beta_j = np.linalg.lstsq(X_reg, y_j, rcond=None)[0]\n        y_pred = X_reg @ beta_j\n        tss = np.sum((y_j - np.mean(y_j)) ** 2)\n        ssr = np.sum((y_j - y_pred) ** 2)\n        r2 = 1.0 - (ssr / tss) if tss > 0 else 0.0\n        vifs[j] = 1.0 / (1.0 - r2) if (1.0 - r2) > 1e-12 else 1e12\n    return vifs"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Bad Controls, Mediators, and Overcontrolling?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم ضوابط التحكم السيئة والمتغيرات الوسيطة وفخ الإفراط في التحكم؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Before Donald Rubin formalized the Potential Outcomes framework (Neyman-Rubin Causal Model), causality in statistics was shrouded in ambiguo...",
      "ar": "قبل صياغة دونالد روبين لإطار النتائج المحتملة (Neyman-Rubin Causal Model)، كانت مفاهيم السببية في الإحصاء غامضة وتقتصر على نقاشات لغوية غير ..."
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
          "en": "Before Donald Rubin formalized the Potential Outcomes framework (Neyman-Rubin Causal Model), causality in statistics was shrouded in ambiguous verbal arguments. Rubin defined causality at the individual level: for every economic unit $i$, there exist two potential states of the world: $Y_i(1)$, the outcome if treated, and $Y_i(0)$, the outcome if untreated.\n\nThe causal effect for individual $i$ is defined as $\\tau_i = Y_i(1) - Y_i(0)$. Here lies The Fundamental Problem of Causal Inference: in any real-world dataset, we can observe at most ONE of these two potential outcomes for any given i",
          "ar": "قبل صياغة دونالد روبين لإطار النتائج المحتملة (Neyman-Rubin Causal Model)، كانت مفاهيم السببية في الإحصاء غامضة وتقتصر على نقاشات لغوية غير منضبطة. عرّف روبين السببية على مستوى الوحدة الفردية: لكل وحدة اقتصادية $i$، توجد حالتان محتملتان في هذا العالم: $Y_i(1)$ وهي النتيجة في حال تلقي المعالجة، و $Y_i(0)$ وهي النتيجة في حال عدم تلقيها.\n\nيُعرَّف الأثر السببي للفرد $i$ بأنه: $\\tau_i = Y_i(1) - Y_i(0)$. وهنا تبرز المشكلة الجوهرية للاستدلال السببي (The Fundamental Problem of Causal Inference): في أي بيانات واقعية، يستحيل رصد كلتا النتيجتين للشخص ذاته في نفس اللحظة؛ فالمسار البديل المقابل للواقع"
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
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-rubin-causal-model-potential-outcomes",
          "starterCode": "import numpy as np\n\ndef decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Decomposes the naive difference in means into ATT and Baseline Selection Bias.\n    \"\"\"\n    # TODO: Realize observed outcome y = d * y1 + (1 - d) * y0 and compute metrics\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Decomposes the naive difference in means into ATT and Baseline Selection Bias.\n    \"\"\"\n    # TODO: Realize observed outcome y = d * y1 + (1 - d) * y0 and compute metrics\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef decompose_selection_bias(y0: np.ndarray, y1: np.ndarray, d: np.ndarray) -> dict[str, float]:\n    d_bool = d.astype(bool)\n    y_obs = np.where(d_bool, y1, y0)\n    \n    naive_diff = float(np.mean(y_obs[d_bool]) - np.mean(y_obs[~d_bool]))\n    ate = float(np.mean(y1 - y0))\n    att = float(np.mean(y1[d_bool] - y0[d_bool]))\n    selection_bias = float(np.mean(y0[d_bool]) - np.mean(y0[~d_bool]))\n    \n    return {\n        \"naive_diff\": naive_diff,\n        \"ate\": ate,\n        \"att\": att,\n        \"selection_bias\": selection_bias,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing The Rubin Causal Model & The Fundamental Problem of Causal Inference?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم نموذج روبين السببي والمشكلة الجوهرية للاستدلال السببي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "When journalists or naive analysts compare the average outcomes of treated versus untreated groups, they commit the classic fallacy of confl...",
      "ar": "عندما يقارن الصحفيون أو المحللون السطحيون متوسط نتائج المجموعات المعالجة بمتوسط المجموعات غير المعالجة، فإنهم يقعون في الفخ الكلاسيكي لخلط ا..."
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
          "en": "When journalists or naive analysts compare the average outcomes of treated versus untreated groups, they commit the classic fallacy of conflating correlation with causation. People who go to the hospital are on average sicker than people who stay home; does this mean hospitals cause sickness?\n\nBy mathematically decomposing the naive difference in sample means, we discover that it equals the true Average Treatment Effect on the Treated (ATT) PLUS Selection Bias. Randomized Controlled Trials (RCTs) are considered the gold standard of causal inference precisely because random lottery assignme",
          "ar": "عندما يقارن الصحفيون أو المحللون السطحيون متوسط نتائج المجموعات المعالجة بمتوسط المجموعات غير المعالجة، فإنهم يقعون في الفخ الكلاسيكي لخلط الارتباط بالسببية. فالأشخاص الذين يرتادون المستشفيات هم في المتوسط أكثر مرضًا من الذين يبقون في منازلهم؛ فهل يعني ذلك أن المستشفيات تسبب المرض؟\n\nعند تفكيك الفرق البسيط بين المتوسطين رياضيًا، نكتشف أنه يساوي الأثر السببي الحقيقي (ATT) مضافًا إليه انحياز الاختيار (Selection Bias). تُعد التجارب العشوائية المضبوطة (RCTs) المعيار الذهبي في الاستدلال السببي لأن التخصيص العشوائي بالقرعة يقطع أي صلة بين النتائج المحتملة وقرار تلقي المعالجة، مما يجعل انحياز الاخ"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\Delta_{\\text{naive}} \\equiv \\mathbb{E}[Y_i \\mid D_i = 1] - \\mathbb{E}[Y_i \\mid D_i = 0]",
        "formulaNote": {
          "en": "Core invariant for Selection Bias Decomposition & Randomized Controlled Trials.",
          "ar": "الخاصية الرياضية الجوهرية لـ تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-selection-bias-randomized-trials",
          "starterCode": "import numpy as np\n\ndef compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:\n    \"\"\"\n    Computes the Inverse Probability Weighted (IPW) Average Treatment Effect.\n    \"\"\"\n    # TODO: Clip extreme propensity scores and calculate weighted treatment effect\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:\n    \"\"\"\n    Computes the Inverse Probability Weighted (IPW) Average Treatment Effect.\n    \"\"\"\n    # TODO: Clip extreme propensity scores and calculate weighted treatment effect\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_ipw_ate(y: np.ndarray, d: np.ndarray, ps: np.ndarray, normalized: bool = True) -> float:\n    ps_clipped = np.clip(ps, 1e-4, 1.0 - 1e-4)\n    w1 = d / ps_clipped\n    w0 = (1.0 - d) / (1.0 - ps_clipped)\n    \n    if normalized:\n        mu1 = np.sum(w1 * y) / np.sum(w1)\n        mu0 = np.sum(w0 * y) / np.sum(w0)\n    else:\n        mu1 = np.mean(w1 * y)\n        mu0 = np.mean(w0 * y)\n    return float(mu1 - mu0)"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Selection Bias Decomposition & Randomized Controlled Trials?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تفكيك انحياز الاختيار والتجارب العشوائية المضبوطة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Judea Pearl modernized causal inference by translating counterfactual calculus into non-parametric Directed Acyclic Graphs (DAGs). A DAG enc...",
      "ar": "أحدث جوديا بيرل (Judea Pearl) ثورة في الاستدلال السببي بترجمة حسابات الفروض المقابلة للواقع إلى مخططات بيانية موجهة غير دائرية (DAGs). يجسد ..."
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
          "en": "Judea Pearl modernized causal inference by translating counterfactual calculus into non-parametric Directed Acyclic Graphs (DAGs). A DAG encodes our causal assumptions about the universe: nodes represent random variables, and directed arrows represent direct causal mechanisms.\n\nInformation flows along paths in a graph like electric current. To establish causal identification, we must allow the true causal signal from treatment $X$ to outcome $Y$ to pass, while systematically blocking all non-causal 'back-door' paths. The concept of d-separation provides the definitive mathematical rulebook",
          "ar": "أحدث جوديا بيرل (Judea Pearl) ثورة في الاستدلال السببي بترجمة حسابات الفروض المقابلة للواقع إلى مخططات بيانية موجهة غير دائرية (DAGs). يجسد مخطط DAG فرضياتنا السببية حول العالم: تمثل العقد متغيرات عشوائية، بينما تمثل الأسهم الموجهة آليات سببية مباشرة.\n\nتتدفق المعلومات عبر مسارات الرسم البياني كما يتدفق التيار الكهربائي. ولتحقيق التعريف السببي (Causal Identification)، يجب ضمان وصول الإشارة السببية الصريحة من $X$ إلى $Y$، مع قطع وحظر كافة المسارات الخلفية غير السببية (Back-Door Paths). تضع قواعد الفصل الاتجاهي (d-separation) الشروط الرياضية الدقيقة لذلك:\n1. السلسلة ($X \\to Z \\to Y$): تنقل ال"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "X \\longrightarrow M \\longrightarrow Y",
        "formulaNote": {
          "en": "Core invariant for Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation.",
          "ar": "الخاصية الرياضية الجوهرية لـ المخططات السببية الموجهة غير الدائرية ومسارات الفصل d."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-causal-inference-confounding",
          "starterCode": "import numpy as np\n\ndef backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    \"\"\"\n    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.\n    \"\"\"\n    # TODO: Stratify by z, compute within-stratum treatment effects, weight by P(Z)\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    \"\"\"\n    Estimates causal ATE by adjusting for discrete confounder strata via Backdoor Criterion.\n    \"\"\"\n    # TODO: Stratify by z, compute within-stratum treatment effects, weight by P(Z)\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef backdoor_subclassification_ate(y: np.ndarray, d: np.ndarray, z_strata: np.ndarray) -> float:\n    unique_strata = np.unique(z_strata)\n    n = len(y)\n    ate = 0.0\n    for s in unique_strata:\n        mask_s = (z_strata == s)\n        p_s = np.sum(mask_s) / n\n        y_d1 = y[mask_s & (d == 1)]\n        y_d0 = y[mask_s & (d == 0)]\n        tau_s = float(np.mean(y_d1) - np.mean(y_d0))\n        ate += p_s * tau_s\n    return float(ate)"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Causal Directed Acyclic Graphs (DAGs), Chains, Forks, and d-Separation?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المخططات السببية الموجهة غير الدائرية ومسارات الفصل d؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Joseph Berkson (1946) discovered a bizarre empirical anomaly in hospital statistics: two diseases that were completely unrelated in the gene...",
      "ar": "اكتشف جوزيف بيركسون (Berkson, 1946) ظاهرة غريبة في إحصاءات المستشفيات: مرضان لا صلة بينهما إطلاقًا في المجتمع العام أظهرا ارتباطًا سالبًا قو..."
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
          "en": "Joseph Berkson (1946) discovered a bizarre empirical anomaly in hospital statistics: two diseases that were completely unrelated in the general population showed a strong negative association among hospitalized patients. This phenomenon, generalized by Judea Pearl as Collider Stratification Bias, is one of the most counter-intuitive traps in data science.\n\nA collider occurs when two independent causes $A$ and $B$ both influence a shared outcome $C$ ($A \\to C \\leftarrow B$). When a researcher conditions on $C$ (or filters data by $C$), knowing that $A$ is absent suddenly makes $B$ dramatica",
          "ar": "اكتشف جوزيف بيركسون (Berkson, 1946) ظاهرة غريبة في إحصاءات المستشفيات: مرضان لا صلة بينهما إطلاقًا في المجتمع العام أظهرا ارتباطًا سالبًا قويًا بين المرضى المقيمين في المستشفى. هذه الظاهرة، التي عممها جوديا بيرل لاحقًا تحت مسمى انحياز تكييف المصادم (Collider Stratification Bias)، تعد واحدة من أكثر الفخاخ خداعًا للحدس في علم البيانات.\n\nيحدث المصادم عندما يؤثر سببان مستقلان $A$ و $B$ في نتيجة مشتركة $C$ ($A \\to C \\leftarrow B$). عندما يقتصر الباحث على دراسة شريحة معينة محددة بـ $C$ (أي التكييف على $C$)، فإن معرفة غياب السبب $A$ تجعل وجود السبب $B$ أكثر ترجيحًا لتفسير حدوث $C$. يولّد هذا الإج"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "P(A = 1) = p_A, \\quad P(B = 1) = p_B, \\quad P(A=1, B=1) = p_A p_B",
        "formulaNote": {
          "en": "Core invariant for Collider Conditioning & Berkson's Paradox.",
          "ar": "الخاصية الرياضية الجوهرية لـ تكييف المصادم ومفارقة بيركسون."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-collider-conditioning-berksons",
          "starterCode": "import numpy as np\n\ndef simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.\n    \"\"\"\n    # TODO: Generate independent X and Y, construct collider C, run unconditioned and conditioned OLS\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    \"\"\"\n    Demonstrates Berkson's Fallacy: conditioning on a collider induces spurious correlation.\n    \"\"\"\n    # TODO: Generate independent X and Y, construct collider C, run unconditioned and conditioned OLS\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef simulate_collider_bias(n: int = 1000, seed: int = 42) -> dict[str, float]:\n    rng = np.random.default_rng(seed)\n    X = rng.normal(0, 1, size=n)\n    Y = rng.normal(0, 1, size=n)\n    C = 1.5 * X + 1.5 * Y + rng.normal(0, 0.5, size=n)\n    \n    # Unconditioned regression: Y = b0 + b1 * X\n    X_uncond = np.column_stack([np.ones(n), X])\n    b_uncond = float(np.linalg.lstsq(X_uncond, Y, rcond=None)[0][1])\n    \n    # Conditioned on Collider: Y = b0 + b1 * X + b2 * C\n    X_cond = np.column_stack([np.ones(n), X, C])\n    b_cond = float(np.linalg.lstsq(X_cond, Y, rcond=None)[0][1])\n    \n    return {\"b_uncond\": b_uncond, \"b_cond\": b_cond}"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Collider Conditioning & Berkson's Paradox?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تكييف المصادم ومفارقة بيركسون؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "When an endogenous treatment $D$ is correlated with the error term $\\varepsilon$ due to unobserved confounding, simultaneity, or measurement...",
      "ar": "عندما يكون متغير المعالجة $D$ داخليًا (Endogenous) ومرتبطًا بحد الخطأ $\\varepsilon$ بسبب متغيرات مربكة غير مرصودة، أو تبادل التأثير، أو أخطا..."
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
          "en": "When an endogenous treatment $D$ is correlated with the error term $\\varepsilon$ due to unobserved confounding, simultaneity, or measurement error, OLS fails. The method of Instrumental Variables (IV) provides an ingenious solution: find an external variable $Z$ (the instrument) that acts as an exogenous shock to $D$.\n\nFor an instrument to identify the causal effect, it must satisfy two core conditions: 1. Relevance: $Z$ must have a strong statistical association with the treatment $D$ ($\\text{Cov}(Z, D) \\ne 0$). 2. Exclusion Restriction: $Z$ must affect the outcome $Y$ ONLY through it",
          "ar": "عندما يكون متغير المعالجة $D$ داخليًا (Endogenous) ومرتبطًا بحد الخطأ $\\varepsilon$ بسبب متغيرات مربكة غير مرصودة، أو تبادل التأثير، أو أخطاء القياس، يسقط OLS في التحيز. تقدم طريقة المتغيرات الاداتية (Instrumental Variables - IV) حلاً عبقريًا: البحث عن متغير خارجي $Z$ (الأداة) يعمل كصدمة عشوائية خارجية تحرك $D$.\n\nلكي تنجح الأداة في التعريف السببي، يجب أن تستوفي شرطين جوهريين:\n1. الملاءمة (Relevance): أن ترتبط الأداة $Z$ بقوة مع المعالجة $D$ (أي $\\text{Cov}(Z, D) \\ne 0$).\n2. قيد الاستبعاد (Exclusion Restriction): ألا تؤثر الأداة $Z$ على النتيجة $Y$ إلا من خلال قناة المعالجة $D$ فقط، دون"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "y_i = \\beta_0 + \\beta_1 D_i + \\varepsilon_i, \\quad \\text{Cov}(D_i, \\varepsilon_i) \\ne 0",
        "formulaNote": {
          "en": "Core invariant for Instrumental Variables (IV) Identification & The Wald Estimator.",
          "ar": "الخاصية الرياضية الجوهرية لـ التعريف بالمتغيرات الاداتية ومقدر فالد."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-instrumental-variables-2sls",
          "starterCode": "import numpy as np\n\ndef compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.\n    \"\"\"\n    # TODO: Compute reduced form, first stage compliance, and covariance ratio\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Wald Estimator and first-stage compliance for binary instrumental variables.\n    \"\"\"\n    # TODO: Compute reduced form, first stage compliance, and covariance ratio\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_wald_estimator(y: np.ndarray, d: np.ndarray, z: np.ndarray) -> dict[str, float]:\n    z1 = (z == 1)\n    z0 = (z == 0)\n    del_y = np.mean(y[z1]) - np.mean(y[z0])\n    del_d = np.mean(d[z1]) - np.mean(d[z0])\n    wald = float(del_y / del_d)\n    \n    cov_yz = float(np.cov(y, z, bias=True)[0, 1])\n    cov_dz = float(np.cov(d, z, bias=True)[0, 1])\n    ratio_cov = float(cov_yz / cov_dz)\n    \n    return {\n        \"wald\": wald,\n        \"compliance_rate\": float(del_d),\n        \"ratio_cov\": ratio_cov,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Instrumental Variables (IV) Identification & The Wald Estimator?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التعريف بالمتغيرات الاداتية ومقدر فالد؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "When we have multiple instruments or multiple endogenous regressors alongside exogenous covariates, Two-Stage Least Squares (2SLS) generalis...",
      "ar": "عندما يتوفر لدينا أدوات متعددة أو متغيرات داخلية متعددة إلى جانب ضوابط تحكم خارجية، يعمم مقدر المربعات الصغرى ذات المرحلتين (2SLS) صيغة فالد..."
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
          "en": "When we have multiple instruments or multiple endogenous regressors alongside exogenous covariates, Two-Stage Least Squares (2SLS) generalises the Wald estimator into an optimal projection matrix framework. In stage one, we project endogenous $X$ onto all instruments $Z$ to isolate the exogenous variation $\\hat{X}$. In stage two, we regress $Y$ on $\\hat{X}$.\n\nTwo critical breakthroughs define modern IV practice: 1. Weak Instruments: If the first-stage correlation is low, 2SLS is severely biased towards OLS and standard Wald tests fail. The modern benchmark requires a first-stage $F$-statis",
          "ar": "عندما يتوفر لدينا أدوات متعددة أو متغيرات داخلية متعددة إلى جانب ضوابط تحكم خارجية، يعمم مقدر المربعات الصغرى ذات المرحلتين (2SLS) صيغة فالد في إطار مصفوفات الإسقاط الأمثل. في المرحلة الأولى، نسقط المتغير الداخلي $X$ على الأدوات $Z$ لعزل الجزء الخارجي $\\hat{X}$. وفي المرحلة الثانية، نجري انحدار $Y$ على القيمة المتوقعة $\\hat{X}$.\n\nيحدد ممارسات IV الحديثة ركيزتان أساسيتان:\n1. الأدوات الضعيفة (Weak Instruments): إذا كان ارتباط المرحلة الأولى ضعيفًا، ينحاز 2SLS بقوة نحو OLS وتفقد اختبارات الدلالة صلاحيتها؛ لذا يُشترط إحصاء $F$ للمرحلة الأولى يتجاوز 10 (قاعدة Staiger & Stock) أو يتجاوز 100 وفق"
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
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-two-stage-least-squares-late",
          "starterCode": "import numpy as np\n\ndef fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.\n    \"\"\"\n    # TODO: Stage 1 projection, Stage 2 regression, structural error variance\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits Two-Stage Least Squares (2SLS) with correct structural residuals.\n    \"\"\"\n    # TODO: Stage 1 projection, Stage 2 regression, structural error variance\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_2sls(y: np.ndarray, X: np.ndarray, Z: np.ndarray) -> dict[str, object]:\n    Pz = Z @ np.linalg.inv(Z.T @ Z) @ Z.T\n    X_hat = Pz @ X\n    beta_2sls = np.linalg.solve(X_hat.T @ X_hat, X_hat.T @ y)\n    \n    # Crucial Econometric Rule: Structural residuals must use original X, not X_hat!\n    structural_residuals = y - X @ beta_2sls\n    n, k = X.shape\n    sigma2 = float(np.sum(structural_residuals ** 2) / (n - k))\n    vcov = sigma2 * np.linalg.inv(X.T @ Pz @ X)\n    se = np.sqrt(np.diag(vcov))\n    \n    return {\n        \"beta\": beta_2sls,\n        \"se\": se,\n        \"residuals\": structural_residuals,\n        \"sigma2\": sigma2,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Two-Stage Least Squares (2SLS), Weak Instruments & LATE?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المربعات الصغرى ذات المرحلتين والأدوات الضعيفة ومتوسط الأثر الموضعي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Panel (longitudinal) datasets track the same $N$ economic entities (individuals, firms, countries) over $T$ time periods. The fundamental ec...",
      "ar": "تتتبع بيانات البانل (Panel Data) الوحدات الاقتصادية ذاتها (أفراد، شركات، دول) عبر $T$ من الفترات الزمنية. وتكمن الميزة القياسية الجوهرية لبي..."
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
          "en": "Panel (longitudinal) datasets track the same $N$ economic entities (individuals, firms, countries) over $T$ time periods. The fundamental econometric virtue of panel data is its ability to control for unobserved, time-invariant heterogeneity (e.g. innate ability, corporate culture, geographic destiny) that would otherwise cause severe omitted variable bias.\n\nThe Fixed Effects (FE) within-estimator achieves this without ever measuring the unobserved confounder $\\alpha_i$. By subtracting the entity-specific time mean from each variable (the 'within-transformation'), the time-invariant $\\alph",
          "ar": "تتتبع بيانات البانل (Panel Data) الوحدات الاقتصادية ذاتها (أفراد، شركات، دول) عبر $T$ من الفترات الزمنية. وتكمن الميزة القياسية الجوهرية لبيانات البانل في قدرتها على التخلص التام من عدم التجانس الفردي الثابت مع الزمن (مثل الذكاء الفطري، ثقافة الشركة، الموقع الجغرافي) الذي يسبب انحياز المتغير المغفَل في البيانات المقطعية.\n\nيحقق مقدر الآثار الثابتة (Fixed Effects) ذلك بعبقرية دون الحاجة لقياس المتغير الغائب $\\alpha_i$. من خلال طرح المتوسط الزمني الخاص بكل فرد من متغيراته (التحويل الداخلي Within-Transformation)، يُطرح الثابت $\\alpha_i$ من نفسه ليتلاشى تمامًا من المعادلة! رياضيًا، هذا يكافئ إض"
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
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-panel-data-fixed-effects",
          "starterCode": "import numpy as np\n\ndef fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits a panel fixed-effects regression via the Within-Transformation.\n    \"\"\"\n    # TODO: Demean y and X by entity, solve for beta_fe, and back out entity alphas\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    \"\"\"\n    Fits a panel fixed-effects regression via the Within-Transformation.\n    \"\"\"\n    # TODO: Demean y and X by entity, solve for beta_fe, and back out entity alphas\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_panel_fe(y: np.ndarray, X: np.ndarray, entity_ids: np.ndarray) -> dict[str, object]:\n    unique_entities = np.unique(entity_ids)\n    y_tilde = np.zeros_like(y)\n    X_tilde = np.zeros_like(X)\n    \n    for ent in unique_entities:\n        mask = (entity_ids == ent)\n        y_tilde[mask] = y[mask] - np.mean(y[mask])\n        X_tilde[mask] = X[mask] - np.mean(X[mask], axis=0)\n        \n    beta_fe = np.linalg.solve(X_tilde.T @ X_tilde, X_tilde.T @ y_tilde)\n    \n    alphas = {}\n    for ent in unique_entities:\n        mask = (entity_ids == ent)\n        y_bar_i = np.mean(y[mask])\n        x_bar_i = np.mean(X[mask], axis=0)\n        alphas[int(ent)] = float(y_bar_i - x_bar_i @ beta_fe)\n        \n    return {\n        \"beta_fe\": beta_fe,\n        \"alphas\": alphas,\n        \"y_tilde\": y_tilde,\n        \"X_tilde\": X_tilde,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Panel Fixed Effects (Within Estimator) & De-meaning Geometry?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الآثار الثابتة لبيانات البانل ومقدر التحويل الداخلي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "While Fixed Effects treats $\\alpha_i$ as an arbitrary nuisance parameter allowed to correlate with $\\mathbf{X}$, the Random Effects (RE) mod...",
      "ar": "بينما يتعامل نموذج الآثار الثابتة مع $\\alpha_i$ كمعلمة عشوائية يُسمح بارتباطها بالمتغيرات المفسرة $\\mathbf{X}$، يفترض نموذج الآثار العشوائية..."
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
          "en": "While Fixed Effects treats $\\alpha_i$ as an arbitrary nuisance parameter allowed to correlate with $\\mathbf{X}$, the Random Effects (RE) model assumes that $\\alpha_i$ is completely uncorrelated with the regressors. If this exogeneity assumption holds, RE is vastly more efficient than FE because it exploits both between-entity and within-entity variation via Generalized Least Squares (GLS) partial de-meaning.\n\nHow do empirical researchers choose between FE and RE? The Hausman Specification Test compares the two estimators. Under the null hypothesis of exogeneity, both FE and RE are cons",
          "ar": "بينما يتعامل نموذج الآثار الثابتة مع $\\alpha_i$ كمعلمة عشوائية يُسمح بارتباطها بالمتغيرات المفسرة $\\mathbf{X}$، يفترض نموذج الآثار العشوائية (Random Effects - RE) أن $\\alpha_i$ مستقل تمامًا عن المتغيرات المستقلة. وفي حال تحقق هذا الفرض، يكون مقدر RE أكثر كفاءة إحصائية بكثير من FE لأنه يستغل التباين بين الوحدات وداخلها معًا عبر المربعات الصغرى المعممة (GLS) مع تحويل جزئي للمتوسطات.\n\nكيف يحسم الباحث المفاضلة بين FE و RE؟ يقدم اختبار هاوسمان (Hausman Test) الفيصل الرياضي: في ظل فرضية العدم (الاستقلال التام)، كلا المقدرين متسقان ولكن RE هو الأكثر كفاءة. وفي ظل الفرضية البديلة، يظل FE متسقً"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\boldsymbol{\\Sigma}_i = \\mathbb{E}[\\mathbf{v}_i \\mathbf{v}_i^T] = \\sigma_{\\varepsilon}^2 \\mathbf{I}_T + \\sigma_{\\alpha}^2 \\boldsymbol{\\iota}_T \\boldsymbol{\\iota}_T^T",
        "formulaNote": {
          "en": "Core invariant for Random Effects, First-Differencing, and the Hausman Test.",
          "ar": "الخاصية الرياضية الجوهرية لـ الآثار العشوائية والفروق الأولى واختبار هاوسمان."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-random-effects-hausman-test",
          "starterCode": "import numpy as np\n\ndef compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman quadratic test statistic comparing FE and RE estimates.\n    \"\"\"\n    # TODO: Calculate parameter difference and inverted variance difference\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes the Hausman quadratic test statistic comparing FE and RE estimates.\n    \"\"\"\n    # TODO: Calculate parameter difference and inverted variance difference\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_hausman_test(beta_fe: np.ndarray, vcov_fe: np.ndarray, beta_re: np.ndarray, vcov_re: np.ndarray) -> dict[str, float]:\n    diff = beta_fe - beta_re\n    v_diff = vcov_fe - vcov_re\n    h_stat = float(diff.T @ np.linalg.inv(v_diff) @ diff)\n    df = len(beta_fe)\n    return {\"h_stat\": h_stat, \"df\": float(df)}"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Random Effects, First-Differencing, and the Hausman Test?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الآثار العشوائية والفروق الأولى واختبار هاوسمان؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "Difference-in-Differences (DiD) is the workhorse quasi-experimental design of modern empirical economics. Card and Krueger (1994) popularize...",
      "ar": "يُعد أسلوب 'الفرق في الفروق' (Difference-in-Differences - DiD) العمود الفقري للتجارب شبه الطبيعية في الاقتصاد التطبيقي. اشتهرت الطريقة في در..."
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
          "en": "Difference-in-Differences (DiD) is the workhorse quasi-experimental design of modern empirical economics. Card and Krueger (1994) popularized the method by analyzing New Jersey's minimum wage increase compared to neighboring Pennsylvania fast-food restaurants. DiD overcomes the flaws of simple before-and-after studies and simple cross-sectional comparisons by subtracting the pre-existing baseline trend of a control group from the post-treatment change of the treated group.\n\nThe entire identification rests upon the unobservable Parallel Trends Assumption: in the absence of treatment, the av",
          "ar": "يُعد أسلوب 'الفرق في الفروق' (Difference-in-Differences - DiD) العمود الفقري للتجارب شبه الطبيعية في الاقتصاد التطبيقي. اشتهرت الطريقة في دراسة كارد وكروغر (Card & Krueger, 1994) للأثر التوظيفي لرفع الحد الأدنى للأجور في نيوجيرسي مقارنة بولاية بنسلفانيا المجاورة. يتجاوز DiD عيوب المقارنات الزمنية البسيطة والمقارنات المقطعية من خلال طرح المسار الزمني للمجموعة الضابطة من التغير الحادث في المجموعة المعالجة.\n\nيرتكز التعريف السببي بالكامل على فرضية مسار التوازي (Parallel Trends Assumption) غير القابلة للاختبار المباشر: وهي أنه لولا المعالجة، لكان مسار تطور المجموعة المعالجة قد تطابق تمامًا وبشك"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\bar{Y}_{g, t} \\equiv \\mathbb{E}[Y_{it} \\mid G_i = g, T_t = t]",
        "formulaNote": {
          "en": "Core invariant for Canonical 2x2 Difference-in-Differences & Parallel Trends.",
          "ar": "الخاصية الرياضية الجوهرية لـ الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-difference-in-differences-2x2",
          "starterCode": "import numpy as np\n\ndef compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.\n    \"\"\"\n    # TODO: Compute 4 cell means, DiD, interaction regression, and counterfactual\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    \"\"\"\n    Computes canonical 2x2 Difference-in-Differences and checks regression equivalence.\n    \"\"\"\n    # TODO: Compute 4 cell means, DiD, interaction regression, and counterfactual\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_did_2x2(y: np.ndarray, treat: np.ndarray, post: np.ndarray) -> dict[str, float]:\n    y11 = float(np.mean(y[(treat == 1) & (post == 1)]))\n    y10 = float(np.mean(y[(treat == 1) & (post == 0)]))\n    y01 = float(np.mean(y[(treat == 0) & (post == 1)]))\n    y00 = float(np.mean(y[(treat == 0) & (post == 0)]))\n    \n    delta_did = (y11 - y10) - (y01 - y00)\n    counterfactual = y10 + (y01 - y00)\n    \n    X = np.column_stack([np.ones_like(y), treat, post, treat * post])\n    beta_reg = np.linalg.solve(X.T @ X, X.T @ y)\n    \n    return {\n        \"delta_did\": delta_did,\n        \"beta_interaction\": float(beta_reg[3]),\n        \"counterfactual\": counterfactual,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Canonical 2x2 Difference-in-Differences & Parallel Trends?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الفرق في الفروق الكلاسيكي 2x2 ومسار التوازي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "titleAr": "الفرق في الفروق المتدرج وانهيار نموذج الآثار الثابتة الثنائي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Between 2018 and 2021, an econometric revolution swept empirical economics. For three decades, researchers analyzed policies adopted across ...",
      "ar": "بين عامي 2018 و 2021، اجتاحت الاقتصاد القياسي ثورة منهجية كبرى. لعقود طويلة، قام الباحثون بتحليل السياسات المطبقة في أوقات متفرقة عبر ولايات..."
    },
    "prerequisites": [
      "difference-in-differences-2x2"
    ],
    "x": 790,
    "y": 1695,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "StaggeredDiDEventStudyLab",
        "narrative": {
          "en": "Between 2018 and 2021, an econometric revolution swept empirical economics. For three decades, researchers analyzed policies adopted across different states at different times (staggered rollout) using standard Two-Way Fixed Effects (TWFE) regressions: $y_{it} = \\alpha_i + \\lambda_t + \\beta^{\\text{TWFE}} D_{it} + \\varepsilon_{it}$.\n\nGoodman-Bacon (2021) and Sun & Abraham (2021) proved that $\\hat{\\beta}^{\\text{TWFE}}$ is a weighted average of all possible $2 \\times 2$ DiD comparisons. Crucially, under staggered adoption and dynamic treatment effects (effects growing over time), already-treated",
          "ar": "بين عامي 2018 و 2021، اجتاحت الاقتصاد القياسي ثورة منهجية كبرى. لعقود طويلة، قام الباحثون بتحليل السياسات المطبقة في أوقات متفرقة عبر ولايات مختلفة (Staggered Adoption) باستخدام نموذج الآثار الثابتة ثنائي الاتجاه (TWFE): $y_{it} = \\alpha_i + \\lambda_t + \\beta^{\\text{TWFE}} D_{it} + \\varepsilon_{it}$.\n\nأثبت غودمان-بيكون (Goodman-Bacon, 2021) أن مقدر TWFE هو متوسط مرجح لجميع مقارنات DiD الممكنة. وعندما تتفاوت تواريخ التطبيق وتتغير آثار السياسة بمرور الوقت، تُستخدم الوحدات المعالجة مبكرًا كمجموعات ضابطة للوحدات المعالجة لاحقًا، مما يولد أوزانًا سالبة (Negative Weights)! قد يؤدي ذلك إلى ظه"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\hat{\\beta}^{\\text{TWFE}} = \\sum_{k \\ne U} s_{kU} \\hat{\\beta}_{kU}^{\\text{DiD}} + \\sum_{k < l} \\left[ s_{kl}^k \\hat{\\beta}_{kl}^{k, \\text{DiD}} + s_{kl}^l \\hat{\\beta}_{kl}^{l, \\text{DiD}} \\right]",
        "formulaNote": {
          "en": "Core invariant for Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna.",
          "ar": "الخاصية الرياضية الجوهرية لـ الفرق في الفروق المتدرج وانهيار نموذج الآثار الثابتة الثنائي."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-staggered-did-callaway-santanna",
          "starterCode": "import numpy as np\n\ndef fit_did_event_study(y: np.ndarray, rel_time: np.ndarray, treat: np.ndarray, ref_period: int = -1) -> dict[int, float]:\n    \"\"\"\n    Estimates dynamic DiD leads and lags, omitting ref_period to test parallel trends.\n    \"\"\"\n    # TODO: Build relative time dummies, omit ref_period, fit OLS\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_did_event_study(y: np.ndarray, rel_time: np.ndarray, treat: np.ndarray, ref_period: int = -1) -> dict[int, float]:\n    \"\"\"\n    Estimates dynamic DiD leads and lags, omitting ref_period to test parallel trends.\n    \"\"\"\n    # TODO: Build relative time dummies, omit ref_period, fit OLS\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_did_event_study(y: np.ndarray, rel_time: np.ndarray, treat: np.ndarray, ref_period: int = -1) -> dict[int, float]:\n    unique_times = sorted(np.unique(rel_time))\n    periods = [t for t in unique_times if t != ref_period]\n    \n    dummy_cols = []\n    for t in periods:\n        dummy_cols.append(((rel_time == t) & (treat == 1)).astype(float))\n        \n    X = np.column_stack([np.ones_like(y)] + dummy_cols)\n    beta = np.linalg.lstsq(X, y, rcond=None)[0]\n    \n    coef_dict = {ref_period: 0.0}\n    for idx, t in enumerate(periods):\n        coef_dict[t] = float(beta[idx + 1])\n        \n    return coef_dict"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Staggered DiD, TWFE Breakdown & Callaway-Sant'Anna?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الفرق في الفروق المتدرج وانهيار نموذج الآثار الثابتة الثنائي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "titleAr": "تصميم الانقطاع في الانحدار الحاد والانحدار الخطي الموضعي",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Regression Discontinuity Design (RDD), pioneered by Thistlethwaite and Campbell (1960), is widely regarded as having the highest internal va...",
      "ar": "يُعتبر تصميم الانقطاع في الانحدار (Regression Discontinuity Design - RDD)، الذي ابتكره ثيسلثويت وكامبل (1960)، الأعلى موثوقية وصلاحية داخلية..."
    },
    "prerequisites": [
      "causal-inference-confounding"
    ],
    "x": 770,
    "y": 1790,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SharpRDDCutoffLab",
        "narrative": {
          "en": "Regression Discontinuity Design (RDD), pioneered by Thistlethwaite and Campbell (1960), is widely regarded as having the highest internal validity among all quasi-experimental methods. In a Sharp RDD, treatment assignment is a deterministic step-function of a continuous 'running' variable $X$ crossing an arbitrary cutoff $c$ ($D_i = \\mathbf{1}(X_i \\ge c)$).\n\nThe identifying intuition is that agents just barely below the cutoff ($c - \\epsilon$) and agents just barely above the cutoff ($c + \\epsilon$) are virtually identical in all unobserved characteristics. Any discontinuous jump in the ou",
          "ar": "يُعتبر تصميم الانقطاع في الانحدار (Regression Discontinuity Design - RDD)، الذي ابتكره ثيسلثويت وكامبل (1960)، الأعلى موثوقية وصلاحية داخلية بين جميع أساليب التجارب شبه الطبيعية. في الانقطاع الحاد (Sharp RDD)، تكون المعالجة دالة محددة وحتمية لمتغير فرز مستمر $X$ يتجاوز حدًا فاصلًا $c$ ($D_i = \\mathbf{1}(X_i \\ge c)$).\n\nتقوم الفكرة الجوهرية على أن الأفراد الواقعين مباشرة أسفل العتبة ($c - \\epsilon$) وأولئك الواقعين مباشرة أعلاها ($c + \\epsilon$) متشابهون تمامًا في كافة خصائصهم غير المرصودة. بالتالي، فإن أي قفزة غير متصلة (Discontinuous Jump) في النتيجة $Y$ عند العتبة تُعزى حصريًا إلى أثر الم"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "D_i = \\begin{cases} 1 & \\text{if } X_i \\ge c \\\\ 0 & \\text{if } X_i < c \\end{cases}",
        "formulaNote": {
          "en": "Core invariant for Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression.",
          "ar": "الخاصية الرياضية الجوهرية لـ تصميم الانقطاع في الانحدار الحاد والانحدار الخطي الموضعي."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-regression-discontinuity-sharp",
          "starterCode": "import numpy as np\n\ndef fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, cutoff: float, bandwidth: float) -> dict[str, float]:\n    \"\"\"\n    Estimates Sharp RDD treatment effect using local linear triangular kernel regression.\n    \"\"\"\n    # TODO: Center running variable, construct triangular weights, solve weighted least squares\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, cutoff: float, bandwidth: float) -> dict[str, float]:\n    \"\"\"\n    Estimates Sharp RDD treatment effect using local linear triangular kernel regression.\n    \"\"\"\n    # TODO: Center running variable, construct triangular weights, solve weighted least squares\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_sharp_rdd_local_linear(y: np.ndarray, x: np.ndarray, cutoff: float, bandwidth: float) -> dict[str, float]:\n    x_tilde = x - cutoff\n    mask = np.abs(x_tilde) <= bandwidth\n    y_sub = y[mask]\n    x_sub = x_tilde[mask]\n    d_sub = (x_sub >= 0).astype(float)\n    \n    # Triangular kernel weights\n    w = 1.0 - (np.abs(x_sub) / bandwidth)\n    W = np.diag(w)\n    \n    # Design matrix: [1, D, x_tilde, D * x_tilde]\n    X_mat = np.column_stack([np.ones_like(x_sub), d_sub, x_sub, d_sub * x_sub])\n    beta = np.linalg.solve(X_mat.T @ W @ X_mat, X_mat.T @ W @ y_sub)\n    \n    tau = float(beta[1])\n    intercept_left = float(beta[0])\n    intercept_right = float(beta[0] + beta[1])\n    \n    return {\n        \"tau_rdd\": tau,\n        \"intercept_left\": intercept_left,\n        \"intercept_right\": intercept_right,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Sharp Regression Discontinuity Design (SRDD) & Local Linear Regression?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تصميم الانقطاع في الانحدار الحاد والانحدار الخطي الموضعي؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "titleAr": "الانقطاع في الانحدار الضبابي وفحص ماكراري لتلاعب الكثافة",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In many real-world applications, crossing a threshold does not guarantee treatment; it merely changes the PROBABILITY of treatment (e.g. eli...",
      "ar": "في العديد من التطبيقات الواقعية، لا يضمن تجاوز العتبة تلقي المعالجة بشكل حتمي، بل يغير احتمالية تلقيها فقط (مثل شروط الأهلية أو عروض المنح ا..."
    },
    "prerequisites": [
      "regression-discontinuity-sharp"
    ],
    "x": 790,
    "y": 1885,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "FuzzyRDDBandwidthLab",
        "narrative": {
          "en": "In many real-world applications, crossing a threshold does not guarantee treatment; it merely changes the PROBABILITY of treatment (e.g. eligibility rules, financial aid offers). This is Fuzzy RDD. Remarkably, Fuzzy RDD is mathematically identical to a Local Instrumental Variable / Wald ratio, where crossing the threshold $T_i = \\mathbf{1}(X_i \\ge c)$ serves as an instrument for actual treatment receipt $D_i$.\n\nHowever, the entire credibility of RDD collapses if individuals can self-select or manipulate their score to sneak past the cutoff. Justin McCrary (2008) developed the foundational",
          "ar": "في العديد من التطبيقات الواقعية، لا يضمن تجاوز العتبة تلقي المعالجة بشكل حتمي، بل يغير احتمالية تلقيها فقط (مثل شروط الأهلية أو عروض المنح الدراسية). يُعرف هذا بـ الانقطاع الضبابي (Fuzzy RDD). من الناحية الرياضية، يتطابق الانقطاع الضبابي تمامًا مع مقدر المتغيرات الاداتية الموضعي (Local IV / Wald Ratio)، حيث يعمل تجاوز العتبة $T_i = \\mathbf{1}(X_i \\ge c)$ كأداة للمتغير الفعلي $D_i$.\n\nومع ذلك، تنهار مصداقية RDD بالكامل إذا تمكن الأفراد من التلاعب بدرجاتهم للقفز فوق العتبة الفاصلة. ابتكر جاستن ماكراري (McCrary, 2008) الفحص التشخيصي الأشهر: اختبار وجود قفزة مفاجئة في دالة كثافة المتغير الف"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "P(D_i = 1 \\mid X_i = x) = \\begin{cases} g_1(x) & \\text{if } x \\ge c \\\\ g_0(x) & \\text{if } x < c \\end{cases} \\quad \\text{where } \\lim_{x \\downarrow c} g_1(x) \\ne \\lim_{x \\uparrow c} g_0(x)",
        "formulaNote": {
          "en": "Core invariant for Fuzzy RDD & McCrary Density Sorting Diagnostic.",
          "ar": "الخاصية الرياضية الجوهرية لـ الانقطاع في الانحدار الضبابي وفحص ماكراري لتلاعب الكثافة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-fuzzy-rdd-mccrary-sorting",
          "starterCode": "import numpy as np\n\ndef compute_density_discontinuity(x: np.ndarray, cutoff: float, bin_width: float) -> dict[str, float]:\n    \"\"\"\n    Computes boundary bin densities and log density jump for the McCrary Sorting Test.\n    \"\"\"\n    # TODO: Calculate normalized frequency in cutoff boundary bins and log-ratio theta\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_density_discontinuity(x: np.ndarray, cutoff: float, bin_width: float) -> dict[str, float]:\n    \"\"\"\n    Computes boundary bin densities and log density jump for the McCrary Sorting Test.\n    \"\"\"\n    # TODO: Calculate normalized frequency in cutoff boundary bins and log-ratio theta\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_density_discontinuity(x: np.ndarray, cutoff: float, bin_width: float) -> dict[str, float]:\n    count_left = np.sum((x >= cutoff - bin_width) & (x < cutoff))\n    count_right = np.sum((x >= cutoff) & (x <= cutoff + bin_width))\n    n = len(x)\n    \n    density_left = float(count_left / (n * bin_width))\n    density_right = float(count_right / (n * bin_width))\n    \n    theta = float(np.log(max(density_right, 1e-9)) - np.log(max(density_left, 1e-9)))\n    \n    return {\n        \"density_left\": density_left,\n        \"density_right\": density_right,\n        \"theta\": theta,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Fuzzy RDD & McCrary Density Sorting Diagnostic?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الانقطاع في الانحدار الضبابي وفحص ماكراري لتلاعب الكثافة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "titleAr": "طريقة التحكم الاصطناعي لأباديه وزملائه",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "In comparative case studies, researchers frequently evaluate policies implemented in a SINGLE aggregate unit (e.g. California's Proposition ...",
      "ar": "في دراسات الحالات المقارنة، غالبًا ما يواجه الباحثون سياسات طُبقت في وحدة جغرافية كلية واحدة (مثل ضريبة التبغ في كاليفورنيا عام 1988، أو إعا..."
    },
    "prerequisites": [
      "difference-in-differences-2x2",
      "multiple-regression-matrix-calculus"
    ],
    "x": 770,
    "y": 1980,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SyntheticControlDonorLab",
        "narrative": {
          "en": "In comparative case studies, researchers frequently evaluate policies implemented in a SINGLE aggregate unit (e.g. California's Proposition 99 tobacco tax, German reunification in 1990, or the Basque country terrorism). Finding a single unaffected region that mirrors the treated unit's exact trajectory is practically impossible.\n\nAlberto Abadie and coauthors introduced the Synthetic Control Method (SCM), hailed by Susan Athey as 'the most important innovation in policy evaluation literature in the last 15 years.' SCM constructs a data-driven convex combination of unaffected 'donor' units.",
          "ar": "في دراسات الحالات المقارنة، غالبًا ما يواجه الباحثون سياسات طُبقت في وحدة جغرافية كلية واحدة (مثل ضريبة التبغ في كاليفورنيا عام 1988، أو إعادة توحيد ألمانيا عام 1990، أو إقليم الباسك). ومن المستحيل عمليًا العثور على ولاية أو دولة منفردة تشبه مسار الوحدة المعالجة تمامًا.\n\nابتكر ألبرتو أباديه (Abadie et al.) طريقة التحكم الاصطناعي (Synthetic Control Method - SCM)، والتي وصفتها سوزان أثي بأنها 'أهم ابتكار منهجي في تقييم السياسات خلال الـ 15 عامًا الماضية'. تقوم الطريقة على بناء تركيبة خطية محدبة (Convex Combination) من وحدات مانحة غير متأثرة بالسياسة. عبر حل مسألة استمثال مقيدة، تحسب الطريقة"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\mathbf{W}} \\|\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W}\\|_{\\mathbf{V}} = \\sqrt{(\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W})^T \\mathbf{V} (\\mathbf{X}_1 - \\mathbf{X}_0 \\mathbf{W})}",
        "formulaNote": {
          "en": "Core invariant for The Synthetic Control Method (Abadie et al.).",
          "ar": "الخاصية الرياضية الجوهرية لـ طريقة التحكم الاصطناعي لأباديه وزملائه."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-synthetic-control-method",
          "starterCode": "import numpy as np\n\ndef fit_synthetic_control(X1: np.ndarray, X0: np.ndarray, max_iter: int = 500, lr: float = 0.05) -> np.ndarray:\n    \"\"\"\n    Computes optimal donor weights for Synthetic Control via simplex projection.\n    \"\"\"\n    # TODO: Optimize w over the unit simplex to minimize pre-treatment L2 error\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_synthetic_control(X1: np.ndarray, X0: np.ndarray, max_iter: int = 500, lr: float = 0.05) -> np.ndarray:\n    \"\"\"\n    Computes optimal donor weights for Synthetic Control via simplex projection.\n    \"\"\"\n    # TODO: Optimize w over the unit simplex to minimize pre-treatment L2 error\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_synthetic_control(X1: np.ndarray, X0: np.ndarray, max_iter: int = 500, lr: float = 0.05) -> np.ndarray:\n    J = X0.shape[1]\n    # Parameterize via unconstrained softmax weights theta to guarantee simplex constraints\n    theta = np.zeros(J)\n    \n    for _ in range(max_iter):\n        w = np.exp(theta - np.max(theta))\n        w /= np.sum(w)\n        residual = X1 - X0 @ w\n        # Gradient with respect to w: - X0^T residual\n        grad_w = - (X0.T @ residual)\n        # Gradient with respect to theta via Softmax Jacobian:\n        grad_theta = w * (grad_w - np.dot(w, grad_w))\n        theta -= lr * grad_theta\n        \n    w_final = np.exp(theta - np.max(theta))\n    return w_final / np.sum(w_final)"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing The Synthetic Control Method (Abadie et al.)?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم طريقة التحكم الاصطناعي لأباديه وزملائه؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "titleAr": "الاستدلال الإحصائي للتحكم الاصطناعي واختبارات التباديل المكانية والزمنية",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Because the Synthetic Control Method is applied to aggregate macro data with only ONE treated unit ($N=1$), classical large-sample asymptoti...",
      "ar": "نظرًا لأن طريقة التحكم الاصطناعي تُطبق على بيانات كلية بوحدة معالجة واحدة فقط ($N=1$)، فإن نظريات العينات الكبيرة واختبارات $t$ الكلاسيكية ت..."
    },
    "prerequisites": [
      "synthetic-control-method"
    ],
    "x": 790,
    "y": 2075,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SCMPlaceboPermutationLab",
        "narrative": {
          "en": "Because the Synthetic Control Method is applied to aggregate macro data with only ONE treated unit ($N=1$), classical large-sample asymptotic $t$-tests and standard errors are mathematically inapplicable. How can a researcher determine if California's tobacco reduction is statistically significant, or just random noise?\n\nAbadie, Diamond, and Hainmueller (2010) introduced Permutation Inference (Placebo Tests): 1. In-Space Placebos: Sequentially apply SCM to every single donor state in the control pool as if it had passed the policy. If California's gap is vastly larger than all the plac",
          "ar": "نظرًا لأن طريقة التحكم الاصطناعي تُطبق على بيانات كلية بوحدة معالجة واحدة فقط ($N=1$)، فإن نظريات العينات الكبيرة واختبارات $t$ الكلاسيكية تصبح غير قابلة للتطبيق رياضيًا. فكيف يمكن للباحث الجزم بأن انخفاض استهلاك السجائر في كاليفورنيا ذو دلالة إحصائية وليس مجرد صدفة؟\n\nابتكر أباديه وزملاؤه اختبارات التباديل الوهمية (Placebo Permutation Tests):\n1. الوهم المكاني (In-Space Placebo): تطبيق خوارزمية SCM بالتتابع على كل ولاية مانحة كأنها تلقت السياسة فعلاً. إذا كان الانحراف في كاليفورنيا أكبر بكثير من كل الولايات الوهمية، فإن الأثر حقيقي.\n2. نسبة RMSPE: مقارنة نسبة خطأ ما بعد التدخل إلى خ"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{RMSPE}_{\\text{pre}} = \\sqrt{\\frac{1}{T_0} \\sum_{t=1}^{T_0} \\left( Y_{1t} - \\sum_{j=2}^{J+1} w_j^* Y_{jt} \\right)^2}",
        "formulaNote": {
          "en": "Core invariant for Synthetic Controls Inference & In-Space / In-Time Permutation Tests.",
          "ar": "الخاصية الرياضية الجوهرية لـ الاستدلال الإحصائي للتحكم الاصطناعي واختبارات التباديل المكانية والزمنية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-synthetic-control-placebo-tests",
          "starterCode": "import numpy as np\n\ndef compute_rmspe_ratio_test(pre_loss: np.ndarray, post_loss: np.ndarray, treated_idx: int = 0) -> dict[str, object]:\n    \"\"\"\n    Computes RMSPE ratios and exact permutation p-value across treated and placebo donors.\n    \"\"\"\n    # TODO: Compute RMSPE post/pre ratios and empirical rank p-value\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_rmspe_ratio_test(pre_loss: np.ndarray, post_loss: np.ndarray, treated_idx: int = 0) -> dict[str, object]:\n    \"\"\"\n    Computes RMSPE ratios and exact permutation p-value across treated and placebo donors.\n    \"\"\"\n    # TODO: Compute RMSPE post/pre ratios and empirical rank p-value\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_rmspe_ratio_test(pre_loss: np.ndarray, post_loss: np.ndarray, treated_idx: int = 0) -> dict[str, object]:\n    rmspe_pre = np.sqrt(pre_loss)\n    rmspe_post = np.sqrt(post_loss)\n    ratios = rmspe_post / (rmspe_pre + 1e-12)\n    \n    treated_ratio = float(ratios[treated_idx])\n    p_value = float(np.mean(ratios >= treated_ratio))\n    \n    return {\n        \"ratios\": ratios,\n        \"treated_ratio\": treated_ratio,\n        \"p_value\": p_value,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Synthetic Controls Inference & In-Space / In-Time Permutation Tests?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الاستدلال الإحصائي للتحكم الاصطناعي واختبارات التباديل المكانية والزمنية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
      "en": "When features are highly collinear or when the number of features $P$ approaches the sample size $N$, the design matrix $\\mathbf{X}^T \\mathb...",
      "ar": "عندما تتداخل المتغيرات التفسيرية بشدة (التعدد الخطي) أو يقترب عدد المتغيرات $P$ من حجم العينة $N$، تصبح المصفوفة $\\mathbf{X}^T \\mathbf{X}$ ش..."
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
        "simulation": "RidgeL2GeometryCanvas",
        "narrative": {
          "en": "When features are highly collinear or when the number of features $P$ approaches the sample size $N$, the design matrix $\\mathbf{X}^T \\mathbf{X}$ becomes ill-conditioned, causing the OLS variance $(\\mathbf{X}^T \\mathbf{X})^{-1} \\sigma^2$ to explode to infinity. Small perturbations in the data result in wild swings in estimated coefficients.\n\nHoerl and Kennard (1970) introduced Ridge Regression ($L_2$ regularization) to solve this instability. By adding a spherical quadratic penalty $\\lambda \\|\\boldsymbol{\\beta}\\|_2^2$ to the SSR loss, Ridge conditions the singular values of the system. Thr",
          "ar": "عندما تتداخل المتغيرات التفسيرية بشدة (التعدد الخطي) أو يقترب عدد المتغيرات $P$ من حجم العينة $N$، تصبح المصفوفة $\\mathbf{X}^T \\mathbf{X}$ شبه شاذة (Ill-conditioned)، مما يؤدي إلى تضخم تباين OLS نحو اللانهاية. ينتج عن ذلك تذبذب هائل في المعلمات التقديرية عند أي تغير طفيف في البيانات.\n\nابتكر هورل وكينارد (1970) انحدار ريدج (Ridge Regression) لعلاج عدم الاستقرار هذا. بإضافة جزاء تربيعي دائري $\\lambda \\|\\boldsymbol{\\beta}\\|_2^2$ إلى دالة المربعات الصغرى، يضبط ريدج القيم المنفردة للمصفوفة. ومن خلال تفكيك القيم المنفردة (SVD)، يقوم ريدج بتقليص المعلمات على طول اتجاهات المكونات الرئيسية عكسيًا م"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\boldsymbol{\\beta}} \\mathcal{L}_{\\text{Ridge}}(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\|\\boldsymbol{\\beta}\\|_2^2",
        "formulaNote": {
          "en": "Core invariant for Ridge Regression (L2) & SVD Spectral Shrinkage.",
          "ar": "الخاصية الرياضية الجوهرية لـ انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-ridge-lasso",
          "starterCode": "import numpy as np\n\ndef fit_ridge_svd(X: np.ndarray, y: np.ndarray, alpha: float) -> dict[str, object]:\n    \"\"\"\n    Fits Ridge regression using closed-form Normal Equations and computes SVD shrinkage.\n    \"\"\"\n    # TODO: Solve (X^T X + alpha * I) beta = X^T y, compute SVD shrinkage and df_effective\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_ridge_svd(X: np.ndarray, y: np.ndarray, alpha: float) -> dict[str, object]:\n    \"\"\"\n    Fits Ridge regression using closed-form Normal Equations and computes SVD shrinkage.\n    \"\"\"\n    # TODO: Solve (X^T X + alpha * I) beta = X^T y, compute SVD shrinkage and df_effective\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_ridge_svd(X: np.ndarray, y: np.ndarray, alpha: float) -> dict[str, object]:\n    n, p = X.shape\n    beta_ridge = np.linalg.solve(X.T @ X + alpha * np.eye(p), X.T @ y)\n    \n    U, s, Vt = np.linalg.svd(X, full_matrices=False)\n    shrinkage = (s ** 2) / (s ** 2 + alpha)\n    df_effective = float(np.sum(shrinkage))\n    \n    return {\n        \"beta_ridge\": beta_ridge,\n        \"shrinkage\": shrinkage,\n        \"df_effective\": df_effective,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Ridge Regression (L2) & SVD Spectral Shrinkage?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم انحدار ريدج والانكماش الطيفي عبر تفكيك القيم المنفردة؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Lasso Regression (L1), Polyhedral Geometry & Sparsity",
    "titleAr": "انحدار لاسو وهندسة متعددات الوجوه وانعدام المعلمات",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Ridge regression shrinks coefficients continuously towards zero, it NEVER sets any coefficient to exactly zero. In high-dimensional se...",
      "ar": "بينما يقوم انحدار ريدج بتقليص المعلمات باستمرار نحو الصفر، إلا أنه لا يجعل أي معلمة تساوي الصفر الحقيقي إطلاقًا. وفي البيانات عالية الأبعاد ..."
    },
    "prerequisites": [
      "ridge-lasso"
    ],
    "x": 805,
    "y": 2265,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RegularizationGeometryCanvas",
        "narrative": {
          "en": "While Ridge regression shrinks coefficients continuously towards zero, it NEVER sets any coefficient to exactly zero. In high-dimensional settings where $P > N$ (genomics, text processing, macro forecasting), we require true feature selection. Robert Tibshirani (1996) introduced the Lasso (Least Absolute Shrinkage and Selection Operator), replacing the $L_2$ penalty with an $L_1$ norm $\\lambda \\sum |\\beta_j|$.\n\nThe magic of Lasso lies in its polyhedral geometry: the $L_1$ ball is a cross-polytope with sharp vertices on the coordinate axes. When the elliptical OLS loss contours expand, they",
          "ar": "بينما يقوم انحدار ريدج بتقليص المعلمات باستمرار نحو الصفر، إلا أنه لا يجعل أي معلمة تساوي الصفر الحقيقي إطلاقًا. وفي البيانات عالية الأبعاد حيث $P > N$ (علم الجينوم، معالجة النصوص، التنبؤ الكلي)، نحتاج إلى اختيار حقيقي للمتغيرات. ابتكر روبرت تيبشيراني (Tibshirani, 1996) انحدار لاسو (Lasso)، مستبدلاً جزاء $L_2$ بمعيار القيمة المطلقة $L_1$: $\\lambda \\sum |\\beta_j|$.\n\nيكمن سحر لاسو في هندسة متعدد الوجوه (Polyhedral Geometry): كرة $L_1$ هي معين ماسي ذو زوايا حادة تقع على محاور الإحداثيات. وعندما تتمدد دوائر كفاف دالة الخسارة الإهليلجية، فإنها تلامس بطبيعتها الزوايا الحادة أولاً، مما يصفر مجموع"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\boldsymbol{\\beta}} \\mathcal{L}_{\\text{Lasso}}(\\boldsymbol{\\beta}) = \\frac{1}{2N}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|_2^2 + \\lambda \\|\\boldsymbol{\\beta}\\|_1",
        "formulaNote": {
          "en": "Core invariant for Lasso Regression (L1), Polyhedral Geometry & Sparsity.",
          "ar": "الخاصية الرياضية الجوهرية لـ انحدار لاسو وهندسة متعددات الوجوه وانعدام المعلمات."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-elastic-net-coordinate-descent",
          "starterCode": "import numpy as np\n\ndef fit_lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, alpha: float, max_iter: int = 300, tol: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Solves L1 Lasso regression via cyclic coordinate descent and soft-thresholding.\n    \"\"\"\n    # TODO: Iteratively compute partial residuals and apply soft-thresholding operator\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, alpha: float, max_iter: int = 300, tol: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Solves L1 Lasso regression via cyclic coordinate descent and soft-thresholding.\n    \"\"\"\n    # TODO: Iteratively compute partial residuals and apply soft-thresholding operator\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_lasso_coordinate_descent(X: np.ndarray, y: np.ndarray, alpha: float, max_iter: int = 300, tol: float = 1e-5) -> np.ndarray:\n    n, p = X.shape\n    beta = np.zeros(p)\n    z = np.sum(X ** 2, axis=0)\n    \n    for _ in range(max_iter):\n        beta_prev = beta.copy()\n        for j in range(p):\n            # Partial residual without feature j\n            r_j = y - (X @ beta - X[:, j] * beta[j])\n            rho_j = float(X[:, j] @ r_j)\n            \n            # Vectorized soft-thresholding\n            if rho_j > alpha:\n                beta[j] = (rho_j - alpha) / z[j]\n            elif rho_j < -alpha:\n                beta[j] = (rho_j + alpha) / z[j]\n            else:\n                beta[j] = 0.0\n                \n        if np.max(np.abs(beta - beta_prev)) < tol:\n            break\n            \n    return beta"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Lasso Regression (L1), Polyhedral Geometry & Sparsity?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم انحدار لاسو وهندسة متعددات الوجوه وانعدام المعلمات؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Logistic Regression, Maximum Likelihood & IRLS",
    "titleAr": "الانحدار اللوجستي ودالة الإمكان الأقصى وخوارزمية IRLS",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "When the outcome variable is binary ($Y_i \\in \\{0, 1\\}$), the Linear Probability Model (OLS on $Y$) fails: it predicts nonsensical probabili...",
      "ar": "عندما يكون المتغير التابع ثنائيًا ($Y_i \\in \\{0, 1\\}$)، يفشل نموذج الاحتمال الخطي التقليدي (OLS): فهو يولد احتمالات غير منطقية تتجاوز النطاق..."
    },
    "prerequisites": [
      "multiple-regression-matrix-calculus",
      "gradient-vector"
    ],
    "x": 825,
    "y": 2360,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LogisticSigmoidSurface",
        "narrative": {
          "en": "When the outcome variable is binary ($Y_i \\in \\{0, 1\\}$), the Linear Probability Model (OLS on $Y$) fails: it predicts nonsensical probabilities outside $[0, 1]$ and exhibits inherent heteroskedasticity. Logistic regression solves this by modeling the log-odds (logit link function) of the positive class as a linear combination of features, squashing output through the standard sigmoid function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$.\n\nBecause there is no closed-form analytical solution, parameters are estimated via Maximum Likelihood Estimation (MLE). The log-likelihood is strictly concave. Applyin",
          "ar": "عندما يكون المتغير التابع ثنائيًا ($Y_i \\in \\{0, 1\\}$)، يفشل نموذج الاحتمال الخطي التقليدي (OLS): فهو يولد احتمالات غير منطقية تتجاوز النطاق $[0, 1]$، ويعاني بطبيعته من عدم تجانس التباين. يعالج الانحدار اللوجستي ذلك بنمذجة لوغاريتم الأرجحية (Log-Odds) كتركيبة خطية، ضاغطًا النتيجة عبر الدالة السينية $\\sigma(z) = \\frac{1}{1 + e^{-z}}$.\n\nونظرًا لعدم وجود حل تحليلي مباشر، تُقدَّر المعلمات عبر دالة الإمكان الأقصى (MLE). دالة لوغاريتم الإمكان مقعرة تمامًا، وتكشف خوارزمية نيوتن-رافسون عن هيكل جبري بديع يُعرف بـ المربعات الصغرى المرجحة تكراريًا (IRLS): فكل خطوة تحديث هي في جوهرها انحدار مربعات صغر"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "p_i \\equiv P(Y_i = 1 \\mid \\mathbf{x}_i) = \\sigma(\\mathbf{x}_i^T \\boldsymbol{\\beta}) = \\frac{1}{1 + e^{-\\mathbf{x}_i^T \\boldsymbol{\\beta}}}",
        "formulaNote": {
          "en": "Core invariant for Logistic Regression, Maximum Likelihood & IRLS.",
          "ar": "الخاصية الرياضية الجوهرية لـ الانحدار اللوجستي ودالة الإمكان الأقصى وخوارزمية IRLS."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-logistic-regression-sigmoid",
          "starterCode": "import numpy as np\n\ndef irls_logistic_step(X: np.ndarray, y: np.ndarray, beta: np.ndarray) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Executes a single Newton-Raphson IRLS update step for binary logistic regression.\n    \"\"\"\n    # TODO: Compute probabilities, diagonal weights W, working response z, and updated beta\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef irls_logistic_step(X: np.ndarray, y: np.ndarray, beta: np.ndarray) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Executes a single Newton-Raphson IRLS update step for binary logistic regression.\n    \"\"\"\n    # TODO: Compute probabilities, diagonal weights W, working response z, and updated beta\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef irls_logistic_step(X: np.ndarray, y: np.ndarray, beta: np.ndarray) -> tuple[np.ndarray, float]:\n    z_lin = X @ beta\n    p = 1.0 / (1.0 + np.exp(-np.clip(z_lin, -30.0, 30.0)))\n    w = p * (1.0 - p)\n    W = np.diag(w)\n    \n    # Working response vector\n    working_z = z_lin + (y - p) / (w + 1e-12)\n    beta_next = np.linalg.solve(X.T @ W @ X, X.T @ W @ working_z)\n    \n    # Binary cross-entropy\n    loss = -float(np.sum(y * np.log(p + 1e-12) + (1.0 - y) * np.log(1.0 - p + 1e-12)))\n    return beta_next, loss"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Logistic Regression, Maximum Likelihood & IRLS?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الانحدار اللوجستي ودالة الإمكان الأقصى وخوارزمية IRLS؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "titleAr": "مقاييس التصنيف ومنحنيات ROC ومكافأة مان-ويتني الإحصائية",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Accuracy is a dangerously misleading metric in imbalanced classification. If $99\\%$ of credit card transactions are legitimate, a model pred...",
      "ar": "تُعد دقة التصنيف (Accuracy) مقياسًا خادعًا وخطيرًا عند التعامل مع فئات غير متوازنة. إذا كانت $99\\%$ من المعاملات البنكية سليمة، فإن نموذجًا ..."
    },
    "prerequisites": [
      "logistic-regression-sigmoid"
    ],
    "x": 805,
    "y": 2455,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LogisticIRLSCurvatureLab",
        "narrative": {
          "en": "Accuracy is a dangerously misleading metric in imbalanced classification. If $99\\%$ of credit card transactions are legitimate, a model predicting 'always legitimate' achieves $99\\%$ accuracy while failing entirely at fraud detection. We must evaluate performance across all possible classification thresholds.\n\nThe Receiver Operating Characteristic (ROC) curve plots True Positive Rate against False Positive Rate. The Area Under the Curve (ROC-AUC) is one of the most celebrated summary statistics in machine learning. Yet few practitioners realize its profound mathematical connection: The ROC-A",
          "ar": "تُعد دقة التصنيف (Accuracy) مقياسًا خادعًا وخطيرًا عند التعامل مع فئات غير متوازنة. إذا كانت $99\\%$ من المعاملات البنكية سليمة، فإن نموذجًا يتنبأ دائمًا بأن المعاملة 'سليمة' سيحقق دقة $99\\%$ رغم فشله الذريع في اكتشاف أي احتيال. لذا يلزم تقييم الأداء عبر كافة عتبات القرار الممكنة.\n\nيرسم منحنى خصائص التشغيل للمستقبِل (ROC Curve) معدل الإيجابيات الحقيقية مقابل معدل الإيجابيات الخاطئة. وتُعد المساحة تحت المنحنى (ROC-AUC) من أهم المقاييس المعتمدة. لكن قلة من الممارسين يدركون الرابط الرياضي العميق: المساحة ROC-AUC تتطابق رياضيًا تمامًا مع إحصاء مان-ويتني اللامعلمي (Wilcoxon-Mann-Whitney Test)! ف"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\text{TPR}(T) = \\frac{TP(T)}{P} = \\frac{\\sum_{i: y_i=1} \\mathbf{1}(\\hat{p}_i \\ge T)}{N_1}",
        "formulaNote": {
          "en": "Core invariant for Classification Metrics, ROC Curves & The Mann-Whitney Equivalence.",
          "ar": "الخاصية الرياضية الجوهرية لـ مقاييس التصنيف ومنحنيات ROC ومكافأة مان-ويتني الإحصائية."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-roc-auc-confusion-matrix",
          "starterCode": "import numpy as np\n\ndef compute_softmax_loss_grad(X: np.ndarray, Y_onehot: np.ndarray, W: np.ndarray) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Computes numerically stable multiclass Softmax cross-entropy loss and gradient.\n    \"\"\"\n    # TODO: Subtract row max for stability, compute probs, loss, and gradient\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_softmax_loss_grad(X: np.ndarray, Y_onehot: np.ndarray, W: np.ndarray) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Computes numerically stable multiclass Softmax cross-entropy loss and gradient.\n    \"\"\"\n    # TODO: Subtract row max for stability, compute probs, loss, and gradient\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_softmax_loss_grad(X: np.ndarray, Y_onehot: np.ndarray, W: np.ndarray) -> tuple[float, np.ndarray]:\n    N = X.shape[0]\n    logits = X @ W\n    # Subtract row-wise maximum for numerical stability\n    logits_stable = logits - np.max(logits, axis=1, keepdims=True)\n    exp_logits = np.exp(logits_stable)\n    probs = exp_logits / np.sum(exp_logits, axis=1, keepdims=True)\n    \n    loss = -float(np.sum(Y_onehot * np.log(probs + 1e-15)) / N)\n    grad = (X.T @ (probs - Y_onehot)) / N\n    return loss, grad"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Classification Metrics, ROC Curves & The Mann-Whitney Equivalence?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم مقاييس التصنيف ومنحنيات ROC ومكافأة مان-ويتني الإحصائية؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Support Vector Machines (SVM), Dual Formulation & Mercer Kernels",
    "titleAr": "آلات المتجهات الداعمة والصياغة المزدوجة ونوى ميرسر",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Vladimir Vapnik developed Support Vector Machines (SVM) based on Structural Risk Minimization. Unlike logistic regression, which adjusts wei...",
      "ar": "طوّر فلاديمير فابنيك (Vapnik) آلات المتجهات الداعمة (SVM) بالاستناد إلى مبدأ تقليل المخاطر الهيكلية. وعلى عكس الانحدار اللوجستي الذي تتأثر م..."
    },
    "prerequisites": [
      "roc-auc-confusion-matrix",
      "dot-product-geometry"
    ],
    "x": 825,
    "y": 2550,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SupportVectorMachineKernelLab",
        "narrative": {
          "en": "Vladimir Vapnik developed Support Vector Machines (SVM) based on Structural Risk Minimization. Unlike logistic regression, which adjusts weights based on all data points, SVM seeks the unique hyperplane that maximizes the geometric margin to the closest training points on either side.\n\nThrough Lagrangian duality, the primal constrained optimization problem transforms into a dual quadratic program that depends ONLY on inner products between pairs of sample points $\\langle \\mathbf{x}_i, \\mathbf{x}_j \\rangle$. This unlocks the celebrated Kernel Trick: by replacing the inner product with a Mer",
          "ar": "طوّر فلاديمير فابنيك (Vapnik) آلات المتجهات الداعمة (SVM) بالاستناد إلى مبدأ تقليل المخاطر الهيكلية. وعلى عكس الانحدار اللوجستي الذي تتأثر معلماته بكافة نقاط البيانات، تبحث SVM عن المستوى الفائق الفريد الذي يعظم الهامش الهندسي الفاصل (Maximum Margin) عن أقرب نقاط التدريب من كلا الجانبين.\n\nوعبر ازدواجية لاغرانج (Lagrangian Duality)، تتحول المسألة الأولية إلى مسألة ازدواجية تعتمد حصريًا على الجداء الداخلي بين أزواج النقاط $\\langle \\mathbf{x}_i, \\mathbf{x}_j \\rangle$. وهنا تبرز خدعة النواة (Kernel Trick) الأسطورية: باستبدال الجداء الداخلي بدالة نواة ميرسر $K(\\mathbf{x}_i, \\mathbf{x}_j)$،"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\max_{\\mathbf{w}, b} \\frac{2}{\\|\\mathbf{w}\\|_2} \\iff \\min_{\\mathbf{w}, b} \\frac{1}{2}\\|\\mathbf{w}\\|_2^2 \\quad \\text{s.t. } y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1 \\; \\forall i",
        "formulaNote": {
          "en": "Core invariant for Support Vector Machines (SVM), Dual Formulation & Mercer Kernels.",
          "ar": "الخاصية الرياضية الجوهرية لـ آلات المتجهات الداعمة والصياغة المزدوجة ونوى ميرسر."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-knn-classification",
          "starterCode": "import numpy as np\n\ndef svm_hinge_subgradient_step(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float, C: float, lr: float) -> tuple[np.ndarray, float, float]:\n    \"\"\"\n    Performs a single primal subgradient descent step for linear soft-margin SVM.\n    \"\"\"\n    # TODO: Compute margins y_i * (w^T x_i + b), identify violators, compute subgradients, update w and b\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef svm_hinge_subgradient_step(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float, C: float, lr: float) -> tuple[np.ndarray, float, float]:\n    \"\"\"\n    Performs a single primal subgradient descent step for linear soft-margin SVM.\n    \"\"\"\n    # TODO: Compute margins y_i * (w^T x_i + b), identify violators, compute subgradients, update w and b\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef svm_hinge_subgradient_step(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float, C: float, lr: float) -> tuple[np.ndarray, float, float]:\n    margins = y * (X @ w + b)\n    loss = 0.5 * float(np.sum(w ** 2)) + C * float(np.sum(np.maximum(0.0, 1.0 - margins)))\n    \n    violators = (margins < 1.0).astype(float)\n    grad_w = w - C * np.sum((violators * y)[:, None] * X, axis=0)\n    grad_b = - C * float(np.sum(violators * y))\n    \n    w_next = w - lr * grad_w\n    b_next = b - lr * grad_b\n    return w_next, b_next, loss"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Support Vector Machines (SVM), Dual Formulation & Mercer Kernels?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم آلات المتجهات الداعمة والصياغة المزدوجة ونوى ميرسر؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "CART Algorithm, Impurity Measures & Cost-Complexity Pruning",
    "titleAr": "خوارزمية CART ومقاييس الشوائب والتشذيب بتكلفة التعقيد",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Classification and Regression Trees (CART), developed by Breiman, Friedman, Olshen, and Stone (1984), break away from linear hyperplanes by ...",
      "ar": "تمثل أشجار التصنيف والانحدار (CART)، التي طورها برايمن وزملاؤه (1984)، قطيعة مع المستويات الفائقة الخطية من خلال تقسيم فضاء المتغيرات إلى مس..."
    },
    "prerequisites": [
      "knn-classification"
    ],
    "x": 805,
    "y": 2645,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DecisionTreeLaser",
        "narrative": {
          "en": "Classification and Regression Trees (CART), developed by Breiman, Friedman, Olshen, and Stone (1984), break away from linear hyperplanes by partitioning feature space into recursive, axis-aligned rectangular boxes. At each internal node, the algorithm greedily searches across all features and all possible split thresholds to maximize the reduction in node impurity (Gini impurity or Shannon entropy for classification; variance for regression).\n\nAn unconstrained tree grows until every single training point is isolated in its own leaf, achieving zero training error while suffering catastrophic ov",
          "ar": "تمثل أشجار التصنيف والانحدار (CART)، التي طورها برايمن وزملاؤه (1984)، قطيعة مع المستويات الفائقة الخطية من خلال تقسيم فضاء المتغيرات إلى مستطيلات متداخلة موازية للمحاور. وفي كل عقدة داخلية، تبحث الخوارزمية بنهم (Greedy Search) عبر كافة المتغيرات والعتبات الممكنة لتعظيم انخفاض شوائب العقدة (شوائب جيني Gini Impurity أو إنتروبيا شانون في التصنيف؛ وتخفيض التباين في الانحدار).\n\nتستمر الشجرة غير المقيدة في النمو حتى تنعزل كل نقطة بيانات بمفردها في ورقة، محققة خطأ تدريب صفريًا لكن مع إفراط كارثي في التوفيق (تذبذب وتباين عالي). يعالج التشذيب بتكلفة التعقيد الأدنى ($R_\\alpha(T) = R(T) + \\alpha |T|$) ذ"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "H(R_m) = \\sum_{k=1}^K p_{mk} (1 - p_{mk}) = 1 - \\sum_{k=1}^K p_{mk}^2",
        "formulaNote": {
          "en": "Core invariant for CART Algorithm, Impurity Measures & Cost-Complexity Pruning.",
          "ar": "الخاصية الرياضية الجوهرية لـ خوارزمية CART ومقاييس الشوائب والتشذيب بتكلفة التعقيد."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-curse-of-dimensionality-metric-trees",
          "starterCode": "import numpy as np\n\ndef find_best_split(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:\n    \"\"\"\n    Finds the optimal threshold t* minimizing weighted Gini impurity.\n    \"\"\"\n    # TODO: Sort x and y, test midpoints between adjacent distinct values, compute split Gini\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef find_best_split(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:\n    \"\"\"\n    Finds the optimal threshold t* minimizing weighted Gini impurity.\n    \"\"\"\n    # TODO: Sort x and y, test midpoints between adjacent distinct values, compute split Gini\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef find_best_split(x: np.ndarray, y: np.ndarray) -> tuple[float, float]:\n    order = np.argsort(x)\n    x_sort = x[order]\n    y_sort = y[order]\n    n = len(y)\n    \n    best_gini = 1.0\n    best_thresh = float(x_sort[0])\n    \n    def gini(arr: np.ndarray) -> float:\n        if len(arr) == 0:\n            return 0.0\n        _, counts = np.unique(arr, return_counts=True)\n        probs = counts / len(arr)\n        return float(1.0 - np.sum(probs ** 2))\n        \n    for i in range(n - 1):\n        if x_sort[i] == x_sort[i + 1]:\n            continue\n        thresh = (x_sort[i] + x_sort[i + 1]) / 2.0\n        y_left = y_sort[:i + 1]\n        y_right = y_sort[i + 1:]\n        split_gini = (len(y_left) / n) * gini(y_left) + (len(y_right) / n) * gini(y_right)\n        \n        if split_gini < best_gini:\n            best_gini = split_gini\n            best_thresh = thresh\n            \n    return float(best_thresh), float(best_gini)"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing CART Algorithm, Impurity Measures & Cost-Complexity Pruning?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم خوارزمية CART ومقاييس الشوائب والتشذيب بتكلفة التعقيد؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Bagging & Random Forests (Feature Subspace Sampling & OOB Error)",
    "titleAr": "التجميع المتزامن والغابات العشوائية وعينات الفضاء الجزئي وخطأ OOB",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Single decision trees are notoriously high-variance estimators: a tiny perturbation in the training sample can trigger a completely differen...",
      "ar": "تعاني شجرة القرار المنفردة من تباين عالٍ جدًا: فتغير طفيف في عينة التدريب كفيل بتغيير جذر الشجرة بالكامل مما يقلب هيكل القرارات رأسًا على عق..."
    },
    "prerequisites": [
      "curse-of-dimensionality-metric-trees",
      "sorting-divide-and-conquer"
    ],
    "x": 825,
    "y": 2740,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RandomForestEnsembleLab",
        "narrative": {
          "en": "Single decision trees are notoriously high-variance estimators: a tiny perturbation in the training sample can trigger a completely different root split, altering the entire downstream tree architecture. Leo Breiman (2001) solved this by creating Random Forests, combining Bootstrap Aggregating (Bagging) with Random Feature Subspace Sampling.\n\nThe mathematical core of Random Forests is variance reduction through de-correlation. Averaging $B$ identically distributed trees with individual variance $\\sigma^2$ and pairwise correlation $\\rho$ yields ensemble variance: $\\rho \\sigma^2 + \\frac{1 -",
          "ar": "تعاني شجرة القرار المنفردة من تباين عالٍ جدًا: فتغير طفيف في عينة التدريب كفيل بتغيير جذر الشجرة بالكامل مما يقلب هيكل القرارات رأسًا على عقب. قدّم ليو برايمن (Breiman, 2001) الحل العبقري عبر الغابات العشوائية (Random Forests)، دامِجًا بين التجميع بالتمهيد (Bagging) وعينات الفضاء الجزئي للمتغيرات.\n\nيرتكز جوهر الغابات العشوائية رياضيًا على تخفيض التباين عبر فك الارتباط بين الأشجار. إن تجميع $B$ من الأشجار المتطابقة توزيعيًا بتباين $\\sigma^2$ وارتباط ثنائي $\\rho$ ينتج عنه تباين إجمالي للمنظومة: $\\rho \\sigma^2 + \\frac{1 - \\rho}{B} \\sigma^2$. وفي حين يخفض التجميع المعتاد الحد $\\frac{1}{B}$، فإ"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbb{V}(\\bar{T}) = \\frac{1}{B^2} \\sum_{b=1}^B \\mathbb{V}(T_b) + \\frac{1}{B^2} \\sum_{b \\ne b'} \\text{Cov}(T_b, T_{b'})",
        "formulaNote": {
          "en": "Core invariant for Bagging & Random Forests (Feature Subspace Sampling & OOB Error).",
          "ar": "الخاصية الرياضية الجوهرية لـ التجميع المتزامن والغابات العشوائية وعينات الفضاء الجزئي وخطأ OOB."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-decision-trees",
          "starterCode": "import numpy as np\n\ndef compute_oob_accuracy(y_true: np.ndarray, oob_predictions: list[dict[int, int]]) -> float:\n    \"\"\"\n    Computes Random Forest Out-of-Bag (OOB) classification accuracy.\n    \"\"\"\n    # TODO: For each sample i, aggregate votes from all trees where i was OOB and take majority vote\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_oob_accuracy(y_true: np.ndarray, oob_predictions: list[dict[int, int]]) -> float:\n    \"\"\"\n    Computes Random Forest Out-of-Bag (OOB) classification accuracy.\n    \"\"\"\n    # TODO: For each sample i, aggregate votes from all trees where i was OOB and take majority vote\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_oob_accuracy(y_true: np.ndarray, oob_predictions: list[dict[int, int]]) -> float:\n    n = len(y_true)\n    correct = 0\n    counted = 0\n    \n    for i in range(n):\n        votes = [pred_dict[i] for pred_dict in oob_predictions if i in pred_dict]\n        if len(votes) > 0:\n            vals, counts = np.unique(votes, return_counts=True)\n            pred_class = vals[np.argmax(counts)]\n            if pred_class == y_true[i]:\n                correct += 1\n            counted += 1\n            \n    return float(correct / counted) if counted > 0 else 0.0"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Bagging & Random Forests (Feature Subspace Sampling & OOB Error)?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التجميع المتزامن والغابات العشوائية وعينات الفضاء الجزئي وخطأ OOB؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Gradient Boosted Decision Trees & XGBoost 2nd-Order Expansion",
    "titleAr": "أشجار التدرج المعزز والتوسيع الرياضي من الرتبة الثانية في XGBoost",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "While Random Forests build deep trees in parallel to reduce variance, Gradient Boosting (Friedman, 2001) builds shallow trees sequentially t...",
      "ar": "بينما تبني الغابات العشوائية أشجارًا عميقة على التوازي لتخفيض التباين، يقوم التعزيز المتدرج (Gradient Boosting - Friedman) ببناء أشجار ضحلة ..."
    },
    "prerequisites": [
      "decision-trees"
    ],
    "x": 805,
    "y": 2835,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GBMPseudoResidualWaterfallLab",
        "narrative": {
          "en": "While Random Forests build deep trees in parallel to reduce variance, Gradient Boosting (Friedman, 2001) builds shallow trees sequentially to reduce bias. Gradient Boosting performs gradient descent in function space: each new tree fits the negative gradient (pseudo-residuals) of the loss function with respect to current predictions.\n\nTianqi Chen (2016) revolutionized this paradigm with XGBoost (Extreme Gradient Boosting). Instead of relying solely on first-order gradients, XGBoost takes an exact second-order Taylor expansion of any arbitrary, custom loss function. This yields exact closed",
          "ar": "بينما تبني الغابات العشوائية أشجارًا عميقة على التوازي لتخفيض التباين، يقوم التعزيز المتدرج (Gradient Boosting - Friedman) ببناء أشجار ضحلة بشكل تتابعي لتخفيض التحيز. يطبق التعزيز المتدرج خوارزمية الانحدار المتدرج في فضاء الدوال: حيث تتدرب كل شجرة جديدة على التدرج السالب (البواقي الزائفة Pseudo-Residuals) لدالة الخسارة.\n\nأحدث تيانكي تشن (Tianqi Chen, 2016) نقلة نوعية عبر XGBoost. فبدلاً من الاكتفاء بتدرجات الرتبة الأولى، يطبق XGBoost توسيع تايلور الدقيق من الرتبة الثانية على أي دالة خسارة عامة. يفرز هذا التوسيع صيغًا رياضية تحليلية مغلقة لحساب أوزان الأوراق المثلى ومكاسب التفرع (Split Gain"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathcal{L}^{(t)} = \\sum_{i=1}^N L(y_i, \\hat{y}_i^{(t-1)} + f_t(\\mathbf{x}_i)) + \\Omega(f_t)",
        "formulaNote": {
          "en": "Core invariant for Gradient Boosted Decision Trees & XGBoost 2nd-Order Expansion.",
          "ar": "الخاصية الرياضية الجوهرية لـ أشجار التدرج المعزز والتوسيع الرياضي من الرتبة الثانية في XGBoost."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-random-forests-bagging",
          "starterCode": "import numpy as np\n\ndef compute_gbm_step(y: np.ndarray, f_prev: np.ndarray, loss: str = \"mse\") -> tuple[np.ndarray, float]:\n    \"\"\"\n    Computes functional negative gradient pseudo-residuals and optimal constant step gamma.\n    \"\"\"\n    # TODO: Compute negative loss gradients and optimal line-search step for MSE or MAE\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_gbm_step(y: np.ndarray, f_prev: np.ndarray, loss: str = \"mse\") -> tuple[np.ndarray, float]:\n    \"\"\"\n    Computes functional negative gradient pseudo-residuals and optimal constant step gamma.\n    \"\"\"\n    # TODO: Compute negative loss gradients and optimal line-search step for MSE or MAE\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_gbm_step(y: np.ndarray, f_prev: np.ndarray, loss: str = \"mse\") -> tuple[np.ndarray, float]:\n    if loss == \"mse\":\n        # L(y, f) = 0.5 * (y - f)^2 => - dL/df = y - f\n        r = y - f_prev\n        gamma = float(np.mean(r))\n    elif loss == \"mae\":\n        # L(y, f) = |y - f| => - dL/df = sign(y - f)\n        r = np.sign(y - f_prev)\n        gamma = float(np.median(y - f_prev))\n    else:\n        raise ValueError(f\"Unsupported loss: {loss}\")\n    return r, gamma"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Gradient Boosted Decision Trees & XGBoost 2nd-Order Expansion?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم أشجار التدرج المعزز والتوسيع الرياضي من الرتبة الثانية في XGBoost؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "LightGBM Architecture: Histogram Bins, GOSS & EFB",
    "titleAr": "معمارية LightGBM والمدرجات التكرارية وعينات GOSS وحزم EFB",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "As datasets scaled to tens of millions of rows and thousands of sparse features, standard XGBoost encountered severe computational bottlenec...",
      "ar": "مع تضخم البيانات لتصل إلى عشرات الملايين من الصفوف وآلاف المتغيرات المتفرقة، واجه XGBoost اختناقات حسابية؛ إذ تتطلب فرز القيم المستمرة في كل..."
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
        "simulation": "XGBoostHessianGainLab",
        "narrative": {
          "en": "As datasets scaled to tens of millions of rows and thousands of sparse features, standard XGBoost encountered severe computational bottlenecks: sorting continuous feature values at every node required $O(N \\times P \\times \\log N)$ operations and consumed massive memory bandwidth. Ke et al. (Microsoft Research, 2017) created LightGBM to solve large-scale efficiency through three algorithmic innovations.\n\n1. Histogram-Based Binning: Continuous features are bucketed into discrete integer bins (typically 256 bins), cutting split search complexity to $O(K \\times P)$ and enabling subtraction",
          "ar": "مع تضخم البيانات لتصل إلى عشرات الملايين من الصفوف وآلاف المتغيرات المتفرقة، واجه XGBoost اختناقات حسابية؛ إذ تتطلب فرز القيم المستمرة في كل عقدة تعقيدًا مقداره $O(N \\times P \\times \\log N)$ واستهلاكًا هائلاً للذاكرة. ابتكر باحثو مايكروسوفت (Ke et al., 2017) خوارزمية LightGBM متجاوزين تلك العقبات عبر ثلاث ثورات خوارزمية:\n\n1. المدرجات التكرارية (Histogram Binning): تجميع القيم المستمرة في 256 سلة منفصلة، مما يقلص تعقيد البحث إلى $O(K \\times P)$ ويتيح خدعة الطرح الفوري لمدرج العقدة اليمنى من الأب واليسرى.\n2. عينات التدرج أحادية الجانب (GOSS): الاحتفاظ بكافة المشاهدات ذات التدرج الكبي"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\tilde{V}_j(d) = \\frac{1}{N} \\left[ \\frac{\\left( \\sum_{x_i \\in A_L} g_i + \\frac{1-a}{b}\\sum_{x_i \\in B_L} g_i \\right)^2}{N_L^j(d)} + \\frac{\\left( \\sum_{x_i \\in A_R} g_i + \\frac{1-a}{b}\\sum_{x_i \\in B_R} g_i \\right)^2}{N_R^j(d)} \\right]",
        "formulaNote": {
          "en": "Core invariant for LightGBM Architecture: Histogram Bins, GOSS & EFB.",
          "ar": "الخاصية الرياضية الجوهرية لـ معمارية LightGBM والمدرجات التكرارية وعينات GOSS وحزم EFB."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gradient-boosted-trees-xgboost",
          "starterCode": "import numpy as np\n\ndef compute_xgboost_split_gain(g: np.ndarray, h: np.ndarray, split_mask: np.ndarray, lam: float, gamma: float) -> tuple[float, float, float]:\n    \"\"\"\n    Computes XGBoost second-order optimal leaf weights and split gain.\n    \"\"\"\n    # TODO: Aggregate G and H for left and right nodes, compute weights and split gain\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_xgboost_split_gain(g: np.ndarray, h: np.ndarray, split_mask: np.ndarray, lam: float, gamma: float) -> tuple[float, float, float]:\n    \"\"\"\n    Computes XGBoost second-order optimal leaf weights and split gain.\n    \"\"\"\n    # TODO: Aggregate G and H for left and right nodes, compute weights and split gain\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_xgboost_split_gain(g: np.ndarray, h: np.ndarray, split_mask: np.ndarray, lam: float, gamma: float) -> tuple[float, float, float]:\n    g_L = float(np.sum(g[split_mask]))\n    h_L = float(np.sum(h[split_mask]))\n    g_R = float(np.sum(g[~split_mask]))\n    h_R = float(np.sum(h[~split_mask]))\n    \n    w_L = - g_L / (h_L + lam)\n    w_R = - g_R / (h_R + lam)\n    \n    gain = 0.5 * (\n        (g_L ** 2) / (h_L + lam) +\n        (g_R ** 2) / (h_R + lam) -\n        ((g_L + g_R) ** 2) / (h_L + h_R + lam)\n    ) - gamma\n    \n    return w_L, w_R, float(gain)"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing LightGBM Architecture: Histogram Bins, GOSS & EFB?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم معمارية LightGBM والمدرجات التكرارية وعينات GOSS وحزم EFB؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "K-Means++ Clustering & Principal Component Analysis (PCA)",
    "titleAr": "تجميع K-Means++ وتحليل المكونات الرئيسية PCA",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "Unsupervised learning extracts latent geometric structures from unlabeled data $\\mathbf{X} \\in \\mathbb{R}^{N \\times P}$. The two cornerstone...",
      "ar": "يستخرج التعلم غير الخاضع للإشراف (Unsupervised Learning) الأنماط والهياكل الهندسية الكامنة في البيانات $\\mathbf{X} \\in \\mathbb{R}^{N \\times ..."
    },
    "prerequisites": [
      "dot-product-geometry"
    ],
    "x": 805,
    "y": 3025,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PCAEigenProjectionLab",
        "narrative": {
          "en": "Unsupervised learning extracts latent geometric structures from unlabeled data $\\mathbf{X} \\in \\mathbb{R}^{N \\times P}$. The two cornerstones of classical unsupervised learning are partition-based clustering (K-Means) and linear dimensionality reduction (Principal Component Analysis - PCA).\n\nStandard K-Means (Lloyd's algorithm) minimizes within-cluster sum of squares, but suffers from severe sensitivity to random initial centroid placement, frequently trapping the algorithm in catastrophic local minima. Arthur and Vassilvitskii (2007) solved this with K-Means++, introducing $D^2$-sampling",
          "ar": "يستخرج التعلم غير الخاضع للإشراف (Unsupervised Learning) الأنماط والهياكل الهندسية الكامنة في البيانات $\\mathbf{X} \\in \\mathbb{R}^{N \\times P}$. ويُعد التجميع العنقودي (K-Means) وتقليص الأبعاد الخطي (PCA) الركيزتين الكلاسيكيتين لهذا المجال.\n\nتعمل خوارزمية K-Means (Lloyd) على تقليل مجموع المربعات داخل كل عنقود، لكنها شديدة الحساسية للمراكز الابتدائية العشوائية، مما يحبسها غالبًا في نهايات صغرى محلية كارثية. قدّم آرثر وفاسيلفيتسكي (2007) خوارزمية K-Means++ التي تختار المراكز الابتدائية عبر توزيع احتمالي يتناسب مع مربع المسافة $D^2$، مما يضمن نظريًا دقة تقريبية في حدود $O(\\log k)$ للحل الأمثل"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "D(\\mathbf{x}_i) = \\min_{j \\in \\{1, \\dots, m\\}} \\|\\mathbf{x}_i - \\mathbf{c}_j\\|_2",
        "formulaNote": {
          "en": "Core invariant for K-Means++ Clustering & Principal Component Analysis (PCA).",
          "ar": "الخاصية الرياضية الجوهرية لـ تجميع K-Means++ وتحليل المكونات الرئيسية PCA."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-kmeans-clustering",
          "starterCode": "import numpy as np\n\ndef fit_pca_svd(X: np.ndarray, n_components: int) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits PCA via SVD on centered data, computing projections and explained variance ratios.\n    \"\"\"\n    # TODO: Mean-center X, compute SVD, project data, and calculate variance ratios\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef fit_pca_svd(X: np.ndarray, n_components: int) -> dict[str, np.ndarray]:\n    \"\"\"\n    Fits PCA via SVD on centered data, computing projections and explained variance ratios.\n    \"\"\"\n    # TODO: Mean-center X, compute SVD, project data, and calculate variance ratios\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef fit_pca_svd(X: np.ndarray, n_components: int) -> dict[str, np.ndarray]:\n    mu = np.mean(X, axis=0)\n    X_centered = X - mu\n    U, s, Vt = np.linalg.svd(X_centered, full_matrices=False)\n    \n    V_k = Vt[:n_components].T\n    Z = X_centered @ V_k\n    explained_variance_ratio = (s[:n_components] ** 2) / np.sum(s ** 2)\n    \n    return {\n        \"Z\": Z,\n        \"V_k\": V_k,\n        \"explained_variance_ratio\": explained_variance_ratio,\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing K-Means++ Clustering & Principal Component Analysis (PCA)?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تجميع K-Means++ وتحليل المكونات الرئيسية PCA؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
    "title": "Non-Linear Manifold Learning: t-SNE & UMAP",
    "titleAr": "تعلم المتشعبات غير الخطية وخوارزميات t-SNE و UMAP",
    "trackId": "econometrics",
    "estimatedMinutes": 15,
    "description": {
      "en": "While PCA is limited to linear orthogonal projections, real-world high-dimensional data (single-cell RNA sequencing, deep neural network emb...",
      "ar": "بينما يقتصر PCA على الإسقاطات الخطية المتعامدة، فإن البيانات الواقعية عالية الأبعاد (تسلسل الحمض النووي للخلايا الفردية، تضمينات الشبكات الع..."
    },
    "prerequisites": [
      "kmeans-clustering",
      "symmetric-matrices-spectral"
    ],
    "x": 825,
    "y": 3120,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ManifoldUMAPtSNELab",
        "narrative": {
          "en": "While PCA is limited to linear orthogonal projections, real-world high-dimensional data (single-cell RNA sequencing, deep neural network embeddings, image pixel manifolds) resides on curved, non-linear sub-manifolds. Linear projections inevitably collapse distant parts of the manifold on top of each other.\n\nLaurens van der Maaten and Geoffrey Hinton (2008) introduced t-SNE (t-Distributed Stochastic Neighbor Embedding). t-SNE converts high-dimensional Euclidean distances into conditional Gaussian probabilities, and models low-dimensional distances using a heavy-tailed Student-t distribution",
          "ar": "بينما يقتصر PCA على الإسقاطات الخطية المتعامدة، فإن البيانات الواقعية عالية الأبعاد (تسلسل الحمض النووي للخلايا الفردية، تضمينات الشبكات العصبية العميقة، بكسلات الصور) تقع على متشعبات غير خطية منحنية. تؤدي الإسقاطات الخطية حتمًا إلى طي وسحق أجزاء متباعدة من المتشعب فوق بعضها البعض.\n\nابتكر لورنز فان در ماتن وجيفري هينتون (2008) خوارزمية t-SNE. تحول t-SNE المسافات الإقليدية عالية الأبعاد إلى احتمالات غاوسية شرطية، وتمثل المسافات منخفضة الأبعاد بتوزيع ستيودنت ذي الذيول الثقيلة بدرجة حرية واحدة (توزيع كوشي). تحل هذه الذيول الثقيلة معضلة التكدس (Crowding Problem) جذريًا، مفسحة المجال للعناق"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "p_{j \\mid i} = \\frac{\\exp(-\\|\\mathbf{x}_i - \\mathbf{x}_j\\|_2^2 / 2\\sigma_i^2)}{\\sum_{k \\ne i}\\exp(-\\|\\mathbf{x}_i - \\mathbf{x}_k\\|_2^2 / 2\\sigma_i^2)}, \\quad p_{ij} = \\frac{p_{j \\mid i} + p_{i \\mid j}}{2N}",
        "formulaNote": {
          "en": "Core invariant for Non-Linear Manifold Learning: t-SNE & UMAP.",
          "ar": "الخاصية الرياضية الجوهرية لـ تعلم المتشعبات غير الخطية وخوارزميات t-SNE و UMAP."
        },
        "narrative": {
          "en": "The mathematical formulation strictly bounds the state space and governs convergence.",
          "ar": "الصياغة الرياضية تحدد فضاء الحالات بدقة وتضبط ديناميكية التقارب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-pca-dimensionality-reduction",
          "starterCode": "import numpy as np\n\ndef compute_tsne_p_matrix(X: np.ndarray, target_perplexity: float = 2.0, tol: float = 1e-4, max_iter: int = 50) -> np.ndarray:\n    \"\"\"\n    Computes t-SNE high-dimensional affinities P_ij using binary search for Gaussian variances.\n    \"\"\"\n    # TODO: Compute pairwise distances, binary search for beta_i to match target entropy, and symmetrize\n    pass",
          "testCases": [
            {
              "input": "x = np.array([1.0, 2.0])",
              "expected": "3.0"
            },
            {
              "input": "x = np.array([0.0, 0.0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_tsne_p_matrix(X: np.ndarray, target_perplexity: float = 2.0, tol: float = 1e-4, max_iter: int = 50) -> np.ndarray:\n    \"\"\"\n    Computes t-SNE high-dimensional affinities P_ij using binary search for Gaussian variances.\n    \"\"\"\n    # TODO: Compute pairwise distances, binary search for beta_i to match target entropy, and symmetrize\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_tsne_p_matrix(X: np.ndarray, target_perplexity: float = 2.0, tol: float = 1e-4, max_iter: int = 50) -> np.ndarray:\n    n = len(X)\n    D = np.sum((X[:, None, :] - X[None, :, :]) ** 2, axis=-1)\n    target_entropy = np.log(target_perplexity)\n    P = np.zeros((n, n))\n    \n    for i in range(n):\n        beta_min = -np.inf\n        beta_max = np.inf\n        beta = 1.0\n        d_i = np.delete(D[i], i)\n        \n        for _ in range(max_iter):\n            p_i = np.exp(-d_i * beta)\n            sum_p = np.sum(p_i)\n            if sum_p == 0:\n                p_i = np.ones_like(p_i) / len(p_i)\n            else:\n                p_i /= sum_p\n                \n            H = -np.sum(p_i * np.log(np.maximum(p_i, 1e-12)))\n            diff = H - target_entropy\n            \n            if np.abs(diff) < tol:\n                break\n            if diff > 0:\n                beta_min = beta\n                beta = beta * 2.0 if np.isinf(beta_max) else (beta + beta_max) / 2.0\n            else:\n                beta_max = beta\n                beta = beta / 2.0 if np.isinf(beta_min) else (beta + beta_min) / 2.0\n                \n        indices = [j for j in range(n) if j != i]\n        P[i, indices] = p_i\n        \n    P_sym = (P + P.T) / (2.0 * n)\n    return P_sym"
        },
        "hints": {
          "tier1": {
            "en": "Analyze the mathematical invariants and ensure correct array dimensions.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Use vectorized operations rather than explicit loops to avoid execution timeouts.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Verify your return type and boundary conditions against the test cases.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية مقارنة باختبارات الوحدة."
          }
        },
        "narrative": {
          "en": "Implement the vectorized numerical method to satisfy the test cases.",
          "ar": "قم بتنفيذ الخوارزمية العددية الموجهة لاجتياز اختبارات الوحدة."
        }
      },
      {
        "number": 4,
        "type": "transfer",
        "question": {
          "prompt": {
            "en": "What is the foundational invariant governing Non-Linear Manifold Learning: t-SNE & UMAP?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تعلم المتشعبات غير الخطية وخوارزميات t-SNE و UMAP؟"
          },
          "options": [
            {
              "text": {
                "en": "It maintains exact dimensional and geometric conservation across transformations.",
                "ar": "يحافظ على ثبات الأبعاد والخصائص الهندسية بدقة عبر التحويلات الرياضية."
              },
              "correct": true,
              "explanation": {
                "en": "Exact analytical invariants define optimal convergence and numerical stability.",
                "ar": "الشروط التحليلية الدقيقة تحدد التقارب الأمثل والاستقرار العددي."
              }
            },
            {
              "text": {
                "en": "It requires arbitrary stochastic noise to be added to guarantee convergence.",
                "ar": "يتطلب إضافة ضجيج عشوائي غير منضبط لضمان التقارب."
              },
              "correct": false,
              "explanation": {
                "en": "Uncontrolled noise destroys mathematical guarantees and increases variance.",
                "ar": "الضجيج غير المنضبط يقوض الضمانات الرياضية ويرفع تباين التقدير."
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
