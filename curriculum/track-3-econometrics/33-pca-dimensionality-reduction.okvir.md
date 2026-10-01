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

Modern datasets routinely contain dozens or hundreds of interrelated variables (financial ratios, sensor telemetry, image pixels, genomic assays). Attempting to visualize or model high-dimensional data directly leads to severe collinearity, computational waste, and the curse of dimensionality.

**Principal Component Analysis (PCA)** is the foundational linear dimensionality reduction technique. Think of holding a complex, intricate three-dimensional wire sculpture in your hands and trying to project its shadow onto a flat, two-dimensional wall using a flashlight. If you shine the flashlight from an arbitrary, clumsy angle, the shadow collapses into an unrecognizable, tangled clump that conceals the sculpture's structure.

PCA is the mathematical art of **rotating the flashlight to find the exact camera angle that casts the widest, sharpest, most informative shadow possible**. The shadow's width corresponds to **variance**: the direction along which the data points are most spread out preserves the maximum amount of original information. 
- The **First Principal Component ($\mathbf{v}_1$)** is the axis of maximum variance.
- The **Second Principal Component ($\mathbf{v}_2$)** is the axis of maximum *remaining* variance that is strictly orthogonal (perpendicular) to the first.

:::simulation-widget{engine="canvas2d" component="KMeansVoronoi"}
---
interactive: true
highlighted_metric: "loss"
---
:::

تحتوي مجموعات البيانات الحديثة على العشرات أو المئات من المتغيرات المترابطة (المؤشرات المالية، قراءات الحساسات، بكسلات الصور، مصفوفات التعبير الجيني). وتؤدي محاولة نمذجة هذه الفضاءات الشاهقة مباشرة إلى تضخم التباين ولعنة الأبعاد.

يمثل **تحليل المكونات الرئيسية (Principal Component Analysis - PCA)** الأساس الهندسي الأهم لتقليص الأبعاد الخطي. تخيل أنك تحمل في يدك تمثالاً سلكياً ثلاثي الأبعاد معقداً، وتحاول إسقاط ظله على جدار مستوٍ ثنائي الأبعاد باستخدام مصباح يدوي. إذا سلطت الضوء من زاوية عشوائية خرقاء، سينهار الظل إلى كتلة متشابكة ومبهمة تخفي المعالم الحقيقية للمجسم.

PCA هو الفن الرياضي لـ **تدوير زاوية الإضاءة للبحث عن الزاوية الدقيقة التي تصنع أوسع ظل وأكثره وضوحاً وتفصيلاً على الجدار**. يقابل اتساع الظل مفهوم **التباين (Variance)**: فالاتجاه الذي تتشتت فيه البيانات بأكبر قدر ممكن هو الذي يحتفظ بأقصى كمية من المعلومات الأصلية.
- **المكون الرئيسي الأول ($\mathbf{v}_1$)** هو محور التباين الأقصى المطلق.
- **المكون الرئيسي الثاني ($\mathbf{v}_2$)** هو محور التباين الأقصى المتبقي، بشرط أن يكون متعامداً تماماً وبزاوية $90^\circ$ على المحور الأول.

### Mathematical Foundations

#### Centering & The Sample Covariance Matrix
Let $\mathbf{X} \in \mathbb{R}^{N \times P}$ be the design matrix with zero-mean centered columns ($\sum_{i=1}^N x_{ij} = 0$). The sample covariance matrix is:

$$
\mathbf{\Sigma} = \frac{1}{N - 1} \mathbf{X}^T \mathbf{X} \in \mathbb{R}^{P \times P}
$$

$\mathbf{\Sigma}$ is symmetric and positive semi-definite.

#### The Rayleigh Quotient & Eigenvalue Formulation
We seek a unit projection vector $\mathbf{u}_1 \in \mathbb{R}^P$ ($\|\mathbf{u}_1\|_2^2 = \mathbf{u}_1^T \mathbf{u}_1 = 1$) that maximizes the variance of the projected data $\mathbf{z}_1 = \mathbf{X} \mathbf{u}_1$:

$$
\max_{\mathbf{u}_1} \text{Var}(\mathbf{X} \mathbf{u}_1) = \max_{\mathbf{u}_1} \frac{1}{N - 1} \mathbf{u}_1^T \mathbf{X}^T \mathbf{X} \mathbf{u}_1 = \max_{\mathbf{u}_1} \mathbf{u}_1^T \mathbf{\Sigma} \mathbf{u}_1 \quad \text{subject to } \mathbf{u}_1^T \mathbf{u}_1 = 1
$$

Formulating the Lagrangian:

$$
\mathcal{L}(\mathbf{u}_1, \lambda_1) = \mathbf{u}_1^T \mathbf{\Sigma} \mathbf{u}_1 - \lambda_1 (\mathbf{u}_1^T \mathbf{u}_1 - 1)
$$

Setting the gradient to zero:

$$
\nabla_{\mathbf{u}_1} \mathcal{L} = 2\mathbf{\Sigma} \mathbf{u}_1 - 2\lambda_1 \mathbf{u}_1 = \mathbf{0} \iff \mathbf{\Sigma} \mathbf{u}_1 = \lambda_1 \mathbf{u}_1
$$

This is the canonical **Eigenvalue Problem**! The direction of maximum variance is the eigenvector corresponding to the largest eigenvalue $\lambda_1 = \mathbf{u}_1^T \mathbf{\Sigma} \mathbf{u}_1$.

#### Spectral Decomposition & Low-Rank Projection
By the Spectral Theorem, $\mathbf{\Sigma} = \mathbf{V} \mathbf{\Lambda} \mathbf{V}^T$, where $\mathbf{V} = [\mathbf{v}_1, \dots, \mathbf{v}_P]$ is the orthonormal matrix of eigenvectors and $\mathbf{\Lambda} = \text{diag}(\lambda_1, \dots, \lambda_P)$ with ordered eigenvalues $\lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_P \ge 0$.

To reduce dimension from $P$ to $K < P$, select the first $K$ eigenvectors $\mathbf{V}_K \in \mathbb{R}^{P \times K}$ and project:

$$
\mathbf{Z} = \mathbf{X} \mathbf{V}_K \in \mathbb{R}^{N \times K}
$$

The **Explained Variance Ratio (EVR)** for component $j$ is:

$$
\text{EVR}_j = \frac{\lambda_j}{\sum_{m=1}^P \lambda_m} = \frac{\lambda_j}{\text{tr}(\mathbf{\Sigma})}
$$

يُعد تحليل المكونات الرئيسية حلاً دقيقاً لمسألة القيم الذاتية (Eigenvalue Problem)؛ حيث تكشف القيم الذاتية $\lambda_j$ عن مقدار الطاقة التباينية المحفوظة على طول كل متجه ذاتي متعامد، مما يتيح التخلص من الأبعاد الزائدة بأقل قدر ممكن من فقدان المعلومات.

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
    
    # 1. Zero-mean centering of columns
    mean = np.mean(X, axis=0)
    X_centered = X - mean
    
    # 2. Sample covariance matrix: (1 / (N - 1)) * X_c^T X_c
    cov_matrix = (X_centered.T @ X_centered) / (N - 1.0)
    
    # 3. Eigendecomposition (np.linalg.eigh is numerically stable for symmetric matrices)
    eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)
    
    # 4. Sort eigenvalues and eigenvectors in descending order
    idx = np.argsort(eigenvalues)[::-1]
    eigenvalues = eigenvalues[idx]
    eigenvectors = eigenvectors[:, idx]
    
    # 5. Extract top K components
    components = eigenvectors[:, :n_components].T # (K, P)
    top_eigenvalues = eigenvalues[:n_components]
    
    # 6. Low-dimensional projection: Z = X_c @ V_K
    Z = X_centered @ eigenvectors[:, :n_components]
    
    # 7. Explained variance ratio: lambda_j / sum(lambda)
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

### Practical ML Transfer Challenge

#### Scenario: Scree Plot Elbow Selection in Image Compression
A computer vision researcher applies PCA to compress $64 \times 64$ facial images ($P = 4,096$ dimensions). Plotting the sorted eigenvalues (the scree plot) reveals:
- The first 3 principal components account for $86.5\%$ of total variance ($\lambda_1 = 45\%, \lambda_2 = 26\%, \lambda_3 = 15.5\%$).
- Components 4 through 4,096 each contribute less than $0.05\%$ of total variance, forming a flat, horizontal scree floor.

A project manager argues: *"Why discard 4,093 components? We should retain at least 2,000 components to preserve fine facial details."*

**Diagnostic Question:** How does the mathematical principle of PCA justify reducing the data strictly to the first 3 components?

- **Option A (Correct):** The dramatic "elbow" at component 3 separates the structural low-rank signal from isotropic measurement noise. The trailing 4,093 components have tiny, uniform eigenvalues that capture sensor noise and ambient lighting fluctuations rather than facial geometry. Retaining only 3 components compresses the data by over $99.9\%$ while preserving $86.5\%$ of the genuine anatomical signal.
- **Option B:** Because computing more than 3 components violates the matrix rank theorem when $N > 100$.
- **Option C:** Because eigenvalues smaller than 1.0 are mathematically undefined in Euclidean space.
- **Option D:** Retaining 2,000 components would cause the eigenvectors to lose mutual orthogonality.
