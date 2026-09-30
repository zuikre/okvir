---
id: "symmetric-matrices-spectral"
version: "1.0.0"
title: "The Derivative as Local Linearization & Tangent Slope"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["eigenvalues-eigenvectors"]
i18n:
  ar: "المشتقة كتقريب خطي محلي وميل المماس"
---

# The Derivative as Local Linearization & Tangent Slope

Look at the curved horizon of the Earth from space: it is clearly a sphere. But when you step outside onto a soccer pitch, the ground looks and feels completely flat. Why? Because if you zoom in closely enough to any smooth curve, the curve loses its curvature and becomes indistinguishable from a straight line. 

The derivative is the mathematical realization of this miracle: it is the slope of that local tangent line. It tells you: "If you zoom in with an infinite microscope around point $x$, what straight line replaces the curve?" The derivative is not just a formula; it is the best

:::simulation-widget{engine="canvas2d" component="ChainRuleGearsCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
f'(x) \coloneqq \frac{df}{dx} = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
$$

المشتقة هي أداة التكبير الرياضية العظمى؛ فمهما بلغ المنحنى من تعقيد والتواء، فإنك إذا قمت بتكبيره مجهرياً عند نقطة ما، فإنه سيفقد انحناءه ويتحول تدريجياً إلى خط مستقيم. ميل هذا الخط المستقيم الملامس هو "المشتقة". تُعبر المشتقة عن معدل التغير اللحظي، وتوفر "التقريب الخطي المحلي" الذي يتيح لنا استبدال المعادلات غير الخطية الصعبة بخطوط مستقيمة سهلة الحساب.

:::python-challenge{id="py-symmetric-matrices-spectral"}
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

def linear_approximation_eval(f: Callable, df: Callable, x0: float, query_points: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Evaluate local tangent line approximation and pointwise absolute errors.
    
    Parameters
    ----------
    f : Callable
        Target function accepting numpy array
    df : Callable
        Exact derivative function
    x0 : float
        Expansion center
    query_points : np.ndarray
        Array of evaluation points of shape (N,)
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        L: Linear approximation values, shape (N,)
        errors: Absolute errors |f(x) - L(x)|, shape (N,)
    """
    # TODO: Compute vectorized tangent line and error array
    pass
```
:::
