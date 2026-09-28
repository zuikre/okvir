import fs from 'node:fs';
import path from 'node:path';

const curriculumPath = path.resolve('src/lib/curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

// Module 1: Vectors as Geometry
content = content.replace(
  `        narrative: {
          en: 'A vector is an arrow in space — it has direction and magnitude. Drag the endpoint to see how the vector changes.',
          ar: 'المتجه هو سهم في الفضاء — له اتجاه وحجم. اسحب النقطة لترى كيف يتغير المتجه.',
        },`,
  `        narrative: {
          en: 'A vector is fundamentally a geometric displacement with magnitude and orientation in coordinate-free space. In machine learning, every observation, neural activation, weight column, and optimization update is a vector in high-dimensional space.\\n\\nManipulate the endpoint in the interactive canvas to observe how Cartesian components (v_x, v_y) transform continuously. Notice that vectors possess length invariant under coordinate translation, forming the primitive building blocks of linear transformations and inner product spaces.',
          ar: 'المتجه في جوهره هو إزاحة هندسية ذات مقدار واتجاه في فضاء لا إحداثي. في التعلم الآلي، كل مشاهدة وتنشيط عصبي وعمود أوزان وتحديث أمثلية هو متجه في فضاء عالي الأبعاد.\\n\\nحرّك طرف المتجه في المختبر التفاعلي لملاحظة كيف تتحول المركبات الديكارتية (v_x, v_y) بسلاسة. لاحظ أن المتجهات تمتلك طولاً ثابتاً تحت الإزاحة، مما يجعلها اللبنات الأساسية للتحويلات الخطية وفضاءات الجداء الداخلي.',
        },`
);

// Module 2: Dot Product & Projection
content = content.replace(
  `        narrative: {
          en: 'The dot product measures how much two vectors point in the same direction. When they are perpendicular, it is zero.',
          ar: 'الجداء القياسي يقيس مدى تطابق اتجاه متجهين. عندما يكونان متعامدين، يكون صفراً.',
        },`,
  `        narrative: {
          en: 'The dot product is the geometric projection of one vector onto another, scaled by the length of the reference axis. When two vectors are aligned, their dot product equals the product of their magnitudes; when perpendicular (orthogonal), the projection vanishes completely to zero.\\n\\nIn modern transformer architectures, attention mechanisms compute similarity through scaled dot products between query and key vectors. Drag both vectors on the canvas to see the radiant projection beam cast onto the 1D subspace, visually confirming the Cauchy-Schwarz inequality |u·v| <= ||u|| ||v||.',
          ar: 'الجداء القياسي هو الإسقاط الهندسي لمتجه على آخر، مضروباً في طول محور الإسناد. عندما يتطابق اتجاه متجهين، يساوي جداؤهما جداء أطوالهما؛ وعندما يتعامدان، يتلاشى الإسقاط كلياً إلى الصفر.\\n\\nفي بنى المحولات المعاصرة، تحسب آليات الانتباه التشابه عبر الجداء القياسي المدرج بين متجهات الاستعلام والمفتاح. حرّك كلا المتجهين على اللوحة لرؤية شعاع الإسقاط المسلط على الفضاء الجزئي، مؤكداً متباينة كوشي-شفارتز هندسياً.',
        },`
);

// Module 3: Gradient Vector
content = content.replace(
  `        narrative: {
          en: 'The gradient ∇f points uphill — the steepest way up. Move against it to descend.',
          ar: 'التدرج ∇f يشير إلى الأعلى — أشد الطرق صعوداً. تحرك عكسه للنزول.',
        },`,
  `        narrative: {
          en: 'The gradient vector ∇f collects all partial derivatives of a scalar loss function, pointing in the unique direction of steepest local ascent. The magnitude ||∇f|| quantifies the maximum instantaneous rate of change per unit distance.\\n\\nBecause ∇f is strictly orthogonal to the level contour curves of the loss surface, moving in the opposite direction -∇f yields the path of maximum local decrease. Observe on the 2D contour canvas how the gradient vectors align perpendicularly to the elliptical ripples of the loss landscape.',
          ar: 'يجمع متجه التدرج ∇f كافة المشتقات الجزئية لدالة الخسارة القياسية، مشيراً إلى الاتجاه الفريد لأقصى صعود محلي. يحدد المقدار ||∇f|| المعدل اللحظي الأقصى للتغير لكل وحدة مسافة.\\n\\nنظراً لأن ∇f متعامد تماماً على خطوط الكنتور لدالة الخسارة، فإن التحرك في الاتجاه المعاكس -∇f يوفر مسار أقصى انحدار هبوطي. راقب على لوحة الكنتور كيف تصطف متجهات التدرج عمودياً على المنحنيات البيضاوية لسطح الخسارة.',
        },`
);

// Module 4: Bayes' Theorem
content = content.replace(
  `        narrative: {
          en: 'Bayes updates your belief after seeing evidence. A positive test does not always mean disease — it depends on the base rate.',
          ar: 'بايز يحدّث اعتقادك بعد رؤية الأدلة. اختبار إيجابي لا يعني دائماً مرضاً — يعتمد على المعدل الأساسي.',
        },`,
  `        narrative: {
          en: 'Bayesian inference formalizes how rational agents must update their subjective prior beliefs upon receiving empirical evidence. When observing data D, the likelihood P(D|θ) modulates the prior P(θ) to yield the posterior distribution P(θ|D).\\n\\nCrucially, human intuition chronically ignores base rates. If a disease has a 1% base rate and a diagnostic test is 99% accurate, testing positive yields only a ~50% posterior probability of infection because false positives from the large healthy population match the true positives from the small sick population.',
          ar: 'يصيغ الاستدلال البايزي كيفية قيام النماذج العقلانية بتحديث اعتقاداتها القبلية عند تلقي أدلة تجريبية. عند مشاهدة البيانات D، تقوم دالة الإمكان P(D|θ) بتعديل الاحتمال القبلي P(θ) لإنتاج التوزيع البعدي P(θ|D).\\n\\nبشكل حاسم، يميل الحدس البشري لتجاهل المعدلات الأساسية. إذا كان مرض ما يصيب 1% من السكان واختبار دقته 99%، فإن النتيجة الإيجابية تعطي احتمالاً بعدياً يقارب 50% فقط، لأن الإيجابيات الكاذبة من الأغلبية السليمة تعادل الإيجابيات الحقيقية من الأقلية المصابة.',
        },`
);

// Module 11: OLS Residual Geometry
content = content.replace(
  `        narrative: {
          en: 'OLS finds the line that minimizes the sum of squared residuals. Drag the points or slope to see how residuals change.',
          ar: 'المربعات الصغرى تجد الخط الذي يقلل مجموع مربعات البواقي. اسحب النقاط أو الميل لترى كيف تتغير البواقي.',
        },`,
  `        narrative: {
          en: 'Ordinary Least Squares (OLS) is fundamentally an orthogonal projection in observation space R^n. The observed target vector y is decomposed into the fitted projection y_hat in the column space of X and the residual vector e orthogonal to col(X).\\n\\nBecause e is orthogonal to every regressor column, the normal equations X^T e = 0 guarantee that the residuals have zero covariance with the regressors. On the interactive lever canvas, tilt the regression line to see how the restoring rotational torque cancels out to zero strictly at the optimal OLS parameter values.',
          ar: 'طريقة المربعات الصغرى العادية (OLS) هي في جوهرها إسقاط متعامد في فضاء المشاهدات R^n. يتم تفكيك متجه الهدف y إلى الإسقاط التقديري y_hat في فضاء أعمدة X ومتجه البواقي e المتعامد مع col(X).\\n\\nنظراً لأن e متعامد مع كل عمود، تضمن المعادلات الطبيعية X^T e = 0 أن البواقي لها تغاير صفري مع المتغيرات المستقلة. في لوحة الرافعة الميكانيكية، قم بإمالة خط الانحدار لملاحظة كيف يتلاشى عزم الدوران الترجيعي تماماً إلى الصفر عند معاملات OLS المثلى.',
        },`
);

// Module 14: Decision Trees
content = content.replace(
  `        narrative: {
          en: 'Decision trees split data along axis-aligned thresholds to maximize purity. Notice how each split cuts the feature space into rectangular regions.',
          ar: 'أشجار القرار تقسم البيانات على طول عتبات محاذية للمحاور لتعظيم النقاء. لاحظ كيف يقسم كل تقسيم فضاء الخصائص إلى مناطق مستطيلة.',
        },`,
  `        narrative: {
          en: 'Decision trees partition the continuous feature space through recursive orthogonal axis-aligned hyperplanes. At each internal node, a greedy split criterion (such as Gini impurity or Shannon entropy) evaluates every possible feature threshold to maximize information gain.\\n\\nWhile decision trees offer exceptional interpretability and handle non-linear relationships without feature scaling, their unconstrained growth produces high-variance step functions prone to overfitting. Observe on the 2D laser canvas how threshold boundaries slice the space into discrete decision cells.',
          ar: 'تقسم أشجار القرار فضاء الميزات المستمر عبر مستويات عمودية متتالية محاذية للمحاور. عند كل عقدة داخلية، يقيّم معيار التقسيم الجشع (مثل مؤشر جيني أو إنتروبيا شانون) كل عتبة ممكنة لتعظيم كسب المعلومات.\\n\\nعلى الرغم من أن أشجار القرار توفر قابلية تفسير ممتازة وتتعامل مع العلاقات غير الخطية دون الحاجة لتحجيم الميزات، فإن نموها غير المقيد يولد دوالاً درجية ذات تباين عالٍ وعرضة لفرط التخصيص. راقب على لوحة الليزر كيف تقطع العتبات الفضاء إلى خلايا قرار منفصلة.',
        },`
);

// Module 21: Transformer Attention
content = content.replace(
  `        narrative: {
          en: 'Self-attention allows every token to look at every other token. Drag temperature to sharpen or soften the attention distribution.',
          ar: 'الانتباه الذاتي يسمح لكل رمز بالنظر إلى كل رمز آخر. اسحب درجة الحرارة لتكثيف أو تليين توزيع الانتباه.',
        },`,
  `        narrative: {
          en: 'Self-attention computes dynamic, data-dependent routing weights between all token representations in an input sequence. For each token, query and key vectors are multiplied to produce an alignment score matrix, normalized through softmax and scaled by 1/sqrt(d_k) to prevent vanishing gradients in deep layers.\\n\\nThe resulting attention probabilities form a convex combination of value vectors, enabling the network to route contextual information across arbitrary token distances in O(1) sequential steps. Use the temperature scrubber on the canvas to observe how softmax entropy transitions from diffuse uniform averaging to razor-sharp argmax routing.',
          ar: 'يحسب الانتباه الذاتي أوزان توجيه ديناميكية معتمدة على البيانات بين كافة الرموز في السلسلة المدخلة. لكل رمز، يتم ضرب متجهات الاستعلام والمفتاح لإنتاج مصفوفة درجات المحاذاة، معيارية بواسطة softmax ومدرجة بـ 1/sqrt(d_k) لتفادي تلاشي التدرجات في الطبقات العميقة.\\n\\nتشكل احتمالات الانتباه الناتجة تركيباً محدباً لمتجهات القيم، مما يمكن الشبكة من نقل المعلومات السياقية عبر مسافات اعتباطية في خطوات تسلسلية O(1). استخدم مغير درجة الحرارة على اللوحة لمراقبة كيف تنتقل إنتروبيا softmax من التوزيع المنتظم إلى التوجيه الحاد.',
        },`
);

fs.writeFileSync(curriculumPath, content, 'utf8');
console.log('Successfully expanded pedagogical narratives in curriculum.ts.');
