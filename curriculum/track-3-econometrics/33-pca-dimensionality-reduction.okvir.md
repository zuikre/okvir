---
id: "pca-dimensionality-reduction"
version: "1.0.0"
title: "Principal Component Analysis (PCA) & Variance Maximization"
track: "econometrics"
module: "mod-33"
estimated_minutes: 15
prerequisites: ["singular-value-decomposition", "symmetric-matrices-spectral"]
i18n:
  ar: "تحليل المكونات الرئيسية (PCA) وتعظيم التباين الهندسي"
---

# Principal Component Analysis (PCA) & Variance Maximization

## Beat 1: Tactile Intuition | الحدس البصري والتطبيقي

Modern datasets routinely confront data scientists with dozens or thousands of interrelated, collinear features—financial balance sheet metrics, multi-channel sensor telemetry, facial image pixels, or single-cell gene expression markers. Attempting to visualize, explore, or fit machine learning models on high-dimensional data directly leads to computational paralysis, severe multicollinearity, and the curse of dimensionality. Yet in practice, most features are deeply redundant: measuring a runner's stride length, shoe size, and leg length captures three variations of the exact same underlying physical trait.

**Principal Component Analysis (PCA)** is the foundational unsupervised technique for linear dimensionality reduction. To grasp its tactile geometry, imagine holding an intricate three-dimensional metal wire sculpture in your hands inside a pitch-black room. Your objective is to project the sculpture's silhouette onto a flat, two-dimensional white wall using a single handheld flashlight. If you shine the flashlight from an arbitrary, clumsy angle, the wire branches collapse into an unrecognizable, tangled clump that conceals the sculpture's true structure.

PCA is the mathematical art of **rotating the flashlight around the sculpture to discover the exact camera angle that casts the widest, sharpest, most informative shadow possible**. The physical width and spread of this shadow corresponds to **statistical variance**: the direction along which the data points are most spread out preserves the maximum amount of original information, while the flat, squashed dimensions represent redundant noise that can be safely discarded without losing the core signal.

This spatial rotation proceeds through an orderly, orthogonal hierarchy:
- The **First Principal Component ($\mathbf{v}_1$)** is the primary axis of maximum variance—the single widest perspective of your data manifold.
- The **Second Principal Component ($\mathbf{v}_2$)** is the axis of maximum *remaining* variance that is strictly orthogonal (at a perfect $90^\circ$ angle) to the first.
- Every subsequent component captures diminishing residual variance while remaining mutually perpendicular to all predecessors. Because these axes are orthogonal by construction, PCA completely uncorrelates the features, effectively rotating your coordinate system so that the new axes align with the intrinsic geometric structure of the data.

تغمر مجموعات البيانات الحديثة مهندسي البيانات بمئات أو آلاف المتغيرات المتشابكة والمترابطة—مثل النسب المالية للشركات، أو قراءات مجسات الطائرات، أو بكسلات الصور الرقمية، أو مصفوفات التعبير الجيني. وتؤدي محاولة نمذجة هذه الفضاءات الشاهقة مباشرة إلى شلل حسابي، وتداخل خطي مدمر (Multicollinearity)، وسقوط في لعنة الأبعاد. ومع ذلك، فإن أغلب هذه المتغيرات مكررة في جوهرها؛ فقياس طول ساق العداء ومقاس حذائه وطول خطوته هي ثلاثة أوجه لمتغير بيولوجي كامن واحد.

يمثل **تحليل المكونات الرئيسية (Principal Component Analysis - PCA)** الأساس الهندسي الأهم لتقليص الأبعاد الخطي دون إشراف. ولاستيعاب هذا المفهوم حسياً، تخيل أنك تمسك بيدك مجسماً سلكياً ثلاثي الأبعاد معقداً داخل غرفة مظلمة، ومهمتك هي التقاط صورة ظلية للمجسم على جدار مستوٍ أبيض ثنائي الأبعاد باستخدام مصباح يدوي. إذا سلطت الضوء من زاوية عشوائية خرقاء، سينهار الظل إلى كتلة متشابكة ومبهمة تخفي المعالم الهندسية الحقيقية للمجسم.

PCA هو الفن الرياضي لـ **تدوير زاوية إضاءة المصباح بدقة للبحث عن الزاوية المثالية التي تصنع أوسع ظل وأكثره وضوحاً وتفصيلاً على الجدار**. يقابل اتساع هذا الظل الممتد مفهوم **التباين الإحصائي (Variance)**: فالاتجاه الذي تتشتت فيه نقاط البيانات بأكبر قدر ممكن هو الاتجاه الذي يحتفظ بأقصى طاقة بيانية ومعلوماتية أصلية، بينما تمثل الأبعاد المنكمشة ضجيجاً متكرراً يمكن التخلص منه دون أي خسارة جوهرية.

يسير هذا التدوير الهندسي وفق تسلسل هرمي متعامد وصارم:
- **المكون الرئيسي الأول ($\mathbf{v}_1$)** هو محور التباين الأقصى المطلق—وهو أوسع زاوية رؤية ممكنة لبياناتك.
- **المكون الرئيسي الثاني ($\mathbf{v}_2$)** هو محور التباين الأقصى المتبقي، بشرط أن يكون متعامداً تماماً وبزاوية $90^\circ$ على المحور الأول.
- وهكذا، يلتقط كل مكون لاحق تشتتاً متناقصاً مع الحفاظ على تعامده مع كافة المكونات السابقة. وبفضل هذا التعامد الجبري، يلغي PCA الارتباط الخطي بين المتغيرات تماماً، ويعيد تدوير محاور الإحداثيات لتتطابق تماماً مع البنية الهندسية الحقيقية للبيانات.

:::simulation-widget{engine="canvas2d" component="KMeansVoronoi"}
---
interactive: true
highlighted_metric: "loss"
---
:::

## Beat 2: Formal Mathematical Anchor | الركيزة الرياضية والرموز

Let $\mathbf{X} \in \mathbb{R}^{N \times P}$ be a data matrix with $N$ observations across $P$ numerical features, where each column has been zero-mean centered ($\sum_{i=1}^N X_{ij} = 0$).

The unbiased sample covariance matrix $\mathbf{\Sigma} \in \mathbb{R}^{P \times P}$ is defined as:

$$
\mathbf{\Sigma} = \frac{1}{N - 1} \mathbf{X}^T \mathbf{X}
$$

Because $\mathbf{\Sigma}$ is real, symmetric ($\mathbf{\Sigma} = \mathbf{\Sigma}^T$), and positive semi-definite, its eigenvalues are real and non-negative.

### Variance Maximization via Rayleigh Quotient
We seek a unit projection vector $\mathbf{u}_1 \in \mathbb{R}^P$ ($\|\mathbf{u}_1\|_2^2 = \mathbf{u}_1^T \mathbf{u}_1 = 1$) that maximizes the variance of the projected scalar coordinates $\mathbf{z}_1 = \mathbf{X}\mathbf{u}_1$:

$$
\max_{\mathbf{u}_1} \text{Var}(\mathbf{X}\mathbf{u}_1) = \max_{\mathbf{u}_1} \frac{1}{N - 1} (\mathbf{X}\mathbf{u}_1)^T (\mathbf{X}\mathbf{u}_1) = \max_{\mathbf{u}_1} \mathbf{u}_1^T \mathbf{\Sigma} \mathbf{u}_1 \quad \text{subject to } \mathbf{u}_1^T \mathbf{u}_1 = 1
$$

Formulating the Lagrangian objective with multiplier $\lambda_1$:

$$
\mathcal{L}(\mathbf{u}_1, \lambda_1) = \mathbf{u}_1^T \mathbf{\Sigma} \mathbf{u}_1 - \lambda_1 (\mathbf{u}_1^T \mathbf{u}_1 - 1)
$$

Taking the vector derivative and setting it to zero:

$$
\nabla_{\mathbf{u}_1} \mathcal{L} = 2\mathbf{\Sigma} \mathbf{u}_1 - 2\lambda_1 \mathbf{u}_1 = \mathbf{0} \iff \mathbf{\Sigma} \mathbf{u}_1 = \lambda_1 \mathbf{u}_1
$$

This is the foundational **Matrix Eigenvalue Problem**! Multiplying both sides on the left by $\mathbf{u}_1^T$ reveals:

$$
\mathbf{u}_1^T \mathbf{\Sigma} \mathbf{u}_1 = \lambda_1 \mathbf{u}_1^T \mathbf{u}_1 = \lambda_1
$$

The maximal projected variance equals the largest eigenvalue $\lambda_1$, achieved when the projection vector $\mathbf{u}_1$ is the principal eigenvector of covariance matrix $\mathbf{\Sigma}$.

### Spectral Decomposition & Low-Rank Projection
By the Spectral Theorem, the covariance matrix factors into an orthonormal basis of eigenvectors $\mathbf{V} = [\mathbf{v}_1, \dots, \mathbf{v}_P] \in \mathbb{R}^{P \times P}$ and diagonal eigenvalue matrix $\mathbf{\Lambda} = \text{diag}(\lambda_1, \dots, \lambda_P)$:

$$
\mathbf{\Sigma} = \mathbf{V} \mathbf{\Lambda} \mathbf{V}^T, \quad \text{with } \lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_P \ge 0
$$

To compress the data from $P$ dimensions down to $K < P$, we form the truncated projection matrix $\mathbf{V}_K = [\mathbf{v}_1, \dots, \mathbf{v}_K] \in \mathbb{R}^{P \times K}$ and compute the low-dimensional representation:

$$
\mathbf{Z} = \mathbf{X} \mathbf{V}_K \in \mathbb{R}^{N \times K}
$$

The **Explained Variance Ratio (EVR)** for the $j$-th principal component is:

$$
\text{EVR}_j = \frac{\lambda_j}{\sum_{m=1}^P \lambda_m} = \frac{\lambda_j}{\text{tr}(\mathbf{\Sigma})}
$$

The cumulative explained variance $\sum_{j=1}^K \text{EVR}_j$ quantifies the exact percentage of total information retained in the low-dimensional projection.

### Mathematical Breakdown & Notation Dictionary | قاموس الرموز والبيان الرياضي

* $\mathbf{X} \in \mathbb{R}^{N \times P}$: Mean-centered feature matrix containing $N$ samples and $P$ original predictors.
* $\mathbf{\Sigma} \in \mathbb{R}^{P \times P}$: Symmetric, positive semi-definite sample covariance matrix.
* $\mathbf{u}_1 \in \mathbb{R}^P$: Unit projection vector defining the orientation of the principal axis.
* $\lambda_j$: The $j$-th eigenvalue of $\mathbf{\Sigma}$, quantifying the variance along eigenvector $\mathbf{v}_j$.
* $\mathbf{v}_j$: The $j$-th orthonormal eigenvector of $\mathbf{\Sigma}$ (the $j$-th Principal Component loading vector).
* $\mathbf{V}_K \in \mathbb{R}^{P \times K}$: Truncated projection matrix composed of the top $K$ principal eigenvectors.
* $\mathbf{Z} \in \mathbb{R}^{N \times K}$: Low-dimensional compressed coordinate matrix (principal component scores).
* $\text{tr}(\mathbf{\Sigma}) = \sum_{j=1}^P \lambda_j$: Trace of the covariance matrix, measuring total multivariate variance.
* $\text{EVR}_j$: Explained Variance Ratio quantifying the fraction of total variance captured by component $j$.

## Beat 3: Interactive Python Challenge | التحدي البرمجي

Implement the full Principal Component Analysis engine via covariance eigendecomposition in NumPy. You will:
1. Mean-center the feature columns of $\mathbf{X}$: $\mathbf{X}_c = \mathbf{X} - \bar{\mathbf{X}}$.
2. Compute the sample covariance matrix $\mathbf{\Sigma} = \frac{1}{N - 1}\mathbf{X}_c^T\mathbf{X}_c$.
3. Compute eigenvalues and eigenvectors using `np.linalg.eigh` and sort them in descending order.
4. Extract the top $K$ eigenvectors to form the transformation matrix $\mathbf{V}_K$.
5. Project the centered data into low-dimensional space: $\mathbf{Z} = \mathbf{X}_c \mathbf{V}_K$.
6. Calculate the Explained Variance Ratios $\text{EVR}_j = \frac{\lambda_j}{\sum \lambda}$.

:::python-challenge{id="py-pca-dimensionality-reduction"}
---
timeout_ms: 3000
test_cases:
  - input: "X = np.array([[1.0, 2.0], [2.0, 4.0], [3.0, 6.0], [4.0, 8.0]]); res = compute_pca(X, n_components=1); f\"{res['evr'][0]:.2f}, {res['Z'].shape}\""
    expected: "1.00, (4, 1)"
  - input: "X = np.array([[1.0, 0.0], [-1.0, 0.0], [0.0, 2.0], [0.0, -2.0]]); res = compute_pca(X, n_components=2); f\"{res['evr'][0]:.2f}\""
    expected: "0.80"
---
```python
import numpy as np

def compute_pca(X: np.ndarray, n_components: int = 2) -> dict[str, object]:
    """
    Computes Principal Component Analysis via sample covariance eigendecomposition.
    
    Parameters
    ----------
    X : np.ndarray of shape (N, P)
        Input data matrix.
    n_components : int
        Number of top principal components K to retain.
        
    Returns
    -------
    dict with keys:
        'Z': Low-dimensional projected coordinates of shape (N, K).
        'components': Top K orthonormal eigenvectors of shape (K, P).
        'evr': Explained variance ratios for retained components of shape (K,).
        'singular_values': Associated singular values.
    """
    N, P = X.shape
    
    # Step 1: Zero-mean centering of feature columns
    mean = np.mean(X, axis=0)
    X_centered = X - mean
    
    # Step 2: Unbiased sample covariance matrix: (1 / (N - 1)) * X_c^T X_c
    cov_matrix = (X_centered.T @ X_centered) / (N - 1.0)
    
    # Step 3: Eigendecomposition (eigh is specialized for symmetric matrices)
    eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)
    
    # Step 4: Sort eigenvalues and eigenvectors in descending order
    idx = np.argsort(eigenvalues)[::-1]
    eigenvalues = eigenvalues[idx]
    eigenvectors = eigenvectors[:, idx]
    
    # Step 5: Extract top K components
    components = eigenvectors[:, :n_components].T # shape (K, P)
    top_eigenvalues = eigenvalues[:n_components]
    
    # Step 6: Low-dimensional projection: Z = X_c @ V_K
    Z = X_centered @ eigenvectors[:, :n_components]
    
    # Step 7: Explained variance ratio: lambda_j / sum(lambda)
    total_var = float(np.sum(eigenvalues))
    evr = top_eigenvalues / total_var if total_var > 0 else np.zeros(n_components)
    
    return {
        "Z": Z,
        "components": components,
        "evr": evr,
        "singular_values": np.sqrt(np.maximum(top_eigenvalues * (N - 1), 0.0))
    }
```
:::

## Beat 4: Reality Transfer Challenge | اختبار الانتقال المعرفي الواقعي

A computer vision research team applies PCA to compress $64 \times 64$ facial images ($P = 4,096$ pixel dimensions). Plotting the sorted eigenvalues in a scree plot reveals an acute structural divide:
- The first 3 principal components account for $86.5\%$ of total multivariate variance ($\lambda_1 = 45.0\%, \lambda_2 = 26.0\%, \lambda_3 = 15.5\%$).
- Components 4 through 4,096 each contribute less than $0.05\%$ of total variance, creating a flat, horizontal scree floor of near-zero eigenvalues.

A software engineering lead challenges the data science team: *"Discarding 4,093 components is reckless! We must retain at least 2,000 components to prevent our facial recognition system from losing fine anatomical details."*

**Diagnostic Question:** How does the mathematical principle of PCA justify truncating the projection strictly to the first 3 components?

* [x] The dramatic "scree plot elbow" at component 3 marks the boundary between structural low-rank signal and isotropic measurement noise. The trailing 4,093 components possess tiny, flat eigenvalues that represent sensor thermal noise, sub-pixel jitter, and ambient lighting fluctuations rather than facial geometry. Retaining only 3 components compresses the data by over $99.9\%$ while preserving $86.5\%$ of the genuine anatomical variance, filtering out high-dimensional noise.
  *تحدد "نقطة الانعطاف أو الكوع" في المخطط البياني للقيم الذاتية الحد الفاصل بين الإشارة الهيكلية الحقيقية والضوضاء العشوائية المتناحية. وتمتلك المكونات الـ 4,093 المتبقية قيماً ذاتية ضئيلة ومسطحة تعبر عن تشويش مجسات الكاميرا والتغيرات العشوائية في الإضاءة المحيطة وليس عن تضاريس الوجه التشريحية. إن الاحتفاظ بالمكونات الثلاثة الأولى يضغط البيانات بأكثر من 99.9% مع الحفاظ على 86.5% من التباين الحقيقي، مما يصفي الضجيج ويرفع جودة التعميم.*
  > **Why this is correct:** PCA isolates the low-rank subspace where signal dominates. The flat tail of eigenvalues indicates an isotropic noise floor; including these trailing components retains noise and invites the curse of dimensionality without adding meaningful discriminative information.
  > **لماذا هذا الخيار صحيح:** يعزل PCA الفضاء الجزئي منخفض الرتبة الذي تتركز فيه الإشارة الحقيقية؛ بينما يدل استواء ذيل القيم الذاتية على أرضية ضوضاء عشوائية، والاحتفاظ بها يزيد من التشتت والتعقيد الحسابي دون تقديم أي فائدة معلوماتية.
* [ ] Retaining more than 3 components violates the Eckart-Young-Mirsky matrix approximation theorem whenever the sample size $N$ exceeds 100 images.
  *يؤدي الاحتفاظ بأكثر من 3 مكونات إلى خرق مبرهنة إيكارت-يونغ-ميرسكي لتقريب المصفوفات عندما يتجاوز حجم العينة 100 صورة.*
  > **Why this is incorrect:** The Eckart-Young-Mirsky theorem proves that truncated SVD provides the optimal rank-$K$ approximation for *any* chosen integer $K \le \text{rank}(\mathbf{X})$.
  > **لماذا هذا الخيار خاطئ:** تثبت مبرهنة إيكارت-يونغ أن التقريب المقتطع يقدم أفضل تقريب لمصفوفة بأي رتبة $K$ تختارها، ولا توجد أي قيود على اختيار 3 مكونات فقط.
* [ ] Eigenvalues strictly smaller than 1.0 are mathematically undefined in Euclidean metric space and cause division-by-zero errors in the projection.
  *تعد القيم الذاتية الأقل من 1.0 غير معرفة رياضياً في الفضاء الإقليدي وتسبب أخطاء القسمة على صفر أثناء الإسقاط.*
  > **Why this is incorrect:** Eigenvalues of a covariance matrix are non-negative real numbers ($\lambda \ge 0$); fractional eigenvalues in $(0, 1)$ are completely standard and well-defined.
  > **لماذا هذا الخيار خاطئ:** القيم الذاتية لمصفوفة التغاير أعداد حقيقية موجبة ($\lambda \ge 0$)، والكسور العشرية شائعة وطبيعية تماماً في مصفوفات التباين.
* [ ] Keeping 2,000 components would mathematically destroy the mutual orthogonality of the eigenvector basis matrix $\mathbf{V}$.
  *يؤدي الاحتفاظ بـ 2,000 مكون إلى تدمير التعامد الرياضي بين متجهات الأساس الذاتية للمصفوفة $\mathbf{V}$.*
  > **Why this is incorrect:** By the Spectral Theorem, all $P$ eigenvectors of a real symmetric matrix form a mutually orthogonal basis, regardless of how many subsets are retained.
  > **لماذا هذا الخيار خاطئ:** وفق مبرهنة الطيف، تكون جميع المتجهات الذاتية للمصفوفة المتماثلة متعامدة تماماً على بعضها البعض بغض النظر عن عدد المكونات المختارة.
