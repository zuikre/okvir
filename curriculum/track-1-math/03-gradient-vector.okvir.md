---
id: "gradient-vector"
version: "1.0.0"
title: "The Gradient Vector: Steering Optimization"
track: "math"
module: "module-02"
estimated_minutes: 7
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "متجه التدرج: توجيه التحسين الأمثل"
---

# The Gradient Vector: Steering Optimization

The gradient vector of a multivariable function points in the direction of greatest rate of increase (steepest ascent). Its magnitude gives that slope.

:::simulation-widget{engine="canvas2d" component="GradientDescentCanvas"}
---
dimensions: 3
manifold: "bowl"
show_contour_lines: true
---
:::

For a scalar loss function \\( f(x, y) \\), the gradient is the vector of all first-order partial derivatives:

$$
\nabla f(x, y) = \begin{bmatrix} \frac{\partial f}{\partial x} \\ \frac{\partial f}{\partial y} \end{bmatrix}
$$

:::python-challenge{id="gradient-calc"}
---
timeout_ms: 3000
test_cases:
  - input: "f(x, y) = x^2 + y^2 at (1, 2)"
    expected: "[2.0, 4.0]"
  - input: "f(x, y) = x^2 + y^2 at (0, 0)"
    expected: "[0.0, 0.0]"
---
```python
import numpy as np

def compute_gradient_quadratic(x: float, y: float) -> np.ndarray:
    # Analytical gradient vector for f(x, y) = x^2 + y^2
    return np.array([2.0 * x, 2.0 * y], dtype=float)
```
:::
