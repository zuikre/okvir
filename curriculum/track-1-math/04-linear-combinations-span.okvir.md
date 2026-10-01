---
id: "linear-combinations-span"
version: "1.0.0"
title: "Linear Combinations, Span & Linear Independence"
track: "math"
module: "mod-02"
estimated_minutes: 15
prerequisites: ["linear-algebra-vectors"]
i18n:
  ar: "التراكيب الخطية ومدى المتجهات والاستقلال الخطي"
---

# Linear Combinations, Span & Linear Independence

### Intuition & Physical Grounding

Imagine piloting a spaceship with two thrusters. Thruster 1 pushes along vector $\mathbf{v}_1$, and Thruster 2 pushes along vector $\mathbf{v}_2$. By adjusting your throttle knobs—choosing scalar numbers $c_1$ and $c_2$—what regions of space can you visit? The collection of every possible destination you can reach by turning those knobs is the span of those vectors.

If both thrusters point along the exact same straight line, you are tragically trapped in a 1D corridor: scaling them can only slide you back and forth along that single track. But if they point in different directions, you can reach every single point across a 2D sheet of space: their span is the entire plane $\mathbb{R}^2$.

Now suppose an engineer installs a third thruster $\mathbf{v}_3$. If that third thruster also lies flat inside that same 2D plane, it gives you zero new directions to explore; you could already reach anything it points to by combining the first two. That third vector is linearly dependent—redundant. A set of vectors is linearly independent only when every single vector unlocks a genuinely new dimension that cannot be reached without it.

### الحدس الفيزيائي والهندسي

تخيل أنك تقود مركبة فضائية مزودة بمحركين نفاثين. المحرك الأول يدفع المركبة باتجاه المتجه $\mathbf{v}_1$، والمحرك الثاني يدفعها باتجاه $\mathbf{v}_2$. بتعديل مقابض الوقود—أي باختيار المعاملات القياسية $c_1$ و $c_2$—ما هي المواقع التي يمكنك الوصول إليها؟ مجموعة كل نقطة ممكنة في الفضاء تستطيع بلوغها بضبط هذين المقبضين تُسمى 'مدى' (Span) هذين المتجهين.

إذا كان المحركان يدفعان على نفس خط الاستقامة تماماً، فستكون عالقاً في مسار ضيق أحادي البعد: فمهما زدت أو أنقصت الوقود، لن تتحرك إلا للأمام أو للخلف على هذا الخط الوحيد. أما إذا كانا يشيران لاتجاهين مختلفين، فيمكنك استكشاف أي نقطة على سطح مستوى ثنائي الأبعاد بالكامل: مداهما يغطي المستوى $\mathbb{R}^2$.

افترض الآن أن مهندساً أضاف محركاً ثالثاً $\mathbf{v}_3$. إذا كان هذا المحرك الثالث يقع بدوره على نفس السطح المستوي للمحركين السابقين، فلن يمنحك أي بعد جديد لاستكشافه؛ إذ كان بإمكانك بالفعل الوصول إلى أي مكان يشير إليه بمجرد مزج دفع المحركين الأولين. هذا المتجه الثالث هو متجه 'مرتبط خطياً'—أي فائض عن الحاجة. وتكون المتجهات 'مستقلة خطياً' فقط عندما يفتح كل متجه منها بعداً فضائياً جديداً لا يمكن لزملائه تعويضه.

:::simulation-widget{engine="canvas2d" component="VectorSpanBasisCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\operatorname{span}(\mathbf{v}_1, \dots, \mathbf{v}_k) = \left\{ \sum_{i=1}^k c_i \mathbf{v}_i \;\middle|\; c_i \in \mathbb{R} \right\}, \quad \sum_{i=1}^k c_i \mathbf{v}_i = \mathbf{0} \iff c_1 = \dots = c_k = 0
$$

#### Demystifying the Equation
- \operatorname{span}(\mathbf{v}_1, \dots, \mathbf{v}_k): The subspace consisting of all possible linear combinations that can be formed using vectors $\mathbf{v}_1, \dots, \mathbf{v}_k$.
- c_i \in \mathbb{R}: Continuous scalar weights acting as control knobs on each directional vector.
- \sum_{i=1}^k c_i \mathbf{v}_i: A linear combination (weighted mixture) of vectors.
- \sum_{i=1}^k c_i \mathbf{v}_i = \mathbf{0}: The zero-combination test for linear independence.
- c_1 = \dots = c_k = 0: The independence condition; if this is the ONLY solution to reaching zero, no vector is a redundant combination of the others.

#### تفكيك المعادلة
- \operatorname{span}(\mathbf{v}_1, \dots, \mathbf{v}_k): الفضاء الجزئي المتولد من كافة التراكيب الخطية الممكنة للمتجهات المعطاة.
- c_i \in \mathbb{R}: معاملات قياسية عددية مستمرة تعمل كمقابض تحكم في مقدار كل متجه اتجاهي.
- \sum_{i=1}^k c_i \mathbf{v}_i: التركيب الخطي (المزيج الموزون) للمتجهات.
- \sum_{i=1}^k c_i \mathbf{v}_i = \mathbf{0}: معادلة التحقق من الاستقلال الخطي عبر محاولة الوصول إلى متجه الصفر.
- c_1 = \dots = c_k = 0: شرط الاستقلال الصارم؛ إذا كان الحل الصفري هو السبيل الوحيد لانعدام التركيب، فلا يوجد أي متجه زائد أو مكرر.

:::python-challenge{id="py-linear-combinations-span"}
---
timeout_ms: 3000
test_cases:
  - input: "check_linear_independence_2d(np.array([1.0, 0.0]), np.array([0.0, 1.0]))"
    expected: "True"
  - input: "check_linear_independence_2d(np.array([2.0, 4.0]), np.array([1.0, 2.0]))"
    expected: "False"
  - input: "check_linear_independence_2d(np.array([1.0, 3.0]), np.array([2.0, 5.0]))"
    expected: "True"
---
```python
import numpy as np

def check_linear_independence_2d(v1: np.ndarray, v2: np.ndarray, tol: float = 1e-9) -> bool:
    """
    Check whether two 2D vectors are linearly independent.
    
    Parameters
    ----------
    v1 : np.ndarray of shape (2,)
        First vector.
    v2 : np.ndarray of shape (2,)
        Second vector.
    tol : float
        Numerical tolerance threshold for zero determinant.
        
    Returns
    -------
    bool
        True if the vectors span a 2D plane (linearly independent),
        False if they are collinear (linearly dependent).
    """
    # Step 1: Stack vectors as columns into a 2x2 matrix
    # A = ...
    
    # Step 2: Compute the 2D determinant (ad - bc)
    # det = ...
    
    # Step 3: Return True if absolute determinant exceeds tolerance
    # return ...
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** A quantitative analyst prepares a credit-risk model using 3 features: Monthly Salary x1, Annual Salary x2 = 12 * x1, and Years of Experience x3. What is the geometric dimension of the feature subspace spanned by the columns of this dataset?

**العربية:** يُعد باحث بيانات نموذجاً لمخاطر الائتمان بثلاثة متغيرات: الراتب الشهري x1، والراتب السنوي x2 = 12 * x1، وسنوات الخبرة x3. ما هو البعد الهندسي للفضاء الفرعي الذي تولده أعمدة هذه البيانات؟

* [x] At most 2 dimensions, because Annual Salary is a strict collinear scalar multiple of Monthly Salary, introducing zero new independent spanning directions.
  * بُعدان على الأكثر، لأن الراتب السنوي مضاعف قياسي مباشر للراتب الشهري، وبالتالي لا يضيف أي اتجاه مستقل جديد لتوليد الفضاء.
  > **Why this is correct:** Because x2 = 12 * x1, the column vector x2 lies entirely inside span(x1). The subspace spanned by {x1, x2, x3} is identical to span(x1, x3), which has dimension at most 2. This exact redundancy causes perfect multicollinearity in linear models.
  > **لماذا هذا الخيار صحيح:** نظراً لأن x2 = 12 * x1، فإن متجه العمود x2 يقع بالكامل داخل مدى x1. الفضاء الذي تولده الأعمدة الثلاثة يطابق تماماً الفضاء المتولد من {x1, x3}، وبعده 2 كحد أقصى، وهو ما يسبب التعدد الخطي التام في الانحدار.

* [ ] Exactly 3 dimensions, because there are 3 distinct physical columns stored in the database matrix.
  * 3 أبعاد تماماً، لوجود 3 أعمدة فيزيائية مميزة مخزنة في قاعدة البيانات.
  > **Why this is incorrect:** Dimension depends on linear independence, not on the raw number of columns. Storing a duplicate column does not unlock a new geometric dimension.
  > **لماذا هذا الخيار خاطئ:** البعد الهندسي يحدده الاستقلال الخطي لا عدد الأعمدة المجرد؛ فتكرار عمود لا يخلق بعداً فضائياً جديداً.

* [ ] 1 dimension, because all economic data in a financial profile correlate with income.
  * بعد واحد، لأن كافة البيانات الاقتصادية ترتبط طردياً بالدخل.
  > **Why this is incorrect:** Years of experience is not an exact scalar multiple of salary; it provides a second genuinely independent spanning direction.
  > **لماذا هذا الخيار خاطئ:** سنوات الخبرة ليست مضاعفاً قياسياً مطابقاً للراتب، بل توفر اتجاهاً مستقلاً ثانياً حقيقياً.

