---
id: "linear-maps-transformations"
version: "1.0.0"
title: "Linear Maps as Space Transformations"
track: "math"
module: "mod-03"
estimated_minutes: 15
prerequisites: ["linear-combinations-span"]
i18n:
  ar: "التحويلات الخطية كعمليات نقل وتحوير للفضاء"
---

# Linear Maps as Space Transformations

### Intuition & Physical Grounding

Imagine drawing a coordinate grid on a flexible, transparent sheet of rubber. What kinds of warping can you do to this rubber while keeping it 'linear'? Linear algebra imposes two strict physical rules: grid lines must remain straight and evenly spaced, and the origin $(0, 0)$ must never budge. You can stretch the sheet, rotate it, reflect it, or shear it sideways—but you cannot curve, bend, or tear it.

This geometric simplicity leads to the central miracle of linear transformations: to know where all infinite points on the plane end up, you do not need to track billions of coordinates. You only need to track where the two unit basis arrows land: $\hat{\mathbf{i}} = (1, 0)$ and $\hat{\mathbf{j}} = (0, 1)$.

Because every point $\mathbf{x} = (x_1, x_2)$ is built from $x_1 \hat{\mathbf{i}} + x_2 \hat{\mathbf{j}}$, after the transformation it must land at $x_1 T(\hat{\mathbf{i}}) + x_2 T(\hat{\mathbf{j}})$. The landing coordinates of $\hat{\mathbf{i}}$ form the first column of a matrix $\mathbf{A}$, and the landing coordinates of $\hat{\mathbf{j}}$ form the second column. A matrix is nothing more than a compact visual snapshot recording the transformed landing sites of your basis vectors.

### الحدس الفيزيائي والهندسي

تخيل أنك رسمت شبكة إحداثيات منتظمة على غشاء شفاف من المطاط المرن. ما هي أنواع التشويه التي يمكنك إحداثها في هذا المطاط مع الحفاظ على كونه 'خطياً'؟ يفرض الجبر الخطي قاعدتين فيزيائيتين صارمتين: يجب أن تظل خطوط الشبكة مستقيمة ومتوازية ومنتظمة التباعد، ويجب ألا تتحرك نقطة الأصل $(0, 0)$ من مكانها أبداً. يمكنك شد الغشاء، أو تدويره، أو عكسه، أو إمالته جانبياً (Shear)—ولكن لا يمكنك ثنيه أو تجعيده أو تمزيقه.

هذه البساطة الهندسية تقودنا إلى المعجزة الكبرى للتحويلات الخطية: لمعرفة مصير عدد لا نهائي من النقاط على المستوى، لست بحاجة إلى تتبع مليارات الإحداثيات؛ يكفيك فقط معرفة أين استقر سهما الوحدة الأساسيان: $\hat{\mathbf{i}} = (1, 0)$ و $\hat{\mathbf{j}} = (0, 1)$.

ولأن أي نقطة $\mathbf{x} = (x_1, x_2)$ تتكون أصلاً من $x_1 \hat{\mathbf{i}} + x_2 \hat{\mathbf{j}}$، فإنها بعد التحويل ستستقر حتماً عند $x_1 T(\hat{\mathbf{i}}) + x_2 T(\hat{\mathbf{j}})$. إحداثيات استقرار السهم $\hat{\mathbf{i}}$ تشكل العمود الأول للمصفوفة $\mathbf{A}$، وإحداثيات استقرار السهم $\hat{\mathbf{j}}$ تشكل العمود الثاني. المصفوفة ليست سوى بطاقة بريدية هندسية توثق أين هبطت متجهات الأساس.

:::simulation-widget{engine="canvas2d" component="LinearTransformMorphCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
T(\alpha \mathbf{u} + \beta \mathbf{v}) = \alpha T(\mathbf{u}) + \beta T(\mathbf{v}), \quad T(\mathbf{x}) = \mathbf{A}\mathbf{x} = x_1 T(\mathbf{e}_1) + x_2 T(\mathbf{e}_2) = \begin{bmatrix} | & | \\ T(\mathbf{e}_1) & T(\mathbf{e}_2) \\ | & | \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix}
$$

#### Demystifying the Equation
- T(\mathbf{x}): The linear transformation mapping input vector $\mathbf{x} \in \mathbb{R}^n$ to output vector $T(\mathbf{x}) \in \mathbb{R}^m$.
- T(\alpha \mathbf{u} + \beta \mathbf{v}) = \alpha T(\mathbf{u}) + \beta T(\mathbf{v}): The axiom of linearity: additivity and homogeneity (scalar scaling) are preserved.
- \mathbf{e}_1, \mathbf{e}_2: The canonical unit basis vectors, pointing along the un-transformed coordinate axes.
- T(\mathbf{e}_1), T(\mathbf{e}_2): The transformed basis vectors; their coordinates become the literal columns of matrix $\mathbf{A}$.
- \mathbf{A}\mathbf{x}: Matrix-vector multiplication interpreted as a linear combination of the columns of $\mathbf{A}$ weighted by the components of $\mathbf{x}$.

#### تفكيك المعادلة
- T(\mathbf{x}): التحويل الخطي الذي ينقل متجه المدخلات $\mathbf{x} \in \mathbb{R}^n$ إلى متجه المخرجات $T(\mathbf{x}) \in \mathbb{R}^m$.
- T(\alpha \mathbf{u} + \beta \mathbf{v}) = \alpha T(\mathbf{u}) + \beta T(\mathbf{v}): بديهية الخطية: الحفاظ الصارم على الجمع والضرب القياسي.
- \mathbf{e}_1, \mathbf{e}_2: متجهات الأساس المعياري لوحدة الفضاء، الممتدة على محاور الإحداثيات الأصلية.
- T(\mathbf{e}_1), T(\mathbf{e}_2): متجهات الأساس بعد التحويل؛ وتتحول إحداثياتها مباشرة إلى أعمدة المصفوفة $\mathbf{A}$.
- \mathbf{A}\mathbf{x}: ضرب المصفوفة في المتجه مفسراً كتركيب خطي لأعمدة $\mathbf{A}$ بأوزان هي مركبات المتجه $\mathbf{x}$.

:::python-challenge{id="py-linear-maps-transformations"}
---
timeout_ms: 3000
test_cases:
  - input: "apply_linear_transform(np.array([[2.0, 0.0], [0.0, 3.0]]), np.array([1.0, 1.0]))"
    expected: "array([2., 3.])"
  - input: "apply_linear_transform(np.array([[0.0, -1.0], [1.0, 0.0]]), np.array([1.0, 0.0]))"
    expected: "array([0., 1.])"
  - input: "apply_linear_transform(np.array([[1.0, 1.0], [0.0, 1.0]]), np.array([2.0, 3.0]))"
    expected: "array([5., 3.])"
---
```python
import numpy as np

def apply_linear_transform(A: np.ndarray, x: np.ndarray) -> np.ndarray:
    """
    Apply linear transformation matrix A to vector x.
    
    Parameters
    ----------
    A : np.ndarray of shape (M, N)
        Transformation matrix whose columns represent transformed basis vectors.
    x : np.ndarray of shape (N,)
        Input coordinate vector.
        
    Returns
    -------
    np.ndarray of shape (M,)
        Transformed coordinate vector Ax.
    """
    # Step 1: Check dimension compatibility (A.shape[1] == len(x))
    # if A.shape[1] != len(x): raise ValueError(...)
    
    # Step 2: Compute linear combination of columns of A weighted by elements of x
    # result = sum(x[j] * A[:, j]) or vectorized A @ x
    
    # Step 3: Return the transformed vector
    # return ...
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** Which of the following spatial transformations on the 2D plane is strictly NOT a linear map?

**العربية:** أي من التحويلات المكانية التالية على المستوى ثنائي الأبعاد يُعد قطعاً تحويلاً غير خطي؟

* [x] Translating the entire plane by a fixed non-zero vector b: T(x) = x + b.
  * إزاحة المستوى بأكمله بمقدار متجه ثابت غير صفري b: أي T(x) = x + b.
  > **Why this is correct:** A fundamental invariant of any linear transformation is that it must fix the origin: T(0) = T(0 * x) = 0 * T(x) = 0. Translation moves the origin to b != 0 and violates additivity: T(u + v) = u + v + b != (u + b) + (v + b). Hence, spatial translation is an affine map, not a linear map.
  > **لماذا هذا الخيار صحيح:** من الثوابت الأساسية لأي تحويل خطي بقاء نقطة الأصل ثابتة: T(0) = 0. الإزاحة المكانية تنقل نقطة الأصل إلى b != 0 وتخل بشرط الجمع: T(u + v) = u + v + b != (u + b) + (v + b). لذلك، الإزاحة هي تحويل تآلفي (Affine) وليست تحويلاً خطياً.

* [ ] Rotating the plane by 45 degrees counterclockwise about the origin.
  * تدوير المستوى بزاوية 45 درجة عكس عقارب الساعة حول نقطة الأصل.
  > **Why this is incorrect:** Pure rotation about the origin keeps the origin fixed and preserves straight parallel grid lines; it is an orthogonal linear map.
  > **لماذا هذا الخيار خاطئ:** الدوران الصافي حول نقطة الأصل يبقي نقطة الأصل ثابتة ويحافظ على استقامة وتوازي خطوط الشبكة؛ وهو تحويل خطي متعامد.

* [ ] Shearing the plane horizontally such that points higher up slide farther to the right: T(x, y) = (x + 2y, y).
  * قص المستوى أفقياً (Shear) بحيث تنزلق النقاط الأعلى مسافة أكبر لليمين: T(x, y) = (x + 2y, y).
  > **Why this is incorrect:** Shearing keeps the origin fixed and preserves straight lines and parallelism; it is represented by matrix [[1, 2], [0, 1]], a valid linear map.
  > **لماذا هذا الخيار خاطئ:** تحويل القص يحافظ على ثبات نقطة الأصل واستقامة وتوازي الخطوط، وتمثله المصفوفة [[1, 2], [0, 1]] وهو تحويل خطي صحيح.

