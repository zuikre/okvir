---
id: "cross-product-orthogonality"
version: "1.0.0"
title: "The Cross Product, Orthogonality & Oriented Area"
track: "math"
module: "mod-02"
estimated_minutes: 15
prerequisites: ["dot-product-geometry"]
i18n:
  ar: "الضرب الاتجاهي، التعامد، والمساحة الموجهة"
---

# The Cross Product, Orthogonality & Oriented Area

Hold two pencils in your hand meeting at their erasers, forming a "V". The two pencils define a flat sheet of paper (a 2D plane) in 3D space. How can you construct a third pencil that stands perfectly perpendicular to that paper, pointing away from both pencils simultaneously? 

And how long should that perpendicular pencil be? The cross product $\mathbf{u} \times \mathbf{v}$ solves both problems at once: it produces a vector whose direction follows the "right-hand rule" (curl your fingers from $\mathbf{u}$ to $\mathbf{v}$, and your thumb points along the result), and whose length is exactly e

:::simulation-widget{engine="canvas2d" component="CrossProductAreaCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{u} \times \mathbf{v} \coloneqq \begin{bmatrix} u_2 v_3 - u_3 v_2 \\ u_3 v_1 - u_1 v_3 \\ u_1 v_2 - u_2 v_1 \end{bmatrix} = \det \begin{bmatrix} \hat{\mathbf{i}} & \hat{\mathbf{j}} & \hat{\mathbf{k}} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{bmatrix} \in \mathbb{R}^3
$$

الضرب الاتجاهي (الخارجي) هو عملية فريدة خاصة بالفضاء ثلاثي الأبعاد $\mathbb{R}^3$؛ يأخذ متجهين ويُنتج متجهاً ثالثاً عمودياً تماماً على المستوي الذي يحتويهما. مقدار هذا المتجه الناتج يُساوي هندسياً مساحة متوازي الأضلاع المحصور بينهما، بينما يتحدد اتجاهه الصارم بقاعدة اليد اليمنى، وهو مضاد للتناظر ($\mathbf{u} \times \mathbf{v} = -\mathbf{v} \times \mathbf{u}$).

:::python-challenge{id="py-cross-product-orthogonality"}
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

def batch_cross_product_and_area(a: np.ndarray, b: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute batch 3D cross products and corresponding parallelogram areas.
    
    Parameters
    ----------
    a : np.ndarray
        Array of 3D vectors of shape (..., 3)
    b : np.ndarray
        Array of 3D vectors of shape (..., 3)
        
    Returns
    -------
    tuple[np.ndarray, np.ndarray]
        cross: Array of cross products of shape (..., 3)
        area: Array of parallelogram areas of shape (...)
    """
    # TODO: Implement vectorized 3D cross product and norm reduction
    pass
```
:::
