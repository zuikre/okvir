---
id: "gram-schmidt-orthogonalization"
version: "1.0.0"
title: "Eigenvalues & Eigenvectors: Invariant Directions of Space"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["orthogonal-projections"]
i18n:
  ar: "القيم الذاتية والمتجهات الذاتية: الاتجاهات الصامدة في الفضاء"
---

# Eigenvalues & Eigenvectors: Invariant Directions of Space

### Intuition & Physical Grounding

When a linear transformation acts on the space around it, it generally whips vectors around, changing both their lengths and their directions. A vector pointing northeast might end up pointing south-southeast.

However, for almost every transformation, there exist a few special, magical directions. When you feed a vector $\mathbf{v}$ lying along one of these directions into the matrix, it does not rotate at all! It stays pointed along the exact same line, merely getting stretched, shrunk, or flipped backwards by a scalar factor $\lambda$. These invariant axes are the eigenvectors (from the German 'eigen', meaning 'characteristic' or 'own'), and the scaling factor $\lambda$ is the eigenvalue.

Eigenvectors are the natural skeleton of a matrix. In structural engineering, they reveal the resonant frequencies that can shake a suspension bridge apart. In quantum mechanics, they are the observable energy states of particles. In Google's PageRank algorithm, the dominant eigenvector ranks the importance of every website on the internet.

### الحدس الفيزيائي والهندسي

عندما تؤثر مصفوفة على الفضاء من حولها، فإنها عادة ما تعصف بالمتجهات وتديرها، مغيرّة أطوالها واتجاهاتها في آن واحد؛ فمتجه يشير إلى الشمال الشرقي قد ينتهي به المطاف مشيراً إلى الجنوب الشرقي.

ومع ذلك، توجد في كل تحويل خطي تقريباً اتجاهات سحرية استثنائية. عندما تختار متجهاً $\mathbf{v}$ يقع على أحد هذه الاتجاهات الخاصة وتطبّق عليه المصفوفة، فإنه لا يدور على الإطلاق! بل يظل ثابتاً على نفس خط استقامته الأصلي، مكتفياً بالتمدد أو الانكماش أو الانعكاس للخلف بمقدار عامل عددي $\lambda$. تُسمى هذه المحاور الصامدة 'المتجهات الذاتية' (من الكلمة الألمانية eigen التي تعني الخاص أو الأصيل)، ويُسمى معامل التمدد 'القيمة الذاتية'.

المتجهات الذاتية هي الهيكل العظمي الطبيعي للمصفوفة. في الهندسة الإنشائية، تكشف عن ترددات الرنين الطبيعي التي قد تؤدي لانهيار الجسور المعلقة. وفي ميكانيكا الكم، تمثل الحالات الطاقية الملاحظة للجسيمات. وفي خوارزمية PageRank لشركة Google، يحدد المتجه الذاتي المهيمن الأهمية النسبية لمليارات المواقع على شبكة الإنترنت.

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
- \mathbf{A}\mathbf{v}: The transformed vector resulting from applying matrix $\mathbf{A}$ to vector $\mathbf{v}$.
- \lambda \mathbf{v}: Scalar multiplication of the original vector; proves that the transformation acts purely as a stretch without any angular rotation.
- \mathbf{A} - \lambda \mathbf{I}: The shifted characteristic matrix; must be singular (non-invertible) so that non-zero solutions exist in its nullspace.
- \det(\mathbf{A} - \lambda \mathbf{I}) = 0: The characteristic equation; roots of this polynomial yield all eigenvalues $\lambda$.
- \mathbf{v} \ne \mathbf{0}: The non-triviality condition; the zero vector is excluded by definition.

#### تفكيك المعادلة
- \mathbf{A}\mathbf{v}: المتجه الناتج بعد تطبيق التحويل الخطي بالمصفوفة $\mathbf{A}$ على المتجه $\mathbf{v}$.
- \lambda \mathbf{v}: ضرب قياسي في المتجه الأصلي؛ ويثبت هندسياً أن التحويل يكتفي بالشد دون أي انحراف زاوي.
- \mathbf{A} - \lambda \mathbf{I}: المصفوفة المميزة المزاحة؛ ويجب أن تكون مصفوفة شاذة ليتسع فضاؤها الصفري لحلول غير صفرية.
- \det(\mathbf{A} - \lambda \mathbf{I}) = 0: المعادلة المميزة؛ وتمنحنا جذور كثير الحدود هذا كافة القيم الذاتية $\lambda$.
- \mathbf{v} \ne \mathbf{0}: شرط الحل غير التافه؛ إذ يُستثنى المتجه الصفري دائماً من تعريف المتجهات الذاتية.

:::python-challenge{id="py-gram-schmidt-orthogonalization"}
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
    Compute dominant eigenvalue and eigenvector via power iteration.
    
    Parameters
    ----------
    A : np.ndarray of shape (N, N)
        Square matrix with a distinct dominant eigenvalue.
    num_iter : int
        Number of power iteration steps.
        
    Returns
    -------
    tuple[float, np.ndarray]
        dominant_eigenvalue: Estimated Rayleigh quotient.
        dominant_eigenvector: Unit eigenvector.
    """
    # Step 1: Initialize random or uniform unit vector v
    # v = np.ones(A.shape[0]) / np.sqrt(A.shape[0])
    
    # Step 2: Loop num_iter times: multiply by A and normalize
    # for _ in range(num_iter):
    #     v = A @ v
    #     v = v / np.linalg.norm(v)
    
    # Step 3: Compute Rayleigh quotient eigenvalue lambda = v^T A v
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

