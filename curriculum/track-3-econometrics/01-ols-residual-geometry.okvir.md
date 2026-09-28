---
id: "ols-residual-geometry"
version: "1.0.0"
title: "The Geometry of Squared Residuals"
track: "econometrics"
module: "module-01"
estimated_minutes: 6
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "هندسة البواقي المربعة"
---

# The Geometry of Least Squares

In ordinary least squares regression (OLS), we seek the linear hyperplane that minimizes the vertical squared Euclidean distances between observed points and the line.

:::simulation-widget{engine="canvas2d" component="LinearRegressionResiduals"}
---
points_dataset: "anscombe_1"
initial_slope: 0.2
initial_intercept: 3.0
target_slope: 0.5
show_squares: true
color_palette: "mathematical"
---
:::

The closed-form normal equation guarantees that the residual vector is strictly orthogonal to the column space of the design matrix:

$$
\hat{\beta} = (X^T X)^{-1} X^T y \quad \text{Loss}(m, b) = \sum_{i=1}^N (y_i - (m x_i + b))^2
$$

:::python-challenge{id="py-loss-computation"}
---
timeout_ms: 3000
test_cases:
  - input: "y = np.array([2.0, 4.0]); y_hat = np.array([1.0, 3.0])"
    expected: "2.0"
  - input: "y = np.array([5.0]); y_hat = np.array([5.0])"
    expected: "0.0"
---
```python
import numpy as np

def compute_squared_loss(y: np.ndarray, y_hat: np.ndarray) -> float:
    # Vectorized SSR calculation
    residuals = y - y_hat
    return float(np.sum(residuals ** 2))
```
:::
