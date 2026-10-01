---
id: "orthogonal-projections"
version: "1.0.0"
title: "Orthogonal Projections & Least Squares Approximation"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["four-fundamental-subspaces"]
i18n:
  ar: "الإسقاطات المتعامدة وتقريب المربعات الصغرى"
---

# Orthogonal Projections & Least Squares Approximation

### Intuition & Physical Grounding

Imagine standing in a high-ceilinged room holding a floating balloon at point $\mathbf{b}$. What point on the floor is closest to the balloon? You don't guess at an angle; you drop a weighted plumb line straight down. The spot where the plumb line strikes the floor at a sharp $90^\circ$ angle is the orthogonal projection $\mathbf{p}$.

Why is this point the absolute closest? Because any other point on the floor forms a right-angled triangle with the balloon and the projection. By the Pythagorean theorem, any other path is the hypotenuse, and the hypotenuse is strictly longer than the vertical perpendicular drop. Orthogonal projection is nature's way of finding the closest approximation.

When we collect messy data in machine learning, the true outcome vector $\mathbf{b}$ rarely lies inside our model's subspace $C(\mathbf{A})$. We cannot solve $\mathbf{A}\mathbf{x} = \mathbf{b}$ exactly. Instead, we project $\mathbf{b}$ orthogonally onto $C(\mathbf{A})$, producing $\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}$. The projection matrix $\mathbf{P}$ possesses a beautiful mathematical property: $\mathbf{P}^2 = \mathbf{P}$ (idempotence). Once a point is dropped onto the floor, dropping it again leaves it exactly where it is!

### الحدس الفيزيائي والهندسي

تخيل أنك تقف في غرفة ذات سقف مرتفع وتمسك ببالون يطفو في الهواء عند النقطة $\mathbf{b}$. ما هي أقرب نقطة على أرضية الغرفة إلى هذا البالون؟ لا تخمن بزوايا مائلة؛ بل تسقط خيطاً به ثقل شاقولي نحو الأسفل مباشرة. النقطة التي يلمس فيها الخيط الأرض بزاوية قائمة $90^\circ$ هي الإسقاط المتعامد $\mathbf{p}$.

لماذا تكون هذه النقطة هي الأقرب على الإطلاق؟ لأن أي نقطة أخرى على الأرضية ستشكل مثلثاً قائم الزاوية مع البالون ونقطة الإسقاط. ووفق مبرهنة فيثاغورس، فإن أي مسار بديل هو وتر المثلث، والوتر أطول قطعاً من الضلع القائم الشاقولي. الإسقاط المتعامد هو وسيلة الطبيعة المثلى لإيجاد أقرب تقريب ممكن.

عندما نجمع بيانات واقعية مشوبة بالضجيج في تعلم الآلة، نادراً ما يقع متجه النتائج الحقيقي $\mathbf{b}$ داخل فضاء النموذج $C(\mathbf{A})$. يستحيل حل $\mathbf{A}\mathbf{x} = \mathbf{b}$ بدقة تامة. بدلاً من ذلك، نسقط $\mathbf{b}$ عمودياً على فضاء الأعمدة لينتج $\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}$. تتميز مصفوفة الإسقاط $\mathbf{P}$ بخاصية رياضية ساحرة: $\mathbf{P}^2 = \mathbf{P}$ (الصمود التكراري Idempotence). فبمجرد هبوط النقطة على الأرض، فإن محاولة إسقاطها مرة ثانية تبقيها في نفس مكانها تماماً دون تغيير!

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
- \mathbf{p}: The projected vector lying inside subspace $C(\mathbf{A})$, representing the best linear approximation to $\mathbf{b}$.
- \mathbf{P} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T: The orthogonal projection matrix operator.
- \mathbf{A}^T\mathbf{A}: The Gram matrix (normal equations kernel); invertible whenever the columns of $\mathbf{A}$ are linearly independent.
- \mathbf{P}^2 = \mathbf{P}: Idempotence; applying the projection a second time leaves the projected vector unchanged.
- \mathbf{P}^T = \mathbf{P}: Symmetry; guarantees that the projection angle is strictly perpendicular ($90^\circ$).
- \mathbf{e} = \mathbf{b} - \mathbf{p}: The residual error vector, guaranteed to satisfy $\mathbf{A}^T\mathbf{e} = \mathbf{0}$.

#### تفكيك المعادلة
- \mathbf{p}: المتجه المسقط الواقع داخل فضاء الأعمدة $C(\mathbf{A})$، ويمثل أفضل تقريب خطي للمتجه $\mathbf{b}$.
- \mathbf{P} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T: مصفوفة مؤثر الإسقاط المتعامد.
- \mathbf{A}^T\mathbf{A}: مصفوفة غرام؛ وتكون قابلة للقلب طالما كانت أعمدة $\mathbf{A}$ مستقلة خطياً.
- \mathbf{P}^2 = \mathbf{P}: خاصية الصمود التكراري (Idempotence)؛ فإعادة تطبيق الإسقاط تبقي المتجه ثابتاً دون أي تغيير.
- \mathbf{P}^T = \mathbf{P}: خاصية التناظر؛ وتضمن هندسياً أن زاوية السقوط عمودية تماماً ($90^\circ$).
- \mathbf{e} = \mathbf{b} - \mathbf{p}: متجه البواقي أو الخطأ، ويحقق حتماً $\mathbf{A}^T\mathbf{e} = \mathbf{0}$.

:::python-challenge{id="py-orthogonal-projections"}
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
    Project vector b orthogonally onto the 1D subspace spanned by vector a.
    
    Parameters
    ----------
    a : np.ndarray of shape (D,)
        Direction vector defining the 1D subspace line (a != 0).
    b : np.ndarray of shape (D,)
        Target vector to be projected.
        
    Returns
    -------
    np.ndarray of shape (D,)
        Projected vector p = (a^T b / a^T a) * a.
    """
    # Step 1: Compute inner product between line vector a and target b
    # dot_ab = ...
    
    # Step 2: Compute squared norm of line vector a (dot product with itself)
    # dot_aa = ...
    
    # Step 3: Compute scalar projection coefficient and scale direction vector a
    # return ...
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** Let P be an orthogonal projection matrix onto a linear subspace S. If we apply the projection matrix twice to a vector v, what is the value of P @ (P @ v)?

**العربية:** لتكن P مصفوفة إسقاط متعامد على فضاء فرعي S. إذا طبقنا مصفوفة الإسقاط مرتين متتاليتين على متجه v، فما هي قيمة P @ (P @ v)؟

* [x] P @ v, because once a vector is projected into subspace S, it already lies entirely inside S, so projecting it again produces zero further change (idempotence P^2 = P).
  * P @ v، لأن المتجه بمجرد إسقاطه في الفضاء S يصبح واقعاً فيه بالكامل، وإعادة إسقاطه لن تحدث أي تغيير إضافي (خاصية الصمود P^2 = P).
  > **Why this is correct:** Idempotence (P^2 = P) is the defining algebraic fingerprint of projection. Geometrically, dropping a point onto the floor and then dropping it onto the floor again leaves it in the exact same spot on the floor.
  > **لماذا هذا الخيار صحيح:** الصمود التكراري (P^2 = P) هو البصمة الجبرية المميزة لمصفوفات الإسقاط. وهندسياً، إسقاط نقطة على الأرض ثم إعادة إسقاطها يبقيها في نفس النقطة على الأرض.

* [ ] Zero vector 0, because repeated projection cancels out all vector components.
  * المتجه الصفري 0، لأن تكرار الإسقاط يلغي كافة مركبات المتجه.
  > **Why this is incorrect:** Projecting does not cancel the vector; it preserves its component inside S.
  > **لماذا هذا الخيار خاطئ:** الإسقاط لا يلغي المتجه بل يحافظ على مركبته المستقرة داخل فضاء الإسقاط S.

* [ ] 2 * P @ v, because the transformation was executed twice.
  * 2 * P @ v، لأن التحويل نُفذ مرتين متعاقبتين.
  > **Why this is incorrect:** Matrix multiplication applies successive operators; it does not add them.
  > **لماذا هذا الخيار خاطئ:** ضرب المصفوفات يركب العمليات هندسياً ولا يجمعها جبرياً.

