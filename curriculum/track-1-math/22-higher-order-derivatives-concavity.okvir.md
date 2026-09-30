---
id: "higher-order-derivatives-concavity"
version: "1.0.0"
title: "Partial Derivatives & Axis-Aligned Slices"
track: "math"
module: "mod-06"
estimated_minutes: 15
prerequisites: ["differentiation-rules-chain"]
i18n:
  ar: "المشتقات الجزئية وشرائح المحاور المعيارية"
---

# Partial Derivatives & Axis-Aligned Slices

You are standing on a steep hillside. If someone asks you: "What is the slope of the hill right where you are standing?", you cannot give a single number! Why? Because if you take a step north, you might climb steeply uphill; if you take a step east, you might walk comfortably along a flat ledge; if you take a step south, you might plunge downhill. The slope depends completely on which way you step. 

The partial derivatives are the simplest directional questions you can ask: 
1. What is the slope if you freeze your $y$-coordinate completely and only take a step along the $X$-axis ($\f

:::simulation-widget{engine="canvas2d" component="PartialDerivativeSliceCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\frac{\partial f}{\partial x_i}(\mathbf{x}) \coloneqq \lim_{h \to 0} \frac{f(\mathbf{x} + h \mathbf{e}_i) - f(\mathbf{x})}{h} = \left. \frac{d}{dh} f(\mathbf{x} + h \mathbf{e}_i) \right|_{h=0}
$$

المشتقة الجزئية هي الإجابة عن سؤال: "كيف تتغير الدالة إذا تحركنا على طول محور واحد فقط مع تجميد جميع المحاور الأخرى كلياً؟" هندسياً، يعادل حساب المشتقة الجزئية $\frac{\partial f}{\partial x}$ قطع السطح الجبلي ثلاثي الأبعاد بشريحة رأسية موازية لمحور $X$، ثم قياس ميل منحنى التقاطع الناتج. عند الاشتقاق بالنسبة لـ $x$، نُعامل المتغير $y$ وكأنه رقم ثابت لا يتحرك.

:::python-challenge{id="py-higher-order-derivatives-concavity"}
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

def numerical_gradient_vector(f: Callable, x0: np.ndarray, eps: float = 1e-5) -> np.ndarray:
    """
    Compute the numerical gradient vector of scalar field f at point x0.
    
    Parameters
    ----------
    f : Callable
        Function mapping 1D numpy array of shape (D,) to a scalar
    x0 : np.ndarray
        Evaluation coordinate of shape (D,)
    eps : float
        Finite difference step size
        
    Returns
    -------
    np.ndarray
        Gradient vector of shape (D,)
    """
    # TODO: Implement multivariate central difference gradient
    pass
```
:::
