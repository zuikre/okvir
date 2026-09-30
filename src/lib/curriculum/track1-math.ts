import type { CurriculumModule } from '../types';

export const mathModules: CurriculumModule[] = [
  {
    "id": "cartesian-coordinate-metric",
    "title": "Cartesian Coordinate Systems & The Euclidean Metric",
    "titleAr": "نظام الإحداثيات الديكارتية والمقياس الإقليدي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine an infinite, featureless desert. To communicate where an oasis lies, you must fix an arbitrary reference stone (the origin $\\mathbf{...",
      "ar": "يُنشئ نظام الإحداثيات الديكارتية جسراً بين الأرقام والهندسة، حيث يربط كل نقطة في الفضاء التآلفي المستوي $\\mathbb{E}^n$ بمركبات رقمية في $\\ma..."
    },
    "prerequisites": [],
    "x": 175,
    "y": 80,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "CartesianMetricCanvas",
        "narrative": {
          "en": "Imagine an infinite, featureless desert. To communicate where an oasis lies, you must fix an arbitrary reference stone (the origin $\\mathbf{0}$) and establish two perpendicular walking trails (the orthogonal axes $X$ and $Y$). Any location in the desert is now uniquely indexed by two signed numbers: how far east/west, and how far north/south. \n\nOnce coordinates exist, distance between any two locations is not arbitrary; it is the straight-line physical path between them. When walking diagonally from point $\\mathbf{p}$ to point $\\mathbf{q}$, you trace the hypotenuse of a right-angled triangle w",
          "ar": "يُنشئ نظام الإحداثيات الديكارتية جسراً بين الأرقام والهندسة، حيث يربط كل نقطة في الفضاء التآلفي المستوي $\\mathbb{E}^n$ بمركبات رقمية في $\\mathbb{R}^n$. المسافة الإقليدية هي المقياس الطبيعي الذي يقيس \"طول الوتر\" المستقيم الفاصل بين نقطتين عبر تعميم مبرهنة فيثاغورس على أي عدد من الأبعاد. تحقق هذه المسافة بديهيات المقياس الأساسية: اللامعقولية السالبة، التناظر، ومتباينة المثلث الحاكمة لأقصر مسار بين نقطتين."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "d_2(\\mathbf{p}, \\mathbf{q}) \\coloneqq \\|\\mathbf{p} - \\mathbf{q}\\|_2 = \\sqrt{\\sum_{i=1}^n (p_i - q_i)^2} = \\sqrt{(\\mathbf{p} - \\mathbf{q})^T (\\mathbf{p} - \\mathbf{q})}",
        "formulaNote": {
          "en": "Core invariant for Cartesian Coordinate Systems & The Euclidean Metric.",
          "ar": "الخاصية الرياضية الجوهرية لـ نظام الإحداثيات الديكارتية والمقياس الإقليدي."
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
          "id": "py-cartesian-coordinate-metric",
          "starterCode": "import numpy as np\n\ndef euclidean_distance(p: np.ndarray, q: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute the Euclidean distance between points p and q along the last axis.\n    \n    Parameters\n    ----------\n    p : np.ndarray\n        Coordinates of shape (..., D)\n    q : np.ndarray\n        Coordinates of shape (..., D), broadcastable with p\n        \n    Returns\n    -------\n    np.ndarray\n        Euclidean distance array reduced along axis -1.\n    \"\"\"\n    # TODO: Implement vectorized computation without loops\n    pass",
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
              "starterCode": "import numpy as np\n\ndef euclidean_distance(p: np.ndarray, q: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute the Euclidean distance between points p and q along the last axis.\n    \n    Parameters\n    ----------\n    p : np.ndarray\n        Coordinates of shape (..., D)\n    q : np.ndarray\n        Coordinates of shape (..., D), broadcastable with p\n        \n    Returns\n    -------\n    np.ndarray\n        Euclidean distance array reduced along axis -1.\n    \"\"\"\n    # TODO: Implement vectorized computation without loops\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef euclidean_distance(p: np.ndarray, q: np.ndarray) -> np.ndarray:\n    return np.sqrt(np.sum((p - q) ** 2, axis=-1))"
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
            "en": "What is the foundational invariant governing Cartesian Coordinate Systems & The Euclidean Metric?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم نظام الإحداثيات الديكارتية والمقياس الإقليدي؟"
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
    "id": "linear-rate-of-change-slopes",
    "title": "The Geometry of Rate of Change & Slopes",
    "titleAr": "هندسة معدل التغير والميل",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "If you walk up a straight ramp, for every meter you advance horizontally, you gain a fixed number of centimeters in elevation. The \"slope\" i...",
      "ar": "الميل هو المقياس الهندسي لشدة انحدار الخط المستقيم، وهو يُعبر عن ظل زاوية الميلان ($\\tan \\theta$) بالنسبة للمحور الأفقي الموجب. يعكس الميل ا..."
    },
    "prerequisites": [
      "cartesian-coordinate-metric"
    ],
    "x": 175,
    "y": 175,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LinearSlopeRateCanvas",
        "narrative": {
          "en": "If you walk up a straight ramp, for every meter you advance horizontally, you gain a fixed number of centimeters in elevation. The \"slope\" is the constant ratio of vertical climb to horizontal progress. It is not an abstract fraction; it is the steepness angle translated into an operational rate. \n\nWhen a line is horizontal, walking forward costs zero vertical climb (slope $= 0$). When a line is vertical, you must climb infinitely high without advancing a single step forward (slope is undefined or infinite). A negative slope means walking forward takes you downhill.",
          "ar": "الميل هو المقياس الهندسي لشدة انحدار الخط المستقيم، وهو يُعبر عن ظل زاوية الميلان ($\\tan \\theta$) بالنسبة للمحور الأفقي الموجب. يعكس الميل النسبة الصارمة بين التغير الرأسي والتغير الأفقي؛ فكل خطوة نخطوها إلى اليمين بمقدار وحدة واحدة تقابلها إزاحة رأسية بمقدار $m$."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "m \\coloneqq \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan(\\theta), \\quad \\text{where } \\theta \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right), \\; \\Delta x \\ne 0",
        "formulaNote": {
          "en": "Core invariant for The Geometry of Rate of Change & Slopes.",
          "ar": "الخاصية الرياضية الجوهرية لـ هندسة معدل التغير والميل."
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
          "id": "py-linear-rate-of-change-slopes",
          "starterCode": "import numpy as np\n\ndef central_difference_stencil(y: np.ndarray, dx: float) -> np.ndarray:\n    \"\"\"\n    Compute second-order central difference derivative for interior points.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        1D array of function values at uniform grid points, shape (N,)\n    dx : float\n        Uniform step size between adjacent grid points\n        \n    Returns\n    -------\n    np.ndarray\n        Approximated derivatives at interior points, shape (N - 2,)\n    \"\"\"\n    # TODO: Implement vectorized 3-point stencil using array slicing\n    pass",
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
              "starterCode": "import numpy as np\n\ndef central_difference_stencil(y: np.ndarray, dx: float) -> np.ndarray:\n    \"\"\"\n    Compute second-order central difference derivative for interior points.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        1D array of function values at uniform grid points, shape (N,)\n    dx : float\n        Uniform step size between adjacent grid points\n        \n    Returns\n    -------\n    np.ndarray\n        Approximated derivatives at interior points, shape (N - 2,)\n    \"\"\"\n    # TODO: Implement vectorized 3-point stencil using array slicing\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef central_difference_stencil(y: np.ndarray, dx: float) -> np.ndarray:\n    return (y[2:] - y[:-2]) / (2.0 * dx)"
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
            "en": "What is the foundational invariant governing The Geometry of Rate of Change & Slopes?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم هندسة معدل التغير والميل؟"
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
    "id": "linear-algebra-vectors",
    "title": "Vectors as Directed Line Segments & Spatial Displacements",
    "titleAr": "المتجهات كقطع مستقيمة موجهة وإزاحات مكانية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "A number (scalar) tells you \"how much\" (e.g., 5 kilograms, 20 degrees Celsius). But if you ask a guide in a forest which way to safety, hear...",
      "ar": "المتجه ليس مجرد عمود من الأرقام، بل هو إزاحة مكانية موجهة تمتلك مقداراً (طولاً) واتجاهاً محدداً. المتجهات كائنات طليقة حرة في الفضاء؛ نقل ال..."
    },
    "prerequisites": [
      "cartesian-coordinate-metric"
    ],
    "x": 175,
    "y": 270,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "VectorGeometryCanvas",
        "narrative": {
          "en": "A number (scalar) tells you \"how much\" (e.g., 5 kilograms, 20 degrees Celsius). But if you ask a guide in a forest which way to safety, hearing \"walk 5 kilometers\" is useless. You must know which direction to walk. \n\nA vector is a quantity endowed with both magnitude (how far) and direction (which way). Crucially, a vector is not nailed down to one spot: if you walk 3 steps north and 4 steps east in Paris, and a friend walks 3 steps north and 4 steps east in Tokyo, you have both performed the exact same spatial displacement vector.",
          "ar": "المتجه ليس مجرد عمود من الأرقام، بل هو إزاحة مكانية موجهة تمتلك مقداراً (طولاً) واتجاهاً محدداً. المتجهات كائنات طليقة حرة في الفضاء؛ نقل المتجه موازياً لنفسه لا يغير من هويته الرياضية شيئاً. نُمثل المتجه جبرياً كعمود إحداثيات يصف مقدار القفز على طول المحاور."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{v} \\coloneqq \\begin{bmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{bmatrix} \\in \\mathbb{R}^n, \\quad \\|\\mathbf{v}\\| \\coloneqq \\sqrt{\\mathbf{v}^T \\mathbf{v}} = \\sqrt{\\sum_{i=1}^n v_i^2}, \\quad \\hat{\\mathbf{v}} = \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|}",
        "formulaNote": {
          "en": "Core invariant for Vectors as Directed Line Segments & Spatial Displacements.",
          "ar": "الخاصية الرياضية الجوهرية لـ المتجهات كقطع مستقيمة موجهة وإزاحات مكانية."
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
          "id": "py-linear-algebra-vectors",
          "starterCode": "import numpy as np\n\ndef vector_lp_norm(v: np.ndarray, p: float) -> np.ndarray:\n    \"\"\"\n    Compute the Lp norm of vectors along the trailing dimension.\n    \n    Parameters\n    ----------\n    v : np.ndarray\n        Array of vectors with shape (..., D)\n    p : float\n        Norm order (p >= 1.0 or np.inf)\n        \n    Returns\n    -------\n    np.ndarray\n        Lp norm reduced along axis -1.\n    \"\"\"\n    # TODO: Implement vectorized Lp norm handling both finite p and np.inf\n    pass",
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
              "starterCode": "import numpy as np\n\ndef vector_lp_norm(v: np.ndarray, p: float) -> np.ndarray:\n    \"\"\"\n    Compute the Lp norm of vectors along the trailing dimension.\n    \n    Parameters\n    ----------\n    v : np.ndarray\n        Array of vectors with shape (..., D)\n    p : float\n        Norm order (p >= 1.0 or np.inf)\n        \n    Returns\n    -------\n    np.ndarray\n        Lp norm reduced along axis -1.\n    \"\"\"\n    # TODO: Implement vectorized Lp norm handling both finite p and np.inf\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef vector_lp_norm(v: np.ndarray, p: float) -> np.ndarray:\n    if np.isinf(p):\n        return np.max(np.abs(v), axis=-1)\n    return np.sum(np.abs(v) ** p, axis=-1) ** (1.0 / p)"
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
            "en": "What is the foundational invariant governing Vectors as Directed Line Segments & Spatial Displacements?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المتجهات كقطع مستقيمة موجهة وإزاحات مكانية؟"
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
    "id": "linear-combinations-span",
    "title": "Linear Combinations, Span & Linear Independence",
    "titleAr": "التراكيب الخطية، فضاء التوليد، والاستقلال الخطي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you have two motorized joysticks on a flat table: Joystick 1 moves your robotic rover 1 meter forward and 1 meter right. Joystick 2 ...",
      "ar": "التركيب الخطي هو عملية وزن المتجهات بمقاييس عددية ثم جمعها معاً. فضاء التوليد (Span) هو كامل الفضاء الجزئي المتشكل من كل النقاط الممكن الوصو..."
    },
    "prerequisites": [
      "linear-algebra-vectors"
    ],
    "x": 140,
    "y": 365,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "VectorSpanBasisCanvas",
        "narrative": {
          "en": "Imagine you have two motorized joysticks on a flat table: Joystick 1 moves your robotic rover 1 meter forward and 1 meter right. Joystick 2 moves your rover 1 meter forward and 1 meter left. By pushing Joystick 1 by some amount $c_1$ and Joystick 2 by some amount $c_2$, can you steer the rover to any point on the entire table? \n\nYes, because the two directions are not redundant. The set of all locations you can reach is the \"span\" of the two motions. But if Joystick 2 had instead moved 2 meters forward and 2 meters right, it would merely duplicate Joystick 1's trajectory—you would be trapped",
          "ar": "التركيب الخطي هو عملية وزن المتجهات بمقاييس عددية ثم جمعها معاً. فضاء التوليد (Span) هو كامل الفضاء الجزئي المتشكل من كل النقاط الممكن الوصول إليها عبر تلك التراكيب. تكون المتجهات \"مستقلة خطياً\" إذا لم يكن أحدها مكرراً أو ناتجاً عن دمج الآخرين؛ أي أن الوصول إلى نقطة الصفر لا يتحقق إلا بتصفير جميع المعاملات العددية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{w} = \\sum_{j=1}^k c_j \\mathbf{v}_j = \\mathbf{V} \\mathbf{c}, \\quad \\text{Span}(\\{\\mathbf{v}_1, \\dots, \\mathbf{v}_k\\}) \\coloneqq \\left\\{ \\sum_{j=1}^k c_j \\mathbf{v}_j \\;\\middle|\\; c_j \\in \\mathbb{R} \\right\\}",
        "formulaNote": {
          "en": "Core invariant for Linear Combinations, Span & Linear Independence.",
          "ar": "الخاصية الرياضية الجوهرية لـ التراكيب الخطية، فضاء التوليد، والاستقلال الخطي."
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
          "id": "py-linear-combinations-span",
          "starterCode": "import numpy as np\n\ndef batch_linear_combination(basis_vectors: np.ndarray, coefficients: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute batch linear combinations of basis vectors.\n    \n    Parameters\n    ----------\n    basis_vectors : np.ndarray\n        Array of shape (K, D) where row k is vector v_k\n    coefficients : np.ndarray\n        Array of shape (B, K) where row b has weights [c_1, ..., c_K]\n        \n    Returns\n    -------\n    np.ndarray\n        Combined vectors of shape (B, D)\n    \"\"\"\n    # TODO: Implement vectorized batch combination without Python loops\n    pass",
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
              "starterCode": "import numpy as np\n\ndef batch_linear_combination(basis_vectors: np.ndarray, coefficients: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute batch linear combinations of basis vectors.\n    \n    Parameters\n    ----------\n    basis_vectors : np.ndarray\n        Array of shape (K, D) where row k is vector v_k\n    coefficients : np.ndarray\n        Array of shape (B, K) where row b has weights [c_1, ..., c_K]\n        \n    Returns\n    -------\n    np.ndarray\n        Combined vectors of shape (B, D)\n    \"\"\"\n    # TODO: Implement vectorized batch combination without Python loops\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef batch_linear_combination(basis_vectors: np.ndarray, coefficients: np.ndarray) -> np.ndarray:\n    return coefficients @ basis_vectors"
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
            "en": "What is the foundational invariant governing Linear Combinations, Span & Linear Independence?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التراكيب الخطية، فضاء التوليد، والاستقلال الخطي؟"
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
    "id": "dot-product-geometry",
    "title": "The Dot Product & Geometric Projection Duality",
    "titleAr": "الضرب النقطي وازدواجية الإسقاط الهندسي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Turn on a spotlight shining straight down onto the ground. Hold an arrow $\\mathbf{v}$ slanted in the air above a horizontal ruler $\\mathbf{u...",
      "ar": "الضرب النقطي هو الجسر السحري بين الحساب الجبري والهندسة المكانية؛ إذ يختزل متجهين في رقم قياسي واحد يُعبر عن مدى توافقهما الاتجاهي. هندسياً،..."
    },
    "prerequisites": [
      "linear-algebra-vectors"
    ],
    "x": 160,
    "y": 460,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DotProductProjectionCanvas",
        "narrative": {
          "en": "Turn on a spotlight shining straight down onto the ground. Hold an arrow $\\mathbf{v}$ slanted in the air above a horizontal ruler $\\mathbf{u}$. The shadow cast by arrow $\\mathbf{v}$ onto the ruler has a measurable length. \n\nIf you multiply that shadow's length by the length of the ruler $\\mathbf{u}$, you get a single number: the dot product $\\mathbf{u} \\cdot \\mathbf{v}$. If $\\mathbf{v}$ points perpendicular to $\\mathbf{u}$, the shadow vanishes to a dot of length zero ($\\mathbf{u} \\cdot \\mathbf{v} = 0$). If $\\mathbf{v}$ tilts backwards, the shadow falls behind the origin, yielding a negative nu",
          "ar": "الضرب النقطي هو الجسر السحري بين الحساب الجبري والهندسة المكانية؛ إذ يختزل متجهين في رقم قياسي واحد يُعبر عن مدى توافقهما الاتجاهي. هندسياً، يعادل الضرب النقطي قياس طول \"الظل\" الذي يسقطه أحد المتجهين عمودياً على الآخر، مضروباً في طول المتجه المُستقبل. إذا تعامد المتجهان تضاءل الظل إلى نقطة وانعدم الناتج."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{u}^T \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2 \\cos(\\theta)",
        "formulaNote": {
          "en": "Core invariant for The Dot Product & Geometric Projection Duality.",
          "ar": "الخاصية الرياضية الجوهرية لـ الضرب النقطي وازدواجية الإسقاط الهندسي."
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
          "id": "py-dot-product-geometry",
          "starterCode": "import numpy as np\n\ndef vector_projection_and_angle(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute orthogonal projection of v onto u, and the angle between them.\n    \n    Parameters\n    ----------\n    u : np.ndarray\n        Direction vector of shape (D,), ||u|| > 0\n    v : np.ndarray\n        Vector to project, shape (D,)\n        \n    Returns\n    -------\n    tuple[np.ndarray, float]\n        proj: Orthogonal projection vector of shape (D,)\n        angle: Angle theta between u and v in radians [0, pi]\n    \"\"\"\n    # TODO: Implement projection and clipped arccos calculation\n    pass",
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
              "starterCode": "import numpy as np\n\ndef vector_projection_and_angle(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute orthogonal projection of v onto u, and the angle between them.\n    \n    Parameters\n    ----------\n    u : np.ndarray\n        Direction vector of shape (D,), ||u|| > 0\n    v : np.ndarray\n        Vector to project, shape (D,)\n        \n    Returns\n    -------\n    tuple[np.ndarray, float]\n        proj: Orthogonal projection vector of shape (D,)\n        angle: Angle theta between u and v in radians [0, pi]\n    \"\"\"\n    # TODO: Implement projection and clipped arccos calculation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef vector_projection_and_angle(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, float]:\n    dot = float(np.dot(u, v))\n    u_norm_sq = float(np.dot(u, u))\n    proj = (dot / u_norm_sq) * u\n    cos_theta = np.clip(dot / (np.sqrt(u_norm_sq) * float(np.linalg.norm(v))), -1.0, 1.0)\n    angle = float(np.arccos(cos_theta))\n    return proj, angle"
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
            "en": "What is the foundational invariant governing The Dot Product & Geometric Projection Duality?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الضرب النقطي وازدواجية الإسقاط الهندسي؟"
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
    "id": "cross-product-orthogonality",
    "title": "The Cross Product, Orthogonality & Oriented Area",
    "titleAr": "الضرب الاتجاهي، التعامد، والمساحة الموجهة",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Hold two pencils in your hand meeting at their erasers, forming a \"V\". The two pencils define a flat sheet of paper (a 2D plane) in 3D space...",
      "ar": "الضرب الاتجاهي (الخارجي) هو عملية فريدة خاصة بالفضاء ثلاثي الأبعاد $\\mathbb{R}^3$؛ يأخذ متجهين ويُنتج متجهاً ثالثاً عمودياً تماماً على المست..."
    },
    "prerequisites": [
      "dot-product-geometry"
    ],
    "x": 140,
    "y": 555,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "CrossProductAreaCanvas",
        "narrative": {
          "en": "Hold two pencils in your hand meeting at their erasers, forming a \"V\". The two pencils define a flat sheet of paper (a 2D plane) in 3D space. How can you construct a third pencil that stands perfectly perpendicular to that paper, pointing away from both pencils simultaneously? \n\nAnd how long should that perpendicular pencil be? The cross product $\\mathbf{u} \\times \\mathbf{v}$ solves both problems at once: it produces a vector whose direction follows the \"right-hand rule\" (curl your fingers from $\\mathbf{u}$ to $\\mathbf{v}$, and your thumb points along the result), and whose length is exactly e",
          "ar": "الضرب الاتجاهي (الخارجي) هو عملية فريدة خاصة بالفضاء ثلاثي الأبعاد $\\mathbb{R}^3$؛ يأخذ متجهين ويُنتج متجهاً ثالثاً عمودياً تماماً على المستوي الذي يحتويهما. مقدار هذا المتجه الناتج يُساوي هندسياً مساحة متوازي الأضلاع المحصور بينهما، بينما يتحدد اتجاهه الصارم بقاعدة اليد اليمنى، وهو مضاد للتناظر ($\\mathbf{u} \\times \\mathbf{v} = -\\mathbf{v} \\times \\mathbf{u}$)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{u} \\times \\mathbf{v} \\coloneqq \\begin{bmatrix} u_2 v_3 - u_3 v_2 \\\\ u_3 v_1 - u_1 v_3 \\\\ u_1 v_2 - u_2 v_1 \\end{bmatrix} = \\det \\begin{bmatrix} \\hat{\\mathbf{i}} & \\hat{\\mathbf{j}} & \\hat{\\mathbf{k}} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{bmatrix} \\in \\mathbb{R}^3",
        "formulaNote": {
          "en": "Core invariant for The Cross Product, Orthogonality & Oriented Area.",
          "ar": "الخاصية الرياضية الجوهرية لـ الضرب الاتجاهي، التعامد، والمساحة الموجهة."
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
          "id": "py-cross-product-orthogonality",
          "starterCode": "import numpy as np\n\ndef batch_cross_product_and_area(a: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute batch 3D cross products and corresponding parallelogram areas.\n    \n    Parameters\n    ----------\n    a : np.ndarray\n        Array of 3D vectors of shape (..., 3)\n    b : np.ndarray\n        Array of 3D vectors of shape (..., 3)\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        cross: Array of cross products of shape (..., 3)\n        area: Array of parallelogram areas of shape (...)\n    \"\"\"\n    # TODO: Implement vectorized 3D cross product and norm reduction\n    pass",
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
              "starterCode": "import numpy as np\n\ndef batch_cross_product_and_area(a: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute batch 3D cross products and corresponding parallelogram areas.\n    \n    Parameters\n    ----------\n    a : np.ndarray\n        Array of 3D vectors of shape (..., 3)\n    b : np.ndarray\n        Array of 3D vectors of shape (..., 3)\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        cross: Array of cross products of shape (..., 3)\n        area: Array of parallelogram areas of shape (...)\n    \"\"\"\n    # TODO: Implement vectorized 3D cross product and norm reduction\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef batch_cross_product_and_area(a: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    cross = np.cross(a, b)\n    area = np.linalg.norm(cross, axis=-1)\n    return cross, area"
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
            "en": "What is the foundational invariant governing The Cross Product, Orthogonality & Oriented Area?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الضرب الاتجاهي، التعامد، والمساحة الموجهة؟"
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
    "id": "linear-maps-transformations",
    "title": "Linear Maps as Space Transformations",
    "titleAr": "التحويلات الخطية كعمليات تحويل للفضاء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine space is printed on an infinite, stretchable sheet of transparent rubber with a grid drawn on it. Now grip the sheet and deform it. ...",
      "ar": "التحويل الخطي هو دالة تنقل متجهات الفضاء مع الحفاظ الصارم على بنيته الأساسية؛ فلا ينحني خط مستقيم، ولا تتفاوت المسافات بين خطوط الشبكة، وتبق..."
    },
    "prerequisites": [
      "linear-combinations-span"
    ],
    "x": 160,
    "y": 650,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LinearTransformMorphCanvas",
        "narrative": {
          "en": "Imagine space is printed on an infinite, stretchable sheet of transparent rubber with a grid drawn on it. Now grip the sheet and deform it. What makes a deformation \"linear\"? \nTwo unbreakable rules:\n1. The origin $\\mathbf{0}$ stays permanently pinned down at $(0, 0)$.\n2. All grid lines remain perfectly straight and evenly spaced. \n\nYou may stretch the sheet, rotate it, reflect it, or shear it sideways into a diamond pattern. But you are never allowed to bend grid lines into curves or rip the origin away from $(0,0)$. Because straightness and even spacing are preserved, you do not need to track",
          "ar": "التحويل الخطي هو دالة تنقل متجهات الفضاء مع الحفاظ الصارم على بنيته الأساسية؛ فلا ينحني خط مستقيم، ولا تتفاوت المسافات بين خطوط الشبكة، وتبقى نقطة الأصل راسخة في مكانها. تتلخص العبقرية الرياضية في أن معرفة مصير متجهات الأساس المعيارية $\\hat{\\mathbf{i}}$ و $\\hat{\\mathbf{j}}$ تكفي تماماً للتنبؤ بمصير أي نقطة أخرى في الكون، حيث تُشكل مواقع هبوطهما أعمدة مصفوفة التحويل."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "T: \\mathbb{R}^n \\to \\mathbb{R}^m, \\quad T(c\\mathbf{u} + d\\mathbf{v}) = c T(\\mathbf{u}) + d T(\\mathbf{v}) \\quad \\forall \\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n, \\; c, d \\in \\mathbb{R}",
        "formulaNote": {
          "en": "Core invariant for Linear Maps as Space Transformations.",
          "ar": "الخاصية الرياضية الجوهرية لـ التحويلات الخطية كعمليات تحويل للفضاء."
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
          "id": "py-linear-maps-transformations",
          "starterCode": "import numpy as np\n\ndef apply_linear_transform(matrix: np.ndarray, points: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Apply a linear transformation matrix to a batch of row points.\n    \n    Parameters\n    ----------\n    matrix : np.ndarray\n        Transformation matrix of shape (M, N)\n    points : np.ndarray\n        Point cloud array of shape (B, N)\n        \n    Returns\n    -------\n    np.ndarray\n        Transformed points of shape (B, M)\n    \"\"\"\n    # TODO: Implement vectorized transformation without Python loops\n    pass",
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
              "starterCode": "import numpy as np\n\ndef apply_linear_transform(matrix: np.ndarray, points: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Apply a linear transformation matrix to a batch of row points.\n    \n    Parameters\n    ----------\n    matrix : np.ndarray\n        Transformation matrix of shape (M, N)\n    points : np.ndarray\n        Point cloud array of shape (B, N)\n        \n    Returns\n    -------\n    np.ndarray\n        Transformed points of shape (B, M)\n    \"\"\"\n    # TODO: Implement vectorized transformation without Python loops\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef apply_linear_transform(matrix: np.ndarray, points: np.ndarray) -> np.ndarray:\n    return points @ matrix.T"
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
            "en": "What is the foundational invariant governing Linear Maps as Space Transformations?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التحويلات الخطية كعمليات تحويل للفضاء؟"
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
    "id": "matrix-multiplication-composition",
    "title": "Matrix Multiplication as Composition of Transformations",
    "titleAr": "ضرب المصفوفات كتركيب للتحويلات الهندسية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose you apply Transformation $A$ to a drawing (e.g., rotate it counter-clockwise by $90^\\circ$). Next, you take the result and apply Tra...",
      "ar": "ليس ضرب المصفوفات مجرد عملية حسابية للأرقام، بل هو تجسيد هندسي لـ \"تركيب التحويلات\" المتتابعة. إذا قمنا بتدوير الفضاء عبر مصفوفة $A$ ثم تمدي..."
    },
    "prerequisites": [
      "linear-maps-transformations"
    ],
    "x": 140,
    "y": 745,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "MatrixCompositionCanvas",
        "narrative": {
          "en": "Suppose you apply Transformation $A$ to a drawing (e.g., rotate it counter-clockwise by $90^\\circ$). Next, you take the result and apply Transformation $B$ (e.g., shear it horizontally). What single transformation would achieve the exact same final result in one leap? \n\nThat single compound transformation is the composition $B \\circ A$. Matrix multiplication is nothing more than calculating this combined action. Notice the order: you apply $A$ first, then $B$, written algebraically as $\\mathbf{B}\\mathbf{A}\\mathbf{x}$. Because rotating then shearing looks completely different from shearing then",
          "ar": "ليس ضرب المصفوفات مجرد عملية حسابية للأرقام، بل هو تجسيد هندسي لـ \"تركيب التحويلات\" المتتابعة. إذا قمنا بتدوير الفضاء عبر مصفوفة $A$ ثم تمديده عبر مصفوفة $B$، فإن حاصل الضرب $BA$ يُمثل التحويل الإجمالي الموحد. ولأن ترتيب العمليات الهندسية يُحدث فارقاً جذرياً في الشكل النهائي، فإن ضرب المصفوفات غير تبادلي ($BA \\ne AB$)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{B} \\in \\mathbb{R}^{m \\times n}, \\quad \\mathbf{A} \\in \\mathbb{R}^{n \\times p} \\implies \\mathbf{C} = \\mathbf{B}\\mathbf{A} \\in \\mathbb{R}^{m \\times p}",
        "formulaNote": {
          "en": "Core invariant for Matrix Multiplication as Composition of Transformations.",
          "ar": "الخاصية الرياضية الجوهرية لـ ضرب المصفوفات كتركيب للتحويلات الهندسية."
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
          "id": "py-matrix-multiplication-composition",
          "starterCode": "import numpy as np\n\ndef compose_2d_affine_transform(angle_rad: float, scale: tuple[float, float], translation: tuple[float, float]) -> np.ndarray:\n    \"\"\"\n    Compose a 3x3 2D affine transformation matrix: Translation @ Rotation @ Scale.\n    \n    Parameters\n    ----------\n    angle_rad : float\n        Rotation angle in radians\n    scale : tuple[float, float]\n        (sx, sy) scaling factors\n    translation : tuple[float, float]\n        (tx, ty) displacement vector\n        \n    Returns\n    -------\n    np.ndarray\n        3x3 homogeneous transformation matrix\n    \"\"\"\n    # TODO: Build elementary matrices and compose via matrix multiplication\n    pass",
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
              "starterCode": "import numpy as np\n\ndef compose_2d_affine_transform(angle_rad: float, scale: tuple[float, float], translation: tuple[float, float]) -> np.ndarray:\n    \"\"\"\n    Compose a 3x3 2D affine transformation matrix: Translation @ Rotation @ Scale.\n    \n    Parameters\n    ----------\n    angle_rad : float\n        Rotation angle in radians\n    scale : tuple[float, float]\n        (sx, sy) scaling factors\n    translation : tuple[float, float]\n        (tx, ty) displacement vector\n        \n    Returns\n    -------\n    np.ndarray\n        3x3 homogeneous transformation matrix\n    \"\"\"\n    # TODO: Build elementary matrices and compose via matrix multiplication\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compose_2d_affine_transform(angle_rad: float, scale: tuple[float, float], translation: tuple[float, float]) -> np.ndarray:\n    c, s = np.cos(angle_rad), np.sin(angle_rad)\n    sx, sy = scale\n    tx, ty = translation\n    T = np.array([[1.0, 0.0, tx], [0.0, 1.0, ty], [0.0, 0.0, 1.0]])\n    R = np.array([[c, -s, 0.0], [s, c, 0.0], [0.0, 0.0, 1.0]])\n    S = np.array([[sx, 0.0, 0.0], [0.0, sy, 0.0], [0.0, 0.0, 1.0]])\n    return T @ R @ S"
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
            "en": "What is the foundational invariant governing Matrix Multiplication as Composition of Transformations?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم ضرب المصفوفات كتركيب للتحويلات الهندسية؟"
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
    "id": "determinant-scaling-factor",
    "title": "The Determinant as Area/Volume Scaling Factor",
    "titleAr": "المحدد كمعامل تمدد للمساحة والحجم",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Draw a unit square of area $1 \\times 1 = 1$ on the coordinate plane, with corners at $(0,0)$, $(1,0)$, $(0,1)$, and $(1,1)$. Now apply a lin...",
      "ar": "المحدد ليس مجرد صيغة حسابية معقدة للأقطار، بل هو المعامل الفيزيائي لتمدد أو انكماش الحجوم المكانية. يُعبر محدد المصفوفة $2 \\times 2$ عن المس..."
    },
    "prerequisites": [
      "matrix-multiplication-composition"
    ],
    "x": 160,
    "y": 840,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "DeterminantVolumeCanvas",
        "narrative": {
          "en": "Draw a unit square of area $1 \\times 1 = 1$ on the coordinate plane, with corners at $(0,0)$, $(1,0)$, $(0,1)$, and $(1,1)$. Now apply a linear transformation matrix $\\mathbf{A}$. The unit square gets distorted into a tilted parallelogram. \n\nWhat is the area of this new parallelogram? It is precisely the determinant of $\\mathbf{A}$! If $\\det(\\mathbf{A}) = 3$, every shape in the plane has its area tripled by the transformation. What if $\\det(\\mathbf{A})$ is negative? A negative sign indicates that the sheet of rubber was flipped over (spatial orientation was inverted, turning a right-handed",
          "ar": "المحدد ليس مجرد صيغة حسابية معقدة للأقطار، بل هو المعامل الفيزيائي لتمدد أو انكماش الحجوم المكانية. يُعبر محدد المصفوفة $2 \\times 2$ عن المساحة الموجهة لمتوازي الأضلاع الناتج عن تشويه المربع المعياري. إذا كان المحدد سالباً، فهذا يعني أن الفضاء قد قُلب ظهراً لبطن (انعكاس التوجيه). أما إذا بلغ المحدد صفراً، فهذا يعني أن الفضاء قد سُحق وضُغط في بعد أقل، مما يجعل استرجاع المعلومات الأصلية مستحيلاً (مصفوفة غير قابلة للعكس)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\in \\mathbb{R}^{2 \\times 2} \\implies \\det(\\mathbf{A}) = ad - bc",
        "formulaNote": {
          "en": "Core invariant for The Determinant as Area/Volume Scaling Factor.",
          "ar": "الخاصية الرياضية الجوهرية لـ المحدد كمعامل تمدد للمساحة والحجم."
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
          "id": "py-determinant-scaling-factor",
          "starterCode": "import numpy as np\n\ndef volume_scaling_factor(matrix: np.ndarray) -> tuple[float, int, bool]:\n    \"\"\"\n    Compute volume scaling factor, orientation parity, and invertibility of a square matrix.\n    \n    Parameters\n    ----------\n    matrix : np.ndarray\n        Square matrix of shape (N, N)\n        \n    Returns\n    -------\n    tuple[float, int, bool]\n        scale: |det(A)|\n        parity: +1 (preserved), -1 (inverted), 0 (collapsed)\n        invertible: True if scale > 1e-12 else False\n    \"\"\"\n    # TODO: Implement determinant analysis using np.linalg.det\n    pass",
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
              "starterCode": "import numpy as np\n\ndef volume_scaling_factor(matrix: np.ndarray) -> tuple[float, int, bool]:\n    \"\"\"\n    Compute volume scaling factor, orientation parity, and invertibility of a square matrix.\n    \n    Parameters\n    ----------\n    matrix : np.ndarray\n        Square matrix of shape (N, N)\n        \n    Returns\n    -------\n    tuple[float, int, bool]\n        scale: |det(A)|\n        parity: +1 (preserved), -1 (inverted), 0 (collapsed)\n        invertible: True if scale > 1e-12 else False\n    \"\"\"\n    # TODO: Implement determinant analysis using np.linalg.det\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef volume_scaling_factor(matrix: np.ndarray) -> tuple[float, int, bool]:\n    det = float(np.linalg.det(matrix))\n    scale = abs(det)\n    if det > 1e-12:\n        parity = 1\n    elif det < -1e-12:\n        parity = -1\n    else:\n        parity = 0\n    is_invertible = scale > 1e-12\n    return scale, parity, is_invertible"
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
            "en": "What is the foundational invariant governing The Determinant as Area/Volume Scaling Factor?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المحدد كمعامل تمدد للمساحة والحجم؟"
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
    "id": "gaussian-elimination-systems",
    "title": "Gaussian Elimination, Row Operations & Linear Systems",
    "titleAr": "الحذف الغاوسي، العمليات الصفية، ومنظومات المعادلات الخطية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine a crime investigation with three suspects, where you are given three tangled clues relating their heights, weights, and shoe sizes. ...",
      "ar": "الحذف الغاوسي هو خوارزمية منهجية لتحويل منظومة معادلات خطية متداخلة $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ إلى شكل درجِي بسيط يسهل حله بالتعويض..."
    },
    "prerequisites": [
      "matrix-multiplication-composition"
    ],
    "x": 140,
    "y": 935,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LinearSystemSolverCanvas",
        "narrative": {
          "en": "Imagine a crime investigation with three suspects, where you are given three tangled clues relating their heights, weights, and shoe sizes. If every clue mixes all three variables together, your mind gets overwhelmed. \n\nGaussian elimination is a systematic method of untangling the clues without altering the truth. You are allowed to:\n1. Swap the order of clues.\n2. Multiply a clue by a non-zero number.\n3. Add or subtract one clue from another.\nBy systematically using the first clue to cancel out the first suspect from all subsequent clues, you transform a tangled web of equations into an organi",
          "ar": "الحذف الغاوسي هو خوارزمية منهجية لتحويل منظومة معادلات خطية متداخلة $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ إلى شكل درجِي بسيط يسهل حله بالتعويض الخلفي. هندسياً، تُمثل كل معادلة مستوياً فائقاً في الفضاء، وحل المنظومة هو نقطة تقاطع تلك المستويات جميعاً. العمليات الصفية الأولية (التبديل، الضرب بمقياس، والإضافة) لا تغير نقطة التقاطع الهندسية أبداً، بل تُبسط المحاور الحسابية كاشفة عن الحل الصريح."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "[\\mathbf{A} \\mid \\mathbf{b}] = \\begin{bmatrix} a_{11} & a_{12} & \\cdots & a_{1n} & \\mid & b_1 \\\\ a_{21} & a_{22} & \\cdots & a_{2n} & \\mid & b_2 \\\\ \\vdots & \\vdots & \\ddots & \\vdots & \\mid & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} & \\mid & b_m \\end{bmatrix} \\xrightarrow{\\text{Row Operations}} \\begin{bmatrix} p_1 & * & \\cdots & * & \\mid & \\tilde{b}_1 \\\\ 0 & p_2 & \\cdots & * & \\mid & \\tilde{b}_2 \\\\ \\vdots & \\vdots & \\ddots & \\vdots & \\mid & \\vdots \\\\ 0 & 0 & \\cdots & p_r & \\mid & \\tilde{b}_r \\end{bmatrix}",
        "formulaNote": {
          "en": "Core invariant for Gaussian Elimination, Row Operations & Linear Systems.",
          "ar": "الخاصية الرياضية الجوهرية لـ الحذف الغاوسي، العمليات الصفية، ومنظومات المعادلات الخطية."
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
          "id": "py-gaussian-elimination-systems",
          "starterCode": "import numpy as np\n\ndef solve_linear_system(A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Solve linear system A x = b and compute residual norm ||b - A x||_2.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Invertible square matrix of shape (N, N)\n    b : np.ndarray\n        Target vector of shape (N,)\n        \n    Returns\n    -------\n    tuple[np.ndarray, float]\n        x: Solution vector of shape (N,)\n        residual: L2 norm of residual ||b - A x||_2\n    \"\"\"\n    # TODO: Implement solve using np.linalg.solve and compute residual\n    pass",
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
              "starterCode": "import numpy as np\n\ndef solve_linear_system(A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Solve linear system A x = b and compute residual norm ||b - A x||_2.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Invertible square matrix of shape (N, N)\n    b : np.ndarray\n        Target vector of shape (N,)\n        \n    Returns\n    -------\n    tuple[np.ndarray, float]\n        x: Solution vector of shape (N,)\n        residual: L2 norm of residual ||b - A x||_2\n    \"\"\"\n    # TODO: Implement solve using np.linalg.solve and compute residual\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef solve_linear_system(A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, float]:\n    x = np.linalg.solve(A, b)\n    residual = float(np.linalg.norm(b - A @ x))\n    return x, residual"
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
            "en": "What is the foundational invariant governing Gaussian Elimination, Row Operations & Linear Systems?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الحذف الغاوسي، العمليات الصفية، ومنظومات المعادلات الخطية؟"
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
    "id": "four-fundamental-subspaces",
    "title": "The Four Fundamental Subspaces",
    "titleAr": "الفضاءات الجزئية الأربعة الأساسية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Every matrix $\\mathbf{A}$ acts like a cosmic funnel connecting two different worlds: an input world $\\mathbb{R}^n$ and an output world $\\mat...",
      "ar": "تُقسّم أي مصفوفة $A \\in \\mathbb{R}^{m \\times n}$ فضاء المنطلق $\\mathbb{R}^n$ وفضاء المستقر $\\mathbb{R}^m$ إلى أربعة فضاءات جزئية أساسية متعا..."
    },
    "prerequisites": [
      "gaussian-elimination-systems"
    ],
    "x": 160,
    "y": 1030,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "FundamentalSubspacesCanvas",
        "narrative": {
          "en": "Every matrix $\\mathbf{A}$ acts like a cosmic funnel connecting two different worlds: an input world $\\mathbb{R}^n$ and an output world $\\mathbb{R}^m$. Gilbert Strang calls the structural breakdown of these worlds \"The Fundamental Theorem of Linear Algebra.\" \n\nIn the input world $\\mathbb{R}^n$, any vector you feed into $\\mathbf{A}$ splits into two orthogonal personalities:\n1. A component in the Row Space ($\\mathcal{C}(\\mathbf{A}^T)$), which gets safely delivered into the output world.\n2. A component in the Nullspace ($\\mathcal{N}(\\mathbf{A})$), which gets completely incinerated into $\\m",
          "ar": "تُقسّم أي مصفوفة $A \\in \\mathbb{R}^{m \\times n}$ فضاء المنطلق $\\mathbb{R}^n$ وفضاء المستقر $\\mathbb{R}^m$ إلى أربعة فضاءات جزئية أساسية متعامدة مثنى مثنى. فضاء الصفوف وفضاء النواة يتعامدان تماماً داخل المنطلق، بينما يتعامد فضاء الأعمدة مع النواة اليسرى داخل المستقر. المعجزة الكبرى هي أن بعد فضاء الصفوف يساوي دوماً بعد فضاء الأعمدة، ويسمى هذا البعد المشترك \"رتبة المصفوفة\" ($r$)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A} \\in \\mathbb{R}^{m \\times n}, \\quad \\operatorname{rank}(\\mathbf{A}) = r",
        "formulaNote": {
          "en": "Core invariant for The Four Fundamental Subspaces.",
          "ar": "الخاصية الرياضية الجوهرية لـ الفضاءات الجزئية الأربعة الأساسية."
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
          "id": "py-four-fundamental-subspaces",
          "starterCode": "import numpy as np\n\ndef matrix_rank_and_subspaces(A: np.ndarray, tol: float = 1e-10) -> tuple[int, np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute numerical rank, column space basis, and null space basis via SVD.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Matrix of shape (M, N)\n    tol : float\n        Singular value threshold for rank determination\n        \n    Returns\n    -------\n    tuple[int, np.ndarray, np.ndarray]\n        rank: Numerical rank r\n        col_basis: Orthonormal basis for col(A), shape (M, r)\n        null_basis: Orthonormal basis for null(A), shape (N, N - r)\n    \"\"\"\n    # TODO: Implement SVD-based subspace extraction\n    pass",
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
              "starterCode": "import numpy as np\n\ndef matrix_rank_and_subspaces(A: np.ndarray, tol: float = 1e-10) -> tuple[int, np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute numerical rank, column space basis, and null space basis via SVD.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Matrix of shape (M, N)\n    tol : float\n        Singular value threshold for rank determination\n        \n    Returns\n    -------\n    tuple[int, np.ndarray, np.ndarray]\n        rank: Numerical rank r\n        col_basis: Orthonormal basis for col(A), shape (M, r)\n        null_basis: Orthonormal basis for null(A), shape (N, N - r)\n    \"\"\"\n    # TODO: Implement SVD-based subspace extraction\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef matrix_rank_and_subspaces(A: np.ndarray, tol: float = 1e-10) -> tuple[int, np.ndarray, np.ndarray]:\n    U, s, Vt = np.linalg.svd(A, full_matrices=True)\n    rank = int(np.sum(s > tol))\n    col_basis = U[:, :rank]\n    null_basis = Vt[rank:, :].T\n    return rank, col_basis, null_basis"
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
            "en": "What is the foundational invariant governing The Four Fundamental Subspaces?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الفضاءات الجزئية الأربعة الأساسية؟"
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
    "id": "orthogonal-projections",
    "title": "Orthogonal Projections & Least Squares Approximation",
    "titleAr": "الإسقاطات المتعامدة وتقريب المربعات الصغرى",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "You are trying to solve $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$, but you have more equations than unknowns (e.g., 1,000 data points collected fr...",
      "ar": "عندما تكون منظومة المعادلات الخطية فوق المُحددة مستحيلة الحل بسبب وجود ضوضاء تجريبية تجعل الهدف $\\mathbf{b}$ خارج فضاء الأعمدة، فإننا نلجأ إ..."
    },
    "prerequisites": [
      "dot-product-geometry"
    ],
    "x": 140,
    "y": 1125,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GramSchmidtOrthogonalCanvas",
        "narrative": {
          "en": "You are trying to solve $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$, but you have more equations than unknowns (e.g., 1,000 data points collected from a lab experiment, but only a 2-parameter straight line $y = mx + c$ to fit them). Your target vector $\\mathbf{b}$ does not live inside the reachable column space $\\mathcal{C}(\\mathbf{A})$. There is NO exact solution. \n\nWhat is the most honest, optimal compromise? Drop an orthogonal perpendicular plumb-line from $\\mathbf{b}$ straight down onto the plane $\\mathcal{C}(\\mathbf{A})$. The point on the plane where the plumb-line lands is $\\mathbf{p} = \\mathbf{",
          "ar": "عندما تكون منظومة المعادلات الخطية فوق المُحددة مستحيلة الحل بسبب وجود ضوضاء تجريبية تجعل الهدف $\\mathbf{b}$ خارج فضاء الأعمدة، فإننا نلجأ إلى حل المربعات الصغرى. هندسياً، نسقط المتجه $\\mathbf{b}$ عمودياً على فضاء الأعمدة للحصول على أفضل تقريب ممكن $\\mathbf{p}$. يكون متجه الخطأ $\\mathbf{e} = \\mathbf{b} - \\mathbf{p}$ متعامداً بالكامل مع فضاء الأعمدة، مما يولد المعادلات الطبيعية الشهيرة $\\mathbf{A}^T \\mathbf{A} \\hat{\\mathbf{x}} = \\mathbf{A}^T \\mathbf{b}$."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\hat{\\mathbf{x}} = \\arg\\min_{\\mathbf{x} \\in \\mathbb{R}^n} \\|\\mathbf{b} - \\mathbf{A}\\mathbf{x}\\|_2^2 \\implies \\mathbf{A}^T (\\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}) = \\mathbf{0}",
        "formulaNote": {
          "en": "Core invariant for Orthogonal Projections & Least Squares Approximation.",
          "ar": "الخاصية الرياضية الجوهرية لـ الإسقاطات المتعامدة وتقريب المربعات الصغرى."
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
          "id": "py-orthogonal-projections",
          "starterCode": "import numpy as np\n\ndef subspace_projection_matrix(A: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Construct the orthogonal projection matrix onto col(A).\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Matrix of shape (M, K) with linearly independent columns\n        \n    Returns\n    -------\n    np.ndarray\n        Orthogonal projection matrix P of shape (M, M)\n    \"\"\"\n    # TODO: Implement orthogonal projector via QR or Normal Equations\n    pass",
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
              "starterCode": "import numpy as np\n\ndef subspace_projection_matrix(A: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Construct the orthogonal projection matrix onto col(A).\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Matrix of shape (M, K) with linearly independent columns\n        \n    Returns\n    -------\n    np.ndarray\n        Orthogonal projection matrix P of shape (M, M)\n    \"\"\"\n    # TODO: Implement orthogonal projector via QR or Normal Equations\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef subspace_projection_matrix(A: np.ndarray) -> np.ndarray:\n    Q, _ = np.linalg.qr(A)\n    return Q @ Q.T"
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
            "en": "What is the foundational invariant governing Orthogonal Projections & Least Squares Approximation?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الإسقاطات المتعامدة وتقريب المربعات الصغرى؟"
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
    "id": "gram-schmidt-orthogonalization",
    "title": "Eigenvalues & Eigenvectors: Invariant Directions of Space",
    "titleAr": "القيم الذاتية والمتجهات الذاتية: الاتجاهات الصامدة في الفضاء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "When a linear transformation acts on the space around it, it generally whips vectors around, changing both their lengths and their direction...",
      "ar": "عندما تُغير المصفوفة معالم الفضاء، فإن معظم المتجهات تنحرف عن مسارها الأصلي وتدور. لكن ثمة متجهات استثنائية تحافظ على اتجاهها الأصلي تماماً ..."
    },
    "prerequisites": [
      "orthogonal-projections"
    ],
    "x": 160,
    "y": 1220,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "EigenHunterCanvas",
        "narrative": {
          "en": "When a linear transformation acts on the space around it, it generally whips vectors around, changing both their lengths and their directions. A vector pointing northeast might end up pointing south-southeast. \n\nHowever, for almost every transformation, there exist a few special, magical directions. When you feed a vector $\\mathbf{v}$ lying along one of these directions into the matrix, it does not rotate at all. It stays pointed along the exact same line, merely getting stretched, shrunk, or flipped backwards by a scalar factor $\\lambda$. These invariant axes are the eigenvectors (الم",
          "ar": "عندما تُغير المصفوفة معالم الفضاء، فإن معظم المتجهات تنحرف عن مسارها الأصلي وتدور. لكن ثمة متجهات استثنائية تحافظ على اتجاهها الأصلي تماماً ولا تدور؛ تكتفي المصفوفة بمدّها أو تقليصها بمقدار مقياس عددي $\\lambda$. تُسمى هذه المحاور الصامدة \"المتجهات الذاتية\"، ويُسمى معامل التمدد \"القيمة الذاتية\". هذه المتجهات تفضح البنية الجوهرية للتحويل وتكشف عن محاوره الطبيعية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v} \\iff (\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{v} = \\mathbf{0}, \\quad \\mathbf{v} \\ne \\mathbf{0}",
        "formulaNote": {
          "en": "Core invariant for Eigenvalues & Eigenvectors: Invariant Directions of Space.",
          "ar": "الخاصية الرياضية الجوهرية لـ القيم الذاتية والمتجهات الذاتية: الاتجاهات الصامدة في الفضاء."
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
          "id": "py-gram-schmidt-orthogonalization",
          "starterCode": "import numpy as np\n\ndef power_iteration(A: np.ndarray, max_iter: int = 300, tol: float = 1e-9) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Compute dominant eigenvalue and eigenvector via normalized power iteration.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Square matrix of shape (N, N)\n    max_iter : int\n        Maximum iterations\n    tol : float\n        Tolerance for vector convergence\n        \n    Returns\n    -------\n    tuple[float, np.ndarray]\n        lam: Dominant eigenvalue\n        v: Dominant unit eigenvector\n    \"\"\"\n    # TODO: Implement normalized power iteration with Rayleigh quotient\n    pass",
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
              "starterCode": "import numpy as np\n\ndef power_iteration(A: np.ndarray, max_iter: int = 300, tol: float = 1e-9) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Compute dominant eigenvalue and eigenvector via normalized power iteration.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Square matrix of shape (N, N)\n    max_iter : int\n        Maximum iterations\n    tol : float\n        Tolerance for vector convergence\n        \n    Returns\n    -------\n    tuple[float, np.ndarray]\n        lam: Dominant eigenvalue\n        v: Dominant unit eigenvector\n    \"\"\"\n    # TODO: Implement normalized power iteration with Rayleigh quotient\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef power_iteration(A: np.ndarray, max_iter: int = 300, tol: float = 1e-9) -> tuple[float, np.ndarray]:\n    n = A.shape[0]\n    v = np.ones(n) / np.sqrt(n)\n    for _ in range(max_iter):\n        w = A @ v\n        norm_w = np.linalg.norm(w)\n        if norm_w < 1e-14:\n            break\n        v_next = w / norm_w\n        diff = min(np.linalg.norm(v_next - v), np.linalg.norm(v_next + v))\n        v = v_next\n        if diff < tol:\n            break\n    lam = float(v.T @ A @ v)\n    return lam, v"
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
            "en": "What is the foundational invariant governing Eigenvalues & Eigenvectors: Invariant Directions of Space?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم القيم الذاتية والمتجهات الذاتية: الاتجاهات الصامدة في الفضاء؟"
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
    "id": "least-squares-approximation",
    "title": "The Spectral Theorem & Symmetric Eigendecomposition",
    "titleAr": "المبرهنة الطيفية والتفكيك الذاتي للمصفوفات المتناظرة",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "A general square matrix can have messy complex eigenvalues and slanted, non-perpendicular eigenvectors. But what if a matrix is symmetric ($...",
      "ar": "تُمثل المبرهنة الطيفية ذروة الجمال في الجبر الخطي؛ إذ تؤكد أن أي مصفوفة متناظرة حقيقية ($\\mathbf{A} = \\mathbf{A}^T$) تمتلك قيماً ذاتية حقيقي..."
    },
    "prerequisites": [
      "orthogonal-projections",
      "four-fundamental-subspaces"
    ],
    "x": 140,
    "y": 1315,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SpectralTheoremCanvas",
        "narrative": {
          "en": "A general square matrix can have messy complex eigenvalues and slanted, non-perpendicular eigenvectors. But what if a matrix is symmetric ($\\mathbf{A} = \\mathbf{A}^T$, meaning entry $A_{ij} = A_{ji}$)? \n\nSymmetry in linear algebra is like a physical law of conservation. The Spectral Theorem is one of the crowning triumphs of mathematics: it guarantees that for any symmetric matrix:\n1. Every single eigenvalue is guaranteed to be a pure real number (no imaginary numbers!).\n2. You can always find a complete set of eigenvectors that are strictly mutually perpendicular (orthogonal) to e",
          "ar": "تُمثل المبرهنة الطيفية ذروة الجمال في الجبر الخطي؛ إذ تؤكد أن أي مصفوفة متناظرة حقيقية ($\\mathbf{A} = \\mathbf{A}^T$) تمتلك قيماً ذاتية حقيقية تماماً، وتتحلل إلى متجهات ذاتية متعامدة مثنى مثنى. هندسياً، يعني هذا أن أي تشويه متناظر للفضاء هو في حقيقته مجرد دوران للإحداثيات، يليه شد أو تقليص على طول محاور متعامدة، ثم دوران معاكس، دون أي انحراف غير متناسق."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A} \\in \\mathbb{R}^{n \\times n}, \\quad \\mathbf{A} = \\mathbf{A}^T \\implies \\mathbf{A} = \\mathbf{Q} \\mathbf{\\Lambda} \\mathbf{Q}^T = \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T",
        "formulaNote": {
          "en": "Core invariant for The Spectral Theorem & Symmetric Eigendecomposition.",
          "ar": "الخاصية الرياضية الجوهرية لـ المبرهنة الطيفية والتفكيك الذاتي للمصفوفات المتناظرة."
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
          "id": "py-least-squares-approximation",
          "starterCode": "import numpy as np\n\ndef symmetric_spectral_reconstruction(A: np.ndarray, k: int) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute sorted eigendecomposition and rank-k spectral reconstruction.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Symmetric matrix of shape (N, N)\n    k : int\n        Reconstruction rank (1 <= k <= N)\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray, np.ndarray]\n        eigenvalues: Sorted by absolute magnitude, shape (N,)\n        eigenvectors: Sorted columns, shape (N, N)\n        A_k: Rank-k reconstructed matrix, shape (N, N)\n    \"\"\"\n    # TODO: Implement symmetric eigendecomposition via eigh and rank-k outer sum\n    pass",
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
              "starterCode": "import numpy as np\n\ndef symmetric_spectral_reconstruction(A: np.ndarray, k: int) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute sorted eigendecomposition and rank-k spectral reconstruction.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Symmetric matrix of shape (N, N)\n    k : int\n        Reconstruction rank (1 <= k <= N)\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray, np.ndarray]\n        eigenvalues: Sorted by absolute magnitude, shape (N,)\n        eigenvectors: Sorted columns, shape (N, N)\n        A_k: Rank-k reconstructed matrix, shape (N, N)\n    \"\"\"\n    # TODO: Implement symmetric eigendecomposition via eigh and rank-k outer sum\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef symmetric_spectral_reconstruction(A: np.ndarray, k: int) -> tuple[np.ndarray, np.ndarray, np.ndarray]:\n    w, v = np.linalg.eigh(A)\n    idx = np.argsort(np.abs(w))[::-1]\n    w_sorted = w[idx]\n    v_sorted = v[:, idx]\n    A_k = v_sorted[:, :k] @ np.diag(w_sorted[:k]) @ v_sorted[:, :k].T\n    return w_sorted, v_sorted, A_k"
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
            "en": "What is the foundational invariant governing The Spectral Theorem & Symmetric Eigendecomposition?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المبرهنة الطيفية والتفكيك الذاتي للمصفوفات المتناظرة؟"
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
    "id": "eigenvalues-eigenvectors",
    "title": "Singular Value Decomposition (SVD) & Spectral Geometry",
    "titleAr": "تفكيك القيم المفردة (SVD) والهندسة الطيفية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "The Spectral Theorem is wonderful, but it has a massive limitation: it only works on square, symmetric matrices. What if you have a rectangu...",
      "ar": "تفكيك القيم المفردة (SVD) هو قمة الجبر الخطي وأقوى أداة في علم البيانات؛ إذ يفكك أي مصفوفة مستطيلة أو مربعة دون استثناء إلى ثلاثة أطوار هندس..."
    },
    "prerequisites": [
      "least-squares-approximation",
      "determinant-scaling-factor"
    ],
    "x": 160,
    "y": 1410,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SVDImageCompressorLab",
        "narrative": {
          "en": "The Spectral Theorem is wonderful, but it has a massive limitation: it only works on square, symmetric matrices. What if you have a rectangular matrix $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ representing a data table with 1,000 users and 50 movies? \n\nThe Singular Value Decomposition (SVD) is the absolute superpower of linear algebra because it works on every single matrix that can ever exist, square or rectangular, full-rank or singular! \nGeometrically, imagine taking a unit sphere in your input space. When any linear transformation acts on it, it deforms that sphere into a hyper-elli",
          "ar": "تفكيك القيم المفردة (SVD) هو قمة الجبر الخطي وأقوى أداة في علم البيانات؛ إذ يفكك أي مصفوفة مستطيلة أو مربعة دون استثناء إلى ثلاثة أطوار هندسية متتالية: دوران في فضاء المدخلات ($\\mathbf{V}^T$)، يليه شد وتمديد إحداثي بقيم موجبة مرتبة تنازلياً تُدعى \"القيم المفردة\" ($\\mathbf{\\Sigma}$)، يليه دوران في فضاء المخرجات ($\\mathbf{U}$). تُثبت مبرهنة إيكارت-يونغ أن أخذ أول $k$ حداً من هذا التفكيك يمنحنا أفضل تمثيل مضغوط للمصفوفة بأقل قدر ممكن من فقدان البيانات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A} \\in \\mathbb{R}^{m \\times n}, \\quad \\mathbf{A} = \\mathbf{U} \\mathbf{\\Sigma} \\mathbf{V}^T = \\sum_{i=1}^r \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T",
        "formulaNote": {
          "en": "Core invariant for Singular Value Decomposition (SVD) & Spectral Geometry.",
          "ar": "الخاصية الرياضية الجوهرية لـ تفكيك القيم المفردة (SVD) والهندسة الطيفية."
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
          "id": "py-eigenvalues-eigenvectors",
          "starterCode": "import numpy as np\n\ndef svd_low_rank_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute Eckart-Young optimal rank-k approximation and retained energy.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Matrix of shape (M, N)\n    k : int\n        Truncation rank\n        \n    Returns\n    -------\n    tuple[np.ndarray, float]\n        A_k: Rank-k approximation of shape (M, N)\n        energy: Sum of top k singular values squared / Total sum squared\n    \"\"\"\n    # TODO: Implement SVD rank-k reconstruction and variance fraction\n    pass",
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
              "starterCode": "import numpy as np\n\ndef svd_low_rank_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute Eckart-Young optimal rank-k approximation and retained energy.\n    \n    Parameters\n    ----------\n    A : np.ndarray\n        Matrix of shape (M, N)\n    k : int\n        Truncation rank\n        \n    Returns\n    -------\n    tuple[np.ndarray, float]\n        A_k: Rank-k approximation of shape (M, N)\n        energy: Sum of top k singular values squared / Total sum squared\n    \"\"\"\n    # TODO: Implement SVD rank-k reconstruction and variance fraction\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef svd_low_rank_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    U, s, Vt = np.linalg.svd(A, full_matrices=False)\n    A_k = (U[:, :k] * s[:k]) @ Vt[:k, :]\n    energy = float(np.sum(s[:k] ** 2) / np.sum(s ** 2))\n    return A_k, energy"
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
            "en": "What is the foundational invariant governing Singular Value Decomposition (SVD) & Spectral Geometry?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم تفكيك القيم المفردة (SVD) والهندسة الطيفية؟"
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
    "id": "diagonalization-powers",
    "title": "Limits, Continuity & The Infinitesimal Neighborhood",
    "titleAr": "النهايات، الاتصال، والجوار المتناهي في الصغر",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine walking toward a destination along a trail on a dark night. The concept of a limit does not care about what happens at the destinati...",
      "ar": "تضع نهاية الدالة حجر الأساس للتحليل الرياضي عبر تعريف $(\\epsilon, \\delta)$ الصارم لغوتفريد لايبنتز وأوغستين كوشي. لا تهتم النهاية بما يحدث \"..."
    },
    "prerequisites": [
      "eigenvalues-eigenvectors"
    ],
    "x": 140,
    "y": 1505,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "SecantTangentLimitCanvas",
        "narrative": {
          "en": "Imagine walking toward a destination along a trail on a dark night. The concept of a limit does not care about what happens at the destination itself; it only cares about what happens as you get infinitely close to it. Even if a meteor fell and obliterated the destination into a gaping hole (a singularity or undefined point like $0/0$), the limit still exists if all paths heading toward that hole converge steadily toward the exact same elevation. \n\nContinuity simply means: when you arrive at the spot, there is no sudden trapdoor, cliff, or teleportation. The destination is right where",
          "ar": "تضع نهاية الدالة حجر الأساس للتحليل الرياضي عبر تعريف $(\\epsilon, \\delta)$ الصارم لغوتفريد لايبنتز وأوغستين كوشي. لا تهتم النهاية بما يحدث \"عند\" النقطة تحديداً، بل بسلوك الدالة عند الاقتراب اللانهائي منها. إذا استطعنا حصر قيم الدالة ضمن أي هامش خطأ ضئيل $\\epsilon$ بمجرد الاقتراب من النقطة بمسافة $\\delta$، فإن النهاية موجودة. أما \"الاتصال\" فيعني سلاسة المنحنى وخلوه من أي قفزات مفاجئة أو فجوات ممزقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\lim_{x \\to c} f(x) = L \\iff \\forall \\epsilon > 0, \\; \\exists \\delta > 0 \\; \\text{s.t.} \\; 0 < |x - c| < \\delta \\implies |f(x) - L| < \\epsilon",
        "formulaNote": {
          "en": "Core invariant for Limits, Continuity & The Infinitesimal Neighborhood.",
          "ar": "الخاصية الرياضية الجوهرية لـ النهايات، الاتصال، والجوار المتناهي في الصغر."
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
          "id": "py-diagonalization-powers",
          "starterCode": "from typing import Callable\nimport numpy as np\n\ndef richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:\n    \"\"\"\n    Compute 4th-order accurate numerical derivative using Richardson extrapolation.\n    \n    Parameters\n    ----------\n    f : Callable\n        Target scalar function\n    x : float\n        Evaluation coordinate\n    h : float\n        Base step size\n        \n    Returns\n    -------\n    float\n        Extrapolated derivative estimate\n    \"\"\"\n    # TODO: Evaluate D(h) and D(h/2), then apply Richardson combination\n    pass",
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
              "starterCode": "from typing import Callable\nimport numpy as np\n\ndef richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:\n    \"\"\"\n    Compute 4th-order accurate numerical derivative using Richardson extrapolation.\n    \n    Parameters\n    ----------\n    f : Callable\n        Target scalar function\n    x : float\n        Evaluation coordinate\n    h : float\n        Base step size\n        \n    Returns\n    -------\n    float\n        Extrapolated derivative estimate\n    \"\"\"\n    # TODO: Evaluate D(h) and D(h/2), then apply Richardson combination\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:\n    d1 = (f(x + h) - f(x - h)) / (2.0 * h)\n    d2 = (f(x + h / 2.0) - f(x - h / 2.0)) / h\n    return float((4.0 * d2 - d1) / 3.0)"
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
            "en": "What is the foundational invariant governing Limits, Continuity & The Infinitesimal Neighborhood?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم النهايات، الاتصال، والجوار المتناهي في الصغر؟"
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
    "id": "symmetric-matrices-spectral",
    "title": "The Derivative as Local Linearization & Tangent Slope",
    "titleAr": "المشتقة كتقريب خطي محلي وميل المماس",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Look at the curved horizon of the Earth from space: it is clearly a sphere. But when you step outside onto a soccer pitch, the ground looks ...",
      "ar": "المشتقة هي أداة التكبير الرياضية العظمى؛ فمهما بلغ المنحنى من تعقيد والتواء، فإنك إذا قمت بتكبيره مجهرياً عند نقطة ما، فإنه سيفقد انحناءه وي..."
    },
    "prerequisites": [
      "eigenvalues-eigenvectors"
    ],
    "x": 160,
    "y": 1600,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ChainRuleGearsCanvas",
        "narrative": {
          "en": "Look at the curved horizon of the Earth from space: it is clearly a sphere. But when you step outside onto a soccer pitch, the ground looks and feels completely flat. Why? Because if you zoom in closely enough to any smooth curve, the curve loses its curvature and becomes indistinguishable from a straight line. \n\nThe derivative is the mathematical realization of this miracle: it is the slope of that local tangent line. It tells you: \"If you zoom in with an infinite microscope around point $x$, what straight line replaces the curve?\" The derivative is not just a formula; it is the best",
          "ar": "المشتقة هي أداة التكبير الرياضية العظمى؛ فمهما بلغ المنحنى من تعقيد والتواء، فإنك إذا قمت بتكبيره مجهرياً عند نقطة ما، فإنه سيفقد انحناءه ويتحول تدريجياً إلى خط مستقيم. ميل هذا الخط المستقيم الملامس هو \"المشتقة\". تُعبر المشتقة عن معدل التغير اللحظي، وتوفر \"التقريب الخطي المحلي\" الذي يتيح لنا استبدال المعادلات غير الخطية الصعبة بخطوط مستقيمة سهلة الحساب."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f'(x) \\coloneqq \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
        "formulaNote": {
          "en": "Core invariant for The Derivative as Local Linearization & Tangent Slope.",
          "ar": "الخاصية الرياضية الجوهرية لـ المشتقة كتقريب خطي محلي وميل المماس."
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
          "id": "py-symmetric-matrices-spectral",
          "starterCode": "from typing import Callable\nimport numpy as np\n\ndef linear_approximation_eval(f: Callable, df: Callable, x0: float, query_points: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Evaluate local tangent line approximation and pointwise absolute errors.\n    \n    Parameters\n    ----------\n    f : Callable\n        Target function accepting numpy array\n    df : Callable\n        Exact derivative function\n    x0 : float\n        Expansion center\n    query_points : np.ndarray\n        Array of evaluation points of shape (N,)\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        L: Linear approximation values, shape (N,)\n        errors: Absolute errors |f(x) - L(x)|, shape (N,)\n    \"\"\"\n    # TODO: Compute vectorized tangent line and error array\n    pass",
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
              "starterCode": "from typing import Callable\nimport numpy as np\n\ndef linear_approximation_eval(f: Callable, df: Callable, x0: float, query_points: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Evaluate local tangent line approximation and pointwise absolute errors.\n    \n    Parameters\n    ----------\n    f : Callable\n        Target function accepting numpy array\n    df : Callable\n        Exact derivative function\n    x0 : float\n        Expansion center\n    query_points : np.ndarray\n        Array of evaluation points of shape (N,)\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        L: Linear approximation values, shape (N,)\n        errors: Absolute errors |f(x) - L(x)|, shape (N,)\n    \"\"\"\n    # TODO: Compute vectorized tangent line and error array\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef linear_approximation_eval(f: Callable, df: Callable, x0: float, query_points: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    L = f(x0) + df(x0) * (query_points - x0)\n    errors = np.abs(f(query_points) - L)\n    return L, errors"
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
            "en": "What is the foundational invariant governing The Derivative as Local Linearization & Tangent Slope?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المشتقة كتقريب خطي محلي وميل المماس؟"
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
    "id": "singular-value-decomposition",
    "title": "The Chain Rule as Compositional Scaling & Flow of Sensitivities",
    "titleAr": "قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine three interconnected gears in a clockwork mechanism: Gear $A$ turns Gear $B$, which in turn drives Gear $C$. \n- When you turn Gear $...",
      "ar": "قاعدة السلسلة هي قانون التروس الرياضي الحاكم لدوال التركيب المتسلسلة $f(g(x))$. تنص القاعدة على أن الحساسية الكلية للمخرج بالنسبة للمدخل هي ..."
    },
    "prerequisites": [
      "symmetric-matrices-spectral",
      "gram-schmidt-orthogonalization"
    ],
    "x": 140,
    "y": 1695,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "CurvatureOsculatingCanvas",
        "narrative": {
          "en": "Imagine three interconnected gears in a clockwork mechanism: Gear $A$ turns Gear $B$, which in turn drives Gear $C$. \n- When you turn Gear $A$ by 1 revolution, Gear $B$ turns by 3 revolutions. (Sensitivity of $B$ to $A$ is $3$).\n- When Gear $B$ turns by 1 revolution, Gear $C$ turns by 5 revolutions. (Sensitivity of $C$ to $B$ is $5$).\n\nNow, if you turn Gear $A$ by 1 revolution, how many revolutions does Gear $C$ complete? Obviously: $3 \\times 5 = 15$ revolutions! You simply multiply the gear ratios. \n\nThe Chain Rule is nothing more than this gear-ratio multiplication applied to mathema",
          "ar": "قاعدة السلسلة هي قانون التروس الرياضي الحاكم لدوال التركيب المتسلسلة $f(g(x))$. تنص القاعدة على أن الحساسية الكلية للمخرج بالنسبة للمدخل هي حاصل ضرب الحساسيات الوسيطة عبر المسار. إذا كانت الدالة الداخلية تتغير بمعدل معين، والدالة الخارجية تتأثر بمخرجاتها بمعدل آخر، فإن الأثر الإجمالي ينتقل بضرب المعدلات معاً. هذه العملية هي الأساس الحسابي الدقيق لخوارزمية \"الانتشار الخلفي للخطأ\" (Backpropagation) في الشبكات العصبية العميقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x) \\iff \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
        "formulaNote": {
          "en": "Core invariant for The Chain Rule as Compositional Scaling & Flow of Sensitivities.",
          "ar": "الخاصية الرياضية الجوهرية لـ قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية."
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
          "id": "py-singular-value-decomposition",
          "starterCode": "import numpy as np\n\ndef composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute forward activation and exact backward chain rule derivative.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Input batch of shape (N,)\n    w, u, b1, b2 : float\n        Scalar weight and bias parameters\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        y: Sigmoid output activation of shape (N,)\n        dy_dx: Exact analytical derivative dy/dx of shape (N,)\n    \"\"\"\n    # TODO: Implement forward pass and chain rule backprop\n    pass",
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
              "starterCode": "import numpy as np\n\ndef composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute forward activation and exact backward chain rule derivative.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Input batch of shape (N,)\n    w, u, b1, b2 : float\n        Scalar weight and bias parameters\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        y: Sigmoid output activation of shape (N,)\n        dy_dx: Exact analytical derivative dy/dx of shape (N,)\n    \"\"\"\n    # TODO: Implement forward pass and chain rule backprop\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]:\n    z1 = u * x + b1\n    a1 = np.tanh(z1)\n    z2 = w * a1 + b2\n    y = 1.0 / (1.0 + np.exp(-z2))\n    dy_dz2 = y * (1.0 - y)\n    dz2_da1 = w\n    da1_dz1 = 1.0 - a1 ** 2\n    dz1_dx = u\n    dy_dx = dy_dz2 * dz2_da1 * da1_dz1 * dz1_dx\n    return y, dy_dx"
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
            "en": "What is the foundational invariant governing The Chain Rule as Compositional Scaling & Flow of Sensitivities?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية؟"
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
    "id": "limits-continuity-foundations",
    "title": "Second Derivatives, Concavity & Curvature",
    "titleAr": "المشتقة الثانية، التقعر، ومفهوم الانحناء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "If the first derivative tells you whether you are moving uphill or downhill, what does the second derivative tell you? It tells you what is ...",
      "ar": "إذا كانت المشتقة الأولى تُخبرنا باتجاه الحركة صعوداً أو هبوطاً، فإن المشتقة الثانية $f''(x)$ تقيس \"انحناء\" المنحنى وتسارع تغير الميل. عندما ..."
    },
    "prerequisites": [
      "linear-rate-of-change-slopes"
    ],
    "x": 210,
    "y": 1790,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "TaylorSeriesCanvas",
        "narrative": {
          "en": "If the first derivative tells you whether you are moving uphill or downhill, what does the second derivative tell you? It tells you what is happening to your climb itself: is the hill getting steeper and steeper, or is it flattening out? \n\nImagine driving a car along a winding road:\n- The first derivative is your speedometer reading.\n- The second derivative is how hard your foot is pressing the gas pedal (acceleration).\nGeometrically, if the second derivative is positive ($f''(x) > 0$), the slope is constantly increasing: the curve bends upward like a soup bowl that can hold water (conca",
          "ar": "إذا كانت المشتقة الأولى تُخبرنا باتجاه الحركة صعوداً أو هبوطاً، فإن المشتقة الثانية $f''(x)$ تقيس \"انحناء\" المنحنى وتسارع تغير الميل. عندما تكون المشتقة الثانية موجبة، يتجه المنحنى إلى الأعلى كالإناء المفتوح (مقعر لأعلى / محدب)، وتستقر فيه المماسات أسفل المنحنى دائماً، مما يضمن وجود قاع مستقر (نهاية صغرى). أما نقطة الانقلاب (Inflection point) فهي النقطة المحورية التي ينقلب عندها المنحنى من التقعر إلى التحدب."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f''(x) \\coloneqq \\frac{d^2 f}{dx^2} = \\lim_{h \\to 0} \\frac{f'(x + h) - f'(x)}{h} = \\lim_{h \\to 0} \\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}",
        "formulaNote": {
          "en": "Core invariant for Second Derivatives, Concavity & Curvature.",
          "ar": "الخاصية الرياضية الجوهرية لـ المشتقة الثانية، التقعر، ومفهوم الانحناء."
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
          "id": "py-limits-continuity-foundations",
          "starterCode": "import numpy as np\n\ndef curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute second derivative and geometric curvature on interior nodes.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Array of 1D curve samples of shape (N,)\n    dx : float\n        Uniform sample step\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        d2y: Second derivative values, shape (N - 2,)\n        curvature: Geometric curvature kappa, shape (N - 2,)\n    \"\"\"\n    # TODO: Implement 3-point second derivative stencil and curvature formula\n    pass",
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
              "starterCode": "import numpy as np\n\ndef curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute second derivative and geometric curvature on interior nodes.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Array of 1D curve samples of shape (N,)\n    dx : float\n        Uniform sample step\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        d2y: Second derivative values, shape (N - 2,)\n        curvature: Geometric curvature kappa, shape (N - 2,)\n    \"\"\"\n    # TODO: Implement 3-point second derivative stencil and curvature formula\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:\n    dy = (y[2:] - y[:-2]) / (2.0 * dx)\n    d2y = (y[2:] - 2.0 * y[1:-1] + y[:-2]) / (dx ** 2)\n    curvature = np.abs(d2y) / ((1.0 + dy ** 2) ** 1.5)\n    return d2y, curvature"
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
            "en": "What is the foundational invariant governing Second Derivatives, Concavity & Curvature?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المشتقة الثانية، التقعر، ومفهوم الانحناء؟"
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
    "id": "derivative-tangent-slope",
    "title": "Taylor Series as Polynomial Approximation of Reality",
    "titleAr": "متسلسلة تايلور كتقريب حدودي للواقع",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Complicated functions like $\\sin(x)$, $e^x$, or $\\ln(x)$ are difficult to calculate by hand: you cannot easily evaluate $\\sin(0.37)$ using o...",
      "ar": "متسلسلة تايلور هي أعظم مصنع للتقريب في الرياضيات؛ إذ تتيح استبدال الدوال المعقدة والمتسامية (مثل الدوال المثلثية والأسية) بمتعددات حدود بسيط..."
    },
    "prerequisites": [
      "limits-continuity-foundations"
    ],
    "x": 195,
    "y": 1885,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "RiemannIntegralFtCanvas",
        "narrative": {
          "en": "Complicated functions like $\\sin(x)$, $e^x$, or $\\ln(x)$ are difficult to calculate by hand: you cannot easily evaluate $\\sin(0.37)$ using only basic arithmetic. But polynomials (like $a + bx + cx^2 + dx^3$) are exceptionally easy: they only require basic addition and multiplication! \n\nA Taylor series is a recipe for building an ultra-accurate polynomial clone of any smooth function around a chosen base point $a$. \n- Order 0: Make the polynomial match the function's height: $P_0(x) = f(a)$.\n- Order 1: Make it match the slope (tangent line): $P_1(x) = f(a) + f'(a)(x-a)$.\n- Order 2: Make i",
          "ar": "متسلسلة تايلور هي أعظم مصنع للتقريب في الرياضيات؛ إذ تتيح استبدال الدوال المعقدة والمتسامية (مثل الدوال المثلثية والأسية) بمتعددات حدود بسيطة لا تتطلب سوى الجمع والضرب. تبدأ المتسلسلة بمطابقة ارتفاع النقطة، ثم ميلها عبر المشتقة الأولى، ثم انحناءها عبر المشتقة الثانية، وهكذا دواليك. كل حد إضافي يمنح المنحنى التصاقاً أشد بالدالة الأصلية، مما يجعلها الأداة الأساسية للمحاكاة الرقمية والتحليل الفيزيائي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f(x) = \\sum_{k=0}^\\infty \\frac{f^{(k)}(a)}{k!} (x - a)^k = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\frac{f'''(a)}{3!}(x-a)^3 + \\cdots",
        "formulaNote": {
          "en": "Core invariant for Taylor Series as Polynomial Approximation of Reality.",
          "ar": "الخاصية الرياضية الجوهرية لـ متسلسلة تايلور كتقريب حدودي للواقع."
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
          "id": "py-derivative-tangent-slope",
          "starterCode": "import numpy as np\n\ndef taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Vectorized evaluation of degree-K Taylor polynomial across query points x.\n    \n    Parameters\n    ----------\n    coeffs : np.ndarray\n        Array of derivatives [f(a), f'(a), ..., f^{(K)}(a)]\n    a : float\n        Expansion center\n    x : np.ndarray\n        Query evaluation points of shape (N,)\n        \n    Returns\n    -------\n    np.ndarray\n        Taylor approximation values T_K(x) of shape (N,)\n    \"\"\"\n    # TODO: Implement vectorized evaluation via broadcasting and cumulative factorials\n    pass",
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
              "starterCode": "import numpy as np\n\ndef taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Vectorized evaluation of degree-K Taylor polynomial across query points x.\n    \n    Parameters\n    ----------\n    coeffs : np.ndarray\n        Array of derivatives [f(a), f'(a), ..., f^{(K)}(a)]\n    a : float\n        Expansion center\n    x : np.ndarray\n        Query evaluation points of shape (N,)\n        \n    Returns\n    -------\n    np.ndarray\n        Taylor approximation values T_K(x) of shape (N,)\n    \"\"\"\n    # TODO: Implement vectorized evaluation via broadcasting and cumulative factorials\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    k = np.arange(len(coeffs))\n    factorials = np.ones(len(coeffs), dtype=float)\n    if len(coeffs) > 1:\n        factorials[1:] = np.cumprod(np.arange(1, len(coeffs)))\n    norm_coeffs = coeffs / factorials\n    powers = (x[:, None] - a) ** k[None, :]\n    return np.sum(powers * norm_coeffs[None, :], axis=1)"
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
            "en": "What is the foundational invariant governing Taylor Series as Polynomial Approximation of Reality?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم متسلسلة تايلور كتقريب حدودي للواقع؟"
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
    "id": "differentiation-rules-chain",
    "title": "Multivariable Scalar Fields & Topographic Elevation Landscapes",
    "titleAr": "الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are hiking through a mountain range. At every geographic location you stand on, defined by your GPS coordinates (latitude $x$, l...",
      "ar": "الحقل العددي متعدد المتغيرات هو دالة تربط كل نقطة في فضاء متعدد الأبعاد برقم قياسي واحد، مثل تعيين درجة الحرارة أو الارتفاع الطبوغرافي عند ك..."
    },
    "prerequisites": [
      "derivative-tangent-slope"
    ],
    "x": 210,
    "y": 1980,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ContourElevationCanvas",
        "narrative": {
          "en": "Imagine you are hiking through a mountain range. At every geographic location you stand on, defined by your GPS coordinates (latitude $x$, longitude $y$), there is a single measurable physical quantity: your elevation above sea level $z = f(x, y)$. \n\nThis is a scalar field: an assignment of a single scalar number to every point in space. To visualize this 3D landscape on a flat 2D hiking map, cartographers draw contour lines (level curves). A contour line connects all points that share the exact same elevation. If you walk along a contour line, you do not climb or descend a single",
          "ar": "الحقل العددي متعدد المتغيرات هو دالة تربط كل نقطة في فضاء متعدد الأبعاد برقم قياسي واحد، مثل تعيين درجة الحرارة أو الارتفاع الطبوغرافي عند كل نقطة جغرافية $(x, y)$. لتصور هذا السطح ثلاثي الأبعاد على شاشة مستوية، نستخدم \"خطوط الكنتور\" (خطوط التسوية) التي تصل بين النقاط ذات القيمة المتطابقة. تقارب خطوط الكنتور يشير إلى جرف شديد الانحدار، بينما تباعدها يعكس تضاريس منبسطة هادئة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f: \\mathbb{R}^n \\to \\mathbb{R}, \\quad \\mathbf{x} = \\begin{bmatrix} x_1 \\\\ \\vdots \\\\ x_n \\end{bmatrix} \\mapsto f(\\mathbf{x}) \\in \\mathbb{R}",
        "formulaNote": {
          "en": "Core invariant for Multivariable Scalar Fields & Topographic Elevation Landscapes.",
          "ar": "الخاصية الرياضية الجوهرية لـ الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية."
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
          "id": "py-differentiation-rules-chain",
          "starterCode": "import numpy as np\n\ndef scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:\n    \"\"\"\n    Compute 2D gradient magnitude matrix for interior grid points.\n    \n    Parameters\n    ----------\n    Z : np.ndarray\n        2D scalar field elevations, shape (H, W)\n    dx : float\n        Spacing along column axis (x)\n    dy : float\n        Spacing along row axis (y)\n        \n    Returns\n    -------\n    np.ndarray\n        Interior gradient magnitudes, shape (H - 2, W - 2)\n    \"\"\"\n    # TODO: Implement 2D central difference slicing and Euclidean norm\n    pass",
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
              "starterCode": "import numpy as np\n\ndef scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:\n    \"\"\"\n    Compute 2D gradient magnitude matrix for interior grid points.\n    \n    Parameters\n    ----------\n    Z : np.ndarray\n        2D scalar field elevations, shape (H, W)\n    dx : float\n        Spacing along column axis (x)\n    dy : float\n        Spacing along row axis (y)\n        \n    Returns\n    -------\n    np.ndarray\n        Interior gradient magnitudes, shape (H - 2, W - 2)\n    \"\"\"\n    # TODO: Implement 2D central difference slicing and Euclidean norm\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:\n    dz_dx = (Z[1:-1, 2:] - Z[1:-1, :-2]) / (2.0 * dx)\n    dz_dy = (Z[2:, 1:-1] - Z[:-2, 1:-1]) / (2.0 * dy)\n    return np.sqrt(dz_dx ** 2 + dz_dy ** 2)"
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
            "en": "What is the foundational invariant governing Multivariable Scalar Fields & Topographic Elevation Landscapes?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية؟"
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
    "id": "higher-order-derivatives-concavity",
    "title": "Partial Derivatives & Axis-Aligned Slices",
    "titleAr": "المشتقات الجزئية وشرائح المحاور المعيارية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "You are standing on a steep hillside. If someone asks you: \"What is the slope of the hill right where you are standing?\", you cannot give a ...",
      "ar": "المشتقة الجزئية هي الإجابة عن سؤال: \"كيف تتغير الدالة إذا تحركنا على طول محور واحد فقط مع تجميد جميع المحاور الأخرى كلياً؟\" هندسياً، يعادل ح..."
    },
    "prerequisites": [
      "differentiation-rules-chain"
    ],
    "x": 195,
    "y": 2075,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "PartialDerivativeSliceCanvas",
        "narrative": {
          "en": "You are standing on a steep hillside. If someone asks you: \"What is the slope of the hill right where you are standing?\", you cannot give a single number! Why? Because if you take a step north, you might climb steeply uphill; if you take a step east, you might walk comfortably along a flat ledge; if you take a step south, you might plunge downhill. The slope depends completely on which way you step. \n\nThe partial derivatives are the simplest directional questions you can ask: \n1. What is the slope if you freeze your $y$-coordinate completely and only take a step along the $X$-axis ($\\f",
          "ar": "المشتقة الجزئية هي الإجابة عن سؤال: \"كيف تتغير الدالة إذا تحركنا على طول محور واحد فقط مع تجميد جميع المحاور الأخرى كلياً؟\" هندسياً، يعادل حساب المشتقة الجزئية $\\frac{\\partial f}{\\partial x}$ قطع السطح الجبلي ثلاثي الأبعاد بشريحة رأسية موازية لمحور $X$، ثم قياس ميل منحنى التقاطع الناتج. عند الاشتقاق بالنسبة لـ $x$، نُعامل المتغير $y$ وكأنه رقم ثابت لا يتحرك."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\frac{\\partial f}{\\partial x_i}(\\mathbf{x}) \\coloneqq \\lim_{h \\to 0} \\frac{f(\\mathbf{x} + h \\mathbf{e}_i) - f(\\mathbf{x})}{h} = \\left. \\frac{d}{dh} f(\\mathbf{x} + h \\mathbf{e}_i) \\right|_{h=0}",
        "formulaNote": {
          "en": "Core invariant for Partial Derivatives & Axis-Aligned Slices.",
          "ar": "الخاصية الرياضية الجوهرية لـ المشتقات الجزئية وشرائح المحاور المعيارية."
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
          "id": "py-higher-order-derivatives-concavity",
          "starterCode": "from typing import Callable\nimport numpy as np\n\ndef numerical_gradient_vector(f: Callable, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute the numerical gradient vector of scalar field f at point x0.\n    \n    Parameters\n    ----------\n    f : Callable\n        Function mapping 1D numpy array of shape (D,) to a scalar\n    x0 : np.ndarray\n        Evaluation coordinate of shape (D,)\n    eps : float\n        Finite difference step size\n        \n    Returns\n    -------\n    np.ndarray\n        Gradient vector of shape (D,)\n    \"\"\"\n    # TODO: Implement multivariate central difference gradient\n    pass",
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
              "starterCode": "from typing import Callable\nimport numpy as np\n\ndef numerical_gradient_vector(f: Callable, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute the numerical gradient vector of scalar field f at point x0.\n    \n    Parameters\n    ----------\n    f : Callable\n        Function mapping 1D numpy array of shape (D,) to a scalar\n    x0 : np.ndarray\n        Evaluation coordinate of shape (D,)\n    eps : float\n        Finite difference step size\n        \n    Returns\n    -------\n    np.ndarray\n        Gradient vector of shape (D,)\n    \"\"\"\n    # TODO: Implement multivariate central difference gradient\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef numerical_gradient_vector(f: Callable, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    d = len(x0)\n    E = np.eye(d) * eps\n    x_plus = x0 + E\n    x_minus = x0 - E\n    f_plus = np.array([f(x_plus[i]) for i in range(d)])\n    f_minus = np.array([f(x_minus[i]) for i in range(d)])\n    return (f_plus - f_minus) / (2.0 * eps)"
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
            "en": "What is the foundational invariant governing Partial Derivatives & Axis-Aligned Slices?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم المشتقات الجزئية وشرائح المحاور المعيارية؟"
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
    "id": "taylor-series-polynomial",
    "title": "The Gradient Vector & Directional Derivatives",
    "titleAr": "متجه التدرج والمشتقات الاتجاهية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "In the previous lesson, we learned the slope along the east-west axis and the north-south axis. But what if you decide to hike in an arbitra...",
      "ar": "متجه التدرج $\\nabla f$ هو البوصلة الرياضية الكبرى في الفضاء متعدد الأبعاد؛ إذ يجمع كل المشتقات الجزئية في متجه واحد ذي خصائص هندسية مذهلة. ي..."
    },
    "prerequisites": [
      "differentiation-rules-chain",
      "higher-order-derivatives-concavity"
    ],
    "x": 210,
    "y": 2170,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GradientDescentCanvas",
        "narrative": {
          "en": "In the previous lesson, we learned the slope along the east-west axis and the north-south axis. But what if you decide to hike in an arbitrary compass direction—say, $30^\\circ$ north of east, along a unit vector $\\hat{\\mathbf{u}}$? \n\nYou do not need to perform a new limit calculation. You can package all the individual partial derivatives together into a single, magnificent vector: The Gradient Vector $\\nabla f$. \nThe gradient vector has two almost miraculous properties:\n1. It points in the direction of steepest possible ascent (the exact direction that makes you climb the fastest).\n2.",
          "ar": "متجه التدرج $\\nabla f$ هو البوصلة الرياضية الكبرى في الفضاء متعدد الأبعاد؛ إذ يجمع كل المشتقات الجزئية في متجه واحد ذي خصائص هندسية مذهلة. يُشير متجه التدرج دوماً نحو \"الاتجاه الأشد صعوداً\" على السطح، بينما يُعبر طوله عن أقصى معدل صعود ممكن. ولأن التحرك على طول خط الكنتور لا يُحدث أي تغير في الارتفاع، فإن متجه التدرج يتعامد دوماً وبشكل صارم مع خطوط الكنتور."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\nabla f(\\mathbf{x}) \\coloneqq \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1}(\\mathbf{x}) \\\\ \\frac{\\partial f}{\\partial x_2}(\\mathbf{x}) \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_n}(\\mathbf{x}) \\end{bmatrix} \\in \\mathbb{R}^n \\times 1, \\quad D_{\\hat{\\mathbf{u}}} f(\\mathbf{x}) \\coloneqq \\lim_{h \\to 0} \\frac{f(\\mathbf{x} + h\\hat{\\mathbf{u}}) - f(\\mathbf{x})}{h} = \\nabla f(\\mathbf{x})^T \\hat{\\mathbf{u}}",
        "formulaNote": {
          "en": "Core invariant for The Gradient Vector & Directional Derivatives.",
          "ar": "الخاصية الرياضية الجوهرية لـ متجه التدرج والمشتقات الاتجاهية."
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
          "id": "py-taylor-series-polynomial",
          "starterCode": "import numpy as np\n\ndef directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:\n    \"\"\"\n    Compute batch directional derivatives and identify the direction of steepest ascent.\n    \n    Parameters\n    ----------\n    grad : np.ndarray\n        Gradient vector of shape (D,)\n    directions : np.ndarray\n        Array of candidate direction vectors of shape (B, D)\n        \n    Returns\n    -------\n    tuple[np.ndarray, int]\n        d_vals: Directional derivatives along unit directions, shape (B,)\n        best_idx: Index of maximum directional derivative\n    \"\"\"\n    # TODO: Normalize direction vectors, compute dot products, and find argmax\n    pass",
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
              "starterCode": "import numpy as np\n\ndef directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:\n    \"\"\"\n    Compute batch directional derivatives and identify the direction of steepest ascent.\n    \n    Parameters\n    ----------\n    grad : np.ndarray\n        Gradient vector of shape (D,)\n    directions : np.ndarray\n        Array of candidate direction vectors of shape (B, D)\n        \n    Returns\n    -------\n    tuple[np.ndarray, int]\n        d_vals: Directional derivatives along unit directions, shape (B,)\n        best_idx: Index of maximum directional derivative\n    \"\"\"\n    # TODO: Normalize direction vectors, compute dot products, and find argmax\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:\n    unit_u = directions / np.linalg.norm(directions, axis=-1, keepdims=True)\n    d_vals = unit_u @ grad\n    best_idx = int(np.argmax(d_vals))\n    return d_vals, best_idx"
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
            "en": "What is the foundational invariant governing The Gradient Vector & Directional Derivatives?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم متجه التدرج والمشتقات الاتجاهية؟"
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
    "id": "multivariable-scalar-fields",
    "title": "The Hessian Matrix, Curvature & Quadratic Approximations",
    "titleAr": "مصفوفة هيسي، الانحناء، والتقريبات التربيعية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "The gradient tells you the slope of the landscape at your feet. But is the ground shaped like a mountain peak, a bowl-shaped valley, a flat ...",
      "ar": "مصفوفة هيسي $\\mathbf{H}$ هي المعيار الحاكم لانحناء وتحدب الفضاء متعدد الأبعاد؛ إذ تجمع كافة المشتقات الجزئية من الدرجة الثانية في مصفوفة مرب..."
    },
    "prerequisites": [
      "derivative-tangent-slope",
      "cartesian-coordinate-metric"
    ],
    "x": 195,
    "y": 2265,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "HessianCurvatureCanvas",
        "narrative": {
          "en": "The gradient tells you the slope of the landscape at your feet. But is the ground shaped like a mountain peak, a bowl-shaped valley, a flat ramp, or a horse's saddle? The gradient cannot tell you, because at the bottom of a bowl, at the top of a peak, and at the center of a saddle, the ground is completely flat ($\\nabla f = \\mathbf{0}$). \n\nTo distinguish between these shapes, you need the Hessian Matrix $\\mathbf{H}$. The Hessian collects all the second-order partial derivatives. It acts like a multivariable bowl-detector:\n- If all its eigenvalues are positive, the ground curves upward in e",
          "ar": "مصفوفة هيسي $\\mathbf{H}$ هي المعيار الحاكم لانحناء وتحدب الفضاء متعدد الأبعاد؛ إذ تجمع كافة المشتقات الجزئية من الدرجة الثانية في مصفوفة مربعة متناظرة. في النقاط الحرجة التي ينعدم عندها التدرج، تقوم مصفوفة هيسي بفك لغز التضاريس عبر قيمها الذاتية: فإذا كانت جميع القيم الذاتية موجبة (مصفوفة موجبة المعرّفة)، فإننا في قاع وادٍ مستقر (نهاية صغرى). وإذا كانت سالبة، فنحن فوق قمة جبل (نهاية عظمى). أما إذا تباينت إشاراتها، فنحن نقف على \"نقطة سرجية\" (Saddle point) تتأرجح بين الصعود والهبوط."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{H} = \\nabla^2 f(\\mathbf{x}) \\coloneqq \\begin{bmatrix} \\frac{\\partial^2 f}{\\partial x_1^2} & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_2} & \\cdots & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_n} \\\\ \\frac{\\partial^2 f}{\\partial x_2 \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_2^2} & \\cdots & \\frac{\\partial^2 f}{\\partial x_2 \\partial x_n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial^2 f}{\\partial x_n \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_n \\partial x_2} & \\cdots & \\frac{\\partial^2 f}{\\partial x_n^2} \\end{bmatrix} \\in \\mathbb{R}^{n \\times n}",
        "formulaNote": {
          "en": "Core invariant for The Hessian Matrix, Curvature & Quadratic Approximations.",
          "ar": "الخاصية الرياضية الجوهرية لـ مصفوفة هيسي، الانحناء، والتقريبات التربيعية."
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
          "id": "py-multivariable-scalar-fields",
          "starterCode": "import numpy as np\n\ndef quadratic_form_curvature(H: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, str]:\n    \"\"\"\n    Compute directional quadratic curvatures and classify surface topology.\n    \n    Parameters\n    ----------\n    H : np.ndarray\n        Symmetric Hessian matrix of shape (D, D)\n    directions : np.ndarray\n        Array of test directions of shape (B, D)\n        \n    Returns\n    -------\n    tuple[np.ndarray, str]\n        curvatures: Directional curvatures for each unit vector, shape (B,)\n        topology: 'strictly_convex', 'strictly_concave', or 'saddle'\n    \"\"\"\n    # TODO: Compute quadratic forms via einsum and classify via eigenvalues\n    pass",
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
              "starterCode": "import numpy as np\n\ndef quadratic_form_curvature(H: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, str]:\n    \"\"\"\n    Compute directional quadratic curvatures and classify surface topology.\n    \n    Parameters\n    ----------\n    H : np.ndarray\n        Symmetric Hessian matrix of shape (D, D)\n    directions : np.ndarray\n        Array of test directions of shape (B, D)\n        \n    Returns\n    -------\n    tuple[np.ndarray, str]\n        curvatures: Directional curvatures for each unit vector, shape (B,)\n        topology: 'strictly_convex', 'strictly_concave', or 'saddle'\n    \"\"\"\n    # TODO: Compute quadratic forms via einsum and classify via eigenvalues\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef quadratic_form_curvature(H: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, str]:\n    unit_v = directions / np.linalg.norm(directions, axis=-1, keepdims=True)\n    curvatures = np.einsum('bd,de,be->b', unit_v, H, unit_v)\n    evals = np.linalg.eigvalsh(H)\n    if np.all(evals > 1e-10):\n        topology = 'strictly_convex'\n    elif np.all(evals < -1e-10):\n        topology = 'strictly_concave'\n    elif np.any(evals > 1e-10) and np.any(evals < -1e-10):\n        topology = 'saddle'\n    else:\n        topology = 'degenerate'\n    return curvatures, topology"
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
            "en": "What is the foundational invariant governing The Hessian Matrix, Curvature & Quadratic Approximations?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم مصفوفة هيسي، الانحناء، والتقريبات التربيعية؟"
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
    "id": "partial-derivatives-tangents",
    "title": "The Jacobian Matrix & Vector-Valued Deformation",
    "titleAr": "مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "A scalar field takes a multi-dimensional point and gives you a single number (e.g., location $\\to$ temperature). But what if a function take...",
      "ar": "مصفوفة جاكوبي $\\mathbf{J}$ هي التوسيع الشامل لمفهوم المشتقة ليشمل الدوال التي تأخذ متجهات وتُنتج متجهات أخرى ($\\mathbf{f}: \\mathbb{R}^n \\to ..."
    },
    "prerequisites": [
      "multivariable-scalar-fields"
    ],
    "x": 210,
    "y": 2360,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "JacobianMappingCanvas",
        "narrative": {
          "en": "A scalar field takes a multi-dimensional point and gives you a single number (e.g., location $\\to$ temperature). But what if a function takes a multi-dimensional point and gives you back another multi-dimensional vector? \nFor example, a wind map: at every location $(x, y)$, the wind has both an east-west speed $u(x, y)$ and a north-south speed $v(x, y)$. \n\nHow do you take the derivative of such a vector-valued system? You cannot use a single gradient vector, because each output component has its own gradient! \nThe Jacobian Matrix $\\mathbf{J}$ is the master matrix that stacks all these",
          "ar": "مصفوفة جاكوبي $\\mathbf{J}$ هي التوسيع الشامل لمفهوم المشتقة ليشمل الدوال التي تأخذ متجهات وتُنتج متجهات أخرى ($\\mathbf{f}: \\mathbb{R}^n \\to \\mathbb{R}^m$). تجمع مصفوفة جاكوبي تدرجات جميع دوال المخرجات في صفوف منظمة. هندسياً، تُمثل مصفوفة جاكوبي التحويل الخطي المحلي الدقيق الذي يصف كيف يتشوه مكعب متناهي الصغر في فضاء المدخلات ويتحول إلى متوازي سطوح في فضاء المخرجات، ويُعبر محددها $|\\det \\mathbf{J}|$ عن معامل تمدد الحجوم في تكاملات تغيير المتغيرات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{f}: \\mathbb{R}^n \\to \\mathbb{R}^m, \\quad \\mathbf{f}(\\mathbf{x}) = \\begin{bmatrix} f_1(\\mathbf{x}) \\\\ f_2(\\mathbf{x}) \\\\ \\vdots \\\\ f_m(\\mathbf{x}) \\end{bmatrix}, \\quad \\mathbf{J} = \\frac{\\partial \\mathbf{f}}{\\partial \\mathbf{x}} \\coloneqq \\begin{bmatrix} \\frac{\\partial f_1}{\\partial x_1} & \\cdots & \\frac{\\partial f_1}{\\partial x_n} \\\\ \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial f_m}{\\partial x_1} & \\cdots & \\frac{\\partial f_m}{\\partial x_n} \\end{bmatrix} = \\begin{bmatrix} \\nabla f_1^T \\\\ \\vdots \\\\ \\nabla f_m^T \\end{bmatrix} \\in \\mathbb{R}^{m \\times n}",
        "formulaNote": {
          "en": "Core invariant for The Jacobian Matrix & Vector-Valued Deformation.",
          "ar": "الخاصية الرياضية الجوهرية لـ مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية."
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
          "id": "py-partial-derivatives-tangents",
          "starterCode": "from typing import Callable\nimport numpy as np\n\ndef numerical_jacobian(F: Callable, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute the numerical Jacobian matrix of vector function F at x0.\n    \n    Parameters\n    ----------\n    F : Callable\n        Function mapping 1D array of length N to 1D array of length M\n    x0 : np.ndarray\n        Evaluation coordinate of shape (N,)\n    eps : float\n        Perturbation step size\n        \n    Returns\n    -------\n    np.ndarray\n        Jacobian matrix of shape (M, N)\n    \"\"\"\n    # TODO: Implement multivariate central difference Jacobian column assembly\n    pass",
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
              "starterCode": "from typing import Callable\nimport numpy as np\n\ndef numerical_jacobian(F: Callable, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute the numerical Jacobian matrix of vector function F at x0.\n    \n    Parameters\n    ----------\n    F : Callable\n        Function mapping 1D array of length N to 1D array of length M\n    x0 : np.ndarray\n        Evaluation coordinate of shape (N,)\n    eps : float\n        Perturbation step size\n        \n    Returns\n    -------\n    np.ndarray\n        Jacobian matrix of shape (M, N)\n    \"\"\"\n    # TODO: Implement multivariate central difference Jacobian column assembly\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef numerical_jacobian(F: Callable, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    n = len(x0)\n    E = np.eye(n) * eps\n    cols = []\n    for j in range(n):\n        f_plus = F(x0 + E[j])\n        f_minus = F(x0 - E[j])\n        cols.append((f_plus - f_minus) / (2.0 * eps))\n    return np.column_stack(cols)"
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
            "en": "What is the foundational invariant governing The Jacobian Matrix & Vector-Valued Deformation?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية؟"
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
    "id": "gradient-vector",
    "title": "Convexity, Epigraphs & Global Minimizers",
    "titleAr": "التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine a ceramic soup bowl. If you take any two points anywhere inside the soup or on the bowl's rim and stretch a laser beam between them,...",
      "ar": "التحدب هو الكأس المقدسة في علم التحسين الرياضي؛ فالمجموعة المحدبة هي تلك التي إذا وصلت بين أي نقطتين بداخلها بقطعة مستقيمة، ظلت تلك القطعة ب..."
    },
    "prerequisites": [
      "partial-derivatives-tangents",
      "linear-algebra-vectors"
    ],
    "x": 195,
    "y": 2455,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "ConvexityJensensCanvas",
        "narrative": {
          "en": "Imagine a ceramic soup bowl. If you take any two points anywhere inside the soup or on the bowl's rim and stretch a laser beam between them, the entire straight laser beam stays completely inside or above the bowl. It never punches through the outside walls into the open air. \n\nThis is the definition of a convex set. A convex function is a function whose landscape is shaped like this bowl: the line segment connecting any two points on its graph lies entirely on or above the graph. \nWhy is convexity the holy grail of modern optimization? Because on a convex bowl, you can never get tra",
          "ar": "التحدب هو الكأس المقدسة في علم التحسين الرياضي؛ فالمجموعة المحدبة هي تلك التي إذا وصلت بين أي نقطتين بداخلها بقطعة مستقيمة، ظلت تلك القطعة بكاملها محتواة داخل المجموعة دون أن تخرج منها. وتكون الدالة محدبة إذا كان \"مخططها الفوقي\" (المنطقة الواقعة فوق سطح المنحنى) يشكل مجموعة محدبة. الأهمية الاستثنائية للدوال المحدبة في تعلم الآلة تكمن في استحالة الوقوع في فخاخ النهايات الصغرى المحلية الخادعة؛ فكل قاع محلي هو حتماً القاع الشامل المطلق للدالة بأسرها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f(\\alpha \\mathbf{x} + (1-\\alpha)\\mathbf{y}) \\le \\alpha f(\\mathbf{x}) + (1-\\alpha)f(\\mathbf{y}) \\quad \\forall \\mathbf{x}, \\mathbf{y} \\in \\operatorname{dom}(f), \\; \\alpha \\in [0, 1]",
        "formulaNote": {
          "en": "Core invariant for Convexity, Epigraphs & Global Minimizers.",
          "ar": "الخاصية الرياضية الجوهرية لـ التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة."
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
          "id": "py-gradient-vector",
          "starterCode": "from typing import Callable\nimport numpy as np\n\ndef verify_jensen_gap(f: Callable, points: np.ndarray, weights: np.ndarray) -> tuple[float, float, float]:\n    \"\"\"\n    Compute expectation, function of expectation, and empirical Jensen gap.\n    \n    Parameters\n    ----------\n    f : Callable\n        Convex scalar function\n    points : np.ndarray\n        Array of sample coordinates of shape (N, D)\n    weights : np.ndarray\n        Weight array of shape (N,)\n        \n    Returns\n    -------\n    tuple[float, float, float]\n        sum_ex: Sum of components of E[X]\n        f_ex: f(E[X])\n        gap: E[f(X)] - f(E[X])\n    \"\"\"\n    # TODO: Normalize weights, compute expectations, and calculate Jensen gap\n    pass",
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
              "starterCode": "from typing import Callable\nimport numpy as np\n\ndef verify_jensen_gap(f: Callable, points: np.ndarray, weights: np.ndarray) -> tuple[float, float, float]:\n    \"\"\"\n    Compute expectation, function of expectation, and empirical Jensen gap.\n    \n    Parameters\n    ----------\n    f : Callable\n        Convex scalar function\n    points : np.ndarray\n        Array of sample coordinates of shape (N, D)\n    weights : np.ndarray\n        Weight array of shape (N,)\n        \n    Returns\n    -------\n    tuple[float, float, float]\n        sum_ex: Sum of components of E[X]\n        f_ex: f(E[X])\n        gap: E[f(X)] - f(E[X])\n    \"\"\"\n    # TODO: Normalize weights, compute expectations, and calculate Jensen gap\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef verify_jensen_gap(f: Callable, points: np.ndarray, weights: np.ndarray) -> tuple[float, float, float]:\n    norm_weights = weights / np.sum(weights)\n    e_x = np.sum(norm_weights[:, None] * points, axis=0)\n    f_e_x = float(f(e_x))\n    f_vals = np.array([float(f(p)) for p in points])\n    e_f_x = float(np.sum(norm_weights * f_vals))\n    gap = e_f_x - f_e_x\n    return float(np.sum(e_x)), f_e_x, gap"
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
            "en": "What is the foundational invariant governing Convexity, Epigraphs & Global Minimizers?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة؟"
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
    "id": "hessian-matrix-extrema",
    "title": "Gradient Descent, Learning Rates & Landscape Navigation",
    "titleAr": "الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are blindfolded on a foggy mountain slope in a thick mist. You cannot see the valley at the bottom. How can you navigate to the ...",
      "ar": "خوارزمية الانحدار التدريجي هي العمود الفقري لتدريب كافة نماذج الذكاء الاصطناعي؛ إذ تُحاكي متسلقاً أعمى يهبط جبلاً غارقاً في الضباب عبر التحس..."
    },
    "prerequisites": [
      "gradient-vector",
      "higher-order-derivatives-concavity"
    ],
    "x": 210,
    "y": 2550,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GradientDescentDynamicsLab",
        "narrative": {
          "en": "Imagine you are blindfolded on a foggy mountain slope in a thick mist. You cannot see the valley at the bottom. How can you navigate to the safety of the valley? \n\nYou can feel the slant of the ground with your boots. If your boots tell you that the ground slopes steeply upward toward the north and east, you simply take a step in the exact opposite direction: toward the south and west! \nThis is Gradient Descent. \nYou take a step downhill, feel the new slope, take another step downhill, and repeat. But be careful about your step size (the learning rate $\\eta$):\n- If your steps are tiny",
          "ar": "خوارزمية الانحدار التدريجي هي العمود الفقري لتدريب كافة نماذج الذكاء الاصطناعي؛ إذ تُحاكي متسلقاً أعمى يهبط جبلاً غارقاً في الضباب عبر التحسس المستمر لدرجة ميل الأرض تحت قدميه والمشي في عكس اتجاه الصعود ($-\\nabla f$). يُحدد \"معدل التعلم\" $\\eta$ حجم الخطوة: فالخطوات المتناهية الصغر تؤدي لبطء شديد وتجمد، بينما الخطوات المفرطة تؤدي للقفز العنيف فوق الوادي وتشتت النموذج. وفي الأودية الضيقة ذات الانحناء غير المتناسق، تعاني الخوارزمية من تذبذبات متعرجة حادة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{x}_{t+1} = \\mathbf{x}_t - \\eta_t \\nabla f(\\mathbf{x}_t), \\quad t = 0, 1, 2, \\dots",
        "formulaNote": {
          "en": "Core invariant for Gradient Descent, Learning Rates & Landscape Navigation.",
          "ar": "الخاصية الرياضية الجوهرية لـ الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس."
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
          "id": "py-hessian-matrix-extrema",
          "starterCode": "import numpy as np\n\ndef momentum_gradient_descent_step(x: np.ndarray, grad: np.ndarray, v: np.ndarray, lr: float, beta: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single update step of classical Polyak momentum gradient descent.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Current parameters, shape (D,)\n    grad : np.ndarray\n        Gradient vector, shape (D,)\n    v : np.ndarray\n        Velocity vector, shape (D,)\n    lr : float\n        Learning rate\n    beta : float\n        Momentum factor\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_next: Updated parameters of shape (D,)\n        v_next: Updated velocity buffer of shape (D,)\n    \"\"\"\n    # TODO: Implement momentum velocity and coordinate update\n    pass",
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
              "starterCode": "import numpy as np\n\ndef momentum_gradient_descent_step(x: np.ndarray, grad: np.ndarray, v: np.ndarray, lr: float, beta: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single update step of classical Polyak momentum gradient descent.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Current parameters, shape (D,)\n    grad : np.ndarray\n        Gradient vector, shape (D,)\n    v : np.ndarray\n        Velocity vector, shape (D,)\n    lr : float\n        Learning rate\n    beta : float\n        Momentum factor\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_next: Updated parameters of shape (D,)\n        v_next: Updated velocity buffer of shape (D,)\n    \"\"\"\n    # TODO: Implement momentum velocity and coordinate update\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef momentum_gradient_descent_step(x: np.ndarray, grad: np.ndarray, v: np.ndarray, lr: float, beta: float) -> tuple[np.ndarray, np.ndarray]:\n    v_next = beta * v + lr * grad\n    x_next = x - v_next\n    return x_next, v_next"
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
            "en": "What is the foundational invariant governing Gradient Descent, Learning Rates & Landscape Navigation?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس؟"
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
    "id": "bayes-theorem",
    "title": "Constrained Optimization & Lagrange Multipliers",
    "titleAr": "التحسين المقيد ومضروبات لاغرانج",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose you want to hike to the highest possible elevation on a mountain ($f(x, y)$), but you are forbidden from wandering off a paved hikin...",
      "ar": "تحل طريقة مضروبات لاغرانج معضلة تحسين الدوال الخاضعة لقيود إجبارية؛ كأن تبحث عن أعلى نقطة في جبل مع الالتزام الصارم بالسير على مسار سياحي مح..."
    },
    "prerequisites": [
      "cartesian-coordinate-metric"
    ],
    "x": 220,
    "y": 2645,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LagrangeMultiplierCanvas",
        "narrative": {
          "en": "Suppose you want to hike to the highest possible elevation on a mountain ($f(x, y)$), but you are forbidden from wandering off a paved hiking trail ($g(x, y) = c$). You cannot simply walk to the mountain summit because the trail does not pass through the summit. Where along the trail will your elevation be highest? \n\nThink about walking along the trail: as long as the trail crosses contour lines at an angle, you are actively gaining or losing height. The only point where your elevation stops changing along the trail is when the trail runs perfectly parallel to a contour line! \nAt that ex",
          "ar": "تحل طريقة مضروبات لاغرانج معضلة تحسين الدوال الخاضعة لقيود إجبارية؛ كأن تبحث عن أعلى نقطة في جبل مع الالتزام الصارم بالسير على مسار سياحي محدد $g(x,y)=0$. هندسياً، لا يمكن بلوغ القمة المقيدة إلا عند النقطة التي يمس فيها مسار القيد خطوط كنتور الدالة المستهدفة؛ إذ يعني عدم التماس استمرار إمكانية الصعود على المسار. هذا التماس الهندسي يتكافأ مع توازي متجهات التدرج: $\\nabla f = \\lambda \\nabla g$. ويُعبر المضروب $\\lambda$ عن الحساسية الهامشية أو \"السعر الخفي\" لتعديل القيد."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\mathbf{x} \\in \\mathbb{R}^n} f(\\mathbf{x}) \\quad \\text{subject to} \\quad g_i(\\mathbf{x}) = 0, \\quad i = 1, \\dots, m \\quad (m < n)",
        "formulaNote": {
          "en": "Core invariant for Constrained Optimization & Lagrange Multipliers.",
          "ar": "الخاصية الرياضية الجوهرية لـ التحسين المقيد ومضروبات لاغرانج."
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
          "id": "py-bayes-theorem",
          "starterCode": "import numpy as np\n\ndef solve_constrained_quadratic_kkt(Q: np.ndarray, c: np.ndarray, A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Solve equality-constrained quadratic program via the block KKT matrix system.\n    \n    Parameters\n    ----------\n    Q : np.ndarray\n        Hessian matrix of shape (N, N)\n    c : np.ndarray\n        Linear cost vector of shape (N,)\n    A : np.ndarray\n        Constraint matrix of shape (M, N)\n    b : np.ndarray\n        Constraint bounds of shape (M,)\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_star: Optimal primal solution of shape (N,)\n        lambda_star: Optimal dual multipliers of shape (M,)\n    \"\"\"\n    # TODO: Construct block KKT matrix and solve linear system\n    pass",
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
              "starterCode": "import numpy as np\n\ndef solve_constrained_quadratic_kkt(Q: np.ndarray, c: np.ndarray, A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Solve equality-constrained quadratic program via the block KKT matrix system.\n    \n    Parameters\n    ----------\n    Q : np.ndarray\n        Hessian matrix of shape (N, N)\n    c : np.ndarray\n        Linear cost vector of shape (N,)\n    A : np.ndarray\n        Constraint matrix of shape (M, N)\n    b : np.ndarray\n        Constraint bounds of shape (M,)\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_star: Optimal primal solution of shape (N,)\n        lambda_star: Optimal dual multipliers of shape (M,)\n    \"\"\"\n    # TODO: Construct block KKT matrix and solve linear system\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef solve_constrained_quadratic_kkt(Q: np.ndarray, c: np.ndarray, A: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:\n    n = Q.shape[0]\n    m = A.shape[0]\n    KKT = np.block([[Q, A.T], [A, np.zeros((m, m))]])\n    rhs = np.concatenate([-c, b])\n    sol = np.linalg.solve(KKT, rhs)\n    x_star = sol[:n]\n    lambda_star = sol[n:]\n    return x_star, lambda_star"
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
            "en": "What is the foundational invariant governing Constrained Optimization & Lagrange Multipliers?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم التحسين المقيد ومضروبات لاغرانج؟"
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
    "id": "central-limit-theorem",
    "title": "The Central Limit Theorem & Geometric Convergence of Noise",
    "titleAr": "مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Take a six-sided die. Roll it once: the outcome is uniformly flat and jagged (equal $1/6$ chance for 1, 2, 3, 4, 5, or 6). There is nothing ...",
      "ar": "مبرهنة النهاية المركزية هي التاج الملكي لنظرية الاحتمالات والهندسة الإحصائية؛ إذ تُثبت أن مجموع عدد كبير من المتغيرات العشوائية المستقلة وال..."
    },
    "prerequisites": [
      "bayes-theorem",
      "differentiation-rules-chain"
    ],
    "x": 220,
    "y": 2740,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GaltonBoardCltLab",
        "narrative": {
          "en": "Take a six-sided die. Roll it once: the outcome is uniformly flat and jagged (equal $1/6$ chance for 1, 2, 3, 4, 5, or 6). There is nothing \"bell-shaped\" or round about it. \n\nNow, roll 100 dice and calculate the average score. Repeat this experiment 1,000 times. What does the distribution of those 1,000 averages look like? Miraculously, it forms a silky-smooth, perfectly symmetrical Gaussian bell curve! \n\nEven if you started with a bizarre, lopsided distribution (like coin flips, radioactive decay clicks, or lottery tickets), the act of adding many independent random variables together was",
          "ar": "مبرهنة النهاية المركزية هي التاج الملكي لنظرية الاحتمالات والهندسة الإحصائية؛ إذ تُثبت أن مجموع عدد كبير من المتغيرات العشوائية المستقلة والمتطابقة التوزيع، مهما كان شكل توزيعها الأصلي غريباً أو مشوهاً أو غير متماثل، يقترب بالضرورة وبشكل حتمي من \"التوزيع الطبيعي الغاوسي\" الأملس متى ما كان التباين محدوداً. هندسياً، يعكس هذا المبدأ ظاهرة تركز الحجم في الفضاءات عالية الأبعاد؛ حيث تتركز الاحتمالات في قشرة كروية رقيقة يتخذ مسقطها الأحادي شكل منحنى الجرس الشهير."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "S_N \\coloneqq \\sum_{i=1}^N X_i, \\quad \\bar{X}_N \\coloneqq \\frac{1}{N} S_N, \\quad X_i \\overset{\\text{i.i.d.}}{\\sim} \\mathcal{D}(\\mu, \\sigma^2 < \\infty)",
        "formulaNote": {
          "en": "Core invariant for The Central Limit Theorem & Geometric Convergence of Noise.",
          "ar": "الخاصية الرياضية الجوهرية لـ مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء."
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
          "id": "py-central-limit-theorem",
          "starterCode": "import numpy as np\n\ndef standardized_sample_means(samples: np.ndarray, true_mean: float, true_std: float) -> np.ndarray:\n    \"\"\"\n    Compute standardized sample mean Z-scores across M independent experiments.\n    \n    Parameters\n    ----------\n    samples : np.ndarray\n        Array of shape (M, N) containing M experiments of N draws each\n    true_mean : float\n        Population mean mu\n    true_std : float\n        Population standard deviation sigma\n        \n    Returns\n    -------\n    np.ndarray\n        Standardized Z-statistics of shape (M,)\n    \"\"\"\n    # TODO: Compute sample means along axis 1 and standardize via true std / sqrt(N)\n    pass",
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
              "starterCode": "import numpy as np\n\ndef standardized_sample_means(samples: np.ndarray, true_mean: float, true_std: float) -> np.ndarray:\n    \"\"\"\n    Compute standardized sample mean Z-scores across M independent experiments.\n    \n    Parameters\n    ----------\n    samples : np.ndarray\n        Array of shape (M, N) containing M experiments of N draws each\n    true_mean : float\n        Population mean mu\n    true_std : float\n        Population standard deviation sigma\n        \n    Returns\n    -------\n    np.ndarray\n        Standardized Z-statistics of shape (M,)\n    \"\"\"\n    # TODO: Compute sample means along axis 1 and standardize via true std / sqrt(N)\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef standardized_sample_means(samples: np.ndarray, true_mean: float, true_std: float) -> np.ndarray:\n    sample_means = np.mean(samples, axis=1)\n    n = samples.shape[1]\n    z_scores = (sample_means - true_mean) / (true_std / np.sqrt(n))\n    return z_scores"
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
            "en": "What is the foundational invariant governing The Central Limit Theorem & Geometric Convergence of Noise?",
            "ar": "ما هو الشرط الرياضي الجوهري الذي يحكم مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء؟"
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
