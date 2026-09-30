---
id: "matrix-multiplication-composition"
version: "1.0.0"
title: "Matrix Multiplication as Composition of Transformations"
track: "math"
module: "mod-03"
estimated_minutes: 15
prerequisites: ["linear-maps-transformations"]
i18n:
  ar: "ضرب المصفوفات كتركيب للتحويلات الهندسية"
---

# Matrix Multiplication as Composition of Transformations

Suppose you apply Transformation $A$ to a drawing (e.g., rotate it counter-clockwise by $90^\circ$). Next, you take the result and apply Transformation $B$ (e.g., shear it horizontally). What single transformation would achieve the exact same final result in one leap? 

That single compound transformation is the composition $B \circ A$. Matrix multiplication is nothing more than calculating this combined action. Notice the order: you apply $A$ first, then $B$, written algebraically as $\mathbf{B}\mathbf{A}\mathbf{x}$. Because rotating then shearing looks completely different from shearing then

:::simulation-widget{engine="canvas2d" component="MatrixCompositionCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{B} \in \mathbb{R}^{m \times n}, \quad \mathbf{A} \in \mathbb{R}^{n \times p} \implies \mathbf{C} = \mathbf{B}\mathbf{A} \in \mathbb{R}^{m \times p}
$$

ليس ضرب المصفوفات مجرد عملية حسابية للأرقام، بل هو تجسيد هندسي لـ "تركيب التحويلات" المتتابعة. إذا قمنا بتدوير الفضاء عبر مصفوفة $A$ ثم تمديده عبر مصفوفة $B$، فإن حاصل الضرب $BA$ يُمثل التحويل الإجمالي الموحد. ولأن ترتيب العمليات الهندسية يُحدث فارقاً جذرياً في الشكل النهائي، فإن ضرب المصفوفات غير تبادلي ($BA \ne AB$).

:::python-challenge{id="py-matrix-multiplication-composition"}
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

def compose_2d_affine_transform(angle_rad: float, scale: tuple[float, float], translation: tuple[float, float]) -> np.ndarray:
    """
    Compose a 3x3 2D affine transformation matrix: Translation @ Rotation @ Scale.
    
    Parameters
    ----------
    angle_rad : float
        Rotation angle in radians
    scale : tuple[float, float]
        (sx, sy) scaling factors
    translation : tuple[float, float]
        (tx, ty) displacement vector
        
    Returns
    -------
    np.ndarray
        3x3 homogeneous transformation matrix
    """
    # TODO: Build elementary matrices and compose via matrix multiplication
    pass
```
:::
