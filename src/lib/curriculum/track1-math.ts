import type { CurriculumModule } from '../types';

export const mathModules: CurriculumModule[] = [
  {
    "id": "cartesian-coordinate-metric",
    "title": "Cartesian Coordinate Systems & The Euclidean Metric",
    "titleAr": "نظام الإحداثيات الديكارتية والمقياس الإقليدي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine an infinite, flat desert with no landmarks in sight. To communicate where an oasis lies, you must fix an arbitrary reference...",
      "ar": "تخيل صحراء لا متناهية منبسطة لا معالم فيها. إذا غادرت قافلة واحة مائية وتوغلت في الرمال، فكيف يمكن لأي شخص آخر العثور على تلك الواحة؟ لا بد..."
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
          "en": "Imagine an infinite, flat desert with no landmarks in sight. To communicate where an oasis lies, you must fix an arbitrary reference stone—the origin $\\mathbf{0}$—and establish two perpendicular walking trails, which we call the orthogonal coordinate axes $X$ and $Y$. Every single location in the desert is now uniquely indexed by two signed numbers: how far east or west, and how far north or south.\n\nOnce coordinates exist, distance between any two locations is not arbitrary; it is the straight-line physical path carved through space. If you are standing in a city built on a strict rectangular grid like Manhattan, traveling from street corner $\\mathbf{p}$ to corner $\\mathbf{q}$ forces you to walk along streets and avenues—a path known as the $L_1$ Manhattan metric. But if you are a bird flying freely through the air, you cut diagonally across the blocks. You trace the hypotenuse of a right-angled triangle formed by your horizontal and vertical displacements.\n\nThe Pythagorean theorem guarantees that this hypotenuse squared equals the sum of the squares of the legs. The Euclidean metric ($L_2$) generalizes this principle to three, four, or ten thousand dimensions. Crucially, physical space does not care how you orient your coordinate axes: if you rotate your measuring grid, the numbers representing your position will change, but the Euclidean distance between any two stationary points remains fundamentally invariant.",
          "ar": "تخيل صحراء لا متناهية منبسطة لا معالم فيها. إذا غادرت قافلة واحة مائية وتوغلت في الرمال، فكيف يمكن لأي شخص آخر العثور على تلك الواحة؟ لا بد أولاً من تثبيت حجر مرجعي نعتبره نقطة الأصل $\\mathbf{0}$، ورسم مسارين متعامدين للمشي يمثلان المحورين الإحداثيين المتعامدين $X$ و $Y$. من هذه اللحظة، يصبح كل موقع في الصحراء معرّفاً برقمين محددين: المسافة شرقاً أو غرباً، والمسافة شمالاً أو جنوباً.\n\nبمجرد إنشاء هذا النظام، لا يصبح قياس المسافة بين نقطتين مسألة خاضعة للتقدير العشوائي، بل هو أقصر مسار فيزيائي مستقيم يصل بينهما في الفضاء. إذا كنت تسير في مدينة مصممة على شكل شبكة شوارع مربعة مثل مانهاتن، فإن الانتقال من تقاطع $\\mathbf{p}$ إلى تقاطع $\\mathbf{q}$ يجبرك على المشي عبر الشوارع والأزقة المتعامدة—وهو ما يسمى بمقياس مانهاتن ($L_1$). ولكن لو كنت طائراً يحلق في الفضاء المفتوح، فإنك ستقطع المسافة قطرياً عبر سماء المدينة، راسماً وتر مثلث قائم الزاوية تشكل أضلاعه إزاحاتك الأفقية والعمودية.\n\nتضمن مبرهنة فيثاغورس أن مربع هذا الوتر يساوي مجموع مربعي الضلعين الآخرين. المقياس الإقليدي ($L_2$) يمثل تعميماً ملهماً لهذه المبرهنة في أي عدد من الأبعاد، سواء كنا في فضاء ثنائي أو ثلاثي الأبعاد أو فضاء بيانات يضم آلاف الأبعاد. والأمر البديع هندسياً هو أن الفضاء الفيزيائي لا يكترث بكيفية تدويرنا للمحاور؛ فلو أدرت شبكة الإحداثيات بزاوية معينة، ستتغير الأرقام التي تمثل إحداثيات كل نقطة، ولكن المسافة الإقليدية المستقيمة الفاصلة بين أي نقطتين تظل ثابتة ومطلقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "d_2(\\mathbf{p}, \\mathbf{q}) \\coloneqq \\|\\mathbf{p} - \\mathbf{q}\\|_2 = \\sqrt{\\sum_{i=1}^n (p_i - q_i)^2} = \\sqrt{(\\mathbf{p} - \\mathbf{q})^T (\\mathbf{p} - \\mathbf{q})}",
        "formulaNote": {
          "en": "The Euclidean distance metric as the L2 norm of the spatial displacement vector.",
          "ar": "مقياس المسافة الإقليدية كمعيار L2 لمتجه الإزاحة المكانية."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- $\\mathbf{p}, \\mathbf{q} \\in \\mathbb{R}^n$: Coordinate vectors representing the exact spatial positions of two points in $n$-dimensional Euclidean space.\n- $\\mathbf{p} - \\mathbf{q}$: The displacement vector pointing directly from destination $\\mathbf{q}$ to source $\\mathbf{p}$.\n- $(p_i - q_i)^2$: The squared coordinate separation along the $i$-th dimension. Squaring eliminates negative signs and penalizes large directional discrepancies.\n- $\\sum_{i=1}^n$: Accumulates the independent squared contributions across all $n$ mutually orthogonal spatial dimensions.\n- $\\sqrt{\\dots}$: The square root operator inverts the quadratic expansion, restoring the quantity to original physical units of linear length (e.g., meters).\n- $(\\mathbf{p} - \\mathbf{q})^T (\\mathbf{p} - \\mathbf{q})$: The algebraic inner product (dot product) formulation, showing that squared Euclidean distance is simply the projection of the displacement onto itself.",
          "ar": "- $\\mathbf{p}, \\mathbf{q} \\in \\mathbb{R}^n$: متجها الإحداثيات اللذان يمثلان الموقعين المكانيين لنقطتين في فضاء إقليدي ذي $n$ بعداً.\n- $\\mathbf{p} - \\mathbf{q}$: متجه الإزاحة الفراغية الذي ينطلق مباشرة من النقطة $\\mathbf{q}$ نحو النقطة $\\mathbf{p}$.\n- $(p_i - q_i)^2$: مربع الفارق الإحداثي على طول البعد $i$. يضمن التربيع إزالة الإشارات السالبة ومضاعفة معاقبة التباعد الكبير.\n- $\\sum_{i=1}^n$: يجمع المساهمات التربيعية المستقلة عبر كافة الأبعاد المكانية المتعامدة مثنى مثنى.\n- $\\sqrt{\\dots}$: جذر تربيعي يعكس التمدد التربيعي ليعيد الناتج إلى وحدات الطول الفيزيائية الأصلية (مثل الأمتار).\n- $(\\mathbf{p} - \\mathbf{q})^T (\\mathbf{p} - \\mathbf{q})$: صياغة الجداء الداخلي (الجداء النقطي لمتجه الإزاحة مع نفسه)، موضحاً أن مربع المسافة هو مقياس طاقة الإزاحة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-cartesian-coordinate-metric",
          "starterCode": "import numpy as np\n\ndef euclidean_distance(p: np.ndarray, q: np.ndarray) -> float:\n    \"\"\"\n    Compute the Euclidean (L2) distance between two points p and q.\n    \n    Parameters\n    ----------\n    p : np.ndarray of shape (D,)\n        First coordinate vector.\n    q : np.ndarray of shape (D,)\n        Second coordinate vector.\n        \n    Returns\n    -------\n    float\n        The straight-line Euclidean distance between p and q.\n    \"\"\"\n    # Step 1: Compute the element-wise difference vector (displacement)\n    # diff = ...\n    \n    # Step 2: Square each component of the difference vector\n    # squared_diff = ...\n    \n    # Step 3: Sum the squared components and compute the square root\n    # return ...\n    pass",
          "testCases": [
            {
              "input": "euclidean_distance(np.array([0.0, 0.0]), np.array([3.0, 4.0]))",
              "expected": "5.0"
            },
            {
              "input": "euclidean_distance(np.array([1.0, 2.0, 3.0]), np.array([1.0, 2.0, 3.0]))",
              "expected": "0.0"
            },
            {
              "input": "euclidean_distance(np.array([1.0, 1.0]), np.array([4.0, 5.0]))",
              "expected": "5.0"
            }
          ],
          "expectedOutput": "5.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef euclidean_distance(p: np.ndarray, q: np.ndarray) -> float:\n    \"\"\"\n    Compute the Euclidean (L2) distance between two points p and q.\n    \n    Parameters\n    ----------\n    p : np.ndarray of shape (D,)\n        First coordinate vector.\n    q : np.ndarray of shape (D,)\n        Second coordinate vector.\n        \n    Returns\n    -------\n    float\n        The straight-line Euclidean distance between p and q.\n    \"\"\"\n    # Step 1: Compute the element-wise difference vector (displacement)\n    # diff = ...\n    \n    # Step 2: Square each component of the difference vector\n    # squared_diff = ...\n    \n    # Step 3: Sum the squared components and compute the square root\n    # return ...\n    pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "import numpy as np\n\ndef euclidean_distance(p: np.ndarray, q: np.ndarray) -> float:\n    diff = p - q\n    squared_diff = diff ** 2\n    return float(np.sqrt(np.sum(squared_diff)))"
        },
        "hints": {
          "tier1": {
            "en": "Subtract point q from point p directly using NumPy's element-wise array subtraction: diff = p - q.",
            "ar": "اطرح النقطة q من النقطة p مباشرة باستخدام طرح المصفوفات في نَمباي: diff = p - q."
          },
          "tier2": {
            "en": "Square the difference vector element-wise with diff ** 2 or np.square(diff).",
            "ar": "قم بتربيع عناصر متجه الفارق باستخدام diff ** 2 أو np.square(diff)."
          },
          "tier3": {
            "en": "Sum all squared differences with np.sum() and wrap with np.sqrt(): return float(np.sqrt(np.sum(diff ** 2))).",
            "ar": "اجمع كافة الفروق المربعة بـ np.sum() وطبق الجذر التربيعي: return float(np.sqrt(np.sum(diff ** 2)))."
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
            "en": "An autonomous delivery drone calculates distances between stationary landing pads. If the drone's internal coordinate frame is rotated by 45 degrees, how does the straight-line Euclidean distance between two static pads change compared to the grid Manhattan distance?",
            "ar": "تحسب طائرة مسيرة ذاتية القيادة المسافات بين منصات هبوط ثابتة. إذا استدار نظام الإحداثيات الداخلي للدرون بزاوية 45 درجة، فكيف تتغير المسافة الإقليدية المستقيمة مقارنة بمسافة مانهاتن الشبكية؟"
          },
          "options": [
            {
              "text": {
                "en": "Euclidean distance remains strictly unchanged because spatial rotations are orthogonal transforms that preserve inner products and vector norms, whereas Manhattan distance fluctuates with grid alignment.",
                "ar": "تظل المسافة الإقليدية ثابتة تماماً لأن الدوران تحويل متعامد يحافظ على الجداء الداخلي وأطوال المتجهات، بينما تتغير مسافة مانهاتن لتأثرها بمحاذاة الشبكة.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The Euclidean L2 metric is rotationally invariant (isotropic). In contrast, the L1 norm depends on axis orientation: a vector (1, 0) has L1=1, but rotated 45 degrees to (sqrt(2)/2, sqrt(2)/2) its L1 distance increases to sqrt(2) ≈ 1.414.",
                "ar": "المقياس الإقليدي L2 متناظر دورانياً ولا يكترث بتوجيه المحاور. على النقيض، يعتمد معيار L1 على اتجاه المحاور: فالمتجه (1, 0) طوله L1=1، لكن عند تدويره 45 درجة يصبح طول مانهاتن حوالي 1.414."
              }
            },
            {
              "text": {
                "en": "Both Euclidean and Manhattan distances scale up uniformly by a factor of sqrt(2) due to the diagonal trajectory.",
                "ar": "تتضاعف كل من المسافتين الإقليدية ومانهاتن بعامل الجذر التربيعي لـ 2 نتيجة المسار القطري.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Physical distance between stationary objects does not increase just because you tilt your head or rotate your compass.",
                "ar": "المسافة الفيزيائية بين أجسام ساكنة لا تزداد لمجرد أنك أملت بوصلتك أو قمت بتدوير محاور قياسك."
              }
            },
            {
              "text": {
                "en": "Euclidean distance shrinks because hypotenuse paths always contract under angular coordinate transformations.",
                "ar": "تنكمش المسافة الإقليدية لأن مسار الوتر يتقلص دائماً تحت التحويلات الزاوية للإحداثيات.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The Euclidean path is already the minimal straight-line geodesic in flat space; rotating the coordinate basis cannot shrink or stretch it.",
                "ar": "المسار الإقليدي هو بالفعل أقصر مسار جيوديسي مستقيم في الفضاء الإقليدي؛ وتدوير محاور الإسناد لا يمكن أن يقلصه أو يمدده."
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
    "titleAr": "هندسة معدل التغير وميل الخطوط",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "If you hike up an evenly graded mountain ramp, every step you take forward carries you a predictable distance upward.",
      "ar": "إذا صعدت منحدراً جبلياً ممهداً بانتظام، فإن كل خطوة تخطوها للأمام ترفعك مسافة رأسية ثابتة ومتوقعة."
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
          "en": "If you hike up an evenly graded mountain ramp, every step you take forward carries you a predictable distance upward. If advancing 2 meters horizontally elevates you by 1 meter vertically, your slope is 0.5. No matter where you measure along that ramp—at the beginning, in the middle, or near the summit—this ratio never fluctuates. This invariant ratio is the slope.\n\nSlope is the universal language of sensitivity in mathematics, economics, and machine learning. In financial modeling, it answers: 'If ad spending increases by $1, by how many dollars will revenue climb?' If a line is perfectly flat and horizontal, walking forward costs zero vertical effort ($m = 0$). If a line is a sheer vertical cliff, you are attempting to climb infinitely high without taking a single step forward ($m = \\infty$ or undefined).\n\nA negative slope indicates that moving forward drives you downward. Geometrically, the slope equals the trigonometric tangent of the angle $\\theta$ made with the positive horizontal axis ($m = \\tan \\theta$). When you fit a linear regression or compute a derivative, you are searching for this very number: the local rate at which one physical quantity transforms into another.",
          "ar": "إذا صعدت منحدراً جبلياً ممهداً بانتظام، فإن كل خطوة تخطوها للأمام ترفعك مسافة رأسية ثابتة ومتوقعة. إذا كان التقدم بمقدار مترين أفقياً يرفعك متراً واحداً رأسياً، فإن ميل هذا المسار هو 0.5. ومهما كان موقع قياسك على طول المنحدر—في بدايته أو وسطه أو قرب قمته—فإن هذه النسبة لا تتغير أبداً. هذا الثابت الهندسي هو ما نسميه الميل.\n\nالميل هو لغة الحساسية المشتركة في الرياضيات والقياس الاقتصادي وتعلم الآلة. في النماذج المالية، يجيب الميل عن سؤال جوهري: 'إذا زادت ميزانية الإعلانات بدولار واحد، فبكم دولار ستزيد الإيرادات؟' إذا كان الخط أفقياً تماماً، فإن المشي للأمام لا يتطلب أي صعود رأسي ($m = 0$). أما إذا كان الخط جداراً رأسياً عمودياً، فأنت تحاول الصعود إلى مالانهاية دون أن تخطو خطوة أفقية واحدة ($m = \\infty$ أو غير معرّف).\n\nالميل السالب يعني أن التقدم للأمام يقودك نحو الانحدار للأسفل. هندسياً، يمثل الميل ظل زاوية الارتفاع $\\theta$ التي يصنعها الخط مع المحور الأفقي الموجب ($m = \\tan \\theta$). وعندما تبني نموذج انحدار خطي أو تحسب مشتقة تفاضلية، فإنك تبحث عن هذا الرقم بالتحديد: المعدل المباشر الذي تتحول به وحدة من متغير إلى متغير آخر."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "m \\coloneqq \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan(\\theta), \\quad \\Delta x \\ne 0",
        "formulaNote": {
          "en": "The constant linear slope as the ratio of vertical displacement (rise) to horizontal displacement (run).",
          "ar": "الميل الخطي الثابت كنسبة بين الإزاحة الرأسية (الارتفاع) والإزاحة الأفقية (الامتداد)."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- $m$: The slope or constant rate of change, representing the sensitivity of $y$ with respect to $x$.\n- $\\Delta y = y_2 - y_1$: The vertical displacement ('rise'), indicating the signed change in the response variable.\n- $\\Delta x = x_2 - x_1$: The horizontal displacement ('run'), indicating the signed change in the input variable.\n- \\frac{\\Delta y}{\\Delta x}: The differential quotient measuring how many units of vertical change occur per single unit of horizontal progress.\n- \\tan(\\theta): The trigonometric tangent connecting linear algebra to planar geometry, relating slope directly to the inclination angle $\\theta$.\n- \\Delta x \\ne 0: The non-degeneracy condition; a zero horizontal change produces a vertical line with undefined slope.",
          "ar": "- $m$: الميل أو معدل التغير الثابت، ويمثل حساسية المتغير التابع $y$ للتغير في المتغير المستقل $x$.\n- $\\Delta y = y_2 - y_1$: الإزاحة الرأسية (الارتفاع)، وتوضح المقدار الجبري للتغير في المتغير الرأسي.\n- $\\Delta x = x_2 - x_1$: الإزاحة الأفقية (الامتداد)، وتوضح المقدار الجبري للتغير في المتغير الأفقي.\n- \\frac{\\Delta y}{\\Delta x}: النسبة التفاضلية التي تقيس كم وحدة رأسية تتغير مقابل كل وحدة أفقية واحدة.\n- \\tan(\\theta): ظل الزاوية المثلثي الذي يربط الجبر بالهندسة المستوية، موضحاً علاقة الميل بزاوية الانحدار $\\theta$.\n- \\Delta x \\ne 0: شرط عدم الانعدام؛ فالتغير الأفقي الصفري يعني خطاً عمودياً ذا ميل غير معرّف."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-linear-rate-of-change-slopes",
          "starterCode": "import numpy as np\n\ndef compute_slope(p1: np.ndarray, p2: np.ndarray) -> float:\n    \"\"\"\n    Compute the linear rate of change (slope) between two 2D points.\n    \n    Parameters\n    ----------\n    p1 : np.ndarray of shape (2,)\n        First point coordinates [x1, y1].\n    p2 : np.ndarray of shape (2,)\n        Second point coordinates [x2, y2].\n        \n    Returns\n    -------\n    float\n        The rate of change m = (y2 - y1) / (x2 - x1).\n        \n    Raises\n    ------\n    ZeroDivisionError\n        If x2 == x1 (vertical line).\n    \"\"\"\n    # Step 1: Compute vertical rise (delta_y)\n    # delta_y = ...\n    \n    # Step 2: Compute horizontal run (delta_x)\n    # delta_x = ...\n    \n    # Step 3: Check for vertical line and return slope ratio\n    # return ...\n    pass",
          "testCases": [
            {
              "input": "compute_slope(np.array([0.0, 0.0]), np.array([2.0, 6.0]))",
              "expected": "3.0"
            },
            {
              "input": "compute_slope(np.array([1.0, 5.0]), np.array([4.0, 2.0]))",
              "expected": "-1.0"
            },
            {
              "input": "compute_slope(np.array([-2.0, 3.0]), np.array([2.0, 3.0]))",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "3.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_slope(p1: np.ndarray, p2: np.ndarray) -> float:\n    \"\"\"\n    Compute the linear rate of change (slope) between two 2D points.\n    \n    Parameters\n    ----------\n    p1 : np.ndarray of shape (2,)\n        First point coordinates [x1, y1].\n    p2 : np.ndarray of shape (2,)\n        Second point coordinates [x2, y2].\n        \n    Returns\n    -------\n    float\n        The rate of change m = (y2 - y1) / (x2 - x1).\n        \n    Raises\n    ------\n    ZeroDivisionError\n        If x2 == x1 (vertical line).\n    \"\"\"\n    # Step 1: Compute vertical rise (delta_y)\n    # delta_y = ...\n    \n    # Step 2: Compute horizontal run (delta_x)\n    # delta_x = ...\n    \n    # Step 3: Check for vertical line and return slope ratio\n    # return ...\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_slope(p1: np.ndarray, p2: np.ndarray) -> float:\n    delta_y = float(p2[1] - p1[1])\n    delta_x = float(p2[0] - p1[0])\n    if delta_x == 0.0:\n        raise ZeroDivisionError(\"Slope is undefined for vertical lines (delta_x = 0).\")\n    return delta_y / delta_x"
        },
        "hints": {
          "tier1": {
            "en": "Extract the coordinates: delta_y = p2[1] - p1[1] and delta_x = p2[0] - p1[0].",
            "ar": "استخرج الإحداثيات: delta_y = p2[1] - p1[1] و delta_x = p2[0] - p1[0]."
          },
          "tier2": {
            "en": "Guard against zero division when delta_x == 0.0 by raising ZeroDivisionError.",
            "ar": "تأكد من فحص حالة القسمة على الصفر عندما delta_x == 0.0 برفع استثناء ZeroDivisionError."
          },
          "tier3": {
            "en": "Return delta_y / delta_x as a float: return float(delta_y / delta_x).",
            "ar": "أرجع النسبة delta_y / delta_x كعدد حقيقي: return float(delta_y / delta_x)."
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
            "en": "In an empirical econometrics study, the regressor x represents temperature measured in Celsius, and y represents electricity demand. If the researcher converts all x measurements to Fahrenheit using the transformation F = 1.8 * C + 32, how does the new estimated regression slope m_F compare to the original slope m_C?",
            "ar": "في دراسة قياسية، يمثل المتغير المستقل x درجة الحرارة بالدرجة المئوية، ويمثل y الطلب على الكهرباء. إذا قام الباحث بتحويل درجات الحرارة إلى الفهرنهايت وفق F = 1.8 * C + 32، فكيف يقارن الميل الجديد m_F بالميل الأصلي m_C؟"
          },
          "options": [
            {
              "text": {
                "en": "The slope is divided by 1.8 (m_F = m_C / 1.8) because each unit increase in Fahrenheit represents only 1/1.8 of a Celsius degree, while the additive constant +32 does not affect slopes at all.",
                "ar": "يُقسم الميل على 1.8 (أي m_F = m_C / 1.8) لأن زيادة وحدة واحدة في الفهرنهايت تعادل فقط 1/1.8 من الدرجة المئوية، بينما الثابت 32 لا يغير الميل إطلاقاً.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Slope measures dy/dx. Under the chain rule, dy/dF = (dy/dC) * (dC/dF) = m_C * (1 / 1.8). Adding a constant shifts the line without changing its tilt, whereas multiplying x expands the run and thus compresses the slope.",
                "ar": "يقيس الميل dy/dx. ووفق قاعدة السلسلة، dy/dF = (dy/dC) * (1/1.8). إضافة ثابت 32 تزيح الخط رأسياً دون تغيير انحداره، بينما ضرب x في 1.8 يوسع الامتداد الأفقي مما يقسم الميل على 1.8."
              }
            },
            {
              "text": {
                "en": "The slope increases by 32 units (m_F = m_C + 32) because the baseline temperature is shifted upward.",
                "ar": "يزداد الميل بمقدار 32 وحدة (m_F = m_C + 32) بسبب إزاحة نقطة البداية للأعلى.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The +32 term changes the y-intercept (baseline), not the rate of change Delta y / Delta x.",
                "ar": "الحد +32 يغير المقطع الصادي (نقطة التقاطع)، ولا يغير معدل التغير دلتا y على دلتا x."
              }
            },
            {
              "text": {
                "en": "The slope is multiplied by 1.8 (m_F = 1.8 * m_C) because Fahrenheit numbers are larger.",
                "ar": "يُضرب الميل في 1.8 (m_F = 1.8"
              },
              "correct": false,
              "explanation": {
                "en": "Multiplying the denominator Delta x by 1.8 reduces the overall fraction by 1/1.8.",
                "ar": "ضرب المقام دلتا x في 1.8 يجعل الكسر الإجمالي ينخفض بمقدار 1/1.8."
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
    "titleAr": "المتجهات كقطع موجهة وإزاحات مكانية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "A vector is not just a column of static numbers sitting inside software memory. Physically, a vector is a displacement arrow: a command...",
      "ar": "المتجه ليس مجرد عمود من الأرقام الجامدة في ذاكرة الحاسوب. بالمعنى الفيزيائي، المتجه هو سهم إزاحة: تعليمة حركية تأمرك بـ 'التحرك 3 وحدات..."
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
          "en": "A vector is not just a column of static numbers sitting inside software memory. Physically, a vector is a displacement arrow: a command that says 'travel 3 units east and 4 units north'. The arrow possesses both a magnitude (how far you travel) and a direction (where you point). It does not care where it begins; whether you start at your house or in another town, the instruction 'walk 3 east, 4 north' is the exact same vector.\n\nWhen you combine two trips—first displacement $\\mathbf{u}$, immediately followed by displacement $\\mathbf{v}$—you place the tail of the second arrow at the tip of the first arrow. This is the intuitive tip-to-tail rule of vector addition. Because motion in orthogonal directions is independent, the total east-west displacement is simply $u_x + v_x$, and the total north-south displacement is $u_y + v_y$.\n\nMultiplying a vector by a scalar $\\alpha$ acts like an elastic band: setting $\\alpha = 2$ doubles the length of your journey along the same trajectory. Setting $\\alpha = -1$ flips the arrow 180 degrees backwards, retracing your footsteps in the reverse direction. From computer graphics physics engines to multi-layer neural networks, every modern computational system is constructed by chaining and scaling these basic geometric displacements.",
          "ar": "المتجه ليس مجرد عمود من الأرقام الجامدة في ذاكرة الحاسوب. بالمعنى الفيزيائي، المتجه هو سهم إزاحة: تعليمة حركية تأمرك بـ 'التحرك 3 وحدات شرقاً و4 وحدات شمالاً'. يمتلك المتجه مقداراً (المسافة المقطوعة) واتجاهاً (جهة الحركة). وهو لا يكترث بنقطة بدايته؛ فسواء انطلقت من منزلك أو من مدينة أخرى، فإن تعليمة 'امشِ 3 شرقاً و4 شمالاً' تظل هي نفس المتجه تماماً.\n\nعندما تجمع بين رحلتين متعاقبتين—إزاحة أولى يمثلها $\\mathbf{u}$ تليها مباشرة إزاحة ثانية يمثلها $\\mathbf{v}$—فإنك تضع ذيل السهم الثاني عند رأس السهم الأول (قاعدة الرأس بالذيل Tip-to-Tail). ولأن الحركة في الاتجاهات المتعامدة مستقلة، فإن إجمالي الإزاحة الأفقية هو ببساطة $u_x + v_x$، وإجمالي الإزاحة الرأسية هو $u_y + v_y$.\n\nضرب المتجه في عدد قياسي $\\alpha$ يشبه شد شريط مطاطي: جعل $\\alpha = 2$ يضاعف مسافة رحلتك على نفس المسار تماماً، بينما جعل $\\alpha = -1$ يعكس اتجاه السهم 180 درجة إلى الخلف لتعود في الاتجاه المعاكس. من محركات ألعاب الفيديو والرسوم ثلاثية الأبعاد إلى شبكات التعلم العميق، تُبنى كافة الأنظمة الحوسبية الحديثة عبر تركيب وشد هذه الأسهم الهندسية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{w} = \\alpha \\mathbf{u} + \\beta \\mathbf{v} = \\begin{bmatrix} \\alpha u_1 + \\beta v_1 \\\\ \\vdots \\\\ \\alpha u_n + \\beta v_n \\end{bmatrix}, \\quad \\|\\mathbf{v}\\|_2 = \\sqrt{\\sum_{i=1}^n v_i^2}",
        "formulaNote": {
          "en": "Linear combination and L2 norm of spatial displacement vectors.",
          "ar": "التركيب الخطي ومعيار L2 لمتجهات الإزاحة المكانية."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n: Spatial displacement vectors residing in an $n$-dimensional vector space.\n- \\alpha, \\beta \\in \\mathbb{R}: Scalar scaling coefficients that stretch, shrink, or reverse the directions of vectors.\n- \\mathbf{w} = \\alpha \\mathbf{u} + \\beta \\mathbf{v}: The resulting linear combination vector formed by scaling and tip-to-tail addition.\n- \\begin{bmatrix} \\alpha u_i + \\beta v_i \\end{bmatrix}: Component-wise arithmetic showing that vector operations act independently across each coordinate axis.\n- \\|\\mathbf{v}\\|_2: The Euclidean magnitude (length) of the vector, computed as the square root of the sum of squared components.",
          "ar": "- \\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n: متجها إزاحة مكانية يقعان في فضاء متجهي ذي $n$ بعداً.\n- \\alpha, \\beta \\in \\mathbb{R}: معاملات قياسية عددية تقوم بشد المتجهات أو تقليصها أو عكس اتجاهاتها.\n- \\mathbf{w} = \\alpha \\mathbf{u} + \\beta \\mathbf{v}: المتجه الناتج عن التركيب الخطي بعد التحجيم والجمع المتتالي.\n- \\begin{bmatrix} \\alpha u_i + \\beta v_i \\end{bmatrix}: الحساب المستقل لكل مركبة، مما يثبت أن العمليات المتجهية تعمل بشكل مستقل على كل محور.\n- \\|\\mathbf{v}\\|_2: المقدار الإقليدي (طول المتجه)، المحسوب كالجذر التربيعي لمجموع مربعات المركبات."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-linear-algebra-vectors",
          "starterCode": "import numpy as np\n\ndef vector_linear_combination(u: np.ndarray, v: np.ndarray, alpha: float, beta: float) -> np.ndarray:\n    \"\"\"\n    Compute the linear combination w = alpha * u + beta * v.\n    \n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First displacement vector.\n    v : np.ndarray of shape (D,)\n        Second displacement vector.\n    alpha : float\n        Scalar multiplier for vector u.\n    beta : float\n        Scalar multiplier for vector v.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        The combined resultant vector.\n    \"\"\"\n    # Step 1: Scale displacement vector u by alpha\n    # scaled_u = ...\n    \n    # Step 2: Scale displacement vector v by beta\n    # scaled_v = ...\n    \n    # Step 3: Add the two scaled vectors element-wise\n    # return ...\n    pass",
          "testCases": [
            {
              "input": "vector_linear_combination(np.array([1.0, 2.0]), np.array([3.0, -1.0]), 2.0, 3.0)",
              "expected": "array([11.,  1.])"
            },
            {
              "input": "vector_linear_combination(np.array([2.0, 4.0]), np.array([1.0, 1.0]), 0.5, -1.0)",
              "expected": "array([0., 1.])"
            },
            {
              "input": "vector_linear_combination(np.array([0.0, 5.0]), np.array([1.0, 0.0]), 0.0, 4.0)",
              "expected": "array([4., 0.])"
            }
          ],
          "expectedOutput": "array([11.,  1.])",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef vector_linear_combination(u: np.ndarray, v: np.ndarray, alpha: float, beta: float) -> np.ndarray:\n    \"\"\"\n    Compute the linear combination w = alpha * u + beta * v.\n    \n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First displacement vector.\n    v : np.ndarray of shape (D,)\n        Second displacement vector.\n    alpha : float\n        Scalar multiplier for vector u.\n    beta : float\n        Scalar multiplier for vector v.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        The combined resultant vector.\n    \"\"\"\n    # Step 1: Scale displacement vector u by alpha\n    # scaled_u = ...\n    \n    # Step 2: Scale displacement vector v by beta\n    # scaled_v = ...\n    \n    # Step 3: Add the two scaled vectors element-wise\n    # return ...\n    pass",
              "expectedOutput": "array([11.,  1.])"
            }
          },
          "solution": "import numpy as np\n\ndef vector_linear_combination(u: np.ndarray, v: np.ndarray, alpha: float, beta: float) -> np.ndarray:\n    scaled_u = alpha * u\n    scaled_v = beta * v\n    return scaled_u + scaled_v"
        },
        "hints": {
          "tier1": {
            "en": "NumPy handles scalar multiplication directly: alpha * u scales every element of u.",
            "ar": "يتعامل نَمباي مع الضرب القياسي مباشرة: alpha * u يضرب كافة عناصر المتجه u."
          },
          "tier2": {
            "en": "Compute scaled_u = alpha * u and scaled_v = beta * v separately or in one line.",
            "ar": "احسب scaled_u = alpha * u و scaled_v = beta * v بشكل منفصل أو في سطر واحد."
          },
          "tier3": {
            "en": "Sum them directly: return alpha * u + beta * v.",
            "ar": "اجمعهما مباشرة: return alpha * u + beta * v."
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
            "en": "Imagine a drone flying in 2D space. It executes displacement vector u, followed immediately by displacement vector v. Under what geometric condition does the drone's net distance from its origin strictly equal the sum of the distances of the two individual legs (||u + v|| = ||u|| + ||v||)?",
            "ar": "تخيل طائرة درون تتحرك في فضاء ثنائي الأبعاد. قامت بإزاحة يمثلها المتجه u، تلتها مباشرة إزاحة أخرى يمثلها المتجه v. تحت أي شرط هندسي تكون المسافة الصافية للدرون عن نقطة الانطلاق مساوية تماماً لمجموع مسافتي المرحلتين المنفردتين (||u + v|| = ||u|| + ||v||)؟"
          },
          "options": [
            {
              "text": {
                "en": "When u and v are collinear and point in the exact same direction (angle theta = 0 degrees).",
                "ar": "عندما يكون المتجهان u و v على نفس خط الاستقامة ويشيران تماماً إلى نفس الاتجاه (الزاوية ثيتا = 0 درجة).\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "By the Triangle Inequality, ||u + v|| <= ||u|| + ||v||. Equality holds if and only if there is no bend in the path; any non-zero angle creates a shortcut hypotenuse strictly shorter than walking the legs.",
                "ar": "وفقاً لمتباينة المثلث، ||u + v|| <= ||u|| + ||v||. وتتحقق المساواة الصارمة فقط إذا لم يكن هناك أي انحناء في المسار؛ فوجود أي زاوية يصنع وتراً مختصراً أقصر قطعاً من مجموع الضلعين."
              }
            },
            {
              "text": {
                "en": "When u and v are strictly perpendicular (orthogonal, angle theta = 90 degrees).",
                "ar": "عندما يكون المتجهان متعامدين تماماً (الزاوية ثيتا = 90 درجة).\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "When orthogonal, ||u + v||^2 = ||u||^2 + ||v||^2 by Pythagoras, which means ||u + v|| is strictly less than ||u|| + ||v||.",
                "ar": "عند التعامد، ينطبق فيثاغورس ||u + v||^2 = ||u||^2 + ||v||^2، مما يعني أن طول المحصلة أقل قطعاً من المجموع الجبري لطولي المتجهين."
              }
            },
            {
              "text": {
                "en": "Whenever ||u|| = ||v||, regardless of the angle between them.",
                "ar": "كلما تساوى طولا المتجهين ||u|| = ||v|| بغض النظر عن الزاوية بينهما.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Equal lengths do not prevent angular cancellation. If u and v have equal lengths at 120 degrees, ||u + v|| = ||u||, not 2||u||.",
                "ar": "تساوي الأطوال لا يمنع الإلغاء الزاوي. إذا كان المتجهان متساويين وبينهما زاوية 120 درجة، فإن طول المحصلة يساوي طول أحدهما فقط وليس ضعفه."
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
    "titleAr": "التراكيب الخطية ومدى المتجهات والاستقلال الخطي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine piloting a spaceship with two thrusters. Thruster 1 pushes along vector $\\mathbf{v}1$, and Thruster 2 pushes along vector...",
      "ar": "تخيل أنك تقود مركبة فضائية مزودة بمحركين نفاثين. المحرك الأول يدفع المركبة باتجاه المتجه $\\mathbf{v}1$، والمحرك الثاني يدفعها باتجاه..."
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
          "en": "Imagine piloting a spaceship with two thrusters. Thruster 1 pushes along vector $\\mathbf{v}_1$, and Thruster 2 pushes along vector $\\mathbf{v}_2$. By adjusting your throttle knobs—choosing scalar numbers $c_1$ and $c_2$—what regions of space can you visit? The collection of every possible destination you can reach by turning those knobs is the span of those vectors.\n\nIf both thrusters point along the exact same straight line, you are tragically trapped in a 1D corridor: scaling them can only slide you back and forth along that single track. But if they point in different directions, you can reach every single point across a 2D sheet of space: their span is the entire plane $\\mathbb{R}^2$.\n\nNow suppose an engineer installs a third thruster $\\mathbf{v}_3$. If that third thruster also lies flat inside that same 2D plane, it gives you zero new directions to explore; you could already reach anything it points to by combining the first two. That third vector is linearly dependent—redundant. A set of vectors is linearly independent only when every single vector unlocks a genuinely new dimension that cannot be reached without it.",
          "ar": "تخيل أنك تقود مركبة فضائية مزودة بمحركين نفاثين. المحرك الأول يدفع المركبة باتجاه المتجه $\\mathbf{v}_1$، والمحرك الثاني يدفعها باتجاه $\\mathbf{v}_2$. بتعديل مقابض الوقود—أي باختيار المعاملات القياسية $c_1$ و $c_2$—ما هي المواقع التي يمكنك الوصول إليها؟ مجموعة كل نقطة ممكنة في الفضاء تستطيع بلوغها بضبط هذين المقبضين تُسمى 'مدى' (Span) هذين المتجهين.\n\nإذا كان المحركان يدفعان على نفس خط الاستقامة تماماً، فستكون عالقاً في مسار ضيق أحادي البعد: فمهما زدت أو أنقصت الوقود، لن تتحرك إلا للأمام أو للخلف على هذا الخط الوحيد. أما إذا كانا يشيران لاتجاهين مختلفين، فيمكنك استكشاف أي نقطة على سطح مستوى ثنائي الأبعاد بالكامل: مداهما يغطي المستوى $\\mathbb{R}^2$.\n\nافترض الآن أن مهندساً أضاف محركاً ثالثاً $\\mathbf{v}_3$. إذا كان هذا المحرك الثالث يقع بدوره على نفس السطح المستوي للمحركين السابقين، فلن يمنحك أي بعد جديد لاستكشافه؛ إذ كان بإمكانك بالفعل الوصول إلى أي مكان يشير إليه بمجرد مزج دفع المحركين الأولين. هذا المتجه الثالث هو متجه 'مرتبط خطياً'—أي فائض عن الحاجة. وتكون المتجهات 'مستقلة خطياً' فقط عندما يفتح كل متجه منها بعداً فضائياً جديداً لا يمكن لزملائه تعويضه."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\operatorname{span}(\\mathbf{v}_1, \\dots, \\mathbf{v}_k) = \\left\\{ \\sum_{i=1}^k c_i \\mathbf{v}_i \\;\\middle|\\; c_i \\in \\mathbb{R} \\right\\}, \\quad \\sum_{i=1}^k c_i \\mathbf{v}_i = \\mathbf{0} \\iff c_1 = \\dots = c_k = 0",
        "formulaNote": {
          "en": "The span as the subspace of all reachable linear combinations, and linear independence as non-redundancy.",
          "ar": "المدى كفضاء فرعي لكافة التراكيب الخطية الممكنة، والاستقلال الخطي كغياب التكرار والتكرار التراكمي."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\operatorname{span}(\\mathbf{v}_1, \\dots, \\mathbf{v}_k): The subspace consisting of all possible linear combinations that can be formed using vectors $\\mathbf{v}_1, \\dots, \\mathbf{v}_k$.\n- c_i \\in \\mathbb{R}: Continuous scalar weights acting as control knobs on each directional vector.\n- \\sum_{i=1}^k c_i \\mathbf{v}_i: A linear combination (weighted mixture) of vectors.\n- \\sum_{i=1}^k c_i \\mathbf{v}_i = \\mathbf{0}: The zero-combination test for linear independence.\n- c_1 = \\dots = c_k = 0: The independence condition; if this is the ONLY solution to reaching zero, no vector is a redundant combination of the others.",
          "ar": "- \\operatorname{span}(\\mathbf{v}_1, \\dots, \\mathbf{v}_k): الفضاء الجزئي المتولد من كافة التراكيب الخطية الممكنة للمتجهات المعطاة.\n- c_i \\in \\mathbb{R}: معاملات قياسية عددية مستمرة تعمل كمقابض تحكم في مقدار كل متجه اتجاهي.\n- \\sum_{i=1}^k c_i \\mathbf{v}_i: التركيب الخطي (المزيج الموزون) للمتجهات.\n- \\sum_{i=1}^k c_i \\mathbf{v}_i = \\mathbf{0}: معادلة التحقق من الاستقلال الخطي عبر محاولة الوصول إلى متجه الصفر.\n- c_1 = \\dots = c_k = 0: شرط الاستقلال الصارم؛ إذا كان الحل الصفري هو السبيل الوحيد لانعدام التركيب، فلا يوجد أي متجه زائد أو مكرر."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-linear-combinations-span",
          "starterCode": "import numpy as np\n\ndef check_linear_independence_2d(v1: np.ndarray, v2: np.ndarray, tol: float = 1e-9) -> bool:\n    \"\"\"\n    Check whether two 2D vectors are linearly independent.\n    \n    Parameters\n    ----------\n    v1 : np.ndarray of shape (2,)\n        First vector.\n    v2 : np.ndarray of shape (2,)\n        Second vector.\n    tol : float\n        Numerical tolerance threshold for zero determinant.\n        \n    Returns\n    -------\n    bool\n        True if the vectors span a 2D plane (linearly independent),\n        False if they are collinear (linearly dependent).\n    \"\"\"\n    # Step 1: Stack vectors as columns into a 2x2 matrix\n    # A = ...\n    \n    # Step 2: Compute the 2D determinant (ad - bc)\n    # det = ...\n    \n    # Step 3: Return True if absolute determinant exceeds tolerance\n    # return ...\n    pass",
          "testCases": [
            {
              "input": "check_linear_independence_2d(np.array([1.0, 0.0]), np.array([0.0, 1.0]))",
              "expected": "True"
            },
            {
              "input": "check_linear_independence_2d(np.array([2.0, 4.0]), np.array([1.0, 2.0]))",
              "expected": "False"
            },
            {
              "input": "check_linear_independence_2d(np.array([1.0, 3.0]), np.array([2.0, 5.0]))",
              "expected": "True"
            }
          ],
          "expectedOutput": "True",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef check_linear_independence_2d(v1: np.ndarray, v2: np.ndarray, tol: float = 1e-9) -> bool:\n    \"\"\"\n    Check whether two 2D vectors are linearly independent.\n    \n    Parameters\n    ----------\n    v1 : np.ndarray of shape (2,)\n        First vector.\n    v2 : np.ndarray of shape (2,)\n        Second vector.\n    tol : float\n        Numerical tolerance threshold for zero determinant.\n        \n    Returns\n    -------\n    bool\n        True if the vectors span a 2D plane (linearly independent),\n        False if they are collinear (linearly dependent).\n    \"\"\"\n    # Step 1: Stack vectors as columns into a 2x2 matrix\n    # A = ...\n    \n    # Step 2: Compute the 2D determinant (ad - bc)\n    # det = ...\n    \n    # Step 3: Return True if absolute determinant exceeds tolerance\n    # return ...\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef check_linear_independence_2d(v1: np.ndarray, v2: np.ndarray, tol: float = 1e-9) -> bool:\n    det = float(v1[0] * v2[1] - v1[1] * v2[0])\n    return abs(det) > tol"
        },
        "hints": {
          "tier1": {
            "en": "Two 2D vectors are independent if the area of the parallelogram they span (the determinant) is non-zero.",
            "ar": "يكون متجهان ثنائيا الأبعاد مستقلين إذا كانت مساحة متوازي الأضلاع الذي يشكلانه (المحدد) غير صفرية."
          },
          "tier2": {
            "en": "Compute det = v1[0] * v2[1] - v1[1] * v2[0] directly without matrix overhead.",
            "ar": "احسب المحدد مباشرة عبر det = v1[0] * v2[1] - v1[1] * v2[0]."
          },
          "tier3": {
            "en": "Compare abs(det) > tol: return abs(det) > tol.",
            "ar": "قارن القيمة المطلقة مع حد التسامح: return abs(det) > tol."
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
            "en": "A quantitative analyst prepares a credit-risk model using 3 features: Monthly Salary x1, Annual Salary x2 = 12 * x1, and Years of Experience x3. What is the geometric dimension of the feature subspace spanned by the columns of this dataset?",
            "ar": "يُعد باحث بيانات نموذجاً لمخاطر الائتمان بثلاثة متغيرات: الراتب الشهري x1، والراتب السنوي x2 = 12 * x1، وسنوات الخبرة x3. ما هو البعد الهندسي للفضاء الفرعي الذي تولده أعمدة هذه البيانات؟"
          },
          "options": [
            {
              "text": {
                "en": "At most 2 dimensions, because Annual Salary is a strict collinear scalar multiple of Monthly Salary, introducing zero new independent spanning directions.",
                "ar": "بُعدان على الأكثر، لأن الراتب السنوي مضاعف قياسي مباشر للراتب الشهري، وبالتالي لا يضيف أي اتجاه مستقل جديد لتوليد الفضاء.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Because x2 = 12 * x1, the column vector x2 lies entirely inside span(x1). The subspace spanned by {x1, x2, x3} is identical to span(x1, x3), which has dimension at most 2. This exact redundancy causes perfect multicollinearity in linear models.",
                "ar": "نظراً لأن x2 = 12 * x1، فإن متجه العمود x2 يقع بالكامل داخل مدى x1. الفضاء الذي تولده الأعمدة الثلاثة يطابق تماماً الفضاء المتولد من {x1, x3}، وبعده 2 كحد أقصى، وهو ما يسبب التعدد الخطي التام في الانحدار."
              }
            },
            {
              "text": {
                "en": "Exactly 3 dimensions, because there are 3 distinct physical columns stored in the database matrix.",
                "ar": "3 أبعاد تماماً، لوجود 3 أعمدة فيزيائية مميزة مخزنة في قاعدة البيانات.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Dimension depends on linear independence, not on the raw number of columns. Storing a duplicate column does not unlock a new geometric dimension.",
                "ar": "البعد الهندسي يحدده الاستقلال الخطي لا عدد الأعمدة المجرد؛ فتكرار عمود لا يخلق بعداً فضائياً جديداً."
              }
            },
            {
              "text": {
                "en": "1 dimension, because all economic data in a financial profile correlate with income.",
                "ar": "بعد واحد، لأن كافة البيانات الاقتصادية ترتبط طردياً بالدخل.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Years of experience is not an exact scalar multiple of salary; it provides a second genuinely independent spanning direction.",
                "ar": "سنوات الخبرة ليست مضاعفاً قياسياً مطابقاً للراتب، بل توفر اتجاهاً مستقلاً ثانياً حقيقياً."
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
    "titleAr": "الجداء النقطي وثنائية الإسقاط الهندسي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine the sun hanging high in the sky, casting the shadow of an angled tree onto the ground.",
      "ar": "تخيل شمس الظهيرة تسقط أشعتها على شجرة مائلة، فترسم ظلها على الأرض المستوية. طول هذا الظل لا يعتمد على طول الشجرة فحسب، بل على زاوية ميلانها..."
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
          "en": "Imagine the sun hanging high in the sky, casting the shadow of an angled tree onto the ground. The length of that shadow depends both on how tall the tree is and on the angle of the sunlight. The dot product is the algebraic embodiment of this shadow: it takes two vectors, projects one onto the line of the other, and multiplies the projected shadow length by the length of the base vector.\n\nIn physics, when you pull a sled with a rope angled at $\\theta$, your full force does not propel the sled forward. Only the horizontal shadow of your pull does work ($W = \\mathbf{F} \\cdot \\mathbf{d}$). If you pull directly forward ($\\theta = 0^\\circ$), $\\cos 0^\\circ = 1$ and all your effort is translated into motion. If you pull straight up toward the sky ($\\theta = 90^\\circ$), $\\cos 90^\\circ = 0$: your forward work is strictly zero, no matter how hard you strain.\n\nIn modern AI and vector databases, embeddings represent concepts as high-dimensional vectors. When ChatGPT or a search engine searches for relevant documents, it calculates the dot product (cosine similarity) between query vectors and document vectors. A positive dot product means the ideas align; a zero dot product means they are conceptually orthogonal (unrelated); a negative dot product means they point in diametrically opposite semantic directions.",
          "ar": "تخيل شمس الظهيرة تسقط أشعتها على شجرة مائلة، فترسم ظلها على الأرض المستوية. طول هذا الظل لا يعتمد على طول الشجرة فحسب، بل على زاوية ميلانها أيضاً. الجداء النقطي (Dot Product) هو التجسيد الرياضي الدقيق لظاهرة الظل هذه: فهو يأخذ متجهين، ويسقط أحدهما عمودياً على امتداد الآخر، ثم يضرب طول هذا الظل المسقط في طول المتجه الأساسي.\n\nفي الفيزياء، عندما تسحب زلاجة بحبل مائل بزاوية $\\theta$، فإن كامل قوة عضلاتك لا تدفع الزلاجة للأمام؛ فالمركبة الأفقية وحدها (ظل القوة على الأرض) هي التي تنجز الشغل الميكانيكي ($W = \\mathbf{F} \\cdot \\mathbf{d}$). إذا سحبت أفقياً تماماً ($\\theta = 0^\\circ$)، فإن $\\cos 0^\\circ = 1$ وتتحول كامل طاقتك إلى حركة. أما إذا سحبت رأسياً نحو السماء بزاوية قائمة ($\\theta = 90^\\circ$)، فإن $\\cos 90^\\circ = 0$، ويكون شغلك المنجز في دفع الزلاجة صفراً مطلقاً مهما بذلت من جهد.\n\nفي الذكاء الاصطناعي الحديث وقواعد البيانات الشعاعية، تُمثَّل المعاني والمفاهيم كمتجهات في فضاءات عالية الأبعاد (Embeddings). عندما يبحث نموذج لغوي مثل ChatGPT عن إجابة لسؤالك، فإنه يحسب الجداء النقطي (تشابه جيب التمام) بين متجه السؤال ومتجهات النصوص. الناتج الموجب يعني تقارب المفاهيم وتوافقها، والناتج الصفري يعني تعامدها وانعدام العلاقة بينها، والناتج السالب يعني تنافرها وتعاكس معانيها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{u}^T \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2 \\cos \\theta, \\quad \\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2}",
        "formulaNote": {
          "en": "The algebraic inner product equates to the projected shadow length scaled by magnitude, measuring angular alignment.",
          "ar": "الجداء الداخلي الجبري يطابق هندسياً طول الظل المسقط مضروباً في المقدار، كاشفاً عن التوافق الزاوي."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\mathbf{u} \\cdot \\mathbf{v}: The algebraic dot product, mapping two $n$-dimensional vectors to a single scalar value.\n- \\mathbf{u}^T \\mathbf{v}: Matrix multiplication notation: a $1 \\times n$ row vector multiplied by an $n \\times 1$ column vector.\n- \\sum_{i=1}^n u_i v_i: The coordinate definition: sum of products of corresponding coordinate components.\n- \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2: The product of Euclidean lengths of the two vectors.\n- \\cos\\theta: The cosine of the interior angle between the vectors, bounded strictly within $[-1, 1]$.\n- \\theta = 90^\\circ \\implies \\mathbf{u} \\cdot \\mathbf{v} = 0: The fundamental geometric test for orthogonality (perpendicularity).",
          "ar": "- \\mathbf{u} \\cdot \\mathbf{v}: الجداء النقطي الجبري، الذي يحول متجهين متعددي الأبعاد إلى قيمة قياسية عددية واحدة.\n- \\mathbf{u}^T \\mathbf{v}: صياغة ضرب المصفوفات: متجه صف $1 \\times n$ مضروب في متجه عمود $n \\times 1$.\n- \\sum_{i=1}^n u_i v_i: التعريف الإحداثي: مجموع حواضل ضرب المركبات الإحداثية المتناظرة.\n- \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2: حاصل ضرب الطولين الإقليديين للمتجهين.\n- \\cos\\theta: جيب تمام الزاوية المحصورة بين المتجهين، والمحصور بدقة في المجال $[-1, 1]$.\n- \\theta = 90^\\circ \\implies \\mathbf{u} \\cdot \\mathbf{v} = 0: الاختبار الهندسي الجوهري للتعامد التام."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-dot-product-geometry",
          "starterCode": "import numpy as np\n\ndef cosine_similarity(u: np.ndarray, v: np.ndarray, eps: float = 1e-12) -> float:\n    \"\"\"\n    Compute cosine similarity cos(theta) = (u . v) / (||u|| * ||v||).\n    \n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First vector.\n    v : np.ndarray of shape (D,)\n        Second vector.\n    eps : float\n        Numerical guard to prevent division by zero.\n        \n    Returns\n    -------\n    float\n        Cosine similarity bounded in [-1.0, 1.0].\n    \"\"\"\n    # Step 1: Compute the dot product between u and v\n    # dot_product = ...\n    \n    # Step 2: Compute L2 norms of both vectors\n    # norm_u = ...\n    # norm_v = ...\n    \n    # Step 3: Divide dot product by product of norms with eps guard\n    # return ...\n    pass",
          "testCases": [
            {
              "input": "cosine_similarity(np.array([1.0, 0.0]), np.array([0.0, 1.0]))",
              "expected": "0.0"
            },
            {
              "input": "cosine_similarity(np.array([2.0, 2.0]), np.array([5.0, 5.0]))",
              "expected": "1.0"
            },
            {
              "input": "cosine_similarity(np.array([1.0, 0.0]), np.array([-3.0, 0.0]))",
              "expected": "-1.0"
            }
          ],
          "expectedOutput": "0.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef cosine_similarity(u: np.ndarray, v: np.ndarray, eps: float = 1e-12) -> float:\n    \"\"\"\n    Compute cosine similarity cos(theta) = (u . v) / (||u|| * ||v||).\n    \n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First vector.\n    v : np.ndarray of shape (D,)\n        Second vector.\n    eps : float\n        Numerical guard to prevent division by zero.\n        \n    Returns\n    -------\n    float\n        Cosine similarity bounded in [-1.0, 1.0].\n    \"\"\"\n    # Step 1: Compute the dot product between u and v\n    # dot_product = ...\n    \n    # Step 2: Compute L2 norms of both vectors\n    # norm_u = ...\n    # norm_v = ...\n    \n    # Step 3: Divide dot product by product of norms with eps guard\n    # return ...\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef cosine_similarity(u: np.ndarray, v: np.ndarray, eps: float = 1e-12) -> float:\n    dot_product = float(np.dot(u, v))\n    norm_u = float(np.linalg.norm(u))\n    norm_v = float(np.linalg.norm(v))\n    denom = max(norm_u * norm_v, eps)\n    return float(np.clip(dot_product / denom, -1.0, 1.0))"
        },
        "hints": {
          "tier1": {
            "en": "Use np.dot(u, v) for the numerator and np.linalg.norm() for lengths.",
            "ar": "استخدم np.dot(u, v) للبسط و np.linalg.norm() لحساب الأطوال."
          },
          "tier2": {
            "en": "Compute denom = max(norm_u * norm_v, eps) to ensure safe floating-point division.",
            "ar": "احسب المقام بـ max(norm_u * norm_v, eps) لضمان قسمة عددية آمنة دون أخطاء."
          },
          "tier3": {
            "en": "Clip the result to [-1.0, 1.0] to prevent floating point drift: float(np.clip(dot / denom, -1.0, 1.0)).",
            "ar": "قم بقص الناتج في النطاق [-1.0, 1.0] لتفادي انحرافات الفاصلة العائمة."
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
            "en": "Two document embedding vectors u and v have been normalized such that ||u|| = 1 and ||v|| = 1. If their dot product u . v = -1.0, what does this signify about their semantic meaning and geometric orientation?",
            "ar": "تم توحيد متجّهي تضمين لنصين بحيث ||u|| = 1 و ||v|| = 1. إذا كان جداؤهما النقطي u . v = -1.0، فماذا يعني ذلك دلالياً وهندسياً؟"
          },
          "options": [
            {
              "text": {
                "en": "The vectors point in diametrically opposite directions (theta = 180 degrees), representing completely antithetical semantic concepts.",
                "ar": "يشير المتجهان إلى اتجاهين متعاكسين تماماً (الزاوية 180 درجة)، مما يمثل مفهومين متضادين دلالياً بأقصى درجة ممكنة.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Because cos(180°) = -1, the dot product of unit vectors reaches its minimal possible lower bound when vectors are anti-parallel. In contrast, unrelated independent concepts yield a dot product of 0 (orthogonal).",
                "ar": "لأن جيب تمام 180 درجة هو -1، فإن الجداء النقطي لمتجهات الوحدة يبلغ حده الأدنى المطلق عند التعاكس التام. في حين أن المفاهيم المستقلة غير المترابطة تعطي جداءً نقطياً صفرياً (متعامدة)."
              }
            },
            {
              "text": {
                "en": "The documents share zero vocabulary words and have no connection to each other.",
                "ar": "النصان لا يشتركان في أي كلمات ولا تربطهما أي علاقة إطلاقاً.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Having zero semantic connection corresponds to orthogonality (dot product = 0), not -1.",
                "ar": "انعدام العلاقة يمثله التعامد الهندسي (الجداء النقطي = 0)، وليس القيمة السالبة -1."
              }
            },
            {
              "text": {
                "en": "The embeddings are corrupt because dot products of normalized vectors can never be negative.",
                "ar": "المتجهات تالفة لأن الجداء النقطي لمتجهات الوحدة لا يمكن أن يكون سالباً.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The cosine function spans [-1, 1]; negative dot products are completely valid and indicate obtuse angles (theta > 90 degrees).",
                "ar": "دالة جيب التمام تمتد بين [-1, 1]؛ والقيم السالبة صالحة رياضياً تماماً وتدل على زوايا منفرجة أكبر من 90 درجة."
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
    "titleAr": "الجداء الاتجاهي والتعامد والمساحة الموجهة",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine turning a tight bolt using a long metal wrench. You push on the wrench handle along vector $\\mathbf{r}$, applying muscular force...",
      "ar": "تخيل أنك تفك برغياً معدنياً صلباً باستخدام مفتاح ربط طويل. ذراع المفتاح يمثل متجهاً $\\mathbf{r}$، وقوة دفع يدك تمثل متجهاً $\\mathbf{F}$."
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
          "en": "Imagine turning a tight bolt using a long metal wrench. You push on the wrench handle along vector $\\mathbf{r}$, applying muscular force along vector $\\mathbf{F}$. What happens to the bolt? It does not move along the handle, nor does it move along the direction of your push. It twists into or out of the wooden surface, moving along an axis perpendicular to both!\n\nThis rotational twisting force is torque ($\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F}$). The cross product takes two vectors in 3D space and generates a completely new third vector that stands at a strict 90-degree angle to both of them. Its direction is governed by the universal Right-Hand Rule: sweep your right fingers from $\\mathbf{u}$ into $\\mathbf{v}$, and your thumb points toward $\\mathbf{u} \\times \\mathbf{v}$.\n\nThe length of this new vector is not arbitrary: it precisely equals the geometric area of the parallelogram formed by the two input vectors ($\\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta$). If the vectors are parallel ($\\theta = 0^\\circ$), the parallelogram collapses to a line with zero area, and the cross product vanishes completely. Because swapping the order flips your thumb to point the opposite way, the cross product is anti-commutative: $\\mathbf{u} \\times \\mathbf{v} = -(\\mathbf{v} \\times \\mathbf{u})$.",
          "ar": "تخيل أنك تفك برغياً معدنياً صلباً باستخدام مفتاح ربط طويل. ذراع المفتاح يمثل متجهاً $\\mathbf{r}$، وقوة دفع يدك تمثل متجهاً $\\mathbf{F}$. كيف يتحرك البرغي؟ إنه لا يتحرك بمحاذاة ذراع المفتاح، ولا يندفع في اتجاه دفع يدك المباشر، بل يدور ويدخل في الجدار أو يخرج منه على طول محور عمودي تماماً على كليهما!\n\nقوة الدوران هذه هي عزم الدوران ($\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F}$). الجداء الاتجاهي (Cross Product) يأخذ متجهين في الفضاء ثلاثي الأبعاد وينشئ متجهاً ثالثاً جديداً يقف بزاوية قائمة صارمة (90 درجة) على كل من المتجهين الأصليين. يُحدد اتجاه هذا المتجه الجديد بواسطة 'قاعدة اليد اليمنى': إذا لففت أصابع يدك اليمنى من $\\mathbf{u}$ إلى $\\mathbf{v}$، فإن إبهامك يشير حتماً نحو $\\mathbf{u} \\times \\mathbf{v}$.\n\nطول هذا المتجه الجديد ليس رقماً عشوائياً: إنه يساوي بالضبط المساحة الهندسية لمتوازي الأضلاع الذي يشكله المتجهان ($\\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta$). إذا كان المتجهان متوازيين تماماً ($\\theta = 0^\\circ$)، ينكمش متوازي الأضلاع إلى خط تنعدم مساحته، فينعدم الجداء الاتجاهي تماماً. ولأن عكس ترتيب الضرب يقلب إبهامك في الاتجاه المعاكس، فإن الجداء الاتجاهي 'تبادلي عكسي': $\\mathbf{u} \\times \\mathbf{v} = -(\\mathbf{v} \\times \\mathbf{u})$."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{u} \\times \\mathbf{v} = \\begin{bmatrix} u_2 v_3 - u_3 v_2 \\\\ u_3 v_1 - u_1 v_3 \\\\ u_1 v_2 - u_2 v_1 \\end{bmatrix} = \\det\\begin{bmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{bmatrix}, \\quad \\|\\mathbf{u} \\times \\mathbf{v}\\|_2 = \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2 \\sin\\theta",
        "formulaNote": {
          "en": "The cross product constructs a mutually orthogonal normal vector whose magnitude equals the oriented area of the spanned parallelogram.",
          "ar": "يبني الجداء الاتجاهي متجهاً عمودياً مشتركاً يساوي مقداره مساحة متوازي الأضلاع الموجهة."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\mathbf{u} \\times \\mathbf{v}: The cross product operator, existing natively as a vector-producing binary operation in 3D space.\n- \\mathbf{i}, \\mathbf{j}, \\mathbf{k}: Standard orthonormal basis unit vectors along the $x, y, z$ axes.\n- \\det[\\dots]: The symbolic 3x3 determinant device used as an algebraic mnemonic to compute the alternating signed orthogonal components.\n- \\|\\mathbf{u} \\times \\mathbf{v}\\|_2: The magnitude of the cross product, exactly equal to the planar area of the parallelogram spanned by $\\mathbf{u}$ and $\\mathbf{v}$.\n- \\sin\\theta: The sine of the interior angle; reaches maximum (1) at perpendicularity ($90^\\circ$) and zero at collinearity ($0^\\circ, 180^\\circ$).\n- \\mathbf{u} \\times \\mathbf{v} = -(\\mathbf{v} \\times \\mathbf{u}): Anti-symmetry, reflecting the physical orientation (handedness) of space.",
          "ar": "- \\mathbf{u} \\times \\mathbf{v}: مؤثر الجداء الاتجاهي، الذي يعمل أصالة في الفضاء ثلاثي الأبعاد لينتج متجهاً جديداً.\n- \\mathbf{i}, \\mathbf{j}, \\mathbf{k}: متجهات الوحدة المعيارية المتعامدة على المحاور $x, y, z$.\n- \\det[\\dots]: محدد المصفوفة الرمزية $3 \\times 3$ المستخدم كأداة جبرية لاشتقاق المركبات المتعامدة متناوبة الإشارة.\n- \\|\\mathbf{u} \\times \\mathbf{v}\\|_2: مقدار الجداء الاتجاهي، ويطابق تماماً المساحة المستوية لمتوازي الأضلاع المتولد من المتجهين.\n- \\sin\\theta: جيب الزاوية المحصورة؛ يبلغ ذروته (1) عند التعامد التام ($90^\\circ$) وينعدم عند التوازي ($0^\\circ, 180^\\circ$).\n- \\mathbf{u} \\times \\mathbf{v} = -(\\mathbf{v} \\times \\mathbf{u}): خاصية التناظر العكسي، المعبرة عن اتجاهية الفضاء (قاعدة اليد اليمنى)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-cross-product-orthogonality",
          "starterCode": "import numpy as np\n\ndef cross_product_3d(u: np.ndarray, v: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute the 3D cross product u x v.\n    \n    Parameters\n    ----------\n    u : np.ndarray of shape (3,)\n        First 3D vector.\n    v : np.ndarray of shape (3,)\n        Second 3D vector.\n        \n    Returns\n    -------\n    np.ndarray of shape (3,)\n        Orthogonal vector perpendicular to both u and v.\n    \"\"\"\n    # Step 1: Compute x component: u_y * v_z - u_z * v_y\n    # cx = ...\n    \n    # Step 2: Compute y component: u_z * v_x - u_x * v_z\n    # cy = ...\n    \n    # Step 3: Compute z component: u_x * v_y - u_y * v_x\n    # cz = ...\n    # return np.array([cx, cy, cz], dtype=float)\n    pass",
          "testCases": [
            {
              "input": "cross_product_3d(np.array([1.0, 0.0, 0.0]), np.array([0.0, 1.0, 0.0]))",
              "expected": "array([0., 0., 1.])"
            },
            {
              "input": "cross_product_3d(np.array([0.0, 1.0, 0.0]), np.array([1.0, 0.0, 0.0]))",
              "expected": "array([ 0.,  0., -1.])"
            },
            {
              "input": "cross_product_3d(np.array([2.0, 0.0, 0.0]), np.array([5.0, 0.0, 0.0]))",
              "expected": "array([0., 0., 0.])"
            }
          ],
          "expectedOutput": "array([0., 0., 1.])",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef cross_product_3d(u: np.ndarray, v: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute the 3D cross product u x v.\n    \n    Parameters\n    ----------\n    u : np.ndarray of shape (3,)\n        First 3D vector.\n    v : np.ndarray of shape (3,)\n        Second 3D vector.\n        \n    Returns\n    -------\n    np.ndarray of shape (3,)\n        Orthogonal vector perpendicular to both u and v.\n    \"\"\"\n    # Step 1: Compute x component: u_y * v_z - u_z * v_y\n    # cx = ...\n    \n    # Step 2: Compute y component: u_z * v_x - u_x * v_z\n    # cy = ...\n    \n    # Step 3: Compute z component: u_x * v_y - u_y * v_x\n    # cz = ...\n    # return np.array([cx, cy, cz], dtype=float)\n    pass",
              "expectedOutput": "array([0., 0., 1.])"
            }
          },
          "solution": "import numpy as np\n\ndef cross_product_3d(u: np.ndarray, v: np.ndarray) -> np.ndarray:\n    cx = float(u[1] * v[2] - u[2] * v[1])\n    cy = float(u[2] * v[0] - u[0] * v[2])\n    cz = float(u[0] * v[1] - u[1] * v[0])\n    return np.array([cx, cy, cz], dtype=float)"
        },
        "hints": {
          "tier1": {
            "en": "Implement the determinant formula: cx = u[1]*v[2] - u[2]*v[1].",
            "ar": "طبق صيغة المحدد: cx = u[1]*v[2] - u[2]*v[1]."
          },
          "tier2": {
            "en": "Be careful with the sign of the y component: cy = u[2]*v[0] - u[0]*v[2].",
            "ar": "انتبه لإشارة المركبة الصادية: cy = u[2]*v[0] - u[0]*v[2]."
          },
          "tier3": {
            "en": "cz = u[0]*v[1] - u[1]*v[0]. Return as np.array([cx, cy, cz], dtype=float).",
            "ar": "cz = u[0]*v[1] - u[1]*v[0]. أرجع الناتج كمصفوفة نَمباي ثلاثية."
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
            "en": "Two non-zero vectors u and v in 3D computer graphics satisfy u x v = 0. What does this reveal about their spatial geometric configuration and the polygon area they define?",
            "ar": "متجهان غير صفريين u و v في الرسوم ثلاثية الأبعاد يحققان u x v = 0. ماذا يكشف ذلك عن وضعهما الهندسي في الفضاء وعن مساحة السطح الذي يحددانه؟"
          },
          "options": [
            {
              "text": {
                "en": "The vectors are collinear (parallel or anti-parallel, theta = 0 or 180 degrees), meaning the parallelogram collapses into a 1D segment of zero area.",
                "ar": "المتجهان يقعان على نفس خط الاستقامة (متوازيان أو متعاكسان، ثيتا = 0 أو 180 درجة)، مما يعني انكماش متوازي الأضلاع إلى قطعة أحادية البعد تنعدم مساحتها.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Because ||u x v|| = ||u|| ||v|| sin(theta), the magnitude is zero if and only if sin(theta) = 0, which occurs precisely when vectors point along the same or exact opposite lines. A degenerate triangle with parallel sides has zero surface area.",
                "ar": "نظراً لأن ||u x v|| = ||u|| ||v|| sin(theta)، فإن المقدار ينعدم فقط عندما يكون sin(theta) = 0، وهو ما يحدث عند التوازي التام أو التعاكس. والمثلث أو متوازي الأضلاع المتطابق الأضلاع تنعدم مساحته السطحية تماماً."
              }
            },
            {
              "text": {
                "en": "The vectors are mutually perpendicular (orthogonal, theta = 90 degrees), casting zero shadow.",
                "ar": "المتجهان متعامدان تماماً (الزاوية 90 درجة)، ولا يلقي أحدهما أي ظل على الآخر.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Confuses cross product with dot product! When vectors are orthogonal, the cross product is maximal (sin 90° = 1), whereas the dot product is zero.",
                "ar": "خلط بين الجداء الاتجاهي والنقطي! عند التعامد يبلغ الجداء الاتجاهي ذروته العظمى (sin 90° = 1)، بينما ينعدم الجداء النقطي."
              }
            },
            {
              "text": {
                "en": "One of the vectors must be the zero vector [0, 0, 0].",
                "ar": "أحد المتجهين يجب أن يكون بالضرورة متجهاً صفرياً [0, 0, 0].\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The prompt explicitly specified non-zero vectors. Parallel non-zero vectors produce a zero cross product.",
                "ar": "السؤال نص صراحة على أنهما غير صفريين. المتجهات غير الصفرية المتوازية تنتج جداءً اتجاهياً صفرياً."
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
    "titleAr": "التحويلات الخطية كعمليات نقل وتحوير للفضاء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine drawing a coordinate grid on a flexible, transparent sheet of rubber. What kinds of warping can you do to this rubber while keeping...",
      "ar": "تخيل أنك رسمت شبكة إحداثيات منتظمة على غشاء شفاف من المطاط المرن. ما هي أنواع التشويه التي يمكنك إحداثها في هذا المطاط مع الحفاظ على كونه..."
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
          "en": "Imagine drawing a coordinate grid on a flexible, transparent sheet of rubber. What kinds of warping can you do to this rubber while keeping it 'linear'? Linear algebra imposes two strict physical rules: grid lines must remain straight and evenly spaced, and the origin $(0, 0)$ must never budge. You can stretch the sheet, rotate it, reflect it, or shear it sideways—but you cannot curve, bend, or tear it.\n\nThis geometric simplicity leads to the central miracle of linear transformations: to know where all infinite points on the plane end up, you do not need to track billions of coordinates. You only need to track where the two unit basis arrows land: $\\hat{\\mathbf{i}} = (1, 0)$ and $\\hat{\\mathbf{j}} = (0, 1)$.\n\nBecause every point $\\mathbf{x} = (x_1, x_2)$ is built from $x_1 \\hat{\\mathbf{i}} + x_2 \\hat{\\mathbf{j}}$, after the transformation it must land at $x_1 T(\\hat{\\mathbf{i}}) + x_2 T(\\hat{\\mathbf{j}})$. The landing coordinates of $\\hat{\\mathbf{i}}$ form the first column of a matrix $\\mathbf{A}$, and the landing coordinates of $\\hat{\\mathbf{j}}$ form the second column. A matrix is nothing more than a compact visual snapshot recording the transformed landing sites of your basis vectors.",
          "ar": "تخيل أنك رسمت شبكة إحداثيات منتظمة على غشاء شفاف من المطاط المرن. ما هي أنواع التشويه التي يمكنك إحداثها في هذا المطاط مع الحفاظ على كونه 'خطياً'؟ يفرض الجبر الخطي قاعدتين فيزيائيتين صارمتين: يجب أن تظل خطوط الشبكة مستقيمة ومتوازية ومنتظمة التباعد، ويجب ألا تتحرك نقطة الأصل $(0, 0)$ من مكانها أبداً. يمكنك شد الغشاء، أو تدويره، أو عكسه، أو إمالته جانبياً (Shear)—ولكن لا يمكنك ثنيه أو تجعيده أو تمزيقه.\n\nهذه البساطة الهندسية تقودنا إلى المعجزة الكبرى للتحويلات الخطية: لمعرفة مصير عدد لا نهائي من النقاط على المستوى، لست بحاجة إلى تتبع مليارات الإحداثيات؛ يكفيك فقط معرفة أين استقر سهما الوحدة الأساسيان: $\\hat{\\mathbf{i}} = (1, 0)$ و $\\hat{\\mathbf{j}} = (0, 1)$.\n\nولأن أي نقطة $\\mathbf{x} = (x_1, x_2)$ تتكون أصلاً من $x_1 \\hat{\\mathbf{i}} + x_2 \\hat{\\mathbf{j}}$، فإنها بعد التحويل ستستقر حتماً عند $x_1 T(\\hat{\\mathbf{i}}) + x_2 T(\\hat{\\mathbf{j}})$. إحداثيات استقرار السهم $\\hat{\\mathbf{i}}$ تشكل العمود الأول للمصفوفة $\\mathbf{A}$، وإحداثيات استقرار السهم $\\hat{\\mathbf{j}}$ تشكل العمود الثاني. المصفوفة ليست سوى بطاقة بريدية هندسية توثق أين هبطت متجهات الأساس."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "T(\\alpha \\mathbf{u} + \\beta \\mathbf{v}) = \\alpha T(\\mathbf{u}) + \\beta T(\\mathbf{v}), \\quad T(\\mathbf{x}) = \\mathbf{A}\\mathbf{x} = x_1 T(\\mathbf{e}_1) + x_2 T(\\mathbf{e}_2) = \\begin{bmatrix} | & | \\\\ T(\\mathbf{e}_1) & T(\\mathbf{e}_2) \\\\ | & | \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix}",
        "formulaNote": {
          "en": "Linearity preserves vector addition and scalar multiplication; the columns of matrix A are the landing sites of the standard basis vectors.",
          "ar": "يحافظ التحويل الخطي على جمع المتجهات والضرب القياسي؛ وأعمدة المصفوفة A هي مواقع استقرار متجهات الأساس المعياري."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- T(\\mathbf{x}): The linear transformation mapping input vector $\\mathbf{x} \\in \\mathbb{R}^n$ to output vector $T(\\mathbf{x}) \\in \\mathbb{R}^m$.\n- T(\\alpha \\mathbf{u} + \\beta \\mathbf{v}) = \\alpha T(\\mathbf{u}) + \\beta T(\\mathbf{v}): The axiom of linearity: additivity and homogeneity (scalar scaling) are preserved.\n- \\mathbf{e}_1, \\mathbf{e}_2: The canonical unit basis vectors, pointing along the un-transformed coordinate axes.\n- T(\\mathbf{e}_1), T(\\mathbf{e}_2): The transformed basis vectors; their coordinates become the literal columns of matrix $\\mathbf{A}$.\n- \\mathbf{A}\\mathbf{x}: Matrix-vector multiplication interpreted as a linear combination of the columns of $\\mathbf{A}$ weighted by the components of $\\mathbf{x}$.",
          "ar": "- T(\\mathbf{x}): التحويل الخطي الذي ينقل متجه المدخلات $\\mathbf{x} \\in \\mathbb{R}^n$ إلى متجه المخرجات $T(\\mathbf{x}) \\in \\mathbb{R}^m$.\n- T(\\alpha \\mathbf{u} + \\beta \\mathbf{v}) = \\alpha T(\\mathbf{u}) + \\beta T(\\mathbf{v}): بديهية الخطية: الحفاظ الصارم على الجمع والضرب القياسي.\n- \\mathbf{e}_1, \\mathbf{e}_2: متجهات الأساس المعياري لوحدة الفضاء، الممتدة على محاور الإحداثيات الأصلية.\n- T(\\mathbf{e}_1), T(\\mathbf{e}_2): متجهات الأساس بعد التحويل؛ وتتحول إحداثياتها مباشرة إلى أعمدة المصفوفة $\\mathbf{A}$.\n- \\mathbf{A}\\mathbf{x}: ضرب المصفوفة في المتجه مفسراً كتركيب خطي لأعمدة $\\mathbf{A}$ بأوزان هي مركبات المتجه $\\mathbf{x}$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-linear-maps-transformations",
          "starterCode": "import numpy as np\n\ndef apply_linear_transform(A: np.ndarray, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Apply linear transformation matrix A to vector x.\n    \n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Transformation matrix whose columns represent transformed basis vectors.\n    x : np.ndarray of shape (N,)\n        Input coordinate vector.\n        \n    Returns\n    -------\n    np.ndarray of shape (M,)\n        Transformed coordinate vector Ax.\n    \"\"\"\n    # Step 1: Check dimension compatibility (A.shape[1] == len(x))\n    # if A.shape[1] != len(x): raise ValueError(...)\n    \n    # Step 2: Compute linear combination of columns of A weighted by elements of x\n    # result = sum(x[j] * A[:, j]) or vectorized A @ x\n    \n    # Step 3: Return the transformed vector\n    # return ...\n    pass",
          "testCases": [
            {
              "input": "apply_linear_transform(np.array([[2.0, 0.0], [0.0, 3.0]]), np.array([1.0, 1.0]))",
              "expected": "array([2., 3.])"
            },
            {
              "input": "apply_linear_transform(np.array([[0.0, -1.0], [1.0, 0.0]]), np.array([1.0, 0.0]))",
              "expected": "array([0., 1.])"
            },
            {
              "input": "apply_linear_transform(np.array([[1.0, 1.0], [0.0, 1.0]]), np.array([2.0, 3.0]))",
              "expected": "array([5., 3.])"
            }
          ],
          "expectedOutput": "array([2., 3.])",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef apply_linear_transform(A: np.ndarray, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Apply linear transformation matrix A to vector x.\n    \n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Transformation matrix whose columns represent transformed basis vectors.\n    x : np.ndarray of shape (N,)\n        Input coordinate vector.\n        \n    Returns\n    -------\n    np.ndarray of shape (M,)\n        Transformed coordinate vector Ax.\n    \"\"\"\n    # Step 1: Check dimension compatibility (A.shape[1] == len(x))\n    # if A.shape[1] != len(x): raise ValueError(...)\n    \n    # Step 2: Compute linear combination of columns of A weighted by elements of x\n    # result = sum(x[j] * A[:, j]) or vectorized A @ x\n    \n    # Step 3: Return the transformed vector\n    # return ...\n    pass",
              "expectedOutput": "array([2., 3.])"
            }
          },
          "solution": "import numpy as np\n\ndef apply_linear_transform(A: np.ndarray, x: np.ndarray) -> np.ndarray:\n    if A.shape[1] != len(x):\n        raise ValueError(f\"Matrix columns {A.shape[1]} must match vector length {len(x)}.\")\n    return np.asarray(A @ x, dtype=float)"
        },
        "hints": {
          "tier1": {
            "en": "Verify A.shape[1] == len(x) before performing matrix multiplication.",
            "ar": "تحقق من تطابق أبعاد المصفوفة مع طول المتجه A.shape[1] == len(x)."
          },
          "tier2": {
            "en": "In NumPy, matrix-vector multiplication is performed via the @ operator: A @ x.",
            "ar": "في نَمباي، يُجرى ضرب المصفوفات في المتجهات باستخدام المعامل @: A @ x."
          },
          "tier3": {
            "en": "Return as float array: return np.asarray(A @ x, dtype=float).",
            "ar": "أرجع الناتج كمصفوفة أعداد حقيقية: return np.asarray(A @ x, dtype=float)."
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
            "en": "Which of the following spatial transformations on the 2D plane is strictly NOT a linear map?",
            "ar": "أي من التحويلات المكانية التالية على المستوى ثنائي الأبعاد يُعد قطعاً تحويلاً غير خطي؟"
          },
          "options": [
            {
              "text": {
                "en": "Translating the entire plane by a fixed non-zero vector b: T(x) = x + b.",
                "ar": "إزاحة المستوى بأكمله بمقدار متجه ثابت غير صفري b: أي T(x) = x + b.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "A fundamental invariant of any linear transformation is that it must fix the origin: T(0) = T(0 * x) = 0 * T(x) = 0. Translation moves the origin to b != 0 and violates additivity: T(u + v) = u + v + b != (u + b) + (v + b). Hence, spatial translation is an affine map, not a linear map.",
                "ar": "من الثوابت الأساسية لأي تحويل خطي بقاء نقطة الأصل ثابتة: T(0) = 0. الإزاحة المكانية تنقل نقطة الأصل إلى b != 0 وتخل بشرط الجمع: T(u + v) = u + v + b != (u + b) + (v + b). لذلك، الإزاحة هي تحويل تآلفي (Affine) وليست تحويلاً خطياً."
              }
            },
            {
              "text": {
                "en": "Rotating the plane by 45 degrees counterclockwise about the origin.",
                "ar": "تدوير المستوى بزاوية 45 درجة عكس عقارب الساعة حول نقطة الأصل.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Pure rotation about the origin keeps the origin fixed and preserves straight parallel grid lines; it is an orthogonal linear map.",
                "ar": "الدوران الصافي حول نقطة الأصل يبقي نقطة الأصل ثابتة ويحافظ على استقامة وتوازي خطوط الشبكة؛ وهو تحويل خطي متعامد."
              }
            },
            {
              "text": {
                "en": "Shearing the plane horizontally such that points higher up slide farther to the right: T(x, y) = (x + 2y, y).",
                "ar": "قص المستوى أفقياً (Shear) بحيث تنزلق النقاط الأعلى مسافة أكبر لليمين: T(x, y) = (x + 2y, y).\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Shearing keeps the origin fixed and preserves straight lines and parallelism; it is represented by matrix [[1, 2], [0, 1]], a valid linear map.",
                "ar": "تحويل القص يحافظ على ثبات نقطة الأصل واستقامة وتوازي الخطوط، وتمثله المصفوفة [[1, 2], [0, 1]] وهو تحويل خطي صحيح."
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
    "titleAr": "ضرب المصفوفات كتركيب متتالٍ للتحويلات",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Students are often taught matrix multiplication as a bizarre, tedious chore: take row 1, multiply by column 1, sum the numbers, and repeat...",
      "ar": "غالباً ما يتعلم الطلاب ضرب المصفوفات كعملية ميكانيكية غريبة ومملة: خذ الصف الأول واضربه في العمود الأول، واجمع النواتج، وكرر ذلك عشرات..."
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
          "en": "Students are often taught matrix multiplication as a bizarre, tedious chore: take row 1, multiply by column 1, sum the numbers, and repeat dozens of times. But why does this rule exist? What does it actually mean?\n\nMatrix multiplication is simply the composition of successive geometric transformations. If matrix $\\mathbf{A}$ performs a $90^\\circ$ counterclockwise rotation, and matrix $\\mathbf{B}$ stretches space horizontally by $2\\times$, applying $\\mathbf{A}$ and then $\\mathbf{B}$ to a vector $\\mathbf{x}$ is written $\\mathbf{B}(\\mathbf{A}\\mathbf{x})$. Multiplying the matrices $\\mathbf{C} = \\mathbf{B}\\mathbf{A}$ packages both consecutive physical actions into a single master transformation.\n\nThis geometric view immediately dissolves the mystery of why $\\mathbf{A}\\mathbf{B} \\ne \\mathbf{B}\\mathbf{A}$. If you rotate a book by $90^\\circ$ and then shear it horizontally, the result looks completely different than if you shear it first and then rotate it! The order in which you apply physical actions changes reality. Matrix multiplication is not commutative because the universe itself is not commutative.",
          "ar": "غالباً ما يتعلم الطلاب ضرب المصفوفات كعملية ميكانيكية غريبة ومملة: خذ الصف الأول واضربه في العمود الأول، واجمع النواتج، وكرر ذلك عشرات المرات. ولكن لماذا وُضعت هذه القاعدة بالتحديد؟ ما هو معناها الفيزيائي الحقيقي؟\n\nضرب المصفوفات ليس سوى تركيب متتالٍ لعمليات هندسية متعاقبة. إذا كانت المصفوفة $\\mathbf{A}$ تقوم بتدوير الفضاء بزاوية $90^\\circ$ عكس عقارب الساعة، والمصفوفة $\\mathbf{B}$ تقوم بمد الفضاء أفقياً بمقدار الضعف، فإن تطبيق $\\mathbf{A}$ متبوعة بـ $\\mathbf{B}$ على متجه $\\mathbf{x}$ يُكتب رياضياً $\\mathbf{B}(\\mathbf{A}\\mathbf{x})$. ضرب المصفوفتين $\\mathbf{C} = \\mathbf{B}\\mathbf{A}$ يدمج هذين التحويلين الحركيين في مصفوفة رئيسية موحدة تختصر الخطوتين معاً.\n\nهذه الرؤية الهندسية تبدد فوراً اللغز الشهير: لماذا لا يكون ضرب المصفوفات تبادلياً ($\\mathbf{A}\\mathbf{B} \\neq \\mathbf{B}\\mathbf{A}$)؟ إذا أخذت كتاباً ودورته بزاوية $90^\\circ$ ثم قمت بإمالة صفحاته جانبياً (قص)، فستحصل على شكل مختلف تماماً عما إذا قمت بقص الصفحات أولاً ثم تدوير الكتاب! ترتيب الأفعال الفيزيائية يغير النتيجة الواقعية. ضرب المصفوفات ليس تبادلياً لأن هندسة الكون نفسه غير تبادلية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "(\\mathbf{B}\\mathbf{A})\\mathbf{x} = \\mathbf{B}(\\mathbf{A}\\mathbf{x}), \\quad (\\mathbf{B}\\mathbf{A})_{ij} = \\sum_{k=1}^m B_{ik} A_{kj}",
        "formulaNote": {
          "en": "Matrix multiplication represents applying successive geometric transformations; non-commutativity arises because sequential physical actions do not commute.",
          "ar": "ضرب المصفوفات يمثل تطبيق تحويلات هندسية متتالية؛ وتنشأ اللا تبادلية لأن الأفعال الحركية المتتابعة لا تتبادل عموماً."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- (\\mathbf{B}\\mathbf{A})\\mathbf{x}: Applying composite transformation $\\mathbf{B}\\mathbf{A}$ to vector $\\mathbf{x}$; evaluated strictly from right to left (transform $\\mathbf{A}$ acts first, transform $\\mathbf{B}$ acts second).\n- B_{ik}: The entry at row $i$, column $k$ of the second transformation matrix $\\mathbf{B}$.\n- A_{kj}: The entry at row $k$, column $j$ of the first transformation matrix $\\mathbf{A}$.\n- \\sum_{k=1}^m B_{ik} A_{kj}: The dot product of row $i$ of $\\mathbf{B}$ with column $j$ of $\\mathbf{A}$, tracking where the $j$-th basis vector lands under the dual transformation.\n- \\mathbf{A}\\mathbf{B} \\ne \\mathbf{B}\\mathbf{A}: Non-commutativity; rotating then stretching alters the axis of stretch compared to stretching then rotating.",
          "ar": "- (\\mathbf{B}\\mathbf{A})\\mathbf{x}: تطبيق التحويل المركب $\\mathbf{B}\\mathbf{A}$ على المتجه $\\mathbf{x}$؛ ويُنفذ بدقة من اليمين إلى اليسار (التحويل $\\mathbf{A}$ أولاً ثم $\\mathbf{B}$).\n- B_{ik}: العنصر في الصف $i$ والعمود $k$ من مصفوفة التحويل الثانية $\\mathbf{B}$.\n- A_{kj}: العنصر في الصف $k$ والعمود $j$ من مصفوفة التحويل الأولى $\\mathbf{A}$.\n- \\sum_{k=1}^m B_{ik} A_{kj}: الجداء النقطي للصف $i$ من $\\mathbf{B}$ مع العمود $j$ من $\\mathbf{A}$، متتبعاً موقع هبوط متجه الأساس $j$ تحت تأثير التحويلين.\n- \\mathbf{A}\\mathbf{B} \\ne \\mathbf{B}\\mathbf{A}: غياب التبادلية؛ فالتدوير متبوعاً بالشد يغير محور الشد تماماً مقارنة بالشد متبوعاً بالتدوير."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-matrix-multiplication-composition",
          "starterCode": "import numpy as np\n\ndef compose_transformations(B: np.ndarray, A: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute composite transformation matrix C = B @ A.\n    \n    Parameters\n    ----------\n    B : np.ndarray of shape (L, M)\n        Second transformation applied.\n    A : np.ndarray of shape (M, N)\n        First transformation applied.\n        \n    Returns\n    -------\n    np.ndarray of shape (L, N)\n        Composite transformation matrix.\n    \"\"\"\n    # Step 1: Validate inner dimensions (B.shape[1] == A.shape[0])\n    # if B.shape[1] != A.shape[0]: raise ValueError(...)\n    \n    # Step 2: Compute composite matrix product\n    # C = B @ A\n    \n    # Step 3: Return resulting transformation matrix\n    # return C\n    pass",
          "testCases": [
            {
              "input": "compose_transformations(np.array([[1.0, 2.0], [3.0, 4.0]]), np.array([[1.0, 0.0], [0.0, 1.0]]))",
              "expected": "array([[1., 2.],\n       [3., 4.]])"
            },
            {
              "input": "compose_transformations(np.array([[0.0, 1.0], [1.0, 0.0]]), np.array([[2.0, 0.0], [0.0, 3.0]]))",
              "expected": "array([[0., 3.],\n       [2., 0.]])"
            },
            {
              "input": "compose_transformations(np.array([[2.0, 0.0], [0.0, 2.0]]), np.array([[3.0, 0.0], [0.0, 3.0]]))",
              "expected": "array([[6., 0.],\n       [0., 6.]])"
            }
          ],
          "expectedOutput": "array([[1., 2.],\n       [3., 4.]])",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compose_transformations(B: np.ndarray, A: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute composite transformation matrix C = B @ A.\n    \n    Parameters\n    ----------\n    B : np.ndarray of shape (L, M)\n        Second transformation applied.\n    A : np.ndarray of shape (M, N)\n        First transformation applied.\n        \n    Returns\n    -------\n    np.ndarray of shape (L, N)\n        Composite transformation matrix.\n    \"\"\"\n    # Step 1: Validate inner dimensions (B.shape[1] == A.shape[0])\n    # if B.shape[1] != A.shape[0]: raise ValueError(...)\n    \n    # Step 2: Compute composite matrix product\n    # C = B @ A\n    \n    # Step 3: Return resulting transformation matrix\n    # return C\n    pass",
              "expectedOutput": "array([[1., 2.],\n       [3., 4.]])"
            }
          },
          "solution": "import numpy as np\n\ndef compose_transformations(B: np.ndarray, A: np.ndarray) -> np.ndarray:\n    if B.shape[1] != A.shape[0]:\n        raise ValueError(f\"Inner dimensions mismatch: B has {B.shape[1]} cols, A has {A.shape[0]} rows.\")\n    return np.asarray(B @ A, dtype=float)"
        },
        "hints": {
          "tier1": {
            "en": "Check dimension matching: B.shape[1] must equal A.shape[0].",
            "ar": "تحقق من تطابق الأبعاد الداخلية: B.shape[1] يجب أن يساوي A.shape[0]."
          },
          "tier2": {
            "en": "Use NumPy matrix multiplication: C = B @ A.",
            "ar": "استخدم ضرب المصفوفات في نَمباي: C = B @ A."
          },
          "tier3": {
            "en": "Return as float array: return np.asarray(B @ A, dtype=float).",
            "ar": "أرجع الناتج كمصفوفة أعداد حقيقية: return np.asarray(B @ A, dtype=float)."
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
            "en": "Let R be a matrix that rotates 2D space by 90 degrees counterclockwise, and let S be a matrix that scales x-coordinates by 3 while leaving y-coordinates untouched. Geometrically, why is R @ S strictly not equal to S @ R?",
            "ar": "لتكن R مصفوفة تدور الفضاء ثنائي الأبعاد بـ 90 درجة عكس عقارب الساعة، ولتكن S مصفوفة تمدد الإحداثي السيني بمقدار 3 دون تغيير الإحداثي الصادي. هندسياً، لماذا لا تتساوى R @ S مع S @ R قطعاً؟"
          },
          "options": [
            {
              "text": {
                "en": "R @ S scales the horizontal axis first and then rotates that elongated axis into the vertical position, whereas S @ R rotates the original vertical axis into the horizontal position before scaling it.",
                "ar": "تقوم R @ S بمد المحور الأفقي أولاً ثم تدوير هذا المحور الممدود ليصبح رأسياً، بينما تقوم S @ R بتدوير المحور الرأسي الأصلي ليصبح أفقياً قبل مده.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Applying S first stretches along the x-axis; rotating by R then places the stretch along the y-axis. Applying R first rotates the axes; stretching by S then elongates whatever is currently on the x-axis (which was originally the negative y-axis). The resulting spatial geometries are completely different.",
                "ar": "تطبيق S أولاً يمد المحور السيني، ثم يؤدي التدوير بـ R إلى نقل هذا التمدد ليصبح على المحور الصادي. أما تطبيق R أولاً فيدور المحاور، ثم يقوم S بمد ما استقر على المحور السيني. النتيجة الهندسية تختلف جذرياً في الفضاء."
              }
            },
            {
              "text": {
                "en": "Matrix multiplication is associative, which mathematically guarantees that R @ S must equal S @ R.",
                "ar": "ضرب المصفوفات تجميعي، مما يضمن رياضياً بالضرورة أن R @ S تساوي S @ R.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Confuses associativity (A(BC) = (AB)C) with commutativity (AB = BA). Matrices are associative, but NOT commutative.",
                "ar": "خلط بين التجميعية (A(BC) = (AB)C) والتبادلية (AB = BA). ضرب المصفوفات تجميعي دائماً ولكنه ليس تبادلياً."
              }
            },
            {
              "text": {
                "en": "Because rotating by 90 degrees inverts the determinant to a negative value.",
                "ar": "لأن التدوير بـ 90 درجة يقلب المحدد إلى قيمة سالبة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A pure 2D rotation matrix has determinant +1 (orientation is preserved), not negative.",
                "ar": "محدد مصفوفة التدوير الصافي في بعدين هو +1 (يحافظ على الاتجاهية)، وليس سالباً."
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
    "titleAr": "المحدد كمعامل تمدد للمساحات والحجوم",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Draw a $1 \\times 1$ square on graph paper. Its area is exactly 1. Now apply a $2 \\times 2$ linear transformation $\\mathbf{A}$.",
      "ar": "ارسم مربعاً أبعاده $1 \\times 1$ على ورقة رسم بياني؛ مساحته تساوي 1 بالضبط. طبق الآن تحويلاً خطياً بمصفوفة $\\mathbf{A}$ بحجم $2 \\times 2$."
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
          "en": "Draw a $1 \\times 1$ square on graph paper. Its area is exactly 1. Now apply a $2 \\times 2$ linear transformation $\\mathbf{A}$. The square stretches, tilts, and morphs into a slanted parallelogram. What is the area of that new parallelogram? The answer is precisely the determinant, $|\\det(\\mathbf{A})|$!\n\nThe determinant is not an arbitrary formula cooked up by algebraists; it is the universal volume scaling factor of a transformation. If $\\det(\\mathbf{A}) = 3$, every shape on the plane—whether a circle, a triangle, or a complex map—has its area tripled. If $\\det(\\mathbf{A}) = 0.5$, areas shrink by half.\n\nWhat if $\\det(\\mathbf{A})$ is negative? The magnitude $|\\det(\\mathbf{A})|$ still gives the area, but the negative sign means space was flipped inside-out, like turning a rubber glove inside-out or reflecting a hand in a mirror (orientation reversal). And what if $\\det(\\mathbf{A}) = 0$? The entire 2D plane has been squashed flat onto a 1D line or crushed into a single point. All area is destroyed, which is why a matrix with zero determinant can never be inverted—you cannot un-squash a flattened world!",
          "ar": "ارسم مربعاً أبعاده $1 \\times 1$ على ورقة رسم بياني؛ مساحته تساوي 1 بالضبط. طبق الآن تحويلاً خطياً بمصفوفة $\\mathbf{A}$ بحجم $2 \\times 2$. سيميل المربع ويتمدد ليتحول إلى متوازي أضلاع مائل. كم تبلغ مساحة متوازي الأضلاع الجديد؟ الجواب الهندسي هو بالضبط القيمة المطلقة للمحدد: $|\\det(\\mathbf{A})|$!\n\nالمحدد ليس مجرد معادلة جافة وضعها علماء الجبر؛ بل هو معامل التمدد الحجمي للتحويل. إذا كان $\\det(\\mathbf{A}) = 3$، فإن مساحة أي شكل على المستوى—سواء كان دائرة أو مثلثاً أو خريطة معقدة—ستتضاعف 3 مرات. وإذا كان $\\det(\\mathbf{A}) = 0.5$، فإن المساحات تتقلص إلى النصف.\n\nماذا لو كان المحدد سالباً؟ تظل القيمة المطلقة تمثل المساحة، لكن الإشارة السالبة تعني أن الفضاء قد قُلب ظهراً لبطن، مثل قلب قفاز مطاطي أو عكس اليد في المرآة (انعكاس الاتجاهية). وماذا لو كان $\\det(\\mathbf{A}) = 0$؟ يعني هذا أن المستوى ثنائي الأبعاد بالكامل قد سُحق وضُغط ليتحول إلى خط مستقيم أحادي البعد أو نقطة واحدة؛ دُمرت المساحة تماماً، وهذا هو السبب الدقيق لعدم إمكانية قلب المصفوفة ذات المحدد الصفري—إذ يستحيل رياضياً إعادة بسط فضاء تم سحقه بالكامل!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\det(\\mathbf{A}) \\coloneqq \\frac{\\operatorname{Area}(T(S))}{\\operatorname{Area}(S)}, \\quad \\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc",
        "formulaNote": {
          "en": "The determinant measures the signed factor by which a linear transformation scales areas in 2D and hypervolumes in nD.",
          "ar": "يقيس المحدد المعامل الجبري الموجه لتمدد المساحات في بعدين والحجوم الفائقة في n بعداً."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\det(\\mathbf{A}): The determinant of square matrix $\\mathbf{A}$, quantifying the signed hypervolume scaling factor of the linear map.\n- \\operatorname{Area}(T(S)): The area of any arbitrary geometric region $S$ after transformation by $\\mathbf{A}$.\n- ad: The area of the bounding rectangle formed by the diagonal components of the transformed basis vectors.\n- - bc: The area subtracted by the off-diagonal shear components to isolate the precise parallelogram.\n- \\det(\\mathbf{A}) = 0 \\iff \\operatorname{rank}(\\mathbf{A}) < n: Space collapses into a lower dimension; the matrix is singular and irreversible.",
          "ar": "- \\det(\\mathbf{A}): محدد المصفوفة المربعة $\\mathbf{A}$، الذي يحدد كمياً معامل التمدد الحجمي الفائق للتحويل الخطي.\n- \\operatorname{Area}(T(S)): مساحة أي منطقة هندسية $S$ بعد تطبيق التحويل $\\mathbf{A}$ عليها.\n- ad: مساحة المستطيل الخارجي المتشكل من مركبات القطر الرئيسي لمتجهات الأساس المحولة.\n- - bc: المساحة المطروحة الناتجة عن مركبات القص خارج القطر لعزل متوازي الأضلاع بدقة.\n- \\det(\\mathbf{A}) = 0 \\iff \\operatorname{rank}(\\mathbf{A}) < n: انهيار الفضاء إلى بعد أدنى؛ والمصفوفة تكون شاذة وغير قابلة للقلب."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-determinant-scaling-factor",
          "starterCode": "import numpy as np\n\ndef compute_2d_determinant(A: np.ndarray) -> float:\n    \"\"\"\n    Compute the determinant of a 2x2 matrix A.\n    \n    Parameters\n    ----------\n    A : np.ndarray of shape (2, 2)\n        2D linear transformation matrix.\n        \n    Returns\n    -------\n    float\n        The signed area scaling factor det(A) = ad - bc.\n    \"\"\"\n    # Step 1: Extract elements a = A[0,0], b = A[0,1], c = A[1,0], d = A[1,1]\n    # a, b = A[0, 0], A[0, 1]\n    # c, d = A[1, 0], A[1, 1]\n    \n    # Step 2: Compute product of diagonals (ad) and off-diagonals (bc)\n    # diag_prod = ...\n    # off_diag_prod = ...\n    \n    # Step 3: Return signed determinant\n    # return ...\n    pass",
          "testCases": [
            {
              "input": "compute_2d_determinant(np.array([[3.0, 0.0], [0.0, 2.0]]))",
              "expected": "6.0"
            },
            {
              "input": "compute_2d_determinant(np.array([[1.0, 2.0], [3.0, 4.0]]))",
              "expected": "-2.0"
            },
            {
              "input": "compute_2d_determinant(np.array([[2.0, 4.0], [1.0, 2.0]]))",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "6.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef compute_2d_determinant(A: np.ndarray) -> float:\n    \"\"\"\n    Compute the determinant of a 2x2 matrix A.\n    \n    Parameters\n    ----------\n    A : np.ndarray of shape (2, 2)\n        2D linear transformation matrix.\n        \n    Returns\n    -------\n    float\n        The signed area scaling factor det(A) = ad - bc.\n    \"\"\"\n    # Step 1: Extract elements a = A[0,0], b = A[0,1], c = A[1,0], d = A[1,1]\n    # a, b = A[0, 0], A[0, 1]\n    # c, d = A[1, 0], A[1, 1]\n    \n    # Step 2: Compute product of diagonals (ad) and off-diagonals (bc)\n    # diag_prod = ...\n    # off_diag_prod = ...\n    \n    # Step 3: Return signed determinant\n    # return ...\n    pass",
              "expectedOutput": "6.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_2d_determinant(A: np.ndarray) -> float:\n    a, b = float(A[0, 0]), float(A[0, 1])\n    c, d = float(A[1, 0]), float(A[1, 1])\n    return float(a * d - b * c)"
        },
        "hints": {
          "tier1": {
            "en": "For a 2x2 matrix [[a, b], [c, d]], the formula is ad - bc.",
            "ar": "للمصفوفة 2x2 التي عناصرها [[a, b], [c, d]]، الصيغة هي ad - bc."
          },
          "tier2": {
            "en": "Extract: a = A[0,0], b = A[0,1], c = A[1,0], d = A[1,1].",
            "ar": "استخرج العناصر: a = A[0,0], b = A[0,1], c = A[1,0], d = A[1,1]."
          },
          "tier3": {
            "en": "Return float(a * d - b * c).",
            "ar": "أرجع القيمة كعدد حقيقي: float(a * d - b * c)."
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
            "en": "A machine learning pipeline applies a feature transformation matrix A to a 3D dataset. If det(A) = 0, what does this guarantee about the transformed data points and the ability to reconstruct the original inputs?",
            "ar": "يطبق نموذج تعلم آلي مصفوفة تحويل A على بيانات ثلاثية الأبعاد. إذا كان det(A) = 0، فماذا يضمن ذلك بشأن نقاط البيانات المحولة والقدرة على استرجاع المدخلات الأصلية؟"
          },
          "options": [
            {
              "text": {
                "en": "The 3D point cloud has been squashed into a 2D flat plane, a 1D line, or a single point of zero 3D volume, making unique reconstruction mathematically impossible because multiple distinct original inputs map to the same output.",
                "ar": "تم سحق سحابة البيانات ثلاثية الأبعاد لتستقر في مستوى ثنائي الأبعاد، أو خط، أو نقطة ذات حجم ثلاثي الأبعاد صفري، مما يجعل استرجاع البيانات الأصلية مستحيلاً رياضياً لتطابق مخرجات مدخلات مختلفة متعددة.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "A determinant of zero means the transformation has squashed the volume to zero, reducing the rank of the space. Because information has been permanently destroyed by collapsing a dimension, the nullspace contains non-zero vectors, and the matrix has no inverse.",
                "ar": "المحدد الصفري يعني سحق الحجم إلى الصفر وتقليص رتبة الفضاء. ولأن البيانات دُمرت بفقدان أحد الأبعاد، فإن الفضاء الصفري يحتوي على متجهات غير صفرية وتصبح المصفوفة غير قابلة للقلب إطلاقاً."
              }
            },
            {
              "text": {
                "en": "The dataset is simply reflected across the origin, but all original coordinates can be recovered by multiplying by -1.",
                "ar": "البيانات عكست فقط حول نقطة الأصل، ويمكن استرجاع كافة الإحداثيات بضربها في -1.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Reflection yields a negative determinant (e.g. -1), NOT zero. A zero determinant destroys dimensions.",
                "ar": "الانعكاس يعطي محدداً سالباً (مثل -1) وليس صفراً؛ المحدد الصفري يدمر الأبعاد."
              }
            },
            {
              "text": {
                "en": "All data points have been scaled by an infinite factor.",
                "ar": "كافة نقاط البيانات تم تكبيرها بعامل لا نهائي.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Determinant zero means collapsing to zero volume, not expanding to infinity.",
                "ar": "المحدد الصفري يعني الانكماش لحجم صفري، وليس التوسع إلى المالانهاية."
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
    "titleAr": "الحذف الغاوسي والعمليات الصفية وحل المنظومات الخطية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Every linear equation represents a flat geometric sheet: a line in 2D space, a plane in 3D space, or a flat hyperplane in $n$ dimensions.",
      "ar": "تمثل كل معادلة خطية سطحاً هندسياً مستوياً: خطاً مستقيماً في بعدين، أو مستوياً منبسطاً في 3 أبعاد، أو مستوياً فائقاً في $n$ بعداً."
    },
    "prerequisites": [
      "linear-maps-transformations"
    ],
    "x": 140,
    "y": 935,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "LinearSystemSolverCanvas",
        "narrative": {
          "en": "Every linear equation represents a flat geometric sheet: a line in 2D space, a plane in 3D space, or a flat hyperplane in $n$ dimensions. Solving a linear system $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ is the search for the single point where all those sheets simultaneously intersect.\n\nHow do we find that point without getting lost in algebraic spaghetti? Carl Friedrich Gauss devised an algorithm that feels like peeling layers from an onion: Gaussian Elimination. You perform three elementary row operations: swapping rows, scaling a row by a non-zero number, or adding a multiple of one row to another.\n\nGeometrically, row operations do not move the intersection point at all! They simply tilt and recombine the planes until the system forms a clean upper-triangular staircase (row echelon form $\\mathbf{U}$). The bottom equation now contains only one solitary unknown. You solve for that unknown instantly, and then substitute it upward step by step (back-substitution) to rapidly unlock all the remaining variables.",
          "ar": "تمثل كل معادلة خطية سطحاً هندسياً مستوياً: خطاً مستقيماً في بعدين، أو مستوياً منبسطاً في 3 أبعاد، أو مستوياً فائقاً في $n$ بعداً. وحل المنظومة الخطية $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ هو البحث عن نقطة التقاطع الوحيدة المشتركة التي تلتقي عندها كافة هذه المستويات في آن واحد.\n\nكيف نعثر على هذه النقطة دون الغرق في دوامة المعادلات المتشابكة؟ ابتكر كارل فريدريش غاوس خوارزمية تشبه تقشير طبقات البصلة بحذر: طريقة الحذف الغاوسي. تعتمد الخوارزمية على 3 عمليات صفية أولية: تبديل الصفوف، أو ضرب صف في عدد غير صفري، أو إضافة مضاعف صف إلى صف آخر.\n\nهندسياً، لا تغير هذه العمليات الصفية موقع نقطة التقاطع على الإطلاق! بل تعيد تدوير المستويات ودمجها بذكاء حتى تتحول المنظومة إلى درج مثلثي علوي مرتب (صيغة الدَرَج الصفّي $\\mathbf{U}$). تصبح المعادلة الأخيرة في القاع تحتوي على مجهول واحد وحيد؛ تحسب قيمته فوراً، ثم تعوض به صعوداً خطوة بخطوة إلى الأعلى (التعويض العكسي Back-substitution) لتفك شفرة كافة المجاهيل المتبقية بسلاسة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A}\\mathbf{x} = \\mathbf{b} \\xrightarrow{\\text{Pivoting}} \\mathbf{U}\\mathbf{x} = \\mathbf{c}, \\quad x_i = \\frac{c_i - \\sum_{j=i+1}^n U_{ij} x_j}{U_{ii}}",
        "formulaNote": {
          "en": "Elementary row operations transform a system into upper triangular form, enabling exact backward substitution.",
          "ar": "تحول العمليات الصفية الأولية المنظومة إلى شكل مثلثي علوي، مما يتيح التعويض العكسي الدقيق."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\mathbf{A}\\mathbf{x} = \\mathbf{b}: The original system of linear equations with coefficient matrix $\\mathbf{A}$ and target vector $\\mathbf{b}$.\n- \\mathbf{U}\\mathbf{x} = \\mathbf{c}: The equivalent upper-triangular row echelon system after forward elimination of variables below the diagonal.\n- U_{ii}: The pivot element on the main diagonal; must be non-zero to allow division during back-substitution.\n- \\sum_{j=i+1}^n U_{ij} x_j: The sum of already-computed variables in row $i$ subtracted from the right-hand side constant $c_i$.\n- x_i = \\dots: The backward substitution formula solving variables sequentially from bottom ($i = n$) to top ($i = 1$).",
          "ar": "- \\mathbf{A}\\mathbf{x} = \\mathbf{b}: المنظومة الخطية الأصلية بمصفوفة المعاملات $\\mathbf{A}$ ومتجه الثوابت $\\mathbf{b}$.\n- \\mathbf{U}\\mathbf{x} = \\mathbf{c}: المنظومة المثلثية العلوية المكافئة بعد تصفير المتغيرات الواقعة تحت القطر الرئيسي.\n- U_{ii}: عنصر الارتكاز (Pivot) على القطر الرئيسي؛ ويجب ألا يكون صفراً لإتاحة القسمة أثناء التعويض العكسي.\n- \\sum_{j=i+1}^n U_{ij} x_j: مجموع مساهمات المتغيرات المحسوبة مسبقاً في الصف $i$، والمطروحة من الطرف الأيمن $c_i$.\n- x_i = \\dots: صيغة التعويض العكسي التي تحل المتغيرات بالتتابع من القاع ($i = n$) نحو القمة ($i = 1$)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gaussian-elimination-systems",
          "starterCode": "import numpy as np\n\ndef back_substitution(U: np.ndarray, c: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Solve upper-triangular system U x = c via back-substitution.\n    \n    Parameters\n    ----------\n    U : np.ndarray of shape (N, N)\n        Upper-triangular matrix with non-zero diagonal pivots.\n    c : np.ndarray of shape (N,)\n        Right-hand side vector.\n        \n    Returns\n    -------\n    np.ndarray of shape (N,)\n        Solution vector x.\n    \"\"\"\n    # Step 1: Initialize solution vector x with zeros of same shape as c\n    # n = len(c)\n    # x = np.zeros(n, dtype=float)\n    \n    # Step 2: Loop backwards from row n - 1 down to 0\n    # for i in range(n - 1, -1, -1):\n    #     sum_known = np.dot(U[i, i + 1:], x[i + 1:])\n    #     x[i] = (c[i] - sum_known) / U[i, i]\n    \n    # Step 3: Return solution vector\n    # return x\n    pass",
          "testCases": [
            {
              "input": "back_substitution(np.array([[2.0, 1.0], [0.0, 3.0]]), np.array([5.0, 6.0]))",
              "expected": "array([1.5, 2. ])"
            },
            {
              "input": "back_substitution(np.array([[1.0, 2.0, 1.0], [0.0, 1.0, -1.0], [0.0, 0.0, 2.0]]), np.array([8.0, 2.0, 4.0]))",
              "expected": "array([-2.,  4.,  2.])"
            },
            {
              "input": "back_substitution(np.array([[4.0, 0.0], [0.0, 2.0]]), np.array([8.0, 6.0]))",
              "expected": "array([2., 3.])"
            }
          ],
          "expectedOutput": "array([1.5, 2. ])",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef back_substitution(U: np.ndarray, c: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Solve upper-triangular system U x = c via back-substitution.\n    \n    Parameters\n    ----------\n    U : np.ndarray of shape (N, N)\n        Upper-triangular matrix with non-zero diagonal pivots.\n    c : np.ndarray of shape (N,)\n        Right-hand side vector.\n        \n    Returns\n    -------\n    np.ndarray of shape (N,)\n        Solution vector x.\n    \"\"\"\n    # Step 1: Initialize solution vector x with zeros of same shape as c\n    # n = len(c)\n    # x = np.zeros(n, dtype=float)\n    \n    # Step 2: Loop backwards from row n - 1 down to 0\n    # for i in range(n - 1, -1, -1):\n    #     sum_known = np.dot(U[i, i + 1:], x[i + 1:])\n    #     x[i] = (c[i] - sum_known) / U[i, i]\n    \n    # Step 3: Return solution vector\n    # return x\n    pass",
              "expectedOutput": "array([1.5, 2. ])"
            }
          },
          "solution": "import numpy as np\n\ndef back_substitution(U: np.ndarray, c: np.ndarray) -> np.ndarray:\n    n = len(c)\n    x = np.zeros(n, dtype=float)\n    for i in range(n - 1, -1, -1):\n        if U[i, i] == 0.0:\n            raise ZeroDivisionError(f\"Zero pivot encountered at row {i}.\")\n        sum_known = float(np.dot(U[i, i + 1:], x[i + 1:]))\n        x[i] = (float(c[i]) - sum_known) / float(U[i, i])\n    return x"
        },
        "hints": {
          "tier1": {
            "en": "Iterate backwards: for i in range(n - 1, -1, -1).",
            "ar": "ابدأ التكرار من الأسفل للأعلى: for i in range(n - 1, -1, -1)."
          },
          "tier2": {
            "en": "Subtract known terms using dot product: sum_known = np.dot(U[i, i+1:], x[i+1:]).",
            "ar": "اطرح الحدود المحسوبة مسبقاً باستخدام الجداء النقطي: sum_known = np.dot(U[i, i+1:], x[i+1:])."
          },
          "tier3": {
            "en": "Divide by pivot: x[i] = (c[i] - sum_known) / U[i, i].",
            "ar": "اقسم على عنصر الارتكاز: x[i] = (c[i] - sum_known) / U[i, i]."
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
            "en": "During Gaussian elimination on a system of 3 equations with 3 unknowns, forward elimination yields a bottom augmented row of [0, 0, 0 | 5]. What is the exact geometric and algebraic interpretation?",
            "ar": "أثناء تطبيق الحذف الغاوسي على منظومة من 3 معادلات بـ 3 مجاهيل، أدى الحذف إلى صف أخير في المصفوفة الموسعة هو [0, 0, 0 | 5]. ما هو التفسير الهندسي والجبري الدقيق لذلك؟"
          },
          "options": [
            {
              "text": {
                "en": "The system is algebraically inconsistent with no solution, geometrically meaning the hyperplanes have no common intersection point (e.g. two parallel planes).",
                "ar": "المنظومة متناقضة جبرياً ومستحيلة الحل، وهندسياً يعني ذلك أن المستويات ليس لها أي نقطة تقاطع مشتركة (كمستويين متوازيين لا يلتقيان).\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The row corresponds to the equation 0*x1 + 0*x2 + 0*x3 = 5, which simplifies to 0 = 5 (a mathematical impossibility). Geometrically, planes that never meet share no common point of intersection.",
                "ar": "يعبر هذا الصف عن المعادلة 0 = 5، وهي استحالة رياضية صريحة. هندسياً، المستويات التي لا تلتقي في نقطة موحدة ليس لها أي حل مشترك."
              }
            },
            {
              "text": {
                "en": "The system has infinitely many solutions parameterized by x3 = 5.",
                "ar": "المنظومة تمتلك عدداً لا نهائياً من الحلول بمعلمة x3 = 5.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Infinitely many solutions occur when a row becomes [0, 0, 0 | 0], indicating a redundant equation, NOT [0, 0, 0 | 5].",
                "ar": "تنتج الحلول اللانهائية عندما يكون الصف بالكامل أصفاراً [0, 0, 0 | 0] للدلالة على التكرار، وليس عندما يكون الطرف الأيمن غير صفري."
              }
            },
            {
              "text": {
                "en": "The algorithm must be restarted because a zero pivot means the matrix rank is 5.",
                "ar": "يجب إعادة تشغيل الخوارزمية لأن الارتكاز الصفري يعني أن رتبة المصفوفة هي 5.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A 3x3 matrix cannot have rank 5; the result cleanly diagnoses inconsistency.",
                "ar": "مصفوفة 3x3 يستحيل أن تكون رتبتها 5؛ والنتيجة تشخص التناقض بوضوح تام."
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
      "en": "Every matrix $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ acts as an information bridge connecting two different universes: an input world of...",
      "ar": "تعمل كل مصفوفة $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ كجسر معلوماتي يربط بين عالمين مختلفين: عالم المدخلات ذي الأبعاد الـ $n$ وعالم..."
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
          "en": "Every matrix $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ acts as an information bridge connecting two different universes: an input world of $n$ dimensions and an output world of $m$ dimensions. Renowned mathematician Gilbert Strang synthesized the entire structure of linear algebra into 'The Big Picture'—the Four Fundamental Subspaces.\n\nThe input space $\\mathbb{R}^n$ is cleanly split into two mutually orthogonal territories: the Row Space $C(\\mathbf{A}^T)$ and the Nullspace $N(\\mathbf{A})$. The Row Space contains all the active input directions that genuinely influence your output. The Nullspace contains the blind spots: every vector in $N(\\mathbf{A})$ gets crushed to absolute zero by the matrix ($\\mathbf{A}\\mathbf{x} = \\mathbf{0}$). These two worlds are strictly perpendicular ($90^\\circ$ orthogonal complements).\n\nMeanwhile, the output world $\\mathbb{R}^m$ is likewise split into two perpendicular territories: the Column Space $C(\\mathbf{A})$ and the Left Nullspace $N(\\mathbf{A}^T)$. The Column Space consists of all possible outputs the matrix can ever reach. The Left Nullspace contains the impossible, orthogonal directions. Understanding these four subspaces is the foundational key to mastering least squares, Kalman filtering, and deep learning backpropagation.",
          "ar": "تعمل كل مصفوفة $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ كجسر معلوماتي يربط بين عالمين مختلفين: عالم المدخلات ذي الأبعاد الـ $n$ وعالم المخرجات ذي الأبعاد الـ $m$. اختصر عالم الرياضيات الشهير جيلبرت سترانج جوهر الجبر الخطي في لوحة بديعة سماها 'الصورة الكبرى'—الفضاءات الجزئية الأربعة الأساسية.\n\nينقسم فضاء المدخلات $\\mathbb{R}^n$ بدقة إلى منطقتين متعامدتين تماماً: فضاء الصفوف $C(\\mathbf{A}^T)$ والفضاء الصفري $N(\\mathbf{A})$. فضاء الصفوف يضم كافة اتجاهات المدخلات الفعالة التي تؤثر حقيقة في الناتج. أما الفضاء الصفري فيمثل النقاط العمياء: كل متجه يقع في $N(\\mathbf{A})$ تسحقه المصفوفة تماماً ليتحول إلى الصفر المطلق ($\\mathbf{A}\\mathbf{x} = \\mathbf{0}$). وهذان الفضاءان متعامدان بزاوية $90^\\circ$ متكاملة.\n\nوفي المقابل، ينقسم فضاء المخرجات $\\mathbb{R}^m$ بدوره إلى منطقتين متعامدتين: فضاء الأعمدة $C(\\mathbf{A})$ والفضاء الصفري الأيسر $N(\\mathbf{A}^T)$. فضاء الأعمدة يضم كل نقطة يمكن للمصفوفة توليدها وبلوغها في المخرجات، بينما يمثل الفضاء الصفري الأيسر الاتجاهات المتعامدة الممتنعة. استيعاب هذه الفضاءات الأربعة هو حجر الزاوية لإتقان المربعات الصغرى وفلاتر كالمان والانتشار الخلفي في التعلم العميق."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbb{R}^n = C(\\mathbf{A}^T) \\oplus N(\\mathbf{A}), \\quad \\mathbb{R}^m = C(\\mathbf{A}) \\oplus N(\\mathbf{A}^T), \\quad \\operatorname{rank}(\\mathbf{A}) + \\operatorname{nullity}(\\mathbf{A}) = n",
        "formulaNote": {
          "en": "Strang's Big Picture: Any linear map partitions its domain and codomain into pairs of mutually orthogonal complementary subspaces.",
          "ar": "الصورة الكبرى لسترانج: يقسم أي تحويل خطي مجاله ومجاله المقابل إلى أزواج من الفضاءات الجزئية المتعامدة المتكاملة."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- C(\\mathbf{A}) \\subset \\mathbb{R}^m: The Column Space (image/range); the subspace of all reachable output vectors, with dimension $r = \\operatorname{rank}(\\mathbf{A})$.\n- N(\\mathbf{A}) \\subset \\mathbb{R}^n: The Nullspace (kernel); all inputs mapped to zero ($\\mathbf{A}\\mathbf{x} = \\mathbf{0}$), with dimension $n - r$.\n- C(\\mathbf{A}^T) \\subset \\mathbb{R}^n: The Row Space; spanned by rows of $\\mathbf{A}$, with dimension equal to rank $r$. Orthogonal complement to $N(\\mathbf{A})$.\n- N(\\mathbf{A}^T) \\subset \\mathbb{R}^m: The Left Nullspace; inputs mapped to zero by $\\mathbf{A}^T$, with dimension $m - r$. Orthogonal complement to $C(\\mathbf{A})$.\n- \\oplus: Direct sum decomposition; any input $\\mathbf{x} \\in \\mathbb{R}^n$ uniquely splits into $\\mathbf{x}_{\\text{row}} + \\mathbf{x}_{\\text{null}}$ where $\\mathbf{x}_{\\text{row}} \\perp \\mathbf{x}_{\\text{null}}$.",
          "ar": "- C(\\mathbf{A}) \\subset \\mathbb{R}^m: فضاء الأعمدة (المدى)؛ فضاء المخرجات الممكنة، وبعده يساوي رتبة المصفوفة $r = \\operatorname{rank}(\\mathbf{A})$.\n- N(\\mathbf{A}) \\subset \\mathbb{R}^n: الفضاء الصفري (النواة)؛ كافة المدخلات التي تسحقها المصفوفة إلى الصفر، وبعده $n - r$.\n- C(\\mathbf{A}^T) \\subset \\mathbb{R}^n: فضاء الصفوف؛ المتولد من صفوف $\\mathbf{A}$، وبعده $r$. وهو المتمم المتعامد للفضاء الصفري.\n- N(\\mathbf{A}^T) \\subset \\mathbb{R}^m: الفضاء الصفري الأيسر؛ وبعده $m - r$. وهو المتمم المتعامد لفضاء الأعمدة.\n- \\oplus: تفكيك المجموع المباشر؛ كل مدخل $\\mathbf{x}$ ينقسم فريداً إلى $\\mathbf{x}_{\\text{row}} + \\mathbf{x}_{\\text{null}}$ حيث المركبتان متعامدتان تماماً."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-four-fundamental-subspaces",
          "starterCode": "import numpy as np\n\ndef subspace_dimensions(m: int, n: int, rank: int) -> dict[str, int]:\n    \"\"\"\n    Compute dimensions of the Four Fundamental Subspaces for an m x n matrix of rank r.\n    \n    Parameters\n    ----------\n    m : int\n        Number of rows (output space dimension).\n    n : int\n        Number of columns (input space dimension).\n    rank : int\n        Matrix rank r (r <= min(m, n)).\n        \n    Returns\n    -------\n    dict with keys 'col_space', 'nullspace', 'row_space', 'left_nullspace'\n    \"\"\"\n    # Step 1: Column space and row space dimensions equal rank r\n    # dim_col = ...\n    # dim_row = ...\n    \n    # Step 2: Nullspace dimension equals n - rank (Rank-Nullity Theorem)\n    # dim_null = ...\n    \n    # Step 3: Left nullspace dimension equals m - rank\n    # dim_left_null = ...\n    \n    # return dict(...)\n    pass",
          "testCases": [
            {
              "input": "subspace_dimensions(5, 3, 2)",
              "expected": "{'col_space': 2, 'nullspace': 1, 'row_space': 2, 'left_nullspace': 3}"
            },
            {
              "input": "subspace_dimensions(4, 4, 4)",
              "expected": "{'col_space': 4, 'nullspace': 0, 'row_space': 4, 'left_nullspace': 0}"
            },
            {
              "input": "subspace_dimensions(3, 5, 2)",
              "expected": "{'col_space': 2, 'nullspace': 3, 'row_space': 2, 'left_nullspace': 1}"
            }
          ],
          "expectedOutput": "{'col_space': 2, 'nullspace': 1, 'row_space': 2, 'left_nullspace': 3}",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef subspace_dimensions(m: int, n: int, rank: int) -> dict[str, int]:\n    \"\"\"\n    Compute dimensions of the Four Fundamental Subspaces for an m x n matrix of rank r.\n    \n    Parameters\n    ----------\n    m : int\n        Number of rows (output space dimension).\n    n : int\n        Number of columns (input space dimension).\n    rank : int\n        Matrix rank r (r <= min(m, n)).\n        \n    Returns\n    -------\n    dict with keys 'col_space', 'nullspace', 'row_space', 'left_nullspace'\n    \"\"\"\n    # Step 1: Column space and row space dimensions equal rank r\n    # dim_col = ...\n    # dim_row = ...\n    \n    # Step 2: Nullspace dimension equals n - rank (Rank-Nullity Theorem)\n    # dim_null = ...\n    \n    # Step 3: Left nullspace dimension equals m - rank\n    # dim_left_null = ...\n    \n    # return dict(...)\n    pass",
              "expectedOutput": "{'col_space': 2, 'nullspace': 1, 'row_space': 2, 'left_nullspace': 3}"
            }
          },
          "solution": "import numpy as np\n\ndef subspace_dimensions(m: int, n: int, rank: int) -> dict[str, int]:\n    if rank > min(m, n) or rank < 0:\n        raise ValueError(f\"Rank {rank} must satisfy 0 <= rank <= min({m}, {n}).\")\n    return {\n        \"col_space\": int(rank),\n        \"nullspace\": int(n - rank),\n        \"row_space\": int(rank),\n        \"left_nullspace\": int(m - rank)\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Remember the fundamental identity: dim(Col) = dim(Row) = rank.",
            "ar": "تذكر التطابق الأساسي: بعد فضاء الأعمدة = بعد فضاء الصفوف = الرتبة."
          },
          "tier2": {
            "en": "Rank-Nullity theorem states: rank + dim(Null) = n (columns).",
            "ar": "تنص مبرهنة الرتبة والنواة على: الرتبة + بعد الفضاء الصفري = n (عدد الأعمدة)."
          },
          "tier3": {
            "en": "Left nullspace dimension is m - rank: dim(LeftNull) = m - rank.",
            "ar": "بعد الفضاء الصفري الأيسر هو m - rank."
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
            "en": "In a linear regression problem Ax = b, the target vector b cannot be solved exactly because it lies outside the Column Space C(A). In which of the Four Fundamental Subspaces does the optimal residual error vector e = b - A x_hat strictly reside?",
            "ar": "في مسألة انحدار خطي Ax = b، لا يمكن حل المتجه المستهدف b بدقة لوقوعه خارج فضاء الأعمدة C(A). في أي من الفضاءات الأساسية الأربعة يقع بالضرورة متجه الخطأ المتبقي الأمثل e = b - A x_hat؟"
          },
          "options": [
            {
              "text": {
                "en": "The Left Nullspace N(A^T), because the minimal least-squares error is strictly orthogonal to every vector in the Column Space C(A).",
                "ar": "الفضاء الصفري الأيسر N(A^T)، لأن خطأ المربعات الصغرى الأصغري متعامد بالضرورة مع كل متجه في فضاء الأعمدة C(A).\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Geometric orthogonality requires A^T e = 0, which is the definition of the Left Nullspace N(A^T). The residual e is the orthogonal drop from b onto C(A); because C(A) ⊥ N(A^T), e must live inside N(A^T).",
                "ar": "التعامد الهندسي يستلزم A^T e = 0، وهو بالضبط تعريف الفضاء الصفري الأيسر N(A^T). الخطأ e هو الإسقاط العمودي من b على فضاء الأعمدة C(A)، ولأن C(A) متعامد تماماً مع N(A^T)، فإن e يستقر حتماً في N(A^T)."
              }
            },
            {
              "text": {
                "en": "The Nullspace N(A), because the error vector must be squashed to zero by matrix A.",
                "ar": "الفضاء الصفري N(A)، لأن متجه الخطأ يجب أن تسحقه المصفوفة A إلى الصفر.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Dimension mismatch! Vector e lives in the output space R^m, while the nullspace N(A) lives in the input space R^n.",
                "ar": "عدم تطابق في الأبعاد! المتجه e يقع في فضاء المخرجات R^m، بينما الفضاء الصفري N(A) يقع في فضاء المدخلات R^n."
              }
            },
            {
              "text": {
                "en": "The Row Space C(A^T), because it contains all the explanatory regressors.",
                "ar": "فضاء الصفوف C(A^T)، لاحتوائه على كافة المتغيرات التفسيرية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The row space lives in R^n, not R^m, and represents inputs rather than output residuals.",
                "ar": "فضاء الصفوف يقع في R^n وليس R^m، ويمثل المدخلات لا البواقي في المخرجات."
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
      "en": "Imagine standing in a high-ceilinged room holding a floating balloon at point $\\mathbf{b}$.",
      "ar": "تخيل أنك تقف في غرفة ذات سقف مرتفع وتمسك ببالون يطفو في الهواء عند النقطة $\\mathbf{b}$."
    },
    "prerequisites": [
      "four-fundamental-subspaces"
    ],
    "x": 140,
    "y": 1125,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "GramSchmidtOrthogonalCanvas",
        "narrative": {
          "en": "Imagine standing in a high-ceilinged room holding a floating balloon at point $\\mathbf{b}$. What point on the floor is closest to the balloon? You don't guess at an angle; you drop a weighted plumb line straight down. The spot where the plumb line strikes the floor at a sharp $90^\\circ$ angle is the orthogonal projection $\\mathbf{p}$.\n\nWhy is this point the absolute closest? Because any other point on the floor forms a right-angled triangle with the balloon and the projection. By the Pythagorean theorem, any other path is the hypotenuse, and the hypotenuse is strictly longer than the vertical perpendicular drop. Orthogonal projection is nature's way of finding the closest approximation.\n\nWhen we collect messy data in machine learning, the true outcome vector $\\mathbf{b}$ rarely lies inside our model's subspace $C(\\mathbf{A})$. We cannot solve $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ exactly. Instead, we project $\\mathbf{b}$ orthogonally onto $C(\\mathbf{A})$, producing $\\mathbf{p} = \\mathbf{A}\\hat{\\mathbf{x}}$. The projection matrix $\\mathbf{P}$ possesses a beautiful mathematical property: $\\mathbf{P}^2 = \\mathbf{P}$ (idempotence). Once a point is dropped onto the floor, dropping it again leaves it exactly where it is!",
          "ar": "تخيل أنك تقف في غرفة ذات سقف مرتفع وتمسك ببالون يطفو في الهواء عند النقطة $\\mathbf{b}$. ما هي أقرب نقطة على أرضية الغرفة إلى هذا البالون؟ لا تخمن بزوايا مائلة؛ بل تسقط خيطاً به ثقل شاقولي نحو الأسفل مباشرة. النقطة التي يلمس فيها الخيط الأرض بزاوية قائمة $90^\\circ$ هي الإسقاط المتعامد $\\mathbf{p}$.\n\nلماذا تكون هذه النقطة هي الأقرب على الإطلاق؟ لأن أي نقطة أخرى على الأرضية ستشكل مثلثاً قائم الزاوية مع البالون ونقطة الإسقاط. ووفق مبرهنة فيثاغورس، فإن أي مسار بديل هو وتر المثلث، والوتر أطول قطعاً من الضلع القائم الشاقولي. الإسقاط المتعامد هو وسيلة الطبيعة المثلى لإيجاد أقرب تقريب ممكن.\n\nعندما نجمع بيانات واقعية مشوبة بالضجيج في تعلم الآلة، نادراً ما يقع متجه النتائج الحقيقي $\\mathbf{b}$ داخل فضاء النموذج $C(\\mathbf{A})$. يستحيل حل $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ بدقة تامة. بدلاً من ذلك، نسقط $\\mathbf{b}$ عمودياً على فضاء الأعمدة لينتج $\\mathbf{p} = \\mathbf{A}\\hat{\\mathbf{x}}$. تتميز مصفوفة الإسقاط $\\mathbf{P}$ بخاصية رياضية ساحرة: $\\mathbf{P}^2 = \\mathbf{P}$ (الصمود التكراري Idempotence). فبمجرد هبوط النقطة على الأرض، فإن محاولة إسقاطها مرة ثانية تبقيها في نفس مكانها تماماً دون تغيير!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{p} = \\mathbf{P}\\mathbf{b} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\mathbf{b}, \\quad \\mathbf{P}^2 = \\mathbf{P}, \\quad \\mathbf{P}^T = \\mathbf{P}",
        "formulaNote": {
          "en": "The orthogonal projection operator onto col(A) minimizes distance ||b - p||2 via an idempotent, symmetric projection matrix.",
          "ar": "مؤثر الإسقاط المتعامد على فضاء أعمدة A يقلل المسافة ||b - p||2 عبر مصفوفة إسقاط متناظرة وصامدة أمام التكرار."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\mathbf{p}: The projected vector lying inside subspace $C(\\mathbf{A})$, representing the best linear approximation to $\\mathbf{b}$.\n- \\mathbf{P} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T: The orthogonal projection matrix operator.\n- \\mathbf{A}^T\\mathbf{A}: The Gram matrix (normal equations kernel); invertible whenever the columns of $\\mathbf{A}$ are linearly independent.\n- \\mathbf{P}^2 = \\mathbf{P}: Idempotence; applying the projection a second time leaves the projected vector unchanged.\n- \\mathbf{P}^T = \\mathbf{P}: Symmetry; guarantees that the projection angle is strictly perpendicular ($90^\\circ$).\n- \\mathbf{e} = \\mathbf{b} - \\mathbf{p}: The residual error vector, guaranteed to satisfy $\\mathbf{A}^T\\mathbf{e} = \\mathbf{0}$.",
          "ar": "- \\mathbf{p}: المتجه المسقط الواقع داخل فضاء الأعمدة $C(\\mathbf{A})$، ويمثل أفضل تقريب خطي للمتجه $\\mathbf{b}$.\n- \\mathbf{P} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T: مصفوفة مؤثر الإسقاط المتعامد.\n- \\mathbf{A}^T\\mathbf{A}: مصفوفة غرام؛ وتكون قابلة للقلب طالما كانت أعمدة $\\mathbf{A}$ مستقلة خطياً.\n- \\mathbf{P}^2 = \\mathbf{P}: خاصية الصمود التكراري (Idempotence)؛ فإعادة تطبيق الإسقاط تبقي المتجه ثابتاً دون أي تغيير.\n- \\mathbf{P}^T = \\mathbf{P}: خاصية التناظر؛ وتضمن هندسياً أن زاوية السقوط عمودية تماماً ($90^\\circ$).\n- \\mathbf{e} = \\mathbf{b} - \\mathbf{p}: متجه البواقي أو الخطأ، ويحقق حتماً $\\mathbf{A}^T\\mathbf{e} = \\mathbf{0}$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-orthogonal-projections",
          "starterCode": "import numpy as np\n\ndef project_onto_line(a: np.ndarray, b: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Project vector b orthogonally onto the 1D subspace spanned by vector a.\n    \n    Parameters\n    ----------\n    a : np.ndarray of shape (D,)\n        Direction vector defining the 1D subspace line (a != 0).\n    b : np.ndarray of shape (D,)\n        Target vector to be projected.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Projected vector p = (a^T b / a^T a) * a.\n    \"\"\"\n    # Step 1: Compute inner product between line vector a and target b\n    # dot_ab = ...\n    \n    # Step 2: Compute squared norm of line vector a (dot product with itself)\n    # dot_aa = ...\n    \n    # Step 3: Compute scalar projection coefficient and scale direction vector a\n    # return ...\n    pass",
          "testCases": [
            {
              "input": "project_onto_line(np.array([1.0, 0.0]), np.array([3.0, 4.0]))",
              "expected": "array([3., 0.])"
            },
            {
              "input": "project_onto_line(np.array([1.0, 1.0]), np.array([2.0, 0.0]))",
              "expected": "array([1., 1.])"
            },
            {
              "input": "project_onto_line(np.array([0.0, 2.0]), np.array([5.0, 6.0]))",
              "expected": "array([0., 6.])"
            }
          ],
          "expectedOutput": "array([3., 0.])",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef project_onto_line(a: np.ndarray, b: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Project vector b orthogonally onto the 1D subspace spanned by vector a.\n    \n    Parameters\n    ----------\n    a : np.ndarray of shape (D,)\n        Direction vector defining the 1D subspace line (a != 0).\n    b : np.ndarray of shape (D,)\n        Target vector to be projected.\n        \n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Projected vector p = (a^T b / a^T a) * a.\n    \"\"\"\n    # Step 1: Compute inner product between line vector a and target b\n    # dot_ab = ...\n    \n    # Step 2: Compute squared norm of line vector a (dot product with itself)\n    # dot_aa = ...\n    \n    # Step 3: Compute scalar projection coefficient and scale direction vector a\n    # return ...\n    pass",
              "expectedOutput": "array([3., 0.])"
            }
          },
          "solution": "import numpy as np\n\ndef project_onto_line(a: np.ndarray, b: np.ndarray) -> np.ndarray:\n    dot_aa = float(np.dot(a, a))\n    if dot_aa == 0.0:\n        raise ValueError(\"Cannot project onto a zero direction vector.\")\n    dot_ab = float(np.dot(a, b))\n    scalar_proj = dot_ab / dot_aa\n    return np.asarray(scalar_proj * a, dtype=float)"
        },
        "hints": {
          "tier1": {
            "en": "Compute dot_ab = np.dot(a, b) and dot_aa = np.dot(a, a).",
            "ar": "احسب dot_ab = np.dot(a, b) و dot_aa = np.dot(a, a)."
          },
          "tier2": {
            "en": "The scalar projection factor is dot_ab / dot_aa.",
            "ar": "معامل الإسقاط القياسي هو dot_ab / dot_aa."
          },
          "tier3": {
            "en": "Multiply the scalar factor by vector a: return (dot_ab / dot_aa) * a.",
            "ar": "اضرب المعامل في المتجه a: return (dot_ab / dot_aa) * a."
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
            "en": "Let P be an orthogonal projection matrix onto a linear subspace S. If we apply the projection matrix twice to a vector v, what is the value of P @ (P @ v)?",
            "ar": "لتكن P مصفوفة إسقاط متعامد على فضاء فرعي S. إذا طبقنا مصفوفة الإسقاط مرتين متتاليتين على متجه v، فما هي قيمة P @ (P @ v)؟"
          },
          "options": [
            {
              "text": {
                "en": "P @ v, because once a vector is projected into subspace S, it already lies entirely inside S, so projecting it again produces zero further change (idempotence P^2 = P).",
                "ar": "P @ v، لأن المتجه بمجرد إسقاطه في الفضاء S يصبح واقعاً فيه بالكامل، وإعادة إسقاطه لن تحدث أي تغيير إضافي (خاصية الصمود P^2 = P).\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Idempotence (P^2 = P) is the defining algebraic fingerprint of projection. Geometrically, dropping a point onto the floor and then dropping it onto the floor again leaves it in the exact same spot on the floor.",
                "ar": "الصمود التكراري (P^2 = P) هو البصمة الجبرية المميزة لمصفوفات الإسقاط. وهندسياً، إسقاط نقطة على الأرض ثم إعادة إسقاطها يبقيها في نفس النقطة على الأرض."
              }
            },
            {
              "text": {
                "en": "Zero vector 0, because repeated projection cancels out all vector components.",
                "ar": "المتجه الصفري 0، لأن تكرار الإسقاط يلغي كافة مركبات المتجه.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Projecting does not cancel the vector; it preserves its component inside S.",
                "ar": "الإسقاط لا يلغي المتجه بل يحافظ على مركبته المستقرة داخل فضاء الإسقاط S."
              }
            },
            {
              "text": {
                "en": "2 * P @ v, because the transformation was executed twice.",
                "ar": "2  P @ v، لأن التحويل نُفذ مرتين متعاقبتين."
              },
              "correct": false,
              "explanation": {
                "en": "Matrix multiplication applies successive operators; it does not add them.",
                "ar": "ضرب المصفوفات يركب العمليات هندسياً ولا يجمعها جبرياً."
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
      "en": "When a linear transformation acts on the space around it, it generally whips vectors around, changing both their lengths and their...",
      "ar": "عندما تؤثر مصفوفة على الفضاء من حولها، فإنها عادة ما تعصف بالمتجهات وتديرها، مغيرّة أطوالها واتجاهاتها في آن واحد؛ فمتجه يشير إلى الشمال..."
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
          "en": "When a linear transformation acts on the space around it, it generally whips vectors around, changing both their lengths and their directions. A vector pointing northeast might end up pointing south-southeast.\n\nHowever, for almost every transformation, there exist a few special, magical directions. When you feed a vector $\\mathbf{v}$ lying along one of these directions into the matrix, it does not rotate at all! It stays pointed along the exact same line, merely getting stretched, shrunk, or flipped backwards by a scalar factor $\\lambda$. These invariant axes are the eigenvectors (from the German 'eigen', meaning 'characteristic' or 'own'), and the scaling factor $\\lambda$ is the eigenvalue.\n\nEigenvectors are the natural skeleton of a matrix. In structural engineering, they reveal the resonant frequencies that can shake a suspension bridge apart. In quantum mechanics, they are the observable energy states of particles. In Google's PageRank algorithm, the dominant eigenvector ranks the importance of every website on the internet.",
          "ar": "عندما تؤثر مصفوفة على الفضاء من حولها، فإنها عادة ما تعصف بالمتجهات وتديرها، مغيرّة أطوالها واتجاهاتها في آن واحد؛ فمتجه يشير إلى الشمال الشرقي قد ينتهي به المطاف مشيراً إلى الجنوب الشرقي.\n\nومع ذلك، توجد في كل تحويل خطي تقريباً اتجاهات سحرية استثنائية. عندما تختار متجهاً $\\mathbf{v}$ يقع على أحد هذه الاتجاهات الخاصة وتطبّق عليه المصفوفة، فإنه لا يدور على الإطلاق! بل يظل ثابتاً على نفس خط استقامته الأصلي، مكتفياً بالتمدد أو الانكماش أو الانعكاس للخلف بمقدار عامل عددي $\\lambda$. تُسمى هذه المحاور الصامدة 'المتجهات الذاتية' (من الكلمة الألمانية eigen التي تعني الخاص أو الأصيل)، ويُسمى معامل التمدد 'القيمة الذاتية'.\n\nالمتجهات الذاتية هي الهيكل العظمي الطبيعي للمصفوفة. في الهندسة الإنشائية، تكشف عن ترددات الرنين الطبيعي التي قد تؤدي لانهيار الجسور المعلقة. وفي ميكانيكا الكم، تمثل الحالات الطاقية الملاحظة للجسيمات. وفي خوارزمية PageRank لشركة Google، يحدد المتجه الذاتي المهيمن الأهمية النسبية لمليارات المواقع على شبكة الإنترنت."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v} \\iff (\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{v} = \\mathbf{0}, \\quad \\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0",
        "formulaNote": {
          "en": "Eigenvectors identify invariant spatial directions that experience zero angular rotation under transformation A, scaling only by eigenvalue lambda.",
          "ar": "تكشف المتجهات الذاتية عن الاتجاهات المكانية الصامدة التي لا تعاني أي دوران زاوي تحت التحويل A، وتكتفي بالتمدد بالقيمة الذاتية لامدا."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\mathbf{A}\\mathbf{v}: The transformed vector resulting from applying matrix $\\mathbf{A}$ to vector $\\mathbf{v}$.\n- \\lambda \\mathbf{v}: Scalar multiplication of the original vector; proves that the transformation acts purely as a stretch without any angular rotation.\n- \\mathbf{A} - \\lambda \\mathbf{I}: The shifted characteristic matrix; must be singular (non-invertible) so that non-zero solutions exist in its nullspace.\n- \\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0: The characteristic equation; roots of this polynomial yield all eigenvalues $\\lambda$.\n- \\mathbf{v} \\ne \\mathbf{0}: The non-triviality condition; the zero vector is excluded by definition.",
          "ar": "- \\mathbf{A}\\mathbf{v}: المتجه الناتج بعد تطبيق التحويل الخطي بالمصفوفة $\\mathbf{A}$ على المتجه $\\mathbf{v}$.\n- \\lambda \\mathbf{v}: ضرب قياسي في المتجه الأصلي؛ ويثبت هندسياً أن التحويل يكتفي بالشد دون أي انحراف زاوي.\n- \\mathbf{A} - \\lambda \\mathbf{I}: المصفوفة المميزة المزاحة؛ ويجب أن تكون مصفوفة شاذة ليتسع فضاؤها الصفري لحلول غير صفرية.\n- \\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0: المعادلة المميزة؛ وتمنحنا جذور كثير الحدود هذا كافة القيم الذاتية $\\lambda$.\n- \\mathbf{v} \\ne \\mathbf{0}: شرط الحل غير التافه؛ إذ يُستثنى المتجه الصفري دائماً من تعريف المتجهات الذاتية."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gram-schmidt-orthogonalization",
          "starterCode": "import numpy as np\n\ndef power_iteration(A: np.ndarray, num_iter: int = 50) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Compute dominant eigenvalue and eigenvector via power iteration.\n    \n    Parameters\n    ----------\n    A : np.ndarray of shape (N, N)\n        Square matrix with a distinct dominant eigenvalue.\n    num_iter : int\n        Number of power iteration steps.\n        \n    Returns\n    -------\n    tuple[float, np.ndarray]\n        dominant_eigenvalue: Estimated Rayleigh quotient.\n        dominant_eigenvector: Unit eigenvector.\n    \"\"\"\n    # Step 1: Initialize random or uniform unit vector v\n    # v = np.ones(A.shape[0]) / np.sqrt(A.shape[0])\n    \n    # Step 2: Loop num_iter times: multiply by A and normalize\n    # for _ in range(num_iter):\n    #     v = A @ v\n    #     v = v / np.linalg.norm(v)\n    \n    # Step 3: Compute Rayleigh quotient eigenvalue lambda = v^T A v\n    # lam = float(v.T @ A @ v)\n    # return lam, v\n    pass",
          "testCases": [
            {
              "input": "round(power_iteration(np.array([[2.0, 0.0], [0.0, 5.0]]), 50)[0], 2)",
              "expected": "5.0"
            },
            {
              "input": "round(power_iteration(np.array([[3.0, 1.0], [1.0, 3.0]]), 50)[0], 2)",
              "expected": "4.0"
            },
            {
              "input": "round(power_iteration(np.array([[6.0, 0.0], [0.0, 1.0]]), 30)[0], 2)",
              "expected": "6.0"
            }
          ],
          "expectedOutput": "5.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef power_iteration(A: np.ndarray, num_iter: int = 50) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Compute dominant eigenvalue and eigenvector via power iteration.\n    \n    Parameters\n    ----------\n    A : np.ndarray of shape (N, N)\n        Square matrix with a distinct dominant eigenvalue.\n    num_iter : int\n        Number of power iteration steps.\n        \n    Returns\n    -------\n    tuple[float, np.ndarray]\n        dominant_eigenvalue: Estimated Rayleigh quotient.\n        dominant_eigenvector: Unit eigenvector.\n    \"\"\"\n    # Step 1: Initialize random or uniform unit vector v\n    # v = np.ones(A.shape[0]) / np.sqrt(A.shape[0])\n    \n    # Step 2: Loop num_iter times: multiply by A and normalize\n    # for _ in range(num_iter):\n    #     v = A @ v\n    #     v = v / np.linalg.norm(v)\n    \n    # Step 3: Compute Rayleigh quotient eigenvalue lambda = v^T A v\n    # lam = float(v.T @ A @ v)\n    # return lam, v\n    pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "import numpy as np\n\ndef power_iteration(A: np.ndarray, num_iter: int = 50) -> tuple[float, np.ndarray]:\n    n = A.shape[0]\n    v = np.ones(n, dtype=float) / np.sqrt(n)\n    for _ in range(num_iter):\n        w = A @ v\n        norm_w = float(np.linalg.norm(w))\n        if norm_w == 0.0:\n            return 0.0, v\n        v = w / norm_w\n    lam = float(v.T @ (A @ v))\n    return lam, v"
        },
        "hints": {
          "tier1": {
            "en": "Initialize a non-zero starting vector: v = np.ones(A.shape[0]) / np.sqrt(A.shape[0]).",
            "ar": "ابدأ بمتجه غير صفري موحد: v = np.ones(A.shape[0]) / np.sqrt(A.shape[0])."
          },
          "tier2": {
            "en": "In each loop, multiply w = A @ v and renormalize v = w / np.linalg.norm(w).",
            "ar": "في كل دورة، اضرب w = A @ v ثم أعد التوحيد v = w / np.linalg.norm(w)."
          },
          "tier3": {
            "en": "Compute eigenvalue using Rayleigh quotient: lam = float(v.T @ A @ v).",
            "ar": "احسب القيمة الذاتية بكسر رايلي: lam = float(v.T @ A @ v)."
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
            "en": "A 2x2 matrix R represents a pure 90-degree counterclockwise rotation of the plane. Does this transformation possess any real eigenvalues or real eigenvectors?",
            "ar": "تمثل مصفوفة R بحجم 2x2 دوراناً صافياً للمستوى بزاوية 90 درجة عكس عقارب الساعة. هل تمتلك هذه المصفوفة أي قيم ذاتية أو متجهات ذاتية حقيقية؟"
          },
          "options": [
            {
              "text": {
                "en": "No real eigenvalues or eigenvectors exist, because every single non-zero vector in the plane is rotated by 90 degrees away from its original line of action, making lambda * v impossible over the real numbers.",
                "ar": "لا توجد أي قيم أو متجهات ذاتية حقيقية، لأن كل متجه غير صفري في المستوى يدور بزاوية 90 درجة مبتعداً عن خط استقامته الأصلي، مما يجعل المعادلة lambda"
              },
              "correct": true,
              "explanation": {
                "en": "The characteristic polynomial is det(R - lambda I) = lambda^2 + 1 = 0, whose roots are purely imaginary: lambda = ±i. Geometrically, no real direction remains invariant under a 90-degree twist.",
                "ar": "كثير الحدود المميز هو lambda^2 + 1 = 0، وجذوره تخيلية بحتة: lambda = ±i. وهندسياً، لا يوجد أي اتجاه حقيقي يصمد أمام الدوران بزاوية 90 درجة."
              }
            },
            {
              "text": {
                "en": "Yes, lambda = 1 with eigenvectors along the x and y axes.",
                "ar": "نعم، القيمة الذاتية 1 والمتجهات الذاتية ممتدة على المحورين السيني والصادي.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A vector along the x-axis (1, 0) is rotated to the y-axis (0, 1), which is perpendicular, not a scalar multiple.",
                "ar": "المتجه على المحور السيني يدور إلى الصادي، وهو اتجاه متعامد وليس مضاعفاً قياسياً."
              }
            },
            {
              "text": {
                "en": "Yes, lambda = -1 because rotating reverses the orientation.",
                "ar": "نعم، القيمة الذاتية -1 لأن الدوران يعكس الاتجاهية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A 90-degree rotation preserves orientation (det = +1) and does not reverse vectors (that would require a 180-degree rotation).",
                "ar": "الدوران بـ 90 درجة يحافظ على الاتجاهية ولا يعكس المتجهات (الانعكاس يتطلب دوراناً بـ 180 درجة)."
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
    "titleAr": "المبرهنة الطيفية والتفكيك القيمي الذاتي المتناظر",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "A general square matrix can have messy complex eigenvalues and slanted, non-perpendicular eigenvectors.",
      "ar": "يمكن للمصفوفة المربعة العامة أن تمتلك قيماً ذاتية عقدية معقدة ومتجهات ذاتية مائلة غير متعامدة."
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
          "en": "A general square matrix can have messy complex eigenvalues and slanted, non-perpendicular eigenvectors. But what happens when a matrix is symmetric ($\\mathbf{A} = \\mathbf{A}^T$, meaning entry $A_{ij} = A_{ji}$)?\n\nSymmetry in linear algebra is like a physical law of conservation. The Spectral Theorem is one of the crowning triumphs of mathematics: it guarantees that for any symmetric matrix, every single eigenvalue is guaranteed to be a pure real number, and you can always find a complete set of eigenvectors that are strictly mutually perpendicular (orthogonal) to each other!\n\nGeometrically, a symmetric transformation does not shear or skew space unevenly. It is equivalent to a pure rotation into an aligned coordinate frame ($\\mathbf{Q}^T$), stretching space along those mutually perpendicular axes by factors $\\lambda_i$ ($\\mathbf{\\Lambda}$), and rotating back ($\\mathbf{Q}$). In data science, every covariance matrix $\\mathbf{\\Sigma} = \\frac{1}{N}\\mathbf{X}^T\\mathbf{X}$ is symmetric, which is the foundational mathematical reason Principal Component Analysis (PCA) works.",
          "ar": "يمكن للمصفوفة المربعة العامة أن تمتلك قيماً ذاتية عقدية معقدة ومتجهات ذاتية مائلة غير متعامدة. ولكن ماذا يحدث عندما تكون المصفوفة متناظرة تماماً ($\\mathbf{A} = \\mathbf{A}^T$، أي أن $A_{ij} = A_{ji}$ عبر القطر الرئيسي)؟\n\nالتناظر في الجبر الخطي يشبه قوانين الانحفاظ في الفيزياء. تُعد المبرهنة الطيفية (Spectral Theorem) إحدى أعظم مفاخر الرياضيات عبر العصور؛ إذ تضمن أنه لأي مصفوفة متناظرة حقيقية، تكون كافة قيمها الذاتية أعداداً حقيقية بحتة دون أي جذور تخيلية، ويمكن دائماً العثور على مجموعة كاملة من المتجهات الذاتية المتعامدة تماماً (بزاوية $90^\\circ$) مثنى مثنى!\n\nهندسياً، يعني هذا أن التحويل المتناظر لا يُميل الفضاء بشكل غير متناسق؛ بل هو معادل تماماً لدوران الفضاء إلى محاوره الطبيعية ($\\mathbf{Q}^T$)، ثم شد الفضاء على طول تلك المحاور المتعامدة بعوامل التمدد $\\lambda_i$ ($\\mathbf{\\Lambda}$)، ثم إعادته بالدوران المعاكس ($\\mathbf{Q}$). وفي علم البيانات، فإن مصفوفة التغاير $\\mathbf{\\Sigma} = \\frac{1}{N}\\mathbf{X}^T\\mathbf{X}$ متناظرة دائماً، وهو السبب الرياضي الجوهري لنجاح تحليل المكونات الرئيسية (PCA)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A} \\in \\mathbb{R}^{n \\times n}, \\quad \\mathbf{A} = \\mathbf{A}^T \\implies \\mathbf{A} = \\mathbf{Q} \\mathbf{\\Lambda} \\mathbf{Q}^T = \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T",
        "formulaNote": {
          "en": "The Spectral Theorem guarantees that any real symmetric matrix admits purely real eigenvalues and an orthonormal basis of mutually perpendicular eigenvectors.",
          "ar": "تضمن المبرهنة الطيفية أن أي مصفوفة متناظرة حقيقية تمتلك قيماً ذاتية حقيقية بالكامل وأساساً متعامداً من المتجهات الذاتية المتعامدة مثنى مثنى."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\mathbf{A} = \\mathbf{A}^T: The symmetry condition; the matrix equals its own transpose.\n- \\mathbf{Q}: An orthogonal matrix whose columns are the mutually perpendicular unit eigenvectors ($\\mathbf{Q}^T \\mathbf{Q} = \\mathbf{I}$).\n- \\mathbf{\\Lambda} = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n): The diagonal matrix containing the purely real eigenvalues.\n- \\mathbf{Q}^T: The inverse transformation of $\\mathbf{Q}$; because $\\mathbf{Q}$ is orthogonal, its inverse is simply its transpose ($\\mathbf{Q}^{-1} = \\mathbf{Q}^T$).\n- \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T: The spectral decomposition; represents matrix $\\mathbf{A}$ as a weighted sum of rank-1 orthogonal projection operators.",
          "ar": "- \\mathbf{A} = \\mathbf{A}^T: شرط التناظر؛ المصفوفة تطابق منقولها تماماً حول القطر الرئيسي.\n- \\mathbf{Q}: مصفوفة متعامدة تشكل أعمدتها متجهات الوحدة الذاتية المتعامدة مثنى مثنى (حيث $\\mathbf{Q}^T \\mathbf{Q} = \\mathbf{I}$).\n- \\mathbf{\\Lambda} = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n): مصفوفة قطرية تضم القيم الذاتية الحقيقية البحتة.\n- \\mathbf{Q}^T: معكوس المصفوفة $\\mathbf{Q}$؛ ولأنها مصفوفة متعامدة فإن معكوسها يطابق منقولها ($\\mathbf{Q}^{-1} = \\mathbf{Q}^T$).\n- \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T: التفكيك الطيفي؛ يعبر عن المصفوفة كمجموع موزون لمؤثرات إسقاط متعامدة من الرتبة 1."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-least-squares-approximation",
          "starterCode": "import numpy as np\n\ndef spectral_reconstruction_2d(Q: np.ndarray, lambdas: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Reconstruct a 2x2 symmetric matrix from its spectral decomposition A = Q Lambda Q^T.\n    \n    Parameters\n    ----------\n    Q : np.ndarray of shape (2, 2)\n        Orthogonal matrix of eigenvectors.\n    lambdas : np.ndarray of shape (2,)\n        Real eigenvalues [lambda_1, lambda_2].\n        \n    Returns\n    -------\n    np.ndarray of shape (2, 2)\n        Reconstructed symmetric matrix A.\n    \"\"\"\n    # Step 1: Form diagonal eigenvalue matrix Lambda = np.diag(lambdas)\n    # Lambda = ...\n    \n    # Step 2: Compute matrix product Q @ Lambda @ Q.T\n    # A = ...\n    \n    # Step 3: Return reconstructed symmetric matrix\n    # return A\n    pass",
          "testCases": [
            {
              "input": "spectral_reconstruction_2d(np.eye(2), np.array([3.0, 5.0]))",
              "expected": "array([[3., 0.],\n       [0., 5.]])"
            },
            {
              "input": "spectral_reconstruction_2d(np.array([[0.0, 1.0], [1.0, 0.0]]), np.array([2.0, 4.0]))",
              "expected": "array([[4., 0.],\n       [0., 2.]])"
            },
            {
              "input": "spectral_reconstruction_2d(np.array([[1.0, -1.0], [1.0, 1.0]]) / np.sqrt(2), np.array([5.0, 1.0]))",
              "expected": "array([[3., 2.],\n       [2., 3.]])"
            }
          ],
          "expectedOutput": "array([[3., 0.],\n       [0., 5.]])",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef spectral_reconstruction_2d(Q: np.ndarray, lambdas: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Reconstruct a 2x2 symmetric matrix from its spectral decomposition A = Q Lambda Q^T.\n    \n    Parameters\n    ----------\n    Q : np.ndarray of shape (2, 2)\n        Orthogonal matrix of eigenvectors.\n    lambdas : np.ndarray of shape (2,)\n        Real eigenvalues [lambda_1, lambda_2].\n        \n    Returns\n    -------\n    np.ndarray of shape (2, 2)\n        Reconstructed symmetric matrix A.\n    \"\"\"\n    # Step 1: Form diagonal eigenvalue matrix Lambda = np.diag(lambdas)\n    # Lambda = ...\n    \n    # Step 2: Compute matrix product Q @ Lambda @ Q.T\n    # A = ...\n    \n    # Step 3: Return reconstructed symmetric matrix\n    # return A\n    pass",
              "expectedOutput": "array([[3., 0.],\n       [0., 5.]])"
            }
          },
          "solution": "import numpy as np\n\ndef spectral_reconstruction_2d(Q: np.ndarray, lambdas: np.ndarray) -> np.ndarray:\n    Lambda = np.diag(lambdas)\n    A = Q @ Lambda @ Q.T\n    return np.asarray(A, dtype=float)"
        },
        "hints": {
          "tier1": {
            "en": "Construct diagonal matrix: Lambda = np.diag(lambdas).",
            "ar": "اصنع المصفوفة القطرية: Lambda = np.diag(lambdas)."
          },
          "tier2": {
            "en": "Compute A = Q @ Lambda @ Q.T.",
            "ar": "احسب A = Q @ Lambda @ Q.T."
          },
          "tier3": {
            "en": "Return float array: return np.asarray(A, dtype=float).",
            "ar": "أرجع المصفوفة: return np.asarray(A, dtype=float)."
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
            "en": "A sample covariance matrix Sigma = (1/N) * X^T @ X is calculated for a high-dimensional financial dataset. What does the Spectral Theorem guarantee about the principal component axes of this covariance matrix?",
            "ar": "حُسبت مصفوفة التغاير Sigma = (1/N) * X^T @ X لبيانات مالية عالية الأبعاد. ماذا تضمن المبرهنة الطيفية بشأن محاور المكونات الرئيسية لمصفوفة التغاير هذه؟"
          },
          "options": [
            {
              "text": {
                "en": "The principal component directions (eigenvectors) are guaranteed to be strictly mutually orthogonal, and all eigenvalues (variances) are guaranteed to be real and non-negative.",
                "ar": "محاور المكونات الرئيسية (المتجهات الذاتية) متعامدة مثنى مثنى بالضرورة، وكافة القيم الذاتية (التباينات) حقيقية وغير سالبة قطعاً.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Because X^T X is symmetric and positive semi-definite, the Spectral Theorem guarantees orthogonal real eigenvectors Q (orthogonal feature axes) and non-negative real eigenvalues lambda_i >= 0 representing variance along each component.",
                "ar": "نظراً لأن X^T X متناظرة وشبه موجبة التعريف، تضمن المبرهنة الطيفية متجهات ذاتية حقيقية متعامدة Q (محاور مستقلة) وقيماً ذاتية حقيقية غير سالبة lambda_i >= 0 تمثل التباين على طول كل مكون."
              }
            },
            {
              "text": {
                "en": "The eigenvectors are skewed at 45-degree angles and have complex imaginary components.",
                "ar": "المتجهات الذاتية مائلة بزوايا 45 درجة وتحتوي على مركبات تخيلية معقدة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The Spectral Theorem strictly rules out complex eigenvalues and non-orthogonal eigenvectors for symmetric matrices.",
                "ar": "المبرهنة الطيفية تنفي قطعاً وجود أي قيم تخيلية أو متجهات غير متعامدة للمصفوفات المتناظرة."
              }
            },
            {
              "text": {
                "en": "The covariance matrix cannot be diagonalized unless all original features are normally distributed.",
                "ar": "مصفوفة التغاير لا يمكن تقطيرها إلا إذا كانت كافة المتغيرات الأصلية موزعة توزيعاً طبيعياً.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The Spectral Theorem is a pure algebraic property of symmetric matrices; it requires zero distributional assumptions on the underlying data.",
                "ar": "المبرهنة الطيفية خاصية جبرية مطلقة للمصفوفات المتناظرة؛ ولا تتطلب أي افتراضات إحصائية حول توزيع البيانات."
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
      "en": "The Spectral Theorem is magnificent, but it has a massive limitation: it only works on square, symmetric matrices.",
      "ar": "المبرهنة الطيفية رائعة حقاً، لكنها تعاني من قيد خانق: فهي تعمل فقط على المصفوفات المربعة المتناظرة."
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
          "en": "The Spectral Theorem is magnificent, but it has a massive limitation: it only works on square, symmetric matrices. What if you have a rectangular data table with 10,000 customers and 50 movie ratings? A rectangular matrix cannot be symmetric; it does not even map a space back into itself!\n\nThe Singular Value Decomposition (SVD) is the undisputed superpower of linear algebra because it works on every single matrix that can ever exist: square or rectangular, full-rank or deficient, fat or tall. It is the universal master key of modern data science.\n\nGeometrically, imagine taking a unit sphere in your input space. When any linear transformation acts on it, it deforms that sphere into a hyper-ellipse in the output space. The SVD reveals the exact three physical stages of this metamorphosis: first, an orthogonal rotation in input space ($\\mathbf{V}^T$); second, stretching along the coordinate axes by singular values $\\sigma_i$ ($\\mathbf{\\Sigma}$); third, an orthogonal rotation in output space ($\\mathbf{U}$). By dropping the smallest singular values, SVD delivers optimal low-rank compression—compressing gigabyte images and power-ranking recommendation algorithms with minimal information loss.",
          "ar": "المبرهنة الطيفية رائعة حقاً، لكنها تعاني من قيد خانق: فهي تعمل فقط على المصفوفات المربعة المتناظرة. ماذا لو كان لديك جدول بيانات مستطيل يضم 10,000 عميل و50 تقييماً للأفلام؟ المصفوفة المستطيلة لا يمكن أن تكون متناظرة، بل إنها لا تنقل الفضاء إلى نفسه أصلاً!\n\nتفكيك القيم المفردة (SVD) هو الأداة الخارقة المطلقة في الجبر الخطي؛ لأنه يعمل على أي مصفوفة يمكن أن توجد في الكون دون أي استثناء: سواء كانت مربعة أو مستطيلة، تامة الرتبة أو ناقصة، عريضة أو طويلة. إنه المفتاح الذهبي الشامل لعلم البيانات والذكاء الاصطناعي الحديث.\n\nهندسياً، تخيل كرة وحدة مستديرة تماماً في فضاء المدخلات. عندما يؤثر عليها أي تحويل خطي، فإنه يشوه تلك الكرة ويحولها إلى قطع ناقص فائق (Hyper-ellipse) في فضاء المخرجات. يكشف SVD عن الأطوار الفيزيائية الثلاثة الدقيقة لهذا التحول: أولاً، دوران متعامد في فضاء المدخلات ($\\mathbf{V}^T$)؛ ثانياً، شد وتمديد على طول المحاور الإحداثية بقيم موجبة مرتبة تنازلياً تُدعى 'القيم المفردة' $\\sigma_i$ ($\\mathbf{\\Sigma}$)؛ ثالثاً، دوران متعامد في فضاء المخرجات ($\\mathbf{U}$). وعبر الاحتفاظ بأكبر القيم المفردة وإهمال الصغرى، يمنحنا SVD أفضل ضغط ممكن للبيانات والصور بأقل قدر من فقدان الجودة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A} \\in \\mathbb{R}^{m \\times n}, \\quad \\mathbf{A} = \\mathbf{U} \\mathbf{\\Sigma} \\mathbf{V}^T = \\sum_{i=1}^r \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T, \\quad \\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0",
        "formulaNote": {
          "en": "The SVD factors any matrix into an input rotation (V^T), coordinate axis scaling by singular values (Sigma), and an output rotation (U).",
          "ar": "يفكك SVD أي مصفوفة إلى دوران في فضاء المدخلات (V^T)، وتمدد إحداثي بالقيم المفردة (Sigma)، ودوران في فضاء المخرجات (U)."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n- \\mathbf{A} \\in \\mathbb{R}^{m \\times n}: Any arbitrary rectangular or square data matrix.\n- \\mathbf{U} \\in \\mathbb{R}^{m \\times m}: Left singular vectors; an orthogonal matrix whose columns are eigenvectors of $\\mathbf{A}\\mathbf{A}^T$, spanning the output space.\n- \\mathbf{\\Sigma} \\in \\mathbb{R}^{m \\times n}: Diagonal matrix of non-negative singular values $\\sigma_i = \\sqrt{\\lambda_i(\\mathbf{A}^T\\mathbf{A})}$, sorted in descending order.\n- \\mathbf{V}^T \\in \\mathbb{R}^{n \\times n}: Right singular vectors; an orthogonal matrix whose rows are eigenvectors of $\\mathbf{A}^T\\mathbf{A}$, spanning the input space.\n- \\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T: The truncated Eckart-Young rank-$k$ approximation, provably optimal under Frobenius and spectral norms.",
          "ar": "- \\mathbf{A} \\in \\mathbb{R}^{m \\times n}: أي مصفوفة بيانات مستطيلة أو مربعة دون استثناء.\n- \\mathbf{U} \\in \\mathbb{R}^{m \\times m}: المتجهات المفردة اليسرى؛ مصفوفة متعامدة تشكل أعمدتها المتجهات الذاتية لـ $\\mathbf{A}\\mathbf{A}^T$ وتغطي فضاء المخرجات.\n- \\mathbf{\\Sigma} \\in \\mathbb{R}^{m \\times n}: مصفوفة شبه قطرية تضم القيم المفردة غير السالبة $\\sigma_i = \\sqrt{\\lambda_i(\\mathbf{A}^T\\mathbf{A})}$ مرتبة تنازلياً.\n- \\mathbf{V}^T \\in \\mathbb{R}^{n \\times n}: المتجهات المفردة اليمنى؛ مصفوفة متعامدة تشكل صفوفها المتجهات الذاتية لـ $\\mathbf{A}^T\\mathbf{A}$ وتغطي فضاء المدخلات.\n- \\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T: تقريب إيكارت-يونغ المقتطع من الرتبة $k$، والمثبت رياضياً كأفضل تقريب ممكن تحت معيار فروبينيوس."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-eigenvalues-eigenvectors",
          "starterCode": "import numpy as np\n\ndef svd_rank_k_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute Eckart-Young optimal rank-k approximation and retained energy ratio.\n    \n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Input data matrix.\n    k : int\n        Target approximation rank (1 <= k <= min(M, N)).\n        \n    Returns\n    -------\n    tuple[np.ndarray, float]\n        A_k: Optimal rank-k reconstructed matrix of shape (M, N).\n        energy_ratio: Fraction of variance retained (sum top-k sigma^2 / sum all sigma^2).\n    \"\"\"\n    # Step 1: Compute SVD via np.linalg.svd(A, full_matrices=False)\n    # U, S, Vt = ...\n    \n    # Step 2: Truncate to top k components: Uk = U[:, :k], Sk = S[:k], Vtk = Vt[:k, :]\n    # Uk = ...\n    # Sk = ...\n    # Vtk = ...\n    \n    # Step 3: Reconstruct A_k = Uk @ np.diag(Sk) @ Vtk and compute energy ratio\n    # A_k = ...\n    # energy = np.sum(Sk ** 2) / np.sum(S ** 2)\n    # return A_k, float(energy)\n    pass",
          "testCases": [
            {
              "input": "round(svd_rank_k_approx(np.array([[3.0, 0.0], [0.0, 4.0]]), 1)[1], 2)",
              "expected": "0.64"
            },
            {
              "input": "round(svd_rank_k_approx(np.array([[1.0, 2.0], [2.0, 4.0]]), 1)[1], 2)",
              "expected": "1.0"
            },
            {
              "input": "round(svd_rank_k_approx(np.eye(4), 2)[1], 2)",
              "expected": "0.5"
            }
          ],
          "expectedOutput": "0.64",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef svd_rank_k_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute Eckart-Young optimal rank-k approximation and retained energy ratio.\n    \n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Input data matrix.\n    k : int\n        Target approximation rank (1 <= k <= min(M, N)).\n        \n    Returns\n    -------\n    tuple[np.ndarray, float]\n        A_k: Optimal rank-k reconstructed matrix of shape (M, N).\n        energy_ratio: Fraction of variance retained (sum top-k sigma^2 / sum all sigma^2).\n    \"\"\"\n    # Step 1: Compute SVD via np.linalg.svd(A, full_matrices=False)\n    # U, S, Vt = ...\n    \n    # Step 2: Truncate to top k components: Uk = U[:, :k], Sk = S[:k], Vtk = Vt[:k, :]\n    # Uk = ...\n    # Sk = ...\n    # Vtk = ...\n    \n    # Step 3: Reconstruct A_k = Uk @ np.diag(Sk) @ Vtk and compute energy ratio\n    # A_k = ...\n    # energy = np.sum(Sk ** 2) / np.sum(S ** 2)\n    # return A_k, float(energy)\n    pass",
              "expectedOutput": "0.64"
            }
          },
          "solution": "import numpy as np\n\ndef svd_rank_k_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    U, S, Vt = np.linalg.svd(A, full_matrices=False)\n    k = max(1, min(k, len(S)))\n    Uk = U[:, :k]\n    Sk = S[:k]\n    Vtk = Vt[:k, :]\n    A_k = Uk @ np.diag(Sk) @ Vtk\n    total_energy = float(np.sum(S ** 2))\n    retained_energy = float(np.sum(Sk ** 2)) / total_energy if total_energy > 0 else 1.0\n    return A_k, float(retained_energy)"
        },
        "hints": {
          "tier1": {
            "en": "Use U, S, Vt = np.linalg.svd(A, full_matrices=False) to obtain economic SVD.",
            "ar": "استخدم U, S, Vt = np.linalg.svd(A, full_matrices=False) للحصول على SVD المدمج."
          },
          "tier2": {
            "en": "Slice the top k components: Uk = U[:, :k], Sk = S[:k], Vtk = Vt[:k, :].",
            "ar": "اقتطع أول k مركبة: Uk = U[:, :k], Sk = S[:k], Vtk = Vt[:k, :]."
          },
          "tier3": {
            "en": "Reconstruct: A_k = Uk @ np.diag(Sk) @ Vtk. Energy is np.sum(Sk**2) / np.sum(S**2).",
            "ar": "أعد البناء: A_k = Uk @ np.diag(Sk) @ Vtk. ونسبة الطاقة هي مجموع مربعات Sk مقسوماً على مجموع مربعات S."
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
            "en": "According to the fundamental Eckart-Young-Mirsky Theorem, if you truncate the SVD of matrix A to its top k singular values producing A_k, how does A_k compare to ANY other matrix B of rank at most k?",
            "ar": "وفقاً لمبرهنة إيكارت-يونغ-ميرسكي الأساسية، إذا قمت باقتطاع SVD للمصفوفة A عند أول k قيمة مفردة لتنتج A_k، فكيف تقارن A_k بأي مصفوفة أخرى B في العالم رتبتها k كحد أقصى؟"
          },
          "options": [
            {
              "text": {
                "en": "A_k is mathematically proven to achieve the minimal possible approximation error ||A - B|| under both the Frobenius norm and spectral L2 norm among ALL possible rank-k matrices.",
                "ar": "ثبت رياضياً أن A_k تحقق أدنى خطأ تقريب ممكن ||A - B|| تحت كل من معيار فروبينيوس ومعيار L2 الطيفي بين كافة المصفوفات الممكنة ذات الرتبة k.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The Eckart-Young theorem states that truncating the SVD gives the globally optimal low-rank projection in Hilbert space; no other linear compression technique can retain more energy with k components.",
                "ar": "تنص مبرهنة إيكارت-يونغ على أن اقتطاع SVD يمنح أفضل إسقاط منخفض الرتبة على الإطلاق؛ ولا يمكن لأي خوارزمية ضغط خطية أخرى أن تحتفظ بقدر من الطاقة والتباين أكبر مما يحتفظ به SVD باستخدام k مركبة."
              }
            },
            {
              "text": {
                "en": "A_k is an arbitrary heuristic approximation with no guaranteed optimality bounds.",
                "ar": "A_k هو مجرد تقريب تجريبي تقريبي دون أي ضمانات رياضية للمثالية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "SVD is exact and mathematically proven optimal; it is not a heuristic.",
                "ar": "تفكيك SVD دقيق ومثبت كحل أمثل مطلق وليس تقريباً تجريبياً."
              }
            },
            {
              "text": {
                "en": "A_k only minimizes error if the original matrix A was symmetric and non-negative.",
                "ar": "A_k يقلل الخطأ فقط إذا كانت المصفوفة الأصلية A متناظرة وغير سالبة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The power of Eckart-Young is that it holds universally for EVERY matrix, rectangular or square, signed or unsigned.",
                "ar": "تكمن قوة مبرهنة إيكارت-يونغ في أنها تنطبق على كل مصفوفة دون استثناء، سواء كانت مستطيلة أو مربعة."
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
      "en": "Imagine walking along a narrow mountain trail on a dark night toward an abandoned cabin.",
      "ar": "تخيل أنك تسير ليلاً في مسار جبلي ضيق متجهاً نحو كوخ مهجور في قمة التل. المفهوم التأسيسي لـ النهاية (Limit) في الرياضيات لا يكترث على..."
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
          "en": "Imagine walking along a narrow mountain trail on a dark night toward an abandoned cabin. The foundational concept of a **limit** does not care in the slightest about what happens *at* the cabin itself; it only cares about where your footsteps lead as you get *infinitely close* to the threshold. Even if a falling meteor struck the cabin and blasted the destination into a bottomless crater—an undefined singularity like the indeterminate form $0/0$—the limit still exists and equals the exact elevation of the rim, provided all trails approaching the rim converge steadily toward that exact same height.\n\nNow imagine examining a smooth mathematical curve through an ultra-high-magnification microscope. When you zoom into an infinitesimal neighborhood around coordinate $c$, the points do not jump, vanish, or teleport. **Continuity** simply means there are no sudden trapdoors, hidden cliffs, or quantum ruptures: the destination you arrive at is exactly where the journey promised it would be, satisfying $\\lim_{x \\to c} f(x) = f(c)$.\n\nIn the physical world, limits are how science transforms static snapshots into dynamic laws of motion. When a sports car speedometer reads $100\\text{ km/h}$ at the exact instant $t = 5.0\\text{ s}$, the distance traversed during that frozen instant is zero meters, and elapsed time is zero seconds ($0/0$). Instantaneous speed is physically meaningless as simple arithmetic; it exists exclusively as the limit of average velocity ratios $\\Delta s / \\Delta t$ over a vanishingly small window of time $\\Delta t \\to 0$.",
          "ar": "تخيل أنك تسير ليلاً في مسار جبلي ضيق متجهاً نحو كوخ مهجور في قمة التل. المفهوم التأسيسي لـ **النهاية** (Limit) في الرياضيات لا يكترث على الإطلاق بما يحدث *عند* الكوخ نفسه، بل يركز كلياً على الوجهة التي تقترب منها خطواتك كلما اقتربت اقتراباً متناهياً في الصغر من عتبته. حتى لو ضرب نيزك الكوخ وأحاله إلى فجوة سحيقة غير معرفة (مثل حالة عدم التعيين $0/0$)، فإن النهاية تظل موجودة وحقيقية وتساوي منسوب حافة الفجوة، طالما أن كل المسارات المؤدية إليها تتقارب بثبات نحو نفس الارتفاع تماماً.\n\nأما مفهوم **الاتصال** (Continuity)، فيعني بالمعنى الهندسي والحدسي غياب أي قفزات مفاجئة أو فجوات ممزقة أو انتقال آني على طول المسار. إذا وضعت سن قلمك على ورقة لرسم المنحنى، فإنك تستطيع رسمه بضربة واحدة دون الحاجة لرفع يدك عن الصفحة. الوجهة الفعلية للدالة عند النقطة تتطابق كلياً مع ما وعدت به رحلة الاقتراب اللانهائي: $\\lim_{x \\to c} f(x) = f(c)$.\n\nفي العالم الفيزيائي، تمثل النهايات الجسر الرياضي الوحيد القادر على فك لغز الحركة واللحظية. عندما يُشير عداد السرعة في سيارة سباق إلى $100\\text{ كم/س}$ في اللحظة الزمنية $t = 5.0\\text{ ث}$، فإن المسافة المقطوعة في تلك اللحظة المجمدة هي صفر والزمن المنقضي صفر ($0/0$). لا تكتسب السرعة اللحظية وجودها إلا كنهاية لنسب السرعات المتوسطة $\\Delta s / \\Delta t$ عبر نوافذ زمنية تتقلص بلا توقف نحو الصفر $\\Delta t \\to 0$."
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
          "en": "$$\nf \\text{ is continuous at } c \\iff \\lim_{x \\to c} f(x) = f(c)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $c$ | $\\mathbb{R}$ | Target coordinate on domain input axis | Center of domain exploration window |\n| $L$ | $\\mathbb{R}$ | Limiting target value on codomain output axis | Presumed horizontal convergence level |\n| $\\epsilon$ | $\\mathbb{R}_{> 0}$ | Arbitrarily tiny vertical error tolerance band | Challenge tolerance set by an adversary |\n| $\\delta$ | $\\mathbb{R}_{> 0}$ | Corresponding horizontal neighborhood radius | Response margin guaranteeing containment |\n| $0 < |x - c|$ | Condition | Punctured neighborhood excluding $x = c$ itself | Insulates the limit from whether $f(c)$ is defined |\n\nThe $(\\epsilon, \\delta)$ formulation is a rigorous mathematical duel: no matter how microscopically narrow an error corridor $(L - \\epsilon, L + \\epsilon)$ an adversary demands, you can always guarantee a horizontal strike zone $(c - \\delta, c + \\delta)$ that traps all function evaluations securely inside that corridor.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $c$ | $\\mathbb{R}$ | نقطة الإسناد على محور المدخلات | مركز نافذة الاستكشاف الأفقية $(c-\\delta, c+\\delta)$ |\n| $L$ | $\\mathbb{R}$ | القيمة المستهدفة على محور المخرجات | خط التقارب الأفقي المقترح للدالة |\n| $\\epsilon$ | $\\mathbb{R}_{> 0}$ | هامش تسامح رأسي متناهٍ في الصغر | هامش التحدي الرأسي المفروض: $|f(x) - L| < \\epsilon$ |\n| $\\delta$ | $\\mathbb{R}_{> 0}$ | نصف قطر جوار النطاق الأفقي | هامش الاستجابة الهندسي الضامن للبقاء داخل النطاق |\n| $0 < |x - c|$ | شرط متباينة | جوار مثقوب يستبعد النقطة $x = c$ نفسها | يعزل سلوك الاقتراب عما إذا كانت الدالة معرفة عند $c$ |\n\nتُعبر صياغة $(\\epsilon, \\delta)$ عن حوار رياضي محكم: مهما اختار المشكك نطاق خطأ رأسي فائق الضيق $(L-\\epsilon, L+\\epsilon)$ حول القيمة المستهدفة، فإنك قادر دوماً على تقديم نطاق أفقي $(c-\\delta, c+\\delta)$ يضمن احتواء جميع قيم الدالة داخل ذلك النطاق دون أي شذوذ.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-diagonalization-powers",
          "starterCode": "def richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:\n    \"\"\"\n    Compute 4th-order accurate numerical derivative using Richardson extrapolation.\n    Cancels the leading O(h^2) Taylor truncation error by combining step h and h/2.\n    \n    Parameters\n    ----------\n    f : Callable[[float], float]\n        Target scalar function.\n    x : float\n        Evaluation coordinate.\n    h : float\n        Base step size (default 0.1).\n        \n    Returns\n    -------\n    float\n        4th-order accurate derivative estimate.\n    \"\"\"\n    # Step 1: Compute central difference quotient with full step size h: (f(x+h) - f(x-h)) / (2*h)\n    # Step 2: Compute central difference quotient with half step size h/2: (f(x+h/2) - f(x-h/2)) / h\n    # Step 3: Apply Richardson combination: (4 * d2 - d1) / 3 to eliminate O(h^2) error\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "richardson_extrapolated_derivative(np.sin, 0.0, 0.1)",
              "expected": "1.0"
            },
            {
              "input": "round(richardson_extrapolated_derivative(lambda z: z**3, 2.0, 0.1), 2)",
              "expected": "12.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:\n    \"\"\"\n    Compute 4th-order accurate numerical derivative using Richardson extrapolation.\n    Cancels the leading O(h^2) Taylor truncation error by combining step h and h/2.\n    \n    Parameters\n    ----------\n    f : Callable[[float], float]\n        Target scalar function.\n    x : float\n        Evaluation coordinate.\n    h : float\n        Base step size (default 0.1).\n        \n    Returns\n    -------\n    float\n        4th-order accurate derivative estimate.\n    \"\"\"\n    # Step 1: Compute central difference quotient with full step size h: (f(x+h) - f(x-h)) / (2*h)\n    # Step 2: Compute central difference quotient with half step size h/2: (f(x+h/2) - f(x-h/2)) / h\n    # Step 3: Apply Richardson combination: (4 * d2 - d1) / 3 to eliminate O(h^2) error\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:\n    \"\"\"\n    Compute 4th-order accurate numerical derivative using Richardson extrapolation.\n    Cancels the leading O(h^2) Taylor truncation error by combining step h and h/2.\n    \n    Parameters\n    ----------\n    f : Callable[[float], float]\n        Target scalar function.\n    x : float\n        Evaluation coordinate.\n    h : float\n        Base step size (default 0.1).\n        \n    Returns\n    -------\n    float\n        4th-order accurate derivative estimate.\n    \"\"\"\n    # Step 1: Compute central difference quotient with full step size h: (f(x+h) - f(x-h)) / (2*h)\n    d1 = (f(x + h) - f(x - h)) / (2.0 * h)\n    \n    # Step 2: Compute central difference quotient with half step size h/2: (f(x+h/2) - f(x-h/2)) / h\n    d2 = (f(x + h / 2.0) - f(x - h / 2.0)) / h\n    \n    # Step 3: Apply Richardson combination: (4 * d2 - d1) / 3 to eliminate O(h^2) error\n    df_dx = (4.0 * d2 - d1) / 3.0\n    return float(df_dx)"
        },
        "hints": {
          "tier1": {
            "en": "Error convergence is only 2nd-order rather than 4th-order.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Using simple average `(d1 + d2) / 2` does not eliminate the leading $h^2$ Taylor coefficient.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Apply exact Richardson cancellation: `(4.0 * d2 - d1) / 3.0`.",
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
            "en": "A numerical simulation evaluating the scalar function $f(x) = \\frac{\\sin(x)}{x}$ encounters a division-by-zero error when evaluated directly at $x = 0$. However, analytical gradient calculations treat the function as smooth and continuous at the origin. What theoretical property justifies assigning $f(0) = 1.0$?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ النهايات، الاتصال، والجوار المتناهي في الصغر تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The limit is an empirical convention with no formal algebraic justification.",
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
                "en": "The punctured neighborhood $0 < |x - 0| < \\delta$ evaluates $f(x)$ for all $x \\ne 0$, where $\\sin(x)/x \\to 1.0$ smoothly, defining a removable discontinuity that is healed by setting $f(0) = 1.0$.",
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
                "en": "Floating-point standards dictate that any expression yielding $0/0$ defaults to $1.0$.",
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
                "en": "The function is fundamentally discontinuous at $x = 0$, so calculus cannot be applied in that neighborhood.",
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
    "id": "symmetric-matrices-spectral",
    "title": "The Derivative as Local Linearization & Tangent Slope",
    "titleAr": "المشتقة كتقريب خطي محلي وميل المماس",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Look at photographs of the curved Earth taken from lunar orbit: our planet is unmistakably a sphere.",
      "ar": "تأمل صور الأرض الملتقطة من مدار القمر: كوكبنا بلا شك كرة زرقاء مستديرة. ومع ذلك، عندما تخطو بقدميك على عشب ملعب كرة القدم، تشعر بأن الأرض..."
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
          "en": "Look at photographs of the curved Earth taken from lunar orbit: our planet is unmistakably a sphere. Yet when you walk across an athletic field, the grass beneath your feet feels completely, indisputably flat. Why? Because if you zoom in closely enough to any smooth, differentiable manifold, **the curvature vanishes and the curve becomes indistinguishable from a straight line**.\n\nThe **derivative** is the mathematical engine of this principle: it is the slope of that unique local tangent line. It answers a vital operational question: *\"If we zoom in with an infinite microscope around point $x_0$, what simple straight line best substitutes for the complex non-linear curve?\"* The derivative is not merely a rote symbolic formula; it is the optimal first-order linear approximation of local reality.\n\nIn machine learning and gradient optimization, every single weight update rests on this local linearization. When a neural network calculates a gradient step, it replaces the astronomically complex non-linear loss surface with a flat tangent plane, takes a confident step along the steepest descent direction of that plane, and recalculates the new tangent orientation.",
          "ar": "تأمل صور الأرض الملتقطة من مدار القمر: كوكبنا بلا شك كرة زرقاء مستديرة. ومع ذلك، عندما تخطو بقدميك على عشب ملعب كرة القدم، تشعر بأن الأرض مسطحة تماماً دون أي تقوس ملحوظ. لماذا؟ لأنك إذا قمت بتكبير أي منحنى أملس وقابل للاشتقاق بدرجة كافية، فإن **الانحناء يتلاشى تدريجياً ويصبح المنحنى مماثلاً لخط مستقيم**.\n\nالمشتقة (Derivative) هي التجسيد الرياضي الدقيق لهذه المعجزة الهندسية: إنها ميل ذلك الخط المماس المحلي الفريد. تجيب المشتقة عن سؤال عملياتي جوهري: *\"إذا قمنا بتكبير المنحنى بمجهر لانهائي حول النقطة $x_0$، فما هو الخط المستقيم البسيط الذي ينوب عن المنحنى غير الخطي المعقد بأعلى دقة ممكنة؟\"* المشتقة ليست مجرد قاعدة جبرية لحساب الرموز؛ بل هي أفضل تقريب خطي محلي للواقع.\n\nفي تعلم الآلة وخوارزميات التحسين، تعتمد كل خطوة لتحديث الأوزان على هذا التقريب الخطي. فعندما تحسب الشبكة العصبية خطوة الانحدار، فإنها تستبدل سطح الخسارة بالغ التعقيد بمستوٍ مماس محلي منبسط، وتتحرك بثقة في اتجاه الهبوط الأشد، ثم تعيد تقييم المماس عند النقطة الجديدة."
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
          "en": "$$\nf(x_0 + \\Delta x) = f(x_0) + f'(x_0)\\Delta x + \\mathcal{O}(\\Delta x^2) \\implies L(x) = f(x_0) + f'(x_0)(x - x_0)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $x_0$ | $\\mathbb{R}$ | Expansion center on domain axis | Anchor point where the tangent touches the curve |\n| $\\Delta x$ | $\\mathbb{R}$ | Input perturbation / horizontal step | Distance traveled away from the linearization center |\n| $f'(x_0)$ | $\\mathbb{R}$ | Tangent slope at expansion center | Multiplicative scaling factor relating input nudge to output change |\n| $L(x)$ | $\\mathbb{R}$ | Local linear approximation | Evaluates the tangent line height at any nearby query point |\n| $\\mathcal{O}(\\Delta x^2)$ | Error Term | Quadratic curvature remainder | Quantifies how rapidly the true curve pulls away from the tangent |\n\nThe tangent line $L(x)$ matches both the function's height $f(x_0)$ and its first-order velocity $f'(x_0)$. The approximation error $|f(x) - L(x)|$ contracts quadratically, meaning halving your step size reduces approximation error by a factor of four.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $x_0$ | $\\mathbb{R}$ | مركز التوسيع على محور المدخلات | نقطة الارتكاز التي يلامس عندها المماس المنحنى |\n| $\\Delta x$ | $\\mathbb{R}$ | الإزاحة الأفقية / خطوة المدخلات | المسافة المقطوعة بعيداً عن مركز التقريب الخطي |\n| $f'(x_0)$ | $\\mathbb{R}$ | ميل المماس عند مركز التوسيع | معامل التكبير الخطي الذي يربط إزاحة المدخلات باستجابة المخرجات |\n| $L(x)$ | $\\mathbb{R}$ | معادلة المماس الخطي المحلي | يحسب ارتفاع الخط المماس عند أي نقطة استعلام مجاورة |\n| $\\mathcal{O}(\\Delta x^2)$ | حد الخطأ | المتبقي التربيعي الناتج عن الانحناء | يقيس سرعة ابتعاد المنحنى الفعلي عن الخط المماس |\n\nيطابق الخط المماس $L(x)$ كلاً من منسوب الدالة $f(x_0)$ ومعدل تغيرها اللحظي $f'(x_0)$. يتقلص خطأ التقريب بمعدل تربيعي $\\mathcal{O}(\\Delta x^2)$، مما يعني أن تقليص مسافة الاستعلام بمقدار النصف يخفض خطأ التقدير بمقدار أربعة أضعاف.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-symmetric-matrices-spectral",
          "starterCode": "def linear_approximation_eval(\n    f: Callable[[np.ndarray], np.ndarray],\n    df: Callable[[float], float],\n    x0: float,\n    query_points: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Evaluate local tangent line approximation and pointwise absolute errors.\n    \n    Parameters\n    ----------\n    f : Callable\n        Vectorized target function.\n    df : Callable\n        Analytical derivative function evaluated at x0.\n    x0 : float\n        Linearization center point.\n    query_points : np.ndarray\n        Array of evaluation points of shape (N,).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        L : Tangent line values at query points, shape (N,).\n        errors : Absolute pointwise errors |f(x) - L(x)|, shape (N,).\n    \"\"\"\n    # Step 1: Compute tangent line values L(x) = f(x0) + df(x0) * (x - x0)\n    # Step 2: Evaluate exact function values on query points\n    # Step 3: Compute absolute approximation error |f(x) - L(x)|\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "L, err = linear_approximation_eval(np.exp, np.exp, 0.0, np.array([0.0, 0.1])); (float(L[0]), float(err[0]))",
              "expected": "(1.0, 0.0)"
            },
            {
              "input": "L, err = linear_approximation_eval(lambda x: x**2, lambda x: 2*x, 1.0, np.array([1.0])); float(L[0])",
              "expected": "1.0"
            }
          ],
          "expectedOutput": "(1.0, 0.0)",
          "variants": {
            "python": {
              "starterCode": "def linear_approximation_eval(\n    f: Callable[[np.ndarray], np.ndarray],\n    df: Callable[[float], float],\n    x0: float,\n    query_points: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Evaluate local tangent line approximation and pointwise absolute errors.\n    \n    Parameters\n    ----------\n    f : Callable\n        Vectorized target function.\n    df : Callable\n        Analytical derivative function evaluated at x0.\n    x0 : float\n        Linearization center point.\n    query_points : np.ndarray\n        Array of evaluation points of shape (N,).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        L : Tangent line values at query points, shape (N,).\n        errors : Absolute pointwise errors |f(x) - L(x)|, shape (N,).\n    \"\"\"\n    # Step 1: Compute tangent line values L(x) = f(x0) + df(x0) * (x - x0)\n    # Step 2: Evaluate exact function values on query points\n    # Step 3: Compute absolute approximation error |f(x) - L(x)|\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "(1.0, 0.0)"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef linear_approximation_eval(\n    f: Callable[[np.ndarray], np.ndarray],\n    df: Callable[[float], float],\n    x0: float,\n    query_points: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Evaluate local tangent line approximation and pointwise absolute errors.\n    \n    Parameters\n    ----------\n    f : Callable\n        Vectorized target function.\n    df : Callable\n        Analytical derivative function evaluated at x0.\n    x0 : float\n        Linearization center point.\n    query_points : np.ndarray\n        Array of evaluation points of shape (N,).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        L : Tangent line values at query points, shape (N,).\n        errors : Absolute pointwise errors |f(x) - L(x)|, shape (N,).\n    \"\"\"\n    # Step 1: Compute tangent line values L(x) = f(x0) + df(x0) * (x - x0)\n    L = float(f(np.array([x0]))[0]) + float(df(x0)) * (query_points - x0)\n    \n    # Step 2: Evaluate exact function values on query points\n    f_vals = f(query_points)\n    \n    # Step 3: Compute absolute approximation error |f(x) - L(x)|\n    errors = np.abs(f_vals - L)\n    \n    return L, errors"
        },
        "hints": {
          "tier1": {
            "en": "`ValueError: operands could not be broadcast together` or scalar result returned.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Converting `query_points` into a scalar float or iterating in a loop.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Keep `query_points` as a NumPy array: `f(x0) + df(x0) * (query_points - x0)`.",
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
            "en": "A robotics engineer uses the tangent line $L(x) = f(x_0) + f'(x_0)(x - x_0)$ to predict the instantaneous trajectory of a robotic actuator across a timestep $\\Delta x$. If the actuator moves twice as far ($\\Delta x \\to 2\\Delta x$), how does the truncation error $|f(x) - L(x)|$ behave for a smooth non-linear curve?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ المشتقة كتقريب خطي محلي وميل المماس تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The error doubles linearly, scaling as $2\\Delta x$.",
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
                "en": "The error quadruples, scaling quadratically as $\\mathcal{O}(\\Delta x^2)$ according to the Taylor remainder theorem.",
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
                "en": "The error remains identical because the tangent slope $f'(x_0)$ is a fixed constant.",
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
                "en": "The error drops to zero because derivatives improve with larger step horizons.",
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
    "id": "singular-value-decomposition",
    "title": "The Chain Rule as Compositional Scaling & Flow of Sensitivities",
    "titleAr": "قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine three interlocking brass gears in a precision mechanical clockwork: Gear $A$ drives Gear $B$, which in turn drives Gear $C$.",
      "ar": "تخيل ثلاثة تروس نحاسية متعشقة بدقة داخل ساعة ميكانيكية: الترس $A$ يدير الترس $B$، والذي بدوره يدير الترس $C$."
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
          "en": "Imagine three interlocking brass gears in a precision mechanical clockwork: Gear $A$ drives Gear $B$, which in turn drives Gear $C$. \n- When you turn Gear $A$ by 1 revolution, Gear $B$ completes 3 revolutions (the sensitivity ratio $\\frac{dB}{dA} = 3$).\n- When Gear $B$ turns by 1 revolution, Gear $C$ completes 5 revolutions (the sensitivity ratio $\\frac{dC}{dB} = 5$).\n\nNow ask yourself: if you turn Gear $A$ by 1 revolution, how many revolutions does Gear $C$ execute? Without hesitation, you multiply the ratios: $3 \\times 5 = 15$ revolutions! The end-to-end sensitivity is simply the product of the intermediate gear ratios: $\\frac{dC}{dA} = \\frac{dC}{dB} \\cdot \\frac{dB}{dA}$.\n\nThe **Chain Rule** is nothing more than this gear-ratio multiplication applied to mathematical functions chained in series. In deep learning architectures, every neural network is a deep compositional pipeline of functions: inputs feed into hidden layers, which feed into activations, which feed into downstream loss functions. The chain rule governs how credit and blame (sensitivities) propagate backward through the computational graph.",
          "ar": "تخيل ثلاثة تروس نحاسية متعشقة بدقة داخل ساعة ميكانيكية: الترس $A$ يدير الترس $B$، والذي بدوره يدير الترس $C$.\n- عندما تدير الترس $A$ دورة واحدة كاملة، يدور الترس $B$ بمقدار 3 دورات (نسبة الحساسية $\\frac{dB}{dA} = 3$).\n- وعندما يدور الترس $B$ دورة واحدة كاملة، يدور الترس $C$ بمقدار 5 دورات (نسبة الحساسية $\\frac{dC}{dB} = 5$).\n\nوالآن، إذا أدرت الترس $A$ دورة واحدة، فكم دورة سيدور الترس $C$؟ دون أدنى تردد، ستقوم بضرب نسب التروس معاً: $3 \\times 5 = 15$ دورة! الحساسية الإجمالية للمنظومة هي حاصل ضرب نسب الحساسيات الوسيطة: $\\frac{dC}{dA} = \\frac{dC}{dB} \\cdot \\frac{dB}{dA}$.\n\nقاعدة السلسلة (Chain Rule) ليست سوى هذا المبدأ الميكانيكي البسيط مطبقاً على الدوال الرياضية المركبة المتتالية. في الشبكات العصبية العميقة، يمثل النموذج بأكمله سلسلة طويلة من الدوال المتراكبة: تتدفق المدخلات إلى الطبقات الخطية، ثم إلى دوال التنشيط غير الخطية، وصولاً إلى دالة الخسارة النهائية. تضبط قاعدة السلسلة كيفية تدفق إشارات التدرج إلى الوراء عبر الرسم البياني الحسابي لتحديث الأوزان بدقة متناهية."
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
          "en": "$$\n\\frac{dz}{dx_1} = \\prod_{i=1}^{k-1} \\frac{dx_{i+1}}{dx_i} = \\frac{dx_k}{dx_{k-1}} \\frac{dx_{k-1}}{dx_{k-2}} \\cdots \\frac{dx_2}{dx_1}\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $x$ | $\\mathbb{R}$ | Primary input coordinate | Initial dial adjusted by the experimenter |\n| $u = g(x)$ | $\\mathbb{R}$ | Intermediate hidden state | Output of inner function, input to outer function |\n| $y = f(u)$ | $\\mathbb{R}$ | Final scalar output | Target response quantity |\n| $g'(x)$ | $\\mathbb{R}$ | Local stretching factor of the inner map | First gear ratio in the compositional sequence |\n| $f'(g(x))$ | $\\mathbb{R}$ | Local stretching factor of the outer map at state $u$ | Second gear ratio evaluated at the active state |\n| $\\frac{dy}{dx}$ | $\\mathbb{R}$ | End-to-end composite sensitivity | Compounded multiplicative gradient |\n\nA fatal beginner trap is writing $f'(x) \\cdot g'(x)$. The outer function $f$ never sees the original input $x$; it only receives the transformed state $g(x)$. The outer derivative must always be evaluated at the intermediate state $u = g(x)$.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $x$ | $\\mathbb{R}$ | متغير المدخلات الأصلي | المقبض الأولي الذي يتحكم به النموذج |\n| $u = g(x)$ | $\\mathbb{R}$ | الحالة الوسيطة الكامنة | مخرج الدالة الداخلية ومدخل الدالة الخارجية |\n| $y = f(u)$ | $\\mathbb{R}$ | المخرج النهائي للدالة المركبة | كمية الاستجابة النهائية المستهدفة |\n| $g'(x)$ | $\\mathbb{R}$ | معامل التمدد المحلي للدالة الداخلية | نسبة الترس الأول في مسار التركيب |\n| $f'(g(x))$ | $\\mathbb{R}$ | معامل التمدد للدالة الخارجية عند الحالة $u$ | نسبة الترس الثاني مقاسة عند الحالة النشطة $g(x)$ |\n| $\\frac{dy}{dx}$ | $\\mathbb{R}$ | الحساسية الإجمالية للمركب | حاصل ضرب التدرجات المتسلسلة |\n\nمن الأخطاء الكلاسيكية الشائعة كتابة $f'(x) \\cdot g'(x)$. الدالة الخارجية $f$ لا ترى المدخل الأصلي $x$ مطلقاً؛ بل تستقبل المخرج الوسيط $g(x)$. لذلك يجب دوماً تقييم مشتقة الدالة الخارجية عند النقطة الوسيطة $u = g(x)$.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-singular-value-decomposition",
          "starterCode": "import numpy as np\n\ndef composite_chain_rule(\n    x: np.ndarray,\n    w: float,\n    u: float,\n    b1: float,\n    b2: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute forward activation and backward chain rule sensitivity for a 2-layer pipeline:\n        z1 = u * x + b1\n        a1 = tanh(z1)\n        z2 = w * a1 + b2\n        y  = sigmoid(z2)\n        \n    Parameters\n    ----------\n    x : np.ndarray\n        Input batch array of shape (N,).\n    w, u, b1, b2 : float\n        Scalar weights and bias parameters.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        y : Output activation array, shape (N,).\n        dy_dx : Analytical derivative dy/dx across all samples, shape (N,).\n    \"\"\"\n    # Step 1: Forward pass through layer 1 linear transformation\n    z1 = u * x + b1\n    \n    # Step 2: Forward pass through hyperbolic tangent activation\n    a1 = np.tanh(z1)\n    \n    # Step 3: Forward pass through layer 2 linear transformation\n    z2 = w * a1 + b2\n    \n    # Step 4: Forward pass through output sigmoid activation\n    y = 1.0 / (1.0 + np.exp(-z2))\n    \n    # Step 5: Backward pass: compute local sensitivities via chain rule\n    # d(sigmoid)/dz2 = y * (1 - y)\n    dy_dz2 = y * (1.0 - y)\n    \n    # dz2/da1 = w\n    dz2_da1 = w\n    \n    # d(tanh)/dz1 = 1 - a1^2\n    da1_dz1 = 1.0 - a1 ** 2\n    \n    # dz1/dx = u\n    dz1_dx = u\n    \n    # Multiply all gear ratios together\n    dy_dx = dy_dz2 * dz2_da1 * da1_dz1 * dz1_dx\n    \n    return y, dy_dx",
          "testCases": [
            {
              "input": "y, dy = composite_chain_rule(np.array([0.0]), 1.0, 1.0, 0.0, 0.0); (float(y[0]), float(dy[0]))",
              "expected": "(0.5, 0.25)"
            },
            {
              "input": "y, dy = composite_chain_rule(np.array([0.0]), 2.0, 1.0, 0.0, 0.0); float(y[0])",
              "expected": "0.5"
            }
          ],
          "expectedOutput": "(0.5, 0.25)",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef composite_chain_rule(\n    x: np.ndarray,\n    w: float,\n    u: float,\n    b1: float,\n    b2: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute forward activation and backward chain rule sensitivity for a 2-layer pipeline:\n        z1 = u * x + b1\n        a1 = tanh(z1)\n        z2 = w * a1 + b2\n        y  = sigmoid(z2)\n        \n    Parameters\n    ----------\n    x : np.ndarray\n        Input batch array of shape (N,).\n    w, u, b1, b2 : float\n        Scalar weights and bias parameters.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        y : Output activation array, shape (N,).\n        dy_dx : Analytical derivative dy/dx across all samples, shape (N,).\n    \"\"\"\n    # Step 1: Forward pass through layer 1 linear transformation\n    z1 = u * x + b1\n    \n    # Step 2: Forward pass through hyperbolic tangent activation\n    a1 = np.tanh(z1)\n    \n    # Step 3: Forward pass through layer 2 linear transformation\n    z2 = w * a1 + b2\n    \n    # Step 4: Forward pass through output sigmoid activation\n    y = 1.0 / (1.0 + np.exp(-z2))\n    \n    # Step 5: Backward pass: compute local sensitivities via chain rule\n    # d(sigmoid)/dz2 = y * (1 - y)\n    dy_dz2 = y * (1.0 - y)\n    \n    # dz2/da1 = w\n    dz2_da1 = w\n    \n    # d(tanh)/dz1 = 1 - a1^2\n    da1_dz1 = 1.0 - a1 ** 2\n    \n    # dz1/dx = u\n    dz1_dx = u\n    \n    # Multiply all gear ratios together\n    dy_dx = dy_dz2 * dz2_da1 * da1_dz1 * dz1_dx\n    \n    return y, dy_dx",
              "expectedOutput": "(0.5, 0.25)"
            }
          },
          "solution": "import numpy as np\n\ndef composite_chain_rule(x: np.ndarray, w: float, u: float, b1: float, b2: float) -> tuple[np.ndarray, np.ndarray]:\n    z1 = u * x + b1\n    a1 = np.tanh(z1)\n    z2 = w * a1 + b2\n    y = 1.0 / (1.0 + np.exp(-z2))\n    dy_dz2 = y * (1.0 - y)\n    dz2_da1 = w\n    da1_dz1 = 1.0 - a1 ** 2\n    dz1_dx = u\n    dy_dx = dy_dz2 * dz2_da1 * da1_dz1 * dz1_dx\n    return y, dy_dx"
        },
        "hints": {
          "tier1": {
            "en": "Analytical gradient disagrees with numerical gradient by sign or scale.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Using $\\text{sech}^2(x)$ directly can overflow or recomputing $\\tanh(z_1)$ is redundant. Notice $\\frac{d}{dz}\\tanh(z) = 1 - \\tanh^2(z) = 1 - a_1^2$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Express local derivatives in terms of cached forward activations: `1.0 - a1**2` and `y * (1.0 - y)`.",
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
            "en": "A deep neural network contains 40 stacked layers where each activation function has a maximum local derivative of $|f'(z)| \\le 0.25$ (such as the standard sigmoid). When training via gradient descent, the early layers fail to learn entirely. Based on the chain rule, what is the mathematical root cause of this failure?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Exploding gradients caused by compounding large integer ratios across layers.",
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
                "en": "Vanishing gradients, because multiplying 40 consecutive factors bounded by $0.25$ scales as $(0.25)^{40} \\approx 8.3 \\times 10^{-25}$, decaying the backpropagated signal to machine epsilon.",
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
                "en": "Matrix singularities caused by non-invertible weight matrices.",
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
                "en": "Numerical overflow in the loss function's numerator.",
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
    "id": "limits-continuity-foundations",
    "title": "Second Derivatives, Concavity & Curvature",
    "titleAr": "المشتقة الثانية، التقعر، ومفهوم الانحناء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "If the first derivative tells you whether you are hiking uphill or downhill, what does the second derivative tell you? It tells you what is...",
      "ar": "إذا كانت المشتقة الأولى تُخبرك بما إذا كنت تصعد التل أم تهبطه، فماذا تُخبرك المشتقة الثانية؟ إنها تقيس ما يحدث لشدة الانحدار ذاتها: هل..."
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
          "en": "If the first derivative tells you whether you are hiking uphill or downhill, what does the **second derivative** tell you? It tells you what is happening to the steepness itself: is the slope accelerating upward into an insurmountable cliff, or is the terrain leveling out into a tranquil mountain meadow?\n\nImagine riding a high-speed roller coaster through a steep dip:\n- Your speedometer reads a steady $90\\text{ km/h}$ (the first derivative magnitude is constant).\n- Yet as the coaster reaches the bottom of the dip and swoops upward, you are slammed into your seat by immense crushing forces (positive second derivative).\nYou do not physically feel constant velocity; your body feels **acceleration and geometric curvature**.\n\nGeometrically, when the second derivative is strictly positive ($f''(x) > 0$), the slope is constantly increasing: the curve bends upward like a soup bowl that can hold water (**concave up / convex**). Any ball dropped onto the surface naturally rolls down to a stable, unique resting point. Conversely, when $f''(x) < 0$, the curve arcs downward like an umbrella shedding raindrops, turning any stationary peak into an unstable summit.",
          "ar": "إذا كانت المشتقة الأولى تُخبرك بما إذا كنت تصعد التل أم تهبطه، فماذا تُخبرك **المشتقة الثانية**؟ إنها تقيس ما يحدث لشدة الانحدار ذاتها: هل يزداد الميل حدة ليتحول إلى جرف صخري شاهق، أم ينبسط تدريجياً ليتحول إلى سهل مريح؟\n\nتخيل أنك تركب قطار الملاهي السريع وهو يهبط في منخفض حاد:\n- يُشير عداد السرعة إلى $90\\text{ كم/س}$ ثابتة (المشتقة الأولى ثابتة المقدار).\n- ومع ذلك، عند وصول القطار إلى قاع المنخفض وبدء صعوده، تشعر بقوة ضاغطة هائلة تشد جسدك بقوة نحو المقعد (المشتقة الثانية الموجبة).\nأنت لا تشعر بالسرعة المنتظمة؛ بل يشعر جسدك بـ **التسارع والانحناء الهندسي**.\n\nهندسياً، عندما تكون المشتقة الثانية موجبة تماماً ($f''(x) > 0$)، يتزايد الميل باستمرار: فينحني المنحنى إلى الأعلى كإناء حساء يحتفظ بالماء (**مقعر لأعلى / محدب**). أي كرة تسقط داخله تتدحرج تلقائياً لتستقر في القاع الثابت. أما عندما تكون المشتقة الثانية سالبة ($f''(x) < 0$)، فإن المنحنى ينحني إلى الأسفل كالمظلة التي تطرد قطرات المطر، مما يجعل أي قمة نقطة غير مستقرة."
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
          "en": "$$\n\\kappa(x) \\coloneqq \\frac{|f''(x)|}{\\left(1 + [f'(x)]^2\\right)^{3/2}} \\quad (\\text{Geometric Curvature})\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $f'(x)$ | $\\mathbb{R}$ | Slope of the tangent line | First-order velocity of the function |\n| $f''(x)$ | $\\mathbb{R}$ | Rate of change of the tangent slope | Measures local bending acceleration |\n| $\\kappa(x)$ | $\\mathbb{R}_{\\ge 0}$ | Intrinsic curvature: reciprocal of osculating circle radius ($1/R$) | Parameterization-independent bending rate |\n| $f''(c) > 0$ | Condition | Convex bowl curving upward | Certifies a stationary point $f'(c)=0$ as a strict local minimum |\n| $f''(c) < 0$ | Condition | Concave dome curving downward | Certifies a stationary point $f'(c)=0$ as a strict local maximum |\n\nThe central 3-point stencil $\\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}$ subtracts twice the center height from the sum of its neighbors. If the center is lower than the average of its neighbors, the result is positive, indicating an upward-curving valley.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $f'(x)$ | $\\mathbb{R}$ | ميل الخط المماس | السرعة اللحظية لتغير الدالة من الرتبة الأولى |\n| $f''(x)$ | $\\mathbb{R}$ | معدل تغير ميل المماس | يقيس تسارع الانحناء المحلي للمنحنى |\n| $\\kappa(x)$ | $\\mathbb{R}_{\\ge 0}$ | الانحناء الهندسي الجوهري: مقلوب نصف قطر دائرة التقبيل ($1/R$) | مقياس الانحناء المستقل عن المعاملات |\n| $f''(c) > 0$ | شرط رياضي | إناء محدب ينحني نحو الأعلى | يؤكد أن النقطة الحرجة $f'(c)=0$ هي نهاية صغرى محلية مستقرة |\n| $f''(c) < 0$ | شرط رياضي | قبة مقعرة تنحني نحو الأسفل | يؤكد أن النقطة الحرجة $f'(c)=0$ هي نهاية عظمى محلية |\n\nتعتمد صيغة الفروق المركزية ثلاثية النقاط $\\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}$ على طرح ضعف قيمة النقطة المركزية من مجموع جارتيها. إذا كانت النقطة المركزية أدنى من متوسط جيرانها، يكون الناتج موجباً، مما يثبت وجود قاع وادٍ ينحني لأعلى.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-limits-continuity-foundations",
          "starterCode": "def curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute second derivative and geometric curvature on interior nodes of a curve.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Array of 1D curve samples of shape (N,) with N >= 3.\n    dx : float\n        Uniform sample step spacing along horizontal axis.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        d2y : Second derivative values on interior nodes, shape (N - 2,).\n        curvature : Intrinsic geometric curvature kappa, shape (N - 2,).\n    \"\"\"\n    # Step 1: Compute central first derivative on interior nodes: (y[i+1] - y[i-1]) / (2*dx)\n    # Step 2: Compute central second derivative stencil: (y[i+1] - 2*y[i] + y[i-1]) / (dx^2)\n    # Step 3: Compute intrinsic curvature kappa = |d2y| / (1 + dy^2)^(1.5)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "d2y, kappa = curve_curvature(np.array([0.0, 1.0, 4.0, 9.0]), 1.0); float(d2y[0])",
              "expected": "2.0"
            },
            {
              "input": "d2y, kappa = curve_curvature(np.array([0.0, 2.0, 4.0, 6.0]), 1.0); float(kappa[0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "2.0",
          "variants": {
            "python": {
              "starterCode": "def curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute second derivative and geometric curvature on interior nodes of a curve.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Array of 1D curve samples of shape (N,) with N >= 3.\n    dx : float\n        Uniform sample step spacing along horizontal axis.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        d2y : Second derivative values on interior nodes, shape (N - 2,).\n        curvature : Intrinsic geometric curvature kappa, shape (N - 2,).\n    \"\"\"\n    # Step 1: Compute central first derivative on interior nodes: (y[i+1] - y[i-1]) / (2*dx)\n    # Step 2: Compute central second derivative stencil: (y[i+1] - 2*y[i] + y[i-1]) / (dx^2)\n    # Step 3: Compute intrinsic curvature kappa = |d2y| / (1 + dy^2)^(1.5)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2.0"
            }
          },
          "solution": "import numpy as np\n\ndef curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute second derivative and geometric curvature on interior nodes of a curve.\n    \n    Parameters\n    ----------\n    y : np.ndarray\n        Array of 1D curve samples of shape (N,) with N >= 3.\n    dx : float\n        Uniform sample step spacing along horizontal axis.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        d2y : Second derivative values on interior nodes, shape (N - 2,).\n        curvature : Intrinsic geometric curvature kappa, shape (N - 2,).\n    \"\"\"\n    # Step 1: Compute central first derivative on interior nodes: (y[i+1] - y[i-1]) / (2*dx)\n    dy = (y[2:] - y[:-2]) / (2.0 * dx)\n    \n    # Step 2: Compute central second derivative stencil: (y[i+1] - 2*y[i] + y[i-1]) / (dx^2)\n    d2y = (y[2:] - 2.0 * y[1:-1] + y[:-2]) / (dx ** 2)\n    \n    # Step 3: Compute intrinsic curvature kappa = |d2y| / (1 + dy^2)^(1.5)\n    curvature = np.abs(d2y) / ((1.0 + dy ** 2) ** 1.5)\n    \n    return d2y, curvature"
        },
        "hints": {
          "tier1": {
            "en": "Curvature is off by power of $dx$ or shape mismatch.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Dividing by `2.0 * dx` instead of `dx ** 2`. The second derivative stencil has dimension $\\Delta y / \\Delta x^2$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Use `(y[2:] - 2.0 * y[1:-1] + y[:-2]) / (dx ** 2)`.",
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
            "en": "An optimization algorithm locates a critical point $x^*$ where $f'(x^*) = 0$. Evaluating the second derivative yields $f''(x^*) = 0$. Can the algorithm safely declare $x^*$ a local minimum?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ المشتقة الثانية، التقعر، ومفهوم الانحناء تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Yes, because $f''(x^*) = 0$ proves the surface is completely flat and stable.",
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
                "en": "Yes, any critical point with non-negative second derivative is unconditionally a minimum.",
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
                "en": "No, the second derivative test is inconclusive; $x^*$ could be a minimum (like $f(x)=x^4$), a maximum (like $f(x)=-x^4$), or an inflection point (like $f(x)=x^3$). Higher-order derivatives must be examined.",
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
                "en": "No, because points with $f''(x^*) = 0$ are guaranteed to be local maxima.",
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
    "id": "derivative-tangent-slope",
    "title": "Taylor Series as Polynomial Approximation of Reality",
    "titleAr": "متسلسلة تايلور كتقريب حدودي للواقع",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Transcendental functions like $\\sin(x)$, $e^x$, and $\\ln(x)$ are computationally elusive: you cannot compute $\\cos(0.",
      "ar": "تُعد الدوال المتسامية مثل $\\sin(x)$ و $e^x$ و $\\ln(x)$ دوالاً عصية على الحساب الذهني المباشر؛ فلا يمكنك حساب $\\cos(0."
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
          "en": "Transcendental functions like $\\sin(x)$, $e^x$, and $\\ln(x)$ are computationally elusive: you cannot compute $\\cos(0.42)$ in your head using simple mental arithmetic. But polynomials—expressions built purely from addition and multiplication like $c_0 + c_1 x + c_2 x^2 + c_3 x^3$—are remarkably easy for both human brains and computer processors to evaluate in nanoseconds.\n\nA **Taylor series** is a master recipe for manufacturing an ultra-accurate polynomial twin of *any* smooth mathematical curve around an anchor point $a$:\n- **Degree 0:** Match the function's height: $P_0(x) = f(a)$.\n- **Degree 1:** Match its slope: $P_1(x) = f(a) + f'(a)(x-a)$.\n- **Degree 2:** Match its curvature: $P_2(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2$.\n- **Degree 3:** Match its rate of change of curvature (jerk), and so on.\n\nWith every derivative term you add, the polynomial embraces the true function over an increasingly wide neighborhood, like tailoring a bespoke suit that hugs every contour of a body. In machine learning, second-order Taylor approximations form the mathematical heart of Newton-Raphson optimization and Quasi-Newton (BFGS) solvers.",
          "ar": "تُعد الدوال المتسامية مثل $\\sin(x)$ و $e^x$ و $\\ln(x)$ دوالاً عصية على الحساب الذهني المباشر؛ فلا يمكنك حساب $\\cos(0.42)$ يدوياً بالاعتماد على الحساب البسيط فقط. لكن كثيرات الحدود—تلك التعبيرات المبنية حصرياً من عمليتي الجمع والضرب مثل $c_0 + c_1 x + c_2 x^2 + c_3 x^3$—هي أسهل ما يمكن لمعالجات الحواسيب حسابه في أجزاء من النانو ثانية.\n\n**متسلسلة تايلور** (Taylor Series) هي الوصفة الهندسية الكبرى لصناعة نسخة طبق الأصل من أي دالة رياضية ملساء حول نقطة ارتكاز $a$:\n- **الدرجة 0:** مطابقة منسوب الدالة: $P_0(x) = f(a)$.\n- **الدرجة 1:** مطابقة ميل المماس: $P_1(x) = f(a) + f'(a)(x-a)$.\n- **الدرجة 2:** مطابقة الانحناء: $P_2(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2$.\n- **الدرجة 3:** مطابقة معدل تغير الانحناء، وهكذا دواليك.\n\nمع كل حد إضافي تضيفه إلى المتسلسلة، يلتصق المنحنى التقريبي بالدالة الحقيقية عبر نطاق أوسع وأشمل، تماماً مثل تفصيل رداء يطابق كل انحناءات الجسم بدقة متناهية. في تعلم الآلة، تشكل تقريبات تايلور من الدرجة الثانية الأساس الرياضي المتين لخوارزميات نيوتن-رافسون وخوارزميات BFGS شبه النيوتنية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f(x) = \\sum_{k=0}^K \\frac{f^{(k)}(a)}{k!} (x - a)^k + R_K(x)",
        "formulaNote": {
          "en": "Core invariant for Taylor Series as Polynomial Approximation of Reality.",
          "ar": "الخاصية الرياضية الجوهرية لـ متسلسلة تايلور كتقريب حدودي للواقع."
        },
        "narrative": {
          "en": "$$\nR_K(x) = \\frac{f^{(K+1)}(\\xi)}{(K+1)!} (x - a)^{K+1} \\quad \\text{for some } \\xi \\in (a, x)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $a$ | $\\mathbb{R}$ | Expansion anchor center | Point where all derivative probes are evaluated |\n| $x - a$ | $\\mathbb{R}$ | Displacement offset from the center | Base variable of the power series expansion |\n| $f^{(k)}(a)$ | $\\mathbb{R}$ | $k$-th derivative of $f$ evaluated at point $a$ | Probes the $k$-th order geometric wiggle at the anchor |\n| $k!$ | Integer | Factorial normalization | Compensates for the power rule differentiation $(x^k)^{(k)} = k!$ |\n| $R_K(x)$ | $\\mathbb{R}$ | Lagrange remainder / truncation error | Quantifies rigorous error bound outside the anchor point |\n\nThe factorial denominator $k!$ grows with astronomical speed, rapidly overpowering $(x-a)^k$ and driving higher-order terms toward zero within the radius of convergence.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $a$ | $\\mathbb{R}$ | نقطة ارتكاز التوسيع | النقطة المرجعية التي تُقاس عندها كافة المشتقات |\n| $x - a$ | $\\mathbb{R}$ | مسافة الإزاحة عن المركز | المتغير الأساسي لمتسلسلة القوى |\n| $f^{(k)}(a)$ | $\\mathbb{R}$ | المشتقة من الرتبة $k$ للدالة عند النقطة $a$ | تقيس معدل التغير الهندسي من الدرجة $k$ عند الارتكاز |\n| $k!$ | عدد صحيح | مضروب العدد للتطبيع | يعوض التكرار الحسابي لقاعدة مشتقة القوة $(x^k)^{(k)} = k!$ |\n| $R_K(x)$ | $\\mathbb{R}$ | باقي لاغرانج / خطأ البتر | يضع حداً أعلى صارماً لخطأ التقريب خارج مركز الارتكاز |\n\nينمو مقام المضروب $k!$ بسرعة فلكية، مما يجعله يتفوق على قوى الإزاحة $(x-a)^k$ بسرعة، دافعاً الحدود العليا نحو الصفر داخل نصف قطر التقارب.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-derivative-tangent-slope",
          "starterCode": "import numpy as np\n\ndef taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Vectorized evaluation of degree-K Taylor polynomial across query points x.\n    Uses broadcasting and cumulative factorials to eliminate Python loops.\n    \n    Parameters\n    ----------\n    coeffs : np.ndarray\n        Array of derivatives [f(a), f'(a), ..., f^{(K)}(a)] of length K+1.\n    a : float\n        Expansion center coordinate.\n    x : np.ndarray\n        Query evaluation points of shape (N,).\n        \n    Returns\n    -------\n    np.ndarray\n        Taylor approximation values T_K(x) of shape (N,).\n    \"\"\"\n    k = np.arange(len(coeffs))\n    \n    # Step 1: Compute factorial normalizations [0!, 1!, 2!, ..., K!]\n    factorials = np.ones(len(coeffs), dtype=float)\n    if len(coeffs) > 1:\n        factorials[1:] = np.cumprod(np.arange(1, len(coeffs)))\n        \n    # Step 2: Normalize coefficients: coeffs[k] / k!\n    norm_coeffs = coeffs / factorials\n    \n    # Step 3: Compute displacement powers (x - a)^k via 2D broadcasting (N, K+1)\n    powers = (x[:, None] - a) ** k[None, :]\n    \n    # Step 4: Sum weighted power terms across degree axis\n    return np.sum(powers * norm_coeffs[None, :], axis=1)",
          "testCases": [
            {
              "input": "float(taylor_polynomial_series(np.array([1.0, 1.0, 1.0]), 0.0, np.array([0.0]))[0])",
              "expected": "1.0"
            },
            {
              "input": "float(taylor_polynomial_series(np.array([1.0, 2.0]), 0.0, np.array([2.0]))[0])",
              "expected": "5.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "import numpy as np\n\ndef taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Vectorized evaluation of degree-K Taylor polynomial across query points x.\n    Uses broadcasting and cumulative factorials to eliminate Python loops.\n    \n    Parameters\n    ----------\n    coeffs : np.ndarray\n        Array of derivatives [f(a), f'(a), ..., f^{(K)}(a)] of length K+1.\n    a : float\n        Expansion center coordinate.\n    x : np.ndarray\n        Query evaluation points of shape (N,).\n        \n    Returns\n    -------\n    np.ndarray\n        Taylor approximation values T_K(x) of shape (N,).\n    \"\"\"\n    k = np.arange(len(coeffs))\n    \n    # Step 1: Compute factorial normalizations [0!, 1!, 2!, ..., K!]\n    factorials = np.ones(len(coeffs), dtype=float)\n    if len(coeffs) > 1:\n        factorials[1:] = np.cumprod(np.arange(1, len(coeffs)))\n        \n    # Step 2: Normalize coefficients: coeffs[k] / k!\n    norm_coeffs = coeffs / factorials\n    \n    # Step 3: Compute displacement powers (x - a)^k via 2D broadcasting (N, K+1)\n    powers = (x[:, None] - a) ** k[None, :]\n    \n    # Step 4: Sum weighted power terms across degree axis\n    return np.sum(powers * norm_coeffs[None, :], axis=1)",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    k = np.arange(len(coeffs))\n    factorials = np.ones(len(coeffs), dtype=float)\n    if len(coeffs) > 1:\n        factorials[1:] = np.cumprod(np.arange(1, len(coeffs)))\n    norm_coeffs = coeffs / factorials\n    powers = (x[:, None] - a) ** k[None, :]\n    return np.sum(powers * norm_coeffs[None, :], axis=1)"
        },
        "hints": {
          "tier1": {
            "en": "Loop detected in submission or slow performance on large $N$.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Writing `for k in range(K)` incurs Python interpreter dispatch overhead.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Create 2D power matrix via 2D broadcasting: `powers = (x[:, None] - a) ** k[None, :]` and reduce along axis 1.",
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
            "en": "Second-order optimization methods (like Newton's method) minimize a local second-order Taylor model $P_2(x) = f(x_t) + f'(x_t)(x - x_t) + \\frac{1}{2} f''(x_t)(x - x_t)^2$ by jumping directly to its minimum: $x_{t+1} = x_t - \\frac{f'(x_t)}{f''(x_t)}$. Why does this converge quadratically faster near the optimum than standard gradient descent?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ متسلسلة تايلور كتقريب حدودي للواقع تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "Newton's method completely avoids evaluating the gradient.",
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
                "en": "By incorporating local curvature ($f''$), Newton's method adapts its step size to the terrain's bowl geometry, taking large steps when the bowl is flat and cautious steps when it is sharply curved.",
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
                "en": "Taylor series higher-order terms are guaranteed to be identically zero for all real-world loss functions.",
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
                "en": "The factorial denominator eliminates numerical roundoff errors on modern floating-point hardware.",
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
    "id": "differentiation-rules-chain",
    "title": "Multivariable Scalar Fields & Topographic Elevation Landscapes",
    "titleAr": "الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine hiking across a vast mountainous wilderness. At every geographic location you stand on, indexed by your GPS coordinates (latitude...",
      "ar": "تخيل أنك تخوض رحلة استكشافية في سلسلة جبال شاهقة. عند كل نقطة جغرافية تقف عليها، والمحددة بإحداثيات نظام GPS (خط العرض $x$، وخط الطول $y$)،..."
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
          "en": "Imagine hiking across a vast mountainous wilderness. At every geographic location you stand on, indexed by your GPS coordinates (latitude $x$, longitude $y$), there is a single physical number you can read on your altimeter: your **elevation above sea level** $z = f(x, y)$.\n\nThis assignment of a single scalar number to every coordinate in space is a **scalar field**. To represent this 3D landscape on a flat 2D hiking map, cartographers draw **contour lines** (level curves). A contour line connects all points that share the exact same elevation. If you walk strictly along a contour line, your elevation never changes by a single centimeter.\n\nWhere contour lines are tightly packed together like dense ripples, the mountain is a perilous sheer cliff; where contour lines are spaced broadly apart, the terrain is a gentle, relaxing meadow. In machine learning, the loss surface over two model weights $(w_1, w_2)$ is precisely a scalar field, and contour lines reveal the ravines and canyons through which our optimization algorithms must navigate.",
          "ar": "تخيل أنك تخوض رحلة استكشافية في سلسلة جبال شاهقة. عند كل نقطة جغرافية تقف عليها، والمحددة بإحداثيات نظام GPS (خط العرض $x$، وخط الطول $y$)، هناك قراءة رقمية واحدة تظهر على مقياس الارتفاع: **ارتفاعك عن مستوى سطح البحر** $z = f(x, y)$.\n\nهذا التعيين الذي يربط كل نقطة في الفضاء برقم قياسي وحيد يُسمى **الحقل العددي** (Scalar Field). ولتمثيل هذه التضاريس ثلاثية الأبعاد على خريطة ورقية مسطحة، يرسم الجغرافيون **خطوط الكنتور** (خطوط التسوية). يصل خط الكنتور بين كافة النقاط التي تتشارك نفس الارتفاع تماماً. إذا سرت بدقة على طول خط الكنتور، فلن يتغير ارتفاعك بمقدار سنتيمتر واحد صعوداً أو هبوطاً.\n\nعندما تتزاحم خطوط الكنتور وتتقارب بشدة، فهذا يعني أن التضاريس تشكل جرفاً صخرياً شديد الانحدار؛ وعندما تتباعد، فهذا يعني أن الأرض منبسطة وسهلة المسير. في تعلم الآلة، يمثل سطح دالة الخسارة عبر وزنين $(w_1, w_2)$ حقلاً عددياً حقيقياً، وتكشف خطوط الكنتور عن الأخاديد والوديان التي تتنقل خوارزميات التحسين عبرها."
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
          "en": "$$\n\\mathcal{L}_c(f) \\coloneqq \\left\\{ \\mathbf{x} \\in \\mathbb{R}^n \\;\\middle|\\; f(\\mathbf{x}) = c \\right\\} \\quad (\\text{Level Set / Contour Curve at Elevation } c)\n$$\n$$\n\\|\\nabla Z\\|_{i, j} = \\sqrt{ \\left( \\frac{\\partial Z}{\\partial x} \\right)^2 + \\left( \\frac{\\partial Z}{\\partial y} \\right)^2 }\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^n$ | Position vector in domain | Input coordinate representing parameter state |\n| $f(\\mathbf{x})$ | $\\mathbb{R}$ (Scalar) | Scalar quantity (elevation, loss, potential) | Objective value evaluated at state $\\mathbf{x}$ |\n| $\\mathcal{L}_c(f)$ | Submanifold of dim $n-1$ | Contour line (2D) or isosurface (3D) | Equipotential trajectory where $\\Delta f = 0$ |\n| $c$ | $\\mathbb{R}$ | Constant elevation slicing level | Slicing height intersecting the continuous surface |\n| $\\|\\nabla Z\\|$ | $\\mathbb{R}_{\\ge 0}$ | Gradient magnitude / slope steepness | Quantifies local surface steepness per unit step |\n\nLevel curves for different values of $c_1 \\ne c_2$ can never intersect on a single-valued surface, because a single coordinate cannot simultaneously possess two distinct elevations.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^n$ | متجه الإحداثيات في فضاء المدخلات | يمثل حالة المعاملات أو الموقع الجغرافي |\n| $f(\\mathbf{x})$ | $\\mathbb{R}$ | القيمة القياسية (ارتفاع، خسارة، طاقة) | قيمة الحقل المحسوبة عند الحالة $\\mathbf{x}$ |\n| $\\mathcal{L}_c(f)$ | متعدد شعب ذو بعد $n-1$ | خط كنتور (في بعدين) أو سطح تسوية (في 3 أبعاد) | مسار تساوي الجهد حيث يكون التغير $\\Delta f = 0$ |\n| $c$ | $\\mathbb{R}$ | مستوى شريحة الارتفاع الثابت | منسوب القطع الأفقي الذي يشطر السطح |\n| $\\|\\nabla Z\\|$ | $\\mathbb{R}_{\\ge 0}$ | مقدار التدرج / شدة الانحدار | يقيس شدة ميل التضاريس لكل وحدة مسافة |\n\nلا يمكن لخطوط الكنتور ذات القيم المختلفة $c_1 \\ne c_2$ أن تتقاطع أبداً في الحقول أحادية القيمة، إذ يستحيل منطقياً وفيزيائياً أن تمتلك نفس النقطة الجغرافية ارتفاعين مختلفين في نفس الوقت.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-differentiation-rules-chain",
          "starterCode": "def scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:\n    \"\"\"\n    Compute 2D spatial gradient magnitude matrix for interior grid nodes.\n    \n    Parameters\n    ----------\n    Z : np.ndarray\n        2D scalar field elevation matrix of shape (H, W) with H, W >= 3.\n    dx : float\n        Uniform grid step along column axis (x).\n    dy : float\n        Uniform grid step along row axis (y).\n        \n    Returns\n    -------\n    np.ndarray\n        Interior gradient magnitudes of shape (H - 2, W - 2).\n    \"\"\"\n    # Step 1: Central difference along column axis (x, axis 1): (Z[i, j+1] - Z[i, j-1]) / (2*dx)\n    # Step 2: Central difference along row axis (y, axis 0): (Z[i+1, j] - Z[i-1, j]) / (2*dy)\n    # Step 3: Compute Euclidean gradient norm sqrt((dz/dx)^2 + (dz/dy)^2)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "X, Y = np.meshgrid(np.linspace(0, 1, 5), np.linspace(0, 1, 5)); float(scalar_field_gradient_magnitude(3*X + 4*Y, 0.25, 0.25)[0, 0])",
              "expected": "5.0"
            },
            {
              "input": "Z = np.ones((4, 4)); float(scalar_field_gradient_magnitude(Z, 1.0, 1.0)[0, 0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "5.0",
          "variants": {
            "python": {
              "starterCode": "def scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:\n    \"\"\"\n    Compute 2D spatial gradient magnitude matrix for interior grid nodes.\n    \n    Parameters\n    ----------\n    Z : np.ndarray\n        2D scalar field elevation matrix of shape (H, W) with H, W >= 3.\n    dx : float\n        Uniform grid step along column axis (x).\n    dy : float\n        Uniform grid step along row axis (y).\n        \n    Returns\n    -------\n    np.ndarray\n        Interior gradient magnitudes of shape (H - 2, W - 2).\n    \"\"\"\n    # Step 1: Central difference along column axis (x, axis 1): (Z[i, j+1] - Z[i, j-1]) / (2*dx)\n    # Step 2: Central difference along row axis (y, axis 0): (Z[i+1, j] - Z[i-1, j]) / (2*dy)\n    # Step 3: Compute Euclidean gradient norm sqrt((dz/dx)^2 + (dz/dy)^2)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "import numpy as np\n\ndef scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:\n    \"\"\"\n    Compute 2D spatial gradient magnitude matrix for interior grid nodes.\n    \n    Parameters\n    ----------\n    Z : np.ndarray\n        2D scalar field elevation matrix of shape (H, W) with H, W >= 3.\n    dx : float\n        Uniform grid step along column axis (x).\n    dy : float\n        Uniform grid step along row axis (y).\n        \n    Returns\n    -------\n    np.ndarray\n        Interior gradient magnitudes of shape (H - 2, W - 2).\n    \"\"\"\n    # Step 1: Central difference along column axis (x, axis 1): (Z[i, j+1] - Z[i, j-1]) / (2*dx)\n    dz_dx = (Z[1:-1, 2:] - Z[1:-1, :-2]) / (2.0 * dx)\n    \n    # Step 2: Central difference along row axis (y, axis 0): (Z[i+1, j] - Z[i-1, j]) / (2*dy)\n    dz_dy = (Z[2:, 1:-1] - Z[:-2, 1:-1]) / (2.0 * dy)\n    \n    # Step 3: Compute Euclidean gradient norm sqrt((dz/dx)^2 + (dz/dy)^2)\n    grad_mag = np.sqrt(dz_dx ** 2 + dz_dy ** 2)\n    \n    return grad_mag"
        },
        "hints": {
          "tier1": {
            "en": "Shape mismatch `(H-2, W)` or axis confusion between $x$ and $y$.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "In NumPy indexing `Z[row, col]`, stepping in $x$ means changing the column index (axis 1: `Z[1:-1, 2:] - Z[1:-1, :-2]`).",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Slice axis 1 for $dx$: `(Z[1:-1, 2:] - Z[1:-1, :-2]) / (2*dx)` and axis 0 for $dy$: `(Z[2:, 1:-1] - Z[:-2, 1:-1]) / (2*dy)`.",
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
            "en": "During the inspection of a 2D neural network loss landscape, an engineer observes that the level contour curves form highly elongated, needle-thin concentric ellipses with major axis aligned along $w_1$ and minor axis along $w_2$. What does this geometric configuration reveal about the gradient landscape?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The gradient magnitude is identical in all directions.",
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
                "en": "The loss surface is an ill-conditioned ravine: slopes are violently steep along $w_2$ (dense contour spacing) but agonizingly shallow along $w_1$ (sparse contour spacing), causing un-accelerated gradient descent to oscillate erratically.",
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
                "en": "The network has reached a saddle point where both partial derivatives are zero.",
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
                "en": "The parameters $w_1$ and $w_2$ are linearly dependent.",
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
    "id": "higher-order-derivatives-concavity",
    "title": "Partial Derivatives & Axis-Aligned Slices",
    "titleAr": "المشتقات الجزئية وشرائح المحاور المعيارية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "You are standing on a rugged mountainside. If someone asks you: \"What is the slope of the mountain right where you are standing?\", you...",
      "ar": "أنت تقف الآن على سفح جبل صخري وعر. إذا سألك أحد المتسلقين: \"ما هو ميل الجبل عند النقطة التي تقف عليها تماماً؟\"، فلن تتمكن من إجابته برقم..."
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
        "simulation": "PartialTangentPlaneCanvas",
        "narrative": {
          "en": "You are standing on a rugged mountainside. If someone asks you: *\"What is the slope of the mountain right where you are standing?\"*, you cannot give a single number! Why? Because if you take a step north, you might scramble up an agonizingly steep ledge; if you step east, you might stroll along a flat ridge; if you step south, you might slide down a steep scree slope. **Slope in multivariable space depends entirely on the direction of your step.**\n\n**Partial derivatives** are the cleanest, most fundamental directional questions you can ask:\n1. What is the slope if you freeze your $y$-coordinate into solid concrete and step exclusively along the $X$-axis ($\\frac{\\partial f}{\\partial x}$)?\n2. What is the slope if you freeze your $x$-coordinate completely and step exclusively along the $Y$-axis ($\\frac{\\partial f}{\\partial y}$)?\n\nGeometrically, computing $\\frac{\\partial f}{\\partial x}$ corresponds to taking a giant laser and slicing the 3D mountain landscape with a vertical plane parallel to the $X$-axis. The intersection of that slicing plane with the mountain surface forms a simple 1D curve, and the partial derivative is nothing more than the ordinary tangent slope of that slice.",
          "ar": "أنت تقف الآن على سفح جبل صخري وعر. إذا سألك أحد المتسلقين: *\"ما هو ميل الجبل عند النقطة التي تقف عليها تماماً؟\"*، فلن تتمكن من إجابته برقم واحد! لماذا؟ لأنك إذا خطوت خطوة نحو الشمال، فقد تصعد حافة صخرية شديدة الانحدار؛ وإذا خطوت نحو الشرق، فقد تسير على حافة أفقية مريحة؛ وإذا خطوت نحو الجنوب، فقد تهوي إلى الأسفل. **الميل في الفضاء متعدد الأبعاد يعتمد كلياً على الاتجاه الذي تختاره لحركتك.**\n\nتمثل **المشتقات الجزئية** (Partial Derivatives) أبسط الأسئلة الاتجاهية وأكثرها جوهرية:\n1. ما هو الميل إذا قمت بتجميد إحداثي $y$ كلياً وكأنه صخرة صلبة، وتحركت حصرياً على طول محور $X$ (المشتقة $\\frac{\\partial f}{\\partial x}$)؟\n2. ما هو الميل إذا قمت بتجميد إحداثي $x$ تماماً، وخطوت حصرياً على طول محور $Y$ (المشتقة $\\frac{\\partial f}{\\partial y}$)؟\n\nهندسياً، يعادل حساب $\\frac{\\partial f}{\\partial x}$ استخدام سكين ليزري عملاق لشطر الجبل ثلاثي الأبعاد بشريحة رأسية موازية لمحور $X$. تقاطع هذه الشريحة مع سطح الجبل يشكل منحنى أحادي البعد، وتكون المشتقة الجزئية هي ببساطة ميل المماس العادي لذلك المنحنى المقطوع."
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
          "en": "$$\n\\nabla f(\\mathbf{x}) = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1}(\\mathbf{x}) \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_D}(\\mathbf{x}) \\end{bmatrix} \\in \\mathbb{R}^D\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^D$ | Operating point in domain space | Coordinates where sensitivity is probed |\n| $\\mathbf{e}_i$ | $\\mathbb{R}^D$ | $i$-th canonical unit basis vector $[0,\\dots,1,\\dots,0]^T$ | Enforces displacement strictly along axis $i$ |\n| $h$ | $\\mathbb{R} \\setminus \\{0\\}$ | Infinitesimal probe displacement | Testing step along the chosen coordinate axis |\n| $\\frac{\\partial f}{\\partial x_i}$ | $\\mathbb{R}$ | Slope of the 1D planar slice parallel to axis $i$ | Quantifies isolated sensitivity to input $x_i$ |\n| $\\partial$ | Symbol | Del / curved d notation | Signals that all other variables are held strictly constant |\n\nWhen evaluating $\\frac{\\partial f}{\\partial x}$, treat every other variable ($y, z, \\dots$) as inert numerical constants. If an expression contains $3 x^2 y$, $y$ acts as a constant multiplier, yielding $6 x y$.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^D$ | نقطة الارتكاز في فضاء المدخلات | الإحداثيات التي يُفحص عندها معدل التغير |\n| $\\mathbf{e}_i$ | $\\mathbb{R}^D$ | متجه الوحدة المعياري $i$ $[0,\\dots,1,\\dots,0]^T$ | يفرض حصر الحركة على طول المحور $i$ فقط |\n| $h$ | $\\mathbb{R} \\setminus \\{0\\}$ | إزاحة الفحص متناهية الصغر | خطوة الاختبار اللحظية على طول المحور المختار |\n| $\\frac{\\partial f}{\\partial x_i}$ | $\\mathbb{R}$ | ميل الشريحة المستوية الموازية للمحور $i$ | يقيس الحساسية المعزولة للمدخل $x_i$ |\n| $\\partial$ | رمز | علامة التفاضل الجزئي (رمز ياكوبي) | تُنبه القارئ إلى أن كافة المتغيرات الأخرى ثابتة |\n\nعند حساب المشتقة الجزئية بالنسبة لـ $x$، عامل جميع المتغيرات الأخرى ($y, z, \\dots$) كأرقام ثابتة صلبة. فإذا كان التعبير $3 x^2 y$، يعامل $y$ كمعامل ضرب ثابت، وتكون النتيجة $6 x y$.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-higher-order-derivatives-concavity",
          "starterCode": "def numerical_gradient_vector(f: Callable[[np.ndarray], float], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical partial derivatives vector using central difference perturbations.\n    Constructs axis perturbation matrix E = eps * I without Python coordinate loops.\n    \n    Parameters\n    ----------\n    f : Callable\n        Function mapping 1D numpy array of shape (D,) to a scalar.\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (D,).\n    eps : float\n        Central difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Gradient vector containing all D partial derivatives, shape (D,).\n    \"\"\"\n    # Step 1: Construct perturbation matrix E = eps * I_d\n    # Step 2: Perturb along positive and negative directions for each axis\n    # Step 3: Evaluate function responses along each axis displacement\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "list(np.round(numerical_gradient_vector(lambda x: x[0]**2 + 3*x[1]**2, np.array([2.0, 1.0])), 2))",
              "expected": "[4.0, 6.0]"
            },
            {
              "input": "list(np.round(numerical_gradient_vector(lambda x: 5*x[0] - 2*x[1], np.array([0.0, 0.0])), 2))",
              "expected": "[5.0, -2.0]"
            }
          ],
          "expectedOutput": "[4.0, 6.0]",
          "variants": {
            "python": {
              "starterCode": "def numerical_gradient_vector(f: Callable[[np.ndarray], float], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical partial derivatives vector using central difference perturbations.\n    Constructs axis perturbation matrix E = eps * I without Python coordinate loops.\n    \n    Parameters\n    ----------\n    f : Callable\n        Function mapping 1D numpy array of shape (D,) to a scalar.\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (D,).\n    eps : float\n        Central difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Gradient vector containing all D partial derivatives, shape (D,).\n    \"\"\"\n    # Step 1: Construct perturbation matrix E = eps * I_d\n    # Step 2: Perturb along positive and negative directions for each axis\n    # Step 3: Evaluate function responses along each axis displacement\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[4.0, 6.0]"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef numerical_gradient_vector(f: Callable[[np.ndarray], float], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical partial derivatives vector using central difference perturbations.\n    Constructs axis perturbation matrix E = eps * I without Python coordinate loops.\n    \n    Parameters\n    ----------\n    f : Callable\n        Function mapping 1D numpy array of shape (D,) to a scalar.\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (D,).\n    eps : float\n        Central difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Gradient vector containing all D partial derivatives, shape (D,).\n    \"\"\"\n    d = len(x0)\n    \n    # Step 1: Construct perturbation matrix E = eps * I_d\n    E = np.eye(d) * eps\n    \n    # Step 2: Perturb along positive and negative directions for each axis\n    x_plus = x0 + E\n    x_minus = x0 - E\n    \n    # Step 3: Evaluate function responses along each axis displacement\n    f_plus = np.array([f(x_plus[i]) for i in range(d)])\n    f_minus = np.array([f(x_minus[i]) for i in range(d)])\n    \n    # Step 4: Compute central difference quotients: (f+ - f-) / (2*eps)\n    grad = (f_plus - f_minus) / (2.0 * eps)\n    \n    return grad"
        },
        "hints": {
          "tier1": {
            "en": "Gradient vector contains all identical values or incorrect magnitude.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Adding a scalar `x0 + eps` perturbs all coordinates at once along the diagonal rather than isolating one coordinate axis at a time.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Multiply `eps` by the identity matrix `E = np.eye(d) * eps` so row $i$ perturbs exclusively coordinate $i$.",
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
            "en": "A machine learning practitioner trains a loss function $\\mathcal{L}(w_1, w_2)$ and finds that at the current point, $\\frac{\\partial \\mathcal{L}}{\\partial w_1} = 25.0$ while $\\frac{\\partial \\mathcal{L}}{\\partial w_2} = 0.0$. If they apply an optimization update step strictly modifying $w_2$, what is the predicted first-order change in loss?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ المشتقات الجزئية وشرائح المحاور المعيارية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The loss increases by $25.0$ per unit step.",
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
                "en": "The loss does not change at all ($d\\mathcal{L} \\approx 0$), because the slope along the $w_2$ axis slice is completely flat.",
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
                "en": "The loss drops to negative infinity.",
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
                "en": "The loss increases quadratically due to interaction terms.",
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
    "id": "taylor-series-polynomial",
    "title": "The Gradient Vector & Directional Derivatives",
    "titleAr": "متجه التدرج والمشتقات الاتجاهية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "In the previous lesson, we measured the slope along the grid axes: east-west and north-south.",
      "ar": "في الدرس السابق، قمنا بقياس الميل على طول المحاور الشبكية المعيارية: شرقاً وغرباً، شمالاً وجنوباً."
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
        "simulation": "GradientAscentVectorCanvas",
        "narrative": {
          "en": "In the previous lesson, we measured the slope along the grid axes: east-west and north-south. But what if you choose to hike along an arbitrary compass heading—say, $37^\\circ$ north of east, along a unit vector $\\hat{\\mathbf{u}}$?\n\nYou do not need to conduct a brand-new limit experiment. You can pack all the individual partial derivatives together into a single mathematical vector: **The Gradient Vector** $\\nabla f$.\nThe gradient vector possesses two foundational properties:\n1. It points in the **direction of steepest possible ascent** (the compass heading that makes you climb upward fastest).\n2. Its length $\\|\\nabla f\\|$ is the **maximum instantaneous rate of climb**.\n\nTo find the slope in *any* arbitrary direction $\\hat{\\mathbf{u}}$, you compute the dot product: $D_{\\hat{\\mathbf{u}}} f = \\nabla f \\cdot \\hat{\\mathbf{u}} = \\|\\nabla f\\| \\cos(\\theta)$. Furthermore, because walking along a level contour curve involves zero climb ($D_{\\mathbf{t}} f = 0$), the gradient vector is always **strictly orthogonal ($90^\\circ$) to the contour level curves**.",
          "ar": "في الدرس السابق، قمنا بقياس الميل على طول المحاور الشبكية المعيارية: شرقاً وغرباً، شمالاً وجنوباً. ولكن ماذا لو قررت السير في اتجاه بوصلة عشوائي—مثلاً $37^\\circ$ شمال الشرق، على طول متجه وحدة $\\hat{\\mathbf{u}}$؟\n\nلا حاجة لإجراء حسابات نهايات جديدة ومعقدة من الصفر. يمكنك حزم كافة المشتقات الجزئية معاً في كيان متجهي موحد: **متجه التدرج** (Gradient Vector) $\\nabla f$.\nيمتلك متجه التدرج خاصيتين هندسيتين:\n1. يُشير دوماً نحو **الاتجاه الأشد صعوداً على الإطلاق** (الاتجاه الذي يجعلك تتسلق التضاريس بأعلى سرعة ممكنة).\n2. طوله $\\|\\nabla f\\|$ يمثل **أقصى معدل صعود لحظي**.\n\nلحساب الميل في *أي* اتجاه عشوائي $\\hat{\\mathbf{u}}$، ما عليك سوى حساب الجداء النقطي: $D_{\\hat{\\mathbf{u}}} f = \\nabla f \\cdot \\hat{\\mathbf{u}} = \\|\\nabla f\\| \\cos(\\theta)$. وفضلاً عن ذلك، ونظراً لأن السير على طول خط الكنتور لا يُحدث أي تغير في الارتفاع ($D_{\\mathbf{t}} f = 0$)، فإن متجه التدرج يكون دوماً **متعامداً تماماً ($90^\\circ$) مع خطوط الكنتور**."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\nabla f(\\mathbf{x}) \\coloneqq \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1}(\\mathbf{x}) \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_D}(\\mathbf{x}) \\end{bmatrix} \\in \\mathbb{R}^D, \\quad D_{\\hat{\\mathbf{u}}} f(\\mathbf{x}) = \\nabla f(\\mathbf{x})^T \\hat{\\mathbf{u}} = \\|\\nabla f(\\mathbf{x})\\|_2 \\cos(\\theta)",
        "formulaNote": {
          "en": "Core invariant for The Gradient Vector & Directional Derivatives.",
          "ar": "الخاصية الرياضية الجوهرية لـ متجه التدرج والمشتقات الاتجاهية."
        },
        "narrative": {
          "en": "$$\n\\max_{\\|\\hat{\\mathbf{u}}\\|=1} D_{\\hat{\\mathbf{u}}} f(\\mathbf{x}) = \\|\\nabla f(\\mathbf{x})\\|_2 \\iff \\hat{\\mathbf{u}} = \\frac{\\nabla f(\\mathbf{x})}{\\|\\nabla f(\\mathbf{x})\\|_2}\n$$\n$$\n\\nabla f(\\mathbf{x}_0) \\perp \\text{Tangent space to the level contour } \\mathcal{L}_{f(\\mathbf{x}_0)}(f)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\nabla f(\\mathbf{x})$ | $\\mathbb{R}^D$ | Arrow pointing along the path of steepest ascent | Vector field encoding full first-order spatial sensitivity |\n| $\\hat{\\mathbf{u}}$ | $\\mathbb{R}^D, \\|\\hat{\\mathbf{u}}\\|=1$ | Unit direction exploration vector | Compass heading for directional slope inquiry |\n| $D_{\\hat{\\mathbf{u}}} f$ | $\\mathbb{R}$ (Scalar) | Slope experienced when walking along $\\hat{\\mathbf{u}}$ | Directional derivative |\n| $\\|\\nabla f\\|$ | $\\mathbb{R}_{\\ge 0}$ | Maximum possible slope steepness | Euclidean norm quantifying maximum climb rate |\n| $\\theta$ | $[0, \\pi]$ | Angle between gradient and trajectory $\\hat{\\mathbf{u}}$ | Dictates sensitivity via $\\cos\\theta$ projection |\n\nBy the Cauchy-Schwarz inequality, $\\nabla f \\cdot \\hat{\\mathbf{u}}$ is maximized when $\\theta = 0$ (parallel alignment), minimized when $\\theta = \\pi$ (steepest descent, $-\\nabla f$), and identically zero when $\\theta = \\pi/2$ (tangent to level curve).",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\nabla f(\\mathbf{x})$ | $\\mathbb{R}^D$ | سهم يشير في اتجاه الصعود الأقصى | حقل متجهي يجمع كافة المشتقات المكانية الأولى |\n| $\\hat{\\mathbf{u}}$ | $\\mathbb{R}^D, \\|\\hat{\\mathbf{u}}\\|=1$ | متجه وحدة اتجاهي للاستكشاف | اتجاه البوصلة المراد قياس الميل على طوله |\n| $D_{\\hat{\\mathbf{u}}} f$ | $\\mathbb{R}$ | الميل الفعلي عند السير في اتجاه $\\hat{\\mathbf{u}}$ | المشتقة الاتجاهية |\n| $\\|\\nabla f\\|$ | $\\mathbb{R}_{\\ge 0}$ | أقصى معدل صعود ممكن | المعيار الإقليدي المعبر عن أقصى شدة للميل |\n| $\\theta$ | $[0, \\pi]$ | الزاوية بين التدرج ومتجه الاتجاه $\\hat{\\mathbf{u}}$ | تضبط الاستجابة عبر معامل الإسقاط $\\cos\\theta$ |\n\nوفقاً لمتباينة كوشي-شفارتز، يبلغ الجداء $\\nabla f \\cdot \\hat{\\mathbf{u}}$ قيمته العظمى عندما تكون $\\theta = 0$ (تطابق تام)، وأدنى قيمة سالبة عندما تكون $\\theta = \\pi$ (أقصى هبوط، $-\\nabla f$)، ويتلاشى إلى الصفر تماماً عندما تكون $\\theta = \\pi/2$ (مماس لخط الكنتور).\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-taylor-series-polynomial",
          "starterCode": "def directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:\n    \"\"\"\n    Compute batch directional derivatives along candidate directions and locate steepest ascent.\n    Normalizes candidate directions to unit vectors before evaluating inner products.\n    \n    Parameters\n    ----------\n    grad : np.ndarray\n        Gradient vector of shape (D,).\n    directions : np.ndarray\n        Array of candidate direction vectors of shape (B, D).\n        \n    Returns\n    -------\n    tuple[np.ndarray, int]\n        d_vals : Directional derivative values along unit directions, shape (B,).\n        best_idx : Index of the candidate direction maximizing ascent.\n    \"\"\"\n    # Step 1: Normalize direction vectors to unit norm along last axis\n    # Step 2: Compute directional derivatives via matrix-vector multiplication (B, D) @ (D,) -> (B,)\n    # Step 3: Identify index of maximum directional ascent\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "d_vals, best = directional_derivatives(np.array([3.0, 4.0]), np.array([[1.0, 0.0], [0.0, 1.0], [3.0, 4.0]])); int(best)",
              "expected": "2"
            },
            {
              "input": "d_vals, best = directional_derivatives(np.array([3.0, 4.0]), np.array([[1.0, 0.0], [0.0, 1.0], [3.0, 4.0]])); float(d_vals[best])",
              "expected": "5.0"
            }
          ],
          "expectedOutput": "2",
          "variants": {
            "python": {
              "starterCode": "def directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:\n    \"\"\"\n    Compute batch directional derivatives along candidate directions and locate steepest ascent.\n    Normalizes candidate directions to unit vectors before evaluating inner products.\n    \n    Parameters\n    ----------\n    grad : np.ndarray\n        Gradient vector of shape (D,).\n    directions : np.ndarray\n        Array of candidate direction vectors of shape (B, D).\n        \n    Returns\n    -------\n    tuple[np.ndarray, int]\n        d_vals : Directional derivative values along unit directions, shape (B,).\n        best_idx : Index of the candidate direction maximizing ascent.\n    \"\"\"\n    # Step 1: Normalize direction vectors to unit norm along last axis\n    # Step 2: Compute directional derivatives via matrix-vector multiplication (B, D) @ (D,) -> (B,)\n    # Step 3: Identify index of maximum directional ascent\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "2"
            }
          },
          "solution": "import numpy as np\n\ndef directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:\n    \"\"\"\n    Compute batch directional derivatives along candidate directions and locate steepest ascent.\n    Normalizes candidate directions to unit vectors before evaluating inner products.\n    \n    Parameters\n    ----------\n    grad : np.ndarray\n        Gradient vector of shape (D,).\n    directions : np.ndarray\n        Array of candidate direction vectors of shape (B, D).\n        \n    Returns\n    -------\n    tuple[np.ndarray, int]\n        d_vals : Directional derivative values along unit directions, shape (B,).\n        best_idx : Index of the candidate direction maximizing ascent.\n    \"\"\"\n    # Step 1: Normalize direction vectors to unit norm along last axis\n    norms = np.linalg.norm(directions, axis=-1, keepdims=True)\n    unit_u = directions / norms\n    \n    # Step 2: Compute directional derivatives via matrix-vector multiplication (B, D) @ (D,) -> (B,)\n    d_vals = unit_u @ grad\n    \n    # Step 3: Identify index of maximum directional ascent\n    best_idx = int(np.argmax(d_vals))\n    \n    return d_vals, best_idx"
        },
        "hints": {
          "tier1": {
            "en": "Directional derivative values scale with vector length instead of representing pure slopes.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Omitting normalization causes longer vectors to report artificially massive directional derivatives.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Normalize using `keepdims=True`: `directions / np.linalg.norm(directions, axis=-1, keepdims=True)`.",
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
            "en": "You stand on a 2D scalar elevation surface at coordinates where the gradient vector is $\\nabla f = [3.0, 4.0]^T$. If you walk along the direction vector $\\mathbf{v} = [-4.0, 3.0]^T$, what is your instantaneous rate of climb?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ متجه التدرج والمشتقات الاتجاهية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "$+5.0$ meters per unit step.",
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
                "en": "$-5.0$ meters per unit step.",
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
                "en": "Exactly $0.0$, because $\\mathbf{v}$ is orthogonal to $\\nabla f$ ($[3, 4] \\cdot [-4, 3] = -12 + 12 = 0$), meaning you are walking tangentially along a level contour curve without ascending or descending.",
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
                "en": "$+1.0$ meter per unit step.",
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
    "id": "multivariable-scalar-fields",
    "title": "The Hessian Matrix, Curvature & Quadratic Approximations",
    "titleAr": "مصفوفة هيسي، الانحناء، والتقريبات التربيعية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "The gradient vector tells you the slope of the landscape right under your boots. But what is the geometric shape of the terrain? Is the...",
      "ar": "يُخبرك متجه التدرج بميل التضاريس تحت حذائك مباشرة. ولكن ما هو الشكل الهندسي الحقيقي للأرض؟ هل الأرض وادٍ هادئ مقعر، أم قمة جبلية حادة، أم..."
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
          "en": "The gradient vector tells you the slope of the landscape right under your boots. But what is the geometric shape of the terrain? Is the ground shaped like a serene valley bowl, a hazardous mountain peak, a flat tilted ramp, or a treacherous horse saddle?\n\nThe gradient alone cannot tell you, because at the bottom of a bowl, at the peak of a mountain, and at the center of a saddle, the ground is completely, deceptively flat: $\\nabla f = \\mathbf{0}$.\n\nTo classify these landscapes, you need the **Hessian Matrix** $\\mathbf{H}$. The Hessian collects all second-order partial derivatives into a symmetric curvature operator. It acts like a high-dimensional bowl-detector:\n- If all eigenvalues are strictly positive ($\\mathbf{H} \\succ 0$), the landscape curves upward in every direction: you are safely at the **local minimum of a valley**.\n- If all eigenvalues are strictly negative ($\\mathbf{H} \\prec 0$), the landscape curves downward in every direction: you stand at a **local maximum**.\n- If some eigenvalues are positive and others are negative, you are perched on a **saddle point**: walking forward takes you downhill, but walking sideways takes you uphill! In modern deep neural networks, saddle points are the ubiquitous geometric structures that optimization algorithms must escape.",
          "ar": "يُخبرك متجه التدرج بميل التضاريس تحت حذائك مباشرة. ولكن ما هو الشكل الهندسي الحقيقي للأرض؟ هل الأرض وادٍ هادئ مقعر، أم قمة جبلية حادة، أم منحدر منبسط، أم سرج خيل؟\n\nلا يستطيع متجه التدرج بمفرده الإجابة عن هذا السؤال، لأنه في قاع الوادي، وفوق قمة الجبل، وعند مركز السرج، تكون الأرض منبسطة تماماً وينعدم التدرج: $\\nabla f = \\mathbf{0}$.\n\nلفك لغز هذه التضاريس وتصنيفها، نحتاج إلى **مصفوفة هيسي** (Hessian Matrix) $\\mathbf{H}$. تجمع مصفوفة هيسي كافة المشتقات الجزئية من الدرجة الثانية في مصفوفة متناظرة تقيس انحناء الفضاء. تعمل مصفوفة هيسي كمستكشف دقيق للشكل الهندسي عبر قيمها الذاتية:\n- إذا كانت جميع القيم الذاتية موجبة تماماً ($\\mathbf{H} \\succ 0$)، فإن التضاريس تنحني لأعلى في جميع الاتجاهات: أنت تقف في **نهاية صغرى محلية مستقرة داخل وادٍ**.\n- وإذا كانت جميع القيم الذاتية سالبة ($\\mathbf{H} \\prec 0$)، فإن السطح ينحني لأسفل في كل اتجاه: أنت تقف فوق **نهاية عظمى محلية**.\n- أما إذا كانت بعض القيم الذاتية موجبة والأخرى سالبة، فأنت تقف على **نقطة سرجية** (Saddle Point): خطوة للأمام تأخذك نزولاً، لكن خطوة للجانب تأخذك صعوداً! في الشبكات العصبية العميقة، تشكل النقاط السرجية العقبة الهندسية الكبرى التي يجب على الخوارزميات تجاوزها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{H}_{i, j} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}, \\quad \\mathbf{H} = \\nabla^2 f(\\mathbf{x}) \\in \\mathbb{R}^{D \\times D}",
        "formulaNote": {
          "en": "Core invariant for The Hessian Matrix, Curvature & Quadratic Approximations.",
          "ar": "الخاصية الرياضية الجوهرية لـ مصفوفة هيسي، الانحناء، والتقريبات التربيعية."
        },
        "narrative": {
          "en": "$$\nf(\\mathbf{x}_0 + \\Delta \\mathbf{x}) \\approx f(\\mathbf{x}_0) + \\nabla f(\\mathbf{x}_0)^T \\Delta \\mathbf{x} + \\frac{1}{2} \\Delta \\mathbf{x}^T \\mathbf{H}(\\mathbf{x}_0) \\Delta \\mathbf{x}\n$$\n$$\n\\text{At } \\nabla f(\\mathbf{x}^*) = \\mathbf{0}: \\quad \\begin{cases} \\mathbf{H} \\succ 0 \\; (\\forall \\lambda_i > 0) \\implies \\text{Strict Local Minimum} \\\\ \\mathbf{H} \\prec 0 \\; (\\forall \\lambda_i < 0) \\implies \\text{Strict Local Maximum} \\\\ \\exists \\lambda_i > 0, \\lambda_j < 0 \\implies \\text{Saddle Point} \\end{cases}\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{H} = \\nabla^2 f$ | $\\mathbb{R}^{D \\times D}$ (Symmetric) | Matrix of second-order partial derivatives | Quadratic curvature operator governing local bowl geometry |\n| $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$ | $\\mathbb{R}$ | Rate of change of slope $i$ as you move along axis $j$ | Mixed partial derivative (symmetric by Clairaut: $H_{ij} = H_{ji}$) |\n| $\\Delta \\mathbf{x}^T \\mathbf{H} \\Delta \\mathbf{x}$ | $\\mathbb{R}$ (Scalar) | Directional quadratic curvature form | Governs whether energy rises or falls along displacement $\\Delta \\mathbf{x}$ |\n| $\\lambda_i$ | $\\mathbb{R}$ | Eigenvalues of the Hessian | Principle curvatures along orthogonal eigen-axes |\n| Saddle Point | Geometry | Mixed positive and negative curvatures | Hyperbolic geometry trapping standard gradient solvers |\n\nBy Schwarz's theorem, as long as second derivatives are continuous ($C^2$), mixed partials commute ($H_{ij} = H_{ji}$), ensuring $\\mathbf{H}$ is always symmetric and has strictly real eigenvalues.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{H} = \\nabla^2 f$ | $\\mathbb{R}^{D \\times D}$ (متناظرة) | مصفوفة المشتقات الجزئية من الرتبة الثانية | مؤثر الانحناء التربيعي الحاكم لشكل الوادي المحلي |\n| $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$ | $\\mathbb{R}$ | معدل تغير الميل $i$ عند التحرك على المحور $j$ | المشتقة الجزئية المختلطة (متناظرة وفق كليرو: $H_{ij} = H_{ji}$) |\n| $\\Delta \\mathbf{x}^T \\mathbf{H} \\Delta \\mathbf{x}$ | $\\mathbb{R}$ | الصورة التربيعية للانحناء الاتجاهي | تحدد ما إذا كانت الطاقة تصعد أم تهبط مع الإزاحة $\\Delta \\mathbf{x}$ |\n| $\\lambda_i$ | $\\mathbb{R}$ | القيم الذاتية لمصفوفة هيسي | الانحناءات الرئيسية على طول المحاور الذاتية المتعامدة |\n| النقطة السرجية | هندسة تضاريس | انحناءات متباينة الإشارة (موجبة وسالبة) | هندسة زائدية تحبس خوارزميات الانحدار البسيطة |\n\nوفقاً لمبرهنة كليرو-شفارتز، طالما أن المشتقات الثانية متصلة ($C^2$)، فإن المشتقات المختلطة تتبادل ($H_{ij} = H_{ji}$)، مما يضمن أن مصفوفة هيسي متناظرة دوماً وتمتلك قيماً ذاتية حقيقية بالكامل.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-multivariable-scalar-fields",
          "starterCode": "def quadratic_form_curvature(H: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, str]:\n    \"\"\"\n    Compute directional quadratic form curvatures and classify surface topology.\n    Uses Einstein summation einsum('bd,de,be->b') to eliminate batch matrix loops.\n    \n    Parameters\n    ----------\n    H : np.ndarray\n        Symmetric Hessian matrix of shape (D, D).\n    directions : np.ndarray\n        Batch of candidate direction vectors of shape (B, D).\n        \n    Returns\n    -------\n    tuple[np.ndarray, str]\n        curvatures : Directional quadratic forms v^T H v, shape (B,).\n        topology : Classification: 'strictly_convex', 'strictly_concave', or 'saddle'.\n    \"\"\"\n    # Step 1: Normalize direction vectors to unit norm along last axis\n    # Step 2: Compute batch quadratic forms v^T H v via einsum\n    # Step 3: Compute eigenvalues of symmetric Hessian matrix\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "curvs, top = quadratic_form_curvature(np.array([[2.0, 0.0], [0.0, 6.0]]), np.array([[1.0, 0.0]])); str(top)",
              "expected": "strictly_convex"
            },
            {
              "input": "curvs, top = quadratic_form_curvature(np.array([[3.0, 0.0], [0.0, -2.0]]), np.array([[1.0, 0.0]])); str(top)",
              "expected": "saddle"
            }
          ],
          "expectedOutput": "strictly_convex",
          "variants": {
            "python": {
              "starterCode": "def quadratic_form_curvature(H: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, str]:\n    \"\"\"\n    Compute directional quadratic form curvatures and classify surface topology.\n    Uses Einstein summation einsum('bd,de,be->b') to eliminate batch matrix loops.\n    \n    Parameters\n    ----------\n    H : np.ndarray\n        Symmetric Hessian matrix of shape (D, D).\n    directions : np.ndarray\n        Batch of candidate direction vectors of shape (B, D).\n        \n    Returns\n    -------\n    tuple[np.ndarray, str]\n        curvatures : Directional quadratic forms v^T H v, shape (B,).\n        topology : Classification: 'strictly_convex', 'strictly_concave', or 'saddle'.\n    \"\"\"\n    # Step 1: Normalize direction vectors to unit norm along last axis\n    # Step 2: Compute batch quadratic forms v^T H v via einsum\n    # Step 3: Compute eigenvalues of symmetric Hessian matrix\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "strictly_convex"
            }
          },
          "solution": "import numpy as np\n\ndef quadratic_form_curvature(H: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, str]:\n    \"\"\"\n    Compute directional quadratic form curvatures and classify surface topology.\n    Uses Einstein summation einsum('bd,de,be->b') to eliminate batch matrix loops.\n    \n    Parameters\n    ----------\n    H : np.ndarray\n        Symmetric Hessian matrix of shape (D, D).\n    directions : np.ndarray\n        Batch of candidate direction vectors of shape (B, D).\n        \n    Returns\n    -------\n    tuple[np.ndarray, str]\n        curvatures : Directional quadratic forms v^T H v, shape (B,).\n        topology : Classification: 'strictly_convex', 'strictly_concave', or 'saddle'.\n    \"\"\"\n    # Step 1: Normalize direction vectors to unit norm along last axis\n    norms = np.linalg.norm(directions, axis=-1, keepdims=True)\n    unit_v = directions / norms\n    \n    # Step 2: Compute batch quadratic forms v^T H v via einsum\n    curvatures = np.einsum('bd,de,be->b', unit_v, H, unit_v)\n    \n    # Step 3: Compute eigenvalues of symmetric Hessian matrix\n    evals = np.linalg.eigvalsh(H)\n    \n    # Step 4: Classify critical point topology from eigenvalue spectrum\n    if np.all(evals > 1e-10):\n        topology = 'strictly_convex'\n    elif np.all(evals < -1e-10):\n        topology = 'strictly_concave'\n    elif np.any(evals > 1e-10) and np.any(evals < -1e-10):\n        topology = 'saddle'\n    else:\n        topology = 'degenerate'\n        \n    return curvatures, topology"
        },
        "hints": {
          "tier1": {
            "en": "Slow Python loop computing $\\mathbf{v}_i^T H \\mathbf{v}_i$ or shape mismatch.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Multiplying `directions @ H @ directions.T` produces a full $B \\times B$ matrix where only the diagonal elements are needed.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Use `np.einsum('bd,de,be->b', unit_v, H, unit_v)` to directly evaluate the $B$ quadratic forms without allocating the cross-product matrix.",
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
            "en": "At a critical point $\\nabla \\mathcal{L}(\\mathbf{w}) = \\mathbf{0}$ of a deep learning loss surface, the Hessian matrix has eigenvalues $\\lambda_1 = +14.2$ and $\\lambda_2 = -6.8$. What is the geometric nature of this point, and how will a small perturbation behave?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ مصفوفة هيسي، الانحناء، والتقريبات التربيعية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The point is a stable global minimum where all gradient trajectories converge.",
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
                "en": "The point is a local maximum where all gradient trajectories diverge.",
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
                "en": "The point is a saddle point: perturbations along the eigenvector of $+14.2$ increase the loss, while perturbations along the eigenvector of $-6.8$ decrease the loss, providing an escape route for momentum-based optimizers.",
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
                "en": "The Hessian is singular and cannot be classified.",
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
    "id": "partial-derivatives-tangents",
    "title": "The Jacobian Matrix & Vector-Valued Deformation",
    "titleAr": "مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "A scalar field takes in a multi-dimensional point and returns a single solitary number (for example, location $\\to$ temperature).",
      "ar": "يستقبل الحقل العددي نقطة متعددة الأبعاد ويُخرج رقماً قياسياً وحيداً (على سبيل المثال، الموقع الجغرافي $\\to$ درجة الحرارة)."
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
          "en": "A scalar field takes in a multi-dimensional point and returns a single solitary number (for example, location $\\to$ temperature). But what if a function takes in a multi-dimensional vector and outputs **another multi-dimensional vector**?\n\nConsider an atmospheric wind map: at every geographic location $(x, y)$, the wind has both an east-west velocity component $u(x, y)$ and a north-south velocity component $v(x, y)$. The mapping is $\\mathbf{F}: \\mathbb{R}^2 \\to \\mathbb{R}^2$.\n\nHow do you differentiate such a vector-valued system? You cannot use a single gradient vector, because each output coordinate has its own gradient! \nThe **Jacobian Matrix** $\\mathbf{J}$ is the master operator that stacks all these gradient vectors as rows:\n- Row 1: The gradient of output 1 ($\\nabla F_1^T$).\n- Row 2: The gradient of output 2 ($\\nabla F_2^T$).\n\nGeometrically, the Jacobian is the ultimate local linear transformation: if you draw an infinitesimal circular droplet of ink on your input coordinate grid, the Jacobian describes how that droplet gets stretched, rotated, and deformed into an ellipse in the output space.",
          "ar": "يستقبل الحقل العددي نقطة متعددة الأبعاد ويُخرج رقماً قياسياً وحيداً (على سبيل المثال، الموقع الجغرافي $\\to$ درجة الحرارة). ولكن ماذا لو كانت الدالة تستقبل متجهاً متعدد الأبعاد وتُخرج **متجهاً آخر متعدد الأبعاد**؟\n\nتأمل خريطة حركة الرياح الجوية: عند كل موقع جغرافي $(x, y)$، تمتلك الرياح مركبة سرعة شرقية-غربية $u(x, y)$ ومركبة سرعة شمالية-جنوبية $v(x, y)$. هذا التحويل هو دالة متجهية $\\mathbf{F}: \\mathbb{R}^2 \\to \\mathbb{R}^2$.\n\nكيف نقوم باشتقاق منظومة متجهية كهذه؟ لا يمكننا استخدام متجه تدرج مفرد، لأن كل مركبة في المخرجات تمتلك تدرجها الخاص!\n**مصفوفة جاكوبي** (Jacobian Matrix) $\\mathbf{J}$ هي المؤثر الرياضي الجامع الذي يرص كافة متجهات التدرج هذه في صفوف منظمة:\n- الصف الأول: تدرج مركبة المخرجات الأولى ($\\nabla F_1^T$).\n- الصف الثاني: تدرج مركبة المخرجات الثانية ($\\nabla F_2^T$).\n\nهندسياً، تمثل مصفوفة جاكوبي التحويل الخطي المحلي الأسمى: إذا رسمت قطرة حبر دائرية متناهية الصغر على شبكة المدخلات، فإن مصفوفة جاكوبي تصف بدقة كيف تتمدد تلك القطرة وتدور وتتشوه لتتحول إلى شكل بيضاوي في فضاء المخرجات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{F}: \\mathbb{R}^N \\to \\mathbb{R}^M, \\quad \\mathbf{J} = \\frac{\\partial \\mathbf{F}}{\\partial \\mathbf{x}} \\coloneqq \\begin{bmatrix} \\frac{\\partial F_1}{\\partial x_1} & \\cdots & \\frac{\\partial F_1}{\\partial x_N} \\\\ \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial F_M}{\\partial x_1} & \\cdots & \\frac{\\partial F_M}{\\partial x_N} \\end{bmatrix} = \\begin{bmatrix} \\nabla F_1^T \\\\ \\vdots \\\\ \\nabla F_M^T \\end{bmatrix} \\in \\mathbb{R}^{M \\times N}",
        "formulaNote": {
          "en": "Core invariant for The Jacobian Matrix & Vector-Valued Deformation.",
          "ar": "الخاصية الرياضية الجوهرية لـ مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية."
        },
        "narrative": {
          "en": "$$\n\\mathbf{F}(\\mathbf{x} + \\Delta \\mathbf{x}) \\approx \\mathbf{F}(\\mathbf{x}) + \\mathbf{J}(\\mathbf{x}) \\Delta \\mathbf{x}\n$$\n$$\ndV_{\\mathbf{y}} = |\\det(\\mathbf{J})| \\, dV_{\\mathbf{x}} \\quad (\\text{Multivariate Volume Scaling for } M = N)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{F}$ | $\\mathbb{R}^N \\to \\mathbb{R}^M$ | Vector-valued nonlinear mapping | Function mapping $N$-dim domain to $M$-dim codomain |\n| $\\mathbf{J}$ | $\\mathbb{R}^{M \\times N}$ | Matrix of all first-order partial derivatives | Best local linear map approximating $\\mathbf{F}$ |\n| $\\nabla F_i^T$ | $1 \\times N$ (Row vector) | Gradient of the $i$-th scalar output component | $i$-th row of the Jacobian matrix |\n| $\\Delta \\mathbf{x}$ | $\\mathbb{R}^N$ | Small perturbation in input coordinates | Input displacement |\n| $|\\det(\\mathbf{J})|$ | $\\mathbb{R}_{\\ge 0}$ (for $M=N$) | Local volume magnification factor | Scaling factor under multivariable substitution |\n\nNever confuse the Jacobian $\\mathbf{J}$ with the Hessian $\\mathbf{H}$. The Jacobian contains first derivatives of a vector function $\\mathbb{R}^N \\to \\mathbb{R}^M$. The Hessian contains second derivatives of a scalar field $\\mathbb{R}^N \\to \\mathbb{R}$.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{F}$ | $\\mathbb{R}^N \\to \\mathbb{R}^M$ | تحويل غير خطي متجهي | دالة تنقل فضاء مدخلات ذي بعد $N$ إلى فضاء مخرجات ذي بعد $M$ |\n| $\\mathbf{J}$ | $\\mathbb{R}^{M \\times N}$ | مصفوفة المشتقات الجزئية من الرتبة الأولى | أفضل تحويل خطي محلي ينوب عن الدالة $\\mathbf{F}$ |\n| $\\nabla F_i^T$ | $1 \\times N$ (متجه صف) | تدرج مركبة المخرجات القياسية $i$ | الصف رقم $i$ داخل مصفوفة جاكوبي |\n| $\\Delta \\mathbf{x}$ | $\\mathbb{R}^N$ | إزاحة متناهية الصغر في المدخلات | مدخلات الاضطراب المكاني |\n| $|\\det(\\mathbf{J})|$ | $\\mathbb{R}_{\\ge 0}$ (عند $M=N$) | معامل تمدد الحجم المحلي | معامل التوسع في تكاملات تغيير المتغيرات |\n\nإياك والخلط بين مصفوفة جاكوبي $\\mathbf{J}$ ومصفوفة هيسي $\\mathbf{H}$. تحتوي جاكوبي على المشتقات الأولى لدالة متجهية $\\mathbb{R}^N \\to \\mathbb{R}^M$. بينما تحتوي هيسي على المشتقات الثانية لحقل قياسي وحيد $\\mathbb{R}^N \\to \\mathbb{R}$.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-partial-derivatives-tangents",
          "starterCode": "def numerical_jacobian(F: Callable[[np.ndarray], np.ndarray], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical Jacobian matrix of vector function F: R^N -> R^M at x0.\n    Evaluates central difference perturbations along each input basis direction.\n    \n    Parameters\n    ----------\n    F : Callable\n        Vector-valued function mapping array of shape (N,) to array of shape (M,).\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (N,).\n    eps : float\n        Finite difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Jacobian matrix of shape (M, N).\n    \"\"\"\n    # Perturb each input coordinate j independently to compute column j of the Jacobian\n    # Stack column derivative vectors horizontally to form (M, N) matrix\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "F = lambda x: np.array([x[0]*np.cos(x[1]), x[0]*np.sin(x[1])]); list(np.round(numerical_jacobian(F, np.array([2.0, 0.0]))[0], 2))",
              "expected": "[1.0, 0.0]"
            },
            {
              "input": "A = np.array([[2.0, 1.0], [0.0, 3.0]]); list(np.round(numerical_jacobian(lambda x: A @ x, np.array([1.0, 1.0]))[1], 2))",
              "expected": "[0.0, 3.0]"
            }
          ],
          "expectedOutput": "[1.0, 0.0]",
          "variants": {
            "python": {
              "starterCode": "def numerical_jacobian(F: Callable[[np.ndarray], np.ndarray], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical Jacobian matrix of vector function F: R^N -> R^M at x0.\n    Evaluates central difference perturbations along each input basis direction.\n    \n    Parameters\n    ----------\n    F : Callable\n        Vector-valued function mapping array of shape (N,) to array of shape (M,).\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (N,).\n    eps : float\n        Finite difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Jacobian matrix of shape (M, N).\n    \"\"\"\n    # Perturb each input coordinate j independently to compute column j of the Jacobian\n    # Stack column derivative vectors horizontally to form (M, N) matrix\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[1.0, 0.0]"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef numerical_jacobian(F: Callable[[np.ndarray], np.ndarray], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical Jacobian matrix of vector function F: R^N -> R^M at x0.\n    Evaluates central difference perturbations along each input basis direction.\n    \n    Parameters\n    ----------\n    F : Callable\n        Vector-valued function mapping array of shape (N,) to array of shape (M,).\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (N,).\n    eps : float\n        Finite difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Jacobian matrix of shape (M, N).\n    \"\"\"\n    n = len(x0)\n    E = np.eye(n) * eps\n    cols = []\n    \n    # Perturb each input coordinate j independently to compute column j of the Jacobian\n    for j in range(n):\n        f_plus = F(x0 + E[j])\n        f_minus = F(x0 - E[j])\n        col_j = (f_plus - f_minus) / (2.0 * eps)\n        cols.append(col_j)\n        \n    # Stack column derivative vectors horizontally to form (M, N) matrix\n    J = np.column_stack(cols)\n    return J"
        },
        "hints": {
          "tier1": {
            "en": "Jacobian matrix is transposed `(N, M)` instead of `(M, N)`.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Perturbing coordinate $x_j$ produces the $j$-th *column* of partial derivatives $\\frac{\\partial \\mathbf{F}}{\\partial x_j}$, not the $j$-th row.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Stack column-wise using `np.column_stack(cols)` or transpose row-stacked results.",
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
            "en": "In normalizing flow generative models, an invertible neural network $\\mathbf{x} = g(\\mathbf{z})$ transforms a simple latent variable $\\mathbf{z} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$ into a complex data sample $\\mathbf{x}$. To compute the exact probability density $p(\\mathbf{x})$, the change-of-variables theorem scales the density by $|\\det(\\mathbf{J}_g)|^{-1}$. What does $|\\det(\\mathbf{J}_g)|$ represent geometrically?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The Euclidean distance between latent code $\\mathbf{z}$ and observation $\\mathbf{x}$.",
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
                "en": "The local infinitesimal volume expansion/contraction factor, measuring how an infinitesimal cube in $\\mathbf{z}$-space gets stretched into a parallelotope in $\\mathbf{x}$-space.",
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
                "en": "The maximum eigenvalue of the output covariance matrix.",
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
                "en": "The total reconstruction loss of the generative network.",
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
    "id": "gradient-vector",
    "title": "Convexity, Epigraphs & Global Minimizers",
    "titleAr": "التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine a smooth ceramic soup bowl sitting on a table. If you choose any two arbitrary points anywhere inside the soup or on the bowl's rim...",
      "ar": "تخيل إناء حساء خزفي أملس موضوعاً على طاولة. إذا اخترت أي نقطتين عشوائيتين في أي مكان داخل الحساء أو على حافة الإناء وشددت شعاع ليزر..."
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
          "en": "Imagine a smooth ceramic soup bowl sitting on a table. If you choose any two arbitrary points anywhere inside the soup or on the bowl's rim and stretch a tight laser beam between them, the entire straight beam stays completely inside or above the bowl. It never punches through the outside ceramic walls into the open air.\n\nThis is the geometric definition of a **convex set**. A **convex function** is a function whose entire landscape is shaped like this bowl: the chord connecting any two points on its graph lies completely on or above the curve.\n\nWhy is convexity universally regarded as the holy grail of mathematical optimization? Because on a convex surface, **you can never become trapped in a deceptive local minimum**. If you find a single point where the ground is flat ($\\nabla f = \\mathbf{0}$), you are mathematically guaranteed that you stand at the **absolute, global lowest point in the entire universe**! Furthermore, Jensen's inequality extends this geometric principle to probability distributions: the function of the expected value is always less than or equal to the expected value of the function ($f(\\mathbb{E}[X]) \\le \\mathbb{E}[f(X)]$).",
          "ar": "تخيل إناء حساء خزفي أملس موضوعاً على طاولة. إذا اخترت أي نقطتين عشوائيتين في أي مكان داخل الحساء أو على حافة الإناء وشددت شعاع ليزر مستقيماً بينهما، فإن شعاع الليزر بالكامل سيظل محتواً بأمان داخل الإناء أو فوقه. لن يخترق الشعاع جدران الخزف الخارجية ليخرج إلى الهواء الطلق مطلقاً.\n\nهذا هو التعريف الهندسي لـ **المجموعة المحدبة** (Convex Set). و**الدالة المحدبة** (Convex Function) هي دالة تشبه تضاريسها بالكامل هذا الإناء الخزفي: حيث يقع الوتر المستقيم الواصل بين أي نقطتين على منحناها فوق المنحنى نفسه أو يلامسه.\n\nلماذا يُعد التحدب الكأس المقدسة في علم الاستمثال والتحسين الرياضي؟ لأنه على سطح محدب، **يستحيل تماماً أن تقع في فخ نهاية صغرى محلية خادعة**. إذا عثرت على نقطة واحدة فقط ينعدم عندها التدرج ($\\nabla f = \\mathbf{0}$)، فأنت مضمون رياضياً بأنك تقف عند **القاع الشامل والمطلق للدالة بأسرها**! وتُعمم متباينة ينسن (Jensen's Inequality) هذه الخاصية على التوزيعات الاحتمالية: فقيمة الدالة عند القيمة المتوقعة تكون دوماً أصغر من أو مساوية للقيمة المتوقعة للدالة ($f(\\mathbb{E}[X]) \\le \\mathbb{E}[f(X)]$)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f(\\alpha \\mathbf{x} + (1 - \\alpha)\\mathbf{y}) \\le \\alpha f(\\mathbf{x}) + (1 - \\alpha) f(\\mathbf{y}) \\quad \\forall \\mathbf{x}, \\mathbf{y} \\in \\operatorname{dom}(f), \\; \\alpha \\in [0, 1]",
        "formulaNote": {
          "en": "Core invariant for Convexity, Epigraphs & Global Minimizers.",
          "ar": "الخاصية الرياضية الجوهرية لـ التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة."
        },
        "narrative": {
          "en": "$$\n\\operatorname{epi}(f) \\coloneqq \\left\\{ (\\mathbf{x}, t) \\in \\mathbb{R}^{D+1} \\;\\middle|\\; \\mathbf{x} \\in \\operatorname{dom}(f), \\; t \\ge f(\\mathbf{x}) \\right\\} \\quad (\\text{Epigraph Set is Convex})\n$$\n$$\nf(\\mathbb{E}[\\mathbf{X}]) \\le \\mathbb{E}[f(\\mathbf{X})] \\implies \\Delta_{\\text{Jensen}} = \\mathbb{E}[f(\\mathbf{X})] - f(\\mathbb{E}[\\mathbf{X}]) \\ge 0\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}, \\mathbf{y}$ | $\\mathbb{R}^D$ | Arbitrary pair of domain points | Endpoints of the test chord |\n| $\\alpha \\in [0, 1]$ | Scalar | Interpolation blending weight | Sweeps position along the straight chord connecting $\\mathbf{x}$ and $\\mathbf{y}$ |\n| $\\operatorname{epi}(f)$ | Subset of $\\mathbb{R}^{D+1}$ | Epigraph: volume of space on and above graph | Set-theoretic definition of functional convexity |\n| $\\mathbb{E}[\\mathbf{X}]$ | $\\mathbb{R}^D$ | Expected value / center of mass | Center of probability mass |\n| $\\Delta_{\\text{Jensen}}$ | $\\mathbb{R}_{\\ge 0}$ | Jensen gap | Non-negative dispersion gap underpinning KL divergence |\n\nThe first-order condition states that the tangent plane is a global under-estimator: $f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T(\\mathbf{y} - \\mathbf{x})$. Tangent planes never slice through a convex bowl; they support it from below.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}, \\mathbf{y}$ | $\\mathbb{R}^D$ | أي نقطتين عشوائيتين في النطاق | طرفا الوتر المستقيم الاختباري |\n| $\\alpha \\in [0, 1]$ | قيمة قياسية | معامل المزج والوزن الخطي | يمسح المسافة على طول القطعة المستقيمة بين النقطتين |\n| $\\operatorname{epi}(f)$ | مجموعة في $\\mathbb{R}^{D+1}$ | المخطط الفوقي: فضاء النقاط الواقعة فوق المنحنى | التعريف الجمعي التأسيسي لتحدب الدوال |\n| $\\mathbb{E}[\\mathbf{X}]$ | $\\mathbb{R}^D$ | القيمة المتوقعة / مركز الكتلة الاحتمالية | نقطة التوازن الوسطى للتوزيع |\n| $\\Delta_{\\text{Jensen}}$ | $\\mathbb{R}_{\\ge 0}$ | فجوة ينسن (Jensen Gap) | الفارق الموجب الضامن لتشتت التباين وتباعد كولباك-ليبلر |\n\nينص شرط الرتبة الأولى على أن المستوي المماس يقع دوماً أسفل المنحنى المحدب: $f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T(\\mathbf{y} - \\mathbf{x})$. المماسات لا تخترق الإناء المحدب مطلقاً، بل تسنده من الأسفل.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-gradient-vector",
          "starterCode": "def verify_jensen_gap(f: Callable[[np.ndarray], float], points: np.ndarray, weights: np.ndarray) -> tuple[float, float, float]:\n    \"\"\"\n    Compute expectation E[X], function of expectation f(E[X]), and empirical Jensen gap.\n    \n    Parameters\n    ----------\n    f : Callable\n        Convex scalar objective function.\n    points : np.ndarray\n        Sample coordinate array of shape (N, D).\n    weights : np.ndarray\n        Probability weight array of shape (N,).\n        \n    Returns\n    -------\n    tuple[float, float, float]\n        sum_ex : Sum of components of expectation vector E[X].\n        f_ex : Function value evaluated at expectation f(E[X]).\n        gap : Jensen gap E[f(X)] - f(E[X]) >= 0.\n    \"\"\"\n    # Step 1: Normalize weights to sum strictly to 1.0\n    # Step 2: Compute expectation vector E[X] = sum(w_i * x_i) using broadcasting\n    # Step 3: Evaluate function at expectation: f(E[X])\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "sum_ex, f_ex, gap = verify_jensen_gap(lambda x: float(np.sum(x**2)), np.array([[0.0, 0.0], [2.0, 0.0]]), np.array([0.5, 0.5])); round(gap, 2)",
              "expected": "1.0"
            },
            {
              "input": "sum_ex, f_ex, gap = verify_jensen_gap(lambda x: float(np.sum(x)), np.array([[1.0, 2.0], [3.0, 4.0]]), np.array([0.5, 0.5])); round(gap, 2)",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "1.0",
          "variants": {
            "python": {
              "starterCode": "def verify_jensen_gap(f: Callable[[np.ndarray], float], points: np.ndarray, weights: np.ndarray) -> tuple[float, float, float]:\n    \"\"\"\n    Compute expectation E[X], function of expectation f(E[X]), and empirical Jensen gap.\n    \n    Parameters\n    ----------\n    f : Callable\n        Convex scalar objective function.\n    points : np.ndarray\n        Sample coordinate array of shape (N, D).\n    weights : np.ndarray\n        Probability weight array of shape (N,).\n        \n    Returns\n    -------\n    tuple[float, float, float]\n        sum_ex : Sum of components of expectation vector E[X].\n        f_ex : Function value evaluated at expectation f(E[X]).\n        gap : Jensen gap E[f(X)] - f(E[X]) >= 0.\n    \"\"\"\n    # Step 1: Normalize weights to sum strictly to 1.0\n    # Step 2: Compute expectation vector E[X] = sum(w_i * x_i) using broadcasting\n    # Step 3: Evaluate function at expectation: f(E[X])\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef verify_jensen_gap(f: Callable[[np.ndarray], float], points: np.ndarray, weights: np.ndarray) -> tuple[float, float, float]:\n    \"\"\"\n    Compute expectation E[X], function of expectation f(E[X]), and empirical Jensen gap.\n    \n    Parameters\n    ----------\n    f : Callable\n        Convex scalar objective function.\n    points : np.ndarray\n        Sample coordinate array of shape (N, D).\n    weights : np.ndarray\n        Probability weight array of shape (N,).\n        \n    Returns\n    -------\n    tuple[float, float, float]\n        sum_ex : Sum of components of expectation vector E[X].\n        f_ex : Function value evaluated at expectation f(E[X]).\n        gap : Jensen gap E[f(X)] - f(E[X]) >= 0.\n    \"\"\"\n    # Step 1: Normalize weights to sum strictly to 1.0\n    norm_weights = weights / np.sum(weights)\n    \n    # Step 2: Compute expectation vector E[X] = sum(w_i * x_i) using broadcasting\n    e_x = np.sum(norm_weights[:, None] * points, axis=0)\n    \n    # Step 3: Evaluate function at expectation: f(E[X])\n    f_e_x = float(f(e_x))\n    \n    # Step 4: Evaluate expectation of function: E[f(X)] = sum(w_i * f(x_i))\n    f_vals = np.array([float(f(p)) for p in points])\n    e_f_x = float(np.sum(norm_weights * f_vals))\n    \n    # Step 5: Compute non-negative Jensen gap\n    gap = e_f_x - f_e_x\n    \n    return float(np.sum(e_x)), f_e_x, gap"
        },
        "hints": {
          "tier1": {
            "en": "Negative Jensen gap or incorrect expectation values.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "If input weights do not sum to 1.0, $\\mathbb{E}[X]$ and $\\mathbb{E}[f(X)]$ are not valid convex combinations.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Normalize weights unconditionally: `norm_weights = weights / np.sum(weights)`.",
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
            "en": "In Variational Autoencoders (VAEs), optimizing the exact marginal log-likelihood $\\ln p(\\mathbf{x}) = \\ln \\mathbb{E}_{q(\\mathbf{z}|\\mathbf{x})}\\left[\\frac{p(\\mathbf{x}, \\mathbf{z})}{q(\\mathbf{z}|\\mathbf{x})}\\right]$ is computationally intractable. Researchers apply Jensen's inequality to the strictly concave logarithm function to derive the Evidence Lower Bound (ELBO): $\\ln \\mathbb{E}[X] \\ge \\mathbb{E}[\\ln X]$. What does the non-negative Jensen gap represent in this deep learning setting?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The reconstruction Mean Squared Error of the decoder network.",
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
                "en": "The Kullback-Leibler (KL) divergence $\\mathcal{D}_{\\text{KL}}(q(\\mathbf{z}|\\mathbf{x}) \\parallel p(\\mathbf{z}|\\mathbf{x})) \\ge 0$ measuring the discrepancy between the approximate and true posterior distributions.",
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
                "en": "The learning rate decay factor during backpropagation.",
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
                "en": "The numerical precision error of floating-point computations.",
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
    "id": "hessian-matrix-extrema",
    "title": "Gradient Descent, Learning Rates & Landscape Navigation",
    "titleAr": "الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are blindfolded on a steep, fog-shrouded mountainside in a thick mist. You cannot see the safety of the valley floor below.",
      "ar": "تخيل أنك معصوب العينين وتقف على سفح جبل وعر يلفه ضباب كثيف. لا يمكنك رؤية قاع الوادي أو المخيم الآمن في الأسفل."
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
          "en": "Imagine you are blindfolded on a steep, fog-shrouded mountainside in a thick mist. You cannot see the safety of the valley floor below. How can you find your way down to camp?\n\nYou can feel the local tilt of the terrain with the soles of your boots. If the ground slopes steeply upward toward the northeast, you take a step in the exact opposite direction: toward the southwest! \nThis is **Gradient Descent**.\n\nYou step downhill, pause to feel the new slope, take another step downhill, and repeat. But you must be remarkably disciplined about your step size (the **learning rate** $\\eta$):\n- If your steps are infinitesimal baby steps ($\\eta \\to 0$), you will freeze to death before reaching camp.\n- If your steps are wild, gigantic leaps ($\\eta \\gg 0$), you will overshoot the valley floor completely, catapult yourself onto the opposite mountain ridge, and diverge into disaster!\n\nFurthermore, in narrow elliptical ravines, standard gradient descent zig-zags frantically from wall to wall. Adding **Polyak Momentum** solves this: it acts like rolling a heavy bowling ball down the canyon, allowing accumulated momentum along the valley floor to wash away transverse oscillations.",
          "ar": "تخيل أنك معصوب العينين وتقف على سفح جبل وعر يلفه ضباب كثيف. لا يمكنك رؤية قاع الوادي أو المخيم الآمن في الأسفل. كيف يمكنك شق طريقك نحو النجاة؟\n\nيمكنك استشعار ميل الأرض تحت باطن حذائك مباشرة. إذا شعرت بأن الأرض ترتفع بشدة نحو الشمال الشرقي، فستخطو خطوة في الاتجاه المعاكس تماماً: نحو الجنوب الغربي!\nهذا هو جوهر **خوارزمية الانحدار التدريجي** (Gradient Descent).\n\nتخطو خطوة نحو الأسفل، وتتوقف لجس نبض الميل الجديد، ثم تخطو خطوة هبوطية أخرى، وتكرر العملية. ولكن يجب أن تكون منضبطاً للغاية بشأن حجم خطوتك (**معدل التعلم** $\\eta$):\n- إذا كانت خطواتك بالغة الصغر كالذر ($\\eta \\to 0$)، فستتجمد من البرد قبل أن تقطع متراً واحداً نحو الوادي.\n- وإذا كانت خطواتك قفزات عملاقة مفرطة ($\\eta \\gg 0$)، فستقفز فوق الوادي بأكمله، لترتطم بالجرف المقابل وتتشتت إلى الهاوية!\n\nوعلاوة على ذلك، في الوديان الضيقة، يتذبذب الانحدار العادي بعنف بين الجدران المتقابلة. وهنا يأتي دور **زخم بولياك** (Polyak Momentum): الذي يتصرف ككرة بولينغ ثقيلة تتدحرج في الوادي، فتتراكم سرعتها على طول مسار القاع وتتلاشى التذبذبات الجانبية المزعجة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{x}_{t+1} = \\mathbf{x}_t - \\eta \\nabla f(\\mathbf{x}_t) \\quad (\\text{Vanilla Gradient Descent})",
        "formulaNote": {
          "en": "Core invariant for Gradient Descent, Learning Rates & Landscape Navigation.",
          "ar": "الخاصية الرياضية الجوهرية لـ الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس."
        },
        "narrative": {
          "en": "$$\n\\mathbf{v}_{t+1} = \\beta \\mathbf{v}_t + \\eta \\nabla f(\\mathbf{x}_t), \\quad \\mathbf{x}_{t+1} = \\mathbf{x}_t - \\mathbf{v}_{t+1} \\quad (\\text{Polyak Heavy-Ball Momentum})\n$$\n$$\nf(\\mathbf{x}_{t+1}) \\le f(\\mathbf{x}_t) - \\eta \\left(1 - \\frac{L\\eta}{2}\\right) \\|\\nabla f(\\mathbf{x}_t)\\|_2^2 \\quad (\\text{Descent Lemma for } L\\text{-smooth } f)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}_t$ | $\\mathbb{R}^D$ | Current parameter coordinates at step $t$ | State vector of model weights |\n| $\\nabla f(\\mathbf{x}_t)$ | $\\mathbb{R}^D$ | Instantaneous direction of steepest ascent | Drives downhill step direction via negative sign |\n| $\\eta$ | $\\mathbb{R}_{> 0}$ | Learning rate / step length multiplier | Hyperparameter controlling step size magnitude |\n| $\\mathbf{v}_t$ | $\\mathbb{R}^D$ | Accumulated velocity buffer vector | Encodes directional kinetic memory across iterations |\n| $\\beta \\in [0, 1)$ | Scalar | Momentum friction damping coefficient | Governs exponential memory retention factor |\n| $L$ | $\\mathbb{R}_{> 0}$ | Lipschitz smoothness constant of $\\nabla f$ | Imposes strict upper bound on step size: $\\eta < 2/L$ |\n\nThe descent lemma guarantees monotonic decrease in loss at every iteration, provided the learning rate satisfies $\\eta < 2/L$.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}_t$ | $\\mathbb{R}^D$ | إحداثيات المعاملات الحالية عند الخطوة $t$ | متجه أوزان النموذج |\n| $\\nabla f(\\mathbf{x}_t)$ | $\\mathbb{R}^D$ | اتجاه الصعود الأشد اللحظي | يوجه خطوة الهبوط عبر الإشارة السالبة |\n| $\\eta$ | $\\mathbb{R}_{> 0}$ | معدل التعلم / مقياس طول الخطوة | معامل فائق يتحكم في مقدار الإزاحة |\n| $\\mathbf{v}_t$ | $\\mathbb{R}^D$ | متجه مخزن السرعة التراكمي | يمثل الذاكرة الحركية للاتجاه عبر التكرارات |\n| $\\beta \\in [0, 1)$ | قيمة قياسية | معامل تخميد الاحتكاك للزخم | يحدد نسبة الاحتفاظ بالسرعة السابقة |\n| $L$ | $\\mathbb{R}_{> 0}$ | ثابت ليبشيتز لنعومة التدرج | يفرض حداً أقصى حرجاً لحجم الخطوة: $\\eta < 2/L$ |\n\nتضمن مبرهنة الهبوط (Descent Lemma) التناقص الرتيب المستمر في قيمة الخسارة في كل خطوة، بشرط أن يلتزم معدل التعلم بالشرط الصارم $\\eta < 2/L$.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-hessian-matrix-extrema",
          "starterCode": "def momentum_gradient_descent_step(\n    x: np.ndarray,\n    grad: np.ndarray,\n    v: np.ndarray,\n    lr: float,\n    beta: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single iteration update of classical Polyak heavy-ball momentum.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Current parameter vector of shape (D,).\n    grad : np.ndarray\n        Current loss gradient vector nabla f(x) of shape (D,).\n    v : np.ndarray\n        Velocity buffer vector of shape (D,).\n    lr : float\n        Learning rate alpha > 0.\n    beta : float\n        Momentum damping coefficient beta in [0, 1).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_next : Updated parameter vector, shape (D,).\n        v_next : Updated velocity buffer vector, shape (D,).\n    \"\"\"\n    # Step 1: Accumulate momentum velocity v_{t+1} = beta * v_t + lr * grad\n    # Step 2: Update coordinates opposite to velocity x_{t+1} = x_t - v_{t+1}\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x_next, v_next = momentum_gradient_descent_step(np.array([5.0, 5.0]), np.array([2.0, 4.0]), np.array([0.0, 0.0]), 0.1, 0.9); list(np.round(x_next, 2))",
              "expected": "[4.8, 4.6]"
            },
            {
              "input": "x_next, v_next = momentum_gradient_descent_step(np.array([5.0, 5.0]), np.array([2.0, 4.0]), np.array([0.0, 0.0]), 0.1, 0.9); list(np.round(v_next, 2))",
              "expected": "[0.2, 0.4]"
            }
          ],
          "expectedOutput": "[4.8, 4.6]",
          "variants": {
            "python": {
              "starterCode": "def momentum_gradient_descent_step(\n    x: np.ndarray,\n    grad: np.ndarray,\n    v: np.ndarray,\n    lr: float,\n    beta: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single iteration update of classical Polyak heavy-ball momentum.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Current parameter vector of shape (D,).\n    grad : np.ndarray\n        Current loss gradient vector nabla f(x) of shape (D,).\n    v : np.ndarray\n        Velocity buffer vector of shape (D,).\n    lr : float\n        Learning rate alpha > 0.\n    beta : float\n        Momentum damping coefficient beta in [0, 1).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_next : Updated parameter vector, shape (D,).\n        v_next : Updated velocity buffer vector, shape (D,).\n    \"\"\"\n    # Step 1: Accumulate momentum velocity v_{t+1} = beta * v_t + lr * grad\n    # Step 2: Update coordinates opposite to velocity x_{t+1} = x_t - v_{t+1}\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[4.8, 4.6]"
            }
          },
          "solution": "import numpy as np\n\ndef momentum_gradient_descent_step(\n    x: np.ndarray,\n    grad: np.ndarray,\n    v: np.ndarray,\n    lr: float,\n    beta: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single iteration update of classical Polyak heavy-ball momentum.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Current parameter vector of shape (D,).\n    grad : np.ndarray\n        Current loss gradient vector nabla f(x) of shape (D,).\n    v : np.ndarray\n        Velocity buffer vector of shape (D,).\n    lr : float\n        Learning rate alpha > 0.\n    beta : float\n        Momentum damping coefficient beta in [0, 1).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_next : Updated parameter vector, shape (D,).\n        v_next : Updated velocity buffer vector, shape (D,).\n    \"\"\"\n    # Step 1: Accumulate momentum velocity v_{t+1} = beta * v_t + lr * grad\n    v_next = beta * v + lr * grad\n    \n    # Step 2: Update coordinates opposite to velocity x_{t+1} = x_t - v_{t+1}\n    x_next = x - v_next\n    \n    return x_next, v_next"
        },
        "hints": {
          "tier1": {
            "en": "Gradient ascent occurring (loss increases) or velocity subtracted in wrong direction.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Since $v$ accumulates positive gradient steps $\\alpha \\nabla f$, the parameter update must subtract $v$ to minimize the loss.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Compute `v_next = beta * v + lr * grad` then `x_next = x - v_next`.",
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
            "en": "When optimizing an ill-conditioned quadratic ravine $f(x, y) = 100x^2 + y^2$, standard gradient descent oscillates violently back and forth across the steep $x$-walls while crawling agonizingly slowly along the shallow $y$-axis. How does introducing Polyak momentum ($\\beta \\approx 0.9$) resolve this failure?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "It rotates the coordinate frame so that $x$ and $y$ are uncoupled.",
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
                "en": "It averages velocity vectors over time, causing alternating positive and negative oscillations across the steep walls to cancel out while persistently compounding forward velocity along the shallow valley floor.",
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
                "en": "It sets the learning rate to zero whenever rapid oscillations are detected.",
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
                "en": "It computes the exact inverse of the Hessian matrix at every step.",
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
    "id": "bayes-theorem",
    "title": "Constrained Optimization & Lagrange Multipliers",
    "titleAr": "التحسين المقيد ومضروبات لاغرانج",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Suppose you wish to climb to the highest possible elevation on a scenic mountain landscape ($f(x, y)$), but you are strictly forbidden by...",
      "ar": "لنفترض أنك ترغب في الوصول إلى أعلى ارتفاع ممكن على جبل بديع ($f(x, y)$)، ولكن حراس المحمية يمنعونك منعاً باتاً من مغادرة مسار سياحي مرصوف..."
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
          "en": "Suppose you wish to climb to the highest possible elevation on a scenic mountain landscape ($f(x, y)$), but you are strictly forbidden by park rangers from stepping off a paved asphalt trail ($g(x, y) = c$). You cannot simply run to the mountain's true peak, because the trail does not pass through the summit. Where along the trail is your elevation maximized?\n\nConsider hiking along the trail: as long as the trail cuts across elevation contour lines at an angle, you are actively gaining or losing height. The *only* point where your elevation stops changing along the trail is when **the trail runs perfectly parallel to a contour line**!\n\nAt that exact tangency point, the trail does not cross the contour; it grazes it. Because the normal vector to the trail is $\\nabla g$ and the normal vector to the contour line is $\\nabla f$, the two gradient vectors must be **perfectly parallel and collinear**: $\\nabla f = \\lambda \\nabla g$. The scaling constant $\\lambda$ is the famous **Lagrange Multiplier**, and in economics and machine learning, it measures the exact \"shadow price\" or sensitivity of the optimal cost to relaxing the constraint.",
          "ar": "لنفترض أنك ترغب في الوصول إلى أعلى ارتفاع ممكن على جبل بديع ($f(x, y)$)، ولكن حراس المحمية يمنعونك منعاً باتاً من مغادرة مسار سياحي مرصوف محدد بالمعادلة ($g(x, y) = c$). لا يمكنك التوجه مباشرة إلى قمة الجبل الحقيقية لأن المسار لا يمر بها. أين بالضبط على طول هذا المسار ستحقق أقصى ارتفاع ممكن؟\n\nفكر في مسار حركتك: طالما أن المسار السياحي يقطع خطوط كنتور الارتفاع بزاوية مائلة، فإنك تواصل الصعود أو الهبوط باستمرار. النقطة *الوحيدة* التي يتوقف عندها ارتفاعك عن التغير على طول المسار هي النقطة التي **يسير فيها المسار موازياً تماماً لخط الكنتور**!\n\nعند نقطة التماس هذه تحديداً، لا يشطر المسار خط الكنتور بل يلامسه بخفة. ونظراً لأن المتجه العمودي على المسار هو $\\nabla g$ والمتجه العمودي على خط الكنتور هو $\\nabla f$، فإن المتجهين يجب أن يكونا **متوازيين تماماً وعلى نفس خط العمل**: $\\nabla f = \\lambda \\nabla g$. يُدعى معامل التناسب $\\lambda$ بـ **مضروب لاغرانج** (Lagrange Multiplier)، ويمثل في الاقتصاد وتعلم الآلة \"السعر الخفي\" أو الحساسية الهامشية لقيمة الهدف عند إرخاء القيد."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\mathbf{x} \\in \\mathbb{R}^N} f(\\mathbf{x}) \\quad \\text{subject to} \\quad g_j(\\mathbf{x}) = 0, \\; j = 1, \\dots, M",
        "formulaNote": {
          "en": "Core invariant for Constrained Optimization & Lagrange Multipliers.",
          "ar": "الخاصية الرياضية الجوهرية لـ التحسين المقيد ومضروبات لاغرانج."
        },
        "narrative": {
          "en": "$$\n\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda}) \\coloneqq f(\\mathbf{x}) + \\sum_{j=1}^M \\lambda_j g_j(\\mathbf{x}) = f(\\mathbf{x}) + \\boldsymbol{\\lambda}^T \\mathbf{g}(\\mathbf{x})\n$$\n$$\n\\begin{bmatrix} Q & A^T \\\\ A & 0 \\end{bmatrix} \\begin{bmatrix} \\mathbf{x}^* \\\\ \\boldsymbol{\\lambda}^* \\end{bmatrix} = \\begin{bmatrix} -\\mathbf{c} \\\\ \\mathbf{b} \\end{bmatrix} \\quad (\\text{Karush-Kuhn-Tucker Block System})\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $f(\\mathbf{x})$ | $\\mathbb{R}^N \\to \\mathbb{R}$ | Unconstrained scalar objective surface | Target function being minimized |\n| $g_j(\\mathbf{x}) = 0$ | Manifold | Constraint boundary hypersurface | Rigid restriction defining feasible domain |\n| $\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda})$ | $\\mathbb{R}^{N+M} \\to \\mathbb{R}$ | Lagrangian auxiliary function | Converts constrained problem into saddle-point search |\n| $\\lambda_j$ | $\\mathbb{R}$ | Gradient collinearity alignment scale factor | Lagrange multiplier measuring marginal constraint tension |\n| $\\mathbf{x}^*$ | $\\mathbb{R}^N$ | Optimal primal coordinates | Optimal feasible decision vector |\n| $\\boldsymbol{\\lambda}^*$ | $\\mathbb{R}^M$ | Optimal dual coordinates | Shadow prices indicating sensitivity to constraint bounds |\n\nSetting $\\nabla_{\\mathbf{x}, \\boldsymbol{\\lambda}} \\mathcal{L} = \\mathbf{0}$ yields the Karush-Kuhn-Tucker (KKT) conditions. The solution is not a local minimum of $\\mathcal{L}$, but a saddle point: minimized with respect to $\\mathbf{x}$ and maximized with respect to $\\boldsymbol{\\lambda}$.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $f(\\mathbf{x})$ | $\\mathbb{R}^N \\to \\mathbb{R}$ | دالة الهدف القياسية غير المقيدة | الدالة المراد تصغيرها |\n| $g_j(\\mathbf{x}) = 0$ | متعدد شعب | السطح الفوقي الحاكم لقيود المسألة | الحدود الصلبة التي تحدد فضاء الحلول المقبولة |\n| $\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda})$ | $\\mathbb{R}^{N+M} \\to \\mathbb{R}$ | دالة لاغرانج المساعدة | تحول المسألة المقيدة إلى بحث عن نقطة سرجية |\n| $\\lambda_j$ | $\\mathbb{R}$ | معامل توازي وتطابق متجهات التدرج | مضروب لاغرانج المعبر عن الشد الهامشي للقيد |\n| $\\mathbf{x}^*$ | $\\mathbb{R}^N$ | حل المتغيرات الأصلية الأمثل | متجه القرار الأمثل الملتزم بكافة القيود |\n| $\\boldsymbol{\\lambda}^*$ | $\\mathbb{R}^M$ | حل المتغيرات الثنائية الأمثل | الأسعار الخفية المعبرة عن حساسية الهدف لتعديل القيود |\n\nتؤدي مساواة التدرج $\\nabla_{\\mathbf{x}, \\boldsymbol{\\lambda}} \\mathcal{L} = \\mathbf{0}$ بالصفر إلى شروط كاروش-كون-تاكر (KKT). لا يمثل الحل نهاية صغرى لدالة لاغرانج، بل نقطة سرجية: يتم تصغيرها بالنسبة للمتغيرات الأصلية $\\mathbf{x}$ وتعظيمها بالنسبة للمضروبات $\\boldsymbol{\\lambda}$.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-bayes-theorem",
          "starterCode": "def solve_constrained_quadratic_kkt(\n    Q: np.ndarray,\n    c: np.ndarray,\n    A: np.ndarray,\n    b: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Solve equality-constrained quadratic program:\n        min  0.5 * x^T Q x + c^T x\n        s.t. A x = b\n    via the Karush-Kuhn-Tucker (KKT) block linear matrix system.\n    \n    Parameters\n    ----------\n    Q : np.ndarray\n        Symmetric positive-definite Hessian matrix of shape (N, N).\n    c : np.ndarray\n        Linear cost vector of shape (N,).\n    A : np.ndarray\n        Linear constraint matrix of shape (M, N) with M < N.\n    b : np.ndarray\n        Constraint target vector of shape (M,).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_star : Optimal primal solution vector of shape (N,).\n        lambda_star : Optimal dual Lagrange multiplier vector of shape (M,).\n    \"\"\"\n    # Step 1: Assemble KKT block coefficient matrix [[Q, A^T], [A, 0]]\n    # Step 2: Assemble right-hand side vector [-c, b]\n    # Step 3: Solve linear system KKT @ [x*, lambda*] = rhs\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "x_s, lam_s = solve_constrained_quadratic_kkt(np.eye(2), np.zeros(2), np.array([[1.0, 1.0]]), np.array([2.0])); list(np.round(x_s, 2))",
              "expected": "[1.0, 1.0]"
            },
            {
              "input": "x_s, lam_s = solve_constrained_quadratic_kkt(np.eye(2), np.zeros(2), np.array([[1.0, 1.0]]), np.array([2.0])); list(np.round(lam_s, 2))",
              "expected": "[-1.0]"
            }
          ],
          "expectedOutput": "[1.0, 1.0]",
          "variants": {
            "python": {
              "starterCode": "def solve_constrained_quadratic_kkt(\n    Q: np.ndarray,\n    c: np.ndarray,\n    A: np.ndarray,\n    b: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Solve equality-constrained quadratic program:\n        min  0.5 * x^T Q x + c^T x\n        s.t. A x = b\n    via the Karush-Kuhn-Tucker (KKT) block linear matrix system.\n    \n    Parameters\n    ----------\n    Q : np.ndarray\n        Symmetric positive-definite Hessian matrix of shape (N, N).\n    c : np.ndarray\n        Linear cost vector of shape (N,).\n    A : np.ndarray\n        Linear constraint matrix of shape (M, N) with M < N.\n    b : np.ndarray\n        Constraint target vector of shape (M,).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_star : Optimal primal solution vector of shape (N,).\n        lambda_star : Optimal dual Lagrange multiplier vector of shape (M,).\n    \"\"\"\n    # Step 1: Assemble KKT block coefficient matrix [[Q, A^T], [A, 0]]\n    # Step 2: Assemble right-hand side vector [-c, b]\n    # Step 3: Solve linear system KKT @ [x*, lambda*] = rhs\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[1.0, 1.0]"
            }
          },
          "solution": "import numpy as np\n\ndef solve_constrained_quadratic_kkt(\n    Q: np.ndarray,\n    c: np.ndarray,\n    A: np.ndarray,\n    b: np.ndarray\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Solve equality-constrained quadratic program:\n        min  0.5 * x^T Q x + c^T x\n        s.t. A x = b\n    via the Karush-Kuhn-Tucker (KKT) block linear matrix system.\n    \n    Parameters\n    ----------\n    Q : np.ndarray\n        Symmetric positive-definite Hessian matrix of shape (N, N).\n    c : np.ndarray\n        Linear cost vector of shape (N,).\n    A : np.ndarray\n        Linear constraint matrix of shape (M, N) with M < N.\n    b : np.ndarray\n        Constraint target vector of shape (M,).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_star : Optimal primal solution vector of shape (N,).\n        lambda_star : Optimal dual Lagrange multiplier vector of shape (M,).\n    \"\"\"\n    n = Q.shape[0]\n    m = A.shape[0]\n    \n    # Step 1: Assemble KKT block coefficient matrix [[Q, A^T], [A, 0]]\n    KKT = np.block([\n        [Q, A.T],\n        [A, np.zeros((m, m))]\n    ])\n    \n    # Step 2: Assemble right-hand side vector [-c, b]\n    rhs = np.concatenate([-c, b])\n    \n    # Step 3: Solve linear system KKT @ [x*, lambda*] = rhs\n    solution = np.linalg.solve(KKT, rhs)\n    \n    # Step 4: Extract primal solution and dual multipliers\n    x_star = solution[:n]\n    lambda_star = solution[n:]\n    \n    return x_star, lambda_star"
        },
        "hints": {
          "tier1": {
            "en": "Primal stationarity condition violated ($Q\\mathbf{x}^* + \\mathbf{c} + A^T\\boldsymbol{\\lambda} \\ne \\mathbf{0}$) or sign error in $\\boldsymbol{\\lambda}^*$.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Stationarity requires $Q\\mathbf{x} + A^T\\boldsymbol{\\lambda} = -\\mathbf{c}$. Using `c` instead of `-c` flips the sign of the primal gradient balance.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Negate $c$ in the RHS vector: `np.concatenate([-c, b])`.",
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
            "en": "In Support Vector Machines (SVMs), the margin maximization problem minimizes $\\frac{1}{2}\\|\\mathbf{w}\\|^2$ subject to classification margin constraints $y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1$. At the optimal solution, many training points have Lagrange multipliers $\\alpha_i = 0$, while a select few have $\\alpha_i > 0$. What is the geometric interpretation of the points with $\\alpha_i > 0$?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ التحسين المقيد ومضروبات لاغرانج تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "They are statistical outliers that should be purged from the training corpus.",
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
                "en": "They are the critical \"Support Vectors\" lying directly on the margin boundary ($y_i(\\mathbf{w}^T \\mathbf{x}_i + b) = 1$); moving them would alter the optimal boundary, whereas points with $\\alpha_i = 0$ lie safely beyond the margin and exert zero force.",
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
                "en": "They are misclassified training points where the margin constraint failed completely.",
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
                "en": "They represent data samples where the loss surface exhibits a local maximum.",
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
    "id": "central-limit-theorem",
    "title": "The Central Limit Theorem & Geometric Convergence of Noise",
    "titleAr": "مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Take an ordinary six-sided die and roll it once. The outcome is uniformly flat and jagged: there is an equal $1/6$ probability of getting a...",
      "ar": "خذ نرد طاولة عادياً ذا ستة أوجه وألقه مرة واحدة. يكون التوزيع الاحتمالي للناتج منبسطاً ومتقطعاً تماماً: احتمال متساوٍ قدره $1/6$ للحصول على..."
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
          "en": "Take an ordinary six-sided die and roll it once. The outcome is uniformly flat and jagged: there is an equal $1/6$ probability of getting a 1, 2, 3, 4, 5, or 6. There is nothing remotely round, smooth, or bell-shaped about this distribution.\n\nNow, roll 100 dice simultaneously and calculate their average score. Repeat this exact experiment 1,000 times and plot a histogram of those 1,000 recorded averages. What do you see? Miraculously, the histogram forms a **silky-smooth, perfectly symmetrical Gaussian bell curve**!\n\nEven if you started with a bizarre, heavily skewed distribution—like coin flips, radioactive particle decay intervals, or lottery ticket jackpots—the simple act of summing independent random variables washes away all individual idiosyncrasies, skewness, and sharp corners. The **Central Limit Theorem (CLT)** proves that the Gaussian distribution is the cosmic universal attractor of additive noise: as independent random variables add up, high-dimensional probability geometry forces their projected sum to converge asymptotically to a normal distribution.",
          "ar": "خذ نرد طاولة عادياً ذا ستة أوجه وألقه مرة واحدة. يكون التوزيع الاحتمالي للناتج منبسطاً ومتقطعاً تماماً: احتمال متساوٍ قدره $1/6$ للحصول على 1 أو 2 أو 3 أو 4 أو 5 أو 6. لا يوجد أي انحناء أو شكل جرسي في هذا التوزيع الأولي.\n\nوالآن، ألقِ 100 نرد في وقت واحد واحسب متوسط درجاتها. كرر هذه التجربة بالكامل 1,000 مرة، ثم ارسم مدرجاً تكرارياً لتلك المتوسطات الألف المسجلة. ماذا ترى أمامك؟ بمعجزة رياضية مدهشة، يُشكل المدرج التكراري **منحنى غاوسياً أملس ومتناظراً تماماً على شكل جرس**!\n\nحتى لو بدأت بتوزيع أولي غريب الأطوار، ملتوٍ وغير متماثل—مثل رميات العملة، أو فترات التحلل الإشعاعي، أو أرباح اليانصيب—فإن عملية جمع المتغيرات العشوائية المستقلة تغسل كل التشوهات والزوايا الحادة الفردية. تُثبت **مبرهنة النهاية المركزية** (Central Limit Theorem) أن التوزيع الطبيعي هو الجاذب الكوني الشامل للضوضاء التراكمية: فعندما تتجمع مصادر العشوائية المستقلة، تُجبر الهندسة الاحتمالية عالية الأبعاد مجموعها على التقارب الحتمي نحو التوزيع الطبيعي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\bar{X}_N \\coloneqq \\frac{1}{N} \\sum_{i=1}^N X_i, \\quad X_i \\overset{\\text{i.i.d.}}{\\sim} \\mathcal{D}(\\mu, \\sigma^2 < \\infty)",
        "formulaNote": {
          "en": "Core invariant for The Central Limit Theorem & Geometric Convergence of Noise.",
          "ar": "الخاصية الرياضية الجوهرية لـ مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء."
        },
        "narrative": {
          "en": "$$\nZ_N \\coloneqq \\frac{\\bar{X}_N - \\mu}{\\sigma / \\sqrt{N}} = \\frac{\\sum_{i=1}^N X_i - N\\mu}{\\sigma \\sqrt{N}} \\xrightarrow{d} \\mathcal{N}(0, 1) \\quad \\text{as } N \\to \\infty\n$$\n$$\n\\lim_{N \\to \\infty} P(Z_N \\le z) = \\Phi(z) \\coloneqq \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^z e^{-\\frac{t^2}{2}} \\, dt\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $X_i$ | Random Variable | Independent sample draw from arbitrary distribution $\\mathcal{D}$ | Elementary source of random variation |\n| $\\mu = \\mathbb{E}[X_i]$ | $\\mathbb{R}$ | Center of mass / true population mean | Translation centering anchor parameter |\n| $\\sigma = \\sqrt{\\operatorname{Var}(X_i)}$ | $\\mathbb{R}_{> 0}$ | Population standard deviation | Scale parameter governing dispersion |\n| $\\bar{X}_N$ | Random Variable | Sample mean over $N$ observations | Estimator with shrinking standard error $\\sigma / \\sqrt{N}$ |\n| $Z_N$ | Standardized Variable | Normalized Z-score with mean 0 and variance 1 | Universal canonical variable exhibiting asymptotic normality |\n| $\\Phi(z)$ | $\\mathbb{R} \\to [0, 1]$ | Cumulative distribution function of standard normal | Universal limiting measure |\n\nCrucial distinction: the raw data distribution $X$ never turns into a normal distribution as $N$ increases. What becomes normal is the distribution of the **sample mean** $\\bar{X}_N$.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $X_i$ | متغير عشوائي | سحب عشوائي مستقل من توزيع عام $\\mathcal{D}$ | المصدر الأولي للتغير العشوائي |\n| $\\mu = \\mathbb{E}[X_i]$ | $\\mathbb{R}$ | مركز الكتلة / المتوسط الحقيقي للمجتمع | معامل الإسناد لتوسيط التوزيع |\n| $\\sigma = \\sqrt{\\operatorname{Var}(X_i)}$ | $\\mathbb{R}_{> 0}$ | الانحراف المعياري للمجتمع | معامل القياس الحاكم لمدى التشتت |\n| $\\bar{X}_N$ | متغير عشوائي | متوسط العينة عبر $N$ مشاهدة | مقدِّر إحصائي ذو خطأ معياري متقلص $\\sigma / \\sqrt{N}$ |\n| $Z_N$ | متغير معياري | درجة معيارية Z ذات متوسط 0 وتباين 1 | المتغير القانوني الذي يُظهر التقارب نحو التوزيع الطبيعي |\n| $\\Phi(z)$ | $\\mathbb{R} \\to [0, 1]$ | دالة التوزيع التراكمي للتوزيع الطبيعي المعياري | المقياس الاحتمالي الحتمي عند اللانهاية |\n\nتمييز جوهري: التوزيع الأصلي للبيانات $X$ لا يتحول إلى توزيع طبيعي أبداً بزيادة حجم العينة. ما يتحول إلى التوزيع الطبيعي هو توزيع **متوسط العينة** $\\bar{X}_N$ حصراً.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-central-limit-theorem",
          "starterCode": "def standardized_sample_means(samples: np.ndarray, true_mean: float, true_std: float) -> np.ndarray:\n    \"\"\"\n    Compute standardized sample mean Z-scores across M independent experiments.\n    \n    Parameters\n    ----------\n    samples : np.ndarray\n        2D array of shape (M, N) containing M experiments of N observations each.\n    true_mean : float\n        True population mean mu.\n    true_std : float\n        True population standard deviation sigma > 0.\n        \n    Returns\n    -------\n    np.ndarray\n        Standardized Z-scores across all M experiments, shape (M,).\n    \"\"\"\n    # Step 1: Compute sample means along observation axis (axis 1) -> shape (M,)\n    # Step 2: Determine sample size N per experiment\n    # Step 3: Compute theoretical standard error of the mean: sigma / sqrt(N)\n    # TODO: Complete the vectorized implementation\n    pass",
          "testCases": [
            {
              "input": "samples = np.array([[1.0, 3.0], [2.0, 4.0]]); list(np.round(standardized_sample_means(samples, 2.0, 1.0), 2))",
              "expected": "[0.0, 1.41]"
            },
            {
              "input": "samples = np.array([[5.0, 5.0, 5.0]]); float(standardized_sample_means(samples, 5.0, 2.0)[0])",
              "expected": "0.0"
            }
          ],
          "expectedOutput": "[0.0, 1.41]",
          "variants": {
            "python": {
              "starterCode": "def standardized_sample_means(samples: np.ndarray, true_mean: float, true_std: float) -> np.ndarray:\n    \"\"\"\n    Compute standardized sample mean Z-scores across M independent experiments.\n    \n    Parameters\n    ----------\n    samples : np.ndarray\n        2D array of shape (M, N) containing M experiments of N observations each.\n    true_mean : float\n        True population mean mu.\n    true_std : float\n        True population standard deviation sigma > 0.\n        \n    Returns\n    -------\n    np.ndarray\n        Standardized Z-scores across all M experiments, shape (M,).\n    \"\"\"\n    # Step 1: Compute sample means along observation axis (axis 1) -> shape (M,)\n    # Step 2: Determine sample size N per experiment\n    # Step 3: Compute theoretical standard error of the mean: sigma / sqrt(N)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[0.0, 1.41]"
            }
          },
          "solution": "import numpy as np\n\ndef standardized_sample_means(samples: np.ndarray, true_mean: float, true_std: float) -> np.ndarray:\n    \"\"\"\n    Compute standardized sample mean Z-scores across M independent experiments.\n    \n    Parameters\n    ----------\n    samples : np.ndarray\n        2D array of shape (M, N) containing M experiments of N observations each.\n    true_mean : float\n        True population mean mu.\n    true_std : float\n        True population standard deviation sigma > 0.\n        \n    Returns\n    -------\n    np.ndarray\n        Standardized Z-scores across all M experiments, shape (M,).\n    \"\"\"\n    # Step 1: Compute sample means along observation axis (axis 1) -> shape (M,)\n    sample_means = np.mean(samples, axis=1)\n    \n    # Step 2: Determine sample size N per experiment\n    n = samples.shape[1]\n    \n    # Step 3: Compute theoretical standard error of the mean: sigma / sqrt(N)\n    std_error = true_std / np.sqrt(n)\n    \n    # Step 4: Standardize sample means: Z = (x_bar - mu) / (sigma / sqrt(N))\n    z_scores = (sample_means - true_mean) / std_error\n    \n    return z_scores"
        },
        "hints": {
          "tier1": {
            "en": "Output variance is off by factor of $N$ or shape mismatch `(N,)`.",
            "ar": "حلل الشروط الرياضية الثابتة وتأكد من توافق أبعاد المصفوفات."
          },
          "tier2": {
            "en": "Standardizing sample means requires dividing by the *standard error of the mean* $\\sigma_{\\bar{X}} = \\sigma / \\sqrt{N}$, not the raw population standard deviation $\\sigma$.",
            "ar": "استخدم العمليات الموجهة بدلاً من الحلقات التكرارية لتفادي تجاوز وقت التنفيذ."
          },
          "tier3": {
            "en": "Divide by `true_std / np.sqrt(samples.shape[1])`.",
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
            "en": "A quantitative researcher collects 100,000 independent financial returns modeled by an asymmetric, heavily skewed exponential distribution. A junior analyst argues: *\"Because the underlying returns are heavily skewed and asymmetric, the distribution of our portfolio's average daily return over a sample of 250 days will also be heavily skewed.\"* How does the Central Limit Theorem address this claim?",
            "ar": "ما هو المبدأ الجوهري الحاكم لـ مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء تحت القيود العملية؟"
          },
          "options": [
            {
              "text": {
                "en": "The analyst is correct because exponential distributions violate the independence assumption of the CLT.",
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
                "en": "The analyst is mistaken: provided the underlying distribution has finite variance, the distribution of the sample mean washes away individual skewness and converges to a symmetric Gaussian bell curve $\\mathcal{N}(\\mu, \\sigma^2/250)$.",
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
                "en": "The CLT only applies if the underlying population is generated by physical coin flips or dice rolls.",
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
                "en": "The sample size of 250 is too small for any probabilistic theorems to hold.",
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
  }
];
