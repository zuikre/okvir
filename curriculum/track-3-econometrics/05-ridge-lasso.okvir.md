---
id: "ridge-lasso"
version: "1.0.0"
title: "Regularization: L1 Diamond vs L2 Sphere Geometry"
track: "econometrics"
module: "module-05"
estimated_minutes: 8
prerequisites: ["ols-residual-geometry"]
i18n:
  ar: "الانتظام: هندسة ألماسة L1 مقابل كرة L2"
---

# Regularization: L1 Diamond vs L2 Sphere Geometry

Regularization prevents overfitting by penalizing weight vector magnitude. L1 (Lasso) creates sharp corners that force coefficients exactly to zero, while L2 (Ridge) smoothly contracts weights without sparsity.

:::simulation-widget{engine="canvas2d" component="RegularizationGeometryCanvas"}
---
alpha: 0.5
show_contour_ellipses: true
show_constraint_boundary: true
---
:::

The dual Lagrangian formulation yields the composite objective:

$$
\mathcal{L}_{\text{Ridge}}(w) = \text{SSR}(w) + \lambda \|w\|_2^2 \quad \mathcal{L}_{\text{Lasso}}(w) = \text{SSR}(w) + \lambda \|w\|_1
$$

:::python-challenge{id="ridge-loss"}
---
timeout_ms: 3000
test_cases:
  - input: "weights = [1.0, 2.0], alpha = 0.1"
    expected: "penalty = 0.5"
---
```python
import numpy as np

def ridge_penalty(weights: np.ndarray, alpha: float) -> float:
    # L2 Ridge penalty: alpha * sum(w_i^2)
    return float(alpha * np.sum(weights ** 2))
```
:::
