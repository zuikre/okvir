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

Every matrix $\mathbf{A}$ acts like a cosmic funnel connecting two different worlds: an input world $\mathbb{R}^n$ and an output world $\mathbb{R}^m$. Gilbert Strang calls the structural breakdown of these worlds "The Fundamental Theorem of Linear Algebra." 

In the input world $\mathbb{R}^n$, any vector you feed into $\mathbf{A}$ splits into two orthogonal personalities:
1. A component in the Row Space ($\mathcal{C}(\mathbf{A}^T)$), which gets safely delivered into the output world.
2. A component in the Nullspace ($\mathcal{N}(\mathbf{A})$), which gets completely incinerated into $\m

:::simulation-widget{engine="canvas2d" component="FundamentalSubspacesCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{A} \in \mathbb{R}^{m \times n}, \quad \operatorname{rank}(\mathbf{A}) = r
$$

تُقسّم أي مصفوفة $A \in \mathbb{R}^{m \times n}$ فضاء المنطلق $\mathbb{R}^n$ وفضاء المستقر $\mathbb{R}^m$ إلى أربعة فضاءات جزئية أساسية متعامدة مثنى مثنى. فضاء الصفوف وفضاء النواة يتعامدان تماماً داخل المنطلق، بينما يتعامد فضاء الأعمدة مع النواة اليسرى داخل المستقر. المعجزة الكبرى هي أن بعد فضاء الصفوف يساوي دوماً بعد فضاء الأعمدة، ويسمى هذا البعد المشترك "رتبة المصفوفة" ($r$).

:::python-challenge{id="py-four-fundamental-subspaces"}
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

def matrix_rank_and_subspaces(A: np.ndarray, tol: float = 1e-10) -> tuple[int, np.ndarray, np.ndarray]:
    """
    Compute numerical rank, column space basis, and null space basis via SVD.
    
    Parameters
    ----------
    A : np.ndarray
        Matrix of shape (M, N)
    tol : float
        Singular value threshold for rank determination
        
    Returns
    -------
    tuple[int, np.ndarray, np.ndarray]
        rank: Numerical rank r
        col_basis: Orthonormal basis for col(A), shape (M, r)
        null_basis: Orthonormal basis for null(A), shape (N, N - r)
    """
    # TODO: Implement SVD-based subspace extraction
    pass
```
:::
