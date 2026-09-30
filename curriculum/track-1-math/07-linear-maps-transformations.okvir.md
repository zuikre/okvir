---
id: "linear-maps-transformations"
version: "1.0.0"
title: "Linear Maps as Space Transformations"
track: "math"
module: "mod-03"
estimated_minutes: 15
prerequisites: ["linear-combinations-span"]
i18n:
  ar: "التحويلات الخطية كعمليات تحويل للفضاء"
---

# Linear Maps as Space Transformations

Imagine space is printed on an infinite, stretchable sheet of transparent rubber with a grid drawn on it. Now grip the sheet and deform it. What makes a deformation "linear"? 
Two unbreakable rules:
1. The origin $\mathbf{0}$ stays permanently pinned down at $(0, 0)$.
2. All grid lines remain perfectly straight and evenly spaced. 

You may stretch the sheet, rotate it, reflect it, or shear it sideways into a diamond pattern. But you are never allowed to bend grid lines into curves or rip the origin away from $(0,0)$. Because straightness and even spacing are preserved, you do not need to track

:::simulation-widget{engine="canvas2d" component="LinearTransformMorphCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
T: \mathbb{R}^n \to \mathbb{R}^m, \quad T(c\mathbf{u} + d\mathbf{v}) = c T(\mathbf{u}) + d T(\mathbf{v}) \quad \forall \mathbf{u}, \mathbf{v} \in \mathbb{R}^n, \; c, d \in \mathbb{R}
$$

التحويل الخطي هو دالة تنقل متجهات الفضاء مع الحفاظ الصارم على بنيته الأساسية؛ فلا ينحني خط مستقيم، ولا تتفاوت المسافات بين خطوط الشبكة، وتبقى نقطة الأصل راسخة في مكانها. تتلخص العبقرية الرياضية في أن معرفة مصير متجهات الأساس المعيارية $\hat{\mathbf{i}}$ و $\hat{\mathbf{j}}$ تكفي تماماً للتنبؤ بمصير أي نقطة أخرى في الكون، حيث تُشكل مواقع هبوطهما أعمدة مصفوفة التحويل.

:::python-challenge{id="py-linear-maps-transformations"}
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

def apply_linear_transform(matrix: np.ndarray, points: np.ndarray) -> np.ndarray:
    """
    Apply a linear transformation matrix to a batch of row points.
    
    Parameters
    ----------
    matrix : np.ndarray
        Transformation matrix of shape (M, N)
    points : np.ndarray
        Point cloud array of shape (B, N)
        
    Returns
    -------
    np.ndarray
        Transformed points of shape (B, M)
    """
    # TODO: Implement vectorized transformation without Python loops
    pass
```
:::
