---
id: "eigenvalues-eigenvectors"
version: "1.0.0"
title: "Singular Value Decomposition (SVD) & Spectral Geometry"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["least-squares-approximation", "determinant-scaling-factor"]
i18n:
  ar: "تفكيك القيم المفردة (SVD) والهندسة الطيفية"
---

# Singular Value Decomposition (SVD) & Spectral Geometry

### Intuition & Physical Grounding

The Spectral Theorem is magnificent, but it has a massive limitation: it only works on square, symmetric matrices. What if you have a rectangular data table with 10,000 customers and 50 movie ratings? A rectangular matrix cannot be symmetric; it does not even map a space back into itself!

The Singular Value Decomposition (SVD) is the undisputed superpower of linear algebra because it works on every single matrix that can ever exist: square or rectangular, full-rank or deficient, fat or tall. It is the universal master key of modern data science.

Geometrically, imagine taking a unit sphere in your input space. When any linear transformation acts on it, it deforms that sphere into a hyper-ellipse in the output space. The SVD reveals the exact three physical stages of this metamorphosis: first, an orthogonal rotation in input space ($\mathbf{V}^T$); second, stretching along the coordinate axes by singular values $\sigma_i$ ($\mathbf{\Sigma}$); third, an orthogonal rotation in output space ($\mathbf{U}$). By dropping the smallest singular values, SVD delivers optimal low-rank compression—compressing gigabyte images and power-ranking recommendation algorithms with minimal information loss.

### الحدس الفيزيائي والهندسي

المبرهنة الطيفية رائعة حقاً، لكنها تعاني من قيد خانق: فهي تعمل فقط على المصفوفات المربعة المتناظرة. ماذا لو كان لديك جدول بيانات مستطيل يضم 10,000 عميل و50 تقييماً للأفلام؟ المصفوفة المستطيلة لا يمكن أن تكون متناظرة، بل إنها لا تنقل الفضاء إلى نفسه أصلاً!

تفكيك القيم المفردة (SVD) هو الأداة الخارقة المطلقة في الجبر الخطي؛ لأنه يعمل على أي مصفوفة يمكن أن توجد في الكون دون أي استثناء: سواء كانت مربعة أو مستطيلة، تامة الرتبة أو ناقصة، عريضة أو طويلة. إنه المفتاح الذهبي الشامل لعلم البيانات والذكاء الاصطناعي الحديث.

هندسياً، تخيل كرة وحدة مستديرة تماماً في فضاء المدخلات. عندما يؤثر عليها أي تحويل خطي، فإنه يشوه تلك الكرة ويحولها إلى قطع ناقص فائق (Hyper-ellipse) في فضاء المخرجات. يكشف SVD عن الأطوار الفيزيائية الثلاثة الدقيقة لهذا التحول: أولاً، دوران متعامد في فضاء المدخلات ($\mathbf{V}^T$)؛ ثانياً، شد وتمديد على طول المحاور الإحداثية بقيم موجبة مرتبة تنازلياً تُدعى 'القيم المفردة' $\sigma_i$ ($\mathbf{\Sigma}$)؛ ثالثاً، دوران متعامد في فضاء المخرجات ($\mathbf{U}$). وعبر الاحتفاظ بأكبر القيم المفردة وإهمال الصغرى، يمنحنا SVD أفضل ضغط ممكن للبيانات والصور بأقل قدر من فقدان الجودة.

:::simulation-widget{engine="canvas2d" component="SVDImageCompressorLab"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{A} \in \mathbb{R}^{m \times n}, \quad \mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T, \quad \sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0
$$

#### Demystifying the Equation
- \mathbf{A} \in \mathbb{R}^{m \times n}: Any arbitrary rectangular or square data matrix.
- \mathbf{U} \in \mathbb{R}^{m \times m}: Left singular vectors; an orthogonal matrix whose columns are eigenvectors of $\mathbf{A}\mathbf{A}^T$, spanning the output space.
- \mathbf{\Sigma} \in \mathbb{R}^{m \times n}: Diagonal matrix of non-negative singular values $\sigma_i = \sqrt{\lambda_i(\mathbf{A}^T\mathbf{A})}$, sorted in descending order.
- \mathbf{V}^T \in \mathbb{R}^{n \times n}: Right singular vectors; an orthogonal matrix whose rows are eigenvectors of $\mathbf{A}^T\mathbf{A}$, spanning the input space.
- \sum_{i=1}^k \sigma_i \mathbf{u}_i \mathbf{v}_i^T: The truncated Eckart-Young rank-$k$ approximation, provably optimal under Frobenius and spectral norms.

#### تفكيك المعادلة
- \mathbf{A} \in \mathbb{R}^{m \times n}: أي مصفوفة بيانات مستطيلة أو مربعة دون استثناء.
- \mathbf{U} \in \mathbb{R}^{m \times m}: المتجهات المفردة اليسرى؛ مصفوفة متعامدة تشكل أعمدتها المتجهات الذاتية لـ $\mathbf{A}\mathbf{A}^T$ وتغطي فضاء المخرجات.
- \mathbf{\Sigma} \in \mathbb{R}^{m \times n}: مصفوفة شبه قطرية تضم القيم المفردة غير السالبة $\sigma_i = \sqrt{\lambda_i(\mathbf{A}^T\mathbf{A})}$ مرتبة تنازلياً.
- \mathbf{V}^T \in \mathbb{R}^{n \times n}: المتجهات المفردة اليمنى؛ مصفوفة متعامدة تشكل صفوفها المتجهات الذاتية لـ $\mathbf{A}^T\mathbf{A}$ وتغطي فضاء المدخلات.
- \sum_{i=1}^k \sigma_i \mathbf{u}_i \mathbf{v}_i^T: تقريب إيكارت-يونغ المقتطع من الرتبة $k$، والمثبت رياضياً كأفضل تقريب ممكن تحت معيار فروبينيوس.

:::python-challenge{id="py-eigenvalues-eigenvectors"}
---
timeout_ms: 3000
test_cases:
  - input: "round(svd_rank_k_approx(np.array([[3.0, 0.0], [0.0, 4.0]]), 1)[1], 2)"
    expected: "0.64"
  - input: "round(svd_rank_k_approx(np.array([[1.0, 2.0], [2.0, 4.0]]), 1)[1], 2)"
    expected: "1.0"
  - input: "round(svd_rank_k_approx(np.eye(4), 2)[1], 2)"
    expected: "0.5"
---
```python
import numpy as np

def svd_rank_k_approx(A: np.ndarray, k: int) -> tuple[np.ndarray, float]:
    """
    Compute Eckart-Young optimal rank-k approximation and retained energy ratio.
    
    Parameters
    ----------
    A : np.ndarray of shape (M, N)
        Input data matrix.
    k : int
        Target approximation rank (1 <= k <= min(M, N)).
        
    Returns
    -------
    tuple[np.ndarray, float]
        A_k: Optimal rank-k reconstructed matrix of shape (M, N).
        energy_ratio: Fraction of variance retained (sum top-k sigma^2 / sum all sigma^2).
    """
    # Step 1: Compute SVD via np.linalg.svd(A, full_matrices=False)
    # U, S, Vt = ...
    
    # Step 2: Truncate to top k components: Uk = U[:, :k], Sk = S[:k], Vtk = Vt[:k, :]
    # Uk = ...
    # Sk = ...
    # Vtk = ...
    
    # Step 3: Reconstruct A_k = Uk @ np.diag(Sk) @ Vtk and compute energy ratio
    # A_k = ...
    # energy = np.sum(Sk ** 2) / np.sum(S ** 2)
    # return A_k, float(energy)
    pass
```
:::

## Transfer Quiz: Reality Challenge

### Conceptual Diagnostic

**English:** According to the fundamental Eckart-Young-Mirsky Theorem, if you truncate the SVD of matrix A to its top k singular values producing A_k, how does A_k compare to ANY other matrix B of rank at most k?

**العربية:** وفقاً لمبرهنة إيكارت-يونغ-ميرسكي الأساسية، إذا قمت باقتطاع SVD للمصفوفة A عند أول k قيمة مفردة لتنتج A_k، فكيف تقارن A_k بأي مصفوفة أخرى B في العالم رتبتها k كحد أقصى؟

* [x] A_k is mathematically proven to achieve the minimal possible approximation error ||A - B|| under both the Frobenius norm and spectral L2 norm among ALL possible rank-k matrices.
  * ثبت رياضياً أن A_k تحقق أدنى خطأ تقريب ممكن ||A - B|| تحت كل من معيار فروبينيوس ومعيار L2 الطيفي بين كافة المصفوفات الممكنة ذات الرتبة k.
  > **Why this is correct:** The Eckart-Young theorem states that truncating the SVD gives the globally optimal low-rank projection in Hilbert space; no other linear compression technique can retain more energy with k components.
  > **لماذا هذا الخيار صحيح:** تنص مبرهنة إيكارت-يونغ على أن اقتطاع SVD يمنح أفضل إسقاط منخفض الرتبة على الإطلاق؛ ولا يمكن لأي خوارزمية ضغط خطية أخرى أن تحتفظ بقدر من الطاقة والتباين أكبر مما يحتفظ به SVD باستخدام k مركبة.

* [ ] A_k is an arbitrary heuristic approximation with no guaranteed optimality bounds.
  * A_k هو مجرد تقريب تجريبي تقريبي دون أي ضمانات رياضية للمثالية.
  > **Why this is incorrect:** SVD is exact and mathematically proven optimal; it is not a heuristic.
  > **لماذا هذا الخيار خاطئ:** تفكيك SVD دقيق ومثبت كحل أمثل مطلق وليس تقريباً تجريبياً.

* [ ] A_k only minimizes error if the original matrix A was symmetric and non-negative.
  * A_k يقلل الخطأ فقط إذا كانت المصفوفة الأصلية A متناظرة وغير سالبة.
  > **Why this is incorrect:** The power of Eckart-Young is that it holds universally for EVERY matrix, rectangular or square, signed or unsigned.
  > **لماذا هذا الخيار خاطئ:** تكمن قوة مبرهنة إيكارت-يونغ في أنها تنطبق على كل مصفوفة دون استثناء، سواء كانت مستطيلة أو مربعة.

