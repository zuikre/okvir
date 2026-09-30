---
id: "linear-rate-of-change-slopes"
version: "1.0.0"
title: "The Geometry of Rate of Change & Slopes"
track: "math"
module: "mod-01"
estimated_minutes: 15
prerequisites: ["cartesian-coordinate-metric"]
i18n:
  ar: "هندسة معدل التغير والميل"
---

# The Geometry of Rate of Change & Slopes

If you walk up a straight ramp, for every meter you advance horizontally, you gain a fixed number of centimeters in elevation. The "slope" is the constant ratio of vertical climb to horizontal progress. It is not an abstract fraction; it is the steepness angle translated into an operational rate. 

When a line is horizontal, walking forward costs zero vertical climb (slope $= 0$). When a line is vertical, you must climb infinitely high without advancing a single step forward (slope is undefined or infinite). A negative slope means walking forward takes you downhill.

:::simulation-widget{engine="canvas2d" component="LinearSlopeRateCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
m \coloneqq \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1} = \tan(\theta), \quad \text{where } \theta \in \left(-\frac{\pi}{2}, \frac{\pi}{2}\right), \; \Delta x \ne 0
$$

الميل هو المقياس الهندسي لشدة انحدار الخط المستقيم، وهو يُعبر عن ظل زاوية الميلان ($\tan \theta$) بالنسبة للمحور الأفقي الموجب. يعكس الميل النسبة الصارمة بين التغير الرأسي والتغير الأفقي؛ فكل خطوة نخطوها إلى اليمين بمقدار وحدة واحدة تقابلها إزاحة رأسية بمقدار $m$.

:::python-challenge{id="py-linear-rate-of-change-slopes"}
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

def central_difference_stencil(y: np.ndarray, dx: float) -> np.ndarray:
    """
    Compute second-order central difference derivative for interior points.
    
    Parameters
    ----------
    y : np.ndarray
        1D array of function values at uniform grid points, shape (N,)
    dx : float
        Uniform step size between adjacent grid points
        
    Returns
    -------
    np.ndarray
        Approximated derivatives at interior points, shape (N - 2,)
    """
    # TODO: Implement vectorized 3-point stencil using array slicing
    pass
```
:::
