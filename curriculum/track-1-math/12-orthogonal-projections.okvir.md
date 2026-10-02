---
id: "t1-12"
version: "1.0.0"
title: "Orthogonal Projections & Least Squares Approximation"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["t1-11"]
i18n:
  ar: "الإسقاطات المتعامدة وتقريب المربعات الصغرى"
---

# Orthogonal Projections & Least Squares Approximation

### Intuition & Physical Grounding

Imagine standing in a cavernous, high-ceilinged cathedral holding a floating drone hovering in mid-air at position $\mathbf{b}$. If you want to know: *which point on the polished marble floor is closest to the hovering drone?* How would you find it? You would not guess by casting your eyes at an arbitrary slant. You would tie a heavy brass weight to a string—a plumb line (the ancient mason's tool)—and let gravity pull it straight down. The exact point where that brass weight taps the floor at a sharp, perpendicular $90^\circ$ angle is the **orthogonal projection** $\mathbf{p}$.

Why is that perpendicular landing spot guaranteed to be the closest point in the entire universe of the floor? Because if you choose *any other point* on the floor, no matter how close, that point forms a right-angled triangle with the drone and the plumb line's landing spot. By the Pythagorean theorem, the distance to that alternative point is the hypotenuse ($c^2 = a^2 + b^2$), and the hypotenuse is strictly and unconditionally longer than the vertical perpendicular leg. The perpendicular drop is nature's unique, minimal-distance shortcut.

In real-world data science, machine learning, and econometrics, we are constantly faced with a tragic reality: messy real-world data almost never fits our mathematical models perfectly. When we collect experimental measurements $\mathbf{b}$, the observation vector hovers up in space outside the plane spanned by our feature columns $C(\mathbf{A})$. The linear equation $\mathbf{A}\mathbf{x} = \mathbf{b}$ has no exact solution! We cannot bend physical reality to touch our model. 

Instead, we do the next best thing: we drop a mathematical plumb line straight down from reality onto our model's subspace! That closest possible linear approximation is the orthogonal projection $\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}$. The projection matrix $\mathbf{P}$ carries a delightful algebraic superpower called **idempotence** ($\mathbf{P}^2 = \mathbf{P}$). In plain English: once you have dropped a point onto the floor, dropping it onto the floor a second time changes nothing—it already rests on the floor!

#### Why Do We Care?
1. **Ordinary Least Squares (OLS) Linear Regression:** Every time an econometrician or data scientist fits a linear regression line ($\hat{y} = X\beta$), they are computing an orthogonal projection. The famous normal equations $\beta = (X^T X)^{-1} X^T y$ are derived directly by projecting the target vector $y$ perpendicularly onto the column space of features $X$.
2. **Audio Denoising & Noise Cancellation:** Microphones record human speech corrupted by ambient background hiss. Digital signal processing chips project the noisy audio waveform onto a subspace of known human vocal frequencies. Any signal component that falls into the perpendicular subspace is discarded as background noise.
3. **Computer Graphics & CAD Blueprints (Orthographic Projection):** Architectural CAD software projects 3D building models onto flat 2D blueprints using projection matrices. Orthographic projection preserves parallel lines and exact dimensional measurements without perspective distortion.

---

### الحدس الفيزيائي والهندسي

تخيل أنك تقف في بهو قصر فسيح ذي سقف شاهق الارتفاع، وتمسك بزمام طائرة مسيرة صغيرة تطفو في الهواء عند النقطة $\mathbf{b}$. إذا أردت معرفة: *ما هي أقرب نقطة على أرضية البهو الرخامية إلى هذه الطائرة المعلقة؟* فكيف تحددها؟ لن تلجأ للتخمين بالنظر بزوايا مائلة؛ بل ستستخدم الأداة التي اعتمد عليها البناؤون منذ آلاف السنين: **الشاقول** (Plumb Line)، وهو خيط متين يتدلى في نهايته ثقل معدني تسحبه الجاذبية نحو الأسفل مباشرة. النقطة التي يلامس فيها الثقل الأرضية الرخامية بزاوية قائمة صارمة $90^\circ$ هي **الإسقاط المتعامد** $\mathbf{p}$.

لماذا تكون هذه النقطة الشاقولية هي الأقرب حتماً دون أدنى شك؟ لأنك إذا اخترت *أي نقطة بديلة أخرى* على الأرضية مهما كانت قريبة، فإن تلك النقطة ستشكل مع الطائرة ونقطة الشاقول مثلثاً قائم الزاوية. وبحسب مبرهنة فيثاغورس، فإن المسافة إلى تلك النقطة البديلة هي وتر المثلث ($c^2 = a^2 + b^2$)، والوتر أطول قطعاً من الضلع القائم الرأسي. السقوط العمودي هو أقصر مسار أوجدته الطبيعة في الفضاء.

في علم البيانات التطبيقي والتعلم الآلي، نواجه دائماً حقيقة واقعية لا مفر منها: البيانات التجريبية المشوبة بالضجيج لا تتطابق أبداً مع نماذجنا الرياضية بدقة مثالية. فعندما نجمع مشاهدات العالم الواقعي $\mathbf{b}$، فإن هذا المتجه يطفو في الفضاء خارج فضاء ميزات النموذج $C(\mathbf{A})$. المعادلة $\mathbf{A}\mathbf{x} = \mathbf{b}$ مستحيلة الحل تماماً! ونحن لا نملك القدرة على تغيير قوانين الواقع لتلائم نموذجنا.

بدلاً من الاستسلام، نصنع أفضل بديل متاح في الكون: نسقط شاقولاً رياضياً من حقيقة الواقع $\mathbf{b}$ عمودياً على فضاء النموذج! هذا التقريب الخطي الأقرب لحقيقة الواقع هو الإسقاط المتعامد $\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}$. وتمتلك مصفوفة الإسقاط $\mathbf{P}$ ميزة جبرية ساحرة تُعرف بـ **الصمود التكراري** (Idempotence: $\mathbf{P}^2 = \mathbf{P}$). ومعناها البسيط والعميق: بمجرد أن تسقط نقطة على الأرض، فإن محاولة إسقاطها مرة أخرى لن تغير شيئاً؛ فهي مستقرة بالفعل على الأرض!

#### لماذا نهتم بهذا المفهوم؟
1. **الانحدار الخطي العادي (OLS) في علم البيانات:** في كل مرة يبني فيها باحث نموذج انحدار خطي للتنبؤ بالأسعار أو المبيعات ($\hat{y} = X\beta$)، فإنه ينفذ إسقاطاً متعامداً. ومعادلة الانحدار الشهيرة $\beta = (X^T X)^{-1} X^T y$ مشتقة هندسياً بالكامل من إسقاط متجه النتائج $y$ عمودياً على فضاء مصفوفة الميزات $X$.
2. **تنقية الصوت وعزل الضوضاء الرقمية:** عندما يسجل الميكروفون صوت المتحدث مشوباً بضجيج الشارع، تقوم معالجات الإشارة بإسقاط إشارة الصوت على الفضاء الفرعي لترددات الحبال الصوتية البشرية؛ وكل ما يسقط خارج هذا الفضاء في الاتجاه العمودي يُحذف فوراً باعتباره ضوضاء زائدة.
3. **الرسوم الهندسية المعمارية (Orthographic Projection):** في برامج التصميم الهندسي (AutoCAD)، تُسقط المجسمات ثلاثية الأبعاد على مخططات معمارية ثنائية الأبعاد باستخدام مصفوفات الإسقاط المتعامد للحفاظ على دقة الأبعاد وتوازي الجدران دون تشويه المنظور البصري.

:::simulation-widget{engine="canvas2d" component="GramSchmidtOrthogonalCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{p} = \mathbf{P}\mathbf{b} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{b}, \quad \mathbf{P}^2 = \mathbf{P}, \quad \mathbf{P}^T = \mathbf{P}
$$

#### Demystifying the Equation

| Symbol | Mathematical Term | Plain English Translation & Intuition |
| :--- | :--- | :--- |
| $\mathbf{p} = \mathbf{P}\mathbf{b}$ | Orthogonal Projection Vector | The point inside subspace $C(\mathbf{A})$ closest to external target vector $\mathbf{b}$. |
| $\mathbf{P} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T$ | Projection Matrix Operator | The linear operator that projects any vector perpendicularly onto the column space of $\mathbf{A}$. |
| $\mathbf{A}^T\mathbf{A}$ | Gram Matrix | The symmetric square matrix of column inner products; invertible if $\mathbf{A}$ has full column rank. |
| $\mathbf{e} = \mathbf{b} - \mathbf{p}$ | Residual Error Vector | The plumb line vector: represents the perpendicular difference dropped from $\mathbf{b}$ onto $\mathbf{p}$. |
| $\mathbf{P}^2 = \mathbf{P}$ | Idempotence | Dropping an already-projected vector onto the subspace leaves it strictly unchanged. |
| $\mathbf{P}^T = \mathbf{P}$ | Symmetry | Algebraic guarantee that the projection angle is strictly perpendicular ($90^\circ$ orthogonal). |

##### Why the Math Works Step-by-Step
1. **Deriving the master projection formula $\mathbf{P} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T$:**
   Since the projection $\mathbf{p}$ must live inside the column space $C(\mathbf{A})$, it can be written as some linear combination of the columns of $\mathbf{A}$:
   $$\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}$$
   The plumb line error vector is $\mathbf{e} = \mathbf{b} - \mathbf{p} = \mathbf{b} - \mathbf{A}\hat{\mathbf{x}}$.
   To be the closest possible point, this error vector must stand at a strict $90^\circ$ right angle to *every single column* of matrix $\mathbf{A}$:
   $$\mathbf{A}^T \mathbf{e} = \mathbf{0} \implies \mathbf{A}^T (\mathbf{b} - \mathbf{A}\hat{\mathbf{x}}) = \mathbf{0}$$
   Expanding and distributing $\mathbf{A}^T$:
   $$\mathbf{A}^T \mathbf{b} - \mathbf{A}^T\mathbf{A}\hat{\mathbf{x}} = \mathbf{0} \implies \mathbf{A}^T\mathbf{A}\hat{\mathbf{x}} = \mathbf{A}^T\mathbf{b}$$
   These are the famous **Normal Equations**! Assuming the columns of $\mathbf{A}$ are linearly independent, the square matrix $\mathbf{A}^T\mathbf{A}$ is invertible:
   $$\hat{\mathbf{x}} = (\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{b}$$
   To find the physical projected vector $\mathbf{p}$, substitute $\hat{\mathbf{x}}$ back into $\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}$:
   $$\mathbf{p} = \mathbf{A} [(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{b}] = \left[\mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\right] \mathbf{b} = \mathbf{P}\mathbf{b}$$
2. **Proof of Idempotence ($\mathbf{P}^2 = \mathbf{P}$):**
   $$\mathbf{P}^2 = \left[\mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\right] \left[\mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\right]$$
   Notice the middle terms: $[(\mathbf{A}^T\mathbf{A})^{-1}][\mathbf{A}^T\mathbf{A}] = \mathbf{I}$ (the identity matrix). Thus:
   $$\mathbf{P}^2 = \mathbf{A} \cdot \mathbf{I} \cdot (\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T = \mathbf{P}$$

---

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |
| :--- | :--- | :--- |
| $\mathbf{p} = \mathbf{P}\mathbf{b}$ | متجه الإسقاط المتعامد | أقرب نقطة داخل فضاء النموذج $C(\mathbf{A})$ إلى المتجه المستهدف الخارجي $\mathbf{b}$. |
| $\mathbf{P} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T$ | مصفوفة مؤثر الإسقاط | المؤثر الخطي الشامل الذي يسقط أي متجه عمودياً بزاوية $90^\circ$ على فضاء أعمدة $\mathbf{A}$. |
| $\mathbf{A}^T\mathbf{A}$ | مصفوفة غرام | مصفوفة مربعة متناظرة لحواضل الضرب الداخلي؛ وتكون قابلة للقلب إذا كانت أعمدة $\mathbf{A}$ مستقلة خطياً. |
| $\mathbf{e} = \mathbf{b} - \mathbf{p}$ | متجه خطأ الشاقول | خيط الشاقول الفيزيائي: يمثل الفارق المتعامد بين حقيقة الواقع $\mathbf{b}$ وتقريب النموذج $\mathbf{p}$. |
| $\mathbf{P}^2 = \mathbf{P}$ | خاصية الصمود التكراري | إعادة إسقاط متجه مستقر على الفضاء تبقيه في مكانه تماماً دون أي إزاحة إضافية. |
| $\mathbf{P}^T = \mathbf{P}$ | التناظر الجبري | الضمان الرياضي الحاسم بأن زاوية السقوط عمودية تماماً وليست مائلة. |

##### لماذا تعمل هذه المعادلة هندسياً؟
1. **اشتقاق المعادلة الأم للإسقاط $\mathbf{P} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T$:**
   بما أن النقطة المسقطة $\mathbf{p}$ تقع داخل فضاء الأعمدة $C(\mathbf{A})$، فإنها تساوي تركيباً خطياً لأعمدة المصفوفة:
   $$\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}$$
   ومتجه خطأ الشاقول هو $\mathbf{e} = \mathbf{b} - \mathbf{p} = \mathbf{b} - \mathbf{A}\hat{\mathbf{x}}$.
   ولكي تكون هذه النقطة هي الأقرب على الإطلاق، يجب أن يتعامد خيط الشاقول مع *كل عمود* من أعمدة المصفوفة $\mathbf{A}$:
   $$\mathbf{A}^T \mathbf{e} = \mathbf{0} \implies \mathbf{A}^T (\mathbf{b} - \mathbf{A}\hat{\mathbf{x}}) = \mathbf{0}$$
   بفك الأقواس وتوزيع $\mathbf{A}^T$:
   $$\mathbf{A}^T \mathbf{b} - \mathbf{A}^T\mathbf{A}\hat{\mathbf{x}} = \mathbf{0} \implies \mathbf{A}^T\mathbf{A}\hat{\mathbf{x}} = \mathbf{A}^T\mathbf{b}$$
   هذه هي **المعادلات الطبيعية** (Normal Equations) الشهيرة! وبقلب المصفوفة المربعة:
   $$\hat{\mathbf{x}} = (\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{b}$$
   وللحصول على موقع النقطة المسقطة $\mathbf{p}$، نعوض بقيمة $\hat{\mathbf{x}}$:
   $$\mathbf{p} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{b} = \mathbf{P}\mathbf{b}$$
2. **برهان الصمود التكراري ($\mathbf{P}^2 = \mathbf{P}$):**
   $$\mathbf{P}^2 = \left[\mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\right] \left[\mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\right]$$
   لاحظ المقدار في المنتصف: $[(\mathbf{A}^T\mathbf{A})^{-1}][\mathbf{A}^T\mathbf{A}] = \mathbf{I}$ (مصفوفة الوحدة المحايدة)، فيختزل التعبير فوراً إلى:
   $$\mathbf{P}^2 = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T = \mathbf{P}$$

:::python-challenge{id="py-t1-12"}
---
timeout_ms: 3000
test_cases:
  - input: "project_onto_line(np.array([1.0, 0.0]), np.array([3.0, 4.0]))"
    expected: "array([3., 0.])"
  - input: "project_onto_line(np.array([1.0, 1.0]), np.array([2.0, 0.0]))"
    expected: "array([1., 1.])"
  - input: "project_onto_line(np.array([0.0, 2.0]), np.array([5.0, 6.0]))"
    expected: "array([0., 6.])"
---
```python
import numpy as np

def project_onto_line(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    """
    Project target vector b orthogonally onto the 1D subspace line spanned by vector a.

    Intuition
    ---------
    Orthogonal projection finds the point p along line a closest to point b.
    Geometrically, the error vector (b - p) is perpendicular to direction a,
    yielding scalar multiplier c = (a . b) / (a . a) and projection p = c * a.

    Parameters
    ----------
    a : np.ndarray of shape (D,)
        Direction vector defining the 1D line subspace (must be non-zero).
    b : np.ndarray of shape (D,)
        Target vector to be projected.

    Returns
    -------
    np.ndarray of shape (D,)
        Projected vector p = (a^T b / a^T a) * a.

    Raises
    ------
    ValueError
        If direction vector a is a zero vector.
    """
    # Step 1: Compute the dot product of direction vector a with itself (squared length)
    dot_aa = float(np.dot(a, a))
    if np.isclose(dot_aa, 0.0):
        raise ValueError("Direction vector a must be non-zero to define a line.")

    # Step 2: Compute the dot product of direction vector a with target vector b
    dot_ab = float(np.dot(a, b))

    # Step 3: Compute scalar projection coefficient c = (a . b) / (a . a)
    scalar_proj = dot_ab / dot_aa

    # Step 4: Scale direction vector a by the scalar coefficient to obtain projection p
    return scalar_proj * a
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** Let $\mathbf{P}$ be an orthogonal projection matrix onto a linear subspace $S$. If we apply the projection matrix twice in succession to any vector $\mathbf{v}$, what is the value of $\mathbf{P}(\mathbf{P}\mathbf{v})$?

**العربية:** لتكن $\mathbf{P}$ مصفوفة إسقاط متعامد على فضاء فرعي $S$. إذا طبقنا مصفوفة الإسقاط مرتين متتاليتين على أي متجه $\mathbf{v}$، فما هي قيمة $\mathbf{P}(\mathbf{P}\mathbf{v})$؟

* [x] $\mathbf{P}\mathbf{v}$, because once a vector is projected into subspace $S$, it already lies entirely inside $S$, so projecting it again produces zero further change (idempotence $\mathbf{P}^2 = \mathbf{P}$).
  * $\mathbf{P}\mathbf{v}$، لأن المتجه بمجرد إسقاطه في الفضاء $S$ يصبح واقعاً فيه بالكامل، وإعادة إسقاطه لن تحدث أي تغيير إضافي (خاصية الصمود $\mathbf{P}^2 = \mathbf{P}$).
  > **Why this is correct:** Idempotence ($\mathbf{P}^2 = \mathbf{P}$) is the definitive mathematical fingerprint of projection. Geometrically, dropping a heavy weight onto the floor and then dropping it onto the floor again leaves it in the exact same spot on the floor.
  > **لماذا هذا الخيار صحيح:** الصمود التكراري ($\mathbf{P}^2 = \mathbf{P}$) هو البصمة الجبرية المميزة لمصفوفات الإسقاط. وهندسياً، إسقاط ثقل على الأرض ثم محاولة إسقاطه ثانية يبقيه في نفس النقطة الرخامية على الأرض دون حراك.

* [ ] Zero vector $\mathbf{0}$, because repeated projection cancels out all vector components.
  * المتجه الصفري $\mathbf{0}$، لأن تكرار الإسقاط يلغي كافة مركبات المتجه.
  > **Why this is incorrect:** Projecting preserves the vector's shadow component inside $S$; it only discards the perpendicular component once.
  > **لماذا هذا الخيار خاطئ:** الإسقاط لا يلغي المتجه، بل يحافظ على مركبته المستقرة داخل فضاء الإسقاط $S$؛ وهو يحذف المركبة العمودية مرة واحدة فقط ولا يحذف المتجه بأكمله.

* [ ] $2 \cdot \mathbf{P}\mathbf{v}$, because the transformation was executed twice.
  * $2 \cdot \mathbf{P}\mathbf{v}$، لأن التحويل نُفذ مرتين متعاقبتين.
  > **Why this is incorrect:** Matrix multiplication composes geometric operations; it does not add them algebraically.
  > **لماذا هذا الخيار خاطئ:** ضرب المصفوفات يركب التحويلات الهندسية ولا يجمعها حسابياً.
