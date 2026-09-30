---
id: "taylor-series-polynomial"
version: "1.0.0"
title: "The Gradient Vector & Directional Derivatives"
track: "math"
module: "mod-06"
estimated_minutes: 15
prerequisites: ["differentiation-rules-chain", "higher-order-derivatives-concavity"]
i18n:
  ar: "متجه التدرج والمشتقات الاتجاهية"
---

# The Gradient Vector & Directional Derivatives

In the previous lesson, we learned the slope along the east-west axis and the north-south axis. But what if you decide to hike in an arbitrary compass direction—say, $30^\circ$ north of east, along a unit vector $\hat{\mathbf{u}}$? 

You do not need to perform a new limit calculation. You can package all the individual partial derivatives together into a single, magnificent vector: The Gradient Vector $\nabla f$. 
The gradient vector has two almost miraculous properties:
1. It points in the direction of steepest possible ascent (the exact direction that makes you climb the fastest).
2.

:::simulation-widget{engine="canvas2d" component="GradientDescentCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\nabla f(\mathbf{x}) \coloneqq \begin{bmatrix} \frac{\partial f}{\partial x_1}(\mathbf{x}) \\ \frac{\partial f}{\partial x_2}(\mathbf{x}) \\ \vdots \\ \frac{\partial f}{\partial x_n}(\mathbf{x}) \end{bmatrix} \in \mathbb{R}^n \times 1, \quad D_{\hat{\mathbf{u}}} f(\mathbf{x}) \coloneqq \lim_{h \to 0} \frac{f(\mathbf{x} + h\hat{\mathbf{u}}) - f(\mathbf{x})}{h} = \nabla f(\mathbf{x})^T \hat{\mathbf{u}}
$$

متجه التدرج $\nabla f$ هو البوصلة الرياضية الكبرى في الفضاء متعدد الأبعاد؛ إذ يجمع كل المشتقات الجزئية في متجه واحد ذي خصائص هندسية مذهلة. يُشير متجه التدرج دوماً نحو "الاتجاه الأشد صعوداً" على السطح، بينما يُعبر طوله عن أقصى معدل صعود ممكن. ولأن التحرك على طول خط الكنتور لا يُحدث أي تغير في الارتفاع، فإن متجه التدرج يتعامد دوماً وبشكل صارم مع خطوط الكنتور.

:::python-challenge{id="py-taylor-series-polynomial"}
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

def directional_derivatives(grad: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, int]:
    """
    Compute batch directional derivatives and identify the direction of steepest ascent.
    
    Parameters
    ----------
    grad : np.ndarray
        Gradient vector of shape (D,)
    directions : np.ndarray
        Array of candidate direction vectors of shape (B, D)
        
    Returns
    -------
    tuple[np.ndarray, int]
        d_vals: Directional derivatives along unit directions, shape (B,)
        best_idx: Index of maximum directional derivative
    """
    # TODO: Normalize direction vectors, compute dot products, and find argmax
    pass
```
:::
