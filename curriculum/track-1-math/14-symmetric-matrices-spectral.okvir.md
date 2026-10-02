---
id: "t1-14"
version: "1.0.0"
title: "The Spectral Theorem & Symmetric Eigendecomposition"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["t1-12", "t1-11"]
i18n:
  ar: "المبرهنة الطيفية والتفكيك القيمي الذاتي المتناظر"
---

# The Spectral Theorem & Symmetric Eigendecomposition

### Intuition & Physical Grounding

Imagine tapping on a tightly stretched circular drum skin, or plucking a tuned guitar string. In physical nature, reciprocal balance is an iron law: according to Newton's third law of motion, whenever particle $i$ exerts a force on particle $j$, particle $j$ exerts an equal and opposite reciprocal force back on particle $i$. In linear algebra, this reciprocal symmetry is captured by a **symmetric matrix** ($\mathbf{A} = \mathbf{A}^T$), where the interaction between coordinate $i$ and coordinate $j$ exactly mirrors the interaction between coordinate $j$ and coordinate $i$ ($A_{ij} = A_{ji}$).

When an arbitrary, asymmetric matrix transforms space, it can shear, tilt, and twist axes unevenly. Its eigenvectors can lean awkwardly at slanted angles, and its eigenvalues can become complex imaginary numbers—corresponding to spiraling vortices and rotations in space. But when a matrix exhibits reciprocal symmetry ($\mathbf{A} = \mathbf{A}^T$), all chaotic shearing and imaginary swirling vanish completely. The **Spectral Theorem**—celebrated as one of the supreme achievements of mathematics—guarantees that every single eigenvalue of a real symmetric matrix is guaranteed to be a pure real number!

Even more profoundly, the Spectral Theorem guarantees that the eigenvectors of a symmetric matrix can always be chosen to be **mutually perpendicular (orthogonal)** to each other. There are no skewed angles or warped coordinate grids. Geometrically, a symmetric transformation never shears space; it behaves like a perfect physical stretching machine. In three simple geometric stages, it: (1) rigidly rotates your space into an aligned coordinate frame ($\mathbf{Q}^T$), (2) stretches space purely along those perpendicular axes by real factors $\lambda_i$ ($\mathbf{\Lambda}$), and (3) rigidly rotates the frame back to its original orientation ($\mathbf{Q}$).

Because the eigenvectors are mutually orthogonal unit vectors, the transformation can be dismantled into an additive sum of rank-1 building blocks: $\mathbf{A} = \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T$. Each term $\mathbf{q}_i \mathbf{q}_i^T$ acts as an orthogonal projector, casting a shadow of any incoming vector onto axis $\mathbf{q}_i$ and scaling it by $\lambda_i$. This is called the **spectral decomposition**—named by analogy to optical physics, where a triangular glass prism breaks a beam of blended white light into its independent, pure spectral wavelengths.

#### Why Do We Care?
The Spectral Theorem is the foundational engine behind optimization, statistics, and machine learning:
1. **Principal Component Analysis (PCA):** Every empirical covariance matrix $\mathbf{\Sigma} = \frac{1}{N}\mathbf{X}^T\mathbf{X}$ is symmetric by construction. The Spectral Theorem guarantees that PCA will always find an orthogonal set of feature axes with non-negative real variances, enabling optimal dimensionality reduction.
2. **Machine Learning Optimization (Hessian Matrices):** In multivariable calculus, the Hessian matrix of second partial derivatives $\mathbf{H}_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$ is symmetric (by Clairaut's theorem). Its orthogonal eigenvectors determine the principal axes of local curvature, allowing second-order optimization algorithms (like Newton-Raphson) to navigate loss landscapes.
3. **Quantum Mechanics:** Every observable physical quantity in quantum mechanics—such as energy, position, and spin—is represented by a Hermitian (symmetric) operator. The Spectral Theorem is the fundamental reason physical measurements in laboratories yield real numbers rather than imaginary values.
4. **Spectral Graph Theory & Community Detection:** The Graph Laplacian $\mathbf{L} = \mathbf{D} - \mathbf{A}$ of an undirected network is symmetric. The eigenvector corresponding to its second smallest eigenvalue (the Fiedler vector) partitions complex networks, web graphs, and social circles into distinct clusters.

---

### الحدس الفيزيائي والهندسي

تخيل أنك تنقر على غشاء طبلة مشدود بإحكام، أو تعزف على وتر عود مشدود. في الطبيعة الفيزيائية، يُعد التوازن التبادلي قانوناً صارماً: فوفقاً لقانون نيوتن الثالث، عندما يؤثر الجسيم $i$ بقوة على الجسيم $j$، فإن الجسيم $j$ يرد بقوة مساوية لها في المقدار ومعاكسة لها في الاتجاه. في لغة الجبر الخطي، ينعكس هذا التوازن المتبادل في **المصفوفة المتناظرة** ($\mathbf{A} = \mathbf{A}^T$)، حيث يكون تأثير المركبة $i$ على المركبة $j$ مطابقاً تماماً لتأثير $j$ على $i$ عبر القطر الرئيسي للمصفوفة ($A_{ij} = A_{ji}$).

عندما تؤثر مصفوفة عامة غير متناظرة على الفضاء، فإنها قد تعصف به وتميل المحاور بزوايا ملتوية، وتنتج قيماً ذاتية عقدية (مركبة) تؤدي إلى دوامات والتواءات حلزونية في الفضاء. ولكن عندما تمتلك المصفوفة تناظراً تبادلياً حقيقياً ($\mathbf{A} = \mathbf{A}^T$)، يختفي هذا التشويه والاضطراب التخيلي تماماً! تأتي **المبرهنة الطيفية** (Spectral Theorem)—التي تُعد إحدى أعظم المفاخر الرياضية عبر التاريخ—لتمنحنا ضماناً قاطعاً: كل قيمة ذاتية لمصفوفة متناظرة حقيقية هي عدد حقيقي بحت وخالٍ تماماً من أي جذور تخيلية.

والأمر فائق الجمال هندسياً هو أن المبرهنة الطيفية تضمن أيضاً أن المتجهات الذاتية للمصفوفة المتناظرة تكون **متعامدة تماماً** (Orthogonal) مثنى مثنى بزوايا قائمة قياسها $90^\circ$. لا توجد هنا زوايا مائلة أو محاور ملتوية؛ فالتحويل المتناظر لا يقص الفضاء أو يشوهه، بل يعمل كآلة شد هندسية مثالية. يتلخص تأثيره في ثلاث خطوات هندسية سلسة: (1) تدوير صلب للفضاء بزاوية معينة ($\mathbf{Q}^T$) لجعله محاذياً للمحاور الذاتية، (2) شد وتمديد الفضاء على طول تلك المحاور المتعامدة بمقادير عددية حقيقية $\lambda_i$ عبر المصفوفة القطرية ($\mathbf{\Lambda}$)، (3) إعادة الفضاء بتدوير صلب معاكس ($\mathbf{Q}$).

وبما أن المتجهات الذاتية تشكل أساساً متعامداً من متجهات الوحدة، فإن المصفوفة المتناظرة يمكن تفكيكها إلى مجموع من الإسقاطات المستقلة من الرتبة الأولى: $\mathbf{A} = \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T$. كل حد $\mathbf{q}_i \mathbf{q}_i^T$ يعمل كمصباح إسقاط يسقط أي متجه على المحور $\mathbf{q}_i$ بمقدار شدة $\lambda_i$. يُسمى هذا **التفكيك الطيفي** تشبيهاً له بالموشور الزجاجي في علم البصريات، الذي يحلل حزمة الضوء الأبيض المركبة إلى أطياف ضوئية نقية ومستقلة تماماً.

#### لماذا نهتم بهذا المفهوم؟
المبرهنة الطيفية هي المحرك الرياضي الأساسي لعلم البيانات والذكاء الاصطناعي الحديث:
1. **تحليل المكونات الرئيسية (PCA):** كل مصفوفة تغاير إحصائية $\mathbf{\Sigma} = \frac{1}{N}\mathbf{X}^T\mathbf{X}$ هي مصفوفة متناظرة حتماً. والمبرهنة الطيفية هي الضمان الرياضي الوحيد الذي يؤكد أن محاور المكونات الرئيسية ستكون متعامدة تماماً وبقيم تباين حقيقية موجبة، مما يتيح ضغط البيانات بدقة متناهية.
2. **تحسين دوال التعلم العميق ومصفوفة هيسيان (Hessian):** في الحساب متعدد المتغيرات، تكون مصفوفة المشتقات الجزئية الثانية $\mathbf{H}_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$ متناظرة دائماً (وفق مبرهنة كليرو). تحدد متجهاتها الذاتية المتعامدة اتجاهات التقعر والانحناء الأقصى والأدنى، مما يوجه خوارزميات التحسين الذكية مثل نيوتن-رافسون.
3. **ميكانيكا الكم:** في الفيزياء الكمومية، كل كمية فيزيائية قابلة للملاحظة والقياس (كالطاقة، والزخم، ولف الجسيمات) تُمثّل بمؤثر متناظر (Hermitian). المبرهنة الطيفية هي السبب الجوهري وراء ظهور نتائج القياسات المعملية دائماً كأرقام حقيقية وليست تخيلية.
4. **نظرية المخططات الطيفية وتقسيم الشبكات:** مصفوفة لابلابسيان للمخططات $\mathbf{L} = \mathbf{D} - \mathbf{A}$ للشبكات غير الموجهة متناظرة. ويمكّننا المتجه الذاتي الثاني (متجه فيدلر) من تقسيم شبكات التواصل الاجتماعي وشبكات الويب المعقدة إلى مجتمعات وعناقيد مترابطة بدقة فائقة.

:::simulation-widget{engine="canvas2d" component="SpectralTheoremCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{A} \in \mathbb{R}^{n \times n}, \quad \mathbf{A} = \mathbf{A}^T \implies \mathbf{A} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^T = \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T
$$

#### Demystifying the Equation

| Symbol | Mathematical Term | Plain English Translation & Intuition |
| :--- | :--- | :--- |
| $\mathbf{A} = \mathbf{A}^T$ | Symmetry Condition | The matrix equals its transpose; row interactions perfectly match column interactions ($A_{ij} = A_{ji}$). |
| $\mathbf{Q} \in \mathbb{R}^{n \times n}$ | Orthogonal Eigenvector Matrix | A rigid rotation matrix whose columns are the mutually perpendicular unit eigenvectors ($\mathbf{Q}^T\mathbf{Q} = \mathbf{I}$). |
| $\mathbf{\Lambda} = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$ | Diagonal Eigenvalue Matrix | Contains the purely real scaling factors along the perpendicular eigenvector axes. |
| $\mathbf{Q}^T$ | Transposed Eigenbasis Transform | Projects arbitrary space onto the orthogonal eigenbasis; because $\mathbf{Q}$ is orthogonal, $\mathbf{Q}^{-1} = \mathbf{Q}^T$. |
| $\mathbf{q}_i \in \mathbb{R}^n$ | Orthonormal Eigenvector | A unit-length vector ($\|\mathbf{q}_i\|_2 = 1$) identifying an unrotated, independent axis of the transformation. |
| $\lambda_i \in \mathbb{R}$ | Real Eigenvalue | The physical stretch factor along axis $\mathbf{q}_i$; guaranteed real with zero imaginary component. |
| $\mathbf{q}_i \mathbf{q}_i^T \in \mathbb{R}^{n \times n}$ | Rank-1 Projection Matrix | The outer product operator that projects any incoming vector orthogonally onto the 1D line spanned by $\mathbf{q}_i$. |
| $\sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T$ | Spectral Expansion | Expresses the entire complex matrix as a weighted sum of independent, 1D orthogonal projections. |

##### Why the Math Works Step-by-Step
1. **Why are all eigenvalues of a symmetric matrix guaranteed to be real?** Suppose $\mathbf{A}\mathbf{v} = \lambda \mathbf{v}$ where $\lambda$ and $\mathbf{v}$ might potentially be complex. Taking the conjugate transpose product yields $\mathbf{v}^* \mathbf{A} \mathbf{v} = \mathbf{v}^* (\lambda \mathbf{v}) = \lambda \|\mathbf{v}\|^2$. Taking the conjugate transpose of that scalar gives $(\mathbf{v}^* \mathbf{A} \mathbf{v})^* = \mathbf{v}^* \mathbf{A}^T \mathbf{v} = \mathbf{v}^* \mathbf{A} \mathbf{v} = \bar{\lambda} \|\mathbf{v}\|^2$. Thus $\lambda \|\mathbf{v}\|^2 = \bar{\lambda} \|\mathbf{v}\|^2$. Since $\mathbf{v} \ne \mathbf{0}$, $\lambda = \bar{\lambda}$, proving $\lambda$ must be strictly real.
2. **Why are eigenvectors of distinct eigenvalues automatically orthogonal?** Let $\mathbf{A}\mathbf{q}_1 = \lambda_1 \mathbf{q}_1$ and $\mathbf{A}\mathbf{q}_2 = \lambda_2 \mathbf{q}_2$ with $\lambda_1 \ne \lambda_2$. Computing the inner product: $\lambda_1 (\mathbf{q}_1 \cdot \mathbf{q}_2) = (\mathbf{A}\mathbf{q}_1) \cdot \mathbf{q}_2 = \mathbf{q}_1^T \mathbf{A}^T \mathbf{q}_2 = \mathbf{q}_1^T \mathbf{A} \mathbf{q}_2 = \mathbf{q}_1 \cdot (\mathbf{A}\mathbf{q}_2) = \lambda_2 (\mathbf{q}_1 \cdot \mathbf{q}_2)$. Rearranging gives $(\lambda_1 - \lambda_2)(\mathbf{q}_1 \cdot \mathbf{q}_2) = 0$. Since $\lambda_1 \ne \lambda_2$, the dot product $\mathbf{q}_1 \cdot \mathbf{q}_2$ must equal 0, proving perpendicularity!
3. **Why does $\mathbf{Q}^{-1} = \mathbf{Q}^T$?** The columns of $\mathbf{Q}$ are orthonormal ($\mathbf{q}_i \cdot \mathbf{q}_j = 1$ if $i=j$, and $0$ otherwise). Multiplying $\mathbf{Q}^T \mathbf{Q}$ produces entries that are precisely the dot products of the columns of $\mathbf{Q}$, yielding the identity matrix $\mathbf{I}$. Inverting a coordinate change requires zero matrix inversion algorithms—just a simple transpose.
4. **Why is the outer product $\mathbf{q}_i \mathbf{q}_i^T$ an orthogonal projector?** Multiplying $(\mathbf{q}_i \mathbf{q}_i^T)\mathbf{x} = \mathbf{q}_i (\mathbf{q}_i^T \mathbf{x}) = (\mathbf{q}_i \cdot \mathbf{x})\mathbf{q}_i$. It takes the scalar shadow of $\mathbf{x}$ along $\mathbf{q}_i$ and points it in direction $\mathbf{q}_i$. Squaring the operator $(\mathbf{q}_i \mathbf{q}_i^T)^2 = \mathbf{q}_i (\mathbf{q}_i^T \mathbf{q}_i) \mathbf{q}_i^T = \mathbf{q}_i (1) \mathbf{q}_i^T = \mathbf{q}_i \mathbf{q}_i^T$, satisfying the idempotent geometric definition of a projection.

---

#### تفكيك المعادلة

| الرمز | المصطلح الرياضي | المعنى المبسط والحدس الفيزيائي |
| :--- | :--- | :--- |
| $\mathbf{A} = \mathbf{A}^T$ | شرط التناظر | المصفوفة تطابق منقولها تماماً؛ التفاعلات بين الصفوف والأعمدة متماثلة تبادلياً ($A_{ij} = A_{ji}$). |
| $\mathbf{Q} \in \mathbb{R}^{n \times n}$ | مصفوفة المتجهات الذاتية المتعامدة | مصفوفة دوران صلب تشكل أعمدتها متجهات الوحدة الذاتية المتعامدة تماماً ($\mathbf{Q}^T\mathbf{Q} = \mathbf{I}$). |
| $\mathbf{\Lambda}$ | مصفوفة القيم الذاتية القطرية | مصفوفة قطرية تضم معاملات التمدد الحقيقية البحتة على طول المحاور المتعامدة. |
| $\mathbf{Q}^T$ | التحويل المنقول للأساس الذاتي | يسقط الفضاء على الأساس الذاتي المتعامد؛ ولأن $\mathbf{Q}$ متعامدة فإن معكوسها يطابق منقولها ($\mathbf{Q}^{-1} = \mathbf{Q}^T$). |
| $\mathbf{q}_i \in \mathbb{R}^n$ | المتجه الذاتي المعياري | متجه وحدة ($\|\mathbf{q}_i\|_2 = 1$) يحدد اتجاهاً هندسياً مستقلاً لا يدور عند تطبيق التحويل. |
| $\lambda_i \in \mathbb{R}$ | القيمة الذاتية الحقيقية | عامل التمدد الفيزيائي على طول المحور $\mathbf{q}_i$؛ ومضمون كونه عدداً حقيقياً خالياً من التخيل. |
| $\mathbf{q}_i \mathbf{q}_i^T$ | مصفوفة إسقاط من الرتبة الأولى | مؤثر الجداء الخارجي الذي يسقط أي متجه في الفضاء إسقاطاً عمودياً على امتداد الخط $\mathbf{q}_i$. |
| $\sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T$ | التفكيك الطيفي التراكمي | صياغة المصفوفة المعقدة بالكامل كمجموع موزون لمؤثرات إسقاط متعامدة ومستقلة. |

##### لماذا تعمل هذه المعادلة هندسياً؟
1. **لماذا نضمن أن كافة القيم الذاتية أعداد حقيقية؟** بافتراض وجود قيمة ذاتية $\lambda$ ومتجه ذاتي $\mathbf{v}$ قد يحتويان على أعداد مركبة، فإن ضرب المتجه المرافق المنقول يعطي $\mathbf{v}^* \mathbf{A} \mathbf{v} = \lambda \|\mathbf{v}\|^2$. وبأخذ المرافق المنقول لهذا المقدار العددي واستخدام شرط التناظر $\mathbf{A}^T = \mathbf{A}$، نجد أنه يساوي $\bar{\lambda} \|\mathbf{v}\|^2$. بالتالي فإن $\lambda = \bar{\lambda}$، مما يثبت قطعاً أن القيمة الذاتية عدد حقيقي لا يحوي أي جزء تخيلي.
2. **لماذا تتعامد المتجهات الذاتية للقيم المختلفة تلقائياً؟** إذا كانت لدينا قيمتان مختلفتان $\lambda_1 \ne \lambda_2$، فإن الجداء النقطي $\lambda_1 (\mathbf{q}_1 \cdot \mathbf{q}_2) = (\mathbf{A}\mathbf{q}_1) \cdot \mathbf{q}_2 = \mathbf{q}_1 \cdot (\mathbf{A}\mathbf{q}_2) = \lambda_2 (\mathbf{q}_1 \cdot \mathbf{q}_2)$. وبنقل الحدود: $(\lambda_1 - \lambda_2)(\mathbf{q}_1 \cdot \mathbf{q}_2) = 0$. وبما أن القيمتين مختلفتان ($\lambda_1 - \lambda_2 \ne 0$)، فيلزم حتماً أن يكون $\mathbf{q}_1 \cdot \mathbf{q}_2 = 0$، وهو برهان التعامد التام!
3. **لماذا يطابق المعكوس المنقول دائماً ($\mathbf{Q}^{-1} = \mathbf{Q}^T$)؟** أعمدة المصفوفة $\mathbf{Q}$ هي متجهات وحدة متعامدة مثنى مثنى؛ لذا فإن ضرب المنقول في المصفوفة $\mathbf{Q}^T \mathbf{Q}$ يحسب الجداء النقطي للأعمدة مع بعضها، منتجاً $1$ على القطر الرئيسي و$0$ في كل مكان آخر، وهي مصفوفة الوحدة $\mathbf{I}$. هذا يلغي الحاجة لأي خوارزميات لحساب المعكوس؛ فالمنقول هو المعكوس مباشرة.
4. **كيف يمثل الجداء الخارجي $\mathbf{q}_i \mathbf{q}_i^T$ مؤثر إسقاط؟** بتطبيق المؤثر على أي متجه $\mathbf{x}$: $(\mathbf{q}_i \mathbf{q}_i^T)\mathbf{x} = (\mathbf{q}_i \cdot \mathbf{x})\mathbf{q}_i$. إنه يقيس ظل المتجه $\mathbf{x}$ على المحور $\mathbf{q}_i$ ويعيد توجيهه على طول ذلك المحور. وتربيع المؤثر يثبت أنه لا يتغير: $(\mathbf{q}_i \mathbf{q}_i^T)^2 = \mathbf{q}_i \mathbf{q}_i^T$، وهو التعريف الرياضي الدقيق للإسقاط المتعامد.

:::python-challenge{id="py-t1-14"}
---
timeout_ms: 3000
test_cases:
  - input: "spectral_reconstruction_2d(np.eye(2), np.array([3.0, 5.0]))"
    expected: "array([[3., 0.],
       [0., 5.]])"
  - input: "spectral_reconstruction_2d(np.array([[0.0, 1.0], [1.0, 0.0]]), np.array([2.0, 4.0]))"
    expected: "array([[4., 0.],
       [0., 2.]])"
  - input: "spectral_reconstruction_2d(np.array([[1.0, -1.0], [1.0, 1.0]]) / np.sqrt(2), np.array([5.0, 1.0]))"
    expected: "array([[3., 2.],
       [2., 3.]])"
---
```python
import numpy as np

def spectral_reconstruction_2d(Q: np.ndarray, lambdas: np.ndarray) -> np.ndarray:
    """
    Reconstruct a 2x2 symmetric matrix from its spectral decomposition A = Q Lambda Q^T.

    Intuition
    ---------
    According to the Spectral Theorem, any symmetric matrix can be factored
    into an orthogonal rotation Q, diagonal stretching by eigenvalues lambdas,
    and the reverse rotation Q^T. This function reverses that process, taking
    the eigenbasis and eigenvalues to reconstruct the original matrix.

    Parameters
    ----------
    Q : np.ndarray of shape (2, 2)
        Orthogonal matrix whose columns are unit eigenvectors.
    lambdas : np.ndarray of shape (2,)
        Real eigenvalues [lambda_1, lambda_2].

    Returns
    -------
    np.ndarray of shape (2, 2)
        Reconstructed symmetric matrix A.
    """
    # Step 1: Form the diagonal eigenvalue matrix Lambda = np.diag(lambdas)
    # Lambda = np.diag(lambdas)

    # Step 2: Compute matrix product Q @ Lambda @ Q.T
    # A = Q @ Lambda @ Q.T

    # Step 3: Return the reconstructed symmetric matrix
    # return A
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** A sample covariance matrix Sigma = (1/N) * X^T @ X is calculated for a high-dimensional financial dataset. What does the Spectral Theorem guarantee about the principal component axes of this covariance matrix?

**العربية:** حُسبت مصفوفة التغاير Sigma = (1/N) * X^T @ X لبيانات مالية عالية الأبعاد. ماذا تضمن المبرهنة الطيفية بشأن محاور المكونات الرئيسية لمصفوفة التغاير هذه؟

* [x] The principal component directions (eigenvectors) are guaranteed to be strictly mutually orthogonal, and all eigenvalues (variances) are guaranteed to be real and non-negative.
  * محاور المكونات الرئيسية (المتجهات الذاتية) متعامدة مثنى مثنى بالضرورة، وكافة القيم الذاتية (التباينات) حقيقية وغير سالبة قطعاً.
  > **Why this is correct:** Because X^T X is symmetric and positive semi-definite, the Spectral Theorem guarantees orthogonal real eigenvectors Q (orthogonal feature axes) and non-negative real eigenvalues lambda_i >= 0 representing variance along each component.
  > **لماذا هذا الخيار صحيح:** نظراً لأن X^T X متناظرة وشبه موجبة التعريف، تضمن المبرهنة الطيفية متجهات ذاتية حقيقية متعامدة Q (محاور مستقلة) وقيماً ذاتية حقيقية غير سالبة lambda_i >= 0 تمثل التباين على طول كل مكون.

* [ ] The eigenvectors are skewed at 45-degree angles and have complex imaginary components.
  * المتجهات الذاتية مائلة بزوايا 45 درجة وتحتوي على مركبات تخيلية معقدة.
  > **Why this is incorrect:** The Spectral Theorem strictly rules out complex eigenvalues and non-orthogonal eigenvectors for symmetric matrices.
  > **لماذا هذا الخيار خاطئ:** المبرهنة الطيفية تنفي قطعاً وجود أي قيم تخيلية أو متجهات غير متعامدة للمصفوفات المتناظرة.

* [ ] The covariance matrix cannot be diagonalized unless all original features are normally distributed.
  * مصفوفة التغاير لا يمكن تقطيرها إلا إذا كانت كافة المتغيرات الأصلية موزعة توزيعاً طبيعياً.
  > **Why this is incorrect:** The Spectral Theorem is a pure algebraic property of symmetric matrices; it requires zero distributional assumptions on the underlying data.
  > **لماذا هذا الخيار خاطئ:** المبرهنة الطيفية خاصية جبرية مطلقة للمصفوفات المتناظرة؛ ولا تتطلب أي افتراضات إحصائية حول توزيع البيانات.
