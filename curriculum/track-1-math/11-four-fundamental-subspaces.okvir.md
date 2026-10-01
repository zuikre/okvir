---
id: "four-fundamental-subspaces"
version: "1.0.0"
title: "The Four Fundamental Subspaces"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["gaussian-elimination-systems"]
i18n:
  ar: "الفضاءات الجزئية الأربعة الأساسية"
---

# The Four Fundamental Subspaces

### Intuition & Physical Grounding

Every matrix $\mathbf{A} \in \mathbb{R}^{m \times n}$ acts as an information bridge connecting two different universes: an input world of $n$ dimensions and an output world of $m$ dimensions. Renowned mathematician Gilbert Strang synthesized the entire structure of linear algebra into 'The Big Picture'—the Four Fundamental Subspaces.

The input space $\mathbb{R}^n$ is cleanly split into two mutually orthogonal territories: the Row Space $C(\mathbf{A}^T)$ and the Nullspace $N(\mathbf{A})$. The Row Space contains all the active input directions that genuinely influence your output. The Nullspace contains the blind spots: every vector in $N(\mathbf{A})$ gets crushed to absolute zero by the matrix ($\mathbf{A}\mathbf{x} = \mathbf{0}$). These two worlds are strictly perpendicular ($90^\circ$ orthogonal complements).

Meanwhile, the output world $\mathbb{R}^m$ is likewise split into two perpendicular territories: the Column Space $C(\mathbf{A})$ and the Left Nullspace $N(\mathbf{A}^T)$. The Column Space consists of all possible outputs the matrix can ever reach. The Left Nullspace contains the impossible, orthogonal directions. Understanding these four subspaces is the foundational key to mastering least squares, Kalman filtering, and deep learning backpropagation.

### الحدس الفيزيائي والهندسي

تعمل كل مصفوفة $\mathbf{A} \in \mathbb{R}^{m \times n}$ كجسر معلوماتي يربط بين عالمين مختلفين: عالم المدخلات ذي الأبعاد الـ $n$ وعالم المخرجات ذي الأبعاد الـ $m$. اختصر عالم الرياضيات الشهير جيلبرت سترانج جوهر الجبر الخطي في لوحة بديعة سماها 'الصورة الكبرى'—الفضاءات الجزئية الأربعة الأساسية.

ينقسم فضاء المدخلات $\mathbb{R}^n$ بدقة إلى منطقتين متعامدتين تماماً: فضاء الصفوف $C(\mathbf{A}^T)$ والفضاء الصفري $N(\mathbf{A})$. فضاء الصفوف يضم كافة اتجاهات المدخلات الفعالة التي تؤثر حقيقة في الناتج. أما الفضاء الصفري فيمثل النقاط العمياء: كل متجه يقع في $N(\mathbf{A})$ تسحقه المصفوفة تماماً ليتحول إلى الصفر المطلق ($\mathbf{A}\mathbf{x} = \mathbf{0}$). وهذان الفضاءان متعامدان بزاوية $90^\circ$ متكاملة.

وفي المقابل، ينقسم فضاء المخرجات $\mathbb{R}^m$ بدوره إلى منطقتين متعامدتين: فضاء الأعمدة $C(\mathbf{A})$ والفضاء الصفري الأيسر $N(\mathbf{A}^T)$. فضاء الأعمدة يضم كل نقطة يمكن للمصفوفة توليدها وبلوغها في المخرجات، بينما يمثل الفضاء الصفري الأيسر الاتجاهات المتعامدة الممتنعة. استيعاب هذه الفضاءات الأربعة هو حجر الزاوية لإتقان المربعات الصغرى وفلاتر كالمان والانتشار الخلفي في التعلم العميق.

:::simulation-widget{engine="canvas2d" component="FundamentalSubspacesCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbb{R}^n = C(\mathbf{A}^T) \oplus N(\mathbf{A}), \quad \mathbb{R}^m = C(\mathbf{A}) \oplus N(\mathbf{A}^T), \quad \operatorname{rank}(\mathbf{A}) + \operatorname{nullity}(\mathbf{A}) = n
$$

#### Demystifying the Equation
- C(\mathbf{A}) \subset \mathbb{R}^m: The Column Space (image/range); the subspace of all reachable output vectors, with dimension $r = \operatorname{rank}(\mathbf{A})$.
- N(\mathbf{A}) \subset \mathbb{R}^n: The Nullspace (kernel); all inputs mapped to zero ($\mathbf{A}\mathbf{x} = \mathbf{0}$), with dimension $n - r$.
- C(\mathbf{A}^T) \subset \mathbb{R}^n: The Row Space; spanned by rows of $\mathbf{A}$, with dimension equal to rank $r$. Orthogonal complement to $N(\mathbf{A})$.
- N(\mathbf{A}^T) \subset \mathbb{R}^m: The Left Nullspace; inputs mapped to zero by $\mathbf{A}^T$, with dimension $m - r$. Orthogonal complement to $C(\mathbf{A})$.
- \oplus: Direct sum decomposition; any input $\mathbf{x} \in \mathbb{R}^n$ uniquely splits into $\mathbf{x}_{\text{row}} + \mathbf{x}_{\text{null}}$ where $\mathbf{x}_{\text{row}} \perp \mathbf{x}_{\text{null}}$.

#### تفكيك المعادلة
- C(\mathbf{A}) \subset \mathbb{R}^m: فضاء الأعمدة (المدى)؛ فضاء المخرجات الممكنة، وبعده يساوي رتبة المصفوفة $r = \operatorname{rank}(\mathbf{A})$.
- N(\mathbf{A}) \subset \mathbb{R}^n: الفضاء الصفري (النواة)؛ كافة المدخلات التي تسحقها المصفوفة إلى الصفر، وبعده $n - r$.
- C(\mathbf{A}^T) \subset \mathbb{R}^n: فضاء الصفوف؛ المتولد من صفوف $\mathbf{A}$، وبعده $r$. وهو المتمم المتعامد للفضاء الصفري.
- N(\mathbf{A}^T) \subset \mathbb{R}^m: الفضاء الصفري الأيسر؛ وبعده $m - r$. وهو المتمم المتعامد لفضاء الأعمدة.
- \oplus: تفكيك المجموع المباشر؛ كل مدخل $\mathbf{x}$ ينقسم فريداً إلى $\mathbf{x}_{\text{row}} + \mathbf{x}_{\text{null}}$ حيث المركبتان متعامدتان تماماً.

:::python-challenge{id="py-four-fundamental-subspaces"}
---
timeout_ms: 3000
test_cases:
  - input: "subspace_dimensions(5, 3, 2)"
    expected: "{'col_space': 2, 'nullspace': 1, 'row_space': 2, 'left_nullspace': 3}"
  - input: "subspace_dimensions(4, 4, 4)"
    expected: "{'col_space': 4, 'nullspace': 0, 'row_space': 4, 'left_nullspace': 0}"
  - input: "subspace_dimensions(3, 5, 2)"
    expected: "{'col_space': 2, 'nullspace': 3, 'row_space': 2, 'left_nullspace': 1}"
---
```python
import numpy as np

def subspace_dimensions(m: int, n: int, rank: int) -> dict[str, int]:
    """
    Compute dimensions of the Four Fundamental Subspaces for an m x n matrix of rank r.
    
    Parameters
    ----------
    m : int
        Number of rows (output space dimension).
    n : int
        Number of columns (input space dimension).
    rank : int
        Matrix rank r (r <= min(m, n)).
        
    Returns
    -------
    dict with keys 'col_space', 'nullspace', 'row_space', 'left_nullspace'
    """
    # Step 1: Column space and row space dimensions equal rank r
    # dim_col = ...
    # dim_row = ...
    
    # Step 2: Nullspace dimension equals n - rank (Rank-Nullity Theorem)
    # dim_null = ...
    
    # Step 3: Left nullspace dimension equals m - rank
    # dim_left_null = ...
    
    # return dict(...)
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** In a linear regression problem Ax = b, the target vector b cannot be solved exactly because it lies outside the Column Space C(A). In which of the Four Fundamental Subspaces does the optimal residual error vector e = b - A x_hat strictly reside?

**العربية:** في مسألة انحدار خطي Ax = b، لا يمكن حل المتجه المستهدف b بدقة لوقوعه خارج فضاء الأعمدة C(A). في أي من الفضاءات الأساسية الأربعة يقع بالضرورة متجه الخطأ المتبقي الأمثل e = b - A x_hat؟

* [x] The Left Nullspace N(A^T), because the minimal least-squares error is strictly orthogonal to every vector in the Column Space C(A).
  * الفضاء الصفري الأيسر N(A^T)، لأن خطأ المربعات الصغرى الأصغري متعامد بالضرورة مع كل متجه في فضاء الأعمدة C(A).
  > **Why this is correct:** Geometric orthogonality requires A^T e = 0, which is the definition of the Left Nullspace N(A^T). The residual e is the orthogonal drop from b onto C(A); because C(A) ⊥ N(A^T), e must live inside N(A^T).
  > **لماذا هذا الخيار صحيح:** التعامد الهندسي يستلزم A^T e = 0، وهو بالضبط تعريف الفضاء الصفري الأيسر N(A^T). الخطأ e هو الإسقاط العمودي من b على فضاء الأعمدة C(A)، ولأن C(A) متعامد تماماً مع N(A^T)، فإن e يستقر حتماً في N(A^T).

* [ ] The Nullspace N(A), because the error vector must be squashed to zero by matrix A.
  * الفضاء الصفري N(A)، لأن متجه الخطأ يجب أن تسحقه المصفوفة A إلى الصفر.
  > **Why this is incorrect:** Dimension mismatch! Vector e lives in the output space R^m, while the nullspace N(A) lives in the input space R^n.
  > **لماذا هذا الخيار خاطئ:** عدم تطابق في الأبعاد! المتجه e يقع في فضاء المخرجات R^m، بينما الفضاء الصفري N(A) يقع في فضاء المدخلات R^n.

* [ ] The Row Space C(A^T), because it contains all the explanatory regressors.
  * فضاء الصفوف C(A^T)، لاحتوائه على كافة المتغيرات التفسيرية.
  > **Why this is incorrect:** The row space lives in R^n, not R^m, and represents inputs rather than output residuals.
  > **لماذا هذا الخيار خاطئ:** فضاء الصفوف يقع في R^n وليس R^m، ويمثل المدخلات لا البواقي في المخرجات.

