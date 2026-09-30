---
id: "diagonalization-powers"
version: "1.0.0"
title: "Limits, Continuity & The Infinitesimal Neighborhood"
track: "math"
module: "mod-05"
estimated_minutes: 15
prerequisites: ["eigenvalues-eigenvectors"]
i18n:
  ar: "النهايات، الاتصال، والجوار المتناهي في الصغر"
---

# Limits, Continuity & The Infinitesimal Neighborhood

Imagine walking toward a destination along a trail on a dark night. The concept of a limit does not care about what happens at the destination itself; it only cares about what happens as you get infinitely close to it. Even if a meteor fell and obliterated the destination into a gaping hole (a singularity or undefined point like $0/0$), the limit still exists if all paths heading toward that hole converge steadily toward the exact same elevation. 

Continuity simply means: when you arrive at the spot, there is no sudden trapdoor, cliff, or teleportation. The destination is right where

:::simulation-widget{engine="canvas2d" component="SecantTangentLimitCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\lim_{x \to c} f(x) = L \iff \forall \epsilon > 0, \; \exists \delta > 0 \; \text{s.t.} \; 0 < |x - c| < \delta \implies |f(x) - L| < \epsilon
$$

تضع نهاية الدالة حجر الأساس للتحليل الرياضي عبر تعريف $(\epsilon, \delta)$ الصارم لغوتفريد لايبنتز وأوغستين كوشي. لا تهتم النهاية بما يحدث "عند" النقطة تحديداً، بل بسلوك الدالة عند الاقتراب اللانهائي منها. إذا استطعنا حصر قيم الدالة ضمن أي هامش خطأ ضئيل $\epsilon$ بمجرد الاقتراب من النقطة بمسافة $\delta$، فإن النهاية موجودة. أما "الاتصال" فيعني سلاسة المنحنى وخلوه من أي قفزات مفاجئة أو فجوات ممزقة.

:::python-challenge{id="py-diagonalization-powers"}
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

def richardson_extrapolated_derivative(f: Callable[[float], float], x: float, h: float = 0.1) -> float:
    """
    Compute 4th-order accurate numerical derivative using Richardson extrapolation.
    
    Parameters
    ----------
    f : Callable
        Target scalar function
    x : float
        Evaluation coordinate
    h : float
        Base step size
        
    Returns
    -------
    float
        Extrapolated derivative estimate
    """
    # TODO: Evaluate D(h) and D(h/2), then apply Richardson combination
    pass
```
:::
