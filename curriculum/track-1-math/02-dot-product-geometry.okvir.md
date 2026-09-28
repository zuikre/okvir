---
id: "dot-product-geometry"
version: "1.0.0"
title: "The Dot Product & Geometric Projections"
track: "math"
module: "module-01"
estimated_minutes: 6
prerequisites: ["linear-algebra-vectors"]
i18n:
  ar: "الجداء النقطي والإسقاطات الهندسية"
---

# The Dot Product & Geometric Projections

The dot product measures directional alignment between two vectors. It underpins cosine similarity, attention mechanisms, and linear projection.

:::simulation-widget{engine="canvas2d" component="VectorGeometryCanvas"}
---
dimensions: 2
show_angle: true
show_projection: true
---
:::

The algebraic sum of element-wise products equals the geometric product of magnitudes times the cosine of their enclosed angle:

$$
u \cdot v = \|u\| \|v\| \cos\theta = \sum_{i=1}^n u_i v_i
$$

:::python-challenge{id="dot-product"}
---
timeout_ms: 3000
test_cases:
  - input: "u = [1, 2], v = [3, 4]"
    expected: "11.0"
  - input: "u = [1, 0], v = [0, 1]"
    expected: "0.0"
---
```python
import numpy as np

def dot_product(u: np.ndarray, v: np.ndarray) -> float:
    # Compute dot product using vectorized NumPy kernel
    return float(np.dot(u, v))
```
:::
