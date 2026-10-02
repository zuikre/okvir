import type { CurriculumModule } from '../types';

export const mathModules: CurriculumModule[] = [
  {
    "id": "t1-01",
    "title": "Cartesian Coordinate Systems & The Euclidean Metric",
    "titleAr": "نظام الإحداثيات الديكارتية والمقياس الإقليدي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine standing in the middle of an infinite, flat desert under an open sky. There are no trees, no roads, and no landmarks in sight.",
      "ar": "تخيل نفسك واقفاً في قلب صحراء منبسطة لا متناهية تحت قبة سماء صافية. لا أشجار، ولا طرق، ولا معالم تهتدي بها."
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
          "en": "Imagine standing in the middle of an infinite, flat desert under an open sky. There are no trees, no roads, and no landmarks in sight. If you discover a hidden freshwater spring and need to tell a friend how to find it tomorrow, what can you do? You cannot simply say \"walk forward,\" because directions are meaningless without a mutual point of reference. Your first move must be to plant a wooden peg firmly in the sand. That wooden peg is your **origin** ($\\mathbf{0}$). From that origin, you scratch two perpendicular lines across the desert floor: one running East-West (the horizontal $X$-axis) and one running North-South (the vertical $Y$-axis). Now, the oasis has a permanent, unambiguous address: \"walk 4 kilometers East, then 3 kilometers North.\" You have just invented the **Cartesian coordinate system**.\n\nOnce locations have coordinate addresses, we confront an immediate physical question: how far apart are two points? If you are a pedestrian walking through a modern city built on a rigid rectangular grid like Manhattan, you cannot walk straight through skyscrapers. You must march 4 blocks East and then 3 blocks North, traveling a total distance of 7 blocks. This path—constrained to right-angled street grids—is known as the **Manhattan distance** or $L_1$ metric. But what if you are a falcon soaring through the sky? You would never bother walking around the street blocks. You spread your wings and fly along a straight laser beam directly from the origin to the oasis, cutting diagonally across the city.\n\nThat diagonal flight path forms the hypotenuse of a right-angled triangle. Over two millennia ago, Pythagoras proved that the square of this hypotenuse equals the sum of the squares of the perpendicular legs ($a^2 + b^2 = c^2$). When you take the square root of that sum, you obtain the straight-line ruler distance: $\\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$ kilometers. This straight-line distance is what mathematicians formally call the **Euclidean metric** (or $L_2$ norm). Whether you are working in two dimensions on a chalkboard, three dimensions in physical space, or thousands of dimensions in modern AI embeddings, the Euclidean metric remains the universal ruler of geometry.\n\nCrucially, physical space does not care how you orient your coordinate grid. If you tilt your head or rotate your compass by 45 degrees, the individual coordinate numbers of the oasis will change dramatically. Yet the actual physical distance—the physical length of the rope stretched between the origin and the oasis—remains completely identical. This fundamental property is called **rotational invariance** (or isotropy). The Euclidean metric measures intrinsic geometric reality, untouched by arbitrary human choices of coordinate frames.\n\n---",
          "ar": "تخيل نفسك واقفاً في قلب صحراء منبسطة لا متناهية تحت قبة سماء صافية. لا أشجار، ولا طرق، ولا معالم تهتدي بها. إذا اكتشفت فجأة نبع ماء عذب وأردت أن تصف مكانه بدقة لصديقك ليعثر عليه غداً، فماذا عساك تفعل؟ لا يمكنك أن تقول له ببساطة \"امشِ للأمام\"، فالكلمات تفقد معناها دون نقطة ارتكاز مشتركة. أول خطوة عملية تتخذها هي غرس وتد خشبي في الرمال؛ هذا الوتد هو ما نسميه **نقطة الأصل** ($\\mathbf{0}$). ومن هذا الوتد، ترسم خطين مستقيمين متعامدين على الرمال: خطاً يمتد من الشرق إلى الغرب (المحور الأفقي $X$)، وخطاً آخر يمتد من الشمال إلى الجنوب (المحور الرأسي $Y$). في تلك اللحظة بالذات، أصبح للنبع عنوان فريد ودقيق: \"سر 4 كيلومترات شرقاً، ثم 3 كيلومترات شمالاً\". لقد قمت للتو بابتكار **نظام الإحداثيات الديكارتية**.\n\nبمجرد ترقيم المواقع بإحداثيات محددة، يبرز سؤال فيزيائي بديهي: كم تبلغ المسافة الحقيقية الفاصلة بين نقطتين؟ إذا كنت تمشي على قدميك في مدينة مبنية على شكل شبكة مربعة صارمة مثل حي مانهاتن في نيويورك، فلن تتمكن من اختراق ناطحات السحاب والجدران؛ بل ستضطر للمشي 4 مربعات شرقاً ثم الانعطاف للمشي 3 مربعات شمالاً، قاطعاً مسافة إجمالية قدرها 7 مربعات. هذا المسار الشبكي المتعامد يُعرف بـ **مسافة مانهاتن** (أو معيار $L_1$). ولكن لو كنت صقراً يحلق بحرية في الفضاء المفتوح، فلن تدور حول الأبنية مطلقاً، بل ستفرد جناحيك وتنطلق كشعاع ليزر في خط مستقيم قاطعاً الفضاء قطرياً من نقطة الانطلاق إلى النبع مباشرة.\n\nذلك المسار القطري الذي قطعه الصقر ليس سوى وتر لمثلث قائم الزاوية تشكل أضلاعه إزاحاتك الأفقية والعمودية. قبل أكثر من ألفي عام، برهن فيثاغورس أن مربع هذا الوتر يساوي مجموع مربعي الضلعين القائمين ($a^2 + b^2 = c^2$). وعندما تأخذ الجذر التربيعي لهذا المجموع، تحصل على مسافة المسطرة المستقيمة: $\\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$ كيلومترات. هذه المسافة المستقيمة هي ما يطلق عليه علماء الرياضيات رسمياً **المقياس الإقليدي** (أو معيار $L_2$). وسواء كنت تعمل في بعدين على سبورة، أو في فضاء فيزيائي ثلاثي الأبعاد، أو في فضاء يضم آلاف الأبعاد لتمثيل الكلمات في الذكاء الاصطناعي، يظل المقياس الإقليدي هو المسطرة الهندسية القياسية للكون.\n\nالأمر فائق الجمال هندسياً هو أن الفضاء الفيزيائي لا يكترث بكيفية توجيهك لشبكة المحاور. فلو أملت رأسك أو قمت بتدوير بوصلتك بزاوية 45 درجة، ستتغير الأرقام التي تصف موقع النبع في دفترك بشكل كبير، لكن المسافة الفيزيائية الفعلية—أي طول الحبل المشدود بين نقطة الأصل والنبع—تظل ثابتة تماماً دون أدنى تغيير. هذه الخاصية الجوهرية تسمى **الصمود الدوراني** (Rotational Invariance). فالمقياس الإقليدي يقيس الحقيقة الهندسية الجوهرية المجردة عن أي اختيار بشري عشوائي للمحاور."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "d_2(\\mathbf{p}, \\mathbf{q}) \\coloneqq \\|\\mathbf{p} - \\mathbf{q}\\|_2 = \\sqrt{\\sum_{i=1}^n (p_i - q_i)^2} = \\sqrt{(\\mathbf{p} - \\mathbf{q})^T (\\mathbf{p} - \\mathbf{q})}",
        "formulaNote": {
          "en": "Mathematical anchor for Cartesian Coordinate Systems & The Euclidean Metric.",
          "ar": "المرساة الرياضية لـ نظام الإحداثيات الديكارتية والمقياس الإقليدي."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{p}, \\mathbf{q} \\in \\mathbb{R}^n$ | Position vectors | Coordinate vectors identifying the exact spatial positions of two points across $n$ dimensions. |\n| $\\mathbf{p} - \\mathbf{q}$ | Displacement vector | The directional vector pointing straight from destination $\\mathbf{q}$ to source $\\mathbf{p}$. |\n| $p_i - q_i$ | Coordinate difference | The linear distance gap separated along dimension $i$ alone (the length of one leg of the triangle). |\n| $(p_i - q_i)^2$ | Squared difference | Multiplies the gap by itself. This erases negative signs and scales larger errors quadratically. |\n| $\\sum_{i=1}^n$ | Dimension accumulator | Adds up the independent squared contributions from all $n$ mutually orthogonal (perpendicular) axes. |\n| $\\sqrt{\\dots}$ | Square root operator | Inverts the squaring operation, converting area-like squared units back to linear ruler units (e.g., meters). |\n| $(\\mathbf{p}-\\mathbf{q})^T(\\mathbf{p}-\\mathbf{q})$ | Inner product (Dot product) | Compact algebraic matrix notation: multiplying a row vector by a column vector computes the sum of squares. |\n\n##### Why the Math Works Step-by-Step\n1. **Why subtract coordinates?** The difference $p_i - q_i$ isolates the exact horizontal or vertical distance separating the two points along a single axis, ignoring all other axes.\n2. **Why square each difference?** If you walk 3 meters backward ($-3$), your physical distance traveled is still positive. Squaring eliminates negative signs, preventing displacements like $+5$ and $-5$ from falsely canceling out to $0$. Furthermore, the Pythagorean theorem dictates that in flat space, the hypotenuse relates to the *sum of squares* of orthogonal legs.\n3. **Why sum across dimensions?** Because Cartesian axes are strictly perpendicular (orthogonal), movement along the $X$-axis does not affect your coordinate on the $Y$-axis. By iterating Pythagoras in higher dimensions, independent squared steps add directly: $d^2 = \\Delta x^2 + \\Delta y^2 + \\Delta z^2 + \\dots$.\n4. **Why take the square root at the end?** Summing squares yields a quantity measured in square units (e.g., $\\text{meters}^2$). Taking the square root restores the metric to physical units of linear length ($\\text{meters}$).\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{p}, \\mathbf{q} \\in \\mathbb{R}^n$ | متجها الموقع | إحداثيات تحدد الموقع المكاني لنقطتين بدقة في فضاء ذي $n$ بعداً. |\n| $\\mathbf{p} - \\mathbf{q}$ | متجه الإزاحة | المتجه الذي ينطلق مباشرة من النقطة $\\mathbf{q}$ موجهاً نحو النقطة $\\mathbf{p}$. |\n| $p_i - q_i$ | الفارق الإحداثي | المسافة الفاصلة بين النقطتين على طول البعد $i$ بمفرده (طول أحد أضلاع المثلث القائم). |\n| $(p_i - q_i)^2$ | مربع الفارق | ضرب الفارق في نفسه؛ يلغي الإشارات السالبة ويضاعف عقوبة التباعد الكبير تربيعياً. |\n| $\\sum_{i=1}^n$ | مجمع الأبعاد | جمع المساهمات التربيعية المستقلة لكافة المحاور المتعامدة في الفضاء. |\n| $\\sqrt{\\dots}$ | الجذر التربيعي | يعكس عملية التربيع، معيداً وحدات المساحة التربيعية إلى وحدات طول خطية حقيقية (مثل الأمتار). |\n| $(\\mathbf{p}-\\mathbf{q})^T(\\mathbf{p}-\\mathbf{q})$ | الجداء النقطي / الداخلي | صياغة مصفوفية أنيقة: ضرب متجه صفي في متجه عمودي يجمع تلقائياً مربعات كافة المركبات. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا نطرح الإحداثيات؟** يحدد الطرح $p_i - q_i$ الفجوة المكانية الصافية بين النقطتين على طول كل بعد بمعزل تام عن باقي الأبعاد.\n2. **لماذا نربّع الفروق؟** إذا تراجعت خطوة للوراء بمقدار ($-3$) أمتار، فإن المسافة المقطوعة تظل موجبة فيزيائياً. التربيع يزيل الإشارات السالبة حتى لا يلغي التقدم بمقدار $+5$ والتراجع بمقدار $-5$ بعضهما البعض. كما أن مبرهنة فيثاغورس تنص على أن مربع الوتر يساوي *مجموع مربعات* الأضلاع المتعامدة.\n3. **لماذا نجمع عبر كافة الأبعاد؟** بما أن محاور الإحداثيات الديكارتية متعامدة تماماً، فإن حركتك على المحور الأفقي لا تؤثر إطلاقاً على موقعك على المحور الرأسي، مما يسمح بجمع المساهمات التربيعية للأبعاد مباشرة: $d^2 = \\Delta x^2 + \\Delta y^2 + \\Delta z^2$.\n4. **لماذا نأخذ الجذر التربيعي في النهاية؟** جمع المربعات ينتج قيمة مقاسة بوحدات تربيعية (مثل $\\text{متر}^2$)؛ لذا فإن الجذر التربيعي يعيد الناتج إلى وحدة الطول الخطية الأصلية للمسطرة ($\\text{متر}$)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-01",
          "starterCode": "def euclidean_distance(p: np.ndarray, q: np.ndarray) -> float:\n    \"\"\"\n    Compute the straight-line Euclidean (L2) distance between two points p and q.\n\n    Intuition\n    ---------\n    In any dimensional space, the Euclidean distance represents the direct\n    ruler distance between two locations. It computes the net displacement along\n    each axis, squares them (invoking the Pythagorean theorem across all\n    perpendicular dimensions), sums the squares, and takes the square root.\n\n    Parameters\n    ----------\n    p : np.ndarray of shape (D,)\n        First spatial position or feature embedding vector.\n    q : np.ndarray of shape (D,)\n        Second spatial position or feature embedding vector.\n\n    Returns\n    -------\n    float\n        The straight-line Euclidean distance between p and q.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def euclidean_distance(p: np.ndarray, q: np.ndarray) -> float:\n    \"\"\"\n    Compute the straight-line Euclidean (L2) distance between two points p and q.\n\n    Intuition\n    ---------\n    In any dimensional space, the Euclidean distance represents the direct\n    ruler distance between two locations. It computes the net displacement along\n    each axis, squares them (invoking the Pythagorean theorem across all\n    perpendicular dimensions), sums the squares, and takes the square root.\n\n    Parameters\n    ----------\n    p : np.ndarray of shape (D,)\n        First spatial position or feature embedding vector.\n    q : np.ndarray of shape (D,)\n        Second spatial position or feature embedding vector.\n\n    Returns\n    -------\n    float\n        The straight-line Euclidean distance between p and q.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "import numpy as np\n\ndef euclidean_distance(p: np.ndarray, q: np.ndarray) -> float:\n    \"\"\"\n    Compute the straight-line Euclidean (L2) distance between two points p and q.\n\n    Intuition\n    ---------\n    In any dimensional space, the Euclidean distance represents the direct\n    ruler distance between two locations. It computes the net displacement along\n    each axis, squares them (invoking the Pythagorean theorem across all\n    perpendicular dimensions), sums the squares, and takes the square root.\n\n    Parameters\n    ----------\n    p : np.ndarray of shape (D,)\n        First spatial position or feature embedding vector.\n    q : np.ndarray of shape (D,)\n        Second spatial position or feature embedding vector.\n\n    Returns\n    -------\n    float\n        The straight-line Euclidean distance between p and q.\n    \"\"\"\n    # Step 1: Compute the element-wise difference vector (displacement)\n    # diff = p - q\n\n    # Step 2: Square each component of the difference vector\n    # squared_diff = diff ** 2\n\n    # Step 3: Sum the squared components and compute the square root\n    # return float(np.sqrt(np.sum(squared_diff)))\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
                "en": "The Euclidean L2 metric is rotationally invariant (isotropic). In contrast, the L1 norm depends on axis orientation: a vector $(1, 0)$ has $L_1 = 1$, but rotated 45 degrees to $(\\sqrt{2}/2, \\sqrt{2}/2)$ its $L_1$ distance increases to $\\sqrt{2} \\approx 1.414$.",
                "ar": "المقياس الإقليدي L2 متناظر دورانياً ولا يكترث بتوجيه المحاور. على النقيض، يعتمد معيار L1 على اتجاه المحاور: فالمتجه $(1, 0)$ طوله $L_1 = 1$، لكن عند تدويره 45 درجة يصبح طول مانهاتن حوالي 1.414."
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
    "id": "t1-02",
    "title": "The Geometry of Rate of Change & Slopes",
    "titleAr": "هندسة معدل التغير وميل الخطوط",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine pushing a loaded bicycle up a gently graded mountain road. Every time you push forward by two paces, your elevation increases by...",
      "ar": "تخيل أنك تدفع دراجة محملة بالحقائب صعوداً على طريق جبلي ممهد بانتظام. في كل مرة تتقدم فيها خطوتين للأمام على هذا المسار، يرتفع موقعك الرأسي..."
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
          "en": "Imagine pushing a loaded bicycle up a gently graded mountain road. Every time you push forward by two paces, your elevation increases by exactly one meter. Your thighs immediately feel the constant, relentless effort required to fight gravity. If the road steepened so that every two paces lifted you three meters into the air, your legs would scream; the effort per forward stride would triple. Conversely, if you were cruising along a flat lakeshore path, you could pedal for miles with virtually zero change in altitude. That physical ratio—the vertical lift gained per single stride of horizontal progress—is the universal concept of **slope**.\n\nIn mathematics and physical sciences, slope is our formal tool for quantifying **sensitivity**. It answers the question: *If I nudge the world by a tiny amount in one direction, how vigorously does it respond in another?* If you measure a straight ramp at the bottom, exactly in the middle, or right near the summit, that ratio never wobbles. It is completely invariant. If you advance horizontally by an amount $\\Delta x$ (the \"run\") and experience a vertical change $\\Delta y$ (the \"rise\"), dividing rise by run ($\\frac{\\Delta y}{\\Delta x}$) isolates the pure rate of change per unit of effort.\n\nThe algebraic sign of the slope tells an immediate physical story. A positive slope ($m > 0$) means walking forward carries you uphill. A zero slope ($m = 0$) means perfectly flat ground, where forward motion incurs zero vertical change. A negative slope ($m < 0$) describes a downward descent, where stepping forward drops your altitude. And what if you walk directly into a sheer vertical cliff wall? Your horizontal progress halts completely ($\\Delta x = 0$), yet the cliff towers straight upward. Attempting to calculate the slope forces a division by zero ($\\frac{\\Delta y}{0}$), reflecting an infinite, undefined rate of ascent.\n\nGeometrically, slope bridges algebra and trigonometry through right triangles. If you measure the inclination angle $\\theta$ between the road surface and the flat horizon, basic trigonometry shows that the tangent of that angle is precisely the opposite side divided by the adjacent side: $\\tan(\\theta) = \\frac{\\text{rise}}{\\text{run}} = m$. When the angle is zero, $\\tan(0^\\circ) = 0$; as the path tilts steeper toward the vertical, the angle approaches $90^\\circ$ and the tangent explodes toward infinity.\n\n---",
          "ar": "تخيل أنك تدفع دراجة محملة بالحقائب صعوداً على طريق جبلي ممهد بانتظام. في كل مرة تتقدم فيها خطوتين للأمام على هذا المسار، يرتفع موقعك الرأسي عن سطح البحر متراً واحداً بالضبط. تشعر عضلاتك على الفور بالجهد البدني الثابت الذي تبذله لمقاومة الجاذبية. ولو زادت حدة انحدار الطريق بحيث يرفعك كل خطوتين للأمام ثلاثة أمتار للأعلى، لتضاعف الجهد المطلوب ثلاث مرات؛ بينما لو كنت تسير على كورنيش ساحلي مستوٍ تماماً، لقطعت كيلومترات طويلة دون أي صعود أو هبوط رأسي. تلك النسبة الفيزيائية الصافية—الارتفاع الرأسي المكتسب مقابل كل خطوة تقدم أفقية واحدة—هي المفهوم الرياضي العالمي لـ **الميل** (Slope).\n\nفي الرياضيات والعلوم التطبيقية، يمثل الميل أداتنا الرسمية لقياس **الحساسية** (Sensitivity). إنه يجيب عن تساؤل بديهي: *إذا حركت هذا العالم خطوة واحدة في اتجاه ما، فما هو رد فعله ومقدار تغيره في الاتجاه الآخر؟* إذا قست هذه النسبة على منحدر مستقيم عند بدايته، أو في منتصفه، أو عند قمته، فلن تتغير تلك القيمة مطلقاً؛ إنها ثابت هندسي أصيل. إذا تحركت أفقياً بمقدار $\\Delta x$ (الامتداد الأفقي Run) ونتج عن ذلك ارتفاع رأسي مقداره $\\Delta y$ (الصعود الرأسي Rise)، فإن قسمة الصعود على الامتداد ($\\frac{\\Delta y}{\\Delta x}$) تعزل معدل التغير الصافي لكل وحدة تقدم واحدة.\n\nتروي الإشارة الجبرية للميل قصة حركية واضحة: فالميل الموجب ($m > 0$) يعني أن التقدم للأمام يرفعك لأعلى الجبل. والميل الصفري ($m = 0$) يمثل أرضية مستوية تماماً لا تتطلب بذل طاقة رأسية. والميل السالب ($m < 0$) يعبر عن انحدار هابط، حيث يؤدي التقدم للأمام إلى هبوطك للأسفل. ولكن ماذا لو اصطدمت بجدار صخري رأسي شاهق؟ هنا تتوقف حركتك الأفقية تماماً ($\\Delta x = 0$) بينما يمتد الجدار عمودياً؛ ومحاولة حساب الميل هنا تجبرك على القسمة على صفر ($\\frac{\\Delta y}{0}$)، مما يعني ميلاً غير معرّف أو انحداراً لا نهائياً.\n\nهندسياً، يربط الميل بين الجبر وحساب المثلثات عبر المثلث قائم الزاوية. إذا قست زاوية الميلان $\\theta$ بين سطح الطريق والأفق المستوي، فإن ظل تلك الزاوية (Tangent) يساوي المقابل مقسوماً على المجاور: $\\tan(\\theta) = \\frac{\\Delta y}{\\Delta x} = m$. فعندما تكون الزاوية صفراً، يكون $\\tan(0^\\circ) = 0$، ومع اقتراب الزاوية من 90 درجة عمودية، يقفز ظل الزاوية نحو المالانهاية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "m \\coloneqq \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan(\\theta), \\quad \\Delta x \\ne 0",
        "formulaNote": {
          "en": "Mathematical anchor for The Geometry of Rate of Change & Slopes.",
          "ar": "المرساة الرياضية لـ هندسة معدل التغير وميل الخطوط."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $m$ | Slope / Rate of Change | The constant sensitivity factor: how much $y$ changes when $x$ advances by $+1$. |\n| $\\Delta y = y_2 - y_1$ | Rise (Vertical Displacement) | The signed vertical difference: positive for upward climb, negative for downward drop. |\n| $\\Delta x = x_2 - x_1$ | Run (Horizontal Displacement) | The signed horizontal difference representing the baseline progress along the input axis. |\n| $\\frac{\\Delta y}{\\Delta x}$ | Differential Quotient | The ratio normalizing vertical change per single unit of horizontal movement. |\n| $\\theta$ | Angle of Inclination | The physical angle between the inclined line and the positive horizontal axis. |\n| $\\tan(\\theta)$ | Trigonometric Tangent | Geometric bridge: in a right triangle, $\\tan(\\theta) = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{\\text{rise}}{\\text{run}}$. |\n| $\\Delta x \\ne 0$ | Non-degeneracy condition | Prevents division by zero; vertical lines have undefined slope because run is zero. |\n\n##### Why the Math Works Step-by-Step\n1. **Why division instead of subtraction?** If someone climbs 10 meters, did they climb steeply? You cannot know until you know how far forward they walked! Climbing 10 meters over 10 meters forward ($m=1$) is steep; climbing 10 meters over 1,000 meters forward ($m=0.01$) is a very gentle ramp. Division normalizes the rise by the run, giving a pure rate per unit step.\n2. **Why do we preserve signed order $(y_2 - y_1)$ and $(x_2 - x_1)$?** Direction matters in physics. Moving from left to right ($\\Delta x > 0$) while climbing higher ($\\Delta y > 0$) gives a positive slope ($m > 0$). Moving from left to right while sinking lower ($\\Delta y < 0$) produces a negative slope ($m < 0$). Reversing the point order negates both numerator and denominator simultaneously: $\\frac{y_1 - y_2}{x_1 - x_2} = \\frac{-\\Delta y}{-\\Delta x} = \\frac{\\Delta y}{\\Delta x} = m$, maintaining strict invariance!\n3. **Why does slope equal $\\tan(\\theta)$?** Draw a straight line and construct a right-angled triangle underneath it. The horizontal leg is the adjacent side ($\\Delta x$), and the vertical leg is the opposite side ($\\Delta y$). By definition, the tangent of angle $\\theta$ is $\\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{\\Delta y}{\\Delta x}$. This links algebraic slopes directly to spatial angular orientation.\n4. **Why is $\\Delta x = 0$ undefined?** If $x_2 = x_1$, you are attempting to divide by zero. Physically, this corresponds to a vertical wall: an infinite rise achieved with zero forward movement ($\\theta = 90^\\circ$, and $\\tan(90^\\circ) = \\infty$).\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $m$ | الميل / معدل التغير | معامل الحساسية الثابت: مقدار التغير في $y$ عندما يتقدم $x$ بمقدار وحدة واحدة موجبة $+1$. |\n| $\\Delta y = y_2 - y_1$ | الارتفاع الرأسي (Rise) | الفارق الرأسي الجبري: موجب عند الصعود لأعلى، وسالب عند الهبوط لأسفل. |\n| $\\Delta x = x_2 - x_1$ | الامتداد الأفقي (Run) | الفارق الأفقي الجبري الذي يمثل مسافة التقدم المرجعي على محور المدخلات. |\n| $\\frac{\\Delta y}{\\Delta x}$ | النسبة التفاضلية | نسبة توحيد القياس: حساب الارتفاع الرأسي المكتسب لكل خطوة أفقية واحدة. |\n| $\\theta$ | زاوية الميلان | الزاوية الهندسية الصريحة المحصورة بين الخط المائل والأفق الموجب. |\n| $\\tan(\\theta)$ | ظل الزاوية المثلثي | جسر هندسي يربط الجبر بحساب المثلثات: في المثلث القائم $\\tan(\\theta) = \\frac{\\text{المقابل}}{\\text{المجاور}} = \\frac{\\Delta y}{\\Delta x}$. |\n| $\\Delta x \\ne 0$ | شرط عدم الانعدام | يمنع القسمة على صفر؛ فالخطوط الرأسية تمتلك ميلاً غير معرّف لأن امتدادها الأفقي معدوم. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا نلجأ للقسمة بدلاً من الطرح؟** لو ارتفع شخص 10 أمتار، فهل كان مساره شديد الانحدار؟ لا يمكن الحكم إلا إذا عرفنا المسافة الأفقية المقطوعة! فالصعود 10 أمتار على مسافة أفقية قدرها 10 أمتار ($m=1$) انحدار شديد، أما الصعود 10 أمتار على مسافة 1000 متر ($m=0.01$) فهو منحدر لطيف للغاية. القسمة توحد المقاييس لحساب الأثر الناتج عن خطوة واحدة.\n2. **لماذا نحافظ على ترتيب النقاط $(y_2 - y_1)$ و $(x_2 - x_1)$؟** الاتجاه جوهري في الفيزياء. التحرك من اليسار لليمين ($\\Delta x > 0$) مع الصعود لأعلى ($\\Delta y > 0$) يعطي ميلاً موجباً. والتحرك من اليسار لليمين مع الهبوط لأسفل ($\\Delta y < 0$) يعطي ميلاً سالباً. وإذا عكست ترتيب النقطتين، تتغير إشارة البسط والمقام معاً: $\\frac{y_1 - y_2}{x_1 - x_2} = \\frac{-\\Delta y}{-\\Delta x} = m$، فيبقى الميل ثابتاً لا يتأثر.\n3. **لماذا يساوي الميل ظل الزاوية $\\tan(\\theta)$؟** ارسم خطا مستقيماً وأسقط تحته مثلثاً قائم الزاوية. الضلع الأفقي هو المجاور ($\\Delta x$)، والضلع الرأسي هو المقابل ($\\Delta y$). بحسب تعريف حساب المثلثات، فإن ظل الزاوية $\\theta$ هو $\\frac{\\text{المقابل}}{\\text{المجاور}} = \\frac{\\Delta y}{\\Delta x}$. وهذا يربط ميل الجبر بزوايا الانحدار الفيزيائية.\n4. **لماذا تعتبر الحالة $\\Delta x = 0$ غير معرّفة؟** عندما تتطابق $x_1$ مع $x_2$ تصبح القسمة على صفر، وهو ما يمثل جداراً عمودياً شاهقاً: صعود رأسي بلا أي حركة أفقية ($\\theta = 90^\\circ$ وظلها يؤول للمالانهاية)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-02",
          "starterCode": "def compute_slope(p1: np.ndarray, p2: np.ndarray) -> float:\n    \"\"\"\n    Compute the linear rate of change (slope) between two 2D points.\n\n    Intuition\n    ---------\n    Slope measures the sensitivity of the vertical coordinate y relative to\n    horizontal progress x. It computes rise (delta_y) divided by run (delta_x).\n    A positive slope ascends, a negative slope descends, and a zero slope is flat.\n\n    Parameters\n    ----------\n    p1 : np.ndarray of shape (2,)\n        First point coordinates [x1, y1].\n    p2 : np.ndarray of shape (2,)\n        Second point coordinates [x2, y2].\n\n    Returns\n    -------\n    float\n        The rate of change m = (y2 - y1) / (x2 - x1).\n\n    Raises\n    ------\n    ZeroDivisionError\n        If x2 == x1 (vertical line with undefined slope).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def compute_slope(p1: np.ndarray, p2: np.ndarray) -> float:\n    \"\"\"\n    Compute the linear rate of change (slope) between two 2D points.\n\n    Intuition\n    ---------\n    Slope measures the sensitivity of the vertical coordinate y relative to\n    horizontal progress x. It computes rise (delta_y) divided by run (delta_x).\n    A positive slope ascends, a negative slope descends, and a zero slope is flat.\n\n    Parameters\n    ----------\n    p1 : np.ndarray of shape (2,)\n        First point coordinates [x1, y1].\n    p2 : np.ndarray of shape (2,)\n        Second point coordinates [x2, y2].\n\n    Returns\n    -------\n    float\n        The rate of change m = (y2 - y1) / (x2 - x1).\n\n    Raises\n    ------\n    ZeroDivisionError\n        If x2 == x1 (vertical line with undefined slope).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "3.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_slope(p1: np.ndarray, p2: np.ndarray) -> float:\n    \"\"\"\n    Compute the linear rate of change (slope) between two 2D points.\n\n    Intuition\n    ---------\n    Slope measures the sensitivity of the vertical coordinate y relative to\n    horizontal progress x. It computes rise (delta_y) divided by run (delta_x).\n    A positive slope ascends, a negative slope descends, and a zero slope is flat.\n\n    Parameters\n    ----------\n    p1 : np.ndarray of shape (2,)\n        First point coordinates [x1, y1].\n    p2 : np.ndarray of shape (2,)\n        Second point coordinates [x2, y2].\n\n    Returns\n    -------\n    float\n        The rate of change m = (y2 - y1) / (x2 - x1).\n\n    Raises\n    ------\n    ZeroDivisionError\n        If x2 == x1 (vertical line with undefined slope).\n    \"\"\"\n    # Step 1: Compute vertical rise (delta_y = y2 - y1)\n    # delta_y = float(p2[1] - p1[1])\n\n    # Step 2: Compute horizontal run (delta_x = x2 - x1)\n    # delta_x = float(p2[0] - p1[0])\n\n    # Step 3: Guard against division by zero for vertical lines\n    # if np.isclose(delta_x, 0.0):\n    #     raise ZeroDivisionError(\"Vertical line has undefined slope\")\n\n    # Step 4: Return the slope ratio (rise / run)\n    # return delta_y / delta_x\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "In an empirical econometrics study, the regressor $x$ represents temperature measured in Celsius, and $y$ represents electricity demand. If the researcher converts all $x$ measurements to Fahrenheit using the transformation $F = 1.8 \\cdot C + 32$, how does the new estimated regression slope $m_F$ compare to the original slope $m_C$?",
            "ar": "في دراسة قياسية، يمثل المتغير المستقل $x$ درجة الحرارة بالدرجة المئوية، ويمثل $y$ الطلب على الكهرباء. إذا قام الباحث بتحويل درجات الحرارة إلى الفهرنهايت وفق $F = 1.8 \\cdot C + 32$، فكيف يقارن الميل الجديد $m_F$ بالميل الأصلي $m_C$؟"
          },
          "options": [
            {
              "text": {
                "en": "The slope is divided by 1.8 ($m_F = m_C / 1.8$) because each unit increase in Fahrenheit represents only $1/1.8$ of a Celsius degree, while the additive constant $+32$ does not affect slopes at all.",
                "ar": "يُقسم الميل على 1.8 (أي $m_F = m_C / 1.8$) لأن زيادة وحدة واحدة في الفهرنهايت تعادل فقط $1/1.8$ من الدرجة المئوية، بينما الثابت 32 لا يغير الميل إطلاقاً.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Slope measures $\\frac{\\Delta y}{\\Delta x}$. Under the chain rule, $\\frac{dy}{dF} = \\frac{dy}{dC} \\cdot \\frac{dC}{dF} = m_C \\cdot \\frac{1}{1.8}$. Adding a constant shifts the baseline without altering the tilt, whereas multiplying the horizontal run expands the denominator, compressing the slope.",
                "ar": "يقيس الميل $\\frac{\\Delta y}{\\Delta x}$. ووفق قاعدة السلسلة، $\\frac{dy}{dF} = \\frac{dy}{dC} \\cdot \\frac{dC}{dF} = m_C \\cdot \\frac{1}{1.8}$. إضافة ثابت 32 تزيح خط البداية دون المساس بانحداره، بينما تمديد المحور الأفقي بالضرب في 1.8 يوسع المقام مما يقسم الميل على 1.8."
              }
            },
            {
              "text": {
                "en": "The slope increases by 32 units ($m_F = m_C + 32$) because the baseline temperature is shifted upward.",
                "ar": "يزداد الميل بمقدار 32 وحدة ($m_F = m_C + 32$) بسبب إزاحة نقطة البداية للأعلى.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The $+32$ term changes the $y$-intercept (the constant baseline level), not the differential sensitivity quotient $\\frac{\\Delta y}{\\Delta x}$.",
                "ar": "الحد $+32$ يغير المقطع الصادي ونقطة الأساس الثابتة، ولا يغير نسبة التغير التفاضلية $\\frac{\\Delta y}{\\Delta x}$."
              }
            },
            {
              "text": {
                "en": "The slope is multiplied by 1.8 ($m_F = 1.8 \\cdot m_C$) because Fahrenheit numbers are larger.",
                "ar": "يُضرب الميل في 1.8 ($m_F = 1.8 \\cdot m_C$) لأن أرقام الفهرنهايت أكبر.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Multiplying the denominator $\\Delta x$ by 1.8 scales the whole fraction down by $\\frac{1}{1.8}$, not up.",
                "ar": "ضرب المقام $\\Delta x$ في 1.8 يجعل الكسر الإجمالي يصغر بمعامل $\\frac{1}{1.8}$ ولا يكبر."
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
    "id": "t1-03",
    "title": "Vectors as Directed Line Segments & Spatial Displacements",
    "titleAr": "المتجهات كقطع موجهة وإزاحات مكانية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine steering a small rowboat across a wide river toward the opposite bank. You aim your bow directly North and row forward with steady...",
      "ar": "تخيل أنك تجدف بقارب خشبي صغير محاولاً عبور نهر عريض نحو الضفة المقابلة مباشرة. توجه مقدمة قاربك تماماً نحو الشمال وتجدف بعزم ثابت بسرعة 4..."
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
          "en": "Imagine steering a small rowboat across a wide river toward the opposite bank. You aim your bow directly North and row forward with steady vigor, moving at 4 meters per second. But the river does not sit still; a swift current sweeps from West to East at 3 meters per second. What happens to your boat? You do not move purely North, nor do you drift purely East. Nature seamlessly combines both influences: your boat travels along a diagonal trajectory at 5 meters per second, landing downstream on the opposite shore. You have just experienced the physical reality of **vector addition**.\n\nIn textbook computer science, a vector is often casually introduced as a mere \"list or 1D array of numbers.\" But to a physicist, mathematician, or robotics engineer, a vector is fundamentally an arrow of action: a **spatial displacement** carrying both an intrinsic **magnitude** (its length or strength) and an unambiguous **direction** in space. Crucially, a free vector does not care where it starts. If you tell a robot \"advance 3 meters forward and 2 meters right,\" that displacement instruction is identical whether the robot executes it in the kitchen, the living room, or on Mars.\n\nWhen you chain consecutive physical movements—first completing journey $\\mathbf{u}$, and then immediately undertaking journey $\\mathbf{v}$—nature computes the outcome via the **tip-to-tail rule**. You place the starting tail of the second arrow directly onto the arrowhead tip of the first arrow. The resultant vector $\\mathbf{w} = \\mathbf{u} + \\mathbf{v}$ points in a straight line from the initial launchpad to the final resting point. Because orthogonal spatial dimensions operate independently, your total horizontal displacement is simply the sum of horizontal parts ($u_x + v_x$), and your vertical displacement is the sum of vertical parts ($u_y + v_y$).\n\nWhat happens when you multiply a vector by a plain number (called a **scalar**)? The scalar acts like a physical tension dial. If you scale a velocity vector by $2$, you double your speed while remaining locked on the exact same heading. If you multiply by $0.5$, you cut the journey in half. And if you multiply by $-1$, you do something magical: you flip the arrow $180^\\circ$ backwards, retracing your path in reverse. Scaling and adding vectors—known formally as **linear combinations**—is the foundational bedrock upon which all computer graphics, physics engines, and modern neural architectures are built.\n\n---",
          "ar": "تخيل أنك تجدف بقارب خشبي صغير محاولاً عبور نهر عريض نحو الضفة المقابلة مباشرة. توجه مقدمة قاربك تماماً نحو الشمال وتجدف بعزم ثابت بسرعة 4 أمتار في الثانية. لكن مياه النهر ليست ساكنة؛ بل يجري تيار مائي جارف من الغرب نحو الشرق بسرعة 3 أمتار في الثانية. ما الذي يحدث لقاربك على أرض الواقع؟ أنت لن تتحرك شمالاً فقط، ولن تنجرف شرقاً فقط؛ بل تجمع الطبيعة بين التأثيرين بسلاسة مذهلة، ليندفع قاربك في مسار قطري بسرعة 5 أمتار في الثانية نحو الضفة المقابلة منحرفاً باتجاه مجرى النهر. لقد اختبرت للتو الحقيقة الفيزيائية الحية لـ **جمع المتجهات**.\n\nفي دروس البرمجة التقليدية، يُعرّف المتجه غالباً بشكل مجرد كـ \"قائمة أو مصفوفة أحادية من الأرقام\". لكن بالنسبة لعلماء الفيزياء والرياضيات ومهندسي الروبوتات، المتجه كائن فيزيائي أصيل: إنه **سهم إزاحة** يمتلك **مقداراً** (طوله أو شدته الفيزيائية) و**اتجاهاً** محدداً في الفضاء. والأمر الجوهري هو أن المتجه الحر لا يكترث بنقطة بدايته؛ فإذا أمرت ذراعاً آلية بـ \"التحرك 3 أمتار للأمام ومترين لليمين\"، فإن أمر الإزاحة هذا يظل متطابقاً تماماً سواء نفذته الذراع في المعمل أو في المصنع أو على سطح القمر.\n\nعندما تركّب حركتين متعاقبتين—كأن تقوم برحلة أولى يمثلها المتجه $\\mathbf{u}$ ثم تعقبها مباشرة برحلة ثانية يمثلها المتجه $\\mathbf{v}$—فإن هندسة الكون تحسب النتيجة عبر **قاعدة الرأس بالذيل** (Tip-to-Tail). تضع ذيل السهم الثاني عند رأس السهم الأول، ليكون المتجه المحصل $\\mathbf{w} = \\mathbf{u} + \\mathbf{v}$ هو السهم المستقيم الواصل مباشرة من نقطة الانطلاق الأولى إلى المحطة الأخيرة. وبما أن الأبعاد المتعامدة مستقلة تماماً، فإن إجمالي حركتك الأفقية هو مجموع الحركات الأفقية ($u_x + v_x$)، وإجمالي حركتك الرأسية هو مجموع الحركات الرأسية ($u_y + v_y$).\n\nماذا يحدث عندما تضرب متجهاً في عدد حقيقي بسيط (يُسمى **عدداً قياسياً** أو Scalar)؟ يعمل هذا العدد كمعامل شد ومرونة؛ فإذا ضربت متجه السرعة في 2، فإنك تضاعف سرعتك مع البقاء على نفس خط السير تماماً. وإذا ضربته في 0.5، فإنك تقطع نصف المسافة فقط. أما إذا ضربته في $-1$، فإنك تحدث انعكاساً هندسياً تاماً، حيث يستدير السهم 180 درجة إلى الخلف ليعود في الاتجاه المعاكس. إن دمج تحجيم المتجهات وجمعها—وهو ما يُعرف رسمياً بـ **التركيب الخطي** (Linear Combination)—هو حجر الأساس الذي تقوم عليه كافة محركات الألعاب الرسومية، والفيزياء الحاسوبية، والشبكات العصبية الاصطناعية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{w} = \\alpha \\mathbf{u} + \\beta \\mathbf{v} = \\begin{bmatrix} \\alpha u_1 + \\beta v_1 \\\\ \\vdots \\\\ \\alpha u_n + \\beta v_n \\end{bmatrix}, \\quad \\|\\mathbf{v}\\|_2 = \\sqrt{\\sum_{i=1}^n v_i^2}",
        "formulaNote": {
          "en": "Mathematical anchor for Vectors as Directed Line Segments & Spatial Displacements.",
          "ar": "المرساة الرياضية لـ المتجهات كقطع موجهة وإزاحات مكانية."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$ | Vector Operands | Directed line segments representing individual physical movements or forces in $n$-dimensional space. |\n| $\\alpha, \\beta \\in \\mathbb{R}$ | Scalar Multipliers | Real numbers that amplify, compress, or reverse the directions of vectors without rotating them. |\n| $\\mathbf{w}$ | Linear Combination | The resultant vector formed by scaling and tip-to-tail vector addition. |\n| $\\alpha u_i + \\beta v_i$ | Component-wise Arithmetic | Shows that operations along each axis occur independently without cross-talk between orthogonal directions. |\n| $\\|\\mathbf{v}\\|_2$ | Vector Magnitude / Norm | The straight ruler length of the vector arrow from tail to tip, computed via the Pythagorean theorem. |\n\n##### Why the Math Works Step-by-Step\n1. **Why does vector addition operate component-by-component?** In a Cartesian space, the coordinate axes are orthogonal (perpendicular). Walking East has zero effect on your North-South position. Thus, total displacement along axis $i$ is strictly the sum of individual displacements along axis $i$: $w_i = u_i + v_i$.\n2. **Why does a negative scalar flip the vector $180^\\circ$?** When you multiply coordinate $u_i$ by $-1$, positive values become negative and negative values become positive. Geometrically, this reflects the arrow through the origin, pointing it in the exact opposite direction while preserving its absolute length ($\\|-1 \\cdot \\mathbf{u}\\| = |-1| \\cdot \\|\\mathbf{u}\\| = \\|\\mathbf{u}\\|$).\n3. **Why does the Triangle Inequality hold ($\\|\\mathbf{u} + \\mathbf{v}\\| \\le \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$)?** Geometrically, two vectors and their sum form a triangle. The straight-line path between two points is always the shortest possible path. Unless the two vectors point in the exact same direction (collinear), combining them creates an angular bend, guaranteeing that the direct shortcut $\\|\\mathbf{u} + \\mathbf{v}\\|$ is strictly shorter than traveling the two legs sequentially.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$ | المتجهات المشتركة | قطع مستقيمة موجهة تمثل إزاحات حركية أو قوى فيزيائية في فضاء ذي $n$ بعداً. |\n| $\\alpha, \\beta \\in \\mathbb{R}$ | المعاملات القياسية (Scalars) | أرقام حقيقية تعمل كمقابض لتكبير المتجهات أو تقليصها أو عكسها دون تدويرها. |\n| $\\mathbf{w}$ | التركيب الخطي المحصل | المتجه النهائي الناتج عن تحجيم المتجهات وجمعها وفق قاعدة الرأس بالذيل. |\n| $\\alpha u_i + \\beta v_i$ | الحساب المستقل للمركبات | إثبات أن العمليات على كل محور تتم باستقلالية تامة دون أي تداخل مع المحاور المتعامدة الأخرى. |\n| $\\|\\mathbf{v}\\|_2$ | معيار / طول المتجه | طول سهم المتجه بالمسطرة من ذيله إلى رأسه، ويُحسب بتطبيق مبرهنة فيثاغورس. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا يتم جمع المتجهات مركبة بمركبة؟** في الفضاء الديكارتي، تكون المحاور الإحداثية متعامدة استقلالياً. المشي شرقاً لا يؤثر بتاتاً على موقعك شمالاً وجنوباً؛ ولذا فإن الإزاحة الكلية على البعد $i$ هي ببساطة حاصل جمع الإزاحات المنفردة على ذلك البعد بمفرده: $w_i = u_i + v_i$.\n2. **لماذا يعكس المعامل القياسي السالب اتجاه المتجه $180^\\circ$؟** عند ضرب المركبة $u_i$ في $-1$، تنقلب الإشارات الموجبة إلى سالبة والسالصة إلى موجبة؛ هندسياً، هذا ينشئ انعكاساً عبر نقطة الأصل فيشير السهم للاتجاه المعاكس تماماً مع الحفاظ على طوله الأصلي ($\\|-1 \\cdot \\mathbf{u}\\| = \\|\\mathbf{u}\\|$).\n3. **لماذا تصح متباينة المثلث دائماً ($\\|\\mathbf{u} + \\mathbf{v}\\| \\le \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$؟** يشكل المتجهان ومحصلتهما أضلاع مثلث في الفضاء. وأقصر مسار بين نقطتين هو الخط المستقيم دائماً؛ وما لم يكن المتجهان يشيران لنفس الاتجاه تماماً، فإن وجود أي زاوية بينهما يصنع مساراً مختصراً يجعل طول المحصلة أقل قطعاً من مجموع مسافتي الرحلتين."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-03",
          "starterCode": "def vector_linear_combination(u: np.ndarray, v: np.ndarray, alpha: float, beta: float) -> np.ndarray:\n    \"\"\"\n    Compute the linear combination w = alpha * u + beta * v.\n\n    Intuition\n    ---------\n    A linear combination scales two spatial displacement vectors by scalar\n    factors alpha and beta, then adds them tip-to-tail across each orthogonal\n    coordinate axis independently.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First displacement vector.\n    v : np.ndarray of shape (D,)\n        Second displacement vector.\n    alpha : float\n        Scalar multiplier for vector u.\n    beta : float\n        Scalar multiplier for vector v.\n\n    Returns\n    -------\n    np.ndarray of shape (D,)\n        The combined resultant vector w.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def vector_linear_combination(u: np.ndarray, v: np.ndarray, alpha: float, beta: float) -> np.ndarray:\n    \"\"\"\n    Compute the linear combination w = alpha * u + beta * v.\n\n    Intuition\n    ---------\n    A linear combination scales two spatial displacement vectors by scalar\n    factors alpha and beta, then adds them tip-to-tail across each orthogonal\n    coordinate axis independently.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First displacement vector.\n    v : np.ndarray of shape (D,)\n        Second displacement vector.\n    alpha : float\n        Scalar multiplier for vector u.\n    beta : float\n        Scalar multiplier for vector v.\n\n    Returns\n    -------\n    np.ndarray of shape (D,)\n        The combined resultant vector w.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "array([11.,  1.])"
            }
          },
          "solution": "import numpy as np\n\ndef vector_linear_combination(u: np.ndarray, v: np.ndarray, alpha: float, beta: float) -> np.ndarray:\n    \"\"\"\n    Compute the linear combination w = alpha * u + beta * v.\n\n    Intuition\n    ---------\n    A linear combination scales two spatial displacement vectors by scalar\n    factors alpha and beta, then adds them tip-to-tail across each orthogonal\n    coordinate axis independently.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First displacement vector.\n    v : np.ndarray of shape (D,)\n        Second displacement vector.\n    alpha : float\n        Scalar multiplier for vector u.\n    beta : float\n        Scalar multiplier for vector v.\n\n    Returns\n    -------\n    np.ndarray of shape (D,)\n        The combined resultant vector w.\n    \"\"\"\n    # Step 1: Scale displacement vector u by scalar alpha\n    # scaled_u = alpha * u\n\n    # Step 2: Scale displacement vector v by scalar beta\n    # scaled_v = beta * v\n\n    # Step 3: Add the two scaled displacement vectors element-wise\n    # return scaled_u + scaled_v\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "Imagine an autonomous drone executing two sequential flight legs in 2D space: displacement $\\mathbf{u}$, immediately followed by displacement $\\mathbf{v}$. Under what precise geometric condition does the drone's net straight-line distance from its launchpad strictly equal the sum of the lengths of the two individual legs ($\\|\\mathbf{u} + \\mathbf{v}\\| = \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$)?",
            "ar": "تخيل طائرة درون ذاتية القيادة تنفذ مرحلتي طيران متتاليتين في فضاء ثنائي الأبعاد: إزاحة أولى يمثلها المتجه $\\mathbf{u}$ تليها فوراً إزاحة ثانية يمثلها المتجه $\\mathbf{v}$. تحت أي شرط هندسي دقيق تصبح المسافة المستقيمة الصافية للدرون عن منصة الإطلاق مساوية تماماً لمجموع طولي المرحلتين المنفردتين ($\\|\\mathbf{u} + \\mathbf{v}\\| = \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$؟"
          },
          "options": [
            {
              "text": {
                "en": "When $\\mathbf{u}$ and $\\mathbf{v}$ are collinear and point in the exact same direction (angle $\\theta = 0^\\circ$).",
                "ar": "عندما يكون المتجهان $\\mathbf{u}$ و $\\mathbf{v}$ على نفس خط الاستقامة ويشيران تماماً إلى نفس الاتجاه (الزاوية $\\theta = 0^\\circ$).\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "By the Triangle Inequality, $\\|\\mathbf{u} + \\mathbf{v}\\| \\le \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$. Equality holds if and only if there is zero angular bend between the vectors; any non-zero angle creates a triangle where the direct hypotenuse shortcut is strictly shorter than the sum of the two legs.",
                "ar": "وفقاً لمتباينة المثلث، $\\|\\mathbf{u} + \\mathbf{v}\\| \\le \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$. وتتحقق المساواة الصارمة فقط عندما تكون الزاوية بينهما صفراً؛ فوجود أي انحناء زاوي يصنع مثلثاً يكون فيه المسار المباشر أقصر قطعاً من مجموع مسافتي الضلعين."
              }
            },
            {
              "text": {
                "en": "When $\\mathbf{u}$ and $\\mathbf{v}$ are strictly perpendicular (orthogonal, angle $\\theta = 90^\\circ$).",
                "ar": "عندما يكون المتجهان متعامدين تماماً (الزاوية $\\theta = 90^\\circ$).\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "When perpendicular, the Pythagorean theorem dictates that $\\|\\mathbf{u} + \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2$. Taking square roots guarantees that $\\|\\mathbf{u} + \\mathbf{v}\\| < \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$.",
                "ar": "عند التعامد، تنطبق مبرهنة فيثاغورس $\\|\\mathbf{u} + \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2$، وبأخذ الجذر التربيعي نجد حتماً أن طول الوتر أقل من مجموع الضلعين."
              }
            },
            {
              "text": {
                "en": "Whenever $\\|\\mathbf{u}\\| = \\|\\mathbf{v}\\|$, regardless of the angle between them.",
                "ar": "كلما تساوى طولا المتجهين $\\|\\mathbf{u}\\| = \\|\\mathbf{v}\\|$ بغض النظر عن الزاوية بينهما.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Equal magnitudes do not prevent directional cancellation. If two equal-length vectors point at $120^\\circ$, their sum has a magnitude equal to $\\|\\mathbf{u}\\|$, not $2\\|\\mathbf{u}\\|$. If they point at $180^\\circ$ (opposite directions), their sum drops to zero!",
                "ar": "تساوي الأطوال لا يمنع الإلغاء الاتجاهي؛ فإذا كان المتجهان متساويين وبينهما زاوية $120^\\circ$، فإن محصلتهما تساوي طول أحدهما فقط وليس ضعفه. وإذا كانت الزاوية $180^\\circ$ انعدمت المحصلة تماماً!"
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
    "id": "t1-04",
    "title": "Linear Combinations, Span & Linear Independence",
    "titleAr": "التراكيب الخطية ومدى المتجهات والاستقلال الخطي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine sitting in the cockpit of an experimental spacecraft floating in deep space. On your dashboard are two throttle levers.",
      "ar": "تخيل نفسك في قمرة قيادة مركبة فضائية تجريبية تطفو في الفضاء السحيق. أمامك على لوحة التحكم مقبضان للوقود."
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
          "en": "Imagine sitting in the cockpit of an experimental spacecraft floating in deep space. On your dashboard are two throttle levers. Lever 1 fires an engine that propels you along vector $\\mathbf{v}_1$ (say, forward and right). Lever 2 fires a separate thruster pushing along vector $\\mathbf{v}_2$ (forward and left). By sliding these two levers forward or backward—choosing scalar multipliers $c_1$ and $c_2$—where in the universe can you fly? The entire universe of destinations you can physically reach by turning those two dials is what mathematicians call the **span** of the vectors.\n\nNow, imagine an unfortunate design flaw: both thrusters were mistakenly mounted pointing along the exact same straight line. In that scenario, no matter how frantically you slide the levers, you are tragically trapped inside a one-dimensional railway track. Moving forward or backward is your only option; you can never dodge left, right, or climb upward. Because the two thrusters duplicate each other's directional capability, the second thruster adds zero new freedom. They are **linearly dependent** (redundant). But if the thrusters point in distinct, unaligned directions, their combined thrust lets you glide across every single square millimeter of a flat 2D plane: their span is the entire 2D surface $\\mathbb{R}^2$.\n\nNow suppose a maintenance technician adds a third engine $\\mathbf{v}_3$ to your spacecraft. Does this guarantee you can finally fly up into the stars? Not necessarily! If that third engine also lies completely flat within that very same 2D plane, it offers zero new dimensional freedom. Any trajectory it could push you along could already be replicated simply by adjusting the first two levers! That third vector is redundant. Only when that third engine tilts upward, punching out of the flat sheet into the third dimension, do you gain true 3D spatial freedom.\n\nA set of vectors is **linearly independent** if and only if every single vector contributes a genuinely unique, non-redundant direction that cannot be replicated by any combination of the other vectors. If you have $k$ truly independent vectors in space, they form an unshakeable skeletal frame—a **basis**—capable of constructing an entire $k$-dimensional realm.\n\n---",
          "ar": "تخيل نفسك في قمرة قيادة مركبة فضائية تجريبية تطفو في الفضاء السحيق. أمامك على لوحة التحكم مقبضان للوقود. المقبض الأول يشغل محركاً يدفعك باتجاه المتجه $\\mathbf{v}_1$ (للأمام وإلى اليمين مثلاً)، بينما يشغل المقبض الثاني محركاً منفصلاً يدفعك باتجاه المتجه $\\mathbf{v}_2$ (للأمام وإلى اليسار). من خلال تحريك هذين المقبضين للأمام أو للخلف—أي باختيار معاملات قياسية حقيقية $c_1$ و $c_2$—ما هي المواقع التي يمكنك زيارتها في هذا الفضاء الشاسع؟ إن العالم الكامل لكل نقطة وموقع يمكنك بلوغه بضبط هذين المقبضين هو ما يسميه علماء الرياضيات **مدى المتجهات** (Span).\n\nتخيل الآن عيباً تصميمياً كارثياً: قام مهندسو المركبة بتثبيت المحركين على نفس خط الاستقامة تماماً! في هذه الحالة، مهما حركت المقبضين بعنف، ستكون محبوساً داخل سكة حديدية أحادية البعد؛ يمكنك التقدم أو التراجع على نفس الخط فقط، ولن تستطيع الالتفاف يميناً أو يساراً إطلاقاً. ولأن المحرك الثاني يكرر نفس الأثر الاتجاهي للمحرك الأول دون إضافة، فإن هذين المتجهين يُعدان **مرتبطين خطياً** (Linearly Dependent) أي أحدهما فائض ومكرر. ولكن إذا أشار المحركان لاتجاهين مستقلين، فإن دفعهما المشترك يتيح لك التحليق بحرية عبر أي نقطة على سطح مستوٍ ثنائي الأبعاد بالكامل: مداهما يغطي المستوى $\\mathbb{R}^2$.\n\nافترض الآن أن مهندس صيانة أضاف محركاً ثالثاً $\\mathbf{v}_3$ للمركبة. هل يضمن لك ذلك التحليق نحو النجوم للأعلى في البعد الثالث؟ ليس بالضرورة! إذا كان هذا المحرك الثالث يستقر بدوره مسطحاً داخل نفس المستوى الثنائي، فلن يمنحك أي حرية مكانية جديدة؛ لأن أي حركة يمكن أن يصنعها كان بالإمكان محاكاتها بالفعل عبر خلط دفع المحركين الأولين! هذا المتجه الثالث فائض لا يقدم جديداً. وتكون المتجهات الثلاثة **مستقلة خطياً** (Linearly Independent) فقط عندما يشير المحرك الثالث بزاوية ترتفع بك للأعلى خارج ذلك المستوى المنبسط، فاتحاً الباب لأول مرة لحرية الحركة في الفضاء ثلاثي الأبعاد.\n\nتكون مجموعة المتجهات مستقلة خطياً إذا وفقط إذا كان كل متجه يقدم اتجاهاً فريداً وأصيلاً لا يمكن لبقية المتجهات توليده أو تعويضه مجتمعة. وإذا امتلكت $k$ من المتجهات المستقلة تماماً، فإنها تشكل الهيكل الأساسي—أو ما نسميه **الأساس** (Basis)—القادر على توليد فضاء متكامل ذي $k$ بعداً."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\operatorname{span}(\\mathbf{v}_1, \\dots, \\mathbf{v}_k) = \\left\\{ \\sum_{i=1}^k c_i \\mathbf{v}_i \\;\\middle|\\; c_i \\in \\mathbb{R} \\right\\}, \\quad \\sum_{i=1}^k c_i \\mathbf{v}_i = \\mathbf{0} \\iff c_1 = \\dots = c_k = 0",
        "formulaNote": {
          "en": "Mathematical anchor for Linear Combinations, Span & Linear Independence.",
          "ar": "المرساة الرياضية لـ التراكيب الخطية ومدى المتجهات والاستقلال الخطي."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\operatorname{span}(\\mathbf{v}_1, \\dots, \\mathbf{v}_k)$ | Vector Span | The complete geometric territory (line, plane, or higher volume) reachable by combining these vectors. |\n| $c_i \\in \\mathbb{R}$ | Linear Coefficients / Weights | The throttle knobs: real numbers that stretch, shrink, or reverse each individual directional vector. |\n| $\\sum_{i=1}^k c_i \\mathbf{v}_i$ | Linear Combination | The resultant destination reached by blending scaled copies of the available vectors. |\n| $\\sum_{i=1}^k c_i \\mathbf{v}_i = \\mathbf{0}$ | Homogeneous Zero Test | The ultimate litmus test: Can you return to the origin using some non-zero push from the engines? |\n| $c_1 = \\dots = c_k = 0$ | Strict Trivial Solution | Linear Independence condition: the ONLY way to end up at the origin is by doing nothing (all knobs set to zero). |\n\n##### Why the Math Works Step-by-Step\n1. **Why does reaching zero with non-zero weights prove dependency?** Suppose three engines satisfy $2\\mathbf{v}_1 - 5\\mathbf{v}_2 + 3\\mathbf{v}_3 = \\mathbf{0}$. We can rearrange this algebra cleanly to isolate $\\mathbf{v}_3$:\n   $$\\mathbf{v}_3 = -\\frac{2}{3}\\mathbf{v}_1 + \\frac{5}{3}\\mathbf{v}_2$$\n   This proves beyond doubt that vector $\\mathbf{v}_3$ offers zero new territory: any location it points to could already be reached simply by pushing $-2/3$ of engine 1 and $+5/3$ of engine 2! Thus $\\mathbf{v}_3$ is redundant.\n2. **Why does independence require $c_1 = c_2 = \\dots = c_k = 0$?** If no vector can be expressed as a combination of the others, no loop exists in their directional arrows. The only way their sum can ever cancel out to zero is if every single weight is identically zero.\n3. **What is the dimension of the span?** The geometric dimension of $\\operatorname{span}(\\mathbf{v}_1, \\dots, \\mathbf{v}_k)$ is exactly the maximum number of mutually linearly independent vectors in the set. Two independent vectors span a 2D plane; three span 3D volume; $n$ independent vectors span the entire space $\\mathbb{R}^n$.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\operatorname{span}(\\mathbf{v}_1, \\dots, \\mathbf{v}_k)$ | مدى المتجهات (Span) | الرقعة الهندسية الكاملة (خط، مستوى، أو فضاء حجمي) التي يمكن الوصول إليها بمزج هذه المتجهات. |\n| $c_i \\in \\mathbb{R}$ | المعاملات / الأوزان الخطية | مقابض التحكم: أرقام حقيقية تحدد مقدار الشد أو التقليص أو العكس لكل متجه على حدة. |\n| $\\sum_{i=1}^k c_i \\mathbf{v}_i$ | التركيب الخطي | المحطة النهائية الناتجة عن جمع المتجهات بعد تحجيم كل منها بوزنه المخصص. |\n| $\\sum_{i=1}^k c_i \\mathbf{v}_i = \\mathbf{0}$ | اختبار الصفر المتجانس | الاختبار الحاسم: هل يمكنك العودة لنقطة الأصل عبر مزيج حركي غير صفري من هذه المتجهات؟ |\n| $c_1 = \\dots = c_k = 0$ | الحل الصفري الوحيد | شرط الاستقلال الخطي الصارم: السبيل الوحيد للبقاء عند الأصل هو عدم تشغيل أي محرك إطلاقاً. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا يثبت الوصول للصفر بأوزان غير صفرية وجود ارتباط خطي؟** افترض أن لدينا ثلاثة متجهات تحقق المعادلة $2\\mathbf{v}_1 - 5\\mathbf{v}_2 + 3\\mathbf{v}_3 = \\mathbf{0}$. يمكننا جبرياً عزل المتجه الثالث بكل بساطة:\n   $$\\mathbf{v}_3 = -\\frac{2}{3}\\mathbf{v}_1 + \\frac{5}{3}\\mathbf{v}_2$$\n   هذا يبرهن بشكل قاطع أن المتجه $\\mathbf{v}_3$ لا يقدم أي جديد؛ إذ يمكن الوصول لأي نقطة يشير إليها بمجرد مزج المحركين الأول والثاني بالأوزان المناسبة! فهو متجه فائض عن الحاجة.\n2. **لماذا يشترط الاستقلال أن تكون جميع المعاملات أصفاراً؟** إذا كان كل متجه يفتح بعداً مستقلاً تماماً، فلن تتمكن المتجهات من تشكيل مسار مغلق يلغي بعضه بعضاً. والسبيل الوحيد لانعدام المجموع هو أن تكون كل المقابض مضبوطة على الصفر التام.\n3. **ما هو البعد الهندسي للمدى؟** البعد الفعلي للفضاء المولد يساوي أقصى عدد من المتجهات المستقلة خطياً؛ فمتجهان مستقلان يولدان مستوى ثنائياً، وثلاثة متجهات مستقلة تولد حجماً ثلاثي الأبعاد، و$n$ من المتجهات المستقلة تولد الفضاء الإقليدي بالكامل $\\mathbb{R}^n$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-04",
          "starterCode": "def check_linear_independence_2d(v1: np.ndarray, v2: np.ndarray, tol: float = 1e-9) -> bool:\n    \"\"\"\n    Check whether two 2D vectors are linearly independent.\n\n    Intuition\n    ---------\n    Two vectors in 2D space are linearly independent if and only if they do\n    not point along the same straight line (non-collinear). Geometrically,\n    this means the parallelogram spanned by them has non-zero area, which\n    equals the absolute determinant |ad - bc| of the matrix formed by them.\n\n    Parameters\n    ----------\n    v1 : np.ndarray of shape (2,)\n        First vector [v1_x, v1_y].\n    v2 : np.ndarray of shape (2,)\n        Second vector [v2_x, v2_y].\n    tol : float\n        Numerical tolerance threshold to handle floating point imprecision.\n\n    Returns\n    -------\n    bool\n        True if the vectors span a full 2D plane (linearly independent),\n        False if they are collinear (linearly dependent).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def check_linear_independence_2d(v1: np.ndarray, v2: np.ndarray, tol: float = 1e-9) -> bool:\n    \"\"\"\n    Check whether two 2D vectors are linearly independent.\n\n    Intuition\n    ---------\n    Two vectors in 2D space are linearly independent if and only if they do\n    not point along the same straight line (non-collinear). Geometrically,\n    this means the parallelogram spanned by them has non-zero area, which\n    equals the absolute determinant |ad - bc| of the matrix formed by them.\n\n    Parameters\n    ----------\n    v1 : np.ndarray of shape (2,)\n        First vector [v1_x, v1_y].\n    v2 : np.ndarray of shape (2,)\n        Second vector [v2_x, v2_y].\n    tol : float\n        Numerical tolerance threshold to handle floating point imprecision.\n\n    Returns\n    -------\n    bool\n        True if the vectors span a full 2D plane (linearly independent),\n        False if they are collinear (linearly dependent).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "True"
            }
          },
          "solution": "import numpy as np\n\ndef check_linear_independence_2d(v1: np.ndarray, v2: np.ndarray, tol: float = 1e-9) -> bool:\n    \"\"\"\n    Check whether two 2D vectors are linearly independent.\n\n    Intuition\n    ---------\n    Two vectors in 2D space are linearly independent if and only if they do\n    not point along the same straight line (non-collinear). Geometrically,\n    this means the parallelogram spanned by them has non-zero area, which\n    equals the absolute determinant |ad - bc| of the matrix formed by them.\n\n    Parameters\n    ----------\n    v1 : np.ndarray of shape (2,)\n        First vector [v1_x, v1_y].\n    v2 : np.ndarray of shape (2,)\n        Second vector [v2_x, v2_y].\n    tol : float\n        Numerical tolerance threshold to handle floating point imprecision.\n\n    Returns\n    -------\n    bool\n        True if the vectors span a full 2D plane (linearly independent),\n        False if they are collinear (linearly dependent).\n    \"\"\"\n    # Step 1: Arrange vectors as columns in a 2x2 matrix\n    # A = np.column_stack((v1, v2))\n\n    # Step 2: Compute the 2D determinant (v1_x * v2_y - v1_y * v2_x)\n    # det = np.linalg.det(A)\n\n    # Step 3: Return True if the absolute determinant exceeds the numerical tolerance\n    # return bool(abs(det) > tol)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "A quantitative analyst prepares a credit-risk model using 3 features: Monthly Salary $x_1$, Annual Salary $x_2 = 12 \\cdot x_1$, and Years of Experience $x_3$. What is the geometric dimension of the feature subspace spanned by the columns of this dataset?",
            "ar": "يُعد باحث بيانات نموذجاً لمخاطر الائتمان بثلاثة متغيرات: الراتب الشهري $x_1$، والراتب السنوي $x_2 = 12 \\cdot x_1$، وسنوات الخبرة $x_3$. ما هو البعد الهندسي للفضاء الفرعي الذي تولده أعمدة هذه البيانات؟"
          },
          "options": [
            {
              "text": {
                "en": "At most 2 dimensions, because Annual Salary is a strict collinear scalar multiple of Monthly Salary, introducing zero new independent spanning directions.",
                "ar": "بُعدان على الأكثر، لأن الراتب السنوي مضاعف قياسي مباشر للراتب الشهري، وبالتالي لا يضيف أي اتجاه مستقل جديد لتوليد الفضاء.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Because $x_2 = 12 \\cdot x_1$, the column vector $x_2$ lies entirely inside $\\operatorname{span}(x_1)$. The subspace spanned by $\\{x_1, x_2, x_3\\}$ is identical to $\\operatorname{span}(x_1, x_3)$, which has dimension at most 2. This exact redundancy causes perfect multicollinearity in linear models.",
                "ar": "نظراً لأن $x_2 = 12 \\cdot x_1$، فإن متجه العمود $x_2$ يقع بالكامل داخل مدى $x_1$. الفضاء الذي تولده الأعمدة الثلاثة يطابق تماماً الفضاء المتولد من $\\{x_1, x_3\\}$، وبعده 2 كحد أقصى، وهو ما يسبب التعدد الخطي التام في الانحدار."
              }
            },
            {
              "text": {
                "en": "Exactly 3 dimensions, because there are 3 distinct physical columns stored in the database matrix.",
                "ar": "3 أبعاد تماماً، لوجود 3 أعمدة فيزيائية مميزة مخزنة في قاعدة البيانات.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Dimension depends on linear independence, not on the raw number of database columns. Storing a duplicate column does not unlock a new geometric dimension of information.",
                "ar": "البعد الهندسي يحدده الاستقلال الخطي لا عدد الأعمدة المجرد؛ فتكرار عمود لا يخلق بعداً فضائياً جديداً للمعلومات."
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
    "id": "t1-05",
    "title": "The Dot Product & Geometric Projection Duality",
    "titleAr": "الجداء النقطي وثنائية الإسقاط الهندسي",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine pulling a heavy wheeled suitcase across an airport concourse. The handle is angled upward at $45^\\circ$, and your arm pulls along...",
      "ar": "تخيل أنك تسحب حقيبة سفر ذات عجلات في صالة المطار. مقبض الحقيبة يرتفع مائلاً بزاوية $45^\\circ$، وأنت تبذل قوة عضلية كبيرة لسحب المقبض في هذا..."
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
          "en": "Imagine pulling a heavy wheeled suitcase across an airport concourse. The handle is angled upward at $45^\\circ$, and your arm pulls along this diagonal line with substantial physical force. But the suitcase is clamped to the floor by gravity; it can only roll horizontally along the ground. Does your entire muscular effort accelerate the suitcase forward? No! Only the horizontal portion of your pull—the horizontal **shadow** of your force vector cast upon the floor—does actual physical work. The vertical portion of your pull simply lifts slightly against gravity.\n\nIf you crouch down and pull the handle horizontally ($\\theta = 0^\\circ$), your entire effort drives the suitcase forward ($\\cos 0^\\circ = 1$). If you were to pull straight up toward the ceiling at a right angle ($\\theta = 90^\\circ$), the suitcase would not roll forward by even a millimeter ($\\cos 90^\\circ = 0$), no matter how intensely your muscles strain. The **dot product** (or inner product) is nature's mathematical accountant for this phenomenon: it measures the degree of directional alignment between two vectors, multiplying the length of one vector by the length of the projected shadow it casts upon the other.\n\nThink also of a solar panel installed on a rooftop. When the sun stands directly overhead perpendicular to the panel, maximum solar photons strike the silicon cells, generating peak electric current. As the afternoon progresses and sunlight strikes at a grazing angle, the effective surface area catching the light shrinks proportional to the cosine of the angle. At sunset, the light rays graze parallel to the panel ($\\theta = 90^\\circ$ relative to the surface normal), and power output drops to zero.\n\nIn the realm of modern data science and Artificial Intelligence, vectors do not represent physical ropes or sunlight—they represent thoughts, documents, images, and user preferences. When two high-dimensional concept vectors point in the same direction, their dot product is large and positive, signaling strong conceptual resonance. When they are perpendicular (orthogonal), their dot product vanishes to zero, indicating complete independence. And when they point in opposite directions, the dot product turns negative, signaling opposition.\n\n---",
          "ar": "تخيل أنك تسحب حقيبة سفر ذات عجلات في صالة المطار. مقبض الحقيبة يرتفع مائلاً بزاوية $45^\\circ$، وأنت تبذل قوة عضلية كبيرة لسحب المقبض في هذا الاتجاه المائل. لكن عجلات الحقيبة مقيدة بالأرض بفعل الجاذبية، ولا يمكنها التحرك إلا أفقياً إلى الأمام. هل تترجم كل طاقتك المبذولة إلى دفع الحقيبة للأمام؟ بالتأكيد لا! فالمركبة الأفقية وحدها—أي **الظل** الأفقي لقوة سحبك المسقط على أرضية الصالة—هي التي تنجز الشغل الحركي وتدفع الحقيبة للأمام، بينما يضيع الجزء الرأسي من السحب في مقاومة الجاذبية للأعلى.\n\nإذا انحنيت وسحبت المقبض بشكل أفقي تماماً موازٍ للأرض ($\\theta = 0^\\circ$)، فإن طاقتك بالكامل تتحول لحركة أفقية سريعة ($\\cos 0^\\circ = 1$). أما إذا رفعت المقبض رأسياً نحو سقف المطار بزاوية قائمة ($\\theta = 90^\\circ$)، فلن تتحرك الحقيبة للأمام ولو مليمتراً واحداً ($\\cos 90^\\circ = 0$) مهما أجهدت عضلاتك. إن **الجداء النقطي** (Dot Product) هو الأداة الرياضية الكونية الدقيقة لقياس هذه الظاهرة: فهو يقيس درجة المحاذاة والانسجام الاتجاهي بين متجهين، عبر إسقاط أحدهما كظل عمودي على الآخر وضرب طول هذا الظل في طول المتجه الأساسي.\n\nتأمل أيضاً لوحاً شمسياً مثبتاً على سطح منزل. عندما تكون الشمس عمودية تماماً على سطح اللوح، تسقط حزم الفوتونات بكثافة قصوى فينتج اللوح أعلى تيار كهربائي ممكن. ومع ميلان الشمس عصراً وسقوط أشعتها بزاوية منحرفة، تتقلص مساحة اللوح الفعالة في التقاط الأشعة طردياً مع جيب تمام زاوية السقوط. وعند الغروب عندما تلامس الأشعة سطح اللوح بشكل موازٍ ($\\theta = 90^\\circ$ بالنسبة للعمودي على السطح)، ينعدم الإنتاج الكهربائي تماماً.\n\nفي عالم الذكاء الاصطناعي وعلوم البيانات الحديثة، لا تعبر المتجهات عن حبال أو أشعة شمس، بل تعبر عن أفكار وكلمات وصور وسلوكيات. عندما يشير متجها كلمتين إلى نفس الاتجاه في الفضاء الدلالي، يقفز جداؤهما النقطي إلى قيمة موجبة ضخمة، مما يعني ترابط المعنى وانسجامه. وإذا كانا متعامدين، ينعدم الجداء النقطي ليصبح صفراً، دالاً على استقلالية المفهومين التامة. أما إذا تعاكسا، يصبح الناتج سالباً، مشيراً إلى تضاد دلالي صريح."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{u}^T \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2 \\cos \\theta, \\quad \\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2}",
        "formulaNote": {
          "en": "Mathematical anchor for The Dot Product & Geometric Projection Duality.",
          "ar": "المرساة الرياضية لـ الجداء النقطي وثنائية الإسقاط الهندسي."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{u} \\cdot \\mathbf{v}$ | Dot Product / Inner Product | The scalar number quantifying the directional alignment and mutual shadow of two vectors. |\n| $\\mathbf{u}^T \\mathbf{v}$ | Matrix Product Form | Compact algebraic representation: transposing column vector $\\mathbf{u}$ into a $1 \\times n$ row, then multiplying by column $\\mathbf{v}$. |\n| $\\sum_{i=1}^n u_i v_i$ | Coordinate Formulation | Pure computation: multiply matching coordinates along each axis, then sum all $n$ products together. |\n| $\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2$ | Length Magnification Factor | The product of the vectors' physical lengths, setting the maximum possible scale of the dot product. |\n| $\\cos\\theta$ | Alignment Gauge ($\\in [-1, 1]$) | Directional filter: $+1$ when pointing together ($0^\\circ$), $0$ when orthogonal ($90^\\circ$), and $-1$ when opposite ($180^\\circ$). |\n| $\\theta = 90^\\circ \\implies \\mathbf{u} \\cdot \\mathbf{v} = 0$ | Orthogonality Condition | The definitive geometric test of perpendicularity in any dimensional space. |\n\n##### Why the Math Works Step-by-Step\n1. **Why does the coordinate sum $\\sum u_i v_i$ equal the geometric form $\\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta$?**\n   Consider the triangle formed by vectors $\\mathbf{u}$, $\\mathbf{v}$, and the displacement $\\mathbf{u} - \\mathbf{v}$. By the geometric Law of Cosines:\n   $$\\|\\mathbf{u} - \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2 - 2 \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta$$\n   Now expand the left-hand side using the coordinate definition of squared Euclidean norm:\n   $$\\|\\mathbf{u} - \\mathbf{v}\\|^2 = \\sum_{i=1}^n (u_i - v_i)^2 = \\sum_{i=1}^n u_i^2 - 2\\sum_{i=1}^n u_i v_i + \\sum_{i=1}^n v_i^2 = \\|\\mathbf{u}\\|^2 - 2 \\left(\\sum_{i=1}^n u_i v_i\\right) + \\|\\mathbf{v}\\|^2$$\n   Equating the two expressions and canceling $\\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2$ from both sides immediately proves:\n   $$\\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta$$\n   The algebraic coordinate sum and the geometric angle formula are identical twins of the same mathematical truth!\n2. **Why does orthogonality produce zero?** When two vectors meet at a $90^\\circ$ angle, $\\cos(90^\\circ) = 0$. Projecting one vector straight down onto the other yields a shadow of zero length. Hence, their inner product vanishes completely.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{u} \\cdot \\mathbf{v}$ | الجداء النقطي / الداخلي | القيمة القياسية التي تقيس مقدار التوافق الاتجاهي والظل المشترك بين متجهين. |\n| $\\mathbf{u}^T \\mathbf{v}$ | صياغة ضرب المصفوفات | تمثيل جبري أنيق: تحويل المتجه $\\mathbf{u}$ إلى صف أفقي $1 \\times n$ وضربه في المتجه العمودي $\\mathbf{v}$. |\n| $\\sum_{i=1}^n u_i v_i$ | الصيغة الإحداثية الحسابية | طريقة الحساب المباشر: ضرب المركبات المتناظرة على كل محور وجمع النواتج لجميع الأبعاد الـ $n$. |\n| $\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2$ | مضاعف أطوال المتجهات | حاصل ضرب طولي المتجهين، وهو ما يحدد سقف القيمة القصوى الممكنة للجداء النقطي. |\n| $\\cos\\theta$ | مقياس التوافق الزاوي | فلتر الاتجاه: يبلغ $+1$ عند التطابق التام، و $0$ عند التعامد، و $-1$ عند التضاد والانعكاس. |\n| $\\theta = 90^\\circ \\implies \\mathbf{u} \\cdot \\mathbf{v} = 0$ | شرط التعامد الحاسم | الاختبار الهندسي القاطع لتعامد متجهين في أي فضاء مهما بلغت أبعاده. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا يطابق مجموع الإحداثيات $\\sum u_i v_i$ الصيغة الهندسية $\\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta$؟**\n   تأمل المثلث المتشكل من المتجهين $\\mathbf{u}$ و $\\mathbf{v}$ والضلع الثالث $\\mathbf{u} - \\mathbf{v}$. ينص قانون جيب التمام الهندسي على:\n   $$\\|\\mathbf{u} - \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2 - 2 \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta$$\n   وعند فك الطرف الأيسر بتعريف معيار المسافة الإحداثي:\n   $$\\|\\mathbf{u} - \\mathbf{v}\\|^2 = \\sum_{i=1}^n (u_i - v_i)^2 = \\|\\mathbf{u}\\|^2 - 2 \\left(\\sum_{i=1}^n u_i v_i\\right) + \\|\\mathbf{v}\\|^2$$\n   بمساواة الطرفين وحذف المقادير المشتركة، يتجلى البرهان القاطع على أن:\n   $$\\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta$$\n   فالصيغة الحسابية الإحداثية والصيغة المثلثية وجهان لحقيقة هندسية واحدة!\n2. **لماذا ينتج عن التعامد حاصل ضرب نقطي يساوي صفراً؟** لأن جيب تمام الزاوية القائمة $\\cos(90^\\circ) = 0$؛ وإسقاط أي متجه عمودياً على متجه آخر يصنع ظلاً طوله صفر، مما يجعل جداءهما الداخلي ينعدم تماماً."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-05",
          "starterCode": "def cosine_similarity(u: np.ndarray, v: np.ndarray, eps: float = 1e-12) -> float:\n    \"\"\"\n    Compute the cosine similarity cos(theta) = (u . v) / (||u|| * ||v||).\n\n    Intuition\n    ---------\n    Cosine similarity normalizes the dot product by the lengths of both\n    vectors, isolating pure directional alignment. The result is strictly\n    bounded in [-1.0, 1.0], where 1.0 indicates identical orientation,\n    0.0 represents orthogonality (perpendicularity), and -1.0 is anti-parallel.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First vector (e.g., query embedding).\n    v : np.ndarray of shape (D,)\n        Second vector (e.g., document embedding).\n    eps : float\n        Numerical guard to prevent division by zero for null vectors.\n\n    Returns\n    -------\n    float\n        Cosine similarity bounded within [-1.0, 1.0].\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def cosine_similarity(u: np.ndarray, v: np.ndarray, eps: float = 1e-12) -> float:\n    \"\"\"\n    Compute the cosine similarity cos(theta) = (u . v) / (||u|| * ||v||).\n\n    Intuition\n    ---------\n    Cosine similarity normalizes the dot product by the lengths of both\n    vectors, isolating pure directional alignment. The result is strictly\n    bounded in [-1.0, 1.0], where 1.0 indicates identical orientation,\n    0.0 represents orthogonality (perpendicularity), and -1.0 is anti-parallel.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First vector (e.g., query embedding).\n    v : np.ndarray of shape (D,)\n        Second vector (e.g., document embedding).\n    eps : float\n        Numerical guard to prevent division by zero for null vectors.\n\n    Returns\n    -------\n    float\n        Cosine similarity bounded within [-1.0, 1.0].\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "0.0"
            }
          },
          "solution": "import numpy as np\n\ndef cosine_similarity(u: np.ndarray, v: np.ndarray, eps: float = 1e-12) -> float:\n    \"\"\"\n    Compute the cosine similarity cos(theta) = (u . v) / (||u|| * ||v||).\n\n    Intuition\n    ---------\n    Cosine similarity normalizes the dot product by the lengths of both\n    vectors, isolating pure directional alignment. The result is strictly\n    bounded in [-1.0, 1.0], where 1.0 indicates identical orientation,\n    0.0 represents orthogonality (perpendicularity), and -1.0 is anti-parallel.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (D,)\n        First vector (e.g., query embedding).\n    v : np.ndarray of shape (D,)\n        Second vector (e.g., document embedding).\n    eps : float\n        Numerical guard to prevent division by zero for null vectors.\n\n    Returns\n    -------\n    float\n        Cosine similarity bounded within [-1.0, 1.0].\n    \"\"\"\n    # Step 1: Compute the algebraic dot product between u and v\n    # dot_product = float(np.dot(u, v))\n\n    # Step 2: Compute Euclidean L2 norms of both vectors\n    # norm_u = float(np.linalg.norm(u))\n    # norm_v = float(np.linalg.norm(v))\n\n    # Step 3: Divide dot product by product of norms with eps safety guard\n    # denominator = max(norm_u * norm_v, eps)\n    # return dot_product / denominator\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "Two document embedding vectors $\\mathbf{u}$ and $\\mathbf{v}$ in a semantic search engine have been normalized to unit length such that $\\|\\mathbf{u}\\| = 1$ and $\\|\\mathbf{v}\\| = 1$. If their dot product $\\mathbf{u} \\cdot \\mathbf{v} = -1.0$, what does this signify about their semantic meaning and geometric orientation?",
            "ar": "تم توحيد متجّهي تضمين لنصين في محرك بحث دلالي بحيث أصبح طول كل منهما وحدة واحدة $\\|\\mathbf{u}\\| = 1$ و $\\|\\mathbf{v}\\| = 1$. إذا كان جداؤهما النقطي $\\mathbf{u} \\cdot \\mathbf{v} = -1.0$، فماذا يعني ذلك دلالياً وهندسياً؟"
          },
          "options": [
            {
              "text": {
                "en": "The vectors point in diametrically opposite directions ($\\theta = 180^\\circ$), representing completely antithetical semantic concepts.",
                "ar": "يشير المتجهان إلى اتجاهين متعاكسين تماماً (الزاوية $\\theta = 180^\\circ$)، مما يمثل مفهومين متضادين دلالياً بأقصى درجة ممكنة.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Because $\\cos(180^\\circ) = -1$, the dot product of unit vectors reaches its minimal lower bound when vectors are anti-parallel. In contrast, unrelated independent concepts yield a dot product of $0$ (orthogonal).",
                "ar": "لأن جيب تمام $180^\\circ$ هو $-1$، فإن الجداء النقطي لمتجهات الوحدة يبلغ حده الأدنى المطلق عند التعاكس التام في الاتجاه. في حين أن المفاهيم المستقلة تماماً والتي لا تربطها صلة تعطي جداءً نقطياً صفرياً (متعامدة)."
              }
            },
            {
              "text": {
                "en": "The documents share zero vocabulary words and have no connection to each other.",
                "ar": "النصان لا يشتركان في أي مفردات لغوية ولا تربطهما أي صلة ببعضهما البعض.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Having zero semantic connection corresponds to geometric orthogonality ($\\mathbf{u} \\cdot \\mathbf{v} = 0$), not $-1.0$.",
                "ar": "انعدام الصلة الدلالية يقابله التعامد الهندسي التام (الجداء النقطي $= 0$)، وليس القيمة المتنافرة $-1.0$."
              }
            },
            {
              "text": {
                "en": "The embeddings are corrupted because dot products of normalized vectors can never be negative.",
                "ar": "المتجهات تالفة برمجياً لأن الجداء النقطي لمتجهات الوحدة لا يمكن أن يكون سالباً.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The cosine function spans $[-1, 1]$; negative dot products are completely valid and indicate obtuse angles ($\\theta > 90^\\circ$).",
                "ar": "دالة جيب التمام تمتد رياضياً بين $[-1, 1]$؛ والقيم السالبة صالحة وطبيعية وتدل على زوايا منفرجة أكبر من $90^\\circ$."
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
    "id": "t1-06",
    "title": "The Cross Product, Orthogonality & Oriented Area",
    "titleAr": "الجداء الاتجاهي والتعامد والمساحة الموجهة",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine trying to loosen a stubborn, rusted steel bolt on an engine block using a long socket wrench.",
      "ar": "تخيل أنك تحاول فك برغي معدني صدئ في محرك سيارة باستخدام مفتاح ربط صلب طويل. تثبت رأس المفتاح على البرغي وتقبض على طرفه الآخر، صانعاً متجه..."
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
          "en": "Imagine trying to loosen a stubborn, rusted steel bolt on an engine block using a long socket wrench. You attach the socket to the bolt and grab the end of the wrench arm, defining a position vector $\\mathbf{r}$ pointing from the bolt to your hand. You then lean your body weight into a vigorous push, exerting a force vector $\\mathbf{F}$ perpendicular to the wrench handle. What happens to the bolt? It does not slide along the wrench handle, nor does it travel along the direction of your muscular push. Instead, it begins to rotate and unscrew, moving straight *out* of the engine block along a third axis standing at a strict $90^\\circ$ right angle to both the wrench and your push!\n\nThis physical twisting phenomenon is **torque** ($\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F}$). The **cross product** (or vector product) is a mathematical operation unique to 3D space: it takes two vectors and synthesizes a brand-new third vector that stands perpendicular (orthogonal) to the entire plane defined by the first two. If you draw two arrows on a wooden tabletop, their cross product points straight up toward the ceiling or straight down through the floor.\n\nHow does the universe decide whether the resulting arrow shoots upward or downward? It follows the universal **Right-Hand Rule**: extend your right hand flat, orienting your fingers along the first vector $\\mathbf{u}$. Now, curl your fingers inward toward the second vector $\\mathbf{v}$. Your outstretched thumb will point unambiguously in the direction of the cross product $\\mathbf{u} \\times \\mathbf{v}$. If you reverse the order and curl from $\\mathbf{v}$ into $\\mathbf{u}$, your thumb flips upside down. This means the cross product is **anti-commutative**: swapping the operands negates the direction ($\\mathbf{u} \\times \\mathbf{v} = -(\\mathbf{v} \\times \\mathbf{u})$).\n\nThe length (magnitude) of this perpendicular vector is not arbitrary; it represents the geometric **area** of the parallelogram spanned by the two vectors. If you stretch vector $\\mathbf{u}$ as the base of the parallelogram, its perpendicular height is $\\|\\mathbf{v}\\| \\sin\\theta$. Multiplying base by height gives $\\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta$. If the two vectors point along the exact same line ($\\theta = 0^\\circ$ or $180^\\circ$), the parallelogram flattens into a 1D stick with zero area ($\\sin 0^\\circ = 0$), and the cross product vanishes completely!\n\n---",
          "ar": "تخيل أنك تحاول فك برغي معدني صدئ في محرك سيارة باستخدام مفتاح ربط صلب طويل. تثبت رأس المفتاح على البرغي وتقبض على طرفه الآخر، صانعاً متجه ذراع $\\mathbf{r}$ يمتد من مركز البرغي إلى يدك. ثم تبذل قوة عضلية كبيرة في اتجاه عمودي على الذراع تمثل متجه القوة $\\mathbf{F}$. كيف يتحرك البرغي على أرض الواقع؟ إنه لا ينزلق على طول ذراع المفتاح، ولا يتحرك في اتجاه دفع يدك المباشر؛ بل يبدأ في الدوران والانفكاك مندفعاً مباشرة إلى *الخارج* على طول محور ثالث يصنع زاوية قائمة صارمة ($90^\\circ$) مع كل من ذراع المفتاح واتجاه دفع يدك!\n\nهذه القوة الدورانية الحية هي ما نسميه في الفيزياء **عزم الدوران** ($\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F}$). إن **الجداء الاتجاهي** (Cross Product) هو عملية رياضية أصيلة في الفضاء ثلاثي الأبعاد: تأخذ متجهين وتولد منهما متجهاً ثالثاً جديداً يقف عمودياً تماماً على السطح المستوي الذي يحتضن المتجهين الأصليين. فلو رسمت سهمين على سطح طاولة خشبية مستوية، فإن جدائهما الاتجاهي سينطلق كرمح مستقيم عمودياً نحو سقف الغرفة أو نحو الأرضية.\n\nكيف يحسم الكون الاتجاه: هل ينطلق المتجه للأعلى أم للأسفل؟ يحكم ذلك قانون فيزيائي كوني يُعرف بـ **قاعدة اليد اليمنى**: ابسط كف يدك اليمنى بحيث تشير أصابعك باتجاه المتجه الأول $\\mathbf{u}$، ثم اثنِ أصابعك لتتحرك باتجاه المتجه الثاني $\\mathbf{v}$. سيمتد إبهامك حتماً ليشير بدقة إلى اتجاه المتجه الناتج $\\mathbf{u} \\times \\mathbf{v}$. وإذا عكست الترتيب وبدأت من $\\mathbf{v}$ نحو $\\mathbf{u}$، فسينقلب إبهامك ليشير إلى الاتجاه المعاكس تماماً للأسفل. هذا يعني أن الجداء الاتجاهي هو عملية **تبادلية عكسية** (Anti-commutative): تبديل المتجهين يقلب إشارة الاتجاه ($\\mathbf{u} \\times \\mathbf{v} = -(\\mathbf{v} \\times \\mathbf{u})$).\n\nأما طول (مقدار) هذا المتجه العمودي فليس رقماً عشوائياً، بل يطابق بالتمام والكمال **المساحة الهندسية** لمتوازي الأضلاع الذي يرسمه المتجهان في الفضاء. فإذا اعتبرنا $\\mathbf{u}$ قاعدة متوازي الأضلاع، فإن ارتفاعه العمودي هو $\\|\\mathbf{v}\\| \\sin\\theta$. وحاصل ضرب القاعدة في الارتفاع هو $\\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta$. فإذا انطبق المتجهان على نفس خط الاستقامة توازياً ($\\theta = 0^\\circ$ أو $180^\\circ$)، ينكمش متوازي الأضلاع إلى خط تنعدم مساحته ($\\sin 0^\\circ = 0$)، وينعدم الجداء الاتجاهي تماماً ليصبح متجهاً صفرياً!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{u} \\times \\mathbf{v} = \\begin{bmatrix} u_2 v_3 - u_3 v_2 \\\\ u_3 v_1 - u_1 v_3 \\\\ u_1 v_2 - u_2 v_1 \\end{bmatrix} = \\det\\begin{bmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{bmatrix}, \\quad \\|\\mathbf{u} \\times \\mathbf{v}\\|_2 = \\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2 \\sin\\theta",
        "formulaNote": {
          "en": "Mathematical anchor for The Cross Product, Orthogonality & Oriented Area.",
          "ar": "المرساة الرياضية لـ الجداء الاتجاهي والتعامد والمساحة الموجهة."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{u} \\times \\mathbf{v}$ | Cross Product | The 3D vector-producing operator yielding a perpendicular vector whose length equals parallelogram area. |\n| $\\mathbf{i}, \\mathbf{j}, \\mathbf{k}$ | Standard Basis Unit Vectors | Unit vectors of length 1 pointing along the positive $X$, $Y$, and $Z$ axes respectively. |\n| $\\det[\\dots]_{3 \\times 3}$ | Formal Determinant Mnemonic | A symbolic determinant structure organizing the alternating signs and coordinate cross-multiplications. |\n| $u_2 v_3 - u_3 v_2$ | Component-wise Differences | The net 2D oriented area projected onto the orthogonal coordinate planes ($YZ$, $ZX$, and $XY$). |\n| $\\|\\mathbf{u} \\times \\mathbf{v}\\|_2$ | Magnitude / Norm | The physical area of the 2D parallelogram spanned by vectors $\\mathbf{u}$ and $\\mathbf{v}$ in 3D space. |\n| $\\sin\\theta$ | Perpendicularity Factor | Angle multiplier: maximum ($1.0$) when vectors are perpendicular ($90^\\circ$), and zero when collinear. |\n| $\\mathbf{u} \\times \\mathbf{v} = -(\\mathbf{v} \\times \\mathbf{u})$ | Anti-commutativity | Swapping inputs flips the direction $180^\\circ$ backwards, following the Right-Hand Rule. |\n\n##### Why the Math Works Step-by-Step\n1. **Why is the resulting vector strictly perpendicular to both inputs?**\n   Let us mathematically test whether $\\mathbf{u} \\times \\mathbf{v}$ is perpendicular to $\\mathbf{u}$ by taking their dot product:\n   $$(\\mathbf{u} \\times \\mathbf{v}) \\cdot \\mathbf{u} = u_1 (u_2 v_3 - u_3 v_2) + u_2 (u_3 v_1 - u_1 v_3) + u_3 (u_1 v_2 - u_2 v_1)$$\n   Multiplying out the terms:\n   $$= u_1 u_2 v_3 - u_1 u_3 v_2 + u_2 u_3 v_1 - u_1 u_2 v_3 + u_1 u_3 v_2 - u_2 u_3 v_1$$\n   Notice the beautiful symmetry: $u_1 u_2 v_3$ cancels with $-u_1 u_2 v_3$, $-u_1 u_3 v_2$ cancels with $+u_1 u_3 v_2$, and $u_2 u_3 v_1$ cancels with $-u_2 u_3 v_1$. The sum is identically and unconditionally **$0$**! The exact same cancellation occurs for $(\\mathbf{u} \\times \\mathbf{v}) \\cdot \\mathbf{v} = 0$. This proves that the cross product is perpendicular to both original vectors.\n2. **Why does the magnitude equal the parallelogram area?**\n   In geometry, the area of a parallelogram is $\\text{base} \\times \\text{height}$. Choosing $\\mathbf{u}$ as the base gives length $\\|\\mathbf{u}\\|$. The height perpendicular to that base is $\\|\\mathbf{v}\\| \\sin\\theta$. Their product is $\\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta$, which algebraically matches the Euclidean norm of the cross product vector.\n3. **Why does swapping vectors flip the sign?**\n   In matrix algebra, swapping two rows in a determinant reverses its sign. Because $\\mathbf{u}$ and $\\mathbf{v}$ occupy rows 2 and 3, swapping their positions negates every single coordinate of the result.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{u} \\times \\mathbf{v}$ | الجداء الاتجاهي | المؤثر الهندسي ثلاثي الأبعاد الذي يولد متجهاً عمودياً يطابق طوله مساحة متوازي الأضلاع. |\n| $\\mathbf{i}, \\mathbf{j}, \\mathbf{k}$ | متجهات الأساس المعيارية | متجهات وحدة طول كل منها 1 تشير إلى الاتجاهات الموجبة للمحاور $X$ و $Y$ و $Z$ على الترتيب. |\n| $\\det[\\dots]_{3 \\times 3}$ | محدد المصفوفة التذكيري | أداة جبرية رمزية لتنظيم حساب الفروق وحواضل الضرب التبادلية متناوبة الإشارة. |\n| $u_2 v_3 - u_3 v_2$ | الفروق الإحداثية التبادلية | المساحات الموجهة الصافية الناتجة عن إسقاط متوازي الأضلاع على المستويات الإحداثية الثلاثة. |\n| $\\|\\mathbf{u} \\times \\mathbf{v}\\|_2$ | مقدار المتجه الناتج | المساحة السطحية الفعلية لمتوازي الأضلاع المتولد من المتجهين في الفضاء ثلاثي الأبعاد. |\n| $\\sin\\theta$ | معامل التعامد الزاوي | نسبة الارتفاع: يبلغ قيمته العظمى ($1.0$) عند التعامد ($90^\\circ$)، وينعدم تماماً عند التوازي. |\n| $\\mathbf{u} \\times \\mathbf{v} = -(\\mathbf{v} \\times \\mathbf{u})$ | التبادلية العكسية | تبديل المتجهين يقلب اتجاه السهم الناتج $180^\\circ$ للجهة المقابلة وفق قاعدة اليد اليمنى. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا يكون المتجه الناتج عمودياً تماماً على كلا المتجهين؟**\n   دعنا نختبر التعامد رياضياً بحساب الجداء النقطي بين $\\mathbf{u} \\times \\mathbf{v}$ والمتجه $\\mathbf{u}$:\n   $$(\\mathbf{u} \\times \\mathbf{v}) \\cdot \\mathbf{u} = u_1 (u_2 v_3 - u_3 v_2) + u_2 (u_3 v_1 - u_1 v_3) + u_3 (u_1 v_2 - u_2 v_1)$$\n   بفك الحدود الجبرية:\n   $$= u_1 u_2 v_3 - u_1 u_3 v_2 + u_2 u_3 v_1 - u_1 u_2 v_3 + u_1 u_3 v_2 - u_2 u_3 v_1$$\n   تأمل هذا التناظر البديع: كل حد موجب يقابله حد سالب يطابقه تماماً فيلغيه! النتيجة حتماً ودائماً هي **صفر** مطلق! وتحدث نفس المعجزة الجبرية عند حساب الجداء النقطي مع $\\mathbf{v}$. وهذا برهان قاطع على التعامد التام.\n2. **لماذا يطابق مقدار المتجه مساحة متوازي الأضلاع؟**\n   مساحة متوازي الأضلاع هندسياً هي حاصل ضرب القاعدة في الارتفاع. إذا اعتبرنا المتجه $\\mathbf{u}$ هو القاعدة فطولها $\\|\\mathbf{u}\\|$، والارتفاع الساقط عليها هو $\\|\\mathbf{v}\\| \\sin\\theta$. وحاصل ضربهما يطابق رياضياً المعيار الإقليدي لمتجه الجداء الاتجاهي.\n3. **لماذا يقلب تبديل المتجهين إشارة الناتج؟**\n   في جبر المصفوفات، تبديل أي صفين في المحدد يعكس إشارة الناتج تلقائياً. وحيث أن المتجهين يشغلان الصفين الثاني والثالث، فإن عكسهما يقلب إشارات كافة المركبات."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-06",
          "starterCode": "def cross_product_3d(u: np.ndarray, v: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute the 3D cross product u x v.\n\n    Intuition\n    ---------\n    The cross product constructs a vector perpendicular to both input vectors\n    in 3D space according to the Right-Hand Rule. Its length corresponds to\n    the geometric area of the parallelogram formed by the two vectors.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (3,)\n        First 3D vector [u_x, u_y, u_z].\n    v : np.ndarray of shape (3,)\n        Second 3D vector [v_x, v_y, v_z].\n\n    Returns\n    -------\n    np.ndarray of shape (3,)\n        Resultant vector perpendicular to both u and v.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def cross_product_3d(u: np.ndarray, v: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute the 3D cross product u x v.\n\n    Intuition\n    ---------\n    The cross product constructs a vector perpendicular to both input vectors\n    in 3D space according to the Right-Hand Rule. Its length corresponds to\n    the geometric area of the parallelogram formed by the two vectors.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (3,)\n        First 3D vector [u_x, u_y, u_z].\n    v : np.ndarray of shape (3,)\n        Second 3D vector [v_x, v_y, v_z].\n\n    Returns\n    -------\n    np.ndarray of shape (3,)\n        Resultant vector perpendicular to both u and v.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "array([0., 0., 1.])"
            }
          },
          "solution": "import numpy as np\n\ndef cross_product_3d(u: np.ndarray, v: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute the 3D cross product u x v.\n\n    Intuition\n    ---------\n    The cross product constructs a vector perpendicular to both input vectors\n    in 3D space according to the Right-Hand Rule. Its length corresponds to\n    the geometric area of the parallelogram formed by the two vectors.\n\n    Parameters\n    ----------\n    u : np.ndarray of shape (3,)\n        First 3D vector [u_x, u_y, u_z].\n    v : np.ndarray of shape (3,)\n        Second 3D vector [v_x, v_y, v_z].\n\n    Returns\n    -------\n    np.ndarray of shape (3,)\n        Resultant vector perpendicular to both u and v.\n    \"\"\"\n    # Step 1: Compute x component: u_y * v_z - u_z * v_y\n    # cx = float(u[1] * v[2] - u[2] * v[1])\n\n    # Step 2: Compute y component: u_z * v_x - u_x * v_z\n    # cy = float(u[2] * v[0] - u[0] * v[2])\n\n    # Step 3: Compute z component: u_x * v_y - u_y * v_x\n    # cz = float(u[0] * v[1] - u[1] * v[0])\n\n    # Step 4: Assemble and return the orthogonal vector array\n    # return np.array([cx, cy, cz], dtype=float)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "Two non-zero vectors $\\mathbf{u}$ and $\\mathbf{v}$ in a 3D graphics rendering engine satisfy $\\mathbf{u} \\times \\mathbf{v} = \\mathbf{0}$. What does this reveal about their spatial geometric configuration and the polygon area they define?",
            "ar": "متجهان غير صفريين $\\mathbf{u}$ و $\\mathbf{v}$ في محرك رسوم ثلاثية الأبعاد يحققان $\\mathbf{u} \\times \\mathbf{v} = \\mathbf{0}$. ماذا يكشف ذلك عن وضعهما الهندسي في الفضاء وعن مساحة السطح الذي يحددانه؟"
          },
          "options": [
            {
              "text": {
                "en": "The vectors are collinear (parallel or anti-parallel, $\\theta = 0^\\circ$ or $180^\\circ$), meaning the parallelogram collapses into a 1D segment of zero area.",
                "ar": "المتجهان يقعان على نفس خط الاستقامة (متوازيان أو متعاكسان، $\\theta = 0^\\circ$ أو $180^\\circ$)، مما يعني انكماش متوازي الأضلاع إلى قطعة أحادية البعد تنعدم مساحتها.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Because $\\|\\mathbf{u} \\times \\mathbf{v}\\| = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta$, the cross product magnitude is zero if and only if $\\sin\\theta = 0$. This occurs precisely when vectors point along the same or diametrically opposite lines. A degenerate parallelogram with parallel sides has zero surface area.",
                "ar": "نظراً لأن $\\|\\mathbf{u} \\times \\mathbf{v}\\| = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta$، فإن مقدار الجداء الاتجاهي ينعدم فقط عندما يكون $\\sin\\theta = 0$، وهو ما يتحقق عند التوازي التام أو التعاكس. ومتوازي الأضلاع الذي تتطابق أضلاعه تنعدم مساحته السطحية تماماً."
              }
            },
            {
              "text": {
                "en": "The vectors are mutually perpendicular (orthogonal, $\\theta = 90^\\circ$), casting zero shadow.",
                "ar": "المتجهان متعامدان تماماً (الزاوية $\\theta = 90^\\circ$)، ولا يلقي أحدهما أي ظل على الآخر.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "This confuses the cross product with the dot product! When vectors are orthogonal, the cross product reaches its maximum possible magnitude ($\\sin 90^\\circ = 1$), whereas the dot product becomes zero.",
                "ar": "هذا خلط شائع بين الجداء الاتجاهي والجداء النقطي! عند التعامد يبلغ الجداء الاتجاهي ذروته القصوى ($\\sin 90^\\circ = 1$)، بينما ينعدم الجداء النقطي."
              }
            },
            {
              "text": {
                "en": "One of the vectors must be the zero vector $[0, 0, 0]$.",
                "ar": "أحد المتجهين يجب أن يكون بالضرورة متجهاً صفرياً $[0, 0, 0]$.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The problem statement explicitly specified *non-zero* vectors. Non-zero vectors produce a zero cross product whenever they are parallel.",
                "ar": "نص السؤال حدد بوضوح أنهما متجهان *غير صفريين*. والمتجهات غير الصفرية تعطي جداءً اتجاهياً صفرياً كلما كانت متوازية."
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
    "id": "t1-07",
    "title": "Linear Maps as Space Transformations",
    "titleAr": "التحويلات الخطية كعمليات نقل وتحوير للفضاء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine drawing a neat rectangular grid on a transparent sheet of latex rubber. At the intersection of the main axes, you push a sharp...",
      "ar": "تخيل أنك رسمت شبكة مربعات منتظمة على غشاء شفاف من المطاط المرن. عند نقطة تقاطع المحورين الرئيسيين، قمت بغرس دبوس معدني حاد يثبت نقطة الأصل..."
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
          "en": "Imagine drawing a neat rectangular grid on a transparent sheet of latex rubber. At the intersection of the main axes, you push a sharp metal pin through the sheet into a wooden desk, locking the origin $(0, 0)$ permanently in place. Now, grab the edges of the rubber sheet and deform it. What kinds of physical warping are considered \"linear\"? Linear algebra imposes two strict, non-negotiable physical rules: first, every straight grid line must remain strictly straight; second, all parallel grid lines must stay evenly spaced and parallel. You can stretch the sheet horizontally, squish it vertically, rotate it smoothly around the pin, or slide the top edge horizontally while the bottom stays anchored (a geometric shear). But you can never curve the sheet, bend grid lines into arcs, or pull the origin pin away from $(0, 0)$.\n\nThis geometric rigidity reveals the central miracle of linear algebra: to know where all *infinite* points on the 2D plane land after a transformation, you do not need to calculate or track billions of individual coordinates. You only need to follow what happens to two tiny arrows: the unit basis vectors $\\hat{\\mathbf{i}} = (1, 0)$ and $\\hat{\\mathbf{j}} = (0, 1)$!\n\nWhy is this true? Because every single point in the plane $\\mathbf{x} = (x_1, x_2)$ is physically constructed as a recipe: \"walk $x_1$ steps along $\\hat{\\mathbf{i}}$, then $x_2$ steps along $\\hat{\\mathbf{j}}$.\" Because the rubber sheet deforms linearly without bending or tearing, that exact recipe holds true after the deformation: the new landing location must be $x_1$ steps along the transformed arrow $T(\\hat{\\mathbf{i}})$, plus $x_2$ steps along the transformed arrow $T(\\hat{\\mathbf{j}})$.\n\nThis is what a **matrix** actually is. A matrix is not a dry spreadsheet of numbers meant for memorizing mechanical arithmetic. A matrix $\\mathbf{A} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ is a compact geometric photo album: its first column $\\begin{bmatrix} a \\\\ c \\end{bmatrix}$ records the landing coordinates of the $X$-axis unit arrow $\\hat{\\mathbf{i}}$, and its second column $\\begin{bmatrix} b \\\\ d \\end{bmatrix}$ records the landing coordinates of the $Y$-axis unit arrow $\\hat{\\mathbf{j}}$. Once you record where those two basis arrows land, you hold the destiny of the entire universe of points in the palm of your hand.\n\n---",
          "ar": "تخيل أنك رسمت شبكة مربعات منتظمة على غشاء شفاف من المطاط المرن. عند نقطة تقاطع المحورين الرئيسيين، قمت بغرس دبوس معدني حاد يثبت نقطة الأصل $(0, 0)$ بإحكام في سطح طاولة خشبية. الآن، امسك بأطراف الغشاء المطاطي وحركه لتشويه شكله. ما هي التشويهات الفيزيائية المسموح بها لكي يظل هذا التحويل \"خطياً\"؟ يفرض الجبر الخطي قاعدتين صارمتين لا حياد عنهما: أولاً، يجب أن تظل جميع خطوط الشبكة مستقيمة تماماً دون أي انحناء؛ ثانياً، يجب أن تظل الخطوط المتوازية متوازية ومنتظمة التباعد. يمكنك شد الغشاء أفقياً، أو ضغطه رأسياً، أو تدويره بسلاسة حول الدبوس، أو إمالته جانبياً (قص هندسي Shear)—لكنك لا تستطيع أبداً تجعيد الغشاء، أو ثني خطوطه إلى منحنيات، أو اقتلاع دبوس نقطة الأصل من مكانه.\n\nهذه الصرامة الهندسية تقودنا إلى المعجزة الكبرى في الجبر الخطي: لمعرفة مصير *عدد لا نهائي* من النقاط في المستوى بعد التحويل، لست بحاجة إلى تتبع مليارات الإحداثيات المنفصلة؛ بل يكفيك فقط معرفة أين استقر سهمان صغيران: متجها وحدة الأساس $\\hat{\\mathbf{i}} = (1, 0)$ و $\\hat{\\mathbf{j}} = (0, 1)$!\n\nلماذا تصح هذه المعجزة؟ لأن أي موقع $\\mathbf{x} = (x_1, x_2)$ في المستوى هو في الأصل وصفة حركية: \"سر $x_1$ خطوة باتجاه $\\hat{\\mathbf{i}}$، ثم سر $x_2$ خطوة باتجاه $\\hat{\\mathbf{j}}$.\" وبما أن الغشاء المطاطي يتمدد بشكل خطي منتظم دون تمزق أو انثناء، فإن هذه الوصفة تظل صادقة تماماً بعد التشويه: فالموقع النهائي للنقطة سيكون حتماً $x_1$ خطوة على طول السهم المتحول $T(\\hat{\\mathbf{i}})$ مضافاً إليه $x_2$ خطوة على طول السهم المتحول $T(\\hat{\\mathbf{j}})$.\n\nهذا هو المعنى الحقيقي والعميق لـ **المصفوفة** (Matrix). المصفوفة ليست جدولاً جافاً من الأرقام الصماء لحفظ قواعد الضرب الآلية؛ المصفوفة $\\mathbf{A} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ هي ألبوم صور هندسي موجز: يسجل عمودها الأول $\\begin{bmatrix} a \\\\ c \\end{bmatrix}$ إحداثيات استقرار سهم المحور السيني $\\hat{\\mathbf{i}}$، ويسجل عمودها الثاني $\\begin{bmatrix} b \\\\ d \\end{bmatrix}$ إحداثيات استقرار سهم المحور الصادي $\\hat{\\mathbf{j}}$. وبمجرد معرفة أين هبط هذان السهمان، تصبح قادراً على حساب موقع أي نقطة في الفضاء بلحظة واحدة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "T(\\alpha \\mathbf{u} + \\beta \\mathbf{v}) = \\alpha T(\\mathbf{u}) + \\beta T(\\mathbf{v}), \\quad T(\\mathbf{x}) = \\mathbf{A}\\mathbf{x} = x_1 T(\\mathbf{e}_1) + x_2 T(\\mathbf{e}_2) = \\begin{bmatrix} | & | \\\\ T(\\mathbf{e}_1) & T(\\mathbf{e}_2) \\\\ | & | \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix}",
        "formulaNote": {
          "en": "Mathematical anchor for Linear Maps as Space Transformations.",
          "ar": "المرساة الرياضية لـ التحويلات الخطية كعمليات نقل وتحوير للفضاء."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $T(\\mathbf{x})$ | Linear Transformation | A function mapping vectors from input space to output space while strictly preserving grid geometry. |\n| $T(\\alpha \\mathbf{u} + \\beta \\mathbf{v})$ | Axiom of Linearity | Guarantees two properties: additivity ($T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$) and homogeneity ($T(\\alpha \\mathbf{u}) = \\alpha T(\\mathbf{u})$). |\n| $\\mathbf{e}_1, \\mathbf{e}_2$ | Standard Unit Basis Vectors | The pristine coordinate unit arrows: $\\mathbf{e}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ along $X$, and $\\mathbf{e}_2 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$ along $Y$. |\n| $T(\\mathbf{e}_1), T(\\mathbf{e}_2)$ | Transformed Basis Columns | Where the unit basis arrows land after the space morphs; they literally form the vertical columns of matrix $\\mathbf{A}$. |\n| $\\mathbf{A}\\mathbf{x}$ | Matrix-Vector Product | A weighted linear combination of the columns of $\\mathbf{A}$, where each column is scaled by the corresponding coordinate $x_i$. |\n\n##### Why the Math Works Step-by-Step\n1. **Why does tracking basis vectors determine the transformation of everything?**\n   Every vector $\\mathbf{x} \\in \\mathbb{R}^2$ can be uniquely written as $\\mathbf{x} = x_1 \\mathbf{e}_1 + x_2 \\mathbf{e}_2$. Applying transformation $T$ and invoking linearity yields:\n   $$T(\\mathbf{x}) = T(x_1 \\mathbf{e}_1 + x_2 \\mathbf{e}_2) = x_1 T(\\mathbf{e}_1) + x_2 T(\\mathbf{e}_2)$$\n   Because $x_1$ and $x_2$ are plain scalar numbers, they pull right outside the operator! This proves that once you know the landing vectors $T(\\mathbf{e}_1)$ and $T(\\mathbf{e}_2)$, calculating $T(\\mathbf{x})$ for any point is purely a weighted combination of those two columns.\n2. **Why must a linear transformation always map origin to origin ($T(\\mathbf{0}) = \\mathbf{0}$)?**\n   By the homogeneity property of linearity, choose scalar $\\alpha = 0$:\n   $$T(\\mathbf{0}) = T(0 \\cdot \\mathbf{v}) = 0 \\cdot T(\\mathbf{v}) = \\mathbf{0}$$\n   If a mapping shifts the origin to a non-zero position ($T(\\mathbf{0}) \\ne \\mathbf{0}$), it violates homogeneity and is an affine translation, not a pure linear transformation.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $T(\\mathbf{x})$ | التحويل الخطي | دالة هندسية تنقل المتجهات من فضاء لآخر مع الحفاظ الصارم على استقامة وتوازي شبكة الفضاء. |\n| $T(\\alpha \\mathbf{u} + \\beta \\mathbf{v})$ | بديهية الخطية الرياضية | تضمن خاصيتين: قابلية الجمع ($T(\\mathbf{u}+\\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$) والتجانس القياسي ($T(\\alpha \\mathbf{u}) = \\alpha T(\\mathbf{u})$). |\n| $\\mathbf{e}_1, \\mathbf{e}_2$ | متجهات الأساس المعياري | أسهم الوحدة الأصلية قبل التحويل: $\\mathbf{e}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ على المحور السيني، و $\\mathbf{e}_2 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$ على الصادي. |\n| $T(\\mathbf{e}_1), T(\\mathbf{e}_2)$ | أعمدة الأساس المتحولة | مواقع استقرار أسهم الوحدة بعد التحويل؛ وتشكل هذه المتجهات الأعمدة الرأسية الصريحة للمصفوفة $\\mathbf{A}$. |\n| $\\mathbf{A}\\mathbf{x}$ | جداء مصفوفة في متجه | تركيب خطي موزون لأعمدة المصفوفة $\\mathbf{A}$، حيث يُضرب كل عمود في المركبة الإحداثية المقابلة له من المتجه $\\mathbf{x}$. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا يحدد مصير أسهم الأساس مصير كافة نقاط الفضاء؟**\n   يمكن التعبير عن أي متجه $\\mathbf{x} \\in \\mathbb{R}^2$ كتركيب خطي فريد: $\\mathbf{x} = x_1 \\mathbf{e}_1 + x_2 \\mathbf{e}_2$. وبتطبيق خاصية الخطية على التحويل $T$:\n   $$T(\\mathbf{x}) = T(x_1 \\mathbf{e}_1 + x_2 \\mathbf{e}_2) = x_1 T(\\mathbf{e}_1) + x_2 T(\\mathbf{e}_2)$$\n   تخرج الأرقام القياسية $x_1$ و $x_2$ خارج التحويل بكل سلاسة! هذا يبرهن أنه بمجرد معرفة عمودي المصفوفة $T(\\mathbf{e}_1)$ و $T(\\mathbf{e}_2)$، تصبح معرفة مصير أي نقطة مجرد ضرب وجمع مباشرين لهذين العمودين.\n2. **لماذا يجب أن تبقى نقطة الأصل ثابتة دائماً ($T(\\mathbf{0}) = \\mathbf{0}$)؟**\n   من خاصية التجانس القياسي للتحويل الخطي، باختيار المعامل $\\alpha = 0$:\n   $$T(\\mathbf{0}) = T(0 \\cdot \\mathbf{v}) = 0 \\cdot T(\\mathbf{v}) = \\mathbf{0}$$\n   فإذا تسببت أي دالة في إزاحة نقطة الأصل عن موضعها ($T(\\mathbf{0}) \\ne \\mathbf{0}$)، فإنها تفقد خاصية الخطية وتصبح إزاحة تآلفية وليست تحويلاً خطياً صرفاً."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-07",
          "starterCode": "def apply_linear_transform(A: np.ndarray, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Apply linear transformation matrix A to vector x.\n\n    Intuition\n    ---------\n    Multiplying matrix A by vector x computes a linear combination of the\n    columns of A, weighted by the coordinate components of x. Each column of\n    A represents the transformed landing position of a unit basis vector.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Transformation matrix whose columns represent transformed basis vectors.\n    x : np.ndarray of shape (N,)\n        Input coordinate vector.\n\n    Returns\n    -------\n    np.ndarray of shape (M,)\n        Transformed coordinate vector Ax.\n\n    Raises\n    ------\n    ValueError\n        If the inner dimensions do not match (A.shape[1] != len(x)).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def apply_linear_transform(A: np.ndarray, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Apply linear transformation matrix A to vector x.\n\n    Intuition\n    ---------\n    Multiplying matrix A by vector x computes a linear combination of the\n    columns of A, weighted by the coordinate components of x. Each column of\n    A represents the transformed landing position of a unit basis vector.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Transformation matrix whose columns represent transformed basis vectors.\n    x : np.ndarray of shape (N,)\n        Input coordinate vector.\n\n    Returns\n    -------\n    np.ndarray of shape (M,)\n        Transformed coordinate vector Ax.\n\n    Raises\n    ------\n    ValueError\n        If the inner dimensions do not match (A.shape[1] != len(x)).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "array([2., 3.])"
            }
          },
          "solution": "import numpy as np\n\ndef apply_linear_transform(A: np.ndarray, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Apply linear transformation matrix A to vector x.\n\n    Intuition\n    ---------\n    Multiplying matrix A by vector x computes a linear combination of the\n    columns of A, weighted by the coordinate components of x. Each column of\n    A represents the transformed landing position of a unit basis vector.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Transformation matrix whose columns represent transformed basis vectors.\n    x : np.ndarray of shape (N,)\n        Input coordinate vector.\n\n    Returns\n    -------\n    np.ndarray of shape (M,)\n        Transformed coordinate vector Ax.\n\n    Raises\n    ------\n    ValueError\n        If the inner dimensions do not match (A.shape[1] != len(x)).\n    \"\"\"\n    # Step 1: Validate dimension compatibility between matrix columns and vector length\n    # if A.shape[1] != len(x):\n    #     raise ValueError(f\"Incompatible shapes: Matrix {A.shape} and Vector {x.shape}\")\n\n    # Step 2: Compute matrix-vector product Ax (linear combination of columns)\n    # result = np.matmul(A, x)\n\n    # Step 3: Return the transformed coordinate vector\n    # return result\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
                "en": "Translating the entire plane by a fixed non-zero vector $\\mathbf{b}$: $T(\\mathbf{x}) = \\mathbf{x} + \\mathbf{b}$.",
                "ar": "إزاحة المستوى بأكمله بمقدار متجه ثابت غير صفري $\\mathbf{b}$: أي $T(\\mathbf{x}) = \\mathbf{x} + \\mathbf{b}$.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "A fundamental invariant of any linear transformation is that it must fix the origin: $T(\\mathbf{0}) = T(0 \\cdot \\mathbf{x}) = 0 \\cdot T(\\mathbf{x}) = \\mathbf{0}$. Translation moves the origin to $\\mathbf{b} \\ne \\mathbf{0}$ and violates additivity: $T(\\mathbf{u} + \\mathbf{v}) = \\mathbf{u} + \\mathbf{v} + \\mathbf{b} \\ne (\\mathbf{u} + \\mathbf{b}) + (\\mathbf{v} + \\mathbf{b})$. Hence, spatial translation is an affine map, not a pure linear map.",
                "ar": "من الثوابت الأساسية لأي تحويل خطي بقاء نقطة الأصل ثابتة: $T(\\mathbf{0}) = \\mathbf{0}$. الإزاحة المكانية تنقل نقطة الأصل إلى $\\mathbf{b} \\ne \\mathbf{0}$ وتخل بشرط الجمع: $T(\\mathbf{u} + \\mathbf{v}) = \\mathbf{u} + \\mathbf{v} + \\mathbf{b} \\ne (\\mathbf{u} + \\mathbf{b}) + (\\mathbf{v} + \\mathbf{b})$. لذلك، الإزاحة هي تحويل تآلفي (Affine) وليست تحويلاً خطياً صرفاً."
              }
            },
            {
              "text": {
                "en": "Rotating the plane by $45^\\circ$ counterclockwise about the origin.",
                "ar": "تدوير المستوى بزاوية $45^\\circ$ عكس عقارب الساعة حول نقطة الأصل.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Pure rotation about the origin keeps the origin pinned at $(0, 0)$ and preserves straight parallel grid lines; it is an orthogonal linear map represented by a rotation matrix.",
                "ar": "الدوران الصافي حول نقطة الأصل يبقي نقطة الأصل ثابتة في موضعها ويحافظ على استقامة وتوازي خطوط الشبكة؛ وهو تحويل خطي متعامد تماماً."
              }
            },
            {
              "text": {
                "en": "Shearing the plane horizontally such that points higher up slide farther to the right: $T(x, y) = (x + 2y, y)$.",
                "ar": "قص المستوى أفقياً (Shear) بحيث تنزلق النقاط الأعلى مسافة أكبر لليمين: $T(x, y) = (x + 2y, y)$.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Shearing keeps the origin fixed and preserves straight lines and parallelism; it is represented by matrix $\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$, which is a completely valid linear map.",
                "ar": "تحويل القص يحافظ على ثبات نقطة الأصل واستقامة وتوازي الخطوط، وتمثله المصفوفة $\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$ وهو تحويل خطي صحيح تماماً."
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
    "id": "t1-08",
    "title": "Matrix Multiplication as Composition of Transformations",
    "titleAr": "ضرب المصفوفات كتركيب متتالٍ للتحويلات",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Consider getting dressed in the morning. If you put on your socks first and then put on your shoes, your day proceeds comfortably and...",
      "ar": "تأمل روتينك الصباحي عند ارتداء ملابسك. إذا ارتديت جواربك أولاً ثم انتعلت حذاءك، ستبدأ يومك براحة وثقة طبيعية."
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
          "en": "Consider getting dressed in the morning. If you put on your socks first and then put on your shoes, your day proceeds comfortably and normally. But what if you reverse the sequence: putting on your heavy winter boots first, and then trying to stretch your socks over the outside of the boots? The two individual actions are identical, but the final physical reality is radically different—even absurd. The order in which you apply consecutive actions in the physical world matters profoundly.\n\nIn standard introductory algebra, students are introduced to matrix multiplication as a bizarre, tedious clerical ritual: \"take row 1 of the left matrix, multiply element-by-element with column 1 of the right matrix, add the products, write it in entry $(1, 1)$, and repeat this dance dozens of times.\" Why on earth would anyone invent such an awkward rule? Why not just multiply corresponding entries like we do when adding matrices?\n\nThe answer is breathtakingly simple: **matrix multiplication is the composition of successive geometric space transformations**. Imagine you have a 3D model of an airplane. First, you want to rotate it $90^\\circ$ to bank into a turn (governed by transformation matrix $\\mathbf{A}$). Second, you want to stretch the fuselage to double its length (governed by matrix $\\mathbf{B}$). Applying the first transform turns point $\\mathbf{x}$ into $\\mathbf{A}\\mathbf{x}$. Applying the second transform to that result gives $\\mathbf{B}(\\mathbf{A}\\mathbf{x})$.\n\nInstead of transforming millions of vertices in two separate computational passes, can we find a single master matrix $\\mathbf{C}$ that executes both steps simultaneously in one go: $\\mathbf{C}\\mathbf{x} = \\mathbf{B}(\\mathbf{A}\\mathbf{x})$? Yes! That master matrix is the product $\\mathbf{C} = \\mathbf{B}\\mathbf{A}$. The row-by-column formula is not an arbitrary human invention; it is the unique algebraic consequence of tracking where the coordinate axes land after two consecutive geometric deformations.\n\nThis geometric reality immediately dissolves the greatest mystery of linear algebra: why is matrix multiplication non-commutative ($\\mathbf{B}\\mathbf{A} \\ne \\mathbf{A}\\mathbf{B}$)? If you take a smartphone, rotate it $90^\\circ$ clockwise, and then flip it upside down, it lands in a completely different physical orientation than if you flipped it upside down first and then rotated it. The universe itself is non-commutative; matrix multiplication simply mirrors this fundamental physical truth.\n\n---",
          "ar": "تأمل روتينك الصباحي عند ارتداء ملابسك. إذا ارتديت جواربك أولاً ثم انتعلت حذاءك، ستبدأ يومك براحة وثقة طبيعية. ولكن ماذا لو عكست ترتيب الخطوتين: انتعلت حذاءك الشتوي الثقيل أولاً، ثم حاولت شد الجوارب فوق الحذاء من الخارج؟ الفعلان المنفردان هما نفس الفعلان تماماً، لكن النتيجة الفيزيائية النهائية مختلفة جذرياً ومضحكة! ترتيب الأفعال المتتالية في العالم الواقعي يغير مصير النتائج تماماً.\n\nفي فصول الرياضيات التقليدية، يُقدَّم ضرب المصفوفات للطلاب كطقس حسابي جاف ومربك: \"خذ الصف الأول من المصفوفة الأولى، واضربه عنصراً بعنصر في العمود الأول من المصفوفة الثانية، واجمع النواتج وضعها في الخانة $(1, 1)$، ثم كرر هذه العملية عشرات المرات.\" لماذا ابتكر العلماء هذه القاعدة الغريبة أصلاً؟ لماذا لم نضرب العناصر المتناظرة ببعضها مباشرة كما نفعل في جمع المصفوفات؟\n\nالإجابة تنبض بالجمال الهندسي: **ضرب المصفوفات هو التركيب الهندسي المتتالي للتحويلات المكانية**. تخيل أنك تصمم نموذجاً ثلاثي الأبعاد لطائرة في لعبة فيديو. أولاً، تريد تدوير الطائرة بزاوية $90^\\circ$ للالتفاف (عبر مصفوفة التدوير $\\mathbf{A}$). ثانياً، تريد مد هيكل الطائرة لمضاعفة طوله (عبر مصفوفة الشد $\\mathbf{B}$). تطبيق التحويل الأول على نقطة $\\mathbf{x}$ يحولها إلى $\\mathbf{A}\\mathbf{x}$، ثم تطبيق التحويل الثاني على تلك النتيجة يعطي $\\mathbf{B}(\\mathbf{A}\\mathbf{x})$.\n\nبدلاً من تحويل ملايين النقاط في الطائرة على مرحلتين منفصلتين ومكلفتين حاسوبياً، هل يمكننا إيجاد مصفوفة رئيسية واحدة $\\mathbf{C}$ تدمج الخطوتين وتنفذهما في ضربة واحدة: $\\mathbf{C}\\mathbf{x} = \\mathbf{B}(\\mathbf{A}\\mathbf{x})$؟ نعم بالتأكيد! تلك المصفوفة الشاملة هي حاصل الضرب $\\mathbf{C} = \\mathbf{B}\\mathbf{A}$. فقاعدة \"الصف في العمود\" ليست اختراعاً بشرياً اعتباطياً، بل هي النتيجة الجبرية الحتمية والوحيدة لتتبع أين هبطت محاور الفضاء بعد حركتين هندسيتين متعاقبتين.\n\nهذه الرؤية الهندسية تبدد على الفور أكبر ألغاز الجبر الخطي: لماذا لا يكون ضرب المصفوفات تبادلياً ($\\mathbf{B}\\mathbf{A} \\ne \\mathbf{A}\\mathbf{B}$)؟ إذا أمسكت بهاتفك المحمول ودورته $90^\\circ$ باتجاه عقارب الساعة ثم قلبته رأساً على عقب، فسيستقر في وضع فيزيائي مختلف تماماً عما لو قلبته أولاً ثم دورته ثانياً. هندسة الكون فيزيائياً غير تبادلية، وضرب المصفوفات ليس سوى مرآة رياضية تعكس هذه الحقيقة الكونية بدقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "(\\mathbf{B}\\mathbf{A})\\mathbf{x} = \\mathbf{B}(\\mathbf{A}\\mathbf{x}), \\quad (\\mathbf{B}\\mathbf{A})_{ij} = \\sum_{k=1}^m B_{ik} A_{kj}",
        "formulaNote": {
          "en": "Mathematical anchor for Matrix Multiplication as Composition of Transformations.",
          "ar": "المرساة الرياضية لـ ضرب المصفوفات كتركيب متتالٍ للتحويلات."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{B}\\mathbf{A}$ | Matrix Product (Composite Map) | A single combined transformation matrix that executes the action of $\\mathbf{A}$ followed by $\\mathbf{B}$. |\n| $(\\mathbf{B}\\mathbf{A})\\mathbf{x}$ | Right-to-Left Action Flow | Read like function composition: $\\mathbf{x}$ enters $\\mathbf{A}$ first; the resulting output vector is then fed into $\\mathbf{B}$. |\n| $(\\mathbf{B}\\mathbf{A})_{ij}$ | Element at Row $i$, Column $j$ | The landing coordinate on axis $i$ when basis vector $\\mathbf{e}_j$ undergoes both consecutive transformations. |\n| $\\sum_{k=1}^m B_{ik} A_{kj}$ | Row-Column Inner Product | The dot product between Row $i$ of the left matrix $\\mathbf{B}$ and Column $j$ of the right matrix $\\mathbf{A}$. |\n| $\\mathbf{A}\\mathbf{B} \\ne \\mathbf{B}\\mathbf{A}$ | Non-Commutativity | Applying geometric actions in reverse chronological order alters the physical orientation of space. |\n\n##### Why the Math Works Step-by-Step\n1. **Why does the formula use the dot product of Row $i$ of $\\mathbf{B}$ with Column $j$ of $\\mathbf{A}$?**\n   Let $\\mathbf{e}_j$ be the $j$-th standard basis vector. When first transform $\\mathbf{A}$ acts on $\\mathbf{e}_j$, it produces the $j$-th column of $\\mathbf{A}$, which we denote $\\mathbf{A}_{:, j}$.\n   Now, apply the second transformation $\\mathbf{B}$ to this transformed vector. By the definition of matrix-vector multiplication:\n   $$\\text{Output} = \\mathbf{B} \\cdot \\mathbf{A}_{:, j}$$\n   The $i$-th coordinate of this output vector is precisely the dot product of Row $i$ of $\\mathbf{B}$ with the column $\\mathbf{A}_{:, j}$:\n   $$(\\mathbf{B}\\mathbf{A})_{ij} = \\sum_{k=1}^m B_{ik} A_{kj}$$\n   The mechanical \"row-times-column\" rule is not arbitrary; it is the direct mathematical tracking of basis vectors passing through two successive linear transformations!\n2. **Why is matrix multiplication associative ($(\\mathbf{C}\\mathbf{B})\\mathbf{A} = \\mathbf{C}(\\mathbf{B}\\mathbf{A})$)?**\n   Function composition is naturally associative: applying three sequential steps $A$, then $B$, then $C$ produces the same final result whether you package $(A \\text{ and } B)$ first, or package $(B \\text{ and } C)$ first.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{B}\\mathbf{A}$ | حاصل ضرب المصفوفتين | مصفوفة التحويل المركبة الموحدة التي تنفذ التحويل $\\mathbf{A}$ متبوعاً بالتحويل $\\mathbf{B}$ في خطوة واحدة. |\n| $(\\mathbf{B}\\mathbf{A})\\mathbf{x}$ | مسار التطبيق من اليمين لليسار | مثل تركيب الدوال: يدخل المتجه $\\mathbf{x}$ أولاً في التحويل $\\mathbf{A}$، ثم يدخل الناتج في التحويل $\\mathbf{B}$. |\n| $(\\mathbf{B}\\mathbf{A})_{ij}$ | العنصر في الصف $i$ والعمود $j$ | الإحداثي على المحور $i$ عند هبوط سهم الأساس $\\mathbf{e}_j$ بعد خضوعه للتحويلين المتعاقبين معاً. |\n| $\\sum_{k=1}^m B_{ik} A_{kj}$ | الجداء الداخلي للصف والعمود | حاصل الضرب النقطي بين الصف $i$ من المصفوفة اليسرى $\\mathbf{B}$ والعمود $j$ من المصفوفة اليمنى $\\mathbf{A}$. |\n| $\\mathbf{A}\\mathbf{B} \\ne \\mathbf{B}\\mathbf{A}$ | انعدام الخاصية التبادلية | تطبيق الحركات الهندسية بترتيب زمني معكوس يغير التوجيه الفيزيائي النهائي للمجسمات تماماً. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا نضرب الصف $i$ من $\\mathbf{B}$ في العمود $j$ من $\\mathbf{A}$؟**\n   ليكن $\\mathbf{e}_j$ هو متجه وحدة الأساس رقم $j$. عندما يؤثر التحويل الأول $\\mathbf{A}$ على $\\mathbf{e}_j$ فإنه ينتج العمود رقم $j$ من المصفوفة $\\mathbf{A}$، ونرمز له بـ $\\mathbf{A}_{:, j}$.\n   الآن، يدخل هذا المتجه الناتج في التحويل الثاني $\\mathbf{B}$. بحسب تعريف ضرب المصفوفة في متجه:\n   $$\\text{المخرجات} = \\mathbf{B} \\cdot \\mathbf{A}_{:, j}$$\n   والمركبة رقم $i$ لهذا المتجه الناتج هي بالضبط حاصل الضرب النقطي للصف $i$ من $\\mathbf{B}$ في العمود $\\mathbf{A}_{:, j}$:\n   $$(\\mathbf{B}\\mathbf{A})_{ij} = \\sum_{k=1}^m B_{ik} A_{kj}$$\n   فقاعدة \"الصف في العمود\" ليست لغزاً، بل هي الترجمة الرياضية الحرفية لتتبع سهم الأساس عبر مرحلتي التحويل!\n2. **لماذا يكون ضرب المصفوفات تجميعياً ($(\\mathbf{C}\\mathbf{B})\\mathbf{A} = \\mathbf{C}(\\mathbf{B}\\mathbf{A})$)؟**\n   لأن تركيب العمليات متتالية زمنياً تجميعي بطبيعته: تطبيق العمليات الثلاث المتعاقبة $A$ ثم $B$ ثم $C$ يعطي نفس النتيجة سواء دمجت الخطوتين الأولى والثانية أولاً، أو دمجت الخطوتين الثانية والثالثة أولاً."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-08",
          "starterCode": "def compose_transformations(B: np.ndarray, A: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute composite transformation matrix C = B @ A.\n\n    Intuition\n    ---------\n    Matrix multiplication composes two successive linear transformations.\n    Transform A is applied first, followed by transform B. The resulting\n    composite matrix C carries out both actions simultaneously, with each\n    entry C[i, j] representing the dot product of Row i of B with Column j of A.\n\n    Parameters\n    ----------\n    B : np.ndarray of shape (L, M)\n        Second transformation matrix applied.\n    A : np.ndarray of shape (M, N)\n        First transformation matrix applied.\n\n    Returns\n    -------\n    np.ndarray of shape (L, N)\n        Composite transformation matrix C = B @ A.\n\n    Raises\n    ------\n    ValueError\n        If the inner dimensions do not match (B.shape[1] != A.shape[0]).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def compose_transformations(B: np.ndarray, A: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute composite transformation matrix C = B @ A.\n\n    Intuition\n    ---------\n    Matrix multiplication composes two successive linear transformations.\n    Transform A is applied first, followed by transform B. The resulting\n    composite matrix C carries out both actions simultaneously, with each\n    entry C[i, j] representing the dot product of Row i of B with Column j of A.\n\n    Parameters\n    ----------\n    B : np.ndarray of shape (L, M)\n        Second transformation matrix applied.\n    A : np.ndarray of shape (M, N)\n        First transformation matrix applied.\n\n    Returns\n    -------\n    np.ndarray of shape (L, N)\n        Composite transformation matrix C = B @ A.\n\n    Raises\n    ------\n    ValueError\n        If the inner dimensions do not match (B.shape[1] != A.shape[0]).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "array([[1., 2.],\n       [3., 4.]])"
            }
          },
          "solution": "import numpy as np\n\ndef compose_transformations(B: np.ndarray, A: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Compute composite transformation matrix C = B @ A.\n\n    Intuition\n    ---------\n    Matrix multiplication composes two successive linear transformations.\n    Transform A is applied first, followed by transform B. The resulting\n    composite matrix C carries out both actions simultaneously, with each\n    entry C[i, j] representing the dot product of Row i of B with Column j of A.\n\n    Parameters\n    ----------\n    B : np.ndarray of shape (L, M)\n        Second transformation matrix applied.\n    A : np.ndarray of shape (M, N)\n        First transformation matrix applied.\n\n    Returns\n    -------\n    np.ndarray of shape (L, N)\n        Composite transformation matrix C = B @ A.\n\n    Raises\n    ------\n    ValueError\n        If the inner dimensions do not match (B.shape[1] != A.shape[0]).\n    \"\"\"\n    # Step 1: Validate inner dimension compatibility (B.shape[1] == A.shape[0])\n    # if B.shape[1] != A.shape[0]:\n    #     raise ValueError(f\"Inner dimension mismatch: {B.shape} and {A.shape}\")\n\n    # Step 2: Compute composite matrix product via matrix multiplication\n    # C = np.matmul(B, A)\n\n    # Step 3: Return the composite transformation matrix\n    # return C\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "Let $\\mathbf{R}$ be a matrix that rotates 2D space by $90^\\circ$ counterclockwise, and let $\\mathbf{S}$ be a matrix that scales horizontal $x$-coordinates by $3\\times$ while leaving vertical $y$-coordinates untouched. Geometrically, why is $\\mathbf{R}\\mathbf{S}$ strictly not equal to $\\mathbf{S}\\mathbf{R}$?",
            "ar": "لتكن $\\mathbf{R}$ مصفوفة تدور الفضاء ثنائي الأبعاد بـ $90^\\circ$ عكس عقارب الساعة، ولتكن $\\mathbf{S}$ مصفوفة تمدد الإحداثي السيني الأفقي بمقدار 3 أضعاف دون تغيير الإحداثي الصادي الرأسي. هندسياً، لماذا لا تتساوى $\\mathbf{R}\\mathbf{S}$ مع $\\mathbf{S}\\mathbf{R}$ قطعاً؟"
          },
          "options": [
            {
              "text": {
                "en": "$\\mathbf{R}\\mathbf{S}$ scales the horizontal axis first and then rotates that elongated axis into the vertical position, whereas $\\mathbf{S}\\mathbf{R}$ rotates the original vertical axis into the horizontal position before scaling it.",
                "ar": "تقوم $\\mathbf{R}\\mathbf{S}$ بمد المحور الأفقي أولاً ثم تدوير هذا المحور الممدود ليصبح رأسياً، بينما تقوم $\\mathbf{S}\\mathbf{R}$ بتدوير المحور الرأسي الأصلي ليصبح أفقياً قبل مده.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Applying $\\mathbf{S}$ first stretches along the $x$-axis; rotating by $\\mathbf{R}$ then places the elongated axis along the vertical $y$-direction. Applying $\\mathbf{R}$ first rotates the axes; stretching by $\\mathbf{S}$ then elongates whatever is currently on the $x$-axis (which was originally the negative $y$-axis). The resulting spatial geometries are completely different.",
                "ar": "تطبيق $\\mathbf{S}$ أولاً يمد المحور السيني، ثم يؤدي التدوير بـ $\\mathbf{R}$ إلى نقل هذا المحور الممدود ليصبح رأسياً على محور الصادات. أما تطبيق $\\mathbf{R}$ أولاً فيدور المحاور، ثم يقوم $\\mathbf{S}$ بمد ما استقر على المحور السيني. النتيجة الهندسية تختلف جذرياً في الفضاء."
              }
            },
            {
              "text": {
                "en": "Matrix multiplication is associative, which mathematically guarantees that $\\mathbf{R}\\mathbf{S}$ must equal $\\mathbf{S}\\mathbf{R}$.",
                "ar": "ضرب المصفوفات تجميعي، مما يضمن رياضياً بالضرورة أن $\\mathbf{R}\\mathbf{S}$ تساوي $\\mathbf{S}\\mathbf{R}$.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "This confuses associativity ($(\\mathbf{A}\\mathbf{B})\\mathbf{C} = \\mathbf{A}(\\mathbf{B}\\mathbf{C})$) with commutativity ($\\mathbf{A}\\mathbf{B} = \\mathbf{B}\\mathbf{A}$). Matrices are associative, but NOT commutative.",
                "ar": "هذا خلط شائع بين التجميعية ($(\\mathbf{A}\\mathbf{B})\\mathbf{C} = \\mathbf{A}(\\mathbf{B}\\mathbf{C})$) والتبادلية ($\\mathbf{A}\\mathbf{B} = \\mathbf{B}\\mathbf{A}$). ضرب المصفوفات تجميعي دائماً ولكنه ليس تبادلياً."
              }
            },
            {
              "text": {
                "en": "Because rotating by $90^\\circ$ inverts the determinant to a negative value.",
                "ar": "لأن التدوير بـ $90^\\circ$ يقلب المحدد إلى قيمة سالبة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A pure 2D rotation matrix has a determinant of $+1$ (orientation and area are strictly preserved), not negative.",
                "ar": "محدد مصفوفة التدوير الصافي في بعدين هو $+1$ (يحافظ على المساحة والاتجاهية)، وليس سالباً أبداً."
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
    "id": "t1-09",
    "title": "The Determinant as Area/Volume Scaling Factor",
    "titleAr": "المحدد كمعامل تمدد للمساحات والحجوم",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine holding a soft cube of baker's dough that measures exactly $1 \\times 1 \\times 1$ centimeter.",
      "ar": "تخيل أنك تحمل بين يديك مكعباً صغيراً من عجين الخبز الطري أبعاده $1 \\times 1 \\times 1$ سنتيمتر؛ حجمه الفيزيائي يساوي سنتيمتراً مكعباً واحداً..."
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
          "en": "Imagine holding a soft cube of baker's dough that measures exactly $1 \\times 1 \\times 1$ centimeter. Its physical volume is precisely 1 cubic centimeter. Now, press the dough between your palms, rolling and stretching it uniformly until it grows into a loaf measuring 2 centimeters wide, 3 centimeters long, and 1 centimeter high. The new volume is $2 \\times 3 \\times 1 = 6$ cubic centimeters. Every single cubic millimeter of air or dough inside that shape was scaled by a factor of 6. That exact scaling multiplier—the factor by which space expands, shrinks, or collapses under a transformation—is the geometric **determinant**.\n\nThe determinant is not an arbitrary formula manufactured by mathematicians to torture students on algebra exams. It is the universal geometric **volume scaling factor** of a linear transformation. If a $2 \\times 2$ matrix has $\\det(\\mathbf{A}) = 3$, it means that *any* shape drawn on the 2D plane—a circle, a leaf, an image of a cat, or an entire continent—will have its surface area strictly tripled when transformed by $\\mathbf{A}$. If $\\det(\\mathbf{A}) = 0.5$, all areas shrink by half.\n\nWhat if the determinant is negative? Take a latex surgical glove from your right hand and peel it off inside-out. The glove now fits onto your left hand! Its physical volume has not vanished, but its spatial **orientation** (handedness) has been flipped. A negative determinant, such as $\\det(\\mathbf{A}) = -2$, means two distinct things: first, the surface area has doubled ($|-2| = 2$); second, the space was reflected across an axis, turning a right-handed coordinate frame into a left-handed one.\n\nAnd what happens if $\\det(\\mathbf{A}) = 0$? This is the ultimate catastrophic collapse. Think of a 3D hand casting a flat silhouette shadow onto a bedroom wall: the 3D hand possesses real volume, but the flat 2D shadow has a 3D volume of strictly zero! When $\\det(\\mathbf{A}) = 0$, the matrix has completely squashed the space into a lower dimension—squashing a 2D plane onto a 1D line, or crushing a 3D room onto a flat sheet. When space is flattened, millions of different input points are squished into the exact same output location. You cannot un-squash a flattened shadow back into its original 3D form, which is why a matrix with zero determinant can **never be inverted**.\n\n---",
          "ar": "تخيل أنك تحمل بين يديك مكعباً صغيراً من عجين الخبز الطري أبعاده $1 \\times 1 \\times 1$ سنتيمتر؛ حجمه الفيزيائي يساوي سنتيمتراً مكعباً واحداً بالضبط. قمت الآن بضغط هذا العجين ومده بين راحتيك حتى تحول إلى قطعة مستطيلة أبعادها سنتيمتران عرضاً و3 سنتيمترات طولاً وسنتيمتر واحد ارتفاعاً. الحجم الجديد أصبح $2 \\times 3 \\times 1 = 6$ سنتيمترات مكعبة. تضاعف حجم كل ذرة طحين وكل فقاعة هواء داخل العجين بمقدار 6 أضعاف بالضبط. هذا المعامل الهندسي الدقيق—الذي يحدد كم تمدد الفضاء، أو تقلص، أو انهار تحت تأثير التحويل—هو ما نسميه **المحدد** (Determinant).\n\nالمحدد ليس معادلة جافة أو لغزاً تعجيزياً ابتكره علماء الجبر؛ بل هو **معامل التمدد الحجمي** الحقيقي لأي تحويل خطي. إذا كانت مصفوفة ثنائية الأبعاد تمتلك محدداً $\\det(\\mathbf{A}) = 3$، فهذا يعني أن مساحة *أي* شكل هندسي مرسوم على ذلك المستوى—سواء كان دائرة، أو ورقة شجر، أو صورة قطة، أو خريطة قارة بأكملها—ستتضاعف مساحته السطحية 3 مرات بالضبط بعد التحويل. وإذا كان $\\det(\\mathbf{A}) = 0.5$، فإن المساحات تنكمش إلى النصف.\n\nماذا يعني أن يكون المحدد سالباً؟ انزع قفازاً مطاطياً من يدك اليمنى واقلبه من الداخل للخارج؛ ستلاحظ أن القفاز أصبح يلائم يدك اليسرى تماماً! حجم القفاز لم يختفِ، لكن **اتجاهيته** الفضائية (Handedness) انقلبت كانعكاس المرآة. المحدد السالب، مثل $\\det(\\mathbf{A}) = -2$، يخبرنا بأمرين فيزيائيين معاً: أولاً، تضاعفت المساحة مرتين ($|-2| = 2$)؛ ثانياً، قُلبت محاور الفضاء كانعكاس في المرآة، فتحول نظام الإحداثيات اليميني إلى يساري.\n\nوماذا لو كان $\\det(\\mathbf{A}) = 0$؟ هنا تحدث الكارثة الهندسية الكبرى: الانهيار البُعدي التام! تخيل يدك ثلاثية الأبعاد وهي تلقي ظلاً مسطحاً على جدار الغرفة؛ يدك تمتلك حجماً ثلاثي الأبعاد حقيقياً، لكن ظلها على الجدار المسطح يمتلك حجماً ثلاثي الأبعاد صفرياً تماماً! عندما يكون محدد المصفوفة صفراً، فهذا يعني أن التحويل قد سحق الفضاء بالكامل وضغطه في بعد أدنى—كأن يسحق مستوى ثنائي الأبعاد ليصبح مجرد خط مستقيم، أو يسحق غرفة ثلاثية الأبعاد لتصبح ورقة مسطحة. وعندما يُسحق الفضاء، تنطبق مليارات النقاط المختلفة فوق بعضها البعض. ومن المستحيل رياضياً إعادة نفخ الظل المسطح ليعود مجسماً ثلاثي الأبعاد، ولذلك فإن أي مصفوفة محددها صفر **يستحيل قلبها** (Non-invertible)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\det(\\mathbf{A}) \\coloneqq \\frac{\\operatorname{Area}(T(S))}{\\operatorname{Area}(S)}, \\quad \\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc",
        "formulaNote": {
          "en": "Mathematical anchor for The Determinant as Area/Volume Scaling Factor.",
          "ar": "المرساة الرياضية لـ المحدد كمعامل تمدد للمساحات والحجوم."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\det(\\mathbf{A})$ | Matrix Determinant | The signed hypervolume magnification factor of the linear space transformation. |\n| $\\operatorname{Area}(T(S))$ | Transformed Area | The surface area of any arbitrary 2D geometric shape $S$ after transformation by matrix $\\mathbf{A}$. |\n| $\\operatorname{Area}(S)$ | Original Reference Area | The original surface area of shape $S$ prior to applying the linear transformation. |\n| $ad$ | Main Diagonal Product | The area of the large outer bounding box formed by the principal components of the transformed basis vectors. |\n| $- bc$ | Off-Diagonal Shear Correction | The area subtracted from the outer bounding box to strip away the corner triangles and isolate the parallelogram. |\n| $\\det(\\mathbf{A}) = 0$ | Singularity Condition | Signals dimensional collapse (rank deficiency): the transformation squashes space, destroying invertibility. |\n\n##### Why the Math Works Step-by-Step\n1. **Why is the 2D formula precisely $ad - bc$?**\n   Consider the pristine unit square spanned by standard basis vectors $\\mathbf{e}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ and $\\mathbf{e}_2 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$, with area $1 \\times 1 = 1$.\n   Under transformation $\\mathbf{A} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, these basis vectors land at $\\begin{bmatrix} a \\\\ c \\end{bmatrix}$ and $\\begin{bmatrix} b \\\\ d \\end{bmatrix}$, forming a tilted parallelogram.\n   Enclose this parallelogram inside a large outer rectangle of width $(a + b)$ and height $(c + d)$. The total area of this rectangle is $(a + b)(c + d) = ac + ad + bc + bd$.\n   Now subtract the non-parallelogram pieces:\n   - Two bottom/top right triangles of area $\\frac{1}{2}ac$ each (total area $ac$).\n   - Two left/right right triangles of area $\\frac{1}{2}bd$ each (total area $bd$).\n   - Two corner rectangles of area $bc$ each (total area $2bc$).\n   Subtracting these areas:\n   $$\\text{Area} = (ac + ad + bc + bd) - ac - bd - 2bc = ad - bc$$\n   The classic algebraic formula $ad - bc$ is the exact geometric area of the transformed unit square!\n2. **Why does $\\det(\\mathbf{A}) = 0$ destroy the inverse?**\n   If $\\det(\\mathbf{A}) = 0$, the parallelogram has collapsed into a line segment of zero area. Information along that lost dimension has been completely erased. A mathematical inverse would have to guess which of the infinitely many collapsed points was the original input—an impossible task.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\det(\\mathbf{A})$ | محدد المصفوفة | معامل التمدد الحجمي الموجه؛ يقيس كم تضاعف أو انكمش حجم الأشكال الهندسية في الفضاء. |\n| $\\operatorname{Area}(T(S))$ | المساحة بعد التحويل | مساحة أي شكل هندسي $S$ بعد خضوعه لتحويل المصفوفة $\\mathbf{A}$. |\n| $\\operatorname{Area}(S)$ | المساحة المرجعية الأصلية | مساحة الشكل الهندسي $S$ في الفضاء الأصلي قبل تطبيق التحويل. |\n| $ad$ | جداء القطر الرئيسي | مساحة المستطيل الخارجي الكبير الذي يحيط بمتجهات الأساس بعد تحويلها. |\n| $- bc$ | تصحيح القص الجانبي | المساحة التي تُطرح من المستطيل الخارجي لحذف المثلثات الزائدة وعزل متوازي الأضلاع بدقة. |\n| $\\det(\\mathbf{A}) = 0$ | حالة الانعدام / الشذوذ | إشارة الانهيار البُعدي التام: الفضاء سُحق في بعد أدنى وفقدت المصفوفة قابليتها للقلب. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا تساوي الصيغة في بعدين $ad - bc$ بالضبط؟**\n   تأمل مربع الوحدة الممتد بين متجهي الأساس $\\mathbf{e}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ و $\\mathbf{e}_2 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$ ومساحته 1.\n   عند تطبيق المصفوفة $\\mathbf{A} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$، يستقر المتجهان عند $\\begin{bmatrix} a \\\\ c \\end{bmatrix}$ و $\\begin{bmatrix} b \\\\ d \\end{bmatrix}$، صانعين متوازي أضلاع مائل.\n   إذا أحطنا هذا المتوازي بمستطيل خارجي كبير عرضه $(a+b)$ وارتفاعه $(c+d)$، فإن مساحته الكلية هي $(a+b)(c+d) = ac + ad + bc + bd$.\n   وعندما نطرح مساحات المثلثات والمستطيلات المحيطة الزائدة:\n   - مثلثان مساحة كل منهما $\\frac{1}{2}ac$ (مجموعهما $ac$).\n   - مثلثان مساحة كل منهما $\\frac{1}{2}bd$ (مجموعهما $bd$).\n   - مستطيلان في الزوايا مساحة كل منهما $bc$ (مجموعهما $2bc$).\n   بطرح هذه القطع من المستطيل الخارجي:\n   $$\\text{المساحة} = (ac + ad + bc + bd) - ac - bd - 2bc = ad - bc$$\n   الصيغة الجبرية الشهيرة $ad - bc$ هي المساحة الهندسية الصافية لمتوازي الأضلاع الناتج!\n2. **لماذا يمنع المحدد الصفري قلب المصفوفة؟**\n   إذا كان المحدد صفراً، فهذا يعني أن مساحة متوازي الأضلاع أصبحت صفراً، وانطبق الفضاء على خط واحد. كل المعلومات في البعد المفقود قد تلاشت تماماً، ومحاولة قلب المصفوفة تتطلب تخمين أي نقطة من المالانهاية كانت الأصل، وهو مستحيل رياضياً."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-09",
          "starterCode": "def compute_2d_determinant(A: np.ndarray) -> float:\n    \"\"\"\n    Compute the determinant of a 2x2 matrix A.\n\n    Intuition\n    ---------\n    The determinant measures the signed area scaling factor of the 2D\n    transformation. It calculates ad - bc, representing the net area of the\n    parallelogram spanned by the transformed standard basis vectors.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (2, 2)\n        2D linear transformation matrix.\n\n    Returns\n    -------\n    float\n        The signed area scaling factor det(A) = ad - bc.\n\n    Raises\n    ------\n    ValueError\n        If the input matrix is not of shape (2, 2).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def compute_2d_determinant(A: np.ndarray) -> float:\n    \"\"\"\n    Compute the determinant of a 2x2 matrix A.\n\n    Intuition\n    ---------\n    The determinant measures the signed area scaling factor of the 2D\n    transformation. It calculates ad - bc, representing the net area of the\n    parallelogram spanned by the transformed standard basis vectors.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (2, 2)\n        2D linear transformation matrix.\n\n    Returns\n    -------\n    float\n        The signed area scaling factor det(A) = ad - bc.\n\n    Raises\n    ------\n    ValueError\n        If the input matrix is not of shape (2, 2).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "6.0"
            }
          },
          "solution": "import numpy as np\n\ndef compute_2d_determinant(A: np.ndarray) -> float:\n    \"\"\"\n    Compute the determinant of a 2x2 matrix A.\n\n    Intuition\n    ---------\n    The determinant measures the signed area scaling factor of the 2D\n    transformation. It calculates ad - bc, representing the net area of the\n    parallelogram spanned by the transformed standard basis vectors.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (2, 2)\n        2D linear transformation matrix.\n\n    Returns\n    -------\n    float\n        The signed area scaling factor det(A) = ad - bc.\n\n    Raises\n    ------\n    ValueError\n        If the input matrix is not of shape (2, 2).\n    \"\"\"\n    # Step 1: Validate that the matrix is 2x2\n    # if A.shape != (2, 2):\n    #     raise ValueError(f\"Expected 2x2 matrix, got shape {A.shape}\")\n\n    # Step 2: Extract elements a, b, c, d\n    # a, b = float(A[0, 0]), float(A[0, 1])\n    # c, d = float(A[1, 0]), float(A[1, 1])\n\n    # Step 3: Compute signed determinant ad - bc\n    # return (a * d) - (b * c)\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "A machine learning pipeline applies a feature transformation matrix $\\mathbf{A}$ to a 3D dataset. If $\\det(\\mathbf{A}) = 0$, what does this guarantee about the transformed data points and the ability to reconstruct the original inputs?",
            "ar": "يطبق نموذج تعلم آلي مصفوفة تحويل $\\mathbf{A}$ على بيانات ثلاثية الأبعاد. إذا كان $\\det(\\mathbf{A}) = 0$، فماذا يضمن ذلك بشأن نقاط البيانات المحولة والقدرة على استرجاع المدخلات الأصلية؟"
          },
          "options": [
            {
              "text": {
                "en": "The 3D point cloud has been squashed into a 2D flat plane, a 1D line, or a single point of zero 3D volume, making unique reconstruction mathematically impossible because multiple distinct original inputs map to the same output.",
                "ar": "تم سحق سحابة البيانات ثلاثية الأبعاد لتستقر في مستوى ثنائي الأبعاد، أو خط، أو نقطة ذات حجم ثلاثي الأبعاد صفري، مما يجعل استرجاع البيانات الأصلية مستحيلاً رياضياً لتطابق مخرجات مدخلات مختلفة متعددة.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "A determinant of zero means the transformation has squashed hypervolume to zero, reducing the rank of the space. Because dimensional information has been permanently destroyed, the nullspace contains non-zero vectors, and the matrix has no inverse ($\\mathbf{A}^{-1}$ does not exist).",
                "ar": "المحدد الصفري يعني سحق الحجم الفضائي إلى الصفر وتقليص رتبة الفضاء. ولأن معلومات أحد الأبعاد دُمرت بالكامل، فإن الفضاء الصفري يحتوي على متجهات غير صفرية وتفقد المصفوفة قابليتها للقلب تماماً ($\\mathbf{A}^{-1}$ غير موجودة)."
              }
            },
            {
              "text": {
                "en": "The dataset is simply reflected across the origin, but all original coordinates can be recovered by multiplying by -1.",
                "ar": "البيانات عكست فقط حول نقطة الأصل، ويمكن استرجاع كافة الإحداثيات بضربها في -1.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Geometric reflection yields a negative determinant (e.g., $-1$), NOT zero. A zero determinant collapses dimensional space.",
                "ar": "الانعكاس يعطي محدداً سالباً (مثل $-1$) وليس صفراً؛ المحدد الصفري يسحق الأبعاد ويلغي الحجم."
              }
            },
            {
              "text": {
                "en": "All data points have been scaled by an infinite factor.",
                "ar": "كافة نقاط البيانات تم تكبيرها بعامل تمدد لا نهائي.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Determinant zero indicates a collapse to zero volume, not an expansion toward infinity.",
                "ar": "المحدد الصفري يعني الانكماش والانهيار إلى حجم صفري، وليس التوسع نحو المالانهاية."
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
    "id": "t1-10",
    "title": "Gaussian Elimination, Row Operations & Linear Systems",
    "titleAr": "الحذف الغاوسي والعمليات الصفية وحل المنظومات الخطية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine walking into a bustling farmer's market where three different shoppers bought bundles of apples, bananas, and cantaloupes, but none...",
      "ar": "تخيل أنك دخلت سوقاً للمزارعين حيث اشترى ثلاثة زبائن سلالاً تحتوي على التفاح والموز والبطيخ، لكن البائع نسي وضع بطاقات الأسعار المنفردة على..."
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
          "en": "Imagine walking into a bustling farmer's market where three different shoppers bought bundles of apples, bananas, and cantaloupes, but none of the price tags are displayed. The first receipt shows: 2 apples, 3 bananas, and 1 cantaloupe cost \\$16. The second receipt shows: 1 apple, 2 bananas, and 4 cantaloupes cost \\$25. The third receipt shows: 3 apples, 1 banana, and 2 cantaloupes cost \\$17. How can you figure out the exact individual price of each piece of fruit without descending into chaotic guesswork?\n\nIn geometry, every single linear equation represents a flat, rigid sheet of space. In two dimensions, an equation like $2x + 3y = 12$ draws a straight line. In three dimensions, an equation draws a flat 2D plane cutting through a room. When you have a system of three equations with three unknowns ($\\mathbf{A}\\mathbf{x} = \\mathbf{b}$), you are looking at three flat planes slicing through 3D space. Solving the system means locating the **single unique intersection point** where all three planes simultaneously meet—like the precise corner where two walls and the floor converge.\n\nTo pinpoint this intersection point efficiently, Carl Friedrich Gauss formalized an algorithmic strategy called **Gaussian Elimination**. The process mimics peeling an artichoke or solving a puzzle one step at a time. You are permitted three \"elementary row operations\":\n1. **Swap two rows** (reordering the receipts).\n2. **Multiply a row by a non-zero number** (doubling or tripling a receipt).\n3. **Add a multiple of one row to another row** (combining portions of two receipts to eliminate a fruit).\n\nCrucially, performing these operations does not budge the physical intersection point by even a fraction of a millimeter! Geometrically, you are simply replacing the original tilted planes with new, carefully chosen planes that still pass through the exact same intersection line, but are aligned cleanly with your coordinate axes.\n\nBy strategically canceling out variables below the diagonal, the messy system transforms into a crisp, stair-stepped **upper-triangular system** (Row Echelon Form $\\mathbf{U}$). In this triangular form, the bottom equation contains only one solitary unknown: cantaloupes! You solve for cantaloupes instantly with simple division. Then, you plug that known number into the row above to reveal bananas, and finally plug both into the top row to unlock apples. This upward cascading process is known as **back-substitution**.\n\n---",
          "ar": "تخيل أنك دخلت سوقاً للمزارعين حيث اشترى ثلاثة زبائن سلالاً تحتوي على التفاح والموز والبطيخ، لكن البائع نسي وضع بطاقات الأسعار المنفردة على الفواكه. الفاتورة الأولى تبين أن: تفاحتين و3 موزات وبطيخة واحدة تكلفتها 16 دولاراً. الفاتورة الثانية تبين أن: تفاحة واحدة وموزتين و4 بطيخات تكلفتها 25 دولاراً. والفاتورة الثالثة تبين أن: 3 تفاحات وموزة واحدة وبطيختين تكلفتها 17 دولاراً. كيف تستطيع معرفة السعر الدقيق لكل فاكهة على حدة دون الغرق في التخمين العشوائي المتعب؟\n\nهندسياً، تمثل كل معادلة خطية سطحاً مستوياً صلباً في الفضاء. ففي بعدين، ترسم المعادلة خطاً مستقيماً. وفي الفضاء ثلاثي الأبعاد، ترسم المعادلة مستوياً مسطحاً يشبه لوحاً زجاجياً يقطع الغرفة. وعندما تمتلك منظومة من 3 معادلات بـ 3 مجاهيل ($\\mathbf{A}\\mathbf{x} = \\mathbf{b}$)، فأنت تنظر إلى 3 ألواح زجاجية تقطع الفضاء؛ وحل هذه المنظومة يعني العثور على **نقطة التقاطع الوحيدة المشتركة** التي تخترقها الألواح الثلاثة معاً في نفس اللحظة—تماماً مثل زاوية الغرفة التي يلتقي عندها جداران مع أرضية الغرفة.\n\nللوصول إلى نقطة التقاطع هذه بأعلى كفاءة ممكنة، صاغ العالم كارل فريدريش غاوس خوارزمية ذكية تُعرف بـ **الحذف الغاوسي** (Gaussian Elimination). تشبه هذه الطريقة تقشير طبقات البصلة بحذر حتى الوصول لقلبها. وتعتمد على 3 عمليات صفية أولية بسيطة:\n1. **تبديل صفي معادلتين** (إعادة ترتيب الفواتير).\n2. **ضرب صف في عدد حقيقي غير صفري** (مضاعفة كميات الفاتورة وأسعارها).\n3. **إضافة مضاعف صف إلى صف آخر** (دمج أجزاء من فاتورتين بهدف حذف فاكهة معينة).\n\nالمعجزة الهندسية هنا هي أن هذه العمليات الصفية لا تحرك نقطة التقاطع المشتركة بمقدار مليمتر واحد! هندسياً، أنت تستبدل الألواح الزجاجية المائلة بألواح جديدة أكثر انتظاماً تلتقي عند نفس النقطة تماماً، لكنها موازية للمحاور الإحداثية.\n\nعبر تصفير المتغيرات الواقعة تحت القطر الرئيسي بذكاء، تتحول المنظومة المعقدة إلى **منظومة مثلثية علوية** مرتبة كالدَرَج (Row Echelon Form $\\mathbf{U}$). في هذا الشكل المدرج، تصبح المعادلة الأخيرة في القاع تحتوي على مجهول واحد وحيد: البطيخ! تحسب سعره فوراً بعملية قسمة واحدة بسيطة. ثم تأخذ هذا السعر وتعوض به صعوداً في المعادلة التي تعلوها مباشرة لتكشف سعر الموز، ثم تعوض بهما معاً في المعادلة الأولى لتصل لسعر التفاح. هذه الحركة الصاعدة المتتالية تسمى **التعويض العكسي** (Back-Substitution)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A}\\mathbf{x} = \\mathbf{b} \\xrightarrow{\\text{Pivoting}} \\mathbf{U}\\mathbf{x} = \\mathbf{c}, \\quad x_i = \\frac{c_i - \\sum_{j=i+1}^n U_{ij} x_j}{U_{ii}}",
        "formulaNote": {
          "en": "Mathematical anchor for Gaussian Elimination, Row Operations & Linear Systems.",
          "ar": "المرساة الرياضية لـ الحذف الغاوسي والعمليات الصفية وحل المنظومات الخطية."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ | Original Linear System | The initial simultaneous system: $\\mathbf{A}$ is the matrix of plane normal coefficients, and $\\mathbf{b}$ is the offset vector. |\n| $\\mathbf{U}\\mathbf{x} = \\mathbf{c}$ | Upper-Triangular System | The stair-stepped echelon form after eliminating all coefficients below the main diagonal ($U_{ij} = 0$ for $i > j$). |\n| $U_{ii}$ | Pivot Element | The diagonal anchor entry in row $i$; must be non-zero to allow dividing without causing a zero-division error. |\n| $\\sum_{j=i+1}^n U_{ij} x_j$ | Already-Resolved Variables | The sum of known contributions from variables $x_{i+1}, \\dots, x_n$ previously solved in lower rows. |\n| $x_i = \\dots$ | Back-Substitution Formula | The cascading upward solver: isolates $x_i$ by subtracting known terms from $c_i$ and dividing by pivot $U_{ii}$. |\n\n##### Why the Math Works Step-by-Step\n1. **Why do elementary row operations preserve the exact intersection point?**\n   Consider two true equations: $\\text{Eq}_1 = \\text{val}_1$ and $\\text{Eq}_2 = \\text{val}_2$. If you multiply $\\text{Eq}_1$ by scalar $k$, you get $k \\cdot \\text{Eq}_1 = k \\cdot \\text{val}_1$, which is still undeniably true. If you add that to $\\text{Eq}_2$, you are adding equal quantities to both sides of the equation. Any point $(x, y, z)$ that satisfied the original planes *must* satisfy this new combined plane. Hence, the solution set is strictly preserved.\n2. **Why is the upper-triangular form so easy to solve?**\n   Look at the bottom row of an upper-triangular matrix:\n   $$U_{nn} x_n = c_n \\implies x_n = \\frac{c_n}{U_{nn}}$$\n   Because all other variables were eliminated, there is no cross-talk! Once $x_n$ is known, row $n-1$ has only one remaining unknown ($x_{n-1}$). By stepping upward row by row, every single equation contains exactly one unknown variable and several already-computed constants.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ | المنظومة الخطية الأصلية | النظام التزامني الأولي: $\\mathbf{A}$ مصفوفة معاملات المستويات، و $\\mathbf{b}$ متجه الثوابت والنتائج. |\n| $\\mathbf{U}\\mathbf{x} = \\mathbf{c}$ | المنظومة المثلثية العلوية | صيغة الدرج الصفّي بعد تصفير كافة المعاملات الواقعة تحت القطر الرئيسي ($U_{ij} = 0$ لكل $i > j$). |\n| $U_{ii}$ | عنصر الارتكاز (Pivot) | الرقم المحوري على القطر الرئيسي في الصف $i$؛ ويشترط ألا يكون صفراً لتمكين القسمة دون أخطاء برمجية. |\n| $\\sum_{j=i+1}^n U_{ij} x_j$ | مساهمة المتغيرات المحلولة | مجموع القيم المحسوبة مسبقاً للمتغيرات $x_{i+1} \\dots x_n$ في الصفوف السفلية. |\n| $x_i = \\dots$ | معادلة التعويض العكسي | الحل المتسلسل صعوداً: عزل $x_i$ بطرح مساهمات المتغيرات المعروفة من الطرف الأيمن $c_i$ ثم القسمة على $U_{ii}$. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا تحافظ العمليات الصفية على نقطة التقاطع بدقة متناهية؟**\n   تأمل معادلتين صحيحتين: $\\text{المعادلة}_1 = \\text{قيمة}_1$ و $\\text{المعادلة}_2 = \\text{قيمة}_2$. إذا ضربت المعادلة الأولى في رقم $k$ وأضفتها للمعادلة الثانية، فأنت تضيف مقادير متساوية لطرفي معادلة صحيحة. وأي نقطة فراغية $(x, y, z)$ كانت تقع على المستويات الأصلية ستقع حتماً على المستوى الجديد الناتج عن دمجهما، مما يضمن صمود الحل المشترك.\n2. **لماذا يسهل حل المنظومة المثلثية العلوية؟**\n   تأمل الصف الأخير في المصفوفة المثلثية:\n   $$U_{nn} x_n = c_n \\implies x_n = \\frac{c_n}{U_{nn}}$$\n   بما أن جميع المتغيرات الأخرى تم تصفيرها، ينعدم أي تشويش! وبمجرد معرفة $x_n$، يصبح الصف الذي يعلوه محتوياً على مجهول واحد فقط. وبالصعود درجة درجة على السلم، تتحول كل معادلة إلى مسألة مجهول واحد وأرقام معلومة."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-10",
          "starterCode": "def back_substitution(U: np.ndarray, c: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Solve an upper-triangular linear system U x = c via backward substitution.\n\n    Intuition\n    ---------\n    In an upper-triangular matrix, the bottom equation contains only the last\n    variable x[n-1]. We solve for it directly, then substitute it upward row\n    by row into the preceding equations to systematically unlock all unknowns.\n\n    Parameters\n    ----------\n    U : np.ndarray of shape (N, N)\n        Upper-triangular matrix with non-zero diagonal pivot elements.\n    c : np.ndarray of shape (N,)\n        Right-hand side target vector.\n\n    Returns\n    -------\n    np.ndarray of shape (N,)\n        Solution vector x satisfying U x = c.\n\n    Raises\n    ------\n    ZeroDivisionError\n        If any diagonal pivot element U[i, i] is zero.\n    \"\"\"\n    # Step 1: Iterate backwards through rows from bottom (n - 1) to top (0)\n    # Step 2: Guard against zero diagonal pivot\n    # Step 3: Compute sum of known terms from already-computed variables to the right\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def back_substitution(U: np.ndarray, c: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Solve an upper-triangular linear system U x = c via backward substitution.\n\n    Intuition\n    ---------\n    In an upper-triangular matrix, the bottom equation contains only the last\n    variable x[n-1]. We solve for it directly, then substitute it upward row\n    by row into the preceding equations to systematically unlock all unknowns.\n\n    Parameters\n    ----------\n    U : np.ndarray of shape (N, N)\n        Upper-triangular matrix with non-zero diagonal pivot elements.\n    c : np.ndarray of shape (N,)\n        Right-hand side target vector.\n\n    Returns\n    -------\n    np.ndarray of shape (N,)\n        Solution vector x satisfying U x = c.\n\n    Raises\n    ------\n    ZeroDivisionError\n        If any diagonal pivot element U[i, i] is zero.\n    \"\"\"\n    # Step 1: Iterate backwards through rows from bottom (n - 1) to top (0)\n    # Step 2: Guard against zero diagonal pivot\n    # Step 3: Compute sum of known terms from already-computed variables to the right\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "array([1.5, 2. ])"
            }
          },
          "solution": "import numpy as np\n\ndef back_substitution(U: np.ndarray, c: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Solve an upper-triangular linear system U x = c via backward substitution.\n\n    Intuition\n    ---------\n    In an upper-triangular matrix, the bottom equation contains only the last\n    variable x[n-1]. We solve for it directly, then substitute it upward row\n    by row into the preceding equations to systematically unlock all unknowns.\n\n    Parameters\n    ----------\n    U : np.ndarray of shape (N, N)\n        Upper-triangular matrix with non-zero diagonal pivot elements.\n    c : np.ndarray of shape (N,)\n        Right-hand side target vector.\n\n    Returns\n    -------\n    np.ndarray of shape (N,)\n        Solution vector x satisfying U x = c.\n\n    Raises\n    ------\n    ZeroDivisionError\n        If any diagonal pivot element U[i, i] is zero.\n    \"\"\"\n    n = len(c)\n    x = np.zeros(n, dtype=float)\n\n    # Step 1: Iterate backwards through rows from bottom (n - 1) to top (0)\n    for i in range(n - 1, -1, -1):\n        # Step 2: Guard against zero diagonal pivot\n        if np.isclose(U[i, i], 0.0):\n            raise ZeroDivisionError(f\"Zero pivot encountered at row {i}\")\n\n        # Step 3: Compute sum of known terms from already-computed variables to the right\n        sum_known = np.dot(U[i, i + 1:], x[i + 1:])\n\n        # Step 4: Isolate x[i] by subtracting known sum from c[i] and dividing by pivot U[i, i]\n        x[i] = (c[i] - sum_known) / U[i, i]\n\n    return x"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "During Gaussian elimination on a system of 3 equations with 3 unknowns, forward elimination yields a bottom augmented row of $[0, 0, 0 \\mid 5]$. What is the exact geometric and algebraic interpretation?",
            "ar": "أثناء تطبيق الحذف الغاوسي على منظومة من 3 معادلات بـ 3 مجاهيل، أدى الحذف إلى صف أخير في المصفوفة الموسعة هو $[0, 0, 0 \\mid 5]$. ما هو التفسير الهندسي والجبري الدقيق لذلك؟"
          },
          "options": [
            {
              "text": {
                "en": "The system is algebraically inconsistent with no solution, geometrically meaning the hyperplanes have no common intersection point (e.g., two parallel planes).",
                "ar": "المنظومة متناقضة جبرياً ومستحيلة الحل، وهندسياً يعني ذلك أن المستويات ليس لها أي نقطة تقاطع مشتركة (كمستويين متوازيين لا يلتقيان).\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The row corresponds to the equation $0\\cdot x_1 + 0\\cdot x_2 + 0\\cdot x_3 = 5$, which simplifies to the absurdity $0 = 5$ (a mathematical impossibility). Geometrically, planes that never intersect share zero common points in space.",
                "ar": "يعبر هذا الصف عن المعادلة $0 = 5$، وهي استحالة رياضية ومغالطة صريحة. هندسياً، المستويات التي لا تلتقي في نقطة موحدة (مثل المستويات المتوازية) ليس لها أي حل مشترك."
              }
            },
            {
              "text": {
                "en": "The system has infinitely many solutions parameterized by $x_3 = 5$.",
                "ar": "المنظومة تمتلك عدداً لا نهائياً من الحلول بمعلمة $x_3 = 5$.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Infinitely many solutions occur when a row becomes $[0, 0, 0 \\mid 0]$, indicating a redundant equation ($0 = 0$), NOT $[0, 0, 0 \\mid 5]$.",
                "ar": "تنتج الحلول اللانهائية عندما يكون الصف بالكامل أصفاراً $[0, 0, 0 \\mid 0]$ دلالة على معادلة مكررة ($0 = 0$)، وليس عندما يكون الطرف الأيمن غير صفري."
              }
            },
            {
              "text": {
                "en": "The algorithm must be restarted because a zero pivot means the matrix rank is 5.",
                "ar": "يجب إعادة تشغيل الخوارزمية لأن الارتكاز الصفري يعني أن رتبة المصفوفة هي 5.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A $3 \\times 3$ matrix cannot have rank 5; the result cleanly and decisively diagnoses structural inconsistency.",
                "ar": "مصفوفة $3 \\times 3$ يستحيل أن تكون رتبتها 5؛ والنتيجة تشخص التناقض البنيوي وعدم وجود حل بوضوح تام."
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
    "id": "t1-11",
    "title": "The Four Fundamental Subspaces",
    "titleAr": "الفضاءات الجزئية الأربعة الأساسية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine shining a bright flashlight at an intricate wire sculpture inside a dark room, casting its silhouette onto the flat wall behind it.",
      "ar": "تخيل أنك تسلط مصباحاً يدوياً ساطعاً على مجسم سلكي معقد في غرفة مظلمة، لتسقط ظله على الجدار المسطح خلفه."
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
          "en": "Imagine shining a bright flashlight at an intricate wire sculpture inside a dark room, casting its silhouette onto the flat wall behind it. The wire sculpture lives in the 3D world of your room (the input space $\\mathbb{R}^3$), while the projected shadow lives on the flat 2D surface of the plaster wall (the output space $\\mathbb{R}^2$). If you wiggle the wire sculpture along the wall's surface, the shadow moves and dances. But what if you push the wire sculpture directly along the line of the flashlight's beam, moving it directly toward or away from the light? On the wall, the shadow does not move sideways at all—that direction of movement is completely invisible to the wall.\n\nEvery matrix $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ acts as an information bridge between an input world of $n$ dimensions and an output world of $m$ dimensions. Renowned MIT mathematician Gilbert Strang synthesized the entire architecture of linear algebra into a breathtaking conceptual framework known as **The Four Fundamental Subspaces** (The \"Big Picture\").\n\nStrang showed that the input universe $\\mathbb{R}^n$ is sliced cleanly into two mutually orthogonal, perpendicular zones:\n1. **The Row Space ($C(\\mathbf{A}^T)$):** The active input territory. Any movement here immediately triggers an active, noticeable change in the output.\n2. **The Nullspace ($N(\\mathbf{A})$):** The complete blind spot. Any vector residing in the nullspace gets completely crushed to absolute zero by the matrix: $\\mathbf{A}\\mathbf{x} = \\mathbf{0}$.\n\nThese two realms meet at a strict $90^\\circ$ perpendicular right angle ($C(\\mathbf{A}^T) \\perp N(\\mathbf{A})$) and together account for every single dimension of the input world ($\\operatorname{dim} = r + (n - r) = n$).\n\nOn the other side of the bridge, the output universe $\\mathbb{R}^m$ is likewise partitioned into two perpendicular territories:\n1. **The Column Space ($C(\\mathbf{A})$):** The realm of the possible. This subspace contains every single output vector that the matrix can physically reach or generate.\n2. **The Left Nullspace ($N(\\mathbf{A}^T)$):** The realm of the impossible. This perpendicular zone contains directions that the matrix can never reach, forming the orthogonal complement to the column space ($C(\\mathbf{A}) \\perp N(\\mathbf{A}^T)$).\n\n---",
          "ar": "تخيل أنك تسلط مصباحاً يدوياً ساطعاً على مجسم سلكي معقد في غرفة مظلمة، لتسقط ظله على الجدار المسطح خلفه. المجسم السلكي يستقر في عالم ثلاثي الأبعاد $\\mathbb{R}^3$ (فضاء المدخلات)، بينما يعيش الظل المسقط على سطح الجدار ثنائي الأبعاد $\\mathbb{R}^2$ (فضاء المخرجات). إذا حركت المجسم السلكي يميناً أو يساراً بموازاة الجدار، فإن الظل يتحرك ويرقص على الحائط. ولكن ماذا لو حركت المجسم للأمام أو للخلف على امتداد شعاع الضوء مباشرة مقترباً من المصباح أو مبتعداً عنه؟ على الجدار، لن يتغير موضع الظل مطلقاً؛ فذلك الاتجاه الحركي خفي تماماً وأعمى بالنسبة للجدار!\n\nتعمل كل مصفوفة $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ كجسر معلوماتي يربط بين فضاء مدخلات ذي $n$ بعداً وفضاء مخرجات ذي $m$ بعداً. لخص عالم الرياضيات الشهير جيلبرت سترانج (Gilbert Strang) صرح الجبر الخطي بأكمله في لوحة بديعة تُعرف بـ **الفضاءات الجزئية الأربعة الأساسية** (\"الصورة الكبرى\").\n\nأثبت سترانج أن فضاء المدخلات $\\mathbb{R}^n$ ينقسم بحد السيف إلى منطقتين متعامدتين تماماً:\n1. **فضاء الصفوف ($C(\\mathbf{A}^T)$):** إقليم المدخلات الفعالة الحية؛ أي حركة بداخله تترجم فوراً إلى استجابة وتغير حقيقي في المخرجات.\n2. **الفضاء الصفري ($N(\\mathbf{A})$):** النقطة العمياء المطلقة؛ كل متجه يستقر في هذا الفضاء تسحقه المصفوفة بالكامل ليتحول إلى الصفر المطلق: $\\mathbf{A}\\mathbf{x} = \\mathbf{0}$.\n\nيلتقي هذان العالمان عند زاوية قائمة صارمة $90^\\circ$ ($C(\\mathbf{A}^T) \\perp N(\\mathbf{A})$)، ويتقاسمان معاً كافة أبعاد عالم المدخلات بالتساوي ودون أي هدر ($\\text{الأبعاد} = r + (n - r) = n$).\n\nوعلى الضفة الأخرى من الجسر، ينقسم فضاء المخرجات $\\mathbb{R}^m$ بدوره إلى منطقتين متعامدتين:\n1. **فضاء الأعمدة ($C(\\mathbf{A})$):** أرض الممكنات؛ يضم كل نقطة ومتجه يمكن للمصفوفة توليدها والوصول إليها فعلياً.\n2. **الفضاء الصفري الأيسر ($N(\\mathbf{A}^T)$):** عالم المستحيل؛ يضم الاتجاهات العمودية التي تعجز المصفوفة عن بلوغها، وهو المتمم المتعامد لفضاء الأعمدة ($C(\\mathbf{A}) \\perp N(\\mathbf{A}^T)$)."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbb{R}^n = C(\\mathbf{A}^T) \\oplus N(\\mathbf{A}), \\quad \\mathbb{R}^m = C(\\mathbf{A}) \\oplus N(\\mathbf{A}^T), \\quad \\operatorname{rank}(\\mathbf{A}) + \\operatorname{nullity}(\\mathbf{A}) = n",
        "formulaNote": {
          "en": "Mathematical anchor for The Four Fundamental Subspaces.",
          "ar": "المرساة الرياضية لـ الفضاءات الجزئية الأربعة الأساسية."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $C(\\mathbf{A}) \\subset \\mathbb{R}^m$ | Column Space (Range) | The subspace of all outputs reachable by taking linear combinations of $\\mathbf{A}$'s columns. Dimension $= r$. |\n| $N(\\mathbf{A}) \\subset \\mathbb{R}^n$ | Nullspace (Kernel) | The subspace of all inputs crushed to absolute zero ($\\mathbf{A}\\mathbf{x} = \\mathbf{0}$). Dimension $= n - r$. |\n| $C(\\mathbf{A}^T) \\subset \\mathbb{R}^n$ | Row Space | The active input directions spanned by the rows of $\\mathbf{A}$. Orthogonal complement to $N(\\mathbf{A})$. Dimension $= r$. |\n| $N(\\mathbf{A}^T) \\subset \\mathbb{R}^m$ | Left Nullspace | All output directions orthogonal to the column space ($\\mathbf{A}^T\\mathbf{y} = \\mathbf{0}$). Dimension $= m - r$. |\n| $\\oplus$ | Direct Sum | Every vector decomposes uniquely into two perpendicular pieces: $\\mathbf{x} = \\mathbf{x}_{\\text{row}} + \\mathbf{x}_{\\text{null}}$ where $\\mathbf{x}_{\\text{row}} \\perp \\mathbf{x}_{\\text{null}}$. |\n| $r + (n - r) = n$ | Rank-Nullity Theorem | Conservation of dimensions: every input dimension is either active ($r$) or crushed into the nullspace ($n - r$). |\n\n##### Why the Math Works Step-by-Step\n1. **Why is the Nullspace strictly perpendicular to the Row Space?**\n   Suppose vector $\\mathbf{x}$ lies in the Nullspace of $\\mathbf{A}$. By definition:\n   $$\\mathbf{A}\\mathbf{x} = \\mathbf{0} \\implies \\begin{bmatrix} \\text{row}_1 \\\\ \\text{row}_2 \\\\ \\vdots \\\\ \\text{row}_m \\end{bmatrix} \\mathbf{x} = \\begin{bmatrix} 0 \\\\ 0 \\\\ \\vdots \\\\ 0 \\end{bmatrix}$$\n   Look at each coordinate of the resulting zero vector:\n   $$\\text{row}_1 \\cdot \\mathbf{x} = 0, \\quad \\text{row}_2 \\cdot \\mathbf{x} = 0, \\quad \\dots, \\quad \\text{row}_m \\cdot \\mathbf{x} = 0$$\n   This proves that $\\mathbf{x}$ has a dot product of zero with *every single row* of matrix $\\mathbf{A}$! Since any vector $\\mathbf{v}$ in the Row Space is a linear combination of these rows ($\\mathbf{v} = \\sum c_i \\text{row}_i$), taking the dot product gives $\\mathbf{v} \\cdot \\mathbf{x} = \\sum c_i (\\text{row}_i \\cdot \\mathbf{x}) = 0$. Therefore, every vector in the nullspace is strictly perpendicular to the entire row space: $C(\\mathbf{A}^T) \\perp N(\\mathbf{A})$.\n2. **Why does $\\operatorname{rank}(\\mathbf{A}) = \\operatorname{rank}(\\mathbf{A}^T)$ (Row Rank equals Column Rank)?**\n   One of the deepest theorems in mathematics: although $\\mathbf{A}$ can have wildly different numbers of rows and columns (e.g. $1000 \\times 3$), the number of linearly independent rows always strictly equals the number of linearly independent columns!\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $C(\\mathbf{A}) \\subset \\mathbb{R}^m$ | فضاء الأعمدة (المدى) | فضاء المخرجات التي يمكن للمصفوفة بلوغها بتركيب أعمدتها؛ بعده يساوي رتبة المصفوفة $r$. |\n| $N(\\mathbf{A}) \\subset \\mathbb{R}^n$ | الفضاء الصفري (النواة) | كافة متجهات المدخلات التي تسحقها المصفوفة إلى الصفر المطلق ($\\mathbf{A}\\mathbf{x} = \\mathbf{0}$)؛ بعده $n - r$. |\n| $C(\\mathbf{A}^T) \\subset \\mathbb{R}^n$ | فضاء الصفوف | اتجاهات المدخلات الفعالة المتولدة من صفوف $\\mathbf{A}$؛ وهو متمم متعامد للفضاء الصفري بعده $r$. |\n| $N(\\mathbf{A}^T) \\subset \\mathbb{R}^m$ | الفضاء الصفري الأيسر | اتجاهات المخرجات المستحيلة المتعامدة على فضاء الأعمدة ($\\mathbf{A}^T\\mathbf{y} = \\mathbf{0}$)؛ بعده $m - r$. |\n| $\\oplus$ | المجموع المباشر | ينقسم أي متجه بشكل فريد إلى قطعتين متعامدتين: $\\mathbf{x} = \\mathbf{x}_{\\text{row}} + \\mathbf{x}_{\\text{null}}$ حيث $\\mathbf{x}_{\\text{row}} \\perp \\mathbf{x}_{\\text{null}}$. |\n| $r + (n - r) = n$ | مبرهنة الرتبة والنواة | قانون حفظ الأبعاد: كل بُعد في عالم المدخلات إما أن يكون فعالاً ($r$) أو يُسحق في الفضاء الصفري ($n - r$). |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا يتعامد الفضاء الصفري تماماً مع فضاء الصفوف؟**\n   افترض أن المتجه $\\mathbf{x}$ يقع في الفضاء الصفري للمصفوفة $\\mathbf{A}$. بحسب التعريف:\n   $$\\mathbf{A}\\mathbf{x} = \\mathbf{0} \\implies \\begin{bmatrix} \\text{الصف}_1 \\\\ \\text{الصف}_2 \\\\ \\vdots \\\\ \\text{الصف}_m \\end{bmatrix} \\mathbf{x} = \\begin{bmatrix} 0 \\\\ 0 \\\\ \\vdots \\\\ 0 \\end{bmatrix}$$\n   تأمل كل معادلة ناتجة بمفردها:\n   $$\\text{الصف}_1 \\cdot \\mathbf{x} = 0, \\quad \\text{الصف}_2 \\cdot \\mathbf{x} = 0, \\quad \\dots, \\quad \\text{الصف}_m \\cdot \\mathbf{x} = 0$$\n   هذا يبرهن أن حاصل الضرب النقطي للمتجه $\\mathbf{x}$ مع *كل صف* من صفوف المصفوفة يساوي صفراً! وبما أن أي متجه في فضاء الصفوف هو تركيب خطي لهذه الصفوف، فإن جداءه النقطي مع $\\mathbf{x}$ سينعدم حتماً. وهذا يثبت التعامد التام $C(\\mathbf{A}^T) \\perp N(\\mathbf{A})$.\n2. **لماذا تتساوى رتبة الصفوف مع رتبة الأعمدة دائماً؟**\n   إحدى أعظم مبرهنات الجبر: حتى لو كانت المصفوفة مستطيلة بأبعاد متباعدة (مثل $1000 \\times 3$)، فإن أقصى عدد من الصفوف المستقلة خطياً يطابق دائماً وبدقة أقصى عدد من الأعمدة المستقلة خطياً!"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-11",
          "starterCode": "def subspace_dimensions(m: int, n: int, rank: int) -> dict[str, int]:\n    \"\"\"\n    Compute the dimensions of Gilbert Strang's Four Fundamental Subspaces\n    for an m x n matrix with rank r.\n\n    Intuition\n    ---------\n    - Column Space C(A) in R^m has dimension equal to rank r.\n    - Row Space C(A^T) in R^n has dimension equal to rank r.\n    - Nullspace N(A) in R^n has dimension n - r (Rank-Nullity Theorem).\n    - Left Nullspace N(A^T) in R^m has dimension m - r.\n\n    Parameters\n    ----------\n    m : int\n        Number of rows (output space dimension).\n    n : int\n        Number of columns (input space dimension).\n    rank : int\n        Matrix rank r (r <= min(m, n)).\n\n    Returns\n    -------\n    dict with keys 'col_space', 'nullspace', 'row_space', 'left_nullspace'\n        The geometric dimensions of each of the four fundamental subspaces.\n\n    Raises\n    ------\n    ValueError\n        If rank exceeds min(m, n) or is negative.\n    \"\"\"\n    # Step 1: Column space and row space dimensions both strictly equal rank r\n    # Step 2: Nullspace dimension equals input dimension minus rank (n - r)\n    # Step 3: Left nullspace dimension equals output dimension minus rank (m - r)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def subspace_dimensions(m: int, n: int, rank: int) -> dict[str, int]:\n    \"\"\"\n    Compute the dimensions of Gilbert Strang's Four Fundamental Subspaces\n    for an m x n matrix with rank r.\n\n    Intuition\n    ---------\n    - Column Space C(A) in R^m has dimension equal to rank r.\n    - Row Space C(A^T) in R^n has dimension equal to rank r.\n    - Nullspace N(A) in R^n has dimension n - r (Rank-Nullity Theorem).\n    - Left Nullspace N(A^T) in R^m has dimension m - r.\n\n    Parameters\n    ----------\n    m : int\n        Number of rows (output space dimension).\n    n : int\n        Number of columns (input space dimension).\n    rank : int\n        Matrix rank r (r <= min(m, n)).\n\n    Returns\n    -------\n    dict with keys 'col_space', 'nullspace', 'row_space', 'left_nullspace'\n        The geometric dimensions of each of the four fundamental subspaces.\n\n    Raises\n    ------\n    ValueError\n        If rank exceeds min(m, n) or is negative.\n    \"\"\"\n    # Step 1: Column space and row space dimensions both strictly equal rank r\n    # Step 2: Nullspace dimension equals input dimension minus rank (n - r)\n    # Step 3: Left nullspace dimension equals output dimension minus rank (m - r)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "{'col_space': 2, 'nullspace': 1, 'row_space': 2, 'left_nullspace': 3}"
            }
          },
          "solution": "import numpy as np\n\ndef subspace_dimensions(m: int, n: int, rank: int) -> dict[str, int]:\n    \"\"\"\n    Compute the dimensions of Gilbert Strang's Four Fundamental Subspaces\n    for an m x n matrix with rank r.\n\n    Intuition\n    ---------\n    - Column Space C(A) in R^m has dimension equal to rank r.\n    - Row Space C(A^T) in R^n has dimension equal to rank r.\n    - Nullspace N(A) in R^n has dimension n - r (Rank-Nullity Theorem).\n    - Left Nullspace N(A^T) in R^m has dimension m - r.\n\n    Parameters\n    ----------\n    m : int\n        Number of rows (output space dimension).\n    n : int\n        Number of columns (input space dimension).\n    rank : int\n        Matrix rank r (r <= min(m, n)).\n\n    Returns\n    -------\n    dict with keys 'col_space', 'nullspace', 'row_space', 'left_nullspace'\n        The geometric dimensions of each of the four fundamental subspaces.\n\n    Raises\n    ------\n    ValueError\n        If rank exceeds min(m, n) or is negative.\n    \"\"\"\n    if rank < 0 or rank > min(m, n):\n        raise ValueError(f\"Rank {rank} must be between 0 and min({m}, {n})\")\n\n    # Step 1: Column space and row space dimensions both strictly equal rank r\n    dim_col = rank\n    dim_row = rank\n\n    # Step 2: Nullspace dimension equals input dimension minus rank (n - r)\n    dim_null = n - rank\n\n    # Step 3: Left nullspace dimension equals output dimension minus rank (m - r)\n    dim_left_null = m - rank\n\n    # Step 4: Return dimensions formatted as dictionary\n    return {\n        'col_space': dim_col,\n        'nullspace': dim_null,\n        'row_space': dim_row,\n        'left_nullspace': dim_left_null\n    }"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "In a linear regression problem $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$, the target observation vector $\\mathbf{b}$ cannot be reached exactly because it lies outside the Column Space $C(\\mathbf{A})$. In which of the Four Fundamental Subspaces does the optimal least-squares residual error vector $\\mathbf{e} = \\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}$ strictly reside?",
            "ar": "في مسألة انحدار خطي $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$، لا يمكن حل المتجه المستهدف $\\mathbf{b}$ بدقة لوقوعه خارج فضاء الأعمدة $C(\\mathbf{A})$. في أي من الفضاءات الأساسية الأربعة يقع بالضرورة متجه الخطأ المتبقي الأمثل $\\mathbf{e} = \\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}$؟"
          },
          "options": [
            {
              "text": {
                "en": "The Left Nullspace $N(\\mathbf{A}^T)$, because the minimal least-squares error is strictly orthogonal to every vector in the Column Space $C(\\mathbf{A})$.",
                "ar": "الفضاء الصفري الأيسر $N(\\mathbf{A}^T)$، لأن خطأ المربعات الصغرى الأصغري متعامد بالضرورة مع كل متجه في فضاء الأعمدة $C(\\mathbf{A})$.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The fundamental orthogonality requirement of least-squares projection dictates that $\\mathbf{A}^T \\mathbf{e} = \\mathbf{0}$, which is the exact mathematical definition of the Left Nullspace $N(\\mathbf{A}^T)$. The residual vector $\\mathbf{e}$ is the perpendicular drop from $\\mathbf{b}$ onto $C(\\mathbf{A})$. Because $C(\\mathbf{A}) \\perp N(\\mathbf{A}^T)$, $\\mathbf{e}$ must live inside $N(\\mathbf{A}^T)$.",
                "ar": "شرط التعامد الأساسي لإسقاط المربعات الصغرى ينص على أن $\\mathbf{A}^T \\mathbf{e} = \\mathbf{0}$، وهو التعريف الرياضي الدقيق للفضاء الصفري الأيسر $N(\\mathbf{A}^T)$. متجه الخطأ $\\mathbf{e}$ هو الإسقاط العمودي من $\\mathbf{b}$ على فضاء الأعمدة $C(\\mathbf{A})$، ولأن $C(\\mathbf{A}) \\perp N(\\mathbf{A}^T)$، فإن $\\mathbf{e}$ يستقر حتماً في $N(\\mathbf{A}^T)$."
              }
            },
            {
              "text": {
                "en": "The Nullspace $N(\\mathbf{A})$, because the error vector must be squashed to zero by matrix $\\mathbf{A}$.",
                "ar": "الفضاء الصفري $N(\\mathbf{A})$، لأن متجه الخطأ يجب أن تسحقه المصفوفة $\\mathbf{A}$ إلى الصفر.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Fatal dimension mismatch! Vector $\\mathbf{e}$ lives in the output space $\\mathbb{R}^m$, whereas the nullspace $N(\\mathbf{A})$ lives in the input space $\\mathbb{R}^n$.",
                "ar": "عدم تطابق قاتل في الأبعاد! المتجه $\\mathbf{e}$ يعيش في فضاء المخرجات $\\mathbb{R}^m$، بينما الفضاء الصفري $N(\\mathbf{A})$ يعيش في فضاء المدخلات $\\mathbb{R}^n$."
              }
            },
            {
              "text": {
                "en": "The Row Space $C(\\mathbf{A}^T)$, because it contains all the explanatory regressors.",
                "ar": "فضاء الصفوف $C(\\mathbf{A}^T)$، لاحتوائه على كافة المتغيرات التفسيرية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The row space lives in $\\mathbb{R}^n$, not $\\mathbb{R}^m$, and represents input feature combinations rather than output prediction residuals.",
                "ar": "فضاء الصفوف يستقر في $\\mathbb{R}^n$ وليس $\\mathbb{R}^m$، ويمثل مدخلات الميزات التفسيرية لا بواقي المخرجات."
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
    "id": "t1-12",
    "title": "Orthogonal Projections & Least Squares Approximation",
    "titleAr": "الإسقاطات المتعامدة وتقريب المربعات الصغرى",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine standing in a cavernous, high-ceilinged cathedral holding a floating drone hovering in mid-air at position $\\mathbf{b}$.",
      "ar": "تخيل أنك تقف في بهو قصر فسيح ذي سقف شاهق الارتفاع، وتمسك بزمام طائرة مسيرة صغيرة تطفو في الهواء عند النقطة $\\mathbf{b}$."
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
          "en": "Imagine standing in a cavernous, high-ceilinged cathedral holding a floating drone hovering in mid-air at position $\\mathbf{b}$. If you want to know: *which point on the polished marble floor is closest to the hovering drone?* How would you find it? You would not guess by casting your eyes at an arbitrary slant. You would tie a heavy brass weight to a string—a plumb line (the ancient mason's tool)—and let gravity pull it straight down. The exact point where that brass weight taps the floor at a sharp, perpendicular $90^\\circ$ angle is the **orthogonal projection** $\\mathbf{p}$.\n\nWhy is that perpendicular landing spot guaranteed to be the closest point in the entire universe of the floor? Because if you choose *any other point* on the floor, no matter how close, that point forms a right-angled triangle with the drone and the plumb line's landing spot. By the Pythagorean theorem, the distance to that alternative point is the hypotenuse ($c^2 = a^2 + b^2$), and the hypotenuse is strictly and unconditionally longer than the vertical perpendicular leg. The perpendicular drop is nature's unique, minimal-distance shortcut.\n\nIn real-world data science, machine learning, and econometrics, we are constantly faced with a tragic reality: messy real-world data almost never fits our mathematical models perfectly. When we collect experimental measurements $\\mathbf{b}$, the observation vector hovers up in space outside the plane spanned by our feature columns $C(\\mathbf{A})$. The linear equation $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ has no exact solution! We cannot bend physical reality to touch our model.\n\nInstead, we do the next best thing: we drop a mathematical plumb line straight down from reality onto our model's subspace! That closest possible linear approximation is the orthogonal projection $\\mathbf{p} = \\mathbf{A}\\hat{\\mathbf{x}}$. The projection matrix $\\mathbf{P}$ carries a delightful algebraic superpower called **idempotence** ($\\mathbf{P}^2 = \\mathbf{P}$). In plain English: once you have dropped a point onto the floor, dropping it onto the floor a second time changes nothing—it already rests on the floor!\n\n---",
          "ar": "تخيل أنك تقف في بهو قصر فسيح ذي سقف شاهق الارتفاع، وتمسك بزمام طائرة مسيرة صغيرة تطفو في الهواء عند النقطة $\\mathbf{b}$. إذا أردت معرفة: *ما هي أقرب نقطة على أرضية البهو الرخامية إلى هذه الطائرة المعلقة؟* فكيف تحددها؟ لن تلجأ للتخمين بالنظر بزوايا مائلة؛ بل ستستخدم الأداة التي اعتمد عليها البناؤون منذ آلاف السنين: **الشاقول** (Plumb Line)، وهو خيط متين يتدلى في نهايته ثقل معدني تسحبه الجاذبية نحو الأسفل مباشرة. النقطة التي يلامس فيها الثقل الأرضية الرخامية بزاوية قائمة صارمة $90^\\circ$ هي **الإسقاط المتعامد** $\\mathbf{p}$.\n\nلماذا تكون هذه النقطة الشاقولية هي الأقرب حتماً دون أدنى شك؟ لأنك إذا اخترت *أي نقطة بديلة أخرى* على الأرضية مهما كانت قريبة، فإن تلك النقطة ستشكل مع الطائرة ونقطة الشاقول مثلثاً قائم الزاوية. وبحسب مبرهنة فيثاغورس، فإن المسافة إلى تلك النقطة البديلة هي وتر المثلث ($c^2 = a^2 + b^2$)، والوتر أطول قطعاً من الضلع القائم الرأسي. السقوط العمودي هو أقصر مسار أوجدته الطبيعة في الفضاء.\n\nفي علم البيانات التطبيقي والتعلم الآلي، نواجه دائماً حقيقة واقعية لا مفر منها: البيانات التجريبية المشوبة بالضجيج لا تتطابق أبداً مع نماذجنا الرياضية بدقة مثالية. فعندما نجمع مشاهدات العالم الواقعي $\\mathbf{b}$، فإن هذا المتجه يطفو في الفضاء خارج فضاء ميزات النموذج $C(\\mathbf{A})$. المعادلة $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ مستحيلة الحل تماماً! ونحن لا نملك القدرة على تغيير قوانين الواقع لتلائم نموذجنا.\n\nبدلاً من الاستسلام، نصنع أفضل بديل متاح في الكون: نسقط شاقولاً رياضياً من حقيقة الواقع $\\mathbf{b}$ عمودياً على فضاء النموذج! هذا التقريب الخطي الأقرب لحقيقة الواقع هو الإسقاط المتعامد $\\mathbf{p} = \\mathbf{A}\\hat{\\mathbf{x}}$. وتمتلك مصفوفة الإسقاط $\\mathbf{P}$ ميزة جبرية ساحرة تُعرف بـ **الصمود التكراري** (Idempotence: $\\mathbf{P}^2 = \\mathbf{P}$). ومعناها البسيط والعميق: بمجرد أن تسقط نقطة على الأرض، فإن محاولة إسقاطها مرة أخرى لن تغير شيئاً؛ فهي مستقرة بالفعل على الأرض!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{p} = \\mathbf{P}\\mathbf{b} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\mathbf{b}, \\quad \\mathbf{P}^2 = \\mathbf{P}, \\quad \\mathbf{P}^T = \\mathbf{P}",
        "formulaNote": {
          "en": "Mathematical anchor for Orthogonal Projections & Least Squares Approximation.",
          "ar": "المرساة الرياضية لـ الإسقاطات المتعامدة وتقريب المربعات الصغرى."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{p} = \\mathbf{P}\\mathbf{b}$ | Orthogonal Projection Vector | The point inside subspace $C(\\mathbf{A})$ closest to external target vector $\\mathbf{b}$. |\n| $\\mathbf{P} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T$ | Projection Matrix Operator | The linear operator that projects any vector perpendicularly onto the column space of $\\mathbf{A}$. |\n| $\\mathbf{A}^T\\mathbf{A}$ | Gram Matrix | The symmetric square matrix of column inner products; invertible if $\\mathbf{A}$ has full column rank. |\n| $\\mathbf{e} = \\mathbf{b} - \\mathbf{p}$ | Residual Error Vector | The plumb line vector: represents the perpendicular difference dropped from $\\mathbf{b}$ onto $\\mathbf{p}$. |\n| $\\mathbf{P}^2 = \\mathbf{P}$ | Idempotence | Dropping an already-projected vector onto the subspace leaves it strictly unchanged. |\n| $\\mathbf{P}^T = \\mathbf{P}$ | Symmetry | Algebraic guarantee that the projection angle is strictly perpendicular ($90^\\circ$ orthogonal). |\n\n##### Why the Math Works Step-by-Step\n1. **Deriving the master projection formula $\\mathbf{P} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T$:**\n   Since the projection $\\mathbf{p}$ must live inside the column space $C(\\mathbf{A})$, it can be written as some linear combination of the columns of $\\mathbf{A}$:\n   $$\\mathbf{p} = \\mathbf{A}\\hat{\\mathbf{x}}$$\n   The plumb line error vector is $\\mathbf{e} = \\mathbf{b} - \\mathbf{p} = \\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}$.\n   To be the closest possible point, this error vector must stand at a strict $90^\\circ$ right angle to *every single column* of matrix $\\mathbf{A}$:\n   $$\\mathbf{A}^T \\mathbf{e} = \\mathbf{0} \\implies \\mathbf{A}^T (\\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}) = \\mathbf{0}$$\n   Expanding and distributing $\\mathbf{A}^T$:\n   $$\\mathbf{A}^T \\mathbf{b} - \\mathbf{A}^T\\mathbf{A}\\hat{\\mathbf{x}} = \\mathbf{0} \\implies \\mathbf{A}^T\\mathbf{A}\\hat{\\mathbf{x}} = \\mathbf{A}^T\\mathbf{b}$$\n   These are the famous **Normal Equations**! Assuming the columns of $\\mathbf{A}$ are linearly independent, the square matrix $\\mathbf{A}^T\\mathbf{A}$ is invertible:\n   $$\\hat{\\mathbf{x}} = (\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\mathbf{b}$$\n   To find the physical projected vector $\\mathbf{p}$, substitute $\\hat{\\mathbf{x}}$ back into $\\mathbf{p} = \\mathbf{A}\\hat{\\mathbf{x}}$:\n   $$\\mathbf{p} = \\mathbf{A} [(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\mathbf{b}] = \\left[\\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\right] \\mathbf{b} = \\mathbf{P}\\mathbf{b}$$\n2. **Proof of Idempotence ($\\mathbf{P}^2 = \\mathbf{P}$):**\n   $$\\mathbf{P}^2 = \\left[\\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\right] \\left[\\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\right]$$\n   Notice the middle terms: $[(\\mathbf{A}^T\\mathbf{A})^{-1}][\\mathbf{A}^T\\mathbf{A}] = \\mathbf{I}$ (the identity matrix). Thus:\n   $$\\mathbf{P}^2 = \\mathbf{A} \\cdot \\mathbf{I} \\cdot (\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T = \\mathbf{P}$$\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{p} = \\mathbf{P}\\mathbf{b}$ | متجه الإسقاط المتعامد | أقرب نقطة داخل فضاء النموذج $C(\\mathbf{A})$ إلى المتجه المستهدف الخارجي $\\mathbf{b}$. |\n| $\\mathbf{P} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T$ | مصفوفة مؤثر الإسقاط | المؤثر الخطي الشامل الذي يسقط أي متجه عمودياً بزاوية $90^\\circ$ على فضاء أعمدة $\\mathbf{A}$. |\n| $\\mathbf{A}^T\\mathbf{A}$ | مصفوفة غرام | مصفوفة مربعة متناظرة لحواضل الضرب الداخلي؛ وتكون قابلة للقلب إذا كانت أعمدة $\\mathbf{A}$ مستقلة خطياً. |\n| $\\mathbf{e} = \\mathbf{b} - \\mathbf{p}$ | متجه خطأ الشاقول | خيط الشاقول الفيزيائي: يمثل الفارق المتعامد بين حقيقة الواقع $\\mathbf{b}$ وتقريب النموذج $\\mathbf{p}$. |\n| $\\mathbf{P}^2 = \\mathbf{P}$ | خاصية الصمود التكراري | إعادة إسقاط متجه مستقر على الفضاء تبقيه في مكانه تماماً دون أي إزاحة إضافية. |\n| $\\mathbf{P}^T = \\mathbf{P}$ | التناظر الجبري | الضمان الرياضي الحاسم بأن زاوية السقوط عمودية تماماً وليست مائلة. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **اشتقاق المعادلة الأم للإسقاط $\\mathbf{P} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T$:**\n   بما أن النقطة المسقطة $\\mathbf{p}$ تقع داخل فضاء الأعمدة $C(\\mathbf{A})$، فإنها تساوي تركيباً خطياً لأعمدة المصفوفة:\n   $$\\mathbf{p} = \\mathbf{A}\\hat{\\mathbf{x}}$$\n   ومتجه خطأ الشاقول هو $\\mathbf{e} = \\mathbf{b} - \\mathbf{p} = \\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}$.\n   ولكي تكون هذه النقطة هي الأقرب على الإطلاق، يجب أن يتعامد خيط الشاقول مع *كل عمود* من أعمدة المصفوفة $\\mathbf{A}$:\n   $$\\mathbf{A}^T \\mathbf{e} = \\mathbf{0} \\implies \\mathbf{A}^T (\\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}) = \\mathbf{0}$$\n   بفك الأقواس وتوزيع $\\mathbf{A}^T$:\n   $$\\mathbf{A}^T \\mathbf{b} - \\mathbf{A}^T\\mathbf{A}\\hat{\\mathbf{x}} = \\mathbf{0} \\implies \\mathbf{A}^T\\mathbf{A}\\hat{\\mathbf{x}} = \\mathbf{A}^T\\mathbf{b}$$\n   هذه هي **المعادلات الطبيعية** (Normal Equations) الشهيرة! وبقلب المصفوفة المربعة:\n   $$\\hat{\\mathbf{x}} = (\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\mathbf{b}$$\n   وللحصول على موقع النقطة المسقطة $\\mathbf{p}$، نعوض بقيمة $\\hat{\\mathbf{x}}$:\n   $$\\mathbf{p} = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\mathbf{b} = \\mathbf{P}\\mathbf{b}$$\n2. **برهان الصمود التكراري ($\\mathbf{P}^2 = \\mathbf{P}$):**\n   $$\\mathbf{P}^2 = \\left[\\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\right] \\left[\\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T\\right]$$\n   لاحظ المقدار في المنتصف: $[(\\mathbf{A}^T\\mathbf{A})^{-1}][\\mathbf{A}^T\\mathbf{A}] = \\mathbf{I}$ (مصفوفة الوحدة المحايدة)، فيختزل التعبير فوراً إلى:\n   $$\\mathbf{P}^2 = \\mathbf{A}(\\mathbf{A}^T\\mathbf{A})^{-1}\\mathbf{A}^T = \\mathbf{P}$$"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-12",
          "starterCode": "def project_onto_line(a: np.ndarray, b: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Project target vector b orthogonally onto the 1D subspace line spanned by vector a.\n\n    Intuition\n    ---------\n    Orthogonal projection finds the point p along line a closest to point b.\n    Geometrically, the error vector (b - p) is perpendicular to direction a,\n    yielding scalar multiplier c = (a . b) / (a . a) and projection p = c * a.\n\n    Parameters\n    ----------\n    a : np.ndarray of shape (D,)\n        Direction vector defining the 1D line subspace (must be non-zero).\n    b : np.ndarray of shape (D,)\n        Target vector to be projected.\n\n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Projected vector p = (a^T b / a^T a) * a.\n\n    Raises\n    ------\n    ValueError\n        If direction vector a is a zero vector.\n    \"\"\"\n    # Step 1: Compute the dot product of direction vector a with itself (squared length)\n    # Step 2: Compute the dot product of direction vector a with target vector b\n    # Step 3: Compute scalar projection coefficient c = (a . b) / (a . a)\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def project_onto_line(a: np.ndarray, b: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Project target vector b orthogonally onto the 1D subspace line spanned by vector a.\n\n    Intuition\n    ---------\n    Orthogonal projection finds the point p along line a closest to point b.\n    Geometrically, the error vector (b - p) is perpendicular to direction a,\n    yielding scalar multiplier c = (a . b) / (a . a) and projection p = c * a.\n\n    Parameters\n    ----------\n    a : np.ndarray of shape (D,)\n        Direction vector defining the 1D line subspace (must be non-zero).\n    b : np.ndarray of shape (D,)\n        Target vector to be projected.\n\n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Projected vector p = (a^T b / a^T a) * a.\n\n    Raises\n    ------\n    ValueError\n        If direction vector a is a zero vector.\n    \"\"\"\n    # Step 1: Compute the dot product of direction vector a with itself (squared length)\n    # Step 2: Compute the dot product of direction vector a with target vector b\n    # Step 3: Compute scalar projection coefficient c = (a . b) / (a . a)\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "array([3., 0.])"
            }
          },
          "solution": "import numpy as np\n\ndef project_onto_line(a: np.ndarray, b: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Project target vector b orthogonally onto the 1D subspace line spanned by vector a.\n\n    Intuition\n    ---------\n    Orthogonal projection finds the point p along line a closest to point b.\n    Geometrically, the error vector (b - p) is perpendicular to direction a,\n    yielding scalar multiplier c = (a . b) / (a . a) and projection p = c * a.\n\n    Parameters\n    ----------\n    a : np.ndarray of shape (D,)\n        Direction vector defining the 1D line subspace (must be non-zero).\n    b : np.ndarray of shape (D,)\n        Target vector to be projected.\n\n    Returns\n    -------\n    np.ndarray of shape (D,)\n        Projected vector p = (a^T b / a^T a) * a.\n\n    Raises\n    ------\n    ValueError\n        If direction vector a is a zero vector.\n    \"\"\"\n    # Step 1: Compute the dot product of direction vector a with itself (squared length)\n    dot_aa = float(np.dot(a, a))\n    if np.isclose(dot_aa, 0.0):\n        raise ValueError(\"Direction vector a must be non-zero to define a line.\")\n\n    # Step 2: Compute the dot product of direction vector a with target vector b\n    dot_ab = float(np.dot(a, b))\n\n    # Step 3: Compute scalar projection coefficient c = (a . b) / (a . a)\n    scalar_proj = dot_ab / dot_aa\n\n    # Step 4: Scale direction vector a by the scalar coefficient to obtain projection p\n    return scalar_proj * a"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "Let $\\mathbf{P}$ be an orthogonal projection matrix onto a linear subspace $S$. If we apply the projection matrix twice in succession to any vector $\\mathbf{v}$, what is the value of $\\mathbf{P}(\\mathbf{P}\\mathbf{v})$?",
            "ar": "لتكن $\\mathbf{P}$ مصفوفة إسقاط متعامد على فضاء فرعي $S$. إذا طبقنا مصفوفة الإسقاط مرتين متتاليتين على أي متجه $\\mathbf{v}$، فما هي قيمة $\\mathbf{P}(\\mathbf{P}\\mathbf{v})$؟"
          },
          "options": [
            {
              "text": {
                "en": "$\\mathbf{P}\\mathbf{v}$, because once a vector is projected into subspace $S$, it already lies entirely inside $S$, so projecting it again produces zero further change (idempotence $\\mathbf{P}^2 = \\mathbf{P}$).",
                "ar": "$\\mathbf{P}\\mathbf{v}$، لأن المتجه بمجرد إسقاطه في الفضاء $S$ يصبح واقعاً فيه بالكامل، وإعادة إسقاطه لن تحدث أي تغيير إضافي (خاصية الصمود $\\mathbf{P}^2 = \\mathbf{P}$).\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Idempotence ($\\mathbf{P}^2 = \\mathbf{P}$) is the definitive mathematical fingerprint of projection. Geometrically, dropping a heavy weight onto the floor and then dropping it onto the floor again leaves it in the exact same spot on the floor.",
                "ar": "الصمود التكراري ($\\mathbf{P}^2 = \\mathbf{P}$) هو البصمة الجبرية المميزة لمصفوفات الإسقاط. وهندسياً، إسقاط ثقل على الأرض ثم محاولة إسقاطه ثانية يبقيه في نفس النقطة الرخامية على الأرض دون حراك."
              }
            },
            {
              "text": {
                "en": "Zero vector $\\mathbf{0}$, because repeated projection cancels out all vector components.",
                "ar": "المتجه الصفري $\\mathbf{0}$، لأن تكرار الإسقاط يلغي كافة مركبات المتجه.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Projecting preserves the vector's shadow component inside $S$; it only discards the perpendicular component once.",
                "ar": "الإسقاط لا يلغي المتجه، بل يحافظ على مركبته المستقرة داخل فضاء الإسقاط $S$؛ وهو يحذف المركبة العمودية مرة واحدة فقط ولا يحذف المتجه بأكمله."
              }
            },
            {
              "text": {
                "en": "$2 \\cdot \\mathbf{P}\\mathbf{v}$, because the transformation was executed twice.",
                "ar": "$2 \\cdot \\mathbf{P}\\mathbf{v}$، لأن التحويل نُفذ مرتين متعاقبتين.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Matrix multiplication composes geometric operations; it does not add them algebraically.",
                "ar": "ضرب المصفوفات يركب التحويلات الهندسية ولا يجمعها حسابياً."
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
    "id": "t1-13",
    "title": "Eigenvalues & Eigenvectors: Invariant Directions of Space",
    "titleAr": "القيم الذاتية والمتجهات الذاتية: الاتجاهات الصامدة في الفضاء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine rolling out pizza dough on a kitchen counter, or pulling firmly on a flexible printed rubber sheet with both hands.",
      "ar": "تخيل أنك تفرد عجينة بيتزا على طاولة المطبخ، أو تشد شريحة مطاطية مرنة رُسمت عليها أشكال هندسية بيدك في اتجاهين متضادين قطرياً."
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
          "en": "Imagine rolling out pizza dough on a kitchen counter, or pulling firmly on a flexible printed rubber sheet with both hands. If you grab opposite diagonal corners and yank outward, almost every geometric shape printed on the rubber gets warped, skewed, and twisted. A circle distorts into a slanted ellipse. A small arrow drawn pointing Northeast gets dragged into pointing East-Southeast. When a general linear transformation acts on the space around it, it whips vectors around like leaves in a windstorm, modifying both their lengths and their pointing directions simultaneously.\n\nYet, if you look closely along the exact diagonal line of your pull, you will witness something extraordinary: arrows pointing directly along that diagonal axis do not turn by even a fraction of a degree! They stretch straight outward, remaining perfectly aligned with their original line of action. Likewise, arrows pointing along the perpendicular diagonal compress straight inward without rotating at all. For virtually every linear transformation, there exist these special, magical axes of space that refuse to be rotated. These invariant directions are the **eigenvectors** (from the German *eigen*, meaning \"own,\" \"characteristic,\" or \"innate\").\n\nThe scalar factor by which an eigenvector stretches, shrinks, or reverses is its **eigenvalue** ($\\lambda$). If an eigenvector has an eigenvalue of $\\lambda = 3$, applying the matrix triples its length along that same line. If $\\lambda = 0.5$, the vector contracts by half. If $\\lambda = -1$, the arrow flips $180^\\circ$ backwards, pointing in reverse along the exact same line. And if $\\lambda = 0$, the entire axis gets crushed into the origin, losing a spatial dimension completely. Eigenvectors reveal the true natural coordinates of a transformation—the invisible axes along which the matrix acts simply as scalar multiplication.\n\nConsider another intuitive physical analogy: a globe spinning on its pedestal or a basketball twirling atop an athlete's finger. As the globe spins, every single city on the surface sweeps out circles, continuously altering its instantaneous direction of motion. However, the line connecting the North Pole to the South Pole remains completely stationary in space. Every point along that rotational axis continues to point along the exact same line. The rotational axis is an eigenvector of the 3D rotation, corresponding to an eigenvalue of $\\lambda = 1$.\n\n---",
          "ar": "تخيل أنك تفرد عجينة بيتزا على طاولة المطبخ، أو تشد شريحة مطاطية مرنة رُسمت عليها أشكال هندسية بيدك في اتجاهين متضادين قطرياً. عندما تسحب الشريحة بقوة، ستلاحظ أن كافة الدوائر والخطوط المرسومة عليها تتشوه وتلتوي؛ فالدائرة تتحول إلى قطع ناقص مائل، والمتجه الذي كان يشير إلى الشمال الشرقي ينحرف مجبراً ليشير إلى الشرق والجنوب. هذا ما يفعله أي تحويل خطي عام في الفضاء: إنه يعصف بالمتجهات كأوراق شجر في مهب الريح، مغيرّاً أطوالها وزوايا اتجاهاتها في آن واحد.\n\nومع ذلك، إذا دققت النظر على طول الخط القطري المباشر ليدك الساحبة، فستكتشف ظاهرة هندسية مذهلة: الأسهم والمتجهات التي كانت مرسومة مباشرة على امتداد ذلك المحور القطري لم تنحرف أو تدر بمقدار جزء من الدرجة! لقد تمددت في خط مستقيم للأمام مع بقائها منطبقة تماماً على خط استقامتها الأصلي. وبالمثل، فإن المتجهات الواقعة على المحور العمودي على خط السحب تنكمش للداخل دون أي دوران. لكل تحويل خطي تقريباً في الكون اتجاهات سحرية فريدة ترفض الدوران وتصمد أمام التشويه؛ هذه المحاور الاستثنائية هي ما نطلق عليه **المتجهات الذاتية** (Eigenvectors، والمشتقة من الكلمة الألمانية *eigen* التي تعني \"الخاص\" أو \"الأصيل\").\n\nالمعامل العددي الذي يتمدد أو ينكمش به هذا المتجه الذاتي هو **القيمة الذاتية** ($\\lambda$). إذا كانت القيمة الذاتية لمتجه ما هي $\\lambda = 3$، فإن تأثير المصفوفة عليه يقتصر على مضاعفة طوله ثلاث مرات على نفس امتداده. وإذا كانت $\\lambda = 0.5$، فإنه ينكمش إلى نصف طوله. وإذا كانت $\\lambda = -1$، فإن السهم ينعكس بزاوية $180^\\circ$ ليشير للخلف على نفس خط العمل تماماً. أما إذا كانت $\\lambda = 0$، فإن المحور بأكمله يُسحق إلى نقطة الأصل ويفقد الفضاء أحد أبعاده. المتجهات الذاتية تكشف الهيكل العظمي الطبيعي للتحويل، حيث تتردّى المصفوفة المعقدة لتصبح مجرد ضرب عددي بسيط.\n\nتأمل مثالاً حسياً آخر: دوران مجسم الكرة الأرضية في معمل الجغرافيا أو دوران كرة السلة على طرف إصبعك. أثناء الدوران السريع، تدور كل قارة ومدينة على سطح الكرة في مسار دائري مغلق يتغير اتجاه حركته في كل لحظة؛ باستثناء محور واحد فقط: الخط المستقيم الواصل بين القطب الشمالي والقطب الجنوبي يظل ساكناً في الفضاء ومشيراً إلى نفس الاتجاه الأصلي دون أي انحراف! هذا المحور القطبي هو متجه ذاتي لهذا الدوران ثلاثي الأبعاد، وقيمته الذاتية تساوي $\\lambda = 1$."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v} \\iff (\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{v} = \\mathbf{0}, \\quad \\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0",
        "formulaNote": {
          "en": "Mathematical anchor for Eigenvalues & Eigenvectors: Invariant Directions of Space.",
          "ar": "المرساة الرياضية لـ القيم الذاتية والمتجهات الذاتية: الاتجاهات الصامدة في الفضاء."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{A} \\in \\mathbb{R}^{n \\times n}$ | Transformation Matrix | A square linear operator that transforms vectors in $n$-dimensional space. |\n| $\\mathbf{v} \\in \\mathbb{R}^n \\setminus \\{\\mathbf{0}\\}$ | Eigenvector | A non-zero directional arrow that experiences zero rotation when operated on by $\\mathbf{A}$. |\n| $\\lambda \\in \\mathbb{R}$ (or $\\mathbb{C}$) | Eigenvalue | The scalar scaling factor indicating how much vector $\\mathbf{v}$ stretches, shrinks, or flips. |\n| $\\mathbf{A}\\mathbf{v}$ | Matrix-Vector Product | The actual spatial output when matrix $\\mathbf{A}$ acts on coordinate vector $\\mathbf{v}$. |\n| $\\lambda \\mathbf{v}$ | Scaled Vector | Proves that the matrix action is geometrically identical to pure scalar multiplication along line $\\mathbf{v}$. |\n| $\\mathbf{I} \\in \\mathbb{R}^{n \\times n}$ | Identity Matrix | The matrix equivalent of the number $1$; enables subtracting scalar $\\lambda$ from matrix $\\mathbf{A}$. |\n| $\\mathbf{A} - \\lambda \\mathbf{I}$ | Shifted Characteristic Matrix | The transformation shifted by $\\lambda$; squashes the eigenvector direction into the zero vector. |\n| $\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$ | Characteristic Equation | Polynomial root condition; ensures matrix $(\\mathbf{A} - \\lambda \\mathbf{I})$ collapses volume and has a non-trivial nullspace. |\n\n##### Why the Math Works Step-by-Step\n1. **Why can matrix action become scalar multiplication?** For arbitrary vectors, matrix multiplication $\\mathbf{A}\\mathbf{x}$ changes both length and direction. But along an eigenvector, the directional output $\\mathbf{A}\\mathbf{v}$ is parallel to the input $\\mathbf{v}$. Thus, the complex matrix operation collapses to simple scaling: $\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}$.\n2. **Why do we insert the identity matrix $\\mathbf{I}$?** In algebra, moving terms to one side yields $\\mathbf{A}\\mathbf{v} - \\lambda \\mathbf{v} = \\mathbf{0}$. We cannot factor out $\\mathbf{v}$ as $(\\mathbf{A} - \\lambda)\\mathbf{v}$ because subtracting a scalar $\\lambda$ from a 2D matrix $\\mathbf{A}$ is mathematically undefined. Multiplying $\\lambda$ by the identity matrix $\\mathbf{I}$ creates an $n \\times n$ diagonal matrix, allowing valid matrix subtraction: $(\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{v} = \\mathbf{0}$.\n3. **Why must the determinant equal zero?** The equation $(\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{v} = \\mathbf{0}$ states that the matrix $(\\mathbf{A} - \\lambda \\mathbf{I})$ maps a non-zero vector $\\mathbf{v}$ to $\\mathbf{0}$. If $(\\mathbf{A} - \\lambda \\mathbf{I})$ were invertible, we could multiply both sides by its inverse to get $\\mathbf{v} = (\\mathbf{A} - \\lambda \\mathbf{I})^{-1}\\mathbf{0} = \\mathbf{0}$, which contradicts the definition of an eigenvector ($\\mathbf{v} \\ne \\mathbf{0}$). Therefore, the matrix must be singular (non-invertible), which requires its volume scaling factor—the determinant—to equal zero: $\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$.\n4. **Why are eigenvectors lines rather than isolated points?** If $\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}$, then for any scalar $c \\ne 0$, we have $\\mathbf{A}(c\\mathbf{v}) = c(\\mathbf{A}\\mathbf{v}) = c(\\lambda \\mathbf{v}) = \\lambda(c\\mathbf{v})$. Scaling an eigenvector produces another eigenvector with the exact same eigenvalue. Thus, an eigenvector defines an entire invariant 1D subspace (a line through the origin), often standardized to unit length ($\\|\\mathbf{v}\\|_2 = 1$).\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{A} \\in \\mathbb{R}^{n \\times n}$ | مصفوفة التحويل | مؤثر خطي مربع يؤثر على المتجهات في فضاء ذي $n$ بعداً. |\n| $\\mathbf{v} \\in \\mathbb{R}^n \\setminus \\{\\mathbf{0}\\}$ | المتجه الذاتي (Eigenvector) | سهم اتجاهي غير صفري لا يعاني من أي دوران إطلاقاً عند التأثير عليه بالمصفوفة $\\mathbf{A}$. |\n| $\\lambda \\in \\mathbb{R}$ | القيمة الذاتية (Eigenvalue) | المعامل القياسي الذي يحدد مقدار تمدد أو انكماش أو انعكاس المتجه $\\mathbf{v}$. |\n| $\\mathbf{A}\\mathbf{v}$ | حاصل ضرب المصفوفة في المتجه | المخرج المكاني الفعلي بعد تطبيق التحويل الخطي للمصفوفة $\\mathbf{A}$ على المتجه $\\mathbf{v}$. |\n| $\\lambda \\mathbf{v}$ | المتجه المضاعف قياسياً | إثبات هندسي على أن تأثير المصفوفة يطابق تماماً مجرد تمدد عددي بسيط على طول نفس خط المتجه. |\n| $\\mathbf{I} \\in \\mathbb{R}^{n \\times n}$ | مصفوفة الوحدة | المعادل المصفوفي للرقم $1$؛ يسمح بطرح القيمة القياسية $\\lambda$ من المصفوفة $\\mathbf{A}$ بشكل رياضي سليم. |\n| $\\mathbf{A} - \\lambda \\mathbf{I}$ | المصفوفة المميزة المزاحة | تحويل خطي مُزاح بمقدار $\\lambda$؛ يسحق اتجاه المتجه الذاتي ليحوله إلى المتجه الصفري. |\n| $\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$ | المعادلة المميزة | شرط انعدام المحدد؛ يضمن أن المصفوفة شاذة تسحق الحجم ولها فضاء صفري غير تافه يحتوي حتماً على المتجه الذاتي. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **كيف يتحول تأثير مصفوفة معقدة إلى مجرد ضرب عددي؟** في الحالة العامة، يؤدي ضرب مصفوفة في متجه إلى تغيير طوله وزاويته معاً؛ ولكن على طول المتجه الذاتي، يكون الناتج $\\mathbf{A}\\mathbf{v}$ موازياً تماماً للمدخل $\\mathbf{v}$. هنا يتردّى التأثير الهندسي للمصفوفة إلى مجرد شد قياسي خالص: $\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}$.\n2. **لماذا نقحم مصفوفة الوحدة $\\mathbf{I}$ في المعادلة؟** جبرياً، عند نقل الحدود لطرف واحد نحصل على $\\mathbf{A}\\mathbf{v} - \\lambda \\mathbf{v} = \\mathbf{0}$. لا يمكننا أخذ $\\mathbf{v}$ عاملاً مشتركاً بصيغة $(\\mathbf{A} - \\lambda)\\mathbf{v}$ لأن طرح عدد قياسي من مصفوفة مربعة غير معرّف رياضياً. لذا نضرب $\\lambda$ في مصفوفة الوحدة $\\mathbf{I}$ لتوليد مصفوفة قطرية متوافقة تسمح بالطرح المصفوفي السليم: $(\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{v} = \\mathbf{0}$.\n3. **لماذا يجب أن ينعدم المحدد تماماً؟** تعني المعادلة $(\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{v} = \\mathbf{0}$ أن المصفوفة المزاحة تقوم بسحق متجه غير صفري $\\mathbf{v}$ إلى الصفر. ولو كانت هذه المصفوفة قابلة للعكس، لضربنا طرفي المعادلة بمعكوسها وحصلنا على $\\mathbf{v} = \\mathbf{0}$، وهذا يناقض تعريف المتجه الذاتي المشترط لكونه غير صفري. بالتالي يجب أن تكون المصفوفة شاذة وغير قابلة للعكس، وهو ما يقتضي هندسياً أن يكون عامل تحجيم الحجم (المحدد) مساوياً للصفر تماماً: $\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$.\n4. **لماذا تشكل المتجهات الذاتية خطوطاً كاملة وليس نقاطاً معزولة؟** إذا كانت $\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}$، فإن ضرب المتجه في أي عدد حقيقي $c \\ne 0$ يعطي $\\mathbf{A}(c\\mathbf{v}) = c\\mathbf{A}\\mathbf{v} = c\\lambda \\mathbf{v} = \\lambda(c\\mathbf{v})$. تحجيم المتجه الذاتي ينتج متجهاً ذاتياً آخر يمتلك نفس القيمة الذاتية تماماً؛ فالمتجه الذاتي يمثل خطاً هندسياً كاملاً في الفضاء، ويتم تقييده عادة بجعل طوله مساوياً للوحدة ($\\|\\mathbf{v}\\|_2 = 1$)."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-13",
          "starterCode": "def power_iteration(A: np.ndarray, num_iter: int = 50) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Compute the dominant eigenvalue and eigenvector of matrix A via power iteration.\n\n    Intuition\n    ---------\n    Repeatedly applying matrix A to a generic vector stretches the component\n    along the dominant eigenvector faster than any other direction. Normalizing\n    the vector at each step prevents numerical overflow and causes the vector\n    to converge directly onto the principal invariant axis. The Rayleigh quotient\n    then computes the corresponding dominant eigenvalue.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (N, N)\n        Square matrix with a distinct dominant eigenvalue.\n    num_iter : int\n        Number of power iteration steps.\n\n    Returns\n    -------\n    tuple[float, np.ndarray]\n        dominant_eigenvalue: Estimated Rayleigh quotient scalar lambda.\n        dominant_eigenvector: Normalized unit eigenvector v.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def power_iteration(A: np.ndarray, num_iter: int = 50) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Compute the dominant eigenvalue and eigenvector of matrix A via power iteration.\n\n    Intuition\n    ---------\n    Repeatedly applying matrix A to a generic vector stretches the component\n    along the dominant eigenvector faster than any other direction. Normalizing\n    the vector at each step prevents numerical overflow and causes the vector\n    to converge directly onto the principal invariant axis. The Rayleigh quotient\n    then computes the corresponding dominant eigenvalue.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (N, N)\n        Square matrix with a distinct dominant eigenvalue.\n    num_iter : int\n        Number of power iteration steps.\n\n    Returns\n    -------\n    tuple[float, np.ndarray]\n        dominant_eigenvalue: Estimated Rayleigh quotient scalar lambda.\n        dominant_eigenvector: Normalized unit eigenvector v.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "5.0"
            }
          },
          "solution": "import numpy as np\n\ndef power_iteration(A: np.ndarray, num_iter: int = 50) -> tuple[float, np.ndarray]:\n    \"\"\"\n    Compute the dominant eigenvalue and eigenvector of matrix A via power iteration.\n\n    Intuition\n    ---------\n    Repeatedly applying matrix A to a generic vector stretches the component\n    along the dominant eigenvector faster than any other direction. Normalizing\n    the vector at each step prevents numerical overflow and causes the vector\n    to converge directly onto the principal invariant axis. The Rayleigh quotient\n    then computes the corresponding dominant eigenvalue.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (N, N)\n        Square matrix with a distinct dominant eigenvalue.\n    num_iter : int\n        Number of power iteration steps.\n\n    Returns\n    -------\n    tuple[float, np.ndarray]\n        dominant_eigenvalue: Estimated Rayleigh quotient scalar lambda.\n        dominant_eigenvector: Normalized unit eigenvector v.\n    \"\"\"\n    # Step 1: Initialize a normalized uniform unit vector v of length N\n    # v = np.ones(A.shape[0]) / np.sqrt(A.shape[0])\n\n    # Step 2: Iteratively multiply by matrix A and normalize to unit length\n    # for _ in range(num_iter):\n    #     v = A @ v\n    #     v = v / np.linalg.norm(v)\n\n    # Step 3: Compute Rayleigh quotient eigenvalue lambda = v^T @ A @ v and return\n    # lam = float(v.T @ A @ v)\n    # return lam, v\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
    "id": "t1-14",
    "title": "The Spectral Theorem & Symmetric Eigendecomposition",
    "titleAr": "المبرهنة الطيفية والتفكيك القيمي الذاتي المتناظر",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine tapping on a tightly stretched circular drum skin, or plucking a tuned guitar string.",
      "ar": "تخيل أنك تنقر على غشاء طبلة مشدود بإحكام، أو تعزف على وتر عود مشدود. في الطبيعة الفيزيائية، يُعد التوازن التبادلي قانوناً صارماً: فوفقاً..."
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
          "en": "Imagine tapping on a tightly stretched circular drum skin, or plucking a tuned guitar string. In physical nature, reciprocal balance is an iron law: according to Newton's third law of motion, whenever particle $i$ exerts a force on particle $j$, particle $j$ exerts an equal and opposite reciprocal force back on particle $i$. In linear algebra, this reciprocal symmetry is captured by a **symmetric matrix** ($\\mathbf{A} = \\mathbf{A}^T$), where the interaction between coordinate $i$ and coordinate $j$ exactly mirrors the interaction between coordinate $j$ and coordinate $i$ ($A_{ij} = A_{ji}$).\n\nWhen an arbitrary, asymmetric matrix transforms space, it can shear, tilt, and twist axes unevenly. Its eigenvectors can lean awkwardly at slanted angles, and its eigenvalues can become complex imaginary numbers—corresponding to spiraling vortices and rotations in space. But when a matrix exhibits reciprocal symmetry ($\\mathbf{A} = \\mathbf{A}^T$), all chaotic shearing and imaginary swirling vanish completely. The **Spectral Theorem**—celebrated as one of the supreme achievements of mathematics—guarantees that every single eigenvalue of a real symmetric matrix is guaranteed to be a pure real number!\n\nEven more profoundly, the Spectral Theorem guarantees that the eigenvectors of a symmetric matrix can always be chosen to be **mutually perpendicular (orthogonal)** to each other. There are no skewed angles or warped coordinate grids. Geometrically, a symmetric transformation never shears space; it behaves like a perfect physical stretching machine. In three simple geometric stages, it: (1) rigidly rotates your space into an aligned coordinate frame ($\\mathbf{Q}^T$), (2) stretches space purely along those perpendicular axes by real factors $\\lambda_i$ ($\\mathbf{\\Lambda}$), and (3) rigidly rotates the frame back to its original orientation ($\\mathbf{Q}$).\n\nBecause the eigenvectors are mutually orthogonal unit vectors, the transformation can be dismantled into an additive sum of rank-1 building blocks: $\\mathbf{A} = \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T$. Each term $\\mathbf{q}_i \\mathbf{q}_i^T$ acts as an orthogonal projector, casting a shadow of any incoming vector onto axis $\\mathbf{q}_i$ and scaling it by $\\lambda_i$. This is called the **spectral decomposition**—named by analogy to optical physics, where a triangular glass prism breaks a beam of blended white light into its independent, pure spectral wavelengths.\n\n---",
          "ar": "تخيل أنك تنقر على غشاء طبلة مشدود بإحكام، أو تعزف على وتر عود مشدود. في الطبيعة الفيزيائية، يُعد التوازن التبادلي قانوناً صارماً: فوفقاً لقانون نيوتن الثالث، عندما يؤثر الجسيم $i$ بقوة على الجسيم $j$، فإن الجسيم $j$ يرد بقوة مساوية لها في المقدار ومعاكسة لها في الاتجاه. في لغة الجبر الخطي، ينعكس هذا التوازن المتبادل في **المصفوفة المتناظرة** ($\\mathbf{A} = \\mathbf{A}^T$)، حيث يكون تأثير المركبة $i$ على المركبة $j$ مطابقاً تماماً لتأثير $j$ على $i$ عبر القطر الرئيسي للمصفوفة ($A_{ij} = A_{ji}$).\n\nعندما تؤثر مصفوفة عامة غير متناظرة على الفضاء، فإنها قد تعصف به وتميل المحاور بزوايا ملتوية، وتنتج قيماً ذاتية عقدية (مركبة) تؤدي إلى دوامات والتواءات حلزونية في الفضاء. ولكن عندما تمتلك المصفوفة تناظراً تبادلياً حقيقياً ($\\mathbf{A} = \\mathbf{A}^T$)، يختفي هذا التشويه والاضطراب التخيلي تماماً! تأتي **المبرهنة الطيفية** (Spectral Theorem)—التي تُعد إحدى أعظم المفاخر الرياضية عبر التاريخ—لتمنحنا ضماناً قاطعاً: كل قيمة ذاتية لمصفوفة متناظرة حقيقية هي عدد حقيقي بحت وخالٍ تماماً من أي جذور تخيلية.\n\nوالأمر فائق الجمال هندسياً هو أن المبرهنة الطيفية تضمن أيضاً أن المتجهات الذاتية للمصفوفة المتناظرة تكون **متعامدة تماماً** (Orthogonal) مثنى مثنى بزوايا قائمة قياسها $90^\\circ$. لا توجد هنا زوايا مائلة أو محاور ملتوية؛ فالتحويل المتناظر لا يقص الفضاء أو يشوهه، بل يعمل كآلة شد هندسية مثالية. يتلخص تأثيره في ثلاث خطوات هندسية سلسة: (1) تدوير صلب للفضاء بزاوية معينة ($\\mathbf{Q}^T$) لجعله محاذياً للمحاور الذاتية، (2) شد وتمديد الفضاء على طول تلك المحاور المتعامدة بمقادير عددية حقيقية $\\lambda_i$ عبر المصفوفة القطرية ($\\mathbf{\\Lambda}$)، (3) إعادة الفضاء بتدوير صلب معاكس ($\\mathbf{Q}$).\n\nوبما أن المتجهات الذاتية تشكل أساساً متعامداً من متجهات الوحدة، فإن المصفوفة المتناظرة يمكن تفكيكها إلى مجموع من الإسقاطات المستقلة من الرتبة الأولى: $\\mathbf{A} = \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T$. كل حد $\\mathbf{q}_i \\mathbf{q}_i^T$ يعمل كمصباح إسقاط يسقط أي متجه على المحور $\\mathbf{q}_i$ بمقدار شدة $\\lambda_i$. يُسمى هذا **التفكيك الطيفي** تشبيهاً له بالموشور الزجاجي في علم البصريات، الذي يحلل حزمة الضوء الأبيض المركبة إلى أطياف ضوئية نقية ومستقلة تماماً."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A} \\in \\mathbb{R}^{n \\times n}, \\quad \\mathbf{A} = \\mathbf{A}^T \\implies \\mathbf{A} = \\mathbf{Q} \\mathbf{\\Lambda} \\mathbf{Q}^T = \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T",
        "formulaNote": {
          "en": "Mathematical anchor for The Spectral Theorem & Symmetric Eigendecomposition.",
          "ar": "المرساة الرياضية لـ المبرهنة الطيفية والتفكيك القيمي الذاتي المتناظر."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{A} = \\mathbf{A}^T$ | Symmetry Condition | The matrix equals its transpose; row interactions perfectly match column interactions ($A_{ij} = A_{ji}$). |\n| $\\mathbf{Q} \\in \\mathbb{R}^{n \\times n}$ | Orthogonal Eigenvector Matrix | A rigid rotation matrix whose columns are the mutually perpendicular unit eigenvectors ($\\mathbf{Q}^T\\mathbf{Q} = \\mathbf{I}$). |\n| $\\mathbf{\\Lambda} = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n)$ | Diagonal Eigenvalue Matrix | Contains the purely real scaling factors along the perpendicular eigenvector axes. |\n| $\\mathbf{Q}^T$ | Transposed Eigenbasis Transform | Projects arbitrary space onto the orthogonal eigenbasis; because $\\mathbf{Q}$ is orthogonal, $\\mathbf{Q}^{-1} = \\mathbf{Q}^T$. |\n| $\\mathbf{q}_i \\in \\mathbb{R}^n$ | Orthonormal Eigenvector | A unit-length vector ($\\|\\mathbf{q}_i\\|_2 = 1$) identifying an unrotated, independent axis of the transformation. |\n| $\\lambda_i \\in \\mathbb{R}$ | Real Eigenvalue | The physical stretch factor along axis $\\mathbf{q}_i$; guaranteed real with zero imaginary component. |\n| $\\mathbf{q}_i \\mathbf{q}_i^T \\in \\mathbb{R}^{n \\times n}$ | Rank-1 Projection Matrix | The outer product operator that projects any incoming vector orthogonally onto the 1D line spanned by $\\mathbf{q}_i$. |\n| $\\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T$ | Spectral Expansion | Expresses the entire complex matrix as a weighted sum of independent, 1D orthogonal projections. |\n\n##### Why the Math Works Step-by-Step\n1. **Why are all eigenvalues of a symmetric matrix guaranteed to be real?** Suppose $\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}$ where $\\lambda$ and $\\mathbf{v}$ might potentially be complex. Taking the conjugate transpose product yields $\\mathbf{v}^* \\mathbf{A} \\mathbf{v} = \\mathbf{v}^* (\\lambda \\mathbf{v}) = \\lambda \\|\\mathbf{v}\\|^2$. Taking the conjugate transpose of that scalar gives $(\\mathbf{v}^* \\mathbf{A} \\mathbf{v})^* = \\mathbf{v}^* \\mathbf{A}^T \\mathbf{v} = \\mathbf{v}^* \\mathbf{A} \\mathbf{v} = \\bar{\\lambda} \\|\\mathbf{v}\\|^2$. Thus $\\lambda \\|\\mathbf{v}\\|^2 = \\bar{\\lambda} \\|\\mathbf{v}\\|^2$. Since $\\mathbf{v} \\ne \\mathbf{0}$, $\\lambda = \\bar{\\lambda}$, proving $\\lambda$ must be strictly real.\n2. **Why are eigenvectors of distinct eigenvalues automatically orthogonal?** Let $\\mathbf{A}\\mathbf{q}_1 = \\lambda_1 \\mathbf{q}_1$ and $\\mathbf{A}\\mathbf{q}_2 = \\lambda_2 \\mathbf{q}_2$ with $\\lambda_1 \\ne \\lambda_2$. Computing the inner product: $\\lambda_1 (\\mathbf{q}_1 \\cdot \\mathbf{q}_2) = (\\mathbf{A}\\mathbf{q}_1) \\cdot \\mathbf{q}_2 = \\mathbf{q}_1^T \\mathbf{A}^T \\mathbf{q}_2 = \\mathbf{q}_1^T \\mathbf{A} \\mathbf{q}_2 = \\mathbf{q}_1 \\cdot (\\mathbf{A}\\mathbf{q}_2) = \\lambda_2 (\\mathbf{q}_1 \\cdot \\mathbf{q}_2)$. Rearranging gives $(\\lambda_1 - \\lambda_2)(\\mathbf{q}_1 \\cdot \\mathbf{q}_2) = 0$. Since $\\lambda_1 \\ne \\lambda_2$, the dot product $\\mathbf{q}_1 \\cdot \\mathbf{q}_2$ must equal 0, proving perpendicularity!\n3. **Why does $\\mathbf{Q}^{-1} = \\mathbf{Q}^T$?** The columns of $\\mathbf{Q}$ are orthonormal ($\\mathbf{q}_i \\cdot \\mathbf{q}_j = 1$ if $i=j$, and $0$ otherwise). Multiplying $\\mathbf{Q}^T \\mathbf{Q}$ produces entries that are precisely the dot products of the columns of $\\mathbf{Q}$, yielding the identity matrix $\\mathbf{I}$. Inverting a coordinate change requires zero matrix inversion algorithms—just a simple transpose.\n4. **Why is the outer product $\\mathbf{q}_i \\mathbf{q}_i^T$ an orthogonal projector?** Multiplying $(\\mathbf{q}_i \\mathbf{q}_i^T)\\mathbf{x} = \\mathbf{q}_i (\\mathbf{q}_i^T \\mathbf{x}) = (\\mathbf{q}_i \\cdot \\mathbf{x})\\mathbf{q}_i$. It takes the scalar shadow of $\\mathbf{x}$ along $\\mathbf{q}_i$ and points it in direction $\\mathbf{q}_i$. Squaring the operator $(\\mathbf{q}_i \\mathbf{q}_i^T)^2 = \\mathbf{q}_i (\\mathbf{q}_i^T \\mathbf{q}_i) \\mathbf{q}_i^T = \\mathbf{q}_i (1) \\mathbf{q}_i^T = \\mathbf{q}_i \\mathbf{q}_i^T$, satisfying the idempotent geometric definition of a projection.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{A} = \\mathbf{A}^T$ | شرط التناظر | المصفوفة تطابق منقولها تماماً؛ التفاعلات بين الصفوف والأعمدة متماثلة تبادلياً ($A_{ij} = A_{ji}$). |\n| $\\mathbf{Q} \\in \\mathbb{R}^{n \\times n}$ | مصفوفة المتجهات الذاتية المتعامدة | مصفوفة دوران صلب تشكل أعمدتها متجهات الوحدة الذاتية المتعامدة تماماً ($\\mathbf{Q}^T\\mathbf{Q} = \\mathbf{I}$). |\n| $\\mathbf{\\Lambda}$ | مصفوفة القيم الذاتية القطرية | مصفوفة قطرية تضم معاملات التمدد الحقيقية البحتة على طول المحاور المتعامدة. |\n| $\\mathbf{Q}^T$ | التحويل المنقول للأساس الذاتي | يسقط الفضاء على الأساس الذاتي المتعامد؛ ولأن $\\mathbf{Q}$ متعامدة فإن معكوسها يطابق منقولها ($\\mathbf{Q}^{-1} = \\mathbf{Q}^T$). |\n| $\\mathbf{q}_i \\in \\mathbb{R}^n$ | المتجه الذاتي المعياري | متجه وحدة ($\\|\\mathbf{q}_i\\|_2 = 1$) يحدد اتجاهاً هندسياً مستقلاً لا يدور عند تطبيق التحويل. |\n| $\\lambda_i \\in \\mathbb{R}$ | القيمة الذاتية الحقيقية | عامل التمدد الفيزيائي على طول المحور $\\mathbf{q}_i$؛ ومضمون كونه عدداً حقيقياً خالياً من التخيل. |\n| $\\mathbf{q}_i \\mathbf{q}_i^T$ | مصفوفة إسقاط من الرتبة الأولى | مؤثر الجداء الخارجي الذي يسقط أي متجه في الفضاء إسقاطاً عمودياً على امتداد الخط $\\mathbf{q}_i$. |\n| $\\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T$ | التفكيك الطيفي التراكمي | صياغة المصفوفة المعقدة بالكامل كمجموع موزون لمؤثرات إسقاط متعامدة ومستقلة. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا نضمن أن كافة القيم الذاتية أعداد حقيقية؟** بافتراض وجود قيمة ذاتية $\\lambda$ ومتجه ذاتي $\\mathbf{v}$ قد يحتويان على أعداد مركبة، فإن ضرب المتجه المرافق المنقول يعطي $\\mathbf{v}^* \\mathbf{A} \\mathbf{v} = \\lambda \\|\\mathbf{v}\\|^2$. وبأخذ المرافق المنقول لهذا المقدار العددي واستخدام شرط التناظر $\\mathbf{A}^T = \\mathbf{A}$، نجد أنه يساوي $\\bar{\\lambda} \\|\\mathbf{v}\\|^2$. بالتالي فإن $\\lambda = \\bar{\\lambda}$، مما يثبت قطعاً أن القيمة الذاتية عدد حقيقي لا يحوي أي جزء تخيلي.\n2. **لماذا تتعامد المتجهات الذاتية للقيم المختلفة تلقائياً؟** إذا كانت لدينا قيمتان مختلفتان $\\lambda_1 \\ne \\lambda_2$، فإن الجداء النقطي $\\lambda_1 (\\mathbf{q}_1 \\cdot \\mathbf{q}_2) = (\\mathbf{A}\\mathbf{q}_1) \\cdot \\mathbf{q}_2 = \\mathbf{q}_1 \\cdot (\\mathbf{A}\\mathbf{q}_2) = \\lambda_2 (\\mathbf{q}_1 \\cdot \\mathbf{q}_2)$. وبنقل الحدود: $(\\lambda_1 - \\lambda_2)(\\mathbf{q}_1 \\cdot \\mathbf{q}_2) = 0$. وبما أن القيمتين مختلفتان ($\\lambda_1 - \\lambda_2 \\ne 0$)، فيلزم حتماً أن يكون $\\mathbf{q}_1 \\cdot \\mathbf{q}_2 = 0$، وهو برهان التعامد التام!\n3. **لماذا يطابق المعكوس المنقول دائماً ($\\mathbf{Q}^{-1} = \\mathbf{Q}^T$)؟** أعمدة المصفوفة $\\mathbf{Q}$ هي متجهات وحدة متعامدة مثنى مثنى؛ لذا فإن ضرب المنقول في المصفوفة $\\mathbf{Q}^T \\mathbf{Q}$ يحسب الجداء النقطي للأعمدة مع بعضها، منتجاً $1$ على القطر الرئيسي و$0$ في كل مكان آخر، وهي مصفوفة الوحدة $\\mathbf{I}$. هذا يلغي الحاجة لأي خوارزميات لحساب المعكوس؛ فالمنقول هو المعكوس مباشرة.\n4. **كيف يمثل الجداء الخارجي $\\mathbf{q}_i \\mathbf{q}_i^T$ مؤثر إسقاط؟** بتطبيق المؤثر على أي متجه $\\mathbf{x}$: $(\\mathbf{q}_i \\mathbf{q}_i^T)\\mathbf{x} = (\\mathbf{q}_i \\cdot \\mathbf{x})\\mathbf{q}_i$. إنه يقيس ظل المتجه $\\mathbf{x}$ على المحور $\\mathbf{q}_i$ ويعيد توجيهه على طول ذلك المحور. وتربيع المؤثر يثبت أنه لا يتغير: $(\\mathbf{q}_i \\mathbf{q}_i^T)^2 = \\mathbf{q}_i \\mathbf{q}_i^T$، وهو التعريف الرياضي الدقيق للإسقاط المتعامد."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-14",
          "starterCode": "def spectral_reconstruction_2d(Q: np.ndarray, lambdas: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Reconstruct a 2x2 symmetric matrix from its spectral decomposition A = Q Lambda Q^T.\n\n    Intuition\n    ---------\n    According to the Spectral Theorem, any symmetric matrix can be factored\n    into an orthogonal rotation Q, diagonal stretching by eigenvalues lambdas,\n    and the reverse rotation Q^T. This function reverses that process, taking\n    the eigenbasis and eigenvalues to reconstruct the original matrix.\n\n    Parameters\n    ----------\n    Q : np.ndarray of shape (2, 2)\n        Orthogonal matrix whose columns are unit eigenvectors.\n    lambdas : np.ndarray of shape (2,)\n        Real eigenvalues [lambda_1, lambda_2].\n\n    Returns\n    -------\n    np.ndarray of shape (2, 2)\n        Reconstructed symmetric matrix A.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def spectral_reconstruction_2d(Q: np.ndarray, lambdas: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Reconstruct a 2x2 symmetric matrix from its spectral decomposition A = Q Lambda Q^T.\n\n    Intuition\n    ---------\n    According to the Spectral Theorem, any symmetric matrix can be factored\n    into an orthogonal rotation Q, diagonal stretching by eigenvalues lambdas,\n    and the reverse rotation Q^T. This function reverses that process, taking\n    the eigenbasis and eigenvalues to reconstruct the original matrix.\n\n    Parameters\n    ----------\n    Q : np.ndarray of shape (2, 2)\n        Orthogonal matrix whose columns are unit eigenvectors.\n    lambdas : np.ndarray of shape (2,)\n        Real eigenvalues [lambda_1, lambda_2].\n\n    Returns\n    -------\n    np.ndarray of shape (2, 2)\n        Reconstructed symmetric matrix A.\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "array([[3., 0.],\n       [0., 5.]])"
            }
          },
          "solution": "import numpy as np\n\ndef spectral_reconstruction_2d(Q: np.ndarray, lambdas: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Reconstruct a 2x2 symmetric matrix from its spectral decomposition A = Q Lambda Q^T.\n\n    Intuition\n    ---------\n    According to the Spectral Theorem, any symmetric matrix can be factored\n    into an orthogonal rotation Q, diagonal stretching by eigenvalues lambdas,\n    and the reverse rotation Q^T. This function reverses that process, taking\n    the eigenbasis and eigenvalues to reconstruct the original matrix.\n\n    Parameters\n    ----------\n    Q : np.ndarray of shape (2, 2)\n        Orthogonal matrix whose columns are unit eigenvectors.\n    lambdas : np.ndarray of shape (2,)\n        Real eigenvalues [lambda_1, lambda_2].\n\n    Returns\n    -------\n    np.ndarray of shape (2, 2)\n        Reconstructed symmetric matrix A.\n    \"\"\"\n    # Step 1: Form the diagonal eigenvalue matrix Lambda = np.diag(lambdas)\n    # Lambda = np.diag(lambdas)\n\n    # Step 2: Compute matrix product Q @ Lambda @ Q.T\n    # A = Q @ Lambda @ Q.T\n\n    # Step 3: Return the reconstructed symmetric matrix\n    # return A\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
    "id": "t1-15",
    "title": "Singular Value Decomposition (SVD) & Spectral Geometry",
    "titleAr": "تفكيك القيم المفردة (SVD) والهندسة الطيفية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine molding a lump of sculpting clay into a perfectly round spherical ball in your hands.",
      "ar": "تخيل أنك تصنع كرة مستديرة تماماً من الصلصال بيديك. الآن، اضغط عليها واسحبها بقوة بين راحتي كفيك في اتجاهات مختلفة."
    },
    "prerequisites": [
      "orthogonal-projections",
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
          "en": "Imagine molding a lump of sculpting clay into a perfectly round spherical ball in your hands. Now, press and pull that ball between your palms, squashing it unevenly. Or imagine shining a flashlight at a spherical globe from an angle, projecting its shadow onto a tilted wall. No matter how you stretch, squish, or rotate that sphere in space, its physical shape undergoes a clean transformation: it deforms into an **ellipsoid** (a hyper-dimensional rugby ball). That ellipsoid possesses unmistakable principal axes: a major axis along its longest stretch, an intermediate axis along its medium stretch, and a minor axis along its narrowest compression.\n\nIn linear algebra, the Spectral Theorem was a mathematical triumph, but it was shackled by a severe real-world limitation: it only worked on square, symmetric matrices ($n \\times n$). Yet in practical data science, computer vision, and machine learning, matrices are virtually never square or symmetric! You encounter rectangular data tables with 100,000 customers (rows) and 500 products (columns), or images with 1080 rows and 1920 columns. A rectangular matrix does not even map a space back into itself; it maps an input space of dimension $n$ into a completely different output space of dimension $m$. How can we discover the natural, unrotated geometric axes of such a transformation?\n\nThe **Singular Value Decomposition (SVD)** is the undisputed superpower and crowning jewel of modern linear algebra because it works on *every single matrix that can ever exist*: square or rectangular, tall or fat, full-rank or deficient, real or complex, with zero exceptions. It proves that any linear map—no matter how messy or dimensional—transforms a set of mutually perpendicular unit vectors in the input space into a set of mutually perpendicular axes in the output space, faithfully mapping a unit sphere into an ellipsoid.\n\nGeometrically, SVD reveals that every linear transformation can be decomposed into three distinct, physical stages:\n1. **Input Space Rotation ($\\mathbf{V}^T$):** A rigid orthogonal rotation that aligns the input coordinate axes with the principal axes of the sphere.\n2. **Coordinate Stretching ($\\mathbf{\\Sigma}$):** Pure independent scaling along the coordinate axes by non-negative factors called **singular values** ($\\sigma_i$), which represent the lengths of the semi-axes of the output ellipsoid. If the matrix is rectangular, this step embeds or projects the vectors into the output dimension.\n3. **Output Space Rotation ($\\mathbf{U}$):** A rigid orthogonal rotation that swings the stretched axes into their final orientation in the output space.\n\nBy ordering the singular values from largest to smallest ($\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0$), SVD arranges the information content of a matrix in strict order of geometric importance. This makes SVD the mathematical foundation of optimal data compression: dropping the smallest singular values strips away random noise while retaining nearly all structural variance.\n\n---",
          "ar": "تخيل أنك تصنع كرة مستديرة تماماً من الصلصال بيديك. الآن، اضغط عليها واسحبها بقوة بين راحتي كفيك في اتجاهات مختلفة. أو تخيل أنك تسلط ضوء مصباح يدوي على كرة قدم من زاوية مائلة، مسقطاً ظلها على جدار مائل. مهما كان مقدار الشد والضغط والدوران الذي تعرضت له الكرة، فإن شكلها الهندسي يتحول حتماً إلى **قطع ناقص فائق** (Hyper-ellipsoid، يشبه كرة الركبي). هذا القطع الناقص يمتلك محاور رئيسية متعامدة لا تخطئها العين: محوراً رئيسياً يمثل أقصى استطالة، ومحوراً أوسط، ومحوراً أصغر يمثل أشد انضغاط.\n\nفي الجبر الخطي، كانت المبرهنة الطيفية إنجازاً عظيماً، لكنها كانت مقيدة بشرط خانق: فهي تعمل فقط على المصفوفات المربعة المتناظرة ($n \\times n$). ولكن في عالم البيانات الحقيقي والذكاء الاصطناعي، تكاد لا تجد مصفوفة مربعة متناظرة! فجداول البيانات الحقيقية مستطيلة تضم مثلاً 100,000 عميل و500 منتج، والصور الرقمية تتألف من 1080 صفاً و1920 عموداً. والمصفوفة المستطيلة لا تنقل الفضاء إلى نفسه أصلاً، بل تنقل متجهات من فضاء ذي بُعد $n$ إلى فضاء آخر تماماً ذي بُعد $m$. فكيف نكتشف المحاور الطبيعية الصامدة لمثل هذه التحويلات العامة؟\n\nهنا يبرز **تفكيك القيم المفردة (SVD)** كأقوى أداة خارقة والمفتاح الذهبي المطلق للجبر الخطي؛ لأنه يعمل على *أي مصفوفة يمكن أن توجد في الكون*: مربعة أو مستطيلة، طويلة أو عريضة، تامة الرتبة أو ناقصة، حقيقية أو مركبة، دون أي استثناء على الإطلاق. يثبت SVD رياضياً أن أي تحويل خطي في الوجود ينقل مجموعة من متجهات الوحدة المتعامدة في فضاء المدخلات إلى محاور متعامدة تماماً في فضاء المخرجات، محولاً كرة الوحدة إلى قطع ناقص فائق.\n\nهندسياً، يكشف SVD أن أي عملية ضرب مصفوفية معقدة تتحلل في جوهرها إلى ثلاثة أطوار فيزيائية بديهية:\n1. **دوران في فضاء المدخلات ($\\mathbf{V}^T$):** دوران صلب متعامد يحاذي محاور الإحداثيات مع المحاور الطبيعية لكرة المدخلات.\n2. **تمديد وتغيير أبعاد ($\\mathbf{\\Sigma}$):** شد وتمديد مستقل على طول المحاور الإحداثية بمعاملات غير سالبة تُسمى **القيم المفردة** ($\\sigma_i$)، وهي التي تحدد أطوال أنصاف محاور القطع الناقص الناتج، مع إسقاط المتجهات في فضاء البُعد الجديد إذا كانت المصفوفة مستطيلة.\n3. **دوران في فضاء المخرجات ($\\mathbf{U}$):** دوران صلب متعامد يدير تلك المحاور الممددة لتتخذ اتجاهها النهائي في فضاء المخرجات.\n\nوعند ترتيب القيم المفردة تنازلياً من الأكبر إلى الأصغر ($\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0$)، فإن SVD يرتب المعلومات والتباينات الكامنة في المصفوفة حسب أهميتها الهندسية، مما يجعله الأساس الرياضي الأول لضغط البيانات وإزالة الضوضاء العشوائية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{A} \\in \\mathbb{R}^{m \\times n}, \\quad \\mathbf{A} = \\mathbf{U} \\mathbf{\\Sigma} \\mathbf{V}^T = \\sum_{i=1}^r \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T, \\quad \\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0",
        "formulaNote": {
          "en": "Mathematical anchor for Singular Value Decomposition (SVD) & Spectral Geometry.",
          "ar": "المرساة الرياضية لـ تفكيك القيم المفردة (SVD) والهندسة الطيفية."
        },
        "narrative": {
          "en": "#### Demystifying the Equation\n\n| Symbol | Mathematical Term | Plain English Translation & Intuition |\n| :--- | :--- | :--- |\n| $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ | Arbitrary Data Matrix | Any generic linear transformation mapping $n$-dimensional inputs to $m$-dimensional outputs. |\n| $\\mathbf{U} \\in \\mathbb{R}^{m \\times m}$ | Left Singular Vectors Matrix | An orthogonal matrix whose columns $\\mathbf{u}_i$ are unit eigenvectors of $\\mathbf{A}\\mathbf{A}^T$, spanning the output space. |\n| $\\mathbf{\\Sigma} \\in \\mathbb{R}^{m \\times n}$ | Singular Value Matrix | A rectangular diagonal matrix containing non-negative stretch factors $\\sigma_i = \\sqrt{\\lambda_i(\\mathbf{A}^T\\mathbf{A})}$. |\n| $\\mathbf{V}^T \\in \\mathbb{R}^{n \\times n}$ | Right Singular Vectors Matrix | An orthogonal matrix whose rows $\\mathbf{v}_i^T$ are unit eigenvectors of $\\mathbf{A}^T\\mathbf{A}$, spanning the input space. |\n| $\\sigma_i \\in \\mathbb{R}_{\\ge 0}$ | Singular Value | The length of the $i$-th semi-axis of the hyper-ellipsoid, quantifying the energy/variance along direction $\\mathbf{u}_i$. |\n| $\\mathbf{u}_i \\mathbf{v}_i^T \\in \\mathbb{R}^{m \\times n}$ | Rank-1 Outer Product Matrix | A foundational building block mapping direction $\\mathbf{v}_i$ in input space directly to direction $\\mathbf{u}_i$ in output space. |\n| $\\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T$ | Truncated Eckart-Young Sum | The provably optimal rank-$k$ approximation ($\\mathbf{A}_k$) retaining the maximal possible variance. |\n\n##### Why the Math Works Step-by-Step\n1. **Why does SVD factorize into Rotate $\\to$ Stretch $\\to$ Rotate?** Any linear transformation maps the unit sphere $\\{\\mathbf{x} : \\|\\mathbf{x}\\|_2 = 1\\}$ into an ellipsoid. Rotating the input coordinate frame by $\\mathbf{V}^T$ aligns the sphere with the axes that undergo maximal stretching. Diagonal matrix $\\mathbf{\\Sigma}$ applies those stretches $\\sigma_i$. Finally, rotation $\\mathbf{U}$ points the resulting principal axes in their proper directions in output space.\n2. **Why are singular values the square roots of eigenvalues ($\\sigma_i = \\sqrt{\\lambda_i(\\mathbf{A}^T\\mathbf{A})}$)?** Notice that the symmetric matrix $\\mathbf{A}^T\\mathbf{A} = (\\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^T)^T (\\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^T) = \\mathbf{V}\\mathbf{\\Sigma}^T\\mathbf{U}^T\\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^T$. Because $\\mathbf{U}$ is orthogonal ($\\mathbf{U}^T\\mathbf{U} = \\mathbf{I}$), this simplifies to $\\mathbf{V}(\\mathbf{\\Sigma}^T\\mathbf{\\Sigma})\\mathbf{V}^T$. Since $\\mathbf{\\Sigma}^T\\mathbf{\\Sigma}$ has diagonal entries $\\sigma_i^2$, the singular values of $\\mathbf{A}$ are precisely the positive square roots of the eigenvalues of the symmetric matrix $\\mathbf{A}^T\\mathbf{A}$.\n3. **Why are $\\mathbf{U}$ and $\\mathbf{V}$ guaranteed to be orthogonal?** The matrices $\\mathbf{A}^T\\mathbf{A}$ ($n \\times n$) and $\\mathbf{A}\\mathbf{A}^T$ ($m \\times m$) are always symmetric and positive semi-definite. By the Spectral Theorem, every symmetric matrix has a complete orthonormal basis of eigenvectors. $\\mathbf{V}$ is the orthonormal eigenbasis of $\\mathbf{A}^T\\mathbf{A}$, and $\\mathbf{U}$ is the orthonormal eigenbasis of $\\mathbf{A}\\mathbf{A}^T$.\n4. **Why is the truncated sum optimal (Eckart-Young Theorem)?** The total variance (squared Frobenius norm $\\|\\mathbf{A}\\|_F^2$) equals $\\sum_{i=1}^r \\sigma_i^2$. Because the singular values are sorted in descending order ($\\sigma_1 \\ge \\sigma_2 \\ge \\dots$), truncating the sum at index $k$ discards the smallest possible variance ($\\sum_{i=k+1}^r \\sigma_i^2$), provably minimizing the approximation error $\\|\\mathbf{A} - \\mathbf{B}\\|_F$ among all matrices $\\mathbf{B}$ of rank at most $k$.\n\n---",
          "ar": "| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |\n| :--- | :--- | :--- |\n| $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ | مصفوفة البيانات العامة | أي تحويل خطي ينقل متجهات من فضاء مدخلات ذي $n$ بعداً إلى فضاء مخرجات ذي $m$ بعداً. |\n| $\\mathbf{U} \\in \\mathbb{R}^{m \\times m}$ | مصفوفة المتجهات المفردة اليسرى | مصفوفة دوران متعامدة تشكل أعمدتها $\\mathbf{u}_i$ متجهات الوحدة الذاتية لـ $\\mathbf{A}\\mathbf{A}^T$ وتغطي فضاء المخرجات. |\n| $\\mathbf{\\Sigma} \\in \\mathbb{R}^{m \\times n}$ | مصفوفة القيم المفردة | مصفوفة شبه قطرية تضم معاملات الشد غير السالبة $\\sigma_i = \\sqrt{\\lambda_i(\\mathbf{A}^T\\mathbf{A})}$. |\n| $\\mathbf{V}^T \\in \\mathbb{R}^{n \\times n}$ | مصفوفة المتجهات المفردة اليمنى المنقولة | مصفوفة دوران متعامدة تشكل صفوفها $\\mathbf{v}_i^T$ متجهات الوحدة الذاتية لـ $\\mathbf{A}^T\\mathbf{A}$ وتغطي فضاء المدخلات. |\n| $\\sigma_i \\in \\mathbb{R}_{\\ge 0}$ | القيمة المفردة | طول نصف المحور في القطع الناقص الفائق، ويعبر بدقة عن مقدار الطاقة والتباين على طول الاتجاه $\\mathbf{u}_i$. |\n| $\\mathbf{u}_i \\mathbf{v}_i^T$ | مصفوفة جداء خارجي من الرتبة الأولى | لبنة بناء أساسية تنقل الاتجاه $\\mathbf{v}_i$ في فضاء المدخلات مباشرة إلى الاتجاه $\\mathbf{u}_i$ في فضاء المخرجات. |\n| $\\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T$ | مجموع إيكارت-يونغ المقتطع | التقريب الأمثل والمثبت رياضياً من الرتبة $k$ الذي يحتفظ بأعلى قدر ممكن من تباين ومعلومات البيانات. |\n\n##### لماذا تعمل هذه المعادلة هندسياً؟\n1. **لماذا يتحلل أي تحويل إلى: دوران $\\to$ شد $\\to$ دوران؟** ينقل أي تحويل خطي كرة الوحدة $\\{\\mathbf{x} : \\|\\mathbf{x}\\|_2 = 1\\}$ إلى قطع ناقص. دوران فضاء المدخلات عبر $\\mathbf{V}^T$ يحاذي محاور الكرة مع الاتجاهات التي ستتعرض لأقصى تمدد؛ وتقوم المصفوفة القطرية $\\mathbf{\\Sigma}$ بشد تلك المحاور بمقادير $\\sigma_i$؛ وأخيراً يقوم الدوران $\\mathbf{U}$ بتوجيه محاور القطع الناقص في اتجاهاتها الصحيحة داخل فضاء المخرجات.\n2. **لماذا تمثل القيم المفردة الجذور التربيعية للقيم الذاتية ($\\sigma_i = \\sqrt{\\lambda_i(\\mathbf{A}^T\\mathbf{A})}$)؟** بتطبيق المصفوفة المتناظرة $\\mathbf{A}^T\\mathbf{A} = (\\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^T)^T (\\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^T) = \\mathbf{V}\\mathbf{\\Sigma}^T\\mathbf{U}^T\\mathbf{U}\\mathbf{\\Sigma}\\mathbf{V}^T$. ولأن $\\mathbf{U}$ مصفوفة متعامدة ($\\mathbf{U}^T\\mathbf{U} = \\mathbf{I}$)، تتبسط المعادلة إلى $\\mathbf{V}(\\mathbf{\\Sigma}^T\\mathbf{\\Sigma})\\mathbf{V}^T$. وحيث إن عناصر قطر $\\mathbf{\\Sigma}^T\\mathbf{\\Sigma}$ هي $\\sigma_i^2$، فإن القيم المفردة هي الجذور التربيعية الموجبة للقيم الذاتية للمصفوفة المتناظرة $\\mathbf{A}^T\\mathbf{A}$.\n3. **لماذا تكون المصفوفات $\\mathbf{U}$ و $\\mathbf{V}$ متعامدة بالضرورة؟** المصفوفتان $\\mathbf{A}^T\\mathbf{A}$ و $\\mathbf{A}\\mathbf{A}^T$ متناظرتان وشبه موجبتي التعريف دائماً. ووفقاً للمبرهنة الطيفية، تمتلك كل مصفوفة متناظرة أساساً متعامداً من المتجهات الذاتية؛ ومصفوفة $\\mathbf{V}$ هي الأساس الذاتي المتعامد لـ $\\mathbf{A}^T\\mathbf{A}$ بينما $\\mathbf{U}$ هي الأساس لـ $\\mathbf{A}\\mathbf{A}^T$.\n4. **لماذا يُعد المجموع المقتطع حلاً أمثلاً (مبرهنة إيكارت-يونغ)؟** إجمالي تباين المصفوفة (مربع معيار فروبينيوس) يساوي مجموع مربعات القيم المفردة $\\sum \\sigma_i^2$. ولأن القيم المفردة مرتبة تنازلياً ($\\sigma_1 \\ge \\sigma_2 \\ge \\dots$)، فإن اقتطاع المجموع عند الرتبة $k$ يهمل أصغر تباين ممكن، مما يقلل خطأ التقريب $\\|\\mathbf{A} - \\mathbf{B}\\|_F$ إلى الحد الأدنى المطلق مقارنة بأي مصفوفة أخرى في الكون رتبتها $k$."
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-15",
          "starterCode": "def svd_rank_k_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute Eckart-Young optimal rank-k approximation and retained energy ratio.\n\n    Intuition\n    ---------\n    Truncating the SVD of matrix A to its top k singular values retains the\n    maximum possible variance and energy while eliminating noise. The retained\n    energy ratio measures the proportion of total variance captured by the\n    rank-k reconstruction.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Input rectangular or square data matrix.\n    k : int\n        Target approximation rank (1 <= k <= min(M, N)).\n\n    Returns\n    -------\n    tuple[np.ndarray, float]\n        A_k: Optimal rank-k reconstructed matrix of shape (M, N).\n        energy_ratio: Fraction of variance retained (sum top-k sigma^2 / sum all sigma^2).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def svd_rank_k_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute Eckart-Young optimal rank-k approximation and retained energy ratio.\n\n    Intuition\n    ---------\n    Truncating the SVD of matrix A to its top k singular values retains the\n    maximum possible variance and energy while eliminating noise. The retained\n    energy ratio measures the proportion of total variance captured by the\n    rank-k reconstruction.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Input rectangular or square data matrix.\n    k : int\n        Target approximation rank (1 <= k <= min(M, N)).\n\n    Returns\n    -------\n    tuple[np.ndarray, float]\n        A_k: Optimal rank-k reconstructed matrix of shape (M, N).\n        energy_ratio: Fraction of variance retained (sum top-k sigma^2 / sum all sigma^2).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "0.64"
            }
          },
          "solution": "import numpy as np\n\ndef svd_rank_k_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:\n    \"\"\"\n    Compute Eckart-Young optimal rank-k approximation and retained energy ratio.\n\n    Intuition\n    ---------\n    Truncating the SVD of matrix A to its top k singular values retains the\n    maximum possible variance and energy while eliminating noise. The retained\n    energy ratio measures the proportion of total variance captured by the\n    rank-k reconstruction.\n\n    Parameters\n    ----------\n    A : np.ndarray of shape (M, N)\n        Input rectangular or square data matrix.\n    k : int\n        Target approximation rank (1 <= k <= min(M, N)).\n\n    Returns\n    -------\n    tuple[np.ndarray, float]\n        A_k: Optimal rank-k reconstructed matrix of shape (M, N).\n        energy_ratio: Fraction of variance retained (sum top-k sigma^2 / sum all sigma^2).\n    \"\"\"\n    # Step 1: Compute thin SVD using np.linalg.svd(A, full_matrices=False)\n    # U, S, Vt = np.linalg.svd(A, full_matrices=False)\n\n    # Step 2: Truncate to top k components: Uk = U[:, :k], Sk = S[:k], Vtk = Vt[:k, :]\n    # Uk = U[:, :k]\n    # Sk = S[:k]\n    # Vtk = Vt[:k, :]\n\n    # Step 3: Reconstruct A_k = Uk @ np.diag(Sk) @ Vtk and compute retained energy ratio\n    # A_k = Uk @ np.diag(Sk) @ Vtk\n    # energy_ratio = float(np.sum(Sk ** 2) / np.sum(S ** 2))\n    # return A_k, energy_ratio\n    pass"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
    "id": "t1-16",
    "title": "Limits, Continuity & The Infinitesimal Neighborhood",
    "titleAr": "النهايات، الاتصال، والجوار المتناهي في الصغر",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine hiking along a rugged mountain trail in the twilight, heading toward a suspension bridge spanning a deep gorge.",
      "ar": "تخيل أنك تسير في مسار جبلي وعر عند الغسق، متجهاً نحو جسر معلق يمتد فوق وادٍ سحيق. مع كل خطوة تخطوها للأمام، يقترب منسوب حذائك باطراد من..."
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
          "en": "Imagine hiking along a rugged mountain trail in the twilight, heading toward a suspension bridge spanning a deep gorge. As you walk forward, every single step you take reliably brings you closer to the exact height of the bridge's wooden deck. But suppose that just yesterday, a storm destroyed the central plank right at the middle of the bridge, leaving a bottomless gap. If you step precisely onto that coordinate, you fall into an undefined void ($0/0$). Yet as you approach that missing plank from either the left or the right, your elevation steadily converges toward an unmistakably clear height. The foundational concept of a **limit** does not care in the slightest about what happens *at* the missing plank; it cares entirely about the destination your footsteps predict as you get *infinitely close*.\n\nNow imagine taking an ultra-high-magnification microscope and focusing it on a smooth mathematical curve drawn on graph paper. At normal zoom, curves look curved. But when you dial the magnification to $1,000\\times$, $100,000\\times$, and beyond, the jaggedness disappears and the curve looks like an unbroken, smooth silk thread. **Continuity** simply means that this thread has no sudden trapdoors, hidden tears, or teleportation jumps. Wherever you place your finger on the curve, the predicted arrival height matches the actual ground reality: $\\lim_{x \\to c} f(x) = f(c)$. The journey and the destination are in perfect, seamless agreement.\n\nIn our physical universe, limits are the secret engine that transforms static snapshots into the living calculus of change. Consider a sports car hurtling down a highway: its speedometer reads a crisp $120\\text{ km/h}$ at the exact millisecond $t = 4.0\\text{ s}$. But think about what a \"frozen millisecond\" actually means. In a frozen instant with zero elapsed time ($\\Delta t = 0$), the car moves zero distance ($\\Delta s = 0$). Ordinary arithmetic breaks down: $0/0$ is meaningless. A speedometer does not divide zero by zero; it computes a **limit**—the ratio of distance over time as the observation window shrinks toward zero. A derivative is just a speedometer for how fast something is changing at this exact millisecond.\n\nIn computational data science and machine learning, limits and continuity are what keep our algorithms from falling apart. Every gradient update, every learning rate step, and every loss calculation implicitly assumes that our objective function is well-behaved: that a tiny nudge to a weight produces a tiny, predictable nudge in the error, rather than blasting the model into numerical infinity or NaN.\n\n---",
          "ar": "تخيل أنك تسير في مسار جبلي وعر عند الغسق، متجهاً نحو جسر معلق يمتد فوق وادٍ سحيق. مع كل خطوة تخطوها للأمام، يقترب منسوب حذائك باطراد من ارتفاع خشب الجسر. ولكن لنفترض أن عاصفة البارحة قد انتزعت لوحاً خشبياً في منتصف الجسر تماماً، تاركة فجوة لا قرار لها. إذا وضعت قدمك في تلك النقطة تحديداً، ستسقط في العدم (كمية غير معينة مثل $0/0$). ومع ذلك، وأنت تقترب من تلك الفجوة سواء من جهة الشرق أو الغرب، فإن مسار خطواتك يخبرك بارتفاع محدد بدقة متناهية. المفهوم التأسيسي لـ **النهاية** (Limit) في الرياضيات لا يكترث على الإطلاق بما يحدث *عند* النقطة المنعدمة ذاتها؛ بل يركز كلياً على الوجهة التي تتنبأ بها خطواتك كلما اقتربت اقتراباً متناهياً في الصغر من الحافة.\n\nوالآن، تخيل أنك تفحص منحنى رياضياً أملس تحت مجهر إلكتروني فائق التكبير. في البداية، قد يبدو المنحنى معقداً وملتوياً. ولكن عندما ترفع قوة التكبير إلى $1,000$ مرة، ثم إلى $100,000$ مرة، تتلاشى كل التفاصيل المشتتة ويبدو المنحنى كخيط حريري ناعم متصل بلا انقطاع. **الاتصال** (Continuity) بالمعنى الفيزيائي والحدسي يعني غياب أي فجوات ممزقة أو قفزات آنية مفاجئة على طول المسار. أينما وضعت سن قلمك على الورقة، فإنك ترسم المنحنى دون الحاجة لرفعه أبداً: الوجهة المتوقعة من الاقتراب تتطابق تماماً مع النقطة الفعلية: $\\lim_{x \\to c} f(x) = f(c)$.\n\nفي عالمنا الفيزيائي، تمثل النهايات الأداة السحرية التي تحول اللقطات الساكنة المجمدة إلى قوانين حركة متدفقة. تأمل سيارة سباق سريعة: يشير عداد السرعة أمام السائق إلى $120\\text{ كم/س}$ في اللحظة الزمنية $t = 4.0\\text{ ث}$ بدقة. لكن ماذا تعني \"اللحظة الزمنية المجمدة\"؟ في لحظة متوقفة تماماً لا يمر فيها أي زمن ($\\Delta t = 0$)، لا تقطع السيارة أي مسافة إطلاقاً ($\\Delta s = 0$). الحساب التقليدي يعجز تماماً هنا؛ فقسمة الصفر على الصفر $0/0$ لا معنى لها. عداد السرعة لا يقسم صفراً على صفر، بل يحسب **نهاية**: نسبة المسافة إلى الزمن عبر نوافذ زمنية متناهية في الصغر تقترب بلا توقف من الصفر. المشتقة في جوهرها ليست سوى عداد سرعة يقيس مدى سرعة تغير الظاهرة في هذا الجزء من الثانية تحديداً.\n\nوفي عصر الذكاء الاصطناعي وتعلم الآلة، تشكل النهايات والاتصال صمام الأمان الذي يحمي النماذج الحاسوبية من الانهيار. فكل خطوة تحديث للأوزان، وكل تقييم لدالة الخسارة، يفترض ضمناً أن دالتنا متصلة وسلسة: أي أن أي تعديل طفيف جداً في مدخلات النموذج سيقابله تعديل طفيف ومستقر في المخرجات، بدلاً من إلقاء الخوارزمية في هاوية القيم غير المعرفة (NaN) أو اللانهاية."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\lim_{x \\to c} f(x) = L \\iff \\forall \\epsilon > 0, \\; \\exists \\delta > 0 \\; \\text{s.t.} \\; 0 < |x - c| < \\delta \\implies |f(x) - L| < \\epsilon",
        "formulaNote": {
          "en": "Mathematical anchor for Limits, Continuity & The Infinitesimal Neighborhood.",
          "ar": "المرساة الرياضية لـ النهايات، الاتصال، والجوار المتناهي في الصغر."
        },
        "narrative": {
          "en": "$$\nf \\text{ is continuous at } c \\iff \\lim_{x \\to c} f(x) = f(c)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $c$ | $\\mathbb{R}$ | Target coordinate on the horizontal input domain axis | The center anchor of our domain exploration window |\n| $L$ | $\\mathbb{R}$ | Limiting target value on the vertical codomain axis | The presumed horizontal convergence altitude of the function |\n| $\\epsilon$ (Epsilon) | $\\mathbb{R}_{> 0}$ | Arbitrarily tiny vertical error tolerance band | The challenge window $(L - \\epsilon, L + \\epsilon)$ proposed by an adversary |\n| $\\delta$ (Delta) | $\\mathbb{R}_{> 0}$ | Corresponding horizontal neighborhood radius | The safety corridor $(c - \\delta, c + \\delta)$ that guarantees safe landing |\n| $0 < |x - c|$ | Strict inequality | Punctured neighborhood excluding $x = c$ itself | Insulates the limit from whether $f(c)$ is defined, broken, or missing |\n\n#### Intuitive Rationale for the Formulation\nThe famous $(\\epsilon, \\delta)$ definition created by Cauchy and Weierstrass looks intimidating at first glance, but it is actually a simple mathematical game between two players: a skeptic and a defender. \n1. The skeptic challenges: *\"I don't believe the function converges to $L$. To test you, I demand that the output stays within a microscopic vertical error corridor of width $\\pm \\epsilon$, say $\\epsilon = 0.0001$.\"*\n2. The defender wins if they can always reply: *\"Accepted. If you restrict your input steps within a horizontal radius $\\delta = 0.00005$ around $c$, every single function value is trapped securely inside your error band.\"*\nBecause this challenge can be met for *any* $\\epsilon > 0$, no matter how tiny, the convergence toward $L$ is rock-solid and undeniable.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $c$ | $\\mathbb{R}$ | نقطة الإسناد على محور المدخلات الأفقي | مركز نافذة الاستكشاف الأفقية التي نقترب نحوها |\n| $L$ | $\\mathbb{R}$ | القيمة الحدية المستهدفة على المحور الرأسي | منسوب التقارب الأفقي المفترض للدالة |\n| $\\epsilon$ (إبسيلون) | $\\mathbb{R}_{> 0}$ | هامش تسامح رأسي متناهٍ في الصغر | شريط الخطأ الرأسي $(L - \\epsilon, L + \\epsilon)$ الذي يفرضه المشكك |\n| $\\delta$ (دلتا) | $\\mathbb{R}_{> 0}$ | نصف قطر جوار النطاق الأفقي المقابل | نطاق الأمان الأفقي $(c - \\delta, c + \\delta)$ الذي يضمن البقاء في الشريط |\n| $0 < |x - c|$ | متباينة صريحة | جوار مثقوب يستثني النقطة $x = c$ بذاتها | يعزل سلوك الاقتراب عما إذا كانت الدالة معرفة أو مفقودة عند $c$ |\n\n#### التفسير المنطقي لصياغة المعادلة\nتبدو صياغة $(\\epsilon, \\delta)$ التي وضعها كوشي وفايرشتراس معقدة للوهلة الأولى، لكنها في جوهرها مناظرة هندسية ذكية بين طرفين: مشكك ومدافع.\n1. يضع المشكك التحدي قائلاً: *\"أنا أشك في أن قيم الدالة تقترب حقاً من الارتفاع $L$. ولإثبات ذلك، أطلب منك حصر مخرجات الدالة داخل شريط رأسي ضيق للغاية بهامش خطأ $\\epsilon = 0.0001$ حول $L$.\"*\n2. يفوز المدافع إذا استطاع دوماً الرد: *\"قبلت التحدي! إذا قيدت خطوات مدخلاتك داخل مسافة أفقية قدرها $\\delta = 0.00005$ حول النقطة $c$، فأنا أضمن لك أن كل نقطة للدالة ستسقط بأمان تام داخل شريطك المحدد.\"*\nولأن المدافع قادر على الاستجابة لأي قيمة إبسيلون مهما كانت متناهية في الصغر، فإن التقارب نحو $L$ يصبح حقيقة رياضية دامغة لا يرقى إليها الشك.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-16",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "تواجه محاكاة حاسوبية تحسب الدالة القياسية $f(x) = \\frac{\\sin(x)}{x}$ خطأ القسمة على صفر عند تعويض النقطة $x = 0$ مباشرة. ومع ذلك، تعامل حسابات التدرج التحليلي هذه الدالة باعتبارها دالة ملساء ومتصلة تماماً عند نقطة الأصل. ما الخاصية النظرية التي تسوغ رياضياً إسناد القيمة $f(0) = 1.0$؟"
          },
          "options": [
            {
              "text": {
                "en": "The punctured neighborhood $0 < |x - 0| < \\delta$ evaluates $f(x)$ for all $x \\ne 0$, where $\\sin(x)/x \\to 1.0$ smoothly, defining a removable discontinuity that is healed by setting $f(0) = 1.0$.",
                "ar": "يفحص الجوار المثقوب $0 < |x - 0| < \\delta$ قيم الدالة $f(x)$ لجميع النقاط $x \\ne 0$، حيث يقترب المقدار $\\sin(x)/x$ بسلاسة نحو $1.0$، مما يعرف انفصالاً قابلاً للإزالة تتم معالجته وتوصيله بوضع $f(0) = 1.0$.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The limit depends strictly on the punctured neighborhood where $x \\ne 0$. Because $\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1.0$, redefining the point value $f(0) \\coloneqq 1.0$ restores full continuity without altering any surrounding values.",
                "ar": "تركز النهاية حصراً على الجوار المثقوب الذي يستثني $x=0$. وبما أن النهاية موجودة وتساوي $1.0$ بدقة، فإن تعريف $f(0) \\coloneqq 1.0$ يعيد الاتصال التام للمنحنى دون تشويه أي قيمة محيطة به."
              }
            },
            {
              "text": {
                "en": "The limit is an empirical convention with no formal algebraic justification.",
                "ar": "النهاية هي مجرد اصطلاح تجريبي عملي لا يمتلك أي سند جبري أو تحليلي صارم.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The limit is rigorously proven via the Squeeze Theorem using geometric circle sector bounds, not an arbitrary heuristic.",
                "ar": "النهاية مثبتة بصرامة رياضية عبر مبرهنة الشطيرة (Squeeze Theorem) بمقارنة مساحات قطاعات الدائرة، وليست مجرد افتراض عشوائي."
              }
            },
            {
              "text": {
                "en": "Floating-point standards dictate that any expression yielding $0/0$ defaults to $1.0$.",
                "ar": "تنص المعايير القياسية للفاصلة العائمة على أن أي تعبير ينتج $0/0$ يتحول تلقائياً إلى $1.0$.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "In IEEE-754 floating-point hardware arithmetic, evaluating $0/0$ produces NaN (Not a Number), causing silent bugs if unhandled.",
                "ar": "في معايير الحساب للفاصلة العائمة (IEEE-754)، ينتج عن قسمة $0/0$ قيمة غير معرفة (NaN) تؤدي إلى أخطاء برمجية كارثية إن لم تُعالج تحليلياً."
              }
            },
            {
              "text": {
                "en": "The function is fundamentally discontinuous at $x = 0$, so calculus cannot be applied in that neighborhood.",
                "ar": "الدالة منفصلة بصورة جوهرية وغير قابلة للاتصال عند $x = 0$، ومن ثم لا يمكن تطبيق الحسبان في ذلك الجوار.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Essential discontinuities (like $1/x$) cannot be repaired, but removable discontinuities have matching left and right limits and are perfectly differentiable once filled.",
                "ar": "الانفصال الجوهري (مثل $1/x$) هو الذي لا يمكن إصلاحه، أما الانفصال القابل للإزالة فتتطابق فيه النهايتان اليمنى واليسرى، وتصبح الدالة قابلة للاشتقاق بمجرد سد الفجوة."
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
    "id": "t1-17",
    "title": "The Derivative as Local Linearization & Tangent Slope",
    "titleAr": "المشتقة كتقريب خطي محلي وميل المماس",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Look at photographs of the curved Earth taken from lunar orbit: our planet is unmistakably a giant blue sphere hanging in the blackness of...",
      "ar": "تأمل صور كوكب الأرض الملتقطة من مدار القمر: كوكبنا بلا شك كرة زرقاء عملاقة تسبح في ظلمات الفضاء."
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
          "en": "Look at photographs of the curved Earth taken from lunar orbit: our planet is unmistakably a giant blue sphere hanging in the blackness of space. Yet when you walk across an athletic field, the grass beneath your running shoes feels completely, indisputably flat. Why? Because if you zoom in closely enough to any smooth, differentiable manifold, **the curvature vanishes and the curve becomes indistinguishable from a straight line**. What appears curved from a cosmic perspective looks perfectly planar to an ant crawling on the surface.\n\nThe **derivative** is the mathematical engine of this principle: it is the slope of that unique local tangent line. It answers a vital operational question: *\"If we zoom in with an infinite microscope around point $x_0$, what simple straight line best substitutes for the complex non-linear curve?\"* The derivative is not merely a rote symbolic formula or a textbook trick for shuffling exponents; it is the optimal first-order linear approximation of local reality.\n\nThink of it like a speedometer on a high-speed train. When you glance at the display and see $240\\text{ km/h}$, that number does not describe where the train was five minutes ago, nor does it guarantee where the train will be an hour from now. It tells you the instantaneous rate of progress along the track: if time were to freeze and unroll at this exact millisecond's pace, you would cover 240 kilometers over the next hour. A derivative is just a speedometer for how fast something is changing at this exact millisecond.\n\nIn modern artificial intelligence and deep learning, this local linearization is the foundation of everything. A deep neural network navigating a loss function with 70 billion parameters does not try to solve the entire cosmic non-linear landscape at once. Instead, at every training step, it places an imaginary flat tangent plane beneath its feet, feels the tilt of that plane, takes a confident step in the downhill direction, and recalculates the new tangent orientation. Complex global optimization is accomplished through a sequence of simple, linear local steps.\n\n---",
          "ar": "تأمل صور كوكب الأرض الملتقطة من مدار القمر: كوكبنا بلا شك كرة زرقاء عملاقة تسبح في ظلمات الفضاء. ومع ذلك، عندما تخطو بقدميك على عشب ملعب كرة القدم في حيك، تشعر بأن الأرض تحت حذائك منبسطة ومسطحة تماماً دون أي تقوس ملحوظ. لماذا؟ لأنك إذا قمت بتكبير أي منحنى أملس وقابل للاشتقاق بدرجة كافية، فإن **الانحناء يتلاشى تدريجياً ويصبح المنحنى مماثلاً لخط مستقيم تماماً**. ما يبدو منحنياً من منظور كوني شاسع، يبدو مستوياً وبسيطاً للنملة التي تدب على السطح.\n\nالمشتقة (Derivative) هي التجسيد الرياضي الدقيق لهذه المعجزة الهندسية: إنها ميل ذلك الخط المماس المحلي الفريد. تجيب المشتقة عن سؤال عملياتي جوهري: *\"إذا قمنا بتكبير المنحنى بمجهر لانهائي حول النقطة $x_0$، فما هو الخط المستقيم البسيط الذي ينوب عن المنحنى غير الخطي المعقد بأعلى دقة ممكنة؟\"* المشتقة ليست مجرد قاعدة جبرية لحساب الرموز أو نقل الأسس في الدفاتر؛ بل هي أفضل تقريب خطي محلي للواقع الرياضي والفيزيائي.\n\nتخيل الأمر كعداد السرعة في قطار فائق السرعة. عندما تنظر إلى الشاشة وتراها تسجل $240\\text{ كم/س}$، فإن هذا الرقم لا يصف أين كان القطار قبل خمس دقائق، ولا يضمن أين سيكون بعد ساعة كاملة. إنه يخبرك فقط بمعدل التقدم اللحظي: لو استمرت حركة القطار بالسرعة ذاتها التي يتحرك بها في هذا الجزء من الثانية، لقطع 240 كيلومتراً في الساعة التالية. المشتقة في جوهرها ليست سوى عداد سرعة يقيس مدى سرعة تغير الظاهرة في هذا الجزء من الثانية تحديداً.\n\nوفي الذكاء الاصطناعي المعاصر والشبكات العصبية العميقة، يمثل هذا التقريب الخطي حجر الزاوية لكل شيء. فالنموذج اللغوي الضخم الذي يحتوي على 70 مليار معامل لا يحاول فهم سطح دالة الخسارة المعقدة دفعة واحدة. بل في كل خطوة تدريب، يستبدل السطح فائق الأبعاد بمستوٍ مماس محلي منبسط، ويستشعر انحدار ذلك المستوي، ويخطو خطوة واثقة في اتجاه الهبوط، ثم يعيد حساب المماس عند النقطة الجديدة. هكذا تُحل أعقد المعضلات غير الخطية بسلسلة من الخطوات الخطية البسيطة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f'(x) \\coloneqq \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
        "formulaNote": {
          "en": "Mathematical anchor for The Derivative as Local Linearization & Tangent Slope.",
          "ar": "المرساة الرياضية لـ المشتقة كتقريب خطي محلي وميل المماس."
        },
        "narrative": {
          "en": "$$\nf(x_0 + \\Delta x) = f(x_0) + f'(x_0)\\Delta x + \\mathcal{O}(\\Delta x^2) \\implies L(x) = f(x_0) + f'(x_0)(x - x_0)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $x_0$ | $\\mathbb{R}$ | Expansion center on domain axis | Anchor coordinate where the tangent line touches the curve |\n| $\\Delta x$ | $\\mathbb{R}$ | Input perturbation / horizontal step $(x - x_0)$ | Distance traveled away from the linearization center |\n| $f'(x_0)$ | $\\mathbb{R}$ | Tangent slope at the expansion center | Multiplicative sensitivity scaling factor relating input nudge to output change |\n| $L(x)$ | $\\mathbb{R}$ | Local linear approximation (tangent line) | Evaluates the flat tangent line height at any nearby query point |\n| $\\mathcal{O}(\\Delta x^2)$ | Error Term | Quadratic curvature remainder | Quantifies how rapidly the true curve pulls away from the tangent line |\n\n#### Intuitive Rationale for the Formula\nThe local linearization $L(x) = f(x_0) + f'(x_0)(x - x_0)$ consists of two intuitive parts:\n1. **The Starting Altitude $f(x_0)$:** If you don't take any step ($\\Delta x = 0$), your estimated height is simply your current altitude.\n2. **The Projected Change $f'(x_0)\\Delta x$:** If you take a step of size $\\Delta x$, your height changes by the slope multiplied by the step distance.\nBecause the true function curves while the tangent line remains straight, an error $\\mathcal{O}(\\Delta x^2)$ emerges. Crucially, because this error is quadratic, if you cut your step size in half ($\\Delta x \\to \\Delta x / 2$), the approximation error drops by a factor of *four* ($1/4$). For small steps, the tangent line is a breathtakingly accurate mirror of the curve.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $x_0$ | $\\mathbb{R}$ | مركز التوسيع على محور المدخلات | نقطة الارتكاز التي يلامس عندها الخط المماس المنحنى |\n| $\\Delta x$ | $\\mathbb{R}$ | الإزاحة الأفقية / خطوة المدخلات $(x - x_0)$ | المسافة المقطوعة بعيداً عن مركز التقريب الخطي |\n| $f'(x_0)$ | $\\mathbb{R}$ | ميل المماس عند مركز التوسيع | معامل الحساسية والتكبير الذي يربط إزاحة المدخل باستجابة المخرج |\n| $L(x)$ | $\\mathbb{R}$ | معادلة المماس الخطي المحلي | يحسب ارتفاع الخط المماس المنبسط عند أي نقطة استعلام مجاورة |\n| $\\mathcal{O}(\\Delta x^2)$ | حد الخطأ | المتبقي التربيعي الناتج عن الانحناء | يقيس سرعة ابتعاد المنحنى الفعلي عن الخط المماس المستقيم |\n\n#### التفسير المنطقي لصياغة المعادلة\nيتكون التقريب الخطي المحلي $L(x) = f(x_0) + f'(x_0)(x - x_0)$ من جزأين بديهيين:\n1. **المنسوب الابتدائي $f(x_0)$:** إذا لم تخطُ أي خطوة ($\\Delta x = 0$)، فإن تقديرك لارتفاعك هو ببساطة مكان وقوفك الحالي.\n2. **التغير المتوقع $f'(x_0)\\Delta x$:** إذا خطوت خطوة أفقية بمقدار $\\Delta x$، فإن ارتفاعك يتغير بمقدار حاصل ضرب الميل في طول الخطوة.\nونظراً لأن المنحنى الحقيقي يتقوس بينما يظل الخط المماس مستقيماً، يظهر خطأ تقريب من الرتبة الثانية $\\mathcal{O}(\\Delta x^2)$. والميزة الجوهرية لهذا الخطأ التربيعي أنه إذا قمت بتقليص خطوتك إلى النصف ($\\Delta x \\to \\Delta x / 2$)، فإن خطأ التقريب ينخفض بمقدار *أربعة أضعاف* ($1/4$). وعند الخطوات الصغيرة، يطابق الخط المماس المنحنى بدقة مذهلة.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-17",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "يستخدم مهندس روبوتات معادلة الخط المماس $L(x) = f(x_0) + f'(x_0)(x - x_0)$ للتنبؤ بمسار ذراع روبوتية عبر خطوة زمنية $\\Delta x$. إذا تحركت الذراع لمسافة مضاعفة ($\\Delta x \\to 2\\Delta x$)، فكيف يتصرف خطأ البتر والتقريب $|f(x) - L(x)|$ لمنحنى حركي أملس غير خطي؟"
          },
          "options": [
            {
              "text": {
                "en": "The error quadruples, scaling quadratically as $\\mathcal{O}(\\Delta x^2)$ according to the Taylor remainder theorem.",
                "ar": "يتضاعف الخطأ أربع مرات، حيث يتناسب طردياً مع مربع الإزاحة $\\mathcal{O}(\\Delta x^2)$ وفقاً لمبرهنة باقي تايلور.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The linear approximation captures the first derivative term perfectly. The leading unexplained error term is the quadratic curvature term $\\frac{1}{2}f''(\\xi)\\Delta x^2$. Doubling the displacement $\\Delta x \\to 2\\Delta x$ multiplies this error by $(2)^2 = 4$.",
                "ar": "يستوعب التقريب الخطي حد المشتقة الأولى بالكامل. والحد الأول المتبقي من الخطأ هو حد الانحناء التربيعي $\\frac{1}{2}f''(\\xi)\\Delta x^2$. وعند مضاعفة خطوة الإزاحة مرتين، يتضاعف مقدار الخطأ بمقدار $(2)^2 = 4$ مرات."
              }
            },
            {
              "text": {
                "en": "The error doubles linearly, scaling as $2\\Delta x$.",
                "ar": "يتضاعف الخطأ خطياً، متناسباً طردياً مع $2\\Delta x$.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A linear error scaling would only occur if we used a constant 0th-order approximation $L(x) = f(x_0)$. The tangent line matches the slope, eliminating the linear error component entirely.",
                "ar": "يتضاعف الخطأ خطياً فقط إذا استخدمنا تقريباً ثابتاً من الدرجة الصفرية $L(x) = f(x_0)$. أما الخط المماس فيطابق الميل ويلغي المكون الخطي للخطأ تماماً."
              }
            },
            {
              "text": {
                "en": "The error remains identical because the tangent slope $f'(x_0)$ is a fixed constant.",
                "ar": "يظل الخطأ ثابتاً دون أي تغير لأن ميل المماس $f'(x_0)$ قيمة عددية ثابتة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Even though the slope $f'(x_0)$ is fixed at the anchor, the true non-linear curve pulls progressively further away from the tangent line as you step farther out.",
                "ar": "رغم أن الميل ثابت عند نقطة الارتكاز، إلا أن المنحنى غير الخطي الحقيقي يبتعد تدريجياً عن الخط المستقيم كلما ابتعدت خطواتك عن المركز."
              }
            },
            {
              "text": {
                "en": "The error drops to zero because derivatives improve with larger step horizons.",
                "ar": "ينخفض الخطأ إلى الصفر لأن دقة المشتقات تتحسن بزيادة مسافة الاستقراء.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Derivatives are strictly local approximations; stepping further away drastically degrades their predictive accuracy.",
                "ar": "المشتقات تقريبات محلية بالغة الحساسية للنطاق الصغير؛ وكلما ابتعدت عن نقطة التماس، تدهورت دقتها التنبؤية بصورة حادة."
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
    "id": "t1-18",
    "title": "The Chain Rule as Compositional Scaling & Flow of Sensitivities",
    "titleAr": "قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine three interlocking brass gears nestled inside the clockwork mechanism of an antique pocket watch.",
      "ar": "تخيل ثلاثة تروس نحاسية مصقولة تتعشق بعناية داخل ساعة يد ميكانيكية عريقة. الترس $A$ يدير الترس $B$، والذي يدير بدوره الترس $C$."
    },
    "prerequisites": [
      "symmetric-matrices-spectral",
      "orthogonal-projections"
    ],
    "x": 140,
    "y": 1695,
    "beats": [
      {
        "number": 1,
        "type": "intuition",
        "simulation": "CurvatureOsculatingCanvas",
        "narrative": {
          "en": "Imagine three interlocking brass gears nestled inside the clockwork mechanism of an antique pocket watch. Gear $A$ turns Gear $B$, which in turn turns Gear $C$. \n- When you nudge Gear $A$ through 1 full rotation, Gear $B$ spins through 3 complete revolutions (its sensitivity ratio is $\\frac{dB}{dA} = 3$).\n- When Gear $B$ completes 1 revolution, Gear $C$ spins through 5 complete revolutions (its sensitivity ratio is $\\frac{dC}{dB} = 5$).\n\nNow ask yourself a straightforward common-sense question: if you rotate Gear $A$ by just a single turn, how many times will Gear $C$ spin? Without cracking open a calculus textbook, your intuition immediately multiplies the two ratios: $3 \\times 5 = 15$ full spins! The overall sensitivity of the final gear with respect to the initial crank is simply the direct product of all the intermediate gear ratios: $\\frac{dC}{dA} = \\frac{dC}{dB} \\cdot \\frac{dB}{dA}$.\n\nThe **Chain Rule** is nothing more than this exact mechanical gear-ratio multiplication applied to mathematical functions connected in a pipeline. Imagine peering through two magnifying glasses lined up one behind the other. If the first lens doubles the apparent size of an object ($2\\times$) and the second lens triples the image produced by the first ($3\\times$), the combined image arriving at your retina is magnified six times ($2 \\times 3 = 6\\times$). The rate of stretching compounds multiplicatively across each stage of the journey.\n\nIn deep learning and neural network training, this principle is the undisputed king of algorithms. Every deep neural network—from ChatGPT to vision models—is nothing more than a giant chain of hundreds of nested functions. Raw tokens or pixels pass into layer 1, whose activations pass into layer 2, which pass through layer 3, ultimately outputting a prediction that is compared to ground truth to yield a single loss number. When we train the network, the backward pass (backpropagation) is simply the chain rule in reverse: it walks backwards through the gear train, multiplying local derivative ratios to tell every single neuron precisely how much blame it carries for the final error.\n\n---",
          "ar": "تخيل ثلاثة تروس نحاسية مصقولة تتعشق بعناية داخل ساعة يد ميكانيكية عريقة. الترس $A$ يدير الترس $B$، والذي يدير بدوره الترس $C$.\n- عندما تدير الترس $A$ دورة واحدة كاملة، يدور الترس $B$ بمقدار 3 دورات كاملة (نسبة الحساسية الميكانيكية هي $\\frac{dB}{dA} = 3$).\n- وعندما يدور الترس $B$ دورة واحدة، يدور الترس $C$ بمقدار 5 دورات كاملة (نسبة الحساسية الميكانيكية هي $\\frac{dC}{dB} = 5$).\n\nوالآن، اطرح على نفسك سؤالاً بديهياً بسيطاً: إذا أدرت الترس الأول $A$ دورة واحدة فقط، فكم دورة سيدور الترس الأخير $C$؟ دون الحاجة لفتح أي مرجع في الرياضيات المتقدمة، سيخبرك حدسك المباشر بضرب النسبتين: $3 \\times 5 = 15$ دورة كاملة! الحساسية الإجمالية لمنظومة التروس بالنسبة للمقبض الابتدائي هي حاصل ضرب نسب التروس الوسيطة المتعاقبة: $\\frac{dC}{dA} = \\frac{dC}{dB} \\cdot \\frac{dB}{dA}$.\n\n**قاعدة السلسلة** (Chain Rule) في الحسبان والتفاضل ليست سوى هذا المبدأ الميكانيكي البسيط مطبقاً على الدوال الرياضية المركبة والمتتالية في سلسلة معالجة. تخيل أنك تنظر إلى نص دقيق عبر عدستين مكبرتين متتاليتين: إذا كانت العدسة الأولى تضاعف حجم الكلمات مرتين ($2\\times$)، وكانت العدسة الثانية تضاعف الصورة الناتجة عن الأولى ثلاث مرات ($3\\times$)، فإن الصورة الإجمالية التي تستقبلها عينك ستكون مكبرة بمقدار ست مرات ($2 \\times 3 = 6\\times$). يتضاعف معدل التمدد الهندسي عبر ضرب معاملات التكبير في كل محطة.\n\nوفي هندسة الذكاء الاصطناعي الحديثة، تمثل قاعدة السلسلة المحرك الخفي لكل نماذج التعلم العميق. فالنماذج اللغوية الكبرى والرؤية الحاسوبية ليست إلا سلاسل هائلة من مئات الدوال الرياضية المتداخلة. تدخل مصفوفات البكسلات أو الكلمات إلى الطبقة الأولى، فتنتقل مخرجاتها إلى الطبقة الثانية، ومنها إلى الثالثة، حتى نصل إلى دالة الخسارة النهائية. وعند تدريب النموذج، تمثل خوارزمية الانتشار الخلفي (Backpropagation) تطبيقاً مباشراً لقاعدة السلسلة: حيث تعود الخوارزمية بالزمن إلى الوراء عبر شبكة التروس الرياضية، ضاربةً المشتقات المحلية ببعضها لتبلغ كل وزن في الشبكة بحصته الدقيقة من المسؤولية عن الخطأ النهائي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x) \\iff \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
        "formulaNote": {
          "en": "Mathematical anchor for The Chain Rule as Compositional Scaling & Flow of Sensitivities.",
          "ar": "المرساة الرياضية لـ قاعدة السلسلة كتمدد تركيبي وتدفق للحساسية."
        },
        "narrative": {
          "en": "$$\n\\frac{dz}{dx_1} = \\prod_{i=1}^{k-1} \\frac{dx_{i+1}}{dx_i} = \\frac{dx_k}{dx_{k-1}} \\frac{dx_{k-1}}{dx_{k-2}} \\cdots \\frac{dx_2}{dx_1}\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $x$ | $\\mathbb{R}$ | Primary input coordinate | The original knob or slider adjusted by the user |\n| $u = g(x)$ | $\\mathbb{R}$ | Intermediate hidden state / activation | Output of the inner function, input to the outer function |\n| $y = f(u)$ | $\\mathbb{R}$ | Final scalar output response | The ultimate output whose sensitivity we seek to measure |\n| $g'(x)$ | $\\mathbb{R}$ | Local stretching factor of the inner map | First gear ratio in the compositional sequence |\n| $f'(g(x))$ | $\\mathbb{R}$ | Local stretching factor of outer map evaluated at state $u$ | Second gear ratio evaluated at the active intermediate state |\n| $\\frac{dy}{dx}$ | $\\mathbb{R}$ | End-to-end composite sensitivity | Compounded multiplicative gradient across the full pipeline |\n\n#### Intuitive Rationale for the Formula\nThe single most common beginner mistake in calculus is writing $f'(x) \\cdot g'(x)$. Why is this fatally wrong? Because the outer function $f$ never touches or sees the original input $x$! \nThink back to the interlocking gears: Gear $C$ is not connected to Gear $A$; it is physically touched only by Gear $B$. Therefore, Gear $C$'s sensitivity must be measured relative to where Gear $B$ is currently positioned ($g(x)$). The outer derivative must *always* be evaluated at the active intermediate state $u = g(x)$, not the distant starting point $x$.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $x$ | $\\mathbb{R}$ | متغير المدخلات الأولي | المقبض أو المعامل الأصلي المراد تعديله واختباره |\n| $u = g(x)$ | $\\mathbb{R}$ | الحالة الكامنة الوسيطة (التنشيط) | مخرج الدالة الداخلية ومدخل الدالة الخارجية |\n| $y = f(u)$ | $\\mathbb{R}$ | المخرج القياسي النهائي للمنظومة | القيمة المستهدفة التي نقيس مدى حساسيتها للمدخل الأصلي |\n| $g'(x)$ | $\\mathbb{R}$ | معامل التمدد المحلي للدالة الداخلية | نسبة الترس الأول في مسار التركيب الرياضي |\n| $f'(g(x))$ | $\\mathbb{R}$ | معامل التمدد للدالة الخارجية عند الحالة $u$ | نسبة الترس الثاني مقاسة عند الحالة النشطة الفعلية $g(x)$ |\n| $\\frac{dy}{dx}$ | $\\mathbb{R}$ | الحساسية الإجمالية للمركب الرياضي | حاصل ضرب كافة التدرجات المتسلسلة على طول المسار |\n\n#### التفسير المنطقي لصياغة المعادلة\nمن أكثر الأخطاء شيوعاً بين المبتدئين في الحسبان كتابة $f'(x) \\cdot g'(x)$. لماذا يُعد هذا خطأً فادحاً؟ لأن الدالة الخارجية $f$ لا تلامس المدخل الأولي $x$ ولا تعرفه على الإطلاق!\nتذكر مثال التروس: الترس الأخير $C$ لا يلامس الترس الأول $A$، بل يتأثر حصرياً بحركة الترس الوسيط $B$. ولذلك يجب قياس حساسية الترس الأخير بناءً على الموضع الذي وصل إليه الترس الوسيط بالفعل ($g(x)$). يجب تقييم مشتقة الدالة الخارجية دوماً عند النقطة الوسيطة النشطة $u = g(x)$، وليس عند نقطة البداية البعيدة $x$.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-18",
          "starterCode": "def composite_chain_rule(\n    x: np.ndarray,\n    w: float,\n    u: float,\n    b1: float,\n    b2: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute forward activation and backward chain rule sensitivity for a 2-layer pipeline:\n        z1 = u * x + b1\n        a1 = tanh(z1)\n        z2 = w * a1 + b2\n        y  = sigmoid(z2)\n        \n    Parameters\n    ----------\n    x : np.ndarray\n        Input batch array of shape (N,).\n    w, u, b1, b2 : float\n        Scalar weights and bias parameters.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        y : Output activation array, shape (N,).\n        dy_dx : Analytical derivative dy/dx across all samples, shape (N,).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def composite_chain_rule(\n    x: np.ndarray,\n    w: float,\n    u: float,\n    b1: float,\n    b2: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute forward activation and backward chain rule sensitivity for a 2-layer pipeline:\n        z1 = u * x + b1\n        a1 = tanh(z1)\n        z2 = w * a1 + b2\n        y  = sigmoid(z2)\n        \n    Parameters\n    ----------\n    x : np.ndarray\n        Input batch array of shape (N,).\n    w, u, b1, b2 : float\n        Scalar weights and bias parameters.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        y : Output activation array, shape (N,).\n        dy_dx : Analytical derivative dy/dx across all samples, shape (N,).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "(0.5, 0.25)"
            }
          },
          "solution": "import numpy as np\n\ndef composite_chain_rule(\n    x: np.ndarray,\n    w: float,\n    u: float,\n    b1: float,\n    b2: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Compute forward activation and backward chain rule sensitivity for a 2-layer pipeline:\n        z1 = u * x + b1\n        a1 = tanh(z1)\n        z2 = w * a1 + b2\n        y  = sigmoid(z2)\n        \n    Parameters\n    ----------\n    x : np.ndarray\n        Input batch array of shape (N,).\n    w, u, b1, b2 : float\n        Scalar weights and bias parameters.\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        y : Output activation array, shape (N,).\n        dy_dx : Analytical derivative dy/dx across all samples, shape (N,).\n    \"\"\"\n    # Step 1: Forward pass through layer 1 linear transformation\n    z1 = u * x + b1\n    \n    # Step 2: Forward pass through hyperbolic tangent activation\n    a1 = np.tanh(z1)\n    \n    # Step 3: Forward pass through layer 2 linear transformation\n    z2 = w * a1 + b2\n    \n    # Step 4: Forward pass through output sigmoid activation\n    y = 1.0 / (1.0 + np.exp(-z2))\n    \n    # Step 5: Backward pass: compute local sensitivities via chain rule\n    # d(sigmoid)/dz2 = y * (1 - y)\n    dy_dz2 = y * (1.0 - y)\n    \n    # dz2/da1 = w\n    dz2_da1 = w\n    \n    # d(tanh)/dz1 = 1 - a1^2\n    da1_dz1 = 1.0 - a1 ** 2\n    \n    # dz1/dx = u\n    dz1_dx = u\n    \n    # Multiply all gear ratios together\n    dy_dx = dy_dz2 * dz2_da1 * da1_dz1 * dz1_dx\n    \n    return y, dy_dx"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "تحتوي شبكة عصبية عميقة على 40 طبقة متتالية حيث تمتلك دالة التنشيط في كل طبقة حداً أقصى للمشتقة المحلية مقداره $|f'(z)| \\le 0.25$ (مثل دالة السيجمويد القياسية). عند تدريب الشبكة بخوارزمية الانحدار التدريجي، تتوقف الطبقات الأولى تماماً عن التعلم. استناداً إلى قاعدة السلسلة، ما السبب الرياضي الجذري لهذا الفشل التدريبي؟"
          },
          "options": [
            {
              "text": {
                "en": "Vanishing gradients, because multiplying 40 consecutive factors bounded by $0.25$ scales as $(0.25)^{40} \\approx 8.3 \\times 10^{-25}$, decaying the backpropagated signal to machine epsilon.",
                "ar": "تلاشي التدرجات (Vanishing Gradients)، لأن ضرب 40 حداً متتالياً لا تتجاوز قيمتها $0.25$ يؤول إلى $(0.25)^{40} \\approx 8.3 \\times 10^{-25}$، مما يخمد إشارة التدرج الراجعة إلى مستوى الصفر الحسابي للأجهزة.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The chain rule states that total sensitivity is the product of all intermediate derivatives: $\\prod_{l=1}^{40} f'_l(z_l)$. When every factor is smaller than $1/4$, multiplying forty such fractions shrinks the gradient exponentially, starving the earliest layers of learning signal.",
                "ar": "تنص قاعدة السلسلة على أن الحساسية الإجمالية هي حاصل ضرب جميع المشتقات الوسيطة: $\\prod_{l=1}^{40} f'_l(z_l)$. وعندما يكون كل عامل أقل من ربع ($1/4$)، يؤدي ضرب 40 كسراً إلى اضمحلال التدرج أسياً، مما يحرم الطبقات المبكرة من أي إشارة لتحديث أوزانها."
              }
            },
            {
              "text": {
                "en": "Exploding gradients caused by compounding large integer ratios across layers.",
                "ar": "انفجار التدرجات (Exploding Gradients) الناتج عن تضاعف نسب عددية صحيحة كبيرة عبر الطبقات.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Exploding gradients occur when intermediate derivatives are strictly greater than $1.0$ (e.g., unbounded weights), causing exponential growth rather than exponential decay.",
                "ar": "يحدث انفجار التدرجات عندما تكون المشتقات الوسيطة أكبر قطعياً من $1.0$ (كوجود أوزان ضخمة غير مقيدة)، مما يسبب نمواً أسياً هائلاً وليس اضمحلالاً نحو الصفر."
              }
            },
            {
              "text": {
                "en": "Matrix singularities caused by non-invertible weight matrices.",
                "ar": "شذوذ المصفوفات وانعدام محددها نتيجة لمصفوفات أوزان غير قابلة للعكس.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Backpropagation requires only matrix-vector multiplications, never matrix inversions. The issue stems purely from scalar product shrinkage.",
                "ar": "لا يتطلب حساب الانتشار الخلفي قلب المصفوفات أبداً، بل يكتفي بعمليات الضرب المتجهي. المشكلة تنبع حصراً من تضاؤل حاصل ضرب الكسور."
              }
            },
            {
              "text": {
                "en": "Numerical overflow in the loss function's numerator.",
                "ar": "فيض حسابي رقمي (Numerical Overflow) في بسط دالة الخسارة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Vanishing gradient is an underflow phenomenon (decaying to zero), not an overflow (exploding to infinity).",
                "ar": "تلاشي التدرج هو ظاهرة نقص حسابي (Underflow) تؤول إلى الصفر، وليس فيضاً حسابياً يتجاوز حدود الذاكرة نحو اللانهاية."
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
    "id": "t1-19",
    "title": "Second Derivatives, Concavity & Curvature",
    "titleAr": "المشتقة الثانية، التقعر، ومفهوم الانحناء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "If the first derivative is your speedometer—telling you whether you are hiking uphill or downhill—what does the second derivative tell you?...",
      "ar": "إذا كانت المشتقة الأولى هي عداد سرعتك—تخبرك بما إذا كنت تصعد الجبل أم تهبطه—فماذا تخبرك المشتقة الثانية؟ إنها تقيس ما يحدث لشدة الانحدار..."
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
          "en": "If the first derivative is your speedometer—telling you whether you are hiking uphill or downhill—what does the **second derivative** tell you? It tells you what is happening to the steepness itself: is the slope accelerating upward into an insurmountable cliff, or is the terrain leveling out into a tranquil mountain meadow? The first derivative is velocity; the second derivative is acceleration and geometric bending.\n\nImagine riding a high-speed roller coaster through a steep, dramatic dip in the tracks. As you plunge through the bottom of the trench, your speedometer might read a rock-steady $90\\text{ km/h}$. Yet at that very instant, your body is slammed deep into the padded seat by immense, bone-crushing G-forces. Why? You do not physically feel constant forward velocity; your inner ear and muscles feel **acceleration and geometric curvature**. The track is aggressively bending upward beneath the wheels, violently forcing your trajectory to change direction.\n\nGeometrically, consider the shape of a smooth ceramic soup bowl sitting on a dining table. The bowl curves upward in all directions: it can catch pouring soup and gather pooling water at its lowest point. Any marble or billiard ball dropped inside will naturally roll down the sloping sides and settle at a unique, stable resting point. This is the hallmark of a **convex / concave-up** curve ($f''(x) > 0$): the slope is constantly increasing from negative to positive. Conversely, flip the bowl upside down into an umbrella ($f''(x) < 0$): it sheds raindrops immediately, and any ball perched on its peak will roll away at the slightest breeze.\n\nIn geometry and robotics, we quantify this bendiness through **intrinsic curvature** $\\kappa(x)$. Picture placing a circular coin against a bending curve so that it snugly fits the inner contour. This is called the *osculating circle* (the \"kissing circle\"). A tight hairpin turn on a mountain pass has a tiny kissing circle and huge curvature $\\kappa$; a long, sweeping highway bend has a gigantic kissing circle and near-zero curvature. Understanding curvature allows self-driving cars to negotiate corners safely and optimization algorithms to adjust their step sizes to the contour of the terrain.\n\n---",
          "ar": "إذا كانت المشتقة الأولى هي عداد سرعتك—تخبرك بما إذا كنت تصعد الجبل أم تهبطه—فماذا تخبرك **المشتقة الثانية**؟ إنها تقيس ما يحدث لشدة الانحدار ذاتها: هل يتسارع الميل صعوداً ليتحول إلى جرف صخري شاهق، أم ينبسط تدريجياً ليتحول إلى مرج جبلي هادئ؟ المشتقة الأولى هي السرعة؛ أما المشتقة الثانية فهي التسارع والانحناء الهندسي.\n\nتخيل أنك تركب قطار ملاهٍ أفعوانياً فائق السرعة وهو يغوص في منخفض حاد بين التلال. عند وصول القطار إلى قاع المنخفض تماماً، قد يشير عداد السرعة إلى $90\\text{ كم/س}$ ثابتة ومستقرة. ومع ذلك، في تلك اللحظة بالذات، يشعر جسدك بقوة ضاغطة هائلة تشدك بعنف نحو المقعد. لماذا؟ حواسك وجسدك لا يشعران بالسرعة الثابتة، بل يشعران بـ **التسارع والانحناء الهندسي للمسار**. القضبان تنحني بقوة نحو الأعلى تحت العجلات، مجبرة مسار حركتك على تغيير اتجاهه في كل جزء من الثانية.\n\nهندسياً، تأمل شكل إناء حساء خزفي أملس موضوع على طاولة طعام. ينحني الإناء نحو الأعلى في جميع الاتجاهات: فهو قادر على استقبال الماء وجمعه ليستقر في أعمق نقطة في قاعه. وأي كرة زجاجية تسقط داخل هذا الإناء ستتدحرج تلقائياً على الجوانب المائلة لتستقر بثبات في القاع الفريد. هذه هي السمة الجوهرية للمنحنى **المحدب أو المقعر لأعلى** ($f''(x) > 0$): حيث يتزايد الميل باستمرار من القيم السالبة إلى الموجبة. وعلى النقيض من ذلك، إذا قلبت الإناء ليصبح مظلة مقلوبة ($f''(x) < 0$)، فإنه يطرد قطرات المطر، وأي كرة تستقر فوق قمته ستتدحرج مبتعدة عند أدنى هبة ريح.\n\nوفي الهندسة والروبوتات، نقيس هذا الالتواء بما يُعرف بـ **الانحناء الجوهري** $\\kappa(x)$. تخيل وضع قرص دائري يلامس المنحنى من الداخل ويلتصق به بنعومة تامة. تُسمى هذه الدائرة هندسياً \"دائرة التقبيل\" (Osculating Circle). المنعطف الجبلي الحاد يمتلك دائرة تقبيل بالغة الصغر وانحناءً فائق الشدة $\\kappa$؛ بينما يمتلك منعطف الطريق السريع العريض دائرة تقبيل عملاقة وانحناءً يقترب من الصفر. يساعد فهم الانحناء سيارات القيادة الذاتية على الدوران بسلاسة، كما يمكّن خوارزميات الاستمثال من تكييف حجم خطواتها مع تضاريس الوادي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f''(x) \\coloneqq \\frac{d^2 f}{dx^2} = \\lim_{h \\to 0} \\frac{f'(x + h) - f'(x)}{h} = \\lim_{h \\to 0} \\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}",
        "formulaNote": {
          "en": "Mathematical anchor for Second Derivatives, Concavity & Curvature.",
          "ar": "المرساة الرياضية لـ المشتقة الثانية، التقعر، ومفهوم الانحناء."
        },
        "narrative": {
          "en": "$$\n\\kappa(x) \\coloneqq \\frac{|f''(x)|}{\\left(1 + [f'(x)]^2\\right)^{3/2}} \\quad (\\text{Intrinsic Geometric Curvature})\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $f'(x)$ | $\\mathbb{R}$ | Slope of the tangent line | First-order rate of change / instantaneous velocity |\n| $f''(x)$ | $\\mathbb{R}$ | Rate of change of the tangent slope | Second-order acceleration / bending rate of the curve |\n| $\\kappa(x)$ | $\\mathbb{R}_{\\ge 0}$ | Intrinsic curvature: reciprocal of the osculating circle radius ($1/R$) | Coordinate-invariant bending intensity of the spatial path |\n| $f''(c) > 0$ | Condition | Convex bowl holding water | Certifies that a flat critical point $f'(c) = 0$ is a strict local minimum |\n| $f''(c) < 0$ | Condition | Concave dome shedding water | Certifies that a flat critical point $f'(c) = 0$ is a strict local maximum |\n\n#### Intuitive Rationale for the Stencil\nNotice the beautiful symmetry of the 3-point central difference formula:\n$$\n\\frac{f(x+h) - 2f(x) + f(x-h)}{h^2} = \\frac{\\frac{f(x+h) + f(x-h)}{2} - f(x)}{\\frac{h^2}{2}}\n$$\nLook closely at the numerator: $\\frac{f(x+h) + f(x-h)}{2}$ is simply the **average height of the two neighbors**! The formula asks a beautifully simple question: *\"Is the center point lower or higher than the average of its neighbors?\"*\n- If the center is lower than its neighbors, the difference is positive ($f''(x) > 0$), meaning the ground dips into a valley.\n- If the center is higher than its neighbors, the difference is negative ($f''(x) < 0$), meaning the ground rises into a peak.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $f'(x)$ | $\\mathbb{R}$ | ميل الخط المماس للمنحنى | معدل التغير اللحظي من الرتبة الأولى / السرعة |\n| $f''(x)$ | $\\mathbb{R}$ | معدل تغير ميل المماس ذاته | التسارع من الرتبة الثانية / معدل تقوس المنحنى |\n| $\\kappa(x)$ | $\\mathbb{R}_{\\ge 0}$ | الانحناء الهندسي الجوهري: مقلوب نصف قطر دائرة التقبيل ($1/R$) | مقياس شدة الانحناء المستقل عن اختيار المحاور |\n| $f''(c) > 0$ | شرط رياضي | إناء محدب يحتفظ بالماء | يؤكد أن النقطة الحرجة المنبسطة $f'(c) = 0$ هي نهاية صغرى محلية مستقرة |\n| $f''(c) < 0$ | شرط رياضي | قبة مقعرة تطرد الماء | يؤكد أن النقطة الحرجة المنبسطة $f'(c) = 0$ هي نهاية عظمى محلية غير مستقرة |\n\n#### التفسير المنطقي لصياغة المعادلة\nتأمل التناظر البديع في صيغة الفروق المركزية ثلاثية النقاط:\n$$\n\\frac{f(x+h) - 2f(x) + f(x-h)}{h^2} = \\frac{\\frac{f(x+h) + f(x-h)}{2} - f(x)}{\\frac{h^2}{2}}\n$$\nانظر إلى البسط بدقة: المقدار $\\frac{f(x+h) + f(x-h)}{2}$ هو ببساطة **متوسط منسوب النقطتين المجاورتين**! تسأل المعادلة سؤالاً بديهياً في غاية الذكاء: *\"هل موضع النقطة المركزية أدنى أم أعلى من متوسط جارتيها؟\"*\n- إذا كانت النقطة المركزية أخفض من جارتيها، يكون الفارق موجباً ($f''(x) > 0$)، مما يعني أن الأرض تنحني لأعلى مشكلة قاع وادٍ.\n- وإذا كانت النقطة المركزية أعلى من جارتيها، يكون الفارق سالباً ($f''(x) < 0$)، مما يعني أن الأرض تنحني لأسفل مشكلة قمة تل.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-19",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "عثرت خوارزمية استمثال وتحسين على نقطة حرجة $x^*$ ينعدم عندها المماس $f'(x^*) = 0$. وعند حساب المشتقة الثانية عند تلك النقطة، كانت النتيجة $f''(x^*) = 0$. هل تستطيع الخوارزمية الجزم بأمان بأن النقطة $x^*$ هي نهاية صغرى محلية؟"
          },
          "options": [
            {
              "text": {
                "en": "No, the second derivative test is inconclusive; $x^*$ could be a minimum (like $f(x)=x^4$), a maximum (like $f(x)=-x^4$), or an inflection point (like $f(x)=x^3$). Higher-order derivatives must be examined.",
                "ar": "لا، فاختبار المشتقة الثانية غير حاسم؛ فقد تكون النقطة $x^"
              },
              "correct": true,
              "explanation": {
                "en": "When $f''(x^*) = 0$, the quadratic curvature vanishes completely. The nature of the point is governed by the first non-zero higher-order derivative in the Taylor expansion. If the first non-zero derivative is of odd order, it is an inflection point; if of even order, its sign dictates whether it is a minimum or maximum.",
                "ar": "عندما تنعدم المشتقة الثانية $f''(x^*) = 0$، يتلاشى الانحناء التربيعي تماماً. ويتحدد نوع النقطة بأول مشتقة لا تساوي الصفر في متسلسلة تايلور: فإذا كانت من رتبة فردية فهي نقطة انقلاب؛ وإذا كانت من رتبة زوجية فإن إشارتها هي التي تحدد ما إذا كانت نهاية صغرى أو عظمى."
              }
            },
            {
              "text": {
                "en": "Yes, because $f''(x^*) = 0$ proves the surface is completely flat and stable.",
                "ar": "نعم، لأن $f''(x^"
              },
              "correct": false,
              "explanation": {
                "en": "Flatness at a single point does not guarantee stability; for example, $f(x) = x^3$ has $f'(0)=0$ and $f''(0)=0$, but it plunges into negative values for any $x < 0$.",
                "ar": "الانبساط عند نقطة وحيدة لا يعني الاستقرار؛ فالدالة $f(x) = x^3$ ينعدم ميلها وانحناؤها عند الصفر، ومع ذلك تهوي نحو قيم سالبة سحيقة بمجرد التحرك يساراً."
              }
            },
            {
              "text": {
                "en": "Yes, any critical point with non-negative second derivative is unconditionally a minimum.",
                "ar": "نعم، أي نقطة حرجة تمتلك مشتقة ثانية غير سالبة تُعد حتماً نهاية صغرى دون قيد أو شرط.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Non-negative includes zero. A minimum requires either a strictly positive second derivative ($f'' > 0$) or verified higher-order convexity.",
                "ar": "يشمل مصطلح \"غير سالبة\" الصفر. والنهاية الصغرى تتطلب إما مشتقة ثانية موجبة تماماً ($f'' > 0$) أو التحقق من التحدب عبر المشتقات العليا."
              }
            },
            {
              "text": {
                "en": "No, because points with $f''(x^*) = 0$ are guaranteed to be local maxima.",
                "ar": "لا، لأن النقاط التي تحقق $f''(x^"
              },
              "correct": false,
              "explanation": {
                "en": "For $f(x) = x^4$, the origin is a strict global minimum even though $f''(0) = 0$.",
                "ar": "في الدالة $f(x) = x^4$، تمثل نقطة الأصل نهاية صغرى شاملة ومطلقة رغم أن مشتقتها الثانية تساوي صفراً $f''(0) = 0$."
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
    "id": "t1-20",
    "title": "Taylor Series as Polynomial Approximation of Reality",
    "titleAr": "متسلسلة تايلور كتقريب حدودي للواقع",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Transcendental functions like $\\sin(x)$, $\\cos(x)$, $e^x$, and $\\ln(x)$ are computationally elusive.",
      "ar": "تُعد الدوال المتسامية مثل $\\sin(x)$ و $\\cos(x)$ و $e^x$ و $\\ln(x)$ دوالاً عصية على الحساب الذهني المباشر؛ فلو سألك أحد في الطريق عن القيمة..."
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
          "en": "Transcendental functions like $\\sin(x)$, $\\cos(x)$, $e^x$, and $\\ln(x)$ are computationally elusive. If someone asks you on the street to calculate $\\cos(0.42)$ or $e^{1.7}$ in your head, you cannot do it with simple mental arithmetic. But polynomials—mathematical expressions constructed purely from the elementary building blocks of addition and multiplication, like $c_0 + c_1 x + c_2 x^2 + c_3 x^3$—are remarkably easy for both human brains and digital silicon microprocessors to evaluate in mere nanoseconds.\n\nA **Taylor Series** is the ultimate recipe for manufacturing an ultra-accurate polynomial twin of *any* smooth mathematical curve around an anchor point $a$. Think of it like a master tailor crafting a bespoke suit to fit a client:\n- **Degree 0:** Pin the cloth to the client's position: match the function's height, $P_0(x) = f(a)$.\n- **Degree 1:** Align the fabric along the client's posture: match the tangent slope, $P_1(x) = f(a) + f'(a)(x-a)$.\n- **Degree 2:** Bend the fabric into the curves of the body: match the local curvature, $P_2(x) = P_1(x) + \\frac{f''(a)}{2!}(x-a)^2$.\n- **Degree 3:** Match the twisting rate of curvature (jerk), and so on with higher orders.\n\nWith each derivative term you sew into the polynomial, the approximation hugs the true curve across an increasingly wide neighborhood. What begins as a crude flat line transforms into a flexible, hugging curve that tracks every dip, crest, and wave of the original function. A Taylor series is just a polynomial clone of any smooth function built by matching its local DNA of derivatives.\n\nIn machine learning and numerical optimization, second-order Taylor expansions are the secret weapon behind lightning-fast solvers. While basic gradient descent models the terrain as a flat tilted ramp (a 1st-order Taylor approximation), **Newton-Raphson optimization** fits a quadratic bowl (a 2nd-order Taylor approximation) to the loss landscape. Instead of taking cautious baby steps downhill, it calculates the minimum of that quadratic bowl and jumps straight to its bottom in a single step!\n\n---",
          "ar": "تُعد الدوال المتسامية مثل $\\sin(x)$ و $\\cos(x)$ و $e^x$ و $\\ln(x)$ دوالاً عصية على الحساب الذهني المباشر؛ فلو سألك أحد في الطريق عن القيمة الدقيقة لـ $\\cos(0.42)$ أو $e^{1.7}$، فلن تتمكن من حسابها ذهنياً بالاعتماد على الحساب البسيط. لكن كثيرات الحدود (Polynomials)—تلك التعبيرات الرياضية المبنية حصرياً من اللبنات الأولية البسيطة: الجمع والضرب، مثل $c_0 + c_1 x + c_2 x^2 + c_3 x^3$—هي أسهل ما يمكن للذهن البشري ولمعالجات السيليكون الرقمية حسابه في أجزاء من النانو ثانية.\n\n**متسلسلة تايلور** (Taylor Series) هي الوصفة الهندسية الكبرى لصناعة نسخة طبق الأصل من أي دالة رياضية ملساء حول نقطة ارتكاز $a$. تخيل الأمر كخياط ماهر يفصل ثوباً فاخراً يطابق تفاصيل جسد العميل بدقة متناهية:\n- **الدرجة 0:** تثبيت القماش عند موضع العميل: مطابقة منسوب الدالة وارتفاعها، $P_0(x) = f(a)$.\n- **الدرجة 1:** توجيه القماش مع ميل الجسد: مطابقة ميل المماس اللحظي، $P_1(x) = f(a) + f'(a)(x-a)$.\n- **الدرجة 2:** ثني القماش ليطابق انحناءات الجسد: مطابقة الانحناء المحلي، $P_2(x) = P_1(x) + \\frac{f''(a)}{2!}(x-a)^2$.\n- **الدرجة 3:** مطابقة معدل التواء الانحناء، وهكذا مع كل رتبة أعلى.\n\nمع كل حد إضافي تدخله في تركيبة كثيرة الحدود، يلتصق المنحنى التقريبي بالدالة الأصلية عبر نطاق أوسع وأشمل. ما يبدأ كخط مستقيم بسيط يتحول تدريجياً إلى منحنى مرن يحتضن كل وادٍ وقمة وموجة في الدالة الحقيقية. متسلسلة تايلور في جوهرها ليست سوى استنساخ حدودي لأي دالة ملساء عبر مطابقة شفرتها الوراثية المكونة من مشتقاتها المتتالية.\n\nوفي تعلم الآلة والاستمثال الرياضي، تمثل تقريبات تايلور من الدرجة الثانية السلاح السري لخوارزميات التحسين فائقة السرعة. فبينما تفترض خوارزمية الانحدار التدريجي البسيطة أن التضاريس عبارة عن منحدر مائل منبسط (تقريب تايلور من الدرجة الأولى)، تقوم **طريقة نيوتن** (Newton-Raphson) بتركيب إناء تربيعي مقعر (تقريب تايلور من الدرجة الثانية) على سطح الخسارة. وبدلاً من الهبوط بخطوات مترددة، تحسب قاع ذلك الإناء وتقفز إليه مباشرة في خطوة واحدة!"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f(x) = \\sum_{k=0}^K \\frac{f^{(k)}(a)}{k!} (x - a)^k + R_K(x)",
        "formulaNote": {
          "en": "Mathematical anchor for Taylor Series as Polynomial Approximation of Reality.",
          "ar": "المرساة الرياضية لـ متسلسلة تايلور كتقريب حدودي للواقع."
        },
        "narrative": {
          "en": "$$\nR_K(x) = \\frac{f^{(K+1)}(\\xi)}{(K+1)!} (x - a)^{K+1} \\quad \\text{for some } \\xi \\in (a, x)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $a$ | $\\mathbb{R}$ | Expansion anchor center coordinate | The home base where all derivative measurements are sampled |\n| $x - a$ | $\\mathbb{R}$ | Horizontal displacement from anchor | The lever arm determining how far you are venturing from home |\n| $f^{(k)}(a)$ | $\\mathbb{R}$ | $k$-th derivative of $f$ evaluated at point $a$ | The geometric probe measuring the $k$-th order wiggle rate |\n| $k!$ (Factorial) | Integer | Normalization constant ($k \\times (k-1) \\times \\dots \\times 1$) | Compensates for the repeated power-rule differentiation: $\\frac{d^k}{dx^k}(x^k) = k!$ |\n| $R_K(x)$ | $\\mathbb{R}$ | Lagrange remainder / truncation error | The mathematical guarantee bounding the worst-case approximation error |\n\n#### Intuitive Rationale for the Factorial $k!$\nWhy does the factorial $k!$ appear in the denominator? \nConsider what happens when you take the derivative of a power term like $x^3$:\n- First derivative: $3x^2$\n- Second derivative: $3 \\times 2 x$\n- Third derivative: $3 \\times 2 \\times 1 = 6 = 3!$\nEvery time you differentiate a power, the exponent drops down as a multiplier. If we want the $k$-th derivative of our approximating polynomial at $x = a$ to match $f^{(k)}(a)$ with 100% exactness without accumulating unwanted multipliers, we *must* divide that term by $k!$ in advance! Furthermore, because $k!$ grows with blinding speed ($10! \\approx 3.6 \\times 10^6$), the denominators quickly crush higher-order terms toward zero, guaranteeing rapid numerical convergence.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $a$ | $\\mathbb{R}$ | مركز التوسيع ونقطة الارتكاز | القاعدة المرجعية التي تُقاس عندها كافة المشتقات المحلية |\n| $x - a$ | $\\mathbb{R}$ | مسافة الإزاحة الأفقية عن المركز | ذراع الرافعة الذي يحدد مدى ابتعاد نقطة الاستعلام عن المركز |\n| $f^{(k)}(a)$ | $\\mathbb{R}$ | المشتقة من الرتبة $k$ للدالة عند $a$ | المجس الهندسي الذي يقيس معدل التغير من الدرجة $k$ |\n| $k!$ (مضروب العدد) | عدد صحيح | معامل تطبيع قياسي ($k \\times (k-1) \\times \\dots \\times 1$) | يلغي المعاملات التراكمية الناتجة عن تكرار اشتقاق القوة: $\\frac{d^k}{dx^k}(x^k) = k!$ |\n| $R_K(x)$ | $\\mathbb{R}$ | باقي لاغرانج / خطأ البتر المتبقي | الضمانة الرياضية الصارمة التي تحدد أقصى خطأ تقريب ممكن |\n\n#### التفسير المنطقي لوجود المضروب $k!$\nلماذا يظهر مضروب العدد $k!$ في المقام؟\nتأمل ما يحدث عندما تشتق حداً مرفوعاً لقوة مثل $x^3$:\n- المشتقة الأولى: $3x^2$\n- المشتقة الثانية: $3 \\times 2 x$\n- المشتقة الثالثة: $3 \\times 2 \\times 1 = 6 = 3!$\nفي كل مرة تشتق فيها قوة، يهبط الأس كمعامل ضرب أمامي. فإذا أردنا للمشتقة من الرتبة $k$ لكثيرة الحدود عند النقطة $x = a$ أن تطابق تماماً وبنسبة 100% قيمة المشتقة الأصلية $f^{(k)}(a)$ دون أي تشويه عددي، فإنه يتحتم علينا مسبقاً قسمة الحد على $k!$ لإلغاء تلك المعاملات! وفضلاً عن ذلك، ونظراً لأن المضروب ينمو بسرعة فلكية ($10! \\approx 3.6 \\times 10^6$)، فإن المقام يسحق الحدود العليا بسرعة نحو الصفر، مما يضمن تقارباً عددياً فائق السرعة.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-20",
          "starterCode": "def taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Vectorized evaluation of degree-K Taylor polynomial across query points x.\n    Uses broadcasting and cumulative factorials to eliminate Python loops.\n    \n    Parameters\n    ----------\n    coeffs : np.ndarray\n        Array of derivatives [f(a), f'(a), ..., f^{(K)}(a)] of length K+1.\n    a : float\n        Expansion center coordinate.\n    x : np.ndarray\n        Query evaluation points of shape (N,).\n        \n    Returns\n    -------\n    np.ndarray\n        Taylor approximation values T_K(x) of shape (N,).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
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
              "starterCode": "def taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Vectorized evaluation of degree-K Taylor polynomial across query points x.\n    Uses broadcasting and cumulative factorials to eliminate Python loops.\n    \n    Parameters\n    ----------\n    coeffs : np.ndarray\n        Array of derivatives [f(a), f'(a), ..., f^{(K)}(a)] of length K+1.\n    a : float\n        Expansion center coordinate.\n    x : np.ndarray\n        Query evaluation points of shape (N,).\n        \n    Returns\n    -------\n    np.ndarray\n        Taylor approximation values T_K(x) of shape (N,).\n    \"\"\"\n    # TODO: Implement vectorized computation\n    pass",
              "expectedOutput": "1.0"
            }
          },
          "solution": "import numpy as np\n\ndef taylor_polynomial_series(coeffs: np.ndarray, a: float, x: np.ndarray) -> np.ndarray:\n    \"\"\"\n    Vectorized evaluation of degree-K Taylor polynomial across query points x.\n    Uses broadcasting and cumulative factorials to eliminate Python loops.\n    \n    Parameters\n    ----------\n    coeffs : np.ndarray\n        Array of derivatives [f(a), f'(a), ..., f^{(K)}(a)] of length K+1.\n    a : float\n        Expansion center coordinate.\n    x : np.ndarray\n        Query evaluation points of shape (N,).\n        \n    Returns\n    -------\n    np.ndarray\n        Taylor approximation values T_K(x) of shape (N,).\n    \"\"\"\n    k = np.arange(len(coeffs))\n    \n    # Step 1: Compute factorial normalizations [0!, 1!, 2!, ..., K!]\n    factorials = np.ones(len(coeffs), dtype=float)\n    if len(coeffs) > 1:\n        factorials[1:] = np.cumprod(np.arange(1, len(coeffs)))\n        \n    # Step 2: Normalize coefficients: coeffs[k] / k!\n    norm_coeffs = coeffs / factorials\n    \n    # Step 3: Compute displacement powers (x - a)^k via 2D broadcasting (N, K+1)\n    powers = (x[:, None] - a) ** k[None, :]\n    \n    # Step 4: Sum weighted power terms across degree axis\n    return np.sum(powers * norm_coeffs[None, :], axis=1)"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "تقوم طرق الاستمثال والتحسين من الرتبة الثانية (مثل طريقة نيوتن) بتصغير نموذج تايلور التربيعي المحلي $P_2(x) = f(x_t) + f'(x_t)(x - x_t) + \\frac{1}{2} f''(x_t)(x - x_t)^2$ عبر القفز مباشرة نحو قاعه: $x_{t+1} = x_t - \\frac{f'(x_t)}{f''(x_t)}$. لماذا تتقارب هذه الطريقة تقارباً تربيعياً فائق السرعة قرب النقطة المثلى مقارنة بالانحدار التدريجي التقليدي؟"
          },
          "options": [
            {
              "text": {
                "en": "By incorporating local curvature ($f''$), Newton's method adapts its step size to the terrain's bowl geometry, taking large steps when the bowl is flat and cautious steps when it is sharply curved.",
                "ar": "بدمج الانحناء المحلي ($f''$)، تكيّف طريقة نيوتن حجم خطوتها تلقائياً مع هندسة تضاريس الإناء، فتأخذ خطوات كبيرة وسريعة عندما يكون القاع مسطحاً، وخطوات دقيقة حذرة عندما يكون الانحناء حاداً.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Standard gradient descent relies only on slope $f'$ and uses a fixed learning rate $\\eta$, causing it to crawl or oscillate. Newton's step divides by curvature $f''$, perfectly scaling the step to reach the bottom of the local quadratic bowl in a single leap.",
                "ar": "يعتمد الانحدار التدريجي العادي على الميل $f'$ فقط بمعدل تعلم ثابت $\\eta$، مما يجعله بطيئاً أو متذبذباً. بينما تقسم خطوة نيوتن على الانحناء $f''$، مما يضبط طول الخطوة بدقة للوصول إلى قاع الإناء التربيعي في قفزة مباشرة."
              }
            },
            {
              "text": {
                "en": "Newton's method completely avoids evaluating the gradient.",
                "ar": "تتجنب طريقة نيوتن حساب التدرج والميل تماماً وبصورة كلية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Newton's method explicitly requires the gradient $f'(x_t)$ in the numerator of its update formula.",
                "ar": "تتطلب طريقة نيوتن صراحة حساب التدرج والمشتقة الأولى $f'(x_t)$ في بسط معادلة التحديث."
              }
            },
            {
              "text": {
                "en": "Taylor series higher-order terms are guaranteed to be identically zero for all real-world loss functions.",
                "ar": "حدود تايلور العليا من الرتبة الثالثة فما فوق مضمونة بأن تكون صفراً تاماً في كافة دوال الخسارة الواقعية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Real-world neural loss functions are non-quadratic; higher-order terms exist, which is why Newton's method requires multiple iterative steps rather than finding the global minimum in one step.",
                "ar": "دوال الخسارة في الشبكات العصبية غير تربيعية؛ وحدود الرتب العليا موجودة وحقيقية، ولذلك تحتاج طريقة نيوتن إلى تكرار الخطوات للتقارب بدلاً من خطوة واحدة مطلقة."
              }
            },
            {
              "text": {
                "en": "The factorial denominator eliminates numerical roundoff errors on modern floating-point hardware.",
                "ar": "يُلغي مقام المضروب أخطاء التقريب الحسابي على عتاد الفاصلة العائمة الحديث.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The factorial is a mathematical scaling from calculus, not a floating-point trick, and large factorials can actually cause floating-point overflow if evaluated naively.",
                "ar": "المضروب معامل رياضي ناتج عن قواعد الاشتقاق، وليس حيلة للفاصلة العائمة، بل إن المضروب الكبير قد يسبب فيضاً حسابياً إذا لم يُحسب بحذر."
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
    "id": "t1-21",
    "title": "Multivariable Scalar Fields & Topographic Elevation Landscapes",
    "titleAr": "الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine hiking across a vast mountainous wilderness on an autumn morning. At every single geographic coordinate where you plant your...",
      "ar": "تخيل أنك تخوض رحلة استكشافية في محمية جبلية شاسعة في صباح خريفي منعش. عند كل نقطة جغرافية تضع عليها حذاءك—والمحددة بدقة عبر خط العرض $x$..."
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
          "en": "Imagine hiking across a vast mountainous wilderness on an autumn morning. At every single geographic coordinate where you plant your boots—indexed by your latitude $x$ and longitude $y$ on a handheld GPS device—there is a single physical number you can read on your altimeter: your **elevation above sea level**, $z = f(x, y)$. As you trek forward, the ground rises into rocky crags or dips into emerald valleys.\n\nThis mathematical assignment of a single scalar number to every point across a multi-dimensional space is called a **scalar field**. It is one of the most fundamental concepts in science. The atmospheric temperature in a room is a 3D scalar field: at every spatial coordinate $(x, y, z)$, a thermometer reads one temperature value $T$. The air pressure across a continent, the electrical potential in a battery, and the gravitational potential of a solar system are all scalar fields.\n\nTo represent a 3D elevation landscape on a flat, 2D paper hiking map, cartographers use an ingenious visual tool: **contour lines** (also known as level curves or isolines). A contour line is an imaginary path that connects all locations sharing the exact same elevation, say $1,500\\text{ meters}$. If you hike strictly along a contour line, you will never climb or descend by a single centimeter; your breath remains steady and your altimeter stays completely frozen.\n\nPay close attention to how contour lines are drawn on a map:\n- Where contour lines are tightly packed together like dense ripples in water, the landscape changes elevation dramatically over a tiny horizontal distance: you are standing before a **sheer, perilous cliff**.\n- Where contour lines are spread broadly apart with generous breathing room, elevation changes lazily: you are strolling through a **gentle, rolling meadow**.\n\nIn artificial intelligence and data science, the loss surface of a neural network parameterized by weights $(w_1, w_2)$ is precisely a multivariable scalar field. Optimization algorithms like gradient descent are the hikers navigating this invisible high-dimensional landscape, searching through deep canyons, narrow ravines, and wide plateaus to find the lowest possible basin of error.\n\n---",
          "ar": "تخيل أنك تخوض رحلة استكشافية في محمية جبلية شاسعة في صباح خريفي منعش. عند كل نقطة جغرافية تضع عليها حذاءك—والمحددة بدقة عبر خط العرض $x$ وخط الطول $y$ على جهاز الملاحة GPS—هناك قراءة عددية قياسية وحيدة يسجلها مقياس الارتفاع الرقمي: **ارتفاعك عن مستوى سطح البحر**، $z = f(x, y)$. ومع مواصلتك السير، ترتفع الأرض بك نحو قمم صخرية شاهقة، أو تنحدر بك نحو أودية زمردية عميقة.\n\nهذا التعيين الرياضي الذي يربط كل موقع في فضاء متعدد الأبعاد برقم قياسي وحيد يُسمى في الفيزياء والرياضيات **الحقل العددي** (Scalar Field). إنه أحد أكثر المفاهيم التأسيسية أصالة في العلوم الطبيعية؛ فدرجة حرارة الهواء في غرفتك هي حقل عددي ثلاثي الأبعاد: عند كل إحداثي مكاني $(x, y, z)$، يسجل مقياس الحرارة درجة واحدة $T$. وضغط الهواء الجوي فوق القارات، والجهد الكهربائي داخل البطاريات، وحقل الجاذبية الأرضية، كلها حقول عددية حقيقية.\n\nولتمثيل هذه التضاريس الجبلية ثلاثية الأبعاد على خريطة ورقية مسطحة ذات بعدين، يبتكر الجغرافيون أداة بصرية مذهلة تُدعى **خطوط الكنتور** (Contour Lines أو خطوط المنسوب والتسوية). خط الكنتور هو مسار وهمي يربط بين جميع النقاط التي تتشارك نفس الارتفاع تماماً، مثلاً $1,500\\text{ متر}$. وإذا سرت بحذائك على طول خط الكنتور بدقة، فلن تصعد ولن تهبط بمقدار سنتيمتر واحد؛ ستبقى أنفاسك هادئة وستظل قراءة مقياس الارتفاع ثابتة لا تتزحزح.\n\nتأمل المسافات الفاصلة بين خطوط الكنتور على الخريطة:\n- عندما تتزاحم خطوط الكنتور وتتقارب بشدة كتموجات مائية متراصة، فهذا يعني أن الارتفاع يتغير بسرعة هائلة عبر مسافة أفقية قصيرة: أنت تقف أمام **جرف صخري شديد الانحدار**.\n- وعندما تتباعد خطوط الكنتور بسخاء وتتسع المسافات بينها، يتغير الارتفاع بهدوء وبطء شديد: أنت تتجول في **مرج أخضر منبسط ومريح**.\n\nوفي هندسة الذكاء الاصطناعي وعلم البيانات، يمثل سطح دالة الخسارة لأي شبكة عصبية تعتمد على أوزان $(w_1, w_2)$ حقلاً عددياً حقيقياً فائق الأبعاد. وخوارزميات التحسين والاستمثال—مثل خوارزمية الانحدار التدريجي—ليست سوى متسلقين يسترشدون بهذه الخريطة التضاريسية غير المرئية، باحثين بين الأخاديد والوديان الضيقة عن أعمق قاع ممكن تقل عنده نسبة الخطأ إلى أدنى مستوياتها."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f: \\mathbb{R}^n \\to \\mathbb{R}, \\quad \\mathbf{x} = \\begin{bmatrix} x_1 \\\\ \\vdots \\\\ x_n \\end{bmatrix} \\mapsto f(\\mathbf{x}) \\in \\mathbb{R}",
        "formulaNote": {
          "en": "Mathematical anchor for Multivariable Scalar Fields & Topographic Elevation Landscapes.",
          "ar": "المرساة الرياضية لـ الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية."
        },
        "narrative": {
          "en": "$$\n\\mathcal{L}_c(f) \\coloneqq \\left\\{ \\mathbf{x} \\in \\mathbb{R}^n \\;\\middle|\\; f(\\mathbf{x}) = c \\right\\} \\quad (\\text{Level Set / Contour Curve at Elevation } c)\n$$\n$$\n\\|\\nabla Z\\|_{i, j} = \\sqrt{ \\left( \\frac{\\partial Z}{\\partial x} \\right)^2 + \\left( \\frac{\\partial Z}{\\partial y} \\right)^2 }\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^n$ (Vector) | Position coordinates in input domain | Model parameter vector or geographical location $(x, y)$ |\n| $f(\\mathbf{x})$ | $\\mathbb{R}$ (Scalar) | Scalar quantity (elevation, temperature, loss) | The primary objective or physical value evaluated at $\\mathbf{x}$ |\n| $\\mathcal{L}_c(f)$ | Submanifold of dim $n-1$ | Contour line (in 2D) or isosurface (in 3D) | Equipotential trajectory where instantaneous change $\\Delta f = 0$ |\n| $c$ | $\\mathbb{R}$ | Constant elevation slicing level | Slicing height intersecting the continuous surface |\n| $\\|\\nabla Z\\|$ | $\\mathbb{R}_{\\ge 0}$ | Gradient magnitude / slope steepness | Quantifies local surface steepness per unit horizontal step |\n\n#### Intuitive Rationale: Why Contour Lines Never Cross\nCan two distinct contour lines—say, the $1,000\\text{ m}$ line and the $1,200\\text{ m}$ line—ever cross or intersect on a smooth landscape?\nThe answer is a resounding **never**. If they did intersect at coordinate $(x_0, y_0)$, that single physical spot on Earth would have to simultaneously be at an elevation of 1,000 meters *and* 1,200 meters, which is a physical and mathematical impossibility for any well-defined single-valued function. Distinct level curves remain forever separated, packing closely together in cliffs and flowing apart in valleys, providing an unambiguous topological map of the terrain.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^n$ (متجه) | إحداثيات الموقع في فضاء المدخلات | متجه معاملات النموذج أو الموقع الجغرافي $(x, y)$ |\n| $f(\\mathbf{x})$ | $\\mathbb{R}$ (قيمة قياسية) | المقدار القياسي (الارتفاع، الحرارة، دالة الخسارة) | القيمة المستهدفة أو الخاصية الفيزيائية المحسوبة عند $\\mathbf{x}$ |\n| $\\mathcal{L}_c(f)$ | متعدد شعب ذو بعد $n-1$ | خط كنتور (في بعدين) أو سطح تسوية (في 3 أبعاد) | مسار تساوي الجهد الذي يكون عنده التغير اللحظي $\\Delta f = 0$ |\n| $c$ | $\\mathbb{R}$ | منسوب شريحة الارتفاع الثابت | مستوى القطع الأفقي الذي يشطر التضاريس المستمرة |\n| $\\|\\nabla Z\\|$ | $\\mathbb{R}_{\\ge 0}$ | مقدار التدرج / شدة الانحدار | يقيس شدة ميل التضاريس لكل وحدة مسافة أفقية |\n\n#### التفسير المنطقي: لماذا لا تتقاطع خطوط الكنتور أبداً؟\nهل يمكن لخطين كنتوريين مختلفين—مثلاً خط منسوب $1,000\\text{ متر}$ وخط منسوب $1,200\\text{ متر}$—أن يتقاطعا على خريطة تضاريس ملساء؟\nالإجابة القاطعة هي: **مستحيل تماماً**. فلو تقاطعا عند إحداثي مكاني $(x_0, y_0)$، للزم أن تكون تلك النقطة الجغرافية ذاتها واقعة على ارتفاع 1000 متر و1200 متر في اللحظة نفسها، وهو تناقض فيزيائي ورياضي مستحيل لأي دالة رياضية أحادية القيمة. تظل خطوط الكنتور متمايزة ومتباعدة، تتزاحم عند الجروف وتتسع في السهول، مانحة إيانا خريطة طبوغرافية دقيقة لا لبس فيها.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-21",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "أثناء فحص سطح دالة الخسارة لشبكة عصبية ذات وزنين، لاحظ مهندس أن خطوط الكنتور للتسوية تشكل قطوعاً ناقصة متحدة المركز متطاولة ونحيفة للغاية كالإبرة، حيث يمتد محورها الأكبر على طول $w_1$ ويمتد محورها الأصغر على طول $w_2$. ماذا يكشف هذا التكوين الهندسي عن طبيعة تضاريس التدرج؟"
          },
          "options": [
            {
              "text": {
                "en": "The loss surface is an ill-conditioned ravine: slopes are violently steep along $w_2$ (dense contour spacing) but agonizingly shallow along $w_1$ (sparse contour spacing), causing un-accelerated gradient descent to oscillate erratically.",
                "ar": "يمثل سطح الخسارة أخدوداً سيئ التكيف (Ill-Conditioned Ravine): حيث يكون الانحدار حاداً وعنيفاً على طول المحور $w_2$ (تقارب وتزاحم خطوط الكنتور)، بينما يكون شديد التسطح على طول $w_1$ (تباعد خطوط الكنتور)، مما يجعل خوارزمية الانحدار البسيطة تتذبذب بعنف بين الجدران المتقابلة بدلاً من التقدم في الوادي.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Closely spaced contour lines indicate large partial derivatives, while widely spaced lines indicate near-zero slopes. When ellipses are needle-thin, the ratio of curvatures (condition number) is enormous, causing gradient vectors to point almost exclusively across the ravine rather than along its gentle floor.",
                "ar": "يشير تزاحم خطوط الكنتور إلى مشتقات جزئية هائلة وانحدار حاد، بينما يشير تباعدها إلى ميل يقترب من الصفر. وعندما تكون القطوع الناقصة مستطيلة كالإبرة، تكون نسبة الانحناءات (Condition Number) ضخمة جداً، مما يجعل متجهات التدرج تشير باتجاه جدران الأخدود بدلاً من التقدم على طول قاعه."
              }
            },
            {
              "text": {
                "en": "The gradient magnitude is identical in all directions.",
                "ar": "مقدار التدرج متطابق ومتساوٍ تماماً في جميع الاتجاهات.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "If the gradient magnitude were identical in all directions, the contour lines would form perfect concentric circles, not elongated ellipses.",
                "ar": "لو كان مقدار التدرج متطابقاً في جميع الاتجاهات، لكانت خطوط الكنتور دوائر متحدة المركز تامة الاستدارة وليست قطوعاً ناقصة مستطيلة."
              }
            },
            {
              "text": {
                "en": "The network has reached a saddle point where both partial derivatives are zero.",
                "ar": "وصل النموذج إلى نقطة سرجية ينعدم عندها كلا الاشتقاقين الجزئيين تماماً.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Contour lines around a saddle point form hyperbolic curves (X-like crossings), not closed concentric ellipses.",
                "ar": "تتخذ خطوط الكنتور حول النقطة السرجية أشكالاً زائدية تشبه حرف X المتقاطع، وليس قطوعاً ناقصة مغلقة متحدة المركز."
              }
            },
            {
              "text": {
                "en": "The parameters $w_1$ and $w_2$ are linearly dependent.",
                "ar": "المعاملان $w_1$ و $w_2$ مرتبطان خطياً بصورة تامة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Linear dependence would collapse the landscape into parallel straight lines (troughs), whereas concentric ellipses indicate independent parameters with vastly differing curvature scales.",
                "ar": "يؤدي الارتباط الخطي التام إلى انهيار خطوط الكنتور لتصبح خطوطاً مستقيمة متوازية ممتدة إلى اللانهاية، بينما تعبر القطوع الناقصة المغلقة عن معاملات مستقلة ذات مقاييس انحناء شديدة التباين."
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
    "id": "t1-22",
    "title": "Partial Derivatives & Axis-Aligned Slices",
    "titleAr": "المشتقات الجزئية وشرائح المحاور المعيارية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine standing on a rugged, windswept mountainside. If another hiker pulls up beside you and asks: \"What is the slope of the mountain...",
      "ar": "تخيل أنك تقف على سفح جبل صخري وعر تعصف به الرياح. إذا اقترب منك متسلق آخر وسألك: \"ما هو ميل الجبل عند النقطة التي تقف عليها قدمك تماماً؟\"،..."
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
          "en": "Imagine standing on a rugged, windswept mountainside. If another hiker pulls up beside you and asks: *\"What is the slope of the mountain right where you are standing?\"*, you cannot give them a single number! Why? Because if you take a step North, you might scramble up an agonizingly steep rocky ledge. If you take a step East, you might stroll comfortably along a flat horizontal ridge. If you take a step South, you might slide down a steep scree slope into a canyon. **Slope in multivariable space is not a single number; it depends entirely on the compass direction of your step.**\n\nHow do mathematicians tame this infinite directional freedom? By breaking the problem down into the simplest possible inquiries: **Partial Derivatives**. Instead of wandering in arbitrary directions, we ask the two cleanest, most fundamental questions possible:\n1. What is the slope if you freeze your $y$-coordinate into solid concrete and take a step exclusively along the East-West $X$-axis ($\\frac{\\partial f}{\\partial x}$)?\n2. What is the slope if you freeze your $x$-coordinate completely and take a step exclusively along the North-South $Y$-axis ($\\frac{\\partial f}{\\partial y}$)?\n\nGeometrically, computing a partial derivative like $\\frac{\\partial f}{\\partial x}$ is equivalent to taking a giant vertical sheet of laser light and slicing straight through the 3D mountain landscape parallel to the $X$-axis. The intersection of that razor-sharp laser sheet with the rolling 3D surface is a simple, familiar 1D curve! The partial derivative is nothing more than the ordinary single-variable tangent slope of that 1D slice.\n\nOperationally, this leads to the golden rule of multivariable calculus: **freeze the bystanders**. When computing $\\frac{\\partial f}{\\partial x}$, you treat every other variable—$y$, $z$, and whatever else exists—as inert, unmoving numerical constants, exactly like $5$, $42$, or $\\pi$. If your equation contains $7x^2 y^3$, you ignore the $y^3$ as a passive bystander and differentiate $7x^2$ normally, yielding $(14x) \\cdot y^3 = 14xy^3$.\n\nIn machine learning and neural network training, this principle is the core of parameter tuning. When a neural network has millions of weights, computing partial derivatives allows us to isolate every single weight parameter independently: *\"If we hold every single neuron in the network completely frozen, and adjust this one weight by $+0.001$, what happens to the overall prediction error?\"*\n\n---",
          "ar": "تخيل أنك تقف على سفح جبل صخري وعر تعصف به الرياح. إذا اقترب منك متسلق آخر وسألك: *\"ما هو ميل الجبل عند النقطة التي تقف عليها قدمك تماماً؟\"*، فلن تتمكن من إجابته برقم واحد مطلقاً! لماذا؟ لأنك إذا خطوت خطوة واحدة نحو الشمال، فقد تصعد حافة صخرية بالغة الانحدار تشق عليك؛ وإذا خطوت نحو الشرق، فقد تسير على حافة أفقية مريحة ومنبسطة؛ وإذا خطوت نحو الجنوب، فقد تهوي متدحرجاً في منحدر حصوي حاد. **الميل في الفضاء متعدد الأبعاد ليس رقماً مفرداً؛ بل يعتمد كلياً على اتجاه البوصلة الذي تختاره لخطوتك.**\n\nكيف يروض علماء الرياضيات هذا الفيض اللانهائي من الاتجاهات؟ عبر تفكيك المعضلة إلى أبسط استفسارين ممكنين: **المشتقات الجزئية** (Partial Derivatives). فبدلاً من التخبط في اتجاهات عشوائية، نطرح سؤالين منهجيين في غاية النقاء:\n1. ما هو الميل إذا قمت بتجميد إحداثي $y$ كلياً وكأنه كتلة من الخرسانة الصلبة، وخطوت حصرياً على طول محور الشرق والغرب $X$ (المشتقة $\\frac{\\partial f}{\\partial x}$)؟\n2. ما هو الميل إذا قمت بتجميد إحداثي $x$ تماماً دون أي حراك، وخطوت حصرياً على طول محور الشمال والجنوب $Y$ (المشتقة $\\frac{\\partial f}{\\partial y}$)؟\n\nهندسياً، يعادل حساب المشتقة الجزئية $\\frac{\\partial f}{\\partial x}$ استخدام لوح ليزري رأسي عملاق لشطر تضاريس الجبل ثلاثي الأبعاد بشريحة رأسية موازية لمحور $X$. تقاطع هذه الشريحة المستوية الحادة مع سطح الجبل المتعرج ينتج منحنى بسيطاً أحادي البعد مألوفاً للغاية! والمشتقة الجزئية ليست سوى ميل المماس المعتاد لذلك المنحنى المقطوع في تلك الشريحة.\n\nعملياتياً وحسابياً، يقودنا هذا إلى القاعدة الذهبية للتفاضل متعدد المتغيرات: **جمّد المتفرجين**. فعندما تحسب المشتقة الجزئية بالنسبة لـ $x$، عامل كافة المتغيرات الأخرى—سواء كانت $y$ أو $z$ أو غيرها—كأرقام جامدة خاملة لا حراك فيها، تماماً مثل الرقم $5$ أو $42$ أو $\\pi$. فإذا كان التعبير الرياضي يحتوي على $7x^2 y^3$، فإنك تعامل $y^3$ كمعامل ضرب ثابت خامل وتشتق $7x^2$ بطريقة عادية تماماً، لتكون النتيجة $(14x) \\cdot y^3 = 14xy^3$.\n\nوفي تدريب الشبكات العصبية والذكاء الاصطناعي، يمثل هذا المبدأ جوهر ضبط المعاملات. فعندما يحتوي النموذج على ملايين الأوزان، تمكننا المشتقات الجزئية من عزل كل وزن على حدة وفحصه مجهرياً: *\"لو قمنا بتجميد كل خلية عصبية في الشبكة بأسرها، وحركنا هذا الوزن المفرد بمقدار $+0.001$، فكيف ستستجيب دالة الخطأ الكلية؟\"*"
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\frac{\\partial f}{\\partial x_i}(\\mathbf{x}) \\coloneqq \\lim_{h \\to 0} \\frac{f(\\mathbf{x} + h \\mathbf{e}_i) - f(\\mathbf{x})}{h} = \\left. \\frac{d}{dh} f(\\mathbf{x} + h \\mathbf{e}_i) \\right|_{h=0}",
        "formulaNote": {
          "en": "Mathematical anchor for Partial Derivatives & Axis-Aligned Slices.",
          "ar": "المرساة الرياضية لـ المشتقات الجزئية وشرائح المحاور المعيارية."
        },
        "narrative": {
          "en": "$$\n\\nabla f(\\mathbf{x}) = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1}(\\mathbf{x}) \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_D}(\\mathbf{x}) \\end{bmatrix} \\in \\mathbb{R}^D\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^D$ | Base operating coordinate vector in domain space | The exact multi-dimensional state where sensitivity is probed |\n| $\\mathbf{e}_i$ | $\\mathbb{R}^D$ | $i$-th canonical unit basis vector $[0,\\dots,1,\\dots,0]^T$ | Enforces displacement strictly along coordinate axis $i$ |\n| $h$ | $\\mathbb{R} \\setminus \\{0\\}$ | Infinitesimal probe step size | Testing displacement along the chosen single coordinate axis |\n| $\\frac{\\partial f}{\\partial x_i}$ | $\\mathbb{R}$ (Scalar) | Slope of the 1D planar slice parallel to axis $i$ | Quantifies isolated marginal sensitivity to input variable $x_i$ |\n| $\\partial$ (Del / Jacobi) | Symbol | Curved d notation distinguishing partials from total derivatives | Signals to the reader that all other $D-1$ variables are held strictly constant |\n\n#### Intuitive Rationale for the Notation $\\partial$\nWhy do mathematicians write $\\frac{\\partial f}{\\partial x}$ with a curved $\\partial$ instead of an ordinary straight $\\frac{df}{dx}$? \nThe straight $d$ denotes a *total derivative*: if moving $x$ also naturally drags $y$ along with it (for example, if $y = x^2$), the total derivative accounts for both direct and indirect changes. The curved $\\partial$ is an explicit warning sign: it means *\"Hold everything else rigidly still! Do not let any other variable budge even an angstrom while we isolate this single coordinate.\"*",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}$ | $\\mathbb{R}^D$ | متجه إحداثيات الحالة في فضاء المدخلات | الموقع المكاني متعدد الأبعاد الذي يُفحص عنده معدل التغير |\n| $\\mathbf{e}_i$ | $\\mathbb{R}^D$ | متجه الوحدة المعياري $i$ $[0,\\dots,1,\\dots,0]^T$ | يفرض قصر الحركة بدقة على طول المحور الإحداثي $i$ دون غيره |\n| $h$ | $\\mathbb{R} \\setminus \\{0\\}$ | خطوة الفحص متناهية الصغر | مسافة الاختبار اللحظية على طول المحور المختار |\n| $\\frac{\\partial f}{\\partial x_i}$ | $\\mathbb{R}$ (قيمة قياسية) | ميل الشريحة المستوية الموازية للمحور $i$ | يقيس الحساسية الهامشية المعزولة للمتغير $x_i$ بمفرده |\n| $\\partial$ (رمز ياكوبي المائل) | رمز | حرف d المنحني لتمييز التفاضل الجزئي | يُنبه القارئ إلى أن كافة المتغيرات الأخرى البالغ عددها $D-1$ مجمدة كلياً |\n\n#### التفسير المنطقي لاستخدام الرمز $\\partial$\nلماذا يصر علماء الرياضيات على كتابة $\\frac{\\partial f}{\\partial x}$ برمز منحني $\\partial$ بدلاً من حرف $d$ المستقيم المعتاد $\\frac{df}{dx}$؟\nيدل الحرف المستقيم $d$ على *المشتقة الكلية*: فإذا كان تحريك المتغير $x$ يجر وراءه المتغير $y$ بالتبعية (مثلاً إذا كان $y = x^2$)، فإن المشتقة الكلية تحسب التغير المباشر وغير المباشر معاً. أما الرمز المنحني $\\partial$ فهو علامة تحذير صريحة تعني: *\"جمّد كل شيء آخر في مكانه! لا تسمح لأي متغير آخر بالتحرك ولو قيد أنملة بينما نقوم بعزل هذا المتغير المفرد واختباره.\"*\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-22",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "أثناء تدريب نموذج تعلم آلة بدالة خسارة $\\mathcal{L}(w_1, w_2)$، وجد ممارس أن المشتقات الجزئية عند النقطة الحالية هي $\\frac{\\partial \\mathcal{L}}{\\partial w_1} = 25.0$ بينما $\\frac{\\partial \\mathcal{L}}{\\partial w_2} = 0.0$. إذا طبق خطوة تحديث استمثالية تقتصر حصرياً على تعديل الوزن $w_2$، فما هو التغير المتوقع في دالة الخسارة من الرتبة الأولى؟"
          },
          "options": [
            {
              "text": {
                "en": "The loss does not change at all ($d\\mathcal{L} \\approx 0$), because the slope along the $w_2$ axis slice is completely flat.",
                "ar": "لا تتغير دالة الخسارة على الإطلاق ($d\\mathcal{L} \\approx 0$)، لأن ميل شريحة التضاريس الموازية لمحور $w_2$ منبسط وأفقي تماماً.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The first-order differential is $d\\mathcal{L} = \\frac{\\partial \\mathcal{L}}{\\partial w_1}\\Delta w_1 + \\frac{\\partial \\mathcal{L}}{\\partial w_2}\\Delta w_2$. Because $\\Delta w_1 = 0$ (frozen) and $\\frac{\\partial \\mathcal{L}}{\\partial w_2} = 0.0$, the product is strictly zero ($0 \\times \\Delta w_2 = 0$). Moving strictly along $w_2$ traverses an instantaneous level contour curve.",
                "ar": "تفاضل الرتبة الأولى هو $d\\mathcal{L} = \\frac{\\partial \\mathcal{L}}{\\partial w_1}\\Delta w_1 + \\frac{\\partial \\mathcal{L}}{\\partial w_2}\\Delta w_2$. وبما أن الوزن الأول مجمد $\\Delta w_1 = 0$ وميل الوزن الثاني منعدم $\\frac{\\partial \\mathcal{L}}{\\partial w_2} = 0.0$، فإن الناتج هو صفر تام. التحرك على طول $w_2$ يسير لحظياً على خط كنتور مستوٍ."
              }
            },
            {
              "text": {
                "en": "The loss increases by $25.0$ per unit step.",
                "ar": "تتزايد دالة الخسارة بمقدار $25.0$ لكل وحدة إزاحة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The slope of $25.0$ belongs exclusively to the $w_1$ axis slice; because $w_1$ was not modified ($\\Delta w_1 = 0$), this sensitivity is never activated.",
                "ar": "يخص الميل $25.0$ شريحة المحور $w_1$ حصراً؛ وبما أن $w_1$ لم يُعدل ($\\Delta w_1 = 0$)، فإن هذه الحساسية تظل خاملة ولا تؤثر على الناتج."
              }
            },
            {
              "text": {
                "en": "The loss drops to negative infinity.",
                "ar": "تهوي دالة الخسارة فجأة نحو سالب اللانهاية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A zero derivative indicates instantaneous local flatness, not an infinite precipice.",
                "ar": "تدل المشتقة الصفرية على انبساط محلي لحظي، ولا تعني وجود هاوية لا قرار لها."
              }
            },
            {
              "text": {
                "en": "The loss increases quadratically due to interaction terms.",
                "ar": "تتزايد دالة الخسارة بمعدل تربيعي حاد نتيجة لحدود التفاعل المشتركة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The first-order predicted change is identically zero. While higher-order terms ($\\frac{1}{2}\\frac{\\partial^2 \\mathcal{L}}{\\partial w_2^2}\\Delta w_2^2$) may exist, the first-order linear prediction itself is strictly zero.",
                "ar": "التغير المتوقع من الرتبة الأولى هو صفر بالتمام والكمال. ورغم احتمال وجود حدود تربيعية من الرتب العليا، إلا أن التقدير الخطي المباشر يظل صفراً."
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
    "id": "t1-23",
    "title": "The Gradient Vector & Directional Derivatives",
    "titleAr": "متجه التدرج والمشتقات الاتجاهية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "In the previous lesson, we measured the slope of a mountain along the rigid grid lines of a map: directly East-West ($\\frac{\\partial...",
      "ar": "في الدرس السابق، قمنا بقياس انحدار الجبل على طول المحاور الشبكية الصارمة للخريطة: شرقاً وغرباً ($\\frac{\\partial f}{\\partial x}$) وشمالاً..."
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
          "en": "In the previous lesson, we measured the slope of a mountain along the rigid grid lines of a map: directly East-West ($\\frac{\\partial f}{\\partial x}$) and directly North-South ($\\frac{\\partial f}{\\partial y}$). But out in the wilderness, you rarely confine your footsteps to the cardinal directions of a compass. What if you decide to hike along an arbitrary heading—say, $37^\\circ$ North of East, directly toward a distant snow-capped peak along a unit direction vector $\\hat{\\mathbf{u}}$?\n\nDo you need to set up a brand-new limit experiment from scratch? The remarkable answer is **no**. Because smooth landscapes are locally linear, you can pack all the individual axis partial derivatives into a single unified arrow: **The Gradient Vector** $\\nabla f$.\n\nThe gradient vector possesses three breathtaking physical and geometric properties:\n1. **The Compass of Maximum Climb:** It points in the exact direction of **steepest possible ascent**. If you want to gain altitude as fast as humanly possible, look at the arrow $\\nabla f$ and start walking in that exact direction.\n2. **The Speedometer of Steepness:** The Euclidean length of the arrow, $\\|\\nabla f\\|_2$, is the **maximum instantaneous rate of climb**. A short gradient arrow means the terrain is nearly flat; a long arrow means you are facing an imposing vertical wall.\n3. **Orthogonal to Contour Lines:** Because walking tangentially along a level contour curve involves zero change in elevation ($0\\text{ meters}$ climbed), the gradient vector is always **strictly perpendicular ($90^\\circ$) to the contour curves**.\n\nPicture pouring a canteen of water onto a steep mountain slope. Where does the water flow? Water does not care about grid coordinates or human axes. Obeying gravity, every liquid droplet immediately accelerates along the path of least resistance: directly opposite the gradient vector, along the direction of **steepest descent** ($-\\nabla f$). In machine learning, gradient descent is simply this natural physics: releasing our parameters like water droplets down the loss mountain so they pool at the lowest possible basin.\n\n---",
          "ar": "في الدرس السابق، قمنا بقياس انحدار الجبل على طول المحاور الشبكية الصارمة للخريطة: شرقاً وغرباً ($\\frac{\\partial f}{\\partial x}$) وشمالاً وجنوباً ($\\frac{\\partial f}{\\partial y}$). لكن في الطبيعة المفتوحة، نادراً ما يقيد المتسلق خطواته بالاتجاهات الأربعة الأصلية للبوصلة. ماذا لو قررت السير في اتجاه مائل عشوائي—مثلاً $37^\\circ$ شمال الشرق، متوجهاً مباشرة نحو قمة جليدية بارزة على طول متجه وحدة $\\hat{\\mathbf{u}}$؟\n\nهل تحتاج إلى إعادة حساب النهايات من الصفر لكل زاوية بوصلة جديدة؟ الإجابة المبهجة هي: **كلا على الإطلاق**. ونظراً لأن التضاريس الملساء خطية محلياً، يمكنك حزم كافة المشتقات الجزئية المعيارية معاً في سهم هندسي موحد فائق القوة يُدعى: **متجه التدرج** (The Gradient Vector) $\\nabla f$.\n\nيمتلك متجه التدرج ثلاث خصائص فيزيائية وهندسية مدهشة:\n1. **بوصلة الصعود الأقصى:** يُشير التدرج دوماً وبدقة مطلقة نحو **الاتجاه الأشد صعوداً على الإطلاق**. إذا أردت اكتساب أكبر قدر من الارتفاع بأقل عدد من الخطوات، فانظر إلى اتجاه السهم $\\nabla f$ وسر في اتجاهه مباشرة.\n2. **مقياس شدة المنحدر:** يمثل الطول الإقليدي للسهم $\\|\\nabla f\\|_2$ **أقصى معدل صعود لحظي ممكن**. فالسهم القصير يعني أرضاً شبه منبسطة، بينما السهم الطويل ينبهك إلى أنك تواجه جرفاً صخرياً شاهقاً.\n3. **التعامد مع خطوط الكنتور:** بما أن السير على طول خط الكنتور المتساوي لا يُحدث أي تغير في الارتفاع ($0\\text{ متر}$ صعوداً أو هبوطاً)، فإن متجه التدرج يكون دوماً **متعامداً تماماً ($90^\\circ$) مع خطوط الكنتور**.\n\nتخيل أنك سكبت وعاء ماء على سفح جبل صخري منحدر. أين سيتدفق الماء؟ قطرات الماء لا تكترث بمحاور الإحداثيات التي رسمها البشر. بل استجابةً للجاذبية، تتدحرج القطرات فوراً على طول مسار الهبوط الأشد والأسرع: في الاتجاه المعاكس تماماً لمتجه التدرج ($-\\nabla f$). وفي الذكاء الاصطناعي، تمثل خوارزمية الانحدار التدريجي هذه الظاهرة الطبيعية ذاتها: حيث نترك معاملات النموذج تتدفق كقطرات الماء نحو قاع وادي الخسارة لتستقر في أعمق نقطة ممكنة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\nabla f(\\mathbf{x}) \\coloneqq \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1}(\\mathbf{x}) \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_D}(\\mathbf{x}) \\end{bmatrix} \\in \\mathbb{R}^D, \\quad D_{\\hat{\\mathbf{u}}} f(\\mathbf{x}) = \\nabla f(\\mathbf{x})^T \\hat{\\mathbf{u}} = \\|\\nabla f(\\mathbf{x})\\|_2 \\cos(\\theta)",
        "formulaNote": {
          "en": "Mathematical anchor for The Gradient Vector & Directional Derivatives.",
          "ar": "المرساة الرياضية لـ متجه التدرج والمشتقات الاتجاهية."
        },
        "narrative": {
          "en": "$$\n\\max_{\\|\\hat{\\mathbf{u}}\\|=1} D_{\\hat{\\mathbf{u}}} f(\\mathbf{x}) = \\|\\nabla f(\\mathbf{x})\\|_2 \\iff \\hat{\\mathbf{u}} = \\frac{\\nabla f(\\mathbf{x})}{\\|\\nabla f(\\mathbf{x})\\|_2} \\quad (\\theta = 0)\n$$\n$$\n\\nabla f(\\mathbf{x}_0) \\perp \\text{Tangent space to the level contour } \\mathcal{L}_{f(\\mathbf{x}_0)}(f) \\quad (\\theta = \\pi/2)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\nabla f(\\mathbf{x})$ | $\\mathbb{R}^D$ (Vector) | Vector pointing in the direction of steepest uphill ascent | Compiles all first-order spatial sensitivities into a single directional probe |\n| $\\hat{\\mathbf{u}}$ | $\\mathbb{R}^D, \\|\\hat{\\mathbf{u}}\\|=1$ | Unit vector specifying travel direction | The compass heading along which the slope is queried |\n| $D_{\\hat{\\mathbf{u}}} f(\\mathbf{x})$ | $\\mathbb{R}$ (Scalar) | Directional derivative / instantaneous climb rate along $\\hat{\\mathbf{u}}$ | Measures the slope felt underfoot when hiking along direction $\\hat{\\mathbf{u}}$ |\n| $\\|\\nabla f(\\mathbf{x})\\|_2$ | $\\mathbb{R}_{\\ge 0}$ | Euclidean magnitude of the gradient vector | Upper theoretical limit of how steep any directional slope can possibly be |\n| $\\theta$ | $[0, \\pi]$ | Angle between the gradient vector and step direction $\\hat{\\mathbf{u}}$ | Geometric factor controlling sensitivity through the projection $\\cos(\\theta)$ |\n\n#### Intuitive Rationale via Cauchy-Schwarz\nWhy does the directional derivative equal the dot product $\\nabla f \\cdot \\hat{\\mathbf{u}} = \\|\\nabla f\\| \\cos(\\theta)$?\nThe dot product measures geometric alignment.\n- **Maximum Ascent ($\\theta = 0^\\circ$):** When your walking direction $\\hat{\\mathbf{u}}$ aligns parallel to $\\nabla f$, $\\cos(0) = 1$, achieving the absolute maximum climb rate $+\\|\\nabla f\\|$.\n- **Maximum Descent ($\\theta = 180^\\circ$):** When you turn around and walk directly opposite to $\\nabla f$, $\\cos(\\pi) = -1$, plunging down the fastest possible slope $-\\|\\nabla f\\|$.\n- **Zero Climb ($\\theta = 90^\\circ$):** When you step sideways perpendicular to $\\nabla f$, $\\cos(\\pi/2) = 0$. You are walking tangentially along a level contour curve without gaining or losing a single millimeter of altitude.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\nabla f(\\mathbf{x})$ | $\\mathbb{R}^D$ (متجه) | سهم يشير في اتجاه الصعود الأقصى الأكثر حدة | يجمع كافة المشتقات الجزئية في مجس اتجاهي موحد |\n| $\\hat{\\mathbf{u}}$ | $\\mathbb{R}^D, \\|\\hat{\\mathbf{u}}\\|=1$ | متجه وحدة يحدد اتجاه الحركة المطلوب | اتجاه البوصلة المراد فحص واختبار الميل على طوله |\n| $D_{\\hat{\\mathbf{u}}} f(\\mathbf{x})$ | $\\mathbb{R}$ (قيمة قياسية) | المشتقة الاتجاهية / معدل الصعود اللحظي على طول $\\hat{\\mathbf{u}}$ | تقيس شدة الانحدار التي يشعر بها المتسلق عند السير في الاتجاه $\\hat{\\mathbf{u}}$ |\n| $\\|\\nabla f(\\mathbf{x})\\|_2$ | $\\mathbb{R}_{\\ge 0}$ | المعيار الإقليدي لطول سهم التدرج | السقف النظري الأقصى لشدة أي ميل اتجاهي في تلك النقطة |\n| $\\theta$ | $[0, \\pi]$ | الزاوية الهندسية بين سهم التدرج واتجاه السير $\\hat{\\mathbf{u}}$ | المعامل الهندسي الحاكم لمقدار المشتقة عبر معامل الإسقاط $\\cos(\\theta)$ |\n\n#### التفسير المنطقي عبر متباينة كوشي-شفارتز\nلماذا تساوي المشتقة الاتجاهية الجداء النقطي $\\nabla f \\cdot \\hat{\\mathbf{u}} = \\|\\nabla f\\| \\cos(\\theta)$؟\nيقيس الجداء النقطي درجة التطابق والمحاذاة الهندسية:\n- **الصعود الأقصى ($\\theta = 0^\\circ$):** عندما يطابق اتجاه سيرك $\\hat{\\mathbf{u}}$ سهم التدرج تماماً، يكون $\\cos(0) = 1$، فنحصل على أقصى معدل صعود ممكن $+\\|\\nabla f\\|$.\n- **الهبوط الأقصى ($\\theta = 180^\\circ$):** عندما تستدير وتسير في الاتجاه المعاكس تماماً للتدرج، يكون $\\cos(\\pi) = -1$، فتسلك أسرع مسار هبوط ممكن $-\\|\\nabla f\\|$.\n- **انعدام التغير ($\\theta = 90^\\circ$):** عندما تخطو جانباً بزاوية قائمة مع التدرج، يكون $\\cos(\\pi/2) = 0$. في هذه الحالة أنت تسير مماسياً لخط الكنتور دون أن ترتفع أو تنخفض قيد أنملة.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-23",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "تقف على سطح تضاريس قياسي ثنائي الأبعاد عند نقطة يكون فيها متجه التدرج هو $\\nabla f = [3.0, 4.0]^T$. إذا تحركت على طول متجه الاتجاه $\\mathbf{v} = [-4.0, 3.0]^T$، فما هو معدل صعودك اللحظي؟"
          },
          "options": [
            {
              "text": {
                "en": "Exactly $0.0$, because $\\mathbf{v}$ is orthogonal to $\\nabla f$ ($[3, 4] \\cdot [-4, 3] = -12 + 12 = 0$), meaning you are walking tangentially along a level contour curve without ascending or descending.",
                "ar": "صفر تماماً ($0.0$)، لأن متجه الحركة $\\mathbf{v}$ متعامد تماماً مع متجه التدرج $\\nabla f$ (حيث $[3, 4] \\cdot [-4, 3] = -12 + 12 = 0$)، مما يعني أنك تسير مماسياً لخط الكنتور المستوي دون أن تصعد أو تهبط قيد أنملة.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The directional derivative is $D_{\\hat{\\mathbf{v}}} f = \\nabla f \\cdot \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|}$. Since the dot product in the numerator is $(3)(-4) + (4)(3) = -12 + 12 = 0$, the angle between your trajectory and the gradient is exactly $90^\\circ$ ($\\theta = \\pi/2$), indicating movement strictly along an isoline.",
                "ar": "المشتقة الاتجاهية هي $D_{\\hat{\\mathbf{v}}} f = \\nabla f \\cdot \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|}$. وبما أن الجداء النقطي في البسط هو $(3)(-4) + (4)(3) = 0$، فإن الزاوية بين مسار حركتك ومتجه التدرج هي $90^\\circ$ تماماً، مما يثبت أن الحركة تسير على طول خط المنسوب الثابت."
              }
            },
            {
              "text": {
                "en": "$+5.0$ meters per unit step.",
                "ar": "$+5.0$ أمتار صعوداً لكل وحدة مسافة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "$+5.0$ is the maximum climb rate, achieved only when walking parallel to the gradient $\\hat{\\mathbf{u}} = [0.6, 0.8]^T$, not perpendicular to it.",
                "ar": "المقدار $+5.0$ يمثل أقصى معدل صعود ممكن، ولا يتحقق إلا إذا سرت موازياً لسهم التدرج في الاتجاه $[0.6, 0.8]^T$، وليس متعامداً معه."
              }
            },
            {
              "text": {
                "en": "$-5.0$ meters per unit step.",
                "ar": "$-5.0$ أمتار هبوطاً لكل وحدة مسافة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "$-5.0$ represents maximum steepest descent, achieved only when walking in the exact opposite direction to the gradient: $\\hat{\\mathbf{u}} = [-0.6, -0.8]^T$.",
                "ar": "يمثل $-5.0$ أقصى معدل هبوط ممكن، ولا يتحقق إلا بالسير في الاتجاه المعاكس تماماً لسهم التدرج: $[-0.6, -0.8]^T$."
              }
            },
            {
              "text": {
                "en": "$+1.0$ meter per unit step.",
                "ar": "$+1.0$ متر صعوداً لكل وحدة مسافة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The inner product cancels out to exactly zero; there is no residual fractional climb.",
                "ar": "ينعدم الجداء الداخلي بالكامل ليصبح صفراً تاماً دون أي متبقٍ كسري للصعود."
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
    "id": "t1-24",
    "title": "The Hessian Matrix, Curvature & Quadratic Approximations",
    "titleAr": "مصفوفة هيسي، الانحناء، والتقريبات التربيعية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "The gradient vector is a trusty compass: it tells you the slope and direction of the terrain right beneath your hiking boots.",
      "ar": "يمثل متجه التدرج بوصلتك الموثوقة: فهو يخبرك بميل التضاريس واتجاهها تحت باطن حذائك مباشرة."
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
          "en": "The gradient vector is a trusty compass: it tells you the slope and direction of the terrain right beneath your hiking boots. But suppose you hike until your altimeter stops changing and the ground beneath your feet becomes completely flat: $\\nabla f = \\mathbf{0}$. You celebrate, believing you have reached your destination. But what is the true geometric shape of the ground you are standing on?\n\nAre you resting safely at the bottom of a peaceful valley bowl? Are you perched precariously on top of an isolated mountain summit? Or are you straddling a treacherous horse saddle, where moving forward plunges you downhill while moving sideways climbs uphill? The gradient vector cannot tell you, because at the bottom of a bowl, the summit of a peak, and the center of a saddle, the ground is completely, deceptively flat: $\\nabla f = \\mathbf{0}$.\n\nTo classify these flat landscapes, you must summon the **Hessian Matrix** $\\mathbf{H}$. The Hessian is the master second-order curvature operator: it collects all second-order partial derivatives into a symmetric $D \\times D$ matrix. It functions as a high-dimensional bowl-detector:\n- If all eigenvalues are strictly positive ($\\mathbf{H} \\succ 0$), the surface curves upward in every direction like a ceramic soup bowl: you stand at a **stable local minimum**. Any ball dropped here pools safely at the bottom.\n- If all eigenvalues are strictly negative ($\\mathbf{H} \\prec 0$), the surface curves downward in all directions like an umbrella: you are at an **unstable local maximum**.\n- If some eigenvalues are positive and others are negative, you are stranded on a **saddle point**: a mountain pass that is a minimum along one path and a maximum along another.\n\nIn high-dimensional machine learning (where models have millions or billions of parameters), true local minima and maxima are actually exceedingly rare! Instead, high-dimensional loss landscapes are vast, labyrinthine fields of **saddle points**. Navigating optimization algorithms like Adam and momentum-based gradient descent safely through this ocean of saddle points is one of the grand triumphs of modern AI.\n\n---",
          "ar": "يمثل متجه التدرج بوصلتك الموثوقة: فهو يخبرك بميل التضاريس واتجاهها تحت باطن حذائك مباشرة. ولكن لنفترض أنك واصلت السير حتى توقف مقياس الارتفاع عن التغير، وأصبحت الأرض تحت قدميك مستوية تماماً وينعدم عندها الميل: $\\nabla f = \\mathbf{0}$. قد تبتهج ظناً منك أنك وصلت إلى أدنى قاع للوادي. ولكن ما هو الشكل الهندسي الحقيقي للأرض التي تقف عليها؟\n\nهل أنت مستقر بأمان في قاع وادٍ هادئ مقعر كإناء الحساء؟ أم تقف على حافة خطرة فوق قمة جبلية منعزلة؟ أم أنك تمتطي سرج خيل وعراً، حيث يؤدي التقدم للأمام إلى الهبوط في وادٍ سحيق، بينما يؤدي التحرك جانباً إلى الصعود نحو قمة جبلية؟ يعجز متجه التدرج بمفرده عن الإجابة عن هذا السؤال، لأنه في قاع الإناء، وفوق قمة الجبل، وعند مركز السرج، تكون الأرض منبسطة تماماً وينعدم التدرج في الحالات الثلاث: $\\nabla f = \\mathbf{0}$.\n\nولفك لغز هذه التضاريس المنبسطة، نستدعي **مصفوفة هيسي** (The Hessian Matrix) $\\mathbf{H}$. مصفوفة هيسي هي المؤثر الرياضي الأسمى لانحناء الرتبة الثانية: فهي تجمع كافة المشتقات الجزئية الثانية في مصفوفة متناظرة ذات أبعاد $D \\times D$. تعمل هذه المصفوفة كمستكشف ومسبار فائق الذكاء للأشكال الهندسية عبر فحص قيمها الذاتية:\n- إذا كانت جميع القيم الذاتية موجبة تماماً ($\\mathbf{H} \\succ 0$)، فإن السطح ينحني لأعلى في جميع الاتجاهات كإناء حساء خزفي: أنت تقف في **نهاية صغرى محلية مستقرة**. وأي كرة تسقط هنا ستستقر في القاع وتتجمع فيه قطرات الماء بأمان.\n- وإذا كانت جميع القيم الذاتية سالبة تماماً ($\\mathbf{H} \\prec 0$)، فإن السطح ينحني لأسفل في كل اتجاه كالمظلة: أنت تقف فوق **نهاية عظمى محلية غير مستقرة**.\n- أما إذا كانت بعض القيم الذاتية موجبة والأخرى سالبة، فأنت عالق فوق **نقطة سرجية** (Saddle Point): ممر جبلي يمثل قاعاً في مسار، وقمة في مسار آخر متعامد معه.\n\nوفي فضاءات تعلم الآلة عالية الأبعاد (حيث تضم النماذج ملايين أو مليارات المعاملات)، تكاد النهايات الصغرى والعظمى الحقيقية تكون نادرة الوجود! بل إن أسطح دوال الخسارة في الشبكات العصبية هي متاهات شاسعة تكتظ بملايين **النقاط السرجية**. ويُعد توجيه خوارزميات الاستمثال—مثل خوارزمية آدم والزخم—لتفادي الوقوع في فخ هذه النقاط السرجية أحد أعظم الإنجازات في الذكاء الاصطناعي الحديث."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{H}_{i, j} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}, \\quad \\mathbf{H}(\\mathbf{x}) = \\nabla^2 f(\\mathbf{x}) \\in \\mathbb{R}^{D \\times D}",
        "formulaNote": {
          "en": "Mathematical anchor for The Hessian Matrix, Curvature & Quadratic Approximations.",
          "ar": "المرساة الرياضية لـ مصفوفة هيسي، الانحناء، والتقريبات التربيعية."
        },
        "narrative": {
          "en": "$$\nf(\\mathbf{x}_0 + \\Delta \\mathbf{x}) \\approx f(\\mathbf{x}_0) + \\nabla f(\\mathbf{x}_0)^T \\Delta \\mathbf{x} + \\frac{1}{2} \\Delta \\mathbf{x}^T \\mathbf{H}(\\mathbf{x}_0) \\Delta \\mathbf{x}\n$$\n$$\n\\text{At } \\nabla f(\\mathbf{x}^*) = \\mathbf{0}: \\quad \\begin{cases} \\mathbf{H} \\succ 0 \\; (\\forall \\lambda_i > 0) \\implies \\text{Strict Local Minimum} \\\\ \\mathbf{H} \\prec 0 \\; (\\forall \\lambda_i < 0) \\implies \\text{Strict Local Maximum} \\\\ \\exists \\lambda_i > 0, \\lambda_j < 0 \\implies \\text{Saddle Point} \\end{cases}\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{H} = \\nabla^2 f$ | $\\mathbb{R}^{D \\times D}$ (Symmetric) | Matrix of all second-order partial derivatives | Quadratic curvature operator governing local bowl geometry |\n| $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$ | $\\mathbb{R}$ | Rate of change of slope along axis $i$ as you move along axis $j$ | Mixed partial derivative (symmetric: $H_{ij} = H_{ji}$ by Clairaut's theorem) |\n| $\\frac{1}{2} \\Delta \\mathbf{x}^T \\mathbf{H} \\Delta \\mathbf{x}$ | $\\mathbb{R}$ (Scalar) | Directional quadratic curvature form | Governs whether energy rises or falls along displacement step $\\Delta \\mathbf{x}$ |\n| $\\lambda_i$ | $\\mathbb{R}$ | Eigenvalues of the Hessian matrix | Principal curvatures along orthogonal eigen-axes |\n| Saddle Point | Geometry | Mixed positive and negative curvatures | Hyperbolic geometry trapping naive optimization algorithms |\n\n#### Intuitive Rationale for Hessian Symmetry\nWhy is the Hessian matrix always symmetric ($H_{ij} = H_{ji}$) for smooth functions?\nAccording to Clairaut's (Schwarz's) Theorem, if the second derivatives are continuous, the order of differentiation does not matter: $\\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial y}\\right) = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial x}\\right)$. Slicing East then stepping North reaches the exact same altitude change as slicing North then stepping East. By the Spectral Theorem, every symmetric matrix possesses strictly real eigenvalues and an orthonormal set of eigenvectors, which define the principal curvature axes of the quadratic bowl.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{H} = \\nabla^2 f$ | $\\mathbb{R}^{D \\times D}$ (متناظرة) | مصفوفة المشتقات الجزئية من الرتبة الثانية | مؤثر الانحناء التربيعي الحاكم لشكل الإناء المحلي وتحدبه |\n| $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$ | $\\mathbb{R}$ | معدل تغير الميل على المحور $i$ عند الإزاحة على المحور $j$ | المشتقة الجزئية المختلطة (متناظرة: $H_{ij} = H_{ji}$ وفق مبرهنة كليرو) |\n| $\\frac{1}{2} \\Delta \\mathbf{x}^T \\mathbf{H} \\Delta \\mathbf{x}$ | $\\mathbb{R}$ (قيمة قياسية) | الصورة التربيعية للانحناء الاتجاهي | تحدد ما إذا كانت الطاقة تصعد أم تهبط عند التحرك بالإزاحة $\\Delta \\mathbf{x}$ |\n| $\\lambda_i$ | $\\mathbb{R}$ | القيم الذاتية لمصفوفة هيسي | الانحناءات الرئيسية على طول المحاور الذاتية المتعامدة |\n| النقطة السرجية | شكل هندسي | انحناءات متباينة الإشارة (موجبة وسالبة معاً) | تضاريس زائدية تشبه السرج تحتجز خوارزميات الاستمثال البسيطة |\n\n#### التفسير المنطقي لتناظر مصفوفة هيسي\nلماذا تكون مصفوفة هيسي متناظرة دوماً ($H_{ij} = H_{ji}$) في الدوال الملساء؟\nوفقاً لمبرهنة كليرو-شفارتز الرياضية، طالما أن المشتقات الثانية متصلة، فإن ترتيب إجراء التفاضل لا يؤثر على النتيجة إطلاقاً: $\\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial y}\\right) = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial x}\\right)$. الشطر شرقاً ثم الخطو شمالاً يولد نفس التغير في الارتفاع تماماً كالشطر شمالاً ثم الخطو شرقاً. وبفضل المبرهنة الطيفية، تمتلك كل مصفوفة متناظرة قيماً ذاتية حقيقية ومتجهات ذاتية متعامدة تمثل المحاور الرئيسية لانحناء الإناء التربيعي.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-24",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "عند نقطة حرجة $\\nabla \\mathcal{L}(\\mathbf{w}) = \\mathbf{0}$ على سطح دالة خسارة لشبكة عصبية عميقة، كانت القيم الذاتية لمصفوفة هيسي هي $\\lambda_1 = +14.2$ و $\\lambda_2 = -6.8$. ما الطبيعة الهندسية لهذه النقطة، وكيف سيتصرف أي اضطراب موضعي طفيف؟"
          },
          "options": [
            {
              "text": {
                "en": "The point is a saddle point: perturbations along the eigenvector of $+14.2$ increase the loss, while perturbations along the eigenvector of $-6.8$ decrease the loss, providing an escape route for momentum-based optimizers.",
                "ar": "تمثل النقطة نقطة سرجية (Saddle Point): حيث تؤدي أي إزاحة على طول المتجه الذاتي المقابل لـ $+14.2$ إلى زيادة الخسارة صعوداً، بينما تؤدي الإزاحة على طول المتجه الذاتي المقابل لـ $-6.8$ إلى خفض الخسارة هبوطاً، مما يوفر مسار هروب طبيعياً لخوارزميات الاستمثال المعتمدة على الزخم.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Because the eigenvalues have mixed signs ($\\lambda_1 > 0$ and $\\lambda_2 < 0$), the quadratic form $\\Delta \\mathbf{w}^T \\mathbf{H} \\Delta \\mathbf{w}$ is indefinite. It is convex in one direction and concave in the orthogonal direction, defining a hyperbolic saddle pass.",
                "ar": "نظراً لاختلاف إشارات القيم الذاتية (واحدة موجبة $\\lambda_1 > 0$ والأخرى سالبة $\\lambda_2 < 0$)، فإن الصورة التربيعية تكون غير محددة. السطح محدب كالوادي في اتجاه ومقعر كالقبة في الاتجاه المتعامد معه، مما يشكل نقطة سرجية كلاسيكية."
              }
            },
            {
              "text": {
                "en": "The point is a stable global minimum where all gradient trajectories converge.",
                "ar": "تمثل النقطة نهاية صغرى شاملة ومستقرة تتقارب نحوها جميع مسارات التدرج.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A minimum requires *all* eigenvalues to be strictly positive ($\\mathbf{H} \\succ 0$). The negative eigenvalue $\\lambda_2 = -6.8$ provides an immediate downhill escape direction.",
                "ar": "تتطلب النهاية الصغرى أن تكون *جميع* القيم الذاتية موجبة تماماً ($\\mathbf{H} \\succ 0$). بينما توفر القيمة السالبة $\\lambda_2 = -6.8$ مسار هبوط فوري يكسر الاستقرار."
              }
            },
            {
              "text": {
                "en": "The point is a local maximum where all gradient trajectories diverge.",
                "ar": "تمثل النقطة نهاية عظمى محلية تتشتت وتبتعد عنها جميع مسارات التدرج.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "A local maximum requires *all* eigenvalues to be strictly negative ($\\mathbf{H} \\prec 0$). Here, the positive eigenvalue $\\lambda_1 = +14.2$ forms a rising valley wall.",
                "ar": "تتطلب النهاية العظمى أن تكون *كافة* القيم الذاتية سالبة تماماً ($\\mathbf{H} \\prec 0$). بينما يشكل المتجه ذو القيمة الموجبة $+14.2$ جدار وادٍ يرتفع للأعلى."
              }
            },
            {
              "text": {
                "en": "The Hessian is singular and cannot be classified.",
                "ar": "مصفوفة هيسي مصفوفة شاذة ومنعدمة المحدد ولا يمكن تصنيف طبيعتها الهندسية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The determinant is $\\det(\\mathbf{H}) = \\lambda_1 \\lambda_2 = (14.2)(-6.8) \\ne 0$; the Hessian is non-singular and fully invertible.",
                "ar": "محدد المصفوفة هو حاصل ضرب القيم الذاتية $\\det(\\mathbf{H}) = (14.2)(-6.8) \\ne 0$، ومن ثم فالمصفوفة غير شاذة وقابلة للعكس بالكامل."
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
    "id": "t1-25",
    "title": "The Jacobian Matrix & Vector-Valued Deformation",
    "titleAr": "مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "In our previous explorations of calculus, our functions were scalar fields: they took in a multi-dimensional point and returned a single...",
      "ar": "في استكشافاتنا السابقة لعلم الحسبان، كانت دوالنا عبارة عن حقول عددية: تستقبل نقطة متعددة الأبعاد وتُخرج رقماً قياسياً وحيداً—مثل إدخال..."
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
          "en": "In our previous explorations of calculus, our functions were scalar fields: they took in a multi-dimensional point and returned a single solitary number—like inputting GPS coordinates $(x, y)$ and receiving elevation $z$, or inputting millions of model weights and receiving a single loss value $\\mathcal{L}$. But what happens when a physical or mathematical system takes in a multi-dimensional vector and outputs **another multi-dimensional vector**?\n\nConsider an atmospheric weather forecast: at every geographic location $(x, y)$ on a weather map, the wind does not blow at a single scalar speed. It is a vector: it has an East-West velocity component $u(x, y)$ and a North-South velocity component $v(x, y)$. The mapping is $\\mathbf{F}: \\mathbb{R}^2 \\to \\mathbb{R}^2$. Or picture a robotic arm with three motor joints $(\\theta_1, \\theta_2, \\theta_3)$: adjusting those three joint angles changes the $(x, y, z)$ spatial position of the gripper claw. The mapping is $\\mathbf{F}: \\mathbb{R}^3 \\to \\mathbb{R}^3$.\n\nHow do you differentiate such a vector-valued system? You cannot summarize the sensitivity with a single gradient vector, because each individual output component has its own independent gradient! \nThe **Jacobian Matrix** $\\mathbf{J}$ is the master operator that stacks all these gradient vectors together into an organized grid:\n- Row 1 is the gradient of output component 1 ($\\nabla F_1^T$).\n- Row 2 is the gradient of output component 2 ($\\nabla F_2^T$), and so on.\n\nGeometrically, the Jacobian is the ultimate description of **local spatial deformation**. Imagine drawing a tiny, microscopic circular droplet of black ink on a flexible rubber sheet. If you grab the edges of the rubber sheet and stretch, twist, and deform it according to the vector mapping $\\mathbf{F}$, what happens to that tiny ink droplet? Under an infinite microscope, the deformed droplet becomes a perfect **ellipse**! The Jacobian matrix $\\mathbf{J}$ is the linear operator that describes exactly how that circular droplet gets stretched, rotated, and sheared into an ellipse.\n\nIn contemporary generative artificial intelligence, this geometric transformation is the engine of **Normalizing Flows** and generative coordinate transforms. By chaining together invertible vector mappings with easily computable Jacobians, AI models stretch and fold a simple bell-shaped Gaussian distribution into the fantastically complex probability distribution of realistic human faces, audio waveforms, or protein structures.\n\n---",
          "ar": "في استكشافاتنا السابقة لعلم الحسبان، كانت دوالنا عبارة عن حقول عددية: تستقبل نقطة متعددة الأبعاد وتُخرج رقماً قياسياً وحيداً—مثل إدخال إحداثيات الموقع $(x, y)$ واستقبال الارتفاع $z$، أو إدخال ملايين الأوزان واستقبال قيمة خسارة وحيدة $\\mathcal{L}$. ولكن ماذا يحدث عندما تستقبل المنظومة الرياضية أو الفيزيائية متجهاً متعدد الأبعاد وتُخرج **متجهاً آخر متعدد الأبعاد**؟\n\nتأمل خريطة الأرصاد الجوية لحركة الرياح: عند كل موقع جغرافي $(x, y)$ على الخريطة، لا تهب الرياح بسرعة قياسية مجردة. بل هي متجه حقيقي: تمتلك مركبة سرعة شرقية-غربية $u(x, y)$ ومركبة سرعة شمالية-جنوبية $v(x, y)$. هذا التحويل هو دالة متجهية $\\mathbf{F}: \\mathbb{R}^2 \\to \\mathbb{R}^2$. أو تخيل ذراعاً روبوتية صناعية ذات ثلاثة مفاصل حركية $(\\theta_1, \\theta_2, \\theta_3)$: يؤدي تدوير هذه المفاصل الثلاثة إلى تغيير الموضع المكاني $(x, y, z)$ لمقبض الذراع في الفضاء الثلاثي. هذا التحويل دالة متجهية $\\mathbf{F}: \\mathbb{R}^3 \\to \\mathbb{R}^3$.\n\nكيف نقوم بحساب مشتقة منظومة متجهية كهذه؟ لا يمكننا تلخيص الحساسية بمتجه تدرج مفرد، لأن كل مركبة في المخرجات تمتلك تدرجها الخاص المستقل!\n**مصفوفة جاكوبي** (The Jacobian Matrix) $\\mathbf{J}$ هي المؤثر الرياضي الجامع الذي يرص كافة متجهات التدرج هذه في شبكة مصفوفية منظمة:\n- الصف الأول هو تدرج مركبة المخرجات الأولى ($\\nabla F_1^T$).\n- الصف الثاني هو تدرج مركبة المخرجات الثانية ($\\nabla F_2^T$)، وهكذا دواليك.\n\nهندسياً، تمثل مصفوفة جاكوبي الوصف الرياضي الأكمل لـ **التشوه المكاني المحلي**. تخيل أنك رسمت قطرة حبر دائرية متناهية الصغر على غشاء مطاطي مرن. إذا أمسكت بأطراف الغشاء المطاطي وشددته ولوّيته وشوهته وفقاً للتحويل المتجهي $\\mathbf{F}$، فماذا سيحدث لتلك القطرة الدائرية الدقيقة؟ تحت مجهر لانهائي، ستتحول الدائرة المشوهة إلى **قطع ناقص (شكل بيضاوي)** مثالي! مصفوفة جاكوبي $\\mathbf{J}$ هي التحويل الخطي الدقيق الذي يصف كيف تمددت تلك القطرة الدائرية، وكيف دارت، وكيف تغير حجمها لتتحول إلى ذلك القطع الناقص.\n\nوفي الذكاء الاصطناعي التوليدي الحديث، يمثل هذا التحول الهندسي القلب النابض لنماذج **التدفقات المعيارية** (Normalizing Flows). فعبر ربط سلسلة من التحويلات المتجهية القابلة للعكس ذات مصفوفات جاكوبي سهلة الحساب، يستطيع النموذج شد وثني توزيع احتمالي غاوسي بسيط ليشكل التوزيع فائق التعقيد لصور الوجوه البشرية فائقة الدقة أو الأصوات أو الهياكل الجزيئية للبروتينات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{F}: \\mathbb{R}^N \\to \\mathbb{R}^M, \\quad \\mathbf{J} = \\frac{\\partial \\mathbf{F}}{\\partial \\mathbf{x}} \\coloneqq \\begin{bmatrix} \\frac{\\partial F_1}{\\partial x_1} & \\cdots & \\frac{\\partial F_1}{\\partial x_N} \\\\ \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial F_M}{\\partial x_1} & \\cdots & \\frac{\\partial F_M}{\\partial x_N} \\end{bmatrix} = \\begin{bmatrix} \\nabla F_1^T \\\\ \\vdots \\\\ \\nabla F_M^T \\end{bmatrix} \\in \\mathbb{R}^{M \\times N}",
        "formulaNote": {
          "en": "Mathematical anchor for The Jacobian Matrix & Vector-Valued Deformation.",
          "ar": "المرساة الرياضية لـ مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية."
        },
        "narrative": {
          "en": "$$\n\\mathbf{F}(\\mathbf{x} + \\Delta \\mathbf{x}) \\approx \\mathbf{F}(\\mathbf{x}) + \\mathbf{J}(\\mathbf{x}) \\Delta \\mathbf{x}\n$$\n$$\ndV_{\\mathbf{y}} = |\\det(\\mathbf{J})| \\, dV_{\\mathbf{x}} \\quad (\\text{Multivariate Volume Scaling for } M = N)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{F}$ | $\\mathbb{R}^N \\to \\mathbb{R}^M$ | Non-linear vector mapping from $N$-dim domain to $M$-dim codomain | Forward transformation modeling physical kinematics or neural flow |\n| $\\mathbf{J}$ | $\\mathbb{R}^{M \\times N}$ | Matrix of all first-order partial derivatives | Optimal local linear transformation approximating the nonlinear map $\\mathbf{F}$ |\n| $\\nabla F_i^T$ | $1 \\times N$ (Row vector) | Gradient of the $i$-th scalar output component | $i$-th row of the Jacobian matrix encoding sensitivity of output $i$ |\n| $\\Delta \\mathbf{x}$ | $\\mathbb{R}^N$ | Small spatial displacement vector in input domain | Input nudge transformed into output displacement $\\Delta \\mathbf{y} \\approx \\mathbf{J} \\Delta \\mathbf{x}$ |\n| $|\\det(\\mathbf{J})|$ | $\\mathbb{R}_{\\ge 0}$ (for $M=N$) | Local volume magnification / expansion factor | The scaling factor when transforming probability densities and multidimensional integrals |\n\n#### Intuitive Rationale for $|\\det(\\mathbf{J})|$\nWhy does the absolute determinant $|\\det(\\mathbf{J})|$ represent volume scaling?\nIn linear algebra, the determinant of a matrix represents the volume of the parallelotope formed by its column vectors. Because the Jacobian $\\mathbf{J}$ is the best linear approximation of $\\mathbf{F}$ around a point $\\mathbf{x}$, an infinitesimal cube of volume $dV_{\\mathbf{x}} = dx_1 dx_2 \\dots dx_N$ is mapped into an infinitesimal parallelotope in the output space. The volume of this new parallelotope is precisely scaled by $|\\det(\\mathbf{J})|$. If $|\\det(\\mathbf{J})| = 3.0$, the function locally expands volumes by a factor of 3. If $|\\det(\\mathbf{J})| = 0$, the function collapses a dimension, flattening volumes into pancakes.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{F}$ | $\\mathbb{R}^N \\to \\mathbb{R}^M$ | تحويل غير خطي متجهي من فضاء ذي بعد $N$ إلى فضاء ذي بعد $M$ | النمذجة الرياضية لحركيات الروبوتات أو التدفقات العصبية التوليدية |\n| $\\mathbf{J}$ | $\\mathbb{R}^{M \\times N}$ | مصفوفة كافة المشتقات الجزئية من الرتبة الأولى | أفضل تحويل خطي محلي ينوب عن الدالة غير الخطية $\\mathbf{F}$ |\n| $\\nabla F_i^T$ | $1 \\times N$ (متجه صف) | تدرج مركبة المخرجات القياسية رقم $i$ | الصف رقم $i$ في مصفوفة جاكوبي معبراً عن حساسية المخرج $i$ |\n| $\\Delta \\mathbf{x}$ | $\\mathbb{R}^N$ | متجه إزاحة مكانية دقيقة في فضاء المدخلات | مدخل الاضطراب الذي يتحول إلى إزاحة في المخرجات $\\Delta \\mathbf{y} \\approx \\mathbf{J} \\Delta \\mathbf{x}$ |\n| $|\\det(\\mathbf{J})|$ | $\\mathbb{R}_{\\ge 0}$ (عند $M=N$) | معامل تمدد أو انكماش الحجم المكاني المحلي | معامل التوسع المستخدم في تكاملات تغيير المتغيرات وتوليد التوزيعات |\n\n#### التفسير المنطقي لمعامل التمدد الحجمي $|\\det(\\mathbf{J})|$\nلماذا يمثل القيمة المطلقة للمحدد $|\\det(\\mathbf{J})|$ مقياس تمدد الحجم؟\nفي الجبر الخطي، يمثل محدد المصفوفة حجم متوازي السطوح المتشكل من أعمدتها. وبما أن مصفوفة جاكوبي $\\mathbf{J}$ هي أفضل تقريب خطي للدالة $\\mathbf{F}$ حول النقطة $\\mathbf{x}$، فإن مكعباً متناهي الصغر حجمه $dV_{\\mathbf{x}} = dx_1 dx_2 \\dots dx_N$ يتحول في فضاء المخرجات إلى متوازي سطوح مشوه. ويتغير حجم هذا الجسم الجديد بالتحديد بنسبة $|\\det(\\mathbf{J})|$. فإذا كان $|\\det(\\mathbf{J})| = 3.0$، فهذا يعني أن الدالة تضخم الحجم المحلي بمقدار 3 أضعاف. وإذا كان $|\\det(\\mathbf{J})| = 0$، فهذا يعني أن الدالة تسحق أحد الأبعاد وتضغط الحجم ليصبح مسطحاً كالصفحة.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-25",
          "starterCode": "def numerical_jacobian(F: Callable[[np.ndarray], np.ndarray], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical Jacobian matrix of vector function F: R^N -> R^M at x0.\n    Evaluates central difference perturbations along each input basis direction.\n    \n    Parameters\n    ----------\n    F : Callable\n        Vector-valued function mapping array of shape (N,) to array of shape (M,).\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (N,).\n    eps : float\n        Finite difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Jacobian matrix of shape (M, N).\n    \"\"\"\n    # Step 1: Construct coordinate perturbation matrix E = eps * I_n\n    # Step 2: Perturb each coordinate j via central differences to obtain column j of the Jacobian\n    # Step 3: Stack column derivative vectors horizontally to form (M, N) matrix\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def numerical_jacobian(F: Callable[[np.ndarray], np.ndarray], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical Jacobian matrix of vector function F: R^N -> R^M at x0.\n    Evaluates central difference perturbations along each input basis direction.\n    \n    Parameters\n    ----------\n    F : Callable\n        Vector-valued function mapping array of shape (N,) to array of shape (M,).\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (N,).\n    eps : float\n        Finite difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Jacobian matrix of shape (M, N).\n    \"\"\"\n    # Step 1: Construct coordinate perturbation matrix E = eps * I_n\n    # Step 2: Perturb each coordinate j via central differences to obtain column j of the Jacobian\n    # Step 3: Stack column derivative vectors horizontally to form (M, N) matrix\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[1.0, 0.0]"
            }
          },
          "solution": "from typing import Callable\nimport numpy as np\n\ndef numerical_jacobian(F: Callable[[np.ndarray], np.ndarray], x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:\n    \"\"\"\n    Compute numerical Jacobian matrix of vector function F: R^N -> R^M at x0.\n    Evaluates central difference perturbations along each input basis direction.\n    \n    Parameters\n    ----------\n    F : Callable\n        Vector-valued function mapping array of shape (N,) to array of shape (M,).\n    x0 : np.ndarray\n        Evaluation coordinate vector of shape (N,).\n    eps : float\n        Finite difference perturbation step size (default 1e-5).\n        \n    Returns\n    -------\n    np.ndarray\n        Jacobian matrix of shape (M, N).\n    \"\"\"\n    # Step 1: Construct coordinate perturbation matrix E = eps * I_n\n    n = len(x0)\n    E = np.eye(n) * eps\n    cols = []\n    \n    # Step 2: Perturb each coordinate j via central differences to obtain column j of the Jacobian\n    for j in range(n):\n        f_plus = F(x0 + E[j])\n        f_minus = F(x0 - E[j])\n        col_j = (f_plus - f_minus) / (2.0 * eps)\n        cols.append(col_j)\n        \n    # Step 3: Stack column derivative vectors horizontally to form (M, N) matrix\n    J = np.column_stack(cols)\n    return J"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "في نماذج التدفقات المعيارية التوليدية (Normalizing Flows)، تقوم شبكة عصبية قابلة للعكس $\\mathbf{x} = g(\\mathbf{z})$ بتحويل متغير كامن بسيط $\\mathbf{z} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$ إلى عينة بيانات معقدة $\\mathbf{x}$. ولحساب الكثافة الاحتمالية الدقيقة $p(\\mathbf{x})$، تنص مبرهنة تغيير المتغيرات على ضرب الكثافة في مقلوب المحدد $|\\det(\\mathbf{J}_g)|^{-1}$. ماذا يمثل المقدار $|\\det(\\mathbf{J}_g)|$ من الناحية الهندسية الفيزيائية؟"
          },
          "options": [
            {
              "text": {
                "en": "The local infinitesimal volume expansion/contraction factor, measuring how an infinitesimal cube in $\\mathbf{z}$-space gets stretched into a parallelotope in $\\mathbf{x}$-space.",
                "ar": "معامل تمدد أو انكماش الحجم متناهي الصغر، والذي يقيس كيف يتمدد مكعب دقيق في فضاء المتغيرات الكامنة $\\mathbf{z}$ ليتحول إلى متوازي سطوح في فضاء البيانات المشاهدة $\\mathbf{x}$.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The determinant of the Jacobian measures the ratio of output volume element $dV_{\\mathbf{x}}$ to input volume element $dV_{\\mathbf{z}}$. To preserve total probability mass ($p(\\mathbf{x}) dV_{\\mathbf{x}} = p(\\mathbf{z}) dV_{\\mathbf{z}}$), when volume expands by $|\\det(\\mathbf{J}_g)|$, probability density must dilute by its reciprocal.",
                "ar": "يقيس محدد مصفوفة جاكوبي نسبة عنصر حجم المخرجات $dV_{\\mathbf{x}}$ إلى عنصر حجم المدخلات $dV_{\\mathbf{z}}$. وللحفاظ على الكتلة الاحتمالية الكلية ($p(\\mathbf{x}) dV_{\\mathbf{x}} = p(\\mathbf{z}) dV_{\\mathbf{z}}$)، فإنه عندما يتمدد الحجم بمقدار $|\\det(\\mathbf{J}_g)|$، يجب أن تنخفض الكثافة الاحتمالية بنفس النسبة عبر القسمة على هذا المحدد."
              }
            },
            {
              "text": {
                "en": "The Euclidean distance between latent code $\\mathbf{z}$ and observation $\\mathbf{x}$.",
                "ar": "المسافة الإقليدية المستقيمة الفاصلة بين الشفرة الكامنة $\\mathbf{z}$ والمشاهدة $\\mathbf{x}$.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Determinants measure hyper-volumes, not 1D straight-line vector distances.",
                "ar": "تقيس المحددات الحجوم الفائقة المشوهة، ولا تقيس المسافات الخطية أحادية البعد."
              }
            },
            {
              "text": {
                "en": "The maximum eigenvalue of the output covariance matrix.",
                "ar": "القيمة الذاتية القصوى لمصفوفة التباين المشترك للمخرجات.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The maximum eigenvalue measures variance along the single primary axis, whereas the determinant is the product of *all* singular values, measuring total multi-dimensional volume.",
                "ar": "تقيس القيمة الذاتية الكبرى التباين على طول محور وحيد، بينما المحدد هو حاصل ضرب *جميع* القيم الشاذة، مما يمثل الحجم متعدد الأبعاد ككل."
              }
            },
            {
              "text": {
                "en": "The total reconstruction loss of the generative network.",
                "ar": "إجمالي خطأ إعادة البناء لشبكة التوليد العصبية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The Jacobian determinant is a local calculus derivative of the transformation itself, completely distinct from any empirical loss metric.",
                "ar": "محدد جاكوبي هو مشتقة تفاضلية محلية خاصة بالتحويل الهندسي ذاته، ولا علاقة له بمقياس خطأ تدريب تجريبي."
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
    "id": "t1-26",
    "title": "Convexity, Epigraphs & Global Minimizers",
    "titleAr": "التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine a smooth ceramic soup bowl resting on a kitchen table. Suppose you pick any two arbitrary points anywhere inside the soup or on the...",
      "ar": "تخيل إناء حساء خزفياً أملس ومستديراً موضوعاً على طاولة طعام. لنفترض أنك اخترت أي نقطتين عشوائيتين في أي مكان داخل الحساء أو على حافة الإناء..."
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
          "en": "Imagine a smooth ceramic soup bowl resting on a kitchen table. Suppose you pick any two arbitrary points anywhere inside the soup or on the bowl's porcelain rim and stretch a taut, razor-thin laser beam directly between them. Look closely at the laser beam: does it ever poke through the porcelain walls into the empty air outside? No! The entire straight beam stays completely inside or floats comfortably above the bowl.\n\nThis tactile test is the foundational definition of a **convex set**. A **convex function** is a function whose entire landscape behaves like this bowl: if you pick any two points on its graph and draw a straight chord connecting them, the curve never bulges above that chord. It always hangs peacefully below or touches it. In the language of geometry, the region of space lying above the curve—known as the **epigraph**—forms a solid convex set.\n\nWhy is convexity universally revered as the holy grail of mathematical optimization? Because on a convex surface, **you can never be fooled by a deceptive local minimum**. Imagine hiking in dense fog looking for the lowest point in a region. On a bumpy, non-convex landscape, you might walk into a small shallow puddle on a high mountain ledge and mistakenly believe you have reached the valley floor. But on a convex surface, there are no trap puddles! Water poured anywhere on the terrain flows smoothly to a single pool. If you find a single stationary point where the ground is flat ($\\nabla f = \\mathbf{0}$), you are mathematically guaranteed that you are standing at the **absolute, global minimum of the entire universe**!\n\nFurthermore, convexity gives birth to **Jensen's Inequality**, one of the most powerful laws in probability theory. Imagine scattering thousands of tiny weights across the interior of our soup bowl. Where does their physical center of mass lie? Because the bowl curves upward, the center of mass floats in mid-air *above* the bottom of the bowl. Mathematically, the function evaluated at the expected value is always less than or equal to the expected value of the function: $f(\\mathbb{E}[X]) \\le \\mathbb{E}[f(X)]$.\n\nIn machine learning and statistics, this gap—the Jensen gap—is not an inconvenience; it is a foundational construction tool. It guarantees that the Kullback-Leibler (KL) divergence between two probability distributions is strictly non-negative, provides the mathematical justification for the Evidence Lower Bound (ELBO) in Variational Autoencoders (VAEs), and proves why cross-entropy loss works so reliably.\n\n---",
          "ar": "تخيل إناء حساء خزفياً أملس ومستديراً موضوعاً على طاولة طعام. لنفترض أنك اخترت أي نقطتين عشوائيتين في أي مكان داخل الحساء أو على حافة الإناء البيضاء، وشددت بينهما شعاع ليزر مستقيماً فائق الدقة. تأمل مسار هذا الشعاع: هل يخترق جدران الخزف ليخرج إلى الهواء الطلق خارج الإناء؟ كلا على الإطلاق! يظل شعاع الليزر بالكامل محتواً بأمان داخل الإناء أو يطفو في الفضاء الواقع فوق قاعه.\n\nهذا الاختبار الحسي المباشر هو التعريف الهندسي التأسيسي لـ **المجموعة المحدبة** (Convex Set). و**الدالة المحدبة** (Convex Function) هي دالة رياضية تشبه تضاريسها بالكامل هذا الإناء الخزفي: إذا اخترت أي نقطتين على منحناها ووصلت بينهما بوتر مستقيم، فإن المنحنى لا ينتفخ فوق ذلك الوتر أبداً. بل يتدلى دوماً أسفله أو يلامسه. وفي لغة الهندسة، فإن فضاء النقاط الواقعة فوق المنحنى—والمعروف رياضياً بـ **المخطط الفوقي** (Epigraph)—يشكل مجموعة محدبة متماسكة.\n\nلماذا يُعد التحدب الكأس المقدسة ومحط إجلال كافة علماء الاستمثال والتحسين الرياضي؟ لأنه على سطح محدب، **يستحيل تماماً أن تقع في فخ نهاية صغرى محلية خادعة**. تخيل أنك تسير وسط ضباب كثيف بحثاً عن أخفض نقطة في المنطقة. في التضاريس غير المحدبة الوعرة، قد تنزلق في بركة ماء صغيرة ضحلة فوق حافة جبلية شاهقة وتظن واهماً أنك بلغت قاع الوادي. أما في التضاريس المحدبة، فلا توجد برك خادعة! فأي ماء يُسكب على السطح يتدفق حتماً ليستقر في قاع وحيد. وإذا عثرت على نقطة واحدة فقط ينعدم عندها التدرج ($\\nabla f = \\mathbf{0}$)، فأنت تملك ضمانة رياضية مطلقة بأنك تقف عند **القاع الشامل والأدنى للدالة في الكون بأكمله**!\n\nوفضلاً عن ذلك، يمنحنا التحدب **متباينة ينسن** (Jensen's Inequality)، إحدى أقوى مبرهنات نظرية الاحتمالات. تخيل أنك وزعت آلاف الكتل الصغيرة داخل إناء الحساء. أين سيقع مركز كتلتها المشترك؟ نظراً لأن الإناء ينحني لأعلى، فإن مركز الكتلة يطفو في الهواء *فوق* قاع الإناء. رياضياً: قيمة الدالة عند القيمة المتوقعة تكون دوماً أقل من أو مساوية للقيمة المتوقعة للدالة: $f(\\mathbb{E}[X]) \\le \\mathbb{E}[f(X)]$.\n\nوفي الذكاء الاصطناعي وتعلم الآلة، لا تُعد هذه الفجوة—فجوة ينسن—مجرد فضول نظري؛ بل هي اللبنة التأسيسية التي تضمن أن تباعد كولباك-ليبلر (KL Divergence) بين أي توزيعين احتماليين يكون موجباً دوماً، وتوفر الأساس الرياضي المتين لاشتقاق الحد الأدنى للدليل الاحتمالي (ELBO) في شفرات التشفير التلقائي التوليدية (VAEs)، وتبرر الفعالية المذهلة لدوال خسارة الإنتروبيا المتقاطعة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "f(\\alpha \\mathbf{x} + (1 - \\alpha)\\mathbf{y}) \\le \\alpha f(\\mathbf{x}) + (1 - \\alpha) f(\\mathbf{y}) \\quad \\forall \\mathbf{x}, \\mathbf{y} \\in \\operatorname{dom}(f), \\; \\alpha \\in [0, 1]",
        "formulaNote": {
          "en": "Mathematical anchor for Convexity, Epigraphs & Global Minimizers.",
          "ar": "المرساة الرياضية لـ التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة."
        },
        "narrative": {
          "en": "$$\n\\operatorname{epi}(f) \\coloneqq \\left\\{ (\\mathbf{x}, t) \\in \\mathbb{R}^{D+1} \\;\\middle|\\; \\mathbf{x} \\in \\operatorname{dom}(f), \\; t \\ge f(\\mathbf{x}) \\right\\} \\quad (\\text{Epigraph Set is Convex})\n$$\n$$\nf(\\mathbb{E}[\\mathbf{X}]) \\le \\mathbb{E}[f(\\mathbf{X})] \\implies \\Delta_{\\text{Jensen}} = \\mathbb{E}[f(\\mathbf{X})] - f(\\mathbb{E}[\\mathbf{X}]) \\ge 0\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}, \\mathbf{y}$ | $\\mathbb{R}^D$ | Arbitrary pair of coordinates in function domain | Endpoints of the geometric test chord |\n| $\\alpha \\in [0, 1]$ | Scalar | Linear blending / interpolation weight | Sweeps position along the straight chord connecting $\\mathbf{x}$ and $\\mathbf{y}$ |\n| $\\operatorname{epi}(f)$ | Subset of $\\mathbb{R}^{D+1}$ | The epigraph: region of space lying on and above the graph | Set-theoretic definition establishing functional convexity |\n| $\\mathbb{E}[\\mathbf{X}]$ | $\\mathbb{R}^D$ | Expected value / balance point of probability mass | Center of gravity of input random variable |\n| $\\Delta_{\\text{Jensen}}$ | $\\mathbb{R}_{\\ge 0}$ | Non-negative Jensen gap | The non-negative divergence gap underpinning variational inference |\n\n#### Intuitive Rationale: The First-Order Tangent Plane Condition\nFor a differentiable function, convexity can be restated in a beautifully tactile way: **the tangent plane always lies below the function**.\n$$\nf(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T (\\mathbf{y} - \\mathbf{x}) \\quad \\forall \\mathbf{x}, \\mathbf{y}\n$$\nImagine holding a flat wooden board tangent to the bottom of our ceramic bowl. Does the board slice through the bowl? Never! The flat tangent board supports the bowl from underneath, acting as a global lower bound. This is why any point where the tangent is horizontal ($\\nabla f = \\mathbf{0}$) immediately proves $f(\\mathbf{y}) \\ge f(\\mathbf{x}) + 0 = f(\\mathbf{x})$, certifying $\\mathbf{x}$ as a global minimum.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}, \\mathbf{y}$ | $\\mathbb{R}^D$ | أي نقطتين عشوائيتين في نطاق الدالة | طرفا الوتر المستقيم الاختباري |\n| $\\alpha \\in [0, 1]$ | قيمة قياسية | معامل المزج والوزن الخطي | يمسح المسافة على طول القطعة المستقيمة الواصلة بين النقطتين |\n| $\\operatorname{epi}(f)$ | مجموعة في $\\mathbb{R}^{D+1}$ | المخطط الفوقي: فضاء النقاط الواقعة فوق سطح الدالة | التعريف الجمعي التأسيسي الذي يثبت تحدب الدالة هندسياً |\n| $\\mathbb{E}[\\mathbf{X}]$ | $\\mathbb{R}^D$ | القيمة المتوقعة / نقطة توازن الكتلة الاحتمالية | مركز ثقل المتغير العشوائي في فضاء المدخلات |\n| $\\Delta_{\\text{Jensen}}$ | $\\mathbb{R}_{\\ge 0}$ | فجوة ينسن الموجبة غير السالبة | الفارق الموجب الضامن لتشتت التباين والاستدلال المتغير |\n\n#### التفسير المنطقي: شرط مماس الرتبة الأولى\nفي الدوال القابلة للاشتقاق، يمكن التعبير عن التحدب بخاصية حسية بالغة الجمال: **المستوي المماس يقع دوماً أسفل الدالة ولا يخترقها أبداً**.\n$$\nf(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T (\\mathbf{y} - \\mathbf{x}) \\quad \\forall \\mathbf{x}, \\mathbf{y}\n$$\nتخيل أنك تسند لوحاً خشبياً مسطحاً ليلامس قاع إنائنا الخزفي من الخارج. هل يقطع اللوح جدار الإناء؟ مستحيل! يظل اللوح المماس مسانداً للإناء من الأسفل مشكلاً حداً أدنى شاملاً له. ولهذا السبب، فإن أي نقطة يصبح عندها المستوي المماس أفقياً ($\\nabla f = \\mathbf{0}$) تثبت فوراً أن $f(\\mathbf{y}) \\ge f(\\mathbf{x}) + 0 = f(\\mathbf{x})$، مما يؤكد ببرهان قاطع أن $\\mathbf{x}$ هي نهاية صغرى مطلقة.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-26",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "في نماذج التشفير التلقائي التغيرية (VAEs)، يُعد التعظيم المباشر للاحتمالية اللوغاريتمية الهامشية $\\ln p(\\mathbf{x}) = \\ln \\mathbb{E}_{q(\\mathbf{z}|\\mathbf{x})}\\left[\\frac{p(\\mathbf{x}, \\mathbf{z})}{q(\\mathbf{z}|\\mathbf{x})}\\right]$ معضلة حسابية مستحيلة عملياً. يطبق الباحثون متباينة ينسن على دالة اللوغاريتم المقعرة قطعياً لاشتقاق الحد الأدنى للدليل (ELBO): $\\ln \\mathbb{E}[X] \\ge \\mathbb{E}[\\ln X]$. ماذا تمثل فجوة ينسن غير السالبة في هذا السياق للتعلم العميق؟"
          },
          "options": [
            {
              "text": {
                "en": "The Kullback-Leibler (KL) divergence $\\mathcal{D}_{\\text{KL}}(q(\\mathbf{z}|\\mathbf{x}) \\parallel p(\\mathbf{z}|\\mathbf{x})) \\ge 0$ measuring the discrepancy between the approximate and true posterior distributions.",
                "ar": "تباعد كولباك-ليبلر (KL Divergence) $\\mathcal{D}_{\\text{KL}}(q(\\mathbf{z}|\\mathbf{x}) \\parallel p(\\mathbf{z}|\\mathbf{x})) \\ge 0$ الذي يقيس مقدار التباعد والتباين بين التوزيع البعدي التقريبي والتوزيع البعدي الحقيقي.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The mathematical difference between the true log-evidence $\\ln p(\\mathbf{x})$ and the ELBO lower bound is algebraically identical to $\\mathcal{D}_{\\text{KL}}(q(\\mathbf{z}|\\mathbf{x}) \\parallel p(\\mathbf{z}|\\mathbf{x}))$. By Jensen's inequality, this divergence gap is strictly non-negative, vanishing to zero if and only if the approximate encoder matches the true posterior distribution perfectly.",
                "ar": "الفارق الرياضي الدقيق بين لوغاريتم الدليل الحقيقي $\\ln p(\\mathbf{x})$ والحد الأدنى (ELBO) يتطابق جبرياً مع تباعد كولباك-ليبلر. وبفضل متباينة ينسن، تكون هذه الفجوة غير سالبة دوماً، وتنعدم لتصبح صفراً فقط عندما يطابق المشفر التقريبي التوزيع البعدي الحقيقي بنسبة 100%."
              }
            },
            {
              "text": {
                "en": "The reconstruction Mean Squared Error of the decoder network.",
                "ar": "متوسط مربع الخطأ (MSE) لإعادة بناء العينات بواسطة شبكة فك التشفير.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Reconstruction error is only one component of the ELBO bound, not the Jensen gap between the bound and true evidence.",
                "ar": "يمثل خطأ إعادة البناء جزءاً واحداً فقط داخل حد ELBO ذاته، ولا يمثل الفجوة الفاصلة بين الحد والدليل الحقيقي."
              }
            },
            {
              "text": {
                "en": "The learning rate decay factor during backpropagation.",
                "ar": "معامل اضمحلال معدل التعلم أثناء خطوات الانتشار الخلفي.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The Jensen gap is an intrinsic geometric divergence in probability space, completely independent of optimizer schedules.",
                "ar": "فجوة ينسن خاصية هندسية جوهرية في فضاء الاحتمالات، ولا علاقة لها بجدولة معاملات التعلم."
              }
            },
            {
              "text": {
                "en": "The numerical precision error of floating-point computations.",
                "ar": "خطأ الدقة الحسابية الناتجة عن تمثيل أرقام الفاصلة العائمة في المعالجات.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The Jensen gap is an exact, theoretical analytical divergence, not a numerical hardware rounding artifact.",
                "ar": "فجوة ينسن حقيقة رياضية وتحليلية دقيقة ومثبتة، وليست ناتجة عن تقريب عتاد الحاسوب."
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
    "id": "t1-27",
    "title": "Gradient Descent, Learning Rates & Landscape Navigation",
    "titleAr": "الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are blindfolded and stranded on a steep, unfamiliar mountainside in the middle of a dense, impenetrable fog.",
      "ar": "تخيل أنك معصوب العينين وتقف على سفح جبل صخري وعر يلفه ضباب كثيف لا ترى فيه يدك. لا يمكنك رؤية أي معالم حولك، ولا يمكنك تحديد موقع المخيم..."
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
          "en": "Imagine you are blindfolded and stranded on a steep, unfamiliar mountainside in the middle of a dense, impenetrable fog. You cannot see your hands in front of your face, let alone locate the warm campfire waiting safely at the bottom of the valley below. How on earth can you find your way down to camp without plummeting off a cliff?\n\nYou use the soles of your hiking boots. Even though your eyes are useless, you can feel the tilt of the rock directly beneath your feet. If the ground slopes steeply upward toward the Northeast, you know with absolute certainty that downhill is in the exact opposite direction: toward the Southwest. So, you take a cautious step toward the Southwest! You pause, feel the new tilt of the terrain, take another downhill step, and repeat the process over and over. This is **Gradient Descent** in its purest, most visceral physical form.\n\nWhile the direction of your step is simple ($-\\nabla f$), choosing your **step size**—known in machine learning as the **learning rate** $\\eta$—is a high-stakes balancing act:\n- If your steps are infinitesimal, cowardly baby steps ($\\eta \\to 0$), you will take hours to advance a single meter. The night will freeze you to death long before you make any meaningful progress toward camp.\n- If your steps are wild, reckless, gigantic leaps ($\\eta \\gg 0$), you will jump right over the valley floor, smash face-first into the opposing canyon wall, catapult back and forth in violent oscillations, and diverge into disaster!\n\nFurthermore, real-world mountain landscapes (and neural loss surfaces) are rarely shaped like clean, symmetrical bowls. They are typically **ill-conditioned ravines**: narrow, steep-sided canyons where the walls on either side are violently steep, but the gentle floor leading to camp has a barely noticeable slope. Standard gradient descent gets trapped in this ravine, bouncing frantically back and forth between the opposing walls while crawling forward at a snail's pace.\n\nHow do physicists and engineers solve this? By rolling a heavy object: **Polyak Momentum**. Imagine releasing a heavy, dense iron bowling ball down the canyon. As the ball rolls, its sideways bounces across the walls cancel each other out, while its forward momentum along the gentle floor compounds exponentially. Momentum gives our optimization algorithm physical inertia, smoothing out chaotic zig-zags and accelerating our journey down the valley.\n\n---",
          "ar": "تخيل أنك معصوب العينين وتقف على سفح جبل صخري وعر يلفه ضباب كثيف لا ترى فيه يدك. لا يمكنك رؤية أي معالم حولك، ولا يمكنك تحديد موقع المخيم الدافئ الذي ينتظرك بأمان في أسفل الوادي. كيف يمكنك شق طريقك نحو النجاة دون أن تهوي من فوق جرف شاهق؟\n\nالحل يكمن في باطن حذائك الجبلي. فرغم عجز عينيك التام، تستطيع أقدامك استشعار ميل الصخور تحتك مباشرة. فإذا شعرت بأن الصخور ترتفع بحدة نحو الشمال الشرقي، فأنت تدرك بيقين قاطع أن مسار النزول يقع في الاتجاه المعاكس تماماً: نحو الجنوب الغربي. فتأخذ خطوة حذرة نحو الجنوب الغربي! ثم تتوقف للحظة، وتستشعر انحدار الأرض عند الموضع الجديد، وتأخذ خطوة هبوطية أخرى، وتكرر هذه الدورة مرات ومرات. هذا هو جوهر **خوارزمية الانحدار التدريجي** (Gradient Descent) بأبهى صوره الفيزيائية.\n\nومع أن تحديد اتجاه الهبوط أمر بديهي ($-\\nabla f$)، إلا أن تحديد **حجم الخطوة**—والمعروف في تعلم الآلة بـ **معدل التعلم** $\\eta$—هو عملية موازنة بالغة الدقة والحساسية:\n- إذا كانت خطواتك متناهية في الصغر ومترددة للغاية كالذر ($\\eta \\to 0$)، فستستغرق ساعات طويلة لقطع متر واحد، وسيتجمد جسدك من صقيع الليل قبل أن تقطع أي مسافة ذات شأن نحو المخيم.\n- وإذا كانت خطواتك قفزات عملاقة مفرطة ومتهورة ($\\eta \\gg 0$)، فستقفز فوق قاع الوادي بأكمله، لترتطم بالجرف المقابل، وتتأرجح في تذبذبات عنيفة متفجرة تقودك إلى الهلاك والتشتت الحسابي!\n\nوفضلاً عن ذلك، نادراً ما تكون التضاريس الجبلية الحقيقية (أو أسطح خسارة النماذج العصبية) أواني متناظرة مثالية. بل هي في الغالب **أخاديد سيئة التكيف**: وديان ضيقة جداً تكون جدرانها الجانبية شديدة الانحدار كالسكين، بينما ينحدر قاعها الرئيسي برفق شديد نحو الأمام. هنا تقع خوارزمية الانحدار التقليدية في ورطة؛ حيث تقضي وقتها في التذبذب العنيف بين الجدران الجانبية المتقابلة بينما تزحف كالسلحفاة على طول القاع.\n\nكيف يحل المهندسون والفيزيائيون هذه المعضلة؟ بدحرجة جسم ثقيل: **زخم بولياك** (Polyak Momentum). تخيل أنك أطلقت كرة بولينغ فولاذية ثقيلة داخل الأخدود. أثناء تدحرج الكرة، تلغي الارتطامات الجانبية بعضها بعضاً، بينما يتراكم القصور الذاتي والسرعة الحركية على طول مسار القاع الهادئ. يمنح الزخم خوارزميات التحسين عزم قصور ذاتي فيزيائي يخمد التعرجات المزعجة ويسرع الوصول إلى قاع الوادي."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\mathbf{x}_{t+1} = \\mathbf{x}_t - \\eta \\nabla f(\\mathbf{x}_t) \\quad (\\text{Standard Gradient Descent})",
        "formulaNote": {
          "en": "Mathematical anchor for Gradient Descent, Learning Rates & Landscape Navigation.",
          "ar": "المرساة الرياضية لـ الانحدار التدريجي، معدلات التعلم، والملاحة في التضاريس."
        },
        "narrative": {
          "en": "$$\n\\mathbf{v}_{t+1} = \\beta \\mathbf{v}_t + \\eta \\nabla f(\\mathbf{x}_t), \\quad \\mathbf{x}_{t+1} = \\mathbf{x}_t - \\mathbf{v}_{t+1} \\quad (\\text{Polyak Heavy-Ball Momentum})\n$$\n$$\nf(\\mathbf{x}_{t+1}) \\le f(\\mathbf{x}_t) - \\eta \\left(1 - \\frac{L\\eta}{2}\\right) \\|\\nabla f(\\mathbf{x}_t)\\|_2^2 \\quad (\\text{Descent Lemma for } L\\text{-smooth } f)\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}_t$ | $\\mathbb{R}^D$ | Current parameter coordinates at step $t$ | Vector of model weights being optimized |\n| $\\nabla f(\\mathbf{x}_t)$ | $\\mathbb{R}^D$ | Instantaneous direction of steepest ascent | Steers step in the downhill direction via the minus sign |\n| $\\eta$ (Eta) | $\\mathbb{R}_{> 0}$ | Learning rate / step length multiplier | Hyperparameter scaling how far the model steps along the gradient |\n| $\\mathbf{v}_t$ | $\\mathbb{R}^D$ | Accumulated velocity buffer vector | Encodes historical momentum and kinetic memory across iterations |\n| $\\beta \\in [0, 1)$ | Scalar | Momentum friction damping coefficient | Controls the exponential retention rate of past velocity |\n| $L$ | $\\mathbb{R}_{> 0}$ | Lipschitz smoothness constant ($\\|\\nabla f(\\mathbf{x}) - \\nabla f(\\mathbf{y})\\| \\le L\\|\\mathbf{x} - \\mathbf{y}\\|$) | Imposes strict mathematical upper limit on step size: $\\eta < \\frac{2}{L}$ |\n\n#### Intuitive Rationale for the Descent Lemma\nWhy does the Descent Lemma guarantee progress only when $\\eta < 2/L$?\nLook at the contraction factor in the lemma: $\\eta \\left(1 - \\frac{L\\eta}{2}\\right)$.\n- When $\\eta$ is chosen small enough such that $\\frac{L\\eta}{2} < 1$ (i.e., $\\eta < 2/L$), the term $\\left(1 - \\frac{L\\eta}{2}\\right)$ is strictly positive! This mathematically guarantees that $f(\\mathbf{x}_{t+1}) < f(\\mathbf{x}_t)$ whenever the gradient is non-zero: **the loss is guaranteed to decrease on every single step**.\n- The optimal step size maximizing decrease is $\\eta^* = 1/L$.\n- If you push $\\eta > 2/L$, the term becomes negative, meaning the update oversteps the valley and the loss explodes!",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $\\mathbf{x}_t$ | $\\mathbb{R}^D$ | إحداثيات المعاملات الحالية عند الخطوة الزمنية $t$ | متجه أوزان النموذج الخاضع لعملية الاستمثال |\n| $\\nabla f(\\mathbf{x}_t)$ | $\\mathbb{R}^D$ | اتجاه الصعود الأقصى الأكثر حدة اللحظي | يوجه خطوة النزول نحو القاع عبر الإشارة السالبة |\n| $\\eta$ (إيتا) | $\\mathbb{R}_{> 0}$ | معدل التعلم / مضاعف طول الخطوة | معامل فائق يتحكم في مقدار المسافة المقطوعة في كل خطوة |\n| $\\mathbf{v}_t$ | $\\mathbb{R}^D$ | متجه مخزن السرعة والقصور التراكمي | يمثل الذاكرة الحركية للاتجاه وسرعة التدحرج عبر الخطوات |\n| $\\beta \\in [0, 1)$ | قيمة قياسية | معامل تخميد الاحتكاك للزخم | يحدد نسبة الاحتفاظ بالسرعة السابقة (عادة ما يقارب $0.9$) |\n| $L$ | $\\mathbb{R}_{> 0}$ | ثابت ليبشيتز لنعومة السطح والتدرج | يفرض حداً أقصى حرجاً وصارماً لمعدل التعلم: $\\eta < \\frac{2}{L}$ |\n\n#### التفسير المنطقي لمبرهنة الهبوط (Descent Lemma)\nلماذا تضمن مبرهنة الهبوط تناقص الخسارة فقط عندما يكون $\\eta < 2/L$؟\nتأمل معامل الانكماش في المبرهنة: $\\eta \\left(1 - \\frac{L\\eta}{2}\\right)$.\n- عندما نختار معدل تعلم صغيراً يحقق $\\frac{L\\eta}{2} < 1$ (أي $\\eta < 2/L$)، يصبح المقدار $\\left(1 - \\frac{L\\eta}{2}\\right)$ موجباً قطعياً! وهذا يضمن رياضياً أن $f(\\mathbf{x}_{t+1}) < f(\\mathbf{x}_t)$ طالما أن التدرج لا يساوي الصفر: **أي أن قيمة الخسارة مضمونة بالانخفاض في كل خطوة دون استثناء**.\n- ومعدل التعلم الأمثل الذي يحقق أقصى هبوط ممكن في الخطوة الواحدة هو $\\eta^* = 1/L$.\n- أما إذا تجاوزت العتبة الحرجة $\\eta > 2/L$، ينقلب المقدار ليصبح سالباً، مما يعني أن الخطوة قفزت فوق الوادي لتتضخم الخسارة وتتشتت الخوارزمية!\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-27",
          "starterCode": "def momentum_gradient_descent_step(\n    x: np.ndarray,\n    grad: np.ndarray,\n    v: np.ndarray,\n    lr: float,\n    beta: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single iteration update of classical Polyak heavy-ball momentum.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Current parameter vector of shape (D,).\n    grad : np.ndarray\n        Current loss gradient vector nabla f(x) of shape (D,).\n    v : np.ndarray\n        Velocity buffer vector of shape (D,).\n    lr : float\n        Learning rate alpha > 0.\n    beta : float\n        Momentum damping coefficient beta in [0, 1).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_next : Updated parameter vector, shape (D,).\n        v_next : Updated velocity buffer vector, shape (D,).\n    \"\"\"\n    # Step 1: Accumulate momentum velocity v_{t+1} = beta * v_t + lr * grad\n    # Step 2: Update coordinates opposite to velocity x_{t+1} = x_t - v_next\n    # TODO: Complete the vectorized implementation\n    pass",
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
              "starterCode": "def momentum_gradient_descent_step(\n    x: np.ndarray,\n    grad: np.ndarray,\n    v: np.ndarray,\n    lr: float,\n    beta: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single iteration update of classical Polyak heavy-ball momentum.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Current parameter vector of shape (D,).\n    grad : np.ndarray\n        Current loss gradient vector nabla f(x) of shape (D,).\n    v : np.ndarray\n        Velocity buffer vector of shape (D,).\n    lr : float\n        Learning rate alpha > 0.\n    beta : float\n        Momentum damping coefficient beta in [0, 1).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_next : Updated parameter vector, shape (D,).\n        v_next : Updated velocity buffer vector, shape (D,).\n    \"\"\"\n    # Step 1: Accumulate momentum velocity v_{t+1} = beta * v_t + lr * grad\n    # Step 2: Update coordinates opposite to velocity x_{t+1} = x_t - v_next\n    # TODO: Complete the vectorized implementation\n    pass",
              "expectedOutput": "[4.8, 4.6]"
            }
          },
          "solution": "import numpy as np\n\ndef momentum_gradient_descent_step(\n    x: np.ndarray,\n    grad: np.ndarray,\n    v: np.ndarray,\n    lr: float,\n    beta: float\n) -> tuple[np.ndarray, np.ndarray]:\n    \"\"\"\n    Execute a single iteration update of classical Polyak heavy-ball momentum.\n    \n    Parameters\n    ----------\n    x : np.ndarray\n        Current parameter vector of shape (D,).\n    grad : np.ndarray\n        Current loss gradient vector nabla f(x) of shape (D,).\n    v : np.ndarray\n        Velocity buffer vector of shape (D,).\n    lr : float\n        Learning rate alpha > 0.\n    beta : float\n        Momentum damping coefficient beta in [0, 1).\n        \n    Returns\n    -------\n    tuple[np.ndarray, np.ndarray]\n        x_next : Updated parameter vector, shape (D,).\n        v_next : Updated velocity buffer vector, shape (D,).\n    \"\"\"\n    # Step 1: Accumulate momentum velocity v_{t+1} = beta * v_t + lr * grad\n    v_next = beta * v + lr * grad\n    \n    # Step 2: Update coordinates opposite to velocity x_{t+1} = x_t - v_next\n    x_next = x - v_next\n    \n    return x_next, v_next"
        },
        "hints": {
          "tier1": {
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "عند تحسين أخدود تربيعي سيئ التكيف بالمعادلة $f(x, y) = 100x^2 + y^2$، تتذبذب خوارزمية الانحدار التدريجي العادية بعنف ذهاباً وإياباً عبر جدران المحور $x$ الحادة، بينما تزحف ببطء شديد ومؤلم على طول المحور المنبسط $y$. كيف يحل إدخال زخم بولياك ($\\beta \\approx 0.9$) هذا الفشل التكيفي؟"
          },
          "options": [
            {
              "text": {
                "en": "It averages velocity vectors over time, causing alternating positive and negative oscillations across the steep walls to cancel out while persistently compounding forward velocity along the shallow valley floor.",
                "ar": "يقوم بحساب متوسط متجهات السرعة عبر الزمن، مما يجعل التذبذبات المتناوبة ذات الإشارات المتعاكسة (+ و -) عبر الجدران الحادة تلغي بعضها بعضاً، بينما تتراكم وتتضاعف السرعة المتجهة للأمام بثبات على طول قاع الوادي المنبسط.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "Across the steep $x$-walls, the gradient alternates signs: $+g_x, -g_x, +g_x, \\dots$, causing the moving average $\\sum \\beta^k g_x$ to cancel toward near zero. Along the shallow $y$-direction, the gradient consistently has the same sign, so momentum accumulates to an effective step size $\\frac{\\eta}{1 - \\beta} \\approx 10\\eta$, accelerating descent along the valley.",
                "ar": "على جدران المحور $x$ الحادة، تتعاقب إشارات التدرج: موجب، سالب، موجب... مما يجعل المتوسط التراكمي يلغي بعضه ليقترب من الصفر. بينما على طول محور القاع $y$ الهادئ، يحافظ التدرج على نفس الإشارة، فيتراكم الزخم ليعطي خطوة فعالة مضاعفة $\\frac{\\eta}{1 - \\beta} \\approx 10\\eta$، مما يسرع التقدم في الوادي بمقدار عشرة أضعاف."
              }
            },
            {
              "text": {
                "en": "It rotates the coordinate frame so that $x$ and $y$ are uncoupled.",
                "ar": "يقوم بتدوير المحاور الإحداثية بحيث ينفصل المتغير $x$ عن المتغير $y$.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Momentum operates entirely in the existing coordinate system through velocity buffers; it does not perform eigen-decomposition or coordinate rotation.",
                "ar": "يعمل الزخم بالكامل داخل نظام الإحداثيات الأصلي عبر مخازن السرعة، ولا يجري أي تحليل للقيم الذاتية أو تدوير للمحاور."
              }
            },
            {
              "text": {
                "en": "It sets the learning rate to zero whenever rapid oscillations are detected.",
                "ar": "يقوم بتصفير معدل التعلم وجعله صفراً كلما استشعر وجود تذبذبات سريعة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Setting the learning rate to zero would freeze optimization entirely, permanently halting progress.",
                "ar": "تصفير معدل التعلم سيؤدي إلى شل حركة الخوارزمية وتجميدها في مكانها دون أي تقدم."
              }
            },
            {
              "text": {
                "en": "It computes the exact inverse of the Hessian matrix at every step.",
                "ar": "يقوم بحساب المقلوب الدقيق لمصفوفة هيسي في كل خطوة تدريب.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Computing the exact Hessian inverse is the mechanism of Newton's method ($\\mathcal{O}(D^3)$), whereas Polyak momentum achieves acceleration with simple $\\mathcal{O}(D)$ first-order velocity updates.",
                "ar": "حساب مقلوب مصفوفة هيسي هو اختصاص طريقة نيوتن المكلفة حاسوبياً ($\\mathcal{O}(D^3)$)، بينما يحقق زخم بولياك هذا التسريع بتكلفة خطية زهيدة $\\mathcal{O}(D)$ بالاعتماد على المشتقات الأولى فقط."
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
    "id": "t1-28",
    "title": "Constrained Optimization & Lagrange Multipliers",
    "titleAr": "التحسين المقيد ومضروبات لاغرانج",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine you are hiking through a protected national park and wish to reach the highest possible elevation on a mountain landscape $f(x, y)$.",
      "ar": "لنفترض أنك تتجول في محمية طبيعية محمية وترغب في الوصول إلى أعلى منسوب ممكن على تضاريس جبل شاهق $f(x, y)$."
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
          "en": "Imagine you are hiking through a protected national park and wish to reach the highest possible elevation on a mountain landscape $f(x, y)$. However, strict conservation rules enforced by park rangers forbid you from ever stepping off a single, paved asphalt trail described by the constraint equation $g(x, y) = c$. You cannot simply sprint to the true mountain summit, because the trail never crosses the summit. Where along the asphalt trail is your elevation maximized?\n\nImagine walking along the trail and watching your altimeter. As long as your trail cuts across elevation contour lines at an angle, you are actively gaining or losing height with every step you take. If you cross a line, you are still climbing! The *only* point on the trail where your elevation stops changing is the exact point where **the trail runs perfectly parallel to a contour line**.\n\nAt that magical point of tangency, the trail does not cross the contour line; it gently grazes it before turning away. Because the normal direction perpendicular to the trail is the constraint gradient $\\nabla g$, and the normal direction perpendicular to the contour line is the objective gradient $\\nabla f$, these two gradient vectors must be **perfectly parallel and collinear**:\n$$\n\\nabla f = \\lambda \\nabla g\n$$\nThe proportionality constant $\\lambda$ is the famous **Lagrange Multiplier**. It is one of the most profound ideas in applied mathematics: it converts a difficult constrained optimization problem into an unconstrained saddle-point problem by balancing the objective force against the constraint barrier.\n\nIn economics and machine learning, $\\lambda$ has a beautiful physical meaning: it is the **shadow price** or marginal tension of the constraint. It answers a vital practical question: *\"If the park rangers allowed you to widen the trail by just one meter ($c \\to c + 1$), by exactly how many vertical meters would your maximum achievable elevation increase?\"* In Support Vector Machines (SVMs), the Lagrange multipliers identify the critical \"Support Vectors\"—the select training data points that directly push against and define the decision boundary.\n\n---",
          "ar": "لنفترض أنك تتجول في محمية طبيعية محمية وترغب في الوصول إلى أعلى منسوب ممكن على تضاريس جبل شاهق $f(x, y)$. ومع ذلك، فإن القوانين الصارمة لحراس المحمية تمنعك منعاً باتاً من مغادرة مسار سياحي مرصوف بالأسفلت ومحدد بمعادلة القيد $g(x, y) = c$. لا يمكنك التوجه ببساطة نحو قمة الجبل الحقيقية، لأن المسار المرصوف لا يمر بها على الإطلاق. أين بالضبط على طول هذا المسار المقيد ستحقق أعلى ارتفاع ممكن؟\n\nتأمل مسار حركتك على الطريق المرصوف وراقب مقياس الارتفاع بيدك. طالما أن المسار يقطع خطوط كنتور الارتفاع بزاوية مائلة، فإنك تواصل الصعود أو الهبوط مع كل خطوة تخطوها للأمام. إذا كنت تشطر خط الكنتور، فأنت ما زلت تكتسب ارتفاعاً! النقطة *الوحيدة* على طول المسار التي يتوقف عندها ارتفاعك عن التغير تماماً هي النقطة التي **يسير فيها المسار موازياً ومماسياً لخط الكنتور تماماً**.\n\nعند نقطة التماس الفريدة هذه، لا يشطر المسار خط الكنتور بل يلامسه بخفة ونعومة ثم يبتعد عنه. ونظراً لأن المتجه العمودي على المسار هو تدرج القيد $\\nabla g$، والمتجه العمودي على خط الكنتور هو تدرج دالة الهدف $\\nabla f$، فإن هذين المتجهين يجب أن يكونا **متوازيين تماماً وعلى نفس خط العمل الهندسي**:\n$$\n\\nabla f = \\lambda \\nabla g\n$$\nيُدعى معامل التناسب $\\lambda$ بـ **مضروب لاغرانج** (The Lagrange Multiplier). إنه أحد أكثر المفاهيم رسوخاً وأناقة في الرياضيات التطبيقية: فهو يحول مسألة الاستمثال المقيدة المعقدة إلى مسألة بحث عن نقطة سرجية غير مقيدة عبر موازنة قوة دالة الهدف ضد جدار القيد الصلب.\n\nوفي الاقتصاد وتعلم الآلة المعاصر، يمتلك المعامل $\\lambda$ تفسيراً فيزيائياً وعملياً رائعاً: إنه **السعر الخفي** (Shadow Price) أو الحساسية الهامشية لشدة القيد. فهو يجيب عن سؤال استراتيجي حاسم: *\"لو سمح لك حراس المحمية بإزاحة المسار بمقدار متر واحد إضافي ($c \\to c + 1$)، فكم متراً رأسياً إضافياً ستكسبه في أقصى ارتفاع متاح لك؟\"* وفي آلات المتجهات الداعمة (SVMs)، تحدد مضروبات لاغرانج متجهات الدعم الحرجة—تلك النقاط التدريبية القليلة التي تستند مباشرة على حدود الهامش وتحدد موقع الفصل بين الفئات."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\min_{\\mathbf{x} \\in \\mathbb{R}^N} f(\\mathbf{x}) \\quad \\text{subject to} \\quad g_j(\\mathbf{x}) = 0, \\; j = 1, \\dots, M",
        "formulaNote": {
          "en": "Mathematical anchor for Constrained Optimization & Lagrange Multipliers.",
          "ar": "المرساة الرياضية لـ التحسين المقيد ومضروبات لاغرانج."
        },
        "narrative": {
          "en": "$$\n\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda}) \\coloneqq f(\\mathbf{x}) + \\sum_{j=1}^M \\lambda_j g_j(\\mathbf{x}) = f(\\mathbf{x}) + \\boldsymbol{\\lambda}^T \\mathbf{g}(\\mathbf{x})\n$$\n$$\n\\begin{bmatrix} \\mathbf{Q} & \\mathbf{A}^T \\\\ \\mathbf{A} & \\mathbf{0} \\end{bmatrix} \\begin{bmatrix} \\mathbf{x}^* \\\\ \\boldsymbol{\\lambda}^* \\end{bmatrix} = \\begin{bmatrix} -\\mathbf{c} \\\\ \\mathbf{b} \\end{bmatrix} \\quad (\\text{Karush-Kuhn-Tucker Block System})\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $f(\\mathbf{x})$ | $\\mathbb{R}^N \\to \\mathbb{R}$ | Unconstrained scalar objective landscape | The target function we desire to minimize or maximize |\n| $g_j(\\mathbf{x}) = 0$ | Manifold of dim $N-1$ | Constraint hypersurface boundary | The rigid fence restricting where solutions are legally permitted to exist |\n| $\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda})$ | $\\mathbb{R}^{N+M} \\to \\mathbb{R}$ | Lagrangian auxiliary energy function | Unifies objective and constraints into a single saddle-point surface |\n| $\\lambda_j$ | $\\mathbb{R}$ | Proportionality scale factor between gradients | Lagrange multiplier measuring marginal constraint shadow price |\n| $\\mathbf{x}^*$ | $\\mathbb{R}^N$ | Optimal primal decision coordinates | The best feasible point satisfying all constraints |\n| $\\boldsymbol{\\lambda}^*$ | $\\mathbb{R}^M$ | Optimal dual coordinates | The forces required from the constraint barriers to hold $\\mathbf{x}^*$ in place |\n\n#### Intuitive Rationale for the Saddle-Point Formulation\nSetting the derivatives of $\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda})$ to zero produces the famous Karush-Kuhn-Tucker (KKT) conditions:\n1. $\\nabla_{\\mathbf{x}} \\mathcal{L} = \\nabla f(\\mathbf{x}) + \\mathbf{A}^T \\boldsymbol{\\lambda} = \\mathbf{0}$ enforces gradient balance between objective and constraints.\n2. $\\nabla_{\\boldsymbol{\\lambda}} \\mathcal{L} = \\mathbf{A}\\mathbf{x} - \\mathbf{b} = \\mathbf{0}$ recovers the exact constraint equation!\nNotice that the optimal pair $(\\mathbf{x}^*, \\boldsymbol{\\lambda}^*)$ is **not a local minimum of $\\mathcal{L}$**, but a **saddle point**! It minimizes $\\mathcal{L}$ with respect to the primal decisions $\\mathbf{x}$, while maximizing $\\mathcal{L}$ with respect to the dual penalties $\\boldsymbol{\\lambda}$.",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $f(\\mathbf{x})$ | $\\mathbb{R}^N \\to \\mathbb{R}$ | سطح دالة الهدف القياسية غير المقيدة | الدالة الأصلية المراد تصغيرها (كالخسارة) أو تعظيمها |\n| $g_j(\\mathbf{x}) = 0$ | متعدد شعب ذو بعد $N-1$ | السطح الفوقي الحاكم لقيود المسألة | السياج الصلب الذي يحدد فضاء الحلول المقبولة والمسموح بها |\n| $\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda})$ | $\\mathbb{R}^{N+M} \\to \\mathbb{R}$ | دالة لاغرانج المساعدة الموحدة | توحد دالة الهدف مع القيود في سطح نقطة سرجية متكامل |\n| $\\lambda_j$ | $\\mathbb{R}$ | معامل تناسب ومحاذاة التدرجات المتجهة | مضروب لاغرانج المعبر عن السعر الخفي والشد الهامشي للقيد |\n| $\\mathbf{x}^*$ | $\\mathbb{R}^N$ | متجه المتغيرات والقرارات الأصلية الأمثل | الحل الأفضل الذي يحقق أقصى كفاءة ويلتزم بكافة القيود |\n| $\\boldsymbol{\\lambda}^*$ | $\\mathbb{R}^M$ | متجه المتغيرات الثنائية الأمثل (المضروبات) | القوى المعاكسة التي تفرضها القيود لتثبيت النقطة $\\mathbf{x}^*$ في مكانها |\n\n#### التفسير المنطقي لصياغة النقطة السرجية\nتؤدي مساواة مشتقات دالة لاغرانج بالصفر إلى شروط كاروش-كون-تاكر (KKT) الشهيرة:\n1. $\\nabla_{\\mathbf{x}} \\mathcal{L} = \\nabla f(\\mathbf{x}) + \\mathbf{A}^T \\boldsymbol{\\lambda} = \\mathbf{0}$ تفرض توازن القوى بين دالة الهدف وموانع القيود.\n2. $\\nabla_{\\boldsymbol{\\lambda}} \\mathcal{L} = \\mathbf{A}\\mathbf{x} - \\mathbf{b} = \\mathbf{0}$ تعيد اشتقاق معادلة القيد الأصلية ذاتها!\nلاحظ أن الحل الأمثل $(\\mathbf{x}^*, \\boldsymbol{\\lambda}^*)$ **ليس نهاية صغرى عادية لدالة لاغرانج**، بل هو **نقطة سرجية**! يتم تصغيرها بالنسبة لقرارات المتغيرات الأصلية $\\mathbf{x}$، بينما يتم تعظيمها بالنسبة لعقوبات المتغيرات الثنائية ومضروبات لاغرانج $\\boldsymbol{\\lambda}$.\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-28",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "ar": "في آلات المتجهات الداعمة (SVMs)، تقوم مسألة تعظيم الهامش بتصغير المقدار $\\frac{1}{2}\\|\\mathbf{w}\\|^2$ خضوعاً لقيود هامش التصنيف $y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1$. عند الحل الأمثل، تمتلك معظم نقاط البيانات مضروبات لاغرانج صفرية $\\alpha_i = 0$، بينما تمتلك قلة مختارة مضروبات موجبة $\\alpha_i > 0$. ما التفسير الهندسي لنقاط البيانات ذات المضروبات الموجبة $\\alpha_i > 0$؟"
          },
          "options": [
            {
              "text": {
                "en": "They are the critical \"Support Vectors\" lying directly on the margin boundary ($y_i(\\mathbf{w}^T \\mathbf{x}_i + b) = 1$); moving them would alter the optimal boundary, whereas points with $\\alpha_i = 0$ lie safely beyond the margin and exert zero force.",
                "ar": "هي \"متجهات الدعم\" (Support Vectors) الحرجة الواقعة مباشرة على جدار الهامش الفاصل ($y_i(\\mathbf{w}^T \\mathbf{x}_i + b) = 1$)؛ وإزاحتها أو تعديلها يغير الحد الفاصل الأمثل، بينما تقع النقاط ذات $\\alpha_i = 0$ بأمان داخل مناطقها وتؤثر بقوة صفرية على الهامش.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "By the KKT complementary slackness condition, $\\alpha_i [y_i(\\mathbf{w}^T \\mathbf{x}_i + b) - 1] = 0$. If $\\alpha_i > 0$, the constraint must be strictly tight and active ($y_i(\\mathbf{w}^T \\mathbf{x}_i + b) = 1$). These points hold up the separating hyperplane like structural pillars; all other points with $\\alpha_i = 0$ can be deleted without changing the model.",
                "ar": "وفقاً لشرط الارتخاء التكاملي في مبرهنة KKT، يكون $\\alpha_i [y_i(\\mathbf{w}^T \\mathbf{x}_i + b) - 1] = 0$. فإذا كان $\\alpha_i > 0$، فإن القيد يكون نشطاً ومشدوداً تماماً على الحافة. تسند هذه النقاط المستوي الفاصل كالأعمدة الإنشائية، بينما يمكن حذف أي نقطة تمتلك $\\alpha_i = 0$ دون أن يتغير النموذج على الإطلاق."
              }
            },
            {
              "text": {
                "en": "They are statistical outliers that should be purged from the training corpus.",
                "ar": "هي قيم شاذة إحصائياً وتالفة يجب تنظيفها وحذفها من مجموعة البيانات التدريبية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Support vectors are the most informative and decisive training examples in the dataset, not noise or outliers.",
                "ar": "متجهات الدعم هي أكثر العينات التدريبية أهمية وفائدة وحسماً في البيانات بأسرها، وليست شوائب أو قيماً شاذة."
              }
            },
            {
              "text": {
                "en": "They are misclassified training points where the margin constraint failed completely.",
                "ar": "هي نقاط تدريبية صُنفت بالخطأ وفشل معها قيد الهامش بصورة كلية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "In a hard-margin SVM, all constraints are satisfied ($y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1$); points with $\\alpha_i > 0$ are correctly classified and lie on the margin.",
                "ar": "في نموذج SVM ذي الهامش الصلب، تكون جميع القيود محققة بدقة؛ والنقاط ذات $\\alpha_i > 0$ مصنفة بشكل صحيح وتقع على الهامش بالتمام."
              }
            },
            {
              "text": {
                "en": "They represent data samples where the loss surface exhibits a local maximum.",
                "ar": "تمثل عينات بيانات يكون عندها سطح دالة الخسارة واقعاً في نهاية عظمى محلية.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The SVM objective is strictly convex; the entire problem is a quadratic program with no non-global local extrema.",
                "ar": "دالة هدف SVM محدبة قطعياً؛ والمسألة برمتها برنامج تربيعي خالٍ تماماً من أي نهايات عظمى محلية."
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
    "id": "t1-29",
    "title": "The Central Limit Theorem & Geometric Convergence of Noise",
    "titleAr": "مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء",
    "trackId": "math",
    "estimatedMinutes": 15,
    "description": {
      "en": "Imagine standing in front of a wooden board tilted at a gentle slope, studded with hundreds of rows of interleaved brass pins—a physical...",
      "ar": "تخيل نفسك واقفاً أمام لوحة خشبية مائلة بزاوية طفيفة، مثبتة عليها مئات الصفوف المتتالية من المسامير النحاسية المتداخلة—وهي الآلة الشهيرة..."
    },
    "prerequisites": [
      "constrained-optimization-lagrange",
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
          "en": "Imagine standing in front of a wooden board tilted at a gentle slope, studded with hundreds of rows of interleaved brass pins—a physical Galton board (also known as a Plinko board). If you drop a single steel ball bearing from a narrow funnel at the top, it strikes the first pin, bounces unpredictably either left ($-1$) or right ($+1$) with equal $50\\%$ chance, and continues tumbling downward through dozens of chaotic pin collisions. A single ball's trajectory is jagged, discrete, and completely erratic; where it lands in the collection bins below feels like pure chance. But now, open the floodgates and release ten thousand steel balls in rapid succession! As they cascade down through the pin maze, their individual random bounces add together. When the balls settle into the vertical glass slots at the bottom, an astonishing shape emerges: a **silky-smooth, perfectly symmetrical Gaussian bell curve**!\n\nIn plain terminology first: **The Central Limit Theorem (CLT) is just a cosmic washing machine for random noise: no matter how messy, skewed, or weird the original randomness was, adding up enough independent noise sources always washes away the quirks and leaves behind the exact same bell curve.** Take a fair coin: flipping it gives you a discrete heads or tails. Roll a six-sided die: you get a flat, uniform distribution with sharp blocky corners where every number from 1 to 6 has equal $1/6$ chance. Measure the lifespan of an unstable radioactive atom: you get a heavily skewed exponential distribution with a long, asymmetric tail. None of these primitive distributions look remotely like a bell curve. Yet if you take the average of 100 coin flips, 100 dice rolls, or 100 radioactive decay intervals, and repeat that experiment thousands of times, the histogram of those recorded averages will invariably collapse into the exact same bell-shaped normal distribution.\n\nWhy does this cosmic convergence occur? Think of it through the lens of high-dimensional geometry. Drawing $N$ independent random observations is mathematically equivalent to picking a single random point inside an $N$-dimensional hypercube. When $N$ is large, the geometry of high-dimensional space causes a phenomenon known as *concentration of measure*: almost all the volume of an $N$-dimensional space is concentrated in a thin spherical shell around the center of mass. Extreme outcomes (such as rolling 100 sixes in a row) reside in the infinitely distant, vanishingly small corners of the hypercube and practically never happen. Instead, the independent positive and negative fluctuations vigorously cancel each other out. When you project the coordinates of this high-dimensional spherical shell onto the 1D diagonal axis representing the sample mean, its geometric shadow is proven to be a Gaussian normal distribution.\n\nIn machine learning, data science, and econometrics, the Central Limit Theorem is the foundational bedrock that makes empirical inference possible. When an algorithm estimates model parameters or computes a confidence interval, you do not need to know the true, hidden probability distribution of the real-world data generating process. The CLT guarantees that sample mean estimators and test statistics (such as Z-scores and t-statistics) asymptotically follow a standard normal distribution. From analyzing mini-batch gradient noise in stochastic gradient descent (SGD) to aggregating sensor noise in self-driving cars, the Central Limit Theorem transforms microscopic chaos into predictable macroscopic order.\n\n---",
          "ar": "تخيل نفسك واقفاً أمام لوحة خشبية مائلة بزاوية طفيفة، مثبتة عليها مئات الصفوف المتتالية من المسامير النحاسية المتداخلة—وهي الآلة الشهيرة المعروفة بـ \"لوحة غالتون\" (Galton Board). إذا أسقطت كرة فولاذية صغيرة من قمع ضيق في الأعلى، فإنها ترتطم بأول مسمار، لترتد بعشوائية تامة إما نحو اليمين ($+1$) أو نحو اليسار ($-1$) باحتمال متساوٍ قدره $50\\%$، وتواصل تدحرجها عبر عشرات الاصطدامات الفوضوية المتتالية. مسار الكرة الواحدة متقطع، وخشن، وغير متوقع على الإطلاق؛ ومكان استقرارها في قاع اللوحة يبدو ضرباً من المصادفة المحضة. لكن الآن، افتح صمام القمع بالكامل وأطلق عشرة آلاف كرة فولاذية دفعة واحدة! مع تدفق هذا السيل الهائل وتراكم مئات الارتدادات العشوائية المستقلة لكل كرة، تسقط الكرات في الأعمدة الزجاجية الرأسية في الأسفل. ماذا يتشكل أمام عينيك؟ معجزة هندسية باهرة: يتراكم ركام الكرات ليشكل **منحنى غاوسياً أملس، متناظراً تماماً، على هيئة جرس رائع الجمال**!\n\nبالمصطلحات البسيطة المباشرة أولاً: **مبرهنة النهاية المركزية ليست سوى غسالة كونية شاملة للضوضاء العشوائية: مهما كانت العشوائية الأصلية مشوهة أو ملتوية أو غريبة الأطوار، فإن جمع مصادر كافية من الضوضاء المستقلة يغسل كل تلك التشوهات والعيوب، تاركاً وراءه دائماً نفس المنحنى الجرسي الأنيق**. إذا رميت قطعة نقدية عادلة، ستحصل على صورة أو كتابة (توزيع ثنائي متقطع). وإذا ألقيت نرد طاولة ذا ستة أوجه، ستحصل على توزيع منتظم منبسط ذي زوايا حادة متقطعة حيث يمتلك كل رقم احتمالاً متساوياً قدره $1/6$. وإذا قست زمن اضمحلال ذرة مشعة غير مستقرة، ستحصل على توزيع أسي ملتوٍ بحدة وله ذيل طويل غير متناظر. لا شيء في هذه التوزيعات الأولية يشبه الجرس من قريب أو بعيد. ومع ذلك، إذا حسبت متوسط 100 رمية نقد، أو متوسط 100 رمية نرد، أو متوسط 100 زمن اضمحلال، وكررت هذه التجربة آلاف المرات، فإن المدرج التكراري لتلك المتوسطات سيندمج حتماً في نفس المنحنى الجرسي المتناظر للتوزيع الطبيعي.\n\nلماذا تحدث هذه المعجزة الكونية الحتمية؟ تأمل الأمر من منظور الهندسة فائقة الأبعاد. إن سحب $N$ من المشاهدات العشوائية المستقلة يعادل رياضياً اختيار نقطة عشوائية واحدة داخل مكعب فائق الأبعاد ذي $N$ بعداً. وعندما يكون $N$ كبيراً، تؤدي هندسة الفضاءات عالية الأبعاد إلى ظاهرة تُعرف بـ *تركيز القياس* (Concentration of Measure): حيث تتركز كل كتلة وحجم الفضاء تقريباً داخل قشرة كروية رقيقة للغاية حول مركز الكتلة. أما النتائج المتطرفة (مثل الحصول على الرقم 6 مئة مرة متتالية) فتقبع في الزوايا البعيدة الضئيلة جداً من المكعب الفائق وتكاد تستحيل واقعياً. بل على العكس، فإن الانحرافات الإيجابية والسلبية الفردية تلغي بعضها بعضاً بضراوة. وعندما تُسقط إحداثيات هذه القشرة الكروية عالية الأبعاد على القطر الرئيسي الذي يمثل متوسط العينة، فإن ظلها الهندسي أحادي البعد هو التوزيع الغاوسي الطبيعي بدقة متناهية.\n\nوفي علم البيانات، وتعلم الآلة، والاقتصاد القياسي، تمثل مبرهنة النهاية المركزية حجر الأساس الذي لا غنى عنه لكل استدلال إحصائي رصين. فعندما تُقدّر خوارزمية معاملات نموذج تنبؤي أو تحسب فترات الثقة لمعلمة ما، فلست بحاجة على الإطلاق إلى معرفة التوزيع الاحتمالي التفصيلي المجهول للبيانات في الطبيعة؛ لأن مبرهنة النهاية المركزية تضمن لك أن مقدرات متوسط العينة وإحصاءات الاختبار (مثل درجات Z و t) تتقارب بالضرورة مع التوزيع الطبيعي المعياري. ومن نمذجة ضوضاء الحساسات في سيارات القيادة الذاتية إلى تحليل تذبذبات التدرج في خوارزمية الانحدار التدريجي العشوائي (SGD)، تحول مبرهنة النهاية المركزية الفوضى المجهرية إلى نظام هندسي بديع يمكن التنبؤ به بدقة."
        }
      },
      {
        "number": 2,
        "type": "formal",
        "formula": "\\bar{X}_N \\coloneqq \\frac{1}{N} \\sum_{i=1}^N X_i, \\quad X_i \\overset{\\text{i.i.d.}}{\\sim} \\mathcal{D}(\\mu, \\sigma^2 < \\infty)",
        "formulaNote": {
          "en": "Mathematical anchor for The Central Limit Theorem & Geometric Convergence of Noise.",
          "ar": "المرساة الرياضية لـ مبرهنة النهاية المركزية والتقارب الهندسي للضوضاء."
        },
        "narrative": {
          "en": "$$\nZ_N \\coloneqq \\frac{\\bar{X}_N - \\mu}{\\sigma / \\sqrt{N}} = \\frac{\\sum_{i=1}^N X_i - N\\mu}{\\sigma \\sqrt{N}} \\xrightarrow{d} \\mathcal{N}(0, 1) \\quad \\text{as } N \\to \\infty\n$$\n$$\n\\lim_{N \\to \\infty} P(Z_N \\le z) = \\Phi(z) \\coloneqq \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^z e^{-\\frac{t^2}{2}} \\, dt\n$$\n\n### Demystifying the Equation\n\n| Symbol | Dimensional Type | Geometric Meaning | Operational Role |\n| :--- | :--- | :--- | :--- |\n| $X_i$ | Random Variable | Independent sample draw from arbitrary distribution $\\mathcal{D}$ | Elementary source of microscopic random variation |\n| $\\mu = \\mathbb{E}[X_i]$ | $\\mathbb{R}$ | Center of mass / true population mean | Translation centering anchor parameter |\n| $\\sigma = \\sqrt{\\operatorname{Var}(X_i)}$ | $\\mathbb{R}_{> 0}$ | Population standard deviation | Intrinsic scale parameter governing dispersion |\n| $\\bar{X}_N$ | Random Variable | Sample mean over $N$ observations | Estimator whose variance shrinks at rate $1/N$ |\n| $\\sigma / \\sqrt{N}$ | $\\mathbb{R}_{> 0}$ | Standard error of the mean | Scaling denominator preventing variance collapse |\n| $Z_N$ | Standardized Variable | Normalized Z-score with mean 0 and variance 1 | Universal canonical variable exhibiting asymptotic normality |\n| $\\xrightarrow{d}$ | Convergence in distribution | Cumulative probabilities converge pointwise | Weak convergence of push-forward probability measures |\n| $\\Phi(z)$ | $\\mathbb{R} \\to [0, 1]$ | Cumulative distribution function of standard normal | Universal limiting measure attractor |\n\n#### Intuitive Rationale for the Formulation\n1. **Why divide by $\\sqrt{N}$ instead of $N$?**\n   When adding $N$ independent random variables, their variances add directly: $\\operatorname{Var}(\\sum_{i=1}^N X_i) = N\\sigma^2$. The standard deviation of the raw sum is therefore $\\sqrt{N\\sigma^2} = \\sigma \\sqrt{N}$. When computing the sample mean $\\bar{X}_N = \\frac{1}{N}\\sum X_i$, the variance scales down by $(1/N)^2$, yielding $\\operatorname{Var}(\\bar{X}_N) = \\frac{\\sigma^2}{N}$, meaning its standard deviation shrinks as $\\frac{\\sigma}{\\sqrt{N}}$. To stabilize the spread so it neither collapses to a singular point spike nor explodes to infinity as $N \\to \\infty$, we must rescale the fluctuation by exactly $\\sigma / \\sqrt{N}$.\n2. **Why does individual skewness vanish?**\n   The third central moment (skewness) of the sum grows only linearly as $N$, but the denominator scaling factor $(\\sigma \\sqrt{N})^3$ grows much faster as $N^{3/2}$. Thus, the standardized skewness decays as $\\frac{N}{N^{3/2}} = \\frac{1}{\\sqrt{N}} \\to 0$. As $N$ expands, all asymmetry and idiosyncrasies of the original distribution are completely obliterated.\n3. **Crucial distinction: Raw Population Data vs. Sample Mean Estimator:**\n   The raw underlying population distribution $X$ does *not* transform into a bell curve as you collect more data. A die roll distribution will remain stubbornly flat even after a billion rolls. What converges to a normal distribution is the distribution of the **sample mean estimator** $\\bar{X}_N$ across repeated trials!",
          "ar": "| الرمز | النوع البُعدي | المعنى الهندسي | الدور العملياتي |\n| :--- | :--- | :--- | :--- |\n| $X_i$ | متغير عشوائي | سحب عشوائي مستقل من توزيع عام $\\mathcal{D}$ | المصدر الأولي للتغير العشوائي المجهري |\n| $\\mu = \\mathbb{E}[X_i]$ | $\\mathbb{R}$ | مركز الكتلة / المتوسط الحقيقي للمجتمع | معامل الإسناد لتوسيط التوزيع وإلغاء الإزاحة |\n| $\\sigma = \\sqrt{\\operatorname{Var}(X_i)}$ | $\\mathbb{R}_{> 0}$ | الانحراف المعياري الحقيقي للمجتمع | معامل القياس الجوهري الحاكم لمدى التشتت |\n| $\\bar{X}_N$ | متغير عشوائي | متوسط العينة عبر $N$ مشاهدة | مقدِّر إحصائي ينكمش تباينه بمعدل $1/N$ |\n| $\\sigma / \\sqrt{N}$ | $\\mathbb{R}_{> 0}$ | الخطأ المعياري لمتوسط العينة | مقام التطبيع الذي يمنع انهيار التباين إلى الصفر |\n| $Z_N$ | متغير معياري | درجة معيارية Z ذات متوسط 0 وتباين 1 | المتغير القانوني الموحد الذي يُظهر التقارب نحو التوزيع الطبيعي |\n| $\\xrightarrow{d}$ | التقارب في التوزيع | تقارب دوال الاحتمال التراكمية نقطياً | تقارب ضعيف للمقاييس الاحتمالية عند اللانهاية |\n| $\\Phi(z)$ | $\\mathbb{R} \\to [0, 1]$ | دالة التوزيع التراكمي للتوزيع الطبيعي المعياري | المقياس الاحتمالي الحتمي الجاذب لكافة التوزيعات |\n\n#### التفسير المنطقي لصياغة المعادلة\n1. **لماذا نقسم على $\\sqrt{N}$ بدلاً من $N$؟**\n   عند جمع $N$ من المتغيرات العشوائية المستقلة، تُجمع تبايناتها الرياضية مباشرة: $\\operatorname{Var}(\\sum X_i) = N\\sigma^2$. وبالتالي فإن الانحراف المعياري للمجموع الخام ينمو بمقدار $\\sqrt{N\\sigma^2} = \\sigma \\sqrt{N}$. وعند حساب متوسط العينة $\\bar{X}_N = \\frac{1}{N}\\sum X_i$، ينخفض التباين بمعامل $(1/N)^2$ ليصبح $\\operatorname{Var}(\\bar{X}_N) = \\frac{\\sigma^2}{N}$، مما يعني أن انحرافه المعياري يتقلص بمعدل $\\frac{\\sigma}{\\sqrt{N}}$. ولكي نوازن هذا التشتت بحيث لا ينهار التوزيع إلى خط رأسي حاد ولا ينفجر إلى اللانهاية مع نمو $N \\to \\infty$، يجب تطبيع الفارق بالقسمة على الخطأ المعياري $\\frac{\\sigma}{\\sqrt{N}}$ بالتحديد.\n2. **لماذا تتلاشى التشوهات والالتواءات الفردية؟**\n   العزم المركزي الثالث (معامل الالتواء Skewness) للمجموع ينمو خطياً بمعدل $N$، بينما ينمو مقام التدرج المعياري $(\\sigma \\sqrt{N})^3$ بسرعة أكبر بمعدل $N^{3/2}$. وبالتالي فإن الالتواء المعياري يتضاءل بنسبة $\\frac{N}{N^{3/2}} = \\frac{1}{\\sqrt{N}} \\to 0$. ومع زيادة حجم العينة، يُمحى أي عدم تناظر أو التواء في التوزيع الأصلي بالكامل.\n3. **تمييز جوهري: بيانات المجتمع الخام مقابل مقدِّر متوسط العينة:**\n   التوزيع الأصلي للبيانات في المجتمع $X$ لا يتحول إطلاقاً إلى منحنى جرسي مهما جمعت من مشاهدات؛ فتوزيع رميات النرد سيظل منبسطاً ومتقطعاً حتى بعد مليار رمية. ما يتقارب حتماً وبصرامة نحو التوزيع الطبيعي هو توزيع **مقدِّر متوسط العينة** $\\bar{X}_N$ عبر تكرار التجارب المستقلة!\n\n## Beat 3: Interactive Python Scratchpad"
        }
      },
      {
        "number": 3,
        "type": "code",
        "code": {
          "id": "py-t1-29",
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
            "en": "Analyze array dimensions and mathematical invariants.",
            "ar": "حلل أبعاد المصفوفات وتأكد من استيفاء الشروط الرياضية الثابتة."
          },
          "tier2": {
            "en": "Leverage vectorized operations instead of nested iteration.",
            "ar": "استخدم العمليات الموجهة الفعالة بدلاً من الحلقات التكرارية البطيئة."
          },
          "tier3": {
            "en": "Verify return types and edge cases against unit test specifications.",
            "ar": "تحقق من نوع القيمة المعادة والحالات الحدية وفق اختبارات الوحدة."
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
            "en": "A quantitative researcher collects 100,000 independent financial returns modeled by an asymmetric, heavily skewed exponential distribution with mean $\\mu = 0.05$ and variance $\\sigma^2 = 0.04$. A junior analyst argues: *\"Because the underlying daily returns are heavily skewed and asymmetric, the distribution of our portfolio's average daily return over a sample of 250 trading days will also be heavily skewed and non-Gaussian.\"* How does the Central Limit Theorem formally address this claim?",
            "ar": "يجمع باحث كمي 100,000 عائد مالي مستقل منسوخ من توزيع أسي غير متماثل وشديد الالتواء بمتوسط $\\mu = 0.05$ وتباين $\\sigma^2 = 0.04$. يجادل محلل مبتدئ قائلاً: *\"نظراً لأن العوائد اليومية الأساسية شديدة الالتواء وغير متماثلة، فإن توزيع متوسط العائد اليومي لمحفظتنا الاستثمارية عبر عينة من 250 يوم تداول سيكون أيضاً شديد الالتواء وبعيداً تماماً عن التوزيع الغاوسي.\"* كيف تدحض مبرهنة النهاية المركزية هذا الادعاء أو تؤكده رياضياً؟"
          },
          "options": [
            {
              "text": {
                "en": "The analyst is mistaken: because the underlying distribution possesses a finite variance $\\sigma^2 < \\infty$, the sample mean of $N = 250$ independent observations washes away the skewness at rate $\\mathcal{O}(1/\\sqrt{N})$ and converges to a symmetric Gaussian distribution $\\mathcal{N}(\\mu, \\sigma^2/250)$.",
                "ar": "المحلل مخطئ تماماً: فبما أن التوزيع الأساسي يمتلك تبايناً محدوداً $\\sigma^2 < \\infty$، فإن متوسط العينة المكونة من $N = 250$ مشاهدة مستقلة يغسل الالتواء بمعدل $\\mathcal{O}(1/\\sqrt{N})$ ويتقارب حتماً نحو توزيع طبيعي متناظر $\\mathcal{N}(\\mu, \\sigma^2/250)$.\n  >"
              },
              "correct": true,
              "explanation": {
                "en": "The CLT guarantees asymptotic normality for the sample mean of any i.i.d. variables with finite variance, regardless of the underlying shape. With $N = 250$, the Berry-Esseen theorem ensures that the skewness has decayed by a factor of $1/\\sqrt{250} \\approx 0.063$, rendering the distribution of the portfolio's average return virtually indistinguishable from a true Gaussian.",
                "ar": "تضمن مبرهنة النهاية المركزية التقارب الطبيعي المقارب لمتوسط العينة لأي متغيرات مستقلة ومتطابقة التوزيع ذات تباين محدود، بصرف النظر عن شكل التوزيع الأصلي. ومع حجم عينة $N = 250$، تضمن مبرهنة بيري-إيسين اضمحلال الالتواء بعامل $1/\\sqrt{250} \\approx 0.063$، مما يجعل توزيع متوسط عائد المحفظة متطابقاً عملياً مع المنحنى الغاوسي المتناظر."
              }
            },
            {
              "text": {
                "en": "The analyst is correct because the exponential distribution lacks the reflectional symmetry required for the Fourier transform of the characteristic function to converge.",
                "ar": "المحلل على حق لأن التوزيع الأسي يفتقر إلى التناظر الانعكاسي المطلوب لتقارب تحويل فورييه للدالة المميزة.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "Symmetry is not a prerequisite for the CLT. The characteristic function of any distribution with finite variance expands as $\\varphi(t) = 1 + it\\mu - \\frac{1}{2}t^2\\sigma^2 + o(t^2)$, which directly drives the normalized sum's characteristic function toward $e^{-t^2/2}$ regardless of symmetry.",
                "ar": "التناظر ليس شرطاً على الإطلاق لتطبيق مبرهنة النهاية المركزية؛ فالدالة المميزة لأي توزيع ذي تباين محدود تُظهر حدوداً من الدرجة الأولى والثانية تقود دالة المجموع المعياري نحو $e^{-t^2/2}$ حتماً بصرف النظر عن التماثل الأولي."
              }
            },
            {
              "text": {
                "en": "The CLT only applies if the sample size $N$ exceeds the total number of observations in the historical population ($N > 100,000$).",
                "ar": "لا تنطبق مبرهنة النهاية المركزية إلا إذا تجاوز حجم العينة $N$ إجمالي عدد المشاهدات في المجتمع التاريخي ($N > 100,000$).\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The CLT governs how the sample size $N$ of an individual average affects convergence, completely independent of the hypothetical size of the entire population. In practice, $N \\ge 30$ is often sufficient for noticeable Gaussian convergence.",
                "ar": "تحكم مبرهنة النهاية المركزية حجم عينة المتوسط المفرد $N$، ولا علاقة لها بحجم مجتمع المشاهدات التاريخية الإجمالي. وعملياً، غالباً ما يكفي $N \\ge 30$ لإظهار تقارب غاوسي واضح."
              }
            },
            {
              "text": {
                "en": "The sample mean will not converge to a Gaussian because financial returns always follow power-law Cauchy distributions with infinite variance.",
                "ar": "لن يتقارب متوسط العينة إلى التوزيع الغاوسي لأن العوائد المالية تتبع دائماً توزيعات كوشي ذات القوى والتباين اللانهائي.\n  >"
              },
              "correct": false,
              "explanation": {
                "en": "The scenario explicitly stipulated that the returns are generated by an exponential distribution with finite variance $\\sigma^2 = 0.04$, fully satisfying the hypotheses of the classical Lindeberg-Lévy CLT.",
                "ar": "نص السؤال حدد صراحة أن العوائد مولدة من توزيع أسي ذي تباين محدود ومحدد $\\sigma^2 = 0.04$، وهو ما يستوفي تماماً شروط مبرهنة ليندبرغ-ليفي المركزية الكلاسيكية."
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
