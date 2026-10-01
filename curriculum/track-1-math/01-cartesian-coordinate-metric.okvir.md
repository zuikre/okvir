---
id: "cartesian-coordinate-metric"
version: "1.0.0"
title: "Cartesian Coordinate Systems & The Euclidean Metric"
track: "math"
module: "mod-01"
estimated_minutes: 15
prerequisites: []
i18n:
  ar: "نظام الإحداثيات الديكارتية والمقياس الإقليدي"
---

# Cartesian Coordinate Systems & The Euclidean Metric

### Intuition & Physical Grounding

Imagine an infinite, flat desert with no landmarks in sight. To communicate where an oasis lies, you must fix an arbitrary reference stone—the origin $\mathbf{0}$—and establish two perpendicular walking trails, which we call the orthogonal coordinate axes $X$ and $Y$. Every single location in the desert is now uniquely indexed by two signed numbers: how far east or west, and how far north or south.

Once coordinates exist, distance between any two locations is not arbitrary; it is the straight-line physical path carved through space. If you are standing in a city built on a strict rectangular grid like Manhattan, traveling from street corner $\mathbf{p}$ to corner $\mathbf{q}$ forces you to walk along streets and avenues—a path known as the $L_1$ Manhattan metric. But if you are a bird flying freely through the air, you cut diagonally across the blocks. You trace the hypotenuse of a right-angled triangle formed by your horizontal and vertical displacements.

The Pythagorean theorem guarantees that this hypotenuse squared equals the sum of the squares of the legs. The Euclidean metric ($L_2$) generalizes this principle to three, four, or ten thousand dimensions. Crucially, physical space does not care how you orient your coordinate axes: if you rotate your measuring grid, the numbers representing your position will change, but the Euclidean distance between any two stationary points remains fundamentally invariant.

### الحدس الفيزيائي والهندسي

تخيل صحراء لا متناهية منبسطة لا معالم فيها. إذا غادرت قافلة واحة مائية وتوغلت في الرمال، فكيف يمكن لأي شخص آخر العثور على تلك الواحة؟ لا بد أولاً من تثبيت حجر مرجعي نعتبره نقطة الأصل $\mathbf{0}$، ورسم مسارين متعامدين للمشي يمثلان المحورين الإحداثيين المتعامدين $X$ و $Y$. من هذه اللحظة، يصبح كل موقع في الصحراء معرّفاً برقمين محددين: المسافة شرقاً أو غرباً، والمسافة شمالاً أو جنوباً.

بمجرد إنشاء هذا النظام، لا يصبح قياس المسافة بين نقطتين مسألة خاضعة للتقدير العشوائي، بل هو أقصر مسار فيزيائي مستقيم يصل بينهما في الفضاء. إذا كنت تسير في مدينة مصممة على شكل شبكة شوارع مربعة مثل مانهاتن، فإن الانتقال من تقاطع $\mathbf{p}$ إلى تقاطع $\mathbf{q}$ يجبرك على المشي عبر الشوارع والأزقة المتعامدة—وهو ما يسمى بمقياس مانهاتن ($L_1$). ولكن لو كنت طائراً يحلق في الفضاء المفتوح، فإنك ستقطع المسافة قطرياً عبر سماء المدينة، راسماً وتر مثلث قائم الزاوية تشكل أضلاعه إزاحاتك الأفقية والعمودية.

تضمن مبرهنة فيثاغورس أن مربع هذا الوتر يساوي مجموع مربعي الضلعين الآخرين. المقياس الإقليدي ($L_2$) يمثل تعميماً ملهماً لهذه المبرهنة في أي عدد من الأبعاد، سواء كنا في فضاء ثنائي أو ثلاثي الأبعاد أو فضاء بيانات يضم آلاف الأبعاد. والأمر البديع هندسياً هو أن الفضاء الفيزيائي لا يكترث بكيفية تدويرنا للمحاور؛ فلو أدرت شبكة الإحداثيات بزاوية معينة، ستتغير الأرقام التي تمثل إحداثيات كل نقطة، ولكن المسافة الإقليدية المستقيمة الفاصلة بين أي نقطتين تظل ثابتة ومطلقة.

:::simulation-widget{engine="canvas2d" component="CartesianMetricCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
d_2(\mathbf{p}, \mathbf{q}) \coloneqq \|\mathbf{p} - \mathbf{q}\|_2 = \sqrt{\sum_{i=1}^n (p_i - q_i)^2} = \sqrt{(\mathbf{p} - \mathbf{q})^T (\mathbf{p} - \mathbf{q})}
$$

#### Demystifying the Equation
- $\mathbf{p}, \mathbf{q} \in \mathbb{R}^n$: Coordinate vectors representing the exact spatial positions of two points in $n$-dimensional Euclidean space.
- $\mathbf{p} - \mathbf{q}$: The displacement vector pointing directly from destination $\mathbf{q}$ to source $\mathbf{p}$.
- $(p_i - q_i)^2$: The squared coordinate separation along the $i$-th dimension. Squaring eliminates negative signs and penalizes large directional discrepancies.
- $\sum_{i=1}^n$: Accumulates the independent squared contributions across all $n$ mutually orthogonal spatial dimensions.
- $\sqrt{\dots}$: The square root operator inverts the quadratic expansion, restoring the quantity to original physical units of linear length (e.g., meters).
- $(\mathbf{p} - \mathbf{q})^T (\mathbf{p} - \mathbf{q})$: The algebraic inner product (dot product) formulation, showing that squared Euclidean distance is simply the projection of the displacement onto itself.

#### تفكيك المعادلة
- $\mathbf{p}, \mathbf{q} \in \mathbb{R}^n$: متجها الإحداثيات اللذان يمثلان الموقعين المكانيين لنقطتين في فضاء إقليدي ذي $n$ بعداً.
- $\mathbf{p} - \mathbf{q}$: متجه الإزاحة الفراغية الذي ينطلق مباشرة من النقطة $\mathbf{q}$ نحو النقطة $\mathbf{p}$.
- $(p_i - q_i)^2$: مربع الفارق الإحداثي على طول البعد $i$. يضمن التربيع إزالة الإشارات السالبة ومضاعفة معاقبة التباعد الكبير.
- $\sum_{i=1}^n$: يجمع المساهمات التربيعية المستقلة عبر كافة الأبعاد المكانية المتعامدة مثنى مثنى.
- $\sqrt{\dots}$: جذر تربيعي يعكس التمدد التربيعي ليعيد الناتج إلى وحدات الطول الفيزيائية الأصلية (مثل الأمتار).
- $(\mathbf{p} - \mathbf{q})^T (\mathbf{p} - \mathbf{q})$: صياغة الجداء الداخلي (الجداء النقطي لمتجه الإزاحة مع نفسه)، موضحاً أن مربع المسافة هو مقياس طاقة الإزاحة.

:::python-challenge{id="py-cartesian-coordinate-metric"}
---
timeout_ms: 3000
test_cases:
  - input: "euclidean_distance(np.array([0.0, 0.0]), np.array([3.0, 4.0]))"
    expected: "5.0"
  - input: "euclidean_distance(np.array([1.0, 2.0, 3.0]), np.array([1.0, 2.0, 3.0]))"
    expected: "0.0"
  - input: "euclidean_distance(np.array([1.0, 1.0]), np.array([4.0, 5.0]))"
    expected: "5.0"
---
```python
import numpy as np

def euclidean_distance(p: np.ndarray, q: np.ndarray) -> float:
    """
    Compute the Euclidean (L2) distance between two points p and q.
    
    Parameters
    ----------
    p : np.ndarray of shape (D,)
        First coordinate vector.
    q : np.ndarray of shape (D,)
        Second coordinate vector.
        
    Returns
    -------
    float
        The straight-line Euclidean distance between p and q.
    """
    # Step 1: Compute the element-wise difference vector (displacement)
    # diff = ...
    
    # Step 2: Square each component of the difference vector
    # squared_diff = ...
    
    # Step 3: Sum the squared components and compute the square root
    # return ...
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** An autonomous delivery drone calculates distances between stationary landing pads. If the drone's internal coordinate frame is rotated by 45 degrees, how does the straight-line Euclidean distance between two static pads change compared to the grid Manhattan distance?

**العربية:** تحسب طائرة مسيرة ذاتية القيادة المسافات بين منصات هبوط ثابتة. إذا استدار نظام الإحداثيات الداخلي للدرون بزاوية 45 درجة، فكيف تتغير المسافة الإقليدية المستقيمة مقارنة بمسافة مانهاتن الشبكية؟

* [x] Euclidean distance remains strictly unchanged because spatial rotations are orthogonal transforms that preserve inner products and vector norms, whereas Manhattan distance fluctuates with grid alignment.
  * تظل المسافة الإقليدية ثابتة تماماً لأن الدوران تحويل متعامد يحافظ على الجداء الداخلي وأطوال المتجهات، بينما تتغير مسافة مانهاتن لتأثرها بمحاذاة الشبكة.
  > **Why this is correct:** The Euclidean L2 metric is rotationally invariant (isotropic). In contrast, the L1 norm depends on axis orientation: a vector (1, 0) has L1=1, but rotated 45 degrees to (sqrt(2)/2, sqrt(2)/2) its L1 distance increases to sqrt(2) ≈ 1.414.
  > **لماذا هذا الخيار صحيح:** المقياس الإقليدي L2 متناظر دورانياً ولا يكترث بتوجيه المحاور. على النقيض، يعتمد معيار L1 على اتجاه المحاور: فالمتجه (1, 0) طوله L1=1، لكن عند تدويره 45 درجة يصبح طول مانهاتن حوالي 1.414.

* [ ] Both Euclidean and Manhattan distances scale up uniformly by a factor of sqrt(2) due to the diagonal trajectory.
  * تتضاعف كل من المسافتين الإقليدية ومانهاتن بعامل الجذر التربيعي لـ 2 نتيجة المسار القطري.
  > **Why this is incorrect:** Physical distance between stationary objects does not increase just because you tilt your head or rotate your compass.
  > **لماذا هذا الخيار خاطئ:** المسافة الفيزيائية بين أجسام ساكنة لا تزداد لمجرد أنك أملت بوصلتك أو قمت بتدوير محاور قياسك.

* [ ] Euclidean distance shrinks because hypotenuse paths always contract under angular coordinate transformations.
  * تنكمش المسافة الإقليدية لأن مسار الوتر يتقلص دائماً تحت التحويلات الزاوية للإحداثيات.
  > **Why this is incorrect:** The Euclidean path is already the minimal straight-line geodesic in flat space; rotating the coordinate basis cannot shrink or stretch it.
  > **لماذا هذا الخيار خاطئ:** المسار الإقليدي هو بالفعل أقصر مسار جيوديسي مستقيم في الفضاء الإقليدي؛ وتدوير محاور الإسناد لا يمكن أن يقلصه أو يمدده.

