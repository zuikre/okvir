---
id: "linear-algebra-vectors"
version: "1.0.0"
title: "Vectors as Directed Line Segments & Spatial Displacements"
track: "math"
module: "mod-01"
estimated_minutes: 15
prerequisites: ["cartesian-coordinate-metric"]
i18n:
  ar: "المتجهات كقطع موجهة وإزاحات مكانية"
---

# Vectors as Directed Line Segments & Spatial Displacements

### Intuition & Physical Grounding

A vector is not just a column of static numbers sitting inside software memory. Physically, a vector is a displacement arrow: a command that says 'travel 3 units east and 4 units north'. The arrow possesses both a magnitude (how far you travel) and a direction (where you point). It does not care where it begins; whether you start at your house or in another town, the instruction 'walk 3 east, 4 north' is the exact same vector.

When you combine two trips—first displacement $\mathbf{u}$, immediately followed by displacement $\mathbf{v}$—you place the tail of the second arrow at the tip of the first arrow. This is the intuitive tip-to-tail rule of vector addition. Because motion in orthogonal directions is independent, the total east-west displacement is simply $u_x + v_x$, and the total north-south displacement is $u_y + v_y$.

Multiplying a vector by a scalar $\alpha$ acts like an elastic band: setting $\alpha = 2$ doubles the length of your journey along the same trajectory. Setting $\alpha = -1$ flips the arrow 180 degrees backwards, retracing your footsteps in the reverse direction. From computer graphics physics engines to multi-layer neural networks, every modern computational system is constructed by chaining and scaling these basic geometric displacements.

### الحدس الفيزيائي والهندسي

المتجه ليس مجرد عمود من الأرقام الجامدة في ذاكرة الحاسوب. بالمعنى الفيزيائي، المتجه هو سهم إزاحة: تعليمة حركية تأمرك بـ 'التحرك 3 وحدات شرقاً و4 وحدات شمالاً'. يمتلك المتجه مقداراً (المسافة المقطوعة) واتجاهاً (جهة الحركة). وهو لا يكترث بنقطة بدايته؛ فسواء انطلقت من منزلك أو من مدينة أخرى، فإن تعليمة 'امشِ 3 شرقاً و4 شمالاً' تظل هي نفس المتجه تماماً.

عندما تجمع بين رحلتين متعاقبتين—إزاحة أولى يمثلها $\mathbf{u}$ تليها مباشرة إزاحة ثانية يمثلها $\mathbf{v}$—فإنك تضع ذيل السهم الثاني عند رأس السهم الأول (قاعدة الرأس بالذيل Tip-to-Tail). ولأن الحركة في الاتجاهات المتعامدة مستقلة، فإن إجمالي الإزاحة الأفقية هو ببساطة $u_x + v_x$، وإجمالي الإزاحة الرأسية هو $u_y + v_y$.

ضرب المتجه في عدد قياسي $\alpha$ يشبه شد شريط مطاطي: جعل $\alpha = 2$ يضاعف مسافة رحلتك على نفس المسار تماماً، بينما جعل $\alpha = -1$ يعكس اتجاه السهم 180 درجة إلى الخلف لتعود في الاتجاه المعاكس. من محركات ألعاب الفيديو والرسوم ثلاثية الأبعاد إلى شبكات التعلم العميق، تُبنى كافة الأنظمة الحوسبية الحديثة عبر تركيب وشد هذه الأسهم الهندسية.

:::simulation-widget{engine="canvas2d" component="VectorGeometryCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{w} = \alpha \mathbf{u} + \beta \mathbf{v} = \begin{bmatrix} \alpha u_1 + \beta v_1 \\ \vdots \\ \alpha u_n + \beta v_n \end{bmatrix}, \quad \|\mathbf{v}\|_2 = \sqrt{\sum_{i=1}^n v_i^2}
$$

#### Demystifying the Equation
- \mathbf{u}, \mathbf{v} \in \mathbb{R}^n: Spatial displacement vectors residing in an $n$-dimensional vector space.
- \alpha, \beta \in \mathbb{R}: Scalar scaling coefficients that stretch, shrink, or reverse the directions of vectors.
- \mathbf{w} = \alpha \mathbf{u} + \beta \mathbf{v}: The resulting linear combination vector formed by scaling and tip-to-tail addition.
- \begin{bmatrix} \alpha u_i + \beta v_i \end{bmatrix}: Component-wise arithmetic showing that vector operations act independently across each coordinate axis.
- \|\mathbf{v}\|_2: The Euclidean magnitude (length) of the vector, computed as the square root of the sum of squared components.

#### تفكيك المعادلة
- \mathbf{u}, \mathbf{v} \in \mathbb{R}^n: متجها إزاحة مكانية يقعان في فضاء متجهي ذي $n$ بعداً.
- \alpha, \beta \in \mathbb{R}: معاملات قياسية عددية تقوم بشد المتجهات أو تقليصها أو عكس اتجاهاتها.
- \mathbf{w} = \alpha \mathbf{u} + \beta \mathbf{v}: المتجه الناتج عن التركيب الخطي بعد التحجيم والجمع المتتالي.
- \begin{bmatrix} \alpha u_i + \beta v_i \end{bmatrix}: الحساب المستقل لكل مركبة، مما يثبت أن العمليات المتجهية تعمل بشكل مستقل على كل محور.
- \|\mathbf{v}\|_2: المقدار الإقليدي (طول المتجه)، المحسوب كالجذر التربيعي لمجموع مربعات المركبات.

:::python-challenge{id="py-linear-algebra-vectors"}
---
timeout_ms: 3000
test_cases:
  - input: "vector_linear_combination(np.array([1.0, 2.0]), np.array([3.0, -1.0]), 2.0, 3.0)"
    expected: "array([11.,  1.])"
  - input: "vector_linear_combination(np.array([2.0, 4.0]), np.array([1.0, 1.0]), 0.5, -1.0)"
    expected: "array([0., 1.])"
  - input: "vector_linear_combination(np.array([0.0, 5.0]), np.array([1.0, 0.0]), 0.0, 4.0)"
    expected: "array([4., 0.])"
---
```python
import numpy as np

def vector_linear_combination(u: np.ndarray, v: np.ndarray, alpha: float, beta: float) -> np.ndarray:
    """
    Compute the linear combination w = alpha * u + beta * v.
    
    Parameters
    ----------
    u : np.ndarray of shape (D,)
        First displacement vector.
    v : np.ndarray of shape (D,)
        Second displacement vector.
    alpha : float
        Scalar multiplier for vector u.
    beta : float
        Scalar multiplier for vector v.
        
    Returns
    -------
    np.ndarray of shape (D,)
        The combined resultant vector.
    """
    # Step 1: Scale displacement vector u by alpha
    # scaled_u = ...
    
    # Step 2: Scale displacement vector v by beta
    # scaled_v = ...
    
    # Step 3: Add the two scaled vectors element-wise
    # return ...
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** Imagine a drone flying in 2D space. It executes displacement vector u, followed immediately by displacement vector v. Under what geometric condition does the drone's net distance from its origin strictly equal the sum of the distances of the two individual legs (||u + v|| = ||u|| + ||v||)?

**العربية:** تخيل طائرة درون تتحرك في فضاء ثنائي الأبعاد. قامت بإزاحة يمثلها المتجه u، تلتها مباشرة إزاحة أخرى يمثلها المتجه v. تحت أي شرط هندسي تكون المسافة الصافية للدرون عن نقطة الانطلاق مساوية تماماً لمجموع مسافتي المرحلتين المنفردتين (||u + v|| = ||u|| + ||v||)؟

* [x] When u and v are collinear and point in the exact same direction (angle theta = 0 degrees).
  * عندما يكون المتجهان u و v على نفس خط الاستقامة ويشيران تماماً إلى نفس الاتجاه (الزاوية ثيتا = 0 درجة).
  > **Why this is correct:** By the Triangle Inequality, ||u + v|| <= ||u|| + ||v||. Equality holds if and only if there is no bend in the path; any non-zero angle creates a shortcut hypotenuse strictly shorter than walking the legs.
  > **لماذا هذا الخيار صحيح:** وفقاً لمتباينة المثلث، ||u + v|| <= ||u|| + ||v||. وتتحقق المساواة الصارمة فقط إذا لم يكن هناك أي انحناء في المسار؛ فوجود أي زاوية يصنع وتراً مختصراً أقصر قطعاً من مجموع الضلعين.

* [ ] When u and v are strictly perpendicular (orthogonal, angle theta = 90 degrees).
  * عندما يكون المتجهان متعامدين تماماً (الزاوية ثيتا = 90 درجة).
  > **Why this is incorrect:** When orthogonal, ||u + v||^2 = ||u||^2 + ||v||^2 by Pythagoras, which means ||u + v|| is strictly less than ||u|| + ||v||.
  > **لماذا هذا الخيار خاطئ:** عند التعامد، ينطبق فيثاغورس ||u + v||^2 = ||u||^2 + ||v||^2، مما يعني أن طول المحصلة أقل قطعاً من المجموع الجبري لطولي المتجهين.

* [ ] Whenever ||u|| = ||v||, regardless of the angle between them.
  * كلما تساوى طولا المتجهين ||u|| = ||v|| بغض النظر عن الزاوية بينهما.
  > **Why this is incorrect:** Equal lengths do not prevent angular cancellation. If u and v have equal lengths at 120 degrees, ||u + v|| = ||u||, not 2||u||.
  > **لماذا هذا الخيار خاطئ:** تساوي الأطوال لا يمنع الإلغاء الزاوي. إذا كان المتجهان متساويين وبينهما زاوية 120 درجة، فإن طول المحصلة يساوي طول أحدهما فقط وليس ضعفه.

