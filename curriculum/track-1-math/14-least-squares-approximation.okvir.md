---
id: "least-squares-approximation"
version: "1.0.0"
title: "The Spectral Theorem & Symmetric Eigendecomposition"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["orthogonal-projections", "four-fundamental-subspaces"]
i18n:
  ar: "المبرهنة الطيفية والتفكيك الذاتي للمصفوفات المتناظرة"
---

# The Spectral Theorem & Symmetric Eigendecomposition

A general square matrix can have messy complex eigenvalues and slanted, non-perpendicular eigenvectors. But what if a matrix is symmetric ($\mathbf{A} = \mathbf{A}^T$, meaning entry $A_{ij} = A_{ji}$)? 

Symmetry in linear algebra is like a physical law of conservation. The Spectral Theorem is one of the crowning triumphs of mathematics: it guarantees that for any symmetric matrix:
1. Every single eigenvalue is guaranteed to be a pure real number (no imaginary numbers!).
2. You can always find a complete set of eigenvectors that are strictly mutually perpendicular (orthogonal) to e

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

تُمثل المبرهنة الطيفية ذروة الجمال في الجبر الخطي؛ إذ تؤكد أن أي مصفوفة متناظرة حقيقية ($\mathbf{A} = \mathbf{A}^T$) تمتلك قيماً ذاتية حقيقية تماماً، وتتحلل إلى متجهات ذاتية متعامدة مثنى مثنى. هندسياً، يعني هذا أن أي تشويه متناظر للفضاء هو في حقيقته مجرد دوران للإحداثيات، يليه شد أو تقليص على طول محاور متعامدة، ثم دوران معاكس، دون أي انحراف غير متناسق.

:::python-challenge{id="py-least-squares-approximation"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
import numpy as np

def symmetric_spectral_reconstruction(A: np.ndarray, k: int) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """
    Compute sorted eigendecomposition and rank-k spectral reconstruction.
    
    Parameters
    ----------
    A : np.ndarray
        Symmetric matrix of shape (N, N)
    k : int
        Reconstruction rank (1 <= k <= N)
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray, np.ndarray]
        eigenvalues: Sorted by absolute magnitude, shape (N,)
        eigenvectors: Sorted columns, shape (N, N)
        A_k: Rank-k reconstructed matrix, shape (N, N)
    """
    # TODO: Implement symmetric eigendecomposition via eigh and rank-k outer sum
    pass
```
:::
