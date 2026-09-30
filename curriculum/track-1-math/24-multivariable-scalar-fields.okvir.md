---
id: "multivariable-scalar-fields"
version: "1.0.0"
title: "The Hessian Matrix, Curvature & Quadratic Approximations"
track: "math"
module: "mod-07"
estimated_minutes: 15
prerequisites: ["derivative-tangent-slope", "cartesian-coordinate-metric"]
i18n:
  ar: "مصفوفة هيسي، الانحناء، والتقريبات التربيعية"
---

# The Hessian Matrix, Curvature & Quadratic Approximations

The gradient tells you the slope of the landscape at your feet. But is the ground shaped like a mountain peak, a bowl-shaped valley, a flat ramp, or a horse's saddle? The gradient cannot tell you, because at the bottom of a bowl, at the top of a peak, and at the center of a saddle, the ground is completely flat ($\nabla f = \mathbf{0}$). 

To distinguish between these shapes, you need the Hessian Matrix $\mathbf{H}$. The Hessian collects all the second-order partial derivatives. It acts like a multivariable bowl-detector:
- If all its eigenvalues are positive, the ground curves upward in e

:::simulation-widget{engine="canvas2d" component="HessianCurvatureCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{H} = \nabla^2 f(\mathbf{x}) \coloneqq \begin{bmatrix} \frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\ \frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\ \vdots & \vdots & \ddots & \vdots \\ \frac{\partial^2 f}{\partial x_n \partial x_1} & \frac{\partial^2 f}{\partial x_n \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_n^2} \end{bmatrix} \in \mathbb{R}^{n \times n}
$$

مصفوفة هيسي $\mathbf{H}$ هي المعيار الحاكم لانحناء وتحدب الفضاء متعدد الأبعاد؛ إذ تجمع كافة المشتقات الجزئية من الدرجة الثانية في مصفوفة مربعة متناظرة. في النقاط الحرجة التي ينعدم عندها التدرج، تقوم مصفوفة هيسي بفك لغز التضاريس عبر قيمها الذاتية: فإذا كانت جميع القيم الذاتية موجبة (مصفوفة موجبة المعرّفة)، فإننا في قاع وادٍ مستقر (نهاية صغرى). وإذا كانت سالبة، فنحن فوق قمة جبل (نهاية عظمى). أما إذا تباينت إشاراتها، فنحن نقف على "نقطة سرجية" (Saddle point) تتأرجح بين الصعود والهبوط.

:::python-challenge{id="py-multivariable-scalar-fields"}
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

def quadratic_form_curvature(H: np.ndarray, directions: np.ndarray) -> tuple[np.ndarray, str]:
    """
    Compute directional quadratic curvatures and classify surface topology.
    
    Parameters
    ----------
    H : np.ndarray
        Symmetric Hessian matrix of shape (D, D)
    directions : np.ndarray
        Array of test directions of shape (B, D)
        
    Returns
    -------
    tuple[np.ndarray, str]
        curvatures: Directional curvatures for each unit vector, shape (B,)
        topology: 'strictly_convex', 'strictly_concave', or 'saddle'
    """
    # TODO: Compute quadratic forms via einsum and classify via eigenvalues
    pass
```
:::
