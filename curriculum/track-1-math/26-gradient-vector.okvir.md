---
id: "gradient-vector"
version: "1.0.0"
title: "Convexity, Epigraphs & Global Minimizers"
track: "math"
module: "mod-07"
estimated_minutes: 15
prerequisites: ["partial-derivatives-tangents", "linear-algebra-vectors"]
i18n:
  ar: "التحدب، المخططات الفوقية، ونقاط النهاية الصغرى الشاملة"
---

# Convexity, Epigraphs & Global Minimizers

Imagine a ceramic soup bowl. If you take any two points anywhere inside the soup or on the bowl's rim and stretch a laser beam between them, the entire straight laser beam stays completely inside or above the bowl. It never punches through the outside walls into the open air. 

This is the definition of a convex set. A convex function is a function whose landscape is shaped like this bowl: the line segment connecting any two points on its graph lies entirely on or above the graph. 
Why is convexity the holy grail of modern optimization? Because on a convex bowl, you can never get tra

:::simulation-widget{engine="canvas2d" component="ConvexityJensensCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
f(\alpha \mathbf{x} + (1-\alpha)\mathbf{y}) \le \alpha f(\mathbf{x}) + (1-\alpha)f(\mathbf{y}) \quad \forall \mathbf{x}, \mathbf{y} \in \operatorname{dom}(f), \; \alpha \in [0, 1]
$$

التحدب هو الكأس المقدسة في علم التحسين الرياضي؛ فالمجموعة المحدبة هي تلك التي إذا وصلت بين أي نقطتين بداخلها بقطعة مستقيمة، ظلت تلك القطعة بكاملها محتواة داخل المجموعة دون أن تخرج منها. وتكون الدالة محدبة إذا كان "مخططها الفوقي" (المنطقة الواقعة فوق سطح المنحنى) يشكل مجموعة محدبة. الأهمية الاستثنائية للدوال المحدبة في تعلم الآلة تكمن في استحالة الوقوع في فخاخ النهايات الصغرى المحلية الخادعة؛ فكل قاع محلي هو حتماً القاع الشامل المطلق للدالة بأسرها.

:::python-challenge{id="py-gradient-vector"}
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

def verify_jensen_gap(f: Callable, points: np.ndarray, weights: np.ndarray) -> tuple[float, float, float]:
    """
    Compute expectation, function of expectation, and empirical Jensen gap.
    
    Parameters
    ----------
    f : Callable
        Convex scalar function
    points : np.ndarray
        Array of sample coordinates of shape (N, D)
    weights : np.ndarray
        Weight array of shape (N,)
        
    Returns
    -------
    tuple[float, float, float]
        sum_ex: Sum of components of E[X]
        f_ex: f(E[X])
        gap: E[f(X)] - f(E[X])
    """
    # TODO: Normalize weights, compute expectations, and calculate Jensen gap
    pass
```
:::
