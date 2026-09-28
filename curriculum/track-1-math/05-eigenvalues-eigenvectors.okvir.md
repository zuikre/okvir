---
id: "eigenvalues-eigenvectors"
version: "1.0.0"
title: "EigenHunter: Invariant Directions & Eigenvalues"
track: "math"
module: "module-01"
estimated_minutes: 8
prerequisites: ["linear-algebra-vectors", "dot-product-geometry"]
i18n:
  ar: "صائد المتجهات الذاتية: خطوط الاتجاه الثابت والقيم الذاتية"
---

# EigenHunter: Invariant Directions & Eigenvalues

When a matrix multiplies space, most vectors rotate and shear. But along specific invariant axes, vectors do not rotate at all—they only stretch or shrink.

:::simulation-widget{engine="canvas2d" component="EigenHunterCanvas"}
---
matrix: [[2.0, 1.0], [1.0, 2.0]]
tolerance: 0.05
---
:::

The defining condition states that applying matrix $A$ scales vector $v$ by eigenvalue $\lambda$:

$$
A \mathbf{v} = \lambda \mathbf{v} \iff (A - \lambda I)\mathbf{v} = \mathbf{0} \iff \det(A - \lambda I) = 0
$$

:::python-challenge{id="py-eigen-solver"}
---
timeout_ms: 3000
test_cases:
  - input: "A = np.array([[2.0, 0.0], [0.0, 3.0]])"
    expected: "[2.0, 3.0]"
  - input: "A = np.array([[1.0, 0.0], [0.0, 1.0]])"
    expected: "[1.0, 1.0]"
---
```python
import numpy as np

def compute_eigenvalues(A: np.ndarray) -> list[float]:
    # Returns sorted real eigenvalues of a 2x2 matrix
    evals = np.linalg.eigvals(A)
    return sorted([float(np.real(e)) for e in evals])
```
:::
