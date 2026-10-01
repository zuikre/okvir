---
id: "gaussian-elimination-systems"
version: "1.0.0"
title: "Gaussian Elimination, Row Operations & Linear Systems"
track: "math"
module: "mod-03"
estimated_minutes: 15
prerequisites: ["linear-maps-transformations"]
i18n:
  ar: "الحذف الغاوسي والعمليات الصفية وحل المنظومات الخطية"
---

# Gaussian Elimination, Row Operations & Linear Systems

### Intuition & Physical Grounding

Every linear equation represents a flat geometric sheet: a line in 2D space, a plane in 3D space, or a flat hyperplane in $n$ dimensions. Solving a linear system $\mathbf{A}\mathbf{x} = \mathbf{b}$ is the search for the single point where all those sheets simultaneously intersect.

How do we find that point without getting lost in algebraic spaghetti? Carl Friedrich Gauss devised an algorithm that feels like peeling layers from an onion: Gaussian Elimination. You perform three elementary row operations: swapping rows, scaling a row by a non-zero number, or adding a multiple of one row to another.

Geometrically, row operations do not move the intersection point at all! They simply tilt and recombine the planes until the system forms a clean upper-triangular staircase (row echelon form $\mathbf{U}$). The bottom equation now contains only one solitary unknown. You solve for that unknown instantly, and then substitute it upward step by step (back-substitution) to rapidly unlock all the remaining variables.

### الحدس الفيزيائي والهندسي

تمثل كل معادلة خطية سطحاً هندسياً مستوياً: خطاً مستقيماً في بعدين، أو مستوياً منبسطاً في 3 أبعاد، أو مستوياً فائقاً في $n$ بعداً. وحل المنظومة الخطية $\mathbf{A}\mathbf{x} = \mathbf{b}$ هو البحث عن نقطة التقاطع الوحيدة المشتركة التي تلتقي عندها كافة هذه المستويات في آن واحد.

كيف نعثر على هذه النقطة دون الغرق في دوامة المعادلات المتشابكة؟ ابتكر كارل فريدريش غاوس خوارزمية تشبه تقشير طبقات البصلة بحذر: طريقة الحذف الغاوسي. تعتمد الخوارزمية على 3 عمليات صفية أولية: تبديل الصفوف، أو ضرب صف في عدد غير صفري، أو إضافة مضاعف صف إلى صف آخر.

هندسياً، لا تغير هذه العمليات الصفية موقع نقطة التقاطع على الإطلاق! بل تعيد تدوير المستويات ودمجها بذكاء حتى تتحول المنظومة إلى درج مثلثي علوي مرتب (صيغة الدَرَج الصفّي $\mathbf{U}$). تصبح المعادلة الأخيرة في القاع تحتوي على مجهول واحد وحيد؛ تحسب قيمته فوراً، ثم تعوض به صعوداً خطوة بخطوة إلى الأعلى (التعويض العكسي Back-substitution) لتفك شفرة كافة المجاهيل المتبقية بسلاسة.

:::simulation-widget{engine="canvas2d" component="LinearSystemSolverCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{A}\mathbf{x} = \mathbf{b} \xrightarrow{\text{Pivoting}} \mathbf{U}\mathbf{x} = \mathbf{c}, \quad x_i = \frac{c_i - \sum_{j=i+1}^n U_{ij} x_j}{U_{ii}}
$$

#### Demystifying the Equation
- \mathbf{A}\mathbf{x} = \mathbf{b}: The original system of linear equations with coefficient matrix $\mathbf{A}$ and target vector $\mathbf{b}$.
- \mathbf{U}\mathbf{x} = \mathbf{c}: The equivalent upper-triangular row echelon system after forward elimination of variables below the diagonal.
- U_{ii}: The pivot element on the main diagonal; must be non-zero to allow division during back-substitution.
- \sum_{j=i+1}^n U_{ij} x_j: The sum of already-computed variables in row $i$ subtracted from the right-hand side constant $c_i$.
- x_i = \dots: The backward substitution formula solving variables sequentially from bottom ($i = n$) to top ($i = 1$).

#### تفكيك المعادلة
- \mathbf{A}\mathbf{x} = \mathbf{b}: المنظومة الخطية الأصلية بمصفوفة المعاملات $\mathbf{A}$ ومتجه الثوابت $\mathbf{b}$.
- \mathbf{U}\mathbf{x} = \mathbf{c}: المنظومة المثلثية العلوية المكافئة بعد تصفير المتغيرات الواقعة تحت القطر الرئيسي.
- U_{ii}: عنصر الارتكاز (Pivot) على القطر الرئيسي؛ ويجب ألا يكون صفراً لإتاحة القسمة أثناء التعويض العكسي.
- \sum_{j=i+1}^n U_{ij} x_j: مجموع مساهمات المتغيرات المحسوبة مسبقاً في الصف $i$، والمطروحة من الطرف الأيمن $c_i$.
- x_i = \dots: صيغة التعويض العكسي التي تحل المتغيرات بالتتابع من القاع ($i = n$) نحو القمة ($i = 1$).

:::python-challenge{id="py-gaussian-elimination-systems"}
---
timeout_ms: 3000
test_cases:
  - input: "back_substitution(np.array([[2.0, 1.0], [0.0, 3.0]]), np.array([5.0, 6.0]))"
    expected: "array([1.5, 2. ])"
  - input: "back_substitution(np.array([[1.0, 2.0, 1.0], [0.0, 1.0, -1.0], [0.0, 0.0, 2.0]]), np.array([8.0, 2.0, 4.0]))"
    expected: "array([-2.,  4.,  2.])"
  - input: "back_substitution(np.array([[4.0, 0.0], [0.0, 2.0]]), np.array([8.0, 6.0]))"
    expected: "array([2., 3.])"
---
```python
import numpy as np

def back_substitution(U: np.ndarray, c: np.ndarray) -> np.ndarray:
    """
    Solve upper-triangular system U x = c via back-substitution.
    
    Parameters
    ----------
    U : np.ndarray of shape (N, N)
        Upper-triangular matrix with non-zero diagonal pivots.
    c : np.ndarray of shape (N,)
        Right-hand side vector.
        
    Returns
    -------
    np.ndarray of shape (N,)
        Solution vector x.
    """
    # Step 1: Initialize solution vector x with zeros of same shape as c
    # n = len(c)
    # x = np.zeros(n, dtype=float)
    
    # Step 2: Loop backwards from row n - 1 down to 0
    # for i in range(n - 1, -1, -1):
    #     sum_known = np.dot(U[i, i + 1:], x[i + 1:])
    #     x[i] = (c[i] - sum_known) / U[i, i]
    
    # Step 3: Return solution vector
    # return x
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** During Gaussian elimination on a system of 3 equations with 3 unknowns, forward elimination yields a bottom augmented row of [0, 0, 0 | 5]. What is the exact geometric and algebraic interpretation?

**العربية:** أثناء تطبيق الحذف الغاوسي على منظومة من 3 معادلات بـ 3 مجاهيل، أدى الحذف إلى صف أخير في المصفوفة الموسعة هو [0, 0, 0 | 5]. ما هو التفسير الهندسي والجبري الدقيق لذلك؟

* [x] The system is algebraically inconsistent with no solution, geometrically meaning the hyperplanes have no common intersection point (e.g. two parallel planes).
  * المنظومة متناقضة جبرياً ومستحيلة الحل، وهندسياً يعني ذلك أن المستويات ليس لها أي نقطة تقاطع مشتركة (كمستويين متوازيين لا يلتقيان).
  > **Why this is correct:** The row corresponds to the equation 0*x1 + 0*x2 + 0*x3 = 5, which simplifies to 0 = 5 (a mathematical impossibility). Geometrically, planes that never meet share no common point of intersection.
  > **لماذا هذا الخيار صحيح:** يعبر هذا الصف عن المعادلة 0 = 5، وهي استحالة رياضية صريحة. هندسياً، المستويات التي لا تلتقي في نقطة موحدة ليس لها أي حل مشترك.

* [ ] The system has infinitely many solutions parameterized by x3 = 5.
  * المنظومة تمتلك عدداً لا نهائياً من الحلول بمعلمة x3 = 5.
  > **Why this is incorrect:** Infinitely many solutions occur when a row becomes [0, 0, 0 | 0], indicating a redundant equation, NOT [0, 0, 0 | 5].
  > **لماذا هذا الخيار خاطئ:** تنتج الحلول اللانهائية عندما يكون الصف بالكامل أصفاراً [0, 0, 0 | 0] للدلالة على التكرار، وليس عندما يكون الطرف الأيمن غير صفري.

* [ ] The algorithm must be restarted because a zero pivot means the matrix rank is 5.
  * يجب إعادة تشغيل الخوارزمية لأن الارتكاز الصفري يعني أن رتبة المصفوفة هي 5.
  > **Why this is incorrect:** A 3x3 matrix cannot have rank 5; the result cleanly diagnoses inconsistency.
  > **لماذا هذا الخيار خاطئ:** مصفوفة 3x3 يستحيل أن تكون رتبتها 5؛ والنتيجة تشخص التناقض بوضوح تام.

