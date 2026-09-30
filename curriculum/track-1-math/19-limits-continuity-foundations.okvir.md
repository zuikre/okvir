---
id: "limits-continuity-foundations"
version: "1.0.0"
title: "Second Derivatives, Concavity & Curvature"
track: "math"
module: "mod-06"
estimated_minutes: 15
prerequisites: ["linear-rate-of-change-slopes"]
i18n:
  ar: "المشتقة الثانية، التقعر، ومفهوم الانحناء"
---

# Second Derivatives, Concavity & Curvature

If the first derivative tells you whether you are moving uphill or downhill, what does the second derivative tell you? It tells you what is happening to your climb itself: is the hill getting steeper and steeper, or is it flattening out? 

Imagine driving a car along a winding road:
- The first derivative is your speedometer reading.
- The second derivative is how hard your foot is pressing the gas pedal (acceleration).
Geometrically, if the second derivative is positive ($f''(x) > 0$), the slope is constantly increasing: the curve bends upward like a soup bowl that can hold water (conca

:::simulation-widget{engine="canvas2d" component="TaylorSeriesCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
f''(x) \coloneqq \frac{d^2 f}{dx^2} = \lim_{h \to 0} \frac{f'(x + h) - f'(x)}{h} = \lim_{h \to 0} \frac{f(x+h) - 2f(x) + f(x-h)}{h^2}
$$

إذا كانت المشتقة الأولى تُخبرنا باتجاه الحركة صعوداً أو هبوطاً، فإن المشتقة الثانية $f''(x)$ تقيس "انحناء" المنحنى وتسارع تغير الميل. عندما تكون المشتقة الثانية موجبة، يتجه المنحنى إلى الأعلى كالإناء المفتوح (مقعر لأعلى / محدب)، وتستقر فيه المماسات أسفل المنحنى دائماً، مما يضمن وجود قاع مستقر (نهاية صغرى). أما نقطة الانقلاب (Inflection point) فهي النقطة المحورية التي ينقلب عندها المنحنى من التقعر إلى التحدب.

:::python-challenge{id="py-limits-continuity-foundations"}
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

def curve_curvature(y: np.ndarray, dx: float) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute second derivative and geometric curvature on interior nodes.
    
    Parameters
    ----------
    y : np.ndarray
        Array of 1D curve samples of shape (N,)
    dx : float
        Uniform sample step
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        d2y: Second derivative values, shape (N - 2,)
        curvature: Geometric curvature kappa, shape (N - 2,)
    """
    # TODO: Implement 3-point second derivative stencil and curvature formula
    pass
```
:::
