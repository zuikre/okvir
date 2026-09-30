---
id: "gram-schmidt-orthogonalization"
version: "1.0.0"
title: "Eigenvalues & Eigenvectors: Invariant Directions of Space"
track: "math"
module: "mod-04"
estimated_minutes: 15
prerequisites: ["orthogonal-projections"]
i18n:
  ar: "القيم الذاتية والمتجهات الذاتية: الاتجاهات الصامدة في الفضاء"
---

# Eigenvalues & Eigenvectors: Invariant Directions of Space

When a linear transformation acts on the space around it, it generally whips vectors around, changing both their lengths and their directions. A vector pointing northeast might end up pointing south-southeast. 

However, for almost every transformation, there exist a few special, magical directions. When you feed a vector $\mathbf{v}$ lying along one of these directions into the matrix, it does not rotate at all. It stays pointed along the exact same line, merely getting stretched, shrunk, or flipped backwards by a scalar factor $\lambda$. These invariant axes are the eigenvectors (الم

:::simulation-widget{engine="canvas2d" component="EigenHunterCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{A}\mathbf{v} = \lambda \mathbf{v} \iff (\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}, \quad \mathbf{v} \ne \mathbf{0}
$$

عندما تُغير المصفوفة معالم الفضاء، فإن معظم المتجهات تنحرف عن مسارها الأصلي وتدور. لكن ثمة متجهات استثنائية تحافظ على اتجاهها الأصلي تماماً ولا تدور؛ تكتفي المصفوفة بمدّها أو تقليصها بمقدار مقياس عددي $\lambda$. تُسمى هذه المحاور الصامدة "المتجهات الذاتية"، ويُسمى معامل التمدد "القيمة الذاتية". هذه المتجهات تفضح البنية الجوهرية للتحويل وتكشف عن محاوره الطبيعية.

:::python-challenge{id="py-gram-schmidt-orthogonalization"}
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

def power_iteration(A: np.ndarray, max_iter: int = 300, tol: float = 1e-9) -> tuple[float, np.ndarray]:
    """
    Compute dominant eigenvalue and eigenvector via normalized power iteration.
    
    Parameters
    ----------
    A : np.ndarray
        Square matrix of shape (N, N)
    max_iter : int
        Maximum iterations
    tol : float
        Tolerance for vector convergence
        
    Returns
    -------
    tuple[float, np.ndarray]
        lam: Dominant eigenvalue
        v: Dominant unit eigenvector
    """
    # TODO: Implement normalized power iteration with Rayleigh quotient
    pass
```
:::
