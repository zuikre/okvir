---
id: "linear-algebra-vectors"
version: "1.0.0"
title: "Vectors as Directed Line Segments & Spatial Displacements"
track: "math"
module: "mod-01"
estimated_minutes: 15
prerequisites: ["cartesian-coordinate-metric"]
i18n:
  ar: "المتجهات كقطع مستقيمة موجهة وإزاحات مكانية"
---

# Vectors as Directed Line Segments & Spatial Displacements

A number (scalar) tells you "how much" (e.g., 5 kilograms, 20 degrees Celsius). But if you ask a guide in a forest which way to safety, hearing "walk 5 kilometers" is useless. You must know which direction to walk. 

A vector is a quantity endowed with both magnitude (how far) and direction (which way). Crucially, a vector is not nailed down to one spot: if you walk 3 steps north and 4 steps east in Paris, and a friend walks 3 steps north and 4 steps east in Tokyo, you have both performed the exact same spatial displacement vector.

:::simulation-widget{engine="canvas2d" component="VectorGeometryCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{v} \coloneqq \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix} \in \mathbb{R}^n, \quad \|\mathbf{v}\| \coloneqq \sqrt{\mathbf{v}^T \mathbf{v}} = \sqrt{\sum_{i=1}^n v_i^2}, \quad \hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|}
$$

المتجه ليس مجرد عمود من الأرقام، بل هو إزاحة مكانية موجهة تمتلك مقداراً (طولاً) واتجاهاً محدداً. المتجهات كائنات طليقة حرة في الفضاء؛ نقل المتجه موازياً لنفسه لا يغير من هويته الرياضية شيئاً. نُمثل المتجه جبرياً كعمود إحداثيات يصف مقدار القفز على طول المحاور.

:::python-challenge{id="py-linear-algebra-vectors"}
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

def vector_lp_norm(v: np.ndarray, p: float) -> np.ndarray:
    """
    Compute the Lp norm of vectors along the trailing dimension.
    
    Parameters
    ----------
    v : np.ndarray
        Array of vectors with shape (..., D)
    p : float
        Norm order (p >= 1.0 or np.inf)
        
    Returns
    -------
    np.ndarray
        Lp norm reduced along axis -1.
    """
    # TODO: Implement vectorized Lp norm handling both finite p and np.inf
    pass
```
:::
