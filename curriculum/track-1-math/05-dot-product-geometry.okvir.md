---
id: "dot-product-geometry"
version: "1.0.0"
title: "The Dot Product & Geometric Projection Duality"
track: "math"
module: "mod-02"
estimated_minutes: 15
prerequisites: ["linear-algebra-vectors"]
i18n:
  ar: "الضرب النقطي وازدواجية الإسقاط الهندسي"
---

# The Dot Product & Geometric Projection Duality

Turn on a spotlight shining straight down onto the ground. Hold an arrow $\mathbf{v}$ slanted in the air above a horizontal ruler $\mathbf{u}$. The shadow cast by arrow $\mathbf{v}$ onto the ruler has a measurable length. 

If you multiply that shadow's length by the length of the ruler $\mathbf{u}$, you get a single number: the dot product $\mathbf{u} \cdot \mathbf{v}$. If $\mathbf{v}$ points perpendicular to $\mathbf{u}$, the shadow vanishes to a dot of length zero ($\mathbf{u} \cdot \mathbf{v} = 0$). If $\mathbf{v}$ tilts backwards, the shadow falls behind the origin, yielding a negative nu

:::simulation-widget{engine="canvas2d" component="DotProductProjectionCanvas"}
---
interactive: true
highlighted_metric: "loss"
---
:::

### Mathematical Foundations

$$
\mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v} = \sum_{i=1}^n u_i v_i = \|\mathbf{u}\|_2 \|\mathbf{v}\|_2 \cos(\theta)
$$

الضرب النقطي هو الجسر السحري بين الحساب الجبري والهندسة المكانية؛ إذ يختزل متجهين في رقم قياسي واحد يُعبر عن مدى توافقهما الاتجاهي. هندسياً، يعادل الضرب النقطي قياس طول "الظل" الذي يسقطه أحد المتجهين عمودياً على الآخر، مضروباً في طول المتجه المُستقبل. إذا تعامد المتجهان تضاءل الظل إلى نقطة وانعدم الناتج.

:::python-challenge{id="py-dot-product-geometry"}
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

def vector_projection_and_angle(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, float]:
    """
    Compute orthogonal projection of v onto u, and the angle between them.
    
    Parameters
    ----------
    u : np.ndarray
        Direction vector of shape (D,), ||u|| > 0
    v : np.ndarray
        Vector to project, shape (D,)
        
    Returns
    -------
    tuple[np.ndarray, float]
        proj: Orthogonal projection vector of shape (D,)
        angle: Angle theta between u and v in radians [0, pi]
    """
    # TODO: Implement projection and clipped arccos calculation
    pass
```
:::
