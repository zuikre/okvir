---
id: "least-squares-approximation"
version: "1.0.0"
title: "The Spectral Theorem & Symmetric Eigendecomposition"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["orthogonal-projections", "four-fundamental-subspaces"]
i18n:
  ar: "المبرهنة الطيفية والتفكيك القيمي الذاتي المتناظر"
---

# The Spectral Theorem & Symmetric Eigendecomposition

### Intuition & Physical Grounding

A general square matrix can have messy complex eigenvalues and slanted, non-perpendicular eigenvectors. But what happens when a matrix is symmetric ($\mathbf{A} = \mathbf{A}^T$, meaning entry $A_{ij} = A_{ji}$)?

Symmetry in linear algebra is like a physical law of conservation. The Spectral Theorem is one of the crowning triumphs of mathematics: it guarantees that for any symmetric matrix, every single eigenvalue is guaranteed to be a pure real number, and you can always find a complete set of eigenvectors that are strictly mutually perpendicular (orthogonal) to each other!

Geometrically, a symmetric transformation does not shear or skew space unevenly. It is equivalent to a pure rotation into an aligned coordinate frame ($\mathbf{Q}^T$), stretching space along those mutually perpendicular axes by factors $\lambda_i$ ($\mathbf{\Lambda}$), and rotating back ($\mathbf{Q}$). In data science, every covariance matrix $\mathbf{\Sigma} = \frac{1}{N}\mathbf{X}^T\mathbf{X}$ is symmetric, which is the foundational mathematical reason Principal Component Analysis (PCA) works.

### الحدس الفيزيائي والهندسي

يمكن للمصفوفة المربعة العامة أن تمتلك قيماً ذاتية عقدية معقدة ومتجهات ذاتية مائلة غير متعامدة. ولكن ماذا يحدث عندما تكون المصفوفة متناظرة تماماً ($\mathbf{A} = \mathbf{A}^T$، أي أن $A_{ij} = A_{ji}$ عبر القطر الرئيسي)؟

التناظر في الجبر الخطي يشبه قوانين الانحفاظ في الفيزياء. تُعد المبرهنة الطيفية (Spectral Theorem) إحدى أعظم مفاخر الرياضيات عبر العصور؛ إذ تضمن أنه لأي مصفوفة متناظرة حقيقية، تكون كافة قيمها الذاتية أعداداً حقيقية بحتة دون أي جذور تخيلية، ويمكن دائماً العثور على مجموعة كاملة من المتجهات الذاتية المتعامدة تماماً (بزاوية $90^\circ$) مثنى مثنى!

هندسياً، يعني هذا أن التحويل المتناظر لا يُميل الفضاء بشكل غير متناسق؛ بل هو معادل تماماً لدوران الفضاء إلى محاوره الطبيعية ($\mathbf{Q}^T$)، ثم شد الفضاء على طول تلك المحاور المتعامدة بعوامل التمدد $\lambda_i$ ($\mathbf{\Lambda}$)، ثم إعادته بالدوران المعاكس ($\mathbf{Q}$). وفي علم البيانات، فإن مصفوفة التغاير $\mathbf{\Sigma} = \frac{1}{N}\mathbf{X}^T\mathbf{X}$ متناظرة دائماً، وهو السبب الرياضي الجوهري لنجاح تحليل المكونات الرئيسية (PCA).

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
- \mathbf{A} = \mathbf{A}^T: The symmetry condition; the matrix equals its own transpose.
- \mathbf{Q}: An orthogonal matrix whose columns are the mutually perpendicular unit eigenvectors ($\mathbf{Q}^T \mathbf{Q} = \mathbf{I}$).
- \mathbf{\Lambda} = \operatorname{diag}(\lambda_1, \dots, \lambda_n): The diagonal matrix containing the purely real eigenvalues.
- \mathbf{Q}^T: The inverse transformation of $\mathbf{Q}$; because $\mathbf{Q}$ is orthogonal, its inverse is simply its transpose ($\mathbf{Q}^{-1} = \mathbf{Q}^T$).
- \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T: The spectral decomposition; represents matrix $\mathbf{A}$ as a weighted sum of rank-1 orthogonal projection operators.

#### تفكيك المعادلة
- \mathbf{A} = \mathbf{A}^T: شرط التناظر؛ المصفوفة تطابق منقولها تماماً حول القطر الرئيسي.
- \mathbf{Q}: مصفوفة متعامدة تشكل أعمدتها متجهات الوحدة الذاتية المتعامدة مثنى مثنى (حيث $\mathbf{Q}^T \mathbf{Q} = \mathbf{I}$).
- \mathbf{\Lambda} = \operatorname{diag}(\lambda_1, \dots, \lambda_n): مصفوفة قطرية تضم القيم الذاتية الحقيقية البحتة.
- \mathbf{Q}^T: معكوس المصفوفة $\mathbf{Q}$؛ ولأنها مصفوفة متعامدة فإن معكوسها يطابق منقولها ($\mathbf{Q}^{-1} = \mathbf{Q}^T$).
- \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T: التفكيك الطيفي؛ يعبر عن المصفوفة كمجموع موزون لمؤثرات إسقاط متعامدة من الرتبة 1.

:::python-challenge{id="py-least-squares-approximation"}
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
    
    Parameters
    ----------
    Q : np.ndarray of shape (2, 2)
        Orthogonal matrix of eigenvectors.
    lambdas : np.ndarray of shape (2,)
        Real eigenvalues [lambda_1, lambda_2].
        
    Returns
    -------
    np.ndarray of shape (2, 2)
        Reconstructed symmetric matrix A.
    """
    # Step 1: Form diagonal eigenvalue matrix Lambda = np.diag(lambdas)
    # Lambda = ...
    
    # Step 2: Compute matrix product Q @ Lambda @ Q.T
    # A = ...
    
    # Step 3: Return reconstructed symmetric matrix
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

