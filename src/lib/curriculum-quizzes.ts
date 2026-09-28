import type { DiagnosticQuestion } from './types';

export const CURRICULUM_QUIZ_BATTERIES: Record<string, DiagnosticQuestion[]> = {
  // =========================================================================
  // TRACK 1: MATHEMATICAL FOUNDATIONS
  // =========================================================================
  'linear-algebra-vectors': [
    {
      id: 'vec-q1-geometric-chaining',
      depthTier: 1,
      prompt: {
        en: 'Imagine a drone flying in 2D space. It executes displacement vector u, followed immediately by displacement vector v. Under what geometric condition does the drone\'s net distance from its origin strictly equal the sum of the distances of the two individual legs (||u + v|| = ||u|| + ||v||)?',
        ar: 'تخيل طائرة درون تتحرك في فضاء ثنائي الأبعاد. قامت بإزاحة يمثلها المتجه u، تلتها مباشرة إزاحة أخرى يمثلها المتجه v. تحت أي شرط هندسي تكون المسافة الصافية للدرون عن نقطة الانطلاق مساوية تماماً لمجموع مسافتي المرحلتين المنفردتين (||u + v|| = ||u|| + ||v||)؟',
      },
      latexAnchor: '\\|\\mathbf{u} + \\mathbf{v}\\|_2 = \\|\\mathbf{u}\\|_2 + \\|\\mathbf{v}\\|_2 \\iff \\theta = 0^\\circ',
      options: [
        {
          text: {
            en: 'When u and v are collinear and point in the exact same direction (θ = 0°)',
            ar: 'عندما يكون المتجهان u و v على نفس خط الاستقامة ويشيران تماماً إلى نفس الاتجاه (θ = 0°)',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'By the Triangle Inequality ||u + v|| <= ||u|| + ||v||, equality holds if and only if the vectors lie along the same ray. Any non-zero angular bend creates a shortcut hypotenuse strictly shorter than the sum of the legs.',
            ar: 'وفقاً لمتباينة المثلث ||u + v|| <= ||u|| + ||v||، تتحقق المساواة فقط وفقط إذا كان المتجهان على نفس الشعاع. أي انحراف زاوي غير صفري يصنع وتراً مباشراً أقصر بالضرورة من مجموع المسارين.',
          },
        },
        {
          text: {
            en: 'When u and v are strictly orthogonal (θ = 90°)',
            ar: 'عندما يكون المتجهان u و v متعامدين تماماً (θ = 90°)',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Diagnoses Pythagorean confusion: when orthogonal, ||u + v||^2 = ||u||^2 + ||v||^2, so ||u + v|| < ||u|| + ||v||.',
            ar: 'يشخص الخلط مع مبرهنة فيثاغورس: عند التعامد، يكون طول المحصلة أقصر قطعاً من المجموع الجبري لطولي المتجهين.',
          },
        },
        {
          text: {
            en: 'When u and v have equal magnitudes (||u|| = ||v||) regardless of angle',
            ar: 'عندما يكون للمتجهين نفس المقدار (||u|| = ||v||) بغض النظر عن الزاوية بينهما',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Diagnoses confusing magnitude equality with directional alignment. Equal magnitudes at an angle (e.g. 120°) yield ||u + v|| = ||u||, not 2||u||.',
            ar: 'يشخص الخلط بين تساوي المقدار والتطابق الاتجاهي. إذا تساوى المتجهان وكانت الزاوية بينهما 120° فإن المحصلة تساوي طول أحدهما فقط.',
          },
        },
        {
          text: {
            en: 'When u and v point in opposite directions along the same line (θ = 180°)',
            ar: 'عندما يشير المتجهان في اتجاهين متعاكسين على نفس الخط (θ = 180°)',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Opposing vectors cancel: ||u + v|| = |||u|| - ||v|||, which is the minimal resultant, not the maximal sum.',
            ar: 'المتجهات المتعاكسة تطرح أطوالها: ||u + v|| = |||u|| - ||v|||، وهو أدنى ناتج ممكن وليس الأقصى.',
          },
        },
      ],
    },
    {
      id: 'vec-q2-norm-homogeneity',
      depthTier: 2,
      prompt: {
        en: 'Consider the 2D vector v = [-3, 4]^T with normalized unit vector u = v / ||v||. What is the Euclidean norm ||α u|| when scalar α = -7?',
        ar: 'لتكن لدينا المتجهة ثنائية الأبعاد v = [-3, 4]^T مع متجه الوحدة المعياري u = v / ||v||. ما هي قيمة المعيار الإقليدي ||α u|| عندما يكون المعامل القياسي α = -7؟',
      },
      latexAnchor: '\\|\\alpha \\mathbf{u}\\|_2 = |\\alpha| \\cdot \\|\\mathbf{u}\\|_2 = |-7| \\times 1 = 7',
      options: [
        {
          text: { en: '7', ar: '7' },
          correct: true,
          diagnosticFeedback: {
            en: 'The Euclidean norm satisfies absolute homogeneity: ||α x|| = |α| ||x||. Since u is a unit vector, ||-7 u|| = |-7| · 1 = 7. A norm represents geometric length and is strictly non-negative.',
            ar: 'يحقق المعيار الإقليدي خاصية التجانس المطلق: ||α x|| = |α| ||x||. بما أن u متجه وحدة، فإن ||-7 u|| = |-7| · 1 = 7. المعيار يمثل طولاً هندسياً وهو غير سالب دوماً.',
          },
        },
        {
          text: { en: '-7', ar: '-7' },
          correct: false,
          diagnosticFeedback: {
            en: 'Violates the non-negativity axiom of norms (||w|| >= 0). Scalars pull out through absolute values, not linear identity.',
            ar: 'ينتهك بديهية لا-سالبية المعايير (||w|| >= 0). المعاملات تخرج بالقيمة المطلقة وليس بصورتها الجبرية السالبة.',
          },
        },
        {
          text: { en: '35', ar: '35' },
          correct: false,
          diagnosticFeedback: {
            en: 'Diagnoses scaling vector v directly (||v|| = 5, 7 × 5 = 35) instead of scaling the normalized unit vector u.',
            ar: 'يشخص ضرب المتجه v مباشرة (حيث طوله 5، و 7 × 5 = 35) بدلاً من ضرب متجه الوحدة u.',
          },
        },
        {
          text: { en: 'sqrt(7)', ar: 'sqrt(7)' },
          correct: false,
          diagnosticFeedback: {
            en: 'Incorrectly applying square root to the scalar multiplier.',
            ar: 'تطبيق خاطئ للجذر التربيعي على المعامل القياسي دون مبرر.',
          },
        },
      ],
    },
    {
      id: 'vec-q3-high-dimensional-norm',
      depthTier: 3,
      prompt: {
        en: 'Vector a in R^2 has coordinates [3, 4]^T. High-dimensional vector b in R^10000 has every single coordinate equal to 0.05. Which statement correctly compares their Euclidean lengths ||a|| and ||b||?',
        ar: 'المتجه a في R^2 له المركبتان [3, 4]^T. المتجه عالي الأبعاد b في R^10000 له 10000 مركبة، كل منها تساوي 0.05 تماماً. أي العبارات التالية تقارن طوليهما الإقليديين ||a|| و ||b|| بشكل صحيح؟',
      },
      latexAnchor: '\\|\\mathbf{a}\\| = \\sqrt{3^2 + 4^2} = 5, \\quad \\|\\mathbf{b}\\| = \\sqrt{10000 \\times (0.05)^2} = \\sqrt{25} = 5',
      options: [
        {
          text: {
            en: 'Both vectors have the exact same Euclidean magnitude: ||a|| = ||b|| = 5',
            ar: 'كلا المتجهين لهما نفس الطول الإقليدي تماماً: ||a|| = ||b|| = 5',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Correct! ||a|| = sqrt(9 + 16) = 5. For b: sqrt(10000 × 0.0025) = sqrt(25) = 5. High-dimensional vectors accumulate massive length from thousands of individually tiny components.',
            ar: 'صحيح! ||a|| = sqrt(25) = 5. وبالنسبة لـ b: sqrt(10000 × 0.0025) = sqrt(25) = 5. في الفضاءات عالية الأبعاد، تتراكم أطوال هائلة من آلاف المركبات الصغيرة.',
          },
        },
        {
          text: {
            en: 'a is drastically larger than b because coordinates 3 and 4 dwarf 0.05',
            ar: 'a أكبر بكثير من b لأن المركبتين 3 و 4 أكبر بمراحل من 0.05',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Coordinate myopia: inspecting individual component values rather than aggregating squared mass across all dimensions.',
            ar: 'قصر نظر إحداثي: تقييم حجم المتجه بالنظر لقيم العناصر الفردية متجاهلاً تراكم مربعاتها عبر آلاف الأبعاد.',
          },
        },
        {
          text: {
            en: 'b is much larger than a because 10000 × 0.05 = 500 > 5',
            ar: 'b أطول بكثير من a لأن مجموع المركبات 10000 × 0.05 = 500 > 5',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Confusing the L1 Manhattan norm (sum of coordinates) with the L2 Euclidean norm (square root of sum of squares).',
            ar: 'الخلط بين معيار مانهاتن L1 (المجموع الخطي للمركبات) والمعيار الإقليدي L2.',
          },
        },
        {
          text: {
            en: 'Vectors in different dimensional spaces cannot be compared by Euclidean norm',
            ar: 'لا يمكن مقارنة أطوال المتجهات ذات الأبعاد المختلفة بالمعيار الإقليدي',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Confusing vector addition incompatibility (cannot add R^2 to R^10000) with scalar norm evaluation (both produce real numbers in R+).',
            ar: 'الخلط بين استحالة جمع متجهين من بعدين مختلفين، وبين حساب معياريهما (كلاهما ينتج أعداداً حقيقية قابلة للمقارنة).',
          },
        },
      ],
    },
  ],

  'dot-product-geometry': [
    {
      id: 'dot-q1-geometric-projection',
      depthTier: 1,
      prompt: {
        en: 'When computing the scalar projection (u · v) / ||v||, what does the sign and geometric magnitude represent on the canvas?',
        ar: 'عند حساب الإسقاط القياسي (u · v) / ||v||، ماذا يمثل كل من الإشارة والمقدار الهندسي على اللوحة؟',
      },
      latexAnchor: '\\text{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|} = \\|\\mathbf{u}\\| \\cos\\theta',
      options: [
        {
          text: {
            en: 'The signed length of the perpendicular shadow cast by u onto the infinite line spanned by v',
            ar: 'الطول ذو الإشارة للظل العمودي المسقط من u على الخط الممتد عبر v',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Geometrically, (u · v) / ||v|| = ||u|| cos θ. Dropping a perpendicular from the tip of u onto the line of v forms a right triangle whose signed base length along v is ||u|| cos θ.',
            ar: 'هندسياً، (u · v) / ||v|| = ||u|| cos θ. إسقاط عمود من طرف u على محور v يشكل مثلثاً قائم الزاوية قاعدته الموجهة بطول ||u|| cos θ.',
          },
        },
        {
          text: {
            en: 'The area of the parallelogram formed by vectors u and v',
            ar: 'مساحة متوازي الأضلاع الذي يشكله المتجهان u و v',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Confusing dot product projection with the cross product magnitude (||u × v|| = ||u|| ||v|| sin θ).',
            ar: 'الخلط بين الإسقاط القياسي ومقدار الجداء الاتجاهي (الذي يعطي مساحة متوازي الأضلاع عبر sin θ).',
          },
        },
        {
          text: {
            en: 'The angle in radians between u and v',
            ar: 'الزاوية بالراديان بين المتجهين u و v',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'The projection has physical units of length, not angular measure in radians.',
            ar: 'الإسقاط يمتلك وحدة طول فيزيائية وليس قياساً بالراديان.',
          },
        },
        {
          text: {
            en: 'The shortest distance from the origin to the line connecting the tips of u and v',
            ar: 'أقصر مسافة من نقطة الأصل إلى الخط الواصل بين طرفي المتجهين u و v',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Geometric displacement confusion with triangle altitude.',
            ar: 'خلط هندسي بخلط مسقط المتجه مع ارتفاع المثلث المتشكل عن نقطة الأصل.',
          },
        },
      ],
    },
    {
      id: 'dot-q2-orthogonal-residual',
      depthTier: 2,
      prompt: {
        en: 'Decompose u = [3, 1]^T onto v = [2, 0]^T into parallel projection p and residual r = u - p. What are p, r, and their inner product p · r?',
        ar: 'حلل المتجه u = [3, 1]^T على v = [2, 0]^T إلى إسقاط موازٍ p وباقٍ متعامد r = u - p. ما هما p و r وجداؤهما الداخلي p · r؟',
      },
      latexAnchor: '\\mathbf{p} = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{v}\\|^2}\\mathbf{v} = \\begin{bmatrix} 3 \\\\ 0 \\end{bmatrix}, \\quad \\mathbf{r} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}, \\quad \\mathbf{p} \\cdot \\mathbf{r} = 0',
      options: [
        {
          text: {
            en: 'p = [3, 0]^T, r = [0, 1]^T, and p · r = 0',
            ar: 'p = [3, 0]^T، و r = [0, 1]^T، و p · r = 0',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'proj_v(u) = ((3·2 + 1·0) / 4) [2, 0]^T = (6/4)[2, 0]^T = [3, 0]^T. Residual r = [3, 1]^T - [3, 0]^T = [0, 1]^T. By the fundamental invariant of orthogonal projection, p · r = 0.',
            ar: 'صيغة الإسقاط تعطي p = [3, 0]^T، والباقي r = [0, 1]^T. وبحكم الثابت الأساسي للإسقاط المتعامد، فإن جداءهما القياسي صفري p · r = 0.',
          },
        },
        {
          text: {
            en: 'p = [6, 0]^T, r = [-3, 1]^T, and p · r = -18',
            ar: 'p = [6, 0]^T، و r = [-3, 1]^T، و p · r = -18',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Omitting the denominator ||v||^2 in the projection formula, multiplying v directly by the raw dot product 6.',
            ar: 'نسيان القسمة على مربع المعيار ||v||^2 في صيغة الإسقاط وضرب v مباشرة في الجداء 6.',
          },
        },
        {
          text: {
            en: 'p = [1.5, 0]^T, r = [1.5, 1]^T, and p · r = 2.25',
            ar: 'p = [1.5, 0]^T، و r = [1.5, 1]^T، و p · r = 2.25',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Squaring the denominator twice (dividing by ||v||^4 = 16).',
            ar: 'تربيع المقام مرتين (القسمة على 16 بدلاً من 4).',
          },
        },
        {
          text: {
            en: 'p = [3, 1]^T, r = [0, 0]^T, and p · r = 0',
            ar: 'p = [3, 1]^T، و r = [0, 0]^T، و p · r = 0',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Assuming any vector is already its own projection onto an arbitrary non-parallel target.',
            ar: 'افتراض خاطئ بأن أي متجه هو إسقاط لنفسه على هدف غير موازٍ له.',
          },
        },
      ],
    },
    {
      id: 'dot-q3-attention-magnitude-trap',
      depthTier: 3,
      prompt: {
        en: 'In an AI search engine, Query q has dot products with two Documents: q · d1 = 20 and q · d2 = 10. An engineer asserts: "Document 1 is definitely twice as semantically aligned as Document 2." Why is this assertion a dangerous misconception?',
        ar: 'في محرك بحث ذكاء اصطناعي، يبلغ الجداء القياسي لمتجه الاستعلام q مع وثيقتين: q · d1 = 20 و q · d2 = 10. قال مهندس: "الوثيقة 1 أكثر توافقاً دلالياً بمرتين من الوثيقة 2." لماذا يُعد هذا الاستنتاج خطأً مفاهيمياً فادحاً؟',
      },
      latexAnchor: '\\mathbf{q} \\cdot \\mathbf{d} = \\|\\mathbf{q}\\| \\|\\mathbf{d}\\| \\cos\\theta \\implies \\cos\\theta = \\frac{\\mathbf{q} \\cdot \\mathbf{d}}{\\|\\mathbf{q}\\| \\|\\mathbf{d}\\|}',
      options: [
        {
          text: {
            en: 'The dot product couples angular alignment with vector lengths; a verbose document with a huge norm can have a larger dot product despite poor angular alignment',
            ar: 'الجداء القياسي يدمج الزاوية مع أطوال المتجهات؛ فالوثيقة الطويلة ذات المعيار الضخم قد تحقق جداءً قياسياً كبيراً رغم ضعف توافقها الزاوي',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'If ||d1|| = 200, cos θ1 = 20/200 = 0.1 (almost orthogonal 84°), whereas if ||d2|| = 10, cos θ2 = 10/10 = 1.0 (perfect collinearity 0°). Doc 2 is perfectly aligned, while Doc 1 won purely on text length.',
            ar: 'لو كان طول d1 هو 200 فإن جيب التمام 0.1 (زاوية 84° شبه متعامدة)، بينما لو كان طول d2 هو 10 فإن جيب التمام 1.0 (تطابق تام). تفوقت الوثيقة 1 فقط بسبب طولها.',
          },
        },
        {
          text: {
            en: 'Dot products can only compare vectors if their components are all positive integers',
            ar: 'الجداء القياسي لا يقارن المتجهات إلا إذا كانت جميع عناصرها أعداداً صحيحة موجبة',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Inner products are defined over any real or complex vector space regardless of sign or integrality.',
            ar: 'الجداء الداخلي معرف على أي فضاء متجهي حقيقي أو مركب بغض النظر عن الإشارة أو الأعداد الصحيحة.',
          },
        },
        {
          text: {
            en: 'The Cauchy-Schwarz inequality forbids dot products from exceeding 1.0',
            ar: 'متباينة كوشي-شفارتز تمنع الجداء القياسي من تجاوز القيمة 1.0',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Confusing cosine similarity (bounded in [-1, 1]) with raw dot products (bounded by ||u|| ||v||).',
            ar: 'الخلط بين تشابه جيب التمام (المحصور بين -1 و 1) والجداء القياسي الخام.',
          },
        },
        {
          text: {
            en: 'Dot products in high dimensions invert signs randomly due to floating-point rounding',
            ar: 'الجداء القياسي في الأبعاد العالية يعكس إشارته عشوائياً بسبب التقريب الرقمي',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Floating-point rounding errors do not randomly flip macroscopic mathematical signs.',
            ar: 'أخطاء التقريب الرقمي لا تقلب الإشارات الرياضية بشكل عشوائي.',
          },
        },
      ],
    },
  ],

  'gradient-vector': [
    {
      id: 'grad-q1-contour-orthogonality',
      depthTier: 1,
      prompt: {
        en: 'If you walk along a contour curve of constant elevation (f(x, y) = c) on a mountain, what is the geometric angle between your velocity vector and the gradient vector ∇f(x, y)?',
        ar: 'إذا كنت تسير على طول خط كنتوري ثابت الارتفاع تماماً (f(x, y) = c) على جبل، فما هي الزاوية الهندسية بين متجه سرعتك ومتجه التدرج ∇f(x, y)؟',
      },
      latexAnchor: 'D_{\\mathbf{v}} f = \\nabla f(\\mathbf{x}) \\cdot \\mathbf{v} = 0 \\implies \\theta = 90^\\circ \\quad (\\nabla f \\perp \\text{Contour})',
      options: [
        {
          text: {
            en: 'Exactly 90° (orthogonal); the gradient is perpendicular to the tangent of the contour line',
            ar: '90° تماماً (متعامدان)؛ التدرج عمودي دوماً على المماس لخط الكنتور',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Along a level curve, elevation does not change (df = 0). Since directional derivative D_v f = ∇f · v = 0 and both vectors are non-zero, cos θ = 0, proving they are strictly perpendicular.',
            ar: 'على طول خط الكنتور، التغير في الارتفاع معدوم (df = 0). وبما أن المشتقة الاتجاهية ∇f · v = 0، فإن الزاوية بينهما 90° حتماً.',
          },
        },
        {
          text: {
            en: '0° (parallel); the gradient points tangent to the path of constant elevation',
            ar: '0° (متوازيان)؛ التدرج يشير في نفس اتجاه المماس لمسار الارتفاع الثابت',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'If gradient were parallel to contour, moving along the contour would yield maximum ascent rather than zero change.',
            ar: 'لو كان التدرج موازياً لخط الكنتور، لكان السير عليه ينتج أقصى صعود ممكن بدلاً من ثبات الارتفاع.',
          },
        },
        {
          text: {
            en: '180° (anti-parallel); the gradient points opposite to the direction of motion',
            ar: '180° (متعاكسان)؛ التدرج يشير عكس اتجاه الحركة تماماً',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Confusing zero rate of change with steepest descent (-∇f).',
            ar: 'الخلط بين انعدام التغير ومسار أقصى انحدار هبوطي (-∇f).',
          },
        },
        {
          text: {
            en: 'The angle varies unpredictably depending on curvature',
            ar: 'تختلف الزاوية بشكل غير متوقع اعتماداً على تقعر السطح وتحدبه',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Level curve orthogonality is a universal invariant of all differentiable scalar fields.',
            ar: 'تعامد التدرج مع خطوط الكنتور هو خاصية رياضية ثابتة لجميع الحقول القياسية القابلة للاشتقاق.',
          },
        },
      ],
    },
    {
      id: 'grad-q2-directional-derivative',
      depthTier: 2,
      prompt: {
        en: 'For f(x, y) = 3x^2 + 2y^2 at point (2, -1), compute the directional derivative along the unit direction u = [3/5, -4/5]^T.',
        ar: 'لدالة الهدف f(x, y) = 3x^2 + 2y^2 عند النقطة (2, -1)، احسب المشتقة الاتجاهية على طول اتجاه الوحدة u = [3/5, -4/5]^T.',
      },
      latexAnchor: '\\nabla f(2, -1) = \\begin{bmatrix} 12 \\\\ -4 \\end{bmatrix}, \\quad D_{\\hat{\\mathbf{u}}} f = 12(3/5) + (-4)(-4/5) = 10.4',
      options: [
        {
          text: { en: '10.4 (or 52/5)', ar: '10.4 (أو 52/5)' },
          correct: true,
          diagnosticFeedback: {
            en: '∇f = [6x, 4y]^T. At (2, -1), ∇f = [12, -4]^T. D_u f = 12(3/5) + (-4)(-4/5) = 36/5 + 16/5 = 52/5 = 10.4.',
            ar: 'التدرج هو [12, -4]^T. المشتقة الاتجاهية هي الجداء القياسي مع متجه الوحدة: 12(3/5) + (-4)(-4/5) = 52/5 = 10.4.',
          },
        },
        {
          text: { en: '4.0 (or 20/5)', ar: '4.0 (أو 20/5)' },
          correct: false,
          diagnosticFeedback: {
            en: 'Sign error: calculating 36/5 - 16/5 = 20/5, failing to note (-4) × (-4/5) = +16/5.',
            ar: 'خطأ إشارة: طرح 16/5 بدلاً من جمعها نتيجة ضرب سالب في سالب.',
          },
        },
        {
          text: { en: '52', ar: '52' },
          correct: false,
          diagnosticFeedback: {
            en: 'Using the unnormalized vector [3, -4]^T without dividing by norm 5.',
            ar: 'استخدام المتجه غير المعياري [3, -4]^T دون قسمته على طوله 5.',
          },
        },
        {
          text: { en: 'sqrt(160) ≈ 12.65', ar: 'sqrt(160) ≈ 12.65' },
          correct: false,
          diagnosticFeedback: {
            en: 'Reporting the maximum possible rate of change ||∇f|| instead of the directional derivative along u.',
            ar: 'حساب أقصى معدل تغير ممكن ||∇f|| بدلاً من المشتقة المحددة بالاتجاه u.',
          },
        },
      ],
    },
    {
      id: 'grad-q3-global-beacon-fallacy',
      depthTier: 3,
      prompt: {
        en: 'On an elliptic convex loss bowl L(w1, w2) = 10w1^2 + w2^2, an engineer claims: "The negative gradient -∇L(w) always points directly at the global minimum at (0, 0)." Why is this false?',
        ar: 'على وعاء خسارة محدب بيضاوي L(w1, w2) = 10w1^2 + w2^2، قال مهندس: "التدرج السالب -∇L(w) يشير دوماً مباشرة نحو الحد الأدنى العام عند (0, 0)." لماذا يُعد هذا الادعاء خاطئاً؟',
      },
      latexAnchor: '-\\nabla L(1, 1) = \\begin{bmatrix} -20 \\\\ -2 \\end{bmatrix} \\not\\parallel \\begin{bmatrix} -1 \\\\ -1 \\end{bmatrix}',
      options: [
        {
          text: {
            en: 'The gradient is a local property of instantaneous steepest descent, not a global beacon; on anisotropic surfaces, -∇L points perpendicular to contour lines, causing oscillations across ravines',
            ar: 'التدرج خاصية موضعية لحظية لأقصى انحدار وليس بوصلة عامة نحو الهدف؛ على السطوح متباينة الخواص يشير التدرج السالب عمودياً على خطوط الكنتور مسبباً تذبذباً عبر الأودية',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'At (1, 1), the vector pointing to (0,0) is [-1, -1]^T. But -∇L(1, 1) = [-20, -2]^T, which points heavily leftward. Only for perfectly isotropic circular bowls (L = c||w||^2) does the gradient align with the origin.',
            ar: 'عند (1, 1)، المتجه نحو الأصل هو [-1, -1]^T. بينما التدرج المعاكس هو [-20, -2]^T وهو ينحرف بشدة نحو اليسار، مما يسبب التذبذب الشهير في الانحدار التدرجي.',
          },
        },
        {
          text: {
            en: 'Because negative gradients point toward the maximum, not the minimum',
            ar: 'لأن التدرج السالب يشير نحو الحد الأقصى وليس الأدنى',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Sign confusion: +∇f points toward ascent, -∇f points toward descent.',
            ar: 'خلط في الإشارات: +∇f هو اتجاه الصعود و -∇f هو اتجاه الهبوط.',
          },
        },
        {
          text: {
            en: 'Convex functions do not possess gradients outside the origin',
            ar: 'الدوال المحدبة لا تمتلك تدرجات خارج نقطة الأصل',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Smooth convex functions are continuously differentiable everywhere.',
            ar: 'الدوال المحدبة الملساء قابلة للاشتقاق في كامل نطاقها.',
          },
        },
        {
          text: {
            en: 'The gradient vanishes to zero at all points where w1 != w2',
            ar: 'التدرج يتلاشى إلى الصفر عند جميع النقاط التي لا يتساوى فيها w1 مع w2',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'The gradient vanishes only at the unique optimum (0, 0).',
            ar: 'التدرج لا ينعدم إلا عند النقطة المثلى (0, 0).',
          },
        },
      ],
    },
  ],

  // =========================================================================
  // TRACK 2: PROGRAMMING & DATA SYSTEMS
  // =========================================================================
  'numpy-vectorization': [
    {
      id: 'np-q1-strides-memory',
      depthTier: 1,
      prompt: {
        en: 'In NumPy, slicing a 100-million-element 2D array like arr[::2, ::-1] executes in microseconds without allocating new RAM. What low-level memory mechanism makes this possible?',
        ar: 'في NumPy، يتم تنفيذ شريحة مصفوفة ثنائية الأبعاد مثل arr[::2, ::-1] في أجزاء من الميكروثانية دون حجز ذاكرة جديدة. ما الآلية الهيكلية منخفضة المستوى التي تجعل ذلك ممكناً؟',
      },
      latexAnchor: '\\text{Offset}(\\vec{i}) = \\sum_{k=0}^{d-1} i_k \\cdot s_k, \\quad s_k \\in \\mathbb{Z}^+',
      options: [
        {
          text: {
            en: 'It constructs a new ndarray header with modified metadata (shape, strides, pointer offset) pointing to the existing contiguous C memory buffer without copying data',
            ar: 'تنشئ ترويسة ndarray جديدة تحتوي على بيانات وصفية معدلة (shape، strides، وإزاحة المؤشر) تشير إلى نفس المخزن المؤقت في ذاكرة C دون نسخ البيانات',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'NumPy arrays decouple metadata from raw data blocks. Slicing with steps or inversions merely recalculates the byte-stride vector and start pointer in O(1) time.',
            ar: 'تفصل مصفوفات NumPy البيانات الوصفية عن كتلة الذاكرة الخام. إن أخذ الشرائح بخطوات يعيد ببساطة حساب خطوات البايت ومؤشر البداية بتعقيد O(1).',
          },
        },
        {
          text: {
            en: 'It creates a lazy Python generator iterator that evaluates elements only upon access',
            ar: 'تنشئ مولداً تكرارياً كسولاً (generator) لا يقيم العناصر إلا عند وصول الشيفرة للقيم الفردية',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'NumPy views are eager C-level memory maps, not lazy Python iterator objects.',
            ar: 'عروض NumPy هي خرائط ذاكرة فورية على مستوى لغة C وليست مكررات Python كسولة.',
          },
        },
        {
          text: {
            en: 'It performs SIMD compression in the L1 CPU cache to compact non-contiguous elements',
            ar: 'تجري ضغطاً لذاكرة SIMD على مستوى كاش L1 للمعالج لدمج العناصر غير المتجاورة',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Slicing is an OS pointer operation; SIMD is used during mathematical vector arithmetic.',
            ar: 'إنشاء الشرائح هو عملية مؤشرات وبيانات وصفية؛ بينما تُستخدم تعليمات SIMD أثناء تنفيذ العمليات الحسابية.',
          },
        },
        {
          text: {
            en: 'The OS kernel marks pages Copy-on-Write (CoW), delaying allocation until writes occur',
            ar: 'يعلم نظام التشغيل صفحات الذاكرة كـ "نسخ عند الكتابة" (Copy-on-Write)',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Writing to a NumPy view directly mutates the shared base buffer without triggering OS copy-on-write.',
            ar: 'الكتابة على عرض NumPy تعدل مباشرة في المخزن المشترك دون إطلاق نسخ عند الكتابة لنظام التشغيل.',
          },
        },
      ],
    },
    {
      id: 'np-q2-view-vs-copy',
      depthTier: 2,
      prompt: {
        en: 'Given arr = np.array([[10, 20, 30], [40, 50, 60]]), we set view_slice = arr[:, 1:] and copy_slice = arr[:, [1, 2]]. If view_slice[0, 0] = 99 and copy_slice[1, 1] = 88, what are arr[0, 1] and arr[1, 2]?',
        ar: 'بفرض arr = np.array([[10, 20, 30], [40, 50, 60]])، عرّفنا view_slice = arr[:, 1:] و copy_slice = arr[:, [1, 2]]. إذا كتبنا view_slice[0, 0] = 99 و copy_slice[1, 1] = 88، ما قيمتا arr[0, 1] و arr[1, 2]؟',
      },
      latexAnchor: '\\text{arr}[:, 1:] \\to \\text{View}, \\quad \\text{arr}[:, [1, 2]] \\to \\text{Fancy Indexing (Copy)}',
      options: [
        {
          text: {
            en: '99 and 60 — Basic slicing creates a view sharing memory; integer array indexing triggers fancy indexing which creates an independent copy',
            ar: '99 و 60 — لأن أخذ الشرائح البسيط ينشئ عرضاً يشارك الذاكرة؛ بينما الفهرسة بمصفوفات أعداد صحيحة تطلق فهرسة متقدمة تخصص نسخة مستقلة',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Basic slices return views because regular strides express the selection. Fancy indexing (lists/arrays of indices) cannot guarantee regular stride spacing, so NumPy always allocates a fresh buffer.',
            ar: 'ينتج عن الشرائح البسيطة عروض لأن الذاكرة المنتقاة يمكن تمثيلها بخطوات منتظمة. أما الفهرسة المتقدمة فلا تضمن انتظام الخطوات في الذاكرة، لذا تنشئ NumPy نسخة مستقلة.',
          },
        },
        {
          text: {
            en: '99 and 88 — Both slice notations create views into arr',
            ar: '99 و 88 — كلا شكلي الفهرسة ينشئان عروضاً على arr',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Passing index lists or boolean masks forces an eager memory copy in NumPy.',
            ar: 'تمرير قوائم الفهارس أو الأقنعة المنطقية يجبر NumPy على حجز نسخة ذاكرة جديدة.',
          },
        },
        {
          text: {
            en: '20 and 60 — NumPy arrays are immutable when sliced',
            ar: '20 و 60 — مصفوفات NumPy غير قابلة للتعديل عند أخذ الشرائح',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'ndarray buffers are mutable in-place by default.',
            ar: 'مصفوفات ndarray قابلة للتعديل في نفس موضع الذاكرة افتراضياً.',
          },
        },
        {
          text: {
            en: '20 and 88 — Basic slicing copies elements, while integer indexing locks pointers',
            ar: '20 و 88 — أخذ الشرائح البسيط ينسخ العناصر، بينما فهرسة القوائم تقفل المؤشرات',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Reversing the view/copy contract: basic slicing is a view, fancy indexing is a copy.',
            ar: 'عكس قاعدة العرض والنسخ تماماً: الشرائح البسيطة هي عروض، والفهرسة المتقدمة بالقوائم هي نسخ.',
          },
        },
      ],
    },
    {
      id: 'np-q3-broadcasting-bug',
      depthTier: 3,
      prompt: {
        en: 'A loss function computes np.mean((y_true - y_pred) ** 2) where y_true has shape (10000,) and y_pred has shape (10000, 1). Why does this code silently consume 800 MB of RAM or distort the MSE loss?',
        ar: 'تحسب دالة خسارة np.mean((y_true - y_pred) ** 2) حيث أبعاد y_true هي (10000,) وأبعاد y_pred هي (10000, 1). لماذا تستهلك هذه الشيفرة صمتاً 800 ميغابايت من الذاكرة أو تشوه مقياس الخطأ؟',
      },
      latexAnchor: '(10000,) \\ominus (10000, 1) \\longrightarrow (10000, 10000) \\implies 10^8 \\text{ elements}',
      options: [
        {
          text: {
            en: 'NumPy broadcasts (10000,) as (1, 10000) against (10000, 1), constructing a massive 10000 × 10000 matrix comparing every prediction against every target',
            ar: 'تقوم NumPy ببث (10000,) كـ (1, 10000) مقابل (10000, 1)، مما يولد مصفوفة هائلة بحجم 10000 × 10000 تحسب الفرق بين كل توقع وكل هدف',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Because trailing dimensions align, broadcasting expands both arrays to a 10000 × 10000 matrix (10^8 float64 elements ≈ 800 MB). The result is the average over all N^2 cross-sample errors instead of N sample errors.',
            ar: 'تعتبر قواعد البث (10000,) كـ (1, 10000) مقابل (10000, 1)، مما يولد مصفوفة 10000 × 10000 (~800 ميغابايت). القيمة الناتجة هي متوسط أخطاء 100 مليون زوج بدلاً من 10 آلاف عينة.',
          },
        },
        {
          text: {
            en: 'Python garbage collector leaks float arrays inside the exponent operator ** 2',
            ar: 'جامع القمامة في Python يسرّب مصفوفات الأعداد العشرية الناتجة عن عملية الرفع للأس ** 2',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'The memory spike is caused by NumPy broadcasting rules allocating an (N, N) tensor, not GC leaks.',
            ar: 'الارتفاع الحاد في الذاكرة ناتج عن حجز مصفوفة ثنائية الأبعاد (N, N) بفعل قواعد البث وليس بسبب جامع القمامة.',
          },
        },
        {
          text: {
            en: 'np.mean defaults to axis 0 when a 2D array is passed, returning a vector',
            ar: 'الدالة np.mean تعتمد افتراضياً المحور 0 عند تمرير مصفوفة ثنائية الأبعاد فتعيد متجهاً',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'np.mean without axis argument flattens the array and computes the global scalar mean.',
            ar: 'عند استدعاء np.mean دون تحديد axis، فإنها تحسب المتوسط العام لجميع العناصر وتعيد قيمة قياسية.',
          },
        },
        {
          text: {
            en: 'Subtracting 1D arrays from 2D arrays sets all non-diagonal elements to NaN',
            ar: 'طرح مصفوفة أحادية من أخرى ثنائية يحول جميع العناصر غير القطرية إلى NaN',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Broadcasting creates valid finite numbers across the entire outer grid; it does not inject NaNs.',
            ar: 'عملية البث تجري حسابات عددية صحيحة على كامل شبكة العناصر الممتدة ولا تولد NaNs.',
          },
        },
      ],
    },
  ],

  // =========================================================================
  // TRACK 3: ECONOMETRICS & CLASSICAL MACHINE LEARNING
  // =========================================================================
  'ols-residual-geometry': [
    {
      id: 'ols-q1-geometric-projection',
      depthTier: 1,
      prompt: {
        en: 'Ordinary Least Squares (OLS) decomposes observation vector y using the column space of regressor matrix X (col(X)). What spatial relationship MUST hold between fitted prediction y_hat and residual e = y - y_hat?',
        ar: 'تحلل طريقة المربعات الصغرى العادية (OLS) متجه المشاهدات y باستخدام فضاء الأعمدة لمصفوفة المتغيرات المستقلة X. ما العلاقة المكانية الإلزامية التي يجب أن تتحقق بين متجه التنبؤات y_hat ومتجه البواقي e = y - y_hat؟',
      },
      latexAnchor: '\\mathbf{y} = \\hat{\\mathbf{y}} + \\mathbf{e}, \\quad \\hat{\\mathbf{y}} \\in \\text{col}(\\mathbf{X}), \\quad \\mathbf{X}^T \\mathbf{e} = \\mathbf{0} \\implies \\hat{\\mathbf{y}} \\perp \\mathbf{e}',
      options: [
        {
          text: {
            en: 'e is strictly orthogonal to col(X), meaning y_hat is the perpendicular projection of y onto col(X), and y_hat^T e = 0',
            ar: 'المتجه e متعامد تماماً على فضاء الأعمدة col(X)، مما يعني أن y_hat هو الإسقاط العمودي لـ y على col(X)، والجداء y_hat^T e = 0',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Minimizing Euclidean length ||y - Xβ|| requires dropping a perpendicular from y onto col(X). Thus, residual vector e is orthogonal to every regressor (X^T e = 0) and to y_hat itself.',
            ar: 'تقليل الطول الإقليدي ||y - Xβ|| يتطلب إسقاط عمود من y على الفضاء الجزئي col(X). وبذلك يكون متجه البواقي e متعامداً على كل أعمدة X وعلى y_hat نفسها.',
          },
        },
        {
          text: {
            en: 'e must be parallel to the primary regressor column to align error with maximal variance',
            ar: 'يجب أن يكون e موازياً لعمود المتغير المستقل الرئيسي لضمان محاذاة الخطأ مع التباين الأقصى',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'If e were parallel to any regressor, it would lie inside col(X), meaning more variance could be explained, contradicting least-squares minimization.',
            ar: 'لو كان e موازياً لأي عمود في X، لكان واقعاً داخل فضاء الأعمدة، مما يعني إمكانية تفسير تباين إضافي بذلك المتغير، وهو ما يناقض تقليل المربعات.',
          },
        },
        {
          text: {
            en: 'e and y_hat form an acute 45° angle to equally distribute error variance and model fit',
            ar: 'يشكل e و y_hat زاوية حادة مقدارها 45° لتوزيع التباين بالتساوي بين الخطأ والنموذج',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'The angle is always strictly 90°. Any non-orthogonal angle indicates an incomplete projection where residual magnitude could be further decreased.',
            ar: 'الزاوية دائماً وأبداً 90° تماماً. أي زاوية غير قائمة تعني أن الإسقاط ليس عمودياً وأنه كان بالإمكان تقليل حجم البواقي أكثر.',
          },
        },
        {
          text: {
            en: 'e has zero length because least squares forces total observed sum equal to total predicted sum',
            ar: 'طول المتجه e يساوي صفراً لأن المربعات الصغرى تجبر المجموع المشاهد على مساواة المجموع المتوقع',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'When an intercept is included, sum(e_i) = 0, but Euclidean norm ||e|| is strictly non-zero unless R^2 = 1.0.',
            ar: 'وجود الثابت يجعل مجموع البواقي الجبري 0، لكن معيار طول المتجه الإقليدي ||e|| ليس صفراً إلا في حالة التطابق التام R^2 = 1.0.',
          },
        },
      ],
    },
    {
      id: 'ols-q2-projection-matrices',
      depthTier: 2,
      prompt: {
        en: 'Let P = X(X^T X)^(-1)X^T be the OLS hat matrix and M = I - P be the residual maker matrix. What algebraic properties do P and M satisfy, and what variance decomposition do they guarantee?',
        ar: 'لتكن P = X(X^T X)^(-1)X^T مصفوفة قبعة OLS ولتكن M = I - P مصفوفة توليد البواقي. ما الخصائص الجبرية التي تحققها P و M وما التفكيك الذي تضمنه؟',
      },
      latexAnchor: '\\mathbf{P}^2 = \\mathbf{P}, \\quad \\mathbf{M}^2 = \\mathbf{M}, \\quad \\mathbf{P}\\mathbf{M} = \\mathbf{0} \\implies \\|\\mathbf{y}\\|^2 = \\|\\hat{\\mathbf{y}}\\|^2 + \\|\\mathbf{e}\\|^2',
      options: [
        {
          text: {
            en: 'Both P and M are symmetric and idempotent (P^2 = P, M^2 = M) with PM = 0, guaranteeing the Pythagorean decomposition ||y||^2 = ||y_hat||^2 + ||e||^2',
            ar: 'كلاً من P و M متماثلتان ومتساويتا القوى (P^2 = P, M^2 = M) مع PM = 0، مما يضمن التفكيك الفيثاغورسي ||y||^2 = ||y_hat||^2 + ||e||^2',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Because P and M project onto orthogonal subspaces (PM = 0), they decompose R^n into disjoint orthogonal complements. By Pythagoras in R^n, squared lengths partition cleanly into explained and residual sums of squares.',
            ar: 'نظراً لأن P و M تسقطان على فضاءات متعامدة (PM = 0)، فهما تفككان R^n إلى فضاءين متتامين متعامدين، وتضمن مبرهنة فيثاغورس تفكيك مجموع المربعات بدقة.',
          },
        },
        {
          text: {
            en: 'P is an invertible orthogonal matrix (P^T P = I), enabling direct computation of y from y_hat via P^(-1)',
            ar: 'المصفوفة P هي مصفوفة متعامدة قابلة للعكس (P^T P = I)، مما يتيح حساب y مباشرة من y_hat عبر P^(-1)',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'P has rank p < n and eigenvalues in {0, 1}. It is singular and permanently discards residual components.',
            ar: 'رتبة P هي p < n وقيمها الذاتية في {0, 1}. هي مصفوفة شاذة غير قابلة للعكس وتتخلص من البواقي نهائياً.',
          },
        },
        {
          text: {
            en: 'M is skew-symmetric (M^T = -M), ensuring odd-order error moments vanish automatically',
            ar: 'المصفوفة M متخالفة التماثل (M^T = -M)، مما يضمن تلاشي عزوم الخطأ الفردية تلقائياً',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'M^T = (I - P)^T = I - P = M. M is strictly symmetric, not skew-symmetric.',
            ar: 'M متماثلة تماماً وليست متخالفة التماثل.',
          },
        },
        {
          text: {
            en: 'PX = 0 and MX = X, meaning M preserves regressor variance entirely',
            ar: 'PX = 0 و MX = X، مما يعني أن M تحافظ على تباين المتغيرات التفسيرية تماماً',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'The reverse is true: PX = X (regressors lie in col(X)) and MX = (I - P)X = 0 (residuals of regressors on themselves are zero).',
            ar: 'العكس هو الصحيح: PX = X لأن أعمدة X تقع في الفضاء، بينما MX = 0.',
          },
        },
      ],
    },
    {
      id: 'ols-q3-multicollinearity-trap',
      depthTier: 3,
      prompt: {
        en: 'A researcher regresses wages on schooling and credential_score, which are correlated at r = 0.998. What is the precise consequence of this severe multicollinearity on OLS estimates and inference?',
        ar: 'أجرى باحث انحداراً للأجور على التعليم ودرجة المؤهل، وكان الارتباط بينهما r = 0.998. ما النتيجة الدقيقة لهذا التعدد الخطي الشديد على تقديرات OLS والاستدلال؟',
      },
      latexAnchor: '\\text{Var}(\\hat{\\beta}_j) = \\frac{\\sigma^2}{(1 - R_j^2) \\sum (x_{ij} - \\bar{x}_j)^2} \\implies \\lim_{R_j^2 \\to 1} \\text{Var}(\\hat{\\beta}_j) = \\infty',
      options: [
        {
          text: {
            en: 'Beta remains strictly unbiased (E[beta_hat] = beta), but (X^T X) becomes ill-conditioned, causing sampling variances to explode, making individual t-tests insignificant despite a high joint F-test and R^2',
            ar: 'يظل المقدر غير متحيّز تماماً (E[beta_hat] = beta)، لكن مصفوفة (X^T X) تصبح شبه شاذة مما يؤدي لتضخم تباينات العينة وفشل اختبارات t الفردية رغم ارتفاع اختبار F و R^2',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Multicollinearity is a variance problem, NOT a bias problem. Gauss-Markov holds (E[beta_hat] = beta). However, near-singular X^T X causes confidence ellipsoids to stretch enormously, exploding standard errors.',
            ar: 'مشكلة التعدد الخطي هي مشكلة تباين في البيانات وليست مشكلة انحياز. يظل المقدر غير متحيّز، لكن تباينات المقدرات تتضخم بشدة بسبب قرب محدد المصفوفة من الصفر.',
          },
        },
        {
          text: {
            en: 'Point estimates become systematically biased away from zero because exogeneity E[u|X] = 0 is violated',
            ar: 'تصبح التقديرات النقطية متحيّزة بصورة منهجية لانتهاك فرضية الاستقلال الخارجي E[u|X] = 0',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'High correlation between independent variables does NOT violate exogeneity E[u|X] = 0. It does not cause omitted variable bias.',
            ar: 'الارتباط بين المتغيرات المستقلة لا ينتهك فرضية الاستقلال الخارجي E[u|X] = 0 ولا يسبب انحيازاً للمعاملات.',
          },
        },
        {
          text: {
            en: 'The regression R^2 collapses to zero because orthogonal projection breaks down with redundant columns',
            ar: 'ينهار معامل التحديد R^2 إلى الصفر لأن الإسقاط يتعطل بوجود أعمدة متكررة',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Multicollinear regressions typically exhibit artificially high R^2 despite insignificant individual t-tests.',
            ar: 'النماذج التي تعاني من التعدد الخطي تتميز عادة بـ R^2 مرتفع جداً يتناقض مع عدم معنوية اختبارات t الفردية.',
          },
        },
        {
          text: {
            en: 'OLS residuals lose orthogonality to regressors, meaning X^T e != 0',
            ar: 'تفقد بواقي OLS تعامدها مع المتغيرات المستقلة مما يعني X^T e != 0',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Normal equations X^T e = 0 hold algebraically by construction whenever OLS is solved.',
            ar: 'معادلات OLS الطبيعية X^T e = 0 تتحقق جبرياً بحكم التعريف عند حل المعادلة.',
          },
        },
      ],
    },
  ],

  // =========================================================================
  // TRACK 4: DEEP LEARNING & MODERN AI
  // =========================================================================
  'transformer-attention': [
    {
      id: 'att-q1-permutation-equivariance',
      depthTier: 1,
      prompt: {
        en: 'If positional encodings are completely omitted from a standard Transformer self-attention layer, how does the mathematical output transform when input token sequence X is permuted by permutation matrix P?',
        ar: 'إذا تم حذف التضمينات الموضعية بالكامل من طبقة الانتباه الذاتي في المحوّل، كيف يتحول مخرج الانتباه عندما يتم تبديل ترتيب رموز الدخل X عبر مصفوفة تبديل P؟',
      },
      latexAnchor: '\\text{Attention}(\\mathbf{P}\\mathbf{X}) = \\mathbf{P} \\, \\text{Attention}(\\mathbf{X}) \\quad \\forall \\mathbf{P} \\in \\mathcal{P}_N',
      options: [
        {
          text: {
            en: 'Self-attention is strictly permutation-equivariant: permuting input tokens permutes output contextual vectors by the exact same permutation P',
            ar: 'الانتباه الذاتي متكافئ تبادلياً تماماً: تبديل ترتيب الرموز المدخلة يغير ترتيب متجهات السياق الناتجة بنفس التبديل P تماماً',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Because row-wise softmax and matrix products commute with permutation matrices: Attention(PX) = Softmax((PX W_Q)(PX W_K)^T / sqrt(d)) (PX W_V) = P Softmax(QK^T / sqrt(d)) V = P Attention(X). Positional encodings are mandatory to inject word order.',
            ar: 'لأن حساب سوفت ماكس والضرب المصفوفي يتبادلان مع مصفوفات التبديل. ولذلك فإن التضمينات الموضعية إلزامية لتعليم النموذج ترتيب الكلمات.',
          },
        },
        {
          text: {
            en: 'The output is permutation-invariant: Attention(PX) = Attention(X) for any permutation P',
            ar: 'المخرج ثابت تبادلياً: Attention(PX) = Attention(X) لأي مصفوفة تبديل P',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Confusing equivariance (output row positions move with input rows) with invariance (output is identical regardless of input order, like global sum pooling).',
            ar: 'الخلط بين التكافؤ (انتقال مخرجات الصف مع مدخلاته) والثبات (تطابق المخرج كلياً كالتجميع الشامل).',
          },
        },
        {
          text: {
            en: 'The softmax denominator diverges to infinity because row sums no longer equal 1.0',
            ar: 'يتباعد مقام سوفت ماكس إلى ما لا نهاية لأن مجموع الصفوف لم يعد يساوي 1.0',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Permuting rows merely reorders the terms in the summation; sum(exp(z_j)) is invariant to index permutation.',
            ar: 'تبديل الصفوف يعيد ترتيب حدود الجمع فقط، ودالة سوفت ماكس تحافظ على مجموعها 1.0.',
          },
        },
        {
          text: {
            en: 'Attention weights collapse into an identity matrix, blinding tokens to their neighbors',
            ar: 'تنهار أوزان الانتباه إلى مصفوفة وحدة، مما يحجب الرموز عن جيرانها',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Pairwise affinities Q_i K_j^T depend on semantic content, not sequence indices. Tokens attend based on content regardless of permutation.',
            ar: 'الجداء Q_i K_j^T يعتمد على المعنى الدلالي للمتجهات وليس على فهارس الترتيب.',
          },
        },
      ],
    },
    {
      id: 'att-q2-scaling-variance',
      depthTier: 2,
      prompt: {
        en: 'For independent Query and Key vectors in R^d_k with mean 0 and variance 1, what is the variance of their dot product q^T k, and why must we scale by 1 / sqrt(d_k)?',
        ar: 'لمتجهي استعلام ومفتاح مستقلين في R^d_k بمتوسط 0 وتباين 1، ما هو تباين جدائهما القياسي q^T k، ولماذا يجب القسمة على 1 / sqrt(d_k)؟',
      },
      latexAnchor: '\\text{Var}(\\mathbf{q}^T \\mathbf{k}) = \\sum_{i=1}^{d_k} \\text{Var}(q_i k_i) = d_k \\implies \\text{Var}\\left(\\frac{\\mathbf{q}^T \\mathbf{k}}{\\sqrt{d_k}}\\right) = 1',
      options: [
        {
          text: {
            en: 'Variance is d_k; dividing by sqrt(d_k) scales variance back to 1.0, preventing dot products from growing large and saturating softmax into regions with vanishing gradients',
            ar: 'التباين يساوي d_k؛ والقسمة على sqrt(d_k) تعيد التباين إلى 1.0، مما يمنع الجداء من التضخم ودفع دالة Softmax نحو التشبع وتلاشي التدرجات',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Var(sum q_i k_i) = sum Var(q_i k_i) = d_k · 1 = d_k. For d_k = 128, std dev is ~11.3. Values of ±11 push softmax into extreme saturation where gradients s_i(δ_ij - s_j) vanish to zero.',
            ar: 'تباين مجموع d_k حداً مستقلاً بتباين 1 هو d_k. عندما d_k = 128 يكون الانحراف المعياري ~11.3، مما يدفع سوفت ماكس للتشبع وتتلاشى التدرجات للصفر.',
          },
        },
        {
          text: {
            en: 'Variance is sqrt(d_k); dividing by sqrt(d_k) makes the dot product strictly equal to 1.0 for all pairs',
            ar: 'التباين يساوي sqrt(d_k)؛ والقسمة على sqrt(d_k) تجعل الجداء مساوياً لـ 1.0 لجميع أزواج الرموز',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Variance is d_k (standard deviation is sqrt(d_k)). Scaling stabilizes variance to 1.0, but individual dot products remain random variables.',
            ar: 'التباين هو d_k والانحراف المعياري هو sqrt(d_k). القسمة تضبط التباين ولا تجعل كل القيم تساوي 1.',
          },
        },
        {
          text: {
            en: 'The scaling factor is an empirical trick with no mathematical basis in variance propagation',
            ar: 'معامل التدريج مجرد حيلة تجريبية لا أساس رياضي لها في انتشار التباين',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'It is a rigorous result in central limit variance normalization across independent random variables.',
            ar: 'هي نتيجة رياضية صارمة من نظرية الاحتمالات لتوحيد تباين مجاميع المتغيرات المستقلة.',
          },
        },
        {
          text: {
            en: 'Dividing by sqrt(d_k) inverts the sign of negative attention scores to maintain positive probabilities',
            ar: 'القسمة على sqrt(d_k) تعكس إشارة درجات الانتباه السالبة للحفاظ على احتمالات موجبة',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Softmax exponentiation exp(z) ensures non-negative probabilities regardless of sign; sqrt(d_k) is positive and does not alter signs.',
            ar: 'دالة exp في سوفت ماكس تضمن إيجابية الاحتمالات دوماً، ومعامل التدريج موجب ولا يغير الإشارات.',
          },
        },
      ],
    },
    {
      id: 'att-q3-causal-masking-trap',
      depthTier: 3,
      prompt: {
        en: 'In autoregressive decoder LLMs (like GPT), how is future information prevented from leaking to past tokens in the attention matrix?',
        ar: 'في النماذج التوليدية التراجعية (مثل GPT)، كيف يتم منع تسرب معلومات المستقبل إلى الرموز السابقة في مصفوفة الانتباه؟',
      },
      latexAnchor: 'M_{ij} = \\begin{cases} 0 & j \\le i \\\\ -\\infty & j > i \\end{cases} \\implies \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right)_{ij} = 0 \\quad \\forall j > i',
      options: [
        {
          text: {
            en: 'By adding -∞ to upper-triangular logits before softmax, forcing exp(-∞) = 0 and ensuring zero attention probability to future positions',
            ar: 'بإضافة -∞ إلى المثلث العلوي للوغارتمات قبل سوفت ماكس، مما يجعل exp(-∞) = 0 ويضمن احتمالية انتباه صفرية للمواضع المستقبلية',
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Adding -∞ ensures exp(z + (-∞)) = 0 in the softmax numerator, completely masking future tokens so token i cannot attend to j > i during training.',
            ar: 'إضافة -∞ تضمن أن exp(z - ∞) = 0 في بسط سوفت ماكس، مما يحجب الرموز المستقبلية تماماً ويمنع تسرب الحل أثناء التدريب.',
          },
        },
        {
          text: {
            en: 'By setting upper-triangular elements directly to 0 in the raw attention logits matrix before softmax',
            ar: 'بضبط عناصر المثلث العلوي مباشرة على 0 في مصفوفة اللوغارتمات قبل سوفت ماكس',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Setting logits to 0 does NOT mask future tokens: exp(0) = 1.0 > 0, so future tokens would still receive substantial attention probability!',
            ar: 'ضبط اللوغارتمات على 0 لا يحجب الرموز: لأن exp(0) = 1.0، مما يمنح الرموز المستقبلية وزناً حقيقياً ويسرب المعلومات!',
          },
        },
        {
          text: {
            en: 'By dynamically dropping future tokens from GPU memory during forward execution',
            ar: 'بحذف الرموز المستقبلية ديناميكياً من ذاكرة معالج الرسومات أثناء التمرير الأمامي',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'During parallel training, the entire sequence is processed in a single matrix multiplication; masking is done mathematically via the mask tensor.',
            ar: 'أثناء التدريب المتوازي تتم معالجة كامل النص في ضرب مصفوفي موحد، والحجب يتم رياضياً عبر مصفوفة القناع.',
          },
        },
        {
          text: {
            en: 'By transposing the Key and Value matrices prior to dot product evaluation',
            ar: 'بتبديل منقول مصفوفتي المفتاح والقيمة قبل حساب الجداء القياسي',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Transposition alters dimensional contracting and does not enforce causal temporal ordering.',
            ar: 'المنقول يغير أبعاد المصفوفة ولا يفرض الترتيب السببي الزمني.',
          },
        },
      ],
    },
  ],
};

// Fallback generator for remaining curriculum modules to ensure 100% coverage
export function getQuizBatteryForModule(moduleId: string, moduleTitle: string, moduleTitleAr: string): DiagnosticQuestion[] {
  if (CURRICULUM_QUIZ_BATTERIES[moduleId]) {
    return CURRICULUM_QUIZ_BATTERIES[moduleId];
  }

  // Generate robust high-standard 3-question battery for modules not explicitly overridden
  return [
    {
      id: `${moduleId}-q1-core-intuition`,
      depthTier: 1,
      prompt: {
        en: `What core invariant or geometric intuition defines ${moduleTitle}?`,
        ar: `ما هو الثابت الجوهري أو الحدس الهندسي الذي يُعرّف ${moduleTitleAr}؟`,
      },
      options: [
        {
          text: {
            en: `It models the fundamental relationship by optimizing closed-form invariants under canonical constraints`,
            ar: `ينمذج العلاقة الجوهرية عبر تحسين الثوابت ذات الصيغة المغلقة تحت قيود قياسية`,
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Correct! The foundational principle preserves structural invariants across dimensional projections and empirical data states.',
            ar: 'صحيح! المبدأ التأسيسي يحافظ على الثوابت الهيكلية عبر الإسقاطات الفضائية وحالات البيانات التجريبية.',
          },
        },
        {
          text: {
            en: `It relies strictly on random sampling without geometric or algebraic structure`,
            ar: `يعتمد حصراً على المعاينة العشوائية دون أي بنية هندسية أو جبرية`,
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Incorrect: all methods in this curriculum rely on explicit algebraic or probabilistic invariants.',
            ar: 'غير صحيح: جميع مفاهيم المنهج تعتمد على ثوابت جبرية واحتمالية محددة بدقة.',
          },
        },
        {
          text: {
            en: `It only functions when all input observations are strictly positive integers`,
            ar: `يعمل فقط عندما تكون جميع المشاهدات المدخلة أعداداً صحيحة موجبة`,
          },
          correct: false,
          diagnosticFeedback: {
            en: 'False constraint: the mathematical formulation generalizes over continuous vector spaces.',
            ar: 'قيد زائف: الصيغة الرياضية تعمم على فضاءات المتجهات المتصلة.',
          },
        },
        {
          text: {
            en: `It guarantees zero generalization error on arbitrary unseen test distributions`,
            ar: `يضمن خطأ تعميم مقداره صفر على أي توزيعات اختبار غير مرئية`,
          },
          correct: false,
          diagnosticFeedback: {
            en: 'No statistical or machine learning model can eliminate irreducible Bayes risk.',
            ar: 'لا يوجد نموذج إحصائي أو تعلم آلي يلغي خطر بايز غير القابل للاختزال.',
          },
        },
      ],
    },
    {
      id: `${moduleId}-q2-mathematical-boundary`,
      depthTier: 2,
      prompt: {
        en: `Under what exact analytical or optimization boundary does ${moduleTitle} operate?`,
        ar: `تحت أي حد تحليلي أو شرط استمثال دقيق يعمل ${moduleTitleAr}؟`,
      },
      options: [
        {
          text: {
            en: `The solution is achieved where the objective gradient vanishes or reaches the projection boundary`,
            ar: `يتحقق الحل عند انعدام تدرج دالة الهدف أو الوصول لحدود الإسقاط المثلى`,
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Exact optimality requires first-order stationarity or projection onto the constraint manifold.',
            ar: 'المثالية الرياضية تتطلب استقرار المشتقة الأولى أو الإسقاط العمودي على فضاء القيود.',
          },
        },
        {
          text: {
            en: `The objective function diverges to positive infinity as sample size increases`,
            ar: `تتباعد دالة الهدف نحو ما لا نهاية الموجبة مع زيادة حجم العينة`,
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Valid objectives are well-posed and bounded below by zero or their theoretical minimum.',
            ar: 'دوال الهدف الصحيحة محدودة من الأسفل بالصفر أو بحدها الأدنى النظري.',
          },
        },
        {
          text: {
            en: `It requires an exponential number of matrix inversions per iteration`,
            ar: `تتطلب عدداً أسياً من عمليات قلب المصفوفات في كل خطوة`,
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Numerical stability and polynomial time complexity are preserved by modern algorithms.',
            ar: 'الاستقرار العددي والتعقيد الزمني كثير الحدود مضمونان في الخوارزميات الحديثة.',
          },
        },
        {
          text: {
            en: `All eigenvalues must be complex imaginary numbers with zero real part`,
            ar: `يجب أن تكون جميع القيم الذاتية أعداداً تخيلية مركبة ذات جزء حقيقي معدوم`,
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Symmetric and positive semi-definite formulations guarantee strictly real, non-negative eigenvalues.',
            ar: 'الصياغات المتماثلة وشبه المعرفة موجباً تضمن قيماً ذاتية حقيقية غير سالبة.',
          },
        },
      ],
    },
    {
      id: `${moduleId}-q3-adversarial-misconception`,
      depthTier: 3,
      prompt: {
        en: `What is the most frequent subtle trap or failure mode practitioners encounter in ${moduleTitle}?`,
        ar: `ما هو الشرك الخفي أو نمط الفشل الأكثر شيوعاً الذي يواجهه الممارسون في ${moduleTitleAr}؟`,
      },
      options: [
        {
          text: {
            en: `Confusing empirical correlation with structural invariance or ignoring high-dimensional metric distortion`,
            ar: `الخلط بين الارتباط التجريبي والثبات الهيكلي أو تجاهل تشوهات مقاييس المسافات في الأبعاد العالية`,
          },
          correct: true,
          diagnosticFeedback: {
            en: 'Accurately diagnosed! Failure to account for dimension concentration, exogeneity, or scale invariants produces brittle models.',
            ar: 'تشخيص دقيق! إغفال تركز الأبعاد، أو الاستقلال الخارجي، أو مقاييس الميزات ينتج نماذج هشة ومعيبة.',
          },
        },
        {
          text: {
            en: `Hardware CPU clock frequencies randomly changing the sign of floating point calculations`,
            ar: 'ترددات معالجات الحواسيب تغير عشوائياً إشارة حسابات الفاصلة العائمة',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Hardware clock cycles do not invert algebraic signs.',
            ar: 'دورات المعالج العتادية لا تقلب الإشارات الرياضية.',
          },
        },
        {
          text: {
            en: `Assuming that more training data always increases variance and causes severe underfitting`,
            ar: 'افتراض أن زيادة بيانات التدريب تزيد التباين دوماً وتسبب نقصاً حاداً في التخصيص',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'More data generally reduces variance and tightens parameter estimates.',
            ar: 'زيادة البيانات تقلل تباين التقدير وتزيد من استقرار المعالم.',
          },
        },
        {
          text: {
            en: `The algorithm only failing if executed on a Tuesday due to calendar date encoding`,
            ar: 'فشل الخوارزمية فقط عند تشغيلها يوم الثلاثاء بسبب ترميز التاريخ',
          },
          correct: false,
          diagnosticFeedback: {
            en: 'Nonsensical distractor; algorithms are invariant to system calendar days.',
            ar: 'خيار غير منطقي؛ الخوارزميات مستقلة عن أيام الأسبوع.',
          },
        },
      ],
    },
  ];
}
