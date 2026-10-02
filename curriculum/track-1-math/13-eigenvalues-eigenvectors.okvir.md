---
id: "t1-13"
version: "1.0.0"
title: "Eigenvalues & Eigenvectors: Invariant Directions of Space"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["t1-12"]
i18n:
  ar: "القيم الذاتية والمتجهات الذاتية: الاتجاهات الصامدة في الفضاء"
---

# Eigenvalues & Eigenvectors: Invariant Directions of Space

### Intuition & Physical Grounding

Imagine rolling out pizza dough on a kitchen counter, or pulling firmly on a flexible printed rubber sheet with both hands. If you grab opposite diagonal corners and yank outward, almost every geometric shape printed on the rubber gets warped, skewed, and twisted. A circle distorts into a slanted ellipse. A small arrow drawn pointing Northeast gets dragged into pointing East-Southeast. When a general linear transformation acts on the space around it, it whips vectors around like leaves in a windstorm, modifying both their lengths and their pointing directions simultaneously.

Yet, if you look closely along the exact diagonal line of your pull, you will witness something extraordinary: arrows pointing directly along that diagonal axis do not turn by even a fraction of a degree! They stretch straight outward, remaining perfectly aligned with their original line of action. Likewise, arrows pointing along the perpendicular diagonal compress straight inward without rotating at all. For virtually every linear transformation, there exist these special, magical axes of space that refuse to be rotated. These invariant directions are the **eigenvectors** (from the German *eigen*, meaning "own," "characteristic," or "innate").

The scalar factor by which an eigenvector stretches, shrinks, or reverses is its **eigenvalue** ($\lambda$). If an eigenvector has an eigenvalue of $\lambda = 3$, applying the matrix triples its length along that same line. If $\lambda = 0.5$, the vector contracts by half. If $\lambda = -1$, the arrow flips $180^\circ$ backwards, pointing in reverse along the exact same line. And if $\lambda = 0$, the entire axis gets crushed into the origin, losing a spatial dimension completely. Eigenvectors reveal the true natural coordinates of a transformation—the invisible axes along which the matrix acts simply as scalar multiplication.

Consider another intuitive physical analogy: a globe spinning on its pedestal or a basketball twirling atop an athlete's finger. As the globe spins, every single city on the surface sweeps out circles, continuously altering its instantaneous direction of motion. However, the line connecting the North Pole to the South Pole remains completely stationary in space. Every point along that rotational axis continues to point along the exact same line. The rotational axis is an eigenvector of the 3D rotation, corresponding to an eigenvalue of $\lambda = 1$.

#### Why Do We Care?
Eigenvalues and eigenvectors form the structural skeleton of modern computation, artificial intelligence, and physical sciences:
1. **Google's PageRank:** The entire early web was indexed by modeling internet browsing as a massive Markov transition matrix. The steady-state probability distribution—representing the relative importance of every website on earth—is the dominant eigenvector of that link matrix ($\lambda = 1$).
2. **Principal Component Analysis (PCA):** In machine learning, high-dimensional datasets are compressed by computing the eigenvectors of their covariance matrix. The eigenvectors identify the orthogonal directions of maximum data variance, allowing models to drop noise dimensions.
3. **Resonance & Structural Engineering:** Buildings, bridges, and aircraft wings possess natural vibrational modes determined by the eigenvectors of their stiffness and mass matrices. If wind or earthquakes match an eigenvalue frequency, catastrophic resonance occurs (such as the famous collapse of the Tacoma Narrows Bridge).
4. **Dynamical Systems & Recurrent Networks:** When training recurrent neural networks (RNNs) or simulating physical systems over time ($\mathbf{x}_{t+1} = \mathbf{A}\mathbf{x}_t$), eigenvalues dictate stability. If $|\lambda| > 1$, signals explode toward infinity; if $|\lambda| < 1$, signals vanish exponentially to zero.

---

### الحدس الفيزيائي والهندسي

تخيل أنك تفرد عجينة بيتزا على طاولة المطبخ، أو تشد شريحة مطاطية مرنة رُسمت عليها أشكال هندسية بيدك في اتجاهين متضادين قطرياً. عندما تسحب الشريحة بقوة، ستلاحظ أن كافة الدوائر والخطوط المرسومة عليها تتشوه وتلتوي؛ فالدائرة تتحول إلى قطع ناقص مائل، والمتجه الذي كان يشير إلى الشمال الشرقي ينحرف مجبراً ليشير إلى الشرق والجنوب. هذا ما يفعله أي تحويل خطي عام في الفضاء: إنه يعصف بالمتجهات كأوراق شجر في مهب الريح، مغيرّاً أطوالها وزوايا اتجاهاتها في آن واحد.

ومع ذلك، إذا دققت النظر على طول الخط القطري المباشر ليدك الساحبة، فستكتشف ظاهرة هندسية مذهلة: الأسهم والمتجهات التي كانت مرسومة مباشرة على امتداد ذلك المحور القطري لم تنحرف أو تدر بمقدار جزء من الدرجة! لقد تمددت في خط مستقيم للأمام مع بقائها منطبقة تماماً على خط استقامتها الأصلي. وبالمثل، فإن المتجهات الواقعة على المحور العمودي على خط السحب تنكمش للداخل دون أي دوران. لكل تحويل خطي تقريباً في الكون اتجاهات سحرية فريدة ترفض الدوران وتصمد أمام التشويه؛ هذه المحاور الاستثنائية هي ما نطلق عليه **المتجهات الذاتية** (Eigenvectors، والمشتقة من الكلمة الألمانية *eigen* التي تعني "الخاص" أو "الأصيل").

المعامل العددي الذي يتمدد أو ينكمش به هذا المتجه الذاتي هو **القيمة الذاتية** ($\lambda$). إذا كانت القيمة الذاتية لمتجه ما هي $\lambda = 3$، فإن تأثير المصفوفة عليه يقتصر على مضاعفة طوله ثلاث مرات على نفس امتداده. وإذا كانت $\lambda = 0.5$، فإنه ينكمش إلى نصف طوله. وإذا كانت $\lambda = -1$، فإن السهم ينعكس بزاوية $180^\circ$ ليشير للخلف على نفس خط العمل تماماً. أما إذا كانت $\lambda = 0$، فإن المحور بأكمله يُسحق إلى نقطة الأصل ويفقد الفضاء أحد أبعاده. المتجهات الذاتية تكشف الهيكل العظمي الطبيعي للتحويل، حيث تتردّى المصفوفة المعقدة لتصبح مجرد ضرب عددي بسيط.

تأمل مثالاً حسياً آخر: دوران مجسم الكرة الأرضية في معمل الجغرافيا أو دوران كرة السلة على طرف إصبعك. أثناء الدوران السريع، تدور كل قارة ومدينة على سطح الكرة في مسار دائري مغلق يتغير اتجاه حركته في كل لحظة؛ باستثناء محور واحد فقط: الخط المستقيم الواصل بين القطب الشمالي والقطب الجنوبي يظل ساكناً في الفضاء ومشيراً إلى نفس الاتجاه الأصلي دون أي انحراف! هذا المحور القطبي هو متجه ذاتي لهذا الدوران ثلاثي الأبعاد، وقيمته الذاتية تساوي $\lambda = 1$.

#### لماذا نهتم بهذا المفهوم؟
تُعد القيم والمتجهات الذاتية العمود الفقري لعلوم الحاسوب والذكاء الاصطناعي الحديث:
1. **خوارزمية PageRank لمحرك Google:** تم تنظيم شبكة الويب العالمية بتمثيل تصفح المواقع كمصفوفة احتمالات انتقال ضخمة. التوزيع الاحتمالي المستقر—الذي يحدد رتبة وأهمية كل صفحة إنترنت في العالم—هو المتجه الذاتي الرئيسي لتلك المصفوفة المقابل للقيمة الذاتية $\lambda = 1$.
2. **تحليل المكونات الرئيسية (PCA):** في معالجة البيانات الضخمة والرؤية الحاسوبية، يتم ضغط آلاف المتغيرات بحساب المتجهات الذاتية لمصفوفة التغاير (Covariance Matrix)؛ حيث تمثل هذه المتجهات المحاور المتعامدة التي تحتفظ بأكبر قدر من تباين ومعلومات البيانات.
3. **الرنين الميكانيكي وسلامة المنشآت:** تمتلك الجسور وناطحات السحاب وهياكل الطائرات أنماط اهتزاز طبيعية تحددها المتجهات الذاتية لمصفوفات الكتلة والصلابة. وإذا هبت رياح بتردد يطابق إحدى القيم الذاتية للهيكل، يحدث رنين كارثي يؤدي لانهيار المبنى (كما حدث لجسر تاكوما ناروز الشهير).
4. **استقرار الشبكات العصبية المتكررة (RNNs):** عند محاكاة الأنظمة الديناميكية أو تدريب شبكات الذكاء الاصطناعي المتكررة عبر الزمن، فإن القيم الذاتية لمصفوفة الأوزان تحدد مصير الإشارة: إذا كانت $|\lambda| > 1$ تنفجر المشتقات نحو اللانهاية، وإذا كانت $|\lambda| < 1$ تتلاشى الإشارة تماماً.

:::simulation-widget{engine="canvas2d" component="EigenHunterCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{A}\mathbf{v} = \lambda \mathbf{v} \iff (\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}, \quad \det(\mathbf{A} - \lambda \mathbf{I}) = 0
$$

#### Demystifying the Equation

| Symbol | Mathematical Term | Plain English Translation & Intuition |
| :--- | :--- | :--- |
| $\mathbf{A} \in \mathbb{R}^{n \times n}$ | Transformation Matrix | A square linear operator that transforms vectors in $n$-dimensional space. |
| $\mathbf{v} \in \mathbb{R}^n \setminus \{\mathbf{0}\}$ | Eigenvector | A non-zero directional arrow that experiences zero rotation when operated on by $\mathbf{A}$. |
| $\lambda \in \mathbb{R}$ (or $\mathbb{C}$) | Eigenvalue | The scalar scaling factor indicating how much vector $\mathbf{v}$ stretches, shrinks, or flips. |
| $\mathbf{A}\mathbf{v}$ | Matrix-Vector Product | The actual spatial output when matrix $\mathbf{A}$ acts on coordinate vector $\mathbf{v}$. |
| $\lambda \mathbf{v}$ | Scaled Vector | Proves that the matrix action is geometrically identical to pure scalar multiplication along line $\mathbf{v}$. |
| $\mathbf{I} \in \mathbb{R}^{n \times n}$ | Identity Matrix | The matrix equivalent of the number $1$; enables subtracting scalar $\lambda$ from matrix $\mathbf{A}$. |
| $\mathbf{A} - \lambda \mathbf{I}$ | Shifted Characteristic Matrix | The transformation shifted by $\lambda$; squashes the eigenvector direction into the zero vector. |
| $\det(\mathbf{A} - \lambda \mathbf{I}) = 0$ | Characteristic Equation | Polynomial root condition; ensures matrix $(\mathbf{A} - \lambda \mathbf{I})$ collapses volume and has a non-trivial nullspace. |

##### Why the Math Works Step-by-Step
1. **Why can matrix action become scalar multiplication?** For arbitrary vectors, matrix multiplication $\mathbf{A}\mathbf{x}$ changes both length and direction. But along an eigenvector, the directional output $\mathbf{A}\mathbf{v}$ is parallel to the input $\mathbf{v}$. Thus, the complex matrix operation collapses to simple scaling: $\mathbf{A}\mathbf{v} = \lambda \mathbf{v}$.
2. **Why do we insert the identity matrix $\mathbf{I}$?** In algebra, moving terms to one side yields $\mathbf{A}\mathbf{v} - \lambda \mathbf{v} = \mathbf{0}$. We cannot factor out $\mathbf{v}$ as $(\mathbf{A} - \lambda)\mathbf{v}$ because subtracting a scalar $\lambda$ from a 2D matrix $\mathbf{A}$ is mathematically undefined. Multiplying $\lambda$ by the identity matrix $\mathbf{I}$ creates an $n \times n$ diagonal matrix, allowing valid matrix subtraction: $(\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}$.
3. **Why must the determinant equal zero?** The equation $(\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}$ states that the matrix $(\mathbf{A} - \lambda \mathbf{I})$ maps a non-zero vector $\mathbf{v}$ to $\mathbf{0}$. If $(\mathbf{A} - \lambda \mathbf{I})$ were invertible, we could multiply both sides by its inverse to get $\mathbf{v} = (\mathbf{A} - \lambda \mathbf{I})^{-1}\mathbf{0} = \mathbf{0}$, which contradicts the definition of an eigenvector ($\mathbf{v} \ne \mathbf{0}$). Therefore, the matrix must be singular (non-invertible), which requires its volume scaling factor—the determinant—to equal zero: $\det(\mathbf{A} - \lambda \mathbf{I}) = 0$.
4. **Why are eigenvectors lines rather than isolated points?** If $\mathbf{A}\mathbf{v} = \lambda \mathbf{v}$, then for any scalar $c \ne 0$, we have $\mathbf{A}(c\mathbf{v}) = c(\mathbf{A}\mathbf{v}) = c(\lambda \mathbf{v}) = \lambda(c\mathbf{v})$. Scaling an eigenvector produces another eigenvector with the exact same eigenvalue. Thus, an eigenvector defines an entire invariant 1D subspace (a line through the origin), often standardized to unit length ($\|\mathbf{v}\|_2 = 1$).

---

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |
| :--- | :--- | :--- |
| $\mathbf{A} \in \mathbb{R}^{n \times n}$ | مصفوفة التحويل | مؤثر خطي مربع يؤثر على المتجهات في فضاء ذي $n$ بعداً. |
| $\mathbf{v} \in \mathbb{R}^n \setminus \{\mathbf{0}\}$ | المتجه الذاتي (Eigenvector) | سهم اتجاهي غير صفري لا يعاني من أي دوران إطلاقاً عند التأثير عليه بالمصفوفة $\mathbf{A}$. |
| $\lambda \in \mathbb{R}$ | القيمة الذاتية (Eigenvalue) | المعامل القياسي الذي يحدد مقدار تمدد أو انكماش أو انعكاس المتجه $\mathbf{v}$. |
| $\mathbf{A}\mathbf{v}$ | حاصل ضرب المصفوفة في المتجه | المخرج المكاني الفعلي بعد تطبيق التحويل الخطي للمصفوفة $\mathbf{A}$ على المتجه $\mathbf{v}$. |
| $\lambda \mathbf{v}$ | المتجه المضاعف قياسياً | إثبات هندسي على أن تأثير المصفوفة يطابق تماماً مجرد تمدد عددي بسيط على طول نفس خط المتجه. |
| $\mathbf{I} \in \mathbb{R}^{n \times n}$ | مصفوفة الوحدة | المعادل المصفوفي للرقم $1$؛ يسمح بطرح القيمة القياسية $\lambda$ من المصفوفة $\mathbf{A}$ بشكل رياضي سليم. |
| $\mathbf{A} - \lambda \mathbf{I}$ | المصفوفة المميزة المزاحة | تحويل خطي مُزاح بمقدار $\lambda$؛ يسحق اتجاه المتجه الذاتي ليحوله إلى المتجه الصفري. |
| $\det(\mathbf{A} - \lambda \mathbf{I}) = 0$ | المعادلة المميزة | شرط انعدام المحدد؛ يضمن أن المصفوفة شاذة تسحق الحجم ولها فضاء صفري غير تافه يحتوي حتماً على المتجه الذاتي. |

##### لماذا تعمل هذه المعادلة هندسياً؟
1. **كيف يتحول تأثير مصفوفة معقدة إلى مجرد ضرب عددي؟** في الحالة العامة، يؤدي ضرب مصفوفة في متجه إلى تغيير طوله وزاويته معاً؛ ولكن على طول المتجه الذاتي، يكون الناتج $\mathbf{A}\mathbf{v}$ موازياً تماماً للمدخل $\mathbf{v}$. هنا يتردّى التأثير الهندسي للمصفوفة إلى مجرد شد قياسي خالص: $\mathbf{A}\mathbf{v} = \lambda \mathbf{v}$.
2. **لماذا نقحم مصفوفة الوحدة $\mathbf{I}$ في المعادلة؟** جبرياً، عند نقل الحدود لطرف واحد نحصل على $\mathbf{A}\mathbf{v} - \lambda \mathbf{v} = \mathbf{0}$. لا يمكننا أخذ $\mathbf{v}$ عاملاً مشتركاً بصيغة $(\mathbf{A} - \lambda)\mathbf{v}$ لأن طرح عدد قياسي من مصفوفة مربعة غير معرّف رياضياً. لذا نضرب $\lambda$ في مصفوفة الوحدة $\mathbf{I}$ لتوليد مصفوفة قطرية متوافقة تسمح بالطرح المصفوفي السليم: $(\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}$.
3. **لماذا يجب أن ينعدم المحدد تماماً؟** تعني المعادلة $(\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}$ أن المصفوفة المزاحة تقوم بسحق متجه غير صفري $\mathbf{v}$ إلى الصفر. ولو كانت هذه المصفوفة قابلة للعكس، لضربنا طرفي المعادلة بمعكوسها وحصلنا على $\mathbf{v} = \mathbf{0}$، وهذا يناقض تعريف المتجه الذاتي المشترط لكونه غير صفري. بالتالي يجب أن تكون المصفوفة شاذة وغير قابلة للعكس، وهو ما يقتضي هندسياً أن يكون عامل تحجيم الحجم (المحدد) مساوياً للصفر تماماً: $\det(\mathbf{A} - \lambda \mathbf{I}) = 0$.
4. **لماذا تشكل المتجهات الذاتية خطوطاً كاملة وليس نقاطاً معزولة؟** إذا كانت $\mathbf{A}\mathbf{v} = \lambda \mathbf{v}$، فإن ضرب المتجه في أي عدد حقيقي $c \ne 0$ يعطي $\mathbf{A}(c\mathbf{v}) = c\mathbf{A}\mathbf{v} = c\lambda \mathbf{v} = \lambda(c\mathbf{v})$. تحجيم المتجه الذاتي ينتج متجهاً ذاتياً آخر يمتلك نفس القيمة الذاتية تماماً؛ فالمتجه الذاتي يمثل خطاً هندسياً كاملاً في الفضاء، ويتم تقييده عادة بجعل طوله مساوياً للوحدة ($\|\mathbf{v}\|_2 = 1$).

:::python-challenge{id="py-t1-13"}
---
timeout_ms: 3000
test_cases:
  - input: "round(power_iteration(np.array([[2.0, 0.0], [0.0, 5.0]]), 50)[0], 2)"
    expected: "5.0"
  - input: "round(power_iteration(np.array([[3.0, 1.0], [1.0, 3.0]]), 50)[0], 2)"
    expected: "4.0"
  - input: "round(power_iteration(np.array([[6.0, 0.0], [0.0, 1.0]]), 30)[0], 2)"
    expected: "6.0"
---
```python
import numpy as np

def power_iteration(A: np.ndarray, num_iter: int = 50) -> tuple[float, np.ndarray]:
    """
    Compute the dominant eigenvalue and eigenvector of matrix A via power iteration.

    Intuition
    ---------
    Repeatedly applying matrix A to a generic vector stretches the component
    along the dominant eigenvector faster than any other direction. Normalizing
    the vector at each step prevents numerical overflow and causes the vector
    to converge directly onto the principal invariant axis. The Rayleigh quotient
    then computes the corresponding dominant eigenvalue.

    Parameters
    ----------
    A : np.ndarray of shape (N, N)
        Square matrix with a distinct dominant eigenvalue.
    num_iter : int
        Number of power iteration steps.

    Returns
    -------
    tuple[float, np.ndarray]
        dominant_eigenvalue: Estimated Rayleigh quotient scalar lambda.
        dominant_eigenvector: Normalized unit eigenvector v.
    """
    # Step 1: Initialize a normalized uniform unit vector v of length N
    # v = np.ones(A.shape[0]) / np.sqrt(A.shape[0])

    # Step 2: Iteratively multiply by matrix A and normalize to unit length
    # for _ in range(num_iter):
    #     v = A @ v
    #     v = v / np.linalg.norm(v)

    # Step 3: Compute Rayleigh quotient eigenvalue lambda = v^T @ A @ v and return
    # lam = float(v.T @ A @ v)
    # return lam, v
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** A 2x2 matrix R represents a pure 90-degree counterclockwise rotation of the plane. Does this transformation possess any real eigenvalues or real eigenvectors?

**العربية:** تمثل مصفوفة R بحجم 2x2 دوراناً صافياً للمستوى بزاوية 90 درجة عكس عقارب الساعة. هل تمتلك هذه المصفوفة أي قيم ذاتية أو متجهات ذاتية حقيقية؟

* [x] No real eigenvalues or eigenvectors exist, because every single non-zero vector in the plane is rotated by 90 degrees away from its original line of action, making lambda * v impossible over the real numbers.
  * لا توجد أي قيم أو متجهات ذاتية حقيقية، لأن كل متجه غير صفري في المستوى يدور بزاوية 90 درجة مبتعداً عن خط استقامته الأصلي، مما يجعل المعادلة lambda * v مستحيلة في الأعداد الحقيقية.
  > **Why this is correct:** The characteristic polynomial is det(R - lambda I) = lambda^2 + 1 = 0, whose roots are purely imaginary: lambda = ±i. Geometrically, no real direction remains invariant under a 90-degree twist.
  > **لماذا هذا الخيار صحيح:** كثير الحدود المميز هو lambda^2 + 1 = 0، وجذوره تخيلية بحتة: lambda = ±i. وهندسياً، لا يوجد أي اتجاه حقيقي يصمد أمام الدوران بزاوية 90 درجة.

* [ ] Yes, lambda = 1 with eigenvectors along the x and y axes.
  * نعم، القيمة الذاتية 1 والمتجهات الذاتية ممتدة على المحورين السيني والصادي.
  > **Why this is incorrect:** A vector along the x-axis (1, 0) is rotated to the y-axis (0, 1), which is perpendicular, not a scalar multiple.
  > **لماذا هذا الخيار خاطئ:** المتجه على المحور السيني يدور إلى الصادي، وهو اتجاه متعامد وليس مضاعفاً قياسياً.

* [ ] Yes, lambda = -1 because rotating reverses the orientation.
  * نعم، القيمة الذاتية -1 لأن الدوران يعكس الاتجاهية.
  > **Why this is incorrect:** A 90-degree rotation preserves orientation (det = +1) and does not reverse vectors (that would require a 180-degree rotation).
  > **لماذا هذا الخيار خاطئ:** الدوران بـ 90 درجة يحافظ على الاتجاهية ولا يعكس المتجهات (الانعكاس يتطلب دوراناً بـ 180 درجة).
