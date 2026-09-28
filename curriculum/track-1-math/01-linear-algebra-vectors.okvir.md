---
id: "linear-algebra-vectors"
version: "1.0.0"
title: "Vectors as Geometry"
track: "math"
module: "module-01"
estimated_minutes: 6
prerequisites: []
i18n:
  ar: "المتجهات كـ هندسة"
---

# Vectors as Geometry

A vector is an arrow in space — it has direction and magnitude. In machine learning, every observation, weight matrix, and gradient update is fundamentally a high-dimensional vector.

:::simulation-widget{engine="canvas2d" component="VectorGeometryCanvas"}
---
dimensions: 2
initial_vector: [3, 4]
show_projections: true
---
:::

The magnitude is the Euclidean length of the vector, governed by the Pythagorean metric:

$$
v = [v_1, v_2]^T \quad \|v\| = \sqrt{v_1^2 + v_2^2}
$$

:::python-challenge{id="vec-magnitude"}
---
timeout_ms: 3000
test_cases:
  - input: "v = [3, 4]"
    expected: "5.0"
  - input: "v = [0, 0]"
    expected: "0.0"
  - input: "v = [1, 1]"
    expected: "1.414"
---
```python
import numpy as np

def vector_magnitude(v: np.ndarray) -> float:
    # Vectorized Euclidean length calculation without slow loops
    return float(np.sqrt(np.sum(v ** 2)))
```
:::
