#!/usr/bin/env python3
"""
OKVIR Track 1 Pedagogy Enhancement Generator
Expands all 29 lessons in curriculum/track-1-math/*.okvir.md to be exceptionally clear,
intuitive, and welcoming for beginners while preserving mathematical and scientific precision.
"""

import os
import re

DATA = {
    "01": {
        "jargon": [
            ("Origin ($\\mathbf{0}$)", "The permanent home peg / starting flag in the sand", "نقطة الأصل ($\\mathbf{0}$)", "وتد البداية الثابت في الرمال الذي تنطلق منه جميع الحركات"),
            ("Cartesian Coordinates", "Step-by-step street directions (e.g. 4 km East, 3 km North)", "الإحداثيات الديكارتية", "أرقام العنوان الملاحي الدقيق على المحاور المتعامدة"),
            ("Displacement Vector", "A direct laser arrow pointing straight from start to destination", "متجه الإزاحة", "سهم انتقال مباشر يشير من نقطة البداية إلى الهدف"),
            ("Euclidean Metric ($L_2$)", "As-the-crow-flies straight ruler distance (the hypotenuse)", "المقياس الإقليدي ($L_2$)", "مسافة المسطرة المستقيمة وحبل القياس المشدود (طيران الصقر)"),
            ("Manhattan Metric ($L_1$)", "Walking strictly along rectangular city blocks and street corners", "مسافة مانهاتن ($L_1$)", "المسافة المحكومة بالانعطافات القائمة بين مباني المدينة"),
            ("Rotational Invariance", "Physical distance remains identical if you tilt your head or rotate your map", "الصمود الدوراني", "بقاء المسافة الحقيقية ثابتة مهما أملت بوصلتك أو غيرت زاوية رؤيتك")
        ],
        "ascii_en": """           Point Q (4, 3)
              ▲  *
              │ /│  Hypotenuse = 5 km (Euclidean direct flight)
     Rise = 3 │/ │
              │  │  Manhattan Walk = 4 + 3 = 7 km
    ──────────┼──┴────────► X
      Origin  │ Run = 4
      (0, 0)""",
        "ascii_ar": """           النقطة المستهدفة (4, 3)
              ▲  *
              │ /│  الوتر = 5 كم (المسار الإقليدي المباشر)
    الارتفاع = 3 │/ │
              │  │  مسار مانهاتن الشبكي = 4 + 3 = 7 كم
    ──────────┼──┴────────► X
    نقطة الأصل │ الامتداد = 4
     (0, 0)"""
    },
    "02": {
        "jargon": [
            ("Slope ($m$)", "The steepness ratio: vertical lift gained per 1 step forward", "الميل ($m$)", "مقياس شدة الانحدار: مقدار الارتفاع الرأسي المكتسب مقابل كل خطوة للأمام"),
            ("Rise ($\\Delta y$)", "Vertical altitude climb (positive) or drop (negative)", "الصعود الرأسي ($\\Delta y$)", "الفارق الرأسي: موجب عند الصعود وسالب عند الهبوط"),
            ("Run ($\\Delta x$)", "Horizontal distance traveled forward across the flat ground", "الامتداد الأفقي ($\\Delta x$)", "مسافة التقدم للأمام على الأرض المستوية"),
            ("Rate of Change", "Sensitivity gauge: how vigorously output responds when input is nudged", "معدل التغير", "مؤشر الحساسية: مدى استجابة النتيجة عند تحريك المدخلات"),
            ("Undefined Slope", "Hitting a sheer vertical rock wall (zero forward movement)", "الميل غير المعرّف", "الاصطدام بجدار صخري رأسي شاهق يستحيل التقدم فيه أفقياً"),
            ("Angle of Inclination ($\\theta$)", "Tilt angle of the path measured against the flat horizon", "زاوية الميلان ($\\theta$)", "زاوية ميل المسار المقاسة بالنسبة لخط الأفق المستوي")
        ],
        "ascii_en": """        Altitude
           ▲          * Point 2 (x2, y2)
           │         /│
           │        / │
           │       /  │ Rise: Δy = y2 - y1
           │      /   │
           │     *────┴───────────
           │   Point 1 (x1, y1)
           │     ◄── Run: Δx ──►
           └────────────────────────► Distance
                 Slope = Rise / Run = Δy / Δx = tan(θ)""",
        "ascii_ar": """        الارتفاع
           ▲          * النقطة الثانية (x2, y2)
           │         /│
           │        / │
           │       /  │ الصعود: Δy = y2 - y1
           │      /   │
           │     *────┴───────────
           │   النقطة الأولى (x1, y1)
           │     ◄── الامتداد: Δx ──►
           └────────────────────────► المسافة الأفقية
                 الميل = الصعود / الامتداد = Δy / Δx"""
    },
    "03": {
        "jargon": [
            ("Vector ($\\mathbf{v}$)", "An arrow possessing both a physical length (size) and a compass heading", "المتجه ($\\mathbf{v}$)", "سهم هندسي يمتلك طولاً حقيقياً (مقداراً) وتوجيهاً محدداً في الفضاء"),
            ("Scalar ($c$)", "A plain single number that acts like a volume knob to stretch or shrink an arrow", "الكمية القياسية ($c$)", "رقم عادي مفرد يعمل كزر التحكم بالتكبير أو التقليص لتمديد السهم"),
            ("Magnitude ($\\|\\mathbf{v}\\|$)", "The straight ruler length of the arrow from tail to tip", "المقدار (\\|\\mathbf{v}\\|)", "طول السهم بالمسطرة من بدايته حتى طرف رأسه"),
            ("Direction", "The compass bearing where the arrowhead is pointing", "الاتجاه", "الزاوية أو الوجهة التي يشير إليها رأس السهم"),
            ("Vector Addition", "Connecting movements head-to-tail: taking step 1, then taking step 2", "جمع المتجهات", "وصل الإزاحات رأساً بذيل: إكمال الخطوة الثانية من نهاية الخطوة الأولى"),
            ("Vector Space", "The infinite sandbox where arrows can be stretched and combined freely", "الفضاء الشعاعي", "الميدان الهندسي المفتوح الذي يسمح بدمج وتمديد المتجهات بحرية")
        ],
        "ascii_en": """                 ▲
                 │        * Tip of (u + v)
                 │       /│
               v │      / │
                 │     /  │
                 │    *   │
                 │   /│ u │
               u │  / │   │
                 │ /  │   │
        ─────────┼─┴──┴───┴──────►
               Origin
                 u + v = Head-to-tail combined displacement""",
        "ascii_ar": """                 ▲
                 │        * نهاية محصلة (u + v)
                 │       /│
               v │      / │
                 │     /  │
                 │    *   │
                 │   /│ u │
               u │  / │   │
                 │ /  │   │
        ─────────┼─┴──┴───┴──────►
               نقطة الأصل
                 u + v = الإزاحة الكلية الناتجة عن وصل الرأس بالذيل"""
    },
    "04": {
        "jargon": [
            ("Linear Combination", "Blending arrows by stretching each by some amount and chaining them together", "التركيب الخطي", "مزج الأسهم بتمديد كل منها بمقدار محدد ثم وصلها متتالية"),
            ("Span", "The entire reachable universe of destinations you can visit using your base arrows", "فضاء الامتداد (Span)", "كامل المساحة الجغرافية التي تستطيع الوصول إليها باستخدام أسهمك المتاحة"),
            ("Linear Independence", "Each arrow provides a genuinely new direction; no arrow is a redundant copy", "الاستقلال الخطي", "امتلاك مسار جديد أصيل؛ لا يمكن لأي سهم أن يُشتق من الآخرين"),
            ("Basis", "The minimal set of non-redundant compass arrows needed to reach any point in space", "الأساس (Basis)", "أقل عدد ممكن من الأسهم المستقلة القادرة على بناء كامل الفضاء"),
            ("Dimension", "The number of independent arrows required to form a basis for the space", "البُعد (Dimension)", "عدد الأسهم المستقلة الضرورية لبناء ذلك الفضاء وتغطيته بالكامل"),
            ("Subspace", "A flat line, flat sheet, or slice passing through the origin inside a larger space", "الفضاء الجزئي (Subspace)", "مسطح مستوٍ أو خط يمر بنقطة الأصل ويعيش داخل فضاء أكبر منه")
        ],
        "ascii_en": """           Grid of combinations: c1*v1 + c2*v2
              ▲
              │        2*v1 + 1*v2
              │         *
              │        / ◄── Reachable Destination!
           v2 │   v1  /
           ▲  │  ▲   /
           │  │  │  /
           └──┼──┴─*────────►
             Origin
              Span(v1, v2) fills the entire 2D flat plane!""",
        "ascii_ar": """           شبكة التركيبات الخطية: c1*v1 + c2*v2
              ▲
              │        2*v1 + 1*v2
              │         *
              │        / ◄── وجهة يمكن الوصول إليها!
           v2 │   v1  /
           ▲  │  ▲   /
           │  │  │  /
           └──┼──┴─*────────►
             نقطة الأصل
              فضاء الامتداد Span(v1, v2) يغطي كامل المستوي ثنائي الأبعاد!"""
    },
    "05": {
        "jargon": [
            ("Dot Product ($\\mathbf{u} \\cdot \\mathbf{v}$)", "A single number scoring how much two arrows push in the same direction", "الجداء النقطي ($\\mathbf{u} \\cdot \\mathbf{v}$)", "رقم يقيس مدى تكاتف سهمين ودفع أحدهما في اتجاه الآخر"),
            ("Orthogonality", "Meeting at a strict 90-degree right angle (zero shared push, dot product = 0)", "التعامد (Orthogonality)", "الالتقاء في زاوية قائمة 90 درجة؛ انعدام التوافق الاتجاهي والجداء = 0"),
            ("Orthogonal Projection", "The crisp shadow cast straight down by one arrow onto the line of another", "المسقط المتعامد", "الظل الهندسي الساقط عمودياً من سهم على خط سهم آخر"),
            ("Cosine Similarity", "Directional harmony score between -1 and +1, ignoring arrow lengths", "تشابه جيب التمام", "مقياس نقاء التوافق الاتجاهي بين -1 و +1 بمعزل عن أطوال الأسهم"),
            ("Norm (Length)", "The straight ruler length of the vector, computed as $\\sqrt{\\mathbf{v} \\cdot \\mathbf{v}}$", "المعيار / الطول", "طول السهم بالمسطرة والمحسوب كجذر تربيعي لجدائه النقطي مع نفسه")
        ],
        "ascii_en": """                 u
                *
               /│
              / │  Perpendicular drop (shadow)
             /  │
            *───┴──────────► v
          Origin ◄── Projection ──►
             Shadow length = ||u|| * cos(θ)
             u · v = ||u|| * ||v|| * cos(θ)""",
        "ascii_ar": """                 u
                *
               /│
              / │  إسقاط عمودي (الظل)
             /  │
            *───┴──────────► v
          نقطة الأصل ◄── طول المسقط ──►
             طول الظل = ||u|| * cos(θ)
             u · v = ||u|| * ||v|| * cos(θ)"""
    },
    "06": {
        "jargon": [
            ("Cross Product ($\\mathbf{a} \\times \\mathbf{b}$)", "A new 3D arrow shooting perpendicular out of the floor spanned by two arrows", "الجداء الاتجاهي ($\\mathbf{a} \\times \\mathbf{b}$)", "سهم ثلاثي الأبعاد ينطلق عمودياً تماماً على المستوي الذي يضم السهمين"),
            ("Right-Hand Rule", "Physical test: fingers curl from arrow A to arrow B, thumb points along the result", "قاعدة اليد اليمنى", "معيار فيزيائي: تدور أصابعك من السهم الأول للثاني فيشير إبهامك لاتجاه الناتج"),
            ("Parallelogram Area", "The physical surface area enclosed between the two arrows, equal to $\\|\\mathbf{a} \\times \\mathbf{b}\\|$", "مساحة متوازي الأضلاع", "المساحة السطحية المحصورة بين السهمين وتساوي تماماً مقدار الجداء الاتجاهي"),
            ("Torque", "Rotational twist produced when pulling a wrench: force times perpendicular arm", "عزم الدوران", "قوة التدوير الناتجة عند شد مفتاح الربط: القوة مضروبة في ذراع العزم"),
            ("Anti-Commutative", "Swapping order flips the direction upside down: $\\mathbf{b} \\times \\mathbf{a} = -(\\mathbf{a} \\times \\mathbf{b})$", "الخاصية التخالفية", "عكس ترتيب السهمين يقلب اتجاه السهم الناتج رأساً على عقب")
        ],
        "ascii_en": """                 a x b (Shoots straight UP)
                 ▲
                 │
                 │   *───────────*
                 │  /           /  Area = ||a x b||
                 │ /           /   (Floor parallelogram)
                 *────────────* b
                Origin       /
                 a ─────────*""",
        "ascii_ar": """                 a x b (ينطلق عمودياً للأعلى)
                 ▲
                 │
                 │   *───────────*
                 │  /           /  المساحة = ||a x b||
                 │ /           /   (متوازي أضلاع الأرضية)
                 *────────────* b
              نقطة الأصل     /
                 a ─────────*"""
    },
    "07": {
        "jargon": [
            ("Linear Transformation", "Warping space like stretchy rubber: keeping grid lines straight and parallel", "التحويل الخطي", "تشويه الفضاء كمطاط مرن مع بقاء خطوط الشبكة مستقيمة ومتوازية"),
            ("Fixed Origin", "The anchor pin at $(0,0)$ remains strictly motionless forever: $T(\\mathbf{0}) = \\mathbf{0}$", "ثبات نقطة الأصل", "مسمار المركز $(0,0)$ يظل ثابتاً في مكانه ولا يتحرك إطلاقاً: $T(\\mathbf{0}) = \\mathbf{0}$"),
            ("Matrix ($A$)", "A compact tracking sheet recording where the standard unit arrows $\\hat{i}$ and $\\hat{j}$ landed", "المصفوفة ($A$)", "دفتر توثيق يسجل الإحداثيات الجديدة التي هبطت عندها أسهم الأساس المرجعية"),
            ("Shear", "Sliding parallel layers of space sideways, like beveling a deck of cards", "القص (Shear)", "إزاحة طبقات الفضاء أفقياً أو رأسياً كإمالة حافة رزمة أوراق اللعب"),
            ("Rotation", "Swiveling every arrow around the fixed origin by an angle $\\theta$ without stretching", "الدوران (Rotation)", "تدوير كافة أسهم الفضاء حول نقطة الأصل بزاوية منتظمة دون تمديد")
        ],
        "ascii_en": """        Original Grid                 Warped Grid (Matrix A)
           ▲                             ▲         * T(i+j)
         j *───* i+j                   T(j)*      /
           │   │                         │  \    /
           └───*───►                     └───*──┴──►
         Origin i                      Origin T(i)
        Unit Square                   Tilted Parallelogram""",
        "ascii_ar": """        الشبكة الأصلية                 الشبكة بعد التحويل بالمصفوفة A
           ▲                             ▲         * T(i+j)
         j *───* i+j                   T(j)*      /
           │   │                         │  \    /
           └───*───►                     └───*──┴──►
        الأصل  i                       الأصل  T(i)
        مربع الوحدة                   متوازي أضلاع مائل وممتد"""
    },
    "08": {
        "jargon": [
            ("Matrix Multiplication ($AB$)", "Chaining two transformations in series: first do $B$, then do $A$", "ضرب المصفوفات ($AB$)", "تطبيق تحويلين هندسيين متتاليين: تطبيق التحويل B أولاً ثم التحويل A"),
            ("Composition ($A \\circ B$)", "Packaging a two-stage assembly line into a single master operation", "تركيب الدوال ($A \\circ B$)", "دمج مرحلتين متعاقبتين في خط معالجة واحد مباشر"),
            ("Non-Commutative ($AB \\ne BA$)", "Order matters! Putting on socks then shoes is NOT shoes then socks", "عدم التبديلية ($AB \\ne BA$)", "الترتيب جوهري! ارتداء الجوارب ثم الحذاء يختلف تماماً عن العكس"),
            ("Associativity ($(AB)C = A(BC)$)", "Grouping intermediate stages does not alter the final output", "الخاصية التجميعية", "حرية تجميع محطات المعالجة دون أن يتأثر الناتج النهائي"),
            ("Identity Matrix ($I$)", "The do-nothing transform: leaves every arrow completely untouched", "مصفوفة الوحدة ($I$)", "التحويل المحايد: يترك كل سهم في مكانه الأصلي دون أدنى تغيير")
        ],
        "ascii_en": """       Input x ──► [ Machine B ] ──► B*x ──► [ Machine A ] ──► A*(B*x)
                                ▲                         ▲
                                └─────── [ Matrix AB ] ───┘
                                   Combined single jump!""",
        "ascii_ar": """       المدخل x ──► [ الآلة B ] ──► B*x ──► [ الآلة A ] ──► A*(B*x)
                                ▲                       ▲
                                └────── [ المصفوفة AB ] ┘
                                   قفزة واحدة مدمجة تختصر المرحلتين!"""
    },
    "09": {
        "jargon": [
            ("Determinant ($\\det A$)", "The area or volume magnification multiplier produced by a transformation", "المحدد ($\\det A$)", "معامل تضخيم أو تقليص المساحة والحجم الناتج عن التحويل الهندسي"),
            ("Orientation Flip", "A negative determinant: space was turned inside-out, like looking in a mirror", "انقلاب التوجيه", "المحدد السالب: انعكاس الفضاء كمرآة، مقلوباً من اليمين إلى اليسار"),
            ("Singular Matrix", "A determinant of zero: space was crushed completely flat into a lower dimension", "المصفوفة الشاذة / المنعدمة", "محدد يساوي صفراً: انسحاق الفضاء وتسطحه تماماً في بعد أدنى"),
            ("Invertibility", "Ability to hit 'rewind' and restore original shapes without losing information", "قابلية العكس", "إمكانية تشغيل الشريط للخلف واسترجاع الأشكال الأصلية دون ضياع بيانات"),
            ("Volume Scaling", "Multiplying any shape's original size by $|\\det A|$ gives its new warped size", "مقياس الحجم", "ضرب مساحة أي شكل أصلي في |det A| يعطي مساحته الجديدة بدقة")
        ],
        "ascii_en": """        Original Area = 1            Transformed Area = |det(A)|
           ▲                             ▲         *
         1 *───*                       T(j)*      /
           │   │ Area = 1                │  \    /  Area = |det(A)|
           └───*───►                     └───*──┴──►
           0   1                         0  T(i)""",
        "ascii_ar": """        المساحة الأصلية = 1           المساحة بعد التحويل = |det(A)|
           ▲                             ▲         *
         1 *───*                       T(j)*      /
           │   │ المساحة = 1             │  \    /  المساحة = |det(A)|
           └───*───►                     └───*──┴──►
           0   1                         0  T(i)"""
    },
    "10": {
        "jargon": [
            ("Gaussian Elimination", "A systematic recipe for clearing out unknowns one variable at a time", "حذف غاوس", "خوارزمية منظمة لإلغاء المجاهيل تدريجياً حتى ينكشف الحل الأخير"),
            ("Pivot", "The leading nonzero number in a row, used as an anchor to cancel numbers below it", "عنصر الارتكاز (Pivot)", "الرقم غير المعدوم الرائد في الصف، يُتخذ كدعامة لتصفير ما تحته"),
            ("Row Operations", "Fair balance-scale moves: swapping rows, scaling a row, or adding rows together", "العمليات الصفية البسيطة", "حركات موازنة مشروعة: تبديل الصفوف، ضرب صف بعدد، أو جمع صف لآخر"),
            ("Echelon Form", "A neat downward staircase where each row starts with more zeros than the last", "الشكل المدرج (Echelon Form)", "هيكل مدرج أنيق يتسع فيه عدد الأصفار كلما نزلت صفاً للأسفل"),
            ("Back-Substitution", "Solving the bottom single-variable equation, then plugging it upward", "التعويض الخلفي", "إيجاد المجهول الأخير المعزول في الأسفل ثم الصعود به لتعويض باقي القيم")
        ],
        "ascii_en": """      Original Matrix               Upper Triangular Staircase
        [ 2   1  -1 |  8 ]             [ 2   1  -1 |  8 ]
        [ -3 -1   2 | -11]    ───►     [ 0   1   1 |  2 ]
        [ -2  1   2 | -3 ]             [ 0   0   1 | -1 ] ◄── Solve z first!
                                       Then back-substitute upwards!""",
        "ascii_ar": """      المصفوفة الأصلية               المصفوفة المثلثية العلوية المدرجة
        [ 2   1  -1 |  8 ]             [ 2   1  -1 |  8 ]
        [ -3 -1   2 | -11]    ───►     [ 0   1   1 |  2 ]
        [ -2  1   2 | -3 ]             [ 0   0   1 | -1 ] ◄── احسب z أولاً!
                                       ثم عوض قيمته صعوداً للأعلى!"""
    },
    "11": {
        "jargon": [
            ("Column Space ($\\mathcal{C}(A)$)", "The gallery of all reachable output images the matrix can paint", "فضاء الأعمدة", "معرض كافة الصور والمخرجات الممكنة التي تستطيع المصفوفة إنتاجها"),
            ("Null Space ($\\mathcal{N}(A)$)", "The blind spot: all input arrows that get crushed into pure zero", "فضاء العدم (Null Space)", "الزاوية العمياء: كافة أسهم المدخلات التي تُسحق وتتحول لصفر تام"),
            ("Row Space ($\\mathcal{C}(A^T)$)", "The effective input arrows that directly govern what output gets produced", "فضاء الصفوف", "المدخلات الفعالة الحقيقية المسؤولة عن تشكيل المخرجات المتنوعة"),
            ("Left Null Space ($\\mathcal{N}(A^T)$)", "The forbidden output zone: target positions that can never be reached", "فضاء العدم الأيسر", "منطقة المخرجات المستحيلة التي لا يمكن للمصفوفة بلوغها إطلاقاً"),
            ("Rank-Nullity Theorem", "Dimension conservation: Total Input Directions = Effective + Crushed", "مبرهنة الرتبة والعدم", "قانون حفظ الأبعاد: أبعاد المدخلات = الأبعاد الفعالة + الأبعاد المسحوقة")
        ],
        "ascii_en": """          Input Space R^n                      Output Space R^m
     ┌───────────────────────┐            ┌───────────────────────┐
     │  Row Space C(A^T)     │            │  Column Space C(A)    │
     │  (Effective Inputs)   │ ──A*x───►  │  (All outputs A*x)   │
     ├───────────────────────┤            ├───────────────────────┤
     │  Null Space N(A)      │            │  Left Null Space      │
     │  (Crushed to ZERO)    │ ──A*x=0─►  │  (Unreachable zone)   │
     └───────────────────────┘            └───────────────────────┘""",
        "ascii_ar": """          فضاء المدخلات R^n                    فضاء المخرجات R^m
     ┌───────────────────────┐            ┌───────────────────────┐
     │  فضاء الصفوف C(A^T)   │            │  فضاء الأعمدة C(A)    │
     │  (المدخلات الفعالة)   │ ──A*x───►  │  (كافة المخرجات A*x)  │
     ├───────────────────────┤            ├───────────────────────┤
     │  فضاء العدم N(A)      │            │  فضاء العدم الأيسر    │
     │  (المسحوق إلى الصفر)  │ ──A*x=0─►  │  (المنطقة المستحيلة)  │
     └───────────────────────┘            └───────────────────────┘"""
    },
    "12": {
        "jargon": [
            ("Orthogonal Projection", "The closest footprint on a subspace, where the drop line makes a 90-degree angle", "المسقط المتعامد", "أقرب موضع قدم داخل الفضاء الجزئي حيث يسقط عمود القياس بزاوية 90 درجة"),
            ("Residual Error ($e = b - p$)", "The leftover gap arrow pointing perpendicular away from the subspace floor", "سهم الخطأ المتبقي", "سهم الفارق المتبقي المنطلق عمودياً من أرضية الفضاء نحو الهدف"),
            ("Least Squares", "The best possible compromise when no exact solution exists", "المربعات الصغرى", "أفضل تسوية رياضية ممكنة للاقتراب من الهدف عند استحالة الحل الدقيق"),
            ("Projection Matrix ($P$)", "A reusable lens that snatches any arrow and drops it onto its subspace shadow", "مصفوفة الإسقاط ($P$)", "عدسة هندسية تلتقط أي سهم وتسقطه فوراً كظل داخل الفضاء الجزئي"),
            ("Normal Equations", "Demanding that the error arrow is at right angles to every column of $A$", "المعادلات الناظمية", "شرط هندسي يفرض تعامد سهم الخطأ مع كافة أعمدة المصفوفة")
        ],
        "ascii_en": """                 b (Target data)
                *
               /│
      Error e │ │ Plumb line (at 90 degrees!)
              │ │
              *─┴──────────────► Subspace C(A)
             p = A*x_hat (Best approximation!)""",
        "ascii_ar": """                 b (البيانات المستهدفة)
                *
               /│
       الخطأ e │ │ خيط شاقول متعامد (بزاوية 90 درجة!)
              │ │
              *─┴──────────────► الفضاء الجزئي C(A)
             p = A*x_hat (أفضل تقريب هندسي ممكن!)"""
    },
    "13": {
        "jargon": [
            ("Eigenvector ($v$)", "A special arrow that only stretches or shrinks without turning when transformed", "المتجه الذاتي ($v$)", "سهم استثنائي يتمدد أو ينكمش فقط دون أن يدور إطلاقاً عند تطبيق التحويل"),
            ("Eigenvalue ($\\lambda$)", "The stretch multiplier along the eigenvector's unwavering line", "القيمة الذاتية ($\\lambda$)", "معامل التمدد أو الانكماش العددي على طول مسار المتجه الذاتي"),
            ("Characteristic Equation", "The algebraic formula $\\det(A - \\lambda I) = 0$ that unlocks all eigenvalues", "المعادلة المميزة", "المعادلة الجبرية det(A - λI) = 0 التي تكشف قيم التمدد الذاتية"),
            ("Eigenspace", "The full line or plane of all arrows that share the same stretch factor", "الفضاء الذاتي", "الخط أو المستوي الهندسي الذي يضم كافة المتجهات ذات معامل التمدد المشترك"),
            ("Power Iteration", "Repeatedly multiplying a random arrow by a matrix until it aligns with the dominant eigenvector", "طريقة القوى التكرارية", "تكرار ضرب سهم عشوائي بالمصفوفة حتى ينجذب وينحاز للمتجه الذاتي الأقوى")
        ],
        "ascii_en": """        Ordinary arrow w                Eigenvector v
           ▲                               ▲
           │   * T(w)                      │   * T(v) = λ*v
           │  /  (Rotates!)                │  /
           │ /                             │ /  (STAYS ON SAME LINE!
           *──► w                          *──► v Only stretches by λ)""",
        "ascii_ar": """        السهم العادي w                  المتجه الذاتي v
           ▲                               ▲
           │   * T(w)                      │   * T(v) = λ*v
           │  /  (ينحرف ويدور!)            │  /
           │ /                             │ /  (يبقى على نفس الخط!
           *──► w                          *──► v يتمدد فقط بمقدار λ)"""
    },
    "14": {
        "jargon": [
            ("Symmetric Matrix ($A = A^T$)", "A matrix perfectly balanced across its main diagonal, like a mirror image", "المصفوفة المتناظرة", "مصفوفة متوازنة كمرآة حول قطرها الرئيسي؛ تتطابق مع منقولتها تماماً"),
            ("Spectral Theorem", "The golden guarantee: symmetric matrices always have mutually perpendicular eigenvectors", "المبرهنة الطيفية", "الضمانة الذهبية: المصفوفات المتناظرة تمتلك دائماً متجهات ذاتية متعامدة"),
            ("Orthogonal Diagonalization", "Factoring a matrix into pure rotation, axis stretching, and un-rotation: $Q \\Lambda Q^T$", "التقطير المتعامد", "تفكيك التحويل إلى دوران نقي، ثم تمدد على المحاور، ثم دوران عكسي"),
            ("Quadratic Form ($x^T A x$)", "A smooth 3D energy bowl whose contours form concentric ellipses", "الصيغة التربيعية", "وعاء طاقة أملس ثلاثي الأبعاد تشكل مقاطعه العرضية قطوعاً ناقصة متحدة المركز"),
            ("Principal Axes", "The longest and shortest perpendicular directions of the energy ellipsoid", "المحاور الرئيسية", "أطول وأقصر المحاور المتعامدة التي تحدد أبعاد الشكل البيضاوي")
        ],
        "ascii_en": """        Unit Circle                  Transformed Ellipse
             ▲                              ▲         q2 (Minor axis, λ2)
          q2 *                             │       *
             │                             │      / \ 
             └──*──► q1                    └─────*───*──► q1 (Major axis, λ1)
          Circle (r=1)               Eigenvectors form orthogonal axes!""",
        "ascii_ar": """        دائرة الوحدة                 القطع الناقص الناتج بعد التحويل
             ▲                              ▲         q2 (المحور الأصغر، λ2)
          q2 *                             │       *
             │                             │      / \ 
             └──*──► q1                    └─────*───*──► q1 (المحور الأكبر، λ1)
         دائرة بنصف قطر 1             المتجهات الذاتية تشكل محاور متعامدة تماماً!"""
    },
    "15": {
        "jargon": [
            ("SVD ($A = U \\Sigma V^T$)", "The master decomposition factoring ANY matrix into rotate, stretch, and rotate", "تفكيك القيم المفردة (SVD)", "التحليل الشامل الذي يفكك أي مصفوفة إلى دوران ثم تمديد ثم دوران"),
            ("Singular Values ($\\sigma_i$)", "The sorted stretch factors along the principal axes, measuring importance", "القيم المفردة ($\\sigma_i$)", "معاملات التمديد المرتبة تنازلياً، وتقيس وزن وأهمية كل نمط في البيانات"),
            ("Right Singular Vectors ($V$)", "The perpendicular input directions that experience pure stretching", "المتجهات المفردة اليمنى ($V$)", "المحاور المتعامدة في فضاء المدخلات التي تتعرض لتمدد نقي"),
            ("Left Singular Vectors ($U$)", "The perpendicular output directions where the stretched axes land", "المتجهات المفردة اليسرى ($U$)", "المحاور المتعامدة في فضاء المخرجات التي تستقر عندها الأبعاد الممددة"),
            ("Low-Rank Approximation", "Data compression: keeping only the largest singular values and tossing the noise", "التقريب منخفض الرتبة", "ضغط البيانات والصور: الاحتفاظ بأكبر القيم المفردة وحذف الضجيج")
        ],
        "ascii_en": """   Unit Sphere          Aligned Sphere        Hyper-Ellipsoid      Rotated Output
      (x)       ──V^T──►     (V^T*x)    ──Σ──►   (Σ*V^T*x)  ──U──►   (U*Σ*V^T*x)
    Circle               Rotated              Stretched            Final orientation
                       (Input bases)        by σ1, σ2,...        (Output bases)""",
        "ascii_ar": """   كرة الوحدة            كرة مدورة             شكل بيضاوي ممدد      المخرج النهائي
      (x)       ──V^T──►     (V^T*x)    ──Σ──►   (Σ*V^T*x)  ──U──►   (U*Σ*V^T*x)
    دائرة أولية          دوران المحاور        تمدد المحاور         دوران نهائي
                        (أساسات الدخل)       بالمعاملات σ         (أساسات الخرج)"""
    },
    "16": {
        "jargon": [
            ("Limit ($\\lim_{x \\to c} f(x)$)", "The destination your footsteps predict as you get infinitely close to a spot", "النهاية (Limit)", "الوجهة التي تتنبأ بها خطواتك كلما اقتربت اقتراباً متناهياً من نقطة"),
            ("Continuity", "Drawing a smooth curve without lifting your pen; no sudden trapdoors or teleport jumps", "الاتصال (Continuity)", "رسم المنحنى بخط انسيابي واحد دون رفع القلم أو قفزات مفاجئة"),
            ("Infinitesimal Neighborhood", "A microscopic safety bubble centered around a target coordinate", "الجوار المتناهي في الصغر", "فقاعة أمان مجهرية ضيقة للغاية تحيط بنقطة الإسناد"),
            ("Epsilon-Delta ($\\epsilon, \\delta$)", "A guarantee game: specify output tolerance $\\epsilon$, find required input tolerance $\\delta$", "إبسيلون ودلتا ($\\epsilon, \\delta$)", "لعبة ضمان هندسية: حدد هامش تسامح المخرج إبسيلون، لأعطيك نطاق أمان المدخل دلتا"),
            ("Punctured Neighborhood", "Focusing strictly on approaching a point while ignoring what happens at the point itself", "الجوار المثقوب", "التركيز على مسار الاقتراب من النقطة مع تجاهل ما يحدث عندها تماماً")
        ],
        "ascii_en": """        f(x)
          ▲
        L ┼ - - - - - - o (Hole at x=c, value undefined!)
          │            / \\
          │           /   \\  Footsteps from left (c-) and right (c+)
          │          /     \\ both predict arrival at height L!
          └─────────┴───────┴──────► x
                   c-   c   c+""",
        "ascii_ar": """        f(x)
          ▲
        L ┼ - - - - - - o (فجوة عند x=c، القيمة غير معرّفة!)
          │            / \\
          │           /   \\  خطوات الاقتراب من اليسار ومن اليمين
          │          /     \\ تتنبأ كلاهما بالوصول للارتفاع L بدقة!
          └─────────┴───────┴──────► x
                   c-   c   c+"""
    },
    "17": {
        "jargon": [
            ("Derivative ($f'(x)$)", "The instantaneous speedometer reading: exact rate of change at a frozen instant", "المشتقة ($f'(x)$)", "عداد السرعة اللحظي: معدل التغير الدقيق عند لحظة مجمدة من الزمن"),
            ("Secant Line", "A straight bridge connecting two separated points on a curve", "القاطع (Secant Line)", "جسر مستقيم يصل بين نقطتين متباعدتين على منحنى الدالة"),
            ("Tangent Line", "A ruler balanced delicately touching the curve at exactly one single point", "المماس (Tangent Line)", "مسطرة ترتكز برقة فائقة ملامسة المنحنى عند نقطة تماس وحيدة"),
            ("Local Linearization", "Zooming in so close to a smooth curve that it looks completely like a straight line", "التقريب الخطي المحلي", "تكبير المنحنى بالمجهر حتى يبدو للمشاهد كخط مستقيم تماماً"),
            ("Difference Quotient", "The average rise-over-run slope between two points: $\\frac{f(x+h) - f(x)}{h}$", "نسبة الفروق", "الميل المتوسط للصعود على الامتداد بين نقطتين تفصل بينهما خطوة h")
        ],
        "ascii_en": """        f(x)
          ▲              * Secant line across gap h
          │             /│
          │     Tangent/ │
          │     Line  /  │ f(x+h) - f(x)
          │      \\   *───┴─────
          │       \\ /    h (Shrink h -> 0 to pivot secant into tangent!)
          └────────┴─────────────► x""",
        "ascii_ar": """        f(x)
          ▲              * خط القاطع عبر الفجوة h
          │             /│
          │       خط  /  │
          │     المماس/  │ f(x+h) - f(x)
          │      \\   *───┴─────
          │       \\ /    h (عند تقليص h نحو الصفر يدور القاطع ليصبح مماساً!)
          └────────┴─────────────► x"""
    },
    "18": {
        "jargon": [
            ("Chain Rule", "Multiplying speed ratios along an assembly line: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$", "قاعدة السلسلة", "ضرب نسب سرعات التروس المتعاقبة: dy/dx = (dy/du) * (du/dx)"),
            ("Product Rule", "The expanding area of a rectangle when both width and length grow simultaneously", "قاعدة ضرب دالتين", "معدل اتساع مساحة مستطيل ينمو طوله وعرضه في نفس اللحظة"),
            ("Composite Function ($f(g(x))$)", "Nesting machines inside one another: output of machine $g$ enters machine $f$", "الدالة المركبة", "آلات معالجة متتالية: مخرجات الآلة الأولى تصبح مدخلات للآلة التالية"),
            ("Backpropagation", "Using the chain rule backwards to tell each neural network weight how to improve", "الانتشار العكسي", "تطبيق قاعدة السلسلة إلى الوراء لإبلاغ أوزان الشبكة بمقدار الخطأ"),
            ("Local Sensitivity", "How much a tiny wiggle at one stage magnifies or shrinks down the line", "الحساسية المحلية", "مقدار تضخم أو تضاؤل اهتزازة طفيفة عند انتقالها عبر خط المعالجة")
        ],
        "ascii_en": """       Nudge dx ──► [ Gear g ] ──► Nudge du = g'*dx ──► [ Gear f ] ──► Nudge dy = f'*du
                                                                       dy = f' * g' * dx
       Total Sensitivity Ratio = dy/dx = f'(g(x)) * g'(x) (Gear multiplication!)""",
        "ascii_ar": """       دفعة dx ──► [ الترس g ] ──► أثر du = g'*dx ──► [ الترس f ] ──► أثر dy = f'*du
                                                                       dy = f' * g' * dx
       نسبة الحساسية الكلية = dy/dx = f'(g(x)) * g'(x) (ضرب نسب التروس!)"""
    },
    "19": {
        "jargon": [
            ("Second Derivative ($f''(x)$)", "The acceleration of slope: how quickly the steepness itself is changing", "المشتقة الثانية ($f''(x)$)", "تسارع الميل: مدى سرعة تغير شدة الانحدار ذاتها مع التقدم"),
            ("Concave Up ($f'' > 0$)", "A bowl or smile shape that holds water; tangent lines lie BELOW the curve", "التقعر لأعلى ($f'' > 0$)", "منحنى بشكل وعاء أو ابتسامة يحفظ الماء؛ والمماسات تقع أسفل المنحنى"),
            ("Concave Down ($f'' < 0$)", "An umbrella or frown shape that sheds water; tangent lines lie ABOVE the curve", "التقعر لأسفل ($f'' < 0$)", "منحنى بشكل مظلة أو عبوس يسقط الماء؛ والمماسات تقع أعلى المنحنى"),
            ("Inflection Point", "The transition spot where the road switches from banking left to banking right ($f'' = 0$)", "نقطة الانعطاف", "موضع التحول الذي ينتقل فيه المنحنى من التقعر لأسفل إلى التقعر لأعلى"),
            ("Curvature ($\\kappa$)", "The bending tightness of a curve, equal to 1 divided by the radius of the turning circle", "الانحناء (Curvature)", "مقياس شدة انثناء المنحنى، ويساوي مقلوب نصف قطر دائرة الانعطاف")
        ],
        "ascii_en": """        Concave Down (f'' < 0)       Inflection        Concave Up (f'' > 0)
             Umbrella                   Point              Soup Bowl
               .-.                        *                   \\     /
              /   \\                      /                     \\___/
             /     \\                    /                        
         Tangents ABOVE             f''(x) = 0             Tangents BELOW""",
        "ascii_ar": """        مقعر لأسفل (f'' < 0)         نقطة           مقعر لأعلى (f'' > 0)
              شكل المظلة               الانعطاف             شكل الوعاء
               .-.                        *                   \\     /
              /   \\                      /                     \\___/
             /     \\                    /                        
         المماسات تعلو المنحنى         f''(x) = 0            المماسات أسفل المنحنى"""
    },
    "20": {
        "jargon": [
            ("Taylor Series", "Rebuilding an entire mathematical function using only the derivatives measured at a single point", "متسلسلة تايلور", "إعادة بناء دالة كاملة بالاعتماد حصرياً على مشتقاتها عند نقطة مرجعية واحدة"),
            ("Polynomial Approximation", "Replacing complicated functions (like $\\sin x, e^x$) with simple additions and multiplications", "التقريب بكثيرات الحدود", "استبدال الدوال المعقدة بعمليات جمع وضرب بسيطة وسريعة للغاية"),
            ("Factorial ($k!$)", "The scaling factor that compensates for repeated differentiation when matching powers", "المضروب ($k!$)", "معامل تصحيح رياضي يقسم على مشتقات القوى المتتالية لضبط التوافق"),
            ("Truncation Error", "The leftover gap between the true curve and our finite polynomial estimate", "خطأ البتر / الاقتطاع", "الفجوة المتبقية بين المنحنى الحقيقي وتقديرنا المبسط متعدد الحدود"),
            ("Maclaurin Series", "The special Taylor series centered at the easiest reference point: $x = 0$", "متسلسلة ماكلوران", "حالة خاصة من متسلسلة تايلور تكون متمركزة عند أسهل نقطة إسناد: x = 0")
        ],
        "ascii_en": """        Approximating a curve near x = a:
           ▲                     * True Curve f(x)
           │                   .' 
           │       Degree 2  .'   Degree 1 (Tangent Line)
           │      Parabola .'    /
           │            \\.'____/ 
           │             * Center anchor (a, f(a))
           └─────────────┴───────────────► x""",
        "ascii_ar": """        تقريب المنحنى حول النقطة x = a:
           ▲                     * المنحنى الحقيقي f(x)
           │                   .' 
           │        الدرجة 2 .'    الدرجة 1 (خط المماس المستقيم)
           │       المكافئ .'    /
           │            \\.'____/ 
           │             * مركز الإسناد (a, f(a))
           └─────────────┴───────────────► x"""
    },
    "21": {
        "jargon": [
            ("Scalar Field ($f(\\mathbf{x})$)", "A landscape map assigning a single number (elevation, heat, pressure) to every coordinate", "الحقل القياسي", "خريطة تضاريس تسند قيمة رقمية واحدة (كالارتفاع أو الحرارة) لكل موقع"),
            ("Contour Line (Level Set)", "A hiking trail on a mountain that stays at the exact same elevation; zero climbing", "خط الكنتور (مجموعة المستوى)", "مسار مشي جبلي يحافظ على نفس الارتفاع تماماً دون أي صعود أو هبوط"),
            ("Multivariable Domain", "Having multiple knobs (e.g. latitude and longitude) that feed into a single result", "النطاق متعدد المتغيرات", "امتلاك عدة مفاتيح تحكم مستقلة (مثل خط الطول والعرض) تحدد مخرجاً واحداً"),
            ("Topographic Map", "A flat 2D bird's-eye view showing rings of elevation; dense rings mean a steep cliff", "الخريطة الطبوغرافية", "مسقط رأسي ثنائي الأبعاد لحلقات الارتفاع؛ تقارب الحلقات يعني جرفاً شديد الانحدار")
        ],
        "ascii_en": """        3D Mountain Landscape          2D Topographic Contours
               Peak (z=100)                     (100)  Peak
                  ▲                           ( 80 )
                 / \\                         (  60  )
               .'   '.                      (   40   )
             .'       '.                   (    20    )
            ─────────────►                  Rings of equal height!""",
        "ascii_ar": """        تضاريس الجبل ثلاثية الأبعاد      خطوط الكنتور الطبوغرافية ثنائية الأبعاد
               القمة (z=100)                    (100)  القمة
                  ▲                           ( 80 )
                 / \\                         (  60  )
               .'   '.                      (   40   )
             .'       '.                   (    20    )
            ─────────────►                  حلقات متحدة تمثل نفس الارتفاع!"""
    },
    "22": {
        "jargon": [
            ("Partial Derivative ($\\frac{\\partial f}{\\partial x_i}$)", "The slope in one coordinate direction while freezing all other coordinates in blocks of ice", "المشتقة الجزئية", "ميل المنحنى في اتجاه بعد واحد مع تجميد كافة الأبعاد الأخرى كقوالب ثلج"),
            ("Ceteris Paribus", "All other variables held strictly constant (the fundamental assumption of partial derivatives)", "مع بقاء العوامل الأخرى ثابتة", "المبدأ الجوهري: تثبيت كل المتغيرات الأخرى واعتبارها ثوابت رقمية"),
            ("Tangent Plane", "A flat sheet of cardboard balanced resting against a 3D curved surface at one touch point", "المستوي المماس", "لوح مستوٍ يستند بتوازن مثالي على سطح منحنٍ عند نقطة تماس واحدة"),
            ("Coordinate Slice", "Cutting a 3D mountain with a straight vertical knife parallel to one coordinate axis", "الشريحة الإحداثية", "قطع الجبل بسكين رأسي موازٍ لأحد المحاور لعزل منحنى أحادي البعد")
        ],
        "ascii_en": """        3D Surface f(x, y)            Slicing plane with y = constant
           ▲                             ▲
           │    / \\                      │     Curve on the slice
           │   /   \\                     │     Slope = ∂f/∂x
           │  /     \\                    │      *─── Tangent line on slice!
           └──┴──────┴──►                └───┴──────► x
              x      y                      Frozen y = y0""",
        "ascii_ar": """        السطح ثلاثي الأبعاد f(x,y)     شريحة القطع الرأسي عند y = ثابت
           ▲                             ▲
           │    / \\                      │     المنحنى على الشريحة
           │   /   \\                     │     الميل = ∂f/∂x
           │  /     \\                    │      *─── خط المماس على الشريحة!
           └──┴──────┴──►                └───┴──────► x
              x      y                      تم تجميد y = y0"""
    },
    "23": {
        "jargon": [
            ("Gradient ($\\nabla f$)", "A compass arrow pointing in the direction of steepest uphill climb on the landscape", "متجه التدرج ($\\nabla f$)", "سهم بوصلة يشير بدقة إلى اتجاه أقصى صعود ممكن على تضاريس الدالة"),
            ("Steepest Ascent", "The direction that gives the highest possible elevation gain per single pace forward", "أقصى صعود", "المسار الذي يمنحك أكبر مكسب في الارتفاع مقابل كل خطوة للأمام"),
            ("Directional Derivative ($D_u f$)", "The slope you experience when hiking in ANY chosen compass heading $\\mathbf{u}$", "المشتقة الاتجاهية", "معدل الصعود أو الهبوط الذي تشعر به عند السير في أي زاوية بوصلة تختارها"),
            ("Contour Orthogonality", "The gradient arrow always cuts across elevation contour rings at a crisp 90 degrees", "التعامد مع خطوط الكنتور", "سهم التدرج يقطع مسارات الارتفاع الثابت بزاوية قائمة 90 درجة دائماً")
        ],
        "ascii_en": """            Contour Rings with Gradient Vectors
                    (100)
                  /   ▲   \\
                 │  ▲ │ ▲  │   Grad f points straight UPHILL,
                 │  │ │ │  │   strictly perpendicular to the
                  \\ ─ ┼ ─ /    contour rings!
                    ( 50 )""",
        "ascii_ar": """            حلقات الكنتور مع متجهات التدرج
                    (100)
                  /   ▲   \\
                 │  ▲ │ ▲  │   متجه التدرج يشير للأعلى مباشرة نحو القمة،
                 │  │ │ │  │   ويتعامد تماماً وبزاوية 90 درجة مع حلقات الكنتور!
                  \\ ─ ┼ ─ /
                    ( 50 )"""
    },
    "24": {
        "jargon": [
            ("Hessian Matrix ($H$)", "A grid of all second partial derivatives capturing 3D curvature and twisting in every direction", "مصفوفة هيسيان ($H$)", "جدول يضم كافة المشتقات الجزئية الثانية ليصف انحناء والتواء السطح كروياً"),
            ("Positive Definite ($H \\succ 0$)", "Curving upward in all directions like a salad bowl; signals a local minimum", "موجبة تماماً ($H \\succ 0$)", "انحناء للأعلى في كافة الاتجاهات كوعاء الشوربة؛ يضمن وجود نهاية صغرى"),
            ("Negative Definite ($H \\prec 0$)", "Curving downward in all directions like an umbrella dome; signals a local maximum", "سالبة تماماً ($H \\prec 0$)", "انحناء للأسفل في كافة الاتجاهات كالقبة؛ يضمن وجود نهاية عظمى"),
            ("Saddle Point (Indefinite)", "Curving up in one direction and down in another, exactly like a horse saddle or potato chip", "نقطة السرج", "انحناء للأعلى في اتجاه وللأسفل في اتجاه آخر كسرج الحصان أو رقاقة البطاطس")
        ],
        "ascii_en": """       Bowl (Minimum)            Dome (Maximum)             Saddle Point
          \\     /                     .-.                      UP in x,
           \\___/                     /   \\                    DOWN in y
        H is Positive             H is Negative             H is Indefinite
          Definite                  Definite              (Neither min nor max)""",
        "ascii_ar": """       وعاء (نهاية صغرى)          قبة (نهاية عظمى)          نقطة سرج
          \\     /                     .-.                      صعود في x
           \\___/                     /   \\                    وهبوط في y
        هيسيان موجبة              هيسيان سالبة              هيسيان غير معينة
          تماماً                    تماماً                 (ليست عظمى ولا صغرى)"""
    },
    "25": {
        "jargon": [
            ("Jacobian Matrix ($J$)", "A local distortion grid showing how every output coordinate responds to every input knob", "مصفوفة جاكوبي ($J$)", "جدول التشوه المحلي الذي يوضح كيف يستجيب كل مخرج لكل مدخل"),
            ("Vector-Valued Function", "A system taking multiple inputs and producing multiple outputs (e.g. mapping coordinates)", "دالة متعددة المخرجات", "منظومة تستقبل عدة إحداثيات وتنتج عدة إحداثيات جديدة"),
            ("Jacobian Determinant ($|\\det J|$)", "The local area or volume magnification multiplier at that exact coordinate", "محدد جاكوبي ($|\\det J|$)", "معامل تضخيم المساحة أو الحجم المحلي عند تلك النقطة تحديداً"),
            ("Local Linearization", "Treating a tiny patch of warped curved space as a simple matrix multiplication", "التقريب الخطي المحلي", "التعامل مع رقعة مجهرية من الفضاء المشوه كعملية ضرب مصفوفي بسيطة")
        ],
        "ascii_en": """       Input Domain (dx by dy)           Output Space (Deformed)
           ▲                               ▲           *
        dy │ *───*                      J*dy*         /
           │ │   │ Area = dx*dy           │   \      /  New Area =
           └──*───┴──►                    └───*─────┴──► |det(J)| * dx*dy
              dx                             J*dx""",
        "ascii_ar": """       نطاق المدخلات (dx في dy)          فضاء المخرجات (المشوه محلياً)
           ▲                               ▲           *
        dy │ *───*                      J*dy*         /
           │ │   │ المساحة = dx*dy        │   \      /  المساحة الجديدة =
           └──*───┴──►                    └───*─────┴──► |det(J)| * dx*dy
              dx                             J*dx"""
    },
    "26": {
        "jargon": [
            ("Convex Function", "A bowl shape where any straight chord drawn between two points floats strictly above the curve", "الدالة المحدبة", "دالة بشكل وعاء بحيث يقع أي وتر مستقيم بين نقطتين فوق المنحنى دوماً"),
            ("Epigraph", "The entire region of space resting inside and above the bowl of the function", "فوق المخطط (Epigraph)", "كامل المنطقة الفراغية الواقعة داخل وعاء الدالة وأعلى منحناها"),
            ("Global Minimum", "The absolute bottom of the bowl; any local valley is guaranteed to be the overall lowest point", "النهاية الصغرى الشاملة", "قاع الوعاء المطلق؛ أي قاع محلي تبلغه هو حتماً أدنى نقطة في الكون"),
            ("Jensen's Inequality", "The value of the average is always less than or equal to the average of the values", "متراجحة ينسن", "قيمة الدالة عند المتوسط أقل من أو تساوي متوسط قيم الدالة")
        ],
        "ascii_en": """        f(x)
          ▲
          │   * (x1, f(x1))
          │    \\           Chord line floats ABOVE curve!
          │     \\   * (x2, f(x2))
          │      \\ /
          │       V   Unique Global Minimum at bottom!
          └────────────────────────► x""",
        "ascii_ar": """        f(x)
          ▲
          │   * (x1, f(x1))
          │    \\           الوتر المستقيم يطفو دوماً أعلى المنحنى!
          │     \\   * (x2, f(x2))
          │      \\ /
          │       V   نهاية صغرى شاملة وحيدة ومضمونة في القاع!
          └────────────────────────► x"""
    },
    "27": {
        "jargon": [
            ("Gradient Descent", "Rolling a ball down a hill step-by-step to find the lowest valley of a loss function", "الانحدار التدريجي", "دحرجة كرة نحو أسفل المنحدر خطوة بخطوة لبلوغ أدنى وادٍ لدالة الخسارة"),
            ("Learning Rate ($\\eta$)", "The stride length: how large a step you take downhill in each update", "معدل التعلم ($\\eta$)", "طول الخطوة: المسافة التي تقطعها هبوطاً في كل تحديث حسابي"),
            ("Overshooting", "Taking steps so huge that you leap over the bottom and land higher up the opposite cliff", "القفز المفرط (Overshooting)", "أخذ خطوة عملاقة تقفز بك فوق الوادي لتهبط في موضع أعلى على الجرف المقابل"),
            ("Convergence", "Settling smoothly into the flat floor of the valley where the gradient shrinks to zero", "التقارب (Convergence)", "الاستقرار السلس في قاع الوادي حيث يتلاشى الميل ويقترب التدرج من الصفر"),
            ("Momentum", "Adding physical inertia so the ball powers through flat plateaus and ignores small ripples", "الزخم (Momentum)", "إضافة قصور ذاتي حركي يساعد الكرة على تجاوز التموجات السطحية الخادعة")
        ],
        "ascii_en": """        Loss
          ▲
          │  * x0 (Start)
          │   \\
          │    * x1 (Step -η*grad)
          │     \\
          │      * x2
          │       \\____* x* (Minimum reached! Gradient = 0)
          └────────────────────────► Parameter w""",
        "ascii_ar": """        دالة الخسارة
          ▲
          │  * x0 (نقطة البداية)
          │   \\
          │    * x1 (خطوة هبوط -η*grad)
          │     \\
          │      * x2
          │       \\____* x* (الوصول للقاع! التدرج = 0)
          └────────────────────────► الوزن العصبي w"""
    },
    "28": {
        "jargon": [
            ("Constrained Optimization", "Finding the highest elevation while staying strictly on a fenced walking path", "التحسين المقيد", "البحث عن أعلى قمة ممكنة مع الالتزام الصارم بالبقاء على مسار مسيج"),
            ("Lagrange Multiplier ($\\lambda$)", "The tension in the fence: how much higher you could climb if the fence expanded by 1 meter", "مضروب لاغرانج ($\\lambda$)", "قوة شد السياج / سعر الظل: كم سترتفع إضافياً لو توسع السياج متراً واحداً"),
            ("Contour Tangency", "The sweet spot where the objective contours kiss the constraint boundary without crossing", "تماس خطوط الكنتور", "نقطة التماس السحرية حيث يلامس مسار الهدف خط القيد دون أن يقطعه"),
            ("Constraint ($g(x) = 0$)", "The rigid boundary rule or budget limit that you are forbidden from violating", "القيد ($g(x) = 0$)", "السياج الحدي أو الميزانية المالية الصارمة التي يُحظر تجاوزها")
        ],
        "ascii_en": """        Contours of f(x, y)          Constraint Path g(x, y) = 0
               (100)                      /
              (  80  )                   /
             (   60   )                 /  At the optimum, grad(f)
            (    40    )────*──────────/   is PARALLEL to grad(g):
           (     20     )   │              grad(f) = λ * grad(g)
                            Tangent Kiss!""",
        "ascii_ar": """        خطوط كنتور الهدف f(x, y)       مسار القيد g(x, y) = 0
               (100)                      /
              (  80  )                   /
             (   60   )                 /  عند النقطة المثلى، يكون grad(f)
            (    40    )────*──────────/   موازياً تماماً لـ grad(g):
           (     20     )   │              grad(f) = λ * grad(g)
                            نقطة التماس!"""
    },
    "29": {
        "jargon": [
            ("Central Limit Theorem (CLT)", "The universal law of nature: adding up many small random wobbles always creates a bell curve", "مبرهنة النهاية المركزية", "القانون الكوني العظيم: جمع العديد من الصدف العشوائية المستقلة يفرز دوماً منحنى جرسي"),
            ("Gaussian / Normal Distribution", "The symmetrical bell curve shape where most values cluster near the center", "التوزيع الطبيعي / الغاوسي", "منحنى الجرس المتناظر الذي تتجمع أغلب القيم حول وسطه وتتلاشى تدريجياً على الأطراف"),
            ("Sample Mean ($\\bar{X}_n$)", "The average calculated across a batch of $n$ independent observations", "متوسط العينة ($\\bar{X}_n$)", "المعدل الحسابي المحسوب من دفعة تضم n من المشاهدات المستقلة"),
            ("Standard Error ($\\sigma / \\sqrt{n}$)", "The uncertainty band shrinking narrower as you collect more observations", "الخطأ المعياري ($\\sigma / \\sqrt{n}$)", "نطاق الشك الذي يضيق وينكمش كلما جمعت عدداً أكبر من الملاحظات"),
            ("Galton Board", "A pegboard where dropping marbles bounce randomly left and right, forming a bell curve", "لوحة غالتون", "لوح مسامير تتصادم فيه الكرات يمنة ويسرة عشوائياً لتشكل جرساً منتظماً في الأسفل")
        ],
        "ascii_en": """      Single Die (Flat)          Sum of 2 Dice (Triangle)       Sum of 30 Dice (Bell Curve)
        ┌──────────┐                     ▲                             ▲
        │          │                    / \\                           /   \\
        │          │                   /   \\                         /     \\
        └──────────┘                  /     \\                      .'       '.
         Uniform noise              Early clustering               Pure Gaussian Normal!""",
        "ascii_ar": """      نرد واحد (توزيع مسطح)       مجموع نردين (مثلث)             مجموع 30 نرداً (منحنى جرسي)
        ┌──────────┐                     ▲                             ▲
        │          │                    / \\                           /   \\
        │          │                   /   \\                         /     \\
        └──────────┘                  /     \\                      .'       '.
         ضجيج عشوائي منتظم            بداية التجمع المركزي           توزيع طبيعي غاوسي نقي!"""
    }
}

def build_jargon_table_en(jargon_list):
    lines = [
        "#### Jargon Decoder",
        "",
        "| Technical Term | Plain English Intuition | المصطلح بالعربية | المعنى البديهي المبسط |",
        "| :--- | :--- | :--- | :--- |"
    ]
    for term_en, mean_en, term_ar, mean_ar in jargon_list:
        lines.append(f"| {term_en} | {mean_en} | {term_ar} | {mean_ar} |")
    return "\n".join(lines)

def build_jargon_table_ar(jargon_list):
    lines = [
        "#### قاموس المصطلحات البسيطة",
        "",
        "| المصطلح التقني | المعنى البديهي بالإنجليزية | المصطلح العربي | المعنى البديهي المبسط |",
        "| :--- | :--- | :--- | :--- |"
    ]
    for term_en, mean_en, term_ar, mean_ar in jargon_list:
        lines.append(f"| {term_ar} | {mean_en} | {term_ar} | {mean_ar} |")
    return "\n".join(lines)

def process_file(filepath):
    num_str = os.path.basename(filepath)[:2]
    if num_str not in DATA:
        print(f"Skipping {filepath} (no entry in DATA)")
        return
    
    cfg = DATA[num_str]
    content = open(filepath, "r", encoding="utf-8").read()

    # If jargon decoder already inserted, skip or re-insert cleanly
    if "#### Jargon Decoder" in content:
        print(f"File {filepath} already has Jargon Decoder, skipping.")
        return

    # Check structure
    # We want to insert:
    # Under English Beat 1 (before Arabic section):
    #   1. Jargon Decoder
    #   2. Geometric & Visual Flow
    # Under Arabic Beat 1 (before :::simulation-widget):
    #   1. قاموس المصطلحات البسيطة
    #   2. المخطط البصري الهندسي

    # Look for Arabic split
    has_ar_split = False
    ar_pattern = r"(###\s+(?:الحدس|حدس)[^\n]*\n)"
    m_ar = re.search(ar_pattern, content)
    
    # If lesson 16-29 uses '---' to separate EN and AR
    if not m_ar:
        sim_pos = content.find(":::simulation-widget")
        beat1_text = content[:sim_pos] if sim_pos != -1 else content
        last_dash_idx = beat1_text.rfind("\n---\n")
        if last_dash_idx != -1 and last_dash_idx > 50:
            content = content[:last_dash_idx] + "\n\n### الحدس الفيزيائي والهندسي\n" + content[last_dash_idx + 5:]
            m_ar = re.search(ar_pattern, content)

    jargon_en_md = build_jargon_table_en(cfg["jargon"])
    flow_en_md = f"#### Geometric & Visual Flow\n\n```\n{cfg['ascii_en']}\n```"

    jargon_ar_md = build_jargon_table_ar(cfg["jargon"])
    flow_ar_md = f"#### المخطط البصري الهندسي\n\n```\n{cfg['ascii_ar']}\n```"

    # Find where English Beat 1 ends
    m_ar = re.search(ar_pattern, content)
    if not m_ar:
        print(f"Error: Could not locate Arabic split in {filepath}")
        return

    en_end_idx = m_ar.start()
    en_part = content[:en_end_idx].rstrip()
    rest = content[en_end_idx:]

    # Append Jargon and Visual Flow to English part
    new_en_part = f"{en_part}\n\n{jargon_en_md}\n\n{flow_en_md}\n\n"

    # In rest, find where Arabic Beat 1 ends (before :::simulation-widget or ### Mathematical Foundations)
    sim_idx = rest.find(":::simulation-widget")
    if sim_idx == -1:
        sim_idx = rest.find("### Mathematical Foundations")
    if sim_idx == -1:
        sim_idx = rest.find("## Beat 2")

    if sim_idx == -1:
        print(f"Error: Could not locate end of Beat 1 in {filepath}")
        return

    ar_part = rest[:sim_idx].rstrip()
    after_sim = rest[sim_idx:]

    new_ar_part = f"{ar_part}\n\n{jargon_ar_md}\n\n{flow_ar_md}\n\n"

    new_content = new_en_part + new_ar_part + after_sim
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"✔ Successfully enhanced {os.path.basename(filepath)}")

if __name__ == "__main__":
    import glob
    files = sorted(glob.glob("curriculum/track-1-math/*.okvir.md"))
    print(f"Processing {len(files)} files...")
    for f in files:
        process_file(f)
