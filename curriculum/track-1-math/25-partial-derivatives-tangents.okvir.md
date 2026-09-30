---
id: "partial-derivatives-tangents"
version: "1.0.0"
title: "The Jacobian Matrix & Vector-Valued Deformation"
track: "math"
module: "mod-07"
estimated_minutes: 15
prerequisites: ["multivariable-scalar-fields"]
i18n:
  ar: "مصفوفة جاكوبي والتشويه المكاني للدوال المتجهية"
---

# The Jacobian Matrix & Vector-Valued Deformation

A scalar field takes a multi-dimensional point and gives you a single number (e.g., location $\to$ temperature). But what if a function takes a multi-dimensional point and gives you back another multi-dimensional vector? 
For example, a wind map: at every location $(x, y)$, the wind has both an east-west speed $u(x, y)$ and a north-south speed $v(x, y)$. 

How do you take the derivative of such a vector-valued system? You cannot use a single gradient vector, because each output component has its own gradient! 
The Jacobian Matrix $\mathbf{J}$ is the master matrix that stacks all these

:::simulation-widget{engine="canvas2d" component="JacobianMappingCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m, \quad \mathbf{f}(\mathbf{x}) = \begin{bmatrix} f_1(\mathbf{x}) \\ f_2(\mathbf{x}) \\ \vdots \\ f_m(\mathbf{x}) \end{bmatrix}, \quad \mathbf{J} = \frac{\partial \mathbf{f}}{\partial \mathbf{x}} \coloneqq \begin{bmatrix} \frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_1}{\partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial f_m}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_n} \end{bmatrix} = \begin{bmatrix} \nabla f_1^T \\ \vdots \\ \nabla f_m^T \end{bmatrix} \in \mathbb{R}^{m \times n}
$$

مصفوفة جاكوبي $\mathbf{J}$ هي التوسيع الشامل لمفهوم المشتقة ليشمل الدوال التي تأخذ متجهات وتُنتج متجهات أخرى ($\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m$). تجمع مصفوفة جاكوبي تدرجات جميع دوال المخرجات في صفوف منظمة. هندسياً، تُمثل مصفوفة جاكوبي التحويل الخطي المحلي الدقيق الذي يصف كيف يتشوه مكعب متناهي الصغر في فضاء المدخلات ويتحول إلى متوازي سطوح في فضاء المخرجات، ويُعبر محددها $|\det \mathbf{J}|$ عن معامل تمدد الحجوم في تكاملات تغيير المتغيرات.

:::python-challenge{id="py-partial-derivatives-tangents"}
---
timeout_ms: 3000
test_cases:
  - input: "x = np.array([1.0, 2.0])"
    expected: "3.0"
  - input: "x = np.array([0.0, 0.0])"
    expected: "0.0"
---
```python
from typing import Callable
import numpy as np

def numerical_jacobian(F: Callable, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:
    """
    Compute the numerical Jacobian matrix of vector function F at x0.
    
    Parameters
    ----------
    F : Callable
        Function mapping 1D array of length N to 1D array of length M
    x0 : np.ndarray
        Evaluation coordinate of shape (N,)
    eps : float
        Perturbation step size
        
    Returns
    -------
    np.ndarray
        Jacobian matrix of shape (M, N)
    """
    # TODO: Implement multivariate central difference Jacobian column assembly
    pass
```
:::
