---
id: "differentiation-rules-chain"
version: "1.0.0"
title: "Multivariable Scalar Fields & Topographic Elevation Landscapes"
track: "math"
module: "mod-06"
estimated_minutes: 15
prerequisites: ["derivative-tangent-slope"]
i18n:
  ar: "الحقول العددية متعددة المتغيرات وتضاريس الخرائط الطبوغرافية"
---

# Multivariable Scalar Fields & Topographic Elevation Landscapes

Imagine you are hiking through a mountain range. At every geographic location you stand on, defined by your GPS coordinates (latitude $x$, longitude $y$), there is a single measurable physical quantity: your elevation above sea level $z = f(x, y)$. 

This is a scalar field: an assignment of a single scalar number to every point in space. To visualize this 3D landscape on a flat 2D hiking map, cartographers draw contour lines (level curves). A contour line connects all points that share the exact same elevation. If you walk along a contour line, you do not climb or descend a single

:::simulation-widget{engine="canvas2d" component="ContourElevationCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
f: \mathbb{R}^n \to \mathbb{R}, \quad \mathbf{x} = \begin{bmatrix} x_1 \\ \vdots \\ x_n \end{bmatrix} \mapsto f(\mathbf{x}) \in \mathbb{R}
$$

الحقل العددي متعدد المتغيرات هو دالة تربط كل نقطة في فضاء متعدد الأبعاد برقم قياسي واحد، مثل تعيين درجة الحرارة أو الارتفاع الطبوغرافي عند كل نقطة جغرافية $(x, y)$. لتصور هذا السطح ثلاثي الأبعاد على شاشة مستوية، نستخدم "خطوط الكنتور" (خطوط التسوية) التي تصل بين النقاط ذات القيمة المتطابقة. تقارب خطوط الكنتور يشير إلى جرف شديد الانحدار، بينما تباعدها يعكس تضاريس منبسطة هادئة.

:::python-challenge{id="py-differentiation-rules-chain"}
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

def scalar_field_gradient_magnitude(Z: np.ndarray, dx: float, dy: float) -> np.ndarray:
    """
    Compute 2D gradient magnitude matrix for interior grid points.
    
    Parameters
    ----------
    Z : np.ndarray
        2D scalar field elevations, shape (H, W)
    dx : float
        Spacing along column axis (x)
    dy : float
        Spacing along row axis (y)
        
    Returns
    -------
    np.ndarray
        Interior gradient magnitudes, shape (H - 2, W - 2)
    """
    # TODO: Implement 2D central difference slicing and Euclidean norm
    pass
```
:::
